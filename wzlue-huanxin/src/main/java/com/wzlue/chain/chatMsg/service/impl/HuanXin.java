package com.wzlue.chain.chatMsg.service.impl;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.wzlue.chain.chatMsg.entity.RegUser;
import com.wzlue.chain.chatMsg.service.api.impl.EasemobIMUsers;
import io.swagger.client.model.RegisterUsers;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


/**
 * Created by jiangNan on 2018/3/28.
 */
public class HuanXin {
    private static final Gson gson = new GsonBuilder().serializeNulls().create();

    private final static EasemobIMUsers easemobIMUsers = new EasemobIMUsers();

    public static void main(String[] args){
        //添加IM人员
        RegUser regUser = new RegUser();
        regUser.setUsername("hjw");
        regUser.setPassword("1");
        regUser.setNickname("hhh");
        reg(regUser);


    }
    public static void reg(RegUser regUser){
        RegisterUsers registerUsers = new RegisterUsers();
        io.swagger.client.model.User p = new io.swagger.client.model.User().username(regUser.getUsername()).password(regUser.getPassword());
        registerUsers.add(p);
        Object result = easemobIMUsers.createNewIMUserSingle(registerUsers);
    }


}
