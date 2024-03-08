package com.reins.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

public class NewOrder {

    private Integer userId;

    private Double price;

    private String ordertime;

    private String address;

    private String receiver;

    private String contactPhone;

    @JsonIgnore
    private List<NewOrderItem> newOrderItems;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getOrdertime() {
        return ordertime;
    }

    public void setOrdertime(String ordertime) {
        this.ordertime = ordertime;
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

    public List<NewOrderItem> getNewOrderItems() {
        return newOrderItems;
    }

    public void setNewOrderItems(List<NewOrderItem> newOrderItems) {
        this.newOrderItems = newOrderItems;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
