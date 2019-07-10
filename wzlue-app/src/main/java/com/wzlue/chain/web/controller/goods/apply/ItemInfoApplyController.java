
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

import com.wzlue.chain.goods.entity.apply.ItemInfoApplyEntity;
import com.wzlue.chain.goods.service.apply.ItemInfoApplyService;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
/**
 * 商品申请表(商品信息)
 * 
 * @date 2018-08-13
 */
@RequestMapping("/goods/apply")
@RestController
public class ItemInfoApplyController extends AbstractController{
	@Autowired
	private ItemInfoApplyService itemInfoApplyService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<ItemInfoApplyEntity> itemInfoApplyList = itemInfoApplyService.pageList(query);
		int total = itemInfoApplyService.pageCount(query);
		
		return R.page(itemInfoApplyList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("item:apply:info")
	public R info(@PathVariable("id") Long id){
		ItemInfoApplyEntity itemInfoApply = itemInfoApplyService.queryInfo(id);
		
		return R.ok().put("itemInfoApply", itemInfoApply);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("item:apply:save")
	public R save(@RequestBody ItemInfoApplyEntity itemInfoApply){
		itemInfoApply.setCreateBy(getUserId());
		itemInfoApply.setUpdateBy(getUserId());
		itemInfoApplyService.save(itemInfoApply);
		
		return R.ok();
	}
	/**
	 * 审核
	 */
	@RequestMapping("/review")
	public R review(@RequestBody ItemInfoApplyEntity itemInfoApply){
		itemInfoApply.setUpdateBy(getUserId());
		itemInfoApplyService.review(itemInfoApply);
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("item:apply:update")
	public R update(@RequestBody ItemInfoApplyEntity itemInfoApply){
		itemInfoApplyService.update(itemInfoApply);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 * @param id
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("item:apply:delete")
	public R delete(Long[] id){
		itemInfoApplyService.updateDel(id);
		
		return R.ok();
	}
	
}
