package com.wzlue.chain.goods.dao;

import com.wzlue.chain.common.annotation.PermissionAop;
import com.wzlue.chain.common.base.BaseDao;
import com.wzlue.chain.goods.entity.ItemCategoryEntity;
import com.wzlue.chain.goods.entity.ItemInfoEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * 商品库表(商品信息)
 * 数据操作层(接口)
 */
@Mapper
public interface ItemInfoDao extends BaseDao<ItemInfoEntity>{

    List<ItemInfoEntity> pageList(Map<String, Object> map);
    
    /*@PermissionAop*/
    int pageCount(Map<String, Object> map);

    void updateDel(Long[] id);

    ItemInfoEntity queryInfo(@Param("id") Long id);

    void saveItem(ItemInfoEntity itemInfo);

    List<ItemCategoryEntity> getTaxNumber();

    void deletePlace(Long[] id);
}
