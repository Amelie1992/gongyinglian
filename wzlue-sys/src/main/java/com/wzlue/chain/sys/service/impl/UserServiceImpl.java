package com.wzlue.chain.sys.service.impl;


import com.wzlue.chain.common.exception.RRException;
import com.wzlue.chain.common.validator.Assert;
import com.wzlue.chain.sys.dao.AppUserDao;
import com.wzlue.chain.sys.entity.AppUserEntity;
import com.wzlue.chain.sys.service.AppUserService;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;


@Service("userService")
public class UserServiceImpl implements AppUserService {
	@Autowired
	private AppUserDao userDao;
	
	@Override
	public AppUserEntity queryObject(Long userId){
		return userDao.queryObject(userId);
	}
	
	@Override
	public List<AppUserEntity> queryList(Map<String, Object> map){
		return userDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return userDao.queryTotal(map);
	}
	
	@Override
	public void save(String mobile, String password){
		AppUserEntity user = new AppUserEntity();
		user.setMobile(mobile);
		user.setUsername(mobile);
		user.setPassword(DigestUtils.sha256Hex(password));
		user.setCreateTime(new Date());
		userDao.save(user);
	}
	
	@Override
	public void update(AppUserEntity user){
		userDao.update(user);
	}
	
	@Override
	public void delete(Long userId){
		userDao.delete(userId);
	}
	
	@Override
	public void deleteBatch(Long[] userIds){
		userDao.deleteBatch(userIds);
	}

	@Override
	public AppUserEntity queryByMobile(String mobile) {
		return userDao.queryByMobile(mobile);
	}

	@Override
	public long login(String mobile, String password) {
		AppUserEntity user = queryByMobile(mobile);
		Assert.isNull(user, "手机号或密码错误");

		//密码错误
		if(!user.getPassword().equals(DigestUtils.sha256Hex(password))){
			throw new RRException("手机号或密码错误");
		}

		return user.getUserId();
	}
}
