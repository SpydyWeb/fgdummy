import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { AnnuityData } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import {
  Button,
  Form,
  Spin,
  Modal,
  Tooltip,
  Checkbox,
  message,
  Upload
} from "antd";
import moment from "moment";
import apiCalls from "../../api/apiCalls";
import PopupAlert from "../popupAlert";
import ContactForm from "../../utils/ContactForm";
import UploadIcon from "../../assets/images/upload.png";
import dayjs from "dayjs";
import CloseIcon from "../../assets/images/close-icon.png";
import OTPModal from "../../utils/OTPModal";
import ExistUpdateCheckBoxList from "../../utils/ExistUpdateCheckBoxList";
import InternalFlow from "../InternalFlow/InternalFlow";
import InternalFlowPOS from "../InternalFlow/InternalFlowPOS";
import RaiseRequirementPopup from "../RaiseRequirementPopup";
import { billFreq } from "../../utils/constantLU";

const Annuity = (props) => {
  const loginInfo = useSelector(state => state);
  const [form] = Form.useForm();
  const [requirementsForm] = Form.useForm();
  const [internalReqForm] = Form.useForm();
  const { selectedCallType, selectedSubType,selectedSubTypeId, customerData,details,setSelectedSubType,POSContactData,requestModeLU,annuityPlans } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertData, setAlertData] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isShowPOSScreen,setIsShowPOSScreen] = useState(false);  //pos screen showing purpose
  const [selectCheckBox, setSelectCheckBox] = useState(false);
  const [showEmailFields, setShowEmailFields] = useState(false);
  const [activeEmailIcons, setActiveEmailIcons] = useState([]);
  const [activeMobileIcons, setActiveMobileIcons] = useState([]);
  const [activeWhatsAppIcons, setActiveWhatsAppIcons] = useState([]);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmailAddress, setShowEmailAddress] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [isProcessLinks,setIsProcessLinks] = useState([]); 
  const [isDocLinks,setIsDocLinks] = useState([]);
  const [MstDesc,setMstDesc] = useState('');
  const [checkedList, setCheckedList] = useState([]);
  const [showRaiseRequirementBtn,setShowRaiseRequirementBtn] = useState(false);
  const [showResonDelayField,setShowReasonDelayField] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [counter, setCounter] = useState(0);
  const [otpValue, setOtpValue] = useState(null);
  const [sendOTPErrorMsg, setSendOTPErrorMsg] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [sendOTPLoader, setSendOTPLoader] = useState(false);
const [requirementModalLoader, setRequirementLoader] = useState(false);
const [validateBtnDisable, setValidateBtnDisable] = useState(false);
const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
const [serviceRequestId, setServiceRequestId] = useState(null);
const [uploadFiles,setUploadFiles] = useState([]);
const [isShowOTPModal,setIsShowOTPModal] = useState(false);
const [disableRequestForm,setDisableRequestForm] = useState(false);
const [disableOTP,setDisableOTP] = useState(true);
const [validateOTPSuccess, setValidateOTPSuccess] = useState(false);
const [clientEnquiryData,setClientEnquiryData] = useState([])
const [CNFBankAccNo, setCNFBankAccNo] = useState("");
const [BankAccNo, setBankAccNo] = useState("");
const [isCheckOTP, setIsCheckOTP] = useState(false);
const [isPaymentReprocessingData,setIsPaymentReprocessingData] = useState([]);
const [PayeeCode,setPayeeCode] = useState(null);
const [isShowErrorMsg, setShowErrorMsg] = useState(false);
const [certificationData,setCertificationData] = useState(false);
const [annuityEnquiryData,setAnnuityEnquiryData] = useState("");
const [IsPosEdited,setIsPosEdited] = useState(false);
const [idProofModal,setIdProofModal] = useState(false);
const [aadharIDUploadFiles,setAAdharIDUploadFiles] = useState([]);
const [passportIDUploadFiles,setPassportIDUploadFiles] = useState([]);
const [rationCardIDUploadFiles,setRationCardIDUploadFiles] = useState([]);
const [DrivingIDUploadFiles,setDrivingIDUploadFiles] = useState([]);
const [voterIDUploadFiles, setVoterIDUploadFiles] = useState([]);
const [pancardIDUploadFiles,setPancardIDUploadFiles] = useState([]);
const [isIDUploadMultipleFiles,setIsIDMultipleFiles] = useState([]);
const [uploadIDMultipleFiles,setUploadIDMultipleFiles] = useState([]);
const [authorizationuploadFiles,setuploadAuthorizationFiles] = useState([]);
const [docIdProofs,setDocIdProofs] = useState([]);
const [InternaRequirements, setInternalFlowRequirements] = useState("");
const [isAnnuitySelectionPlan, setIsAnnuitySelectionPlan] = useState("");
const [emsrequestchannel,setEmsrequestchannel]=useState();

  const suffix = <img src={UploadIcon} alt="" />;

  const posLifecertificateObj = {
    custRole:POSContactData?.custRole,
    srvReqID: POSContactData?.srvReqID,
  };
  
  const shouldLog = useRef(true);
useEffect(()=>{
  setShowAlert(false);
  setIsIDMultipleFiles([]);
setUploadIDMultipleFiles([]);
handleIdProofModalClose();
form.setFieldsValue({
    idProof: ""
})
  // if(details?.policyDetailsObj?.planAndStatus?.laProductType!=="04"){
  //   setAlertTitle("");
  //   setAlertData("Update Allowed only for laProductType  = '04'");
  //   setNavigateTo("/advancesearch");
  //   setShowAlert(true);
  //   return;
  // }
 
    getClientEnquiry();
    if(!customerData?.isPOS){
     // getPaymentReprocessing();
    }
   
},[selectedSubType])

