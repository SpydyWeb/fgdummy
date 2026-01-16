import React, { useState, useEffect } from "react";
import { PaymentRelatedData } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import {
  Button,
  Form,
  Spin,
  Alert,
  Modal,
  Tooltip,
  Checkbox,
  message,
  Input,
  Row,
  Col,
} from "antd";
import apiCalls from "../../api/apiCalls";
import CloseIcon from "../../assets/images/close-icon.png";
import PopupAlert from "../popupAlert";
import moment from "moment";
import ContactForm from "../../utils/ContactForm";
import { useSelector } from "react-redux";
import UploadIcon from "../../assets/images/upload.png";
import dayjs from "dayjs";
import ExistUpdateCheckBoxList from "../../utils/ExistUpdateCheckBoxList";
import CheckBoxList from "../../utils/CheckBoxList";
import InternalFlow from "../InternalFlow/InternalFlow";
import InternalFlowPOS from "../InternalFlow/InternalFlowPOS";
import RaiseRequirementPopup from "../RaiseRequirementPopup";
import { billFreq } from "../../utils/constantLU";

const PaymentRelated = (props) => {
  const loginInfo = useSelector((state) => state);
  const [form] = Form.useForm();
  const [requirementsForm] = Form.useForm();
  const [internalReqForm] = Form.useForm();
  const {
    selectedSubType,
    customerData,
    details,
    POSContactData,
    selectedSubTypeId,
    selectedCallType,
    SelectedSubTypeVal,
    requestModeLU,
    clientEnquiryData,
    isEmailManagement,
    loggedUser,
    mandStatusLU,
  } = props;
  const [isShowPOSScreen, setIsShowPOSScreen] = useState(false); //pos screen showing purpose
  const [isShowTransferFields, setIsShowTransferFields] = useState(false);
  const [showEmailFields, setShowEmailFields] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [paymentDetailsOpen, setPaymentDetailsOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [alertData, setAlertData] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmailAddress, setShowEmailAddress] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [activeEmailIcons, setActiveEmailIcons] = useState([]);
  const [activeMobileIcons, setActiveMobileIcons] = useState([]);
  const [activeWhatsAppIcons, setActiveWhatsAppIcons] = useState([]);
  const [selectCheckBox, setSelectCheckBox] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [isPaymentMethodSelection, setIsPaymentMethodSelection] = useState("");
  const [isShowRequestFormFields, setIsShowRequestFormFields] = useState(false);
  const [showRaiseRequirementBtn, setShowRaiseRequirementBtn] = useState(false);
  const [showResonDelayField, setShowReasonDelayField] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [counter, setCounter] = useState(0);
  const [otpValue, setOtpValue] = useState(null);
  const [sendOTPErrorMsg, setSendOTPErrorMsg] = useState(null);
  const [sendOTPLoader, setSendOTPLoader] = useState(false);
  const [validateOTPSuccess, setValidateOTPSuccess] = useState(false);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [validateBtnDisable, setValidateBtnDisable] = useState(false);
  const [sendOTPTo, setSendOTPTo] = useState(null);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
  const [serviceRequestId, setServiceRequestId] = useState(null);
  const [paymentMethodList, setPaymentMethodList] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(null);
  const [isUpdateModeLU, setIsUpdateModeLU] = useState([]);
  const [monthsDifference, setMonthsDifference] = useState(null);
  const [CNFBankAccNo, setCNFBankAccNo] = useState("");
  const [BankAccNo, setBankAccNo] = useState("");
  const [Frequency, setFrequency] = useState("");
  const [existModeAllowable, setExistModeAllowable] = useState({});
  const [existingModeChangeData, setExistingModeChangeData] = useState({});
  const [disableOTP, setDisableOTP] = useState(true);
  const [updateFields, setUpdateFields] = useState(false);
  const [isDisableOTPInput, setIsDisableOTPInput] = useState(false);
  const [disableRequestForm, setDisableRequestForm] = useState(false);
  const [isCounterEnable, setIsCounterEnable] = useState(false);
  const [eCGRequestField, setECGRequestField] = useState("");
  const [isProcessLink, setIsProcessLink] = useState("");
  const [isDocLink, setIsDocLink] = useState("");
  const [rerenderComponent, setRerenderComponent] = useState(false);
  const [PaymentMethod, setPaymentMethod] = useState("");
  const [msgModal, setMsgModal] = useState(false);
  const [isChequeNumber, setIsChequeNumber] = useState(null);
  const [isShowChequeNoFields, setIsShowChequeNoFields] = useState(false);
  const [latestPayment, setLatestPayment] = useState("");
  const [isDisableNewMobileNo, setIsDisableNewMobileNo] = useState(false);
  const [disableApproveBtn, setDisableApproveBtn] = useState(true);
  const [mandRefNo, setMandRefNo] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [mandateDetailsData, setMandateDetailsData] = useState([]);
  const [InternaRequirements, setInternalFlowRequirements] = useState("");
  const [isPreferredDebit, setIsPreferredDebit] = useState("");
  const [isMaxDebitAmount, setIsMaxDebitAmount] = useState("");
  const [isShowRequestDetails, setIsShowRequestDetails] = useState(false);
  const [isMandateSelection, setIsMandateSelection] = useState({});
  const [isPOSMandateData, setIsPOSMandateData] = useState([]);
  const [isExpired, setIsExpired] = useState(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [emsrequestchannel, setEmsrequestchannel] = useState();

  const handleACCCheckboxChange = (index, item) => {
    setSelectedCheckbox(index);
    setIsMandateSelection(item);
    getTransacions();
  };

  PaymentRelatedData[selectedSubType]?.PA_Details?.forEach((element) => {
    if (element?.name === "ReceiptNo" && element?.value?.length === 8) {
      setDisableApproveBtn(false);
    }
  });

  if (isExpired) {
    PaymentRelatedData[selectedSubType]?.CheckNumber_Fields?.forEach(
      (element) => {
        if (
          element?.name === "ChequeRepresentationRequestDate" ||
          element?.name === "ReasonFor_Representation" ||
          element?.name === "requestchannel" ||
          element?.name === "customerchoice"
        )
          element.disabled = true;
      }
    );
    PaymentRelatedData[selectedSubType]?.Comments?.forEach((element) => {
      if (element?.name === "Comments") element.disabled = true;
    });
  }

  const suffix = <img src={UploadIcon} alt="" />;
  const posRepresentcheque = {};
  const posNewmandateregistration = {
    PaymentMethod: "",
    NACHStatus: "",
    RegisteredOn: "",
    BankName: "",
    BankAccountNumber: "",
    BankIFSC: "",
    PreferredDebitDate: "",
    MaxDebitAmounat: "",
    NACHValidTill: "",
    LastThreeDebitDate: "",
    LastThreeDebitStatus: "",
    CardType: "",
    CardNumber: "",
    SIStatus: "",
  };
  const posAdditionDeletionObj = {
    custRole: POSContactData?.custRole,
    srvReqID: POSContactData?.srvReqID,
    Mode_New: "",
    ModalPremium: "",
    ImpactOnCurrentPremium: "",
    Comments: "",
    ValidateSignature: "",
  };
  const paMandateCancellationObj = {};

  useEffect(() => {
    counter > 0 &&
      isCounterEnable &&
      setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter, data]); // eslint-disable-next-line arrow-body-style

  useEffect(() => {
    if (isEmailManagement && PaymentRelatedData[selectedSubType]) {
      // Disable customer choice in Customer_Choice_Details
      PaymentRelatedData[selectedSubType]?.Customer_Choice_Details?.forEach(
        (element) => {
          if (element?.name === "customerchoice") {
            element.hide = true;
          }
          if (element?.name === "requestchannel") {
            form.setFieldsValue({ requestchannel: 4 });
            element.hide = true;
            setEmsrequestchannel(4);
          }
        }
      );
      PaymentRelatedData[selectedSubType]?.Update_ModeFreq_Details?.forEach(
        (element) => {
          if (element?.name === "requestchannel") {
            form.setFieldsValue({ requestchannel: 4 });
            element.hide = true;
            setEmsrequestchannel(4);
          }
        }
      );
      PaymentRelatedData[selectedSubType]?.BOE_Details?.forEach((element) => {
        if (element?.name === "requestchannel") {
          form.setFieldsValue({ requestchannel: 4 });
          element.disabled = true;
          setEmsrequestchannel(4);
        }
      });
      //   // Ensure Comments array exists
      //   if (!Array.isArray(PaymentRelatedData[selectedSubType]?.Send_ModeChange_Link)) {
      //     PaymentRelatedData[selectedSubType].Send_ModeChange_Link = [];
      // }

      // // Remove existing instances of "Additional Note For Customer" before adding a new one
      // PaymentRelatedData[selectedSubType].Send_ModeChange_Link = PaymentRelatedData[selectedSubType].Send_ModeChange_Link.filter(
      //     comment => comment.name !== "AdditionalNoteForCustomer"
      // );

      // // Add "Additional Note For Customer" once
      // PaymentRelatedData[selectedSubType].Send_ModeChange_Link.push(
      //   {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 1000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
      //   });
      // Ensure Comments array exists
      if (!Array.isArray(PaymentRelatedData[selectedSubType]?.Comments)) {
        PaymentRelatedData[selectedSubType].Comments = [];
      }

      // Remove existing instances of "Additional Note For Customer" before adding a new one
      PaymentRelatedData[selectedSubType].Comments = PaymentRelatedData[
        selectedSubType
      ].Comments.filter(
        (comment) => comment.name !== "AdditionalNoteForCustomer"
      );

      // Add "Additional Note For Customer" once
      PaymentRelatedData[selectedSubType].Comments.push({
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
      if (
        !Array.isArray(
          PaymentRelatedData[selectedSubType]?.Send_ModeChange_Link
        )
      ) {
        PaymentRelatedData[selectedSubType].Send_ModeChange_Link = [];
      }

      // Remove existing instances of "Additional Note For Customer" before adding a new one
      PaymentRelatedData[selectedSubType].Send_ModeChange_Link =
        PaymentRelatedData[selectedSubType].Send_ModeChange_Link.filter(
          (comment) => comment.name !== "AdditionalNoteForCustomer"
        );

      // Add "Additional Note For Customer" once
      if (selectedSubType === "newmandateregistration") {
        PaymentRelatedData[selectedSubType].Send_ModeChange_Link.push({
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
      if (!Array.isArray(PaymentRelatedData[selectedSubType]?.BOE_Details)) {
        PaymentRelatedData[selectedSubType].BOE_Details = [];
      }

      // Remove existing instances of "Additional Note For Customer" before adding a new one
      PaymentRelatedData[selectedSubType].BOE_Details = PaymentRelatedData[
        selectedSubType
      ].BOE_Details.filter(
        (comment) => comment.name !== "AdditionalNoteForCustomer"
      );

      // Add "Additional Note For Customer" once
      if (selectedSubType === "paymentlink") {
        PaymentRelatedData[selectedSubType].BOE_Details.push({
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
      //  Ensure Comments array exists
      //            if (!Array.isArray(PaymentRelatedData[selectedSubType]?.BOE_Details)) {
      //             PaymentRelatedData[selectedSubType].BOE_Details = [];
      //         }

      //         // Remove existing instances of "Additional Note For Customer" before adding a new one
      //         PaymentRelatedData[selectedSubType].BOE_Details = PaymentRelatedData[selectedSubType].BOE_Details.filter(
      //             comment => comment.name !== "AdditionalNoteForCustomer"
      //         );

      //         // Add "Additional Note For Customer" once
      //         PaymentRelatedData[selectedSubType].BOE_Details.push({
      //             name: "AdditionalNoteForCustomer",
      //             label: "Additional Note For Customer",
      //             inputType: "complaintbox",
      //             maxlength: 1000,
      //             required: false,
      //             validationmsg: "Additional Note For Customer",
      //             placeholder: "Additional Note For Customer",
      //             width: "100%",
      //             rows: 4
      //         });
    }

    setIsPaymentMethodSelection("");
    setPaymentMethodList([]);
    setCheckedList([]);
    setIsShowChequeNoFields(false);
    setSelectedCheckbox(null);
    if (selectedSubType === "paymentlink") {
      selectedSubType === "paymentlink" && getData();
    } else if (selectedSubType === "changeinmodefrequency") {
      setShowAlert(false);
      setAlertData("");
      if (details?.policyDetailsObj?.planAndStatus?.policyStatus !== "IF" && details?.policyDetailsObj?.planAndStatus?.policyStatus !== "LA" &&
          details?.policyDetailsObj?.planAndStatus?.policyStatus !== "PU" &&
          details?.policyDetailsObj?.planAndStatus?.policyStatus !== "DI" ) {
        setAlertTitle(`${"Request cannot be logged for Mode Change."}`);
        setShowAlert(true);
        if (
          details?.policyDetailsObj?.planAndStatus?.policyStatus !== "LA" &&
          details?.policyDetailsObj?.planAndStatus?.policyStatus !== "PU" &&
          details?.policyDetailsObj?.planAndStatus?.policyStatus !== "DI" &&
          details?.policyDetailsObj?.planAndStatus?.policyStatus !== "AC"
        ) {
          return;
        }
        //return;
      }
      getAllowableModeChangeOptionFetch();
      getClientEnquiry();
      // getMandatetagEnquiry();
      setDisableRequestForm(false);
    } else if (
      [
        "mandatecancellation",
        "holdmandate",
        "restartmandate",
        "mandatedetails",
      ].includes(selectedSubType)
    ) {
      getMandatetagEnquiry();
    }
    getProcesLink();
  }, [selectedSubType]);

  useEffect(() => {
    if (
      POSContactData &&
      customerData?.isPOS &&
      selectedSubType === "newmandateregistration"
    ) {
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        posNewmandateregistration[element.tagName] = element.tagValue;
      });

      setIsShowPOSScreen(true);
      form.setFieldsValue({
        PaymentMethod: posNewmandateregistration.PaymentMethod,
        NACHStatus: posNewmandateregistration.NACHStatus,
        RegisteredOn: posNewmandateregistration.RegisteredOn,
        BankName: posNewmandateregistration.BankName,
        BankAccountNumber: posNewmandateregistration.BankAccountNumber,
        BankIFSC: posNewmandateregistration.BankIFSC,
        PreferredDebitDate: posNewmandateregistration.PreferredDebitDate,
        MaxDebitAmounat: posNewmandateregistration.MaxDebitAmounat,
        NACHValidTill: posNewmandateregistration.NACHValidTill,
        LastThreeDebitDate: posNewmandateregistration.LastThreeDebitDate,
        LastThreeDebitStatus: posNewmandateregistration.LastThreeDebitStatus,
        CardType: posNewmandateregistration.CardType,
        CardNumber: posNewmandateregistration.CardNumber,
        SIStatus: posNewmandateregistration.SIStatus,
      });

      if (posNewmandateregistration?.PaymentMethod === "NACH") {
        PaymentRelatedData[selectedSubType]?.POS_Details?.forEach((element) => {
          if (
            element?.name === "BankName" ||
            element?.name === "CardType" ||
            element?.name === "CardNumber" ||
            element?.name === "SIStatus"
          ) {
            element.hide = true;
            setUpdateFields(true);
          }
        });
      }
    } else if (
      POSContactData &&
      customerData?.isPOS &&
      (selectedSubType === "mandatecancellation" ||
        selectedSubType === "holdmandate" ||
        selectedSubType === "restartmandate")
    ) {
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        paMandateCancellationObj[element.tagName] = element.tagValue;
      });
      setIsShowPOSScreen(true);
      setUpdateFields(false);
      form.setFieldsValue({
        PaymentMethod: paMandateCancellationObj?.PaymentMethod,
        NACHStatus: paMandateCancellationObj?.NACHStatus,
        RegisteredOn: paMandateCancellationObj?.RegisteredOn,
        BankName: paMandateCancellationObj?.BankName,
        BankAccountNumber: paMandateCancellationObj?.BankAccountNumber,
        BankIFSC: paMandateCancellationObj?.BankIFSC,
        PreferredDebitDate: paMandateCancellationObj?.PreferredDebitDate,
        MaxDebitAmounat: paMandateCancellationObj?.MaxDebitAmounat,
        NACHValidTill: paMandateCancellationObj?.NACHValidTill,
        //LastThreeDebitDate:posNewmandateregistration.LastThreeDebitDate,
        //LastThreeDebitStatus:posNewmandateregistration.LastThreeDebitStatus,
        DueDate: paMandateCancellationObj?.DueDate,
        FilesenttoBankdate: paMandateCancellationObj?.FilesenttoBankdate,
        HoldPossibleForCurrentDue:
          paMandateCancellationObj?.HoldPossibleForCurrentDue,
        Reason: paMandateCancellationObj?.Reason,
        RequestorComments:
          paMandateCancellationObj?.RequestorComments === undefined
            ? paMandateCancellationObj?.Comments
            : paMandateCancellationObj?.RequestorComments,
        ValidateSignature: paMandateCancellationObj?.ValidateSignature,
        CustomerSigningDate: POSContactData?.custSignDateTime
          ? convertDate(POSContactData?.custSignDateTime)
          : POSContactData?.custSignDateTime,
        BranchReceivedDate: POSContactData?.requestDateTime
          ? convertDate(POSContactData?.requestDateTime)
          : POSContactData?.requestDateTime,
        ReasonForDelay: POSContactData?.reasonDelayed,
        requestchannel: POSContactData?.reqMode,
      });

      getMandatetagEnquiry();
      if (selectedSubType === "mandatecancellation") {
        const newData = POSContactData?.serviceRequestTransectionData?.filter(
          (item) =>
            item.status === "Create" &&
            [
              "MandateType",
              "PaymentMethod",
              "MandateStatus",
              "RegisteredOn",
              "BankName",
              "BankAccountNo",
              "PreferredDebitDay",
              "MaxDebitAmt",
              "NACHValidTill",
              "selectionMandRef",
            ].includes(item.tagName)
        );
        // Consolidate data into an object
        const consolidatedNewData = newData?.reduce((acc, item) => {
          acc[item?.tagName] = item?.tagValue;
          return acc;
        }, {});
        setIsPOSMandateData(consolidatedNewData);
        // Assuming setIsPOSMandateData takes an array
        // setIsPOSMandateData((prevData) => {
        //   return [...prevData, consolidatedNewData];
        // });
      }

      if (paMandateCancellationObj?.ValidatedBy === "requestform") {
        PaymentRelatedData[selectedSubType]?.POS_Details?.forEach((element) => {
          if (
            element?.label === "Request Form" ||
            element?.label?.includes("Customer Signing Date") ||
            element?.label?.includes("Request Received Date") ||
            element?.label === "Signature Validated"
          ) {
            element.hide = false;
            setUpdateFields(true);
          }
        });
      } else if (paMandateCancellationObj?.ValidatedBy === "otp") {
        PaymentRelatedData[selectedSubType]?.POS_Details?.forEach((element) => {
          if (
            element?.label === "Request Form" ||
            element?.label?.includes("Customer Signing Date") ||
            element?.label?.includes("Request Received Date") ||
            element?.label === "Signature Validated"
          ) {
            element.hide = true;
            setUpdateFields(true);
          }
        });
      }
      PaymentRelatedData[selectedSubType]?.POS_Details?.forEach((element) => {
        if (
          element?.label?.includes("Reason For Delayed Submission") &&
          POSContactData?.reasonDelayed
        ) {
          element.hide = false;
          setShowReasonDelayField(!showResonDelayField);
        } else {
          if (
            element?.label?.includes("Reason For Delayed Submission") &&
            !POSContactData?.reasonDelayed
          ) {
            element.hide = true;
            setShowReasonDelayField(!showResonDelayField);
          }
        }
      });
    }

    if (
      POSContactData &&
      customerData?.isPOS &&
      selectedSubType === "changeinmodefrequency"
    ) {
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        posAdditionDeletionObj[element.tagName] = element.tagValue;
      });
      setIsShowPOSScreen(true);
      form.setFieldsValue({
        custRole: posAdditionDeletionObj?.custRole,
        srvReqID: posAdditionDeletionObj?.srvReqRefNo,
        Mode_New: posAdditionDeletionObj?.Mode_New,
        ModalPremium: posAdditionDeletionObj?.ModalPremium,
        ImpactOnCurrentPremium: posAdditionDeletionObj?.ImpactOnCurrentPremium,
        Comments: posAdditionDeletionObj?.Comments,
        ValidateSignature: posAdditionDeletionObj?.ValidateSignature,
        CustomerSigningDate: POSContactData?.custSignDateTime
          ? convertDate(POSContactData?.custSignDateTime)
          : POSContactData?.custSignDateTime,
        BranchReceivedDate: POSContactData?.requestDateTime
          ? convertDate(POSContactData?.requestDateTime)
          : POSContactData?.requestDateTime,
        ReasonForDelay: POSContactData?.reasonDelayed,
        MandateRegistrationStatus: POSContactData?.currentStatus,
        RequestIDNumber: POSContactData?.srvReqRefNo,
        requestchannel: POSContactData?.reqMode,
        RequestorComments:
          posAdditionDeletionObj?.RequestorComments === undefined
            ? posAdditionDeletionObj?.Comments
            : posAdditionDeletionObj?.RequestorComments,
        RequestBy: posAdditionDeletionObj?.ValidatedBy,
      });
      if (posAdditionDeletionObj?.ValidatedBy === "otp") {
        PaymentRelatedData[selectedSubType]?.POS_Details?.forEach((element) => {
          if (
            element?.label === "Request Form" ||
            element?.label?.includes("Customer Signing Date") ||
            element?.label?.includes("Request Received Date")
          ) {
            element.hide = true;
            setUpdateFields(true);
          }
        });
      } else if (posAdditionDeletionObj?.ValidatedBy === "requestform") {
        PaymentRelatedData[selectedSubType]?.POS_Details?.forEach((element) => {
          if (
            element?.label === "Signature Validated" ||
            element?.name === "ReasonForDelay"
          ) {
            element.hide = false;
            setUpdateFields(true);
          }
        });
      }
    }

    if (POSContactData && posAdditionDeletionObj) {
      if (posAdditionDeletionObj.Mode_New === "Monthly") {
        PaymentRelatedData[selectedSubType]?.POS_Details?.forEach(
          (item, index) => {
            if (item?.name?.includes("MandateRegistrationStatus")) {
              item.hide = false;
            }
          }
        );
      }
    }
    if (
      POSContactData &&
      customerData?.isPOS &&
      selectedSubType === "representcheque"
    ) {
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        posRepresentcheque[element.tagName] = element.tagValue;
      });

      setIsShowPOSScreen(true);
      form.setFieldsValue({
        ReceiptType: posRepresentcheque?.ReceiptType,
        ChequeNumber: posRepresentcheque?.ChequeNumber,
        ReceiptNumber: posRepresentcheque?.ReceiptNumber,
        ChequeBounceReason: posRepresentcheque?.ChequeBounceReason,
        ChequeAmount: posRepresentcheque?.ChequeAmount,
        ChequeDate: posRepresentcheque?.ChequeDate,
        ChequeExpiryDate: posRepresentcheque?.ChequeExpiryDate,
        ChequeDrawnOnBankName: posRepresentcheque?.ChequeDrawnOnBankName,
        ChequeRepresentationRequestDate:
          posRepresentcheque?.ChequeRepresentationRequestDate
            ? convertDate(posRepresentcheque?.ChequeRepresentationRequestDate)
            : null,
        ReasonFor_Representation: posRepresentcheque?.ReasonFor_Representation,
        RequestorComments:
          posRepresentcheque?.RequestorComments === undefined
            ? posRepresentcheque?.Comments
            : posRepresentcheque?.RequestorComments,
        RequestBy: posRepresentcheque?.ValidatedBy,
        requestchannel: POSContactData?.reqMode,
        resonfordelay: POSContactData?.reasonDelayed,
      });
      PaymentRelatedData[selectedSubType]?.PA_Details?.forEach((element) => {
        if (
          element?.label?.includes("Reason For Delayed Submission") &&
          POSContactData?.reasonDelayed
        ) {
          element.hide = false;
          setShowReasonDelayField(true);
        } else {
          if (
            element?.label?.includes("Reason For Delayed Submission") &&
            !POSContactData?.reasonDelayed
          ) {
            element.hide = true;
            setShowReasonDelayField(true);
          }
        }
      });
    }
  }, []);

  useEffect(() => {
    setIsDisableNewMobileNo(false);
    if (
      selectedSubType === "mandatedetails" ||
      selectedSubType === "mandatecancellation" ||
      selectedSubType === "holdmandate" ||
      selectedSubType === "restartmandate"
    ) {
      getTransacions();
    }
    if (selectedSubType === "changeinmodefrequency") {
      const boeDetails =
        PaymentRelatedData[selectedSubType]?.Update_ModeFreq_Details;
      if (validateOTPSuccess) {
        if (boeDetails) {
          boeDetails?.forEach((element) => {
            if (
              element?.name === "Mode_New" ||
              element?.name === "requestchannel"
            ) {
              element.disabled = true;
            }
          });
        }
        setIsDisableNewMobileNo(true);
      } else {
        if (boeDetails) {
          boeDetails?.forEach((element) => {
            if (
              element?.name === "Mode_New" ||
              element?.name === "requestchannel"
            ) {
              element.disabled = false;
            }
          });
        }
        setIsDisableNewMobileNo(false);
      }
    }
  }, [validateOTPSuccess, selectedSubType]); // eslint-disable-next-line arrow-body-style

  useEffect(() => {
    if (
      (selectedSubType === "renewalstatusenquiry" ||
        selectedSubType === "renewalpaymentoptions") &&
      loginInfo?.userProfileInfo?.profileObj?.role === 14
    ) {
      form.setFieldsValue({ requestchannel: 13 });
      if (Array.isArray(PaymentRelatedData[selectedSubType]?.Comments)) {
        PaymentRelatedData[selectedSubType].Comments.forEach((item) => {
          if (item.name === "requestchannel") {
            item.disabled = true;
          }
        });
      }
    } else if (
      (selectedSubType === "renewalstatusenquiry" ||
        selectedSubType === "renewalpaymentoptions") &&
      loginInfo?.userProfileInfo?.profileObj?.role !== 14
    ) {
      // Unfreeze for other roles
      if (Array.isArray(PaymentRelatedData[selectedSubType]?.Comments)) {
        PaymentRelatedData[selectedSubType].Comments.forEach((item) => {
          if (item.name === "requestchannel") {
            item.disabled = false;
          }
        });
      }
    }
  }, [selectedSubType, loginInfo?.userProfileInfo?.profileObj?.role]);

  {
    /*Added policystatus condition by Sayali on 21-05-2025 for Mode_changes*/
  }

  const isSubmitDisabled = () => {
    if (selectedSubType === "paymentlink") {
      const modalPremium = form.getFieldValue("totalPremiumDue");
      return !modalPremium || parseFloat(modalPremium.replace(/,/g, "")) === 0;
    } else if (
      selectedSubType === "changeinmodefrequency" &&
      details?.policyDetailsObj?.planAndStatus?.policyStatus !== "LA" &&
      details?.policyDetailsObj?.planAndStatus?.policyStatus !== "PU" &&
      details?.policyDetailsObj?.planAndStatus?.policyStatus !== "DI" &&
      details?.policyDetailsObj?.planAndStatus?.policyStatus !== "AC"
    ) {
      const modalPremium = form.getFieldValue("ModalPremium");
      return !modalPremium || parseFloat(modalPremium.replace(/,/g, "")) === 0;
    }
  };

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

  const getClientEnquiry = () => {
    setIsLoading(true);
    setDisableOTP(true);
    setSendOTPTo(null);
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
          setSendOTPTo(res?.rmblphone);
          if (res?.rmblphone) {
            setDisableOTP(false);
          }
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

  const getTransacions = () => {
    setIsLoading(true);
    setShowAlert(false);
    setAlertData(null);
    let response = apiCalls.GetTransacions(customerData?.policyNo);
    response
      .then((val) => {
        if (val?.data?.ERRCODE == "1") {
          //         const sortedData = [...val?.data?.responseBody?.bankDetailsList];
          // sortedData.sort((a, b) => {
          //   return new Date(convertDate(b.effdate)) - new Date(convertDate(a.effdate));
          // });
          let maxDate = new Date(0);
          let maxRecord = null;

          // Iterate over the JSON data to find the record with the maximum date
          val?.data?.transacions?.forEach((item) => {
            // Extract day, month, and year from the date string
            const dateParts = item?.BILLDUEDT.split("/");
            const day = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10) - 1; // Subtract 1 because months are zero-indexed
            const year = parseInt(dateParts[2], 10);
            const currentDate = new Date(year, month, day);

            if (currentDate > maxDate) {
              maxDate = currentDate;
              maxRecord = item;
            }
          });

          let res = maxRecord;
          setIsPreferredDebit(res?.BILLDUEDT);
          setIsMaxDebitAmount(res?.TRANSAMT);
          form?.setFieldsValue({
            DueDate: res?.BILLDUEDT,
            FilesenttoBankdate: res?.TRANSBNKRESPDT,
            HoldPossibleForCurrentDue:
              res?.TRANSSTATUS === "NOT SEND"
                ? "Yes"
                : res?.TRANSSTATUS === "Send To Bank"
                ? "No"
                : "No",
          });
          if (res?.TRANSSTATUS === "NOT SEND") {
            PaymentRelatedData[
              selectedSubType
            ]?.Customer_Choice_Details?.forEach((element) => {
              if (element?.name?.includes("customerchoice")) {
                element.hide = false;
                setShowReasonDelayField(true);
              }
            });
          } else if (res?.TRANSSTATUS === "Send To Bank") {
            PaymentRelatedData[
              selectedSubType
            ]?.Customer_Choice_Details?.forEach((element) => {
              if (element?.name?.includes("customerchoice")) {
                element.hide = true;
                setShowReasonDelayField(true);
              }
            });
          }
          setIsLoading(false);
        } else {
          //  setAlertTitle("");
          //  setAlertData(val?.data?.ERRDESC);
          //  setNavigateTo("/advancesearch");
          //  setShowAlert(true);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  const getMandatetagEnquiry = () => {
    setIsLoading(true);
    setDisableOTP(true);
    setECGRequestField(null);
    getMandateData();
    let empID = loggedUser?.allRoles[0]?.employeeID;
    let response = apiCalls.getMandatetagEnquiry(customerData?.policyNo, empID);
    response
      .then((val) => {
        if (val?.data?.responseBody?.errorCode !== "1") {
          const sortedData = [...val?.data?.responseBody?.bankDetailsList];
          sortedData.sort((a, b) => {
            return (
              new Date(convertDate(b.effdate)) -
              new Date(convertDate(a.effdate))
            );
          });
          const res = sortedData[0];
          const isECGRequestValue =
            res?.mandstat === "10" ? "Active" : "Mandate Tag Not Found";
          setECGRequestField(isECGRequestValue);
          form?.setFieldsValue({ ECSRequest: isECGRequestValue });
          // setMandateDetailsData(sortedData);
          if (
            ["mandatedetails", "mandatecancellation", "holdmandate"].includes(
              selectedSubType
            )
          ) {
            const bankDetailsList = val?.data?.responseBody?.bankDetailsList;
            let primary = null;
            let secondary = null;
            let tertiary = null;

            const accountsWithTag = bankDetailsList.filter(
              (account) => account.zmandtag === "P"
            );
            const accountsWithoutTag = bankDetailsList.filter(
              (account) => account.zmandtag === ""
            );

            accountsWithoutTag.sort(
              (a, b) => new Date(a.effdate) - new Date(b.effdate)
            );

            if (accountsWithTag.length > 0) {
              primary = accountsWithTag[0];
            }

            if (accountsWithoutTag.length > 0) {
              if (!primary) {
                primary = accountsWithoutTag[0];
                if (accountsWithoutTag.length > 1) {
                  secondary = accountsWithoutTag[1];
                  if (accountsWithoutTag.length > 2) {
                    tertiary = accountsWithoutTag[2];
                  }
                }
              } else {
                secondary = accountsWithoutTag[0];
                if (accountsWithoutTag.length > 1) {
                  tertiary = accountsWithoutTag[1];
                }
              }
            }

            const taggedAccounts = [primary, secondary, tertiary]
              .filter(Boolean)
              .map((account, index) => ({
                ...account,
                tag:
                  index === 0
                    ? "Primary"
                    : index === 1
                    ? "Secondary"
                    : "Tertiary",
              }));

            setMandateDetailsData(taggedAccounts);
            getMandateData(res?.mandref);
            setMandRefNo(res?.mandref);
          } else if (
            selectedSubType === "newmandateregistration" ||
            selectedSubType === "holdmandate" ||
            selectedSubType === "restartmandate" ||
            selectedSubType === "mandatecancellation"
          ) {
            getMandateData(res?.mandref);
            setMandRefNo(res?.mandref);
          }
          // setIsLoading(false);
        } else {
          const isECGRequestValue = val?.data?.responseBody?.errorMessage;
          setECGRequestField(isECGRequestValue);
          form?.setFieldsValue({ ECSRequest: isECGRequestValue });
          setIsLoading(false);
          message.error({
            content:
              val?.data?.responseBody?.errorMessage ||
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

  const getMandateData = (mandref) => {
    setIsLoading(true);
    setDisableOTP(true);
    setECGRequestField(null);
    let response = apiCalls.getMandateData(
      customerData?.poClientID ||
        details?.policyDetailsObj?.identifiers?.po_ClientID,
      mandref,
      customerData?.applicationNo
    );
    response
      .then((val) => {
        if (val?.data?.responseBody?.errorCode !== "1") {
          const res = val?.data?.responseBody;
          form?.setFieldsValue({
            PaymentMethod: "NACH",
            NACHStatus: res?.statdets,
            RegisteredOn: res?.effdate ? convertDate(res?.effdate) : null,
            BankName: res?.bankkey,
            BankAccountNumber: res?.bankacckey,
            BankIFSC: "",
            PreferredDebitDate: res?.zddday || null,
            MaxDebitAmounat: res?.mandamt,
            NACHValidTill: handleAddYears(),
          });
          setIsLoading(false);
        } else {
          handleAddYears();
          const isECGRequestValue = val?.data?.responseBody?.errorMessage;
          setECGRequestField(isECGRequestValue);
          form?.setFieldsValue({ ECSRequest: isECGRequestValue });
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  // const handleAddDays = () => {
  //   let days = details?.policyDetailsObj?.premiumDetails?.ppt ? parseInt(details?.policyDetailsObj?.premiumDetails?.ppt): details?.policyDetailsObj?.premiumDetails?.ppt;
  //   if (days > 30) {
  //     days = 30;
  //     const newDate = new Date(convertDate(details?.policyDetailsObj?.saDetails?.rcd));
  //     newDate.setDate(newDate.getDate() + days);
  //     return newDate ? convertDate(newDate) :newDate;
  //   }
  //   else {
  //     return convertDate(details?.policyDetailsObj?.saDetails?.rcd);
  //   }

  // };
  const convertDate4 = (dateString) => {
    // Assuming dateString is in "YYYY-MM-DD" format
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day); // month - 1 because months are 0-indexed in JavaScript
  };
  const handleAddYears = () => {
    let years = details?.policyDetailsObj?.premiumDetails?.ppt
      ? parseInt(details?.policyDetailsObj?.premiumDetails?.ppt)
      : details?.policyDetailsObj?.premiumDetails?.ppt;
    if (years > 30) {
      years = 30;
      const newDate = new Date(
        convertDate(details?.policyDetailsObj?.saDetails?.rcd)
      );
      newDate.setFullYear(newDate.getFullYear() + years);
      return newDate ? convertDate(newDate) : newDate;
    } else if (years > 0) {
      let newDate = convertDate2(details?.policyDetailsObj?.saDetails?.rcd);
      newDate = new Date(newDate);
      newDate.setFullYear(newDate.getFullYear() + years);
      return newDate ? convertDate(newDate) : newDate;
    } else {
      return convertDate(details?.policyDetailsObj?.saDetails?.rcd);
    }
  };

  const getServiceRequestCount = () => {
    let response = apiCalls.getServiceRequestCount(
      customerData?.policyNo,
      selectedCallType,
      selectedSubTypeId
    );
    response
      .then((val) => {
        if (val?.data) {
          form?.setFieldsValue({ NumberOfTimesModeChanged: val?.data?.count });
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
  };

  const toggleInputField = (field, item, index) => {
    if (selectedSubType === "paymentlink") {
      setShowEmailFields(true);
      switch (field) {
        case "phone":
          setShowPhoneNumber(!showPhoneNumber);
          break;
        case "email":
          setShowEmailAddress(!showEmailAddress);
          break;
        case "whatsapp":
          setShowWhatsApp(!showWhatsApp);
          break;
        default:
          break;
      }
    } else {
      setShowEmailFields(true);
      form.setFieldsValue({
        mobileNo: customerData?.mobileNo,
        whatsAppNo: customerData?.mobileNo,
        emailId: customerData?.emailID,
      });
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
    }
  };

  //commonly render all forms
  const renderDetailsForm = (formType) => {
    return (
      <DetailsForm
        data={PaymentRelatedData[selectedSubType]?.[formType]}
        subType={selectedSubType}
        suffix={!isShowPOSScreen && suffix}
        form={form}
        handleRadioChange={handleRadioChange}
        handleDateChange={handleDateChange}
        handleTextLink={handleTextLink}
        handleDropdownChange={handleDropdownChange}
        selectCheckBox={selectCheckBox}
        toggleInputField={toggleInputField}
        activeEmailIcons={activeEmailIcons}
        activeMobileIcons={activeMobileIcons}
        activeWhatsAppIcons={activeWhatsAppIcons}
        getUploadFiles={getUploadFiles}
        handleLabelLink={handleLabelLink}
        disabledDate={disabledDate}
        onBlurInput={onBlurInput}
        isUpdateModeLU={isUpdateModeLU}
        disableRequestForm={disableRequestForm}
        handleInputChange={handleInputChange}
        handleDateChange1={handleDateChange1}
        featuredatedisabled={featuredatedisabled}
        requestModeLU={requestModeLU}
        validateOTPSuccess={validateOTPSuccess}
      ></DetailsForm>
    );
  };

  const handleDateChange1 = () => {};

  const getIFSCBankDetails = async (ifscCode) => {
    let response = await apiCalls.getIFSCBanks(ifscCode);
    if (response.statusText) {
      if (response?.data.length > 0) {
        form.setFieldsValue({
          NameAsMentionedInTheBank: response?.data[0]?.bank,
        });
      } else {
        message.error({
          content: response?.data?.responseBody?.errormessage || "Invalid IFSC",
          className: "custom-msg",
          duration: 2,
        });

        form.setFieldsValue({
          // BankIFSC: '',
          NameAsMentionedInTheBank: "",
        });
      }
    }
  };
  const handleInputChange = (e, item) => {
    if (
      item.label?.includes("IFSC") &&
      e.target.value &&
      e.target.value?.length === 11
    ) {
      getIFSCBankDetails(e.target.value);
    }
  };

  const getPaymentDetails = (chequeNo) => {
    setIsLoading(true);
    setIsShowChequeNoFields(false);
    setShowAlert(false);

    apiCalls
      .GetPaymentDetails(details?.policyDetailsObj?.identifiers?.applicationNo)
      .then((val) => {
        if (val?.data) {
          const paymentDetails = val?.data?.responseBody?.paymentDetails;

          if (paymentDetails) {
            // Filter for payments with canceledcode including "Cheque Bounce"
            const filteredDetails = paymentDetails.filter((detail) =>
              detail?.canceledcode?.includes("Cheque Bounce")
            );

            if (filteredDetails.length > 0) {
              // Sort filtered details by instrumentno in descending order
              const sortedDetails = filteredDetails.sort(
                (a, b) => b?.instrumentno - a?.instrumentno
              );

              // Get the latest payment
              const latestPayment = sortedDetails[0];

              if (latestPayment) {
                const paymentDate = new Date(
                  convertDate2(latestPayment?.paymentdate)
                );

                if (latestPayment.paymentdate) {
                  // Adding 89 days to the payment date
                  paymentDate.setDate(paymentDate.getDate() + 89);

                  // Formatting the result to DD/MM/YYYY format
                  const day = paymentDate.getDate().toString().padStart(2, "0");
                  const month = (paymentDate.getMonth() + 1)
                    .toString()
                    .padStart(2, "0"); // Month is zero-indexed
                  const year = paymentDate.getFullYear();
                  const expiryDate = new Date(year, month - 1, day); // Month is zero-indexed

                  const curDate = new Date();
                  if (expiryDate < curDate) {
                    setIsExpired(true);
                    setAlertData(
                      "Request cannot be accepted as cheque expiry date is completed!"
                    );
                    setShowAlert(true);
                  }

                  form.setFieldsValue({
                    ChequeExpiryDate: `${day}/${month}/${year}`,
                    ReceiptNumber: latestPayment?.receiptno,
                    ChequeAmount: latestPayment?.paymentamount
                      ? latestPayment?.paymentamount?.toLocaleString()
                      : latestPayment?.paymentamount,
                    ChequeDate: latestPayment?.instrumentdate
                      ? convertDate(latestPayment?.instrumentdate)
                      : latestPayment?.instrumentdate,
                    ChequeBounceReason: latestPayment?.chequebounce,
                    ChequeDrawnOnBankName: latestPayment?.bankname,
                  });

                  setIsChequeNumber(true);
                  setIsShowChequeNoFields(true);
                  setLatestPayment(latestPayment);
                } else {
                  form.setFieldsValue({
                    ChequeExpiryDate: "",
                  });
                }
              } else {
                setAlertData("No Records Found");
                setShowAlert(true);
              }
            } else {
              setAlertData("No Records Found");
              setShowAlert(true);
            }

            setIsLoading(false);
          } else {
            setAlertData("No Records Found");
            setShowAlert(true);
            setIsLoading(false);
          }
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
        message.error({
          content: "Something went wrong please try again!",
          className: "custom-msg",
          duration: 2,
        });
      });
  };

  const onBlurInput = (value, item) => {
    const obj = form.getFieldsValue(value);

    // if(item.name === "BankIFSC" && value){
    //   getIFSCBankDetails(value);
    // }
    if (item.label === "Cheque Number") {
      getPaymentDetails(value);
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

    if (item.name === "ReEnterCardNumber") {
      setCNFBankAccNo(value);
    } else if (item.name === "CardNumber") {
      setBankAccNo(value);
    }
    if (item.name === "ReEnterCardNumber") {
      if (BankAccNo !== value) {
        message.destroy();
        message.error({
          content: "Card Number Not matched",
          className: "custom-msg",
          duration: 2,
        });
        form.setFieldsValue({ ReEnterCardNumber: "" });
      }
      //  const lastFourDigits = obj.ReEnterCardNumber.slice(-4);
      //  const maskedString = '*'.repeat(obj.ReEnterCardNumber.length - 4) + lastFourDigits;
      //  form.setFieldsValue({ReEnterCardNumber: maskedString});
    } else if (value?.length >= 4 && item.name === "CardNumber") {
      const lastFourDigits = obj.CardNumber.slice(-4);
      const maskedString =
        "*".repeat(obj.CardNumber.length - 4) + lastFourDigits;
      form.setFieldsValue({ CardNumber: maskedString });
    }
  };


  const handleChange = (value) => {
    handleEmpty();
    if (
      value?.includes("Update New Mode") &&
      loginInfo?.userProfileInfo?.profileObj?.isEmail
    ) {
      form.setFieldsValue({
        requestchannel: "Email",
      });
    }
    // If the checkbox is already checked, uncheck it
    if (checkedList.includes(value)) {
      setCheckedList([]);
    } else {
      // Otherwise, check it
      setCheckedList([value]);
      if (value?.includes("View Existing Policy Details")) {
        form.setFieldsValue({
          Mode_Old:
            billFreq[details?.policyDetailsObj?.premiumDetails?.billFreq],
          ModalPremium:
            details?.policyDetailsObj?.premiumDetails?.modelPremiumAmount,
          PTD: convertDate(details?.policyDetailsObj?.premiumDetails?.ptd),
          PolicyDuration: getYearsAndMonths(),
          PersistencyMonth: getMonthsOnly(),
          BillGeneratedDate: "",
          ModeChangeEffectiveDate: "",
          ECSRequest: getMandatetagEnquiry(),
          NumberOfTimesModeChanged: getServiceRequestCount(),
        });
        getBillingFrequencyChangeQuotation(
          details?.policyDetailsObj?.premiumDetails?.billFreq,
          value
        );
      } else if (value?.includes("Update New Mode")) {
        getBillingFrequencyChangeQuotation(
          details?.policyDetailsObj?.premiumDetails?.billFreq,
          value
        );
      } else if (
        (value?.includes("View Current Mandate Details") &&
          selectedSubType === "newmandateregistration") ||
        selectedSubType === "restartmandate" ||
        selectedSubType === "holdmandate" ||
        selectedSubType === "mandatecancellation"
      ) {
        getMandatetagEnquiry();
      } else if (
        selectedSubType === "holdmandate" ||
        selectedSubType === "mandatecancellation" ||
        selectedSubType === "restartmandate"
      ) {
        getTransacions();
      }
    }
  };
  const calculateMonthDifference = (date1, date2) => {
    // Implement the logic to calculate the difference in months between date1 and date2
    // For example:
    return moment(date1).diff(moment(date2), "months");
  };

  const getMonthsOnly = () => {
    const today = new Date(); // Current date
    const specificDateStr = convertDate(
      details?.policyDetailsObj?.saDetails?.rcd
    );
    if (specificDateStr) {
      const specificDate = moment(specificDateStr, "DD/MM/YYYY").toDate();
      const difference = calculateMonthDifference(today, specificDate);
      setMonthsDifference(difference);
      return difference;
    } else {
      // Handle the case where specificDate is null or undefined
      console.error("Invalid date format");
      return null;
    }
  };

  const calculateDateDifference = (date1, date2) => {
    const momentDate1 = moment(date1);
    const momentDate2 = moment(date2);
    if (!momentDate1.isValid() || !momentDate2.isValid()) {
      console.error("Invalid date format");
      return { years: 0, months: 0 };
    }
    const years = momentDate1.diff(momentDate2, "years");
    const months = momentDate1.diff(momentDate2, "months") % 12;

    return { years, months };
  };

  const getYearsAndMonths = () => {
    const today = new Date(); // Current date
    const specificDateStr = convertDate(
      details?.policyDetailsObj?.saDetails?.rcd
    );

    if (specificDateStr) {
      // Convert specificDateStr to Date object
      const specificDate = moment(specificDateStr, "DD/MM/YYYY").toDate();

      const { years, months } = calculateDateDifference(today, specificDate);
      return `${years > 0 ? years + " years" : ""} ${
        months > 0 ? months + " months" : ""
      }`;
    } else {
      console.error("Invalid date format");
      return "";
    }
  };

  const handleEmpty = () => {
    setShowPhoneNumber(false);
    setActiveEmailIcons([]);
    setActiveMobileIcons([]);
    setActiveWhatsAppIcons([]);
    setShowEmailAddress(false);
    setShowWhatsApp(false);
    setSelectedCheckbox(null);
  };

  const handleCheckBoxChange = (value) => {
    // If the checkbox is already checked, uncheck it
    if (paymentMethodList?.includes(value)) {
      setPaymentMethodList([]);
      setIsPaymentMethodSelection("");
    } else {
      // Otherwise, check it
      setPaymentMethodList([value]);
      setIsPaymentMethodSelection(value);
    }
  };

  const handleRequirementSubmit = () => {
    const formData = form.getFieldValue();
    setRequirementLoader(true);
    if (isShowPOSScreen) {
      POSActionsOnContactDetails(formData, "REJECTED", null);
    } else {
      saveRequest(formData);
    }
  };
  const popupClose = () => {
    setRaiseRequirementOpen(false);
  };

  const getRaiseRequirements = () => {
    setRaiseRequirementOpen(true);
    setRequirementLoader(true);
    let obj = {
      calltype: props?.selectedCallType,
      subtype: props?.selectedSubTypeId,
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

  const setInternalReqData = () => {
    POSContactData.serviceRequestTransectionData?.forEach((element) => {
      if (element.tagName === "InternalRequirementValue") {
        setInternalFlowRequirements(props.interlRequirementTagValue);
      }
    });
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
      seletedRequerimentList?.forEach((x) => {
        dummy = x.value;
      });
    }
    let POSComments;
    if (props.selectedSubType === "representcheque") {
      POSComments = values?.AuthorizerComments;
    }
    let reqFormValues = requirementsForm?.getFieldsValue();
    let internalFormValues = internalReqForm?.getFieldsValue();
    if (status !== "APPROVED") {
      if (
        (seletedRequerimentList.length === 0 &&
          !reqFormValues?.PosOtherReq &&
          status === "REJECTED") ||
        (seletedRequerimentList.length === 0 &&
          !internalFormValues?.PosInternalReq &&
          status === "INTERNAL")
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
    let obj = {
      TransectionId: 1,
      SrvReqRefNo: POSContactData?.srvReqRefNo || serviceRequestId,
      Status: status,
      RequirementList: seletedRequerimentList,
      UsrID: loginInfo?.userProfileInfo?.profileObj?.userName,
      RoleID: loginInfo?.userProfileInfo?.profileObj?.role,
      // "RequirementComments":requirementCmnt,
      Comments:
        props.selectedSubType === "representcheque"
          ? values.AuthorizerComments
          : values.POSComments,
      TransactionPayload: [],
    };
    if (status === "INTERNAL") {
      obj.TransactionPayload.push(
        {
          Status: "create",
          TagName: "InternalRequirementValue",
          TagValue: JSON.stringify(seletedRequerimentList),
        },
        {
          Status: "create",
          TagName: "PosInternalReq",
          TagValue: internalFormValues?.PosInternalReq || "",
        }
      );
    }
    if (
      props.selectedSubType === "representcheque" ||
      props.selectedSubType === "changeinmodefrequency" ||
      props.selectedSubType === "mandatecancellation" ||
      props.selectedSubType === "restartmandate"
    ) {
      obj?.TransactionPayload?.push(
        {
          Status: "Create",
          TagName: "POSComments1",
          TagValue: values?.AuthorizerComments || values.POSComments,
        },
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        }
      );
    }
    if (isShowPOSScreen) {
      obj.TransactionPayload.push({
        Status: "Create",
        TagName: "PosOtherReq",
        TagValue: reqFormValues?.PosOtherReq || "",
      });
    }
    setIsLoading(true);
    let response = apiCalls.POSActionsOnContactDetails(obj);
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
        setIsLoading(false);
        setRequirementLoader(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setRequirementLoader(false);
      });
  };

  const handleSendOTPClose = () => {
    form.setFieldsValue({ customerchoice: null });
    setIsModalOpen(false);
    setValidateBtnDisable(false);
    setOtpValue(null);
    setCounter(0);
    setIsDisableOTPInput(false);
    setIsCounterEnable(false);
  };
  const handleOTPChange = (e) => {
    setOtpValue(e.currentTarget.value);
  };
  const handleSendOTP = () => {
    setCounter(30);
    handleOTP(false);
    setValidateBtnDisable(true);
    setIsDisableOTPInput(true);
    setIsCounterEnable(true);
  };
  const handleOTP = (isValue) => {
    setSendOTPLoader(true);
    setSendOTPErrorMsg(false);
    setValidateOTPSuccess(false);
    if (isValue && !otpValue) {
      setSendOTPLoader(false);
      message.destroy();
      message.error({
        content: "Please Enter OTP value",
        className: "custom-msg",
        duration: 2,
      });
      return;
    }
    const obj = {
      PolicyNo: customerData?.policyNo,
      EmailId: import.meta.env.VITE_APP_RECEIPIENT_CC
        ? import.meta.env.VITE_APP_RECEIPIENT_CC
        : clientEnquiryData?.rinternet,
      MobileNo: import.meta.env.VITE_APP_RECEIPIENT_MOBILENO
        ? import.meta.env.VITE_APP_RECEIPIENT_MOBILENO
        : clientEnquiryData?.rmblphone,
      OTP: isValue ? otpValue : 0,
      CallType: props?.selectedCallType,
      SubType: props?.selectedSubTypeId,
      Body: '"CustomerName":"vishnu","Purpose":"claim intimation"',
    };
    let response = apiCalls.getSendOTP(obj);
    response
      .then((val) => {
        if (
          val?.data?.responseHeader?.issuccess ||
          val?.data?.responseOutput?.[0]?.responseHeader?.issuccess
        ) {
          setSendOTPLoader(false);
          if (otpValue) {
            message.destroy();
            setSendOTPErrorMsg(null);
            message.success({
              content: "Otp Validation successfully",
              className: "custom-msg",
              duration: 3,
            });
            setIsModalOpen(false);
            setOtpValue(null);
            setValidateOTPSuccess(true);
            setDisableRequestForm(true);
          }
        } else {
          setSendOTPLoader(false);
          message.destroy();
          message.error({
            content:
              val?.data?.responseBody?.errormessage ||
              val?.data?.responseOutput?.[0]?.responseBody?.errormessage ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
      })
      .catch((err) => {
        setSendOTPLoader(false);
        setSendOTPErrorMsg();
      });
  };

  // const getModeChangeOptions = (data) => {
  //   const frequencyOptions = ['Annual', 'Semi Annual', 'Quarterly', 'Monthly'];
  //   const selectedFrequencies = [];
  //   const updateSelectModeList = []

  //   for (let i = 1; i <= 4; i++) {
  //     if (data?.[`billfreQ${i}`] && data?.[`billfreQ${i}`] !== details?.policyDetailsObj?.premiumDetails?.billFreq) {
  //       selectedFrequencies.push(frequencyOptions[i - 1]);
  //       updateSelectModeList.push({
  //         label: frequencyOptions[i - 1],
  //         value: data?.[`billfreQ${i}`],
  //       });
  //     }
  //   }

  //   const bindValue = selectedFrequencies.join(', ');
  //   setIsUpdateModeLU(updateSelectModeList);

  //   return bindValue;
  // };

  const getModeChangeOptions = (data) => {
    const frequencyMapping = {
      "01": "Annual",
      "02": "Semi Annual",
      "04": "Quarterly",
      12: "Monthly",
    };

    const selectedFrequencies = [];
    const updateSelectModeList = [];
    const currentBillFreq = details?.policyDetailsObj?.premiumDetails?.billFreq; // Header-level billFreq

    for (let i = 1; i <= 4; i++) {
      const billFreqKey = data?.[`billfreQ${i}`]; // Fetching the frequency value

      if (billFreqKey && billFreqKey !== currentBillFreq) {
        const frequencyLabel = frequencyMapping[billFreqKey];

        if (frequencyLabel) {
          selectedFrequencies.push(frequencyLabel);
          updateSelectModeList.push({
            label: frequencyLabel,
            value: billFreqKey.toString(), // Ensure value is a string
          });
        }
      }
    }
    const bindValue = selectedFrequencies.join(", ");
    setIsUpdateModeLU(updateSelectModeList);

    return bindValue;
  };
  const getAllowableModeChangeOptionFetch = () => {
    setIsLoading(true);
    let obj = {
      planCodeNo: details?.policyDetailsObj?.planAndStatus?.planCode,
    };
    let empID = loggedUser?.allRoles[0]?.employeeID;
    let response = apiCalls.getAllowableModeChangeOptionFetch(obj, empID);
    response
      .then((val) => {
        if (val?.data) {
          const res = val?.data?.responseBody;
          form.setFieldsValue({
            ModeChangeAllowed: "Yes",
            AllowableModeChangeOptions: getModeChangeOptions(res),
          });
          let existObj = {
            ModeChangeAllowed: "Yes",
            AllowableModeChangeOptions: getModeChangeOptions(res),
          };
          setExistModeAllowable(existObj);

          setIsLoading(false);
        } else {
          form.setFieldsValue({
            ModeChangeAllowed: "No",
          });
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

  const getBillingFrequencyChangeQuotation = (selectMode, checkedValue) => {
    form.setFieldsValue({
      ModalPremium: "",
      PremiumToBeCollected: "",
    });
    setIsLoading(true);
    let obj = {
      mode: selectMode,
      policyNumber: customerData?.policyNo,
    };
    let empID = loggedUser?.allRoles[0]?.employeeID;
    let response = apiCalls.getBillingFrequencyChangeQuotation(obj, empID);
    response
      .then((val) => {
        if (val?.data) {
          const res = val?.data?.responseBody;
          if (res?.errorcode === "1") {
            setIsLoading(false);
            message.error({
              content:
                val?.data?.responseBody?.errormessage ||
                "Something went wrong please try again!",
              className: "custom-msg",
              duration: 2,
            });
            return;
          }

          setFrequency(res.frequency);
          const parsedDate = new Date(res?.billdate);
          const formattedDate = `${parsedDate.getDate()}/${
            parsedDate.getMonth() + 1
          }/${parsedDate.getFullYear()}`;
          if (checkedValue?.includes("View Existing Policy Details")) {
            form.setFieldsValue({
              BillGeneratedDate: formattedDate ? formattedDate : "",
              // ModalPremium: parseFloat(res?.nextinsamt)?.toLocaleString(),
              ModalPremium: (
                parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT01)
              )?.toLocaleString(),
              ImpactOnCurrentPremium: (
                parseFloat(res?.nextinsamt) +
                parseFloat(res?.staxamT02) -
                (parseFloat(res?.instpramt) + parseFloat(res?.staxamT01))
              )?.toLocaleString(),
              PremiumToBeCollected:
                selectMode === "12"
                  ? (
                      (parseFloat(res?.nextinsamt) +
                        parseFloat(res?.staxamT02)) *
                      2
                    )?.toLocaleString()
                  : (
                      parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT02)
                    )?.toLocaleString(),
            });
          } else if (checkedValue?.includes("Update New Mode")) {
            form.setFieldsValue({
              Mode_Old:
                billFreq[details?.policyDetailsObj?.premiumDetails?.billFreq],
              //ModalPremium: res?.nextinsamt ? (parseFloat(+res?.nextinsamt))?.toLocaleString():'',
              ModalPremium: (
                parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT02)
              )?.toLocaleString(),
              PTD: convertDate(details?.policyDetailsObj?.premiumDetails?.ptd),
              PolicyDuration: getYearsAndMonths(),
              PersistencyMonth: getMonthsOnly(),
              BillGeneratedDate: formattedDate ? formattedDate : "",
              //ModalPremium: (parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT01))?.toLocaleString(),
              ImpactOnCurrentPremium: (
                parseFloat(res?.nextinsamt) +
                parseFloat(res?.staxamT02) -
                (parseFloat(res?.instpramt) + parseFloat(res?.staxamT01))
              )?.toLocaleString(),
              PremiumToBeCollected:
                selectMode === "12"
                  ? (
                      (parseFloat(res?.nextinsamt) +
                        parseFloat(res?.staxamT02)) *
                      2
                    )?.toLocaleString()
                  : (
                      parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT02)
                    )?.toLocaleString(),
              // PremiumToBeCollected: selectMode === "12" ?  (parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT02))?.toLocaleString()  : ((parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT02)*2))?.toLocaleString(),
              AnnualOutgoaspercurrentmode: (
                parseFloat(
                  details?.policyDetailsObj?.premiumDetails?.modelPremiumAmount
                ) *
                parseInt(details?.policyDetailsObj?.premiumDetails?.billFreq)
              )?.toLocaleString(),
              AnnualOutgoasperNewMode: (
                (parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT02)) *
                parseFloat(selectMode)
              )?.toLocaleString(),
              Difference: (
                (parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT02)) *
                  parseFloat(selectMode) -
                parseFloat(
                  details?.policyDetailsObj?.premiumDetails?.modelPremiumAmount
                ) *
                  parseInt(details?.policyDetailsObj?.premiumDetails?.billFreq)
              )?.toLocaleString(),
              ECSRequest: getMandatetagEnquiry(),
            });
            let exitFieldsObj = {
              Mode_Old:
                billFreq[details?.policyDetailsObj?.premiumDetails?.billFreq],
              //ModalPremium: res?.nextinsamt ? (parseFloat(+res?.nextinsamt))?.toLocaleString():'',
              ModalPremium: (
                parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT02)
              )?.toLocaleString(),
              PTD: convertDate(details?.policyDetailsObj?.premiumDetails?.ptd),
              PolicyDuration: getYearsAndMonths(),
              PersistencyMonth: getMonthsOnly(),
              BillGeneratedDate: formattedDate ? formattedDate : "",
              //ModalPremium: (parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT01))?.toLocaleString(),
              ImpactOnCurrentPremium: (
                parseFloat(res?.nextinsamt) +
                parseFloat(res?.staxamT02) -
                (parseFloat(res?.instpramt) + parseFloat(res?.staxamT01))
              )?.toLocaleString(),
              PremiumToBeCollected:
                selectMode === "12"
                  ? (
                      (parseFloat(res?.nextinsamt) +
                        parseFloat(res?.staxamT02)) *
                      2
                    )?.toLocaleString()
                  : (
                      parseFloat(res?.nextinsamt) + parseFloat(res?.staxamT02)
                    )?.toLocaleString(),
            };
            setExistingModeChangeData(exitFieldsObj);
          }
          setIsLoading(false);
        } else {
          form.setFieldsValue({
            ModeChangeAllowed: "No",
          });
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

  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day"); // Can not select days before today and today
  };
  const featuredatedisabled = (current) => {
    return current && current < dayjs().startOf("day"); // Can not select days before today and today
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
    if (item === "branchreceiveddate") {
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
        form.setFieldsValue({ branchreceiveddate: "" });
        return;
      } else {
        if (selectedSubType === "representcheque") {
          PaymentRelatedData[selectedSubType]?.RequestForm_Fields?.forEach(
            (element) => {
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
            }
          );
        } else {
          PaymentRelatedData[selectedSubType]?.Request_Details?.forEach(
            (element) => {
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
            }
          );
        }
      }
    }
  };

  const handleDropdownChange = (e, item) => {
    if (item.name === "PaymentMethod" && e === "NACH") {
      setPaymentMethod(e);
      PaymentRelatedData[selectedSubType]?.NACH_Details?.forEach((element) => {
        if (
          element?.name === "NACHStatus" ||
          element?.name === "BankAccountNumber" ||
          element?.name === "BankIFSC" ||
          element?.name === "NACHValidTill"
        ) {
          element.hide = false;
        }

        if (
          element?.name === "BankName" ||
          element?.name === "CardType" ||
          element?.name === "CardNumber" ||
          element?.name === "SIStatus"
        ) {
          element.hide = true;
        }
      });
    } else if (item.name === "PaymentMethod" && e === "SI") {
      setPaymentMethod(e);
      PaymentRelatedData[selectedSubType]?.NACH_Details?.forEach((element) => {
        if (
          element?.name === "NACHStatus" ||
          element?.name === "BankAccountNumber" ||
          element?.name === "BankIFSC" ||
          element?.name === "NACHValidTill"
        ) {
          element.hide = true;
        }
        if (
          element?.name === "BankName" ||
          element?.name === "CardType" ||
          element?.name === "CardNumber" ||
          element?.name === "SIStatus"
        ) {
          element.hide = false;
        }
      });
    }
    setRerenderComponent(!rerenderComponent);
    setDisableRequestForm(false);
    if (item.label?.includes("Select New Mode")) {
      setMsgModal(false);
      setIsSelectionMode(e);
      getBillingFrequencyChangeQuotation(e, checkedList);
      // if(e==="12"){   // comment 28-05-2024
      //   setMsgModal(true);
      // }
    }
  };
  const handleTextLink = (item) => {
    if (item.linkValue?.toLowerCase() === "view") {
          const gConfig= apiCalls.getGenericConfig()
          if(gConfig?.data?.dmsApiUrl){
      const url =
        gConfig?.data?.dmsApiUrl+
        `/omnidocs/WebApiRequestRedirection?Application=BPMPOLENQ&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${details?.policyDetailsObj?.identifiers?.applicationNo}`;
      window.open(url, "_blank");
          }
    }
  };
  const handleLabelLink = (item) => {
    if (item.label === "Initiate Penny Drop") {
      InitiatePennyDropp();
    }
  };

  const getUploadFiles = (listOfUploadFiles) => {
    // const updatedUploadList = listOfUploadFiles?.map((obj) => {
    //   // Create a new object without the propertyToDelete property
    //   const { labelName, ...newObject } = obj;
    //   return newObject;
    // });
    // Update the state with the new list
    setUploadFiles(listOfUploadFiles);
  };

  const getData = () => {
    const obj = {
      outofRevival: "",
      totalBaseAmount: "",
      interestAmount: "",
      amountInSuspense: "",
      totalPremiumDue: "",
      mobileNo:
        props?.details?.sentDetailsObj?.mobileNo ||
        props?.customerData?.mobileNo,
      whatsAppNo:
        props?.details?.sentDetailsObj?.mobileNo ||
        props?.customerData?.mobileNo,
      emailId:
        props?.details?.sentDetailsObj?.emailID || props?.customerData?.emailID,
      basePremium: "",
      riderPremium: 0,
      GST: "",
      interestIfany: "",
      waiverOfInterest: 0,
      suspense: "",
      totalPremium: "",
    };
    setIsLoading(true);
    let payload = {
      requestHeader: {
        source: "POS",
        carrierCode: "2",
        branch: "PRA",
        userId: loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID,
        userRole: "10",
        partnerId: "MSPOS",
        processId: "POS",
        monthendExtension: "N",
        monthendDate: "16/10/2024",
      },
      requestbody: {
        policyNo: customerData?.policyNo,
        effectiveDate: moment(new Date(), "YYYYMMDD").format("YYYYMMDD"),
        action: "A",
      },
    };

    let response = apiCalls.getPremiumEnquiryData(payload);
    response
      .then((val) => {
        setIsLoading(false);
        if (val?.data?.responseBody?.errorcode === "1") {
          obj.totalPremiumDue = 0;
          setData(obj);
          form.setFieldsValue({ ...obj });
        } else if (val?.data?.responseHeader?.issuccess === false) {
          message.error({
            content:
              val?.data?.responseHeader?.message ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 3,
          });
        } else {
          let value = val?.data?.responseBody;
          obj.totalBaseAmount =
            parseFloat(value?.osbal) + parseFloat(value?.newamnt);
          obj.interestAmount =
            parseFloat(value?.hrifeecnt) - parseFloat(value?.zwvrifee);
          obj.amountInSuspense = parseFloat(value?.cntsusp);
          //obj.totalPremiumDue = ((obj.totalBaseAmount + obj.interestAmount) - obj.amountInSuspense).toString();
          obj.basePremium = parseFloat(value?.zsprm);
          obj.GST = parseFloat(value?.totaltax);
          obj.interestIfany = parseFloat(value?.hrifeecnt);
          obj.suspense = parseFloat(value?.cntsusp);
          obj.totalPremiumDue =
            obj.totalPremiumDue < 0
              ? 0
              : (
                  obj.basePremium +
                  parseFloat(obj.riderPremium) +
                  obj.GST +
                  obj.interestIfany -
                  (obj.waiverOfInterest + obj.suspense)
                ).toString();
          obj.totalPremium =
            obj.basePremium +
            parseFloat(obj.riderPremium) +
            obj.GST +
            obj.interestIfany -
            (obj.waiverOfInterest + obj.suspense);
          obj.totalPremiumDue =
            obj.totalPremiumDue < 0 ? 0 : obj.totalPremiumDue;
          obj.totalPremium = obj.totalPremium < 0 ? 0 : obj.totalPremium;
          setData(obj);
          form.setFieldsValue({ ...obj });
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const handleLinkValue = () => {
    setPaymentDetailsOpen(true);
  };

  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };
  const convertDate2 = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("YYYY-MM-DD");
    return formattedDate;
  };
  const convertDate3 = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYDDMM").format("DD/MM/YYYY");
    return formattedDate;
  };

  const InitiatePennyDropp = () => {
    const values = form.getFieldsValue();
    if (
      !values.BankAccountNumber ||
      !values.AccountHolderName ||
      !values.BankIFSC
    ) {
      message.destroy();
      message.error({
        content: "Enter All Mandatory Feilds",
        className: "custom-msg",
        duration: 2,
      });
      return;
    }
    let obj = {
      accountNumber: values?.BankAccountNumber,
      accountHolderName: values?.AccountHolderName || "",
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
        if (result?.data) {
          if (result?.data?.responseBody?.statusCode === 101) {
            form.setFieldsValue({
              InitiatePennyDrop:
                result?.data?.responseBody?.result?.data?.source[0]?.data
                  ?.bankResponse,
            });
          } else {
            form.setFieldsValue({
              InitiatePennyDrop: result?.data?.statusMessage,
            });
          }
          //SUCCESSFUL TRANSACTION
        } else {
          setIsLoading(false);
          form.setFieldsValue({
            InitiatePennyDrop: "Invalid Input",
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
        setIsLoading(false);
        form.setFieldsValue({
          InitiatePennyDrop: "Invalid Input",
        });
      });
  };

  const handleRadioChange = (e, item) => {
    let selectionValue = e.target.value;
    // setIsShowRequestFormFields(false);
    setShowRaiseRequirementBtn(false);

    if (
      selectedSubType === "changeinmodefrequency" ||
      selectedSubType === "holdmandate" ||
      selectedSubType === "mandatecancellation" ||
      selectedSubType === "restartmandate" ||
      selectedSubType === "redebitstop" ||
      selectedSubType === "representcheque"
    ) {
      //  if(item?.label?.includes("Choose Payment Method")){
      //   setIsPaymentMethodSelection(selectionValue);
      //  }
      if (
        ["Customer Choice", "Request By"].includes(item?.label) &&
        selectionValue === "requestform"
      ) {
        setIsShowRequestFormFields(true);
      } else if (
        ["Customer Choice", "Request By"].includes(item?.label) &&
        selectionValue === "otp"
      ) {
        setIsShowRequestFormFields(false);
        setShowRaiseRequirementBtn(false);
      } else if (
        selectionValue === "no" &&
        item?.label?.includes("Validate Signature")
      ) {
        setShowRaiseRequirementBtn(true);
      } else if (
        selectionValue === "yes" &&
        item?.label?.includes("Validate Signature")
      ) {
        setShowRaiseRequirementBtn(false);
      } else if (
        selectionValue === "no" &&
        item?.label?.includes("Life Asia Updated")
      ) {
        setDisableApproveBtn(true);
      } else if (
        selectionValue === "yes" &&
        item?.label?.includes("Life Asia Updated")
      ) {
        setDisableApproveBtn(false);
      } else if (selectionValue === "no" && item?.name === "ChequeReceived") {
        setDisableApproveBtn(true);
        PaymentRelatedData[selectedSubType]?.PA_Details?.forEach((element) => {
          if (
            element?.name === "ChequeReDepositDate" ||
            element?.name === "ReceiptNo"
          ) {
            element.hide = true;
          }
        });
      } else if (selectionValue === "yes" && item?.name === "ChequeReceived") {
        setDisableApproveBtn(false);
        PaymentRelatedData[selectedSubType]?.PA_Details?.forEach((element) => {
          if (
            element?.name === "ChequeReDepositDate" ||
            element?.name === "ReceiptNo"
          ) {
            element.hide = false;
          }
        });
      }
      if (e.target.value === "otp") {
        setCounter(0);
        setIsModalOpen(true);
        setIsShowTransferFields(true);
        //setShowRequestFormFields(false);
        setValidateOTPSuccess(false);
      } else {
        setCounter(0);
        setIsModalOpen(false);
        // setShowRequestFormFields(true);
        setIsShowTransferFields(false);
        setValidateOTPSuccess(true);
      }
    } else if (selectedSubType === "paymentlink") {
      if (selectionValue === 1) {
        setIsShowTransferFields(true);
      } else {
        setIsShowTransferFields(false);
      }
    }
  };

  const getTransactionData = (values) => {
    let formData = form.getFieldValue();

    if (selectedSubType === "paymentlink") {
      return [
        {
          Status: "Create",
          TagName: "Template",
          TagValue: "PAYMENTLINK",
        },
        {
          Status: "Create",
          TagName: "TotalPremiumDue",
          TagValue: values.totalPremiumDue,
        },
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
      ];
    } else if (
      selectedSubType === "changeinmodefrequency" &&
      checkedList?.includes("View Existing Policy Details")
    ) {
      return [
        {
          Status: "Create",
          TagName: "ModeChangeAllowed",
          TagValue: values?.ModeChangeAllowed || "",
        },
        {
          Status: "Create",
          TagName: "AllowableModeChangeOptions",
          TagValue: values?.AllowableModeChangeOptions || "",
        },
        {
          Status: "Create",
          TagName: "ActionType",
          TagValue: "ViewExistingPolicyDetails",
        },
        {
          Status: "Create",
          TagName: "Mode_New",
          TagValue: values?.Mode_New || "",
        },
        {
          Status: "Create",
          TagName: "ModalPremium",
          TagValue: values?.ModalPremium || "",
        },
        {
          Status: "Create",
          TagName: "PTD",
          TagValue: values?.PTD || "",
        },
        {
          Status: "Create",
          TagName: "PolicyDuration",
          TagValue: values?.PolicyDuration || "",
        },
        {
          Status: "Create",
          TagName: "PersistencyMonth",
          TagValue: values?.PersistencyMonth || "",
        },
        {
          Status: "Create",
          TagName: "BillGeneratedDate",
          TagValue: values?.BillGeneratedDate || "",
        },
        {
          Status: "Create",
          TagName: "ModeChangeEffectiveDate",
          TagValue: values?.ModeChangeEffectiveDate || "",
        },
        {
          Status: "Create",
          TagName: "ECSRequest",
          TagValue: values?.ECSRequest || eCGRequestField || "",
        },
        {
          Status: "Create",
          TagName: "NumberOfTimesModeChanged",
          TagValue: values?.NumberOfTimesModeChanged || "",
        },
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || emsrequestchannel,
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
        {
          Status: "Create",
          TagName: "Mode_Old",
          TagValue:
            billFreq[details?.policyDetailsObj?.premiumDetails?.billFreq],
        },
      ];
    } else if (
      selectedSubType === "changeinmodefrequency" &&
      checkedList?.includes("Update New Mode")
    ) {
      let arr = [
        {
          Status: "Create",
          TagName: "ModeChangeAllowed",
          TagValue: values?.ModeChangeAllowed || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || emsrequestchannel,
        },
        {
          Status: "Create",
          TagName: "AllowableModeChangeOptions",
          TagValue: values?.AllowableModeChangeOptions || "",
        },
        {
          Status: "Create",
          TagName: "ActionType",
          TagValue: "UpdateNewMode",
        },
        {
          Status: "Create",
          TagName: "Mode_New",
          TagValue: values?.Mode_New ? billFreq[values?.Mode_New] : "",
        },
        {
          Status: "Create",
          TagName: "ModalPremium",
          TagValue: values?.ModalPremium || "",
        },
        {
          Status: "Create",
          TagName: "ImpactOnCurrentPremium",
          TagValue: values?.ImpactOnCurrentPremium || "",
        },
        {
          Status: "Create",
          TagName: "PremiumToBeCollected",
          TagValue: formData?.PremiumToBeCollected || "",
        },
        {
          Status: "Create",
          TagName: "AnnualOutgoaspercurrentmode",
          TagValue: values?.AnnualOutgoaspercurrentmode || "",
        },
        {
          Status: "Create",
          TagName: "AnnualOutgoasperNewMode",
          TagValue: values?.AnnualOutgoasperNewMode || "",
        },
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "Difference",
          TagValue: values?.Difference || "",
        },
        {
          Status: "Create",
          TagName: "PaymentMethod",
          TagValue: values?.PaymentMethod || "",
        },
        {
          Status: "Create",
          TagName: "BankIFSC",
          TagValue: values?.BankIFSC || "",
        },
        {
          Status: "Create",
          TagName: "NameAsMentionedInTheBank",
          TagValue: values?.NameAsMentionedInTheBank || "",
        },
        {
          Status: "Create",
          TagName: "BankAccountNumber",
          TagValue: values?.BankAccountNumber || "",
        },
        {
          Status: "Create",
          TagName: "ConfirmBankAccountNumber",
          TagValue: values?.ConfirmBankAccountNumber || "",
        },
        // Nach Ended
        // SI Started
        {
          Status: "Create",
          TagName: "CardNumber",
          TagValue: values?.CardNumber || "",
        },
        {
          Status: "Create",
          TagName: "ReEnterCardNumber",
          TagValue: values?.ReEnterCardNumber || "",
        },
        {
          Status: "Create",
          TagName: "CardType",
          TagValue: values?.CardType || "",
        },
        // Ended SI
        {
          Status: "Create",
          TagName: "BankName",
          TagValue: values?.BankName || "",
        },
        {
          Status: "Create",
          TagName: "InitiatePennyDrop",
          TagValue: values?.InitiatePennyDrop || "",
        },
        {
          Status: "Create",
          TagName: "PreferredDebitDate",
          TagValue: values?.PreferredDebitDate || "",
        },
        {
          Status: "Create",
          TagName: "ValidatedBy",
          TagValue: values?.customerchoice ? values.customerchoice : "form",
        },
        {
          Status: "Create",
          TagName: "ValidateSignature",
          TagValue: values?.ValidateSignature || "yes",
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
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "Mode_Old",
          TagValue:
            billFreq[details?.policyDetailsObj?.premiumDetails?.billFreq] || "",
        },
        {
          Status: "Create",
          TagName: "NACH",
          TagValue: isPaymentMethodSelection === "NACH" ? "Yes" : "No",
        },
      ];
      if (isPaymentMethodSelection === "NACH") {
        arr.push(
          { Status: "Create", TagName: "DocLink", TagValue: isDocLink },
          { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink }
        );
      } else {
        arr = arr.filter((ele) => {
          return ele.TagName !== "DocLink" || ele.TagName !== "ProcessLink";
        });
      }

      return arr;
    } else if (
      selectedSubType === "changeinmodefrequency" &&
      checkedList.includes("Share Process Communication")
    ) {
      let arr = [
        { Status: "Create", TagName: "Template", TagValue: "PROCESSENQUIRY" },
      ];
      return arr;
    } else if (
      selectedSubType === "newmandateregistration" &&
      PaymentMethod === "SI"
    ) {
      let arr = [
        {
          Status: "Create",
          TagName: "PaymentMethod",
          TagValue: values?.PaymentMethod || "",
        },
        {
          Status: "Create",
          TagName: "RegisteredOn",
          TagValue: values?.RegisteredOn || "",
        },
        {
          Status: "Create",
          TagName: "BankName",
          TagValue: values?.BankName || "",
        },
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },

        {
          Status: "Create",
          TagName: "PreferredDebitDate",
          TagValue: values?.PreferredDebitDate || "",
        },
        {
          Status: "Create",
          TagName: "MaxDebitAmounat",
          TagValue: values?.MaxDebitAmounat || "",
        },
        {
          Status: "Create",
          TagName: "LastThreeDebitDate",
          TagValue: values?.LastThreeDebitDate || "",
        },
        {
          Status: "Create",
          TagName: "LastThreeDebitStatus",
          TagValue: values?.LastThreeDebitStatus || "",
        },
        {
          Status: "Create",
          TagName: "CardType",
          TagValue: values?.CardType || "",
        },
        {
          Status: "Create",
          TagName: "CardNumber",
          TagValue: values?.CardNumber || "",
        },
        {
          Status: "Create",
          TagName: "SIStatus",
          TagValue: values?.SIStatus || "",
        },
      ];

      return arr;
    } else if (
      (selectedSubType === "newmandateregistration" ||
        selectedSubType === "redebitstop") &&
      checkedList?.includes("View Current Mandate Details")
    ) {
      return [
        {
          Status: "Create",
          TagName: "PaymentMethod",
          TagValue: values?.PaymentMethod || "",
        },
        {
          Status: "Create",
          TagName: "NACHStatus",
          TagValue: values?.NACHStatus || "",
        },
        {
          Status: "Create",
          TagName: "RegisteredOn",
          TagValue: values?.RegisteredOn || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
        {
          Status: "Create",
          TagName: "BankName",
          TagValue: values?.BankName || "",
        },
        {
          Status: "Create",
          TagName: "BankAccountNumber",
          TagValue: values?.BankAccountNumber || "",
        },
        {
          Status: "Create",
          TagName: "BankIFSC",
          TagValue: values?.BankIFSC || "",
        },
        {
          Status: "Create",
          TagName: "PreferredDebitDate",
          TagValue: values?.PreferredDebitDate || "",
        },
        {
          Status: "Create",
          TagName: "MaxDebitAmounat",
          TagValue: values?.MaxDebitAmounat || "",
        },
        {
          Status: "Create",
          TagName: "NACHValidTill",
          TagValue: values?.NACHValidTill || "",
        },
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        { Status: "Create", TagName: "Template", TagValue: "PROCESSEMAILER" },
        { Status: "Create", TagName: "DocLink", TagValue: isDocLink || "" },
        {
          Status: "Create",
          TagName: "ProcessLink",
          TagValue: isProcessLink || "",
        },
        //     {
        //         "Status": "Create",
        //         "TagName": "LastThreeDebitDate",
        //         "TagValue": values?.LastThreeDebitDate ||""
        //     }
        // ,
        //     {
        //         "Status": "Create",
        //         "TagName": "LastThreeDebitStatus",
        //         "TagValue": values?.LastThreeDebitStatus ||""
        //     }
      ];
    } else if (
      selectedSubType === "mandatecancellation" ||
      selectedSubType === "holdmandate" ||
      selectedSubType === "restartmandate"
    ) {
      return [
        {
          Status: "Create",
          TagName: "DueDate",
          TagValue: values?.DueDate || "",
        },
        {
          Status: "Create",
          TagName: "FilesenttoBankdate",
          TagValue: values?.FilesenttoBankdate || "",
        },
        {
          Status: "Create",
          TagName: "Reason",
          TagValue: values?.Reason || "",
        },
        {
          Status: "Create",
          TagName: "HoldPossibleForCurrentDue",
          TagValue: values?.HoldPossibleForCurrentDue || "",
        },
        {
          Status: "Create",
          TagName: "RequestorComments",
          TagValue: values?.RequestorComments || "",
        },
        {
          Status: "Create",
          TagName: "ValidatedBy",
          TagValue: values?.customerchoice || "",
        },
        {
          Status: "Create",
          TagName: "ValidateSignature",
          TagValue: values?.ValidateSignature || "",
        },
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
        {
          Status: "Create",
          TagName: "Client_Id",
          TagValue: customerData?.poClientID || "",
        },
        { Status: "Create", TagName: "MandateRef", TagValue: mandRefNo || "" },
        {
          Status: "Create",
          TagName: "MandateType",
          TagValue: isMandateSelection?.zmandtag || "",
        },
        {
          Status: "Create",
          TagName: "PaymentMethod",
          TagValue: isMandateSelection?.paymentmethod || "",
        },
        {
          Status: "Create",
          TagName: "MandateStatus",
          TagValue: isMandateSelection?.mandstat || "",
        },
        {
          Status: "Create",
          TagName: "selectionMandRef",
          TagValue: isMandateSelection?.mandref || "",
        },
        {
          Status: "Create",
          TagName: "RegisteredOn",
          TagValue: isMandateSelection?.effdate || "",
        },
        {
          Status: "Create",
          TagName: "BankName",
          TagValue: isMandateSelection?.bankkey || "",
        },
        {
          Status: "Create",
          TagName: "BankAccountNo",
          TagValue: isMandateSelection?.bankacckey || "",
        },
        {
          Status: "Create",
          TagName: "PreferredDebitDay",
          TagValue: isMandateSelection?.isPreferredDebit || "",
        },
        {
          Status: "Create",
          TagName: "MaxDebitAmt",
          TagValue:
            isMandateSelection?.isMaxDebitAmount || isMaxDebitAmount || "",
        },
        {
          Status: "Create",
          TagName: "NACHValidTill",
          TagValue: handleAddYears() || "",
        },
      ];
    }
    //       else if(selectedSubType==="holdmandate"&&checkedList?.includes("Register Hold Request")){
    //         return [
    //          {
    //            "Status": "Create",
    //            "TagName": "DueDate",
    //            "TagValue": values?.DueDate|| ""
    //        }
    //    ,
    //    {
    //      "Status": "Create",
    //      "TagName": "FilesenttoBankdate",
    //      "TagValue": values?.FilesenttoBankdate|| ""
    //  }
    // ,
    //  {
    //      "Status": "Create",
    //      "TagName": "Reason",
    //      "TagValue": values?.Reason|| ""
    //  },
    //        {
    //            "Status": "Create",
    //            "TagName": "HoldPossibleForCurrentDue",
    //            "TagValue": values?.HoldPossibleForCurrentDue|| ""
    //        }
    //    ,
    //        {
    //            "Status": "Create",
    //            "TagName": "RequestorComments",
    //            "TagValue": values?.RequestorComments|| ""
    //        },
    //        {
    //          "Status": "Create",
    //          "TagName": "ValidatedBy",
    //          "TagValue": values?.customerchoice || ""
    //      }
    //  ,
    //      {
    //          "Status": "Create",
    //          "TagName": "ValidateSignature",
    //          "TagValue": values?.ValidateSignature || ""
    //      },
    //      {
    //       "Status": "Create",
    //       "TagName": "Template",
    //       "TagValue":"REQCLOSURE"
    //   },
    //   {Status: "Create",TagName: "Client_Id","TagValue":  customerData?.poClientID ||""},
    //   {Status: "Create",TagName: "MandateRef","TagValue":  mandRefNo || ""},
    //         ]
    //    }
    //    else if(selectedSubType==="restartmandate"&&checkedList?.includes("Request For Re-Start")){
    //     return [
    //      {
    //        "Status": "Create",
    //        "TagName": "DueDate",
    //        "TagValue": values?.DueDate|| ""
    //    }
    // ,
    // {
    //  "Status": "Create",
    //  "TagName": "FilesenttoBankdate",
    //  "TagValue": values?.FilesenttoBankdate|| ""
    // }
    // ,
    // {
    //  "Status": "Create",
    //  "TagName": "Reason",
    //  "TagValue": values?.Reason|| ""
    // },
    //    {
    //        "Status": "Create",
    //        "TagName": "HoldPossibleForCurrentDue",
    //        "TagValue": values?.HoldPossibleForCurrentDue|| ""
    //    }
    // ,
    //    {
    //        "Status": "Create",
    //        "TagName": "RequestorComments",
    //        "TagValue": values?.RequestorComments|| ""
    //    },
    //    {
    //      "Status": "Create",
    //      "TagName": "ValidatedBy",
    //      "TagValue": values?.customerchoice || ""
    //  }
    // ,
    //  {
    //      "Status": "Create",
    //      "TagName": "ValidateSignature",
    //      "TagValue": values?.ValidateSignature || ""
    //  },
    //  {Status: "Create",TagName: "Client_Id","TagValue":  customerData?.poClientID ||""},
    //  {Status: "Create",TagName: "MandateRef","TagValue":  mandRefNo || ""},
    //     ]
    // }
    else if (
      selectedSubType === "newmandateregistration" &&
      checkedList?.includes("New Mandate Registration")
    ) {
      return [
        {
          Status: "Create",
          TagName: "Template",
          TagValue: "MANDATEREGISTRATIONMAILER",
        },
        { Status: "Create", TagName: "DocLink", TagValue: isDocLink || "" },
        {
          Status: "Create",
          TagName: "ProcessLink",
          TagValue: isProcessLink || "",
        },
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
      ];
    } else if (selectedSubType === "representcheque") {
      return [
        // { Status: "Create", TagName: "ProcessFileType", TagValue: "ProcessEmailer" },
        // { Status: "Create", TagName: "ProcessName", TagValue: isSelectedProcessName || values?.ProcessName },
        // { Status: "Create", TagName: "DocLink", TagValue: getDocLink() || ""},
        // { Status: "Create", TagName: "ProcessLink", TagValue: getProcessLink() || ""},
        {
          Status: "Create",
          TagName: "ReceiptType",
          TagValue: values.ReceiptType || "",
        },
        {
          Status: "Create",
          TagName: "ReceiptNumber",
          TagValue: values.ReceiptNumber || "",
        },
        {
          Status: "Create",
          TagName: "ChequeBounceReason",
          TagValue: values.ChequeBounceReason || "",
        },
        {
          Status: "Create",
          TagName: "ChequeReceivedAtHO",
          TagValue: values.ChequeReceivedAtHO || "",
        },
        {
          Status: "Create",
          TagName: "ChequeNumber",
          TagValue: values.ChequeNumber || "",
        },
        {
          Status: "Create",
          TagName: "ChequeAmount",
          TagValue: values.ChequeAmount || "",
        },
        {
          Status: "Create",
          TagName: "ChequeDate",
          TagValue: values.ChequeDate || "",
        },
        {
          Status: "Create",
          TagName: "ValidatedBy",
          TagValue: values.customerchoice || "",
        },
        {
          Status: "Create",
          TagName: "ChequeExpiryDate",
          TagValue: values.ChequeExpiryDate || "",
        },
        {
          Status: "Create",
          TagName: "ChequeDrawnOnBankName",
          TagValue: values.ChequeDrawnOnBankName || "",
        },
        {
          Status: "Create",
          TagName: "ChequeRepresentationRequestDate",
          TagValue: values.ChequeRepresentationRequestDate || "",
        },
        {
          Status: "Create",
          TagName: "ReasonFor_Representation",
          TagValue: values.ReasonFor_Representation || "",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values.Comments || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
      ];
    } else if (
      selectedSubType === "renewalpaymentoptions" ||
      selectedSubType === "renewalstatusenquiry"
    ) {
      return [
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
        {
          Status: "Create",
          TagName: "RequestorComments",
          TagValue: values?.Comments || values?.RequestorComments || "",
        },
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
      ];
    }
  };

  //   const getDocLink = () => {
  //     const filteredLinks = isDocLinks?.filter((item) => item.docType?.includes("Terms & Conditions"));
  //     // Assuming you want to return an array of links, you can use map
  //     const links = filteredLinks?.map((item) => item.link);
  //     return links?.length>0 ? links[0] : "";
  // }
  // const getProcessLink = () => {
  //   // const filteredLinks = isProcessLinks?.filter((item) => item.docType === isSelectedProcessName);
  //   const filteredLinks = isProcessLinks?.filter((item) => item.docType === MstDesc);

  //   const links = filteredLinks?.map((item) => item.link);
  //   return links?.length>0 ? links[0] : "";
  // }

  const handleSubmit = (values) => {
   
    if (values?.totalPremiumDue <= 0 && selectedSubType === "paymentlink") {
      message.destroy();
      message.error({
        content: "No Total Premium Due",
        className: "custom-msg",
        duration: 3,
      });
      return;
    }
    if (
      !showEmailFields &&
      (selectedSubType === "paymentlink" ||
        checkedList?.includes("Send Mode Change Link") ||
        (isPaymentMethodSelection?.toLocaleLowerCase() === "nach" &&
          isSelectionMode === "12" &&
          values?.ECSRequest === "Mandate not found") ||
        (selectedSubType === "newmandateregistration" &&
          checkedList?.includes("New Mandate Registration")))
    ) {
      message.destroy();
      message.error({
        content: "Please Select Communication Type",
        className: "custom-msg",
        duration: 3,
      });

      return;
    }
    // if(isShowRequestDetails&&selectedSubType==="mandatecancellation") {
    //   message.destroy();
    //     message.error({
    //       content: "No Total Premium Due",
    //       className: "custom-msg",
    //       duration: 3,
    //     });
    //       return;
    //      }
    if (POSContactData && customerData?.isPOS) {
      POSActionsOnContactDetails(values, "APPROVED", null);
    } else if (
      selectedSubType === "paymentlink" ||
      selectedSubType === "changeinmodefrequency" ||
      selectedSubType === "newmandateregistration" ||
      selectedSubType === "holdmandate" ||
      selectedSubType === "restartmandate" ||
      selectedSubType === "mandatecancellation" ||
      selectedSubType === "representcheque" ||
      selectedSubType === "mandatedetails" ||
      selectedSubType === "renewalstatusenquiry" ||
      selectedSubType === "renewalpaymentoptions"
    ) {
      // if((values.validatesignature === 'no'||values.ValidateSignature === 'no')){
      //   getRaiseRequirements();
      // }else{
      saveRequest(values);
      // }
    }
  };

  function getCategory(selectedSubType, checkedList) {
    const isUpdateNewModeSelected =
      selectedSubType === "changeinmodefrequency" &&
      checkedList?.includes("Update New Mode");
    const isNewMandateRegistrationSelected =
      selectedSubType === "newmandateregistration" &&
      checkedList?.includes("New Mandate Registration");
    const isMandateCancellationSelected =
      selectedSubType === "mandatecancellation";
    const isHoldECSDebitSelected = selectedSubType === "holdmandate";
    const isMandateRestartelected = selectedSubType === "restartmandate";
    // const isNewMandateRegistartionSelected =  selectedSubType === "newmandateregistration" && checkedList?.includes("New Mandate Registration")

    if (
      isUpdateNewModeSelected ||
      (!isNewMandateRegistrationSelected &&
        checkedList?.includes("New Mandate Registration")) ||
      isMandateCancellationSelected ||
      isMandateRestartelected ||
      isHoldECSDebitSelected ||
      selectedSubType === "representcheque"
    ) {
      return 2;
    } else if (isNewMandateRegistrationSelected) {
      return 2;
    } else {
      return 1;
    }
  }

  const saveRequest = (values) => {
    //  setIsLoading(true);
    if (values.CustomerSigningDate > values.branchreceiveddate) {
      message.destroy();
      message.error({
        content:
          " customer signing date  can't be greater than  Request Received Date.",
        className: "custom-msg",
        duration: 3,
      });
      form.setFieldsValue({
        CustomerSigningDate: "",
        CustomerSigningDate: "",
      });
      setIsLoader(false);
      return;
    }
    setIsLoading(true);
    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: loginInfo?.userProfileInfo?.profileObj?.role || 0, // Required
      RequestChannel: isEmailManagement
        ? emsrequestchannel
        : loginInfo?.userProfileInfo?.profileObj?.role === 14
        ? 13
        : values.requestchannel, // Required
      Category: getCategory(selectedSubType, checkedList),
      ApplicationNo:
        details?.policyDetailsObj?.identifiers?.applicationNo ||
        customerData?.applicationNo,
      DOB: convertDate(customerData?.dob),
      PolicyNo:
        details?.policyDetailsObj?.identifiers?.policyNo ||
        customerData?.policyNo, // Required
      CustomerId:
        values?.GSTINToBeUpdateFor === 1
          ? customerData?.laClientID
          : customerData?.poClientID,
      CustRole: values?.custRole,
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
      CurrentStatus: raiseRequirementOpen ? "Reject" : "",
      ModifiedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
      AssignedToRole: "", //POS
      AssignedByUser: 0,
      //RequestChannel: 3,
      ReasonForChange: "",
      RequestDateTime: values?.branchreceiveddate
        ? new Date(values?.branchreceiveddate)
        : new Date(),
      ReasonDelayed: values?.resonfordelay || values?.ReasonForDelay,
      CustSignDateTime: values?.CustomerSigningDate
        ? new Date(values?.CustomerSigningDate)
        : new Date(),
      TransactionData: getTransactionData(values) || [],
      CommunicationRequest: [
        {
          SrvReqRefNo: "",
          TemplateID: "",
          CommType: 2,
          ReceipientTo: import.meta.env.VITE_APP_RECEIPIENT_TO
            ? import.meta.env.VITE_APP_RECEIPIENT_TO
            : clientEnquiryData?.rinternet,
          ReceipientCC: values?.emailId?.trim(),
          // ReceipientCC: import.meta.env.VITE_APP_RECEIPIENT_CC ? import.meta.env.VITE_APP_RECEIPIENT_CC : clientEnquiryData?.rinternet,
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
      Uploads: uploadFiles || [],
    };
    // if(showEmailAddress){
    //   obj.CommunicationRequest.push({
    //       "SrvReqRefNo": "",
    //       "TemplateID": "1",
    //       "CommType": '2',
    //       "ReceipientTo": import.meta.env.VITE_APP_RECEIPIENT_CC ? import.meta.env.VITE_APP_RECEIPIENT_CC : clientEnquiryData?.rinternet,
    //       "ReceipientCC": import.meta.env.VITE_APP_RECEIPIENT_CC ? import.meta.env.VITE_APP_RECEIPIENT_CC : clientEnquiryData?.rinternet,
    //       // "ReceipientTo": customerData?.emailID,
    //       // "ReceipientCC": customerData?.emailID,
    //       "MobileNos":"",
    //       "ScheduledTime": new Date(),
    //       "CommBody":"\"PaymentLink\":\"{0}\"",
    //       "Attachments": null
    //   })
    // }

    // if(showWhatsApp||showPhoneNumber){
    //   obj.CommunicationRequest.push(
    //     {
    //       "SrvReqRefNo": "",
    //       "TemplateID": "",
    //       "CommType": '1',
    //       "ReceipientTo": '',
    //       "ReceipientCC": "",
    //        "MobileNos": import.meta.env.VITE_APP_RECEIPIENT_MOBILENO ? import.meta.env.VITE_APP_RECEIPIENT_MOBILENO : clientEnquiryData?.rmblphone,
    //       // "MobileNos": customerData?.mobileNo,
    //       "ScheduledTime": new Date(),
    //       "CommBody":"\"PaymentLink\":\"{0}\"",
    //       "Attachments": null
    //   }
    //   )
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
      obj?.TransactionData?.push({
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
    let response = apiCalls.genericAPI(obj);
    response
      .then((val) => {
        // let value = val?.data?.responseBody;
        if (!val?.data?.srvReqRefNo) {
          setAlertTitle(val?.data?.header);
          setAlertData(val?.data?.message);
          setShowAlert(true);
          setIsLoader(false);
          setRequirementLoader(false);
          return;
        }
        setServiceRequestId(val?.data?.srvReqRefNo);
        if (val?.data?.category == 2) {
          setAlertTitle("Request Created Successfully");
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
          setAlertTitle(
            selectedSubType === "paymentlink"
              ? `Payment Link Sent Successfully`
              : "Query Raised Successfully"
          );
          let successMessage = `Ticket ID Number ${val?.data?.srvReqRefNo}.`;
          setAlertData(successMessage);
        }
        //setNavigateTo('/advancesearch');
        setShowAlert(true);
        setIsLoading(false);
        setRequirementLoader(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setRequirementLoader(false);
      });
  };
  const handleButtonClick = () => {};

  const getInternal = (list) => {
    let values = form.getFieldsValue();
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

  const handleMandateCancel = (selectionItem) => {
    setIsShowRequestDetails(true);
    setIsMandateSelection(selectionItem);
    // setIsLoading(true);
    // let response = apiCalls.getMandateReject(customerData?.poClientID||details?.policyDetailsObj?.identifiers?.po_ClientID,selectionItem?.mandref,customerData?.applicationNo);
    // response
    //   .then((val) => {
    //     if (val?.data?.responseBody?.errorCode !== "1") {
    //       const res = val?.data?.responseBody
    //       setIsLoading(false);
    //     } else {
    //       setIsLoading(false);
    //     }
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //   });
  };

  return (
    <>
      {/* <div style={{ position: 'relative' }}>
      {isLoading && <div className="overlay" />}
      <Spin spinning={isLoading} /> */}
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
                Docs={InternaRequirements}
              />
            </>
          ) : (
            <>
              {selectedSubType === "renewalstatusenquiry" && (
                <>
                  {renderDetailsForm("Comments")}
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
              {selectedSubType === "renewalpaymentoptions" && (
                <>
                  {renderDetailsForm("Comments")}
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
              {selectedSubType === "paymentlink" && (
                <>
                  <div>
                    {errorMsg && ( //Error Message Shown
                      <Alert
                        closable
                        type="error"
                        description={errorMsg}
                        onClose={() => setErrorMsg(null)}
                        showIcon
                      />
                    )}
                    <DetailsForm
                      data={
                        !isShowPOSScreen
                          ? PaymentRelatedData[selectedSubType]?.BOE_Details
                          : PaymentRelatedData[selectedSubType]?.POS_Details ||
                            PaymentRelatedData[selectedSubType]?.BOE_Details
                      }
                      subType={selectedSubType}
                      handleRadioChange={handleRadioChange}
                      handleLinkValue={handleLinkValue}
                      toggleInputField={toggleInputField}
                      showEmailAddress={showEmailAddress}
                      showPhoneNumber={showPhoneNumber}
                      showWhatsApp={showWhatsApp}
                      handleDropdownChange={handleDropdownChange}
                      requestModeLU={requestModeLU}
                    ></DetailsForm>
                  </div>

                  {showEmailFields && (
                    <>
                      <ContactForm
                        showEmailAddress={showEmailAddress}
                        showPhoneNumber={showPhoneNumber}
                        showWhatsApp={showWhatsApp}
                      />
                    </>
                  )}

                  {isShowTransferFields && (
                    <>
                      <div
                        className={
                          props?.fullWidth
                            ? "generate-full seeding-section"
                            : "generate-btn seeding-section"
                        }
                      >
                        {!isShowPOSScreen && (
                          <>
                            {PaymentRelatedData[selectedSubType]?.Buttons?.map(
                              (button, index) => (
                                <Button
                                  type="primary"
                                  className="primary-btn"
                                  key={index}
                                  onClick={() => {
                                    handleButtonClick(button);
                                  }}
                                >
                                  {button.label}
                                </Button>
                              )
                            )}
                          </>
                        )}
                        {isShowPOSScreen && (
                          <>
                            {PaymentRelatedData[
                              selectedSubType
                            ]?.POS_Buttons?.map((button, index) => (
                              <Button
                                type="primary"
                                className="primary-btn"
                                key={index}
                                onClick={() => {
                                  handleButtonClick(button);
                                }}
                              >
                                {button.label}
                              </Button>
                            ))}
                          </>
                        )}
                      </div>
                    </>
                  )}
                  <div className="contact-details-btn">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="primary-btn"
                      disabled={isSubmitDisabled()}
                    >
                      Submit
                    </Button>{" "}
                    {isShowPOSScreen && (
                      <>
                        <Button
                          type="primary"
                          className="primary-btn"
                          onClick={() => getRaiseRequirements()}
                        >
                          Raise Requirement
                        </Button>
                        <>
                          <InternalFlowPOS
                            interlRequirementTagValue1={
                              props.interlRequirementTagValue
                            }
                            selectedList={
                              POSContactData.serviceRequestTransectionData
                            }
                            getInternal={getInternal}
                            selectedSubType={props.selectedSubType}
                            internalReqForm={internalReqForm}
                          />
                        </>
                      </>
                    )}
                  </div>
                </>
              )}
              {/* Payment Link SubType Code End */}
              {/* CHANGE IN MODE SubType Code Start */}
              {selectedSubType === "changeinmodefrequency" && (
                <>
                  {!isShowPOSScreen && (
                    <>
                      {renderDetailsForm("BOE_Details")}
                      <ExistUpdateCheckBoxList
                        checkedList={checkedList}
                        handleChange={handleChange}
                        options={[
                          //{ label: 'View Existing Policy Details', value: 'View Existing Policy Details', name: 'ViewExistingPolicyDetails' },
                          {
                            label: "Update New Mode",
                            value: "Update New Mode",
                            name: "Update New Mode",
                          },
                          {
                            label: "Share Process Communication",
                            value: "Share Process Communication",
                            name: "Share Process Communication",
                          },
                        ]}
                      />
                      {checkedList?.includes(
                        "View Existing Policy Details"
                      ) && (
                        <>{renderDetailsForm("Existing_ModeFreq_Details")}</>
                      )}
                      {checkedList?.includes("Update New Mode") && (
                        <>
                          {renderDetailsForm("Update_ModeFreq_Details")}
                          <Row gutter={[16, 16]} className="reasons-list">
                            <Col
                              xs={24}
                              sm={24}
                              md={12}
                              lg={12}
                              xxl={12}
                              className="loan-checkboxes"
                            >
                              <Form.Item
                                label={
                                  <span>
                                    {"NACH"}

                                    {isSelectionMode === "12" &&
                                      eCGRequestField !== "Active" && (
                                        <sup>*</sup>
                                      )}
                                  </span>
                                }
                                name="nach"
                                className="checkbox-gap"
                                rules={[
                                  {
                                    required:
                                      isSelectionMode === "12" &&
                                      eCGRequestField !== "Active" &&
                                      paymentMethodList?.length === 0
                                        ? true
                                        : false,
                                    message:
                                      isSelectionMode === "12" &&
                                      eCGRequestField !== "Active" &&
                                      paymentMethodList?.length === 0 &&
                                      "select a checkbox",
                                  },
                                ]}
                              >
                                <Checkbox
                                  value="NACH"
                                  checked={paymentMethodList?.includes("NACH")}
                                  onChange={() => handleCheckBoxChange("NACH")}
                                ></Checkbox>
                              </Form.Item>
                            </Col>
                            {/* <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xxl={12}
                className="loan-checkboxes"
              >
                <Form.Item
                  label={
                    <span>
                      {"Standing Instructions"}
                      {isSelectionMode === "12"&& <sup>*</sup>}
                    </span>
                  }
                  name="standinginstructions"
                  rules={[
                    {
                      required:(isSelectionMode === "12"&&paymentMethodList?.length===0) ?  true : false,
                      message:  (isSelectionMode === "12"&&paymentMethodList?.length===0) && "select a checkbox",
                    },
                  ]}
                >
                  <Checkbox
                    value="Standing Instructions"
                    checked={paymentMethodList?.includes(
                      "Standing Instructions"
                    )}
                    onChange={() =>
                      handleCheckBoxChange("Standing Instructions")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col> */}
                          </Row>
                          {isPaymentMethodSelection?.toLocaleLowerCase() ===
                            "nach" &&
                            isSelectionMode !== "12" && (
                              <>
                                {/* {renderDetailsForm("NACH_Details")} */}
                                {renderDetailsForm("Send_ModeChange_Link")}
                                {showEmailFields && (
                                  <>
                                    <ContactForm
                                      showEmailAddress={showEmailAddress}
                                      showPhoneNumber={showPhoneNumber}
                                      showWhatsApp={showWhatsApp}
                                    />
                                  </>
                                )}
                              </>
                            )}
                          {isPaymentMethodSelection?.toLocaleLowerCase() ===
                            "nach" &&
                            isSelectionMode === "12" && (
                              <>
                                {/* {renderDetailsForm("Monthly_MAND_NACH_Details")} */}
                                {renderDetailsForm("Send_ModeChange_Link")}
                                {showEmailFields && (
                                  <>
                                    <ContactForm
                                      showEmailAddress={showEmailAddress}
                                      showPhoneNumber={showPhoneNumber}
                                      showWhatsApp={showWhatsApp}
                                    />
                                  </>
                                )}
                              </>
                            )}
                          {/* {isPaymentMethodSelection?.toLocaleLowerCase()==="standing instructions"&&isSelectionMode!=="12"&&<>
              {renderDetailsForm("SI_Details")}
              </>}
              {isPaymentMethodSelection?.toLocaleLowerCase()==="standing instructions"&&isSelectionMode==="12"&&<>
              {renderDetailsForm("Monthly_MAND_SI_Details")}
              </>} */}
                          {renderDetailsForm("Customer_Choice_Details")}
                          {isShowRequestFormFields && (
                            <>{renderDetailsForm("Request_Details")}</>
                          )}
                          {renderDetailsForm("Comments")}
                        </>
                      )}
                    </>
                  )}
                  {isShowPOSScreen && <>{renderDetailsForm("POS_Details")}</>}

                  {checkedList?.includes("Share Process Communication") && (
                    <>
                      {renderDetailsForm("Send_ModeChange_Link")}
                      {showEmailFields && (
                        <>
                          <ContactForm
                            showEmailAddress={showEmailAddress}
                            showPhoneNumber={showPhoneNumber}
                            showWhatsApp={showWhatsApp}
                          />
                        </>
                      )}
                    </>
                  )}

                  <div className="contact-details-btn">
                    {(checkedList?.length > 0 || isShowPOSScreen) && (
                      <>
                        <Button
                          type="primary"
                          className="primary-btn"
                          htmlType="submit"
                          disabled={
                            (showRaiseRequirementBtn && !isShowPOSScreen) ||
                            (isShowPOSScreen && disableApproveBtn) ||
                            isSubmitDisabled()
                          }
                        >
                          {!isShowPOSScreen ? "Submit" : "Approve"}
                        </Button>
                      </>
                    )}

                    {isShowPOSScreen && (
                      <>
                        <Button
                          type="primary"
                          className="primary-btn"
                          onClick={() => getRaiseRequirements()}
                        >
                          Raise Requirement
                        </Button>
                        <>
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
                                selectedSubType={props.selectedSubType}
                                internalReqForm={internalReqForm}
                              />
                            </>
                          )}
                        </>
                      </>
                    )}

                    {!isShowPOSScreen &&
                      checkedList.length > 0 &&
                      checkedList[0] === "Update New Mode" && (
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
              {/*CHANGE IN MODE SubType Code End */}

              {/* NEW MANDATE REGISTRATION SubType Code Start */}
              {selectedSubType === "newmandateregistration" && (
                <>
                  {!isShowPOSScreen && (
                    <>
                      <ExistUpdateCheckBoxList
                        checkedList={checkedList}
                        handleChange={handleChange}
                        options={[
                          {
                            label: "View Current Mandate Details",
                            value: "View Current Mandate Details",
                            name: "ViewExistingMandateDetails",
                          },
                          {
                            label: "New Mandate Registration",
                            value: "New Mandate Registration",
                            name: "New Mandate Registration",
                          },
                          // { label: 'Send Mode Change Link', value: 'Send Mode Change Link', name: 'Send Mode Change Link' },
                        ]}
                      />
                      {checkedList?.includes(
                        "View Current Mandate Details"
                      ) && (
                        <>
                          {renderDetailsForm("Existing_Details")}

                          {!isShowPOSScreen && (
                            <>{renderDetailsForm("NACH_Details")}</>
                          )}

                          {/* {isPaymentMethodSelection?.toLocaleLowerCase()==="nach"&&<>
            
              </>} */}
                          {/* {isPaymentMethodSelection?.toLocaleLowerCase()==="standing instructions"&&<>
              {renderDetailsForm("SI_Details")}
              </>} */}
                          {renderDetailsForm("Customer_Choice_Details")}
                          {isShowRequestFormFields && (
                            <>{renderDetailsForm("Request_Details")}</>
                          )}
                          {renderDetailsForm("Comments")}
                        </>
                      )}
                    </>
                  )}
                  {isShowPOSScreen && <>{renderDetailsForm("POS_Details")}</>}

                  {checkedList?.includes("New Mandate Registration") && (
                    <>
                      {renderDetailsForm("Send_ModeChange_Link")}
                      {showEmailFields && (
                        <>
                          <ContactForm
                            showEmailAddress={showEmailAddress}
                            showPhoneNumber={showPhoneNumber}
                            showWhatsApp={showWhatsApp}
                          />
                        </>
                      )}
                    </>
                  )}

                  <div className="contact-details-btn">
                    {(checkedList?.length > 0 || isShowPOSScreen) && (
                      <>
                        <Button
                          type="primary"
                          className="primary-btn"
                          htmlType="submit"
                        >
                          {!isShowPOSScreen ? "Submit" : "Approve"}
                        </Button>
                      </>
                    )}

                    {/* {(isShowPOSScreen||showRaiseRequirementBtn) && (
              <>
                <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
              </>
            )} */}
                  </div>
                </>
              )}
              {/*NEW MANDATE REGISTRATION SubType Code End */}
              {/*Hold ECS Debit SubType Code Start */}
              {/* {selectedSubType==="holdmandate" && <>
          {!isShowPOSScreen && (
            <>
              <CheckBoxList
                checkedList={checkedList}
                handleChange={handleChange}
                options={[
                  { label: 'View Current Mandate Details', value: 'View Current Mandate Details', name: 'ViewExistingAgentCodeDetails' },
                  { label: 'Register Hold Request', value: 'Register Hold Request', name: 'UpdateAgentCodeDetails' },
                ]}
              />
              {checkedList?.includes('View Current Mandate Details') && 
              <>
               {renderDetailsForm('BOE_Details')}
               {renderDetailsForm('NACH_Details')}
               </>}
              {checkedList?.includes('Register Hold Request') && <>
              {renderDetailsForm('Register_HOLD_Request')}
              {renderDetailsForm('Customer_Choice_Details')}
              {isShowRequestFormFields&&<>
                {renderDetailsForm('Request_Details')}
              </>}
              {renderDetailsForm('Comments')}
              </>}
             
            </>
          )}
          {isShowPOSScreen&&<>
            {renderDetailsForm("POS_Details")}
          </>}
          <div className="contact-details-btn">
            {(checkedList?.length>0||isShowPOSScreen)&&<>
            <Button type="primary" className="primary-btn" htmlType="submit" 
            >
              {!isShowPOSScreen
                ? "Submit"
                : "Approve"}
            </Button>
            </>}

            {(isShowPOSScreen) && (
              <>
                <Button
                  type="primary"
                  className="primary-btn"
                 onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
                {isShowPOSScreen &&(
                        <>
                           <InternalFlowPOS interlRequirementTagValue1 = {props.interlRequirementTagValue} selectedList = {POSContactData.serviceRequestTransectionData} getInternal = {getInternal} selectedSubType = {props.selectedSubType}/>
                        </>
                      )}
              </>
            )}
          </div>
          </>}  */}
              {/*Hold ECS Debit SubType Code End */}
              {/*Mandate Cancellation SubType Code Start */}
              {(selectedSubType === "mandatecancellation" ||
                selectedSubType === "holdmandate" ||
                selectedSubType === "restartmandate") && (
                <>
                  {!isShowPOSScreen && (
                    <>
                      {/* <CheckBoxList
                checkedList={checkedList}
                handleChange={handleChange}
                options={[
                  { label: 'View Current Mandate Details', value: 'View Current Mandate Details', name: 'ViewExistingAgentCodeDetails' },
                  { label: 'Cancel Mandate', value: 'Cancel Mandate', name: 'CancelMandate' },
                ]}
              /> */}
                      {/* {checkedList?.includes('View Current Mandate Details') && 
              <>
          
               <div className="table-container" style={{ marginTop: "0px" }}>
<table className="mandatecancel-table">
  <thead>
    <tr>
      <td>Account Number</td>
      {mandateDetailsData?.map((item, index) => (
        <td key={index}>{item.bankacckey}</td>
      ))}
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Mandate Type</td>
      {mandateDetailsData?.map((item, index) => (
        <td key={index}>
          {item?.zmandtag === "P" ? "Primary" : item?.zmandtag === "S" ? "Secondary" : item?.zmandtag === "T" ? "Tertiary" : item?.zmandtag}
        </td>
      ))}
    </tr>
    <tr>
      <td>Mandate Status</td>
      {mandateDetailsData?.map((item, index) => (
        <td key={index}>{item.mandstat === "10" ? "Live" : "Cancelled"}</td>
      ))}
    </tr>
    <tr>
      <td>Payment Method</td>
      {mandateDetailsData?.map((item, index) => (
        <td key={index}>{item.paymentMethod}</td> // Replace with the actual field name for payment method
      ))}
    </tr>
    <tr>
      <td>Registered On</td>
      {mandateDetailsData?.map((item, index) => (
        <td key={index}>{item.effdate}</td>
      ))}
    </tr>
    <tr>
      <td>Max Debit Amount</td>
      {mandateDetailsData?.map((item, index) => (
        <td key={index}>{isMaxDebitAmount}</td> // Replace with the actual field name for max debit amount
      ))}
    </tr>
    <tr>
      <td>Bank Name</td>
      {mandateDetailsData?.map((item, index) => (
        <td key={index}>{item.bankkey}</td>
      ))}
    </tr>
    <tr>
      <td>NACH Valid Till</td>
      {mandateDetailsData?.map((item, index) => (
        <td key={index}>{handleAddYears()}</td> // Replace with the actual function to calculate NACH valid till
      ))}
    </tr>
  </tbody>
  {mandateDetailsData?.length === 0 && (
    <tfoot>
      <tr>
        <td colSpan={mandateDetailsData.length + 1}>
          <div className="text-center"><span>No data available</span></div> 
        </td>
      </tr>
    </tfoot>
  )}
</table>


        </div>
               </>} */}

                      <h4 className="subtype-headings fs-16 fw-500">
                        {selectedSubType === "restartmandate"
                          ? "Kindly select the account number against which you wish to initiate restart request"
                          : " Kindly select the account number against which you wish to initiate cancellation"}
                      </h4>
                      {"  "}
                      <div
                        className="table-container mb-16"
                        style={{ marginTop: "0px" }}
                      >
                        <table className="mandatecancel-table">
                          <thead>
                            <tr>
                              <td>Account Number</td>
                              {mandateDetailsData?.map((item, index) => (
                                <td key={index}>
                                  {item.bankacckey}
                                  {/* <input
                type="checkbox"
                checked={selectedCheckbox === index}
                onChange={() => handleCheckboxChange(index)}
              /> */}
                                  <span className="ml-8">
                                    <Checkbox
                                      checked={selectedCheckbox === index}
                                      onChange={() =>
                                        handleACCCheckboxChange(index, item)
                                      }
                                    ></Checkbox>
                                  </span>
                                </td>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Mandate Type</td>
                              {mandateDetailsData?.map((item, index) => (
                                <td key={index}>
                                  {item?.zmandtag === "P"
                                    ? "Primary"
                                    : item?.zmandtag === "S"
                                    ? "Secondary"
                                    : item?.zmandtag === "T"
                                    ? "Tertiary"
                                    : item?.zmandtag}
                                </td>
                              ))}
                            </tr>
                            {/* <tr>
      <td>Mandate Status</td>
      {mandateDetailsData?.map((item, index) => (
        <td key={index}>{item.mandstat === "10" ? "Live" : "Cancelled"}</td>
      ))}
    </tr> */}
                            <tr>
                              <td>Mandate Status (Ref)</td>
                              {mandateDetailsData?.map((item, index) => {
                                // Find the matching entry from MasterList
                                const matchedItem = mandStatusLU?.find(
                                  (m) => m.extrL_KEY === item.mandstat
                                );
                                // Format mandref inside parentheses if it exists
                                const mandrefText = item?.mandref
                                  ? ` (${item.mandref})`
                                  : "";
                                return (
                                  <td key={index}>
                                    {matchedItem
                                      ? `${matchedItem.mstDesc}${mandrefText}`
                                      : ""}
                                  </td>
                                );
                              })}
                            </tr>
                            <tr>
                              <td>Payment Method</td>
                              {mandateDetailsData?.map((item, index) => (
                                <td key={index}>{item.paymentMethod}</td> // Replace with the actual field name for payment method
                              ))}
                            </tr>
                            <tr>
                              <td>Registered On</td>
                              {mandateDetailsData?.map((item, index) => (
                                <td key={index}>
                                  {item.effdate
                                    ? convertDate(item.effdate)
                                    : ""}
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td>Max Debit Amount</td>
                              {mandateDetailsData?.map((item, index) => (
                                <td key={index}>{isMaxDebitAmount}</td> // Replace with the actual field name for max debit amount
                              ))}
                            </tr>
                            <tr>
                              <td>Bank Name</td>
                              {mandateDetailsData?.map((item, index) => (
                                <td key={index}>{item.bankkey}</td>
                              ))}
                            </tr>
                            <tr>
                              <td>NACH Valid Till</td>
                              {mandateDetailsData?.map((item, index) => (
                                <td key={index}>{handleAddYears()}</td> // Replace with the actual function to calculate NACH valid till
                              ))}
                            </tr>
                          </tbody>
                          {mandateDetailsData?.length === 0 && (
                            <tfoot>
                              <tr>
                                <td colSpan={mandateDetailsData.length + 1}>
                                  <div className="text-center">
                                    <span>No data available</span>
                                  </div>
                                </td>
                              </tr>
                            </tfoot>
                          )}
                        </table>
                      </div>

                      {/* {renderDetailsForm('Register_HOLD_Requests')} */}

                      {selectedCheckbox !== null && (
                        <>
                          {selectedSubType !== "restartmandate" && (
                            <>{renderDetailsForm("Register_HOLD_Request")}</>
                          )}
                          {renderDetailsForm("Customer_Choice_Details")}
                          {isShowRequestFormFields && (
                            <>{renderDetailsForm("Request_Details")}</>
                          )}
                          {renderDetailsForm("Comments")}
                        </>
                      )}
                    </>
                  )}
                  {isShowPOSScreen &&
                    (selectedSubType === "mandatecancellation" ||
                      selectedSubType === "restartmandate") && (
                      <>
                        <h4 className="subtype-headings fs-16 fw-500">
                          View Account Details
                        </h4>
                        {"  "}
                        <div
                          className="table-container mb-16"
                          style={{ marginTop: "0px" }}
                        >
                          <table className="mandatecancel-table">
                            <thead>
                              <tr>
                                <td>Account Number</td>
                                <td>{isPOSMandateData?.BankAccountNo}</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Mandate Type</td>
                                <td>
                                  {isPOSMandateData?.MandateType === "P"
                                    ? "Primary"
                                    : isPOSMandateData?.MandateType === "S"
                                    ? "Secondary"
                                    : isPOSMandateData?.MandateType}
                                </td>
                              </tr>
                              <tr>
                                {/* <td>Mandate Status</td>
      <td>{isPOSMandateData?.MandateStatus === "10" ? "Live" : "Cancelled"}</td> */}
                                <td>Mandate Status (Ref)</td>
                                {(() => {
                                  // Find the matching entry from mandStatusLU
                                  const matchedItem = mandStatusLU?.find(
                                    (m) =>
                                      m.extrL_KEY ===
                                      isPOSMandateData?.MandateStatus
                                  );

                                  // Format mandref inside parentheses if it exists
                                  const mandrefText =
                                    isPOSMandateData?.selectionMandRef
                                      ? ` (${isPOSMandateData.selectionMandRef})`
                                      : "";

                                  return (
                                    <td>
                                      {matchedItem
                                        ? `${matchedItem.mstDesc}${mandrefText}`
                                        : ""}
                                    </td>
                                  );
                                })()}
                              </tr>
                              <tr>
                                <td>Payment Method</td>
                                <td></td>
                              </tr>
                              <tr>
                                <td>Registered On</td>
                                <td>{isPOSMandateData?.RegisteredOn}</td>
                              </tr>
                              <tr>
                                <td>Max Debit Amount</td>
                                <td>{isMaxDebitAmount}</td>
                              </tr>
                              <tr>
                                <td>Bank Name</td>
                                <td>{isPOSMandateData.BankName}</td>
                              </tr>
                              <tr>
                                <td>NACH Valid Till</td>
                                <td>{handleAddYears()}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        {renderDetailsForm("POS_Details")}
                      </>
                    )}

                  <div className="contact-details-btn">
                    <Button
                      type="primary"
                      className="primary-btn"
                      htmlType="submit"
                      disabled={selectedCheckbox === null && !isShowPOSScreen}
                    >
                      {!isShowPOSScreen ? "Submit" : "Approve"}
                    </Button>
                    <Button
                      type="primary"
                      className="primary-btn"
                      onClick={() => getRaiseRequirements()}
                      disabled={selectedCheckbox === null && !isShowPOSScreen}
                    >
                      Raise Requirement
                    </Button>
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
                          selectedSubType={props.selectedSubType}
                          InternalFlowPOS={InternalFlowPOS}
                        />
                      </>
                    )}
                  </div>
                </>
              )}
              {/*Mandate Cancellation SubType Code End */}
              {/*Re-Start mandate SubType Code Start */}
              {/* {selectedSubType==="restartmandate" && <>
          {!isShowPOSScreen && (
            <>
              <CheckBoxList
                checkedList={checkedList}
                handleChange={handleChange}
                options={[
                  { label: 'View Current Mandate Details', value: 'View Current Mandate Details', name: 'ViewExistingAgentCodeDetails' },
                  { label: 'Request For Re-Start', value: 'Request For Re-Start', name: 'RequestForReStart' },
                ]}
              />
              {checkedList?.includes('View Current Mandate Details') && 
              <>
               {renderDetailsForm('BOE_Details')}
               {renderDetailsForm('NACH_Details')}
               </>}
              {checkedList?.includes('Request For Re-Start') && <>
               {renderDetailsForm('Register_HOLD_Request')}
               {renderDetailsForm('Customer_Choice_Details')}
              {isShowRequestFormFields&&<>
                {renderDetailsForm('Request_Details')}
              </>}
              {renderDetailsForm('Comments')}
               </>}
              
          
            </>
          )}
          {isShowPOSScreen&&<>
            {renderDetailsForm("POS_Details")}
          </>}
          <div className="contact-details-btn">
            {(checkedList?.length>0||isShowPOSScreen)&&<>
            <Button type="primary" className="primary-btn" htmlType="submit" 
            >
              {!isShowPOSScreen
                ? "Submit"
                : "Approve"}
            </Button>
            </>}

            {(isShowPOSScreen) && (
              <>
                <Button
                  type="primary"
                  className="primary-btn"
                 onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
                {isShowPOSScreen &&(
                        <>
                           <InternalFlowPOS interlRequirementTagValue1 = {props.interlRequirementTagValue} selectedList = {POSContactData.serviceRequestTransectionData} getInternal = {getInternal} selectedSubType = {props.selectedSubType}/>
                        </>
                      )}
              </>
            )}
          </div>
          </>}  */}
              {/*Mandate Cancellation SubType Code End */}
              {/*Re-Debit Stop SubType Code Start */}
              {selectedSubType === "redebitstop" && (
                <>
                  {!isShowPOSScreen && (
                    <>
                      <CheckBoxList
                        checkedList={checkedList}
                        handleChange={handleChange}
                        options={[
                          {
                            label: "View Current Mandate Details",
                            value: "View Current Mandate Details",
                            name: "ViewExistingAgentCodeDetails",
                          },
                          {
                            label: "Request Re-Debit Stop",
                            value: "Request Re-Debit Stop",
                            name: "RequestRe-DebitStop",
                          },
                        ]}
                      />
                      {checkedList?.includes(
                        "View Current Mandate Details"
                      ) && (
                        <>
                          {renderDetailsForm("BOE_Details")}
                          {renderDetailsForm("NACH_Details")}
                        </>
                      )}
                      {checkedList?.includes("Request Re-Debit Stop") && (
                        <>
                          {renderDetailsForm("Request_ReDebit_Details")}
                          {renderDetailsForm("Customer_Choice_Details")}
                          {isShowRequestFormFields && (
                            <>{renderDetailsForm("Request_Details")}</>
                          )}
                          {renderDetailsForm("Comments")}
                        </>
                      )}
                    </>
                  )}
                  {isShowPOSScreen && <>{renderDetailsForm("POS_Details")}</>}
                  <div className="contact-details-btn">
                    {(checkedList?.length > 0 || isShowPOSScreen) && (
                      <>
                        <Button
                          type="primary"
                          className="primary-btn"
                          htmlType="submit"
                        >
                          {!isShowPOSScreen ? "Submit" : "Approve"}
                        </Button>
                      </>
                    )}

                    {isShowPOSScreen ? (
                      <>
                        <Button
                          type="primary"
                          className="primary-btn"
                          onClick={() => getRaiseRequirements()}
                        >
                          Raise Requirement
                        </Button>
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
                              selectedSubType={props.selectedSubType}
                              InternalFlowPOS={InternalFlowPOS}
                            />
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <Button
                          type="primary"
                          className="primary-btn"
                          onClick={() => getRaiseRequirements()}
                        >
                          Raise Requirement
                        </Button>
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
                              selectedSubType={props.selectedSubType}
                              InternalFlowPOS={InternalFlowPOS}
                            />
                          </>
                        )}
                      </>
                    )}
                  </div>
                </>
              )}
              {/*Re-Debit Stop SubType Code End */}
              {/*Represent Cheque SubType Code Start */}
              {selectedSubType === "representcheque" && (
                <>
                  {!isShowPOSScreen && (
                    <>
                      {renderDetailsForm("BOE_Details")}
                      {isShowChequeNoFields && (
                        <>
                          {renderDetailsForm("CheckNumber_Fields")}
                          {isShowRequestFormFields && (
                            <>{renderDetailsForm("RequestForm_Fields")}</>
                          )}
                          {renderDetailsForm("Comments")}
                        </>
                      )}
                    </>
                  )}
                  {isShowPOSScreen && (
                    <>
                      {renderDetailsForm("PA_Details")}
                      {/* {renderDetailsForm("POS_RequestDetails")}
            {renderDetailsForm("POS_Action")} */}
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
                  <div className="contact-details-btn">
                    {(isShowChequeNoFields || isShowPOSScreen) && (
                      <>
                        <Button
                          type="primary"
                          className="primary-btn"
                          htmlType="submit"
                          disabled={
                            showRaiseRequirementBtn ||
                            (isShowPOSScreen && disableApproveBtn) ||
                            isExpired
                          }
                        >
                          {!isShowPOSScreen ? "Submit" : "Approve"}
                        </Button>
                        {isShowPOSScreen ? (
                          <>
                            <Button
                              type="primary"
                              className="primary-btn"
                              onClick={() => getRaiseRequirements()}
                            >
                              Raise Requirement
                            </Button>
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
                                  selectedSubType={props.selectedSubType}
                                  InternalFlowPOS={InternalFlowPOS}
                                />
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <Button
                              type="primary"
                              className="primary-btn"
                              onClick={() => getRaiseRequirements()}
                              disabled={isExpired}
                            >
                              Raise Requirement
                            </Button>
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
                                  selectedSubType={props.selectedSubType}
                                  InternalFlowPOS={InternalFlowPOS}
                                />
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                    {loginInfo?.userProfileInfo?.profileObj?.userName ===
                      "pauser" &&
                      isShowChequeNoFields && (
                        <>
                          <InternalFlowPOS
                            interlRequirementTagValue1={
                              props.interlRequirementTagValue
                            }
                            selectedList={
                              POSContactData.serviceRequestTransectionData
                            }
                            getInternal={getInternal}
                            InternalFlowPOS={InternalFlowPOS}
                          />
                        </>
                      )}
                  </div>
                </>
              )}
            </>
          )}

          {selectedSubType === "mandatedetails" && (
            <>
              <div className="table-container" style={{ marginTop: "0px" }}>
                <table className="responsive-table">
                  <tr>
                    <th>Mandate Type</th>
                    <th>Payment Method</th>
                    <th>Mandate Status</th>
                    <th>Registered On</th>
                    <th>Bank Name</th>
                    <th>Bank Account Number</th>
                    <th>Preferred Debit Day</th>
                    <th>Max Debit Amount</th>
                    <th>NACH Valid Till</th>
                  </tr>
                  {mandateDetailsData?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {item?.zmandtag === "P" ? "Primary" : "Secondary"}
                      </td>
                      <td></td>
                      <td>{item.mandstat === "10" ? "Live" : "Cancelled"}</td>
                      <td>{item.effdate}</td>
                      <td>{item.bankkey}</td>
                      <td>{item.bankacckey}</td>
                      <td>{isPreferredDebit}</td>
                      <td>{isMaxDebitAmount}</td>
                      <td>{handleAddYears()}</td>
                    </tr>
                  ))}
                  {mandateDetailsData?.length === 0 && (
                    <tr>
                      <td colspan="9">
                        <div className="text-center">
                          <span>No data available</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </table>
              </div>
              <div className="contact-details-btn">
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit"
                >
                  {" "}
                  Submit
                </Button>
              </div>
            </>
          )}
        </Form>
      </Spin>
      {/*Remove getAdvance={props.getAdvance} changes done by Sayali on 21-05-2025 for Mode_changes*/}
      {showAlert && (
        <PopupAlert
          alertData={alertData}
          title={alertTitle}
          navigate={navigateTo}
          setShowAlert={setShowAlert}
        ></PopupAlert>
      )}
      <Modal
        title="Payment Details"
        open={paymentDetailsOpen}
        destroyOnClose={true}
        width={1000}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setPaymentDetailsOpen(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="table-container">
          <table className="responsive-table">
            <tr>
              <td width={50}>Base Premium</td>
              <td width={70}>{data.basePremium?.toLocaleString()}</td>
            </tr>
            <tr>
              <td>(+) Rider Premium</td>
              <td>{data.riderPremium?.toLocaleString()}</td>
            </tr>
            <tr>
              <td>(+) GST</td>
              <td>{data.GST?.toLocaleString()}</td>
            </tr>
            <tr>
              <td>(+) Interest, If any</td>
              <td>{data.interestIfany?.toLocaleString()}</td>
            </tr>
            <tr>
              <td>(-) Waiver Of Interest</td>
              <td>{data.waiverOfInterest?.toLocaleString()}</td>
            </tr>
            <tr>
              <td>(-) Suspense</td>
              <td>{data.suspense?.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Total Premium Due</td>
              <td>{data.totalPremium?.toLocaleString()}</td>
            </tr>
          </table>

          {/* <div className="contact-details-btn">
            <Button type="primary" className="primary-btn" onClick={()=>handleOk()}>
              Ok
            </Button>
            <Button type="primary" className="primary-btn" onClick={()=>setRaiseRequirementOpen(false)}>
              Cancel
            </Button>
          </div> */}
        </div>
      </Modal>
      <Modal
        title="OTP Verification"
        open={isModalOpen}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => handleSendOTPClose()}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        {sendOTPErrorMsg && (
          <Alert
            closable
            type="error"
            description={sendOTPErrorMsg}
            onClose={() => setSendOTPErrorMsg(null)}
            showIcon
          />
        )}
        <Spin spinning={sendOTPLoader}>
          <Input
            type="text"
            className="input-label"
            value={otpValue}
            placeholder="Enter Verification Code"
            maxLength={6}
            disabled={!isDisableOTPInput}
            onChange={(e) => {
              handleOTPChange(e);
            }}
          />
          {counter > 0 && isCounterEnable && (
            <>
              <p className="time-count">Resend OTP in {counter} sec</p>
            </>
          )}
          {counter <= 0 && !isCounterEnable && (
            <>
              <p className="resend-otp">
                OTP to be sent{" "}
                {/* {(
                  props?.details?.sentDetailsObj?.mobileNo ||
                  props?.customerData?.mobileNo
                )?.replace(/.(?=.{4})/g, "x")} */}
                {sendOTPTo?.includes("@")
                  ? sendOTPTo
                  : sendOTPTo?.replace(/.(?=.{4})/g, "x")}
              </p>
            </>
          )}
          <div className="text-center modal-validate">
            <Button
              type="primary"
              className="primary-btn"
              onClick={() => handleSendOTP()}
              disabled={counter > 0}
            >
              {(!validateBtnDisable && "Send OTP") || "Resend OTP"}
            </Button>
            <Button
              type="primary"
              className="primary-btn"
              onClick={() => {
                handleOTP(true);
              }}
              disabled={!validateBtnDisable}
            >
              Validate
            </Button>
          </div>
        </Spin>
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
                  {raiseRequerimentList?.map((item, ind) => (
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
                  disabled={isSubmitDisabled()}
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
        title=""
        open={msgModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setMsgModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div>First debit will be 2 times the new modal premium</div>
        <div className="text-center modal-validate">
          <Button
            type="primary"
            className="primary-btn"
            onClick={() => setMsgModal(false)}
          >
            OK
          </Button>
        </div>
      </Modal>
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
export default PaymentRelated;
