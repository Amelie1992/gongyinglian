package com.wzlue.chain.bill.service;

import com.wzlue.chain.bill.entity.IncomeExpenditureDetailEntity;

import java.util.List;
import java.util.Map;

/**
 * 收支明细
 * 
 * @author 
 * @email 
 * @date 2018-09-27 10:24:37
 */
public interface IncomeExpenditureDetailService {
	
	IncomeExpenditureDetailEntity queryObject(Integer id);
	
	List<IncomeExpenditureDetailEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(IncomeExpenditureDetailEntity incomeExpenditureDetail);
	
	void update(IncomeExpenditureDetailEntity incomeExpenditureDetail);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);
}
