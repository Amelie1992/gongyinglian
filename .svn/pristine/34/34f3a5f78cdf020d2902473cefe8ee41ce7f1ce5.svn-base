
package com.wzlue.chain.web.controller.complaint;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.sys.entity.SysUserEntity;
import com.wzlue.chain.sys.service.ImageService;
import com.wzlue.chain.sys.service.SysUserRoleService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.wzlue.chain.web.controller.sys.AbstractController;

import com.wzlue.chain.complaint.entity.ComplaintEntity;
import com.wzlue.chain.complaint.service.ComplaintService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;


/**
 * 投诉管理
 *
 * @author
 * @email
 * @date 2018-09-07 09:42:11
 */
@RestController
@RequestMapping("/complaint/complaint")
public class ComplaintController extends AbstractController {
    @Autowired
    private ComplaintService complaintService;
    @Autowired
    private SysUserRoleService sysUserRoleService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        List<ComplaintEntity> complaintList = null;
        int total = 0;
        boolean flag = false;
        Long userId = getUserId();
        List<Long> roleIds = sysUserRoleService.queryRoleIdList(userId);
        for (Long roleId : roleIds) {
            if (roleId.intValue() == 1) {
                flag = true;
            }
        }
//        if (flag ==true) {    //系统管理员登录
//
//        }
        SysUserEntity user = getUser();
        //admin登录 或者 系统管理员登录
        if (user.getCompanyId() == null && user.getTypeId().equals("0") && user.getCustomerService() == false || flag == true) {
            complaintList = complaintService.queryList(query);
            total = complaintService.queryTotal(query);
        }
        return R.page(complaintList, total);
    }

    @RequestMapping("/list1")
    public R list1(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        List<ComplaintEntity> complaintList = null;
        int total = 0;
//        boolean flag = false;
//        Long userId = getUserId();
//        List<Long> roleIds = sysUserRoleService.queryRoleIdList(userId);
//        for (Long roleId : roleIds) {
//            if (roleId.intValue() == 1) {
//                flag = true;
//            }
//        }
//        if (flag == true) {    //平台登录
//            return R.page(complaintList, total);
//        } else {
//            Long companyId = getUser().getCompanyId();
//            if (companyId != null) {
//                query.put("complaintFromId", companyId.intValue());
//            }
        SysUserEntity user = getUser();
        if (user.getCompanyId() == null && user.getTypeId().equals("0") && user.getCustomerService() == false) {
            return R.page(complaintList, total);
        } else {
            query.put("complaintFromId", getUser().getCompanyId());
            complaintList = complaintService.queryList(query);
            total = complaintService.queryTotal(query);
            return R.page(complaintList, total);
        }

//        }
    }

    @RequestMapping("/list2")
    public R list2(@RequestParam Map<String, Object> params) {
        Query query = new Query(params);
        List<ComplaintEntity> complaintList = null;
        int total = 0;
//        boolean flag = false;
//        Long userId = getUserId();
//        List<Long> roleIds = sysUserRoleService.queryRoleIdList(userId);
//        for (Long roleId : roleIds) {
//            if (roleId.intValue() == 1) {
//                flag = true;
//            }
//        }
//        if (flag == true) {    //平台登录
//            return R.page(complaintList, total);
//        } else {
//            Long companyId = getUser().getCompanyId();
//            if (companyId != null) {
//                query.put("complaintToId", companyId.intValue());
//            }
        SysUserEntity user = getUser();
        if (user.getCompanyId() == null && user.getTypeId().equals("0") && user.getCustomerService() == false) {
            return R.page(complaintList, total);
        } else {
            query.put("complaintToId", getUser().getCompanyId());
            complaintList = complaintService.queryList(query);
            total = complaintService.queryTotal(query);
            return R.page(complaintList, total);
        }
//        }
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("complaint:complaint:info")
    public R info(@PathVariable("id") Integer id) {
        ComplaintEntity complaint = complaintService.queryObject(id);

        return R.ok().put("complaint", complaint);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("complaint:complaint:save")
    public R save(@RequestBody ComplaintEntity complaint) {
        complaintService.save(complaint);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("complaint:complaint:update")
    public R update(@RequestBody ComplaintEntity complaint) {
        complaintService.update(complaint);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("complaint:complaint:delete")
    public R delete(@RequestBody Integer[] ids) {
        complaintService.deleteBatch(ids);

        return R.ok();
    }

    /**
     * 处理
     */
    @RequestMapping("/handle")
    @RequiresPermissions("complaint:complaint:update")
    public R handle(@RequestBody ComplaintEntity complaint) {
        complaintService.handle(complaint);

        return R.ok();
    }


    @RequestMapping("/detail")
    @RequiresPermissions("complaint:complaint:info")
    public R detail(@RequestBody ComplaintEntity complaint) {
        complaint.setCompanyId(getUser().getCompanyId().intValue());
        complaint = complaintService.queryObjectByOrderIdAndCompanyId(complaint);
        return R.ok(complaint);
    }

    /**
     * 查询当前订单是否已经投诉
     *
     * @param id
     * @return
     */
    @RequestMapping("/getComplaint/{id}")
    public R getComplaint(@PathVariable("id") String id) {
        int count = complaintService.getComplaint(id);
        return R.ok().put("count", count);
    }

}
