package com.wzlue.chain.sys.service.impl;

import com.wzlue.chain.sys.entity.StorageWarningEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.sys.dao.SysNoticeDao;
import com.wzlue.chain.sys.entity.SysNoticeEntity;
import com.wzlue.chain.sys.service.SysNoticeService;



@Service("sysNoticeService")
public class SysNoticeServiceImpl implements SysNoticeService {
	@Autowired
	private SysNoticeDao sysNoticeDao;
	
	@Override
	public SysNoticeEntity queryObject(Long id){
		return sysNoticeDao.queryObject(id);
	}
	
	@Override
	public List<SysNoticeEntity> queryList(Map<String, Object> map){
		return sysNoticeDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return sysNoticeDao.queryTotal(map);
	}
	
	@Override
	public void save(SysNoticeEntity sysNotice){
		sysNoticeDao.save(sysNotice);
	}
	
	@Override
	public void update(SysNoticeEntity sysNotice){
		sysNoticeDao.update(sysNotice);
	}
	
	@Override
	public void delete(Long id){
		sysNoticeDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		sysNoticeDao.deleteBatch(ids);
	}

    @Override
    public List<SysNoticeEntity> queryNow(Map<String, Object> params) {
        return sysNoticeDao.queryNow(params);
    }

	@Override
	public List<StorageWarningEntity> queryStorageInfo() {
		return sysNoticeDao.queryStorageInfo();
	}

	@Override
	public List<StorageWarningEntity> queryStorageInfo2() { return sysNoticeDao.queryStorageInfo2();
	}

	@Override
	public SysNoticeEntity queryNewObject(SysNoticeEntity sysNoticeEntity) {
		return sysNoticeDao.queryNewObject(sysNoticeEntity);
	}
}
