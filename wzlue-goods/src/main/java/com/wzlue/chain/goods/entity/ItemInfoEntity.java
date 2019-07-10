package com.wzlue.chain.goods.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * 商品库(商品信息) 实体类
 */
public class ItemInfoEntity {
    private static final long serialVersionUID = 1L;

    //主键自增
    private Long id;
    //商品名称
    private String itemName;
    //商品编码
    private String itemCode;
    //FK:商品分类id
    private Integer categoryId;
    //税号
    private String taxNumber;
    //FK:产地id
    private Integer placeId;
    //厂号
    private String factoryNo;
    //冗余字段:计价方式 来源:商品分类
    private Integer pricingMethod;
    //冗余字段:数值 释义:该种商品在某个地区某种计价方式的数值
    private BigDecimal numerical;
    //审核状态 1.待审核 2.审核中 3.已审核,审核通过 4.审核未通过
    private Integer pendingStatus;
    //权限部门id
    private Long deptId;
    //创建人
    private Long createBy;
    //创建时间
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;
    //修改人
    private Long updateBy;
    //修改时间
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updateTime;

    private Long companyId;
    private Long authorizesId;

    /*业务字段 分类名称*/
    private String categoryName;

    /*业务字段 产品信息列表*/
    private List<ItemOriginPlaceEntity> places;

    //产地，展示
    private String placeName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public String getTaxNumber() {
        return taxNumber;
    }

    public void setTaxNumber(String taxNumber) {
        this.taxNumber = taxNumber;
    }

    public Integer getPlaceId() {
        return placeId;
    }

    public void setPlaceId(Integer placeId) {
        this.placeId = placeId;
    }

    public String getFactoryNo() {
        return factoryNo;
    }

    public void setFactoryNo(String factoryNo) {
        this.factoryNo = factoryNo;
    }

    public Integer getPricingMethod() {
        return pricingMethod;
    }

    public void setPricingMethod(Integer pricingMethod) {
        this.pricingMethod = pricingMethod;
    }

    public BigDecimal getNumerical() {
        return numerical;
    }

    public void setNumerical(BigDecimal numerical) {
        this.numerical = numerical;
    }

    public Integer getPendingStatus() {
        return pendingStatus;
    }

    public void setPendingStatus(Integer pendingStatus) {
        this.pendingStatus = pendingStatus;
    }

    public Long getDeptId() {
        return deptId;
    }

    public void setDeptId(Long deptId) {
        this.deptId = deptId;
    }

    public Long getCreateBy() {
        return createBy;
    }

    public void setCreateBy(Long createBy) {
        this.createBy = createBy;
    }

    @JsonFormat(pattern = "yyyy-MM-dd",timezone = "GMT+8")
    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Long getUpdateBy() {
        return updateBy;
    }

    public void setUpdateBy(Long updateBy) {
        this.updateBy = updateBy;
    }

    @JsonFormat(pattern = "yyyy-MM-dd",timezone = "GMT+8")
    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public List<ItemOriginPlaceEntity> getPlaces() {
        return places;
    }

    public void setPlaces(List<ItemOriginPlaceEntity> places) {
        this.places = places;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public Long getAuthorizesId() {
        return authorizesId;
    }

    public void setAuthorizesId(Long authorizesId) {
        this.authorizesId = authorizesId;
    }

    public String getPlaceName() {
        return placeName;
    }

    public void setPlaceName(String placeName) {
        this.placeName = placeName;
    }
}
