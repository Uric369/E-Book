import React from "react";
import { Card, Tag } from "antd";
import { Link } from "react-router-dom";

class BookCard  extends React.Component{
  render() {

    const {book} = this.props;
    console.log(book);
    return ( 

    <a href={"/BookInfo/"+book.id}>
    
      <Card
        style={{
          width: 300,
          padding: 20,
        }}
        cover={<img alt="book cover" src={book.cover} style={{ height: "250px", objectFit: "contain", maxWidth: "100%" }}/>}
        actions={[
          <span key="price">${book.price}</span>
        ]}
      >
        <Card.Meta title={book.name} description={book.summary} />
        <Tag style={{
          marginTop:"20px"
        }} color="green">{book.tagContent}</Tag>
      </Card>
      {/* </Link> */}
    </a>
    );
  };
};
  
  
export default BookCard;
