package com.reins.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderItemDTO {
    private Integer bookId; // 书籍ID
    private String bookCover; // 书籍封面URL

    private String bookname;

    private Integer quantity; // 购买数量
    private Double subTotal; // 子项小计价格

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public void setBookCover(String bookCover) {
        this.bookCover = bookCover;
    }

    public void setBookname(String bookname) {
        this.bookname = bookname;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public void setSubTotal(Double subTotal) {
        this.subTotal = subTotal;
    }

    public Integer getBookId() {
        return bookId;
    }

    public String getBookCover() {
        return bookCover;
    }

    public String getBookname() {
        return bookname;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public Double getSubTotal() {
        return subTotal;
    }
// Getters and Setters
}
