package com.wzlue.chain.complaint.entity;

import com.wzlue.chain.order.entity.GoodsOrderCinfoEntity;
import com.wzlue.chain.order.entity.GoodsOrderDetailEntity;
import com.wzlue.chain.sys.entity.ImageEntity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;


/**
 * 投诉管理
 * 
 * @author 
 * @email 
 * @date 2018-09-07 09:42:11
 */
public class ComplaintEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private Integer id;
	//投诉用户
	private String complaintFrom;
	//被投诉用户
	private String complaintTo;
	//订单号
	private String orderId;
	//投诉时间
	private Date complaintTime;
	//投诉原因
	private String reason;
	//投诉凭证	(可上传多张图片)
	private List<ImageEntity> images;
	//处理状态 0 : 待处理 1 : 处理中 2 : 完结
	private Integer status;
	//处理结果 0 : 通过 1 : 不通过
	private Integer result;
	//处理意见
	private String suggestion;
	//权限部门id
	private Integer deptId;
	//创建人
	private Integer createBy;
	//创建时间
	private Date createdTime;
	//修改人
	private Integer updateBy;
	//修改时间
	private Date updateTime;
	//公司id
	private Integer companyId;
	//授权用户id
	private Integer authorizesId;
	//投诉用户
	private Integer complaintFromId;
	//被投诉用户
	private Integer complaintToId;
	//订单类型  0：报关 1：货物 2：物流 3：仓储 4：代理
	private Integer orderType;

	//货物详情
	private List<GoodsOrderDetailEntity> detail;

	//收货人信息
	private GoodsOrderCinfoEntity cinfo;

	public Integer getOrderType() {
		return orderType;
	}

	public void setOrderType(Integer orderType) {
		this.orderType = orderType;
	}

	public Integer getComplaintFromId() {
		return complaintFromId;
	}

	public void setComplaintFromId(Integer complaintFromId) {
		this.complaintFromId = complaintFromId;
	}

	public Integer getComplaintToId() {
		return complaintToId;
	}

	public void setComplaintToId(Integer complaintToId) {
		this.complaintToId = complaintToId;
	}

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
	 * 设置：投诉用户
	 */
	public void setComplaintFrom(String complaintFrom) {
		this.complaintFrom = complaintFrom;
	}
	/**
	 * 获取：投诉用户
	 */
	public String getComplaintFrom() {
		return complaintFrom;
	}
	/**
	 * 设置：被投诉用户
	 */
	public void setComplaintTo(String complaintTo) {
		this.complaintTo = complaintTo;
	}
	/**
	 * 获取：被投诉用户
	 */
	public String getComplaintTo() {
		return complaintTo;
	}
	/**
	 * 设置：订单号
	 */
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	/**
	 * 获取：订单号
	 */
	public String getOrderId() {
		return orderId;
	}
	/**
	 * 设置：投诉时间
	 */
	public void setComplaintTime(Date complaintTime) {
		this.complaintTime = complaintTime;
	}
	/**
	 * 获取：投诉时间
	 */
	public Date getComplaintTime() {
		return complaintTime;
	}
	/**
	 * 设置：投诉凭证
	 */
	public void setImages(List<ImageEntity> images) {
		this.images = images;
	}
	/**
	 * 获取：投诉凭证
	 */
	public List<ImageEntity> getImages() {
		return images;
	}
	/**
	 * 设置：投诉原因
	 */
	public void setReason(String reason) {
		this.reason = reason;
	}
	/**
	 * 获取：投诉原因
	 */
	public String getReason() {
		return reason;
	}

	/**
	 * 设置：处理状态 0 : 待处理 1 : 处理中 2 : 完结
	 */
	public void setStatus(Integer status) {
		this.status = status;
	}
	/**
	 * 获取：处理状态 0 : 待处理 1 : 处理中 2 : 完结
	 */
	public Integer getStatus() {
		return status;
	}
	/**
	 * 设置：处理结果 0 : 通过 1 : 不通过
	 */
	public void setResult(Integer result) {
		this.result = result;
	}
	/**
	 * 获取：处理结果 0 : 通过 1 : 不通过
	 */
	public Integer getResult() {
		return result;
	}
	/**
	 * 设置：处理意见
	 */
	public void setSuggestion(String suggestion) {
		this.suggestion = suggestion;
	}
	/**
	 * 获取：处理意见
	 */
	public String getSuggestion() {
		return suggestion;
	}
	/**
	 * 设置：权限部门id
	 */
	public void setDeptId(Integer deptId) {
		this.deptId = deptId;
	}
	/**
	 * 获取：权限部门id
	 */
	public Integer getDeptId() {
		return deptId;
	}
	/**
	 * 设置：创建人
	 */
	public void setCreateBy(Integer createBy) {
		this.createBy = createBy;
	}
	/**
	 * 获取：创建人
	 */
	public Integer getCreateBy() {
		return createBy;
	}
	/**
	 * 设置：创建时间
	 */
	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}
	/**
	 * 获取：创建时间
	 */
	public Date getCreatedTime() {
		return createdTime;
	}
	/**
	 * 设置：修改人
	 */
	public void setUpdateBy(Integer updateBy) {
		this.updateBy = updateBy;
	}
	/**
	 * 获取：修改人
	 */
	public Integer getUpdateBy() {
		return updateBy;
	}
	/**
	 * 设置：修改时间
	 */
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	/**
	 * 获取：修改时间
	 */
	public Date getUpdateTime() {
		return updateTime;
	}

	public Integer getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Integer companyId) {
		this.companyId = companyId;
	}

	public Integer getAuthorizesId() {
		return authorizesId;
	}

	public void setAuthorizesId(Integer authorizesId) {
		this.authorizesId = authorizesId;
	}

	/**
	 * 获取：货物详情
	 *
	 * @return
	 */
	public List<GoodsOrderDetailEntity> getDetail() {
		return detail;
	}

	/**
	 * 设置：货物详情
	 *
	 * @param detail
	 */
	public void setDetail(List<GoodsOrderDetailEntity> detail) {
		this.detail = detail;
	}

	/**
	 * 获取：收货人信息
	 */
	public GoodsOrderCinfoEntity getCinfo() {
		return cinfo;
	}

	/**
	 * 设置：收货人信息
	 */
	public void setCinfo(GoodsOrderCinfoEntity cinfo) {
		this.cinfo = cinfo;
	}
}
