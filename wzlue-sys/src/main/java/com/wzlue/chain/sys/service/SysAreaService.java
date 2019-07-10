package com.wzlue.chain.sys.service;

import com.wzlue.chain.sys.entity.SysAreaEntity;

import java.util.List;
import java.util.Map;

/**
 * 
 * 
 * @author YJ
 * @email sunlightcs@gmail.com
 * @date 2018-06-11 14:13:34
 */
public interface SysAreaService {
	
	SysAreaEntity queryObject(Integer id);
	
	List<SysAreaEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(SysAreaEntity sysArea);
	
	void update(SysAreaEntity sysArea);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);

	List<SysAreaEntity> areaList(Map<String, Object> params);
}
