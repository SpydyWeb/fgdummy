import { useQuery } from "@tanstack/react-query";
import apiCalls from "../api/apiCalls";

export const useEmailDashboardQuery = (obj) => {
  return useQuery({
    queryKey: ["email-dashboard", obj],
    queryFn: () => apiCalls.EmailManagementDashBoardFilters(obj),

    enabled: obj !== undefined, // prevent junk calls

    select: (data) => {
      const usersData =
        data?.data?.userSummary?.map((item) => ({
          ...item,
          label: item.userName,
          value: item.usrID,
        })) || [];

      const emailDashboardData = data?.data?.emailMags || [];
 

      return {
        usersData,
        emailDashboardData,
      };
    },

    retry: 2,
    staleTime: 2 * 60 * 1000,
  });
};
