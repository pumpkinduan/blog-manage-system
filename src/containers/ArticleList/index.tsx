import React, { Component } from "react";
import { Col, Row, Button, Popconfirm, message } from "antd";
import ListCard from "../../components/ArticleList/ListCard";
import LoadButton from "../../common/LoadButton/index";
import QueueAnim from "rc-queue-anim";
import "./index.scss";
const lists = [
  {
    id: 12,
    coverUrl:
      "https://2heng.xin/wp-content/uploads//2019/12/2572384-1024x640.jpg",
    title: "你好啊，欢迎学习React技术全家桶",
    comments: 123,
    createdAt: "3天前",
    likes: 1235,
    visitors: 123,
  },
  {
    id: 12,
    coverUrl:
      "https://2heng.xin/wp-content/uploads//2019/12/2572384-1024x640.jpg",
    title: "你好啊，欢迎学习React技术全家桶",
    comments: 123,
    createdAt: "3天前",
    likes: 1235,
    visitors: 123,
  },
  {
    id: 12,
    coverUrl:
      "https://2heng.xin/wp-content/uploads//2019/12/2572384-1024x640.jpg",
    title: "你好啊，欢迎学习React技术全家桶",
    comments: 123,
    createdAt: "3天前",
    likes: 1235,
    visitors: 123,
  },
  {
    id: 12,
    coverUrl:
      "https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.6/img/other/th%20(3).jpg",
    title: "你好啊，欢迎学习React技术全家桶",
    comments: 123,
    createdAt: "3天前",
    likes: 1235,
    visitors: 123,
  },
  {
    id: 12,
    coverUrl:
      "https://2heng.xin/wp-content/uploads//2019/12/2572384-1024x640.jpg",
    title:
      "你好啊，欢迎学习Reaact技术全家act技术全家act技术全家act技术全家ct技术全家桶",
    comments: 123,
    createdAt: "3天前",
    likes: 1235,
  },
  {
    id: 12,
    coverUrl:
      "https://2heng.xin/wp-content/uploads//2019/12/2572384-1024x640.jpg",
    title: "你好啊，欢迎学习React技术全家桶",
    comments: 123,
    createdAt: "3天前",
    likes: 1235,
    visitors: 123,
  },
  {
    id: 12,
    coverUrl:
      "https://2heng.xin/wp-content/uploads//2017/12/%EF%BD%A1%EF%BD%A5%EF%BC%9A%EF%BC%8A%EF%BC%9A%EF%BD%A5%E2%9C%BF-PID65231071-by-hakusai-1024x602.jpg",
    title: "你好啊，欢迎学习React技术全家桶",
    comments: 123,
    createdAt: "3天前",
    likes: 1235,
    visitors: 123,
  },
];

interface basicInfoInterface {
  name: string;
  age: string;
  
}
interface intialState {
  spin: boolean;
  page: number;
  lists: any[];
}
class ArticleList extends Component {
  state:intialState = { spin: false, page: 1, lists: lists };
  confirmToDel = (id, index) => {
    // api
    message.success("您已成功删除了！");
  };
  loadMoreData = () => {
    this.setState((state:intialState) => {
      let page = state.page;
      return {
        spin: true,
        page: page++,
      };
    });
    setTimeout(() => {
      let list = [
        ...this.state.lists,
        {
          id: 12,
          coverUrl:
            "https://2heng.xin/wp-content/uploads//2019/12/2572384-1024x640.jpg",
          title: "你好啊，欢迎学习React技术全家桶",
          comments: 123,
          createdAt: "3天前",
          likes: 1235,
          visitors: 123,
        },
        {
          id: 12,
          coverUrl:
            "https://2heng.xin/wp-content/uploads//2017/12/%EF%BD%A1%EF%BD%A5%EF%BC%9A%EF%BC%8A%EF%BC%9A%EF%BD%A5%E2%9C%BF-PID65231071-by-hakusai-1024x602.jpg",
          title: "你好啊，欢迎学习React技术全家桶",
          comments: 123,
          createdAt: "3天前",
          likes: 1235,
          visitors: 123,
        },
      ];
      this.setState({ spin: false, lists: list });
    }, 2000);
    // request api
  };
  shouldComponentUpdate(nextProps, nextState) {
    // page的变化不引起 re-render
    if (nextState.spin !== this.state.spin) return true;
    if (nextState.page !== this.state.page) return false;
    return false;
  }
  render() {
    const { lists, spin } = this.state;
    return (
      <div className="article-list-container">
        <Row align="middle" gutter={[12, 15]}>
          {lists.map((item, index) => {
            return (
              <Col span={8} key={index}>
                <QueueAnim type="bottom" interval={100} delay={index * 100}>
                  <ListCard
                    item={item}
                    confirmToDel={this.confirmToDel}
                    key={index}
                    index={index}
                  />
                </QueueAnim>
              </Col>
            );
          })}
        </Row>
        <LoadButton
          spin={spin}
          popTitle="戳我获取更多噢~"
          popPlacement="left"
          popColor="#2db7f5"
          onClick={this.loadMoreData}
        />
      </div>
    );
  }
}
export default ArticleList;
