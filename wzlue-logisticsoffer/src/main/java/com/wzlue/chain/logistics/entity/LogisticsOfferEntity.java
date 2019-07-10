package com.wzlue.chain.logistics.entity;

import java.io.Serializable;
import java.util.Date;
import java.math.BigDecimal;
import java.util.List;


/**
 * 商品库物流报盘
 * 
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-08-16 10:19:13
 */
public class LogisticsOfferEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//物流id
	private Long  id;
	//标题名称
	private String title;
	//联系方式
	private String phone;
	//联系人
	private String contact;
	//收费单价
	private BigDecimal price;
	//单位
	private Long unit;
	private String unitName;
	//运输分类 0:船舶;1:车辆,2:航空,3:火车
	private Integer categoryId;
	private String categoryName;
	//公司简介
	private String companyInfo;
	//业务介绍
	private String businessIntroduction;
	//商品编码
	private String commodityCode;
	//商品描述
	private String describe;
	//状态 0:在售,1:下架
	private Integer status;
	//数量
	private BigDecimal num;
	//物流类型
	private Integer type;
	private String typeName;
	//最新成交时间
	private Date transactionTime;
	//公司id
	private Integer companyId;
	//公司名称
	private String companyName;
	//部门id
	private Integer deptId;
	//创建人
	private Integer createBy;
	//授权用户id
	private Integer authorizesId;
	//创建日期
	private Date creatDate;
	//修改人
	private Integer updateBy;
	//修改时间
	private Date updateDate;
	//删除标识 0：未删除 1：删除
	private Integer delFlag;

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	//物流线路列表
	List<LogisticsOfferAddressEntity> logisticsOfferAddressList;

	public List<LogisticsOfferAddressEntity> getLogisticsOfferAddressList() {
		return logisticsOfferAddressList;
	}

	public void setLogisticsOfferAddressList(List<LogisticsOfferAddressEntity> logisticsOfferAddressList) {
		this.logisticsOfferAddressList = logisticsOfferAddressList;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	/**
	 * 设置：物流id
	 */
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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
	 * 设置：运输分类 0:船舶;1:车辆,2:航空,3:火车
	 */
	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}
	/**
	 * 获取：运输分类 0:船舶;1:车辆,2:航空,3:火车
	 */
	public Integer getCategoryId() {
		return categoryId;
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
	 * 设置：商品描述
	 */
	public void setDescribe(String describe) {
		this.describe = describe;
	}
	/**
	 * 获取：商品描述
	 */
	public String getDescribe() {
		return describe;
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
	 * 设置：公司id
	 */
	public Integer getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Integer companyId) {
		this.companyId = companyId;
	}

	public Integer getAuthorizesId() {
		return authorizesId;
	}

	public void setAuthorizesId(Integer authorizesId) {
		this.authorizesId = authorizesId;
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
	public Integer getCreateBy() {
		return createBy;
	}

	public void setCreateBy(Integer createBy) {
		this.createBy = createBy;
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
     * @param
     */
	public Integer getUpdateBy() {
		return updateBy;
	}

	public void setUpdateBy(Integer updateBy) {
		this.updateBy = updateBy;
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
