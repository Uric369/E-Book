import { Button, Space } from "antd";
import React from "react";
import { history } from "../utils/history";


class BackButton  extends React.Component {
   handleClick = () => {
    history.push("/Homepage");
    window.location.reload();
  };

  render(){
  return (
    <Space wrap>
      <Button type="primary" onClick={this.handleClick}>
        Back to Homepage
      </Button>
    </Space>
  );
  };
};

export default BackButton;
 
