
package com.wzlue.chain.web.controller.logistics;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.wzlue.chain.sys.entity.SysUserEntity;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.wzlue.chain.web.controller.sys.AbstractController;

import com.wzlue.chain.logistics.entity.LogisticsDemandEntity;
import com.wzlue.chain.logistics.service.LogisticsDemandService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 物流求购
 * 
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-08-21 16:17:43
 */
@RestController
@RequestMapping("/logistics/logisticsdemand")
public class LogisticsDemandController extends AbstractController{
	@Autowired
	private LogisticsDemandService logisticsDemandService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
		SysUserEntity user = getUser();
		if(user.getCompanyId() !=null){
			query.put("companyId",user.getCompanyId());
		}
		List<LogisticsDemandEntity> logisticsDemandList = logisticsDemandService.queryList(query);
		int total = logisticsDemandService.queryTotal(query);
		
		return R.page(logisticsDemandList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("logistics:logisticsdemand:info")
	public R info(@PathVariable("id") Long id){
		LogisticsDemandEntity logisticsDemand = logisticsDemandService.queryObject(id);

		return R.ok().put("logisticsDemand", logisticsDemand);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("logistics:logisticsdemand:save")
	public R save(@RequestBody LogisticsDemandEntity logisticsDemand){
		SysUserEntity user = getUser();
        logisticsDemand.setCreateBy(user.getUserId());
        logisticsDemand.setCreatDate(new Date());
        logisticsDemand.setUpdateBy(user.getUserId());
        logisticsDemand.setUpdateDate(new Date());
		logisticsDemand.setCompanyId(Math.toIntExact(user.getCompanyId()));
		logisticsDemandService.save(logisticsDemand);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("logistics:logisticsdemand:update")
	public R update(@RequestBody LogisticsDemandEntity logisticsDemand){
		SysUserEntity user = getUser();
		logisticsDemand.setUpdateBy(user.getUserId());
		logisticsDemand.setUpdateDate(new Date());
		logisticsDemandService.update(logisticsDemand);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("logistics:logisticsdemand:delete")
	public R delete(@RequestBody Long[] ids){
		logisticsDemandService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
