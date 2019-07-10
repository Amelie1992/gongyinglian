
package com.wzlue.chain.web.controller.promotion;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.wzlue.chain.promotion.entity.PromotionEntity;
import com.wzlue.chain.promotion.service.PromotionService;
import com.wzlue.chain.sys.service.SysUserRoleService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.wzlue.chain.web.controller.sys.AbstractController;


import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 促销表
 *
 * @author
 * @email
 * @date 2018-08-27 16:01:49
 */
@RestController
@RequestMapping("/promotion/promotion")
public class PromotionController extends AbstractController{
	@Autowired
	private PromotionService promotionService;
    @Autowired
    private SysUserRoleService sysUserRoleService;


    @RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
        Long companyId = getUser().getCompanyId();
        if(companyId!=null){
            params.put("companyId",companyId.intValue());
        }
		String nowTime = "";
		if("true".equals(params.get("termValidate"))){
			//查询有效的促销列表
			Date date = new Date();
			SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			params.put("createdTime",simpleDate.format(date));//这里的createTime为当前时间
		}
		//查询列表数据
        Query query = new Query(params);
		List<PromotionEntity> promotionList = promotionService.queryList(query);
		int total = promotionService.queryTotal(query);

		return R.page(promotionList,total);
	}

    /**
     * 列表
     */
	@RequestMapping("/list2")
	public R list2(@RequestParam Map<String, Object> params){
		Query query = new Query(params);
		List<PromotionEntity> promotionList = promotionService.queryList(query);
		int total = promotionService.queryTotal(query);

		return R.page(promotionList,total);
	}


	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	/*@RequiresPermissions("promotion:promotion:info")*/
	public R info(@PathVariable("id") Integer id){
		PromotionEntity promotion = promotionService.queryObject(id);
		if(promotion.getDiscountRate() != null && promotion.getDiscountRate() != ""){
			BigDecimal rate = new BigDecimal(promotion.getDiscountRate());
			BigDecimal rateAfter = rate.multiply(new BigDecimal(100));
			promotion.setDiscountRate(rateAfter.toString());
		}

		return R.ok().put("promotion", promotion);
	}

	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("promotion:promotion:save")
	public R save(@RequestBody PromotionEntity promotion){
        Date currentTime = new Date();
        Long companyId = getUser().getCompanyId();
        if (companyId!=null){
            promotion.setCompanyId(companyId.intValue());
        }
        promotion.setStatus(1);
        promotion.setCreateBy(getUserId().intValue());
        promotion.setCreatedTime(currentTime);
        promotionService.save(promotion);
		return R.ok();
	}

	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("promotion:promotion:update")
	public R update(@RequestBody PromotionEntity promotion){
		promotion.setUpdateBy(getUserId());
		promotion.setUpdateTime(new Date());
		promotionService.update(promotion);

		return R.ok();
	}

	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("promotion:promotion:delete")
	public R delete(@RequestBody Integer[] ids){
		promotionService.deleteBatch(ids);

		return R.ok();
	}

    /**
     * 上架商品onSale
     */
    @RequestMapping("/onSale")
    @RequiresPermissions("promotion:promotion:update")
    public R onSale(@RequestBody Integer[] ids){
        Map<String, Object> map = new HashMap<>();
        map.put("status",0);
        map.put("ids",ids);
        map.put("userId",getUserId());
        promotionService.onSale(map);
        return R.ok();
    }

    /**
     * 下架商品noSale
     */
    @RequestMapping("/noSale")
    @RequiresPermissions("promotion:promotion:update")
    public R noSale(@RequestBody Integer[] ids){
        Map<String, Object> map = new HashMap<>();
        map.put("status",1);
        map.put("ids",ids);
        map.put("userId",getUserId());
        promotionService.noSale(map);
        return R.ok();
    }

}
