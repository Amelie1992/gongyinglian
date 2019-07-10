package com.wzlue.chain.web.controller.sys;

import cn.hutool.core.util.ReUtil;
import com.wzlue.chain.agent.entity.AgentDemandEntity;
import com.wzlue.chain.agent.entity.AgentOfferEntity;
import com.wzlue.chain.agent.service.AgentDemandService;
import com.wzlue.chain.agent.service.AgentOfferService;
import com.wzlue.chain.chatMsg.service.ChatMessageService;
import com.wzlue.chain.common.annotation.SysLog;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
import com.wzlue.chain.common.validator.ValidatorUtils;
import com.wzlue.chain.common.validator.group.AddGroup;
import com.wzlue.chain.company.entity.CompanyTypeEntity;
import com.wzlue.chain.company.entity.MerchantCompanyEntity;
import com.wzlue.chain.company.entity.ServiceTypeEntity;
import com.wzlue.chain.company.service.CompanyTypeService;
import com.wzlue.chain.company.service.MerchantCompanyService;
import com.wzlue.chain.company.service.ServiceTypeService;
import com.wzlue.chain.declare.entity.DeclareDemandEntity;
import com.wzlue.chain.declare.entity.DeclareOfferEntity;
import com.wzlue.chain.declare.entity.DeclareOrderEntity;
import com.wzlue.chain.declare.service.DeclareDemandService;
import com.wzlue.chain.declare.service.DeclareOfferService;
import com.wzlue.chain.declare.service.DeclareOrderService;
import com.wzlue.chain.goods.entity.ItemCategoryEntity;
import com.wzlue.chain.goods.entity.ItemOriginPlaceEntity;
import com.wzlue.chain.goods.service.ItemCategoryService;
import com.wzlue.chain.goods.service.RecommendGoodsService;
import com.wzlue.chain.logistics.entity.LogisticsDemandEntity;
import com.wzlue.chain.logistics.entity.LogisticsOfferAddressEntity;
import com.wzlue.chain.logistics.entity.LogisticsOfferEntity;
import com.wzlue.chain.logistics.entity.LogisticsOrderEntity;
import com.wzlue.chain.logistics.service.LogisticsDemandService;
import com.wzlue.chain.logistics.service.LogisticsOfferAddressService;
import com.wzlue.chain.logistics.service.LogisticsOfferService;
import com.wzlue.chain.logistics.service.LogisticsOrderService;
import com.wzlue.chain.marketing.entity.*;
import com.wzlue.chain.marketing.service.*;
import com.wzlue.chain.offer.entity.GoodsBuyingEntity;
import com.wzlue.chain.offer.entity.GoodsOfferCommodityEntity;
import com.wzlue.chain.offer.entity.GoodsOfferEntity;
import com.wzlue.chain.offer.service.GoodsBuyingService;
import com.wzlue.chain.offer.service.GoodsOfferService;
import com.wzlue.chain.order.entity.GoodsOrderEntity;
import com.wzlue.chain.order.service.GoodsOrderService;
import com.wzlue.chain.storage.entity.DemandEntity;
import com.wzlue.chain.storage.entity.OfferEntity;
import com.wzlue.chain.storage.service.DemandService;
import com.wzlue.chain.storage.service.OfferService;
import com.wzlue.chain.sys.MSdx.ApiDemo4Java;
import com.wzlue.chain.sys.entity.*;
import com.wzlue.chain.sys.service.*;
import com.wzlue.chain.web.controller.wechat.MyWebSocket;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.*;

import static com.wzlue.chain.common.utils.EscapeUtil.unescape;


/**
 * 前台查询接口，不需要token
 */
@RestController
@RequestMapping("/appSearch/query")
@Api(value = "前台查询数据")
public class appSearchListController extends AbstractController {

    @Autowired
    private GoodsOfferService goodsOfferService;

    @Autowired
    private SysNoticeService sysNoticeService;

    @Autowired
    private GoodsBuyingService goodsBuyingService;

    @Autowired
    private LogisticsOfferService logisticsOfferService;

    @Autowired
    private LogisticsOfferAddressService logisticsOfferAddressService;

    @Autowired
    private LogisticsDemandService logisticsDemandService;

    @Autowired
    private OfferService offerService;

    @Autowired
    private DemandService demandService;

    @Autowired
    private DeclareOfferService declareOfferService;

    @Autowired
    private DeclareDemandService declareDemandService;

    @Autowired
    private ExchangeRateService exchangeRateService;

    @Autowired
    private ItemCategoryService itemCategoryService;

    @Autowired
    private RecommendGoodsService recommendGoodsService;

    @Autowired
    private MarketAuctionService marketAuctionService;

    @Autowired
    private MarketAuctionCommodityService marketAuctionCommodityService;

    @Autowired
    private MarketTenderService marketTenderService;
    @Autowired
    private SysProvincesService sysProvincesService;

    @Autowired
    private SysCitiesService sysCitiesService;

    @Autowired
    private SysUserService sysUserService;

    @Autowired
    private ChatMessageService chatMessageService;

    @Autowired
    private AgentDemandService agentDemandService;

    @Autowired
    private AgentOfferService agentOfferService;

    @Autowired
    private MarketBidRecordService marketBidRecordService;

    @Autowired
    private MarketTenderRecordService marketTenderRecordService;

    @Autowired
    private MerchantCompanyService merchantCompanyService;
    @Autowired
    private SysAreasService sysAreasService;
    @Autowired
    private CompanyTypeService companyTypeService;
    @Autowired
    private SysUserRoleService sysUserRoleService;
    @Autowired
    private ServiceTypeService serviceTypeService;
    @Autowired
    private GoodsOrderService goodsOrderService;
    @Autowired
    private LogisticsOrderService logisticsOrderService;
    @Autowired
    private DeclareOrderService declareOrderService;
    @Autowired
    private SysDictService dictService;


