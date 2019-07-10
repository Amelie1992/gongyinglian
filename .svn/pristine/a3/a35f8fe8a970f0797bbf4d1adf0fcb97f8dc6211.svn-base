package com.wzlue.chain.bill.service;

import com.wzlue.chain.bill.entity.PaymentRecordEntity;

import java.util.List;
import java.util.Map;

/**
 * 付款（收款）记录
 * 
 * @author 
 * @email 
 * @date 2018-09-12 18:59:16
 */
public interface PaymentRecordService {
	
	PaymentRecordEntity queryObject(Integer id);
	
	List<PaymentRecordEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(PaymentRecordEntity paymentRecord);
	
	void update(PaymentRecordEntity paymentRecord);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);

    PaymentRecordEntity queryByBillId(Integer billId);
}
