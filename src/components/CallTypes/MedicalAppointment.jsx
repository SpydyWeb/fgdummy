import React, { useState,useEffect } from "react";
import {useSelector } from "react-redux";

import { Data } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import {
  Button,
  Form,
  Spin,
  message,
  Row,
  Col,
  Modal,
  Checkbox
} from "antd";
import moment from "moment";
import apiCalls from "../../api/apiCalls";
import PopupAlert from "../popupAlert";
import UploadIcon from "../../assets/images/upload.png";
import ContactForm from "../../utils/ContactForm";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import InternalFlow from "../InternalFlow/InternalFlow";
import RaiseRequirementPopup from "../RaiseRequirementPopup";
const MedicalAppointment = (props) => {
  const loginInfo = useSelector((state) => state);
  const [form] = Form.useForm();
  const [requirementsForm] = Form.useForm();
  dayjs.extend(customParseFormat);
  const { selectedSubType, customerData, details, setSelectedSubType,POSContactData,requestModeLU,clientEnquiryData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertData, setAlertData] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const suffix = <img src={UploadIcon} alt="" />;
  const [showResonDelayField, setShowReasonDelayField] = useState(false);
  const [isShowPOSScreen, setIsShowPOSScreen] = useState(false);
  const [showEmailFields, setShowEmailFields] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmailAddress, setShowEmailAddress] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [activeEmailIcons, setActiveEmailIcons] = useState([]);
  const [activeMobileIcons, setActiveMobileIcons] = useState([]);
  const [activeWhatsAppIcons, setActiveWhatsAppIcons] = useState([]);
  const [medicalTestsCompleteModal, setMedicalTestsCompleteModal] =useState(false);
  const [medicalTestsPendingModal,setMedicalTestsPendingModal] =useState(false);
  const [isPreferDate,setIsPreferDate] = useState(null);
  const [isSelectedDate, setIsSelectedDate] = useState(null);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [uploadFiles,setUploadFiles] = useState([]);
  const [raiseRequirementOpen,setRaiseRequirementOpen] = useState(false);
  const [showRaiseRequirementBtn,setShowRaiseRequirementBtn] = useState(false);
  const [isLoader,setIsLoader] = useState(false);
  const [IsPosEdited,setIsPosEdited] = useState(false);
  const [updateFields,setUpdateFields] = useState(false);
  const [InternaRequirements, setInternalFlowRequirements] = useState("");
  const posMedicalReportsObj = {
    custRole:POSContactData?.custRole,
    srvReqID: POSContactData?.srvReqID,
    UWDecision:"",
    Comments:""
  };

  const posFixAppointmentsObj = {
    custRole:POSContactData?.custRole,
    srvReqID: POSContactData?.srvReqID,
    Medical_test:"",
    Home_medical:"",
    Preferred_Date:"",
    Preferred_Time:"",
    PinCode:"",
    City:"",
    State:"",
    Address:"",
    LandMark:"",
    Comments:"",
  };
  const posScreenObj = {
    custRole: '',
    srvReqID: POSContactData?.srvReqID,
    Medical_test:'',
	  Home_medical:'',
	  Preferred_Date:'',
	  Preferred_Time:'',
	  RequestorComments:'',
	  requestchannel:'',
    Comments:'',
  };
