package com.wzlue.chain.sys.entity;

import java.io.Serializable;
import java.util.Date;


/**
 * 位置表
 *
 * @author hjw
 * @email love@und.win
 * @date 2018-08-28 09:21:23
 */
public class SysNoticePositionEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    //
    private Long id;
    //位置名称
    private String name;
    //备注
    private String remarks;
    //创建人
    private String createBy;
    //创建人名称
    private String createByName;
    //创建时间
    private Date createTime;
    //修改人
    private String modifyBy;
    //修改时间
    private Date modifyTime;
    //
    private String deptId;

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
     * 设置：位置名称
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * 获取：位置名称
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
     * 设置：创建人
     */
    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    /**
     * 获取：创建人
     */
    public String getCreateBy() {
        return createBy;
    }

    /**
     * 创建人名称
     * @return
     */
    public String getCreateByName() {
        return createByName;
    }

    /**
     * 创建人名称
     * @param createByName
     */
    public void setCreateByName(String createByName) {
        this.createByName = createByName;
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
    public void setModifyBy(String modifyBy) {
        this.modifyBy = modifyBy;
    }

    /**
     * 获取：修改人
     */
    public String getModifyBy() {
        return modifyBy;
    }

    /**
     * 设置：修改时间
     */
    public void setModifyTime(Date modifyTime) {
        this.modifyTime = modifyTime;
    }

    /**
     * 获取：修改时间
     */
    public Date getModifyTime() {
        return modifyTime;
    }

    /**
     * 设置：
     */
    public void setDeptId(String deptId) {
        this.deptId = deptId;
    }

    /**
     * 获取：
     */
    public String getDeptId() {
        return deptId;
    }
}
