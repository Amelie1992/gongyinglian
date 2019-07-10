package com.wzlue.chain.traceback.dao;

import com.wzlue.chain.common.base.BaseDao;
import com.wzlue.chain.traceback.entity.TraceBackEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Map;

/**
 * @author Administrator
 */
@Mapper
public interface TraceBackDao extends BaseDao<TraceBackEntity> {
    Map<String,Object> queryInfo(Map<String, Object> params);

    Map<String,Object> queryContract(Map<String, Object> params);

}
