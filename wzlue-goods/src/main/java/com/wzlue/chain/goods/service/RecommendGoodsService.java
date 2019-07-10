package com.wzlue.chain.goods.service;

import com.wzlue.chain.goods.entity.RecommendGoodsEntity;

import java.util.List;
import java.util.Map;

/**
 * 推荐商品表
 * 
 * @author 
 * @email 
 * @date 2018-11-19 19:05:20
 */
public interface RecommendGoodsService {
	
	RecommendGoodsEntity queryObject(Integer id);
	
	List<RecommendGoodsEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(RecommendGoodsEntity recommendGoods);
	
	void update(RecommendGoodsEntity recommendGoods);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);

	void updateStatus(RecommendGoodsEntity recommendGoods);

	int getCount(Map<String, Object> map);

    void upper(Integer[] ids);

	void lower(Integer[] ids);
}
