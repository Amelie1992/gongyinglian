package com.wzlue.chain.company.dao;

import com.wzlue.chain.company.entity.CompanyTypeEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 公司类型
 *
 * @author
 * @email
 * @date 2018-09-05 11:15:33
 */
@Mapper
public interface CompanyTypeDao extends BaseDao<CompanyTypeEntity> {
    /**
     * 获取所有 公司类型
     *
     * @return
     */
    List<CompanyTypeEntity> queryCompanyTypeAll();

}