    /**
     * 报关下单
     */
    @PostMapping("/saveDeclare")
    @ApiOperation(value = "报关新增下单")
    public R save(@RequestBody DeclareOrderEntity declareOrder) {
        Long createBy = declareOrder.getCreateBy();
        SysUserEntity sysUserEntity = sysUserService.queryObject(createBy);
        if (sysUserEntity == null) {
            return R.error("请重新登录");
        }
        declareOrder.setCompanyId(Math.toIntExact(sysUserEntity.getCompanyId()));//根据当前登录人获取所属公司id
        declareOrder.setCreateBy(createBy);
        declareOrder.setCreateTime(new Date());
        declareOrderService.save(declareOrder);
        try {
            MyWebSocket socket = new MyWebSocket();
            socket.sendMessage(declareOrder.getBuyCompanyName() + " " +
                    (declareOrder.getGoods().get(0).getCommodityName()) + "商品 成交时间：" +
                    declareOrder.getCreateTime(), "zuixinchengjiao");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return R.ok();
    }

    /**
     * 物流下单
     */
    @PostMapping("/save")
    @ApiOperation(value = "物流新增下单")
    public R save(@RequestBody LogisticsOrderEntity logisticsOrder) {
        Long createBy = logisticsOrder.getCreateBy();
        SysUserEntity sysUserEntity = sysUserService.queryObject(createBy);
        if (sysUserEntity == null) {
            return R.error("请重新登录");
        }
        logisticsOrder.setCompanyId(sysUserEntity.getCompanyId());//根据当前登录人获取所属公司id
        logisticsOrder.setCreateBy(createBy);
        logisticsOrder.setCreatedTime(new Date());
        logisticsOrderService.save(logisticsOrder);

        return R.ok();
    }

    /**
     * 新闻列表
     */
    @GetMapping("/noticeList")
    @ApiOperation(value = "新闻列表接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", dataType = "int", value = "页码", paramType = "query", defaultValue = "1"),
            @ApiImplicitParam(name = "limit", dataType = "int", value = "一页几条", paramType = "query", defaultValue = "10"),
            @ApiImplicitParam(name = "noticeType", dataType = "int", value = "类别", paramType = "query"),
            @ApiImplicitParam(name = "positionName", dataType = "String", value = "位置", paramType = "query")
    })
    public R noticeList(@ApiIgnore @RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);

        List<SysNoticeEntity> sysNoticeList = sysNoticeService.queryList(query);
        int total = sysNoticeService.queryTotal(query);

        return R.page(sysNoticeList, total);
    }

    /**
     * 货物报盘列表
     */
    @GetMapping("/goodsOfferList")
    @ApiOperation(value = "报盘/期货,现货列表接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "app", dataType = "int", value = "前台特殊参数", paramType = "query", defaultValue = "1"),
            @ApiImplicitParam(name = "companyId", dataType = "string", value = "公司id", paramType = "query"),
            @ApiImplicitParam(name = "goodsType", dataType = "int", value = "期货0现货1", paramType = "query"),
//            @ApiImplicitParam(name = "goodsCsc", dataType = "int", value = "可否拼柜（0：不可拼1：可拼）", paramType = "query"),
//            @ApiImplicitParam(name = "currency", dataType = "int", value = "币种 1：人民币；2：美元）", paramType = "query"),
            @ApiImplicitParam(name = "page", dataType = "int", value = "页码", paramType = "query", defaultValue = "1"),
            @ApiImplicitParam(name = "limit", dataType = "int", value = "一页几条", paramType = "query", defaultValue = "10"),
            @ApiImplicitParam(name = "name", dataType = "string", value = "报盘名称", paramType = "query"),
            @ApiImplicitParam(name = "priceSort", dataType = "string", value = "价格排序(desc倒序asc正序)", paramType = "query"),
            @ApiImplicitParam(name = "timeSort", dataType = "string", value = "时间排序（desc倒序asc正序）", paramType = "query"),
            @ApiImplicitParam(name = "placeCode", dataType = "string", value = "产地编码", paramType = "query"),
            @ApiImplicitParam(name = "placeName", dataType = "string", value = "产地编码", paramType = "query"),
            @ApiImplicitParam(name = "categoryId", dataType = "string", value = "分类id", paramType = "query"),
            @ApiImplicitParam(name = "overallSearch", dataType = "string", value = "模糊搜索（商品名，产地，厂号）", paramType = "query")
    })
    public R goodsOfferList(@ApiIgnore @RequestParam Map<String, Object> params) {

        //查上架的
        params.put("goodsState", 1);

        //产地
        if (params.get("placeCode") != null) {
            String[] arr = params.get("placeCode").toString().split(","); // 用,分割
            params.put("placeList", arr);
        }
        // 洲
        if (StringUtils.isNotBlank((String) params.get("placeName"))) {
            String[] arr = params.get("placeName").toString().split(","); // 用,分割
            params.put("placeNames", arr);
        }
        //分类
        if (params.get("categoryId") != null) {
            String[] arr = params.get("categoryId").toString().split(","); // 用,分割
            params.put("categoryIdList", arr);
        }
        //根据产地分类获取报盘id
        List<String> offerId = goodsOfferService.getOfferId(params);
        String[] strArray = offerId.toArray(new String[offerId.size()]);
        if (offerId.size() == 0) {
            params.put("offerId", null);
        } else {
            params.put("offerId", strArray);
        }
        List<GoodsOfferEntity> goodsOfferList;
        int total;
        if (strArray.length < 1) {
            goodsOfferList = null;
            total = 0;
        } else {
            //查询列表数据
            Query query = new Query(params);

            //过滤掉过期的报盘
            query.put("expire",1);

            goodsOfferList = goodsOfferService.queryList(query);
            for (GoodsOfferEntity goodsOffer : goodsOfferList) {
                List<GoodsOfferCommodityEntity> commoditys = goodsOffer.getCommoditys();
                String place = "";
                String category = "";
                for (GoodsOfferCommodityEntity gc : commoditys) {
                    place += gc.getCommodityCountryName() + ",";
                    category += gc.getCategoryName() + ",";
                }
//                goodsOffer.setCommodityCountry(place.substring(0, place.length() - 1));
                goodsOffer.setCategoryName(category.substring(0, category.length() - 1));
            }
            total = goodsOfferService.queryTotal(query);
        }

        return R.page(goodsOfferList, total);
    }

    /**
     * 货物报盘详情接口
     */
    @GetMapping("/goodsOfferInfo")
    @ApiOperation(value = "报盘/期货,现货详情接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", dataType = "int", value = "货物报盘id", paramType = "query")
    })
    public R goodsOfferInfo(@ApiIgnore @RequestParam Long id) {
        GoodsOfferEntity goodsOffer = goodsOfferService.queryObject(id);
        if (goodsOffer != null) {
            goodsOffer.setGoodsDescribe(unescape(goodsOffer.getGoodsDescribe()));
        }
        return R.page(goodsOffer, 1);
    }

    /**
     * 求购期货现货列表
     */
    @GetMapping("/askBuyGoodslist")
    @ApiOperation(value = "求购/期货,现货列表接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", dataType = "int", value = "页码", paramType = "query", defaultValue = "1"),
            @ApiImplicitParam(name = "limit", dataType = "int", value = "一页几条", paramType = "query", defaultValue = "10"),
            @ApiImplicitParam(name = "buyingType", dataType = "int", value = "期货0现货1", paramType = "query"),
            @ApiImplicitParam(name = "priceSort", dataType = "string", value = "价格排序(desc倒序asc正序)", paramType = "query"),
            @ApiImplicitParam(name = "timeSort", dataType = "string", value = "时间排序（desc倒序asc正序）", paramType = "query"),
            @ApiImplicitParam(name = "commodityName", dataType = "string", value = "商品名称", paramType = "query"),
            @ApiImplicitParam(name = "categoryId", dataType = "string", value = "分类id", paramType = "query"),
            @ApiImplicitParam(name = "placeName", dataType = "string", value = "产地名", paramType = "query"),
            @ApiImplicitParam(name = "companyId", dataType = "string", value = "公司id", paramType = "query")

    })
    public R askBuyGoodslist(@ApiIgnore @RequestParam Map<String, Object> params) {
//        //查上架的
//        params.put("buyingStatus",1);     //buyingStatus这个字段没有使用

        //产地
        if (params.get("placeName") != null) {
            String[] arr = params.get("placeName").toString().split(","); // 用,分割
            params.put("placeList", arr);
        }
        //分类
        if (params.get("categoryId") != null) {
            String[] arr = params.get("categoryId").toString().split(","); // 用,分割
            params.put("categoryIdList", arr);
        }

        //查询列表数据
        Query query = new Query(params);

        List<GoodsBuyingEntity> goodsBuyingList = goodsBuyingService.queryList(query);
        int total = goodsBuyingService.queryTotal(query);

        return R.page(goodsBuyingList, total);
    }

    /**
     * 求购期货现货详情
     */
    @GetMapping("/askBuyGoodsInfo")
    @ApiOperation(value = "求购期货现货详情接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", dataType = "int", value = "求购期货现货id", paramType = "query")
    })
    public R askBuyGoodsInfo(@ApiIgnore @RequestParam Long id) {
        GoodsBuyingEntity goodsBuying = goodsBuyingService.queryObject(id);
        if (goodsBuying != null) {
            goodsBuying.setGoodsDescribe(unescape(goodsBuying.getGoodsDescribe()));
        }
        return R.page(goodsBuying, 1);
    }

    /**
     * 物流报盘
     */
    @GetMapping("/logisticsOfferList")
    @ApiOperation(value = "物流报盘列表接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", dataType = "int", value = "页码", paramType = "query", defaultValue = "1"),
            @ApiImplicitParam(name = "limit", dataType = "int", value = "一页几条", paramType = "query", defaultValue = "10"),
            @ApiImplicitParam(name = "type", dataType = "int", value = "0国内1国际", paramType = "query"),
            @ApiImplicitParam(name = "categoryId", dataType = "int", value = "0船舶1车辆2航空3火车", paramType = "query"),
            @ApiImplicitParam(name = "province", dataType = "int", value = "始发地", paramType = "query"),
            @ApiImplicitParam(name = "provinceEnd", dataType = "int", value = "目的地", paramType = "query"),
            @ApiImplicitParam(name = "city", dataType = "int", value = "始发地市", paramType = "query"),
            @ApiImplicitParam(name = "cityEnd", dataType = "int", value = "目的地市", paramType = "query")
    })
    public R logisticsOfferList(@ApiIgnore @RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        //查上架
        query.put("status", "0");
        List<LogisticsOfferEntity> logisticsOfferList = logisticsOfferService.queryList1(query);
        for (LogisticsOfferEntity offerEntity : logisticsOfferList) {
            List<LogisticsOfferAddressEntity> logisticsOfferAddressList = logisticsOfferAddressService.queryByLogisticsId(Math.toIntExact(offerEntity.getId()));
            for (LogisticsOfferAddressEntity offerAddressEntity : logisticsOfferAddressList) {
                if (offerEntity.getType() == 1) {
                    offerAddressEntity.setProvinceName(offerAddressEntity.getProvince());
                    offerAddressEntity.setProvinceEndName(offerAddressEntity.getProvinceEnd());
                    offerAddressEntity.setCityName(offerAddressEntity.getCity());
                    offerAddressEntity.setCityEndName(offerAddressEntity.getCity());
                    offerEntity.setLogisticsOfferAddressList(logisticsOfferAddressList);//最终放到List中
                }
            }
            if (offerEntity.getType() == 0) {
                offerEntity.setTypeName("国内物流");
            } else {
                offerEntity.setTypeName("国际物流");
            }
            if (offerEntity.getCategoryId() == 0) {
                offerEntity.setCategoryName("船舶");
            } else if (offerEntity.getCategoryId() == 1) {
                offerEntity.setCategoryName("车辆");
            } else if (offerEntity.getCategoryId() == 2) {
                offerEntity.setCategoryName("航空");
            } else if (offerEntity.getCategoryId() == 3) {
                offerEntity.setCategoryName("火车");
            }
            if (offerEntity.getUnit() == 0) {
                offerEntity.setUnitName("元/m³");
            } else if (offerEntity.getUnit() == 1) {
                offerEntity.setUnitName("美元/m³");
            } else if (offerEntity.getUnit() == 2) {
                offerEntity.setUnitName("元/柜");
            } else if (offerEntity.getUnit() == 3) {
                offerEntity.setUnitName("元/车");
            } else if (offerEntity.getUnit() == 4) {
                offerEntity.setUnitName("美元/票");
            }
        }
        int total = logisticsOfferService.queryTotal(query);

        return R.page(logisticsOfferList, total);
    }

    /**
     * 物流报盘详情
     */
    @GetMapping("/logisticsOfferInfo")
    @ApiOperation(value = "物流报盘详情接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", dataType = "int", value = "物流报盘id", paramType = "query")
    })
    public R logisticsOfferInfo(@ApiIgnore @RequestParam Long id) {
        LogisticsOfferEntity logisticsOffer = logisticsOfferService.queryObject(id);
        if (logisticsOffer == null) {
            return R.ok();
        }
        MerchantCompanyEntity companyEntity = merchantCompanyService.queryObject2(logisticsOffer.getCompanyId());
        List<LogisticsOfferAddressEntity> logisticsOfferAddressList = logisticsOfferAddressService.queryByLogisticsId(Math.toIntExact(logisticsOffer.getId()));
        for (LogisticsOfferAddressEntity addressEntity : logisticsOfferAddressList) {//获取线路
            if (addressEntity != null) {
                if (logisticsOffer.getType() == 0) {
                    SysCitiesEntity sysCitiesEntity = sysCitiesService.queryBycityId(addressEntity.getCity());
                    SysCitiesEntity sysCitiesEntity1 = sysCitiesService.queryBycityId(addressEntity.getCityEnd());
                    SysProvincesEntity sysProvincesEntity = sysProvincesService.queryByprovinceId(addressEntity.getProvince());
                    SysProvincesEntity sysProvincesEntity1 = sysProvincesService.queryByprovinceId(addressEntity.getProvinceEnd());
                    addressEntity.setProvinceName(sysProvincesEntity.getProvince());
                    addressEntity.setProvinceEndName(sysProvincesEntity1.getProvince());
                    addressEntity.setCityName(sysCitiesEntity.getCity());
                    addressEntity.setCityEndName(sysCitiesEntity1.getCity());
                } else {
                    addressEntity.setCityEndName(addressEntity.getCityEnd());
                    addressEntity.setCityName(addressEntity.getCity());
                    addressEntity.setProvinceName(addressEntity.getProvince());
                    addressEntity.setProvinceEndName(addressEntity.getProvinceEnd());
                }
            }
            logisticsOffer.setLogisticsOfferAddressList(logisticsOfferAddressList);
        }
        if (logisticsOffer.getUnit() == 0) {
            logisticsOffer.setUnitName("元/m³");
        } else if (logisticsOffer.getUnit() == 1) {
            logisticsOffer.setUnitName("美元/m³");
        }
//        else if (logisticsOffer.getUnit() == 2) {
//            logisticsOffer.setUnitName("元/kg");
//        } else if (logisticsOffer.getUnit() == 3) {
//            logisticsOffer.setUnitName("美元/kg");
//        }
        logisticsOffer.setBusinessIntroduction(unescape(logisticsOffer.getBusinessIntroduction()));
        Map<String, Object> map = new HashMap<>(16);
        map.put("logisticsOffer", logisticsOffer);
        map.put("companyEntity", companyEntity);
//        map.put("logisticsOfferAddressList", logisticsOfferAddressList);
        return R.ok(map);
    }

    /**
     * 求购物流列表
     */
    @GetMapping("/logisticsDemandList")
    @ApiOperation(value = "物流求购列表接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", dataType = "int", value = "页码", paramType = "query", defaultValue = "1"),
            @ApiImplicitParam(name = "limit", dataType = "int", value = "一页几条", paramType = "query", defaultValue = "10"),
            @ApiImplicitParam(name = "type", dataType = "int", value = "0国内1国际", paramType = "query"),
            @ApiImplicitParam(name = "categoryId", dataType = "int", value = "0船舶1车辆2航空3火车", paramType = "query"),
            @ApiImplicitParam(name = "provinceStart", dataType = "String", value = "出发地省", paramType = "query"),
            @ApiImplicitParam(name = "provinceEnd", dataType = "String", value = "目的地省", paramType = "query"),
            @ApiImplicitParam(name = "cityStart", dataType = "String", value = "出发地市", paramType = "query"),
            @ApiImplicitParam(name = "cityEnd", dataType = "String", value = "目的地市", paramType = "query"),
            @ApiImplicitParam(name = "title", dataType = "String", value = "标题名称", paramType = "query")
    })
    public R logisticsDemandList(@ApiIgnore @RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);

        List<LogisticsDemandEntity> logisticsDemandList = logisticsDemandService.queryList(query);
        for (LogisticsDemandEntity demandEntity : logisticsDemandList) {
            if (demandEntity.getType() == 0) {
                demandEntity.setTypeName("国内物流");
                SysCitiesEntity sysCitiesEntity = sysCitiesService.queryBycityId(demandEntity.getCityStart());
                SysCitiesEntity sysCitiesEntity1 = sysCitiesService.queryBycityId(demandEntity.getCityEnd());
                SysProvincesEntity sysProvincesEntity = sysProvincesService.queryByprovinceId(demandEntity.getProvinceStart());
                SysProvincesEntity sysProvincesEntity1 = sysProvincesService.queryByprovinceId(demandEntity.getProvinceEnd());
                demandEntity.setCityStartName(sysCitiesEntity.getCity());
                demandEntity.setCityEndName(sysCitiesEntity1.getCity());
                demandEntity.setProvinceStartName(sysProvincesEntity.getProvince());
                demandEntity.setProvinceEndName(sysProvincesEntity1.getProvince());
            } else {
                demandEntity.setTypeName("国际物流");
                demandEntity.setCityStartName(demandEntity.getCityStart());
                demandEntity.setCityEndName(demandEntity.getCityEnd());
                demandEntity.setProvinceStartName(demandEntity.getProvinceStart());
                demandEntity.setProvinceEndName(demandEntity.getProvinceEnd());
            }
            if (demandEntity.getCategoryId() == 0) {
                demandEntity.setCategoryName("船舶");
            } else if (demandEntity.getCategoryId() == 1) {
                demandEntity.setCategoryName("车辆");
            } else if (demandEntity.getCategoryId() == 2) {
                demandEntity.setCategoryName("航空");
            } else if (demandEntity.getCategoryId() == 3) {
                demandEntity.setCategoryName("火车");
            }
            if (demandEntity.getUnit() == null) {
                demandEntity.setUnitName("吨");
            } else {
                switch (demandEntity.getUnit().intValue()) {
                    case 0:
                        demandEntity.setUnitName("吨");
                        break;
                    case 1:
                        demandEntity.setUnitName("千克");
                        break;
                    case 2:
                        demandEntity.setUnitName("柜");
                        break;
                    default:
                        demandEntity.setUnitName("吨");
                        break;
                }
            }
        }
        int total = logisticsDemandService.queryTotal(query);

        return R.page(logisticsDemandList, total);
    }

    /**
     * 求购物流详情
     */
    @GetMapping("/logisticsDemandInfo")
    @ApiOperation(value = "物流求购详情接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", dataType = "int", value = "求购物流id", paramType = "query")
    })
    public R logisticsDemandInfo(@ApiIgnore @RequestParam Long id) {
        LogisticsDemandEntity logisticsDemand = logisticsDemandService.queryObject(id);
        if (logisticsDemand == null) {
            return R.ok();
        }
        MerchantCompanyEntity companyEntity = merchantCompanyService.queryObject2(logisticsDemand.getCompanyId());
        Map<String, Object> map = new HashMap<>(16);
        //0国内1国际
        if (logisticsDemand.getType() == 0) {
            logisticsDemand.setTypeName("国内物流");
            SysCitiesEntity sysCitiesEntity = sysCitiesService.queryBycityId(logisticsDemand.getCityStart());
            SysCitiesEntity sysCitiesEntity1 = sysCitiesService.queryBycityId(logisticsDemand.getCityEnd());
            SysProvincesEntity sysProvincesEntity = sysProvincesService.queryByprovinceId(logisticsDemand.getProvinceStart());
            SysProvincesEntity sysProvincesEntity1 = sysProvincesService.queryByprovinceId(logisticsDemand.getProvinceEnd());
            logisticsDemand.setCityStartName(sysCitiesEntity.getCity());
            logisticsDemand.setCityEndName(sysCitiesEntity1.getCity());
            logisticsDemand.setProvinceStartName(sysProvincesEntity.getProvince());
            logisticsDemand.setProvinceEndName(sysProvincesEntity1.getProvince());
        } else {
            logisticsDemand.setTypeName("国际物流");
            logisticsDemand.setCityStartName(logisticsDemand.getCityStart());
            logisticsDemand.setCityEndName(logisticsDemand.getCityEnd());
            logisticsDemand.setProvinceStartName(logisticsDemand.getProvinceStart());
            logisticsDemand.setProvinceEndName(logisticsDemand.getProvinceEnd());
        }
        logisticsDemand.setDescribe(unescape(logisticsDemand.getDescribe()));
        map.put("logisticsDemand", logisticsDemand);
        map.put("companyEntity", companyEntity);
        return R.ok(map);
    }

    /**
     * 仓储报盘列表
     *
     * @param params
     * @return
     */
    @GetMapping("/storageList")
    @ApiOperation(value = "仓储报盘列表接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", dataType = "int", value = "页码", paramType = "query", defaultValue = "1"),
            @ApiImplicitParam(name = "limit", dataType = "int", value = "一页几条", paramType = "query", defaultValue = "10"),
            @ApiImplicitParam(name = "province", dataType = "string", value = "省（编码）", paramType = "query"),
            @ApiImplicitParam(name = "city", dataType = "string", value = "市（编码）", paramType = "query"),
            @ApiImplicitParam(name = "companyName", dataType = "string", value = "公司名称", paramType = "query"),
            @ApiImplicitParam(name = "title", dataType = "string", value = "标题", paramType = "query")
    })
    public R storageList(@ApiIgnore @RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        //查上架状态的数据
        query.put("status", '0');
        List<OfferEntity> offerList = offerService.queryList(query);
        int total = offerService.queryTotal(query);

        return R.page(offerList, total);
    }

    @GetMapping("/offerList1")
    @ApiOperation(value = "仓库名称查询报盘接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", dataType = "int", value = "页码", paramType = "query", defaultValue = "1"),
            @ApiImplicitParam(name = "limit", dataType = "int", value = "一页几条", paramType = "query", defaultValue = "10"),
            @ApiImplicitParam(name = "companyName", dataType = "string", value = "公司名称", paramType = "query"),
