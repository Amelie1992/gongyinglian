package com.wzlue.chain.sys.service;


import com.wzlue.chain.sys.entity.SysDictEntity;

import java.util.List;
import java.util.Map;

/**
 * 数据字典表
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2018-03-15 16:08:30
 */
public interface SysDictService {
	
	SysDictEntity queryObject(Long id);

	/**
	 * 根据字典名称获取结果集
	 * @param name
	 * @return
	 */
	List<SysDictEntity> queryListNotPage(String name);

	List<SysDictEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(SysDictEntity sysDict);
	
	void update(SysDictEntity sysDict);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);

	/**
	 * 字典通过类型获取结果集
	 * @param type
	 * @return
	 */
	List<SysDictEntity> queryByType(String type);

	SysDictEntity query(SysDictEntity sysDictEntity);

	SysDictEntity queryObjectByPar(SysDictEntity sysDictEntity);

    SysDictEntity queryByCountryName(String code);
}
