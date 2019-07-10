
package com.wzlue.chain.web.controller.ship;

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

import com.wzlue.chain.ship.entity.GoodsOrderShipEntity;
import com.wzlue.chain.ship.service.GoodsOrderShipService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 订单发货明细表(国内)
 * 
 * @author 
 * @email 
 * @date 2018-09-25 13:58:00
 */
@RestController
@RequestMapping("/ship/goodsordership")
public class GoodsOrderShipController extends AbstractController{
	@Autowired
	private GoodsOrderShipService goodsOrderShipService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<GoodsOrderShipEntity> goodsOrderShipList = goodsOrderShipService.queryList(query);
		int total = goodsOrderShipService.queryTotal(query);
		
		return R.page(goodsOrderShipList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("ship:goodsordership:info")
	public R info(@PathVariable("id") Integer id){
		GoodsOrderShipEntity goodsOrderShip = goodsOrderShipService.queryObject(id);
		
		return R.ok().put("goodsOrderShip", goodsOrderShip);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("ship:goodsordership:save")
	public R save(@RequestBody GoodsOrderShipEntity goodsOrderShip){
		goodsOrderShipService.save(goodsOrderShip);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("ship:goodsordership:update")
	public R update(@RequestBody GoodsOrderShipEntity goodsOrderShip){
		goodsOrderShipService.update(goodsOrderShip);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("ship:goodsordership:delete")
	public R delete(@RequestBody Integer[] ids){
		goodsOrderShipService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
