package com.reins.bookstore.serviceimpl;


import com.reins.bookstore.dao.OrderDao;
import com.reins.bookstore.entity.*;
import com.reins.bookstore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {
@Autowired
    private OrderDao orderDao;


    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class, isolation = Isolation.READ_COMMITTED)
    public void addOrder(NewOrder newOrder, List<NewOrderItem> newOrderItems) {
        Order order=new Order();
//        int result = 10/0;


        LocalDateTime currentTime = LocalDateTime.now();
        String str=currentTime.toString().replace("T", " ");
        str= (str.length() > 19) ? str.substring(0, 19) : str;
        newOrder.setOrdertime(str);
        order.setOrderStatus(0);
        order.setOrdertime(newOrder.getOrdertime());
        order.setAddress(newOrder.getAddress());
        order.setReceiver(newOrder.getReceiver());
        order.setPrice(newOrder.getPrice());
        order.setContactPhone(newOrder.getContactPhone());
        order.setUserId(newOrder.getUserId());
        System.out.println("order");
        System.out.println(order);
        Order savedOrder = orderDao.saveOrder(order);


        for (NewOrderItem newOrderItem : newOrderItems) {
            OrderItem orderItem=new OrderItem();
            orderItem.setOrderId(savedOrder.getId());
            orderItem.setPrice(newOrderItem.getSubTotal());
            orderItem.setBookId(newOrderItem.getBookId());
            orderItem.setAmount(newOrderItem.getQuantity());
            orderItem.setUserId(newOrder.getUserId());
            System.out.println("orderItem");
            System.out.println(orderItem);
            orderDao.saveOrderItem(orderItem);
        }
    }
    @Override
    public List<Order> getOrdersByUserId(Integer userId) {
        return orderDao.findOrdersByUserId(userId);
    }

    @Override
    public List<Order> findByOrderStatusNotAndOrderTimeBetween(int orderStatus, String startTime, String endTime) {
        return orderDao.findByOrderStatusNotAndOrdertimeBetween(orderStatus, startTime, endTime);
    }
    @Override
    public Order getOrderByOrderId(int orderId) {
        return orderDao.findOrderByOrderId(orderId);
    }


    @Override
    public List<Order> getOrders() {
        return orderDao.getOrders();
    }
}
