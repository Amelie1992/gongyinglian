package com.wzlue.chain.chatMsg.service;

import com.wzlue.chain.chatMsg.entity.ChatMessageEntity;
import com.wzlue.chain.chatMsg.entity.RegUser;
import com.wzlue.chain.common.base.Query;

import java.util.List;
import java.util.Map;

/**
 * 
 * 
 * @author 
 * @email 
 * @date 2018-09-11 16:00:44
 */
public interface ChatMessageService {

	//单个用户注册IM
	void createNewIMUser(String username,String nikename);
	//修改用户昵称
	void updateNikeName(String username,String nikename);

	//删除单个用户
	void deleteImUserByUserName(String username);
	//删除多个用户
	void deleteImUserByUserNames(String[] username);
	//临时聊天列表
	List<Map> querytemporaryList(Map query);
	//新 最近联系人列表
    List<Map> queryRecentContacts(Map query);
	//临时聊天列表数量
	int querytemporaryTotal(Map query);

	ChatMessageEntity queryObject(Integer id);
	
	List<ChatMessageEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(ChatMessageEntity chatMessage);
	
	void update(ChatMessageEntity chatMessage);
	
	void delete(Integer id);
	
	void deleteBatch(Integer[] ids);

    List<Map> querytemporaryToUserList(Query query);

    int insertChat(ChatMessageEntity chat);
}
