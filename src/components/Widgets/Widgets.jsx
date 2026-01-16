import React, { useState, useEffect, useCallback } from "react";
import {
  Collapse,
  Spin,
  Tooltip,
  Drawer,
  Form,
  message,
  Modal,
  Button,
  DatePicker,
} from "antd";
import apiCalls from "../../api/apiCalls";
import { NumericFormat } from "react-number-format";
import { useLocation } from "react-router-dom";
import CloseIcon from "../../assets/images/close-icon.png";
import { useSelector } from "react-redux";
import TicketsOpenPopup from "../TicketsOpenPopup";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import HistoricalCommunication from ".././HistoricalCommunication";
import { ErrorHandler } from "../../utils/errorHandler";
import ReusableTable from "../Common/ReusableTable";
import SidebarWidgets from "../Common/SidebarWidgets";
import { formatAmountSafe, formatDateSafe } from "../../utils/HelperUtilites";
import { encryptionService } from "../../api/encryptionService";

const Widgets = (props) => {
  const { Panel } = Collapse;
  const loggedUser = useSelector((state) => state?.userProfileInfo?.profileObj);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const { state } = useLocation();
  const [allDetailsOpen, setAllDetailsOpen] = useState(false);
  const [showLastPayments, setShowLastPayments] = useState(false);
  const [showOpenTickets, setShowOpenTickets] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const [ticketsData, setTicketsData] = useState([]);
  const [ticketsLoader, setTicketsLoader] = useState(false);
  const [details, setDetails] = useState([]);
  const [assistance, setAssistance] = useState([]);
  const [assistanceOpen, setAssistanceOpen] = useState(false);
  const [showArchievedTickets, setShowArchievedTickets] = useState(false);
  const [premiumEnquiryResponse, setPremiumEnquiryResponse] = useState([]);
  const [RupeeDetailsModal, setRupeeDetailsModal] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [isHistoricalComm, setIsHistoricalComm] = useState(false);
  const [historicalCommData, setHistoricalCommData] = useState([]);
  const [paymentTransactions, setPaymentTransactions] = useState([]);
  const [paymentTransactionsData, setPaymentTransactionsData] = useState([]);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [customerProfile, setCustomerProfile] = useState({});
  const [languageMode, setLanguageMode] = useState("");
  const [CallTypeId, setCallTypeId] = useState("");
  const [SubTypeId, setSubTypeId] = useState("");
  const [isCommunicationContent, setIsCommunicationContent] = useState(false);
  const [isShowAllTicketsData, setIsShowAllTicketsData] = useState(false);
  const [isSelectedTicketsData, setIsSelectedTicketsData] = useState({});
  const [isTicketsPOSObj, setIsTicketsPOSObj] = useState({});
  const [isOpenTicket, setIsOpenTicket] = useState(false);
  const [serviceId, setServiceId] = useState("");
  const [isTicketsData, setIsTicketsData] = useState([]);
  const [Verifiedpopup, setVerifiedPopup] = useState(false);
  const [ShowUplodedDocs, setShowUplodedDocs] = useState(false);
  const [customerSentiment, setCustomerSentiment] = useState("");
  const [communicationMode, setCommunicationMode] = useState("");
  const [Address, setAddress] = useState("");
  const [PosData, setPosData] = useState("");
  const [ClientName, setClientName] = useState("");
  const [isPayoutModal, setIsPayoutModal] = useState(false);
  const [payoutModalData, setpayoutModalData] = useState([]);
  const [isPayoutModalLoading, setIsPayoutModalLoading] = useState(false);
  const [archivedTickets, setArchivedTickets] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const dateFormat = "DD/MM/YYYY";
  const [toDate, setToDate] = useState(null);
  const [commContent, setCommContent] = useState({});
  const [isTicketDetails, setIsTicketsDetails] = useState([]);
  const [EmailViewData, setEmailViewData] = useState(null);


  // ---------- columns for ReusableTable ----------
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
        (ele.ZNEFTNO && ele.ZNEFTNO.trim()) ||
        (ele.CHEQNO && ele.CHEQNO.trim())
          ? ele.ZNEFTNO && ele.ZNEFTNO.trim()
            ? ele.ZNEFTNO
            : `CHQ-${ele.CHEQNO}`
          : null,
    },
  ];

  const PAYMENT_COLUMNS = [
    { title: "Payment Date", dataIndex: "trandate", key: "trandate", render: (v) => formatDateSafe(v) },
    { title: "Transaction Number", dataIndex: "transactionNumber", key: "transactionNumber" },
    { title: "Receipt Number", dataIndex: "rdocnum", key: "rdocnum" },
    { title: "Payment Mode", dataIndex: "paytype", key: "paytype" },
    { title: "Payment Amount", dataIndex: "origamt", key: "origamt", render: (v) => formatAmountSafe(v) },
    { title: "Status", dataIndex: "zchqsts", key: "zchqsts" },
    { title: "Cancel Reason", dataIndex: "cancelReason", key: "cancelReason" },
    { title: "Created By", dataIndex: "createdBy", key: "createdBy" },
  ];

  const OPEN_TICKETS_COLUMNS = [
    { title: "Created On", dataIndex: "date", key: "date", render: (v) => formatDateSafe(v) },
    {
      title: "Ticket No",
      dataIndex: "serviceNo",
      key: "serviceNo",
      render: (val, record) => (
        <a onClick={() => handleTickectNoLink(record)} style={{ cursor: "pointer" }}>
          {val}
        </a>
      ),
    },
    { title: "Email", dataIndex: "urn", key: "urn" },
    { title: "Call Type", dataIndex: "callTypeName", key: "callTypeName" },
    { title: "Sub Type", dataIndex: "subTypeName", key: "subTypeName" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Q/R/C", dataIndex: "category", key: "category" },
    { title: "Closure Date", dataIndex: "closedDate", key: "closedDate", render: (v) => v || "-" },
    { title: "Request Mode", dataIndex: "reqmode", key: "reqmode" },
    { title: "Ageing", dataIndex: "currentTAT", key: "currentTAT" },
    { title: "TAT", dataIndex: "tat", key: "tat" },
  ];

  const ARCHIVED_TICKETS_COLUMNS = [
    { title: "Ticket No", dataIndex: "srvReqRefNo", key: "srvReqRefNo" },
    { title: "Call Type", dataIndex: "subType1", key: "subType1" },
    { title: "Sub Type", dataIndex: "subType2", key: "subType2" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Q/R/C", dataIndex: "qrc", key: "qrc" },
    { title: "Request Mode", dataIndex: "reqmode", key: "reqmode" },
    { title: "Created On", dataIndex: "reqDate", key: "reqDate", render: (v) => formatDateSafe(v) },
    { title: "Created By", dataIndex: "createBy", key: "createBy" },
  ];

  // ---------- lifecycle ----------
  useEffect(() => {
    handleAllDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.notificationOpen]);

  const getAssistanceDetails = useCallback(async () => {
    if (!props?.selectedCallTypeId || !props?.selectedSubTypeId) return;
    setIsLoading(true);
    try {
      const val = await apiCalls.getAssistanceDetails(
        props?.selectedCallTypeId,
        props?.selectedSubTypeId,
        loggedUser?.role
      );
      setAssistance(val.data || []);
      setAssistanceOpen(true);
    } catch (err) {
      const errMsg =
        err?.response?.data?.responseBody?.errormessage ||
        err?.message ||
        "Something went wrong please try again!";
      message.destroy();
      message.error({ content: errMsg, className: "custom-msg", duration: 2 });
    } finally {
      setIsLoading(false);
    }
  }, [loggedUser, props?.selectedCallTypeId, props?.selectedSubTypeId]);

  const Assistancee = () => {
    getAssistanceDetails();
  };

  const getPayoutDetailsEnquiry = async () => {
    let modalData = [];
    setIsPayoutModal(true);
    setIsPayoutModalLoading(true);
    try {
      const response = await apiCalls.getPayoutDetailsEnquiry(
        state?.policyNo ||
          props?.store?.policyDetails?.policyDetailsObj?.identifiers?.policyNo
      );
      if (response?.data?.responseBody?.errorcode == "0") {
        modalData.push(response?.data?.responseBody);
        setpayoutModalData(modalData);
      } else {
        const errMsg =
          response?.data?.responseBody?.errormessage ||
          "Something went wrong please try again!";
        message.destroy();
        message.error({ content: errMsg, className: "custom-msg", duration: 2 });
      }
    } catch (err) {
      const errMsg =
        err?.response?.data?.responseBody?.errormessage ||
        err?.message ||
        "Something went wrong please try again!";
      message.destroy();
      message.error({ content: errMsg, className: "custom-msg", duration: 2 });
    } finally {
      setIsPayoutModalLoading(false);
    }
  };

  const handleAllDetails = async () => {
    try {
      setIsProfileLoading(true);
      const policyNo = props?.SelectedPolicy || state?.policyNo;
      const poClientID = props?.searchPolicyData?.[0]?.poClientID;
      const userName = loggedUser?.userName;
      const response = await apiCalls.getUserProfile(policyNo, poClientID, userName);
      if (response?.data) {
        setCustomerProfile(response?.data);
      } else {
        ErrorHandler(response);
      }
    } catch (error) {
      ErrorHandler(error);
    } finally {
      setIsProfileLoading(false);
    }
  };

  const dms = async() => {
      const gConfig= await apiCalls.getGenericConfig();
          if(gConfig?.data?.dmsApiUrl){
    const url =
      gConfig?.data?.dmsApiUrl+
      `/omnidocs/WebApiRequestRedirection?Application=BPMPOLENQ&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${props?.store?.policyDetails?.policyDetailsObj?.identifiers?.applicationNo}`;
    window.open(url, "_blank");
  }
  };

  const handleLastPayments = async () => {
    setIsLoading(true);
    await handleGetReceiptEnquiryForPolicy();
    setShowOpenTickets(false);
    setShowLastPayments(true);
    setIsHistoricalComm(false);
    if (typeof props?.setShowComplainUser === "function") {
      props?.setShowComplainUser(false);
    } else {
      console.error("setShowComplainUser is not a function");
    }
  };

  const handleLanguageChange = (event) => {
    setLanguageMode(event.target.value);
  };

  const handleSentimentChange = (event) => {
    setCustomerSentiment(event.target.value);
  };

  const handleCommunicationChange = (event) => {
    setCommunicationMode(event.target.value);
  };

  const saveDropdownProfileValues = async (onchangeValue) => {
    setIsProfileLoading(true);
    try {
      let payload = {};
      if (onchangeValue === "Language") {
        payload.TagValue = languageMode;
        payload.TagName = "Language";
      } else if (onchangeValue === "Communication") {
        payload.TagValue = communicationMode;
        payload.TagName = "CommunicationMode";
      } else if (onchangeValue === "Customer") {
        payload.TagValue = customerSentiment;
        payload.TagName = "CustomerSentiment";
      }
      payload.CreatedBy = "";
      payload.ClientID = state?.poClientID;

      await apiCalls.getUserProfilePreferences(
        payload.CreatedBy,
        payload.ClientID,
        payload.TagName,
        payload.TagValue
      );
      setAllDetailsOpen(true);
    } catch (err) {
      const errMsg =
        err?.response?.data?.responseBody?.errormessage ||
        err?.message ||
        "Something went wrong please try again!";
      message.destroy();
      message.error({ content: errMsg, className: "custom-msg", duration: 2 });
    } finally {
      setIsProfileLoading(false);
    }
  };

  const handleGetReceiptEnquiryForPolicy = async () => {
    const payload = state?.policyNo;
    const ptd = data?.premiumDetails?.ptd;
    let toDate = dayjs(ptd).format("YYYY-MM-DD");
    let fromDate = dayjs(ptd).subtract(24, "month").format("YYYY-MM-DD");
    try {
      let empID = loggedUser?.allRoles?.[0]?.employeeID;
      const val = await apiCalls.GetReceiptEnquiryForPolicy(payload, empID, fromDate, toDate);
      if (val?.data) {
        setPaymentTransactions(val?.data?.responseBody?.receiptEnquiryDetailsList1 || []);
      } else {
        setPaymentTransactions([]);
        setPaymentTransactionsData([]);
      }
    } catch (err) {
      console.error("Failed to fetch receipt enquiry for policy:", err);
      setPaymentTransactions([]);
      setPaymentTransactionsData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const communicationContentHandler = (contentData) => {
    setCommContent(contentData);
  };

  const handleOpenTickets = () => {
    setShowOpenTickets(true);
    setShowLastPayments(false);
    getLastOpenTicketsData();
    setIsShowAllTicketsData(false);
    setIsTicketsPOSObj({});
  };

  const onClose = () => {
    setAllDetailsOpen(false);
    setFaqOpen(false);
  };

  const handlePaymentsCLose = () => {
    setShowLastPayments(false);
  };

  const handleOpenTicketsCLose = () => {
    setShowOpenTickets(false);
    setIsShowAllTicketsData(false);
    setIsTicketsPOSObj({});
    setIsSelectedTicketsData({});
  };

  const getLastOpenTicketsData = async () => {
    setIsLoading(true);
    try {
      const response = await apiCalls.getLastOpenTickets(
        props?.store?.policyDetails?.policyDetailsObj?.identifiers?.policyNo
      );
      const valData = response?.data || response || [];
      const updatedDataArray = (valData || []).map((item) => {
        if (item.status === "REJECTED") {
          return { ...item, status: "CLOSED WITH REQUIREMENTS" };
        } else if (item.status === "PENDING") {
          return { ...item, closedDate: "-" };
        }
        return item;
      });
      setTicketsData(updatedDataArray);
    } catch (err) {
      const errMsg = err?.message || "Something went wrong please try again!";
      message.destroy();
      message.error({ content: errMsg, className: "custom-msg", duration: 2 });
    } finally {
      setIsLoading(false);
    }
  };

  const convertDateYYMMDD = (inputDate) => {
    try {
      if (!inputDate) return "";
      if (typeof inputDate === "string" && /^\d{8}$/.test(inputDate)) return inputDate;
      return dayjs(inputDate).format("YYYYMMDD");
    } catch (err) {
      return "";
    }
  };

  const getArchievedTickets = async () => {
    if (fromDate === null || toDate === null) {
      return null;
    }
    // Preserve: implement API call if needed
  };

  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      setToDate(formattedDate);
    }
  };

  const getHistoricalCommunicationDetails = async () => {
    setIsLoading(true);
    try {
      const obj = { PolicyNo: state?.policyNo };
      const response = await apiCalls?.GetHistCommunications(obj);
      if (response?.data) {
        setHistoricalCommData(response?.data);
      } else {
        console.log("error is ", response?.error);
      }
    } catch (err) {
      console.log("Error is ", err);
    } finally {
      setIsLoading(false);
    }
  };

  const showArchivedTicketsHandler = () => {
    setShowArchievedTickets(true);
    setShowOpenTickets(false);
    setIsHistoricalComm(false);
  };

  const handleClickRupeeIcon = async () => {
    try {
      const effectiveDateCoversion = convertDateYYMMDD(new Date());
      const obj = {
        ClientID: null,
        PolicyNo: data?.identifiers?.policyNo,
        Action: "A",
        EffectiveDate: effectiveDateCoversion,
        CustomerRef: null,
        _HeaderPayload: { loggedinUser: loggedUser.userName },
      };
      setIsLoading(true);
      const response = await apiCalls.GetClientLevelInfo(obj);
      if (response.status === 200) {
        setUpcomingEvents(response?.data?.upcomingEvents || []);
        setPremiumEnquiryResponse([response?.data?._GetPremiumEnquiryResponse?.responseBody].filter(Boolean));
        setRupeeDetailsModal(true);
      } else {
        setRupeeDetailsModal(true);
        setUpcomingEvents([]);
        setPremiumEnquiryResponse([]);
      }
    } catch (err) {
      console.log("error is", err);
      setRupeeDetailsModal(true);
      setUpcomingEvents([]);
      setPremiumEnquiryResponse([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fromDateHandler = (date, dateString) => {
    setFromDate(dateString);
  };

  const showHistoricalCommHandler = () => {
    setShowOpenTickets(false);
    setShowArchievedTickets(false);
    setShowLastPayments(false);
    setIsShowAllTicketsData(false);
    setIsHistoricalComm(!isHistoricalComm);
    if (!isHistoricalComm) {
      getHistoricalCommunicationDetails();
    }
  };

  const getDetails = async (serialNum) => {
    setIsLoading(true);
    try {
      const val = await apiCalls.getTicketDetails(serialNum);
      if (val?.data) {
        setDetails(val?.data);
      } else {
        message.destroy();
        message.error({
          content: val?.data?.responseHeader?.message || "Something went wrong please try again!",
          className: "custom-msg",
          duration: 2,
        });
      }
    } catch (err) {
      const errMsg = err?.message || "Something went wrong while fetching details";
      message.destroy();
      message.error({ content: errMsg, className: "custom-msg", duration: 2 });
    } finally {
      setIsLoading(false);
    }
  };

  const hideArchivedTicketsHandler = () => {
    setShowArchievedTickets(false);
    if (typeof props?.setShowComplainUser === "function") {
      props?.setShowComplainUser(true);
    }
  };

  const getPOSIndividualData = async (dataParam) => {
    setIsLoading(true);
    try {
      const val = await apiCalls.getPOSIndividualData(dataParam);
      if (val?.data) {
        setDetails(val?.data);
      } else {
        message.destroy();
        message.error({
          content: val?.data?.responseHeader?.message || "Something went wrong please try again!",
          className: "custom-msg",
          duration: 2,
        });
      }
    } catch (err) {
      const errMsg = err?.message || "Something went wrong while fetching POS data";
      message.destroy();
      message.error({ content: errMsg, className: "custom-msg", duration: 2 });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTickectNoLink = async (slectedRow) => {
    setCallTypeId(slectedRow?.callType);
    setSubTypeId(slectedRow?.subType);
    setIsOpenTicket(true);
    setServiceId(slectedRow?.serviceNo);
    await getPOSIndividualData(slectedRow?.serviceNo);
    setIsTicketsData(slectedRow);
    setIsLoading(true);
    await getDetails(slectedRow?.serviceNo);
    setIsLoading(false);
  };

  const handleClose = () => {
    setIsOpenTicket(false);
  };

  const handleTicketSubmit = () => {
    setIsOpenTicket(false);
  };

  const handleEmailView = async (selectedRow) => {
    try {
      let obj = { emailResponseId: selectedRow.emailResponseId };
      let response = await apiCalls.getEmailVisibility(obj);
      setEmailViewData(response.data);
    } catch (err) {
      console.error("Email view fetch failed", err);
    }
  };
    const handleDMSViewerEncryption=async () => {
         try{
          setIsLoading(true);
          let obj = {
          
            source: "POS",
            policyno: "",
            ApplicationNo: props?.searchPolicyData?.[0]?.applicationNo,
            dob: ""
            
          };
          const response = await apiCalls.DMSViewerEncryption(obj);
          if (response?.data?.responseBody?.status) {
              const gConfig= await apiCalls.getGenericConfig()
          if(gConfig?.data?.dmsApiUrlNew){
            const url =  gConfig?.data?.dmsApiUrlNew +`?SearchParam=${response?.data?.responseBody.searchParam}&AccessToken=${response?.data?.responseBody.acessToken}`
          
            window.open(url, '_blank');
            }
          }  
        }
        catch (error) {
          ErrorHandler(error);
        } finally {
          setIsLoading(false);
        }
      };
 const dmsnew=()=>{
         handleDMSViewerEncryption();
  };
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
  // ---------- render ----------
  return (
    <>
      <div className="widgets-start">
        <SidebarWidgets
          onAssistance={Assistancee}
          onLastPayments={handleLastPayments}
          onPayouts={getPayoutDetailsEnquiry}
          onOpenTickets={handleOpenTickets}
          onArchivedTickets={showArchivedTicketsHandler}
          onDms={dms}
          onTransactionDocs={() =>
            [4, 5, 11, 12, 23, 22, 31, 32, 33, 34].includes(loggedUser?.role)
              ? setShowUplodedDocs(true)
              : {}
          }
          onProfile={() => setAllDetailsOpen(true)}
          onRupeeClick={handleClickRupeeIcon}
          onHistorical={showHistoricalCommHandler}
          customerProfile={customerProfile}
          loggedUser={loggedUser}
          ondmsnew={dmsnew}
          onPolicyEnquiry={handlePolicyEnquiryClick}
        />
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
                    <span className="profile-alert">{customerProfile?.ladobAlert ?? ""}</span>
                  </td>
                </tr>
                <tr>
                  <td>Loan (If active)</td>
                  <td>
                    {customerProfile?.loan}
                    <span className="profile-alert">{customerProfile.loanAlert ?? ""}</span>
                  </td>
                </tr>

                <tr>
                  <td colSpan={2} className="text-center">
                    <b> Customer Profile</b>
                  </td>
                </tr>

                <tr>
                  <td>Mobile</td>
                  <td>
                    {customerProfile.contactDetailsMobile}
                    <span className="profile-alert">{customerProfile.contactDetailsMobileAlert ?? ""}</span>
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>
                    {customerProfile.contactDetailsEmail}
                    <span className="profile-alert">{customerProfile.contactDetailsEmailAlert ?? ""}</span>
                  </td>
                </tr>
                <tr>
                  <td>Updated Bank Account</td>
                  <td>
                    {customerProfile?.updateBankAccount}
                    <span className="profile-alert">{customerProfile?.updateBankAccountAlert ?? ""}</span>
                  </td>
                </tr>
                <tr>
                  <td>Auto Pay Updated</td>
                  <td>
                    {customerProfile?.updateAutoPay}
                    <span className="profile-alert">{customerProfile?.updateAutoPayAlert ?? ""}</span>
                  </td>
                </tr>
                <tr>
                  <td>Preferred Language</td>
                  <td>
                    <select
                      value={languageMode === "" ? customerProfile.languageMode : languageMode}
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
                    <Button
                      type="submit"
                      className="save-Button-Color"
                      onClick={() => {
                        if (languageMode !== "") saveDropdownProfileValues("Language");
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
                      value={communicationMode === "" ? customerProfile.communicationMode : communicationMode}
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
                    <Button
                      type="submit"
                      className="save-Button-Color"
                      onClick={() => {
                        if (communicationMode !== "") saveDropdownProfileValues("Communication");
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
                      value={customerSentiment === "" ? customerProfile.customerSentiment : customerSentiment}
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
                    <Button
                      type="submit"
                      className="save-Button-Color"
                      onClick={() => {
                        if (customerSentiment !== "") saveDropdownProfileValues("Customer");
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
              <li>Now you can choose to send customers payment link over registered email/SMS/whatsapp.</li>
              <li>SR will be raised and Auto closed. No further action is required from your side for this SR.</li>
            </ul>
          </p>
        </div>
      </Drawer>

      <Modal
        className="po-modal"
        title="    "
        open={RupeeDetailsModal}
        destroyOnClose={true}
        width={1200}
        height={500}
        keyboard={true}
        onCancel={(e) => {
          if (e?.key === "Escape") {
            setRupeeDetailsModal(false);
          } else {
            setRupeeDetailsModal(false);
          }
        }}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setRupeeDetailsModal(false)}>
              <img src={CloseIcon} alt="" />
            </span>
          </Tooltip>
        }
        footer={null}
        maskClosable={false}
      >
        <Form>
          <div className="left-half">
            <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ backgroundColor: "#b3201f", color: "black" }}>
                <tr>
                  <th colSpan="4" style={{ color: "white", textAlign: "left" }}>
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
                      <td>{item?.ptdate ? formatDateSafe(item?.ptdate) : null}</td>
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

          <br />
          <br />
          <div className="left-half">
            <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ backgroundColor: "#b3201f", color: "black" }}>
                <tr>
                  <th colSpan="4" style={{ color: "white", textAlign: "left" }}>
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
                      <td>{formatDateSafe(item?.eventDate)}</td>
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
      </Modal>

      <Modal title="Assistance" open={assistanceOpen} destroyOnClose={true} width={1200} closeIcon={false} footer={null}>
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
            <Button type="primary" className="primary-btn" onClick={() => setAssistanceOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>

      <Modal open={Verifiedpopup} destroyOnClose={true} width={600} closeIcon={false} footer={null}>
        <div>
          <div className="reuirement">
            <table className="table responsive-table assistanceTable">
              <tbody>
                <tr>
                  <td>DOB</td>
                  <td>
                    <b>
                      {formatDateSafe(
                        props?.store?.policyDetails?.policyDetailsObj?.identifiers?.dob
                      ) || "-"}
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
                    <b>
                      {ClientName ? ClientName : ""} {ClientName ? "&" : ""}
                    </b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="contact-details-btn">
            <Button type="primary" className="primary-btn" onClick={() => setVerifiedPopup(false)}>
              OK
            </Button>
          </div>
        </div>
      </Modal>

      <Modal open={ShowUplodedDocs} destroyOnClose={true} width={1200} closeIcon={false} footer={null}>
        <div>
          <div className="reuirement">
            <table className="table responsive-table assistanceTable">
              <thead>
                <th>Document</th>
                <th>Uploaded On</th>
                <th>Uploaded By</th>
              </thead>
              <tbody>
                {PosData?.dmsLink?.length > 0 &&
                  PosData?.dmsLink?.map((item, ind) => (
                    <tr key={ind + 1}>
                      <td>{item?.labelName}</td>
                      <td>
                        <a
                          className="hyperLink"
                          target="_blank"
                          rel="noopener noreferrer"
                          href={import.meta.env.VITE_APP_Image_Path + item?.fileLocation + item?.documentName}
                        >
                          {item.indexName}
                        </a>{" "}
                      </td>
                      <td> {new Date(item.uploadedOn).toLocaleDateString()}</td>
                      <td> {item.uploadedBy}</td>
                    </tr>
                  ))}
                {PosData?.dmsLink?.length === 0 && (
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
            <Button type="primary" className="primary-btn" onClick={() => setShowUplodedDocs(false)}>
              OK
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        title="Payout"
        open={isPayoutModal}
        destroyOnClose={true}
        width={1200}
        closeIcon={
          <Tooltip title="Close">
            <img src={CloseIcon} alt="" onClick={() => setIsPayoutModal(false)} />
          </Tooltip>
        }
        footer={null}
      >
        <ReusableTable
          columns={Payoutcolumns}
          data={payoutModalData}
          loading={isPayoutModalLoading}
          rowKey={(r) => `${r.CHDRNUM}_${r.CHEQNO ?? ""}`}
          pagination={{ pageSize: 10 }}
          emptyText="No payout records"
        />
      </Modal>

      {showLastPayments && (
        <Modal
          title="Payment Transactions"
          open={showLastPayments}
          destroyOnClose={true}
          width={1200}
          closeIcon={
            <Tooltip title="Close">
              <span onClick={() => handlePaymentsCLose()}>
                <img src={CloseIcon} alt="" />
              </span>
            </Tooltip>
          }
          footer={null}
        >
          <ReusableTable
            columns={PAYMENT_COLUMNS}
            data={paymentTransactions}
            loading={isLoading}
            rowKey={(r) => r.transactionNumber || r.rdocnum || `${r.trandate}_${Math.random()}`}
            pagination={{ pageSize: 10 }}
            emptyText="No payment transactions"
          />
        </Modal>
      )}

      {showOpenTickets && (
        <Modal
          title="Oasis Tickets"
          open={showOpenTickets}
          destroyOnClose={true}
          width={1200}
          closeIcon={
            <Tooltip title="Close">
              <span onClick={() => handleOpenTicketsCLose()}>
                <img src={CloseIcon} alt="" />
              </span>
            </Tooltip>
          }
          footer={null}
        >
          <ReusableTable
            columns={OPEN_TICKETS_COLUMNS}
            data={ticketsData}
            loading={isLoading}
            rowKey={(r) => r.serviceNo || `${r.urn}_${Math.random()}`}
            pagination={{ pageSize: 10 }}
            emptyText="No open tickets"
            onRow={(record) => ({ onDoubleClick: () => handleTickectNoLink(record) })}
          />
        </Modal>
      )}

      {showArchievedTickets && (
        <Modal
          title="Archived Tickets"
          open={showArchievedTickets}
          destroyOnClose={true}
          width={1200}
          closeIcon={
            <Tooltip title="Close">
              <span onClick={() => hideArchivedTicketsHandler()}>
                <img src={CloseIcon} alt="" />
              </span>
            </Tooltip>
          }
          footer={null}
        >
          <div className="form-container">
            <Form layout="inline">
              <Form.Item label="From Date" name="fromDate" rules={[{ required: true, message: "Select From Date" }]}>
                <DatePicker
                  format={dateFormat}
                  className="date-picker"
                  onChange={(date, dateString) => fromDateHandler(date, dateString)}
                  disabledDate={(current) => current && (current < new Date(2022, 0, 1) || current > new Date())}
                />
              </Form.Item>

              <Form.Item label="To Date" name="toDate" rules={[{ required: true, message: "Select To Date" }]}>
                <DatePicker format={dateFormat} className="date-picker" onChange={handleDateChange} disabledDate={(current) => current && current > new Date()} />
              </Form.Item>

              <Button icon={<SearchOutlined />} className="search-button" onClick={getArchievedTickets} />
            </Form>

            <h6 style={{ fontSize: "10px", color: "#b21f1f", padding: "10px" }}>
              Data Available Only from Jan-2022 till today
            </h6>
          </div>

          <ReusableTable
            columns={ARCHIVED_TICKETS_COLUMNS}
            data={archivedTickets}
            loading={ticketsLoader || isLoading}
            rowKey={(r) => r.srvReqRefNo || `${r.createBy}_${Math.random()}`}
            pagination={{ pageSize: 10 }}
            emptyText="No archived tickets"
          />
        </Modal>
      )}

      {EmailViewData !== null && (
        <Modal
          title={
            <span className="header-info">
              <div style={{ display: "flex", justifyContent: "space-between", gap: "2rem" }}>
                <span>{EmailViewData?.emailClassify?.[0].urn}</span>
                <span>To: {EmailViewData?.emailClassify?.[0].from}</span>
                <span>From: {EmailViewData?.emailClassify?.[0].toRecipients}</span>
                <span>
                  <i className="bi bi-alarm"></i>: {formatDateSafe(EmailViewData?.emailClassify?.[0].receivedDateTime)}
                </span>
              </div>
            </span>
          }
          open={true}
          destroyOnClose={true}
          width={1200}
          closeIcon={
            <Tooltip title="Close">
              <span onClick={() => setEmailViewData(null)}>
                <img src={CloseIcon} alt="" />
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
              <div dangerouslySetInnerHTML={{ __html: EmailViewData?.emailClassify?.[0]?.body }} />
            </div>
          </div>
        </Modal>
      )}

      {isHistoricalComm && (
        <Modal
          title="Historical Communication"
          open={isHistoricalComm}
          destroyOnClose={true}
          width={1600}
          closeIcon={
            <Tooltip title="Close">
              <span onClick={() => setIsHistoricalComm(false)}>
                <img src={CloseIcon} alt="" />
              </span>
            </Tooltip>
          }
          footer={null}
        >
          <HistoricalCommunication
            historicalCommData={historicalCommData}
            setIsHistoricalComm={setIsHistoricalComm}
            setIsCommunicationContent={setIsCommunicationContent}
            communicationContentHandler={communicationContentHandler}
          />
        </Modal>
      )}

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
          isEmailManagement={true}
          headerAPiresponse={props?.store?.policyDetails}
        />
      )}
    </>
  );
};

export default Widgets;
