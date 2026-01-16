import { useQuery } from "@tanstack/react-query";
import apiCalls from "../api/apiCalls";

export const useSearchPolicyDetailsData = (sharedData) => {
  return useQuery({
    queryKey: ["search-policy", sharedData],
    queryFn: async () => {
      if (!sharedData) return [];

      if (sharedData?.requestBody?.isSrSearch) {
        const srResponse = await apiCalls.GetPolicyDetailsBySrID(
          sharedData?.requestheader?.ServiceRequestID
        );

        if (!srResponse?.data) {
          throw new Error("SR details not found");
        }

        sharedData.requestheader.policyNo = srResponse.data.lA_PolicyNo;
        sharedData.requestheader.customerID = srResponse.data.lA_PolicyNo;
      }

      const searchDataResponse = await apiCalls.getSearchData(sharedData);

      if (!searchDataResponse?.data?.responseHeader?.issuccess) {
        throw new Error(
          searchDataResponse?.data?.responseHeader?.message ||
          "Something went wrong, please try again!"
        );
      }

      return searchDataResponse.data.responseBody.searchDetails || [];
    },
    enabled: !!sharedData,
  });
};
