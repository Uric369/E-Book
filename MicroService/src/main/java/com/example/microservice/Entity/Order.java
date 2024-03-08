package com.example.microservice.Entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;


import java.util.List;

@Data
@Entity
@Table(name = "orders")
//@EntityScan("com.example.backend.entity")
//@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
public class Order {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy= GenerationType.SEQUENCE,generator="id")
    private Integer id;
    @Column(name="userId")
    private Integer userId;

    @Column(name = "price")
    private Double price;

    @Column(name = "ordertime")
    private String ordertime;

    @Column(name="address")
    private String address;

    private String receiver;

    private String contactPhone;
    private Integer orderStatus;//0:待发货，1：已完成，2：已取消

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "userId", referencedColumnName = "userId", insertable = false, updatable = false)
//    private User user;
//

    @JsonIgnore
    @OneToMany(mappedBy = "orderId")
    private List<OrderItem> orderItems;

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "userId",insertable = false, updatable = false)
    private User user;

    public Order(Integer id, Integer userId, Double price, String ordertime, String address, String receiver, String contactPhone, Integer orderStatus) {
        this.id = id;
        this.userId = userId;
        this.price = price;
        this.ordertime = ordertime;
        this.address = address;
        this.receiver = receiver;
        this.contactPhone = contactPhone;
        this.orderStatus = orderStatus;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public String getContactPhone() {
        return contactPhone;
    }

    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }

    public Integer getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(Integer orderStatus) {
        this.orderStatus = orderStatus;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Order() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getOrdertime() {
        return ordertime;
    }

    public void setOrdertime(String ordertime) {
        this.ordertime = ordertime;
    }


}
