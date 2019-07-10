package com.wzlue.chain.sys.service.impl;


import com.wzlue.chain.sys.dao.ExchangeRateDao;
import com.wzlue.chain.sys.entity.ExchangeRateEntity;
import com.wzlue.chain.sys.service.ExchangeRateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 汇率值接口
 * Created by zhujunwei on 2018/11/2.
 */
@Service
public class ExchangeRateServiceImpl implements ExchangeRateService {
    @Autowired
    private ExchangeRateDao exchangeDao;


    @Override
    public List<ExchangeRateEntity> getList() {
        return exchangeDao.getList();
    }

    @Override
    public List<ExchangeRateEntity> getListEn() {
        return exchangeDao.getListEn();
    }

    @Override
    public List<ExchangeRateEntity> getPriceByName(String vrtName) {
        return exchangeDao.getPriceByName(vrtName);
    }
}
