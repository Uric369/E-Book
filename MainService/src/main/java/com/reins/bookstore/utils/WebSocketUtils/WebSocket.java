package com.reins.bookstore.utils.WebSocketUtils;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.reins.bookstore.utils.msgutils.Msg;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;


import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
@ServerEndpoint("/websocket/{userId}")
public class WebSocket {
    /** 静态变量，用来记录当前在线连接数。应该把它设计成线程安全的。 */
//    private static int onlineCount = 0;


//    private static Logger logger = LoggerFactory.getLogger(WebSocket.class);
//    private static Map<Integer, WebSocket> clients = new ConcurrentHashMap<Integer, WebSocket>();
//    private Session session;
//    private Integer userId;

    private static final ConcurrentHashMap<String, Session> SESSIONS = new ConcurrentHashMap<>();

    @OnOpen
    public void onOpen(Session session, @PathParam("userId") String userId) {
        if (SESSIONS.get(userId) != null) {
            return;
        }
        SESSIONS.put(userId, session);
//        COUNT.incrementAndGet();
//        System.out.println(userId + "加入,当前在线人数:" + COUNT);
    }

    @OnClose
    public void onClose(@PathParam("userId") String userId) {
        SESSIONS.remove(userId);
//        COUNT.decrementAndGet();
//        System.out.println(userId + "退出,当前在线人数:" + COUNT);
    }

    @OnError
    public void onError(Session session, Throwable error) {
        System.out.println("session发生错误");
        error.printStackTrace();
    }

    @OnMessage
    public void onMessage(String message) {
        System.out.println("收到消息:" + message);
    }
    /**
     * 实现服务器主动推送
     */
    public void sendMessageToUser(String userId, Msg message) {
        Session session = SESSIONS.get(userId);
        sendMessage(session, message);
    }

    public boolean sendMessage(Session toSession, String message) {
        if(toSession != null){
            try{
                toSession.getBasicRemote().sendText(message);
                return true;
            }catch(IOException e){
                e.printStackTrace();
            }
        }else{
            System.out.println("对方不在线");
            return false;
        }
        return false;
    }

    public boolean sendMessage(Session toSession, Msg message) {
        if(toSession != null){
            try{
                ObjectMapper objectMapper = new ObjectMapper();
                String jsonString = objectMapper.writeValueAsString(message);
                toSession.getBasicRemote().sendText(jsonString);
                return true;
            }catch(IOException e){
                e.printStackTrace();
            }
        }else{
            System.out.println("对方不在线");
            return false;
        }
        return false;
    }
}


