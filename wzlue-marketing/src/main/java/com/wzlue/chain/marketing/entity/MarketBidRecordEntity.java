package com.wzlue.chain.marketing.entity;

import java.io.Serializable;
import java.util.Date;
import java.math.BigDecimal;


/**
 * 拍卖出价记录表
 * 
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-09-26 13:48:09
 */
public class MarketBidRecordEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//出价记录表id
	private Long id;
	//拍卖表id
	private Long auctionId;
	//最终出价
	private BigDecimal terminalPrice;
	//拍卖商品名称
	private String commodityName;
	//出价公司id
	private Integer companyId;
	//出价公司名称
	private String companyName;
	//出价时间
	private Date bidTime;
	//状态 0:出局,1:得标
	private Integer status;
	//部门id
	private Integer deptId;
	//创建人(用户id)
	private Integer createBy;
	//授权用户id
	private Integer authorizesId;
	//创建时间
	private Date createDate;
	//修改人
	private Long updateBy;
	//修改时间
	private Date updateDate;
	//删除标识 0：未删除 1：删除
	private Integer delFlag;

	/**
	 * 设置：出价记录表id
	 */
	public void setId(Long id) {
		this.id = id;
	}
	/**
	 * 获取：出价记录表id
	 */
	public Long getId() {
		return id;
	}
	/**
	 * 设置：拍卖表id
	 */
	public void setAuctionId(Long auctionId) {
		this.auctionId = auctionId;
	}
	/**
	 * 获取：拍卖表id
	 */
	public Long getAuctionId() {
		return auctionId;
	}
	/**
	 * 设置：最终出价
	 */
	public void setTerminalPrice(BigDecimal terminalPrice) {
		this.terminalPrice = terminalPrice;
	}
	/**
	 * 获取：最终出价
	 */
	public BigDecimal getTerminalPrice() {
		return terminalPrice;
	}
	/**
	 * 设置：拍卖商品名称
	 */
	public void setCommodityName(String commodityName) {
		this.commodityName = commodityName;
	}
	/**
	 * 获取：拍卖商品名称
	 */
	public String getCommodityName() {
		return commodityName;
	}
	/**
	 * 设置：公司(商家)id
	 */
	public void setCompanyId(Integer companyId) {
		this.companyId = companyId;
	}
	/**
	 * 获取：公司(商家)id
	 */
	public Integer getCompanyId() {
		return companyId;
	}
	/**
	 * 设置：商家名称
	 */
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	/**
	 * 获取：商家名称
	 */
	public String getCompanyName() {
		return companyName;
	}
	/**
	 * 设置：出价时间
	 */
	public void setBidTime(Date bidTime) {
		this.bidTime = bidTime;
	}
	/**
	 * 获取：出价时间
	 */
	public Date getBidTime() {
		return bidTime;
	}
	/**
	 * 设置：状态 0:出局,1:得标
	 */
	public void setStatus(Integer status) {
		this.status = status;
	}
	/**
	 * 获取：状态 0:出局,1:得标
	 */
	public Integer getStatus() {
		return status;
	}
	/**
	 * 设置：部门id
	 */
	public void setDeptId(Integer deptId) {
		this.deptId = deptId;
	}
	/**
	 * 获取：部门id
	 */
	public Integer getDeptId() {
		return deptId;
	}
	/**
	 * 设置：创建人(用户id)
	 */
	public void setCreateBy(Integer createBy) {
		this.createBy = createBy;
	}
	/**
	 * 获取：创建人(用户id)
	 */
	public Integer getCreateBy() {
		return createBy;
	}
	/**
	 * 设置：授权用户id
	 */
	public void setAuthorizesId(Integer authorizesId) {
		this.authorizesId = authorizesId;
	}
	/**
	 * 获取：授权用户id
	 */
	public Integer getAuthorizesId() {
		return authorizesId;
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
	 * 设置：修改时间
	 */
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
	/**
	 * 获取：修改时间
	 */
	public Date getUpdateDate() {
		return updateDate;
	}
	/**
	 * 设置：删除标识 0：未删除 1：删除
	 */
	public void setDelFlag(Integer delFlag) {
		this.delFlag = delFlag;
	}
	/**
	 * 获取：删除标识 0：未删除 1：删除
	 */
	public Integer getDelFlag() {
		return delFlag;
	}
}
