package com.wzlue.chain.logistics.entity;

import java.io.Serializable;
import java.util.Date;


/**
 * 物流订单发货表
 * 
 * @author 
 * @email 
 * @date 2018-11-27 10:20:15
 */
public class LogisticsOrderShipEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//主键id
	private Long id;
	//订单id
	private String orderId;
	//物流公司id
	private Integer logisticsCompanyId;
	//物流公司编码
	private String logisticsCode;
	//物流单号
	private String logisticsNumber;
	//车牌号
	private String numberPlate;
	//驾驶员姓名
	private String driverName;
	//驾驶员号码
	private String driverNumber;
	//驾驶员身份证号
	private String driverIdNumber;
	//备注。
	private String remark;

	public String getLogisticsCode() {
		return logisticsCode;
	}

	public void setLogisticsCode(String logisticsCode) {
		this.logisticsCode = logisticsCode;
	}

	/**
	 * 设置：主键id
	 */
	public void setId(Long id) {
		this.id = id;
	}
	/**
	 * 获取：主键id
	 */
	public Long getId() {
		return id;
	}
	/**
	 * 设置：订单id
	 */
	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	/**
	 * 设置：物流公司id
	 */
	public void setLogisticsCompanyId(Integer logisticsCompanyId) {
		this.logisticsCompanyId = logisticsCompanyId;
	}
	/**
	 * 获取：物流公司id
	 */
	public Integer getLogisticsCompanyId() {
		return logisticsCompanyId;
	}
	/**
	 * 设置：物流单号
	 */
	public void setLogisticsNumber(String logisticsNumber) {
		this.logisticsNumber = logisticsNumber;
	}
	/**
	 * 获取：物流单号
	 */
	public String getLogisticsNumber() {
		return logisticsNumber;
	}
	/**
	 * 设置：车牌号
	 */
	public void setNumberPlate(String numberPlate) {
		this.numberPlate = numberPlate;
	}
	/**
	 * 获取：车牌号
	 */
	public String getNumberPlate() {
		return numberPlate;
	}
	/**
	 * 设置：驾驶员姓名
	 */
	public void setDriverName(String driverName) {
		this.driverName = driverName;
	}
	/**
	 * 获取：驾驶员姓名
	 */
	public String getDriverName() {
		return driverName;
	}
	/**
	 * 设置：驾驶员号码
	 */
	public void setDriverNumber(String driverNumber) {
		this.driverNumber = driverNumber;
	}
	/**
	 * 获取：驾驶员号码
	 */
	public String getDriverNumber() {
		return driverNumber;
	}
	/**
	 * 设置：驾驶员身份证号
	 */
	public void setDriverIdNumber(String driverIdNumber) {
		this.driverIdNumber = driverIdNumber;
	}
	/**
	 * 获取：驾驶员身份证号
	 */
	public String getDriverIdNumber() {
		return driverIdNumber;
	}
	/**
	 * 设置：备注。
	 */
	public void setRemark(String remark) {
		this.remark = remark;
	}
	/**
	 * 获取：备注。
	 */
	public String getRemark() {
		return remark;
	}
}
