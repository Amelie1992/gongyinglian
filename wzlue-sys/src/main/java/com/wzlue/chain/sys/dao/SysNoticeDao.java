package com.wzlue.chain.sys.dao;

import com.wzlue.chain.sys.entity.StorageWarningEntity;
import com.wzlue.chain.sys.entity.SysNoticeEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * 新闻资讯
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-27 19:37:10
 */
@Mapper
public interface SysNoticeDao extends BaseDao<SysNoticeEntity> {

	//查询最新一条通知
	SysNoticeEntity queryNewObject(SysNoticeEntity sysNoticeEntity);
	
    List<SysNoticeEntity> queryNow(Map<String, Object> params);

    List<StorageWarningEntity> queryStorageInfo();

    List<StorageWarningEntity> queryStorageInfo2();
}
