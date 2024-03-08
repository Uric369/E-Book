package com.reins.bookstore.dao;

import com.reins.bookstore.entity.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface UserDao {

    UserAuth checkUser(String username, String password);

    User findByUserId(int userId);

    List<UserAuth> getAllUserAuth();

    UserAuth  getUserAuthByUsername(String username);
    void disableUser(Integer userId);

    void unblockUser(Integer userId);

    void saveUser(NewAccount newAccount);

    void updateAvatar(Integer userId, String avatar);
}
