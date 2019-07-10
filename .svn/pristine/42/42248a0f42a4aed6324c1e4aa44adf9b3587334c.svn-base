package com.wzlue.chain.goods.service.impl.apply;

import com.wzlue.chain.goods.dao.ItemPlaceApplyDao;
import com.wzlue.chain.goods.entity.apply.ItemPlaceApplyEntity;
import com.wzlue.chain.goods.service.apply.ItemPlaceApplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
@Service
public class ItemPlaceApplyServiceImpl implements ItemPlaceApplyService {

    @Autowired
    private ItemPlaceApplyDao itemPlaceApplyDao;

    @Override
    public ItemPlaceApplyEntity queryObject(Integer id) {
        return itemPlaceApplyDao.queryObject(id);
    }

    @Override
    public List<ItemPlaceApplyEntity> queryList(Map<String, Object> map) {
        return itemPlaceApplyDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return itemPlaceApplyDao.queryTotal(map);
    }

    @Override
    public void save(ItemPlaceApplyEntity itemPlaceApply) {
        itemPlaceApplyDao.save(itemPlaceApply);
    }

    @Override
    public void update(ItemPlaceApplyEntity itemPlaceApply) {
        itemPlaceApplyDao.update(itemPlaceApply);
    }

    @Override
    public void delete(Integer id) {
        itemPlaceApplyDao.delete(id);
    }

    @Override
    public void deleteBatch(Integer[] ids) {
        itemPlaceApplyDao.deleteBatch(ids);
    }
}
