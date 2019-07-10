package com.wzlue.chain.declare.dao;

import com.wzlue.chain.declare.entity.DeclareOfferCustomsEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 报关报盘海关
 * 
 * @author ÎºË¼Æë
 * @email sunlightcs@gmail.com
 * @date 2018-08-16 16:12:27
 */
@Mapper
public interface DeclareOfferCustomsDao extends BaseDao<DeclareOfferCustomsEntity> {
    List<DeclareOfferCustomsEntity> getListById(Integer offerId);

    void deleteList(List<DeclareOfferCustomsEntity> oldList);

    void saveList(List<DeclareOfferCustomsEntity> list);

    void deleteOffer(Integer[] offerId);
}
