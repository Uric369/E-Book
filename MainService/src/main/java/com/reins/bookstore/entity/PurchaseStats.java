package com.reins.bookstore.entity;

import java.util.List;

public class PurchaseStats {
    private int userId;


    private Double sumSpending;

    private Integer sumBooks;



    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Double getSumSpending() {
        return sumSpending;
    }

    public void setSumSpending(Double sumSpending) {
        this.sumSpending = sumSpending;
    }

    public Integer getSumBooks() {
        return sumBooks;
    }

    public void setSumBooks(Integer sumBooks) {
        this.sumBooks = sumBooks;
    }

}
