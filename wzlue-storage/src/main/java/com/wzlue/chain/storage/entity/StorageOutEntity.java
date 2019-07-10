package com.wzlue.chain.storage.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;
import java.util.List;


/**
 * 仓储出库
 * 
 * @author 
 * @email 
 * @date 2018-09-15 11:17:18
 */
public class StorageOutEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private Long id;
	//出库单号
	private String code;
	//出库公司id
	private Long companyId;
	//提货司机姓名
	private String contact;
	//提货司机电话
	private String phone;
	//身份证号
	private String card;
	//车牌号
	private String vehicleNumber;
	//预计提货时间
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date takeTime;
	//0:押车；1:不押车
	private String escort;
	//0：要抄码；1：不抄码
	private String copeCode;
	//备注
	private String remark;
	//0:发送邮件；1：不发送邮件
	private String email;
	//状态：0：待出库；1：已出库；
	private Integer status;
	//公司id
	private Long merchantId;
	//部门id
	private Long deptId;
	//创建人
	private Long createBy;
	//创建时间
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date createTime;
	//修改人
	private Long updateBy;
	//修改时间
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date updateTime;
	//删除标识 0：未删除 1：删除
	private Integer delFlag;

	private List<StorageOutCommodityEntity> commodityEntityList;

	private String companyName;//仓库公司名称
	private String merchantName;//买家公司名称
	private String storageName;//仓库名称

	private OrderCostEntity orderCost;//仓储订单其他费用

	public OrderCostEntity getOrderCost() {
		return orderCost;
	}

	public void setOrderCost(OrderCostEntity orderCost) {
		this.orderCost = orderCost;
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
	 * 设置：出库单号
	 */
	public void setCode(String code) {
		this.code = code;
	}
	/**
	 * 获取：出库单号
	 */
	public String getCode() {
		return code;
	}
	/**
	 * 设置：出库公司id
	 */
	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}
	/**
	 * 获取：出库公司id
	 */
	public Long getCompanyId() {
		return companyId;
	}
	/**
	 * 设置：提货司机姓名
	 */
	public void setContact(String contact) {
		this.contact = contact;
	}
	/**
	 * 获取：提货司机姓名
	 */
	public String getContact() {
		return contact;
	}
	/**
	 * 设置：提货司机电话
	 */
	public void setPhone(String phone) {
		this.phone = phone;
	}
	/**
	 * 获取：提货司机电话
	 */
	public String getPhone() {
		return phone;
	}
	/**
	 * 设置：身份证号
	 */
	public void setCard(String card) {
		this.card = card;
	}
	/**
	 * 获取：身份证号
	 */
	public String getCard() {
		return card;
	}
	/**
	 * 设置：车牌号
	 */
	public void setVehicleNumber(String vehicleNumber) {
		this.vehicleNumber = vehicleNumber;
	}
	/**
	 * 获取：车牌号
	 */
	public String getVehicleNumber() {
		return vehicleNumber;
	}
	/**
	 * 设置：预计提货时间
	 */
	public void setTakeTime(Date takeTime) {
		this.takeTime = takeTime;
	}
	/**
	 * 获取：预计提货时间
	 */
	@JsonFormat(pattern = "yyyy-MM-dd")
	public Date getTakeTime() {
		return takeTime;
	}
	/**
	 * 设置：0:押车；1:不押车
	 */
	public void setEscort(String escort) {
		this.escort = escort;
	}
	/**
	 * 获取：0:押车；1:不押车
	 */
	public String getEscort() {
		return escort;
	}
	/**
	 * 设置：0：要抄码；1：不抄码
	 */
	public void setCopeCode(String copeCode) {
		this.copeCode = copeCode;
	}
	/**
	 * 获取：0：要抄码；1：不抄码
	 */
	public String getCopeCode() {
		return copeCode;
	}
	/**
	 * 设置：备注
	 */
	public void setRemark(String remark) {
		this.remark = remark;
	}
	/**
	 * 获取：备注
	 */
	public String getRemark() {
		return remark;
	}
	/**
	 * 设置：0:发送邮件；1：不发送邮件
	 */
	public void setEmail(String email) {
		this.email = email;
	}
	/**
	 * 获取：0:发送邮件；1：不发送邮件
	 */
	public String getEmail() {
		return email;
	}
	/**
	 * 设置：状态：0：待出库；1：已出库；
	 */
	public void setStatus(Integer status) {
		this.status = status;
	}
	/**
	 * 获取：状态：0：待出库；1：已出库；
	 */
	public Integer getStatus() {
		return status;
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
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
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
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getUpdateTime() {
		return updateTime;
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

	public List<StorageOutCommodityEntity> getCommodityEntityList() {
		return commodityEntityList;
	}

	public void setCommodityEntityList(List<StorageOutCommodityEntity> commodityEntityList) {
		this.commodityEntityList = commodityEntityList;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getMerchantName() {
		return merchantName;
	}

	public void setMerchantName(String merchantName) {
		this.merchantName = merchantName;
	}

	public String getStorageName() {
		return storageName;
	}

	public void setStorageName(String storageName) {
		this.storageName = storageName;
	}
}
