import React from "react";
import "../index.css";
import SearchBar from "../components/SearchBar";
import CarouselBox from "../components/Carousel";
import AdminMenuBar from "../components/AdminMenuBar";
import MenuBar from "../components/MenuBar";
import MyHeader from "../components/MyHeader";
import {
  Breadcrumb,
  Layout,
  theme,
} from "antd";
import AdminBookShelf from "../components/AdminBookshelf";
import BookHotSellingList from "../components/BookHotSellingList";



const {  Content, Sider } = Layout;



const AdminHome = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  return (
    <Layout>
      <MyHeader/>
      <Layout>
          <AdminMenuBar />
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
            <CarouselBox />
            <AdminBookShelf/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default AdminHome;
