package com.wzlue.chain.sys.service;

import com.wzlue.chain.sys.entity.SysProvincesEntity;

import java.util.List;
import java.util.Map;

/**
 * 省份信息表
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-15 16:14:34
 */
public interface SysProvincesService {

    List<SysProvincesEntity> queryList();

    SysProvincesEntity queryByprovinceId(String provinceId);
}
