package com.wzlue.chain.company.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.company.dao.EmployeeAdditionalDao;
import com.wzlue.chain.company.entity.EmployeeAdditionalEntity;
import com.wzlue.chain.company.service.EmployeeAdditionalService;



@Service("employeeAdditionalService")
public class EmployeeAdditionalServiceImpl implements EmployeeAdditionalService {
	@Autowired
	private EmployeeAdditionalDao employeeAdditionalDao;
	
	@Override
	public EmployeeAdditionalEntity queryObject(Integer id){
		return employeeAdditionalDao.queryObject(id);
	}
	
	@Override
	public List<EmployeeAdditionalEntity> queryList(Map<String, Object> map){
		return employeeAdditionalDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return employeeAdditionalDao.queryTotal(map);
	}
	
	@Override
	public void save(EmployeeAdditionalEntity employeeAdditional){
		employeeAdditionalDao.save(employeeAdditional);
	}
	
	@Override
	public void update(EmployeeAdditionalEntity employeeAdditional){
		employeeAdditionalDao.update(employeeAdditional);
	}
	
	@Override
	public void delete(Integer id){
		employeeAdditionalDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Integer[] ids){
		employeeAdditionalDao.deleteBatch(ids);
	}
	
}
