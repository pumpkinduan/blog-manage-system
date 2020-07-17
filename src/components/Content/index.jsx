import { Layout, Tag } from "antd";
import React from "react";
import { routers } from "../../router/router";
import { Redirect, Switch, Route } from "react-router-dom";
import "./index.scss";
const { Content } = Layout;
class MainContent extends React.PureComponent {
  render() {
    return (
      <Content
        style={{
          position: "relative",
          padding: "35px 20px",
          marginTop: "100px",
        }}
      >
        <nav className="tag-nav">
          {this.props.tags.map((tag) => (
            <Tag
              style={{
                marginLeft: "5px",
                padding: "4px 6px",
                background: "#e9e9e9",
                cursor: "pointer",
              }}
              closable
            >
              {tag}
            </Tag>
          ))}
        </nav>
        <Redirect from="/" to="/dashboard" />
        <section className="wrapper-content">
          <Switch>
            {routers.map((r) => (
              <Route
                path={r.path}
                key={r.path}
                exact={r.exact}
                render={(props) => <r.component {...props} />}
              />
            ))}{" "}
          </Switch>
        </section>
      </Content>
    );
  }
}
export default MainContent;
