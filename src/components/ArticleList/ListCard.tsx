import React from 'react';
import { Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom';
import './ListCard.scss';
import { listItemInterface } from 'types/Article';
interface IProps {
	listItem: listItemInterface;
	render?: (ref: React.RefObject<HTMLDivElement>) => React.ReactNode;
}
class ListCard extends React.PureComponent<IProps> {
	eleDivRef: React.RefObject<HTMLDivElement> = React.createRef<
		HTMLDivElement
	>();
	render() {
		const { listItem } = this.props;
		return (
			<div className="cover-wrapper">
				<div className="article-sub-info" ref={this.eleDivRef}>
					<h1>
						<Link
							className="title"
							to={{
								pathname: '/articleCreate',
								state: { isEdited: true },
							}}
						>
							{listItem.title}
						</Link>
					</h1>
					<p className="statics">
						<span>
							获赞：<strong>{listItem.likes}</strong>
						</span>
						<span>
							留言：<strong>{listItem.comments}</strong>
						</span>
						<span>
							访问量：<strong>{listItem.visitors}</strong>
						</span>
					</p>
					<p>发布时间：{listItem.createdAt}</p>
					{this.props.render && this.props.render(this.eleDivRef)}
				</div>
				<img src={listItem.coverUrl} alt="" />
			</div>
		);
	}
}
export default ListCard;
