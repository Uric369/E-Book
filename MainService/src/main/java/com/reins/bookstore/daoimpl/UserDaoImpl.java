package com.reins.bookstore.daoimpl;

import com.reins.bookstore.MongoDBRepository.UserAvatarRepository;
import com.reins.bookstore.constant.Constant;
import com.reins.bookstore.dao.UserDao;
import com.reins.bookstore.entity.*;
import com.reins.bookstore.repository.UserAuthRepository;
import com.reins.bookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.util.List;
import java.util.Optional;



@Repository
public class UserDaoImpl implements UserDao {

    @Autowired
    UserAuthRepository userAuthRepository;

    @Autowired
    UserAvatarRepository userAvatarRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public UserAuth checkUser(String username, String password){

        return userAuthRepository.checkUser(username,password);
    }

    @Override
    public void disableUser(Integer userId) {
        UserAuth userAuth = userAuthRepository.findByUserId(userId);
        if (userAuth!=null) {
            userAuth.setUserStatus(1);
            userAuthRepository.save(userAuth);
        } else {
            throw new IllegalArgumentException("UserAuth not found");
        }
    }

    @Override
    public void unblockUser(Integer userId) {
        UserAuth userAuth = userAuthRepository.findByUserId(userId);
        if (userAuth!=null) {
            userAuth.setUserStatus(0);
            userAuthRepository.save(userAuth);
        } else {
            throw new IllegalArgumentException("UserAuth not found");
        }
    }



    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public User findByUserId(int userId) {

//        return entityManager.find(User.class, userId);
        User user =  userRepository.findByUserId(userId);
        UserAvatar avatar = userAvatarRepository.findUserAvatarByUserId(userId);
        user.setAvatar(avatar.getAvatar());
        return user;
    }


    @Override
    public List<UserAuth> getAllUserAuth() {
        TypedQuery<UserAuth> query = entityManager.createQuery("SELECT ua FROM UserAuth ua", UserAuth.class);
        return query.getResultList();
    }

   @Override
    public void saveUser(NewAccount newAccount){
       UserAuth userAuth = new UserAuth();
       userAuth.setUsername(newAccount.getUsername());
       userAuth.setPassword(newAccount.getPassword());
       userAuth.setUserStatus(0);
       userAuth.setUserType(1);

       userAuthRepository.save(userAuth);
       Integer userId = userAuth.getUserId();

       User user = new User();
       user.setUserId(userId);
       user.setUsername(newAccount.getUsername());
       user.setMail(newAccount.getMail());
       user.setAge(null);
       user.setAvatar(null);
       user.setAddress1(null);
       user.setTel(null);
       user.setAddress2(null);
       user.setAddress3(null);
       user.setNickname(null);

       userRepository.save(user);

   }

   @Override
    public UserAuth getUserAuthByUsername(String username){
        return userAuthRepository.findUserAuthByUsername(username);
   }

   @Override
    public void updateAvatar(Integer userId, String avatar){
       UserAvatar userAvatar = userAvatarRepository.findUserAvatarByUserId(userId);

       if (userAvatar == null) {
           throw new RuntimeException("User not found");
       }

       userAvatar.setAvatar(avatar);

       userAvatarRepository.save(userAvatar);
   }
}
