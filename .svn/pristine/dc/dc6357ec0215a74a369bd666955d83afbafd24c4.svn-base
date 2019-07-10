
package com.wzlue.chain.web.controller.declare;

import java.net.*;
import java.util.Date;
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

import com.wzlue.chain.declare.entity.DeclareContractEntity;
import com.wzlue.chain.declare.service.DeclareContractService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
import springfox.documentation.annotations.ApiIgnore;


/**
 * (订单)合同信息表
 *
 * @author
 * @email
 * @date 2018-09-17 10:57:26
 */
@RestController
@RequestMapping("/declare/declarecontract")
@Api("报关合同")
public class DeclareContractController extends AbstractController {
    @Autowired
    private DeclareContractService declareContractService;

    /**
     * 列表
     */
    @GetMapping("/list")
    @ApiOperation("报关合同列表")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
    })
    public R list(@ApiIgnore @RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        query.put("userId",getUserId());
        List<DeclareContractEntity> declareContractList = declareContractService.pageList(query);
        int total = declareContractService.pageTotal(query);

        return R.page(declareContractList, total);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("declare:declarecontract:info")
    public R info(@PathVariable("id") Long id) {
        DeclareContractEntity declareContract = declareContractService.queryInfo(id);

        return R.ok().put("declareContract", declareContract);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("declare:declarecontract:save")
    public R save(@RequestBody DeclareContractEntity declareContract) {
        declareContract.setCreateBy(getUserId());
        declareContract.setUpdateBy(getUserId());
        declareContractService.save(declareContract);
        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("declare:declarecontract:update")
    public R update(@RequestBody DeclareContractEntity declareContract) {
        declareContractService.update(declareContract);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("declare:declarecontract:delete")
    public R delete(@RequestBody Long[] ids) {
        declareContractService.deleteBatch(ids);

        return R.ok();
    }


}
