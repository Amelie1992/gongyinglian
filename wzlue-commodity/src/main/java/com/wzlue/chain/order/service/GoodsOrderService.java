package com.wzlue.chain.order.service;

import com.wzlue.chain.company.entity.MerchantCompanyEntity;
import com.wzlue.chain.order.entity.GoodsOrderEntity;
import com.wzlue.chain.order.entity.OrderPriceVersionEntity;
import com.wzlue.chain.sys.entity.SysUserEntity;

import java.util.List;
import java.util.Map;

/**
 * 货物订单表
 *
 * @author hjw
 * @email love@und.win
 * @date 2018-08-15 19:47:29
 */
public interface GoodsOrderService {
    /**
     * 首页展示数据查询 代理订单成交统计
     * queryBy: year season month week days
     *
     * */
    List showList(Map<String, Object> map);

	GoodsOrderEntity queryObject(Long orderId);

	List<GoodsOrderEntity> queryList(Map<String, Object> map);

	int queryTotal(Map<String, Object> map);

	void save(GoodsOrderEntity goodsOrder);

	void update(GoodsOrderEntity goodsOrder);

	void updateStatus(GoodsOrderEntity goodsOrder);

	void delete(Long orderId);

	void deleteBatch(Long[] orderIds);

    GoodsOrderEntity getListByOrderNumber(String orderNumber);

    List<MerchantCompanyEntity> getMerchants(Map<String, Object> params);

    boolean getReviewStatus();

	List<GoodsOrderEntity> searchStatus(Long[] orderIds);

	int getAgentInfo(String orderNumber);

	void saveAgentOrder(GoodsOrderEntity goodsOrder);

	void deleteBatchSell(Long[] orderIds);

    List<MerchantCompanyEntity> getAccreditCompany();

    List<SysUserEntity> getCompanyStaff(Long companyId);

	Map<String, Object> getAccredit(String orderNumber);

	List<OrderPriceVersionEntity> getPriceVersion(GoodsOrderEntity goodsOrder);

	List<GoodsOrderEntity> queryAllList(Map<String,Object> param);

    GoodsOrderEntity queryObjectByOrderNumber(String orderNumber);

    List<Map<String, Object>> showGoodsTypeNumber(Map<String, Object> map);

	void appSave(GoodsOrderEntity goodsOrder);

	GoodsOrderEntity queryByAgentOrderNo(String agentOrderNo);
}
