package com.wzlue.chain.logistics.dao;

import com.wzlue.chain.common.base.BaseDao;
import com.wzlue.chain.logistics.entity.LogisticsOrderShipEntity;
import org.apache.ibatis.annotations.Mapper;

/**
 * 物流订单发货表
 * 
 * @author 
 * @email 
 * @date 2018-11-27 10:20:15
 */
@Mapper
public interface LogisticsOrderShipDao extends BaseDao<LogisticsOrderShipEntity> {

    LogisticsOrderShipEntity queryByOrderId(String orderId);
	
}
