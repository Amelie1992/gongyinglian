package com.wzlue.chain.sys.service.impl;

import com.wzlue.chain.common.exception.RRException;
import com.wzlue.chain.common.utils.DateUtils;
import com.wzlue.chain.sys.dao.SysDictDao;
import com.wzlue.chain.sys.dao.SysNumberRuleDao;
import com.wzlue.chain.sys.entity.SysDictEntity;
import com.wzlue.chain.sys.entity.SysNumberRuleEntity;
import com.wzlue.chain.sys.service.SysNumberRuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;


@Service("sysNumberRuleService")
public class SysNumberRuleServiceImpl implements SysNumberRuleService {
	@Autowired
	private SysNumberRuleDao sysNumberRuleDao;
	@Autowired
	private SysDictDao sysDictDao;
	
	@Override
	public SysNumberRuleEntity queryObject(Long id){
		return sysNumberRuleDao.queryObject(id);
	}
	
	@Override
	public List<SysNumberRuleEntity> queryList(Map<String, Object> map){
		return sysNumberRuleDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return sysNumberRuleDao.queryTotal(map);
	}
	
	@Override
	public void save(SysNumberRuleEntity sysNumberRule){
		sysNumberRuleDao.save(sysNumberRule);
	}
	
	@Override
	public void update(SysNumberRuleEntity sysNumberRule){
		sysNumberRuleDao.update(sysNumberRule);
	}
	
	@Override
	public void delete(Long id){
		sysNumberRuleDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		sysNumberRuleDao.deleteBatch(ids);
	}

	@Override
	public SysNumberRuleEntity queryParams(SysNumberRuleEntity sysNumberRule) {
		return sysNumberRuleDao.queryParams(sysNumberRule);
	}


	/**
	 * 根据不同编码规则对象生成编码
	 * @param prefix
	 * @return
	 */
	@Override
	public String getCodeNumberByPrefix(String prefix){
        SysNumberRuleEntity sysNumberRule=new SysNumberRuleEntity();
        sysNumberRule.setPrefix(prefix.trim());
		sysNumberRule.setStatus("1");
        sysNumberRule=sysNumberRuleDao.queryParams(sysNumberRule);
        String codeNumber="";
        if(sysNumberRule!=null){
            //获得前缀
            //获得年月日
            //获得随机数
            codeNumber=sysNumberRule.getPrefix()+DateUtils.format(new Date(),sysNumberRule.getTimeType())+getFixLenthString(sysNumberRule);
            return codeNumber;
        }else{
			throw new RRException("编码规则未定义或者编码规则未开启");
        }

	}

	@Override
	public String getCodeNumber(String code){
		SysDictEntity sysDictEntity=new SysDictEntity();
		sysDictEntity.setType("number_config");
		sysDictEntity.setCode(code);
		sysDictEntity=sysDictDao.queryObjectByPar(sysDictEntity);
		SysNumberRuleEntity sysNumberRule=new SysNumberRuleEntity();
		sysNumberRule.setType(sysDictEntity.getValue());
		sysNumberRule.setStatus("1");
		sysNumberRule=sysNumberRuleDao.queryParams(sysNumberRule);
		String codeNumber="";
		if(sysNumberRule!=null){
			//获得前缀
			//获得年月日
			//获得随机数
			codeNumber=sysNumberRule.getPrefix()+DateUtils.format(new Date(),sysNumberRule.getTimeType())+getFixLenthString(sysNumberRule);
			return codeNumber;
		}else{
			throw new RRException("编码规则未定义或者编码规则未开启");
		}

	}


	/*
	 * 返回长度为【strLength】的数字，在前面补0
	 */
	private   String getFixLenthString(SysNumberRuleEntity sysNumberRule) {
            //新的编号计数
             int newCount;
			//新的编号计数的字符串
			String newStrnewCount;
            //查询数据库此类编号当前长度的到了多少计数
			newCount=sysNumberRule.getNumCount()+1;
			//数据库更新此count数据
			sysNumberRule.setNumCount(newCount);
			sysNumberRuleDao.update(sysNumberRule);
            //临时编号计数字符串
            String temepstrnewCount=(newCount+"").trim();
            int len=temepstrnewCount.length();
            for(int i=0;i<sysNumberRule.getLength()-len;i++){
                temepstrnewCount="0"+temepstrnewCount;
            }
            newStrnewCount=temepstrnewCount;
            // 返回固定的长度的随机数
            return newStrnewCount;
	}

	/**
	 * 定时任务清空每日的生成编码的后缀为0
	 */

	@Override
	public void updateCodeNumber() {
		sysNumberRuleDao.updateCodeNumber();
	}
}
