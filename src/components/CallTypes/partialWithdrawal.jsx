import React, { useState, useEffect } from "react";
import { Form, Spin, Button,Checkbox,message,Modal,Tooltip, Upload, Input, Col, Row } from "antd";
import { Data } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import moment from "moment";
import UploadIcon from "../../assets/images/upload.png";
import apiCalls from "../../api/apiCalls";
import ContactForm from "../../utils/ContactForm";
import CloseIcon from '../../assets/images/close-icon.png';
import { connect,useSelector } from "react-redux";
import PopupAlert from "../popupAlert";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import InternalFlow from "../InternalFlow/InternalFlow";

const PartialWithdrawal = (props) => {
  dayjs.extend(customParseFormat);
const {selectedSubType,customerData,typesForm,setSelectedSubType, policyDetails,POSContactData, clientEnquiryData,bankAccTypeLU} = props;
const suffix = <img src={UploadIcon} alt="" />;
const [form] = Form.useForm();
const [finalPaymentForm] = Form.useForm();
const [isLoading,setIsLoading] = useState(false);
const [showResonDelayField,setShowReasonDelayField] = useState(false);
const [isShowPOSScreen, setIsShowPOSScreen] = useState(false);
const [isShowPOSScreen_Manager, setIsShowPOSScreen_Manager] = useState(false);
const [showRaiseRequirementBtn,setShowRaiseRequirementBtn] = useState(false);
const [showEmailFields,setShowEmailFields] = useState(false);
const [showPhoneNumber, setShowPhoneNumber] = useState(false);
const [showEmailAddress, setShowEmailAddress] = useState(false);
const [showWhatsApp, setShowWhatsApp] = useState(false);
const [activeEmailIcons, setActiveEmailIcons] = useState([]);
const [activeMobileIcons, setActiveMobileIcons] = useState([]);
const [activeWhatsAppIcons, setActiveWhatsAppIcons] = useState([]);
const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
const [requirementModalLoader, setRequirementLoader] = useState(false);
const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
const [uploadFiles,setUploadFiles] = useState([]);
const [isShowTransferFields,setIsShowTransferFields] = useState(false);
const [isShowWithdrawalApplicable,setIsShowWithdrawalApplicable] = useState(false);
const [totalFundsModal, setTotalFundModal] = useState(false);
const [finalPayableAmtModal,setFinalPayableAmtModal] = useState(false);
const [partialWithdrawalEnqD,setPartialWithdrawalEnqD] = useState(false);
const [showAlert, setShowAlert] = useState(false);
const [alertTitle, setAlertTitle] = useState("");
const [navigateTo, setNavigateTo] = useState("");
const [alertData, setAlertData] = useState("");
const [CNFBankAccNo, setCNFBankAccNo] = useState("");
const [BankAccNo, setBankAccNo] = useState("");
const [clickedButton, setClickedButton] = useState("");
const [PennyDropResponse,setPennyDropResponse] = useState({});
const [TotalFundVal, setTotalFundVal] = useState();
const [fundValueData,setFundValueData] = useState([]);
const [isItem,setIsItem]=useState([]);
const [isLoader, setIsLoader] = useState(false);
const [negativeListModal,setNegativeModal] = useState(false);
const [showBankDeDupeModal,setShowBankDeDupeModal] = useState(false);
const [BankduDupeData,setBankDeDupeData] = useState([]);
const [negativeList,setNegativeList] = useState([]);
const formFeilds = form.getFieldsValue();
const loginInfo = useSelector(state => state);
const loggedUser = useSelector(state => state?.userProfileInfo?.profileObj);

const [uploadMultipleFiles,setUploadMultipleFiles] = useState([]);
const [isUploadMultipleFiles,setIsMultipleFiles] = useState([]);
const [addressProofModal, setAddressProofModal] = useState(false);
const [showUploadFile, setShowUploadFile] = useState(null);
const [aadharUploadFiles,setAAdharUploadFiles] = useState([]);
const [passportUploadFiles,setPassportUploadFiles] = useState([]);
const [rationCardUploadFiles,setRationCardUploadFiles] = useState([]);
const [DrivingUploadFiles,setDrivingUploadFiles] = useState([]);
const [utilityUploadFiles,setUtilityUploadFiles] = useState([]);
const [voterUploadFiles, setVoterUploadFiles] = useState([]);
const [passbookUploadFiles, setPassbookUploadFiles] = useState([]);
const [pancardUploadFiles,setPancardUploadFiles] = useState([]);
const [docIdProofs,setDocIdProofs] = useState([]);
const [InternaRequirements, setInternalFlowRequirements] = useState("");
//const [isFieldsDisableafterValidOTP,setIsFieldsDisableafterValidOTP] = useState(false);
const [idProofModal,setIdProofModal] = useState(false);
const [aadharIDUploadFiles,setAAdharIDUploadFiles] = useState([]);
const [passportIDUploadFiles,setPassportIDUploadFiles] = useState([]);
const [rationCardIDUploadFiles,setRationCardIDUploadFiles] = useState([]);
const [DrivingIDUploadFiles,setDrivingIDUploadFiles] = useState([]);
const [voterIDUploadFiles, setVoterIDUploadFiles] = useState([]);
const [pancardIDUploadFiles,setPancardIDUploadFiles] = useState([]);
const [isIDUploadMultipleFiles,setIsIDMultipleFiles] = useState([]);
const [uploadIDMultipleFiles,setUploadIDMultipleFiles] = useState([]);
const [DisableSubmit,setDisableSubmit] = useState(false);
const posScreenObj = {
  TotalFundValue:'',
  SelectFund:"",
  PayableAmount:"",
  NameAsMentionedInTheBank:"",
  BankIFSC:"",
  BankAccountNumber:"",
  BankName:"",
  BranchName:"",
  InitiatePennyDrop:"",
  NameAsPerPennyDrop:"",
  NameMatch:"",
  ValidateSignature:'',
  Comments:'',
  FundTransfer:'',
  FundTransferTo:"",
  FundTransferAmount:'',
  RelationstoFTPolicy:'',
  NameofFundTransferPolicyOwner:'',
  EnteredAmount:''
}

useEffect(() => {


  if(selectedSubType === "partialwithdrawalquery"){
      // Assuming the past date is in the format dd-mm-yyyy
      const parseDate = (dateString) => {
        const year = parseInt(dateString.substring(0, 4), 10);
        const month = parseInt(dateString.substring(4, 6), 10) - 1; // Month is zero-based in JavaScript Dates
        const day = parseInt(dateString.substring(6, 8), 10);
        return new Date(year, month, day);
      };

      const pastDate = parseDate(policyDetails?.policyDetailsObj?.saDetails?.rcd);
      const today = new Date();

      // Calculate the difference in milliseconds
      const timeDifference = today - pastDate;

      // Convert milliseconds to days
      const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      // Calculate the difference in years
      const yearDifference = today?.getFullYear() - pastDate?.getFullYear();

      // Check if there are remaining days after subtracting complete years
      const remainingDays = dayDifference % 365;

      if(yearDifference  < 5){
        

        if(policyDetails?.policyDetailsObj?.saDetails?.rcd){
          const parsedDate = new Date(
            parseInt(policyDetails?.policyDetailsObj?.saDetails?.rcd.substring(0, 4), 10),
            parseInt(policyDetails?.policyDetailsObj?.saDetails?.rcd.substring(4, 6), 10) - 1, // Month is zero-based in JavaScript Dates
            parseInt(policyDetails?.policyDetailsObj?.saDetails?.rcd.substring(6, 8), 10)
          );
          
          // Calculate the date 5 years after
          const date5YearsAfter = addYears(parsedDate, 5);
          
          // Format the result as "dd/mm/yyyy"
          const formattedDate = formatDate(date5YearsAfter);
          form.setFieldsValue({
            PartialWithdrawalcanbemadeafter : formattedDate
          })
        }

        setIsShowWithdrawalApplicable(false)
        form.setFieldsValue({
          options2 : 'no'
        })
      }else if(yearDifference  >= 5){
        
        form.setFieldsValue({
          options2 : 'yes'
        })
        Data[selectedSubType]?.BOE_Details?.forEach((item, index) => {
           if(item.name === 'PartialWithdrawalcanbemadeafter'){
            item.hide = true
           }
        })
        setIsShowWithdrawalApplicable(true)

      }
      //console.log(`Total difference: ${yearDifference} years and ${remainingDays} days.`);

  }else {
setIsIDMultipleFiles([]);
setUploadIDMultipleFiles([]);
setIsMultipleFiles([]);
setUploadMultipleFiles([]);
handleAddressModalClose();
handleIdProofModalClose();
    if(selectedSubType === "partialwithdrawalrequest"){
      form.setFieldsValue({
        idProof:  "",
        addressProof: ""
      })

    }
  }
},[selectedSubType])
useEffect(()=>{
  if(props?.EmailResponse?.IsEmailmanagent){
    if (!Data[selectedSubType]) {
      Data[selectedSubType] = {}; // Initialize if undefined
    }
  if (!Array.isArray(Data[selectedSubType]?.Request_Fields)) {
          Data[selectedSubType].Request_Fields = [];
      }
    
      // Remove existing instances of "Additional Note For Customer" before adding a new one
      Data[selectedSubType].Request_Fields = Data[selectedSubType].Request_Fields.filter(
          comment => comment.name !== "AdditionalNoteForCustomer"
      );
    
      // Add "Additional Note For Customer" once
      Data[selectedSubType].Request_Fields.push(
        {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 4000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
        });
        if (!Array.isArray(Data[selectedSubType]?.ShareProcess)) {
          Data[selectedSubType].ShareProcess = [];
      }
      // Remove existing instances of "Additional Note For Customer" before adding a new one
      Data[selectedSubType].ShareProcess = Data[selectedSubType].ShareProcess.filter(
          comment => comment.name !== "AdditionalNoteForCustomer"
      );
    
      // Add "Additional Note For Customer" once
      Data[selectedSubType].ShareProcess.push(
        {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 4000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
        });

      }
        Data[selectedSubType]?.Request_Fields?.forEach(element => {
                if(element?.name ==="CustomerSigningDate"||element?.name ==="BranchReceivedDate"||element?.name ==="ValidateSignature"){
                  element.hide = true;
                }
              })
},[selectedSubType])

useEffect(() => {
  if (POSContactData && customerData?.isPOS) {
    if(loggedUser?.role === 5){
      setIsShowPOSScreen_Manager(true)
    }else{
      setIsShowPOSScreen(true);
      setIsShowPOSScreen_Manager(false)
    }
    if(POSContactData?.deDupPayload?.length > 0){
      for (let index in POSContactData?.deDupPayload){
      //  if(POSContactData?.deDupPayload[index]?.type ==='BANK') {
      //    setBankDeDupeData(POSContactData?.deDupPayload[index]?.deDupPayload);
      //  }
       if(POSContactData?.deDupPayload[index]?.type ==='NEGATIVELIST') {
         setNegativeList(POSContactData?.deDupPayload[index]?.deDupPayload)
       }
      }
     }
   
    POSContactData?.serviceRequestTransectionData?.forEach(element => {
      posScreenObj[element.tagName] = element.tagValue
    });

    setBankAccNo(posScreenObj.BankAccountNumber);

    form.setFieldsValue({
      TotalFundValue:posScreenObj.TotalFundValue,
      SelectFund:posScreenObj.SelectFund,
      EnteredAmount:posScreenObj.EnteredAmount,
      PayableAmount:posScreenObj.PayableAmount,
      NameAsMentionedInTheBank:posScreenObj.NameAsMentionedInTheBank,
      BankIFSC:posScreenObj.BankIFSC,
      BankAccountNumber:posScreenObj.BankAccountNumber,
      BankName:posScreenObj.BankName,
      BranchName:posScreenObj.BranchName,
      AccountType: posScreenObj?.AccountType,
      InitiatePennyDrop:posScreenObj.InitiatePennyDrop,
      NameAsPerPennyDrop: posScreenObj.NameAsPerPennyDrop,
      NameMatch: posScreenObj.NamematchasperPennyDrop,
      ViewFinalPayableAmount:posScreenObj.EnteredAmount,
      ValidateSignature:posScreenObj.ValidateSignature,
      Comments:posScreenObj.Comments,
      ChangeInLast60Days:POSContactData?.personalChange,
      PolicyLoggedLast:POSContactData?.policyLogged,
      FundTransfer:posScreenObj.FundTransfer,
      FundTransferTo:posScreenObj.FundTransferTo,
      FundTransferAmount:posScreenObj.FundTransferAmount,
      RelationstoFTPolicy:posScreenObj.RelationstoFTPolicy,
      NameofFundTransferPolicyOwner:posScreenObj.NameofFundTransferPolicyOwner,
      RequestFor:posScreenObj.FundTransfer === 'yes' ? 'Fund Transfer' : 'Partial Withdrawal',
      BalanceAmountForPartialWithdrawal : +posScreenObj.EnteredAmount - +posScreenObj.FundTransferAmount,
      RequestTime: posScreenObj?.RequestTime,
      ReasonForPartialWithdrawal: posScreenObj?.ReasonForPartialWithdrawal
    });

    Data[selectedSubType]?.POS_Details?.forEach((item, index) => {
      if (item?.fundTrnsfer === 'yes' && posScreenObj.FundTransfer === 'yes') {
        //
        item.hide = false;
      }else if(item?.fundTrnsfer === 'yes' && posScreenObj.FundTransfer === 'no'){
        item.hide = true;
      }
    });


  }else{
    let empID = loggedUser?.allRoles[0]?.employeeID
   // getPartialWithdrawalEnquiry()
   GetPartSurrenderEnquiryy(empID)
  }



},[selectedSubType]); 

const addYears = (date, years) => {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
};

const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};





