package com.wzlue.chain.agent.dao;

import com.wzlue.chain.agent.entity.AgentOrderEntity;
import com.wzlue.chain.common.base.BaseDao;
import com.wzlue.chain.sys.entity.SysUserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 代理(订单)表
 * 
 * @author 
 * @email 
 * @date 2018-08-30 15:40:41
 */
@Mapper
public interface AgentOrderDao extends BaseDao<AgentOrderEntity> {

    List<Map<String,Object>> showList(Map<String, Object> map);

    List<AgentOrderEntity> pageList(Map<String, Object> map);

    int pageCount(Map<String,Object> map);

    AgentOrderEntity queryInfo(@Param("id") Long id);

    void updateDel(@Param("delFlag") Integer delFlag,@Param("userId") Long userId,@Param("orderStatus") Integer orderStatus,
                   @Param("date") Date date, @Param("id") Long id);

    AgentOrderEntity queryByOrderNum(@Param("orderNumber") String orderNumber);

    List<AgentOrderEntity> queryListByNumberCode(Map<String, Object> map);

    void changePrice(Map<String, Object> map);

    void setAgentAuthorize(Map<String, Object> map);

    List<String> getAgentAuthorize(SysUserEntity user);

    List<Map<String,Object>> queryListByNumberCodeAndNumberType(Map<String, Object> map);

    boolean cancelAgentAuthorize(Map<String, Object> map);

    Map<String,Object> queryByOrderNumAndBack(String agentOrderNumber);
}
