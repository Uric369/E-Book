import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import AdminBookCard from "./AdminBookCard";
import { getBooks, addBook } from "../services/bookService";
import { Row, Col, Upload, Modal, Select, Form, Input, Button, message, InputNumber } from "antd";
import { getBooksByName } from "../services/bookService";
const { Search } = Input;

const AdminBookShelf = () => {
  const [books, setBooks] = useState([]);
  const [visible, setVisible] = useState(false);
  const [subString, setSubString] = useState(null);

  useEffect(() => {
    getBooks({ search: null }, (data) => {
      const filteredBooks = data.filter((book) => book.condition === 0);
      setBooks([...filteredBooks]);
    });
  }, []);

  const SearchBookName=(subString)=>{
    console.log("SearchBookName");
    console.log(subString);
    getBooksByName( subString, (data) => {
      setBooks(null);
      setBooks(data);
      console.log(data);
    });
  };


  const showModal = () => {
    setVisible(true);
  };
  
  
  const handleOk = (values) => {
    console.log(values);
    console.log("here");
    const Book = { 
      name: values.name,
      publisher: values.publisher,
      author: values.author,
      cover: values.cover,
      isbn:values.isbn,
      stock:values.stock,
      price: values.price,
      summary: values.summary,
      description: values.description,
      status:values.status,
    }
    addBook(Book, (data) => {
      console.log("consol data");
      console.log(data);
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
    setVisible(false);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
       <Search
  placeholder="input search text"
  onSearch={SearchBookName}
  onChange={(e) => {
    SearchBookName(e.target.value);
  }}
  enterButton
  style={{ width: '400px', margin: '32px 0' }}
/>
    <Row gutter={[16, 16]} justify="center">
      {/* Upload area */}
      <Col span={8} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            border: "1px dashed #ccc",
            padding: "32px",
            textAlign: "center",
            width: "80%",
            height: "280px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={showModal}
        >
          <PlusOutlined style={{ fontSize: "64px", color: "#999" }} />
          <div style={{ marginTop: "16px", fontSize: "20px", color: "#666" }}>Add New Books</div>
        </div>
      </Col>

      {/* Existing book cards */}
      {books.map((book) => (
        <Col span={8} key={book.id}>
          <AdminBookCard book={book} />
        </Col>
      ))}

      <Modal title="Add New Book" visible={visible} footer={null} onCancel={handleCancel}>
        <Form onFinish={handleOk}>
        <Form.Item label="Title" name="name" rules={[{ required: true, message: "Please input the name of book!" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Publisher"
          name="publisher"
          rules={[{ required: true, message: "Please input the publisher of book!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Author" name="author" rules={[{ required: true, message: "Please input the author of book!" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Cover(URL)" name="cover" rules={[{ required: true, message: "Please input the cover(URL) of book!" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="ISBN" name="isbn" rules={[{ required: true, message: "Please input the ISBN of book!" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Stock" name="stock" rules={[{ required: true, message: "Please input the stock of book!" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true, message: "Please input the price of book!" }]} >
          <InputNumber min={0} step={0.01} formatter={(value) => `$ ${value}`} />
        </Form.Item>
        <Form.Item label="Status" name="status" rules={[{ required: true, message: "Please select the status of book!" }]}>
  <Select>
    <Select.Option value={0}>In Stock</Select.Option>
    <Select.Option value={1}>Out of Stock</Select.Option>
  </Select>
</Form.Item>
        <Form.Item label="Summarize the book in one sentence" name="summary" rules={[{ required: false, message: "Please input the summary of book!" }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Introduction" name="description" rules={[{ required: false, message: "Please input the description of book!" }]}>
          <Input.TextArea rows={6} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" >
            Add
          </Button>
        </Form.Item>
        </Form>
      </Modal>
    </Row>
    </div>
  );
};

export default AdminBookShelf;
