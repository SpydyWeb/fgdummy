import React, { useState, useEffect } from "react";
import { Data } from "../../mainconfig";
import PopupAlert from "../popupAlert";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import DetailsForm from "../../utils/DetailsForm";
import CloseIcon from "../../assets/images/close-icon.png";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Button, Form, Spin, Modal, Tooltip, message, Upload } from "antd";
import moment from "moment";
import apiCalls from "../../api/apiCalls";
import UploadIcon from "../../assets/images/upload.png";
import ContactForm from "../../utils/ContactForm";
import InternalFlow from "../InternalFlow/InternalFlow";
import InternalFlowPOS from "../InternalFlow/InternalFlowPOS";
import RaiseRequirementPopup from "../RaiseRequirementPopup";

const LoanPolicy = (props) => {
  dayjs.extend(customParseFormat);
  const loginInfo = useSelector((state) => state);
  const [form] = Form.useForm();
  const [requirementsForm] = Form.useForm();
  const [internalReqForm] = Form.useForm();
  const {
    selectedSubType,
    customerData,
    policyDetails,
    POSContactData,
    requestModeLU,
    bankAccTypeLU,
  } = props;
  const [isShowPOSScreen, setIsShowPOSScreen] = useState(false); //pos screen showing purpose
  const [data, setData] = useState({});
  const [existingLoanCheck, setExistingLoanCheck] = useState(false);
  const [eligibleLoanCheck, setEligibleLoanCheck] = useState(false);
  const [shareProcessCheck, setShareProcessCheck] = useState(false);
  const [showEmailFields, setShowEmailFields] = useState(false);
  const [collapsePOSDocuments, setCollapsePOSDocuments] = useState(true);
  const [collapsePOSBankDetails, setCollapsePOSBankDetails] = useState(false);
  const [showReasonDelayField, setShowReasonDelayField] = useState(false);
  const [collapsePOSAction, setCollapsePOSAction] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showRaiseRequirementBtn, setShowRaiseRequirementBtn] = useState(false);
  const suffix = <img src={UploadIcon} alt="" />;
  const [isLoading, setIsLoading] = useState(false);
  const [loanEnquiryData, setLoanEnquiryData] = useState({});
  const [loanStatementData, setLoanStatementData] = useState({});
  const [AssigneeEnquiryData, setAssigneeEnquiryData] = useState({});
  const [ttpayamt, setTtpayamt] = useState();
  const [mostRecentDt, setMostRecentDt] = useState();
  const [checkedValue, setCheckedValue] = useState();
  const [surrenderEnquiry, setSurrenderEnquiryD] = useState({});
  const [totalSurrenderAmount, setTotalSurrenderAmount] = useState(null);
  const [alertTitle, setAlertTitle] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [alertData, setAlertData] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [takenLoans, settakenLoans] = useState();
  const [UpdateState, setUpdateState] = useState(false);
  const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [PennyDropResponse, setPennyDropResponse] = useState({});
  const [isPOSManageScreen, setIsPOSManageScreen] = useState(false);
  const [clickedButton, setClickedButton] = useState("");
  const [activeEmailIcons, setActiveEmailIcons] = useState([]);
  const [activeMobileIcons, setActiveMobileIcons] = useState([]);
  const [activeWhatsAppIcons, setActiveWhatsAppIcons] = useState([]);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmailAddress, setShowEmailAddress] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [activecommuType, setActivecommuType] = useState();
  const [clientEnquiryData, setClientEnquiryData] = useState({});
  const [CNFBankAccNo, setCNFBankAccNo] = useState("");
  const [BankAccNo, setBankAccNo] = useState("");

  const [showBankDeDupeModal, setShowBankDeDupeModal] = useState(false);
  const [SignListModal, setSignListModal] = useState(false);
  const [negativeListModal, setNegativeModal] = useState(false);
  const [MaxLoanElg, setMaxLoanElg] = useState("");
  const [BankduDupeData, setBankDeDupeData] = useState([]);
  const [negativeList, setNegativeList] = useState([]);
  const [signatureDeDupeData, setSignatureDeDupeData] = useState([]);
  const [InternaRequirements, setInternalFlowRequirements] = useState("");
  const [isProcessLinks, setIsProcessLinks] = useState([]);
  const [isDocLinks, setIsDocLinks] = useState([]);
  const [isLoanChecking, setIsLoanChecking] = useState(false);
  const [vaildateSignature, setVaildateSignature] = useState(false);
  const [ReRenderComponent, setReRenderComponent] = useState(false);
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
  const [radioValuesToEnable, setRadioValuesToEnable] = useState({});
  const [uploadFiles, setUploadFiles] = useState([]);
  const [bankAccProofs, setBankAccProofs] = useState([]);
  const [isLoansAvailable, setIsLoansAvailable] = useState(null);

  const loggedUser = useSelector((state) => state?.userProfileInfo?.profileObj);

  const posScreenLoanRepayObj = {
    ReceiptedBy: "",
    RepaymentAmount: "",
    DateOfRepayment: "",
    ModeOfRepayment: "",
    UTROrChequeNumber: "",
    ReceiptNumber: "",
    RepaymentType: "",
    outstandingLoan: "",
    CustomerSigningDate: "",
    BranchReceivedDate: "",
    ReasonForDelay: "",
    validatesignature: "",
    comment: "",
    PaymentStatus: "",
    ReceiptedBranch: "",
    SplitPaymentDetails: ""
  };
  const posScreenObj = {
    ReasonForDelay: "",
    MaxLoanEligible: "",
    LoanValueRequested: "",
    NoOfTimesLoanTakenInThePolicy: "",
    BranchReceivedDate: "",
    CustomerSigningDate: "",
    NameAsMentionedInTheBank: "",
    BankIFSC: "",
    BankAccountNumber: "",
    ConfirmBankAccountNumber: "",
    BankName: "",
    BranchName: "",
    AccountType: "",
    InitiatePennyDrop: "",
    validatesignature: "yes",
    PayableAmount: "",
    Comments: "",
    NameMatch: "",
    PANNumber: "",
    PANResult: "",
    NameinPAN: "",
    requestchannel: "",
    FundTransfer: "",
    ReasonForFundTransfer: "",
    FundTransferTo: "",
    FundTransferAmount: "",
    RelationToFTPolicy: "",
    NameofFundTransferPolicyOwner: "",
    BalanceAmountForLoan: "",
  };
  useEffect(() => {
    setExistingLoanCheck(false);
    setEligibleLoanCheck(false);
    setShareProcessCheck(false);
    setCheckedValue("");
    if (props?.EmailResponse?.IsEmailmanagent) {
      if (selectedSubType === "loanrepayment") {
        Data[selectedSubType]?.BOE_Details?.forEach((element) => {
          // if(element?.label==="Request Mode"){
          //   form.setFieldsValue({
          //     requestchannel: 4
          //   });
          //   element.disabled=true;
          // }
          if (
            element?.name === "UploadRequestForm" ||
            element?.name === "CustomerSigningDate" ||
            element?.name === "BranchReceivedDate" ||
            element?.name === "ValidateSignature"
          ) {
            element.hide = true;
          }
        });
      }
    }
  }, [selectedSubType]);
  useEffect(() => {
    if (props?.EmailResponse?.IsEmailmanagent) {
      if (selectedSubType === "loanrequest") {
        Data[selectedSubType]?.BOE_Details?.forEach((element) => {
          if (element?.label === "Request Mode") {
            form.setFieldsValue({
              requestchannel: 4,
            });
            element.disabled = true;
          }
        });
        Data[selectedSubType]?.View_Documents?.forEach((element) => {
          if (
            element?.name === "CustomerSigningDate" ||
            element?.name === "BranchReceivedDate" ||
            element?.name === "ValidateSignature"
          ) {
            element.hide = true;
          }
        });
        if (!Array.isArray(Data[selectedSubType]?.View_Documents)) {
          Data[selectedSubType].View_Documents = [];
        }

        // Remove existing instances of "Additional Note For Customer" before adding a new one
        Data[selectedSubType].View_Documents = Data[
          selectedSubType
        ].View_Documents.filter(
          (comment) => comment.name !== "AdditionalNoteForCustomer"
        );

        // Add "Additional Note For Customer" once
        Data[selectedSubType].View_Documents.push({
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
      if (!Data[selectedSubType]) {
        Data[selectedSubType] = {}; // Initialize if undefined
      }
      if (selectedSubType === "loanrepayment") {
        if (!Array.isArray(Data[selectedSubType]?.BOE_Details)) {
          Data[selectedSubType].BOE_Details = [];
        }

        // Remove existing instances of "Additional Note For Customer" before adding a new one
        Data[selectedSubType].BOE_Details = Data[
          selectedSubType
        ].BOE_Details.filter(
          (comment) => comment.name !== "AdditionalNoteForCustomer"
        );

        // Add "Additional Note For Customer" once
        Data[selectedSubType].BOE_Details.push({
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
      if (selectedSubType === "statusenquiry") {
        // Remove existing instances of "Additional Note For Customer" before adding a new one
        Data[selectedSubType].BOE_Details = Data[
          selectedSubType
        ].BOE_Details.filter(
          (comment) => comment.name !== "AdditionalNoteForCustomer"
        );

        // Add "Additional Note For Customer" once
        Data[selectedSubType].BOE_Details.push({
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
      if (!Array.isArray(Data[selectedSubType]?.Share_Loan_Process_Details)) {
        Data[selectedSubType].Share_Loan_Process_Details = [];
      }

      // Remove existing instances of "Additional Note For Customer" before adding a new one
      Data[selectedSubType].Share_Loan_Process_Details = Data[
        selectedSubType
      ].Share_Loan_Process_Details.filter(
        (comment) => comment.name !== "AdditionalNoteForCustomer"
      );

      // Add "Additional Note For Customer" once
      Data[selectedSubType].Share_Loan_Process_Details.push({
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
    if (selectedSubType === "loanrepayment" && !isShowPOSScreen) {
      LoanEnquiry();
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        posScreenLoanRepayObj[element.tagName] = element.tagValue;
      });
    }
    if (POSContactData && customerData?.isPOS) {
      if (loggedUser?.role === 5) {
        setIsPOSManageScreen(true);
        Data[selectedSubType]?.POS_Manger_Details?.forEach((item, index) => {
          if (item.d_FundTransfer && posScreenObj.FundTransfer === "yes") {
            item.hide = false;
          }
          if (
            POSContactData?.reasonDelayed &&
            item?.name === "ReasonForDelay"
          ) {
            item.hide = false;
            setShowReasonDelayField(true);
          }
        });
      } else {
        // if(selectedSubType==="loanrequest"){
        //   if(props?.EmailResponse?.IsEmailmanagent){
        //     Data[selectedSubType]?.BOE_Details?.forEach(element => {
        //       if(element?.label==="Request Mode"){
        //         form.setFieldsValue({
        //           requestchannel: "Email"
        //         });
        //         element.disabled=true;
        //       }

        //     });
        //   }
        // }
        setIsShowPOSScreen(true);
      }

      if (selectedSubType === "loanrepayment") {
        LoanEnquiry();
        POSContactData?.serviceRequestTransectionData?.forEach((element) => {
          posScreenLoanRepayObj[element.tagName] = element.tagValue;
        });
        setIsShowPOSScreen(true);

        form.setFieldsValue({
          ReceiptedBy: posScreenLoanRepayObj?.ReceiptedBy,
          ReceiptedBranch: posScreenLoanRepayObj?.ReceiptedBranch,
          RepaymentAmount: posScreenLoanRepayObj?.RepaymentAmount,
          DateOfRepayment: posScreenLoanRepayObj?.DateOfRepayment
            ? convertDate2(posScreenLoanRepayObj?.DateOfRepayment)
            : "",
          ModeOfRepayment: posScreenLoanRepayObj?.ModeOfRepayment,
          SplitPaymentDetails: posScreenLoanRepayObj?.SplitPaymentDetails,
          UTRChequeNumber: posScreenLoanRepayObj?.UTRChequeNumber || "NA",
          ReceiptNumber: posScreenLoanRepayObj?.ReceiptNumber,
          RepaymentType: posScreenLoanRepayObj?.RepaymentType,
          outstandingLoan: posScreenLoanRepayObj?.outstandingLoan,
          PaymentStatus: posScreenLoanRepayObj?.PaymentStatus,
          ValidateSignature: posScreenLoanRepayObj?.ValidateSignature,
          comment: posScreenLoanRepayObj?.comment,
          ReasonForDelay: posScreenLoanRepayObj?.ReasonForDelay,
          CustomerSigningDate: convertDate2(
            posScreenLoanRepayObj?.CustomerSigningDate
          ),
          BranchReceivedDate: convertDate2(
            posScreenLoanRepayObj?.BranchReceivedDate
          ),
        });
      }

      if (POSContactData?.deDupPayload?.length > 0) {
        for (let index in POSContactData?.deDupPayload) {
          if (POSContactData?.deDupPayload[index]?.type === "BANK") {
            setBankDeDupeData(
              POSContactData?.deDupPayload[index]?.deDupPayload
            );
          }
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

      Data[selectedSubType]?.POS_Details?.forEach((item, index) => {
        if (item.d_FundTransfer && posScreenObj.FundTransfer === "yes") {
          item.hide = false;
        }
        if (!POSContactData?.reasonDelayed && item?.name === "ReasonForDelay") {
          item.hide = false;
          setShowReasonDelayField(true);
        }
      });

      setBankAccNo(posScreenObj.BankAccountNumber);
      form.setFieldsValue({
        MaxLoanEligible: posScreenObj.MaxLoanEligible,
        LoanValueRequested: posScreenObj?.PayableAmount,
        NoOfTimesLoanTakenInThePolicy:
          posScreenObj.NoOfTimesLoanTakenInThePolicy,
        BranchReceivedDate: posScreenObj?.BranchReceivedDate
          ? convertDate2(posScreenObj?.BranchReceivedDate)
          : "",
        CustomerSigningDate: posScreenObj?.CustomerSigningDate
          ? convertDate2(posScreenObj?.CustomerSigningDate)
          : "",
        ReasonForDelay: posScreenObj.ReasonForDelay,
        NameAsMentionedInTheBank: posScreenObj?.NameAsMentionedInTheBank,
        BankIFSC: posScreenObj.BankIFSC,
        BankAccountNumber: posScreenObj.BankAccountNumber,
        ConfirmBankAccountNumber: posScreenObj.ConfirmBankAccountNumber,
        BankName: posScreenObj.BankName,
        BranchName: posScreenObj.BranchName,
        AccountType: posScreenObj.AccountType ? parseInt(posScreenObj.AccountType) : posScreenObj.AccountType,
        InitiatePennyDrop: posScreenObj.InitiatePennyDrop,
        validatesignature: posScreenObj.ValidateSignature,
        ViewFinalPayableAmount: posScreenObj?.PayableAmount,
        ChangeInLast60Days: POSContactData?.personalChange,
        PolicyLoggedLast: POSContactData?.policyLogged,
        BranchRemarks: posScreenObj.Comments,
        NameMatch: posScreenObj.NameMatch,
        PANNumber: posScreenObj.PANNumber,
        PANResult: posScreenObj.PANResult,
        NameinPAN: posScreenObj.NameinPAN,
        requestchannel: POSContactData?.reqMode,
        FundTransfer: posScreenObj.FundTransfer,
        Comments: posScreenObj.Comments,
        ReasonForFundTransfer: posScreenObj.ReasonForFundTransfer,
        FundTransferTo: posScreenObj.FundTransferTo,
        FundTransferAmount: posScreenObj.FundTransferAmount,
        RelationToFTPolicy: posScreenObj.RelationToFTPolicy,
        NameofFundTransferPolicyOwner:
          posScreenObj.NameofFundTransferPolicyOwner,
        BalanceAmountForLoan: posScreenObj.BalanceAmountForLoan,
      });
    } else {
      if (selectedSubType === "loanrequest") {
        LoanStatement();
        LoanEnquiry();
      } else if (!POSContactData) {
        getProcesLink();
        getProcesDocLnk();
      }
    }

    // Data[selectedSubType]?.View_Documents?.forEach((item, index) => {

    //   if (new Date(formFeilds?.BranchReceivedDate) < new Date()&&item?.name?.includes("ResonForDelay")) {
    //     item.hide = true;
    //   }
    // });
  }, [selectedSubType]);
  const formFeilds = form.getFieldsValue();
  const getUploadFiles = (listOfUploadFiles) => {
    // const updatedUploadList = listOfUploadFiles?.map((obj) => {
    //   // Create a new object without the propertyToDelete property
    //   const { labelName, ...newObject } = obj;
    //   return newObject;
    // });
    // Update the state with the new list
    //setUploadFiles([...docIdProofs, ...listOfUploadFiles]);
    //const PreviouslyFiles = [...docIdProofs, ...listOfUploadFiles]
    if (!listOfUploadFiles || listOfUploadFiles?.length === 0) return;
    const isBankAccountProof =
      listOfUploadFiles[0]?.labelName?.toLowerCase() ===
      "upload bank account proof";
    if (isBankAccountProof) {
      setBankAccProofs(listOfUploadFiles);
    } else {
      setUploadFiles(listOfUploadFiles);
    }
  };

  const setInternalReqData = () => {
    POSContactData.serviceRequestTransectionData?.forEach((element) => {
      if (element.tagName === "InternalRequirementValue") {
        setInternalFlowRequirements(props.interlRequirementTagValue);
      }
    });
  };

  const handleInputChange = (e, item) => {
    if (item.label?.includes("IFSC") && e.target.value) {
      getIFSCBankDetails(e.target.value);
    }
  };

  const getExistPANNumber = async () => {
    setShowAlert(false);
    try {
      let empID =
        loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID;
      const response = await apiCalls.getExistPANNumber(
        customerData?.poClientID,
        empID
      );
      if (response?.data) {
        const res = response?.data?.responseBody;
        if (res?.zpanidno) {
          getCheckPANdetails(res?.zpanidno);
          // LoanStatement();
          form.setFieldsValue({
            PANNumber: res?.zpanidno,
          });
        } else {
          setAlertData(`Kindly Update PAN Number`);
          setShowAlert(true);
          // setNavigateTo("/advancesearch");
          //if(!props?.EmailResponse?.IsEmailmanagent){
          //  setNavigateTo("/advancesearch");
        }
      }
      // }
      else {
        handleError(
          response?.data?.responseBody?.errormessage ||
            "Something went wrong, please try again!"
        );
        setAlertData(`Kindly Update PAN Number`);
        setShowAlert(true);
        //setNavigateTo("/advancesearch");
        //if(!props?.EmailResponse?.IsEmailmanagent){
        //  setNavigateTo("/advancesearch");
        //}
      }
    } catch (error) {
      handleError("Something went wrong, please try again!");
      setAlertData(`Kindly Update PAN Number`);
      setShowAlert(true);
      //setNavigateTo("/advancesearch");
      //if(!props?.EmailResponse?.IsEmailmanagent){
      //  setNavigateTo("/advancesearch");
      //}
    }
  };

  const handleError = (errorMessage) => {
    message.error({
      content: errorMessage,
      className: "custom-msg",
      duration: 2,
    });
  };

  const getDocLink = () => {
    const filteredLinks = isDocLinks?.filter((item) =>
      item.docType?.includes("Loan")
    );
    // Assuming you want to return an array of links, you can use map
    const links = filteredLinks?.map((item) => item.link);
    return links?.length > 0 ? links[0] : "";
  };
  const getProcessLink = () => {
    const filteredLinks = isProcessLinks?.filter((item) =>
      item.docType?.includes("Loan")
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

  const handleSubmit = (values) => {
    //POSApprove RaiseRequirement
    if (POSContactData && customerData?.isPOS) {
      if (clickedButton === "RaiseRequirement") {
        getRaiseRequirements();
        // POSActionsOnContactDetails(values, "REJECTED");
      } else if (clickedButton === "POSApprove") {
        POSActionsOnContactDetails(values, "APPROVED", null);
      }
    } else {
      if (values.ValidateSignature === "no") {
        getRaiseRequirements();
      } else {
        saveRequest(values);
      }
    }
  };

  const saveRequest = (values) => {
    values = form.getFieldsValue();
    setShowAlert(false);
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
    // if(selectedSubType==="loanrequest")setIsShowPOSScreen(!isShowPOSScreen);
    const newFilesArray = [];
    const uniqueFilesSet = new Set();

    if (uploadFiles?.length > 0) {
      uploadFiles.forEach((file) => uniqueFilesSet.add(file));
    }
    if (bankAccProofs?.length > 0) {
      bankAccProofs?.forEach((file) => uniqueFilesSet.add(file));
    }

    if (uploadMultipleFiles?.length > 0) {
      uploadMultipleFiles.forEach((file) => uniqueFilesSet.add(file));
    }

    if (uploadIDMultipleFiles?.length > 0) {
      uploadIDMultipleFiles.forEach((file) => uniqueFilesSet.add(file));
    }
    if (docIdProofs?.length > 0) {
      docIdProofs.forEach((file) => uniqueFilesSet.add(file));
    }
    if (isIDUploadMultipleFiles?.length > 0) {
      isIDUploadMultipleFiles.forEach((file) => uniqueFilesSet.add(file));
    }

    // if (props.SelectedSubTypeVal === 'PAN Update' && PANUploadFiles?.length > 0) {
    //   PANUploadFiles.forEach(file => uniqueFilesSet.add(file));
    // }

    // Add all unique files to newFilesArray
    newFilesArray.push(...uniqueFilesSet);

    let obj = {
      CallType: props?.selectedCallType,
      SubType: props?.selectedSubTypeId,
      Category:
        selectedSubType === "loanrequest" ||
        selectedSubType === "loanrepayment" ||
       /*  checkedValue === "shareprocess" || */
       selectedSubType === "sharestatementlink" ||
        raiseRequirementOpen
          ? 2
          : 1,
      RequestSource: loginInfo?.userProfileInfo?.profileObj?.sourceId || 0,
      RequestChannel:
        loginInfo?.userProfileInfo?.profileObj?.role === 14
          ? 13
          : values.requestchannel,
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
      RequestDateTime: values?.BranchReceivedDate
        ? new Date(values?.BranchReceivedDate)
        : new Date(),
      ReasonDelayed: values?.ReasonForDelay,
      CustSignDateTime: values?.CustomerSigningDate
        ? new Date(values?.CustomerSigningDate)
        : new Date(),
      CurrentStatus: raiseRequirementOpen ? "Reject" : "",
      TransactionData: [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: formFeilds?.AdditionalNoteForCustomer || "",
        },
      ],
      Uploads: newFilesArray?.length > 0 ? newFilesArray : uploadFiles,
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

   /*  if (checkedValue === "ExistingLoanDetails") { */
    if (  selectedSubType === "existingloandetailsenquiry") {
      obj.TransactionData.push(
        {
          Status: "Create",
          TagName: "EnquiryType",
          TagValue: "ExistingLoanDetails",
        },
        {
          Status: "Create",
          TagName: "LoanDisbursed",
          TagValue: formFeilds?.LoanDisbursed,
        },
        {
          Status: "Create",
          TagName: "LoanInterest",
          TagValue: formFeilds?.LoanInterest,
        },
        {
          Status: "Create",
          TagName: "OriginalLoanAmount",
          TagValue: formFeilds?.OriginalLoanAmount,
        },
        {
          Status: "Create",
          TagName: "OutstandingPrincipalAmount",
          TagValue: formFeilds?.OutstandingPrincipalAmount,
        },
        {
          Status: "Create",
          TagName: "TotalLoanInterest",
          TagValue: formFeilds?.TotalLoanInterest,
        },
        {
          Status: "Create",
          TagName: "TotalLoanAmountRepaid",
          TagValue: formFeilds?.TotalLoanAmountRepaid,
        },
        {
          Status: "Create",
          TagName: "LoanOutstanding",
          TagValue: formFeilds?.LoanOutstanding,
        },
        {
          Status: "Create",
          TagName: "LastLoanRepaidDate",
          TagValue: formFeilds?.LastLoanRepaidDate,
        },
        {
          Status: "Create",
          TagName: "PolicyAssignedTo",
          TagValue: formFeilds?.PolicyAssignedTo,
        },
        {
          Status: "Create",
          TagName: "PolicyBondSubmitted",
          TagValue: formFeilds?.PolicyBondSubmitted,
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
        {
          Status: "Create",
          TagName: "RequestorComments",
          TagValue: values?.RequestorComments || "",
        }
      );
    } /* else if (checkedValue === "EligibleLoanDetails") { */
	else if (selectedSubType === "eligibleloandetailsenquiry") {
      obj.TransactionData.push(
        {
          Status: "Create",
          TagName: "EnquiryType",
          TagValue: "EligibleLoanDetails",
        },
        {
          Status: "Create",
          TagName: "LoanApplicable",
          TagValue: formFeilds?.LoanApplicable,
        },
        {
          Status: "Create",
          TagName: "LoanPercent",
          TagValue: formFeilds?.LoanPercent,
        },
        // {
        //     "Status": "Create",
        //     "TagName": "SurrenderValue",
        //     "TagValue": formFeilds?.SurrenderValue
        // },
        {
          Status: "Create",
          TagName: "MaxLoanvalue",
          TagValue: formFeilds?.MaxLoanvalue,
        },
        {
          Status: "Create",
          TagName: "LoanValueDate",
          TagValue: formFeilds?.LoanValueDate,
        },
        {
          Status: "Create",
          TagName: "PayableAmount",
          TagValue: formFeilds?.LoanValueRequested,
        },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "",
        },
        {
          Status: "Create",
          TagName: "NoOfTimesLoanTakenInThePolicy",
          TagValue: formFeilds?.NoOfTimesLoanTakenInThePolicy,
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
        {
          Status: "Create",
          TagName: "RequestorComments",
          TagValue: values?.RequestorComments || "",
        }
      );
    } /* else if (checkedValue === "shareprocess") { */
	else if (selectedSubType === "sharestatementlink") {
      obj.TransactionData.push(
        {
          Status: "Create",
          TagName: "EnquiryType",
          TagValue: "ShareProcess",
        },
        {
          Status: "Create",
          TagName: "Template",
          TagValue: "LOANSTMTEMAILER",
        },
        {
          Status: "Create",
          TagName: "LoanFileType",
          TagValue: activecommuType,
        },
        { Status: "Create", TagName: "DocLink", TagValue: getDocLink() || "" },
        {
          Status: "Create",
          TagName: "ProcessLink",
          TagValue: getProcessLink() || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
        {
          Status: "Create",
          TagName: "RequestorComments",
          TagValue: values?.RequestorComments || "",
        }
      );
    } else if (selectedSubType === "loanrequest") {
      obj.TransactionData.push(
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: formFeilds?.AdditionalNoteForCustomer || "",
        },
        {
          Status: "Create",
          TagName: "FundTransfer",
          TagValue: formFeilds?.FundTransfer || "",
        },
        {
          Status: "Create",
          TagName: "ReasonForFundTransfer",
          TagValue: formFeilds?.ReasonForFundTransfer || "",
        },
        {
          Status: "Create",
          TagName: "FundTransferTo",
          TagValue: formFeilds?.FundTransferTo || "",
        },
        {
          Status: "Create",
          TagName: "FundTransferAmount",
          TagValue: formFeilds?.FundTransferAmount || "",
        },
        {
          Status: "Create",
          TagName: "RelationToFTPolicy",
          TagValue: formFeilds?.RelationToFTPolicy || "",
        },
        {
          Status: "Create",
          TagName: "NameofFundTransferPolicyOwner",
          TagValue: formFeilds?.NameofFundTransferPolicyOwner || "",
        },
        {
          Status: "Create",
          TagName: "BalanceAmountForLoan",
          TagValue: formFeilds?.BalanceAmountForLoan || "",
        },

        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: formFeilds?.requestchannel || "",
        },
        {
          Status: "Create",
          TagName: "PANResult",
          TagValue: formFeilds?.PANResult || "",
        },
        {
          Status: "Create",
          TagName: "NameinPAN",
          TagValue: formFeilds?.NameinPAN || "",
        },
        {
          Status: "Create",
          TagName: "CKYCNumber",
          TagValue: formFeilds?.CKYCNumber || "",
        },
        {
          Status: "Create",
          TagName: "POName",
          TagValue: formFeilds?.poName || "",
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
          TagValue: convertDate(
            policyDetails?.policyDetailsObj?.saDetails?.rcd
          ),
        },
        {
          Status: "Create",
          TagName: "APE",
          TagValue: customerData?.premiumAmt || "",
        },
        {
          Status: "Create",
          TagName: "MaxLoanEligible",
          TagValue: formFeilds?.MaxLoanEligible || "",
        },
        {
          Status: "Create",
          TagName: "PayableAmount",
          TagValue: formFeilds?.LoanValueRequested || "",
        },
        {
          Status: "Create",
          TagName: "NoOfTimesLoanTakenInThePolicy",
          TagValue: formFeilds?.NoOfTimesLoanTakenInThePolicy || "",
        },
        {
          Status: "Create",
          TagName: "PANNumber",
          TagValue: formFeilds?.PANNumber || "",
        },
        {
          Status: "Create",
          TagName: "CustomerSigningDate",
          TagValue: formFeilds?.CustomerSigningDate || "",
        },
        {
          Status: "Create",
          TagName: "BranchReceivedDate",
          TagValue: formFeilds?.BranchReceivedDate
            ? new Date(formFeilds?.BranchReceivedDate)
            : "",
        },
        {
          Status: "Create",
          TagName: "ValidatedBy",
          TagValue: "form",
        },
        {
          Status: "Create",
          TagName: "ValidateSignature",
          TagValue: formFeilds?.ValidateSignature,
        },
        {
          Status: "Create",
          TagName: "NameAsMentionedInTheBank",
          TagValue: formFeilds?.NameAsMentionedInTheBank,
        },
        {
          Status: "Create",
          TagName: "BankIFSC",
          TagValue: formFeilds?.BankIFSC,
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
          TagName: "InitiatePennyDrop",
          TagValue: formFeilds?.InitiatePennyDrop,
        },
        {
          Status: "Create",
          TagName: "ReasonForDelay",
          TagValue: formFeilds?.ReasonForDelay,
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: formFeilds?.Comments,
        },
        {
          Status: "Create",
          TagName: "NameMatch",
          TagValue: formFeilds?.NameMatch,
        }
      );
    } else if (selectedSubType === "loanrepayment") {
      obj.TransactionData.push(
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "ReceiptedBy",
          TagValue: values?.ReceiptedBy || "",
        },
        {
          Status: "Create",
          TagName: "ReceiptedBranch",
          TagValue: values?.ReceiptedBranch || "",
        },
        {
          Status: "Create",
          TagName: "RepaymentAmount",
          TagValue: values?.RepaymentAmount || "",
        },
        {
          Status: "Create",
          TagName: "DateOfRepayment",
          TagValue: values?.DateOfRepayment || "",
        },
        {
          Status: "Create",
          TagName: "ModeOfRepayment",
          TagValue: values?.ModeOfRepayment || "",
        },
          {
          Status: "Create",
          TagName: "SplitPaymentDetails",
          TagValue: values?.SplitPaymentDetails || "",
        },
        {
          Status: "Create",
          TagName: "UTRChequeNumber",
          TagValue: values?.UTRChequeNumber || "",
        },
        {
          Status: "Create",
          TagName: "ReceiptNumber",
          TagValue: values?.ReceiptNumber || "",
        },
        {
          Status: "Create",
          TagName: "RepaymentType",
          TagValue: values?.RepaymentType || "",
        },
        {
          Status: "Create",
          TagName: "ValidateSignature",
          TagValue: values?.ValidateSignature || "",
        },
        {
          Status: "Create",
          TagName: "CustomerSigningDate",
          TagValue: values?.CustomerSigningDate || "",
        },
        {
          Status: "Create",
          TagName: "BranchReceivedDate",
          TagValue: values?.BranchReceivedDate || "",
        },
        {
          Status: "Create",
          TagName: "ReasonForDelay",
          TagValue: values?.ReasonForDelay || "",
        },
        {
          Status: "Create",
          TagName: "comment",
          TagValue: values?.comment || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        }
      );
    } else if (selectedSubType === "loanrequest") {
      obj.TransactionData.push(
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: formFeilds?.AdditionalNoteForCustomer || "",
        },
        {
          Status: "Create",
          TagName: "SourceofQuery",
          TagValue: formFeilds?.SourceofQuery || "",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: formFeilds?.Comments || "",
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
    obj.TransactionData.push({
      Status: "Create",
      TagName: "CustomerType",
      TagValue: policyDetails?.policyDetailsObj?.planAndStatus?.customerType,
    });

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
          //   return
          // }
          // setIsLoading(false);
          // if (val?.data?.category == 2) {
          //   setAlertTitle(`Request Created Successfully`);
          //   let successMessage = val?.data?.tat > 0 ?
          //     `Ticket ID Number ${val?.data?.srvReqRefNo}. Your request will be processed in ${val?.data?.tat || 0} days`
          //     : `Ticket ID Number ${val?.data?.srvReqRefNo}.`;
          //   setAlertData(successMessage);
          // } else {
          //   setAlertTitle("Query Raised Successfully");
          //   let successMessage = `Ticket ID Number ${val?.data?.srvReqRefNo}.`;
          //   setAlertData(successMessage);
          // }
          // setShowAlert(true);
          // setNavigateTo("/advancesearch");
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
    const formData = form.getFieldValue();
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

    // }

    //  else{
    //   saveRequest(formData);
    //  }
    if (isShowPOSScreen) {
      POSActionsOnContactDetails(null, "REJECTED", null);
    } else {
      saveRequest(formData);
    }

    // if(formData.ValidateSignature === 'no'){

    // }else{
    // POSActionsOnContactDetails(null, "REJECTED");
    // }
  };

  const POSActionsOnContactDetails = (values, status, list) => {
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
        ((seletedRequerimentList?.length === 0 && !reqFormValues?.PosOtherReq)&& status === "REJECTED") ||
        ((seletedRequerimentList?.length === 0 && !internalFormValues?.PosInternalReq) && status === "INTENAL")
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
      POSComments1: values?.Comments,
      TransactionPayload: [
        {
          Status: "Update",
          TagName: "POSComments1",
          TagValue: values?.AuthorizerComments || values?.Comments,
        },
      ],
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
      )
    }

    if (loggedUser?.role === 4) {
      if (selectedSubType === "loanrepayment") {
        obj.TransactionPayload.push(
          {
            Status: "Update",
            TagName: "CompleteRepayment",
            TagValue: values?.CompleteRepayment,
          },
          {
            Status: "Update",
            TagName: "PolicyBondwithFGI",
            TagValue: values?.PolicyBondwithFGI,
          },
          {
            Status: "Create",
            TagName: "ReAssignmentDate",
            TagValue: values?.ReAssignmentDone,
          }
        );
      }

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
          TagName: "BankName",
          TagValue: values?.BankName,
        },
        {
          Status: "Update",
          TagName: "BranchName",
          TagValue: values?.BranchName,
        },
         {
          Status: "Update",
          TagName: "AccountType",
          TagValue: values?.AccountType,
        },
        {
          Status: "Update",
          TagName: "BankAccountNumber",
          TagValue: values?.BankAccountNumber,
        },
        {
          Status: "Update",
          TagName: "InitiatePennyDrop",
          TagValue: values?.InitiatePennyDrop,
        },
        {
          Status: "Update",
          TagName: "NameAsperPennyDrop",
          TagValue: values?.NameAsperPennyDrop,
        },
        {
          Status: "Update",
          TagName: "NameMatch",
          TagValue: values?.NameMatch,
        },

        {
          Status: "Create",
          TagName: "PaymentMode",
          TagValue: values?.paymentMode,
        },
        {
          Status: "Create",
          TagName: "ChangeInLast60Days",
          TagValue: values?.ChangeInLast60Days,
        },
        {
          Status: "Create",
          TagName: "PolicyLoggedLast",
          TagValue: values?.PolicyLoggedLast,
        },
        {
          Status: "Create",
          TagName: "ViewFinalPayableAmount",
          TagValue: values?.ViewFinalPayableAmount,
        },
        {
          Status: "Create",
          TagName: "InitiatePennyDropPOS",
          TagValue: values?.InitiatePennyDropPOS,
        },

        {
          Status: "Create",
          TagName: "ReceiptedBy",
          TagValue: values?.ReceiptedBy,
        },
        {
          Status: "Create",
          TagName: "ReceiptedBranch",
          TagValue: values?.ReceiptedBranch,
        },
        {
          Status: "Create",
          TagName: "RepaymentAmount",
          TagValue: values?.RepaymentAmount,
        },
        {
          Status: "Create",
          TagName: "DateOfRepayment",
          TagValue: values?.DateOfRepayment,
        },
        {
          Status: "Create",
          TagName: "ModeOfRepayment",
          TagValue: values?.ModeOfRepayment,
        },
          {
          Status: "Create",
          TagName: "SplitPaymentDetails",
          TagValue: values?.SplitPaymentDetails,
        },
        {
          Status: "Create",
          TagName: "UTROrChequeNumber",
          TagValue: values?.UTROrChequeNumber,
        },
        {
          Status: "Create",
          TagName: "PaymentStatus",
          TagValue: values?.PaymentStatus,
        },
        {
          Status: "Create",
          TagName: "CompleteRepaymentDone",
          TagValue: values?.CompleteRepaymentDone,
        },
        {
          Status: "Create",
          TagName: "PolicyBondwithFGI",
          TagValue: values?.PolicyBondwithFGI,
        },
        {
          Status: "Create",
          TagName: "ReAssignmentDate",
          TagValue: values?.ReAssignmentDone,
        }
      );
    }
     if(isShowPOSScreen){
     
    obj.TransactionPayload.push({
        "Status": "Create",
        "TagName": "PosOtherReq",
        "TagValue": reqFormValues?.PosOtherReq || ""
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
        },
        {
          Status: "Create",
          TagName: "BranchRemarks",
          TagValue: values?.BranchRemarks,
        }
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
    const pennydropaccess = import.meta.env.VITE_APP_POLICY_LOAN_PENNYFROPACCESS;
    const values = form.getFieldsValue();
    if (!values.BankAccountNumber || !values.BankIFSC) {
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
      ifsc: values?.BankIFSC,
      consent: "Y",
      nameMatchType: "Individual",
      useCombinedSolution: "N",
      allowPartialMatch: "true",
      preset: "G",
      suppressReorderPenalty: "true",
      clientData: {
        caseId: POSContactData?.srvReqRefNo || "",
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
            Data[selectedSubType]?.View_Bank_Details?.forEach((item, index) => {
              if (item?.name === "BankAccountProof") {
                item.required = false;
              }
            });
            setPennyDropResponse(result?.data);

            if (POSContactData && customerData?.isPOS) {
              form.setFieldsValue({
                InitiatePennyDropPOS2: result?.data?.responseBody?.result?.data
                  ?.source[0]?.data?.accountName
                  ? "Success"
                  : "Failed",
                NameAsperPennyDropPOS2:
                  result?.data?.responseBody?.result?.data?.source[0]?.data
                    ?.accountNam,
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
            }
          } else {
            Data[selectedSubType]?.View_Bank_Details?.forEach((item, index) => {
              if (item?.name === "BankAccountProof") {
                item.required = true;
              }
            });
            if (POSContactData && customerData?.isPOS) {
              form.setFieldsValue({
                InitiatePennyDropPOS2: result?.data?.responseBody?.result?.data
                  ?.source[0]?.data?.accountName
                  ? "Success"
                  : "Failed",
                // NameAsperPennyDropPOS2:result?.data?.statusMessage,
              });
            } else {
              form.setFieldsValue({
                InitiatePennyDrop: result?.data?.responseBody?.result?.data
                  ?.source[0]?.data?.accountName
                  ? "Success"
                  : "Failed",
                InitiatePennyDropPOS2: result?.data?.responseBody?.result?.data
                  ?.source[0]?.data?.accountName
                  ? "Success"
                  : "Failed",
              });
            }
          }
          //SUCCESSFUL TRANSACTION
        } else {
          Data[selectedSubType]?.View_Bank_Details?.forEach((item, index) => {
            if (item?.name === "BankAccountProof") {
              item.required = true;
            }
          });
          setIsLoading(false);
          form.setFieldsValue({
            InitiatePennyDrop: "Invalid Input",
            InitiatePennyDropPOS2: "Invalid Input",
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
        Data[selectedSubType]?.View_Bank_Details?.forEach((item, index) => {
          if (item?.name === "BankAccountProof") {
            item.required = true;
          }
        });

        form.setFieldsValue({
          InitiatePennyDrop: "Invalid Input",
          InitiatePennyDropPOS2: "Invalid Input",
        });

        setIsLoading(false);
      });
  };

  const convertDate = (inputDate) => {
    if (inputDate) {
      const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
      return formattedDate;
    }
    return "";
  };

  const convertDate2 = (inputDate) => {
    if (inputDate) {
      const date = new Date(inputDate);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      return formattedDate;
    }
    return "";
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
          BranchName: "",
        });
      }
    }
  };

  // const CKYCC = ()=>{
  //   let values = form.getFieldsValue();
  //   setIsLoading(true);
  //   let response = apiCalls.CKYC(values?.CKYCNumber);
  //   response
  //     .then((val) => {
  //       if (val?.data?.responseBody?.errorcode!=="1") {
  //         const res = val?.data?.responseBody;
  //           form.setFieldsValue({
  //             // Name_New:res?.nameoncard,
  //             // PANRevalidationResult: res?.description,
  //             CKYCResult: res?.description,
  //             // PanAadharSeeding: res?.aadhaarSeedingStatus,
  //           })

  //         setIsLoading(false);
  //       } else {

  //         setIsLoading(false);
  //         form.setFieldsValue({

  //           CKYCResult: val?.data?.responseBody?.errormessage

  //         })
  //         message.error({
  //           content:
  //             val?.data?.responseBody?.errormessage ||
  //             "Something went wrong please try again!",
  //           className: "custom-msg",
  //           duration: 2,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       setIsLoading(false);
  //     });
  // }

  const getCheckPANdetails = (val) => {
    setIsLoading(true);
    //CKYCNumber

    let response = apiCalls.getCheckPANdetails(val, customerData?.policyNo);
    response
      .then((val) => {
        if (val?.data?.responseBody?.errorcode !== "1") {
          Data[selectedSubType]?.View_Documents?.forEach((item, index) => {
            if (item?.name === "uploadPAN") {
              item.required = false;
            }
          });
          // setClientEnquiryData(val?.data?.responseBody);
          const res = val?.data?.responseBody;
          Data[selectedSubType]?.BOE_Details?.forEach((item, index) => {
            if (item?.name === "NameinPAN") {
              item.hide = false;
            }
          });
          form.setFieldsValue({
            // Name_New:res?.nameoncard,
            // PANRevalidationResult: res?.description,
            PANResult: res?.description,
            NameinPAN:
              res?.firstName + " " + res?.middleName + " " + res?.lastName,
            // PanAadharSeeding: res?.aadhaarSeedingStatus,
          });

          setIsLoading(false);
        } else {
          Data[selectedSubType]?.View_Documents?.forEach((item, index) => {
            if (item?.name === "uploadPAN") {
              item.required = true;
              item.hide = false;
            }
          });

          setIsLoading(false);
          form.setFieldsValue({
            PANResult: val?.data?.responseBody?.errormessage,
          });
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

  const onBlurInput = (value, item) => {
    const obj = form.getFieldsValue(value);
    if (item.name === "BankIFSC" && value) {
      getIFSCBankDetails(value);
    }
    // if(item.name === "PANNumber" && value.length ===10){
    //   getCheckPANdetails()
    // }

    // if(item.name === "CKYCNumber"&& value.length ===14){
    //   CKYCC()
    // }
    if (item.name === "FundTransferTo") {
      if (value === customerData?.policyNo) {
        form.setFieldsValue({ FundTransferTo: "" });
        message.error({
          content: "Invalid Policy Number",
          className: "custom-msg",
          duration: 2,
        });
      }
    }

    if (item.name === "LoanValueRequested") {
      if (
        (value &&
          formFeilds?.MaxLoanEligible &&
          Number(value) > Number(formFeilds?.MaxLoanEligible)) ||
        (value && value <= 0)
      ) {
        message.destroy();
        message.error({
          content:
            "Loan Value Requested Should Not Exceed Available Loan value",
          className: "custom-msg",
          duration: 2,
        });
        form.setFieldsValue({ LoanValueRequested: "" });
      } else if (value && Number(value) < 10000) {
        message.destroy();
        message.error({
          content: "Loan Value Requested Should be at least 10000",
          className: "custom-msg",
          duration: 2,
        });
        form.setFieldsValue({ LoanValueRequested: "" });
      }
    }

    if (item.name === "FundTransferAmount") {
      if (
        (value && Number(value) > Number(formFeilds?.LoanValueRequested)) ||
        (value && value <= 0)
      ) {
        message.destroy();
        message.error({
          content:
            "Fund Transfer Amount Should Not Exceed Loan Value Requested",
          className: "custom-msg",
          duration: 2,
        });
        form.setFieldsValue({
          FundTransferAmount: "",
          BalanceAmountForLoan: "",
        });
      } else {
        form.setFieldsValue({
          BalanceAmountForLoan:
            Number(formFeilds?.LoanValueRequested) - Number(value),
        });
      }
    }

    if (item.name === "ConfirmBankAccountNumber") {
      setCNFBankAccNo(value);
    } else if (item.name === "BankAccountNumber") {
      setBankAccNo(value);
    }

    if (
      formFeilds?.ConfirmBankAccountNumber?.length >= 4 &&
      item.name === "ConfirmBankAccountNumber"
    ) {
      if (BankAccNo !== value) {
        message.destroy();
        message.error({
          content: "Bank Number Not matched",
          className: "custom-msg",
          duration: 2,
        });
        form.setFieldsValue({ ConfirmBankAccountNumber: "" });
      }

      //  const lastFourDigits = formFeilds?.ConfirmBankAccountNumber.slice(-4);
      //  const maskedString = '*'.repeat(formFeilds?.ConfirmBankAccountNumber.length - 4) + lastFourDigits;
      //  form.setFieldsValue({ConfirmBankAccountNumber: maskedString});
    } else if (value?.length >= 4 && item.name === "BankAccountNumber") {
      const lastFourDigits = obj.BankAccountNumber.slice(-4);
      const maskedString =
        "*".repeat(obj.BankAccountNumber.length - 4) + lastFourDigits;
      form.setFieldsValue({ BankAccountNumber: maskedString });
    }

    //   if(item.name === 'ConfirmBankAccountNumber' || item.name === 'BankAccountNumber'){
    //     if(formFeilds?.ConfirmBankAccountNumber && formFeilds?.BankAccountNumber && (formFeilds?.ConfirmBankAccountNumber !== formFeilds?.BankAccountNumber) ){
    //      message.destroy();
    //      message.error({
    //        content:
    //          "Bank Number Not matched",
    //        className: "custom-msg",
    //        duration: 2,
    //      });
    //      form.setFieldsValue({ConfirmBankAccountNumber: ''})

    //     }

    //  }
  };

  const surrenderEnquiryData = () => {
    setIsLoading(true);
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
            form.setFieldsValue({ SurrenderValue: 0 });
            if (val?.data?.responseBody?.errormessage) {
              setAlertTitle(val?.data?.responseBody?.errormessage);
            } else {
              setAlertTitle("Unable to fetch Surrender Value");
            }

            // setAlertData(`${"Ticket No " + val?.data?.srvReqRefNo}`);

            // setNavigateTo("/advancesearch");

            setShowAlert(true);
          } else {
            let amount = Number(
              val?.data?.responseBody?.totalsurrendervalue
            ).toLocaleString("en-IN");
            form.setFieldsValue({ SurrenderValue: amount });
            setTotalSurrenderAmount(amount);
            //form.setFieldsValue({ TotalSurrenderValue: amount });
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

        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const GetAssigneeEnquiry = () => {
    setIsLoading(true);
    let obj = {
      requestHeader: {
        source: "POS",
        carrierCode: "2",
        branch: "PRA",
        userId: loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID,
        userRole: "10",
        partnerId: "MSPOS",
        processId: "POS",
        monthendExtension: "N",
        monthendDate: "09/11/2023",
      },
      requestBody: {
        policyNumber: customerData?.policyNo,
      },
    };

    let response = apiCalls.GetAssigneeEnquiry(obj);
    response
      .then((val) => {
        if (val?.data) {
          setAssigneeEnquiryData(val?.data?.responseBody);
          let res = val?.data?.responseBody;

          form.setFieldsValue({
            PolicyAssignedTo: res?.assigneeName,
          });
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
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const LoanStatement = () => {
    let empID = loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID;
    setShowAlert(false);
    setIsLoading(true);
    let obj = {
      RequestHeader: {
        source: "POS",
        carrierCode: "2",
        branch: "pra",
        userId: empID,
        userRole: "10",
        monthEndExtension: "N",
        MonthendDate: "30/09/2023",
      },
      RequestBody: {
        policyNo: policyDetails?.policyDetailsObj?.identifiers?.policyNo,
      },
    };

    let response = apiCalls.LoanStatement(obj);
    response
      .then((val) => {
        if (val?.data) {
          if (val?.data?.responseBody?.errorCode === "1") {
            form.setFieldsValue({
              LoanApplicable: "No",
            });
            setIsLoanChecking(true);
            // handleError(val?.data?.responseBody?.errormessage);

            setAlertTitle(`${val?.data?.responseBody?.errormessage}`);

            // setNavigateTo("/advancesearch");

            setShowAlert(true);
            return;
          }
          if (!shareProcessCheck) {
            getExistPANNumber();
          }
          setLoanStatementData(val?.data?.responseBody);
          settakenLoans(val?.data?.responseBody?.listDetails.length);
          const ttpayamtt = val?.data?.responseBody?.listDetails.reduce(
            (accumulator, currentValue) => {
              return accumulator + Number(currentValue?.ttpayamt);
            },
            0
          );
          setTtpayamt(ttpayamt);

          const mostRecentDtt = val?.data?.responseBody?.listDetails?.reduce(
            (mostRecent, current) => {
              const currentDate = new Date(
                current?.zldate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")
              );
              const mostRecentDate = new Date(mostRecent?.zldate || 0);

              return currentDate > mostRecentDate ? current : mostRecent;
            },
            {}
          );

          setMostRecentDt(mostRecentDt);

          form.setFieldsValue({
            LastLoanRepaidDate: mostRecentDtt?.zldate
              ? moment(mostRecentDtt?.zldate, "YYYYMMDD").format("DD/MM/YYYY")
              : null,
            TotalLoanAmountRepaid: ttpayamtt,
            // NoOfTimesLoanTakenInThePolicy:val?.data?.responseBody?.listDetails.length,
          });
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
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const LoanEnquiry = () => {
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
        policyNo: policyDetails?.policyDetailsObj?.identifiers?.policyNo
          ? policyDetails?.policyDetailsObj?.identifiers?.policyNo
          : POSContactData?.policyNo,
      },
    };
    setIsLoanChecking(false);
    let response = apiCalls.LoanEnquiry(obj);
    response
      .then((val) => {
        if (val?.data) {
          if (val?.data?.responseBody?.errorCode === "1") {
            form.setFieldsValue({
              LoanApplicable: "No",
            });
            setIsLoanChecking(true);

            setAlertTitle(`${val?.data?.responseBody?.errormessage}`);

            setShowAlert(true);

            return;
          }

          setLoanEnquiryData(val?.data?.responseBody.loanEnquiryDetails);
          const res = val?.data?.responseBody?.loanEnquiryDetails;
          const exitLoanData = val?.data?.responseBody?.existingLoanDetails;
          const totalPrincipal =
            val?.data?.responseBody?.existingLoanDetails?.reduce(
              (acc, loan) => acc + parseFloat(loan.hprincipal),
              0
            );
          const TotalLoanInterest =
            val?.data.responseBody.existingLoanDetails.reduce(
              (acc, loan) =>
                acc + (parseFloat(loan.hacrint) + parseFloat(loan.hpndint)),
              0
            );
          // const TotalLoanInterest = parseFloat(res?.hpleint);
          //const TotalLoanInterest = parseFloat(val?.data.responseBody.existingLoanDetails[0]?.hpltot);
          //setIsLoansAvailable(totalPrincipal);
          setIsLoansAvailable(res?.loanallow > 0 ? false : true);
          setMaxLoanElg(res?.loanallow);
          form.setFieldsValue({
            PolicyBondSubmitted: "",
            MaxLoanEligible: res?.loanallow,
            NoOfTimesLoanTakenInThePolicy: res?.numloans,
            LoanApplicable: Number(res?.loanallow) > 0 ? "Yes" : "No",
            LoanPercent: res?.intanny,
            MaxLoanvalue: res?.loanallow
              ? Number(res?.loanallow).toLocaleString("en-IN")
              : "",
            LoanValueDate: moment(new Date(), "YYYYMMDD").format("DD/MM/YYYY"),
          });

          form.setFieldsValue({
            ReceiptedBy: posScreenLoanRepayObj?.ReceiptedBy,
            ReceiptedBranch: posScreenLoanRepayObj?.ReceiptedBranch,
            RepaymentAmount: posScreenLoanRepayObj?.RepaymentAmount,
            DateOfRepayment: posScreenLoanRepayObj?.DateOfRepayment
              ? convertDate2(posScreenLoanRepayObj?.DateOfRepayment)
              : "",
            ModeOfRepayment: posScreenLoanRepayObj?.ModeOfRepayment,
            SplitPaymentDetails: posScreenLoanRepayObj?.SplitPaymentDetails,
            UTRChequeNumber: posScreenLoanRepayObj?.UTRChequeNumber || "NA",
            ReceiptNumber: posScreenLoanRepayObj?.ReceiptNumber,
            RepaymentType: posScreenLoanRepayObj?.RepaymentType,
            outstandingLoan:
              val?.data?.responseBody?.existingLoanDetails[0]?.hpltot,
            PaymentStatus: posScreenLoanRepayObj?.PaymentStatus,
            ValidateSignature: posScreenLoanRepayObj?.ValidateSignature,
            ReasonForDelay: posScreenLoanRepayObj?.ReasonForDelay,
            CustomerSigningDate: convertDate2(
              posScreenLoanRepayObj?.CustomerSigningDate
            ),
            BranchReceivedDate: convertDate2(
              posScreenLoanRepayObj?.BranchReceivedDate
            ),
          });

          setIsLoanChecking(Number(res?.loanallow) > 0 ? false : true);

          if (Number(res?.loanallow) > 0) {
            Data[selectedSubType]?.Eligible_Loan_Details?.forEach(
              (item, index) => {
                if (item?.name?.includes("MaxLoanvalue")) {
                  item.disabled = true;
                  item.required = false;
                }
                if (!item?.name?.includes("LoanApplicable")) {
                  item.hide = false;
                }
              }
            );
          }
          if (+res?.numloans > 0 && !shareProcessCheck) {
            GetAssigneeEnquiry();
            form.setFieldsValue({
              /*changes done by Moxa on 14-05-2025 for loan enquiry mismatch*/
              LoanDisbursed: exitLoanData[0]?.loanstdate
                ? moment(exitLoanData[0]?.loanstdate, "YYYYMMDD").format(
                    "DD/MM/YYYY"
                  )
                : null,
              LoanInterest: res?.intanny,
              // OriginalLoanAmount:totalPrincipal,
              // OriginalLoanAmount:exitLoanData?.hprincipal,
              OriginalLoanAmount: exitLoanData[0]?.hprincipal,
              //OutstandingPrincipalAmount: exitLoanData?.hpleamt,
              OutstandingPrincipalAmount: res?.hpleamt,
              //TotalLoanInterest:TotalLoanInterest,
              TotalLoanInterest: res?.hpleint,
              LoanOutstanding: res?.hpletot,
              //  LoanOutstanding:val?.data.responseBody.existingLoanDetails[0]?.hpltot,
            });
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
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const ExistingLoanDetails = async () => {
    setIsLoading(true);
    await LoanEnquiry();
    await LoanStatement(
      loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID
    );
    //await GetAssigneeEnquiry();
    setIsLoading(false);
  };

  const handleTitleCheckBox = (e, item) => {
    setCheckedValue(item.name);
    if (item.name === "ExistingLoanDetails") {
      setShowEmailFields(false);

      ExistingLoanDetails();
      // form.setFieldsValue({
      //   LoanDisbursed:moment(loanEnquiryData?.effdate, "YYYYMMDD").format("DD/MM/YYYY"),
      //   LoanInterest:loanEnquiryData?.intanny,
      //   OriginalLoanAmount:loanEnquiryData?.hprincipal,
      //   TotalLoanInterest:Number(loanEnquiryData?.hacrint) + Number(loanEnquiryData?.hpndint),
      //   TotalLoanAmountRepaid:ttpayamt,
      //   LoanOutstanding:loanEnquiryData?.hpleamt,
      //    LastLoanRepaidDate:moment(mostRecentDt?.zldate, "YYYYMMDD").format("DD/MM/YYYY"),
      //   PolicyAssignedTo:AssigneeEnquiryData?.assigneeName,
      //   PolicyBondSubmitted:''
      // })
    } else if (item.name === "EligibleLoanDetails") {
      setShowEmailFields(false);
      LoanStatement();
      LoanEnquiry();
      getClientEnquiry();
      // surrenderEnquiryData();
      // form.setFieldsValue({
      //   LoanApplicable: Number(loanEnquiryData?.loanallow) > 0 ? 'Yes': 'No',
      //   SurrenderValue:totalSurrenderAmount,
      //   MaxLoanvalue:loanEnquiryData?.loanallow,
      //   LoanValueDate:moment(new Date(), "YYYYMMDD").format("DD/MM/YYYY"),
      //   LoanValueRequested:'',
      //   NoOfTimesLoanTakenInThePolicy:takenLoans
      // })
    } else if (item?.name === "shareprocess") {
      getClientEnquiry();
      setShareProcessCheck(e.target.checked);
      setChecked(true);
      LoanEnquiry();
    }

    const newValue = checked ? false : true;
    setChecked(newValue);
    handleCheckboxChange(item, newValue);
  };
  const handleLabelLink = (item) => {
    if (item.label === "Initiate Penny Drop") {
      InitiatePennyDropp();
    }
    if (
      item.name === "InitiatePennyDropPOS" &&
      formFeilds?.InitiatePennyDrop === "Invalid Input"
    ) {
      InitiatePennyDropp();
    }
  };

  const handleDropdownChange = (e, item) => {
    const value = e;
    if (value === "cash") {
      Data[selectedSubType]?.BOE_Details?.forEach((item) => {
        if (item.name === "UploadChequeCopy") {
          item.hide = true; // Hide UploadChequeCopy
        }
        if (item.name === "UTRChequeNumber") {
          item.hide = true; // Hide UTRChequeNumber
        }
        if (item.name === "SplitPaymentDetails") {
          item.hide = true; // Show UploadChequeCopy
        }
      });
      setReRenderComponent(!ReRenderComponent);
    } else if (value === "neft") {
      Data[selectedSubType]?.BOE_Details?.forEach((item) => {
        if (item.name === "UploadChequeCopy") {
          item.hide = true; // Hide UploadChequeCopy
        }
        if (item.name === "UTRChequeNumber") {
          item.hide = false; // Show UTRChequeNumber
        }
            if (item.name === "SplitPaymentDetails") {
          item.hide = true; // Show UploadChequeCopy
        }
      });
      setReRenderComponent(!ReRenderComponent);
    } else if (value === "cheque") {
      Data[selectedSubType]?.BOE_Details?.forEach((item) => {
        if (item.name === "UploadChequeCopy") {
          item.hide = false; // Show UploadChequeCopy
        }
        if (item.name === "UTRChequeNumber") {
          item.hide = false; // Hide UTRChequeNumber
        }
         if (item.name === "SplitPaymentDetails") {
          item.hide = true; // Show UploadChequeCopy
        }
      });
      setReRenderComponent(!ReRenderComponent);
    }
    else if (value === "split") {
      Data[selectedSubType]?.BOE_Details?.forEach((item) => {
        if (item.name === "SplitPaymentDetails") {
          item.hide = false; // Show UploadChequeCopy
        }
      });
      setReRenderComponent(!ReRenderComponent);
    }

    if (value === "complete") {
      Data[selectedSubType]?.BOE_Details?.forEach((item, index) => {
        if (item.name === "UploadRequestForm") {
          item.hide = false;
        }
      });
      setReRenderComponent(!ReRenderComponent);
    } else if (value === "partialrepayment") {
      Data[selectedSubType]?.BOE_Details?.forEach((item, index) => {
        if (item.name === "UploadRequestForm") {
          item.hide = true;
        }
      });
      setReRenderComponent(!ReRenderComponent);
    }
  };

  const handleCheckboxChange = (item, newValue) => {
    setExistingLoanCheck(false);
    setEligibleLoanCheck(false);
    setShareProcessCheck(false);
    // Your logic to handle checkbox change goes here
    // For example, you can update the state based on the item and newValue
    // Update existingLoanCheck, eligibleLoanCheck, shareProcessCheck accordingly
    if (item.label?.includes("View Existing loan Details")) {
      setExistingLoanCheck(true);
      setChecked(true);
    } else if (item.label?.includes("View Eligible Loan Details")) {
      setEligibleLoanCheck(true);
      setChecked(true);
    } else if (item.label?.includes("Share Statement / Link")) {
      setShareProcessCheck(true);
      setChecked(true);
    }
  };

  // Function to check if all required radio buttons have values
  const allFieldsSelected = () => {
    const requiredFields = [
      "CompleteRepayment",
      "PolicyBondwithFGI",
      "ReAssignmentDone",
    ]; // Add required fields here
    return requiredFields.every(
      (field) => radioValuesToEnable[field] !== undefined
    );
  };

  const handleRadioChange = (e, item) => {
    if (selectedSubType === "loanrepayment") {
      setRadioValuesToEnable((prevState) => ({
        ...prevState,
        [item.name]: e.target.value,
      }));
    }

    setShowRaiseRequirementBtn(false);
    //  if((item?.label?.includes("Validate Signature")||item?.label?.includes("Signature Validated"))&&e.target.value==="no"){
    //   setShowRaiseRequirementBtn(true);
    //  }
    if (e.target.value === "no" && item.name === "ValidateSignature") {
      // setShowRaiseRequirementBtn(true);
      setVaildateSignature(true);
    } else if (item.name === "ValidateSignature") {
      setVaildateSignature(false);
    }

    if (e.target.value === "no" && item.name === "FundTransfer") {
      Data[selectedSubType]?.BOE_Details?.forEach((item, index) => {
        if (item.d_FundTransfer) {
          item.hide = true;
        }
      });
      setReRenderComponent(!ReRenderComponent);
    } else if (item.name === "FundTransfer" && e.target.value === "yes") {
      Data[selectedSubType]?.BOE_Details?.forEach((item, index) => {
        if (item.d_FundTransfer) {
          item.hide = false;
        }
      });
      form.setFieldsValue({
        ReasonForFundTransfer: "Renewal Payment",
      });
      setReRenderComponent(!ReRenderComponent);
    }
  };
  const toggleInputField = (field, item, index) => {
    setActivecommuType(item?.name);
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
  const popupClose = () => {
    setRaiseRequirementOpen(false);
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
    }

    if (
      item.name === "surrenderForm" ||
      item.name === "policyBond" ||
      item.name === "policyOwnerIDProof" ||
      item.name === "policyOwneraddressProof" ||
      item.name === "policyOwnerAccProof" ||
      item.name === "pancard"
    ) {
          const gConfig= apiCalls.getGenericConfig()
          if(gConfig?.data?.dmsApiUrl){
      const url =
        gConfig?.data?.dmsApiUrl+
        `/omnidocs/WebApiRequestRedirection?Application=BPMPOLENQ&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${policyDetails?.policyDetailsObj?.identifiers?.applicationNo}`;

      window.open(url, "_blank");
          }
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
    }
    if (
      item.name === "surrenderForm" ||
      item.name === "policyBond" ||
      item.name === "policyOwnerIDProof" ||
      item.name === "policyOwneraddressProof" ||
      item.name === "policyOwnerAccProof" ||
      item.name === "pancard"
    ) {
          const gConfig= apiCalls.getGenericConfig()
          if(gConfig?.data?.dmsApiUrl){
      const url =
        gConfig?.data?.dmsApiUrl +
        `/omnidocs/WebApiRequestRedirection?Application=BPMPOLENQ&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${policyDetails?.policyDetailsObj?.identifiers?.applicationNo}`;

      window.open(url, "_blank");
          }
    }
  };
  // const handleTitleCheckBox = (e, item) => {
  //   setExistingLoanCheck(false);
  //   setEligibleLoanCheck(false);
  //   setShareProcessCheck(false);
  //   if (item?.label?.includes("View Existing loan Details")) {
  //     setExistingLoanCheck(e.target.checked);
  //   } else if (item?.label?.includes("View Eligible Loan Details")) {
  //     setEligibleLoanCheck(e.target.checked);
  //   } else if (item?.label?.includes("Share Process Communication")) {
  //     setShareProcessCheck(e.target.checked);
  //   }
  // };

  const handleProposerCollapse = (e, label) => {
    if (label?.toLowerCase().includes("documents")) {
      if (e?.length > 0) {
        setCollapsePOSDocuments(true);
      } else {
        setCollapsePOSDocuments(false);
      }
    } else if (label?.toLowerCase().includes("bankdetails")) {
      if (e?.length > 0) {
        setCollapsePOSBankDetails(true);
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
  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day"); // Can not select days before today and today
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
    setShowReasonDelayField(false);
    if (item === "BranchReceivedDate") {
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
        form.setFieldsValue({ BranchReceivedDate: "" });
        return;
      } else {
        Data[selectedSubType]?.BOE_Details?.forEach((element) => {
          if (
            element?.label?.includes("Reason For Delayed Submission") &&
            selectDate < todayDate
          ) {
            element.hide = false;
            setShowReasonDelayField(true);
          } else if (
            element?.label?.includes("Reason For Delayed Submission") &&
            selectDate >= todayDate
          ) {
            element.hide = true;
            setShowReasonDelayField(false);
          }
        });
      }
      setUpdateState(!UpdateState);
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

  const handleEdit = (val) => {
    if (val === "edit") {
      Data[selectedSubType]?.POS_Details?.forEach((item, index) => {
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
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        posScreenObj[element.tagName] = element.tagValue;
      });
      form.setFieldsValue({
        NameAsMentionedInTheBank: posScreenObj?.NameAsMentionedInTheBank,
        BankIFSC: posScreenObj.BankIFSC,
        BankAccountNumber: posScreenObj.BankAccountNumber,
        BankName: posScreenObj.BankName,
        BranchName: posScreenObj?.BranchName,
        AccountType: posScreenObj?.AccountType,
        // PennydropResult:posScreenObj.PennydropResult,
        NameReceivedinPennyDrop: posScreenObj.NameReceivedinPennyDrop,
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
  const handleLinkValue = (item) => {
    setIsMultipleFiles([]);
    if (item?.label?.includes("Upload ID Proof")) {
      setIdProofModal(true);
    } else if (item?.label?.includes("Upload Address Proof")) {
      setAddressProofModal(true);
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
  };

  useEffect(() => {
    if (selectedSubType === "existingloandetailsenquiry") {
      setExistingLoanCheck(true);
      setEligibleLoanCheck(false);
      setShareProcessCheck(false);

      setShowEmailFields(false);
      setChecked(true);
      ExistingLoanDetails();
    }
    if (selectedSubType === "eligibleloandetailsenquiry") {
      setExistingLoanCheck(false);
      setEligibleLoanCheck(true);
      setShareProcessCheck(false);

      setShowEmailFields(false);
      LoanStatement();
      LoanEnquiry();
      setChecked(true);
      getClientEnquiry();
    }
    if (selectedSubType === "sharestatementlink") {
      setExistingLoanCheck(false);
      setEligibleLoanCheck(false);
      setShareProcessCheck(true);

      getClientEnquiry();
      setChecked(true);
      LoanEnquiry();
    }
  }, [selectedSubType]);

  return (
    <>
      <Spin spinning={isLoading}>
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
          onFinish={customerData?.isInternalFlow ? "" : handleSubmit}
          autoComplete="off"
        >
          {customerData?.isInternalFlow ? (
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
              />
            </>
          ) : (
            <>
              {selectedSubType !== "loanrepayment" && (
                <>
                  <DetailsForm
                    onBlurInput={onBlurInput}
                    data={
                      isShowPOSScreen
                        ? Data[selectedSubType]?.POS_Details
                        : isPOSManageScreen
                        ? Data[selectedSubType]?.POS_Manger_Details
                        : Data[selectedSubType]?.BOE_Details
                    }
                    subType={selectedSubType}
                    handleTitleCheckBox={handleTitleCheckBox}
                    requestModeLU={requestModeLU}
                    handleEdit={handleEdit}
                    existingLoanCheck={existingLoanCheck}
                    eligibleLoanCheck={eligibleLoanCheck}
                    shareProcessCheck={shareProcessCheck}
                    handleTextLink={handleTextLink}
                    handleRadioLink={handleRadioLink}
                    checked={checked}
                    suffix={suffix}
                    handleLabelLink={handleLabelLink}
                    handleRadioChange={handleRadioChange}
                    handleDropdownChange={handleDropdownChange}
                    handleInputChange={handleInputChange}
                    getUploadFiles={getUploadFiles}
                    bankAccTypeLU={bankAccTypeLU}
                  ></DetailsForm>
                </>
              )}
              {existingLoanCheck && (
                <>
                  <DetailsForm
                    data={Data[selectedSubType]?.Existing_Loan_Details}
                    subType={selectedSubType}
                    requestModeLU={requestModeLU}
                    handleDropdownChange={handleDropdownChange}
                    handleTextLink={handleTextLink}
                  ></DetailsForm>
                </>
              )}
              {eligibleLoanCheck && (
                <>
                  <DetailsForm
                    data={Data[selectedSubType]?.Eligible_Loan_Details}
                    onBlurInput={onBlurInput}
                    requestModeLU={requestModeLU}
                    handleDropdownChange={handleDropdownChange}
                    subType={selectedSubType}
                  ></DetailsForm>
                  {!isLoanChecking && (
                    <>
                      <DetailsForm
                        data={Data[selectedSubType]?.Share_Loan_Process_Details}
                        subType={selectedSubType}
                        toggleInputField={toggleInputField}
                        activeEmailIcons={activeEmailIcons}
                        activeMobileIcons={activeMobileIcons}
                        activeWhatsAppIcons={activeWhatsAppIcons}
                      ></DetailsForm>
                    </>
                  )}
                </>
              )}
              {shareProcessCheck && (
                <>
                  {isLoansAvailable > 0 && (
                    <>
                      <DetailsForm
                        data={Data[selectedSubType]?.Share_Process_Details}
                        subType={selectedSubType}
                        toggleInputField={toggleInputField}
                        activeEmailIcons={activeEmailIcons}
                        requestModeLU={requestModeLU}
                        handleDropdownChange={handleDropdownChange}
                        activeMobileIcons={activeMobileIcons}
                        activeWhatsAppIcons={activeWhatsAppIcons}
                      ></DetailsForm>
                    </>
                  )}

                  {/* {isLoansAvailable<=0&&<>
              <DetailsForm
                data={Data[selectedSubType]?.Share_Loan_Process_Details}
                subType={selectedSubType}
                toggleInputField={toggleInputField}
                activeEmailIcons={activeEmailIcons}
                activeMobileIcons={activeMobileIcons}
                activeWhatsAppIcons={activeWhatsAppIcons}
              ></DetailsForm>
            </>} */}
                </>
              )}
              {showEmailFields && (
                <>
                  <ContactForm
                    showEmailAddress={showEmailAddress}
                    showPhoneNumber={showPhoneNumber}
                    showWhatsApp={showWhatsApp}
                  />
                </>
              )}
              {selectedSubType === "loanrequest" && (
                <>
                  <DetailsForm
                    data={
                      isShowPOSScreen
                        ? Data[selectedSubType]?.POS_Documents_title
                        : isPOSManageScreen
                        ? Data[selectedSubType]?.POS_Manger_Documents_title
                        : Data[selectedSubType]?.View_Documents_title
                    }
                    handleProposerCollapse={handleProposerCollapse}
                    isShowDefaulttAccordian={"true"}
                  ></DetailsForm>
                  {collapsePOSDocuments && (
                    <>
                      <DetailsForm
                        data={
                          isShowPOSScreen
                            ? Data[selectedSubType]?.POS_View_Documents
                            : isPOSManageScreen
                            ? Data[selectedSubType]?.POS_Manger_View_Documents
                            : Data[selectedSubType]?.View_Documents
                        }
                        subType={selectedSubType}
                        handleProposerCollapse={handleProposerCollapse}
                        handleDateChange={handleDateChange}
                        handleRadioChange={handleRadioChange}
                        handleTextLink={handleTextLink}
                        suffix={!isShowPOSScreen && suffix}
                        form={form}
                        onBlurInput={onBlurInput}
                        getUploadFiles={getUploadFiles}
                        disabledDate={disabledDate}
                        handleLinkValue={handleLinkValue}
                      ></DetailsForm>
                      {showReasonDelayField && (
                        <>
                          {/* {!isShowPOSScreen&& <DetailsForm
                      data={Data[selectedSubType]?.ReasonSubmission}
                      subType={selectedSubType}
                      onBlurInput = {onBlurInput}
                    ></DetailsForm>} */}
                        </>
                      )}
                    </>
                  )}
                  <DetailsForm
                    data={
                      isPOSManageScreen
                        ? Data[selectedSubType]?.View_BankDetails_title
                        : Data[selectedSubType]?.View_BankDetails_title
                    }
                    handleProposerCollapse={handleProposerCollapse}
                  ></DetailsForm>
                  {collapsePOSBankDetails && (
                    <>
                      <DetailsForm
                        data={
                          isShowPOSScreen
                            ? Data[selectedSubType]?.POS_View_Bank_Details
                            : isPOSManageScreen
                            ? Data[selectedSubType]
                                ?.POS_Manger_View_Bank_Details
                            : Data[selectedSubType]?.View_Bank_Details
                        }
                        suffix={!isShowPOSScreen && suffix}
                        handleRadioChange={handleRadioChange}
                        subType={selectedSubType}
                        handleProposerCollapse={handleProposerCollapse}
                        form={form}
                        onBlurInput={onBlurInput}
                        handleLabelLink={handleLabelLink}
                        getUploadFiles={getUploadFiles}
                        bankAccTypeLU={bankAccTypeLU}
                      ></DetailsForm>
                    </>
                  )}
                  {(isShowPOSScreen || isPOSManageScreen) && (
                    <>
                      <DetailsForm
                        data={
                          isPOSManageScreen
                            ? Data[selectedSubType]?.POS_Manger_POS_Action_title
                            : Data[selectedSubType]?.View_POS_Action_title
                        }
                        handleProposerCollapse={handleProposerCollapse}
                      ></DetailsForm>
                      {collapsePOSAction && (
                        <>
                          <DetailsForm
                            data={
                              isPOSManageScreen
                                ? Data[selectedSubType]?.POS_Manger_Action
                                : Data[selectedSubType]?.POS_Action
                            }
                            subType={selectedSubType}
                            handleTitleCheckBox={handleTitleCheckBox}
                            handleDropdownChange={handleDropdownChange}
                            toggleInputField={toggleInputField}
                            activeEmailIcons={activeEmailIcons}
                            activeMobileIcons={activeMobileIcons}
                            activeWhatsAppIcons={activeWhatsAppIcons}
                            handleProposerCollapse={handleProposerCollapse}
                            handleTextLink={handleTextLink}
                            handleLabelLink={handleLabelLink}
                            handleRadioChange={handleRadioChange}
                            handleRadioLink={handleRadioLink}
                          ></DetailsForm>
                        </>
                      )}
                    </>
                  )}
                </>
              )}

              {selectedSubType !== "loanrepayment" && (
                <>
                  <div className="contact-details-btn">
                    {/* {(checked || selectedSubType==="loanrequest")&&<>
            <Button type="primary" className="primary-btn" htmlType="submit">
              {isShowPOSScreen?"Approve":"Submit"}
            </Button>{" "}
           
            </>}
            {showRaiseRequirementBtn&&
             <Button type="primary" className="primary-btn">
             Raise Requirement
           </Button>} */}

                    {((selectedSubType === "loanrequest" &&
                      !shareProcessCheck &&
                      !isLoansAvailable) ||
                      (checked &&
                        (selectedSubType === "existingloandetailsenquiry" ||
                          selectedSubType === "eligibleloandetailsenquiry" ||
                          selectedSubType === "sharestatementlink")) ||
                      isShowPOSScreen ||
                      isPOSManageScreen ||
                      selectedSubType === "statusenquiry") && (
                      <>
                        <Button
                          type="primary"
                          className="primary-btn"
                          htmlType="submit"
                          //disabled={vaildateSignature}
                          onClick={() => setClickedButton("POSApprove")}
                        >
                          {!isShowPOSScreen && !isPOSManageScreen
                            ? "Submit"
                            : "Approve"}
                        </Button>
                      </>
                    )}
                    {(isShowPOSScreen || isPOSManageScreen) && (
                      <Button
                        type="primary"
                        value="RaiseRequirement"
                        htmlType="submit"
                        onClick={() => setClickedButton("RaiseRequirement")}
                        className="primary-btn"
                      >
                        Raise Requirement
                      </Button>
                    )}
                    {(isShowPOSScreen || isPOSManageScreen) && (
                      <Button
                        type="primary"
                        value="RaiseRequirement"
                        onClick={() => getInternal()}
                        className="primary-btn"
                      >
                        Internal Requirement
                      </Button>
                    )}
                    {!isShowPOSScreen &&
                      !isPOSManageScreen &&
                      selectedSubType !== "loanamountenquiry" && (
                        <Button
                          type="primary"
                          className="primary-btn"
                          onClick={() => setClickedButton("RaiseRequirement")}
                        >
                          Raise Requirement
                        </Button>
                      )}

                    {/* {selectedSubType==="loanrequest"&&isShowPOSScreen&&
            <Button type="primary" className="primary-btn">
            Pass JV
          </Button>
            } */}
                  </div>
                </>
              )}
              {selectedSubType === "loanrepayment" && (
                <>
                  <DetailsForm
                    data={
                      isShowPOSScreen
                        ? Data[selectedSubType]?.POS_Details
                        : Data[selectedSubType]?.BOE_Details
                    }
                    subType={selectedSubType}
                    handleTitleCheckBox={handleTitleCheckBox}
                    handleDropdownChange={handleDropdownChange}
                    toggleInputField={toggleInputField}
                    requestModeLU={requestModeLU}
                    activeEmailIcons={activeEmailIcons}
                    activeMobileIcons={activeMobileIcons}
                    activeWhatsAppIcons={activeWhatsAppIcons}
                    handleProposerCollapse={handleProposerCollapse}
                    handleTextLink={handleTextLink}
                    handleLabelLink={handleLabelLink}
                    handleRadioChange={handleRadioChange}
                    handleInputChange={handleInputChange}
                    handleDateChange={handleDateChange}
                    disabledDate={disabledDate}
                    getUploadFiles={getUploadFiles}
                    onBlurInput={onBlurInput}
                    suffix={!isShowPOSScreen && suffix}
                    form={form}
                  ></DetailsForm>
                  <div className="contact-details-btn">
                    {/* <Button
              type="primary"
              className="primary-btn"
              htmlType="submit"
              onClick={() => setClickedButton("POSApprove")}
              //disabled={!allFieldsSelected()} // Disable until all required fields are selected
              disabled={vaildateSignature}
            >
             Approve
            </Button> */}
                    {!isShowPOSScreen && (
                      <>
                        <Button
                          type="primary"
                          value="Reassign"
                          className="primary-btn"
                          htmlType="submit"
                          // onClick={() => saveRequest()}
                          disabled={vaildateSignature}
                          // disabled={!allFieldsSelected()} // Disable until all required fields are selected
                        >
                          Submit
                        </Button>
                        <Button
                          type="primary"
                          value="Reassign"
                          className="primary-btn"
                          onClick={() => getRaiseRequirements()}
                          // disabled={!allFieldsSelected()} // Disable until all required fields are selected
                        >
                          Raise Requirement
                        </Button>
                      </>
                    )}

                    {isShowPOSScreen && (
                      <>
                        <Button
                          type="primary"
                          value="Reassign"
                          className="primary-btn"
                          htmlType="submit"
                          onClick={() => setClickedButton("POSApprove")}
                          // onClick={() => saveRequest()}
                          // disabled={vaildateSignature}
                          disabled={!allFieldsSelected()} // Disable until all required fields are selected
                        >
                          Approve
                        </Button>
                        <Button
                          type="primary"
                          value="Reassign"
                          className="primary-btn"
                          onClick={() => getRaiseRequirements()}
                          disabled={!allFieldsSelected()} // Disable until all required fields are selected
                        >
                          Raise Requirement
                        </Button>
                      </>
                    )}

                    {/* {(isShowPOSScreen || isPOSManageScreen) &&
                      <Button type="primary" value="RaiseRequirement" 
                        onClick={() =>getInternal() }
                        className="primary-btn"
                        disabled={!allFieldsSelected()} 
                        >
                Internal Requirement123
              </Button>     }   */}
                    {(isShowPOSScreen || isPOSManageScreen) &&
                      (!allFieldsSelected() ? (
                        <>
                          <Button
                            type="primary"
                            value="RaiseRequirement"
                            onClick={() => getInternal()}
                            className="primary-btn"
                            disabled={true}
                          >
                            Internal Requirement
                          </Button>
                        </>
                      ) : (
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
                      ))}
                  </div>
                </>
              )}
            </>
          )}
        </Form>
      </Spin>

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
                  onClick={()=>handleRequirementSubmit()}
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

      {/* <Modal
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
         <div className="table-container" style={{ marginTop: "0px" }}>
          <table className="responsive-table">
            <tr>
              <th>Policy Number</th>
              <th>Bank Account Details</th>
            </tr>
            {BankduDupeData?.map((item,index) => (
            <tr key={index}>
            <td>
              {item?.LA_PolicyNo}
            </td>
              <td>{item?.Acc_Number}</td>
            </tr>
          ))}
           {BankduDupeData?.length === 0  &&
               <tr>
                  <td colspan="2">
               
                <div className="text-center"><span>No data available</span></div> 
        </td>
        </tr>}
          </table>
        </div>
      </Modal> */}

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

export default connect(mapStateToProps)(LoanPolicy);
