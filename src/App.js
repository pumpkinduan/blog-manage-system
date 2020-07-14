import React, { PureComponent } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { routers } from "./router/router";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { getLocalStorage } from "./utils/index";
import Login from "./containers/Login/index";

let isAuthencated = getLocalStorage("isAuthencated");
class App extends PureComponent {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/dashboard" />} />{" "}
          {routers.map((r) => (
            <Route
              path={r.path}
              key={r.path}
              exact={r.exact}
              render={(props) => {
                if (r.requireAuth && !isAuthencated) {
                  return <Redirect to="/login" />;
                }
                return <r.component {...props} />;
              }}
            />
          ))}{" "}
          <Route path="/login" exact render={(props) => <Login {...props} />} />
        </Switch>{" "}
      </Router>
    );
  }
}

export default App;
