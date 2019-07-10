package com.wzlue.chain.sys.service;

import com.wzlue.chain.sys.entity.SysCitiesEntity;

import java.util.List;
import java.util.Map;

/**
 * 行政区域地州市信息表
 *
 * @author hjw
 * @email love@und.win
 * @date 2018-08-15 16:14:34
 */
public interface SysCitiesService {

    List<SysCitiesEntity> queryList(String provinceid);

    String queryCityId(String city);

    SysCitiesEntity queryCity(int id);

    SysCitiesEntity queryBycityId(String cityId);
}
