package com.wzlue.chain.highcharts.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.wzlue.chain.highcharts.dao.HighchartsDao;
import com.wzlue.chain.highcharts.entity.HighchartsEntity;
import com.wzlue.chain.highcharts.service.HighchartsService;



@Service("highchartsService")
public class HighchartsServiceImpl implements HighchartsService {
	@Autowired
	private HighchartsDao highchartsDao;

	@Override
	public List<Integer> getTotalOrder() {
		return null;
	}

	@Override
	public List<Map> receivable(Map<String, Object> map) {
		return highchartsDao.receivable(map);
	}

	@Override
	public List<Integer> adduser(Map<String, Object> map) {
		return highchartsDao.adduser(map);
	}

	@Override
	public List<Map> complaint(Map<String, Object> map) {
		return highchartsDao.complaint(map);
	}

    @Override
    public List<Map> aftersale(Map<String, Object> map) {
        return highchartsDao.aftersale(map);
    }
}
