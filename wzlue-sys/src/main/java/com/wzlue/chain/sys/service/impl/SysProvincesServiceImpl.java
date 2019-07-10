package com.wzlue.chain.sys.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.sys.dao.SysProvincesDao;
import com.wzlue.chain.sys.entity.SysProvincesEntity;
import com.wzlue.chain.sys.service.SysProvincesService;



@Service("sysProvincesService")
public class SysProvincesServiceImpl implements SysProvincesService {
	@Autowired
	private SysProvincesDao sysProvincesDao;

	@Override
	public List<SysProvincesEntity> queryList(){
		return sysProvincesDao.queryList();
	}

	@Override
	public SysProvincesEntity queryByprovinceId(String provinceId) {
		return sysProvincesDao.queryByProvinceId(provinceId);
	}

}
