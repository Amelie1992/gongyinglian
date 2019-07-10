package com.wzlue.chain.afterSale.entity;



import com.wzlue.chain.sys.entity.ImageEntity;

import java.io.Serializable;
import java.util.Date;
import java.math.BigDecimal;
import java.util.List;


/**
 * 售后服务
 *
 * @author
 * @email
 * @date 2018-08-31 13:38:09
 */
public class AfterSaleEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    //
    private Integer id;
    //索赔/退换货编号
    private String code;
    //订单号
    private String orderId;
    //买家
    private String buyer;
    //卖家
    private String seller;
    //服务类型0：退货 1： 换货 2：索赔
    private Integer serviceType;
    //索赔/退换货数量
    private Integer quantity;
    //退款方式 0：线上支付 1： 线下转账 2：其他
    private Integer refundForm;
    //原因 0：物品损坏 1： 质量不合格 2：产品型号错误 3：其他
    private Integer reason;
    //问题描述
    private String description;
    //	//图片信息
//	private String imageUrl;
    //图片集合	(可上传多张图片)
    private List<ImageEntity> images;
    //申请日期
    private Date applicationDate;
    //处理状态 0：待处理 1： 已处理
    private Integer status;
    //处理结果 0：通过 1：不通过
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
    //买家id
    private Integer buyerId;
    //卖家id
    private Integer sellerId;
    //订单类型  0：报关 1：货物 2：物流 3：仓储 4：代理
    private Integer orderType;
    //售后商品集合
    private List<AfterSaleGoodsEntity> goods;

    public List<AfterSaleGoodsEntity> getGoods() {
        return goods;
    }

    public void setGoods(List<AfterSaleGoodsEntity> goods) {
        this.goods = goods;
    }

    public Integer getOrderType() {
        return orderType;
    }

    public void setOrderType(Integer orderType) {
        this.orderType = orderType;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    public Integer getId() {
        return id;
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

    public Integer getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(Integer buyerId) {
        this.buyerId = buyerId;
    }

    public Integer getSellerId() {
        return sellerId;
    }

    public void setSellerId(Integer sellerId) {
        this.sellerId = sellerId;
    }

    /**
     * 设置：索赔/退换货编号
     */
    public void setCode(String code) {
        this.code = code;
    }

    /**
     * 获取：索赔/退换货编号
     */
    public String getCode() {
        return code;
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
     * 设置：买家
     */
    public void setBuyer(String buyer) {
        this.buyer = buyer;
    }

    /**
     * 获取：买家
     */
    public String getBuyer() {
        return buyer;
    }

    /**
     * 设置：卖家
     */
    public void setSeller(String seller) {
        this.seller = seller;
    }

    /**
     * 获取：卖家
     */
    public String getSeller() {
        return seller;
    }

    /**
     * 设置：服务类型0：退货 1： 换货 2：索赔
     */
    public void setServiceType(Integer serviceType) {
        this.serviceType = serviceType;
    }

    /**
     * 获取：服务类型0：退货 1： 换货 2：索赔
     */
    public Integer getServiceType() {
        return serviceType;
    }

    /**
     * 设置：索赔/退换货数量
     */
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    /**
     * 获取：索赔/退换货数量
     */
    public Integer getQuantity() {
        return quantity;
    }

    /**
     * 设置：退款方式 0：银联 1： 转账
     */
    public void setRefundForm(Integer refundForm) {
        this.refundForm = refundForm;
    }

    /**
     * 获取：退款方式 0：银联 1： 转账
     */
    public Integer getRefundForm() {
        return refundForm;
    }

    /**
     * 设置：原因 0：物品损坏 1： 质量不合格 2：产品型号错误 3：其他
     */
    public void setReason(Integer reason) {
        this.reason = reason;
    }

    /**
     * 获取：原因 0：物品损坏 1： 质量不合格 2：产品型号错误 3：其他
     */
    public Integer getReason() {
        return reason;
    }

    /**
     * 设置：问题描述
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * 获取：问题描述
     */
    public String getDescription() {
        return description;
    }

    /**
     * 设置：图片信息
     */
//    public void setImageUrl(String imageUrl) {
//        this.imageUrl = imageUrl;
//    }

    public void setImages(List<ImageEntity> images) {
        this.images = images;
    }

    /**
     * 获取：图片信息
     */
//    public String getImageUrl() {
//        return imageUrl;
//    }

    public List<ImageEntity> getImages() {
        return images;
    }

    /**
     * 设置：申请日期
     */
    public void setApplicationDate(Date applicationDate) {
        this.applicationDate = applicationDate;
    }

    /**
     * 获取：申请日期
     */
    public Date getApplicationDate() {
        return applicationDate;
    }

    /**
     * 设置：处理状态 0：待处理 1： 已处理
     */
    public void setStatus(Integer status) {
        this.status = status;
    }

    /**
     * 获取：处理状态 0：待处理 1： 已处理
     */
    public Integer getStatus() {
        return status;
    }

    /**
     * 设置：处理结果 0：通过 1：不通过
     */
    public void setResult(Integer result) {
        this.result = result;
    }

    /**
     * 获取：处理结果 0：通过 1：不通过
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
}
