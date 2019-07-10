package com.wzlue.chain.sys.entity;

import java.io.Serializable;
import java.util.Date;


/**
 * 编码规则
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2018-03-27 10:23:47
 */
public class SysNumberRuleEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private Long id;
	//编号类型：
	private String type;
	//规则名称
	private String name;
	//前缀
	private String prefix;
	//日期类型
	private String timeType;
	//流水长度
	private Integer length;
	//示例
	private String sample;
	//状态：
	private String status;
	//创建人
	private Long createBy;
	//创建时间
	private Date createDate;
	//修改人
	private Long updateBy;
	//修改日期
	private Date updateDate;
	//生成此类型的编码的编号数（每天晚上清0，第二天重新计数）
	private Integer numCount;

	public Integer getNumCount() {
		return numCount;
	}

	public void setNumCount(Integer numCount) {
		this.numCount = numCount;
	}

	/**
	 * 设置：
	 */
	public void setId(Long id) {
		this.id = id;
	}
	/**
	 * 获取：
	 */
	public Long getId() {
		return id;
	}
	/**
	 * 设置：编号类型：
	 */
	public void setType(String type) {
		this.type = type;
	}
	/**
	 * 获取：编号类型：
	 */
	public String getType() {
		return type;
	}
	/**
	 * 设置：规则名称
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * 获取：规则名称
	 */
	public String getName() {
		return name;
	}
	/**
	 * 设置：前缀
	 */
	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}
	/**
	 * 获取：前缀
	 */
	public String getPrefix() {
		return prefix;
	}
	/**
	 * 设置：日期类型
	 */
	public void setTimeType(String timeType) {
		this.timeType = timeType;
	}
	/**
	 * 获取：日期类型
	 */
	public String getTimeType() {
		return timeType;
	}
	/**
	 * 设置：流水长度
	 */
	public void setLength(Integer length) {
		this.length = length;
	}
	/**
	 * 获取：流水长度
	 */
	public Integer getLength() {
		return length;
	}
	/**
	 * 设置：示例
	 */
	public void setSample(String sample) {
		this.sample = sample;
	}
	/**
	 * 获取：示例
	 */
	public String getSample() {
		return sample;
	}
	/**
	 * 设置：状态：
	 */
	public void setStatus(String status) {
		this.status = status;
	}
	/**
	 * 获取：状态：
	 */
	public String getStatus() {
		return status;
	}
	/**
	 * 设置：创建人
	 */
	public void setCreateBy(Long createBy) {
		this.createBy = createBy;
	}
	/**
	 * 获取：创建人
	 */
	public Long getCreateBy() {
		return createBy;
	}
	/**
	 * 设置：创建时间
	 */
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	/**
	 * 获取：创建时间
	 */
	public Date getCreateDate() {
		return createDate;
	}
	/**
	 * 设置：修改人
	 */
	public void setUpdateBy(Long updateBy) {
		this.updateBy = updateBy;
	}
	/**
	 * 获取：修改人
	 */
	public Long getUpdateBy() {
		return updateBy;
	}
	/**
	 * 设置：修改日期
	 */
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
	/**
	 * 获取：修改日期
	 */
	public Date getUpdateDate() {
		return updateDate;
	}
}
