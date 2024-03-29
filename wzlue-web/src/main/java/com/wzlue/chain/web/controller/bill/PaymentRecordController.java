
package com.wzlue.chain.web.controller.bill;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.bill.entity.BillEntity;
import com.wzlue.chain.bill.service.BillService;
import com.wzlue.chain.logistics.entity.LogisticsOrderEntity;
import com.wzlue.chain.logistics.service.LogisticsOrderService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.wzlue.chain.web.controller.sys.AbstractController;

import com.wzlue.chain.bill.entity.PaymentRecordEntity;
import com.wzlue.chain.bill.service.PaymentRecordService;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 付款（收款）记录
 * 
 * @author 
 * @email 
 * @date 2018-09-12 18:59:16
 */
@RestController
@RequestMapping("/paymentRecord/paymentrecord")
public class PaymentRecordController extends AbstractController{
	@Autowired
	private PaymentRecordService paymentRecordService;
	@Autowired
	private LogisticsOrderService logisticsOrderService;
	@Autowired
	private BillService billService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
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
//	@RequiresPermissions("paymentRecord:paymentrecord:info")
	public R info(@PathVariable("id") Integer id){
		PaymentRecordEntity paymentRecord = paymentRecordService.queryObject(id);
		
		return R.ok().put("paymentRecord", paymentRecord);
	}

	/**
	 * 物流订单：获取应收应付id，为条件查询付款记录基本数据
	 * @param id
	 * @return
	 */
	@RequestMapping("/infos/{id}")
	public R infos(@PathVariable("id") Long id) {
		LogisticsOrderEntity logisticsOrder = logisticsOrderService.queryObject(id);
		BillEntity	billEntity = billService.queryByOrderNumber(logisticsOrder.getOrderNumber());
		PaymentRecordEntity paymentRecord = paymentRecordService.queryByBillId(billEntity.getId());
		return R.ok().put("paymentRecord", paymentRecord);
	}
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("paymentRecord:paymentrecord:save")
	public R save(@RequestBody PaymentRecordEntity paymentRecord){
		paymentRecordService.save(paymentRecord);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("paymentRecord:paymentrecord:update")
	public R update(@RequestBody PaymentRecordEntity paymentRecord){
		paymentRecordService.update(paymentRecord);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("paymentRecord:paymentrecord:delete")
	public R delete(@RequestBody Integer[] ids){
		paymentRecordService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
