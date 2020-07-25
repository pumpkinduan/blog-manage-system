import React, { Component } from "react";
import { getLocalStorage, setLocalStorage } from "../../utils/index";
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
      isSwitch: getLocalStorage("isSwitch"),

      currentEditor: null,
      form: null,
      // 与文章相关的数据
      article_sub_info: null, // 文章的次要信息，如标题 作者...
      content: "", // html格式的内容，展示于前端网站中 保存至数据库
      previewContent: "", // html格式的内容，在后台预览 不用保存至数据库
      markedContent: "", // markdown格式的内容，用于展示在后台管理系统中 保存至数据库
      isPreview: false,
      coverUrl: "",
    };
    this.myRef = React.createRef();
  }
  componentDidMount() {
    if (this.props.isEdited) {
      // api
    }
  }
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
    if (!currentEditor) return;
    form.validateFields().then(
      (vals) => {
        // 处理富文本与markdown编辑器获取内容的方式
        let content;
        if (currentEditor.txt) {
          content = currentEditor.txt.html();
        } else {
          let markedContent = currentEditor.value();
          content = `<div class="editor-preview editor-preview-side">${currentEditor.markdown(
            markedContent
          )}</div>`;
        }
        if (content !== "") {
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
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  setForm = (form) => {
    this.setState({ form });
  };
  setCurrentEditor = (editor) => {
    this.setState({ currentEditor: editor });
  };
  // 切换编辑器
  toggleEditor = () => {
    let isSwitch = !this.state.isSwitch;
    setLocalStorage("isSwitch", isSwitch);
    this.setState({
      isSwitch,
    });
  };
  clearAllContent = () => {
    let { isSwitch, currentEditor, form } = this.state;
    // 清空编辑器
    if (isSwitch) {
      currentEditor.txt.html("");
    } else {
      currentEditor.cleanBlock();
    }
    console.log(currentEditor);
    form.resetFields();
  };

  // 获取上传的图片信息
  getUploadData = (fileList) => {
    console.log(fileList);
  };
  render() {
    const {
      previewContent,
      isPreview,
      isSwitch,
      article_sub_info,
    } = this.state;
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
          article_sub_info={article_sub_info}
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
        />
      </div>
    );
  }
}
export default ArticleCreate;
