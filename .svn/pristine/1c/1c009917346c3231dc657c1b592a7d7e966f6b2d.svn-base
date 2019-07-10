package com.wzlue.chain.complaint.dao;

import com.wzlue.chain.common.annotation.PermissionAop;
import com.wzlue.chain.complaint.entity.ComplaintEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * 投诉管理
 * 
 * @author 
 * @email 
 * @date 2018-09-07 09:42:11
 */
@Mapper
public interface ComplaintDao extends BaseDao<ComplaintEntity> {

    void handle(ComplaintEntity complaint);

    ComplaintEntity queryObjectByOrderIdAndCompanyId(ComplaintEntity complaint);

    int getComplaint(ComplaintEntity complaint);
}
