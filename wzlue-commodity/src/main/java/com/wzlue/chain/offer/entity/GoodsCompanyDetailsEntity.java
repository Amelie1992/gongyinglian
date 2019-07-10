package com.wzlue.chain.offer.entity;

import java.io.Serializable;


/**
 * 货物公司详情
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-15 14:30:02
 */
public class GoodsCompanyDetailsEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private Long id;
	//商家公司id
	private String companyId;
	//
	private String companyName;
	//历史成交数量
	private Long transactionsCount;
	//毁约数量
	private Long renegeCount;
	//企业联系人id
	private String companyContactsId;
	//企业联系人名称
	private String companyContactsName;
	//企业联系人电话
	private String companyContactsPhone;

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
	 * 设置：商家公司id
	 */
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	/**
	 * 获取：商家公司id
	 */
	public String getCompanyId() {
		return companyId;
	}
	/**
	 * 设置：
	 */
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	/**
	 * 获取：
	 */
	public String getCompanyName() {
		return companyName;
	}
	/**
	 * 设置：历史成交数量
	 */
	public void setTransactionsCount(Long transactionsCount) {
		this.transactionsCount = transactionsCount;
	}
	/**
	 * 获取：历史成交数量
	 */
	public Long getTransactionsCount() {
		return transactionsCount;
	}
	/**
	 * 设置：毁约数量
	 */
	public void setRenegeCount(Long renegeCount) {
		this.renegeCount = renegeCount;
	}
	/**
	 * 获取：毁约数量
	 */
	public Long getRenegeCount() {
		return renegeCount;
	}
	/**
	 * 设置：企业联系人id
	 */
	public void setCompanyContactsId(String companyContactsId) {
		this.companyContactsId = companyContactsId;
	}
	/**
	 * 获取：企业联系人id
	 */
	public String getCompanyContactsId() {
		return companyContactsId;
	}
	/**
	 * 设置：企业联系人名称
	 */
	public void setCompanyContactsName(String companyContactsName) {
		this.companyContactsName = companyContactsName;
	}
	/**
	 * 获取：企业联系人名称
	 */
	public String getCompanyContactsName() {
		return companyContactsName;
	}
	/**
	 * 设置：企业联系人电话
	 */
	public void setCompanyContactsPhone(String companyContactsPhone) {
		this.companyContactsPhone = companyContactsPhone;
	}
	/**
	 * 获取：企业联系人电话
	 */
	public String getCompanyContactsPhone() {
		return companyContactsPhone;
	}
}
