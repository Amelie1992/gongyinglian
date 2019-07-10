package com.wzlue.chain.company.service;

import com.wzlue.chain.company.entity.EmployeeAdditionalEntity;

import java.util.List;
import java.util.Map;

/**
 * 员工选填信息
 * 
 * @author 
 * @email 
 * @date 2018-08-22 15:50:08
 */
public interface EmployeeAdditionalService {
	
	EmployeeAdditionalEntity queryObject(Integer id);
	
	List<EmployeeAdditionalEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(EmployeeAdditionalEntity employeeAdditional);
	
	void update(EmployeeAdditionalEntity employeeAdditional);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);
}
