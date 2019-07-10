package com.wzlue.chain.ship.entity;

import java.io.Serializable;
import java.util.Date;


/**
 * 订单发货明细表(国内)
 * 
 * @author 
 * @email 
 * @date 2018-09-25 13:58:00
 */
public class GoodsOrderShipEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private Integer id;
	//订单关联编号
	private String orderId;
	//物流公司编码
	private String logisticsCode;
	//物流单号
	private String singleNumber;
	//车牌号
	private String numberPlate;
	//驾驶员名称
	private String driverName;
	//驾驶员号码
	private String driverNumber;
	//驾驶员身份证号
	private String driverIdNumber;
	//备注
	private String remark;

	/**
	 * 设置：
	 */
	public void setId(Integer id) {
		this.id = id;
	}
	/**
	 * 获取：
	 */
	public Integer getId() {
		return id;
	}
	/**
	 * 设置：订单关联编号
	 */
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	/**
	 * 获取：订单关联编号
	 */
	public String getOrderId() {
		return orderId;
	}
	/**
	 * 设置：物流公司编码
	 */
	public void setLogisticsCode(String logisticsCode) {
		this.logisticsCode = logisticsCode;
	}
	/**
	 * 获取：物流公司编码
	 */
	public String getLogisticsCode() {
		return logisticsCode;
	}
	/**
	 * 设置：物流单号
	 */
	public void setSingleNumber(String singleNumber) {
		this.singleNumber = singleNumber;
	}
	/**
	 * 获取：物流单号
	 */
	public String getSingleNumber() {
		return singleNumber;
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
	 * 设置：驾驶员名称
	 */
	public void setDriverName(String driverName) {
		this.driverName = driverName;
	}
	/**
	 * 获取：驾驶员名称
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
}
