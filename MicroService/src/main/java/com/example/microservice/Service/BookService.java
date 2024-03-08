package com.example.microservice.Service;

import java.util.Optional;

public interface BookService {
    Optional<String> queryAuthor(String bookname);
}
