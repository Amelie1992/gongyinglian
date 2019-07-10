
package com.wzlue.chain.web.controller.afterSale;

import java.util.List;
import java.util.Map;


import com.wzlue.chain.sys.entity.SysUserEntity;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.wzlue.chain.web.controller.sys.AbstractController;

import com.wzlue.chain.afterSale.entity.AfterSaleEntity;
import com.wzlue.chain.afterSale.service.AfterSaleService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
import springfox.documentation.annotations.ApiIgnore;


/**
 * 售后服务
 *
 * @author
 * @email
 * @date 2018-08-31 13:38:09
 */
@RestController
@RequestMapping("/afterSale/aftersale")
@Api(value = "售后服务")
public class AfterSaleController extends AbstractController {
    @Autowired
    private AfterSaleService afterSaleService;

    /**
     * 列表
     */
    @GetMapping("/list/buyer")
    @ApiOperation(value = "我申请的售后列表接口")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string"),
            @ApiImplicitParam(paramType = "query", name = "page", value = "页码", defaultValue = "1", dataType = "int"),
            @ApiImplicitParam(paramType = "query", name = "limit", value = "一页几条", defaultValue = "10", dataType = "int"),
            @ApiImplicitParam(paramType = "query", name = "serviceType", value = "服务类型0：退货 1： 换货 2：索赔", dataType = "int")
    })
    public R list1(@ApiIgnore @RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        //当前用户的公司id作为查询参数
        Long companyId = getUser().getCompanyId();
        if (companyId != null){
            query.put("buyerId",companyId.intValue());
        }
        List<AfterSaleEntity> afterSaleList = afterSaleService.queryList(query);
        int total = afterSaleService.queryTotal(query);
        return R.page(afterSaleList,total);
    }

    @GetMapping("/list/seller")
    @ApiOperation(value = "向我申请的售后列表接口")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string"),
            @ApiImplicitParam(paramType = "query", name = "page", value = "页码", defaultValue = "1", dataType = "int"),
            @ApiImplicitParam(paramType = "query", name = "limit", value = "一页几条", defaultValue = "10", dataType = "int"),
            @ApiImplicitParam(paramType = "query", name = "serviceType", value = "服务类型0：退货 1： 换货 2：索赔", dataType = "int")
    })
    public R list2(@ApiIgnore @RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        Long companyId = getUser().getCompanyId();
        if (companyId != null){
            query.put("sellerId",companyId.intValue());
        }
        List<AfterSaleEntity> afterSaleList = afterSaleService.queryList(query);
        int total = afterSaleService.queryTotal(query);
        return R.page(afterSaleList,total);
    }


    /**
     * 信息
     */
    @GetMapping("/info/{id}")
    @RequiresPermissions("afterSale:aftersale:info")
    @ApiOperation(value = "售后详情接口")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
    })
    public R info(@PathVariable("id") String id) {
        AfterSaleEntity afterSale = afterSaleService.queryObject(id);

        return R.ok().put("afterSale", afterSale);
    }

    /**
     * 保存
     */
    @PostMapping("/save")
    @RequiresPermissions("afterSale:aftersale:save")
    @ApiOperation(value = "售后新增接口")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
    })
    public R save(@RequestBody AfterSaleEntity afterSale) {
        afterSaleService.save(afterSale);

        return R.ok();
    }

    /**
     * 修改
     */
    @PostMapping("/update")
    @RequiresPermissions("afterSale:aftersale:update")
    @ApiOperation(value = "售后修改接口")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
    })
    public R update(@RequestBody AfterSaleEntity afterSale) {
        afterSaleService.update(afterSale);

        return R.ok();
    }

    /**
     * 删除
     */
    @PostMapping("/delete")
    @RequiresPermissions("afterSale:aftersale:delete")
    @ApiOperation(value = "售后删除接口")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
    })
    public R delete(@RequestBody String[] ids) {
        afterSaleService.deleteBatch(ids);

        return R.ok();
    }

    /**
     * 处理
     */
    @PostMapping("/handle")
    @RequiresPermissions("afterSale:aftersale:update")
    @ApiOperation(value = "售后处理接口")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
    })
    public R handle(@RequestBody AfterSaleEntity afterSale) {
        afterSaleService.handle(afterSale);

        return R.ok();
    }

}
