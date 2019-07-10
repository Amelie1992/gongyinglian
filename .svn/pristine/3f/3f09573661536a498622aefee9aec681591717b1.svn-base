
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

import com.wzlue.chain.storage.entity.StoragePayEntity;
import com.wzlue.chain.storage.service.StoragePayService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 仓储日费用记录表
 * 
 * @author 
 * @email 
 * @date 2018-09-15 11:17:18
 */
@RestController
@RequestMapping("/storage/storagepay")
public class StoragePayController extends AbstractController{
	@Autowired
	private StoragePayService storagePayService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<StoragePayEntity> storagePayList = storagePayService.queryList(query);
		int total = storagePayService.queryTotal(query);
		
		return R.page(storagePayList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("storage:storagepay:info")
	public R info(@PathVariable("id") Long id){
		StoragePayEntity storagePay = storagePayService.queryObject(id);
		
		return R.ok().put("storagePay", storagePay);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("storage:storagepay:save")
	public R save(@RequestBody StoragePayEntity storagePay){
		storagePayService.save(storagePay);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("storage:storagepay:update")
	public R update(@RequestBody StoragePayEntity storagePay){
		storagePayService.update(storagePay);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("storage:storagepay:delete")
	public R delete(@RequestBody Long[] ids){
		storagePayService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
