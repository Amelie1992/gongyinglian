package com.wzlue.chain.declare.dao;

import com.wzlue.chain.company.entity.MerchantCompanyEntity;
import com.wzlue.chain.declare.entity.DeclareOrderEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * 报关订单
 * 
 * @author 
 * @email 
 * @date 2018-08-20 17:24:10
 */
@Mapper
public interface DeclareOrderDao extends BaseDao<DeclareOrderEntity> {

    void updateOrderState(Map<String, Object> map);

    List<MerchantCompanyEntity> getCompanys(Long userId);

    DeclareOrderEntity queryByOrderNumber(String orderId);

    void updateByOrderId(Long id);

    List<Map> showList(Map<String, Object> map);

    List<DeclareOrderEntity> queryListByNumberCode(Map<String, Object> map1);

    List<Map<String,Object>> queryListByNumberCodeAndNumberType(Map<String, Object> map);

    void updateByOrderIdLess(Long id);
}
