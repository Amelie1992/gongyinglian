package com.wzlue.chain.company.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.company.dao.CompanyTypeDao;
import com.wzlue.chain.company.entity.CompanyTypeEntity;
import com.wzlue.chain.company.service.CompanyTypeService;



@Service("companyTypeService")
public class CompanyTypeServiceImpl implements CompanyTypeService {
	@Autowired
	private CompanyTypeDao companyTypeDao;
	
	@Override
	public CompanyTypeEntity queryObject(Integer id){
		return companyTypeDao.queryObject(id);
	}
	
	@Override
	public List<CompanyTypeEntity> queryList(Map<String, Object> map){
		return companyTypeDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return companyTypeDao.queryTotal(map);
	}
	
	@Override
	public void save(CompanyTypeEntity companyType){
		companyTypeDao.save(companyType);
	}
	
	@Override
	public void update(CompanyTypeEntity companyType){
		companyTypeDao.update(companyType);
	}
	
	@Override
	public void delete(Integer id){
		companyTypeDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Integer[] ids){
		companyTypeDao.deleteBatch(ids);
	}

	@Override
	public List<CompanyTypeEntity> queryCompanyTypeAll() {
		return companyTypeDao.queryCompanyTypeAll();
	}
}
