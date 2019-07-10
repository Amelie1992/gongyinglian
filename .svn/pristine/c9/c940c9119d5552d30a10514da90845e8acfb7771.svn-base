
package com.wzlue.chain.web.controller.contract;

import java.util.List;
import java.util.Map;


import com.wzlue.chain.contract.entity.GoodsContractEntity;
import com.wzlue.chain.contract.service.GoodsContractService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.wzlue.chain.web.controller.sys.AbstractController;


import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
import springfox.documentation.annotations.ApiIgnore;


/**
 * 货物合同
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-28 13:28:06
 */
@RestController
@RequestMapping("/contract/goodscontract")
@Api(value = "货物合同")
public class GoodsContractController extends AbstractController{
	@Autowired
	private GoodsContractService goodsContractService;
	
	/**
	 * 列表
	 */
	@GetMapping("/list")
	@ApiOperation(value="货物合同列表接口")
	@ApiImplicitParams({
			@ApiImplicitParam(name = "page", dataType = "int", value = "页码", paramType = "query", defaultValue = "1"),
			@ApiImplicitParam(name = "limit", dataType = "int", value = "一页几条", paramType = "query", defaultValue = "10"),
			@ApiImplicitParam(name = "contractNumber", dataType = "string", value = "合同编号", paramType = "query"),
			@ApiImplicitParam(paramType="header", name = "token", value = "token", required = true, dataType = "string")
	})
	public R list(@ApiIgnore @RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
        query.put("companyId",getUser().getCompanyId());
		List<GoodsContractEntity> goodsContractList = goodsContractService.queryList(query);
		int total = goodsContractService.queryTotal(query);
		
		return R.page(goodsContractList,total);
	}
	
	
	/**
	 * 信息
	 */
	@GetMapping("/goodscontractInfo")
	@ApiOperation(value = "货物合同详情")
	@ApiImplicitParams({
			@ApiImplicitParam(name = "id", dataType = "int", value = "货物合同id", paramType = "query"),
			@ApiImplicitParam(paramType="header", name = "token", value = "token", required = true, dataType = "string")
	})
	public R info(@ApiIgnore Long id){
		GoodsContractEntity goodsContract = goodsContractService.queryObject(id);
		
		return R.ok().put("goodsContract", goodsContract);
	}
	
	/**
	 * 保存
	 */
	@PostMapping("/save")
	@RequiresPermissions("contract:goodscontract:save")
	@ApiOperation(value = "货物合同新增")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
	})
	public R save(@RequestBody GoodsContractEntity goodsContract){
		goodsContractService.save(goodsContract);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@PostMapping("/update")
	@RequiresPermissions("contract:goodscontract:update")
	@ApiOperation(value = "货物合同修改")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
	})
	public R update(@RequestBody GoodsContractEntity goodsContract){
		goodsContractService.update(goodsContract);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@PostMapping("/delete")
	@RequiresPermissions("contract:goodscontract:delete")
	@ApiOperation(value = "货物合同删除")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
	})
	public R delete(@RequestBody Long[] ids){
		goodsContractService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
