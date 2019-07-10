package com.wzlue.chain.storage.service;

import com.wzlue.chain.company.entity.MerchantCompanyEntity;
import com.wzlue.chain.declare.entity.DeclareOrderEntity;
import com.wzlue.chain.storage.entity.OrderEntity;

import java.util.List;
import java.util.Map;

/**
 * 仓储订单
 * 
 * @author 
 * @email 
 * @date 2018-08-29 17:48:31
 */
public interface OrderService {
	
	OrderEntity queryObject(Long id);
	
	List<OrderEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(OrderEntity order);
	
	void update(OrderEntity order);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);

    void arrival(OrderEntity order);

	List<MerchantCompanyEntity> getCompanys(Long companyId);

    void updateOrder(OrderEntity order);

    void receipt(OrderEntity order);

    String getBuyCompany(String companyId);

    OrderEntity queryByOrderNumber(String orderNumber);

	List showList(Map<String, Object> map);
}