//            @ApiImplicitParam(name = "storageName", dataType = "string", value = "仓库名称", paramType = "query")
    })
    public R offerList1(@ApiIgnore @RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);

        List<OfferEntity> offerList = offerService.queryList(query);
        int total = offerService.queryTotal(query);

        return R.page(offerList, total);
    }

    @GetMapping("/offerList2")
    @ApiOperation(value = "仓库地址查询报盘接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", dataType = "int", value = "页码", paramType = "query", defaultValue = "1"),
            @ApiImplicitParam(name = "limit", dataType = "int", value = "一页几条", paramType = "query", defaultValue = "10"),
            @ApiImplicitParam(name = "cityName", dataType = "string", value = "城市", paramType = "query"),
    })
    public R offerList2(@ApiIgnore @RequestParam Map<String, Object> params) {
        String city = (String) params.get("cityName");
        String cityId = sysCitiesService.queryCityId(city);
        params.put("city", cityId);
        //查询列表数据
        Query query = new Query(params);

        List<OfferEntity> offerList = offerService.queryList(query);
        int total = offerService.queryTotal(query);

        return R.page(offerList, total);
    }

    /**
     * 仓储报盘信息
     */
    @GetMapping("/storageInfo")
    @ApiOperation(value = "仓储报盘详情接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", dataType = "int", value = "仓储报盘id", paramType = "query")
    })
    public R storageInfo(@ApiIgnore @RequestParam Long id) {
        OfferEntity offer = offerService.queryObject(id);
        HashMap<String, Object> map = new HashMap<>();
        if (offer != null) {
            offer.setBusinessIntroduction(unescape(offer.getBusinessIntroduction()));
            MerchantCompanyEntity company = merchantCompanyService.queryObject(offer.getMerchantId().intValue());
            map.put("company", company);
        }
        map.put("offer", offer);
        return R.ok(map);
    }

    /**
     * 仓储求购列表
     */
    @GetMapping("/storageDemandList")
    @ApiOperation(value = "仓储求购列表接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", dataType = "int", value = "页码", paramType = "query", defaultValue = "1"),
            @ApiImplicitParam(name = "limit", dataType = "int", value = "一页几条", paramType = "query", defaultValue = "10"),
            @ApiImplicitParam(name = "province", dataType = "string", value = "省（编码）", paramType = "query"),
            @ApiImplicitParam(name = "city", dataType = "string", value = "市（编码）", paramType = "query"),
            @ApiImplicitParam(name = "companyName", dataType = "string", value = "公司名称", paramType = "query"),
            @ApiImplicitParam(name = "title", dataType = "string", value = "标题", paramType = "query")
    })
    public R storageDemandList(@ApiIgnore @RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        //查显示状态的数据
//        query.put("status", 0);
        List<DemandEntity> demandList = demandService.queryList(query);
        int total = demandService.queryTotal(query);

        return R.page(demandList, total);
    }

    @GetMapping("/demandList1")
    @ApiOperation(value = "仓库名称查询求购接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", dataType = "int", value = "页码", paramType = "query", defaultValue = "1"),
            @ApiImplicitParam(name = "limit", dataType = "int", value = "一页几条", paramType = "query", defaultValue = "10"),
            @ApiImplicitParam(name = "storageName", dataType = "string", value = "仓库名称", paramType = "query")
    })
    public R demandList1(@ApiIgnore @RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);

        List<DemandEntity> demandList = demandService.queryList(query);
        int total = demandService.queryTotal(query);

        return R.page(demandList, total);
    }

    @GetMapping("/demandList2")
    @ApiOperation(value = "仓库地址查询求购接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", dataType = "int", value = "页码", paramType = "query", defaultValue = "1"),
            @ApiImplicitParam(name = "limit", dataType = "int", value = "一页几条", paramType = "query", defaultValue = "10"),
            @ApiImplicitParam(name = "cityName", dataType = "string", value = "城市名称", paramType = "query"),
    })
    public R demandList2(@ApiIgnore @RequestParam Map<String, Object> params) {
        String city = (String) params.get("cityName");
        String cityId = sysCitiesService.queryCityId(city);
        params.put("city", cityId);
        //查询列表数据
        Query query = new Query(params);

        List<DemandEntity> demandList = demandService.queryList(query);
        int total = demandService.queryTotal(query);

        return R.page(demandList, total);
    }

    /**
     * 仓储求购详情
     */
    @GetMapping("/storageDemandInfo")
    @ApiOperation(value = "仓储求购详情接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", dataType = "int", value = "仓储求购id", paramType = "query")
    })
    public R storageDemandInfo(@ApiIgnore @RequestParam Long id) {
        DemandEntity demand = demandService.queryObject(id);
        if (demand != null) {
            demand.setStorageInfo(unescape(demand.getStorageInfo()));
        }
//        if(demand.getProvince().isEmpty()){//省为空就给空值(目前仅对省进行验证)
//            demand.setProvinceName("");
//        }else {
//            SysProvincesEntity provincesEntity = sysProvincesService.queryByprovinceId(demand.getProvince());
//            demand.setProvinceName(provincesEntity.getProvince());
//        }
//        SysCitiesEntity sysCitiesEntity = sysCitiesService.queryBycityId(String.valueOf(Integer.parseInt(demand.getCity())));
//        SysAreasEntity areasEntity = sysAreasService.queryBycityId(demand.getCounty());
//        demand.setCityName(sysCitiesEntity.getCity());
//        demand.setCountyName(areasEntity.getArea());
        return R.page(demand, 1);
    }

    /**
     * 报关报盘列表
     */
    @GetMapping("/declareOfferList")
    @ApiOperation(value = "报关报盘列表接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", dataType = "int", value = "页码", paramType = "query", defaultValue = "1"),
            @ApiImplicitParam(name = "limit", dataType = "int", value = "一页几条", paramType = "query", defaultValue = "10"),
            @ApiImplicitParam(name = "app", dataType = "int", value = "前台特殊参数", paramType = "query", defaultValue = "1"),
            @ApiImplicitParam(name = "title", dataType = "string", value = "报关报盘标题", paramType = "query"),
            @ApiImplicitParam(name = "declareType", dataType = "int", value = "报关分类 1：进口报关 2：出口报关", paramType = "query")
    })
    public R declareOfferList(@ApiIgnore @RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        //查上架
        query.put("groundingState", "0");

        List<DeclareOfferEntity> declareOfferList = declareOfferService.queryList(query);
        for (DeclareOfferEntity declareOfferEntity : declareOfferList) {
            if (declareOfferEntity.getDeclareType() == 1) {
                declareOfferEntity.setDeclareTypeName("进口报关");
            } else {
                declareOfferEntity.setDeclareTypeName("出口报关");
            }
        }
        int total = declareOfferService.queryTotal(query);

        return R.page(declareOfferList, total);
    }

    /**
     * 报关报盘详情
     */
    @GetMapping("/declareOfferInfo")
    @ApiOperation(value = "报关报盘详情接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", dataType = "int", value = "报关报盘id", paramType = "query")
    })
    public R declareOfferInfo(@ApiIgnore @RequestParam Integer id) {
        DeclareOfferEntity declareOffer = declareOfferService.queryObject(id);
        Map<String, Object> map = new HashMap<>(16);
        if (declareOffer != null) {
            declareOffer.setBusinessInfo(unescape(declareOffer.getBusinessInfo()));
            MerchantCompanyEntity companyEntity = merchantCompanyService.queryObject2(declareOffer.getCompanyId());
            map.put("companyEntity", companyEntity);
        }
        map.put("declareOffer", declareOffer);
        return R.ok(map);
    }

    /**
     * 报关求购列表
     */
    @GetMapping("/declareDemandList")
    @ApiOperation(value = "报关求购列表接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", dataType = "int", value = "页码", paramType = "query", defaultValue = "1"),
            @ApiImplicitParam(name = "limit", dataType = "int", value = "一页几条", paramType = "query", defaultValue = "10"),
            @ApiImplicitParam(name = "type", dataType = "string", value = "报关分类", paramType = "query"),
            @ApiImplicitParam(name = "name", dataType = "string", value = "标题名称", paramType = "query")
    })
    public R declareDemandList(@ApiIgnore @RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);

        List<DeclareDemandEntity> declareDemandList = declareDemandService.queryList(query);
        for (DeclareDemandEntity declareDemandEntity : declareDemandList) {
            if (declareDemandEntity.getType() == 1) {
                declareDemandEntity.setTypeName("进口报关");
            } else {
                declareDemandEntity.setTypeName("出口报关");
            }
        }
        int total = declareDemandService.queryTotal(query);

        return R.page(declareDemandList, total);
    }

    /**
     * 报关求购详情
     */
    @GetMapping("/declareDemandInfo")
    @ApiOperation(value = "报关求购详情接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", dataType = "int", value = "报关求购id", paramType = "query")
    })
    public R declareDemandInfo(@ApiIgnore @RequestParam Integer id) {
        DeclareDemandEntity declareDemand = declareDemandService.queryObject(id);
        Map<String, Object> map = new HashMap<>(16);
        if (declareDemand != null) {
            declareDemand.setDeclareInfo(unescape(declareDemand.getDeclareInfo()));
            MerchantCompanyEntity companyEntity = merchantCompanyService.queryObject2(declareDemand.getCompanyId());
            map.put("companyEntity", companyEntity);
        }
        map.put("declareDemand", declareDemand);
        return R.ok(map);
    }

    /**
     * 根据货币名获取货币的汇率
     */
    @GetMapping(value = "/getPriceRate")
    @ApiOperation(value = "获取汇率接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "vrtName", dataType = "string", value = "货币名", paramType = "query")
    })
    public R getPriceRate(@ApiIgnore @RequestParam Map<String, Object> params) {
        if (params.size() < 1) {
            params.put("vrtName", "");
        }
        List<ExchangeRateEntity> rateList = exchangeRateService.getPriceByName(params.get("vrtName").toString());

        return R.page(rateList, rateList.size());
    }

    /**
     * 已有商品分类
     */
    @GetMapping("/categoryList")
    @ApiOperation(value = "商品分类")
    public R categoryList(@ApiIgnore @RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        //商品分类猪牛羊鸡
        List<ItemCategoryEntity> itemCategoryList = itemCategoryService.getItemCategory(params);
        //int total = itemCategoryService.pageCount(query);
        return R.page(itemCategoryList, itemCategoryList.size());
    }

    /**
     * 已有商品产地
     *
     * @return
     */
    @GetMapping("/getPlace")
    @ApiOperation(value = "已有商品产地")
    public R getPlace(@ApiIgnore @RequestParam Map<String, Object> params) {

        List<ItemOriginPlaceEntity> places = itemCategoryService.getPlaces(params);

        return R.page(places, places.size());
    }

    /**
     * 根据分类查询产地（报盘期货现货）
     *
     * @return
     */
    @GetMapping("/getPlaceByGoods")
    @ApiOperation(value = "根据分类查询产地（报盘期货现货）")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "ids", dataType = "Long", value = "分类Id", paramType = "query")
    })
    public R getPlaceByGoods(@ApiIgnore @RequestParam Long[] ids) {

        List<ItemOriginPlaceEntity> places = itemCategoryService.getPlacesByCategoryId(ids);

        return R.page(places, places.size());
    }

    /**
     * 根据分类查询产地（报盘期货现货）
     *
     * @return
     */
    @GetMapping("/getPlaceByIdsAndName")
    @ApiOperation(value = "根据分类查询产地（报盘期货现货）")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "ids", dataType = "Long", value = "分类Id", paramType = "query"),
            @ApiImplicitParam(name = "name", dataType = "String", value = "洲名称", paramType = "query")
    })
    public R getPlaceByIdsAndName(Long[] ids, String names) {
        Map<String, Object> map = new HashMap<>();
        if (null != ids && ids.length > 0)
            map.put("ids", ids);
        if (StringUtils.isNotBlank(names))
            map.put("names", names.split(","));

        List<ItemOriginPlaceEntity> places = itemCategoryService.getPlaceByIdsAndName(map);

        return R.page(places, places.size());
    }

    /**
     * 根据分类查询产地（求购期货现货）
     *
     * @return
     */
    @GetMapping("/getPlaceByBuyingGoods")
    @ApiOperation(value = "根据分类查询产地（求购期货现货）")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "buyingType", dataType = "int", value = "类型期货0现货1", paramType = "query"),
            @ApiImplicitParam(name = "categoryId", dataType = "string", value = "分类id", paramType = "query")
    })
    public R getPlaceByBuyingGoods(@ApiIgnore @RequestParam Map<String, Object> params) {
        //分类
        if (params.get("categoryId") != null) {
            String[] arr = params.get("categoryId").toString().split(","); // 用,分割
            params.put("categoryIdList", arr);
        }
        List<ItemOriginPlaceEntity> places = itemCategoryService.getPlaceByBuyingGoods(params);

        return R.page(places, places.size());
    }

    /**
     * 所有产地（求购期货现货）
     *
     * @return
     */
    @GetMapping("/getAllPlaceByBuyingGoods")
    @ApiOperation(value = "所有产地（求购期货现货）")

    public R getAllPlaceByBuyingGoods() {
        List<ItemOriginPlaceEntity> places = itemCategoryService.getAllPlaceByBuyingGoods();

        return R.page(places, places.size());
    }

    /**
     * Select下拉框 展示列表数据
     * (不含顶级: 无)
     * 只取第一级分类
     */
    @GetMapping(value = "/getCategoryList")
    public R getCategoryList() {
        List<ItemCategoryEntity> list = itemCategoryService.getTopList();
        return R.ok(list);
    }

    /**
     * 商品/商家推荐
     */
    @GetMapping("/recommendGoodsList")
    @ApiOperation(value = "商品/商家推荐")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "position", dataType = "int", value = "位置0首页1报盘2求购3物流4仓储5报关6代理", required = true, paramType = "query"),
            @ApiImplicitParam(name = "type", dataType = "int", value = "推荐类型0现货1期货必传，查询首页不传", paramType = "query"),
            @ApiImplicitParam(name = "token", paramType = "header", value = "token", dataType = "string")
    })
    public R recommendGoodsList(@ApiIgnore @RequestParam Map<String, Object> params) {
        //查询列表数据
//        Query query = new Query(params);
        params.put("offset",0);
        params.put("limit",4);
        if ("0".equals(params.get("position")) || "1".equals(params.get("position"))) {
            List<GoodsOfferEntity> goodsOfferList = goodsOfferService.queryRecommendList(params);
            return R.page(goodsOfferList, goodsOfferList.size());
        } else if ("2".equals(params.get("position"))) {
            List<GoodsBuyingEntity> buyingList = goodsBuyingService.queryBuyingList(params);
            return R.page(buyingList, buyingList.size());
        } else {
            //推荐商家list
            List<MerchantCompanyEntity> companyList = merchantCompanyService.getRecommendCompanyList(params);
            return R.page(companyList, companyList.size());
        }
    }

    /**
     * 列表
     */
    @GetMapping("/appMarketauctionList")
    @ApiOperation(value = "拍卖列表接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", dataType = "int", value = "页码", paramType = "query", defaultValue = "1"),
            @ApiImplicitParam(name = "limit", dataType = "int", value = "一页几条", paramType = "query", defaultValue = "10"),
            @ApiImplicitParam(name = "status", dataType = "int", value = "状态 0:上架,1:下架 2未上架  ", paramType = "query"),
            @ApiImplicitParam(name = "isStart", dataType = "int", value = "进展：1 未开始，2 进行中 3，已结束", paramType = "query"),
            @ApiImplicitParam(name = "isStratEnd", dataType = "int", value = "进展：1 未开始 和 进行中", paramType = "query")
    })
    public R appMarketauctionList(@ApiIgnore @RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        SysUserEntity user = getUser();
        if (user != null) {
            query.put("companyId", user.getCompanyId());
        }
        query.put("type", 0);
        List<MarketAuctionEntity> marketAuctionList = marketAuctionService.queryList(query);
        for (MarketAuctionEntity auctionEntity : marketAuctionList) {
            if (auctionEntity.getProvince() != null) {
                SysProvincesEntity sysProvincesEntity = sysProvincesService.queryByprovinceId(auctionEntity.getProvince());
                SysCitiesEntity sysCitiesEntity = sysCitiesService.queryBycityId(auctionEntity.getCity());
                auctionEntity.setCityName(sysCitiesEntity.getCity());
                auctionEntity.setProvinceName(sysProvincesEntity.getProvince());
            }
        }
        int total = marketAuctionService.queryTotal(query);

        return R.page(marketAuctionList, total);
    }

    /**
     * 信息
     */
    @GetMapping("/appMarketauctionInfo")
    @ApiOperation(value = "拍卖详情接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", dataType = "int", value = "拍卖id", paramType = "query")
    })
    public R appMarketauctionInfo(@ApiIgnore @RequestParam Long id) {
        MarketAuctionEntity marketAuction = marketAuctionService.queryObject(id);
        if (marketAuction != null) {
            marketAuction.setDescribe(unescape(marketAuction.getDescribe()));
            if (marketAuction.getProvince() != null) {
                SysProvincesEntity sysProvincesEntity = sysProvincesService.queryByprovinceId(marketAuction.getProvince());
                SysCitiesEntity sysCitiesEntity = sysCitiesService.queryBycityId(marketAuction.getCity());
                marketAuction.setCityName(sysCitiesEntity.getCity());
                marketAuction.setProvinceName(sysProvincesEntity.getProvince());
            }
        }
        Map<String, Object> map = new HashMap<>();
        map.put("auctionId", id);
        List<MarketAuctionCommodityEntity> marketAuctionCommodityEntityList = marketAuctionCommodityService.queryList(map);
        for (MarketAuctionCommodityEntity auctionCommodityEntity : marketAuctionCommodityEntityList) {
            SysDictEntity sysDictEntities = dictService.queryByCountryName(auctionCommodityEntity.getCommodityCountry());
            auctionCommodityEntity.setCommodityCountryName(sysDictEntities.getName());
        }
        R r = R.ok();
        r.put("marketAuction", marketAuction);
        r.put("marketAuctionCommodityList", marketAuctionCommodityEntityList);
        return r;
    }

    /**
     * 热门拍卖
     */
    @GetMapping("/queryHot")
    @ApiOperation(value = "热门拍卖")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "limit", dataType = "int", value = "一页几条", paramType = "query", defaultValue = "10"),
    })
    public R queryHot(@ApiIgnore @RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);

        List<MarketAuctionEntity> marketAuctionList = marketAuctionService.queryHot(query);

        return R.ok(marketAuctionList);
    }

    @PostMapping("/saveMarketBidRecord")
    @ApiOperation(value = "竞拍出价新增接口")
    public R saveMarketBidRecord(@RequestBody MarketBidRecordEntity marketBidRecord) {
        ValidatorUtils.validateEntity(marketBidRecord, AddGroup.class);
        Integer companyId = marketBidRecord.getCompanyId();
        if (companyId != null) {
            MerchantCompanyEntity companyEntity = merchantCompanyService.queryObject(companyId);
            marketBidRecord.setCompanyName(companyEntity.getCompanyName());
        }
        marketBidRecord.setBidTime(new Date());
        marketBidRecord.setCreateDate(new Date());
        //保存最终出价
        MarketAuctionEntity marketAuction = marketAuctionService.queryObject(marketBidRecord.getAuctionId());
        marketAuction.setStartingPrice(marketBidRecord.getTerminalPrice());
        marketAuctionService.updateStartingPrice(marketAuction);
        marketBidRecordService.save(marketBidRecord);

        return R.ok();
    }

    @PostMapping("/saveMarketTenderRecord")
    @ApiOperation(value = "竞标记录新增接口")
    public R saveMarketTenderRecord(@RequestBody MarketTenderRecordEntity marketTenderRecord) {
        ValidatorUtils.validateEntity(marketTenderRecord, AddGroup.class);
        marketTenderRecord.setCreateDate(new Date());
        marketTenderRecord.setDelFlag(0);
        marketTenderRecordService.save(marketTenderRecord);

        return R.ok();
    }

    @GetMapping("/appMarkettenderList")
    @ApiOperation(value = "招标列表接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", dataType = "int", value = "页码", paramType = "query", defaultValue = "1"),
            @ApiImplicitParam(name = "limit", dataType = "int", value = "一页几条", paramType = "query", defaultValue = "10"),
            @ApiImplicitParam(name = "status", dataType = "int", value = "状态 0:上架,1:下架 ", paramType = "query"),
            @ApiImplicitParam(name = "isStratEnd", dataType = "int", value = "进展：1 未开始 和 进行中", paramType = "query")
    })
    public R appMarkettenderList(@ApiIgnore @RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);

        List<MarketTenderEntity> marketTenderList = marketTenderService.queryList(query);
        for (MarketTenderEntity tenderEntity : marketTenderList) {
            if (StringUtils.isNotBlank(tenderEntity.getProvince())) {
                SysProvincesEntity sysProvincesEntity = sysProvincesService.queryByprovinceId(tenderEntity.getProvince());
                tenderEntity.setProvinceName(sysProvincesEntity.getProvince());
                if (StringUtils.isNotBlank(tenderEntity.getCity())) {
                    SysCitiesEntity sysCitiesEntity = sysCitiesService.queryBycityId(tenderEntity.getCity());
                    tenderEntity.setCityName(sysCitiesEntity.getCity());
                }
            }
        }
        int total = marketTenderService.queryTotal(query);

        return R.page(marketTenderList, total);
    }

    /**
     * 信息
     */
    @GetMapping("/appMarkettenderInfo")
    @ApiOperation(value = "招标详情接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", dataType = "int", value = "招标id", paramType = "query")
    })
    public R appMarkettenderInfo(@ApiIgnore @RequestParam("id") Long id) {
        MarketTenderEntity marketTender = marketTenderService.queryObject(id);
        if (marketTender != null) {
            marketTender.setDescribe(unescape(marketTender.getDescribe()));
            MerchantCompanyEntity companyEntity = merchantCompanyService.queryObject(marketTender.getCompanyId());
            marketTender.setCompanyEntity(companyEntity);
            if (StringUtils.isNotBlank(marketTender.getProvince())) {
                SysProvincesEntity sysProvincesEntity = sysProvincesService.queryByprovinceId(marketTender.getProvince());
                SysCitiesEntity sysCitiesEntity = sysCitiesService.queryBycityId(marketTender.getCity());
                marketTender.setCityName(sysCitiesEntity.getCity());
                marketTender.setProvinceName(sysProvincesEntity.getProvince());
            }
        }
        return R.page(marketTender, 1);
    }

    /**
     * 获取当前时间接口
     */
    @GetMapping("/time")
    @ApiOperation(value = "获取当前时间接口")
    public Long currentTime() {
        Date date = new Date();
        return date.getTime();
    }

    /**
     * 注册
     */
    @SysLog("注册")
    @ApiOperation(value = "注册")
    @PostMapping("/registerApp")
    public R registerApp(@RequestBody SysUserEntity user, String smsCode) {
        ValidatorUtils.validateEntity(user, AddGroup.class);

        if (!ApiDemo4Java.yz(user.getMobile(), smsCode))
            return R.error("短信码错误!");

        sysUserService.save(user);
        chatMessageService.createNewIMUser(user.getUsername(), user.getNikename());

        return R.ok();
    }

    /**
     * 国内路线省
     */
    @GetMapping("/provincesList")
    @ApiOperation(value = "查询省")
    @ApiImplicitParams({
    })
    public R list(@ApiIgnore @RequestParam Map<String, Object> params) {
        //查询列表数据
        List<SysProvincesEntity> sysAreasList = sysProvincesService.queryList();
        return R.page(sysAreasList, sysAreasList.size());
    }

    /**
     * 国内路线市
     */
    @GetMapping("/citiesList")
    @ApiOperation(value = "查询市")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "provinceid", dataType = "string", value = "省对应编号 ", paramType = "query")
    })
    public R citiesList(@ApiIgnore @RequestParam String provinceid) {
        //查询列表数据
        List<SysCitiesEntity> citiesList = sysCitiesService.queryList(provinceid);
        return R.page(citiesList, citiesList.size());
    }

    /**
     * 国内路线区
     */
    @GetMapping("/areasList")
    @ApiOperation(value = "查询区")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "cid", dataType = "string", value = "市对应编号 ", paramType = "query")
    })
    public R areasList(@ApiIgnore @RequestParam String cid) {
        //查询列表数据
        List<SysAreasEntity> areasList = sysAreasService.queryList(cid);
        return R.page(areasList, areasList.size());
    }

    /**
     * 国际线路国家
     */
    @GetMapping("/International")
    @ApiOperation(value = "查询始发地国家")
    @ApiImplicitParams({
    })
    public R listInter(@ApiIgnore @RequestParam Map<String, Object> params) {
        //查询列表数据
        List<String> offerAddressEntityList = logisticsOfferAddressService.queryLists();
        return R.ok().put("offerAddressEntityList", offerAddressEntityList);
    }

    /**
     * 国际线路国家
     */
    @GetMapping("/Internationals")
    @ApiOperation(value = "查询始发地国家省市")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "province", dataType = "string", value = "传入国家 ", paramType = "query")
    })
    public R listInters(@ApiIgnore @RequestParam String province) {
        //查询列表数据
        List<String> offerAddressEntityList = logisticsOfferAddressService.queryListInters(province);
        return R.ok().put("offerAddressEntityList", offerAddressEntityList);
    }

    /**
     * 国际线路国家
     */
    @GetMapping("/InternationalEnd")
    @ApiOperation(value = "查询目的地国家")
    @ApiImplicitParams({
    })
    public R listInterEnd(@ApiIgnore @RequestParam Map<String, Object> params) {
        //查询列表数据
        List<String> offerAddressList = logisticsOfferAddressService.queryListsEnd();
        return R.ok().put("offerAddressList", offerAddressList);
    }

    /**
     * 国际线路国家
     */
    @GetMapping("/InternationalsEnd")
    @ApiOperation(value = "查询目的地国家省市")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "provinceEnd", dataType = "string", value = "传入国家 ", paramType = "query")
    })
    public R listIntersEnd(@ApiIgnore @RequestParam String provinceEnd) {
        //查询列表数据
        List<String> offerAddressList = logisticsOfferAddressService.queryListIntersEnd(provinceEnd);
        return R.ok().put("offerAddressList", offerAddressList);
    }

    /**
     * 求购订单列表
     */
    @GetMapping("/agentBuyList")
    @ApiOperation("代理求购列表")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", dataType = "int", value = "页码", paramType = "query", defaultValue = "1"),
            @ApiImplicitParam(name = "limit", dataType = "int", value = "一页几条", paramType = "query", defaultValue = "10")
    })
    public R agentBuyList(@ApiIgnore @RequestParam Map<String, Object> params) {
        //查询列表数据
        if (null != params.get("business") && !"".equals(params.get("business").toString())) {
            params.put("business", params.get("business").toString().split(","));
        }

        Query query = new Query(params);
        List<AgentDemandEntity> agentDemandList = agentDemandService.pageList(query);
        int total = agentDemandService.pageCount(query);

        return R.page(agentDemandList, total);
    }

    /**
     * 求购订单详情
     */
    @GetMapping("/agentBuyInfo")
    @ApiOperation("代理求购详情")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", dataType = "int", value = "代理求购id", paramType = "query")
    })
    public R agentBuyInfo(@ApiIgnore @RequestParam("id") Long id) {
        AgentDemandEntity agentDemand = agentDemandService.queryDetail(id);
        if (agentDemand != null) {
            agentDemand.setDescription(unescape(agentDemand.getDescription()));
        }
        return R.page(agentDemand, 1);
    }

    /**
     * 列表
     */
    @GetMapping("/agentOfferList")
    @ApiOperation("代理报盘列表")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", dataType = "int", value = "页码", paramType = "query", defaultValue = "1"),
            @ApiImplicitParam(name = "limit", dataType = "int", value = "一页几条", paramType = "query", defaultValue = "10")
    })
    public R agentOfferList(@ApiIgnore @RequestParam Map<String, Object> params) {
        //查询列表数据
        if (null != params.get("service") && !"".equals(params.get("service").toString())) {
            params.put("service", params.get("service").toString().split(","));
        }
        Query query = new Query(params);
        //查上架
        query.put("status", "1");
        List<AgentOfferEntity> agentOfferList = agentOfferService.pageList(query);
        int total = agentOfferService.pageCount(query);

        return R.page(agentOfferList, total);
    }

    /**
     * 代理报盘详情
     */
    @GetMapping("/agentOfferInfo")
    @ApiOperation("代理报盘详情")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", dataType = "int", value = "代理报盘id", paramType = "query")
    })
    public R agentOfferInfo(@ApiIgnore @RequestParam("id") Long id) {
        AgentOfferEntity agentOffer = agentOfferService.queryInfo(id);
        if (agentOffer != null) {
            agentOffer.setIntroduction(unescape(agentOffer.getIntroduction()));
        }
        return R.page(agentOffer, 1);
    }

    /**
     * 获取推荐的公司
     *
     * @return
     */
    @GetMapping("/getCompanys")
    @ApiOperation(value = "推荐商家")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "companyId", dataType = "int", value = "公司id", paramType = "query")
    })
    public R getCompanys(@ApiIgnore @RequestParam("companyId") int companyId) {
        List<MerchantCompanyEntity> company = merchantCompanyService.getCompanys(companyId);
        return R.ok().put("companys", company);
    }


    @GetMapping("/getTypeAndServiceAll")
    @ApiOperation(value = "公司类型和服务类型")
    public R getTypeAndServiceAll() {
        //查询列表数据
        List<CompanyTypeEntity> companyTypeList = companyTypeService.queryCompanyTypeAll();
        List<ServiceTypeEntity> serviceTypeList = serviceTypeService.queryList(null);
        Map<String, Object> map = new HashMap<>();
        map.put("companyType", companyTypeList);
        map.put("serviceType", serviceTypeList);

        return R.ok(map);
    }

    /**
     * 期货现货报盘历史价格趋势
     *
     * @return
     */
    @GetMapping("/getPriceTrend")
    @ApiOperation(value = "货物报盘价格趋势")
    @ApiImplicitParams({
//            @ApiImplicitParam(name = "day", dataType = "int", value = "历史天数", required = true, paramType = "query"),
            @ApiImplicitParam(name = "goodsName", dataType = "string", value = "货物名（价格趋势）", paramType = "query"),
            @ApiImplicitParam(name = "categoryId", dataType = "int", value = "分类id（行情指数）", paramType = "query")
    })
    public R historyPriceTrend(@ApiIgnore @RequestParam Map<String, Object> params) {
        List<Map<String, Object>> priceList = goodsOfferService.getHistoryPriceTrend(params);
        return R.page(priceList, priceList.size());
    }

    /**
     * 新手教程
     */
    @GetMapping("/getPath")
    @ApiOperation(value = "新手教程")
    public R getPath(HttpServletRequest request) {
        String str = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + "/yhsc/供应链用户手册.docx";
        R r = new R();
        r.put("str", str);
        return r;
    }

    /**
     * 通过货物订单号查询
     *
     * @param orderNumber
     * @return
     */
    @GetMapping("/getListByOrderNumber")
    @ApiOperation(value = "根据订单号查询货物")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "orderNumber", dataType = "String", value = "订单编号", paramType = "query"),
    })
    public R getListByOrderNumber(@RequestParam("orderNumber") String orderNumber) {

        GoodsOrderEntity goodsOrderEntity = goodsOrderService.getListByOrderNumber(orderNumber);
        for (int i=0;i<goodsOrderEntity.getDetail().size();i++){
            Integer num = null;
            if(goodsOrderEntity.getGoodsUnit().equals("1")){//柜
                num = goodsOrderEntity.getDetail().get(i).getGoodsCount()*goodsOrderEntity.getOrderCount();
            }else if (goodsOrderEntity.getGoodsUnit().equals("2")||goodsOrderEntity.getGoodsUnit().equals("3")){//吨 千克
                num = goodsOrderEntity.getOrderCount();
            }
            goodsOrderEntity.getDetail().get(i).setGoodsCount(num);
        }

        return R.ok().put("good", goodsOrderEntity);
    }

    /**
     * 查询所有产地
     *
     * @param
     * @return
     */
    @GetMapping("/getAllPlace")
    @ApiOperation(value = "查询所有产地")
    public R getAllPlace() {
        String type = "国家编码";
        List<SysDictEntity> dictEntities = dictService.queryByType(type);
        return R.page(dictEntities, dictEntities.size());
    }


    @SysLog("注册-发送短信验证码")
    @GetMapping("/sendSMS")
    @ApiOperation(value = "注册-发送短信验证码")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "mobile", dataType = "String", value = "手机号", paramType = "query")
    })
    public R sendSMS(@RequestParam("mobile") String mobile) {

        String smsCode = null;
        String regex = "^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(166)|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9]))\\d{8}$";
        if (!"".equals(mobile) && ReUtil.contains(regex, mobile)) {
//            SysUserEntity userEntity = sysUserService.queryByUserName(mobile);
//            if (null != userEntity)
//                return R.error("手机号码已被注册！");
            ApiDemo4Java.send(mobile);
            return R.ok();
        }
        return R.error();
    }

    @RequestMapping("/stock/push")
    public R push(String name, String content) {
        MyWebSocket socket = new MyWebSocket();
        try {
            socket.sendMessage(content, name);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return R.ok();
    }
}
