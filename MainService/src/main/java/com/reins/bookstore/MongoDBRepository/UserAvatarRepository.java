package com.reins.bookstore.MongoDBRepository;

import com.reins.bookstore.entity.UserAvatar;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAvatarRepository extends MongoRepository<UserAvatar,String> {
    UserAvatar findUserAvatarByUserId(Integer userId);
}


