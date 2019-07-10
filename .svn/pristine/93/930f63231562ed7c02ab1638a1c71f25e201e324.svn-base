package com.wzlue.chain.declare.service;

import com.wzlue.chain.common.base.R;
import com.wzlue.chain.declare.entity.DeclareOfferEntity;

import java.util.List;
import java.util.Map;

/**
 * 报关报盘信息
 * 
 * @author ÎºË¼Æë
 * @email sunlightcs@gmail.com
 * @date 2018-08-15 16:29:28
 */
public interface DeclareOfferService {
	
	DeclareOfferEntity queryObject(Integer id);
	
	List<DeclareOfferEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	R save(DeclareOfferEntity declareOffer);
	
	void update(DeclareOfferEntity declareOffer);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);

    void offer(Map<String, Object> map);

    void disOfferOffer(Map<String, Object> map);
    //报关编码是否重复
    int checkCode(DeclareOfferEntity declareOfferEntity);

    List<DeclareOfferEntity> getListByCompanyId(Long id);

    List<DeclareOfferEntity> queryList1(Map<String, Object> params);
}
