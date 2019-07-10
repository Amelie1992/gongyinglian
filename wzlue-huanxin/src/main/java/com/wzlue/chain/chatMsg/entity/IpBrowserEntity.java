package com.wzlue.chain.chatMsg.entity;

import java.io.Serializable;
import java.util.Date;


/**
 * 
 * 
 * @author 
 * @email 
 * @date 2018-09-19 14:08:31
 */
public class IpBrowserEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private Integer id;
	//ip
	private String ip;
	//城市
	private String cityname;
	//浏览器
	private String browser;

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
	 * 设置：ip
	 */
	public void setIp(String ip) {
		this.ip = ip;
	}
	/**
	 * 获取：ip
	 */
	public String getIp() {
		return ip;
	}
	/**
	 * 设置：城市
	 */
	public void setCityname(String cityname) {
		this.cityname = cityname;
	}
	/**
	 * 获取：城市
	 */
	public String getCityname() {
		return cityname;
	}
	/**
	 * 设置：浏览器
	 */
	public void setBrowser(String browser) {
		this.browser = browser;
	}
	/**
	 * 获取：浏览器
	 */
	public String getBrowser() {
		return browser;
	}
}
