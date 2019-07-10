package com.wzlue.chain.marketing.entity;

import com.wzlue.chain.agent.entity.ContractAnnexEntity;
import com.wzlue.chain.company.entity.MerchantCompanyEntity;

import java.io.Serializable;
import java.util.Date;
import java.math.BigDecimal;
import java.util.List;


/**
 * 营销拍卖表
 * 
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-09-26 13:43:46
 */
public class MarketAuctionEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//拍卖表id
	private Long id;
	//拍卖编号
	private String auctionNumber;
	//拍卖商品名称
	private String auctionCommodityName;
	//起拍价
	private BigDecimal startingPrice;
	//单位 0:人民币,1:美元,2:欧元,3:英镑
	private Long unit;
	//提货地点省
	private String province;
	private String provinceName;
	//市
	private String city;
	private String cityName;
	//拍卖方式 0:降价拍,1:升价拍
	private Integer type;
	//状态 0:上架,1:下架
	private Integer status;
	//保留价
	private BigDecimal reservePrice;
	//变价幅度
	private BigDecimal amplitude;
	//延时周期
	private Integer delayPeriod;
	//开始时间
	private Date startTime;
	//结束时间
	private Date endTime;
	//描述
	private String describe;
	//公司id
	private Integer companyId;
	//拍卖公司名称
	private String companyName;
	//部门id
	private Integer deptId;
	//创建人(用户id)
	private Long createBy;
	//授权用户id
	private Integer authorizesId;
	//创建日期
	private Date createDate;
	//修改人
	private Long updateBy;
	//修改时间
	private Date updateDate;
	//删除标识 0：未删除 1：删除
	private Integer delFlag;
	//出价次数
	private Integer count;
	//可否正常拍卖状态 0：可拍卖 1：不可拍卖
	private Integer state;
	// 是否进行中 1 未开始，2 进行中 3，已结束
	private Integer isStart;

	public Integer getIsStart() {
		return isStart;
	}

	public void setIsStart(Integer isStart) {
		this.isStart = isStart;
	}

	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}

	public String getProvinceName() {
		return provinceName;
	}

	public void setProvinceName(String provinceName) {
		this.provinceName = provinceName;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	//拍品图片
	private List<ContractAnnexEntity> file;
	//拍卖商品表
	private List<MarketAuctionCommodityEntity> marketAuctionCommodityEntityList;
	//当前公司
	private MerchantCompanyEntity companyEntity;

	public MerchantCompanyEntity getCompanyEntity() {
		return companyEntity;
	}

	public void setCompanyEntity(MerchantCompanyEntity companyEntity) {
		this.companyEntity = companyEntity;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public List<MarketAuctionCommodityEntity> getMarketAuctionCommodityEntityList() {
		return marketAuctionCommodityEntityList;
	}

	public void setMarketAuctionCommodityEntityList(List<MarketAuctionCommodityEntity> marketAuctionCommodityEntityList) {
		this.marketAuctionCommodityEntityList = marketAuctionCommodityEntityList;
	}

	public List<ContractAnnexEntity> getFile() {
		return file;
	}

	public void setFile(List<ContractAnnexEntity> file) {
		this.file = file;
	}

	/**
	 * 设置：拍卖表id
	 */
	public void setId(Long id) {
		this.id = id;
	}
	/**
	 * 获取：拍卖表id
	 */
	public Long getId() {
		return id;
	}
	/**
	 * 设置：拍卖编号
	 */
	public void setAuctionNumber(String auctionNumber) {
		this.auctionNumber = auctionNumber;
	}
	/**
	 * 获取：拍卖编号
	 */
	public String getAuctionNumber() {
		return auctionNumber;
	}
	/**
	 * 设置：拍卖商品名称
	 */
	public void setAuctionCommodityName(String auctionCommodityName) {
		this.auctionCommodityName = auctionCommodityName;
	}
	/**
	 * 获取：拍卖商品名称
	 */
	public String getAuctionCommodityName() {
		return auctionCommodityName;
	}
	/**
	 * 设置：起拍价
	 */
	public void setStartingPrice(BigDecimal startingPrice) {
		this.startingPrice = startingPrice;
	}
	/**
	 * 获取：起拍价
	 */
	public BigDecimal getStartingPrice() {
		return startingPrice;
	}
	/**
	 * 设置：单位 0:人民币,1:美元,2:欧元,3:英镑
	 */
	public void setUnit(Long unit) {
		this.unit = unit;
	}
	/**
	 * 获取：单位 0:人民币,1:美元,2:欧元,3:英镑
	 */
	public Long getUnit() {
		return unit;
	}
	/**
	 * 设置：提货地点省
	 */
	public void setProvince(String province) {
		this.province = province;
	}
	/**
	 * 获取：提货地点省
	 */
	public String getProvince() {
		return province;
	}
	/**
	 * 设置：市
	 */
	public void setCity(String city) {
		this.city = city;
	}
	/**
	 * 获取：市
	 */
	public String getCity() {
		return city;
	}
	/**
	 * 设置：拍卖方式 0:降价拍,1:升价拍
	 */
	public void setType(Integer type) {
		this.type = type;
	}
	/**
	 * 获取：拍卖方式 0:降价拍,1:升价拍
	 */
	public Integer getType() {
		return type;
	}
	/**
	 * 设置：状态 0:上架,1:下架
	 */
	public void setStatus(Integer status) {
		this.status = status;
	}
	/**
	 * 获取：状态 0:上架,1:下架
	 */
	public Integer getStatus() {
		return status;
	}
	/**
	 * 设置：保留价
	 */
	public void setReservePrice(BigDecimal reservePrice) {
		this.reservePrice = reservePrice;
	}
	/**
	 * 获取：保留价
	 */
	public BigDecimal getReservePrice() {
		return reservePrice;
	}
	/**
	 * 设置：变价幅度
	 */
	public void setAmplitude(BigDecimal amplitude) {
		this.amplitude = amplitude;
	}
	/**
	 * 获取：变价幅度
	 */
	public BigDecimal getAmplitude() {
		return amplitude;
	}
	/**
	 * 设置：延时周期
	 */
	public void setDelayPeriod(Integer delayPeriod) {
		this.delayPeriod = delayPeriod;
	}
	/**
	 * 获取：延时周期
	 */
	public Integer getDelayPeriod() {
		return delayPeriod;
	}
	/**
	 * 设置：开始时间
	 */
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	/**
	 * 获取：开始时间
	 */
	public Date getStartTime() {
		return startTime;
	}
	/**
	 * 设置：结束时间
	 */
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	/**
	 * 获取：结束时间
	 */
	public Date getEndTime() {
		return endTime;
	}
	/**
	 * 设置：描述
	 */
	public void setDescribe(String describe) {
		this.describe = describe;
	}
	/**
	 * 获取：描述
	 */
	public String getDescribe() {
		return describe;
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
	 * 设置：部门id
	 */
	public void setDeptId(Integer deptId) {
		this.deptId = deptId;
	}
	/**
	 * 获取：部门id
	 */
	public Integer getDeptId() {
		return deptId;
	}
	/**
	 * 设置：创建人(用户id)
	 */
	public void setCreateBy(Long createBy) {
		this.createBy = createBy;
	}
	/**
	 * 获取：创建人(用户id)
	 */
	public Long getCreateBy() {
		return createBy;
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
	/**
	 * 设置：创建日期
	 */
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	/**
	 * 获取：创建日期
	 */
	public Date getCreateDate() {
		return createDate;
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
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
	/**
	 * 获取：修改时间
	 */
	public Date getUpdateDate() {
		return updateDate;
	}
	/**
	 * 设置：删除标识 0：未删除 1：删除
	 */
	public void setDelFlag(Integer delFlag) {
		this.delFlag = delFlag;
	}
	/**
	 * 获取：删除标识 0：未删除 1：删除
	 */
	public Integer getDelFlag() {
		return delFlag;
	}
}
