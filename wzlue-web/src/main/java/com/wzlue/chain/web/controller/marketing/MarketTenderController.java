
package com.wzlue.chain.web.controller.marketing;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.wzlue.chain.common.utils.StringTools;
import com.wzlue.chain.company.entity.MerchantCompanyEntity;
import com.wzlue.chain.company.service.MerchantCompanyService;
import com.wzlue.chain.sys.entity.SysUserEntity;
import com.wzlue.chain.sys.service.SysUserRoleService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.wzlue.chain.web.controller.sys.AbstractController;

import com.wzlue.chain.marketing.entity.MarketTenderEntity;
import com.wzlue.chain.marketing.service.MarketTenderService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 招标表
 * 
 * @author 
 * @email 
 * @date 2018-10-24 15:19:33
 */
@RestController
@RequestMapping("/marketing/markettender")
public class MarketTenderController extends AbstractController{
	@Autowired
	private MarketTenderService marketTenderService;
	@Autowired
	private SysUserRoleService sysUserRoleService;
	@Autowired
	private MerchantCompanyService merchantCompanyService;

	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
		if (getUserId()!=null){
			List<Long> roleIdList = sysUserRoleService.queryRoleIdList(getUserId());
			for (Long roleId:roleIdList) {
				if (roleId.intValue()==85){ //直营公司
					query.put("companyId",getUser().getCompanyId());
				}
			}
		}
		List<MarketTenderEntity> marketTenderList = marketTenderService.queryList(query);
		int total = marketTenderService.queryTotal(query);
		
		return R.page(marketTenderList,total);
	}

	/**
	 * 查询当前登录人所属公司下所有招标记录
	 * @param params
	 * @return
	 */
	@RequestMapping("/list1")
	public R list1(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
		SysUserEntity user = getUser();
		if(user.getCompanyId() == null){
			return R.page(null, 0);
		}
		//查询本公司所有招标记录
		query.put("companyId",user.getCompanyId());
		List<MarketTenderEntity> marketTenderList = marketTenderService.queryList(query);
		int total = marketTenderService.queryTotal(query);

		return R.page(marketTenderList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("marketing:markettender:info")
	public R info(@PathVariable("id") Long id){
		MarketTenderEntity marketTender = marketTenderService.queryObject(id);
		
		return R.ok().put("marketTender", marketTender);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("marketing:markettender:save")
	public R save(@RequestBody MarketTenderEntity marketTender){
		MerchantCompanyEntity company = merchantCompanyService.queryByUserId(getUser().getUserId());
		if (!StringTools.isNullOrEmpty(company)) {
			marketTender.setCompanyId(company.getId().intValue());
			marketTender.setCompanyName(company.getCompanyName());
		}else {
			return R.error("该账号未注册公司，无法参与招标");
		}
		marketTenderService.save(marketTender);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("marketing:markettender:update")
	public R update(@RequestBody MarketTenderEntity marketTender){
		marketTenderService.update(marketTender);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("marketing:markettender:delete")
	public R delete(@RequestBody Long[] ids){
		marketTenderService.deleteBatch(ids);
		
		return R.ok();
	}
	/**
	 * 上架
	 */
	@RequestMapping("/updateup")
	@RequiresPermissions("marketing:markettender:update")
	public R updateUp(@RequestBody Long[] ids) {
		Map<String,Object> map = new HashMap<>(16);
		map.put("status",1);
		map.put("ids", ids);
		map.put("userId",getUserId());
		marketTenderService.updateStatus(map);
		return R.ok();
	}
	/**
	 * 下架
	 */
	@RequestMapping("/updatedown")
	@RequiresPermissions("marketing:markettender:update")
	public R updateDown(@RequestBody Long[] ids) {
		Map<String,Object> map = new HashMap<>(16);
		map.put("status",0);
		map.put("ids", ids);
		map.put("userId",getUserId());
		marketTenderService.updateStatus1(map);
		return R.ok();
	}
}
