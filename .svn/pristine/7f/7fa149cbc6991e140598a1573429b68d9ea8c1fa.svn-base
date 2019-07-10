package com.wzlue.chain.goods.service;

import com.wzlue.chain.goods.entity.ItemCategoryEntity;
import com.wzlue.chain.goods.entity.ItemInfoEntity;

import java.util.List;
import java.util.Map;

/**
 * 商品信息表 (业务接口)
 * 业务逻辑处理 数据结构处理
 */
public interface ItemInfoService {
    ItemInfoEntity queryObject(Integer id);

    List<ItemInfoEntity> queryList(Map<String, Object> map);

    int queryTotal(Map<String, Object> map);

    void save(ItemInfoEntity itemInfo);

    void update(ItemInfoEntity itemInfo);

    void delete(Integer id);

    void deleteBatch(Integer[] ids);

    List<ItemInfoEntity> pageList(Map<String, Object> map);

    int pageCount(Map<String, Object> map);

    void updateDel(Long[] id);

    ItemInfoEntity queryInfo(Long id);

    List<ItemCategoryEntity> getTaxNumber();
}
