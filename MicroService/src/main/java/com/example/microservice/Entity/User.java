package com.example.microservice.Entity;



import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;


@Data
@Entity
@Table(name = "user")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="userId",insertable = false, updatable = false)
    private int userId;
    private String nickname;

    private String mail;
    private String username;
    private Integer age;

    private String tel;

    private String avatar;

    private String address1;
    private String address2;

    private String address3;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Order> orders;


    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<OrderItem> orderItems;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Cart> carts;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getAddress1() {
        return address1;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String getAddress2() {
        return address2;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public String getAddress3() {
        return address3;
    }

    public void setAddress3(String address3) {
        this.address3 = address3;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public List<Cart> getCarts() {
        return carts;
    }

    //    @OneToMany(mappedBy = "userId", cascade = {CascadeType.ALL})
//    private List<Order> orders;
//
//    @OneToMany(mappedBy = "userId", cascade = {CascadeType.ALL})
//    private List<Cart> carts;


}
