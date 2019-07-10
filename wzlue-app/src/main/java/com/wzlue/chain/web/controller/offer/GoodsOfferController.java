
package com.wzlue.chain.web.controller.offer;

import java.math.BigDecimal;
import java.util.*;

import com.sun.corba.se.spi.ior.ObjectKey;
import com.wzlue.chain.promotion.entity.PromotionEntity;
import com.wzlue.chain.promotion.service.PromotionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.wzlue.chain.web.controller.sys.AbstractController;

import com.wzlue.chain.offer.entity.GoodsOfferEntity;
import com.wzlue.chain.offer.service.GoodsOfferService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
import springfox.documentation.annotations.ApiIgnore;


/**
 * 货物报盘
 *
 * @author hjw
 * @email love@und.win
 * @date 2018-08-15 14:30:02
 */
@RestController
@RequestMapping("/offer/goodsoffer")
@Api(value = "货物报盘")
public class GoodsOfferController extends AbstractController {
    @Autowired
    private GoodsOfferService goodsOfferService;
    @Autowired
    private PromotionService promotionService;
    /**
     * 列表
     */
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);

        List<GoodsOfferEntity> goodsOfferList = goodsOfferService.queryList(query);
        int total = goodsOfferService.queryTotal(query);

        return R.page(goodsOfferList, total);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("offer:goodsoffer:info")
    public R info(@PathVariable("id") Long id) {
        GoodsOfferEntity goodsOffer = goodsOfferService.queryObject(id);

        return R.ok().put("goodsOffer", goodsOffer);
    }

    /**
     * 保存
     */
    @PostMapping("/save")
    @ApiOperation(value="报盘/期货现货新增接口")
    @RequiresPermissions("offer:goodsoffer:save")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
    })
    public R save(@RequestBody GoodsOfferEntity goodsOffer) {
        if(goodsOffer.getGoodsPromotionId() == null || goodsOffer.getGoodsPromotionId() == ""){
            goodsOffer.setGoodsPromotionPrice(goodsOffer.getGoodsPrice().toString());
        }else{
            //促销id
            PromotionEntity promotion = promotionService.queryObject(Integer.parseInt(goodsOffer.getGoodsPromotionId()));
            if(promotion.getRuleType() == 0){
                //折扣率
                BigDecimal rate = new BigDecimal(promotion.getDiscountRate());
                //折扣价
                BigDecimal ratePrice = rate.multiply(goodsOffer.getGoodsPrice());
                goodsOffer.setGoodsPromotionPrice(goodsOffer.getGoodsPrice().subtract(ratePrice).toString());
            }else if(promotion.getRuleType() == 1){
                goodsOffer.setGoodsPromotionPrice(goodsOffer.getGoodsPrice().subtract(new BigDecimal(promotion.getDiscountPrice())).toString());
            }
        }
        goodsOfferService.save(goodsOffer);

        return R.ok();
    }

    /**
     * 修改
     */
    @PostMapping("/update")
    @ApiOperation(value="报盘/期货现货修改接口")
    @RequiresPermissions("offer:goodsoffer:update")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
    })
    public R update(@RequestBody GoodsOfferEntity goodsOffer) {
        if(goodsOffer.getGoodsPromotionId() == null || goodsOffer.getGoodsPromotionId() == ""){
            goodsOffer.setGoodsPromotionPrice(goodsOffer.getGoodsPrice().toString());
        }else{
            //促销id
            PromotionEntity promotion = promotionService.queryObject(Integer.parseInt(goodsOffer.getGoodsPromotionId()));
            if(promotion.getRuleType() == 0){
                //折扣率
                BigDecimal rate = new BigDecimal(promotion.getDiscountRate());
                //折扣价
                BigDecimal ratePrice = rate.multiply(goodsOffer.getGoodsPrice());
                goodsOffer.setGoodsPromotionPrice(goodsOffer.getGoodsPrice().subtract(ratePrice).toString());
            }else if(promotion.getRuleType() == 1){
                goodsOffer.setGoodsPromotionPrice(goodsOffer.getGoodsPrice().subtract(new BigDecimal(promotion.getDiscountPrice())).toString());
            }
        }
        goodsOfferService.update(goodsOffer);

        return R.ok();
    }

    /**
     * 下架
     */
    @PostMapping("/undercarriage")
    @ApiOperation(value="报盘/期货现货下架接口")
    @RequiresPermissions("offer:goodsoffer:update")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
    })
    public R undercarriage(@RequestBody Long[] ids) {
        Map<String, Object> params = new HashMap<>(16);
        params.put("goodsState", 1);
        params.put("ids", ids);
        goodsOfferService.updateStatue(params);

        return R.ok();
    }

    /**
     * 上架
     */
    @PostMapping("/grounding")
    @ApiOperation(value="报盘/期货现货上架接口")
    @RequiresPermissions("offer:goodsoffer:update")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
    })
    public R grounding(@RequestBody Long[] ids) {
        Map<String, Object> params = new HashMap<>(16);
        params.put("goodsState", 0);
        params.put("ids", ids);
        goodsOfferService.updateStatue(params);

        return R.ok();
    }

    /**
     * 删除
     */
    @PostMapping("/delete")
    @ApiOperation(value="报盘/期货现货删除接口")
    @RequiresPermissions("offer:goodsoffer:delete")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "header", name = "token", value = "token", required = true, dataType = "string")
    })
    public R delete(@RequestBody Long[] ids) {
        goodsOfferService.deleteBatch(ids);

        return R.ok();
    }

}
