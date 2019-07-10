package com.wzlue.chain.company.service;

import com.wzlue.chain.company.entity.EmployeeEntity;
import com.wzlue.chain.sys.entity.SysUserEntity;

import java.util.List;
import java.util.Map;

/**
 * 员工
 * 
 * @author 
 * @email 
 * @date 2018-08-22 14:37:00
 */
public interface EmployeeService {
	
	EmployeeEntity queryObject(Integer id);
	
	List<EmployeeEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(EmployeeEntity employee, SysUserEntity user);
	
	void update(EmployeeEntity employee);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);

    Integer getGH();

    String[] queryUserNamesByIds(Integer[] ids);
}
