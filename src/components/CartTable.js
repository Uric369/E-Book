import { Space, Table, Tag } from "antd";
import "../index.css";
import { getCartsByUser } from "../services/cartService";
import { Cascader, InputNumber } from "antd";
import { addOrder } from "../services/orderService";
import { message, Popconfirm, Empty } from 'antd';
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import React, { useState, useEffect } from 'react';
import { getUserByUserId } from "../services/userService";
import { Card, List, Button, Modal } from 'antd';
import { removeCartsByUser } from "../services/cartService";

const confirm = (e) => {
  console.log(e);
  message.success('Click on Yes');
};

const cancel = (e) => {
  console.log(e);
  message.error('Click on No');
};

const { Column, ColumnGroup } = Table;

const CartTable = () => {
  const [carts, setCarts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")));
  const [userInfo, setUserInfo] = useState(null);
  const [orderInfo, setOrderInfo] = useState(null);

  const [customAddressVisible, setCustomAddressVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");



  

  useEffect(() => {
    if (userData) {
      getCartsByUser({ search: userData.userId }, (data) => {
        setCarts([...data]);
      });
    }
  }, [userData]);

  useEffect(() => {
    if (userInfo) {
      const updatedOrderInfo = { ...orderInfo };
  
      // 如果 userInfo.tel 存在，则将其设置为 orderInfo.contactPhone
      if (userInfo.tel) {
        updatedOrderInfo.contactPhone = userInfo.tel;
      }
  
      // 如果 userInfo.nickname 存在，则将其设置为 orderInfo.addressee
      if (userInfo.nickname) {
        updatedOrderInfo.addressee = userInfo.nickname;
      }

      if (userInfo.address1) {
        updatedOrderInfo.serviceAddress = userInfo.address1;
      }
  
      setOrderInfo(updatedOrderInfo);
    }
  }, [userInfo]);

  const handleAmountChange = (value, record) => {
    const updatedCarts = carts.map((cart) => {
      if (cart.id === record.id) {
        return {
          ...cart,
          amount: value,
          
        };
      }
      return cart;
    });

    setCarts(updatedCarts);
  };

  const calculateTotalPrice = () => {
    let total = 0;
    for (const cart of carts) {
      total += cart.amount * cart.price;
    }
    setTotalPrice(total);
  };
  
  useEffect(() => {
    calculateTotalPrice();
  }, [carts]);

  // const handlePurchaseClick = (record) => {
  //   const { amount } = record;
  //   const { id, name, cover, price } = record;
  //   const userData = JSON.parse(localStorage.getItem("user"));
  //   const orderDto = {
  //     userId: userData.userId,
  //     bookId: id,
  //     bookname: name,
  //     bookcover: cover,
  //     amount: amount,
  //     price: price * amount,
  //   };
  //   addOrder(orderDto, (data) => {
  //     console.log(orderDto);
  //     console.log(data);
  //   });
  // };

  // const showModal = () => {
  //   if (userData !== null && isLoading && userData.userId !== null) {
  //     getUserByUserId(userData.userId, (data) => {
  //       if (data.nickname !== null) {
  //         setUserInfo(data);
  //         setIsModalVisible(true);
  //         setIsLoading(false);
  //       }
  //     });
  //   }
  // };

  const showModal = () => {
    setIsLoading(true); // Reset isLoading state
    
    if (userData !== null && userData.userId) {
      getUserByUserId(userData.userId, (data) => {
        if (data.nickname !== null) {
          setUserInfo(data);
          setIsModalVisible(true);
          setIsLoading(false);
        }
      });
    }
  };
  
  useEffect(() => {
    if (isModalVisible && userData !== null && userData.userId) {
      setIsLoading(true);
  
      getUserByUserId(userData.userId, (data) => {
        if (data.nickname !== null) {
          setUserInfo(data);
          setIsLoading(false);
        }
      });
    }
  }, [isModalVisible, userData]);
  

  const closeModal = () => {
    setIsModalVisible(false);
  };
  
  const handleOrderClick = () => {
    if (!userData) {
      message.error('Please log in first');
      return;
    }
  
    const order = {
      userId: userData.userId,
      price: totalPrice.toFixed(2),
      address: orderInfo.serviceAddress,
      receiver: orderInfo.addressee,
      contactPhone: orderInfo.contactPhone
    };
  
    const orderItems = carts.map(cart => ({
      bookId: cart.bookId,
      quantity: cart.amount,
      subTotal: (cart.amount * cart.price).toFixed(2)
    }));
    console.log("selected orderItems here");
    console.log(orderItems);
  
    addOrder({ order, orderItems }, (data) => {
      console.log(data);
      // 处理成功或错误响应
      if (data.status >= 0) {
        removeCartsByUser(userData.userId, (response) => {
          if (response.status >= 0) {
            message.success({
              content: response.msg,
              duration: 4, // 持续时间
              style: {
                marginTop: '55vh',
                marginLeft: '40vh' // 设置消息框距离顶部的距离
              }
            });
          } else {
            message.error({
              content: response.msg,
              duration: 4,
              style: {
                marginTop: '55vh',
                marginLeft: '40vh'  // 设置消息框距离顶部的距离
              }
            });
          }
        });
      } else {
        message.error({
          content: data.msg,
          duration: 4,
          style: {
            marginTop: '55vh',
            marginLeft: '40vh'  // 设置消息框距离顶部的距离
          }
        });
      }
    });

    removeCartsByUser(userData.userId, (response) => {
      if (response.status >= 0) {
        message.success({
          content: response.msg,
          duration: 4, // 持续时间
          style: {
            marginTop: '55vh',
            marginLeft: '40vh' // 设置消息框距离顶部的距离
          }
        });
      } else {
        message.error({
          content: response.msg,
          duration: 4,
          style: {
            marginTop: '55vh',
            marginLeft: '40vh'  // 设置消息框距离顶部的距离
          }
        });
      }
    });
  

    setTimeout(() => {
      window.location.reload();
    }, 1000);



  };
  
  const handleAddressChange = (event) => {
    const selectedValue = event.target.value;
  
    // 如果选择了 "Custom"，则显示自定义地址输入框
    if (selectedValue === "custom") {
      setCustomAddressVisible(true);
    } else {
      setCustomAddressVisible(false);
      // 如果选择了预定义地址，则使用预定义地址的值
      const customAddress = selectedValue === "custom" ? document.getElementById("custom-address").value : "";
  
      setOrderInfo({ ...orderInfo, serviceAddress: customAddress });
    }
  
  };

  
 

  return (
    <div>
      {!userData ? (
        <div>
          <Empty description={<span>No Data</span>}>
            <Button type="primary" size="large">
              <Link to="/">Please log in first</Link>
            </Button>
          </Empty>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <SearchBar />
            </div>
            <div>
              <Button onClick={showModal} style={{ backgroundColor: 'red', color: 'white' }}>清空购物车</Button>
            </div>
          </div>
          <Table dataSource={carts} style={{ marginTop: '20px' }}>
            <Column title="Book" dataIndex="bookname" key="bookname" />
            <Column
              title="Cover"
              dataIndex="bookcover"
              key="bookcover"
              render={(cover) => (
                <img src={cover} alt="" style={{ height: "150px" }} />
              )}
            />
            <Column
              title="Amount"
              dataIndex="amount"
              key="amount"
              render={(amount, record) => (
                <Space direction="vertical">
                  <InputNumber
                    addonBefore="+"
                    defaultValue={amount}
                    onChange={(value) => handleAmountChange(value, record)}
                  />
                </Space>
              )}
            />

<Column
  title="Subtotal"
  dataIndex="subTotal"
  key="subTotal"
  render={(subTotal, record) => (
    <span>${(record.amount * record.price.toFixed(2))}</span>
  )}
/>


            <Column
              title="Action"
              key="action"
              render={(_, record) => (
                <Space size="middle">
                  <Popconfirm
                    title="Delete"
                    description="Are you sure to delete this from cart?"
                    onconfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                    >
                    <Button type="link">Delete</Button>
                    </Popconfirm>
                    </Space>
                    )}
                    />
                    </Table>
                    
                    <Modal title="Order Details" visible={isModalVisible} onCancel={closeModal} footer={null}>
      <List
        itemLayout="horizontal"
        dataSource={carts}
        renderItem={(item) => {
          const subtotal = item.amount * item.price;
          console.log("subtotal update");
          console.log(subtotal);
          return (
            <List.Item>
              <List.Item.Meta
                avatar={<img src={item.bookcover} alt={item.bookname} style={{ width: 80 }} />}
                title={item.bookname}
                description={`quantity：${item.amount} subtotal：$${subtotal}`}
              />
            </List.Item>
          );
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
<span style={{ color: 'red', fontWeight: 'bold' }}>Total price：${totalPrice.toFixed(2)}</span>
        {/* <Button type="primary" onClick={showModal}>订单详情</Button> */}
        {/* <p>Contact number：{userData && userData.tel}</p> */}
      </div>

      {userInfo && (
        <form style={{  marginTop: 16,marginBottom:16 }}>
        <div >
          <label htmlFor="nickname">Addressee: </label>
          <input type="text" id="nickname" name="nickname" value={userInfo.nickname} onChange={(e) => setOrderInfo({ ...orderInfo, addressee: e.target.value })} />
        </div>
        <div>
          <label htmlFor="tel">Contact number: </label>
          <input type="tel" id="tel" name="tel" value={userInfo.tel} onChange={(e) => setOrderInfo({ ...orderInfo, contactPhone: e.target.value })} />
        </div>
        <div>
      <label htmlFor="address">Service address: </label>
      <select id="address" name="address" value={selectedAddress} onChange={handleAddressChange}>
  <option value={userInfo.address1}>{userInfo.address1}</option>
  <option value={userInfo.address2}>{userInfo.address2}</option>
  <option value={userInfo.address3}>{userInfo.address3}</option>
  <option value="custom">Custom</option> 
</select>
      {customAddressVisible && (
        <input type="text" id="custom-address" name="custom-address" placeholder="Enter custom address" />
      )}
    </div>
      </form>
      
      
      )}
       <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
    <Button type="primary" onClick={handleOrderClick}>确定下单</Button>
  </div>
    </Modal>
                        </div>
                      )}
                    </div>
                    );
                    };
                    
                    export default CartTable;