package com.wzlue.chain.declare.service.impl;

import com.wzlue.chain.declare.dao.DeclareOrderOssDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


import com.wzlue.chain.declare.entity.DeclareOrderOssEntity;
import com.wzlue.chain.declare.service.DeclareOrderOssService;


@Service("declareOrderOssService")
public class DeclareOrderOssServiceImpl implements DeclareOrderOssService {
    @Autowired
    private DeclareOrderOssDao declareOrderOssDao;

    @Override
    public DeclareOrderOssEntity queryObject(Integer id) {
        return declareOrderOssDao.queryObject(id);
    }

    @Override
    public List<DeclareOrderOssEntity> queryList(Map<String, Object> map) {
        return declareOrderOssDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return declareOrderOssDao.queryTotal(map);
    }

    @Override
    public void save(DeclareOrderOssEntity declareOrderOss) {
        declareOrderOssDao.save(declareOrderOss);
    }

    @Override
    public void update(DeclareOrderOssEntity declareOrderOss) {
        declareOrderOssDao.update(declareOrderOss);
    }

    @Override
    public void delete(Integer id) {
        declareOrderOssDao.delete(id);
    }

    @Override
    public void deleteBatch(Integer[] ids) {
        declareOrderOssDao.deleteBatch(ids);
    }

    @Override
    public void saveFile(List<DeclareOrderOssEntity> list) {
        if (null != list && list.size() > 0) {
            declareOrderOssDao.deleteByOrderId(list.get(0).getOrderId());
            declareOrderOssDao.saveBatch(list);
        }
    }
}
