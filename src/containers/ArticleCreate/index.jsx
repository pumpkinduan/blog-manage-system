import React, { Component } from "react";
import { setLocalStorage, getLocalStorage } from "../../utils/index";
import "./index.scss";
import { Modal, notification } from "antd";
import ArticleInfo from "../../components/ArticleCreate/ArticleInfo/index";
import ArticleEditor from "../../components/ArticleCreate/ArticleEditor/index";
import PicturesWall from "../../components/Upload/index";
class ArticleCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleContent: "",
      previewContent: "",
      visible: false,
      title: "",
      author: "",
      tag: "",
      description: "",
      coverUrl: "",
    };
    this.myRef = React.createRef();
  }
  componentDidMount() {}
  setContentOnEditor = () => {
    const { isEdited } = this.props;
    return (editor) => {
      let content = "";
      if (isEdited) {
        // 编辑文章则获取文章信息显示
        // request api
      } else {
        // 用于路由跳转且又回到文章的创建页面时，从storage中获取上次写的文章内容并显示出来
        content = getLocalStorage("text");
      }
      editor.txt.html(content);
    };
  };
  autoSaveContent = (html) => {
    // 将html与内容一起保存到storage中，便于实现草稿功能
    setLocalStorage("text", html);
  };

  // 控制预览的模态框显示
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  };
  // 控制预览的模态框显示
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };
  // 显示预览的模态框
  onPreview = (html) => {
    this.setState({
      visible: true,
      previewContent: html,
    });
  };
  onDraft = () => {
    // post
    notification.success({
      message: "已保存至草稿",
      duration: 1,
      style: {
        cursor: "pointer",
      },
    });
  };
  onPublish = (editor) => {
    // post
    let { tag, title, author, description, coverUrl } = this.state;
    let content = editor.txt.html();
    let data = {
      tag,
      title,
      author,
      description,
      content,
      coverUrl,
    };
    console.log(data);
    // post data
    // setLocalStorage("text", content);
    editor.txt.html("");
    notification.success({
      message: "发布成功",
      duration: 1,
      style: {
        cursor: "pointer",
      },
    });
  };

  handleTitleChange = (e) => this.setState({ title: e.target.value });
  handleAuthorChange = (e) => this.setState({ author: e.target.value });
  handleTagChange = (e) => this.setState({ tag: e.target.value });
  handleDescChange = (e) => this.setState({ description: e.target.value });

  // 获取上传的图片信息
  getUploadData = (fileList) => {
    console.log(fileList);
  };
  render() {
    const { previewContent, visible } = this.state;
    return (
      <div className="article-create-container">
        <Modal
          title="预览文章"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          autoSaveContent={this.autoSaveContent}
        >
          <div dangerouslySetInnerHTML={{ __html: previewContent }}></div>
        </Modal>
        <ArticleInfo
          handleTitleChange={this.handleTitleChange}
          handleAuthorChange={this.handleAuthorChange}
          handleTagChange={this.handleTagChange}
          handleDescChange={this.handleDescChange}
        />
        <div className="article-cover">
          <PicturesWall
            getUploadData={this.getUploadData}
            placehloder="上传文章封面"
          />
        </div>
        <ArticleEditor
          setContentOnEditor={this.setContentOnEditor()}
          autoSaveContent={this.autoSaveContent}
          onDraft={this.onDraft}
          onPublish={this.onPublish}
          onPreview={this.onPreview}
        />
      </div>
    );
  }
}
export default ArticleCreate;
