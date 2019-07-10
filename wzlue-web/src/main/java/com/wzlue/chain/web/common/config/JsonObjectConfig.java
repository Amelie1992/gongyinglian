package com.wzlue.chain.web.common.config;


import com.wzlue.chain.common.handler.JsonObjectArgResolverHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.List;

/**
 * 自定义解析器 配置
 */
@Configuration
public class JsonObjectConfig extends WebMvcConfigurerAdapter {
    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        super.addArgumentResolvers(argumentResolvers);
        argumentResolvers.add(new JsonObjectArgResolverHandler());
    }
}
