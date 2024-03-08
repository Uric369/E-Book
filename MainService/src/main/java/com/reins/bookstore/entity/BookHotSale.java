package com.reins.bookstore.entity;

public class BookHotSale {
    private int bookId;
    private String bookCover;

    private String isbn;
    private String bookName;
    private int sale;

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public String getBookCover() {
        return bookCover;
    }

    public void setBookCover(String bookCover) {
        this.bookCover = bookCover;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public int getSale() {
        return sale;
    }

    public void setSale(int sale) {
        this.sale = sale;
    }

    public BookHotSale(int bookId, String bookCover, String isbn, String bookName, int sale) {
        this.bookId = bookId;
        this.bookCover = bookCover;
        this.isbn = isbn;
        this.bookName = bookName;
        this.sale = sale;
    }
}
