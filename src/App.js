import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import Icon from "@ant-design/icons";
import BatIcon from "./Icons/bat-icon.svg";
import BowlIcon from "./Icons/bowl-icon.svg";
import VenueIcon from "./Icons/venue-icon.svg";

import "./App.css";

const iconPath = process.env.PUBLIC_URL + "/assets/";
const { Header, Content, Sider } = Layout;

class App extends React.Component {
  state = {
    collapsed: false,
    tab: "1",
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  onTabChange = (event) => {
    this.setState({ tab: event.key });
  };

  render() {
    return (
      <Layout className="dashboard-layout">
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo">
            <img src={`${iconPath}full-logo.svg`} alt="Logo" />
          </div>
          <Menu
            defaultSelectedKeys={[this.state.tab]}
            mode="inline"
            className="nav-menu"
            onClick={this.onTabChange}
          >
            <Menu.Item
              key="1"
              icon={
                <Icon
                  component={BatIcon}
                  className={this.state.tab === "1" ? "svg-focus" : ""}
                />
              }
            >
              Batting
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={
                <Icon
                  component={BowlIcon}
                  className={this.state.tab === "2" ? "svg-focus" : ""}
                />
              }
            >
              Bowling
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={
                <Icon
                  component={VenueIcon}
                  className={this.state.tab === "3" ? "svg-focus" : ""}
                />
              }
            >
              Venue
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              Bill is a cat.
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
