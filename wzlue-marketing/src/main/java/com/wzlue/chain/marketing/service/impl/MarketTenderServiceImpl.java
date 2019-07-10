package com.wzlue.chain.marketing.service.impl;

import com.wzlue.chain.common.utils.StringTools;
import com.wzlue.chain.company.dao.MerchantCompanyDao;
import com.wzlue.chain.company.entity.MerchantCompanyEntity;
import com.wzlue.chain.sys.entity.SysUserEntity;
import com.wzlue.chain.sys.service.SysNumberRuleService;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.wzlue.chain.marketing.dao.MarketTenderDao;
import com.wzlue.chain.marketing.entity.MarketTenderEntity;
import com.wzlue.chain.marketing.service.MarketTenderService;



@Service("marketTenderService")
public class MarketTenderServiceImpl implements MarketTenderService {
	@Autowired
	private MarketTenderDao marketTenderDao;
	@Autowired
	private MerchantCompanyDao merchantCompanyDao;
	@Autowired
	private SysNumberRuleService sysNumberRuleService;
	
	@Override
	public MarketTenderEntity queryObject(Long id){
		return marketTenderDao.queryObject(id);
	}
	
	@Override
	public List<MarketTenderEntity> queryList(Map<String, Object> map){
		return marketTenderDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return marketTenderDao.queryTotal(map);
	}
	
	@Override
	public void save(MarketTenderEntity marketTender){

		marketTender.setCreateBy(getUser().getUserId());
		marketTender.setCreateDate(new Date());
		//生成编码
		marketTender.setTenderNumber(sysNumberRuleService.getCodeNumber("number_config_tender"));
		marketTenderDao.save(marketTender);
	}
	
	@Override
	public void update(MarketTenderEntity marketTender){
		marketTenderDao.update(marketTender);
	}
	
	@Override
	public void delete(Long id){
		marketTenderDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		marketTenderDao.deleteBatch(ids);
	}

	public SysUserEntity getUser() {
		return (SysUserEntity) SecurityUtils.getSubject().getPrincipal();
	}

	@Override
	public void updateStatus(Map<String, Object> map) {
		marketTenderDao.updateStatus(map);
	}

	@Override
	public void updateStatus1(Map<String, Object> map) {
		marketTenderDao.updateStatus(map);
	}
}
