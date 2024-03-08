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
import DelBookList from "../components/DelBookList";
import { Link } from "react-router-dom";
import {Empty,Button,Radio,Row,Col} from "antd";
import UserSpendingList from "../components/UserSpendingList";
import BookHotSellingList from "../components/BookHotSellingList";



const {  Content, Sider } = Layout;



const AdminStatistics = () => {
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


const {
  token: { colorBgContainer }
} = theme.useToken();
return (
  <Layout>
    <MyHeader/>
    <Layout>
      <AdminMenuBar />
      <Layout style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
        <Content
            style={{
              padding: 50,
              margin: 0,
              minHeight: 800,
              background: colorBgContainer,
            }}
          >
            <Row style={{ justifyContent: 'center' }}>
  <Col span={12}>
    <h1>书籍热销榜</h1>
    {/* 左边的内容 */}
    <BookHotSellingList/>
  </Col>
  <Col span={12}>
    <h1>用户消费榜</h1>
    {/* 右边的内容 */}
    <UserSpendingList/>
  </Col>
</Row>

          </Content>
      </Layout>
    </Layout>
  </Layout>
);
};
export default AdminStatistics;
