package com.wzlue.chain.sys.entity;

import java.io.Serializable;
import java.util.Date;


/**
 * 省份信息表
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-15 16:14:34
 */
public class SysProvincesEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private Integer id;
	//
	private String provinceid;
	//
	private String province;

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
	 * 设置：
	 */
	public void setProvinceid(String provinceid) {
		this.provinceid = provinceid;
	}
	/**
	 * 获取：
	 */
	public String getProvinceid() {
		return provinceid;
	}
	/**
	 * 设置：
	 */
	public void setProvince(String province) {
		this.province = province;
	}
	/**
	 * 获取：
	 */
	public String getProvince() {
		return province;
	}
}
