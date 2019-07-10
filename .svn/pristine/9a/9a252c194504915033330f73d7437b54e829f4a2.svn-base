package com.wzlue.chain.promotion.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.promotion.dao.PromotionDao;
import com.wzlue.chain.promotion.entity.PromotionEntity;
import com.wzlue.chain.promotion.service.PromotionService;



@Service("promotionService")
public class PromotionServiceImpl implements PromotionService {
	@Autowired
	private PromotionDao promotionDao;
	
	@Override
	public PromotionEntity queryObject(Integer id){
		return promotionDao.queryObject(id);
	}
	
	@Override
	public List<PromotionEntity> queryList(Map<String, Object> map){
		return promotionDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return promotionDao.queryTotal(map);
	}
	
	@Override
	public void save(PromotionEntity promotion){
		promotionDao.save(promotion);
	}
	
	@Override
	public void update(PromotionEntity promotion){
		promotionDao.update(promotion);
	}
	
	@Override
	public void delete(Integer id){
		promotionDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Integer[] ids){
		promotionDao.deleteBatch(ids);
	}

	@Override
	public void onSale(Map<String, Object> map) {
		promotionDao.updateStatus(map);
	}

	@Override
	public void noSale(Map<String, Object> map) {
		promotionDao.updateStatus(map);
	}

}
