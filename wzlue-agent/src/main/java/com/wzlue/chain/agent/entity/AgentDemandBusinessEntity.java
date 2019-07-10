package com.wzlue.chain.agent.entity;

import java.io.Serializable;
import java.util.Date;


/**
 * 代理(求购)项目信息表
 * 
 * @author 
 * @email 
 * @date 2018-09-10 17:54:11
 */
public class AgentDemandBusinessEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//自增主键,id
	private Long id;
	//求购id
	private Long demandId;
	//服务类型编号 1.货物 2.物流 3.仓储 4.报关
	private Long busId;
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
	 * 设置：求购id
	 */
	public void setDemandId(Long demandId) {
		this.demandId = demandId;
	}
	/**
	 * 获取：求购id
	 */
	public Long getDemandId() {
		return demandId;
	}
	/**
	 * 设置：服务类型编号 1.货物 2.物流 3.仓储 4.报关
	 */
	public void setBusId(Long busId) {
		this.busId = busId;
	}
	/**
	 * 获取：服务类型编号 1.货物 2.物流 3.仓储 4.报关
	 */
	public Long getBusId() {
		return busId;
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
