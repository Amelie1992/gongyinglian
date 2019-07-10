
package com.wzlue.chain.web.controller.afterSale;

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

import com.wzlue.chain.afterSale.entity.AfterSaleGoodsEntity;
import com.wzlue.chain.afterSale.service.AfterSaleGoodsService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 申请售后的商品信息
 * 
 * @author 
 * @email 
 * @date 2018-09-15 16:30:14
 */
@RestController
@RequestMapping("/afterSale/aftersalegoods")
public class AfterSaleGoodsController extends AbstractController{
	@Autowired
	private AfterSaleGoodsService afterSaleGoodsService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<AfterSaleGoodsEntity> afterSaleGoodsList = afterSaleGoodsService.queryList(query);
		int total = afterSaleGoodsService.queryTotal(query);
		
		return R.page(afterSaleGoodsList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("afterSale:aftersalegoods:info")
	public R info(@PathVariable("id") Integer id){
		AfterSaleGoodsEntity afterSaleGoods = afterSaleGoodsService.queryObject(id);
		
		return R.ok().put("afterSaleGoods", afterSaleGoods);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("afterSale:aftersalegoods:save")
	public R save(@RequestBody AfterSaleGoodsEntity afterSaleGoods){
		afterSaleGoodsService.save(afterSaleGoods);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("afterSale:aftersalegoods:update")
	public R update(@RequestBody AfterSaleGoodsEntity afterSaleGoods){
		afterSaleGoodsService.update(afterSaleGoods);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("afterSale:aftersalegoods:delete")
	public R delete(@RequestBody Integer[] ids){
		afterSaleGoodsService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
