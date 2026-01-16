import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Form, Spin, Button, message, Input, Tabs, Radio,DatePicker,Select, Modal, Tooltip } from "antd";
import { ClaimsData } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import moment from "moment";
import UploadIcon from "../../assets/images/upload.png";
import apiCalls from "../../api/apiCalls";
import PopupAlert from "../popupAlert";
import dayjs from "dayjs";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { profileObj } from "../../reducers/ProfileReducer";
import CloseIcon from "../../assets/images/close-icon.png";
import { useData } from '../../reducers/DataContext';


const { TabPane } = Tabs;
const { Option } = Select;
const ClaimsNotificationView = (props) => {
  const { showIntRequestTime } = useData();
  
  const loginInfo = useSelector(state => state);
  const dateFormat = "DD/MM/YYYY";
  const [emailExist] = useState(false);
  const suffix = <img src={UploadIcon} alt="" />;
  const { selectedSubType, clientRoleLU, details, customerData, clientEnquiryData,causeOfEventLU, natureOfDeathLU,policyTypeLU,claimCategoryLU,claimIntimationLU,sourceInformationLU,assuredIncomePlanLU,POSContactData,policyStatusDOBLU, isPolicyAssigned, paymentReasonCodeLU, coverageNameofProductLU, claimPaymentMethodLU, healthClaimCodeLU, organCategoryCodeLU } = props?.propsData;
  const [form] = Form.useForm();
  const [nomineeform] = Form.useForm();
  const [nomineebankform] = Form.useForm();
  const [uploadform] = Form.useForm();
  const [intimationForm] = Form.useForm();
  const [lifeAsiaForm] = Form.useForm();
  const [raiseReqForm] = Form.useForm();
  const [recordIntimationForm] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [ClaimTypee, setClaimTypee] = useState('');
  const [isShowPOSScreen, setIsShowPOSScreen] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertData, setAlertData] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [claimIntimatedBy, setClaimIntimatedBy] = useState("");
  const [existingNomineeData, setExistingNomineeData] = useState([]);
  const [relationShipLU,setRelationShipLU] = useState([]);
  const [isPennyDropStatus, setIsPennyDropStatus] = useState(false);
  const [isBeneficiaryChangeRequired,setIsBeneficiaryChangeRequired] = useState(true);
  const [CNFBankAccNo, setCNFBankAccNo] = useState("");
  const [BankAccNo, setBankAccNo] = useState("");
  const [updateFields,setUpdateFields] = useState(false);
  const [isAccidentSelection,setIsAccidentSelection] = useState(false);
  const [claimDetailsData,setClaimDetailsData] = useState({});
  const [intimationData,setIntimationData] = useState({});
  const [dateOfDeath, setDateOfDeath] = useState('');
  const [lifeAsiaTransactionModal,setLifeAsiaTransactionModal] = useState(false);
  const [lifeTransactionData, setLifeTransactionData] = useState([])
  const [beneficiaryDetailsData, setBeneficiaryDetailsData] = useState([]);
  const [beneficiaryBankData, setBeneficiaryBankData] = useState([]);
  const [isEditNominee, setIsEditNominee] = useState(false);
  const [Edit, setIsEdit] = useState(true);
  const [isBeneficiaryEdit, setIsBeneficiaryEdit] =  useState(true);
  const [isEditBeneficiary, setIsEditBeneficiary] = useState(false);
  const [posUpdateNomineeData, setPosUpdateNomineeData] = useState([]);
  const [isBeneficiaryBankEdit, setIsBeneficiaryBankEdit] = useState(true);
  const [isBankEditable, setIsBankEditable] = useState(false);
  const [isShowRequirements, setIsShowRequirements] = useState(false);
  const [isRerenderForm, setIsReRenderForm] = useState(false);
  const [isShowOtherDocument, setIsShowOtherDocument] = useState(false);
  const [isRiderData, setIsRiderData] = useState([]);
  const [NameDeDupeData,setNameDeDupeData] = useState([]);
  const [NameDeDupeModal,setNameDeDupeModal] = useState(false);
  const [deDupeModalOpen, setDeDupeModalOpen] = useState(false);
  const [BankduDupeData,setBankDeDupeData] = useState([]);
  const [viewTransactionModal, setViewTransactionModal] = useState(false);
  const [viewTransactionData, setViewTransactionData] = useState([]);
  const [viewTransLoader, setViewTransLoader] = useState(false);
  const [deathSumAssuredAmount, setDeathSumAssuredAmount] = useState('');
  const [statusAliveValues, setStatusAliveValues] = useState([]);
  const [beneficiaryDetails, setBeneficiaryDetails] = useState([]);
  const [updateExistingNomineeData, setUpdateExistingNomineeData] = useState([]);
  const [consolidatedBeneficiaryList, setConsolidatedBeneficiaryList] = useState([]);
  const [updateNomineeData, setUpdateNomineeData] = useState([]);
  const [updateAppointeeData, setUpdateAppointeeData] = useState([
    {id:1, AppointeeDOB_New: null, RealtionshipWithPolicyowner_New: null, Share_New: 100, Role_New:"appointee",isMinor:false, AppointeeLastName_New: "", AppointeeFirstName_New: ""},
  ]);

const [activeTabKey, setActiveTabKey] = useState("1");
const dispatch = useDispatch();

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const handleTabChange = (key) => {
  setActiveTabKey(key);
};
let posChangeinPlanObj = {};

const requirements = [
    "Claim intimation form / letter / email",
    "Original policy bond or confirmation letter or indemnity for lost policy bond",
    "Original death certificate issued by local authority",
    "Current address proof & photo identity proof of claimant/representative",
    "PAN card / Form 60 of the claimant/representative",
    "Bank details and proof of bank account (cancelled cheque with printed name or passbook copy verified by the branch)",
    "Employer Questionnaire for salaried LA (Optional)",
    "Certificate of cremation or burial (Optional)",
    "Relationship proof of the nominee with the LA",
    "Medical / medicolegal cause of death certificate",
    "Medical records (admission notes, discharge / death summary, tests reports, etc.)",
    "Medical Questionnaires",
    "Any other related documents",
    "Copy of FIR, panchanama, inquest report, post-mortem report, viscera chemical analysis (VCA), final police report (if applicable)",
    "Copy of Driving License"
];

const options = requirements.map((requirement, index) => ({
    key: index + 1,
    value: requirement
}));

const [selectedRequirements, setSelectedRequirements] = useState([]);

const handleChange = (value) => {
    setSelectedRequirements(value);
};
const convertDate1 =(dateString)  =>{
  if (!dateString) return dateString; // Return if the date is null or undefined
  
  const date = new Date(dateString); // Convert the string to a Date object
  
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    console.error("Invalid date:", dateString);
    return dateString; // Return the original string if the date is invalid
  }

  // Format the date as dd/mm/yyyy using locale settings
  return date.toLocaleDateString('en-GB'); // 'en-GB' locale formats dates as dd/mm/yyyy
}