useEffect(() => {
  if(props?.EmailResponse?.IsEmailmanagent){
    if(selectedSubType==='medicalreportsrequired'){ 
    Data[selectedSubType]?.BOE_Details?.forEach(element => {
     if(element?.label==="Request Mode"){
       form.setFieldsValue({
         // requestchannel: "Email"
         requestchannel: 4
       });
       element.disabled=true;
     }
     if(element?.name === "UploadRequestForm"||element?.name === "CustomerSigningDate"||element?.name === "branchreceiveddate"||element?.name === "UploadApprovalEmail"){
       element.hide= true;
     }
   });
   Data[selectedSubType]?.Comments?.forEach(element => {
    if (!Array.isArray(Data[selectedSubType]?.Comments)) {
      Data[selectedSubType] = Data[selectedSubType] || {}; // Ensure selectedSubType exists
      Data[selectedSubType].Comments = []; // Initialize Comments as an array
  }
  
  Data[selectedSubType].Comments = Data[selectedSubType].Comments.filter(
      comment => comment.name !== "AdditionalNoteForCustomer"
  );
    
      // Add "Additional Note For Customer" once
      Data[selectedSubType].Comments.push(
        {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 4000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
        });
  });

  //  if(selectedSubType==='appointmentformedicaltest'){
  //  Data[selectedSubType]?.BOE_Details?.forEach(element => {
  //    if(element?.name==="requestchannel"){
  //      form.setFieldsValue({
  //        // requestchannel: "Email"
  //        requestchannel: 4
  //      });
  //      element.disabled=true;
  //    }
  //  });
  //  }
  }
  if(selectedSubType==='appointmentformedicaltest'){ 
    Data[selectedSubType]?.BOE_Details?.forEach(element => {
      if(element?.label==="Request Mode"){
        form.setFieldsValue({
          // requestchannel: "Email"
          requestchannel: 4
        });
        element.disabled=true;
      }
    })
  if (!Array.isArray(Data[selectedSubType]?.BOE_Details)) {
    Data[selectedSubType].BOE_Details = [];
}

// Remove existing instances of "Additional Note For Customer" before adding a new one
Data[selectedSubType].BOE_Details = Data[selectedSubType].BOE_Details.filter(
    comment => comment.name !== "AdditionalNoteForCustomer"
);

// Add "Additional Note For Customer" once
Data[selectedSubType].BOE_Details.push(
  {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 4000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
  });
}
}
},[selectedSubType,props?.EmailResponse?.IsEmailmanagent])
  useEffect(() => {
    if(details?.policyDetailsObj?.planAndStatus?.policyStatus === 'IF'){
      if(props?.EmailResponse?.IsEmailmanagent){
        Data[selectedSubType]?.BOE_Details?.forEach(element => {
          if(element?.name === "UploadRequestForm"){
            element.hide= true;
            renderDetailsForm("BOE_Details")
          }
        });
      }else{
        Data[selectedSubType]?.BOE_Details?.forEach(element => {
          if(element?.name === "UploadRequestForm"){
            element.hide= false;
            renderDetailsForm("BOE_Details")
          }
        });
      }
      
     }
 else if(details?.policyDetailsObj?.planAndStatus?.policyStatus !== 'IF'){
  Data[selectedSubType]?.BOE_Details?.forEach(element => {
    if(element?.name === "UploadApprovalEmail"){
      element.hide= false;
      renderDetailsForm("BOE_Details")
    }
  });
  
 }
    if(POSContactData && customerData?.isPOS&&selectedSubType==="medicalreportsrequired"){
      POSContactData?.serviceRequestTransectionData?.forEach(element => {
        posMedicalReportsObj[element.tagName] = element.tagValue
      });
      setIsShowPOSScreen(true);
      form.setFieldsValue({
        custRole: posMedicalReportsObj?.custRole,
        srvReqID: posMedicalReportsObj?.srvReqRefNo,
        UWDecision: posMedicalReportsObj?.UWDecision,
        RequestorComments: posMedicalReportsObj?.Comments,
        CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
        BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
        ReasonForDelay: POSContactData?.reasonDelayed,
        requestchannel: POSContactData?.reqMode
        
      });
      Data[selectedSubType]?.POS_Details?.forEach(element => {
        if(element?.label?.includes("Reason For Delayed Submission")&&POSContactData?.reasonDelayed){
          element.hide= false;
          setShowReasonDelayField(true);
        }
      });
    }
    else if(POSContactData && customerData?.isPOS&&selectedSubType==="appointmentformedicaltest"){
      POSContactData?.serviceRequestTransectionData?.forEach(element => {
        posFixAppointmentsObj[element.tagName] = element.tagValue
      });
      setIsShowPOSScreen(true);
      form.setFieldsValue({
        custRole: posFixAppointmentsObj?.custRole,
        srvReqID: posFixAppointmentsObj?.srvReqRefNo,
        Medical_test: posFixAppointmentsObj?.Medical_test,
        Home_medical: posFixAppointmentsObj?.Home_medical,
        // Preferred_Date: posFixAppointmentsObj?.Preferred_Date,
        Preferred_Date: posFixAppointmentsObj?.Preferred_Date 
        ? dayjs(posFixAppointmentsObj.Preferred_Date, 'DD/MM/YYYY') 
        : null,
        // Preferred_Time: posFixAppointmentsObj?.Preferred_Time,
        Preferred_Time: posFixAppointmentsObj?.Preferred_Time 
        ? dayjs(posFixAppointmentsObj.Preferred_Time, 'HH:mm') 
        : null,
        PinCode: posFixAppointmentsObj?.PinCode,
        City: posFixAppointmentsObj?.City,
        State:posFixAppointmentsObj?.State,
        Address: posFixAppointmentsObj?.Address,
        LandMark: posFixAppointmentsObj?.LandMark,
        RequestorComments: posFixAppointmentsObj?.Comments,
        requestchannel: POSContactData?.reqMode
      });
    }
},[])

