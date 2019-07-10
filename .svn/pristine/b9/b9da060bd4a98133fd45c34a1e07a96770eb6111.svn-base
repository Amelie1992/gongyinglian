
package com.wzlue.chain.web.controller.sys;

import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
import com.wzlue.chain.common.utils.EscapeUtil;
import com.wzlue.chain.sys.entity.SysNoticeEntity;
import com.wzlue.chain.sys.service.SysNoticeService;
import com.wzlue.chain.web.controller.wechat.MyWebSocket;
import net.sf.json.JSONArray;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * 新闻资讯
 *
 * @author hjw
 * @email love@und.win
 * @date 2018-08-27 19:37:10
 */
@RestController
@RequestMapping("/sys/sysnotice")
public class SysNoticeController extends AbstractController {
    @Autowired
    private SysNoticeService sysNoticeService;
    @Autowired
    private MyWebSocket webSocket;

    /**
     * 列表
     */
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);

        List<SysNoticeEntity> sysNoticeList = sysNoticeService.queryList(query);
        int total = sysNoticeService.queryTotal(query);

        for (SysNoticeEntity notice : sysNoticeList) {
            if (Integer.valueOf(notice.getNoticeType())==1) {   //新闻资讯
                notice.setNoticeContent(EscapeUtil.unescape(notice.getNoticeContent()));
            }
        }
        return R.page(sysNoticeList, total);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
//    @RequiresPermissions("sys:sysnotice:info")
    public R info(@PathVariable("id") Long id) {
        SysNoticeEntity sysNotice = sysNoticeService.queryObject(id);

        return R.ok().put("sysNotice", sysNotice);
    }

    /**
     * 获取最新的通知
     */
    @RequestMapping("/getNow")
//    @RequiresPermissions("sys:sysnotice:info")
    public R getNow(@RequestBody Map<String, Object> params) {
        SysNoticeEntity sysNotice = sysNoticeService.queryNewObject(new SysNoticeEntity());
        //List<SysNoticeEntity> sysNotice = sysNoticeService.queryNow(params);

        return R.ok(sysNotice);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
//    @RequiresPermissions("sys:sysnotice:save")
    @Transactional(rollbackFor = Exception.class)
    public R save(@RequestBody SysNoticeEntity sysNotice) {
        sysNotice.setCreatedBy(getUserId());
        sysNotice.setAdviceUserName(getUser().getUsername());
        sysNotice.setCreatedTime(new Date());
        sysNoticeService.save(sysNotice);
        Map<String, Object> params = new HashMap<>();
        if ("0".equals(sysNotice.getNoticeType())) {
            params.put("positionId", sysNotice.getPositionId());
            try {
                List<SysNoticeEntity> sysNotices = sysNoticeService.queryNow(params);
                JSONArray jsons = JSONArray.fromObject(sysNotices);
                webSocket.sendMessage(jsons.toString(), sysNotice.getPositionId());
            } catch (IOException e) {

            }
        }
        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
//    @RequiresPermissions("sys:sysnotice:update")
    public R update(@RequestBody SysNoticeEntity sysNotice) {
        sysNotice.setUpdatedBy(getUserId());
        sysNotice.setUpdatedTime(new Date());
        sysNoticeService.update(sysNotice);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
//    @RequiresPermissions("sys:sysnotice:delete")
    public R delete(@RequestBody Long[] ids) {
        sysNoticeService.deleteBatch(ids);

        return R.ok();
    }

}
