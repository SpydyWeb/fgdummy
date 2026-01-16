import { useQuery } from "@tanstack/react-query";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { createMsalConfig } from "../authConfig";
import apiCalls from "../api/apiCalls";
import { encryptionService } from "../api/encryptionService";

const bootstrapApp = async () => {
  //  Fetch Oasis chunks
  const oasisRes = await apiCalls.getOasisChunks();
  const oasisKey = oasisRes?.data?.OasisChunks;

  if (!oasisKey) {
    throw new Error("Oasis encryption key missing");
  }

  encryptionService.setOasis_Key(oasisKey);

  //  Fetch AD config
  const adRes = await apiCalls.getADConfig();
  const { applicationId, tenantId } = adRes?.data || {};

  if (!applicationId || !tenantId) {
    throw new Error("Azure AD configuration missing");
  }

  // Create MSAL instance
  const msalInstance = new PublicClientApplication(
    createMsalConfig(applicationId, tenantId)
  );

  await msalInstance.initialize();

  //  Restore active account if exists
  const accounts = msalInstance.getAllAccounts();
  if (!msalInstance.getActiveAccount() && accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }

  //  Listen to login success
  msalInstance.addEventCallback((event) => {
    if (
      event.eventType === EventType.LOGIN_SUCCESS &&
      event.payload?.account
    ) {
      msalInstance.setActiveAccount(event.payload.account);
    }
  });

  return msalInstance;
};

export const useBootstrapApp = () => {
  return useQuery({
    queryKey: ["bootstrap-app"],
    queryFn: bootstrapApp,
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
