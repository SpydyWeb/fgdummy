import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Data } from "../../mainconfig";
import { Form, Spin, Button, Checkbox,message,Modal,Tooltip } from "antd";
import { FundTransferData } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import moment from "moment";
import UploadIcon from "../../assets/images/upload.png";
import apiCalls from "../../api/apiCalls";
import PopupAlert from "../popupAlert";
import dayjs from "dayjs";
import OTPModal from "../../utils/OTPModal";
import CloseIcon from "../../assets/images/close-icon.png";
import RaiseRequirementPopup from "../RaiseRequirementPopup";

const FundTransfer = (props) => {
  const loginInfo = useSelector(state => state);

  const { selectedSubType, clientRoleLU,setSelectedSubType,typesForm,details,customerData,POSContactData,clientEnquiryData,requestModeLU,bankAccTypeLU
 } = props;
  const suffix = <img src={UploadIcon} alt="" />;
  const [form] = Form.useForm();
  const [requirementsForm] = Form.useForm();
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
  const [isRTOSelection,setIsRTOSelection] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertData, setAlertData] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [uploadFiles,setUploadFiles] = useState([]);
  const [isShowOTPModal,setIsShowOTPModal] = useState(false);
  const [isShowRequestDetails,setIsShowRequestDetails] = useState(false);
  const [ClientEnquiry, setClientEnquiry]= useState({});
  const [disableOTP,setDisableOTP] = useState(false);
  const [validateOTPSuccess, setValidateOTPSuccess] = useState(false);
  const [disableRequestForm,setDisableRequestForm] = useState(false);
  const [updateFields, setUpdateFields] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [serviceRequestId, setServiceRequestId] = useState(null);
  const [isShowPensionMaturityAmtModal,setIsShowPensionMaturityAmtModal] = useState(false);
  const [isLoader,setIsLoader] = useState(false);

  const POSFrequencyChangeObj={}
  useEffect(()=>{
    setShowEmailFields(false);
    setActiveEmailIcons([]);
    setActiveMobileIcons([]);
    setActiveWhatsAppIcons([]);
   // getClientEnquiry();
    setDisableRequestForm(false);
    form.resetFields();
  },[selectedSubType]);
  useEffect(()=>{
    if(props?.EmailResponse?.IsEmailmanagent){
      if (!FundTransferData[selectedSubType]) {
        FundTransferData[selectedSubType] = {}; // Initialize if undefined
      }  
        if (!Array.isArray(FundTransferData[selectedSubType]?.BOE_Details)) {
          FundTransferData[selectedSubType].BOE_Details = [];
      }
      FundTransferData[selectedSubType].BOE_Details = FundTransferData[selectedSubType].BOE_Details.filter(
          comment => comment.name !== "AdditionalNoteForCustomer"
      );
      FundTransferData[selectedSubType].BOE_Details.push(
        {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 4000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
        });
    }
  },[selectedSubType]);
  

  useEffect(() => {
     if(POSContactData && customerData?.isPOS && (selectedSubType==="maturityclaimpension")){
      POSContactData?.serviceRequestTransectionData?.forEach(element => {
        POSFrequencyChangeObj[element.tagName] = element.tagValue
      });

      setIsShowPOSScreen(true);
      setUpdateFields(false);
      form.setFieldsValue({
        ExistingSurvivalFrequency:POSFrequencyChangeObj?.ExistingSurvivalFrequency,
        ExistingPayoutAmount:POSFrequencyChangeObj?.ExistingPayoutAmount,
        NewSurivalFrequency:POSFrequencyChangeObj?.NewSurivalFrequency,
        NewPayoutAmount:POSFrequencyChangeObj?.NewPayoutAmount,
        RequestMode:POSFrequencyChangeObj?.RequestMode,
        RequestorComments: POSFrequencyChangeObj?.RequestorComments,
        ValidateSignature:POSFrequencyChangeObj?.ValidateSignature,
        CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
        BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
        ReasonForDelay: POSContactData?.reasonDelayed,
      })
      if(POSFrequencyChangeObj?.ValidatedBy==="requestform"){
        FundTransferData[selectedSubType]?.POS_Details?.forEach(element => {
          if(element?.label==="Request Form"||element?.label?.includes("Customer Signing Date")||element?.label?.includes("Request Received Date")||
          element?.label==="Signature Validated"){
            element.hide= false;
            setUpdateFields(true);
          }
        });
      }
      else if(POSFrequencyChangeObj?.ValidatedBy==="otp"){
        FundTransferData[selectedSubType]?.POS_Details?.forEach(element => {
          if(element?.label==="Request Form"||element?.label?.includes("Customer Signing Date")||element?.label?.includes("Request Received Date")||
          element?.label==="Signature Validated"){
            element.hide= true;
            setUpdateFields(true);
          }
        });
      }
        FundTransferData[selectedSubType]?.POS_Details?.forEach(element => {
          if(element?.label?.includes("Reason For Delayed Submission")&&POSContactData?.reasonDelayed){
            element.hide= false;
            setShowReasonDelayField(true);
          }else {
            if(element?.label?.includes("Reason For Delayed Submission")&&!POSContactData?.reasonDelayed){
              element.hide= true;
              setShowReasonDelayField(true);
            }
          }
        });
      
    }
    },[])

  const getClientEnquiry = async () => {
    try {
      setIsLoading(true);
      //setDisableOTP(true);
      const clientNumber= customerData?.poClientID;
      const obj = { clientNumber };
      const response = await apiCalls.getClientEnquiry(obj,loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID);
      if (response?.data) {
        const res = response?.data?.responseBody;
        setClientEnquiry(res);
        // if(res?.rmblphone){
        //     setDisableOTP(false);
        //   }
        setIsLoading(false);
      } else {
        setIsLoading(false);
        handleError(response?.data?.responseBody?.errormessage || "Something went wrong, please try again!");
      }
    } catch (error) {
      setIsLoading(false);
      handleError("Something went wrong, please try again!");
    }
  };
  const handleError = (errorMessage) => {
    message.error({
      content: errorMessage,
      className: "custom-msg",
      duration: 2,
    });
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
    if(value?.includes("Send Soft Copy")){
        setSelectedSubType("sendsoftcopy");
        typesForm?.setFieldsValue({subType: 2})
    }
  };

  const handleDropdownChange = (e,item) => {
    if(item?.label?.includes("RTO Status")){
        setIsRTOSelection(e);
    }
  };
  const handleTextLink=(item)=>{
    if(item?.label?.includes("Pension Maturity amount")){
        setIsShowPensionMaturityAmtModal(true);
      }
    if(item?.linkValue?.toLowerCase() === "view"){
          const gConfig= apiCalls.getGenericConfig()
          if(gConfig?.data?.dmsApiUrl){
     const url =  gConfig?.data?.dmsApiUrl + `/omnidocs/WebApiRequestRedirection?Application=BPMPOLENQ&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${details?.policyDetailsObj?.identifiers?.applicationNo}`;
     window.open(url, '_blank');
          }
   }
 }

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
    setShowRaiseRequirementBtn(false);
    let selectionValue= e.target.value;
    setIsShowOTPModal(false)
    setUpdateFields(false);
    if(selectedSubType==="maturityclaimpension"){
        //  if(e.target.value === "otp"){
        //     setIsShowOTPModal(true);
        //     setIsShowRequestDetails(false);
        //   }
        //   else if(e.target.value === "requestform"){
        //    setIsShowRequestDetails(true);
        //   }
       if(item?.label?.includes("Purchase Annuity From GCI")){
        FundTransferData[selectedSubType]?.BOE_Details?.forEach(element => {
            if(element?.label?.includes("Select Annuity Option")||element?.label?.includes("Frequency of Annuity Payment")){
              element.hide= selectionValue === "yes" ? false : true;
              setUpdateFields(!updateFields);
            }
            else if(element?.label?.includes("Enter Company Name")){
              element.hide= selectionValue === "no" ? false : true;
              setUpdateFields(!updateFields);
            }
          });
      }else  if(item?.label?.includes("Name match as per Penny Drop")){
        FundTransferData[selectedSubType]?.BOE_Details?.forEach(element => {
            if(element?.label?.includes("Upload Bank Account Proof")){
              element.hide= selectionValue === "no" ? false : true;
              setUpdateFields(!updateFields);
            }
          });
      }
    }

    // if(selectedSubType==="maturityclaimpension"&&item?.label?.includes("Name Match")){
    //   FundTransferData[selectedSubType]?.BOE_Details?.forEach(element => {
    //     if(element?.label?.includes("Uplaod Cheque Copy")&&(e.target.value==="no")){
    //       element.hide= false;
    //       setUpdateFields(!updateFields);
    //     }
    //     else if(element?.label?.includes("Uplaod Cheque Copy")&&(e.target.value==="yes")){
    //       element.hide= true;
    //       setUpdateFields(!updateFields);
    //     }
    //   });
    // }
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
    if (item === "branchreceiveddate"||item==="RequestDateTime") {
      let newDate = new Date();
      let todayDate = moment(newDate).format("MM/DD/YYYY");
      let selectDate = moment(date + 1).format("MM/DD/YYYY");
      const formFeilds = form.getFieldsValue()
      let customerSignDate = moment(formFeilds?.CustomerSigningDate + 1).format("MM/DD/YYYY");
      let dateDiffence = date_diff_indays(selectDate,customerSignDate)
      if(!formFeilds?.CustomerSigningDate||dateDiffence > 0){
        message.destroy();
        message.error({
          content: "Request Received Date can't be before the customer signing date.",
          className: "custom-msg",
          duration: 3,
        });
        form.setFieldsValue({branchreceiveddate: ""})
      return;
      } else {
        FundTransferData[selectedSubType]?.BOE_Details?.forEach(element => {
          if(element?.label?.includes("Reason For Delayed Submission")&&selectDate < todayDate){
            element.hide= false;
            setShowReasonDelayField(true);
          }
          else if(element?.label?.includes("Reason For Delayed Submission")&&selectDate >= todayDate){
            element.hide= true;
            setShowReasonDelayField(false);
          }
        });
      }
    }
  };
  const getUploadFiles=(listOfUploadFiles)=>{
    // const updatedUploadList = listOfUploadFiles?.map((obj) => {
    //   // Create a new object without the propertyToDelete property
    //   const { labelName, ...newObject } = obj;
    //   return newObject;
    // });
    // Update the state with the new list
    setUploadFiles(listOfUploadFiles);

  }
  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day"); // Can not select days before today and today
  };

  const handleInputChange =(e,item)=>{
    if(item.label?.includes("IFSC")&&e.target.value){
      getIFSCBankDetails(e.target.value);
    }
  }

  const getIFSCBankDetails =async(ifscCode)=>{
    let response = await apiCalls.getIFSCBanks(ifscCode);
  if (response.statusText) {
        if (response?.data) {
          form.setFieldsValue({
            Bank_Name_New: response?.data[0]?.bank,
            Branch_Name_New: response?.data[0]?.branch,
            POSBank_Name_New: response?.data[0]?.bank,
            POSBranch_Name_New: response?.data[0]?.branch,
          })
        } else {
          message.error({
            content:
            response?.data?.responseBody?.errormessage ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
      }
  }


  //commonly render all forms
  const renderDetailsForm = (formType) => {
    return (
      <DetailsForm
        data={FundTransferData[selectedSubType]?.[formType]}
        subType={selectedSubType}
        suffix={!isShowPOSScreen && suffix}
        handleUploadLink={handleUploadLink}
        form={form}
        requestModeLU={requestModeLU}
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
        handleLabelLink={handleLabelLink}
        bankAccTypeLU={bankAccTypeLU}
        handleInputChange={handleInputChange}
      ></DetailsForm>
    );
  };

  const handleEdit = (val) => {
    const enableEditing = val === 'edit';

    FundTransferData[selectedSubType]?.POS_Details?.forEach(element => {
      if (element?.posEdit) {
        element.disabled = !enableEditing;
      }
    });
  
    if (val === 'close') {
      POSContactData?.serviceRequestTransectionData?.forEach(element => {
        POSFrequencyChangeObj[element.tagName] = element.tagValue;
      });
  
      form.setFieldsValue({
        NewSurivalFrequency: POSFrequencyChangeObj?.NewSurivalFrequency,
        NewPayoutAmount: POSFrequencyChangeObj?.NewPayoutAmount,
      });
    }
  }
  

  const onBlurInput =()=>{

  }

  const handleLabelLink=(item)=>{
    if(item?.label?.includes("Pension Maturity amount")){
        setIsShowPensionMaturityAmtModal(true);
      }
  }


  const getTransactionData = (values) => {
    if (selectedSubType === "maturityclaimpension") {
      return [
        { Status: "Create", TagName: "AdditionalNoteForCustomer", TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "" },
        { Status: "Create", TagName: "ExistingSurvivalFrequency", TagValue: values?.ExistingSurvivalFrequency || "" },
        { Status: "Create", TagName: "ExistingPayoutAmount", TagValue: values?.ExistingPayoutAmount || "" },
        { Status: "Create", TagName: "NewSurivalFrequency", TagValue: values?.NewSurivalFrequency || ""},
        { Status: "Create", TagName: "NewPayoutAmount", TagValue: values?.NewPayoutAmount || "" },
        { Status: "Create", TagName: "RequestMode", TagValue: values?.RequestMode || ""},
        { Status: "Create", TagName: "ValidateSignature", TagValue: values?.ValidateSignature || ""},
        { Status: "Create", TagName: "RequestorComments", TagValue: values?.RequestorComments || ""},
        { Status: "Create", TagName: "Bank_IFSC_New", TagValue: values?.Bank_IFSC_New || ""},

        { Status: "Create", TagName: "Bank_Name_New", TagValue: values?.Bank_Name_New || ""},
        { Status: "Create", TagName: "Acc_Type_New", TagValue: values?.Acc_Type_New || ""},
        { Status: "Create", TagName: "Branch_Name_New", TagValue: values?.Branch_Name_New || ""},
        { Status: "Create", TagName: "Acc_HldrName_New", TagValue: values?.Acc_HldrName_New || ""},
        { Status: "Create", TagName: "Acc_Number_New", TagValue: values?.Acc_Number_New || ""},
        { Status: "Create", TagName: "reenteraccountNumber", TagValue: values?.reenteraccountNumber || ""},
        { Status: "Create", TagName: "PennyDrop", TagValue: values?.PennyDrop || ""},
        { Status: "Create", TagName: "NameMatch", TagValue: values?.NameMatch || ""},
        { Status: "Create", TagName: "customerchoice", TagValue: values?.customerchoice || ""},
        { Status: "Create", TagName: "customersigningdate", TagValue: values?.customersigningdate || ""},
        { Status: "Create", TagName: "branchreceivedate", TagValue: values?.branchreceivedate || ""},

 



        {
          "Status": "Create",
          "TagName": "ValidatedBy",
          "TagValue": values.customerchoice ? values.customerchoice : 'form'
      },
      ];
    } else {
      return []
    }
  };

  const handleSubmit = (values) => {
    if(selectedSubType==="maturityclaimpension") {
        setIsShowPOSScreen(!isShowPOSScreen);
        return;
    } 
    // if(!showEmailFields&&selectedSubType==="sendsoftcopy"){
    //   message.destroy()
    //   message.warning({
    //     content:
    //       "Please select atleast one communication.",
    //     className: "custom-msg",
    //     duration: 2,
    //   });
    //   return;
    // }
    setIsLoading(true);
    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: loginInfo?.userProfileInfo?.profileObj?.role || 0, // Required
      RequestChannel: loginInfo?.userProfileInfo?.profileObj?.role === 14 ? 13 :  values.requestchannel, // Required
      Category: 2,
      ApplicationNo:
      details?.policyDetailsObj?.identifiers?.applicationNo ||customerData?.applicationNo,
      DOB: convertDate(customerData?.dob),
      PolicyNo: details?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo, // Required
      CustomerId: 456,
      "CustRole":values?.custRole,
      policyStatus:
      details?.policyDetailsObj?.planAndStatus?.policyStatus || customerData?.policyStatus,
      proposerName: details?.policyDetailsObj?.identifiers?.po_Name || customerData?.po_Name,
      plan: details?.policyDetailsObj?.planAndStatus?.planName || customerData?.planName,
      CreatedOn: new Date(),
      CreatedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
      CreatedUsrId: loginInfo?.userProfileInfo?.profileObj?.userName,
      ModifiedOn: new Date(),
      ModifiedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
      AssignedToRole: "", //POS
      AssignedByUser: 0,
      ReasonForChange: "",
      RequestDateTime:  values?.branchreceiveddate
      ? new Date(values?.branchreceiveddate)
      : new Date(),
      ReasonDelayed: values?.ReasonForDelay,
      CustSignDateTime: values?.CustomerSigningDate
      ? new Date(values?.CustomerSigningDate)
      : new Date(),
      "TransactionData": getTransactionData(values),
      "Uploads": uploadFiles || [
        
      ],
      CurrentStatus:raiseRequirementOpen? "Reject":'',
     CommunicationRequest: [
        {
          SrvReqRefNo: "",
          TemplateID: "",
          CommType: 2,
          ReceipientTo:  import.meta.env.VITE_APP_RECEIPIENT_TO ? import.meta.env.VITE_APP_RECEIPIENT_TO : clientEnquiryData?.rinternet,
          ReceipientCC: import.meta.env.VITE_APP_RECEIPIENT_CC ? import.meta.env.VITE_APP_RECEIPIENT_CC : clientEnquiryData?.rinternet,
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
          MobileNos: import.meta.env.VITE_APP_RECEIPIENT_MOBILENO ? import.meta.env.VITE_APP_RECEIPIENT_MOBILENO : clientEnquiryData?.rmblphone,
          ScheduledTime: new Date(),
          CommBody: "",
          Attachments: null,
        },
      ],
  }
  if (obj?.TransactionData) {
    if (
      selectedSubType === "maturityclaimpension" ||
      selectedSubType === "foreclosure" ||
      selectedSubType === "maturityclaimnonpension" ||
      selectedSubType === "postissuancerefund" ||
      selectedSubType === "receipting" ||
      selectedSubType === "paidupsurrender" ||
      selectedSubType === "partialwithdrawal"
    ) {
      obj.TransactionData.push({
        Status: "Create",
        TagName: "AdditionalNoteForCustomer",
        TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
      });
    }
  }
  if(raiseRequirementOpen){
    let reqFormValues = requirementsForm?.getFieldsValue();
    let ids = raiseRequerimentList?.filter((e) => e.status === true)?.map((e) => e.raiseReqId)
    obj?.TransactionData?.push({
      "Status": "Create",
      "TagName": "ReasonList_Key",
      "TagValue":  JSON.stringify(ids)
    })
     obj?.TransactionData?.push({
                                          "Status": "Create",
                                          "TagName": "AddAnyOtherRequirements",
                                          "TagValue": reqFormValues?.addotherReq || ""
                                        });
                                        if(ids?.length===0 && !props?.EmailResponse?.IsEmailmanagent){
                                          message.error({
                                            content: "Please Select Documents to Reject",
                                            className: "custom-msg",
                                            duration: 3,
                                          });
                                          setIsLoading(false);
                                          setRequirementLoader(false)
                                          return
                                        }
      }
      if(props?.EmailResponse?.IsEmailmanagent){
        obj.TransactionData.push(
          {
          "Status": "Create",
          "TagName": "EmailResponseId",
          "TagValue": props?.EmailResponse?.EmailResponseId
          },
          {
            "Status": "Create",
            "TagName": "CustomerName",
            "TagValue": clientEnquiryData?.lgivname + clientEnquiryData?.lsurname
            },
      )
       }
    let response = apiCalls.genericAPI(obj);
    response
      .then((val) => {
        if (val?.data) {
          if(!val?.data?.srvReqRefNo){
            setAlertTitle(val?.data?.header);
            setAlertData(val?.data?.message);
            setShowAlert(true);
            setIsLoader(false);
            setRequirementLoader(false);
            return
          }
          setServiceRequestId(val?.data?.srvReqRefNo);
          if (val?.data?.category == 2) {
            setAlertTitle("Request Created Successfully");
            let successMessage = val?.data?.tat > 0 ?
              `Ticket ID Number ${val?.data?.srvReqRefNo}. Your request will be processed in ${val?.data?.tat || 0} days`
              : `Ticket ID Number ${val?.data?.srvReqRefNo}.`;
            setAlertData(successMessage);
          } else {
            setAlertTitle("Query Raised Successfully");
            let successMessage = `Ticket ID Number ${val?.data?.srvReqRefNo}.`;
            setAlertData(successMessage);
          }
          if(!props?.EmailResponse?.IsEmailmanagent){
            setNavigateTo("/advancesearch");
          }
            setShowAlert(true);
          
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
        setRequirementLoader(false)
      })
      .catch((err) => {
        setIsLoading(false);
        setRequirementLoader(false)
      }); 
  };

  const getRaiseRequirements = () => {
    setRaiseRequirementOpen(true);
    setRequirementLoader(true);
    let obj = {
      calltype: props?.selectedCallType,
      subtype: props?.selectedSubTypeId,
      Role:isShowPOSScreen?0:1
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
  }

  const handleRequirementSubmit = () => {
    setRequirementLoader(true);
    if(isShowPOSScreen){
      POSActionsOnContactDetails(null, "REJECTED");
    }else{
      handleSubmit();
    }

  };
  const popupClose=()=>{
    setRaiseRequirementOpen(false)
  }

  const POSActionsOnContactDetails = (values, status) => {
    
    let seletedRequerimentList = raiseRequerimentList
      ?.filter((e) => e.status === true)
      ?.map((e) => e.raiseReqId);
      if(seletedRequerimentList.length===0  && status === 'REJECTED'){
        setIsLoading(false);
        setRequirementLoader(false);
        message.destroy();
        message.error({
          content: "Please Select Documents to Reject",
          className: "custom-msg",
          duration: 3,
        });
      return;
      }
    let obj = {
      TransectionId: 1,
      SrvReqRefNo: POSContactData?.srvReqRefNo || serviceRequestId,
      Status: status,
      RequirementList: seletedRequerimentList,
      UsrID: loginInfo?.userProfileInfo?.profileObj?.userName,
      RoleID: loginInfo?.userProfileInfo?.profileObj?.role,
      // "RequirementComments":requirementCmnt,
      POSComments1: values?.comment,
      TransactionPayload:  [],
    };
     if(isShowPOSScreen){
      let reqFormValues = requirementsForm?.getFieldsValue();
    obj.TransactionPayload.push({
        "Status": "Create",
        "TagName": "PosOtherReq",
        "TagValue": reqFormValues?.PosOtherReq || ""
      });
    }
    setIsLoading(true);
    let response = apiCalls.POSActionsOnContactDetails(obj);
    response
      .then((val) => {
        if (val?.data) {
          setAlertTitle(status==="REJECTED"?"Requirement Raised":"Request Approved");
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

  console.log("selectedSubType",selectedSubType)

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
          onFinish={handleSubmit}
          autoComplete="off"
        >
      
          {<>
          {!isShowPOSScreen&&<>
            {renderDetailsForm("BOE_Details")}
            {/* {isShowRequestDetails&&<>
            {renderDetailsForm("RequestForm_Fields")}
            </>}
            {renderDetailsForm("Comments")} */}
          </>}
          {isShowPOSScreen&&<>
            {renderDetailsForm("POS_Details")}
          </>}
         
          <div className="contact-details-btn">
            {/* {!showRaiseRequirementBtn && (
              <> */}
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit"
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
          </div>
          </>}
       
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

{isShowOTPModal &&<>
      <OTPModal form={form} customerData={customerData} isShowOTPModal={isShowOTPModal} setIsShowOTPModal={setIsShowOTPModal} selectedCallType = {props?.selectedCallType} selectedSubTypeId = {props?.selectedSubTypeId}
       sendOTPNumber={ClientEnquiry?.rmblphone} setDisableRequestForm={setDisableRequestForm} setValidateOTPSuccess={setValidateOTPSuccess} clientEnquiryData = {ClientEnquiry}/>
      </>}
      {raiseRequirementOpen && <> 
       <RaiseRequirementPopup raiseRequerimentList={raiseRequerimentList} raiseRequirementOpen={raiseRequirementOpen} requirementModalLoader={requirementModalLoader} handleRequirementSubmit={handleRequirementSubmit} popupClose={popupClose} isShowPOSScreen={isShowPOSScreen} requirementsForm={requirementsForm}/>
       </>}

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
        title="Pension Maturity Amount"
        open={isShowPensionMaturityAmtModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setIsShowPensionMaturityAmtModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="table-container" style={{ marginTop: "20px" }}>
          <table className="responsive-table">
            <tr>
              <th>Type</th>
              <th>Vlaue</th>
              <th>%</th>
            </tr>
            <tr>
              <td>Commutation Amount</td>
              <td></td>
              <td>Max of 33% allowed </td>
            </tr>
            <tr>
              <td>Annunciation Amount</td>
              <td></td>
              <td></td>
            </tr>
           {/* {BankduDupeData?.length === 0  &&
               <tr>
                  <td colspan="3">
               
                <div className="text-center"><span>No data available</span></div> 
        </td>
        </tr>} */}
          </table>
        </div>
      </Modal>
    </>
  );
};

export default FundTransfer;