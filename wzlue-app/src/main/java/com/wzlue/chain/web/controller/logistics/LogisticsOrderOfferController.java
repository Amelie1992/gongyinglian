
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

import com.wzlue.chain.logistics.entity.LogisticsOrderOfferEntity;
import com.wzlue.chain.logistics.service.LogisticsOrderOfferService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 商品库物流报盘备份
 * 
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-08-31 15:13:24
 */
@RestController
@RequestMapping("/logistics/logisticsorderoffer")
public class LogisticsOrderOfferController extends AbstractController{
	@Autowired
	private LogisticsOrderOfferService logisticsOrderOfferService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<LogisticsOrderOfferEntity> logisticsOrderOfferList = logisticsOrderOfferService.queryList(query);
		int total = logisticsOrderOfferService.queryTotal(query);
		
		return R.page(logisticsOrderOfferList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("logistics:logisticsorderoffer:info")
	public R info(@PathVariable("id") Long id){
		LogisticsOrderOfferEntity logisticsOrderOffer = logisticsOrderOfferService.queryObject(id);
		
		return R.ok().put("logisticsOrderOffer", logisticsOrderOffer);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("logistics:logisticsorderoffer:save")
	public R save(@RequestBody LogisticsOrderOfferEntity logisticsOrderOffer){
		logisticsOrderOfferService.save(logisticsOrderOffer);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("logistics:logisticsorderoffer:update")
	public R update(@RequestBody LogisticsOrderOfferEntity logisticsOrderOffer){
		logisticsOrderOfferService.update(logisticsOrderOffer);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("logistics:logisticsorderoffer:delete")
	public R delete(@RequestBody Long[] ids){
		logisticsOrderOfferService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
