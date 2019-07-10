package com.wzlue.chain.sys.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.sys.dao.SysAreasDao;
import com.wzlue.chain.sys.entity.SysAreasEntity;
import com.wzlue.chain.sys.service.SysAreasService;



@Service("sysAreasService")
public class SysAreasServiceImpl implements SysAreasService {
	@Autowired
	private SysAreasDao sysAreasDao;

    @Override
    public List<SysAreasEntity> queryList(String cityid){
        return sysAreasDao.queryList(cityid);
    }

    @Override
    public SysAreasEntity queryBycityId(String areaId) {
        return sysAreasDao.queryBycityId(areaId);
    }
}
