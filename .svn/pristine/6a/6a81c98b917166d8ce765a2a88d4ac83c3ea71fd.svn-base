package com.wzlue.chain.sys.service.impl;

import com.wzlue.chain.sys.dao.SysUserDao;
import com.wzlue.chain.sys.dao.SysUserRoleDao;
import com.wzlue.chain.sys.entity.SysUserEntity;
import com.wzlue.chain.sys.service.SysUserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * 用户与角色对应关系
 *
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年9月18日 上午9:45:48
 */
@Service("sysUserRoleService")
public class SysUserRoleServiceImpl implements SysUserRoleService {
    @Autowired
    private SysUserRoleDao sysUserRoleDao;
    @Autowired
    private SysUserDao sysUserDao;


    @Override
    @Transactional
    public void saveOrUpdate(Long userId, List<Long> roleIdList) {
        SysUserEntity userEntity = sysUserDao.queryObject(userId);
        //先删除用户与角色关系
        sysUserRoleDao.delete(userId);
        if (roleIdList == null || roleIdList.size() == 0) {
            return;
        }
        //保存用户与角色关系
        Map<String, Object> map = new HashMap<>();
        map.put("userId", userId);
        map.put("roleIdList", roleIdList);
        sysUserRoleDao.save(map);

        Boolean flag = false;
        for (Long roleId : roleIdList) {
            if (roleId == 1) {   //系统管理员
                sysUserDao.updateUserCompany(userId, userEntity.getCompanyId(), 0);  //删除公司号
                flag = true;
            }
        }

        if (flag == false && userEntity.getCompanyId() == null && userEntity.getCompanyIdBackup() != null) {
            sysUserDao.updateUserCompany2(userId, userEntity.getCompanyIdBackup(), 0);  //恢复公司号
        }
    }

    @Override
    public List<Long> queryRoleIdList(Long userId) {
        return sysUserRoleDao.queryRoleIdList(userId);
    }

    @Override
    public void delete(Long userId) {
        sysUserRoleDao.delete(userId);
    }
}
