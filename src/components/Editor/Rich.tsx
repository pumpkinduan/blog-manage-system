import React, {
	forwardRef,
	useEffect,
	useRef,
	useState,
	useImperativeHandle
} from 'react';
import E from 'wangeditor';
import { setLocalStorage, getLocalStorage } from 'utils';
import './style.scss';
export interface Some_APIS {
	getEditorInstance: () => E;
}
export const RichEditor = forwardRef((props, ref) => {
	const [isEmpty, setIsEmpty] = useState(false);
	const wangeditorContainer = useRef<HTMLDivElement>(null);
	const wangeditorInstance = useRef<E | null>(null);
	const isBlankSpace = (value) => {
		const reg = /^(&nbsp;)+$/;
		return reg.test(value);
	};
	useImperativeHandle(ref, () => ({
		getEditorInstance: () => wangeditorInstance.current
	}));

	useEffect(() => {
		const initConfig = () => {
			// 挂载富文本编辑器并进行配置
			const editor = new E(wangeditorContainer.current);

			// 保存 编辑器实例
			wangeditorInstance.current = editor;

			editor.config.onchange = (html) => {
				// 将html与内容一起保存到storage中，便于实现草稿功能
				setLocalStorage('rich_text', html);
			};
			editor.config.zIndex = 3;

			// 显示“上传图片”的tab
			editor.config.uploadImgServer = '/upload';
			editor.config.uploadImgShowBase64 = true;

			// 配置全屏功能按钮是否展示
			editor.config.showFullScreen = true;

			// 设置编辑区域高度为 400px
			editor.config.height = 400;

			editor.config.onchange = () => {
				if (!editor.txt.text() || isBlankSpace(editor.txt.text())) {
					setIsEmpty(true);
				} else {
					setIsEmpty(false);
				}
			};
			editor.config.onchangeTimeout = 100; // 单位 ms

			editor.config.placeholder = '写点东西吧~';

			editor.create();

			// 由编辑文章进入，显示已经发布了，并获取到的数据
			// 由创建文章进入，显示空数据或是编辑过但没有发布的数据(如：路由切换，数据保存至storage)
			editor.txt.text(getLocalStorage('rich_text') || '');
		};

		initConfig();
	}, []);
	return (
		<div className={isEmpty ? 'w-e-error' : ''}>
			<div id="richEditorApp" ref={wangeditorContainer} />
		</div>
	);
});
