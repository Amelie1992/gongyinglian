package com.wzlue.chain.web.controller.storage.timer;

/**
 * Created by Administrator on 2018/9/21.
 */

import com.wzlue.chain.bill.dao.BillDao;
import com.wzlue.chain.bill.dao.PaymentRecordDao;
import com.wzlue.chain.bill.entity.PaymentRecordEntity;
import com.wzlue.chain.common.utils.DateUtils;
import com.wzlue.chain.company.entity.MerchantCompanyEntity;
import com.wzlue.chain.storage.entity.OrderEntity;
import com.wzlue.chain.storage.entity.StoragePayEntity;
import com.wzlue.chain.storage.service.StoragePayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class Pay {
    @Autowired
    private StoragePayService storagePayService;
    @Autowired
    private PaymentRecordDao paymentRecordDao;
    @Autowired
    private BillDao billDao;

    @Scheduled(cron="0 0 23 * * ?")
    public void payTimer() {
        List<StoragePayEntity> list=storagePayService.queryListToSave();
        if(list!=null&&list.size()>0){
            storagePayService.saveList(list);
        }
        List<PaymentRecordEntity> paymentRecordEntityList=paymentRecordDao.queryStoragePayToPaymentRecord();
        if(paymentRecordEntityList!=null&&paymentRecordEntityList.size()>0){
            //生成付款（收款）记录
            paymentRecordDao.saveList(paymentRecordEntityList);
            //更改款项记录对应的账单金额
            billDao.updateList(paymentRecordEntityList);
        }
    }
}
