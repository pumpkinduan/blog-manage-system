import React from "react";
import { Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import "./ListCard.scss";
import { listItemInterface } from "types/Article";
interface listCardProps {
	confirmToDelelte: (
		selectedItemId: string | number,
		selectedItemIndex: number
	) => void;
	listItem: listItemInterface;
	selectedItemIndex: number;
}
class ListCard extends React.PureComponent<listCardProps> {
	eleDivRef: React.RefObject<HTMLDivElement> = React.createRef<
		HTMLDivElement
	>();
	render() {
		const { listItem, selectedItemIndex, confirmToDelelte } = this.props;
		return (
			<div className="cover-wrapper">
				<div className="article-sub-info" ref={this.eleDivRef}>
					<h1>
						<Link
							className="title"
							to={{
								pathname: "/articleCreate",
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
					<div className="btn-controls">
						<span className="edit-btn btn">编辑</span>
						<Popconfirm
							getPopupContainer={() =>
								this.eleDivRef.current || document.body
							}
							title="您真的要删除这篇文章嘛？"
							onConfirm={() => {
								confirmToDelelte(
									listItem.id,
									selectedItemIndex
								);
							}}
							okText="确定"
							cancelText="取消"
						>
							<span className="del-btn btn">删除</span>
						</Popconfirm>
					</div>
				</div>
				<img src={listItem.coverUrl} alt="" />
			</div>
		);
	}
}
export default ListCard;
