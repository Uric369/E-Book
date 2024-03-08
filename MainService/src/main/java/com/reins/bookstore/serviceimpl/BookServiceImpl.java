package com.reins.bookstore.serviceimpl;

import com.reins.bookstore.dao.BookDao;
import com.reins.bookstore.entity.Book;
import com.reins.bookstore.repository.BookRepository;
import com.reins.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.reins.bookstore.utils.HadoopWordCount.WordCount.wordCount;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookDao bookDao;

    @Override
    public Book findBookById(Integer id){
        return bookDao.findOne(id);
    }

    @Override
    public List<Book> getBooks() {
        return bookDao.getBooks();
    }
    @Autowired
    private BookRepository bookRepository;

    @Override
    public void save(Book book) {
        if (book.getName() == null || book.getPublisher() == null || book.getAuthor() == null || book.getCover() == null ||book.getPrice() == null||book.getStatus()==null||book.getIsbn()==null) {
            throw new IllegalArgumentException("Some required fields are missing");
        }
        book.setPrice(10.0);
        if( book.getSummary() == null) {
            book.setSummary("waiting to be edited");
        }

        if(book.getDescription() == null){
            book.setDescription("waiting to be edited");
        }
        if (book.getLikes() == null) {
            book.setLikes(0);
        }
        if (book.getFavorablerate() == null) {
            book.setFavorablerate(0);
        }
        book.setCondition(0);

//        bookRepository.save(book);
        bookDao.save(book);
    }

    @Override
//    @Transactional
    public void deleteBook(Integer id) {
        bookDao.deleteBook(id);
    }

    @Override
//    @Transactional
    public void restoreBook(Integer id) {
        bookDao.restoreBook(id);
    }

    @Override
//    @Transactional
    public void shredBook(Integer id) {
        bookDao.shredBook(id);
    }

    @Override
    @Transactional
    public void editBook(Book book) {
        System.out.println("ServiceImpl");
        System.out.println(book);
        Optional<Book> optionalBook = bookDao.findById(book.getId());
        if (optionalBook.isPresent()) {
            Book existingBook = optionalBook.get();

            // Update existingBook fields with non-null values from book
            if (book.getName() != null) {
                existingBook.setName(book.getName());
            }
            if (book.getPublisher() != null) {
                existingBook.setPublisher(book.getPublisher());
            }
            if (book.getAuthor() != null) {
                existingBook.setAuthor(book.getAuthor());
            }
            if (book.getSummary() != null) {
                existingBook.setSummary(book.getSummary());
            }
            if (book.getDescription() != null) {
                existingBook.setDescription(book.getDescription());
            }
            if (book.getLikes() != null) {
                existingBook.setLikes(book.getLikes());
            }
            if (book.getFavorablerate() != null) {
                existingBook.setFavorablerate(book.getFavorablerate());
            }
            if (book.getPrice() != null) {
                existingBook.setPrice(book.getPrice());
            }
            if (book.getCover() != null) {
                existingBook.setCover(book.getCover());
            }
            if (book.getStatus() != null) {
                existingBook.setStatus(book.getStatus());
            }
            if (book.getCondition() != null) {
                existingBook.setCondition(book.getCondition());
            }

            if (book.getIsbn() != null) {
                existingBook.setIsbn(book.getIsbn());
            }

            if (book.getStock() != null) {
                existingBook.setStock(book.getStock());
            }


            bookDao.save(existingBook);
        } else {
            throw new RuntimeException("Book with id: " + book.getId() + " not found");
        }
    }

    @Override
    public List<Book> fuzzySearchByTag(String subString) {
        return bookDao.fuzzySearchByTag(subString);
    }

    @Override
    public String getTagContentByTagId(Long tagId) {
        return bookDao.getTagContentByTagId(tagId);
    }

    @Override
    public Book findBookByName(String name){
        return bookDao.findBookByName(name);
    }

    @Override
    public Map<String, Integer> getBookWordCountHadoop() throws Exception {
        List<Book>books  = bookDao.getBooks();
        // 用于保存每个tag对应的描述内容
        Map<String, StringBuilder> tagDescriptions = new HashMap<>();
        for (Book book : books) {
            String tag = bookDao.getTagContentByTagId(book.getTagId());
            String description = book.getDescription();
            // 根据tag获取或创建StringBuilder对象
            StringBuilder sb = tagDescriptions.computeIfAbsent(tag, k -> new StringBuilder());
            // 将description添加到相应的StringBuilder对象中
            sb.append(description).append("\n");
        }
        // 将每个tag对应的描述内容写入文件
        for (Map.Entry<String, StringBuilder> entry : tagDescriptions.entrySet()) {
            String tag = entry.getKey();
            String filePath = "F:\\coding\\web_plus\\jiaoji_app_back\\src\\main\\java\\com\\reins\\bookstore\\utils\\HadoopWordCount\\input\\" + tag + ".txt";

            try (BufferedWriter writer = new BufferedWriter(new FileWriter(new File(filePath)))) {
                writer.write(entry.getValue().toString());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        wordCount();
        String filePath ="F:\\coding\\web_plus\\jiaoji_app_back\\src\\main\\java\\com\\reins\\bookstore\\utils\\HadoopWordCount\\output\\part-r-00000";
        Map<String, Integer> resultMap = new HashMap<>();

        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                // 假设文件的每一行格式为 ('code', 7) 这样的形式
                // 使用简单的字符串操作来提取tag和对应的计数值
                String[] parts = line.split("\t"); // 使用制表符'\t'分割字符串
                if (parts.length == 2) {
                    String key = parts[0].trim();
                    int value = Integer.parseInt(parts[1].trim());
                    resultMap.put(key, value);
                } else {
                    System.err.println("Invalid line format: " + line);
                }

            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return resultMap;

    }


    @Override
    public Map<String, Integer> getBookWordCountSpark()throws Exception{
        List<Book>books  = bookDao.getBooks();
        // 用于保存每个tag对应的描述内容
        Map<String, StringBuilder> tagDescriptions = new HashMap<>();
        for (Book book : books) {
            String tag = bookDao.getTagContentByTagId(book.getTagId());
            String description = book.getDescription();
            // 根据tag获取或创建StringBuilder对象
            StringBuilder sb = tagDescriptions.computeIfAbsent(tag, k -> new StringBuilder());
            // 将description添加到相应的StringBuilder对象中
            sb.append(description).append("\n");
        }
        // 将每个tag对应的描述内容写入文件
        for (Map.Entry<String, StringBuilder> entry : tagDescriptions.entrySet()) {
            String tag = entry.getKey();
            String filePath = "F:\\coding\\WEB-plus\\word_count_python\\input\\" + tag + ".txt";

            try (BufferedWriter writer = new BufferedWriter(new FileWriter(new File(filePath)))) {
                writer.write(entry.getValue().toString());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        wordCount();
        String filePath = "F:\\coding\\WEB-plus\\word_count_python\\output\\part-00001";
        Map<String, Integer> resultMap = new HashMap<>();

        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                // 假设文件的每一行格式为 ('code', 7) 这样的形式
                // 使用简单的字符串操作来提取tag和对应的计数值
                int startIndex = line.indexOf('(') + 1;
                int commaIndex = line.indexOf(',');
                int endIndex = line.indexOf(')');

                if (startIndex != -1 && commaIndex != -1 && endIndex != -1) {
                    String tag = line.substring(startIndex, commaIndex).trim().replace("'", "");
                    int count = Integer.parseInt(line.substring(commaIndex + 1, endIndex).trim());

                    resultMap.put(tag, count);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return resultMap;



    }
}
