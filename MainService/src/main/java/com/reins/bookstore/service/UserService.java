package com.reins.bookstore.service;

import com.reins.bookstore.entity.NewAccount;
import com.reins.bookstore.entity.User;
import com.reins.bookstore.entity.UserAuth;

import java.util.List;
import java.util.Optional;


public interface UserService {

    UserAuth checkUser(String username, String password);

    User getUserByUserId(int userId);

    UserAuth getUserAuthByUsername(String username);

    void disableUser(Integer userId);

    void unblockUser(Integer userId);
    List<UserAuth> getAllUserAuth();

    void createUser(NewAccount newAccount);

    void updateAvatar(Integer userId, String avatar);
}
