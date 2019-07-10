
package com.wzlue.chain.web.controller.logistics;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.wzlue.chain.sys.entity.SysCitiesEntity;
import com.wzlue.chain.sys.entity.SysUserEntity;
import com.wzlue.chain.sys.service.SysCitiesService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.wzlue.chain.web.controller.sys.AbstractController;

import com.wzlue.chain.logistics.entity.LogisticsDemandEntity;
import com.wzlue.chain.logistics.service.LogisticsDemandService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
import springfox.documentation.annotations.ApiIgnore;


/**
 * 物流求购
 *
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-08-21 16:17:43
 */
@RestController
@RequestMapping("/logistics/logisticsdemand")
@Api("物流求购")
public class LogisticsDemandController extends AbstractController{
	@Autowired
	private LogisticsDemandService logisticsDemandService;
    @Autowired
    private SysCitiesService sysCitiesService;

	/**
	 * 列表
	 */
	@GetMapping("/list")
	@ApiOperation(value = "物流求购列表接口")
	@ApiImplicitParams({
            @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string"),
			@ApiImplicitParam(name = "page", dataType = "int", value = "页码", paramType = "query", defaultValue = "1"),
			@ApiImplicitParam(name = "limit", dataType = "int", value = "一页几条", paramType = "query", defaultValue = "10"),
			@ApiImplicitParam(name = "type", dataType = "int", value = "0国内1国际", paramType = "query"),
			@ApiImplicitParam(name = "categoryId", dataType = "int", value = "0船舶1车辆2航空3火车", paramType = "query"),
			@ApiImplicitParam(name = "provinceStart", dataType = "String", value = "出发地省", paramType = "query"),
			@ApiImplicitParam(name = "provinceEnd", dataType = "String", value = "目的地省", paramType = "query"),
			@ApiImplicitParam(name = "cityStart", dataType = "String", value = "出发地市", paramType = "query"),
			@ApiImplicitParam(name = "cityEnd", dataType = "String", value = "目的地市", paramType = "query"),
			@ApiImplicitParam(name = "title", dataType = "String", value = "标题名称", paramType = "query")
	})
	public R list(@ApiIgnore @RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
        SysUserEntity user = getUser();
        if(user.getCompanyId()!=null){
            query.put("companyId",user.getCompanyId());
        }

        List<LogisticsDemandEntity> logisticsDemandList = logisticsDemandService.queryList(query);
		int total = logisticsDemandService.queryTotal(query);
        for (LogisticsDemandEntity demandEntity : logisticsDemandList) {
            if (demandEntity.getType() == 0) {
                demandEntity.setTypeName("国内物流");
                SysCitiesEntity sysCitiesEntity = sysCitiesService.queryBycityId(demandEntity.getCityStart());
                SysCitiesEntity sysCitiesEntity1 = sysCitiesService.queryBycityId(demandEntity.getCityEnd());
                demandEntity.setCityStartName(sysCitiesEntity.getCity());
                demandEntity.setCityEndName(sysCitiesEntity1.getCity());
            } else {
                demandEntity.setTypeName("国际物流");
                demandEntity.setCityStartName(demandEntity.getCityStart());
                demandEntity.setCityEndName(demandEntity.getCityEnd());
                demandEntity.setProvinceStartName(demandEntity.getProvinceStart());
                demandEntity.setProvinceEndName(demandEntity.getProvinceEnd());
            }
            if (demandEntity.getCategoryId() == 0) {
                demandEntity.setCategoryName("船舶");
            } else if (demandEntity.getCategoryId() == 1) {
                demandEntity.setCategoryName("车辆");
            } else if (demandEntity.getCategoryId() == 2) {
                demandEntity.setCategoryName("航空");
            } else if (demandEntity.getCategoryId() == 3) {
                demandEntity.setCategoryName("火车");
            }
            if (demandEntity.getUnit() == 0) {
                demandEntity.setUnitName("吨");
            } else {
                demandEntity.setUnitName("千克");
            }
        }
		return R.page(logisticsDemandList,total);
	}


	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("logistics:logisticsdemand:info")
	public R info(@PathVariable("id") Long id){
		LogisticsDemandEntity logisticsDemand = logisticsDemandService.queryObject(id);

		return R.ok().put("logisticsDemand", logisticsDemand);
	}

	/**
	 * 保存
	 */
	@PostMapping("/save")
//	@RequiresPermissions("logistics:logisticsdemand:save")
    @ApiOperation(value="物流求购新增")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
	})
	public R save(@RequestBody LogisticsDemandEntity logisticsDemand){
		SysUserEntity user = getUser();
		logisticsDemand.setCreateBy(user.getUserId());
		logisticsDemand.setCreatDate(new Date());
		logisticsDemand.setCompanyId(Math.toIntExact(user.getCompanyId()));
		logisticsDemandService.save(logisticsDemand);

		return R.ok();
	}

	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("logistics:logisticsdemand:update")
	public R update(@RequestBody LogisticsDemandEntity logisticsDemand){
		logisticsDemandService.update(logisticsDemand);

		return R.ok();
	}

	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("logistics:logisticsdemand:delete")
	public R delete(@RequestBody Long[] ids){
		logisticsDemandService.deleteBatch(ids);

		return R.ok();
	}

}
