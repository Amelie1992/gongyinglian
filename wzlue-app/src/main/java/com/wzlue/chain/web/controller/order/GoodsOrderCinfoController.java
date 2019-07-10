
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

import com.wzlue.chain.order.entity.GoodsOrderCinfoEntity;
import com.wzlue.chain.order.service.GoodsOrderCinfoService;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 收货人信息
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-15 19:47:29
 */
@RestController
@RequestMapping("/order/goodsordercinfo")
public class GoodsOrderCinfoController extends AbstractController{
	@Autowired
	private GoodsOrderCinfoService goodsOrderCinfoService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<GoodsOrderCinfoEntity> goodsOrderCinfoList = goodsOrderCinfoService.queryList(query);
		int total = goodsOrderCinfoService.queryTotal(query);
		
		return R.page(goodsOrderCinfoList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("order:goodsordercinfo:info")
	public R info(@PathVariable("id") Long id){
		GoodsOrderCinfoEntity goodsOrderCinfo = goodsOrderCinfoService.queryObject(id);
		
		return R.ok().put("goodsOrderCinfo", goodsOrderCinfo);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("order:goodsordercinfo:save")
	public R save(@RequestBody GoodsOrderCinfoEntity goodsOrderCinfo){
		goodsOrderCinfoService.save(goodsOrderCinfo);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("order:goodsordercinfo:update")
	public R update(@RequestBody GoodsOrderCinfoEntity goodsOrderCinfo){
		goodsOrderCinfoService.update(goodsOrderCinfo);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("order:goodsordercinfo:delete")
	public R delete(@RequestBody Long[] ids){
		goodsOrderCinfoService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
