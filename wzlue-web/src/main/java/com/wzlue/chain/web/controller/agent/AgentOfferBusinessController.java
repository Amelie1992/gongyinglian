
package com.wzlue.chain.web.controller.agent;

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

import com.wzlue.chain.agent.entity.AgentOfferBusinessEntity;
import com.wzlue.chain.agent.service.AgentOfferBusinessService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;

/**
 * 代理报盘业务信息表(业务控制)
 *
 * @author
 * @date 2018-08-22
 */
@RestController
@RequestMapping("/agent/business")
public class AgentOfferBusinessController extends AbstractController{
	@Autowired
	private AgentOfferBusinessService agentOfferBusinessService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<AgentOfferBusinessEntity> agentOfferBusinessList = agentOfferBusinessService.queryList(query);
		int total = agentOfferBusinessService.queryTotal(query);
		
		return R.page(agentOfferBusinessList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("agent:offerbusiness:info")
	public R info(@PathVariable("id") Integer id){
		AgentOfferBusinessEntity agentOfferBusiness = agentOfferBusinessService.queryObject(id);
		
		return R.ok().put("agentOfferBusiness", agentOfferBusiness);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("agent:offerbusiness:save")
	public R save(@RequestBody AgentOfferBusinessEntity agentOfferBusiness){
		agentOfferBusinessService.save(agentOfferBusiness);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("agent:offerbusiness:update")
	public R update(@RequestBody AgentOfferBusinessEntity agentOfferBusiness){
		agentOfferBusinessService.update(agentOfferBusiness);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("agent:offerbusiness:delete")
	public R delete(@RequestBody Integer[] ids){
		agentOfferBusinessService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
