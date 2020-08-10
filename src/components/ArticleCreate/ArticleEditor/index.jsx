import React, { Component } from "react";
import "./index.scss";
import RichEditor from "../RichEditor/index";
import MarkdownEditor from "../MarkdownEditor/index";
import QueueAnim from "rc-queue-anim";
class ArticleEditor extends Component {
  switchEditor = () => {};
  render() {
    const { isSwitch, setCurrentEditor } = this.props;
    return (
      // isSwitch来控制显示哪种类型的编辑器
      // true为富文本; false为markdown
      <QueueAnim type="bottom" delay={2400}>
        <React.Fragment key="editor">
          {isSwitch ? (
            <RichEditor key={1} setCurrentEditor={setCurrentEditor} />
          ) : (
            <MarkdownEditor key={0} setCurrentEditor={setCurrentEditor} />
          )}
        </React.Fragment>
      </QueueAnim>
    );
  }
}
export default ArticleEditor;
