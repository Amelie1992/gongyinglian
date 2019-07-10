package com.wzlue.chain.goods.service.impl;

import com.wzlue.chain.goods.dao.ItemCategoryDao;
import com.wzlue.chain.goods.entity.ItemCategoryEntity;
import com.wzlue.chain.goods.entity.ItemOriginPlaceEntity;
import com.wzlue.chain.goods.service.ItemCategoryService;
import com.wzlue.chain.sys.dao.SysUserDao;
import com.wzlue.chain.sys.entity.SysUserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 商品分类表
 * 业务层(实现)
 */
@Service
public class ItemCategoryServiceImpl implements ItemCategoryService{

    @Autowired
    private ItemCategoryDao itemCategoryDao;
    @Autowired
    private SysUserDao sysUserDao;

    @Override
    public ItemCategoryEntity queryObject(Integer id) {
        return itemCategoryDao.queryObject(id);
    }

    @Override
    public List<ItemCategoryEntity> queryList(Map<String, Object> map) {
        return itemCategoryDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return itemCategoryDao.queryTotal(map);
    }

    @Override
    public void save(ItemCategoryEntity itemCategory) {
        SysUserEntity user = sysUserDao.queryObject(itemCategory.getCreateBy());

        Date now = new Date();
        itemCategory.setCreateTime(now);
        itemCategory.setUpdateTime(now);
        if (null!=user){
            itemCategory.setDeptId(user.getDepartmentId());
            itemCategory.setCompanyId(user.getCompanyId());
        }
        itemCategoryDao.save(itemCategory);
    }

    @Override
    public void update(ItemCategoryEntity itemCategory) {
        itemCategoryDao.update(itemCategory);
    }

    @Override
    public void delete(Integer id) {
        itemCategoryDao.delete(id);
    }

    @Override
    public void deleteBatch(Integer[] ids) {
        itemCategoryDao.deleteBatch(ids);
    }

    /**
     * 下拉框列表数据
     */
    @Override
    public List<ItemCategoryEntity> getList() {
        List<ItemCategoryEntity> list =  itemCategoryDao.getList();
        List<ItemCategoryEntity> temp =  new ArrayList<>();
        ItemCategoryEntity top =new ItemCategoryEntity();
        top.setId(0);
        top.setCategoryName("顶级");
        top.setParentId(null);
        list = buildByRecursive(list);
        top.setList(list);
        temp.add(top);
        return temp;
    }

    @Override
    public List<ItemCategoryEntity> getTopList() {
        List<ItemCategoryEntity> list =  itemCategoryDao.getTopList();
        list = buildByRecursive(list);
        return list;
    }

    @Override
    public List<ItemCategoryEntity> getSelectList() {
        List<ItemCategoryEntity> list =  itemCategoryDao.getList();
        list = buildByRecursive(list);
        return list;
    }

    /**
     * 逻辑删除(软删除)
     *
     * 修改数据状态: => 删除
     */
    @Override
    public void updateDel(Long[] id) {
        itemCategoryDao.updateDel(id);
    }

    @Override
    public List<ItemCategoryEntity> getSelectAllList() {
        List<ItemCategoryEntity> list =  itemCategoryDao.getList();

        return list;
    }

    @Override
    public List<ItemOriginPlaceEntity> getPlacesByCategoryId(Long[] id) {
        return itemCategoryDao.getPlacesByCategoryId(id);
    }

    @Override
    public int checkOnly(String categoryName,String taxNumber,Integer id) {
        ItemCategoryEntity itemCategory = new ItemCategoryEntity();
        itemCategory.setCategoryName(categoryName);
        itemCategory.setTaxNumber(taxNumber);
        itemCategory.setId(id);
        return itemCategoryDao.checkOnly(itemCategory);
    }

    @Override
    public List<ItemOriginPlaceEntity> getPlaces(Map<String, Object> params) {
        return itemCategoryDao.getPlaces(params);
    }

    @Override
    public List<ItemCategoryEntity> getItemCategory(Map<String, Object> params) {
        return itemCategoryDao.getItemCategory(params);
    }

    @Override
    public List<ItemOriginPlaceEntity> getPlaceByBuyingGoods(Map<String, Object> params) {
        return itemCategoryDao.getPlaceByBuyingGoods(params);
    }

    @Override
    public List<ItemOriginPlaceEntity> getAllPlaceByBuyingGoods() {
        return itemCategoryDao.getAllPlaceByBuyingGoods();
    }

    private List<ItemCategoryEntity> buildByRecursive(List<ItemCategoryEntity> treeNodes) {
        List<ItemCategoryEntity> trees = new ArrayList<ItemCategoryEntity>();

        for (ItemCategoryEntity item : treeNodes) {
            if (item.getParentId()!= null && 0 == item.getParentId()) {
                trees.add(findChildren(item,treeNodes));
            }
        }

        return trees;
    }

    private ItemCategoryEntity findChildren(ItemCategoryEntity treeNode,List<ItemCategoryEntity> treeNodes) {
        for (ItemCategoryEntity it : treeNodes) {
            if(it.getParentId()!= null && treeNode!=null && treeNode.getId().longValue()==it.getParentId().longValue()) {
                if (treeNode.getList() == null) {
                    treeNode.setList(new ArrayList<ItemCategoryEntity>());
                }
                treeNode.getList().add(findChildren(it,treeNodes));
            }
        }
        return treeNode;
    }

    @Override
    public List<ItemCategoryEntity> pageList(Map<String, Object> map) {
        return itemCategoryDao.pageList(map);
    }

    @Override
    public int pageCount(Map<String, Object> map) {
        return itemCategoryDao.pageCount(map);
    }

    @Override
    public List<ItemOriginPlaceEntity> getPlaceByIdsAndName(Map<String, Object> params) {
        return itemCategoryDao.getPlaceByIdsAndName(params);
    }
}
