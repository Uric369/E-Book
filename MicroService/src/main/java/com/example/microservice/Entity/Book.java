package com.example.microservice.Entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;


@Data
@Entity
@Table(name = "book")
//@EntityScan("com.example.backend.entity")
//@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
public class Book {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy= GenerationType.SEQUENCE,generator="id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "publisher")
    private String publisher;
    @Column(name = "author")
    private String author;
    @Column(name = "summary")
    private String summary;

    @Column(name = "description")
    private String description;

    @Column(name = "likes")
    private Integer likes;
    @Column(name = "favorablerate")
    private Integer favorablerate;
    @Column(name = "price")
    private Double price;
    @Column(name = "cover")
    private String cover;

    @Column(name="isbn")
    private String isbn;

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    @Column(name="stock")
    private Integer stock;

    @Column(name="status")
    private Integer status;//0:in stock 1:out of stock

    @Column(name="book_condition")
    private Integer condition;//0:normal 1:deleted

    //    @OneToMany(mappedBy = "bookId", cascade = {CascadeType.ALL})
//    private List<Cart> carts;
//
//    @OneToMany(mappedBy = "bookId", cascade = {CascadeType.ALL})
//    private List<Order> orders;
    @JsonIgnore
    @OneToMany(mappedBy = "book")
    private List<OrderItem> orderItems;

    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", publisher='" + publisher + '\'' +
                ", author='" + author + '\'' +
                ", summary='" + summary + '\'' +
                ", description='" + description + '\'' +
                ", likes=" + likes +
                ", favorablerate=" + favorablerate +
                ", price=" + price +
                ", cover='" + cover + '\'' +
                ", status=" + status +
                ", condition=" + condition +
                '}';
    }

    public Integer getCondition() {
        return condition;
    }

    public void setCondition(Integer condition) {
        this.condition = condition;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getLikes() {
        return likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    public Integer getFavorablerate() {
        return favorablerate;
    }

    public void setFavorablerate(Integer favorablerate) {
        this.favorablerate = favorablerate;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

}


