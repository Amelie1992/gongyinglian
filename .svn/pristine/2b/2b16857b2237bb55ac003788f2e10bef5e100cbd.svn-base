package com.wzlue.chain.web.controller.sys;

import cn.hutool.core.util.ReUtil;
import cn.hutool.core.util.StrUtil;
import com.wzlue.chain.chatMsg.service.ChatMessageService;
import com.wzlue.chain.common.annotation.SysLog;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
import com.wzlue.chain.common.utils.Constant;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.validator.Assert;
import com.wzlue.chain.common.validator.ValidatorUtils;
import com.wzlue.chain.common.validator.group.AddGroup;
import com.wzlue.chain.common.validator.group.UpdateGroup;
import com.wzlue.chain.company.service.MerchantCompanyService;
import com.wzlue.chain.sys.MSdx.ApiDemo4Java;
import com.wzlue.chain.sys.entity.SysUserEntity;
import com.wzlue.chain.sys.form.PasswordForm;
import com.wzlue.chain.sys.service.SysUserRoleService;
import com.wzlue.chain.sys.service.SysUserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang.RandomStringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 系统用户
 *
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年10月31日 上午10:40:10
 */
@RestController
@RequestMapping("/sys/user")
@Api(value = "系统用户接口")
public class SysUserController extends AbstractController {
    @Autowired
    private SysUserService sysUserService;
    @Autowired
    private SysUserRoleService sysUserRoleService;
    @Autowired
    private ChatMessageService chatMessageService;
    @Autowired
    private MerchantCompanyService merchantCompanyService;
    /**
     * 所有用户列表,token,params{}
     */
    @PostMapping("/list")
    //@RequiresPermissions("sys:user:list")
    @ApiOperation(value = "所有用户列表接口", notes = "参数分别为token,params{\"page\":\"当前页\",\"limit\":\"展示条数\"}")
    @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
    public R list(@RequestBody Map<String, Object> params) {
        //只有超级管理员，才能查看所有管理员列表
        if (getUserId() != Constant.SUPER_ADMIN) {
            params.put("createUserId", getUserId());
        }

        //查询列表数据
        Query query = new Query(params);
        List<SysUserEntity> userList = sysUserService.queryList(query);
        int total = sysUserService.queryTotal(query);

        PageUtils pageUtil = new PageUtils(userList, total, query.getLimit(), query.getPage());

        return R.ok().put("page", pageUtil);
    }

    /**
     * 所有用户列表,token,params
     */
    @PostMapping("/listAllByParams")
    //@RequiresPermissions("sys:user:list")
    @ApiOperation(value = "用户列表接口", notes = "参数分别为token,params{\"page\":\"当前页\",\"limit\":\"展示条数\"}")
    @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
    public R listAllByParams(@RequestBody Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        List<SysUserEntity> userList = sysUserService.queryList(query);
        int total = sysUserService.queryTotal(query);

        PageUtils pageUtil = new PageUtils(userList, total, query.getLimit(), query.getPage());

        return R.ok().put("page", pageUtil);
    }

    /**
     * 获取登录的用户信息,token
     */
    @GetMapping("/info")
    @ApiOperation(value = "获取登录人信息接口")
    @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
    public R info() {
        SysUserEntity user = getUser();
        // 设置当前登陆公司名称
        user.setCompanyName(merchantCompanyService.queryByUserId(user.getUserId()).getCompanyName());
        return R.ok(user);
    }

    /**
     * 修改登录用户密码,newPassword,password,token
     */
    @SysLog("修改密码")
    @PostMapping("/password")
    @ApiOperation(value = "修改密码接口")
    @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
    public R password(@RequestBody PasswordForm form) {
        Assert.isBlank(form.getNewPassword(), "新密码不为能空");

        //sha256加密
        String password = new Sha256Hash(form.getPassword(), getUser().getSalt()).toHex();
        //sha256加密
        String newPassword = new Sha256Hash(form.getNewPassword(), getUser().getSalt()).toHex();

        //更新密码
        int count = sysUserService.updatePassword(getUserId(), password, newPassword);
        if (count == 0) {
            return R.error("原密码不正确");
        }

        return R.ok();
    }

