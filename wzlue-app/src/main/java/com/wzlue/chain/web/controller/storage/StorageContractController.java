
package com.wzlue.chain.web.controller.storage;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.wzlue.chain.sys.entity.SysUserEntity;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.wzlue.chain.web.controller.sys.AbstractController;

import com.wzlue.chain.storage.entity.StorageContractEntity;
import com.wzlue.chain.storage.service.StorageContractService;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
import springfox.documentation.annotations.ApiIgnore;


/**
 * 仓库合同信息表
 * 
 * @author 
 * @email 
 * @date 2018-09-28 15:02:40
 */
@RestController
@RequestMapping("/storage/storagecontract")
@Api(value = "仓储合同管理")
public class StorageContractController extends AbstractController{
	@Autowired
	private StorageContractService storageContractService;
	
	/**
	 * 列表
	 */
	@PostMapping("/list")
	@ApiOperation(value="仓储合同列表")
	@ApiImplicitParam(paramType="header", name = "token", value = "token", required = true, dataType = "string")
	public R list(@ApiIgnore @RequestParam Map<String, Object> params){
		//查询列表数据
		Query query = new Query(params);
		SysUserEntity user = getUser();
		if (user.getCompanyId()!=null){
			query.put("companyId", user.getCompanyId());
		}
		List<StorageContractEntity> storageContractList = storageContractService.queryList(query);
		int total = storageContractService.queryTotal(query);

		return R.page(storageContractList, total);
	}
	
	
	/**
	 * 信息
	 */
	@GetMapping("/info/{id}")
//	@RequiresPermissions("storage:storagecontract:info")
	@ApiOperation(value="仓储合同信息")
	@ApiImplicitParam(paramType="header", name = "token", value = "token", required = true, dataType = "string")
	public R info(@PathVariable("id") Long id){
		StorageContractEntity storageContract = storageContractService.queryObject(id);
		
		return R.ok().put("storageContract", storageContract);
	}
	
	/**
	 * 保存
	 */
	@PostMapping("/save")
//	@RequiresPermissions("storage:storagecontract:save")
	@ApiOperation(value="仓储合同保存")
	@ApiImplicitParam(paramType="header", name = "token", value = "token", required = true, dataType = "string")
	public R save(@RequestBody StorageContractEntity storageContract){
		SysUserEntity user = getUser();
		storageContract.setCreateBy(user.getUserId());
		storageContract.setStorageLocation(storageContract.getFile().get(0).getUrl());
		storageContract.setCreateTime(new Date());
		storageContract.setCompanyId(user.getCompanyId());
		storageContract.setDataSource(2);//合同创建来源 1.订单创建 2.自主录入
		storageContractService.save(storageContract);

		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@PostMapping("/update")
//	@RequiresPermissions("storage:storagecontract:update")
	@ApiOperation(value="仓储合同修改")
	@ApiImplicitParam(paramType="header", name = "token", value = "token", required = true, dataType = "string")
	public R update(@RequestBody StorageContractEntity storageContract){
		storageContract.setUpdateBy(getUserId());
		storageContract.setUpdateTime(new Date());
		storageContractService.update(storageContract);

		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@PostMapping("/delete")
//	@RequiresPermissions("storage:storagecontract:delete")
	@ApiOperation(value="仓储合同删除")
	@ApiImplicitParam(paramType="header", name = "token", value = "token", required = true, dataType = "string")
	public R delete(@RequestBody Long[] ids){
		storageContractService.deleteBatch(ids);
		
		return R.ok();
	}

	@GetMapping("/checkCode")
	@ApiOperation(value="查询仓储合同")
	@ApiImplicitParam(paramType="header", name = "token", value = "token", required = true, dataType = "string")
	public R checkCode(@RequestBody StorageContractEntity storageContract) {
		storageContract.setCompanyId(getUser().getCompanyId());
		StorageContractEntity storageContractEntity = storageContractService.queryContract(storageContract);

		return R.ok().put("storageContract", storageContractEntity);
	}

}
