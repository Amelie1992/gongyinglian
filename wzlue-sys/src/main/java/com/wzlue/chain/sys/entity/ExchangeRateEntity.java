package com.wzlue.chain.sys.entity;

import java.io.Serializable;

/**
 * 汇率转换
 * Created by zhujunwei on 2018/11/1.
 */
public class ExchangeRateEntity implements Serializable{
    private  static  final long serialVersionUID=1L;
    //主键
    private Integer id;
    //汇率
    private String price;
    //转换的关系(如美元/人民币)
    private String vrtName;
    //转换的关系(英文版)
    private String vrtEnName;

    /**
     *  获取主键
     */
    public Integer getId() {
        return id;
    }
    /**
     *  设置主键
     */
    public void setId(Integer id) {
        this.id = id;
    }
    /**
     *  获取汇率
     */
    public String getPrice() {
        return price;
    }
    /**
     *  设置汇率
     */
    public void setPrice(String price) {
        this.price = price;
    }
    /**
     *  获取转换的关系
     */
    public String getVrtName() {
        return vrtName;
    }
    /**
     *  设置转换的关系
     */
    public void setVrtName(String vrtName) {
        this.vrtName = vrtName;
    }
    /**
     *  获取转换的关系(英文)
     */
    public String getVrtEnName() {
        return vrtEnName;
    }
    /**
     *  设置转换的关系(英文)
     */
    public void setVrtEnName(String vrtEnName) {
        this.vrtEnName = vrtEnName;
    }
}
