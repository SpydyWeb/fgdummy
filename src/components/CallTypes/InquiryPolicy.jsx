import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Spin,
  Button,
  Row,
  Col,
  Checkbox,
  message,
  Modal,
  Upload,
  Tooltip,
} from "antd";
import DetailsForm from "../../utils/DetailsForm";
import PopupAlert from "../popupAlert";
import { policyInquiry } from "../../mainconfig";
import moment from "moment";
import { connect, useSelector } from "react-redux";
import apiCalls from "../../api/apiCalls";
import dayjs from "dayjs";
import { POLICYSTATUSLIST } from "../../utils/constantLU";

const InquiryPolicy = (props) => {
  // const { selectedCallType, selectedSubType, customerData, details, policyDetails,POSContactData , requestModeLU} = props;
  const {
    selectedSubType,
    customerData,
    POSContactData,
    SelectedSubTypeVal,
    details,
    requestModeLU,
    clientEnquiryData,
  } = props;
  const [form] = Form.useForm();
  const loginInfo = useSelector((state) => state);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertData, setAlertData] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const loggedUser = useSelector((state) => state?.userProfileInfo?.profileObj);
  const [paymentAmount, setpaymentAmount] = useState("");
  const [paymentAmountDate, setpaymentAmountDate] = useState("");
  const [totalFundValue, setTotalFundValue] = useState("");
  const [policyStatus, setPolicyStatus] = useState("");
  //  console.log("selectedSubType",selectedSubType)

  // const [callType, setCallType] = useState('Policy Inquiry');
  // const [subType, setSubType] = useState('Policy Status');
  // const [comments, setComments] = useState('');

  // const handleCallTypeChange = (event) => {
  //   setCallType(event.target.value);
  // };

  // const handleSubTypeChange = (event) => {
  //   setSubType(event.target.value);
  // };

  // const handleCommentsChange = (event) => {
  //   setComments(event.target.value);
  // };
  const handleDropdownChange = (e, item) => {};

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
  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };

  const fetchFundValue = async () => {
    try {
      const result = await getFundValue(); // Your actual API call
      return result || "NA";
    } catch (error) {
      console.error("Error fetching fund value:", error);
      return "NA";
    }
  };

  const fetchReceiptData = async (policyNo, empID, fromDate, toDate) => {
    try {
      const response = await apiCalls.GetReceiptEnquiryForPolicy(
        policyNo,
        empID,
        fromDate,
        toDate
      );
      return response?.data?.responseBody || null;
    } catch (error) {
      console.error("Error fetching receipt data:", error);
      return null;
    }
  };

  const getTransactionData = async (values) => {
    try {
      const empID = loggedUser?.allRoles?.[0]?.employeeID;
      const policyDetailsObj = details?.policyDetailsObj;
      const ptd = details?.policyDetailsObj?.premiumDetails?.ptd;

      if (!policyDetailsObj?.premiumDetails?.ptd) {
        throw new Error("Premium To Date (PTD) is missing");
      }

      const toDate = dayjs(policyDetailsObj.premiumDetails.ptd).format(
        "YYYYMMDD"
      );
      const fromDate = dayjs(policyDetailsObj.premiumDetails.ptd)
        .subtract(12, "month")
        .format("YYYYMMDD");

      const policyNo = policyDetailsObj?.identifiers?.policyNo;
      if (!policyNo) throw new Error("Policy number is missing");

      const [totalFundValue, receiptData] = await Promise.all([
        fetchFundValue(),
        fetchReceiptData(policyNo, empID, fromDate, toDate),
      ]);

      if (!receiptData) {
        message.error({
          content: "Receipt data not available. Please try again!",
          className: "custom-msg",
          duration: 2,
        });
      }

      const receipt1 = receiptData?.receiptEnquiryDetailsList1?.[0];
      const receipt01 = receiptData?.receiptEnquiryDetailsList01?.[0];

      const paymentAmt = receipt1?.origamt ?? receipt01?.origamt ?? "";
      const paymentDt = convertDate(
        receipt1?.trandate ?? receipt01?.trandate ?? ""
      );

      setpaymentAmount(paymentAmt);
      setpaymentAmountDate(paymentDt);

      const premiumAmount =
        policyDetailsObj?.premiumDetails?.modelPremiumAmount;
      const planName =
        policyDetailsObj?.planAndStatus?.planName || customerData?.planName;
      const policyStatus =
        policyDetailsObj?.planAndStatus?.policyStatus ||
        customerData?.policyStatus;
      const newPolicyStatus = getPremiumStatus(policyStatus, POLICYSTATUSLIST);

      setPolicyStatus(newPolicyStatus);
      const allowedSubTypes = new Set([
        "others",
        "policybonddispatchdetails",
        "premiumpaidamount",
        "onlineorivrpayment",
        "payoutqueries",
        "freelookstatusenquiry",
        "debittransactionstatus",
        "foreclosureinquiry",
        "termsandconditions",
        "survivalprocessrelated",
        "maturityprocessrelated",
        "contactnoupdationquery",
        "feedback",
        "refundstatus",
        "customerportalregistration",
        "mandatecancellationstatus",
        "mobileappregistration",
        "issuancestatus",
        "customerwhatsappregistration",
        "changeinownership",
        "axisbank",
        "emailconcern",
        "branchtiming",
        "websitenavigation",
        "commissionamountinfo",
        "prospectleadagent",
        "term",
        "onlinesupport",
        "branchcontact",
        "medicalstatus",
        "pivcreversecall",
        "lifecertificatereceivedstatus",
        "paymentrealizationrelated",
        "requirementreceivedstatus",
        "gcadvisor",
        "commissionamountnotreceived",
        "renewalrelated",
        "claimamount",
        "tinupdation",
        "surrenderpayoutnotreceived",
        "reasonfordeclinepostpone",
        "branchconcern",
        "guaranteedaddition",
        "legalnoticeombudsmanconsumercourt",
        "compliment",
        "icicibank",
        "partialwithdrawalstatusinquiry",
        "applicationrelated",
        "contactcenterconcern",
        "changeinplan",
        "contestinfo",
        "mandatechangestatus",
        "fundvaluenavbonus",
        "pendingrequirementsinfo",
        "reassingment",
        "eiaprocessqueries",
        "productcharges",
        "applicationstatus",
        "claimmaturitydocumentsubmitted",
        "ecsdeactivationretained",
        "refunddiscrepancies",
        "onlinecancellationmandate",
        "form16atds",
        "wrongnumberinvalidnumber",
        "pendingrequirement",
        "holdingresponse",
        "unverifiedsender",
        "registeredinuniconnect",
        "transactionredebitstatus",
        "revivalstatus",
        "dispatchdetails",
        "complaintinquiry",
        "claimamountquery",
        "claimrequeststatus",
        "claimrepudiationreason",
        "freelookrequeststatus",
        "freelookchargesenquiry",
        "customernotcontactable",
        "registeredingcconnect",
        "",
        "existingcontactdetails",
        "redebitstop",
        "surrenderquery",
        "uploadcustomeracknowledgement",
        "nblead",
        "fieldvisit",
        "customerportalregisteration",
        "whatsappregisteration",
        "advisorportalregisteration",
        "generalinsurancecall",
        "claimsquery",
        "documentupload",
        "loginregistrationissue",
        "registrationissue",
        "postloginissue",
        "statementdownloadissue",
        "transactionnotperformedbycustomer",
        "callback",
        "partialwithdrawal",
        "survivalbenefit",
        "foreclosure",
        "maturity",
        "unclaimedamountpayout",
        "newbusinessrefund",
        "postissuancerefund",
        "surrender",
        "annuity",
        "claims",
        "loan",
        "viewdispatchdetails",
        "navigation",
        "notresponsive",
        "generalquery",
        "revivalquotation",
        "policyloanstatementquery",
        "switchtopuppremiumredirectionquery",
        "emailupdationquery",
        "refundenquiry",
        "complaintverification",
      ]);

      if (allowedSubTypes.has(selectedSubType)) {
        return [
          {
            Status: "Create",
            TagName: "UserComments",
            TagValue: values?.UserComments || "",
          },
          {
            Status: "Create",
            TagName: "AdditionalNoteForCustomer",
            TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
          },
          {
            Status: "Create",
            TagName: "requestchannel",
            TagValue: values?.requestchannel || "",
          },
        ];
      }

      if (
        [
          "policydetails",
          "policystatus",
          "premiumduedate",
          "premiumdueamount",
          "policystatusanddetails",
          "nameofplan",
          "fundvalue",
        ].includes(selectedSubType)
      ) {
        return [
          {
            Status: "Create",
            TagName: "AdditionalNoteForCustomer",
            TagValue: cleanInput(values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")) || "",
          },
          {
            Status: "Create",
            TagName: "requestchannel",
            TagValue: values?.requestchannel || "",
          },
          {
            Status: "Create",
            TagName: "UserComments",
            TagValue: values?.UserComments || "",
          },
          { Status: "Create", TagName: "PROD_NAME", TagValue: planName || "" },
          { Status: "Create", TagName: "STATUS", TagValue: newPolicyStatus },
          {
            Status: "Create",
            TagName: "DUE_DT",
            TagValue: ptd ? convertDate(ptd) : "",
          },
          {
            Status: "Create",
            TagName: "DUE_AMT",
            TagValue: premiumAmount || "",
          },
          { Status: "Create", TagName: "PAYMENT_AMT", TagValue: paymentAmt },
          { Status: "Create", TagName: "PAYMENT_DT", TagValue: paymentDt },
          {
            Status: "Create",
            TagName: "FUND_VALUE",
            TagValue: totalFundValue || "NA",
          },
        ];
      }

      return [];
    } catch (error) {
      message.error({
        content: error.message || "Unexpected error occurred",
        className: "custom-msg",
        duration: 2,
      });
      return [];
    }
  };

  function cleanInput(str) {
    if (!str) return "";
    return str.replace(/[\\"/]/g, '"');
  }

  useEffect(() => {
    form.resetFields();
  }, [selectedSubType]);
  useEffect(() => {
    if (props?.EmailResponse?.IsEmailmanagent) {
      policyInquiry[selectedSubType]?.BOE_Details?.forEach((element) => {
        if (element?.name === "requestchannel") {
          form.setFieldsValue({ requestchannel: 4 });
          element.disabled = true;
          // setEmsrequestchannel(4)
        }
      });
      // Ensure policyInquiry and selectedSubType are defined
      if (!policyInquiry[selectedSubType]) {
        policyInquiry[selectedSubType] = {}; // Initialize if undefined
      }

      // Ensure BOE_Details array exists
      if (!Array.isArray(policyInquiry[selectedSubType]?.BOE_Details)) {
        policyInquiry[selectedSubType].BOE_Details = [];
      }

      // Remove existing instances of "Additional Note For Customer" before adding a new one
      policyInquiry[selectedSubType].BOE_Details = policyInquiry[
        selectedSubType
      ].BOE_Details.filter(
        (comment) => comment.name !== "AdditionalNoteForCustomer"
      );

      // Add "Additional Note For Customer" once
      policyInquiry[selectedSubType].BOE_Details.push({
        name: "AdditionalNoteForCustomer",
        label: "Additional Note For Customer",
        inputType: "complaintbox",
        maxlength: 4000,
        required: false,
        validationmsg: "Additional Note For Customer",
        placeholder: "Additional Note For Customer",
        width: "100%",
        rows: 4,
      });
    }
  }, [selectedSubType]);

  useEffect(() => {
    const freezeSubTypes = [
      "policyloanstatementquery",
      "switchtopuppremiumredirectionquery",
      "emailupdationquery",
      "refundenquiry",
      "contactnoupdationquery",
    ];
    if (
      freezeSubTypes.includes(selectedSubType) &&
      loginInfo?.userProfileInfo?.profileObj?.role === 14
    ) {
      // Set default value (change 4 to your required value)
      form.setFieldsValue({ requestchannel: 13 });
      // Freeze the dropdown in config
      if (Array.isArray(policyInquiry[selectedSubType]?.BOE_Details)) {
        policyInquiry[selectedSubType].BOE_Details.forEach((item) => {
          if (item.name === "requestchannel") {
            item.disabled = true;
          }
        });
      }
    } else if (
      freezeSubTypes.includes(selectedSubType) &&
      loginInfo?.userProfileInfo?.profileObj?.role !== 14
    ) {
      // Unfreeze for other roles
      if (Array.isArray(policyInquiry[selectedSubType]?.BOE_Details)) {
        policyInquiry[selectedSubType].BOE_Details.forEach((item) => {
          if (item.name === "requestchannel") {
            item.disabled = false;
          }
        });
      }
    }
  }, [selectedSubType, loginInfo?.userProfileInfo?.profileObj?.role]);

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    saveRequest(values);
  };

  const handleInputChange = (e, item) => {};

  const saveRequest = async (values) => {
    try {
      setIsLoader(true);
      // Await the transaction data before proceeding
      const transactionData = await getTransactionData(values);
      const obj = {
        CallType: props?.selectedCallType, // Required
        SubType: props?.selectedSubTypeId, // Required
        RequestSource: loginInfo?.userProfileInfo?.profileObj?.role || 0, // Required
        RequestChannel: props?.EmailResponse?.IsEmailmanagent
          ? 4
          : loginInfo?.userProfileInfo?.profileObj?.role === 14
          ? 13
          : values.requestchannel, // Required
        Category: 1,
        ApplicationNo:
          details?.policyDetailsObj?.identifiers?.applicationNo ||
          customerData?.applicationNo,
        DOB: convertDate(customerData?.dob),
        PolicyNo:
          details?.policyDetailsObj?.identifiers?.policyNo ||
          customerData?.policyNo, // Required
        CustomerId: 456,
        CustRole: 1,
        policyStatus:
          details?.policyDetailsObj?.planAndStatus?.policyStatus ||
          customerData?.policyStatus,
        proposerName:
          details?.policyDetailsObj?.identifiers?.po_Name ||
          customerData?.po_Name,
        plan:
          details?.policyDetailsObj?.planAndStatus?.planName ||
          customerData?.planName,

        CreatedOn: new Date(),
        CreatedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
        CreatedUsrId: loginInfo?.userProfileInfo?.profileObj?.userName,
        ModifiedOn: new Date(),
        ModifiedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
        AssignedToRole: "", // POS
        AssignedByUser: 0,
        ReasonForChange: "",
        RequestDateTime: "",
        ReasonDelayed: "",
        CustSignDateTime: "",
        TransactionData: transactionData || [],
        Uploads: [],
        CommunicationRequest: [
          {
            SrvReqRefNo: "",
            TemplateID: "",
            CommType: 2,
            ReceipientTo: import.meta.env.VITE_APP_RECEIPIENT_TO
              ? import.meta.env.VITE_APP_RECEIPIENT_TO
              : clientEnquiryData?.rinternet,
            ReceipientCC: import.meta.env.VITE_APP_RECEIPIENT_CC
              ? import.meta.env.VITE_APP_RECEIPIENT_CC
              : clientEnquiryData?.rinternet,
            MobileNos: "",
            ScheduledTime: new Date(),
            CommBody: "",
            Attachments: null,
          },
          {
            SrvReqRefNo: "",
            TemplateID: "",
            CommType: 1,
            ReceipientTo: "",
            ReceipientCC: "",
            MobileNos: import.meta.env.VITE_APP_RECEIPIENT_MOBILENO
              ? import.meta.env.VITE_APP_RECEIPIENT_MOBILENO
              : clientEnquiryData?.rmblphone,
            ScheduledTime: new Date(),
            CommBody: "",
            Attachments: null,
          },
        ],
      };
      if (props?.EmailResponse?.IsEmailmanagent) {
        obj.TransactionData.push(
          {
            Status: "Create",
            TagName: "EmailResponseId",
            TagValue: props?.EmailResponse?.EmailResponseId,
          },
          {
            Status: "Create",
            TagName: "CustomerName",
            TagValue: clientEnquiryData?.lgivname + clientEnquiryData?.lsurname,
          }
        );
      }
      const response = await apiCalls.genericAPI(obj);
      if (response?.data) {
        setAlertTitle(response?.data?.header);
        setAlertData(response?.data?.message);
        setShowAlert(true);
      } else {
        message.error({
          content:
            response?.data?.responseBody?.errormessage ||
            "Something went wrong please try again!",
          className: "custom-msg",
          duration: 2,
        });
      }
      setIsLoader(false);
    } catch (error) {
      message.error("Failed to save the request. Please try again.");
      setIsLoader(false);
    }
  };

  const getFundValue = async () => {
    try {
      const obj = {
        requestHeader: {
          source: "POS",
          carrierCode: "2",
          branch: "PRA",
          userId: loggedUser?.allRoles[0]?.employeeID,
          userRole: "10",
          partnerId: "MSPOS",
          processId: "POS",
          monthendExtension: "N",
          monthendDate: "18/10/2023",
        },
        requestBody: {
          policyno: details?.policyDetailsObj?.identifiers?.policyNo,
        },
      };

      const response = await apiCalls.GetFundValue(obj);
      if (response?.data) {
        const totalValue = response?.data?.responseBody?.fundValue?.reduce(
          (acc, ele) => acc + Number(ele.curuntval || 0), // Default to 0 if curuntval is undefined
          0
        );

        const formattedValue =
          isNaN(totalValue) || totalValue === 0
            ? "Not Applicable"
            : Number(totalValue).toLocaleString("en-IN");

        return formattedValue;
      } else {
        message.error({
          content:
            response?.data?.responseBody?.errormessage ||
            "Something went wrong, please try again!",
          className: "custom-msg",
          duration: 2,
        });
        return "Not Applicable"; // Default fallback
      }
    } catch (err) {
      return "Not Applicable"; // Default fallback in case of an error
    }
  };

  const renderDetailsForm = (formType) => {
    return (
      <DetailsForm
        data={policyInquiry[selectedSubType]?.[formType]}
        subType={selectedSubType}
        form={form}
        handleInputChange={handleInputChange}
        requestModeLU={requestModeLU}
        handleDropdownChange={handleDropdownChange}
      ></DetailsForm>
    );
  };

  return (
    <>
      <Spin spinning={isLoader}>
        <Form
          form={form}
          name="wrap"
          labelCol={{
            flex: "35%",
          }}
          labelAlign="center"
          labelWrap
          wrapperCol={{
            flex: 1,
          }}
          colon={false}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <>
            {selectedSubType === "policystatus" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "premiumduedate" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "premiumdueamount" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "premiumpaidamount" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "policybonddispatchdetails" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "policystatusanddetails" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "policydetails" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "others" && renderDetailsForm("BOE_Details")}
            {selectedSubType === "onlineorivrpayment" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "payoutqueries" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "freelookstatusenquiry" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "debittransactionstatus" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "foreclosureinquiry" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "termsandconditions" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "survivalprocessrelated" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "maturityprocessrelated" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "contactnoupdationquery" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "feedback" && renderDetailsForm("BOE_Details")}
            {selectedSubType === "refundstatus" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "customerportalregistration" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "mandatecancellationstatus" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "mobileappregistration" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "issuancestatus" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "customerwhatsappregistration" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "changeinownership" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "axisbank" && renderDetailsForm("BOE_Details")}
            {selectedSubType === "emailconcern" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "branchtiming" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "websitenavigation" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "commissionamountinfo" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "prospectleadagent" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "term" && renderDetailsForm("BOE_Details")}
            {selectedSubType === "onlinesupport" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "branchcontact" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "medicalstatus" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "pivcreversecall" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "lifecertificatereceivedstatus" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "paymentrealizationrelated" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "requirementreceivedstatus" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "gcadvisor" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "commissionamountnotreceived" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "renewalrelated" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "claimamount" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "tinupdation" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "surrenderpayoutnotreceived" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "reasonfordeclinepostpone" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "branchconcern" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "guaranteedaddition" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "legalnoticeombudsmanconsumercourt" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "compliment" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "icicibank" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "nameofplan" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "partialwithdrawalstatusinquiry" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "applicationrelated" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "contactcenterconcern" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "changeinplan" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "contestinfo" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "mandatechangestatus" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "fundvaluenavbonus" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "pendingrequirementsinfo" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "reassingment" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "eiaprocessqueries" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "productcharges" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "applicationstatus" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "claimmaturitydocumentsubmitted" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "ecsdeactivationretained" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "refunddiscrepancies" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "onlinecancellationmandate" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "form16atds" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "wrongnumberinvalidnumber" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "pendingrequirement" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "holdingresponse" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "unverifiedsender" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "registeredinuniconnect" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "transactionredebitstatus" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "revivalstatus" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "dispatchdetails" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "complaintinquiry" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "claimamountquery" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "claimrequeststatus" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "claimrepudiationreason" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "freelookrequeststatus" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "freelookchargesenquiry" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "customernotcontactable" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "registeredingcconnect" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "existingcontactdetails" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "redebitstop" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "surrenderquery" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "uploadcustomeracknowledgement" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "nblead" && renderDetailsForm("BOE_Details")}
            {selectedSubType === "fieldvisit" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "customerportalregisteration" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "whatsappregisteration" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "advisorportalregisteration" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "generalinsurancecall" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "claimsquery" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "documentupload" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "loginregistrationissue" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "registrationissue" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "postloginissue" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "statementdownloadissue" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "transactionnotperformedbycustomer" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "callback" && renderDetailsForm("BOE_Details")}
            {selectedSubType === "partialwithdrawal" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "survivalbenefit" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "foreclosure" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "maturity" && renderDetailsForm("BOE_Details")}
            {selectedSubType === "unclaimedamountpayout" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "newbusinessrefund" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "postissuancerefund" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "surrender" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "annuity" && renderDetailsForm("BOE_Details")}
            {selectedSubType === "claims" && renderDetailsForm("BOE_Details")}
            {selectedSubType === "loan" && renderDetailsForm("BOE_Details")}
            {selectedSubType === "viewdispatchdetails" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "navigation" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "notresponsive" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "generalquery" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "fundvalue" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "revivalquotation" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "policyloanstatementquery" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "switchtopuppremiumredirectionquery" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "emailupdationquery" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "refundenquiry" &&
              renderDetailsForm("BOE_Details")}
            {selectedSubType === "complaintverification" &&
              renderDetailsForm("BOE_Details")}
          </>
          <div className="contact-details-btn">
            <Button type="primary" htmlType="submit" className="primary-btn">
              Submit
            </Button>{" "}
          </div>
        </Form>
      </Spin>
      {showAlert && (
        <PopupAlert
          alertData={alertData}
          getAdvance={props.getAdvance}
          title={alertTitle}
          navigate={navigateTo}
          setShowAlert={setShowAlert}
        ></PopupAlert>
      )}
    </>
  );
};

export default InquiryPolicy;
