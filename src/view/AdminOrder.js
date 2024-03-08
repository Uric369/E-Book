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
import AdminOrderTable from "../components/AdminOrderTable";


const {  Content, Sider } = Layout;



const AdminOrder = () => {
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
           <AdminOrderTable/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default AdminOrder;