useEffect(()=>{
 
  if(customerData?.isClaimsNotification && activeTabKey ==="1"){debugger
    const Claimdetails1  = POSContactData?.claimsDetails;
    
    posChangeinPlanObj = Claimdetails1;
        // POSContactData?.serviceRequestTransectionData?.forEach(element => {
        //   posChangeinPlanObj[element.tagName] = element.tagValue
        // });

         ClaimsData[selectedSubType]?.Notification_Details?.forEach(element => {
      if(element?.name === "paymentReasonCode" && (posChangeinPlanObj.claimType === "DEATH" || posChangeinPlanObj.claimType === "Health")){
        element.hide= true;
      }
     
      else if(element?.name === "coverageNameofProduct" && (posChangeinPlanObj.claimType === "DEATH" || posChangeinPlanObj.claimType === "Health")){
          element.hide= true;
        }
       else if(element?.name === "claimPaymentMethod" && (posChangeinPlanObj.claimType === "DEATH" || posChangeinPlanObj.claimType === "Health")){
              element.hide = true;
          }
           else if(element?.name === "organType" && (posChangeinPlanObj.claimType === "DEATH" || posChangeinPlanObj.claimType === "CI"  || posChangeinPlanObj.claimType === "TPD" || posChangeinPlanObj.claimType === "WPO")){
              element.hide = true;
          }

             else if(element?.name === "healthClaimCondition" && (posChangeinPlanObj.claimType === "DEATH" || posChangeinPlanObj.claimType === "CI"  || posChangeinPlanObj.claimType === "TPD" || posChangeinPlanObj.claimType === "WPO")){
              element.hide = true;
          }
    });
// Extracting dates
const rcdStr = props?.propsData?.details?.policyDetailsObj?.saDetails?.rcd;  // '20200215'
const dateOfDeathStr = posChangeinPlanObj?.dateOfDeath;  // '19/03/2025'

// Parsing dates
const rcd = new Date(`${rcdStr.substring(0, 4)}-${rcdStr.substring(4, 6)}-${rcdStr.substring(6, 8)}`);
let day, month, year;
if (typeof dateOfDeathStr === 'string' && dateOfDeathStr.includes('/')) {
  [day, month, year] = formatDate(dateOfDeathStr).split('/');
} else {
  day = month = year = '';
}
const dateOfDeath = (day && month && year) ? new Date(`${year}-${month}-${day}`) : null;

// Calculating the difference in years
const diffTime = dateOfDeath - rcd;
const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);  // Accounting for leap years

// Setting the claim category based on date difference
const claimCategory = diffYears < 3 ? "Early Claim" : "Non-Early Claim";

// Convert array to flat object
const flatObj = {};
if (Array.isArray(posChangeinPlanObj)) {
  posChangeinPlanObj.forEach(item => {
    flatObj[item.tagName] = item.tagValue;
  });
} else if (typeof posChangeinPlanObj === 'object' && posChangeinPlanObj !== null) {
  Object.assign(flatObj, posChangeinPlanObj);
}

// Populating the form fields
// form.setFieldsValue({
//     custRole: posChangeinPlanObj?.custRole ? parseInt(posChangeinPlanObj.custRole, 10) : null,
//     srvReqID: posChangeinPlanObj?.srvReqRefNo,
//     policyType: claimDetailsData?.policyType || details?.policyDetailsObj?.planAndStatus?.customerType,
//     claimType: claimDetailsData?.claimType || posChangeinPlanObj?.claimType || null,
//     typeofcondition :claimDetailsData?.typeofcondition || posChangeinPlanObj?.typeofcondition || null,
//     claimCategory: claimCategory,   // Updated claim category
//     NatureofDeath: claimDetailsData?.NatureofDeath || (posChangeinPlanObj?.NatureofDeath ? parseInt(posChangeinPlanObj?.NatureofDeath) : null),
//     exactCauseOfDeath: claimDetailsData?.exactCauseOfDeath || posChangeinPlanObj?.exactCauseOfDeath,
//     exactCauseOfIllness: claimDetailsData?.exactCauseOfIllness || posChangeinPlanObj?.exactCauseOfIllness,
//     DateofDeath: claimDetailsData?.DateofDeath || posChangeinPlanObj?.DateofDeath,
//     DateofEvent: claimDetailsData?.DateofEvent || posChangeinPlanObj?.DateofEvent,
//   policyStatusOnDateOfDeath: claimDetailsData?.policyStatusOnDateOfDeath || POSContactData?.policyStatusOnDateOfDeath,
//   policyStatusOnDateOfDeathText: claimDetailsData?.policyStatusOnDateOfDeathText || "",
//   NatureofDeathText: claimDetailsData?.NatureofDeathText || "",
//   policyStatusOnDateOfDeathText: claimDetailsData?.policyStatusOnDateOfDeathText || "",
//     claimsApplicable: claimDetailsData?.claimsApplicable || POSContactData?.claimsApplicable
// });

form.setFieldsValue({
  // Use flatObj for fields from tagName/tagValue array
  ...flatObj,
  // Overwrite/add these fields as needed
  claimCategory: claimCategory,
  custRole: flatObj['custRole'] ? parseInt(flatObj['custRole'], 10) : null,
  policyType: claimDetailsData?.policyType || details?.policyDetailsObj?.planAndStatus?.customerType,
  claimType: claimDetailsData?.claimType || flatObj?.['claimType'] || null,
  typeofcondition: claimDetailsData?.typeofcondition || flatObj['typeofcondition'] || null,
  NatureofDeath: claimDetailsData?.NatureofDeath || (flatObj['natureofDeathID'] ? parseInt(flatObj['natureofDeathID']) : null),
  exactCauseOfDeath: claimDetailsData?.exactCauseOfDeath || flatObj['exactCauseOfDeath'],
  exactCauseOfIllness: claimDetailsData?.exactCauseOfIllness || flatObj['exactCauseOfIllness'],
  DateofDeath: claimDetailsData?.DateofDeath || formatDate(flatObj['dateofDeath']),
  DateofEvent: claimDetailsData?.DateofEvent || flatObj['dateofEvent'],
  policyStatusOnDateOfDeath: claimDetailsData?.policyStatusOnDateOfDeath || flatObj['policyStatusOnDateOfDeath'] || POSContactData?.policyStatusOnDateOfDeath,
  policyStatusOnDateOfDeathText: claimDetailsData?.policyStatusOnDateOfDeathText || flatObj['policyStatusOnDateOfDeathText'] || "",
 // NatureofDeathText: claimDetailsData?.NatureofDeathText || flatObj['NatureofDeathText'] || "",
  claimsApplicable: claimDetailsData?.claimsApplicable || flatObj['claimsApplicable'] || POSContactData?.claimsApplicable
});

const Defaultvalue=form.getFieldsValue()?.claimType
if(Defaultvalue !==null){
  const defaultObj = {name: 'claimType'};
  handleDropdownChange(Defaultvalue,defaultObj);
}
        GetClaimsPrimaryAssessmentEnquiry();
  }
  else if(customerData?.isClaimsNotification && activeTabKey ==="2"){debugger

     const Claimdetails2  = POSContactData?.claimsDetails;
    
    posChangeinPlanObj = Claimdetails2;

    // POSContactData?.serviceRequestTransectionData?.forEach(element => {
    //   posChangeinPlanObj[element.tagName] = element.tagValue
    // });
const flatObj = {};
if (Array.isArray(posChangeinPlanObj)) {
  posChangeinPlanObj.forEach(item => {
    flatObj[item.tagName] = item.tagValue;
  });
} else if (typeof posChangeinPlanObj === 'object' && posChangeinPlanObj !== null) {
  Object.assign(flatObj, posChangeinPlanObj);
}

    // intimationForm.setFieldsValue({
    //   SourceofIntimation: intimationData?.SourceofIntimation ?  intimationData?.SourceofIntimation : (posChangeinPlanObj?.SourceofIntimation ? parseInt(posChangeinPlanObj?.SourceofIntimation) : null),
    //   srvReqID: posChangeinPlanObj?.srvReqRefNo,
    //   ClaimIntimatedBy:  intimationData?.ClaimIntimatedBy || posChangeinPlanObj?.ClaimIntimatedBy || null,
    //   PersonRelationshipwithLA: intimationData?.PersonRelationshipwithLA || posChangeinPlanObj?.PersonRelationshipwithLA,
    //   NameofiIntimatingPerson: intimationData?.NameofiIntimatingPerson || posChangeinPlanObj?.NameofiIntimatingPerson,
    //   PersonsRelationship: intimationData?.PersonsRelationship || posChangeinPlanObj?.PersonsRelationship,
    //   IntimatingMobileNumber: intimationData?.IntimatingMobileNumber || posChangeinPlanObj?.IntimatingMobileNumber,
    //   RequestTime: intimationData?.RequestTime || posChangeinPlanObj?.RequestTime,
    //   ReasonForLateIntimation: intimationData?.ReasonForLateIntimation || posChangeinPlanObj?.ReasonForLateIntimation,
    //   TicketLoggedBy: loginInfo?.userProfileInfo?.profileObj?.name,
    //   ClaimReceivedOn: intimationData?.ClaimReceivedOn,
    //   ClaimIntimatedOn: intimationData?.ClaimIntimatedOn || posChangeinPlanObj?.DateofIntimation,
    //   //IntimatingPersonRemarks: posChangeinPlanObj?.Remarks,
    // });

    intimationForm.setFieldsValue({
  SourceofIntimation: intimationData?.SourceofIntimation ? intimationData?.SourceofIntimation : (flatObj['sourceofIntimationID'] ? parseInt(flatObj['sourceofIntimationID']) : null),
  srvReqID: flatObj['srvReqRefNo'] || '',
  ClaimIntimatedBy: intimationData?.ClaimIntimatedBy || flatObj['claimIntimatedBy'] || null,
  PersonRelationshipwithLA: intimationData?.PersonRelationshipwithLA || flatObj['personRelationshipwithLA'],
  NameofiIntimatingPerson: intimationData?.NameofiIntimatingPerson || flatObj['nameofiIntimatingPerson'],
  PersonsRelationship: intimationData?.PersonsRelationship || flatObj['personsRelationship'],
  IntimatingMobileNumber: intimationData?.IntimatingMobileNumber || flatObj['intimatingMobileNumber'],
  RequestTime: intimationData?.RequestTime || flatObj['requestTime'],
  ReasonForLateIntimation: intimationData?.ReasonForLateIntimation || flatObj['reasonForLateIntimation'],
  TicketLoggedBy: loginInfo?.userProfileInfo?.profileObj?.name,
  ClaimReceivedOn: intimationData?.ClaimReceivedOn,
  ClaimIntimatedOn: intimationData?.ClaimIntimatedOn || formatDate(flatObj['dateOfIntimation']),
  //NatureofDeathText: intimationData?.NatureofDeathText || flatObj['natureofDeathText'] || "",
  // Add other fields as needed, always use correct casing
});
    ClaimsData[selectedSubType]?.Intimation_Details?.forEach(element => {
      if(element?.name === "NameofiIntimatingPerson"&&posChangeinPlanObj?.ClaimIntimatedBy === "nominee"){
        element.hide= true;
        setIsReRenderForm(!isRerenderForm)
      }
      else if(showIntRequestTime && element?.name === "RequestTime"){
        element.hide= false;
      }
      else if(element?.name === "NameofiIntimatingPerson"&&posChangeinPlanObj?.ClaimIntimatedBy !== "nominee"){
          element.hide= false;
          setIsReRenderForm(!isRerenderForm)
        }
       else if(element?.name === "RequestTime" && details?.policyDetailsObj?.planAndStatus?.productType === 'UL'){
              element.hide = false;
              setIsReRenderForm(!isRerenderForm)
          }
    });

}
else if (customerData?.isClaimsNotification && activeTabKey === "4") {debugger;
    getNomineeEnquiry();
    getRelationsData();
    // POSContactData?.serviceRequestTransectionData?.forEach(element => {
    //     posChangeinPlanObj[element.tagName] = element.tagValue
    //   });
    const Claimdetails3  = POSContactData?.claimsDetails;
    
    posChangeinPlanObj = Claimdetails3;

      setIsBeneficiaryChangeRequired(posChangeinPlanObj?.isBeneficiaryChangeRequired ===true);
    const tagPatternNew = /_(New_\d+)$/;
    const newFields = ["New"];  
    const consolidatedNewData = POSContactData?.nomineeDetails;
    const mappedNomineeData = (consolidatedNewData || []).map(item => {
      const NomineeDoB = item.dateOfBirth? dayjs(item.dateOfBirth).format("DD/MM/YYYY"): null;

      return{
      id: item.id,
      FullName: `${item.firstName || ""} ${item.lastName || ""}`.trim(),
      NomineeFirstName: item.firstName || "",
      NomineeFirstName_New: item.firstName || "",
      NomineeLastName: item.lastName || "",
      NomineeLastName_New: item.lastName || "",
      NomineeDOB: NomineeDoB,
      IsMinor: item.dateOfBirth? getAge(new Date(item.dateOfBirth)) < 18 : false,
      NomineeDOB_New: item.dateOfBirth ? dayjs(item.dateOfBirth).format("DD/MM/YYYY") : null,
      Role: item.role || "nominee",
      Role_New: item.role || "nominee",
      RealtionshipWithPolicyowner: item.relationship || "",
      RealtionshipWithPolicyowner_New: item.relationship || "",
      Share: item.share || "",
      Share_New: item.share || "",
      
      // Bank details (flatten from consolidated data)
      NomineePANNumber: item.panCard || "",
      NameonPAN: item.nameOnPan || "",
      PANValidationResult: item.panValidationResult || "",
      address_1: item.address_1 || "",
      address_2: item.address_2 || "",
      city: item.city || "",
      state: item.state || "",
      pincode: item.pincode || "",
      NomineeMobile: item.mobileNo || "",
      NomineeEmail: item.emailId || "",
      
      // Bank details
      IFSC: item.ifsc || "",
      BankName: item.bankName || "",
      BranchName: item.branchName || "",
      AccountNumber: item.accountNo || "",
      ReAccountNumber: item.reAccountNo || "",
      AccountHolderName: item.accountHolderName || "",
      InitiatePennyDrop: item.pennyDrop || "",
      NameasperPennyDrop: item.pennyDropName || "",
      NameMatch: item.nameMatch || ""
      };
    });

    setPosUpdateNomineeData(prev => {
  return [
    ...prev,
    ...mappedNomineeData.filter(
      newItem =>
        !prev.some(
          prevItem =>
            `${prevItem.firstName} ${prevItem.lastName}`.toLowerCase() ===
            `${newItem.firstName} ${newItem.lastName}`.toLowerCase()
        )
    )
  ];
});

    nomineeform.setFieldsValue({
   beneficiaryDetailsData: (mappedNomineeData || []).map(item => {
    const NomineeDoB = item.dateOfBirth? dayjs(item.dateOfBirth).format("DD/MM/YYYY"): null;

    return{
       NomineePANNumber: item.NomineePANNumber || "",
       NameonPAN: item.NameonPAN || "",
       PANValidationResult: item.PANValidationResult || "",
       address_1: item.address_1 || "",
       address_2: item.address_2 || "",
       city: item.city || "",
       state: item.state || "",
       pincode: item.pincode || "",
       NomineeMobile: item.NomineeMobile || "",
       NomineeEmail: item.NomineeEmail || "",
       IsMinor: item.dateOfBirth? getAge(new Date(item.dateOfBirth)) < 18 : false,
     };
    })
   });

    console.log("Mapped Nominee Data:", mappedNomineeData);
    // processData(
      
    //   'Create',
    //   tagPatternNew,
    //   newFields
    // );
    //setPosUpdateNomineeData(consolidatedNewData);
    // const tagPatternPersonal = /_(\d+)$/;
    // const personalFields = ["NomineePANNumber", "NameonPAN", "PANValidationResult", "NomineeMobile", "address", "NomineeEmail"];
    // const personlBeneficiaryNewData = processData(
    //   POSContactData?.serviceRequestTransectionData,
    //   'Create',
    //   tagPatternPersonal,
    //   personalFields
    // );
    const personlBeneficiaryNewData = POSContactData?.nomineeDetails;
    const mappedNominee = (consolidatedNewData || []).map(item => {
      const NomineeDoB = item.dateOfBirth? dayjs(item.dateOfBirth).format("DD/MM/YYYY"): null;

      return{
      id: item.id,
      FullName: `${item.firstName || ""} ${item.lastName || ""}`.trim(),
      NomineeFirstName: item.firstName || "",
      NomineeFirstName_New: item.firstName || "",
      NomineeLastName: item.lastName || "",
      NomineeLastName_New: item.lastName || "",
      NomineeDOB: NomineeDoB,
      IsMinor: item.dateOfBirth? getAge(new Date(item.dateOfBirth)) < 18 : false,
      NomineeDOB_New: item.dateOfBirth || null,
      Role: item.role || "nominee",
      Role_New: item.role || "nominee",
      RealtionshipWithPolicyowner: item.relationship || "",
      RealtionshipWithPolicyowner_New: item.relationship || "",
      Share: item.share || "",
      Share_New: item.share || "",
      
      // Bank details (flatten from consolidated data)
      NomineePANNumber: item.panCard || "",
      NameonPAN: item.nameOnPan || "",
      PANValidationResult: item.panValidationResult || "",
      address_1: item.address_1 || "",
      address_2: item.address_2 || "",
      city: item.city || "",
      state: item.state || "",
      pincode: item.pincode || "",
      NomineeMobile: item.mobileNo || "",
      NomineeEmail: item.emailId || "",
      
      // Bank details
      IFSC: item.ifsc || "",
      BankName: item.bankName || "",
      BranchName: item.branchName || "",
      AccountNumber: item.accountNo || "",
      ReAccountNumber: item.reAccountNo || "",
      AccountHolderName: item.accountHolderName || "",
      InitiatePennyDrop: item.pennyDrop || "",
      NameasperPennyDrop: item.pennyDropName || "",
      NameMatch: item.nameMatch || ""
      }
    });
  
    //setBeneficiaryDetailsData(mappedNominee);
    setBeneficiaryDetailsData(prev => [
    ...prev,
    ...mappedNomineeData.filter(
      newItem =>
        !prev.some(
          prevItem =>
            `${prevItem.firstName} ${prevItem.lastName}`.toLowerCase() ===
            `${newItem.firstName} ${newItem.lastName}`.toLowerCase()
        )
    )
  ]);
  }
else if(customerData?.isClaimsNotification && activeTabKey ==="5"){
debugger;
  const Claimdetails5  = POSContactData?.claimsDetails;
  posChangeinPlanObj = Claimdetails5;
  if(POSContactData?.deDupPayload?.length > 0){
    for (let index in POSContactData?.deDupPayload){
     if(POSContactData?.deDupPayload[index]?.type ==='BANK') {
       setBankDeDupeData(POSContactData?.deDupPayload[index]?.deDupPayload);
     }
    }
   }
   const beneficiaryNewData = POSContactData?.nomineeDetails;
   const mappedBankData = (beneficiaryNewData || []).map(item => {
    const NomineeDoB = item.dateOfBirth? dayjs(item.dateOfBirth).format("DD/MM/YYYY"): null;

    return{
      id: item.id,
      IFSC: item.ifsc || "",
      BankName: item.bankName || "",
      BranchName: item.branchName || "",
      AccountNumber: item.accountNo || "",
      ReAccountNumber: item.reAccountNo || "",
      AccountHolderName: item.accountHolderName || "",
      InitiatePennyDrop: item.pennyDrop || "",
      NameasperPennyDrop: item.pennyDropName || "",
      NameMatch: item.nameMatch || "",
      NomineePANNumber: item.panCard || "",
      FullName: `${item.firstName || ""} ${item.lastName || ""}`.trim(),
      IsMinor: item.dateOfBirth? getAge(new Date(item.dateOfBirth)) < 18 : false,
   }
    });
    setBeneficiaryBankData(prev => [
      ...prev,
      ...mappedBankData.filter(
        newItem =>
          !prev.some(prevItem => prevItem.NomineePANNumber === newItem.NomineePANNumber)
      )
    ]);

    const mappedNominee = (beneficiaryNewData || []).map(item => {
          const NomineeDoB = item.dateOfBirth? dayjs(item.dateOfBirth).format("DD/MM/YYYY"): null;
    
          return{
          id: item.id,
          FullName: `${item.firstName || ""} ${item.lastName || ""}`.trim(),
          NomineeFirstName: item.firstName || "",
          NomineeFirstName_New: item.firstName || "",
          NomineeLastName: item.lastName || "",
          NomineeLastName_New: item.lastName || "",
          NomineeDOB: NomineeDoB,
          NomineeDOB_New: item.dateOfBirth || null,
          IsMinor: item.dateOfBirth? getAge(new Date(item.dateOfBirth)) < 18 : false,
          Role: item.role || "nominee",
          Role_New: item.role || "nominee",
          RealtionshipWithPolicyowner: item.relationship || "",
          RealtionshipWithPolicyowner_New: item.relationship || "",
          Share: item.share || "",
          Share_New: item.share || "",
          
          // Bank details (flatten from consolidated data)
          NomineePANNumber: item.panCard || "",
          NameonPAN: item.nameOnPan || "",
          PANValidationResult: item.panValidationResult || "",
          address_1: item.address_1 || "",
          address_2: item.address_2 || "",
          city: item.city || "",
          state: item.state || "",
          pincode: item.pincode || "",
          NomineeMobile: item.mobileNo || "",
          NomineeEmail: item.emailId || "",
          
          // Bank details
          IFSC: item.ifsc || "",
          BankName: item.bankName || "",
          BranchName: item.branchName || "",
          AccountNumber: item.accountNo || "",
          ReAccountNumber: item.reAccountNo || "",
          AccountHolderName: item.accountHolderName || "",
          InitiatePennyDrop: item.pennyDrop || "",
          NameasperPennyDrop: item.pennyDropName || "",
          NameMatch: item.nameMatch || ""
          }
        });
      
        setBeneficiaryDetailsData(prev => [
        ...prev,
        ...mappedNominee.filter(
          newItem =>
            !prev.some(
              prevItem =>
                `${prevItem.firstName} ${prevItem.lastName}`.toLowerCase() ===
                `${newItem.firstName} ${newItem.lastName}`.toLowerCase()
            )
          )
        ]);

    // const tagPatternPersonal = /_(\d+)$/;
    // const personalFields = ["IFSC","BankName","BranchName","AccountNumber","ReAccountNumber","AccountHolderName","InitiatePennyDrop","NameasperPennyDrop","NameMatch"];
    // const beneficiaryNewData = processData(
    //   POSContactData?.serviceRequestTransectionData,
    //   'Create',
    //   tagPatternPersonal,
    //   personalFields
    // );
    // setBeneficiaryBankData(beneficiaryNewData);
}
},[activeTabKey])

const processData = (data, statusFilter, tagPattern, fieldNames) => {
    const filteredData = data?.filter(item => 
      item.status === statusFilter && fieldNames.some(field => item.tagName?.includes(field))
    );
  
    const processedData = filteredData?.reduce((acc, item) => {
      const match = item.tagName?.match(tagPattern);
      if (match) {
        const index = match[1];
        const fieldName = item.tagName.replace(`_${index}`, '');
        const currentIndex = acc.findIndex((el) => el.index === index);
  
        if (currentIndex === -1) {
          acc.push({ index, [fieldName]: item.tagValue });
        } else {
          acc[currentIndex][fieldName] = item.tagValue;
        }
      }
      return acc;
    }, []);
  
    return processedData;
  };

const getNomineeEnquiry = async () => {
  setIsLoading(true);
  setShowAlert(false);
  try {
    const response = await apiCalls.getNomineeEnquiry(customerData?.policyNo, loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID);
    if (response?.data?.responseBody?.errorcode==0 && response?.data?.responseBody?.nomineeEnquiry) {
      const res = response?.data?.responseBody;
      const nomineeArray = [];
      if (res?.nomineeEnquiry?.length > 0) {
        for (const val of res?.nomineeEnquiry) {
          if (val) {
              const dob = await getClientEnquiry(val.bnysel);
              const fullName = val.clientName;
              let firstName = '', lastName = '';
              if (typeof fullName === 'string' && fullName.includes(',')) {
                [firstName, lastName] = fullName.split(',').map(name => name.trim());
              }
              const relationShip = await getRelationsData(val);
              const nomineeObj = {
                NomineeFirstName_Old: firstName ,
                NomineeLastName_Old:  lastName,
                NomineeDOB_Old: dob,
                RealtionshipWithPolicyowner_Old: relationShip,
                Share_Old: val?.bnypc,
                Role_Old: val?.bnyrln === "AP" ? "Appointee" : "Nominee"
              };
              nomineeArray.push(nomineeObj);
          }
        }
        setExistingNomineeData(nomineeArray);
      }
      setIsLoading(false);
    } else {
        setIsLoading(false);
      message.error({
        content:
          response?.data?.responseBody?.errormessage ||
          "Something went wrong, please try again!",
        className: "custom-msg",
        duration: 2,
      });
    setIsLoading(false);
    }
  } catch (error) {
    setIsLoading(false);
  }
};

