package com.reins.bookstore.controller;


import ch.qos.logback.core.BasicStatusManager;
import com.reins.bookstore.entity.*;
import com.reins.bookstore.service.BookService;
import com.reins.bookstore.service.OrderService;
import com.reins.bookstore.service.UserService;
import com.reins.bookstore.utils.msgutils.Msg;
import com.reins.bookstore.utils.msgutils.MsgCode;
import com.reins.bookstore.utils.msgutils.MsgUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

//transcation
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
//@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private  OrderService orderService;


    @Autowired
    private UserService userService;

    @Autowired
    private KafkaTemplate<String, NewOrderRequest> kafkaTemplate;

    @Autowired
    private BookService bookService;

//    public OrderController(OrderService orderService) {
//        this.orderService = orderService;
//    }

    @RequestMapping("/addOrder")
    public Msg addOrder(@RequestBody NewOrderRequest request) {
        kafkaTemplate.send("order", request);
//        try {
//            orderService.addOrder(request.getOrder(), request.getOrderItems());
            return MsgUtil.makeMsg(MsgCode.SUCCESS, "Success");
//        } catch (Exception e) {
//            System.out.println("Error occurred while adding order: " + e.getMessage());
//            return MsgUtil.makeMsg(MsgCode.ERROR, "Failed to add order: " + e.getMessage());
//        }
    }

    @RequestMapping("/getOrdersByUser")
    public List<Order> getOrdersByUser(@RequestParam("userId") Integer userId){
        return userService.getUserByUserId(userId).getOrders();
    }


    @RequestMapping("/getOrderItemsByOrder")
    public List<OrderItem> getOrderItemsByOrder(@RequestParam("orderId") Integer orderId){
        return orderService.getOrderByOrderId(orderId).getOrderItems();
    }

    @RequestMapping("/getOrdersWithDetailsByUser")
    public List<OrderDTO> getOrdersWithDetailsByUser(@RequestParam("userId") Integer userId) {
        List<Order> orders = userService.getUserByUserId(userId).getOrders();
        List<OrderDTO> orderDTOs = new ArrayList<>();

        for (Order order : orders) {
            OrderDTO orderDTO = createOrderDTO(order);
//            System.out.println(orderDTO.getOrderItems());
            orderDTOs.add(orderDTO);
        }
        Collections.reverse(orderDTOs);

        return orderDTOs;
    }

    @RequestMapping("/getOrderItemsWithDetailsByOrder")
    public List<OrderItemDTO> getOrderItemsWithDetailsByOrder(@RequestParam("orderId") Integer orderId) {
        List<OrderItem> orderitems = orderService.getOrderByOrderId(orderId).getOrderItems();
        List<OrderItemDTO> orderItemDTOs = new ArrayList<>();

        for (OrderItem orderItem : orderitems) {
            OrderItemDTO orderItemDTO = new OrderItemDTO();
            Book book=bookService.findBookById(orderItem.getBookId());
            orderItemDTO.setBookId(orderItem.getBookId());
            orderItemDTO.setBookname(book.getName());
            orderItemDTO.setBookCover(book.getCover());
            orderItemDTO.setQuantity(orderItem.getAmount());
            orderItemDTO.setSubTotal(orderItem.getPrice());
            orderItemDTOs.add(orderItemDTO);
        }

        return orderItemDTOs;
    }

    private OrderDTO createOrderDTO(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setOrderId(order.getId());
        orderDTO.setTotalPrice(order.getPrice());
        orderDTO.setOrderStatus(order.getOrderStatus());
        orderDTO.setAddress(order.getAddress());
        orderDTO.setContactPhone(order.getContactPhone());
        orderDTO.setReceiver(order.getReceiver());
        orderDTO.setOrdertime(order.getOrdertime());

        List<OrderItem> orderItems = orderService.getOrderByOrderId(order.getId()).getOrderItems();
        List<OrderItemDTO> orderItemDTOs = new ArrayList<>();

        for (OrderItem orderItem : orderItems) {
            OrderItemDTO orderItemDTO = new OrderItemDTO();
            orderItemDTO.setBookId(orderItem.getBookId());
            Book book = bookService.findBookById(orderItem.getBookId());
            orderItemDTO.setBookCover(book.getCover());
            orderItemDTO.setBookname(book.getName());
            orderItemDTO.setQuantity(orderItem.getAmount());
            orderItemDTO.setSubTotal(orderItem.getPrice());

            orderItemDTOs.add(orderItemDTO);
        }

        orderDTO.setOrderItems(orderItemDTOs);
        System.out.println("whyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
        System.out.println(orderItemDTOs);
        return orderDTO;
    }



    @RequestMapping("/getUserOrdersByBookName")
    public List<OrderDTO> getOrdersByBookName(@RequestParam("userId") Integer userId,@RequestParam("subString") String subString) {
//        List<Book> books = bookService.getBooks();
//        List<Book> filteredBooks = books.stream()
//                .filter(book -> book.getName().contains(subString))
//                .collect(Collectors.toList());
        List<Order> orders = getOrdersByUser(userId);
        List<OrderDTO> orderDTOS=new ArrayList<>();

        for (Order order : orders) {
            List<OrderItem> orderItems = order.getOrderItems();
            boolean containsSubstring = false;

            for (OrderItem item : orderItems) {
                if (item.getBook().getName().toLowerCase().contains(subString.toLowerCase())) {
                    System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                    System.out.println(item.getBook().getName().toLowerCase());
                    System.out.println(subString);
                    System.out.println(item.getBook().getName().toLowerCase().contains(subString.toLowerCase()));
                    containsSubstring = true;
                    break;
                }
            }

            if (containsSubstring) {
                OrderDTO orderDTO = createOrderDTO(order);
                orderDTOS.add(orderDTO);
            }

        }

        Collections.reverse(orderDTOS);
        return orderDTOS;
    }
// The 'filteredOrders' list will now contain only the orders that have at least one orderItem with a bookname containing the substring.

    @RequestMapping("/getUserOrdersByTime")
    public List<OrderDTO> getOrdersByBookName(@RequestParam("userId") Integer userId,
                                              @RequestParam("startTime") String startTime,
                                              @RequestParam("endTime")String endTime) {
//        List<Book> books = bookService.getBooks();
//        List<Book> filteredBooks = books.stream()
//                .filter(book -> book.getName().contains(subString))
//                .collect(Collectors.toList());
        List<OrderDTO> orderDTOS=new ArrayList<>();

        List<Order> validOrders = orderService.getOrdersByUserId(userId).stream()
                .filter(order -> order.getOrdertime().compareTo(startTime)>=0 && order.getOrdertime().compareTo(endTime)<=0)
                .collect(Collectors.toList());
        for(Order order:validOrders){
            OrderDTO orderDTO=createOrderDTO(order);
            orderDTOS.add(orderDTO);
        }
        Collections.reverse(orderDTOS);
        return orderDTOS;
    }




    @RequestMapping("/getAllOrdersByBookName")
    public List<OrderDTO> getAllOrdersByBookName(@RequestParam("subString") String subString) {
        List<Order> orders = orderService.getOrders();
        List<OrderDTO> orderDTOS=new ArrayList<>();

        for (Order order : orders) {
            List<OrderItem> orderItems = order.getOrderItems();
            boolean containsSubstring = false;

            for (OrderItem item : orderItems) {
                if (item.getBook().getName().toLowerCase().contains(subString.toLowerCase())) {
                    containsSubstring = true;
                    break;
                }
            }

            if (containsSubstring) {
                OrderDTO orderDTO = createOrderDTO(order);
                orderDTOS.add(orderDTO);
            }

        }

        Collections.reverse(orderDTOS);
        return orderDTOS;
    }




    @RequestMapping("/getAllOrdersByTime")
    public List<OrderDTO> getAllOrdersByBookName(
                                              @RequestParam("startTime") String startTime,
                                              @RequestParam("endTime")String endTime) {

        List<OrderDTO> orderDTOS=new ArrayList<>();

        List<Order> validOrders = orderService.getOrders().stream()
                .filter(order -> order.getOrdertime().compareTo(startTime)>=0 && order.getOrdertime().compareTo(endTime)<=0)
                .collect(Collectors.toList());
        for(Order order:validOrders){
            OrderDTO orderDTO=createOrderDTO(order);
            orderDTOS.add(orderDTO);
        }
        Collections.reverse(orderDTOS);
        return orderDTOS;
    }

    @RequestMapping("/getAllOrders")
    public List<OrderDTO> getAllOrders() {

        List<OrderDTO> orderDTOS=new ArrayList<>();

        List<Order> validOrders = orderService.getOrders();
        for(Order order:validOrders){
            OrderDTO orderDTO=createOrderDTO(order);
            orderDTOS.add(orderDTO);
        }
        Collections.reverse(orderDTOS);
        return orderDTOS;
    }

}