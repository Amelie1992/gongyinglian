
package com.wzlue.chain.web.controller.order;

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

import com.wzlue.chain.order.entity.GoodsOrderDetailEntity;
import com.wzlue.chain.order.service.GoodsOrderDetailService;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 订单商品列表
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-15 19:47:29
 */
@RestController
@RequestMapping("/order/goodsorderdetail")
public class GoodsOrderDetailController extends AbstractController{
	@Autowired
	private GoodsOrderDetailService goodsOrderDetailService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<GoodsOrderDetailEntity> goodsOrderDetailList = goodsOrderDetailService.queryList(query);
		int total = goodsOrderDetailService.queryTotal(query);
		
		return R.page(goodsOrderDetailList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("order:goodsorderdetail:info")
	public R info(@PathVariable("id") Long id){
		GoodsOrderDetailEntity goodsOrderDetail = goodsOrderDetailService.queryObject(id);
		
		return R.ok().put("goodsOrderDetail", goodsOrderDetail);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("order:goodsorderdetail:save")
	public R save(@RequestBody GoodsOrderDetailEntity goodsOrderDetail){
		goodsOrderDetailService.save(goodsOrderDetail);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("order:goodsorderdetail:update")
	public R update(@RequestBody GoodsOrderDetailEntity goodsOrderDetail){
		goodsOrderDetailService.update(goodsOrderDetail);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("order:goodsorderdetail:delete")
	public R delete(@RequestBody Long[] ids){
		goodsOrderDetailService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
