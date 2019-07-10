package com.wzlue.chain.contract.service;


import com.wzlue.chain.contract.entity.GoodsContractEntity;

import java.util.List;
import java.util.Map;

/**
 * 货物合同
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-28 13:28:06
 */
public interface GoodsContractService {
	
	GoodsContractEntity queryObject(Long id);
	
	List<GoodsContractEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(GoodsContractEntity goodsContract);
	
	void update(GoodsContractEntity goodsContract);
	
	void delete(Long id);

	void deleteByOrderId(String orderId);

	void deleteBatch(Long[] ids);

	void saveAutomaticContract(GoodsContractEntity goodsContract);

    GoodsContractEntity queryObjectByOrder(Map<String, Object> params);

	List<GoodsContractEntity> queryByContractNumber(String contractNumber);
}
