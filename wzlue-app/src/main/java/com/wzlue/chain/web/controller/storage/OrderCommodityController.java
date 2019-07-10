
package com.wzlue.chain.web.controller.storage;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.wzlue.chain.storage.entity.StorageOutCommodityEntity;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.wzlue.chain.web.controller.sys.AbstractController;

import com.wzlue.chain.storage.entity.OrderCommodityEntity;
import com.wzlue.chain.storage.service.OrderCommodityService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
import springfox.documentation.annotations.ApiIgnore;


/**
 * 订单货物商品表
 * 
 * @author 
 * @email 
 * @date 2018-08-29 17:48:31
 */
@RestController
@RequestMapping("/storage/ordercommodity")
@Api("仓储订单货物")
public class OrderCommodityController extends AbstractController{
	@Autowired
	private OrderCommodityService orderCommodityService;

	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
		Query query = new Query(params);

		List<OrderCommodityEntity> orderCommodityList = orderCommodityService.queryList(query);
		int total = orderCommodityService.queryTotal(query);

		return R.page(orderCommodityList,total);
	}


	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	//@RequiresPermissions("storage:ordercommodity:info")
	public R info(@PathVariable("id") Long id){
		OrderCommodityEntity orderCommodity = orderCommodityService.queryObject(id);

		return R.ok().put("orderCommodity", orderCommodity);
	}

	/**
	 * 保存
	 */
	@RequestMapping("/save")
	//@RequiresPermissions("storage:ordercommodity:save")
	public R save(@RequestBody OrderCommodityEntity orderCommodity){
		orderCommodityService.save(orderCommodity);

		return R.ok();
	}

	/**
	 * 修改
	 */
	@RequestMapping("/update")
	//@RequiresPermissions("storage:ordercommodity:update")
	public R update(@RequestBody OrderCommodityEntity orderCommodity){
		orderCommodityService.update(orderCommodity);

		return R.ok();
	}

	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	//@RequiresPermissions("storage:ordercommodity:delete")
	public R delete(@RequestBody Long[] ids){
		orderCommodityService.deleteBatch(ids);

		return R.ok();
	}

	/**
	 * 根据订单id查询货物信息
	 * @param id
	 * @return
	 */
	@GetMapping("/getListByOrderId")
//    @ApiOperation(value = "根据仓储订单id查询货物信息的接口")
//    @ApiImplicitParams({
//            @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
//    })
	public R getListByOrderId(@RequestBody Long id){
		Map<String,Object> map=new HashMap<>();
		map.put("orderId",id);
		List<OrderCommodityEntity> commodityEntityList = orderCommodityService.queryList(map);
		return R.ok().put("commodityEntityList",commodityEntityList);
	}


	/**
	 * 根据公司id获取可出库的商品信息
	 * @param map
	 * @return
	 */
	@GetMapping("/getOutCommoditys")
    @ApiOperation(value = "根据公司id获取可出库的商品信息的接口")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string"),
			@ApiImplicitParam(paramType = "query", name = "companyId", value = "仓库公司id", required = true, dataType = "int"),
			@ApiImplicitParam(paramType = "query", name = "storageName", value = "仓库名称", required = true, dataType = "string"),
            @ApiImplicitParam(paramType = "query", name = "orderNumber", value = "订单编号", required = true, dataType = "string")
    })
	public R getOutCommoditys(@ApiIgnore @RequestParam Map<String, Object> map){
		List<StorageOutCommodityEntity> list=orderCommodityService.queryCommoditys(map);
		return R.ok(list);
	}
	
}
