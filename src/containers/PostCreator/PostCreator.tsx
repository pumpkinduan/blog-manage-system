import React, { useState, useRef, useEffect } from 'react';
import { RichEditor, Some_APIS } from 'components/Editor';
import { PostProfile, PostProfileExposed } from './components/PostProfile';
import { BasicUpload } from 'components/BasicUpload';
import { notification, Tooltip } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { STATUS } from 'interfaces/post.interface';
import { createPost, deletePhoto, getPostDetail } from 'core/apis';
import { PHOTO_TYPE } from 'interfaces/photo.interface';
import { PhotoInterface, ResultInterface } from 'interfaces/index.interface';
import { useHistory } from 'react-router';
import './style.scss';
import { pick } from 'utils';

function getBase64(file): Promise<any> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}

const PostCreator = () => {
	const refEditor = useRef<Some_APIS>();
	const refPostProfile = useRef<PostProfileExposed>();
	const ref = useRef<{ photoInfo: PhotoInterface.BasicPhoto | null }>({
		photoInfo: null
	});
	const [imgBase64, setImgBase64] = useState('');

	const history = useHistory<{ isEdited: boolean; postId: string }>();
	console.log(history);

	useEffect(() => {
		/**
		 * 编辑文章
		 */
		if (history.location.state.isEdited) {
			getPostDetail(history.location.state.postId).then((result) => {
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
		const vals = await refPostProfile.current
			?.getFormInstance()
			?.validateFields();
		const content = refEditor.current?.getEditorInstance().txt.text();

		const data = Object.assign(vals, {
			content,
			status,
			coverUrl: ref.current?.photoInfo?.path
		});
		await createPost(data);
		handleReset();
		notification.success({
			message: status,
			duration: 1,
			style: {
				cursor: 'pointer'
			}
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
	};
	return (
		<div className="article-create-container">
			<PostProfile ref={refPostProfile} />
			<div className="article-cover" style={{ marginBottom: '16px' }}>
				<BasicUpload
					placehloder="上传文章封面"
					data={{ type: PHOTO_TYPE.POST }}
					onChange={(info) => {
						if (info.file.status && info.file.status === 'done') {
							ref.current.photoInfo = (info.file
								.response as ResultInterface<PhotoInterface.BasicPhoto>).data;
							info.file.originFileObj &&
								getBase64(info.file.originFileObj).then(
									(base64) => {
										setImgBase64(base64);
									}
								);
						}
					}}
					showUploadList={false}
				/>
				{imgBase64 && (
					<Tooltip title="上传错了? 点击删除，重新再上传吧">
						<CloseOutlined
							className="delete-icon"
							style={{ marginLeft: '5px' }}
							onClick={() => {
								ref.current.photoInfo &&
									deletePhoto(ref.current.photoInfo.id).then(
										() => {
											setImgBase64('');
										}
									);
							}}
						/>
					</Tooltip>
				)}

				{imgBase64 && (
					<div style={{ paddingTop: '16px' }}>
						<img src={imgBase64} alt="" height={120} />
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
						handlePublish(STATUS.PUBLISHED);
					}}>
					Publish
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
