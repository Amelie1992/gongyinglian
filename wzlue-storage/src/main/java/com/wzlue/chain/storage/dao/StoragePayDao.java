package com.wzlue.chain.storage.dao;

import com.wzlue.chain.storage.entity.StoragePayEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * 仓储日费用记录表
 * 
 * @author 
 * @email 
 * @date 2018-09-19 19:09:47
 */
@Mapper
public interface StoragePayDao extends BaseDao<StoragePayEntity> {

    List<StoragePayEntity> queryListByOrderNumber(String orderNumber);

    BigDecimal sum(String[] ids);

    List<StoragePayEntity> queryList2();

    List<StoragePayEntity> queryListToSave();

    void saveList(List<StoragePayEntity> list);

    List<StoragePayEntity> queryListByOutId(Long outId);
}
