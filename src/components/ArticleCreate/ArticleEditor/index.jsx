import React, { Component } from "react";
import "./index.scss";
import RichEditor from "../RichEditor/index";
import MarkdownEditor from "../MarkdownEditor/index";
class ArticleEditor extends Component {
  switchEditor = () => {};
  render() {
    const { isSwitch, setCurrentEditor } = this.props;
    return (
      // isSwitch来控制显示哪种类型的编辑器
      // true为富文本; false为markdown
      <>
        {isSwitch ? (
          <RichEditor
            key={1}
            setCurrentEditor={setCurrentEditor}
            placehloder="写点东西吧~"
          />
        ) : (
          <MarkdownEditor
            key={0}
            setCurrentEditor={setCurrentEditor}
            placehloder="写点东西吧~"
          />
        )}
      </>
    );
  }
}
export default ArticleEditor;
