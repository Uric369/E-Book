import React, { Component } from "react";
import { Row, Col,List,Button,Avatar,Space,message } from "antd";
import BookCard from "./bookCard";
import { getBooks } from "../services/bookService";
import { shredBook } from "../services/bookService";
import {
    ProfileOutlined,
    ReadOutlined,
    DeleteOutlined,
    UndoOutlined,
    ShoppingCartOutlined,
    SafetyCertificateOutlined
  } from "@ant-design/icons";
  import { restoreBook } from "../services/bookService";

class DelBookList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        books: [],
      };
    }
  
    componentDidMount() {
      getBooks({ search: null }, (data) => {
        const books = data.filter((book) => book.condition === 1);
        this.setState({ books: [...books] });
      });
    }

    handleRestore = (id) => {
        if (window.confirm("Are you sure to restore this book?")) {
          restoreBook(id, (data) => {
            console.log("restore");
            console.log(data);
            // 刷新页面或更新状态等操作
            if (data.status >= 0) {
              message.success({
                content: data.msg,
                duration: 4, // 持续时间
                style: {
                  marginTop: '55vh',
          marginLeft: '40vh' // 设置消息框距离顶部的距离
                }
              });
            } else {
              message.error({
                content: data.msg,
                duration: 4,
                style: {
                  marginTop: '55vh',
          marginLeft: '40vh' // 设置消息框距离顶部的距离
                }
              });
            }
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      };

      handleShred = (id) => {
        if (window.confirm("Are you sure to delete this book COMPLETELY?")) {
          shredBook(id, (data) => {
            console.log("shred");
            console.log(data);
            // 刷新页面或更新状态等操作
            if (data.status >= 0) {
              message.success({
                content: data.msg,
                duration: 4, // 持续时间
                style: {
                  marginTop: '55vh',
          marginLeft: '40vh' // 设置消息框距离顶部的距离
                }
              });
            } else {
              message.error({
                content: data.msg,
                duration: 4,
                style: {
                  marginTop: '55vh',
          marginLeft: '40vh' // 设置消息框距离顶部的距离
                }
              });
            }
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      };
  
    render() {
        const { books } = this.state;

        return (
          <List
            itemLayout="horizontal"
            dataSource={books}
            pagination={{
              pageSize: 10,
            }}
            renderItem={(book) => (
              <List.Item
                key={book.id}
                actions={[
                  <Button
                    type="primary"
                    icon={<UndoOutlined />}
                    onClick={() => this.handleRestore(book.id)}
                  >
                    还原
                  </Button>,
                  <Button
                    type="danger"
                    icon={<DeleteOutlined />}
                    onClick={() => this.handleShred(book.id)}
                  >
                    粉碎
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={book.cover} />}
                  title={book.name}
                  description={book.description}
                  style={{ flex: "2" }}
                />
                <div style={{ flex: "1", textAlign: "right" }}>
                  <Space size="middle">
                    <span>{`[${book.id}]`}</span>
                    <span>{`出版社：${book.publisher}`}</span>
                    <span>{`作者：${book.author}`}</span>
                    <span>{`定价：$${book.price}`}</span>
                  </Space>
                </div>
              </List.Item>
            )}
          />
        );
      }
    }
    
  export default DelBookList;