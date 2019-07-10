package com.wzlue.chain.sys.service;

import com.wzlue.chain.sys.entity.SysAreasEntity;

import java.util.List;
import java.util.Map;

/**
 * 行政区域县区信息表
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-15 16:14:34
 */
public interface SysAreasService {
	
	List<SysAreasEntity> queryList(String cityid);

    SysAreasEntity queryBycityId(String areaId);
}
