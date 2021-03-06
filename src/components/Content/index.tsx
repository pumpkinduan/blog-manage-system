import { Layout, Tag } from 'antd';
import React from 'react';
import { routers } from '../../router/router';
import { Switch, Route, Link } from 'react-router-dom';
import './index.scss';
const { Content } = Layout;
interface IProps {
	tags: tagProps[];
	removeTag: (index: number) => void;
}
interface tagProps {
	path: string;
	title: string;
}
class MainContent extends React.PureComponent<IProps> {
	render() {
		const { tags = [], removeTag } = this.props;
		return (
			<Content
				className="main-content"
				style={{
					padding: tags.length ? '36px 20px' : '0 20px'
				}}>
				<nav
					className="tag-nav"
					style={{ padding: tags.length ? '8px 10px' : '' }}>
					{tags.map((tag, index) => (
						<Tag
							key={tag.path}
							color="purple"
							style={{
								marginLeft: '5px',
								padding: '3px 5px',
								cursor: 'pointer'
							}}
							onClose={() => {
								removeTag(index);
							}}
							closable>
							<Link to={tag.path}>{tag.title}</Link>
						</Tag>
					))}
				</nav>
				<section className="wrapper-content">
					{/* <Redirect from="/*" to="/dashboard" /> */}
					<Switch>
						{routers.map((r) => (
							<Route
								path={r.path}
								key={r.path}
								exact={r.exact}
								render={(props) => <r.component {...props} />}
							/>
						))}
					</Switch>
				</section>
			</Content>
		);
	}
}

export default MainContent;
