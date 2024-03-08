import React from "react";
import "../index.css";
import CSAPP from "../assets/CSAPP.jpg";
import BookStoreLogo from "../assets/sd.jpg";
import SearchBar from "../components/SearchBar";
import MenuBar from "../components/MenuBar";
import OrderTable from "../components/OrderTable";
import MyHeader from "../components/MyHeader";
import {
  Breadcrumb,
  Layout,
  theme,
} from "antd";


const { Content, Sider } = Layout;



const Order = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  return (
    <Layout>
     <MyHeader/>
      <Layout>
          <MenuBar />
        <Layout
          style={{
            padding: "0 24px 24px"
          }}
        >
          <Breadcrumb
            style={{
              marginTop:"30px",
              marginBottom:"30px"
            }}
          >
           
          </Breadcrumb>
          <Content
            style={{
              padding: 50,
              margin: 0,
              minHeight: 800,
              background: colorBgContainer
            }}
          >
            <h1>My Orders</h1>
            {/* <SearchBar /> */}
            <OrderTable />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default Order;
