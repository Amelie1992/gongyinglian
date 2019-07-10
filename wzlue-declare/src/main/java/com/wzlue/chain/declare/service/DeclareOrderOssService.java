package com.wzlue.chain.declare.service;

import com.wzlue.chain.declare.entity.DeclareOrderOssEntity;

import java.util.List;
import java.util.Map;

/**
 * 报关文件上传
 * 
 * @author 
 * @email 
 * @date 2018-09-05 18:06:05
 */
public interface DeclareOrderOssService {
	
	DeclareOrderOssEntity queryObject(Integer id);
	
	List<DeclareOrderOssEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(DeclareOrderOssEntity declareOrderOss);
	
	void update(DeclareOrderOssEntity declareOrderOss);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);


    void saveFile(List<DeclareOrderOssEntity> list);
}
