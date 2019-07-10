package com.wzlue.chain.logistics.dao;

import com.wzlue.chain.logistics.entity.LogisticsOfferEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

/**
 * 商品库物流报盘
 * 
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-08-16 10:19:13
 */
@Mapper
public interface LogisticsOfferDao extends BaseDao<LogisticsOfferEntity> {

    void updateStatus(Map<String, Object> ids);
    //验证物流编码是否重复
    LogisticsOfferEntity checkCode(LogisticsOfferEntity logisticsOfferEntity);

    LogisticsOfferEntity queryObject2(Long id);

    //成交数+1
    void addNum(Long orderId);

    //成交数-1
    void updateByOrderId2(Long id);

}
