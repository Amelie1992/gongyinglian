package com.wzlue.chain.sys.dao;

import com.wzlue.chain.sys.entity.SysAreasEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 行政区域县区信息表
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-15 16:14:34
 */
@Mapper
public interface SysAreasDao {

    List<SysAreasEntity> queryList(@Param("cityid")String cityid);

    SysAreasEntity queryBycityId(String areaId);
}
