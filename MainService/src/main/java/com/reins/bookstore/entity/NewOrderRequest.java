package com.reins.bookstore.entity;

import java.util.List;

public class NewOrderRequest {
    private NewOrder order;
    private List<NewOrderItem> orderItems;

    public NewOrder getOrder() {
        return order;
    }

    public void setOrder(NewOrder order) {
        this.order = order;
    }

    public List<NewOrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<NewOrderItem> orderItems) {
        this.orderItems = orderItems;
    }
// Getter and setter methods
}
