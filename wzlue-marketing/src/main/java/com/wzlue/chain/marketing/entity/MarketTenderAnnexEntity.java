package com.wzlue.chain.marketing.entity;

import java.io.Serializable;
import java.util.Date;


/**
 * 竞拍附件信息表
 * 
 * @author 
 * @email 
 * @date 2019-04-15 17:30:28
 */
public class MarketTenderAnnexEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//自增主键,id
	private Long id;
	//竞标id
	private Long marketTenderId;
	//文件名
	private String fileName;
	//文件路径
	private String url;
	//文件类型 例: jpg png gif zip gz rar...
	private String fileType;
	//
	private Date createTime;
	//
	private String createBy;

	/**
	 * 设置：自增主键,id
	 */
	public void setId(Long id) {
		this.id = id;
	}
	/**
	 * 获取：自增主键,id
	 */
	public Long getId() {
		return id;
	}
	/**
	 * 设置：竞标id
	 */
	public void setMarketTenderId(Long marketTenderId) {
		this.marketTenderId = marketTenderId;
	}
	/**
	 * 获取：竞标id
	 */
	public Long getMarketTenderId() {
		return marketTenderId;
	}
	/**
	 * 设置：文件名
	 */
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	/**
	 * 获取：文件名
	 */
	public String getFileName() {
		return fileName;
	}
	/**
	 * 设置：文件路径
	 */
	public void setUrl(String url) {
		this.url = url;
	}
	/**
	 * 获取：文件路径
	 */
	public String getUrl() {
		return url;
	}
	/**
	 * 设置：文件类型 例: jpg png gif zip gz rar...
	 */
	public void setFileType(String fileType) {
		this.fileType = fileType;
	}
	/**
	 * 获取：文件类型 例: jpg png gif zip gz rar...
	 */
	public String getFileType() {
		return fileType;
	}
	/**
	 * 设置：
	 */
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	/**
	 * 获取：
	 */
	public Date getCreateTime() {
		return createTime;
	}
	/**
	 * 设置：
	 */
	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}
	/**
	 * 获取：
	 */
	public String getCreateBy() {
		return createBy;
	}
}
