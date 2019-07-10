
package com.wzlue.chain.web.controller.marketing;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.wzlue.chain.company.entity.MerchantCompanyEntity;
import com.wzlue.chain.company.service.MerchantCompanyService;
import com.wzlue.chain.marketing.entity.MarketAuctionEntity;
import com.wzlue.chain.marketing.service.MarketAuctionService;
import com.wzlue.chain.sys.entity.SysUserEntity;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.wzlue.chain.web.controller.sys.AbstractController;

import com.wzlue.chain.marketing.entity.MarketBidRecordEntity;
import com.wzlue.chain.marketing.service.MarketBidRecordService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;


/**
 * 拍卖出价记录表
 *
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-09-26 13:48:09
 */
@RestController
@RequestMapping("/marketing/marketbidrecord")
public class MarketBidRecordController extends AbstractController {
    @Autowired
    private MarketBidRecordService marketBidRecordService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);

        List<MarketBidRecordEntity> marketBidRecordList = marketBidRecordService.queryList(query);
        int total = marketBidRecordService.queryTotal(query);

        return R.page(marketBidRecordList, total);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("marketing:marketbidrecord:info")
    public R info(@PathVariable("id") Long id) {
        MarketBidRecordEntity marketBidRecord = marketBidRecordService.queryObject(id);

        return R.ok().put("marketBidRecord", marketBidRecord);
    }

    /**
     * 保存
     */
    @PostMapping("/save")
//    @RequiresPermissions("marketing:marketbidrecord:save")
    @ApiOperation(value = "竞拍出价新增接口")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
    })
    public R save(@RequestBody MarketBidRecordEntity marketBidRecord) {
        Long companyId = getUser().getCompanyId();
        if (companyId == null) {    //管理员登录
            return R.error("请以公司角色进行拍卖");
        } else {
            marketBidRecordService.save(marketBidRecord);
            return R.ok();
        }
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("marketing:marketbidrecord:update")
    public R update(@RequestBody MarketBidRecordEntity marketBidRecord) {
        marketBidRecordService.update(marketBidRecord);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("marketing:marketbidrecord:delete")
    public R delete(@RequestBody Long[] ids) {
        marketBidRecordService.deleteBatch(ids);

        return R.ok();
    }

}
