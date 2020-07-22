import React, { Component } from "react";
import E from "wangeditor";
import "./index.scss";
import { setLocalStorage } from "../../../utils/index";
class RichEditor extends Component {
  constructor(props) {
    super(props);
    this.$wangeditor = React.createRef();
  }
  _autoSaveContent = (html) => {
    // 将html与内容一起保存到storage中，便于实现草稿功能
    setLocalStorage("rich_text", html);
  };
  componentDidMount() {
    // 挂载富文本编辑器并进行配置
    let editor = (this.editor = new E(this.$wangeditor.current));
    editor.customConfig.onchange = this._autoSaveContent;
    editor.customConfig.zIndex = 11;
    // 显示“上传图片”的tab
    // editor.customConfig.uploadImgServer = "/upload";
    editor.customConfig.uploadImgShowBase64 = true;
    editor.create();
    // 设置富文本编辑器初始化时的内容
    this.props.setContentOnEditor(this.editor, true);
    // 获取当前在使用的编辑器
    this.props.setCurrentEditor(this.editor);
  }
  render() {
    const { placehloder } = this.props;
    return (
        <div
          id="richEditorApp"
          ref={this.$wangeditor}
          placehloder={placehloder}
        />
    );
  }
}
export default RichEditor;
