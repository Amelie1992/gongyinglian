package com.wzlue.chain.agent.service;


import com.wzlue.chain.agent.entity.AgentOfferEntity;
import com.wzlue.chain.agent.entity.AgentOrderEntity;
import com.wzlue.chain.common.exception.RRException;
import com.wzlue.chain.sys.entity.SysUserEntity;

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
public interface AgentOrderService {
	
	AgentOrderEntity queryObject(Long id);
	
	List<AgentOrderEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(AgentOrderEntity agentOrder);
	
	void update(AgentOrderEntity agentOrder)throws RRException;

	void accept(AgentOrderEntity agentOrder)throws RRException;

	void delete(Long id);
	
	void deleteBatch(Long[] ids);

	List<AgentOrderEntity> pageList(Map<String, Object> map);

	int pageCount(Map<String, Object> map);

	/**
	 * 首页展示数据查询 代理订单成交统计
	 * queryBy: year season month week days
	 *
	 * */
	List showList(Map<String, Object> map);

	Map getListByOrderNumber(String orderNum, String orderType, Long userId);

	AgentOrderEntity queryInfo(Long id);

	void updateDel(Long userId, Long id, Integer flag);

    void changePrice(Map<String, Object> map);

    void setAgentAuthorize(Map<String, Object> map);

    List<String> getAgentAuthorize(SysUserEntity user);

    AgentOrderEntity queryByOrderNumber(String orderNumber);

    boolean cancelAgentAuthorize(Map<String, Object> map);
}
