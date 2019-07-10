package com.wzlue.chain.declare.entity;

import java.io.Serializable;
import java.util.Date;


/**
 * 报关订单文件
 *
 * @author
 * @email
 * @date 2018-09-05 19:19:03
 */
public class DeclareOrderOssEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    //
    private Integer id;
    //订单id
    private Integer orderId;
    //文件类型 1：报关单2：缴税单 3查验单：4：检疫证 5:其他
    private Integer type;
    //文件名
    private String fileName;
    //文件地址
    private String fileUrl;
    //公司id
    private Integer companyId;
    //部门id
    private Integer deptId;
    //创建人
    private Integer createBy;
    //授权用户id
    private Integer authorizesId;

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
     * 设置：订单id
     */
    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }
    /**
     * 获取：订单id
     */
    public Integer getOrderId() {
        return orderId;
    }
    /**
     * 设置：文件类型 1：报关单2：缴税单 3查验单：4：检疫证 5:其他
     */
    public void setType(Integer type) {
        this.type = type;
    }
    /**
     * 获取：文件类型 1：报关单2：缴税单 3查验单：4：检疫证 5:其他
     */
    public Integer getType() {
        return type;
    }
    /**
     * 设置：文件名
     */
    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
    /**
     * 获取：文件名
     */
    public String getFileName() {
        return fileName;
    }
    /**
     * 设置：文件地址
     */
    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }
    /**
     * 获取：文件地址
     */
    public String getFileUrl() {
        return fileUrl;
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

    public Integer getCreateBy() {
        return createBy;
    }

    public void setCreateBy(Integer createBy) {
        this.createBy = createBy;
    }

    public Integer getAuthorizesId() {
        return authorizesId;
    }

    public void setAuthorizesId(Integer authorizesId) {
        this.authorizesId = authorizesId;
    }
}
