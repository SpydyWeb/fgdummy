import React, { useState, useEffect } from "react";
import PopupAlert from "../popupAlert";

import { Data } from "../../mainconfig";
import {
  Button,
  Col,
  Form,
  Modal,
  Row,
  Tooltip,
  Spin,
  message,
  Checkbox,
  Upload,
  Input,
} from "antd";
import DetailsForm from "../../utils/DetailsForm";
import UploadIcon from "../../assets/images/upload.png";
import CloseIcon from "../../assets/images/close-icon.png";
import moment from "moment";
import apiCalls from "../../api/apiCalls";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ContactForm from "../../utils/ContactForm";
import { connect, useSelector } from "react-redux";
import InternalFlow from "../InternalFlow/InternalFlow";
import InternalFlowPOS from "../InternalFlow/InternalFlowPOS";
import RaiseRequirementPopup from "../RaiseRequirementPopup";
import surrender from "./surrender";

const SurrenderV2 = (props) => {
  const loginInfo = useSelector((state) => state);
  dayjs.extend(customParseFormat);

  const {
    changeSubType,
    policyDetails,
    selectedSubTypeId,
    selectedCallType,
    selectedSubType,
    POSContactData,
    customerData,
    setSelectedSubType,
    surrenderForm,
    requestModeLU,
    bankAccTypeLU,
  } = props;
  const loggedUser = useSelector((state) => state?.userProfileInfo?.profileObj);
  const [form] = Form.useForm();
  const [finalPaymentForm] = Form.useForm();
  const [requirementsForm] = Form.useForm();
  const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [showRaiseRequirementBtn, setShowRaiseRequirementBtn] = useState(false);
  const [clickedButton, setClickedButton] = useState("");
  const [vaildateSignature, setVaildateSignature] = useState(false);
  const [fundTrasterVisible, setFundTrasterVisible] = useState(false);
  const [InternaRequirements, setInternalFlowRequirements] = useState("");
  const [isShowPOSScreen, setIsShowPOSScreen] = useState(false); //pos screen showing purpose
  const [totalFundsModal, setTotalFundModal] = useState(false);
  const [showResonDelayField, setShowReasonDelayField] = useState(false);
  const [surrenderApplicableModal, setSurrenderApplicableModal] =
    useState(false);
  const [data, setData] = useState({
    mobileNo: "",
    whatsAppNo: "",
    emailId: "",
  });
  const [showEmailFields, setShowEmailFields] = useState(false);
  const [isCustomerRetained, setIsCustomerRetained] = useState("");
  const [showQueryFields, setShowQueryFields] = useState(false);
  const [showRetentionFields, setShowRetentionFields] = useState(false);
  const [showRequestFields, setShowRequestFields] = useState(false);
  const [showPOSRequestFields, setShowPOSRequestFields] = useState(false);
  const [collapsePOSDocuments, setCollapsePOSDocuments] = useState(false);
  const [collapsePOSBankDetails, setCollapsePOSBankDetails] = useState(false);
  const [collapsePOSAction, setCollapsePOSAction] = useState(false);
  const [finalPayableAmtModal, setFinalPayableAmtModal] = useState(false);
  const [showPassJVBtn, setShowPassJVBtn] = useState(false);
  const [addCCEmail, setAddCCEmail] = useState(false);
  const [showTransferFields, setShowTransferFields] = useState(false);
  const [surrenderEnquiry, setSurrenderEnquiryD] = useState({});
  const [LoanQuotationData, setLoanQuotationData] = useState({});
  const [partialWithdrawalEnquiryd, setpartialWithdrawalEnquiryd] = useState(
    {}
  );
  const [loanAvailableModal, setloanAvailableModal] = useState(false);
  const [pwAvailableModal, setpwAvailableModal] = useState(false);

  const [NegativeListModal, setNegativeListModal] = useState(false);
  const [showBankDeDupeModal, setShowBankDeDupeModal] = useState(false);
  const [SignListModal, setSignListModal] = useState(false);
  const [negativeListModal, setNegativeModal] = useState(false);

  const [currentActiveLink, setCurrentActiveLink] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [alertData, setAlertData] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showPOSMangerScreen, setShowPOSMangerScreen] = useState(false);
  const [hideViewRequestDetails, setHideViewRequestDetails] = useState(false);
  const [hideViewBankDetails, setHideBankDetails] = useState(false);
  const [posBankDetailsObj, setBankDetailsObj] = useState({});
  const [PennyDropResponse, setPennyDropResponse] = useState({});
  const [PennyDropReason, setPennyDropReason] = useState("");
  const [bankDetails, setBankDetails] = useState({});
  const [showBalanceFields, setShowBalanceFields] = useState(false);
  const [totalSurrenderAmount, setTotalSurrenderAmount] = useState(null);
  const [PenalInterestAmount, setPenalInterestAmount] = useState(null);
  const [InterestAmount, setInterestAmount] = useState(null);
  const [BankduDupeData, setBankDeDupeData] = useState([]);
  const [negativeList, setNegativeList] = useState([]);
  const [signatureDeDupeData, setSignatureDeDupeData] = useState([]);

  const [clientEnquiryData, setClientEnquiryData] = useState({});
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmailAddress, setShowEmailAddress] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [activeEmailIcons, setActiveEmailIcons] = useState([]);
  const [activeMobileIcons, setActiveMobileIcons] = useState([]);
  const [activeWhatsAppIcons, setActiveWhatsAppIcons] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]);

  const [NameReceivedInPennyDrop, setNameReceivedInPennyDrop] = useState();
  const [FundValueData, setFundValueData] = useState([]);
  const [isUlip, setIsUlip] = useState(false);
  const [CNFBankAccNo, setCNFBankAccNo] = useState("");
  const [BankAccNo, setBankAccNo] = useState("");

  const [isProcessLinks, setIsProcessLinks] = useState([]);
  const [isDocLinks, setIsDocLinks] = useState([]);
  const [loanValue, setLoanValue] = useState("");
  const [uploadMultipleFiles, setUploadMultipleFiles] = useState([]);
  const [isUploadMultipleFiles, setIsMultipleFiles] = useState([]);
  const [addressProofModal, setAddressProofModal] = useState(false);
  const [showUploadFile, setShowUploadFile] = useState(null);
  const [aadharUploadFiles, setAAdharUploadFiles] = useState([]);
  const [passportUploadFiles, setPassportUploadFiles] = useState([]);
  const [rationCardUploadFiles, setRationCardUploadFiles] = useState([]);
  const [DrivingUploadFiles, setDrivingUploadFiles] = useState([]);
  const [utilityUploadFiles, setUtilityUploadFiles] = useState([]);
  const [voterUploadFiles, setVoterUploadFiles] = useState([]);
  const [passbookUploadFiles, setPassbookUploadFiles] = useState([]);
  const [pancardUploadFiles, setPancardUploadFiles] = useState([]);

  const [idProofModal, setIdProofModal] = useState(false);
  const [aadharIDUploadFiles, setAAdharIDUploadFiles] = useState([]);
  const [passportIDUploadFiles, setPassportIDUploadFiles] = useState([]);
  const [rationCardIDUploadFiles, setRationCardIDUploadFiles] = useState([]);
  const [DrivingIDUploadFiles, setDrivingIDUploadFiles] = useState([]);
  const [voterIDUploadFiles, setVoterIDUploadFiles] = useState([]);
  const [pancardIDUploadFiles, setPancardIDUploadFiles] = useState([]);
  const [isIDUploadMultipleFiles, setIsIDMultipleFiles] = useState([]);
  const [uploadIDMultipleFiles, setUploadIDMultipleFiles] = useState([]);
  const [docIdProofs, setDocIdProofs] = useState([]);
  const [totalTdsValue, setTotalTdsValue] = useState(null);
  const [EarlySurrenderFlag, setEarlySurrenderFlag] = useState("no");
  const [isBlacklistedPolicy, setIsBlacklistedPolicy] = useState(false);

  const [ReRenderComponent, setReRenderComponent] = useState(false);
  const [caseType, setCaseType] = useState("");

  const assistFor = {
    query: 1,
    retention: 4,
    surrenderrequest: 2,
    rechecksurrenderpayout: 2,
  };
  const subTypeId = {
    surrenderquery: 3,
    surrenderretention: 5,
    surrenderrequest: 1,
    rechecksurrenderpayout: 4,
  };
  const [isLoader, setIsLoader] = useState(false);
  const formFeilds = form.getFieldsValue();
  const suffix = <img src={UploadIcon} alt="" />;
  const posScreenObj = {
    CustSignDateTime: POSContactData?.custSignDateTime,

    RequestFor: "",
    TotalSurrenderValue: "",
    EarlySurrenderFlag: "",
    FundTransfer: "",
    RequestTime: "",
    ReasonForDelay: "",

    ValidatedBy: "",
    NameAsMentionedInTheBank: "",
    ReasonForSurrender: "",
    BankIFSC: "",
    BankAccountNumber: "",
    ConfirmBankAccountNumber: "",
    BankName: "",
    InitiatePennyDrop: "",
    PennyDropReason: "",
    BranchReceivedDate: "",
    ValidateSignature: "",
    Comments: "",

    PennyDropResponse: "",
    FundTransferTo: "",
    FundTransferAmount: "",
    FundTransferType: "",
    RelationsToFTPolicy: "",
    NameOfFundTransferPolicyOwner: "",
    BalanceAmountForSurrender: "",
    NameReceivedinPennyDrop: "",
    ViewFinalPayableAmount: "",
    BranchName: "",
    PayableAmount: "",
    NameMatch: "",
    NameAsPerPennyDrop: "",

    surrenderRequestDate: "",
    SurrenderValueDate: "",
    SurrenderValuePayable: "",
    SurrenderValuePaid: "",
    PaymentDate: "",
    ReasonForReEvaluation: "",
    decision: "",
  };

  useEffect(() => {
    const policyNo = policyDetails?.policyDetailsObj?.identifiers?.policyNo;

    if (policyNo) {
      apiCalls
        .GetBlacklistDataList()
        .then((response) => {
          const blacklistedList = Array.isArray(response?.data)
            ? response.data.map((item) => item.policyNo?.toString())
            : [];
          const isBlacklisted = blacklistedList.includes(policyNo?.toString());
          setIsBlacklistedPolicy(isBlacklisted); // Set the blacklist state
          form.setFieldsValue({
            isBlacklistedPolicy: isBlacklisted ? "yes" : "no",
          });
        })
        .catch(() => {
          setIsBlacklistedPolicy(false);
          form.setFieldsValue({
            isBlacklistedPolicy: "no",
          });
        });
    }
    // Use LA client ID if available, else PO client ID
    const clientId = customerData?.laClientID || customerData?.poClientID;
    if (policyNo && clientId) {
      apiCalls.getBankDeatils({ policyNo, clientId }).then((val) => {
        if (val?.data[0]) {
          setBankDetails(val.data[0]);
          form.setFieldsValue({
            BankIFSC: val.data[0].bank_IFSC,
            BankAccountNumber: val.data[0].acc_Number,
            BankName: val.data[0].bank_Name,
            BranchName: val.data[0].branchName,
            AccountType: val.data[0].acc_Type,
          });
        }
      });
    }
  }, [
    policyDetails?.policyDetailsObj?.identifiers?.policyNo,
    customerData?.laClientID,
    customerData?.poClientID,
  ]);

  useEffect(() => {
    if (props?.EmailResponse?.IsEmailmanagent) {
      Data[selectedSubType]?.BOE_Bank_Details_Fields?.forEach((element) => {
        if (element?.name === "requestchannel") {
          form.setFieldsValue({ requestchannel: 4 });
          element.hide = true;
          // setEmsrequestchannel(4)
        }
      });
      Data[selectedSubType]?.BOE_Bank_Details_Fields?.forEach((element) => {
        if (
          [
            "CustSignDateTime",
            "BranchReceivedDate",
            "ValidateSignature",
          ].includes(element?.name)
        ) {
          element.hide = true;
        }
      });
      if (!Array.isArray(Data[selectedSubType]?.BOE_Bank_Details_Fields)) {
        Data[selectedSubType].BOE_Bank_Details_Fields = [];
      }

      // Remove existing instances of "Additional Note For Customer" before adding a new one
      Data[selectedSubType].BOE_Bank_Details_Fields = Data[
        selectedSubType
      ].BOE_Bank_Details_Fields.filter(
        (comment) => comment.name !== "AdditionalNoteForCustomer"
      );

      // Add "Additional Note For Customer" once
      Data[selectedSubType].BOE_Bank_Details_Fields.push({
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
      if (!Array.isArray(Data[selectedSubType]?.Query_Process)) {
        Data[selectedSubType].Query_Process = [];
      }

      // Remove existing instances of "Additional Note For Customer" before adding a new one
      Data[selectedSubType].Query_Process = Data[
        selectedSubType
      ].Query_Process.filter(
        (comment) => comment.name !== "AdditionalNoteForCustomer"
      );

      // Add "Additional Note For Customer" once
      Data[selectedSubType].Query_Process.push({
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
    setShowAlert(false);

    if (POSContactData && customerData?.isPOS) {
      if (POSContactData?.deDupPayload?.length > 0) {
        for (let index in POSContactData?.deDupPayload) {
          if (POSContactData?.deDupPayload[index]?.type === "NEGATIVELIST") {
            setNegativeList(POSContactData?.deDupPayload[index]?.deDupPayload);

            Data[selectedSubType]?.POS_Action?.forEach((element) => {
              if (element?.name === "negavativeListVerification") {
                element.hide = false;
              }
            });
          }
          if (POSContactData?.deDupPayload[index]?.type === "SIGNATURE") {
            setSignatureDeDupeData(
              POSContactData?.deDupPayload[index]?.deDupPayload
            );
          }
        }
      }

      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        posScreenObj[element.tagName] = element.tagValue;
      });
      if (loggedUser?.role === 5) {
        setShowPOSMangerScreen(true);
        setIsShowPOSScreen(true);
      } else {
        setIsShowPOSScreen(!isShowPOSScreen);
      }

      if (posScreenObj.FundTransfer.toLowerCase() === "yes") {
        Data[selectedSubType]?.POS_Details?.forEach((element) => {
          if (element?.name === "FundTransferAmount") {
            element.hide = false;
            form.setFieldsValue({
              FundTransferAmount: posScreenObj.FundTransferAmount,
            });
          }

          if (element?.name === "FundTransferType") {
            element.hide = false;
            form.setFieldsValue({
              FundTransferType: posScreenObj.FundTransferType,
            });
          }
        });
      } else {
        Data[selectedSubType]?.JVCreation?.forEach((element) => {
          if (element?.name === "FundTransferAmount") {
            form.setFieldsValue({ FundTransferAmount: 0 });
          }
        });
      }
      setReRenderComponent(!ReRenderComponent);
      setBankDetailsObj(posScreenObj);

      setTotalSurrenderAmount(posScreenObj.TotalSurrenderValue);
      determineCaseType();
      setBankAccNo(posScreenObj.BankAccountNumber);
      const accountTypeValue = parseInt(posScreenObj?.AccountType);
      const accountTypeOption = bankAccTypeLU?.find(
        (opt) => opt.value === accountTypeValue
      );
      const surrenderReasonOption = Data[selectedSubType]?.BOE_Details?.find(
        (opt) => opt.name === "surrenderreason"
      )?.options?.find((opt) => opt.value === posScreenObj.surrenderreason);

      form.setFieldsValue({
        TotalSurrenderValue: posScreenObj.TotalSurrenderValue,
        RequestFor:
          posScreenObj.FundTransfer === "yes"
            ? "Fund Transfer & Surrender"
            : "Full Surrender",
        BranchRemarks: posScreenObj.Comments,
        EarlySurrenderFlag: posScreenObj.EarlySurrenderFlag,
        RequestTime: posScreenObj.RequestTime,
        // AccountType: {value:posScreenObj. AccountType,label:"Test"},
        PayeeName: policyDetails?.policyDetailsObj?.identifiers?.po_Name,
        AccountType: accountTypeOption
          ? { value: accountTypeOption.value, label: accountTypeOption.label }
          : undefined,
        surrenderreason: surrenderReasonOption
          ? {
              value: surrenderReasonOption.value,
              label: surrenderReasonOption.label,
            }
          : undefined,

        //surrenderreason: {value:posScreenObj.surrenderreason,label:"Test"},
        FundTransfer: posScreenObj.FundTransfer,
        NameAsMentionedInTheBank: posScreenObj.NameReceivedinPennyDrop,
        BankAccountNumber: posScreenObj.BankAccountNumber,
        ValidateSignature: posScreenObj.ValidateSignature,
        BankIFSC: posScreenObj.BankIFSC,
        BankName: posScreenObj.BankName,
        InitiatePennyDrop: posScreenObj.InitiatePennyDrop,
        PennyDropReason: posScreenObj.PennyDropReason, //test
        FundTransferTo: posScreenObj.FundTransferTo,
        FundTransferAmount: posScreenObj.FundTransferAmount,
        RelationsToFTPolicy: posScreenObj.RelationsToFTPolicy,
        NameOfFundTransferPolicyOwner:
          posScreenObj.NameOfFundTransferPolicyOwner,
        BalanceAmountForSurrender: posScreenObj.BalanceAmountForSurrender,
        BranchReceivedDate: posScreenObj.BranchReceivedDate
          ? convertDate(new Date(posScreenObj.BranchReceivedDate))
          : "",
        BranchName: posScreenObj.BranchName,
        CustSignDateTime: posScreenObj.CustSignDateTime
          ? convertDate(new Date(posScreenObj.CustSignDateTime))
          : "",
        ViewFinalPayableAmount: posScreenObj.PayableAmount,
        NameReceivedinPennyDrop: posScreenObj.NameReceivedinPennyDrop,
        ChangeInLast60Days: POSContactData?.personalChange,
        PolicyLoggedLast: POSContactData?.policyLogged,
        NameMatch: posScreenObj?.NameMatch,
        NameAsPerPennyDrop: posScreenObj?.NameAsPerPennyDrop,
        surrenderRequestDate: posScreenObj.surrenderRequestDate,
        SurrenderValueDate: posScreenObj.SurrenderValueDate,
        SurrenderValuePayable: posScreenObj.SurrenderValuePayable,
        SurrenderValuePaid: posScreenObj.SurrenderValuePaid,
        PaymentDate: posScreenObj.PaymentDate,
        Surrenderpos: posScreenObj.ReasonForReEvaluation,
        EffectiveSurrenderValue: posScreenObj.EffectiveSurrenderValue,
      });
    } else {
      surrenderEnquiryData();
      getClientEnquiry();
      GetSurrenderEarlyFlag();

      form.setFieldsValue({ ValidateSignature: "yes" });
    }
    // if (policyDetails?.policyDetailsObj?.planAndStatus?.productType === "UL") {
    //   Data[selectedSubType]?.FundTransfer_Fields?.forEach((item, index) => {
    //     if (item?.name?.includes("RequestTime")) {
    //       item.hide = false;
    //     }
    //   });
    //   Data[selectedSubType]?.POS_Manager_Details?.forEach((item, index) => {
    //     if (item?.name?.includes("RequestTime")) {
    //       item.hide = false;
    //     }
    //   });
    //   Data[selectedSubType]?.BOE_Bank_Details_Fields?.forEach((item, index) => {
    //     if (item?.name?.includes("RequestTime")) {
    //       item.hide = false;
    //     }
    //   });
    //   setIsUlip(true);
    //   getFundValue();
    // } else {
    //   loanQuotation();
    //   Data[selectedSubType]?.POS_Manager_Details?.forEach((item, index) => {
    //     if (item?.name?.includes("RequestTime")) {
    //       item.hide = true;
    //     }
    //   });
    //   Data[selectedSubType]?.Bank_Fields?.forEach((item, index) => {
    //     if (item?.name?.includes("RequestTime")) {
    //       item.hide = true;
    //     }
    //   });
    //   Data[selectedSubType]?.FundTransfer_Fields?.forEach((item, index) => {
    //     if (item?.name?.includes("RequestTime")) {
    //       item.hide = true;
    //     }
    //   });
    //   Data[selectedSubType]?.BOE_Bank_Details_Fields?.forEach((item, index) => {
    //     if (item?.name?.includes("RequestTime")) {
    //       item.hide = true;
    //     }
    //   });

    //   Data[selectedSubType]?.Query_Process?.forEach((item, index) => {
    //     if (item?.name?.includes("generateFundStatement")) {
    //       item.hide = true;
    //     }
    //   });
    // }

    // loanQuotation();
    // form.resetFields();
    setActiveEmailIcons([]);
    setActiveMobileIcons([]);
    setActiveWhatsAppIcons([]);
    setShowPhoneNumber(false);
    setShowEmailAddress(false);
    setShowWhatsApp(false);
  }, [selectedSubType]); // eslint-disable-next-line arrow-body-style

  // Function to determine case type based on the business logic
  const determineCaseType = () => {
    const formValues = form.getFieldsValue();

    // Check if EarlySurrenderFlag is Y from posScreenObj or form values
    if (
      posScreenObj?.EarlySurrenderFlag?.toUpperCase() === "Y" ||
      formValues?.EarlySurrenderFlag === "yes" ||
      EarlySurrenderFlag === "yes"
    ) {
      setCaseType("EarlySurrender");
      console.log("Case Type set to: EarlySurrender");
      return "EarlySurrender";
    }

    // Check FundTransfer value from both posScreenObj and form
    const fundTransferValue =
      formValues?.FundTransfer || posScreenObj?.FundTransfer;

    if (fundTransferValue === "no") {
      setCaseType("NoFT");
      console.log("Case Type set to: NoFT");
      return "NoFT";
    } else if (fundTransferValue === "yes") {
      // Check FundTransferType from both sources
      const fundTransferType =
        formValues?.FundTransferType || posScreenObj?.FundTransferType;

      if (fundTransferType === "Full FundTransfer") {
        setCaseType("FullFT");
        console.log("Case Type set to: FullFT");
        return "FullFT";
      } else if (fundTransferType === "Partial FundTransfer") {
        setCaseType("PartialFT");
        console.log("Case Type set to: PartialFT");
        return "PartialFT";
      }
    }

    // Default fallback
    setCaseType("NoFT");
    console.log("Case Type set to default: NoFT");
    return "NoFT";
  };

  const getUploadFiles = (listOfUploadFiles) => {
    // const updatedUploadList = listOfUploadFiles?.map((obj) => {
    //   // Create a new object without the propertyToDelete property
    //   const { labelName, ...newObject } = obj;
    //   return newObject;
    // });
    // Update the state with the new list
    setUploadFiles([...docIdProofs, ...listOfUploadFiles]);
  };

  const toggleInputField = (field, item, index) => {
    setCurrentActiveLink(item.label);
    setShowEmailFields(true);
    switch (field) {
      case "phone":
        setShowPhoneNumber(!showPhoneNumber);
        setActiveMobileIcons((prevIcons) => {
          const newIcons = [...prevIcons];
          if (newIcons[index]) {
            // If the icon is already unchecked, remove its index from the array
            const indexToRemove = newIcons.indexOf(true);
            if (indexToRemove !== -1) {
              newIcons.splice(indexToRemove, 1);
            }
          } else {
            // If the icon is checked, update the array as before
            newIcons.fill(false); // Disable all email icons
            newIcons[index] = !newIcons[index]; // Enable the clicked email icon
          }
          return newIcons;
        });
        break;
      case "email":
        setShowEmailAddress(!showEmailAddress);
        setActiveEmailIcons((prevIcons) => {
          const newIcons = [...prevIcons];
          if (newIcons[index]) {
            // If the icon is already unchecked, remove its index from the array
            const indexToRemove = newIcons.indexOf(true);
            if (indexToRemove !== -1) {
              newIcons.splice(indexToRemove, 1);
            }
          } else {
            // If the icon is checked, update the array as before
            newIcons.fill(false); // Disable all email icons
            newIcons[index] = !newIcons[index]; // Enable the clicked email icon
          }
          return newIcons;
        });
        break;
      case "whatsapp":
        setShowWhatsApp(!showWhatsApp);
        setActiveWhatsAppIcons((prevIcons) => {
          const newIcons = [...prevIcons];
          if (newIcons[index]) {
            // If the icon is already unchecked, remove its index from the array
            const indexToRemove = newIcons.indexOf(true);
            if (indexToRemove !== -1) {
              newIcons.splice(indexToRemove, 1);
            }
          } else {
            // If the icon is checked, update the array as before
            newIcons.fill(false); // Disable all email icons
            newIcons[index] = !newIcons[index]; // Enable the clicked email icon
          }
          return newIcons;
        });
        break;
      default:
        break;
    }
  };

  const getClientEnquiry = () => {
    setIsLoader(true);

    let obj = {
      clientNumber: customerData?.poClientID,
    };
    let response = apiCalls.getClientEnquiry(
      obj,
      loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID
    );
    response
      .then((val) => {
        if (val?.data) {
          setClientEnquiryData(val?.data?.responseBody);
          const res = val?.data?.responseBody;

          setData({
            ...data,
            mobileNo: res?.rmblphone,
            whatsAppNo: res?.rmblphone,
            emailId: res?.rinternet,
          });
          form.setFieldsValue({
            mobileNo: res?.rmblphone,
            whatsAppNo: res?.rmblphone,
            emailId: res?.rinternet,
          });

          setIsLoader(false);
        } else {
          setIsLoader(false);
          message.error({
            content:
              val?.data?.responseBody?.errormessage ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
      })
      .catch((err) => {
        setIsLoader(false);
      });
  };

  const InitiatePennyDropp = () => {
    const values = form.getFieldsValue();
    if (!values?.BankAccountNumber || !values?.BankIFSC) {
      message.destroy();
      message.error({
        content: "Enter All Mandatory Feilds",
        className: "custom-msg",
        duration: 2,
      });
      return;
    }
    setIsLoader(true);
    let obj = {
      accountNumber: BankAccNo,
      accountHolderName:
        policyDetails?.policyDetailsObj?.identifiers?.po_Name || "",
      ifsc: values?.BankIFSC,
      consent: "Y",
      nameMatchType: "Individual",
      useCombinedSolution: "N",
      allowPartialMatch: "true",
      preset: "G",
      suppressReorderPenalty: "true",
      clientData: {
        caseId: "",
      },
    };
    var pennyPayload = {
      requestHeader: { source: "POS" },
      requestBody: obj,
    };
    let response = apiCalls.bankaccverification(pennyPayload);
    response
      .then((result) => {
        setIsLoader(false);
        if (result?.data) {
          const responseBody = result?.data?.responseBody;
          const statusCode = responseBody?.statusCode;
          const resultData = responseBody?.result;
          let pennyDropStatus = "";
          let errormessage = "";

          // Get _result string if available
          let _result = "";
          try {
            _result = resultData?.data?.source?.[0]?.data?.bankResponse || "";
          } catch (e) {
            _result = "";
          }

          // 1. Check for error codes in _result string
          if (_result.includes("402|")) {
            pennyDropStatus = "INVALID";
            errormessage = "Bank Account Verification is Failed";
          } else if (_result.includes("102|")) {
            pennyDropStatus = "INVALID";
            errormessage = "Invalid Input";
          } else if (_result.includes("104|")) {
            pennyDropStatus = "INVALID";
            errormessage = "Limit Exceeded for this bank account";
          } else if (_result.includes("ERROR|")) {
            pennyDropStatus = "INVALID";
            errormessage =
              "Real Time Bank Account Verification is currently not available";
          } else {
            // 2. Check for validity and statusAsPerSource
            const comparisionData =
              resultData?.comparisionData?.inputVsSource ||
              resultData?.comparisionData?.InputVsSource;
            const source = resultData?.data?.source?.[0];
            if (comparisionData && comparisionData.validity !== "VALID") {
              if (source?.statusAsPerSource !== "VALID") {
                pennyDropStatus = comparisionData.validity;
                errormessage = "AccountMisMatch";
              } else if (
                source?.statusAsPerSource === "VALID" ||
                comparisionData.validity !== "VALID"
              ) {
                pennyDropStatus = comparisionData.validity;
                errormessage = "NameMisMatch";
              } else {
                pennyDropStatus = comparisionData.validity;
                errormessage = "Bank Account Verification is Failed";
              }
            } else if (
              comparisionData &&
              comparisionData.validity === "VALID"
            ) {
              pennyDropStatus = comparisionData.validity;
              errormessage = "Success";
            } else if (source && source.statusAsPerSource === "VALID") {
              if (source.isValid === true) {
                pennyDropStatus = source.statusAsPerSource;
                errormessage = "Success";
              } else {
                pennyDropStatus = source.statusAsPerSource;
                errormessage = "NameMisMatch";
              }
            } else if (statusCode === 102) {
              pennyDropStatus = "INVALID";
              errormessage = "Invalid Input";
            } else if (statusCode === 104) {
              pennyDropStatus = "INVALID";
              errormessage = "Invalid Input";
            }
          }

          setPennyDropReason(errormessage);

          if (statusCode === 101) {
            setPennyDropResponse(result?.data);
            setNameReceivedInPennyDrop(
              result?.data?.responseBody?.result?.data?.source[0]?.data
                ?.accountName
            );

            // if (POSContactData && customerData?.isPOS) {
            //   form.setFieldsValue({
            //     InitiatePennyDrop: result?.data?.responseBody?.result?.data
            //       ?.source[0]?.data?.accountName
            //       ? "Success"
            //       : "Failed",
            //     NameAsPerPennyDropPos:
            //       result?.data?.responseBody?.result?.data?.source[0]?.data
            //         ?.accountName,
            //   });
            // } else {
            form.setFieldsValue({
              InitiatePennyDrop: result?.data?.responseBody?.result?.data
                ?.source[0]?.data?.accountName
                ? "Success"
                : "Failed",
              InitiatePennyDrop: result?.data?.responseBody?.result?.data
                ?.source[0]?.data?.accountName
                ? "Success"
                : "Failed",
              NameAsPerPennyDrop:
                result?.data?.responseBody?.result?.data?.source[0]?.data
                  ?.accountName,
              PennyDropReason: errormessage,
            });
            // }
          } else {
            setNameReceivedInPennyDrop(
              result?.data?.responseBody?.result?.data?.source[0]?.data
                ?.accountName
                ? "Success"
                : "Failed"
            );
            form.setFieldsValue({
              InitiatePennyDrop: result?.data?.responseBody?.result?.data
                ?.source[0]?.data?.accountName
                ? "Success"
                : "Failed",
              // InitiatePennyDropPOS: result?.data?.responseBody?.result?.data
              //   ?.source[0]?.data?.accountName
              //   ? "Success"
              //   : "Failed",
              //     PennyDropReason:errormessage,
            });
          }
          //SUCCESSFUL TRANSACTION
        } else {
          setIsLoader(false);
          setNameReceivedInPennyDrop("Invalid Input");
          form.setFieldsValue({
            InitiatePennyDrop: "Invalid Input", //,
            // InitiatePennyDropPOS: "Invalid Input",
          });
          message.error({
            content:
              result?.data?.responseBody?.errormessage ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
      })
      .catch((err) => {
        setNameReceivedInPennyDrop("Invalid Input");
        form.setFieldsValue({
          InitiatePennyDrop: "Invalid Input", //,
          // InitiatePennyDropPOS: "Invalid Input",
        });

        setIsLoader(false);
      });
  };

  const getDocLink = () => {
    const filteredLinks = isDocLinks?.filter((item) =>
      item.docType?.includes("Surrender")
    );
    // Assuming you want to return an array of links, you can use map
    const links = filteredLinks?.map((item) => item.link);
    return links?.length > 0 ? links[0] : "";
  };
  const getProcessLink = () => {
    const filteredLinks = isProcessLinks?.filter((item) =>
      item.docType?.includes("Surrender")
    );
    const links = filteredLinks?.map((item) => item.link);
    return links?.length > 0 ? links[0] : "";
  };

  const getProcesDocLnk = () => {
    setIsDocLinks([]);
    let obj = {
      Call_Typ: null,
      Sub_Typ: null,
      ProdType: policyDetails?.policyDetailsObj?.planAndStatus?.productType,
      ProdCode: policyDetails?.policyDetailsObj?.planAndStatus?.planCode,
      ProdUIN: policyDetails?.policyDetailsObj?.planAndStatus?.productUIN,
    };
    let response = apiCalls.getProcesDocLnk(obj);
    response
      .then((val) => {
        if (val?.data) {
          setIsDocLinks(val?.data);
        } else {
          message.error({
            content:
              val?.data?.responseBody?.errormessage ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
      })
      .catch((err) => {});
  };
  const getProcesLink = () => {
    setIsProcessLinks([]);
    let obj = {
      Call_Typ: props?.selectedCallType,
      Sub_Typ: props?.selectedSubTypeId,
    };
    let response = apiCalls.getProcesLink(obj);
    response
      .then((val) => {
        if (val?.data) {
          setIsProcessLinks(val?.data);
          const filteredData = val?.data?.filter((ele) => ele.docType);
          const processedData = filteredData?.map((item) => ({
            ...item,
            label: item.docType,
            value: item.docType,
          }));
          //setIsProcessNameLU(processedData);
        } else {
          message.error({
            content:
              val?.data?.responseBody?.errormessage ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
      })
      .catch((err) => {});
  };

  const handleInputChange = (e, item) => {
    if (item.name?.includes("BankIFSC") && e.target.value) {
      getIFSCBankDetails(e.target.value);
    }
  };

  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };

  const productUSP = () => {
    let doc = isDocLinks?.filter((ele) => {
      return ele?.docType === "USP";
    });

    const url = doc && doc[0]?.link;
    //const url = `https://dmsuat.fglife.in:8443/omnidocs/WebApiRequestRedirection?Application=FutureGenerali&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${policyDetails?.policyDetailsObj?.identifiers?.applicationNo}`;
    if (url) {
      window.open(url, "_blank");
    } else {
      message.destroy();
      message.error({
        content: "Product USP Not Available",
        className: "custom-msg",
        duration: 2,
      });
    }
  };

  const handleRadioLink = (item) => {
    if (item.name === "BankAccountDeDupe") {
      setShowBankDeDupeModal(true);
      let formValues = form.getFieldsValue();
      const obj = {
        lA_CustomerID: POSContactData?.customerId,
        bank_IFSC: formValues?.BankIFSC,
        acc_Number: formValues?.BankAccountNumber,
      };
      let response = apiCalls.getVerifyBankDedup(obj);
      response
        .then((val) => {
          if (val?.data) {
            setBankDeDupeData(val?.data);
          } else {
            message.error({
              content:
                val?.data?.responseBody?.errormessage ||
                "Something went wrong please try again!",
              className: "custom-msg",
              duration: 2,
            });
          }
        })
        .catch((err) => {});
    } else if (item.name === "negavativeList") {
      setNegativeModal(true);
    } else if (item.name === "SignatureChange") {
      setSignListModal(true);
    } else if (item.name === "InitiatePennyDropPOS") {
      InitiatePennyDropp();
    }
    if (item?.name?.toLowerCase().includes("surrendervaluepaid")) {
      setTotalFundModal(true);
    }

    if (
      item.name === "surrenderForm" ||
      item.name === "policyBond" ||
      item.name === "policyOwnerIDProof" ||
      item.name === "policyOwnerAccProof"
    ) {
          const gConfig= apiCalls.getGenericConfig()
          if(gConfig?.data?.dmsApiUrl){
      const url =
       gConfig?.data?.dmsApiUrl +
        `/omnidocs/WebApiRequestRedirection?Application=BPMPOLENQ&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${policyDetails?.policyDetailsObj?.identifiers?.applicationNo}`;

      window.open(url, "_blank");
          }
    }

    if (item.name === "ViewDetails") {
      const values = form.getFieldsValue();
      if (values?.STPFailedReason === "BankDe-Dupe") {
        setShowBankDeDupeModal(true);
        let formValues = form.getFieldsValue();
        const obj = {
          lA_CustomerID: POSContactData?.customerId,
          bank_IFSC: formValues?.BankIFSC,
          acc_Number: formValues?.BankAccountNumber,
        };
        let response = apiCalls.getVerifyBankDedup(obj);
        response
          .then((val) => {
            if (val?.data) {
              setBankDeDupeData(val?.data);
            } else {
              message.error({
                content:
                  val?.data?.responseBody?.errormessage ||
                  "Something went wrong please try again!",
                className: "custom-msg",
                duration: 2,
              });
            }
          })
          .catch((err) => {});
      } else if (values?.STPFailedReason === "NegativeList") {
        setNegativeListModal(true);
      } else {
        message.destroy();
        message.error({
          content: "Select STP Failed Reason",
          className: "custom-msg",
          duration: 2,
        });
      }
    }
  };
  const handleTextLink = (item) => {
    if (item.name === "BankAccountDeDupe") {
      setShowBankDeDupeModal(true);
      let formValues = form.getFieldsValue();
      const obj = {
        lA_CustomerID: POSContactData?.customerId,
        bank_IFSC: formValues?.BankIFSC,
        acc_Number: formValues?.BankAccountNumber,
      };
      let response = apiCalls.getVerifyBankDedup(obj);
      response
        .then((val) => {
          if (val?.data) {
            setBankDeDupeData(val?.data);
          } else {
            message.error({
              content:
                val?.data?.responseBody?.errormessage ||
                "Something went wrong please try again!",
              className: "custom-msg",
              duration: 2,
            });
          }
        })
        .catch((err) => {});
    } else if (item.name === "negavativeList") {
      setNegativeModal(true);
    } else if (item.name === "SignatureChange") {
      setSignListModal(true);
    }
    if (item?.name?.toLowerCase().includes("surrendervaluepaid")) {
      setTotalFundModal(true);
    }

    if (
      item.name === "surrenderForm" ||
      item.name === "policyBond" ||
      item.name === "policyOwnerIDProof" ||
      item.name === "policyOwnerAccProof"
    ) {
          const gConfig= apiCalls.getGenericConfig()
          if(gConfig?.data?.dmsApiUrl){
      const url =
        gConfig?.data?.dmsApiUrl +
        `/omnidocs/WebApiRequestRedirection?Application=BPMPOLENQ&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${policyDetails?.policyDetailsObj?.identifiers?.applicationNo}`;

      window.open(url, "_blank");
          }
    }

    if (item.name === "ViewDetails") {
      const values = form.getFieldsValue();
      if (values?.STPFailedReason === "BankDe-Dupe") {
        setShowBankDeDupeModal(true);
        let formValues = form.getFieldsValue();
        const obj = {
          lA_CustomerID: POSContactData?.customerId,
          bank_IFSC: formValues?.BankIFSC,
          acc_Number: formValues?.BankAccountNumber,
        };
        let response = apiCalls.getVerifyBankDedup(obj);
        response
          .then((val) => {
            if (val?.data) {
              setBankDeDupeData(val?.data);
            } else {
              message.error({
                content:
                  val?.data?.responseBody?.errormessage ||
                  "Something went wrong please try again!",
                className: "custom-msg",
                duration: 2,
              });
            }
          })
          .catch((err) => {});
      } else if (values?.STPFailedReason === "NegativeList") {
        setNegativeListModal(true);
      } else {
        message.destroy();
        message.error({
          content: "Select STP Failed Reason",
          className: "custom-msg",
          duration: 2,
        });
      }
    }
  };

  const POSActionsOnContactDetails = (values, status, list) => {
    let content =
      status === "REJECTED"
        ? "Please Select Documents to Reject"
        : "Please Select Documents to move  Internally";
    let seletedRequerimentList;
    let currentCaseType = determineCaseType();
    if (status === "INTERNAL") {
      seletedRequerimentList = list;
    } else if (status === "REJECTED") {
      seletedRequerimentList = raiseRequerimentList
        ?.filter((e) => e.status === true)
        ?.map((e) => e.raiseReqId);
      let dummy = "";
      seletedRequerimentList.forEach((x) => {
        dummy = x.value;
      });
    }

    if (status !== "APPROVED") {
      if (
        (seletedRequerimentList.length === 0 && status === "REJECTED") ||
        (seletedRequerimentList.length === 0 && status === "INTENAL")
      ) {
        setIsLoader(false);
        setRequirementLoader(false);
        message.destroy();
        message.error({
          content: content,
          className: "custom-msg",
          duration: 3,
        });
        return;
      }
    }
    // const formValues = form.getFieldsValue();
    let obj = {
      TransectionId: 1,
      SrvReqRefNo: POSContactData?.srvReqRefNo,
      Status: status,
      RequirementList: seletedRequerimentList,
      UsrID: loginInfo?.userProfileInfo?.profileObj?.userName,
      RoleID: loginInfo?.userProfileInfo?.profileObj?.role,
      // "RequirementComments":requirementCmnt,
      POSComments1: values?.Comments,
      TransactionPayload: [],

      caseType: currentCaseType,
      isEarlySurrender: values?.EarlySurrenderFlag === "yes" ? "Y" : "N",
      jVCreationRequest: {
        jvCreationRequests: [
          ...(Number(
            values?.PenalInterestAmount?.toString()?.replace(/,/g, "") || 0
          ) > 0
            ? [
                {
                  SrvReqID: POSContactData?.srvReqID,
                  PayoutName: "Full Surrender",
                  JEType: "PenalInterest",
                  Amount: parseFloat(
                    values.PenalInterestAmount?.toString()?.replace(/,/g, "") ||
                      0
                  ), // Convert to number
                  CreatedBy:
                    loginInfo?.userProfileInfo?.profileObj.allRoles?.[0]
                      ?.employeeID || "",
                },
              ]
            : []),
          ...(Number(values?.TDSAmount?.toString()?.replace(/,/g, "") || 0) > 0
            ? [
                {
                  SrvReqID: POSContactData?.srvReqID,
                  PayoutName: "Full Surrender",
                  JEType: "TDS",
                  Amount: parseFloat(
                    values.TDSAmount?.toString()?.replace(/,/g, "") || 0
                  ), // Convert to number
                  CreatedBy:
                    loginInfo?.userProfileInfo?.profileObj.allRoles?.[0]
                      ?.employeeID || "",
                },
              ]
            : []),
          ...(Number(
            values?.InterestAmount?.toString()?.replace(/,/g, "") || 0
          ) > 0
            ? [
                {
                  SrvReqID: POSContactData?.srvReqID,
                  PayoutName: "Full Surrender",
                  JEType: "Interest",
                  Amount: parseFloat(
                    values.InterestAmount?.toString()?.replace(/,/g, "") || 0
                  ), // Convert to number
                  CreatedBy:
                    loginInfo?.userProfileInfo?.profileObj.allRoles?.[0]
                      ?.employeeID || "",
                },
              ]
            : []),
          ...(Number(
            values?.FundTransferAmount?.toString()?.replace(/,/g, "") || 0
          ) > 0
            ? [
                {
                  SrvReqID: POSContactData?.srvReqID,
                  PayoutName: "Full Surrender",
                  JEType: "FundTransfer",
                  Amount: parseFloat(
                    values.FundTransferAmount?.toString()?.replace(/,/g, "") ||
                      0
                  ), // Convert to number instead of string
                  CreatedBy:
                    loginInfo?.userProfileInfo?.profileObj.allRoles?.[0]
                      ?.employeeID || "",
                },
              ]
            : []),
        ],

        isAutoJEApprove: true,
        PayoutName: "Full Surrender",
        policyNo: policyDetails?.policyDetailsObj?.identifiers?.policyNo || "",
        clientId:
          policyDetails?.policyDetailsObj?.identifiers?.po_ClientID || "",
        productCode:
          policyDetails?.policyDetailsObj?.planAndStatus?.planCode || "",
      },
    };
    if (status === "INTERNAL") {
      obj.TransactionPayload.push({
        Status: "create",
        TagName: "InternalRequirementValue",
        TagValue: JSON.stringify(seletedRequerimentList),
      });
    }

    if (loggedUser?.role === 5) {
      obj.TransactionPayload.push(
        {
          Status: "Create",
          TagName: "STPFailedReason",
          TagValue: values?.STPFailedReason,
        },
        {
          Status: "Create",
          TagName: "Decision",
          TagValue: values?.Decision,
        },
        {
          Status: "Create",
          TagName: "SendEmailtoCompliance",
          TagValue: values?.SendEmailtoCompliance,
        }
      );
    }
    if (loggedUser?.role === 4) {
      obj.TransactionPayload.push(
        {
          Status: "Update",
          TagName: "NameAsMentionedInTheBank",
          TagValue: values?.NameAsMentionedInTheBank,
        },
        {
          Status: "Update",
          TagName: "BankIFSC",
          TagValue: values?.BankIFSC?.toUpperCase(),
        },
        {
          Status: "Update",
          TagName: "BankAccountNumber",
          TagValue: values?.BankAccountNumber,
        },
        {
          Status: "Update",
          TagName: "BankName",
          TagValue: values?.BankName,
        },
        {
          Status: "Update",
          TagName: "BranchName",
          TagValue: values?.BranchName || "",
        },
        {
          Status: "Update",
          TagName: "AccountType",
          TagValue: values?.AccountType.label || "",
        },
        {
          Status: "Update",
          TagName: "InitiatePennyDrop",
          TagValue: values?.InitiatePennyDrop,
        },
        {
          Status: "Create",
          TagName: "BankAccountDeDupe",
          TagValue: values?.BankAccountDeDupe,
        },
        {
          Status: "Create",
          TagName: "NameMatchPOS",
          TagValue: values?.NameMatchPOS || "",
        },

        {
          Status: "Update",
          TagName: "EffectiveSurrenderValue",
          TagValue: String(values?.EffectiveSurrenderValue || "").replace(
            /,/g,
            ""
          ),
        },
        {
          Status: "Update",
          TagName: "FundTransferAmount",
          TagValue: String(values?.FundTransferAmount || "").replace(/,/g, ""),
        },
        {
          Status: "Create",
          TagName: "PayeeCodeAmount",
          TagValue: String(values?.PayeeCodeAmount || "").replace(/,/g, ""),
        },
        {
          Status: "Create",
          TagName: "TDSAmount",
          TagValue: String(values?.TDSAmount || "").replace(/,/g, ""),
        },
        {
          Status: "Create",
          TagName: "PenalInterestAmount",
          TagValue: String(values?.PenalInterestAmount || "").replace(/,/g, ""),
        },
        {
          Status: "Create",
          TagName: "InterestAmount",
          TagValue: String(values?.InterestAmount || "").replace(/,/g, ""),
        },
        {
          Status: "Create",
          TagName: "RequestFor",
          TagValue: values?.RequestFor,
        },
        {
          Status: "Create",
          TagName: "ChangeInLast60Days",
          TagValue: values?.ChangeInLast60Days,
        },
        {
          Status: "Create",
          TagName: "SignatureChange",
          TagValue: values?.SignatureChange,
        },
        {
          Status: "Create",
          TagName: "RequestTimePOS",
          TagValue: values?.RequestTimePOS || "",
        },
        {
          Status: "Create",
          TagName: "CustSignDateTimePOS",
          TagValue: new Date(values?.CustSignDateTimePOS) || "",
        },
        {
          Status: "Create",
          TagName: "BranchReceivedDatePOS",
          TagValue: new Date(values?.BranchReceivedDatePOS) || "",
        },
        {
          Status: "Create",
          TagName: "isBlacklisted",
          TagValue: isBlacklistedPolicy ? "yes" : "no" || "",
        },
        {
          Status: "Create",
          TagName: "isBlacklistedVerified",
          TagValue: values.isBlacklistedPolicy ? "yes" : "no" || "",
        },
        {
          Status: "Create",
          TagName: "isBannedEntityVerified",
          TagValue: values?.negativeListVerification || "",
        },

        {
          Status: "Create",
          TagName: "AuthorizerCommentsPOS",
          TagValue: values.CommentsPOS || "",
        },
        {
          Status: "Create",
          TagName: "planCode",
          TagValue:
            policyDetails?.policyDetailsObj?.planAndStatus?.planCode || "",
        },
        {
          Status: "Create",
          TagName: "planName",
          TagValue:
            policyDetails?.policyDetailsObj?.planAndStatus?.planName || "",
        },
        {
          Status: "Create",
          TagName: "PayeeName",
          TagValue: values.PayeeName || "",
        },
        {
          Status: "Create",
          TagName: "caseType",
          TagValue: currentCaseType || "",
        }
      );
    }
    setIsLoader(true);
    //console.log(obj);
    //let response;
    let response = apiCalls.POSActionsOnServReqSurrender(obj);
    response
      .then((val) => {
        if (val?.data) {
          setAlertTitle(`${val?.data?.message}`);
          setNavigateTo(
            (showRaiseRequirementBtn && "/advancesearch") || "/dashboard"
          );
          setAlertData(`${"Ticket No " + val?.data?.srvReqRefNo}`);
          setShowAlert(true);
        } else {
          message.error({
            content:
              val?.data?.responseBody?.errormessage ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
        setIsLoader(false);
        setRequirementLoader(false);
      })
      .catch((err) => {
        setIsLoader(false);
        setRequirementLoader(false);
      });
  };

  const getRaiseRequirements = () => {
    const formData = form.getFieldValue();
    setRaiseRequirementOpen(true);
    setRequirementLoader(true);
    let obj = {
      calltype: props?.selectedCallType,
      subtype: 3,
      Role: loginInfo?.userProfileInfo?.profileObj?.role === 1 ? 1 : 0,
    };
    let response = apiCalls.getRaiseRequirements(obj);
    response
      .then((val) => {
        if (val?.data) {
          setRaiseRequerimentList(val?.data);
          setRequirementLoader(false);
        } else {
          setRequirementLoader(false);
          message.error({
            content:
              val?.data?.responseBody?.errormessage ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
      })
      .catch((err) => {
        setRequirementLoader(false);
      });
  };

  const handleRequirementSubmit = () => {
    const formData = form.getFieldValue();
    setRequirementLoader(true);

    //   let seletedRequerimentList = raiseRequerimentList
    //   ?.filter((e) => e.status === true)
    //   ?.map((e) => e.raiseReqId);
    //   if(seletedRequerimentList.length===0 ){
    //     setIsLoader(false);
    //     setRequirementLoader(false);
    //     message.destroy();
    //     message.error({
    //       content: "Please Select Documents to Reject",
    //       className: "custom-msg",
    //       duration: 3,
    //     });
    //   return;
    //   }

    //  else{
    //     saveRequest(formData);
    //  }
    if (isShowPOSScreen) {
      POSActionsOnContactDetails(formData, "REJECTED", null);
    } else {
      saveRequest(formData);
    }
  };
  const popupClose = () => {
    setRaiseRequirementOpen(false);
  };

  const handleSubmit = (values) => {
    if (POSContactData && customerData?.isPOS) {
      if (clickedButton === "RaiseRequirement") {
        getRaiseRequirements();
      } else if (clickedButton === "POSApprove") {
        POSActionsOnContactDetails(values, "APPROVED", null);
      }
    } else {
      saveRequest();
    }
  };

  const sum = (val1, val2, totalTdsValue) => {
    let value1 = val1 ? parseFloat(val1.replace(/,/g, "")) : 0;
    let value2 = val2 ? parseFloat(val2.replace(/,/g, "")) : 0;
    let totalTds = totalTdsValue ? parseFloat(totalTdsValue) : 0;
    let result = value1 - value2 - totalTds;
    return result.toLocaleString("en-IN");
  };

  const saveRequest = () => {
    setIsLoader(true);
    setShowAlert(false);
    const values = form.getFieldsValue();

    const uniqueFilesSet = new Set();
    const newFilesArray = [];
    if (uploadFiles?.length > 0) {
      uploadFiles.forEach((file) => uniqueFilesSet.add(file));
    }
    if (uploadMultipleFiles?.length > 0) {
      uploadMultipleFiles.forEach((file) => uniqueFilesSet.add(file));
    }

    if (isIDUploadMultipleFiles?.length > 0) {
      isIDUploadMultipleFiles.forEach((file) => uniqueFilesSet.add(file));
    }
    newFilesArray.push(...uniqueFilesSet);
    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: subTypeId[selectedSubType], // Required
      Category:
        selectedSubType === "rechecksurrenderpayout" ||
        raiseRequirementOpen ||
        selectedSubType === "surrenderrequest"
          ? 2
          : assistFor[values?.assistFor], //Assist For
      CustomerId: customerData?.laClientID,
      CustRole: 1,
      RequestSource: loginInfo?.userProfileInfo?.profileObj?.sourceId || 0, // Required
      RequestChannel: 3, // Required
      ApplicationNo:
        policyDetails?.policyDetailsObj?.identifiers?.applicationNo,
      PolicyNo: policyDetails?.policyDetailsObj?.identifiers?.policyNo,
      proposerName: policyDetails?.policyDetailsObj?.identifiers?.po_Name,
      policyStatus:
        policyDetails?.policyDetailsObj?.planAndStatus?.policyStatus,
      plan: policyDetails?.policyDetailsObj?.planAndStatus?.planName,
      DOB: convertDate(customerData?.dob),
      CreatedOn: new Date(),
      CreatedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
      CreatedUsrId: loginInfo?.userProfileInfo?.profileObj?.userName,
      ModifiedOn: new Date(),
      ModifiedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
      AssignedToRole: "", //POS
      AssignedByUser: 0,
      ReasonForChange: "",
      RequestDateTime: new Date(),
      CustSignDateTime: values?.CustSignDateTime
        ? new Date(values?.CustSignDateTime)
        : new Date(),
      TransactionData: [],
      CurrentStatus: raiseRequirementOpen ? "Reject" : "",
      Uploads: newFilesArray || [],
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
          // "ReceipientTo": customerData?.emailID,
          // "ReceipientCC": customerData?.emailID,
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

    if (
      selectedSubType === "surrenderrequest" &&
      values?.FundTransfer === "yes"
    ) {
      obj.TransactionData.push(
        {
          Status: "Create",
          TagName: "TotalSurrenderValue",
          TagValue: values?.TotalSurrenderValue || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
        {
          Status: "Create",
          TagName: "EarlySurrenderFlag",
          TagValue: values?.EarlySurrenderFlag || "",
        },
        {
          Status: "Create",
          TagName: "FundTransfer",
          TagValue: values?.FundTransfer || "",
        },
        {
          Status: "Create",
          TagName: "FundTransferAmount",
          TagValue: values?.FundTransferAmount || "",
        },
        {
          Status: "Create",
          TagName: "FundTransferType",
          TagValue: values?.FundTransferType || "",
        },
        {
          Status: "Create",
          TagName: "surrenderreason",
          TagValue: values?.surrenderreason || "",
        },

        {
          Status: "Create",
          TagName: "RequestTime",
          TagValue: values?.RequestTime || "",
        },
        {
          Status: "Create",
          TagName: "BankIFSC",
          TagValue: values?.BankIFSC?.toUpperCase() || "",
        },
        {
          Status: "Create",
          TagName: "BankName",
          TagValue: values?.BankName || "",
        },
        {
          Status: "Create",
          TagName: "BranchName",
          TagValue: values?.BranchName || "",
        },
        {
          Status: "Create",
          TagName: "AccountType",
          TagValue: values?.AccountType || "",
        },
        {
          Status: "Create",
          TagName: "BankAccountNumber",
          TagValue: BankAccNo || "",
        },
        {
          Status: "Create",
          TagName: "ConfirmBankAccountNumber",
          TagValue: CNFBankAccNo || "",
        },
        {
          Status: "Create",
          TagName: "NameAsPerPennyDrop",
          TagValue: values?.NameAsPerPennyDrop || "",
        },

        {
          Status: "Create",
          TagName: "PennyDropResponse",
          TagValue: JSON.stringify(PennyDropResponse) || "",
        },
        {
          Status: "Create",
          TagName: "NameReceivedinPennyDrop",
          TagValue: NameReceivedInPennyDrop ? NameReceivedInPennyDrop : "",
        },
        {
          Status: "Create",
          TagName: "PennyDropReason",
          TagValue: JSON.stringify(PennyDropReason) || "",
        },
        {
          Status: "Create",
          TagName: "NameMatch",
          TagValue: values?.NameMatch || "",
        },
        {
          Status: "Create",
          TagName: "CustSignDateTime",
          TagValue: new Date(values?.CustSignDateTime) || "",
        },
        {
          Status: "Create",
          TagName: "BranchReceivedDate",
          TagValue: new Date(values?.BranchReceivedDate) || "",
        },
        {
          Status: "Create",
          TagName: "ValidateSignature",
          TagValue: values?.ValidateSignature || "",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },

        {
          Status: "Create",
          TagName: "PTD",
          TagValue:
            convertDate(policyDetails?.policyDetailsObj?.premiumDetails?.ptd) ||
            "",
        },
        {
          Status: "Create",
          TagName: "POName",
          TagValue: customerData?.poName || "",
        },
        {
          Status: "Create",
          TagName: "ProductType",
          TagValue:
            policyDetails?.policyDetailsObj?.planAndStatus?.productType || "",
        },
        {
          Status: "Create",
          TagName: "RCD",
          TagValue:
            convertDate(policyDetails?.policyDetailsObj?.saDetails?.rcd) || "",
        },
        {
          Status: "Create",
          TagName: "APE",
          TagValue: customerData?.premiumAmt || "",
        },
        {
          Status: "Create",
          TagName: "poClientID",
          TagValue: customerData?.poClientID || "",
        },
        {
          Status: "Create",
          TagName: "EffectiveSurrenderValue",
          TagValue: values?.EffectiveSurrenderValue || "",
        }
      );
    } else if (
      selectedSubType === "surrenderrequest" &&
      values?.FundTransfer === "no"
    ) {
      obj.TransactionData.push(
        {
          Status: "Create",
          TagName: "TotalSurrenderValue",
          TagValue: values?.TotalSurrenderValue || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
        {
          Status: "Create",
          TagName: "FundTransfer",
          TagValue: values?.FundTransfer || "",
        },
        {
          Status: "Create",
          TagName: "FundTransferAmount",
          TagValue: "0",
        },
        {
          Status: "Create",
          TagName: "EarlySurrenderFlag",
          TagValue: values?.EarlySurrenderFlag || "",
        },
        {
          Status: "Create",
          TagName: "surrenderreason",
          TagValue: values?.surrenderreason || "",
        },

        {
          Status: "Create",
          TagName: "RequestTime",
          TagValue: values?.RequestTime || "",
        },
        {
          Status: "Create",
          TagName: "BankIFSC",
          TagValue: values?.BankIFSC?.toUpperCase() || "",
        },
        {
          Status: "Create",
          TagName: "BankName",
          TagValue: values?.BankName || "",
        },
        {
          Status: "Create",
          TagName: "BranchName",
          TagValue: values?.BranchName || "",
        },
        {
          Status: "Create",
          TagName: "AccountType",
          TagValue: values?.AccountType || "",
        },
        {
          Status: "Create",
          TagName: "BankAccountNumber",
          TagValue: BankAccNo || "",
        },
        {
          Status: "Create",
          TagName: "ConfirmBankAccountNumber",
          TagValue: CNFBankAccNo || "",
        },
        {
          Status: "Create",
          TagName: "NameAsPerPennyDrop",
          TagValue: values?.NameAsPerPennyDrop || "",
        },
        {
          Status: "Create",
          TagName: "PennyDropReason",
          TagValue: JSON.stringify(PennyDropReason) || "",
        },
        {
          Status: "Create",
          TagName: "NameReceivedinPennyDrop",
          TagValue: NameReceivedInPennyDrop ? NameReceivedInPennyDrop : "",
        },

        {
          Status: "Create",
          TagName: "NameMatch",
          TagValue: values?.NameMatch || "",
        },
        {
          Status: "Create",
          TagName: "CustSignDateTime",
          TagValue: new Date(values?.CustSignDateTime) || "",
        },
        {
          Status: "Create",
          TagName: "BranchReceivedDate",
          TagValue: new Date(values?.BranchReceivedDate) || "",
        },
        {
          Status: "Create",
          TagName: "ValidateSignature",
          TagValue: values?.ValidateSignature || "",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "PTD",
          TagValue:
            convertDate(policyDetails?.policyDetailsObj?.premiumDetails?.ptd) ||
            "",
        },
        {
          Status: "Create",
          TagName: "POName",
          TagValue: customerData?.poName || "",
        },
        {
          Status: "Create",
          TagName: "ProductType",
          TagValue:
            policyDetails?.policyDetailsObj?.planAndStatus?.productType || "",
        },
        {
          Status: "Create",
          TagName: "RCD",
          TagValue:
            convertDate(policyDetails?.policyDetailsObj?.saDetails?.rcd) || "",
        },
        {
          Status: "Create",
          TagName: "APE",
          TagValue: customerData?.premiumAmt || "",
        },
        {
          Status: "Create",
          TagName: "poClientID",
          TagValue: customerData?.poClientID || "",
        },
        {
          Status: "Create",
          TagName: "EffectiveSurrenderValue",
          TagValue: values?.EffectiveSurrenderValue || "",
        }
      );
    }
    if (raiseRequirementOpen) {
      let reqFormValues = requirementsForm?.getFieldsValue();
      let ids = raiseRequerimentList
        ?.filter((e) => e.status === true)
        ?.map((e) => e.raiseReqId);

      obj.TransactionData.push({
        Status: "Create",
        TagName: "ReasonList_Key",
        TagValue: JSON.stringify(ids),
      });
      obj.TransactionData.push({
        Status: "Create",
        TagName: "CustomerType",
        TagValue: policyDetails?.policyDetailsObj?.planAndStatus?.customerType,
      });
      obj.TransactionData?.push({
        Status: "Create",
        TagName: "AddAnyOtherRequirements",
        TagValue: reqFormValues?.addotherReq || "",
      });
      if (ids?.length === 0 && !props?.EmailResponse?.IsEmailmanagent) {
        message.error({
          content: "Please Select Documents to Reject",
          className: "custom-msg",
          duration: 3,
        });
        setRequirementLoader(false);
        return;
      }
    }
    if (props?.EmailResponse?.IsEmailmanagent) {
      obj.TransactionData.push(
        {
          Status: "Create",
          TagName: "EmailResponseId",
          TagValue: props?.EmailResponse?.EmailResponseId || "",
        },
        {
          Status: "Create",
          TagName: "CustomerName",
          TagValue: clientEnquiryData?.lgivname + clientEnquiryData?.lsurname,
        }
      );
    }
    let surrenderObj = {
      PolicyNumber: customerData?.policyNo,
      requestTime: values?.RequestTime || "",
      custSignDateTime: new Date(values?.CustSignDateTime),
      surrenderReason: values?.surrenderreason || "",
      isEarlySurrenderFlag: values?.EarlySurrenderFlag || "",
      userId: loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID,
    };
    let surrenderRegistrationResponse =
      apiCalls.SurrenderRegistration(surrenderObj);

    surrenderRegistrationResponse
      .then((surrenderResult) => {
        if (
          surrenderResult?.data &&
          surrenderResult?.data?.responseOutput?.responseBody?.errormessage ===
            "0"
        ) {
          // If Surrenderregisttration is successful, then call genericAPI
          let response = apiCalls.genericAPI(obj);

          response
            .then((val) => {
              if (val?.data) {
                if (!val?.data?.srvReqRefNo) {
                  setAlertTitle(val?.data?.header);
                  setAlertData(val?.data?.message);
                  setShowAlert(true);
                  setIsLoader(false);
                  setRequirementLoader(false);
                  return;
                }
                setIsLoader(false);
                setRequirementLoader(false);
                if (val?.data?.category == 2) {
                  setAlertTitle(`Request Created Successfully`);
                  let successMessage =
                    val?.data?.tat > 0
                      ? `Ticket ID Number ${
                          val?.data?.srvReqRefNo
                        }. Your request will be processed in ${
                          val?.data?.tat || 0
                        } days`
                      : `Ticket ID Number ${val?.data?.srvReqRefNo}.`;
                  setAlertData(successMessage);
                } else {
                  setAlertTitle("Query Raised Successfully");
                  let successMessage = `Ticket ID Number ${val?.data?.srvReqRefNo}.`;
                  setAlertData(successMessage);
                }

                if (
                  selectedSubType === "surrenderrequest" ||
                  selectedSubType === "rechecksurrenderpayout" ||
                  (selectedSubType === "surrenderretention" &&
                    formFeilds?.customerRetained === "yes")
                ) {
                  //setNavigateTo("/advancesearch");
                }

                setShowAlert(true);
                if (selectedSubType === "surrenderquery") {
                  setShowQueryFields(false);
                  setShowRequestFields(false);
                  setShowRetentionFields(true);
                  //setNavigateTo("/advancesearch");
                } else if (
                  selectedSubType === "surrenderretention" &&
                  formFeilds?.customerRetained === "no"
                ) {
                  setSelectedSubType("surrenderrequest");
                  surrenderForm?.setFieldsValue({ subType: 1 });
                  setShowQueryFields(false);
                  setShowRetentionFields(false);
                  setShowRequestFields(true);
                }
              } else {
                message.error({
                  content:
                    val?.data?.responseBody?.errormessage ||
                    "Something went wrong please try again!",
                  className: "custom-msg",
                  duration: 2,
                });
              }
              setIsLoader(false);
              setRequirementLoader(false);
            })
            .catch((err) => {
              setIsLoader(false);
              setRequirementLoader(false);
            });
        } else {
          // If Surrenderregisttration fails, don't call genericAPI
          setIsLoader(false);
          setRequirementLoader(false);
          message.error({
            content:
              surrenderResult?.data?.responseOutput?.responseBody
                ?.errormessage ||
              "Surrender registration failed. Please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
      })
      .catch((err) => {
        // If Surrenderregisttration fails, don't call genericAPI
        setIsLoader(false);
        setRequirementLoader(false);
        message.error({
          content: "Surrender registration failed. Please try again!",
          className: "custom-msg",
          duration: 2,
        });
      });
  };

  const getInternal = (list) => {
    let values = form.getFieldsValue();
    POSActionsOnContactDetails(values, "INTERNAL", list);
  };

  const surrenderEnquiryData = () => {
    setIsLoader(true);
    let obj = {
      RequestHeader: {
        source: "POS",
        carrierCode: "2",
        branch: "PRA",
        userId: loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID,
        userRole: "10",
        monthEndExtension: "N",
        meDate: "30/09/2023",
      },
      RequestBody: {
        policyNo: customerData?.policyNo,
        effectiveDate: moment(new Date(), "YYYYMMDD").format("YYYYMMDD"),
        // effectiveDate:"20251030",
        letterprintflag: "N",
      },
    };
    let response = apiCalls.surrenderEnquiryData(obj);
    response
      .then((val) => {
        if (val?.data) {
          setSurrenderEnquiryD(val?.data?.responseBody);

          if (val?.data?.responseBody?.errorcode === "1") {
            setTotalSurrenderAmount(0);
            form.setFieldsValue({ TotalSurrenderValue: 0 });
            finalPaymentForm.setFieldsValue({ totalSurrenderAmount: 0 });
            if (val?.data?.responseBody?.errormessage) {
              setAlertTitle(val?.data?.responseBody?.errormessage);
            } else {
              setAlertTitle("Unable to fetch Surrender Value");
            }

            // setAlertData(`${"Ticket No " + val?.data?.srvReqRefNo}`);

            //setNavigateTo("/advancesearch");

            setShowAlert(true);
          } else {
            let amount = 0;
            if (
              policyDetails?.policyDetailsObj?.planAndStatus?.productType ===
              "UL"
            ) {
              amount = Number(
                val?.data?.responseBody?.estimtotal
              ).toLocaleString("en-IN");
            } else {
              amount = Number(
                val?.data?.responseBody?.totalsurrendervalue
              ).toLocaleString("en-IN");
            }
            let policyloan = Number(
              val?.data?.responseBody?.policyloan
            ).toLocaleString("en-IN");
            setTotalSurrenderAmount(amount);
            setLoanValue(policyloan);
            form.setFieldsValue({
              //TotalSurrenderValue: sum(amount, policyloan),
              TotalSurrenderValue: amount,
            });
            form.setFieldsValue({
             // EffectiveSurrenderValue: sum(amount, policyloan),
              EffectiveSurrenderValue: amount,
            });
            // finalPaymentForm.setFieldsValue({
            //   totalSurrenderAmount: amount,
            //   LessLoan: policyloan,
            // });
            calculateTotal();
          }
        } else {
          message.error({
            content:
              val?.data?.responseBody?.errormessage ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }

        setIsLoader(false);
      })
      .catch((err) => {
        setIsLoader(false);
      });
  };

  const GetSurrenderEarlyFlag = () => {
    setIsLoader(true);
    if (policyDetails?.policyDetailsObj?.planAndStatus?.productType === "UL") {
      let obj = {
        RequestHeader: {
          source: "POS",
          policyNo: customerData?.policyNo,
          applicationNo: "",
          dob: "",
        },
        RequestBody: {
          policyNo: customerData?.policyNo,
        },
      };
      let response = apiCalls.GetSurrenderEarlyFlag(obj);
      response
        .then((val) => {
          if (val?.data) {
            //setSurrenderEnquiryD(val?.data?.responseBody);

            if (val?.data?.responseBody?.errorcode === "1") {
              setEarlySurrenderFlag("no");
              form.setFieldsValue({ EarlySurrenderFlag: "no" });
            } else {
              if (val?.data?.responseBody?.esR_Flag === "Y") {
                setEarlySurrenderFlag("yes");
                form.setFieldsValue({ EarlySurrenderFlag: "yes" });
              } else {
                setEarlySurrenderFlag("no");
                form.setFieldsValue({ EarlySurrenderFlag: "no" });
              }
            }
          } else {
            message.error({
              content:
                val?.data?.responseBody?.errormessage ||
                "Something went wrong please try again!",
              className: "custom-msg",
              duration: 2,
            });
            setEarlySurrenderFlag("no");
            form.setFieldsValue({ EarlySurrenderFlag: "no" });
          }

          setIsLoader(false);
        })
        .catch((err) => {
          setIsLoader(false);
        });
    } else {
      //No Early Surrender for Non UL
      setEarlySurrenderFlag("no");
      form.setFieldsValue({ EarlySurrenderFlag: "no" });
    }
  };

  const penalInterestData = (tdsAmount = 0) => {
    setIsLoader(true);

    let response = apiCalls.getPenalInterestData(
      props?.customerData?.serialNo,
      "Surrender",
      tdsAmount
    );
    response
      .then((val) => {
        if (val?.data) {
          if (val?.data?.penalInterestAmount) {
            setPenalInterestAmount(val?.data?.penalInterestAmount);
            form.setFieldsValue({
              PenalInterestAmount: val?.data?.penalInterestAmount,
            });
            setInterestAmount(val?.data?.interestAmount);
            form.setFieldsValue({
              InterestAmount: val?.data?.interestAmount,
            });

            //setShowAlert(true);
          } else {
            setPenalInterestAmount(0);
            form.setFieldsValue({ PenalInterestAmount: 0 });
            form.setFieldsValue({ InterestAmount: 0 });
          }
        } else {
          setPenalInterestAmount(0);
          setInterestAmount(0);
          form.setFieldsValue({ PenalInterestAmount: 0 });
          form.setFieldsValue({ InterestAmount: 0 });
        }

        setIsLoader(false);
        calculateTotal();
      })
      .catch((err) => {
        setIsLoader(false);
        calculateTotal();
      });
  };

  const partialWithdrawalEnquiry = () => {
    setIsLoader(true);
    let obj = {
      requestHeader: {
        source: "POS",
        carrierCode: "2",
        Branch: "PRA",
        userId: "website",
        userRole: "10",
        partnerId: "MSPOS",
        processId: "POS",
        monthendExtension: "N",
        monthendDate: "09/12/2023",
      },
      requestBody: {
        PolicyNumber: customerData?.policyNo,
      },
    };

    let response = apiCalls.getPartialWithdrawalEnquiry(obj);
    response
      .then((val) => {
        if (val?.data) {
          setpartialWithdrawalEnquiryd(val?.data?.responseBody);
          setpwAvailableModal(true);
        } else {
          message.error({
            content:
              val?.data?.responseBody?.errormessage ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
        setIsLoader(false);
      })
      .catch((err) => {
        setIsLoader(false);
      });
  };

  //   const loanQuotation = (vall) => {
  //     setIsLoader(true);
  //     let obj = {
  //       RequestHeader: {
  //         source: "POS",
  //         carrierCode: "2",
  //         branch: "pra",
  //         userId: loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID,
  //         userRole: "10",
  //         monthEndExtension: "N",
  //         MonthendDate: "30/09/2023",
  //       },
  //       RequestBody: {
  //         //         "policyNo": customerData?.policyNo,
  //         //  "EffectiveDate": moment(new Date(), 'YYYYMMDD').format('YYYYMMDD'),
  //         policyNo: customerData?.policyNo,
  //         effectiveDate: moment(new Date(), "YYYYMMDD").format("YYYYMMDD"),

  //         LFLAG: "",
  //         YNFLAG: "",
  //         ZDOCRET: "",
  //       },
  //     };

  //     let response = apiCalls.loanQuotationn(obj);
  //     response
  //       .then((val) => {
  //         if (val?.data?.responseBody?.loanallow) {
  //           setLoanQuotationData(val?.data?.responseBody);
  //           if (vall) {
  //             setloanAvailableModal(true);
  //           }
  //         } else {
  //           setLoanQuotationData(val?.data);
  //           message.error({
  //             content: "No Loan Available",
  //             className: "custom-msg",
  //             duration: 2,
  //           });
  //         }
  //         setIsLoader(false);
  //       })
  //       .catch((err) => {
  //         setIsLoader(false);
  //       });
  //   };

  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day"); // Can not select days before today and today
  };

  const handleLabelLink = (item) => {
    setTotalFundModal(false);
    setFinalPayableAmtModal(false);
    if (item?.name?.toLowerCase().includes("totalsurrendervalue")) {
      setTotalFundModal(true);
    } else if (item?.name?.toLowerCase().includes("payeecodeamount")) {
      finalPaymentForm.setFieldsValue({
        totalSurrenderAmount: form.getFieldValue("EffectiveSurrenderValue"),
        LessTDS: form.getFieldValue("TDSAmount") || "",
        PenalInterest: form.getFieldValue("PenalInterestAmount") || "",
        Interest: form.getFieldValue("InterestAmount") || "",
        FinalPayableAmount: form.getFieldValue("PayeeCodeAmount") || "",
      });

      setFinalPayableAmtModal(true);
    }

    if (item.label === "Initiate Penny Drop") {
      InitiatePennyDropp();
    }
    if (
      item.name === "InitiatePennyDropPOS" &&
      formFeilds.InitiatePennyDrop === "Invalid Input"
    ) {
      InitiatePennyDropp();
    }
  };
  const onBlurInput = (value, item) => {
    const obj = form.getFieldsValue();

    if (item.name === "BankIFSC" && value) {
      getIFSCBankDetails(value);
    }

    if (item.name === "ConfirmBankAccountNumber") {
      setCNFBankAccNo(value);
    } else if (item.name === "BankAccountNumber") {
      setBankAccNo(value);
    }

    if (item.name === "ConfirmBankAccountNumber") {
      if (BankAccNo !== value) {
        message.destroy();
        message.error({
          content: "Bank Number Not matched",
          className: "custom-msg",
          duration: 2,
        });
        form.setFieldsValue({ ConfirmBankAccountNumber: "" });
      }
      //  const lastFourDigits = obj.ConfirmBankAccountNumber.slice(-4);
      //  const maskedString = '*'.repeat(obj.ConfirmBankAccountNumber.length - 4) + lastFourDigits;
      //  form.setFieldsValue({ConfirmBankAccountNumber: maskedString});
    } else if (value?.length >= 4 && item.name === "BankAccountNumber") {
      const lastFourDigits = obj.BankAccountNumber.slice(-4);
      const maskedString =
        "*".repeat(obj.BankAccountNumber.length - 4) + lastFourDigits;
      form.setFieldsValue({ BankAccountNumber: maskedString });
    }

    if (item?.name?.includes("FundTransferAmount")) {
      if (
        Number(value.replace(/,/g, "")) >
        Number(totalSurrenderAmount.replace(/,/g, ""))
      ) {
        form.setFieldsValue({
          FundTransferAmount: "",
          BalanceAmountForSurrender: "",
        });
        message.error({
          content:
            "Fund Transfer Amount Should not exceed Total Surrender Value",
          className: "custom-msg",
          duration: 2,
        });
        return;
      }
      const remainingSurrVal = String(
        Number(totalSurrenderAmount.replace(/,/g, "")) -
          Number(value.replace(/,/g, ""))
      );
      form.setFieldsValue({ EffectiveSurrenderValue: remainingSurrVal });
      if (customerData?.isPOS) calculateTotal();
    }
    if (item.name === "TDSAmount") {
      const tdsAmount = parseFloat(value?.toString()?.replace(/,/g, "")) || 0;
      penalInterestData(tdsAmount);
    }
  };

  const setInternalReqData = () => {
    POSContactData.serviceRequestTransectionData?.forEach((element) => {
      if (element.tagName === "InternalRequirementValue") {
        setInternalFlowRequirements(props.interlRequirementTagValue);
      }
    });
  };

  const getIFSCBankDetails = async (ifscCode) => {
    let response = await apiCalls.getIFSCBanks(ifscCode);
    if (response.status === 200) {
      if (response?.data.length > 0) {
        form.setFieldsValue({
          BankName: response?.data[0]?.bank,
          BranchName: response?.data[0]?.branch,
        });
      } else {
        message.error({
          content: response?.data?.responseBody?.errormessage || "Invalid IFSC",
          className: "custom-msg",
          duration: 2,
        });

        form.setFieldsValue({
          BankIFSC: "",
          BankName: "",
        });
      }
    }
  };

  const date_diff_indays = function (date1, date2) {
    const dt1 = new Date(date1);
    const dt2 = new Date(date2);
    return Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
    );
  };

  const handleDateChange = (date, item) => {
    if (item === "BranchReceivedDate" || item.name === "BranchReceivedDate") {
      setShowReasonDelayField(false);
      Data[selectedSubType]?.FundTransfer_Fields?.forEach((item, index) => {
        if (item.d_BranchReceivedDate) {
          item.hide = true;
        }
      });

      let newDate = new Date();
      let todayDate = moment(newDate).format("MM/DD/YYYY");
      let selectDate = moment(date + 1).format("MM/DD/YYYY");
      const formFeilds = form.getFieldsValue();
      let customerSignDate = moment(formFeilds?.CustSignDateTime + 1).format(
        "MM/DD/YYYY"
      );
      let dateDiffence = date_diff_indays(selectDate, customerSignDate);
      if (!formFeilds?.CustSignDateTime || dateDiffence > 0) {
        message.destroy();
        message.error({
          content:
            "Request Received Date can't be before the customer signing date.",
          className: "custom-msg",
          duration: 3,
        });
        form.setFieldsValue({
          BranchReceivedDate: "",
        });
        return;
      }
    }

    if (
      item?.toLowerCase() === "branchreceiveddate" ||
      item?.name?.toLowerCase() === "branchreceiveddate"
    ) {
      Data[selectedSubType]?.FundTransfer_Fields?.forEach((item, index) => {
        if (item.d_BranchReceivedDate) {
          item.hide = true;
        }
      });

      setShowReasonDelayField(false);
      let newDate = new Date();
      let todayDate = moment(newDate).format("DD/MM/YYYY");
      let selectDate = moment(date + 1).format("DD/MM/YYYY");
      if (selectDate < todayDate) {
        setShowReasonDelayField(true);

        Data[selectedSubType]?.FundTransfer_Fields?.forEach((item, index) => {
          if (item.d_BranchReceivedDate) {
            item.hide = false;
          }
        });
      }
    }

    setReRenderComponent(!ReRenderComponent);
  };
  const handleProposerCollapse = (e, label) => {
    if (label?.toLowerCase().includes("viewdocuments")) {
      if (e?.length > 0) {
        setCollapsePOSDocuments(true);
        setTimeout(() => {
          form.setFieldsValue({
            ValidateSignature: posBankDetailsObj?.ValidateSignature,
          });
        }, 0);
      } else {
        setCollapsePOSDocuments(false);
      }
    } else if (label?.toLowerCase().includes("viewrequestdetails")) {
      if (e?.length > 0) {
        setShowPOSRequestFields(true);
      } else {
        setShowPOSRequestFields(false);
      }
    } else if (label?.toLowerCase().includes("viewbankdetails")) {
      if (e?.length > 0) {
        setCollapsePOSBankDetails(true);
        setTimeout(() => {
          form.setFieldsValue({
            NameAsMentionedInTheBank:
              posBankDetailsObj?.NameAsMentionedInTheBank,
            BankIFSC: posBankDetailsObj?.BankIFSC,
            BankAccountNumber: posBankDetailsObj?.BankAccountNumber,
            BankName: posBankDetailsObj?.BankName,
            InitiatePennyDrop: posBankDetailsObj?.InitiatePennyDrop,
            NameReceivedinPennyDrop: posBankDetailsObj?.NameReceivedinPennyDrop,
            ValidateSignature: posBankDetailsObj?.ValidateSignature,
          });
        }, 0);
      } else {
        setCollapsePOSBankDetails(false);
      }
    } else if (label?.toLowerCase().includes("viewpos")) {
      if (e?.length > 0) {
        setCollapsePOSAction(true);
      } else {
        setCollapsePOSAction(false);
      }
    }
  };
  const handleRadioChange = (e, item) => {
    setShowRaiseRequirementBtn(false);

    if (e.target.value === "no" && item.name === "ValidateSignature") {
      // setShowRaiseRequirementBtn(true);
      setVaildateSignature(true);
    } else if (item.name === "ValidateSignature") {
      setVaildateSignature(false);
    }
    if (e.target.value === "yes" && item.name === "FundTransfer") {
      // setShowRaiseRequirementBtn(true);
      //setFundTransferVisible(false);
      Data[selectedSubType]?.BOE_Details?.forEach((item, index) => {
        if (item.FundTransferAmount) {
          item.hide = false;
        }
        if (item.FundTransferType) {
          item.hide = false;
        }
      });
      setReRenderComponent(!ReRenderComponent);
    } else if (item.name === "FundTransfer") {
      Data[selectedSubType]?.BOE_Details?.forEach((item, index) => {
        if (item.FundTransferAmount) {
          item.hide = true;
        }
        if (item.FundTransferType) {
          item.hide = true;
        }
        form.setFieldValue({ EffectiveSurrenderValue: totalSurrenderAmount });
      });
      setReRenderComponent(!ReRenderComponent);
    }
  };

  const handleDropdownChange = (e, item) => {
    setShowPassJVBtn(false);
    setShowTransferFields(false);
    setShowBankDeDupeModal(false);
    // if (e === "fundtransfer" && item?.name?.toLowerCase() === "surrenderpos") {
    //   setShowPassJVBtn(true);
    //   setShowTransferFields(true);
    // }
    if (
      e === "Full FundTransfer" &&
      item?.name?.toLowerCase() === "fundtransfertype"
    ) {
      form.setFieldsValue({ EffectiveSurrenderValue: "0" });
      form.setFieldsValue({ FundTransferAmount: totalSurrenderAmount });
      Data[selectedSubType]?.BOE_Details?.forEach((field) => {
        if (field.name === "FundTransferAmount") {
          field.disabled = true;
        }
      });
      setReRenderComponent(!ReRenderComponent);
    } else if (
      e === "Partial FundTransfer" &&
      item?.name?.toLowerCase() === "fundtransfertype"
    ) {
      form.setFieldsValue({ EffectiveSurrenderValue: "" });
      form.setFieldsValue({ FundTransferAmount: "" });
      Data[selectedSubType]?.BOE_Details?.forEach((field) => {
        if (field.name === "FundTransferAmount") {
          field.disabled = false;
        }
      });
      setReRenderComponent(!ReRenderComponent);
    }
  };
  const handleTitleCheckBox = (e, item) => {};
  const onRadioGroupChange = (e, item) => {
    let val = item || e.target.value;
    setShowQueryFields(false);
    setShowRetentionFields(false);
    setShowRequestFields(false);

    if (val?.includes("query")) {
      setSelectedSubType("surrenderquery");
      surrenderForm?.setFieldsValue({ subType: 3 });
      setShowQueryFields(true);
    } else if (val?.includes("retention")) {
      setSelectedSubType("surrenderretention");
      surrenderForm?.setFieldsValue({ subType: 5 });

      setShowRetentionFields(true);
    } else if (val?.includes("request")) {
      setSelectedSubType("surrenderrequest");
      surrenderForm?.setFieldsValue({ subType: 1 });
      setShowRequestFields(true);
    }
  };
  const warning = () => {
    Modal.warning({
      content:
        "Please select your preferred mode through which you wish to have the receipt",
    });
  };

  const handleEdit = (val) => {
    if (val === "edit") {
      Data[selectedSubType]?.POS_Details?.forEach((item, index) => {
        if (item?.posEdit) {
          item.disabled = false;
        }
      });
      Data[selectedSubType]?.JVCreation?.forEach((item, index) => {
        if (item?.posEdit) {
          item.disabled = false;
        }
      });
    } else if (val === "close") {
      Data[selectedSubType]?.POS_Details?.forEach((item, index) => {
        if (item?.posEdit) {
          item.disabled = true;
        }
      });
      Data[selectedSubType]?.JVCreation?.forEach((item, index) => {
        if (item?.posEdit) {
          item.disabled = true;
        }
      });

      // POSContactData?.serviceRequestTransectionData?.forEach((element) => {
      //   posScreenObj[element.tagName] = element.tagValue;
      // });
      // form.setFieldsValue({
      //   NameAsMentionedInTheBank: posScreenObj.NameAsMentionedInTheBank,
      //   BankIFSC: posScreenObj.BankIFSC,
      //   BankAccountNumber: posScreenObj.BankAccountNumber,
      //   BankName: posScreenObj.BankName,
      //   // PennydropResult:posScreenObj.PennydropResult,
      //   NameReceivedinPennyDrop: posScreenObj.NameReceivedinPennyDrop,
      // });
    }
  };

  // const handleSubmit =(events)=>{
  //   setIsShowPOSScreen(!isShowPOSScreen);
  // }

  let boeScreenObj = {};

  let internalData = [
    {
      name: "authorizercomments",
      label: "Authorizer Comments ",
      inputType: "text",
      required: false,
      disabled: true,
      placeholder: "Authorizer Comments",
    },
    {
      name: "Comments",
      label: "Requestor Comments",
      inputType: "textarea",
      maxlength: 500,
      required: false,
      validationmsg: "Enter Comments",
      placeholder: "Requestor Comments",
    },
    {
      name: "uploaddocuments",
      indexName: "Upload Documents",
      label: "Upload Documents",
      inputType: "upload",
      placeholder: "Upload Documents",
    },
    {
      name: "viewRequirements",
      indexName: "View Requirements",
      label: "View Requirements",
      inputType: "button",
      placeholder: "View Requirements",
    },
  ];
  useEffect(() => {
    if (customerData?.isInternalFlow) {
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        boeScreenObj[element.tagName] = element.tagValue;
      });
      form.setFieldsValue({
        authorizercomments: boeScreenObj?.POSComments1,
      });
      setInternalReqData();
    }
    setDocIdProofs([]);
  }, []);

  const handleLinkValue = (item) => {
    setIsMultipleFiles([]);
    if (item?.label?.includes("Upload ID Proof")) {
      setIdProofModal(true);
    } else if (item?.label?.includes("Upload Address Proof")) {
      setAddressProofModal(true);
    } else {
      setAddCCEmail(true);
    }
  };
  const getMultpleUploadFiles = (listOfUploadFiles, label) => {
    if (listOfUploadFiles?.length > 0) {
      setUploadIDMultipleFiles(listOfUploadFiles);
      if (idProofModal) {
        form.setFieldsValue({
          idProof: `Documents Uploaded -  ${listOfUploadFiles.length}`,
        });
      } else {
        setUploadMultipleFiles(listOfUploadFiles);
        form.setFieldsValue({
          addressProof: `Documents Uploaded -  ${listOfUploadFiles.length}`,
        });
      }
    }
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    fileList: [],
    customRequest: ({ file, onSuccess, index, item }, label, idProofUpload) => {
      let formData = new FormData();
      const ApplicationNo =
        policyDetails?.policyDetailsObj?.identifiers?.applicationNo;
      formData.append("File", file, ApplicationNo + "/" + file.name);
      let response = apiCalls.fileUpload(formData);
      response.then((val) => {
        if (val?.data) {
          let newDocumentObj = {
            IndexName: "Signature",
            DocumentName: file?.name,
            UserID: loginInfo?.userProfileInfo?.profileObj?.userName,
            UploadedBy: loginInfo?.userProfileInfo?.profileObj?.name,
            UploadedOn: new Date(),
            DocumentSize: file?.size,
            FileLocation: "/" + ApplicationNo + "/",
            BlobFileName: file?.name,
            FileExtnMime: file?.type,
            labelName: label,
            name: file.name,
          };
          if (idProofModal) {
            if (
              newDocumentObj.labelName &&
              isIDUploadMultipleFiles?.length > 0
            ) {
              // Check if a file with the same labelName already exists
              const existingFileIndex = isIDUploadMultipleFiles.findIndex(
                (file) => file.labelName === newDocumentObj.labelName
              );

              // Remove the labelName property before updating or adding the object
              //delete newDocumentObj.labelName;

              if (existingFileIndex !== -1) {
                // If exists, replace the existing file object with the new one
                const updatedUploadFiles = [...isIDUploadMultipleFiles];
                updatedUploadFiles[existingFileIndex] = newDocumentObj;
                setIsIDMultipleFiles(updatedUploadFiles);

                // Send the updated files to getMultpleUploadFiles
                // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
                getMultpleUploadFiles(updatedUploadFiles, label);
              } else {
                // If doesn't exist, add the new file object to the list
                setIsIDMultipleFiles((prevFiles) => [
                  ...prevFiles,
                  newDocumentObj,
                ]);

                // Send the updated files to getMultpleUploadFiles
                // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
                getMultpleUploadFiles(
                  [...isIDUploadMultipleFiles, newDocumentObj],
                  label
                );
              }
            } else {
              // If labelName is not present or the array is empty, add the new file object to the list
              setIsIDMultipleFiles((prevFiles) => [
                ...prevFiles,
                newDocumentObj,
              ]);

              // Send the updated files to getMultpleUploadFiles
              // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
              getMultpleUploadFiles(
                [...isIDUploadMultipleFiles, newDocumentObj],
                label
              );
            }
          } else {
            if (newDocumentObj.labelName && isUploadMultipleFiles?.length > 0) {
              // Check if a file with the same labelName already exists
              const existingFileIndex = isUploadMultipleFiles.findIndex(
                (file) => file.labelName === newDocumentObj.labelName
              );

              // Remove the labelName property before updating or adding the object
              //delete newDocumentObj.labelName;

              if (existingFileIndex !== -1) {
                // If exists, replace the existing file object with the new one
                const updatedUploadFiles = [...isUploadMultipleFiles];
                updatedUploadFiles[existingFileIndex] = newDocumentObj;
                setIsMultipleFiles(updatedUploadFiles);

                // Send the updated files to getMultpleUploadFiles
                // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
                getMultpleUploadFiles(updatedUploadFiles, label);
              } else {
                // If doesn't exist, add the new file object to the list
                setIsMultipleFiles((prevFiles) => [
                  ...prevFiles,
                  newDocumentObj,
                ]);

                // Send the updated files to getMultpleUploadFiles
                // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
                getMultpleUploadFiles(
                  [...isUploadMultipleFiles, newDocumentObj],
                  label
                );
              }
            } else {
              // If labelName is not present or the array is empty, add the new file object to the list
              setIsMultipleFiles((prevFiles) => [...prevFiles, newDocumentObj]);

              // Send the updated files to getMultpleUploadFiles
              // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
              getMultpleUploadFiles(
                [...isUploadMultipleFiles, newDocumentObj],
                label
              );
            }
          }

          //getMultpleUploadFiles(documnetsObj);
          setShowUploadFile(index);
          //setUploadFiles(file);
          setDocIdProofs([{ ...newDocumentObj }]);
          if (idProofUpload === "idProofUpload") {
            if (label?.includes("Copy of Aadhar Card")) {
              setAAdharIDUploadFiles([{ ...newDocumentObj }]);
            } else if (label?.includes("Copy of Passport")) {
              setPassportIDUploadFiles([{ ...newDocumentObj }]);
            } else if (label?.includes("Copy of Ration Card")) {
              setRationCardIDUploadFiles([{ ...newDocumentObj }]);
            } else if (label?.includes("Copy of Driving License")) {
              setDrivingIDUploadFiles([{ ...newDocumentObj }]);
            } else if (label?.includes("Copy of PAN Card")) {
              setPancardIDUploadFiles([{ ...newDocumentObj }]);
            } else if (label?.includes("Copy of Voter ID")) {
              setVoterIDUploadFiles([{ ...newDocumentObj }]);
            }
          } else {
            if (label?.includes("Copy of Aadhar Card")) {
              setAAdharUploadFiles([{ ...newDocumentObj }]);
            } else if (
              label?.includes(
                "Require Change in Signature Form duly attested by Bank official"
              )
            ) {
              setPassportUploadFiles([{ ...newDocumentObj }]);
            } else if (label?.includes("Copy of Passport")) {
              setPassportUploadFiles([{ ...newDocumentObj }]);
            } else if (label?.includes("Copy of Ration Card")) {
              setRationCardUploadFiles([{ ...newDocumentObj }]);
            } else if (label?.includes("Copy of Driving License")) {
              setDrivingUploadFiles([{ ...newDocumentObj }]);
            } else if (label?.includes("Copy of PAN Card")) {
              setPancardUploadFiles([{ ...newDocumentObj }]);
            } else if (label?.includes("Copy of Voter ID")) {
              setVoterUploadFiles([{ ...newDocumentObj }]);
            } else if (
              label?.includes("Utility Bill which is not more than 2 months")
            ) {
              setUtilityUploadFiles([{ ...newDocumentObj }]);
            } else if (
              label?.includes(
                "Bank statement/Passbook copy with latest 2 months transactions"
              )
            ) {
              setPassbookUploadFiles([{ ...newDocumentObj }]);
            }
          }
          message.success({
            content: "File Upload successfully",
            className: "custom-msg",
            duration: 3,
          });
          onSuccess();
        } else {
          message.error({
            content:
              val?.data?.responseBody?.errormessage ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
      });
    },
    beforeUpload: (file) => {
      setShowUploadFile(false);
      let fileType = {
        "image/png": true,
        "image/jpg": true,
        "image/jpeg": true,
        "image/PNG": true,
        "image/JPG": true,
        "image/JPEG": true,
        "application/pdf": true,
        "application/PDF": true,
      };
      let isFileName = file.name.split(".").length > 2 ? false : true;
      if (fileType[file.type] && isFileName) {
        return true;
      } else {
        message.error("File don't allow double extension");
        return Upload.LIST_IGNORE;
      }
    },
  };
  const handleAddressModalClose = () => {
    setUploadFiles([]);
    setAddressProofModal(false);
    setAAdharUploadFiles([]);
    setPassportUploadFiles([]);
    setRationCardUploadFiles([]);
    setDrivingUploadFiles([]);
    setVoterUploadFiles([]);
    setPancardUploadFiles([]);
  };
  const handleIdProofModalClose = () => {
    setUploadFiles([]);
    setIdProofModal(false);
    setAAdharIDUploadFiles([]);
    setPassportIDUploadFiles([]);
    setRationCardIDUploadFiles([]);
    setDrivingIDUploadFiles([]);
    setVoterIDUploadFiles([]);
    setPancardIDUploadFiles([]);
  };
  const handleOk = (idProofBtn) => {
    if (idProofBtn === "idProof") {
      if (
        aadharIDUploadFiles?.length === 0 &&
        passportIDUploadFiles?.length === 0 &&
        rationCardIDUploadFiles?.length === 0 &&
        DrivingIDUploadFiles?.length === 0 &&
        voterIDUploadFiles?.length === 0 &&
        pancardIDUploadFiles?.length === 0
      ) {
        message.warning({
          content: "Please Upload atleast one file.",
          className: "custom-msg",
          duration: 2,
        });
      } else {
        // form.setFieldsValue({
        //   addressProof: uploadFiles[0].DocumentName
        // })
        setAddressProofModal(false);
        setIdProofModal(false);
      }
    } else {
      if (
        aadharUploadFiles?.length === 0 &&
        passportUploadFiles?.length === 0 &&
        rationCardUploadFiles?.length === 0 &&
        DrivingUploadFiles?.length === 0 &&
        utilityUploadFiles?.length === 0 &&
        voterUploadFiles?.length === 0 &&
        passbookUploadFiles?.length === 0
      ) {
        message.warning({
          content: "Please Upload atleast one file.",
          className: "custom-msg",
          duration: 2,
        });
      } else {
        // form.setFieldsValue({
        //   addressProof: uploadFiles[0].DocumentName
        // })
        setAddressProofModal(false);
        setIdProofModal(false);
      }
    }
  };
  const handleRemove = (file) => {
    if (
      file?.labelName ===
      "Require Change in Signature Form duly attested by Bank official"
    ) {
      setPassportUploadFiles([]);
    } else if (file?.labelName === "Copy of PAN Card") {
      setPancardUploadFiles([]);
    } else if (file?.labelName === "Copy of Aadhar Card") {
      setAAdharUploadFiles([]);
    } else if (file?.labelName === "Copy of Passport") {
      setPassportUploadFiles([]);
    } else if (file?.labelName === "Copy of Ration Card") {
      setRationCardUploadFiles([]);
    } else if (file?.labelName === "Copy of Driving License") {
      setDrivingUploadFiles([]);
    } else if (file?.labelName === "Copy of Voter ID") {
      setVoterUploadFiles([]);
    } else if (
      file?.labelName === "Utility Bill which is not more than 2 months"
    ) {
      setUtilityUploadFiles([]);
    } else if (
      file?.labelName ===
      "Bank statement/Passbook copy with latest 2 months transactions"
    ) {
      setPassbookUploadFiles([]);
    }

    if (idProofModal) {
      let updatedFiles = isIDUploadMultipleFiles?.filter((ele) => {
        return ele?.labelName !== file.labelName;
      });
      setIsIDMultipleFiles(updatedFiles);
      form.setFieldsValue({
        idProof: `Documents Uploaded -  ${updatedFiles.length}`,
      });
    } else {
      let updatedFiles = isUploadMultipleFiles?.filter((ele) => {
        return ele?.labelName !== file.labelName;
      });
      setIsMultipleFiles(updatedFiles);
      form.setFieldsValue({
        addressProof: `Documents Uploaded -  ${updatedFiles.length}`,
      });
    }
    // form.setFieldsValue({
    //   addressProof: `Documents Uploaded -  ${updatedFiles.length }`,
    //   idProof:  `Documents Uploaded -  ${updatedFiles.length }`,
    // })
  };

  const handleKeyDown = (event) => {
    const { value, key } = event;

    // Allow numbers, period (.), backspace, delete, tab, and arrow keys
    if (
      (key >= "0" && key <= "9") || // Numbers 0-9
      key === "Backspace" ||
      key === "." ||
      key === "Tab" ||
      key === "ArrowLeft" ||
      key === "ArrowRight" ||
      key === "Delete"
    ) {
      // Prevent more than one period (.)
      if (key === "." && value?.includes(".")) {
        event.preventDefault();
      }
    } else {
      // Prevent any other keys from being entered
      event.preventDefault();
    }
  };

  const handleInputChange1 = (event) => {
    const { value } = event.target;

    // Maximum number of digits allowed before the decimal point
    const maxIntegerDigits = 5; // Change this value based on your requirement

    // Remove all non-numeric characters except the dot (.)
    let validValue = value.replace(/[^0-9.]/g, "");

    // Ensure only one decimal point is allowed
    if (validValue.includes(".")) {
      const [integerPart, decimalPart] = validValue.split(".");

      // Restrict the number of digits before the decimal point
      const limitedIntegerPart = integerPart.slice(0, maxIntegerDigits);

      // Allow at most two decimal places
      validValue = decimalPart
        ? `${limitedIntegerPart}.${decimalPart.slice(0, 2)}`
        : limitedIntegerPart;
    } else {
      // If there's no decimal point, just limit the integer part
      validValue = validValue.slice(0, maxIntegerDigits);
    }

    // Update the form field with the validated value
    form.setFieldsValue({ [event.target.name]: validValue });
  };

  const calculateTotal = () => {
    const formData = form.getFieldsValue();
    const {
      FundTransferAmount = 0,
      TDSAmount = 0,
      InterestAmount = 0,
      PenalInterestAmount = 0,
      EffectiveSurrenderValue = 0,
    } = formData;

    // Convert string values to numbers for calculation
    const fundTransfer =
      parseFloat(FundTransferAmount?.toString()?.replace(/,/g, "")) || 0;
    const tds = parseFloat(TDSAmount?.toString()?.replace(/,/g, "")) || 0;
    const interest =
      parseFloat(InterestAmount?.toString()?.replace(/,/g, "")) || 0;
    const penalInterest =
      parseFloat(PenalInterestAmount?.toString()?.replace(/,/g, "")) || 0;
    const effectiveSurrender =
      parseFloat(EffectiveSurrenderValue?.toString()?.replace(/,/g, "")) || 0;

    if (caseType === "FullFT") {
      // For Full Fund Transfer case
      const fullFTAmount = fundTransfer - tds + penalInterest + interest;

      form.setFieldsValue({
        FullFTAmount: fullFTAmount.toFixed(2),
      });

      return {
        sectionType: "FullFTSection",
        fieldName: "FullFTAmount",
        calculatedValue: fullFTAmount.toFixed(2),
      };
    } else {
      // For Payee Code case (non-FullFT)
      const payeeCodeAmount =
        effectiveSurrender - tds + penalInterest + interest;

      form.setFieldsValue({
        PayeeCodeAmount: payeeCodeAmount.toFixed(2),
      });

      return {
        sectionType: "PayeeCodeSection",
        fieldName: "PayeeCodeAmount",
        calculatedValue: payeeCodeAmount.toFixed(2),
      };
    }
  };

  const handlePaybleSubmit = () => {
    const formData = finalPaymentForm.getFieldValue();
    form.setFieldsValue({
      ViewFinalPayableAmount: formData?.FinalPayableAmount,
    });
    setFinalPayableAmtModal(false);
  };
  return (
    <>
      <Spin spinning={isLoader} fullscreen />
      <Form
        initialValues={data}
        form={form}
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
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <>
          <DetailsForm
            data={
              !isShowPOSScreen
                ? Data[selectedSubType]?.BOE_Details
                : !showPOSMangerScreen
                ? Data[selectedSubType]?.POS_Details
                : Data[selectedSubType]?.POS_Manager_Details
            }
            handleEdit={handleEdit}
            handleRadioChange={handleRadioChange}
            subType={selectedSubType}
            handleTitleCheckBox={handleTitleCheckBox}
            handleDropdownChange={handleDropdownChange}
            handleLabelLink={handleLabelLink}
            onRadioGroupChange={onRadioGroupChange}
            handleProposerCollapse={handleProposerCollapse}
            handleDateChange={handleDateChange}
            handleTextLink={handleTextLink}
            handleRadioLink={handleRadioLink}
            handleInputChange={handleInputChange}
            onBlurInput={onBlurInput}
            requestModeLU={requestModeLU}
            form={form}
          ></DetailsForm>

          {isShowPOSScreen && (
            <>
              <DetailsForm
                data={Data[selectedSubType]?.JVCreation}
                handleEdit={handleEdit}
                handleRadioChange={handleRadioChange}
                subType={selectedSubType}
                handleTitleCheckBox={handleTitleCheckBox}
                handleDropdownChange={handleDropdownChange}
                handleLabelLink={handleLabelLink}
                onRadioGroupChange={onRadioGroupChange}
                handleProposerCollapse={handleProposerCollapse}
                handleDateChange={handleDateChange}
                handleTextLink={handleTextLink}
                handleRadioLink={handleRadioLink}
                handleInputChange={handleInputChange}
                onBlurInput={onBlurInput}
                form={form}
              />

              {caseType === "FullFT" ? (
                <DetailsForm
                  data={Data[selectedSubType]?.FullFTSection}
                  handleEdit={handleEdit}
                  handleRadioChange={handleRadioChange}
                  subType={selectedSubType}
                  handleTitleCheckBox={handleTitleCheckBox}
                  handleDropdownChange={handleDropdownChange}
                  handleLabelLink={handleLabelLink}
                  onRadioGroupChange={onRadioGroupChange}
                  handleProposerCollapse={handleProposerCollapse}
                  handleDateChange={handleDateChange}
                  handleTextLink={handleTextLink}
                  handleRadioLink={handleRadioLink}
                  handleInputChange={handleInputChange}
                  onBlurInput={onBlurInput}
                  form={form}
                />
              ) : (
                <DetailsForm
                  data={Data[selectedSubType]?.PayeeCodeSection}
                  handleEdit={handleEdit}
                  handleRadioChange={handleRadioChange}
                  subType={selectedSubType}
                  handleTitleCheckBox={handleTitleCheckBox}
                  handleDropdownChange={handleDropdownChange}
                  handleLabelLink={handleLabelLink}
                  onRadioGroupChange={onRadioGroupChange}
                  handleProposerCollapse={handleProposerCollapse}
                  handleDateChange={handleDateChange}
                  handleTextLink={handleTextLink}
                  handleRadioLink={handleRadioLink}
                  handleInputChange={handleInputChange}
                  onBlurInput={onBlurInput}
                  form={form}
                />
              )}
            </>
          )}

          {!isShowPOSScreen && (
            <>
              <>
                <DetailsForm
                  data={Data[selectedSubType]?.BOE_Bank_Details_Fields}
                  subType={selectedSubType}
                  handleTitleCheckBox={handleTitleCheckBox}
                  handleDropdownChange={handleDropdownChange}
                  handleLabelLink={handleLabelLink}
                  onRadioGroupChange={onRadioGroupChange}
                  handleDateChange={handleDateChange}
                  handleRadioChange={handleRadioChange}
                  suffix={!isShowPOSScreen && suffix}
                  onBlurInput={onBlurInput}
                  form={form}
                  getUploadFiles={getUploadFiles}
                  disabledDate={disabledDate}
                  handleLinkValue={handleLinkValue}
                  handleInputChange={handleInputChange}
                  bankAccTypeLU={bankAccTypeLU}
                ></DetailsForm>
              </>

              <div className="contact-details-btn">
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit"
                  disabled={vaildateSignature || (isBlacklistedPolicy && isShowPOSScreen)}
                >
                  {!isShowPOSScreen ? "Submit" : "Approve"}
                </Button>
                {!isShowPOSScreen && (
                  <Button
                    type="primary"
                    className="primary-btn"
                    htmlType="submit"
                    onClick={() => getRaiseRequirements()}
                  >
                    Raise Requirement
                  </Button>
                )}
              </div>
            </>
          )}

          {/* surrender POS Manger Code Start */}
          {selectedSubType === "surrenderrequest" && isShowPOSScreen && (
            <>
              {!hideViewRequestDetails && (
                <>
                  <DetailsForm
                    data={Data[selectedSubType]?.View_POS_Request_title}
                    handleProposerCollapse={handleProposerCollapse}
                  ></DetailsForm>
                  {showPOSRequestFields && (
                    <>
                      <DetailsForm
                        data={Data[selectedSubType]?.View_Request_Details}
                        subType={selectedSubType}
                        handleTitleCheckBox={handleTitleCheckBox}
                        handleDropdownChange={handleDropdownChange}
                        handleLabelLink={handleLabelLink}
                        onRadioGroupChange={onRadioGroupChange}
                        handleProposerCollapse={handleProposerCollapse}
                        accoutt
                      ></DetailsForm>
                    </>
                  )}
                </>
              )}
              <DetailsForm
                data={Data[selectedSubType]?.View_Documents_title}
                handleProposerCollapse={handleProposerCollapse}
              ></DetailsForm>
              {collapsePOSDocuments && (
                <>
                  <DetailsForm
                    data={Data[selectedSubType]?.View_Documents}
                    subType={selectedSubType}
                    handleTitleCheckBox={handleTitleCheckBox}
                    handleDropdownChange={handleDropdownChange}
                    handleLabelLink={handleLabelLink}
                    onRadioGroupChange={onRadioGroupChange}
                    handleProposerCollapse={handleProposerCollapse}
                    handleRadioChange={handleRadioChange}
                    handleTextLink={handleTextLink}
                    handleRadioLink={handleRadioLink}
                  ></DetailsForm>
                </>
              )}
              {!hideViewBankDetails && (
                <>
                  <DetailsForm
                    data={Data[selectedSubType]?.View_BankDetails_title}
                    handleProposerCollapse={handleProposerCollapse}
                  ></DetailsForm>
                  {collapsePOSBankDetails && (
                    <>
                      <DetailsForm
                        data={Data[selectedSubType]?.View_Bank_Details}
                        subType={selectedSubType}
                        handleTitleCheckBox={handleTitleCheckBox}
                        handleDropdownChange={handleDropdownChange}
                        handleLabelLink={handleLabelLink}
                        onRadioGroupChange={onRadioGroupChange}
                        handleProposerCollapse={handleProposerCollapse}
                      ></DetailsForm>
                    </>
                  )}
                </>
              )}
              <DetailsForm
                data={
                  showPOSMangerScreen
                    ? Data[selectedSubType]?.View_POS_Manager_Action_title
                    : Data[selectedSubType]?.View_POS_Action_title
                }
                handleProposerCollapse={handleProposerCollapse}
              ></DetailsForm>
              {collapsePOSAction && (
                <>
                  <DetailsForm
                    data={
                      showPOSMangerScreen
                        ? Data[selectedSubType]?.POS_Manager_Action
                        : Data[selectedSubType]?.POS_Action
                    }
                    subType={selectedSubType}
                    handleTitleCheckBox={handleTitleCheckBox}
                    handleDropdownChange={handleDropdownChange}
                    handleLabelLink={handleLabelLink}
                    onRadioGroupChange={onRadioGroupChange}
                    handleProposerCollapse={handleProposerCollapse}
                    handleLinkValue={handleLinkValue}
                    handleDateChange={handleDateChange}
                    handleTextLink={handleTextLink}
                    handleRadioChange={handleRadioChange}
                    disabledDate={disabledDate}
                    handleRadioLink={handleRadioLink}
                    onBlurInput={onBlurInput}
                  ></DetailsForm>
                  {addCCEmail && (
                    <>
                      {" "}
                      <DetailsForm
                        data={Data[selectedSubType]?.Add_CC}
                        subType={selectedSubType}
                      ></DetailsForm>
                    </>
                  )}
                  <DetailsForm
                    data={Data[selectedSubType]?.Comments}
                    subType={selectedSubType}
                  ></DetailsForm>
                </>
              )}
              <div className="contact-details-btn">
                <Button
                  type="primary"
                  value="POSApprove"
                  onClick={() => setClickedButton("POSApprove")}
                  htmlType="submit"
                  className="primary-btn"
                  disabled={isBlacklistedPolicy}
                >
                  Approve
                </Button>
                <Button
                  type="primary"
                  value="RaiseRequirement"
                  htmlType="submit"
                  onClick={() => setClickedButton("RaiseRequirement")}
                  className="primary-btn"
                >
                  Raise Requirement
                </Button>

                {/* <>
                  <InternalFlowPOS
                    interlRequirementTagValue1={props.interlRequirementTagValue}
                    selectedList={POSContactData.serviceRequestTransectionData}
                    getInternal={getInternal}
                  />
                </> */}

                {/* {showPassJVBtn && (
                  <>
                    <Button type="primary" className="primary-btn">
                      Pass JV For FT
                    </Button>{" "}
                  </>
                )} */}
                {/* <Button type="primary" className="primary-btn" onClick={()=>setShowPOSMangerScreen(!showPOSMangerScreen)}>
                POS Manager Screen
              </Button>{" "} */}
              </div>
            </>
          )}
          {/* surrender POS Manger Code End */}
        </>
      </Form>

      {/* </Spin> */}

      <Modal
        title=""
        open={surrenderApplicableModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setSurrenderApplicableModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div>Policy cannot be surrendered as surrender is not applicable</div>
      </Modal>

      {/* <Modal
        title={isUlip ? "Total Fund Value" : "Total Surrender Value"}
        open={totalFundsModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setTotalFundModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="table-container">
          {!isUlip && (
            <>
              <table className="responsive-table">
                <tr>
                  <td width={50}>Surrender Value Date</td>
                  <td width={70}>
                    {moment(new Date(), "YYYYMMDD").format("DD/MM/YYYY")}
                  </td>
                </tr>
                <tr>
                  <td>Gross Surrender Value(+)</td>
                  <td>{totalSurrenderAmount}</td>
                </tr>
                <tr>
                  <td>Less loan(-)</td>
                  <td>

                    {loanValue ? loanValue : ""}
                  </td>
                </tr>
                <tr>
                  <td>TDS(-)</td>
                  <td>{totalTdsValue || 0}</td>
                </tr>
                <tr>
                  <td>Net Surrender Value</td>
                  <td>
                    {sum(
                      totalSurrenderAmount,
                      loanValue ? loanValue : 0,
                      totalTdsValue
                    )}
                  </td>
                </tr>
              </table>
            </>
          )}

          {isUlip && (
            <>
              <table className="responsive-table text-center">
                <thead>
                  <tr>
                    <th>Fund Name</th>
                    <th>NAV Date</th>
                    <th>NAV</th>
                    <th>Units Available</th>
                    <th>Fund Value</th>
                  </tr>
                </thead>

                {FundValueData?.map((item, index) => (
                  <>
                    {" "}
                    {item?.curuntval > 0 && (
                      <tr key={index}>
                        <td>{item?.vrtfund}</td>
                        <td>
                          {moment(item?.effectivedate, "YYYYMMDD").format(
                            "DD/MM/YYYY"
                          )}
                        </td>

                        <td>
                          {Number(item?.unitprice).toLocaleString("en-IN")}
                        </td>
                        <td>
                          {Number(item?.curuntbal).toLocaleString("en-IN")}{" "}
                        </td>
                        <td>
                          {Number(item?.curuntval).toLocaleString("en-IN")}{" "}
                        </td>
                      </tr>
                    )}
                  </>
                ))}
                {FundValueData?.length === 0 && (
                  <tr>
                    <td colspan="5">
                      <div className="text-center">
                        <span>No data available</span>
                      </div>
                    </td>
                  </tr>
                )}
              </table>
            </>
          )}
        </div>
      </Modal> */}
      <Modal
        title="Final Payable Amount"
        open={finalPayableAmtModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setFinalPayableAmtModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
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
          form={finalPaymentForm}
          onFinish={handlePaybleSubmit}
          onValuesChange={calculateTotal} // Handle input changes here
          autoComplete="off"
        >
          <Row gutter={[12, 12]} className="mb-16">
            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                name="totalSurrenderAmount"
                label="Effective Surrender Value"
                className="inputs-label mb-0"
                rules={[
                  {
                    required: false,
                    message: "Effective Surrender Value",
                  },
                ]}
              >
                <Input
                  placeholder="Gross Surrender Value"
                  className="cust-input modal-input"
                  maxLength={100}
                  disabled
                />
              </Form.Item>
            </Col>

            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                label="Less TDS"
                name="LessTDS"
                className="inputs-label mb-0 subtype right-colsize"
              >
                <Input
                  placeholder="Less TDS"
                  className="cust-input modal-input"
                  maxLength={100}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                label="Add: Penal Interest"
                name="PenalInterest"
                className="inputs-label mb-0"
              >
                <Input
                  placeholder="Penal Interest"
                  className="cust-input modal-input"
                  maxLength={100}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                label="Add: Interest"
                name="Interest"
                className="inputs-label mb-0"
              >
                <Input
                  placeholder="Interest"
                  className="cust-input modal-input"
                  maxLength={100}
                  disabled
                />
              </Form.Item>
            </Col>

            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                label="Final Payable Amount"
                name="FinalPayableAmount"
                className="inputs-label mb-0 subtype right-colsize"
              >
                <Input
                  placeholder="Final Payable Amount"
                  className="cust-input modal-input"
                  maxLength={100}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item className="mb-0">
                <div className="d-flex justify-end">
                  <Button
                    type="primary"
                    className="primary-btn mr-12"
                    htmlType="submit"
                  >
                    Submit
                  </Button>{" "}
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Modal
        title=""
        open={loanAvailableModal}
        destroyOnClose={true}
        width={600}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setloanAvailableModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="">
          <h5>
            {" "}
            Available Loan Amount Rs{" "}
            {Number(
              LoanQuotationData?.loanallow ? LoanQuotationData?.loanallow : 0
            ).toLocaleString("en-IN")}{" "}
          </h5>
        </div>
      </Modal>

      <Modal
        title=""
        open={pwAvailableModal}
        destroyOnClose={true}
        width={600}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setpwAvailableModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="">
          <h5> PW Available {partialWithdrawalEnquiryd?.totalamt} </h5>
        </div>
      </Modal>

      <Modal
        title="Signature Change"
        open={SignListModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setSignListModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="table-container" style={{ marginTop: "0px" }}>
          <table className="responsive-table">
            <tr>
              <th>Service Req No </th>
              <th>Status</th>
              <th>Created On</th>
            </tr>
            {signatureDeDupeData?.map((item, index) => (
              <tr key={index}>
                <td>{item?.SrvReqRefNo}</td>
                <td>{item?.CurrentStatus}</td>
                <td>
                  {moment(item?.CreatedOn, "YYYYMMDD").format("DD/MM/YYYY")}
                </td>
              </tr>
            ))}
            {signatureDeDupeData?.length === 0 && (
              <tr>
                <td colspan="4">
                  <div className="text-center">
                    <span>No data available</span>
                  </div>
                </td>
              </tr>
            )}
          </table>
        </div>
      </Modal>

      <Modal
        title={
          <span style={{ color: "#b21f1f", fontWeight: "bold" }}>
            OFAC List Check Details
          </span>
        }
        open={negativeListModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setNegativeModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="table-container" style={{ marginTop: "0px" }}>
          <table className="responsive-table">
            <tr>
              <th>Name</th>
              <th>Program</th>
              <th>Type</th>
            </tr>
            {negativeList?.map((item, index) => (
              <tr key={index}>
                <td>{item?.name}</td>
                <td>{item?.program}</td>

                <td>{item?.type}</td>
              </tr>
            ))}
            {negativeList?.length === 0 && (
              <tr>
                <td colspan="4">
                  <div className="text-center">
                    <span>No data available</span>
                  </div>
                </td>
              </tr>
            )}
          </table>
        </div>
      </Modal>

      <Modal
        title="Bank De-Dupe Match Details"
        open={showBankDeDupeModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setShowBankDeDupeModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="table-container" style={{ marginTop: "20px" }}>
          <table className="responsive-table">
            <tr>
              <th>Policy Number</th>
              <th>Account Number</th>
              <th>Account Holder Name</th>
              {/* <th>Customer Name</th> */}
            </tr>
            {BankduDupeData?.map((item, index) => (
              <tr key={index}>
                <td>{item?.LA_PolicyNo || item?.lA_PolicyNo}</td>
                <td>{item?.Acc_Number || item?.acc_Number}</td>
                <td>{item?.Acc_HldrName || item?.acc_HldrName}</td>
                {/* <td>{item?.CustomerNam || item?.customerName}</td> */}
              </tr>
            ))}
            {BankduDupeData?.length === 0 && (
              <tr>
                <td colspan="3">
                  <div className="text-center">
                    <span>No data available</span>
                  </div>
                </td>
              </tr>
            )}
          </table>
        </div>
      </Modal>

      <Modal
        title="List of Acceptable Address Proofs"
        open={addressProofModal}
        destroyOnClose={true}
        width={1000}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => handleAddressModalClose()}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="reuirement">
          <table className="responsive-table">
            <tr>
              <th>Sr No</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
            <tr>
              <td>1</td>
              <td>Copy of Aadhar Card - Masked</td>
              <td>
                <Upload
                  {...uploadProps}
                  fileList={aadharUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Aadhar Card"
                    )
                  }
                  //onChange={(info) => handleFileUpload(info, index)}
                  //  onChange={(props) => handleUpload(props)}
                  action={
                    "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                  }
                >
                  {suffix}
                </Upload>
                {/* {aadharUploadFiles.name} */}
                {/* {uploadFiles?.map((files, index) => (
                        files ? (
                       <div key={index}>
                            {files.DocumentName}
                            </div>
                        ) : null
                        ))} */}
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Copy of Passport</td>
              <td>
                <Upload
                  {...uploadProps}
                  fileList={passportUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,.pdf"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Passport"
                    )
                  }
                  //onChange={(info) => handleFileUpload(info, index)}
                  //  onChange={(props) => handleUpload(props)}
                  action={
                    "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                  }
                >
                  {suffix}
                </Upload>
                {/* {passportUploadFiles.name} */}
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Copy of Ration Card</td>
              <td>
                <Upload
                  {...uploadProps}
                  fileList={rationCardUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.pdf,.PDF"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Ration Card"
                    )
                  }
                  //onChange={(info) => handleFileUpload(info, index)}
                  //  onChange={(props) => handleUpload(props)}
                  action={
                    "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                  }
                >
                  {suffix}
                </Upload>
                {/* {rationCardUploadFiles.name} */}
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Copy of Driving License</td>
              <td>
                <Upload
                  {...uploadProps}
                  fileList={DrivingUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,pdf"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Driving License"
                    )
                  }
                  //onChange={(info) => handleFileUpload(info, index)}
                  //  onChange={(props) => handleUpload(props)}
                  action={
                    "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                  }
                >
                  {suffix}
                </Upload>
                {/* {DrivingUploadFiles.name} */}
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>Utility Bill which is not more than 2 months</td>
              <td>
                <Upload
                  {...uploadProps}
                  fileList={utilityUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,pdf"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Utility Bill which is not more than 2 months"
                    )
                  }
                  //onChange={(info) => handleFileUpload(info, index)}
                  //  onChange={(props) => handleUpload(props)}
                  action={
                    "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                  }
                >
                  {suffix}
                </Upload>
                {/* {DrivingUploadFiles.name} */}
              </td>
            </tr>
            <tr>
              <td>6</td>
              <td>Copy of Voter ID</td>
              <td>
                <Upload
                  {...uploadProps}
                  fileList={voterUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,pdf"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Voter ID"
                    )
                  }
                  //onChange={(info) => handleFileUpload(info, index)}
                  //  onChange={(props) => handleUpload(props)}
                  action={
                    "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                  }
                >
                  {suffix}
                </Upload>
                {/* {DrivingUploadFiles.name} */}
              </td>
            </tr>
            <tr>
              <td>7</td>
              <td>
                Bank statement/Passbook copy with latest 2 months transactions
              </td>
              <td>
                <Upload
                  {...uploadProps}
                  fileList={passbookUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,pdf"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Bank statement/Passbook copy with latest 2 months transactions"
                    )
                  }
                  //onChange={(info) => handleFileUpload(info, index)}
                  //  onChange={(props) => handleUpload(props)}
                  action={
                    "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                  }
                >
                  {suffix}
                </Upload>
                {/* {DrivingUploadFiles.name} */}
              </td>
            </tr>
          </table>

          <div className="contact-details-btn">
            <Button
              type="primary"
              className="primary-btn"
              onClick={() => handleOk()}
            >
              Ok
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        title="List of Acceptable ID Proofs"
        open={idProofModal}
        destroyOnClose={true}
        width={1000}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => handleIdProofModalClose()}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="reuirement">
          <table className="responsive-table">
            <tr>
              <th>Sr No</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
            <tr>
              <td>1</td>
              <td>Copy of Aadhar Card - Masked</td>
              <td>
                <Upload
                  {...uploadProps}
                  fileList={aadharIDUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Aadhar Card",
                      "idProofUpload"
                    )
                  }
                  action={
                    "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                  }
                >
                  {suffix}
                </Upload>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Copy of Passport</td>
              <td>
                <Upload
                  {...uploadProps}
                  fileList={passportIDUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,.pdf"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Passport",
                      "idProofUpload"
                    )
                  }
                  action={
                    "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                  }
                >
                  {suffix}
                </Upload>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Copy of Ration Card</td>
              <td>
                <Upload
                  {...uploadProps}
                  fileList={rationCardIDUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.pdf,.PDF"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Ration Card",
                      "idProofUpload"
                    )
                  }
                  action={
                    "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                  }
                >
                  {suffix}
                </Upload>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Copy of Driving License</td>
              <td>
                <Upload
                  {...uploadProps}
                  fileList={DrivingIDUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,pdf"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Driving License",
                      "idProofUpload"
                    )
                  }
                  action={
                    "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                  }
                >
                  {suffix}
                </Upload>
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>Copy of Voter ID</td>
              <td>
                <Upload
                  {...uploadProps}
                  fileList={voterIDUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,pdf"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Voter ID",
                      "idProofUpload"
                    )
                  }
                  action={
                    "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                  }
                >
                  {suffix}
                </Upload>
              </td>
            </tr>
            <tr>
              <td>6</td>
              <td>Copy of PAN Card</td>
              <td>
                <Upload
                  {...uploadProps}
                  fileList={pancardIDUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,pdf"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of PAN Card",
                      "idProofUpload"
                    )
                  }
                  action={
                    "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                  }
                >
                  {suffix}
                </Upload>
              </td>
            </tr>
          </table>

          <div className="contact-details-btn">
            <Button
              type="primary"
              className="primary-btn"
              onClick={() => handleOk("idProof")}
            >
              Ok
            </Button>
          </div>
        </div>
      </Modal>

      {showAlert && (
        <PopupAlert
          alertData={alertData}
          title={alertTitle}
          getAdvance={props.getAdvance}
          navigate={navigateTo}
          setShowAlert={setShowAlert}
        ></PopupAlert>
      )}
      {raiseRequirementOpen && (
        <>
          <RaiseRequirementPopup
            raiseRequerimentList={raiseRequerimentList}
            raiseRequirementOpen={raiseRequirementOpen}
            requirementModalLoader={requirementModalLoader}
            handleRequirementSubmit={handleRequirementSubmit}
            popupClose={popupClose}
            isShowPOSScreen={isShowPOSScreen}
            requirementsForm={requirementsForm}
          />
        </>
      )}
    </>
  );
};

const mapStateToProps = ({ state, policyDetails, userProfileInfo }) => {
  return { data: state?.PolicyDetailsReducer?.policyDetailsObj, policyDetails };
};

export default connect(mapStateToProps)(SurrenderV2);
