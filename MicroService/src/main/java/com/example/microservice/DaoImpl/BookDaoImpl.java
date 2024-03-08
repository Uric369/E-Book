package com.example.microservice.DaoImpl;

import com.example.microservice.Dao.BookDao;
import com.example.microservice.Entity.Book;
import com.example.microservice.Repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Repository
public class BookDaoImpl implements BookDao {
    @Autowired
    private BookRepository bookRepository;

    @Override
    public Optional<String> queryAuthor(String bookname) {
        Optional<Book> bookOptional = bookRepository.findByName(bookname);
        return bookOptional.map(Book::getAuthor);
    }
}