const getRelationsData = async (val) =>{
  setIsLoading(true);
  try {
    const response = await apiCalls.getRelationsData();
    if (response?.data) {debugger;
      const res = response?.data;
        let transformedData = res?.map((item) => ({
         ...item,
         label: item.longdesc,
         value: item.descitem
       }));
       setRelationShipLU(transformedData);
       setIsLoading(false);
        let matchingItem = res?.find((item) => item?.descitem === val?.bnyrln);
        let relationValue = matchingItem ? matchingItem.longdesc : null;
        return relationValue;
    } else {
      setIsLoading(false);
      message.error({
        content:
          response?.data?.responseBody?.errormessage ||
          "Something went wrong, please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  } catch (error) {
    setIsLoading(false);
  }
};
const getClientEnquiry = async (clientNo) => {
  let obj ={
    clientNumber: clientNo
  }
  try {
    const response = await apiCalls.getClientEnquiry(obj,loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID);
    if (response?.data) {
      const res = response?.data?.responseBody;
      return res?.clTdob ? convertDate(res.clTdob) : res?.clTdob;
    } else {
      message.error({
        content:
          response?.data?.responseBody?.errormessage ||
          "Something went wrong, please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  } catch (error) {
  }
};
 
  const convertDate = (inputDate) => {
    if (inputDate) {
      const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
      return formattedDate;
    } else {
      return ''
    }

  };
  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day"); // Can not select days before today and today
  };
  const featuredatedisabled = (current) => {
    return current && current < dayjs().startOf("day");
};

const handleDateChange = (date, item) => {
  if(item?.toLowerCase() === "dateofdeath"){
    setDateOfDeath(date);
  }
  else if(item?.toLowerCase() === "dateofintimation"){
    if (date && dateOfDeath) {
      const intimationDate = new Date(date);
      const deathDate = new Date(dateOfDeath);

      const differenceInMonths = (intimationDate.getFullYear() - deathDate.getFullYear()) * 12 + intimationDate.getMonth() - deathDate.getMonth();

         ClaimsData[selectedSubType]?.ClaimsRequest_Details?.forEach(element => {
      if (element?.label?.includes("Reason for Late Intimation(If any)")) {
        element.hide = differenceInMonths > 6 ? false : true;
        setUpdateFields(!updateFields);
      }
    });
  }
  }
};

const handleStatusAliveChange = (index, value) => {debugger;
  setIsLoading(true);
  const beneficiaryList = [];
  const updated = [...statusAliveValues];
  updated[index] = value;
  setStatusAliveValues(updated);

  // If any nominee is marked as "No", show beneficiary change section
  const anyNo = updated.some((val) => val === false);
  setIsBeneficiaryChangeRequired(anyNo);
setBeneficiaryDetails(prev =>
    (prev || []).map((row, idx) => {
      // update only rows that are OLD and match the clicked row index
      if (idx === index && row?.Status === "Old") {
        return { ...row, IsAlive: !!value }; // set boolean
      }
      return row;
    })
  );
setIsLoading(false);
console.log("beneficiaryDetails before IsAlive change",beneficiaryDetails);


if(anyNo===false){
  
    setUpdateNomineeData([]);
    setBeneficiaryDetails((prev) => (prev || []).filter((r) => !(r.Status === "New")));
  //setUpdateNomineeData((prev) => prev.filter((r) => r.Status == "New"));
  //setBeneficiaryDetails((prev) => prev.filter((r) => r.Status == "New"));
  console.log("beneficiaryDetails after IsAlive change",beneficiaryDetails);
}
};

const handleAddNominee = () => {
  setPosUpdateNomineeData((prev) => [
    ...prev,
    {
      id: prev.length + 1,
      NomineeFirstName_New: "",
      NomineeLastName_New: "",
      NomineeDOB_New: null,
      Role_New: "nominee",
      RealtionshipWithPolicyowner_New: "",
      Share_New: "",
    },
  ]);
};
const handleAddRow = (fullName, isMinor, role) => {
    const newId = beneficiaryDetailsData?.length + 1;
    const newRow = { id: newId, NomineePANNumber:"", PANValidationResult: "", NomineeMobile: null, NameonPAN: null, address_1: null, address_2: null, city: null, state: null, pincode: null, NomineeEmail: "", FullName: fullName, IsMinor: isMinor, Role: role };
    setBeneficiaryDetailsData([...beneficiaryDetailsData, newRow]);
};
const handleAddRow2 = (isMinor) => {
    const newId = beneficiaryBankData?.length + 1;
    const newRow = { id: newId, IFSC: '', BankName: '', BranchName: '', AccountNumber: '', ReAccountNumber: '', AccountHolderName: '',InitiatePennyDrop: "",NameasperPennyDrop:"",NameMatch: "", NomineePANNumber: "", IsMinor: isMinor };
    setBeneficiaryBankData([...beneficiaryBankData, newRow]);
};
const handleDeleteRow2 = () => {
  if (beneficiaryBankData?.length > 1) {
    setBeneficiaryBankData(beneficiaryBankData?.slice(0, -1));
  }
};
const handleDeleteRow = () => {
  if (beneficiaryDetailsData?.length > 1) {
    setBeneficiaryDetailsData(beneficiaryDetailsData?.slice(0, -1));
  }
};

// delete nominee row
const handleDeleteNominee = (id, role, firstName) => {debugger;
  if(role === "appointee"){
    setUpdateNomineeData((prev) => (prev || []).filter((r) => !(r.id === id)));
    setPosUpdateNomineeData((prev) => (prev || []).filter((r) => !(r.id === id)));
    //deleteConsolidatedBeneficiary(id); // Use consolidated delete
    setBeneficiaryDetails((prev) => (prev || []).filter((r) => !(r.id === id && r.Status === "New")));
  }
  else
  {
    console.log("Deletingid:", updateNomineeData);
    console.log("Deleting:", beneficiaryDetails);
    // remove only the specific "New" nominee record with matching id
    setUpdateNomineeData((prev) => (prev || []).filter((r) => !(r.id === id)));
    setPosUpdateNomineeData((prev) => (prev || []).filter((r) => !(r.id === id)));
    //deleteConsolidatedBeneficiary(id); // Use consolidated delete
    setBeneficiaryDetails((prev) => (prev || []).filter((r) => !(r.id === id && r.Status === "New")));
    

    console.log("Deletingid1:", updateNomineeData);
    console.log("Deleting1:", beneficiaryDetails);
  }
  handleDeleteRow2();
  handleDeleteRow();

};

const existingNominee=() => {debugger;
  const beneficiaryList = [];
  if(existingNomineeData?.length !== 0)
  {
     existingNomineeData?.forEach((row, index) => {
    const fullName = `${row.NomineeFirstName_Old || ''} ${row.NomineeLastName_Old || ''}`.trim();

    // Check if nominee is minor (age < 18)
    const isMinor = row.NomineeDOB_Old
      ? getAge(new Date(row.NomineeDOB_Old)) < 18
      : false;

    beneficiaryList.push({
      id: index + 1,
      FullName: fullName,
      FirstName: row.NomineeFirstName_Old,
      LastName: row.NomineeLastName_Old,
      DOB: row.NomineeDOB_Old,
      Role: row.Role_Old,
      Relationship: row.RealtionshipWithPolicyowner_Old,
      Share: row.Share_Old,
      IsAlive: true,
      Status: "Old",
      IsMinor: isMinor,

      NomineePANNumber: '',
      NameonPAN: '',
      PANValidationResult: '',
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      pincode: '',
      NomineeMobile: '',
      NomineeEmail: '',
      
      // --- Bank Details ---
      IFSC: '',
      BankName: '',
      BranchName: '',
      AccountNumber: '',
      ReAccountNumber: '',
      AccountHolderName: '',
      InitiatePennyDrop: '',
      NameasperPennyDrop: '',
      NameMatch: ''
    });
  });
  setBeneficiaryDetails(beneficiaryList);
  setUpdateExistingNomineeData(beneficiaryList);
  setIsBeneficiaryChangeRequired(false);
  }
  else
  {
    handleAddNominee();
    setIsBeneficiaryChangeRequired(true);
  }
  
  console.log("beneficiaryList",beneficiaryList);
  console.log("existing nominee",beneficiaryDetails);

}

const totalNominee = (row) => {
  setIsLoading(true);

  if (!row || row === "") {
    setIsLoading(false);
    return;
  }

  const fullName = `${row.NomineeFirstName_New || ''} ${row.NomineeLastName_New || ''}`.trim();
  const isMinor = row.NomineeDOB_New ? getAge(row.NomineeDOB_New) < 18 : false;

  // -------------------------
  // 1️⃣ CHECK DUPLICATE NOMINEE
  // -------------------------
  const nomineeExists = beneficiaryDetails?.some((n) =>
    (n.FirstName || "").toLowerCase() === (row.NomineeFirstName_New || "").toLowerCase() &&
    (n.LastName || "").toLowerCase() === (row.NomineeLastName_New || "").toLowerCase() &&
    n.DOB === row.NomineeDOB_New
  );

  if (nomineeExists) {
    setIsLoading(false);
    return message.error("Nominee already added!");
  }

  // --------------------------------
  // 2️⃣ ALLOW ONLY ONE APPOINTEE CHECK
  // --------------------------------
  if (row.Role_New === "appointee") {
    const appointeeExists = beneficiaryDetails?.some((n) => n.Role === "Appointee");

    if (appointeeExists) {
      setIsLoading(false);
      return message.error("Only one appointee is allowed.");
    }
  }

  // -------------------------
  // 3️⃣ CREATE NEW BENEFICIARY
  // -------------------------
  const newBeneficiary = {
    id: row.id,
    FullName: fullName,
    FirstName: row.NomineeFirstName_New,
    LastName: row.NomineeLastName_New,
    DOB: row.NomineeDOB_New,
    Role: row.Role_New,
    Relationship: row.RealtionshipWithPolicyowner_New,
    Share: row.Share_New,
    Status: "New",
    IsMinor: isMinor,
    IsAlive: true,

    NomineePANNumber: '',
    NameonPAN: '',
    PANValidationResult: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    pincode: '',
    NomineeMobile: '',
    NomineeEmail: '',

    IFSC: '',
    BankName: '',
    BranchName: '',
    AccountNumber: '',
    ReAccountNumber: '',
    AccountHolderName: '',
    InitiatePennyDrop: '',
    NameasperPennyDrop: '',
    NameMatch: ''
  };

  // Add to consolidated list
  //addConsolidatedBeneficiary(newBeneficiary);

  // Add to beneficiary list
  setBeneficiaryDetails((prev) => [...(prev || []), newBeneficiary]);
  setBeneficiaryDetailsData((prev) => [...(prev || []), newBeneficiary]);

  // Add the blank rows
  handleAddRow(fullName, isMinor, row.Role_New);
  handleAddRow2(isMinor);

  setIsLoading(false);
  message.success("Nominee added successfully!");
};

 const getAge = (dob) => {
  if (!dob) return null;
  const birth = new Date(dob);
  const diff = Date.now() - birth.getTime();
  const ageDt = new Date(diff);
  return Math.abs(ageDt.getUTCFullYear() - 1970);
};

  const handleSubmit = async (values) => {debugger
    setIsLoading(true);
    let deathSumAssuredAmountRef = 0
    if(selectedSubType==="claimsrequest" && ["3"].includes(activeTabKey)){
        //if(activeTabKey==="1") setClaimDetailsData(values);
        return handleClaimDetailsTabSave();
      }

       if(selectedSubType==="claimsrequest" && ["7"].includes(activeTabKey) &&  ["DEATH"].includes(form.getFieldValue().claimType)){
         //if(activeTabKey==="1") setClaimDetailsData(values);
         const result  =   await handleRegisterDeathClaimSave();
         if (!result.success ) {
           setIsLoading(false);
           return; // stop flow
         }

           deathSumAssuredAmountRef = result.deathSumAssuredAmount;

       }

     if (selectedSubType === "claimsrequest" && ["7"].includes(activeTabKey)) {
    const formData = form?.getFieldsValue();

    const isValidClaim =
        values?.RecordIntimation === 'yes' &&
        values?.FlagDeathinLifeAsia === 'yes' &&
        ['WOP', 'TPD', 'CI'].includes(formData?.claimType);

    if (isValidClaim) {
       const policyNumber = details?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo;
       const empID = loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID;
       const selectedPayment = paymentReasonCodeLU.find(
    x => x.mstID === formData?.claimPaymentMethod
);
const clType = selectedPayment?.extrL_KEY;
      const selectedCoverage = coverageNameofProductLU.find(
    x => x.mstID === formData?.coverageNameofProduct
);
const crtable = selectedCoverage?.extrL_KEY;

    const selectedClaimPayment = claimPaymentMethodLU.find(
    x => x.mstID === formData?.claimPaymentMethod
);
const rgpymop = selectedClaimPayment?.extrL_KEY;
const rgpynum = "01"
        const response = await apiCalls.RegularPaymentsRegisterAPI(policyNumber, empID,clType, crtable, rgpymop, rgpynum);
        if (response?.data?.responseBody?.errorcode == 0) {
            return { success: true };
        } else {
            setAlertTitle(response?.data?.responseBody?.errormessage);
            setAlertData(response?.data?.responseBody?.errormessage);
            setShowAlert(true);
            return { success: false };
        }
    }
}

    if (selectedSubType === "claimsrequest" && ["7"].includes(activeTabKey)) {
    const formData = form?.getFieldsValue();
const dateValue = form?.getFieldsValue().DateofEvent;
let formattedDate = '';
if (typeof dateValue === 'string' && dateValue.includes('-')) {
  const [datePart] = dateValue.split('T');
  formattedDate = datePart.replace(/-/g, '');
  //formattedDate = dateValue.split('/').reverse().join('');
}
if(values?.RecordIntimation === 'yes' &&  values?.FlagDeathinLifeAsia === 'yes' && formData?.typeofcondition === 'Minor'){
       const policyNumber = details?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo;
       const empID = loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID;
                   const organType1 = organCategoryCodeLU.find(
    x => x.mstID === formData?.organType
);
const organ = organType1?.extrL_KEY;
      const response =  await apiCalls.HealthMinorClaimRegisterAPI(policyNumber, empID, loginInfo?.userProfileInfo?.profileObj?.role, organ, formattedDate);
      if (response?.data?.responseBody?.errorcode == 0) {
            return { success: true };
        } else {
            setAlertTitle(response?.data?.responseBody?.errormessage);
            setAlertData(response?.data?.responseBody?.errormessage);
            setShowAlert(true);
            return { success: false };
        }
}

if(values?.RecordIntimation === 'yes' &&  values?.FlagDeathinLifeAsia === 'yes' && formData?.typeofcondition === 'Major'){
       const policyNumber = details?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo;
       const empID = loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID;
       const organType1 = organCategoryCodeLU.find(
    x => x.mstID === formData?.organType
);
const organ = organType1?.extrL_KEY;
       const healthClaimType = healthClaimCodeLU.find(
    x => x.mstID === formData?.healthClaimCondition
);

const healthClaimType1 = healthClaimType?.extrL_KEY;
          const response =  await apiCalls.HealthMajorClaimRegisterAPI(policyNumber, empID, loginInfo?.userProfileInfo?.profileObj?.role,organ, formattedDate, healthClaimType1);
      if (response?.data?.responseBody?.errorcode == 0) {
            //return { success: true };
        } else {
            setAlertTitle(response?.data?.responseBody?.errormessage);
            setAlertData(response?.data?.responseBody?.errormessage);
            setShowAlert(true);
            return { success: false };
        }
      
}

if(values?.RecordIntimation === 'yes' &&  values?.FlagDeathinLifeAsia === 'yes' && formData?.typeofcondition === 'Moderate'){
       const policyNumber = details?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo;
       const empID = loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID;

            const organType1 = organCategoryCodeLU.find(
    x => x.mstID === formData?.organType
);
       const healthClaimType1 = healthClaimCodeLU.find(
    x => x.mstID === formData?.healthClaimCondition
);

              const response =  await apiCalls.HealthModerateClaimRegisterAPI(policyNumber, empID, loginInfo?.userProfileInfo?.profileObj?.role, organType1, formattedDate, healthClaimType1);
      if (response?.data?.responseBody?.errorcode == 0) {
            //return { success: true };
        } else {
            setAlertTitle(response?.data?.responseBody?.errormessage);
            setAlertData(response?.data?.responseBody?.errormessage);
            setShowAlert(true);
            return { success: false };
        }
      
}

      
    
}

   // setIsLoading(true);
    const obj = {
      SrvReqID: POSContactData?.srvReqID,
      SrvReqRefNo: POSContactData?.srvReqRefNo,
      CallType: props?.propsData?.selectedCallType, // Required
      SubType: props?.propsData?.selectedSubTypeId, // Required
      RequestSource: loginInfo?.userProfileInfo?.profileObj?.role || 0, // Required
      RequestChannel: loginInfo?.userProfileInfo?.profileObj?.role === 14 ? 13 :  values.requestchannel  || "1", // Required
      Category:  selectedSubType === "claimsrequest" ? 2 : 1,
      ApplicationNo:
        details?.policyDetailsObj?.identifiers?.applicationNo || customerData?.applicationNo,
      DOB: convertDate(customerData?.dob),
      PolicyNo: details?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo, // Required
      CustomerId: customerData?.laClientID,
      CustRole: values?.custRole || "1",
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
      ReasonDelayed: values?.ReasonForDelay || "",
      CustSignDateTime: values?.CustomerSigningDate
        ? new Date(values?.CustomerSigningDate)
        : new Date(),
      "TransactionData": getTransactionData(values, deathSumAssuredAmountRef) || [],
     "Uploads": uploadFiles || [],
      CurrentStatus: '',
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
      // Pass the activeTabKey as part of the payload
      ActiveTabKey: activeTabKey
    }
    if (props?.propsData?.EmailResponse?.IsEmailmanagent) {
      obj.TransactionData.push(
        {
          "Status": "Create",
          "TagName": "EmailResponseId",
          "TagValue": props?.propsData?.EmailResponse?.EmailResponseId
        },
        {
          "Status": "Create",
          "TagName": "CustomerName",
          "TagValue": clientEnquiryData?.lgivname + clientEnquiryData?.lsurname
          },
      )
    }

    try{debugger;
    let val = await apiCalls.genericAPI(obj);
        if (val?.data) {
            setIsLoading(false);
            if(selectedSubType==="claimsrequest" && ["1", "2","4","5","6"].includes(activeTabKey)){
                if(activeTabKey==="1") {
                  setClaimDetailsData(values);
                }
                else if(activeTabKey==="2"){
                  setIntimationData(values);
                }
                message.destroy();
                message.success({
                 content: "Details Saved.",
                 className: "custom-msg",
                 duration: 2,
               });
                return handleClaimDetailsTabSave();
              }
              else {
                if (activeTabKey === "7") {
                  let alertMessage = "";
                  if (values?.RecordIntimation === "yes") {
                    alertMessage = "Claim Registered";
                    if (values?.SendRequirementCommunuication === "yes") {
                      alertMessage += " and Requirements Sent";
                    }
                  } 
                  else if (values?.RecordIntimation === "no" && values?.SendRequirementCommunuication === "yes") {
                    alertMessage = "Requirements Sent";
                  }
                  else if (values?.RecordIntimation === "no" && values?.SendRequirementCommunuication === "no" && values?.FlagDeathinLifeAsia === "no") {
                    setAlertTitle(val?.data?.header);
                    setAlertData(val?.data?.message);
                    setShowAlert(true);
                  }
                  if (alertMessage) {
                    const user = loginInfo?.userProfileInfo?.profileObj;
                    setAlertTitle("");
                    setAlertData(alertMessage);
                    setShowAlert(true);
                    setActiveTabKey("1");
                    user.role = 31;
                    user.roleName = "Claims Notification User";
                    user.boe = true;
                    user.sourceId = 31;
                    dispatch(profileObj(user))
                    setNavigateTo("/claimsnotificationuser")
                  }
                }
                else {
                  setAlertTitle(val?.data?.header);
                  setAlertData(val?.data?.message);
                  setShowAlert(true);
                }
              
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
      }
        catch (err) {
          setIsLoading(false);
          message.error({
            content: err?.message || "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
        } finally {
          setIsLoading(false);
        }
     
  }

  const handleRadioChange = (e, item) => {
    // if(item?.name === "RecordIntimation" && e.target.value === "yes"){
    //   form?.setFieldsValue({
    //     FlagDeathinLifeAsia: "yes"
    //   })
    //   ClaimsData[selectedSubType]?.Record_Intimation?.forEach(element => {
    //     if (element?.name === "FlagDeathinLifeAsia") {
    //         element.disabled= true;
    //         setUpdateFields(!updateFields);
    //     }
    // });
    // }
    // else  if(item?.name === "RecordIntimation" && e.target.value === "no"){
    //   form?.setFieldsValue({
    //     FlagDeathinLifeAsia: ""
    //   })
    //   ClaimsData[selectedSubType]?.Record_Intimation?.forEach(element => {
    //     if (element?.name === "FlagDeathinLifeAsia") {
    //         element.disabled= false;
    //         setUpdateFields(!updateFields);
    //     }
    // });
    // }

  }

  const getUploadFiles = (listOfUploadFiles) => {
    // const PreviouslyFiles = [...uploadFiles, ...listOfUploadFiles]; // Commenting This line bez, adding Duplicate Files Upload like, 1,12,123..
    // if(selectedSubType === 'claimsrequest'){
    //   setUploadFiles(PreviouslyFiles);
    //   return;
    // }
    // else{
      setUploadFiles(listOfUploadFiles);
   // }
  }

  const handleTextLink = (item) => {
    if(item.name ==="LifeAsiaTransactionsAfterDOD"){
        setLifeAsiaTransactionModal(true);
    }
    else if (item?.linkValue?.toLowerCase() === "view") {
        const gConfig= apiCalls.getGenericConfig()
          if(gConfig?.data?.dmsApiUrl){
      const url =  gConfig?.data?.dmsApiUrl + `/omnidocs/WebApiRequestRedirection?Application=BPMPOLENQ&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${details?.policyDetailsObj?.identifiers?.applicationNo}`;
      window.open(url, '_blank');
          }
    }
  }
  const handleDropdownChange = (e, item) => {debugger
    // const handleDropdownChange = (value, option, item) => {debugger
    if (!item || typeof item.name !== 'string') {
      return;
    }
    if (item.name === "claimType") {
      setClaimTypee((prevClaimTypee) => e);
    }
    else if(item.name === "ClaimIntimatedBy") {
      setClaimIntimatedBy((prevClaimTypee) => e);
    }
    else if(item.name?.toLowerCase() === "natureofdeath"){
      setIsAccidentSelection(e);
    }
    else if(item.name?.toLowerCase() === "healthclaimcondition") {
      // Find label from options or fallback to healthClaimCodeLU
      let label = "";
      let optionsArr = item.options && Array.isArray(item.options) ? item.options : healthClaimCodeLU;
      if (optionsArr && Array.isArray(optionsArr)) {
        const found = optionsArr.find(opt => opt.value === e);
        label = found ? found.label : "";
      }
      setClaimDetailsData(prev => ({
        ...prev,
        HealthClaimCondition: e,
        HealthClaimConditionText: label
      }));
      form.setFieldsValue({ HealthClaimConditionText: label });
    }
    else if(item.name?.toLowerCase() === "policystatusondateofdeath") {
      let label = "";
      let optionsArr = item.options && Array.isArray(item.options) ? item.options : policyStatusDOBLU;
      if (optionsArr && Array.isArray(optionsArr)) {
        const found = optionsArr.find(opt => opt.value === e);
        label = found ? found.label : "";
      }
      setClaimDetailsData(prev => ({
        ...prev,
        policyStatusOnDateOfDeath: e,
        policyStatusOnDateOfDeathText: label
      }));
      form.setFieldsValue({ policyStatusOnDateOfDeathText: label });
    }
    else if(item.name === "policyStatusOnDateOfDeath"){
      ClaimsData[selectedSubType]?.Notification_Details?.forEach((element) => {
        if (element?.name === "UploadLifeAsiaScreen") {
          element.hide = false;
          setUpdateFields(!updateFields);
        }
      });
    }
    else if(item.name === "PolicyWasReinstated"){
      ClaimsData[selectedSubType]?.Life_Asia_Transactions?.forEach((element) => {
        if (element?.name === "LatestPolicyreinstatementdate" && e === "yes") {
          element.hide = false;
          setUpdateFields(!updateFields);
        }
        else  if (element?.name === "LatestPolicyreinstatementdate" && e === "no") {
          element.hide = true;
          setUpdateFields(!updateFields);
        }
      });
    }

  };

  const visibilityRules = {
    NameofiIntimatingPerson: (context) => context.claimIntimatedBy !== "nominee",
    NameChangeAffidavit: (context) => context.isPennyDropStatus,
    NomineeDeathCertificate: (context) => context.isBeneficiaryChangeRequired,
    CopyofFirstInformationReport: (context) => context.isAccidentSelection == 3,
    CopyofPostMortemReport: (context) => context.isAccidentSelection === 3,
    NatureofDeath: (context) => context.ClaimTypee !== "CI"&& context.ClaimTypee  !== "TPD" && context.ClaimTypee !=="Health",
    DateofDeath: (context) => context.ClaimTypee !== "CI"&& context.ClaimTypee  !== "TPD"&& context.ClaimTypee !=="Health",
    CauseofEvent: (context) => context.ClaimTypee === "CI" || context.ClaimTypee  === "TPD",
    claimsApplicable: (context) => details?.policyDetailsObj?.planAndStatus?.productUIN === "133N030V02" && details?.policyDetailsObj?.planAndStatus?.planCode === "T07",
    typeofcondition:(context) => context.ClaimTypee === "Health" ,
    DateofEvent: (context) => context.ClaimTypee === "Health" ,
    exactCauseOfIllness:(context) => context.ClaimTypee === "Health" ,
    exactCauseOfDeath:(context) => context.ClaimTypee !== "Health" ,
    HealthClaimCondition:(context) => context.ClaimTypee !== "Health" ,
};

  const renderDetailsForm = (formType) => {
    const formFields = ClaimsData[selectedSubType]?.[formType];
    const formMapping = {
      "2": nomineeform,
      "3": nomineebankform,
      "4": uploadform
    };
    const context = {
        claimIntimatedBy,
        isPennyDropStatus,
        isBeneficiaryChangeRequired,
        isAccidentSelection,
        ClaimTypee,
    };
    return (
      <>
        <Form.Item name="policyStatusOnDateOfDeathText" style={{ display: 'none' }}>
          <Input type="hidden" />
        </Form.Item>
        <DetailsForm
          data={formFields?.map(field => {
            const rule = visibilityRules[field.name];
            if (rule) {
              return { ...field, hide: !rule(context) };
            }
            return field;
          })}
          subType={selectedSubType}
          suffix={!isShowPOSScreen && suffix}
          form={selectedSubType === "claimsrequest" ? formMapping[activeTabKey] || form : form}
          getUploadFiles={getUploadFiles}
          handleTextLink={handleTextLink}
          clientRoleLU={clientRoleLU}
          onBlurInput={onBlurInput}
          handleDropdownChange={handleDropdownChange}
          handleDateChange={handleDateChange}
          featuredatedisabled={featuredatedisabled}
          disabledDate={disabledDate}
          causeOfEventLU={causeOfEventLU}
          natureOfDeathLU={natureOfDeathLU}
          ClaimTypee={ClaimTypee}
          policyTypeLU={policyTypeLU}
          claimCategoryLU={claimCategoryLU}
          claimIntimationLU={claimIntimationLU}
          sourceInformationLU={sourceInformationLU}
          assuredIncomePlanLU={assuredIncomePlanLU}
          handleRadioChange={handleRadioChange}
          policyStatusDOBLU={policyStatusDOBLU}
          coverageNameofProductLU={coverageNameofProductLU}
          claimPaymentMethodLU={claimPaymentMethodLU}
          paymentReasonCodeLU={paymentReasonCodeLU}
          organCategoryCodeLU={organCategoryCodeLU}
          healthClaimCodeLU={healthClaimCodeLU}
          handleRadioLink={handleRadioLink}
        />
      </>
    );
  };


  const  onBlurInput =(value,item)=>{
  }
  const validatePANNumber = (_, value) => {
    if (emailExist) {
      return Promise.reject("PAN number already exists");
    } else if (value && !/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(value?.toUpperCase())) {
      return Promise.reject("Invalid PAN number and must be 10 digits");
    }  else {
      return Promise.resolve();
    }
  };
  const validatePhoneNumber = (_, value) => {
    if (emailExist) {
      return Promise.reject("Mobile number already exists");
    } else if (value && !/^[6-9]\d{9}$/.test(value)) {
      return Promise.reject("Mobile number should start with 6,7,8 or 9 and must be 10 digits");
    } else if (
      value &&
      !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(
        value
      )
    ) {
      return Promise.reject("Invalid mobile number");
    } 
    else {
      return Promise.resolve();
    }
  };
  const handleKeyDown = (pattern, e, type) => {
    const key = e.key;
    let specialCharacterRegex = '';
    if (pattern === 'numbersOnly') {
      const inputValue = e.target.value;
      if (inputValue.includes('.')) {
          specialCharacterRegex = /^[0-9]$/; 
      } else {
          specialCharacterRegex = /^[0-9.]$/;
      }
      
    } else if (pattern === 'charactersOnly') {
        specialCharacterRegex = /^[a-zA-Z0-9]$/;
    } else if (pattern === 'alphabatesOnly') {
        specialCharacterRegex = /^[a-zA-Z]$/;
    } else if (pattern === "decimalOnly") {
        const inputValue = e.target.value;
        if (inputValue.includes('.')) {
            specialCharacterRegex = /^[0-9]$/; 
        } else {
            specialCharacterRegex = /^[0-9.]$/;
        }
    }
    else if (pattern === 'NumbersAlphabetscommaonly') {
             specialCharacterRegex =  /^[a-zA-Z0-9, ]*$/;
  } 
  
    if (key === 'Backspace' || key.startsWith('Arrow')) {
        return;
    }
    if (!specialCharacterRegex.test(key)) {
        e.preventDefault(); 
    }
  };

  const CheckPANdetails = (panNumber,row,index)=>{
    let values = nomineeform.getFieldsValue();
    setIsLoading(true);
    let response = apiCalls.getCheckPANdetails((panNumber || values?.beneficiaryDetailsData[row?.id]?.NomineePANNumber),customerData?.policyNo);
    response
      .then((val) => {
        if (val?.data?.responseBody?.errorcode!=="1") {
          const res = val?.data?.responseBody;
            nomineeform.setFieldsValue({
              beneficiaryDetailsData: {
                  [row?.id]: {
                      NameonPAN: `${res?.firstName || ''} ${res?.middleName || ''} ${res?.lastName || ''}`,
                      PANValidationResult: res?.description,
                  },
              },
          });
          const updatedbeneficiaryData = [...beneficiaryDetailsData];
          updatedbeneficiaryData[index].NameonPAN = `${res?.firstName} ${res?.middleName || ''} ${res?.lastName}`;
          updatedbeneficiaryData[index].PANValidationResult = res?.description;
          setBeneficiaryDetailsData(updatedbeneficiaryData);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          nomineeform.setFieldsValue({
            beneficiaryDetailsData: {
                [row?.id]: {
                    NameonPAN: val?.data?.responseBody?.errormessage,
                    PANValidationResult: val?.data?.responseBody?.errormessage,
                },
            },
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
  }

  const CheckPincodeDetails = (pincode,row,index)=>{
      setIsLoading(true);
      let values = nomineeform.getFieldsValue();
      let response = apiCalls.searchLocation(pincode);
      response
        .then((val) => {
          if (val?.data) {
            const res = val?.data;
              nomineeform.setFieldsValue({
                beneficiaryDetailsData: {
                    [index]: {
                        city: `${res.district}`,
                        state: `${res.stateName}`
                    },
                },
            });
            const updatedbeneficiaryData = [...beneficiaryDetailsData];
            updatedbeneficiaryData[index].city = res?.district;
            updatedbeneficiaryData[index].state = res?.stateName;
            setBeneficiaryDetailsData(updatedbeneficiaryData);
            console.log(beneficiaryDetailsData)
            console.log("Form values after update:", nomineeform.getFieldsValue())
            setIsLoading(false);
          } else {
            setIsLoading(false);
            nomineeform.setFieldsValue({
              beneficiaryDetailsData: {
                  [index]: {
                      city: val?.data?.responseBody?.errormessage,
                      state: val?.data?.responseBody?.errormessage,
                  },
              },
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
    }

  const getTransactionData = (values, deathSumAssuredAmountRef) => {  debugger  
    if (selectedSubType === "claimsrequest" && activeTabKey === "1") {debugger
      setDateOfDeath(values?.DateofDeath);
      const formValues = form.getFieldsValue();
      let newArray = [
        { Status: "Create", TagName: "policyType", TagValue: values?.policyType || ""},
        { Status: "Create", TagName: "claimType", TagValue: values?.claimType || ""},
        { Status: "Create", TagName: "claimCategory", TagValue: values?.claimCategory || ""},
        { Status: "Create", TagName: "custRole", TagValue: values?.custRole || ""},
        { Status: "Create", TagName: "NatureofDeath", TagValue: values?.NatureofDeath || ""},
        { Status: "Create", TagName: "exactCauseOfDeath", TagValue: values?.exactCauseOfDeath || ""},
        { Status: "Create", TagName: "exactCauseOfIllness", TagValue: values?.exactCauseOfIllness || ""},
        { Status: "Create", TagName: "DateofDeath", TagValue: values?.DateofDeath || ""},
        { Status: "Create", TagName: "DateofEvent", TagValue: values?.DateofEvent || ""},
        { Status: "Create", TagName: "policyStatusOnDateOfDeath", TagValue:  values?.policyStatusOnDateOfDeath || ""},
        { Status: "Create", TagName: "policyStatusOnDateOfDeathText", TagValue:  values?.policyStatusOnDateOfDeathText || ""},
        { Status: "Create", TagName: "claimsApplicable", TagValue: values?.claimsApplicable || ""},
        { Status: "Create", TagName: "PaymentReasonCode", TagValue: values?.paymentReasonCode || ""},
        { Status: "Create", TagName: "CoverageNameofProduct", TagValue: values?.coverageNameofProduct || ""},
        { Status: "Create", TagName: "OrganType", TagValue: values?.organType || ""},
        { Status: "Create", TagName: "HealthClaimCondition", TagValue: values?.healthClaimCondition || ""},
        { Status: "Create", TagName: "HealthClaimConditionText", TagValue: values?.HealthClaimConditionText || values?.healthClaimConditionText || ""},
        { Status: "Create", TagName: "ClaimRegisteredBy", TagValue: loginInfo?.userProfileInfo?.profileObj?.userName},
        { Status: "Create", TagName: "ClaimRegisteredOn", TagValue: ""},
      ]
      const properties = [
        "longdesc",
        "sumins",
        "LastReinstatementDate",
        "StatusonDateofDeath",
        "id"
      ];
      let updatedDataList = [];
      isRiderData?.forEach((record, recordIndex) => {
        properties.forEach((property, propertyIndex) => {
          if (record[property] || record[property] === 0) {
            let obj = {
              Status: "Create",
              TagName: `${property}_${recordIndex + 1}`,
              //TagValue: property?.includes("LastReinstatementDate") ? moment(record[property] + 1).format("DD/MM/YYYY") : record[property]
              TagValue: property.includes("LastReinstatementDate")? moment(record[property], "DD/MM/YYYY").format("DD/MM/YYYY"): record[property] || "",
            };
            updatedDataList.push(obj);
          }
        });
      });
      updatedDataList = [...updatedDataList, ...newArray];
      return updatedDataList;
    }
    if (selectedSubType === "claimsrequest" && activeTabKey === "2") {
      intimationForm.setFieldsValue({
        RequestTime: values?.RequestTime,
      })
        return [
          { Status: "Create", TagName: "SourceofIntimation", TagValue: values?.SourceofIntimation || ""},
          { Status: "Create", TagName: "ClaimIntimatedBy", TagValue: values?.ClaimIntimatedBy || ""},
          { Status: "Create", TagName: "PersonRelationshipwithLA", TagValue: values?.PersonRelationshipwithLA || ""},
          { Status: "Create", TagName: "NameofiIntimatingPerson", TagValue: values?.NameofiIntimatingPerson || ""},
          { Status: "Create", TagName: "PersonsRelationship", TagValue: values?.PersonsRelationship || ""},
          { Status: "Create", TagName: "IntimatingMobileNumber", TagValue: values?.IntimatingMobileNumber || ""},
          { Status: "Create", TagName: "RequestTime", TagValue: values?.RequestTime || ""},
          { Status: "Create", TagName: "ReasonForLateIntimation", TagValue: values?.ReasonForLateIntimation || ""},
          { Status: "Create", TagName: "TicketLoggedBy", TagValue: values?.TicketLoggedBy || ""},
          { Status: "Create", TagName: "ClaimReceivedOn", TagValue: values?.ClaimReceivedOn ? moment(values?.ClaimReceivedOn + 1).format("DD/MM/YYYY") : ""},
          { Status: "Create", TagName: "ClaimIntimatedOn", TagValue: values?.ClaimIntimatedOn || ""},
          { Status: "Create", TagName: "IntimatingPersonRemarks", TagValue: values?.IntimatingPersonRemarks || ""},
        ]
      }
      if (selectedSubType === "claimsrequest" && activeTabKey === "3") {debugger;
        return [
          { Status: "Create", TagName: "RenewalPaymentPendingforrealization", TagValue: values?.RenewalPaymentPendingforrealization || ""},
          { Status: "Create", TagName: "LatestPolicyreinstatementdate", TagValue: values?.LatestPolicyreinstatementdate || ""},
         
        ]
      }
    else if (selectedSubType === "claimsrequest" && activeTabKey === "4") {
      let newArray =
      [
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments || ""},
        { Status: "Create", TagName: "BeneficiaryChangeRequired", TagValue: isBeneficiaryChangeRequired || ""},
        {Status: "Create",TagName: "Client_Id","TagValue":  values?.GSTINToBeUpdateFor === "1" ? customerData?.laClientID: customerData?.poClientID},
      ];
      let ExistingDataList = [];
      if(existingNomineeData?.length>0){
        const oldProperties = [
          "NomineeFirstName_Old",
          "NomineeLastName_Old",
          "NomineeDOB_Old",
          "Share_Old",
          "RealtionshipWithPolicyowner_Old",
          "Role_Old"
        ];
        existingNomineeData?.forEach((record, recordIndex) => {
          oldProperties?.forEach((property, propertyIndex) => {
            if (record[property]) {
              let obj = {
                Status: "Create",
                TagName: `${property}_${recordIndex + 1}`,
                TagValue: record[property]
              };
        
              ExistingDataList.push(obj);
            }
          });
        });
      }
      const properties = [
        "NomineePANNumber",
        "PANValidationResult",
        "NomineeMobile",
        "NameonPAN",
        "address_1",
        "address_2",
        "city",
        "state",
        "pincode",
        "NomineeEmail",
      ];
      
      let updatedDataList = [];
      beneficiaryBankData?.forEach((record, recordIndex) => {
        properties.forEach((property, propertyIndex) => {
          if (record[property] || record[property] == 0) {
            let obj = {
              Status: "Create",
              TagName: `${property}_${recordIndex + 1}`,
              TagValue: record[property]
            };
      
            updatedDataList.push(obj);
          }
        });
      });
      const nomineeproperties = [
        "NomineeFirstName_New",
          "NomineeLastName_New",
          "NomineeDOB_New",
          "Share_New",
          "RealtionshipWithPolicyowner_New",
          "Role_New",
      ];
      if(isBeneficiaryChangeRequired){
      let nomineeUpdateList = [];
      posUpdateNomineeData?.forEach((record, recordIndex) => {
        nomineeproperties.forEach((property, propertyIndex) => {
          if (record[property] || record[property] == 0) {
            let obj = {
              Status: "Create",
              TagName: `${property}_${recordIndex + 1}`,
              TagValue: property.includes("NomineeDOB_New")? moment(record[property], "DD/MM/YYYY").format("DD/MM/YYYY"): record[property] || "",
            };
            nomineeUpdateList.push(obj);
          }
        });
      });
      updatedDataList = [...nomineeUpdateList, ...updatedDataList, ...ExistingDataList,...newArray];
    }else{
      updatedDataList = [...updatedDataList, ...ExistingDataList,...newArray];
    }
      return updatedDataList;
    }
    else if (selectedSubType === "claimsrequest" && activeTabKey === "5") {debugger
      let newArray =
      [
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments || ""},
        {Status: "Create",TagName: "Client_Id","TagValue":  values?.GSTINToBeUpdateFor === "1" ? customerData?.laClientID: customerData?.poClientID},
      ];
      const properties = [
        "IFSC",
        "BankName",
        "BranchName",
        "AccountNumber",
        "ReAccountNumber",
        "AccountHolderName",
        "InitiatePennyDrop",
        "NameasperPennyDrop",
        "NameMatch",
        "NomineePANNumber"
      ];
      let updatedDataList = [];
      beneficiaryDetailsData?.forEach((record, recordIndex) => {
        properties.forEach((property, propertyIndex) => {
          if (record[property] || record[property] == 0) {
            let obj = {
              Status: "Create",
              TagName: `${property}_${recordIndex + 1}`,
              TagValue: record[property]
            };
            updatedDataList.push(obj);
          }
        });
      });
      updatedDataList = [...updatedDataList, ...newArray];
      return updatedDataList;
    }
    else if (selectedSubType === "claimsrequest" && activeTabKey === "6") {
      const tags = [
        { Status: "Create", TagName: "RaiseRequirement", TagValue: isShowRequirements ? "yes" : "no" },
      ];
    
      if (selectedRequirements && selectedRequirements.length > 0) {
        selectedRequirements.forEach((requirement, index) => {
          tags.push({
            Status: "Create",
            TagName: `Requirements${index + 1}`,
            TagValue: requirement || "",
          });
        });
      }

      if (values?.otherInput) {
        tags.push({
          Status: "Create",
          TagName: "AdditionalNoteForCustomer", // You can rename this tag as needed
          TagValue: values?.otherInput, // Assign the form value
        });
      }
    
      return tags;
    }
    
    else if (selectedSubType === "claimsrequest" && activeTabKey === "7") {
      return [
        { Status: "Create", TagName: "RecordIntimation", TagValue: values?.RecordIntimation || ""},
        { Status: "Create", TagName: "FlagDeathinLifeAsia", TagValue: values?.FlagDeathinLifeAsia || ""},
        { Status: "Create", TagName: "SendRequirementCommunuication", TagValue: values?.SendRequirementCommunuication || ""},
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments || ""},
        { Status: "Create", TagName: "DeathSumAssuredAmount", TagValue: deathSumAssuredAmountRef},
      ]
    }
  };

  const handleAccNumberChange = (index, field,value) => {
    const updatedData = [...beneficiaryDetailsData];
    updatedData[index][field] = value;
    setBeneficiaryDetailsData(updatedData);
  };
  const handleBeneficiaryBankDetailsChange = (index, field,value) => {debugger
    const updatedData = [...beneficiaryBankData];
    updatedData[index][field] = value;
    setBeneficiaryBankData(updatedData);
  };
  const validateIFSCNumber = (_, value) => {
    if (value && !/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/.test(value)) {
      return Promise.reject("IFSC number must be 11 characters alphanumeric");
    } else {
      return Promise.resolve();
    }
  };

  const getIFSCBankDetails =async(ifscCode,row,index)=>{debugger
    setIsLoading(true);
    let response = await apiCalls.getIFSCBanks(ifscCode);
    //if (response.statusText) {
          if (response?.data.length >0) {
            nomineebankform.setFieldsValue({
              beneficiaryBankData: {
                  [index]: {
                    BankName: response?.data[0]?.bank,
                    BranchName: response?.data[0]?.branch
                  },
              },
          });
          const updatedbeneficiaryobj = [...beneficiaryBankData];
          updatedbeneficiaryobj[index].BankName = response?.data[0]?.bank;
          updatedbeneficiaryobj[index].BranchName = response?.data[0]?.branch;
          setBeneficiaryBankData(updatedbeneficiaryobj);
            setIsLoading(false);
          } else {
            message.error({
              content:
              response?.data?.responseBody?.errormessage ||
                "Invalid IFSC",
              className: "custom-msg",
              duration: 2,
            });
            setIsLoading(false);
            nomineebankform.setFieldsValue({
              beneficiaryBankData: {
                  [row?.id]: {
                    IFSC: "",
                    BankName: "",
                    BranchName: ""
                  },
              },
          });
            
          }
       // }
  }
  const handleBackClick = () => {
    const previousTabKey = (parseInt(activeTabKey, 10) - 1).toString();
    if (parseInt(previousTabKey, 10) >= 1) {
      setActiveTabKey(previousTabKey);
    }
  };

  const InitiatePennyDropp = (row) => {debugger
    setIsPennyDropStatus(false);
    
    const values = nomineebankform.getFieldsValue();
    if(!values?.beneficiaryBankData[row]?.AccountNumber || !values?.beneficiaryBankData[row]?.AccountHolderName || !values?.beneficiaryBankData[row]?.IFSC){
      message.destroy();
      message.error({
        content:"Enter All Mandatory Feilds",
        className: "custom-msg",
        duration: 2,
      });
     return;
    }
    
    let obj = {
      "accountNumber": BankAccNo || values?.beneficiaryBankData[row]?.AccountNumber,
      "accountHolderName":values?.beneficiaryBankData[row]?.AccountHolderName || "",
      "ifsc": values?.beneficiaryBankData[row]?.IFSC,
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
          nomineebankform.setFieldsValue({
            beneficiaryBankData: {
                [row]: {
                  InitiatePennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  "Success" : "Failed",
                  NameasperPennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName : "Failed",
                },
            },
        });
        const updatedbeneficiaryobj = [...beneficiaryBankData];
        updatedbeneficiaryobj[row].InitiatePennyDrop =  result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  "Success" : "Failed",
        updatedbeneficiaryobj[row].NameasperPennyDrop =  result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName : "Failed",
        setBeneficiaryBankData(updatedbeneficiaryobj);
        setIsPennyDropStatus(false);
         }else{
          nomineebankform.setFieldsValue({
            beneficiaryBankData: {
                [row]: {
                  InitiatePennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  "Success" : "Failed",
                  NameasperPennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName : "Failed",
                },
            },
        });
        const updatedbeneficiaryobj = [...beneficiaryBankData];
        updatedbeneficiaryobj[row].InitiatePennyDrop =  result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  "Success" : "Failed",
        updatedbeneficiaryobj[row].NameasperPennyDrop =  result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName : "Failed",
        setBeneficiaryBankData(updatedbeneficiaryobj);
        setIsPennyDropStatus(true);
         }
        } else {
          setIsLoading(false);
          setIsPennyDropStatus(true);
          nomineebankform.setFieldsValue({
            beneficiaryBankData: {
                [row]: {
                  InitiatePennyDrop: 'Invalid Input'
                },
            },
        });
          message.error({
            content:
            result?.data?.responseBody?.errormessage ||result?.data?.responseHeader?.message ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        nomineebankform?.setFieldsValue({
          InitiatePennyDrop: 'Invalid Input',
       
        })
      });
  };

  const handleNomineeFirstNameChange = (index, value) => {
    const updatedData = [...posUpdateNomineeData];
    updatedData[index].NomineeFirstName_New = value;
    setPosUpdateNomineeData(updatedData);
  };
  
  const handleNomineeLastNameChange = (index, value) => {
    const updatedData = [...posUpdateNomineeData];
    updatedData[index].NomineeLastName_New = value;
    setPosUpdateNomineeData(updatedData);
  };

  const handleRelationshipChange = (index, value,row) => {
    const updatedData = [...posUpdateNomineeData];
    updatedData[index].RealtionshipWithPolicyowner_New = value;
    setPosUpdateNomineeData(updatedData);
  };

  const handleRoleChange = (index, value,row) => {
    const updatedData = [...posUpdateNomineeData];
    updatedData[index].Role_New = value;
    setPosUpdateNomineeData(updatedData);
  };

  const handleShareChange = (index, newShare) => {
    const updatedNomineeData = [...posUpdateNomineeData];
    updatedNomineeData[index].Share_New = newShare;
    setPosUpdateNomineeData(updatedNomineeData);
  };
  
  const handleBankAccNumber = (e, selectedFiledName,row) => {
    const selectedRowObj = nomineebankform.getFieldsValue();
    const obj = selectedRowObj?.beneficiaryBankData[row];
    if(selectedFiledName === 'ReAccountNumber'){
     setCNFBankAccNo(e)
    }else if(selectedFiledName === 'AccountNumber'){
      setBankAccNo(e)
    }
      if(obj.ReAccountNumber?.length >= 4 && selectedFiledName === 'ReAccountNumber'){
        if(BankAccNo !== e ){
          message.destroy();
    message.error({
      content:
        "Bank Number Not matched",
      className: "custom-msg",
      duration: 2,
    });
    nomineebankform.setFieldsValue({
      beneficiaryBankData: {
          [row?.id]: {
            ReAccountNumber: ''
          },
      },
  });
    }
      }else if(obj.AccountNumber?.length >= 4 && selectedFiledName === 'AccountNumber'){
      const lastFourDigits = obj.AccountNumber.slice(-4);
      const maskedString = '*'.repeat(obj.AccountNumber.length - 4) + lastFourDigits;
      nomineebankform.setFieldsValue({
        beneficiaryBankData: {
            [row?.id]: {
              AccountNumber: maskedString
            },
        },
    });
     }
  }

  const handleClaimDetailsTabSave = () => {
    const nextTabKey = (parseInt(activeTabKey, 10) + 1).toString();
    if (parseInt(nextTabKey, 10) <= 7) {
      setActiveTabKey(nextTabKey);
    }
  };

  const handleRegisterDeathClaimSave = async () => {debugger;
    let deathAssuredNumber = 0;
    let matched = natureOfDeathLU.find(x => x.mstID === form.getFieldValue("NatureofDeath"));
let dateOfDeathCode = matched?.extrL_KEY;
  //   let dateOfDeathValue = props?.propsData?.POSContactData?.serviceRequestTransectionData
  // ?.filter(x => x.tagName === "DateofDeath")
  // ?.map(x => x.tagValue)[0];

  let dateOfDeathValue = form.getFieldValue().DateofDeath

  //const dateOfDeathValue = '06/01/2022';
// const [day, month, year] = dateOfDeathValue.split('/');
// const formattedDateofDeath1 = `${year}${month.padStart(2, '0')}${day.padStart(2, '0')}`;
    let requestTime = intimationForm?.getFieldsValue()?.RequestTime === 'after3pm' ? "Y" : "N"

    if(!props?.propsData?.details?.policyDetailsObj?.planAndStatus?.planCode?.startsWith('U')){
      requestTime = " "
   }
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate());

    //New Code
    let dateStr = '';
    let formattedDateofDeath1 = '';
    if (dateOfDeathValue instanceof Date && !isNaN(dateOfDeathValue)) {
      const day = String(dateOfDeathValue.getDate()).padStart(2, '0');
      const month = String(dateOfDeathValue.getMonth() + 1).padStart(2, '0');
      const year = dateOfDeathValue.getFullYear();
      dateStr = `${day}/${month}/${year}`;
    } else if (typeof dateOfDeathValue === 'string') {
      dateStr = dateOfDeathValue;
    }
    if (typeof dateStr === 'string' && dateStr.includes('/')) {
      const [day, month, year] = dateStr.split('/');
      formattedDateofDeath1 = `${year}${month}${day}`;
    }
    //New Code
    
    // Format to YYYYMMDD
    const yyyy = yesterday.getFullYear();
    const mm = String(yesterday.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const dd = String(yesterday.getDate()).padStart(2, '0');
    //posChangeinPlanObj?.DateofDeath
    // const yyyy1 = dateOfDeathValue.getFullYear();
    // const mm1 = String(dateOfDeathValue.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    // const dd1 = String(dateOfDeathValue.getDate()).padStart(2, '0');
    const formattedEffectiveDate = `${yyyy}${mm}${dd}`;

    //const formattedDateOfDeath = `${yyyy1}${mm1}${dd1}`;

    const response = await apiCalls.registerDeathClaimAPI(loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID, 
      details?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo,
       formattedEffectiveDate, dateOfDeathCode, formattedDateofDeath1, requestTime);
    if(response?.data?.responseBody.errorcode == 0){
      if(props?.propsData?.details?.policyDetailsObj?.planAndStatus?.planCode?.startsWith('U')){
        deathAssuredNumber = Number(response?.data?.responseBody?.estimtotal);
     }
     else{
       deathAssuredNumber = Number(response?.data?.responseBody?.clamamt);
     }
     setDeathSumAssuredAmount(deathAssuredNumber);
     return { success: true, deathSumAssuredAmount: deathAssuredNumber };
    }
    else{
      setAlertTitle(response?.data?.responseBody?.errormessage);
      setAlertData(response?.data?.responseBody?.errormessage);
      setShowAlert(true);
      return { success: false };
    }
  };

  const handleEdit = (val,isBeneficiary)=>{
    if (val === 'edit') {
        isBeneficiary ? setIsEditBeneficiary(true) : setIsEditNominee(true);
      } else if (val === 'close') {
        isBeneficiary ? setIsEditBeneficiary(false) : setIsEditNominee(false);
      }
  }
  const handleBankEdit = (val)=>{
    if (val === 'edit') {
       setIsBankEditable(true);
      } else if (val === 'close') {
        setIsBankEditable(false);
      }
  }

  const GetClaimsPrimaryAssessmentEnquiry = async () => {debugger
    try {
      const response = await apiCalls.GetClaimsPrimaryAssessmentEnquiry(loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID, details?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo);
      if (response?.data?.responseHeader?.errorcode === "0") {
        let data = response?.data?.responseBody?.claimsPrimaryAssessmentEnquiry;
        const updatedData = data.map((item, index) => ({
          ...item,
          id: index + 1, // Adding a dynamic id starting from 1
          LastReinstatementDate: null, // Set your desired value here
          StatusonDateofDeath: null, // Set your desired value here
        }));
        setIsRiderData(updatedData);
       // setIsRiderData(response?.data?.responseBody?.claimsPrimaryAssessmentEnquiry);
      } else {
        message.error({
          content:
            response?.data?.responseBody?.errormessage ||
            "Something went wrong, please try again!",
          className: "custom-msg",
          duration: 2,
        });
      }
    } catch (error) {
    }
  };

  const handleDobChange = (newDob, index, value) => {
  if(value === "rider")
    {
      const updatedNomineeData = [...isRiderData];
      updatedNomineeData[index].LastReinstatementDate = newDob;
      setIsRiderData(updatedNomineeData);
    }
  else if(value === "nominee")
  {
    const updatedData = [...posUpdateNomineeData];
    updatedData[index].NomineeDOB_New = newDob;
    setPosUpdateNomineeData(updatedData);
  }
};
  const handleStatsDateofDeath = (index, value) => {
    const updatedData = [...isRiderData];
    updatedData[index].StatusonDateofDeath = value;
    setIsRiderData(updatedData);
  };

  const handleRadioLink =(item)=>{
    if(["View Life Asia Transactions"].includes(item?.label)){
      setViewTransactionModal(true);
      setViewTransLoader(true);
      let response = apiCalls.GetAuditTrailDetails(details?.policyDetailsObj?.identifiers?.policyNo);
        response
          .then((val) => {
            if (val?.data?.responseHeader?.errorcode === "0") {
              setViewTransactionData(val?.data?.responseBody?.auditTrailDetailsList)
            } else {
              message.error({
                content:
                  val?.data?.responseBody?.errormessage ||
                  "Something went wrong please try again!",
                className: "custom-msg",
                duration: 2,
              });
            }
            setViewTransLoader(false);
          })
          .catch((err) => {
            setViewTransLoader(false);
          });
    }
    else {
    setNameDeDupeModal(true)
      if(POSContactData?.deDupPayload?.length > 0){
        for (let index in POSContactData?.deDupPayload){
            if(POSContactData?.deDupPayload[index]?.type ==='NEGATIVELIST') {
              setNameDeDupeData(POSContactData?.deDupPayload[index]?.deDupPayload);
          }
          else if(POSContactData?.deDupPayload[index]?.type ==='Name') {
            setNameDeDupeData(POSContactData?.deDupPayload[index]?.deDupPayload);
          }
  
        }
    }
  }
  }

   const handleDedupeMatch =(item)=>{
      setDeDupeModalOpen(true);
  }

  return (
    <>
      <Spin spinning={isLoading} fullscreen />
        {selectedSubType === "claimsrequest" && <>
          <Tabs
            tabPosition="left"
            type="card"
            activeKey={activeTabKey}
            onChange={handleTabChange}
          >
            <TabPane
              tab={
                <span>
                  Notification Details
                </span>
              }
              key="1"
            >
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
                    {renderDetailsForm("Notification_Details")}
                    <div className="mb-16 mt-16">
                   <h4 className="subtype-headings fs-16 fw-500">
                   View Rider Details
                      </h4>{"  "}
                  <div className="table-container email-table">
                    <table className="responsive-table">
                      <thead>
                        <tr>
                          <th>Rider Name</th>
                          <th>Rider Sum Assured</th>
                          <th>RCD</th>
                          <th>Last Reinstatement Date</th>
                          <th>Status on Date of Death</th>
                        </tr>
                      </thead>
                      <tbody>
                      {isRiderData?.map((row,index) => (
                         row.sumins > 0 && (
                          <tr  key={index}>
                            <td>{row.longdesc|| "-"} </td>
                            <td>{row.sumins|| "-"} </td>
                            <td>{convertDate(details?.policyDetailsObj?.saDetails?.rcd)|| "-"} </td>
                            <td className="date-picker">
                                          <Form.Item
                                            name={['isRiderData', row.id, 'LastReinstatementDate']}
                                            className="inputs-label mb-0"
                                            rules={[
                                              {
                                                 required: false,
                                                message: "Select Last Reinstatement Date",
                                              },
                                            ]}
                                          >
                                            <DatePicker
                                              allowClear={false}
                                              style={{ width: "100%" }}
                                              className="cust-input"
                                              placeholder="Select Last Reinstatement Date"
                                              format={dateFormat}
                                              value={row?.LastReinstatementDate}
                                              onChange={(date, dateString) => handleDobChange(dateString, index, "rider")}
                                            />
                                          </Form.Item>
                                        </td>
                                        <td>
                                          <Form.Item
                                            name={['isRiderData', row.id, 'StatusonDateofDeath']}
                                            className="inputs-label mb-0"
                                            rules={[
                                              {
                                                 required: false,
                                                message: "Select Status on Date of Death",
                                              },
                                            ]}
                                          >
                                            <Select
                                              className={`inputs-label cust-input select-width`}
                                              placeholder="Status on Date of Death"
                                              options={policyStatusDOBLU}
                                            //  value={row.RealtionshipWithPolicyowner_New}
                                            onChange={(value) => handleStatsDateofDeath(index, value, row)}
                                            />
                                          </Form.Item>
                                        </td>
                          </tr>
                         )
                        ))}
                      
                        {isRiderData?.length === 0 && (
                          <tr>
                            <td colSpan="5">
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
                    <div className="contact-details-btn">
                      <Button type="primary" className="primary-btn" htmlType="submit">
                       Save
                      </Button>
                    </div>
                  </Form>

            </TabPane>
            <TabPane
              tab={
                <span>
                  Intimation Details
                </span>
              }
              key="2"
            >
                 <Form
        form={intimationForm}
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
                    {renderDetailsForm("Intimation_Details")}
                    <div className="contact-details-btn">

                      <Button type="primary" className="primary-btn" htmlType="submit"
                      >
                      Save
                      </Button>

                    </div>
                 
                  </Form>
            </TabPane>
            <TabPane
              tab={
                <span>
                  Life Asia Transactions
                </span>
              }
              key="3"
            >
              {(selectedSubType === "claimsrequest") &&
                <>
                 <Form
        form={lifeAsiaForm}
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
                    {renderDetailsForm("Life_Asia_Transactions")}
                    <div className="contact-details-btn">

                      <Button type="primary" className="primary-btn" htmlType="submit"
                      >
                       Save
                      </Button>

                    </div>
                  </Form>

                </>}
            </TabPane>
            {(ClaimTypee  !== "CI" && ClaimTypee  !== "TPD") &&<>
            <TabPane
              tab={
                <span>
                  Beneficiary Details
                </span>
              }
              key="4"
            >
              
              <Form
        form={nomineeform}
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
              <div className="mb-16">
                   <h4 className="subtype-headings fs-16 fw-500">
                   View Existing Beneficiary Details
                      </h4>{"  "}
                  <div className="table-container email-table">
                    <table className="responsive-table" style={{width:"105%"}}>
                      <thead>
                        <tr>
                          <th>Nominee First Name</th>
                          <th>Nominee Last Name</th>
                          <th>Date of Birth</th>
                          <th>Role</th>
                          <th>Relationship</th>
                          <th>% Share</th>
                          <th>OFAC</th>
                          <th>Is Alive</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!isShowPOSScreen&&<>
                      {existingNomineeData?.map((row,index) => (
                          <tr  key={index}>
                            <td>{row.NomineeFirstName_Old} </td>
                            <td>{row.NomineeLastName_Old} </td>
                            <td>{row.NomineeDOB_Old} </td>
                            <td>{row.Role_Old} </td>
                            <td>
                              {row.RealtionshipWithPolicyowner_Old} 
                              </td>
                            <td>{row.Share_Old} </td>
                            <td>
                            
                <Form.Item
                  label={
                    <span>
                      <span className="link-txt" onClick={()=>handleRadioLink()}>{"OFAC Check"}</span> 
                    </span>
                  }
                  name=""
                  className={`inputs-label radio-grp fs-16 fw-400`}
                  rules={[
                    {
                      required: false,
                      message: "",
                    },
                   
                  ]}
                >
                      {/* {item?.title? <span className="link-txt" onClick={()=>handleRadioLink(item)}>{item?.title}</span> : ""} */}
                </Form.Item>
             
                            </td>
                            <td>
                              <Radio.Group
                                onChange={(e) => handleStatusAliveChange(index, e.target.value)}
                                value={statusAliveValues[index] ?? true}>
                                <Radio value={true}>Yes</Radio>
                                <Radio value={false}>No</Radio>
                              </Radio.Group>
                            </td>
                          </tr>
                        ))}
                      
                        {existingNomineeData?.length === 0 && (
                          <tr>
                            <td colSpan="6">
                              <div className="text-center">
                                <span>No data available</span>
                              </div>
                            </td>
                          </tr>
                        )}
                        </>}
                      </tbody>
                    </table>
                  </div>
               
               </div>
               <div className="mb-16">
             
                  {isBeneficiaryChangeRequired&&<>
                    <h4 className="subtype-headings fs-16 fw-500">
                   View New Beneficiary Details
                   {/* <span>
                   {Edit && <EditOutlined       onClick={() => {handleEdit('edit');setIsEdit(false)}} className="editIconn"/>}

{!Edit && <CloseOutlined   onClick={() => {handleEdit('close'); setIsEdit(true)}} className="editIconn" />}
                   </span> */}
                      </h4>{"  "}
                    <div className="table-container email-table">
                    <table className="responsive-table"style={{width:"106.5%"}}>
                      <thead>
                        <tr>
                          <th> Nominee First Name</th>
                          <th> Nominee Last Name</th>
                          <th>Date of Birth</th>
                          <th>Role</th>
                          <th>Relationship</th>
                          <th>% Share</th>
                          <th>OFAC</th>
                          <th>
                            Add Nominee / Appointee{" "}
                            <i
                              className="bi bi-plus-circle-fill c-pointer text-color fs-18"
                              style={{ marginLeft: "8px" }}
                              onClick={handleAddNominee}
                              title="Add Nominee / Appointee"
                            ></i>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                    
                          {posUpdateNomineeData?.map((row, index) => (
            <tr key={row.id} className="nominee-input">
<td>
<Form.Item
name={['posUpdateNomineeData', index, 'NomineeFirstName']}
className="inputs-label mb-0"
initialValue={row?.NomineeFirstName} 
rules={[
{
required: true,
message: "Enter Nominee  First Name",
},
]}
>
<Input
placeholder="Enter Nominee First Name"
className="cust-input"
// disabled={!isEditNominee}
maxLength={100}
onChange={(e) => handleNomineeFirstNameChange(index, e.target.value)}

/>
</Form.Item>

  </td>
  <td>
  <Form.Item
name={['posUpdateNomineeData', index, 'NomineeLastName']}
className="inputs-label mb-0"
initialValue={row?.NomineeLastName} // Set the initial value here
rules={[
{
required: true,
message: "Enter Nominee  Last Name",
},
]}
>
<Input
placeholder="Enter Nominee Last Name"
className="cust-input"
// disabled={!isEditNominee}
maxLength={100}
onChange={(e) => handleNomineeLastNameChange(index, e.target.value)}

/>
</Form.Item>
  </td>

             <td className="date-picker">
             <Form.Item
name={['posUpdateNomineeData', index, 'NomineeDOB']}
className="inputs-label mb-0"
initialValue={row?.NomineeDOB ? dayjs(row.NomineeDOB, 'DD/MM/YYYY') : null}
rules={[
{
required: true,
message: "Select a DOB",
validator: (_, value) => {
  if (!value) {
  return Promise.resolve();  // Allow empty value for the first record
  }
  return Promise.resolve();
  },
},
]}
>
             <DatePicker
             allowClear={false}
     style={{ width: "100%" }}
     className="cust-input"
     placeholder="Select a DOB"
     format={dateFormat}
     
     value={row?.NomineeDOB? dayjs(row.NomineeDOB, "DD/MM/YYYY"): null}
     onChange={(date, dateString) => handleDobChange(dateString, index, "nominee")}
    // disabled={!isEditNominee}
   />
   </Form.Item>
             </td>
             <td>
             <Form.Item
name={['posUpdateNomineeData', index, 'Role']}
className="inputs-label mb-0"
initialValue={row.Role}
rules={[
{
required: true,  // Make it required only if index is not 0
message: 'Select a Role',
validator: (_, value) => {
if (index === 0 && !value) {
return Promise.resolve();  // Allow empty value for the first record
}
if (index === 0 && value !== 'nominee') {
return Promise.reject('The first record must have "nominee" as the Role');
}
return Promise.resolve();
},
},
]}
>
<Select
className={`inputs-label cust-input select-width`}
placeholder="Select a Role"
value={row?.Role}
// disabled
options={[
{
value: "nominee",
label: "Nominee",
},
{
value: "appointee",
label: "Appointee",
},
]}
onChange={(value) => handleRoleChange(index, value,row)}
/>
</Form.Item>

               </td>
             <td>
             <Form.Item
name={['posUpdateNomineeData', index, 'RealtionshipWithPolicyowner']}
className="inputs-label mb-0"
initialValue={row?.RealtionshipWithPolicyowner}
rules={[
{
required: true,
message: "Select a RelationShip",
validator: (_, value) => {
  if (index === 0 && !value) {
  return Promise.resolve();  // Allow empty value for the first record
  }
  return Promise.resolve();
  },
},
]}
>
             <Select
                className={`inputs-label cust-input select-width`}
                 placeholder="Select a RelationShip"
                 options={relationShipLU}
                 value={row?.RealtionshipWithPolicyowner}
                 onChange={(value) => handleRelationshipChange(index, value,row)}
                // disabled={!isEditNominee}
               />
               </Form.Item>
               </td>
             <td>
             <Form.Item
name={['posUpdateNomineeData', index, 'Share']}
className="inputs-label mb-0"
initialValue={row?.Share}
rules={[
{
required: true,
message: "Enter a Share",
validator: (_, value) => {
  if (index === 0 && !value) {
  return Promise.resolve();  // Allow empty value for the first record
  }
  return Promise.resolve();
  },
},
]}
>
             <Input
   className="cust-input"
   value={row?.Share}
   placeholder="Enter a Share"
   maxLength={20}
   onChange={(e) => handleShareChange(index, e.target.value,row)}
   onKeyDown={(e) => handleKeyDown("numbersOnly",  e)}
  //  disabled
 />
 </Form.Item>
               </td>
               <td>
                            
                            <Form.Item
                              label={
                                <span>
                                  <span className="link-txt" onClick={()=>handleRadioLink()}>{"OFAC Check"}</span> 
                                </span>
                              }
                              name=""
                              className={`inputs-label radio-grp fs-16 fw-400`}
                              rules={[
                                {
                                  required: false,
                                  message: "",
                                },
                               
                              ]}
                            >
                            </Form.Item>
                         
                            </td>

                            <td className='text-center'>
                                <a onClick={()=>totalNominee(row)}>save</a>
                                {(
                                    <i
                                        className="bi bi-trash3-fill"
                                        onClick={() => handleDeleteNominee(row.id, row.Role_New, row.firstName)}
                                        style={{ color: "#b3201f", cursor: "pointer" }}
                                    ></i>
                                )}
                            </td>
           </tr>
          ))}
          {posUpdateNomineeData?.length === 0 && (
            <tr>
              <td colSpan="6">
                <div className="text-center">
                  <span>No data available</span>
                </div>
              </td>
            </tr>
          )}
                      </tbody>
                    </table>
                  </div>
                  </>}

              {/* <Form.Item label="Is Existing Nominee Alive ?">
                  <Radio.Group onChange={e=>setIsBeneficiaryChangeRequired(e.target.value)}
                      value={isBeneficiaryChangeRequired}  disabled>
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                  </Radio.Group>
              </Form.Item> */}
               </div>
               {
                  isPolicyAssigned?.isPolicyAssigned === "Y" && (
                    <div className="mb-10">
                      <h4 className="subtype-headings fs-16 fw-500">View Assignee Details</h4>
                      <table className="claims-table">
                        <thead>
                          <tr>
                            <th>Assignee Name</th>
                            <th>Assignee ID</th>
                            <th>Assignee Email</th>
                            <th>Assignee Mobile Number</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{isPolicyAssigned?.assigneeName || "N/A"}</td>
                            <td>{isPolicyAssigned?.assigneeID || "N/A"}</td>
                            <td>{isPolicyAssigned?.assigneeEmailID || "N/A"}</td>
                            <td>{isPolicyAssigned?.assigneeMobileNo || "N/A"}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )
                }

                      <div className="d-flex">
                    <h4 className="subtype-headings fs-16 fw-500">
                    View Personal Details of Beneficiary
                    {/* <span>
                    {isBeneficiaryEdit && <EditOutlined       onClick={() => {handleEdit('edit',"beneficiary");setIsBeneficiaryEdit(false)}} className="editIconn"/>}

{!isBeneficiaryEdit && <CloseOutlined   onClick={() => {handleEdit('close',"beneficiary"); setIsBeneficiaryEdit(true)}} className="editIconn" />}
                    </span> */}
                      </h4>{"  "}
                      </div>
      {beneficiaryDetailsData
      ?.map((row, index) => ((row.Role === "nominee" || row.Role === "Nominee") && row.IsMinor===false)?
                    <table className="claims-table">
           <tbody className="nominee-section">
            <tr className="full-name-row">
                          <td colSpan={4} style={{
                            background: "#f2f2f2",
                            fontWeight: "600",
                            padding: "10px"
                          }}>
                            {row?.FullName}
                          </td>
                        </tr>

          <tr className="nominee-input">
            <td>Nominee PAN</td>
            <td>
              <Form.Item
                name={['beneficiaryDetailsData', index, 'NomineePANNumber']}
                className="inputs-label mb-0"
                key={index}
                initialValue={row?.NomineePANNumber}
                rules={[
                  {
                    required: false,
                    message: 'Enter Nominee PAN',
                  },
                  {
                    validator: validatePANNumber,
                  },
                ]}
              >
                <Input
                  placeholder="Enter Nominee PAN"
                  className="cust-input upper"
                  maxLength={11}
                  minLength={11}
                  // disabled={!isEditBeneficiary}
                  onKeyDown={(e) => handleKeyDown("charactersOnly",e,"pannumber")}
                  onChange={(e) => handleAccNumberChange(index, 'NomineePANNumber', e.target.value)}
                  onBlur={(e) => {
                    CheckPANdetails(e.target.value, row,index);
                    e.target.value = e.target.value.toUpperCase();
                  }}
                />
              </Form.Item>
            </td>
            <td>Name on PAN</td>
            <td>
              <Form.Item
                name={['beneficiaryDetailsData', index, 'NameonPAN']}
                className="inputs-label mb-0"
                initialValue={row?.NameonPAN}
                rules={[
                  {
                    required: false,
                    message: 'Name on PAN',
                  },
                ]}
              >
                <Input
                  placeholder="Name on PAN"
                  className="cust-input"
                  disabled
                  maxLength={100}
                  value={row?.NameonPAN}
                />
              </Form.Item>
            </td>
          </tr>
          <tr>
            <td>PAN Validation Result</td>
            <td>
            <Form.Item
                name={['beneficiaryDetailsData',index, 'PANValidationResult']}
                className="inputs-label mb-0"
                initialValue={row?.PANValidationResult}
                rules={[
                  {
                    required: false,
                    message: 'PAN Validation Result',
                  },
                ]}
              >
                <Input
                  placeholder="PAN Validation Result"
                  className="cust-input"
                  disabled
                  maxLength={100}
                  value={row?.PANValidationResult}
                />
              </Form.Item>
            </td>
            <td>Address_1</td>
            <td>
              <Form.Item
                 name={['beneficiaryDetailsData',index, 'address_1']}
                className="inputs-label mb-0"
                initialValue={row?.address_1}
                rules={[
                  {
                    required: false,
                    message: 'Enter Nominee Address_1',
                  },
                ]}
              >
                <Input
                  placeholder="Enter Nominee Address1"
                  className="cust-input"
                  maxLength={100}
                  // disabled={!isEditBeneficiary}
                  onChange={(e) => handleAccNumberChange(index, 'address_1', e.target.value)}
                />
              </Form.Item>
            </td>
          </tr>
          <tr>
            <td>Address_2</td>
            <td>
              <Form.Item
                 name={['beneficiaryDetailsData',index, 'address_2']}
                className="inputs-label mb-0"
                initialValue={row?.address_2}
                rules={[
                  {
                    required: false,
                    message: 'Enter Nominee Address_2',
                  },
                ]}
              >
                <Input
                  placeholder="Enter Nominee Address 2"
                  className="cust-input"
                  maxLength={100}
                  // disabled={!isEditBeneficiary}
                  onChange={(e) => handleAccNumberChange(index, 'address_2', e.target.value)}
                />
              </Form.Item>
            </td>
            <td>City</td>
            <td>
              <Form.Item
                 name={['beneficiaryDetailsData',index, 'city']}
                className="inputs-label mb-0"
                initialValue={row?.city}
                rules={[
                  {
                    required: false,
                    message: 'Enter Nominee city',
                  },
                ]}
              >
                <Input
                  placeholder="Enter Nominee city"
                  className="cust-input"
                  maxLength={100}
                  // disabled={!isEditBeneficiary}
                  onChange={(e) => handleAccNumberChange(index, 'city', e.target.value)}
                />
              </Form.Item>
            </td>
          </tr>
          <tr>
            <td>State</td>
            <td>
              <Form.Item
                 name={['beneficiaryDetailsData',index, 'state']}
                className="inputs-label mb-0"
                initialValue={row?.state}
                rules={[
                  {
                    required: false,
                    message: 'Enter Nominee state',
                  },
                ]}
              >
                <Input
                  placeholder="Enter Nominee state"
                  className="cust-input"
                  maxLength={100}
                  // disabled={!isEditBeneficiary}
                  onChange={(e) => handleAccNumberChange(index, 'state', e.target.value)}
                />
              </Form.Item>
            </td>
            <td>Pincode</td>
            <td>
              <Form.Item
                 name={['beneficiaryDetailsData',index, 'pincode']}
                className="inputs-label mb-0"
                initialValue={row?.pincode}
                rules={[
                  {
                    required: false,
                    message: 'Enter Nominee pincode',
                  },
                ]}
              >
                <Input
                  placeholder="Enter Nominee pincode"
                  className="cust-input"
                  maxLength={100}
                  // disabled={!isEditBeneficiary}
                  onChange={(e) => handleAccNumberChange(index, 'pincode', e.target.value)}
                  onBlur={(e) => { CheckPincodeDetails(e.target.value, row,index) }}
                />
              </Form.Item>
            </td>
          </tr>
          <tr>
            <td>Nominee Mobile</td>
            <td>
              <Form.Item
                name={['beneficiaryDetailsData', index, 'NomineeMobile']}
                className="inputs-label mb-0"
                initialValue={row?.NomineeMobile}
                rules={[
                  {
                    required: true,
                    message: 'Enter Nominee Mobile',
                  },
                  {
                    validator: validatePhoneNumber,
                  },
                ]}
              >
                <Input
                  placeholder="Enter Nominee Mobile"
                  className="cust-input"
                  maxLength={10}
                  minLength={10}
                  // disabled={!isEditBeneficiary}
                  onKeyDown={(e) => handleKeyDown("numbersOnly",  e)}
                  onChange={(e) => handleAccNumberChange(index, 'NomineeMobile', e.target.value)}
                />
              </Form.Item>
            </td>
            <td>Nominee Email</td>
            <td>
              <Form.Item
                name={['beneficiaryDetailsData', index, 'NomineeEmail']}
                className="inputs-label mb-0"
                initialValue={row?.NomineeEmail}
                rules={[
                  {
                    required: false,
                    message: 'Enter Nominee Email',
                  },
                  {
                    validator(_, value) {
                      if (emailExist) {
                        return Promise.reject("Email already exist");
                      } else if (
                        value &&
                        !/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,15}(?:\.[a-z]{2})?)$/.test(
                          value
                        )
                      ) {
                        return Promise.reject("Invalid email");
                      } 
                      else {
                        return Promise.resolve();
                      }
                    },
                  },
                ]}
              >
                <Input
                  placeholder="Enter Nominee Email"
                  className="cust-input"
                  maxLength={100}
                  minLength={100}
                  // disabled={!isEditBeneficiary}
                  onChange={(e) => handleAccNumberChange(index, 'NomineeEmail', e.target.value)}
                />
              </Form.Item>
            </td>
          </tr  >
        </tbody>
      <br/>
    </table>
    :<></>
      )}

      {beneficiaryDetailsData
                      ?.map((row, index) => (row.Role === "appointee" && row.IsMinor===false)?
                    <table className="claims-table">
                      <tbody className="appointee-section">
                        <tr className="full-name-row">
                          <td colSpan={4} style={{
                            background: "#f2f2f2",
                            fontWeight: "600",
                            padding: "10px"
                          }}>
                            {row?.FullName}
                          </td>
                        </tr>
                        <tr className="nominee-input">
                        <td>Appointee PAN</td>
                        <td>
                          <Form.Item
                            name={['beneficiaryDetailsData', row?.id, 'NomineePANNumber']}
                            className="inputs-label mb-0"
                            key={index}
                            rules={[
                              {
                                required: false,
                                message: 'Enter Appointee PAN',
                              },
                              {
                                validator: validatePANNumber,
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter Appointee PAN"
                              className="cust-input upper"
                              maxLength={11}
                              minLength={11}
                              onKeyDown={(e) => handleKeyDown("charactersOnly",e,"pannumber")}
                              onChange={(e) => handleAccNumberChange(index, 'NomineePANNumber', e.target.value)}
                              onBlur={(e) => {
                                CheckPANdetails(e.target.value, row,index);
                                e.target.value = e.target.value.toUpperCase();
                              }}
                            />
                          </Form.Item>
                        </td>
                        <td>Name on PAN</td>
                        <td>
                          <Form.Item
                            name={['beneficiaryDetailsData', row?.id, 'NameonPAN']}
                            className="inputs-label mb-0"
                            initialValue={row?.NameonPAN}
                            rules={[
                              {
                                required: false,
                                message: 'Name on PAN',
                              },
                            ]}
                          >
                            <Input
                              placeholder="Name on PAN"
                              className="cust-input"
                              disabled
                              maxLength={100}
                              value={row?.NameonPAN}
                            />
                          </Form.Item>
                        </td>
                      </tr>
                      <tr>
                        <td>PAN Validation Result</td>
                        <td>
                        <Form.Item
                            name={['beneficiaryDetailsData', row?.id, 'PANValidationResult']}
                            className="inputs-label mb-0"
                            initialValue={row?.PANValidationResult}
                            rules={[
                              {
                                required: false,
                                message: 'PAN Validation Result',
                              },
                            ]}
                          >
                            <Input
                              placeholder="PAN Validation Result"
                              className="cust-input"
                              disabled
                              maxLength={100}
                              value={row?.PANValidationResult}
                            />
                          </Form.Item>
                        </td>
                        <td>Address 01</td>
                        <td>
                          <Form.Item
                            name={['beneficiaryDetailsData', row?.id, 'address_1']}
                            className="inputs-label mb-0"
                            rules={[
                              {
                                required: false,
                                message: 'Enter Appointee Address',
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter Appointee Address"
                              className="cust-input"
                              maxLength={100}
                              onChange={(e) => handleAccNumberChange(index, 'address_1', e.target.value)}
                            />
                          </Form.Item>
                        </td>
                      </tr>
                      <tr>
                        <td>Address 02</td>
                        <td>
                          <Form.Item
                            name={['beneficiaryDetailsData', row?.id, 'address_2']}
                            className="inputs-label mb-0"
                            rules={[
                              {
                                required: false,
                                message: 'Enter Appointee Address',
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter Appointee Address"
                              className="cust-input"
                              maxLength={100}
                              onChange={(e) => handleAccNumberChange(index, 'address_2', e.target.value)}
                            />
                          </Form.Item>
                        </td>
                        <td>City</td>
                        <td>
                          <Form.Item
                            name={['beneficiaryDetailsData', row?.id, 'city']}
                            className="inputs-label mb-0"
                            rules={[
                              {
                                required: false,
                                message: 'Enter Appointee Address',
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter Appointee Address"
                              className="cust-input"
                              maxLength={100}
                              onChange={(e) => handleAccNumberChange(index, 'city', e.target.value)}
                            />
                          </Form.Item>
                        </td>
                      </tr>
                      <tr>
                        <td>State</td>
                        <td>
                          <Form.Item
                            name={['beneficiaryDetailsData', row?.id, 'state']}
                            className="inputs-label mb-0"
                            rules={[
                              {
                                required: false,
                                message: 'Enter Appointee Address',
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter Appointee Address"
                              className="cust-input"
                              maxLength={100}
                              onChange={(e) => handleAccNumberChange(index, 'state', e.target.value)}
                            />
                          </Form.Item>
                        </td>
                        <td>Pincode</td>
                        <td>
                          <Form.Item
                            name={['beneficiaryDetailsData', row?.id, 'pincode']}
                            className="inputs-label mb-0"
                            rules={[
                              {
                                required: false,
                                message: 'Enter Appointee Address',
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter Appointee Address"
                              className="cust-input"
                              maxLength={100}
                              onChange={(e) => handleAccNumberChange(index, 'pincode', e.target.value)}
                              onBlur={(e) => { CheckPincodeDetails(e.target.value, row,index) }}
                            />
                          </Form.Item>
                        </td>
                      </tr>
                      <tr>
                        <td>Appointee Mobile</td>
                        <td>
                          <Form.Item
                            name={['beneficiaryDetailsData', row?.id, 'NomineeMobile']}
                            className="inputs-label mb-0"
                            rules={[
                              {
                                required: true,
                                message: 'Enter Appointee Mobile',
                              },
                              {
                                validator: validatePhoneNumber,
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter Appointee Mobile"
                              className="cust-input"
                              maxLength={10}
                              minLength={10}
                              onKeyDown={(e) => handleKeyDown("numbersOnly",  e)}
                              onChange={(e) => handleAccNumberChange(index, 'NomineeMobile', e.target.value)}
                            />
                          </Form.Item>
                        </td>
                        <td>Appointee Email</td>
                        <td>
                          <Form.Item
                            name={['beneficiaryDetailsData', row?.id, 'NomineeEmail']}
                            className="inputs-label mb-0"
                            rules={[
                              {
                                required: false,
                                message: 'Enter Appointee Email',
                              },
                              {
                                validator(_, value) {
                                  if (emailExist) {
                                    return Promise.reject("Email already exist");
                                  } else if (
                                    value &&
                                    !/^([\w-]+(?:\.[\w-]+))@((?:[\w-]+\.)\w[\w-]{0,66})\.([a-z]{2,15}(?:\.[a-z]{2})?)$/.test(
                                      value
                                    )
                                  ) {
                                    return Promise.reject("Invalid email");
                                  } 
                                  else {
                                    return Promise.resolve();
                                  }
                                },
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter Appointee Email"
                              className="cust-input"
                              maxLength={100}
                              minLength={100}
                              onChange={(e) => handleAccNumberChange(index, 'NomineeEmail', e.target.value)}
                            />
                          </Form.Item>
                        </td>
                      </tr>
                      <br/>
                      </tbody>

                    </table>
                      :<></>
                      )}
              <div className="contact-details-btn">
              <Button type="primary" className="primary-btn" onClick={() => handleBackClick()}>
                  Back
                </Button>
                <Button type="primary" className="primary-btn" htmlType="submit">
                  Save
                </Button>
              </div>
              </Form>
            </TabPane>
            </>}
            <TabPane
              tab={
                <span>
                  Beneficiary Bank Details
                </span>
              }
              key="5"
            >
              <Form
        form={nomineebankform}
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
                <div className="d-flex">
  <h4 className="subtype-headings fs-16 fw-500">
    Beneficiary Bank Details
    {/* <span>
    {isBeneficiaryBankEdit && <EditOutlined       onClick={() => {handleBankEdit('edit');setIsBeneficiaryBankEdit(false)}} className="editIconn"/>}
{!isBeneficiaryBankEdit && <CloseOutlined   onClick={() => {handleBankEdit('close'); setIsBeneficiaryBankEdit(true)}} className="editIconn" />}
                    </span> */}
  </h4>{" "}
 
</div>
                    <table className="claims-table">
        {beneficiaryDetailsData
        ?.filter(row => row.IsMinor===false)
        ?.map((row, index) => (
        <React.Fragment key={index}>
           <tbody className="nominee-section">
            <tr className="full-name-row">
                          <td colSpan={4} style={{
                            background: "#f2f2f2",
                            fontWeight: "600",
                            padding: "10px"
                          }}>
                           {row?.FullName}
                          </td>
                        </tr>
          <tr className="nominee-input">
            <td>IFSC</td>
            <td>
              <Form.Item
                name={['beneficiaryBankData', index, 'IFSC']}
                className="inputs-label mb-0"
                initialValue={row?.IFSC}
                rules={[
                  {
                    required: true,
                    message: 'Enter IFSC',
                  },
                    {
                      validator: validateIFSCNumber,
                    },
                ]}
              >
                <Input
                  placeholder="Enter IFSC"
                  className="cust-input upper"
                  maxLength={11}
                  minLength={11}
                  // disabled={!isBankEditable}
                  onKeyDown={(e) => handleKeyDown("charactersOnly",e)}
                  onBlur={(e)=>getIFSCBankDetails(e.target.value,row,index)}
                  onChange={(e) => handleBeneficiaryBankDetailsChange(index, 'IFSC', e.target.value)}
                />
              </Form.Item>
            </td>
            <td>Bank Name</td>
            <td>
              <Form.Item
                name={['beneficiaryBankData', index, 'BankName']}
                className="inputs-label mb-0"
                initialValue={row?.BankName}
                rules={[
                  {
                    required: false,
                    message: 'Bank Name',
                  },
                ]}
              >
                <Input
                  placeholder="Bank Name"
                  className="cust-input"
                  disabled
                  maxLength={100}
                />
              </Form.Item>
            </td>
          </tr>
          <tr>
            <td>Branch Name</td>
            <td>
            <Form.Item
                name={['beneficiaryBankData', index, 'BranchName']}
                className="inputs-label mb-0"
                initialValue={row?.BranchName}
                rules={[
                  {
                    required: false,
                    message: 'Branch Name',
                  },
                ]}
              >
                <Input
                  placeholder="Branch Name"
                  className="cust-input"
                  disabled
                  maxLength={100}
                />
              </Form.Item>
            </td>
            <td>Enter Account Number</td>
            <td>
              <Form.Item
                name={['beneficiaryBankData', index, 'AccountNumber']}
                className="inputs-label mb-0"
                initialValue={row?.AccountNumber}
                rules={[
                  {
                    required: true,
                    message: 'Account Number',
                  },
                ]}
              >
                <Input
                  placeholder="Account Number"
                  className="cust-input"
                  maxLength={20}
                  // disabled={!isBankEditable}
                  onBlur={(e) => handleBankAccNumber(e.target.value,"AccountNumber",index)}
                  onKeyDown={(e) => handleKeyDown("numbersOnly",  e)}
                  onChange={(e) => handleBeneficiaryBankDetailsChange(index, 'AccountNumber', e.target.value)}
                />
              </Form.Item>
            </td>
          </tr>
          <tr>
            <td>Re-Enter Account Number</td>
            <td>
              <Form.Item
                name={['beneficiaryBankData', index, 'ReAccountNumber']}
                className="inputs-label mb-0"
                initialValue={row?.ReAccountNumber}
                rules={[
                  {
                    required: true,
                    message: 'Re-Enter Account Number',
                  },
                ]}
              >
                <Input
                  placeholder="Re-Enter Account Number"
                  className="cust-input"
                  maxLength={20}
                  // disabled={!isBankEditable}
                  onBlur={(e) => handleBankAccNumber(e.target.value,"ReAccountNumber",index)}
                  onKeyDown={(e) => handleKeyDown("numbersOnly",  e)}
                  onChange={(e) => handleBeneficiaryBankDetailsChange(index, 'ReAccountNumber', e.target.value)}
                />
              </Form.Item>
            </td>
            <td>Account Holder Name</td>
            <td>
              <Form.Item
                name={['beneficiaryBankData', index, 'AccountHolderName']}
                className="inputs-label mb-0"
                initialValue={row?.AccountHolderName}
                rules={[
                  {
                    required: true,
                    message: 'Account Holder Name',
                  },
                ]}
              >
                <Input
                  placeholder="Account Holder Name"
                  className="cust-input"
                  maxLength={100}
                  // disabled={!isBankEditable}
                  onChange={(e) => handleBeneficiaryBankDetailsChange(index, 'AccountHolderName', e.target.value)}
                />
              </Form.Item>
            </td>
            </tr>
            <tr>
            <td>
            <a
                        onClick={() => InitiatePennyDropp(index)}
                        style={{ color: "#b3201f" }}
                        className="text-label"
                      >
              Initiate Penny Drop
              </a>
              </td>
            <td>
              <Form.Item
                name={['beneficiaryBankData', index, 'InitiatePennyDrop']}
                className="inputs-label mb-0"
                initialValue={row?.InitiatePennyDrop}
                rules={[
                  {
                    required: true,
                    message: 'Initiate Penny Drop',
                  },
                ]}
              >
                <Input
                  placeholder="Initiate Penny Drop"
                  className="cust-input"
                  maxLength={100}
                  // disabled={!isBankEditable}
                  onChange={(e) => handleBeneficiaryBankDetailsChange(index, 'InitiatePennyDrop', e.target.value)}
                />
              </Form.Item>
            </td>
            <td>Name as per Penny Drop</td>
            <td>
              <Form.Item
                name={['beneficiaryBankData', index, 'NameasperPennyDrop']}
                className="inputs-label mb-0"
                initialValue={row?.NameasperPennyDrop}
                rules={[
                  {
                    required: false,
                    message: 'Name as per Penny Drop',
                  },
                ]}
              >
                <Input
                  placeholder="Name as per Penny Drop"
                  className="cust-input"
                  maxLength={100}
                  disabled
                />
              </Form.Item>
            </td>
            </tr>
            <tr>
  <td>Name Match</td>
  <td>
    <Form.Item
      name={['beneficiaryBankData', index, 'NameMatch']}
      className="inputs-label mb-0"
      initialValue={row?.NameMatch}
      rules={[
        {
          required: true,
          message: 'Name Match is required',
        },
      ]}
    >
      <Radio.Group
        onChange={(e) => handleBeneficiaryBankDetailsChange(index, 'NameMatch', e.target.value)}
        className="radio-check"
        // disabled={!isBankEditable}
      >
        <Radio className="fs-16 fw-400"
        value="yes">
          Yes
        </Radio>
        <Radio className="fs-16 fw-400"
        value="no">
          No
        </Radio>
      </Radio.Group>
    </Form.Item>
  </td>
  {/* <td></td> */}
  <td>
  <Form.Item
                  label={
                    <span>
                      <span className="link-txt" onClick={()=>handleDedupeMatch()}>{"Dedupe Match Details"}</span> 
                    </span>
                  }
                  name=""
                  className={`inputs-label radio-grp fs-16 fw-400`}
                  rules={[
                    {
                      required: false,
                      message: "",
                    },
                   
                  ]}
                >
                      {/* {item?.title? <span className="link-txt" onClick={()=>handleRadioLink(item)}>{item?.title}</span> : ""} */}
                </Form.Item>
  </td>
</tr>
<br/>
          </tbody>
        </React.Fragment>
      ))}
    </table>
              <div className="contact-details-btn">
                <Button type="primary" className="primary-btn" onClick={() => handleBackClick()}>
                  Back
                </Button>
                <Button type="primary" className="primary-btn" htmlType="submit">
                  Save
                </Button>
              </div>
              </Form>
            </TabPane>
            <TabPane
              tab={
                <span>
                  Raise Requirement
                </span>
              }
              key="6"
            >
                   <Form
        form={raiseReqForm}
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
                    <div className="mb-16 mt-16">
              <Form.Item label="Raise Requirement">
                    <Radio.Group onChange={e=>setIsShowRequirements(e.target.value)}
                        value={isShowRequirements}  >
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                  {isShowRequirements && <>
                  <h4 className="subtype-headings fs-16 fw-500">
                   Add Requirements
                      </h4>{"  "}
                    <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            onChange={handleChange}
        >
            {options.map(option => (
                <Option key={option.key} value={option.value}>
                    {option.value}
                </Option>
            ))}
        </Select>
      
        <Form.Item label="Add Any Other Related Documents" className="mb-16 mt-16">
                    <Radio.Group onChange={e=>setIsShowOtherDocument(e.target.value)}
                        value={isShowOtherDocument}  >
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                  {isShowOtherDocument && <>
                    <Form.Item
                  label=""
                  name= "otherInput"
                  className="inputs-label mb-0"
                  rules={[
                    {
                      required: true,
                      message: "requied",
                    },   
                  ]}
                >
                  <TextArea rows={5}  maxLength={1000} placeholder={"Enter Text"} />
                </Form.Item>

                  </>}
                  </>}
               </div>
               {/* {isShowRequirements && <> */}
                    <div className="contact-details-btn">
                      <Button type="primary" className="primary-btn" htmlType="submit">
                       Save
                      </Button>
                    </div>
                    {/* </>} */}
                  </Form>
                </TabPane>
                <TabPane
              tab={
                <span>
                  Record Intimation
                </span>
              }
              key="7"
            >
                 <Form
        form={recordIntimationForm}
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
                {renderDetailsForm("Record_Intimation")}
                <div className="contact-details-btn">
                      <Button type="primary" className="primary-btn" htmlType="submit">
                       Submit
                      </Button>
                    </div>
                    </Form>
                </TabPane>
          </Tabs>
        </>}

      {/* </Form> */}
      {showAlert && (
        <PopupAlert
          alertData={alertData}
          title={alertTitle}
          getAdvance={props?.propsData?.getAdvance}
          navigate={navigateTo}
          setShowAlert={setShowAlert}
          isShow={true}
        ></PopupAlert>
      )}

<Modal
       open={lifeAsiaTransactionModal}
       destroyOnClose={true}
       width={1200}
       closeIcon={false}
       footer={null}
     >

       <div>

         <div className="reuirement">
           <table className="table responsive-table assistanceTable">
          <thead>
            <th>Transaction #</th>
            <th>Effective Date</th>
            <th>Description</th>
            <th>GL Code</th>
            <th>User ID</th>
            <th>Transaction Date</th>
            <th>Transaction Amount</th>
          </thead>
           <tbody>
                {lifeTransactionData?.map((item, index) => (
                    <tr key={index + 1}>
                       <td>{item.transaction}</td>
                       <td>{item.effectiveDate?convertDate(item.effectiveDate):""}</td>
                       <td>{item.description}</td>
                       <td>{item.glCode}</td>
                       <td>{item.userId}</td>
                        <td>{item.transactionDate?convertDate(item.transactionDate):""}</td>
                        <td>{item.transactionAmount}</td>

                    </tr>
                  ))}
                {lifeTransactionData?.length === 0 &&
                  <tr>
                    <td colSpan={7}>
                      <div className="text-center"><span>No Data Available</span></div>
                    </td>
                  </tr>}
              </tbody>
           </table>
         </div>
         <div className="contact-details-btn">
           <Button
             type="primary"
             className="primary-btn"
             onClick={() => setLifeAsiaTransactionModal(false)}>
             OK
           </Button>
         </div>
       </div>
     </Modal>
     <Modal
       title={<span style={{ color:"#b21f1f", fontWeight: 'bold' }}>OFAC List Check Details</span>}
        open={NameDeDupeModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setNameDeDupeModal(false)}>
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
            {NameDeDupeData?.map((item,index) => (
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
           {NameDeDupeData?.length === 0  &&
               <tr>
                  <td colspan="4">
               
                <div className="text-center"><span>No data available</span></div> 
        </td>
        </tr>}
          </table>
        </div>
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
      <Modal
        title="View Life Asia Transactions"
        open={viewTransactionModal}
        destroyOnClose={true}
        width={1200}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setViewTransactionModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
         <Spin spinning={viewTransLoader}>
         <div className="table-container" style={{ marginTop: "0px" }}>
          <table className="responsive-table">
            <tr>
              <th>Transaction No</th>
              <th>Effective Date</th>
              <th>Description</th>
              <th>User ID</th>
              <th>Transaction Date</th>
            
            </tr>
            {viewTransactionData?.map((item,index) => (
            <tr key={index}>
            <td>
              {item?.tranno}
            </td>
            <td>
              {item?.effdate? convertDate(item?.effdate) : null}
            </td>
            
              <td>{item?.description}</td>
              <td>{item?.userid}</td>
              <td>{item?.datime}</td>
             
            </tr>
          ))}
           {viewTransactionData?.length === 0  &&
               <tr>
                  <td colspan="6">
               
                <div className="text-center"><span>No data available</span></div> 
        </td>
        </tr>}
          </table>
        </div>
        </Spin>
      </Modal>
    </>
  );
}

export default ClaimsNotificationView;
