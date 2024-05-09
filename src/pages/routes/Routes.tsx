import { ItemType } from "antd/es/menu/hooks/useItems";
import { Page1, Page2, Page3 } from "../proofPages/proofPages";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";

export class Route {
  label: string;
  path: string;
  fullPath: string;
  element: JSX.Element;
  icon: JSX.Element;

  constructor(
    label: string,
    path: string,
    fullPath: string,
    element: JSX.Element,
    icon: JSX.Element
  ) {
    this.label = label;
    this.path = path;
    this.fullPath = fullPath;
    this.element = element;
    this.icon = icon;
  }
}

const page1 = new Route(
  "Page 1",
  "page1",
  "/page1",
  <Page1 />,
  <UserOutlined />
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

const proofRoutes: Route[] = [page1, page2, page3];

const proofPagesSiderOptions = (): ItemType[] => {
  const items: MenuProps["items"] = [
    getItem(page1.label, page1.fullPath, page1.icon),
    getItem(page2.label, page2.fullPath, page2.icon),
    getItem(page3.label, page3.fullPath, page3.icon),
  ];
  return items;
};

export type MenuItem = Required<MenuProps>["items"][number];

export function getItem(
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

export { proofPagesSiderOptions, proofRoutes };
