import React from "react";
import "./index.scss";
import { Popconfirm, message } from "antd";
interface IProps {
	onPublish: (status: string) => void;
	toggleEditor: () => void;
	clearAllContent: () => void;
	onPreview: () => void;
}
class ArticleControl extends React.PureComponent<IProps> {
	_onDraft = () => {
		// post
		this.props.onPublish("drafted");
	};
	_onPublish = () => {
		// post
		this.props.onPublish("published");
	};
	confirmToResetInfo = () => {
		message.success("您已清空文章信息");
		this.props.clearAllContent();
	};
	confirmToSwitchEditor = (e) => {
		message.success("成功切换编辑器");
		this.props.toggleEditor();
	};
	cancel = (e) => {
		message.error("您已取消");
	};
	render() {
		const { onPreview } = this.props;
		return (
			<div className="article-controls">
				<Popconfirm
					title="是否清空文章信息？"
					onConfirm={this.confirmToResetInfo}
					onCancel={this.cancel}
					okText="Yes"
					cancelText="No"
				>
					<span className="reset-btn btn">Reset</span>
				</Popconfirm>
				<Popconfirm
					title="是否切换编辑器？"
					onConfirm={this.confirmToSwitchEditor}
					onCancel={this.cancel}
					okText="Yes"
					cancelText="No"
					key="switch"
				>
					<span className="switch-btn btn">Switch</span>
				</Popconfirm>
				<span
					key="preview"
					className="preview-btn btn"
					onClick={onPreview}
				>
					Preview
				</span>
				<span
					key="post"
					className="post-btn btn"
					onClick={this._onPublish}
				>
					Publish
				</span>
				<span
					key="draft"
					className="draft-btn btn"
					onClick={this._onDraft}
				>
					Draft
				</span>
			</div>
		);
	}
}
export default ArticleControl;
