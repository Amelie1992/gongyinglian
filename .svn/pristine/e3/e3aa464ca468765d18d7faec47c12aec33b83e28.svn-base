
package com.wzlue.chain.web.controller.offer;

import java.util.List;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.wzlue.chain.web.controller.sys.AbstractController;

import com.wzlue.chain.offer.entity.GoodsCompanyDetailsEntity;
import com.wzlue.chain.offer.service.GoodsCompanyDetailsService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 货物公司详情
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-15 14:30:02
 */
@RestController
@RequestMapping("/offer/goodscompanydetails")
public class GoodsCompanyDetailsController extends AbstractController{
	@Autowired
	private GoodsCompanyDetailsService goodsCompanyDetailsService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<GoodsCompanyDetailsEntity> goodsCompanyDetailsList = goodsCompanyDetailsService.queryList(query);
		int total = goodsCompanyDetailsService.queryTotal(query);
		
		return R.page(goodsCompanyDetailsList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("offer:goodscompanydetails:info")
	public R info(@PathVariable("id") Long id){
		GoodsCompanyDetailsEntity goodsCompanyDetails = goodsCompanyDetailsService.queryObject(id);
		
		return R.ok().put("goodsCompanyDetails", goodsCompanyDetails);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("offer:goodscompanydetails:save")
	public R save(@RequestBody GoodsCompanyDetailsEntity goodsCompanyDetails){
		goodsCompanyDetailsService.save(goodsCompanyDetails);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("offer:goodscompanydetails:update")
	public R update(@RequestBody GoodsCompanyDetailsEntity goodsCompanyDetails){
		goodsCompanyDetailsService.update(goodsCompanyDetails);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("offer:goodscompanydetails:delete")
	public R delete(@RequestBody Long[] ids){
		goodsCompanyDetailsService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
