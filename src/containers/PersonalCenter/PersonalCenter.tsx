import React, { PureComponent } from "react";
import { Tabs } from "antd";
import { Moments, Settings, Words } from "components/PersonalCenter";
const { TabPane } = Tabs;
class personalCenter extends PureComponent {
	state = { activeKey: "3" };
	onTabClick = (key: string) => {
		this.setState({ activeKey: key });
	};
	render() {
		return (
			<Tabs
				defaultActiveKey={this.state.activeKey}
				onTabClick={this.onTabClick}
			>
				<TabPane tab="个人动态" key="1">
					<Moments />
				</TabPane>
				<TabPane tab="个人设置" key="2">
					<Settings />
				</TabPane>
				<TabPane tab="ta们对你说" key="3">
					<Words />
				</TabPane>
			</Tabs>
		);
	}
}
export default personalCenter;
