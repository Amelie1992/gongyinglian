package com.wzlue.chain.declare.service.impl;

import com.wzlue.chain.common.base.R;
import com.wzlue.chain.company.dao.MerchantCompanyDao;
import com.wzlue.chain.company.entity.MerchantCompanyEntity;
import com.wzlue.chain.declare.dao.DeclareOfferCustomsDao;
import com.wzlue.chain.declare.entity.DeclareOfferCustomsEntity;
import com.wzlue.chain.sys.dao.SysUserDao;
import com.wzlue.chain.sys.entity.SysUserEntity;
import com.wzlue.chain.sys.service.SysNumberRuleService;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

import com.wzlue.chain.declare.dao.DeclareOfferDao;
import com.wzlue.chain.declare.entity.DeclareOfferEntity;
import com.wzlue.chain.declare.service.DeclareOfferService;
import org.springframework.transaction.annotation.Transactional;


@Service("declareOfferService")
public class DeclareOfferServiceImpl implements DeclareOfferService {
	@Autowired
	private DeclareOfferDao declareOfferDao;
	@Autowired
    private DeclareOfferCustomsDao declareOfferCustomsDao;
	@Autowired
    private SysUserDao sysUserDao;
	@Autowired
    private MerchantCompanyDao merchantCompanyDao;
    @Autowired
    private SysNumberRuleService sysNumberRuleService;


    @Override
	public DeclareOfferEntity queryObject(Integer id){
		return declareOfferDao.queryObject(id);
	}

    protected SysUserEntity getUser() {
        return (SysUserEntity) SecurityUtils.getSubject().getPrincipal();
    }
	@Override//获取当前登录人所属公司信息
	public List<DeclareOfferEntity> queryList(Map<String, Object> map){
        if(map.get("app") ==null){
            map.put("companyId",getUser().getCompanyId());
        }
		return declareOfferDao.queryList(map);
	}
	@Override//前端传入指定companyId，查询对应公司所报盘信息(买入订单调用此接口)
	public List<DeclareOfferEntity> queryList1(Map<String, Object> map){
		return declareOfferDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return declareOfferDao.queryTotal(map);
	}
	
	@Override
    @Transactional
	public R save(DeclareOfferEntity declareOffer){
        declareOffer.setGroundingState(0);
        SysUserEntity userEntity = sysUserDao.queryObject(declareOffer.getCreateBy());
        if (userEntity!=null) {
            declareOffer.setCompanyId(Math.toIntExact(userEntity.getCompanyId()));
            MerchantCompanyEntity name=merchantCompanyDao.queryObject(declareOffer.getCompanyId());//根据公司id获取公司名称
            declareOffer.setCompanyName(name.getCompanyName());
        }else{
            return R.error("管理员用户不可以下单");
        }
        if(declareOffer.getCommodityCode() == null || "".equals(declareOffer.getCommodityCode())){
//            declareOffer.setCommodityCode(sysNumberRuleService.getCodeNumber("BGBH"));
            String commodityCode= "BGBH";
            commodityCode+= new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
            commodityCode+= UUID.randomUUID().toString().substring(0,3);
            declareOffer.setCommodityCode(commodityCode);
        }
		declareOfferDao.save(declareOffer);
		List<DeclareOfferCustomsEntity> list = declareOffer.getCustomsList();
		if(list.size()>0){
            for(DeclareOfferCustomsEntity item :list){
                item.setOfferId(Math.toIntExact(declareOffer.getId()));
                declareOfferCustomsDao.save(item);
            }

        }
        return R.ok();
	}
	
	@Override
	public void update(DeclareOfferEntity declareOffer){
        declareOffer.setUpdateTime(new Date());
		declareOfferDao.update(declareOffer);
		List<DeclareOfferCustomsEntity> list = declareOffer.getCustomsList();
		List<DeclareOfferCustomsEntity> oldList = declareOfferCustomsDao.getListById(Math.toIntExact(declareOffer.getId()));
		if(oldList.size()>0){
		    declareOfferCustomsDao.deleteList(oldList);
        }
        if(list.size()>0){
		    declareOfferCustomsDao.saveList(list);
        }
	}
	
	@Override
	public void delete(Integer id){
		declareOfferDao.delete(id);
	}
	
	@Override
    @Transactional
	public void deleteBatch(Integer[] ids){
		declareOfferDao.deleteBatch(ids);
        declareOfferCustomsDao.deleteOffer(ids);
	}

    @Override
    public void offer(Map<String, Object> map) {
        declareOfferDao.updateOffer(map);
    }

    @Override
    public void disOfferOffer(Map<String, Object> map) {
        declareOfferDao.updateOffer(map);
    }
    //报关编码是否重复
    @Override
    public int checkCode(DeclareOfferEntity declareOfferEntity) {
       return declareOfferDao.checkCode(declareOfferEntity);
    }

    @Override
    public List<DeclareOfferEntity> getListByCompanyId(Long id) {
        return declareOfferDao.getListByCompanyId(id);
    }
}
