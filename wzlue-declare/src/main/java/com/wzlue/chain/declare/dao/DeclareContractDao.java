package com.wzlue.chain.declare.dao;

import com.wzlue.chain.declare.entity.DeclareContractEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * (订单)合同信息表
 * 
 * @author 
 * @email 
 * @date 2018-09-17 10:57:26
 */
@Mapper
public interface DeclareContractDao extends BaseDao<DeclareContractEntity> {

    DeclareContractEntity queryInfo(Long id);


    List<DeclareContractEntity> pageList(Map<String, Object> map);

    int pageTotal(Map<String, Object> map);

    void deleteByOrderNumberAndContractNumber(@Param("orderNumber") String orderNumber, @Param("contractNumber") String contractNumber);

    List<DeclareContractEntity> queryByContractNumber(String contractNumber);

    void setExpireDateByOrderId(Long id);
}
