package com.wzlue.chain.traceback.entity;

import java.util.Date;

/**
 * 所有合同
 */
@SuppressWarnings("all")
public class TraceBackEntity {
    /**
     * 序列号
     */
    private static final long serialVersionUID = 1L;
    /**
     * 订单id
     */
    private Long id;
    /**
     * 合同编号
     */
    private String contractNumber;

    /**
     * 订单编号
     */
    private String orderNumber;
    /**
     * 创建人
     */
    private Integer createBy;
    /**
     * 创建人名称
     */
    private String createByName;

    /**
     * 创建时间
     */
    private Date createTime;
    /**
     * 卖家名称
     */
    private String merchantCopName;
    /**
     * 卖家名称
     */
    private String customsCopName;

    //订单类型    0: 货物订单,1: 物流订单, 2: 报关订单,3: 仓储订单,4: 代理订单
    private Integer type;
    //报检号
    private String inspectionNo;

    public String getInspectionNo() {
        return inspectionNo;
    }

    public void setInspectionNo(String inspectionNo) {
        this.inspectionNo = inspectionNo;
    }


    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getCreateByName() {
        return createByName;
    }

    public void setCreateByName(String createByName) {
        this.createByName = createByName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContractNumber() {
        return contractNumber;
    }

    public void setContractNumber(String contractNumber) {
        this.contractNumber = contractNumber;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public Integer getCreateBy() {
        return createBy;
    }

    public void setCreateBy(Integer createBy) {
        this.createBy = createBy;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getMerchantCopName() {
        return merchantCopName;
    }

    public void setMerchantCopName(String merchantCopName) {
        this.merchantCopName = merchantCopName;
    }

    public String getCustomsCopName() {
        return customsCopName;
    }

    public void setCustomsCopName(String customsCopName) {
        this.customsCopName = customsCopName;
    }
}
