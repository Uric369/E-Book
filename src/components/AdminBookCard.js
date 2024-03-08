import React from "react";
import { Link } from "react-router-dom";
import { deleteBook } from "../services/bookService";
import { editBook } from "../services/bookService";

import  { Component } from "react";
import { Modal, Form, Input, InputNumber, Select, Button, Card, message } from "antd";

class AdminBookCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      formData: {},
    };
  }

  handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this book?")) {
      deleteBook(id, (data) => {
        console.log("carddelte");
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
                marginLeft: '40vh'  // 设置消息框距离顶部的距离
            }
          });
        }
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  handleEdit = (id) => {
    console.log("Editing book " + id);
    // 设置formData为当前书籍信息
    const { book } = this.props;
    console.log("favorablerate");
    console.log(book.favorablerate);
    const formData = {
      id:book.id,
      name: book.name,
      publisher: book.publisher,
      author: book.author,
      cover: book.cover,
      stock: book.stock,
      isbn: book.isbn,
      price: book.price,
      status: book.status,
      summary: book.summary,
      description: book.description,
    };
    this.setState({
      formData,
      visible: true,
    });
  };

  handleOk = (values) => {
    const newFormData = { ...this.state.formData, ...values };
    console.log("Edit Book Form data: ", newFormData);

    editBook(newFormData, (data) => {
      console.log("consol data");
      console.log(data);
      if (data.status >= 0) {
        message.success({
          content: data.msg,
          duration: 4, // 持续时间
          style: {
            marginTop: '55vh',
                marginLeft: '40vh'  // 设置消息框距离顶部的距离
          }
        });
      } else {
        message.error({
          content: data.msg,
          duration: 4,
          style: {
            marginTop: '55vh',
                marginLeft: '40vh'  // 设置消息框距离顶部的距离
          }
        });
      }
    });
    this.setState({ visible: false });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      formData: {},
    });
  };

  render() {
    const { book } = this.props;
    const { formData, visible } = this.state;

    return (
      <div>
        <Card
          style={{
            width: 300,
            padding: 20,
          }}
          cover={
            <a href={"/AdminBookInfo/" + book.id}>
              <img
                alt="book cover"
                src={book.cover}
                style={{ height: "250px", objectFit: "contain", maxWidth: "100%" }}
              />
            </a>
          }
          actions={[
            <div style={{ marginTop: "16px" }}>
              <Button
                type="primary"
                style={{ marginRight: "8px", width: "100px" }}
                onClick={() => this.handleEdit(book.id)}
              >
                Edit
              </Button>
              <Button
                style={{ backgroundColor: "red", color: "white", width: "100px" }}
                onClick={() => this.handleDelete(book.id)}
              >
                Delete
              </Button>
            </div>,
          ]}
        >
          {/* <Card.Meta title={`[${book.id}] ${book.name}`} /> */}
          <Card.Meta title={`${book.name}`} />
        </Card>

        <Modal
          title="Edit Book Information"
          visible={visible}
          footer={null}
          onCancel={this.handleCancel}
          bodyStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          destroyOnClose={true}
        >
          <Form initialValues={formData} onFinish={this.handleOk}>
            <Form.Item
              label="Title"
              name="name"
              rules={[{ required: true, message: "Please input the name of book!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Publisher"
              name="publisher"
              rules={[{ required: true, message: "Please input the publisher of book!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Author"
              name="author"
              rules={[{ required: true, message: "Please input the author of book!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Cover(URL)"
              name="cover"
              rules={[{ required: true, message: "Please input the cover(URL) of book!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="ISBN"
              name="isbn"
              rules={[{ required: true, message: "Please input the ISBN of book!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Stock"
              name="stock"
              rules={[{ required: true, message: "Please input the stock of book!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
               name="price"
               label="Price"
               rules={[{ required: true, message: "Please input the price of book!" }]}
             >
               <InputNumber min={0} step={0.01} formatter={(value) => `$ ${value}`} />
             </Form.Item>
             <Form.Item
               label="Status"
               name="status"
               rules={[{ required: true, message: "Please select the status of book!" }]}
             >
               <Select>
                 <Select.Option value={0}>In Stock</Select.Option>
                 <Select.Option value={1}>Out of Stock</Select.Option>
               </Select>
             </Form.Item>
             <Form.Item
               label="Summarize the book in one sentence"
               name="summary"
               rules={[{ required: false, message: "Please input the summary of book!" }]}
             >
               <Input.TextArea rows={4} />
             </Form.Item>
             <Form.Item
               label="Introduction"
               name="description"
               rules={[{ required: false, message: "Please input the description of book!" }]}
             >
               <Input.TextArea rows={5} />
             </Form.Item>
             {/* <div style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Item
        label="Favorable Rate"
        name="favorableRate"
        // formatter={(value) => `${value}%`}
      >
         <Input disabled value={book.favorablerate} />
      </Form.Item>
      <Form.Item
        label="Likes"
        name="likes"
        style={{ marginLeft: '20px' }}
      >
        <Input disabled value={book.likes} />
      </Form.Item>
    </div> */}
             <Form.Item style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Button type="primary" htmlType="submit">
                 Save
               </Button>
             </Form.Item>
           </Form>
         </Modal>
       </div>
     );
     }
     }
     
     export default AdminBookCard;
