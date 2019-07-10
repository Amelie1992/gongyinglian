package com.wzlue.chain.agent.service;

import com.wzlue.chain.agent.entity.ContractAnnexEntity;

import java.util.List;
import java.util.Map;

/**
 * 合同附件信息表
 * 
 * @author 
 * @email 
 * @date 2018-09-17 10:16:20
 */
public interface ContractAnnexService {
	
	ContractAnnexEntity queryObject(Long id);
	
	List<ContractAnnexEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(ContractAnnexEntity contractAnnex);
	
	void update(ContractAnnexEntity contractAnnex);
	
	void delete(Long id);

	void deleteBatch(Long[] ids);
}
