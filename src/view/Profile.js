import React from "react";
import "../index.css";
import ProfileTable from "../components/ProfileTable";
import MenuBar from "../components/MenuBar";
import {
  Breadcrumb,
  Layout,
  theme,
} from "antd";
import MyHeader from "../components/MyHeader";



const { Content, Sider } = Layout;


const Profile = () => {
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
            <h1>My Profile</h1>
            <ProfileTable />
            {/* <Address/> */}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default Profile;
