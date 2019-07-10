
package com.wzlue.chain.web.controller.depot;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.depot.dao.GoodsOrderDepotDao;
import com.wzlue.chain.order.entity.GoodsOrderEntity;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.wzlue.chain.web.controller.sys.AbstractController;

import com.wzlue.chain.depot.entity.GoodsOrderDepotEntity;
import com.wzlue.chain.depot.service.GoodsOrderDepotService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 订单仓储信息
 * 
 * @author 
 * @email 
 * @date 2018-09-28 19:12:05
 */
@RestController
@RequestMapping("/depot/goodsorderdepot")
public class GoodsOrderDepotController extends AbstractController{
	@Autowired
	private GoodsOrderDepotService goodsOrderDepotService;

	@Autowired
	private GoodsOrderDepotDao goodsOrderDepotDao;
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<GoodsOrderDepotEntity> goodsOrderDepotList = goodsOrderDepotService.queryList(query);
		int total = goodsOrderDepotService.queryTotal(query);
		
		return R.page(goodsOrderDepotList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("depot:goodsorderdepot:info")
	public R info(@PathVariable("id") Integer id){
		GoodsOrderDepotEntity goodsOrderDepot = goodsOrderDepotService.queryObject(id);
		
		return R.ok().put("goodsOrderDepot", goodsOrderDepot);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("depot:goodsorderdepot:save")
	public R save(@RequestBody GoodsOrderDepotEntity goodsOrderDepot){
		goodsOrderDepotService.save(goodsOrderDepot);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("depot:goodsorderdepot:update")
	public R update(@RequestBody GoodsOrderDepotEntity goodsOrderDepot){
		goodsOrderDepotService.update(goodsOrderDepot);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("depot:goodsorderdepot:delete")
	public R delete(@RequestBody Integer[] ids){
		goodsOrderDepotService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
