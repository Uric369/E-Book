package com.reins.bookstore.controller;

import com.reins.bookstore.entity.*;
import com.reins.bookstore.service.BookService;
import com.reins.bookstore.service.OrderService;
import com.reins.bookstore.service.UserService;
import com.reins.bookstore.utils.msgutils.Msg;
import com.reins.bookstore.utils.msgutils.MsgCode;
import com.reins.bookstore.utils.msgutils.MsgUtil;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;


@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;
    @Autowired
    private OrderService orderService;

    @RequestMapping("/checkUser")
    public UserAuth checkUser(@RequestParam("username") String username,@RequestParam("password") String password){
        return userService.checkUser(username, password);
    }

    @RequestMapping("getUserByUserId")
    public User getUserByUserId(@RequestParam("userId") Integer userId) {
        User user = userService.getUserByUserId(userId);
        return user;
    }

    @RequestMapping("/getAllUserAuth")
    public List<UserAuth> getAllUserAuth() {
        return userService.getAllUserAuth();
    }

    @RequestMapping("/disableUser")
    public Msg disableUser(@RequestParam("userId") Integer userId) {
        try {
            userService.disableUser(userId);
            return MsgUtil.makeMsg(MsgCode.SUCCESS, "success to disable user");
        } catch (Exception e) {
            System.out.println("Error occurred while disabling user: " + e.getMessage());
            return MsgUtil.makeMsg(MsgCode.ERROR, "failed to disable user: " + e.getMessage());
        }
    }

    @RequestMapping("/unblockUser")
    public Msg unblockUser(@RequestParam("userId") Integer userId) {
        try {
            userService.unblockUser(userId);
            return MsgUtil.makeMsg(MsgCode.SUCCESS, "success to unblock user");
        } catch (Exception e) {
            System.out.println("Error occurred while unblocking user: " + e.getMessage());
            return MsgUtil.makeMsg(MsgCode.ERROR, "failed to unblock user: " + e.getMessage());
        }
    }

    @RequestMapping("/createAccount")
    public Msg createAccount(@RequestBody NewAccount newaccount) {
        try {
            if(userService.getUserAuthByUsername(newaccount.getUsername())!=null){
                return MsgUtil.makeMsg(MsgCode.ERROR, "failed to create an account: duplicate username!");
            }
            userService.createUser(newaccount);
            return MsgUtil.makeMsg(MsgCode.SUCCESS, "success to create a new account");
        } catch (Exception e) {
            System.out.println("Error occurred while creating an account: " + e.getMessage());
            return MsgUtil.makeMsg(MsgCode.ERROR, "failed to create an account: " + e.getMessage());
        }
    }

    @RequestMapping("/UserSpendingList")
    public List<UserBySpending> getUserBySpendingList(String startTime, String endTime) {
        List<UserBySpending> userBySpendingList = new ArrayList<>();
        List<UserAuth> validUserAuth=userService.getAllUserAuth().stream()
                .filter(userAuth -> userAuth.getUserType() == 1)
                .collect(Collectors.toList());
        for(UserAuth vUserAuth:validUserAuth){
            UserBySpending userBySpending = new UserBySpending();
            userBySpending.setUserId(vUserAuth.getUserId());
            List<Order> validOrders = orderService.getOrdersByUserId(vUserAuth.getUserId()).stream()
                    .filter(order -> order.getOrderStatus() != 2)
                    .filter(order -> order.getOrdertime().compareTo(startTime)>=0 && order.getOrdertime().compareTo(endTime)<=0)
                    .collect(Collectors.toList());
            Double spending = 0.00; // 初始化总消费额度为 0

            for (Order order : validOrders) {
                spending = spending+order.getPrice(); // 将订单价格累加到总消费额度
            }

            userBySpending.setSpending(spending); // 设置用户的总消费额度
            User user=userService.getUserByUserId(vUserAuth.getUserId());
            userBySpending.setUsername(user.getUsername());
            userBySpending.setAvatar(user.getAvatar());
            userBySpendingList.add(userBySpending);
        }

        userBySpendingList.sort(Comparator.comparing(UserBySpending::getSpending).reversed());

        return userBySpendingList;
    }

    @RequestMapping("/PurchaseStatsByUser")
    public List<PchsStasByBook> getPurchaseStatsByUser(Integer userId,String startTime, String endTime) {
        List<PchsStasByBook> pchsStasByBooks=new ArrayList<>();
        User user=userService.getUserByUserId(userId);
        List<Order> validOrders = orderService.getOrdersByUserId(userId).stream()
                .filter(order -> order.getOrderStatus() != 2)
                .filter(order -> order.getOrdertime().compareTo(startTime)>=0 && order.getOrdertime().compareTo(endTime)<=0)
                .collect(Collectors.toList());
        Map<Integer, Integer> bookCount = new HashMap<>();


        for (Order order : validOrders) {
            List<OrderItem> orderItems=order.getOrderItems();
            for (OrderItem orderItem : orderItems) {
                // Get the bookId from the OrderItem
                int bookId = orderItem.getBookId();
                // Increment the count for the book in the map
                bookCount.put(bookId, bookCount.getOrDefault(bookId, 0) + orderItem.getAmount());
            }
        }

        for (Map.Entry<Integer, Integer> entry : bookCount.entrySet()) {
            int bookId = entry.getKey();
            int count = entry.getValue();

            // Find the book by its ID
            Book book = bookService.findBookById(bookId);

            if (book != null) {
                // Create a PchsStasByBook object with book details and count
                PchsStasByBook pchsStasByBook = new PchsStasByBook();
                pchsStasByBook.setBookname(book.getName());
                pchsStasByBook.setBookcover(book.getCover());
                pchsStasByBook.setBookId(bookId);
                pchsStasByBook.setTotal(count);

                // Add the PchsStasByBook object to the result list
                pchsStasByBooks.add(pchsStasByBook);
            }
        }

// Sort the list in descending order based on the count
        pchsStasByBooks.sort(Comparator.comparing(PchsStasByBook::getTotal).reversed());

        return pchsStasByBooks;
    }


    @RequestMapping("/PurchaseStatsByUser2")
    public PurchaseStats getPurchaseStatsByUser2(Integer userId,String startTime, String endTime) {
        List<Order> validOrders = orderService.getOrdersByUserId(userId).stream()
                .filter(order -> order.getOrderStatus() != 2)
                .filter(order -> order.getOrdertime().compareTo(startTime)>=0 && order.getOrdertime().compareTo(endTime)<=0)
                .collect(Collectors.toList());
        PurchaseStats purchaseStats=new PurchaseStats();
        int count=0;
        Double price=0.00;

        for (Order order : validOrders) {
            price=price+order.getPrice();
            List<OrderItem> orderItems=order.getOrderItems();
            for (OrderItem orderItem : orderItems) {
                count=count+orderItem.getAmount();
            }
        }

        purchaseStats.setUserId(userId);
        purchaseStats.setSumSpending(price);
        purchaseStats.setSumBooks(count);

        return purchaseStats;
    }

    @RequestMapping("/updateAvatar")
    public Msg updateAvatar(Integer userId, String avatar) {
        try{
            userService.updateAvatar(userId, avatar);
            return MsgUtil.makeMsg(MsgCode.SUCCESS, "success to update avatar");
        } catch (Exception e) {
            System.out.println("Error occurred while updating avatar: " + e.getMessage());
            return MsgUtil.makeMsg(MsgCode.ERROR, "failed to update avatar: " + e.getMessage());
        }
    }

}
