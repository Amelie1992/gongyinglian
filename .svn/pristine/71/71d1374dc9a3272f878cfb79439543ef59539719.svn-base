
package com.wzlue.chain.web.controller.declare;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.wzlue.chain.sys.entity.SysUserEntity;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.wzlue.chain.web.controller.sys.AbstractController;

import com.wzlue.chain.declare.entity.DeclareDemandEntity;
import com.wzlue.chain.declare.service.DeclareDemandService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
import springfox.documentation.annotations.ApiIgnore;


/**
 * 报关求购表
 * 
 * @author 
 * @email 
 * @date 2018-08-20 19:44:08
 */
@RestController
@RequestMapping("/declare/declaredemand")
@Api(value="报关求购")
public class DeclareDemandController extends AbstractController{
	@Autowired
	private DeclareDemandService declareDemandService;
	
	/**
	 * 列表
	 */
	@GetMapping("/list")
	@ApiOperation(value = "报关求购列表接口")
	@ApiImplicitParams({
            @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string"),
			@ApiImplicitParam(name = "page", dataType = "int", value = "页码", paramType = "query", defaultValue = "1"),
			@ApiImplicitParam(name = "limit", dataType = "int", value = "一页几条", paramType = "query", defaultValue = "10"),
			@ApiImplicitParam(name = "type", dataType = "string", value = "报关分类", paramType = "query"),
			@ApiImplicitParam(name = "name", dataType = "string", value = "标题名称", paramType = "query")
	})
	public R list(@ApiIgnore @RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
        if (getUser().getCompanyId()!=null){
            query.put("companyId",getUser().getCompanyId());
        }

		List<DeclareDemandEntity> declareDemandList = declareDemandService.queryList(query);
		for (DeclareDemandEntity demandEntity : declareDemandList) {
			if(demandEntity.getType() == 1){
				demandEntity.setTypeName("进口报关");
			}else {
				demandEntity.setTypeName("出口报关");
			}
		}
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
	@PostMapping("/save")
	@RequiresPermissions("declare:declaredemand:save")
    @ApiOperation(value="报关求购新增")
    @ApiImplicitParam(paramType="header", name = "token", value = "token", required = true, dataType = "string")
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
