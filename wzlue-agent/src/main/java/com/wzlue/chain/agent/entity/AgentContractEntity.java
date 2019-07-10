package com.wzlue.chain.agent.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;
import java.math.BigDecimal;
import java.util.List;


/**
 * 代理(订单)合同信息表
 * 
 * @author 
 * @email 
 * @date 2018-09-05 14:48:43
 */
public class AgentContractEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//自增主键,id
	private Long id;
	//合同编号
	private String contractNumber;
	//订单编号
	private String orderNumber;
	//合同名称
	private String contractName;
	//合同创建来源 1.订单创建 2.自主录入
	private Integer dataSource;
	//甲方企业名称
	private String customsCopName;
	//乙方企业名称
	private String merchantCopName;
	//付款方式
	private Integer payMethod;
	//合同金额
	private BigDecimal contractAmount;
	//存放位置
	private String customsStorageLocation;
	private String merchantStorageLocation;
	//签订日期
	@DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date signingTime;
	//到期日期
	@DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date expireDate;
	//备注
	private String remarks;
	//创建人
	private Long createBy;
	//创建时间
	private Date createTime;
	//修改人
	private Long updateBy;
	//修改时间
	private Date updateTime;
	//权限部门id
	private Long cusDeptId;
	private Long merDeptId;

	private Long cusCompanyId; // 客户公司id
	private Long merCompanyId; // 商家公司id
	private long companyId; // 公司id

	private Integer adscription;
	private List<ContractAnnexEntity> annexs;

	//关联订单表
	private AgentOrderEntity agentOrder;

	public AgentOrderEntity getAgentOrder() {
		return agentOrder;
	}

	public void setAgentOrder(AgentOrderEntity agentOrder) {
		this.agentOrder = agentOrder;
	}

	public long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(long companyId) {
		this.companyId = companyId;
	}

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

	public String getContractName() {
		return contractName;
	}

	public void setContractName(String contractName) {
		this.contractName = contractName;
	}

	/**
	 * 设置：订单编号
	 */
	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}
	/**
	 * 获取：订单编号
	 */
	public String getOrderNumber() {
		return orderNumber;
	}
	/**
	 * 设置：合同创建来源 1.订单创建 2.自主录入
	 */
	public void setDataSource(Integer dataSource) {
		this.dataSource = dataSource;
	}
	/**
	 * 获取：合同创建来源 1.订单创建 2.自主录入
	 */
	public Integer getDataSource() {
		return dataSource;
	}
	/**
	 * 设置：甲方企业名称
	 */
	public void setCustomsCopName(String customsCopName) {
		this.customsCopName = customsCopName;
	}
	/**
	 * 获取：甲方企业名称
	 */
	public String getCustomsCopName() {
		return customsCopName;
	}
	/**
	 * 设置：乙方企业名称
	 */
	public void setMerchantCopName(String merchantCopName) {
		this.merchantCopName = merchantCopName;
	}
	/**
	 * 获取：乙方企业名称
	 */
	public String getMerchantCopName() {
		return merchantCopName;
	}
	/**
	 * 设置：付款方式
	 */
	public void setPayMethod(Integer payMethod) {
		this.payMethod = payMethod;
	}
	/**
	 * 获取：付款方式
	 */
	public Integer getPayMethod() {
		return payMethod;
	}
	/**
	 * 设置：合同金额
	 */
	public void setContractAmount(BigDecimal contractAmount) {
		this.contractAmount = contractAmount;
	}
	/**
	 * 获取：合同金额
	 */
	public BigDecimal getContractAmount() {
		return contractAmount;
	}

	public String getCustomsStorageLocation() {
		return customsStorageLocation;
	}

	public void setCustomsStorageLocation(String customsStorageLocation) {
		this.customsStorageLocation = customsStorageLocation;
	}

	public String getMerchantStorageLocation() {
		return merchantStorageLocation;
	}

	public void setMerchantStorageLocation(String merchantStorageLocation) {
		this.merchantStorageLocation = merchantStorageLocation;
	}

	/**
	 * 设置：签订日期
	 */
	public void setSigningTime(Date signingTime) {
		this.signingTime = signingTime;
	}

	/**
	 * 获取：签订日期
	 */
	@JsonFormat(pattern = "yyyy-MM-dd",timezone = "GMT+8")
	public Date getSigningTime() {
		return signingTime;
	}

	/**
	 * 设置：到期日期
	 */
	public void setExpireDate(Date expireDate) {
		this.expireDate = expireDate;
	}
	/**
	 * 获取：到期日期
	 */
	@JsonFormat(pattern = "yyyy-MM-dd",timezone = "GMT+8")
	public Date getExpireDate() {
		return expireDate;
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

	public Long getCusDeptId() {
		return cusDeptId;
	}

	public void setCusDeptId(Long cusDeptId) {
		this.cusDeptId = cusDeptId;
	}

	public Long getMerDeptId() {
		return merDeptId;
	}

	public void setMerDeptId(Long merDeptId) {
		this.merDeptId = merDeptId;
	}

	public Long getCusCompanyId() {
		return cusCompanyId;
	}

	public void setCusCompanyId(Long cusCompanyId) {
		this.cusCompanyId = cusCompanyId;
	}

	public Long getMerCompanyId() {
		return merCompanyId;
	}

	public void setMerCompanyId(Long merCompanyId) {
		this.merCompanyId = merCompanyId;
	}

	public Integer getAdscription() {
		return adscription;
	}

	public void setAdscription(Integer adscription) {
		this.adscription = adscription;
	}

	public List<ContractAnnexEntity> getAnnexs() {
		return annexs;
	}

	public void setAnnexs(List<ContractAnnexEntity> annexs) {
		this.annexs = annexs;
	}
}
