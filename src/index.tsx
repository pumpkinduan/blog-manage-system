import App from "./App";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./global.css";
import React, { PureComponent } from "react";
import "./App.css";
import "antd/dist/antd.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { getLocalStorage } from "./utils/index";
import Home from "./containers/Home/index";
import Login from "./containers/Login/index";
import Register from "./containers/Register/index";
import Loading from "./components/Loading/index";
let isAuthencated = getLocalStorage("isAuthencated");
ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Loading />
			<Switch>
				<Route
					path="/register"
					exact
					render={(props) => <Register {...props} />}
				/>
				<Route path="/login" exact render={(props) => <Login {...props} />} />
				<Route
					strict={true}
					path="/"
					render={(props) => {
						if (!isAuthencated) {
							return <Redirect to="/login" />;
						}
						return <Home {...props} />;
					}}
				/>{" "}
			</Switch>{" "}
		</Router>
	</Provider>,
	document.getElementById("root")
);
