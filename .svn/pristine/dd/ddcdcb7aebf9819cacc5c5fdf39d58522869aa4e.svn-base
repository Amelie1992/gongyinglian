package com.wzlue.chain.company.dao;

import com.wzlue.chain.company.entity.ServiceTypeEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 服务类型
 * 
 * @author 
 * @email 
 * @date 2018-08-16 16:47:00
 */
@Mapper
public interface ServiceTypeDao extends BaseDao<ServiceTypeEntity> {
    List<ServiceTypeEntity> getSltList();

    /**
     * 根据主键ID  查询服务类型
     * @return 服务集合
     */
    List<ServiceTypeEntity> getById(List<Long> rolesId);
}
