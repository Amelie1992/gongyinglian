package com.wzlue.chain.logistics.entity;

import java.io.Serializable;
import java.util.Date;
import java.math.BigDecimal;


/**
 * 商品库物流报盘备份
 * 
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-08-31 15:13:24
 */
public class LogisticsOrderOfferEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//物流id
	private Long id;
	//订单id
	private Long orderId;
	//订单编号
	private String orderNumber;
	//报盘表id
	private Long offerId;
	//标题
	private String title;
	//公司名称
	private String companyName;
	//联系方式
	private String phone;
	//联系人
	private String contact;
	//收费单价
	private BigDecimal price;
	//单位
	private Long unit;
	//公司简介
	private String companyInfo;
	//业务介绍
	private String businessIntroduction;
	//状态 0:在售,1:下架
	private Integer status;
	//成交数量
	private BigDecimal num;
	//最新成交时间
	private Date transactionTime;
	//物流报盘备份表id
	private Long orderOfferId;
	//公司id
	private Integer companyId;
	//部门id
	private Integer deptId;
	//创建人
	private Long creatBy;
	//创建日期
	private Date creatDate;
	//修改人
	private Long updateBy;
	//修改时间
	private Date updateDate;
	//删除标识 0：未删除 1：删除
	private Integer delFlag;

	//订单总价单位
	private String orderUnit;
	public String getOrderUnit() {
		return orderUnit;
	}

	public void setOrderUnit(String orderUnit) {
		this.orderUnit = orderUnit;
	}


	public String getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}

	/**
	 * 设置：物流id
	 */
	public void setId(Long id) {
		this.id = id;
	}
	/**
	 * 获取：物流id
	 */
	public Long getId() {
		return id;
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
	 * 设置：报盘表id
	 */
	public void setOfferId(Long offerId) {
		this.offerId = offerId;
	}
	/**
	 * 获取：报盘表id
	 */
	public Long getOfferId() {
		return offerId;
	}
	/**
	 * 设置：标题
	 */
	public void setTitle(String title) {
		this.title = title;
	}
	/**
	 * 获取：标题
	 */
	public String getTitle() {
		return title;
	}
	/**
	 * 设置：公司名称
	 */
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	/**
	 * 获取：公司名称
	 */
	public String getCompanyName() {
		return companyName;
	}
	/**
	 * 设置：联系方式
	 */
	public void setPhone(String phone) {
		this.phone = phone;
	}
	/**
	 * 获取：联系方式
	 */
	public String getPhone() {
		return phone;
	}
	/**
	 * 设置：联系人
	 */
	public void setContact(String contact) {
		this.contact = contact;
	}
	/**
	 * 获取：联系人
	 */
	public String getContact() {
		return contact;
	}
	/**
	 * 设置：收费单价
	 */
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	/**
	 * 获取：收费单价
	 */
	public BigDecimal getPrice() {
		return price;
	}
	/**
	 * 设置：单位
	 */
	public void setUnit(Long unit) {
		this.unit = unit;
	}
	/**
	 * 获取：单位
	 */
	public Long getUnit() {
		return unit;
	}
	/**
	 * 设置：公司简介
	 */
	public void setCompanyInfo(String companyInfo) {
		this.companyInfo = companyInfo;
	}
	/**
	 * 获取：公司简介
	 */
	public String getCompanyInfo() {
		return companyInfo;
	}
	/**
	 * 设置：业务介绍
	 */
	public void setBusinessIntroduction(String businessIntroduction) {
		this.businessIntroduction = businessIntroduction;
	}
	/**
	 * 获取：业务介绍
	 */
	public String getBusinessIntroduction() {
		return businessIntroduction;
	}
	/**
	 * 设置：状态 0:在售,1:下架
	 */
	public void setStatus(Integer status) {
		this.status = status;
	}
	/**
	 * 获取：状态 0:在售,1:下架
	 */
	public Integer getStatus() {
		return status;
	}
	/**
	 * 设置：成交数量
	 */
	public void setNum(BigDecimal num) {
		this.num = num;
	}
	/**
	 * 获取：成交数量
	 */
	public BigDecimal getNum() {
		return num;
	}
	/**
	 * 设置：最新成交时间
	 */
	public void setTransactionTime(Date transactionTime) {
		this.transactionTime = transactionTime;
	}
	/**
	 * 获取：最新成交时间
	 */
	public Date getTransactionTime() {
		return transactionTime;
	}
	/**
	 * 设置：物流报盘备份表id
	 */
	public void setOrderOfferId(Long orderOfferId) {
		this.orderOfferId = orderOfferId;
	}
	/**
	 * 获取：物流报盘备份表id
	 */
	public Long getOrderOfferId() {
		return orderOfferId;
	}
	/**
	 * 设置：公司id
	 */
	public void setCompanyId(Integer companyId) {
		this.companyId = companyId;
	}
	/**
	 * 获取：公司id
	 */
	public Integer getCompanyId() {
		return companyId;
	}

	/**
	 * 设置：部门id
	 */
	public void setDeptId(Integer deptId) {
		this.deptId = deptId;
	}
	/**
	 * 获取：部门id
	 */
	public Integer getDeptId() {
		return deptId;
	}
	/**
	 * 设置：创建人
	 */
	public void setCreatBy(Long creatBy) {
		this.creatBy = creatBy;
	}
	/**
	 * 获取：创建人
	 */
	public Long getCreatBy() {
		return creatBy;
	}
	/**
	 * 设置：创建日期
	 */
	public void setCreatDate(Date creatDate) {
		this.creatDate = creatDate;
	}
	/**
	 * 获取：创建日期
	 */
	public Date getCreatDate() {
		return creatDate;
	}
	/**
	 * 设置：修改人
	 */
	public void setUpdateBy(Long updateBy) {
		this.updateBy = updateBy;
	}
	/**
	 * 获取：修改人
	 */
	public Long getUpdateBy() {
		return updateBy;
	}
	/**
	 * 设置：修改时间
	 */
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
	/**
	 * 获取：修改时间
	 */
	public Date getUpdateDate() {
		return updateDate;
	}
	/**
	 * 设置：删除标识 0：未删除 1：删除
	 */
	public void setDelFlag(Integer delFlag) {
		this.delFlag = delFlag;
	}
	/**
	 * 获取：删除标识 0：未删除 1：删除
	 */
	public Integer getDelFlag() {
		return delFlag;
	}
}
