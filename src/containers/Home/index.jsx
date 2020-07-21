import React, { useEffect, useState } from "react";
import "./index.scss";
import Header from "../../components/Header/index";
import SiderBar from "../../components/SiderBar/index";
import Content from "../../components/Content/index";
import { Layout } from "antd";
import { connect } from "react-redux";
import { showGlobalLoading } from "../../redux/actionCreators/index";
import { removeLocalStorage } from "../../utils/index";
// import { useHistory } from "react-router-dom";
const Home = (props) => {
  let [tags, setTags] = useState([{ title: "DashBoard", path: "/dashboard" }]);
  useEffect(() => {
    console.log("去获取数据");
  });
  const logout = () => {
    removeLocalStorage("isAuthencated");
    removeLocalStorage("auth_token");
    props.dispatch(showGlobalLoading(true));
    setTimeout(() => {
      props.dispatch(showGlobalLoading(false));
      window.location.replace("/login");
    }, 1000);
  };

  // 用于在内容区域生成 导航tag
  const addTag = (tag) => {
    // 避免添加重复的tag
    let flag = true;
    for (let i = 0; i < tags.length; i ++ ) {
      if (tag.path === tags[i].path) {
        flag = false;
        return
      }
    }
    if (flag) {
      setTags([...tags, tag]);
    }
  };
  const removeTag = (index) => {
    let tempTags = [...tags];
    tempTags.splice(index, 1);
    setTags([...tempTags]);
  };
  return (
    <Layout style={{ flexDirection: "column" }}>
      <Header logout={logout} />
      <Layout style={{ backgroundColor: "#fff" }}>
        <SiderBar addTag={addTag} />
        <Content tags={tags} removeTag={removeTag} />
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
