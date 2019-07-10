package com.wzlue.chain.order.service.impl;

import com.wzlue.chain.common.enums.CreditType;
import com.wzlue.chain.common.exception.RRException;
import com.wzlue.chain.company.dao.ReceivingAddressDao;
import com.wzlue.chain.company.entity.MerchantCompanyEntity;
import com.wzlue.chain.company.entity.ReceivingAddressEntity;
import com.wzlue.chain.company.service.MerchantCompanyService;
import com.wzlue.chain.contract.dao.GoodsContractDao;
import com.wzlue.chain.contract.entity.GoodsContractEntity;
import com.wzlue.chain.contract.service.GoodsContractService;
import com.wzlue.chain.depot.dao.GoodsOrderDepotDao;
import com.wzlue.chain.depot.entity.GoodsOrderDepotEntity;
import com.wzlue.chain.depot.service.GoodsOrderDepotService;
import com.wzlue.chain.offer.dao.GoodsOfferDao;
import com.wzlue.chain.offer.entity.GoodsOfferCommodityEntity;
import com.wzlue.chain.offer.entity.GoodsOfferEntity;
import com.wzlue.chain.offer.service.GoodsOfferCommodityService;
import com.wzlue.chain.offer.service.GoodsOfferService;
import com.wzlue.chain.order.dao.GoodsOrderDao;
import com.wzlue.chain.order.entity.*;
import com.wzlue.chain.order.service.GoodsOrderCinfoService;
import com.wzlue.chain.order.service.GoodsOrderCommodityService;
import com.wzlue.chain.order.service.GoodsOrderDetailService;
import com.wzlue.chain.order.service.GoodsOrderService;
import com.wzlue.chain.sys.dao.ImageDao;
import com.wzlue.chain.sys.dao.SysDictDao;
import com.wzlue.chain.sys.dao.SysUserDao;
import com.wzlue.chain.sys.entity.ImageEntity;
import com.wzlue.chain.sys.entity.SysDictEntity;
import com.wzlue.chain.sys.entity.SysUserEntity;
import com.wzlue.chain.sys.service.SysNumberRuleService;
import net.sf.json.JSONSerializer;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author Administrator
 */
@Service("goodsOrderService")
public class GoodsOrderServiceImpl implements GoodsOrderService {
    @Autowired
    private GoodsOrderDao goodsOrderDao;
    @Autowired
    private GoodsContractService goodsContractService;
    @Autowired
    private GoodsContractDao goodsContractDao;
    @Autowired
    private GoodsOfferService goodsOfferService;
    @Autowired
    private GoodsOfferCommodityService goodsOfferCommodityService;
    @Autowired
    private SysNumberRuleService sysNumberRuleService;
    @Autowired
    private GoodsOrderDetailService goodsOrderDetailService;
    @Autowired
    private GoodsOrderCommodityService goodsOrderCommodityService;
    @Autowired
    private GoodsOrderCinfoService goodsOrderCinfoService;
    @Autowired
    private MerchantCompanyService merchantCompanyService;
    @Autowired
    private ImageDao imageDao;
    @Autowired
    private GoodsOrderDepotDao goodsOrderDepotDao;
    @Autowired
    private GoodsOrderDepotService goodsOrderDepotService;
    @Autowired
    private GoodsOfferDao goodsOfferDao;
    @Autowired
    private SysUserDao sysUserDao;
    @Autowired
    private ReceivingAddressDao receivingaddressDao;
    @Autowired
    private SysDictDao sysDictDao;

    @Override
    public List showList(Map<String, Object> map) {
        if (null != map.get("userId").toString()) {
            SysUserEntity sysUserEntity = sysUserDao.queryObject(Long.valueOf(map.get("userId").toString()));
            if (null != sysUserEntity) {
                map.put("companyId", sysUserEntity.getCompanyId());
            }
        }
        List<Map<String, Object>> list = goodsOrderDao.showList(map);
        return list;
    }

    @Override
    public GoodsOrderEntity queryObject(Long orderId) {
        GoodsOrderEntity goodsOrderEntity = goodsOrderDao.queryObject(orderId);
       /* Map<String, Object> params = new HashMap<>(16);
        Map<String, Object> files = new HashMap<>(16);
        params.put("code", goodsOrderEntity.getOrderId());
        params.put("type", "goods_order");
        params.put("picType", "customs");
        List<ImageEntity> imgs = imageDao.queryList(params);
        for (ImageEntity img : imgs) {
            files.put("file" + img.getSort(), img);
        }
        goodsOrderEntity.setFiles(files);*/
        return goodsOrderEntity;
    }

