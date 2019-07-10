package com.wzlue.chain.sys.dao;

import com.wzlue.chain.common.base.BaseDao;
import com.wzlue.chain.sys.entity.SysDictEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 数据字典表
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2018-03-15 16:08:30
 */
@Mapper
public interface SysDictDao extends BaseDao<SysDictEntity> {

    /**
     * 根据字典名称获取结果集
     * @param name
     * @return
     */
    List<SysDictEntity> queryListNotPage(String name);

    SysDictEntity queryObjectByPar(SysDictEntity sysDictEntity);

    SysDictEntity query(SysDictEntity sysDictEntity);

    SysDictEntity queryCountryName(String code);
}
