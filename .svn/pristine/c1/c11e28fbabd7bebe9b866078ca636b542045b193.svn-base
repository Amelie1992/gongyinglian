package com.wzlue.chain.order.dao;

import com.wzlue.chain.company.entity.MerchantCompanyEntity;
import com.wzlue.chain.order.entity.GoodsOrderEntity;
import com.wzlue.chain.common.base.BaseDao;
import com.wzlue.chain.order.entity.OrderPriceVersionEntity;
import com.wzlue.chain.sys.entity.SysUserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * 货物订单表
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-15 19:47:29
 */
@Mapper
public interface GoodsOrderDao extends BaseDao<GoodsOrderEntity> {

    List<Map<String,Object>> showList(Map<String, Object> map);

    GoodsOrderEntity getListByOrderNumber(@Param("value") String orderNumber);

    GoodsOrderEntity queryObjectByCompanyIdOrOrderNumber(Map<String,Object> params);

    List<MerchantCompanyEntity> getMerchants(Map<String, Object> params);

    List<GoodsOrderEntity> searchStatus(Long[] orderIds);

    GoodsOrderEntity getPayInfo(GoodsOrderEntity goodsOrder);

    void updatePayTotal(GoodsOrderEntity goodsOrder);

    int getAgentInfo(String orderNumber);

    void saveAgentOrder(GoodsOrderEntity goodsOrder);

    void deleteBatchBuy(Long[] orderIds);

    void deleteBatchSell(Long[] orderIds);

    List<MerchantCompanyEntity> getAccreditCompany();

    List<SysUserEntity> getCompanyStaff(Long companyId);

    Map<String, Object> getAccredit(String orderNumber);

    void savePriceVersion(OrderPriceVersionEntity priceVersion);

    List<OrderPriceVersionEntity> getPriceVersion(GoodsOrderEntity goodsOrder);

    List<GoodsOrderEntity> queryAllList(Map<String,Object> param);

    void updateActualPay(GoodsOrderEntity actualPrice);

    List<Map<String, Object>> showGoodsTypeNumber(Map<String, Object> map);

    GoodsOrderEntity queryByAgentOrderNo(String agentOrderNo);     //agentOrderNo代理订单编号
}
