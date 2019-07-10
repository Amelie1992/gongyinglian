package com.wzlue.chain.goods.service.impl.apply;

import com.wzlue.chain.common.exception.RRException;
import com.wzlue.chain.common.utils.Constant;
import com.wzlue.chain.goods.dao.ItemInfoApplyDao;
import com.wzlue.chain.goods.dao.ItemInfoDao;
import com.wzlue.chain.goods.dao.ItemOriginPlaceDao;
import com.wzlue.chain.goods.dao.ItemPlaceApplyDao;
import com.wzlue.chain.goods.entity.ItemInfoEntity;
import com.wzlue.chain.goods.entity.ItemOriginPlaceEntity;
import com.wzlue.chain.goods.entity.apply.ItemInfoApplyEntity;
import com.wzlue.chain.goods.entity.apply.ItemPlaceApplyEntity;
import com.wzlue.chain.goods.service.apply.ItemInfoApplyService;
import com.wzlue.chain.sys.dao.SysUserDao;
import com.wzlue.chain.sys.entity.SysUserEntity;
import com.wzlue.chain.sys.service.SysNumberRuleService;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class ItemInfoApplyServiceImpl implements ItemInfoApplyService {

    @Autowired
    private ItemInfoApplyDao itemInfoApplyDao;
    @Autowired
    private ItemPlaceApplyDao itemPlaceApplyDao;
    @Autowired
    private SysUserDao sysUserDao;

    @Autowired
    private ItemInfoDao itemInfoDao;

    @Autowired
    private ItemOriginPlaceDao itemPlaceDao;

    @Autowired
    private SysNumberRuleService sysNumberRuleService;

    @Override
    public ItemInfoApplyEntity queryObject(Integer id) {
        return itemInfoApplyDao.queryObject(id);
    }

    @Override
    public List<ItemInfoApplyEntity> queryList(Map<String, Object> map) {
        return itemInfoApplyDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return itemInfoApplyDao.queryTotal(map);
    }

    @Override
    public ItemInfoApplyEntity queryInfo(Long id) {
        return itemInfoApplyDao.queryInfo(id);
    }

    @Override
    @Transactional
    public void save(ItemInfoApplyEntity itemInfoApply) {
        SysUserEntity user = sysUserDao.queryObject(itemInfoApply.getCreateBy());
        Date operaTime = new Date();
        //添加商品申请信息
        itemInfoApply.setPendingStatus(1);
        itemInfoApply.setCreateTime(operaTime);
        itemInfoApply.setUpdateTime(operaTime);
        if (null != user) {
            itemInfoApply.setDeptId(user.getDepartmentId());
            itemInfoApply.setCompanyId(user.getCompanyId());
        }
        itemInfoApplyDao.save(itemInfoApply);

        //添加商品申请 产地信息
        if (itemInfoApply.getPlaces() != null && itemInfoApply.getPlaces().get(0) != null) {
            for (ItemPlaceApplyEntity item : itemInfoApply.getPlaces()) {
                item.setGoodApplyId(itemInfoApply.getId());
                if (item.getTariff() != null) {
                    item.setTariff(new BigDecimal(String.valueOf(item.getTariff())).divide(new BigDecimal(100)));
                }
                item.setAdditionDuty(new BigDecimal(String.valueOf(item.getAdditionDuty())).divide(new BigDecimal(100)));
                item.setValueAddTariff(new BigDecimal(String.valueOf(item.getValueAddTariff())).divide(new BigDecimal(100)));
                itemPlaceApplyDao.save(item);
            }
        }
    }

    @Override
    public void update(ItemInfoApplyEntity itemInfoApply) {
        itemInfoApplyDao.update(itemInfoApply);
    }

    @Override
    public void delete(Integer id) {
        itemInfoApplyDao.delete(id);
    }

    @Override
    public void deleteBatch(Integer[] ids) {
        itemInfoApplyDao.deleteBatch(ids);
    }

    @Override
    public List<ItemInfoApplyEntity> pageList(Map<String, Object> map) {
        //显示未审核
//        SysUserEntity user = (SysUserEntity) SecurityUtils.getSubject().getPrincipal();
//        if(user.getUserId() == Constant.SUPER_ADMIN){
//            map.put("pendingStatus","3");
//        }
        return itemInfoApplyDao.pageList(map);
    }

    @Override
    public Integer pageCount(Map<String, Object> map) {
        return itemInfoApplyDao.pageCount(map);
    }

    /*审核*/
    @Override
    public void review(ItemInfoApplyEntity itemInfoApplyEntity) {
        ItemInfoApplyEntity temp = itemInfoApplyDao.queryInfo(itemInfoApplyEntity.getId());
        if (temp != null) {
            temp.setPendingStatus(itemInfoApplyEntity.getPendingStatus());
            temp.setPendingInfo(itemInfoApplyEntity.getPendingInfo());
            temp.setUpdateBy(itemInfoApplyEntity.getUpdateBy());
            temp.setUpdateTime(new Date());
            itemInfoApplyDao.review(temp);
            /*//添加商品
            if(itemInfoApplyEntity.getPendingStatus() == 2){
                SysUserEntity user = sysUserDao.queryObject(itemInfoApplyEntity.getCreateBy());
                ItemInfoEntity itemInfo = new ItemInfoEntity();
                //添加商品信息
                Date operaTime = new Date();
                itemInfo.setCreateTime(operaTime);
                itemInfo.setUpdateTime(operaTime);
                if(null!=user){
                    itemInfo.setDeptId(user.getDepartmentId());
                    itemInfo.setCompanyId(user.getCompanyId());
                }
                itemInfo.setItemName(itemInfoApplyEntity.getItemName());
                itemInfo.setFactoryNo(itemInfoApplyEntity.getFactoryNo());
                itemInfo.setPricingMethod(itemInfoApplyEntity.getPricingMethod());
                itemInfo.setCategoryId(Integer.parseInt(itemInfoApplyEntity.getCategoryId().toString()));
                itemInfo.setCreateBy(itemInfoApplyEntity.getCreateBy());
                //生成编码
                itemInfo.setItemCode(sysNumberRuleService.getCodeNumber("item_code"));
                itemInfoDao.saveItem(itemInfo);
                //产地
                //新增商品产地信息
                if(itemInfoApplyEntity.getPlaces()!=null && itemInfoApplyEntity.getPlaces().get(0)!=null){
                    for (ItemPlaceApplyEntity item : itemInfoApplyEntity.getPlaces()){
                        ItemOriginPlaceEntity place = new ItemOriginPlaceEntity();
                        place.setGoodsId(itemInfo.getId());
                        place.setPlace(item.getPlace());
                        place.setNumerical(item.getNumerical());
                        place.setTariff(item.getTariff());
                        place.setAdditionDuty(item.getAdditionDuty());
                        place.setValueAddTariff(item.getValueAddTariff());
                        place.setRemark(item.getRemark());
                        itemPlaceDao.save(place);
                    }
                }
            }*/

        } else {
            throw new RRException("改商品申请信息异常");
        }
    }

    @Override
    public void updateDel(Long[] id) {
        itemInfoApplyDao.deleteBatch(id);
    }

    @Override
    public void updateUpdate(ItemPlaceApplyEntity place) {
        itemInfoApplyDao.updateUpdate(place);
    }

    @Override
    public void deleteBanchById(Long[] id) {
        itemInfoApplyDao.deleteBanchById(id);
    }

}
