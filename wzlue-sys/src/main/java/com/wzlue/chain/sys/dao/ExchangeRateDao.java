package com.wzlue.chain.sys.dao;


import com.wzlue.chain.sys.entity.ExchangeRateEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 汇率转换表
 * Created by zhujunwei on 2018/11/1.
 */
@Mapper
public interface ExchangeRateDao {
    //获取货币名称
    List<ExchangeRateEntity> getList();
    //获取货币名称(英文)
    List<ExchangeRateEntity> getListEn();
    //根据货币名找到汇率值
    List<ExchangeRateEntity> getPriceByName(@Param("vrtName") String vrtName);
}
