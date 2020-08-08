import React, { Component } from "react";
import { Col, Row, Button } from "antd";
import { Link } from "react-router-dom";
import "./index.scss";
class Article extends Component {
  render() {
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
    return (
      <div className="article-list-container">
        <Row align="middle" gutter={[12, 15]}>
          {lists.map((item, index) => {
            return (
              <Col span={8} key={index}>
                <div className="cover-wrapper">
                  <div className="article-sub-info">
                    <h1>
                      <Link
                        to={{
                          pathname: "/articleCreate",
                          state: { isEdited: true },
                        }}
                      >
                        {item.title}
                      </Link>
                    </h1>
                    <p className="statics">
                      <span>
                        获赞：<strong>{item.likes}</strong>
                      </span>
                      <span>
                        留言：<strong>{item.comments}</strong>
                      </span>
                      <span>
                        访问量：<strong>{item.visitors}</strong>
                      </span>
                    </p>
                    <p>发布时间：{item.createdAt}</p>
                  </div>
                  <img src={item.coverUrl} alt="" />
                </div>
              </Col>
            );
          })}
        </Row>
        <Button className="load-btn" type="primary">加载更多</Button>
      </div>
    );
  }
}
export default Article;