useEffect( ()=>{
  if(POSContactData && customerData?.isPOS&&selectedSubType){
    POSContactData?.serviceRequestTransectionData?.forEach(element => {
      posLifecertificateObj[element.tagName] = element.tagValue
    });
    setIsShowPOSScreen(true);
    setIsCheckOTP(posLifecertificateObj?.ValidatedBy === "requestform" ? true: false);
    form.setFieldsValue({
      custRole: posLifecertificateObj?.custRole,
      srvReqID: posLifecertificateObj?.srvReqRefNo,
      CertifyingAuthorityName: posLifecertificateObj?.CertifyingAuthorityName,
      CertifyingDesignation: posLifecertificateObj?.CertifyingDesignation,
      CertifyingAuthorityAddress: posLifecertificateObj?.CertifyingAuthorityAddress,
      CertifyingDate: posLifecertificateObj?.CertifyingDate? dayjs(posLifecertificateObj?.CertifyingDate) : posLifecertificateObj?.CertifyingDate,
      COEValidFrom: posLifecertificateObj?.COEValidFrom ? dayjs(posLifecertificateObj?.COEValidFrom) : posLifecertificateObj?.COEValidFrom,
      COEValidTo: posLifecertificateObj?.COEValidTo ? dayjs(posLifecertificateObj?.COEValidTo) :posLifecertificateObj?.COEValidTo,
      RequestorComments: posLifecertificateObj?.RequestorComments,
      ValidateSignature:posLifecertificateObj?.ValidateSignature,
      CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
      BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
      ReasonForDelay: POSContactData?.reasonDelayed,
      ReasonForChange_New: posLifecertificateObj?.ReasonForChange_New,
      AnnuityMode: posLifecertificateObj?.AnnuityMode ? billFreq[posLifecertificateObj?.AnnuityMode] :"",
      AnnuityAmount: posLifecertificateObj?.AnnuityAmount,
      AnnuityPlan: posLifecertificateObj?.AnnuityPlan
    });
    AnnuityData[selectedSubType]?.POS_Details?.forEach(element => {
      if(element?.label?.includes("Reason For Delayed Submission")&&POSContactData?.reasonDelayed){
        element.hide= false;
        setShowReasonDelayField(true);
      }
    });
  }
},[])


