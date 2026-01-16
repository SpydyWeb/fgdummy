import { useQuery } from "@tanstack/react-query";
import apiCalls from "../api/apiCalls";
import { transformData } from "../utils/HelperUtilites";
export const useCTSTQuery = (
  payload,
  role,
  isVerifiedCheck
) => {
  return useQuery({
    queryKey: ["CTST", role, isVerifiedCheck],
    queryFn: () =>
      apiCalls.ctstRoleBased(payload, role === 14 && !isVerifiedCheck, role),

    select: (data) => {
      const callTypes = transformData(data, "CALL_TYP");
      const subTypes = transformData(data, "SUB_TYP");

      const funCallType = () => {
        if (role && role !== 14) {
          return callTypes.map((ele) => ({
            ...ele,
            value: ele.mstID,
          }));
        }
        return [...callTypes, ...subTypes].map((ele, i) => ({
          ...ele,
          value: i + 1,
        }));
      };

      return {
        CALL_TYPES: funCallType(),
        REQUEST_MODE: transformData(data, "REQST_MODE").sort((a, b) =>
          a.label.localeCompare(b.label)
        ),
        REGISTER_MODE: transformData(data, "Reason_For_Freelook"),
        UW_DECISION: transformData(data, "UW_Decision"),
        UW_DECISION_NEW: transformData(data, "UW_Decision_NEW"),
        CLIENT_ROLE: transformData(data, "CLIENT_ROLE"),
        BANK_ACC_TYPE: transformData(data, "BNKACCTYP"),
        REQUEST_VIA: transformData(data, "REQVIA"),
        CUSTOMER_PORTAL: transformData(data, "CUST_PORTAL_ISSUE"),
        WEBSITE_PORTAL: transformData(data, "WEBSITE_PORTAL_ISSUE"),
        CALL_RELATED_ACTION: transformData(data, "CALL_RELATED_ACTION"),
        CUSTOMER_QUERY: transformData(data, "CUSTOMER_QUERY_TOPIC"),
        PAN_UPDATE: transformData(data, "PanUpdate"),
        PROCESS_NAME: transformData(data, "PROCESS_NAME"),
        INTERNAL_REQ: transformData(data, "INTL_REQMNT"),
        ANNUITY_PLAN: transformData(data, "ANNUITY_TYP"),
      };
    },
  });
};
