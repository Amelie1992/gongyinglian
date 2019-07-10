
package com.wzlue.chain.web.controller.offer;

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

import com.wzlue.chain.offer.entity.GoodsOfferCommodityEntity;
import com.wzlue.chain.offer.service.GoodsOfferCommodityService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 货物商品表
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-15 14:30:02
 */
@RestController
@RequestMapping("/offer/goodsoffercommodity")
public class GoodsOfferCommodityController extends AbstractController{
	@Autowired
	private GoodsOfferCommodityService goodsOfferCommodityService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<GoodsOfferCommodityEntity> goodsOfferCommodityList = goodsOfferCommodityService.queryList(query);
		int total = goodsOfferCommodityService.queryTotal(query);
		
		return R.page(goodsOfferCommodityList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("offer:goodsoffercommodity:info")
	public R info(@PathVariable("id") Long id){
		GoodsOfferCommodityEntity goodsOfferCommodity = goodsOfferCommodityService.queryObject(id);
		
		return R.ok().put("goodsOfferCommodity", goodsOfferCommodity);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("offer:goodsoffercommodity:save")
	public R save(@RequestBody GoodsOfferCommodityEntity goodsOfferCommodity){
		goodsOfferCommodityService.save(goodsOfferCommodity);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("offer:goodsoffercommodity:update")
	public R update(@RequestBody GoodsOfferCommodityEntity goodsOfferCommodity){
		goodsOfferCommodityService.update(goodsOfferCommodity);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("offer:goodsoffercommodity:delete")
	public R delete(@RequestBody Long[] ids){
		goodsOfferCommodityService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
