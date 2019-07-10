package com.wzlue.chain.complaint.service;

import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.complaint.entity.ComplaintEntity;

import java.util.List;
import java.util.Map;

/**
 * 投诉管理
 *
 * @author
 * @email
 * @date 2018-09-07 09:42:11
 */
public interface ComplaintService {

    ComplaintEntity queryObject(Integer id);

    List<ComplaintEntity> queryList(Map<String, Object> map);

    int queryTotal(Map<String, Object> map);

    void save(ComplaintEntity complaint);

    void update(ComplaintEntity complaint);

    void delete(Integer id);

    void deleteBatch(Integer[] ids);

    void handle(ComplaintEntity complaint);

    ComplaintEntity queryObjectByOrderIdAndCompanyId(ComplaintEntity complaint);

    int getComplaint(String id);
}
