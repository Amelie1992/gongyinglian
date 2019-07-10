
package com.wzlue.chain.web.controller.marketing;

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

import com.wzlue.chain.marketing.entity.MarketAuctionCommodityEntity;
import com.wzlue.chain.marketing.service.MarketAuctionCommodityService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 拍卖商品表
 * 
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-09-26 14:05:34
 */
@RestController
@RequestMapping("/marketing/marketauctioncommodity")
public class MarketAuctionCommodityController extends AbstractController{
	@Autowired
	private MarketAuctionCommodityService marketAuctionCommodityService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<MarketAuctionCommodityEntity> marketAuctionCommodityList = marketAuctionCommodityService.queryList(query);
		int total = marketAuctionCommodityService.queryTotal(query);
		
		return R.page(marketAuctionCommodityList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("marketing:marketauctioncommodity:info")
	public R info(@PathVariable("id") Long id){
		MarketAuctionCommodityEntity marketAuctionCommodity = marketAuctionCommodityService.queryObject(id);
		
		return R.ok().put("marketAuctionCommodity", marketAuctionCommodity);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("marketing:marketauctioncommodity:save")
	public R save(@RequestBody MarketAuctionCommodityEntity marketAuctionCommodity){
		marketAuctionCommodityService.save(marketAuctionCommodity);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("marketing:marketauctioncommodity:update")
	public R update(@RequestBody MarketAuctionCommodityEntity marketAuctionCommodity){
		marketAuctionCommodityService.update(marketAuctionCommodity);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("marketing:marketauctioncommodity:delete")
	public R delete(@RequestBody Long[] ids){
		marketAuctionCommodityService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
