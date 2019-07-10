package com.wzlue.chain.bill.dao;

import com.wzlue.chain.bill.entity.BillEntity;

import com.wzlue.chain.bill.entity.PaymentRecordEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 应收/应付账单
 * 
 * @author 
 * @email 
 * @date 2018-09-12 10:43:08
 */
@Mapper
public interface BillDao extends BaseDao<BillEntity> {
    List<BillEntity> queryListReceive(Map<String,Object> map);

    int queryTotalReceive(Map<String,Object> map);

    List<BillEntity> queryListPay(Map<String,Object> map);

    int queryTotalPay(Map<String,Object> map);

    List<BillEntity> queryCreditList(Map<String,Object> map);

    int queryCreditTotal(Map<String,Object> map);

    BillEntity queryByOrderNumberAndPayerId(HashMap<String, Object> map);

    BillEntity queryByOrderNumber(String orderNumber);

    void updateList(List<PaymentRecordEntity> paymentRecordEntityList);

    BillEntity queryByOrder(String orderNumber);

    int updatePayerId(BillEntity bill);
}

