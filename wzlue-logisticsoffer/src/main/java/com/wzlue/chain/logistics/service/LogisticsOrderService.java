package com.wzlue.chain.logistics.service;

import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.company.entity.MerchantCompanyEntity;
import com.wzlue.chain.logistics.entity.LogisticsOrderEntity;

import java.util.List;
import java.util.Map;

/**
 * 物流订单
 * 
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-08-29 19:25:49
 */
public interface LogisticsOrderService {
	
	LogisticsOrderEntity queryObject(Long id);
	
	List<LogisticsOrderEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(LogisticsOrderEntity logisticsOrder);
	
	void update(LogisticsOrderEntity logisticsOrder);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);

	List<MerchantCompanyEntity> getCompanys(Long companyId);

	/**
	 * 首页展示数据查询 物流订单成交统计
	 * queryBy: year season month week days
	 *
	 * */
    List<Map> showList(Map<String, Object> map);

	List<LogisticsOrderEntity> queryList2(Query query);

    void receipt(LogisticsOrderEntity logisticsOrder);

    void updatePrice(LogisticsOrderEntity logisticsOrder);

	LogisticsOrderEntity queryByOrderNumber(String orderNumber);
}
