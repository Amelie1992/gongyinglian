package com.wzlue.chain.web.controller.order.timer;

import com.wzlue.chain.order.dao.GoodsOrderDao;
import com.wzlue.chain.order.entity.GoodsOrderEntity;
import com.wzlue.chain.order.service.GoodsOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 订单时效定时器
 */
@Component
public class OrderAgeing {

    @Autowired
    private GoodsOrderService goodsOrderService;

    @Autowired
    private GoodsOrderDao goodsOrderDao;

    public void ageingTimer() {
        //获取所有未确认/待收货货物订单
        searchOrder("tbc");
        searchOrder("pr");
    }

    public void searchOrder(String value){
        Map<String,Object> param = new HashMap<String,Object>();
        param.put("orderStatus",value);
        //时效
        int AgeingValue;
        String orderStatus;
        List<GoodsOrderEntity> goodsOrderList = goodsOrderService.queryAllList(param);
        if("tbc".equals(param.get("orderStatus"))){
            //待接单30天时效
            AgeingValue = 30;
            orderStatus = "cto";
        }else{
            //待收货60天时效
            AgeingValue = 60;
            orderStatus = "tc";
        }
        for(GoodsOrderEntity goodsOrder : goodsOrderList){
            int days = (int) (((new Date()).getTime() - goodsOrder.getCreateTime().getTime()) / (1000*3600*24));
            if(days > AgeingValue){
                //更改订单状态
                goodsOrder.setOrderStatus(orderStatus);
                goodsOrderDao.update(goodsOrder);
            }
        }
    }
}
