import React, { useState, useRef, useEffect } from 'react';
import { RichEditor, RichEditorApis } from 'components/Editor';
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
	const refEditor = useRef<ReturnType<RichEditorApis['getEditorInstance']>>();
	const refPostProfile = useRef<
		ReturnType<PostProfileExposed['getFormInstance']>
	>();

	/** 封面的地址 */
	const ref = useRef<{ photoPath: string }>({
		photoPath: ''
	});
	/** base64格式 */
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
				refPostProfile.current?.setFieldsValue(
					pick(result.data, [
						'author',
						'tags',
						'category',
						'description',
						'title'
					])
				);
				refEditor.current?.txt.html(result.data.content);
			});
		}
	}, []);

	/**
	 * 发布新文章
	 */
	const handlePublish = async (status: STATUS) => {
		if (!refPostProfile.current || !refEditor.current) return;
		const vals = await refPostProfile.current?.validateFields();
		const text = refEditor.current.txt.text();
		const html = refEditor.current.txt.html();

		/** 文章cover不能为空 */
		if (!ref.current.photoPath) {
			message.error('文章封面不能为空');
			return;
		}

		/** 内容为空，不能发布 */
		if (!html) {
			message.error('文章内容不能为空');
			return;
		}

		const data = Object.assign(vals, {
			content: html,
			status,
			coverUrl: ref.current?.photoPath
		});

		if (isEdited) {
			await updatePost(postId, data);
		} else {
			await createPost(data);
		}
		status === STATUS.PUBLISHED && handleReset();
		message.success(status + ' successfully');
	};

	/**
	 * 保存文章信息至草稿箱
	 */
	const handleDraft = (status: STATUS) => {
		handlePublish(status);
	};

	/**
	 * 清空所有信息
	 */
	const handleReset = () => {
		refPostProfile.current?.resetFields();
		refEditor.current?.txt.clear();
		setCoverUrl('');
		ref.current.photoPath = '';
	};
	return (
		<div className="article-create-container">
			<PostProfile
				ref={(e) => {
					if (e) {
						refPostProfile.current = e.getFormInstance();
					}
				}}
			/>
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
				<RichEditor
					ref={(e) => {
						if (e) {
							refEditor.current = e.getEditorInstance();
						}
					}}
				/>
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
