
package com.wzlue.chain.web.controller.storage;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.wzlue.chain.sys.entity.SysUserEntity;
import com.wzlue.chain.sys.service.SysNumberRuleService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.wzlue.chain.web.controller.sys.AbstractController;

import com.wzlue.chain.storage.entity.OfferEntity;
import com.wzlue.chain.storage.service.OfferService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;


/**
 * 仓储报盘
 * 
 * @author 
 * @email 
 * @date 2018-08-27 14:15:36
 */
@RestController
@RequestMapping("/storage/offer")
@Api(value = "仓储报盘")
public class OfferController extends AbstractController{
	@Autowired
	private OfferService offerService;
	@Autowired
	private SysNumberRuleService sysNumberRuleService;

	/**
	 * 列表
	 */
	@GetMapping("/list")
//    @ApiOperation(value = "仓储报盘列表接口")
//    @ApiImplicitParams({
//            @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string"),
//            @ApiImplicitParam(paramType = "query", name = "page", value = "页码", defaultValue = "1", dataType = "int"),
//            @ApiImplicitParam(paramType = "query", name = "limit", value = "一页几条", defaultValue = "10", dataType = "int"),
//            @ApiImplicitParam(paramType = "query", name = "title", value = "标题", dataType = "string"),
//            @ApiImplicitParam(paramType = "query", name = "contact", value = "联系人", dataType = "string"),
//            @ApiImplicitParam(paramType = "query", name = "phone", value = "联系方式", dataType = "string"),
//            @ApiImplicitParam(paramType = "query", name = "status", value = "状态: 0.在售 1.下架", dataType = "int")
//    })
	public R list(@ApiIgnore @RequestParam Map<String, Object> params){
		//查询列表数据
		Query query = new Query(params);
		SysUserEntity user = getUser();
		if(user.getCompanyId()!=null){
			//查询本公司的报盘信息
			query.put("merchantId",user.getCompanyId());
		}

		List<OfferEntity> offerList = offerService.queryList(query);
		int total = offerService.queryTotal(query);

		return R.page(offerList,total);
	}


	/**
	 * 信息
	 */
	@GetMapping("/info/{id}")
//	@RequiresPermissions("storage:offer:info")
//    @ApiOperation(value = "仓储报盘详情接口")
//    @ApiImplicitParams({
//            @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
//    })
	public R info(@PathVariable("id") Long id){
		OfferEntity offer = offerService.queryObject(id);

		return R.ok().put("offer", offer);
	}

	/**
	 * 保存
	 */
	@PostMapping("/save")
//	@RequiresPermissions("storage:offer:save")
    @ApiOperation(value = "仓储报盘新增")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
    })
	public R save(@RequestBody OfferEntity offer){
		SysUserEntity user = getUser();
		offer.setMerchantId(user.getCompanyId());//公司id
		offer.setDeptId(null);//部门id
		offer.setDelFlag(0);
		offer.setCreatedBy(user.getUserId());
		offer.setCreatedTime(new Date());
		offer.setStatus(0);
		//生成编码
		//先判断是否手动输入
		if (offer.getCode() == null || "".equals(offer.getCode())) {
			offer.setCode(sysNumberRuleService.getCodeNumber("storage_offer_code"));
		} else {
			OfferEntity offerEntity = offerService.checkCode(offer);
			if (offerEntity != null) {
				return R.error("编码已存在");
			}
		}
		offerService.save(offer);

		return R.ok();
	}

	/**
	 * 修改
	 */
	@PostMapping("/update")
//	@RequiresPermissions("storage:offer:update")
//    @ApiOperation(value = "仓储报盘修改接口")
//    @ApiImplicitParams({
//            @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
//    })
	public R update(@RequestBody OfferEntity offer){
		offer.setUpdatedBy(getUserId());
		offer.setCreatedTime(new Date());
		offerService.update(offer);

		return R.ok();
	}

	/**
	 * 修改报盘上下架状态
	 */
	@PostMapping("/updateList")
//	@RequiresPermissions("storage:offer:update")
//	@ApiOperation(value = "批量上下架仓储报盘的接口")
//	@ApiImplicitParams({
//			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
//	})
	public R updateList(@RequestBody List<OfferEntity> offers) {
		for (OfferEntity offer:offers) {
			offer.setUpdatedBy(getUserId());
			offer.setUpdatedTime(new Date());
		}

		offerService.updateList(offers);

		return R.ok();
	}

	/**
	 * 删除
	 */
	@PostMapping("/delete")
//	@RequiresPermissions("storage:offer:delete")
//    @ApiOperation(value = "仓储报盘删除接口")
//    @ApiImplicitParams({
//            @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
//    })
	public R delete(@RequestBody Long[] ids){
		offerService.deleteBatch(ids);

		return R.ok();
	}

	@PostMapping("/checkCode")
//    @ApiOperation(value = "仓储报盘查询接口")
//    @ApiImplicitParams({
//            @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
//    })
	public R checkCode(@RequestBody OfferEntity offer){
		offer=offerService.checkCode(offer);

		return R.ok().put("offer",offer);
	}


	/**
	 * 列表
	 */
	@GetMapping("/queryByCompanyId")
//    @ApiOperation(value = "仓储报盘列表接口")
//    @ApiImplicitParams({
//            @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
//    })
	public R queryByCompanyId(@RequestBody String merchantId){
		//String merchantId = request.getParameter("merchantId");
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("merchantId",merchantId);
		List<OfferEntity> list = offerService.queryList(params);

		return R.ok().put("list",list);
	}
}
