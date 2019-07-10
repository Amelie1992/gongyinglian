package com.wzlue.chain.goods.service.impl;

import com.wzlue.chain.goods.dao.ItemOriginPlaceDao;
import com.wzlue.chain.goods.entity.ItemOriginPlaceEntity;
import com.wzlue.chain.goods.service.ItemOriginPlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * 商品产地信息表
 * 业务层(实现)
 */
@Service
public class ItemOriginPlaceServiceImpl implements ItemOriginPlaceService {

    @Autowired
    private ItemOriginPlaceDao itemOriginPlaceDao;

    @Override
    public ItemOriginPlaceEntity queryObject(Integer id) {
        return itemOriginPlaceDao.queryObject(id);
    }

    @Override
    public List<ItemOriginPlaceEntity> queryList(Map<String, Object> map) {
        return itemOriginPlaceDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return itemOriginPlaceDao.queryTotal(map);
    }

    @Override
    public void save(ItemOriginPlaceEntity itemOriginPlace) {
        itemOriginPlaceDao.save(itemOriginPlace);
    }

    @Override
    public void update(ItemOriginPlaceEntity itemOriginPlace) {
        itemOriginPlaceDao.update(itemOriginPlace);
    }

    @Override
    public void delete(Integer id) {
        itemOriginPlaceDao.delete(id);
    }

    @Override
    public void deleteBatch(Integer[] ids) {
        itemOriginPlaceDao.deleteBatch(ids);
    }
}
