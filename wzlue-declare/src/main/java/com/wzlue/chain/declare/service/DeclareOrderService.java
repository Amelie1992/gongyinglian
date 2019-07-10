package com.wzlue.chain.declare.service;



import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.declare.entity.DeclareOrderEntity;
import com.wzlue.chain.company.entity.MerchantCompanyEntity;

import java.util.List;
import java.util.Map;

/**
 * 报关订单
 * 
 * @author 
 * @email 
 * @date 2018-08-20 17:24:10
 */
public interface DeclareOrderService {
	
	DeclareOrderEntity queryObject(Integer id);
	
	List<DeclareOrderEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(DeclareOrderEntity declareOrder);
	
	void update(DeclareOrderEntity declareOrder);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);

    void updateOrderState(Map<String, Object> map);

    List<MerchantCompanyEntity> getCompanys(Long companyId);

    List showList(Map<String, Object> map);

    List<DeclareOrderEntity> queryList1(Query query);

    DeclareOrderEntity queryByOrderNumber(String orderNumber);

    void updatePrice(DeclareOrderEntity declareOrder);
}
