package com.reins.bookstore.service;

import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.Cart;
import com.reins.bookstore.entity.CartDto;

import java.util.List;


public interface CartService {
    List<Cart> getCartsByUser(Integer userId);
    void addCart(CartDto cartDto);

    void removeCartsByUser(Integer userId);
}
