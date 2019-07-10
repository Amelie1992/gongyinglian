
package com.wzlue.chain.web.controller.marketing;

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

import com.wzlue.chain.marketing.entity.MarketTenderRecordEntity;
import com.wzlue.chain.marketing.service.MarketTenderRecordService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 竞标记录表
 * 
 * @author 
 * @email 
 * @date 2018-10-24 15:57:53
 */
@RestController
@RequestMapping("/marketing/markettenderrecord")
public class MarketTenderRecordController extends AbstractController{
	@Autowired
	private MarketTenderRecordService marketTenderRecordService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<MarketTenderRecordEntity> marketTenderRecordList = marketTenderRecordService.queryList(query);
		int total = marketTenderRecordService.queryTotal(query);
		
		return R.page(marketTenderRecordList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
//	@RequiresPermissions("marketing:markettenderrecord:info")
	public R info(@PathVariable("id") Long id){
		MarketTenderRecordEntity marketTenderRecord = marketTenderRecordService.queryObject(id);
		
		return R.ok().put("marketTenderRecord", marketTenderRecord);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
//	@RequiresPermissions("marketing:markettenderrecord:save")
	public R save(@RequestBody MarketTenderRecordEntity marketTenderRecord){
		marketTenderRecordService.save(marketTenderRecord);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
//	@RequiresPermissions("marketing:markettenderrecord:update")
	public R update(@RequestBody MarketTenderRecordEntity marketTenderRecord){
		marketTenderRecordService.update(marketTenderRecord);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
//	@RequiresPermissions("marketing:markettenderrecord:delete")
	public R delete(@RequestBody Long[] ids){
		marketTenderRecordService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
