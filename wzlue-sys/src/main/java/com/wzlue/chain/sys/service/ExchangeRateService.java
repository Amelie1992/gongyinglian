package com.wzlue.chain.sys.service;


import com.wzlue.chain.sys.entity.ExchangeRateEntity;

import java.util.List;

/**
 * 汇率转化表
 * Created by zhujunwei on 2018/11/2.
 */
public interface ExchangeRateService {
    //获取货币名称
    List<ExchangeRateEntity> getList();
    //获取货币名称(英文)
    List<ExchangeRateEntity> getListEn();
    //根据货币名找到汇率值
    List<ExchangeRateEntity> getPriceByName(String vrtName);
}
