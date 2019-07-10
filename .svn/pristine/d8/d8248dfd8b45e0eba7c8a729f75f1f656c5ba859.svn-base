package com.wzlue.chain.depot.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.wzlue.chain.depot.dao.GoodsOrderDepotDao;
import com.wzlue.chain.depot.entity.GoodsOrderDepotEntity;
import com.wzlue.chain.depot.service.GoodsOrderDepotService;



@Service("goodsOrderDepotService")
public class GoodsOrderDepotServiceImpl implements GoodsOrderDepotService {
	@Autowired
	private GoodsOrderDepotDao goodsOrderDepotDao;
	
	@Override
	public GoodsOrderDepotEntity queryObject(Integer id){
		return goodsOrderDepotDao.queryObject(id);
	}
	
	@Override
	public List<GoodsOrderDepotEntity> queryList(Map<String, Object> map){
		return goodsOrderDepotDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return goodsOrderDepotDao.queryTotal(map);
	}
	
	@Override
	public void save(GoodsOrderDepotEntity goodsOrderDepot){
		Date nowTime = new Date();
		//SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		goodsOrderDepot.setCreateTime(nowTime);
		goodsOrderDepotDao.save(goodsOrderDepot);
	}
	
	@Override
	public void update(GoodsOrderDepotEntity goodsOrderDepot){
		goodsOrderDepotDao.update(goodsOrderDepot);
	}
	
	@Override
	public void delete(Integer id){
		goodsOrderDepotDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Integer[] ids){
		goodsOrderDepotDao.deleteBatch(ids);
	}

}
