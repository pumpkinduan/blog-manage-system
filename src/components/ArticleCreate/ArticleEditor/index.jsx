import React, { Component } from "react";
import "./index.scss";
import RichEditor from "../RichEditor/index";
import MarkdownEditor from "../MarkdownEditor/index";
class ArticleEditor extends Component {
  switchEditor = () => {};
  render() {
    const { setContentOnEditor, isSwitch, setCurrentEditor } = this.props;
    return (
      // isSwitch来控制显示哪种类型的编辑器
      // true为富文本; false为markdown
      <>
        {isSwitch ? (
          <RichEditor
            setCurrentEditor={setCurrentEditor}
            placehloder="写点东西吧~"
            setContentOnEditor={setContentOnEditor}
          />
        ) : (
          "MarkdownEditor"
          // <MarkdownEditor
          //   setCurrentEditor={setCurrentEditor}
          //   placehloder="写点东西吧~"
          //   setContentOnEditor={setContentOnEditor}
          // />
        )}
      </>
    );
  }
}
export default ArticleEditor;
