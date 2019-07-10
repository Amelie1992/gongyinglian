package com.wzlue.chain.web.controller.goods;

import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
import com.wzlue.chain.goods.entity.ItemCategoryEntity;
import com.wzlue.chain.goods.entity.ItemInfoEntity;
import com.wzlue.chain.goods.entity.ItemOriginPlaceEntity;
import com.wzlue.chain.goods.entity.apply.ItemPlaceApplyEntity;
import com.wzlue.chain.goods.service.ItemInfoService;
import com.wzlue.chain.sys.service.SysNumberRuleService;
import com.wzlue.chain.web.controller.sys.AbstractController;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RequestMapping("/goods/info")
@RestController
public class ItemInfoController extends AbstractController {

    @Autowired
    private ItemInfoService itemInfoService;
    @Autowired
    private SysNumberRuleService sysNumberRuleService;

    /**
     * Tab列表
     */
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);

        List<ItemInfoEntity> itemInfoList = itemInfoService.pageList(query);
        for (ItemInfoEntity itemInfo : itemInfoList) {
            List<ItemOriginPlaceEntity> placeList = itemInfo.getPlaces();
            String place = "";
            for (ItemOriginPlaceEntity placeEntity : placeList) {
                place += placeList.size() > 1 ? placeEntity.getPlaceName() + "," : placeEntity.getPlaceName();
            }
            itemInfo.setPlaceName(place);
        }


        int total = itemInfoService.pageCount(query);

        return R.page(itemInfoList, total);
    }


    /**
     * 详情信息
     */
    @RequestMapping("/info/{id}")
//    @RequiresPermissions("item:info:info")
    public R info(@PathVariable("id") Long id) {
        ItemInfoEntity itemInfo = itemInfoService.queryInfo(id);

        if (itemInfo.getPlaces() != null && itemInfo.getPlaces().get(0) != null) {
            for (ItemOriginPlaceEntity item : itemInfo.getPlaces()) {
                if (item.getTariff() != null) {
                    item.setTariff(new BigDecimal(String.valueOf(item.getTariff())).multiply(new BigDecimal(100)));
                }
                item.setAdditionDuty(new BigDecimal(String.valueOf(item.getAdditionDuty())).multiply(new BigDecimal(100)));
                item.setValueAddTariff(new BigDecimal(String.valueOf(item.getValueAddTariff())).multiply(new BigDecimal(100)));
            }
        }

        return R.ok().put("itemInfo", itemInfo);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
//    @RequiresPermissions("item:info:save")
    public R save(@RequestBody ItemInfoEntity itemInfo) {
        itemInfo.setCreateBy(getUserId());
        itemInfo.setUpdateBy(getUserId());
        if (itemInfo.getItemCode() == null) {
            itemInfo.setItemCode(sysNumberRuleService.getCodeNumber("item_code"));
        }
        itemInfoService.save(itemInfo);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
//    @RequiresPermissions("item:info:update")
    public R update(@RequestBody ItemInfoEntity itemInfo) {
        itemInfo.setUpdateBy(getUserId());
        itemInfoService.update(itemInfo);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
//    @RequiresPermissions("item:info:delete")
    public R delete(@RequestBody Long[] id) {
        itemInfoService.updateDel(id);
        return R.ok();
    }

    @RequestMapping("/getTaxNumber")
    public R getTaxNumber() {
        List<ItemCategoryEntity> itemCategory = itemInfoService.getTaxNumber();
        return R.ok().put("itemCategory", itemCategory);
    }
}
