
package com.wzlue.chain.web.controller.agreement;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.agreement.entity.AgreeMentEntity;
import com.wzlue.chain.agreement.service.AgreeMentGlService;
import com.wzlue.chain.agreement.service.AgreeMentService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.wzlue.chain.web.controller.sys.AbstractController;


import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 
 * 
 * @author 
 * @email 
 * @date 2018-11-05 17:34:33
 */
@RestController
@RequestMapping("/agreement/agreement")
public class AgreeMentController extends AbstractController{
	@Autowired
	private AgreeMentService agreeMentService;

	@Autowired
	private AgreeMentGlService agreeMentGlService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<AgreeMentEntity> agreeMentList = agreeMentService.queryList(query);
		int total = agreeMentService.queryTotal(query);
		
		return R.page(agreeMentList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{xieyiId}")
	@RequiresPermissions("agreement:agreement:info")
	public R info(@PathVariable("xieyiId") Integer xieyiId){
		AgreeMentEntity agreeMent = agreeMentService.queryObject(xieyiId);
		
		return R.ok().put("agreeMent", agreeMent);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("agreement:agreement:save")
	public R save(@RequestBody AgreeMentEntity agreeMent){
		agreeMentService.save(agreeMent);
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("agreement:agreement:update")
	public R update(@RequestBody AgreeMentEntity agreeMent){
		agreeMentService.update(agreeMent);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("agreement:agreement:delete")
	public R delete(@RequestBody Integer[] xieyiIds){
		agreeMentService.deleteBatch(xieyiIds);
		
		return R.ok();
	}
	
}
