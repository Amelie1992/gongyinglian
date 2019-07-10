package com.wzlue.chain.goods.dao;

import com.wzlue.chain.common.annotation.PermissionAop;
import com.wzlue.chain.common.base.BaseDao;
import com.wzlue.chain.goods.entity.apply.ItemInfoApplyEntity;
import com.wzlue.chain.goods.entity.apply.ItemPlaceApplyEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/*数据接口层
* 商品申请信息*/
@Mapper
public interface ItemInfoApplyDao extends BaseDao<ItemInfoApplyEntity>{
	@PermissionAop
    List<ItemInfoApplyEntity> pageList(Map<String, Object> map);
	@PermissionAop
    Integer pageCount(Map<String, Object> map);

    ItemInfoApplyEntity queryInfo(@Param("id") Long id);

    void review(ItemInfoApplyEntity item);

    void updateUpdate(ItemPlaceApplyEntity place);

    void deleteBanchById(Long[] id);
}
