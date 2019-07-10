package com.wzlue.chain.storage.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;
import java.math.BigDecimal;


/**
 * 仓储报盘
 * 
 * @author 
 * @email 
 * @date 2018-08-27 14:15:36
 */
public class OfferEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private Long id;
	//编码
	private String code;
	//标题
	private String title;
	//联系方式
	private String phone;
	//联系人
	private String contact;
	//收费单价
	private BigDecimal price;
	//单位
	private String unit;
	//仓库名称
	private String storageName;
	//省
	private String province;
	//市
	private String city;
	//区县
	private String county;
	//详细地址
	private String area;
	//业务介绍
	private String businessIntroduction;
	//状态: 0.在售 1.下架
	private Integer status;
	//成交数量
	private Integer num;
	//最新成交时间
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date transactionTime;
	//公司id
	private Long merchantId;
    //公司名称
    private String companyName;
	//部门id
	private Long deptId;
	//创建人
	private Long createdBy;
	//创建时间
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date createdTime;
	//修改人
	private Long updatedBy;
	//修改时间
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date updatedTime;
	//删除标识 0：未删除 1：删除
	private Integer delFlag;
	//省
	private String provinceName;
	//市
	private String cityName;
	//区县
	private String countyName;
	//信用分数
	private Integer creditScore;

	public Integer getCreditScore() {
		return creditScore;
	}

	public void setCreditScore(Integer creditScore) {
		this.creditScore = creditScore;
	}

	public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
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
	 * 设置：编码
	 */
	public void setCode(String code) {
		this.code = code;
	}
	/**
	 * 获取：编码
	 */
	public String getCode() {
		return code;
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
	 * 设置：仓库名称
	 */
	public void setStorageName(String storageName) {
		this.storageName = storageName;
	}
	/**
	 * 获取：仓库名称
	 */
	public String getStorageName() {
		return storageName;
	}
	/**
	 * 设置：省
	 */
	public void setProvince(String province) {
		this.province = province;
	}
	/**
	 * 获取：省
	 */
	public String getProvince() {
		return province;
	}
	/**
	 * 设置：市
	 */
	public void setCity(String city) {
		this.city = city;
	}
	/**
	 * 获取：市
	 */
	public String getCity() {
		return city;
	}
	/**
	 * 设置：区县
	 */
	public void setCounty(String county) {
		this.county = county;
	}
	/**
	 * 获取：区县
	 */
	public String getCounty() {
		return county;
	}
	/**
	 * 设置：详细地址
	 */
	public void setArea(String area) {
		this.area = area;
	}
	/**
	 * 获取：详细地址
	 */
	public String getArea() {
		return area;
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
	 * 设置：状态: 0.在售 1.下架
	 */
	public void setStatus(Integer status) {
		this.status = status;
	}
	/**
	 * 获取：状态: 0.在售 1.下架
	 */
	public Integer getStatus() {
		return status;
	}
	/**
	 * 设置：成交数量
	 */
	public void setNum(Integer num) {
		this.num = num;
	}
	/**
	 * 获取：成交数量
	 */
	public Integer getNum() {
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
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getTransactionTime() {
		return transactionTime;
	}
	/**
	 * 设置：公司id
	 */
	public void setMerchantId(Long merchantId) {
		this.merchantId = merchantId;
	}
	/**
	 * 获取：公司id
	 */
	public Long getMerchantId() {
		return merchantId;
	}
	/**
	 * 设置：部门id
	 */
	public void setDeptId(Long deptId) {
		this.deptId = deptId;
	}
	/**
	 * 获取：部门id
	 */
	public Long getDeptId() {
		return deptId;
	}
	/**
	 * 设置：创建人
	 */
	public void setCreatedBy(Long createdBy) {
		this.createdBy = createdBy;
	}
	/**
	 * 获取：创建人
	 */
	public Long getCreatedBy() {
		return createdBy;
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
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getCreatedTime() {
		return createdTime;
	}
	/**
	 * 设置：修改人
	 */
	public void setUpdatedBy(Long updatedBy) {
		this.updatedBy = updatedBy;
	}
	/**
	 * 获取：修改人
	 */
	public Long getUpdatedBy() {
		return updatedBy;
	}
	/**
	 * 设置：修改时间
	 */
	public void setUpdatedTime(Date updatedTime) {
		this.updatedTime = updatedTime;
	}
	/**
	 * 获取：修改时间
	 */
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getUpdatedTime() {
		return updatedTime;
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

	public String getProvinceName() {
		return provinceName;
	}

	public void setProvinceName(String provinceName) {
		this.provinceName = provinceName;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public String getCountyName() {
		return countyName;
	}

	public void setCountyName(String countyName) {
		this.countyName = countyName;
	}
}
