import React, {
	forwardRef,
	useEffect,
	useRef,
	useImperativeHandle,
	useState
} from 'react';
import E from 'wangeditor';
import { getBase64, compressImage } from 'utils';
import { PHOTO_TYPE } from 'interfaces/photo.interface';
import { server, uploadPhoto } from 'core/apis';
import { message } from 'antd';
import './style.scss';
export interface RichEditorApis {
	getEditorInstance: () => E;
}
export const RichEditor = forwardRef<RichEditorApis>((props, ref) => {
	const wangeditorContainer = useRef<HTMLDivElement>(null);
	const elementContainer = useRef<HTMLDivElement>(null);
	const [instance, setIsntance] = useState<E>();
	useImperativeHandle(
		ref,
		() => {
			return {
				getEditorInstance: () => instance as E
			};
		},
		[instance]
	);

	useEffect(() => {
		const initConfig = () => {
			/**
			 * 挂载富文本编辑器并进行配置
			 */
			const editor = new E(wangeditorContainer.current);

			/**
			 * 保存 编辑器实例
			 */
			setIsntance(editor);

			/**
			 * 内容监听函数
			 */
			editor.config.onchange = (html) => {
				// 自动保存至草稿箱
				// TODO ....
				if (!html) {
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
				const formData = new FormData();
				let img: unknown = null;
				formData.append('type', PHOTO_TYPE.POST);
				formData.append('file', resultFiles[0]);
				// getBase64(resultFiles[0]).then((base64) => {
				// 	// 想要得到 当前插入的图片实例，可以对该图片做一些操作，如上传之前，实现图片的蒙版效果，loading效果
				// 	img = insertImgFn(base64);
				// });
				uploadPhoto(formData).then((result) => {
					// TODO 文章内容的图片上传
					// (img as HTMLImageElement).setAttribute(
					// 	'src',
					// 	server.baseURL + result.data.path
					// );
					insertImgFn(server.baseURL + result.data.path);
				});
				// resultFiles 是 input 中选中的文件列表
				// insertImgFn 是获取图片 url 后，插入到编辑器的方法
				// 上传图片，返回结果，将图片插入到编辑器中
				// compressImage({ file: resultFiles[0] })
				// 	.then((file) => {
				// 		getBase64(file).then((base64) => {
				// 			insertImgFn(base64);
				// 		});
				// 	})
				// 	.catch((err) => {
				// 		console.log(err);
				// 	});
			};
			editor.config.customAlert = function (s, t) {
				switch (t) {
					case 'success':
						message.success(s);
						break;
					case 'info':
						message.info(s);
						break;
					case 'warning':
						message.warning(s);
						break;
					case 'error':
						message.error(s);
						break;
					default:
						message.info(s);
						break;
				}
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

			// 初始化时清空默认的p标签
			editor.txt.html('');
		};

		initConfig();
	}, []);
	return (
		<div ref={elementContainer}>
			<div id="richEditorApp" ref={wangeditorContainer} />
		</div>
	);
});
