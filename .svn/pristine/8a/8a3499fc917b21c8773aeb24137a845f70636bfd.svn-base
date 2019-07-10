package com.wzlue.chain.storage.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;
import java.math.BigDecimal;


/**
 * 仓储出库商品表
 * 
 * @author 
 * @email 
 * @date 2018-09-15 11:17:18
 */
public class StorageOutCommodityEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private Long id;
	//出库id
	private Long outId;
	private Long orderId;
	//订单号
	private String orderNumber;
	//订单商品表id
	private Long orderCommodityId;
	//商品名称
	private String commodityName;
	//商品编号
	private String commodityNumber;
	//商品价格
	private BigDecimal commodityPrice;
	//商品单位 1:吨,2:千克
	private String commodityUnit;
	//厂号
	private String commodityFactoryNumber;
	//产地--名称
	private String commodityCountry;
	//剩余重量（单位：1:吨,2:千克）
	private BigDecimal weight;
	//剩余数量（仓库单位对应的可以出口的数量	单位：0，吨；1，托）
	private BigDecimal weightNum;
	//出库重量（买家申请	单位：1:吨,2:千克）
	private BigDecimal outWeight;
	//出库数量（仓库出货数量	单位：0，吨；1，托）
	private BigDecimal outWeightNum;
	//单位：0，吨；1，托
	private String outUnit;
	//生产日期
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date productionDate;
	//保质期
	private Integer qualityTime;
	//有效期截止日期
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date expirationDate;
	//报检号
	private String inspectionNo;
	//集装箱号
	private String containerNo;
	private String countryName;
	private String unitName;//单位：0，吨；1，托 		//计费单位：1，吨；2，千克
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date orderTime;//仓库到货日期
	private String commodityUnitName;//商品单位 1:吨,2:千克
    //计费单位 1:吨,2:千克
    private String unit;

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

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
	 * 设置：出库id
	 */
	public void setOutId(Long outId) {
		this.outId = outId;
	}
	/**
	 * 获取：出库id
	 */
	public Long getOutId() {
		return outId;
	}

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	/**
	 * 设置：订单号
	 */
	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}
	/**
	 * 获取：订单号
	 */
	public String getOrderNumber() {
		return orderNumber;
	}
	/**
	 * 设置：订单商品表id
	 */
	public void setOrderCommodityId(Long orderCommodityId) {
		this.orderCommodityId = orderCommodityId;
	}
	/**
	 * 获取：订单商品表id
	 */
	public Long getOrderCommodityId() {
		return orderCommodityId;
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
	 * 设置：仓库方填写的数量
	 */
	public void setOutWeight(BigDecimal outWeight) {
		this.outWeight = outWeight;
	}
	/**
	 * 获取：仓库方填写的数量
	 */
	public BigDecimal getOutWeight() {
		return outWeight;
	}
	/**
	 * 设置：单位：0，吨；1，托
	 */
	public void setOutUnit(String outUnit) {
		this.outUnit = outUnit;
	}
	/**
	 * 获取：单位：0，吨；1，托
	 */
	public String getOutUnit() {
		return outUnit;
	}
	/**
	 * 设置：生产日期
	 */
	public void setProductionDate(Date productionDate) {
		this.productionDate = productionDate;
	}
	/**
	 * 获取：生产日期
	 */
	@JsonFormat(pattern = "yyyy-MM-dd")
	public Date getProductionDate() {
		return productionDate;
	}
	/**
	 * 设置：保质期
	 */
	public void setQualityTime(Integer qualityTime) {
		this.qualityTime = qualityTime;
	}
	/**
	 * 获取：保质期
	 */
	public Integer getQualityTime() {
		return qualityTime;
	}
	/**
	 * 设置：有效期截止日期
	 */
	public void setExpirationDate(Date expirationDate) {
		this.expirationDate = expirationDate;
	}
	/**
	 * 获取：有效期截止日期
	 */
	@JsonFormat(pattern = "yyyy-MM-dd")
	public Date getExpirationDate() {
		return expirationDate;
	}
	/**
	 * 设置：报检号
	 */
	public void setInspectionNo(String inspectionNo) {
		this.inspectionNo = inspectionNo;
	}
	/**
	 * 获取：报检号
	 */
	public String getInspectionNo() {
		return inspectionNo;
	}
	/**
	 * 设置：集装箱号
	 */
	public void setContainerNo(String containerNo) {
		this.containerNo = containerNo;
	}
	/**
	 * 获取：集装箱号
	 */
	public String getContainerNo() {
		return containerNo;
	}

	public String getCountryName() {
		return countryName;
	}

	public void setCountryName(String countryName) {
		this.countryName = countryName;
	}

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	@JsonFormat(pattern = "yyyy-MM-dd")
	public Date getOrderTime() {
		return orderTime;
	}

	public void setOrderTime(Date orderTime) {
		this.orderTime = orderTime;
	}

	public BigDecimal getOutWeightNum() {
		return outWeightNum;
	}

	public void setOutWeightNum(BigDecimal outWeightNum) {
		this.outWeightNum = outWeightNum;
	}

	public BigDecimal getWeightNum() {
		return weightNum;
	}

	public void setWeightNum(BigDecimal weightNum) {
		this.weightNum = weightNum;
	}

	public String getCommodityUnitName() {
		return commodityUnitName;
	}

	public void setCommodityUnitName(String commodityUnitName) {
		this.commodityUnitName = commodityUnitName;
	}
}
