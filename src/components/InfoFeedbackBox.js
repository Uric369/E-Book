// import { LikeOutlined } from "@ant-design/icons";
// import React from "react";
// import { Col, Row, Statistic } from "antd";
// const Feedback = () => (
//   <Row gutter={16}>
//     <Col span={12}>
//       <Statistic title="Like" value={1128} prefix={<LikeOutlined />} />
//     </Col>
//     <Col span={12}>
//       <Statistic
//         title="Favorable Rate"
//         value={96.79}
//         precision={2}
//         valueStyle={{
//           color: "black"
//         }}
//         suffix="%"
//       />
//     </Col>
//   </Row>
// );
// export default Feedback;

import { LikeOutlined } from "@ant-design/icons";
import React from "react";
import { Col, Row, Statistic } from "antd";

class Feedback extends React.Component {
  render(){
    const {book} = this.props;
    console.log(book);
    console.log("FeedBack");

    return(
  <Row gutter={16}>
    <Col span={12}>
      <Statistic title="Like" value={book.likes} prefix={<LikeOutlined />} />
    </Col>
    <Col span={12}>
      <Statistic
        title="Favorable Rate"
        value={book.favorablerate}
        precision={2}
        valueStyle={{
          color: "black"
        }}
        suffix="%"
      />
    </Col>
  </Row>
);
      };
    };
export default Feedback;