package com.wzlue.chain.web.controller.wechat;

import net.sf.json.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArraySet;

/**
 * 虽然@Component默认是单例模式的，但是spring boot 还是会为每个websocket连接初始化一个bean,所以这里使用一个静态的set保存spring boot
 * <p>
 * 创建的bean--MyWebSocket.
 *
 * @author Angel -- 守护天使
 * @version v.0.1
 * @date 2017年11月7日
 * websocket连接点映射.
 */
@ServerEndpoint(value = "/websocket/{params}")
@Component
public class MyWebSocket {

    /**
     * 用来存储每个客户端对应的MyWebSocket对象.
     */
    private static CopyOnWriteArraySet<MyWebSocket> webSocketSet = new CopyOnWriteArraySet<MyWebSocket>();
    /**
     * 用来记录sessionId和该session之间的绑定关系.
     */
    private static Map<String, Session> map = new HashMap<String, Session>();
    /**
     * 当前会话的session.
     */
    private Session session;
    /**
     * 昵称
     */
    private String nickname;

    /**
     * 成功建立连接调用的方法.
     */
    @OnOpen
    public void onOpen(@PathParam("params") String params, Session session) {
        this.nickname=params;
        this.session = session;
        map.put(session.getId(), session);
        //加入set中.
        webSocketSet.add(this);
        //this.session.getAsyncRemote().sendText(nickname + "上线了,（我的频道号是" + session.getId() + "）");
    }

    /**
     * 连接关闭调用的方法.
     */
    @OnClose
    public void onClose(Session session) {
        //从set中移除.
        webSocketSet.remove(this);
        map.remove(session.getId());
    }

    /**
     * 收到客户端消息后调用的方法.
     */
    @OnMessage
    public void onMessage(String message, Session session) {

        //message 不是普通的string ，而是我们定义的SocketMsg json字符串.

        //SocketMsg socketMsg = new ObjectMapper().readValue(message, SocketMsg.class);
        //broadcast(message);

			/*//单聊.
            if(socketMsg.getType() == 1){
				
				//单聊：需要找到发送者和接受者即可.
				socketMsg.setFromUser(session.getId());//发送者.
				//socketMsg.setToUser(toUser);//这个是由客户端进行设置.
				Session fromSession = map.get(socketMsg.getFromUser());
				Session toSession = map.get(socketMsg.getToUser());
				if(toSession != null){
					//发送消息.
					fromSession.getAsyncRemote().sendText(+socketMsg.getMsg());
					toSession.getAsyncRemote().sendText(+"："+socketMsg.getMsg());
				}else{
					fromSession.getAsyncRemote().sendText("系统消息：对方不在线或者您输入的频道号有误");
				}
			}else {
				//群发给每个客户端.
				broadcast(socketMsg);
			}*/


    }

    /**
     * 发生错误时调用.
     */
    public void onError(Session session, Throwable error) {
        System.out.println("发生错误");
        error.printStackTrace();
    }

    /**
     * 群发的方法.
     *
     * @param
     */
    private void broadcast(String socketMsg,String nickname) {
        for (MyWebSocket item : webSocketSet) {
            //发送消息.
            if(item.nickname.equals(nickname)){
                item.session.getAsyncRemote().sendText(socketMsg);
            }
        }
    }

    /**
     * 这个方法与上面几个方法不一样。没有用注解，是根据自己需要添加的方法。
     *
     * @param message
     * @throws IOException
     */
    public void sendMessage(String message,String nickname) throws IOException {
        this.broadcast(message,nickname);
        //this.session.getAsyncRemote().sendText(message);
    }

}
