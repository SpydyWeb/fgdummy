import React, { useState, useEffect, useRef } from "react";
import { connect,useSelector } from "react-redux";
import { PaymentReProcessingData } from "../../mainconfig";
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
  Row,
  Col,
  Input
} from "antd";
import moment from "moment";
import apiCalls from "../../api/apiCalls";
import PopupAlert from "../popupAlert";
import ContactForm from "../../utils/ContactForm";
import UploadIcon from "../../assets/images/upload.png";
import dayjs from "dayjs";
import CloseIcon from "../../assets/images/close-icon.png";
import OTPModal from "../../utils/OTPModal";
import InternalFlow from "../InternalFlow/InternalFlow";
import InternalFlowPOS from "../InternalFlow/InternalFlowPOS";
import { formatAmountSafe } from "../../utils/HelperUtilites";


const PaymentReProcessing = (props) => {
  const loginInfo = useSelector(state => state);
  const [form] = Form.useForm();
  const [internalReqForm] = Form.useForm();
  const { selectedCallType, selectedSubType,selectedSubTypeId, customerData,details,setSelectedSubType,typesForm,ProductRelatedPortalLU,processNameLU,POSContactData,bankAccTypeLU,requestModeLU } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertData, setAlertData] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [paymentDetailsOpen,setPaymentDetailsOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isShowPOSScreen,setIsShowPOSScreen] = useState(false);  //pos screen showing purpose
  const [isShowTransferFields,setIsShowTransferFields] = useState(false);
  const [selectCheckBox, setSelectCheckBox] = useState(false);
  const [isShowConditionalFields,setIsShowCOnditionalFields] = useState(false);
  const [showEmailFields, setShowEmailFields] = useState(false);
  const [activeEmailIcons, setActiveEmailIcons] = useState([]);
  const [activeMobileIcons, setActiveMobileIcons] = useState([]);
  const [activeWhatsAppIcons, setActiveWhatsAppIcons] = useState([]);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmailAddress, setShowEmailAddress] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [isProcessLinks,setIsProcessLinks] = useState([]); 
  const [isDocLinks,setIsDocLinks] = useState([]);
  const [isSelectedProcessName,setIsSelectedProcessName] = useState("");
  const [isProcessNameLU,setIsProcessNameLU] = useState([]);
  const [MstDesc,setMstDesc] = useState('');
  const [checkedList, setCheckedList] = useState([]);
  const [isPaymentMethodSelection,setIsPaymentMethodSelection] = useState("");
  const [isShowRequestFormFields,setIsShowRequestFormFields] = useState(false);
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
const [sendOTPTo,setSendOTPTo] = useState(null);
const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
const [serviceRequestId, setServiceRequestId] = useState(null);
const [paymentMethodList,setPaymentMethodList] = useState([]);
const [uploadFiles,setUploadFiles] = useState([]);
const [isSelectionMode,setIsSelectionMode] = useState(null);
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
const [deDupeModalOpen, setDeDupeModalOpen] = useState(false);
const [BankduDupeData,setBankDeDupeData] = useState([]);
const [InternaRequirements, setInternalFlowRequirements] = useState("");
const [isShowPOSBankDetails,setIsShowPOSBankDetails] = useState(false);
const [payoutsData,setPayoutsData] = useState([]);
const [selectedCheckbox, setSelectedCheckbox] = useState(null);
const [isMandateSelection,setIsMandateSelection] = useState({});
const [isPOSPayoutsData, setIsPOSPayoutsData] = useState([]);
const [isUpdateValue, setIsUpdateValue] = useState(false);
const [isButtonShow, setIsButtonShow] = useState(false);
  const [isAccoundetail, setIsAccoundetail] = useState(false);
  const [accountDetailsData, setAccountDetailsData] = useState(null);

