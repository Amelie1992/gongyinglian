
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

import com.wzlue.chain.agent.entity.AgentDemandEntity;
import com.wzlue.chain.agent.service.AgentDemandService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 代理(求购)信息表
 * 业务控制层
 * @author 
 * @email 
 * @date 2018-09-10 17:54:11
 */
@RestController
@RequestMapping("/agent/demand")
public class AgentDemandController extends AbstractController{
	@Autowired
	private AgentDemandService agentDemandService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<AgentDemandEntity> agentDemandList = agentDemandService.pageList(query);
		int total = agentDemandService.pageCount(query);
		
		return R.page(agentDemandList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("agent:demand:info")
	public R info(@PathVariable("id") Long id){
		AgentDemandEntity agentDemand = agentDemandService.queryDetail(id);
		
		return R.ok(agentDemand);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("agent:demand:save")
	public R save(@RequestBody AgentDemandEntity agentDemand){
		agentDemand.setDelFlag(0);//添加默认未删除0
		agentDemand.setCreateBy(getUserId());
		agentDemand.setUpdateBy(getUserId());
		agentDemandService.save(agentDemand);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("agent:demand:update")
	public R update(@RequestBody AgentDemandEntity agentDemand){
	    agentDemand.setUpdateBy(getUserId());
		agentDemandService.update(agentDemand);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("agent:demand:delete")
	public R delete(@RequestBody Long id){
		agentDemandService.updateDel(id,getUserId());
		
		return R.ok();
	}
	
}
