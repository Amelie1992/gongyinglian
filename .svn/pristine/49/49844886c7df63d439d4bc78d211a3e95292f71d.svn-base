package com.wzlue.chain.agreement.service.impl;

import com.wzlue.chain.agreement.dao.AgreeMentGlDao;
import com.wzlue.chain.agreement.entity.AgreeMentGlEntity;
import com.wzlue.chain.agreement.service.AgreeMentGlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service("agreeMentGlService")
public class AgreeMentGlServiceImpl implements AgreeMentGlService {
	@Autowired
	private AgreeMentGlDao agreeMentGlDao;
	
	@Override
	public AgreeMentGlEntity queryObject(Integer xieyiglId){
		return agreeMentGlDao.queryObject(xieyiglId);
	}
	
	@Override
	public List<AgreeMentGlEntity> queryList(Map<String, Object> map){
		return agreeMentGlDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return agreeMentGlDao.queryTotal(map);
	}
	
	@Override
	public void save(AgreeMentGlEntity agreeMentGl){
		agreeMentGlDao.save(agreeMentGl);
	}
	
	@Override
	public void update(AgreeMentGlEntity agreeMentGl){
		agreeMentGlDao.update(agreeMentGl);
	}
	
	@Override
	public void delete(Integer xieyiglId){
		agreeMentGlDao.delete(xieyiglId);
	}
	
	@Override
	public void deleteBatch(Integer[] xieyiglIds){
		agreeMentGlDao.deleteBatch(xieyiglIds);
	}
	
}
