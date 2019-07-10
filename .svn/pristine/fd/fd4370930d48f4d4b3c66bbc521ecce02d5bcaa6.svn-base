package com.wzlue.chain.sys.service;

import com.wzlue.chain.sys.entity.SysPushMessageEntity;

import java.util.List;
import java.util.Map;

/**
 * 推送消息
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-02 09:24:54
 */
public interface SysPushMessageService {
	
	SysPushMessageEntity queryObject(Long id);
	
	List<SysPushMessageEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(SysPushMessageEntity sysPushMessage);
	
	void update(SysPushMessageEntity sysPushMessage);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);

    SysPushMessageEntity queryPushMsg();

}
