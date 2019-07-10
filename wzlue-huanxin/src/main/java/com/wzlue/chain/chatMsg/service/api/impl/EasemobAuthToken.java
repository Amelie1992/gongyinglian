package com.wzlue.chain.chatMsg.service.api.impl;


import com.wzlue.chain.chatMsg.service.api.AuthTokenAPI;
import com.wzlue.chain.chatMsg.service.comm.TokenUtil;

public class EasemobAuthToken implements AuthTokenAPI {

	@Override
	public Object getAuthToken(){
		return TokenUtil.getAccessToken();
	}
}
