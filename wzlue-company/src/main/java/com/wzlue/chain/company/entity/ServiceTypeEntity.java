package com.wzlue.chain.company.entity;

import java.io.Serializable;
import java.util.Date;


/**
 * 服务类型
 * 
 * @author 
 * @email 
 * @date 2018-08-16 16:47:00
 */
public class ServiceTypeEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//主键
	private Integer id;
	//服务名称
	private String serviceName;
	//更新时间
	private Date updateTime;
	//创建时间
	private Date createTime;
	//是否删除  -1：已删除  0：正常
	private Integer delFlag;

	/**
	 * 设置：主键
	 */
	public void setId(Integer id) {
		this.id = id;
	}
	/**
	 * 获取：主键
	 */
	public Integer getId() {
		return id;
	}
	/**
	 * 设置：服务名称
	 */
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
	/**
	 * 获取：服务名称
	 */
	public String getServiceName() {
		return serviceName;
	}
	/**
	 * 设置：更新时间
	 */
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	/**
	 * 获取：更新时间
	 */
	public Date getUpdateTime() {
		return updateTime;
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
	 * 设置：是否删除  -1：已删除  0：正常
	 */
	public void setDelFlag(Integer delFlag) {
		this.delFlag = delFlag;
	}
	/**
	 * 获取：是否删除  -1：已删除  0：正常
	 */
	public Integer getDelFlag() {
		return delFlag;
	}
}
