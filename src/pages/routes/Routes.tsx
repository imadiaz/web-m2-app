import { ItemType } from "antd/es/menu/hooks/useItems";
import { Page1, Page2, Page3 } from "../proofPages/proofPages";
import { VideoCameraOutlined, UploadOutlined } from "@ant-design/icons";
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
  <BsBuildings />
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

const adminRoutes: Route[] = [companies, page2, page3];

const adminRoutesSiderOptions = (): ItemType[] => {
  const items: MenuProps["items"] = [
    getItem(companies.label, companies.fullPath, companies.icon),
    getItem(page2.label, page2.fullPath, page2.icon),
    getItem(page3.label, page3.fullPath, page3.icon),
  ];
  return items;
};

const getUserSiderOptions = (user: User): ItemType[] => {
  const rol = getUserRol(user);
  if (rol == UserRoles.ADMIN) {
    return adminRoutesSiderOptions();
  }
  return [];
};

export { adminRoutesSiderOptions, adminRoutes, getUserSiderOptions };

function getItem(
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

type MenuItem = Required<MenuProps>["items"][number];
