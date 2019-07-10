package com.wzlue.chain.logistics.entity;

import java.io.Serializable;
import java.util.Date;


/**
 * 物流报盘运输线路表
 * 
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-08-16 14:12:25
 */
public class LogisticsOfferAddressEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//主键id
	private Long id;
	//始发地省
	private String province;
	private String provinceName;
	//始发地市
	private String city;
	private String cityName;
	//始发地区
	private String area;
	//始发地详细地址
	private String address;
	//描述
	private String describe;
	//物流报盘id
	private Integer logisticsId;
	//目的地省
	private String provinceEnd;
	private String provinceEndName;
	//目的地市
	private String cityEnd;
	private String cityEndName;
	//目的地区
	private String areaEnd;
	//目的地详细地址
	private String addressEnd;

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public String getCityEndName() {
		return cityEndName;
	}

	public void setCityEndName(String cityEndName) {
		this.cityEndName = cityEndName;
	}

	public String getProvinceName() {
		return provinceName;
	}

	public void setProvinceName(String provinceName) {
		this.provinceName = provinceName;
	}

	public String getProvinceEndName() {
		return provinceEndName;
	}

	public void setProvinceEndName(String provinceEndName) {
		this.provinceEndName = provinceEndName;
	}

	public String getProvinceEnd() {
		return provinceEnd;
	}

	public void setProvinceEnd(String provinceEnd) {
		this.provinceEnd = provinceEnd;
	}

	public String getCityEnd() {
		return cityEnd;
	}

	public void setCityEnd(String cityEnd) {
		this.cityEnd = cityEnd;
	}

	public String getAreaEnd() {
		return areaEnd;
	}

	public void setAreaEnd(String areaEnd) {
		this.areaEnd = areaEnd;
	}

	public String getAddressEnd() {
		return addressEnd;
	}

	public void setAddressEnd(String addressEnd) {
		this.addressEnd = addressEnd;
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
	 * 设置：省
	 */
	public void setProvince(String province) {
		this.province = province;
	}
	/**
	 * 获取：省
	 */
	public String getProvince() {
		return province;
	}
	/**
	 * 设置：市
	 */
	public void setCity(String city) {
		this.city = city;
	}
	/**
	 * 获取：市
	 */
	public String getCity() {
		return city;
	}
	/**
	 * 设置：区
	 */
	public void setArea(String area) {
		this.area = area;
	}
	/**
	 * 获取：区
	 */
	public String getArea() {
		return area;
	}
	/**
	 * 设置：详细地址
	 */
	public void setAddress(String address) {
		this.address = address;
	}
	/**
	 * 获取：详细地址
	 */
	public String getAddress() {
		return address;
	}
	/**
	 * 设置：描述
	 */
	public void setDescribe(String describe) {
		this.describe = describe;
	}
	/**
	 * 获取：描述
	 */
	public String getDescribe() {
		return describe;
	}
	/**
	 * 设置：物流报盘id
	 */
	public void setLogisticsId(Integer logisticsId) {
		this.logisticsId = logisticsId;
	}
	/**
	 * 获取：物流报盘id
	 */
	public Integer getLogisticsId() {
		return logisticsId;
	}
}
