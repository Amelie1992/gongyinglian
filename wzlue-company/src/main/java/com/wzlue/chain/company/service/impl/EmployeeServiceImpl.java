package com.wzlue.chain.company.service.impl;

import com.wzlue.chain.company.dao.EmployeeAdditionalDao;
import com.wzlue.chain.sys.entity.SysUserEntity;
import com.wzlue.chain.sys.service.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Transient;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.company.dao.EmployeeDao;
import com.wzlue.chain.company.entity.EmployeeEntity;
import com.wzlue.chain.company.service.EmployeeService;
import org.springframework.transaction.annotation.Transactional;


@Service("employeeService")
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeDao employeeDao;
    @Autowired
    private EmployeeAdditionalDao employeeAdditionalDao;
    @Autowired
    private SysUserService sysUserService;

    @Override
    public EmployeeEntity queryObject(Integer id) {
        return employeeDao.queryObject(id);
    }

    @Override
    public List<EmployeeEntity> queryList(Map<String, Object> map) {
        return employeeDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return employeeDao.queryTotal(map);
    }

    @Override
    @Transactional
    public void save(EmployeeEntity employee, SysUserEntity user) {
        // 保存员工
        employeeDao.save(employee);

        // 保存登陆用户
        user.setCompanyId(employee.getCompanyId());
        user.setTypeId("1");
        user.setMobile(employee.getPhonenumber());
        sysUserService.save(user);

        //更新员工的user_id
        employeeDao.updateEmployeeUserId(user.getUserId(), employee.getId());

        // 保存 员工信息
        employee.getEmployeeAdditional().setEmployeeid(employee.getId());
        employeeAdditionalDao.save(employee.getEmployeeAdditional());

    }

    @Override
    public void update(EmployeeEntity employee) {
        employeeDao.update(employee);
        employeeAdditionalDao.update(employee.getEmployeeAdditional());

    }

    @Override
    public void delete(Integer id) {
        employeeDao.delete(id);
    }

    @Override
    public void deleteBatch(Integer[] ids) {
        employeeDao.deleteBatch(ids);
    }

    @Override
    public Integer getGH() {
        return employeeDao.getGH();
    }

    @Override
    public String[] queryUserNamesByIds(Integer[] ids) {
        return employeeDao.queryUserNamesByIds(ids);
    }
}
