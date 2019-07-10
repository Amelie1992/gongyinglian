package com.wzlue.chain.agent.dao;

import com.wzlue.chain.agent.entity.ContractAnnexEntity;
import com.wzlue.chain.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 合同附件信息表
 * 
 * @author 
 * @email 
 * @date 2018-09-17 10:16:20
 */
@Mapper
public interface ContractAnnexDao extends BaseDao<ContractAnnexEntity> {
	void deleteByContractId(@Param("id") Long id,@Param("type") Integer contractType);

    List<ContractAnnexEntity> queryListByContractId(Long contractId);
}
