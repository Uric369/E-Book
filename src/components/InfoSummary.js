import { Divider, Space, Tag } from "antd";
import React from "react";
class Summary extends React.Component{
  render(){
    const {book} = this.props;
    return(
  <div>
    <Divider orientation="left">Introduction</Divider>
    <h>
      {" "}
      {book.description}
    </h>
  </div>
);
    };
  };
export default Summary;
