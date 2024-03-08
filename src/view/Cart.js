import React from "react";
import "../index.css";
import CSAPP from "../assets/CSAPP.jpg";
import BookStoreLogo from "../assets/sd.jpg";
import SearchBar from "../components/SearchBar";
import MenuBar from "../components/MenuBar";
import CartTable from "../components/CartTable";
import MyHeader from "../components/MyHeader";
import {
  Breadcrumb,
  Layout,
  theme,
} from "antd";


const { Content, Sider } = Layout;



const Cart = () => {
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
              margin: "16px 0"
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
            <h1>My Shopping Cart</h1>
            {/* <SearchBar /> */}
            <CartTable />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default Cart;
