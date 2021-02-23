import React, {
	forwardRef,
	useEffect,
	useRef,
	useState,
	useImperativeHandle
} from 'react';
import E from 'wangeditor';
import {
	setLocalStorage,
	getLocalStorage,
	getBase64,
	compressImage
} from 'utils';
import { PHOTO_TYPE } from 'interfaces/photo.interface';
import './style.scss';
export interface Some_APIS {
	getEditorInstance: () => E;
	getFiles: () => File[];
}
export const RichEditor = forwardRef((props, ref) => {
	const wangeditorContainer = useRef<HTMLDivElement>(null);
	const elementContainer = useRef<HTMLDivElement>(null);
	const filesRef = useRef<File[]>([]);
	const wangeditorInstance = useRef<E | null>(null);
	useImperativeHandle(ref, () => ({
		getEditorInstance: () => wangeditorInstance.current,
		getFiles: () => filesRef.current
	}));

	useEffect(() => {
		const initConfig = () => {
			/**
			 * 挂载富文本编辑器并进行配置
			 */
			const editor = new E(wangeditorContainer.current);

			/**
			 * 保存 编辑器实例
			 */
			wangeditorInstance.current = editor;

			/**
			 * 内容监听函数
			 */
			editor.config.onchange = (html) => {
				// 自动保存至草稿箱
				// TODO ....
				if (!editor.txt.text()) {
					elementContainer.current?.classList.add('w-e-error');
				} else {
					elementContainer.current?.classList.remove('w-e-error');
				}
			};
			editor.config.zIndex = 3;

			/**
			 * 可选择本地图片，编辑器用 base64 格式显示图片。
			 * [注意] uploadImgShowBase64（base64 格式）和 uploadImgServer（上传图片到服务器）两者不能同时使用！！！
			 */
			editor.config.uploadImgShowBase64 = true;
			/**
			 * 不需要传递cookie
			 */
			editor.config.withCredentials = false;
			/**
			 * 上传参数
			 */
			editor.config.uploadImgParams = { type: PHOTO_TYPE.POST };
			/**
			 * http请求头参数
			 */
			editor.config.uploadImgHeaders = {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			};

			/**
			 * 自己实现上传图片
			 */
			editor.config.customUploadImg = (
				resultFiles: File[],
				insertImgFn
			) => {
				// resultFiles 是 input 中选中的文件列表
				// insertImgFn 是获取图片 url 后，插入到编辑器的方法
				// 上传图片，返回结果，将图片插入到编辑器中

				compressImage({ file: resultFiles[0] })
					.then((file) => {
						console.log(file);
						filesRef.current.push(file);
						getBase64(file).then((base64) => {
							insertImgFn(base64);
						});
					})
					.catch((err) => {
						console.log(err);
					});
			};

			/**
			 * 配置全屏功能按钮是否展示
			 */
			editor.config.showFullScreen = true;

			/**
			 * 设置编辑区域高度为 400px
			 */
			editor.config.height = 400;

			editor.config.onchangeTimeout = 3000; // 单位 ms

			editor.config.placeholder = '写点东西吧~';

			editor.create();

			// 由编辑文章进入，显示已经发布了，并获取到的数据
			// 由创建文章进入，显示空数据或是编辑过但没有发布的数据(如：路由切换，数据保存至storage)
			// editor.txt.text(getLocalStorage('rich_text') || '');
		};

		initConfig();
	}, []);
	return (
		<div ref={elementContainer}>
			<div id="richEditorApp" ref={wangeditorContainer} />
		</div>
	);
});
