import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Collapse,
  Spin,
  Tooltip,
  Drawer,
  Progress,
  message,
  Modal,
  Button,
  Checkbox,
  Form,
  Col,
  Row,
  Input,
  DatePicker,
} from "antd";
import moment from "moment";
import apiCalls from "../api/apiCalls";
import { NumericFormat } from "react-number-format";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { policyDetailsObj } from "../reducers/policyDetailsReducer";
import { useLocation } from "react-router-dom";
import TypesComponent from "./CallTypes/TypesComponent";
import CloseIcon from "../assets/images/close-icon.png";
import Assistance from "../assets/images/handshake.png";
import { connect, useSelector } from "react-redux";
import archivedImg from "../assets/images/archived-tickets.svg";
import payoutsImg from "../assets/images/payout.svg";
import upcomingImg from "../assets/images/upcoming_renewal.svg";
import dmsImg from "../assets/images/DMS.svg";
import scrollImg from "../assets/images/scroll[1].svg";
import dispositionImg from "../assets/images/Static_Customer_Service.png";
import transactionImg from "../assets/images/transactiondocuments.svg";
import HistoricalCommunication from "./HistoricalCommunication";
import { useData } from "../reducers/DataContext";
import dayjs from "dayjs";
import TicketsOpenPopup from "./TicketsOpenPopup";
import { ErrorHandler } from "../utils/errorHandler";
import { encryptionService } from "../api/encryptionService";
import {
  formatAmountSafe,
  formatDateSafe,
  maskMobileNumber,
} from "../utils/HelperUtilites";
import ReusableTable from "./Common/ReusableTable";
import SidebarWidgets from "./Common/SidebarWidgets";
import {
  POLICYSTATUSLIST,
  PREMIUMSTATUSLIST,
  RELATIONSHIPLIST,
  RIDERCODEMAPPING,
  billFreq,
} from "../utils/constantLU";
import Widgets from "./Widgets/Widgets";

