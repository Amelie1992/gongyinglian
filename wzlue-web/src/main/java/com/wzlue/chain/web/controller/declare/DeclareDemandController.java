
package com.wzlue.chain.web.controller.declare;

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

import com.wzlue.chain.declare.entity.DeclareDemandEntity;
import com.wzlue.chain.declare.service.DeclareDemandService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 报关求购表
 * 
 * @author 
 * @email 
 * @date 2018-08-20 19:44:08
 */
@RestController
@RequestMapping("/declare/declaredemand")
public class DeclareDemandController extends AbstractController{
	@Autowired
	private DeclareDemandService declareDemandService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
		SysUserEntity user = getUser();
		query.put("companyId",user.getCompanyId());
		List<DeclareDemandEntity> declareDemandList = declareDemandService.queryList(query);
		int total = declareDemandService.queryTotal(query);
		
		return R.page(declareDemandList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("declare:declaredemand:info")
	public R info(@PathVariable("id") Integer id){
		DeclareDemandEntity declareDemand = declareDemandService.queryObject(id);
		
		return R.ok().put("declareDemand", declareDemand);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("declare:declaredemand:save")
	public R save(@RequestBody DeclareDemandEntity declareDemand){
		SysUserEntity user = getUser();
		declareDemand.setCompanyId(Math.toIntExact(user.getCompanyId()));
		declareDemand.setCreateTime(new Date());
		declareDemand.setUpdateBy(getUserId());
		declareDemand.setUpdateTime(new Date());
		declareDemandService.save(declareDemand);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("declare:declaredemand:update")
	public R update(@RequestBody DeclareDemandEntity declareDemand){
		declareDemand.setUpdateTime(new Date());
		declareDemandService.update(declareDemand);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("declare:declaredemand:delete")
	public R delete(@RequestBody Integer[] ids){
		declareDemandService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
