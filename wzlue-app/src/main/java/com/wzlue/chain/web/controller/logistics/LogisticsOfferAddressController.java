
package com.wzlue.chain.web.controller.logistics;

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

import com.wzlue.chain.logistics.entity.LogisticsOfferAddressEntity;
import com.wzlue.chain.logistics.service.LogisticsOfferAddressService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 物流报盘运输线路表
 * 
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-08-16 14:12:25
 */
@RestController
@RequestMapping("/logistics/logisticsofferaddress")
public class LogisticsOfferAddressController extends AbstractController{
	@Autowired
	private LogisticsOfferAddressService logisticsOfferAddressService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<LogisticsOfferAddressEntity> logisticsOfferAddressList = logisticsOfferAddressService.queryList(query);
		int total = logisticsOfferAddressService.queryTotal(query);
		
		return R.page(logisticsOfferAddressList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("logistics:logisticsofferaddress:info")
	public R info(@PathVariable("id") Long id){
		LogisticsOfferAddressEntity logisticsOfferAddress = logisticsOfferAddressService.queryObject(id);
		
		return R.ok().put("logisticsOfferAddress", logisticsOfferAddress);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("logistics:logisticsofferaddress:save")
	public R save(@RequestBody LogisticsOfferAddressEntity logisticsOfferAddress){
		logisticsOfferAddressService.save(logisticsOfferAddress);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("logistics:logisticsofferaddress:update")
	public R update(@RequestBody LogisticsOfferAddressEntity logisticsOfferAddress){
		logisticsOfferAddressService.update(logisticsOfferAddress);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("logistics:logisticsofferaddress:delete")
	public R delete(@RequestBody Long[] ids){
		logisticsOfferAddressService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