const GetPartSurrenderEnquiryy = (empID) => {
  setIsLoader(true);
  let obj = {

    "requestHeader": {
      "source": "POS",
      "carrierCode": "2",
      "Branch": "PRA",
      "userId": empID,
      "userRole": "10",
      "partnerId": "MSPOS",
      "processId": "POS",
      "monthendExtension": "N",
      "monthendDate": "09/12/2023"
  },
  "requestBody": {
      "policyNo": customerData?.policyNo,
  }

  }

  let response = apiCalls.GetPartSurrenderEnquiry(obj);
  response
    .then((val) => {
      if (val?.data) {
        if(val?.data?.responseBody?.errorcode === "1"){
        setIsLoader(false);
        setAlertTitle(`${val?.data?.responseBody?.errormessage}`);
         setShowAlert(true);
        return
        }

        if(val?.data?.responseBody.errorcode=== '0'){
          if(parseFloat(val?.data?.responseBody?.actvalue) === 0){

            // setAlertTitle(`Actual value is 0, PW Not Allowed`);
          setAlertTitle(`Partial Withdrawal Amount is Zero.Cannot Proceed`);
          setShowAlert(true);
          }
          setPartialWithdrawalEnqD(val?.data?.responseBody);
          setTotalFundVal(val?.data?.responseBody?.actvalue.toLocaleString('en-IN'))
          val = Number(parseFloat(val?.data?.responseBody?.actvalue)).toLocaleString('en-IN');

          form.setFieldsValue({
            MaxPartialWithdwral :val,
            MaxPartialWithdrawalpossible:val,
          });
          getFundValue()
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


}




const getPartialWithdrawalEnquiry= () => {
  //
  setIsLoader(true);
  //
  let obj = {
      "requestHeader": {
       "source": "POS",
           "carrierCode": "2",
           "Branch": "PRA",
           "userId": "website",
           "userRole": "10",
           "partnerId": "MSPOS",
           "processId": "POS",
           "monthendExtension": "N",
           "monthendDate": "09/12/2023"
     },
     "requestBody": {
       "PolicyNumber": customerData?.policyNo,
     }
  }

  let response = apiCalls.getPartialWithdrawalEnquiry(obj);
  response
    .then((val) => {
      if (val?.data) {
        if(val?.data?.responseBody?.errorcode === "1"){
        setIsLoader(false);
        setAlertTitle(`${val?.data?.responseBody?.values}`);
         setShowAlert(true);
         //setNavigateTo("/advancesearch");
        return
        }

        if(val?.data?.responseBody.errorcode=== '0'){
          if(parseFloat(val?.data?.responseBody?.actvalue) === 0){
            setAlertTitle(`Actual value is 0, PW Not Allowed`);
            setShowAlert(true);
             //setNavigateTo("/advancesearch");
          }
          setPartialWithdrawalEnqD(val?.data?.responseBody);
          setTotalFundVal(val?.data?.responseBody?.actvalue.toLocaleString('en-IN'))
          val = parseFloat(val?.data?.responseBody?.actvalue)
          form.setFieldsValue({TotalFundValue :val});
          getFundValue()
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


}



const getFundValue = ()=>{
  setIsLoading(true);
      let obj = {
        "requestHeader": {
          "source": "POS",
              "carrierCode": "2",
              "branch": "PRA",
              "userId": loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID,
              "userRole": "10",
              "partnerId": "MSPOS",
              "processId": "POS",
              "monthendExtension": "N",
              "monthendDate": "18/10/2023"
        },
        "requestBody": {
          "policyno": customerData?.policyNo,
        }
      }
      
  let response = apiCalls.GetFundValue(obj);
  response
    .then((val) => {
      if (val?.data) {
   

        setFundValueData(val?.data?.responseBody?.fundValue);
        let totalval = val?.data?.responseBody?.fundValue?.reduce((ele, acc)=>{
          return +acc.curuntval + ele
        },0)
        let totalvall = Number(totalval).toLocaleString('en-IN');

        form.setFieldsValue({TotalFundValue :totalvall});
        finalPaymentForm?.setFieldsValue({totalSurrenderAmount: totalvall})
        calculateTotal();
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

const LoanEnquiry = async () => {
  try {
    setShowAlert(false);
    setIsLoader(true);

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
    setIsLoader(false);
  }
};


const handleError = (errorMessage) => {
  message.destroy();
  message.error({
    content: errorMessage || "Something went wrong please try again!",
    className: "custom-msg",
    duration: 2,
  });
};

const handleDropdownChange= (e,item)=>{
if(e==="yes"&&item?.label?.includes("Do you wish to Opt for Fund Transfer")){
  setIsShowTransferFields(true);
}
else if(e==="no"&&item?.label?.includes("Do you wish to Opt for Fund Transfer")){
  setIsShowTransferFields(false);
}
else if(e==="yes"&&item?.label?.includes("Partial Withdrawal Applicable")){
  setIsShowWithdrawalApplicable(true);
}
else if(e==="no"&&item?.label?.includes("Partial Withdrawal Applicable")){
  setIsShowWithdrawalApplicable(false);
}
}

const disabledDate = (current) => {
  return current && current > dayjs().endOf("day"); // Can not select days before today and today
};



const toggleInputField = (field, item, index) => {
  setIsItem(item);
  setShowEmailFields(true);
  form.setFieldsValue({
    'mobileNo': customerData?.mobileNo,
'whatsAppNo':  customerData?.mobileNo,
'emailId': customerData?.emailID
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

const handleUploadLink=()=>{}
const handleRadioLink =(item)=>{
  if(item.name ===  "BankAccountDeDupe" ){
    setShowBankDeDupeModal(true);
    let formValues = form.getFieldsValue();
    const obj ={
      "lA_CustomerID": POSContactData?.customerId,
      "bank_IFSC": formValues?.BankIFSC,
      "acc_Number": formValues?.BankAccountNumber,
    }
    let response = apiCalls.getVerifyBankDedup(obj);
    response.then((val) => {
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
        //setIsLoading(false);
      });
  }else if(item.name ===  "negavativeList"){
    setNegativeModal(true)
  }
  else if(item.name ===  "RequestForm" || item.name === 'PolicyOwnerIDProof'|| item.name === 'PolicyOwnerAddressProof'|| item.name === 'PolicyBankAccountProof'){
        const gConfig= apiCalls.getGenericConfig()
          if(gConfig?.data?.dmsApiUrl){
    const url = gConfig?.data?.dmsApiUrl + `/omnidocs/WebApiRequestRedirection?Application=BPMPOLENQ&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${policyDetails?.policyDetailsObj?.identifiers?.applicationNo}`;
  
    window.open(url, '_blank');
          }
    
  }
}
const handleTextLink =(item)=>{
  if(item.name ===  "BankAccountDeDupe" ){
    setShowBankDeDupeModal(true);
    let formValues = form.getFieldsValue();
    const obj ={
      "lA_CustomerID": POSContactData?.customerId,
      "bank_IFSC": formValues?.BankIFSC,
      "acc_Number": formValues?.BankAccountNumber,
    }
    let response = apiCalls.getVerifyBankDedup(obj);
    response.then((val) => {
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
        //setIsLoading(false);
      });
  }else if(item.name ===  "negavativeList"){
    setNegativeModal(true)
  }
  else if(item.name ===  "RequestForm" || item.name === 'PolicyOwnerIDProof'|| item.name === 'PolicyOwnerAddressProof'|| item.name === 'PolicyBankAccountProof'){
    const gConfig= apiCalls.getGenericConfig()
          if(gConfig?.data?.dmsApiUrl){
    const url = gConfig?.data?.dmsApiUrl + `/omnidocs/WebApiRequestRedirection?Application=BPMPOLENQ&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${policyDetails?.policyDetailsObj?.identifiers?.applicationNo}`;
  
    window.open(url, '_blank');
          }
    
  }

}

const handleRadioChange = (e,item) => {
  setShowRaiseRequirementBtn(false);
   //if(e.target.value === "no"&&item?.label?.includes("Validate Signature")){
     //setShowRaiseRequirementBtn(true);
 // }
  if(item?.label?.includes("Validate Signature")){
    if(e.target.value === "no")
    setDisableSubmit(true);
  else{
    setDisableSubmit(false)
  }
 }
  }
  const onBlurInput=(value, item)=>{
    //
    const obj = form.getFieldsValue()
    if(item.name === 'ConfirmBankAccountNumber'){
      setCNFBankAccNo(value)
     }else if(item.name === 'BankAccountNumber'){
       setBankAccNo(value)
     }

     if( item.name === 'ConfirmBankAccountNumber'){
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
     
    }else if(value?.length >= 4 &&  item.name === 'BankAccountNumber'){
     const lastFourDigits = value.slice(-4);
     const maskedString = '*'.repeat(value.length - 4) + lastFourDigits;
     form.setFieldsValue({BankAccountNumber: maskedString})
    }

    if(item?.name?.includes("PayableAmount")){
      let MaxPartialWithdwral =Number(obj?.MaxPartialWithdwral?.replace(/,/g, ''));  

      if(Number(value) > Number(MaxPartialWithdwral)){
        form.setFieldsValue({
          PayableAmount:'',
          FundTransferAmount:''
        });
        message.error({
          content:
            "Fund Transfer Amount Should not exceed Max Partial Withdwral",
          className: "custom-msg",
          duration: 2,
        });    
        return
      }
      // const fundValue =String( Number(MaxPartialWithdwral)  -  Number(value) );
      // form.setFieldsValue({FundTransferAmount: fundValue})
     }

     if(item?.name?.includes("FundTransferAmount")){
      let PayableAmount = Number(obj?.PayableAmount?.replace(/,/g, '')); 

      if(Number(value) > Number(PayableAmount)){
        form.setFieldsValue({

          FundTransferAmount:''
        });
        message.error({
          content:
            "Fund Transfer Amount Should not exceed Enter Amount",
          className: "custom-msg",
          duration: 2,
        });    
        return
      }


     }

  }

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
      const formFeilds = form.getFieldsValue()
      let customerSignDate = moment(formFeilds?.CustomerSigningDate + 1).format("MM/DD/YYYY");
      let dateDiffence = date_diff_indays(selectDate,customerSignDate)
      if(!formFeilds?.CustomerSigningDate ||dateDiffence > 0){
        message.destroy();
        message.error({
          content: "Branch Received Date can't be before the customer signing date.",
          className: "custom-msg",
          duration: 3,
        });
        form.setFieldsValue({
  
          BranchReceivedDate:""
        })
      return;
      }

    }


    if (item === "BranchReceivedDate") {
      setShowReasonDelayField(false);
      let newDate = new Date();
      let todayDate = moment(newDate).format("DD/MM/YYYY");
      let selectDate = moment(date + 1).format("DD/MM/YYYY");
      if (selectDate < todayDate) {
        setShowReasonDelayField(true);
      }
    }
  };

  const handleInputChange =(e,item)=>{
    if(item.name?.includes("BankIFSC")&&e.target.value){
      getIFSCBankDetails(e.target.value);
    }
  }

  const getIFSCBankDetails =async(ifscCode)=>{
    let response = await apiCalls.getIFSCBanks(ifscCode);
  if (response.statusText) {
        if (response?.data) {
          form.setFieldsValue({
            BankName: response?.data[0]?.bank,
            BranchName: response?.data[0]?.branch
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
  

  const handleEdit = (val)=>{
    

    if(val==='edit'){
      Data[selectedSubType]?.POS_Details?.forEach((item, index) => {
        if(item?.posEdit){
          item.disabled = false
        } 
        
      })
      
    }else if(val==='close'){
      Data[selectedSubType]?.POS_Details?.forEach((item, index) => {
        if(item?.posEdit){
          item.disabled = true
        } 
      })
      POSContactData?.serviceRequestTransectionData?.forEach(element => {
        posScreenObj[element.tagName] = element.tagValue
      });
      form.setFieldsValue({
        NameAsMentionedInTheBank:posScreenObj.NameAsMentionedInTheBank,
        BankIFSC:posScreenObj.BankIFSC,
        BankAccountNumber:posScreenObj.BankAccountNumber,
        BankName:posScreenObj.BankName,
        AccountType: posScreenObj?.AccountType,
        // PennydropResult:posScreenObj.PennydropResult,
        NameReceivedinPennyDrop:posScreenObj.NameReceivedinPennyDrop,
      })
    }
    
  }



       //commonly render all forms
  const renderDetailsForm = (formType) => {
    return (
      <DetailsForm
        data={Data[selectedSubType]?.[formType]}
        subType={selectedSubType}
         suffix={!isShowPOSScreen && suffix}
         handleUploadLink={handleUploadLink}
        form={form}
        handleRadioChange={handleRadioChange}
        handleDateChange={handleDateChange}
        handleDropdownChange={handleDropdownChange}
        toggleInputField={toggleInputField}
        activeEmailIcons={activeEmailIcons}
        activeMobileIcons={activeMobileIcons}
        activeWhatsAppIcons={activeWhatsAppIcons}
        getUploadFiles={getUploadFiles}
        handleLabelLink={handleLabelLink}
        onBlurInput={onBlurInput}
        disabledDate={disabledDate}
        handleTextLink ={handleTextLink }
        handleInputChange={handleInputChange}
        handleEdit = {handleEdit}
        handleLinkValue={handleLinkValue}
        handleRadioLink={handleRadioLink}
        bankAccTypeLU={bankAccTypeLU}
      ></DetailsForm>
    );
  };
  const handleLabelLink = (item) =>{
    setTotalFundModal(false);
    setFinalPayableAmtModal(false);
    if(item?.name?.toLowerCase().includes("totalfundvalue")){
      setTotalFundModal(true);
    }
    else if(item?.name?.toLowerCase().includes("payableamount")){
      setFinalPayableAmtModal(true);
      getFundValue();
      getTDSInfo();
      LoanEnquiry();
     // calculateTotal();
    }

    if(item.label === "Initiate Penny Drop"){
      InitiatePennyDropp();
    }

  }


  const InitiatePennyDropp = () => {
    const values = form.getFieldsValue();
    if(!values.BankAccountNumber || !values.NameAsMentionedInTheBank || !values.BankIFSC ){
      message.destroy();
      message.error({
        content:"Enter All Mandatory Feilds",
        className: "custom-msg",
        duration: 2,
      });
     return;
    }
    setIsLoader(true);
    let obj = {
      "accountNumber":BankAccNo,
      "accountHolderName":"",
      "ifsc": values?.BankIFSC,
      "consent": "Y",
      "nameMatchType": "Individual",
      "useCombinedSolution":"N",
      "allowPartialMatch": "true",
      "preset": "G",
      "suppressReorderPenalty": "true",
      "clientData":{
        caseId: "",
       }
  };
    var pennyPayload = {
      requestHeader : { source : "POS"},
      requestBody : obj
    }
    let response = apiCalls.bankaccverification(pennyPayload);
    response
      .then((result) => {
        setIsLoader(false);
        if (result?.data) {
          
         if(result?.data?.responseBody?.statusCode === 101){
          setPennyDropResponse(result?.data)
          form.setFieldsValue({
            InitiatePennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  "Success" : "Failed",
            InitiatePennyDropPOS: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  "Success" : "Failed",
            NameasperPennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName,
          
          })
         }else{
          form.setFieldsValue({
            InitiatePennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  "Success" : "Failed",
            InitiatePennyDropPOS: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  "Success" : "Failed",
          })
         }
          //SUCCESSFUL TRANSACTION
        } else {
          setIsLoader(false);
          form.setFieldsValue({
            InitiatePennyDrop: 'Invalid Input',
            InitiatePennyDropPOS:'Invalid Input',
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
        form.setFieldsValue({
          InitiatePennyDrop: 'Invalid Input',
          InitiatePennyDropPOS:'Invalid Input',
        })

        setIsLoader(false);
      });
  };


  const handleSubmit = (values) => {
    //
    // if(selectedSubType==="partialwithdrawalrequest"){
    //   setIsShowPOSScreen(!isShowPOSScreen);
    // }

      //POSApprove RaiseRequirement
      if (POSContactData && customerData?.isPOS) {
        if (clickedButton === "RaiseRequirement") {
          getRaiseRequirements()
          // POSActionsOnContactDetails(values, "REJECTED");
        } else if (clickedButton === "POSApprove") {
          POSActionsOnContactDetails(null, "APPROVED");
        }
    
    } else {
      if (formFeilds.ValidateSignature === "no") {
        // getRaiseRequirements();
        saveRequest();
      } else {
        saveRequest();
      }
    }



   

  };

 
  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };



  const saveRequest = (values) => {
    setShowAlert(false);
    setIsLoader(true);
    // if(selectedSubType==="loanrequest")setIsShowPOSScreen(!isShowPOSScreen);

    let obj = {
      "CallType": props?.selectedCallType,
      "SubType": props?.selectedSubTypeId,
      "Category":  (isItem.label!=="Share Process Information")  || selectedSubType==="partialwithdrawalrequest" || raiseRequirementOpen  ? 2:1,
      "RequestSource": 1,
      "RequestChannel": loginInfo?.userProfileInfo?.profileObj?.role === 14 ? 13 : 3,
      "ApplicationNo":  policyDetails?.policyDetailsObj?.identifiers?.applicationNo,
      "PolicyNo": policyDetails?.policyDetailsObj?.identifiers?.policyNo,
      "CustomerId": customerData?.laClientID,
      "CustRole": 1,
      "proposerName":policyDetails?.policyDetailsObj?.identifiers?.po_Name,
      "policyStatus": policyDetails?.policyDetailsObj?.planAndStatus?.policyStatus,
      "plan": policyDetails?.policyDetailsObj?.planAndStatus?.planName,
      "DOB": convertDate(customerData?.dob),
      "CreatedOn":  new Date(),
      "CreatedByRef": loginInfo?.userProfileInfo?.profileObj?.userName,
      CreatedUsrId: loginInfo?.userProfileInfo?.profileObj?.userName,
      "ModifiedOn": new Date(),
      "ModifiedByRef": loginInfo?.userProfileInfo?.profileObj?.userName,
      "AssignedToRole": "",
      "AssignedByUser": 0,
      "ReasonForChange": "",
      "RequestDateTime": new Date(),
      "CustSignDateTime":values?.CustSignDateTime
      ? new Date(values?.CustSignDateTime)
      : new Date(),
      CurrentStatus:raiseRequirementOpen? "Reject":'',
      TransactionData: [],
      Uploads: uploadFiles,
      "CommunicationRequest": [
          {
              "SrvReqRefNo": "",
              "TemplateID": "",
              "CommType": 2, // Use the integer value corresponding to the CommType enum (1 for SMS, 2 for EMAIL, 3 for WHATSAPP)
              "ReceipientTo": import.meta.env.VITE_APP_RECEIPIENT_TO ? import.meta.env.VITE_APP_RECEIPIENT_TO : clientEnquiryData?.rinternet,
              "ReceipientCC": "RecipientCCValue2",
              "MobileNos": "",
              "ScheduledTime": "2023-10-31T10:30:00", // Use a valid date-time format
              "CommBody": "", // Payment Link nothing to required
              "Attachments": null
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
      ]
  }

if((selectedSubType ==='partialwithdrawalrequest' && formFeilds.FundTransfer === 'no') || selectedSubType ==='partialwithdrawalquery'){
  let tdata=form.getFieldsValue()
  obj.TransactionData.push(
    { Status: "Create", TagName: "requestchannel", TagValue: values?.requestchannel || ""},
    { Status: "Create", TagName: "AdditionalNoteForCustomer", TagValue: tdata?.AdditionalNoteForCustomer || "" },
    {
      "Status": "Create",
      "TagName": "RCD",
      "TagValue": convertDate(policyDetails?.policyDetailsObj?.saDetails?.rcd)
    },
    {
      "Status": "Create",
      "TagName": "APE",
      "TagValue": customerData?.premiumAmt
    },
    {
      "Status": "Create",
      "TagName": "TotalFundValue",
      "TagValue": formFeilds.TotalFundValue
  },
  {
    "Status": "Create",
    "TagName": "TotalAmount",
    "TagValue": formFeilds.TotalFundValue?.replace(/,/g, '')
},
{
  "Status": "Create",
  "TagName": "EnteredAmount",
  "TagValue": formFeilds.PayableAmount?? formFeilds.PayableAmount?.replace(/,/g, '')?? ''
},
  {
      "Status": "Create",
      "TagName": "SelectFund",
      "TagValue": formFeilds?.SelectFund || ""
  },
  {
      "Status": "Create",
      "TagName": "Amount",
      "TagValue": formFeilds?.Amount || ""
  },
  {
      "Status": "Create",
      "TagName": "FundTransfer",
      "TagValue": formFeilds.FundTransfer
  },
  {
      "Status": "Create",
      "TagName": "RequestTime",
      "TagValue": formFeilds.RequestTime
  },
  {
      "Status": "Create",
      "TagName": "ReasonForPartialWithdrawal",
      "TagValue": formFeilds.ReasonForPartialWithdrawal
  },
  {
      "Status": "Create",
      "TagName": "NameAsMentionedInTheBank",
      "TagValue": formFeilds.NameAsMentionedInTheBank
  },
  {
      "Status": "Create",
      "TagName": "BankIFSC",
      "TagValue": formFeilds?.BankIFSC?.toUpperCase()
  },
  {"tagName":"BranchName","tagValue": formFeilds?.BranchName,"status":"Create"},
  {"tagName":"AccountType","tagValue":formFeilds?.AccountType,"status":"Create"},
  {"tagName":"NameasperPennyDrop","tagValue":formFeilds?.NameAsPerPennyDrop,"status":"Create"},
  {"tagName":"NamematchasperPennyDrop","tagValue":formFeilds?.NameMatch,"status":"Create"},
  {
      "Status": "Create",
      "TagName": "BankAccountNumber",
      "TagValue": BankAccNo
  },
  {
      "Status": "Create",
      "TagName": "ConfirmBankAccountNumber",
      "TagValue": formFeilds.ConfirmBankAccountNumber
  },
  {
      "Status": "Create",
      "TagName": "BankName",
      "TagValue": formFeilds.BankName
  },
  {
      "Status": "Create",
      "TagName": "InitiatePennyDrop",
      "TagValue": formFeilds.InitiatePennyDrop
  },
  {
      "Status": "Create",
      "TagName": "CustomerSigningDate",
      "TagValue": formFeilds.CustomerSigningDate
  },
  {
      "Status": "Create",
      "TagName": "BranchReceivedDate",
      "TagValue": formFeilds.BranchReceivedDate
  },
  {
      "Status": "Create",
      "TagName": "ValidatedBy",
      "TagValue": "form"
  },
  {
      "Status": "Create",
      "TagName": "ValidateSignature",
      "TagValue": formFeilds.ValidateSignature
  },
  
  {
    "Status": "Create",
    "TagName": "PayableAmount",
    "TagValue":formFeilds.PayableAmount?.replace(/,/g, '')
},
  {
    "Status": "Create",
    "TagName": "FundTransferAmount",
    "TagValue": 0
},
{
  "Status": "Create",
  "TagName": "Comments",
  "TagValue": formFeilds.Comments
},
{ Status: "Create", TagName: isItem.label==="Share Fund Statement"? "Template" : "ProcessFileType", TagValue:isItem.label==="Share Fund Statement"?"SENDDOCS":"PROCESSENQUIRY" },
  )
}else if(selectedSubType ==='partialwithdrawalrequest' && formFeilds.FundTransfer === 'yes'){
    let tdata=form.getFieldsValue()
  let EnteredAmount = Number(formFeilds?.PayableAmount); 
  let FundTransferAmount = Number(formFeilds?.FundTransferAmount); 
  let  payableAmountt  = EnteredAmount - FundTransferAmount
  obj.TransactionData.push( 
    { Status: "Create", TagName: "AdditionalNoteForCustomer", TagValue: tdata?.AdditionalNoteForCustomer || "" },
    {
      "Status": "Create",
      "TagName": "RCD",
      "TagValue": convertDate(policyDetails?.policyDetailsObj?.saDetails?.rcd)
    },
    {
      "Status": "Create",
      "TagName": "APE",
      "TagValue": customerData?.premiumAmt
    },
    {
      "Status": "Create",
      "TagName": "TotalFundValue",
      "TagValue":formFeilds.TotalFundValue?? formFeilds.TotalFundValue?.replace(/,/g, '')?? ''
  },
  {
    "Status": "Create",
    "TagName": "TotalAmount",
    "TagValue": formFeilds.TotalFundValue?? formFeilds.TotalFundValue?.replace(/,/g, '')?? ''
},
  {
      "Status": "Create",
      "TagName": "SelectFund",
      "TagValue": formFeilds.SelectFund
  },
  { Status: "Create", TagName: "ProcessFileType", TagValue:"PROCESSENQUIRY" },
  {
    "Status": "Create",
    "TagName": "PayableAmount",
    "TagValue": payableAmountt
},
  {
      "Status": "Create",
      "TagName": "EnteredAmount",
      "TagValue": formFeilds.PayableAmount?? formFeilds.PayableAmount?.replace(/,/g, '')?? ''
  },
  {
      "Status": "Create",
      "TagName": "FundTransfer",
      "TagValue": formFeilds.FundTransfer
  },
  {
      "Status": "Create",
      "TagName": "RequestTime",
      "TagValue": formFeilds.RequestTime
  },
  {
      "Status": "Create",
      "TagName": "ReasonForPartialWithdrawal",
      "TagValue": formFeilds.ReasonForPartialWithdrawal
  },

  {
    "Status": "Create",
    "TagName": "FundTransferTo",
    "TagValue": formFeilds.FundTransferTo
},
{
    "Status": "Create",
    "TagName": "FundTransferAmount",
    "TagValue": formFeilds.FundTransferAmount ??  formFeilds.FundTransferAmount?.replace(/,/g, '')??  ''
},  
// {
//   "Status": "Create",
//   "TagName": "PayableAmount",
//   "TagValue": formFeilds.FundTransferAmount ? formFeilds.FundTransferAmount?.replace(/,/g, ''): ''
// }, 
{
  "Status": "Create",
  "TagName": "RelationstoFTPolicy",
  "TagValue": formFeilds.RelationstoFTPolicy
},
{
  "Status": "Create",
  "TagName": "NameofFundTransferPolicyOwner",
  "TagValue": formFeilds.NameofFundTransferPolicyOwner
},



  {
      "Status": "Create",
      "TagName": "NameAsMentionedInTheBank",
      "TagValue": formFeilds.NameAsMentionedInTheBank
  },
  {
      "Status": "Create",
      "TagName": "BankIFSC",
      "TagValue": formFeilds?.BankIFSC?.toUpperCase()
  },
  {"tagName":"BranchName","tagValue": formFeilds?.BranchName,"status":"Create"},
  {"tagName":"AccountType","tagValue":formFeilds?.AccountType,"status":"Create"},
  {"tagName":"NameasperPennyDrop","tagValue":formFeilds?.NameAsPerPennyDrop,"status":"Create"},
  {"tagName":"NamematchasperPennyDrop","tagValue":formFeilds?.NameMatch,"status":"Create"},
  {
      "Status": "Create",
      "TagName": "BankAccountNumber",
      "TagValue": formFeilds.BankAccountNumber
  },
  {
      "Status": "Create",
      "TagName": "ConfirmBankAccountNumber",
      "TagValue": formFeilds.ConfirmBankAccountNumber
  },
  {
      "Status": "Create",
      "TagName": "BankName",
      "TagValue": formFeilds.BankName
  },
  {
      "Status": "Create",
      "TagName": "InitiatePennyDrop",
      "TagValue": formFeilds.InitiatePennyDrop
  },
  {
      "Status": "Create",
      "TagName": "CustomerSigningDate",
      "TagValue": formFeilds.CustomerSigningDate
  },
  {
      "Status": "Create",
      "TagName": "BranchReceivedDate",
      "TagValue": formFeilds.BranchReceivedDate
  },
  {
      "Status": "Create",
      "TagName": "ValidatedBy",
      "TagValue": "form"
  },
  {
      "Status": "Create",
      "TagName": "ValidateSignature",
      "TagValue": formFeilds.ValidateSignature
  },
  {
    "Status": "Create",
    "TagName": "Comments",
    "TagValue": formFeilds.Comments
},
  
    )
}

  // if(formFeilds.ValidateSignature === 'no'){
    let ids = raiseRequerimentList?.filter((e) => e.status === true)?.map((e) => e.raiseReqId)
  
    obj.TransactionData.push({
      "Status": "Create",
      "TagName": "ReasonList_Key",
      "TagValue":  JSON.stringify(ids)
    })
  // }
  obj.TransactionData.push({
    "Status": "Create",
    "TagName": "CustomerType",
    "TagValue":  policyDetails?.policyDetailsObj?.planAndStatus?.customerType
  })

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
        // setIsLoader(false);
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

  const POSActionsOnContactDetails = (val, status) => {
    const values = form.getFieldsValue();
    let seletedRequerimentList = raiseRequerimentList
      ?.filter((e) => e.status === true)
      ?.map((e) => e.raiseReqId);
      if(seletedRequerimentList.length===0  && status === 'REJECTED'){
        setIsLoader(false);
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
      SrvReqRefNo: POSContactData?.srvReqRefNo,
      Status: status,
      RequirementList: seletedRequerimentList,
      UsrID: loginInfo?.userProfileInfo?.profileObj?.userName,
      RoleID: loginInfo?.userProfileInfo?.profileObj?.role,
      // "RequirementComments":requirementCmnt,
      Comments: values?.Comments,
      TransactionPayload: [
        {
          "Status": "Create",
          "TagName": "POSComments1",
        "TagValue":values?.Comments
      }
      ],
    };
    if(loggedUser?.role === 4){
      obj.TransactionPayload.push(
        {
          "Status": "Update",
          "TagName": "NameAsMentionedInTheBank",
          "TagValue": values.NameAsMentionedInTheBank
      },
      {
        "Status": "Update",
        "TagName": "BankIFSC",
        "TagValue": values?.BankIFSC?.toUpperCase()
    },
    {
          "Status": "Update",
          "TagName": "BankAccountNumber",
          "TagValue": values.BankAccountNumber
      },
      {
        "Status": "Update",
        "TagName": "BankName",
        "TagValue": values.BankName
    },
    {
      "Status": "Update",
      "TagName": "InitiatePennyDrop",
      "TagValue": values.InitiatePennyDrop
    },



        {
          "Status": "Create",
          "TagName": "PaymentMode",
          "TagValue": values.paymentMode
      },
        {
          "Status": "Create",
          "TagName": "ChangeInLast60Days",
          "TagValue": values.ChangeInLast60Days
      },
      {
        "Status": "Create",
        "TagName": "PolicyLoggedLast",
        "TagValue": values.PolicyLoggedLast
    
    },
    {
      "Status": "Create",
      "TagName": "SignatureChange",
      "TagValue": values.SignatureChange
  
  },
    
    {
      
        "Status": "Create",
        "TagName": "ViewFinalPayableAmount",
        "TagValue": values.ViewFinalPayableAmount? values.ViewFinalPayableAmount?.replace(/,/g, ''): ''
      },
      {
        "Status": "Create",
        "TagName": "InitiatePennyDropPOS",
        "TagValue": values.InitiatePennyDropPOS
      },
       {
      "Status": "Create",
      "TagName": "Comments",
      "TagValue": values.POScomment
    },
    {
      "Status": "Create",
      "TagName": "POSManagerRemarks",
      "TagValue": values.POSManagerRemarks
    },
        )
    }
    if(loggedUser?.role === 5){
  
      obj.TransactionPayload.push(
        {
          "Status": "Create",
          "TagName": "STPFailedReason",
          "TagValue": values.STPFailedReason
      },
      {
        "Status": "Create",
        "TagName": "Decision",
        "TagValue": values.Decision
    },
    {
      "Status": "Create",
      "TagName": "SendEmailtoCompliance",
      "TagValue": values.SendEmailtoCompliance
    },
    // {
    //   "Status": "Create",
    //   "TagName": "BranchRemarks",
    //   "TagValue": values.BranchRemarks
    // },
    
      )
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
        setIsLoader(false);
        setRequirementLoader(false);
      })
      .catch((err) => {
        setIsLoader(false);
        setRequirementLoader(false);
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
          handleError(val?.data?.responseBody?.errormessage);
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
    //   setIsLoader(false);
    //   setRequirementLoader(false);
    //   message.destroy();
    //   message.error({
    //     content: "Please Select Documents to Reject",
    //     className: "custom-msg",
    //     duration: 3,
    //   });
    // return;
    // }


    if(isShowPOSScreen){
      POSActionsOnContactDetails(null, "REJECTED");
    }else{
      saveRequest();
    }
    
  };

  const getUploadFiles=(listOfUploadFiles)=>{
    // const updatedUploadList = listOfUploadFiles?.map((obj) => {
    //   // Create a new object without the propertyToDelete property
    //   const { labelName, ...newObject } = obj;
    //   return newObject;
    // });
    // Update the state with the new list
    setUploadFiles([...docIdProofs, ...listOfUploadFiles]);

  }
  const handleRegisterRequest =()=>{
    setSelectedSubType('partialwithdrawalrequest');
    typesForm?.setFieldsValue({subType: 1})
  }


  const getInternal = (values) => {
    POSActionsOnContactDetails(values, "INTERNAL");
  }

  const handleLinkValue  =(item)=>{
    setIsMultipleFiles([]);
    if(item?.label?.includes("Upload ID Proof")){
      setIdProofModal(true);
    }
    else if(item?.label?.includes("Upload Address Proof")){
      setAddressProofModal(true);
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
      else {
        setUploadMultipleFiles(listOfUploadFiles);
        form.setFieldsValue({
          addressProof: `Documents Uploaded -  ${listOfUploadFiles.length }`,
        })
      }
    }
  }

  const uploadProps = {
    name: "file",
    multiple: false,
    fileList: [],
    customRequest: ({ file, onSuccess, index,item },label,idProofUpload) => {
      let formData = new FormData();
      const ApplicationNo =  policyDetails?.policyDetailsObj?.identifiers?.applicationNo
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
          else {
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
              getMultpleUploadFiles(updatedUploadFiles,label);
            } else {
              // If doesn't exist, add the new file object to the list
              setIsMultipleFiles((prevFiles) => [...prevFiles, newDocumentObj]);
          
              // Send the updated files to getMultpleUploadFiles
              // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
              getMultpleUploadFiles([...isUploadMultipleFiles, newDocumentObj],label);
            }
          } else {
            // If labelName is not present or the array is empty, add the new file object to the list
            setIsMultipleFiles((prevFiles) => [...prevFiles, newDocumentObj]);
          
            // Send the updated files to getMultpleUploadFiles
            // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
             getMultpleUploadFiles([...isUploadMultipleFiles, newDocumentObj],label);
          }
        }
          
          //getMultpleUploadFiles(documnetsObj);
          setShowUploadFile(index);
          setDocIdProofs([{...newDocumentObj}]);
          //setUploadFiles(file);
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
          }
          else {
          if(label?.includes("Copy of Aadhar Card")){
            setAAdharUploadFiles([{...newDocumentObj}]);
          }
          else if(label?.includes("Require Change in Signature Form duly attested by Bank official")){
            setPassportUploadFiles([{...newDocumentObj}]);
          }
          else if(label?.includes("Copy of Passport")){
            setPassportUploadFiles([{...newDocumentObj}]);
          }
          else if(label?.includes("Copy of Ration Card")){
            setRationCardUploadFiles([{...newDocumentObj}]);
          }
          else if(label?.includes("Copy of Driving License")){
            setDrivingUploadFiles([{...newDocumentObj}]);
          }
          else if(label?.includes("Copy of PAN Card")){
            setPancardUploadFiles([{...newDocumentObj}])
          }
          else if(label?.includes("Copy of Voter ID")){
            setVoterUploadFiles([{...newDocumentObj}]);
          }
          else if(label?.includes("Utility Bill which is not more than 2 months")){
            setUtilityUploadFiles([{...newDocumentObj}]);
          }
          else if(label?.includes("Bank statement/Passbook copy with latest 2 months transactions")){
            setPassbookUploadFiles([{...newDocumentObj}]);
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
        message.error("File don't allow double extension")
        return Upload.LIST_IGNORE;
      }
    }
    }
    const handleAddressModalClose=()=>{
      setUploadFiles([]);
      setAddressProofModal(false);
      setAAdharUploadFiles([]);
      setPassportUploadFiles([]);
      setRationCardUploadFiles([]);
      setDrivingUploadFiles([]);
      setVoterUploadFiles([]);
      setPancardUploadFiles([]);
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
    }
    const handleOk = (idProofBtn) => {
      if(idProofBtn==="idProof"){
      if(aadharIDUploadFiles?.length===0&&passportIDUploadFiles?.length===0&&rationCardIDUploadFiles?.length===0&&DrivingIDUploadFiles?.length===0&&voterIDUploadFiles?.length===0&&pancardIDUploadFiles?.length===0){
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
      setAddressProofModal(false);
      setIdProofModal(false);
      }
    }
    else {
      if(aadharUploadFiles?.length===0&&passportUploadFiles?.length===0&&rationCardUploadFiles?.length===0&&DrivingUploadFiles?.length===0&&
        utilityUploadFiles?.length===0&&voterUploadFiles?.length===0&&passbookUploadFiles?.length===0
      ){
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
    setAddressProofModal(false);
    setIdProofModal(false);
    }
  }

    };
    const handleRemove = (file) => {
      if(file?.labelName === "Require Change in Signature Form duly attested by Bank official"){
        setPassportUploadFiles([]);
      }else if(file?.labelName === "Copy of PAN Card"){
        setPancardUploadFiles([]);
      }
      else if(file?.labelName === "Copy of Aadhar Card"){
        setAAdharUploadFiles([]);
      }else if(file?.labelName === "Copy of Passport"){
        setPassportUploadFiles([]);
      }else if(file?.labelName === "Copy of Ration Card"){
        setRationCardUploadFiles([]);
      }else if(file?.labelName === "Copy of Driving License"){
        setDrivingUploadFiles([]);
      }
      else if(file?.labelName === "Copy of Voter ID"){
        setVoterUploadFiles([]);
      }
      else if(file?.labelName === "Utility Bill which is not more than 2 months"){
        setUtilityUploadFiles([]);
      }
      else if(file?.labelName === "Bank statement/Passbook copy with latest 2 months transactions"){
        setPassbookUploadFiles([]);
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
      else {
        let updatedFiles = isUploadMultipleFiles?.filter((ele)=>{
          return ele?.labelName !== file.labelName
  });
  setIsMultipleFiles(updatedFiles)
        form.setFieldsValue({
          addressProof: `Documents Uploaded -  ${updatedFiles.length }`,
        })
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
        (key >= '0' && key <= '9') || // Numbers 0-9
        key === 'Backspace' ||
        key === '.' ||
        key === 'Tab' ||
        key === 'ArrowLeft' ||
        key === 'ArrowRight' ||
        key === 'Delete'
      ) {
        // Prevent more than one period (.)
        if (key === '.' && value?.includes('.')) {
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
      let validValue = value.replace(/[^0-9.]/g, '');
    
      // Ensure only one decimal point is allowed
      if (validValue.includes('.')) {
        const [integerPart, decimalPart] = validValue.split('.');
    
        // Restrict the number of digits before the decimal point
        const limitedIntegerPart = integerPart.slice(0, maxIntegerDigits);
    
        // Allow at most two decimal places
        validValue = decimalPart ? `${limitedIntegerPart}.${decimalPart.slice(0, 2)}` : limitedIntegerPart;
      } else {
        // If there's no decimal point, just limit the integer part
        validValue = validValue.slice(0, maxIntegerDigits);
      }
    
      // Update the form field with the validated value
      form.setFieldsValue({ [event.target.name]: validValue });
    };
    
    
    const calculateTotal = (changedValues, allValues) => {
      const fieldValues = finalPaymentForm?.getFieldValue();
      const { totalSurrenderAmount = 0, LessLoan = 0, LessTDS = 0, PenalInterest = 0, InterestCharges = 0 } = allValues || fieldValues;
      const parseNumber = (value) => parseFloat(value?.toString()?.replace(/,/g, '')) || 0;
      const numericValues = [
        parseNumber(totalSurrenderAmount),
        -parseNumber(LessLoan),
        -parseNumber(LessTDS),
        parseNumber(PenalInterest),
        parseNumber(InterestCharges)
      ];
    
      const total = numericValues.reduce((acc, value) => acc + value, 0);
      finalPaymentForm.setFieldsValue({ FinalPayableAmount: total });
    };
    
    const handlePaybleSubmit = ()=>{
      const formData = finalPaymentForm.getFieldValue();
      form.setFieldsValue({ViewFinalPayableAmount: formData?.FinalPayableAmount})
      setFinalPayableAmtModal(false);
    }

    const getTDSInfo = async() =>{
      let response = await apiCalls.GetTDSInfo(policyDetails?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo,customerData?.laClientID,
        loginInfo?.userProfileInfo?.profileObj?.userName
      );
      if (response.statusText) {
            if (response?.data) {
              finalPaymentForm.setFieldsValue({
                LessTDS: response?.data?.tdsAmount
                          })
             calculateTotal();
            } else {
              message.error({
                content:
                response?.data?.responseBody?.errormessage,
                className: "custom-msg",
                duration: 2,
              });
  
              finalPaymentForm.setFieldsValue({
              LessTDS: ""
              })
              
            }
    }
  }
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
      <Spin spinning={isLoading || isLoader} fullscreen/>
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

            : (
          <>
          {selectedSubType==="partialwithdrawalquery"&&<>
          {!isShowPOSScreen && (
            <>
                {renderDetailsForm("BOE_Details")}
                {isShowWithdrawalApplicable&&<>{renderDetailsForm("WithdrawApplicableYes")}</>}
                {renderDetailsForm("ShareProcess")}
                {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
            </>}
            {isShowWithdrawalApplicable&&<>
            <div className="contact-details-btn">
           
            <Button type="primary" className="primary-btn" htmlType="submit" 
            >
              {!isShowPOSScreen
                ? "Submit"
                : "Approve"}
            </Button>
                {/* <Button
                  type="primary"
                  className="primary-btn"
                  onClick={()=>handleRegisterRequest()}
                >
                  Register Request
                </Button> */}
          </div>
          </>
            }
             </>)}
             </>}
             {selectedSubType==="partialwithdrawalrequest"&&<>
          {!isShowPOSScreen && !isShowPOSScreen_Manager&& (
            <>
             {renderDetailsForm("BOE_Details")}
             {isShowTransferFields&& <>
             { renderDetailsForm("OPTForFundTransferYes")}
             </>}
             {renderDetailsForm("Upload_Fields")}
             {renderDetailsForm("Bank_Details")}
             {renderDetailsForm("Request_Fields")}
             {showResonDelayField&&<>{renderDetailsForm("ReasonSubmission")}</>}
             </>)}
             {isShowPOSScreen && !isShowPOSScreen_Manager &&(<>
             {renderDetailsForm("POS_Details")}
             {isShowTransferFields&&<>{renderDetailsForm("POS_View_FundTransfer_Details")}</>}
             {renderDetailsForm("POS_Action")}
             </>)}
             {isShowPOSScreen_Manager&&(<>
             {renderDetailsForm("POS_Details_Manager")}
             {<>{renderDetailsForm("POS_View_FundTransfer_Details_Manager")}</>}
             {renderDetailsForm("POS_Action_Manager")}
             </>)}
             <div className="contact-details-btn">
            {/* {!showRaiseRequirementBtn&&<> */}
           <Button type="primary" className="primary-btn" disabled={DisableSubmit&&!isShowPOSScreen} htmlType="submit"  onClick={() => setClickedButton("POSApprove")}  
            >
              {!isShowPOSScreen
                ? "Submit"
                : "Approve"}
            </Button>
            {/* </>} */}

            {(isShowPOSScreen || !isShowPOSScreen) && (
              <>
                <Button
                  type="primary"
                  className="primary-btn" htmlType="submit" 
                  onClick={() => setClickedButton("RaiseRequirement")}
                >
                  Raise Requirement
                </Button>
              </>
            )}
            {
              isShowPOSScreen &&  
              <Button type="primary" value="RaiseRequirement"  htmlType="submit" onClick={() => getInternal()} className="primary-btn" >
              Internal Requirement
              </Button>
            }
          </div>
             </>}
             </>
            )}
         
        
          
        </Form>

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
      </Modal>

      <Modal
        title={"Total Fund Value"}  
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
          <table className="responsive-table text-center">
            <thead>
              <tr>
                <th>Fund Name</th>
                <th>NAV</th>
                <th>Units Available</th>
                <th>Fund Value</th>
      
              </tr>
            </thead>
            
            <tbody>
                  {fundValueData && fundValueData?.map((item, ind) => (
                    <tr key={ind + 1}>
            
                   <td>
                    {item?.vrtfund}
                   </td>
                  
                  <td>
                    {item?.curuntval}
                  </td>
                  <td>
                    {item?.unitprice}
                  </td>
                  <td>
                    {item?.curuntval}
                  </td>
                    
                    </tr>
                  ))}
                  {fundValueData?.length === 0 && (
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
          label="Gross Surrender Value"
          className="inputs-label mb-0"
          rules={[
            {
              required: false,
              message: "Gross Surrender Value",
            },
          ]}
        >
          <Input
            placeholder="Gross Surrender Value"
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
                  label="Less Loan"
                  name="LessLoan"
                  className="inputs-label mb-0"
                >
                   <Input
            placeholder="Less Loan"
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
                  label="Less TDS"
                  name="LessTDS"
                  className="inputs-label mb-0 subtype right-colsize"
                >
                  <Input
            placeholder="Less TDS"
            className="cust-input modal-input"
            maxLength={100}
            onKeyDown={handleKeyDown}
            onChange={handleInputChange1}
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
          </Button> { " "}
                </div>
        </Form.Item>
      </Col>
    </Row>
  </Form>
      </Modal>

      <Modal
        title="Negative List"
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
              <th>Program
</th>
              <th>Type</th>
            
            </tr>
            {negativeList?.map((item,index) => (
            <tr key={index}>
            <td>
              {item?.name}
            </td>
            <td>
              {item?.program}
            </td>
            
              <td>{item?.type}</td>
             
            </tr>
          ))}
           {negativeList?.length === 0  &&
               <tr>
                  <td colspan="4">
               
                <div className="text-center"><span>No data available</span></div> 
        </td>
        </tr>}
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
            {BankduDupeData?.map((item,index) => (
            <tr key={index}>
            <td>{item?.LA_PolicyNo || item?.lA_PolicyNo}</td>
              <td>{item?.Acc_Number || item?.acc_Number}</td>
              <td>{item?.Acc_HldrName || item?.acc_HldrName}</td>
              {/* <td>{item?.CustomerNam || item?.customerName}</td> */}
            </tr>
          ))}
           {BankduDupeData?.length === 0  &&
               <tr>
                  <td colspan="3">
               
                <div className="text-center"><span>No data available</span></div> 
        </td>
        </tr>}
          </table>
        </div>
      </Modal>

      <Modal
        title="List of Acceptable Address Proofs"
        open={addressProofModal&&["partialwithdrawalrequest"]?.includes(selectedSubType)}
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
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of Aadhar Card")}
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
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of Passport")}
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
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of Ration Card")}
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
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of Driving License")}
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
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Utility Bill which is not more than 2 months")}
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
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of Voter ID")}
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
              <td>Bank statement/Passbook copy with latest 2 months transactions</td>
              <td>
              <Upload 
                      {...uploadProps} 
                      fileList={passbookUploadFiles}
                      onRemove={handleRemove}
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,pdf"
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Bank statement/Passbook copy with latest 2 months transactions")}
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
        open={idProofModal&&["partialwithdrawalrequest"]?.includes(selectedSubType)}
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
    </>
  );
};

export default PartialWithdrawal;