const handleEdit = (val)=>{
   if(val==='edit'){
      setIsPosEdited(true)
     Data[selectedSubType]?.POS_Details?.forEach(element => {
       if(element?.posEdit){
         element.disabled = false;
       }
     })
     
   }else if(val==='close'){
      setIsPosEdited(false)
     Data[selectedSubType]?.POS_Details?.forEach(element => {
       if(element?.posEdit){
         element.disabled = true;
       }
     })
     POSContactData?.serviceRequestTransectionData?.forEach(element => {
        posScreenObj[element.tagName] = element.tagValue
     });
     form.setFieldsValue({
      Medical_test:posScreenObj?. Medical_test,
      Home_medical:posScreenObj?.Home_medical,
      // Preferred_Date:posScreenObj?.Preferred_Date,
      // Preferred_Time:posScreenObj?.Preferred_Time,
      Preferred_Date: posScreenObj?.Preferred_Date 
      ? dayjs(posScreenObj.Preferred_Date, 'DD/MM/YYYY') 
      : null,
      // Preferred_Time: posFixAppointmentsObj?.Preferred_Time,
      Preferred_Time: posScreenObj?.Preferred_Time 
      ? dayjs(posScreenObj.Preferred_Time, 'HH:mm') 
      : null,
      // RequestorComments:posScreenObj?.RequestorComments,
      // requestchannel:posScreenObj?.requestchannel,
     })
   }
  
 }
