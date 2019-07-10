package com.wzlue.chain.agent.entity;

import java.io.Serializable;
import java.util.Date;
import java.math.BigDecimal;


/**
 * 代理订单 -> 报盘信息备份表
 * 
 * @author 
 * @email 
 * @date 2018-09-14 13:53:22
 */
public class AgentOrderOfferEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//主键自增,id
	private Integer id;

	private String orderNumber;
	//标题
	private String title;
	//报盘编码
	private String offerCode;
	//联系人
	private String contactPerson;
	//联系方式
	private String contactPhone;
	//计价重量单位
	private String valuationUnit;
	//价格
	private BigDecimal price;
	//货币代码
	private String currency;
	//业务介绍
	private String introduction;
	//创建人
	private Long createBy;
	//创建时间
	private Date createTime;
	//修改用户id
	private Long updateBy;
	//修改时间
	private Date updateTime;
	//权限部门id
	private Integer deptId;
	//公司id
	private Long companyId;
	//授权用户id
	private Long authorizesId;

	/**
	 * 设置：主键自增,id
	 */
	public void setId(Integer id) {
		this.id = id;
	}
	/**
	 * 获取：主键自增,id
	 */
	public Integer getId() {
		return id;
	}

	public String getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
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
	 * 设置：报盘编码
	 */
	public void setOfferCode(String offerCode) {
		this.offerCode = offerCode;
	}
	/**
	 * 获取：报盘编码
	 */
	public String getOfferCode() {
		return offerCode;
	}
	/**
	 * 设置：联系人
	 */
	public void setContactPerson(String contactPerson) {
		this.contactPerson = contactPerson;
	}
	/**
	 * 获取：联系人
	 */
	public String getContactPerson() {
		return contactPerson;
	}
	/**
	 * 设置：联系方式
	 */
	public void setContactPhone(String contactPhone) {
		this.contactPhone = contactPhone;
	}
	/**
	 * 获取：联系方式
	 */
	public String getContactPhone() {
		return contactPhone;
	}
	/**
	 * 设置：计价重量单位
	 */
	public void setValuationUnit(String valuationUnit) {
		this.valuationUnit = valuationUnit;
	}
	/**
	 * 获取：计价重量单位
	 */
	public String getValuationUnit() {
		return valuationUnit;
	}
	/**
	 * 设置：价格
	 */
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	/**
	 * 获取：价格
	 */
	public BigDecimal getPrice() {
		return price;
	}
	/**
	 * 设置：货币代码
	 */
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	/**
	 * 获取：货币代码
	 */
	public String getCurrency() {
		return currency;
	}
	/**
	 * 设置：业务介绍
	 */
	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}
	/**
	 * 获取：业务介绍
	 */
	public String getIntroduction() {
		return introduction;
	}
	/**
	 * 设置：创建人
	 */
	public void setCreateBy(Long createBy) {
		this.createBy = createBy;
	}
	/**
	 * 获取：创建人
	 */
	public Long getCreateBy() {
		return createBy;
	}
	/**
	 * 设置：创建时间
	 */
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	/**
	 * 获取：创建时间
	 */
	public Date getCreateTime() {
		return createTime;
	}
	/**
	 * 设置：修改用户id
	 */
	public void setUpdateBy(Long updateBy) {
		this.updateBy = updateBy;
	}
	/**
	 * 获取：修改用户id
	 */
	public Long getUpdateBy() {
		return updateBy;
	}
	/**
	 * 设置：修改时间
	 */
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	/**
	 * 获取：修改时间
	 */
	public Date getUpdateTime() {
		return updateTime;
	}
	/**
	 * 设置：权限部门id
	 */
	public void setDeptId(Integer deptId) {
		this.deptId = deptId;
	}
	/**
	 * 获取：权限部门id
	 */
	public Integer getDeptId() {
		return deptId;
	}
	/**
	 * 设置：公司id
	 */
	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}
	/**
	 * 获取：公司id
	 */
	public Long getCompanyId() {
		return companyId;
	}
	/**
	 * 设置：授权用户id
	 */
	public void setAuthorizesId(Long authorizesId) {
		this.authorizesId = authorizesId;
	}
	/**
	 * 获取：授权用户id
	 */
	public Long getAuthorizesId() {
		return authorizesId;
	}

	public AgentOrderOfferEntity(){

	}
	public AgentOrderOfferEntity(AgentOfferEntity offer){
		this.setTitle(offer.getTitle());
		this.setOfferCode(offer.getOfferCode());
		this.setContactPerson(offer.getContactPerson());
		this.setContactPhone(offer.getContactPhone());
		this.setValuationUnit(offer.getValuationUnit());
		this.setPrice(offer.getPrice());
		this.setCurrency(offer.getCurrency());
		this.setIntroduction(offer.getIntroduction());
	}
}
