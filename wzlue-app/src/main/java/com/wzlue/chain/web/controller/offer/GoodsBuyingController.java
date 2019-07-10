
package com.wzlue.chain.web.controller.offer;

import java.util.HashMap;
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

import com.wzlue.chain.offer.entity.GoodsBuyingEntity;
import com.wzlue.chain.offer.service.GoodsBuyingService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
import springfox.documentation.annotations.ApiIgnore;


/**
 * 货物求购
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-23 10:01:30
 */
@RestController
@RequestMapping("/offer/goodsbuying")
@Api(value = "求购期货现货")
public class GoodsBuyingController extends AbstractController{
	@Autowired
	private GoodsBuyingService goodsBuyingService;
	
	/**
	 * 列表
	 */
	@GetMapping("/goodsBuyingList")
	@ApiOperation(value="求购期货现货列表接口")
	@ApiImplicitParams({
			@ApiImplicitParam(name = "page", dataType = "int", value = "页码", paramType = "query", defaultValue = "1"),
			@ApiImplicitParam(name = "limit", dataType = "int", value = "一页几条", paramType = "query", defaultValue = "10"),
			@ApiImplicitParam(name = "commodityName", dataType = "string", value = "商品名称", paramType = "query"),
            @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
	})
	public R goodsBuyingList(@ApiIgnore @RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
        if (getUser().getCompanyId()!=null){
            query.put("companyId",getUser().getCompanyId());
        }

		List<GoodsBuyingEntity> goodsBuyingList = goodsBuyingService.queryList(query);
		int total = goodsBuyingService.queryTotal(query);
		
		return R.page(goodsBuyingList,total);
	}
	
	
	/**
	 * 信息
	 */
	@GetMapping("/goodsBuyingInfo")
	@ApiOperation(value="求购期货现货详情接口")
	@ApiImplicitParams({
			@ApiImplicitParam(name = "id", dataType = "int", value = "求购id", paramType = "query")
	})
	@RequiresPermissions("offer:goodsbuying:info")
	public R info(@ApiIgnore @RequestParam Long id){
		GoodsBuyingEntity goodsBuying = goodsBuyingService.queryObject(id);
		
		return R.page(goodsBuying,1);
	}
	
	/**
	 * 保存
	 */
	@PostMapping("/save")
	@ApiOperation(value = "求购期货现货新增接口")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
	})
	@RequiresPermissions("offer:goodsbuying:save")
	public R save(@RequestBody GoodsBuyingEntity goodsBuying){
		goodsBuyingService.save(goodsBuying);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@PostMapping("/update")
	@ApiOperation(value = "求购期货现货修改接口")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
	})
	/*@RequiresPermissions("offer:goodsbuying:update")*/
	public R update(@RequestBody GoodsBuyingEntity goodsBuying){
		goodsBuyingService.update(goodsBuying);
		
		return R.ok();
	}
	
	/**
	 * 修改下架
	 */
	@RequestMapping("/updateUnsold")
	@RequiresPermissions("offer:goodsbuying:update")
	public R updateUnsold(@RequestBody Long[] ids){
        Map<String,Object> params=new HashMap<>(16);
        params.put("ids",ids);
        params.put("buyingStatus",1);
		goodsBuyingService.updateUnsold(params);
		
		return R.ok();
	}
	/**
	 * 删除
	 */
	@PostMapping("/delete")
	@ApiOperation(value = "求购期货现货删除接口")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
	})
	@RequiresPermissions("offer:goodsbuying:delete")
	public R delete(@RequestBody Long[] ids){
		goodsBuyingService.deleteBatch(ids);

		return R.ok();
	}
	
}
