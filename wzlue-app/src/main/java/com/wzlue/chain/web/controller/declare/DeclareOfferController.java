
package com.wzlue.chain.web.controller.declare;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
import com.wzlue.chain.declare.entity.DeclareOfferEntity;
import com.wzlue.chain.declare.service.DeclareOfferService;
import com.wzlue.chain.sys.entity.SysUserEntity;
import com.wzlue.chain.web.controller.sys.AbstractController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import springfox.documentation.annotations.ApiIgnore;




/**
 * 报关报盘信息
 * 
 * @author 
 * @email sunlightcs@gmail.com
 * @date 2018-08-15 16:29:28
 */
@RestController
@RequestMapping("/declare/declareoffer")
@Api(value="报关报盘管理")
public class DeclareOfferController extends AbstractController{
	@Autowired
	private DeclareOfferService declareOfferService;

	/**
	 * 列表
	 */
	@GetMapping("/list")
    @ApiOperation(value="报关报盘列表接口")
	@ApiImplicitParams({
		@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string"),
		@ApiImplicitParam(name = "page", dataType = "int", value = "页码", paramType = "query", defaultValue = "1"),
		@ApiImplicitParam(name = "limit", dataType = "int", value = "一页几条", paramType = "query", defaultValue = "10")
	})
	public R list(@ApiIgnore @RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
        SysUserEntity user = getUser();
        if(user.getCompanyId()==null){
            return R.page(null,0);
        }
        query.put("companyId",user.getCompanyId());
		List<DeclareOfferEntity> declareOfferList = declareOfferService.queryList(query);
		int total = declareOfferService.queryTotal(query);
		
		return R.page(declareOfferList,total);
        //查询列表数据
	}

   /**
     * 查询当前公司下 已上架的报盘商品,公司ID
     * queryByCompanyId
     */
    @PostMapping("/queryByCompanyId")
    @ApiOperation(value="查询当前公司下已上架的报盘商品接口")
    @ApiImplicitParam(paramType="header", name = "token", value = "token", required = true, dataType = "string")
    public R queryByCompanyId(@RequestBody Map<String, Object> params) {
        params.put("groundingState",1);
        List<DeclareOfferEntity> list = declareOfferService.queryList(params);

        return R.ok().put("list", list);
    }

	/**
	 * 信息
	 */
	@GetMapping("/info/{id}")
	@RequiresPermissions("declare:declareoffer:info")
    @ApiOperation(value="报盘信息接口")
    @ApiImplicitParam(paramType="header", name = "token", value = "token", required = true, dataType = "string")
	public R info(@PathVariable("id") Integer id){
		DeclareOfferEntity declareOffer = declareOfferService.queryObject(id);
		
    		return R.ok().put("declareOffer", declareOffer);
	}
	
	/**
	 * 保存
	 */
	@PostMapping("/save")
	@RequiresPermissions("declare:declareoffer:save")
    @ApiOperation(value="报盘保存接口")
    @ApiImplicitParam(paramType="header", name = "token", value = "token", required = true, dataType = "string")
	public R save(@RequestBody DeclareOfferEntity declareOfferEntity){
        SysUserEntity user = getUser();
        Date date =new Date();
        declareOfferEntity.setDeptId(null);//部门id
        declareOfferEntity.setDelFlag(0);
        declareOfferEntity.setCreateBy(Math.toIntExact(getUserId()));
        declareOfferEntity.setUpdateBy(Math.toIntExact(getUserId()));
        declareOfferEntity.setCreateTime(date);
        declareOfferEntity.setUpdateTime(date);
		declareOfferService.save(declareOfferEntity);
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@PostMapping("/update")
	@RequiresPermissions("declare:declareoffer:update")
    @ApiOperation(value="报盘修改接口")
    @ApiImplicitParam(paramType="header", name = "token", value = "token", required = true, dataType = "string")
	public R update(@RequestBody DeclareOfferEntity declareOffer){
		declareOfferService.update(declareOffer);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@PostMapping("/delete")
	@RequiresPermissions("declare:declareoffer:delete")
    @ApiOperation(value="报盘删除接口")
    @ApiImplicitParam(paramType="header", name = "token", value = "token", required = true, dataType = "string")
	public R delete(@RequestBody Integer[] ids){
		declareOfferService.deleteBatch(ids);
		
		return R.ok();
	}

    /**
     * 报盘
     */
    @RequestMapping("/offer")
    @RequiresPermissions("declare:declareoffer:update")
    public R offer(@RequestBody Integer[] ids){
        Map<String, Object> map = new HashMap<>();
        map.put("state",0);
        map.put("ids",ids);
        map.put("userId",getUserId());
        declareOfferService.offer(map);
        return R.ok();
    }

    /**
     * 下架商品disOffer
     */
    @RequestMapping("/disOffer")
    @RequiresPermissions("declare:declareoffer:update")
    public R disOffer(@RequestBody Integer[] ids){
        Map<String, Object> map = new HashMap<>();
        map.put("state",1);
        map.put("ids",ids);
        map.put("userId",getUserId());
        declareOfferService.disOfferOffer(map);
        return R.ok();
    }

    /**
     * 判断商品编码是否重复
     */
    @RequestMapping("/checkCode")
    @RequiresPermissions("declare:declareoffer:info")
    public R checkCode(@RequestBody DeclareOfferEntity declareOfferEntity){
        int count=declareOfferService.checkCode(declareOfferEntity);
        return R.ok().put("count",count);
    }

    /**
     * 获取某企业下的报盘信息*/
    @RequestMapping("/getCompanyList")
    public R getCompanyList(Long id){
        List<DeclareOfferEntity> list = declareOfferService.getListByCompanyId(id);
        return R.ok().put("list",list);
    }
}
