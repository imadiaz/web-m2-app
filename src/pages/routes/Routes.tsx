import { ItemType } from "antd/es/menu/hooks/useItems";
<<<<<<< HEAD
import { Page2, Page3 } from "../proofPages/proofPages";
=======
import { Page1, Page2, Page3 } from "../proofPages/proofPages";
<<<<<<< HEAD
>>>>>>> 39f4344 (react-router-dom (#5))
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
import { MenuProps } from "antd";
import { Route } from "./models/Route";

const page1 = new Route(
  "Page 1",
  "page1",
  "/page1",
  <Page1 />,
  <UserOutlined />
>>>>>>> 049089b (react-router-dom (#5))
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
const adminRoutes: Route[] = [companies, page2, page3];

const adminRoutesSiderOptions = (): ItemType[] => {
  const items: MenuProps["items"] = [
    getItem(companies.label, companies.fullPath, companies.icon),
=======
const proofRoutes: Route[] = [page1, page2, page3];

const proofPagesSiderOptions = (): ItemType[] => {
  const items: MenuProps["items"] = [
    getItem(page1.label, page1.fullPath, page1.icon),
>>>>>>> 049089b (react-router-dom (#5))
    getItem(page2.label, page2.fullPath, page2.icon),
    getItem(page3.label, page3.fullPath, page3.icon),
  ];
  return items;
};

<<<<<<< HEAD
const getUserSiderOptions = (user: User): ItemType[] => {
  const rol = getUserRol(user);
  if (rol == UserRoles.ADMIN) {
    return adminRoutesSiderOptions();
  }
  return [];
};

export { adminRoutesSiderOptions, adminRoutes, getUserSiderOptions };

function getItem(
=======
export type MenuItem = Required<MenuProps>["items"][number];

export function getItem(
>>>>>>> 049089b (react-router-dom (#5))
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
type MenuItem = Required<MenuProps>["items"][number];
=======
export { proofPagesSiderOptions, proofRoutes };
>>>>>>> 049089b (react-router-dom (#5))
