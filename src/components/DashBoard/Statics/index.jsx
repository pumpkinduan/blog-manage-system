import React from "react";
import { Row, Col } from "antd";
import './index.scss';
const Statics = (props) => {
  const { data } = props;
  return (
    <Row align="center" flex="space-between" gutter={16} className="override-ant-row-component"> 
      {data.map((item, index) => (
        <Col span={5} key={index}>
          <div className="icon-wrapper">{item.icon}</div>
          <div className="data-wrapper">
            <div>{item.title}</div>
            <strong>{item.counts}</strong>
          </div>
        </Col>
      ))}
    </Row>
  );
};
export default Statics