package com.reins.bookstore.serviceimpl;

import com.reins.bookstore.entity.Log;
import com.reins.bookstore.repository.LogRepository;
import com.reins.bookstore.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Service
public class LogServiceImpl implements LogService {
    private final LogRepository logRepository;

    @Autowired
    public LogServiceImpl(LogRepository logRepository) {
        this.logRepository = logRepository;
    }

    @Override
    public void saveLog(Log log) {
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (requestAttributes != null) {
            logRepository.save(log);
        } else {
            throw new IllegalStateException("No valid request context found");
        }
    }
}