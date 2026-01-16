import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import apiCalls from "../api/apiCalls";
export const useSaveFollowUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (selectedObj) => {
      return apiCalls.SaveFollowUps({
        ...selectedObj,              //  DO NOT mutate original object
        CompleteByDt: new Date(),     // add safely
      });
    },

    onSuccess: () => {
      message.destroy();
      message.success({
        content: "Follow Up Request Closed!",
        className: "custom-msg",
        duration: 2,
      });

      //  refetch dashboards that depend on this
      queryClient.invalidateQueries({ queryKey: ["email-tat"] });
      queryClient.invalidateQueries({ queryKey: ["boe-dashboard"] });
    },

    onError: (error) => {
      message.destroy();
      message.error({
        content:
          error?.response?.data?.responseBody?.errormessage ||
          "Something went wrong, please try again!",
        className: "custom-msg",
        duration: 2,
      });
    },
  });
};
