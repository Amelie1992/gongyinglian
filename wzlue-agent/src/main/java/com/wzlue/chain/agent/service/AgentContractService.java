package com.wzlue.chain.agent.service;


import com.wzlue.chain.agent.entity.AgentContractEntity;
import com.wzlue.chain.sys.entity.SysUserEntity;

import java.util.List;
import java.util.Map;

/**
 * 代理(订单)合同信息表
 * 
 * @author 
 * @email 
 * @date 2018-09-05 14:48:43
 */
public interface AgentContractService {
	
	AgentContractEntity queryObject(Long id);

	AgentContractEntity queryInfo(Long id);

	List<AgentContractEntity> queryList(Map<String, Object> map);

	List<AgentContractEntity> pageList(Map<String, Object> map);

	int queryTotal(Map<String, Object> map);

	int pageCount(Map<String, Object> map);

	void save(AgentContractEntity agentContract);
	
	void update(AgentContractEntity agentContract);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);

    List<AgentContractEntity> queryByContractNumber(String contractNumber);

}
