
package com.wzlue.chain.web.controller.agent;

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

import com.wzlue.chain.agent.entity.AgentOfferEntity;
import com.wzlue.chain.agent.service.AgentOfferService;
import com.wzlue.chain.common.utils.PageUtils;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;


/**
 * 代理报盘信息表(业务控制)
 *
 * @author
 * @date 2018-08-22
 */
@RestController
@RequestMapping("/agent/offer")
public class AgentOfferController extends AbstractController{
	@Autowired
	private AgentOfferService agentOfferService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<AgentOfferEntity> agentOfferList = agentOfferService.pageList(query);
		int total = agentOfferService.pageCount(query);
		
		return R.page(agentOfferList,total);
	}
	
	/**
	 * 获取某企业下的报盘信息*/
	@RequestMapping("/getCompanyList")
	public R getCompanyList(Long id){
		List<AgentOfferEntity> list = agentOfferService.getListByCompanyId(id);
		return R.ok(list);
	}
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("agent:offer:info")
	public R info(@PathVariable("id") Long id){
		AgentOfferEntity agentOffer = agentOfferService.queryInfo(id);
		return R.ok(agentOffer);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("agent:offer:save")
	public R save(@RequestBody AgentOfferEntity agentOffer){
		agentOffer.setCreateBy(getUserId());
		agentOffer.setUpdateBy(getUserId());
		agentOffer.setOfferStatus(1);
		agentOfferService.save(agentOffer);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("agent:offer:update")
	public R update(@RequestBody AgentOfferEntity agentOffer){
		agentOffer.setUpdateBy(getUserId());
		agentOfferService.update(agentOffer);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("agent:offer:delete")
	public R delete(@RequestBody Long id){

		agentOfferService.updateDel(id,getUserId());
		
		return R.ok();
	}
    //上架
	@RequestMapping("/shelf")
	public R shelf(@RequestBody Long id){
		agentOfferService.shelf(id);

		return R.ok();
	}
	//下架
	@RequestMapping("/obtained")
	public R obtained(@RequestBody Long id){
		agentOfferService.obtained(id);

		return R.ok();
	}

	//批量上架或下架
	@RequestMapping("/shelfOrobtained")
	public R shelfOrobtained(@RequestBody List<AgentOfferEntity> agentOfferEntities){
		agentOfferService.shelfOrobtained(agentOfferEntities);

		return R.ok();
	}

	//批量上架
	@RequestMapping("/shelfAll")
	public R shelfAll(@RequestBody List<AgentOfferEntity> agentOfferEntities){
		agentOfferService.shelfAll(agentOfferEntities);

		return R.ok();
	}
	//批量下架
	@RequestMapping("/obtainedAll")
	public R obtainedAll(@RequestBody List<AgentOfferEntity> agentOfferEntities){
		agentOfferService.obtainedAll(agentOfferEntities);

		return R.ok();
	}

}
