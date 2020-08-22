import React from "react";
import { Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import "./ListCard.scss";
class ListCard extends React.PureComponent {
  eleRef = React.createRef();
  render() {
    const { item, index, confirmToDel } = this.props;
    return (
      <div className="cover-wrapper">
        <div className="article-sub-info" ref={this.eleRef}>
          <h1>
            <Link
              className="title"
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
          <div className="btn-controls">
            <a href="javascript:;" className="edit-btn btn">
              编辑
            </a>
            <Popconfirm
              getPopupContainer={() => {
                // let eles = document.getElementsByClassName("article-sub-info");
                return this.eleRef.current;
              }}
              title="您真的要删除这篇文章嘛？"
              onConfirm={() => {
                confirmToDel(item.id, index);
              }}
              okText="确定"
              cancelText="取消"
            >
              <span  className="del-btn btn">
                删除
              </span>
            </Popconfirm>
          </div>
        </div>
        <img src={item.coverUrl} alt="" />
      </div>
    );
  }
}
export default ListCard;
