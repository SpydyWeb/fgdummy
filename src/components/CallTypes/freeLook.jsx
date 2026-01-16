import React, { useState, useEffect } from "react";
import { FreelookData } from "../../mainconfig";
import PopupAlert from "../popupAlert";
import { connect, useSelector } from "react-redux";
import DetailsForm from "../../utils/DetailsForm";
import { NumericFormat } from "react-number-format";

import apiCalls from "../../api/apiCalls";
import {
  Button,
  Form,
  Spin,
  Modal,
  Tooltip,
  Checkbox,
  message,
  Row,
  Col,
  Upload,
  Input,
} from "antd";
import moment from "moment";
import UploadIcon from "../../assets/images/upload.png";
import CloseIcon from "../../assets/images/close-icon.png";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import InternalFlow from "../InternalFlow/InternalFlow";
import InternalFlowPOS from "../InternalFlow/InternalFlowPOS";
import RaiseRequirementPopup from "../RaiseRequirementPopup";

const FreeLook = (props) => {
  dayjs.extend(customParseFormat);

  const loginInfo = useSelector((state) => state);
  const [form] = Form.useForm();
  const [finalPaymentForm] = Form.useForm();
  const [requirementsForm] = Form.useForm();
  const [internalReqForm] = Form.useForm();
  const {
    selectedCallType,
    selectedSubType,
    customerData,
    setSelectedSubType,
    freeLookForm,
    policyDetails,
    POSContactData,
    selectedSubTypeId,
    SelectedSubTypeVal,
    clientEnquiryData,
    requestModeLU,
    registerModeLU,
    bankAccTypeLU
  } = props;
  const [isShowPOSScreen, setIsShowPOSScreen] = useState(false); //pos screen showing purpose
  const [isLoading, setIsLoading] = useState(false);
  const [showResonDelayField, setShowReasonDelayField] = useState(false);
  const [isFundTransferSelection, setIsFundTransferSelection] = useState("");
  const [isRequestForSelection, setIsRequestForSelection] = useState("");
  const [payoutDetailsOpen, setPayoutDetailsOpen] = useState(false);
  const [isPolicyFreelookSelection, setIsPolicyFreelookSelection] =
    useState("");
  const [isPolicyDispatchSelection, setIsPolictDispatchSelection] =
    useState("");
  const [isCustomerRetainedSelection, setIsCustomerRetainedSelection] =
    useState("");
  const suffix = <img src={UploadIcon} alt="" />;
  const [checkedList, setCheckedList] = useState([]);
  const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [alertTitle, setAlertTitle] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [alertData, setAlertData] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [PennyDropResponse, setPennyDropResponse] = useState({});
  const [isShowPOSManagerScreen, setIsShowPOSManagerScreen] = useState(false);
  const [clickedButton, setClickedButton] = useState("");
  const [activeCheckboxval, setActiveCheckboxval] = useState("");
  const [activecommuType, setActivecommuType] = useState();
  const [uploadFiles, setUploadFiles] = useState([]);
  const loggedUser = useSelector((state) => state?.userProfileInfo?.profileObj);
  const [CNFBankAccNo, setCNFBankAccNo] = useState("");
  const [BankAccNo, setBankAccNo] = useState("");
  const [showBankDeDupeModal, setShowBankDeDupeModal] = useState(false);
  const [SignListModal, setSignListModal] = useState(false);
  const [negativeListModal, setNegativeModal] = useState(false);
  const [BankduDupeData, setBankDeDupeData] = useState([]);
  const [negativeList, setNegativeList] = useState([]);
  const [signatureDeDupeData, setSignatureDeDupeData] = useState([]);
  const [isDocLinks, setIsDocLinks] = useState([]);
  const [isProcessLink, setIsProcessLink] = useState("");
  const [isDocLink, setIsDocLink] = useState("");
  const [RelodComponent, setRelodComponent] = useState(false);
  const [ReRenderComponent, setReRenderComponent] = useState(false);
  const [InternaRequirements, setInternalFlowRequirements] = useState("");
  const [FundValueData, setFundValueData] = useState(null);
  const [isFreelookAmtLoader, setIsFreelookAmtLoader] = useState(false);
  const [isUploadMultipleFiles, setIsMultipleFiles] = useState([]);
  const [addressProofModal, setAddressProofModal] = useState(false);
  const [aadharUploadFiles, setAAdharUploadFiles] = useState([]);
  const [passportUploadFiles, setPassportUploadFiles] = useState([]);
  const [rationCardUploadFiles, setRationCardUploadFiles] = useState([]);
  const [DrivingUploadFiles, setDrivingUploadFiles] = useState([]);
  const [uploadMultipleFiles, setUploadMultipleFiles] = useState([]);
  const [voterUploadFiles, setVoterUploadFiles] = useState([]);
  const [pancardUploadFiles, setPancardUploadFiles] = useState([]);
  const [showUploadFile, setShowUploadFile] = useState(null);
  const [disableSubmutBtn, setDisableSubmutBtn] = useState(false);
  const [enquiryListData, setEnquiryListData] = useState([]);
  const [rtoDetails, setRtoDetails] = useState([]);
  const [viewDispatchDetails, setViewDispatchDetails] = useState([]);

  const [docIdProofs, setDocIdProofs] = useState([]);
  const [finalPayableAmtModal, setFinalPayableAmtModal] = useState(false);
  const [GCPDetailsData, setGCPDetailsData] = useState({
    policyAttribute: [],
  });

  const formFeilds = form.getFieldsValue();
  const posScreenObj = {
    FreeLookAmount: "",
    FundTransfer: "",
    RequestTime: "",
    ReasonForDelay: "",
    Comments: "",
    FundTransferTo: "",
    FundTransferAmount: "",
    RelationsToFTPolicy: "",
    NameOfFundTransferPolicyOwner: "",
    BalanceAmountForFreelook: "",
    NameAsMentionedInTheBank: "",
    BankIFSC: "",
    BankAccountNumber: "",
    BankName: "",
    InitiatePennyDrop: "",
    PANAadhaarLinked: "",
    ValidateSignature: "",
    CustomerSigningDate: "",
    BranchReceivedDate: "",
    PayableAmount: "",
    NameMatch: "",
    BranchName: "",
    AccountType: "",
    requestchannel: "",
    AdditionalNoteForCustomer: "",
  };
  useEffect(() => {
    if (selectedSubType === "statusenquiry") {
      getGCPPolicydetails();
    }
    if (loggedUser?.role === 5) {
      setIsShowPOSManagerScreen(true);
      setIsShowPOSScreen(false);
    } else if (loggedUser?.role === 4) {
      setIsShowPOSScreen(true);
    }

    if (POSContactData && customerData?.isPOS) {
      if (POSContactData?.deDupPayload?.length > 0) {
        for (let index in POSContactData?.deDupPayload) {
          //  if(POSContactData?.deDupPayload[index]?.type ==='BANK') {
          //    setBankDeDupeData(POSContactData?.deDupPayload[index]?.deDupPayload);
          //  }
          if (POSContactData?.deDupPayload[index]?.type === "NEGATIVELIST") {
            setNegativeList(POSContactData?.deDupPayload[index]?.deDupPayload);
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
      FreelookData[selectedSubType]?.POS_Details?.forEach((item, index) => {
        if (!posScreenObj?.ReasonForDelay && item?.name === "ReasonForDelay") {
          item.hide = true;
        }
      });
      FreelookData[selectedSubType]?.POS_Manager_Details?.forEach(
        (item, index) => {
          if (
            !posScreenObj?.ReasonForDelay &&
            item?.name === "ReasonForDelay"
          ) {
            item.hide = true;
          }
        }
      );
      FreelookData[selectedSubType]?.POS_FundTransfer_Fields?.forEach(
        (item, index) => {
          if (
            item?.name === "ReasonForDelay" &&
            !posScreenObj?.ReasonForDelay
          ) {
            item.hide = true;
          }
          if (posScreenObj?.FundTransfer === "no") {
            if (
              item?.name === "FundTransferTo" ||
              item?.name === "FundTransferAmount" ||
              item?.name === "RelationsToFTPolicy" ||
              item?.name === "NameOfFundTransferPolicyOwner" ||
              item?.name === "BalanceAmountForFreelook" ||
              item?.name === "CustomerSigningDate" ||
              item?.name === "BalanceAmountForFreelook" ||
              item?.name === "BalanceAmountForFreelook"
            ) {
              item.hide = true;
            }
          }
        }
      );

      // FreelookData[selectedSubType]?.POS_Action_Fields?.forEach((item, index) => {

      //   if (posScreenObj?.FundTransfer === 'yes' ) {

      //      if(item?.name === "BankAccountDeDupe" || item?.name === "InitiatePennyDropPOS" ){
      //       item.hide = true;
      //      }

      //   }
      // });

      form.setFieldsValue({
        FreeLookAmount: posScreenObj.PayableAmount,
        RequestTime: posScreenObj.RequestTime,
        ReasonForDelay: posScreenObj.ReasonForDelay,
        BranchRemarks: posScreenObj.Comments,
        FundTransferTo: posScreenObj.FundTransferTo,
        FundTransferAmount: posScreenObj.FundTransferAmount,
        RelationsToFTPolicy: posScreenObj.RelationsToFTPolicy,
        NameOfFundTransferPolicyOwner:
          posScreenObj.NameOfFundTransferPolicyOwner,
        BalanceAmountForFreelook: posScreenObj.BalanceAmountForFreelook,
        CustomerSigningDate: POSContactData?.CustomerSigningDate
          ? convertDate(POSContactData?.CustomerSigningDate)
          : "",
        BranchReceivedDate: POSContactData?.BranchReceivedDate
          ? convertDate(POSContactData?.BranchReceivedDate)
          : "",
        FreelookRequestFor:
          posScreenObj.FundTransfer === "yes" ? "fundtransfer" : "freelook",
        NameAsMentionedInTheBank: posScreenObj.NameAsMentionedInTheBank,
        NameMatch: posScreenObj.NameMatch,
        BankIFSC: posScreenObj.BankIFSC,
        BankAccountNumber: posScreenObj.BankAccountNumber,
        BankName: posScreenObj.BankName,
        BranchName: posScreenObj?.BranchName,
        AccountType: posScreenObj?.AccountType,
        // PennydropResult:posScreenObj.PennydropResult,
        NameReceivedinPennyDrop: posScreenObj.NameReceivedinPennyDrop,
        PANAadhaarLinked: posScreenObj.PANAadhaarLinked,
        PennydropResult: posScreenObj.InitiatePennyDrop,
        ValidateSignature: posScreenObj.ValidateSignature,
        ChangeInLast60Days: POSContactData?.personalChange,
        PolicyLoggedLast: POSContactData?.policyLogged,
        ViewFinalPayableAmount: posScreenObj.PayableAmount,
        requestchannel: POSContactData?.reqMode,
      });
      setIsRequestForSelection(
        posScreenObj.FundTransfer === "yes" ? "fundtransfer" : "freelook"
      );
    } else {
      if (
        policyDetails?.policyDetailsObj?.planAndStatus?.productType === "UL"
      ) {
        FreelookData[selectedSubType]?.BOE_Details?.forEach((item, index) => {
          if (item?.name === "RequestTime") {
            item.hide = false;
          }
        });
        // FreelookData[selectedSubType]?.BOE_Details?.forEach((item, index) => {

        //   if (!item?.name ==="RequestTime") {
        //     item.hide = false;
        //   }
        // });
      }
      if (selectedSubType === "statusenquiry") {
        // let FreelookPeriodEndedOn = policyDetails.policyDetailsObj.salesDetails.channel === 'Online' ?
        // addDaysToDate(policyDetails?.policyDetailsObj?.saDetails?.rcd, 30) : addDaysToDate(policyDetails?.policyDetailsObj?.saDetails?.rcd, 15)
        let FreelookPeriodEndedOn = addDaysToDate(
          policyDetails?.policyDetailsObj?.saDetails?.rcd,
          import.meta.env.VITE_APP_FREELOOK_CANCELLATION_TIME
        );

        if (FreelookPeriodEndedOn) {
          const [day, month, year] =
            FreelookPeriodEndedOn.split("-").map(Number);
          const dateToCheck = new Date(year, month - 1, day); // Month is 0-based in JavaScript
          const today = new Date();

          // Compare dates
          // if (dateToCheck < today) {           //comment 25-07-2024
          //   setIsPolicyFreelookSelection('no')
          //   form.setFieldsValue({
          //     IsPolicyWithinFreelook: 'no'
          //   })

          // } else {
          //   setIsPolicyFreelookSelection('yes')
          //   form.setFieldsValue({
          //     IsPolicyWithinFreelook: 'yes'
          //   })
          // }
        }

        form.setFieldsValue({
          // FreelookPeriodEndedOn:policyDetails.policyDetailsObj.salesDetails.channel === 'Online' ?
          // addDaysToDate(policyDetails?.policyDetailsObj?.saDetails?.rcd, 30) : addDaysToDate(policyDetails?.policyDetailsObj?.saDetails?.rcd, 15),
          // FreelookPeriod:policyDetails.policyDetailsObj.salesDetails.channel === 'Online' ? 30:15,
          // FreelookPeriodEndedOn: addDaysToDate(policyDetails?.policyDetailsObj?.saDetails?.rcd, import.meta.env.VITE_APP_FREELOOK_CANCELLATION_TIME),
          FreelookPeriod: import.meta.env.VITE_APP_FREELOOK_CANCELLATION_TIME,
          DispatchDate: "2024-01-01",
          PODNo: "12121",
          ReceivedOn: "2024-01-01",
          ReceivedBy: "NEHA",
          RTOStatus: "TEST",
          PolicyRedispatch: "No",

          DispatchMode: "ONLINE",
          REDispatchDate: "2024-01-01",
          REReceivedOn: "2024-01-01",
          REReceivedBy: "NEHA",
          WelcomeCallDate: "",
          WelcomeCallComments: "",
        });
      }
      getProcesDocLnk();
      getProcesLink();
    }
  }, [selectedSubType]);

  const getProcesLink = () => {
    setIsProcessLink("");
    setIsDocLink("");
    let obj = {
      Call_Typ: selectedCallType,
      Sub_Typ: selectedSubTypeId,
    };
    let response = apiCalls.getProcesLink(obj);
    response
      .then((val) => {
        if (val?.data) {
          const filteredData = val?.data?.filter((ele) => {
            if (ele.docType === "AcceptableDocs") {
              setIsDocLink(ele.link);
            } else if (ele.docType === SelectedSubTypeVal) {
              setIsProcessLink(ele.link);
            }
            return ele.docType;
          });

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

  const handleChange = (value) => {
    setActiveCheckboxval(value);
    // If the checkbox is already checked, uncheck it
    if (checkedList.includes(value)) {
      setCheckedList([]);
    } else {
      // Otherwise, check it
      setCheckedList([value]);
      if (value?.includes("Register Request")) {
        setSelectedSubType("registerfreelookrequest");
        freeLookForm?.setFieldsValue({ subType: 1 });
      } else if (value?.includes("Enquiry")) {
        // getGCPPolicydetails();
      }
    }

    if (selectedSubType === "statusenquiry" && value === "Enquiry") {
      let PolicyRedispatch = "yes";
      if (PolicyRedispatch === "yes") {
        getClientEnquiry();
        FreelookData[selectedSubType]?.Enquiry_Fields?.forEach(
          (item, index) => {
            if (item?.d_PolicyRedispatch) {
              item.hide = false;
            }
          }
        );
      } else {
        FreelookData[selectedSubType]?.Enquiry_Fields?.forEach(
          (item, index) => {
            if (item?.d_PolicyRedispatch) {
              item.hide = true;
            }
          }
        );
      }
      setReRenderComponent(!ReRenderComponent);
      form.setFieldsValue({
        // FreelookPeriodEndedOn:policyDetails.policyDetailsObj.salesDetails.channel === 'Online' ?
        // addDaysToDate(policyDetails?.policyDetailsObj?.saDetails?.rcd, 30) : addDaysToDate(policyDetails?.policyDetailsObj?.saDetails?.rcd, 15),
        // FreelookPeriod:policyDetails.policyDetailsObj.salesDetails.channel === 'Online' ? 30:15,
        // FreelookPeriodEndedOn: addDaysToDate(policyDetails?.policyDetailsObj?.saDetails?.rcd, import.meta.env.VITE_APP_FREELOOK_CANCELLATION_TIME),
        FreelookPeriod: import.meta.env.VITE_APP_FREELOOK_CANCELLATION_TIME,
        DispatchDate: "2024-01-01",
        PODNo: "12121",
        ReceivedOn: "2024-01-01",
        ReceivedBy: "NEHA",
        RTOStatus: "TEST",
        PolicyRedispatch: PolicyRedispatch,

        DispatchMode: "ONLINE",
        REDispatchDate: "2024-01-01",
        REReceivedOn: "2024-01-01",
        REReceivedBy: "NEHA",
        WelcomeCallDate: "",
        WelcomeCallComments: "",
      });
    }
  };

  const getClientEnquiry = () => {
    setIsLoading(true);
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
          const res = val?.data?.responseBody;

          form.setFieldsValue({
            mobileNo: res?.rmblphone,
            whatsAppNo: res?.rmblphone,
            emailId: res?.rinternet,
          });

          setIsLoading(false);
        } else {
          setIsLoading(false);
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
        setIsLoading(false);
      });
  };

  const addDaysToDate = (date, days) => {
    let endDate = "";
    if (date) {
      const year = parseInt(date.substring(0, 4));
      const month = parseInt(date.substring(4, 6)) - 1; // Month is 0-based in JavaScript
      const day = parseInt(date.substring(6, 8));

      const startDate = new Date(year, month, day);
      startDate.setDate(startDate.getDate() + days);

      const endDateYear = startDate.getFullYear();
      const endDateMonth = String(startDate.getMonth() + 1).padStart(2, "0");
      const endDateDay = String(startDate.getDate()).padStart(2, "0");
      endDate = `${endDateDay}-${endDateMonth}-${endDateYear}`;
    }
    return endDate;
  };

  const handleRadioChange = (e, item) => {
    let selectionValue = e.target.value;
    if (
      selectionValue === "no" &&
      item?.label?.includes("Validate Signature")
    ) {
      setDisableSubmutBtn(true);
    } else if (
      selectionValue === "yes" &&
      item?.label?.includes("Validate Signature")
    ) {
      setDisableSubmutBtn(false);
    }
    //   if(item.name === "NameAsMentionedInTheBank" && e.target.value === 'no'){
    //     FreelookData[selectedSubType]?.FundTransfer_YesFields?.forEach((ele =>{
    //       if(ele.d_NameAsMentionedInTheBank){
    //          ele.hide=false
    //       }
    //   }))
    //   FreelookData[selectedSubType]?.FundTransfer_NoFields?.forEach((ele =>{
    //     if(ele.d_NameAsMentionedInTheBank){
    //        ele.hide=false
    //     }
    // }))
    //   setRelodComponent(!RelodComponent)
    //   }
    //    else if(item.name === "NameAsMentionedInTheBank" && e.target.value === 'yes'){
    //     FreelookData[selectedSubType]?.FundTransfer_YesFields?.forEach((ele =>{
    //       if(ele.d_NameAsMentionedInTheBank){
    //          ele.hide=true
    //       }
    //   }))
    //   FreelookData[selectedSubType]?.FundTransfer_NoFields?.forEach((ele =>{
    //     if(ele.d_NameAsMentionedInTheBank){
    //        ele.hide=true
    //     }
    // }))
    //   setRelodComponent(!RelodComponent)
    //   }

    //   setShowRaiseRequirementBtn(false);
    //  if((item?.label?.includes("Validate Signature")||item?.label?.includes("Signature Validated"))&&e.target.value==="no"){
    //   setShowRaiseRequirementBtn(true);
    //  }
    if (item?.label?.includes("Is Customer Retained")) {
      setIsCustomerRetainedSelection(e.target.value);
    }
  };

  const handleLabelLink = (item) => {
    setFinalPayableAmtModal(false);
    if (item.label === "Initiate Penny Drop") {
      InitiatePennyDropp();
    }
    if (
      item.name === "InitiatePennyDropPOS" &&
      formFeilds.InitiatePennyDrop === "Invalid Input"
    ) {
      InitiatePennyDropp();
    } else if (item?.name?.toLowerCase()?.includes("payableamount")) {
      setFinalPayableAmtModal(true);
      getFundValue();
      LoanEnquiry();
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
          setIsLoading(false);
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
        .catch((err) => {
          setIsLoading(false);
        });
    } else if (item.name === "negavativeList") {
      setNegativeModal(true);
    } else if (item.name === "SignatureChange") {
      setSignListModal(true);
    } else if (
      item.name === "ViewFreelookAmount" ||
      item.name === "FreeLookAmount"
    ) {
      getFundValue();
      getGCPPolicydetails();
    }
    if (
      item.name === "FreelookRequestForm" ||
      item.name === "PolicyBond" ||
      item.name === "PolicyownerIDproof" ||
      item.name === "PolicyOwnerBankAccountProof" ||
      item.name === "Outoffreelookapprovalemail"
    ) {
          const gConfig= apiCalls.getGenericConfig()
          if(gConfig?.data?.dmsApiUrl){
      const url =
        gConfig?.data?.dmsApiUrl+
        `/omnidocs/WebApiRequestRedirection?Application=BPMPOLENQ&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${policyDetails?.policyDetailsObj?.identifiers?.applicationNo}`;

      window.open(url, "_blank");
          }
    }
    setPayoutDetailsOpen(false);
    if (
      item?.label?.includes("Freelook Amount") ||
      item?.label?.includes("Freelook Payout")
    ) {
      setPayoutDetailsOpen(true);
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
    } else if (value?.length >= 4 && item.name === "BankAccountNumber") {
      const lastFourDigits = value.slice(-4);
      const maskedString = "*".repeat(value.length - 4) + lastFourDigits;
      form.setFieldsValue({ BankAccountNumber: maskedString });
    }

    if (item?.name?.includes("FundTransferAmount")) {
      let totalSurrenderAmount =
        policyDetails?.policyDetailsObj?.premiumDetails?.modelPremiumAmount;

      if (
        Number(value?.replace(/,/g, "")) >
        Number(totalSurrenderAmount?.replace(/,/g, ""))
      ) {
        form.setFieldsValue({
          FundTransferAmount: "",
          BalanceAmountForFreelook: "",
        });
        message.error({
          content: "Fund Transfer Amount Should not exceed Total Fund",
          className: "custom-msg",
          duration: 2,
        });
        return;
      }
      const fundValue = String(
        Number(totalSurrenderAmount?.replace(/,/g, "")) -
          Number(value?.replace(/,/g, ""))
      );
      form.setFieldsValue({ BalanceAmountForFreelook: fundValue });
      if (+fundValue > 0) {
        FreelookData[selectedSubType]?.FundTransfer_YesFields?.forEach(
          (ele) => {
            if (ele.d_BalanceAmount) {
              ele.hide = false;
            }
          }
        );
        setRelodComponent(!RelodComponent);
        //setShowBalanceFields(true);
      } else {
        FreelookData[selectedSubType]?.FundTransfer_YesFields?.forEach(
          (ele) => {
            if (ele.d_BalanceAmount) {
              ele.hide = true;
            }
          }
        );
      }
      setRelodComponent(!RelodComponent);
    }

    // if(item.name === 'reenteraccountNumber' || item.name === 'AccNumber_New'){
    //    if(obj.reenteraccountNumber && obj.AccNumber_New && (obj.reenteraccountNumber !== obj.AccNumber_New) ){
    //     message.destroy();
    //     message.error({
    //       content:
    //         "Bank Number Not matched",
    //       className: "custom-msg",
    //       duration: 2,
    //     });
    //     form.setFieldsValue({reenteraccountNumber: ''})

    //    }
    // }
  };

  const setInternalReqData = () => {
    POSContactData.serviceRequestTransectionData?.forEach((element) => {
      if (element.tagName === "InternalRequirementValue") {
        setInternalFlowRequirements(props.interlRequirementTagValue);
      }
    });
  };

  const handleDropdownChange = (e, item) => {
    if (item.name === "IsPolicyWithinFreelook") {
      handleValidate(item);
    }
    const label = item?.label;
    switch (true) {
      case label?.includes("Do you wish to opt for fund transfer"):
        setIsFundTransferSelection(e);
        break;
      case label?.includes("Request For"):
        setIsRequestForSelection(e);
        break;
      case label?.includes("Is Policy Within Freelook"):
        setIsPolicyFreelookSelection(e);
        break;
      case label?.includes("Policy Redispatch"):
        setIsPolictDispatchSelection(e);
        break;
      // case label?.includes("Is Customer Retained"):
      //   setIsCustomerRetainedSelection(e);
      //   break;
      default:
        // Handle default case if needed
        break;
    }

    if (item.name === "PolicyRedispatch" && (e === "yes" || e === "no")) {
      form.setFieldsValue({
        DispatchMode: "",
        REDispatchDate: "",
        REPODNo: "",
        REReceivedOn: "",
        REReceivedBy: "",
        WelcomeCallDate: "",
        WelcomeCallComments: "",
      });
    }
  };

  const handleValidate = (itemDate) => {
    const dispatchDateStr = itemDate; // e.g., '20191115'

    if (!dispatchDateStr) {
      console.error("Dispatch Delivery Date not available.");
      return;
    }

    const dispatchDate = moment(dispatchDateStr, "YYYYMMDD"); // Parse the dispatch date
    const today = moment(); // Current date
    const daysDiff = today.diff(dispatchDate, "days"); // Calculate difference in days

    const value = daysDiff < 30 ? "Yes" : "No"; // If < 30 days, Yes; otherwise, No

    // Set the value in the form and disable the dropdown dynamically
    form.setFieldsValue({ IsPolicyWithinFreelook: value }); // Dynamically set form value
    // Disable the dropdown in-place
  };

  const getIFSCBankDetails = async (ifscCode) => {
    let response = await apiCalls.getIFSCBanks(ifscCode);
    if (response.statusText) {
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
      let newDate = new Date();
      let todayDate = moment(newDate).format("MM/DD/YYYY");
      let selectDate = moment(date + 1).format("MM/DD/YYYY");
      const formFeilds = form.getFieldsValue();
      let customerSignDate = moment(formFeilds?.CustomerSigningDate + 1).format(
        "MM/DD/YYYY"
      );
      let dateDiffence = date_diff_indays(selectDate, customerSignDate);
      if (!formFeilds?.CustomerSigningDate || dateDiffence > 0) {
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
      } else {
        if (selectDate < todayDate) {
          FreelookData[selectedSubType]?.FundTransfer_YesFields?.forEach(
            (ele) => {
              if (ele.d_branchReceivedDate) {
                ele.hide = false;
              }
            }
          );

          FreelookData[selectedSubType]?.FundTransfer_NoFields?.forEach(
            (ele) => {
              if (ele.d_branchReceivedDate) {
                ele.hide = false;
              }
            }
          );
        } else if (selectDate >= todayDate) {
          FreelookData[selectedSubType]?.FundTransfer_YesFields?.forEach(
            (ele) => {
              if (ele.d_branchReceivedDate) {
                ele.hide = true;
              }
            }
          );

          FreelookData[selectedSubType]?.FundTransfer_NoFields?.forEach(
            (ele) => {
              if (ele.d_branchReceivedDate) {
                ele.hide = true;
              }
            }
          );
        }

        // FreelookData[selectedSubType]?.Checklist?.forEach(element => {
        //   if(element?.label?.includes("Reason For Delayed Submission")&&selectDate < todayDate){
        //     element.hide= false;
        //     setShowReasonDelayField(true);
        //   }
        //   else if(element?.label?.includes("Reason For Delayed Submission")&&selectDate >= todayDate){
        //     element.hide= true;
        //     setShowReasonDelayField(false);
        //   }
        // });
      }
    }

    if (
      item?.toLowerCase() === "branchreceiveddate" ||
      item?.name === "branchreceiveddate"
    ) {
      setShowReasonDelayField(false);
      let newDate = new Date();
      let todayDate = moment(newDate).format("DD/MM/YYYY");
      let selectDate = moment(date + 1).format("DD/MM/YYYY");
      if (selectDate < todayDate) {
        setShowReasonDelayField(true);
      }
    }
  };

  // const handleSubmit = () => {
  //   if(selectedSubType==="registerfreelookrequest"){
  //     setIsShowPOSScreen(!isShowPOSScreen);
  //   }
  // };

  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day"); // Can not select days before today and today
  };

  const handleEdit = (val) => {
    if (val === "edit") {
      FreelookData[selectedSubType]?.POS_View_Documents?.forEach(
        (item, index) => {
          if (item.posEdit) {
            item.disabled = false;
          }
        }
      );
    } else if (val === "close") {
      FreelookData[selectedSubType]?.POS_View_Documents?.forEach(
        (item, index) => {
          if (item.posEdit) {
            item.disabled = true;
          }
        }
      );
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        posScreenObj[element.tagName] = element.tagValue;
      });
      form.setFieldsValue({
        NameAsMentionedInTheBank: posScreenObj.NameAsMentionedInTheBank,
        BankIFSC: posScreenObj.BankIFSC,
        BankAccountNumber: posScreenObj.BankAccountNumber,
        BankName: posScreenObj.BankName,
        AccountType: posScreenObj.AccountType,
        // PennydropResult:posScreenObj.PennydropResult,
        NameReceivedinPennyDrop: posScreenObj.NameReceivedinPennyDrop,
      });
    }
  };

  const handleSubmit = (values) => {
    //POSApprove RaiseRequirement
    if (POSContactData && customerData?.isPOS) {
      if (clickedButton === "RaiseRequirement") {
        getRaiseRequirements();
        // POSActionsOnContactDetails(values, "REJECTED");
      } else if (clickedButton === "POSApprove") {
        const values = form.getFieldsValue();
        POSActionsOnContactDetails(values, "APPROVED");
      }
    } else {
      if (formFeilds.ValidateSignature === "no") {
        //getRaiseRequirements();
        saveRequest();
      } else {
        saveRequest();
      }
    }
  };

  const saveRequest = () => {
    const values = form.getFieldsValue();
    if (values.CustomerSigningDate > values.BranchReceivedDate) {
      message.destroy();
      message.error({
        content:
          " customer signing date  can't be greater than  Request Received Date.",
        className: "custom-msg",
        duration: 3,
      });
      form.setFieldsValue({
        CustomerSigningDate: "",
      });
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setShowAlert(false);
    let subtypeID = null;
    if (
      selectedSubType === "statusenquiry" &&
      activeCheckboxval === "Retention Attempted" &&
      formFeilds.customerRetained === "no"
    ) {
      subtypeID = 4;
    } else if (
      selectedSubType === "statusenquiry" &&
      activeCheckboxval === "Retention Attempted" &&
      formFeilds.customerRetained === "yes"
    ) {
      subtypeID = 3;
    } else {
      subtypeID = props?.selectedSubTypeId;
    }
    let obj = {
      CallType: props?.selectedCallType,
      SubType: subtypeID,
      Category:
        selectedSubType === "registerfreelookrequest" || raiseRequirementOpen
          ? 2
          : 1,
      RequestSource: loginInfo?.userProfileInfo?.profileObj?.role || 0, // Required
      RequestChannel:
        loginInfo?.userProfileInfo?.profileObj?.role === 14
          ? 13
          : values.requestchannel || 3,
      ApplicationNo:
        policyDetails?.policyDetailsObj?.identifiers?.applicationNo,
      PolicyNo: policyDetails?.policyDetailsObj?.identifiers?.policyNo,
      CustomerId: customerData?.laClientID,
      CustRole: 1,
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
      AssignedToRole: "",
      AssignedByUser: 0,
      ReasonForChange: "",
      RequestDateTime:  values?.BranchReceivedDate
        ? new Date(values?.BranchReceivedDate)
        : new Date(),
      CustSignDateTime: values?.CustomerSigningDate
        ? new Date(values?.CustomerSigningDate)
        : new Date(),
      CurrentStatus: raiseRequirementOpen ? "Reject" : "",
      TransactionData: [],
      Uploads: uploadFiles,
      CommunicationRequest: [
        {
          SrvReqRefNo: "",
          TemplateID: "",
          CommType: 2, // Use the integer value corresponding to the CommType enum (1 for SMS, 2 for EMAIL, 3 for WHATSAPP)
          ReceipientTo: import.meta.env.VITE_APP_RECEIPIENT_TO
            ? import.meta.env.VITE_APP_RECEIPIENT_TO
            : clientEnquiryData?.rinternet,
          ReceipientCC: "RecipientCCValue2",
          MobileNos: "",
          ScheduledTime: "2023-10-31T10:30:00", // Use a valid date-time format
          CommBody: "", // Payment Link nothing to required
          Attachments: null,
        },
        // {
        //     "SrvReqRefNo": "",
        //     "TemplateID": "",
        //     "CommType": 1, // Use the integer value corresponding to the CommType enum (1 for SMS, 2 for EMAIL, 3 for WHATSAPP)
        //     "ReceipientTo": "",
        //     "ReceipientCC": "RecipientCCValue2",
        //     "MobileNos": "",
        //     "ScheduledTime": "2023-10-31T10:30:00", // Use a valid date-time format
        //     "CommBody": "", // Payment Link nothing to required
        //     "Attachments": null
        // }
      ],
    };

    if (
      selectedSubType === "registerfreelookrequest" &&
      formFeilds.FundTransfer === "no"
    ) {
      obj.TransactionData.push(
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: formFeilds?.AdditionalNoteForCustomer || "",
        },
        {
          Status: "Create",
          TagName: "POName",
          TagValue: customerData?.poName,
        },
        {
          Status: "Create",
          TagName: "ProductType",
          TagValue: policyDetails?.policyDetailsObj?.planAndStatus?.productType,
        },
        {
          Status: "Create",
          TagName: "RCD",
          TagValue: convertDate(
            policyDetails?.policyDetailsObj?.saDetails?.rcd
          ),
        },
        {
          Status: "Create",
          TagName: "APE",
          TagValue: customerData?.premiumAmt,
        },

        {
          Status: "Create",
          TagName: "FundTransfer",
          TagValue: formFeilds.FundTransfer,
        },
        {
          Status: "Create",
          TagName: "RequestTime",
          TagValue: formFeilds.RequestTime,
        },
        // {
        //     "Status": "Create",
        //     "TagName": "FreelookApprovalEmail",
        //     "TagValue": formFeilds.FreelookApprovalEmail
        // },
        {
          Status: "Create",
          TagName: "PANAadhaarLinked",
          TagValue: formFeilds.PANAadhaarLinked,
        },
        {
          Status: "Create",
          TagName: "CustomerSigningDate",
          TagValue: formFeilds.CustomerSigningDate,
        },
        {
          Status: "Create",
          TagName: "BranchReceivedDate",
          TagValue: formFeilds.BranchReceivedDate,
        },
        {
          Status: "Create",
          TagName: "ValidatedBy",
          TagValue: "form",
        },
        {
          Status: "Create",
          TagName: "ValidateSignature",
          TagValue: formFeilds.ValidateSignature,
        },
        {
          Status: "Create",
          TagName: "NameAsMentionedInTheBank",
          TagValue: formFeilds.NameAsMentionedInTheBank,
        },
        {
          Status: "Create",
          TagName: "BankIFSC",
          TagValue: formFeilds.BankIFSC?.toUpperCase(),
        },
        {
          Status: "Create",
          TagName: "BankAccountNumber",
          TagValue: BankAccNo,
        },
        {
          Status: "Create",
          TagName: "ConfirmBankAccountNumber",
          TagValue: CNFBankAccNo,
        },
        {
          Status: "Create",
          TagName: "BankName",
          TagValue: formFeilds?.BankName,
        },
        {
          Status: "Create",
          TagName: "BranchName",
          TagValue: formFeilds?.BranchName,
        },
         {
          Status: "Create",
          TagName: "AccountType",
          TagValue: formFeilds?.AccountType,
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: formFeilds?.Comments,
        },

        {
          Status: "Create",
          TagName: "InitiatePennyDrop",
          TagValue: formFeilds.InitiatePennyDrop,
        },
        {
          Status: "Create",
          TagName: "ReasonForDelay",
          TagValue: formFeilds.ReasonForDelay,
        },
        {
          Status: "Create",
          TagName: "PayableAmount",
          TagValue:
            policyDetails?.policyDetailsObj?.premiumDetails?.modelPremiumAmount?.replace(
              /,/g,
              ""
            ),
        },
        {
          Status: "Create",
          TagName: "TotalAmount",
          TagValue:
            policyDetails?.policyDetailsObj?.premiumDetails?.modelPremiumAmount?.replace(
              /,/g,
              ""
            ),
        },

        {
          Status: "Create",
          TagName: "PennyDropResponse",
          TagValue: JSON.stringify(PennyDropResponse),
        },
        {
          Status: "Create",
          TagName: "FundTransferAmount",
          TagValue: 0,
        },
        {
          Status: "Create",
          TagName: "NameAsMentionedInTheBank",
          TagValue: formFeilds.NameAsMentionedInTheBank,
        },
        {
          Status: "Create",
          TagName: "NameMatch",
          TagValue: formFeilds.NameMatch,
        }
      );
    } else if (
      selectedSubType === "registerfreelookrequest" &&
      formFeilds.FundTransfer === "yes"
    ) {
      obj.TransactionData.push(
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "POName",
          TagValue: customerData?.poName,
        },
        {
          Status: "Create",
          TagName: "ProductType",
          TagValue: policyDetails?.policyDetailsObj?.planAndStatus?.productType,
        },
        {
          Status: "Create",
          TagName: "RCD",
          TagValue: customerData?.premiumAmt,
        },
        {
          Status: "Create",
          TagName: "APE",
          TagValue: convertDate(
            policyDetails?.policyDetailsObj?.saDetails?.rcd
          ),
        },
        {
          Status: "Create",
          TagName: "FundTransfer",
          TagValue: formFeilds.FundTransfer,
        },
        {
          Status: "Create",
          TagName: "RequestTime",
          TagValue: formFeilds.RequestTime,
        },
        {
          Status: "Create",
          TagName: "ReasonForFreelook",
          TagValue: formFeilds.ReasonForFreelook,
        },

        {
          Status: "Create",
          TagName: "FundTransferTo",
          TagValue: formFeilds.FundTransferTo,
        },
        {
          Status: "Create",
          TagName: "FundTransferAmount",
          TagValue: formFeilds.FundTransferAmount?.replace(/,/g, ""),
        },
        {
          Status: "Create",
          TagName: "RelationsToFTPolicy",
          TagValue: formFeilds.RelationsToFTPolicy,
        },
        {
          Status: "Create",
          TagName: "NameOfFundTransferPolicyOwner",
          TagValue: formFeilds.NameOfFundTransferPolicyOwner,
        },
        {
          Status: "Create",
          TagName: "BalanceAmountForFreelook",
          TagValue: formFeilds.BalanceAmountForFreelook,
        },
        {
          Status: "Create",
          TagName: "NameAsMentionedInTheBank",
          TagValue: formFeilds.NameAsMentionedInTheBank,
        },
        {
          Status: "Create",
          TagName: "BankIFSC",
          TagValue: formFeilds?.BankIFSC?.toUpperCase(),
        },
        {
          Status: "Create",
          TagName: "BankAccountNumber",
          TagValue: BankAccNo,
        },
        {
          Status: "Create",
          TagName: "ConfirmBankAccountNumber",
          TagValue: CNFBankAccNo,
        },
        {
          Status: "Create",
          TagName: "BankName",
          TagValue: formFeilds.BankName,
        },
        {
          Status: "Create",
          TagName: "BranchName",
          TagValue: formFeilds?.BranchName,
        },
          {
          Status: "Create",
          TagName: "AccountType",
          TagValue: formFeilds?.AccountType,
        },
        {
          Status: "Create",
          TagName: "InitiatePennyDrop",
          TagValue: formFeilds.InitiatePennyDrop,
        },
        // {
        //     "Status": "Create",
        //     "TagName": "FreelookApprovalEmail",
        //     "TagValue": formFeilds.FreelookApprovalEmail
        // },

        {
          Status: "Create",
          TagName: "PANAadhaarLinked",
          TagValue: formFeilds.PANAadhaarLinked,
        },
        {
          Status: "Create",
          TagName: "CustomerSigningDate",
          TagValue: formFeilds.CustomerSigningDate,
        },
        {
          Status: "Create",
          TagName: "BranchReceivedDate",
          TagValue: formFeilds.BranchReceivedDate,
        },
        {
          Status: "Create",
          TagName: "ValidateSignature",
          TagValue: formFeilds.ValidateSignature,
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: formFeilds.Comments,
        },
        {
          Status: "Create",
          TagName: "ValidatedBy",
          TagValue: "form",
        },
        {
          Status: "Create",
          TagName: "ReasonForDelay",
          TagValue: formFeilds.ReasonForDelay,
        },
        {
          Status: "Create",
          TagName: "PayableAmount",
          TagValue: formFeilds.BalanceAmountForFreelook?.replace(/,/g, ""),
        },
        {
          Status: "Create",
          TagName: "TotalAmount",
          TagValue:
            policyDetails?.policyDetailsObj?.premiumDetails?.modelPremiumAmount?.replace(
              /,/g,
              ""
            ),
        },
        {
          Status: "Create",
          TagName: "PennyDropResponse",
          TagValue: JSON.stringify(PennyDropResponse),
        },
        {
          Status: "Create",
          TagName: "NameAsMentionedInTheBank",
          TagValue: formFeilds.NameAsMentionedInTheBank,
        },
        {
          Status: "Create",
          TagName: "NameMatch",
          TagValue: formFeilds.NameMatch,
        }
      );
    } else if (
      selectedSubType === "statusenquiry" &&
      activeCheckboxval === "Enquiry"
    ) {
      obj.TransactionData.push(
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "FreelookPeriodEndedOn",
          TagValue: formFeilds.FreelookPeriodEndedOn,
        },
        {
          Status: "Create",
          TagName: "FreelookPeriod",
          TagValue: formFeilds.FreelookPeriod,
        },
        {
          Status: "Create",
          TagName: "DispatchDate",
          TagValue: formFeilds.DispatchDate,
        },
        {
          Status: "Create",
          TagName: "PODNo",
          TagValue: formFeilds.PODNo,
        },
        {
          Status: "Create",
          TagName: "ReceivedOn",
          TagValue: formFeilds.ReceivedOn,
        },
        {
          Status: "Create",
          TagName: "ReceivedBy",
          TagValue: formFeilds.ReceivedBy,
        },
        {
          Status: "Create",
          TagName: "RTOStatus",
          TagValue: formFeilds.RTOStatus,
        },
        {
          Status: "Create",
          TagName: "PolicyRedispatch",
          TagValue: formFeilds.PolicyRedispatch,
        },

        {
          Status: "Create",
          TagName: "DispatchMode",
          TagValue: formFeilds.DispatchMode,
        },
        {
          Status: "Create",
          TagName: "REDispatchDate",
          TagValue: formFeilds.REDispatchDate,
        },
        {
          Status: "Create",
          TagName: "REPODNo",
          TagValue: formFeilds.REPODNo,
        },
        {
          Status: "Create",
          TagName: "REReceivedOn",
          TagValue: formFeilds.REReceivedOn,
        },
        {
          Status: "Create",
          TagName: "REReceivedBy",
          TagValue: formFeilds.REReceivedBy,
        },
        {
          Status: "Create",
          TagName: "WelcomeCallDate",
          TagValue: formFeilds.WelcomeCallDate,
        },
        {
          Status: "Create",
          TagName: "WelcomeCallComments",
          TagValue: formFeilds.WelcomeCallComments,
        },
        {
          Status: "Create",
          TagName: "FreeLookFileType",
          TagValue: activecommuType,
        },
        { Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER" },
        { Status: "Create", TagName: "DocLink", TagValue: isDocLink },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink }
      );
    } else if (
      selectedSubType === "statusenquiry" &&
      activeCheckboxval === "Retention Attempted"
    ) {
      obj.TransactionData.push(
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "IsCustomerRetained",
          TagValue: formFeilds.IsCustomerRetained,
        },
        { Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER" },
        { Status: "Create", TagName: "DocLink", TagValue: isDocLink },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink }
      );
    } else if (selectedSubType === "freelookcancellationdecline") {
      const values = form.getFieldsValue();
      obj.TransactionData.push(
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },

        {
          Status: "Create",
          TagName: "UserComments",
          TagValue: values?.UserComments || "",
        }
      );
    }
    // if(formFeilds.ValidateSignature === 'no'){
    //   let ids = raiseRequerimentList?.filter((e) => e.status === true)?.map((e) => e.raiseReqId)

    //   obj.TransactionData.push({
    //     "Status": "Create",
    //     "TagName": "ReasonList_Key",
    //     "TagValue":  JSON.stringify(ids)
    //   })
    // }

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
        setIsLoading(false);
        setRequirementLoader(false);
        return;
      }
    }
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
    obj.TransactionData.push({
      Status: "Create",
      TagName: "CustomerType",
      TagValue: policyDetails?.policyDetailsObj?.planAndStatus?.customerType,
    });
    let response = apiCalls.genericAPI(obj);
    response
      .then((val) => {
        if (val?.data) {
          // if(!val?.data?.srvReqRefNo){
          setAlertTitle(val?.data?.header);
          setAlertData(val?.data?.message);
          setShowAlert(true);
          setIsLoading(false);
          setRequirementLoader(false);
          //     return
          //   }
          //   setIsLoading(false);
          //   if (val?.data?.category == 2) {
          //     setAlertTitle("Request Created Successfully");
          //     let successMessage = val?.data?.tat > 0 ?
          //       `Ticket ID Number ${val?.data?.srvReqRefNo}. Your request will be processed in ${val?.data?.tat || 0} days`
          //       : `Ticket ID Number ${val?.data?.srvReqRefNo}.`;
          //     setAlertData(successMessage);
          //   } else {
          //     setAlertTitle("Query Raised Successfully");
          //     let successMessage = `Ticket ID Number ${val?.data?.srvReqRefNo}.`;
          //     setAlertData(successMessage);
          //   }
          //   setNavigateTo("/advancesearch");

          //   // setAlertData(`${"Ticket No " + val?.data?.srvReqRefNo}`);
          //  setShowAlert(true);
          //  setNavigateTo("/advancesearch");
        } else {
          message.error({
            content:
              val?.data?.responseBody?.errormessage ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
        setIsLoading(false);
        setRequirementLoader(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setRequirementLoader(false);
      });
  };

  const getRaiseRequirements = () => {
    const formData = form.getFieldValue();
    setRaiseRequirementOpen(true);
    setRequirementLoader(true);
    let obj = {
      calltype: props?.selectedCallType,
      subtype: 1,
      Role: isShowPOSScreen ? 0 : 1,
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
    // const formData = form.getFieldValue();
    setRequirementLoader(true);
    // let seletedRequerimentList = raiseRequerimentList
    // ?.filter((e) => e.status === true)
    // ?.map((e) => e.raiseReqId);
    // if(seletedRequerimentList.length===0 ){
    //   setIsLoading(false);
    //   setRequirementLoader(false);
    //   message.destroy();
    //   message.error({
    //     content: "Please Select Documents to Reject",
    //     className: "custom-msg",
    //     duration: 3,
    //   });
    // return;
    // }
    // else{
    //   saveRequest();
    // }
    if (isShowPOSScreen) {
      POSActionsOnContactDetails(null, "REJECTED");
    } else {
      saveRequest();
    }
  };
  const popupClose = () => {
    setRaiseRequirementOpen(false);
  };

  const POSActionsOnContactDetails = (val, status, list) => {
    let content =
      status === "REJECTED"
        ? "Please Select Documents to Reject"
        : "Please Select Documents to move  Internally";
    let seletedRequerimentList;
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
      let reqFormValues = requirementsForm?.getFieldsValue();
      let internalFormValues = internalReqForm?.getFieldsValue();
    if (status !== "APPROVED") {
      if (
        ((seletedRequerimentList.length === 0 && !reqFormValues?.PosOtherReq) && status === "REJECTED") ||
        ((seletedRequerimentList.length === 0 && !internalFormValues?.PosInternalReq) && status === "INTERNAL")
      ) {
        setIsLoading(false);
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

    let obj = {
      TransectionId: 1,
      SrvReqRefNo: POSContactData?.srvReqRefNo,
      Status: status,
      RequirementList: seletedRequerimentList,
      UsrID: loginInfo?.userProfileInfo?.profileObj?.userName,
      RoleID: loginInfo?.userProfileInfo?.profileObj?.role,
      // "RequirementComments":requirementCmnt,
      POSComments1: val?.POSComments,
      TransactionPayload: [],
    };
    if (status === "INTERNAL") {
      obj.TransactionPayload.push({
        Status: "create",
        TagName: "InternalRequirementValue",
        TagValue: JSON.stringify(seletedRequerimentList),
      },
      {
            "Status": "create",
            "TagName": "PosInternalReq",
            "TagValue": internalFormValues?.PosInternalReq || ""
        },
    );
    }
    obj?.TransactionPayload?.push({
      Status: "Create",
      TagName: "POSComments1",
      TagValue: val?.POSComments,
    });
     if(isShowPOSScreen){
    obj.TransactionPayload.push({
        "Status": "Create",
        "TagName": "PosOtherReq",
        "TagValue": reqFormValues?.PosOtherReq || ""
      });
    }
    if (loggedUser?.role === 4) {
      obj.TransactionPayload.push(
        {
          Status: "Update",
          TagName: "NameAsMentionedInTheBank",
          TagValue: val?.NameAsMentionedInTheBank,
        },
        {
          Status: "Update",
          TagName: "BankIFSC",
          TagValue: val?.BankIFSC?.toUpperCase(),
        },
        {
          Status: "Update",
          TagName: "BankAccountNumber",
          TagValue: val?.BankAccountNumber,
        },
        {
          Status: "Update",
          TagName: "BankName",
          TagValue: val?.BankName,
        },
        {
          Status: "Update",
          TagName: "BranchName",
          TagValue: val?.BranchName,
        },
         {
          Status: "Update",
          TagName: "AccountType",
          TagValue: val?.AccountType,
        },
        {
          Status: "Update",
          TagName: "PennydropResult",
          TagValue: val?.PennydropResult,
        },
        {
          Status: "Update",
          TagName: "NameasperPennyDrop",
          TagValue: val?.NameasperPennyDrop,
        },
        {
          Status: "Update",
          TagName: "NameAsMentionedInTheBank",
          TagValue: val?.NameAsMentionedInTheBank,
        },
        {
          Status: "Update",
          TagName: "NameMatch",
          TagValue: val?.NameMatch,
        },

        {
          Status: "Create",
          TagName: "PaymentMode",
          TagValue: val?.paymentMode,
        },
        {
          Status: "Create",
          TagName: "ChangeInLast60Days",
          TagValue: val?.ChangeInLast60Days,
        },
        {
          Status: "Create",
          TagName: "PolicyLoggedLast",
          TagValue: val?.PolicyLoggedLast,
        },
        {
          Status: "Create",
          TagName: "SignatureChange",
          TagValue: val?.SignatureChange,
        },

        {
          Status: "Create",
          TagName: "ViewFinalPayableAmount",
          TagValue: val?.ViewFinalPayableAmount?.replace(/,/g, ""),
        },
        {
          Status: "Create",
          TagName: "InitiatePennyDropPOS",
          TagValue: val?.InitiatePennyDropPOS,
        },
        {
          Status: "Create",
          TagName: "POSActionNameasperPennyDrop",
          TagValue: val?.POSActionNameasperPennyDrop,
        },
        {
          Status: "Create",
          TagName: "POSActionNameMatch",
          TagValue: val?.POSActionNameMatch,
        }
      );
    }
    if (loggedUser?.role === 5) {
      obj.TransactionPayload.push(
        {
          Status: "Create",
          TagName: "STPFailedReason",
          TagValue: val?.STPFailedReason,
        },
        {
          Status: "Create",
          TagName: "Decision",
          TagValue: val?.Decision,
        },
        {
          Status: "Create",
          TagName: "SendEmailtoCompliance",
          TagValue: val?.SendEmailtoCompliance,
        }
        // {
        //   "Status": "Create",
        //   "TagName": "BranchRemarks",
        //   "TagValue": values.BranchRemarks
        // },
      );
    }

    let response = apiCalls.POSActionsOnContactDetails(obj);
    response
      .then((val) => {
        if (val?.data) {
          setAlertTitle(`${val?.data?.message}`);

          setNavigateTo("/dashboard");
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
        setIsLoading(false);
        setRequirementLoader(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setRequirementLoader(false);
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
    setIsLoading(true);
    let obj = {
      accountNumber: BankAccNo,
      accountHolderName: "",
      ifsc: values.BankIFSC,
      consent: "Y",
      nameMatchType: "Individual",
      useCombinedSolution: "N",
      allowPartialMatch: "true",
      preset: "G",
      suppressReorderPenalty: "true",
      clientData: {
        caseId: "null",
      },
    };
    var pennyPayload = {
      requestHeader: { source: "POS" },
      requestBody: obj,
    };
    let response = apiCalls.bankaccverification(pennyPayload);
    response
      .then((result) => {
        setIsLoading(false);
        if (result?.data) {
          if (result?.data?.responseBody?.statusCode === 101) {
            setPennyDropResponse(result?.data?.responseBody);
            form.setFieldsValue({
              InitiatePennyDrop: result?.data?.responseBody?.result?.data
                ?.source[0]?.data?.accountName
                ? "Success"
                : "Failed",
              InitiatePennyDropPOS: result?.data?.responseBody?.result?.data
                ?.source[0]?.data?.accountName
                ? "Success"
                : "Failed",
              NameasperPennyDrop:
                result?.data?.responseBody?.result?.data?.source[0]?.data
                  ?.accountName,
              POSActionNameasperPennyDrop:
                result?.data?.responseBody?.result?.data?.source[0]?.data
                  ?.accountName,
            });
          } else {
            form.setFieldsValue({
              InitiatePennyDrop: result?.data?.responseBody?.result?.data
                ?.source[0]?.data?.accountName
                ? "Success"
                : "Failed",
              InitiatePennyDropPOS: result?.data?.responseBody?.result?.data
                ?.source[0]?.data?.accountName
                ? "Success"
                : "Failed",
            });
            // form.setFieldsValue({
            //   InitiatePennyDrop: result?.data?.statusMessage,
            //   InitiatePennyDropPOS: result?.data?.statusMessage,
            // })
          }
          //SUCCESSFUL TRANSACTION
        } else {
          setIsLoading(false);
          form.setFieldsValue({
            InitiatePennyDrop: "Invalid Input",
            InitiatePennyDropPOS: "Invalid Input",
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
        form.setFieldsValue({
          InitiatePennyDrop: "Invalid Input",
          InitiatePennyDropPOS: "Invalid Input",
        });

        setIsLoading(false);
      });
  };

  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };

  const LoanEnquiry = async () => {
    try {
      setShowAlert(false);
      setIsLoading(true);

      let obj = {
        RequestHeader: {
          source: "POS",
          carrierCode: "2",
          branch: "pra",
          userId: "F1135010",
          userRole: "10",
          monthEndExtension: "N",
          MonthendDate: "30/09/2023",
        },
        RequestBody: {
          policyNo: policyDetails?.policyDetailsObj?.identifiers?.policyNo,
        },
      };

      let response = await apiCalls.LoanEnquiry(obj);

      if (response?.data) {
        const res = response?.data?.responseBody?.loanEnquiryDetails;
        finalPaymentForm?.setFieldsValue({
          LessLoan: res?.hpleamt,
        });
        calculateTotal();
      } else {
        message.error({
          content:
            response?.data?.responseBody?.errormessage ||
            "Something went wrong, please try again!",
          className: "custom-msg",
          duration: 2,
        });
      }
    } catch (err) {
      message.error({
        content: "An error occurred while processing your request.",
        className: "custom-msg",
        duration: 2,
      });
    } finally {
      setIsLoading(false);
    }
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
  const getInternal = (list) => {
    const values = form.getFieldsValue();
    POSActionsOnContactDetails(values, "INTERNAL", list);
  };
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
    if (props?.EmailResponse?.IsEmailmanagent) {
      FreelookData[selectedSubType]?.FundTransfer_YesFields?.forEach(
        (element) => {
          if (element?.label === "Request Mode") {
            form.setFieldsValue({
              // requestchannel: "Email"
              requestchannel: 4,
            });
            element.disabled = true;
          }
          if (
            element?.name === "FreelookRequestForm" ||
            element?.name === "CustomerSigningDate" ||
            element?.name === "BranchReceivedDate" ||
            element?.name === "ValidateSignature"
          ) {
            element.hide = true;
          }
        }
      );
      FreelookData[selectedSubType]?.FundTransfer_NoFields?.forEach(
        (element) => {
          if (element?.label === "Request Mode") {
            form.setFieldsValue({
              // requestchannel: "Email"
              requestchannel: 4,
            });
            element.disabled = true;
          }
          if (
            element?.name === "FreelookRequestForm" ||
            element?.name === "CustomerSigningDate" ||
            element?.name === "BranchReceivedDate" ||
            element?.name === "ValidateSignature"
          ) {
            element.hide = true;
          }
        }
      );
      if (!FreelookData[selectedSubType]) {
        FreelookData[selectedSubType] = {}; // Initialize if undefined
      }

      if (!Array.isArray(FreelookData[selectedSubType]?.StatusEnquiryFields)) {
        FreelookData[selectedSubType].StatusEnquiryFields = [];
      }

      // Remove existing instances of "Additional Note For Customer" before adding a new one
      FreelookData[selectedSubType].StatusEnquiryFields = FreelookData[
        selectedSubType
      ].StatusEnquiryFields.filter(
        (comment) => comment.name !== "AdditionalNoteForCustomer"
      );

      // Add "Additional Note For Customer" once
      FreelookData[selectedSubType].StatusEnquiryFields.push({
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
      if (!Array.isArray(FreelookData[selectedSubType]?.CustomerRetained)) {
        FreelookData[selectedSubType].CustomerRetained = [];
      }

      // Remove existing instances of "Additional Note For Customer" before adding a new one
      FreelookData[selectedSubType].CustomerRetained = FreelookData[
        selectedSubType
      ].CustomerRetained.filter(
        (comment) => comment.name !== "AdditionalNoteForCustomer"
      );

      // Add "Additional Note For Customer" once
      FreelookData[selectedSubType].CustomerRetained.push({
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
      // Ensure FundTransfer_YesFields array exists
      if (
        !Array.isArray(FreelookData[selectedSubType]?.FundTransfer_YesFields)
      ) {
        FreelookData[selectedSubType].FundTransfer_YesFields = [];
      }

      // Remove existing instances of "Additional Note For Customer" before adding a new one
      FreelookData[selectedSubType].FundTransfer_YesFields = FreelookData[
        selectedSubType
      ].FundTransfer_YesFields.filter(
        (comment) => comment.name !== "AdditionalNoteForCustomer"
      );

      // Add "Additional Note For Customer" once
      FreelookData[selectedSubType].FundTransfer_YesFields.push({
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

      // Ensure FundTransfer_NoFields array exists
      if (
        !Array.isArray(FreelookData[selectedSubType]?.FundTransfer_NoFields)
      ) {
        FreelookData[selectedSubType].FundTransfer_NoFields = [];
      }

      // Remove existing instances of "Additional Note For Customer" before adding a new one
      FreelookData[selectedSubType].FundTransfer_NoFields = FreelookData[
        selectedSubType
      ].FundTransfer_NoFields.filter(
        (comment) => comment.name !== "AdditionalNoteForCustomer"
      );

      // Add "Additional Note For Customer" once
      FreelookData[selectedSubType].FundTransfer_NoFields.push({
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
    if (customerData?.isInternalFlow) {
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        boeScreenObj[element.tagName] = element.tagValue;
      });
      form.setFieldsValue({
        authorizercomments: boeScreenObj?.POSComments1,
      });
      setInternalReqData();
    }
  }, []);

  const getFundValue = () => {
    let empID = loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID;
    setIsFreelookAmtLoader(true);
    let obj = {
      requestHeader: {
        source: "POS",
        carrierCode: "2",
        branch: "PRA",
        userId: empID,
        userRole: "10",
        partnerId: "MSPOS",
        processId: "POS",
        monthendExtension: "N",
        monthendDate: "18/10/2023",
      },
      requestBody: {
        policyno: policyDetails?.policyDetailsObj?.identifiers?.policyNo,
      },
    };

    let response = apiCalls.GetFundValue(obj);
    response
      .then((val) => {
        if (val?.data?.responseBody?.errorcode == "0") {
          if (val?.data?.responseBody?.fundValue?.length > 0) {
            // Calculate the total of curuntval
            const totalFundAmt = val?.data.responseBody.fundValue.reduce(
              (acc, value) => {
                return acc + parseFloat(value.curuntval);
              },
              0
            );
            setFundValueData(totalFundAmt);
            finalPaymentForm?.setFieldsValue({
              totalSurrenderAmount: totalFundAmt,
            });
            calculateTotal();
            setIsFreelookAmtLoader(false);
          }
        } else {
          setIsFreelookAmtLoader(false);
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
        setIsFreelookAmtLoader(false);
      });
  };

  const handleLinkValue = (item) => {
    setAddressProofModal(true);
  };
  const getMultpleUploadFiles = (listOfUploadFiles, label) => {
    // const updatedUploadList = listOfUploadFiles?.map((obj) => {
    //   // Create a new object without the propertyToDelete property
    //   const { labelName, ...newObject } = obj;
    //   return newObject;
    // });
    // Update the state with the new list
    setUploadMultipleFiles(listOfUploadFiles);
    if (listOfUploadFiles.length > 0) {
      form.setFieldsValue({
        addressProof: `Documents Uploaded -  ${listOfUploadFiles.length}`,
        idProof: `Documents Uploaded -  ${listOfUploadFiles.length}`,
      });
    }
  };

  const handleRemove = (file) => {
    if (file?.labelName === "Copy of Aadhar Card") {
      setAAdharUploadFiles([]);
    } else if (file?.labelName === "Copy of Passport") {
      setPassportUploadFiles([]);
    } else if (file?.labelName === "Copy of Ration Card") {
      setRationCardUploadFiles([]);
    } else if (file?.labelName === "Copy of Driving License") {
      setDrivingUploadFiles([]);
    } else if (file?.labelName === "Copy of Voter ID") {
      setVoterUploadFiles([]);
    } else if (file?.labelName === "Copy of PAN Card") {
      setPancardUploadFiles([]);
    }
    let updatedFiles = isUploadMultipleFiles?.filter((ele) => {
      return ele?.labelName !== file.labelName;
    });
    setIsMultipleFiles(updatedFiles);
    form.setFieldsValue({
      addressProof: `Documents Uploaded -  ${updatedFiles.length}`,
      idProof: `Documents Uploaded -  ${updatedFiles.length}`,
    });
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    fileList: [],
    customRequest: ({ file, onSuccess, index, item }, label) => {
      let formData = new FormData();
      const ApplicationNo =
        policyDetails?.policyDetailsObj?.identifiers?.applicationNo;
      formData.append("File", file, ApplicationNo + "/" + file.name);
      let response = apiCalls.fileUpload(formData);
      response.then((val) => {
        if (val?.data) {
          let newDocumentObj = {
            IndexName: "Bank Details Updation",
            DocumentName: file?.name,
            UserID: loginInfo?.userProfileInfo?.profileObj?.userName,
            UploadedBy: loginInfo?.userProfileInfo?.profileObj?.name,
            UploadedOn: new Date(),
            DocumentSize: file?.size,
            FileLocation: val?.data,
            BlobFileName: file?.name,
            FileExtnMime: file?.type,
            labelName: label,
            name: file.name,
          };
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
              setIsMultipleFiles((prevFiles) => [...prevFiles, newDocumentObj]);

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
          //getMultpleUploadFiles(documnetsObj);
          setShowUploadFile(index);
          // setUploadFiles(prevFiles => [...prevFiles, ...Array.isArray(newDocumentObj) ? newDocumentObj : [newDocumentObj]]);
          setDocIdProofs([{ ...newDocumentObj }]);
          if (label?.includes("Copy of Aadhar Card")) {
            setAAdharUploadFiles([{ ...newDocumentObj }]);
          } else if (label?.includes("Copy of Passport")) {
            setPassportUploadFiles([{ ...newDocumentObj }]);
          } else if (label?.includes("Copy of Ration Card")) {
            setRationCardUploadFiles([{ ...newDocumentObj }]);
          } else if (label?.includes("Copy of Driving License")) {
            setDrivingUploadFiles([{ ...newDocumentObj }]);
          } else if (label?.includes("Copy of Voter ID")) {
            setVoterUploadFiles([{ ...newDocumentObj }]);
          } else if (label?.includes("Copy of PAN Card")) {
            setPancardUploadFiles([{ ...newDocumentObj }]);
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
  const handleOk = (idProofBtn) => {
    if (idProofBtn === "idProof") {
      if (
        aadharUploadFiles?.length === 0 &&
        passportUploadFiles?.length === 0 &&
        rationCardUploadFiles?.length === 0 &&
        DrivingUploadFiles?.length === 0 &&
        voterUploadFiles?.length === 0 &&
        pancardUploadFiles?.length === 0
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
      }
    } else {
      if (
        aadharUploadFiles?.length === 0 &&
        passportUploadFiles?.length === 0 &&
        rationCardUploadFiles?.length === 0 &&
        DrivingUploadFiles?.length === 0 &&
        voterUploadFiles?.length === 0
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
      }
    }
  };

  const convertDates = (date) => {
    const parsedDate = moment(
      date,
      ["YYYYMMDD", "DD/MM/YYYY", "DD-MM-YYYY"],
      true
    );

    if (!parsedDate.isValid()) {
      return null;
    }

    return parsedDate.add(30, "days").format("DD/MM/YYYY");
  };

  const getGCPPolicydetails = () => {
    setIsLoading(true);
    let response = apiCalls.getFreeLookDetailsApi(
      import.meta.env.VITE_APP_POLICY_NO || customerData?.policyNo
    );
    response
      .then((val) => {
        if (val?.data?.statusCode === "200") {
          let maxDate = new Date(0);
          let maxRecord = null;
          // Iterate over the JSON data to find the record with the maximum date
          val?.data?.response?.dispatch_details?.forEach((item) => {
            // Extract day, month, and year from the date string
            if (item?.dispatchdate) {
              const dateParts = item?.dispatchdate?.split("-"); // Change '/' to '-' assuming your date format is "YYYY-MM-DD"
              const year = parseInt(dateParts[0], 10);
              const month = parseInt(dateParts[1], 10) - 1; // Subtract 1 because months are zero-indexed
              const day = parseInt(dateParts[2], 10);
              const currentDate = new Date(year, month, day);

              if (currentDate > maxDate) {
                maxDate = currentDate;
                maxRecord = item;
              }
            }
          });
          let dispatchDetails = maxRecord;
          handleValidate(
            val?.data?.response?.delivery_details[0]?.dispatchDeliveryDate
          );

          const response = val?.data?.response?.policyAttribute[0];
          if (selectedSubType === "statusenquiry") {
            setEnquiryListData(val?.data?.response?.delivery_details);
            setRtoDetails(val?.data?.response?.rto_details);

            setViewDispatchDetails(val?.data?.response?.dispatch_details);
            form.setFieldsValue({
              WelcomeCallComments:
                val?.data?.response?.applicationAttribute[0]
                  ?.welcomeCallDisposition,
              FreelookPeriodEndedOn: convertDates(
                val?.data?.response?.delivery_details[0]?.dispatchDeliveryDate
              ),
            });
          } else {
            setGCPDetailsData({
              // dispatchDetailsData: val?.data?.response?.dispatch_details || [],
              // deliveryDetailsData: val?.data?.response?.delivery_details || [],
              // rtoDetailsData: val?.data?.response?.rto_details || [],
              policyAttribute: val?.data?.response?.policyAttribute || [],
            });
          }
          setIsLoading(false);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          message.error({
            content:
              val?.data?.statusMessage ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
      })
      .catch((err) => {});
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

  // const calculateTotal = (changedValues, allValues) => {
  //   const { totalSurrenderAmount = 0, LessLoan = 0, LessTDS = 0, PenalInterest = 0, InterestCharges = 0 } = allValues;
  //   const numericValues = [totalSurrenderAmount, LessLoan, LessTDS, PenalInterest, InterestCharges].map(value => parseFloat(value) || 0);
  //   const total = numericValues.reduce((acc, value) => acc + value, 0);
  //   finalPaymentForm.setFieldsValue({ FinalPayableAmount: total });
  // };
  const calculateTotal = (changedValues, allValues) => {
    const fieldValues = finalPaymentForm?.getFieldValue();
    const {
      totalSurrenderAmount = 0,
      LessLoan = 0,
      LessTDS = 0,
      PenalInterest = 0,
      InterestCharges = 0,
    } = allValues || fieldValues;
    const parseNumber = (value) =>
      parseFloat(value?.toString()?.replace(/,/g, "")) || 0;
    const numericValues = [
      parseNumber(totalSurrenderAmount),
      -parseNumber(LessLoan),
      -parseNumber(LessTDS),
      parseNumber(PenalInterest),
      parseNumber(InterestCharges),
    ];

    const total = numericValues.reduce((acc, value) => acc + value, 0);
    finalPaymentForm.setFieldsValue({ FinalPayableAmount: total });
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
      <Spin spinning={isLoading}>
        <Form
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
          onFinish={customerData?.isInternalFlow ? "" : handleSubmit}
          autoComplete="off"
        >
          {customerData?.isInternalFlow &&
          selectedSubType === "registerfreelookrequest" ? (
            <>
              <InternalFlow
                data={internalData}
                suffix={!isShowPOSScreen && suffix}
                policyDetails={
                  props?.details?.policyDetailsObj?.identifiers?.applicationNo
                }
                form={form}
                customerData={customerData}
                POSContactData={POSContactData}
                boeScreenObj={boeScreenObj}
                Docs={InternaRequirements}
              />
            </>
          ) : (
            <>
              <DetailsForm
                data={
                  isShowPOSScreen
                    ? FreelookData[selectedSubType]?.POS_Details
                    : isShowPOSManagerScreen
                    ? FreelookData[selectedSubType]?.POS_Manager_Details
                    : FreelookData[selectedSubType]?.BOE_Details
                }
                subType={selectedSubType}
                handleDropdownChange={handleDropdownChange}
                handleRadioChange={handleRadioChange}
                handleTextLink={handleTextLink}
                registerModeLU={registerModeLU}
                requestModeLU={requestModeLU}
              ></DetailsForm>

              {selectedSubType === "statusenquiry" && (
                <>
                  {/* {isPolicyFreelookSelection==="yes"&&<> */}
                  <Row gutter={[16, 16]} className="reasons-list">
                    <Col
                      xs={24}
                      sm={24}
                      md={8}
                      lg={8}
                      xxl={8}
                      className="loan-checkboxes"
                    >
                      <Form.Item
                        label="Enquiry"
                        name="enquiry"
                        className="checkbox-gap"
                      >
                        <Checkbox
                          value="Enquiry"
                          checked={checkedList.includes("Enquiry")}
                          onChange={() => handleChange("Enquiry")}
                        ></Checkbox>
                      </Form.Item>
                    </Col>
                    <Col
                      xs={24}
                      sm={24}
                      md={8}
                      lg={8}
                      xxl={8}
                      className="loan-checkboxes"
                    >
                      <Form.Item
                        label="Retention Attempted"
                        name="attemptRetention"
                      >
                        <Checkbox
                          value="Retention Attempted"
                          checked={checkedList.includes("Retention Attempted")}
                          onChange={() => handleChange("Retention Attempted")}
                        ></Checkbox>
                      </Form.Item>
                    </Col>
                    <Col
                      xs={24}
                      sm={24}
                      md={8}
                      lg={8}
                      xxl={8}
                      className="loan-checkboxes"
                    >
                      <Form.Item
                        label="Register Request"
                        name="registerRequest"
                      >
                        <Checkbox
                          value="Register Request"
                          checked={checkedList.includes("Register Request")}
                          onChange={() => handleChange("Register Request")}
                        ></Checkbox>
                      </Form.Item>
                    </Col>
                  </Row>
                  {checkedList?.includes("Enquiry") && (
                    <>
                      {/* <DetailsForm
                    data={FreelookData[selectedSubType]?.Enquiry_Fields}
                    subType={selectedSubType}
                handleDropdownChange={handleDropdownChange}
                handleRadioChange={handleRadioChange}
                form={form}
                suffix={!isShowPOSScreen&&suffix}
                handleTextLink={handleTextLink}
                handleDateChange={handleDateChange}
                toggleInputField={toggleInputField}
                showEmailAddress={showEmailAddress}
                showPhoneNumber={showPhoneNumber}
                showWhatsApp={showWhatsApp}
                getUploadFiles={getUploadFiles}
                  ></DetailsForm>
                 {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}

                {isPolicyDispatchSelection==="yes"&&<>
                <DetailsForm
                data={FreelookData[selectedSubType]?.Enquiry_YesFileds}
                subType={selectedSubType}
                handleDropdownChange={handleDropdownChange}
                handleRadioChange={handleRadioChange}
                form={form}
                suffix={!isShowPOSScreen&&suffix}
                handleTextLink={handleTextLink}
                handleDateChange={handleDateChange}
                toggleInputField={toggleInputField}
                showEmailAddress={showEmailAddress}
                showPhoneNumber={showPhoneNumber}
                showWhatsApp={showWhatsApp}
                getUploadFiles={getUploadFiles}
              ></DetailsForm>
                 {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
              </>} */}
                      <h4 className="subtype-headings fs-16 fw-500">
                        View Dispatch Details
                      </h4>
                      {"  "}
                      <div className="reuirement mb-16">
                        <table className="responsive-table">
                          <thead>
                            <tr>
                              <th>Delivery Date</th>
                              <th>Dispatch Mode</th>
                              <th>Courier Name</th>
                              <th>AWB Number</th>
                              <th>Dispatch Address</th>
                              <th>Location</th>
                              {/* <th>Pin Code</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {viewDispatchDetails?.map((item, ind) => (
                              <tr key={ind + 1}>
                                <td>
                                  {item.dispatchDeliveryDate
                                    ? convertDate(item.dispatchDeliveryDate)
                                    : ""}
                                </td>
                                <td>{item.dispatchMode}</td>
                                <td>{item.customerName}</td>
                                <td>{item.airwayBillNo}</td>
                                <td>{item.dispatchaddress}</td>
                                <td>{item.dispatchtolocation}</td>
                              </tr>
                            ))}
                            {viewDispatchDetails?.length === 0 && (
                              <tr>
                                <td colspan="6">
                                  <div className="text-center">
                                    <span>No data available</span>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                      <h4 className="subtype-headings fs-16 fw-500">
                        RTO Details
                      </h4>
                      {"  "}
                      <div className="reuirement mb-16">
                        <table className="responsive-table">
                          <thead>
                            <tr>
                              <th>Dispatch Date</th>
                              <th>Dispatch Mode</th>
                              <th>AWB Number</th>
                              <th>Pin Code</th>
                              <th>RTO Inward Date</th>
                              <th>RTO Reason</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rtoDetails?.map((item, ind) => (
                              <tr key={ind + 1}>
                                <td>
                                  {item.dispatchDeliveryDate
                                    ? convertDate(item.dispatchDeliveryDate)
                                    : ""}
                                </td>
                                <td>{item.dispatchMode}</td>
                                <td>{item.airwayBillNo}</td>
                                <td>{item.pincode}</td>
                                <td>{item.DIS_RTOInwardDate}</td>
                                <td>{item.DIS_RTO_Reason}</td>
                              </tr>
                            ))}
                            {rtoDetails?.length === 0 && (
                              <tr>
                                <td colspan="6">
                                  <div className="text-center">
                                    <span>No data available</span>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                      <h4 className="subtype-headings fs-16 fw-500">
                        View Delivery Details
                      </h4>
                      {"  "}
                      <div className="reuirement mb-16">
                        <table className="responsive-table">
                          <thead>
                            <tr>
                              <th>Delivery Date</th>
                              <th>Dispatch Mode</th>
                              <th>Courier Name</th>
                              <th>AWB Number</th>
                              <th>Received By</th>
                            </tr>
                          </thead>
                          <tbody>
                            {enquiryListData?.map((item, ind) => (
                              <tr key={ind + 1}>
                                <td>
                                  {item.dispatchDeliveryDate
                                    ? convertDate(item.dispatchDeliveryDate)
                                    : ""}
                                </td>
                                <td>{item.dispatchMode}</td>
                                <td>{item.customerName}</td>
                                <td>{item.airwayBillNo}</td>
                                <td>{item.DIS_ReceivedBy_Delivery}</td>
                              </tr>
                            ))}
                            {enquiryListData?.length === 0 && (
                              <tr>
                                <td colspan="6">
                                  <div className="text-center">
                                    <span>No data available</span>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                      <DetailsForm
                        data={
                          FreelookData[selectedSubType]?.StatusEnquiryFields
                        }
                        subType={selectedSubType}
                        form={form}
                      ></DetailsForm>
                    </>
                  )}
                  {checkedList?.includes("Retention Attempted") && (
                    <>
                      <Row>
                        <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                          <div className="surrender-links">
                            <span
                              className="surrender-icons"
                              style={{ textDecoration: "underline" }}
                            >
                              <Button className="surrender-btn">
                                <a
                                  rel="noopener"
                                  className="hyperlinkk"
                                  onClick={() => productUSP()}
                                >
                                  Product USP{" "}
                                </a>
                              </Button>
                              {/* {!isUlip&&
                  <Button className="surrender-btn" onClick={() => loanQuotation(true)}>
                    Loan Available
                  </Button>
                    }
                  {isUlip&&
                  <Button className="surrender-btn" onClick={() => partialWithdrawalEnquiry()}>
                    PW Available
                  </Button>
                  } */}
                            </span>
                          </div>
                        </Col>
                      </Row>

                      {isCustomerRetainedSelection !== "yes" && (
                        <>
                          <DetailsForm
                            data={FreelookData[selectedSubType]?.customerChoice}
                            subType={selectedSubType}
                            handleRadioChange={handleRadioChange}
                          ></DetailsForm>
                        </>
                      )}

                      {isCustomerRetainedSelection === "yes" && (
                        <>
                          <DetailsForm
                            data={
                              FreelookData[selectedSubType]?.CustomerRetained
                            }
                            subType={selectedSubType}
                            form={form}
                            suffix={suffix}
                            getUploadFiles={getUploadFiles}
                            handleRadioChange={handleRadioChange}
                          ></DetailsForm>
                        </>
                      )}
                    </>
                  )}
                  {/* </>} */}
                  {/* {isPolicyFreelookSelection==="no"&&<>
           <DetailsForm
            data={FreelookData[selectedSubType]?.Enquiry_Fields}
            subType={selectedSubType}
            handleDropdownChange={handleDropdownChange}
            handleRadioChange={handleRadioChange}
            form={form}
            suffix={!isShowPOSScreen&&suffix}
            handleTextLink={handleTextLink}
            handleDateChange={handleDateChange}
            getUploadFiles={getUploadFiles}
          ></DetailsForm>
          {isPolicyDispatchSelection==="yes"&&<>
            <DetailsForm
            data={FreelookData[selectedSubType]?.Policy_Redispatch_YesFileds}
            subType={selectedSubType}
            handleDropdownChange={handleDropdownChange}
            handleRadioChange={handleRadioChange}
            form={form}
            suffix={!isShowPOSScreen&&suffix}
            handleTextLink={handleTextLink}
            handleDateChange={handleDateChange}
            getUploadFiles={getUploadFiles}
          ></DetailsForm>
          </>}
           </>} */}

                  <div className="contact-details-btn">
                    {/* {(!showRaiseRequirementBtn||isShowPOSScreen)&&(
              <> */}
                    <Button
                      type="primary"
                      className="primary-btn"
                      htmlType="submit"
                    >
                      {isShowPOSScreen ? "Approve" : "Submit"}
                    </Button>{" "}
                    {/* </>
            )} */}
                    {(isShowPOSScreen || !isShowPOSScreen) &&
                      selectedSubType !== "statusenquiry" && (
                        <Button
                          type="primary"
                          className="primary-btn"
                          onClick={() => getRaiseRequirements()}
                        >
                          Raise Requirement
                        </Button>
                      )}
                  </div>
                </>
              )}

              {selectedSubType === "registerfreelookrequest" && (
                <>
                  {isFundTransferSelection === "yes" && !isShowPOSScreen && (
                    <>
                      <DetailsForm
                        data={
                          FreelookData[selectedSubType]?.FundTransfer_YesFields
                        }
                        subType={selectedSubType}
                        handleDropdownChange={handleDropdownChange}
                        handleRadioChange={handleRadioChange}
                        form={form}
                        suffix={!isShowPOSScreen && suffix}
                        handleTextLink={handleTextLink}
                        handleDateChange={handleDateChange}
                        handleLabelLink={handleLabelLink}
                        onBlurInput={onBlurInput}
                        getUploadFiles={getUploadFiles}
                        disabledDate={disabledDate}
                        handleLinkValue={handleLinkValue}
                        requestModeLU={requestModeLU}
                        registerModeLU={registerModeLU}
                        bankAccTypeLU={bankAccTypeLU}
                      ></DetailsForm>
                    </>
                  )}
                  {isFundTransferSelection === "no" && !isShowPOSScreen && (
                    <>
                      <DetailsForm
                        data={
                          FreelookData[selectedSubType]?.FundTransfer_NoFields
                        }
                        subType={selectedSubType}
                        handleDropdownChange={handleDropdownChange}
                        handleRadioChange={handleRadioChange}
                        form={form}
                        suffix={!isShowPOSScreen && suffix}
                        handleTextLink={handleTextLink}
                        handleDateChange={handleDateChange}
                        handleLabelLink={handleLabelLink}
                        onBlurInput={onBlurInput}
                        getUploadFiles={getUploadFiles}
                        disabledDate={disabledDate}
                        handleLinkValue={handleLinkValue}
                        requestModeLU={requestModeLU}
                        registerModeLU={registerModeLU}
                        bankAccTypeLU={bankAccTypeLU}
                      ></DetailsForm>
                    </>
                  )}
                  {/* {showResonDelayField&&<>
              <DetailsForm
                data={FreelookData[selectedSubType]?.ReasonSubmission}
                onBlurInput = {onBlurInput}
              ></DetailsForm>
              </>} */}

                  {((isShowPOSScreen && isRequestForSelection) ||
                    isShowPOSManagerScreen) && (
                    <>
                      {!isShowPOSManagerScreen && (
                        <DetailsForm
                          data={
                            FreelookData[selectedSubType]
                              ?.POS_FundTransfer_Fields
                          }
                          subType={selectedSubType}
                          handleDropdownChange={handleDropdownChange}
                          handleRadioChange={handleRadioChange}
                          form={form}
                          suffix={!isShowPOSScreen && suffix}
                          handleTextLink={handleTextLink}
                          handleDateChange={handleDateChange}
                          handleLabelLink={handleLabelLink}
                          onBlurInput={onBlurInput}
                          getUploadFiles={getUploadFiles}
                          requestModeLU={requestModeLU}
                          registerModeLU={registerModeLU}
                        ></DetailsForm>
                      )}

                      {!isShowPOSManagerScreen && (
                        <DetailsForm
                          data={
                            FreelookData[selectedSubType]?.POS_View_Documents
                          }
                          subType={selectedSubType}
                          handleDropdownChange={handleDropdownChange}
                          handleRadioChange={handleRadioChange}
                          form={form}
                          handleEdit={handleEdit}
                          suffix={!isShowPOSScreen && suffix}
                          handleTextLink={handleTextLink}
                          handleDateChange={handleDateChange}
                          handleLabelLink={handleLabelLink}
                          onBlurInput={onBlurInput}
                          getUploadFiles={getUploadFiles}
                          requestModeLU={requestModeLU}
                          bankAccTypeLU={bankAccTypeLU}
                        ></DetailsForm>
                      )}

                      {(isRequestForSelection === "freelook" ||
                        isShowPOSManagerScreen) && (
                        <DetailsForm
                          data={
                            isShowPOSManagerScreen
                              ? FreelookData[selectedSubType]
                                  ?.POS_Manager_View_Bank_Details
                              : FreelookData[selectedSubType]
                                  ?.POS_View_Documents
                          }
                          subType={selectedSubType}
                          handleEdit={handleEdit}
                          onBlurInput={onBlurInput}
                          handleRadioChange={handleRadioChange}
                          bankAccTypeLU={bankAccTypeLU}
                        ></DetailsForm>
                      )}
                      <DetailsForm
                        data={
                          isShowPOSManagerScreen
                            ? FreelookData[selectedSubType]?.POS_Manager_Action
                            : FreelookData[selectedSubType]?.POS_Action_Fields
                        }
                        subType={selectedSubType}
                        handleRadioChange={handleRadioChange}
                        handleTextLink={handleTextLink}
                        handleLabelLink={handleLabelLink}
                        requestModeLU={requestModeLU}
                        handleDropdownChange={handleDropdownChange}
                        onBlurInput={onBlurInput}
                      ></DetailsForm>
                    </>
                  )}

                  <div className="contact-details-btn">
                    {/* {(!showRaiseRequirementBtn||isShowPOSScreen||isShowPOSManagerScreen)&&(
              <> */}
                    <Button
                      onClick={() => setClickedButton("POSApprove")}
                      type="primary"
                      className="primary-btn"
                      htmlType="submit"
                      disabled={disableSubmutBtn && !isShowPOSScreen}
                    >
                      {isShowPOSScreen || isShowPOSManagerScreen
                        ? "Approve"
                        : "Submit"}
                    </Button>{" "}
                    {/* </>
            )} */}
                    {(isShowPOSScreen ||
                      isShowPOSManagerScreen ||
                      !isShowPOSScreen) && (
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="primary-btn"
                        onClick={() => getRaiseRequirements()}
                      >
                        Raise Requirement
                      </Button>
                    )}
                    {isShowPOSScreen && (
                      <>
                        <InternalFlowPOS
                          interlRequirementTagValue1={
                            props.interlRequirementTagValue
                          }
                          selectedList={
                            POSContactData.serviceRequestTransectionData
                          }
                          getInternal={getInternal}
                          internalReqForm={internalReqForm}
                        />
                      </>
                    )}
                  </div>
                </>
              )}

              {selectedSubType === "freelookcancellationdecline" && (
                <>
                  <DetailsForm
                    data={FreelookData[selectedSubType]?.Details}
                    subType={selectedSubType}
                    form={form}
                    handleDropdownChange={handleDropdownChange}
                    handleRadioChange={handleRadioChange}
                    handleTextLink={handleTextLink}
                    handleDateChange={handleDateChange}
                    getUploadFiles={getUploadFiles}
                    requestModeLU={requestModeLU}
                  />
                  <div className="contact-details-btn">
                    <Button
                      type="primary"
                      className="primary-btn"
                      htmlType="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
        </Form>
      </Spin>

      <Modal
        title="Freelook Details"
        open={payoutDetailsOpen}
        destroyOnClose={true}
        width={1000}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setPayoutDetailsOpen(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <Spin spinning={isFreelookAmtLoader}>
          <div className="table-container">
            <table className="responsive-table">
              {policyDetails?.policyDetailsObj?.planAndStatus?.productType ===
                "UL" && (
                <>
                  <tr>
                    <td width={50}>Fund Value</td>
                    <td width={70}>
                      {" "}
                      {(FundValueData && (
                        <NumericFormat
                          value={FundValueData}
                          decimalSeparator="."
                          displayType={"text"}
                          thousandSeparator={true}
                          decimalScale={2}
                        />
                      )) ||
                        "-"}
                    </td>
                  </tr>
                </>
              )}
              {policyDetails?.policyDetailsObj?.planAndStatus?.productType !==
                "UL" && (
                <>
                  <tr>
                    <td width={50}>Premium Amount</td>
                    <td width={70}>
                      {" "}
                      {(policyDetails?.policyDetailsObj?.premiumDetails
                        ?.modelPremiumAmount && (
                        <NumericFormat
                          value={
                            policyDetails?.policyDetailsObj?.premiumDetails
                              ?.modelPremiumAmount
                          }
                          decimalSeparator="."
                          displayType={"text"}
                          thousandSeparator={true}
                          decimalScale={0}
                        />
                      )) ||
                        "-"}
                    </td>
                  </tr>
                </>
              )}
              <tr>
                <td>Less: Stamp Duty</td>
                <td>{GCPDetailsData?.policyAttribute?.[0]?.STAMPDUTY}</td>
              </tr>
              <tr>
                <td>Less: Medical Charges</td>
                <td>{}</td>
              </tr>
              <tr>
                <td>Add Interest, If Any</td>
                <td>{}</td>
              </tr>
              <tr>
                <td>Penal Interest, If Any</td>
                <td>{}</td>
              </tr>
              <tr>
                <td>Final Payable Amount</td>
                {policyDetails?.policyDetailsObj?.planAndStatus?.productType ===
                  "UL" && (
                  <>
                    <td width={70}>
                      {" "}
                      {(FundValueData && (
                        <NumericFormat
                          value={FundValueData}
                          decimalSeparator="."
                          displayType={"text"}
                          thousandSeparator={true}
                          decimalScale={2}
                        />
                      )) ||
                        "-"}
                    </td>
                  </>
                )}
                {policyDetails?.policyDetailsObj?.planAndStatus?.productType !==
                  "UL" && (
                  <>
                    <td>
                      {" "}
                      {(policyDetails?.policyDetailsObj?.premiumDetails
                        ?.modelPremiumAmount && (
                        <NumericFormat
                          value={
                            GCPDetailsData?.policyAttribute?.[0]?.STAMPDUTY
                              ? policyDetails?.policyDetailsObj?.premiumDetails
                                  ?.modelPremiumAmount -
                                GCPDetailsData?.policyAttribute?.[0]?.STAMPDUTY
                              : policyDetails?.policyDetailsObj?.premiumDetails
                                  ?.modelPremiumAmount
                          }
                          decimalSeparator="."
                          displayType={"text"}
                          thousandSeparator={true}
                          decimalScale={0}
                        />
                      )) ||
                        "-"}
                    </td>
                  </>
                )}
              </tr>
            </table>
          </div>
        </Spin>
      </Modal>

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
        {/* <div className="table-container">
          <table className="responsive-table">
            <tr>
              <td width={50}>Gross Surrender Value</td>
              <td width={70}>{totalSurrenderAmount}</td>
            </tr>
            <tr>
              <td>Less Loan (-)</td>
              <td>
                          {
             
              
            }


                
                </td>
            </tr>
            <tr>
              <td>Less TDS (-)</td>
              <td>0</td>
            </tr>
            <tr>
              <td>Penal Interest (+)</td>
              <td>0</td>
            </tr>
            <tr>
              <td>Final Payable Amount</td>
              <td>{sum(surrenderEnquiry?.totalsurrendervalue ,LoanQuotationData?.numloans ? LoanQuotationData?.numloans  :0) }</td>
            </tr>
          </table>
        </div> */}
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
                label="Premium Amount"
                className="inputs-label mb-0"
                rules={[
                  {
                    required: false,
                    message: "Premium Amount",
                  },
                ]}
              >
                <Input
                  placeholder="Premium Amount"
                  className="cust-input modal-input"
                  maxLength={100}
                  disabled
                  onKeyDown={handleKeyDown}
                  onChange={handleInputChange1}
                />
              </Form.Item>
            </Col>
            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                label="Less: Stamp Duty"
                name="LessLoan"
                className="inputs-label mb-0"
              >
                <Input
                  placeholder="Less: Stamp Duty"
                  className="cust-input modal-input"
                  maxLength={100}
                  disabled
                  onKeyDown={handleKeyDown}
                  onChange={handleInputChange1}
                />
              </Form.Item>
            </Col>
            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                label="Less: Medical Charges"
                name="LessTDS"
                className="inputs-label mb-0 subtype right-colsize"
              >
                <Input
                  placeholder="Less: Medical Charges"
                  className="cust-input modal-input"
                  maxLength={100}
                  onKeyDown={handleKeyDown}
                  onChange={handleInputChange1}
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
                  onKeyDown={handleKeyDown}
                  onChange={handleInputChange1}
                />
              </Form.Item>
            </Col>
            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                label="Add: Interest Charges"
                name="InterestCharges"
                className="inputs-label mb-0 subtype right-colsize"
              >
                <Input
                  placeholder="Interest Charges"
                  className="cust-input modal-input"
                  maxLength={100}
                  onKeyDown={handleKeyDown}
                  onChange={handleInputChange1}
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

      {/* <Modal
        title="Requirements"
        open={raiseRequirementOpen}
        destroyOnClose={true}
        width={1200}
        closeIcon={false}
        footer={null}
      >
        <Spin spinning={requirementModalLoader}>
          <div  >
            <Form onFinish={handleRequirementSubmit}>
              <div className="reuirement">

              
              <table className="responsive-table">
                <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Description</th>
                  <th className="z-index">Select</th>
                </tr></thead>
                <tbody>
                  {raiseRequerimentList && raiseRequerimentList?.map((item, ind) => (
                    <tr key={ind + 1}>
                      <td>{ind + 1}</td>

                      <td>{item.raiseReqDesc}</td>
                      <td>
                        {" "}
                        <Checkbox
                          type="checkbox"
                          onChange={(e) => (item.status = e.target.checked)}
                        />
                      </td>
                    </tr>
                  ))}
                  {raiseRequerimentList?.length === 0 && (
                    <tr>
                      <td colspan="13">
                        <div className="text-center">
                          <span>No data available</span>
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
                   htmlType="submit"
                >
                  Submit
                </Button>

                <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => setRaiseRequirementOpen(false)}
                >
                  Close
                </Button>
              </div>
            </Form>
          </div>

          
        </Spin>
      </Modal> */}

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
        title="List of Acceptable ID Proofs"
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
                  fileList={passportUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,.pdf"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Passport"
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
                  fileList={rationCardUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.pdf,.PDF"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Ration Card"
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
                  fileList={DrivingUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,pdf"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Driving License"
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
                  fileList={voterUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,pdf"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Voter ID"
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
                  fileList={pancardUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,pdf"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of PAN Card"
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
          getAdvance={props.getAdvance}
          title={alertTitle}
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

export default connect(mapStateToProps)(FreeLook);
