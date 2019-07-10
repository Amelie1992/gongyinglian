package com.wzlue.chain.company.service;

import com.wzlue.chain.company.entity.ServiceTypeEntity;

import java.util.List;
import java.util.Map;

/**
 * 服务类型
 * 
 * @author 
 * @email 
 * @date 2018-08-16 16:47:00
 */
public interface ServiceTypeService {
	
	ServiceTypeEntity queryObject(Integer id);
	
	List<ServiceTypeEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(ServiceTypeEntity serviceType);
	
	void update(ServiceTypeEntity serviceType);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);

	List<ServiceTypeEntity> getSltList();

	List<ServiceTypeEntity> getById(List<Long> rolesId);
}
