package com.reins.bookstore.utils.KafkaUtils;

import com.reins.bookstore.entity.NewOrderRequest;
import com.reins.bookstore.service.OrderService;
import com.reins.bookstore.utils.WebSocketUtils.WebSocket;
import com.reins.bookstore.utils.msgutils.Msg;
import com.reins.bookstore.utils.msgutils.MsgCode;
import com.reins.bookstore.utils.msgutils.MsgUtil;
import net.sf.json.JSONObject;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.serializer.ErrorHandlingDeserializer;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@Component
public class KafkaConsumer {
    @Autowired
    OrderService orderService;
    @Autowired
    KafkaTemplate<String, Msg> kafkaTemplate;

    @Autowired
    WebSocket webSocket;

//    @KafkaListener(topics = {"order"})
//    public void addOrder(ConsumerRecord<String, NewOrderRequest> record){
//        System.out.println("添加订单："+record.topic()+"-"+record.partition()+"-"+record.value());
//        Integer userId = record.value().getOrder().getUserId();
//        JSONObject jsonObject = new JSONObject();
//        jsonObject.put("userId", userId);
//        try {
//            orderService.addOrder(record.value().getOrder(), record.value().getOrderItems());
//            System.out.println("feedback：add order - success");
//            kafkaTemplate.send("orderFeedback", MsgUtil.makeMsg(MsgCode.SUCCESS, "Success to add order",jsonObject));
//        } catch (Exception e) {
//            System.out.println("Error occurred while adding order: " + e.getMessage());
//            kafkaTemplate.send("orderFeedback", MsgUtil.makeMsg(MsgCode.ERROR, "Failed to add order",jsonObject));
//        }
//    }
//
//    @KafkaListener(topics = {"orderFeedback"})
//    public void addOrderFeedback(ConsumerRecord<String, Msg> feedback) throws Exception {
//        if (feedback == null || feedback.value() == null) {
//            return;
//        }
//        Msg message = feedback.value();
//        Integer userId = message.getData().getInt("userId");
//        webSocket.sendMessageToUser(Integer.toString(userId), message);
//    }


}

