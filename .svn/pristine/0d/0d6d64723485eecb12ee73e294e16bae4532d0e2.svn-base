/**
 * Copyright 2018 人人开源 http://www.renren.io
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

package com.wzlue.chain.sys.service;



import com.wzlue.chain.sys.entity.SysDeptEntity;
import com.wzlue.chain.sys.util.TreeNode;

import java.util.List;
import java.util.Map;

/**
 * 部门管理
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2017-06-20 15:23:47
 */
public interface SysDeptService {

	/**
	 * 根据父部门，查询子部门
	 * @param parentId 父部门ID
	 * @param menuIdList  用户部门ID
	 */
	List<SysDeptEntity> queryListParentId(Long parentId, List<Long> menuIdList);

	/**
	 * 根据父部门，查询子部门
	 * @param parentId 父部门ID
	 */
	List<SysDeptEntity> queryListParentId(Long parentId);



	/**
	 * 获取用户部门列表
	 */
	List<TreeNode> getUserMenuList(Long userId);

	/**
	 * 查询部门
	 */
	SysDeptEntity queryObject(Long menuId);
	/**
	 * 查询所有部门列表
	 */
	List<SysDeptEntity> queryAllList();
	/**
	 * 查询部门列表
	 */
	List<SysDeptEntity> queryList(Map<String, Object> map);

	/**
	 * 查询总数
	 */
	int queryTotal(Map<String, Object> map);

	/**
	 * 保存菜单
	 */
	void save(SysDeptEntity menu);

	/**
	 * 修改
	 */
	void update(SysDeptEntity menu);

	/**
	 * 删除
	 */
	void deleteBatch(Long[] menuIds);

	/**
	 * 查询用户的权限列表
	 */
	List<SysDeptEntity> queryUserList(Long userId);

}
