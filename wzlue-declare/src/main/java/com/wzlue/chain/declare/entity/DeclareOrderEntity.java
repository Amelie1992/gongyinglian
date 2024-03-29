package com.wzlue.chain.declare.entity;

import java.io.Serializable;
import java.util.Date;
import java.math.BigDecimal;
import java.util.List;


/**
 * 报关订单
 *
 * @author
 * @email
 * @date 2018-09-10 10:19:01
 */
public class DeclareOrderEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    //
    private Long id;
    //报关订单编号
    private String orderNumber;
    //合同编号
    private String contractNumber;
    //联系人（买家）
    private String buyContacts;
    //联系方式（买家）
    private String buyPhone;
    //地址（买家）
    private String buyAddress;
    //公司id（买家）
    private Integer buyCompanyId;
    //公司名称（买家）
    private String buyCompanyName;
    //
    private Integer buyDepartmentId;
    //备注
    private String note;
    //来源类型
    private Integer goodsType;
    //来源单号
    private String goodsNumber;
    //货物补充备注
    private String goodsNote;
    //海关信息
    private String customs;
    //数量
    private String num;

    public String getNum() {
        return num;
    }

    public void setNum(String num) {
        this.num = num;
    }

    //价格
    private String price;
    //单位
    private Long unit;

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }
    //实付款
    private String realPay;

    public String getRealPay() {
        return realPay;
    }

    public void setRealPay(String realPay) {
        this.realPay = realPay;
    }


    //总价
    private BigDecimal total;
    //付款状态  0:待付款 1:已付款
    private Integer payState;
    //订单状态 0：取消 1：待确认 2：已确认 3：待发货  4：已发货 5：待确认收货 6：订单完结
    private Integer orderState;
    //申请售后 0:未处理 1:已处理
    private Integer alterSale;
    //联系人（卖家）
    private String merchantContacts;
    //联系方式（卖家）
    private String merchantPhone;
    //地址（卖家）
    private String merchantAddress;
    //报盘公司id
    private Integer merchantCompanyId;
    //报盘公司名称
    private String merchantCompanyName;
    //部门id(卖家）
    private Integer departmentId;
    //回执文件
    private String returnFile;
    //接单时间
    private Date orderTime;
    //投诉状态(卖家) 0:未被买家投诉 1:已被买家投诉
    private Integer buyStatus;
    //投诉状态(买家) 0:未被卖家投诉 1:已被卖家投诉
    private Integer sellStatus;
    //公司id
    private Integer companyId;
    //部门id
    private Integer deptId;

    public String getOfferName() {
        return offerName;
    }

    public void setOfferName(String offerName) {
        this.offerName = offerName;
    }

    private String offerName;
    //授权用户id
    private Integer authorizesId;
    //创建人
    private Long createBy;
    //创建时间
    private Date createTime;
    //修改人
    private Long updateBy;
    //修改时间
    private Date updateTime;
    //删除标志 0:未删除 1:已删除
    private Integer delFlag;
    //订单关联报盘信息
    private DeclareOrderOfferEntity orderOfferEntity;
    //订单关联文件
    private List<DeclareOrderOssEntity> orderOssEntityList;
    //订单关联商品信息
    private List<DeclareOrderCommodityEntity> goods;
    //单价
    private BigDecimal eachPrice;

    //报检号
    private String inspectionNo;

    public String getInspectionNo() {
        return inspectionNo;
    }

    public void setInspectionNo(String inspectionNo) {
        this.inspectionNo = inspectionNo;
    }

    public Long getUnit() {
        return unit;
    }

    public void setUnit(Long unit) {
        this.unit = unit;
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
     * 设置：报关订单编号
     */
    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }
    /**
     * 获取：报关订单编号
     */
    public String getOrderNumber() {
        return orderNumber;
    }
    /**
     * 设置：合同编号
     */
    public void setContractNumber(String contractNumber) {
        this.contractNumber = contractNumber;
    }
    /**
     * 获取：合同编号
     */
    public String getContractNumber() {
        return contractNumber;
    }
    /**
     * 设置：联系人（买家）
     */
    public void setBuyContacts(String buyContacts) {
        this.buyContacts = buyContacts;
    }
    /**
     * 获取：联系人（买家）
     */
    public String getBuyContacts() {
        return buyContacts;
    }
    /**
     * 设置：联系方式（买家）
     */
    public void setBuyPhone(String buyPhone) {
        this.buyPhone = buyPhone;
    }
    /**
     * 获取：联系方式（买家）
     */
    public String getBuyPhone() {
        return buyPhone;
    }
    /**
     * 设置：地址（买家）
     */
    public void setBuyAddress(String buyAddress) {
        this.buyAddress = buyAddress;
    }
    /**
     * 获取：地址（买家）
     */
    public String getBuyAddress() {
        return buyAddress;
    }
    /**
     * 设置：公司id（买家）
     */
    public void setBuyCompanyId(Integer buyCompanyId) {
        this.buyCompanyId = buyCompanyId;
    }
    /**
     * 获取：公司id（买家）
     */
    public Integer getBuyCompanyId() {
        return buyCompanyId;
    }
    /**
     * 设置：公司名称（买家）
     */
    public void setBuyCompanyName(String buyCompanyName) {
        this.buyCompanyName = buyCompanyName;
    }
    /**
     * 获取：公司名称（买家）
     */
    public String getBuyCompanyName() {
        return buyCompanyName;
    }
    /**
     * 设置：
     */
    public void setBuyDepartmentId(Integer buyDepartmentId) {
        this.buyDepartmentId = buyDepartmentId;
    }
    /**
     * 获取：
     */
    public Integer getBuyDepartmentId() {
        return buyDepartmentId;
    }
    /**
     * 设置：备注
     */
    public void setNote(String note) {
        this.note = note;
    }
    /**
     * 获取：备注
     */
    public String getNote() {
        return note;
    }
    /**
     * 设置：货物来源类型
     */
    public void setGoodsType(Integer goodsType) {
        this.goodsType = goodsType;
    }
    /**
     * 获取：货物来源类型
     */
    public Integer getGoodsType() {
        return goodsType;
    }
    /**
     * 设置：货物来源单号
     */
    public void setGoodsNumber(String goodsNumber) {
        this.goodsNumber = goodsNumber;
    }
    /**
     * 获取：货物来源单号
     */
    public String getGoodsNumber() {
        return goodsNumber;
    }

    /**
     *获取：货物补充备注
     */
    public String getGoodsNote() {
        return goodsNote;
    }

    /**
     *设置：货物补充备注
     */
    public void setGoodsNote(String goodsNote) {
        this.goodsNote = goodsNote;
    }

    /**
     * 设置：海关信息
     */
    public void setCustoms(String customs) {
        this.customs = customs;
    }
    /**
     * 获取：海关信息
     */
    public String getCustoms() {
        return customs;
    }
    /**
     * 设置：总价
     */
    public void setTotal(BigDecimal total) {
        this.total = total;
    }
    /**
     * 获取：总价
     */
    public BigDecimal getTotal() {
        return total;
    }
    /**
     * 设置：付款状态  0:待付款 1:已付款
     */
    public void setPayState(Integer payState) {
        this.payState = payState;
    }
    /**
     * 获取：付款状态  0:待付款 1:已付款
     */
    public Integer getPayState() {
        return payState;
    }
    /**
     * 设置：订单状态 0：取消 1：待确认 2：已确认 3：待发货  4：已发货 5：待确认收货 6：订单完结
     */
    public void setOrderState(Integer orderState) {
        this.orderState = orderState;
    }
    /**
     * 获取：订单状态 0：取消 1：待确认 2：已确认 3：待发货  4：已发货 5：待确认收货 6：订单完结
     */
    public Integer getOrderState() {
        return orderState;
    }
    /**
     * 设置：申请售后 0:未处理 1:已处理
     */
    public void setAlterSale(Integer alterSale) {
        this.alterSale = alterSale;
    }
    /**
     * 获取：申请售后 0:未处理 1:已处理
     */
    public Integer getAlterSale() {
        return alterSale;
    }
    /**
     * 设置：联系人（卖家）
     */
    public void setMerchantContacts(String merchantContacts) {
        this.merchantContacts = merchantContacts;
    }
    /**
     * 获取：联系人（卖家）
     */
    public String getMerchantContacts() {
        return merchantContacts;
    }
    /**
     * 设置：联系方式（卖家）
     */
    public void setMerchantPhone(String merchantPhone) {
        this.merchantPhone = merchantPhone;
    }
    /**
     * 获取：联系方式（卖家）
     */
    public String getMerchantPhone() {
        return merchantPhone;
    }
    /**
     * 设置：地址（卖家）
     */
    public void setMerchantAddress(String merchantAddress) {
        this.merchantAddress = merchantAddress;
    }
    /**
     * 获取：地址（卖家）
     */
    public String getMerchantAddress() {
        return merchantAddress;
    }
    /**
     * 设置：报盘公司id
     */
    public void setMerchantCompanyId(Integer merchantCompanyId) {
        this.merchantCompanyId = merchantCompanyId;
    }
    /**
     * 获取：报盘公司id
     */
    public Integer getMerchantCompanyId() {
        return merchantCompanyId;
    }
    /**
     * 设置：报盘公司名称
     */
    public void setMerchantCompanyName(String merchantCompanyName) {
        this.merchantCompanyName = merchantCompanyName;
    }
    /**
     * 获取：报盘公司名称
     */
    public String getMerchantCompanyName() {
        return merchantCompanyName;
    }
    /**
     * 设置：部门id(卖家）
     */
    public void setDepartmentId(Integer departmentId) {
        this.departmentId = departmentId;
    }
    /**
     * 获取：部门id(卖家）
     */
    public Integer getDepartmentId() {
        return departmentId;
    }
    /**
     * 设置：回执文件
     */
    public void setReturnFile(String returnFile) {
        this.returnFile = returnFile;
    }
    /**
     * 获取：回执文件
     */
    public String getReturnFile() {
        return returnFile;
    }
    /**
     * 设置：接单时间
     */
    public void setOrderTime(Date orderTime) {
        this.orderTime = orderTime;
    }
    /**
     * 获取：接单时间
     */
    public Date getOrderTime() {
        return orderTime;
    }
    /**
     * 设置：投诉状态(卖家) 0:未被买家投诉 1:已被买家投诉
     */
    public void setBuyStatus(Integer buyStatus) {
        this.buyStatus = buyStatus;
    }
    /**
     * 获取：投诉状态(卖家) 0:未被买家投诉 1:已被买家投诉
     */
    public Integer getBuyStatus() {
        return buyStatus;
    }
    /**
     * 设置：投诉状态(买家) 0:未被卖家投诉 1:已被卖家投诉
     */
    public void setSellStatus(Integer sellStatus) {
        this.sellStatus = sellStatus;
    }
    /**
     * 获取：投诉状态(买家) 0:未被卖家投诉 1:已被卖家投诉
     */
    public Integer getSellStatus() {
        return sellStatus;
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
    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
    /**
     * 获取：修改时间
     */
    public Date getUpdateTime() {
        return updateTime;
    }
    /**
     * 设置：删除标志 0:未删除 1:已删除
     */
    public void setDelFlag(Integer delFlag) {
        this.delFlag = delFlag;
    }
    /**
     * 获取：删除标志 0:未删除 1:已删除
     */
    public Integer getDelFlag() {
        return delFlag;
    }

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public Integer getDeptId() {
        return deptId;
    }

    public void setDeptId(Integer deptId) {
        this.deptId = deptId;
    }

    public Integer getAuthorizesId() {
        return authorizesId;
    }

    public void setAuthorizesId(Integer authorizesId) {
        this.authorizesId = authorizesId;
    }

    public DeclareOrderOfferEntity getOrderOfferEntity() {
        return orderOfferEntity;
    }

    public void setOrderOfferEntity(DeclareOrderOfferEntity orderOfferEntity) {
        this.orderOfferEntity = orderOfferEntity;
    }

    public List<DeclareOrderOssEntity> getOrderOssEntityList() {
        return orderOssEntityList;
    }

    public void setOrderOssEntityList(List<DeclareOrderOssEntity> orderOssEntityList) {
        this.orderOssEntityList = orderOssEntityList;
    }

    public List<DeclareOrderCommodityEntity> getGoods() {
        return goods;
    }

    public void setGoods(List<DeclareOrderCommodityEntity> goods) {
        this.goods = goods;
    }

    public void setEachPrice(BigDecimal eachPrice) {
        this.eachPrice = eachPrice;
    }

    public BigDecimal getEachPrice() {
        return eachPrice;
    }
}
