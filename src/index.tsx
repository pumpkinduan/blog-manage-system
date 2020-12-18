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
let accessToken = localStorage.getItem('accessToken');
ReactDOM.render(
	<ConfigProvider locale={locale}>
		<Provider store={store}>
			<Router>
				<GlobalLoading />
				<Switch>
					<Route
						path="/register"
						exact
						render={(props) => <Register {...props} />}
					/>
					<Route
						path="/login"
						exact
						render={(props) => <Login {...props} />}
					/>
					<Route
						strict={true}
						path="/"
						render={(props) => {
							if (!accessToken) {
								return <Redirect to="/login" />;
							}
							return <Home {...props} />;
						}}
					/>
				</Switch>
			</Router>
		</Provider>
	</ConfigProvider>,
	document.getElementById('root')
);
