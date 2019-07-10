package com.wzlue.chain.sys.dao;

import com.wzlue.chain.sys.entity.SysPushMessageEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;

/**
 * 推送消息
 * 
 * @author hjw
 * @email love@und.win
 * @date 2018-08-02 09:24:54
 */
@Mapper
public interface SysPushMessageDao extends BaseDao<SysPushMessageEntity> {

    SysPushMessageEntity queryPushMag();
}
