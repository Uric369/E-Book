package com.reins.bookstore.repository;

import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface LogRepository extends JpaRepository<Log,Integer> {

}

