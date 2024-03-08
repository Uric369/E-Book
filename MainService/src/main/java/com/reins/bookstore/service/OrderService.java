package com.reins.bookstore.service;

import com.reins.bookstore.entity.*;

import java.time.LocalDateTime;
import java.util.List;


public interface OrderService {
    List<Order> getOrders();
    List<Order> getOrdersByUserId(Integer userId);

//    void addOrder(OrderDto orderDto);

     void addOrder(NewOrder newOrder, List<NewOrderItem> newOrderItems);
    Order getOrderByOrderId(int orderId);

    List<Order> findByOrderStatusNotAndOrderTimeBetween(int orderStatus, String startTime, String endTime);
}

