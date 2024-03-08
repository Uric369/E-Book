package com.reins.bookstore.dao;

import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.Cart;
import com.reins.bookstore.entity.Order;

import java.util.List;

public interface CartDao {
//    List<Cart> getCartsByUser(Integer userId);
void addCart(Cart cart);

    void removeCartsByUser(Integer userId);
}
