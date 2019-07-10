
package com.wzlue.chain.web.controller.complaint;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.sys.entity.SysUserEntity;
import com.wzlue.chain.sys.service.ImageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.wzlue.chain.web.controller.sys.AbstractController;

import com.wzlue.chain.complaint.entity.ComplaintEntity;
import com.wzlue.chain.complaint.service.ComplaintService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
import springfox.documentation.annotations.ApiIgnore;


/**
 * 投诉管理
 *
 * @author
 * @email
 * @date 2018-09-07 09:42:11
 */
@RestController
@RequestMapping("/complaint/complaint")
@Api(value = "投诉管理")
public class ComplaintController extends AbstractController{
	@Autowired
	private ComplaintService complaintService;

	/**
	 *
	 * 列表
	 */
	@GetMapping("/list")
	@ApiOperation(value = "平台投诉记录列表接口")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string"),
			@ApiImplicitParam(paramType = "query", name = "page", value = "页码", defaultValue = "1", dataType = "int"),
			@ApiImplicitParam(paramType = "query", name = "limit", value = "一页几条", defaultValue = "10", dataType = "int"),
			@ApiImplicitParam(paramType = "query", name = "status", value = "处理状态 0 : 待处理 1 : 处理中 2 : 完结", dataType = "int")
	})
	public R list(@ApiIgnore @RequestParam Map<String, Object> params) {
		Query query = new Query(params);
		List<ComplaintEntity> complaintList = null;
		int total = 0;
		SysUserEntity user = getUser();
		if (user.getCompanyId() == null && user.getTypeId().equals("0") && user.getCustomerService() == false) {
			complaintList = complaintService.queryList(query);
			total = complaintService.queryTotal(query);
		}
		return R.page(complaintList, total);
	}


	@GetMapping("/list1")
	@ApiOperation(value = "用户投诉记录列表接口")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string"),
			@ApiImplicitParam(paramType = "query", name = "page", value = "页码", defaultValue = "1", dataType = "int"),
			@ApiImplicitParam(paramType = "query", name = "limit", value = "一页几条", defaultValue = "10", dataType = "int"),
			@ApiImplicitParam(paramType = "query", name = "status", value = "处理状态 0 : 待处理 1 : 处理中 2 : 完结", dataType = "int")
	})
	public R list1(@ApiIgnore @RequestParam Map<String, Object> params) {
		Query query = new Query(params);
		List<ComplaintEntity> complaintList = null;
		int total = 0;
		SysUserEntity user = getUser();
		if (user.getCompanyId() == null && user.getTypeId().equals("0") && user.getCustomerService() == false) {
			return R.page(complaintList, total);
		}else {
			query.put("complaintFromId", getUser().getCompanyId());
			complaintList = complaintService.queryList(query);
			total = complaintService.queryTotal(query);
			return R.page(complaintList, total);
		}
	}


	@GetMapping("/list2")
	@ApiOperation(value = "用户被投诉记录列表接口")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string"),
			@ApiImplicitParam(paramType = "query", name = "page", value = "页码", defaultValue = "1", dataType = "int"),
			@ApiImplicitParam(paramType = "query", name = "limit", value = "一页几条", defaultValue = "10", dataType = "int"),
			@ApiImplicitParam(paramType = "query", name = "status", value = "处理状态 0 : 待处理 1 : 处理中 2 : 完结", dataType = "int")
	})
	public R list2(@ApiIgnore @RequestParam Map<String, Object> params) {
		Query query = new Query(params);
		List<ComplaintEntity> complaintList = null;
		int total = 0;
		SysUserEntity user = getUser();
		if (user.getCompanyId() == null && user.getTypeId().equals("0") && user.getCustomerService() == false) {
			return R.page(complaintList, total);
		}else {
			query.put("complaintToId", getUser().getCompanyId());
			complaintList = complaintService.queryList(query);
			total = complaintService.queryTotal(query);
			return R.page(complaintList, total);
		}
	}

	/**
	 * 信息
	 */
	@GetMapping("/info/{id}")
//	@RequiresPermissions("complaint:complaint:info")
	@ApiOperation(value = "投诉详情接口")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
	})
	public R info(@PathVariable("id") Integer id){
		ComplaintEntity complaint = complaintService.queryObject(id);

		return R.ok().put("complaint", complaint);
	}

	/**
	 * 保存
	 */
	@PostMapping("/save")
//	@RequiresPermissions("complaint:complaint:save")
	@ApiOperation(value = "投诉新增接口")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
	})
	public R save(@RequestBody ComplaintEntity complaint){
		complaintService.save(complaint);

		return R.ok();
	}

	/**
	 * 修改
	 */
	@PostMapping("/update")
//	@RequiresPermissions("complaint:complaint:update")
	@ApiOperation(value = "投诉修改接口")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
	})
	public R update(@RequestBody ComplaintEntity complaint){
		complaintService.update(complaint);

		return R.ok();
	}

	/**
	 * 删除
	 */
	@PostMapping("/delete")
//	@RequiresPermissions("complaint:complaint:delete")
	@ApiOperation(value = "投诉删除接口")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
	})
	public R delete(@RequestBody Integer[] ids){
		complaintService.deleteBatch(ids);

		return R.ok();
	}

	/**
	 * 处理
	 */
	@PostMapping("/handle")
//	@RequiresPermissions("complaint:complaint:update")
	@ApiOperation(value = "投诉处理接口")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
	})
	public R handle(@RequestBody ComplaintEntity complaint){
		complaintService.handle(complaint);

		return R.ok();
	}


	@PostMapping("/detail")
//	@RequiresPermissions("complaint:complaint:info")
	@ApiOperation(value = "根据订单编号查看投诉信息")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
	})
	public R detail(@RequestBody ComplaintEntity complaint){
		complaint.setCompanyId(getUser().getCompanyId().intValue());
		complaint = complaintService.queryObjectByOrderIdAndCompanyId(complaint);
		return R.ok().put("complaint", complaint);
	}

}
