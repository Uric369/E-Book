package com.reins.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private Integer orderId; // 订单编号
    private Double totalPrice; // 订单总价

    private String ordertime;

    private String receiver;

    private String address;


    private String contactPhone;
    private Integer orderStatus;
    @JsonIgnore
    private List<OrderItemDTO> orderItems; // 订单包含的订单子项列表

    // 其他与订单相关的信息（下单时间、收件人、地址、联系电话等）

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public void setOrdertime(String ordertime) {
        this.ordertime = ordertime;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }

    public void setOrderStatus(Integer orderStatus) {
        this.orderStatus = orderStatus;
    }

    public void setOrderItems(List<OrderItemDTO> orderItems) {
        this.orderItems = orderItems;
    }

    public List<OrderItemDTO> getOrderItems() {
        return orderItems;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public String getOrdertime() {
        return ordertime;
    }

    public String getReceiver() {
        return receiver;
    }

    public String getAddress() {
        return address;
    }

    public String getContactPhone() {
        return contactPhone;
    }

    public Integer getOrderStatus() {
        return orderStatus;
    }

    // Getters and Setters
}
