package com.wzlue.chain.bill.entity;

import java.math.BigDecimal;

//确认收款 对象
public class Gathering {

    //实收金额
    private BigDecimal amountCollected;
    //备注
    private String remarks;

    public BigDecimal getAmountCollected() {
        return amountCollected;
    }

    public void setAmountCollected(BigDecimal amountCollected) {
        this.amountCollected = amountCollected;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}
