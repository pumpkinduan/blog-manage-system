import React from "react";
import "./index.scss";
import { Popconfirm, message } from "antd";
import QueueAnim from "rc-queue-anim";
class ArticleControl extends React.PureComponent {
  _onDraft = () => {
    // post
    this.props.onPublish("drafted");
  };
  _onPublish = () => {
    // post
    this.props.onPublish("published");
  };
  confirm = (e) => {
    message.success("成功切换编辑器");
    this.props.toggleEditor();
  };
  cancel = (e) => {
    message.error("您已取消");
  };
  render() {
    const { onPreview } = this.props;
    return (
      <QueueAnim type="bottom" delay={2000} duration={400}>
        <div className="article-controls" key="0">
          <Popconfirm
            title="是否切换编辑器？"
            onConfirm={this.confirm}
            onCancel={this.cancel}
            okText="Yes"
            cancelText="No"
            key="switch"
          >
            <span className="switch-btn btn">Switch</span>
          </Popconfirm>
          <span
            key="preview"
            className="preview-btn btn"
            size="middle"
            onClick={onPreview}
          >
            Preview
          </span>
          <span
            key="post"
            className="post-btn btn"
            size="middle"
            onClick={this._onPublish}
          >
            Publish
          </span>
          <span
            key="draft"
            className="draft-btn btn"
            size="middle"
            onClick={this._onDraft}
          >
            Draft
          </span>
        </div>
      </QueueAnim>
    );
  }
}
export default ArticleControl;
