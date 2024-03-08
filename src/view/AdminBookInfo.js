import React from "react";
import "../index.css";
import "../index.css";
import BackButton from "../components/InfoBackButton";
import BookCover from "../components/InfoBookCover";
import MenuBar from "../components/MenuBar";
import InfoTable from "../components/InfoTable";
import FeedBack from "../components/InfoFeedbackBox";
import Summary from "../components/InfoSummary";
import BookTag from "../components/Tag";
import MyHeader from "../components/MyHeader"
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getBook } from "../services/bookService";
import { Cascader, InputNumber, Select, Space,Button, message } from "antd";
import { addOrder } from "../services/orderService";
import { addCart } from "../services/cartService";
import { useLocation } from 'react-router-dom';
import AdminMenuBar from "../components/AdminMenuBar";
import { Link } from "react-router-dom";
import {Empty} from "antd";


import {
  Card,

  Breadcrumb,
  Layout,
  Col,
  Row
} from "antd";


const {  Content} = Layout;





const  AdminBookInfo = () => {
  
 const [book,setBook] =React.useState({});
 const [amount, setAmount] = useState(1);
     const {id}=useParams();
      console.log("id");
 console.log(id);

      getBook(id, (data) => {
        console.log(data)
        if(!book.name) {
          setBook(data);
        };
        // this.setState({isLoading:false});
      });
    


 console.log(book);

 const userData = JSON.parse(localStorage.getItem("user"));

 if (userData === null) {
  return (
<Layout>
        <MyHeader />
        <Layout>
          <AdminMenuBar />
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
            <Content
              style={{
                padding: 50,
                margin: 0,
                minHeight: 800,
                // background: colorBgContainer,
              }}
            >
      <Empty description={<span>No Data</span>}>
        <Button type="primary" size="large">
          <Link to="/">Please log in first</Link>
        </Button>
      </Empty>
      </Content>
          </Layout>
        </Layout>
      </Layout>
  );
}

    return (
      <Layout>
        <MyHeader />
        <Layout>
          <AdminMenuBar />
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
            <Content
              style={{
                padding: 50,
                margin: 0,
                minHeight: 800,
                // background: colorBgContainer,
              }}
            >
              <BackButton />
              <h1 class="BookTitle">{book.name}</h1>

              <Row gutter={30}>
                <Col span={6}>
                  <Card bordered={false} >
                    <BookCover book={book} />
                    <FeedBack book={book} />
                  </Card>
                </Col>
                <Col span={16}>
                  <Card bordered={false}>
                    <InfoTable  book={[book]}/>
                    <Summary book={book}/>
                    {/* <BookTag /> */}
                  </Card>
                </Col>
              </Row>

              <Row gutter={30}>
                {/* <Col span={6}>
                  <Card bordered={false}></Card>
                </Col> */}

                <Col span={16}>
                  {/* <Card bordered={false}>
                    <Space wrap>
                   
  <InputNumber addonBefore="+" defaultValue={1} onChange={setAmount} />
  <Button type="primary" onClick={handleAddCart}> Add to Cart </Button>

    <Button type="primary" onClick={handleAddOrder}>Purchase Now</Button>
  </Space>
                  </Card> */}
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  };


export default AdminBookInfo;