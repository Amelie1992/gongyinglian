package com.wzlue.chain.order.entity;

import java.io.Serializable;
import java.math.BigDecimal;

public class OrderPriceVersionEntity implements Serializable {
    private String id;
    //订单编号
    private String orderNumber;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public BigDecimal getOriginalTotalPrice() {
        return originalTotalPrice;
    }

    public void setOriginalTotalPrice(BigDecimal originalTotalPrice) {
        this.originalTotalPrice = originalTotalPrice;
    }

    public BigDecimal getLaterTotalPrice() {
        return laterTotalPrice;
    }

    public void setLaterTotalPrice(BigDecimal laterTotalPrice) {
        this.laterTotalPrice = laterTotalPrice;
    }

    public BigDecimal getOriginalCarriage() {
        return originalCarriage;
    }

    public void setOriginalCarriage(BigDecimal originalCarriage) {
        this.originalCarriage = originalCarriage;
    }

    public BigDecimal getLaterCarriage() {
        return laterCarriage;
    }

    public void setLaterCarriage(BigDecimal laterCarriage) {
        this.laterCarriage = laterCarriage;
    }

    //商品原总价
    private BigDecimal originalTotalPrice;
    //商品改后总价
    private BigDecimal laterTotalPrice;
    //运费原价
    private BigDecimal originalCarriage;
    //运费改后价
    private BigDecimal laterCarriage;

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    //添加时间
    private String createTime;


}
