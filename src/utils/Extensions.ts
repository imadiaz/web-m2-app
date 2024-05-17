import { RuleObject } from "antd/lib/form";
import Strings from "./Strings";
import User from "../data/user/user";
import Routes from "../utils/Routes";

export const validateEmail = (
  _: RuleObject,
  value: string,
  callback: (error?: string) => void
) => {
  if (!value || value.trim() === "") {
    callback(Strings.requiredEmail);
  } else if (!/^\S+@\S+\.\S+$/.test(value.trim())) {
    callback(Strings.requiredValidEmailAddress);
  } else {
    callback();
  }
};

export const getInitRoute = (user: User): string => {
  const adminRole = "admin";

  const isAdmin = user.roles?.some(
    (role) => role.trim().toLowerCase() === adminRole
  );

  return isAdmin ? Routes.AdminDirectionHome : "";
};

export const getUserRol = (user: User): UserRoles | null => {
  const adminRole = "admin";

  const isAdmin = user.roles?.some(
    (role) => role.trim().toLowerCase() === adminRole
  );

  return isAdmin ? UserRoles.ADMIN : null;
};

export const enum UserRoles {
  ADMIN,
}
