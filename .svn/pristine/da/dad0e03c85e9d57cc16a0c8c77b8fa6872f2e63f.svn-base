package com.wzlue.chain.web.controller.sys;

import com.alibaba.fastjson.JSON;
import com.wzlue.chain.sys.entity.ExchangeRateEntity;
import com.wzlue.chain.sys.service.ExchangeRateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2018/11/5.
 */
@RestController
@RequestMapping("/work/exchangeRate")
public class ExchangeRateController {
        @Autowired
        private ExchangeRateService exchangeRateService;

        /**
         * 获取货币名称
         *
         * @return json对象
         * @throws IOException
         */
        @RequestMapping(value = "/exchangeList", produces = "application/json;charset=UTF-8")
        public String getListByName() throws IOException {
            List<ExchangeRateEntity> rateList = exchangeRateService.getList();
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("rateList", rateList);
            String json = JSON.toJSONString(map);
            return json;
        }
    /**
     * 根据货币名获取货币的汇率
     *
     * @return json对象
     * @throws IOException
     */
    @RequestMapping(value = "/exchangePrice", produces = "application/json;charset=UTF-8")
    public String getPrice(String cName) throws IOException {
        List<ExchangeRateEntity> rateList = exchangeRateService.getPriceByName(cName);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("rateList", rateList);
        String json = JSON.toJSONString(map);
        return json;
    }
    }

