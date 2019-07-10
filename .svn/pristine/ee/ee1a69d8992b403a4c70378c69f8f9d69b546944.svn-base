package com.wzlue.chain.storage.dao;

import com.wzlue.chain.storage.entity.OfferEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 仓储报盘
 * 
 * @author 
 * @email 
 * @date 2018-08-27 14:15:36
 */
@Mapper
public interface OfferDao extends BaseDao<OfferEntity> {

    OfferEntity checkCode(OfferEntity offer);

    void updateByOrderId(Long id);

    void updateByOrderId2(Long id);

    void updateList(List<OfferEntity> offers);
}
