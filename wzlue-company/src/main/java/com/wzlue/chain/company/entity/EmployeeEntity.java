package com.wzlue.chain.company.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.wzlue.chain.sys.entity.SysRoleEntity;
import com.wzlue.chain.sys.entity.SysUserEntity;
import com.wzlue.chain.sys.entity.SysUserRoleEntity;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;
import java.util.List;


/**
 * 员工
 *
 * @author
 * @email
 * @date 2018-08-22 14:37:00
 */
public class EmployeeEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    //主键
    private Integer id;
    // 用户id
    private Long userId;
    //工号
    private String worknumber;
    //姓名
    private String name;
    //身份证号码
    private String idcard;
    //手机号码
    private String phonenumber;
    //性别
    private String sex;
    //出生日期
//    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd")
    private Date dateofbirth;
    //社保
    private String socialsecurity;
    // 企业id
    private Long companyId;
    //攻击经
    private String housingfund;
    //在职状态
    private String jobstate;
    //入职时间
//    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd")
    private Date hiredate;
    //邮箱
    private String email;
    //合同状态
    private String stateofcontract;
    //合同签订时间
//    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd")
    private Date contractsigningtime;
    //合同到期时间
//    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd")
    private Date contractexpirationdate;
    //公司名称
    private String companyname;
    //岗位
    private String post;
    // 选填信息
    private EmployeeAdditionalEntity employeeAdditional;

    private Integer createBy;

    private SysUserEntity user;

    private List<SysRoleEntity> roleList;


    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<SysRoleEntity> getRoleList() {
        return roleList;
    }

    public void setRoleList(List<SysRoleEntity> roleList) {
        this.roleList = roleList;
    }

    public SysUserEntity getUser() {
        return user;
    }

    public void setUser(SysUserEntity user) {
        this.user = user;
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
     * 设置：工号
     */
    public void setWorknumber(String worknumber) {
        this.worknumber = worknumber;
    }

    /**
     * 获取：工号
     */
    public String getWorknumber() {
        return worknumber;
    }

    /**
     * 设置：姓名
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * 获取：姓名
     */
    public String getName() {
        return name;
    }

    /**
     * 设置：身份证号码
     */
    public void setIdcard(String idcard) {
        this.idcard = idcard;
    }

    /**
     * 获取：身份证号码
     */
    public String getIdcard() {
        return idcard;
    }

    /**
     * 设置：手机号码
     */
    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    /**
     * 获取：手机号码
     */
    public String getPhonenumber() {
        return phonenumber;
    }

    /**
     * 设置：性别
     */
    public void setSex(String sex) {
        this.sex = sex;
    }

    /**
     * 获取：性别
     */
    public String getSex() {
        return sex;
    }

    /**
     * 设置：出生日期
     */
    public void setDateofbirth(Date dateofbirth) {
        this.dateofbirth = dateofbirth;
    }

    /**
     * 获取：出生日期
     */
    public Date getDateofbirth() {
        return dateofbirth;
    }

    /**
     * 设置：社保
     */
    public void setSocialsecurity(String socialsecurity) {
        this.socialsecurity = socialsecurity;
    }

    /**
     * 获取：社保
     */
    public String getSocialsecurity() {
        return socialsecurity;
    }

    /**
     * 设置：所属公司
     */
    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    /**
     * 获取：所属公司
     */
    public Long getCompanyId() {
        return companyId;
    }

    /**
     * 设置：攻击经
     */
    public void setHousingfund(String housingfund) {
        this.housingfund = housingfund;
    }

    /**
     * 获取：攻击经
     */
    public String getHousingfund() {
        return housingfund;
    }

    /**
     * 设置：在职状态
     */
    public void setJobstate(String jobstate) {
        this.jobstate = jobstate;
    }

    /**
     * 获取：在职状态
     */
    public String getJobstate() {
        return jobstate;
    }

    /**
     * 设置：入职时间
     */
    public void setHiredate(Date hiredate) {
        this.hiredate = hiredate;
    }

    /**
     * 获取：入职时间
     */
    public Date getHiredate() {
        return hiredate;
    }

    /**
     * 设置：邮箱
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * 获取：邮箱
     */
    public String getEmail() {
        return email;
    }

    /**
     * 设置：合同状态
     */
    public void setStateofcontract(String stateofcontract) {
        this.stateofcontract = stateofcontract;
    }

    /**
     * 获取：合同状态
     */
    public String getStateofcontract() {
        return stateofcontract;
    }

    /**
     * 设置：合同签订时间
     */
    public void setContractsigningtime(Date contractsigningtime) {
        this.contractsigningtime = contractsigningtime;
    }

    /**
     * 获取：合同签订时间
     */
    public Date getContractsigningtime() {
        return contractsigningtime;
    }

    /**
     * 设置：合同到期时间
     */
    public void setContractexpirationdate(Date contractexpirationdate) {
        this.contractexpirationdate = contractexpirationdate;
    }

    /**
     * 获取：合同到期时间
     */
    public Date getContractexpirationdate() {
        return contractexpirationdate;
    }

    /**
     * 设置：公司名称
     */
    public void setCompanyname(String companyname) {
        this.companyname = companyname;
    }

    /**
     * 获取：公司名称
     */
    public String getCompanyname() {
        return companyname;
    }

    /**
     * 设置：岗位
     */
    public void setPost(String post) {
        this.post = post;
    }

    /**
     * 获取：岗位
     */
    public String getPost() {
        return post;
    }

    public EmployeeAdditionalEntity getEmployeeAdditional() {
        return employeeAdditional;
    }

    public void setEmployeeAdditional(EmployeeAdditionalEntity employeeAdditional) {
        this.employeeAdditional = employeeAdditional;
    }

    public Integer getCreateBy() {
        return createBy;
    }

    public void setCreateBy(Integer createBy) {
        this.createBy = createBy;
    }
}
