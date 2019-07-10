
package com.wzlue.chain.web.controller.storage;

import java.util.List;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.wzlue.chain.web.controller.sys.AbstractController;

import com.wzlue.chain.storage.entity.OrderCostEntity;
import com.wzlue.chain.storage.service.OrderCostService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 仓储订单其他费用
 * 
 * @author 
 * @email 
 * @date 2018-08-29 17:48:31
 */
@RestController
@RequestMapping("/storage/ordercost")
public class OrderCostController extends AbstractController{
	@Autowired
	private OrderCostService orderCostService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<OrderCostEntity> orderCostList = orderCostService.queryList(query);
		int total = orderCostService.queryTotal(query);
		
		return R.page(orderCostList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	//@RequiresPermissions("storage:ordercost:info")
	public R info(@PathVariable("id") Long id){
		OrderCostEntity orderCost = orderCostService.queryObjectByOrderId(id);
		
		return R.ok().put("orderCost", orderCost);
	}


	/**
	 * 保存
	 */
	@RequestMapping("/save")
	//@RequiresPermissions("storage:ordercost:save")
	public R save(@RequestBody OrderCostEntity orderCost){
		orderCostService.save(orderCost);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	//@RequiresPermissions("storage:ordercost:update")
	public R update(@RequestBody OrderCostEntity orderCost){
		orderCostService.update(orderCost);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	//@RequiresPermissions("storage:ordercost:delete")
	public R delete(@RequestBody Long[] ids){
		orderCostService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
