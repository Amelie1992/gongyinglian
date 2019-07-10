package com.wzlue.chain.depot.dao;

import com.wzlue.chain.depot.entity.GoodsOrderDepotEntity;
import com.wzlue.chain.common.base.BaseDao;
import com.wzlue.chain.order.entity.GoodsOrderEntity;
import org.apache.ibatis.annotations.Mapper;

/**
 * 订单仓储信息
 * 
 * @author 
 * @email 
 * @date 2018-09-28 19:12:05
 */
@Mapper
public interface GoodsOrderDepotDao extends BaseDao<GoodsOrderDepotEntity> {

    GoodsOrderDepotEntity getCreateTimeByOrder(GoodsOrderEntity goodsOrder);

}
