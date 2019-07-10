package com.wzlue.chain.logistics.service.impl;

import com.wzlue.chain.agent.dao.ContractAnnexDao;
import com.wzlue.chain.agent.entity.ContractAnnexEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.wzlue.chain.logistics.dao.LogisticsContractDao;
import com.wzlue.chain.logistics.entity.LogisticsContractEntity;
import com.wzlue.chain.logistics.service.LogisticsContractService;



@Service("logisticsContractService")
public class LogisticsContractServiceImpl implements LogisticsContractService {
	@Autowired
	private LogisticsContractDao logisticsContractDao;
	@Autowired
	private ContractAnnexDao contractAnnexDao;
	
	@Override
	public LogisticsContractEntity queryObject(Long id){
		return logisticsContractDao.queryObject(id);
	}
	
	@Override
	public List<LogisticsContractEntity> queryList(Map<String, Object> map){
		return logisticsContractDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return logisticsContractDao.queryTotal(map);
	}
	
	@Override
	public void save(LogisticsContractEntity logisticsContract){
		logisticsContract.setCreatedTime(new Date());
		logisticsContract.setModityTime(new Date());
		logisticsContract.setDataSource(2);
		logisticsContractDao.save(logisticsContract);
		//插入合同附件信息
		if (logisticsContract.getFile()!=null && logisticsContract.getFile().get(0)!=null){
			for (ContractAnnexEntity annexEntity : logisticsContract.getFile()){
				annexEntity.setContractId(logisticsContract.getId());
				annexEntity.setContractType((long) 4);
				annexEntity.setCreateBy(logisticsContract.getCreatedBy().toString());
				annexEntity.setCreateTime(new Date());
				contractAnnexDao.save(annexEntity);
			}
		}
	}
	
	@Override
	public void update(LogisticsContractEntity logisticsContract){
		logisticsContract.setModityTime(new Date());
		logisticsContractDao.update(logisticsContract);

		//插入合同附件信息
		if (logisticsContract.getFile()!=null && logisticsContract.getFile().get(0)!=null){
			contractAnnexDao.deleteByContractId(logisticsContract.getId(),4);
			for (ContractAnnexEntity annexEntity : logisticsContract.getFile()){
				annexEntity.setContractId(logisticsContract.getId());
				annexEntity.setCreateBy(logisticsContract.getCreatedBy().toString());
				annexEntity.setCreateTime(new Date());
				annexEntity.setContractType((long) 4);
				contractAnnexDao.save(annexEntity);
			}
		}
	}
	
	@Override
	public void delete(Long id){
		logisticsContractDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		logisticsContractDao.deleteBatch(ids);
	}

	@Override
	public int checkName(String contractNumber) {
		return logisticsContractDao.checkName(contractNumber);
	}

	@Override
	public LogisticsContractEntity checkCode(LogisticsContractEntity logisticsContract) {
		return logisticsContractDao.checkCode(logisticsContract);
	}

	@Override
	public void setExpireDateByOrderId(Long id) {
		logisticsContractDao.setExpireDateByOrderId(id);
	}

}
