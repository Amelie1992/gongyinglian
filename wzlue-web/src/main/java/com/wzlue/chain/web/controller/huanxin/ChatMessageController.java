
package com.wzlue.chain.web.controller.huanxin;

import com.wzlue.chain.chatMsg.entity.ChatMessageEntity;
import com.wzlue.chain.chatMsg.service.ChatMessageService;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
import com.wzlue.chain.web.controller.sys.AbstractController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;




/**
 * 
 * 
 * @author 
 * @email 
 * @date 2018-09-11 16:00:44
 */
@RestController
@RequestMapping("/websocket/chatmessage")
public class ChatMessageController extends AbstractController{
	@Autowired
	private ChatMessageService chatMessageService;

	/**
	 * 临时会话列表
	 */
	@RequestMapping("/temporaryConversation")
		public R temporaryConversation(@RequestBody Map<String, Object> params){
		//查询列表数据
		Query query = new Query(params);
//		List<Map> list = chatMessageService.querytemporaryList(query);
        //最近联系人列表
        List<Map> list = chatMessageService.queryRecentContacts(query);
		/*String toUser = String.valueOf(params.get("toUser"));
		if(toUser != null){
			List<Map> toUserList = chatMessageService.querytemporaryToUserList(query);
			list.addAll(toUserList);
		}*/
//		int total = chatMessageService.querytemporaryTotal(query);
		return R.page(list, list.size());
	}


	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestBody Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<ChatMessageEntity> chatMessageList = chatMessageService.queryList(query);
		int total = chatMessageService.queryTotal(query);
		
		return R.page(chatMessageList,total);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
//	@RequiresPermissions("mapper.chatMsg:chatmessage:info")
	public R info(@PathVariable("id") Integer id){
		ChatMessageEntity chatMessage = chatMessageService.queryObject(id);
		
		return R.ok().put("chatMessage", chatMessage);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
//	@RequiresPermissions("mapper.chatMsg:chatmessage:save")
	public R save(@RequestBody ChatMessageEntity chatMessage){
		chatMessageService.save(chatMessage);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
//	@RequiresPermissions("mapper.chatMsg:chatmessage:update")
	public R update(@RequestBody ChatMessageEntity chatMessage){
		chatMessageService.update(chatMessage);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
//	@RequiresPermissions("mapper.chatMsg:chatmessage:delete")
	public R delete(@RequestBody Integer[] ids){
		chatMessageService.deleteBatch(ids);
		
		return R.ok();
	}
	
}
