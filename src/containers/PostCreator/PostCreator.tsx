import React, { useState, useRef, useEffect } from 'react';
import { RichEditor, Some_APIS } from 'components/Editor';
import { PostProfile, PostProfileExposed } from './components/PostProfile';
import { BasicUpload } from 'components/BasicUpload';
import { message, Tooltip } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { STATUS } from 'interfaces/post.interface';
import {
	createPost,
	deletePhotoByPath,
	getPostDetail,
	updatePost,
	server,
	uploadPhotos
} from 'core/apis';
import { PHOTO_TYPE } from 'interfaces/photo.interface';
import { PhotoInterface, ResultInterface } from 'interfaces/index.interface';
import { useHistory } from 'react-router';
import { pick, getBase64 } from 'utils';
import './style.scss';

const PostCreator = () => {
	const refEditor = useRef<Some_APIS>();
	const refPostProfile = useRef<PostProfileExposed>();
	const ref = useRef<{ photoPath: string }>({
		photoPath: ''
	});
	const [coverUrl, setCoverUrl] = useState('');

	const history = useHistory<{ isEdited: boolean; postId: string }>();
	const isEdited = history.location.state?.isEdited;
	const postId = history.location.state?.postId;
	useEffect(() => {
		/**
		 * 编辑文章
		 */
		if (isEdited) {
			getPostDetail(postId).then((result) => {
				ref.current.photoPath = result.data.coverUrl;
				setCoverUrl(server.baseURL + result.data.coverUrl);
				refPostProfile.current
					?.getFormInstance()
					.setFieldsValue(
						pick(result.data, [
							'author',
							'tags',
							'category',
							'description',
							'title'
						])
					);
				refEditor.current
					?.getEditorInstance()
					.txt.html(result.data.content);
			});
		}
	}, []);

	/**
	 * 发布新文章
	 */
	const handlePublish = async (status: STATUS) => {
		if (!refPostProfile.current || !refEditor.current) return;
		const vals = await refPostProfile.current
			.getFormInstance()
			?.validateFields();
		const txt = refEditor.current.getEditorInstance().txt.text();

		if (!txt) return;

		const html = refEditor.current.getEditorInstance().txt.html();

		const data = Object.assign(vals, {
			content: html,
			status,
			coverUrl: ref.current?.photoPath
		});
		await handleUploadFiles();

		if (isEdited) {
			await updatePost(postId, data);
		} else {
			await createPost(data);
		}
		handleReset();
		message.success(status + ' successfully');
	};

	/**
	 * 上传多图片
	 */
	const handleUploadFiles = async () => {
		if (!refEditor.current) return;
		const files = refEditor.current.getFiles();

		const formData = new FormData();
		formData.append('type', PHOTO_TYPE.POST);
		files.forEach((file) => {
			formData.append('files', file);
		});
		if (files.length !== 0) {
			const result = await uploadPhotos(formData);
			transformImagesBase64IntoUrl(result.data);
		}
	};
	/**
	 * 上传图片至服务器后, 将编辑器内的base64格式的图片替换成真实的地址
	 */
	const transformImagesBase64IntoUrl = (
		data: PhotoInterface.BasicPhoto[]
	) => {
		if (!refEditor.current) return;
		const imgages = document
			.getElementById('richEditorApp')
			?.getElementsByTagName('img');
		imgages &&
			Array.from(imgages).forEach((image, index) => {
				image.src = data[index].path;
			});
	};

	/**
	 * 保存文章信息至草稿箱
	 */
	const handleDraft = (status: STATUS) => {};

	/**
	 * 清空所有信息
	 */
	const handleReset = () => {
		refPostProfile.current?.getFormInstance().resetFields();
		refEditor.current?.getEditorInstance().txt.clear();
		setCoverUrl('');
		ref.current.photoPath = '';
	};
	return (
		<div className="article-create-container">
			<PostProfile ref={refPostProfile} />
			<div className="article-cover" style={{ marginBottom: '16px' }}>
				<BasicUpload
					placehloder={isEdited ? ' 更换文章封面 ' : '上传文章封面'}
					data={{ type: PHOTO_TYPE.POST }}
					onChange={(info) => {
						if (info.file.status && info.file.status === 'done') {
							ref.current.photoPath = (info.file
								.response as ResultInterface<PhotoInterface.BasicPhoto>).data.path;
							info.file.originFileObj &&
								getBase64(info.file.originFileObj).then(
									(base64) => {
										setCoverUrl(base64);
									}
								);
						}
					}}
					showUploadList={false}
				/>
				{coverUrl && (
					<Tooltip title="上传错了? 点击删除，重新再上传吧">
						<CloseOutlined
							className="delete-icon"
							style={{ marginLeft: '5px' }}
							onClick={() => {
								ref.current.photoPath &&
									deletePhotoByPath({
										path: ref.current.photoPath
									}).then(() => {
										setCoverUrl('');
										ref.current.photoPath = '';
										message.success('删除成功');
									});
							}}
						/>
					</Tooltip>
				)}

				{coverUrl && (
					<div style={{ paddingTop: '16px' }}>
						<img src={coverUrl} alt="cover" height={120} />
					</div>
				)}
			</div>

			<div className="editor-container">
				<RichEditor ref={refEditor} />
			</div>
			<div className="article-controls">
				<span
					key="post"
					className="post-btn btn"
					onClick={() => {
						handlePublish(
							isEdited ? STATUS.UPDATED : STATUS.PUBLISHED
						);
					}}>
					{isEdited ? 'Save' : 'Publish'}
				</span>
				<span
					key="draft"
					className="draft-btn btn"
					onClick={() => {
						handleDraft(STATUS.DRAFTED);
					}}>
					Draft
				</span>
				<span
					key="reset"
					className="reset-btn btn"
					onClick={handleReset}>
					Reset
				</span>
			</div>
		</div>
	);
};
export default PostCreator;
