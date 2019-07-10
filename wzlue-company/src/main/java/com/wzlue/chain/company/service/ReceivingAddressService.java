package com.wzlue.chain.company.service;

import com.wzlue.chain.company.entity.ReceivingAddressEntity;

import java.util.List;
import java.util.Map;

/**
 * 收货地址
 * 
 * @author 
 * @email 
 * @date 2018-08-18 10:55:39
 */
public interface ReceivingAddressService {
	
	ReceivingAddressEntity queryObject(Integer id);
	
	List<ReceivingAddressEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(ReceivingAddressEntity receivingaddress);
	
	void update(ReceivingAddressEntity receivingaddress);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);

    boolean setDefatultAddress(Long userId, Long id);
}
