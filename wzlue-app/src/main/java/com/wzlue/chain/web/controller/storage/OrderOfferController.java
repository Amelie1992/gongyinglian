
package com.wzlue.chain.web.controller.storage;

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

import com.wzlue.chain.storage.entity.OrderOfferEntity;
import com.wzlue.chain.storage.service.OrderOfferService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 仓储报盘备份
 * 
 * @author 
 * @email 
 * @date 2018-08-29 17:48:31
 */
@RestController
@RequestMapping("/storage/orderoffer")
//@Api("仓储报盘备份")
public class OrderOfferController extends AbstractController{
	@Autowired
	private OrderOfferService orderOfferService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params){
        //查询列表数据
        Query query = new Query(params);

        List<OrderOfferEntity> orderOfferList = orderOfferService.queryList(query);
        int total = orderOfferService.queryTotal(query);

        return R.page(orderOfferList,total);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    //@RequiresPermissions("storage:orderoffer:info")
    public R info(@PathVariable("id") Long id){
        OrderOfferEntity orderOffer = orderOfferService.queryObject(id);

        return R.ok().put("orderOffer", orderOffer);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    //@RequiresPermissions("storage:orderoffer:save")
    public R save(@RequestBody OrderOfferEntity orderOffer){
        orderOfferService.save(orderOffer);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    //@RequiresPermissions("storage:orderoffer:update")
    public R update(@RequestBody OrderOfferEntity orderOffer){
        orderOfferService.update(orderOffer);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    //@RequiresPermissions("storage:orderoffer:delete")
    public R delete(@RequestBody Long[] ids){
        orderOfferService.deleteBatch(ids);

        return R.ok();
    }


    @GetMapping("/getStorageList")
//    @ApiOperation(value = "根据出库公司id查询可出库的仓库")
//    @ApiImplicitParams({
//            @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
//    })
    public R getStorageList(@RequestParam Map<String, Object> map){
        List<Map<String,Object>> list=orderOfferService.getStorageList(map);
        return R.ok().put("list",list);
    }
}
