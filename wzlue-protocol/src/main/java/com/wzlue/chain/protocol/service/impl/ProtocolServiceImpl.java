package com.wzlue.chain.protocol.service.impl;

import com.wzlue.chain.protocol.dao.ProtocolDao;
import com.wzlue.chain.protocol.entity.ProtocolEntity;
import com.wzlue.chain.protocol.service.ProtocolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;



@Service("protocolService")
public class ProtocolServiceImpl implements ProtocolService {
	@Autowired
	private ProtocolDao protocolDao;
	
	@Override
	public ProtocolEntity queryObject(Long id){
		return protocolDao.queryObject(id);
	}
	
	@Override
	public List<ProtocolEntity> queryList(Map<String, Object> map){
		return protocolDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return protocolDao.queryTotal(map);
	}
	
	@Override
	public void save(ProtocolEntity protocol){
		protocolDao.save(protocol);
	}
	
	@Override
	public void update(ProtocolEntity protocol){
		protocolDao.update(protocol);
	}
	
	@Override
	public void delete(Long id){
		protocolDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		protocolDao.deleteBatch(ids);
	}

    @Override
    public int queryType(int type) {

	    return protocolDao.queryType(type);
    }
}
