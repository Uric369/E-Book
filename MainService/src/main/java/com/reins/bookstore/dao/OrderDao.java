package com.reins.bookstore.dao;

import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.Order;
import com.reins.bookstore.entity.OrderItem;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderDao {
//    void addOrder(Order order);
    List<Order> findOrdersByUserId(Integer userId);
    Order findOrderByOrderId(Integer orderId);

    Order saveOrder(Order order);
    void saveOrderItem(OrderItem orderItem);
    List<Order> getOrders();

    List<Order> findByOrderStatusNotAndOrdertimeBetween(int orderStatus, String startTime, String endTime);

}
