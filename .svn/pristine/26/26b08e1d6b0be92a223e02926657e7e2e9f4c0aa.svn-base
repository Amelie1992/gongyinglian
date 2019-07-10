package com.wzlue.chain.bill.dao;

import com.wzlue.chain.bill.entity.MyAccountEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * 我的账户
 * 
 * @author 
 * @email 
 * @date 2018-09-20 10:55:05
 */
@Mapper
public interface MyAccountDao extends BaseDao<MyAccountEntity> {

    MyAccountEntity queryMyAccount(@Param("create_by") Long id);

    MyAccountEntity queryObjectByCompanyId(Integer id);
}
