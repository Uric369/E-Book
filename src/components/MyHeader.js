import React from "react";
import "../index.css";
import BookStoreLogo from "../assets/sd.jpg";
import {
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Layout,
  Typography,
  Input,
} from "antd";
import * as userService from "../services/userService";
import  { useState, useEffect } from "react";
import "../css/HomeView.css";
import { getUserByUserId } from "../services/userService";
import { Button,Tag } from "antd";
import { Link } from "react-router-dom";
import { history } from "../utils/history";

const { Header, Content } = Layout;
const { Search } = Input;

const MyHeader = () => {
  const [selectedKey, setSelectedKey] = useState("home");
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true); // 定义isLoading来判断异步请求是否完成
  const [isLoading2, setIsLoading2] = useState(true); // 定义isLoading来判断异步请求是否完成

  const userData = JSON.parse(localStorage.getItem("user"));
  

  if (isLoading && userData !== null && userData.userId !== null) {
    getUserByUserId(userData.userId, (data) => {
      //console.log(data);
     // setIsLoading(true);
      if (data.nickname !== null) {
        setUser(data);
       //localStorage.setItem('userInfo', JSON.stringify(data));
        setIsLoading(false);
       // window.location.reload();
      }
    });
  }
 
  console.log("user");
  console.log(user);

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser({ userId: null });
    if (isLoading2 === true) {
      if (user.userId !== null) {
        setIsLoading2(false);
      }
    }
    console.log("logout button is clicked");
    
    userService.logout();
    setTimeout(() => {
      // history.push("/");
      history.push('/Homepage');
      window.location.reload();
  }, 10000); // 1000毫秒 = 1秒
  };

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div style={{ float: "left" }}>
        <Link to="/Homepage">
        <img 
  className="my-logo" 
  src={BookStoreLogo}
/>
        </Link>
       
        </div>
        <div>
        {/* <Typography.Title className="my-header" level={2} style={{ margin: 0 }}>
           Book Store
        </Typography.Title> */}
         <h-white style={{ margin: "0px 16px 0px 0px" }}>Welcome Back to BookStore</h-white>
        </div>
        <div style={{ float: "right" }}>
          {isLoading | !userData ? (
            <div>
              <h-white style={{ margin: "0px 16px 0px 0px" }}>Hello!</h-white>
              <UserOutlined
                style={{ margin: "0px 8px", color: "#fff", fontSize: "20px" }}
              />
              <Button type="link" href="/">
               Log In
              </Button>
            </div>
          ) : (
            <div>
      {userData.userType === 0 ? (
        <div>
          <Tag color="#f50">管理员</Tag>
          <Avatar src={user.avatar} style={{ margin: "0px 8px" }} />
          <h2-white style={{ marginLeft: "8px" }}>
            Hello，{user.nickname}！
          </h2-white>
          <Button onClick={handleLogout} style={{ marginLeft: "8px" }}>
            Log Out
          </Button>
        </div>
      ) : (
        <div>
          <Avatar src={user.avatar} style={{ margin: "0px 8px" }} />
          <h2-white style={{ marginLeft: "8px" }}>
            Hello，{user.nickname}！
          </h2-white>
          <Button onClick={handleLogout} style={{ marginLeft: "8px" }}>
            Log Out
          </Button>
        </div>
      )}
    </div>
          )}
        </div>
      </Header>
    </Layout>
  );
};

export default MyHeader;
