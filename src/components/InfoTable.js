import { Table, Tag } from "antd";
import React from "react";

class InfoTable extends React.Component {
  render() {
    const { book } = this.props;
    console.log("Table");
    console.log(book);

    return (
      <Table dataSource={book}>
        <Table.Column
          title="Title"
          dataIndex="name"
          
          key="name"
          render={(text) => <a>{text}</a>}
        />
        <Table.Column title="Author" dataIndex="author" key="author" />
        <Table.Column
          title="Publisher"
          dataIndex="publisher"
          key="publisher"
        />
        <Table.Column title="Price" dataIndex="price" key="price" render={(text) => `$${text}`} />
        <Table.Column title="ISBN" dataIndex="isbn" key="isbn" render={(text) => `${text}`} />
        <Table.Column title="Stock" dataIndex="stock" key="stock" render={(text) => `${text}`} />
        <Table.Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(_, { status }) => (
            <Tag color={status === 0 ? "green" : "volcano"}>
              {status === 0 ? "In Stock" : "Out of Stock"}
            </Tag>
          )}
        />
      </Table>
    );
  }
}

export default InfoTable;