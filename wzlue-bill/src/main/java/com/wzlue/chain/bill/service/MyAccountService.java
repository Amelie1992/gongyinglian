package com.wzlue.chain.bill.service;

import com.wzlue.chain.bill.entity.MyAccountEntity;

import java.util.List;
import java.util.Map;

/**
 * 我的账户
 * 
 * @author 
 * @email 
 * @date 2018-09-20 10:55:05
 */
public interface MyAccountService {
	
	MyAccountEntity queryObject(Integer id);
	
	List<MyAccountEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(MyAccountEntity myAccount);
	
	void update(MyAccountEntity myAccount);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);

	MyAccountEntity queryMyAccount(Long id);
}
