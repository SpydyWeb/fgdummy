import React, { useEffect, useState,useRef } from "react";
import { useSelector } from "react-redux";

import { Form, Spin, Button, message, Input, Tabs, Radio,DatePicker,Select, Modal, Checkbox,Tooltip, Row, Col } from "antd";
import { ClaimsData } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import moment from "moment";
import UploadIcon from "../../assets/images/upload.png";
import apiCalls from "../../api/apiCalls";
import PopupAlert from "../popupAlert";
import dayjs from "dayjs";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import CloseIcon from "../../assets/images/close-icon.png";

const { TabPane } = Tabs;
const { Option } = Select;
const ClaimsAssessmentChecker = (props) => {
  const loginInfo = useSelector(state => state);
  const dateFormat = "DD/MM/YYYY";
  const [emailExist] = useState(false);
  const suffix = <img src={UploadIcon} alt="" />;
  const { selectedSubType, clientRoleLU, details, customerData, clientEnquiryData,causeOfEventLU, natureOfDeathLU,policyTypeLU,claimCategoryLU,claimIntimationLU,sourceInformationLU,assuredIncomePlanLU,POSContactData,laNomineeAddressLU,subStageLU,assessorsDecisionLU,policyStatusDOBLU, loggedUser,dataBseCHeckLU,hotSpotCheckLU,referCaseToLU,reinstatementDecisionLU,withDGHLU,investigatorLU,decisionDescriptionLU, isPolicyAssigned } = props?.propsData;
  const [form] = Form.useForm();
  const [decisionForm] = Form.useForm();
  const [nomineeform] = Form.useForm();
  const [nomineebankform] = Form.useForm();
  const [uploadform] = Form.useForm();
  const [reInsureForm] = Form.useForm();
  const [referrelSheetForm] = Form.useForm();
  const [reInstatementForm] = Form.useForm();
  const [policyCheckForm] =  Form.useForm();
  const [claimDetailsForm] = Form.useForm();
  const [assignmentForm] = Form.useForm();
  const [addComments, setAddComments] = useState(null);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [showAgentSourcing, setShowAgentSourcing] = useState(false);
  const [showAgentSourcingDetails, setShowAgentSourcingDetails] = useState([]);
  const [viewTransLoader, setViewTransLoader] = useState(false);
  // For Assessor decision description dropdown
  const [decisionDescription, setDecisionDescription] = useState([]);
  // For Checker decision description dropdown
  const [checkerDecisionDescription, setCheckerDecisionDescription] = useState([]);

  const { TextArea } = Input;
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
  const [riderDetailsData, setRiderDetailsData] = useState([]);
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
  const [policyCheckData,setPolicyCheckData] = useState({});
  const [reInstatementData,setReInstatementData] = useState({});
  const [assignmentData, setAssignmentData] = useState({});
  const [claimPaymentData, setClaimPaymentData] = useState({});
  const [referrelSheetData, setReferrelSheetData] = useState({});
  const [asessorsRecomandationData,setAsessorsRecomandationData] = useState({});
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [NameDeDupeData, setNameDeDupeData] = useState([]);
  const [NameDeDupeModal, setNameDeDupeModal] = useState(false);
  const [negativeList, setNegativeList] = useState([]);
  const [showSubmitBtn, setShowSubmitBtn] = useState(false);
  const [isShowOtherDocument, setIsShowOtherDocument] = useState(false);
  const [raiseRequirementOpen,setRaiseRequirementOpen] = useState(false);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [isLoader,setIsLoader] = useState(false);
  const [serviceRequestId, setServiceRequestId] = useState(null);
  const [showRaiseRequirementBtn,setShowRaiseRequirementBtn] = useState(false);
  const [policyDetailsData, setPolicyDetailsData] = useState({});
  const [isAssessorDecision, setIsAssessorDecision] = useState(null);
  const [checkerDecision, setCheckerDecision] = useState(null);
  const [approverRemarks, setApproverRemarks] = useState(null);
  const [assessorRecErr, setAssessorRecErr] = useState(false);
  const [checkerDecErr, setCheckerDecErr] = useState(false);
  const [approverRemErr, setApproverRemErr] = useState(false);
  const [isRiderData, setIsRiderData] = useState([]);
  const [followUpsData, setFollowUpsData] = useState([]);
  const [filteredDescriptions, setFilteredDescriptions] = useState([]);
  const [statusAliveValues, setStatusAliveValues] = useState([]);
  const [reInsureDetails, setReInsureDetails] = useState([
    { id: 1, withinRetention: '', retentionAmount: null, reInsurerName: '', participation: null },
  ]);
  const [hideInvestDetails, setHideInvestDetails] = useState(false)
  const [forceUpdate, setForceUpdate] = useState(false);
  const [isReferallData, setIsReferallData] = useState('')
	const [investDetails, setInvestDetails] = useState([
    { id: 1, investigatorName: '', investigationStartDate: null, investigationEndDate: null, isDisable: false },
  ]);
   const [isdisable, setIsDisable] = useState(true);
   const [investObj, setInvestObj] = useState({
       investigatorName : null, 
       investigationStartDate: null,
       investigationEndDate: null })
const [deathSumAssured, setDeathSumAssured] = useState(null);
  const [allComments, setAllComments] = useState([]);
 const [claimPayout, setClaimPayout] = useState({
    riderSumAssured: "",
    premiumsToBeWaved: "",
    premiumSuspense: "",
    interestCharges: "",
    penalInterestCharges: "",
    premiumRecovery: "",
    survivalBenefit_Add: "",
    survivalBenefit: ""
  });
    const addInvestigatorRef = useRef(null); // Ref to store the add function
    const addInvestigator = () => {
      if (addInvestigatorRef.current) {
        addInvestigatorRef.current(); // Call the stored add function
      }
    };
    const createInvestigatorDetails = () => {
      if (investObj.investigatorName && investObj.investigationStartDate && investObj.investigationEndDate) {
        // setInvestData((prev) => [...prev, investObj]); // Append to the list
        setInvestObj({   // Reset form after save
          investigatorName: null,
          investigationStartDate: null,
          investigationEndDate: null,
        });
      } 
    };
  const formattedDate = (date) => date ? moment(date).format("DD/MM/YYYY") : null;
  const handleAdd = () => {
    const newData = {
      id: reInsureDetails.length + 1,
      withinRetention: 'Yes',
      retentionAmount: '',
      reInsurerName: '',
      participation: '',
    };
    setReInsureDetails([...reInsureDetails, newData]);
  };
  const handleClaimPayout = (key, value) => {
    setClaimPayout((prev) => (
      {
        ...prev,
        [key] : value
      }
    ))
  };
  
  // const totalPayoutAmount = Object.entries(claimPayout).reduce((sum, [key, val]) => {
  //   const numericVal = parseFloat(val) || 0;
  //   let totalAmount;
  
  //   if (key === "premiumRecovery" || key === "survivalBenefit") {
  //     totalAmount = sum - numericVal;
  //   } else {
  //     totalAmount = sum + numericVal;
  //   }
  
  //   return !isNaN(totalAmount) ? totalAmount : sum;
  // }, deathSumAssured);
  // const formattedTotalPayoutAmount = totalPayoutAmount.toFixed(2);
  const handleDelete = (id, index) => {
    if (reInsureDetails.length > 1) {
      form.setFieldsValue({
        reInsureDetails: {
          [id]: {
            withinRetention: '',
      retentionAmount: '',
      reInsurerName: '',
      participation: '',
          },
        },
      });
      const updatedupdateNomineeData = reInsureDetails.filter((row) => row.id !== id);
      setReInsureDetails(updatedupdateNomineeData);
      // Reset the form instance to reflect the changes
      reInsureForm.resetFields([`reInsureDetails[${index}].withinRetention`, `reInsureDetails[${index}].retentionAmount`, `reInsureDetails[${index}].reInsurerName`, `reInsureDetails[${index}].participation` ],);
    }
  };

const handleSelectChange = (value, id) => {
 // console.log(`Selected value for Requirement ${id}:`, value);
};

const handleCheckboxChange = (e, id, type) => {
 // console.log(`Checkbox ${type} for Requirement ${id}:`, e.target.checked);
};

const handleTabChange = (key) => {
  setActiveTabKey(key);
  if(key === "9"){
    handleViewComments();
  }
};
// const posChangeinPlanObj= {
// }
let posChangeinPlanObj= {
}

const requirementsLU = [
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

const options = requirementsLU?.map((requirement, index) => ({
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

// Function to calculate the difference
const calculateDifference = (rcd, dod) => {
  const format = "DD/MM/YYYY"; // Define the date format
  const startDate = moment(rcd, format); // Parse the start date with format
  const endDate = moment(dod, format); // Parse the end date with format

  const years = endDate.diff(startDate, 'years');
  startDate.add(years, 'years'); // Add the years difference to the start date

  const months = endDate.diff(startDate, 'months');
  startDate.add(months, 'months'); // Add the months difference to the start date

  const days = endDate.diff(startDate, 'days'); // Now calculate the days difference

  return `${years}Y ${months}M ${days}D`;
};

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
 const mergedObj1 = {
    ...(POSContactData?.claimsDetails || {}),
    ...(POSContactData?.notification || {}),
    ...(POSContactData?.primaryUser || {}),
 };

 const JVGridData1 = (POSContactData?.journalEntries || []).map(entry => ({
  JVNo: entry.jeNo,
  JVName: entry.jeType,
  JVAmount: entry.amount
}));

// const JVGridData1 = [
//   { JVName: "Interest Charges", JVAmount: mergedObj1.interestCharges || 0 },
//   { JVName: "Penal Interest Charges", JVAmount: mergedObj1.penalInterestCharges || 0 },
//   { JVName: "Survival Benefit", JVAmount: mergedObj1.survivalBenefit || 0 },
//   { JVName: "Survival Benefit_add", JVAmount: mergedObj1.survivalBenefit_Add || 0 }
// ].filter(item => item.JVAmount !== null && Number(item.JVAmount) > 0);

useEffect(()=>{
// if(customerData?.isClaimsAssessmentChecker && activeTabKey ==="1"){
//         POSContactData?.serviceRequestTransectionData?.forEach(element => {
//           posChangeinPlanObj[element.tagName] = element.tagValue
//         });
//        // const newDate = new Date(convertDate(details?.policyDetailsObj?.saDetails?.rcd));
//         //newDate.setFullYear(newDate.getFullYear() + years);
//         form.setFieldsValue({
//           custRole: posChangeinPlanObj?.custRole ? parseInt(posChangeinPlanObj.custRole, 10) : null,
//           srvReqID: posChangeinPlanObj?.srvReqRefNo,
//           policyType:  policyDetailsData?.policyType || details?.policyDetailsObj?.planAndStatus?.policyType,
//           LAClientID:  policyDetailsData?.LAClientID || details?.policyDetailsObj?.identifiers?.la_ClientID || null,
//           POClientID: policyDetailsData?.POClientID || details?.policyDetailsObj?.identifiers?.po_ClientID  || null,
//           ApplicationDate: policyDetailsData?.ApplicationDate || (posChangeinPlanObj?.ApplicationDate? posChangeinPlanObj?.ApplicationDate : null),
//           Totalpremiumpaidtilldate:  policyDetailsData?.Totalpremiumpaidtilldate || posChangeinPlanObj?.Totalpremiumpaidtilldate,
//           LifeAsiaTransactionsafterDOD:  policyDetailsData?.LifeAsiaTransactionsafterDOD || posChangeinPlanObj?.LifeAsiaTransactionsafterDOD,
//           policyStatusOnDateOfDeath:  posChangeinPlanObj?.policyStatusOnDateOfDeath ?parseInt(posChangeinPlanObj?.policyStatusOnDateOfDeath) : policyDetailsData?.policyStatusOnDateOfDeath,
//           LAAgeonDOD:  policyDetailsData?.LAAgeonDOD || posChangeinPlanObj?.LAAgeonDOD,
//           LAOccupation:  policyDetailsData?.LAOccupation || posChangeinPlanObj?.LAOccupation,
//           LifeAssuredAnnualIncome:  policyDetailsData?.LifeAssuredAnnualIncome || posChangeinPlanObj?.LifeAssuredAnnualIncome,
//           DurationfromRCDTillDOD:  policyDetailsData?.DurationfromRCDTillDOD || posChangeinPlanObj?.DateofDeath ? calculateDifference(convertDate(details?.policyDetailsObj?.saDetails?.rcd),posChangeinPlanObj?.DateofDeath) : null,
//           DurationfromRCDTillDODIntimation:  policyDetailsData?.DurationfromRCDTillDODIntimation || posChangeinPlanObj?.DateofIntimation ? calculateDifference(convertDate(details?.policyDetailsObj?.saDetails?.rcd),posChangeinPlanObj?.DateofIntimation) : null,
//           UWDecision:  policyDetailsData?.UWDecision || posChangeinPlanObj?.UWDecision,
//           UWComments:  policyDetailsData?.UWComments || posChangeinPlanObj?.UWComments,
//           LifeAssuredGender:  policyDetailsData?.LifeAssuredGender || clientEnquiryData?.cltsex,
//         });
//        // GetClaimsPrimaryAssessmentEnquiry();
//        const tagPatternPersonal = /_(\d+)$/;
//         const personalFields = [ "longdesc","sumins","LastReinstatementDate","StatusonDateofDeath","id"];
//         const riderNewdata = processData(
//           POSContactData?.serviceRequestTransectionData,
//           'Create',
//           tagPatternPersonal,
//           personalFields
//         );
//         setIsRiderData(riderNewdata);
//   }

// function extractRiderArray(source) {
//   // If source is an array, return as is
//   if (Array.isArray(source)) return source;
//   // If source is an object, extract values as array
//   if (source && typeof source === 'object') return Object.values(source);
//   // Otherwise, return empty array
//   return [];
// }



if (customerData?.isClaimsAssessmentChecker && activeTabKey === "1") {debugger
  // Merge all sources
 const mergedObj = {
    ...(POSContactData?.claimsDetails || {}),
    ...(POSContactData?.notification || {}),
    ...(POSContactData?.primaryUser || {}),
  };
  form.setFieldsValue({
    custRole: mergedObj?.custRole ? parseInt(mergedObj.custRole, 10) : null,
    srvReqID: mergedObj?.srvReqRefNo,
    policyType: policyDetailsData?.policyType || details?.policyDetailsObj?.planAndStatus?.policyType,
    LAClientID: policyDetailsData?.LAClientID || details?.policyDetailsObj?.identifiers?.la_ClientID || null,
    POClientID: policyDetailsData?.POClientID || details?.policyDetailsObj?.identifiers?.po_ClientID || null,
    ApplicationDate: policyDetailsData?.ApplicationDate || (mergedObj?.ApplicationDate ? mergedObj?.ApplicationDate : null),
    Totalpremiumpaidtilldate: policyDetailsData?.Totalpremiumpaidtilldate || mergedObj?.Totalpremiumpaidtilldate,
    LifeAsiaTransactionsafterDOD: policyDetailsData?.LifeAsiaTransactionsafterDOD || mergedObj?.LifeAsiaTransactionsafterDOD,
    policyStatusOnDateOfDeath: mergedObj?.policyStatusOnDateOfDeathID ? parseInt(mergedObj?.policyStatusOnDateOfDeathID) : policyDetailsData?.policyStatusOnDateOfDeath,
    LAAgeonDOD: policyDetailsData?.LAAgeonDOD || mergedObj?.laAgeonDOD,
    LAOccupation: policyDetailsData?.LAOccupation || mergedObj?.laOccupation,
    LifeAssuredAnnualIncome: policyDetailsData?.LifeAssuredAnnualIncome || mergedObj?.lifeAssuredAnnualIncome,
    DurationfromRCDTillDOD: policyDetailsData?.DurationfromRCDTillDOD || formatDate(mergedObj?.dateofDeath) ? calculateDifference(convertDate(details?.policyDetailsObj?.saDetails?.rcd), formatDate(mergedObj?.dateofDeath)) : null,
    DurationfromRCDTillDODIntimation: policyDetailsData?.DurationfromRCDTillDODIntimation || formatDate(mergedObj?.dateOfIntimation) ? calculateDifference(convertDate(details?.policyDetailsObj?.saDetails?.rcd), formatDate(mergedObj?.dateOfIntimation)) : null,
    UWDecision: policyDetailsData?.uwDecision || mergedObj?.uwDecision,
    UWComments: policyDetailsData?.uwComments || mergedObj?.uwComments,
    LifeAssuredGender: policyDetailsData?.LifeAssuredGender || clientEnquiryData?.cltsex,
  });
  // Rider data logic (if needed, update to use mergedObj)
  //  const tagPatternPersonal = /_(\\d+)$/;
  //  const personalFields = [ "longdesc","sumins","LastReinstatementDate","StatusonDateofDeath","id"];
  // If rider data is also in claimsDetails/notification/PrimaryUser, update this logic accordingly
  // Example: const riderNewdata = processData([...], 'Create', tagPatternPersonal, personalFields);
  
//   const mergedRiderData = [
//   ...extractRiderArray(POSContactData?.claimsDetails?.riderData || POSContactData?.claimsDetails),
//   ...extractRiderArray(POSContactData?.notification?.riderData || POSContactData?.notification),
//   ...extractRiderArray(POSContactData?.PrimaryUser?.riderData || POSContactData?. PrimaryUser)
// ];

  // const riderNewdata = processData(
  //   mergedRiderData,
  //   'Create',
  //   tagPatternPersonal,
  //   personalFields
  // );
  // setIsRiderData(riderNewdata);
  const tagPatternPersonal = /_(\d+)$/;
        const personalFields = [ "longdesc","sumins","LastReinstatementDate","StatusonDateofDeath","id"];
        const riderNewdata = processData(
          POSContactData?.serviceRequestTransectionData,
          'Create',
          tagPatternPersonal,
          personalFields
        );
        setIsRiderData(riderNewdata);
}

  else if(customerData?.isClaimsAssessmentChecker && activeTabKey === "2"){
    // POSContactData?.serviceRequestTransectionData?.forEach(element => {
    //   posChangeinPlanObj[element.tagName] = element.tagValue
    // });

    const mergedObj = {
    ...(POSContactData?.claimsDetails || {}),
    ...(POSContactData?.notification || {}),
    ...(POSContactData?.primaryUser || {}),
      
  };
    form.setFieldsValue({
     // SourceofIntimation: intimationData?.SourceofIntimation || (posChangeinPlanObj?.SourceofIntimation ? parseInt(posChangeinPlanObj?.SourceofIntimation) : null),
    //   srvReqID: posChangeinPlanObj?.srvReqRefNo,
    //   ClaimsID:  claimDetailsData?.ClaimsID || POSContactData?.srvReqRefNo || null,
    //   ClaimServiceGuarateeApplicable: claimDetailsData?.ClaimServiceGuarateeApplicable || posChangeinPlanObj?.claimsApplicable,
    //   AgeingFromIntimation: claimDetailsData?.AgeingFromIntimation || posChangeinPlanObj?.DateofIntimation,
    //   AgeingFromRegisterationDate: claimDetailsData?.AgeingFromRegisterationDate || posChangeinPlanObj?.AgeingFromRegisterationDate,
    //   AgeingFromLastDocumentReceived: claimDetailsData?.AgeingFromLastDocumentReceived || posChangeinPlanObj?.AgeingFromLastDocumentReceived,
    //   DeceasedPerson: claimDetailsData?.DeceasedPerson || posChangeinPlanObj?.DeceasedPerson,
    //   ReasonForLateIntimation: claimDetailsData?.ReasonForLateIntimation || posChangeinPlanObj?.ReasonForLateIntimation,
    //   policyType:  claimDetailsData?.policyType || details?.policyDetailsObj?.planAndStatus?.customerType,
    //   claimType:  claimDetailsData?.claimType || posChangeinPlanObj?.claimType || null,
    //   typeofcondition :claimDetailsData?.typeofcondition || posChangeinPlanObj?.typeofcondition || null,
    //   claimCategory: posChangeinPlanObj?.claimCategory ? posChangeinPlanObj?.claimCategory : claimDetailsData?.claimType,
    //   NatureofDeath: claimDetailsData?.NatureofDeath || (posChangeinPlanObj?.NatureofDeath? parseInt(posChangeinPlanObj?.NatureofDeath) : null),
    //   exactCauseOfDeath:  claimDetailsData?.exactCauseOfDeath || posChangeinPlanObj?.exactCauseOfDeath || null,
    //   DateofDeath:  claimDetailsData?.DateofDeath || posChangeinPlanObj?.DateofDeath || null,
    //   DateofEvent: claimDetailsData?.DateofEvent || posChangeinPlanObj?.DateofEvent,
    //   LastRequirementReceivedDate:  claimDetailsData?.LastRequirementReceivedDate || posChangeinPlanObj?.LastRequirementReceivedDate || null,
    //   RegistrationEffectiveDate: claimDetailsData?.RegistrationEffectiveDate || posChangeinPlanObj?.ClaimReceivedOn || null,
    //   DateofIntimation: claimDetailsData?.DateofIntimation || posChangeinPlanObj?.ClaimIntimatedOn || null,
    // });

    srvReqID: mergedObj?.srvReqRefNo,
    ClaimsID: claimDetailsData?.ClaimsID || mergedObj?.claimsID || null,
    ClaimServiceGuarateeApplicable: claimDetailsData?.ClaimServiceGuarateeApplicable || mergedObj?.claimServiceGuarateeApplicable,
    AgeingFromIntimation: claimDetailsData?.AgeingFromIntimation || (mergedObj?.ageingFromIntimation),
    AgeingFromRegisterationDate: claimDetailsData?.AgeingFromRegisterationDate || (mergedObj?.ageingFromRegisterationDate)  ,
    AgeingFromLastDocumentReceived: claimDetailsData?.AgeingFromLastDocumentReceived || (mergedObj?.ageingFromLastDocumentReceived),
    DeceasedPerson: claimDetailsData?.DeceasedPerson || mergedObj?.DeceasedPerson,
    ReasonForLateIntimation: claimDetailsData?.ReasonForLateIntimation || mergedObj?.reasonForLateIntimation,
    policyType: claimDetailsData?.policyType || details?.policyDetailsObj?.planAndStatus?.customerType,
    claimType: claimDetailsData?.claimType || mergedObj?.claimType || null,
    typeofcondition: claimDetailsData?.typeofcondition || mergedObj?.typeofcondition || null,
    claimCategory: mergedObj?.claimCategory ? mergedObj?.claimCategory : claimDetailsData?.claimType,
    NatureofDeath: claimDetailsData?.NatureofDeath || (mergedObj?.natureofDeathID ? parseInt(mergedObj?.natureofDeathID) : null),
    exactCauseOfDeath: claimDetailsData?.exactCauseOfDeath || mergedObj?.exactCauseOfDeath || null,
    exactCauseOfIllness: claimDetailsData?.exactCauseOfIllness || mergedObj?.exactCauseOfIllness || null,
    DateofDeath: claimDetailsData?.DateofDeath || formatDate(mergedObj?.dateofDeath) || null,
    DateofEvent: claimDetailsData?.DateofEvent || formatDate(mergedObj?.dateofEvent),
    LastRequirementReceivedDate: claimDetailsData?.LastRequirementReceivedDate || formatDate(mergedObj?.lastRequirementReceivedDate)   || null,
    RegistrationEffectiveDate: claimDetailsData?.RegistrationEffectiveDate || formatDate(mergedObj?.claimReceivedOn) || null,
    DateofIntimation: claimDetailsData?.DateofIntimation ||   formatDate(mergedObj?.claimIntimatedOn) || null,
  });


    // ClaimsData[selectedSubType]?.Intimation_Details?.forEach(element => {
    //   if(element?.name === "NameofiIntimatingPerson"&&posChangeinPlanObj?.ClaimIntimatedBy === "nominee"){
    //     element.hide= true;
    //     setIsReRenderForm(!isRerenderForm)
    //   }
    //   else {
    //     if(element?.name === "NameofiIntimatingPerson"&&posChangeinPlanObj?.ClaimIntimatedBy !== "nominee"){
    //       element.hide= false;
    //       setIsReRenderForm(!isRerenderForm)
    //     }
    //   }
    // });
}
else if(customerData?.isClaimsAssessmentChecker && activeTabKey ==="4"){
  // POSContactData?.serviceRequestTransectionData?.forEach(element => {
  //   posChangeinPlanObj[element.tagName] = element.tagValue
  //  });
   const mergedObj = {
    ...(POSContactData?.claimsDetails || {}),
    ...(POSContactData?.notification || {}),
    ...(POSContactData?.primaryUser || {}),
    
    
  };
  getMandatetagEnquiry();
  form.setFieldsValue({
   // SourceofIntimation: policyCheckData?.SourceofIntimation || (posChangeinPlanObj?.SourceofIntimation ? parseInt(posChangeinPlanObj?.SourceofIntimation) : null),
  //   srvReqID: posChangeinPlanObj?.srvReqRefNo,
  //   OFAC:  policyCheckData?.OFAC || posChangeinPlanObj?.OFAC || null,
  //   ClaimHotspotCheck:  intimationData?.ClaimHotspotCheck || posChangeinPlanObj?.ClaimHotspotCheck ? parseInt(posChangeinPlanObj?.ClaimHotspotCheck) : null,
  //   IIBDataBaseCheck:  policyCheckData?.IIBDataBaseCheck || posChangeinPlanObj?.IIBDataBaseCheck ? parseInt(posChangeinPlanObj?.IIBDataBaseCheck) : null,
  //   IndustryCheck:  policyCheckData?.IndustryCheck || posChangeinPlanObj?.IndustryCheck || null,
  //   AutoPayStatus:  policyCheckData?.AutoPayStatus || posChangeinPlanObj?.AutoPayStatus || null,
  // });

      srvReqID: mergedObj?.srvReqRefNo,
    OFAC: policyCheckData?.OFAC || mergedObj?.OFAC || null,
    ClaimHotspotCheck: intimationData?.ClaimHotspotCheck || (mergedObj?.claimHotspotCheck ? parseInt(mergedObj?.claimHotspotCheck) : null),
    IIBDataBaseCheck: policyCheckData?.IIBDataBaseCheck || (mergedObj?.iibDataBaseCheckID ? parseInt(mergedObj?.iibDataBaseCheckID) : null),
    IndustryCheck: policyCheckData?.IndustryCheck || mergedObj?.industryCheck || null,
    AutoPayStatus: policyCheckData?.AutoPayStatus || mergedObj?.autoPayStatus || null,
  });
}
else if(customerData?.isClaimsAssessmentChecker && activeTabKey ==="5"){
  // POSContactData?.serviceRequestTransectionData?.forEach(element => {
  //   posChangeinPlanObj[element.tagName] = element.tagValue
  // });
  const mergedObj = {
    ...(POSContactData?.claimsDetails || {}),
    ...(POSContactData?.notification || {}),
    ...(POSContactData?.primaryUser || {}),
    
    
  };
  form.setFieldsValue({
  //   srvReqID: posChangeinPlanObj?.srvReqRefNo,
  //   DidPolicyLapse: reInstatementData?.DidPolicyLapse || posChangeinPlanObj?.DidPolicyLapse || "",
  //   Lapsedon:  reInstatementData?.Lapsedon || posChangeinPlanObj?.Lapsedon || null,
  //   WasPolicyReinstated: reInstatementData?.WasPolicyReinstated || posChangeinPlanObj?.WasPolicyReinstated || "",
  //   ReinstatementDate:  reInstatementData?.ReinstatementDate || posChangeinPlanObj?.ReinstatementDate || null,
  //   ReinstatementDecision:  reInstatementData?.ReinstatementDecision || posChangeinPlanObj?.ReinstatementDecision ? parseInt(posChangeinPlanObj?.ReinstatementDecision): null,
  //   WithDGH:  reInstatementData?.WithDGH || posChangeinPlanObj?.WithDGH ? parseInt(posChangeinPlanObj?.WithDGH) : null,
  //   MedicalDisclosures:  reInstatementData?.MedicalDisclosures || posChangeinPlanObj?.MedicalDisclosures || null,
  // });

      srvReqID: mergedObj?.srvReqRefNo,
    DidPolicyLapse: reInstatementData?.DidPolicyLapse || mergedObj?.didPolicyLapse || "",
    Lapsedon: reInstatementData?.Lapsedon || formatDate(mergedObj?.lapsedon) || null,
    WasPolicyReinstated: reInstatementData?.WasPolicyReinstated || mergedObj?.wasPolicyReinstated || "",
    ReinstatementDate: reInstatementData?.ReinstatementDate || formatDate(mergedObj?.reinstatementDate) || null,
    ReinstatementDecision: reInstatementData?.ReinstatementDecision || (mergedObj?.reinstatementDecisionID ? parseInt(mergedObj?.reinstatementDecisionID) : null),
    WithDGH: reInstatementData?.WithDGH || (mergedObj?.withDGH ? parseInt(mergedObj?.withDGH) : null),
    MedicalDisclosures: reInstatementData?.MedicalDisclosures || mergedObj?.medicalDisclosures || null,
  });
  getUWFollowups();
}
// else if(customerData?.isClaimsAssessmentChecker && activeTabKey ==="6"){
//   POSContactData?.serviceRequestTransectionData?.forEach(element => {
//     posChangeinPlanObj[element.tagName] = element.tagValue
//   });
//   GetAssigneeEnquiry();
//   LoanEnquiry();
//   form.setFieldsValue({
//     srvReqID: posChangeinPlanObj?.srvReqRefNo,
//     DateofAssignment:  assignmentData?.DateofAssignment || posChangeinPlanObj?.DateofAssignment || null,
//    // AssignmentType:  assignmentData?.AssignmentType || posChangeinPlanObj?.AssignmentType || null,
//     // AssigneeName:  assignmentData?.AssigneeName || posChangeinPlanObj?.AssigneeName || null,
//     AssignorName:  assignmentData?.AssignorName || posChangeinPlanObj?.AssignorName || null,
//    // LoanActive:  assignmentData?.LoanActive || posChangeinPlanObj?.LoanActive || null,
//     //OutstandingLoanAmount:  assignmentData?.OutstandingLoanAmount || posChangeinPlanObj?.OutstandingLoanAmount || null,
//   });
// }

if (customerData?.isClaimsAssessmentChecker && activeTabKey === "6") {
    getNomineeEnquiry();
    const mergedObj = {
    ...(POSContactData?.claimsDetails || {}),
    ...(POSContactData?.notification || {}),
    ...(POSContactData?.primaryUser || {}),
    
  };
    // POSContactData?.serviceRequestTransectionData?.forEach(element => {
    //     posChangeinPlanObj[element.tagName] = element.tagValue
    //   });
      setIsBeneficiaryChangeRequired(mergedObj?.isBeneficiaryChangeRequired ===true);
      nomineeform.setFieldsValue({ 
        IsLANomineeAddressSame: mergedObj?.IsLANomineeAddressSame === 1 ? "Yes" : "No",
        isExistingNomineeAlive: mergedObj?.isBeneficiaryChangeRequired ===true
       });
    // const tagPatternNew = /_(New_\d+)$/;
    // const newFields = ["New"];  
    // const consolidatedNewData = processData(
    //   POSContactData?.serviceRequestTransectionData,
    //   'Create',
    //   tagPatternNew,
    //   newFields
    // );
    // setPosUpdateNomineeData(consolidatedNewData);

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
      NomineeDOB_New: item.dateOfBirth? dayjs(item.dateOfBirth).format("DD/MM/YYYY"): null,
      IsMinor: item.dateOfBirth? getAge(new Date(item.dateOfBirth)) <18 : false,
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

    // console.log("Mapped Nominee Data:", mappedNomineeData);
    // const tagPatternPersonal = /_(\d+)$/;
    // const personalFields = ["NomineePANNumber", "NameonPAN", "PANValidationResult", "NomineeMobile", "address", "NomineeEmail"];
    // const personlBeneficiaryNewData = processData(
    //   POSContactData?.serviceRequestTransectionData,
    //   'Create',
    //   tagPatternPersonal,
    //   personalFields
    // );
  
    // setBeneficiaryDetailsData(personlBeneficiaryNewData);

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
      NomineeDOB_New: item.dateOfBirth? dayjs(item.dateOfBirth).format("DD/MM/YYYY"): null,
      IsMinor: item.dateOfBirth? getAge(new Date(item.dateOfBirth)) <18 : false,
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
 else if(customerData?.isClaimsAssessmentChecker && activeTabKey ==="7"){
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
      IsMinor: item.dateOfBirth? getAge(new Date(item.dateOfBirth)) <18 : false,
      };
    });
    setBeneficiaryBankData(prev => [
      ...prev,
      ...mappedBankData.filter(
        newItem =>
          !prev.some(prevItem => prevItem.NomineePANNumber === newItem.NomineePANNumber)
      )
    ]);

    //  const tagPatternPersonal = /_(\d+)$/;
    // const personalFields = ["IFSC","BankName","BranchName","AccountNumber","ReAccountNumber","AccountHolderName","InitiatePennyDrop","NameasperPennyDrop","NameMatch"];
    //  const beneficiaryNewData = processData(
    //    POSContactData?.serviceRequestTransectionData,
    //    'Create',
    //    tagPatternPersonal,
    //    personalFields
    //  );
    //  setBeneficiaryBankData(beneficiaryNewData);
 }

//  if (customerData?.isClaimsAssessmentChecker && activeTabKey === "8") {
//   const relevantPrefixes = [
//     "withinRetention",
//     "retentionAmount",
//     "reInsurerName",
//     "participation"
//   ];

//   const tagMap = {};

//   // Save all tag values to posChangeinPlanObj
//   POSContactData?.serviceRequestTransectionData?.forEach(({ tagName, tagValue }) => {
//     posChangeinPlanObj[tagName] = tagValue;
//   });

//   // Extract Re-Insurer Details
//   POSContactData?.serviceRequestTransectionData
//     ?.filter(item => relevantPrefixes.some(prefix => item.tagName.startsWith(prefix)))
//     .forEach(item => {
//       const match = item.tagName.match(/(withinRetention|retentionAmount|reInsurerName|participation)_(\d+)/);
//       if (match) {
//         const [_, fieldName, number] = match;
//         const index = parseInt(number, 10) - 1;

//         if (!tagMap[index]) {
//           tagMap[index] = {
//             id: index,
//             withinRetention: "",
//             retentionAmount: "",
//             reInsurerName: "",
//             participation: ""
//           };
//         }

//         tagMap[index][fieldName] = fieldName === "withinRetention"
//           ? item.tagValue === "1" ? "Yes" : item.tagValue === "2" ? "No" : item.tagValue
//           : item.tagValue;
//       }
//     });

//   const reInsureDetails = Object.values(tagMap).sort((a, b) => a.id - b.id);

//   setReInsureDetails(reInsureDetails);

//   // Set the form data
//   reInsureForm.setFieldsValue({ reInsureDetails });

//   // Populate Claim Payout fields
//   const payoutFields = [
//     "riderSumAssured",
//     "premiumsToBeWaved",
//     "premiumSuspense",
//     "interestCharges",
//     "penalInterestCharges",
//     "premiumRecovery",
//     "survivalBenefit"
//   ];

//   const claimPayoutData = {};

//   payoutFields.forEach(field => {
//     if (posChangeinPlanObj[field]) {
//       claimPayoutData[field] = posChangeinPlanObj[field];
//     }
//   });

//   setClaimPayout(claimPayoutData);

//   // Set Death Sum Assured
//   const deathAssuredNumber = posChangeinPlanObj.DeathSumAssuredAmount;
//   setDeathSumAssured(deathAssuredNumber);
// }

if (customerData?.isClaimsAssessmentChecker && activeTabKey === "8") {debugger
  

    const mergedObj = {
      ...(POSContactData?.claimsDetails || {}),
      ...(POSContactData?.notification || {}),
      ...(POSContactData?.primaryUser || {}),
      ...(POSContactData?.assessment || {}),
    };
    posChangeinPlanObj = mergedObj;

    // If JSON string is present, parse and bind to table columns
    if (mergedObj.reInsurerName_1) {
      let reinsurerArray = [];
      try {
        reinsurerArray = JSON.parse(mergedObj.reInsurerName_1).map((item, idx) => ({
          id: idx + 1,
          reInsurerName: item.ReinsurerName,
          //participation: item.Participation,
          participation: item.Participation || '',
          withinRetention: item.WithinRetention || '',
          //retentionAmount: item.RetentionAmount || ''
          retentionAmount: mergedObj.retentionAmount|| ''
        }));
      } catch (e) {   
        reinsurerArray = [];
      }
      // If withinRetention is not present in the array, but present in mergedObj, bind it to the first item
      if (mergedObj.withinRetention) { if (!reinsurerArray[0]) { reinsurerArray[0] = {}; }
      if (!reinsurerArray[0].withinRetention) 
        { reinsurerArray[0] = 
          { ...reinsurerArray[0], 
            withinRetention: String(mergedObj.withinRetention) === '1' ? 'Yes' : String(mergedObj.withinRetention) === '2' ? 'No' : mergedObj.withinRetention 
          };
        }
      }
      setReInsureDetails(reinsurerArray);
      reInsureForm.setFieldsValue({ reInsureDetails: reinsurerArray });
    } else {
      // Fallback to old logic if JSON not present
      const reinsurerDetails = [];
      const maxCount = 10;
      for (let i = 1; i <= maxCount; i++) {
        if (mergedObj[`reInsurerName_${i}`]) {
          reinsurerDetails.push({
            id: i,
            reInsurerName: mergedObj[`reInsurerName_${i}`] || "",
            retentionAmount: mergedObj[`retentionAmount_${i}`] || "",
            withinRetention: mergedObj[`withinRetention_${i}`] || "",
            participation: mergedObj[`participation_${i}`] || ""
          });
        }
      }
      if (mergedObj.withinRetention) { if (!reinsurerDetails[0]) { reinsurerDetails[0] = {}; }
      if (!reinsurerDetails[0].withinRetention) 
        { reinsurerDetails[0] = 
          { ...reinsurerDetails[0], 
            withinRetention: String(mergedObj.withinRetention) === '1' ? 'Yes' : String(mergedObj.withinRetention) === '2' ? 'No' : mergedObj.withinRetention 
          };
        }
      }
      setReInsureDetails(reinsurerDetails);
      reInsureForm.setFieldsValue({ reInsureDetails: reinsurerDetails });
    }

 



    // Set deathSumAssured if available
    if (mergedObj.deathSumAssuredAmount) {
      setDeathSumAssured(mergedObj.deathSumAssuredAmount);
      reInsureForm.setFieldsValue({
        TotalClaimPayable: mergedObj.totalClaimPayable
      });
    }

    // Populate Claim Payout fields
    const payoutFields = [
      "riderSumAssured",
      "premiumsToBeWaved",
      "premiumSuspense",
      "interestCharges",
      "penalInterestCharges",
      "premiumRecovery",
      "survivalBenefit",
      "survivalBenefit_add"
    ];

    const claimPayoutData = {};
    payoutFields.forEach(field => {
      if (mergedObj[field]) {
        claimPayoutData[field] = mergedObj[field];
      }
    });
    setClaimPayout(claimPayoutData);
}



else if(customerData?.isClaimsAssessmentChecker && activeTabKey ==="3"){debugger
  // POSContactData?.serviceRequestTransectionData?.forEach(element => {
  //   posChangeinPlanObj[element.tagName] = element.tagValue
  // });
 const mergedObj = {
    ...(POSContactData?.claimsDetails || {}),
    ...(POSContactData?.notification || {}),
    ...(POSContactData?.primaryUser || {}),
    
    
  };
  form.setFieldsValue({
  //   srvReqID: posChangeinPlanObj?.srvReqRefNo,
  //   ClaimIntimatedBy:  intimationData?.ClaimIntimatedBy || posChangeinPlanObj?.ClaimIntimatedBy || null,
  //   ClaimIntimatedOn:  intimationData?.ClaimIntimatedOn || posChangeinPlanObj?.ClaimIntimatedOn || null,
  //   ClaimRegisteredBy:  intimationData?.TicketLoggedBy || posChangeinPlanObj?.TicketLoggedBy || null,
  //   // ClaimRegisteredBy:  intimationData?.ClaimRegisteredBy || posChangeinPlanObj?.ClaimRegisteredBy || null,
  //   ClaimRegisteredOn:  intimationData?.ClaimRegisteredOn || posChangeinPlanObj?.ClaimRegisteredOn || null,
  //   AssesmentDoneBy:  intimationData?.AssesmentDoneBy || loginInfo?.userProfileInfo?.profileObj?.name || null,
  //   // AssesmentDoneOn: formattedDate(intimationData?.AssesmentDoneOn) || posChangeinPlanObj?.AssesmentDoneOn || null,
  //   AssesmentDoneOn: formattedDate(intimationData?.AssesmentDoneOn) || formattedDate(posChangeinPlanObj?.AssesmentDoneOn) || null,
  // //  AssesmentDoneOn:  intimationData?.AssesmentDoneOn || null,
  //   SelectSubStage:  intimationData?.SelectSubStage || posChangeinPlanObj?.SelectSubStage ?  parseInt(posChangeinPlanObj?.SelectSubStage) : null,
  // });

      srvReqID: mergedObj?.srvReqRefNo,
    ClaimIntimatedBy: intimationData?.ClaimIntimatedBy || (mergedObj?.claimIntimatedBy) || null,
    ClaimIntimatedOn: intimationData?.ClaimIntimatedOn || formatDate(mergedObj?.claimIntimatedOn) || null,
    ClaimRegisteredBy: intimationData?.TicketLoggedBy || mergedObj?.ticketLoggedBy || null,
    ClaimRegisteredOn: intimationData?.ClaimRegisteredOn || formatDate(mergedObj?.claimRegisteredOn) || null,
    AssesmentDoneBy: intimationData?.AssesmentDoneBy || loginInfo?.userProfileInfo?.profileObj?.name || null,
    AssesmentDoneOn: formattedDate(intimationData?.AssesmentDoneOn) || formattedDate(mergedObj?.  assesmentDoneOn) || null,
    SelectSubStage: intimationData?.SelectSubStage || (mergedObj?.SelectSubStage ? parseInt(mergedObj?.SelectSubStage) : null),
  });
}
// else if(customerData?.isClaimsAssessmentChecker && activeTabKey ==="10"){
//   POSContactData?.serviceRequestTransectionData?.forEach(element => {
//     posChangeinPlanObj[element.tagName] = element.tagValue
//   });
//   setShowRaiseRequirementBtn(false);
//   form.setFieldsValue({
//     srvReqID: posChangeinPlanObj?.srvReqRefNo,
//     // ClaimIntimatedBy:  intimationData?.ClaimIntimatedBy || posChangeinPlanObj?.ClaimIntimatedBy || null,
//     // ClaimIntimatedOn:  intimationData?.ClaimIntimatedOn || posChangeinPlanObj?.ClaimIntimatedOn || null,
//     // ClaimRegisteredBy:  intimationData?.ClaimRegisteredBy || posChangeinPlanObj?.ClaimRegisteredBy || null,
//     // ClaimRegisteredOn:  intimationData?.ClaimRegisteredOn || posChangeinPlanObj?.ClaimRegisteredOn || null,
//     // AssesmentDoneBy:  intimationData?.AssesmentDoneBy || posChangeinPlanObj?.AssesmentDoneBy || null,
//     // AssesmentDoneOn:  intimationData?.AssesmentDoneOn || posChangeinPlanObj?.AssesmentDoneOn || null,
//     // SelectSubStage:  intimationData?.SelectSubStage || posChangeinPlanObj?.SelectSubStage || null,
//   });
// }
else if (customerData?.isClaimsAssessmentChecker && activeTabKey === "9") {debugger
  const posChangeinPlanObj = {};

  // Flatten tagName -> tagValue mapping
  // POSContactData?.serviceRequestTransectionData?.forEach(element => {
  //   posChangeinPlanObj[element.tagName] = element.tagValue;
  // });
   const mergedObj = {
    ...(POSContactData?.claimsDetails || {}),
    ...(POSContactData?.notification || {}),
    ...(POSContactData?.primaryUser || {}),

    
  };

  // Resolve ReferCaseTo ID and map to description
  // const referCaseTo = referrelSheetData?.ReferCaseTo
  //   ?? (posChangeinPlanObj?.ReferCaseTo ? parseInt(posChangeinPlanObj?.ReferCaseTo) : null);
  const referCaseTo = referrelSheetData?.ReferCaseTo
    ?? (mergedObj?.ReferCaseTo ? parseInt(mergedObj?.ReferCaseTo) : null);


  const referCaseToObj = referCaseToLU.find(item => item.value === referCaseTo);
  const referCaseToDesc = referCaseToObj ? referCaseToObj.mstDesc : null;

  // Parse investigator and reinvestigator if available
  // const selectInvestigator = referrelSheetData?.SelectInvestigator
  //   ?? (posChangeinPlanObj?.SelectInvestigator ? parseInt(posChangeinPlanObj?.SelectInvestigator) : null);
  const selectInvestigator = referrelSheetData?.SelectInvestigator
    ?? (mergedObj?.SelectInvestigator ? parseInt(mergedObj?.SelectInvestigator) : null);


  // const selectReInvestigator = referrelSheetData?.SelectReInvestigator
  //   ?? (posChangeinPlanObj?.SelectReInvestigator ? parseInt(posChangeinPlanObj?.SelectReInvestigator) : null);
  const selectReInvestigator = referrelSheetData?.SelectReInvestigator
    ?? (mergedObj?.SelectReInvestigator ? parseInt(mergedObj?.SelectReInvestigator) : null);


  // Handle dynamic investigator list mapping
  const investigatorDetails = [];

  POSContactData?.serviceRequestTransectionData
    .filter(item => item.tagName.startsWith("PrimaryInvestigator"))
    .forEach(item => {
      const match = item.tagName.match(/PrimaryInvestigator(.*?)(\d+)$/);

      if (match) {
        const field = match[1]; // Field like Name_, StartDate_, EndDate_
        const index = parseInt(match[2], 10) - 1; // Convert to zero-based index

        if (!investigatorDetails[index]) {
          investigatorDetails[index] = {
            investigatorName: '',
            investigationStartDate: null,
            investigationEndDate: null
          };
        }

        if (field === "Name_") {
          investigatorDetails[index].investigatorName =
            investigatorLU.find(x => x.mstID === parseInt(item.tagValue))?.mstDesc || '';
        } else if (field === "StartDate_") {
          investigatorDetails[index].investigationStartDate = item.tagValue ? moment(item.tagValue, "YYYY-MM-DD") : null;
        } else if (field === "EndDate_") {
          investigatorDetails[index].investigationEndDate = item.tagValue ? moment(item.tagValue, "YYYY-MM-DD") : null;
        }
      }
    });

  // Set values to form
  // form.setFieldsValue({
  //   srvReqID: posChangeinPlanObj?.srvReqRefNo || null,
  //   ReferrelComments: asessorsRecomandationData?.ReferralComments
  //     ?? posChangeinPlanObj?.ReferralComments
  //     ?? null,
  //   ReferCaseTo: referCaseToDesc,
  //   InitiateInvestigation: asessorsRecomandationData?.PrimaryInitiateInvestigation !== undefined
  //     ? asessorsRecomandationData.PrimaryInitiateInvestigation
  //     : posChangeinPlanObj?.PrimaryInitiateInvestigation ?? null,
  //   SelectInvestigator: selectInvestigator,
  //   InitiateReInvestigation: referrelSheetData?.InitiateReInvestigation
  //     ?? posChangeinPlanObj?.InitiateReInvestigation
  //     ?? null,
  //   SelectReInvestigator: selectReInvestigator,
  //   investDetails: investigatorDetails
  // });

    form.setFieldsValue({
    srvReqID: mergedObj?.srvReqRefNo || null,
    ReferrelComments: asessorsRecomandationData?.ReferralComments
      ?? mergedObj?.ReferralComments
      ?? null,
    ReferCaseTo: referCaseToDesc,
    InitiateInvestigation: asessorsRecomandationData?.PrimaryInitiateInvestigation !== undefined
      ? asessorsRecomandationData.PrimaryInitiateInvestigation
      : mergedObj?.PrimaryInitiateInvestigation ?? null,
    SelectInvestigator: selectInvestigator,
    InitiateReInvestigation: referrelSheetData?.InitiateReInvestigation
      ?? mergedObj?.InitiateReInvestigation
      ?? null,
    SelectReInvestigator: selectReInvestigator,
    investDetails: investigatorDetails
  });

  handleViewComments();
}

// else if (customerData?.isClaimsAssessmentChecker && activeTabKey === "10") {
//   // Map the API response into an object for easy access by tag name
//   const posChangeinPlanObj = {};
//   POSContactData?.serviceRequestTransectionData?.forEach(element => {
//     posChangeinPlanObj[element.tagName] = element.tagValue;
//   });

//   // Map ReferCaseTo with description
//   const referCaseToValue = asessorsRecomandationData?.PrimaryReferCaseTo 
//     ?? (posChangeinPlanObj?.PrimaryReferCaseTo ? parseInt(posChangeinPlanObj?.PrimaryReferCaseTo) : null);

//   const referCaseToObj = referCaseToLU.find(item => item.value === referCaseToValue);
//   const referCaseToDesc = referCaseToObj ? referCaseToObj.mstDesc : null;

//   // Handle multiple investigator details dynamically
//   const investigatorDetails = [];
  
//   POSContactData?.serviceRequestTransectionData
//     .filter(item => item.tagName.startsWith("PrimaryInvestigator"))
//     .forEach(item => {
//       // Extract index and field name dynamically using regex
//       const match = item.tagName.match(/PrimaryInvestigator(.*?)(\d+)$/);
      
//       if (match) {
//         const field = match[1];         // Field name (StartDate, EndDate, Name)
//         const index = parseInt(match[2], 10) - 1; // Adjust to 0-based index

//         // Ensure the index exists in the array
//         if (!investigatorDetails[index]) {
//           investigatorDetails[index] = {
//             investigatorName: '',
//             investigationStartDate: null,
//             investigationEndDate: null
//           };
//         }

//         // Map the fields dynamically
//         if (field === "Name_") {
//           investigatorDetails[index].investigatorName = item.tagValue;
//         } else if (field === "StartDate_") {
//           investigatorDetails[index].investigationStartDate = item.tagValue ? moment(item.tagValue, "YYYY-MM-DD") : null;
//         } else if (field === "EndDate_") {
//           investigatorDetails[index].investigationEndDate = item.tagValue ? moment(item.tagValue, "YYYY-MM-DD") : null;
//         }
//       }
//     });

//   // Set form values
//   form.setFieldsValue({
//     srvReqID: posChangeinPlanObj?.srvReqRefNo || null,
//     ReferrelComments: asessorsRecomandationData?.ReferralComments
//       ?? posChangeinPlanObj?.ReferralComments
//       ?? null,
//     ReferCaseTo: referCaseToDesc,  // Set the description instead of ID
//     InitiateInvestigation: asessorsRecomandationData?.PrimaryInitiateInvestigation !== undefined
//       ? asessorsRecomandationData.PrimaryInitiateInvestigation
//       : posChangeinPlanObj?.PrimaryInitiateInvestigation ?? null,
//     investDetails: investigatorDetails, // Set multiple investigator records
//   });
// }



else if (customerData?.isClaimsAssessmentChecker && activeTabKey === "10") {
  // POSContactData?.serviceRequestTransectionData?.forEach(element => {
  //   posChangeinPlanObj[element.tagName] = element.tagValue;
  // });

  // const assessorDecisionId = parseInt(posChangeinPlanObj?.PrimaryAssesorsDecision);
  // const decisionDescId = parseInt(posChangeinPlanObj?.PrimaryDecisionDescription);

  // const assessorDecisionObj = assessorsDecisionLU?.find(item => item.mstID === assessorDecisionId);
  // const decisionDescObj = decisionDescriptionLU?.find(item => item.mstID === decisionDescId);

  // form.setFieldsValue({
  //   srvReqID: posChangeinPlanObj?.srvReqRefNo,
  //   ReferrelComments: asessorsRecomandationData?.ReferralComments || posChangeinPlanObj?.ReferralComments || null,
  //   AssesorsRecommendation: assessorDecisionObj === undefined ? posChangeinPlanObj?.PrimaryAssesorsDecision :  assessorDecisionObj ? assessorDecisionObj : null,
  //   ReasonForDecision: asessorsRecomandationData?.ReasonForDecision || posChangeinPlanObj?.ReasonForDecision || null,
  //   DecisionDescription: decisionDescObj ? decisionDescObj : null,
  //   PrimaryAssessorRemarks: posChangeinPlanObj?.PrimaryAssessorRecommendation,
  // });
  const mergedObj = {
    ...(POSContactData?.claimsDetails || {}),
    ...(POSContactData?.notification || {}),
    ...(POSContactData?.primaryUser || {}),
    
    
  };

  const assessorDecision = mergedObj?.primaryAssesorsDecision;
  const decisionDescId = parseInt(mergedObj?.primaryDecisionDescription);
  // const assessorDecisionId = mergedObj?.primaryAssesorsDecision;
  // const decisionDescId = parseInt(mergedObj?.primaryDecisionDescription);

  const assessorDecisionObj = assessorDecision; //assessorsDecisionLU?.find(item => item.mstID === assessorDecisionId);
  const decisionDescObj = decisionDescriptionLU?.find(item => item.mstID === decisionDescId);

  decisionForm.setFieldsValue({
    srvReqID: mergedObj?.srvReqRefNo,
    ReferrelComments: asessorsRecomandationData?.referralComments || mergedObj?.referralComments || null,
    AssesorsRecommendation: assessorDecisionObj === undefined ? mergedObj?.primaryAssesorsDecision : assessorDecisionObj,
    ReasonForDecision: asessorsRecomandationData?.ReasonForDecision || mergedObj?.reasonForDecision || null,
    DecisionDescription: decisionDescObj ? decisionDescObj : null,
    PrimaryAssessorRemarks: mergedObj?.primaryAssessorRecommendation,
  });

  handleViewComments();
}
if (customerData?.isClaimsAssessmentChecker && activeTabKey === "2"){
  const mergedObj = {
    ...(POSContactData?.claimsDetails || {}),
    ...(POSContactData?.notification || {}),
    ...(POSContactData?.primaryUser || {}),
  };
    const Defaultvalue=form.getFieldsValue()?.claimType|| claimDetailsData?.claimType || mergedObj?.claimType||""
if(Defaultvalue !==""){
  const defaultObj = {name: 'claimType'};
  handleDropdownChange(Defaultvalue,defaultObj);
}
}
},[activeTabKey])

const GetAssigneeEnquiry  =()=>{
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
      "monthendDate": "09/11/2023"
      },
      "requestBody": {
      "policyNumber": customerData?.policyNo,
      }
}
  let response = apiCalls.GetAssigneeEnquiry(obj);
  response
    .then((val) => {
      if (val?.data?.responseBody?.errorCode === "0") {
          let res = val?.data?.responseBody;
        form.setFieldsValue({
          AssignmentType:  assignmentData?.AssignmentType || res?.reasonCode || null,
          AssigneeName:  assignmentData?.AssigneeName || res?.assigneeName || null,
         // PolicyOwnerClientID_Old: res?.asigneeCode || details?.policyDetailsObj?.assigneeDetails?.assigneeID,
        })
      } else {
        message.error({
          content:
            val?.data?.responseBody?.errorMessage ||
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
const [jePassword, setJePassword] = useState("");
const handleApproveJE = async () => {debugger
  if (!jePassword || jePassword.trim() === "") {
    message.error("Please enter Journal Entry Password.");
    return;
  }
      try {
         const payload = {
         
          // userId: loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID,
          // JENO: 123456, // Replace with actual JE Number if available
          ApproverUserId: "F1146850",//loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID
          SRVReqID: POSContactData?.srvReqID,
          password: jePassword
        };

         const response = await apiCalls.JVApproval(payload);
          console.log("Calling JVApproval API...");
                if (response?.status === 200) {
                  message.success("JE Approved successfully.");
                } else {
                  message.error(response?.message || "Failed to Approve JE.");
                }
      } 
      catch (error) {
              message.error("Error Approving JE.");
            }
          }


const LoanEnquiry = async () => {
  try {
    setShowAlert(false);
   // setIsLoader(true);

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
        policyNo: details?.policyDetailsObj?.identifiers?.policyNo,
      },
    };

    let response = await apiCalls.LoanEnquiry(obj);
    
    if (response?.data?.responseBody?.errorcode === "0") {
      const res = response?.data?.responseBody?.loanEnquiryDetails;
      form?.setFieldsValue({
        LoanActive:  res?.hpleamt,
        OutstandingLoanAmount: res?.hcurbal
      });
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
    //setIsLoader(false);
  }
};

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
              const [firstName, lastName] = fullName.split(',').map(name => name.trim());
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
    const response = await apiCalls.getRelationsData(val?.bnysel);
    if (response?.data) {
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
    else if (item?.toLowerCase() === "lastrequirementreceiveddate") {
      const lastReceivedDate = new Date(date); // Convert the input date to a Date object
      const currentDate = new Date(); // Current date
  
      // Calculate the difference in milliseconds
      const diffInMilliseconds = currentDate - lastReceivedDate;
  
      // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 milliseconds)
      const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  
      // Bind the calculated difference to the form field "AgeingFromLastDocumentReceived"
      form.setFieldsValue({
        AgeingFromLastDocumentReceived: `${diffInDays} days`
      });
    }
};
const tabOrder = ["1","2","3","4","5","6","7","8","9","10","12","13","14"];
const handleNextClick = () => {
  const currentIndex = tabOrder.indexOf(activeTabKey);
  if (currentIndex < tabOrder.length - 1) {
    const nextTabKey = tabOrder[currentIndex + 1];
    setActiveTabKey(nextTabKey); // Move to the next tab
  }
};
  const handleSubmit = (values) => {
    // if(selectedSubType==="claimsrequest" && ["3"].includes(activeTabKey)){
    //     return handleClaimDetailsTabSave();
    //   }
    setIsLoading(true);
    setShowRaiseRequirementBtn(false);
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
      "TransactionData": getTransactionData(values) || [],
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
      ActiveTabKey: activeTabKey,
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
try{
    let val = apiCalls.genericAPI(obj);
    val
    .then((val) => {
        // if (val?.data) {
            setIsLoading(false);
            if(selectedSubType==="claimsrequest" && ["1", "2","3","4","5","6","7","8","9","10","11","12","13","14"].includes(activeTabKey)){
                if(activeTabKey==="1") {
                  setPolicyDetailsData(values);
                }
                else if(activeTabKey==="2"){
                  setClaimDetailsData(values);
                }
                else if(activeTabKey==="3"){
                  setPolicyCheckData(values);
                }
                else if(activeTabKey==="4"){
                  setReInstatementData(values);
                }
                else if(activeTabKey==="5"){
                  setAssignmentData(values);
                }
                else if(activeTabKey==="8"){
                  setClaimPaymentData(values);
                }
                else if(activeTabKey==="9"){
                  setIntimationData(values);
                }
                else if(activeTabKey==="10"){
                  setAsessorsRecomandationData(values);
                  setAlertTitle(val?.data?.header);
                setAlertData("Claim Assessed and moved to Claims Approver!");
                setNavigateTo("/claimsassessmentchecker")
                setShowAlert(true);
                return;
                }
                else if(activeTabKey==="12"){
                  setReferrelSheetData(values);
                }
                else if(activeTabKey==="13"){
                  setAsessorsRecomandationData(values);
                  setAlertTitle(val?.data?.header);
                setAlertData("Claim Assessed and moved to Claims Checker!");
                setNavigateTo("/claimsassessmentchecker")
                setShowAlert(true);
                return;
                }
                // setAlertTitle(val?.data?.header);
                // setAlertData("Details Saved");
                // setShowAlert(true);
                message.destroy();
                message.success({
                 content: "Details Saved.",
                 className: "custom-msg",
                 duration: 2,
               });
               if(activeTabKey!=="10"){
                return handleClaimDetailsTabSave();
               }
              }
              else {
                setAlertTitle(val?.data?.header);
                setAlertData(val?.data?.message);
                setShowAlert(true);
              }
        // } else {
        //   message.error({
        //     content:
        //       val?.data?.responseBody?.errormessage ||
        //       "Something went wrong please try again!",
        //     className: "custom-msg",
        //     duration: 2,
        //   });
        // }
        // setIsLoading(false);
      }).catch((error) =>{
                message.error({
                  content:
                    val?.data?.responseBody?.errormessage ||
                    "Something went wrong please try again!",
                  className: "custom-msg",
                  duration: 2,
                });
              })
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

  const handleRadioChange =(e,item)=>{
    if(item.name === 'InitiateInvestigation' && e.target.value === 'yes'){
      setIsDisable(false)
     }else{
       setIsDisable(true) 
     }
    if(item.name === 'AddComments' && e.target.value === 'yes'){
      setShowCommentsModal(true);
      setAddComments(null);
    }
  }

  const handleAssessorDecision = (e) => {
    const value = e.target.value ? "Yes" : "No"; 
    setIsAssessorDecision(value);
    setAssessorRecErr(false);
    if (value === 'No') {
      // Clear fields when 'No' is selected
      form.setFieldsValue({
        CheckersDecision: undefined,
        DecisionDescription1: undefined,
      });
    }
  };

  const checkerDecHandler = (val) => {debugger
    const valueFind = assessorsDecisionLU.find((item) => item.mstID === val);
    setCheckerDecision({ id: val, text: valueFind?.mstDesc });
    setCheckerDecErr(false);

    // Save both id and text in the form for later payload use
    form.setFieldsValue({
      CheckersDecision: val,// { id: val, text: valueFind?.mstDesc },
      DecisionDescription1: null
    });

    // Filter Decision Descriptions based on selected Checkers Decision ID and map to {value, label}
    const filtered = props?.propsData?.decisionDescriptionLU
      .filter(desc => Number(desc.mstParentID) === Number(val))
      .map(desc => ({ value: desc.mstID, label: desc.mstDesc }));
    setFilteredDescriptions(filtered);
    console.log("Filtered Descriptions:", filtered);
  };
  
  
  const approverRemarksHandler = (e) => {
    setApproverRemarks(e.target.value);
    setApproverRemErr(false);
  };
  
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
  const handleDropdownChange = (e, item) => {debugger;
    if (item.name === "claimType") {
      setClaimTypee((prevClaimTypee) => e);
    }
    else if(item.name === "ClaimIntimatedBy")
    {
      setClaimIntimatedBy((prevClaimTypee) => e);
    }
    else if(item.name?.toLowerCase() === "natureofdeath"){
        setIsAccidentSelection(e);
      }
      else if(item.name === 'AssesorsDecision' && [3,4].includes(e)){
        ClaimsData[selectedSubType]?.AssessorsRecommendation_Referrel_Details1?.forEach(element => {
          if(['ReasonForDecision'].includes(element?.name)){
            element.hide = false
          }
        })
        setUpdateFields(!updateFields);
      }
      
      else if(item.name === "CheckersDecision")
        {debugger
          const filtered = props?.propsData?.decisionDescriptionLU.filter(
            (x) => Number(x.mstParentID) === Number(e)
          );
          setCheckerDecisionDescription(filtered);
        }
        else if(item.name === 'AssesorsDecision' && ![3,4].includes(e)){
        ClaimsData[selectedSubType]?.AssessorsRecommendation_Referrel_Details1?.forEach(element => {
          if(['ReasonForDecision'].includes(element?.name)){
            element.hide = true
          }
        });
        setUpdateFields(!updateFields);
      }

  };
  const getUWFollowups = ()=>{
    let response = apiCalls.GetUWFollowups(customerData?.policyNo);
    response
      .then((val) => {
        if (val?.data?.responseBody?.errorCode !== "1") {
             setFollowUpsData(val?.data?.responseBody?.followupcodeList);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }

  const visibilityRules = {
    NameofiIntimatingPerson: (context) => context.claimIntimatedBy !== "nominee",
    NameChangeAffidavit: (context) => context.isPennyDropStatus,
    NomineeDeathCertificate: (context) => context.isBeneficiaryChangeRequired,
    CopyofFirstInformationReport: (context) => context.isAccidentSelection == 3,
    CopyofPostMortemReport: (context) => context.isAccidentSelection === 3,
    NatureofDeath: (context) => context.ClaimTypee !== "CI"&& context.ClaimTypee  !== "TPD"&& context.ClaimTypee  !== "Health",
    DateofDeath: (context) => context.ClaimTypee !== "CI"&& context.ClaimTypee  !== "TPD" && context.ClaimTypee  !== "Health",
    CauseofEvent: (context) => context.ClaimTypee === "CI" || context.ClaimTypee  === "TPD",
    DateofEvent: (context) => context.ClaimTypee === "CI" || context.ClaimTypee  === "TPD"|| context.ClaimTypee  === "Health",
    typeofcondition:(context) => context.ClaimTypee === "Health" ,
    exactCauseOfIllness:(context) => context.ClaimTypee === "Health" ,
    exactCauseOfDeath:(context) => context.ClaimTypee !== "Health" ,
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
            form ={selectedSubType === "claimsrequest" ? formMapping[activeTabKey] || form : form}
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
            laNomineeAddressLU={laNomineeAddressLU}
            subStageLU={subStageLU}
            assessorsDecisionLU={assessorsDecisionLU}
            handleRadioLink={handleRadioLink}
            policyStatusDOBLU={policyStatusDOBLU}
            dataBseCHeckLU = {dataBseCHeckLU}
            hotSpotCheckLU = {hotSpotCheckLU}
            referCaseToLU = {referCaseToLU}
            reinstatementDecisionLU={reinstatementDecisionLU}
            withDGHLU={withDGHLU}
            investigatorLU={investigatorLU}
            decisionDescriptionLU={decisionDescription}
            checkerDecisionDescriptionLU={checkerDecisionDescription}
        ></DetailsForm>
    );
};


const handleRadioLink = (item) => {
  if(item.name ==="ViewLifeAsiaTransactions"){
    setLifeAsiaTransactionModal(true);
  }
  if (["Name De-Dupe Match", "OFAC"].includes(item?.label)) {
    if (POSContactData?.deDupPayload?.length > 0) {
      for (let index in POSContactData?.deDupPayload) {
        if (selectedSubType) {
          if (POSContactData?.deDupPayload[index]?.type === 'NEGATIVELIST') {
            setNameDeDupeData(POSContactData?.deDupPayload[index]?.deDupPayload);
          }
          else if (POSContactData?.deDupPayload[index]?.type === 'Name') {
            setNameDeDupeData(POSContactData?.deDupPayload[index]?.deDupPayload);
          }
        }

      }
    }
    setNameDeDupeModal(true)
  }
  else if(["View Agent Sourcing Details"].includes(item?.label)){
    setShowAgentSourcing(true);
    setViewTransLoader(true);
    let response = apiCalls.GetClaimPolicyDetails(details?.policyDetailsObj?.salesDetails?.agentCode);
      response
        .then((val) => {
          if (val?.data?.responseHeader?.errorcode === "0") {
            setShowAgentSourcingDetails(val?.data?.responseBody?.claims_PolicyDetails);
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
          setViewTransLoader(true);
        });
  }
}
// const handleofacData = (data) => {
//   let name=data?.NomineeFirstName+" "+data?.NomineeLastName;
//   setOfcListModal(true)
//   let obj = {
//     "requestHeader": {
//       "source": "",
//       "policyNo": details?.policyDetailsObj?.identifiers?.policyNo,
//       "applicationNo": details?.policyDetailsObj?.identifiers?.applicationNo,
//       "dob": ""
//     },
//     "requestBody": {
//       "searchtype": "C",
//       "lastName": "",
//       "percentage": 0,
//       "percentageCIP": 0,
//       "type": "",
//       "country": "",
//       "dob": "",
//       "name": name,
//       "applicationNo": details?.policyDetailsObj?.identifiers?.applicationNo,
//       "createdby": "",
//       "source": "",
//       "panNo": "",
//       "passportNo": "",
//       "employercheck": ""
//     }
//   }
//   let response = apiCalls.getOFACDetailsApi(obj);
//   response
//     .then((val) => {
//       if (val?.data) {
//         setNegativeList(val?.data?.responseBody?.ofac)
//       } else {
//         message.error({
//           content:
//             val?.data?.responseBody?.errormessage ||
//             "Something went wrong please try again!",
//           className: "custom-msg",
//           duration: 2,
//         });
//       }
//       setIsLoading(false);
//     })
//     .catch((err) => {
//       setIsLoading(false);
//     });
// }

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
  const getTransactionData = (values) => {  
    if (selectedSubType === "claimsrequest" && activeTabKey === "1") {
      let newArray = [
        { Status: "Create", TagName: "policyType", TagValue: values?.policyType || ""},
        { Status: "Create", TagName: "claimType", TagValue: values?.claimType || ""},
        { Status: "Create", TagName: "ApplicationDate", TagValue: values?.ApplicationDate || ""},
        { Status: "Create", TagName: "claimCategory", TagValue: values?.claimCategory || ""},
        { Status: "Create", TagName: "custRole", TagValue: values?.custRole || ""},
        { Status: "Create", TagName: "NatureofDeath", TagValue: values?.NatureofDeath || ""},
        { Status: "Create", TagName: "exactCauseOfDeath", TagValue: values?.exactCauseOfDeath || ""},
        { Status: "Create", TagName: "DateofDeath", TagValue: values?.DateofDeath || ""},
        { Status: "Create", TagName: "policyStatusOnDateOfDeath", TagValue: values?.policyStatusOnDateOfDeath || ""},
        { Status: "Create", TagName: "claimsApplicable", TagValue: values?.claimsApplicable || ""},
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
              TagValue: property?.includes("LastReinstatementDate") ? moment(record[property] + 1).format("DD/MM/YYYY") : record[property]
            };
            updatedDataList.push(obj);
          }
        });
      });
      updatedDataList = [...updatedDataList, ...newArray];
      return updatedDataList;
    }
    else if (selectedSubType === "claimsrequest" && activeTabKey === "2") {
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
          { Status: "Create", TagName: "ClaimReceivedOn", TagValue: values?.ClaimReceivedOn || ""},
          { Status: "Create", TagName: "ClaimIntimatedOn", TagValue: values?.ClaimIntimatedOn || ""},
          { Status: "Create", TagName: "IntimatingPersonRemarks", TagValue: values?.IntimatingPersonRemarks || ""},
          { Status: "Create", TagName: "DateofIntimation", TagValue: values?.DateofIntimation || ""},
          { Status: "Create", TagName: "RegistrationEffectiveDate", TagValue: values?.RegistrationEffectiveDate || ""},
        ]
      }
      else if (selectedSubType === "claimsrequest" && activeTabKey === "3") {
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
        "address",
        "NomineeEmail",
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
              TagValue: property?.includes("NomineeDOB_New") ? moment(record[property] + 1).format("DD/MM/YYYY") : record[property]
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
    else if (selectedSubType === "claimsrequest" && activeTabKey === "7") {
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
        "NameMatch"
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
      updatedDataList = [...updatedDataList, ...newArray];
      return updatedDataList;
    }
    else if (selectedSubType === "claimsrequest" && activeTabKey === "6") {
      return [
        { Status: "Create", TagName: "RaiseRequirement", TagValue: isShowRequirements|| ""},
        { Status: "Create", TagName: "Requirements", TagValue: selectedRequirements|| ""},
      ]
    }
    else if (selectedSubType === "claimsrequest" && activeTabKey === "7") {
      return [
        { Status: "Create", TagName: "RecordIntimation", TagValue: values?.RecordIntimation || ""},
        { Status: "Create", TagName: "FlagDeathinLifeAsia", TagValue: values?.FlagDeathinLifeAsia || ""},
        { Status: "Create", TagName: "SendRequirementCommunuication", TagValue: values?.SendRequirementCommunuication || ""},
      ]
    }
    else if (selectedSubType === "claimsrequest" && activeTabKey === "8") {
      let newArray = [
        { Status: "Create", TagName: "WithinFGLIRetention", TagValue: values?.WithinFGLIRetention|| ""},
        { Status: "Create", TagName: "FGLIRetention", TagValue: values?.FGLIRetention|| ""},
        { Status: "Create", TagName: "ReInsurerName", TagValue: values?.ReInsurerName|| ""},
        { Status: "Create", TagName: "ReInsurerParticipation", TagValue: values?.ReInsurerParticipation|| ""},
        { Status: "Create", TagName: "LifeAsiaTransactions", TagValue: values?.LifeAsiaTransactions|| ""},
        { Status: "Create", TagName: "TotalClaimPayable", TagValue: values?.formattedTotalPayoutAmount|| ""},
      ]
      const properties = [
        "withinRetention",
        "retentionAmount",
        "reInsurerName",
        "participation",
      ];
      let updatedDataList = [];
      reInsureDetails?.forEach((record, recordIndex) => {
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
    if (selectedSubType === "claimsrequest" && activeTabKey === "9") {
      return [
        { Status: "Create", TagName: "ClaimIntimatedBy", TagValue: values?.ClaimIntimatedBy || ""},
        { Status: "Create", TagName: "ClaimIntimatedOn", TagValue: values?.ClaimIntimatedOn || ""},
        { Status: "Create", TagName: "ClaimRegisteredBy", TagValue: values?.ClaimRegisteredBy || ""},
        { Status: "Create", TagName: "ClaimRegisteredOn", TagValue: values?.ClaimRegisteredOn || ""},
        { Status: "Create", TagName: "AssesmentDoneBy", TagValue: values?.AssesmentDoneBy || ""},
        { Status: "Create", TagName: "AssesmentDoneOn", TagValue: values?.AssesmentDoneOn || ""},
      ]
    }
    else if (selectedSubType === "claimsrequest" && activeTabKey === "10") {debugger
      let formData=form.getFieldsValue()
      let newArray = [
        { Status: "Create", TagName: "AssessorAssesorsDecisionId", TagValue: values?.CheckersDecision || "" },
        { Status: "Create", TagName: "AssessorAssesorsDecisionText", TagValue: values?.CheckersDecision.text || "" },
        { Status: "Create", TagName: "AssessorDecisionDescriptionID", TagValue: values?.DecisionDescription1.value || "" },
        { Status: "Create", TagName: "AssessorDecisionDescriptionText", TagValue: values?.DecisionDescription1.label || "" },
        { Status: "Create", TagName: "AssessorsRecommendation", TagValue: values?.AssessorsRecommendation == false ? 'No' : 'Yes' || "" },
        { Status: "Create", TagName: "AssesmentCheckerRemarks", TagValue: values?.AssesmentCheckerRemarks || "" },
      ];
      const properties = [
        "withinRetention",
        "retentionAmount",
        "reInsurerName",
        "participation",
      ];
      let updatedDataList = [];
      reInsureDetails?.forEach((record, recordIndex) => {
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
  };

  const handleAccNumberChange = (index, field,value) => {
    const updatedData = [...beneficiaryDetailsData];
    updatedData[index][field] = value;
    setBeneficiaryDetailsData(updatedData);
  };
  const handleBeneficiaryBankDetailsChange = (index, field,value) => {
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

  const getIFSCBankDetails =async(ifscCode,row,index)=>{
    setIsLoading(true);
    let response = await apiCalls.getIFSCBanks(ifscCode);
    if (response.statusText) {
          if (response?.data.length >0) {
            nomineebankform.setFieldsValue({
              beneficiaryBankData: {
                  [row?.id]: {
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
        }
  }
  const handleBackClick = () => {
    const previousTabKey = (parseInt(activeTabKey, 10) - 1).toString();
    if (parseInt(previousTabKey, 10) >= 1) {
      setActiveTabKey(previousTabKey);
    }
  };

  const InitiatePennyDropp = (row) => {
    setIsPennyDropStatus(false);
    const values = nomineebankform.getFieldsValue();
    if(!values?.beneficiaryBankData[row?.id]?.AccountNumber || !values?.beneficiaryBankData[row?.id]?.AccountHolderName || !values?.beneficiaryBankData[row?.id]?.IFSC){
      message.destroy();
      message.error({
        content:"Enter All Mandatory Feilds",
        className: "custom-msg",
        duration: 2,
      });
     return;
    }
    
    let obj = {
      "accountNumber": BankAccNo || values?.beneficiaryBankData[row?.id]?.AccountNumber,
      "accountHolderName":values?.beneficiaryBankData[row?.id]?.AccountHolderName || "",
      "ifsc": values?.beneficiaryBankData[row?.id]?.IFSC,
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
                [row?.id]: {
                  InitiatePennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.bankResponse,
                  NameasperPennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName,
                },
            },
        });
        setIsPennyDropStatus(false);
         }else{
          nomineebankform.setFieldsValue({
            beneficiaryBankData: {
                [row?.id]: {
                  InitiatePennyDrop: result?.data?.responseHeader?.message
                },
            },
        });
        setIsPennyDropStatus(true);
         }
        } else {
          setIsLoading(false);
          setIsPennyDropStatus(true);
          nomineebankform.setFieldsValue({
            beneficiaryBankData: {
                [row?.id]: {
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
        form.setFieldsValue({
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

  const handleShareChange = (index, newShare) => {
    const updatedNomineeData = [...posUpdateNomineeData];
    updatedNomineeData[index].Share_New = newShare;
    setPosUpdateNomineeData(updatedNomineeData);
  };
  
  const handleBankAccNumber = (e, selectedFiledName,row) => {
    const selectedRowObj = nomineebankform.getFieldsValue();
    const obj = selectedRowObj?.beneficiaryBankData[row.id];
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
    if (parseInt(nextTabKey, 10) <= 14) {
      setActiveTabKey(nextTabKey);
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
  const handleAssessmentSave =()=>{
    if(isAssessorDecision !== null && checkerDecision !== null && approverRemarks !== null)
      setShowSubmitBtn(true);
    else {
      if(isAssessorDecision === null)
        setAssessorRecErr(true);
      else if(checkerDecision === null)
        setCheckerDecErr(true);
      else if(approverRemarks === null)
        setApproverRemErr(true);
    }
  };

  const getMandatetagEnquiry = ()=>{
    //setIsLoading(true);
    //setDisableOTP(true);
    //setECGRequestField(null);
    getMandateData();
    let empID = loggedUser?.allRoles[0]?.employeeID
    let response = apiCalls.getMandatetagEnquiry(customerData?.policyNo, empID);
    response
      .then((val) => {
        if (val?.data?.responseBody?.errorCode !== "1") {
            const sortedData = [...val?.data?.responseBody?.bankDetailsList];
    sortedData.sort((a, b) => {
      return new Date(convertDate(b.effdate)) - new Date(convertDate(a.effdate));
    });
          const res = sortedData[0];
          const isECGRequestValue = res?.mandstat === "10" ? "Active" : "Mandate Tag Not Found";
        //  setECGRequestField(isECGRequestValue);
       // form?.setFieldsValue({ECSRequest: isECGRequestValue})
        // setMandateDetailsData(sortedData);
        if(["mandatedetails", "mandatecancellation", "holdmandate" ].includes(selectedSubType)){
          const bankDetailsList = val?.data?.responseBody?.bankDetailsList;
          let primary = null;
          let secondary = null;
          let tertiary = null;
      
          const accountsWithTag = bankDetailsList.filter(account => account.zmandtag === 'P');
          const accountsWithoutTag = bankDetailsList.filter(account => account.zmandtag === '');
      
          accountsWithoutTag.sort((a, b) => new Date(a.effdate) - new Date(b.effdate));
      
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
      
          const taggedAccounts = [primary, secondary, tertiary].filter(Boolean).map((account, index) => ({
            ...account,
            tag: index === 0 ? 'Primary' : index === 1 ? 'Secondary' : 'Tertiary'
          }));
      
         // setMandateDetailsData(taggedAccounts);
         }
        // else if(selectedSubType==="newmandateregistration"||selectedSubType==="holdmandate"||selectedSubType==="restartmandate"||selectedSubType==="mandatecancellation"){
        //   getMandateData(res?.mandref);
        //   setMandRefNo(res?.mandref);
        // }
        // } else {
        //   const isECGRequestValue = val?.data?.responseBody?.errorMessage;
        //   setECGRequestField(isECGRequestValue);
        // form?.setFieldsValue({ECSRequest: isECGRequestValue})
        //   setIsLoading(false);
        // }
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }

  const getMandateData = (mandref)=>{
    //setIsLoading(true);
   // setDisableOTP(true);
   // setECGRequestField(null);
    let response = apiCalls.getMandateData(customerData?.poClientID||details?.policyDetailsObj?.identifiers?.po_ClientID,mandref,customerData?.applicationNo);
    response
      .then((val) => {
        if (val?.data?.responseBody?.errorCode !== "1") {
          const res = val?.data?.responseBody
        // form?.setFieldsValue({
        //   PaymentMethod: "NACH",
        //   NACHStatus:  res?.statdets,
        //   RegisteredOn: res?.effdate ? convertDate(res?.effdate) : null,
        //   BankName: res?.bankkey,
        //   BankAccountNumber: res?.bankacckey,
        //   BankIFSC: "",
        //   PreferredDebitDate:res?.zddday || null,
        //   MaxDebitAmounat: res?.mandamt,
        //   NACHValidTill: handleAddYears()
        // })
        //   setIsLoading(false);
        } 
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }

  const POSActionsOnContactDetails = (values, status, list) => {
    //let content  = status === 'REJECTED' ? "Please Select Documents to Reject": "Please Select Documents to move  Internally"
    let seletedRequerimentList =[]; 
//     if(status === 'INTERNAL'){
//       seletedRequerimentList = list
//      }
//     else if (status === 'REJECTED'){
// seletedRequerimentList = raiseRequerimentList
//      ?.filter((e) => e.status === true)
//      ?.map((e) => e.raiseReqId);
//      let dummy = '';
//      seletedRequerimentList.forEach(x => {
//        dummy = x.value;
//      })
//     }
   
    // if(status !== 'APPROVED'){
    //  if((seletedRequerimentList.length===0  && status === 'REJECTED') || (seletedRequerimentList.length===0 && status === 'INTENAL')){
    //    setIsLoader(false);
    //    setRequirementLoader(false);
    //    message.destroy();
    //    message.error({
    //      content: content,
    //      className: "custom-msg",
    //      duration: 3,
    //    });
    //  return;
    //  }
    // }
 

    let obj = {
      TransectionId: 1,
      SrvReqRefNo: POSContactData?.srvReqRefNo || serviceRequestId, 
      Status: status,
      RequirementList: seletedRequerimentList,
      UsrID: loginInfo?.userProfileInfo?.profileObj?.userName,
      RoleID: loginInfo?.userProfileInfo?.profileObj?.role,
      // "RequirementComments":requirementCmnt,
      Comments: values?.comment,
      TransactionPayload: [
        {
          "Status": "Update",
          "TagName": "POSComments1",
          "TagValue": values?.Comments
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
    )}
    let response = apiCalls.POSActionsOnContactDetails(obj);
    response
      .then((val) => {
        if (val?.data) {
          setAlertTitle(status === 'REJECTED' ?  "Requirements Raised" : `${val?.data?.message}`);
          setNavigateTo("/claimsassessmentchecker");
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
  const handleRequirementSubmit = () => {
    const formData = form.getFieldValue();
    setRequirementLoader(true);
  //  if(isShowPOSScreen){
      POSActionsOnContactDetails(null, "REJECTED");
    // }else{
    //   saveRequest(formData);
    // }
    
  };
  const getRaiseRequirements = () => {
    setRaiseRequirementOpen(true);
    setRequirementLoader(true);
    let obj = {
      calltype: props?.propsData?.selectedCallType,
      subtype: props?.propsData?.selectedSubTypeId,
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


  const GetClaimsPrimaryAssessmentEnquiry = async () => {
    setIsLoading(true);
    try {
      const response = await apiCalls.GetClaimsPrimaryAssessmentEnquiry(loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID, details?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo);
      if (response?.data?.responseHeader?.errorcode === "0") {
        setIsRiderData(response?.data?.responseBody?.claimsPrimaryAssessmentEnquiry);
        if(activeTabKey === "8") {
          const deathAssuredNumber = Number(response?.data?.responseBody?.dsumins);
          setDeathSumAssured(deathAssuredNumber);
          reInsureForm.setFieldsValue({
            TotalClaimPayable: response?.data?.responseBody?.dsumins
          })
        }
    setIsLoading(false);
      } else {
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
  const handleViewComments =()=>{
    apiCalls
    .GetClaimsViewCommentsInfo(POSContactData?.srvReqID)
    .then((val) => {
      if (val?.data?.length > 0) {
        // Concatenate all comments into a single string
        const commentsString = val.data
        .map((item) => {
          const formattedDate = moment(item.createdDate).format("MM/DD/YYYY, hh:mm:ss A");
          return  item.comments ? `${formattedDate}: ${item.comments}` : "";
        })
        .join("\n");

        setAllComments(val?.data);
         
         // referrelSheetForm.resetFields(['referralViewComments']); // Optional reset
          referrelSheetForm.setFieldsValue({
            referralViewComments: commentsString,
          });
          setForceUpdate((prev) => !prev);
      } else {
        console.warn("No comments found.");
      }
    })
    .catch((err) => {
      console.error("Error fetching comments:", err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  
  };

  const handlePastComments =(values)=>{
    setIsLoading(true);
    const newComment = addComments?.trim();
    if(!newComment || newComment === " "){
        setIsLoading(false);
        return null;
    }

    let response = apiCalls.GetClaimsCommentsInfo(POSContactData?.srvReqID,addComments,loginInfo?.userProfileInfo?.profileObj?.name);
    response
      .then((val) => {
      message.success(val?.data);
      const newComment = {
        "createdDate": new Date(),
        "comments" : addComments
      };
      setAllComments((prevComments) => [...prevComments, newComment,]);
      setShowCommentsModal(false);
      setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const handleReferralCmtCahnge =(e)=>{
   setIsReferallData(e.target.value);
  }
 const handleAddComments =()=>{
    referrelSheetForm.resetFields(['referralViewComments']);
    setForceUpdate((prev) => !prev);
  }
  const handleInvestAdd = () => {
    const newData = {
      id: investDetails?.length + 1,
      investigatorName: '',
      investigationStartDate: '',
      investigationEndDate: '',
    };
    setInvestDetails([...investDetails, newData]);
  };
  const handleInvestNameChange = (index, value) => {
    const updatedData = [...investDetails];
    updatedData[index].investigatorName = value;
    setInvestDetails(updatedData);
  };
  const handleInvestStartDOB = (newDob, index) => {
    const updatedNomineeData = [...investDetails];
    updatedNomineeData[index].investigationStartDate = newDob;
    setInvestDetails(updatedNomineeData);
  };
  const handleInvestEndDOB = (newDob, index) => {
    const updatedNomineeData = [...investDetails];
    updatedNomineeData[index].investigationEndDate = newDob;
    setInvestDetails(updatedNomineeData);
  };
  
  
   const handleInvestDelete = (id, index) => {
    if (investDetails?.length > 1) {
      form.setFieldsValue({
        investDetails: {
          [id]: {
            investigatorName: '',
      investigationStartDate: '',
      investigationEndDate: '',
          },
        },
      });
      const updatedupdateNomineeData = investDetails?.filter((row) => row.id !== id);
      setInvestDetails(updatedupdateNomineeData);
      // Reset the form instance to reflect the changes
      reInsureForm.resetFields([`investDetails[${index}].investigatorName`, `investDetails[${index}].investigationStartDate`, `investDetails[${index}].investigationEndDate` ],);
    }
  };

  const getAge = (dob) => {
  if (!dob) return null;
  const birth = new Date(dob);
  const diff = Date.now() - birth.getTime();
  const ageDt = new Date(diff);
  return Math.abs(ageDt.getUTCFullYear() - 1970);
};

  const handleDobChange = (newDob, index) => {
    const updatedNomineeData = [...isRiderData];
    updatedNomineeData[index].LastReinstatementDate = newDob;
   setIsRiderData(updatedNomineeData);
  };
  const handleStatsDateofDeath = (index, value) => {
    const updatedData = [...isRiderData];
    updatedData[index].StatusonDateofDeath = value;
    setIsRiderData(updatedData);
  };
  const handleReInsureNameChange = (index, value) => {
    const updatedData = [...reInsureDetails];
    updatedData[index].reInsurerName = value;
    setReInsureDetails(updatedData);
  };

   const handleRetentionChange = (index, value, row) => {
    const updatedData = [...reInsureDetails];
    updatedData[index].withinRetention = value;
    setReInsureDetails(updatedData);
  };
  const handleRoleChange = (index, value) => {
    const updatedData = [...reInsureDetails];
    updatedData[index].retentionAmount = value;
    setReInsureDetails(updatedData);
  };
  
  const handleParticipationChange = (index, value) => {
    const updatedData = [...reInsureDetails];
    updatedData[index].participation = value;
    setReInsureDetails(updatedData);
  };

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
                  Policy Details
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
        onFinish={handleNextClick}
        autoComplete="off"
      >
                    {renderDetailsForm("Primary_Policy_Details1")}
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
                          <th>Issue Date</th>
                          <th>Last Reinstatement Date</th>
                          <th>Status</th>
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
                                            name={['isRiderData', index, 'LastReinstatementDate']}
                                            className="inputs-label mb-0"
                                            initialValue={row?.LastReinstatementDate ? dayjs(row?.LastReinstatementDate, 'DD/MM/YYYY') : null}
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
                                              onChange={(e) => handleDobChange(e, index)}
                                            />
                                          </Form.Item>
                                        </td>
                                        <td>
                                          <Form.Item
                                            name={['isRiderData', index, 'StatusonDateofDeath']}
                                            className="inputs-label mb-0"
                                            initialValue={row?.StatusonDateofDeath ? parseInt(row?.StatusonDateofDeath) : null}
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
                                              value={row?.StatusonDateofDeath}
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
                      Next 
                      </Button>
                    </div>
                  </Form>

            </TabPane>
            <TabPane
              tab={
                <span>
                  Claim Details
                </span>
              }
              key="2"
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
        onFinish={handleNextClick}
        autoComplete="off"
      >
                    {renderDetailsForm("Assessment_Checker_Policy__Details")}
                    <div className="contact-details-btn">

                      <Button type="primary" className="primary-btn" htmlType="submit"
                      >
                      Next
                      </Button>

                    </div>
                 
                  </Form>
            </TabPane>
            <TabPane  tab={<span>Intimation Details</span> } key="3">
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
        onFinish={handleNextClick}
        autoComplete="off"
      >
                    {renderDetailsForm("Primary_Intimation_Details1")}
                    <div className="contact-details-btn">

                      <Button type="primary" className="primary-btn" htmlType="submit"
                      >
                       Next
                      </Button>

                    </div>
                  </Form>
            </TabPane>
            <TabPane
              tab={
                <span>
                 Policy Checks
                </span>
              }
              key="4"
            >
              {(selectedSubType === "claimsrequest") &&
                <>
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
        onFinish={handleNextClick}
        autoComplete="off"
      >
                    {renderDetailsForm("PolicyChecks_Claim_Details1")}
                    <div className="contact-details-btn">

                      <Button type="primary" className="primary-btn" htmlType="submit"
                      >
                       Next
                      </Button>

                    </div>
                  </Form>

                </>}
            </TabPane>
            <TabPane  tab={<span>Reinstatement Details</span> } key="5">
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
        onFinish={handleNextClick}
        autoComplete="off"
      >
                    {renderDetailsForm("Reinstatement_Details_AssessmentChecker_Details")}

                    <div className="reuirement mt-16">
                    <h4 className="subtype-headings fs-16 fw-500">
                   View Medical Disclosures
                      </h4>{"  "}
           <table className="table responsive-table assistanceTable">
          <thead>
            <th>Date</th>
            <th>Remarks</th>
          </thead>
           <tbody>
                {followUpsData?.map((item, index) => (
                    <tr key={index + 1}>
                       <td>{item.reminderDate? convertDate(item.reminderDate):""}</td>
                       <td>{item.remarks}</td>
                    </tr>
                  ))}
                {followUpsData?.length === 0 &&
                  <tr>
                    <td colSpan={2}>
                      <div className="text-center"><span>No Data Available</span></div>
                    </td>
                  </tr>}
              </tbody>
           </table>
         </div>
                    <div className="contact-details-btn">

                      <Button type="primary" className="primary-btn" htmlType="submit"
                      >
                       Next
                      </Button>

                    </div>
                  </Form>
            </TabPane>
            {details?.policyDetailsObj?.assigneeDetails?.isPolicyAssigned === 'Y' &&<>
            {/* <TabPane  tab={<span>Assignment Details</span> } key="5">
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
        onFinish={handleNextClick}
        autoComplete="off"
      >
                    {renderDetailsForm("AssignmentDetails_Claim_Details")}
                    <div className="contact-details-btn">

                      <Button type="primary" className="primary-btn" htmlType="submit"
                      >
                       Next
                      </Button>

                    </div>
                  </Form>
            </TabPane> */}
            </>}
            {(ClaimTypee  !== "CI" && ClaimTypee  !== "TPD") &&<>
            <TabPane
              tab={
                <span>
                  Beneficiary Details
                </span>
              }
              key="6"
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
        onFinish={handleNextClick}
        autoComplete="off"
      >
           <div className="mb-16">
                  {renderDetailsForm("BeneficiaryDetails_Claim_Details1")}
                  </div>

              <div className="mb-16">
              {/* <Form.Item label="Beneficiary Changed ?">
                    <Radio.Group onChange={e=>setIsBeneficiaryChangeRequired(e.target.value)}
                        value={isBeneficiaryChangeRequired}  disabled>
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Form.Item> */}
                   <h4 className="subtype-headings fs-16 fw-500">
                   View Existing Beneficiary Details
                      </h4>{"  "}
                  <div className="table-container email-table">
                    <table className="responsive-table">
                      <thead>
                        <tr>
                          <th>Nominee First Name</th>
                          <th>Nominee Last Name</th>
                          <th>Date of Birth</th>
                          <th>Role</th>
                          <th>Relationship</th>
                          <th>% Share</th>
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
                              <Radio.Group
                                // onChange={(e) => handleStatusAliveChange(index, e.target.value)}
                                value={statusAliveValues[index] ?? true}>
                                <Radio value={true}>Yes</Radio>
                                <Radio value={false}>No</Radio>
                              </Radio.Group>
                            </td>
                          </tr>
                        ))}
                      
                        {existingNomineeData?.length === 0 && (
                          <tr>
                            <td colSpan="5">
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
               {/* <Form.Item label="Is Existing Nominee Alive?"
               name="isExistingNomineeAlive" // name attribute for form binding
              // initialValue={isBeneficiaryChangeRequired} // set initial value here
               
               >
                    <Radio.Group 
                    //onChange={e=>setIsBeneficiaryChangeRequired(e.target.value)}
                    disabled={true} 
                    >
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Form.Item> */}

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

                  {isBeneficiaryChangeRequired&&<>
                    <h4 className="subtype-headings fs-16 fw-500">
                   View New Beneficiary Details
                   {/* <span>
                   {Edit && <EditOutlined       onClick={() => {handleEdit('edit');setIsEdit(false)}} className="editIconn"/>}

{!Edit && <CloseOutlined   onClick={() => {handleEdit('close'); setIsEdit(true)}} className="editIconn" />}
                   </span> */}
                      </h4>{"  "}
                    <div className="table-container email-table">
                    <table className="responsive-table">
                      <thead>
                        <tr>
                          <th>Beneficiary First Name</th>
                          <th>Beneficiary Last Name</th>
                          <th>Date of Birth</th>
                          <th>Role</th>
                          <th>Relationship</th>
                          <th>% Share</th>
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
disabled={!isEditNominee}
maxLength={100}
//onChange={(e) => handleNomineeFirstNameChange(index, e.target.value)}

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
disabled={!isEditNominee}
maxLength={100}
//onChange={(e) => handleNomineeLastNameChange(index, e.target.value)}

/>
</Form.Item>
  </td>

             <td className="date-picker">
             <Form.Item
name={['posUpdateNomineeData', index, 'NomineeDOB']}
className="inputs-label mb-0"
initialValue={
  row?.NomineeDOB && typeof row.NomineeDOB === 'string' 
    ? dayjs(row.NomineeDOB, 'DD/MM/YYYY') 
    : null
}
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
     
     value={row?.NomineeDOB}
     //onChange={(e) => handleDobChange(e, index)}
    disabled={!isEditNominee}
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
disabled
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
//onChange={(value) => handleRoleChange(index, value,row)}
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
                 //onChange={(value) => handleRelationshipChange(index, value,row)}
                disabled={!isEditNominee}
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
   //onChange={(e) => handleShareChange(index, e.target.value,row)}
   onKeyDown={(e) => handleKeyDown("numbersOnly",  e)}
   disabled
 />
 </Form.Item>
               </td>
           </tr>
          ))}
          {posUpdateNomineeData?.length === 0 && (
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
                  </>}
               </div>
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
                    required: true,
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
                  disabled={!isEditBeneficiary}
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
                name={['beneficiaryDetailsData', index, 'PANValidationResult']}
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
                 name={['beneficiaryDetailsData', index, 'address_1']}
                className="inputs-label mb-0"
                initialValue={row?.address_1}
                rules={[
                  {
                    required: false,
                    message: 'Enter Nominee Address',
                  },
                ]}
              >
                <Input
                  placeholder="Enter Nominee address_1"
                  className="cust-input"
                  maxLength={100}
                  disabled={!isEditBeneficiary}
                  //onChange={(e) => handleAccNumberChange(index, 'address', e.target.value)}
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
                  disabled={!isEditBeneficiary}
                  // onChange={(e) => handleAccNumberChange(index, 'address_2', e.target.value)}
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
                  disabled={!isEditBeneficiary}
                  // onChange={(e) => handleAccNumberChange(index, 'city', e.target.value)}
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
                  disabled={!isEditBeneficiary}
                  // onChange={(e) => handleAccNumberChange(index, 'state', e.target.value)}
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
                  disabled={!isEditBeneficiary}
                  // onChange={(e) => handleAccNumberChange(index, 'pincode', e.target.value)}
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
                  disabled={!isEditBeneficiary}
                  // onKeyDown={(e) => handleKeyDown("numbersOnly",  e)}
                  // onChange={(e) => handleAccNumberChange(index, 'NomineeMobile', e.target.value)}
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
                  disabled={!isEditBeneficiary}
                  // onChange={(e) => handleAccNumberChange(index, 'NomineeEmail', e.target.value)}
                />
              </Form.Item>
            </td>
          </tr>
          </tbody>
          <br/>
    </table>
    :<></>
      )}

      {beneficiaryDetailsData?.filter(row => 
                                  (row.Role === "appointee" && row.Status === "New" && row.IsMinor===false))
                                  ?.map((row, index) => (console.log("beneficiaryDetailscheck",row),
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
                                            required: true,
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
                                  ))}
              <div className="contact-details-btn">
              <Button type="primary" className="primary-btn" onClick={() => handleBackClick()}>
                  Back
                </Button>
                <Button type="primary" className="primary-btn" htmlType="submit">
                  Next
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
              key="7"
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
        onFinish={handleNextClick}
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
      {beneficiaryBankData
      ?.filter(row => row.IsMinor===false)
      ?.map((row, index) => (
        <React.Fragment key={row?.id}>
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
                  disabled={!isBankEditable}
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
                  disabled={!isBankEditable}
                  onBlur={(e) => handleBankAccNumber(e.target.value,"AccountNumber",row)}
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
                  disabled={!isBankEditable}
                  onBlur={(e) => handleBankAccNumber(e.target.value,"ReAccountNumber",row)}
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
                  disabled={!isBankEditable}
                  onChange={(e) => handleBeneficiaryBankDetailsChange(index, 'AccountHolderName', e.target.value)}
                />
              </Form.Item>
            </td>
            </tr>
            <tr>
            <td>
            <a
                        onClick={() => InitiatePennyDropp(row)}
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
                  disabled={!isBankEditable}
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
        disabled={!isBankEditable}
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
                  Next
                </Button>
              </div>
              </Form>
            </TabPane>
            <TabPane  tab={<span>Claim Payment Details</span> } key="8">
            <Form
        form={reInsureForm}
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
        onFinish={handleNextClick}
        autoComplete="off"
      >
                    {/* {renderDetailsForm("Claim_Payment_Details")} */}
                    <div className="d-flex mb-16">
                                <h4 className="subtype-headings fs-16 fw-500">
                                Re-Insurer Details
                                </h4>{"  "}
                                <span className="d-flex justify-center" style={{ paddingLeft: "10px" }}><i class="bi bi-plus-circle-fill c-pointer text-color fs-18" onClick={() => handleAdd()}></i></span>
                              </div>
                              {/* <div className="table-container email-table mb-16">
                              <table className="responsive-table">
                                <thead>
                                <tr>
            <th>Within FGLI Retention</th>
            <th>FGLI Retention Amount</th>
            <th>Re-Insurer Name</th>
            <th>Re-Insurer Participation</th>
            <th>Action</th>
          </tr>
                                </thead>
                                <tbody>
  {reInsureForm.getFieldValue("reInsureDetails")?.map((_, index) => (
    <tr key={index} className="nominee-input">
      <td>
        <Form.Item
          name={['reInsureDetails', index, 'withinRetention']}
          className="inputs-label mb-0"
        >
          <Input
            placeholder="Within Retention"
            className="cust-input"
            disabled
          />
        </Form.Item>
      </td>
      <td>
        <Form.Item
          name={['reInsureDetails', index, 'retentionAmount']}
          className="inputs-label mb-0"
        >
          <Input
            placeholder="Retention Amount"
            className="cust-input"
            disabled
          />
        </Form.Item>
      </td>
      <td>
        <Form.Item
          name={['reInsureDetails', index, 'reInsurerName']}
          className="inputs-label mb-0"
        >
          <Input
            placeholder="Re-Insurer Name"
            className="cust-input"
            disabled
          />
        </Form.Item>
      </td>
      <td>
        <Form.Item
          name={['reInsureDetails', index, 'participation']}
          className="inputs-label mb-0"
        >
          <Input
            placeholder="Participation"
            className="cust-input"
            disabled
          />
        </Form.Item>
      </td>
      <td>
        {index !== 0 && (
          <i
            className="bi bi-trash3-fill"
            onClick={() => handleDelete(index)}
            style={{ color: "#b3201f", cursor: "pointer" }}
          />
        )}
      </td>
    </tr>
  ))}
</tbody>



                              </table>
                            </div> */}

                              <div className="fgli-retention-wrapper">
                                  <Row gutter={16} className="mb-16">
                                    <Col span={12}>
                                      <label className="field-label" style={{ fontWeight: 'bold' }}>Within GCLI Retention</label>
                                      <Form.Item
                                        name={['reInsureDetails', 0, 'withinRetention']}
                                        className="mb-0"
                                        
                                      >
                                        <Select
                                        
                                       disabled
                                        />
                                      </Form.Item>
                                    </Col>
                            
                                    <Col span={12}>
                                      <label className="field-label" style={{ fontWeight: 'bold' }}>GCLI Retention Amount</label>
                                      <Form.Item
                                        name={['reInsureDetails', 0, 'retentionAmount']}
                                        className="mb-0"
                                        //rules={[{ required: !reInsureDetails[0]?.isDisable, message: "Enter Retention Amount" }]}
                                      >
                                        <Input
                                          className="custom-input"
                                          value={reInsureDetails[0]?.retentionAmount}
                                          disabled
                                        />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                            
                                  <div className="section-label">Re-Insurer Details</div>
                            
                                  {reInsureDetails
                                    .filter(row => row.reInsurerName || row.participation || row.withinRetention)
                                    .map((row, index) => (
                                      <Row key={row.id} gutter={16} className="reinsurer-row">
                                        <Col span={12}>
                                          <Form.Item
                                            name={['reInsureDetails', index, 'reInsurerName']}
                                            className="mb-0"
                                           // rules={[{ required: !row?.isDisable, message: "Enter Re-Insurer Name" }]}
                                          >
                                            <Input
                                              className="custom-input"
                                              //value={row?.reInsurerName}
                                              disabled
                                            />
                                          </Form.Item>
                                        </Col>
                            
                                        <Col span={12}>
                                          <Form.Item
                                            name={['reInsureDetails', index, 'participation']}
                                            className="mb-0 flex-1"
                                            //rules={[{ required: !row?.isDisable, message: "Enter Participation" }]}
                                          >
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                              <Input
                                                value={row?.participation}
                                                disabled
                                                style={{ flex: 1 }}
                                              />
                            
                                            </div>
                                          </Form.Item>
                                        </Col>
                                      </Row>
                                    ))}
                                </div>
                            {renderDetailsForm("Primary_ClaimPayable_Details")}
                            <table className="custom-table table-input">
                      <tbody>
                          <tr>
                            <td>Death Sum Assured</td>
                            <td>{deathSumAssured}</td>
                          </tr>
                          <tr>
                            <td>Add: Rider Sum Assured</td>
                            <td>
                              {claimPayout.riderSumAssured}
                              {/* <input type="number" min="0" step="0.01" value={claimPayout.riderSumAssured} onChange={(e) => handleClaimPayout("riderSumAssured", e.target.value)}/> */}
                            </td>
                          </tr>
                          <tr>
                            <td>Premiums to be Waved</td>
                            <td>
                              {claimPayout.premiumsToBeWaved}
                              {/* <input type="number" min="0" step="0.01" value={claimPayout.premiumsToBeWaved}  onChange={(e) => handleClaimPayout("premiumsToBeWaved", e.target.value)} /> */}
                            </td>
                          </tr>
                          <tr>
                            <td>Add: Premium Suspense</td>
                            <td>
                              {claimPayout.premiumSuspense}
                              {/* <input type="number" min="0" step="0.01" value={claimPayout.premiumSuspense}  onChange={(e) => handleClaimPayout("premiumSuspense", e.target.value)}/> */}
                            </td>
                          </tr>
                          <tr>
                            <td>Add: Interest Charges</td>
                            <td>
                              {claimPayout.interestCharges}
                              {/* <input type="number" step="0.01" min="0" value={claimPayout.interestCharges}  onChange={(e) => handleClaimPayout("interestCharges", e.target.value)}/> */}
                            </td>
                          </tr>
                          <tr>
                            <td>Add: Penal Interest Charges</td>
                            <td>
                              {claimPayout.penalInterestCharges}
                              {/* <input type="number" min="0" step="0.01" value={claimPayout.penalInterestCharges}  onChange={(e) => handleClaimPayout("penalInterestCharges", e.target.value)}/> */}
                            </td>
                          </tr>
                          <tr>
                            <td>Add: Survival Benefit/Withdrawals</td>
                            <td>
                              {claimPayout.survivalBenefit_Add}
                              {/* <input type="number" min="0" step="0.01" value={claimPayout.survivalBenefit_Add}   onChange={(e) => handleClaimPayout("survivalBenefit_Add", e.target.value)}/> */}
                            </td>
                          </tr>
                          <tr>
                            <td>Less: Premium Recovery</td>
                            <td>
                              {claimPayout.premiumRecovery}
                              {/* <input type="number" step="0.01" min="0" value={claimPayout.premiumRecovery}  onChange={(e) => handleClaimPayout("premiumRecovery", e.target.value)}/> */}
                            </td>
                          </tr>
                          <tr>
                            <td>Less: Survival Benefit/Withdrawals</td>
                            <td>
                              {claimPayout.survivalBenefit}
                              {/* <input type="number" min="0" step="0.01" value={claimPayout.survivalBenefit}   onChange={(e) => handleClaimPayout("survivalBenefit", e.target.value)}/> */}
                            </td>
                          </tr>
                          <tr>
                            <td>Total Payout Amount Payable</td>
                            {/* <td>{deathSumAssured}</td> */}
                            <td>{POSContactData?.primaryUser?.totalClaimPayable}</td>
                          </tr>
                      </tbody>
                    </table>
                   
                    <div className="contact-details-btn">
                      <Button type="primary" className="primary-btn" htmlType="submit"
                      >
                       Next
                      </Button>

                    </div>
                  </Form>
            </TabPane>
            {/* <TabPane
              tab={
                <span>
                  Raise Requirements
                </span>
              }
              key="10"
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
               {isShowRequirements && <>
                    <div className="contact-details-btn">
                      <Button type="primary" className="primary-btn" htmlType="submit">
                       Save
                      </Button>
                      {showRaiseRequirementBtn && <>
                      <Button
                            type="primary"
                            className="primary-btn"
                           // onClick={() => getRaiseRequirements()}
                           onClick={()=>handleRequirementSubmit()}
                          >
                            Raise Requirement
                          </Button>
                          </>}
                    </div>
                    </>}
                    </Form>
                </TabPane> */}
                           <TabPane tab={<span>Referrel Sheet</span>} key="9">
                     <Form
                       form={form}
                       name="wrap"
                       labelCol={{ flex: "35%" }}
                       labelAlign="left"
                       labelWrap
                       wrapperCol={{ flex: 1 }}
                       colon={false}
                       onFinish={handleNextClick}
                       autoComplete="off"
                     >
                       {/* <div className="d-flex mb-16 mt-16">
                         <h4 className="subtype-headings fs-16 fw-500">Refer To Investigation</h4>
                         <span className="d-flex justify-center" style={{ paddingLeft: "10px" }}>
                           <i
                             className="bi bi-plus-circle-fill c-pointer text-color fs-18"
                             disabled={isdisable}
                             onClick={addInvestigator} // Now calling globally
                           ></i>
                         </span>
                       </div> */}
               
                       {/* {renderDetailsForm("Referrel_Sheet_ReferTo2")} */}
               
                       <div className="table-container email-table mb-16">
                         <table className="responsive-table">
                           <thead>
                             <tr>
                               <th>Investigator Name</th>
                               <th>Start Date</th>
                               <th>End Date</th>
                               <th>Action</th>
                               <th></th>
                             </tr>
                           </thead>
                           <tbody>
                             <Form.List name="investDetails">
                               {(fields, { add, remove }) => {
                                 addInvestigatorRef.current = add; // Store add function in ref
               
                                 return (
                                   <>
                                     {fields.map(({ key, name, ...restField }) => (
                                       <tr key={key} className="nominee-input">
                                         <td>
                                           <Form.Item
                                             {...restField}
                                             name={[name, "investigatorName"]}
                                             className="inputs-label mb-0"
                                             rules={[{ required: true, message: "Select Investigator Name" }]}
                                           >
                                             <Select
                                               className="inputs-label cust-input select-width"
                                               placeholder="Select an Investigator Name"
                                               options={investigatorLU}
                                               disabled={isdisable}
                                             />
                                           </Form.Item>
                                         </td>
                                         <td>
                                           <Form.Item
                                             {...restField}
                                             name={[name, "investigationStartDate"]}
                                             className="inputs-label mb-0"
                                             rules={[{ required: true, message: "Select Investigation Start Date" }]}
                                           >
                                             <DatePicker
                                               allowClear={false}
                                               disabledDate={(e) => disabledDate(e)}
                                               style={{ width: "100%" }}
                                               className="cust-input"
                                               placeholder="Investigation Start Date"
                                               format={dateFormat}
                                               disabled={isdisable}
                                             />
                                           </Form.Item>
                                         </td>
                                         <td>
                                           <Form.Item
                                             {...restField}
                                             name={[name, "investigationEndDate"]}
                                             className="inputs-label mb-0"
                                           >
                                             <DatePicker
                                               allowClear={false}
                                               disabledDate={(e) => disabledDate(e)}
                                               style={{ width: "100%" }}
                                               className="cust-input"
                                               placeholder="Investigation End Date"
                                               format={dateFormat}
                                               disabled={isdisable}
                                             />
                                           </Form.Item>
                                         </td>
                                         <td>
                                           <i
                                             className="bi bi-trash3-fill"
                                             onClick={() => remove(name)}
                                            
                                             style={{ color: "#b3201f", cursor: "pointer" }}
                                           ></i>
                                         </td>
                                         <td>
                                             <Form.Item
                                                 className="inputs-label mb-0"
                                                 rules={[
                                                   {
                                                     // required: false,
                                                     // message: "Investigation End Date",
                                                   },
                                                 ]}
                                               >
                                               <Button class="bi bi-trash3-fill" onClick={createInvestigatorDetails}>Save</Button>
                                               </Form.Item>
                                           </td>
                                       </tr>
                                     ))}
                                   </>
                                 );
                               }}
                             </Form.List>
                           </tbody>
                         </table>
                       </div>
               
                       {/* {renderDetailsForm("Referrel_Sheet_ReferTo")} */}
                       
                       {renderDetailsForm("Referrel_Sheet_Assessor_ReferTo")}
                       <div className="text-area mt-16">
                 <Form.Item
                   label="Referral Comments"
                   name="referralViewComments" // Ensure this matches the key in `setFieldsValue`
                   className="inputs-label mb-0"
                   rules={[
                     {
                       required: false,
                       message: "Referral Comments are required",
                     },
                   ]}
                 >
                  
                   {/* <TextArea
                     rows={8}
                     placeholder="Enter referral comments here"
                    // readOnly // Makes the field read-only
                    value={referrelSheetForm.getFieldValue("referralViewComments")}
                    onChange={(e) => handleReferralCmtCahnge(e)}
                    disabled={!!referrelSheetForm.getFieldValue("referralViewComments")}
                   /> */}
                   {/* <div
                     style={{
                       position: 'absolute',
                       top: 10,
                       right: 10,
                       textAlign: 'right',
                     }}
                   >
                     <a
                       onClick={() => handleAddComments()}
                       style={{
                         display: 'block',
                         marginBottom: '5px',
                         color: "#b3201f",
                       }}
                     >
                       Add Comments
                     </a>
                     <a
                       onClick={() => handleViewComments()}
                       style={{
                         display: 'block',
                         marginBottom: '5px',
                         marginRight: '-40px',
                         color: "#b3201f",
                       }}
                     >
                       View Past Comments
                     </a>
                   </div> */}
                 </Form.Item>
                   <div className="table-container1">
                     <table className="custom-table comments-tb">
                       <thead>
                         <tr>
                           <th>Date</th>
                           <th>Comments</th>
                         </tr>
                       </thead>
                       <tbody>
                         {
                           allComments?.length > 0 ? 
                           allComments.map((item) => (
                             <tr key={item.commentID}>
                               <td>{convertDate(item?.createdDate)}</td>
                               <td>{item?.comments}</td>
                             </tr>
                           )) : (
                             <tr>
                               <td colSpan="2">
                                 <div className="text-center">
                                   <span>No data available</span>
                                 </div>
                               </td>
                             </tr>
                           )
                         }
                       </tbody>
                     </table>
                   </div>
               </div>
               
                       <div className="contact-details-btn">
                         <Button type="primary" className="primary-btn" htmlType="submit">Next</Button>
                       </div>
                     </Form>
                   </TabPane>
                {/* <TabPane  tab={<span>Referrel Sheet</span> } key="12">
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
                    {renderDetailsForm("PolicyChecks_Referrel_Details")}
                    <div className="text-area mt-16">
                    <Form.Item
                      label="Referrel Comments"
                      name="ReferrelComments"
                      className="inputs-label mb-0"
                      rules={[
                        {
                          required: false,
                          message: "Referrel Comments",
                        },
                      ]}
                    >
                      <TextArea rows={8} placeholder="Referrel Comments" />
                    </Form.Item>
                  </div>
                    <div className="contact-details-btn">

                      <Button type="primary" className="primary-btn" htmlType="submit"
                      >
                       Save
                      </Button>

                    </div>
                  </Form>
                </TabPane> */}
 <TabPane
  tab={<span>Decision</span>}
  key="10"
>
  <Form
    form={decisionForm}
    name="wrap"
    labelCol={{ flex: "35%" }}
    labelAlign="left"
    labelWrap
    wrapperCol={{ flex: 1 }}
    colon={false}
    onFinish={handleSubmit}
    autoComplete="off"
  >
    {/* Assessors Recommendation Section */}
    <div className="section-container">
      <h4 className="mb-16 font-medium">Decision Details</h4>
</div>
      <div style={{flexDirection: "row", width: "200%" }}>
  <div style={{width: "100%" }}>
    {renderDetailsForm("AssessorsRecommendation_Referrel_Details_AssesorsRecommendation1")}
  </div>
  <div style={{width: "100%", }}>
    {renderDetailsForm("AssessorsRecommendation_Referrel_Details_DecisionDescription1")}
  </div>

      {renderDetailsForm("AssessorsRecommendation_Referrel_Details_ReasonForDecision1")}
    </div>

    <div className="text-area mt-16">
          <Form.Item label="Captured Entries" name="CapturedEntries" className="inputs-label mb-0" />
          <div className="table-container1">
            <table className="custom-table comments-tb">
              <thead>
                <tr>
                  <th style={{ width: "80px", textAlign: "center" }}>SR No</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                  {allComments?.filter((item) => item?.claimRecommendation?.trim()).length > 0 ? (
                    allComments
                      .filter((item) => item?.claimRecommendation?.trim())
                      .map((item, index) => (
                        <tr key={item.commentID}>
                          <td style={{ textAlign: "center" }}>{index + 1}</td>
                          <td>{item.claimRecommendation}</td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="2">
                        <div style={{ textAlign: "center", padding: "10px" }}>
                          <span>No data available</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
            </table>
          </div>
        </div>

    {/* Checkers Recommendation Section */}
    <div className="section-container mt-16">
      <div className="text-area">
        <Form.Item
          label="Agree with Recommendation"
          name="AssessorsRecommendation"
          validateStatus={assessorRecErr ? "error" : ""}
          help={assessorRecErr ? "Please select an option for 'Agree with Recommendation'." : null}
          rules={[{ required: true, message: "Please select an option for 'Agree with Recommendation'." }]}
        >
          <Radio.Group
            onChange={handleAssessorDecision}
            value={isAssessorDecision}
          >
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <div className="flex gap-16">
          <Form.Item
            name="CheckersDecision"
            label="Checkers Decision"
            className="inputs-label mb-0"
            style={{ flex: 1 , paddingBottom : "20px"}}
            validateStatus={checkerDecErr ? "error" : ""}
            rules={isAssessorDecision === "Yes" ? [{ required: true, message: "Please select a Checkers Decision." }] : []}
          >
            <Select
              className="inputs-label cust-input select-width"
              placeholder="Checkers Decision"
              options={assessorsDecisionLU.map(opt => ({ value: opt.mstID, label: opt.mstDesc }))}
              onChange={checkerDecHandler}
              disabled={isAssessorDecision === "No"}
            />
          </Form.Item>

          <Form.Item
            name="DecisionDescription1" 
            label="Decision Description"
            className="inputs-label mb-0"
            style={{ flex: 1 }}
            validateStatus={checkerDecErr ? "error" : ""}
            rules={isAssessorDecision === "Yes" ? [{ required: true, message: "Please select a Decision Description." }] : []}
          >
            <Select
              className="inputs-label cust-input select-width"
              placeholder="Decision Description1"
              options={filteredDescriptions}//.map(opt => ({ value: opt.mstID, label: opt.mstDesc }))}
              disabled={isAssessorDecision === "No"}
              labelInValue={true}
            />
          </Form.Item>
        </div>

{/* This was duplicated so we remove it     5/11/205

  <div className="text-area mt-16 flex flex-col">
  <label className="mb-2 font-medium">Assessment Checker Remarks</label>
  <Form.Item
    name="AssesmentCheckerRemarks"
    className="inputs-label mb-0"
    rules={[
      {
        required: true,
        message: "Assessment Checker Remarks is required",
      }
    ]}
  >
    <TextArea rows={6} placeholder="Assessment Checker Remarks" allowClear />
  </Form.Item>
</div> */}


<div className="text-area mt-16 flex flex-col">
  <label className="mb-2 font-medium">Assessment Checker Remarks</label>
  <Form.Item
    name="AssesmentCheckerRemarks"
    className="inputs-label mb-0"
    rules={[
      {
        required: true,
        message: "Assessment Checker Remarks is required",
      }
    ]}
  >
    <TextArea rows={6} placeholder="Assessment Checker Remarks" allowClear />
  </Form.Item>
</div>

      </div>
    </div>
    <br/>


 <div className="text-area mt-16">
          <Form.Item label="Journal Entries" name="JournalEntries" className="inputs-label mb-0" />
          <div className="table-container1">
            
           <table className="custom-table comments-tb">
  <thead>
    <tr>
      <th>JV Name</th>
      <th>JV No</th>
      <th>JV Amount</th>
    </tr>
  </thead>
  <tbody>
    {JVGridData1.map((item, index) => (
      <tr key={index}>
        <td>{item.JVName}</td>
        <td>{item.JVNo}</td>
        <td>{item.JVAmount}</td>
      </tr>
    ))}
    {JVGridData1.length === 0 && (
      <tr>
        <td colSpan="2">
          <div className="text-center">
            <span>No JV data available</span>
          </div>
        </td>
      </tr>
    )}
  </tbody>
</table>
          </div>
        </div>
    <div className="contact-details-btn">
      
      <input  placeholder="Journal Entry Password" 
       value={jePassword}
        onChange={e => setJePassword(e.target.value)}/>
       <Button type="primary" className="primary-btn" htmlType="button" style={{ marginRight: "10px" }} onClick={handleApproveJE}>
        
             JE Approve
          </Button>
    </div>
    {/* Buttons */}
    <div className="contact-details-btn">
    
      <Button type="primary" className="primary-btn" onClick={handleAssessmentSave}>
        Save
      </Button>

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
            {/* <th>GL Code</th> */}
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
                       {/* <td>{item.glCode}</td> */}
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
            {NameDeDupeData?.map((item, index) => (
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
            {NameDeDupeData?.length === 0 &&
              <tr>
                <td colspan="4">

                  <div className="text-center"><span>No data available</span></div>
                </td>
              </tr>}
          </table>
        </div>
      </Modal>

      <Modal
        title="Agent Sourcing Details"
        open={showAgentSourcing}
        destroyOnClose={true}
        width={600}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setShowAgentSourcing(false)}>
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
              <th>Sr No</th>
              <th>Policy No</th>
              <th>Policy Status</th>
            </tr>
            {showAgentSourcingDetails.length > 0 ? showAgentSourcingDetails.map((item,index) => (
              <tr key={index}>
              <td>
                {index + 1}
              </td>
              <td>
                {item?.chdrnum}
              </td>
              <td>
                {item?.statcode}
              </td> 
              </tr>
            ))
           :
              <tr>
                <td colspan="6">
                  <div className="text-center"><span>No data available</span></div> 
                </td>
              </tr>}
          </table>
        </div>
        </Spin>
      </Modal>

      <Modal
        title="Add Comments"
        open={showCommentsModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setShowCommentsModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="table-container" style={{ marginTop: "0px" }}>
          <TextArea rows={5}  maxLength={1000} placeholder={"Add your comments"} value={addComments} onChange={(e) => setAddComments(e.target.value)}/>
          <div className="contact-details-btn">
           <Button
             type="primary"
             className="primary-btn"
             onClick={handlePastComments}
            >
             Save
           </Button>
           </div>
        </div>
      </Modal>
      {/* <Modal
        title="Negative List"
        open={ofcListModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setOfcListModal(false)}>
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
            {negativeList?.map((item, index) => (
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
            {negativeList?.length === 0 &&
              <tr>
                <td colspan="4">

                  <div className="text-center"><span>No data available</span></div>
                </td>
              </tr>}
          </table>
        </div>
      </Modal> */}
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
      </Modal>
    </>
  );
}

export default ClaimsAssessmentChecker;
