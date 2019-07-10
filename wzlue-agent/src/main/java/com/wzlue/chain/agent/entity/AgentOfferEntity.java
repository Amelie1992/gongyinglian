package com.wzlue.chain.agent.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.wzlue.chain.company.entity.MerchantCompanyEntity;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;
import java.math.BigDecimal;
import java.util.List;


/**
 * 代理报盘信息表
 * 
 * @author Zeyee
 * @date 2018-08-22
 */
public class AgentOfferEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//主键自增,id
	private Long id;
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
	//单位转译
	private String unitName;
	//价格
	private BigDecimal price;
	//货币代码
	private String currency;
	//业务介绍
	private String introduction;
	//报盘状态 0.上架 1.下架
	private Integer offerStatus;
	//创建人
	private Long createBy;
	//创建时间
	private Date createTime;
	//修改人
	private Long updateBy;
	//修改时间
	private Date updateTime;
	//权限部门id
	private Long deptId;

	private Long companyId;

	private Long authorizesId;

	private Integer idSourceType;

	@DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
	private Date transactionTime;
	private Integer transactionNumber;
	private List<AgentOfferBusinessEntity> business;

	private List<AgentOfferGoodsCategoryEntity> categorys;

	private MerchantCompanyEntity merchantCompanyEntity;

	public MerchantCompanyEntity getMerchantCompanyEntity() {
		return merchantCompanyEntity;
	}

	public void setMerchantCompanyEntity(MerchantCompanyEntity merchantCompanyEntity) {
		this.merchantCompanyEntity = merchantCompanyEntity;
	}

	/**
	 * 设置：主键自增,id
	 */
	public void setId(Long id) {
		this.id = id;
	}
	/**
	 * 获取：主键自增,id
	 */
	public Long getId() {
		return id;
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
	 * 设置：报盘状态 0.上架 1.下架
	 */
	public void setOfferStatus(Integer offerStatus) {
		this.offerStatus = offerStatus;
	}
	/**
	 * 获取：报盘状态 0.上架 1.下架
	 */
	public Integer getOfferStatus() {
		return offerStatus;
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

	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
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

	public List<AgentOfferBusinessEntity> getBusiness() {
		return business;
	}

	public void setBusiness(List<AgentOfferBusinessEntity> business) {
		this.business = business;
	}

	public Integer getIdSourceType() {
		return idSourceType;
	}

	public void setIdSourceType(Integer idSourceType) {
		this.idSourceType = idSourceType;
	}

	public List<AgentOfferGoodsCategoryEntity> getCategorys() {
		return categorys;
	}

	public void setCategorys(List<AgentOfferGoodsCategoryEntity> categorys) {
		this.categorys = categorys;
	}

	/**
	 * 设置：权限部门id
	 */
	public void setDeptId(Long deptId) {
		this.deptId = deptId;
	}
	/**
	 * 获取：权限部门id
	 */
	public Long getDeptId() {
		return deptId;
	}

	public Long getAuthorizesId() {
		return authorizesId;
	}

	public void setAuthorizesId(Long authorizesId) {
		this.authorizesId = authorizesId;
	}

	@JsonFormat(pattern = "yyyy-MM-dd",timezone = "GMT+8")
	public Date getTransactionTime() {
		return transactionTime;
	}

	public void setTransactionTime(Date transactionTime) {
		this.transactionTime = transactionTime;
	}

	public Integer getTransactionNumber() {
		return transactionNumber;
	}

	public void setTransactionNumber(Integer transactionNumber) {
		this.transactionNumber = transactionNumber;
	}

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}
}
