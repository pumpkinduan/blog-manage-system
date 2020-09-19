import React, { Component } from "react";
import E from "wangeditor";
import "./index.scss";
import { setLocalStorage, getLocalStorage } from "../../../utils/index";
interface IProps {
	content: string;
}
class RichEditor extends Component<IProps> {
	wangeditorRef: React.RefObject<HTMLDivElement> = React.createRef();
	editor: E;
	_autoSaveContent = (html) => {
		// 将html与内容一起保存到storage中，便于实现草稿功能
		setLocalStorage("rich_text", html);
	};
	componentDidMount() {
		// 挂载富文本编辑器并进行配置
		let editor = (this.editor = new E(this.wangeditorRef.current));
		editor.customConfig.onchange = this._autoSaveContent;
		editor.customConfig.zIndex = 3;
		// 显示“上传图片”的tab
		// editor.customConfig.uploadImgServer = "/upload";
		editor.customConfig.uploadImgShowBase64 = true;
		editor.create();
		// 由编辑文章进入，显示已经发布了，并获取到的数据
		// 由创建文章进入，显示空数据或是编辑过但没有发布的数据(如：路由切换，数据保存至storage)
		let content =
			this.props.content ||
			getLocalStorage("rich_text") ||
			"开始你的写作之旅吧~";

		editor.txt.html(content);
	}
	render() {
		return <div id="richEditorApp" ref={this.wangeditorRef} />;
	}
}
export default RichEditor;
