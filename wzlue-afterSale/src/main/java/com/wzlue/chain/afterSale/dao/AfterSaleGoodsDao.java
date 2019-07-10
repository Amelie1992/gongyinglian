package com.wzlue.chain.afterSale.dao;

import com.wzlue.chain.afterSale.entity.AfterSaleGoodsEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 申请售后的商品信息
 * 
 * @author 
 * @email 
 * @date 2018-09-15 16:30:14
 */
@Mapper
public interface AfterSaleGoodsDao extends BaseDao<AfterSaleGoodsEntity> {

    void saveList(List<AfterSaleGoodsEntity> goods);
}
