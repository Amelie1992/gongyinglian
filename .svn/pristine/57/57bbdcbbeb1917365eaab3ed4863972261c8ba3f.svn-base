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

package com.wzlue.chain.sys.service.impl;


import com.wzlue.chain.sys.dao.SysDeptDao;
import com.wzlue.chain.sys.entity.SysDeptEntity;
import com.wzlue.chain.sys.service.SysDeptService;
import com.wzlue.chain.sys.service.SysUserService;
import com.wzlue.chain.sys.util.TreeNode;
import com.wzlue.chain.sys.util.TreeTransformUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Service("sysDeptService")
public class SysDeptServiceImpl implements SysDeptService {
	@Autowired
	private SysDeptDao sysDeptDao;
	@Autowired
	private SysUserService sysUserService;

	@Override
	public List<SysDeptEntity> queryListParentId(Long parentId, List<Long> menuIdList) {
		//根据父id查子部门集合
		List<SysDeptEntity> menuList = queryListParentId(parentId);

		if(menuIdList == null){
			return menuList;
		}

		List<SysDeptEntity> userMenuList = new ArrayList<>();

		for(SysDeptEntity menu : menuList){
			if(menuIdList.contains(menu.getDeptId())){
				userMenuList.add(menu);
			}
		}
		return userMenuList;
	}

	@Override
	public List<SysDeptEntity> queryAllList() {
		return sysDeptDao.queryAllList();
	}

	@Override
	public List<SysDeptEntity> queryListParentId(Long parentId) {
		return sysDeptDao.queryListParentId(parentId);
	}



	@Override
	public List<TreeNode> getUserMenuList(Long userId) {
		List<TreeNode> list =  new ArrayList<>();
		TreeNode treeNode = null;

		List<SysDeptEntity> sysDeptEntities = sysDeptDao.queryAllList();
		for (SysDeptEntity item :sysDeptEntities){
			treeNode = new TreeNode(item.getDeptId(),item.getName(),item.getParentId(),item.getParentName(),item);
			list.add(treeNode);
		}

		list = TreeTransformUtil.buildByRecursive(list);
		return list;
	}

	@Override
	public SysDeptEntity queryObject(Long menuId) {
		return sysDeptDao.queryObject(menuId);
	}

	@Override
	public List<SysDeptEntity> queryList(Map<String, Object> map) {
		return sysDeptDao.queryList(map);
	}

	@Override
	public int queryTotal(Map<String, Object> map) {
		return sysDeptDao.queryTotal(map);
	}

	@Override
	public void save(SysDeptEntity menu) {
		if(menu.getParentId() != 0){
			menu.setParentIds(getParentIds(menu));
		}else {
			menu.setParentIds("0,");
		}
		sysDeptDao.save(menu);
	}

	@Override
	public void update(SysDeptEntity menu) {
		if(menu.getParentId() != 0){
			menu.setParentIds(getParentIds(menu));
		}else {
			menu.setParentIds("0,");
		}
		sysDeptDao.update(menu);
	}

	@Override
	@Transactional
	public void deleteBatch(Long[] menuIds) {
		sysDeptDao.deleteBatch(menuIds);
	}

	@Override
	public List<SysDeptEntity> queryUserList(Long userId) {
		return sysDeptDao.queryUserList(userId);
	}

	/**
	 * 获取所有菜单列表
	 */
	private List<SysDeptEntity> getAllMenuList(List<Long> menuIdList){
		//查询根菜单列表
		List<SysDeptEntity> menuList = queryListParentId(0L, menuIdList);
		//递归获取子菜单
		getMenuTreeList(menuList, menuIdList);

		return menuList;
	}

	/**
	 * 递归
	 */
	private List<SysDeptEntity> getMenuTreeList(List<SysDeptEntity> menuList, List<Long> menuIdList){
		//子菜单
		List<SysDeptEntity> subMenuList = new ArrayList<SysDeptEntity>();
		for(SysDeptEntity entity : menuList){
//			entity.setList(getMenuTreeList(queryListParentId(entity.getDeptId(), menuIdList), menuIdList));
//			subMenuList.add(entity);
		}
		return subMenuList;
	}

	/**
	 * 获取上级parentIds，最后拼接当前parentId
	 * @param menu
	 * @return
	 */
	private String getParentIds(SysDeptEntity menu){
		SysDeptEntity s = sysDeptDao.queryObject(menu.getParentId());
		s.setParentIds(s.getParentIds()+menu.getParentId()+",");
		return s.getParentIds();
	}
}
