package com.wzlue.chain.order.dao;

import com.wzlue.chain.order.entity.GoodsOrderCinfoEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;

/**
 * 收货人信息
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-15 19:47:29
 */
@Mapper
public interface GoodsOrderCinfoDao extends BaseDao<GoodsOrderCinfoEntity> {

    void deleteByOrderId(String orderId);
}
