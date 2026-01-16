import { useQuery } from "@tanstack/react-query";
import apiCalls from "../api/apiCalls";
export const useEmailTATCasesQuery = (formData) => {
  return useQuery({
    queryKey: [
      "email-tat-cases",
      formData?.ReceivedFromDt,
      formData?.ReceivedToDt,
      formData?.Status,
        formData?.Subject,
    ],

    queryFn: () => {
      return apiCalls.getEmailManagementFilter(formData);
    },

    enabled: !!formData, // prevents junk calls

    select: (data) => {
      const users =
        data?.data?.userSummary?.map((item) => ({
          ...item,
          label: item.userName,
          value: item.usrID,
        })) || [];
      const emailClassifyData = data?.data?.emailClassify || [];
      const summary = {
        OpenCasesWithinTAT: 0,
        OpenCasesOutsideTAT: 0,
        ClosedCasesWithinTAT: 0,
        ClosedCasesOutsideTAT: 0,
        UnAttendedMailsWithinTAT: 0,
        UnAttendedMailsOutsideTAT: 0,
        OnTAT: 0,
      };

      if (Array.isArray(data?.data?.emailSummary)) {
        data.data.emailSummary.forEach((ele) => {
          summary[ele.emailTat] = ele.tatCount;
        });
      }

      return {
        users,
        rawUsers: data?.data?.userSummary || [],
        emailClassifyData,
        ...summary,
      };
    },

    staleTime: 2 * 60 * 1000,
    retry: 1,
  });
};
