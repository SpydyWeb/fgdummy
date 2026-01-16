import { message } from "antd";

export const appMessage = (
  type,
  {
    content,
    duration = 2,
    className = "custom-msg",
  }
) => {
  message.destroy();
  message[type]({
    content,
    duration,
    className,
  });
};
