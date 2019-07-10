
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

import com.wzlue.chain.logistics.entity.LogisticsOrderCommodityEntity;
import com.wzlue.chain.logistics.service.LogisticsOrderCommodityService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 物流订单商品表
 * 
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-09-06 16:42:34
 */
@RestController
@RequestMapping("/logistics/logisticsordercommodity")
public class LogisticsOrderCommodityController extends AbstractController{
	@Autowired
	private LogisticsOrderCommodityService logisticsOrderCommodityService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<LogisticsOrderCommodityEntity> logisticsOrderCommodityList = logisticsOrderCommodityService.queryList(query);
		int total = logisticsOrderCommodityService.queryTotal(query);
		
		return R.page(logisticsOrderCommodityList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("logistics:logisticsordercommodity:info")
	public R info(@PathVariable("id") Long id){
		LogisticsOrderCommodityEntity logisticsOrderCommodity = logisticsOrderCommodityService.queryObject(id);
		
		return R.ok().put("logisticsOrderCommodity", logisticsOrderCommodity);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("logistics:logisticsordercommodity:save")
	public R save(@RequestBody LogisticsOrderCommodityEntity logisticsOrderCommodity){
		logisticsOrderCommodityService.save(logisticsOrderCommodity);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("logistics:logisticsordercommodity:update")
	public R update(@RequestBody LogisticsOrderCommodityEntity logisticsOrderCommodity){
		logisticsOrderCommodityService.update(logisticsOrderCommodity);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("logistics:logisticsordercommodity:delete")
	public R delete(@RequestBody Long[] ids){
		logisticsOrderCommodityService.deleteBatch(ids);
		
		return R.ok();
	}

	@RequestMapping("/getListByOrderNumber/{orderNumber}")
	public R getListByOrderNumber(@PathVariable("orderNumber") String orderNumber){

		Map<String, Object>	map = logisticsOrderCommodityService.getListByOrderNumber(orderNumber,getUserId());

		return R.ok().put("GoodMap",map);
	}
	
}
