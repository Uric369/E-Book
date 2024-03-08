import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";
import "../index.css";
import { getOrdersByUser } from "../services/orderService";
import { Button, message, Empty } from 'antd';
import SearchBar from "./SearchBar";
import OrderCard from "./OrderCard";
import { DatePicker } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import FilteredOrderCard from "./FilteredOrderCard";
import { getAllOrdersByBookName } from "../services/orderService";
import { getAllOrdersByTime } from "../services/orderService";
import { getAllOrders } from "../services/orderService";
const { RangePicker } = DatePicker;
const { Search } = Input;

const AdminOrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [searchType, setSearchType] = useState('default');

  const [selectedDates, setSelectedDates] = useState(null);
  const [subString, setSubString] = useState(null);
  const userData = JSON.parse(localStorage.getItem("user"));
  const [FilteredOrders, setFilteredOrders] = useState([]);
  const [showFilteredOrders, setShowFilteredOrders] = useState(false);
  

  useEffect(() => {
    if (userData) {
      getAllOrders( null,(data) => {
        setOrders(data);
        setFilteredOrders(data);
        console.log("让我看看id");
        console.log(data);
        console.log(FilteredOrders);
        console.log(orders);
      });
    }
  }, []);


  const SearchBookName = (subString) => {
    getAllOrdersByBookName( subString, (data) => {
      setFilteredOrders(null);
      setFilteredOrders(data);
      // setOrders([...data]);
      setShowFilteredOrders(true);
    });
  };

  const SearchDefault = (subString) => {
    getAllOrders( null, (data) => {
      setFilteredOrders(null);
      setFilteredOrders(data);
      setShowFilteredOrders(true);
    });
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);

    if (e.target.value === 'default') {
      SearchDefault();
    }
  };

  const SearchTime = () => {
    if (selectedDates && selectedDates.length === 2) {
      const startTime = selectedDates[0].startOf('day').toISOString().replace('T', ' ');
      const endTime = selectedDates[1].endOf('day').toISOString().replace('T', ' ');

    console.log(startTime);
    console.log(endTime);
    getAllOrdersByTime( startTime,endTime, (data) => {
      setFilteredOrders(data);
      setShowFilteredOrders(true);
    });
  };
  };
  

  return (
    <div>
      {!userData ? (
        <div>
          <Empty description={<span>No Data</span>}>
            <Link to="/">
              <Button type="primary" size="large">
                Please log in first
              </Button>
            </Link>
          </Empty>
        </div>
      ) : (
        <div>
        <select
        value={searchType}
        onChange={handleSearchTypeChange} // 调用 handleSearchTypeChange 函数
        defaultValue="default"
        style={{ marginBottom: '10px' }}
      >
        <option value="default">Default</option>
        <option value="title">Search for Book Title</option>
        <option value="timeRange">Search for Time Range</option>
      </select>


{searchType === 'title' && (
  <Space direction="vertical">
    <Search
      placeholder="input search text"
      onSearch={SearchBookName}
      onChange={(value) => setSubString(value)}
      enterButton
    />
  </Space>
)}

{searchType === 'timeRange' && (
  <RangePicker
    showTime
    onChange={(dates) => setSelectedDates(dates)}
    onOk={SearchTime}
  />
)}
         <div>
  {showFilteredOrders ?
    FilteredOrders.map((order) => (
      <FilteredOrderCard key={order.id} order={order} subString={subString} />
    ))
    :
    searchType === 'default' ? (
      FilteredOrders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))
    ) : null
  }
</div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderTable;
