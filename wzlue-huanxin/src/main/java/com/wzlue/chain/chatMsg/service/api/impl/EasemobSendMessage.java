package com.wzlue.chain.chatMsg.service.api.impl;


import com.wzlue.chain.chatMsg.service.api.SendMessageAPI;
import com.wzlue.chain.chatMsg.service.comm.EasemobAPI;
import com.wzlue.chain.chatMsg.service.comm.OrgInfo;
import com.wzlue.chain.chatMsg.service.comm.ResponseHandler;
import com.wzlue.chain.chatMsg.service.comm.TokenUtil;
import io.swagger.client.ApiException;
import io.swagger.client.api.MessagesApi;
import io.swagger.client.model.Msg;

public class EasemobSendMessage implements SendMessageAPI {
    private ResponseHandler responseHandler = new ResponseHandler();
    private MessagesApi api = new MessagesApi();
    @Override
    public Object sendMessage(final Object payload) {
        return responseHandler.handle(new EasemobAPI() {
            @Override
            public Object invokeEasemobAPI() throws ApiException {
                return api.orgNameAppNameMessagesPost(OrgInfo.ORG_NAME,OrgInfo.APP_NAME, TokenUtil.getAccessToken(), (Msg) payload);
            }
        });
    }
}
