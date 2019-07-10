
package com.wzlue.chain.web.controller.sys;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.wzlue.chain.web.controller.sys.AbstractController;

import com.wzlue.chain.sys.entity.SysNoticePositionEntity;
import com.wzlue.chain.sys.service.SysNoticePositionService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 位置表
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-28 09:21:23
 */
@RestController
@RequestMapping("/sys/sysnoticeposition")
public class SysNoticePositionController extends AbstractController{
	@Autowired
	private SysNoticePositionService sysNoticePositionService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<SysNoticePositionEntity> sysNoticePositionList = sysNoticePositionService.queryList(query);
		int total = sysNoticePositionService.queryTotal(query);
		
		return R.page(sysNoticePositionList,total);
	}

	/**
	 * 列表
	 */
	@RequestMapping("/listByType")
	public R listByType(@RequestParam Map<String, Object> params){
		//查询列表数据


		List<SysNoticePositionEntity> sysNoticePositionList = sysNoticePositionService.queryList(params);
		int total = sysNoticePositionService.queryTotal(params);

		return R.page(sysNoticePositionList,total);
	}
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("sys:sysnoticeposition:info")
	public R info(@PathVariable("id") Long id){
		SysNoticePositionEntity sysNoticePosition = sysNoticePositionService.queryObject(id);
		
		return R.ok().put("sysNoticePosition", sysNoticePosition);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("sys:sysnoticeposition:save")
	public R save(@RequestBody SysNoticePositionEntity sysNoticePosition){
        sysNoticePosition.setCreateBy(getUserId().toString());
        sysNoticePosition.setCreateTime(new Date());
        sysNoticePosition.setCreateByName(getUser().getUsername());
		sysNoticePositionService.save(sysNoticePosition);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("sys:sysnoticeposition:update")
	public R update(@RequestBody SysNoticePositionEntity sysNoticePosition){
	    sysNoticePosition.setModifyBy(getUserId().toString());
	    sysNoticePosition.setModifyTime(new Date());
		sysNoticePositionService.update(sysNoticePosition);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("sys:sysnoticeposition:delete")
	public R delete(@RequestBody Long[] ids){
		sysNoticePositionService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
