package com.wzlue.chain.storage.service.impl;

import com.wzlue.chain.bill.dao.BillDao;
import com.wzlue.chain.bill.dao.PaymentRecordDao;
import com.wzlue.chain.bill.entity.BillEntity;
import com.wzlue.chain.bill.entity.PaymentRecordEntity;
import com.wzlue.chain.common.utils.DateUtils;
import com.wzlue.chain.storage.dao.*;
import com.wzlue.chain.storage.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.*;

import com.wzlue.chain.storage.service.StorageOutService;


@Service("storageOutService")
public class StorageOutServiceImpl implements StorageOutService {
    @Autowired
    private StorageOutDao storageOutDao;
    @Autowired
    private StorageOutCommodityDao storageOutCommodityDao;
    @Autowired
    private OrderCommodityDao orderCommodityDao;
    @Autowired
    private StoragePayDao storagePayDao;
    @Autowired
    private OrderCostDao orderCostDao;
    @Autowired
    private BillDao billDao;
    @Autowired
    private PaymentRecordDao paymentRecordDao;
    @Autowired
    private OrderDao orderDao;

    @Override
    public StorageOutEntity queryObject(Long id) {
        return storageOutDao.queryObject(id);
    }

    @Override
    public List<StorageOutEntity> queryList(Map<String, Object> map) {
        return storageOutDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return storageOutDao.queryTotal(map);
    }

    @Override
    public void save(StorageOutEntity storageOut) {
        storageOutDao.save(storageOut);
        List<StorageOutCommodityEntity> commodityEntityList = storageOut.getCommodityEntityList();
        for (StorageOutCommodityEntity storageOutCommodityEntity : commodityEntityList) {
            storageOutCommodityEntity.setOutId(storageOut.getId());
        }
        storageOutCommodityDao.saveList(commodityEntityList);
    }

