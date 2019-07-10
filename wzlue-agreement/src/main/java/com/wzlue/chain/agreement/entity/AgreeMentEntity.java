package com.wzlue.chain.agreement.entity;

import java.io.Serializable;


/**
 * 
 * 
 * @author 
 * @email 
 * @date 2018-11-05 17:34:33
 */
public class AgreeMentEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private Integer xieyiId;
	//
	private String xieyiType;
	//
	private String xieyiContent;

	/**
	 * 设置：
	 */
	public void setXieyiId(Integer xieyiId) {
		this.xieyiId = xieyiId;
	}
	/**
	 * 获取：
	 */
	public Integer getXieyiId() {
		return xieyiId;
	}
	/**
	 * 设置：
	 */
	public void setXieyiType(String xieyiType) {
		this.xieyiType = xieyiType;
	}
	/**
	 * 获取：
	 */
	public String getXieyiType() {
		return xieyiType;
	}
	/**
	 * 设置：
	 */
	public void setXieyiContent(String xieyiContent) {
		this.xieyiContent = xieyiContent;
	}
	/**
	 * 获取：
	 */
	public String getXieyiContent() {
		return xieyiContent;
	}
}
