import { Link } from "react-router-dom";
import React from "react";
import {
  ProfileOutlined,
  ReadOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
  SafetyCertificateOutlined,
  UserAddOutlined,
  AreaChartOutlined,
  DeliveredProcedureOutlined
} from "@ant-design/icons";
import { Menu, theme } from "antd";
import "../index.css";
import {
  Layout,
} from "antd";




const {  Sider } = Layout;

const items = [
  getItem(" Book Admin", "1", <ReadOutlined />, "/Homepage"),
  // getItem("My Cart", "2", <ShoppingCartOutlined />, "/Cart"),
  // getItem("My Orders", "3", <SafetyCertificateOutlined />, "/Order"),
  // getItem("My Profile", "4", <ProfileOutlined />, "/Profile")
  getItem(" Book Recycle Bin", "2", <DeleteOutlined />, "/AdminDelBooks"),
  getItem(" User Admin", "3", <UserAddOutlined />, "/AdminUserList"),
  getItem(" Order Admin", "4", <DeliveredProcedureOutlined />, "/AdminOrder"),
  getItem(" Statistics", "5", < AreaChartOutlined />, "/AdminStatistics"),
];

function getItem(label, key, icon, href) {
  return {
    key,
    icon,
    href,
    label
  };
}

const AdminMenuBar = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  return(
  <Sider
  width={300}
  style={{
    background: colorBgContainer
  }}
>
  <Menu
    mode="inline"
    defaultSelectedKeys={["1"]}
    defaultOpenKeys={["sub1"]}
    style={{
      height: "100%",
      borderRight: 0,
      padding: 20
    }}
  >
    {items.map((item) => (
      <Menu.Item key={item.key}>
        <Link to={item.href}>
          {item.icon}
          {item.label}
        </Link>
      </Menu.Item>
    ))}
  </Menu>
  </Sider>
);
    };

export default AdminMenuBar;
