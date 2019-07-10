package com.wzlue.chain.marketing.dao;

import com.wzlue.chain.marketing.entity.MarketAuctionCommodityEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 拍卖商品表
 * 
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-09-26 14:05:34
 */
@Mapper
public interface MarketAuctionCommodityDao extends BaseDao<MarketAuctionCommodityEntity> {

    //传入多个商品
    void saveList(List<MarketAuctionCommodityEntity> marketAuctionCommodityEntityList);

    void deleteByAuctionId(Long auctionId);
}
