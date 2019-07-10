
package com.wzlue.chain.web.controller.storage;

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

import com.wzlue.chain.storage.entity.StorageOutCommodityEntity;
import com.wzlue.chain.storage.service.StorageOutCommodityService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 仓储出库商品表
 * 
 * @author 
 * @email 
 * @date 2018-09-15 11:17:18
 */
@RestController
@RequestMapping("/storage/storageoutcommodity")
public class StorageOutCommodityController extends AbstractController{
	@Autowired
	private StorageOutCommodityService storageOutCommodityService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<StorageOutCommodityEntity> storageOutCommodityList = storageOutCommodityService.queryList(query);
		int total = storageOutCommodityService.queryTotal(query);
		
		return R.page(storageOutCommodityList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("storage:storageoutcommodity:info")
	public R info(@PathVariable("id") Long id){
		StorageOutCommodityEntity storageOutCommodity = storageOutCommodityService.queryObject(id);
		
		return R.ok().put("storageOutCommodity", storageOutCommodity);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("storage:storageoutcommodity:save")
	public R save(@RequestBody StorageOutCommodityEntity storageOutCommodity){
		storageOutCommodityService.save(storageOutCommodity);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("storage:storageoutcommodity:update")
	public R update(@RequestBody StorageOutCommodityEntity storageOutCommodity){
		storageOutCommodityService.update(storageOutCommodity);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("storage:storageoutcommodity:delete")
	public R delete(@RequestBody Long[] ids){
		storageOutCommodityService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
