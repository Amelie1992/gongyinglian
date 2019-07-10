package com.wzlue.chain.declare.dao;

import com.wzlue.chain.declare.entity.DeclareOfferEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * 报关报盘信息
 * 
 * @author ÎºË¼Æë
 * @email sunlightcs@gmail.com
 * @date 2018-08-15 16:29:28
 */
@Mapper
public interface DeclareOfferDao extends BaseDao<DeclareOfferEntity> {


    void updateOffer(Map<String, Object> map);
    //判断报关编码是否重复
    int checkCode(DeclareOfferEntity declareOfferEntity);

    List<DeclareOfferEntity> getListByCompanyId(Long id);
}
