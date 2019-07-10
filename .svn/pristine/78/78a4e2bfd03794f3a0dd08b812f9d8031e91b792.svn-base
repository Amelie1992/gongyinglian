
package com.wzlue.chain.web.controller.logistics;

import java.util.List;
import java.util.Map;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.wzlue.chain.web.controller.sys.AbstractController;

import com.wzlue.chain.logistics.entity.LogisticsContractEntity;
import com.wzlue.chain.logistics.service.LogisticsContractService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
import springfox.documentation.annotations.ApiIgnore;


/**
 * (物流订单)合同信息表
 * 
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-09-18 16:30:22
 */
@RestController
@RequestMapping("/logistics/logisticscontract")
@Api("物流合同")
public class LogisticsContractController extends AbstractController{
	@Autowired
	private LogisticsContractService logisticsContractService;
	
	/**
	 * 列表
	 */
	@GetMapping("/list")
	@ApiOperation("物流合同列表")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
	})
	public R list(@ApiIgnore @RequestParam Map<String, Object> params){
		Query query = new Query(params);
		query.put("companyId", getUser().getCompanyId());
		List<LogisticsContractEntity> logisticsContractList = logisticsContractService.queryList(query);
		int total = logisticsContractService.queryTotal(query);

		return R.page(logisticsContractList, total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("logistics:logisticscontract:info")
	public R info(@PathVariable("id") Long id){
		LogisticsContractEntity logisticsContract = logisticsContractService.queryObject(id);
		
		return R.ok().put("logisticsContract", logisticsContract);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("logistics:logisticscontract:save")
	public R save(@RequestBody LogisticsContractEntity logisticsContract){
		logisticsContractService.save(logisticsContract);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("logistics:logisticscontract:update")
	public R update(@RequestBody LogisticsContractEntity logisticsContract){
		logisticsContractService.update(logisticsContract);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("logistics:logisticscontract:delete")
	public R delete(@RequestBody Long[] ids){
		logisticsContractService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
