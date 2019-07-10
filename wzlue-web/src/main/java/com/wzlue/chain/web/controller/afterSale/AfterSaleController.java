
package com.wzlue.chain.web.controller.afterSale;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import com.wzlue.chain.complaint.entity.ComplaintEntity;
import com.wzlue.chain.sys.entity.SysUserEntity;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.wzlue.chain.web.controller.sys.AbstractController;

import com.wzlue.chain.afterSale.entity.AfterSaleEntity;
import com.wzlue.chain.afterSale.service.AfterSaleService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 售后服务
 * 
 * @author 
 * @email 
 * @date 2018-08-31 13:38:09
 */
@RestController
@RequestMapping("/afterSale/aftersale")
public class AfterSaleController extends AbstractController{
	@Autowired
	private AfterSaleService afterSaleService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list/buyer")
	public R list1(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
		//当前用户的公司id作为查询参数
		Long companyId = getUser().getCompanyId();
		if (companyId != null){
			query.put("buyerId",companyId.intValue());
		}
		List<AfterSaleEntity> afterSaleList = afterSaleService.queryList(query);
		int total = afterSaleService.queryTotal(query);
		return R.page(afterSaleList,total);
	}

	@RequestMapping("/list/seller")
	public R list2(@RequestParam Map<String, Object> params){
		//查询列表数据
		Query query = new Query(params);
		Long companyId = getUser().getCompanyId();
		if (companyId != null){
			query.put("sellerId",companyId.intValue());
		}
		List<AfterSaleEntity> afterSaleList = afterSaleService.queryList(query);
		int total = afterSaleService.queryTotal(query);
		return R.page(afterSaleList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("afterSale:aftersale:info")
	public R info(@PathVariable("id") String id){
		AfterSaleEntity afterSale = afterSaleService.queryObject(id);
		
		return R.ok().put("afterSale", afterSale);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("afterSale:aftersale:save")
	public R save(@RequestBody AfterSaleEntity afterSale){
		afterSaleService.save(afterSale);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("afterSale:aftersale:update")
	public R update(@RequestBody AfterSaleEntity afterSale){
		afterSaleService.update(afterSale);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("afterSale:aftersale:delete")
	public R delete(@RequestBody String[] ids){
		afterSaleService.deleteBatch(ids);
		
		return R.ok();
	}

	/**
	 * 处理
	 */
	@RequestMapping("/handle")
	@RequiresPermissions("afterSale:aftersale:update")
	public R handle(@RequestBody AfterSaleEntity afterSale){
		afterSaleService.handle(afterSale);

		return R.ok();
	}

	@RequestMapping("/detail")
	@RequiresPermissions("afterSale:aftersale:info")
	public R detail(@RequestBody AfterSaleEntity afterSale) {
		afterSale = afterSaleService.queryByOrderId(afterSale.getOrderId());
		return R.ok().put("afterSale", afterSale);
	}

	/**
	 * 查询当前订单是否已经售后
	 * @param id
	 * @return
	 */
	@RequestMapping("/getAfter/{id}")
	public R getAfter(@PathVariable("id") String id){
		int count = afterSaleService.getAfter(id);
		return R.ok().put("count", count);
	}
	
}
