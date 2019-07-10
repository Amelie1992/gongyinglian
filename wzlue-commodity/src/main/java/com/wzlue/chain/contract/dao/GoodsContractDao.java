package com.wzlue.chain.contract.dao;

import com.wzlue.chain.common.base.BaseDao;
import com.wzlue.chain.contract.entity.GoodsContractEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * 货物合同
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-28 13:28:06
 */
@Mapper
public interface GoodsContractDao extends BaseDao<GoodsContractEntity> {

    void deleteByOrderId(String orderId);

    List<GoodsContractEntity> queryListById(Map<String, Object> map);

    int queryTotalById(Map<String, Object> map);

    GoodsContractEntity queryObjectByOrder(Map<String, Object> params);

    List<GoodsContractEntity> queryByContractNumber(String contractNumber);

    void setExpireDateByOrderId(Long orderId);
}
