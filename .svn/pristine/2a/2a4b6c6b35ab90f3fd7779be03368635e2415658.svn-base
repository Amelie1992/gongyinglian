package com.wzlue.chain.sys.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.sys.dao.SysPushMessageDao;
import com.wzlue.chain.sys.entity.SysPushMessageEntity;
import com.wzlue.chain.sys.service.SysPushMessageService;



@Service("sysPushMessageService")
public class SysPushMessageServiceImpl implements SysPushMessageService {
	@Autowired
	private SysPushMessageDao sysPushMessageDao;
	
	@Override
	public SysPushMessageEntity queryObject(Long id){
		return sysPushMessageDao.queryObject(id);
	}
	
	@Override
	public List<SysPushMessageEntity> queryList(Map<String, Object> map){
		return sysPushMessageDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return sysPushMessageDao.queryTotal(map);
	}
	
	@Override
	public void save(SysPushMessageEntity sysPushMessage){
		sysPushMessageDao.save(sysPushMessage);
	}
	
	@Override
	public void update(SysPushMessageEntity sysPushMessage){
		sysPushMessageDao.update(sysPushMessage);
	}
	
	@Override
	public void delete(Long id){
		sysPushMessageDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		sysPushMessageDao.deleteBatch(ids);
	}

    @Override
    public SysPushMessageEntity queryPushMsg() {
        return sysPushMessageDao.queryPushMag();
    }

}