const getPaymentReprocessing = ()=>{
  let response = apiCalls.getPaymentReprocessing(customerData?.policyNo,selectedCallType,selectedSubTypeId);
  response
    .then((val) => {
      if (val?.data) {
        setIsPaymentReprocessingData(val?.data[0]);
        setPayeeCode(val?.data[0]?.payeeCode)

        form?.setFieldsValue({
          Payment_Mode: val?.data[0]?.payment_Mode,
          Payment_Date: val?.data[0]?.payment_Date,
          Payment_Status: val?.data[0]?.payment_Status,
          Cheque_Status: val?.data[0]?.cheque_Status,
          ChequePOD_No: val?.data[0]?.cheque_POD_No,
        })
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
}

const disabledDate = (current,item) => {
  if (!current) return true;
  if (isShowPOSScreen && item?.name?.toLowerCase() === "certifyingdate") {
    // const currentDate = dayjs().startOf('day'); 
    // // Disable all dates after and including the `current` date
    // return current.isAfter(currentDate, 'day') || current.isSame(currentDate, 'day');
    return false; 
  }else {
    return current && current > dayjs().endOf("day"); // Can not select days before today and today
  }
  };

  const todaydatedisabled = (current) => {
    const currentDate = dayjs().startOf('day'); // Get the start of today
    return !current.isSame(currentDate, 'day'); // Disable all dates except for today
  };
  const featuredatedisabled = (current) => {
    return current && current < dayjs().startOf("day");
};
const handleDateChange1 = () =>{

}

  
const handleChange = (value) => {
  const emailDetails=AnnuityData[selectedSubType]?.Update_New_Details;
  if(loginInfo?.userProfileInfo?.profileObj?.isEmail){
    emailDetails.forEach(element => {
      if ( element?.name === "requestform") {
          element.required= false;
      }
  });
}

    handleEmpty();
    setShowAlert(false);
    // If the checkbox is already checked, uncheck it
    if (checkedList.includes(value)) {
      setCheckedList([]);
    } else {
      // Otherwise, check it
      setCheckedList([value]);
      if(value?.includes("View Existing Details")){
        GetCertificateOfExistenceEnquiry();
        getAnnuityEnquiry();
      }
      else if(value?.includes("Update New Details")&&details?.policyDetailsObj?.planAndStatus?.productType !== "TD"){
        setAlertTitle("");
        setAlertData("Call Type Not Applicable For this Policy");
       // setNavigateTo("/advancesearch");
       //if(!props?.EmailResponse?.IsEmailmanagent){
        //setNavigateTo("/advancesearch");
      //}
        setShowAlert(true);
      }
    else if(value?.includes("Update New Details")&&details?.policyDetailsObj?.planAndStatus?.productType === "TD"){
      GetCertificateOfExistenceEnquiry(value);
      getAnnuityEnquiry();
    }
    }
  };

  const getIFSCBankDetails =async(ifscCode)=>{
    let response = await apiCalls.getIFSCBanks(ifscCode);
    if (response.statusText) {
          if (response?.data.length >0) {
            form.setFieldsValue({
              BankName: response?.data[0]?.bank
            })
          } else {
            message.error({
              content:
              response?.data?.responseBody?.errormessage ||
                "Invalid IFSC",
              className: "custom-msg",
              duration: 2,
            });
  
            form.setFieldsValue({
              BankIFSC: '',
              BankName:""
            })
            
          }
        }
  }

  const handleInputChange =(e,item)=>{
    if(item.label?.includes("IFSC")&&e.target.value){
      getIFSCBankDetails(e.target.value);
    }
  }

  const onBlurInput =(value,item)=>{
    const obj = form.getFieldsValue(value)

    if(item.name === "BankIFSC" && value){
      getIFSCBankDetails(value);
    }

    if(item.name === 'ConfirmBankAccountNumber'){
      setCNFBankAccNo(value)
     }else if(item.name === 'BankAccountNumber'){
       setBankAccNo(value)
     }
   
   
     if(item.name === 'ConfirmBankAccountNumber'){
  
      if(BankAccNo !== value ){
              message.destroy();
        message.error({
          content:
            "Bank Number Not matched",
          className: "custom-msg",
          duration: 2,
        });
        form.setFieldsValue({ConfirmBankAccountNumber: ''})
      }
      //  const lastFourDigits = obj.ConfirmBankAccountNumber.slice(-4);
      //  const maskedString = '*'.repeat(obj.ConfirmBankAccountNumber.length - 4) + lastFourDigits;
      //  form.setFieldsValue({ConfirmBankAccountNumber: maskedString});
     
    }else if(value?.length >= 4 &&  item.name === 'BankAccountNumber'){
     const lastFourDigits = obj.BankAccountNumber.slice(-4);
     const maskedString = '*'.repeat(obj.BankAccountNumber.length - 4) + lastFourDigits;
     form.setFieldsValue({BankAccountNumber: maskedString})
    }



  }

  const toggleInputField = (field, item, index) => {
    setShowEmailFields(true);
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

  const getClientEnquiry = ()=>{
    setIsLoading(true);
    setDisableOTP(true);
        let obj = {
          clientNumber:  customerData?.poClientID
        
    };
    let empID = loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID
    let response = apiCalls.getClientEnquiry(obj,empID);
    response
      .then((val) => {
        if (val?.data) {
          setClientEnquiryData(val?.data?.responseBody);
          const res = val?.data?.responseBody;
          if(res?.rmblphone){
            setDisableOTP(false);
          }
        form.setFieldsValue({
          'mobileNo': res?.rmblphone,
          'whatsAppNo':  res?.rmblphone,
          'emailId': res?.rinternet
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
  }
  const getProcesDocLnk = () => {
    setIsDocLinks([]);
    let obj = {
      "Call_Typ" : null,
      "Sub_Typ" :null,
      "ProdType" : details?.policyDetailsObj?.planAndStatus?.productType,
      "ProdCode": details?.policyDetailsObj?.planAndStatus?.planCode,
       "ProdUIN": details?.policyDetailsObj?.planAndStatus?.productUIN,
  }
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
      .catch((err) => {
       
      });
  };
  const getProcesLink = () => {
    setIsProcessLinks([]);
    let obj = {
      "Call_Typ" : 20,
      "Sub_Typ":1
}
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
      .catch((err) => {
       
      });
  };

 

  const handleDropdownChange=(e,item)=>{
    // if(processNameLU){
    //       let slectedId= processNameLU.find((ele)=>{
    //          if(ele.mstID === e){
    //           setMstDesc(ele.mstDesc);
    //          }
    //          return false
    //       }) 
    // }
    // let selectDropDownValue = e ||null;
  
    // setSelectedSubType("processname");
    // setIsSelectedProcessName(selectDropDownValue);
    // props?.setSelectedSubTypeId(selectDropDownValue);
    // typesForm?.setFieldsValue({subType: selectDropDownValue})
  }
  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
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
        AnnuityData[selectedSubType]?.Update_New_Details?.forEach(element => {
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
//     else if(item === "CertifyingDate" && selectedSubType ==="lifecertificatesubmitted"){
//      // Assuming 'date' is a valid date string
// const oneYearLater = dayjs(date).add(1, 'year').toDate();
// // Format the calculated date to YYYY-MM-DD
// const formattedDate = dayjs(oneYearLater).format('YYYY-MM-DD');
// form.setFieldsValue({
//   COEValidFrom: dayjs(date),
//   COEValidTo:  dayjs(formattedDate).subtract(1, 'day'),
// });
//     }
else if (item === "CertifyingDate" && selectedSubType === "lifecertificatesubmitted") {
  const oneYearLater = dayjs(date).add(1, 'year'); 
  const oneDayBefore = oneYearLater.subtract(1, 'day'); 
  form.setFieldsValue({
      COEValidFrom: dayjs(date), 
      COEValidTo: oneDayBefore, 
  });
}
  };
  const getDocLink = () => {
    const filteredLinks = isDocLinks?.filter((item) => item.docType?.includes("Terms & Conditions"));
    // Assuming you want to return an array of links, you can use map
    const links = filteredLinks?.map((item) => item.link);
    return links?.length>0 ? links[0] : "";
}
const getProcessLink = () => {
  // const filteredLinks = isProcessLinks?.filter((item) => item.docType === isSelectedProcessName);
  const filteredLinks = isProcessLinks?.filter((item) => item.docType === MstDesc);
  
  const links = filteredLinks?.map((item) => item.link);
  return links?.length>0 ? links[0] : "";
}
  const getTransactionData = (values) => {
      return [
        { Status: "Create", TagName: "ProcessFileType", TagValue: "ProcessEmailer" },
        { Status: "Create", TagName: "DocLink", TagValue: getDocLink() || ""},
        { Status: "Create", TagName: "ProcessLink", TagValue: getProcessLink() || ""},
        { Status: "Create", TagName: "CertifyingAuthorityName", TagValue: values?.CertifyingAuthorityName },
        { Status: "Create", TagName: "CertifyingDesignation", TagValue: values?.CertifyingDesignation || ""},
        { Status: "Create", TagName: "CertifyingAuthorityAddress", TagValue: values?.CertifyingAuthorityAddress || ""},
        { Status: "Create", TagName: "CertifyingDate", TagValue: values?.CertifyingDate},
        { Status: "Create", TagName: "LastCOEUpdateDate", TagValue: certificationData?.zsigdate ?convertDate(certificationData?.zsigdate) : "" || ""},
        { Status: "Create", TagName: "COEValidFrom", TagValue: values?.COEValidFrom || ""},
        { Status: "Create", TagName: "COEValidTo", TagValue: values?.COEValidTo || ""},
        { Status: "Create", TagName: "ValidateSignature", TagValue: values?.ValidateSignature || ""},
        { Status: "Create", TagName: "RequestorComments", TagValue: values?.RequestorComments || ""},
        {Status: "Create",TagName: "Client_Id","TagValue": customerData?.laClientID},
        {Status: "Create",TagName: "AnnuityMode","TagValue": values?.AnnuityMode || annuityEnquiryData?.freqann},
        {Status: "Create",TagName: "AnnuityAmount","TagValue": values?.AnnuityAmount || annuityEnquiryData?.pymt},
        {Status: "Create",TagName: "AnnuityPlan","TagValue": values?.AnnuityPlan || isAnnuitySelectionPlan ||""},
        { Status: "Create", TagName: "requestchannel", TagValue: values?.requestchannel ||emsrequestchannel },
        {
          "Status": "Create",
          "TagName": "AdditionalNoteForCustomer",
          "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",
      },
        
      ];
  };

  const getSelectedCommunications = () =>{
    let communicationObj = []
    if(showEmailAddress||showWhatsApp||showPhoneNumber){
      communicationObj.push(
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
      )
    }
    if(showWhatsApp||showPhoneNumber){
      communicationObj.push(
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
      )
    }
    if(selectedSubType==="lifecertificatesubmitted"&&checkedList[0]==="Update New Details"){
      communicationObj.push(
        {
          SrvReqRefNo: "",
          TemplateID: "",
          CommType: 2,
          ReceipientTo:  import.meta.env.VITE_APP_RECEIPIENT_TO ? import.meta.env.VITE_APP_RECEIPIENT_TO : clientEnquiryData?.rinternet,
          ReceipientCC: import.meta.env.VITE_APP_RECEIPIENT_CC ? import.meta.env.VITE_APP_RECEIPIENT_CC : clientEnquiryData?.rinternet,
          MobileNos:"",
          ScheduledTime: new Date(),
          CommBody: "",
          Attachments: null,
        },
      )
    }
    if(selectedSubType==="lifecertificatesubmitted"&&checkedList[0]==="Update New Details"){
      communicationObj.push(
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
      )
    }
    return communicationObj;
  }

  const handleSubmit = (values) => {
    if(values?.CustomerSigningDate > values?.BranchReceivedDate){
      message.destroy();
      message.error({
        content: " customer signing date  can't be greater than  Request Received Date.",
        className: "custom-msg",
        duration: 3,
      });
      form.setFieldsValue({
        CustomerSigningDate: "",
      })
      setIsLoader(false);
      return
    }

    const newFilesArray = [];
    const uniqueFilesSet = new Set();
    
    if (uploadFiles?.length > 0) {
      uploadFiles.forEach(file => uniqueFilesSet.add(file));
    }
    
    if (uploadIDMultipleFiles?.length > 0) {
      uploadIDMultipleFiles.forEach(file => uniqueFilesSet.add(file));
    }
    // Add all unique files to newFilesArray
    newFilesArray.push(...uniqueFilesSet);

    if(!showEmailFields&&checkedList?.includes("Send COE Link")){
      message.destroy()
      message.warning({
        content:
          "Please select atleast one communication.",
        className: "custom-msg",
        duration: 2,
      });
      return;
    }
    setIsLoading(true);
    if (POSContactData && customerData?.isPOS) {
      POSActionsOnContactDetails(values, "APPROVED");
    }
    else {
    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: loginInfo?.userProfileInfo?.profileObj?.role || 0, // Required
      RequestChannel:  loginInfo?.userProfileInfo?.profileObj?.role === 14 ? 13 :  values.requestchannel,  // Required
      Category: checkedList?.includes("Update New Details") ? 2 : checkedList?.includes("View Existing Details") ? 1 : 3,
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
      RequestDateTime: values?.BranchReceivedDate
      ? new Date(values?.BranchReceivedDate)
      : new Date(),
      ReasonDelayed: values?.ReasonForDelay,
      CustSignDateTime: values?.CustomerSigningDate
      ? new Date(values?.CustomerSigningDate)
      : new Date(),
      "TransactionData": getTransactionData(values),
      "Uploads": newFilesArray || [
        
      ],
      CommunicationRequest: getSelectedCommunications() || [],
      CurrentStatus:raiseRequirementOpen? "Reject":'',
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
            }
      )
       }
    let response = apiCalls.genericAPI(obj);
    response
      .then((val) => {
        if (val?.data) {
          setAlertTitle(val?.data?.header);
          setAlertData(val?.data?.message);
          setShowAlert(true);
          setIsLoader(false);
          setRequirementLoader(false);
          // if(!val?.data?.srvReqRefNo){
          //   setAlertTitle(val?.data?.message);
          //   setShowAlert(true);
          //   setIsLoader(false);
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
        setRequirementLoader(false)
      })
      .catch((err) => {
        setIsLoading(false);
        setRequirementLoader(false)
      }); 
    }
  
  };

  const GetCertificateOfExistenceEnquiry = (checkedValue)=>{
    setIsLoading(true);
    setShowAlert(false);
    setShowErrorMsg(false);
      let empID = loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID;
    let response = apiCalls.GetCertificateOfExistenceEnquiry(customerData?.laClientID, empID);
    response
      .then((val) => {
        if (val?.data) {
           // Initialize variables to keep track of the maximum date and its corresponding record
    let maxDate = new Date(0);
    let maxRecord = null;

    // Iterate over the JSON data to find the record with the maximum date
    val?.data?.responseBody?.certificateOfExistenceEnquiry?.forEach(item => {
      // Skip records with zsigdate "99999999"
      if (item?.zsigdate === "99999999" || item?.zsigdate === "00000000"){
       return;
      }

      // Extract year, month, and day from the date string
      const year = parseInt(item.zsigdate.substring(0, 4));
      const month = parseInt(item.zsigdate.substring(4, 6)) - 1; // Subtract 1 because months are zero-indexed
      const day = parseInt(item.zsigdate.substring(6, 8));

      // Create a new Date object
      const currentDate = new Date(year, month, day);

      // Check if the current date is greater than the maximum date
      if (currentDate > maxDate) {
        maxDate = currentDate;
        maxRecord = item;
      }
    });
    const res = maxRecord;
          // const sortedData = [...val?.data?.responseBody?.certificateOfExistenceEnquiry];
          // sortedData.sort((a, b) => {
          //   return new Date(convertDate(b.zsigdate)) - new Date(convertDate(a.zsigdate));
          // });
                //const res = val?.data?.responseBody
                //const res = sortedData[0];
                if(checkedValue?.includes("Update New Details")) {
                  setCertificationData(res);
                }
                else {
                if(!res?.zsigdate && !res?.zpykpthld){
             setShowErrorMsg(true);
        setAlertTitle("");
        setAlertData("No Life Certificate Exists Currently");
        //setNavigateTo("/advancesearch");
        if(!props?.EmailResponse?.IsEmailmanagent){
          setNavigateTo("/advancesearch");
        }
        setShowAlert(true);
                }
                else {
                  setCertificationData(res);
                  form.setFieldsValue({
                    LastCOEUpdateDate: res?.zsigdate ?convertDate(res?.zsigdate) : res?.zsigdate,
                    COEValidFrom: res?.zsigdate ?convertDate(res?.zsigdate) : res?.zsigdate,
                    COEValidTo: res?.zpykpthld ?convertDate(res?.zpykpthld) : res?.zpykpthld,
                  })
                }
              }
              
            // val?.data?.responseBody?.certificateOfExistenceEnquiry?.forEach(ele => {
            // })
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
  }

  const getAnnuityEnquiry = (checkedValue)=>{
    setIsLoading(true);
    setShowAlert(false);
    setShowErrorMsg(false);
    let response = apiCalls.getAnnuityEnquiry(customerData?.policyNo);
    response
      .then((val) => {
        if (val?.data?.responseBody?.errorcode === "0") {
          setAnnuityEnquiryData(val?.data?.responseBody);
          let isPlan = val?.data?.responseBody?.ppind?.trim()
          ? annuityPlans.filter(x => x?.extrL_KEY === val?.data?.responseBody?.ppind?.trim())[0]?.mstDesc
          : "No Return Of Purchase Price";
          form.setFieldsValue({
            AnnuityMode: val?.data?.responseBody?.freqann ? billFreq[val?.data?.responseBody?.freqann]: null,
            AnnuityAmount: val?.data?.responseBody?.pymt ? val?.data?.responseBody?.pymt?.toLocaleString() : null,
            AnnuityPlan:  isPlan
          })
          setIsAnnuitySelectionPlan(isPlan);
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
  }

  const handleRadioChange =(e,item)=>{
    setIsShowOTPModal(false);
    let selectionValue = e.target.value;
       if(selectionValue === "no"&&item?.label?.includes("Validate Signature")){
        setShowRaiseRequirementBtn(true);
      }
      else if(selectionValue === "yes"&&item?.label?.includes("Validate Signature")){
        setShowRaiseRequirementBtn(false);
      }
    }
    
  const POSActionsOnContactDetails = (values, status, list) => {
    const formData = form?.getFieldValue();
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

          let reqFormValues = requirementsForm?.getFieldsValue();
          let internalFormValues = internalReqForm?.getFieldsValue();
         if(status !== 'APPROVED'){
                 if(((seletedRequerimentList.length===0 && !reqFormValues?.PosOtherReq)  && status === 'REJECTED') || ((seletedRequerimentList.length===0 && !internalFormValues?.PosInternalReq) && status === 'INTERNAL')){
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
      Comments: formData?.POSComments,
      TransactionPayload:  [
        {
          "Status": "Create",
          "TagName": "POSComments1",
        "TagValue":formData?.POSComments
      }
      ],
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
        },
    )}
      if(IsPosEdited&&selectedSubType==="lifecertificatesubmitted"){
        obj.TransactionPayload.push(
          { Status: "Update", TagName: "CertifyingAuthorityName", TagValue: values?.CertifyingAuthorityName || "" },
          { Status: "Update", TagName: "CertifyingDesignation", TagValue: values?.CertifyingDesignation || ""},
          { Status: "Update", TagName: "CertifyingAuthorityAddress", TagValue: values?.CertifyingAuthorityAddress || ""},
          { Status: "Update", TagName: "CertifyingDate", TagValue: values?.CertifyingDate},
          { Status: "Update", TagName: "COEValidFrom", TagValue: values?.COEValidFrom || ""},
          { Status: "Update", TagName: "COEValidTo", TagValue: values?.COEValidTo || ""},
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
          setAlertTitle(status==="REJECTED"?"Requirement Raised":`${val?.data?.message}`);
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
      // EmailId: customerData?.emailID,
      EmailId: import.meta.env.VITE_APP_RECEIPIENT_CC ? import.meta.env.VITE_APP_RECEIPIENT_CC : clientEnquiryData?.rinternet,
      //MobileNo: contactNewValue,
      MobileNo: import.meta.env.VITE_APP_RECEIPIENT_MOBILENO ? import.meta.env.VITE_APP_RECEIPIENT_MOBILENO : clientEnquiryData?.rmblphone,
      CallType: props?.selectedCallType,
      SubType: props?.selectedSubTypeId,
      OTP: isValue ? otpValue : 0,
      Body: '"CustomerName":"vishnu","Purpose":"claim intimation"',
    };
    let response = apiCalls.getSendOTP(obj);
    response
      .then((val) => {
        if (val?.data?.responseHeader?.issuccess || val?.data?.responseOutput?.[0]?.responseHeader?.issuccess) {
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
          }
        } else {
          setSendOTPLoader(false);
          message.destroy();
          message.error({
            content:
              val?.data?.responseBody?.errormessage || val?.data?.responseOutput?.[0]?.responseBody?.errormessage ||
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

  const handleEmpty =() =>{
    setShowPhoneNumber(false);
    setActiveEmailIcons([]);
    setActiveMobileIcons([]);
    setActiveWhatsAppIcons([]);
    setShowEmailAddress(false);
    setShowWhatsApp(false);
    form.resetFields();
  }

  const handleRequirementSubmit = () => {
    const formData = form.getFieldValue();
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


    const handleTextLink=(item)=>{
        if(item.linkValue?.toLowerCase() === "view"){
           const gConfig= apiCalls.getGenericConfig()
                    if(gConfig?.data?.dmsApiUrl){
          const url =  gConfig?.data?.dmsApiUrl +`/omnidocs/WebApiRequestRedirection?Application=BPMPOLENQ&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${details?.policyDetailsObj?.identifiers?.applicationNo}`;
          window.open(url, '_blank');
                    }
        }
      }
      const handleLabelLink=(item)=>{
        if(item.label === "Initiate Penny Drop"){
          InitiatePennyDropp();
        }
      }
    
      const getUploadFiles=(listOfUploadFiles)=>{
        // const updatedUploadList = listOfUploadFiles?.map((obj) => {
        //   // Create a new object without the propertyToDelete property
        //   const { labelName, ...newObject } = obj;
        //   return newObject;
        // });
        // Update the state with the new list
        setUploadFiles([...docIdProofs, ...listOfUploadFiles]);
    
      }
   
      const handleLinkValue  =(item)=>{
        if(item?.label?.includes("ID Proof of Requestor")){
          setIdProofModal(true);
        }
       }
      
      const InitiatePennyDropp = () => {
        const values = form.getFieldsValue();
        if(!values?.BankAccountNumber || !values?.AccountHolderName || !values?.BankIFSC){
          message.destroy();
          message.error({
            content:"Enter All Mandatory Feilds",
            className: "custom-msg",
            duration: 2,
          });
         return;
        }
        let obj = {
          "accountNumber":BankAccNo,
          "accountHolderName": values?.AccountHolderName || "",
          "ifsc": values?.BankIFSC,
          "consent": "Y",
          "nameMatchType": "Individual",
          "useCombinedSolution":"N",
          "allowPartialMatch": "true",
          "preset": "G",
          "suppressReorderPenalty": "true",
          "clientData":{
            caseId: "null"
           }
      };
        var pennyPayload = {
          requestHeader : { source : "POS"},
          requestBody : obj
        }
        let response = apiCalls.bankaccverification(pennyPayload);
        response
          .then((result) => {
            if (result?.data) {
              
             if(result?.data?.responseBody?.statusCode === 101){
              form.setFieldsValue({
                InitiatePennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.bankResponse
              })
             }else{
              form.setFieldsValue({
                InitiatePennyDrop: result?.data?.responseHeader?.message
              })
             }
            } else {
              setIsLoading(false);
              form.setFieldsValue({
                InitiatePennyDrop: 'Invalid Input',
             
              })
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
              InitiatePennyDrop: 'Invalid Input',
           
            })
          });
      };

      const handleTodayDateChange=()=>{}
     


    //commonly render all forms
    const renderDetailsForm = (formType) => {
        return (
          <DetailsForm
            data={AnnuityData[selectedSubType]?.[formType]}
            subType={selectedSubType}
            suffix={!isShowPOSScreen && suffix}
            form={form}
            handleRadioChange={handleRadioChange}
            handleDateChange={handleDateChange}
            handleTextLink ={handleTextLink}
            handleDropdownChange={handleDropdownChange}
            selectCheckBox={selectCheckBox}
            toggleInputField={toggleInputField}
            activeEmailIcons={activeEmailIcons}
            activeMobileIcons={activeMobileIcons}
            activeWhatsAppIcons={activeWhatsAppIcons}
            getUploadFiles={getUploadFiles}
            handleLabelLink ={handleLabelLink }
            disabledDate={disabledDate}
            onBlurInput={onBlurInput}
            disableRequestForm={disableRequestForm}
            disableOTP={disableOTP}
            handleInputChange={handleInputChange}
            todaydatedisabled={todaydatedisabled}
            handleTodayDateChange={handleTodayDateChange}
            featuredatedisabled={featuredatedisabled}
            requestModeLU = {requestModeLU}
            handleEdit={handleEdit}
            handleDateChange1={handleDateChange1}
            handleLinkValue={handleLinkValue}
          ></DetailsForm>
        );
      };


      const getInternal = (list) => {
        //  POSActionsOnContactDetails(values, "INTERNAL");
         const values = form.getFieldsValue();
         POSActionsOnContactDetails(values, "INTERNAL", list);
      }

      let boeScreenObj={};

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
        }

        if(props?.EmailResponse?.IsEmailmanagent){
          // Existing_Details
        //   if (!Array.isArray(AnnuityData[selectedSubType]?.Existing_Details)) {
        //     AnnuityData[selectedSubType].Existing_Details = [];
        // }
        // // Remove existing instances of "Additional Note For Customer" before adding a new one
        // AnnuityData[selectedSubType].Existing_Details = AnnuityData[selectedSubType].Existing_Details.filter(
        //     comment => comment.name !== "AdditionalNoteForCustomer"
        // );
        // // Add "Additional Note For Customer" once
        // AnnuityData[selectedSubType].Existing_Details.push(
        //   {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 1000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
        //    });
        AnnuityData[selectedSubType]?.Update_New_Details?.forEach(element => {
         if(element.name==="requestchannel"){
          form.setFieldsValue({ requestchannel: 4 });
            element.hide = true;
            setEmsrequestchannel(4)
        }
      })
        AnnuityData[selectedSubType]?.Update_New_Details?.forEach(element => {
          if (["CustomerSigningDate", "BranchReceivedDate", "ValidateSignature"].includes(element?.name)) {
              element.hide = true;
          }
      });
      if (!AnnuityData[selectedSubType]) {
        AnnuityData[selectedSubType] = {}; // Initialize it if undefined
                        }
          if (!Array.isArray(AnnuityData[selectedSubType]?.Update_New_Details)) {
            AnnuityData[selectedSubType].Update_New_Details = [];
        }
    // Remove existing instances of "Additional Note For Customer" before adding a new one
        AnnuityData[selectedSubType].Update_New_Details = AnnuityData[selectedSubType].Update_New_Details.filter(
            comment => comment.name !== "AdditionalNoteForCustomer"
        );
    // Add "Additional Note For Customer" once
        AnnuityData[selectedSubType].Update_New_Details.push(
          {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 4000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
          });
  
          if (AnnuityData[selectedSubType]?.Comments) {
            AnnuityData[selectedSubType].Comments = [
                { name: "AdditionalNoteForCustomer", label: "Additional Note For Customer", inputType: "complaintbox", maxlength: 4000, required: false, validationmsg: "Additional Note For Customer", placeholder: "Additional Note For Customer",  width: "100%", rows: 4  }
            ];
        }
  }
        setInternalReqData();
      },[])

      const handleEdit = (val)=>{
        if(val==='edit'){
          setIsPosEdited(true)
          AnnuityData[selectedSubType]?.POS_Details?.forEach(element => {
            if(element?.posEdit){
              element.disabled = false
            }
            
          })
          
        }else if(val==='close'){
          setIsPosEdited(false)
          AnnuityData[selectedSubType]?.POS_Details?.forEach(element => {
            if(element?.posEdit){
              element.disabled = true
            }
          })
          POSContactData?.serviceRequestTransectionData?.forEach(element => {
            posLifecertificateObj[element.tagName] = element.tagValue
          });
          form.setFieldsValue({
            // New_Line1: posScreenObj?.New_Line1,
            // New_Line2: posScreenObj?.New_Line2,
            // New_LandMark: posScreenObj?.New_LandMark,
            // New_Pincode:posScreenObj?.New_Pincode,
            // New_City:posScreenObj?.New_City,
            // New_State:posScreenObj?.New_State,
          })
        }
        
      }

      const getMultpleUploadFiles=(listOfUploadFiles,label)=>{
        if(listOfUploadFiles?.length >0 ){
          setUploadIDMultipleFiles(listOfUploadFiles);
          if(idProofModal){
            form.setFieldsValue({
              idProof:  `Documents Uploaded -  ${listOfUploadFiles.length }`,
            })
          }
      }
    }

      const getRaiseRequirements = () => {
    const formData = form.getFieldValue();
    setRaiseRequirementOpen(true);
    setRequirementLoader(true);
    let obj = {
      calltype: props?.selectedCallType,
      subtype: 1,
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
  };
    
      const uploadProps = {
        name: "file",
        multiple: false,
        fileList: [],
        customRequest: ({ file, onSuccess, index,item },label,idProofUpload) => {
          let formData = new FormData();
          const ApplicationNo =  details?.policyDetailsObj?.identifiers?.applicationNo
          formData.append("File", file, ApplicationNo+'/'+file.name);
          let response = apiCalls.fileUpload(formData);
          response
          .then((val) => {
            if (val?.data) {
              let newDocumentObj= {
                "IndexName": "Signature",
                "DocumentName":file?.name,
                "UserID": loginInfo?.userProfileInfo?.profileObj?.userName,
                "UploadedBy": loginInfo?.userProfileInfo?.profileObj?.name,
                "UploadedOn":   new Date(),
                "DocumentSize": file?.size,
                  "FileLocation": '/'+ApplicationNo+ '/',
                "BlobFileName": file?.name,
                "FileExtnMime": file?.type,
                "labelName": label,
                "name": file.name,
              }
              if(idProofModal){
                if (newDocumentObj.labelName && isIDUploadMultipleFiles?.length > 0) {
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
                    getMultpleUploadFiles(updatedUploadFiles,label);
                  } else {
                    // If doesn't exist, add the new file object to the list
                    setIsIDMultipleFiles((prevFiles) => [...prevFiles, newDocumentObj]);
                
                    // Send the updated files to getMultpleUploadFiles
                    // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
                    getMultpleUploadFiles([...isIDUploadMultipleFiles, newDocumentObj],label);
                  }
                } else {
                  // If labelName is not present or the array is empty, add the new file object to the list
                  setIsIDMultipleFiles((prevFiles) => [...prevFiles, newDocumentObj]);
                
                  // Send the updated files to getMultpleUploadFiles
                  // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
                   getMultpleUploadFiles([...isIDUploadMultipleFiles, newDocumentObj],label);
                }
              }
              //getMultpleUploadFiles(documnetsObj);
              //setUploadFiles(file);
              setDocIdProofs([{...newDocumentObj}]);
              if(idProofUpload === "idProofUpload"){
                if(label?.includes("Copy of Aadhar Card")){
                  setAAdharIDUploadFiles([{...newDocumentObj}]);
                }
                else if(label?.includes("Copy of Passport")){
                  setPassportIDUploadFiles([{...newDocumentObj}]);
                }
                else if(label?.includes("Copy of Ration Card")){
                  setRationCardIDUploadFiles([{...newDocumentObj}]);
                }
                else if(label?.includes("Copy of Driving License")){
                  setDrivingIDUploadFiles([{...newDocumentObj}]);
                }
                else if(label?.includes("Copy of PAN Card")){
                  setPancardIDUploadFiles([{...newDocumentObj}])
                }
                else if(label?.includes("Copy of Voter ID")){
                  setVoterIDUploadFiles([{...newDocumentObj}]);
                }
                else if(label?.includes("Copy of Authorization Letter")){
                  setuploadAuthorizationFiles([{...newDocumentObj}]);
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
          })
         
        
        },
        beforeUpload:(file) => {
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
            message.error("File don't allow double extension")
            return Upload.LIST_IGNORE;
          }
        }
        }
       
        const handleIdProofModalClose=()=>{
          setUploadFiles([]);
          setIdProofModal(false);
          setAAdharIDUploadFiles([]);
          setPassportIDUploadFiles([]);
          setRationCardIDUploadFiles([]);
          setDrivingIDUploadFiles([]);
          setVoterIDUploadFiles([]);
          setPancardIDUploadFiles([]);
          setuploadAuthorizationFiles([]);
        }
        const handleOk = (idProofBtn) => {
          if(idProofBtn==="idProof"){
          if(aadharIDUploadFiles?.length===0&&passportIDUploadFiles?.length===0&&rationCardIDUploadFiles?.length===0&&DrivingIDUploadFiles?.length===0&&voterIDUploadFiles?.length===0&&pancardIDUploadFiles?.length===0&&authorizationuploadFiles?.length===0){
            message.warning({
              content:
                "Please Upload atleast one file.",
              className: "custom-msg",
              duration: 2,
            });
          }else {
       // form.setFieldsValue({
          //   addressProof: uploadFiles[0].DocumentName
          // })
          setIdProofModal(false);
          }
        }
    
        };
      //   const handleRemove = (file) => {

      //     if(idProofModal){
      //       let updatedFiles = isIDUploadMultipleFiles?.filter((ele)=>{
      //         return ele?.labelName !== file.labelName
      // });
      // setIsIDMultipleFiles(updatedFiles)
      //       form.setFieldsValue({
      //         idProof:  `Documents Uploaded -  ${updatedFiles.length }`,
      //       })
      //     }
      //   }
      const handleRemove = (file) => {
      if(file?.labelName === "Copy of PAN Card"){
          // setPancardUploadFiles([]);
          setPancardIDUploadFiles([]);
        }
        else if(file?.labelName === "Copy of Aadhar Card"){
           setAAdharIDUploadFiles([]);
        }else if(file?.labelName === "Copy of Passport"){
          // setPassportUploadFiles([]);
          setPassportIDUploadFiles([]);
        }else if(file?.labelName === "Copy of Ration Card"){
         setRationCardIDUploadFiles([]);
        }else if(file?.labelName === "Copy of Driving License"){
          setDrivingIDUploadFiles([]);
        }
        else if(file?.labelName === "Copy of Voter ID"){
          setVoterIDUploadFiles([]);
        }
        else if(file?.labelName ==="Copy of Authorization Letter"){
          setuploadAuthorizationFiles([]);
        }
        else if(file?.labelName === "Utility Bill which is not more than 2 months"){
          // setUtilityUploadFiles([]);
        }
        else if(file?.labelName === "Bank statement/Passbook copy with latest 2 months transactions"){
          // setPassbookUploadFiles([]);
        }
         if(idProofModal){
          let updatedFiles = isIDUploadMultipleFiles?.filter((ele)=>{
            return ele?.labelName !== file.labelName
    });
    setIsIDMultipleFiles(updatedFiles)
          form.setFieldsValue({
            idProof:  `Documents Uploaded -  ${updatedFiles.length }`,
          })
        }
      }

        const setInternalReqData = () => {
          POSContactData.serviceRequestTransectionData?.forEach(element => {
             if(element.tagName === 'InternalRequirementValue'){
                 
                   setInternalFlowRequirements(props.interlRequirementTagValue);
             };
           });
       }

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
            customerData?.isInternalFlow?
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
                        {!isShowPOSScreen&&<>
              <ExistUpdateCheckBoxList
                checkedList={checkedList}
                handleChange={handleChange}
                options={[
                  { label: 'View Existing Details', value: 'View Existing Details', name: 'ViewExistingDetails' },
                  { label: 'Update New Details', value: 'Update New Details', name: 'UpdateNewDetails' },
                 // { label: 'Send COE Link', value: 'Send COE Link', name: 'SendCOELink' },
                ]}
              />
              {checkedList?.includes("View Existing Details")&&<>
              {renderDetailsForm("Existing_Details")}
              </>}
              {checkedList?.includes("Update New Details")&&<>
              {renderDetailsForm("Update_New_Details")}
              </>}
              {checkedList?.includes("Send COE Link")&&<>
              {renderDetailsForm("Share_CEO_Details")}
               {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
              </>}
            
          </>}
          {isShowPOSScreen&&<>
            {renderDetailsForm("POS_Details")}
            </>}
           
          

          {(checkedList?.length>0 || isShowPOSScreen) &&<>
          <div className="contact-details-btn">
          {/* {(!showRaiseRequirementBtn||isShowPOSScreen)&&<> */}
            <Button type="primary" className="primary-btn" htmlType="submit" disabled={showRaiseRequirementBtn}

            >
              {!isShowPOSScreen
                ? "Submit"
                : "Approve"}
            </Button>
            {/* </>} */}
            {/* {checkedList?.includes("Update New Details")&&<>
            <Button type="primary" className="primary-btn"
            >
             Reject Request
            </Button>
            </>} */}

            {(isShowPOSScreen || checkedList?.includes("Update New Details")) && (
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
             {
              isShowPOSScreen &&  
              // <Button type="primary" value="RaiseRequirement" onClick={() => InternalFlowPOS()} className="primary-btn" >
              // Internal Requirement
              // </Button>
              <InternalFlowPOS interlRequirementTagValue1 = {props.interlRequirementTagValue} selectedList = {POSContactData.serviceRequestTransectionData} getInternal = {getInternal} internalReqForm={internalReqForm}/>

            }
      
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
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of Aadhar Card","idProofUpload")}
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
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of Passport","idProofUpload")}
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
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of Ration Card","idProofUpload")}
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
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of Driving License","idProofUpload")}
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
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of Voter ID","idProofUpload")}
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
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of PAN Card","idProofUpload")}
                    action={
                      "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                    }
                      >
                         {suffix}
                        </Upload>
              </td>
            </tr>
              <tr>
                <td>7</td>
                <td>Copy of Authorization Letter</td>
                <td>
                <Upload 
                      {...uploadProps} 
                      fileList={authorizationuploadFiles}
                      onRemove={handleRemove}
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,pdf"
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of Authorization Letter","idProofUpload")}
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

      {isShowOTPModal &&<>
      <OTPModal form={form} customerData={customerData} isShowOTPModal={isShowOTPModal} setIsShowOTPModal={setIsShowOTPModal}
       sendOTPNumber={clientEnquiryData?.rmblphone} setDisableRequestForm={setDisableRequestForm} setValidateOTPSuccess={setValidateOTPSuccess} clientEnquiryData={clientEnquiryData}/>
      </>}
      {raiseRequirementOpen && <> 
       <RaiseRequirementPopup raiseRequerimentList={raiseRequerimentList} raiseRequirementOpen={raiseRequirementOpen} requirementModalLoader={requirementModalLoader} handleRequirementSubmit={handleRequirementSubmit} popupClose={popupClose} isShowPOSScreen={isShowPOSScreen} requirementsForm={requirementsForm}/>
       </>}
    </>
  );
};

export default Annuity;

