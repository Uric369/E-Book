import { DatePicker, Space, Button, Table,Avatar } from 'antd';
import React, { useState } from 'react';
import { getUserSpendingList } from '../services/userService';

const { RangePicker } = DatePicker;

const UserSpendingList = () => {

  const [userList, setUserList] = useState([]);
  const [selectedDates, setSelectedDates] = useState(null);



  const generateUserSpendingList = () => {
    if (selectedDates && selectedDates.length === 2) {
        const startTime = selectedDates[0].startOf('day').toISOString().replace('T', ' ');
        const endTime = selectedDates[1].endOf('day').toISOString().replace('T', ' ');
  
      console.log(startTime);
      console.log(endTime);
      getUserSpendingList(startTime, endTime, (data) => {
        // 添加 ranking 属性到每个书籍对象
        console.log("enter generate");
        const usersWithRanking = data.map((user, index) => ({ ...user, ranking: index + 1 }));
        setUserList(usersWithRanking);
        console.log(usersWithRanking);
      });
    }
  };
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
            return  <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* <div style={{ fontSize: 20, marginRight: 8 }}>{text}</div> */}
            <Avatar style={{ marginLeft:24,backgroundColor: 'orange', fontSize: 24 }}>{text}</Avatar>
          </div>
          }
        },
      },
      {
        title: '头像',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text) => (
          <div style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Avatar size={80} src={text} alt="Book Cover" />
          </div>
        ),
      },
        {
            title: '用户',
            dataIndex: 'username',
            key: 'username',
            render: (text) => (
              <span style={{ color: 'black', fontWeight: 'bold' }}>{text}</span>
            ),
          },
    {
      title: '消费',
      dataIndex: 'spending',
      key: 'spending',
      render: (text) => (
        <span style={{ color: 'red', fontWeight: 'bold' }}>${text.toFixed(2)}</span>
      ),
    }
  ];
  

  return (
    <Space direction="vertical" size={12}>
    <RangePicker showTime onChange={(dates) => setSelectedDates(dates)} />
    <Button
      type="primary"
      onClick={() => generateUserSpendingList(selectedDates)}
      style={{ width: 100 }}
    >
      生成
    </Button>
    <Table
      columns={columns}
      dataSource={userList}
      pagination={false}
      rowClassName="row-height"
      style={{
        width: '450px',
        margin: '0 auto', 
        maxLines:'10'// 设置水平居中
      }}
    />
  </Space>
  );
};

export default UserSpendingList;
