package com.reins.bookstore.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.*;


@Node
@Getter
@Setter
public class Tag {
    @Id
    @GeneratedValue
    private Long id;

    @Property("name")
    private String content;
}
