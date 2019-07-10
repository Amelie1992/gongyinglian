package com.wzlue.chain.sys.service;



import com.wzlue.chain.sys.entity.ImageEntity;

import java.util.List;
import java.util.Map;

/**
 * 图片表
 * 
 * @author py
 * @email sunlightcs@gmail.com
 * @date 2018-05-28 13:33:27
 */
public interface ImageService {
	
	ImageEntity queryObject(Integer id);
	
	List<ImageEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(ImageEntity image);
	
	void update(ImageEntity image);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);

	void saveList(List<ImageEntity> list);

    void deleteByCode(Map<String, Object> params);

	void deleteByCodeBatch(List<Map<String, Object>> list);

    void deleteById(Integer[] key);
}
