import React, { useEffect, useState } from 'react';
import Header from 'components/Header';
import SiderBar from 'components/SiderBar';
import MainContent from 'components/Content';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { controlGlobalLoading } from 'redux/actionCreators';
import { removeLocalStorage } from 'utils';
import { getUserProfile } from 'core/apis';
import './index.scss';
// import { useHistory } from "react-router-dom";
const Home = (props) => {
	let [tags, setTags] = useState([
		{ title: 'DashBoard', path: '/dashboard' },
	]);

	useEffect(() => {
		getUserProfile().then((res) => {
			console.log(res);
		});
	}, []);
	const logout = () => {
		removeLocalStorage('accessToken');
		props.dispatch(controlGlobalLoading({ status: 'start' }));
		setTimeout(() => {
			props.dispatch(controlGlobalLoading({ status: 'end' }));
			props.history.replace('/login');
		}, 1000);
	};

	// 用于在内容区域生成 导航tag
	const addTag = (tag) => {
		// 避免添加重复的tag
		let flag = true;
		for (let i = 0; i < tags.length; i++) {
			if (tag.path === tags[i].path) {
				flag = false;
				return;
			}
		}
		if (flag) {
			setTags([...tags, tag]);
		}
	};
	const removeTag = (index) => {
		let tempTags = [...tags];
		tempTags.splice(index, 1);
		setTags([...tempTags]);
	};
	return (
		<Layout style={{ flexDirection: 'column', height: '100%' }}>
			<Header logout={logout} {...props} />
			<Layout style={{ backgroundColor: '#fff' }}>
				<SiderBar addTag={addTag} {...props} />
				<MainContent tags={tags} {...props} removeTag={removeTag} />
			</Layout>
		</Layout>
	);
};
const mapStateToProps = (state) => {
	return {
		visitors: state.visitors,
		comments: state.comments,
	};
};
export default connect(mapStateToProps, null)(Home);
