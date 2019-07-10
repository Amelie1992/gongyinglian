package com.wzlue.chain.pre.dao;

import com.wzlue.chain.order.entity.GoodsOrderEntity;
import com.wzlue.chain.pre.entity.GoodsOrderPreEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;

/**
 * 订单审核明细表
 * 
 * @author 
 * @email 
 * @date 2018-09-20 10:59:57
 */
@Mapper
public interface GoodsOrderPreDao extends BaseDao<GoodsOrderPreEntity> {

    GoodsOrderPreEntity getByOrderId(String orderId);

    void updateStatus(GoodsOrderEntity goodsOrderEntity);
}
