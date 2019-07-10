package com.wzlue.chain.declare.entity;

import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;


/**
 * 报关报盘信息
 * 
 * @author ÎºË¼Æë
 * @email sunlightcs@gmail.com
 * @date 2018-08-15 16:29:28
 */
public class DeclareOfferEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//自增序号
	private Long id;
	//标题
	private String title;
	//公司名称
    private String companyName;
	//公司id
	private Integer companyId;
	//部门id
	private Integer deptId;
	//业务详情
	private String businessInfo;
	//联系人
	private String contacts;
	//联系方式
	private String contactWay;
	//商品编码
	private String commodityCode;
	//报关分类 1：进口报关 2：出口报关
	private Integer declareType;
	private String declareTypeName;
	//能报海关id
	private Integer declareId;
	//收费规则
	private BigDecimal chargeRules;
	//单位
	private String unit;
	//上架状态
	private Integer groundingState;
	//创建人
	private Integer createBy;
	//创建时间
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;
	//修改人
	private Integer updateBy;
	//修改时间
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updateTime;
	//最新成交时间
	private Date transactionTime;
	//成交数量
	private Integer transactionNumber;
	//删除标志
	private Integer delFlag;
	//权限用户id
    private Integer authorizesId;

	private List<DeclareOfferCustomsEntity> customsList;

	public String getDeclareTypeName() {
		return declareTypeName;
	}

	public void setDeclareTypeName(String declareTypeName) {
		this.declareTypeName = declareTypeName;
	}
	/**
	 * 设置：自增序号
	 */
	public void setId(Long id) {
		this.id = id;
	}
	/**
	 * 获取：自增序号
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

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
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
	 * 设置：业务详情
	 */
	public void setBusinessInfo(String businessInfo) {
		this.businessInfo = businessInfo;
	}
	/**
	 * 获取：业务详情
	 */
	public String getBusinessInfo() {
		return businessInfo;
	}
	/**
	 * 设置：联系人
	 */
	public void setContacts(String contacts) {
		this.contacts = contacts;
	}
	/**
	 * 获取：联系人
	 */
	public String getContacts() {
		return contacts;
	}
	/**
	 * 设置：联系方式
	 */
	public void setContactWay(String contactWay) {
		this.contactWay = contactWay;
	}
	/**
	 * 获取：联系方式
	 */
	public String getContactWay() {
		return contactWay;
	}

	/**
	 * 设置：商品编码
	 */
	public void setCommodityCode(String commodityCode) {
		this.commodityCode = commodityCode;
	}
	/**
	 * 获取：商品编码
	 */
	public String getCommodityCode() {
		return commodityCode;
	}
	/**
	 * 设置：报关分类 1：进口报关 2：出口报关
	 */
	public void setDeclareType(Integer declareType) {
		this.declareType = declareType;
	}
	/**
	 * 获取：报关分类 1：进口报关 2：出口报关
	 */
	public Integer getDeclareType() {
		return declareType;
	}
	/**
	 * 设置：能报海关id
	 */
	public void setDeclareId(Integer declareId) {
		this.declareId = declareId;
	}
	/**
	 * 获取：能报海关id
	 */
	public Integer getDeclareId() {
		return declareId;
	}
	/**
	 * 设置：收费规则
	 */
	public void setChargeRules(BigDecimal chargeRules) {
		this.chargeRules = chargeRules;
	}
	/**
	 * 获取：收费规则
	 */
	public BigDecimal getChargeRules() {
		return chargeRules;
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
	 * 设置：上架状态
	 */
	public void setGroundingState(Integer groundingState) {
		this.groundingState = groundingState;
	}
	/**
	 * 获取：上架状态
	 */
	public Integer getGroundingState() {
		return groundingState;
	}

	/**
	 * 设置：创建人
     * @param createBy
     */
	public void setCreateBy(Integer createBy) {
		this.createBy = createBy;
	}
	/**
	 * 获取：创建人
	 */
	public Integer getCreateBy() {
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
     * @param updateBy
     */
	public void setUpdateBy(Integer updateBy) {
		this.updateBy = updateBy;
	}
	/**
	 * 获取：修改人
	 */
	public Integer getUpdateBy() {
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
	 * 设置：成交数量
	 */
	public void setTransactionNumber(Integer transactionNumber) {
		this.transactionNumber = transactionNumber;
	}
	/**
	 * 获取：成交数量
	 */
	public Integer getTransactionNumber() {
		return transactionNumber;
	}
	/**
	 * 设置：删除标志
     * @param delFlag
     */
	public void setDelFlag(Integer delFlag) {
		this.delFlag = delFlag;
	}
	/**
	 * 获取：删除标志
	 */
	public Integer getDelFlag() {
		return delFlag;
	}
    /**
     * 获取：权限用户id
     */
    public Integer getAuthorizesId() {
        return authorizesId;
    }

    /**
     * 设置：权限用户id
     */
    public void setAuthorizesId(Integer authorizesId) {
        this.authorizesId = authorizesId;
    }

    public List<DeclareOfferCustomsEntity> getCustomsList() {
        return customsList;
    }

    public void setCustomsList(List<DeclareOfferCustomsEntity> customsList) {
        this.customsList = customsList;
    }

}
