import { message } from "antd";
import { useBootstrapApp } from "../hooks/useBootstrapApp";
import AppProviders from "./AppProviders";

export default function AppBootstrap() {
  const { data: msalInstance, isLoading, isError, error } =
    useBootstrapApp();

  if (isLoading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        Loading...
      </div>
    );
  }

  if (isError) {
    message.destroy();
    message.error({
      content: error.message || "Failed to initialize application",
      className: "custom-msg",
      duration: 2,
    });
    return null;
  }

  return <AppProviders msalInstance={msalInstance} />;
}
