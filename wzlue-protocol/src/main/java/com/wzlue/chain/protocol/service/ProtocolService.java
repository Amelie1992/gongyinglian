package com.wzlue.chain.protocol.service;

import com.wzlue.chain.protocol.entity.ProtocolEntity;

import java.util.List;
import java.util.Map;

/**
 * 协议管理
 * 
 * @author 
 * @email 
 * @date 2018-09-25 18:00:17
 */
public interface ProtocolService {
	
	ProtocolEntity queryObject(Long id);
	
	List<ProtocolEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(ProtocolEntity protocol);
	
	void update(ProtocolEntity protocol);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);

    int queryType(int type);
}
