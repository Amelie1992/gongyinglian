package com.wzlue.chain.agent.service.impl;

import com.wzlue.chain.agent.dao.AgentDemandBusinessDao;
import com.wzlue.chain.agent.dao.AgentDemandGoodsCategoryDao;
import com.wzlue.chain.agent.entity.AgentDemandBusinessEntity;
import com.wzlue.chain.agent.entity.AgentDemandGoodsCategoryEntity;
import com.wzlue.chain.common.annotation.PermissionAop;
import com.wzlue.chain.sys.dao.SysUserDao;
import com.wzlue.chain.sys.entity.SysUserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.wzlue.chain.agent.dao.AgentDemandDao;
import com.wzlue.chain.agent.entity.AgentDemandEntity;
import com.wzlue.chain.agent.service.AgentDemandService;
import org.springframework.transaction.annotation.Transactional;


@Service("agentDemandService")
public class AgentDemandServiceImpl implements AgentDemandService {
	@Autowired
	private AgentDemandDao agentDemandDao;
	@Autowired
	private AgentDemandBusinessDao agentDemandBusinessDao;
	@Autowired
	private AgentDemandGoodsCategoryDao agentDemandGoodsCategoryDao;
	@Autowired
	private SysUserDao sysUserDao;
	
	@Override
	public AgentDemandEntity queryObject(Long id){
		return agentDemandDao.queryObject(id);
	}
	
	@Override
	public List<AgentDemandEntity> queryList(Map<String, Object> map){
		return agentDemandDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return agentDemandDao.queryTotal(map);
	}

	@Override
	public List<AgentDemandEntity> pageList(Map<String, Object> map) {
		return agentDemandDao.pageList(map);
	}

	@Override
	public int pageCount(Map<String, Object> map) {
		return agentDemandDao.pageCount(map);
	}

	@Override
	@Transactional
	public void save(AgentDemandEntity agentDemand){
		//获取个人所属公司信息
		SysUserEntity user = sysUserDao.queryObject(agentDemand.getCreateBy());

		Date now = new Date();
		agentDemand.setCreateTime(now);
		agentDemand.setUpdateTime(now);
		if(user!=null){
			agentDemand.setDeptId(user.getDepartmentId());
			agentDemand.setCompanyId(user.getCompanyId());
		}
		agentDemandDao.save(agentDemand);

		//部门与公司id
		if (agentDemand.getBusiness()!=null && agentDemand.getBusiness().get(0)!=null){
			for (AgentDemandBusinessEntity item:agentDemand.getBusiness()) {
				item.setDemandId(agentDemand.getId());
				agentDemandBusinessDao.save(item);
			}
		}

		if (agentDemand.getCategorys()!=null && agentDemand.getCategorys().get(0)!=null){
			for (AgentDemandGoodsCategoryEntity item : agentDemand.getCategorys()){
				item.setDemandId(agentDemand.getId());
				agentDemandGoodsCategoryDao.save(item);
			}
		}
	}
	
	@Override
	@Transactional
	public void update(AgentDemandEntity agentDemand){
		agentDemand.setUpdateTime(new Date());
		agentDemandDao.update(agentDemand);

		//删除之前的代理项目信息
		agentDemandBusinessDao.deleteByDemandId(agentDemand.getId());
		if (agentDemand.getBusiness()!=null && agentDemand.getBusiness().get(0)!=null){
			for (AgentDemandBusinessEntity item:agentDemand.getBusiness()) {
				item.setDemandId(agentDemand.getId());
				agentDemandBusinessDao.save(item);
			}
		}

		//删除之前的所属商品分类信息
		agentDemandGoodsCategoryDao.deleteByDemandId(agentDemand.getId());
		if (agentDemand.getCategorys()!=null && agentDemand.getCategorys().get(0)!=null){
			for (AgentDemandGoodsCategoryEntity item : agentDemand.getCategorys()){
				item.setDemandId(agentDemand.getId());
				agentDemandGoodsCategoryDao.save(item);
			}
		}
	}

	@Override
	public void updateDel(Long id,Long userId){
		agentDemandDao.updateDel(id,userId);
	}

	@Override
	public void delete(Long id){
		agentDemandDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		agentDemandDao.deleteBatch(ids);
	}

	@Override
	public AgentDemandEntity queryDetail(Long id) {
		return agentDemandDao.queryDetail(id);
	}
}
