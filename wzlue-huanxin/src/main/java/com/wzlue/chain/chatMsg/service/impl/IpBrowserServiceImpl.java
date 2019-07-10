package com.wzlue.chain.chatMsg.service.impl;

import com.google.gson.Gson;
import com.wzlue.chain.chatMsg.dao.IpBrowserDao;
import com.wzlue.chain.chatMsg.entity.IpBrowserEntity;
import com.wzlue.chain.chatMsg.service.IPUtil;
import com.wzlue.chain.chatMsg.service.IpBrowserService;
import com.wzlue.chain.common.annotation.JsonObject;
import com.wzlue.chain.common.utils.IPUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

import static com.wzlue.chain.chatMsg.service.IPUtil.getAddresses;


@Service("ipBrowserService")
public class IpBrowserServiceImpl implements IpBrowserService {
	@Autowired
	private IpBrowserDao ipBrowserDao;
	
	@Override
	public IpBrowserEntity queryObject(Integer id){
		return ipBrowserDao.queryObject(id);
	}
	
	@Override
	public List<IpBrowserEntity> queryList(Map<String, Object> map){
		return ipBrowserDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return ipBrowserDao.queryTotal(map);
	}
	
	@Override
	public void save(IpBrowserEntity ipBrowser){
		String ip=ipBrowser.getIp();
		try {
			String name=IPUtil.getAddresses("ip="+ip, "utf-8");
			ipBrowser.setCityname(name);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}finally {
			ipBrowserDao.save(ipBrowser);
		}


	}
	
	@Override
	public void update(IpBrowserEntity ipBrowser){
		ipBrowserDao.update(ipBrowser);
	}
	
	@Override
	public void delete(Integer id){
		ipBrowserDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Integer[] ids){
		ipBrowserDao.deleteBatch(ids);
	}
	
}
