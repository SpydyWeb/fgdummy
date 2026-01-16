import { secureStorage } from "../utils/secureStorage";
import { callApi, callgetOasisChunks, uploadFileToProxy } from "./apiService";

// Function to make the API call
const ctst = (val, condition) =>
  callApi("ctst", [val, condition], {
    "x-user-token": secureStorage.get("token"),
  });
const ctstRoleBased = (val, condition, role) =>
  callApi("ctstRoleBased", [val, condition, role], {
    "x-user-token": secureStorage.get("token"),
  });
const getDmsDocumentList = (data) => callApi("getDmsDocumentList", [data]);
const DMSDocumentDetails = (data) => callApi("DMSDocumentDetails", [data]);
const DMSViewerEncryption = (data) => callApi("DMSViewerEncryption", [data]);
const GetSearchPolicyDetails = (data) =>
  callApi("GetSearchPolicyDetails", [data]);
const getLastOpenTickets = (policyNo) =>
  callApi("getLastOpenTickets", [policyNo]);
const GetCLTVMHITagging = (policyNo) =>
  callApi("GetCLTVMHITagging", [policyNo]);
const getTicketDetails = (serialNum) =>
  callApi("getTicketDetails", [serialNum]);
const SendIGMSComplaintCommunication = (obj) =>
  callApi("SendIGMSComplaintCommunication", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const GetClientAadhaarAndCKYCEnquiry = (clientNo) =>
  callApi("GetClientAadhaarAndCKYCEnquiry", [clientNo]);
const GenerateBatchInfo = (obj) => callApi("GenerateBatchInfo", [obj]);
const GetCopyDetails = (obj) => callApi("GetCopyDetails", [obj]);
const getGSTINEnquiry = (clientNo, empID) =>
  callApi("getGSTINEnquiry", [clientNo, empID]);
const GetDeathClaimAdjust = (policyNo, employeeID) =>
  callApi("GetDeathClaimAdjust", [policyNo, employeeID]);
const GetAgentDetails = (agentCode) => callApi("GetAgentDetails", [agentCode]);
const GetClaimPolicyDetails = (agentNum) =>
  callApi("GetClaimPolicyDetails", [agentNum]);
const GetClaimsDeleteCommentsInfo = (srvReqID, claimRecommendation) =>
  callApi("GetClaimsDeleteCommentsInfo", [srvReqID, claimRecommendation]);
const GetPolicyClientDtls = (policyNo, userID) =>
  callApi("GetPolicyClientDtls", [policyNo, userID]);
const GetClaimsViewCommentsInfo = (srvReqID) =>
  callApi("GetClaimsViewCommentsInfo", [srvReqID]);
const GetClaimsCommentsInfo = (
  srvReqID,
  referralViewComments,
  userName,
  claimRecommendation
) =>
  callApi("GetClaimsCommentsInfo", [
    srvReqID,
    referralViewComments,
    userName,
    claimRecommendation,
  ]);
const getRoleBasedSearchDetails = (data, nbDashboard) =>
  callApi("getRoleBasedSearchDetails", [data, nbDashboard], {
    "x-user-token": secureStorage.get("token"),
  });
const getVerifyBankDedup = (obj) =>
  callApi("getVerifyBankDedup", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const GetDocumentData = (data) => callApi("GetDocumentData", [data]);
const getProcesDocLnk = (obj) => callApi("getProcesDocLnk", [obj]);
const getProcesLink = (obj) => callApi("getProcesLink", [obj]);
const SendPotentialComplaintCommunication = (obj) =>
  callApi("SendPotentialComplaintCommunication", [obj]);
const getEmailTemplate = (serRefId, tempId, falconideTemplateId, commID) =>
  callApi("getEmailTemplate", [serRefId, tempId, falconideTemplateId, commID], {
    "x-user-token": secureStorage.get("token"),
  });
const getPOSData = (obj) => callApi("getPOSData", [obj]);
const getServiceRequestSearchDetails = (data) =>
  callApi("getServiceRequestSearchDetails", [data]);
const getBOEUserDashboard = (data, includeCloseSR) =>
  callApi("getBOEUserDashboard", [data, includeCloseSR], {
    "x-user-token": secureStorage.get("token"),
  });
const getEmailVisibility = (obj) =>
  callApi("getEmailVisibility", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const getBOEUserDashboardLatest = (data, includeCloseSR) =>
  callApi("getBOEUserDashboardLatest", [data, includeCloseSR], {
    "x-user-token": secureStorage.get("token"),
  });
const GetNarCategory = (obj) =>
  callApi("GetNarCategory", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const GetSerReqStatus = (roleId, userId) =>
  callApi("GetSerReqStatus", [roleId, userId], {
    "x-user-token": secureStorage.get("token"),
  });
const getDashboardFollowUps = (selectedFOllowUpVal) =>
  callApi("getDashboardFollowUps", [selectedFOllowUpVal], {
    "x-user-token": secureStorage.get("token"),
  });
const SaveFollowUps = (obj) =>
  callApi("SaveFollowUps", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const ATRTabDownloadPDF = (obj) =>
  callApi("ATRTabDownloadPDF", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const saveRaiseEnquiry = (obj) =>
  callApi("saveRaiseEnquiry", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const SendComplaintCommunication = (obj) =>
  callApi("SendComplaintCommunication", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const UpdateComplaintTicketStatusAPI = (srvReqRefNo) =>
  callApi("UpdateComplaintTicketStatusAPI", [srvReqRefNo], {
    "x-user-token": secureStorage.get("token"),
  });
const SaveRandomCallInfo = (obj) =>
  callApi("SaveRandomCallInfo", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const AddPayoutInfo = (obj) =>
  callApi("AddPayoutInfo", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const UpdatePayoutInfo = (obj) =>
  callApi("UpdatePayoutInfo", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const GenerateBatchId = (obj) =>
  callApi("GenerateBatchId", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const GetPosDownloadFile = (obj) =>
  callApi("GetPosDownloadFile", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const GetClaimsDownloadFile = (obj) =>
  callApi("GetClaimsDownloadFile", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const PayoutDashboard = (obj) =>
  callApi("PayoutDashboard", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const getPOSIndividualData = (serialNum) =>
  callApi("getPOSIndividualData", [serialNum], {
    "x-user-token": secureStorage.get("token"),
  });
const getRaiseRequirements = (data) =>
  callApi("getRaiseRequirements", [data], {
    "x-user-token": secureStorage.get("token"),
  });
const POSActionsOnContactDetails = (data) =>
  callApi("POSActionsOnContactDetails", [data], {
    "x-user-token": secureStorage.get("token"),
  });

const POSActionsOnServReqSurrender = (data) =>
  callApi("POSActionsOnServReqSurrender", [data], {
    "x-user-token": secureStorage.get("token"),
  });  
const getBankDeatils = (data) =>
  callApi("getBankDeatils", [data], {
    "x-user-token": secureStorage.get("token"),
  });
const getIFSCBanks = (ifscCode) =>
  callApi("getIFSCBanks", [ifscCode], {
    "x-user-token": secureStorage.get("token"),
  });
const getDocMaster = (obj) =>
  callApi("getDocMaster", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const GetHistCommunications = (obj) =>
  callApi("GetHistCommunications", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const GetIGMSComplaintDescription = (obj) =>
  callApi("GetIGMSComplaintDescription", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const CloseCautionComments = (obj) =>
  callApi("CloseCautionComments", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const SaveCautionComments = (obj) =>
  callApi("SaveCautionComments", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const GetFetchCautionList = (obj1) =>
  callApi("GetFetchCautionList", [obj1], {
    "x-user-token": secureStorage.get("token"),
  });
const GetAuditTrailDetails = (policyNo) =>
  callApi("GetAuditTrailDetails", [policyNo], {
    "x-user-token": secureStorage.get("token"),
  });
const GetUWFollowups = (policyNo) => callApi("GetUWFollowups", [policyNo]);
const GetClaimsPrimaryAssessmentEnquiry = (empID, policyNo) =>
  callApi("GetClaimsPrimaryAssessmentEnquiry", [empID, policyNo], {
    "x-user-token": secureStorage.get("token"),
  });
const GetPolicyClientEnquiry = (obj) =>
  callApi("GetPolicyClientEnquiry", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const GetEmailDedupeAPI = (emailAddress) =>
  callApi("GetEmailDedupeAPI", [emailAddress]);
const GetMobileDedupeAPI = (mobileNo) =>
  callApi("GetMobileDedupeAPI", [mobileNo]);
const GETUNPROCEESEDUNITS = (policyNo) =>
  callApi("GETUNPROCEESEDUNITS", [policyNo]);
const getFreeLookDetailsApi = (PolicyNo) =>
  callApi("getFreeLookDetailsApi", [PolicyNo], {
    "x-user-token2": secureStorage.get("tokenGenrate"),
  });
const getEmailDedupeAPI = (data) => callApi("getEmailDedupeAPI", [data]);
const getAllowableModeChangeOptionFetch = (obj, empID) =>
  callApi("getAllowableModeChangeOptionFetch", [obj, empID]);
const getBillingFrequencyChangeQuotation = (obj, empID) =>
  callApi("getBillingFrequencyChangeQuotation", [obj, empID]);
const GetPartSurrenderEnquiry = (obj) =>
  callApi("GetPartSurrenderEnquiry", [obj]);
const GetPaymentDetails = (applicationNo) =>
  callApi("GetPaymentDetails", [applicationNo]);
const GetCurrentFundAllocation = (policyNo) =>
  callApi("GetCurrentFundAllocation", [policyNo]);
const GetCertificateOfExistenceEnquiry = (PolicyNo, empID) =>
  callApi("GetCertificateOfExistenceEnquiry", [PolicyNo, empID]);
const GetSBfrequencyEnquiry = (PolicyNo, empID) =>
  callApi("GetSBfrequencyEnquiry", [PolicyNo, empID]);
const GetListOfRolesByUserId = (userId, userName) =>
  callApi("GetListOfRolesByUserId", [userId, userName], {
    "x-user-token": secureStorage.get("token"),
  });
const getGCPPolicyDetails = (PolicyNo) =>
  callApi("getGCPPolicyDetails", [PolicyNo], {
    "x-user-token": secureStorage.get("token"),
  });
const GetTDSInfo = (policyNo, clientID, applicationNo, dob, pan, loggedUser) =>
  callApi(
    "GetTDSInfo",
    [policyNo, clientID, applicationNo, dob, pan, loggedUser],
    {
      "x-user-token": secureStorage.get("token"),
    }
  );
const getOasisAdminConfig = () =>
  callApi("getOasisAdminConfig", [], {
    "x-user-token": secureStorage.get("token"),
  });
const getProdConfigDropdown = (obj) =>
  callApi("getProdConfigDropdown", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const GetTransacions = (PolicyNo) =>
  callApi("GetTransacions", [PolicyNo], {
    "x-user-token": secureStorage.get("token"),
  });
const GetClientLevelInfo = (obj) =>
  callApi("GetClientLevelInfo", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const GetCreateJournal = (data) =>
  callApi("GetCreateJournal", [data], {
    "x-user-token": secureStorage.get("token"),
  });

// JV Creation API call added by imran
const JVCreation = (data) =>
  callApi("JVCreation", [data], {
    "x-user-token": secureStorage.get("token"),
  });

// JV Approval API call added by imran
const JVApproval = (data) =>
  callApi("JVApproval", [data], {
    "x-user-token": secureStorage.get("token"),
  }); 
  
const GetHistoricalCTST = (obj) =>
  callApi("GetHistoricalCTST", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const SendFalconideMail = (obj) =>
  callApi("SendFalconideMail", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const GetReceiptEnquiryForPolicy = (policyNo, empID, fromDate, toDate) =>
  callApi("GetReceiptEnquiryForPolicy", [policyNo, empID, fromDate, toDate], {
    "x-user-token": secureStorage.get("token"),
  });
const GetFundValue = (obj) =>
  callApi("GetFundValue", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const duplicateTab = (SessionID) =>
  callApi("LoginSession", [], {
    "x-user-token": secureStorage.get("token"),
    "x-session-id": SessionID,
  });
const LogoutSession = () =>
  callApi("LogoutSession", [], {
    "x-user-token": secureStorage.get("token"),
  });
const GetAssigneeEnquiry = (obj) =>
  callApi("GetAssigneeEnquiry", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const LoanStatement = (obj) =>
  callApi("LoanStatement", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const LoanEnquiry = (obj) =>
  callApi("LoanEnquiry", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const bankaccverification = (obj) =>
  callApi("bankaccverification", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const getPayoutDetailsEnquiry = (policyNo) =>
  callApi("getPayoutDetailsEnquiry", [policyNo], {
    "x-user-token": secureStorage.get("token"),
  });
const getHeaderParameters = (obj) => callApi("getHeaderParameters", [obj]);
const GetPolicyDetailsBySrID = (srCode) =>
  callApi("GetPolicyDetailsBySrID", [srCode]);
const getTokenData = (policyNo) => callApi("getTokenData", [policyNo]);
const GetClientDedupeData = (data) => callApi("GetClientDedupeData", [data]);
const getPolicyEnquiry = (obj, empID) =>
  callApi("getPolicyEnquiry", [obj, empID]);
const getSearchData = (data) => callApi("getSearchData", [data]);
const getAnnuityEnquiry = (policyNo) =>
  callApi("getAnnuityEnquiry", [policyNo]);
const getEmailResponseBodyAPI = (obj) =>
  callApi("getEmailResponseBodyAPI", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const getExistPANNumber = (clientNo, empID) =>
  callApi("getExistPANNumber", [clientNo, empID]);
const getEmailResponseDetailsAPI = (obj) =>
  callApi("getEmailResponseDetailsAPI", [obj], {
    "x-user-token": secureStorage.get("token"),
  });

const getDispositionData = (obj) =>
  callApi("getDispositionData", [obj]);

const getPolicyData = (obj) =>
  callApi("getPolicyData", [obj]);

const fileUpload = (obj) =>
  uploadFileToProxy("fileUpload", obj, {
    "x-user-token": secureStorage.get("token"),
    // "Content-Type": "multipart/form-data",
  });

const AssignToGrevienceUser = (obj) => callApi("AssignToGrevienceUser", [obj]);
const getRelationsData = (clientId) =>
  callApi("getRelationsData", [clientId], {
    "x-user-token": secureStorage.get("token"),
  });
const getEmailManagementFilter = (obj) =>
  callApi("getEmailManagementFilter", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const saveAssignToComplaintTeam = (obj) =>
  callApi("saveAssignToComplaintTeam", [obj]);
const saveAssignToPOS = (obj) =>
  callApi("saveAssignToPOS", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const GetPOSExecRoles = () =>
  callApi("GetPOSExecRoles", [], {
    "x-user-token": secureStorage.get("token"),
  });
const genericAPI = (obj) =>
  callApi(
    "genericAPI",
    [
      obj,
      secureStorage.get("UserRole"),
      secureStorage.get("marritalStatus"),
      secureStorage.get("Gender"),
    ],
    {
      "x-user-token": secureStorage.get("token"),
    }
  );
const GetUsersByRoleID = (roleID) =>
  callApi("GetUsersByRoleID", [roleID], {
    "x-user-token": secureStorage.get("token"),
  });
const GetAgeingCount = (callType, userId, roleId) =>
  callApi("GetAgeingCount", [callType, userId, roleId], {
    "x-user-token": secureStorage.get("token"),
  });
const GetComplaintDashboardCount = (callType, userId, role) =>
  callApi("GetComplaintDashboardCount", [callType, userId, role], {
    "x-user-token": secureStorage.get("token"),
  });
const GetComplaintSerReqByFilters = (
  callType,
  subType,
  userId,
  role,
  status,
  isChecked,
  SRequestID,
  ageing,
  fromDate,
  toDate,
  PolicyNo,
  TokenNo,
  IGMSStatus
) =>
  callApi(
    "GetComplaintSerReqByFilters",
    [
      callType,
      subType,
      userId,
      role,
      status,
      isChecked,
      SRequestID,
      ageing,
      fromDate,
      toDate,
      PolicyNo,
      TokenNo,
      IGMSStatus,
    ],
    {
      "x-user-token": secureStorage.get("token"),
    }
  );
const GetSerReqByFilters = (
  callType,
  subType,
  caseStatus,
  policyNo,
  sRequestID,
  complaintsType,
  status,
  roleId,
  IGMSStatus,
  assignedTo
) =>
  callApi(
    "GetSerReqByFilters",
    [
      callType,
      subType,
      caseStatus,
      policyNo,
      sRequestID,
      complaintsType,
      status,
      roleId,
      IGMSStatus,
      assignedTo,
    ],
    {
      "x-user-token": secureStorage.get("token"),
    }
  );
const getUserProfile = (policyNo, ClientID, loggedinUser) =>
  callApi("getUserProfile", [policyNo, ClientID, loggedinUser], {
    "x-user-token": secureStorage.get("token"),
  });
const getUserProfilePreferences = (CreatedBy, ClientID, TagName, TagValue) =>
  callApi("getUserProfile", [CreatedBy, ClientID, TagName, TagValue], {
    "x-user-token": secureStorage.get("token"),
  });

const getAssistanceDetails = (calltype, subtype, roleId) =>
  callApi("getAssistanceDetails", [calltype, subtype, roleId], {
    "x-user-token": secureStorage.get("token"),
  });
const getPlanFund = (data) =>
  callApi("getPlanFund", [data], {
    "x-user-token": secureStorage.get("token"),
  });
const GetEmailResponseExcel = (obj) =>
  callApi("GetEmailResponseExcel", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const getInvalidPolicyExcel = (data) =>
  callApi("getInvalidPolicyExcel", [data], {
    "x-user-token": secureStorage.get("token"),
  });
const SaveComplaintsInteractionDetails = (data) =>
  callApi("SaveComplaintsInteractionDetails", [data]);
const SendEmailSMTP = (data) => callApi("getPlanFuSendEmailSMTPnd", [data]);
const GetEmailResponseDtls = (data) =>
  callApi("GetEmailResponseDtls", [data], {
    "x-user-token": secureStorage.get("token"),
  });
const DeleteClaimsdetails = (data) => callApi("DeleteClaimsdetails", [data]);
const getSendOTP = (data) =>
  callApi("getSendOTP", [data], {
    "x-user-token": secureStorage.get("token"),
  });
const getServiceRequestCount = (PolicyNo, callType, subType) =>
  callApi("getServiceRequestCount", [PolicyNo, callType, subType]);
const getPaymentReprocessing = (PolicyNo, callType, subType) =>
  callApi("getPaymentReprocessing", [PolicyNo, callType, subType]);
const RegularPaymentsRegisterAPI = (
  policyNumber,
  empID,
  clType,
  crtable,
  rgpymop
) =>
  callApi("RegularPaymentsRegisterAPI", [
    policyNumber,
    empID,
    clType,
    crtable,
    rgpymop,
  ]);
const RegularPaymentsApproval = (policyNumber, empID, applicationNo) =>
  callApi("RegularPaymentsApproval", [policyNumber, empID, applicationNo]);
const TerminateRegularPayments = (policyNumber, empID, applicationNo) =>
  callApi("TerminateRegularPayments", [policyNumber, empID, applicationNo]);
const HealthMinorClaimRegisterAPI = (
  policyNumber,
  empID,
  roleID,
  organ,
  formattedDate
) =>
  callApi("HealthMinorClaimRegisterAPI", [
    policyNumber,
    empID,
    roleID,
    organ,
    formattedDate,
  ]);
const HealthModerateClaimRegisterAPI = (
  policyNumber,
  empID,
  roleID,
  organ,
  formattedDate,
  healthClaimType1
) =>
  callApi("HealthModerateClaimRegisterAPI", [
    policyNumber,
    empID,
    roleID,
    organ,
    formattedDate,
    healthClaimType1,
  ]);
const HealthMajorClaimRegisterAPI = (
  policyNumber,
  empID,
  roleID,
  organ,
  formattedDate,
  healthClaimType
) =>
  callApi("HealthMajorClaimRegisterAPI", [
    policyNumber,
    empID,
    roleID,
    organ,
    formattedDate,
    healthClaimType,
  ]);
const HealthMinorClaimApproval = (policyNumber, empID, applicationNo) =>
  callApi("HealthMinorClaimApproval", [policyNumber, empID, applicationNo]);
const HealthMinorClaimRejection = (policyNumber, empID, applicationNo) =>
  callApi("HealthMinorClaimRejection", [policyNumber, empID, applicationNo]);
const HealthMinorClaimRepudiate = (policyNumber, empID, applicationNo) =>
  callApi("HealthMinorClaimRepudiate", [policyNumber, empID, applicationNo]);
const HealthMajorClaimApproval = (policyNumber, empID, applicationNo) =>
  callApi("HealthMajorClaimApproval", [policyNumber, empID, applicationNo]);
const HealthMajorClaimRejection = (policyNumber, empID, applicationNo) =>
  callApi("HealthMajorClaimRejection", [policyNumber, empID, applicationNo]);
const HealthMajorClaimRepudiate = (policyNumber, empID, applicationNo) =>
  callApi("HealthMajorClaimRepudiate", [policyNumber, empID, applicationNo]);
const HealthModerateClaimApproval = (policyNumber, empID, applicationNo) =>
  callApi("HealthModerateClaimApproval", [policyNumber, empID, applicationNo]);
const HealthModerateClaimRejection = (policyNumber, empID, applicationNo) =>
  callApi("HealthModerateClaimRejection", [policyNumber, empID, applicationNo]);
const HealthModerateClaimRepudiate = (policyNumber, empID, applicationNo) =>
  callApi("HealthModerateClaimRepudiate", [policyNumber, empID, applicationNo]);
const getComplaintAction = (obj) => callApi("getComplaintAction", [obj]);

const getSendAction = (obj) => callApi("getSendAction", [obj]);

const getPremiumEnquiryData = (obj) => callApi("getPremiumEnquiryData", [obj]);
const surrenderEnquiryData = (obj) => callApi("surrenderEnquiryData", [obj]);
const GetSurrenderEarlyFlag = (obj) => callApi("GetSurrenderEarlyFlag", [obj]);
const loanQuotationn = (obj) => callApi("loanQuotationn", [obj]);
const getPartialWithdrawalEnquiry = (obj) =>
  callApi("getPartialWithdrawalEnquiry", [obj]);
const getMandatetagEnquiry = (policyNumber, empID) =>
  callApi("getMandatetagEnquiry", [policyNumber, empID]);
const getMandateData = (poClientID, mandreff, applicationNo) =>
  callApi("getMandateData", [poClientID, mandreff, applicationNo]);
const getNomineeEnquiry = (policyNo, userId) =>
  callApi("getNomineeEnquiry", [policyNo, userId]);
const getNomineeCreation = (policyNo) =>
  callApi("getNomineeCreation", [policyNo]);
const getAgentEnquiry = (agnetNo, empID) =>
  callApi("getAgentEnquiry", [agnetNo, empID]);
const getCheckPANdetails = (panNo, policyNo) =>
  callApi("getCheckPANdetails", [panNo, policyNo]);
const RepudiateDeathClaimAPI = (policyNumber, empID) =>
  callApi("RepudiateDeathClaimAPI", [policyNumber, empID]);
const DeathClaimApprovalAPI = (policyNumber, empID) =>
  callApi("DeathClaimApprovalAPI", [policyNumber, empID]);
const FinanceActionsOnSerReq = (obj) =>
  callApi("FinanceActionsOnSerReq", [obj]);
const FinanceDashboardAPI = (obj) => callApi("FinanceDashboardAPI", [obj]);
const SaveEmailResponseDtls = (obj) => callApi("SaveEmailResponseDtls", [obj]);
const UpdateEmailStatus = (obj) =>
  callApi("UpdateEmailStatus", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const EmailManagementDashBoardFilters = (obj) =>
  callApi("EmailManagementDashBoardFilters", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const EmailMgAttendence = (obj) =>
  callApi("EmailMgAttendence", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const TATCasesForEmailMng = () => callApi("TATCasesForEmailMng", []);
const EmailAssignToUser = (obj) =>
  callApi("EmailAssignToUser", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const LoadCTST = (obj) =>
  callApi("LoadCTST", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const getIGMSComplaintsAPI = (serReqRefNo) =>
  callApi("getIGMSComplaintsAPI", [serReqRefNo], {
    "x-user-token": secureStorage.get("token"),
  });
const getDoNotDisturbAPI = (policyNumber, mobile) =>
  callApi("getDoNotDisturbAPI", [policyNumber, mobile]);
const taxCalculationForSerReq = (obj) =>
  callApi("taxCalculationForSerReq", [obj]);
const searchLocation = (pincode) => callApi("searchLocation", [pincode]);
const searchIGMSLocation = (pincode) =>
  callApi("searchIGMSLocation", [pincode]);
const DownloadEmailAttachments = (obj) =>
  callApi("DownloadEmailAttachments", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const registerDeathClaimAPI = (
  empID,
  policyNumber,
  effectiveDate,
  causeOfDeath,
  dateofDeath,
  zpostopm
) =>
  callApi("registerDeathClaimAPI", [
    empID,
    policyNumber,
    effectiveDate,
    causeOfDeath,
    dateofDeath,
    zpostopm,
  ]);
const getClientEnquiry = (obj, empID) =>
  callApi("getClientEnquiry", [obj, empID]);
const savePaymentLink = (obj) => callApi("savePaymentLink", [obj]);
const getOFACDetailsApi = (obj) => callApi("getOFACDetailsApi", [obj]);
const PPCSave = (data) => callApi("PPCSave", [data]);
const TransectionPayouts = (obj) => callApi("TransectionPayouts", [obj]);
const GetListOfServiceRequestForMaturity = (obj) =>
  callApi("GetListOfServiceRequestForMaturity", [obj]);
const GetServiceRequestForMaturity = (obj) =>
  callApi("GetServiceRequestForMaturity", [obj]);
const getPolicyOpenServiceRequests = (obj) =>
  callApi("getPolicyOpenServiceRequests", [obj]);
const getIGMSMastersData = (obj) =>
  callApi("getIGMSMastersData", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const saveRegisterComplaintAPI = (obj) =>
  callApi("saveRegisterComplaintAPI", [obj]);
const updateRegisterComplaintAPI = (obj) =>
  callApi("updateRegisterComplaintAPI", [obj]);
const UploadExcelFileAPI = (obj) => callApi("UploadExcelFileAPI", [obj]);

const ClaimsAdminDashBoardFilters = (obj) =>
  callApi("ClaimsAdminDashBoardFilters", [obj], {
    "x-user-token": secureStorage.get("token"),
  });

const GetClaimsExcel = (obj) =>
  callApi("GetClaimsExcel", [obj], {
    "x-user-token": secureStorage.get("token"),
  });

const reassignClaimTickets = (reassignFrom, ticket, roleId, reassignTo) =>
  callApi("ReassignClaimTickets", [reassignFrom, ticket, roleId, reassignTo], {
    "x-user-token": secureStorage.get("token"),
  });

const ClaimAttendance = (UserName, isPresent) =>
  callApi("ClaimAttendance", [UserName, isPresent], {
    "x-user-token": secureStorage.get("token"),
  });

const getPenalInterestData = (serialNum, PayoutType, tdsAmount) =>
  callApi("getPenalInterestData", [serialNum, PayoutType, tdsAmount], {
    "x-user-token": secureStorage.get("token"),
  });

const SubmitPayoutApproval = (obj) =>
  callApi("SubmitPayoutApproval", [obj], {
    "x-user-token": secureStorage.get("token"),
  });

const GetBlacklistDataList = () => callApi("GetBlacklistDataList", [],
  {"x-user-token": secureStorage.get("token")  }
);
const getADConfig = () => callApi("getADConfig", []);
const getGenericConfig = () => callApi("getGenericConfig", []);

const SaveUploadBlacklistData = (obj) =>
  callApi("SaveUploadBlacklistData", [obj], {
    "x-user-token": secureStorage.get("token"),
  });

const SubmitBlacklistData = (obj) =>
  callApi("SubmitBlacklistData", [obj], {
    "x-user-token": secureStorage.get("token"),
  });

const SurrenderRegistration = (obj) =>
  callApi("SurrenderRegistration", [obj], {
    "x-user-token": secureStorage.get("token"),
  });
const GetJEDetailsFromSR = (srvReqID) =>
  callApi("GetJEDetailsFromSR", [srvReqID], {
    "x-user-token": secureStorage.get("token"),
  });
  const PayeeCodeApprovalRoleBasedFetchData = (data,nbDashboard) =>
  callApi("PayeeCodeApprovalRoleBasedFetchData", [data,nbDashboard], {
    "x-user-token": secureStorage.get("token"),
  });

 const JEApprovalRoleBasedFetchData = (data,nbDashboard) =>
  callApi("JEApprovalRoleBasedFetchData", [data,nbDashboard], {
    "x-user-token": secureStorage.get("token"),
  }); 
  
//#region Group Email Management APIs || Below API Calls only For GRP EMS dont add here anything

const getCurrentUserId = () => {
  const uid = secureStorage.get("userId") || "";
  if (!getCurrentUserId._logged) {
    getCurrentUserId._logged = true;
  }
  return uid;
};

const withUserId = (obj) => {
  const uid = getCurrentUserId();
  if (!uid) return obj || {};
  if (obj && (obj.userId || obj.UserId)) {
    return obj;
  }
  return { ...(obj || {}), userId: uid };
};

const GetRecivedEmails = (obj) =>
  callApi("GetRecivedEmails", [withUserId(obj)], {
    "x-user-token": secureStorage.get("token"),
  });

const GetDashboardCasesCount = (obj) =>
  callApi("GetDashboardCasesCount", [withUserId(obj)], {
    "x-user-token": secureStorage.get("token"),
  });

const GetUserCasesCount = (obj) =>
  callApi("GetUserCasesCount", [withUserId(obj)], {
    "x-user-token": secureStorage.get("token"),
  });

const GetCaseDetails = (obj) =>
  callApi("GetCaseDetails", [withUserId(obj)], {
    "x-user-token": secureStorage.get("token"),
  });

const GetGroupEmsUserList = (obj) =>
  callApi("GetGroupEmsUserList", [withUserId(obj)], {
    "x-user-token": secureStorage.get("token"),
  });

const GetGroupEmsCTSTList = (obj) =>
  callApi("GetGroupEmsCTSTList", [withUserId(obj)], {
    "x-user-token": secureStorage.get("token"),
  });

const MarkCaseAsSpam = (obj) =>
  callApi("MarkCaseAsSpam", [withUserId(obj)], {
    "x-user-token": secureStorage.get("token"),
  });

const ForwardToInternalTeam = (obj) =>
  callApi("ForwardToInternalTeam", [withUserId(obj)], {
    "x-user-token": secureStorage.get("token"),
  });

const AssignEmsCaseToUser = (obj) =>
  callApi("AssignEmsCaseToUser", [withUserId(obj)], {
    "x-user-token": secureStorage.get("token"),
  });

const GetGrpEmsReportBasedOnCondition = (obj) =>
  callApi("GetGrpEmsReportBasedOnCondition", [withUserId(obj)], {
    "x-user-token": secureStorage.get("token"),
  });

const GetUsersAssignedEmails = (obj) =>
  callApi("GetUsersAssignedEmails", [withUserId(obj)], {
    "x-user-token": secureStorage.get("token"),
  });

const GetUserDashboardCasesCount = (obj) =>
  callApi("GetUserDashboardCasesCount", [withUserId(obj)], {
    "x-user-token": secureStorage.get("token"),
  });

const AdminReassignCases = (obj) =>
  callApi("AdminReassignCases", [withUserId(obj)], {
    "x-user-token": secureStorage.get("token"),
  });

const UserAssignCaseSubmission = (obj) =>
  callApi("UserAssignCaseSubmission", [withUserId(obj)], {
    "x-user-token": secureStorage.get("token"),
  });

const UpdateTatMasterEntry = (obj) =>
  callApi("UpdateTatMasterEntry", [withUserId(obj)], {
    "x-user-token": secureStorage.get("token"),
  });

const GetTatMasterEntry = (obj) =>
  callApi("GetTatMasterEntry", [withUserId(obj)], {
    "x-user-token": secureStorage.get("token"),
  });

const GetListOfHolidays = (obj) =>
  callApi("GetListOfHolidays", [withUserId(obj)], {
    "x-user-token": secureStorage.get("token"),
  });

const SaveHolidayDetails = (obj) =>
  callApi("SaveHolidayDetails", [withUserId(obj)], {
    "x-user-token": secureStorage.get("token"),
  });

const MarkEmailsAsSpam = (obj) =>
  callApi("MarkEmailsAsSpam", [withUserId(obj)], {
    "x-user-token": secureStorage.get("token"),
  });

const GetSpamEmailAddressesList = (obj) =>
  callApi("GetSpamEmailAddressesList", [withUserId(obj)], {
    "x-user-token": secureStorage.get("token"),
  });
const AddSpamEmailAddress = (obj) =>
  callApi("AddSpamEmailAddress", [withUserId(obj)], {
    "x-user-token": secureStorage.get("token"),
  });
// Above API Calls only For GRP EMS dont add here anything

//#endregion

const GetAutoAssignmentUsers = () =>
  callApi("GetAutoAssignmentUsers", [], {
    "x-user-token": secureStorage.get("token"),
  });

const UpdateAutoAssignmentUserStatus = (obj) =>
  callApi("UpdateAutoAssignmentUserStatus", [withUserId(obj)], {
    "x-user-token": secureStorage.get("token"),
  });
const GetServiceRequestByPolicy = (policyNumber,userId) =>
  callApi("GetServiceRequestByPolicy", [policyNumber,userId]);

function getOasisChunks() {
  return callgetOasisChunks();
}

const objects = {
  getGenericConfig,
  GetServiceRequestByPolicy,
  GetSpamEmailAddressesList,
  AddSpamEmailAddress,
  MarkEmailsAsSpam,
  GetTatMasterEntry,
  SaveHolidayDetails,
  GetListOfHolidays,
  UpdateTatMasterEntry,
  UserAssignCaseSubmission,
  AdminReassignCases,
  GetUserDashboardCasesCount,
  GetUsersAssignedEmails,
  GetGrpEmsReportBasedOnCondition,
  AssignEmsCaseToUser,
  ForwardToInternalTeam,
  MarkCaseAsSpam,
  GetGroupEmsCTSTList,
  GetGroupEmsUserList,
  GetCaseDetails,
  GetUserCasesCount,
  GetDashboardCasesCount,
  GetRecivedEmails,
  getADConfig,
  ClaimsAdminDashBoardFilters,
  GetClaimsExcel,
  reassignClaimTickets,
  ClaimAttendance,
  getOasisChunks,
  UpdateEmailStatus,
  LoadCTST,
  EmailManagementDashBoardFilters,
  EmailAssignToUser,
  EmailMgAttendence,
  TATCasesForEmailMng,
  UploadExcelFileAPI,
  getAssistanceDetails,
  getUserProfile,
  TransectionPayouts,
  GetCurrentFundAllocation,
  GetPartSurrenderEnquiry,
  searchLocation,
  getPlanFund,
  taxCalculationForSerReq,
  getEmailDedupeAPI,
  SaveEmailResponseDtls,
  SendEmailSMTP,
  GetEmailResponseDtls,
  FinanceActionsOnSerReq,
  FinanceDashboardAPI,
  GetFundValue,
  duplicateTab,
  LoanStatement,
  GetAssigneeEnquiry,
  LoanEnquiry,
  GetSerReqStatus,
  bankaccverification,
  getPartialWithdrawalEnquiry,
  loanQuotationn,
  surrenderEnquiryData,
  getBankDeatils,
  genericAPI,
  getDispositionData,
  getPolicyData,
  getClientEnquiry,
  POSActionsOnContactDetails,
  getRaiseRequirements,
  getPOSIndividualData,
  getPOSData,
  getSearchData,
  getHeaderParameters,
  getPremiumEnquiryData,
  savePaymentLink,
  ctst,
  ctstRoleBased,
  getLastOpenTickets,
  getSendOTP,
  PPCSave,
  GetSerReqByFilters,
  GetPOSExecRoles,
  saveAssignToPOS,
  getIFSCBanks,
  fileUpload,
  getCheckPANdetails,
  getAgentEnquiry,
  getNomineeCreation,
  getNomineeEnquiry,
  getExistPANNumber,
  getRelationsData,
  getProcesDocLnk,
  getProcesLink,
  getDocMaster,
  getEmailManagementFilter,
  getAllowableModeChangeOptionFetch,
  getBillingFrequencyChangeQuotation,
  getDoNotDisturbAPI,
  getMandatetagEnquiry,
  getServiceRequestCount,
  GetPaymentDetails,
  getPaymentReprocessing,
  getComplaintAction,
  getSendAction,
  getMandateData,
  GetListOfRolesByUserId,
  getDmsDocumentList,
  getTicketDetails,
  getEmailTemplate,
  getServiceRequestSearchDetails,
  GetCertificateOfExistenceEnquiry,
  GetSBfrequencyEnquiry,
  GetTransacions,
  getGCPPolicyDetails,
  GetListOfServiceRequestForMaturity,
  GetServiceRequestForMaturity,
  getPolicyOpenServiceRequests,
  getAnnuityEnquiry,
  GetPolicyDetailsBySrID,
  GETUNPROCEESEDUNITS,
  GetSearchPolicyDetails,
  GetComplaintSerReqByFilters,
  GetUsersByRoleID,
  saveAssignToComplaintTeam,
  AssignToGrevienceUser,
  getRoleBasedSearchDetails,
  getPayoutDetailsEnquiry,
  GetDocumentData,
  GetMobileDedupeAPI,
  GetEmailDedupeAPI,
  getVerifyBankDedup,
  getBOEUserDashboard,
  getDashboardFollowUps,
  SaveFollowUps,
  SaveRandomCallInfo,
  saveRaiseEnquiry,
  getProdConfigDropdown,
  getUserProfilePreferences,
  getIGMSMastersData,
  getIGMSComplaintsAPI,
  saveRegisterComplaintAPI,
  updateRegisterComplaintAPI,
  GetReceiptEnquiryForPolicy,
  SendComplaintCommunication,
  GetTDSInfo,
  getOFACDetailsApi,
  GetHistoricalCTST,
  GetCreateJournal,
  getFreeLookDetailsApi,
  getTokenData,
  GetClientLevelInfo,
  getPolicyEnquiry,
  GetClaimsPrimaryAssessmentEnquiry,
  GetComplaintDashboardCount,
  GetFetchCautionList,
  SaveCautionComments,
  GetPolicyClientEnquiry,
  CloseCautionComments,
  GetIGMSComplaintDescription,
  SendFalconideMail,
  GetUWFollowups,
  GetHistCommunications,
  GetAuditTrailDetails,
  GetClaimsCommentsInfo,
  GetClaimsViewCommentsInfo,
  registerDeathClaimAPI,
  GetAgeingCount,
  DeleteClaimsdetails,
  searchIGMSLocation,
  DeathClaimApprovalAPI,
  RepudiateDeathClaimAPI,
  getEmailResponseDetailsAPI,
  SendIGMSComplaintCommunication,
  SaveComplaintsInteractionDetails,
  UpdateComplaintTicketStatusAPI,
  getOasisAdminConfig,
  GetClaimPolicyDetails,
  SendPotentialComplaintCommunication,
  GetAgentDetails,
  GetPolicyClientDtls,
  GetEmailResponseExcel,
  getInvalidPolicyExcel,
  getGSTINEnquiry,
  GetClientDedupeData,
  GetClaimsDeleteCommentsInfo,
  GetCopyDetails,
  AddPayoutInfo,
  UpdatePayoutInfo,
  PayoutDashboard,
  GenerateBatchId,
  GetClaimsDownloadFile,
  GetPosDownloadFile,
  DownloadEmailAttachments,
  ATRTabDownloadPDF,
  getBOEUserDashboardLatest,
  getEmailVisibility,
  GetNarCategory,
  GenerateBatchInfo,
  getEmailResponseBodyAPI,
  JVCreation, //added by imran
  JVApproval, //added by imran
  RegularPaymentsRegisterAPI,
  RegularPaymentsApproval,
  TerminateRegularPayments,
  HealthMinorClaimApproval,
  HealthMinorClaimRejection,
  HealthMinorClaimRepudiate,
  HealthMajorClaimApproval,
  HealthMajorClaimRejection,
  HealthMajorClaimRepudiate,
  HealthModerateClaimApproval,
  HealthModerateClaimRejection,
  HealthModerateClaimRepudiate,
  GetDeathClaimAdjust,
  HealthMajorClaimRegisterAPI,
  HealthModerateClaimRegisterAPI,
  HealthMinorClaimRegisterAPI,
  GetClientAadhaarAndCKYCEnquiry,
  GetCLTVMHITagging,
  getPenalInterestData,
  GetSurrenderEarlyFlag,
  SubmitPayoutApproval,
  GetBlacklistDataList,
  SaveUploadBlacklistData,
  SubmitBlacklistData,
  SurrenderRegistration,
  GetAutoAssignmentUsers,
  UpdateAutoAssignmentUserStatus,
  DMSDocumentDetails,
  DMSViewerEncryption,
  POSActionsOnServReqSurrender,
  GetJEDetailsFromSR,
  PayeeCodeApprovalRoleBasedFetchData,
  JEApprovalRoleBasedFetchData,
};

export default objects;
