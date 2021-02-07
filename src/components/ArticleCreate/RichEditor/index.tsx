import React, { Component } from 'react';
import E from 'wangeditor';
import './index.scss';
import { setLocalStorage, getLocalStorage } from '../../../utils/index';
interface IProps {
	content?: string;
}
class RichEditor extends Component<IProps> {
	wangeditorRef: React.RefObject<HTMLDivElement> = React.createRef();
	editor: E | undefined;
	state = { isEmpty: false };
	_autoSaveContent = (html) => {
		// 将html与内容一起保存到storage中，便于实现草稿功能
		setLocalStorage('rich_text', html);
	};
	isBlankSpace = (value) => {
		const reg = /^(&nbsp;)+$/;
		return reg.test(value);
	};
	initConfig = () => {
		// 挂载富文本编辑器并进行配置
		let editor = (this.editor = new E(this.wangeditorRef.current));
		editor.config.onchange = this._autoSaveContent;
		editor.config.zIndex = 3;
		// 显示“上传图片”的tab
		// editor.config.uploadImgServer = "/upload";
		editor.config.uploadImgShowBase64 = true;
		// 配置全屏功能按钮是否展示
		editor.config.showFullScreen = true;
		editor.config.onchange = (html) => {
			if (!editor.txt.text() || this.isBlankSpace(editor.txt.text())) {
				this.setState({ isEmpty: true });
			} else {
				this.setState({ isEmpty: false });
			}
		};
		editor.config.onchangeTimeout = 100; // 单位 ms
		editor.create();
		// 由编辑文章进入，显示已经发布了，并获取到的数据
		// 由创建文章进入，显示空数据或是编辑过但没有发布的数据(如：路由切换，数据保存至storage)
		let content =
			this.props.content ||
			getLocalStorage('rich_text') ||
			'写点东西吧...';
		editor.txt.text(content);
	};
	componentDidMount() {
		this.initConfig();
	}
	render() {
		const { isEmpty } = this.state;
		return (
			<div className={isEmpty ? 'w-e-error' : ''}>
				<div id="richEditorApp" ref={this.wangeditorRef} />
				<span className="placeholder">写点东西吧...</span>
			</div>
		);
	}
}
export default RichEditor;
