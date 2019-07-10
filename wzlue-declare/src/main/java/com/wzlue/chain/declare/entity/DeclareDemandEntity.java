package com.wzlue.chain.declare.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;


/**
 * 报关求购表
 * 
 * @author 
 * @email 
 * @date 2018-08-20 19:44:08
 */
public class DeclareDemandEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private Long id;
	//报关分类
	private Integer type;
	private String typeName;
	//名称
	private String name;
    //货物
    private String goods;
    //数量
	private BigDecimal number;
	//单位  1:吨
	private String unit;
	//报关描述
	private String declareInfo;
	//公司id
	private Integer companyId;
	//部门id
	private Integer deptId;
	//状态  0：下架 1：上架
	private Integer status;
	//创建人
	private Integer createBy;
	//创建时间
	private Date createTime;
	// 修改人
	private Long updateBy;
	//修改时间
	private Date updateTime;
	//删除标记 0:未删除 1:已删除
	private Integer delFlag;
    //授权用户id
    private Integer authorizesId;

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
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
	 * 设置：报关分类
	 */
	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
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
     * 获取货物
     */
    public String getGoods() {
        return goods;
    }
    /**
     *设置：货物
     */
    public void setGoods(String goods) {
        this.goods = goods;
    }
    /**
	 * 设置：数量
	 */
	public void setNumber(BigDecimal number) {
		this.number = number;
	}
	/**
	 * 获取：数量
	 */
	public BigDecimal getNumber() {
		return number;
	}
	/**
	 * 设置：单位  1:吨
	 */
	public void setUnit(String unit) {
		this.unit = unit;
	}
	/**
	 * 获取：单位  1:吨
	 */
	public String getUnit() {
		return unit;
	}
	/**
	 * 设置：报关描述
	 */
	public void setDeclareInfo(String declareInfo) {
		this.declareInfo = declareInfo;
	}
	/**
	 * 获取：报关描述
	 */
	public String getDeclareInfo() {
		return declareInfo;
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
	 * 设置：状态  0：下架 1：上架
	 */
	public void setStatus(Integer status) {
		this.status = status;
	}
	/**
	 * 获取：状态  0：下架 1：上架
	 */
	public Integer getStatus() {
		return status;
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
	 * 设置： 修改人
	 */
	public void setUpdateBy(Long updateBy) {
		this.updateBy = updateBy;
	}
	/**
	 * 获取： 修改人
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
	 * 设置：删除标记 0:未删除 1:已删除
	 */
	public void setDelFlag(Integer delFlag) {
		this.delFlag = delFlag;
	}
	/**
	 * 获取：删除标记 0:未删除 1:已删除
	 */
	public Integer getDelFlag() {
		return delFlag;
	}

    /**
     * 获取：权限用户id
     * @return
     */
    public Integer getAuthorizesId() {
        return authorizesId;
    }

    /**
     * 设置：权限用户id
     * @param authorizesId
     */
    public void setAuthorizesId(Integer authorizesId) {
        this.authorizesId = authorizesId;
    }
}
