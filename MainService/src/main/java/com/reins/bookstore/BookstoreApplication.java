package com.reins.bookstore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;

//@EnableWebSocketMessageBroker
//@EnableWebSocket
@SpringBootApplication
public class BookstoreApplication {

    public static void main(String[] args) {SpringApplication.run(BookstoreApplication.class, args);
    }

}
