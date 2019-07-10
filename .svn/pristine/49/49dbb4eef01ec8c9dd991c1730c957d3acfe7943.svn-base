package com.wzlue.chain.logistics.dao;

import com.wzlue.chain.logistics.entity.LogisticsOfferAddressEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 物流报盘运输线路表
 * 
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-08-16 14:12:25
 */
@Mapper
public interface LogisticsOfferAddressDao extends BaseDao<LogisticsOfferAddressEntity> {

    //list接收传入多条数据
    void saveList(List<LogisticsOfferAddressEntity> logisticsOfferAddressEntityList);

    void deleteBatchs(long logisticsId);

    List<LogisticsOfferAddressEntity> queryByLogisticsId(Integer logisticsId);

    List<String> queryLists();

    List<String> queryListInters(@Param("province") String province);

    List<String> queryListsEnd();

    List<String> queryListIntersEnd(@Param("provinceEnd") String province);
}
