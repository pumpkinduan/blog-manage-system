import { Layout } from "antd";
import React from "react";

const { Content } = Layout;
class MainContent extends React.PureComponent {
    render() {
        return (
            <Content style={{padding: '15px 30px'}}>
                Content
            </Content>
        )
    }
}   
export default MainContent;