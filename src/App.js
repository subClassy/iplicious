import React, { lazy, Suspense } from "react";
import { Layout, Menu } from "antd";
import Icon from "@ant-design/icons";
import BatIcon from "./Icons/bat-icon.svg";
import BowlIcon from "./Icons/bowl-icon.svg";
import VenueIcon from "./Icons/venue-icon.svg";
import "./App.scss";
const BattingStats = lazy(() => import("./Components/BattingStats"));
const BowlingStats = lazy(() => import("./Components/BowlingStats"));
const VenueStats = lazy(() => import("./Components/VenueStats"));

const iconPath = process.env.PUBLIC_URL + "/assets/";
const { Content, Sider } = Layout;
const windowWidth = window.innerWidth;

class App extends React.Component {
  state = {
    collapsed: windowWidth > 1024 ? false : true,
    tab: "1",
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  onTabChange = (event) => {
    this.setState({ tab: event.key });
  };

  render() {
    const { collapsed, tab } = this.state;
    return (
      <Layout className="dashboard-layout">
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className={collapsed === true ? "logo-collapsed" : "logo"}>
            {collapsed === true ? (
              <img src={`${iconPath}logo.svg`} alt="Logo" />
            ) : (
              <img src={`${iconPath}full-logo.svg`} alt="Logo" />
            )}
          </div>
          <Menu
            defaultSelectedKeys={[tab]}
            mode="inline"
            className="nav-menu"
            onClick={this.onTabChange}
          >
            <Menu.Item
              key="1"
              icon={
                <Icon
                  component={BatIcon}
                  className={tab === "1" ? "svg-focus" : ""}
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
                  className={tab === "2" ? "svg-focus" : ""}
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
                  className={tab === "3" ? "svg-focus" : ""}
                />
              }
            >
              Venue
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content className="site-layout-container">
            <Suspense fallback={<div>Loading...</div>}>
              <div className="site-layout-background">
                {this.state.tab === "1" ? (
                  <BattingStats />
                ) : this.state.tab === "2" ? (
                  <BowlingStats />
                ) : (
                  <VenueStats />
                )}
              </div>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;