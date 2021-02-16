import React, {
	useEffect,
	useState,
	useRef,
	useImperativeHandle,
	forwardRef,
} from "react";
import SimpleMDE from "simplemde";
import { Sitdown } from "sitdown";
import _ from "loadsh";
import "assets/styles/simplemde.scss";
import "./style.scss";

let sitdown = new Sitdown();
export interface Marked_Exposed_Some_APIS {
	getEditorInstance: () => SimpleMDE;
}
export const MarkdownEditor = forwardRef((props: { content?: string }, ref) => {
	const markdownInstance = useRef<SimpleMDE | null>(null);
	const markdownContainer = useRef<HTMLTextAreaElement>(null);
	const [isEmpty, setIsEmpty] = useState(false);

	useImperativeHandle(ref, () => ({
		getEditorInstance: () => markdownInstance.current,
	}));
	useEffect(() => {
		const initConfig = () => {
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

			markdownInstance.current = new SimpleMDE({
				element: markdownContainer.current,
				...config,
			});
			markdownInstance.current.codemirror.on(
				"change",
				_.debounce(() => {
					if (!markdownInstance.current.value()) {
						setIsEmpty(true);
					} else {
						setIsEmpty(false);
					}
				}, 100)
			);
			// 1. 由编辑文章进入，显示已经发布了，并获取到的数据(数据为markdown格式的，并非HTML格式)
			// 2. 由创建文章进入，显示空数据或是编辑过但没有发布的数据(如：路由切换，数据保存至storage)
			// 由于该编辑器自动实现了，所以第2步不用自己实现（参见：autosave的配置）
			// 将html==>markdown字符串
			let markdownText = props.content && sitdown.HTMLToMD(props.content);
			markdownText && markdownInstance.current.value(markdownText);
		};
		initConfig();
	}, []);
	return (
		<div
			className={
				isEmpty
					? "markdownEditorApp-container markdown-error"
					: "markdownEditorApp-container"
			}
		>
			<textarea id="markdownEditorApp" ref={markdownContainer} />
		</div>
	);
});
