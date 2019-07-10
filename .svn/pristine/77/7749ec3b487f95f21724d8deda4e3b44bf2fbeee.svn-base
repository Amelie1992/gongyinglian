package com.wzlue.chain.marketing.dao;

import com.wzlue.chain.marketing.entity.MarketBidRecordEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * 拍卖出价记录表
 * 
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-09-26 13:48:09
 */
@Mapper
public interface MarketBidRecordDao extends BaseDao<MarketBidRecordEntity> {
	//查询最新一条拍卖数据
	MarketBidRecordEntity queryNewObject(@Param("auctionId")long auctionId);

    int queryTotals(Long auctionId);
}
