package com.wzlue.chain.bill.entity;

import java.util.List;

public class PaymentVO {
    private List<PaymentRecordEntity> paymentRecords;

    private PaymentEntity payment;

    public List<PaymentRecordEntity> getPaymentRecords() {
        return paymentRecords;
    }

    public void setPaymentRecords(List<PaymentRecordEntity> paymentRecords) {
        this.paymentRecords = paymentRecords;
    }

    public PaymentEntity getPayment() {
        return payment;
    }

    public void setPayment(PaymentEntity payment) {
        this.payment = payment;
    }
}
