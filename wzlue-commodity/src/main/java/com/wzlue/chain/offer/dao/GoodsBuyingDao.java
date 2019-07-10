package com.wzlue.chain.offer.dao;

import com.wzlue.chain.common.base.BaseDao;
import com.wzlue.chain.offer.entity.GoodsBuyingEntity;
import com.wzlue.chain.sys.entity.ImageEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * 货物求购
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-23 10:01:30
 */
@Mapper
public interface GoodsBuyingDao extends BaseDao<GoodsBuyingEntity> {

    void updateUnsold(Map<String, Object> params);

    List<ImageEntity> getGoodsBuyImage(Long id);

    List<GoodsBuyingEntity> getBuyingOffer(Map<String, Object> map);

    List<GoodsBuyingEntity> queryBuyingList(Map<String, Object> map);
}
