
package com.wzlue.chain.web.controller.company;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.common.annotation.SysLog;
import com.wzlue.chain.common.base.LogSource;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.wzlue.chain.web.controller.sys.AbstractController;

import com.wzlue.chain.company.entity.ServiceTypeEntity;
import com.wzlue.chain.company.service.ServiceTypeService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 服务类型
 * 
 * @author 
 * @email 
 * @date 2018-08-16 16:47:00
 */
@RestController
@RequestMapping("/company/servicetype")
public class ServiceTypeController extends AbstractController{
	@Autowired
	private ServiceTypeService serviceTypeService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<ServiceTypeEntity> serviceTypeList = serviceTypeService.queryList(query);
		int total = serviceTypeService.queryTotal(query);
		
		return R.page(serviceTypeList,total);
	}

	@RequestMapping("/listCheckbox")
	public R listCheckbox(@RequestParam Map<String, Object> params){
		//查询列表数据
		List<ServiceTypeEntity> serviceTypeList = serviceTypeService.queryList(params);

		return R.page(serviceTypeList,null);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("company:servicetype:info")
	public R info(@PathVariable("id") Integer id){
		ServiceTypeEntity serviceType = serviceTypeService.queryObject(id);
		
		return R.ok().put("serviceType", serviceType);
	}
	
	/**
	 * 保存
	 */
	@SysLog(value = "保存服务类型",source = LogSource.PC)
	@RequestMapping("/save")
	@RequiresPermissions("company:servicetype:save")
	public R save(@RequestBody ServiceTypeEntity serviceType){
		serviceTypeService.save(serviceType);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@SysLog(value = "修改服务类型",source = LogSource.PC)
	@RequestMapping("/update")
	@RequiresPermissions("company:servicetype:update")
	public R update(@RequestBody ServiceTypeEntity serviceType){
		serviceTypeService.update(serviceType);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@SysLog(value = "删除服务类型",source = LogSource.PC)
	@RequestMapping("/delete")
	@RequiresPermissions("company:servicetype:delete")
	public R delete(@RequestBody Integer[] ids){
		serviceTypeService.deleteBatch(ids);
		
		return R.ok();
	}

	@RequestMapping("/getSltList")
	public R getSltList(){
		List<ServiceTypeEntity> list =serviceTypeService.getSltList();
		return R.ok().put("list", list);
	}

}
