import React from 'react';
import { connect } from 'react-redux';
import Statics from '../../components/DashBoard/Statics/index';
import Charts from '../../components/DashBoard/Charts/index';
import {
	TeamOutlined,
	LikeOutlined,
	CommentOutlined,
	UploadOutlined,
} from '@ant-design/icons';
const data = [
	{ month: '1月', counts: 10 },
	{ month: '2月', counts: 12 },
	{ month: '3月', counts: 2 },
	{ month: '4月', counts: 5 },
	{ month: '5月', counts: 10 },
	{ month: '6月', counts: 14 },
	{ month: '7月', counts: 20 },
	{ month: '8月', counts: 2 },
	{ month: '9月', counts: 21 },
	{ month: '10月', counts: 4 },
	{ month: '11月', counts: 7 },
	{ month: '12月', counts: 55 },
];
class DashBoard extends React.Component {
	state = {
		statics: [
			{
				title: '网站访问量',
				counts: 150,
				icon: <TeamOutlined />,
			},
			{
				title: '文章获赞数',
				counts: 120,
				icon: <LikeOutlined />,
			},
			{
				title: '留言数',
				counts: 45,
				icon: <CommentOutlined />,
			},
			{
				title: '文章下载量',
				counts: 15,
				icon: <UploadOutlined rotate={180} />,
			},
		],
		title: '网站访问量',
	};
	componentDidMount() {
		// request api
	}
	updateCharts = (data) => {
		// 根据点击的属性来更新图表数据
		// 例如：留言数是一个属性，它对应12个月的数据用图表表示，访问量也一样
		this.setState({ title: data.title });
	};
	render() {
		const { statics, title } = this.state;
		return (
			<div className="dashboard-container">
				<Statics data={statics} updateCharts={this.updateCharts} />
				<Charts data={data} title={title} />
			</div>
		);
	}
}
// const mapStateToProps = (state) => {
//     return {
//         likes: state.likes,
//         visitors: state.visitors,
//         comments: state.comments,
//         downloads: state.downloads
//     }
// }
export default connect()(DashBoard);
