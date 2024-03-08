package com.reins.bookstore.daoimpl;

import com.alibaba.fastjson.JSON;
import com.reins.bookstore.Neo4jRepository.TagRepository;
import com.reins.bookstore.dao.BookDao;
import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.Tag;
import com.reins.bookstore.repository.BookRepository;
import com.reins.bookstore.utils.RedisUtils.RedisUtil;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


@Repository
public class BookDaoImpl implements BookDao {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private RedisUtil redisUtil;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Book findOne(Integer id){
        Book book;
        Object b = redisUtil.get("book" + id);
//        System.out.println(b);
        if (b == null){
            book = bookRepository.findBookById(id);
            book.setTagContent(getTagContentByTagId(book.getTagId()));
            redisUtil.set("book" + id, JSON.toJSONString(book));
            System.out.println("book" + book.getId() + " from database");
        }
        else {
            book = JSON.parseObject((String)b, Book.class);
            System.out.println("book" + book.getId() + " from Redis");
        }
        return book;
    }


    @Override
    public List<Book> getBooks() {
        List<Book> books = bookRepository.getBooks().stream()
                .peek(book -> book.setTagContent(getTagContentByTagId(book.getTagId())))
                .collect(Collectors.toList());
        return books;
    }

    @Override
    public void save(Book book) {
        Object b = redisUtil.get("book" + book.getId());
        if (b != null) {
            redisUtil.set("book" + book.getId(),JSON.toJSONString(book));
        }
        bookRepository.save(book);
    }

    @Override
    public void deleteBook(Integer id) {
//        Optional<Book> optional = bookRepository.findById(id);
//        if (optional.isPresent()) {
//            Book book = optional.get();
//            book.setCondition(1);
//            bookRepository.save(book);
//        } else {
//            throw new IllegalArgumentException("Book not found");
//        }

        Book book;
        Object b = redisUtil.get("book" + id);
        if (b != null) {
            book = JSON.parseObject((String)b, Book.class);
            book.setCondition(1);
            redisUtil.set("book" + id, JSON.toJSONString(book));
            System.out.println("delete book " + book.getId() + " from Redis");
        }
            Optional<Book> optional = bookRepository.findById(id);
            if (optional.isPresent()) {
                book = optional.get();
                book.setCondition(1);
                bookRepository.save(book);
                System.out.println("delete book " + book.getId() + " from database");
            }
            else {
                throw new IllegalArgumentException("Book not found");
            }

    }

    @Override
    public void restoreBook(Integer id) {
//        Optional<Book> optional = bookRepository.findById(id);
//        if (optional.isPresent()) {
//            Book book = optional.get();
//            book.setCondition(0);
//            bookRepository.save(book);
//        } else {
//            throw new IllegalArgumentException("Book not found");
//        }
        Book book;
        Object b = redisUtil.get("book" + id);
        if (b != null) {
            book = JSON.parseObject((String)b, Book.class);
            book.setCondition(0);
            redisUtil.set("book" + id, JSON.toJSONString(book));
            System.out.println("restore book " + book.getId() + " from Redis");
        }
            Optional<Book> optional = bookRepository.findById(id);
            if (optional.isPresent()) {
                book = optional.get();
                book.setCondition(0);
                bookRepository.save(book);
                System.out.println("restore book " + book.getId() + " from database");
            }
            else {
                throw new IllegalArgumentException("Book not found");
            }

    }

    @Override
    public void shredBook(Integer id) {
        redisUtil.del("book" + id);
        bookRepository.deleteCompletelyById(id);
    }

    @Override
    public Optional<Book> findById(Integer id) {
        Book book;
//        bookRepository.findBookById(id);
//        String jpql = "SELECT b FROM Book b WHERE b.id = :id";
//        TypedQuery<Book> query = entityManager.createQuery(jpql, Book.class);
//        query.setParameter("id", id);
//        return query.getResultList().stream().findFirst();
        Object b = redisUtil.get("book" + id);
//        System.out.println(b);
        if (b == null){
            book = bookRepository.findBookById(id);
            book.setTagContent(getTagContentByTagId(book.getTagId()));
            redisUtil.set("book" + id, JSON.toJSONString(book));
            System.out.println("book" + book.getId() + " from database");
        }
        else {
            book = JSON.parseObject((String)b, Book.class);
            System.out.println("book" + book.getId() + " from Redis");
        }
        return Optional.ofNullable(book);
    }

    @Override
    public List<Book> fuzzySearchByTag(String subString){
        Tag tag = tagRepository.findTagByContent(subString);
        Tag test = tagRepository.findTagById(Long.valueOf(4));

        System.out.println(subString);
        System.out.println(tag);
        List<Book> books = bookRepository.findAll(); // 假设你有这样一个方法
        if (tag!=null) {
            List<Tag> combinedTagList = new ArrayList<>();
            combinedTagList.add(tag); // 添加单个Tag对象到列表

            List<Tag> tagList1 = tagRepository.findAdjacentTagsByContent(subString);
            System.out.println("List1");
            for (Tag t : tagList1) {
                System.out.println(t.getId());  // 打印Tag的tagId
            }

            List<Tag> tagList2 = tagRepository.findDistantTagsByContent(subString);
            System.out.println("List2");
            for (Tag t : tagList2) {
                System.out.println(t.getId());  // 打印Tag的tagId
            }

            combinedTagList.addAll(tagList1); // 将tagList1中的所有Tag对象添加到列表
            combinedTagList.addAll(tagList2); // 将tagList2中的所有Tag对象添加到列表

            System.out.println("completeList");
            for (Tag t : combinedTagList) {
                System.out.println(t.getId());  // 打印合并后Tag列表中的tagId
            }

            Set<Long> tagIdSet = combinedTagList.stream()
                    .map(Tag::getId) // Assuming the Tag class has a method getId()
                    .collect(Collectors.toSet());

            // 使用Stream API来过滤和更新Book对象
            books = books.stream()
                    .filter(book -> tagIdSet.contains(book.getTagId()))
                    .peek(book -> {
                        for (Tag t : combinedTagList) {
                            if (book.getTagId().equals(t.getId())) {
                                book.setTagContent(t.getContent()); // 假设Book有类似的方法来设置content
                                break; // 找到匹配项后就跳出循环
                            }
                        }
                    })
                    .collect(Collectors.toList());

            System.out.println("Books:");
            for (Book book : books) {
                System.out.println("Book Name: " + book.getName() + ", Tag ID: " + book.getTagId());  // 假设getName()是获取书名的方法
            }

            return books;
        }
        return null;

    }

    @Override
    public String getTagContentByTagId(Long tagId){
        Tag tag = tagRepository.findTagById(tagId);
        if (tag!=null)
        return tagRepository.findTagById(tagId).getContent();
        else return null;
    }

    @Override
    public Book findBookByName(String name){
        return bookRepository.findBookByName(name);
    }
}
