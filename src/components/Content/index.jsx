import { Layout, Tag } from "antd";
import React from "react";
import PropTypes from "prop-types";

import { routers } from "../../router/router";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import "./index.scss";
const { Content } = Layout;
class MainContent extends React.PureComponent {
  render() {
    const { tags = [], removeTag } = this.props;
    return (
      <Content
        className="main-content"
        style={{
          padding: tags.length ? "36px 20px" : "0 20px",
        }}
      >
        <nav
          className="tag-nav"
          style={{ padding: tags.length ? "8px 10px" : "" }}
        >
          {tags.map((tag, index) => (
            <Tag
              key={tag.path}
              color="purple"
              style={{
                marginLeft: "5px",
                padding: "3px 5px",
                cursor: "pointer",
              }}
              onClose={() => {
                removeTag(index);
              }}
              closable
            >
              <Link to={tag.path}>{tag.title}</Link>
            </Tag>
          ))}
        </nav>
        <Redirect from="/" to="/articleCreate" />
        <section className="wrapper-content">
          <Switch>
            {routers.map((r) => (
              <Route
                path={r.path}
                key={r.path}
                strict={true}
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
MainContent.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeTag: PropTypes.func.isRequired,
};

export default MainContent;
