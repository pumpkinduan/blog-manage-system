import React from "react";
import CustomInput from "../../../common/Input/index";
import "./index.scss";
import { Form } from "antd";
class ArticlInfo extends React.PureComponent {
  formRef = React.createRef();
  componentDidMount() {
    this.props.setForm(this.formRef.current);
  }
  onReset = () => {
    this.formRef.resetFields();
  };
  render() {
    return (
      <Form
        ref={this.formRef}
        className="articl-info-container"
      >
        <Form.Item
          name="title"
          className="article-title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <CustomInput
            placeholder="请拟个文章标题"
            width="40%"
            prefix="Title:"
          />
        </Form.Item>
        <Form.Item
          name="author"
          className="article-author"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <CustomInput placeholder="请输入作者" width="20%" prefix="Author:" />
        </Form.Item>
        <Form.Item
          name="tag"
          className="articla-tag"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <CustomInput placeholder="请输入文章分类" width="20%" prefix="Tag:" />
        </Form.Item>
        <Form.Item
          name="description"
          className="article-description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <CustomInput placeholder="请简要描述文章" prefix="Description:" />
        </Form.Item>
        <Form.Item className="reset-btn">
          <span onClick={this.onReset}>Reset</span>
        </Form.Item>
      </Form>
    );
  }
}
export default ArticlInfo;
