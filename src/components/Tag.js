import { Divider, Space, Tag } from "antd";
import React from "react";
const BookTag = () => (
  <div>
    <Divider orientation="left"></Divider>
    <Space size={[0, 8]} wrap>
      {/* <Tag color="magenta">magenta</Tag> */}
      <Tag color="red">Computer System</Tag>
      {/* <Tag color="volcano">volcano</Tag>
      <Tag color="orange">orange</Tag> */}
      <Tag color="gold">Education</Tag>
      {/* <Tag color="lime">lime</Tag> */}
      <Tag color="green">programmer</Tag>
      <Tag color="green">Computer Science</Tag>
      <Tag color="green">Softerware Engineering</Tag>
      {/* <Tag color="cyan">cyan</Tag>
      <Tag color="blue">blue</Tag> */}
      <Tag color="geekblue">worth reading</Tag>
      {/* <Tag color="purple">purple</Tag> */}
    </Space>
    {/* <Divider orientation="left">Custom</Divider>
    <Space size={[0, 8]} wrap>
      <Tag color="#f50">#f50</Tag>
      <Tag color="#2db7f5">#2db7f5</Tag>
      <Tag color="#87d068">#87d068</Tag>
      <Tag color="#108ee9">#108ee9</Tag>
    </Space> */}
  </div>
);
export default BookTag;
