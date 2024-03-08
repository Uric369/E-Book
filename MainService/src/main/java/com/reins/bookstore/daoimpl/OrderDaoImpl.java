package com.reins.bookstore.daoimpl;

import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.OrderItem;
import com.reins.bookstore.repository.BookRepository;
import com.reins.bookstore.repository.OrderItemRepository;
import com.reins.bookstore.repository.OrderRepository;
import com.reins.bookstore.dao.OrderDao;
import com.reins.bookstore.entity.Order;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public class OrderDaoImpl implements OrderDao {

    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private  OrderRepository orderRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

//    public OrderDaoImpl(OrderRepository orderRepository) {
//        this.orderRepository = orderRepository;
//    }

    @Override
    public List<Order> findOrdersByUserId(Integer userId) {
        return orderRepository.findAllByUserId(userId);
    }

    @Override
    public Order findOrderByOrderId(Integer orderId) {
        return orderRepository.findOrderById(orderId);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor=Exception.class)
    public Order saveOrder(Order order) {
        order.setOrderStatus(0);
        return orderRepository.save(order);
    }

//    @Override
//    public void saveOrderItem(OrderItem orderItem) {
//        orderItemRepository.save(orderItem);
//    }

    @Override
    public List<Order> getOrders() {
        return orderRepository.getOrders();
    }
    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor=Exception.class)
    public void saveOrderItem(OrderItem orderItem) {
        entityManager.persist(orderItem);
        updateBookStock(orderItem.getBookId(),orderItem.getAmount());
    }

    public void updateBookStock(Integer bookId, Integer amount) {
        Optional<Book> optional = bookRepository.findById(bookId);
//        int result = 10/0;
        if (optional.isPresent()) {
            Book book = optional.get();
            int currentStock=book.getStock()-amount;
            if(currentStock<=0){
                book.setStock(0);
                book.setStatus(1);
            }
            else book.setStock(currentStock);
            bookRepository.save(book);
        } else {
            throw new IllegalArgumentException("Book not found");
        }
    }

    @Override
    public List<Order> findByOrderStatusNotAndOrdertimeBetween(int orderStatus, String startTime, String endTime) {
        return orderRepository.findByOrderStatusNotAndOrdertimeBetween(orderStatus, startTime, endTime);
    }
}


