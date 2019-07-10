package com.wzlue.chain.storage.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.storage.dao.OfferDao;
import com.wzlue.chain.storage.entity.OfferEntity;
import com.wzlue.chain.storage.service.OfferService;


@Service("offerService")
public class OfferServiceImpl implements OfferService {
    @Autowired
    private OfferDao offerDao;

    @Override
    public OfferEntity queryObject(Long id) {
        return offerDao.queryObject(id);
    }

    @Override
    public List<OfferEntity> queryList(Map<String, Object> map) {
        return offerDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return offerDao.queryTotal(map);
    }

    @Override
    public void save(OfferEntity offer) {
        offerDao.save(offer);
    }

    @Override
    public void update(OfferEntity offer) {
        offerDao.update(offer);
    }

    @Override
    public void updateList(List<OfferEntity> offers) {
        offerDao.updateList(offers);
    }

    @Override
    public void delete(Long id) {
        offerDao.delete(id);
    }

    @Override
    public void deleteBatch(Long[] ids) {
        offerDao.deleteBatch(ids);
    }

    @Override
    public OfferEntity checkCode(OfferEntity offer) {
        return offerDao.checkCode(offer);
    }

    @Override
    public void updateByOrderId2(Long id){
        offerDao.updateByOrderId2(id);
    }
}
