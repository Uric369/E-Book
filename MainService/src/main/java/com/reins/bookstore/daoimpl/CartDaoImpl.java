package com.reins.bookstore.daoimpl;

import com.reins.bookstore.dao.CartDao;
import com.reins.bookstore.entity.Cart;
import com.reins.bookstore.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;
@Repository
public class CartDaoImpl implements CartDao {
    @Autowired
    private CartRepository cartRepository;

//    public OrderDaoImpl(OrderRepository orderRepository) {
//        this.orderRepository = orderRepository;
//    }

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PersistenceContext
    private EntityManager entityManager;

    private static int cartId = 4;


    @Override
    public void addCart(Cart cart) {
        String sql = "insert into cart (id,userId, bookId, bookname, bookcover, amount, unit_price, status) values (?,?, ?, ?, ?, ?, ?, ?)";
        Object[] params = {cartId,cart.getUserId(), cart.getBookId(), cart.getBookname(), cart.getBookcover(), cart.getAmount(), cart.getPrice(), cart.getStatus()};
        cartId++;
        jdbcTemplate.update(sql, params);
    }

    @Override
    @Transactional
    public void removeCartsByUser(Integer userId) {
        Query query = entityManager.createQuery("DELETE FROM Cart c WHERE c.userId = :userId");
        query.setParameter("userId", userId);
        query.executeUpdate();
    }

}
