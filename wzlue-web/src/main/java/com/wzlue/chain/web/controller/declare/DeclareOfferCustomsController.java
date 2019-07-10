
package com.wzlue.chain.web.controller.declare;

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

import com.wzlue.chain.declare.entity.DeclareOfferCustomsEntity;
import com.wzlue.chain.declare.service.DeclareOfferCustomsService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 报关报盘海关
 * 
 * @author ÎºË¼Æë
 * @email sunlightcs@gmail.com
 * @date 2018-08-16 16:12:27
 */
@RestController
@RequestMapping("/declare/declareoffercustoms")
public class DeclareOfferCustomsController extends AbstractController{
	@Autowired
	private DeclareOfferCustomsService declareOfferCustomsService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<DeclareOfferCustomsEntity> declareOfferCustomsList = declareOfferCustomsService.queryList(query);
		int total = declareOfferCustomsService.queryTotal(query);
		
		return R.page(declareOfferCustomsList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("declare:declareoffercustoms:info")
	public R info(@PathVariable("id") Integer id){
		DeclareOfferCustomsEntity declareOfferCustoms = declareOfferCustomsService.queryObject(id);
		
		return R.ok().put("declareOfferCustoms", declareOfferCustoms);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("declare:declareoffercustoms:save")
	public R save(@RequestBody DeclareOfferCustomsEntity declareOfferCustoms){
		declareOfferCustomsService.save(declareOfferCustoms);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("declare:declareoffercustoms:update")
	public R update(@RequestBody DeclareOfferCustomsEntity declareOfferCustoms){
		declareOfferCustomsService.update(declareOfferCustoms);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("declare:declareoffercustoms:delete")
	public R delete(@RequestBody Integer[] ids){
		declareOfferCustomsService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
