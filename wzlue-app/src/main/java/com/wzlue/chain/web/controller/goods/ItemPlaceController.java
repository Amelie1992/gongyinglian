package com.wzlue.chain.web.controller.goods;

import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
import com.wzlue.chain.goods.entity.ItemOriginPlaceEntity;
import com.wzlue.chain.goods.service.ItemOriginPlaceService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 商品产地
 * 业务控制层
 * 商品的产地信息 (产地, 税号, 计价数值, 关税, 增值税, 附加税等)
 * */
@RequestMapping("/goods/place")
@RestController
public class ItemPlaceController {

    @Autowired
    private ItemOriginPlaceService itemOriginPlaceService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params){
        //查询列表数据
        Query query = new Query(params);

        List<ItemOriginPlaceEntity> itemOriginPlaceList = itemOriginPlaceService.queryList(query);
        int total = itemOriginPlaceService.queryTotal(query);

        return R.page(itemOriginPlaceList,total);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("supplier:itemoriginplace:info")
    public R info(@PathVariable("id") Integer id){
        ItemOriginPlaceEntity itemOriginPlace = itemOriginPlaceService.queryObject(id);

        return R.ok().put("itemOriginPlace", itemOriginPlace);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("supplier:itemoriginplace:save")
    public R save(@RequestBody ItemOriginPlaceEntity itemOriginPlace){
        itemOriginPlaceService.save(itemOriginPlace);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("supplier:itemoriginplace:update")
    public R update(@RequestBody ItemOriginPlaceEntity itemOriginPlace){
        itemOriginPlaceService.update(itemOriginPlace);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("supplier:itemoriginplace:delete")
    public R delete(@RequestBody Integer[] ids){
        itemOriginPlaceService.deleteBatch(ids);

        return R.ok();
    }
}
