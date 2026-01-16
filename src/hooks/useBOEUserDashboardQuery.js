import { useQuery } from "@tanstack/react-query";
import apiCalls from "../api/apiCalls";
import { useSelector } from "react-redux";

export const useBOEUserDashboardQuery = (formData,includeCloseSR) => {
    const loggedUser = useSelector((state) => state?.userProfileInfo?.profileObj);
  return useQuery({
    queryKey: ["BOEUser-dashboard", formData],
    queryFn: () => {
    const fromDate = formData.FormDate
      ? formData.FormDate.format("YYYY-MM-DD")
      : "";
    const toDate = formData.ToDate ? formData.ToDate.format("YYYY-MM-DD") : "";
    const PolicyNo = formData.PolicyNo
      ? formData.PolicyNo.toLowerCase().trim()
      : "";

    let obj = {
      fromDate: fromDate || "",
      toDate: toDate || "",
      policyNumber: PolicyNo,
      userId: loggedUser.userName,
      role: loggedUser.role,
      callType: "",
      subType: formData?.subType || "",
      mode: formData?.mode,
      status: formData?.status == undefined ? "PENDING" : formData?.status,
      ageing: formData?.ageing,
      assignedTo: formData?.assignedTo,
    };
       return apiCalls.getBOEUserDashboard(obj,includeCloseSR)},
    enabled: formData !== undefined && includeCloseSR !== undefined, // prevent junk calls
    retry: 1,
    staleTime: 2 * 60 * 1000,
    select: (data) => {
      return data?.data || {};
    }
  });
};
