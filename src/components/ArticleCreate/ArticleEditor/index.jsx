import React, { Component } from "react";
import E from "wangeditor";
import "./index.scss";
class ArticleCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewContent: "",
    };
    this.myRef = React.createRef();
  }
  componentDidMount() {
    // 挂载富文本编辑器并进行配置
    this.editor = new E(this.myRef.current);
    this.editor.customConfig.onchange = this._autoSaveContent;
    this.editor.customConfig.zIndex = 11;
    this.editor.create();
    // 设置编辑器初始化时的内容
    this.props.setContentOnEditor(this.editor);
  }
  _autoSaveContent = (html) => {
    this.props.autoSaveContent(html);
  };
  _onPreview = () => {
    this.props.onPreview(this.editor.txt.html());
  };
  _onDraft = () => {
    // post
    this.props.onDraft(this.editor.txt.html());
  };
  _onPublish = () => {
    // post
    this.props.onPublish(this.editor);
  };
  render() {
    return (
      <div className="editor-container">
        <div className="article-controlls">
          <span className="preview-btn" size="middle" onClick={this._onPreview}>
            Preview
          </span>
          <span className="post-btn" size="middle" onClick={this._onPublish}>
            Publish
          </span>
          <span className="draft-btn" size="middle" onClick={this._onDraft}>
            Draft
          </span>
        </div>
        <div id="editorApp" ref={this.myRef} placehloder="写点东西吧~"></div>
      </div>
    );
  }
}
export default ArticleCreate;
