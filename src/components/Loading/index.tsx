import React, { PureComponent } from 'react';
import './index.scss';
import { Spin } from 'antd';
import { connect } from 'react-redux';
interface IProps {
	loadingStatus: boolean;
}
class Loading extends PureComponent<IProps> {
	render() {
		// 控制loading的显示与隐藏
		let { loadingStatus } = this.props;
		return (
			<Spin
				className="loading-container"
				delay={200}
				spinning={loadingStatus}
				size="large"
			/>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		loadingStatus: state.globalLoading.loadingStatus,
	};
};
export default connect(mapStateToProps)(Loading);
