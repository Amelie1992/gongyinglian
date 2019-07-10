package com.wzlue.chain.offer.dao;

import com.wzlue.chain.common.base.BaseDao;
import com.wzlue.chain.offer.entity.GoodsOfferEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * 货物报盘
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-15 14:30:02
 */
@Mapper
public interface GoodsOfferDao extends BaseDao<GoodsOfferEntity> {

    void updateStatue(Map<String, Object> params);

    List<GoodsOfferEntity> queryListBuy(Map<String, Object> map);

    List<GoodsOfferEntity> queryRecommendList(Map<String, Object> map);

    List<GoodsOfferEntity> getOverallOfferId(String overallSearch);

    GoodsOfferEntity queryOfferByNumber(String number);

    List<Map<String, Object>> getHistoryPriceTrend(Map<String, Object> params);

    List<Map<String, Object>> getMarketIndex(Map<String, Object> params);

    List<String> getOfferId(Map<String, Object> params);

    int queryListBuyTotal(Map<String, Object> map);
}
