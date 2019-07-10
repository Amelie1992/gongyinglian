package com.wzlue.chain.common.base;


import com.wzlue.chain.common.annotation.PermissionAop;

import java.util.List;
import java.util.Map;

/**
 * 基础Dao(还需在XML文件里，有对应的SQL语句)
 *
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年9月18日 上午9:31:36
 */
public interface BaseDao<T> {
    void save(T t);

    void save(Map<String, Object> map);

    void saveBatch(List<T> list);

    int update(T t);

    int update(Map<String, Object> map);

    int delete(Object id);

    int delete(Map<String, Object> map);

    int deleteBatch(Object id);

    int updateBatch(Object[] id);

    @PermissionAop
    T queryObject(Object id);

    @PermissionAop
    List<T> queryList(Map<String, Object> map);

    @PermissionAop
    List<T> queryList(Object id);

    @PermissionAop
    int queryTotal(Map<String, Object> map);

    @PermissionAop
    int queryTotal();

}
