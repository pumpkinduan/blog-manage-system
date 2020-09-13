import React, { PureComponent } from "react";
import "App.css";
import "antd/dist/antd.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { getLocalStorage } from "./utils/index";
import Home from "containers/Home/index";
import Login from "containers/Login/index";
import Register from "containers/Register/index";
import Loading from "components/Loading/index";
let isAuthencated = getLocalStorage("isAuthencated");
class App extends PureComponent {
	render() {
		return (
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
		);
	}
}

export default App;
