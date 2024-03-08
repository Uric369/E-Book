package com.reins.bookstore.serviceimpl;

import com.reins.bookstore.dao.BookDao;
import com.reins.bookstore.entity.Book;
import com.reins.bookstore.repository.BookRepository;
import com.reins.bookstore.service.TimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;
import org.springframework.web.context.WebApplicationContext;

import javax.transaction.Transactional;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

// TimerServiceImpl.java
@Service
@Scope(value = WebApplicationContext.SCOPE_SESSION)
public class TimeServiceImpl implements TimeService {
    private LocalDateTime loginTime; // 用户登录时间

    @Override
    public void startTimer() {
        this.loginTime = LocalDateTime.now(); // 初始化计时器，记录登录时间
        System.out.println("start time");
        System.out.println(loginTime);
    }

    @Override
    public Duration stopTimer() {
        LocalDateTime logoutTime = LocalDateTime.now(); // 记录登出时间
        Duration sessionDuration = Duration.between(loginTime, logoutTime); // 计算会话保持时间
        return sessionDuration;
    }
}

