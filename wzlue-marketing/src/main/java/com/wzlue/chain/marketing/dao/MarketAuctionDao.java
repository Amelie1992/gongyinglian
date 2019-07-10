package com.wzlue.chain.marketing.dao;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.common.base.Query;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.wzlue.chain.common.base.BaseDao;
import com.wzlue.chain.marketing.entity.MarketAuctionEntity;

/**
 * 营销拍卖表
 * 
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-09-26 13:43:46
 */
@Mapper
public interface MarketAuctionDao extends BaseDao<MarketAuctionEntity> {
	List<MarketAuctionEntity> queryListByStatusAndTime(MarketAuctionEntity marketAuction);
	
	void updateStatusByIds(@Param("status")int status,@Param("id")long id);

    void updateStatus(Map<String, Object> map);

    List<MarketAuctionEntity> queryListHot(Query query);

    void depreciate(long id);

    MarketAuctionEntity getMarketAuctionByid(Long auctionId);
}
