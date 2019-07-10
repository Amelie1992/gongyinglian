package com.wzlue.chain.logistics.dao;

import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.company.entity.MerchantCompanyEntity;
import com.wzlue.chain.logistics.entity.LogisticsOrderEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * 物流订单
 * 
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-08-29 19:25:49
 */
@Mapper
public interface LogisticsOrderDao extends BaseDao<LogisticsOrderEntity> {

    LogisticsOrderEntity queryByOrderNumber(String orderNumber);

    List<MerchantCompanyEntity> getCompanys(Long companyId);

    List<Map> showList(Map<String, Object> map);

    List<LogisticsOrderEntity> queryListByNumberCode(Map<String, Object> map);

    void updatePrice(LogisticsOrderEntity logisticsOrder);

    List<Map<String,Object>> queryListByNumberCodeAndNumberType(Map<String, Object> map);
}
