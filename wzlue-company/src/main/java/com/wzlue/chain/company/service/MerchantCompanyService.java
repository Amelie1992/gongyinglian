package com.wzlue.chain.company.service;

import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.enums.CreditType;
import com.wzlue.chain.company.entity.MerchantCompanyEntity;
import com.wzlue.chain.company.entity.MerchantCompanyServiceEntity;
import com.wzlue.chain.company.entity.ServiceTypeEntity;
import com.wzlue.chain.sys.entity.SysRoleEntity;
import com.wzlue.chain.sys.entity.SysUserEntity;

import java.util.List;
import java.util.Map;

/**
 * 商户注册公司关联表
 *
 * @author
 * @email
 * @date 2018-08-17 11:27:53
 */
public interface MerchantCompanyService {

    MerchantCompanyEntity queryObject(Integer id);
    MerchantCompanyEntity queryObject2(Integer id);

    List<MerchantCompanyEntity> queryList(Map<String, Object> map);

    int queryTotal(Map<String, Object> map);

    void save(MerchantCompanyEntity merchantUsers);

    void update(MerchantCompanyEntity merchantUsers);

    void delete(Integer id);

    void deleteBatch(Integer[] ids);

    void register(SysUserEntity user, MerchantCompanyEntity merchantCompanyEntity);

    void saveCompanyServiceType(Long id, List<ServiceTypeEntity> service);

    List<MerchantCompanyEntity> pageList(Map<String, Object> map);

    int pageCount(Map<String, Object> mao);

    MerchantCompanyEntity queryByUserId(Long userId);

    List<MerchantCompanyEntity> queryByUserId2(Long userId);

    void updateServiceType(MerchantCompanyEntity merchantCompanyEntity);

    /**
     * 授信 服务
     * @param creditType 类型 根据CreditType 类型传值
     * @param companyEntity 公司
     * @return
     */
    boolean updateCreditType(CreditType creditType, MerchantCompanyEntity companyEntity);

    MerchantCompanyEntity getInfoByUser(Long userId);

    /**
     * 查询客服
     * @param companyid 公司Id
     * @return
     */
    List<SysUserEntity> queryCustomerServicebyCompanyId (String companyid);

    List<MerchantCompanyEntity> queryCompanysForOutByCompanyId(Long companyId);

    List<MerchantCompanyEntity> queryAgentofferCompany(Query query);

    int queryAgentofferCompanyCount(Query query);

    boolean unsubscribe(Long id, String msg);

    boolean auditpass(Long id, String msg);

    void saveOrUpdate(MerchantCompanyEntity merchantCompanyEntity, SysUserEntity userEntity);

    /**
     * 根据公司名称查询公司是否存在。
     * @param companyName
     * @return
     */
    int getCompanyByNameCount(String companyName);

    boolean recovery(Long id);

    void saveRole(SysRoleEntity role);

    boolean noauditpass(Long id, String msg);

    List<MerchantCompanyServiceEntity> queryCompanyServiceByCompanyId(Long id);

    List<MerchantCompanyEntity> getCompanyByService(Map<String, Object> param);

    List<MerchantCompanyEntity> getCompanys(int companyId);

    List<MerchantCompanyEntity> getRecommendCompanyList(Map<String, Object> param);

    MerchantCompanyEntity getCompanyPass(SysUserEntity user);

//    MerchantCompanyEntity getByCompanyName(String companyName);


}
