
package com.wzlue.chain.web.controller.company;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.common.annotation.SysLog;
import com.wzlue.chain.common.base.LogSource;
import com.wzlue.chain.sys.entity.SysUserEntity;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.wzlue.chain.web.controller.sys.AbstractController;

import com.wzlue.chain.company.entity.ReceivingAddressEntity;
import com.wzlue.chain.company.service.ReceivingAddressService;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;


/**
 * 收货地址
 *
 * @author
 * @email
 * @date 2018-08-18 10:55:39
 */
@RestController
@RequestMapping("/company/receivingaddress")
public class ReceivingAddressController extends AbstractController {
    @Autowired
    private ReceivingAddressService receivingaddressService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params) {
        SysUserEntity user = getUser();
        params.put("userId",user.getUserId());
        //查询列表数据
        Query query = new Query(params);

        List<ReceivingAddressEntity> receivingaddressList = receivingaddressService.queryList(query);
        int total = receivingaddressService.queryTotal(query);

        return R.page(receivingaddressList, total);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
//    @RequiresPermissions("company:receivingaddress:info")
    public R info(@PathVariable("id") Integer id) {
        ReceivingAddressEntity receivingaddress = receivingaddressService.queryObject(id);

        return R.ok().put("receivingaddress", receivingaddress);
    }

    /**
     * 保存
     */
    @SysLog(value = "保存收货地址", source = LogSource.PC)
    @RequestMapping("/save")
//    @RequiresPermissions("company:receivingaddress:save")
    public R save(@RequestBody ReceivingAddressEntity receivingaddress) {
        SysUserEntity user = getUser();
        receivingaddress.setCreateBy(Integer.parseInt(String.valueOf(user.getUserId())));
        receivingaddress.setCompanyId(Integer.parseInt(String.valueOf(user.getCompanyId())));
        receivingaddressService.save(receivingaddress);

        return R.ok();
    }

    /**
     * 修改
     */
    @SysLog(value = "修改收货地址", source = LogSource.PC)
    @RequestMapping("/update")
//    @RequiresPermissions("company:receivingaddress:update")
    public R update(@RequestBody ReceivingAddressEntity receivingaddress) {
        receivingaddressService.update(receivingaddress);

        return R.ok();
    }

    /**
     * 删除
     */
    @SysLog(value = "删除收货地址", source = LogSource.PC)
    @RequestMapping("/delete")
//    @RequiresPermissions("company:receivingaddress:delete")
    public R delete(@RequestBody Integer[] ids) {
        receivingaddressService.deleteBatch(ids);

        return R.ok();
    }


    /**
     * 列表
     */
    @RequestMapping("/listByUserId")
    public R listByUserId(@RequestParam Map<String, Object> params) {
        //查询列表数据
        params.put("userId", getUserId());
        Query query = new Query(params);

        List<ReceivingAddressEntity> receivingaddressList = receivingaddressService.queryList(query);
        int total = receivingaddressService.queryTotal(query);

        return R.page(receivingaddressList, total);
    }
}
