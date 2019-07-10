package com.wzlue.chain.logistics.dao;

import com.wzlue.chain.logistics.entity.LogisticsContractEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * (物流订单)合同信息表
 * 
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-09-18 16:30:22
 */
@Mapper
public interface LogisticsContractDao extends BaseDao<LogisticsContractEntity> {

    int checkName(String contractNumber);

    LogisticsContractEntity checkCode(LogisticsContractEntity logisticsContract);

    void setExpireDateByOrderId(Long id);
}
