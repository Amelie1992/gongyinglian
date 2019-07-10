package com.wzlue.chain.sys.dao;

import com.wzlue.chain.sys.entity.SysCitiesEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 行政区域地州市信息表
 *
 * @author hjw
 * @email love@und.win
 * @date 2018-08-15 16:14:34
 */
@Mapper
public interface SysCitiesDao {

    List<SysCitiesEntity> queryList(@Param("provinceid") String provinceid);

    String queryCityId(String city);

    SysCitiesEntity queryCity(int id);

    SysCitiesEntity queryBycityId(String cityId);
}

