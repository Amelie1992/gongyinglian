package com.wzlue.chain.highcharts.entity;

import java.io.Serializable;


/**
 * 报表
 * 
 * @author 
 * @email 
 * @date 2019-01-14 11:21:59
 */
public class HighchartsEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//主键
	private Integer id;

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
}
