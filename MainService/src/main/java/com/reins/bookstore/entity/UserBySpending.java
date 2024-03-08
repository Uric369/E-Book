package com.reins.bookstore.entity;

public class UserBySpending {
    private  Integer userId;
    private  String username;

    private String Avatar;

    private Double spending;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAvatar() {
        return Avatar;
    }

    public void setAvatar(String avatar) {
        Avatar = avatar;
    }

    public Double getSpending() {
        return spending;
    }

    public void setSpending(Double spending) {
        this.spending = spending;
    }
}
