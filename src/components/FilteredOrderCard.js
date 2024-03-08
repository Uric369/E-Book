import React, { useState,useEffect } from 'react';
import { Card, List, Button, Modal } from 'antd';
import { getOrderItemsWithDetailsByOrder } from '../services/orderService';


const FilteredOrderCard = ({ order, subString }) => {
  // 在这里可以使用order和subString参数
  const { orderId, totalPrice, receiver, address, contactPhone, orderStatus, ordertime } = order;

  console.log("Filtered substring");
  console.log(subString);
  const [isLoading, setIsLoading] = useState(true);
  const [orderItems, setOrderItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchOrderItems = () => {
      getOrderItemsWithDetailsByOrder(orderId, (data) => {
        console.log("current orderId");
        console.log(orderId);
        if (data !== null) {
          setOrderItems([...data]);
          console.log(data);
          setIsLoading(false);
        }
      });
    };

    fetchOrderItems();
  }, [orderId]);


  
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Card
      title={`Order Number ${orderId}   |   Order Time：${ordertime}`}
      style={{ marginBottom: 24 }}
      headStyle={{ paddingRight: '20px' }} // 添加右边内边距来增加间距
    >
      <List
        itemLayout="horizontal"
        dataSource={orderItems}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<img src={item.bookCover} alt={item.bookname} style={{ height: "100px" ,width:"80px" }} />}
              title={item.bookname}
              description={`quantity：${item.quantity} subtotal：$${item.subTotal}`}
            />
          </List.Item>
        )}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
        <span style={{ color: 'red', fontWeight: 'bold' }}>Total price：${totalPrice}</span>
        <Button type="primary" onClick={showModal} style={{ marginLeft: '600px' }}>订单详情</Button> {/* 添加onClick事件来显示模态框 */}
        {orderStatus === 0 && (
          <Button type="primary">Confirm receipt of goods</Button>
        )}
        {orderStatus === 1 && (
          <span>√ Completed</span>
        )}
        {orderStatus === 2 && (
          <span>× Cancelled</span>
        )}
      </div>

      {/* 模态框内容 */}
      <Modal title="Order Details" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <p>Order time：{ordertime}</p>
        <p>Addressee：{receiver}</p>
        <p>Contact number：{contactPhone}</p>
        <p>Service address：{address}</p>
      </Modal>
    </Card>
  );
};

export default FilteredOrderCard;
