package com.wzlue.chain.goods.service;

import com.wzlue.chain.goods.entity.ItemCategoryEntity;
import com.wzlue.chain.goods.entity.ItemOriginPlaceEntity;

import java.util.List;
import java.util.Map;

/**
 * 商品分类表
 * 业务逻辑处理 数据结构处理
 */
public interface ItemCategoryService {

    ItemCategoryEntity queryObject(Integer id);

    List<ItemCategoryEntity> queryList(Map<String, Object> map);

    int queryTotal(Map<String, Object> map);

    List<ItemCategoryEntity> pageList(Map<String, Object> map);

    int pageCount(Map<String, Object> map);

    void save(ItemCategoryEntity itemCategory);

    void update(ItemCategoryEntity itemCategory);

    void delete(Integer id);

    void deleteBatch(Integer[] ids);

    List<ItemCategoryEntity> getList();

    List<ItemCategoryEntity> getTopList();

    List<ItemCategoryEntity> getSelectList();

    void updateDel(Long[] id);

    List<ItemCategoryEntity> getSelectAllList();

    List<ItemOriginPlaceEntity> getPlacesByCategoryId(Long[] ids);

    int checkOnly(String categoryName,String taxNumber,Integer id);

    List<ItemOriginPlaceEntity> getPlaces(Map<String, Object> params);

    List<ItemCategoryEntity> getItemCategory(Map<String, Object> params);

    List<ItemOriginPlaceEntity> getPlaceByBuyingGoods(Map<String, Object> params);

    List<ItemOriginPlaceEntity> getAllPlaceByBuyingGoods();

    List<ItemOriginPlaceEntity> getPlaceByIdsAndName(Map<String, Object> params);
}
