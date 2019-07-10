package com.wzlue.chain.agent.entity;

import java.io.Serializable;
import java.util.Date;


/**
 * 代理(订单)服务信息表
 * 
 * @author 
 * @email 
 * @date 2018-08-30 15:40:41
 */
public class AgentOrderBusinessEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//自增主键,id
	private Long id;
	//订单编号
	private String orderNumber;
	//来源判断表示 0.无来源 1.来源货物订单 2.来源物流订单 3.来源仓储订单 4来源报关订单
	private Integer originFlag;
	//来源单号
	private String originNumber;
	//服务类型编号 1.货物 2.物流 3.仓储 4.报关
	private Integer busType;
	//服务类型名称
	private String busName;

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
	 * 设置：订单编号
	 */
	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}
	/**
	 * 获取：订单编号
	 */
	public String getOrderNumber() {
		return orderNumber;
	}
	/**
	 * 设置：来源判断表示 0.无来源 1.来源货物订单 2.来源物流订单 3.来源仓储订单 4来源报关订单
	 */
	public void setOriginFlag(Integer originFlag) {
		this.originFlag = originFlag;
	}
	/**
	 * 获取：来源判断表示 0.无来源 1.来源货物订单 2.来源物流订单 3.来源仓储订单 4来源报关订单
	 */
	public Integer getOriginFlag() {
		return originFlag;
	}
	/**
	 * 设置：来源单号
	 */
	public void setOriginNumber(String originNumber) {
		this.originNumber = originNumber;
	}
	/**
	 * 获取：来源单号
	 */
	public String getOriginNumber() {
		return originNumber;
	}
	/**
	 * 设置：服务类型编号 1.货物 2.物流 3.仓储 4.报关
	 */
	public void setBusType(Integer busType) {
		this.busType = busType;
	}
	/**
	 * 获取：服务类型编号 1.货物 2.物流 3.仓储 4.报关
	 */
	public Integer getBusType() {
		return busType;
	}
	/**
	 * 设置：服务类型名称
	 */
	public void setBusName(String busName) {
		this.busName = busName;
	}
	/**
	 * 获取：服务类型名称
	 */
	public String getBusName() {
		return busName;
	}
}
