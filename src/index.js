import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./global.css";
ReactDOM.render(
  <Provider store={store}>
    <App />{" "}
  </Provider>,
  document.getElementById("root")
);
