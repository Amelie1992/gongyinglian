package com.wzlue.chain.web.controller.sys;

import com.wzlue.chain.common.annotation.SysLog;
import com.wzlue.chain.common.base.R;
import com.wzlue.chain.common.exception.RRException;
import com.wzlue.chain.common.utils.DateUtils;
import com.wzlue.chain.sys.entity.SysDeptEntity;
import com.wzlue.chain.sys.service.ShiroService;
import com.wzlue.chain.sys.service.SysDeptService;
import com.wzlue.chain.sys.util.TreeNode;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * 系统菜单
 *
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年10月27日 下午9:58:15
 */
@RestController
@RequestMapping("/sys/sysdept")
public class SysDeptController extends AbstractController {
	@Autowired
	private SysDeptService sysDeptService;

	@Autowired
	private ShiroService shiroService;

	/**
	 * 导航菜单
	 */
	//todo 暂无用
//	@RequestMapping("/nav")
//	public R nav(){
//		List<SysDeptEntity> menuList = sysDeptService.getUserMenuList(getUserId());
//		Set<String> permissions = shiroService.getUserPermissions(getUserId());
//		return R.ok().put("menuList", menuList).put("permissions", permissions);
//	}

	/**
	 * 所有菜单列表 (根据用户)
	 */
	@RequestMapping("/list")
//	//@RequiresPermissions("sys:sysdept:list")
	public List<SysDeptEntity> list(){
		List<SysDeptEntity> menuList = sysDeptService.queryList(new HashMap<String, Object>());
		return menuList;
	}

	/**
	 * 获取全部菜单列表 (系统)
	 */
	@RequestMapping("/deptList")
//	//@RequiresPermissions("sys:sysdept:list")
	public R deptList(){
		List<TreeNode> list = sysDeptService.getUserMenuList(getUserId());
		return R.ok().put("treeList",list);
	}
	/**
	 * 选择菜单(添加、修改菜单)
	 */
	@RequestMapping("/select")
//	//@RequiresPermissions("sys:sysdept:select")
	public R select(){
		//查询列表数据
		List<SysDeptEntity> menuList = sysDeptService.queryAllList();

		//添加顶级菜单
		SysDeptEntity root = new SysDeptEntity();
		root.setDeptId(0L);
		root.setName("一级菜单");
		root.setParentId(-1L);
		root.setOpen(true);
		menuList.add(root);

		return R.ok().put("menuList", menuList);
	}

	/**
	 * 菜单信息
	 */
	@RequestMapping("/info/{deptId}")
//	//@RequiresPermissions("sys:sysdept:info")
	public R info(@PathVariable("deptId") Long deptId){
		SysDeptEntity menu = sysDeptService.queryObject(deptId);
		return R.ok().put("menu", menu);
	}

	/**
	 * 保存
	 */
	@SysLog("保存菜单")
	@RequestMapping(value = "/save")
	//@RequiresPermissions("sys:sysdept:save")
	public R save(@RequestBody SysDeptEntity menu){
		//数据校验
		verifyForm(menu);
		menu.setCreateBy(getUserId());
		menu.setCreateDate(DateUtils.format(new Date(),"yyyy-MM-dd HH:mm:ss"));

		sysDeptService.save(menu);

		return R.ok();
	}

	/**
	 * 修改
	 */
	@SysLog("修改菜单")
	@RequestMapping("/update")
	//@RequiresPermissions("sys:sysdept:update")
	public R update(@RequestBody SysDeptEntity menu){
		//数据校验
//		menu.setParentId(Long.parseLong("11"));
		verifyForm(menu);
		//menu.setUpdateBy(getUgerId());
		menu.setUpdateDate(DateUtils.format(new Date(),"yyyy-MM-dd HH:mm:ss"));

		sysDeptService.update(menu);

		return R.ok();
	}

	/**
	 * 删除
	 */
	@SysLog("删除菜单")
	@RequestMapping("/delete")
	//@RequiresPermissions("sys:sysdept:delete")
	public R delete(long deptId){
		//判断是否有子菜单或按钮
		List<SysDeptEntity> menuList = sysDeptService.queryListParentId(deptId);
		if(menuList.size() > 0){
			return R.error("请先删除子菜单或按钮");
		}

		sysDeptService.deleteBatch(new Long[]{deptId});

		return R.ok();
	}

	/**
	 * 验证参数是否正确
	 */
	private void verifyForm(SysDeptEntity menu){
		if(StringUtils.isBlank(menu.getName())){
			throw new RRException("菜单名称不能为空");
		}

		if(menu.getParentId() == null){
			throw new RRException("上级菜单不能为空");
		}
	}
}
