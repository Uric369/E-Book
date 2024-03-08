package com.reins.bookstore.repository;

import com.reins.bookstore.entity.User;
import com.reins.bookstore.entity.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,String> {
    User findByUserId(int userId);
}
