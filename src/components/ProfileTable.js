import { Button, Descriptions, Radio,Empty } from "antd";
import React from "react";
import tx from "../assets/tx.JPG";
import Link from "antd/es/typography/Link";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import "../index.css";
import SelectAvater from "../components/ProfileSelectAvater";
import { getUserByUserId } from "../services/userService";



const ProfileTable = () => {

  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true); // 定义isLoading来判断异步请求是否完成
  const userData = JSON.parse(localStorage.getItem("user"));
 
  if (userData !== null && isLoading && userData.userId !== null) {
    getUserByUserId(userData.userId, (data) => {
      if (data.nickname !== null) {
        setUser(data);
        setIsLoading(false);
      }
    });
  }

  // console.log("user");
  // console.log(user);

  const [size, setSize] = useState("default");
  const onChange = (e) => {
    console.log("size checked", e.target.value);
    setSize(e.target.value);
  };
  console.log("111");
  console.log(userData);
  return (
    <div>
    {!userData ?
    (  <div>
      <Empty description={<span>No Data</span>}>
      <Button type="primary" size="large" href="/">
            Please log in first
          </Button>
    </Empty>
    </div>):
      (
          <div>
      <Radio.Group onChange={onChange} value={size}>
        <Radio value="default">default</Radio>
        <Radio value="middle">middle</Radio>
        <Radio value="small">small</Radio>
      </Radio.Group>
      <br />
      <br />
      <Descriptions
        bordered
        title="Personal Information"
        size={size}
        extra={<Button type="primary">Edit</Button>}
      >
        <Descriptions.Item label="Name">{user.username}</Descriptions.Item>
        <Descriptions.Item label="Nickname">
        {user.nickname}
        </Descriptions.Item>
        <Descriptions.Item label="">
        </Descriptions.Item>
        <Descriptions.Item label="Age">{user.age}</Descriptions.Item>
        <Descriptions.Item label="Phone Number">{user.tel}</Descriptions.Item>
        <Descriptions.Item label="Mail">
        {user.mail}
        </Descriptions.Item>
        <Descriptions.Item label="Address 1">
        {user.address1}
        </Descriptions.Item>
        <Descriptions.Item label="Address 2">
        {user.address2}
        </Descriptions.Item>
        <Descriptions.Item label="Address 3">
        {user.address3}
        </Descriptions.Item>
        <Descriptions.Item label="Avatar">
          <img class="AvaterImg" src={user.avatar} alt="" />
          <SelectAvater />
        </Descriptions.Item>
      </Descriptions>
      <br />
      <br />
    </div>
      )
}
    </div>
  );
};
export default ProfileTable;
