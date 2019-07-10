package com.wzlue.chain.sys.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.sys.dao.SysCitiesDao;
import com.wzlue.chain.sys.entity.SysCitiesEntity;
import com.wzlue.chain.sys.service.SysCitiesService;



@Service("sysCitiesService")
public class SysCitiesServiceImpl implements SysCitiesService {
	@Autowired
	private SysCitiesDao sysCitiesDao;


    @Override
    public List<SysCitiesEntity> queryList(String provinceid){
        return sysCitiesDao.queryList(provinceid);
    }

    @Override
    public String queryCityId(String city) {
        return sysCitiesDao.queryCityId(city);
    }

    @Override
    public SysCitiesEntity queryCity(int id) {
        return sysCitiesDao.queryCity(id);
    }

    @Override
    public SysCitiesEntity queryBycityId(String cityId) {
        return sysCitiesDao.queryBycityId(cityId);
    }
}
