package com.reins.bookstore.dao;

import com.reins.bookstore.entity.Book;

import java.util.List;
import java.util.Optional;

public interface BookDao {
    Book findOne(Integer id);

    List<Book> getBooks();

    void save(Book book);

    void deleteBook(Integer id);

    void restoreBook(Integer id);

    void shredBook(Integer id);

    Optional<Book> findById(Integer id);

    List<Book> fuzzySearchByTag(String subString);

    String getTagContentByTagId(Long tagId);

    Book findBookByName(String name);
}
