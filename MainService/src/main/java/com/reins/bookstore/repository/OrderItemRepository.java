package com.reins.bookstore.repository;

import com.reins.bookstore.entity.Order;
import com.reins.bookstore.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
    // You can define additional repository methods if required
}

