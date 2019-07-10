
package com.wzlue.chain.web.controller.goods.apply;

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

import com.wzlue.chain.goods.entity.apply.ItemPlaceApplyEntity;
import com.wzlue.chain.goods.service.apply.ItemPlaceApplyService;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;


/**
 * 商品产地信息申请表
 * 
 * @author ÎºË¼Æë
 * @email sunlightcs@gmail.com
 * @date 2018-08-13 21:17:39
 */
@RestController
@RequestMapping("/goods/place/apply")
public class ItemPlaceApplyController extends AbstractController{
	@Autowired
	private ItemPlaceApplyService itemPlaceApplyService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<ItemPlaceApplyEntity> itemPlaceApplyList = itemPlaceApplyService.queryList(query);
		int total = itemPlaceApplyService.queryTotal(query);
		
		return R.page(itemPlaceApplyList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("supplier:itemplaceapply:info")
	public R info(@PathVariable("id") Integer id){
		ItemPlaceApplyEntity itemPlaceApply = itemPlaceApplyService.queryObject(id);
		
		return R.ok().put("itemPlaceApply", itemPlaceApply);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("supplier:itemplaceapply:save")
	public R save(@RequestBody ItemPlaceApplyEntity itemPlaceApply){
		itemPlaceApplyService.save(itemPlaceApply);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("supplier:itemplaceapply:update")
	public R update(@RequestBody ItemPlaceApplyEntity itemPlaceApply){
		itemPlaceApplyService.update(itemPlaceApply);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("supplier:itemplaceapply:delete")
	public R delete(@RequestBody Integer[] ids){
		itemPlaceApplyService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
