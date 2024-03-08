package com.reins.bookstore.serviceimpl;

import com.reins.bookstore.dao.OrderDao;
import com.reins.bookstore.dao.UserDao;
import com.reins.bookstore.entity.*;
import com.reins.bookstore.repository.OrderItemRepository;
import com.reins.bookstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private OrderDao orderDao;

@Autowired
private OrderItemRepository orderItemRepository;

    @Override
    public UserAuth checkUser(String username, String password){
        return userDao.checkUser(username,password);
    }


    @Override
    public List<UserAuth> getAllUserAuth() {
        return userDao.getAllUserAuth();
    }
    @Override
    public User getUserByUserId(int userId) {
        return userDao.findByUserId(userId);
    }

    @Override
//    @Transactional
    public void disableUser(Integer userId) {
        userDao.disableUser(userId);
    }

    @Override
//    @Transactional
    public void unblockUser(Integer userId) {
        userDao.unblockUser(userId);
    }

    @Override
    public void createUser(NewAccount newAccount) {


        // Save UserAuth and User objects
        userDao.saveUser(newAccount);

    }
    @Override
    public UserAuth  getUserAuthByUsername(String username){
        return userDao.getUserAuthByUsername(username);
    }

    @Override
    public void updateAvatar(Integer userId, String avatar){
        userDao.updateAvatar(userId,avatar);
    }
}

