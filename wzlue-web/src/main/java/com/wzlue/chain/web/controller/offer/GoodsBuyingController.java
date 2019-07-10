
package com.wzlue.chain.web.controller.offer;

import java.util.HashMap;
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

import com.wzlue.chain.offer.entity.GoodsBuyingEntity;
import com.wzlue.chain.offer.service.GoodsBuyingService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 货物求购
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-23 10:01:30
 */
@RestController
@RequestMapping("/offer/goodsbuying")
public class GoodsBuyingController extends AbstractController{
	@Autowired
	private GoodsBuyingService goodsBuyingService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<GoodsBuyingEntity> goodsBuyingList = goodsBuyingService.queryList(query);
		int total = goodsBuyingService.queryTotal(query);
		
		return R.page(goodsBuyingList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("offer:goodsbuying:info")
	public R info(@PathVariable("id") Long id){
		GoodsBuyingEntity goodsBuying = goodsBuyingService.queryObject(id);
		
		return R.ok().put("goodsBuying", goodsBuying);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("offer:goodsbuying:save")
	public R save(@RequestBody GoodsBuyingEntity goodsBuying){
		goodsBuyingService.save(goodsBuying);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("offer:goodsbuying:update")
	public R update(@RequestBody GoodsBuyingEntity goodsBuying){
		goodsBuyingService.update(goodsBuying);
		
		return R.ok();
	}
	
	/**
	 * 修改下架
	 */
	@RequestMapping("/updateUnsold")
	@RequiresPermissions("offer:goodsbuying:update")
	public R updateUnsold(@RequestBody Long[] ids){
        Map<String,Object> params=new HashMap<>(16);
        params.put("ids",ids);
        params.put("buyingStatus",1);
		goodsBuyingService.updateUnsold(params);
		
		return R.ok();
	}
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("offer:goodsbuying:delete")
	public R delete(@RequestBody Long[] ids){
		goodsBuyingService.deleteBatch(ids);

		return R.ok();
	}
	
}
