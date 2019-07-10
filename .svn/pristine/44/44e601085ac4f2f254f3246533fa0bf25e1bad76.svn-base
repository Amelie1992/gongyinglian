package com.wzlue.chain.goods.service.impl;

import com.wzlue.chain.goods.dao.ItemInfoDao;
import com.wzlue.chain.goods.dao.ItemOriginPlaceDao;
import com.wzlue.chain.goods.entity.ItemCategoryEntity;
import com.wzlue.chain.goods.entity.ItemInfoEntity;
import com.wzlue.chain.goods.entity.ItemOriginPlaceEntity;
import com.wzlue.chain.goods.service.ItemInfoService;
import com.wzlue.chain.sys.dao.SysUserDao;
import com.wzlue.chain.sys.entity.SysUserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 商品信息表
 * 业务层(实现)
 */
@Service
public class ItemInfoServiceImpl implements ItemInfoService {

    @Autowired
    private ItemInfoDao itemInfoDao;
    @Autowired
    private ItemOriginPlaceDao itemPlaceDao;
    @Autowired
    private SysUserDao sysUserDao;

    @Override
    public ItemInfoEntity queryObject(Integer id) {
        return itemInfoDao.queryObject(id);
    }

    @Override
    public List<ItemInfoEntity> queryList(Map<String, Object> map) {
        return itemInfoDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return itemInfoDao.queryTotal(map);
    }

    /**
    * 事务控制:
    * 新增商品信息
    * (追加新增商品的产地信息)*/
    @Override
    @Transactional
    public void save(ItemInfoEntity itemInfo) {
        SysUserEntity user = sysUserDao.queryObject(itemInfo.getCreateBy());

        //添加商品信息
        Date operaTime = new Date();
        itemInfo.setCreateTime(operaTime);
        itemInfo.setUpdateTime(operaTime);
        if(null!=user){
            itemInfo.setDeptId(user.getDepartmentId());
            itemInfo.setCompanyId(user.getCompanyId());
        }
        itemInfoDao.saveItem(itemInfo);

        //新增商品产地信息
        if(itemInfo.getPlaces()!=null && itemInfo.getPlaces().get(0)!=null){
            for (ItemOriginPlaceEntity item : itemInfo.getPlaces()){
                item.setGoodsId(itemInfo.getId());
                item.setTariff(new BigDecimal(String.valueOf(item.getTariff())).divide(new BigDecimal(100)));
                item.setAdditionDuty(new BigDecimal(String.valueOf(item.getAdditionDuty())).divide(new BigDecimal(100)));
                item.setValueAddTariff(new BigDecimal(String.valueOf(item.getValueAddTariff())).divide(new BigDecimal(100)));
                itemPlaceDao.save(item);
            }
        }
    }

    /**
     * 事务控制:
     * 修改商品信息
     * 删除商品的产地信息
     * 添加商品的产地信息
     * */
    @Override
    @Transactional
    public void update(ItemInfoEntity itemInfo) {
        itemInfo.setUpdateTime(new Date());
        itemInfoDao.update(itemInfo);

        //删除商品原有产地信息
        itemPlaceDao.deleteByGoodsId(itemInfo.getId());
        //增加修改后的产地信息
        if (itemInfo.getPlaces()!=null && itemInfo.getPlaces().get(0)!=null){
            for (ItemOriginPlaceEntity item : itemInfo.getPlaces()){
                item.setId(null);
                item.setGoodsId(itemInfo.getId());
                item.setTariff(new BigDecimal(String.valueOf(item.getTariff())).divide(new BigDecimal(100)));
                item.setAdditionDuty(new BigDecimal(String.valueOf(item.getAdditionDuty())).divide(new BigDecimal(100)));
                item.setValueAddTariff(new BigDecimal(String.valueOf(item.getValueAddTariff())).divide(new BigDecimal(100)));
                itemPlaceDao.save(item);
            }
        }
    }

    @Override
    public void delete(Integer id) {
        itemInfoDao.delete(id);
    }

    @Override
    public void deleteBatch(Integer[] ids) {
        itemInfoDao.deleteBatch(ids);
    }

    @Override
    public List<ItemInfoEntity> pageList(Map<String, Object> map) {
        return itemInfoDao.pageList(map);
    }

    @Override
    public int pageCount(Map<String, Object> map) {
        return itemInfoDao.pageCount(map);
    }

    @Override
    public void updateDel(Long[] id) {
        itemInfoDao.updateDel(id);
        itemInfoDao.deletePlace(id);
    }

    @Override
    public ItemInfoEntity queryInfo(Long id) {
        return itemInfoDao.queryInfo(id);
    }

    @Override
    public List<ItemCategoryEntity> getTaxNumber() {
        return itemInfoDao.getTaxNumber();
    }
}
