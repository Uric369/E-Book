import { DatePicker, Space, Button, Table,Avatar,Row,Col } from 'antd';
import React, { useState } from 'react';
import { getUserSpendingList } from '../services/userService';
import { getPchsStatsByBook } from '../services/userService';
import { getPchsStatsByBook2 } from '../services/userService';

import { Card } from 'antd';
const { RangePicker } = DatePicker;

const UsrPchsStatsByBook = () => {

  const [bookList, setBookList] = useState([]);
  const [sum, setSum] = useState(null);
  const [selectedDates, setSelectedDates] = useState(null);



  const generatePchsStatsByBook = () => {
    if (selectedDates && selectedDates.length === 2) {
        const startTime = selectedDates[0].startOf('day').toISOString().replace('T', ' ');
        const endTime = selectedDates[1].endOf('day').toISOString().replace('T', ' ');
        const userData = JSON.parse(localStorage.getItem("user"));
      console.log(startTime);
      console.log(endTime);
      getPchsStatsByBook(userData.userId,startTime, endTime, (data) => {
        // 添加 ranking 属性到每个书籍对象
        console.log("enter generate");
        const booksWithRanking = data.map((book, index) => ({ ...book, ranking: index + 1 }));
        setBookList(booksWithRanking);
        console.log(booksWithRanking);
      });
    }
  };

  const generatePchsStatsByBook2 = () => {
    if (selectedDates && selectedDates.length === 2) {
        const startTime = selectedDates[0].startOf('day').toISOString().replace('T', ' ');
        const endTime = selectedDates[1].endOf('day').toISOString().replace('T', ' ');
        const userData = JSON.parse(localStorage.getItem("user"));
      console.log(startTime);
      console.log(endTime);
      getPchsStatsByBook2(userData.userId,startTime, endTime, (data) => {
        // 添加 ranking 属性到每个书籍对象
        console.log("enter generate");
        setSum(data);
        console.log(data);
      });
    }
  };

  const generate=()=>{
    generatePchsStatsByBook();
    generatePchsStatsByBook2();
  }
  ;
//   http://nage1.com.cn/costrank/index.jsp
const columns = [
    {
      title: '排名',
      dataIndex: 'ranking',
      key: 'ranking',
      render: (text, record) => {
        if (record.ranking === 1) {
          return <img
            style={{
              width: 'auto',
              height: '70px',
              objectFit: 'contain',
            }}
            src="http://mms0.baidu.com/it/u=22999817,2083799845&fm=253&app=138&f=GIF&fmt=auto&q=75?w=261&h=220" alt="Ranking Image" />;
        } else if (record.ranking === 2) {
          return <img 
            style={{
              width: 'auto',
              height: '70px',
              objectFit: 'contain',
            }}
            src="http://mms2.baidu.com/it/u=4214567968,3706339068&fm=253&app=138&f=GIF&fmt=auto&q=75?w=261&h=220" alt="Ranking Image" />;
        } else if (record.ranking === 3) {
          return <img 
            style={{
              width: 'auto',
              height: '70px',
              objectFit: 'contain',
            }}
            src="http://mms2.baidu.com/it/u=1807320553,3334512950&fm=253&app=138&f=GIF&fmt=auto&q=75?w=261&h=220" alt="Ranking Image" />;
        } else {
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* <div style={{ fontSize: 20, marginRight: 8 }}>{text}</div> */}
              <Avatar style={{ marginLeft: 24, backgroundColor: 'orange', fontSize: 24 }}>{text}</Avatar>
            </div>
          );
        }
      },
    },
    {
      title: '封面',
      dataIndex: 'bookcover',
      key: 'bookcover',
      render: (text) => (
        <div style={{ textAlign: 'center' }}>
          <img src={text} style={{ width: 'auto', height: '70px', objectFit: 'contain' }} />
        </div>
      ),
    },
    {
      title: '书名',
      dataIndex: 'bookname',
      key: 'bookname',
      render: (text) => (
        <span style={{ color: 'black', fontWeight: 'bold' }}>{text}</span>
      ),
    },
    {
      title: '总量',
      dataIndex: 'total',
      key: 'total',
      render: (text) => (
        <span style={{ color: 'red', fontWeight: 'bold' }}>{text}</span>
      ),
    }
  ];
  
  

  return (
   

// ...

<Row style={{ justifyContent: 'center' }}>
  <Col span={8} style={{ marginRight: '16px' }}>
    <RangePicker
      showTime
      onChange={(dates) => setSelectedDates(dates)}
      style={{ marginBottom: '16px', marginTop: '16px' }}
    />
    <Button
      type="primary"
      onClick={() => generate(selectedDates)}
      style={{ width: '100px', marginBottom: '24px' }}
    >
      统计
    </Button>
    <Card
  title="总消费"
  style={{
    height: '240px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}
>
  {/* 显示总消费的内容 */}
  {sum !== null && (
    <p style={{ fontSize: '60px', fontWeight: 'bold', color: 'orange' }}>
      ${sum.sumSpending.toFixed(2)}
    </p>
  )}
</Card>

<Card
  title="总购书量"
  style={{
    height: '240px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}
>
  {/* 显示总购书量的内容 */}
  {sum !== null && (
    <p style={{ fontSize: '60px', fontWeight: 'bold', color: 'orange' }}>
      {sum.sumBooks}本
    </p>
  )}
</Card>


  </Col>
  <Col span={12} style={{ marginLeft: '32px' }}>
   
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Space direction="vertical" size={12}>
        <Card style={{ boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}>
        <h1>购书情况</h1>
          <Table
            columns={columns}
            dataSource={bookList}
            pagination={false}
            rowClassName="row-height"
            style={{ width: '550px',minHeight:"400px" }} // 根据需要调整宽度
          />
        </Card>
      </Space>
    </div>
  </Col>
</Row>

  
   
  );
};

export default UsrPchsStatsByBook;
