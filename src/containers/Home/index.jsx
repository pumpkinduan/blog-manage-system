import React, { PureComponent } from 'react'
import './index.scss'
import Header from '../../components/Header/index'
import SiderBar from '../../components/SiderBar/index'
import { Layout } from "antd";
class Home extends PureComponent {
    render() {
        return (
            <Layout>
                <SiderBar />
                <Header />
            </Layout>
        )
    }
}
export default Home;