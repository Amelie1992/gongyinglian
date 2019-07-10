
package com.wzlue.chain.web.controller.storage;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.wzlue.chain.storage.entity.FeeObj;
import com.wzlue.chain.storage.entity.OrderCostEntity;
import com.wzlue.chain.storage.entity.StorageOutCommodityEntity;
import com.wzlue.chain.storage.service.OrderCostService;
import com.wzlue.chain.storage.service.StorageOutCommodityService;
import com.wzlue.chain.sys.entity.SysUserEntity;
import com.wzlue.chain.sys.service.SysNumberRuleService;
import net.sf.json.JSONArray;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.wzlue.chain.web.controller.sys.AbstractController;

import com.wzlue.chain.storage.entity.StorageOutEntity;
import com.wzlue.chain.storage.service.StorageOutService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;


/**
 * 仓储出库
 *
 * @author
 * @email
 * @date 2018-09-15 11:17:18
 */
@RestController
@RequestMapping("/storage/storageout")
public class StorageOutController extends AbstractController {
    @Autowired
    private StorageOutService storageOutService;
    @Autowired
    private SysNumberRuleService sysNumberRuleService;
    @Autowired
    private StorageOutCommodityService storageOutCommodityService;
    @Autowired
    private OrderCostService orderCostService;

    /**
     * 列表，买家出库单
     */
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        SysUserEntity user = getUser();
        if (user.getCompanyId() != null) {
            query.put("merchantId", user.getCompanyId());
        }

        List<StorageOutEntity> storageOutList = storageOutService.queryList(query);
        int total = storageOutService.queryTotal(query);

        return R.page(storageOutList, total);
    }

    /**
     * 列表，仓库方收到的出库单
     */
    @RequestMapping("/list2")
    public R list2(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        SysUserEntity user = getUser();
        if (user.getCompanyId() != null) {
            query.put("companyId", user.getCompanyId());
        }

        List<StorageOutEntity> storageOutList = storageOutService.queryList(query);
        int total = storageOutService.queryTotal(query);

        return R.page(storageOutList, total);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("storage:storageout:info")
    public R info(@PathVariable("id") Long id) {
        StorageOutEntity storageOut = storageOutService.queryObject(id);
        Map<String, Object> map = new HashMap<>();
        map.put("outId", storageOut.getId());
        List<StorageOutCommodityEntity> commodityEntityList = storageOutCommodityService.queryList(map);
        if (storageOut.getStatus() == 1) {    //1：已出库 显示订单其他费用
            OrderCostEntity orderCost = orderCostService.queryObjectByOutId(storageOut.getId());
            if (orderCost != null) {
                if (StringUtils.isNotBlank(orderCost.getMoney16())) {
                    List<FeeObj> feeList = JSONArray.toList(JSONArray.fromObject(orderCost.getMoney16()), FeeObj.class);
                    orderCost.setFeeList(feeList);
                }
            }
            return R.ok().put("storageOut", storageOut).put("commodityEntityList", commodityEntityList).put("orderCost", orderCost);
        } else {
            return R.ok().put("storageOut", storageOut).put("commodityEntityList", commodityEntityList);
        }

    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("storage:storageout:save")
    public R save(@RequestBody StorageOutEntity storageOut) {
        SysUserEntity user = getUser();
        storageOut.setCode(sysNumberRuleService.getCodeNumber("out_code"));//出库单号
        storageOut.setStatus(0);
        storageOut.setMerchantId(user.getCompanyId());
        storageOut.setDeptId(user.getDepartmentId());
        storageOut.setCreateTime(new Date());
        storageOut.setCreateBy(user.getUserId());
        storageOut.setDelFlag(0);
        storageOut.setUpdateBy(user.getUserId());
        storageOut.setUpdateTime(new Date());
        storageOutService.save(storageOut);

        return R.ok();
    }

    /**
     * 买方修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("storage:storageout:update")
    public R update(@RequestBody StorageOutEntity storageOut) {
        SysUserEntity user = getUser();
        storageOut.setUpdateBy(user.getUserId());
        storageOut.setUpdateTime(new Date());
        storageOutService.updateOutOrCommodity(storageOut);

        return R.ok();
    }

    /**
     * 仓库方确认已出库
     */
    @RequestMapping("/update2")
    @RequiresPermissions("storage:storageout:update")
    public R update2(@RequestBody StorageOutEntity storageOut) {
        SysUserEntity user = getUser();
        storageOut.setUpdateBy(user.getUserId());
        storageOut.setUpdateTime(new Date());
        storageOut.setStatus(1);
        storageOutService.update(storageOut);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("storage:storageout:delete")
    public R delete(@RequestBody Long[] ids) {
        storageOutService.deleteBatch(ids);

        return R.ok();
    }

}
