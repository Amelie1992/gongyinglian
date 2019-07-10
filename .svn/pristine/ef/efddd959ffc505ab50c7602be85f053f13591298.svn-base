package com.wzlue.chain.declare.service;

import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.declare.entity.DeclareContractEntity;

import java.util.List;
import java.util.Map;

/**
 * (订单)合同信息表
 * 
 * @author 
 * @email 
 * @date 2018-09-17 10:57:26
 */
public interface DeclareContractService {
	
	DeclareContractEntity queryObject(Long id);
	
	List<DeclareContractEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(DeclareContractEntity declareContract);
	
	void update(DeclareContractEntity declareContract);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);

    DeclareContractEntity queryInfo(Long id);


    List<DeclareContractEntity> pageList(Map<String, Object> map);

    int pageTotal(Map<String, Object> map);

	List<DeclareContractEntity> queryByContractNumber(String contractNumber);

}