    @SysLog("重置密码密码")
    @PostMapping("/resetpassword")
    public R resetpassword(@RequestBody Map<String, Object> map) {
        // 检验参数
        R r = checkRestpassword(map);
        if (!"0".equals(r.get("code").toString())) return r;

        // 获取短信验证码并验证密码
        if (!ApiDemo4Java.yz(map.get("mobile").toString(), map.get("smsCode").toString()))
            return R.error("短信码错误!");
        

        // 设置盐
        String salt = RandomStringUtils.randomAlphanumeric(20);
        // 设置新密码
        String newPassword = new Sha256Hash(map.get("newPassword").toString(), salt).toHex();
        // 修改密码
        int count = sysUserService.updatePasswordByUserName(map.get("mobile").toString(), salt, newPassword);
        if (count == 0) {
            return R.error("密码重置失败");
        }
        return R.ok();
    }

    private R checkRestpassword(Map<String, Object> map) {

        if (StrUtil.hasBlank((String) map.get("mobile")) && ((String) map.get("mobile")).length() == 11) {
            return R.error("请输入正确的手机号码");
        }

        if (StrUtil.hasBlank((String) map.get("smsCode"))) {
            return R.error("验证码错误");
        }

        if (StrUtil.hasBlank((String) map.get("newPassword"))) {
            return R.error("密码错误");
        }

        return R.ok();

    }

    /**
     * 用户信息
     */
    @GetMapping("/info/{userId}")
    //@RequiresPermissions("sys:user:info")
    @ApiOperation(value = "用户信息接口")
    @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
    public R info(@PathVariable("userId") Long userId) {
        SysUserEntity user = sysUserService.queryObject(userId);
        user.setCompanyName(merchantCompanyService.queryByUserId(user.getUserId()).getCompanyName());

        //获取用户所属的角色列表
        List<Long> roleIdList = sysUserRoleService.queryRoleIdList(userId);
        user.setRoleIdList(roleIdList);

        return R.ok().put("user", user);
    }

    /**
     * 保存用户
     */
    @SysLog("保存用户")
    @PostMapping("/save")
    //@RequiresPermissions("sys:user:save")
    @ApiOperation(value = "保存用户接口")
    @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
    public R save(@RequestBody SysUserEntity user) {
        ValidatorUtils.validateEntity(user, AddGroup.class);

        user.setCreateUserId(getUserId());
        sysUserService.save(user);

        return R.ok();
    }

    /**
     * 注册
     */
    @SysLog("注册")
    @ApiOperation(value = "注册")
    @PostMapping("/register")
    public R register(@RequestBody SysUserEntity user) {
        ValidatorUtils.validateEntity(user, AddGroup.class);

        sysUserService.save(user);
        chatMessageService.createNewIMUser(user.getUsername(),user.getNikename());

        return R.ok();
    }

    /**
     * 修改用户
     */
    @SysLog("修改用户")
    @PostMapping("/update")
    //@RequiresPermissions("sys:user:update")
    @ApiOperation(value = "修改用户接口")
    @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
    public R update(@RequestBody SysUserEntity user) {
        ValidatorUtils.validateEntity(user, UpdateGroup.class);

        user.setCreateUserId(getUserId());
        sysUserService.update(user);

        return R.ok();
    }

    /**
     * 删除用户
     */
    @SysLog("删除用户")
    @PostMapping("/delete")
    //@RequiresPermissions("sys:user:delete")
    @ApiOperation(value = "删除用户接口")
    @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
    public R delete(@RequestBody Long[] userIds) {
        if (ArrayUtils.contains(userIds, 1L)) {
            return R.error("系统管理员不能删除");
        }

        if (ArrayUtils.contains(userIds, getUserId())) {
            return R.error("当前用户不能删除");
        }

        sysUserService.deleteBatch(userIds);

        return R.ok();
    }


    /**
     * 修改用户
     */
    @SysLog("修改用户")
    @PostMapping("/updateHeader")
    /*//@RequiresPermissions("sys:user:update")*/
    @ApiOperation(value = "修改头像")
    @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
    public R updateHeader(@RequestBody SysUserEntity user) {
        if(null == getUser() )
            return R.error("登陆失效");
        SysUserEntity users = getUser();
        users.setHeader(user.getHeader());
        boolean bl = sysUserService.updateHeader(users);
        if(!bl)
            return R.error();
        return R.ok();
    }

    @SysLog("注册-发送短信验证码")
    @PostMapping("/sendSMS")
    @ApiOperation(value = "注册-发送短信验证码")
    public R sendSMS(@RequestBody String mobile) {

        String smsCode = null;
        String regex = "^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(166)|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9]))\\d{8}$";
        if (!"".equals(mobile) && ReUtil.contains(regex, mobile)) {
            SysUserEntity userEntity = sysUserService.queryByUserName(mobile);
            if (null != userEntity)
                return R.error("手机号码已被注册！");

            ApiDemo4Java.send(mobile);

            return R.ok();
        }

        return R.error();
    }

}
