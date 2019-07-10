package com.wzlue.chain.web.controller.goods;

import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
import com.wzlue.chain.goods.entity.ItemCategoryEntity;
import com.wzlue.chain.goods.service.ItemCategoryService;
import com.wzlue.chain.web.controller.sys.AbstractController;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 商品分类
 * 业务控制层
 * 逻辑跳转 权限控制处理 数据返回
 * @author Zeyee
 * @date 2018-08-13
 */
@RequestMapping("/goods/category")
@RestController
public class ItemCategoryController extends AbstractController {
    @Autowired
    private ItemCategoryService itemCategoryService;
    /**
     * tab展示列表
     */
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params){
        //查询列表数据
        Query query = new Query(params);

        List<ItemCategoryEntity> itemCategoryList = itemCategoryService.pageList(query);
        int total = itemCategoryService.pageCount(query);

        return R.page(itemCategoryList,total);
    }

    /**
     * Select下拉框 展示列表数据
     * (含顶级: 无)
     */
    @RequestMapping(value = "/getList",method = RequestMethod.GET)
    public R getList(){
        List<ItemCategoryEntity> list  = itemCategoryService.getList();
        return R.ok(list);
    }

    /**
     * Select下拉框 展示列表数据
     * (不含顶级: 无)
     */
    @RequestMapping(value = "/getSelectList",method = RequestMethod.GET)
    public R getSelectList(){
        List<ItemCategoryEntity> list  = itemCategoryService.getSelectList();
        return R.ok(list);
    }


    /**
     * 所有分类数据
     */
    @RequestMapping(value = "/getSelectAllList",method = RequestMethod.GET)
    public R getSelectAllList(){
        List<ItemCategoryEntity> list  = itemCategoryService.getSelectAllList();
        return R.ok(list);
    }

    /**
     * Select下拉框 展示列表数据
     * (不含顶级: 无)
     * 只取第一级分类
     */
    @RequestMapping(value = "/getCategoryList",method = RequestMethod.GET)
    public R getCategoryList(){
        List<ItemCategoryEntity> list  = itemCategoryService.getTopList();
        return R.ok(list);
    }

    /**
     * 查询分类信息详情
     */
    @RequestMapping("/info/{id}")
//    @RequiresPermissions("item:category:info")
    public R info(@PathVariable("id") Integer id){
        ItemCategoryEntity itemCategory = itemCategoryService.queryObject(id);

        return R.ok(itemCategory);
    }

    /**
     * 新增分类信息
     */
    @RequestMapping("/save")
//    @RequiresPermissions("item:category:save")
    public R save(@RequestBody ItemCategoryEntity itemCategory){
        itemCategory.setCreateBy(getUserId());
        itemCategory.setUpdateBy(getUserId());
        itemCategoryService.save(itemCategory);

        return R.ok();
    }

    /**
     * 修改分类信息
     */
    @RequestMapping("/update")
//    @RequiresPermissions("item:category:update")
    public R update(@RequestBody ItemCategoryEntity itemCategory){
        itemCategoryService.update(itemCategory);

        return R.ok();
    }

    /**
     * 删除(软删,逻辑删除)
     * 修改分类状态 : =>3 删除
     */
    @RequestMapping("/delete")
//    @RequiresPermissions("item:category:delete")
    public R delete(@RequestBody Long[] id){
        itemCategoryService.updateDel(id);
        return R.ok();
    }

    @RequestMapping("/checkOnly")
    public R checkOnly(@RequestParam String categoryName,String taxNumber,Integer id){
        int count = itemCategoryService.checkOnly(categoryName,taxNumber,id);
        return R.ok(count);
    }
}
