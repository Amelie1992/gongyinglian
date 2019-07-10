
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

import com.wzlue.chain.logistics.entity.LogisticsOrderShipEntity;
import com.wzlue.chain.logistics.service.LogisticsOrderShipService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 物流订单发货表
 * 
 * @author 
 * @email 
 * @date 2018-11-27 10:20:15
 */
@RestController
@RequestMapping("/logisticsoffer/logisticsordership")
public class LogisticsOrderShipController extends AbstractController{
	@Autowired
	private LogisticsOrderShipService logisticsOrderShipService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<LogisticsOrderShipEntity> logisticsOrderShipList = logisticsOrderShipService.queryList(query);
		int total = logisticsOrderShipService.queryTotal(query);
		
		return R.page(logisticsOrderShipList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("logisticsoffer:logisticsordership:info")
	public R info(@PathVariable("id") Long id){
		LogisticsOrderShipEntity logisticsOrderShip = logisticsOrderShipService.queryObject(id);
		
		return R.ok().put("logisticsOrderShip", logisticsOrderShip);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("logisticsoffer:logisticsordership:save")
	public R save(@RequestBody LogisticsOrderShipEntity logisticsOrderShip){
		logisticsOrderShipService.save(logisticsOrderShip);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("logisticsoffer:logisticsordership:update")
	public R update(@RequestBody LogisticsOrderShipEntity logisticsOrderShip){
		logisticsOrderShipService.update(logisticsOrderShip);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("logisticsoffer:logisticsordership:delete")
	public R delete(@RequestBody Long[] ids){
		logisticsOrderShipService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
