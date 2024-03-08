package com.reins.bookstore.entity;

import lombok.Data;
//import org.jdom.Text;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Data
@Document(collection = "User")
public class UserAvatar {
    @Id
    private String _id;
    private Integer userId;
    private String avatar;
}
