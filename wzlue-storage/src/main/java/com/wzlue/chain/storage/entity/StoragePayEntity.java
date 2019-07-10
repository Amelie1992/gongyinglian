package com.wzlue.chain.storage.entity;

import java.io.Serializable;
import java.util.Date;
import java.math.BigDecimal;


/**
 * 仓储日费用记录表
 * 
 * @author 
 * @email 
 * @date 2018-09-19 19:09:47
 */
public class StoragePayEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private Long id;
	//订单货物商品表id
	private Long orderCommodityId;
	//订单id
	private Long orderId;
	//订单编号
	private String orderNumber;
	//货物报盘id
	private String goodsOfferId;
	//商品id
	private String commodityId;
	//商品名称
	private String commodityName;
	//商品编号
	private String commodityNumber;
	//商品单位
	private String commodityUnit;
	//商品价格
	private BigDecimal commodityPrice;
	//商品数量
	private String commodityCount;
	//厂号
	private String commodityFactoryNumber;
	//产地
	private String commodityCountry;
	//重量
	private BigDecimal weight;
	//仓库报盘的单位：0，元/吨/天；1，元/托/天
	private String unit;
	//费用
	private BigDecimal payMoney;
	//状态: 0:待付款、1:已付款
	private Integer payStatus;
	//创建时间
	private Date createdTime;
	private String countryName;

	/**
	 * 设置：
	 */
	public void setId(Long id) {
		this.id = id;
	}
	/**
	 * 获取：
	 */
	public Long getId() {
		return id;
	}
	/**
	 * 设置：订单货物商品表id
	 */
	public void setOrderCommodityId(Long orderCommodityId) {
		this.orderCommodityId = orderCommodityId;
	}
	/**
	 * 获取：订单货物商品表id
	 */
	public Long getOrderCommodityId() {
		return orderCommodityId;
	}
	/**
	 * 设置：订单id
	 */
	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}
	/**
	 * 获取：订单id
	 */
	public Long getOrderId() {
		return orderId;
	}
	/**
	 * 设置：订单编号
	 */
	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}
	/**
	 * 获取：订单编号
	 */
	public String getOrderNumber() {
		return orderNumber;
	}
	/**
	 * 设置：货物报盘id
	 */
	public void setGoodsOfferId(String goodsOfferId) {
		this.goodsOfferId = goodsOfferId;
	}
	/**
	 * 获取：货物报盘id
	 */
	public String getGoodsOfferId() {
		return goodsOfferId;
	}
	/**
	 * 设置：商品id
	 */
	public void setCommodityId(String commodityId) {
		this.commodityId = commodityId;
	}
	/**
	 * 获取：商品id
	 */
	public String getCommodityId() {
		return commodityId;
	}
	/**
	 * 设置：商品名称
	 */
	public void setCommodityName(String commodityName) {
		this.commodityName = commodityName;
	}
	/**
	 * 获取：商品名称
	 */
	public String getCommodityName() {
		return commodityName;
	}
	/**
	 * 设置：商品编号
	 */
	public void setCommodityNumber(String commodityNumber) {
		this.commodityNumber = commodityNumber;
	}
	/**
	 * 获取：商品编号
	 */
	public String getCommodityNumber() {
		return commodityNumber;
	}
	/**
	 * 设置：商品单位
	 */
	public void setCommodityUnit(String commodityUnit) {
		this.commodityUnit = commodityUnit;
	}
	/**
	 * 获取：商品单位
	 */
	public String getCommodityUnit() {
		return commodityUnit;
	}
	/**
	 * 设置：商品价格
	 */
	public void setCommodityPrice(BigDecimal commodityPrice) {
		this.commodityPrice = commodityPrice;
	}
	/**
	 * 获取：商品价格
	 */
	public BigDecimal getCommodityPrice() {
		return commodityPrice;
	}
	/**
	 * 设置：商品数量
	 */
	public void setCommodityCount(String commodityCount) {
		this.commodityCount = commodityCount;
	}
	/**
	 * 获取：商品数量
	 */
	public String getCommodityCount() {
		return commodityCount;
	}
	/**
	 * 设置：厂号
	 */
	public void setCommodityFactoryNumber(String commodityFactoryNumber) {
		this.commodityFactoryNumber = commodityFactoryNumber;
	}
	/**
	 * 获取：厂号
	 */
	public String getCommodityFactoryNumber() {
		return commodityFactoryNumber;
	}
	/**
	 * 设置：产地
	 */
	public void setCommodityCountry(String commodityCountry) {
		this.commodityCountry = commodityCountry;
	}
	/**
	 * 获取：产地
	 */
	public String getCommodityCountry() {
		return commodityCountry;
	}
	/**
	 * 设置：重量
	 */
	public void setWeight(BigDecimal weight) {
		this.weight = weight;
	}
	/**
	 * 获取：重量
	 */
	public BigDecimal getWeight() {
		return weight;
	}
	/**
	 * 设置：仓库报盘的单位：0，元/吨/天；1，元/托/天
	 */
	public void setUnit(String unit) {
		this.unit = unit;
	}
	/**
	 * 获取：仓库报盘的单位：0，元/吨/天；1，元/托/天
	 */
	public String getUnit() {
		return unit;
	}
	/**
	 * 设置：费用
	 */
	public void setPayMoney(BigDecimal payMoney) {
		this.payMoney = payMoney;
	}
	/**
	 * 获取：费用
	 */
	public BigDecimal getPayMoney() {
		return payMoney;
	}
	/**
	 * 设置：状态: 0:待付款、1:已付款
	 */
	public void setPayStatus(Integer payStatus) {
		this.payStatus = payStatus;
	}
	/**
	 * 获取：状态: 0:待付款、1:已付款
	 */
	public Integer getPayStatus() {
		return payStatus;
	}
	/**
	 * 设置：创建时间
	 */
	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}
	/**
	 * 获取：创建时间
	 */
	public Date getCreatedTime() {
		return createdTime;
	}

	public String getCountryName() {
		return countryName;
	}

	public void setCountryName(String countryName) {
		this.countryName = countryName;
	}
}
