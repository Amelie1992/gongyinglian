
package com.wzlue.chain.web.controller.pre;

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

import com.wzlue.chain.pre.entity.GoodsOrderPreEntity;
import com.wzlue.chain.pre.service.GoodsOrderPreService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 订单审核明细表
 * 
 * @author 
 * @email 
 * @date 2018-09-20 10:59:57
 */
@RestController
@RequestMapping("/pre/goodsorderpre")
public class GoodsOrderPreController extends AbstractController{
	@Autowired
	private GoodsOrderPreService goodsOrderPreService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<GoodsOrderPreEntity> goodsOrderPreList = goodsOrderPreService.queryList(query);
		int total = goodsOrderPreService.queryTotal(query);
		
		return R.page(goodsOrderPreList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	//@RequiresPermissions("pre:goodsorderpre:info")
	public R info(@PathVariable("id") Integer id){
		GoodsOrderPreEntity goodsOrderPre = goodsOrderPreService.queryObject(id);
		
		return R.ok().put("goodsOrderPre", goodsOrderPre);
	}
	/**
	 * 信息
	 */
	@RequestMapping("/getByOrderId/{orderId}")
	//@RequiresPermissions("pre:goodsorderpre:info")
	public R getByOrderId(@PathVariable("orderId") String orderId){
		GoodsOrderPreEntity goodsOrderPre = goodsOrderPreService.getByOrderId(orderId);

		return R.ok().put("goodsOrderPre", goodsOrderPre);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	//@RequiresPermissions("pre:goodsorderpre:save")
	public R save(@RequestBody GoodsOrderPreEntity goodsOrderPre){
		goodsOrderPreService.save(goodsOrderPre);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	//@RequiresPermissions("pre:goodsorderpre:update")
	public R update(@RequestBody GoodsOrderPreEntity goodsOrderPre){
		goodsOrderPreService.update(goodsOrderPre);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	//@RequiresPermissions("pre:goodsorderpre:delete")
	public R delete(@RequestBody Integer[] ids){
		goodsOrderPreService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
