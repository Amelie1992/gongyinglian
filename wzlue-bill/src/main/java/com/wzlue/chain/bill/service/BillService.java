package com.wzlue.chain.bill.service;

import com.wzlue.chain.bill.entity.*;
import com.wzlue.chain.common.base.Query;

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
public interface BillService {
	
	BillEntity queryObject(Integer id);
	
	List<BillEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(BillEntity bill);
	
	void update(BillEntity bill);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);

	List<BillEntity> queryListReceive(Map<String, Object> map);

	int queryTotalReceive(Map<String, Object> map);

	List<BillEntity> queryListPay(Map<String, Object> map);

	int queryTotalPay(Map<String, Object> map);

    void gatheringMethod(List<PaymentRecordEntity> paymentRecords, Gathering gathering);

    MyAccountEntity getMyAccount();

	//余额支付 -- 买家打款给平台
    void balancePayment(List<PaymentRecordEntity> paymentRecords, PaymentEntity payment);

    //余额支付 -- 平台打款给卖家
    void masterBalancePayment(List<PaymentRecordEntity> masterRecords, PaymentEntity payment);

    void offlinePay(List<PaymentRecordEntity> paymentRecords, PaymentEntity payment);

    ////账期账单
    List<BillEntity> queryCreditList(Map<String, Object> map);

	int queryCreditTotal(Map<String, Object> map);

    void audit(BillEntity bill);
	//账期账单 余额支付 -- 买家打款给平台
    void balancePayment2(List<PaymentRecordEntity> paymentRecords, PaymentEntity payment);

	BillEntity queryByOrderNumber(String orderNumber);

	void updatePayerId(BillEntity bill);


}
