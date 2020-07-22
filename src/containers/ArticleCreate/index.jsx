import React, { Component } from "react";
import { getLocalStorage } from "../../utils/index";
import "./index.scss";
import { Modal, notification } from "antd";
import ArticleInfo from "../../components/ArticleCreate/ArticleInfo/index";
import ArticleEditor from "../../components/ArticleCreate/ArticleEditor/index";
import PicturesWall from "../../components/Upload/index";
import ArticleControl from "../../components/ArticleCreate/ArticleControl/index";
class ArticleCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isSwitch来控制显示哪种类型的编辑器
      // true为富文本; false为markdown
      isSwitch: true,

      currentEditor: null, 
      form: null,
      // 与文章相关的数据
      articleContent: "",
      previewContent: "",
      isPreview: false,
      coverUrl: "",
    };
    this.myRef = React.createRef();
  }
  componentDidMount() {}
  setContentOnEditor = () => {
    // 这里单独抽一个函数出来设置编辑器的内容是因为： 不想将文章当前的状态(修改或创建)在传递给编辑器
    const { isEdited } = this.props;
    return (editor, flag) => {
      // flag 为true 表示当前处于富文本编辑状态
      // flag 为false 表示当前处于markdown编辑状态
      // isEdited 为true 表示处于修改文章的状态
      let content = "";
      if (isEdited) {
        // 编辑文章则获取文章信息显示
        // request api
      } else {
        // 用于路由跳转且又回到文章的创建页面时，从storage中获取上次写的文章内容并显示出来
        content = flag
          ? getLocalStorage("rich_text")
          : getLocalStorage("mark_text");
      }
      // 给编辑器设置内容
      flag ? editor.txt.html(content) : editor.value(content);
    };
  };
  // 控制预览的模态框显示
  handleOk = (e) => {
    this.setState({
      isPreview: false,
    });
  };
  // 控制预览的模态框显示
  handleCancel = (e) => {
    this.setState({
      isPreview: false,
    });
  };
  // 显示预览的模态框
  onPreview = () => {
    this.setState({
      isPreview: true,
      previewContent: getLocalStorage("rich_text"),
    });
  };
  onPublish = (status) => {
    // post
    let { coverUrl, currentEditor, form } = this.state;
    form.validateFields().then((vals) => {
      console.log(vals);
    }, (err) => {
      console.log(err);
    });
    let content = getLocalStorage("rich_text");
    let data = Object.assign(form.getFieldsValue(), {
      content,
      status,
      coverUrl,
    });
    // post data
    // setLocalStorage("text", content);
    this.clearAllContent();
    notification.success({
      message: status,
      duration: 1,
      style: {
        cursor: "pointer",
      },
    });
  };
  setForm = (form) => {
    this.setState({ form });
  };
  setCurrentEditor = (editor) => {
    this.setState({ currentEditor: editor });
  };
  // 切换编辑器
  toggleEditor = () => {
    let isSwitch = this.state.isSwitch;
    this.setState({
      isSwitch: !isSwitch,
    });
  };
  clearAllContent = () => {
    let { isSwitch, currentEditor, form } = this.state;
    // 清空文章 title tag......
    form.resetFields();
    // 清空编辑器
    if (isSwitch) {
      currentEditor.txt.html("");
    } else {
      currentEditor.value("");
    }
  };
  // handleTitleChange = (e) => this.setState({ title: e.target.value });
  // handleAuthorChange = (e) => this.setState({ author: e.target.value });
  // handleTagChange = (e) => this.setState({ tag: e.target.value });
  // handleDescChange = (e) => this.setState({ description: e.target.value });

  // 获取上传的图片信息
  getUploadData = (fileList) => {
    console.log(fileList);
  };
  render() {
    const { previewContent, isPreview, isSwitch } = this.state;
    return (
      <div className="article-create-container">
        <Modal
          title="预览文章"
          visible={isPreview}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div dangerouslySetInnerHTML={{ __html: previewContent }}></div>
        </Modal>
        <ArticleInfo
          setForm={this.setForm}
          // handleTitleChange={this.handleTitleChange}
          // handleAuthorChange={this.handleAuthorChange}
          // handleTagChange={this.handleTagChange}
          // handleDescChange={this.handleDescChange}
        />
        <div className="article-cover">
          <PicturesWall
            getUploadData={this.getUploadData}
            placehloder="上传文章封面"
          />
        </div>
        <ArticleControl
          onPreview={this.onPreview}
          onPublish={this.onPublish}
          toggleEditor={this.toggleEditor}
        />
        <ArticleEditor
          isSwitch={isSwitch}
          setCurrentEditor={this.setCurrentEditor}
          setContentOnEditor={this.setContentOnEditor()}
        />
      </div>
    );
  }
}
export default ArticleCreate;
