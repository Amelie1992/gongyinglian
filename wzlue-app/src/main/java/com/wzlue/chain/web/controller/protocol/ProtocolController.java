
package com.wzlue.chain.web.controller.protocol;

import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
import com.wzlue.chain.protocol.entity.ProtocolEntity;
import com.wzlue.chain.protocol.service.ProtocolService;
import com.wzlue.chain.web.controller.sys.AbstractController;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;




/**
 * 协议管理
 * 
 * @author 
 * @email 
 * @date 2018-09-25 18:00:17
 */
@RestController
@RequestMapping("/protocol/protocol")
public class ProtocolController extends AbstractController{
	@Autowired
	private ProtocolService protocolService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<ProtocolEntity> protocolList = protocolService.queryList(query);
		int total = protocolService.queryTotal(query);
		
		return R.page(protocolList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("protocol:protocol:info")
	public R info(@PathVariable("id") Long id){
		ProtocolEntity protocol = protocolService.queryObject(id);
		
		return R.ok().put("protocol", protocol);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("protocol:protocol:save")
	public R save(@RequestBody ProtocolEntity protocol){
		protocolService.save(protocol);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("protocol:protocol:update")
	public R update(@RequestBody ProtocolEntity protocol){
		protocolService.update(protocol);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("protocol:protocol:delete")
	public R delete(@RequestBody Long[] ids){
		protocolService.deleteBatch(ids);
		
		return R.ok();
	}
    /**
     * 查询是否已存在相同类型
     */
    @RequestMapping("/queryType")
    @RequiresPermissions("protocol:protocol:info")
    public R queryType (@RequestBody int type){
        int count = protocolService.queryType(type);
        return R.ok().put("count",count);
    }
	
}
