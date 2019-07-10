package com.wzlue.chain.storage.dao;

import com.wzlue.chain.storage.entity.OrderCostEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

/**
 * 仓储订单其他费用
 * 
 * @author 
 * @email 
 * @date 2018-08-29 17:48:31
 */
@Mapper
public interface OrderCostDao extends BaseDao<OrderCostEntity> {

    OrderCostEntity queryByOrderId(Long id);

    OrderCostEntity queryObjectByOrderId(Long id);

    OrderCostEntity queryObjectByOutId(Long outId);

    OrderCostEntity queryObjectByOrderNumberAndDate(Map<String,Object> map);
}
