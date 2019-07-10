
package com.wzlue.chain.web.controller.sys;

import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
import com.wzlue.chain.sys.entity.SysPushMessageEntity;
import com.wzlue.chain.sys.service.SysPushMessageService;
import com.wzlue.chain.web.controller.wechat.MyWebSocket;
import com.wzlue.chain.web.controller.wechat.SocketMsg;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;


/**
 * 推送消息
 *
 * @author hjw
 * @email love@und.win
 * @date 2018-08-02 09:24:54
 */
@RestController
@RequestMapping("/sys/syspushmessage")
public class SysPushMessageController extends AbstractController {
    @Autowired
    private SysPushMessageService sysPushMessageService;
    @Autowired
    private MyWebSocket webSocket;

    /**
     * 列表
     */
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);

        List<SysPushMessageEntity> sysPushMessageList = sysPushMessageService.queryList(query);
        int total = sysPushMessageService.queryTotal(query);

        return R.page(sysPushMessageList, total);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
//    @RequiresPermissions("sys:syspushmessage:info")
    public R info(@PathVariable("id") Long id) {
        SysPushMessageEntity sysPushMessage = sysPushMessageService.queryObject(id);

        return R.ok().put("sysPushMessage", sysPushMessage);
    }

    /**
     * 查询最新
     */
    @RequestMapping("/pushMsg")
//    @RequiresPermissions("sys:syspushmessage:info")
    public R pushMsg() {
        SysPushMessageEntity sysPushMessage = sysPushMessageService.queryPushMsg();

        return R.ok().put("sysPushMessage", sysPushMessage);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
//    @RequiresPermissions("sys:syspushmessage:save")
    public R save(@RequestBody SysPushMessageEntity sysPushMessage) {
        sysPushMessageService.save(sysPushMessage);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
//    @RequiresPermissions("sys:syspushmessage:update")
    public R update(@RequestBody SysPushMessageEntity sysPushMessage) {
        sysPushMessageService.update(sysPushMessage);

        return R.ok();
    }


    /**
     * 删除
     */
    @RequestMapping("/delete")
//    @RequiresPermissions("sys:syspushmessage:delete")
    public R delete(@RequestBody Long[] ids) {
        sysPushMessageService.deleteBatch(ids);

        return R.ok();
    }

}
