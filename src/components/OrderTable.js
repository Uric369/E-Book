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
import { getUserOrdersByBookName } from "../services/orderService";
import { getUserOrdersByTime } from "../services/orderService";
const { RangePicker } = DatePicker;
const { Search } = Input;

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [searchType, setSearchType] = useState('default');
  const [selectedDates, setSelectedDates] = useState(null);
  const [subString, setSubString] = useState(null);
  const userData = JSON.parse(localStorage.getItem("user"));
  const [FilteredOrders, setFilteredOrders] = useState([]);
  const [showFilteredOrders, setShowFilteredOrders] = useState(false);
  
  
  const SearchDefault = () => {
    getOrdersByUser({ search: userData.userId }, (data) => {
      setFilteredOrders(data);
      console.log("让我看看id");
      console.log(data);
    });
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);

    if (e.target.value === 'default') {
      SearchDefault();
    }
  };

  useEffect(() => {
    if (userData) {
      getOrdersByUser({ search: userData.userId }, (data) => {
        setOrders(null);
        setOrders(data);
        setFilteredOrders(data);
        console.log("让我看看id");
        console.log(data);
      });
    }
  }, []);

  const SearchBookName = (subString) => {
    getUserOrdersByBookName(userData.userId, subString, (data) => {
      setFilteredOrders([...data]);
      setShowFilteredOrders(true);
    });
  };

  const SearchTime = () => {
    if (selectedDates && selectedDates.length === 2) {
      const startTime = selectedDates[0].startOf('day').toISOString().replace('T', ' ');
      const endTime = selectedDates[1].endOf('day').toISOString().replace('T', ' ');

    console.log(startTime);
    console.log(endTime);
    getUserOrdersByTime(userData.userId, startTime,endTime, (data) => {
      setFilteredOrders([...data]);
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
            onChange={handleSearchTypeChange}
            style={{ marginBottom: '10px' }}
          >
            <option value="title">Search for Book Title</option>
            <option value="timeRange">Search for Time Range</option>
            <option value="default">Default</option>
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
export default OrderTable;
