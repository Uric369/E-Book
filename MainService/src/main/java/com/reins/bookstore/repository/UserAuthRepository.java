package com.reins.bookstore.repository;

import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface UserAuthRepository extends JpaRepository<UserAuth,String>{
UserAuth findByUserId(Integer userId);

UserAuth findUserAuthByUsername(String username);
    @Query(value = "from UserAuth where username = :username and password = :password")
    UserAuth checkUser(@Param("username") String username, @Param("password") String password);


}
