import React, { PureComponent } from "react";
import { Tabs } from "antd";
import { Moments, Settings, Words } from "components/PersonalCenter";
const { TabPane } = Tabs;
class personalCenter extends PureComponent<any> {
	render() {
		const defaultActiveKey =
			this.props.history.location.state?.activeKey || "moments";
		return (
			<Tabs defaultActiveKey={defaultActiveKey}>
				<TabPane tab="个人动态" key="moments">
					<Moments />
				</TabPane>
				<TabPane tab="个人设置" key="settings">
					<Settings />
				</TabPane>
				<TabPane tab="ta们对你说" key="words">
					<Words />
				</TabPane>
			</Tabs>
		);
	}
}
export default personalCenter;
