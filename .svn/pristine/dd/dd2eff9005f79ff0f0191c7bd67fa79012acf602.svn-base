package com.wzlue.chain.goods.service.apply;

import com.wzlue.chain.goods.entity.apply.ItemInfoApplyEntity;
import com.wzlue.chain.goods.entity.apply.ItemPlaceApplyEntity;

import java.util.List;
import java.util.Map;

public interface ItemInfoApplyService {
    ItemInfoApplyEntity queryObject(Integer id);

    List<ItemInfoApplyEntity> queryList(Map<String, Object> map);

    ItemInfoApplyEntity queryInfo(Long id);

    int queryTotal(Map<String, Object> map);

    void save(ItemInfoApplyEntity itemInfoApply);

    void update(ItemInfoApplyEntity itemInfoApply);

    void delete(Integer id);

    void deleteBatch(Integer[] ids);

    List<ItemInfoApplyEntity> pageList(Map<String, Object> map);

    Integer pageCount(Map<String, Object> map);

    void review(ItemInfoApplyEntity itemInfoApplyEntity);

    void updateDel(Long[] id);

    void updateUpdate(ItemPlaceApplyEntity place);

    void deleteBanchById(Long[] id);
}
