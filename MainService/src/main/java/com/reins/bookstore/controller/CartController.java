package com.reins.bookstore.controller;

import com.reins.bookstore.entity.Cart;
import com.reins.bookstore.entity.CartDto;
import com.reins.bookstore.service.CartService;
import com.reins.bookstore.utils.msgutils.Msg;
import com.reins.bookstore.utils.msgutils.MsgCode;
import com.reins.bookstore.utils.msgutils.MsgUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController

public class CartController {
    @Autowired
    private CartService cartService;

    @RequestMapping("/getCartsByUser")
    public List<Cart> getCartsByUser(@RequestParam("userId") Integer userId) {
        return cartService.getCartsByUser(userId);
    }
    @RequestMapping("/addCart")
    public Msg addCart( CartDto cartDto) {
        try {
            cartService.addCart(cartDto);
            return MsgUtil.makeMsg(MsgCode.SUCCESS, "success to add to cart");
        } catch (Exception e) {
            System.out.println("Error occurred while adding cart: " + e.getMessage());
            return MsgUtil.makeMsg(MsgCode.ERROR, "failed to add cart: " + e.getMessage());
        }
    }

    @RequestMapping("/removeCartsByUser")
    public Msg removeCartsByUser(@RequestParam("userId") Integer userId) {
        try {
            cartService.removeCartsByUser(userId);
            return MsgUtil.makeMsg(MsgCode.SUCCESS, "success to remove all carts by user");
        } catch (Exception e) {
            System.out.println("Error occurred while removing all carts by user: " + e.getMessage());
            return MsgUtil.makeMsg(MsgCode.ERROR, "failed to remove all carts by user: " + e.getMessage());
        }

    }

}
