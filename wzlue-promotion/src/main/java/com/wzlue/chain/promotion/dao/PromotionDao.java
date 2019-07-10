package com.wzlue.chain.promotion.dao;

import com.wzlue.chain.common.base.BaseDao;
import com.wzlue.chain.promotion.entity.PromotionEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

/**
 * 促销表
 * 
 * @author 
 * @email 
 * @date 2018-08-27 16:01:49
 */
@Mapper
public interface PromotionDao extends BaseDao<PromotionEntity> {

    void updateStatus(Map<String,Object> map);
}
