package com.wzlue.chain.agreement.dao;

import com.wzlue.chain.agreement.entity.AgreeMentEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;

/**
 *
 *
 * @author
 * @email
 * @date 2018-11-05 17:34:33
 */
@Mapper
public interface AgreeMentDao extends BaseDao<AgreeMentEntity> {
    AgreeMentEntity queryObjectByType(String xieyiType);
}
