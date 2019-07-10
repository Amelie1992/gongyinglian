package com.wzlue.chain.storage.service.impl;

import com.wzlue.chain.agent.dao.ContractAnnexDao;
import com.wzlue.chain.agent.entity.ContractAnnexEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.wzlue.chain.storage.dao.StorageContractDao;
import com.wzlue.chain.storage.entity.StorageContractEntity;
import com.wzlue.chain.storage.service.StorageContractService;


@Service("storageContractService")
public class StorageContractServiceImpl implements StorageContractService {
    @Autowired
    private StorageContractDao storageContractDao;
    @Autowired
    private ContractAnnexDao contractAnnexDao;

    @Override
    public StorageContractEntity queryObject(Long id) {
        return storageContractDao.queryObject(id);
    }

    @Override
    public List<StorageContractEntity> queryList(Map<String, Object> map) {
        return storageContractDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return storageContractDao.queryTotal(map);
    }

    @Override
    public void save(StorageContractEntity storageContract) {
        storageContractDao.save(storageContract);
        //插入合同附件
        if (storageContract.getFile() != null && storageContract.getFile().get(0) != null) {
            for (ContractAnnexEntity annexEntity : storageContract.getFile()) {
                annexEntity.setContractId(storageContract.getId());
                annexEntity.setContractType((long) 3);
                annexEntity.setCreateTime(new Date());
                annexEntity.setCreateBy(storageContract.getCreateBy().toString());
                contractAnnexDao.save(annexEntity);
            }
        }
    }

    @Override
    public void update(StorageContractEntity storageContract) {
        storageContractDao.update(storageContract);
        //更改合同附件
        if (storageContract.getFile() != null && storageContract.getFile().get(0) != null) {
//			//先删除之前的附件
            contractAnnexDao.deleteByContractId(storageContract.getId(), 3);
            //再存储最新的附件
            for (ContractAnnexEntity annexEntity : storageContract.getFile()) {
                annexEntity.setContractType((long) 3);
                annexEntity.setContractId(storageContract.getId());
                annexEntity.setCreateBy(storageContract.getCreateBy().toString());
                annexEntity.setCreateTime(new Date());
                contractAnnexDao.save(annexEntity);
            }
        }
    }

    @Override
    public void delete(Long id) {
        storageContractDao.delete(id);
    }

    @Override
    public void deleteBatch(Long[] ids) {
        storageContractDao.deleteBatch(ids);
    }

    @Override
    public StorageContractEntity queryContract(StorageContractEntity storageContract) {
        return storageContractDao.queryContract(storageContract);
    }

    @Override
    public List<StorageContractEntity> queryByContractNumber(String contractNumber) {
        return storageContractDao.check(contractNumber);
    }

    @Override
    public void setExpireDateByOrderNumber(String orderNumber) {
        storageContractDao.setExpireDateByOrderNumber(orderNumber);
    }
}
