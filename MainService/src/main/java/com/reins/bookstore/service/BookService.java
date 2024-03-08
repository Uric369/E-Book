package com.reins.bookstore.service;


import com.reins.bookstore.entity.Book;


import java.util.List;
import java.util.Map;


public interface BookService {

    Book findBookById(Integer id);

    List<Book> getBooks();

    void save(Book book);
    void deleteBook(Integer id);

    void restoreBook(Integer id);
    void shredBook(Integer id);
    void editBook(Book book);

    List<Book> fuzzySearchByTag(String subString);

    String getTagContentByTagId(Long tagId);

    Book findBookByName (String name);

    Map<String, Integer> getBookWordCountHadoop() throws Exception;

    Map<String, Integer> getBookWordCountSpark()throws Exception;
}
