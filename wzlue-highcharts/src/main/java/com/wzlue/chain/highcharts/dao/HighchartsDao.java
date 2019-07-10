package com.wzlue.chain.highcharts.dao;

import com.wzlue.chain.common.base.BaseDao;
import com.wzlue.chain.highcharts.entity.HighchartsEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * 报表
 * 
 * @author 
 * @email 
 * @date 2019-01-14 11:21:59
 */
@Mapper
public interface HighchartsDao extends BaseDao<HighchartsEntity> {


    List<Map> receivable(Map<String, Object> map);

    List<Integer> adduser(Map<String, Object> map);


    List<Map> complaint(Map<String, Object> map);

    List<Map> aftersale(Map<String, Object> map);
}
