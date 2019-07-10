
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

import com.wzlue.chain.order.entity.GoodsOrderCommodityEntity;
import com.wzlue.chain.order.service.GoodsOrderCommodityService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 货物商品表
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-09-10 10:59:51
 */
@RestController
@RequestMapping("/order/goodsordercommodity")
public class GoodsOrderCommodityController extends AbstractController{
	@Autowired
	private GoodsOrderCommodityService goodsOrderCommodityService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<GoodsOrderCommodityEntity> goodsOrderCommodityList = goodsOrderCommodityService.queryList(query);
		int total = goodsOrderCommodityService.queryTotal(query);
		
		return R.page(goodsOrderCommodityList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("order:goodsordercommodity:info")
	public R info(@PathVariable("id") Long id){
		GoodsOrderCommodityEntity goodsOrderCommodity = goodsOrderCommodityService.queryObject(id);
		
		return R.ok().put("goodsOrderCommodity", goodsOrderCommodity);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("order:goodsordercommodity:save")
	public R save(@RequestBody GoodsOrderCommodityEntity goodsOrderCommodity){
		goodsOrderCommodityService.save(goodsOrderCommodity);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("order:goodsordercommodity:update")
	public R update(@RequestBody GoodsOrderCommodityEntity goodsOrderCommodity){
		goodsOrderCommodityService.update(goodsOrderCommodity);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("order:goodsordercommodity:delete")
	public R delete(@RequestBody Long[] ids){
		goodsOrderCommodityService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
