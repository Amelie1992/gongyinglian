package com.wzlue.chain.web.common.intercept;

import cn.hutool.core.util.StrUtil;
import com.wzlue.chain.common.annotation.PermissionAop;
import com.wzlue.chain.sys.entity.SysUserEntity;
import com.wzlue.chain.web.common.config.PermissionConfig;
import com.wzlue.chain.common.utils.PermissionUtils;
import com.wzlue.chain.common.utils.ReflectUtil;
import org.apache.commons.lang.StringUtils;
import org.apache.ibatis.executor.statement.RoutingStatementHandler;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.SqlCommandType;
import org.apache.ibatis.plugin.*;
import org.apache.poi.ss.formula.functions.T;
import org.apache.shiro.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.util.Properties;

/**
 * mybatis数据权限拦截器 - prepare
 */
@Intercepts({
//          @Signature(type = Executor.class, method = "update", args = { MappedStatement.class, Object.class }),
        @Signature(type = StatementHandler.class, method = "prepare", args = {Connection.class, Integer.class})
//        @Signature(method = "query", type = Executor.class, args = { MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class })
})
@Component
public class PrepareInterceptor implements Interceptor {
    /**
     * 日志
     */
    private static final Logger log = LoggerFactory.getLogger(PrepareInterceptor.class);

    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }

    @Override
    public void setProperties(Properties properties) {
    }

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        if (log.isInfoEnabled()) {
//            log.info("进入 PrepareInterceptor 拦截器...");
        }
        if (invocation.getTarget() instanceof RoutingStatementHandler) {
            RoutingStatementHandler handler = (RoutingStatementHandler) invocation.getTarget();
            StatementHandler delegate = (StatementHandler) ReflectUtil.getFieldValue(handler, "delegate");

            //  通过反射获取delegate父类BaseStatementHandler的mappedStatement属性
            MappedStatement mappedStatement = (MappedStatement) ReflectUtil.getFieldValue(delegate, "mappedStatement");

            String namespace = PermissionConfig.getConfig("permission.intercept.namespace");
            boolean b = StringUtils.contains(namespace, mappedStatement.getId());

            if (b) {
                PermissionAop permissionAop = PermissionUtils.getPermissionByDelegate(mappedStatement);
                if (permissionAop == null) {
                    if (log.isInfoEnabled()) {
                        log.info("数据权限放行...");
                    }
                    return invocation.proceed();
                }
                if (log.isInfoEnabled()) {
                    log.info("数据权限处理【拼接SQL】...");
                }

                BoundSql boundSql = delegate.getBoundSql();
                //  当前登录人
                SysUserEntity sysUserEntity = (SysUserEntity) SecurityUtils.getSubject().getPrincipal();
                if (null != sysUserEntity) {
                    // admin 用户
                    if (null == sysUserEntity.getCompanyId() || null == sysUserEntity.getTypeId())
                        return invocation.proceed();
                }
                ReflectUtil.setFieldValue(boundSql, "sql", permissionSql(boundSql.getSql(), mappedStatement, invocation, sysUserEntity));
            } else {
                return invocation.proceed();
            }
        }
        return invocation.proceed();
    }


    /**
     * 权限sql包装
     */
    protected String permissionSql(String sql, MappedStatement mappedStatement, Invocation invocation, SysUserEntity sysUserEntity) {
        StringBuilder sbSql = new StringBuilder(sql);

        Long userId;
        if ((userId = sysUserEntity.getUserId()) == null)
            return "";

        String dataAuthorizes = sysUserEntity.getDataAuthorizes(); // 0本公司，1个人
        Long companyId = sysUserEntity.getCompanyId();// 公司id
        String typeId = sysUserEntity.getTypeId();

        //  获取 SQL 命令
        SqlCommandType sqlCommandType = mappedStatement.getSqlCommandType();

        // 插入动态添加  createid,organizeid
        if (SqlCommandType.INSERT.equals(sqlCommandType)) {
            // 获取参数
//            Object parameter = invocation.getArgs()[1];
            // 获取私有成员变量
//            Object[] obj = invocation.getArgs();
//          Field[] declaredFields = parameter.getClass().getDeclaredFields();

            // SELECT
        } else if (SqlCommandType.SELECT.equals(sqlCommandType)) {
            //  分页数量
            if (sbSql.indexOf("count") > 0 || sbSql.indexOf("COUNT") > 0) {
                int idx;
                /*if ((idx = sbSql.indexOf("where")) > 0 || (idx = sbSql.indexOf("WHERE")) > 0) {
                    sbSql = new StringBuilder(sbSql.replace(idx, idx + 5, " WHERE create_by = " + userId + " AND "));
                } else if ("0".equals(dataAuthorizes) && null != companyId && "1".equals(typeId)) {
                    sbSql = new StringBuilder(sbSql + " WHERE company_id = " +companyId);
                } else {
                    sbSql = new StringBuilder(sbSql + " WHERE create_by = " + userId);
                }*/
                if ((idx = sbSql.indexOf("where")) > 0 || (idx = sbSql.indexOf("WHERE")) > 0) {
                    sbSql = new StringBuilder(sbSql.replace(idx, idx + 5, " WHERE company_id = " + companyId + " AND "));
                } else {
                    sbSql = new StringBuilder(sbSql + " WHERE company_id = " + companyId);
                }
                //  分页数据
            } else {
                int limitIdx;
                /*if ((limitIdx = sbSql.indexOf("LIMIT")) > 0 || (limitIdx = sbSql.indexOf("limit")) > 0) {
                    sbSql.replace(limitIdx, sbSql.length(), "");
                    sbSql = new StringBuilder("select * from (").append(sbSql).append(" ) s where s.create_by in (" + userId + ") LIMIT ?, ?");

                } else if ("0".equals(dataAuthorizes) && null != companyId && "1".equals(typeId)) {
                    sbSql = new StringBuilder("select * from (").append(sbSql).append(" ) s where s.company_id in (" + companyId + ")");
                } else {
                    sbSql = new StringBuilder("select * from (").append(sbSql).append(" ) s where s.create_by in (" + userId + ")");

                }*/
                if ((limitIdx = sbSql.indexOf("LIMIT")) > 0 || (limitIdx = sbSql.indexOf("limit")) > 0) {
                    sbSql.replace(limitIdx, sbSql.length(), "");
                    sbSql = new StringBuilder("select * from (").append(sbSql).append(" ) s where s.company_id in (" + companyId + ") LIMIT ?, ?");

                } else {
                    sbSql = new StringBuilder("select * from (").append(sbSql).append(" ) s where s.company_id in (" + companyId + ")");

                }
            }

        }
        return sbSql.toString();
    }

}
