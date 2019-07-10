package com.wzlue.chain.company.entity;

import java.io.Serializable;
import java.util.Date;


/**
 * 公司类型
 * 
 * @author 
 * @email 
 * @date 2018-09-05 11:15:33
 */
public class CompanyTypeEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//主键
	private Integer id;
	//公司类型名称
	private String typeName;
	//创建人
	private Integer createId;
	//创建组
	private Integer createOrganize;
	//排序
	private Integer sortNum;
	//创建时间
	private Date createTime;
	//状态  1OK，2NO
	private String delFlag;

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
	 * 设置：公司类型名称
	 */
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	/**
	 * 获取：公司类型名称
	 */
	public String getTypeName() {
		return typeName;
	}
	/**
	 * 设置：创建人
	 */
	public void setCreateId(Integer createId) {
		this.createId = createId;
	}
	/**
	 * 获取：创建人
	 */
	public Integer getCreateId() {
		return createId;
	}
	/**
	 * 设置：创建组
	 */
	public void setCreateOrganize(Integer createOrganize) {
		this.createOrganize = createOrganize;
	}
	/**
	 * 获取：创建组
	 */
	public Integer getCreateOrganize() {
		return createOrganize;
	}
	/**
	 * 设置：
	 */
	public void setSortNum(Integer sortNum) {
		this.sortNum = sortNum;
	}
	/**
	 * 获取：
	 */
	public Integer getSortNum() {
		return sortNum;
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
	 * 设置：状态  1OK，2NO
	 */
	public void setDelFlag(String delFlag) {
		this.delFlag = delFlag;
	}
	/**
	 * 获取：状态  1OK，2NO
	 */
	public String getDelFlag() {
		return delFlag;
	}
}
