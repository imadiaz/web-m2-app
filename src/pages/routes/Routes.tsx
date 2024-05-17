import { ItemType } from "antd/es/menu/hooks/useItems";
<<<<<<< HEAD
import { Page1, Page2, Page3 } from "../proofPages/proofPages";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { Page2, Page3 } from "../proofPages/proofPages";
>>>>>>> 5972a9a (Get Companies responsive (#15))
import { VideoCameraOutlined, UploadOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { Route } from "./models/Route";
import User from "../../data/user/user";
import { UserRoles, getUserRol } from "../../utils/Extensions";
import { BsBuildings } from "react-icons/bs";
import Routes from "../../utils/Routes";
import Company from "../company/Companies";

const companies = new Route(
  "Companies",
  "companies",
  Routes.AdminDirectionHome,
  <Company />,
  <BsBuildings />
=======
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
=======
import { VideoCameraOutlined, UploadOutlined } from "@ant-design/icons";
>>>>>>> 9e42fb8 (Sider options for admin (#8))
import { MenuProps } from "antd";
import { Route } from "./models/Route";
import User from "../../data/user/user";
import { UserRoles, getUserRol } from "../../utils/Extensions";
import { BsBuildings } from "react-icons/bs";
import Routes from "../../utils/Routes";

const companies = new Route(
  "Companies",
  "companies",
  Routes.AdminDirectionHome,
  <Page1 />,
<<<<<<< HEAD
  <UserOutlined />
>>>>>>> 049089b (react-router-dom (#5))
=======
  <BsBuildings />
>>>>>>> 9e42fb8 (Sider options for admin (#8))
);
const page2 = new Route(
  "Page 2",
  "page2",
  "/page2",
  <Page2 />,
  <VideoCameraOutlined />
);
const page3 = new Route(
  "Page 3",
  "page3",
  "/page3",
  <Page3 />,
  <UploadOutlined />
);

<<<<<<< HEAD
<<<<<<< HEAD
const adminRoutes: Route[] = [companies, page2, page3];

const adminRoutesSiderOptions = (): ItemType[] => {
  const items: MenuProps["items"] = [
    getItem(companies.label, companies.fullPath, companies.icon),
=======
const proofRoutes: Route[] = [page1, page2, page3];
=======
const adminRoutes: Route[] = [companies, page2, page3];
>>>>>>> 9e42fb8 (Sider options for admin (#8))

const adminRoutesSiderOptions = (): ItemType[] => {
  const items: MenuProps["items"] = [
<<<<<<< HEAD
    getItem(page1.label, page1.fullPath, page1.icon),
>>>>>>> 049089b (react-router-dom (#5))
=======
    getItem(companies.label, companies.fullPath, companies.icon),
>>>>>>> 9e42fb8 (Sider options for admin (#8))
    getItem(page2.label, page2.fullPath, page2.icon),
    getItem(page3.label, page3.fullPath, page3.icon),
  ];
  return items;
};

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9e42fb8 (Sider options for admin (#8))
const getUserSiderOptions = (user: User): ItemType[] => {
  const rol = getUserRol(user);
  if (rol == UserRoles.ADMIN) {
    return adminRoutesSiderOptions();
  }
  return [];
};
<<<<<<< HEAD

export { adminRoutesSiderOptions, adminRoutes, getUserSiderOptions };

function getItem(
=======
export type MenuItem = Required<MenuProps>["items"][number];

export function getItem(
>>>>>>> 049089b (react-router-dom (#5))
=======

export { adminRoutesSiderOptions, adminRoutes, getUserSiderOptions };

function getItem(
>>>>>>> 9e42fb8 (Sider options for admin (#8))
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

<<<<<<< HEAD
<<<<<<< HEAD
type MenuItem = Required<MenuProps>["items"][number];
=======
export { proofPagesSiderOptions, proofRoutes };
>>>>>>> 049089b (react-router-dom (#5))
=======
type MenuItem = Required<MenuProps>["items"][number];
>>>>>>> 9e42fb8 (Sider options for admin (#8))
