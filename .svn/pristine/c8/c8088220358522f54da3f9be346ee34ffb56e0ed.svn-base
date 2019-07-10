package com.wzlue.chain.order.entity;

import java.io.Serializable;
import java.util.Date;
import java.math.BigDecimal;
import java.util.List;


/**
 * 订单商品列表
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-15 19:47:29
 */
public class GoodsOrderDetailEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private String id;
	//
	private String orderId;
	//货物编号
	private String goodsNumber;
	//原来的报盘货物编号
	private String oldGoodsNumber;
	//货物名称
	private String goodsName;
	//单价
	private BigDecimal goodsPrice;
	//重量单位1吨 2千克
	private String goodsUnit;
	//单位转义
	private String unitName;
	//币种 1：人民币；2：美元
	private Integer goodsCurrency;
	//货物总价
	private BigDecimal goodsTotalPrice;
	//货物略缩图
	private String goodsImageUrl;
    //可否拼柜
    private Integer goodsCsc;
    //货物类型
    private Integer goodsType;
    //货物重量
    private Integer goodsCount;
    //商品集合
	private List<GoodsOrderCommodityEntity> commoditys;
    //价格单位  1：元/吨   2： 元/千克  3：美元/吨  4：美元/千克
    private String priceUnit;
    //产地
    private String commodityCountry;
    //厂号
    private String commodityFactoryNumber;
    //包装
    private String commodityPacking;

    public String getPriceUnit() {
        return priceUnit;
    }

    public void setPriceUnit(String priceUnit) {
        this.priceUnit = priceUnit;
    }

    public String getCommodityCountry() {
        return commodityCountry;
    }

    public void setCommodityCountry(String commodityCountry) {
        this.commodityCountry = commodityCountry;
    }

    public String getCommodityFactoryNumber() {
        return commodityFactoryNumber;
    }

    public void setCommodityFactoryNumber(String commodityFactoryNumber) {
        this.commodityFactoryNumber = commodityFactoryNumber;
    }

    public String getCommodityPacking() {
        return commodityPacking;
    }

    public void setCommodityPacking(String commodityPacking) {
        this.commodityPacking = commodityPacking;
    }

    /**
	 * 设置：
	 */
	public void setId(String id) {
		this.id = id;
	}
	/**
	 * 获取：
	 */
	public String getId() {
		return id;
	}
	/**
	 * 设置：
	 */
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	/**
	 * 获取：
	 */
	public String getOrderId() {
		return orderId;
	}
	/**
	 * 设置：货物编号
	 */
	public void setGoodsNumber(String goodsNumber) {
		this.goodsNumber = goodsNumber;
	}
	/**
	 * 获取：货物编号
	 */
	public String getGoodsNumber() {
		return goodsNumber;
	}
	/**
	 * 设置：货物名称
	 */
	public void setGoodsName(String goodsName) {
		this.goodsName = goodsName;
	}
	/**
	 * 获取：货物名称
	 */
	public String getGoodsName() {
		return goodsName;
	}
	/**
	 * 设置：单价
	 */
	public void setGoodsPrice(BigDecimal goodsPrice) {
		this.goodsPrice = goodsPrice;
	}
	/**
	 * 获取：单价
	 */
	public BigDecimal getGoodsPrice() {
		return goodsPrice;
	}
	/**
	 * 设置：货物单位
	 */
	public void setGoodsUnit(String goodsUnit) {
		this.goodsUnit = goodsUnit;
	}
	/**
	 * 获取：货物单位
	 */
	public String getGoodsUnit() {
		return goodsUnit;
	}
	/**
	 * 设置：币种
	 */
	public void setGoodsCurrency(Integer goodsCurrency) {
		this.goodsCurrency = goodsCurrency;
	}
	/**
	 * 获取：币种
	 */
	public Integer getGoodsCurrency() {
		return goodsCurrency;
	}
	/**
	 * 设置：货物总价
	 */
	public void setGoodsTotalPrice(BigDecimal goodsTotalPrice) {
		this.goodsTotalPrice = goodsTotalPrice;
	}
	/**
	 * 获取：货物总价
	 */
	public BigDecimal getGoodsTotalPrice() {
		return goodsTotalPrice;
	}
	/**
	 * 设置：货物略缩图
	 */
	public void setGoodsImageUrl(String goodsImageUrl) {
		this.goodsImageUrl = goodsImageUrl;
	}
	/**
	 * 获取：货物略缩图
	 */
	public String getGoodsImageUrl() {
		return goodsImageUrl;
	}

    public List<GoodsOrderCommodityEntity> getCommoditys() {
        return commoditys;
    }

    public void setCommoditys(List<GoodsOrderCommodityEntity> commoditys) {
        this.commoditys = commoditys;
    }

    public Integer getGoodsCsc() {
        return goodsCsc;
    }

    public void setGoodsCsc(Integer goodsCsc) {
        this.goodsCsc = goodsCsc;
    }

    public Integer getGoodsType() {
        return goodsType;
    }

    public void setGoodsType(Integer goodsType) {
        this.goodsType = goodsType;
    }

    public Integer getGoodsCount() {
        return goodsCount;
    }

    public void setGoodsCount(Integer goodsCount) {
        this.goodsCount = goodsCount;
    }

    public String getOldGoodsNumber() {
        return oldGoodsNumber;
    }

    public void setOldGoodsNumber(String oldGoodsNumber) {
        this.oldGoodsNumber = oldGoodsNumber;
    }

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}
}
