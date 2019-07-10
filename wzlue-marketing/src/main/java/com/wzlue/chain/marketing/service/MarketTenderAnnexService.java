package com.wzlue.chain.marketing.service;

import com.wzlue.chain.marketing.entity.MarketTenderAnnexEntity;

import java.util.List;
import java.util.Map;

/**
 * 竞拍附件信息表
 * 
 * @author 
 * @email 
 * @date 2019-04-15 17:30:28
 */
public interface MarketTenderAnnexService {
	
	MarketTenderAnnexEntity queryObject(Long id);
	
	List<MarketTenderAnnexEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(MarketTenderAnnexEntity marketTenderAnnex);
	
	void update(MarketTenderAnnexEntity marketTenderAnnex);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);
}
