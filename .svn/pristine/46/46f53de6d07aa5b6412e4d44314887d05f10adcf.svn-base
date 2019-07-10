
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

import com.wzlue.chain.agent.entity.AgentContractEntity;
import com.wzlue.chain.agent.service.AgentContractService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 代理(订单)合同信息表
 * 
 * @author 
 * @email 
 * @date 2018-09-17 11:24:02
 */
@RestController
@RequestMapping("/agent/contract")
public class AgentContractController extends AbstractController{
	@Autowired
	private AgentContractService agentContractService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
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
	@RequestMapping("/info/{id}")
	@RequiresPermissions("agent:contract:info")
	public R info(@PathVariable("id") Long id){
		AgentContractEntity agentContract = agentContractService.queryInfo(id);
		
		return R.ok().put("agentContract", agentContract);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("agent:contract:save")
	public R save(@RequestBody AgentContractEntity agentContract){
		agentContract.setCreateBy(getUserId());
		agentContract.setUpdateBy(getUserId());
		agentContractService.save(agentContract);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("agent:contract:update")
	public R update(@RequestBody AgentContractEntity agentContract){
		agentContract.setUpdateBy(getUserId());
		agentContractService.update(agentContract);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("agent:contract:delete")
	public R delete(@RequestBody Long[] ids){
		agentContractService.deleteBatch(ids);
		
		return R.ok();
	}

	/**
	 * 校验合同编号是否已经存在
	 */
	@RequestMapping("/check")
	public R check(@RequestParam Map<String, Object> map) {
		String contractNumber = (String) map.get("contractNumber");
		String contractId = (String) map.get("contractId");
		List<AgentContractEntity> contracts = null;
		if (contractId == null) {  //新增合同
			contracts = agentContractService.queryByContractNumber(contractNumber);
		} else {     //修改合同
			AgentContractEntity agentContract = agentContractService.queryObject(Long.valueOf(contractId));
			if (!agentContract.getContractNumber().equals(contractNumber)){
				contracts = agentContractService.queryByContractNumber(contractNumber);
			}
		}
		return R.ok().put("contracts", contracts);
	}
}
