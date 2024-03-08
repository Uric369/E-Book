package com.reins.bookstore.controller;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.reins.bookstore.entity.*;
import com.reins.bookstore.service.BookService;
import com.reins.bookstore.service.OrderService;
import com.reins.bookstore.utils.HadoopWordCount.WordCount;
import com.reins.bookstore.utils.msgutils.Msg;
import com.reins.bookstore.utils.msgutils.MsgCode;
import com.reins.bookstore.utils.msgutils.MsgUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.reins.bookstore.utils.HadoopWordCount.WordCount;

import javax.persistence.criteria.CriteriaBuilder;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
public class BookController {
    @Autowired
    private BookService bookService;

    @Autowired
    private OrderService orderService;

    @RequestMapping("/getBooks")
    public List<Book> getBooks() {
        return bookService.getBooks();
    }

    @GetMapping("/wordcount")
    public Map<String, Integer> getWordCount() {
        Map<String, Integer> wordCounts = new HashMap<>();
        wordCounts.put("Data", 42);
        wordCounts.put("computer", 15);
        wordCounts.put("java", 58);
        wordCounts.put("css", 23);
        wordCounts.put("algorithm", 37);
        return wordCounts;
    }

    @RequestMapping("/getBook")
    public Book getBook(@RequestParam("id") Integer id) {
        return bookService.findBookById(id);
    }

    @RequestMapping("/addBook")
    public Msg addBook(@RequestBody Book book) {
        try {
            bookService.save(book);
            return MsgUtil.makeMsg(MsgCode.SUCCESS, "success to add book");
        } catch (Exception e) {
            System.out.println("Error occurred while adding book: " + e.getMessage());
            return MsgUtil.makeMsg(MsgCode.ERROR, "failed to add book: " + e.getMessage());
        }
    }

    @PostMapping("/deleteBook")
    public Msg deleteBook(@RequestParam("id") Integer id) {
        try {
            bookService.deleteBook(id);
            return MsgUtil.makeMsg(MsgCode.SUCCESS, "success to delete book");
        } catch (Exception e) {
            System.out.println("Error occurred while deleting book: " + e.getMessage());
            return MsgUtil.makeMsg(MsgCode.ERROR, "failed to delete book: " + e.getMessage());
        }
    }

    @PostMapping("/restoreBook")
    public Msg restoreBook(@RequestParam("id") Integer id) {
        try {
            bookService.restoreBook(id);
            return MsgUtil.makeMsg(MsgCode.SUCCESS, "success to restore book");
        } catch (Exception e) {
            System.out.println("Error occurred while restoring book: " + e.getMessage());
            return MsgUtil.makeMsg(MsgCode.ERROR, "failed to restore book: " + e.getMessage());
        }
    }

    @RequestMapping("/shredBook")
    public Msg shredBook(@RequestParam("id") Integer id) {
        try {
            bookService.shredBook(id);
            return MsgUtil.makeMsg(MsgCode.SUCCESS, "success to shred book");
        } catch (Exception e) {
            System.out.println("Error occurred while shredding book: " + e.getMessage());
            return MsgUtil.makeMsg(MsgCode.ERROR, "failed to shred book: " + e.getMessage());
        }
    }

    @RequestMapping("/editBook")
    public Msg editBook(@RequestBody Book book) {
        System.out.println("Controller");
        System.out.println(book);
        try {
            bookService.save(book);

            return MsgUtil.makeMsg(MsgCode.SUCCESS, "success to edit book");
        } catch (Exception e) {
            System.out.println("Error occurred while editting book: " + e.getMessage());
            return MsgUtil.makeMsg(MsgCode.ERROR, "failed to edit book: " + e.getMessage());
        }

    }

    @RequestMapping("/BookHotSellingList")
    public List<BookHotSale> getBooksBySales(
            @RequestParam("startTime") String startTime,
            @RequestParam("endTime") String endTime) {


        // 查询满足条件的订单
        List<Order> orders = orderService.findByOrderStatusNotAndOrderTimeBetween(2, startTime, endTime);

        // 获取满足条件的订单项并按书籍分组累加销量
        List<BookHotSale> bookDTOs = orders.stream()
                .flatMap(order -> order.getOrderItems().stream())
                .collect(Collectors.groupingBy(OrderItem::getBook, Collectors.summingInt(OrderItem::getAmount)))
                .entrySet().stream()
                .map(entry -> {
                    Book book = entry.getKey();
                    int totalSales = entry.getValue();
                    return new BookHotSale(book.getId(),  book.getCover(),book.getIsbn(), book.getName(),totalSales);
                })
                .collect(Collectors.toList());

        // 根据销量进行排序
        bookDTOs.sort(Comparator.comparingInt(BookHotSale::getSale).reversed());

        return bookDTOs;
    }

    @RequestMapping("/searchBookByName")
    public List<Book> searchBookByName(@RequestParam("subString") String subString) {
        List<Book> books=bookService.getBooks().stream()
                .filter(book -> book.getCondition() == 0)
                .filter(book->book.getName().toLowerCase().contains(subString.toLowerCase()))
                .collect(Collectors.toList());
        return books;
    }


    @RequestMapping("/fuzzySearchByTag")
    public List<Book> fuzzySearchByTag(@RequestParam("subString") String subString) {
        return bookService.fuzzySearchByTag(subString);
    }

    @QueryMapping
    public Book bookByName(@Argument String name){
        return bookService.findBookByName(name);
    }

    @PostMapping("/test")
    public String test() {
        return "ok";
    }

    @GetMapping("/getBookWordCountHadoop")
    public  Map<String, Integer> getBookWordCountHadoop() throws Exception {
        Map<String, Integer> map = bookService.getBookWordCountHadoop();
        return map;
    }

    @GetMapping("/getBookWordCountSpark")
    public  Map<String, Integer> getBookWordCountSpark() throws Exception {
        Map<String, Integer> map = bookService.getBookWordCountSpark();
        return map;
    }
}
