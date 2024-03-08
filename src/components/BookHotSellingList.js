import { DatePicker, Space, Button, Table,Avatar } from 'antd';
import React, { useState } from 'react';
import { getBookHotSellingList } from '../services/bookService';

const { RangePicker } = DatePicker;

const BookHotSellingList = () => {

  const [bookList, setBookList] = useState([]);
  const [selectedDates, setSelectedDates] = useState(null);



  const generateHotSellingList = () => {
    if (selectedDates && selectedDates.length === 2) {
      const startTime = selectedDates[0].startOf('day').toISOString().replace('T', ' ');
      const endTime = selectedDates[1].endOf('day').toISOString().replace('T', ' ');

      console.log(startTime);
      console.log(endTime);
      getBookHotSellingList(startTime, endTime, (data) => {
        // 添加 ranking 属性到每个书籍对象
        const booksWithRanking = data.map((book, index) => ({ ...book, ranking: index + 1 }));
        setBookList(booksWithRanking);
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
      title: '书籍封面',
      dataIndex: 'bookCover',
      key: 'bookCover',
      render: (cover) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src={cover}
            alt="Book Cover"
            style={{
              width: 'auto',
              height: '70px',
              objectFit: 'contain',
            }}
          />
        </div>
      ),
    },
    {
      title: '书籍名',
      dataIndex: 'bookName',
      key: 'bookName'
    },
    {
      title: 'ISBN编号',
      dataIndex: 'isbn',
      key: 'isbn'
    },
    {
      title: '销量',
      dataIndex: 'sale',
      key: 'sale',
      render: (text) => (
        <span style={{ color: 'red', fontWeight: 'bold' }}>{text}</span>
      ),
    }
  ];
  

  return (
    <Space direction="vertical" size={12}>
    <RangePicker showTime onChange={(dates) => setSelectedDates(dates)} />
    <Button
      type="primary"
      onClick={() => generateHotSellingList(selectedDates)}
      style={{ width: 100 }}
    >
      生成
    </Button>
    <Table
      columns={columns}
      dataSource={bookList}
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

export default BookHotSellingList;
