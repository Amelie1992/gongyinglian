
package com.wzlue.chain.web.controller.company;

import java.util.List;
import java.util.Map;

import cn.hutool.core.util.StrUtil;
import com.wzlue.chain.chatMsg.service.ChatMessageService;
import com.wzlue.chain.common.annotation.JsonObject;
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

import com.wzlue.chain.company.entity.EmployeeEntity;
import com.wzlue.chain.company.service.EmployeeService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;


/**
 * 员工
 *
 * @author
 * @email
 * @date 2018-08-22 14:37:00
 */
@RestController
@RequestMapping("/company/employee")
public class EmployeeController extends AbstractController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private ChatMessageService chatMessageService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);

        List<EmployeeEntity> employeeList = employeeService.queryList(query);
        int total = employeeService.queryTotal(query);

        return R.page(employeeList, total);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("company:employee:info")
    public R info(@PathVariable("id") Integer id) {
        EmployeeEntity employee = employeeService.queryObject(id);

        return R.ok().put("employee", employee);
    }

    /**
     * 保存
     */
    @SysLog(value = "保存员工", source = LogSource.PC)
    @RequestMapping("/save")
    @RequiresPermissions("company:employee:save")
    public R save(@JsonObject EmployeeEntity employee, @JsonObject SysUserEntity user) {
        String gh = getGH();
        if (StrUtil.isBlank(gh)) return R.error("系统繁忙，稍后再试！");
        employee.setWorknumber(gh);
        user.setNikename(employee.getName());
        employeeService.save(employee,user);

        chatMessageService.createNewIMUser(employee.getName(),user.getNikename());
        return R.ok();
    }

    /**
     * 生成工号
     *
     * @return
     */
    private String getGH() {
        String gh = "";
        gh = (employeeService.getGH() + 1) + "";
        return gh;

    }

    /**
     * 修改
     */
    @SysLog(value = "修改员工", source = LogSource.PC)
    @RequestMapping("/update")
    @RequiresPermissions("company:employee:update")
    public R update(@RequestBody EmployeeEntity employee) {
        employeeService.update(employee);

        return R.ok();
    }

    /**
     * 删除
     */
    @SysLog(value = "删除员工", source = LogSource.PC)
    @RequestMapping("/delete")
    @RequiresPermissions("company:employee:delete")
    public R delete(@RequestBody Integer[] ids) {
        employeeService.deleteBatch(ids);

        return R.ok();
    }

}
