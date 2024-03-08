package com.example.microservice.Repository;


import com.example.microservice.Entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookRepository extends JpaRepository<Book,Integer> {

    Optional<Book> findByName(String name);

}
