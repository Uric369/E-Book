package com.reins.bookstore.entity;

public class PchsStasByBook {
    private Integer bookId;
    private String bookname;

    private String bookcover;

    private Integer total;

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public String getBookname() {
        return bookname;
    }

    public void setBookname(String bookname) {
        this.bookname = bookname;
    }

    public String getBookcover() {
        return bookcover;
    }

    public void setBookcover(String bookcover) {
        this.bookcover = bookcover;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }
}
