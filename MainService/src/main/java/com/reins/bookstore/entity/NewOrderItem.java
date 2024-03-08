package com.reins.bookstore.entity;

public class NewOrderItem {
    private Integer bookId; // 书籍ID
    private Integer quantity; // 购买数量
    private Double subTotal; // 子项小计价格

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(Double subTotal) {
        this.subTotal = subTotal;
    }
}
