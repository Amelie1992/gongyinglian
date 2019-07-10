package com.wzlue.chain.agent.dao;

import com.wzlue.chain.agent.entity.AgentDemandEntity;
import com.wzlue.chain.common.annotation.PermissionAop;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * 代理(求购)信息表
 * 
 * @author 
 * @email 
 * @date 2018-09-10 17:54:11
 */
@Mapper
public interface AgentDemandDao extends BaseDao<AgentDemandEntity> {

    @PermissionAop
    AgentDemandEntity queryDetail(@Param("id") Long id);

    @PermissionAop
	List<AgentDemandEntity> pageList(Map<String, Object> map);

    @PermissionAop
	Integer pageCount(Map<String, Object> map);

    @PermissionAop
    void updateDel(@Param("id") Long id, @Param("userId")Long userId);
}
