
package com.wzlue.chain.web.controller.grade;

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

import com.wzlue.chain.grade.entity.GradeEntity;
import com.wzlue.chain.grade.service.GradeService;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;




/**
 * 等级
 * 
 * @author 
 * @email 
 * @date 2018-09-14 18:03:09
 */
@RestController
@RequestMapping("/grade/grade")
public class GradeController extends AbstractController{
	@Autowired
	private GradeService gradeService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<GradeEntity> gradeList = gradeService.queryList(query);
		int total = gradeService.queryTotal(query);
		
		return R.page(gradeList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("grade:grade:info")
	public R info(@PathVariable("id") Integer id){
		GradeEntity grade = gradeService.queryObject(id);
		
		return R.ok().put("grade", grade);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("grade:grade:save")
	public R save(@RequestBody GradeEntity grade){
		gradeService.save(grade);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("grade:grade:update")
	public R update(@RequestBody GradeEntity grade){
		gradeService.update(grade);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("grade:grade:delete")
	public R delete(@RequestBody Integer[] ids){
		gradeService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
