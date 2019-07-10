package com.wzlue.chain.company.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.company.dao.ServiceTypeDao;
import com.wzlue.chain.company.entity.ServiceTypeEntity;
import com.wzlue.chain.company.service.ServiceTypeService;



@Service("serviceTypeService")
public class ServiceTypeServiceImpl implements ServiceTypeService {
	@Autowired
	private ServiceTypeDao serviceTypeDao;
	
	@Override
	public ServiceTypeEntity queryObject(Integer id){
		return serviceTypeDao.queryObject(id);
	}
	
	@Override
	public List<ServiceTypeEntity> queryList(Map<String, Object> map){
		return serviceTypeDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return serviceTypeDao.queryTotal(map);
	}
	
	@Override
	public void save(ServiceTypeEntity serviceType){
		serviceTypeDao.save(serviceType);
	}
	
	@Override
	public void update(ServiceTypeEntity serviceType){
		serviceTypeDao.update(serviceType);
	}
	
	@Override
	public void delete(Integer id){
		serviceTypeDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Integer[] ids){
		serviceTypeDao.deleteBatch(ids);
	}

	@Override
	public List<ServiceTypeEntity> getSltList() {
		return serviceTypeDao.getSltList();
	}
	@Override
	public List<ServiceTypeEntity> getById(List<Long> rolesId) {
		return  serviceTypeDao.getById(rolesId);
	}
}