const disabledDate = (current,item) => {
  if(item?.pastDate){
    const todayStartOfDay = dayjs().startOf("day");
   return current ? current <= todayStartOfDay : true;// Can not select days before today and today
  }
  else {
    return current && current > dayjs().endOf("day"); // Can not select days after today and today
  }
  
};

  // const getUploadFiles=(listOfUploadFiles)=>{
  //   const updatedUploadList = listOfUploadFiles?.map((obj) => {
  //     // Create a new object without the propertyToDelete property
  //     const { labelName, ...newObject } = obj;
  //     return newObject;
  //   });
  //   // Update the state with the new list
  //   setUploadFiles(updatedUploadList);

  // }

  const getUploadFiles=(listOfUploadFiles)=>{
    // const updatedUploadList = listOfUploadFiles?.map((obj) => {
    //   // Create a new object without the propertyToDelete property
    //   const { labelName, ...newObject } = obj;
    //   return newObject;
    // });
    // Merge the new list with the existing one
    const PreviouslyFiles = [...uploadFiles, ...listOfUploadFiles]; // Commenting This line bez, adding Duplicate Files Upload like, 1,12,123..
    // Update the state with the new list
    setUploadFiles(PreviouslyFiles);

  }

 useEffect(()=>{
  const emailDetails=Data[selectedSubType]?.BOE_Details;
    if(loginInfo?.userProfileInfo?.profileObj?.isEmail){
      emailDetails.forEach(element => {
        if ( element?.name === "UploadRequestForm") {
            element.required= false;
        }
    });
    }
 },[])

  const handleDropdownChange=(e,item)=>{
    
  }
  const handleRadioChange=(e,item)=>{
  
  }
  const handleTextLink=(item)=>{
    if(item?.linkValue?.toLowerCase() === "view"){
          const gConfig= apiCalls.getGenericConfig()
          if(gConfig?.data?.dmsApiUrl){
     const url =  gConfig?.data?.dmsApiUrl + `/omnidocs/WebApiRequestRedirection?Application=BPMPOLENQ&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${details?.policyDetailsObj?.identifiers?.applicationNo}`;
     window.open(url, '_blank');
          }
   }
 }
  const handleDateChange = (date, item) => {
    if (item === "branchreceiveddate") {
      setShowReasonDelayField(false);
      let newDate = new Date();
      let todayDate = moment(newDate).format("DD/MM/YYYY");
      let selectDate = moment(date + 1).format("DD/MM/YYYY");
      if (selectDate < todayDate) {
        setShowReasonDelayField(true);
      }
    }
    if(item?.toLowerCase() == "preferred_date"){
        let selectDate = moment(date + 1).format("DD/MM/YYYY");
        setIsPreferDate(selectDate)
      }else{
        let selectDate = moment(date + 1).format("DD/MM/YYYY");
        setIsSelectedDate(selectDate);
      }
  };
  const disabledTime = (now,item) => {
    const currentHour = now.hour();
    const currentMinute = now.minute();
    const currentSecond = now.second();
    let newDate = new Date();
      let todayDate = moment(newDate).format("DD/MM/YYYY");
    // Example: Disable hours before the current hour
    const disabledHours = () => {
      const hours = [];
      if(isPreferDate === todayDate){
        for (let i = 0; i < currentHour; i++) {
          hours.push(i);
        }
      }
      else if(item?.featureTime&&isSelectedDate>=todayDate) {
        for (let i = currentHour + 1; i < 24; i++) {
          hours.push(i);
        }
      }
     
      return hours;
    };

    // Example: Disable minutes before the current minute for the current hour
    const disabledMinutes = (selectedHour) => {
      if (selectedHour === currentHour) {
        const minutes = [];
        if(isPreferDate === todayDate){
        for (let i = 0; i < currentMinute; i++) {
          minutes.push(i);
        }
      }
      else if(item?.featureTime&&isSelectedDate>=todayDate) {
        for (let i = currentMinute + 1; i < 60; i++) {
          minutes.push(i);
        }
      }
        return minutes;
      }
      return [];
    };

    // Example: Disable seconds for the current hour and minute
    const disabledSeconds = (selectedHour, selectedMinute) => {
      if (selectedHour === currentHour && selectedMinute === currentMinute) {
        const seconds = [];
        if(isPreferDate === todayDate){
        for (let i = 0; i < currentSecond; i++) {
          seconds.push(i);
        }
      }
      else if(item?.featureTime&&isSelectedDate>=todayDate) {
        for (let i = currentSecond + 1; i < 60; i++) {
          seconds.push(i);
        }
      }
        return seconds;
      }
      return [];
    };

    return {
      disabledHours,
      disabledMinutes,
      disabledSeconds,
    };
  }


      //commonly render all forms
      const renderDetailsForm = (formType) => {
        return (
          <DetailsForm
            data={Data[selectedSubType]?.[formType]}
            subType={selectedSubType}
             suffix={!isShowPOSScreen && suffix}
            form={form}
            handleRadioChange={handleRadioChange}
            handleDateChange={handleDateChange}
            handleDropdownChange={handleDropdownChange}
            toggleInputField={toggleInputField}
            activeEmailIcons={activeEmailIcons}
            activeMobileIcons={activeMobileIcons}
            activeWhatsAppIcons={activeWhatsAppIcons}
            handleTextLink ={handleTextLink }
            disabledDate={disabledDate}
            disabledTime={disabledTime}
            getUploadFiles={getUploadFiles}
            onBlurInput = {onBlurInput}
            handleEdit = {handleEdit}
            requestModeLU={requestModeLU}
          ></DetailsForm>
        );
      };

      const onBlurInput = ()=>{

      }

      const toggleInputField = (field, item, index) => {
        setShowEmailFields(true);
        form.setFieldsValue({
          'mobileNo': customerData?.mobileNo || clientEnquiryData?.rmblphone,
      'whatsAppNo':  customerData?.mobileNo || clientEnquiryData?.rmblphone,
      'emailId': customerData?.emailID || clientEnquiryData?.rinternet
        });
        switch (field) {
          case 'phone':
            setShowPhoneNumber(!showPhoneNumber);
            setActiveMobileIcons(prevIcons => {
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
          case 'email':
            setShowEmailAddress(!showEmailAddress);
            setActiveEmailIcons(prevIcons => {
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
          case 'whatsapp':
            setShowWhatsApp(!showWhatsApp);
            setActiveWhatsAppIcons(prevIcons => {
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
        const formattedDate = moment(inputDate, 'YYYYMMDD').format('DD/MM/YYYY');
        return formattedDate;
      };

      const handleRequirementSubmit = () => {
        const formData = form.getFieldValue();
        setRequirementLoader(true);
        if(isShowPOSScreen){
          POSActionsOnContactDetails(formData, "REJECTED");
        }else{
          saveRequest();
        }
        
      };

      const getTransactionData = (values) => {
        if (selectedSubType === "medicalreportsrequired") {
          return [
            {
              "Status": "Create",
              "TagName": "AdditionalNoteForCustomer",
              "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",
            },
           
            { Status: "Create", TagName: "UWDecision", TagValue: values.UWDecision },
            { Status: "Create", TagName: "Comments", TagValue: values.Comments },
            {Status: "Create",TagName: "Client_Id","TagValue": customerData?.poClientID},
            {Status: "Create",TagName: "requestchannel",TagValue:values.requestchannel},
          ];
        } else if(selectedSubType === "appointmentformedicaltest") {
          return [
            {
              "Status": "Create",
              "TagName": "AdditionalNoteForCustomer",
              "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",
            },
            { Status: "Create", TagName: "requestchannel", TagValue: values?.requestchannel},
            { Status: "Create", TagName: "Medical_test", TagValue: values.Medical_test },
            { Status: "Create", TagName: "Home_medical", TagValue: values.Home_medical },
            { Status: "Create", TagName: "Preferred_Date", TagValue: values.Preferred_Date? moment(values.Preferred_Date +1).format("DD/MM/YYYY") :values.Preferred_Date },
            // { Status: "Create", TagName: "Preferred_Time", TagValue: values.Preferred_Time ? moment(values.Preferred_Time, "HH:mm").add(1, 'days').format("HH:mm") : values.Preferred_Time},
            { Status: "Create", TagName: "Preferred_Time", TagValue: values.Preferred_Time
              ? dayjs(values.Preferred_Time).format("h:mm:ssA")
              : values.Preferred_Time},
            { Status: "Create", TagName: "PinCode", TagValue: values.PinCode },
            { Status: "Create", TagName: "City", TagValue: values.City },
            { Status: "Create", TagName: "State", TagValue: values.State },
            { Status: "Create", TagName: "Address", TagValue: values.Address },
            { Status: "Create", TagName: "LandMark", TagValue: values.LandMark },
            { Status: "Create", TagName: "Comments", TagValue: values.Comments },
            {Status: "Create",TagName: "Client_Id","TagValue": customerData?.poClientID},
          ];
        }
      };
    
      const handleSubmit = (values) => {
        if (POSContactData && customerData?.isPOS) {
          POSActionsOnContactDetails(values, "APPROVED");
        } else {
          // if (
          //   values.ValidateSignature === "no"
          // ) {
          //   getRaiseRequirements();
          // } else {
            saveRequest();
         // }
        }
      };
      const popupClose=()=>{
        setRaiseRequirementOpen(false)
      }

      const saveRequest = ()=>{
        // setIsLoading(true);
        const values = form.getFieldsValue();
        if(values.CustomerSigningDate > values.branchreceiveddate){
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
          CustomerId: values.GSTINToBeUpdateFor=== 1?  customerData?.laClientID:customerData?.poClientID,
          CustRole: values.custRole,
          policyStatus:
          details?.policyDetailsObj?.planAndStatus?.policyStatus || customerData?.policyStatus,
          proposerName: details?.policyDetailsObj?.identifiers?.po_Name || customerData?.po_Name,
          plan: details?.policyDetailsObj?.planAndStatus?.planName || customerData?.planName,
          // "BranchId": 7890,
          // "CurrentStatus": 3,
          CreatedOn: new Date(),
          CreatedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
          CreatedUsrId: loginInfo?.userProfileInfo?.profileObj?.userName,
          ModifiedOn: new Date(),
          ModifiedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
          AssignedToRole: "", //POS
          AssignedByUser: 0,
          ReasonForChange: "",
          RequestDateTime: values?.branchreceiveddate
          ? new Date(values?.branchreceiveddate)
          : new Date(),
          ReasonDelayed: values?.resonfordelay||values?.ReasonForDelay,
          CustSignDateTime: values?.CustomerSigningDate
          ? new Date(values?.CustomerSigningDate)
          : new Date(),
          TransactionData: getTransactionData(values)||[],
          Uploads:  uploadFiles,
          CurrentStatus:raiseRequirementOpen? "Reject":'',
         CommunicationRequest: [
            {
              SrvReqRefNo: "",
              TemplateID: "",
              CommType: 2,
              ReceipientTo:  import.meta.env.VITE_APP_RECEIPIENT_TO ? import.meta.env.VITE_APP_RECEIPIENT_TO : clientEnquiryData?.rinternet,
            ReceipientCC: import.meta.env.VITE_APP_RECEIPIENT_CC ? import.meta.env.VITE_APP_RECEIPIENT_CC : clientEnquiryData?.rinternet,
              // "ReceipientTo": customerData?.emailID,
              // "ReceipientCC": customerData?.emailID,
              MobileNos: "",
              ScheduledTime: new Date(),
              CommBody: "",
              Attachments: null,
            },
            // {
            //   SrvReqRefNo: "",
            //   TemplateID: "",
            //   CommType: 1,
            //   ReceipientTo: "",
            //   ReceipientCC: "",
            //   MobileNos: import.meta.env.VITE_APP_RECEIPIENT_MOBILENO ? import.meta.env.VITE_APP_RECEIPIENT_MOBILENO : clientEnquiryData?.rmblphone,
            //   // "MobileNos": customerData?.mobileNo,
            //   ScheduledTime: new Date(),
            //   CommBody: "",
            //   Attachments: null,
            // },
          ],
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
              // if(!val?.data?.srvReqRefNo){
                setAlertTitle(val?.data?.header);
                setAlertData(val?.data?.message);
                setShowAlert(true);
                setIsLoader(false);
                setRequirementLoader(false);
              //   return
              // }
              // if (val?.data?.category == 2) {
              //   setAlertTitle("Request Created Successfully");
              //   let successMessage = val?.data?.tat > 0 ?
              //     `Ticket ID Number ${val?.data?.srvReqRefNo}. Your request will be processed in ${val?.data?.tat || 0} days`
              //     : `Ticket ID Number ${val?.data?.srvReqRefNo}.`;
              //   setAlertData(successMessage);
              // } else {
              //   setAlertTitle("Query Raised Successfully");
              //   let successMessage = `Ticket ID Number ${val?.data?.srvReqRefNo}.`;
              //   setAlertData(successMessage);
              // }
              // setNavigateTo("/advancesearch");
              // setShowAlert(true);
              // if (raiseRequirementOpen) {
              //   setRaiseRequirementOpen(false);
              //   setRequirementLoader(false);
              // }
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
      }

      
    const handleError = (errorMessage) => {
      message.destroy();
      message.error({
        content: errorMessage || "Something went wrong please try again!",
        className: "custom-msg",
        duration: 2,
      });
    };


      const POSActionsOnContactDetails = (values, status) => {
        let seletedRequerimentList = raiseRequerimentList
          ?.filter((e) => e.status === true)
          ?.map((e) => e.raiseReqId);
          if(seletedRequerimentList.length===0  && status === 'REJECTED'){
            setIsLoading(false);
            setRequirementLoader(false);
            handleError("Please Select Documents to Reject.");
          return;
          }
     
    
        let obj = {
          TransectionId: 1,
          SrvReqRefNo: POSContactData?.srvReqRefNo,
          Status: status,
          RequirementList: seletedRequerimentList,
          UsrID: loginInfo?.userProfileInfo?.profileObj?.userName,
          RoleID: loginInfo?.userProfileInfo?.profileObj?.role,
          "RequirementComments":values?.RequestorComments,
          POSComments1: values?.Comments,
          TransactionPayload: [
            {
              "Status": "Create",
              "TagName": "POSComments1",
              "TagValue":values?.Comments || ""
          }
          ],
        };
        
if(IsPosEdited && selectedSubType ==='appointmentformedicaltest'){
  obj.TransactionPayload.push(
    {
      "Status": "Update",
      "TagName": "Medical_test",
      "TagValue":values?.Medical_test
  },
  {
    "Status": "Update",
    "TagName": "Home_medical",
    "TagValue":values?.Home_medical
},
{
  "Status": "Update",
  "TagName": "Preferred_Date",
  "TagValue":values?.Preferred_Date
},
{
"Status": "Update",
"TagName": "Preferred_Time",
"TagValue":values?.Preferred_Time
},
{
"Status": "Update",
"TagName": " RequestorComments",
"TagValue":values?.RequestorComments
},
{
"Status": "Update",
"TagName": " requestchannel",
"TagValue":values?.requestchannel
}

  )

}
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
              setAlertTitle(`${val?.data?.message}`);
              setNavigateTo(
                (showRaiseRequirementBtn && "/advancesearch") || "/dashboard"
              );
              setAlertData(`${"Ticket No " + val?.data?.srvReqRefNo}`);
              setShowAlert(true);
            } else {
              handleError(val?.data?.responseBody?.errormessage ||
                "Something went wrong please try again!",);
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

        let roleID = 0;
        if (props.selectedCallType === 21)
        {
            roleID = loginInfo?.userProfileInfo?.profileObj?.role
        }
        else
        {
            roleID = loginInfo?.userProfileInfo?.profileObj?.role === 1 ? 1 : 0
        }

        let obj = {
          calltype: props?.selectedCallType,
          subtype: props?.selectedSubTypeId,
          // Role:isShowPOSScreen?0:1
          Role:roleID
          // Role:11
        };
        let response = apiCalls.getRaiseRequirements(obj);
        response
          .then((val) => {
            if (typeof val?.data !== 'string') {
              setRequirementLoader(false);
              const itemCount = roleID === 11 ? 2 : val.data.length;
              const limitedList = val.data.slice(0, itemCount);
              setRaiseRequerimentList(limitedList);
              // setRaiseRequerimentList(val.data);
            } else {
              setRequirementLoader(false);
              handleError(typeof val?.data === 'string' && val?.data ||
              val?.data?.responseBody?.errormessage ||
              "Something went wrong please try again!");
            }
          })
          .catch((err) => {
            setRequirementLoader(false);
          });
      };
      const setInternalReqData = () => {
         POSContactData.serviceRequestTransectionData?.forEach(element => {
            if(element.tagName === 'InternalRequirementValue'){
                
                  setInternalFlowRequirements(props.interlRequirementTagValue);
            };
          });
      }
       let boeScreenObj={};
       let internalData = [
         { name: "authorizercomments", label: "Authorizer Comments ", inputType: "text", required: false, disabled: true, placeholder: "Authorizer Comments" },
         { name: "Comments", label: "Requestor Comments", inputType: "textarea", maxlength: 500, required: false, validationmsg: "Enter Comments", placeholder: "Requestor Comments" },
         { name: "uploaddocuments", indexName: "Upload Documents", label: "Upload Documents", inputType: "upload", placeholder: "Upload Documents" },
         { name: "viewRequirements", indexName: "View Requirements", label: "View Requirements", inputType: "button", placeholder: "View Requirements" }
       ]
       useEffect(() => {
         if (customerData?.isInternalFlow) {
           POSContactData?.serviceRequestTransectionData?.forEach(element => {
             boeScreenObj[element.tagName] = element.tagValue
           });
           form.setFieldsValue({
             authorizercomments: boeScreenObj?.POSComments1,
           })
           setInternalReqData();
     
         }
       }, [])
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
          {
          customerData?.isInternalFlow ?
            <>
              <InternalFlow data={internalData}
                suffix={!isShowPOSScreen && suffix}
                policyDetails={props?.details?.policyDetailsObj?.identifiers?.applicationNo}
                form={form}
                customerData={customerData}
                POSContactData={POSContactData}
                boeScreenObj={boeScreenObj}
                Docs={InternaRequirements}
              />
            </>

            :(
          <>
            {/* Medical Reports Required SubType Code Start */}
            {selectedSubType==="medicalreportsrequired"&&<>
            {/* <Row gutter={[16, 16]} className="reasons-list">
                <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xxl={12}
                className="loan-checkboxes"
              >
                <div className="medical-reports" onClick={()=>setMedicalTestsCompleteModal(true)}>View List of Medical Tests Completed </div>
               </Col>
               <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xxl={12}
                className="loan-checkboxes"
              >
                <div className="medical-reports" onClick={()=>setMedicalTestsPendingModal(true)}>View Medical Tests Outstanding </div>
               </Col>
               </Row> */}
             {!isShowPOSScreen&&<>
                {renderDetailsForm("BOE_Details")}
                {showResonDelayField&&<>
                {renderDetailsForm("ReasonSubmission")}
              </>}
              {renderDetailsForm("Comments")}
             </>}
             {isShowPOSScreen&&<>
                {renderDetailsForm("POS_Details")}
                {renderDetailsForm("Send_Medical_Reports")}
                {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
             </>}
             <div className="contact-details-btn">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="primary-btn"
                >
                  {isShowPOSScreen?"Approve":"Submit"}
                </Button>{" "}
                {(isShowPOSScreen || !isShowPOSScreen) && (
              <>
                <Button
                  type="primary"
                  className="primary-btn"
                 onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
              </>
            )}
              </div>
            </>}
             {/* Medical Reports Required SubType Code End */}

            {/* Fix Appointment SubType Code Start */}
            {selectedSubType==="appointmentformedicaltest"&&<>
                {renderDetailsForm(isShowPOSScreen? "POS_Details" : "BOE_Details")}
             <div className="contact-details-btn">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="primary-btn"
                >
                {isShowPOSScreen?"Approve":"Submit"}
                </Button>{" "}

                {(isShowPOSScreen || !isShowPOSScreen) && (
              <>
                <Button
                  type="primary"
                  className="primary-btn"
                 onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
              </>
            )}

              </div>
            </>}
            {/* Fix Appointment SubType Code Start */}
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

<Modal
        title="View List of Medical Tests Completed"
        open={medicalTestsCompleteModal}
        destroyOnClose={true}
        width={800}
        closeIcon={false}
        footer={null}
      >
        <Spin spinning={""}>
          <div  >
            <Form >
              <div className="reuirement">
              <table className="responsive-table">
                <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Medical Tests Completed</th>
                </tr></thead>
                <tbody>
                 <tr>
                    <td>1</td>
                    <td>Blood Reports</td>
                 </tr>
                 <tr>
                    <td>2</td>
                    <td>ECG</td>
                 </tr>
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
                  onClick={() => setMedicalTestsCompleteModal(false)}
                >
                  Close
                </Button>
              </div>
            </Form>
          </div>

          
        </Spin>
      </Modal>
      <Modal
        title="View Medical Tests Outstanding"
        open={medicalTestsPendingModal}
        destroyOnClose={true}
        width={800}
        closeIcon={false}
        footer={null}
      >
        <Spin spinning={""}>
          <div  >
            <Form >
              <div className="reuirement">
              <table className="responsive-table">
                <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Medical Tests Pending</th>
                </tr></thead>
                <tbody>
                 <tr>
                    <td>1</td>
                    <td>Blood Reports</td>
                 </tr>
                 <tr>
                    <td>2</td>
                    <td>ECG</td>
                 </tr>
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
                  onClick={() => setMedicalTestsPendingModal(false)}
                >
                  Close
                </Button>
              </div>
            </Form>
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
                  {raiseRequerimentList?.length>0 && raiseRequerimentList?.map((item, ind) => (
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
       {raiseRequirementOpen && <> 
       <RaiseRequirementPopup raiseRequerimentList={raiseRequerimentList} raiseRequirementOpen={raiseRequirementOpen} requirementModalLoader={requirementModalLoader} handleRequirementSubmit={handleRequirementSubmit} popupClose={popupClose} isShowPOSScreen={isShowPOSScreen} requirementsForm={requirementsForm}/>
       </>}
    </>
  );
};

export default MedicalAppointment;