import React, { Component } from "react";
import SimpleMDE from "simplemde";
import "../../../assets/styles/simplemde.scss";
import "./index.scss";
import { Sitdown } from "sitdown";
import _ from "loadsh";
interface IProps {
	content?: string;
}
let sitdown = new Sitdown();
class MarkdownEditor extends Component<IProps> {
	editor: SimpleMDE;
	markedEditorRef: React.RefObject<HTMLTextAreaElement> = React.createRef();
	state = {
		isEmpty: false,
	};
	componentDidMount() {
		let config = {
			renderingConfig: {
				codeSyntaxHighlighting: true,
			},
			// previewRender: function (plainText, p) {
			// 	console.log("====================================");
			// 	console.log("plainText", plainText);
			// 	console.log(p);
			// 	console.log("====================================");
			// 	return plainText; // Returns HTML from a custom parser
			// },
			autofocus: true,
			autosave: {
				enabled: true,

				delay: 3000,

				//在storage中 会自动生成key为smde_marked_text的键代表markdown格式的内容
				uniqueId: "marked_text",
			},
			promptURLs: true,

			placeholder: "写点东西吧~",

			tabSize: 4,
		};
		// 挂载markdown编辑器并进行配置
		let editor = (this.editor = new SimpleMDE({
			element: this.markedEditorRef.current,
			...config,
		}));
		editor.codemirror.on(
			"change",
			_.debounce(() => {
				console.log("====================================");
				console.log(24163464);
				console.log("====================================");
				if (!editor.value()) {
					this.setState({
						isEmpty: true,
					});
				} else {
					this.setState({
						isEmpty: false,
					});
				}
			}, 300)
		);
		// 1. 由编辑文章进入，显示已经发布了，并获取到的数据(数据为markdown格式的，并非HTML格式)
		// 2. 由创建文章进入，显示空数据或是编辑过但没有发布的数据(如：路由切换，数据保存至storage)
		// 由于该编辑器自动实现了，所以第2步不用自己实现（参见：autosave的配置）
		// 将html==>markdown字符串
		let markdownText =
			this.props.content && sitdown.HTMLToMD(this.props.content);
		markdownText && editor.value(markdownText);
		this.setState({ isEmpty: !!markdownText });
	}
	render() {
		const { isEmpty } = this.state;
		return (
			<div
				className={
					isEmpty
						? "markdownEditorApp-container markdown-error"
						: "markdownEditorApp-container"
				}
			>
				<textarea id="markdownEditorApp" ref={this.markedEditorRef} />
			</div>
		);
	}
}
export default MarkdownEditor;