const suffix = <img src={UploadIcon} alt="" />;

  const posReprocessingObj = {
    custRole:POSContactData?.custRole,
    srvReqID: POSContactData?.srvReqID,
    TicketId: "",
    CallType: "",
    SubType: "",
    Status:"",
    PaymentDate: "",
    PaymentAmount:"",
    PaymentMode:"",
    UTRNo: "",
    ValidateSignature: "",
    BranchComments: "",
    ValidatedBy: "",
    posReprocessingObj: "",
    initiateReprocessing: "",
    CustomerSigningDate: "",
    BranchReceivedDate: ""
  };

  const handleACCCheckboxChange = (index,item) => {
    setSelectedCheckbox(index);
    setIsMandateSelection(item);
  };
  const formatDate = (dateString) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${day}/${month}/${year}`;
};

const accoutDeailHandler = payout => {
  setAccountDetailsData(payout);
  setIsAccoundetail(true);
}
  const shouldLog = useRef(true);
useEffect(()=>{
  form.resetFields();
  // if(shouldLog.current){
  //   shouldLog.current = false;
    getClientEnquiry();
    if(!customerData?.isPOS){
      getPaymentReprocessing();
    }
    // if(selectedSubType==="surrender"){
      if(!isShowPOSScreen)getPayoutDetailsEnquiry();
    //}
    //getDropdownData();
//   getProcesLink();
//   getClientEnquiry();
//   getProcesDocLnk();
 // }
 if(props?.EmailResponse?.IsEmailmanagent){
  if(selectedSubType === "unclaimedamountpayout"){
    PaymentReProcessingData[selectedSubType]?.Request_Details?.forEach(element => {
      if(element?.name === "ReasonDelayed"){
        element.required = false;
        element.hide= true;
      } 
    })
  }
  PaymentReProcessingData[selectedSubType]?.Request_Details?.forEach(element => {
    if(element?.name === "UploadRequestForm"||element?.name === "CustomerSigningDate"||element?.name === "BranchReceivedDate"||element?.name === "ValidateSignature"){
      element.hide= true;
    } 
  });
// }
PaymentReProcessingData[selectedSubType]?.NEFT_Bank_Details?.forEach(element => {
  if (element?.name === "requestchannel") {
    form.setFieldsValue({
      requestchannel: 4,
      // requestmode: "Email",
    });
    element.disabled = true;
  }
})
if (!PaymentReProcessingData[selectedSubType]) {
  PaymentReProcessingData[selectedSubType] = {}; // Initialize if undefined
}  
  if (!Array.isArray(PaymentReProcessingData[selectedSubType]?.Request_Details)) {
    PaymentReProcessingData[selectedSubType].Request_Details = [];
}
PaymentReProcessingData[selectedSubType].Request_Details = PaymentReProcessingData[selectedSubType].Request_Details.filter(
    comment => comment.name !== "AdditionalNoteForCustomer"
);
PaymentReProcessingData[selectedSubType].Request_Details.push(
  {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 4000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
  });
}
},[selectedSubType])


useEffect( ()=>{
  if(POSContactData && customerData?.isPOS&&selectedSubType){
    // if(selectedSubType==="surrender"){
      POSContactData?.serviceRequestTransectionData?.forEach(element => {
        posReprocessingObj[element.tagName] = element.tagValue
      });
      setIsShowPOSScreen(true);
      form.setFieldsValue({
        custRole: posReprocessingObj?.custRole,
        srvReqID: posReprocessingObj?.srvReqRefNo,
        requestchannel: POSContactData?.reqMode,
        ValidateSignature:posReprocessingObj?.ValidateSignature,
        CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
        BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
        // CustomerSigningDate: POSContactData?.custSignDateTime
        // ? dayjs(POSContactData.custSignDateTime).format('YYYY-MM-DD') 
        // : POSContactData?.custSignDateTime,
        // BranchReceivedDate: POSContactData?.requestDateTime
        // ? dayjs(POSContactData.requestDateTime).format('YYYY-MM-DD') // or your desired format
        // : POSContactData?.requestDateTime,
        ReasonDelayed: POSContactData?.reasonDelayed,
        NameAsMentionedInTheBank: posReprocessingObj?.NameAsMentionedInTheBank,
        BankIFSC: posReprocessingObj?.BankIFSC,
        BankAccountNumber: posReprocessingObj?.BankAccountNumber,
        BankName: posReprocessingObj?.BankName,
        BranchName: posReprocessingObj?.BranchName,
        InitiatePennyDrop: posReprocessingObj?.InitiatePennyDrop,
        pennyDropResult: posReprocessingObj?.pennyDropResult,
        //RequestBy:  posReprocessingObj?.ValidatedBy,
        AccountType: posReprocessingObj?.AccountType,
        RequestorComments: posReprocessingObj?.RequestorComments,
        initiateReprocessing: posReprocessingObj?.initiateReprocessing,
        reasonForReprocessing: posReprocessingObj?.reasonForReprocessing,
        NameMatch:posReprocessingObj?.NameMatch
      });
      PaymentReProcessingData[selectedSubType]?.POS_Details?.forEach(element => {
        if(element?.label?.includes("Reason For Delayed Submission")&&POSContactData?.reasonDelayed){
          element.hide= false;
          setShowReasonDelayField(true);
        }
      });
      const newData = POSContactData?.serviceRequestTransectionData?.filter(
        item => item.status === 'Create' && ["TicketId","Status","PaymentDate","PayableAmount"].includes(item.tagName)
      );
      // Consolidate data into an object
      const consolidatedNewData = newData?.reduce((acc, item) => {
        acc[item?.tagName] = item?.tagValue;
        return acc;
      }, {});
    setIsPOSPayoutsData([consolidatedNewData]);
  
  }
},[])


const getPaymentReprocessing = () =>{
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

const disabledDate = (current) => {
    return current && current > dayjs().endOf("day"); // Can not select days before today and today
  };

const handleChange = (value) => {
    handleEmpty();
    // If the checkbox is already checked, uncheck it
    if (checkedList.includes(value)) {
      setCheckedList([]);
    } else {
      // Otherwise, check it
      setCheckedList([value]);
    }
  };

  const getIFSCBankDetails =async(ifscCode)=>{
    let response = await apiCalls.getIFSCBanks(ifscCode);
    if (response.statusText) {
          if (response?.data.length >0) {
            form.setFieldsValue({
              BankName: response?.data[0]?.bank,
              BranchName: response?.data[0]?.branch,
              POSBankName: response?.data[0]?.bank,
              POSBranchName: response?.data[0]?.branch
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
              BankName:"",
              POSBankName: '',
              POSBankIFSC: ''
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

    if((item.name === "BankIFSC"||item.name === "POSBankIFSC") && value){
      getIFSCBankDetails(value);
    }

    if(item.name === 'ConfirmBankAccountNumber' ||item.name === 'POSreenteraccountNumber'){
      setCNFBankAccNo(value)
     }else if(item.name === 'BankAccountNumber' || item.name === 'POSBankAccountNumber'){
       setBankAccNo(value)
     }
   
   
     if(item.name === 'ConfirmBankAccountNumber'||item.name === 'POSreenteraccountNumber'){
  
      if(BankAccNo !== value ){
              message.destroy();
        message.error({
          content:
            "Bank Number Not matched",
          className: "custom-msg",
          duration: 2,
        });
        form.setFieldsValue({ConfirmBankAccountNumber: '',POSreenteraccountNumber:""})
      }
      //  const lastFourDigits = obj.ConfirmBankAccountNumber.slice(-4);
      //  const maskedString = '*'.repeat(obj.ConfirmBankAccountNumber.length - 4) + lastFourDigits;
      //  form.setFieldsValue({ConfirmBankAccountNumber: maskedString});
     
    }else if(value?.length >= 4 &&  item.name === 'BankAccountNumber'){
     const lastFourDigits = obj.BankAccountNumber.slice(-4);
     const maskedString = '*'.repeat(obj.BankAccountNumber.length - 4) + lastFourDigits;
     form.setFieldsValue({BankAccountNumber: maskedString})
    }
    else if(value?.length >= 4 &&  item.name === 'POSBankAccountNumber'){
      const lastFourDigits = obj.POSBankAccountNumber.slice(-4);
      const maskedString = '*'.repeat(obj.POSBankAccountNumber.length - 4) + lastFourDigits;
      form.setFieldsValue({POSBankAccountNumber: maskedString})
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
    let response = apiCalls.getClientEnquiry(obj,loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID);
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
    if(item?.name==="AccountType" || item.name ==="POSAccountType" || item.name ==="requestchannel")return;
    if(processNameLU){
          let slectedId= processNameLU?.find((ele)=>{
             if(ele.mstID === e){
              setMstDesc(ele.mstDesc);
             }
             return false
          }) 
    }
    let selectDropDownValue = e ||null;
  
    setSelectedSubType("processname");
    setIsSelectedProcessName(selectDropDownValue);
    props?.setSelectedSubTypeId(selectDropDownValue);
    typesForm?.setFieldsValue({subType: selectDropDownValue})
  }
  const convertDate = (inputDate) => {
      if(inputDate){
        const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
        return formattedDate;
      }else{
        return ''
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
        PaymentReProcessingData[selectedSubType]?.Request_Details?.forEach(element => {
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
        {"Status": "Create","TagName": "AdditionalNoteForCustomer","TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"", },
    {Status: "Create",TagName: "Client_Id","TagValue":  customerData?.poClientID ||""},
    {Status: "Create",TagName: "initiateReprocessing","TagValue":  values?.initiateReprocessing || ""},
    {Status: "Create",TagName: "reasonForReprocessing","TagValue":  values?.reasonForReprocessing || ""},
    {Status: "Create",TagName: "BankIFSC","TagValue":  values?.BankIFSC || ""},
    {Status: "Create",TagName: "BankName","TagValue":  values?.BankName || ""},
    {Status: "Create",TagName: "BranchName","TagValue":  values?.BranchName || ""},
    {Status: "Create",TagName: "AccountType","TagValue":  values?.AccountType || ""},
    {Status: "Create",TagName: "NameAsMentionedInTheBank","TagValue":  values?.NameAsMentionedInTheBank || ""},
    {Status: "Create",TagName: "BankAccountNumber","TagValue":  values?.BankAccountNumber || ""},
    {Status: "Create",TagName: "ConfirmBankAccountNumber","TagValue":  values?.ConfirmBankAccountNumber || ""},
    {Status: "Create",TagName: "InitiatePennyDrop","TagValue":  values?.InitiatePennyDrop || ""},
    {Status: "Create",TagName: "NameAsPerPennyDrop","TagValue":  values?.NameAsPerPennyDrop || ""},
    {Status: "Create",TagName: "NameMatch","TagValue":  values?.NameMatch || ""},
    { "Status": "Create",
      "TagName": "ValidateSignature",
      "TagValue": values?.ValidateSignature || ""
  },
  {
    "Status": "Create",
    "TagName": "RequestorComments",
    "TagValue": values?.RequestorComments|| ""
},
{Status: "Create",TagName: "TicketId","TagValue":  isMandateSelection?.ticketId || ""},
// {Status: "Create",TagName: "CallType","TagValue":  isMandateSelection?.callType || ""},
// {Status: "Create",TagName: "SubType","TagValue":  isMandateSelection?.subType || ""},
{Status: "Create",TagName: "Status","TagValue":  isMandateSelection?.STATUS || ""},
{Status: "Create",TagName: "PaymentDate","TagValue":  isMandateSelection?.AUTHDATE || ""},
{Status: "Create",TagName: "PayableAmount","TagValue":  isMandateSelection?.PAYAMT || ""},
// {Status: "Create",TagName: "PaymentMode","TagValue":  isMandateSelection?.paymentMode || ""},
// {Status: "Create",TagName: "UTRNo","TagValue":  isMandateSelection?.utrNo || ""},
  ]
    // }
//       return [
//         { Status: "Create", TagName: "ProcessFileType", TagValue: "ProcessEmailer" },
//         { Status: "Create", TagName: "ProcessName", TagValue: isSelectedProcessName || values.ProcessName },
//         { Status: "Create", TagName: "DocLink", TagValue: getDocLink() || ""},
//         { Status: "Create", TagName: "ProcessLink", TagValue: getProcessLink() || ""},
//         { Status: "Create", TagName: "Payout_Made_For", TagValue: values.Payout_Made_For || ""},
//         { Status: "Create", TagName: "Payment_Mode", TagValue: values.Payment_Mode || ""},
//         { Status: "Create", TagName: "Payment_Date", TagValue: values.Payment_Date || ""},
//         { Status: "Create", TagName: "Payment_Status", TagValue: values.Payment_Status || ""},
//         { Status: "Create", TagName: "Cheque_Status", TagValue: values.Cheque_Status || ""},
//         { Status: "Create", TagName: "ChequePOD_No", TagValue: values.ChequePOD_No || ""},
//         { Status: "Create", TagName: "Reason_For_Reprocessing", TagValue: values.Reason_For_Reprocessing || ""},
//         { Status: "Create", TagName: "NameAsMentionedInTheBank", TagValue: values.NameAsMentionedInTheBank || ""},
//         { Status: "Create", TagName: "BankIFSC", TagValue: values.BankIFSC || ""},
//         { Status: "Create", TagName: "BankName", TagValue: values.BankName || ""},
//         { Status: "Create", TagName: "BranchName", TagValue: values.BranchName || ""},
//         { Status: "Create", TagName: "AccountType", TagValue: values.AccountType || ""},
//         { Status: "Create", TagName: "NameAsMentionedInTheBank", TagValue: values.NameAsMentionedInTheBank || ""},
//         { Status: "Create", TagName: "BankAccountNumber", TagValue: values.BankAccountNumber || ""},
//         { Status: "Create", TagName: "ConfirmBankAccountNumber", TagValue: values.ConfirmBankAccountNumber || ""},
//         { Status: "Create", TagName: "InitiatePennyDrop", TagValue: values.InitiatePennyDrop || ""},
//         { Status: "Create", TagName: "NameAsPerPennyDrop", TagValue: values.NameAsPerPennyDrop || ""},
//         { Status: "Create", TagName: "NameMatch", TagValue: values.NameMatch || ""},
//         { Status: "Create", TagName: "ValidatedBy", TagValue: values?.ValidatedBy ? values?.ValidatedBy : 'form'},
//         { Status: "Create", TagName: "ValidateSignature", TagValue: values.ValidateSignature || ""},
//         {
//           Status: "Create",
//           TagName: "Reprocessing_by",
//           TagValue: values.Reprocessing_by || (isPaymentMethodSelection?.toLowerCase() === "banktransfer" ? "BankTransfer" : "Cheque") || ""
//       },
//         { Status: "Create", TagName: "Comments", TagValue: values.Comments || ""},
//         { Status: "Create", TagName: "PayeeCode ", TagValue: isPaymentReprocessingData?.payeeCode || ""},

// {
//           "Status": "Create",
//           "TagName": "ReasonFor_Representation",
//           "TagValue": "No"
// },
// {
//           "Status": "Create",
//           "TagName": "AccType",
//           "TagValue": "1"
// },
// {
//           "Status": "Create",
//           "TagName": "RCD",
//           "TagValue":isPaymentReprocessingData?.rcd||"",
// },
// {
//           "Status": "Create",
//           "TagName": "APE",
//           "TagValue": isPaymentReprocessingData?.ape||"",
// },
// {
//           "Status": "Create",
//           "TagName": "PayableAmount",
//           "TagValue": isPaymentReprocessingData?.payableAmount||"",
// }
// ,
// {
//           "Status": "Create",
//           "TagName": "FundTransferAmount",
//           "TagValue": isPaymentReprocessingData?.fundTransferAmount||"",
// },
// {
//           "Status": "Create",
//           "TagName": "TotalAmount",
//           "TagValue": isPaymentReprocessingData?.totalAmount||"",
// },
// {
//           "Status": "Create",
//           "TagName": "FundTransferTo",
//           "TagValue": isPaymentReprocessingData?.fundTransferTo||"",
// },
// {
//           "Status": "Create",
//           "TagName": "OldSerReq",
//           "TagValue": isPaymentReprocessingData?.oldSerReq||"",
// },
//       ];
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
    return communicationObj;
  }
  const handleSubmit = (values) => {
   // setIsShowPOSScreen(!isShowPOSScreen);
    // if(!showEmailFields){
    //   message.destroy()
    //   message.warning({
    //     content:
    //       "Please select atleast one communication.",
    //     className: "custom-msg",
    //     duration: 2,
    //   });
    //   return;
    // }
    if(values.CustomerSigningDate > values.BranchReceivedDate){
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
    if (POSContactData && customerData?.isPOS) {
      POSActionsOnContactDetails(values, "APPROVED", null);
    }
    else {
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
      CustomerId: customerData?.poClientID ?? "",
      "CustRole":values.custRole,
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
      ReasonDelayed: values?.ReasonDelayed,
      CustSignDateTime: values?.CustomerSigningDate
      ? new Date(values?.CustomerSigningDate)
      : new Date(),
      "TransactionData": getTransactionData(values),
      "Uploads": uploadFiles || [
        
      ],
      CommunicationRequest: getSelectedCommunications() || [],
      CurrentStatus:raiseRequirementOpen? "Reject":'',
  }

  if(raiseRequirementOpen){
    let ids = raiseRequerimentList?.filter((e) => e.status === true)?.map((e) => e.raiseReqId)
    obj.TransactionData.push({
      "Status": "Create",
      "TagName": "ReasonList_Key",
      "TagValue":  JSON.stringify(ids)
    })
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
      })
      .catch((err) => {
        setIsLoading(false);
      }); 
    }
  };

  const handleRadioChange =(e,item)=>{
    setIsShowOTPModal(false);
    const selectionValue = e.target.value;

    if (item?.name === "initiateReprocessing") {
      if(selectionValue==="no"){
        setIsButtonShow(true)
      }
      else{
        setIsButtonShow(false)
      }
      let updatedNEFTBankDetails = [...PaymentReProcessingData[selectedSubType]?.NEFT_Bank_Details];
      updatedNEFTBankDetails = updatedNEFTBankDetails.map(element => {
        if (element?.name === "reasonForReprocessing" || element?.name ==="requestchannel" || element?.name === "bankdetails" || element?.name==="BankIFSC" || element?.name==="BankName" || element?.name==="BranchName" || element?.name==="AccountType" || element?.name==="NameAsMentionedInTheBank" || element?.name==="BankAccountNumber" || element?.name==="ConfirmBankAccountNumber" || element?.name==="InitiatePennyDrop" || element?.name==="NameAsPerPennyDrop" || element?.name==="NameMatch") {          
          return { ...element, hide: selectionValue === "no" ? true:false };
        }
        setIsUpdateValue(!isUpdateValue)
        return element; 
      });  
      PaymentReProcessingData[selectedSubType].NEFT_Bank_Details = updatedNEFTBankDetails;
    }

    if (item?.name === "initiateReprocessing") {
      let updatedNEFTBankDetails = [...PaymentReProcessingData[selectedSubType]?.Request_Details];
      updatedNEFTBankDetails = updatedNEFTBankDetails.map(element => {
        if (element?.name === "requestformtitle" || element?.name === "UploadChequeCopy" || element?.name==="UploadRequestForm" || element?.name==="CustomerSigningDate" || element?.name==="BranchReceivedDate"|| element?.name==="ValidateSignature") {          
          return { ...element, hide: selectionValue === "no" ? true:false };
        }
        setIsUpdateValue(!isUpdateValue)
        return element; 
      });  
      PaymentReProcessingData[selectedSubType].Request_Details = updatedNEFTBankDetails;
    }
    
   
    
  
    const emailDetails=PaymentReProcessingData[selectedSubType]?.Request_Details;
    if(loginInfo?.userProfileInfo?.profileObj?.isEmail){
      emailDetails.forEach(element => {
        if ( element?.name === "UploadRequestForm" || element?.name === "CustomerSigningDate" || element?.name === "BranchReceivedDate" || element?.name === "ValidateSignature") {
            element.hide= true;
            element.required= false;
        }
    });
    }
        if(item?.label?.includes("Initiate Request By")&& selectionValue==="requestform"){
        setIsShowRequestFormFields(true);
       }
       else if(item?.label?.includes("Initiate Request By")&& selectionValue==="otp"){
        setIsShowRequestFormFields(false);
       // setShowRaiseRequirementBtn(false);
       }
       else if(item?.label?.includes("Are Bank Details Correct")&& selectionValue==="yes"){
        setIsShowPOSBankDetails(false);
       }
       else if(item?.label?.includes("Are Bank Details Correct")&& selectionValue==="no"){
        setIsShowPOSBankDetails(true);
       }
       else if(selectionValue === "no"&&item?.label?.includes("Validate Signature")){
        setShowRaiseRequirementBtn(true);
      }
      else if(selectionValue === "yes"&&item?.label?.includes("Validate Signature")){
        setShowRaiseRequirementBtn(false);
      }
      if (e.target.value === "otp") {
        setIsShowOTPModal(true);
        setIsShowTransferFields(true);
        //setShowRequestFormFields(false);
        setValidateOTPSuccess(false);
      } else {
       // setShowRequestFormFields(true);
        setIsShowTransferFields(false);
        setValidateOTPSuccess(true);
      }
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
     if((seletedRequerimentList.length===0  && status === 'REJECTED') || ((seletedRequerimentList.length===0 && !internalFormValues?.PosInternalReq)&& status === 'INTERNAL')){
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
      POSComments1: values?.comment,
      TransactionPayload: [],
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
    if (values?.AreDetailsCorrect === "no") {
      obj.TransactionPayload.push(
        {
          "Status": "Update",
          "TagName": "BankIFSC",
          "TagValue": values?.POSBankIFSC
        },
        {
          "Status": "Update",
          "TagName": "BankName",
          "TagValue": values?.POSBankName
        },
        {
          "Status": "Update",
          "TagName": "BranchName",
          "TagValue": values?.POSBranchName
        },
        {
          "Status": "Update",
          "TagName": "AccountType",
          "TagValue": values?.POSAcc_Type_New
        },
        {
          "Status": "Update",
          "TagName": "NameAsMentionedInTheBank",
          "TagValue": values?.POSAccHldrName
        },
        {
          "Status": "Update",
          "TagName": "BankAccountNumber",
          "TagValue": BankAccNo
        },
        {
          "Status": "Update",
          "TagName": "ConfirmBankAccountNumber",
          "TagValue": values?.POSreenteraccountNumber
        },
        {
          "Status": "Update",
          "TagName": "InitiatePennyDrop",
          "TagValue": values?.POSPennyDrop
        },
        {
          "Status": "Update",
          "TagName": "NameAsPerPennyDrop",
          "TagValue": values?.POSNameasperPennyDrop
        },
        {
          "Status": "Update",
          "TagName": "NameMatch",
          "TagValue": values?.POSNameMatch
        },
        {
          "Status": "Create",
          "TagName": "LifeAsiaUpdated",
          "TagValue": values?.LifeAsiaUpdated|| ""
      },
        {
          "Status": "Create",
          "TagName": "Comments",
          "TagValue": values?.Comments|| ""
      },
      )
    }
    //  if(isShowPOSScreen){
    //   let reqFormValues = requirementsForm?.getFieldsValue();
    // obj.TransactionPayload.push({
    //     "Status": "Create",
    //     "TagName": "PosOtherReq",
    //     "TagValue": reqFormValues?.PosOtherReq || ""
    //   });
    // }

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

  // const getPOSTransactionPayload =(values)=>{
  //   return [
  //     { Status: "Update", TagName: "POSBankIFSC", TagValue: values.POSBankIFSC || ""},
  //     { Status: "Update", TagName: "POSBankName", TagValue: values.POSBankName || ""},
  //     { Status: "Update", TagName: "POSBranchName", TagValue: values.POSBranchName || ""},
  //     { Status: "Update", TagName: "POSAccountType", TagValue: values.POSAccountType || ""},
  //     { Status: "Update", TagName: "POSAccHldrName", TagValue: values.POSAccHldrName || ""},
  //     { Status: "Update", TagName: "POSBankAccountNumber", TagValue: values.POSBankAccountNumber || ""},
  //     { Status: "Update", TagName: "POSreenteraccountNumber", TagValue: values.POSreenteraccountNumber || ""},
  //     { Status: "Update", TagName: "POSPennyDrop", TagValue: values.POSPennyDrop || ""},
  //     { Status: "Update", TagName: "POSNameasperPennyDrop", TagValue: values.POSNameasperPennyDrop || ""},
  //     { Status: "Update", TagName: "POSNameMatch", TagValue: values.POSNameMatch || ""},
  //   ]
  // }


  const handleSendOTPClose = () => {
    form.setFieldsValue({ customerchoice: null });
    setIsModalOpen(false);
    setValidateBtnDisable(false);
    setOtpValue(null);
    setCounter(0);
  };
  const handleOTPChange = (e) => {
    setOtpValue(e.currentTarget.value);
  };
  const handleSendOTP = () => {
    setCounter(30);
    handleOTP(false);
    setValidateBtnDisable(true);
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
    // if(otpValue && otpValue.length !== 6){
    //              message.destroy()
    //       message.error({
    //         content: "Invalid OTP",
    //         className: "custom-msg",
    //         duration: 2,
    //       });
    //       setSendOTPLoader(false);
    // }else if(otpValue.length === 6){
    //   message.success({
    //             content: "Otp Validation successfully",
    //             className: "custom-msg",
    //             duration: 3,
    //           });
    //           setIsModalOpen(false);
    //         setOtpValue(null);
    //         setValidateOTPSuccess(true);
    //         setSendOTPLoader(false);
    // }
    let response = apiCalls.getSendOTP(obj);
    response
      .then((val) => {
        if (val?.data?.responseHeader?.issuccess) {
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
              val?.data?.responseBody?.errormessage ||
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
  }

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
    if(isShowPOSScreen){
      POSActionsOnContactDetails(null, "REJECTED", null);
    }else{
      handleSubmit();
    }

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
    const handleTextLink=(item)=>{
        if(item.linkValue?.toLowerCase() === "view"){
              const gConfig= apiCalls.getGenericConfig()
          if(gConfig?.data?.dmsApiUrl){
          const url =  gConfig?.data?.dmsApiUrl + `/omnidocs/WebApiRequestRedirection?Application=BPMPOLENQ&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${details?.policyDetailsObj?.identifiers?.applicationNo}`;
          window.open(url, '_blank');
        }
      }
      }
      const handleLabelLink=(item)=>{
        if(item.label === "Initiate Penny Drop"){
          InitiatePennyDropp();
        }
        setDeDupeModalOpen(false);
        if(item?.label?.includes("Bank Dedupe Check")){
          setDeDupeModalOpen(true);
        }
      }
    
      const getUploadFiles=(listOfUploadFiles)=>{
        // const updatedUploadList = listOfUploadFiles?.map((obj) => {
        //   // Create a new object without the propertyToDelete property
        //   const { labelName, ...newObject } = obj;
        //   return newObject;
        // });
        // Update the state with the new list
        setUploadFiles(listOfUploadFiles);
    
      }

    const handleLinkValue =()=>{
        setPaymentDetailsOpen(true);
      }
      
      const InitiatePennyDropp = () => {
        const values = form.getFieldsValue();
        if(!values?.BankAccountNumber || !values?.BankIFSC){
          message.destroy();
          message.error({
            content:"Enter All Mandatory Feilds",
            className: "custom-msg",
            duration: 2,
          });
         return;
        }
        
        let obj = {
          "accountNumber": BankAccNo,
          "accountHolderName": isShowPOSScreen ? values?.POSAccHldrName : values?.AccountHolderName || "",
          "ifsc": isShowPOSScreen ? values?.POSBankIFSC : values?.BankIFSC,
          "consent": "Y",
          "nameMatchType": "Individual",
          "useCombinedSolution":"N",
          "allowPartialMatch": "true",
          "preset": "G",
          "suppressReorderPenalty": "true",
          "clientData":{
            caseId: "null",
           }
      };
        var pennyPayload = {
          requestHeader : { source : "POS"},
          requestBody : obj
        }
        let response = apiCalls.bankaccverification(pennyPayload);
        response
          .then((result) => {
            if (result?.data?.responseHeader?.issuccess !== false) {
             if(result?.data?.statusCode === 101){
              form.setFieldsValue({
                InitiatePennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.bankResponse,
                POSPennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.bankResponse,
                NameasperPennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName,
                POSNameasperPennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName,
              })
             }else{
              form.setFieldsValue({
                InitiatePennyDrop: result?.data?.responseHeader?.message,
                POSPennyDrop: result?.data?.responseHeader?.message,
              })
             }
              //SUCCESSFUL TRANSACTION
            } else {
              setIsLoading(false);
              form.setFieldsValue({
                InitiatePennyDrop: 'Invalid Input',
                POSPennyDrop: 'Invalid Input',
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


    //commonly render all forms
    const renderDetailsForm = (formType) => {
        return (
          <DetailsForm
            data={PaymentReProcessingData[selectedSubType]?.[formType]}
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
            bankAccTypeLU={bankAccTypeLU}
            requestModeLU={requestModeLU}
          ></DetailsForm>
        );
      };

      const setInternalReqData = () => {
   POSContactData.serviceRequestTransectionData?.forEach(element => {
      if(element.tagName === 'InternalRequirementValue'){
          
            setInternalFlowRequirements(props.interlRequirementTagValue);
      };
    });
}

      const getInternal=(list)=>{
        let values = form.getFieldsValue();
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
      setInternalReqData();
    }
  },[]);


  const getPayoutDetailsEnquiry = async () => {
    try {
     // let modalData = [];
      let response = await apiCalls.getPayoutDetailsEnquiry(props?.details?.sentDetailsObj?.policyNo);
      // if (response?.data?.responseBody?.errorcode === "0") {
      if (response?.data?.payment_details) {
      //  modalData.push(response?.data?.responseBody);
       // setIsPOSPayoutsData(modalData);
         setPayoutsData(response?.data?.payment_details);
      } else {
        message.destroy();
        message.error({
          content: response?.data?.responseBody?.errormessage || "Something went wrong, please try again!",
          className: "custom-msg",
          duration: 2,
        });
      }
    } catch (err) {
      message.destroy();
      message.error({
        content: err?.response?.data?.responseBody?.errormessage || "Something went wrong, please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  };

  const totalBounceCharges = (isPOSPayoutsData).reduce(
    (total, row) => total + parseFloat(row?.PaymentAmount || 0),
    0
  );
  
  return (
    <>
      <Spin spinning={isLoading} fullscreen />
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
          {customerData?.isInternalFlow ?
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
            :
            (
<>
         {/* {!isShowPOSScreen && selectedSubType !== "surrender" &&<>
              {renderDetailsForm("BOE_Details")}
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
                      {"Cheque"}
                      {isSelectionMode === "12"&& <sup>*</sup>}
                    </span>
                  }
                  name="cheque"
                  className="checkbox-gap"
                  rules={[
                    {
                      required:(isSelectionMode === "12"&&paymentMethodList?.length===0) ?  true : false,
                      message:  (isSelectionMode === "12"&&paymentMethodList?.length===0) && "select a checkbox",
                    },
                  ]}
                >
                  <Checkbox
                    value="Cheque"
                    checked={paymentMethodList?.includes(
                      "Cheque"
                    )}
                    onChange={() =>
                      handleCheckBoxChange("Cheque")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col>
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
                      {"Bank Transfer"}
                      {isSelectionMode === "12"&& <sup>*</sup>}
                    </span>
                  }
                  name="BankTransfer"
                  rules={[
                    {
                      required:(isSelectionMode === "12"&&paymentMethodList?.length===0) ?  true : false,
                      message:  (isSelectionMode === "12"&&paymentMethodList?.length===0) && "select a checkbox",
                    },
                  ]}
                >
                  <Checkbox
                    value="BankTransfer"
                    checked={paymentMethodList?.includes(
                      "BankTransfer"
                    )}
                    onChange={() =>
                      handleCheckBoxChange("BankTransfer")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col>
            </Row>
              {isPaymentMethodSelection?.toLowerCase()==="banktransfer"&&isSelectionMode!=="12"&&<>
              {renderDetailsForm("NEFT_Bank_Details")}
              </>}
              {renderDetailsForm("Initiate_RequestBY")}
              {isShowRequestFormFields&&<>
              {renderDetailsForm("Request_Details")}
              </>}
              {renderDetailsForm("Comments")}
            
          </>}
          
          {isShowPOSScreen&& selectedSubType !== "surrender"&&<>
            {renderDetailsForm("POS_Details")}
            {isPaymentMethodSelection?.toLowerCase()==="banktransfer"&&<>
              {renderDetailsForm("POS_View_Bank_Details")}
              </>}

              {isShowPOSBankDetails&&<>
              {renderDetailsForm("POS_DetailsCorrect")}
              </>}
              
            {renderDetailsForm("POS_Action")}
          </>} */}

          {!isShowPOSScreen &&<>
            <div className="reuirement mb-16">
      <table className="responsive-table">
      <thead>
        <tr>
          <th>Select</th>
          <th>Ticket ID</th>
          <th>Payout Type</th>
          {/* <th>Sub Type</th> */}
          <th>Status</th>
          <th>Payment Date</th>
          <th>Payment Amount</th>
          {/* <th>Payment Mode</th> */}
          <th>Mode/Reference No</th>
          {/* <th>Cheque/UTR No</th> */}
        </tr>
      </thead>
      <tbody>
        {payoutsData?.filter((ele) => ele.STATUS?.trim() === "Payment Processed").
        map((payout, index) => (
          <tr key={index}>
            <td>
               <Checkbox
              checked={selectedCheckbox === index}
                onChange={() => handleACCCheckboxChange(index,payout)}
            ></Checkbox>
            </td>
            <td>{payout?.ticketId}</td>
            <td>{payout?.ZPRSNCDE}</td>
            {/* <td>{payout.subType}</td> */}
            <td>{payout?.STATUS}</td>
            <td>{formatDate(payout?.AUTHDATE)}</td>
            <td>{formatAmountSafe(payout?.PAYAMT)}</td>
            {/* <td>{payout.paymentMode}</td> */}
            <td onClick={() => accoutDeailHandler(payout)} className="account-details">
                  {(payout?.ZNEFTNO && payout?.ZNEFTNO.trim()) || (payout?.CHEQNO && payout?.CHEQNO.trim()) ? 
                    (payout?.ZNEFTNO && payout?.ZNEFTNO.trim() ? payout?.ZNEFTNO :`CHQ-${payout?.CHEQNO}`) 
                    : null}
                </td>
            {/* <td>{payout.utrNo}</td> */}
          </tr>
        ))}
         {payoutsData?.length === 0 && (
                    <tr>
                      <td colspan="9">
                        <div className="text-center">
                          <span>No data available</span>
                        </div>
                      </td>
                    </tr>
                  )}
      </tbody>
    </table>
    </div>
              {renderDetailsForm("NEFT_Bank_Details")}
              {renderDetailsForm("Request_Details")}
              {renderDetailsForm("Comments")}
          </>}
          {isShowPOSScreen &&<>
            <div className="reuirement mb-16">
      <table className="responsive-table">
      <thead>
        <tr>
          <th>Select</th>
          <th>Ticket ID</th>
          {/* <th>Call Type</th>
          <th>Sub Type</th> */}
          <th>Status</th>
          <th>Payment Date</th>
          <th>Payment Amount</th>
          {/* <th>Payment Mode</th>
          <th>Cheque/UTR No</th> */}
        </tr>
      </thead>
      <tbody>
        {isPOSPayoutsData?.map((payout, index) => (
          <tr key={index}>
            <td>
{/*            
               <Checkbox
              checked={selectedCheckbox === index}
                onChange={() => handleACCCheckboxChange(index,payout)}
            ></Checkbox> */}
            </td>
            <td>{payout?.TicketId}</td>
            {/* <td>{payout?.callType}</td>
            <td>{payout?.subType}</td> */}
              <td>{payout?.Status}</td>
            <td>{formatDate(payout?.PaymentDate)}</td>
            <td>{formatAmountSafe(payout?.PaymentAmount)}</td>
            {/* <td>{payout?.paymentMode}</td>
            <td>{payout?.utrNo}</td> */}
          </tr>
        ))}
         {isPOSPayoutsData?.length === 0 && (
                    <tr>
                      <td colspan="5">
                        <div className="text-center">
                          <span>No data available</span>
                        </div>
                      </td>
                    </tr>
                  )}
      </tbody>
      {isPOSPayoutsData?.length>0&&<>
      <tfoot>
          <tr>
            <td colSpan="4"></td>
            <td>Rs {totalBounceCharges}</td>
            <td></td>
          </tr>
        </tfoot>
        </>}
    </table>
    </div>
              {renderDetailsForm("POS_Details")}
              {renderDetailsForm("POS_View_Bank_Details")}
              {isShowPOSBankDetails&&<>
              {renderDetailsForm("POS_DetailsCorrect")}
              </>}
              {renderDetailsForm("POS_Action")}
          </>}
          
          {/* {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>} */}
          
          <div className="contact-details-btn">
          {/* {(!showRaiseRequirementBtn||isShowPOSScreen)&&<> */}
            <Button type="primary" className="primary-btn" htmlType="submit" 
            disabled={showRaiseRequirementBtn&&!isShowPOSScreen}
            >
              {!isShowPOSScreen
                ? "Submit"
                : "Approve"}
            </Button>
            {/* </>} */}

            {
              isButtonShow? "":  (isShowPOSScreen || !isShowPOSScreen) && (
                <>
                  <Button
                    type="primary"
                    className="primary-btn"
                    onClick={() => getRaiseRequirements()}
                  >
                    Raise Requirement
                  </Button>
                </>
              )
            }

           
             {(isShowPOSScreen) && (
              <>
                 <InternalFlowPOS interlRequirementTagValue1 = {props.interlRequirementTagValue} selectedList = {POSContactData.serviceRequestTransectionData} getInternal = {getInternal} internalReqForm={internalReqForm}/>
              </>
            )}
          </div>
</>
            )}
        </Form>
      {showAlert && (
        <PopupAlert
          alertData={alertData}
          getAdvance={props.getAdvance}
          title={alertTitle}
          navigate={navigateTo}
          setShowAlert={setShowAlert}
        ></PopupAlert>
      )}
<Modal
        title="Account Details"
        open={isAccoundetail}
        destroyOnClose={true}
        width={600}
        height={1600}
        closeIcon={
          <Tooltip title="Close">
            <img src={CloseIcon} alt="" onClick={() => setIsAccoundetail(false)}/>
          </Tooltip>
        }
        footer={null}
      >
          <div className="reuirement">
          <table className="table responsive-table assistanceTable">
            <thead>
              <tr>
                <th>Bank Name</th>
                <td>{accountDetailsData?.BANKNAME}</td>
              </tr>
              <tr>
                <th>Branch Name</th>
                <td>{accountDetailsData?.BRANCHNAME}</td>
              </tr>
              <tr>
                <th>Bank Account No</th>
                <td>{accountDetailsData?.BANKACCOUNTNO}</td>
              </tr>
              <tr>
                <th>Bank IFSC</th>
                <td>{accountDetailsData?.BANKIFSCNO}</td>
              </tr>
              <tr>
                <th>Account Type</th>
                <td>{accountDetailsData?.BANKACCTYPE}</td>
              </tr>
            </thead>
          </table>
          </div>
      </Modal>
      <Modal
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
              {/* <div className="text-area mt-16">
             <Form.Item
                      // label={<span>{"Comment"} <sup>*</sup>
                      // </span>}
                      name="requirementCmnt"
                      className="inputs-label mb-0"
                      rules={[
                        {
                          required: true,
                          message: "Enter Comments",
                        },
                      ]}
                    >
                       <TextArea rows={2} value={requirementCmnt} placeholder="Comments" onChange={(e)=>setRequirementCmnt(e.currentTarget.value)}/>
                    </Form.Item>
                  </div> */}
          <div className="contact-details-btn">
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit"
                  //onClick={()=>handleRequirementSubmit()}
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
      </Modal>
      <Modal
        title=""
        open={deDupeModalOpen}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setDeDupeModalOpen(false)}>
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
              <th>Customer Name</th>
            </tr>
            {BankduDupeData?.map((item,index) => (
            <tr key={index}>
            <td>{item?.LA_PolicyNo}</td>
              <td>{item?.Acc_Number}</td>
              <td>{item?.Acc_HldrName}</td>
              <td>{item?.CustomerName}</td>
            </tr>
          ))}
           {BankduDupeData?.length === 0  &&
               <tr>
                  <td colspan="4">
               
                <div className="text-center"><span>No data available</span></div> 
        </td>
        </tr>}
          </table>
        </div>
      </Modal>

      {isShowOTPModal &&<>
      <OTPModal form={form} customerData={customerData} isShowOTPModal={isShowOTPModal} setIsShowOTPModal={setIsShowOTPModal}
       sendOTPNumber={clientEnquiryData?.rmblphone} setDisableRequestForm={setDisableRequestForm} setValidateOTPSuccess={setValidateOTPSuccess} clientEnquiryData={clientEnquiryData}/>
      </>}
    </>
  );
};

export default PaymentReProcessing;