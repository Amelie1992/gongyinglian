package com.wzlue.chain.bill.entity;

import java.io.Serializable;
import java.util.Date;
import java.math.BigDecimal;


/**
 * 我的账户
 *
 * @author
 * @email
 * @date 2018-09-20 10:55:05
 */
public class MyAccountEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    //主键
    private Integer id;
    //账户
    private String account;
    //密码
    private String password;
    //盐
    private String salt;
    //余额
    private BigDecimal balance;
    //用户ID
    private Long createBy;
    // 公司id
    private Long companyId;
    //更新时间
    private Date updateTime;

    private int count;

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
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

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}
