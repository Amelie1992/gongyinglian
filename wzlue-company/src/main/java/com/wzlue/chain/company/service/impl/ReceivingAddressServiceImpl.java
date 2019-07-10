package com.wzlue.chain.company.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.company.dao.ReceivingAddressDao;
import com.wzlue.chain.company.entity.ReceivingAddressEntity;
import com.wzlue.chain.company.service.ReceivingAddressService;



@Service("receivingaddressService")
public class ReceivingAddressServiceImpl implements ReceivingAddressService {
	@Autowired
	private ReceivingAddressDao receivingaddressDao;
	
	@Override
	public ReceivingAddressEntity queryObject(Integer id){
		return receivingaddressDao.queryObject(id);
	}
	
	@Override
	public List<ReceivingAddressEntity> queryList(Map<String, Object> map){
		return receivingaddressDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return receivingaddressDao.queryTotal(map);
	}
	
	@Override
	public void save(ReceivingAddressEntity receivingaddress){
		receivingaddressDao.save(receivingaddress);
	}
	
	@Override
	public void update(ReceivingAddressEntity receivingaddress){
		receivingaddressDao.update(receivingaddress);
		if("2".equals(receivingaddress.getDefaultaddress())) // 如果默认地址为2 取消所有默认地址
			receivingaddressDao.cancelDetailAddress(receivingaddress.getId());
	}
	
	@Override
	public void delete(Integer id){
		receivingaddressDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Integer[] ids){
		receivingaddressDao.deleteBatch(ids);
	}

	@Override
	public boolean setDefatultAddress(Long userId, Long id) {
		return receivingaddressDao.setDefatultAddress(userId,id);
	}
}
