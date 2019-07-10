package com.wzlue.chain.goods.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

/**
 * 商品分类表
 */
public class ItemCategoryEntity {
    private static final long serialVersionUID = 1L;

    //主键自增
    private Integer id;
    //分类名称
    private String categoryName;
    //税号
    private String taxNumber;
    //计价方式: 1.从价 2.从量
    private Integer pricingMethod;
    //分类状态: 1.启用 2.冻结
    private Integer nowStatus;
    //上级id,为0则为一级
    private Integer parentId;
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

    private String parentName;

    private Long companyId;
    private Long authorizesId;
    /*下级分类列表*/
    private List<ItemCategoryEntity> list;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getTaxNumber() {
        return taxNumber;
    }

    public void setTaxNumber(String taxNumber) {
        this.taxNumber = taxNumber;
    }

    public Integer getPricingMethod() {
        return pricingMethod;
    }

    public void setPricingMethod(Integer pricingMethod) {
        this.pricingMethod = pricingMethod;
    }

    public Integer getNowStatus() {
        return nowStatus;
    }

    public void setNowStatus(Integer nowStatus) {
        this.nowStatus = nowStatus;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
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

    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }

    public List<ItemCategoryEntity> getList() {
        return list;
    }

    public void setList(List<ItemCategoryEntity> list) {
        this.list = list;
    }
}
