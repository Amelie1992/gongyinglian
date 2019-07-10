
package com.wzlue.chain.web.controller.agent;

import java.util.List;
import java.util.Map;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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
@Api("代理报盘业务")
@RestController
@RequestMapping("/agent/business")
public class AgentOfferBusinessController extends AbstractController{
	@Autowired
	private AgentOfferBusinessService agentOfferBusinessService;

	/**
	 * 列表
	 */
	@GetMapping("/list")
	@ApiOperation("代理报盘业务列表")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = false, dataType = "string")
	})
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
	@GetMapping("/info/{id}")
	@ApiOperation("获取代理报盘业务")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = false, dataType = "string")
	})
	@RequiresPermissions("agent:offerbusiness:info")
	public R info(@PathVariable("id") Integer id){
		AgentOfferBusinessEntity agentOfferBusiness = agentOfferBusinessService.queryObject(id);

		return R.ok().put("agentOfferBusiness", agentOfferBusiness);
	}

	/**
	 * 保存
	 */
	@PostMapping("/save")
	@ApiOperation("保存代理报盘业务")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = false, dataType = "string")
	})
	@RequiresPermissions("agent:offerbusiness:save")
	public R save(@RequestBody AgentOfferBusinessEntity agentOfferBusiness){
		agentOfferBusinessService.save(agentOfferBusiness);

		return R.ok();
	}

	/**
	 * 修改
	 */
	@PostMapping("/update")
	@ApiOperation("修改代理报盘业务")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = false, dataType = "string")
	})
	@RequiresPermissions("agent:offerbusiness:update")
	public R update(@RequestBody AgentOfferBusinessEntity agentOfferBusiness){
		agentOfferBusinessService.update(agentOfferBusiness);

		return R.ok();
	}

	/**
	 * 删除
	 */
	@PostMapping("/delete")
	@ApiOperation("删除代理报盘业务")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = false, dataType = "string")
	})
	@RequiresPermissions("agent:offerbusiness:delete")
	public R delete(@RequestBody Integer[] ids){
		agentOfferBusinessService.deleteBatch(ids);

		return R.ok();
	}

}
