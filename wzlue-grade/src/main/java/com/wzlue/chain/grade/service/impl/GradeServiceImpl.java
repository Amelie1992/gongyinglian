package com.wzlue.chain.grade.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.grade.dao.GradeDao;
import com.wzlue.chain.grade.entity.GradeEntity;
import com.wzlue.chain.grade.service.GradeService;



@Service("gradeService")
public class GradeServiceImpl implements GradeService {
	@Autowired
	private GradeDao gradeDao;
	
	@Override
	public GradeEntity queryObject(Integer id){
		return gradeDao.queryObject(id);
	}
	
	@Override
	public List<GradeEntity> queryList(Map<String, Object> map){
		return gradeDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return gradeDao.queryTotal(map);
	}
	
	@Override
	public void save(GradeEntity grade){
		gradeDao.save(grade);
	}
	
	@Override
	public void update(GradeEntity grade){
		gradeDao.update(grade);
	}
	
	@Override
	public void delete(Integer id){
		gradeDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Integer[] ids){
		gradeDao.deleteBatch(ids);
	}
	
}
