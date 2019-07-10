
package com.wzlue.chain.web.controller.bill;

import java.util.List;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.wzlue.chain.web.controller.sys.AbstractController;

import com.wzlue.chain.bill.entity.MyAccountEntity;
import com.wzlue.chain.bill.service.MyAccountService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;


/**
 * 我的账户
 *
 * @author
 * @email
 * @date 2018-09-20 10:55:05
 */
@RestController
@RequestMapping("/bill/myaccount")
public class MyAccountController extends AbstractController {
    @Autowired
    private MyAccountService myAccountService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);

        List<MyAccountEntity> myAccountList = myAccountService.queryList(query);
        int total = myAccountService.queryTotal(query);

        return R.page(myAccountList, total);
    }

    /**
     * 账户
     */
    @RequestMapping("/queryMyAccount")
    public R queryMyAccount() {

        MyAccountEntity myAccountEntity = myAccountService.queryMyAccount(getUser().getUserId());

        return R.ok().put("myAccountEntity", myAccountEntity);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    //@RequiresPermissions("bill:myaccount:info")
    public R info(@PathVariable("id") Integer id) {
        MyAccountEntity myAccount = myAccountService.queryObject(id);

        return R.ok().put("myAccount", myAccount);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    //@RequiresPermissions("bill:myaccount:save")
    public R save(@RequestBody MyAccountEntity myAccount) {
        myAccountService.save(myAccount);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    //@RequiresPermissions("bill:myaccount:update")
    public R update(@RequestBody MyAccountEntity myAccount) {
        myAccountService.update(myAccount);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    //@RequiresPermissions("bill:myaccount:delete")
    public R delete(@RequestBody Integer[] ids) {
        myAccountService.deleteBatch(ids);

        return R.ok();
    }

}
