package com.example.microservice.ServiceImpl;

import com.example.microservice.Dao.BookDao;
import com.example.microservice.Service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookDao bookDao;

    @Override
    public Optional<String> queryAuthor(String bookname) {
        return bookDao.queryAuthor(bookname);
    }
}
