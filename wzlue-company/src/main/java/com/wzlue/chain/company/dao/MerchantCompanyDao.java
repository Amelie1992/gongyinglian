package com.wzlue.chain.company.dao;

import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.enums.CreditType;
import com.wzlue.chain.company.entity.CompanyTypeEntity;
import com.wzlue.chain.company.entity.MerchantCompanyEntity;
import com.wzlue.chain.common.base.BaseDao;
import com.wzlue.chain.company.entity.MerchantCompanyServiceEntity;
import com.wzlue.chain.company.entity.ServiceTypeEntity;
import com.wzlue.chain.sys.entity.SysUserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

import java.util.Map;

/**
 * 商户注册公司关联表
 * 
 * @author 
 * @email 
 * @date 2018-08-17 11:27:53
 */
@Mapper
public interface MerchantCompanyDao extends BaseDao<MerchantCompanyEntity> {

    void register(MerchantCompanyEntity merchantCompanyEntity);

    List<MerchantCompanyEntity> pageList(Map<String, Object> map);

    int pageCount(Map<String,Object> map);

    void saveCompanyServiceType(@Param("id") Long id, @Param("service") List<ServiceTypeEntity> service);

    MerchantCompanyEntity queryByUserId(Long userId);

    void deleteServiceType(MerchantCompanyEntity merchantCompanyEntity);

    int updateCreditType(@Param("creditType") CreditType creditType, @Param("company") MerchantCompanyEntity companyEntity);

    MerchantCompanyEntity getInfoByUser(@Param("userId") Long  userId);

    MerchantCompanyEntity queryObjectByUserId(@Param("userId") Long  userId);

    List<SysUserEntity> queryCustomerServicebyCompanyId(@Param("companyid") String companyid);

    List<MerchantCompanyEntity> queryCompanysForOutByCompanyId(Long companyId);

    @Deprecated
    List<MerchantCompanyEntity> queryAgentofferCompany(Query query);

    int queryAgentofferCompanyCount(Query query);

    MerchantCompanyEntity queryByCompanyId(@Param("companyid") Long companyid);

    int updateCompanyStatus(@Param("auditStatus")String auditStatus, @Param("companyid") Long companyid, @Param("msg") String msg);

    int saveOrUpdate(MerchantCompanyEntity merchantCompanyEntity);

    int getCompanyBynameCount(String companyName);

    List<MerchantCompanyServiceEntity> queryCompanyServiceByCompanyId(Long id);

    List<MerchantCompanyEntity> getCompanyByService(Map<String, Object> param);

    List<MerchantCompanyEntity> getCompanys(int companyId);

    List<MerchantCompanyEntity> getRecommendCompanyList(Map<String, Object> param);

    MerchantCompanyEntity getCompanyPass(SysUserEntity user);

    MerchantCompanyEntity getCompanyByCompnayid(String id);

    MerchantCompanyEntity queryObject2(Integer id);

    List<MerchantCompanyEntity> queryAll();

    CompanyTypeEntity queryCompanyType(String id);
}
