import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeLocalStorage } from 'utils';
import { getUserProfile } from 'core/apis';
import { Header } from './Header';
import SiderBar from 'components/SiderBar';
import MainContent from 'components/Content';
import { store } from 'redux/store';
import { initAdminInfo } from 'redux/actionCreators';
import { UserInterface } from 'interfaces/index.interface';
const Home = () => {
	const [tags, setTags] = useState([
		{ title: 'DashBoard', path: '/dashboard' },
	]);
	useEffect(() => {
		getUserProfile().then((res) => {
			store.dispatch(initAdminInfo(res.data as UserInterface.ADMIN));
		});
	}, []);
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
			<Header />
			<Layout style={{ backgroundColor: '#fff' }}>
				<SiderBar addTag={addTag} />
				<MainContent tags={tags} removeTag={removeTag} />
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
