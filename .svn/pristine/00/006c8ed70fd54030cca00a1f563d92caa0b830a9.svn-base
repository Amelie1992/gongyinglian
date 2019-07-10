package com.wzlue.chain.bill.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.wzlue.chain.bill.service.JsonDateDeserializer;

import java.io.Serializable;
import java.util.Date;
import java.math.BigDecimal;


/**
 * 付款（收款）记录
 * 
 * @author 
 * @email 
 * @date 2018-09-12 18:59:16
 */
public class PaymentRecordEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private Integer id;
	//账单号
	private Integer billId;
	//金额
	private BigDecimal amount;
	//单位
	private Long unit;
	//日期
	//@DateTimeFormat(pattern = "yyyy-MM-dd")
	private String date;
	//支付状态 0：待付款 1：已付款
	private Integer payStatus;
	//支付方式 0：线下支付 1：在线支付
	private Integer payMethod;
	//收款账号
	private String payeeNumber;
	//付款账号
	private String payerNumber;
	//收款方户名
	private String payeeName;
	//付款方户名
	private String payerName;
	//收款方银行
	private String payeeBank;
	//付款方银行
	private String payerBank;
	//付款时间
	private Date paymentTime;
	//确认收款时间
	private Date receivingTime;
	//确认状态 0：待确认 1：已确认
	private Integer confirmStatus;
	//实收金额
	private BigDecimal amountCollected;
	//收款备注
	private String receivingRemarks;
	//付款备注
	private String paymentRemarks;
	//确认收款操作人
	private String receivingOperator;
	//付款操作人
	private String paymentOperator;
	//付款公司id
	private Long payerId;
    //付款公司名
    private String payer;
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
	//仓储日费用ids   1,2,3 格式存储
    private String storagePayIds;
    //仓储订单其他费用id
    private Integer storageOrderCostId;

	//付款流水号
	private String serialNumber;

	public Long getUnit() {
		return unit;
	}

	public void setUnit(Long unit) {
		this.unit = unit;
	}

	public String getPayer() {
		return payer;
	}

	public void setPayer(String payer) {
		this.payer = payer;
	}

	public Long getPayerId() {
		return payerId;
	}

	public void setPayerId(Long payerId) {
		this.payerId = payerId;
	}

	public String getSerialNumber() {
		return serialNumber;
	}

	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}

    public String getStoragePayIds() {
        return storagePayIds;
    }

    public void setStoragePayIds(String storagePayIds) {
        this.storagePayIds = storagePayIds;
    }

    public Integer getStorageOrderCostId() {
        return storageOrderCostId;
    }

    public void setStorageOrderCostId(Integer storageOrderCostId) {
        this.storageOrderCostId = storageOrderCostId;
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
	 * 设置：账单号
	 */
	public void setBillId(Integer billId) {
		this.billId = billId;
	}
	/**
	 * 获取：账单号
	 */
	public Integer getBillId() {
		return billId;
	}
	/**
	 * 设置：金额
	 */
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	/**
	 * 获取：金额
	 */
	public BigDecimal getAmount() {
		return amount;
	}
	/**
	 * 设置：日期
	 */
	public void setDate(String date) {
		this.date = date;
	}
	/**
	 * 获取：日期
	 */
	public String getDate() {
		return date;
	}
	/**
	 * 设置：支付状态 0：待付款 1：已付款
	 */
	public void setPayStatus(Integer payStatus) {
		this.payStatus = payStatus;
	}
	/**
	 * 获取：支付状态 0：待付款 1：已付款
	 */
	public Integer getPayStatus() {
		return payStatus;
	}
	/**
	 * 设置：支付方式 0：线下支付 1：在线支付
	 */
	public void setPayMethod(Integer payMethod) {
		this.payMethod = payMethod;
	}
	/**
	 * 获取：支付方式 0：线下支付 1：在线支付
	 */
	public Integer getPayMethod() {
		return payMethod;
	}
	/**
	 * 设置：收款账号
	 */
	public void setPayeeNumber(String payeeNumber) {
		this.payeeNumber = payeeNumber;
	}
	/**
	 * 获取：收款账号
	 */
	public String getPayeeNumber() {
		return payeeNumber;
	}
	/**
	 * 设置：付款账号
	 */
	public void setPayerNumber(String payerNumber) {
		this.payerNumber = payerNumber;
	}
	/**
	 * 获取：付款账号
	 */
	public String getPayerNumber() {
		return payerNumber;
	}
	/**
	 * 设置：收款方户名
	 */
	public void setPayeeName(String payeeName) {
		this.payeeName = payeeName;
	}
	/**
	 * 获取：收款方户名
	 */
	public String getPayeeName() {
		return payeeName;
	}
	/**
	 * 设置：付款方户名
	 */
	public void setPayerName(String payerName) {
		this.payerName = payerName;
	}
	/**
	 * 获取：付款方户名
	 */
	public String getPayerName() {
		return payerName;
	}
	/**
	 * 设置：收款方银行
	 */
	public void setPayeeBank(String payeeBank) {
		this.payeeBank = payeeBank;
	}
	/**
	 * 获取：收款方银行
	 */
	public String getPayeeBank() {
		return payeeBank;
	}
	/**
	 * 设置：付款方银行
	 */
	public void setPayerBank(String payerBank) {
		this.payerBank = payerBank;
	}
	/**
	 * 获取：付款方银行
	 */
	public String getPayerBank() {
		return payerBank;
	}
	/**
	 * 设置：付款时间
	 */
	@JsonDeserialize(using = JsonDateDeserializer.class)
	public void setPaymentTime(Date paymentTime) {
		this.paymentTime = paymentTime;
	}
	/**
	 * 获取：付款时间
	 */
	@JsonFormat(pattern = "yyyy-MM-dd")
	public Date getPaymentTime() {
		return paymentTime;
	}
	/**
	 * 设置：确认收款时间
	 */
	@JsonDeserialize(using = JsonDateDeserializer.class)
	public void setReceivingTime(Date receivingTime) {
		this.receivingTime = receivingTime;
	}
	/**
	 * 获取：确认收款时间
	 */
	@JsonFormat(pattern = "yyyy-MM-dd")
	public Date getReceivingTime() {
		return receivingTime;
	}
	/**
	 * 设置：确认状态 0：待确认 1：已确认
	 */
	public void setConfirmStatus(Integer confirmStatus) {
		this.confirmStatus = confirmStatus;
	}
	/**
	 * 获取：确认状态 0：待确认 1：已确认
	 */
	public Integer getConfirmStatus() {
		return confirmStatus;
	}
	/**
	 * 设置：实收金额
	 */
	public void setAmountCollected(BigDecimal amountCollected) {
		this.amountCollected = amountCollected;
	}
	/**
	 * 获取：实收金额
	 */
	public BigDecimal getAmountCollected() {
		return amountCollected;
	}

	public String getReceivingRemarks() {
		return receivingRemarks;
	}

	public void setReceivingRemarks(String receivingRemarks) {
		this.receivingRemarks = receivingRemarks;
	}

	public String getPaymentRemarks() {
		return paymentRemarks;
	}

	public void setPaymentRemarks(String paymentRemarks) {
		this.paymentRemarks = paymentRemarks;
	}

	public String getReceivingOperator() {
		return receivingOperator;
	}

	public void setReceivingOperator(String receivingOperator) {
		this.receivingOperator = receivingOperator;
	}

	public String getPaymentOperator() {
		return paymentOperator;
	}

	public void setPaymentOperator(String paymentOperator) {
		this.paymentOperator = paymentOperator;
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
	/**
	 * 设置：公司id
	 */
	public void setCompanyId(Integer companyId) {
		this.companyId = companyId;
	}
	/**
	 * 获取：公司id
	 */
	public Integer getCompanyId() {
		return companyId;
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
}
