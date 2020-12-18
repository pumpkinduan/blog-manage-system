import React from 'react';
import { Link } from 'react-router-dom';
import { List, Avatar, Button } from 'antd';
import { createRandomColor } from 'utils';
import { CommentInterface } from 'interfaces/index.interface';

interface IProps {
	onClearCommentMsg: () => void;
	onReadOneComment: (e) => void;
	dataSource: {
		title: string;
		src: string;
		createdAt: string;
		content: string;
		read: boolean;
	}[];
}
// 用于展示实时留言消息
export const MessageList = ({
	onClearCommentMsg,
	onReadOneComment,
	dataSource,
}: IProps) => {
	return (
		<List
			style={{
				background: '#fff',
				boxShadow:
					' 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
			}}
			itemLayout="vertical"
			dataSource={dataSource}
			renderItem={(item) => (
				<List.Item
					actions={[item.createdAt]}
					onClick={onReadOneComment}
					style={{ borderBottom: '1px solid #eee' }}>
					<List.Item.Meta
						title={item.title}
						description={item.content}
						avatar={
							item.src && item.title ? (
								<Avatar src={item.src} />
							) : (
								<Avatar
									style={{
										fontWeight: 'bolder',
										color: '#fff',
										background: createRandomColor(),
									}}>
									{item.title.substring(0, 1)}
								</Avatar>
							)
						}
					/>
				</List.Item>
			)}>
			<div
				className="bottom-btns"
				style={{ display: dataSource.length ? 'flex' : 'none' }}>
				<Button
					block={true}
					type="text"
					size="large"
					onClick={onClearCommentMsg}>
					清空消息
				</Button>
				<Button block={true} type="text" size="large">
					<Link
						to={{
							pathname: '/personalCenter',
							state: { activeKey: 'words' },
						}}>
						查看更多
					</Link>
				</Button>
			</div>
		</List>
	);
};
