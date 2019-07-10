package com.wzlue.chain.bill.service.impl;

import com.wzlue.chain.common.utils.SplitUtil;
import com.wzlue.chain.sys.entity.ImageEntity;
import com.wzlue.chain.sys.entity.SysUserEntity;
import com.wzlue.chain.sys.service.ImageService;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.wzlue.chain.bill.dao.IncomeExpenditureDetailDao;
import com.wzlue.chain.bill.entity.IncomeExpenditureDetailEntity;
import com.wzlue.chain.bill.service.IncomeExpenditureDetailService;


@Service("incomeExpenditureDetailService")
public class IncomeExpenditureDetailServiceImpl implements IncomeExpenditureDetailService {
    @Autowired
    private IncomeExpenditureDetailDao incomeExpenditureDetailDao;
    @Autowired
    private ImageService imageService;

    @Override
    public IncomeExpenditureDetailEntity queryObject(Integer id) {
        IncomeExpenditureDetailEntity incomeExpenditureDetailEntity = incomeExpenditureDetailDao.queryObject(id);
        if (incomeExpenditureDetailEntity.getImages() == null || incomeExpenditureDetailEntity.getImages().size() == 0) {
            Map<String, Object> query = new HashMap<>();
            query.put("serialNumber", incomeExpenditureDetailEntity.getSerialNumber());
            query.put("pay", 1);
            IncomeExpenditureDetailEntity payDetail = incomeExpenditureDetailDao.queryBySerialNumber(query);
            Map<String, Object> map = new HashMap<>();
            map.put("code", payDetail.getId());
            map.put("type", "offline_pay");
            List<ImageEntity> imageEntities = imageService.queryList(map);
            incomeExpenditureDetailEntity.setImages(imageEntities);
        }
        return incomeExpenditureDetailEntity;
    }

    @Override
    public List<IncomeExpenditureDetailEntity> queryList(Map<String, Object> map) {
        return incomeExpenditureDetailDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return incomeExpenditureDetailDao.queryTotal(map);
    }

    @Override
    public void save(IncomeExpenditureDetailEntity incomeExpenditureDetail) {
        incomeExpenditureDetailDao.save(incomeExpenditureDetail);
        SysUserEntity user = (SysUserEntity) SecurityUtils.getSubject().getPrincipal();
        Date currentTime = new Date();
        ////保存打款凭证
        List<ImageEntity> images = incomeExpenditureDetail.getImages();
        for (ImageEntity image : images) {
            if (StringUtils.isBlank(image.getPicName())) {
                image.setPicName(SplitUtil.splitPicName(image.getPicUrl()));
            }
            image.setType("offline_pay");    //"transfer_payment"
            image.setCode(incomeExpenditureDetail.getId());
            image.setCreateBy(user.getUserId().toString());
            image.setCreateDate(currentTime);
        }
        imageService.saveList(images);
    }

    @Override
    public void update(IncomeExpenditureDetailEntity incomeExpenditureDetail) {
        incomeExpenditureDetailDao.update(incomeExpenditureDetail);
    }

    @Override
    public void delete(Integer id) {
        incomeExpenditureDetailDao.delete(id);
    }

    @Override
    public void deleteBatch(Integer[] ids) {
        incomeExpenditureDetailDao.deleteBatch(ids);
    }

}
