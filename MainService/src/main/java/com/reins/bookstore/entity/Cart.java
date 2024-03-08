package com.reins.bookstore.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;


import javax.persistence.*;

@Data
@Entity
@Table(name = "cart")
//@EntityScan("com.example.backend.entity")
//@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
public class Cart {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "id")
    private Integer id;
    @Column(name = "userId")
    private Integer userId;

    @Column(name = "bookId")
    private Integer bookId;
    @Column(name = "bookname")
    private String bookname;

    @Column(name = "bookcover")
    private String bookcover;
    @Column(name = "amount")
    private Integer amount;

    @Column(name = "unit_price")
    private Double price;

    @Column(name = "status")
    private Integer status;


    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "userId",insertable = false, updatable = false)
    private User user;

    public Cart(Integer id, Integer userId, Integer bookId, String bookname, String bookcover, Integer amount, Double price, Integer status) {
        this.id = id;
        this.userId = userId;
        this.bookId = bookId;
        this.bookname = bookname;
        this.bookcover = bookcover;
        this.amount = amount;
        this.price = price;
        this.status = status;
    }

    public Cart() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

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

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}


