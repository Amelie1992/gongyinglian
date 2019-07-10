package com.wzlue.chain.agent.entity;

import java.io.Serializable;
import java.util.Date;


/**
 * 代理报盘商品分类信息表
 * 
 * @author 
 * @email 
 * @date 2018-09-01
 */
public class AgentOfferGoodsCategoryEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//主键自增,id
	private Long id;
	//报盘id
	private Long offerId;
	//分类编号
	private Long categoryId;
	//分类名称
	private String categoryName;

	/**
	 * 设置：主键自增,id
	 */
	public void setId(Long id) {
		this.id = id;
	}
	/**
	 * 获取：主键自增,id
	 */
	public Long getId() {
		return id;
	}
	/**
	 * 设置：报盘id
	 */
	public void setOfferId(Long offerId) {
		this.offerId = offerId;
	}
	/**
	 * 获取：报盘id
	 */
	public Long getOfferId() {
		return offerId;
	}
	/**
	 * 设置：分类编号
	 */
	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}
	/**
	 * 获取：分类编号
	 */
	public Long getCategoryId() {
		return categoryId;
	}
	/**
	 * 设置：分类名称
	 */
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	/**
	 * 获取：分类名称
	 */
	public String getCategoryName() {
		return categoryName;
	}
}
