package com.example.microservice.Dao;

import java.util.Optional;

public interface BookDao {
    Optional<String> queryAuthor(String bookname);
}
