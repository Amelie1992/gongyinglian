package com.wzlue.chain.sys.dao;

import com.wzlue.chain.common.base.BaseDao;
import com.wzlue.chain.sys.entity.SysNumberRuleEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * 编码规则
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2018-03-27 09:50:44
 */
@Mapper
public interface SysNumberRuleDao extends BaseDao<SysNumberRuleEntity> {

    SysNumberRuleEntity queryParams(SysNumberRuleEntity sysNumberRule);

    void updateCodeNumber();

    SysNumberRuleEntity queryByTypeAndName(@Param("type")String type , @Param("name") String name);
}
