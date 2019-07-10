package com.wzlue.chain.bill.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.bill.dao.MyAccountDao;
import com.wzlue.chain.bill.entity.MyAccountEntity;
import com.wzlue.chain.bill.service.MyAccountService;



@Service("myAccountService")
public class MyAccountServiceImpl implements MyAccountService {
	@Autowired
	private MyAccountDao myAccountDao;
	
	@Override
	public MyAccountEntity queryObject(Integer id){
		return myAccountDao.queryObject(id);
	}
	
	@Override
	public List<MyAccountEntity> queryList(Map<String, Object> map){
		return myAccountDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return myAccountDao.queryTotal(map);
	}
	
	@Override
	public void save(MyAccountEntity myAccount){
		myAccountDao.save(myAccount);
	}
	
	@Override
	public void update(MyAccountEntity myAccount){
		myAccountDao.update(myAccount);
	}
	
	@Override
	public void delete(Integer id){
		myAccountDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Integer[] ids){
		myAccountDao.deleteBatch(ids);
	}

	@Override
	public MyAccountEntity queryMyAccount(Long id) {
		return myAccountDao.queryMyAccount(id);
	}
}
