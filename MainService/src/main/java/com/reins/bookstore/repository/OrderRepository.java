package com.reins.bookstore.repository;

import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.Order;
import com.reins.bookstore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Integer> {

    @Query("select b from Order b")
    List<Order> getOrders();
    List<Order> findAllByUserId(Integer userId);
    Order findById(int orderId);

    Order findOrderById(int orderId);

    List<Order> findByOrderStatusNotAndOrdertimeBetween(int orderStatus, String startTime, String endTime);
}
