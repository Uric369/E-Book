import { DatePicker, Space, Button, Table,Avatar } from 'antd';
import React, { useState } from 'react';
import { getUserSpendingList } from '../services/userService';
import { getPchsStatsByBook } from '../services/userService';
import { getPchsStatsByBook2 } from '../services/userService';

const { RangePicker } = DatePicker;

const UsrPchsStats = () => {

  const [info, setInfo] = useState(null);
  const [selectedDates, setSelectedDates] = useState(null);



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
        setInfo(data);
        console.log(data);
      });
    }
  };

  
  

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Space direction="vertical" size={12}>
      <RangePicker showTime onChange={(dates) => setSelectedDates(dates)} />
      <Button
        type="primary"
        onClick={() => generatePchsStatsByBook2(selectedDates)}
        style={{ width: 100 }}
      >
        统计
      </Button>
      //to be added
    </Space>
  </div>
  );
};

export default UsrPchsStats;
