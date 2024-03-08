package com.example.microservice.Controller;

import com.example.microservice.Service.BookService;
import com.example.microservice.utils.MsgUtils.Msg;
import com.example.microservice.utils.MsgUtils.MsgCode;
import com.example.microservice.utils.MsgUtils.MsgUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class BookController {
    @Autowired
    private BookService bookService;

    @RequestMapping("/getBookAuthorByName/{bookName}")
    public Msg queryAuthor(@PathVariable("bookName") String bookname) {
        try {
            Optional<String> author = bookService.queryAuthor(bookname);
            if (author.isPresent()) {
                // 书籍作者存在
                JSONObject json = new JSONObject();
                json.put("author", author.get());
                return MsgUtil.makeMsg(MsgCode.SUCCESS, "Success to query book author", json);
            } else {
                // 书籍作者不存在
                return MsgUtil.makeMsg(MsgCode.ERROR, "Book not found");
            }
        } catch (Exception e) {
            System.out.println("Error occurred while querying book author: " + e.getMessage());
            return MsgUtil.makeMsg(MsgCode.ERROR, "failed to query book author: " + e.getMessage());
        }
    }
}
