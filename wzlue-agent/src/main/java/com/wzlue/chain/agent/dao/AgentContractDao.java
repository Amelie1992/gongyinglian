package com.wzlue.chain.agent.dao;

import com.wzlue.chain.agent.entity.AgentContractEntity;
import com.wzlue.chain.common.annotation.PermissionAop;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * 代理(订单)合同信息表
 * 
 * @author 
 * @email 
 * @date 2018-09-05 14:48:43
 */
@Mapper
public interface AgentContractDao extends BaseDao<AgentContractEntity> {
	void deleteByOrderNumber(@Param("orderNumber") String orderNumber);
	@PermissionAop
	List<AgentContractEntity> pageList(Map<String, Object> map);
	@PermissionAop
	Integer pageCount(Map<String,Object> map);

	AgentContractEntity queryInfo(@Param("id") Long id);

	List<AgentContractEntity> queryByContractNumber(String contractNumber);

    void setExpireDateByOrderNumber(String orderNumber);
}
