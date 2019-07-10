package com.wzlue.chain.offer.service.impl;

import com.wzlue.chain.offer.dao.GoodsCompanyDetailsDao;
import com.wzlue.chain.offer.entity.GoodsCompanyDetailsEntity;
import com.wzlue.chain.offer.service.GoodsCompanyDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service("goodsCompanyDetailsService")
public class GoodsCompanyDetailsServiceImpl implements GoodsCompanyDetailsService {
	@Autowired
	private GoodsCompanyDetailsDao goodsCompanyDetailsDao;
	
	@Override
	public GoodsCompanyDetailsEntity queryObject(Long id){
		return goodsCompanyDetailsDao.queryObject(id);
	}
	
	@Override
	public List<GoodsCompanyDetailsEntity> queryList(Map<String, Object> map){
		return goodsCompanyDetailsDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return goodsCompanyDetailsDao.queryTotal(map);
	}
	
	@Override
	public void save(GoodsCompanyDetailsEntity goodsCompanyDetails){
		goodsCompanyDetailsDao.save(goodsCompanyDetails);
	}
	
	@Override
	public void update(GoodsCompanyDetailsEntity goodsCompanyDetails){
		goodsCompanyDetailsDao.update(goodsCompanyDetails);
	}
	
	@Override
	public void delete(Long id){
		goodsCompanyDetailsDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		goodsCompanyDetailsDao.deleteBatch(ids);
	}
	
}
