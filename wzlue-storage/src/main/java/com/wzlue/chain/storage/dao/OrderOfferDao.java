package com.wzlue.chain.storage.dao;

import com.wzlue.chain.storage.entity.OrderOfferEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * 仓储报盘备份
 * 
 * @author 
 * @email 
 * @date 2018-08-29 17:48:31
 */
@Mapper
public interface OrderOfferDao extends BaseDao<OrderOfferEntity> {

    OrderOfferEntity queryByOrderId(Long id);

    List<Map<String,Object>> getStorageList(Map<String, Object> map);
}
