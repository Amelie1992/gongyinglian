
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

import com.wzlue.chain.agent.entity.AgentDemandEntity;
import com.wzlue.chain.agent.service.AgentDemandService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
import springfox.documentation.annotations.ApiIgnore;


/**
 * 代理(求购)信息表
 * 业务控制层
 * @author
 * @email
 * @date 2018-09-10 17:54:11
 */
@Api("代理求购")
@RestController
@RequestMapping("/agent/demand")
public class AgentDemandController extends AbstractController{
	@Autowired
	private AgentDemandService agentDemandService;

	/**
	 * 列表
	 */
	@GetMapping("/list")
    @ApiOperation("代理求购列表")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
	})
	public R list(@ApiIgnore @RequestParam Map<String, Object> params){
		//查询列表数据
        if (null != params.get("business") && !"".equals(params.get("business").toString())) {
            params.put("business", params.get("business").toString().split(","));
        }

        Query query = new Query(params);
		if (getUser().getCompanyId()!=null){
			query.put("companyId",getUser().getCompanyId());
		}

		List<AgentDemandEntity> agentDemandList = agentDemandService.pageList(query);
		int total = agentDemandService.pageCount(query);

		return R.page(agentDemandList,total);
	}


	/**
	 * 信息
	 */
	@GetMapping("/info/{id}")
	@ApiOperation("获取求购订单")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = false, dataType = "string")
	})
	//@RequiresPermissions("agent:demand:info")
	public R info(@PathVariable("id") Long id){
		AgentDemandEntity agentDemand = agentDemandService.queryDetail(id);

		return R.ok().put("agentDemand", agentDemand);
	}

	/**
	 * 保存
	 */
	@PostMapping("/save")
	@ApiOperation("保存求购订单")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = false, dataType = "string")
	})
	//@RequiresPermissions("agent:demand:save")
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
	@PostMapping("/update")
	@ApiOperation("修改求购订单")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = false, dataType = "string")
	})
	//@RequiresPermissions("agent:demand:update")
	public R update(@RequestBody AgentDemandEntity agentDemand){
		agentDemand.setUpdateBy(getUserId());
		agentDemandService.update(agentDemand);

		return R.ok();
	}

	/**
	 * 删除
	 */
	@PostMapping("/delete")
	@ApiOperation("删除求购订单")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = false, dataType = "string")
	})
	//@RequiresPermissions("agent:demand:delete")
	public R delete(@RequestBody Long id){
		agentDemandService.updateDel(id,getUserId());

		return R.ok();
	}

}
