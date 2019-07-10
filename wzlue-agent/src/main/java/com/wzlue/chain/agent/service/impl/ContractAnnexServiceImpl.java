package com.wzlue.chain.agent.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.agent.dao.ContractAnnexDao;
import com.wzlue.chain.agent.entity.ContractAnnexEntity;
import com.wzlue.chain.agent.service.ContractAnnexService;



@Service("contractAnnexService")
public class ContractAnnexServiceImpl implements ContractAnnexService {
	@Autowired
	private ContractAnnexDao contractAnnexDao;
	
	@Override
	public ContractAnnexEntity queryObject(Long id){
		return contractAnnexDao.queryObject(id);
	}
	
	@Override
	public List<ContractAnnexEntity> queryList(Map<String, Object> map){
		return contractAnnexDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return contractAnnexDao.queryTotal(map);
	}
	
	@Override
	public void save(ContractAnnexEntity contractAnnex){
		contractAnnexDao.save(contractAnnex);
	}
	
	@Override
	public void update(ContractAnnexEntity contractAnnex){
		contractAnnexDao.update(contractAnnex);
	}
	
	@Override
	public void delete(Long id){
		contractAnnexDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		contractAnnexDao.deleteBatch(ids);
	}
	
}
