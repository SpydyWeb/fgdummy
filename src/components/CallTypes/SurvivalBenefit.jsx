import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Form, Spin, Button, Checkbox, message, Modal } from "antd";
import { SurvivalBenefitData } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import moment from "moment";
import UploadIcon from "../../assets/images/upload.png";
import apiCalls from "../../api/apiCalls";
import PopupAlert from "../popupAlert";
import dayjs from "dayjs";
import OTPModal from "../../utils/OTPModal";
import { Data } from "../../mainconfig";
import InternalFlow from "../InternalFlow/InternalFlow";
import InternalFlowPOS from "../InternalFlow/InternalFlowPOS";
import RaiseRequirementPopup from "../RaiseRequirementPopup";
import { billFreq } from "../../utils/constantLU";

const SurvivalBenefit = (props) => {
  const loginInfo = useSelector((state) => state);

  const {
    selectedSubType,
    clientRoleLU,
    setSelectedSubType,
    typesForm,
    details,
    customerData,
    POSContactData,
    requestModeLU,
    clientEnquiryData,
    isEmailManagement,
  } = props;
  const suffix = <img src={UploadIcon} alt="" />;
  const [form] = Form.useForm();
  const [requirementsForm] = Form.useForm();
  const [internalReqForm] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showResonDelayField, setShowReasonDelayField] = useState(false);
  const [isShowPOSScreen, setIsShowPOSScreen] = useState(false);
  const [selectCheckBox, setSelectCheckBox] = useState(false);
  const [showNewSignatureFields, setShowNewSignatureFields] = useState(false);
  const [showSiganatureProcess, setShowSignatureProcess] = useState(false);
  const [showRaiseRequirementBtn, setShowRaiseRequirementBtn] = useState(false);
  const [showEmailFields, setShowEmailFields] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmailAddress, setShowEmailAddress] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [activeEmailIcons, setActiveEmailIcons] = useState([]);
  const [activeMobileIcons, setActiveMobileIcons] = useState([]);
  const [activeWhatsAppIcons, setActiveWhatsAppIcons] = useState([]);
  const [isRTOSelection, setIsRTOSelection] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertData, setAlertData] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [isShowOTPModal, setIsShowOTPModal] = useState(false);
  const [isShowRequestDetails, setIsShowRequestDetails] = useState(false);
  const [ClientEnquiry, setClientEnquiry] = useState({});
  const [disableOTP, setDisableOTP] = useState(false);
  const [validateOTPSuccess, setValidateOTPSuccess] = useState(false);
  const [disableRequestForm, setDisableRequestForm] = useState(false);
  const [updateFields, setUpdateFields] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [serviceRequestId, setServiceRequestId] = useState(null);
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);
  const [InternaRequirements, setInternalFlowRequirements] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const boeScreenObj = {};
  const [isUpdateModeLU, setIsUpdateModeLU] = useState([]);

  const POSFrequencyChangeObj = {};

  const newModeLU = [
    { label: "Monthly", value: "12" },
    { label: "Quarterly", value: "04" },
    { label: "Semi Annual", value: "02" },
    { label: "Annual", value: "01" },
  ];
  useEffect(() => {
    setShowAlert(false);
    setShowEmailFields(false);
    setActiveEmailIcons([]);
    setActiveMobileIcons([]);
    setActiveWhatsAppIcons([]);
    getClientEnquiry();
    setDisableRequestForm(false);
    form.resetFields();
    //  if(selectedSubType==="frequencychange"&& !["E91", "E92", "E97", "E98"]?.includes(details?.policyDetailsObj?.planAndStatus?.planCode)){
    //     setAlertTitle("");
    //     setAlertData("Survival Benefit Frequency Change is not applicable for this plan!");
    //     setNavigateTo("/advancesearch");
    //     setShowAlert(true);
    //     return;
    //   }
    GetSBfrequencyEnquiry();
  }, [selectedSubType]);
  useEffect(() => {
    if (isEmailManagement) {
      SurvivalBenefitData[selectedSubType]?.BOE_Details?.forEach((element) => {
        if (element?.label === "Request Mode") {
          form.setFieldsValue({
            // requestchannel: "Email"
            requestchannel: 4,
          });
          element.disabled = true;
        }
        if (element?.name === "customerchoice") {
          element.hide = true;
        }
      });

      if (SurvivalBenefitData[selectedSubType]?.Comments) {
        SurvivalBenefitData[selectedSubType].Comments = [
          {
            name: "AdditionalNoteForCustomer",
            label: "Additional Note For Customer",
            inputType: "complaintbox",
            maxlength: 4000,
            required: false,
            validationmsg: "Additional Note For Customer",
            placeholder: "Additional Note For Customer",
            width: "100%",
            rows: 4,
          },
        ];
      }
    }
  }, [selectedSubType]);
  useEffect(() => {
    if (
      POSContactData &&
      customerData?.isPOS &&
      selectedSubType === "frequencychange"
    ) {
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        POSFrequencyChangeObj[element.tagName] = element.tagValue;
      });

      setIsShowPOSScreen(true);
      setUpdateFields(false);
      form.setFieldsValue({
        ExistingSurvivalFrequency:
          POSFrequencyChangeObj?.ExistingSurvivalFrequency,
        ExistingPayoutAmount: POSFrequencyChangeObj?.ExistingPayoutAmount,
        NewSurivalFrequency: POSFrequencyChangeObj?.NewSurivalFrequency,
        NewPayoutAmount: POSFrequencyChangeObj?.NewPayoutAmount,
        RequestMode: POSFrequencyChangeObj?.RequestMode,
        RequestorComments: POSFrequencyChangeObj?.RequestorComments,
        ValidateSignature: POSFrequencyChangeObj?.ValidateSignature,
        CustomerSigningDate: POSContactData?.custSignDateTime
          ? convertDate(POSContactData?.custSignDateTime)
          : POSContactData?.custSignDateTime,
        BranchReceivedDate: POSContactData?.requestDateTime
          ? convertDate(POSContactData?.requestDateTime)
          : POSContactData?.requestDateTime,
        ReasonForDelay: POSContactData?.reasonDelayed,
        requestchannel: POSContactData?.reqMode,
      });
      if (POSFrequencyChangeObj?.ValidatedBy === "requestform") {
        SurvivalBenefitData[selectedSubType]?.POS_Details?.forEach(
          (element) => {
            if (
              element?.label === "Request Form" ||
              element?.label?.includes("Customer Signing Date") ||
              element?.label?.includes("Request Received Date") ||
              element?.label === "Signature Validated"
            ) {
              element.hide = false;
              setUpdateFields(true);
            }
          }
        );
      } else if (POSFrequencyChangeObj?.ValidatedBy === "otp") {
        SurvivalBenefitData[selectedSubType]?.POS_Details?.forEach(
          (element) => {
            if (
              element?.label === "Request Form" ||
              element?.label?.includes("Customer Signing Date") ||
              element?.label?.includes("Request Received Date") ||
              element?.label === "Signature Validated"
            ) {
              element.hide = true;
              setUpdateFields(true);
            }
          }
        );
      }
    }
    if (customerData?.isBOE) {
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        boeScreenObj[element.tagName] = element.tagValue;
      });
      setIsShowPOSScreen(false);
      if (selectedSubType === "frequencychange") {
        form.setFieldsValue({
          ExistingSurvivalFrequency: boeScreenObj?.ExistingSurvivalFrequency,
          ExistingPayoutAmount: boeScreenObj?.ExistingPayoutAmount,
          NewSurivalFrequency: boeScreenObj?.NewSurivalFrequency,
          NewPayoutAmount: boeScreenObj?.NewPayoutAmount,
          RequestMode: boeScreenObj?.RequestMode,
          ValidateSignature: boeScreenObj?.ValidateSignature,
          RequestorComments: boeScreenObj?.RequestorComments,
          ValidatedBy: boeScreenObj?.ValidatedBy,
        });
        // if(boeScreenObj?.custRole){
        //   getClientEnquiry(boeScreenObj?.custRole);
        // }
        Data[selectedSubType]?.Checklist?.forEach((element) => {
          if (element?.label === "Requestor  Comments") {
            element.hide = true;
          }
        });
      }
    }
  }, []);

  const getClientEnquiry = async () => {
    try {
      setIsLoading(true);
      //setDisableOTP(true);
      const clientNumber = customerData?.poClientID;
      const obj = { clientNumber };
      const response = await apiCalls.getClientEnquiry(
        obj,
        loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID
      );
      if (response?.data) {
        const res = response?.data?.responseBody;
        setClientEnquiry(res);
        // if(res?.rmblphone){
        //     setDisableOTP(false);
        //   }
        setIsLoading(false);
      } else {
        setIsLoading(false);
        handleError(
          response?.data?.responseBody?.errormessage ||
            "Something went wrong, please try again!"
        );
      }
    } catch (error) {
      setIsLoading(false);
      handleError("Something went wrong, please try again!");
    }
  };

  const GetSBfrequencyEnquiry = () => {
    setIsLoading(true);
    setShowAlert(false);
    let empID = loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID;
    let response = apiCalls.GetSBfrequencyEnquiry(
      customerData?.policyNo,
      empID
    );
    response
      .then((val) => {
        if (val?.data) {
          // Initialize variables to keep track of the maximum date and its corresponding record
          // let maxDate = new Date(0);
          // let maxRecord = null;
          let res = val?.data?.responseBody;

          form.setFieldsValue({
            ExistingSurvivalFrequency: res ? billFreq[res?.sbfreq] : "",
            LastCOEUpdateDate: res?.zsigdate
              ? convertDate(res?.zsigdate)
              : res?.zsigdate,
            COEValidFrom: res?.zsigdate
              ? convertDate(res?.zsigdate)
              : res?.zsigdate,
            COEValidTo: res?.zpykpthld
              ? convertDate(res?.zpykpthld)
              : res?.zpykpthld,
          });
          getModeChangeOptions(res, res?.sbfreq);
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
  const handleError = (errorMessage) => {
    message.error({
      content: errorMessage,
      className: "custom-msg",
      duration: 2,
    });
  };

  const getModeChangeOptions = (data, existingFreq) => {
    const filteredOptions = newModeLU.filter(
      (option) => option.value !== existingFreq
    );
    setIsUpdateModeLU(filteredOptions);
    return filteredOptions;
  };

  const handleChange = (value) => {
    setShowPhoneNumber(false);
    setShowEmailAddress(false);
    setShowWhatsApp(false);
    setActiveEmailIcons([]);
    setActiveMobileIcons([]);
    setActiveWhatsAppIcons([]);
    // If the checkbox is already checked, uncheck it
    if (checkedList.includes(value)) {
      setCheckedList([]);
    } else {
      // Otherwise, check it
      setCheckedList([value]);
    }
    if (value?.includes("Send Soft Copy")) {
      setSelectedSubType("sendsoftcopy");
      typesForm?.setFieldsValue({ subType: 2 });
    }
  };

  const handleDropdownChange = (e, item) => {
    if (item?.label?.includes("RTO Status")) {
      setIsRTOSelection(e);
    }
  };
  const handleTextLink = (item) => {
    if (item?.linkValue?.toLowerCase() === "view") {
      const gConfig = apiCalls.getGenericConfig();
      if (gConfig?.data?.dmsApiUrl) {
        const url =
          gConfig?.data?.dmsApiUrl +
          `/omnidocs/WebApiRequestRedirection?Application=BPMPOLENQ&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${details?.policyDetailsObj?.identifiers?.applicationNo}`;
        window.open(url, "_blank");
      }
    }
  };
  const getInternal = (list) => {
    let values = form.getFieldsValue();
    POSActionsOnContactDetails(values, "INTERNAL", list);
  };

  const handleTitleCheckBox = (e, item) => {
    setSelectCheckBox(false);
    setShowNewSignatureFields(false);
    setShowSignatureProcess(false);
    if (item?.label?.includes("Update New Signature")) {
      setSelectCheckBox(item.name);
      setShowNewSignatureFields(true);
    } else if (item?.label?.includes("Share Signature Update Process")) {
      setShowSignatureProcess(true);
      setSelectCheckBox(item.name);
    }
  };
  const toggleInputField = (field, item, index) => {
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

  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };

  const handleUploadLink = () => {};

  const handleRadioChange = (e, item) => {
    const emailDetails =
      SurvivalBenefitData[selectedSubType]?.RequestForm_Fields;
    if (loginInfo?.userProfileInfo?.profileObj?.isEmail) {
      emailDetails.forEach((element) => {
        if (element?.name === "requestform") {
          element.required = false;
        }
      });
    }
    setShowRaiseRequirementBtn(false);
    setIsShowOTPModal(false);
    if (selectedSubType === "frequencychange") {
      if (e.target.value === "otp") {
        setIsShowOTPModal(true);
        setIsShowRequestDetails(false);
      } else if (e.target.value === "requestform") {
        setIsShowRequestDetails(true);
      } else if (
        e.target.value === "no" &&
        item?.label?.includes("Validate Signature")
      ) {
        //setShowRaiseRequirementBtn(true);
        setDisableSubmitBtn(true);
      } else if (
        e.target.value === "yes" &&
        item?.label?.includes("Validate Signature")
      ) {
        //setShowRaiseRequirementBtn(false);
        setDisableSubmitBtn(false);
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
    setShowReasonDelayField(false);
    if (item === "BranchReceivedDate" || item === "RequestDateTime") {
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
        SurvivalBenefitData[selectedSubType]?.RequestForm_Fields?.forEach(
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
  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day"); // Can not select days before today and today
  };
  //commonly render all forms
  const renderDetailsForm = (formType) => {
    return (
      <DetailsForm
        data={SurvivalBenefitData[selectedSubType]?.[formType]}
        subType={selectedSubType}
        suffix={!isShowPOSScreen && suffix}
        handleUploadLink={handleUploadLink}
        form={form}
        handleRadioChange={handleRadioChange}
        handleDateChange={handleDateChange}
        handleTextLink={handleTextLink}
        handleTitleCheckBox={handleTitleCheckBox}
        clientRoleLU={clientRoleLU}
        handleDropdownChange={handleDropdownChange}
        selectCheckBox={selectCheckBox}
        toggleInputField={toggleInputField}
        activeEmailIcons={activeEmailIcons}
        activeMobileIcons={activeMobileIcons}
        activeWhatsAppIcons={activeWhatsAppIcons}
        getUploadFiles={getUploadFiles}
        disabledDate={disabledDate}
        disableRequestForm={disableRequestForm}
        disableOTP={disableOTP}
        onBlurInput={onBlurInput}
        handleEdit={handleEdit}
        requestModeLU={requestModeLU}
        isUpdateModeLU={isUpdateModeLU}
      ></DetailsForm>
    );
  };

  const handleEdit = (val) => {
    const enableEditing = val === "edit";

    SurvivalBenefitData[selectedSubType]?.POS_Details?.forEach((element) => {
      if (element?.posEdit) {
        element.disabled = !enableEditing;
      }
    });

    if (val === "close") {
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        POSFrequencyChangeObj[element.tagName] = element.tagValue;
      });

      form.setFieldsValue({
        NewSurivalFrequency: POSFrequencyChangeObj?.NewSurivalFrequency,
        NewPayoutAmount: POSFrequencyChangeObj?.NewPayoutAmount,
      });
    }
  };

  const onBlurInput = () => {};

  const getTransactionData = (values) => {
    let frequencyChange = "";
    if (selectedSubType === "frequencychange") {
      frequencyChange = isUpdateModeLU.filter(
        (x) => x.value === values?.NewSurivalFrequency
      )[0]?.label;
      return [
        {
          Status: "Create",
          TagName: "ExistingSurvivalFrequency",
          TagValue: values?.ExistingSurvivalFrequency || "",
        },
        {
          Status: "Create",
          TagName: "ExistingPayoutAmount",
          TagValue: values?.ExistingPayoutAmount || "",
        },
        {
          Status: "Create",
          TagName: "NewSurivalFrequency",
          TagValue: values?.NewSurivalFrequency || "",
        },
        {
          Status: "Create",
          TagName: "NewPayoutAmount",
          TagValue: values?.NewPayoutAmount || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
        {
          Status: "Create",
          TagName: "ValidateSignature",
          TagValue: values?.ValidateSignature || "",
        },
        {
          Status: "Create",
          TagName: "RequestorComments",
          TagValue: values?.RequestorComments || "",
        },
        {
          Status: "Create",
          TagName: "NewNameSurivalFrequency",
          TagValue: frequencyChange || "",
        },
        {
          Status: "Create",
          TagName: "ValidatedBy",
          TagValue: values?.customerchoice ? values?.customerchoice : "form",
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

  const handleSubmit = (values) => {
    // if(selectedSubType==="frequencychange") {
    //     setIsShowPOSScreen(!isShowPOSScreen);
    //     return;
    // }
    // if(!showEmailFields&&selectedSubType==="sendsoftcopy"){
    //   message.destroy()
    //   message.warning({
    //     content:
    //       "Please select atleast one communication.",
    //     className: "custom-msg",
    //     duration: 2,
    //   });
    //   return;
    // }  else{
    if (POSContactData && customerData?.isPOS) {
      POSActionsOnContactDetails(values, "APPROVED", null);
    } else if (selectedSubType === "frequencychange") {
      // getRaiseRequirements();
      saveRequest(values);
    } else {
      saveRequest(values);
    }
  };

  const saveRequest = (values) => {
    //setIsLoading(true);
    if (values?.CustomerSigningDate > values?.BranchReceivedDate) {
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
      setIsLoader(false);
      return;
    }

    setIsLoading(true);

    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: loginInfo?.userProfileInfo?.profileObj?.role || 0, // Required
      RequestChannel:
        loginInfo?.userProfileInfo?.profileObj?.role === 14
          ? 13
          : values.requestchannel, // Required
      Category: 2,
      ApplicationNo:
        details?.policyDetailsObj?.identifiers?.applicationNo ||
        customerData?.applicationNo,
      DOB: convertDate(customerData?.dob),
      PolicyNo:
        details?.policyDetailsObj?.identifiers?.policyNo ||
        customerData?.policyNo, // Required
      CustomerId: 456,
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
      ModifiedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
      AssignedToRole: "", //POS
      AssignedByUser: 0,
      ReasonForChange: "",
      RequestDateTime: values?.BranchReceivedDate
        ? new Date(values?.BranchReceivedDate)
        : new Date(),
      ReasonDelayed: values?.ReasonForDelay || "",
      CustSignDateTime: values?.CustomerSigningDate
        ? new Date(values?.CustomerSigningDate)
        : new Date(),
      TransactionData: getTransactionData(values) || [],
      Uploads: uploadFiles || [],
      CurrentStatus: raiseRequirementOpen ? "Reject" : "",
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
        if (val?.data) {
          // if(!val?.data?.srvReqRefNo){
          setAlertTitle(val?.data?.header);
          setAlertData(val?.data?.message);
          setShowAlert(true);
          setIsLoader(false);
          setRequirementLoader(false);
          //   return
          // }
          // setServiceRequestId(val?.data?.srvReqRefNo);
          //   setAlertTitle("Request Created Successfully");
          //   let successMessage = val?.data?.tat > 0 ?
          //   `Ticket ID Number ${val?.data?.srvReqRefNo}. Your request will be processed in ${val?.data?.tat||0} days`
          //   : `Ticket ID Number ${val?.data?.srvReqRefNo}.`;
          //   setAlertData(successMessage);
          //   setNavigateTo("/advancesearch");
          //   setShowAlert(true);

          // message.success({
          //   content: "Contact Details Updated Successfully",
          //   className: "custom-msg",
          //   duration: 3,
          // });
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

  const handleRequirementSubmit = () => {
    const formData = form.getFieldValue();
    setRequirementLoader(true);
    if (isShowPOSScreen) {
      POSActionsOnContactDetails(null, "REJECTED", null);
    } else {
      handleSubmit(formData);
    }
  };
  const popupClose = () => {
    setRaiseRequirementOpen(false);
  };

  const getPOSTransactionData = () => {
    const values = form.getFieldsValue();
    if (selectedSubType === "frequencychange") {
      return [
        {
          Status: "Update",
          TagName: "NewSurivalFrequency",
          TagValue: values?.NewSurivalFrequency || "",
        },
        {
          Status: "Update",
          TagName: "POSComments1",
          TagValue: values?.Comments || values?.AuthorizerComments || "",
        },
      ];
    }
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
      seletedRequerimentList.forEach((x) => {
        dummy = x.value;
      });
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
      POSComments1: values?.comment || values?.AuthorizerComments || "",
      TransactionPayload: getPOSTransactionData(values) || [],
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

    if (selectedSubType === "frequencychange" && status === "APPROVED") {
      let frequencyChange = isUpdateModeLU.filter(
        (x) => x.value === values?.NewSurivalFrequency
      )[0]?.label;
      obj.TransactionPayload.push({
        Status: "Update",
        TagName: "NewNameSurivalFrequency",
        TagValue: frequencyChange,
      });
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
          setAlertTitle(
            status === "REJECTED"
              ? "Requirement Raised"
              : `${val?.data?.message}`
          );
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
        Comments: boeScreenObj?.RequestorComments,
      });

      setInternalReqData();
    }
  }, []);

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
          selectedSubType === "frequencychange" ? (
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
              {selectedSubType === "frequencychange" && (
                <>
                  {!isShowPOSScreen && (
                    <>
                      {renderDetailsForm("BOE_Details")}
                      {isShowRequestDetails && (
                        <>{renderDetailsForm("RequestForm_Fields")}</>
                      )}
                      {renderDetailsForm("Comments")}
                    </>
                  )}
                  {isShowPOSScreen && <>{renderDetailsForm("POS_Details")}</>}

                  <div className="contact-details-btn">
                    {/* {!showRaiseRequirementBtn && (
              <> */}
                    <Button
                      type="primary"
                      className="primary-btn"
                      htmlType="submit"
                      disabled={disableSubmitBtn}
                    >
                      {!isShowPOSScreen ? "Submit" : "Approve"}
                    </Button>
                    {/* </>
            )} */}
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
                          internalReqForm={internalReqForm}
                        />
                      </>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </Form>
      </Spin>
      {showAlert && (
        <PopupAlert
          alertData={alertData}
          title={alertTitle}
          getAdvance={props.getAdvance}
          navigate={navigateTo}
          setShowAlert={setShowAlert}
        ></PopupAlert>
      )}

      {isShowOTPModal && (
        <>
          <OTPModal
            form={form}
            customerData={customerData}
            isShowOTPModal={isShowOTPModal}
            setIsShowOTPModal={setIsShowOTPModal}
            selectedCallType={props?.selectedCallType}
            selectedSubTypeId={props?.selectedSubTypeId}
            sendOTPNumber={ClientEnquiry?.rmblphone}
            setDisableRequestForm={setDisableRequestForm}
            setValidateOTPSuccess={setValidateOTPSuccess}
            clientEnquiryData={ClientEnquiry}
          />
        </>
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

export default SurvivalBenefit;
