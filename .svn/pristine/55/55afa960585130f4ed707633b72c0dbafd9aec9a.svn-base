package com.wzlue.chain.agreement.service.impl;

import com.wzlue.chain.agreement.dao.AgreeMentDao;
import com.wzlue.chain.agreement.entity.AgreeMentEntity;
import com.wzlue.chain.agreement.service.AgreeMentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service("agreeMentService")
public class AgreeMentServiceImpl implements AgreeMentService {
	@Autowired
	private AgreeMentDao agreeMentDao;
	
	@Override
	public AgreeMentEntity queryObject(Integer xieyiId){
		return agreeMentDao.queryObject(xieyiId);
	}
	
	@Override
	public List<AgreeMentEntity> queryList(Map<String, Object> map){
		return agreeMentDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return agreeMentDao.queryTotal(map);
	}
	
	@Override
	public void save(AgreeMentEntity agreeMent){
		agreeMentDao.save(agreeMent);
	}
	
	@Override
	public void update(AgreeMentEntity agreeMent){
		agreeMentDao.update(agreeMent);
	}
	
	@Override
	public void delete(Integer xieyiId){
		agreeMentDao.delete(xieyiId);
	}
	
	@Override
	public void deleteBatch(Integer[] xieyiIds){
		agreeMentDao.deleteBatch(xieyiIds);
	}

    @Override
    public AgreeMentEntity queryObjectByType(String xieyiType) {

		return  agreeMentDao.queryObjectByType(xieyiType);

    }

}
