package com.wzlue.chain.common.handler;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.wzlue.chain.common.annotation.JsonObject;
import org.apache.commons.lang.StringUtils;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.Map;

public class JsonObjectArgResolverHandler implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter methodParameter) {
        return methodParameter.hasParameterAnnotation(JsonObject.class);
    }

    @Override
    public Object resolveArgument(MethodParameter methodParameter,
                                  ModelAndViewContainer modelAndViewContainer, NativeWebRequest nativeWebRequest,
                                  WebDataBinderFactory webDataBinderFactory) throws Exception {
        try {
            JSONObject para = getRequestInfo(nativeWebRequest);
            Class<?> type = methodParameter.getParameterType();
            String name = methodParameter.getParameterName();
            if (null != para && para.containsKey(name)) {
                return JSON.parseObject(para.getString(name), type);
            }
        } catch (Exception e) {
        }
        return null;
    }


    private JSONObject getRequestInfo(NativeWebRequest webRequest) throws IOException {
        JSONObject para = new JSONObject();
        HttpServletRequest httpServletRequest =
                (HttpServletRequest) webRequest.getNativeRequest(HttpServletRequest.class);
        String method = httpServletRequest.getMethod();
        if (!method.equals("GET") && !method.equals("DELETE")) {

            if (null != httpServletRequest.getAttribute("para")) {
                try {
                    para = JSON.parseObject(httpServletRequest.getAttribute("para").toString());
                } catch (Exception e) {
                }
            } else {
                StringBuilder buffer = new StringBuilder();
                BufferedReader reader = httpServletRequest.getReader();
                String line;
                while ((line = reader.readLine()) != null) {
                    buffer.append(line);
                }
                httpServletRequest.setAttribute("para", buffer.toString());

                try {
                    para = JSON.parseObject(buffer.toString());
                } catch (Exception e) {
                }
            }
        } else {
            Map<String, String[]> parameterMap = webRequest.getParameterMap();
            for (Map.Entry<String, String[]> entry : parameterMap.entrySet()) {
                String key = entry.getKey();
                String values = StringUtils.join(entry.getValue());
                para.put(key, values);
            }
        }
        return para;
    }

}