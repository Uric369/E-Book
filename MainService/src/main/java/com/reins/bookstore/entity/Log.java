package com.reins.bookstore.entity;



import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.time.Duration;
import java.util.List;

@Data
@Entity
@Table(name = "log")
public class Log {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="logId",insertable = false, updatable = false)
    private int logId;

    private int userId;
    private Long sessionDuration;
}

