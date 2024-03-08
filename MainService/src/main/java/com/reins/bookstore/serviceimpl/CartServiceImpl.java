package com.reins.bookstore.serviceimpl;

import com.reins.bookstore.dao.CartDao;
import com.reins.bookstore.entity.Order;
import com.reins.bookstore.entity.CartDto;
import com.reins.bookstore.repository.CartRepository;
import com.reins.bookstore.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import com.reins.bookstore.entity.Cart;
import org.springframework.stereotype.Service;
import com.reins.bookstore.dao.CartDao;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    private CartRepository cartRepository;

    @Override
    public List<Cart> getCartsByUser(Integer userId) {
        return cartRepository.findByUserId(userId);
    }

    @Autowired
    private CartDao cartDao;

    @Override
    public void addCart(CartDto cartDto) {
        Cart cart = new Cart(
                null,
                cartDto.getUserId(),
                cartDto.getBookId(),
                cartDto.getBookname(),
                cartDto.getBookcover(),
                cartDto.getAmount(),
                cartDto.getPrice(),
                0
        );
        cartDao.addCart(cart);
    }

    @Override
    public void removeCartsByUser(Integer userId) {
        cartDao.removeCartsByUser(userId);
    }
}