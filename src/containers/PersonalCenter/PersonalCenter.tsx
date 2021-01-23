import React from "react";
import { Tabs } from "antd";
import { Moments, Settings, Words } from "./";
import { useHistory } from "react-router";

const { TabPane } = Tabs;

type HistoryType = { activeKey: ActiveKeys };
enum ActiveKeys {
	MOMENTS = "moments",
	SETTINGS = "settings",
	WORDS = "words",
}
const PersonalCenter = () => {
	const history = useHistory<HistoryType>();
	const defaultActiveKey =
		history.location.state?.activeKey || ActiveKeys.MOMENTS;
	return (
		<Tabs defaultActiveKey={defaultActiveKey}>
			<TabPane tab="个人动态" key={ActiveKeys.MOMENTS}>
				<Moments />
			</TabPane>
			<TabPane tab="个人设置" key={ActiveKeys.SETTINGS}>
				<Settings />
			</TabPane>
			<TabPane tab="ta们对你说" key={ActiveKeys.WORDS}>
				<Words />
			</TabPane>
		</Tabs>
	);
};

export default PersonalCenter;
