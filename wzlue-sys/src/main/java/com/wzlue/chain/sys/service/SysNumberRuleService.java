package com.wzlue.chain.sys.service;

import com.wzlue.chain.sys.entity.SysNumberRuleEntity;

import java.util.List;
import java.util.Map;

/**
 * 编码规则
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2018-03-27 09:50:44
 */
public interface SysNumberRuleService {
	
	SysNumberRuleEntity queryObject(Long id);
	
	List<SysNumberRuleEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(SysNumberRuleEntity sysNumberRule);
	
	void update(SysNumberRuleEntity sysNumberRule);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);

	SysNumberRuleEntity queryParams(SysNumberRuleEntity sysNumberRule);

	/**
	 * 根据不同编码规则对象生成编码
	 * @param prefix
	 * @return
	 */
	String getCodeNumberByPrefix(String prefix) ;

	String getCodeNumber(String code);

	/**
	 * 定时任务清空每日的生成编码的后缀为0
	 */
	void updateCodeNumber();
}
