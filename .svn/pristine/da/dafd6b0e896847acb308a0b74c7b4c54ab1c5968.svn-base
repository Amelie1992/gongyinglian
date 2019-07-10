package com.wzlue.chain.company.service;

import com.wzlue.chain.company.entity.CompanyTypeEntity;

import java.util.List;
import java.util.Map;

/**
 * 公司类型
 * 
 * @author 
 * @email 
 * @date 2018-09-05 11:15:33
 */
public interface CompanyTypeService {
	
	CompanyTypeEntity queryObject(Integer id);
	
	List<CompanyTypeEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(CompanyTypeEntity companyType);
	
	void update(CompanyTypeEntity companyType);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);
	/**
	 * 获取所有 公司类型
	 *
	 * @return
	 */
	List<CompanyTypeEntity> queryCompanyTypeAll();
}
