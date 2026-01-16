import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Form, Spin, Button, Checkbox,message,Modal } from "antd";
import { RenewalRelatedData } from "../../mainconfig";
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

const RenewalRelated = (props) => {
  const loginInfo = useSelector(state => state);

  const { selectedSubType, clientRoleLU,details,customerData,POSContactData,  requestModeLU,clientEnquiryData,isEmailManagement } = props;
  const suffix = <img src={UploadIcon} alt="" />;
  const [form] = Form.useForm();
  const [requirementsForm] = Form.useForm();
  const [internalReqForm] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showResonDelayField, setShowReasonDelayField] = useState(false);
  const [isShowPOSScreen, setIsShowPOSScreen] = useState(false);
  const [selectCheckBox, setSelectCheckBox] = useState(false);
  const [showRaiseRequirementBtn, setShowRaiseRequirementBtn] = useState(false);
  const [showEmailFields, setShowEmailFields] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmailAddress, setShowEmailAddress] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [activeEmailIcons, setActiveEmailIcons] = useState([]);
  const [activeMobileIcons, setActiveMobileIcons] = useState([]);
  const [activeWhatsAppIcons, setActiveWhatsAppIcons] = useState([]);
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
  const [disableSubmitBtn,setDisableSubmitBtn] = useState(false);
  const [InternaRequirements, setInternalFlowRequirements] = useState("");
  const [premiumData, setPremiumData] = useState([]);
  const [isLoader,setIsLoader] = useState(false);
  const boeScreenObj = {

  }
  const [isUpdateModeLU,setIsUpdateModeLU] = useState([]);

  const POSFrequencyChangeObj={}
 

  useEffect(()=>{
    setShowAlert(false);
    setShowEmailFields(false);
    setActiveEmailIcons([]);
    setActiveMobileIcons([]);
    setActiveWhatsAppIcons([]);
   // getClientEnquiry();
    setDisableRequestForm(false);
    form.resetFields();
    getPremiumData();
  },[selectedSubType]);
  useEffect(()=>{
    if(props?.EmailResponse?.IsEmailmanagent){
      
      if (!RenewalRelatedData[selectedSubType]) {
        RenewalRelatedData[selectedSubType] = {}; // Initialize if undefined
      }
      
      if (!Array.isArray(RenewalRelatedData[selectedSubType]?.RequestForm_Fields)) {
        RenewalRelatedData[selectedSubType].RequestForm_Fields = [];
      }
      
      // Remove existing instances of "Additional Note For Customer" before adding a new one
      RenewalRelatedData[selectedSubType].RequestForm_Fields = RenewalRelatedData[selectedSubType].RequestForm_Fields.filter(
        comment => comment.name !== "AdditionalNoteForCustomer"
      );
      RenewalRelatedData[selectedSubType].RequestForm_Fields.push(
        {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 4000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
        })
      }
  },[selectedSubType]);

  useEffect(() => {
    if(isEmailManagement){
      RenewalRelatedData[selectedSubType]?.BOE_Details?.forEach(element=>{
        if(element?.name==="customerchoice"){
          element.disabled=true
  
        }
      })

      
      if (Data[selectedSubType]?.Comments) {
        Data[selectedSubType].Comments = [
            { name: "AdditionalNoteForCustomer", label: "Additional Note For Customer", inputType: "complaintbox", maxlength: 4000, required: false, validationmsg: "Additional Note For Customer", placeholder: "Additional Note For Customer",  width: "100%", rows: 4  }
        ];
    }
    }
     if(POSContactData && customerData?.isPOS && (selectedSubType==="gstwaiver")){
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
        CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime): null,
        BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime): null,
        ReasonForDelay: POSContactData?.reasonDelayed,
        requestchannel: POSContactData?.reqMode
      })
    //   if(POSFrequencyChangeObj?.ValidatedBy==="requestform"){
    //     RenewalRelatedData[selectedSubType]?.POS_Details?.forEach(element => {
    //       if(element?.label==="Request Form"||element?.label?.includes("Customer Signing Date")||element?.label?.includes("Request Received Date")||
    //       element?.label==="Signature Validated"){
    //         element.hide= false;
    //         setUpdateFields(true);
    //       }
    //     });
    //   }
    //   else if(POSFrequencyChangeObj?.ValidatedBy==="otp"){
    //     RenewalRelatedData[selectedSubType]?.POS_Details?.forEach(element => {
    //       if(element?.label==="Request Form"||element?.label?.includes("Customer Signing Date")||element?.label?.includes("Request Received Date")||
    //       element?.label==="Signature Validated"){
    //         element.hide= true;
    //         setUpdateFields(true);
    //       }
    //     });
    //   }
        RenewalRelatedData[selectedSubType]?.POS_Details?.forEach(element => {
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
    },[]); // eslint-disable-next-line arrow-body-style

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

  const handleDropdownChange = (e,item) => {
 
  };
  const handleTextLink=(item)=>{
    if(item?.linkValue?.toLowerCase() === "view"){
          const gConfig= apiCalls.getGenericConfig()
          if(gConfig?.data?.dmsApiUrl){
     const url = gConfig?.data?.dmsApiUrl + `/omnidocs/WebApiRequestRedirection?Application=BPMPOLENQ&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${details?.policyDetailsObj?.identifiers?.applicationNo}`;
     window.open(url, '_blank');
          }
   }
 }
 const getInternal = (list) => {
  let values = form.getFieldsValue();
  POSActionsOnContactDetails(values, "INTERNAL", list);
}

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
    if(inputDate){
      const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
      return formattedDate;
    }else{
      return ''
    }
 
  };

  const handleUploadLink = () => {};

  const handleRadioChange = (e, item) => {
    setShowRaiseRequirementBtn(false);
    setIsShowOTPModal(false)
    if(selectedSubType==="gstwaiver"){
         if(e.target.value === "otp"){
            setIsShowOTPModal(true);
            setIsShowRequestDetails(false);
          }
          else if(e.target.value === "requestform"){
           setIsShowRequestDetails(true);
          }
       else if(e.target.value === "no"&& ["Validate Signature","Life Asia JE Passed"].includes(item?.label)){
        //setShowRaiseRequirementBtn(true);
        setDisableSubmitBtn(true);
      }
      else if(e.target.value === "yes"&&["Validate Signature","Life Asia JE Passed"].includes(item?.label)){
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
    if (item === "BranchReceivedDate"||item==="RequestDateTime") {
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
        form.setFieldsValue({BranchReceivedDate: ""})
      return;
      } else {
        RenewalRelatedData[selectedSubType]?.RequestForm_Fields?.forEach(element => {
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
  //commonly render all forms
  const renderDetailsForm = (formType) => {
    return (
      <DetailsForm
        data={RenewalRelatedData[selectedSubType]?.[formType]}
        subType={selectedSubType}
        suffix={!isShowPOSScreen && suffix}
        handleUploadLink={handleUploadLink}
        form={form}
        handleRadioChange={handleRadioChange}
        handleDateChange={handleDateChange}
        handleTextLink={handleTextLink}
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
    const enableEditing = val === 'edit';

    RenewalRelatedData[selectedSubType]?.POS_Details?.forEach(element => {
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

  const getPremiumData = () => {
    const obj = {
  'outofRevival': "",
  'totalBaseAmount': "",
  'interestAmount': "",
  'amountInSuspense': "",
  'totalPremiumDue': "",
   'mobileNo': props?.details?.sentDetailsObj?.mobileNo || props?.customerData?.mobileNo,
   'whatsAppNo': props?.details?.sentDetailsObj?.mobileNo || props?.customerData?.mobileNo,
   'emailId': props?.details?.sentDetailsObj?.emailID || props?.customerData?.emailID,
   'basePremium' :'',
   'riderPremium':0,
   'GST':'',
   'interestIfany':'',
   'waiverOfInterest':0,
   'suspense':'',
   'totalPremium': ''
}
  setIsLoading(true);
  let payload={
    "requestHeader": {
      "source": "POS",
      "carrierCode": "2",
      "branch": "PRA",
      "userId": loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID,
      "userRole": "10",
      "partnerId": "MSPOS",
      "processId": "POS",
      "monthendExtension": "N",
      "monthendDate": "16/10/2024"
    },
    "requestbody": {
      "policyNo": customerData?.policyNo,
      "effectiveDate": moment(new Date(), 'YYYYMMDD').format('YYYYMMDD'),
      "action": "A"
    }
  }


  let response = apiCalls.getPremiumEnquiryData(payload);
  response.then((val)=>{
    setIsLoading(false);
    if(val?.data?.responseBody?.errorcode === '1'){
      //obj.totalPremiumDue = 0;
      //setPremiumData(val?.data?.responseBody);
     // form.setFieldsValue({...obj});
     message.error({
      content: val?.data?.responseBody?.errormessage || "Something went wrong please try again!",
      className: "custom-msg",
      duration: 3,
    });
    }else if(val?.data?.responseHeader?.issuccess === false){
      message.error({
        content: val?.data?.responseHeader?.message || "Something went wrong please try again!",
        className: "custom-msg",
        duration: 3,
      });
     }
    else {
      let array = [];
      if (val?.data?.responseBody) {
          array.push(val.data.responseBody);
      }
      setPremiumData(array);
    } 
    
  }).catch((err)=>{
    setIsLoading(false);
  })
}


  const getTransactionData = (values) => {
    if (selectedSubType === "gstwaiver") {
      return [
        { Status: "Create", TagName: "BasePremium", TagValue: premiumData[0]?.zsprm || ""},
        { Status: "Create", TagName: "Intrest", TagValue:  premiumData[0]?.hrifeecnt || ""},
        { Status: "Create", TagName: "TotalGST", TagValue:  premiumData[0]?.totaltax || ""},
        { Status: "Create", TagName: "TotalPremium", TagValue: calculateTotal(premiumData[0]) || ""},
        { Status: "Create", TagName: "ExistingSurvivalFrequency", TagValue: values?.ExistingSurvivalFrequency || "" },
        { Status: "Create", TagName: "ExistingPayoutAmount", TagValue: values?.ExistingPayoutAmount || "" },
        { Status: "Create", TagName: "NewSurivalFrequency", TagValue: values?.NewSurivalFrequency || ""},
        { Status: "Create", TagName: "NewPayoutAmount", TagValue: values?.NewPayoutAmount || "" },
        { Status: "Create", TagName: "ValidateSignature", TagValue: values?.ValidateSignature || ""},
        { Status: "Create", TagName: "RequestorComments", TagValue: values?.RequestorComments || ""},
        {
          "Status": "Create",
          "TagName": "ValidatedBy",
          "TagValue": values?.customerchoice ? values?.customerchoice : 'form'
      },
      {
        "Status": "Create",
        "TagName": "AdditionalNoteForCustomer",
        "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",
    },
      ];
    } 
  };

  const setInternalReqData = () => {
    POSContactData.serviceRequestTransectionData?.forEach(element => {
       if(element.tagName === 'InternalRequirementValue'){
           
             setInternalFlowRequirements(props.interlRequirementTagValue);
       };
     });
 }

  const handleSubmit = (values) => {
      if (POSContactData && customerData?.isPOS) {
        POSActionsOnContactDetails(values, "APPROVED", null);
      } else if (selectedSubType === "gstwaiver"){
          saveRequest(values)
        }else{
          saveRequest(values);
        }
    };

  const saveRequest=(values)=>{
    if(values?.CustomerSigningDate > values?.BranchReceivedDate){
      message.destroy();
      message.error({
        content: " customer signing date  can't be greater than  Request Received Date.",
        className: "custom-msg",
        duration: 3,
      });
      form.setFieldsValue({
        CustomerSigningDate: "",
        CustomerSigningDate:""
      })
      setIsLoader(false);
      return
    }
    setIsLoading(true);
    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: loginInfo?.userProfileInfo?.profileObj?.role || 0, // Required
      RequestChannel: loginInfo?.userProfileInfo?.profileObj?.role === 14 ? 13 :  values.requestchannel,  // Required
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
      RequestDateTime:  values?.BranchReceivedDate
      ? new Date(values?.BranchReceivedDate)
      : new Date(),
      ReasonDelayed: values?.ReasonForDelay || "",
      CustSignDateTime: values?.CustomerSigningDate
      ? new Date(values?.CustomerSigningDate)
      : new Date(),
      "TransactionData": getTransactionData(values) || [],
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
  if(raiseRequirementOpen){
    let reqFormValues = requirementsForm?.getFieldsValue();
    let ids = raiseRequerimentList?.filter((e) => e.status === true)?.map((e) => e.raiseReqId)
    obj.TransactionData.push({
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
            setRequirementLoader(false)
            return
          }
          setServiceRequestId(val?.data?.srvReqRefNo);
            setAlertTitle("Request Created Successfully");
            let successMessage = val?.data?.tat > 0 ? 
            `Ticket ID Number ${val?.data?.srvReqRefNo}. Your request will be processed in ${val?.data?.tat||0} days`
            : `Ticket ID Number ${val?.data?.srvReqRefNo}.`;
            setAlertData(successMessage);
            //if(!props?.EmailResponse?.IsEmailmanagent){
            //  setNavigateTo("/advancesearch");
            //}
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
  }

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
    const formData = form.getFieldValue();
    setRequirementLoader(true);
    if(isShowPOSScreen){
      POSActionsOnContactDetails(formData, "REJECTED", null);
    }else{
      handleSubmit();
    }

  };
  const popupClose=()=>{
    setRaiseRequirementOpen(false)
  }

  const POSActionsOnContactDetails = (values, status, list) => {
    
    let content  = status === 'REJECTED' ? "Please Select Documents to Reject": "Please Select Documents to move  Internally"
  let seletedRequerimentList; 
  if(status === 'INTERNAL'){
    seletedRequerimentList = list
   }
  else if (status === 'REJECTED'){
seletedRequerimentList = raiseRequerimentList
   ?.filter((e) => e.status === true)
   ?.map((e) => e.raiseReqId);
   let dummy = '';
   seletedRequerimentList.forEach(x => {
     dummy = x.value;
   })
  }
   let internalFormValues = internalReqForm?.getFieldsValue();
 
  if(status !== 'APPROVED'){
   if((seletedRequerimentList.length===0  && status === 'REJECTED') || ((seletedRequerimentList.length===0 && !internalFormValues?.PosInternalReq) && status === 'INTERNAL')){
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
      Comments: values?.AuthorizerComments,
      TransactionPayload:  [],
    };
    if(status==="INTERNAL"){
      obj.TransactionPayload.push(
        {
          "Status": "create",
          "TagName": "InternalRequirementValue",
          "TagValue":JSON.stringify(seletedRequerimentList)
      },
       {
            "Status": "create",
            "TagName": "PosInternalReq",
            "TagValue": internalFormValues?.PosInternalReq || ""
        }
    )}

    obj.TransactionPayload.push(
      {
        "Status": "Create",
          "TagName": "POSComments1",
          "TagValue":values?.AuthorizerComments
    })
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
          if(status==="INTERNAL"){
            setAlertTitle(`${val?.data?.message}`);
          }
          else{
            setAlertTitle(status==="REJECTED"?"Requirement Raised":"Request Approved");
          }
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

  const calculateTotal = (row)=>{
    if(row) {
    const { zsprm, hrifeecnt, zwvrifee, totaltax } = row;
    const total = parseFloat(zsprm) + parseFloat(hrifeecnt - zwvrifee) + parseFloat(totaltax);
    return total;
    }else{
      return 0;
    }
  }
  let internalData=[
    { name: "authorizercomments",label: "Authorizer Comments ",inputType: "text",required: false,disabled:true,placeholder:"Authorizer Comments" },
    { name: "Comments",label: "Requestor Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Requestor Comments" },
    {name:"uploaddocuments",indexName:"Upload Documents",label:"Upload Documents",inputType:"upload",placeholder:"Upload Documents"},
    {name:"viewRequirements",indexName:"View Requirements",label:"View Requirements",inputType:"button", placeholder:"View Requirements"}
    ]
    useEffect(()=>{
    if(customerData?.isInternalFlow){
      POSContactData?.serviceRequestTransectionData?.forEach(element => {
        boeScreenObj[element.tagName] = element.tagValue
      });
      form.setFieldsValue({
        authorizercomments: boeScreenObj?.POSComments1,
      })

      setInternalReqData();
    }
    },[])

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
          onFinish={customerData?.isInternalFlow? "":handleSubmit}
          autoComplete="off"
        >
           {
            customerData?.isInternalFlow && selectedSubType==="gstwaiver"?
              <>
           <InternalFlow data={internalData}
            suffix={!isShowPOSScreen && suffix}
            policyDetails={props?.details?.policyDetailsObj?.identifiers?.applicationNo}
            form={form}
            customerData={customerData}
            POSContactData={POSContactData}
            boeScreenObj={boeScreenObj}
            Docs = {InternaRequirements}
           />
            </>
            
            : (
              <>
                   {selectedSubType==="gstwaiver"&&<>
            <div className="mb-16">
                   <h4 className="subtype-headings fs-16 fw-500">
                   View Premium Details
                      </h4>{"  "}
                  <div className="table-container email-table">
                    <table className="responsive-table">
                      <thead>
                        <tr>
                          {/* <th></th> */}
                          <th>Base Premium</th>
                          <th>Interest (If Any)</th>
                          <th>Total GST</th>
                          <th>Total Premium</th>
                        </tr>
                      </thead>
                      <tbody>
                      {premiumData?.map((row,index) => (
                          <tr  key={index}>
                            <td>{parseFloat(row.zsprm)?.toLocaleString()} </td>
                            <td>{parseFloat(row.hrifeecnt)?.toLocaleString()} </td>
                            <td>{parseFloat(row.totaltax)?.toLocaleString()} </td>
                            <td>{calculateTotal(row)?.toLocaleString()}</td>
                          </tr>
                        ))}
                      
                        {premiumData?.length === 0 && (
                          <tr>
                            <td colSpan="4">
                              <div className="text-center">
                                <span>No data available</span>
                              </div>
                            </td>
                          </tr>
                        )}
                       
                      </tbody>
                    </table>
                  </div>
               </div>
               {!isShowPOSScreen&&<>
            {renderDetailsForm("RequestForm_Fields")}
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
                {isShowPOSScreen &&(
                        <>
                          
                       
                       <InternalFlowPOS interlRequirementTagValue1 = {props.interlRequirementTagValue} selectedList = {POSContactData.serviceRequestTransectionData} getInternal = {getInternal} internalReqForm={internalReqForm}/>
                   
                    
                        </>
                      )}        
          </div>
          </>}
              </>
            )
          }
      
     
       
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
       sendOTPNumber={ClientEnquiry?.rmblphone} setDisableRequestForm={setDisableRequestForm} setValidateOTPSuccess={setValidateOTPSuccess} clientEnquiryData={ClientEnquiry}/>
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
    </>
  );
};

export default RenewalRelated;