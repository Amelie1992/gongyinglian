package com.wzlue.chain.afterSale.dao;

import com.wzlue.chain.afterSale.entity.AfterSaleEntity;
import com.wzlue.chain.common.annotation.PermissionAop;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * 售后服务
 * 
 * @author 
 * @email 
 * @date 2018-08-31 13:38:09
 */
@Mapper
public interface AfterSaleDao extends BaseDao<AfterSaleEntity> {

    void handle(AfterSaleEntity afterSale);

    AfterSaleEntity queryByOrderId(String orderId);

    int getAfter(String id);
}
