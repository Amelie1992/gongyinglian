package com.wzlue.chain.bill.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.bill.dao.PaymentRecordDao;
import com.wzlue.chain.bill.entity.PaymentRecordEntity;
import com.wzlue.chain.bill.service.PaymentRecordService;



@Service("paymentRecordService")
public class PaymentRecordServiceImpl implements PaymentRecordService {
	@Autowired
	private PaymentRecordDao paymentRecordDao;
	
	@Override
	public PaymentRecordEntity queryObject(Integer id){
		return paymentRecordDao.queryObject(id);
	}
	
	@Override
	public List<PaymentRecordEntity> queryList(Map<String, Object> map){
		return paymentRecordDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return paymentRecordDao.queryTotal(map);
	}
	
	@Override
	public void save(PaymentRecordEntity paymentRecord){
		paymentRecordDao.save(paymentRecord);
	}
	
	@Override
	public void update(PaymentRecordEntity paymentRecord){
		paymentRecordDao.update(paymentRecord);
	}
	
	@Override
	public void delete(Integer id){
		paymentRecordDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Integer[] ids){
		paymentRecordDao.deleteBatch(ids);
	}

	@Override
	public PaymentRecordEntity queryByBillId(Integer billId) {
		return paymentRecordDao.queryListBillId(billId);
	}

}
