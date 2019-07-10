package com.wzlue.chain.bill.service;

import com.wzlue.chain.bill.entity.BankCardEntity;

import java.util.List;
import java.util.Map;

/**
 * 绑定银行卡
 * 
 * @author 
 * @email 
 * @date 2018-09-14 17:46:21
 */
public interface BankCardService {
	
	BankCardEntity queryObject(Integer id);
	
	List<BankCardEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(BankCardEntity bankCard);
	
	void update(BankCardEntity bankCard);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);
}
