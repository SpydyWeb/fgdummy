import apiCalls from "../api/apiCalls"

export const fetchSearchPolicyDetailsData = async ({ queryKey }) => {
  let [, sharedData] = queryKey;

  if (!sharedData) return [];

  // SR FLOW
  if (sharedData?.requestBody?.isSrSearch) {
    const srResponse = await apiCalls.GetPolicyDetailsBySrID(
      sharedData.requestheader.ServiceRequestID
    );

    if (!srResponse?.data) {
      throw new Error("SR policy not found");
    }

    sharedData = {
      ...sharedData,
      requestheader: {
        ...sharedData.requestheader,
        policyNo: srResponse.data.lA_PolicyNo,
        customerID: srResponse.data.lA_PolicyNo,
      },
    };
  }

  // COMMON SEARCH
  const searchResponse = await apiCalls.getSearchData(sharedData);

  if (!searchResponse.data?.responseHeader?.issuccess) {
    throw new Error(
      searchResponse.data?.responseHeader?.message ||
        "Something went wrong"
    );
  }

  return searchResponse.data.responseBody.searchDetails;
};
