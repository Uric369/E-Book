package com.reins.bookstore.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Setter
@Getter
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

    @Column(name="tag_id")
    private Long tagId;

    @Transient
    private String tagContent;

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


}

