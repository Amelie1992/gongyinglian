package com.wzlue.chain.bill.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.wzlue.chain.bill.service.JsonDateDeserializer;
import com.wzlue.chain.sys.entity.ImageEntity;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;
import java.math.BigDecimal;
import java.util.List;


/**
 * 收支明细
 * 
 * @author 
 * @email 
 * @date 2018-09-27 10:24:37
 */
public class IncomeExpenditureDetailEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//主键
	private Integer id;
	//账户
	private String accountNo;
	//名称
	private String name;
	//是否关联订单 0：不关联 1：关联
	private Integer linkOrder;
	//订单编号
	private String orderNumber;
	//支付类型0：线下支付 1：在线支付'
	private Integer paymentType;
	//流水号
	private String serialNumber;
	//收入
	private BigDecimal income;
	//支出
	private BigDecimal expenditur;
	//银行卡号（付款方）
	private String payerNumber;
	//银行卡号（收款方）
	private String payeeNumber;
	//收款公司id
	private Long payeeId;
	//收款公司名称
	private String payeeName;
	//打款操作人
	private String operator;
	//打款时间
	private Date payTime;
	//备注
	private String remarks;
	//价格单位
	private Long unit;
	//公司id
	private Long companyId;
	//创建人
	private Long createBy;
	//创建时间
	private Date createdTime;
	//打款凭证
	private List<ImageEntity> images;

	//收入
	private String income2;
	//支出
	private String expenditur2;


	public String getIncome2() {
		return income2;
	}

	public void setIncome2(String income2) {
		this.income2 = income2;
	}

	public String getExpenditur2() {
		return expenditur2;
	}

	public void setExpenditur2(String expenditur2) {
		this.expenditur2 = expenditur2;
	}

	public Long getUnit() {
		return unit;
	}

	public void setUnit(Long unit) {
		this.unit = unit;
	}

	public List<ImageEntity> getImages() {
		return images;
	}

	public void setImages(List<ImageEntity> images) {
		this.images = images;
	}

	public Integer getLinkOrder() {
		return linkOrder;
	}

	public void setLinkOrder(Integer linkOrder) {
		this.linkOrder = linkOrder;
	}

	public String getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}

	public String getPayerNumber() {
		return payerNumber;
	}

	public void setPayerNumber(String payerNumber) {
		this.payerNumber = payerNumber;
	}

	public String getPayeeNumber() {
		return payeeNumber;
	}

	public void setPayeeNumber(String payeeNumber) {
		this.payeeNumber = payeeNumber;
	}

	public Long getPayeeId() {
		return payeeId;
	}

	public void setPayeeId(Long payeeId) {
		this.payeeId = payeeId;
	}

	public String getPayeeName() {
		return payeeName;
	}

	public void setPayeeName(String payeeName) {
		this.payeeName = payeeName;
	}

	public String getOperator() {
		return operator;
	}

	public void setOperator(String operator) {
		this.operator = operator;
	}
    @JsonFormat(pattern = "yyyy-MM-dd")
	public Date getPayTime() {
		return payTime;
	}

	@JsonDeserialize(using = JsonDateDeserializer.class)
	public void setPayTime(Date payTime) {
		this.payTime = payTime;
	}

	public Long getCreateBy() {
		return createBy;
	}

	public void setCreateBy(Long createBy) {
		this.createBy = createBy;
	}

	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}

	/**
	 * 设置：主键
	 */
	public void setId(Integer id) {
		this.id = id;
	}
	/**
	 * 获取：主键
	 */
	public Integer getId() {
		return id;
	}
	/**
	 * 设置：账户
	 */
	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}
	/**
	 * 获取：账户
	 */
	public String getAccountNo() {
		return accountNo;
	}
	/**
	 * 设置：名称
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * 获取：名称
	 */
	public String getName() {
		return name;
	}
	/**
	 * 设置：备注
	 */
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	/**
	 * 获取：备注
	 */
	public String getRemarks() {
		return remarks;
	}
	/**
	 * 设置：流水号
	 */
	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}
	/**
	 * 获取：流水号
	 */
	public String getSerialNumber() {
		return serialNumber;
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
	 * 设置：收入
	 */
	public void setIncome(BigDecimal income) {
		this.income = income;
	}
	/**
	 * 获取：收入
	 */
	public BigDecimal getIncome() {
		return income;
	}
	/**
	 * 设置：支出
	 */
	public void setExpenditur(BigDecimal expenditur) {
		this.expenditur = expenditur;
	}
	/**
	 * 获取：支出
	 */
	public BigDecimal getExpenditur() {
		return expenditur;
	}

	/**
	 * 设置：类型
	 */
	public void setPaymentType(Integer paymentType) {
		this.paymentType = paymentType;
	}
	/**
	 * 获取：类型
	 */
	public Integer getPaymentType() {
		return paymentType;
	}
}
