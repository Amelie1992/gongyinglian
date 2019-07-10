package com.wzlue.chain.sys.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.sys.dao.SysNoticePositionDao;
import com.wzlue.chain.sys.entity.SysNoticePositionEntity;
import com.wzlue.chain.sys.service.SysNoticePositionService;



@Service("sysNoticePositionService")
public class SysNoticePositionServiceImpl implements SysNoticePositionService {
	@Autowired
	private SysNoticePositionDao sysNoticePositionDao;
	
	@Override
	public SysNoticePositionEntity queryObject(Long id){
		return sysNoticePositionDao.queryObject(id);
	}
	
	@Override
	public List<SysNoticePositionEntity> queryList(Map<String, Object> map){
		return sysNoticePositionDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return sysNoticePositionDao.queryTotal(map);
	}
	
	@Override
	public void save(SysNoticePositionEntity sysNoticePosition){
		sysNoticePositionDao.save(sysNoticePosition);
	}
	
	@Override
	public void update(SysNoticePositionEntity sysNoticePosition){
		sysNoticePositionDao.update(sysNoticePosition);
	}
	
	@Override
	public void delete(Long id){
		sysNoticePositionDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		sysNoticePositionDao.deleteBatch(ids);
	}
	
}
