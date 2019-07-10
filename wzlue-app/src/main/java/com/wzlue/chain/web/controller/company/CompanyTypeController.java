
package com.wzlue.chain.web.controller.company;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.common.annotation.SysLog;
import com.wzlue.chain.common.base.LogSource;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.wzlue.chain.web.controller.sys.AbstractController;

import com.wzlue.chain.company.entity.CompanyTypeEntity;
import com.wzlue.chain.company.service.CompanyTypeService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;


/**
 * 公司类型
 *
 * @author
 * @email
 * @date 2018-09-05 11:15:33
 */
@RestController
@RequestMapping("/company/companytype")
public class CompanyTypeController extends AbstractController {
    @Autowired
    private CompanyTypeService companyTypeService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);

        List<CompanyTypeEntity> companyTypeList = companyTypeService.queryList(query);
        int total = companyTypeService.queryTotal(query);

        return R.page(companyTypeList, total);
    }

    /**
     * 列表 全部
     */
    @RequestMapping("/listall")
    public R listall(@RequestParam Map<String, Object> params) {
        //查询列表数据
        List<CompanyTypeEntity> companyTypeList = companyTypeService.queryCompanyTypeAll();

        return R.page(companyTypeList, null);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("company:companytype:info")
    public R info(@PathVariable("id") Integer id) {
        CompanyTypeEntity companyType = companyTypeService.queryObject(id);

        return R.ok().put("companyType", companyType);
    }

    /**
     * 保存
     */
    @SysLog(value = "保存公司类型",source = LogSource.PC)
    @RequestMapping("/save")
    @RequiresPermissions("company:companytype:save")
    public R save(@RequestBody CompanyTypeEntity companyType) {
        companyTypeService.save(companyType);

        return R.ok();
    }

    /**
     * 修改
     */
    @SysLog(value = "修改公司类型",source = LogSource.PC)
    @RequestMapping("/update")
    @RequiresPermissions("company:companytype:update")
    public R update(@RequestBody CompanyTypeEntity companyType) {
        companyTypeService.update(companyType);

        return R.ok();
    }

    /**
     * 删除
     */
    @SysLog(value = "删除公司类型",source = LogSource.PC)
    @RequestMapping("/delete")
    @RequiresPermissions("company:companytype:delete")
    public R delete(@RequestBody Integer[] ids) {
        companyTypeService.deleteBatch(ids);

        return R.ok();
    }

}
