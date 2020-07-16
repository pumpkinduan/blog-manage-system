import React, { useEffect } from "react";
import "./index.scss";
import Header from "../../components/Header/index";
import SiderBar from "../../components/SiderBar/index";
import Content from "../../components/Content/index";
import { Layout } from "antd";
// import {
//   MessageOutlined,
//   ExpandOutlined,
//   BellOutlined,
// } from "@ant-design/icons";
import { connect } from "react-redux";
import { showGlobalLoading } from "../../redux/actionCreators/index";
import { removeLocalStorage } from "../../utils/index";

const Home = (props) => {
  useEffect(() => {
    console.log('去获取数据')
  })
  const logout = () => {
    removeLocalStorage("isAuthencated");
    props.dispatch(showGlobalLoading(true));
    setTimeout(() => {
      props.dispatch(showGlobalLoading(false));
      props.history.replace("/login");
    }, 1000);
  };
  return (
    <Layout style={{ flexDirection: "column" }}>
      <Header logout={logout} {...props} />
      <Layout style={{ backgroundColor: "#f9f0ffb3" }}>
        <SiderBar />
        <Content />
      </Layout>
    </Layout>
  );
};
const mapStateToProps = (state) => {
  return {
    visitors: state.visitors,
    comments: state.comments,
  };
};
export default connect(mapStateToProps, null)(Home);
