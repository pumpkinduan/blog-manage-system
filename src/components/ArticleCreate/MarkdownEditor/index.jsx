import React, { Component } from "react";
import SimpleMDE from "simplemde";
import "../../../styles/simplemde.scss";
import "./index.scss";
class MarkdownEditor extends Component {
  constructor(props) {
    super(props);
    this.$markedEditor = React.createRef();
  }
  componentDidMount() {
    let config = {
      renderingConfig: {
        codeSyntaxHighlighting: true,
      },
      autofocus: true,
      autosave: {
        enabled: true,
        delay: 2000,
        //在storage中 会自动生成key为smde_marked_text的键代表markdown格式的内容
        uniqueId: "marked_text",
      },
      promptURLs: true,
      placehloder: this.props.placehloder,
      tabSize: 4,
    };
    // 挂载markdown编辑器并进行配置
    let editor = (this.editor = new SimpleMDE({
      element: this.$markedEditor.current,
      ...config,
    }));
    // 获取当前在使用的编辑器
    this.props.setCurrentEditor(this.editor);

    // 1. 由编辑文章进入，显示已经发布了，并获取到的数据(数据为markdown格式的，并非HTML格式)
    // 2. 由创建文章进入，显示空数据或是编辑过但没有发布的数据(如：路由切换，数据保存至storage)
    // 由于该编辑器自动实现了，所以第2步不用自己实现（参见：autosave的配置）
    let content = this.props.markedContent;
    content && editor.value(content);
  }
  render() {
    const { placehloder } = this.props;
    return (
      <div className="markdownEditorApp-container">
        <textarea
          id="markdownEditorApp"
          ref={this.$markedEditor}
          placehloder={placehloder}
        />
      </div>
    );
  }
}
export default MarkdownEditor;
