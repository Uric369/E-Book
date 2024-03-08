import { Space, Table, Tag } from "antd";
import React from "react";
import "../index.css";
import { getCartsByUser } from "../services/cartService";
import { Cascader, InputNumber } from "antd";
import { addOrder } from "../services/orderService";
const { Column, ColumnGroup } = Table;



  


class MyColumn extends React.Component {

    



    render() {
      const { cart ,handleAmountChange, handleAddCart} = this.props;



      return (
        <React.Fragment>
          <Column title="Book" dataIndex="bookname" key={cart.bookname} />
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
            render={(amount) => (
              <Space direction="vertical">
                <InputNumber
                  addonBefore="+"
                  defaultValue={amount}
                  onChange={this.handleAmountChange}
                />
              </Space>
            )}
          />
          <Column title="Unit Price" dataIndex="price" key="price" />
          <Column
            title="Availability Status"
            dataIndex="status"
            key="status"
            render={(_, { status }) => (
              <Tag color={status === 0 ? "green" : "volcano"}>
                {status === 0 ? "In Stock" : "Out of Stock"}
              </Tag>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <a onClick={() => this.props.onPurchaseClick(record)}>purchase</a>
                <a color="volcano">Delete</a>
              </Space>
            )}
          />
        </React.Fragment>
      );
    }
  }
  export default MyColumn;