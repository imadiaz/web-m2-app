import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, theme } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import {
  buttonSiderStyle,
  contentStyle,
  headerStyle,
} from "./BaseLayoutStyles";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getUserSiderOptions } from "../routes/Routes";
import { useSessionStorage } from "../../core/useSessionStorage";
import User from "../../data/user/user";
import Constants from "../../utils/Constants";

const { Header, Sider, Content } = Layout;

const BaseLayout: React.FC = () => {
  //provisional code
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPath, setSelectedPath] = useState("");
  const [getSessionUser] = useSessionStorage<User>(Constants.EMPTY_STRING);

  useEffect(() => {
    setSelectedPath(location.pathname);
  }, [location]);

  const handleOnClick = (data: any) => {
    navigate(data.key);
  };
  //----------

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="flex w-full h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          onClick={handleOnClick}
          selectedKeys={[selectedPath]}
          items={getUserSiderOptions(getSessionUser() as User)}
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
        <Content style={contentStyle(colorBgContainer, borderRadiusLG)}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
