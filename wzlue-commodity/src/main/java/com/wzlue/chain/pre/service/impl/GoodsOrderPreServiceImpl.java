package com.wzlue.chain.pre.service.impl;

import com.wzlue.chain.order.entity.GoodsOrderEntity;
import com.wzlue.chain.order.service.GoodsOrderService;
import com.wzlue.chain.sys.entity.SysUserEntity;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.wzlue.chain.pre.dao.GoodsOrderPreDao;
import com.wzlue.chain.pre.entity.GoodsOrderPreEntity;
import com.wzlue.chain.pre.service.GoodsOrderPreService;
import org.springframework.transaction.annotation.Transactional;


@Service("goodsOrderPreService")
public class GoodsOrderPreServiceImpl implements GoodsOrderPreService {
    @Autowired
    private GoodsOrderPreDao goodsOrderPreDao;
    @Autowired
    private GoodsOrderService goodsOrderService;

    @Override
    public GoodsOrderPreEntity queryObject(Integer id) {
        return goodsOrderPreDao.queryObject(id);
    }

    @Override
    public List<GoodsOrderPreEntity> queryList(Map<String, Object> map) {
        return goodsOrderPreDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return goodsOrderPreDao.queryTotal(map);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void save(GoodsOrderPreEntity goodsOrderPre) {
        goodsOrderPre.setCreateBy(getUser().getUserId().toString());
        goodsOrderPre.setCreateTime(new Date());
        GoodsOrderEntity goodsOrderEntity = new GoodsOrderEntity();
        goodsOrderEntity.setOrderNumber(goodsOrderPre.getOrderId());
        if (goodsOrderPre.getPreStatus() == 0) {
            goodsOrderEntity.setOrderStatus("tbc");
        } else {
            goodsOrderEntity.setOrderStatus("af");
        }
        goodsOrderPreDao.updateStatus(goodsOrderEntity);
        goodsOrderPreDao.save(goodsOrderPre);
    }

    @Override
    public void update(GoodsOrderPreEntity goodsOrderPre) {
        goodsOrderPreDao.update(goodsOrderPre);
    }

    @Override
    public void delete(Integer id) {
        goodsOrderPreDao.delete(id);
    }

    @Override
    public void deleteBatch(Integer[] ids) {
        goodsOrderPreDao.deleteBatch(ids);
    }

    @Override
    public GoodsOrderPreEntity getByOrderId(String orderId) {
        return goodsOrderPreDao.getByOrderId(orderId);
    }

    /**
     * 获取登录用户信息
     *
     * @return
     */
    private SysUserEntity getUser() {
        return (SysUserEntity) SecurityUtils.getSubject().getPrincipal();
    }

}
