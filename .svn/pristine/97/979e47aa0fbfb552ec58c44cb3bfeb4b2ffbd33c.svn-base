package com.wzlue.chain.web.controller.sys;

import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
import com.wzlue.chain.sys.entity.SysNumberRuleEntity;
import com.wzlue.chain.sys.entity.SysUserEntity;
import com.wzlue.chain.sys.service.SysNumberRuleService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;


/**
 * 编码规则
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2018-03-27 10:08:51
 */
@RestController
@RequestMapping("/sys/numberrule")
public class SysNumberRuleController{
	@Autowired
	private SysNumberRuleService sysNumberRuleService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	@RequiresPermissions("sys:numberrule:list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<SysNumberRuleEntity> sysNumberRuleList = sysNumberRuleService.queryList(query);
		int total = sysNumberRuleService.queryTotal(query);
		
		//PageUtils pageUtil = new PageUtils(sysNumberRuleList, total, query.getLimit(), query.getPage());
		return R.page(sysNumberRuleList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("sys:numberrule:info")
	public R info(@PathVariable("id") Long id){
		SysNumberRuleEntity sysNumberRule = sysNumberRuleService.queryObject(id);
		return R.ok().put("sysNumberRule", sysNumberRule);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("sys:numberrule:save")
	public R save(@RequestBody SysNumberRuleEntity sysNumberRule){
		SysUserEntity userEntity = (SysUserEntity) SecurityUtils.getSubject().getPrincipal();
		sysNumberRule.setCreateBy(userEntity.getUserId());
		sysNumberRule.setUpdateBy(userEntity.getUserId());
		sysNumberRule.setCreateDate(new Date());
		sysNumberRule.setUpdateDate(new Date());
		sysNumberRuleService.save(sysNumberRule);

		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("sys:numberrule:update")
	public R update(@RequestBody SysNumberRuleEntity sysNumberRule){
		SysUserEntity userEntity = (SysUserEntity) SecurityUtils.getSubject().getPrincipal();
		sysNumberRule.setUpdateBy(userEntity.getUserId());
		sysNumberRule.setUpdateDate(new Date());
		sysNumberRuleService.update(sysNumberRule);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("sys:numberrule:delete")
	public R delete(@RequestBody Long[] ids){
		sysNumberRuleService.deleteBatch(ids);
		
		return R.ok();
	}

	/**
	 * 验证参数是否合法
	 * @return
	 */
	@GetMapping("/validateParams")
	public R validateParams(SysNumberRuleEntity sysNumberRule){
		SysNumberRuleEntity numberRule =sysNumberRuleService.queryParams(sysNumberRule);
		if (numberRule != null){
			return R.error();
		}
		return R.ok();
	}
	
}
