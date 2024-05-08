import React, { useState } from "react";
import { Layout, Menu, Button, theme } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { buttonSiderStyle, contentStyle, headerStyle, layoutStyle } from "./BaseLayoutStyles";

const { Header, Sider, Content } = Layout;

const BaseLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={layoutStyle}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "page 1",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "page 2",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "page 3",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={headerStyle(colorBgContainer)}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={buttonSiderStyle}
          />
        </Header>
        <Content
          style={contentStyle(colorBgContainer, borderRadiusLG)}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
