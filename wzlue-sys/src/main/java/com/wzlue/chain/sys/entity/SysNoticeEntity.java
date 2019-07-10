package com.wzlue.chain.sys.entity;

import java.io.Serializable;
import java.util.Date;


/**
 * 新闻资讯
 *
 * @author hjw
 * @email love@und.win
 * @date 2018-08-27 19:37:10
 */
public class SysNoticeEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    //编号
    private Long id;
    //发布人的id
    private String adviceUserId;
    //发布人
    private String adviceUserName;
    //发布单位
    private String deptName;
    //标题
    private String title;
    //位置
    private String positionId;

    //副标题
    private String viceTitle;
    //新闻分类
    private String noticeType;
    //公告内容
    private String noticeContent;
    //权限部门id
    private Long deptId;
    //创建人
    private Long createdBy;
    //创建时间
    private Date createdTime;
    //修改人
    private Long updatedBy;
    //修改时间
    private Date updatedTime;
    //接收方id
    private String receiverId;

    /**
     * 设置：编号
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * 获取：编号
     */
    public Long getId() {
        return id;
    }

    /**
     * 位置
     *
     * @return
     */
    public String getPositionId() {
        return positionId;
    }

    /**
     * 位置
     *
     * @param positionId
     */
    public void setPositionId(String positionId) {
        this.positionId = positionId;
    }

    /**
     * 设置：发布人的id
     */
    public void setAdviceUserId(String adviceUserId) {
        this.adviceUserId = adviceUserId;
    }

    /**
     * 获取：发布人的id
     */
    public String getAdviceUserId() {
        return adviceUserId;
    }

    /**
     * 设置：发布人
     */
    public void setAdviceUserName(String adviceUserName) {
        this.adviceUserName = adviceUserName;
    }

    /**
     * 获取：发布人
     */
    public String getAdviceUserName() {
        return adviceUserName;
    }

    /**
     * 设置：发布单位
     */
    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    /**
     * 获取：发布单位
     */
    public String getDeptName() {
        return deptName;
    }

    /**
     * 设置：标题
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * 获取：标题
     */
    public String getTitle() {
        return title;
    }

    /**
     * 设置：副标题
     */
    public void setViceTitle(String viceTitle) {
        this.viceTitle = viceTitle;
    }

    /**
     * 获取：副标题
     */
    public String getViceTitle() {
        return viceTitle;
    }

    /**
     * 设置：新闻分类
     */
    public void setNoticeType(String noticeType) {
        this.noticeType = noticeType;
    }

    /**
     * 获取：新闻分类
     */
    public String getNoticeType() {
        return noticeType;
    }

    /**
     * 设置：公告内容
     */
    public void setNoticeContent(String noticeContent) {
        this.noticeContent = noticeContent;
    }

    /**
     * 获取：公告内容
     */
    public String getNoticeContent() {
        return noticeContent;
    }

    /**
     * 设置：权限部门id
     */
    public void setDeptId(Long deptId) {
        this.deptId = deptId;
    }

    /**
     * 获取：权限部门id
     */
    public Long getDeptId() {
        return deptId;
    }

    /**
     * 设置：创建人
     */
    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    /**
     * 获取：创建人
     */
    public Long getCreatedBy() {
        return createdBy;
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
    public void setUpdatedBy(Long updatedBy) {
        this.updatedBy = updatedBy;
    }

    /**
     * 获取：修改人
     */
    public Long getUpdatedBy() {
        return updatedBy;
    }

    /**
     * 设置：修改时间
     */
    public void setUpdatedTime(Date updatedTime) {
        this.updatedTime = updatedTime;
    }

    /**
     * 获取：修改时间
     */
    public Date getUpdatedTime() {
        return updatedTime;
    }

    public String getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(String receiverId) {
        this.receiverId = receiverId;
    }
}
