package com.reins.bookstore.repository;

import com.reins.bookstore.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface BookRepository extends JpaRepository<Book,Integer> {

    @Query("select b from Book b")
    List<Book> getBooks();

    Book findBookById(Integer id);

@Transactional
    @Modifying
    @Query("DELETE FROM Book b WHERE b.id = :id")
    void deleteCompletelyById(@Param("id") Integer id);

    Book save(Book book);

    Book findBookByName(String name);
}