    @Override
    public List<GoodsOrderEntity> queryList(Map<String, Object> map) {
        //查询列表数据
        Object purchaserCompanyId = map.get("purchaserCompanyId");
        if (purchaserCompanyId != null && !"".equals(purchaserCompanyId.toString())) {
            map.put("purchaserCompanyId", getUser().getCompanyId());
        }
        Object sellerId = map.get("sellerId");
        if (sellerId != null && !"".equals(sellerId.toString())) {
            map.put("sellerId", getUser().getCompanyId());
        }
        return goodsOrderDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return goodsOrderDao.queryTotal(map);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void save(GoodsOrderEntity goodsOrder) {
        String number = sysNumberRuleService.getCodeNumber("number_order_goods");
        goodsOrder.setCreateBy(getUser().getUserId().toString());
        goodsOrder.setCompanyId(String.valueOf(getUser().getCompanyId()));
        goodsOrder.setCreateTime(new Date());
        MerchantCompanyEntity company = merchantCompanyService.getInfoByUser(getUser().getUserId());
        //设置购买者公司
        goodsOrder.setPurchaserCompanyId(getUser().getCompanyId().toString());
        goodsOrder.setPurchaserCompanyName(company.getCompanyName());
        goodsOrder.setOrderNumber(number);
        //设置如果是账期则修改为审核状态
        if ("agr".equals(goodsOrder.getOrderStatus())) {

        } else {
            if (Integer.parseInt(goodsOrder.getTransactionMode()) == 2) {
                goodsOrder.setOrderStatus("pre");
            } else {
                goodsOrder.setOrderStatus("tbc");
            }
        }
        //设置合同编号是否是自动生成
       /* String str = "系统自动生成";
        if (str.equals(goodsOrder.getAgreementId()) || "".equals(goodsOrder.getAgreementId()) || goodsOrder.getAgreementId() == null) {
            goodsOrder.setAgreementId(sysNumberRuleService.getCodeNumber("number_contract_goods"));
        }*/
        List<GoodsOrderDetailEntity> details = goodsOrder.getDetail();
     /*   for (GoodsOrderDetailEntity detail:details) {
            detail.setGoodsCurrency(goodsOrder.getCurrency());
        }*/
//        //运费
//        if (goodsOrder.getDistributionMode() == 0){     //商家安排
//            goodsOrder.setTransportationExpenses(new BigDecimal(500));
//        }if (goodsOrder.getDistributionMode()==1){      //自行安排
//            goodsOrder.setTransportationExpenses(BigDecimal.ZERO);
//        }
//            //订单总价
//            BigDecimal goodsTotal = new BigDecimal(0);
//        for (int i = 0; i < details.size(); i++) {
//            BigDecimal goodsTotalPrice = details.get(i).getGoodsTotalPrice();
//            Integer goodsCount = details.get(i).getGoodsCount();
//            if (goodsTotalPrice == null) {
//                goodsTotalPrice = BigDecimal.ZERO;
//            }
//            if (goodsCount == null) {
//                goodsCount = 0;
//            }
//            goodsTotal = goodsTotal.add(goodsTotalPrice.multiply(new BigDecimal(goodsCount)));
//        }
//        goodsOrder.setTotalPrice(goodsTotal);
//        goodsOrder.setActualPayment(goodsTotal.add(new BigDecimal(String.valueOf(goodsOrder.getTransportationExpenses()))));
        //是否拼柜
        boolean flag;
        flag = saveDetails(details, number);
        /*    goodsOrder.setGoodsCsc(flag == false ? 0 : 1);*/
        saveCInfo(goodsOrder.getCinfo(), number);
        goodsOrderDao.save(goodsOrder);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void appSave(GoodsOrderEntity goodsOrder) {
        String number = sysNumberRuleService.getCodeNumber("number_order_goods");
        goodsOrder.setCreateBy(getUser().getUserId().toString());
        goodsOrder.setCompanyId(String.valueOf(getUser().getCompanyId()));
        goodsOrder.setCreateTime(new Date());
        MerchantCompanyEntity company = merchantCompanyService.getInfoByUser(getUser().getUserId());
        //设置购买者公司
        goodsOrder.setPurchaserCompanyId(getUser().getCompanyId().toString());
        goodsOrder.setPurchaserCompanyName(company.getCompanyName());
        goodsOrder.setOrderNumber(number);
        //设置如果是账期则修改为审核状态
        if ("agr".equals(goodsOrder.getOrderStatus())) {

        } else {
            if (Integer.parseInt(goodsOrder.getTransactionMode()) == 2) {
                goodsOrder.setOrderStatus("pre");
            } else {
                goodsOrder.setOrderStatus("tbc");
            }
        }

    /*    //设置合同编号是否是自动生成
        String str = "系统自动生成";
        if (str.equals(goodsOrder.getAgreementId()) || "".equals(goodsOrder.getAgreementId()) || goodsOrder.getAgreementId() == null) {
            goodsOrder.setAgreementId(sysNumberRuleService.getCodeNumber("number_contract_goods"));
        }*/

        // 通过货物id集合获取 货物集合
        List<Map<String, Object>> detailIds = goodsOrder.getDetailIds();

        List<GoodsOrderDetailEntity> detailEntityList;

        if (null == detailIds && detailIds.size() == 0) return;

        detailEntityList = new ArrayList<>();
        // 设置货物
        for (Map<String, Object> idAndAmount : detailIds) {
            GoodsOfferEntity goodsOfferEntity = goodsOfferService.queryObject(Long.valueOf(idAndAmount.get("id") + ""));
            goodsOrder.setSellerId(goodsOfferEntity.getCompanyId().toString());
            MerchantCompanyEntity seller = merchantCompanyService.queryObject(goodsOfferEntity.getCompanyId());
            goodsOrder.setSellerName(seller.getCompanyName());
            goodsOrder.setOfferId(goodsOfferEntity.getId());
            goodsOrder.setTime(goodsOfferEntity.getTime());
            goodsOrder.setPlace(goodsOfferEntity.getPlace());
            goodsOrder.setPaymentTerm(goodsOfferEntity.getPaymentTerm());
            goodsOrder.setProductionDate(goodsOfferEntity.getProductionDate());
            goodsOrder.setShelfLife(goodsOfferEntity.getShelfLife());
            goodsOrder.setClause(goodsOfferEntity.getClause());
            goodsOrder.setTransactionManner(goodsOfferEntity.getTransactionManner());
            goodsOrder.setGoodsUnit(goodsOfferEntity.getGoodsUnit());
            if (Integer.valueOf(goodsOfferEntity.getPriceUnit()) == 1 || Integer.valueOf(goodsOfferEntity.getPriceUnit()) == 2) {
                goodsOrder.setCurrency(1);//元
            } else if (Integer.valueOf(goodsOfferEntity.getPriceUnit()) == 3 || Integer.valueOf(goodsOfferEntity.getPriceUnit()) == 4) {
                goodsOrder.setCurrency(2);//美元
            }

            List<GoodsOfferCommodityEntity> commoditys = goodsOfferEntity.getCommoditys();
            GoodsOrderDetailEntity entity = new GoodsOrderDetailEntity();

//            entity.setId(goodsOfferEntity.getId());
            entity.setOldGoodsNumber(goodsOfferEntity.getGoodsNumber());
            entity.setGoodsName(commoditys.get(0).getCommodityName());
            entity.setGoodsPrice(new BigDecimal(goodsOfferEntity.getGoodsPromotionPrice()));
            entity.setPriceUnit(goodsOfferEntity.getPriceUnit());
            entity.setGoodsCount(Integer.valueOf(commoditys.get(0).getCommodityCount()));
            entity.setGoodsUnit(commoditys.get(0).getCommodityUnit());
//            entity.setCommodityCountry(goodsOfferEntity.getCommodityCountry());
            SysDictEntity sysDictEntity = sysDictDao.queryCountryName(goodsOfferEntity.getCommodityCountry());
            entity.setCommodityCountry(sysDictEntity.getName());
            entity.setCommodityFactoryNumber(goodsOfferEntity.getCommodityFactoryNumber());
            entity.setCommodityPacking(goodsOfferEntity.getCommodityPacking());

         /*   entity.setGoodsUnit(goodsOfferEntity.getGoodsUnit());
            entity.setGoodsTotalPrice(new BigDecimal(goodsOfferEntity.getGoodsPromotionPrice()));
//            entity.setGoodsNumber(goodsOfferEntity.getGoodsNumber());       //....
            String numberGoods = sysNumberRuleService.getCodeNumber("number_goods_number");
            entity.setGoodsNumber(numberGoods);
            entity.setGoodsType(goodsOfferEntity.getGoodsType());
            entity.setGoodsCount(Integer.valueOf(idAndAmount.get("count") + ""));*/
//            entity.setOldGoodsNumber(idAndAmount.get("oldGoodsNumber") + "");
           /* entity.setOldGoodsNumber(goodsOfferEntity.getGoodsNumber());
            entity.setGoodsCsc(goodsOfferEntity.getGoodsCsc());
            entity.setGoodsCurrency(goodsOfferEntity.getCurrency());    //币种
            List<ImageEntity> images = goodsOfferEntity.getImages();
            if (null != images && images.size() > 0)
                entity.setGoodsImageUrl(images.get(0).getPicUrl());

            List<GoodsOrderCommodityEntity> goodsOrderCommodityEntityList = new ArrayList<>();

            List<GoodsOfferCommodityEntity> commoditys = goodsOfferEntity.getCommoditys();

            // 设置货物商品列表
            for (GoodsOfferCommodityEntity cc : commoditys) {
                GoodsOrderCommodityEntity co = new GoodsOrderCommodityEntity();
                co.setId(cc.getId());
                co.setGoodsOfferId(cc.getGoodsOfferId());
                co.setCommodityId(cc.getCommodityId());
                co.setCommodityNumber(cc.getCommodityNumber());
                co.setCommodityUnit(cc.getCommodityUnit());
                co.setCommodityPrice(cc.getCommodityPrice());
                co.setCommodityCount(cc.getCommodityCount());
                co.setCommodityFactoryNumber(cc.getCommodityFactoryNumber());
                co.setCommodityCountry(cc.getCommodityCountry());
                co.setCommodityCountryName(cc.getCommodityCountryName());
                co.setCommodityPacking(cc.getCommodityPacking());
                co.setCommodityName(cc.getCommodityName());
                co.setCommodityFactoryNumber(cc.getCommodityFactoryNumber());
                goodsOrderCommodityEntityList.add(co);
            }

            entity.setCommoditys(goodsOrderCommodityEntityList);
*/
            detailEntityList.add(entity);
        }

        goodsOrder.setDetail(detailEntityList);
        List<GoodsOrderDetailEntity> details = goodsOrder.getDetail();
        //订单总价
        BigDecimal goodsTotal = new BigDecimal(0); //运费
        for (int i = 0; i < details.size(); i++) {
//            goodsTotal = goodsTotal.add(details.get(i).getGoodsTotalPrice().multiply(new BigDecimal(details.get(i).getGoodsCount())));
            if (Integer.valueOf(goodsOrder.getGoodsUnit()) == 1) {//柜
                goodsTotal = new BigDecimal(goodsOrder.getOrderCount().toString()).multiply(details.get(i).getGoodsPrice())
                        .multiply(new BigDecimal(details.get(i).getGoodsCount().toString()));
            } else if (Integer.valueOf(goodsOrder.getGoodsUnit()) == 2 || Integer.valueOf(goodsOrder.getGoodsUnit()) == 3) {//吨 千克
                goodsTotal = new BigDecimal(goodsOrder.getOrderCount().toString()).multiply(details.get(i).getGoodsPrice());
            }
        }
        goodsOrder.setTotalPrice(goodsTotal);
        goodsOrder.setActualPayment(goodsTotal);
        //        goodsOrder.setActualPayment(goodsTotal.add(new BigDecimal(String.valueOf(goodsOrder.getTransportationExpenses()))));
        //是否拼柜
        boolean flag;
        flag = saveDetails(details, number);
        /*    goodsOrder.setGoodsCsc(flag == false ? 0 : 1);*/
        saveCInfo(goodsOrder.getCinfo(), number);
        goodsOrderDao.save(goodsOrder);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void update(GoodsOrderEntity goodsOrder) {
        goodsOrder.setModifyBy(getUser().getUserId().toString());
        goodsOrder.setModifyTime(new Date());
        List<GoodsOrderDetailEntity> details = goodsOrder.getDetail();
        String number = goodsOrder.getOrderNumber();
        //是否拼柜
        boolean flag = false;
        if (details != null && details.size() > 0) {
            flag = saveDetails(details, goodsOrder.getOrderNumber());
        }

        /*  goodsOrder.setGoodsCsc(flag == false ? 0 : 1);*/
        if (goodsOrder.getCinfo() != null) {
            saveCInfo(goodsOrder.getCinfo(), number);
        }

        GoodsOrderEntity originalInfo = goodsOrderDao.queryObject(goodsOrder.getOrderId());
//        if (goodsOrder.getTotalPrice() != null) {
//          if ((goodsOrder.getTotalPrice()).equals(originalInfo.getTotalPrice())) {
//
//            }
        if (goodsOrder.getActualPayment() != null) {
            if ((goodsOrder.getActualPayment()).equals(originalInfo.getActualPayment())) {

            } else {
                //更新实付款
                GoodsOrderEntity actualPrice = new GoodsOrderEntity();
                actualPrice.setOrderId(goodsOrder.getOrderId());
//                actualPrice.setActualPayment(goodsOrder.getTotalPrice().add(goodsOrder.getTransportationExpenses()));
                actualPrice.setActualPayment(goodsOrder.getActualPayment());
                goodsOrderDao.updateActualPay(actualPrice);
//                goodsOrder.setActualPayment(goodsOrder.getTotalPrice().add(goodsOrder.getTransportationExpenses()));
                if (originalInfo.getSellerId() == getUser().getCompanyId().toString()) {
                    //改价记录，商品总价和运费
                    OrderPriceVersionEntity priceVersion = new OrderPriceVersionEntity();
                    priceVersion.setOrderNumber(goodsOrder.getOrderNumber());
//                    priceVersion.setOriginalTotalPrice(originalInfo.getTotalPrice());
//                    priceVersion.setLaterTotalPrice(goodsOrder.getTotalPrice());
//                    priceVersion.setOriginalCarriage(originalInfo.getTransportationExpenses());
//                    priceVersion.setLaterCarriage(goodsOrder.getTransportationExpenses());
                    priceVersion.setOriginalTotalPrice(originalInfo.getActualPayment());
                    priceVersion.setLaterTotalPrice(goodsOrder.getActualPayment());
                    goodsOrderDao.savePriceVersion(priceVersion);
                }
            }
        }
        goodsOrderDao.update(goodsOrder);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateStatus(GoodsOrderEntity goodsOrder) throws RRException {
        goodsOrderDao.update(goodsOrder);
        GoodsOrderEntity goodsOrderEntity = goodsOrderDao.queryObject(goodsOrder.getOrderId());
        if (goodsOrder.getOrderCount()==null){
            goodsOrder.setOrderCount(goodsOrderEntity.getOrderCount());
        }
        if (StringUtils.isBlank(goodsOrder.getOfferId())){
            goodsOrder.setOfferId(goodsOrderEntity.getOfferId());
        }
        //订单取消，扣减信用分
        if ("ctom".equals(goodsOrder.getOrderStatus()) || "ctob".equals(goodsOrder.getOrderStatus()) || "cto".equals(goodsOrder.getOrderStatus())) {
            MerchantCompanyEntity companyEntity = merchantCompanyService.queryByUserId(getUser().getUserId());
            merchantCompanyService.updateCreditType(CreditType.ORDEREND, companyEntity);
            if ("cto".equals(goodsOrder.getOrderStatus())) {
                //订单取消---库存+ 历史交易数量-
               /* for (int i = 0; i < goodsOrder.getDetail().size(); i++) {
                    Integer goodsCount = goodsOrder.getDetail().get(i).getGoodsCount(); //购买数量
                    GoodsOfferEntity goodsOffer = goodsOfferService.queryOfferByNumber(goodsOrder.getDetail().get(i).getOldGoodsNumber());
                    if (goodsCount > goodsOffer.getGoodsTransactionCount()) {
//                        return;
                    } else {
                        goodsOffer.setStock(goodsOffer.getStock() + goodsCount);
                        goodsOffer.setGoodsTransactionCount(goodsOffer.getGoodsTransactionCount() - goodsCount);
                    }
                    goodsOfferDao.update(goodsOffer);
                }*/
                if (goodsOrder.getCancelFlag() != null && goodsOrder.getCancelFlag() == 1) {//接单前取消标志

                } else {
                    Integer orderCount = goodsOrder.getOrderCount();
                    GoodsOfferEntity goodsOffer = goodsOfferService.queryObject(Long.valueOf(goodsOrder.getOfferId()));
                    goodsOffer.setStock(goodsOffer.getStock() + orderCount);
                    goodsOffer.setGoodsTransactionCount(goodsOffer.getGoodsTransactionCount() - orderCount);
                    goodsOfferDao.update(goodsOffer);
                }
            }
        } else {
            if (null != goodsOrder.getDepot()) {
                goodsOrderDepotService.save(goodsOrder.getDepot());
            }

           /* if (("tbd".equals(goodsOrder.getOrderStatus()) || "tbpu".equals(goodsOrder.getOrderStatus())) && goodsOrder.getOrderStatus() != null) {
                //查询应付款
                GoodsOrderEntity goodsInfo = goodsOrderDao.getPayInfo(goodsOrder);
                BigDecimal totalPay = goodsInfo.getTotalPrice().add(goodsInfo.getTransportationExpenses());
                goodsOrder.setActualPayment(totalPay);
                //更新订单实付款
                goodsOrderDao.updatePayTotal(goodsOrder);
                //计算仓储费
                if ("tbd".equals(goodsOrder.getOrderStatus()) || "tbpu".equals(goodsOrder.getOrderStatus())) {
                    //查询仓储开始时间
                    GoodsOrderDepotEntity goodsOrderDepot = new GoodsOrderDepotEntity();
                    goodsOrderDepot = goodsOrderDepotDao.getCreateTimeByOrder(goodsOrder);
                    SimpleDateFormat simple = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    //时间差
                    int differ = 0;
                    try {
                        differ = countDiffer(simple.format(goodsOrderDepot.getCreateTime()));
                    } catch (Exception e) {
                        e.printStackTrace();
                    }

                    //获取数量
                    BigDecimal goodsNum = new BigDecimal(0);
                    List<GoodsOrderDetailEntity> detail = goodsOrder.getDetail();
                    for (GoodsOrderDetailEntity goodsDetail : detail) {
                        List<GoodsOrderCommodityEntity> commoditysList = goodsDetail.getCommoditys();
                        for (GoodsOrderCommodityEntity commoditys : commoditysList) {
                            goodsNum = goodsNum.add(new BigDecimal(commoditys.getCommodityCount()));
                        }
                    }
                    //处理全部单位，默认为吨，后续需更改
                    BigDecimal storagePrice = goodsNum.multiply(new BigDecimal(differ));
                    goodsOrderDepot.setMoney1(storagePrice.toString());
                    //保存最新的仓储订单价格
                    goodsOrderDepotService.save(goodsOrderDepot);
                }
            }*/
        }
        String tbp = "tbp";
        if (goodsOrder.getStatusCount() != null && tbp.equals(goodsOrder.getOrderStatus())) {
           /* for (int i = 0; i < goodsOrder.getDetail().size(); i++) {
                Integer goodsCount = goodsOrder.getDetail().get(i).getGoodsCount(); //购买数量
                GoodsOfferEntity goodsOffer = goodsOfferService.queryOfferByNumber(goodsOrder.getDetail().get(i).getOldGoodsNumber());
                //购买数量与库存比较
                if (goodsCount > goodsOffer.getStock()) {    //购买数量 大于 库存 --- 拒绝接单
                    throw new RRException("库存不足");
                } else { //接单---库存- 历史交易数量+
                    goodsOffer.setStock(goodsOffer.getStock() - goodsCount);
                    goodsOffer.setGoodsTransactionCount(goodsOffer.getGoodsTransactionCount() + goodsCount);
                }
                goodsOfferDao.update(goodsOffer);
            }*/
            Integer orderCount = goodsOrder.getOrderCount();
            GoodsOfferEntity goodsOffer = goodsOfferService.queryObject(Long.valueOf(goodsOrder.getOfferId()));
            if (orderCount > goodsOffer.getStock()) {
                throw new RRException("库存不足");
            } else {
                goodsOffer.setStock(goodsOffer.getStock() - orderCount);
                goodsOffer.setGoodsTransactionCount(goodsOffer.getGoodsTransactionCount() + orderCount);
                goodsOfferDao.update(goodsOffer);
            }
            //保存合同
            saveContract(goodsOrder);
        }
        //订单完成，加信用分
        if (goodsOrder.getStatusCount() != null && "tc".equals(goodsOrder.getOrderStatus())) {
            //买家
            MerchantCompanyEntity companyEntity = merchantCompanyService.queryByUserId(getUser().getUserId());
            merchantCompanyService.updateCreditType(CreditType.COMPLETEORDER, companyEntity);
            Integer id = Integer.parseInt(goodsOrder.getSellerId());
            //卖家
            MerchantCompanyEntity companyEntity2 = merchantCompanyService.queryObject(id);
            merchantCompanyService.updateCreditType(CreditType.COMPLETEORDER, companyEntity2);
            //设置订单合同到期日期
            goodsContractDao.setExpireDateByOrderId(goodsOrder.getOrderId());
        }

    }

    @Override
    public void delete(Long orderId) {
        goodsOrderDao.delete(orderId);
    }

    @Override
    public void deleteBatch(Long[] orderIds) {
        goodsOrderDao.deleteBatchBuy(orderIds);
    }

    @Override
    public void deleteBatchSell(Long[] orderIds) {
        goodsOrderDao.deleteBatchSell(orderIds);
    }

    @Override
    public List<MerchantCompanyEntity> getAccreditCompany() {
        return goodsOrderDao.getAccreditCompany();
    }

    @Override
    public List<SysUserEntity> getCompanyStaff(Long companyId) {
        return goodsOrderDao.getCompanyStaff(companyId);
    }

    @Override
    public Map<String, Object> getAccredit(String orderNumber) {
        return goodsOrderDao.getAccredit(orderNumber);
    }

    @Override
    public List<OrderPriceVersionEntity> getPriceVersion(GoodsOrderEntity goodsOrder) {
        return goodsOrderDao.getPriceVersion(goodsOrder);
    }

    @Override
    public List<GoodsOrderEntity> queryAllList(Map<String, Object> param) {
        return goodsOrderDao.queryAllList(param);
    }

    @Override
    public GoodsOrderEntity queryObjectByOrderNumber(String orderNumber) {
        return goodsOrderDao.getListByOrderNumber(orderNumber);
    }

    @Override
    public GoodsOrderEntity getListByOrderNumber(String orderNumber) {
        return goodsOrderDao.getListByOrderNumber(orderNumber);
    }

    /**
     * 获取报盘公司集合
     *
     * @param params
     * @return
     */
    @Override
    public List<MerchantCompanyEntity> getMerchants(Map<String, Object> params) {
        List<MerchantCompanyEntity> companys;
        params.put("serviceName", "货物");
        params.put("userCompanyId", getUser().getCompanyId());
        companys = goodsOrderDao.getMerchants(params);
        return companys;
    }

    @Override
    public boolean getReviewStatus() {
        SysUserEntity user = getUser();
        if (user.getCompanyId() == null && user.getDepartmentId() == null && user.getTypeId() == null) {
            return true;
        }
        return false;
    }

    @Override
    public List<GoodsOrderEntity> searchStatus(Long[] orderIds) {
        return goodsOrderDao.searchStatus(orderIds);
    }

    @Override
    public int getAgentInfo(String orderNumber) {
        return goodsOrderDao.getAgentInfo(orderNumber);
    }

    @Override
    public void saveAgentOrder(GoodsOrderEntity goodsOrder) {
        String number = sysNumberRuleService.getCodeNumber("number_order_goods");
        goodsOrder.setCreateBy(getUser().getUserId().toString());
        goodsOrder.setCreateTime(new Date());
        MerchantCompanyEntity company = merchantCompanyService.getInfoByUser(getUser().getUserId());
        //设置购买者公司
        goodsOrder.setPurchaserCompanyId(getUser().getCompanyId().toString());
        goodsOrder.setPurchaserCompanyName(company.getCompanyName());
        goodsOrder.setOrderNumber(number);
        goodsOrderDao.saveAgentOrder(goodsOrder);
    }

    /**
     * 保存货物信息
     *
     * @param details     订单中的货物
     * @param orderNumber 订单编号
     * @return 是否是拼柜
     */
    private boolean saveDetails(List<GoodsOrderDetailEntity> details, String orderNumber) {
//        List<GoodsOrderCommodityEntity> commoditySave = new ArrayList<>();
        boolean flag = false;
        if (details != null) {
            for (GoodsOrderDetailEntity detail : details) {
                String numberGoods = sysNumberRuleService.getCodeNumber("number_goods_number");
                detail.setOrderId(orderNumber);
                detail.setGoodsNumber(numberGoods);
              /*  if (detail.getGoodsType() == 0) {
                    if (detail.getGoodsCsc() != null && detail.getGoodsCsc() == 1) {
                        flag = true;
                    }
                }
                List<GoodsOrderCommodityEntity> commoditys = detail.getCommoditys();
                if (commoditys != null) {
                    for (GoodsOrderCommodityEntity commodity : commoditys) {
                        String numberCommodity = sysNumberRuleService.getCodeNumber("number_goods_commodity");
                        commodity.setCommodityNumber(numberCommodity);
                        commodity.setGoodsOfferId(detail.getGoodsNumber());
                        commodity.setGoodsOrderNumber(orderNumber);
                    }
                    commoditySave.addAll(commoditys);
                }*/
            }
        }
       /* goodsOrderCommodityService.deleteByOrderId(orderNumber);
        if (commoditySave.size() > 0) {
            goodsOrderCommodityService.saveBatch(commoditySave);
        }*/
        goodsOrderDetailService.deleteByOrderId(orderNumber);
        goodsOrderDetailService.saveBatch(details);
        return flag;
    }

    /**
     * 保存合同信息
     *
     * @param goodsOrder 订单对象
     */
    private void saveContract(GoodsOrderEntity goodsOrder) {
        GoodsContractEntity goodsContract = new GoodsContractEntity();
        goodsContract.setOrderNumber(goodsOrder.getOrderNumber());
        goodsContract.setCreateBy(getUser().getUserId().intValue());
        goodsContract.setCreateTime(new Date());
        goodsContract.setContractName("货物交易");
        goodsContract.setAutomatic(1);
        goodsContract.setPartyAId(goodsOrder.getSellerId());
        goodsContract.setPartyAName(goodsOrder.getSellerName());
        goodsContract.setPartyBName(goodsOrder.getPurchaserCompanyName());
        goodsContract.setPartyBId(goodsOrder.getPurchaserCompanyId());
        goodsContract.setPaymentMethod(Integer.parseInt(goodsOrder.getTransactionMode()));
        goodsContract.setContractAmount(goodsOrder.getActualPayment().doubleValue());
        goodsContract.setContractNumber(goodsOrder.getAgreementId());
        goodsContractService.deleteByOrderId(goodsOrder.getOrderNumber());
        goodsContract.setOwner(goodsOrder.getSellerId());
        goodsContractService.saveAutomaticContract(goodsContract);
        goodsContract.setOwner(goodsOrder.getPurchaserCompanyId());
        goodsContract.setCreateBy(Integer.parseInt(goodsOrder.getCreateBy()));
        goodsContractService.saveAutomaticContract(goodsContract);
    }

    /**
     * 保存收货人信息
     *
     * @param cInfo  订单中的收货人对象
     * @param number 订单编号
     */
    private void saveCInfo(GoodsOrderCinfoEntity cInfo, String number) {
        cInfo.setOrderId(number);
        goodsOrderCinfoService.deleteByOrderId(number);
        goodsOrderCinfoService.save(cInfo);
    }

    /**
     * 获取登录用户信息
     *
     * @return
     */
    private SysUserEntity getUser() {
        return (SysUserEntity) SecurityUtils.getSubject().getPrincipal();
    }

    //时间差
    private int countDiffer(String afterTime) throws ParseException {
        int differCount = 0;
        Calendar c = Calendar.getInstance();
        Date afterDate = new SimpleDateFormat("yy-MM-dd HH:mm:ss").parse(afterTime);
        c.setTime(afterDate);
        int afterDay = c.get(Calendar.DATE);
        c.set(Calendar.DATE, afterDay + 1);
        c.set(Calendar.HOUR_OF_DAY, 0);
        c.set(Calendar.MINUTE, 0);
        c.set(Calendar.SECOND, 0);
        //取下一天零点
        String dayAfter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                .format(c.getTime());
        SimpleDateFormat simple = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String nowTime = simple.format(new Date());

        Integer differ = dayAfter.compareTo(nowTime);
        if (differ > 0) {
            return differCount;
        } else {
            Date date = simple.parse(dayAfter);
            long l = new Date().getTime() - date.getTime();       //获取时间差
            long day = l / (24 * 60 * 60 * 1000);
            return (int) day + 1;
        }

    }

    @Override
    public List<Map<String, Object>> showGoodsTypeNumber(Map<String, Object> map) {
        if (null != map.get("userId").toString()) {
            SysUserEntity sysUserEntity = sysUserDao.queryObject(Long.valueOf(map.get("userId").toString()));
            if (null != sysUserEntity) {
                map.put("companyId", sysUserEntity.getCompanyId());
            }
        }
        List<Map<String, Object>> list = goodsOrderDao.showGoodsTypeNumber(map);

        return list;
    }

    @Override
    public GoodsOrderEntity queryByAgentOrderNo(String agentOrderNo) {
        return goodsOrderDao.queryByAgentOrderNo(agentOrderNo);
    }
}
