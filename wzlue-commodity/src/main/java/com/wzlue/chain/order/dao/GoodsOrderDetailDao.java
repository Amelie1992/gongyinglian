package com.wzlue.chain.order.dao;

import com.wzlue.chain.order.entity.GoodsOrderDetailEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 订单商品列表
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-15 19:47:29
 */
@Mapper
public interface GoodsOrderDetailDao extends BaseDao<GoodsOrderDetailEntity> {

    void deleteByOrderId(String orderId);

    List listByOrderNumber(@Param("orderNumber") String orderNumber);
}
