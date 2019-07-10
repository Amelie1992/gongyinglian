package com.wzlue.chain.storage.entity;

import java.math.BigDecimal;

//仓储订单其他费用--其他--子项
public class FeeObj {
    //费用名称
    private String name;
    //收费
    private BigDecimal fee;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getFee() {
        return fee;
    }

    public void setFee(BigDecimal fee) {
        this.fee = fee;
    }
}
