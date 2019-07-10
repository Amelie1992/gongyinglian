
package com.wzlue.chain.web.controller.logistics;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.sys.entity.SysUserEntity;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.wzlue.chain.web.controller.sys.AbstractController;

import com.wzlue.chain.logistics.entity.LogisticsContractEntity;
import com.wzlue.chain.logistics.service.LogisticsContractService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;


/**
 * (物流订单)合同信息表
 *
 * @author pengyong
 * @email sunlightcs@gmail.com
 * @date 2018-09-18 16:30:22
 */
@RestController
@RequestMapping("/logistics/logisticscontract")
public class LogisticsContractController extends AbstractController {
    @Autowired
    private LogisticsContractService logisticsContractService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        query.put("companyId", getUser().getCompanyId());//---------------过滤条件
        List<LogisticsContractEntity> logisticsContractList = logisticsContractService.queryList(query);
        int total = logisticsContractService.queryTotal(query);

        return R.page(logisticsContractList, total);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("logistics:logisticscontract:info")
    public R info(@PathVariable("id") Long id) {
        LogisticsContractEntity logisticsContract = logisticsContractService.queryObject(id);

        return R.ok().put("logisticsContract", logisticsContract);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("logistics:logisticscontract:save")
    public R save(@RequestBody LogisticsContractEntity logisticsContract) {
        SysUserEntity user = getUser();
        logisticsContract.setCreatedBy(Math.toIntExact(user.getUserId()));
        logisticsContract.setCompanyId(Math.toIntExact(user.getCompanyId()));
        logisticsContractService.save(logisticsContract);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("logistics:logisticscontract:update")
    public R update(@RequestBody LogisticsContractEntity logisticsContract) {
        logisticsContractService.update(logisticsContract);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("logistics:logisticscontract:delete")
    public R delete(@RequestBody Long[] ids) {
        logisticsContractService.deleteBatch(ids);

        return R.ok();
    }

    /**
     * 验证合同编号是否重复
     *
     * @param logisticsContractEntity
     * @return
     */
    @RequestMapping("/checkCode")
    @RequiresPermissions("logistics:logisticscontract:info")
    public R checkCode(@RequestBody LogisticsContractEntity logisticsContractEntity) {
         logisticsContractEntity.setCompanyId(Math.toIntExact(getUser().getCompanyId()));
         logisticsContractEntity = logisticsContractService.checkCode(logisticsContractEntity);
        return R.ok().put("contractNumber", logisticsContractEntity);
    }

    /**
     * 校验合同编号是否已经存在
     */
    @RequestMapping("/check")
    public R check(@RequestParam Map<String, Object> map) {
        String contractNumber = (String) map.get("contractNumber");
        String contractId = (String) map.get("contractId");
        Integer count = null;
        if (contractId == null) {  //新增合同 or 下单验证合同号
            count = logisticsContractService.checkName(contractNumber);
        } else {     //修改合同
            LogisticsContractEntity logisticsContract = logisticsContractService.queryObject(Long.valueOf(contractId));
            if (!logisticsContract.getContractNumber().equals(contractNumber)){
                count = logisticsContractService.checkName(contractNumber);
            }
        }
        return R.ok().put("count", count);
    }
}