const CustomerDetails = (props) => {
  const { setShowIntRequestTime } = useData();
  const { Panel } = Collapse;
  const loggedUser = useSelector((state) => state?.userProfileInfo?.profileObj);
  const PolicyDetail = useSelector(
    (state) => state?.policyDetails?.policyDetailsObj
  );
    const store = useSelector((state) => state);
  const { transactionDocData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const { state } = useLocation();
  const [allDetailsOpen, setAllDetailsOpen] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [showLastPayments, setShowLastPayments] = useState(false);
  const [showOpenTickets, setShowOpenTickets] = useState(false);
  const [showDispositionData, setShowDispositionData] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const [ticketsData, setTicketsData] = useState([]);
  const [CALL_TyPES, setCALL_TyPES] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [requestModeLU, setRequestModeLU] = useState([]);
  const [registerModeLU, setRegisterModeLU] = useState([]);
  const [uwDecisionLU, setUWDecisionLU] = useState([]);
  const [uwDecisionNewLU, setUWDecisionNewLU] = useState([]);
  const [cautionModal, setCautionModal] = useState(false);
  const [cautionData, setCautionData] = useState(false);
  const [cautionComment, setCautionComment] = useState(null);
  const [isCaution, setIsCaution] = useState(false);
  const [isRiderData, setIsRiderData] = useState([]);
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [isHistoricalComm, setIsHistoricalComm] = useState(false);
  const [historicalCommData, setHistoricalCommData] = useState([]);
  const [isCommunicationContent, setIsCommunicationContent] = useState(false);
  const [commContent, setCommContent] = useState({});
  const [isPolicyAssigned, setIsPolicyAssigned] = useState({});
  const [clientRoleLU, setClientRoleLU] = useState([]);
  const [bankAccTypeLU, setBankAccTypeLU] = useState([]);
  const [requestReceivedViaLU, setRequestReceivedViaLU] = useState([]);
  const [premiumStatus, setPremiumStatus] = useState("");
  const [policyStatus, setPolicyStatus] = useState("");
  const [cursorPortalLU, setCursorPortalLU] = useState([]);
  const [websitePortalLU, setWebsitePortalLU] = useState([]);
  const [callRelatedActionLU, setCallRelatedActionLU] = useState([]);
  const [customerQueryLU, setCustomerQueryLU] = useState([]);
  const [panUpdateLU, setPanUpdateLU] = useState([]);
  const [processNameLU, setProcessNameLU] = useState([]);
  const [BirthdayIcon, setBirthdayIcon] = useState(false);
  const [sisLU, setSISLU] = useState([]);
  const [interlRequirementTagValue, setInternalRequirementTagValue] = useState(
    []
  );
  const [annuityPlans, setAnnuityPlans] = useState([]);
  const [isVerifiedCheck, setIsVerifiedCheck] = useState(false);
  const [details, setDetails] = useState([]);
  const [assistance, setAssistance] = useState([]);
  const [isTicketDetails, setIsTicketsDetails] = useState([]);

  const [assistanceOpen, setAssistanceOpen] = useState(false);
  const [CallTypeId, setCallTypeId] = useState("");
  const [EmailViewData, setEmailViewData] = useState(null);
  const [SubTypeId, setSubTypeId] = useState("");
  const [isShowAllTicketsData, setIsShowAllTicketsData] = useState(false);
  const [isSelectedTicketsData, setIsSelectedTicketsData] = useState({});
  const [isTicketsPOSObj, setIsTicketsPOSObj] = useState({});
  const [isChecked, SetIsChecked] = useState(false);
  const [isOpenTicket, setIsOpenTicket] = useState(false);
  const [serviceId, setServiceId] = useState("");
  const [isTicketsData, setIsTicketsData] = useState([]);
  const [Verifiedpopup, setVerifiedPopup] = useState(false);
  const [ShowUplodedDocs, setShowUplodedDocs] = useState(false);
  const [SelectedSubTypeVal, setSelectedSubTypeVall] = useState("");
  const [Address, setAddress] = useState("");
  const [Relation, setRelation] = useState("");
  const [PosData, setPosData] = useState(
    transactionDocData ? transactionDocData : ""
  );
  const [ClientName, setClientName] = useState("");
  const [isPayoutModal, setIsPayoutModal] = useState(false);
  const [payoutModalData, setpayoutModalData] = useState([]);
  const [isPayoutModalLoading, setIsPayoutModalLoading] = useState(false);
  const [customerProfile, setCustomerProfile] = useState({});
  const [NPSData, setNPSData] = useState("");
  const [languageMode, setLanguageMode] = useState("");
  const [communicationMode, setCommunicationMode] = useState("");
  const [customerSentiment, setCustomerSentiment] = useState("");
  const [causeOfEventLU, setCauseOfEventLU] = useState([]);
  const [natureOfDeathLU, setNatureOfDeathLU] = useState([]);
  const [paymentTransactions, setPaymentTransactions] = useState([]);
  const [paymentTransactionsData, setPaymentTransactionsData] = useState([]);
  const [policyTypeLU, setPolicyTypeLU] = useState([]);
  const [claimCategoryLU, setClaimCategoryLU] = useState([]);
  const [sourceInformationLU, setSourceInformationLU] = useState([]);
  const [claimIntimationLU, setClaimIntimationLU] = useState([]);
  const [assuredIncomePlanLU, setAssuredIncomePlanLU] = useState([]);
  const [policyDetailsModal, setPolicyDetailsModal] = useState(false);
  const [archivedTickets, setArchivedTickets] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [premiumEnquiryResponse, setPremiumEnquiryResponse] = useState([]);
  const [RupeeDetailsModal, setRupeeDetailsModal] = useState(false);
  const [laNomineeAddressLU, setLANomineeAddressLU] = useState([]);
  const [subStageLU, setSubStageLU] = useState([]);
  const [assessorsDecisionLU, setAssessorsDecisionLU] = useState([]);
  const [policyStatusDOBLU, setPolicyStatusDOBLU] = useState([]);
  const [paymentReasonCodeLU, setPymentReasonCodeLU] = useState([]);
  const [organCategoryCodeLU, setOrganCategoryCodeLU] = useState([]);
  const [healthClaimCodeLU, setHealthClaimCodeLU] = useState([]);
  const [coverageNameofProductLU, setCoverageNameofProduct] = useState([]);
  const [claimPaymentMethodLU, setClaimPaymentMethodLU] = useState([]);
  const [approverDecisionLU, setApproverDecisionLU] = useState([]);
  const [dataBseCHeckLU, setDataBaseCheckLU] = useState([]);
  const [hotSpotCheckLU, setHotSpotCheckLU] = useState([]);
  const [referCaseToLU, setReferCaseToLU] = useState([]);
  const [reinstatementDecisionLU, setReinstatementDecisionLU] = useState([]);
  const [withDGHLU, setWithDGHLU] = useState([]);
  const [investigatorLU, setInvestigatorLU] = useState([]);
  const [decisionDescriptionLU, setDecisionDescriptionLU] = useState([]);
  const [isAccoundetail, setIsAccoundetail] = useState(false);
  const [accountDetailsData, setAccountDetailsData] = useState(null);
  const [mandStatusLU, setMandStatusLU] = useState([]);
  const [martialStatusLU, setMartialStatusLU] = useState([]);
  const [salutationLU, setSalutationLU] = useState([]);
  const [showArchievedTickets, setShowArchievedTickets] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [dispositionData, setDispositionData] = useState(null);
  const [policyIssuanceDate, setPolicyIssuanceDate] = useState(null);
  const [receiptFromDate, setReceiptFromDate] = useState(null);
  const [receiptToDate, setReceiptToDate] = useState(null);
  const [agentStatus, setAgentStatus] = useState("");
  const [agentBranch, setAgentBranch] = useState("");
  const [agentName, setAgentName] = useState("");
  const [channel, setChannelName] = useState("");
  const [isRenwalPaymentLoading, setIsRenwalPaymentLoading] = useState(false);
  const [ckycValue, setCkycValue] = useState("No");
  const [MHIValue, setMHIValue] = useState("");
  const [CLITValue, setCLITValue] = useState("");
  const dateFormat = "DD/MM/YYYY";
  const CTSTpayload = useMemo(
    () => ({
      MasterRequest: [
        "CALL_TYP",
        "SUB_TYP",
        "REQST_MODE",
        "CLIENT_ROLE",
        "BNKACCTYP",
        "REQVIA",
        "CUST_PORTAL_ISSUE",
        "WEBSITE_PORTAL_ISSUE",
        "CALL_RELATED_ACTION",
        "CUSTOMER_QUERY_TOPIC",
        "PanUpdate",
        "PROCESS_NAME",
        "FORM_NAME",
        "INTL_REQMNT",
        "ANNUITY_TYP",
        "CAUSE_OF_EVENT",
        "NATURE_OF_DEATH",
        "POLICY_TYPES",
        "CLAIM_CATEGORY",
        "SOURCE_OF_INTIMATION",
        "CLAIM_INTIMATED_BY",
        "ASSURED_INCOME_PLAN",
        "UW_Decision",
        "Is_LA_Nominee_Address_Same",
        "Select_Sub_Stage",
        "ASSESOR_DECI",
        "Policy_Status_On_Date_Of_Death",
        "Approver_Decision",
        "IIB_Data_Base_Check",
        "Claim_Hotspot_Check",
        "Refer_Case_To",
        "Reinstatement_Decision",
        "With_DGH",
        "Investigator",
        "ASSESOR_SUB_DECI",
        "MANDATE_STAT",
        "SALUTATION",
        "MARTIAL_ST",
        "Reason_For_Freelook",
        "PYMT_RESN_CD",
        "CVGNM_PRDT",
        "CLM_PYMT_MTDH",
        "CI_CLM_CATEGORY",
        "ORGN_CTG",
        "UW_Decision_NEW",
      ],
    }),
    []
  );

  const antIcon = <LoadingOutlined className="custom-spin-icon" spin />;

  const LAST5_OPEN_TICKETS = [
    {
      title: "Created On",
      dataIndex: "date",
      key: "date",
      render: (v) => formatDateSafe(v),
    },
    {
      title: "Ticket No",
      dataIndex: "serviceNo",
      key: "serviceNo",
      render: (value, record) => (
        <div className="gridLink" onClick={() => handleTickectNoLink(record)}>
          {value}
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "urn",
      key: "urn",
      render: (value, record) => (
        <div className="gridLink" onClick={() => handleEmailView(record)}>
          {value}
        </div>
      ),
    },
    { title: "Call Type", dataIndex: "callTypeName", key: "callTypeName" },
    { title: "Sub Type", dataIndex: "subTypeName", key: "subTypeName" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Request Mode", dataIndex: "reqMode", key: "reqMode" },
    { title: "Q/R/C", dataIndex: "category", key: "category" },
    {
      title: "Closed On",
      dataIndex: "closedDate",
      key: "closedDate",
      render: (v) => formatDateSafe(v),
    },
    { title: "Age", dataIndex: "currentTAT", key: "currentTAT" },
    { title: "TAT", dataIndex: "tat", key: "tat" },
  ];
  const LAST5_OPEN_ARCHIEVEDTICKETS = [
    { title: "Ticket No", dataIndex: "srvReqRefNo", key: "srvReqRefNo" },
    { title: "Call Type", dataIndex: "subType1", key: "subType1" },
    { title: "Sub Type", dataIndex: "subType2", key: "subType2" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Q/R/C", dataIndex: "qrc", key: "qrc" },
    { title: "Created On", dataIndex: "reqDate", key: "reqDate" },
    { title: "Created By", dataIndex: "createBy", key: "createBy" },
  ];
  const PAYMENT_TRANSACTIONS = [
    { title: "Receipt Number", dataIndex: "rdocnum", key: "rdocnum" },
    { title: "Payment Date", dataIndex: "trandate", key: "trandate" },
    { title: "Payment Mode", dataIndex: "paytype", key: "paytype" },
    { title: "Payment Amount", dataIndex: "origamt", key: "origamt" },
    { title: "Status", dataIndex: "zchqsts", key: "zchqsts" },
    { title: "Cancel Reason", dataIndex: "zcanrsn", key: "zcanrsn" },
    { title: "Instrument No", dataIndex: "chqnum", key: "chqnum" },
    { title: "Instrument DT.", dataIndex: "tchqdate", key: "tchqdate" },
    { title: "Bank Name", dataIndex: "bankdesC01", key: "bankdesC01" },
    { title: "Bank Addr.", dataIndex: "bankdesC02", key: "bankdesC02" },
    { title: "Created By", dataIndex: "usrprf", key: "usrprf" },
  ];

  const DISPOSITION_DATA = [
    { title: "Policy No", dataIndex: "policyNo", key: "policyNo" },
    {
      title: "Group Disposition",
      dataIndex: "groupDisposition",
      key: "groupDisposition",
    },
    {
      title: "Sub Disposition",
      dataIndex: "subDisposition",
      key: "subDisposition",
    },
    {
      title: "Expandable Disposition",
      dataIndex: "expandable_Disposition",
      key: "expandable_Disposition",
    },
    { title: "Remark", dataIndex: "remark", key: "remark" },
    {
      title: "Dispose Datetime",
      dataIndex: "dispose_Datetime",
      key: "dispose_Datetime",
    },
    { title: "Contact Date", dataIndex: "contact_Date", key: "contact_Date" },
    { title: "Enablers", dataIndex: "tag", key: "tag" },
  ];

  const TransactionDocumentcolumns = [
    {
      title: "Document",
      dataIndex: "indexName",
      key: "indexName",
      render: (value, record) => (
        <a
          className="hyperLink"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleClick(e, record); // pass full record if you need more than indexName
          }}
        >
          {value}
        </a>
      ),
    },
    {
      title: "Uploaded On",
      dataIndex: "uploadedOn",
      key: "uploadedOn",
      render: (v) => formatDateSafe(v),
    },
    {
      title: "Uploaded By",
      dataIndex: "uploadedBy",
      key: "uploadedBy",
    },
  ];
  const Payoutcolumns = [
    { title: "PolicyNo", dataIndex: "CHDRNUM", key: "CHDRNUM" },
    { title: "Status", dataIndex: "Status", key: "Status" },
    {
      title: "Payment Date",
      dataIndex: "AUTHDATE",
      key: "AUTHDATE",
      render: (v) => formatDateSafe(v),
    },
    {
      title: "Payment Amount",
      dataIndex: "PAYAMT",
      key: "PAYAMT",
      render: (v) => formatAmountSafe(v),
    },
    {
      title: "Mode/Reference No",
      dataIndex: "laName",
      key: "laName",
      render: (_, r) => `${r.laName ?? ""}/${r.laClientID ?? ""}`,
    },
    {
      title: "Mode/Reference No",
      dataIndex: "CHEQNO",
      key: "CHEQNO",
      render: (_, ele) =>
        (ele.ZNEFTNO && ele.ZNEFTNO.trim()) || (ele.CHEQNO && ele.CHEQNO.trim())
          ? ele.ZNEFTNO && ele.ZNEFTNO.trim()
            ? ele.ZNEFTNO
            : `CHQ-${ele.CHEQNO}`
          : null,
    },
  ];

  const handleLanguageChange = (event) => {
    setLanguageMode(event.target.value);
  };

  const handleSentimentChange = (event) => {
    setCustomerSentiment(event.target.value);
  };

  const handleCommunicationChange = (event) => {
    setCommunicationMode(event.target.value);
  };

  const saveDropdownProfileValues = (onchangeValue) => {
    setIsProfileLoading(true);
    let data = {};
    if (onchangeValue === "Language") {
      data.TagValue = languageMode;
      data.TagName = "Language";
    } else if (onchangeValue === "Communication") {
      data.TagValue = communicationMode;
      data.TagName = "CommunicationMode";
    } else if (onchangeValue === "Customer") {
      data.TagValue = customerSentiment;
      data.TagName = "CustomerSentiment";
    }
    data.CreatedBy = "";
    data.ClientID = state?.poClientID;

    let response = apiCalls.getUserProfilePreferences(
      data.CreatedBy,
      data.ClientID,
      data.TagName,
      data.TagValue
    );
    response
      .then((val) => {
        //setCustomerProfile(val.data)
        setIsProfileLoading(false);
        setAllDetailsOpen(true);
      })
      .catch((err) => {
        setIsLoading(false);
        message.destroy();
        message.error({
          content:
            response?.data?.responseBody?.errormessage ||
            "Something went wrong please try again!",
          className: "custom-msg",
          duration: 2,
        });
      });
  };

  const callCenterLU = [{ label: "Call Related", value: 14 }];
  const callCenterSubTypeLU = [
    { label: "Verification not Completed", value: 10 },
  ];
  // Policy Status List

  useEffect(() => {
    getPolicyData();
    GetCLTVMHITagging();
    if (props?.isEmailManagement) {
      setCallTypeId(props?.CallTypeId);
      setSubTypeId(props?.SubTypeId);
    }
    if (loggedUser?.role == 14) {
      getClientEnquiry();
      getNomineeEnquiry();
    }

    isCusBirthday();
    // if (shouldLog.current) {
    //   shouldLog.current = false;
    if (
      !props?.isComplaintsUser &&
      !props.isEmailManagement &&
      props?.isComplaintsUser !== undefined &&
      props.isEmailManagement !== undefined
    ) {
      getHeadersData();
    } else {
      getHeadersData(props?.serviceRequestData);
    }

    // getDetails();

    //}
    if (!props?.EmailResponse?.IsEmailmanagent) {
      handleAllDetails();
    }
  }, [props?.searchPolicyData, isVerifiedCheck, isOpenTicket]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getPolicyData();
    if (state?.isAdvanceVerifiedCheck) {
      setIsVerifiedCheck(true);
    }
  }, [state?.isAdvanceVerifiedCheck, props?.searchPolicyData, isVerifiedCheck]); //eslint-disable-line react-hooks/exhaustive-deps

  const getPremiumStatus = (status, stausList) => {
    if (status) {
      const lowerCaseStatus = status.toLowerCase();
      const filteredStatus = stausList?.find(
        (ele) => ele?.descItem?.toLocaleLowerCase() === lowerCaseStatus
      );
      return filteredStatus?.longDesc || ""; // Return an empty string if not found
    }
    return "";
  };

  const GetCLTVMHITagging = async () => {
    setIsLoading(true);

    const policyNo =
      state?.policyNo || props?.policyDetails?.sentDetailsObj?.policyNo;
    const response = await apiCalls.GetCLTVMHITagging(policyNo);
    if (
      response?.data?.responseHeader?.issuccess &&
      response?.data?.responseBody?.errorcode == 0
    ) {
      setIsLoading(false);
      setMHIValue(response?.data?.responseBody?.mhI_Tagging);
      setCLITValue(response?.data?.responseBody?.cltV_Tagging);
    } else {
      setIsLoading(false);
      message.destroy();
      message.error({
        content:
          response?.data?.responseBody?.errormessage ||
          "Something went wrong please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  };

  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };

  const convertDateYYMMDD = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("YYYYMMDD");
    return formattedDate;
  };

  const isCusBirthday = () => {
    const dobString = props?.policyDetails?.sentDetailsObj?.dob;
    if (dobString) {
      const dob = new Date(
        parseInt(dobString.substring(0, 4)),
        parseInt(dobString.substring(4, 6)) - 1, // Months are zero-indexed
        parseInt(dobString.substring(6, 8))
      );

      // Get the current date
      const currentDate = new Date();

      // Calculate the difference in days
      const differenceInDays = Math.floor(
        (currentDate - dob) / (24 * 60 * 60 * 1000)
      );

      // Check if the difference is less than 5
      const isLessThan5Days = differenceInDays <= 5;
      setBirthdayIcon(isLessThan5Days);
    }
  };
  const getHeadersData = async (value) => {
    setIsLoading(true);

    const getSearchObj = () => ({
      requestheader: {
        source: "POS",
        policyNo: state?.policyNo,
        applicationNo: "",
      },
      requestBody: {
        mobileNo: "",
        emailID: "",
        pan: "",
        customerID: "",
        firstName: "",
        middleName: "",
        lastName: "",
        dob: "",
      },
    });

    const getObj = () => ({
      policyNo:
        state?.policyNo?.replace(/\D/g, "") ||
        props?.searchPolicyData?.policyNo ||
        value?.policyNo,
      applicationNo:
        state?.applicationNo || props?.searchPolicyData?.applicationNo || "",
      dob: state?.dob
        ? state?.dob.includes("/")
          ? state?.dob
          : convertDate(state?.dob)
        : props?.searchPolicyData?.dob
        ? props?.searchPolicyData?.dob.includes("/")
          ? props?.searchPolicyData?.dob
          : convertDate(props?.searchPolicyData?.dob)
        : props?.isComplaintsUser
        ? value?.dob
        : null,
    });

    const handleResponse = async (response, gcpresponse) => {
      try {
        if (gcpresponse?.data?.statusCode === "200") {
          setIsPolicyAssigned(response?.data?.responseBody?.assigneeDetails);
          setNPSData(gcpresponse.data.response.policyAttribute[0].nps_score);
          form.setFieldsValue({
            applicationSignedDateNo: convertDate(
              gcpresponse?.data?.response?.applicationAttribute[0]
                ?.proposalSignDate
            ),
          });
        }

        if (response?.data?.responseHeader?.issuccess) {
          if (
            response?.data?.responseBody?.planAndStatus?.productType === "UL"
          ) {
            setShowIntRequestTime(true);
          }
          fetchCautionListHandler(
            response?.data?.responseBody?.identifiers?.applicationNo
          );
          props?.updatePolicyDetails(response?.data?.responseBody);
          form.setFieldsValue({
            maturityDate: convertDate(
              response?.data?.responseBody?.saDetails?.riskcessiondate
            ),
          });
          setData(response?.data?.responseBody);
          const newPremiumStatus = getPremiumStatus(
            response?.data?.responseBody?.planAndStatus?.premiumStatus,
            PREMIUMSTATUSLIST
          );
          setPremiumStatus(newPremiumStatus);
          const newPolicyStatus = getPremiumStatus(
            response?.data?.responseBody?.planAndStatus?.policyStatus,
            POLICYSTATUSLIST
          );
          setPolicyStatus(newPolicyStatus);
          getAgentDetailsByAgentCode(
            response?.data?.responseBody?.salesDetails?.agentCode
          );
          getCTST();
        } else {
          message.destroy();
          message.error({
            content:
              response?.data?.responseBody?.errormessage ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
      } catch (error) {
        message.destroy();
        message.error({
          content:
            error || "An unexpected error occurred. Please try again later.",
          className: "custom-msg",
          duration: 2,
        });
      }
    };

    if (state?.isPOSExec) {
      const searchObj = getSearchObj();
      let searchresponse = await apiCalls.getSearchData(searchObj);
      if (searchresponse?.data?.responseHeader?.issuccess) {
        let resData = searchresponse?.data?.responseBody?.searchDetails[0];
        let obj = {
          policyNo:
            state?.policyNo?.replace(/\D/g, "") ||
            props?.searchPolicyData?.policyNo ||
            value?.policyNo,
          applicationNo:
            state?.applicationNo ||
            props?.searchPolicyData?.applicationNo ||
            "",
          dob: resData?.dob
            ? resData?.dob.includes("/")
              ? resData?.dob
              : convertDate(resData?.dob)
            : null,
        };
        let response = await apiCalls.getHeaderParameters(obj);
        setIsRiderData(
          response?.data?.responseBody?.componentWiseDetails || []
        );
        let gcpresponse = await apiCalls.getFreeLookDetailsApi(
          import.meta.env.VITE_APP_ENVIRONMENT === "PRODUCTION"
            ? state?.policyNo ||
                props?.searchPolicyData?.policyNo ||
                value?.policyNo
            : "01817159"
        );
        await handleResponse(response, gcpresponse);
      }
    } else {
      let obj = getObj();
      let response = await apiCalls.getHeaderParameters(obj);
      setIsRiderData(response?.data?.responseBody?.componentWiseDetails || []);
      let gcpresponse = await apiCalls.getFreeLookDetailsApi(
        import.meta.env.VITE_APP_ENVIRONMENT === "PRODUCTION"
          ? state?.policyNo ||
              props?.searchPolicyData?.policyNo ||
              value?.policyNo
          : "01817159"
      );
      await handleResponse(response, gcpresponse);
    }
  };

  const getAgentDetailsByAgentCode = async (agentCode) => {
    try {
      let res = await apiCalls.GetAgentDetails(agentCode);
      //console.log("Agent Details Response:", res);
      if (res.data !== null && res.data !== undefined) {
        setAgentStatus(res?.data?.AgentStatus);
        setAgentBranch(res?.data?.BranchName);
        setAgentName(res?.data?.AgentName);
        setChannelName(res?.data?.Channel);
      }
    } catch (error) {
      ErrorHandler(error);
    }
  };
  // Define a reusable function for data transformation
  const transformData = (data, keyy) => {
    const filteredData = data?.filter((ele) => ele.key === keyy);
    return filteredData[0]?.value?.map((item, index) => {
      let obj;

      if (keyy === "CALL_TYP") {
        obj = {
          ...item,
          label: item.mstDesc,
          // value: item.mstID,
          isCallType: true,
        };
      } else if (keyy === "SUB_TYP") {
        obj = {
          ...item,
          label: item.mstDesc,
          // value: item.mstID,
          isSubType: true,
        };
      } else if (keyy === "MARTIAL_ST" || keyy === "SALUTATION") {
        obj = {
          ...item,
          label: item.mstDesc,
          value: item?.extrL_KEY,
        };
      } else {
        obj = {
          ...item,
          label: item.mstDesc,
          value: item.mstID,
        };
      }
      return obj;
    });
  };
  const funCallType = (calltypes, subtypes) => {
    if (loggedUser?.boe && !state?.isBOE && !props?.isEmailManagement) {
      return [...calltypes, ...subtypes].map((ele, index) => {
        return {
          ...ele,
          value: index + 1,
        };
      });
    } else {
      return [...calltypes].map((ele, index) => {
        return {
          ...ele,
          value: ele.mstID,
        };
      });
    }
  };

  const getCTST = () => {
    let CTST = apiCalls.ctstRoleBased(
      CTSTpayload,
      loggedUser?.role == 14 && !isVerifiedCheck,
      loggedUser?.role
    );
    CTST.then((val) => {
      setMasterData(val.data);
      const transformedData = transformData(val.data, "CALL_TYP");
      const transformedSubType = transformData(val.data, "SUB_TYP");

      const rquestModeData = transformData(val.data, "REQST_MODE");
      const sortedRquestModeData = rquestModeData.sort((a, b) =>
        a.label.localeCompare(b.label)
      );
      const registerFreelookData = transformData(
        val.data,
        "Reason_For_Freelook"
      );
      const uWDecisionData = transformData(val.data, "UW_Decision");
      const getUWDecisionNewData = transformData(val.data, "UW_Decision_NEW");
      const clientroleData = transformData(val.data, "CLIENT_ROLE");
      const bankTypeLU = transformData(val.data, "BNKACCTYP");
      const getReqViaData = transformData(val.data, "REQVIA");
      const getPortalData = transformData(val.data, "CUST_PORTAL_ISSUE");
      const getWebsiteData = transformData(val.data, "WEBSITE_PORTAL_ISSUE");
      const getRelatedData = transformData(val.data, "CALL_RELATED_ACTION");
      const getCustomerQueryData = transformData(
        val.data,
        "CUSTOMER_QUERY_TOPIC"
      );
      const getAnnuityPlans = transformData(val.data, "ANNUITY_TYP");
      const getPANUpdateData = transformData(val.data, "PanUpdate");
      const gerProcessNameData = transformData(val.data, "PROCESS_NAME");
      const getSISData = transformData(val.data, "FORM_NAME");
      const getInternalRequirementTagValue = transformData(
        val.data,
        "INTL_REQMNT"
      );
      const getCauseofEventData = transformData(val.data, "CAUSE_OF_EVENT");
      const getNatureofDeathData = transformData(val.data, "NATURE_OF_DEATH");
      const getPolicyTypesData = transformData(val.data, "POLICY_TYPES");
      const getCalimCategoryData = transformData(val.data, "CLAIM_CATEGORY");
      const getSourceOfInfoData = transformData(
        val.data,
        "SOURCE_OF_INTIMATION"
      );
      const getClaimIntimatedData = transformData(
        val.data,
        "CLAIM_INTIMATED_BY"
      );
      const getAssuredIncomePlanData = transformData(
        val.data,
        "ASSURED_INCOME_PLAN"
      );
      const getLANomineeAddressData = transformData(
        val.data,
        "Is_LA_Nominee_Address_Same"
      );
      const getSubStageData = transformData(val.data, "Select_Sub_Stage");
      const getAssessorsDecisionData = transformData(val.data, "ASSESOR_DECI");
      const getPolicyStatusDOB = transformData(
        val.data,
        "Policy_Status_On_Date_Of_Death"
      );
      const getApproverDecision = transformData(val.data, "ASSESOR_DECI");
      const getDataBaseCheck = transformData(val.data, "IIB_Data_Base_Check");
      const getHotSpotCheck = transformData(val.data, "Claim_Hotspot_Check");
      const getReferCaseTo = transformData(val.data, "Refer_Case_To");
      const getReinstatementDecision = transformData(
        val.data,
        "Reinstatement_Decision"
      );
      const getWithDGH = transformData(val.data, "With_DGH");
      const getInvestigator = transformData(val.data, "Investigator");
      const getAssessorsSubDecisionData = transformData(
        val.data,
        "ASSESOR_SUB_DECI"
      );
      const getMandStatus = transformData(val.data, "MANDATE_STAT");
      const getMartialStatus = transformData(val.data, "MARTIAL_ST");
      const getSalutation = transformData(val.data, "SALUTATION");
      const getClaimPaymentMethod = transformData(val.data, "CLM_PYMT_MTDH");
      const getCoverageNameofProduct = transformData(val.data, "CVGNM_PRDT");
      const getPaymentReasonCode = transformData(val.data, "PYMT_RESN_CD");
      const getOrganCategoryCode = transformData(val.data, "ORGN_CTG");
      const getHealthClaimCode = transformData(val.data, "CI_CLM_CATEGORY");
      //const getLANomineeAddress = transformData(val.data, "ASSURED_INCOME_PLAN");
      // Set state using the transformed data
      //setCALL_TyPES(transformedData);

      setCALL_TyPES(funCallType(transformedData, transformedSubType));
      // setRequestModeLU(rquestModeData);
      setRequestModeLU(sortedRquestModeData);
      setRegisterModeLU(registerFreelookData);
      setUWDecisionLU(uWDecisionData);
      setUWDecisionNewLU(getUWDecisionNewData);
      setClientRoleLU(clientroleData);
      setBankAccTypeLU(bankTypeLU);
      setRequestReceivedViaLU(getReqViaData);
      setCursorPortalLU(getPortalData);
      setWebsitePortalLU(getWebsiteData);
      setCallRelatedActionLU(getRelatedData);
      setCustomerQueryLU(getCustomerQueryData);
      setPanUpdateLU(getPANUpdateData);
      setProcessNameLU(gerProcessNameData);
      setInternalRequirementTagValue(getInternalRequirementTagValue);
      setAnnuityPlans(getAnnuityPlans);
      setSISLU(getSISData);
      setCauseOfEventLU(getCauseofEventData);
      setNatureOfDeathLU(getNatureofDeathData);
      setPolicyTypeLU(getPolicyTypesData);
      setClaimCategoryLU(getCalimCategoryData);
      setSourceInformationLU(getSourceOfInfoData);
      setClaimIntimationLU(getClaimIntimatedData);
      setAssuredIncomePlanLU(getAssuredIncomePlanData);
      setLANomineeAddressLU(getLANomineeAddressData);
      setSubStageLU(getSubStageData);
      setAssessorsDecisionLU(getAssessorsDecisionData);
      setPolicyStatusDOBLU(getPolicyStatusDOB);
      setApproverDecisionLU(getApproverDecision);
      setDataBaseCheckLU(getDataBaseCheck);
      setHotSpotCheckLU(getHotSpotCheck);
      setReferCaseToLU(getReferCaseTo);
      setReinstatementDecisionLU(getReinstatementDecision);
      setWithDGHLU(getWithDGH);
      setInvestigatorLU(getInvestigator);
      setDecisionDescriptionLU(getAssessorsSubDecisionData);
      setMandStatusLU(getMandStatus);
      setMartialStatusLU(getMartialStatus);
      setSalutationLU(getSalutation);
      setClaimPaymentMethodLU(getClaimPaymentMethod);
      setCoverageNameofProduct(getCoverageNameofProduct);
      setPymentReasonCodeLU(getPaymentReasonCode);
      setOrganCategoryCodeLU(getOrganCategoryCode);
      setHealthClaimCodeLU(getHealthClaimCode);

      setIsLoading(false);
    }).catch((err) => {
      setIsLoading(false);
      message.destroy();
      message.error({
        content: err?.data?.responseBody?.errormessage,
        className: "custom-msg",
        duration: 2,
      });
    });
  };

  const getAssistanceDetails = () => {
    if (PosData === "") {
      if (!CallTypeId || !SubTypeId) {
        return;
      }
    } else {
      if (!PosData.callType || !PosData.subType) {
        return;
      }
    }

    let newCallTypeId = PosData === "" ? CallTypeId : PosData.callType;
    setIsLoading(true);
    let response = apiCalls.getAssistanceDetails(
      newCallTypeId,
      SubTypeId,
      loggedUser?.role
    );
    response
      .then((val) => {
        setAssistance(val.data);
        setIsLoading(false);
        setAssistanceOpen(true);
      })
      .catch((err) => {
        setIsLoading(false);
        message.destroy();
        message.error({
          content:
            response?.data?.responseBody?.errormessage ||
            "Something went wrong please try again!",
          className: "custom-msg",
          duration: 2,
        });
      });
  };

  const getPayoutDetailsEnquiry = async () => {
    try {
      setIsPayoutModal(true);
      setIsPayoutModalLoading(true);

      // Extract policy number dynamically
      const policyNo =
        state?.policyNo || props?.policyDetails?.sentDetailsObj?.policyNo;
      if (!policyNo) {
        throw new Error("Policy number is missing!");
      }

      // API call
      const response = await apiCalls.getPayoutDetailsEnquiry(policyNo);

      // Check response data
      if (response?.data?.payment_details) {
        setpayoutModalData(response.data.payment_details);
      } else {
        ErrorHandler(response);
      }
    } catch (error) {
      ErrorHandler(error);
    } finally {
      setIsPayoutModalLoading(false);
    }
  };

  const getClientEnquiry = async () => {
    try {
      let obj = {
        clientNumber: props?.policyDetails?.sentDetailsObj?.poClientID,
      };
      let empID = loggedUser?.allRoles?.[0]?.employeeID;

      if (!obj.clientNumber || !empID) {
        throw new Error("Required parameters are missing!");
      }

      // API Call
      const response = await apiCalls.getClientEnquiry(obj, empID);

      if (response?.data?.responseBody) {
        const res = response.data.responseBody;

        // Dynamically construct the address
        const addressFields = [
          "cltaddR01",
          "cltaddR02",
          "cltaddR03",
          "cltaddR04",
          "cltaddR05",
          "cltpcode",
          "ctrycode",
        ];

        const address = addressFields
          .map((field) => res?.[field])
          .filter(Boolean)
          .join(", ");

        setAddress(address);
      } else {
        ErrorHandler(response);
      }
    } catch (error) {
      ErrorHandler(error);
    }
  };

  const GetClientAadhaarAndCKYCEnquiry = async () => {
    try {
      let obj = {
        clientNumber: props?.policyDetails?.sentDetailsObj?.poClientID,
      };
      let empID = loggedUser?.allRoles?.[0]?.ClientID;

      if (!obj.clientNumber || !empID) {
        throw new Error("Required parameters are missing!");
      }

      // API Call
      const response = await apiCalls.GetClientAadhaarAndCKYCEnquiry(empID);
      if (response?.data?.responseBody) {
        const res = response.data.responseBody;

        // Dynamically construct the address
        const ResponseData = ["ClientId", "aadhaarno", "ckyc"];

        const AdharcKyc = ResponseData.map((field) => res?.[field])
          .filter(Boolean)
          .join(", ");

        setAddress(AdharcKyc);
      } else {
        ErrorHandler(response);
      }
    } catch (error) {
      ErrorHandler(error);
    }
  };

  const handleCuationList = () => {
    setCautionModal(true);
  };

  const fetchCautionListHandler = async (applicationNo) => {
    setIsLoading(true);
    try {
      const obj = {
        policyNo: state?.policyNo,
        applicationNo: applicationNo,
      };

      const response = await apiCalls.GetFetchCautionList(obj);
      if (response?.data) {
        const lastObject = response?.data[response?.data?.length - 1];
        if (lastObject?.status === 0) {
          setIsCaution(true);
        }
        if (lastObject?.status === 1) {
          setIsCaution(false);
        }
        const addPolicyNo = response.data.map((item) => ({
          ...item, // Spread the existing object properties
          policyNo: state?.policyNo, // Add the `policyNo` field
        }));
        setCautionData(addPolicyNo);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      ErrorHandler(err);
    }
  };
  const getNomineeEnquiry = async (checkItem) => {
    setIsLoading(true);
    try {
      const response = await apiCalls.getNomineeEnquiry(
        props?.policyDetails?.sentDetailsObj?.policyNo,
        loggedUser?.allRoles[0]?.employeeID
      );
      if (response?.data?.responseBody?.errorcode === "0") {
        const res = response?.data?.responseBody;
        if (res?.nomineeEnquiry?.length > 0) {
          for (const val of res?.nomineeEnquiry) {
            if (val) {
              setRelation(val?.bnyrln);
              setClientName(val?.clientName);
            }
          }
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
        ErrorHandler(response);
      }
    } catch (error) {
      setIsLoading(false);
      ErrorHandler(error);
    }
  };

  const Assistancee = () => {
    getAssistanceDetails();
  };
  const handleVerifyCheckBox = (e) => {
    if (e.target.checked) {
      SetIsChecked(true);
      setIsVerifiedCheck(e.target.checked);
    } else {
      SetIsChecked(false);
      setIsVerifiedCheck(e.target.checked);
    }
  };

  const handleAllDetails = async () => {
    try {
      //setAllDetailsOpen(true);
      setIsProfileLoading(true);

      // Validate required parameters
      const policyNo = props?.isComplaintsUser
        ? props?.serviceRequestData?.policyNo
        : state?.policyNo;
      const poClientID = props?.isComplaintsUser
        ? props?.policyDetails?.sentDetailsObj?.poClientID
        : state?.poClientID;
      const userName = loggedUser?.userName;
      // API Call
      const response = await apiCalls.getUserProfile(
        policyNo,
        poClientID,
        userName
      );
      const response2 = await apiCalls.GetClientAadhaarAndCKYCEnquiry(
        poClientID
      );

      if (response?.data) {
        setCustomerProfile(response?.data);
      } else {
        ErrorHandler(response);
      }
      if (response2?.data?.responseBody) {
        const res = response2.data.responseBody;
        const ckyc = res?.ckyc;

        if (ckyc && ckyc.trim() !== "") {
          setCkycValue(ckyc);
        } else {
          setCkycValue("No");
        }

        const ResponseData = ["ClientId", "aadhaarno", "ckyc"];
        const AdharcKyc = ResponseData.map((field) => res?.[field])
          .filter(Boolean)
          .join(", ");
        setAddress(AdharcKyc || "No");
        setAddress(AdharcKyc);
      } else {
        setCkycValue("No");
      }
    } catch (error) {
      ErrorHandler(error);
      setCkycValue("No");
    } finally {
      setIsProfileLoading(false);
    }
  };
  const handleDMSViewerEncryption = async () => {
    try {
      setIsLoading(true);
      let obj = {
        source: "POS",
        policyno: "",
        ApplicationNo:
          props?.policyDetails?.policyDetailsObj?.identifiers?.applicationNo,
        dob: "",
      };
      const response = await apiCalls.DMSViewerEncryption(obj);
      if (response?.data?.responseBody?.status) {
        const gConfig = await apiCalls.getGenericConfig();
        if (gConfig?.data?.dmsApiUrlNew) {
          const url =
            gConfig?.data?.dmsApiUrlNew +
            `?SearchParam=${response?.data?.responseBody.searchParam}&AccessToken=${response?.data?.responseBody.acessToken}`;
          window.open(url, "_blank");
        }
      }
    } catch (error) {
      ErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };
  const dmsnew = () => {
    debugger;
    handleDMSViewerEncryption();
  };
  const dms = async () => {
    const gConfig = await apiCalls.getGenericConfig();
    if (gConfig?.data?.dmsApiUrl) {
      const url =
        gConfig?.data?.dmsApiUrl +
        `/omnidocs/WebApiRequestRedirection?Application=BPMPOLENQ&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${props?.policyDetails?.policyDetailsObj?.identifiers?.applicationNo}`;
      window.open(url, "_blank");
    }
  };

  const handleLastPayments = async () => {
    setIsLoading(true);
    setReceiptFromDate(null);
    setReceiptToDate(null);
    await handleGetReceiptEnquiryForPolicy();
    setShowOpenTickets(false);
    setShowLastPayments(true);
    setIsHistoricalComm(false);
    setShowDispositionData(false);
    setShowArchievedTickets(false);
    if (typeof props?.setShowComplainUser === "function") {
      props?.setShowComplainUser(false);
    } else {
      console.error("setShowComplainUser is not a function");
    }
  };

  const handleGetReceiptEnquiryForPolicy = async () => {
    const payload = state?.policyNo;
    let ptd = data?.premiumDetails?.ptd; // Ensure this is a valid date string or object
    let toDate = dayjs().format("YYYYMMDD");
    let fromDate = dayjs(ptd).subtract(12, "month").format("YYYYMMDD");
    if (fromDate > toDate) {
      [fromDate, toDate] = [toDate, fromDate];
    }
    if (receiptFromDate != null) {
      fromDate = dayjs(receiptFromDate).format("YYYYMMDD");
    }
    if (receiptToDate != null) {
      toDate = dayjs(receiptToDate).format("YYYYMMDD");
    }
    try {
      setIsLoading(true);
      let empID = loggedUser?.allRoles[0]?.employeeID;
      const val = await apiCalls.GetReceiptEnquiryForPolicy(
        payload,
        empID,
        fromDate,
        toDate
      );
      if (val?.data) {
        setPaymentTransactions(
          val?.data?.responseBody?.receiptEnquiryDetailsList1 ||
            val?.data?.responseBody?.receiptEnquiryDetailsList01 ||
            []
        );
      } else {
        setPaymentTransactions([]);
        setPaymentTransactionsData([]);
      }
    } catch (err) {
      setPaymentTransactions([]);
      setPaymentTransactionsData([]);
      ErrorHandler(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenTickets = () => {
    setShowOpenTickets(true);
    setShowArchievedTickets(false);
    setShowLastPayments(false);
    setIsHistoricalComm(false);
    setShowDispositionData(false);
    setIsShowAllTicketsData(false);
    setIsTicketsPOSObj({}); // Ensure this doesn't break any dependent logic
    // Call API function after state updates
    getLastOpenTicketsData();
    if (typeof props?.setShowComplainUser === "function") {
      props.setShowComplainUser(false);
    } else {
      console.error("setShowComplainUser is not a function");
    }
  };

  const showArchivedTicketsHandler = () => {
    setShowArchievedTickets(true);
    setShowOpenTickets(false);
    setIsHistoricalComm(false);
    setShowDispositionData(false);
    setShowLastPayments(false);
    if (typeof props?.setShowComplainUser === "function") {
      props?.setShowComplainUser(false);
    } else {
      console.error("setShowComplainUser is not a function");
    }
  };
  const onClose = () => {
    // setCustomerProfile({});
    setAllDetailsOpen(false);
    setFaqOpen(false);
  };
  const handlePaymentsCLose = () => {
    setShowLastPayments(false);
    if (typeof props?.setShowComplainUser === "function") {
      props?.setShowComplainUser(true);
    } else {
      console.error("setShowComplainUser is not a function");
    }
  };
  const handleOpenTicketsCLose = () => {
    setShowOpenTickets(false);
    setIsShowAllTicketsData(false);
    setIsTicketsPOSObj({});
    setIsSelectedTicketsData({});
    if (typeof props?.setShowComplainUser === "function") {
      props?.setShowComplainUser(true);
    } else {
      console.error("setShowComplainUser is not a function");
    }
  };

  const handleDispositionData = async () => {
    setDispositionData([]);
    setShowDispositionData(true);
    setShowOpenTickets(false);
    setIsShowAllTicketsData(false);
    setShowArchievedTickets(false);
    setIsTicketsPOSObj({});
    setIsHistoricalComm(false);
    setShowLastPayments(false);
    if (typeof props?.setShowComplainUser === "function") {
      props?.setShowComplainUser(false);
    } else {
      console.error("setShowComplainUser is not a function");
    }
  };

  const closeDispositionData = () => {
    setShowDispositionData(false);
  };

  const getDispositionData = async () => {
    try {
      const policyNo =
        state?.policyNo || props?.policyDetails?.sentDetailsObj?.policyNo;
      setIsLoading(true);
      const obj = {
        requestHeader: {
          policyNo: policyNo,
        },
        requestBody: {
          fromDate: fromDate,
          toDate: toDate,
        },
      };

      let res = await apiCalls.getDispositionData(obj);
      console.log("Disposition Data Response:", res);
      const list = res?.data?.responseBody?.dispositionDataList || [];

      // add policy_No to each item
      const updatedList = list.map((item) => ({
        ...item,
        policyNo: policyNo,
      }));

      setDispositionData(updatedList);
      setIsLoading(false);
    } catch (error) {
      ErrorHandler(error);
    }
  };

  const getPolicyData = async () => {
    const policyNo =
      state?.policyNo || props?.policyDetails?.sentDetailsObj?.policyNo;
    const obj = {
      requestHeader: {
        source: "POS",
        carrierCode: "2",
        branch: "PRA",
        userId: "rpandya",
        userRole: "10",
        partnerId: "MSPOS",
        processId: "POS",
        monthendExtension: "N",
        monthendDate: "18/10/2023",
      },
      requestbody: {
        policyNo: policyNo,
        effectiveDate: dayjs().format("YYYYMMDD"),
        action: "A",
      },
    };

    let res = await apiCalls.getPolicyData(obj);
    console.log("Policy Data Response:", res);
    let date = res?.data?.responseBody?.occdate;
    const issuanceDate = dayjs(date, "YYYYMMDD");
    setPolicyIssuanceDate(issuanceDate);
  };

  const fromDateHandler1 = (date, dateString) => {
    if (date) {
      const formattedDate = date.format("YYYY-MM-DD"); // date is already dayjs!
      setFromDate(formattedDate);
    }
  };

  const getLastOpenTicketsData = () => {
    setIsLoading(true);

    // Define the policyNo based on the user's role
    const policyNo =
      loggedUser?.role === 22 || loggedUser?.role === 23
        ? props?.policyDetails?.policyDetailsObj?.identifiers?.policyNo
        : state?.policyNo;

    // Call API to get the last open tickets
    apiCalls
      .getLastOpenTickets(policyNo)
      .then((val) => {
        const updatedDataArray = val?.data?.map((item) => {
          let formattedDate = item?.closedDate;
          let openDate = item?.date;

          if (openDate) {
            // Format the open date
            openDate = moment.utc(openDate).format("DD/MM/YYYY");
          }

          if (formattedDate && formattedDate !== "-") {
            // Format the closed date
            formattedDate = moment.utc(formattedDate).format("DD/MM/YYYY");
          }

          if (item.status === "REJECTED") {
            return { ...item, status: "CLOSED WITH REQUIREMENTS" };
          } else if (item.status === "PENDING") {
            return { ...item, closedDate: "-" }; // Placeholder for pending items
          }

          return { ...item, closedDate: formattedDate, date: openDate };
        });

        // Update state with the formatted ticket data
        console.log("updatedArray", updatedDataArray);
        setTicketsData(updatedDataArray);
        setIsLoading(false);
      })
      .catch((err) => {
        // Handle any error that occurs during the API call
        setIsLoading(false);
        ErrorHandler(err);
      });
  };
  const customHeader = (
    <>
      <div class="flex-container">
        <span className="headingg gridd flexxx p-0">
          Policy No : {PolicyDetail?.identifiers?.policyNo}
          &nbsp;
          <Tooltip placement="leftTop" title="Click for more info!">
            <a id="pay-premium" onClick={() => handleClickIcon()}>
              <i class="bi bi-info-square" style={{ color: "#b21f1f" }}></i>
            </a>
          </Tooltip>
          &nbsp;
          {[4, 5, 31, 32, 33, 34].includes(loggedUser?.role) && (
            <Tooltip
              placement="leftTop"
              title="Click to add policy in caution list"
            >
              <a id="pay-premium" onClick={() => handleCuationList()}>
                <i
                  class="bi bi-exclamation-triangle-fill"
                  style={{ color: "#b21f1f" }}
                ></i>
              </a>
            </Tooltip>
          )}
          {NPSData && (
            <Tooltip title="NPS Score">
              <span className="square">{NPSData}</span>
            </Tooltip>
          )}
        </span>
        <span className="headingg gridd p-0">
          Application No : {PolicyDetail?.identifiers?.applicationNo}
        </span>
        <span className="headingg gridd flexxx p-0">
          LA Name : {PolicyDetail?.identifiers?.la_Name}
        </span>
        <span className="headingg gridd flexxx p-0">
          {" "}
          PO Name : {PolicyDetail?.identifiers?.po_Name}
          {BirthdayIcon && (
            <Tooltip
              title={
                convertDate(props?.policyDetails?.sentDetailsObj?.dob) || "-"
              }
            >
              <span className="square">
                <i className="bi bi-cake"></i>
              </span>
            </Tooltip>
          )}
        </span>
      </div>
    </>
  );
  const getDetails = async (serialNum) => {
    setIsLoading(true);
    const val = await apiCalls.getTicketDetails(serialNum);
    if (val?.data) {
      setIsLoading(false);
      setDetails(val?.data);
    } else {
      message.destroy();
      message.error({
        content:
          val?.data?.responseHeader?.message ||
          "Something went wrong please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  };
  const handleClickIcon = () => {
    setPolicyDetailsModal(true);
  };

  const handleClickRupeeIcon = async () => {
    setRupeeDetailsModal(true);
    setIsRenwalPaymentLoading(true);
    try {
      const effectiveDateCoversion = convertDateYYMMDD(new Date());

      const obj = {
        ClientID: null,
        PolicyNo: data?.identifiers?.policyNo,
        Action: "A",
        EffectiveDate: effectiveDateCoversion,
        CustomerRef: null,
        _HeaderPayload: {
          loggedinUser: loggedUser.userName,
        },
      };
      const response = await apiCalls.GetClientLevelInfo(obj);
      if (response.status === 200) {
        setIsRenwalPaymentLoading(false);
        setUpcomingEvents(response?.data?.upcomingEvents);
        setPremiumEnquiryResponse([
          response?.data?._GetPremiumEnquiryResponse.responseBody,
        ]);
      }
    } catch (err) {
      setRupeeDetailsModal(true);
      setIsRenwalPaymentLoading(false);
      setUpcomingEvents([]);
      setPremiumEnquiryResponse([]);
      ErrorHandler(err);
    }
  };

  // Added by Akshada: Policy Enquiry - direct hit with encrypted params
  const openPersonalDetailsHiddenSearch =async (policyNo) => 
    {
    const gConfig= await apiCalls.getGenericConfig();
          if(gConfig?.data?.WKPOLENQ_URL)
            {
        console.log(gConfig?.data?.WKPOLENQ_URL);      
    const baseUrl = gConfig?.data?.WKPOLENQ_URL;
    console.log('Base before normalize:', baseUrl);
    const polDigits = String(policyNo || "").replace(/\D/g, "");
    //const userId =1141445;
    const userId = loggedUser?.allRoles?.[0]?.employeeID || loggedUser?.userName || "";

    const oasisKey = encryptionService.getOasis_key();
    if (!oasisKey) {
      message.error({
        content: "Encryption key unavailable. Please reload the app.",
        className: "custom-msg",
        duration: 2,
      });
      return;
    }

    const encUserId = encodeURIComponent(encryptionService.encryptObject(userId));
    const encPolicy = encodeURIComponent(encryptionService.encryptObject(polDigits));

    // Normalize query separator based on base URL
    let finalBase = baseUrl || '';
    const hasQuery = finalBase.includes('?');
    if (!hasQuery) {
      finalBase = finalBase.endsWith('/')
        ? `${finalBase}BPMAccessV2.aspx?`
        : `${finalBase}?`;
    }
    const sep = finalBase.endsWith('?') || finalBase.endsWith('&')
      ? ''
      : (finalBase.includes('?') ? '&' : '?');

    const url = `${finalBase}${sep}UserId=${encUserId}&PolicyNumber=${encPolicy}`;
    console.log("Policy Enquiry URL:", url);

    const popup = window.open(url, "PolicyEnquiryWin");
    if (!popup) {
      message.warning({
        content: "Popup was blocked. Enable pop-ups for this site.",
        className: "custom-msg",
        duration: 3,
      });
    }
  }
  };
//Added by Akshada: PolicyEnquiry
  const handlePolicyEnquiryClick = () => 
    {
    const policyNo =
      data?.identifiers?.policyNo ||
      state?.policyNo ||
      props?.policyDetails?.sentDetailsObj?.policyNo ||
      props?.store?.policyDetails?.policyDetailsObj?.identifiers?.policyNo;

    if (!policyNo) {
      message.warning({
        content: "Policy number not available.",
        className: "custom-msg",
        duration: 2,
      });
      return;
    }

    openPersonalDetailsHiddenSearch(policyNo);

    message.success({
      content: "Opening Policy Enquiry (encrypted)",
      className: "custom-msg",
      duration: 2,
    });
  };

  const handleTickectNoLink = (slectedRow) => {
    setCallTypeId(slectedRow?.callType);
    setSubTypeId(slectedRow?.subType);
    setIsOpenTicket(true);
    setServiceId(slectedRow?.serviceNo);
    //getPOSIndividualData(slectedRow?.serviceNo);
    setIsTicketsData(slectedRow);
    setIsLoading(true);
    setTimeout(() => {
      getDetails(slectedRow?.serviceNo);
    }, 1000);
    setIsLoading(false);
  };

  const handleEmailView = async (selectedRow) => {
    let obj = {
      emailResponseId: selectedRow.emailResponseId,
    };
    let response = await apiCalls.getEmailVisibility(obj);
    console.log("UserMail", response);
    setEmailViewData(response.data);
  };

  const handleClose = () => {
    setIsOpenTicket(false);
  };
  const handleTicketSubmit = () => {
    setIsOpenTicket(false);
  };

  const handleClick = (e, item) => {
    e.preventDefault();
    const url = `${import.meta.env.VITE_APP_Image_Path}${item?.fileLocation}${
      item?.documentName
    }`;
    const imageExtensions = ["jpg", "png", "jpeg"];
    const pdfExtension = "pdf";

    const fileExtension = item?.documentName?.split(".").pop().toLowerCase();

    if (imageExtensions.includes(fileExtension)) {
      const newWindow = window.open();
      newWindow.document.write(`
        <html>
          <head>
            <title>New Tab</title>
          </head>
          <body>
            <img src="${url}" alt="Image" style="width:100%; height:100%;">
          </body>
        </html>
      `);
      newWindow.document.close();
    } else if (fileExtension === pdfExtension) {
      // Open PDF in a new tab
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      // For other file types, download the file
      const link = document.createElement("a");
      link.href = url;
      link.download = item.documentName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const hideArchivedTicketsHandler = () => {
    setShowArchievedTickets(false);
    if (typeof props?.setShowComplainUser === "function") {
      props?.setShowComplainUser(true);
    }
  };

  const fromDateHandler = (date, dateString) => {
    debugger;
    if (dateString) {
      const formattedDate = dayjs(dateString).format("YYYY-MM-DD");
      setFromDate(formattedDate);
    }
  };

  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      setToDate(formattedDate);
    }
  };

  const receiptFromDateHandler = (date, dateString) => {
    if (date) {
      const formattedDate = dayjs(date).format("YYYYMMDD");
      setReceiptFromDate(formattedDate);
    } else {
      setReceiptFromDate(null);
    }
  };

  const receiptHandleDateChange = (date) => {
    if (date) {
      const formattedDate = dayjs(date).format("YYYYMMDD");
      setReceiptToDate(formattedDate);
    } else {
      setReceiptToDate(null);
    }
  };

  const getArchievedTickets = async () => {
    if (fromDate === null || toDate === null) {
      return null;
    }

    // Get today's date (without time)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00 to compare only dates

    // Convert fromDate and toDate to Date objects for comparison
    const fromDateObj = new Date(fromDate);
    fromDateObj.setHours(0, 0, 0, 0);
    const toDateObj = new Date(toDate);
    toDateObj.setHours(0, 0, 0, 0);
    try {
      setIsLoading(true);

      let obj = {
        FromDate: fromDate,
        ToDate: toDate,
        PolicyNo: data?.identifiers?.policyNo,
      };

      const response = await apiCalls.GetHistoricalCTST(obj);
      setArchivedTickets(response.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      ErrorHandler(err);
    }
  };

  const cuationCommentsHandler = async () => {
    if (cautionComment === null || cautionComment === "") {
      message.warning("Please enter comments");
      return null;
    }

    try {
      const obj = {
        CautionLstID: 1,
        PolicyRef: state?.policyNo,
        CustomerRef: 111222333,
        CreatedBy: loggedUser?.name,
        CreatedOn: new Date(),
        ModifiedBy: loggedUser?.name,
        ModifiedOn: new Date(),
        Status: 2,
        Comments: cautionComment,
        policy: {
          PolicyRef: 0,
          LA_PolicyNo: state?.policyNo,
          FG_ApplNo: data?.identifiers?.applicationNo,
          CautionLstStatus: 0,
        },
        customer: {
          CustomerRef: 0,
          LA_CustomerID:
            props?.policyDetails?.policyDetailsObj?.identifiers?.po_ClientID,
        },
      };
      const response = await apiCalls.SaveCautionComments(obj);
      if (response.status === 200) {
        message.success("Policy added to Caution-List");
        setIsCaution(true);
        const newComment = {
          ...response?.data, // Spread the existing properties from response data
          policyNo: state?.policyNo, // Add policyNo to newComment object
        };
        const addNewComment = [
          ...cautionData, // Spread the existing items in the array
          newComment, // Add `newComment` as the next item in the array
        ];
        setCautionData(addNewComment);
        setCautionComment("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeCautionHandler = async () => {
    if (cautionComment === null || cautionComment === "") {
      message.warning("Please enter comments");
      return null;
    }

    try {
      const obj = {
        policy: {
          PolicyRef: 0,
          LA_PolicyNo: state?.policyNo,
          FG_ApplNo: data?.identifiers?.applicationNo,
          CautionLstStatus: 1,
        },
        appUser: {
          UsrID: loggedUser?.name,
        },
        ClosureComments: cautionComment,
      };

      const response = await apiCalls.CloseCautionComments(obj);
      if (response?.status === 200) {
        setCautionComment("");
        setIsCaution(false);
        message.success("Removed Policy from Caution-List");
        setCautionModal(false);
      } else {
        message.warning("Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const showHistoricalCommHandler = () => {
    setShowOpenTickets(false);
    setShowArchievedTickets(false);
    setShowLastPayments(false);
    setShowDispositionData(false);
    setIsShowAllTicketsData(false);
    setIsHistoricalComm(!isHistoricalComm);
    getHistoricalCommunicationDetails();
  };

  const getHistoricalCommunicationDetails = async () => {
    setIsLoading(true);
    try {
      const obj = {
        PolicyNo: state?.policyNo,
      };

      const response = await apiCalls?.GetHistCommunications(obj);
      if (response?.data) {
        setHistoricalCommData(response?.data);
        // console.log(response?.data);
        setIsLoading(false);
      } else {
        console.log("error is ", response?.error);
        setIsLoading(false);
      }
    } catch (err) {
      console.log("Error is ", err);
      setIsLoading(false);
    }
  };

  const communicationContentHandler = (contentData) => {
    setCommContent(contentData);
  };

  const accoutDeailHandler = (ele) => {
    setAccountDetailsData(ele);
    setIsAccoundetail(true);
  };

  return (
    <>
      <Spin spinning={isLoading} fullscreen />
      <div className="main-start">
        <div
          className={props?.isComplaintsUser ? "complaintsuser-width" : "w-94"}
        >
          {/* {SelectedSubTypeVal==="Revival With DGH" && <div className="mb-3">{customHeader}</div> } */}
          {!props?.isEmailManagement && (
            <>
              <div>
                <Collapse
                  accordion
                  expandIconPosition={"end"}
                  className="accordian customer acc1"
                  defaultActiveKey={["1"]}
                >
                  <Panel
                    header={customHeader}
                    key="1"
                    className={`fs-16 fw-500 mb-10 ${
                      isCaution && "caution-list"
                    }`}
                  >
                    <div className="">
                      <div className="flex-container">
                        <section className="grid">
                          <div className="left-half">
                            <article>
                              <p>Customer Type</p>
                              <p>Plan Name</p>
                              <p>Policy Status</p>
                              <p>Premium Status</p>
                              {loggedUser?.role == 14 && (
                                <>
                                  <p>
                                    {" "}
                                    <a
                                      className="hyperLink"
                                      onClick={() => setVerifiedPopup(true)}
                                    >
                                      {" "}
                                      Verified
                                    </a>
                                  </p>
                                </>
                              )}
                              <p>MHI Tagging</p>
                            </article>
                          </div>
                          <div className="right-half">
                            <article>
                              <p>
                                <b>
                                  {PolicyDetail?.planAndStatus?.customerType ||
                                    "-"}{" "}
                                </b>
                              </p>
                              <p>
                                <b>
                                  {" "}
                                  {PolicyDetail?.planAndStatus?.planName ||
                                    "-"}{" "}
                                </b>
                              </p>
                              <p>
                                <b> {policyStatus || "-"} </b>
                              </p>
                              <p>
                                <b> {premiumStatus || "-"} </b>
                              </p>
                              {loggedUser?.role == 14 && (
                                <>
                                  <p>
                                    <Checkbox
                                      type="checkbox"
                                      onChange={(e) => handleVerifyCheckBox(e)}
                                      checked={isVerifiedCheck}
                                    />
                                    {/* <h1>{isCheckedButton?"srrr":"hhhhh"}</h1> */}
                                  </p>
                                </>
                              )}
                              <p>
                                <b>{MHIValue || "-"}</b>
                              </p>
                            </article>
                          </div>
                        </section>
                        <section className="grid">
                          <div className="left-half">
                            <article>
                              <p>Sum Assured</p>
                              <p>PT</p>
                              <p>RCD</p>
                              <p>Assignment</p>
                              <p>CLTV Tagging</p>
                            </article>
                          </div>
                          <div className="right-half">
                            <article>
                              <p>
                                <b>
                                  {(PolicyDetail?.saDetails?.sumAssured && (
                                    <NumericFormat
                                      value={
                                        PolicyDetail?.saDetails?.sumAssured
                                      }
                                      decimalSeparator="."
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      decimalScale={0}
                                    />
                                  )) ||
                                    "-"}
                                </b>
                              </p>
                              <p>
                                <b>{PolicyDetail?.saDetails?.pt || "-"}</b>
                              </p>
                              <p>
                                <b>
                                  {convertDate(PolicyDetail?.saDetails?.rcd) ||
                                    "-"}
                                </b>
                              </p>
                              <p>
                                <b>
                                  {PolicyDetail?.assigneeDetails
                                    ?.isPolicyAssigned || "N"}
                                </b>
                              </p>
                              <p>
                                <b>{CLITValue || "-"}</b>
                              </p>
                            </article>
                          </div>
                        </section>
                        <section className="grid">
                          <div className="left-half">
                            <article>
                              <p>Modal Premium</p>
                              <p>PPT</p>
                              <p>PTD</p>
                              <p>Mode</p>
                            </article>
                          </div>
                          <div className="right-half">
                            <article>
                              <p>
                                <b>
                                  <Tooltip
                                    title={`Premium: ${
                                      PolicyDetail?.premiumDetails
                                        ?.modelPremiumAmount || "-"
                                    }, GST: ${
                                      PolicyDetail?.premiumDetails?.gst || "-"
                                    }`}
                                  >
                                    {(PolicyDetail?.premiumDetails
                                      ?.modelPremiumAmount &&
                                      PolicyDetail?.premiumDetails?.gst && (
                                        <NumericFormat
                                          value={
                                            parseFloat(
                                              PolicyDetail?.premiumDetails
                                                ?.modelPremiumAmount
                                            ) +
                                            parseFloat(
                                              PolicyDetail?.premiumDetails?.gst
                                            )
                                          }
                                          decimalSeparator="."
                                          displayType={"text"}
                                          thousandSeparator={true}
                                          decimalScale={0}
                                        />
                                      )) ||
                                      "-"}
                                  </Tooltip>
                                </b>
                              </p>
                              <p>
                                <b>
                                  {PolicyDetail?.premiumDetails?.ppt || "-"}
                                </b>
                              </p>
                              <p>
                                <b>
                                  {convertDate(
                                    PolicyDetail?.premiumDetails?.ptd
                                  ) || "-"}
                                </b>
                              </p>
                              <p>
                                <b>
                                  {billFreq[
                                    PolicyDetail?.premiumDetails?.billFreq
                                  ] || "-"}
                                </b>
                              </p>
                            </article>
                          </div>
                        </section>
                        <section className="grid">
                          <div className="left-half">
                            <article>
                              <p>Branch</p>
                              <p>Channel</p>
                              <p>Agent</p>
                              <p>Orphan</p>
                              <p>Status</p>
                            </article>
                          </div>
                          <div className="right-half">
                            <article>
                              <p>
                                <b>{agentBranch || "-"}</b>
                                {/* <b>{data?.identifiers?.branchName || "-"} </b> */}
                              </p>
                              <p>
                                <b>{channel || "-"}</b>
                                {/* <b>{data?.salesDetails?.channel || "-"} </b> */}
                              </p>
                              <p>
                                <b>
                                  <b>{agentName || "-"}</b>
                                  {/* {data?.salesDetails?.agentName || "-"} */}
                                </b>
                              </p>
                              <p>
                                <b>
                                  {PolicyDetail?.salesDetails?.orphanFlag ||
                                    "-"}
                                </b>
                              </p>
                              <p>
                                <b>{agentStatus || "-"}</b>
                              </p>
                            </article>
                          </div>
                        </section>
                      </div>
                    </div>
                  </Panel>
                </Collapse>
              </div>
            </>
          )}

          {showLastPayments && (
            <>
              <Collapse
                accordion
                expandIconPosition={"end"}
                defaultActiveKey={["1"]}
                className="lats-tickets"
              >
                <img
                  src={CloseIcon}
                  alt=""
                  className="close-icons"
                  onClick={() => handlePaymentsCLose()}
                ></img>
                <Panel
                  header="Payment Transactions"
                  key={1}
                  className="table-top"
                >
                  <div className="form-container">
                    <Form layout="inline">
                      <Form.Item
                        label="From Date"
                        name="fromDate"
                        rules={[
                          { required: true, message: "Select From Date" },
                        ]}
                      >
                        <DatePicker
                          format={dateFormat}
                          className="date-picker"
                          onChange={(date, dateString) =>
                            receiptFromDateHandler(date, dateString)
                          }
                          // disabledDate={(current) => current && current > new Date()}
                          disabledDate={(current) => {
                            const minDate = data?.saDetails?.rcd
                              ? new Date(
                                  data.saDetails.rcd.substring(0, 4), // Year
                                  parseInt(
                                    data.saDetails.rcd.substring(4, 6),
                                    10
                                  ) - 1, // Month (0-based)
                                  data.saDetails.rcd.substring(6, 8) // Day
                                )
                              : null;

                            return (
                              current &&
                              ((minDate && current < minDate) ||
                                current > new Date())
                            );
                          }}
                        />
                      </Form.Item>

                      <Form.Item
                        label="To Date"
                        name="toDate"
                        rules={[{ required: true, message: "Select To Date" }]}
                      >
                        <DatePicker
                          format={dateFormat}
                          className="date-picker"
                          onChange={receiptHandleDateChange}
                          disabledDate={(current) =>
                            current && current > new Date()
                          }
                        />
                      </Form.Item>

                      <Button
                        icon={<SearchOutlined />}
                        className="search-button"
                        onClick={handleGetReceiptEnquiryForPolicy}
                      />
                    </Form>
                    <h6
                      style={{
                        fontSize: "10px",
                        color: "#b21f1f",
                        padding: "10px",
                      }}
                    >
                      Data Available Only from RCD date till today
                    </h6>
                  </div>
                  <div>
                    <ReusableTable
                      columns={PAYMENT_TRANSACTIONS}
                      data={paymentTransactions}
                      rowKey={(r) => `${r.id}_${r.id ?? ""}`}
                    />
                  </div>
                </Panel>
              </Collapse>
            </>
          )}
          {showOpenTickets && (
            <>
              <Collapse
                accordion
                expandIconPosition={"end"}
                defaultActiveKey={["1"]}
                className="lats-tickets"
              >
                <img
                  src={CloseIcon}
                  alt=""
                  className="close-icons"
                  onClick={() => handleOpenTicketsCLose()}
                ></img>
                <div>
                  <ReusableTable
                    columns={LAST5_OPEN_TICKETS}
                    data={ticketsData}
                    rowKey={(r) => `${r.id}_${r.id ?? ""}`}
                  />
                </div>
                {/* </Panel> */}
              </Collapse>
            </>
          )}
          {showArchievedTickets && (
            <>
              <Collapse
                accordion
                expandIconPosition={"end"}
                defaultActiveKey={["1"]}
                className="lats-tickets"
              >
                <img
                  src={CloseIcon}
                  alt=""
                  className="close-icons"
                  onClick={() => hideArchivedTicketsHandler()}
                ></img>
                <div className="form-container">
                  <Form layout="inline">
                    <Form.Item
                      label="From Date"
                      name="fromDate"
                      rules={[{ required: true, message: "Select From Date" }]}
                    >
                      <DatePicker
                        format={dateFormat}
                        className="date-picker"
                        onChange={(date, dateString) =>
                          fromDateHandler(date, dateString)
                        }
                        // disabledDate={(current) => current && current > new Date()}
                        disabledDate={(current) =>
                          current &&
                          (current < new Date(2022, 0, 1) ||
                            current > new Date())
                        }
                      />
                    </Form.Item>

                    <Form.Item
                      label="To Date"
                      name="toDate"
                      rules={[{ required: true, message: "Select To Date" }]}
                    >
                      <DatePicker
                        format={dateFormat}
                        className="date-picker"
                        onChange={handleDateChange}
                        disabledDate={(current) =>
                          current && current > new Date()
                        }
                      />
                    </Form.Item>

                    <Button
                      icon={<SearchOutlined />}
                      className="search-button"
                      onClick={getArchievedTickets}
                    />
                  </Form>
                  <h6
                    style={{
                      fontSize: "10px",
                      color: "#b21f1f",
                      padding: "10px",
                    }}
                  >
                    Data Available Only from Jan-2022 till today
                  </h6>
                </div>

                <br />
                <div>
                  <ReusableTable
                    columns={LAST5_OPEN_ARCHIEVEDTICKETS}
                    data={archivedTickets}
                    rowKey={(r) => `${r.srvReqRefNo ?? ""}`}
                    emptyText="No transaction documents records"
                  />
                </div>
              </Collapse>
            </>
          )}

          {((!showLastPayments &&
            !showOpenTickets &&
            !showArchievedTickets &&
            !isHistoricalComm &&
            !showDispositionData &&
            CALL_TyPES?.length > 0) ||
            isShowAllTicketsData) &&
            !props?.isComplaintsUser && (
              <>
                <TypesComponent
                  isPolicyAssigned={isPolicyAssigned}
                  customerData={
                    (isTicketsPOSObj?.isPOS && isTicketsPOSObj) ||
                    (props?.isEmailManagement && props?.searchPolicyData) ||
                    state ||
                    props?.searchPolicyData
                  }
                  CALL_TyPES={CALL_TyPES}
                  masterData={masterData}
                  clientRoleLU={clientRoleLU}
                  requestModeLU={requestModeLU}
                  registerModeLU={registerModeLU}
                  uwDecisionLU={uwDecisionLU}
                  uwDecisionNewLU={uwDecisionNewLU}
                  bankAccTypeLU={bankAccTypeLU}
                  requestReceivedViaLU={requestReceivedViaLU}
                  cursorPortalLU={cursorPortalLU}
                  websitePortalLU={websitePortalLU}
                  callRelatedActionLU={callRelatedActionLU}
                  customerQueryLU={customerQueryLU}
                  isEmailManagement={props?.isEmailManagement}
                  isComplaintsUserTabs={props?.isComplaintsUserTabs}
                  EmailResponse={props?.EmailResponse}
                  panUpdateLU={panUpdateLU}
                  processNameLU={processNameLU}
                  sisLU={sisLU}
                  callCenterLU={callCenterLU}
                  callCenterSubTypeLU={callCenterSubTypeLU}
                  isVerifiedCheck={isVerifiedCheck}
                  setSubTypeId={setSubTypeId}
                  setCallTypeId={setCallTypeId}
                  setSelectedSubTypeVall={setSelectedSubTypeVall}
                  isShowAllTicketsData={isShowAllTicketsData}
                  CallTypeId={CallTypeId || props?.CallTypeId}
                  SubTypeId={SubTypeId || props?.SubTypeId}
                  isSelectedTicketsData={isSelectedTicketsData}
                  setPosData={setPosData}
                  interlRequirementTagValue={interlRequirementTagValue}
                  annuityPlans={annuityPlans}
                  causeOfEventLU={causeOfEventLU}
                  natureOfDeathLU={natureOfDeathLU}
                  policyTypeLU={policyTypeLU}
                  claimCategoryLU={claimCategoryLU}
                  claimIntimationLU={claimIntimationLU}
                  sourceInformationLU={sourceInformationLU}
                  assuredIncomePlanLU={assuredIncomePlanLU}
                  laNomineeAddressLU={laNomineeAddressLU}
                  subStageLU={subStageLU}
                  assessorsDecisionLU={assessorsDecisionLU}
                  policyStatusDOBLU={policyStatusDOBLU}
                  approverDecisionLU={approverDecisionLU}
                  dataBseCHeckLU={dataBseCHeckLU}
                  hotSpotCheckLU={hotSpotCheckLU}
                  referCaseToLU={referCaseToLU}
                  reinstatementDecisionLU={reinstatementDecisionLU}
                  withDGHLU={withDGHLU}
                  investigatorLU={investigatorLU}
                  decisionDescriptionLU={decisionDescriptionLU}
                  mandStatusLU={mandStatusLU}
                  martialStatusLU={martialStatusLU}
                  salutationLU={salutationLU}
                  paymentReasonCodeLU={paymentReasonCodeLU}
                  organCategoryCodeLU={organCategoryCodeLU}
                  healthClaimCodeLU={healthClaimCodeLU}
                  coverageNameofProductLU={coverageNameofProductLU}
                  claimPaymentMethodLU={claimPaymentMethodLU}
                ></TypesComponent>
              </>
            )}

          {isHistoricalComm && (
            <aside className="float-left">
              <HistoricalCommunication
                historicalCommData={historicalCommData}
                setIsHistoricalComm={setIsHistoricalComm}
                setIsCommunicationContent={setIsCommunicationContent}
                communicationContentHandler={communicationContentHandler}
              />
            </aside>
          )}

          {!props?.isEmailManagement && (
            <div className="widgets-start">
                    {/* <Widgets
                              store={store}
                              selectedCallTypeId={CallTypeId}
                              selectedSubTypeId={SubTypeId}
                              SelectedPolicy={state?.policyNo || props?.policyDetails?.sentDetailsObj?.policyNo}
                              searchPolicyData={props?.searchPolicyData}
                              notificationOpen={true}
                            /> */}
              <SidebarWidgets
                        onAssistance={Assistancee}
                        onLastPayments={handleLastPayments}
                        onPayouts={getPayoutDetailsEnquiry}
                        onOpenTickets={handleOpenTickets}
                        onArchivedTickets={showArchivedTicketsHandler}
                        onDms={dms}
                        onTransactionDocs={() =>
                          [1, 4, 5, 11, 12, 22, 23, 31, 32, 33, 34].includes(loggedUser?.role)
                            ? setShowUplodedDocs(true)
                            : {}
                        }
                        onProfile={() => setAllDetailsOpen(true)}
                        onRupeeClick={() =>
                          [1, 4, 5, 11, 12, 14, 22, 31, 32, 33, 34].includes(loggedUser?.role)
                            ? handleClickRupeeIcon(true)
                            : {}
                        }
                        onHistorical={showHistoricalCommHandler}
                        customerProfile={customerProfile}
                        loggedUser={loggedUser}
                        ondmsnew={dmsnew}
                        onPolicyEnquiry={handlePolicyEnquiryClick}
                      /> 
            
            </div>
          )}

          {showDispositionData && (
            <>
              <Collapse
                accordion
                expandIconPosition={"end"}
                defaultActiveKey={["1"]}
                className="lats-tickets"
              >
                <img
                  src={CloseIcon}
                  alt=""
                  className="close-icons"
                  onClick={() => closeDispositionData()}
                ></img>
                {/* <Panel
                    header="All Tickets Details"
                    key={1}
                    className="table-top"
                  > */}

                <div className="form-container">
                  <Form layout="inline">
                    <Form.Item
                      label="From Date"
                      name="fromDate"
                      rules={[{ required: true, message: "Select From Date" }]}
                    >
                      <DatePicker
                        format={dateFormat}
                        className="date-picker"
                        onChange={(date, dateString) =>
                          fromDateHandler1(date, dateString)
                        }
                        // disabledDate={(current) => current && current > new Date()}
                        disabledDate={(current) =>
                          current &&
                          (current.isBefore(policyIssuanceDate, "day") ||
                            current.isAfter(dayjs(), "day"))
                        }
                      />
                    </Form.Item>

                    <Form.Item
                      label="To Date"
                      name="toDate"
                      rules={[{ required: true, message: "Select To Date" }]}
                    >
                      <DatePicker
                        format={dateFormat}
                        className="date-picker"
                        onChange={handleDateChange}
                        disabledDate={(current) =>
                          current && current > new Date()
                        }
                      />
                    </Form.Item>

                    <Button
                      icon={<SearchOutlined />}
                      className="search-button"
                      onClick={getDispositionData}
                    />
                  </Form>
                  <h6
                    style={{
                      fontSize: "10px",
                      color: "#b21f1f",
                      padding: "10px",
                    }}
                  >
                    Data Available Only from{" "}
                    {policyIssuanceDate.format("YYYY-MM-DD")} till today
                  </h6>
                </div>

                <br />
                <div>
                  <ReusableTable
                    columns={DISPOSITION_DATA}
                    data={dispositionData}
                    rowKey={(r) => `${r.policyNo} ?? ""}`}
                  />
                </div>
                {/* </Panel> */}
              </Collapse>
            </>
          )}
        </div>
      </div>

      <Drawer
        title="Profile"
        placement={"right"}
        width={500}
        onClose={onClose}
        open={allDetailsOpen}
        maskClosable={false}
        closeIcon={
          <Tooltip title="Close">
            <img src={CloseIcon} alt="" />
          </Tooltip>
        }
      >
        <div>
          <Spin spinning={isProfileLoading}>
            <table className="table table-bodered Profile">
              <tbody>
                <tr>
                  <td>PO DOB</td>
                  <td>
                    {customerProfile?.ladob}
                    <span className="profile-alert">
                      {customerProfile?.ladobAlert ?? ""}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>Loan (If active)</td>
                  <td>
                    {customerProfile?.loan}
                    <span className="profile-alert">
                      {customerProfile.loanAlert ?? ""}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="text-center">
                    {" "}
                    <b> Customer Profile</b>
                  </td>
                </tr>
                {/* <tr>
                <td>CKYC Status</td>
                <td>{customerProfile.ckycStatus}
                <span className="profile-alert">{customerProfile.ckycStatusAlert ?? ""}</span>
                </td>
              </tr> */}
                {/* <tr>
                <td>PAN</td>
                <td>{customerProfile.pan}
                <span className="profile-alert">{customerProfile.panAlert ?? ""}</span></td>
              </tr> */}
                <tr>
                  <td>PAN Aadhar Seeding Status</td>
                  <td>
                    {/*{customerProfile.aadharSeedingStatusDate}*/}
                    <span className="profile-alert">
                      {customerProfile.aadharSeedingStatusDate === "No" ? (
                        <>
                          <span className="profile-alert">
                            {customerProfile.aadharSeedingStatusDateAlert}
                          </span>
                          <a
                            href="https://eportal.incometax.gov.in/iec/foservices/#/pre-login/bl-link-aadhaar"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Click to get it linked
                          </a>
                        </>
                      ) : (
                        <div className="profile-success">
                          PAN-Aadhar is Linked
                        </div>
                      )}
                    </span>
                  </td>
                </tr>
                {/* <tr>
               <td>Click to get it linked</td>
               <td>
               <span className="profile-alert">
               <a href="https://eportal.incometax.gov.in/iec/foservices/#/pre-login/bl-link-aadhaar" target="_blank" rel="noopener noreferrer">
              https://eportal.incometax.gov.in/iec/foservices/#/pre-login/bl-link-aadhaar </a>
               </span>
               </td>
              </tr> */}
                <tr>
                  <td>Life Assured Mobile</td>
                  <td>
                    {loggedUser?.role === 37
                      ? maskMobileNumber(customerProfile.contactDetailsMobile)
                      : customerProfile.contactDetailsMobile}
                    <span className="profile-alert">
                      {customerProfile.contactDetailsMobileAlert ?? ""}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Life Assured Email</td>
                  <td>
                    {customerProfile.contactDetailsEmail}
                    <span className="profile-alert">
                      {customerProfile.contactDetailsEmailAlert ?? ""}
                    </span>
                  </td>
                </tr>
                {customerProfile?.contactDetailsMobile?.trim() !=
                  customerProfile?.proposerMobileContactability?.trim() && (
                  <>
                    <tr>
                      <td>Proposer Mobile</td>
                      <td>
                        {loggedUser?.role === 37
                          ? maskMobileNumber(
                              customerProfile.proposerMobileContactability
                            )
                          : customerProfile.proposerMobileContactability}
                      </td>
                    </tr>
                  </>
                )}
                {customerProfile?.contactDetailsEmail?.trim().toLowerCase() !=
                  customerProfile?.proposerEmailContactability
                    ?.trim()
                    .toLowerCase() && (
                  <>
                    <tr>
                      <td>Proposer Email</td>
                      <td>{customerProfile.proposerEmailContactability}</td>
                    </tr>
                  </>
                )}

                <tr>
                  <td>CKYC</td>
                  <td>
                    {customerProfile.contactDetailsCKYC}
                    <span className="profile-alert">
                      {customerProfile.contactDetailsCKYCAlert ?? ""}
                    </span>
                    <div className="ckyc-api-value"> {ckycValue}</div>
                  </td>
                </tr>

                <tr>
                  <td>Updated Bank Account</td>
                  <td>
                    {customerProfile?.updateBankAccount}
                    <span className="profile-alert">
                      {customerProfile?.updateBankAccountAlert ?? ""}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Auto Pay Updated</td>
                  <td>
                    {customerProfile?.updateAutoPay}
                    <span className="profile-alert">
                      {customerProfile?.updateAutoPayAlert ?? ""}
                    </span>
                  </td>
                </tr>
                {/*changes done by Moxa on 27-05-2025 for CP_mobile Flag*/}
                <tr>
                  <td> Mobile APP/Portal</td>
                  <td>
                    Mobile
                    {customerProfile?.registeredonMobileApp?.toLowerCase() ===
                    "yes" ? (
                      <span className="icon-check">&#10004;</span>
                    ) : (
                      <span className="icon-cross">&#10008;</span>
                    )}
                    &nbsp;&nbsp;&nbsp;Portal
                    {customerProfile?.registeredonPortal?.toLowerCase() ===
                    "yes" ? (
                      <span className="icon-check">&#10004;</span>
                    ) : (
                      <span className="icon-cross">&#10008;</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Preferred Language</td>
                  <td>
                    <select
                      value={
                        languageMode == ""
                          ? customerProfile.languageMode
                          : languageMode
                      }
                      onChange={handleLanguageChange}
                      style={{ width: "200px", height: "38px" }}
                    >
                      <option value="">Select an option</option>
                      <option value="bengali">Bengali</option>
                      <option value="english">English</option>
                      <option value="gujarati">Gujarati</option>
                      <option value="hindi">Hindi</option>
                      <option value="kannada">Kannada</option>
                      <option value="malayalam">Malayalam</option>
                      <option value="marathi">Marathi</option>
                      <option value="tamil">Tamil</option>
                      <option value="telugu">Telugu</option>
                    </select>
                  </td>
                  <td>
                    {/* <button type="submit" className='profilesave'>Save</button> */}

                    <Button
                      type="submit"
                      className="save-Button-Color"
                      // onClick={() => languageMode == "" ? "" :saveDropdownProfileValues("Language")}
                      onClick={() => {
                        if (languageMode !== "") {
                          saveDropdownProfileValues("Language");
                        }
                      }}
                      htmlType="submit"
                    >
                      Save
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>Preferred Mode of Communication</td>

                  <td className="ant-select-selector">
                    <select
                      value={
                        communicationMode == ""
                          ? customerProfile.communicationMode
                          : communicationMode
                      }
                      onChange={handleCommunicationChange}
                      style={{ width: "200px", height: "38px" }}
                    >
                      <option value="">Select an option</option>
                      <option value="email">Email</option>
                      <option value="telephone">Telephone</option>
                      <option value="letter">Letter</option>
                      <option value="sms">SMS</option>
                    </select>
                  </td>
                  <td>
                    {/* <button onClick={saveProfile} type="submit" className='profilesave'>Save</button> */}
                    <Button
                      type="submit"
                      className="save-Button-Color"
                      onClick={() => {
                        if (communicationMode !== "") {
                          saveDropdownProfileValues("Communication");
                        }
                      }}
                      htmlType="submit"
                    >
                      Save
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>Customer Sentiment</td>
                  <td className="ant-select-selector">
                    <select
                      value={
                        customerSentiment == ""
                          ? customerProfile.customerSentiment
                          : customerSentiment
                      }
                      onChange={handleSentimentChange}
                      style={{ width: "200px", height: "38px" }}
                    >
                      <option value="select">Select an option</option>
                      <option value="positive">Positive</option>
                      <option value="negative">Negative</option>
                      <option value="neutral">Neutral</option>
                    </select>
                  </td>
                  <td>
                    {/* <button type="submit" className='profilesave'>Save</button> */}
                    <Button
                      type="submit"
                      className="save-Button-Color"
                      onClick={() => {
                        if (customerSentiment !== "") {
                          saveDropdownProfileValues("Customer");
                        }
                      }}
                      htmlType="submit"
                    >
                      Save
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </Spin>
        </div>
      </Drawer>
      <Drawer
        title="FAQ"
        placement={"right"}
        width={500}
        onClose={onClose}
        open={faqOpen}
        maskClosable={false}
        closeIcon={
          <Tooltip title="Close">
            <img src={CloseIcon} alt="" />
          </Tooltip>
        }
      >
        <div>
          <h1>Payment Link</h1>
          <p>
            <ul>
              <li>
                Now you can choose to send customers payment link over
                registered email/SMS/whatsapp.
              </li>
              <li>
                SR will be raised and Auto closed. No further action is required
                from your side for this SR.
              </li>
            </ul>
          </p>
        </div>
      </Drawer>

      {EmailViewData !== null && (
        <Modal
          title={
            <span className="header-info">
              {
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "2rem",
                  }}
                >
                  <span>{EmailViewData?.emailClassify?.[0].urn}</span>
                  <span>To: {EmailViewData?.emailClassify?.[0].from}</span>
                  <span>
                    From: {EmailViewData?.emailClassify?.[0].toRecipients}
                  </span>
                  <span>
                    <i className="bi bi-alarm"></i>:{" "}
                    {convertDate(
                      EmailViewData?.emailClassify?.[0].receivedDateTime
                    )}
                  </span>
                </div>
              }
            </span>
          }
          open={true}
          destroyOnClose={true}
          width={1200}
          closeIcon={
            <Tooltip title="Close">
              <span onClick={() => setEmailViewData(null)}>
                <img src={CloseIcon} alt=""></img>
              </span>
            </Tooltip>
          }
          footer={null}
        >
          <div>
            <div className="text-start">
              <strong>Subject: </strong>

              {EmailViewData?.emailClassify?.[0]?.subject}
              <br />
              <br />
              <div
                dangerouslySetInnerHTML={{
                  __html: EmailViewData?.emailClassify?.[0]?.body,
                }}
              />
            </div>
          </div>
        </Modal>
      )}

      <Modal
        title="Assistance"
        open={assistanceOpen}
        destroyOnClose={true}
        width={1200}
        closeIcon={false}
        footer={null}
      >
        <div>
          <div className="reuirement">
            <table className="table responsive-table assistanceTable">
              <tbody>
                {assistance?.length > 0 && (
                  <ul>
                    {assistance.map((item, ind) => (
                      <li key={ind} className="leftalignment">
                        {item.assistanceDesc}
                      </li>
                    ))}
                  </ul>
                )}
                {assistance?.length === 0 && (
                  <tr>
                    <td>
                      <div className="text-center">
                        <span>No Data Available</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="contact-details-btn">
            <Button
              type="primary"
              className="primary-btn"
              onClick={() => setAssistanceOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        className="po-modal"
        title="Policy Details"
        open={policyDetailsModal}
        destroyOnClose={true}
        width={800}
        height={500}
        keyboard={true}
        onCancel={(e) => {
          if (e.key === "Escape") {
            setPolicyDetailsModal(false);
          }
        }}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setPolicyDetailsModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
        maskClosable={false}
      >
        <Form
          name="wrap"
          labelCol={{
            flex: "35%",
          }}
          labelAlign="left"
          labelWrap
          wrapperCol={{
            flex: 1,
          }}
          colon={false}
          form={form}
          // onFinish={searchData}
          autoComplete="off"
        >
          <Row gutter={[12, 12]} className="mb-10">
            <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                name="applicationSignedDateNo"
                label="Application Signed Date"
              >
                <Input
                  className="cust-input"
                  //readOnly
                  disabled={true}
                />
              </Form.Item>
            </Col>

            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item name="maturityDate" label="Maturity Date">
                <Input
                  className="cust-input"
                  //readOnly
                  disabled={true}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[12, 12]}>
            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <div className="left-half">
                <table
                  border
                  className="table responsive-table assistanceTable"
                >
                  <thead>
                    <tr>
                      <th>Rider Name</th>
                      {/* <th>RCD</th> */}
                      <th>Term</th>
                      <th>Sum Assured</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isRiderData?.slice(1)?.length > 0 ? ( // Exclude the 0th element using slice
                      isRiderData.slice(1).map((rider, index) => (
                        <tr key={index}>
                          <td>
                            {RIDERCODEMAPPING[rider?.riderCode] ||
                              rider?.riderCode ||
                              "-"}
                          </td>{" "}
                          {/* Use mapping or fallback */}
                          <td>{rider?.pt || "-"}</td>
                          <td>
                            {(rider?.sumAssured && (
                              <NumericFormat
                                value={rider?.sumAssured}
                                decimalSeparator="."
                                displayType={"text"}
                                thousandSeparator={true}
                                decimalScale={2}
                              />
                            )) ||
                              "-"}
                          </td>
                          <td>{rider?.policyStatus || "-"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          <span>No Data Available</span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Modal
        className="po-modal"
        // title="Policy Details"
        open={cautionModal}
        destroyOnClose={true}
        width={800}
        height={500}
        keyboard={true}
        onCancel={(e) => {
          if (e.key === "Escape") {
            setCautionModal(false);
          }
        }}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setCautionModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
        maskClosable={false}
      >
        <Form
          name="wrap"
          labelCol={{
            flex: "35%",
          }}
          labelAlign="left"
          labelWrap
          wrapperCol={{
            flex: 1,
          }}
          colon={false}
          form={form}
          // onFinish={searchData}
          autoComplete="off"
        >
          <Row gutter={[12, 12]} className="mb-10 mt-10">
            <Col
              className="comment-box-col"
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xxl={24}
            >
              <TextArea
                rows={6}
                value={cautionComment}
                placeholder="Add Comments"
                maxLength={4000} // Set maximum length here
                onChange={(e) => setCautionComment(e.currentTarget.value)}
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
          <div className="d-flex">
            <Button
              type="primary"
              className="primary-btn save-btn"
              size="small"
              onClick={cuationCommentsHandler}
            >
              Save Comments
            </Button>

            <Button
              type="primary"
              className="primary-btn remove-btn upload-button"
              size="small"
              onClick={removeCautionHandler}
            >
              Remove Policy
            </Button>
          </div>

          <Row gutter={[12, 12]}>
            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <div className="left-half">
                <table
                  border
                  className="table responsive-table assistanceTable"
                >
                  <thead>
                    <tr>
                      <th>Policy No</th>
                      <th>Created By</th>
                      <th>Created On</th>
                      <th>Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cautionData?.length > 0 ? (
                      cautionData.map((item, ind) => (
                        <tr key={ind}>
                          <td>{item.policyNo}</td>
                          {/* <td>{item.rcd}</td> */}
                          <td>{item.createdBy}</td>
                          <td>{formatDateSafe(item.createdOn)}</td>
                          <td>{item.comments}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          <span>No Data Available</span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Modal
        className="po-modal"
        title="    "
        open={RupeeDetailsModal}
        destroyOnClose={true}
        width={1200}
        height={500}
        keyboard={true}
        onCancel={(e) => {
          if (e.key === "Escape") {
            setRupeeDetailsModal(false);
          }
        }}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setRupeeDetailsModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
        maskClosable={false}
      >
        <Spin spinning={isRenwalPaymentLoading}>
          <Form>
            <div className="left-half">
              <table
                border="1"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                <thead style={{ backgroundColor: "#b3201f", color: "black" }}>
                  <tr>
                    <th
                      colSpan="4"
                      style={{ color: "white", textAlign: "left" }}
                    >
                      Upcoming Renewal Payments
                    </th>
                  </tr>
                  <tr>
                    <th>Policy No</th>
                    <th>Product Name</th>
                    <th>Amount</th>
                    <th>Next Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {premiumEnquiryResponse?.length > 0 ? (
                    premiumEnquiryResponse.map((item, ind) => (
                      <tr key={ind}>
                        <td>{item?.chdrsel}</td>
                        <td>{item?.ctypedes}</td>
                        <td>{item?.hpayamT01}</td>
                        <td>
                          {item?.ptdate ? convertDate(item?.ptdate) : null}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        <span>No Data Available</span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <br /> <br />
            <div className="left-half">
              <table
                border="1"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                <thead style={{ backgroundColor: "#b3201f", color: "black" }}>
                  <tr>
                    <th
                      colSpan="4"
                      style={{ color: "white", textAlign: "left" }}
                    >
                      Upcoming Payouts
                    </th>
                  </tr>
                  <tr>
                    <th>Policy No</th>
                    <th>Product Name</th>
                    <th>Amount</th>
                    <th>Next Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingEvents?.length > 0 ? (
                    upcomingEvents.map((item, ind) => (
                      <tr key={ind}>
                        <td>{item?.policy_No}</td>
                        <td>{item?.productName}</td>
                        <td>{item?.amount}</td>
                        <td>{convertDate(item?.eventDate)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        <span>No Data Available</span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Form>
        </Spin>
      </Modal>

      <Modal
        open={Verifiedpopup}
        destroyOnClose={true}
        width={600}
        closeIcon={false}
        footer={null}
      >
        <div>
          <div className="reuirement">
            <table className="table responsive-table assistanceTable">
              <tbody>
                <tr>
                  <td>DOB</td>
                  <td>
                    {" "}
                    <b>
                      {convertDate(props?.policyDetails?.sentDetailsObj?.dob) ||
                        "-"}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td>Address </td>
                  <td>
                    <b> {Address}</b>
                  </td>
                </tr>
                <tr>
                  <td>Premium Amount</td>
                  <td>
                    {" "}
                    <b>
                      {(data?.premiumDetails?.modelPremiumAmount && (
                        <NumericFormat
                          value={data?.premiumDetails?.modelPremiumAmount}
                          decimalSeparator="."
                          displayType={"text"}
                          thousandSeparator={true}
                          decimalScale={0}
                        />
                      )) ||
                        "-"}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td>Sum Assured</td>
                  <td>
                    {" "}
                    <b>
                      {(data?.saDetails?.sumAssured && (
                        <NumericFormat
                          value={data?.saDetails?.sumAssured}
                          decimalSeparator="."
                          displayType={"text"}
                          thousandSeparator={true}
                          decimalScale={0}
                        />
                      )) ||
                        "-"}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td>Nominee Name and Relationship</td>
                  <td>
                    {" "}
                    <b>
                      {" "}
                      {ClientName ? ClientName : ""} {ClientName ? "&" : ""}{" "}
                      {Relation ? RELATIONSHIPLIST[Relation] : ""}
                    </b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="contact-details-btn">
            <Button
              type="primary"
              className="primary-btn"
              onClick={() => setVerifiedPopup(false)}
            >
              OK
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={ShowUplodedDocs}
        destroyOnClose={true}
        width={1200}
        closeIcon={false}
        footer={null}
      >
        <ReusableTable
          columns={TransactionDocumentcolumns}
          data={PosData?.dmsLink || transactionDocData?.dmsLink || []}
          // data={PosData?.dmsLink}
          rowKey={(r) => `${r.id}_${r.id ?? ""}`}
          emptyText="No transaction documents records"
        />
        <div className="contact-details-btn">
          <Button
            type="primary"
            className="primary-btn"
            onClick={() => setShowUplodedDocs(false)}
          >
            OK
          </Button>
        </div>
      </Modal>

      <Modal
        title="Payout"
        open={isPayoutModal}
        destroyOnClose={true}
        width={1200}
        closeIcon={
          <Tooltip title="Close">
            <img
              src={CloseIcon}
              alt=""
              onClick={() => setIsPayoutModal(false)}
            />
          </Tooltip>
        }
        footer={null}
      >
        <ReusableTable
          columns={Payoutcolumns}
          data={payoutModalData}
          loading={isPayoutModalLoading}
          rowKey={(r) => `${r.CHDRNUM}_${r.CHEQNO ?? ""}`}
          emptyText="No payout records"
        />
      </Modal>

      <Modal
        title="Account Details"
        open={isAccoundetail}
        destroyOnClose={true}
        width={600}
        height={1600}
        closeIcon={
          <Tooltip title="Close">
            <img
              src={CloseIcon}
              alt=""
              onClick={() => setIsAccoundetail(false)}
            />
          </Tooltip>
        }
        footer={null}
      >
        <div className="reuirement">
          <table className="table responsive-table assistanceTable">
            <thead>
              <tr>
                <th>Bank Name</th>
                <td>{accountDetailsData?.BANKNAME}</td>
              </tr>
              <tr>
                <th>Branch Name</th>
                <td>{accountDetailsData?.BRANCHNAME}</td>
              </tr>
              <tr>
                <th>Bank Account No</th>
                <td>{accountDetailsData?.BANKACCOUNTNO}</td>
              </tr>
              <tr>
                <th>Bank IFSC</th>
                <td>{accountDetailsData?.BANKIFSCNO}</td>
              </tr>
              <tr>
                <th>Account Type</th>
                <td>{accountDetailsData?.BANKACCTYPE}</td>
              </tr>
            </thead>
          </table>
        </div>
      </Modal>

      <Modal
        open={isCommunicationContent}
        width={700}
        footer={null}
        className="view-consent"
        closeIcon={
          <Tooltip title="Close">
            <img
              src={CloseIcon}
              alt=""
              onClick={() => setIsCommunicationContent(false)}
            />
          </Tooltip>
        }
      >
        <div className="message-box mt-16">
          <div className="line">
            {`${commContent?.commuType} Sent on ${commContent?.sentOn || "NA"}`}
          </div>
          <div className="line">{commContent?.eMailSubject || "NA"}</div>
        </div>
      </Modal>

      {isOpenTicket && (
        <TicketsOpenPopup
          isOpenTicket={isOpenTicket}
          setIsOpenTicket={setIsOpenTicket}
          serviceId={serviceId}
          handleClose={handleClose}
          details={details}
          handleTicketSubmit={handleTicketSubmit}
          ticketsData={isTicketsData}
          isLoading={isLoading}
          getLastOpenTicketsData={getLastOpenTicketsData}
          isTicketDetails={isTicketDetails}
          isEmailManagement={false}
          headerAPiresponse={props?.policyDetails}
        />
      )}
    </>
  );
};

const mapStateToProps = ({ policyDetails, profileReducer }) => {
  return { policyDetails, profileReducer };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updatePolicyDetails: (info) => {
      dispatch(policyDetailsObj(info));
    },
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetails);
