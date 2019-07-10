package com.wzlue.chain.logistics.dao;

import com.wzlue.chain.logistics.entity.LogisticsOrderCommodityEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * 物流订单商品表
 * 
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-09-06 16:42:34
 */
@Mapper
public interface LogisticsOrderCommodityDao extends BaseDao<LogisticsOrderCommodityEntity> {

    Map<String,Object> getListByOrderNumber(String orderNumber, Long userId);

    //传入多个商品
    void saveList(List<LogisticsOrderCommodityEntity> logisticsOrderCommodityEntityList);
    //根据订单id查询商品信息
    List<LogisticsOrderCommodityEntity> queryByOrderId(Integer orderId);
}
