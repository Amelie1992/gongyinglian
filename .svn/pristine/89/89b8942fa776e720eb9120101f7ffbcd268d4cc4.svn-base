package com.wzlue.chain.agent.dao;

import com.wzlue.chain.agent.entity.AgentOfferEntity;
import com.wzlue.chain.common.annotation.PermissionAop;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * 代理报盘信息表
 * 
 * @author 
 * @email 
 * @date 2018-08-22 10:22:52
 */
@Mapper
public interface AgentOfferDao extends BaseDao<AgentOfferEntity> {

    @PermissionAop
    List<AgentOfferEntity> pageList(Map<String, Object> map);

    @PermissionAop
    Integer pageCount(Map<String, Object> map);

    @PermissionAop
    AgentOfferEntity queryInfo(@Param("id") Long id);

    @PermissionAop
    void updateDel(AgentOfferEntity agent);

    void shelf(@Param("id") Long id);

    void obtained(@Param("id") Long id);

    List<AgentOfferEntity> getListByCompanyId(@Param("id") Long id);

    void shelfOrobtained(List<AgentOfferEntity> agentOfferEntities);

    void updatedAll(@Param("agentOfferList") List<AgentOfferEntity> agentOfferEntities, @Param("status") int status);

    void updateNumber(AgentOfferEntity agentOffer);
}