    //仓库方确认已出库
    @Override
    public void update(StorageOutEntity storageOut) {
        //修改状态
        storageOutDao.update(storageOut);
//        storageOutCommodityDao.deleteByOutId(storageOut.getId());
        List<StorageOutCommodityEntity> outCommodityList = storageOut.getCommodityEntityList();
//        for (StorageOutCommodityEntity storageOutCommodityEntity : outCommodityList) {
//            storageOutCommodityEntity.setOutId(storageOut.getId());
//        }
//        storageOutCommodityDao.saveList(outCommodityList);
        storageOutCommodityDao.updateList(outCommodityList);
        //先---修改已出库的数量
        orderCommodityDao.updateByOutId(storageOut.getId());
        //修改订单库存状态
        for (StorageOutCommodityEntity outCommodity : outCommodityList) {   //出库货物
            Long orderID = outCommodity.getOrderId();
            OrderEntity order = orderDao.queryObject(orderID);  //出货的订单
            int i = 0;
            Map<String, Object> map = new HashMap<>();
            map.put("orderId", orderID);
            List<OrderCommodityEntity> orderCommodityList = orderCommodityDao.queryList(map); //入库货物
            for (OrderCommodityEntity orderCommodity : orderCommodityList) {
                BigDecimal outWeight = orderCommodity.getOutWeight();
//                BigDecimal outWeightNum = orderCommodity.getOutWeightNum();
                if (outWeight == null) {
                    outWeight = BigDecimal.ZERO;
                }
//                if (outWeightNum==null){
//                    outWeightNum=BigDecimal.ZERO;
//                }
                int x = orderCommodity.getWeight().compareTo(outWeight);
//                int y = orderCommodity.getMerchantWeight().compareTo(outWeightNum);
//                if (x == 0 && y == 0) { //出库重量=入库重量 且 出库数量=入库数量
//                    i++;
//                }
                if (x == 0) { //出库重量=入库重量
                    i++;
                }
            }
            if (orderCommodityList.size() == i) {
                order.setStockStatus(1);    //无库存
                order.setPassStatus(6);     //此订单的货物已经全部出库
                order.setUpdatedBy(storageOut.getUpdateBy());
                order.setUpdatedTime(new Date());
                orderDao.update(order);
            }
        }
        //记录仓库出库产生的仓储订单其他费用
        //若多订单一起出库 其他费用记在第一个订单上
        OrderCostEntity orderCost = storageOut.getOrderCost();
        StorageOutCommodityEntity storageOutCommodityEntity = outCommodityList.get(0);
        Long orderId = storageOutCommodityEntity.getOrderId();
        String orderNumber = storageOutCommodityEntity.getOrderNumber();
        orderCost.setOutId(storageOut.getId());
        orderCost.setOrderId(orderId);
        orderCost.setOrderNumber(orderNumber);
        orderCost.setCreateBy(storageOut.getUpdateBy().intValue());
        orderCost.setCreatedTime(storageOut.getUpdateTime());
        orderCostDao.save(orderCost);
        //生成对应账单的付款（收款）记录
        PaymentRecordEntity paymentRecordEntity = new PaymentRecordEntity();
        BillEntity bill = billDao.queryByOrderNumber(orderNumber);
        BigDecimal all = orderCost.getAll();    //仓储订单其他费用总和
        int compare = all.compareTo(BigDecimal.ZERO);   //与0比较
        if (compare > 0){
            if (bill != null) {
                paymentRecordEntity.setBillId(bill.getId());
                paymentRecordEntity.setAmount(all);
                paymentRecordEntity.setDate(DateUtils.format(new Date(), "yyyy-MM-dd"));
                paymentRecordEntity.setPayStatus(0);//支付状态 0：待付款 1：已付款
                paymentRecordEntity.setStorageOrderCostId(orderCost.getId().intValue());
                paymentRecordEntity.setCreateBy(storageOut.getUpdateBy().intValue());
                paymentRecordEntity.setCreatedTime(new Date());
                paymentRecordEntity.setUnit(bill.getUnit());
                paymentRecordDao.save(paymentRecordEntity);
                //仓储订单其他费用总和 计入 应收应付账单金额
                bill.setAmountReceivable(bill.getAmountReceivable().add(all));
                bill.setAmountPayable(bill.getAmountPayable().add(all));
                bill.setRemainingAmountReceivable(bill.getRemainingAmountReceivable().add(all));
                bill.setRemainingAmountPayable(bill.getRemainingAmountPayable().add(all));
                bill.setUpdateBy(storageOut.getUpdateBy().intValue());
                bill.setUpdateTime(new Date());
                billDao.update(bill);
            }
            //更改(第一个)订单总金额
            OrderEntity orderEntity = orderDao.queryObjectByOrderNumber(orderNumber);
            orderEntity.setTotal(orderEntity.getTotal().add(all));
            orderDao.update(orderEntity);
        }

        //再---记录该出库单（这笔出库货物的）当日仓库费用
        List<StoragePayEntity> list = storagePayDao.queryListByOutId(storageOut.getId());
        if (list != null && list.size() > 0) {
            storagePayDao.saveList(list);
            //
            List<Long> idList = new ArrayList<>();
            for (StoragePayEntity pay : list) {
                idList.add(pay.getId());
            }
            //生成对应账单的付款（收款）记录
            List<PaymentRecordEntity> recordList = paymentRecordDao.queryStoragePayToPaymentRecord2(idList);
            if (recordList != null && recordList.size() > 0) {
                paymentRecordDao.saveList(recordList);
                //更改款项记录对应的账单金额
                billDao.updateList(recordList);
                //更改订单总金额   //total为null
                orderDao.updateList(recordList);
            }
        }

    }

    @Override
    public void delete(Long id) {
        storageOutDao.delete(id);
    }

    @Override
    public void deleteBatch(Long[] ids) {
        storageOutDao.deleteBatch(ids);
    }

    @Override
    public void updateOutOrCommodity(StorageOutEntity storageOut) {
        storageOutDao.update(storageOut);
        storageOutCommodityDao.deleteByOutId(storageOut.getId());
        List<StorageOutCommodityEntity> commodityEntityList = storageOut.getCommodityEntityList();
        for (StorageOutCommodityEntity storageOutCommodityEntity : commodityEntityList) {
            storageOutCommodityEntity.setOutId(storageOut.getId());
        }
        storageOutCommodityDao.saveList(commodityEntityList);
    }
}
