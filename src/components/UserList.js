import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton } from 'antd';
import { UserOutlined } from "@ant-design/icons";
import { getAllUserAuth } from '../services/userService';
import { disableUser,unblockUser } from '../services/userService';
import { message } from 'antd';
const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [adminList, setAdminList] = useState([]);

  useEffect(() => {
    getAllUserAuth({ search: null }, (data) => {
      const userList = data.filter((user) => user.userType === 1);
      const adminList = data.filter((user) => user.userType === 0);
      setUserList([...userList]);
      setAdminList([...adminList]);
    });
  }, []);

  const handleDisableClick = (userId) => {
    
      if (window.confirm("Are you sure to disable this user?")) {
        disableUser(userId, (data) => {
          console.log("carddelte");
          console.log(data);
          // 刷新页面或更新状态等操作
          if (data.status >= 0) {
            message.success({
              content: data.msg,
              duration: 4, // 持续时间
              style: {
                marginTop: '55vh',
                marginLeft: '40vh' // 设置消息框距离顶部的距离
              }
            });
          } else {
            message.error({
              content: data.msg,
              duration: 4,
              style: {
                marginTop: '55vh',
                marginLeft: '40vh' // 设置消息框距离顶部的距离
              }
            });
          }
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }

  };

  const handleEnableClick = (userId) => {
    if (window.confirm("Are you sure to unblock this user?")) {
      unblockUser(userId, (data) => {
        console.log(data);
        // 刷新页面或更新状态等操作
        if (data.status >= 0) {
          message.success({
            content: data.msg,
            duration: 4, // 持续时间
            style: {
              marginTop: '55vh',
                marginLeft: '40vh'  // 设置消息框距离顶部的距离
            }
          });
        } else {
          message.error({
            content: data.msg,
            duration: 4,
            style: {
              marginTop: '55vh',
                marginLeft: '40vh' // 设置消息框距离顶部的距离
            }
          });
        }
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <div>
      <div style={{ float: 'left', width: '50%' }}>
  <h2>用户</h2>
  <List
    className="demo-loadmore-list"
    itemLayout="horizontal"
    style={{ width: '65%' }}
    dataSource={userList}
    renderItem={(item) => (
      <List.Item
        actions={[
          item.userStatus === 0 ? (
            <Button onClick={() => handleDisableClick(item.userId)}>Disable</Button>
          ) : (
            <Button onClick={() => handleEnableClick(item.userId)} className="unblock-button">Unblock</Button>
          ),
        ]}
        className={item.userStatus === 1 ? "disabled-user" : ""}
      >
        <List.Item.Meta
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar icon={item.userId} /> {/* Use userID as the icon for the Avatar */}
              <div style={{ marginLeft: '10px' }}>
                <a href="https://ant.design">{item.username}</a>
                <div>User ID: {item.userId}</div>
              </div>
              {item.userStatus === 1 && <div className="disabled-label"
  style={{ backgroundColor: 'purple', color: 'white', padding: '5px', borderRadius: '4px', marginLeft: '30px' }}>
  Disabled
</div>}
 </div>
          }
        />
      </List.Item>
    )}
  />
</div>
      <div style={{ width: '20px' }}></div>
      <div style={{ float: 'right', width: '50%' }}>
        <h2>管理员</h2>
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={adminList}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar icon={item.userId} /> {/* Use userID as the icon for the Avatar */}
                    <div style={{ marginLeft: '10px' }}>
                      <a href="https://ant.design">
                        {item.username}
                      </a>
                      <div>User ID: {item.userId}</div>
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
      <div style={{ clear: 'both' }}></div>
    </div>
  );
}

export default UserList;
