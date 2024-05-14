import { RuleObject } from "antd/lib/form";
import Strings from "./Strings";

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
