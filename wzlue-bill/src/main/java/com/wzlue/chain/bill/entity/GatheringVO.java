package com.wzlue.chain.bill.entity;

import java.util.List;


public class GatheringVO {

    private List<PaymentRecordEntity> paymentRecords;

    private Gathering Gathering;

    public List<PaymentRecordEntity> getPaymentRecords() {
        return paymentRecords;
    }

    public void setPaymentRecords(List<PaymentRecordEntity> paymentRecords) {
        this.paymentRecords = paymentRecords;
    }

    public com.wzlue.chain.bill.entity.Gathering getGathering() {
        return Gathering;
    }

    public void setGathering(com.wzlue.chain.bill.entity.Gathering gathering) {
        Gathering = gathering;
    }
}
