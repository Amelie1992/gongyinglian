
package com.wzlue.chain.web.controller.huanxin;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.chatMsg.entity.IpBrowserEntity;
import com.wzlue.chain.chatMsg.service.IpBrowserService;
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
 * 
 * 
 * @author 
 * @email 
 * @date 2018-09-19 14:08:31
 */
@RestController
@RequestMapping("/huanxin/ipbrowser")
public class IpBrowserController extends AbstractController{
	@Autowired
	private IpBrowserService ipBrowserService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<IpBrowserEntity> ipBrowserList = ipBrowserService.queryList(query);
		int total = ipBrowserService.queryTotal(query);
		
		return R.page(ipBrowserList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	public R info(@PathVariable("id") Integer id){
		IpBrowserEntity ipBrowser = ipBrowserService.queryObject(id);
		
		return R.ok().put("ipBrowser", ipBrowser);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")

	public R save(@RequestBody IpBrowserEntity ipBrowser){
		ipBrowserService.save(ipBrowser);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")

	public R update(@RequestBody IpBrowserEntity ipBrowser){
		ipBrowserService.update(ipBrowser);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")

	public R delete(@RequestBody Integer[] ids){
		ipBrowserService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
