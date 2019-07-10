
package com.wzlue.chain.web.controller.bill;

import java.util.List;
import java.util.Map;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.wzlue.chain.web.controller.sys.AbstractController;

import com.wzlue.chain.bill.entity.PaymentRecordEntity;
import com.wzlue.chain.bill.service.PaymentRecordService;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
import springfox.documentation.annotations.ApiIgnore;


/**
 * 付款（收款）记录
 * 
 * @author 
 * @email 
 * @date 2018-09-12 18:59:16
 */
@RestController
@RequestMapping("/paymentRecord/paymentrecord")
@Api("收/付款记录")
public class PaymentRecordController extends AbstractController{
	@Autowired
	private PaymentRecordService paymentRecordService;
	
	/**
	 * 列表
	 */
	@GetMapping("/list")
	@ApiOperation(value = "收/付款记录列表")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string"),
            @ApiImplicitParam(paramType = "query", name = "billId", value = "账单id", required = true, dataType = "int"),
            @ApiImplicitParam(paramType = "query", name = "from", value = "开始时间", dataType = "string"),
            @ApiImplicitParam(paramType = "query", name = "to", value = "结束时间", dataType = "string")
	})
	public R list(@ApiIgnore @RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<PaymentRecordEntity> paymentRecordList = paymentRecordService.queryList(query);
		int total = paymentRecordService.queryTotal(query);
		
		return R.page(paymentRecordList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
//	//@RequiresPermissions("paymentRecord:paymentrecord:info")
	public R info(@PathVariable("id") Integer id){
		PaymentRecordEntity paymentRecord = paymentRecordService.queryObject(id);
		
		return R.ok().put("paymentRecord", paymentRecord);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	//@RequiresPermissions("paymentRecord:paymentrecord:save")
	public R save(@RequestBody PaymentRecordEntity paymentRecord){
		paymentRecordService.save(paymentRecord);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	//@RequiresPermissions("paymentRecord:paymentrecord:update")
	public R update(@RequestBody PaymentRecordEntity paymentRecord){
		paymentRecordService.update(paymentRecord);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	//@RequiresPermissions("paymentRecord:paymentrecord:delete")
	public R delete(@RequestBody Integer[] ids){
		paymentRecordService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
