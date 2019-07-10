package com.wzlue.chain.company.dao;

import com.wzlue.chain.company.entity.ReceivingAddressEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * 收货地址
 * 
 * @author 
 * @email 
 * @date 2018-08-18 10:55:39
 */
@Mapper
public interface ReceivingAddressDao extends BaseDao<ReceivingAddressEntity> {

    boolean setDefatultAddress(@Param("userId") Long userId,@Param("id") Long id);

    void cancelDetailAddress(Integer id);
}
