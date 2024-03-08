package com.reins.bookstore.service;


import io.swagger.annotations.Scope;

import java.time.Duration;
import java.util.List;


// TimerService.java

public interface TimeService {
    void startTimer();
    Duration stopTimer();
}

