package com.wzlue.chain.sys.dao;

import com.wzlue.chain.common.base.BaseDao;
import com.wzlue.chain.sys.entity.SysRoleEntity;
import com.wzlue.chain.sys.entity.SysUserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * 系统用户
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年9月18日 上午9:34:11
 */
@Mapper
public interface SysUserDao extends BaseDao<SysUserEntity> {
	
	/**
	 * 查询用户的所有权限
	 * @param userId  用户ID
	 */
	List<String> queryAllPerms(Long userId);
	
	/**
	 * 查询用户的所有菜单ID
	 */
	List<Long> queryAllMenuId(Long userId);
	
	/**
	 * 根据用户名，查询系统用户
	 */
	SysUserEntity queryByUserName(String username);
	
	/**
	 * 修改密码
	 */
	int updatePassword(Map<String, Object> map);

    SysUserEntity queryOne(String apply);

    List<SysUserEntity> queryListNotPage(Map map);

    void updateUserCompany(@Param("userId") Long userId, @Param("companyId") Long companyId, @Param("typeId") int i);

	void updateUserCompany2(@Param("userId") Long userId, @Param("companyIdBackup") Long companyIdBackup, @Param("typeId") int i);


	void updateDataAuthorizes(SysUserEntity user);

    void updateCustomerServiceById(SysUserEntity user);

    int updateHeader(SysUserEntity user);

    int updatePasswordByUserName(Map<String, Object> map);

    void updatePasswordByUserId(Map<String, Object> map);
}
