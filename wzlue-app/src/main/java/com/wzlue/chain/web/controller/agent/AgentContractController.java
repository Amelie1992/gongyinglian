
package com.wzlue.chain.web.controller.agent;

import com.wzlue.chain.agent.entity.AgentContractEntity;
import com.wzlue.chain.agent.service.AgentContractService;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
import com.wzlue.chain.web.controller.sys.AbstractController;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;
import java.util.Map;


/**
 * 代理(订单)合同信息表
 * 
 * @author 
 * @email 
 * @date 2018-09-17 11:24:02
 */
@Api("代理(订单)合同")
@RestController
@RequestMapping("/agent/contract")
public class AgentContractController extends AbstractController{
	@Autowired
	private AgentContractService agentContractService;
	
	/**
	 * 列表
	 */
	@GetMapping("/list")
	@ApiOperation("订单合同列表")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
	})
	public R list(@ApiIgnore @RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
		query.put("userId",getUserId());
		List<AgentContractEntity> agentContractList = agentContractService.pageList(query);
		int total = agentContractService.pageCount(query);
		
		return R.page(agentContractList,total);
	}
	
	
	/**
	 * 信息
	 */
	@GetMapping("/info/{id}")
	@ApiOperation("获取订单合同信息")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = false, dataType = "string")
	})
	//@RequiresPermissions("agent:contract:info")
	public R info(@PathVariable("id") Long id){
		AgentContractEntity agentContract = agentContractService.queryInfo(id);
		
		return R.ok().put("agentContract", agentContract);
	}
	
	/**
	 * 保存
	 */
	@PostMapping("/save")
	@ApiOperation("保存订单合同信息")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = false, dataType = "string")
	})
	//@RequiresPermissions("agent:contract:save")
	public R save(@RequestBody AgentContractEntity agentContract){
		agentContract.setCreateBy(getUserId());
		agentContract.setUpdateBy(getUserId());
		agentContractService.save(agentContract);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@PostMapping("/update")
	@ApiOperation("修改订单合同信息")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = false, dataType = "string")
	})
	//@RequiresPermissions("agent:contract:update")
	public R update(@RequestBody AgentContractEntity agentContract){
		agentContract.setUpdateBy(getUserId());
		agentContractService.update(agentContract);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@PostMapping("/delete")
	@ApiOperation("删除订单合同信息")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = false, dataType = "string")
	})
	//@RequiresPermissions("agent:contract:delete")
	public R delete(@RequestBody Long[] ids){
		agentContractService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
