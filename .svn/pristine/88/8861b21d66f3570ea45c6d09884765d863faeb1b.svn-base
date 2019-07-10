package com.wzlue.chain.offer.service.impl;

import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.offer.dao.GoodsBuyingDao;
import com.wzlue.chain.offer.entity.GoodsBuyingEntity;
import com.wzlue.chain.offer.service.GoodsBuyingService;
import com.wzlue.chain.sys.entity.ImageEntity;
import com.wzlue.chain.sys.entity.SysDictEntity;
import com.wzlue.chain.sys.entity.SysUserEntity;
import com.wzlue.chain.sys.service.ImageService;
import com.wzlue.chain.sys.service.SysDictService;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service("goodsBuyingService")
public class GoodsBuyingServiceImpl implements GoodsBuyingService {
    @Autowired
    private GoodsBuyingDao goodsBuyingDao;
    @Autowired
    private ImageService imageService;
    @Autowired
    private SysDictService dictService;

    @Override
    public GoodsBuyingEntity queryObject(Long id) {
        GoodsBuyingEntity goodsBuying = goodsBuyingDao.queryObject(id);
        if (goodsBuying == null) {

        } else {
            List<ImageEntity> imageInfo = goodsBuyingDao.getGoodsBuyImage(id);
            goodsBuying.setImages(imageInfo);
        }
        return goodsBuying;
    }

    @Override
    public List<GoodsBuyingEntity> queryList(Map<String, Object> map) {
        return goodsBuyingDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return goodsBuyingDao.queryTotal(map);
    }

    @Override
    public void save(GoodsBuyingEntity goodsBuying) {
        SysUserEntity user = (SysUserEntity) SecurityUtils.getSubject().getPrincipal();
        goodsBuying.setCreateBy(user.getUserId().toString());
        goodsBuying.setCreateTime(new Date());
        goodsBuying.setModifyBy(Long.toString(user.getUserId()));
        goodsBuying.setModifyTime(new Date());
        goodsBuying.setCompanyId(user.getCompanyId().toString());
        goodsBuying.setGoodsCompanyId(user.getCompanyId().toString());
        goodsBuyingDao.save(goodsBuying);
        List<ImageEntity> images = goodsBuying.getImages();
        List<SysDictEntity> dic = dictService.queryByType("image_type_goods_buying");
        if (images != null) {
            for (ImageEntity image : images) {
                image.setPicType(dic.get(0).getCode());
                image.setCode(goodsBuying.getId().intValue());
                image.setCreateBy(user.getUserId().toString());
                image.setCreateDate(new Date());
            }
            imageService.saveList(images);
        }
    }

    @Override
    public void update(GoodsBuyingEntity goodsBuying) {
        SysUserEntity user = (SysUserEntity) SecurityUtils.getSubject().getPrincipal();
        goodsBuying.setModifyBy(Long.toString(user.getUserId()));
        goodsBuying.setModifyTime(new Date());
        List<ImageEntity> images = goodsBuying.getImages();
        List<SysDictEntity> dic = dictService.queryByType("image_type_goods_buying");
        Map<String, Object> params = new HashMap<>();
        params.put("code", goodsBuying.getId());
        params.put("picType", dic.get(0).getCode());
        imageService.deleteByCode(params);
        if (images != null) {
            for (ImageEntity image : images) {
                image.setPicType(dic.get(0).getCode());
                image.setCode(goodsBuying.getId().intValue());
                image.setCreateBy(user.getUserId().toString());
                image.setCreateDate(new Date());
            }
            imageService.saveList(images);
        }
        goodsBuyingDao.update(goodsBuying);
    }

    @Override
    public void delete(Long id) {
        goodsBuyingDao.delete(id);
    }

    @Override
    public void deleteBatch(Long[] ids) {
        goodsBuyingDao.deleteBatch(ids);
    }

    @Override
    public void updateUnsold(Map<String, Object> params) {
        goodsBuyingDao.updateUnsold(params);
    }

    @Override
    public List<GoodsBuyingEntity> getBuyingOffer(Map<String, Object> map) {
        return goodsBuyingDao.getBuyingOffer(map);
    }

    @Override
    public List<GoodsBuyingEntity> queryBuyingList(Map<String, Object> map) {
        return goodsBuyingDao.queryBuyingList(map);
    }

}
