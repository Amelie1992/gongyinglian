package com.wzlue.chain.goods.dao;

import com.wzlue.chain.common.annotation.PermissionAop;
import com.wzlue.chain.common.base.BaseDao;
import com.wzlue.chain.goods.entity.ItemCategoryEntity;
import com.wzlue.chain.goods.entity.ItemOriginPlaceEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * 商品分类表
 * 数据操作层(接口)
 */
@Mapper
public interface ItemCategoryDao extends BaseDao<ItemCategoryEntity>{

    List<ItemCategoryEntity> getList();

    List<ItemCategoryEntity> getTopList();

    /*@PermissionAop*/
    List<ItemCategoryEntity> pageList(Map<String, Object> map);

    /*@PermissionAop*/
    Integer pageCount(Map<String, Object> map);

    void updateDel(Long[] id);

    List<ItemOriginPlaceEntity> getPlacesByCategoryId(Long[] id);

    int checkOnly(ItemCategoryEntity itemCategory);

    List<ItemOriginPlaceEntity> getPlaces(Map<String, Object> params);

    List<ItemCategoryEntity> getItemCategory(Map<String, Object> params);

    List<ItemOriginPlaceEntity> getPlaceByBuyingGoods(Map<String, Object> params);

    List<ItemOriginPlaceEntity> getAllPlaceByBuyingGoods();

    List<ItemOriginPlaceEntity> getPlaceByIdsAndName(Map<String, Object> params);
}
