
package com.wzlue.chain.web.controller.declare;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.wzlue.chain.declare.entity.DeclareOrderEntity;
import com.wzlue.chain.declare.service.DeclareOrderService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.wzlue.chain.web.controller.sys.AbstractController;

import com.wzlue.chain.declare.entity.DeclareOrderOssEntity;
import com.wzlue.chain.declare.service.DeclareOrderOssService;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 报关文件上传
 * 
 * @author 
 * @email 
 * @date 2018-09-05 18:06:05
 */
@RestController
@RequestMapping("/order/declareordeross")
public class DeclareOrderOssController extends AbstractController{
	@Autowired
	private DeclareOrderOssService declareOrderOssService;
	@Autowired
    private DeclareOrderService declareOrderService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<DeclareOrderOssEntity> declareOrderOssList = declareOrderOssService.queryList(query);
		int total = declareOrderOssService.queryTotal(query);
		
		return R.page(declareOrderOssList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("order:declareordeross:info")
	public R info(@PathVariable("id") Integer id){
		DeclareOrderOssEntity declareOrderOss = declareOrderOssService.queryObject(id);
		
		return R.ok().put("declareOrderOss", declareOrderOss);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("order:declareordeross:save")
	public R save(@RequestBody DeclareOrderOssEntity declareOrderOss){
		declareOrderOssService.save(declareOrderOss);
		
		return R.ok();
	}
    /**
     * 保存
     */
    @RequestMapping("/saveFile")
    @RequiresPermissions("order:declareordeross:save")
    public R saveFile(@RequestBody DeclareOrderEntity declareOrder){
        List<DeclareOrderOssEntity> list = declareOrder.getOrderOssEntityList();
        declareOrderOssService.saveFile(list);
        Map<String,Object> map =new HashMap<>();

        map.put("orderState",4);
        map.put("userId",getUserId());
        map.put("id",list.get(0).getOrderId());
        map.put("inspectionNo",declareOrder.getInspectionNo());
        declareOrderService.updateOrderState(map);

        return R.ok();
    }
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("order:declareordeross:update")
	public R update(@RequestBody DeclareOrderOssEntity declareOrderOss){
		declareOrderOssService.update(declareOrderOss);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("order:declareordeross:delete")
	public R delete(@RequestBody Integer[] ids){
		declareOrderOssService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
