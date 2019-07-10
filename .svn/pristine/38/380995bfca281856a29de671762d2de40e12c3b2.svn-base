package com.wzlue.chain.agent.entity;

import com.wzlue.chain.company.entity.MerchantCompanyEntity;

import java.io.Serializable;
import java.util.Date;
import java.math.BigDecimal;
import java.util.List;


/**
 * 代理(求购)信息表
 * 
 * @author 
 * @email 
 * @date 2018-09-10 17:54:11
 */
public class AgentDemandEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//自增主键,id
	private Long id;
	//标题
	private String title;
	//联系人
	private String contacts;
	//手机号码
	private String mobile;
	//商品名称
	private String goodsName;
	//重量
	private BigDecimal weight;
	//单位
	private String unit;
	//描述
	private String description;
	//删除标识 0.未删除 1.已删除
	private Integer delFlag;
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
	//数据所属公司id
	private Long companyId;
	//授权用户id
	private Long authorizesId;

	private List<AgentDemandBusinessEntity> business;

	private List<AgentDemandGoodsCategoryEntity> categorys;

	private MerchantCompanyEntity merchantCompanyEntity;

	public MerchantCompanyEntity getMerchantCompanyEntity() {
		return merchantCompanyEntity;
	}

	public void setMerchantCompanyEntity(MerchantCompanyEntity merchantCompanyEntity) {
		this.merchantCompanyEntity = merchantCompanyEntity;
	}

	public String getContacts() {
		return contacts;
	}

	public void setContacts(String contacts) {
		this.contacts = contacts;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	/**
	 * 设置：自增主键,id
	 */
	public void setId(Long id) {
		this.id = id;
	}
	/**
	 * 获取：自增主键,id
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
	 * 设置：商品名称
	 */
	public void setGoodsName(String goodsName) {
		this.goodsName = goodsName;
	}
	/**
	 * 获取：商品名称
	 */
	public String getGoodsName() {
		return goodsName;
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
	 * 设置：单位
	 */
	public void setUnit(String unit) {
		this.unit = unit;
	}
	/**
	 * 获取：单位
	 */
	public String getUnit() {
		return unit;
	}
	/**
	 * 设置：描述
	 */
	public void setDescription(String description) {
		this.description = description;
	}
	/**
	 * 获取：描述
	 */
	public String getDescription() {
		return description;
	}
	/**
	 * 设置：删除标识 0.未删除 1.已删除
	 */
	public void setDelFlag(Integer delFlag) {
		this.delFlag = delFlag;
	}
	/**
	 * 获取：删除标识 0.未删除 1.已删除
	 */
	public Integer getDelFlag() {
		return delFlag;
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
	public void setDeptId(Long deptId) {
		this.deptId = deptId;
	}
	/**
	 * 获取：权限部门id
	 */
	public Long getDeptId() {
		return deptId;
	}
	/**
	 * 设置：数据所属公司id
	 */
	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}
	/**
	 * 获取：数据所属公司id
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

	public List<AgentDemandBusinessEntity> getBusiness() {
		return business;
	}

	public void setBusiness(List<AgentDemandBusinessEntity> business) {
		this.business = business;
	}

	public List<AgentDemandGoodsCategoryEntity> getCategorys() {
		return categorys;
	}

	public void setCategorys(List<AgentDemandGoodsCategoryEntity> categorys) {
		this.categorys = categorys;
	}
}
