import { message } from "antd";

export const ErrorHandler = (error) => {
  message.destroy();
  message.error({
    content: error?.data?.responseBody?.errormessage || error?.message || "Something went wrong, please try again!",
    className: "custom-msg",
    duration: 2,
  });
};
