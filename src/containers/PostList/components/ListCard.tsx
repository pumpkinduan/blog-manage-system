import { PostInterface } from 'interfaces/index.interface';
import React, { useRef } from 'react';
import { Popconfirm } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import { deletePosts, server } from 'core/apis';
import './style.scss';

interface IProps {
	listItem: PostInterface.BasicPost;
	onOk: () => void;
}
export const ListCard = ({ listItem, onOk }: IProps) => {
	const element = useRef<HTMLDivElement>(null);
	const history = useHistory();
	const handleDelete = (selectedItemId: string) => {
		deletePosts(selectedItemId).then(() => {
			onOk();
		});
	};
	return (
		<div className="cover-wrapper">
			<div className="article-sub-info" ref={element}>
				<h1>
					<Link
						className="title"
						to={{
							pathname: '/postCreator',
							state: { isEdited: true, postId: listItem.id }
						}}>
						{listItem.title}
					</Link>
				</h1>
				<p className="statics">
					<span>
						获赞：<strong>{listItem.likes}</strong>
					</span>
					<span>
						留言：<strong>{listItem.totalComments}</strong>
					</span>
					<span>
						访问量：<strong>{listItem.browsers}</strong>
					</span>
				</p>
				<p>发布时间：{dayjs(listItem.createdAt).fromNow()}</p>
				<div className="btn-controls">
					<span
						className="edit-btn btn"
						onClick={() => {
							history.push({
								pathname: '/postCreator',
								state: { isEdited: true, postId: listItem.id }
							});
						}}>
						编辑
					</span>
					<Popconfirm
						getPopupContainer={() =>
							element.current || document.body
						}
						title="您真的要删除这篇文章嘛？"
						onConfirm={() => {
							handleDelete(listItem.id);
						}}>
						<span className="del-btn btn">删除</span>
					</Popconfirm>
				</div>
			</div>
			<img src={server.baseURL + listItem.coverUrl} alt="" width="100%" />
		</div>
	);
};
