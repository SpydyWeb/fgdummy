import { useEffect, useRef } from "react";
import { message } from "antd";

export const useQueryFeedback = ({
  data,
  isLoading,
  isError,
  error,
  emptyMessage = "No records found",
  errorMessage,
  resetKey, // IMPORTANT
}) => {
  const hasShown = useRef(false);

  // RESET when search input changes
  useEffect(() => {
    hasShown.current = false;
  }, [resetKey]);

  useEffect(() => {
    if (isLoading) return;

    if (isError && !hasShown.current) {
      message.error(errorMessage || error?.message || "Something went wrong");
      hasShown.current = true;
      return;
    }

    // if (Array.isArray(data) && data.length === 0 && !hasShown.current) {
    //   message.info(emptyMessage);
    //   hasShown.current = true;
    // }
  }, [data, isLoading, isError, error, emptyMessage, errorMessage]);
};
