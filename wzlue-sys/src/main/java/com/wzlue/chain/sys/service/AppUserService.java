package com.wzlue.chain.sys.service;



import com.wzlue.chain.sys.entity.AppUserEntity;

import java.util.List;
import java.util.Map;

/**
 * 用户
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2017-03-23 15:22:06
 */
public interface AppUserService {

	AppUserEntity queryObject(Long userId);
	
	List<AppUserEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(String mobile, String password);
	
	void update(AppUserEntity user);
	
	void delete(Long userId);
	
	void deleteBatch(Long[] userIds);

	AppUserEntity queryByMobile(String mobile);

	/**
	 * 用户登录
	 * @param mobile    手机号
	 * @param password  密码
	 * @return          返回用户ID
	 */
	long login(String mobile, String password);
}
