
package com.wzlue.chain.web.controller.marketing;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.wzlue.chain.sys.entity.SysCitiesEntity;
import com.wzlue.chain.sys.entity.SysProvincesEntity;
import com.wzlue.chain.sys.entity.SysUserEntity;
import com.wzlue.chain.sys.service.SysCitiesService;
import com.wzlue.chain.sys.service.SysProvincesService;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.wzlue.chain.web.controller.sys.AbstractController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import springfox.documentation.annotations.ApiIgnore;

import com.wzlue.chain.marketing.entity.MarketTenderEntity;
import com.wzlue.chain.marketing.service.MarketTenderService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 招标表
 * 
 * @author 
 * @email 
 * @date 2018-10-24 15:19:33
 */
@RestController
@RequestMapping("/marketing/markettender")
@Api(value = "招标接口数据")
public class MarketTenderController extends AbstractController{
	@Autowired
	private MarketTenderService marketTenderService;
	@Autowired
	private SysProvincesService sysProvincesService;

	@Autowired
	private SysCitiesService sysCitiesService;
	/**
	 * 列表
	 */
	@GetMapping("/markettenderList")
    @ApiOperation(value="招标列表接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "token", dataType = "string", value = "token", paramType = "header", required = true),
            @ApiImplicitParam(name = "select", dataType = "int", value = "查询 0:全部,1:我参与的  ", paramType = "query", required = true),
            @ApiImplicitParam(name = "page", dataType = "int", value = "页码", paramType = "query", defaultValue = "1"),
            @ApiImplicitParam(name = "limit", dataType = "int", value = "一页几条", paramType = "query", defaultValue = "10"),
            @ApiImplicitParam(name = "status", dataType = "int", value = "状态 0:上架,1:下架 ", paramType = "query")
    })
	public R list(@ApiIgnore @RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
        Object select = query.get("select");
        if (select != null && select.equals("1")) {
            query.put("companyId", getUser().getCompanyId());
        }

        List<MarketTenderEntity> marketTenderList = marketTenderService.queryList(query);
		for (MarketTenderEntity tenderEntity : marketTenderList) {
			if(StringUtils.isNotBlank(tenderEntity.getProvince()) && StringUtils.isNotBlank(tenderEntity.getCity())){
				SysProvincesEntity sysProvincesEntity = sysProvincesService.queryByprovinceId(tenderEntity.getProvince());
				SysCitiesEntity sysCitiesEntity = sysCitiesService.queryBycityId(tenderEntity.getCity());
				tenderEntity.setProvinceName(sysProvincesEntity.getProvince());
				tenderEntity.setCityName(sysCitiesEntity.getCity());
			}
			if (tenderEntity.getStartTime().before(new Date()) && tenderEntity.getEndTime().after(new Date()) && tenderEntity.getStatus() == 0) {
				tenderEntity.setState(0);
			} else {
				tenderEntity.setState(1);
			}
		}
		int total = marketTenderService.queryTotal(query);
		
		return R.page(marketTenderList,total);
	}
	
	
	/**
	 * 信息
	 */
	@GetMapping("/markettenderInfo")
    @ApiOperation(value="招标详情接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", dataType = "int", value = "招标id", paramType = "query"),
			@ApiImplicitParam(name = "token", dataType = "string", value = "token验证 ", paramType = "query")
    })
	public R info(@ApiIgnore @RequestParam("id") Long id){
		MarketTenderEntity marketTender = marketTenderService.queryObject(id);
		if(marketTender.getProvince() != null && marketTender.getCity() != null){
			SysProvincesEntity sysProvincesEntity = sysProvincesService.queryByprovinceId(marketTender.getProvince());
			SysCitiesEntity sysCitiesEntity = sysCitiesService.queryBycityId(marketTender.getCity());
			marketTender.setProvinceName(sysProvincesEntity.getProvince());
			marketTender.setCityName(sysCitiesEntity.getCity());
		}
		return R.ok().put("marketTender", marketTender);
	}
	
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("marketing:markettender:save")
	public R save(@RequestBody MarketTenderEntity marketTender){
		marketTenderService.save(marketTender);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("marketing:markettender:update")
	public R update(@RequestBody MarketTenderEntity marketTender){
		marketTenderService.update(marketTender);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("marketing:markettender:delete")
	public R delete(@RequestBody Long[] ids){
		marketTenderService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
