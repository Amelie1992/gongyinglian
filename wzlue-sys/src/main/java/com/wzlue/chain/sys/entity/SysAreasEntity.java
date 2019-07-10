package com.wzlue.chain.sys.entity;

import java.io.Serializable;
import java.util.Date;


/**
 * 行政区域县区信息表
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-15 16:14:34
 */
public class SysAreasEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private Integer id;
	//
	private String areaid;
	//
	private String area;
	//
	private String cityid;

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
	public void setAreaid(String areaid) {
		this.areaid = areaid;
	}
	/**
	 * 获取：
	 */
	public String getAreaid() {
		return areaid;
	}
	/**
	 * 设置：
	 */
	public void setArea(String area) {
		this.area = area;
	}
	/**
	 * 获取：
	 */
	public String getArea() {
		return area;
	}
	/**
	 * 设置：
	 */
	public void setCityid(String cityid) {
		this.cityid = cityid;
	}
	/**
	 * 获取：
	 */
	public String getCityid() {
		return cityid;
	}
}
