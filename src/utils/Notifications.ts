import { notification } from "antd";

export const handleErrorNotification = (value: any, text?: string) => {
  if (value.hasOwnProperty("data") && value.data.hasOwnProperty("message")) {
    notification.open({
      message: "Ups!",
      description: value.data.message,
      type: "error",
      
    });
  } else {
    notification.open({
      message: "Ups!",
      description: `${value} ${text}`,
      type: "error",
      
    });
  }
};

export const handleWarningNotification = (value: string) => {
  notification.open({
    message: "Warning!",
    description: value,
    type: "warning",
    
  });
};

export const handleSucccessNotification = (value: NotificationSuccess) => {
  notification.open({
    message: "Success!",
    description: getSuccessMessage(value),
    type: "success",
    
  });
};

export enum NotificationSuccess {
  REGISTER,
  UPDATE,
  SUCCESS_DELETE,
}

const getSuccessMessage = (type: NotificationSuccess): string => {
  if (type == NotificationSuccess.REGISTER) {
    return "Successfully registered";
  }

  if (type == NotificationSuccess.UPDATE) {
    return "Successfully updated";
  }

  if (type == NotificationSuccess.SUCCESS_DELETE) {
    return "Successfully deleted";
  }

  return "Successfully completed";
};
