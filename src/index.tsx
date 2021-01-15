import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './global.scss';
import React from 'react';
import 'antd/dist/antd.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import Home from './containers/Home';
import { Login, Register } from './containers/Open';
import { GlobalLoading } from './components/Loading/GlobalLoading';
import locale from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('zh-cn');
dayjs.extend(relativeTime);
ReactDOM.render(
	<ConfigProvider locale={locale}>
		<Provider store={store}>
			<Router>
				<GlobalLoading />
				<Switch>
					<Route path="/register" exact render={() => <Register />} />
					<Route path="/login" exact render={() => <Login />} />
					<Route
						strict={true}
						path="/*"
						render={() => {
							if (!localStorage.getItem('accessToken')) {
								return <Redirect to="/login" />;
							}
							return <Home />;
						}}
					/>
				</Switch>
			</Router>
		</Provider>
	</ConfigProvider>,
	document.getElementById('root')
);
