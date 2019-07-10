package com.wzlue.chain.storage.dao;

import com.wzlue.chain.bill.entity.PaymentRecordEntity;
import com.wzlue.chain.common.base.BaseDao;
import com.wzlue.chain.company.entity.MerchantCompanyEntity;
import com.wzlue.chain.storage.entity.OrderEntity;
import com.wzlue.chain.storage.entity.StorageContractEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * 仓储订单
 * 
 * @author 
 * @email 
 * @date 2018-08-29 17:48:31
 */
@Mapper
public interface OrderDao extends BaseDao<OrderEntity> {

    List<MerchantCompanyEntity> getCompanys(Long userId);

    OrderEntity queryObjectByOrderNumber(String orderNumber);

    List<OrderEntity> queryListByNumberCode(Map<String, Object> map);

    String getBuyCompany(String companyId);

    void updateList(List<PaymentRecordEntity> paymentRecordEntityList);

    List<Map<String,Object>> queryListByNumberCodeAndNumberType(Map<String, Object> map);

    List<Map> showList(Map<String, Object> map);
}
