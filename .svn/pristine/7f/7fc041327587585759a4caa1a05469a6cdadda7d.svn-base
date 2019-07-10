package com.wzlue.chain.sys.service;

import com.wzlue.chain.sys.entity.StorageWarningEntity;
import com.wzlue.chain.sys.entity.SysNoticeEntity;

import java.util.List;
import java.util.Map;

/**
 * 新闻资讯
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-27 19:37:10
 */
public interface SysNoticeService {
	
	SysNoticeEntity queryObject(Long id);
	
	List<SysNoticeEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(SysNoticeEntity sysNotice);
	
	void update(SysNoticeEntity sysNotice);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);

    List<SysNoticeEntity> queryNow(Map<String, Object> params);

    List<StorageWarningEntity> queryStorageInfo();

	List<StorageWarningEntity> queryStorageInfo2();
	
	//查询最新一条通知
	SysNoticeEntity queryNewObject(SysNoticeEntity sysNoticeEntity);
}
