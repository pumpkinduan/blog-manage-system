import React, { Component } from "react";
import E from "wangeditor";
import { setLocalStorage, getLocalStorage } from "../../utils/index";
import CustomInput from "../../common/Input/index";
import "./index.scss";
import PicturesWall from "../../components/Upload/index";
class ArticleCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorContent: "",
    };
    this.myRef = React.createRef();
  }
  componentDidMount() {
    console.log(this.myRef);
    let editor = new E(this.myRef.current);
    editor.customConfig.onchange = (html) => {
      // 将html与内容一起保存到storage中，便于实现草稿功能
      setLocalStorage('text', html); 
    };
    editor.customConfig.zIndex = 11;
    editor.create();
  }
  render() {
    return (
      <div class="editor-container">
        <div className="editor-title">
          <CustomInput placeholder="请拟个文章标题" prefix="Title:" />
        </div>
        <div className="editor-author">
          <CustomInput placeholder="请输入作者" prefix="Author:" />
        </div>
        <div className="editor-description">
          <CustomInput placeholder="请简要描述文章" prefix="Description:" />
        </div>
        <div className="editor-cover">
          <PicturesWall placehloder="上传文章封面" />
        </div>
        <div id="editorApp" ref={this.myRef}></div>
      </div>
    );
  }
}
export default ArticleCreate;
