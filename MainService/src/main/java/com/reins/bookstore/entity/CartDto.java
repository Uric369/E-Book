package com.reins.bookstore.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.criteria.CriteriaBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartDto {
    private Integer userId;
    private Integer bookId;
    private String bookname;
    private String bookcover;
    private Integer amount;

    private Double price;
    private Integer status;


}
