package com.wzlue.chain.storage.dao;

import com.wzlue.chain.storage.entity.OrderCommodityEntity;
import com.wzlue.chain.common.base.BaseDao;
import com.wzlue.chain.storage.entity.StorageOutCommodityEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * 订单货物商品表
 * 
 * @author ÎºË¼Æë
 * @email sunlightcs@gmail.com
 * @date 2018-09-05 10:28:36
 */
@Mapper
public interface OrderCommodityDao extends BaseDao<OrderCommodityEntity> {

    void saveList(List<OrderCommodityEntity> commodityEntityList);

    void updateList(List<OrderCommodityEntity> commodityEntityList);

    List<StorageOutCommodityEntity> queryCommoditys(Map<String, Object> map);

    void updateByOutId(Long outId);
}
