package com.wzlue.chain.storage.service.impl;

import com.wzlue.chain.storage.entity.StorageOutCommodityEntity;
import com.wzlue.chain.sys.entity.SysUserEntity;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.storage.dao.OrderCommodityDao;
import com.wzlue.chain.storage.entity.OrderCommodityEntity;
import com.wzlue.chain.storage.service.OrderCommodityService;


@Service("orderCommodityService")
public class OrderCommodityServiceImpl implements OrderCommodityService {
    @Autowired
    private OrderCommodityDao orderCommodityDao;

    @Override
    public OrderCommodityEntity queryObject(Long id) {
        return orderCommodityDao.queryObject(id);
    }

    @Override
    public List<OrderCommodityEntity> queryList(Map<String, Object> map) {
        return orderCommodityDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return orderCommodityDao.queryTotal(map);
    }

    @Override
    public void save(OrderCommodityEntity orderCommodity) {
        orderCommodityDao.save(orderCommodity);
    }

    @Override
    public void update(OrderCommodityEntity orderCommodity) {
        orderCommodityDao.update(orderCommodity);
    }

    @Override
    public void delete(Long id) {
        orderCommodityDao.delete(id);
    }

    @Override
    public void deleteBatch(Long[] ids) {
        orderCommodityDao.deleteBatch(ids);
    }

    @Override
    public List<StorageOutCommodityEntity> queryCommoditys(Map<String, Object> map) {
        SysUserEntity user = (SysUserEntity) SecurityUtils.getSubject().getPrincipal();
        if (user.getCompanyId() != null) {
            map.put("merchantId", user.getCompanyId());
        }
        return orderCommodityDao.queryCommoditys(map);
    }
}
