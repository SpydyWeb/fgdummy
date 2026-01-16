import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Form, Spin, Button, message, Input, Tabs, Radio,DatePicker,Select, Modal, Checkbox,Tooltip, Table, Row, Col } from "antd";
import { ClaimsData } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import moment from "moment";
import UploadIcon from "../../assets/images/upload.png";
import apiCalls from "../../api/apiCalls";
import PopupAlert from "../popupAlert";
import dayjs from "dayjs";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import CloseIcon from "../../assets/images/close-icon.png";
import { profileObj } from "../../reducers/ProfileReducer";

const { TabPane } = Tabs;
const { Option } = Select;

const ClaimsApproverUser = (props) => {
  const loginInfo = useSelector(state => state);
  const dateFormat = "DD/MM/YYYY";
  const [emailExist] = useState(false);
  const [reInsureForm] = Form.useForm();
  const suffix = <img src={UploadIcon} alt="" />;
  const { selectedSubType, clientRoleLU, details, customerData, clientEnquiryData,causeOfEventLU, natureOfDeathLU,policyTypeLU,claimCategoryLU,claimIntimationLU,sourceInformationLU,assuredIncomePlanLU,POSContactData,laNomineeAddressLU,subStageLU,assessorsDecisionLU,approverDecisionLU, loggedUser, dataBseCHeckLU,hotSpotCheckLU,referCaseToLU,reinstatementDecisionLU,withDGHLU,investigatorLU, decisionDescriptionLU,masterData, isPolicyAssigned} = props?.propsData;
  const [form] = Form.useForm();
  
  const [ApproverDecisionForm] = Form.useForm();
  const [nomineeform] = Form.useForm();
  const [nomineebankform] = Form.useForm();
  const [uploadform] = Form.useForm();
  const { TextArea } = Input;
  const [isLoading, setIsLoading] = useState(false);
  const [ClaimTypee, setClaimTypee] = useState('');
  const [isShowPOSScreen, setIsShowPOSScreen] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertData, setAlertData] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [deathSumAssured, setDeathSumAssured] = useState(null);
  const [totalClaimPayable, setTotalClaimPayable] = useState(null);
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
  const [subDescriptionLU, setSubDescriptionLU] = useState([]);
  const [decisionDescription, setDecisionDescription] = useState([]);
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
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [makerData, setMakerData] = useState([]);
  const [checkerData, setCheckerData] = useState([]);
  const [isLeftDisabled, setIsLeftDisabled] = useState(false);
  const [isRightDisabled, setIsRightDisabled] = useState(true);
  const [allComments, setAllComments] = useState([]);
  const [statusAliveValues, setStatusAliveValues] = useState([]);
  const [activeTab, setActiveTab] = useState("maker");
  const dispatch = useDispatch();
  const formattedDate = (date) => date ? moment(date).format("DD/MM/YYYY") : null;
  const [reInsureDetails, setReInsureDetails] = useState([
    { id: 1, withinRetention: '', retentionAmount: null, reInsurerName: '', participation: null },
  ]);
 const [isRiderData, setIsRiderData] = useState([]);
 const [typeofCondition, setTypeofCondition] = useState("");
const [claimPayout, setClaimPayout] = useState({
    riderSumAssured: "",
    premiumsToBeWaved: "",
    premiumSuspense: "",
    interestCharges: "",
    penalInterestCharges: "",
    premiumRecovery: "",
    survivalBenefit: "",
    survivalBenefit_Add: "",
  });
  const tabOrder = ["1", "2","3","4","5","6","7","8","9","12","13","14"];
const handleNextClick = () => {
  const currentIndex = tabOrder.indexOf(activeTabKey);
  if (currentIndex < tabOrder.length - 1) {
    const nextTabKey = tabOrder[currentIndex + 1];
    setActiveTabKey(nextTabKey); // Move to the next tab
  }
};
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
  const totalPayoutAmount = Object.entries(claimPayout).reduce((sum, [key, val]) => {
    const numericVal = parseFloat(val) || 0;
    let totalAmount;
  
    if (key === "premiumRecovery" || key === "survivalBenefit") {
      totalAmount = sum - numericVal;
    } else {
      totalAmount = sum + numericVal;
    }
  
    return !isNaN(totalAmount) ? totalAmount : sum;
  }, deathSumAssured);
  //  const formattedTotalPayoutAmount = totalPayoutAmount.toFixed(2);
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
   const handleClaimPayout = (key, value) => {
    setClaimPayout((prev) => (
      {
        ...prev,
        [key] : value
      }
    ))
  };
const handleSelectChange = (value, id) => {
 // console.log(`Selected value for Requirement ${id}:`, value);
};

const handleCheckboxChange = (e, id, type) => {
 // console.log(`Checkbox ${type} for Requirement ${id}:`, e.target.checked);
};

const handleTabChange = (key) => {
  setActiveTabKey(key);
};
// const posChangeinPlanObj= {
// }
let posChangeinPlanObj = {};
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
  const startDate = moment(rcd);
  const endDate = moment(dod);
  
  const years = endDate.diff(startDate, 'years');
  startDate.add(years, 'years'); // Add the years difference to the start date
  
  const months = endDate.diff(startDate, 'months');
  startDate.add(months, 'months'); // Add the months difference to the start date
  
  const days = endDate.diff(startDate, 'days'); // Now calculate the days difference
  
  return `${years}Y ${months}M ${days}D`;
};

useEffect(()=>{
     if(customerData?.isClaimsApproverUser && activeTabKey ==="1"){
        // POSContactData?.serviceRequestTransectionData?.forEach(element => {
        //   posChangeinPlanObj[element.tagName] = element.tagValue
        // });
 
 const mergedObj = {
    ...(POSContactData?.claimsDetails || {}),
    ...(POSContactData?.notification || {}),
    ...(POSContactData?.primaryUser || {}),
    ...(POSContactData?.assessment || {}),
    
  };

  posChangeinPlanObj = mergedObj;
        form.setFieldsValue({
          srvReqID: posChangeinPlanObj?.srvReqRefNo,
          ClaimIntimatedBy:  intimationData?.ClaimIntimatedBy || posChangeinPlanObj?.claimIntimatedBy || null,
         ClaimIntimatedOn:  intimationData?.ClaimIntimatedOn || posChangeinPlanObj?.claimIntimatedOn || null,
          ClaimRegisteredBy:  intimationData?.TicketLoggedBy || posChangeinPlanObj?.ticketLoggedBy || null,
          ClaimRegisteredOn:  intimationData?.ClaimReceivedOn || posChangeinPlanObj?.claimReceivedOn || null,
          AssesmentDoneBy:  intimationData?.AssesmentDoneBy || loginInfo?.userProfileInfo?.profileObj?.name || null,
        //  AssesmentDoneOn:  intimationData?.AssesmentDoneOn || posChangeinPlanObj?.AssesmentDoneOn || null,
        AssesmentDoneOn: formattedDate(intimationData?.AssesmentDoneOn) || posChangeinPlanObj?.assesmentDoneOn || null,
          SelectSubStage:  intimationData?.SelectSubStage || posChangeinPlanObj?.selectSubStage || null,
        });
          
      }
 else if(customerData?.isClaimsApproverUser && activeTabKey ==="2"){debugger
  // POSContactData?.serviceRequestTransectionData?.forEach(element => {
  //   posChangeinPlanObj[element.tagName] = element.tagValue
  // });

  const mergedObj = {
    ...(POSContactData?.claimsDetails || {}),
    ...(POSContactData?.notification || {}),
    ...(POSContactData?.primaryUser || {}),
    ...(POSContactData?.assessment || {}),
    
  };
  posChangeinPlanObj = mergedObj;
  getMandatetagEnquiry();
  form.setFieldsValue({
    srvReqID: posChangeinPlanObj?.srvReqRefNo,
    OFAC:  policyCheckData?.OFAC || posChangeinPlanObj?.OFAC || null,
    ClaimHotspotCheck:  policyCheckData?.ClaimHotspotCheck ? parseInt(policyCheckData?.ClaimHotspotCheck) : posChangeinPlanObj?.claimHotspotCheck ? parseInt(posChangeinPlanObj?.claimHotspotCheck) : null,
    IIBDataBaseCheck:  policyCheckData?.IIBDataBaseCheck ? parseInt(policyCheckData?.IIBDataBaseCheck) : posChangeinPlanObj?.iibDataBaseCheckID ? parseInt(posChangeinPlanObj?.iibDataBaseCheckID) : null,
    IndustryCheck:  policyCheckData?.IndustryCheck || posChangeinPlanObj?.industryCheck || null,
    AutoPayStatus:  policyCheckData?.AutoPayStatus || posChangeinPlanObj?.autoPayStatus || null,
  });

   
}
if (customerData?.isClaimsApproverUser && activeTabKey === "3") {
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
      IsMinor: item.dateOfBirth? getAge(new Date(item.dateOfBirth)) < 18 : false,
      Role: item.role || "nominee",
      Role_New: item.role || "nominee",
      RealtionshipWithPolicyowner: item.relationship || "",
      RealtionshipWithPolicyowner_New: item.relationship || "",
      Share: item.sharePercent || "",
      Share_New: item.sharePercent || "",
      
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
   beneficiaryDetailsData: (mappedNomineeData || []).map(item => ({
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
     }))
   });

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
      IsMinor: item.dateOfBirth? getAge(new Date(item.dateOfBirth)) < 18 : false,
      Role: item.role || "nominee",
      Role_New: item.role || "nominee",
      RealtionshipWithPolicyowner: item.relationship || "",
      RealtionshipWithPolicyowner_New: item.relationship || "",
      Share: item.sharePercent || "",
      Share_New: item.sharePercent || "",
      
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
else if(customerData?.isClaimsApproverUser && activeTabKey ==="4"){debugger;

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
      };
    });
    setBeneficiaryBankData(prev => [
      ...prev,
      ...mappedBankData.filter(
        newItem =>
          !prev.some(prevItem => prevItem.NomineePANNumber === newItem.NomineePANNumber)
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
// else if(customerData?.isClaimsApproverUser && activeTabKey ==="5"){
//   POSContactData?.serviceRequestTransectionData?.forEach(element => {
//     posChangeinPlanObj[element.tagName] = element.tagValue
//   });
//   form.setFieldsValue({
//     srvReqID: posChangeinPlanObj?.srvReqRefNo,
//     TotalClaimPayable: claimPaymentData?.TotalClaimPayable || posChangeinPlanObj?.TotalClaimPayable || null,
//     WithinFGLIRetention: claimPaymentData?.WithinFGLIRetention || posChangeinPlanObj?.WithinFGLIRetention || null,
//     FGLIRetention: claimPaymentData?.FGLIRetention || posChangeinPlanObj?.FGLIRetention || null,
//     ReInsurerName: claimPaymentData?.ReInsurerName || posChangeinPlanObj?.ReInsurerName || null,
//     ReInsurerParticipation: claimPaymentData?.ReInsurerParticipation || posChangeinPlanObj?.ReInsurerParticipation || null,
//     LifeAsiaTransactions: claimPaymentData?.LifeAsiaTransactions || posChangeinPlanObj?.LifeAsiaTransactions || null,
//   });
// }
// if (customerData?.isClaimsApproverUser && activeTabKey === "5") {
//   // Populate all tag values
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

//    const deathAssuredNumber = posChangeinPlanObj.DeathSumAssuredAmount;
 
//   setDeathSumAssured(deathAssuredNumber);
//   reInsureForm.setFieldsValue({
//     TotalClaimPayable: deathAssuredNumber
//   });

//     // Populate Claim Payout fields
//     const payoutFields = [
//       "riderSumAssured",
//       "premiumsToBeWaved",
//       "premiumSuspense",
//       "interestCharges",
//       "penalInterestCharges",
//       "premiumRecovery",
//       "survivalBenefit"
//     ];
  
//     const claimPayoutData = {};
  
//     payoutFields.forEach(field => {
//       if (posChangeinPlanObj[field]) {
//         claimPayoutData[field] = posChangeinPlanObj[field];
//       }
 
//     });
  
//     setClaimPayout(claimPayoutData);
  
// }

if (customerData?.isClaimsApproverUser && activeTabKey === "5") {
  
    const mergedObj = {
    ...(POSContactData?.claimsDetails || {}),
    ...(POSContactData?.notification || {}),
    ...(POSContactData?.primaryUser || {}),
    ...(POSContactData?.assessment || {}),
    
  };
  posChangeinPlanObj = mergedObj;

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
      if (
        mergedObj.withinRetention &&
        (!reinsurerArray[0] || !reinsurerArray[0].withinRetention)
      ) {
        reinsurerArray[0] = {
          ...reinsurerArray[0],
          withinRetention:
            mergedObj.withinRetention === '1' ? 'Yes' :
            mergedObj.withinRetention === '2' ? 'No' :
            mergedObj.withinRetention
        };
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
  
// Get reInsureDetails array from mergedObj
//   const reInsureDetailsArray = posChangeinPlanObj.reInsureDetails || [];

//   // Build tagMap for reInsureDetails
//   const tagMap = {};
//   reInsureDetailsArray.forEach((item, index) => {
//     tagMap[index] = {
//       id: index,
//       withinRetention: item.withinRetention || "",
//       retentionAmount: item.retentionAmount || "",
//       reInsurerName: item.reInsurerName || "",
//       participation: item.participation || ""
//     };
//   });

//  // Convert tagMap to sorted array for form
//   const reInsureDetails = Object.values(tagMap).sort((a, b) => a.id - b.id);

// setReInsureDetails(reInsureDetails);
//   reInsureForm.setFieldsValue({ reInsureDetails });

   // Set deathSumAssured if available
  if (mergedObj.deathSumAssuredAmount) {
    setDeathSumAssured(mergedObj.deathSumAssuredAmount);
    setTotalClaimPayable(mergedObj.totalClaimPayable);
    // reInsureForm.setFieldsValue({
    // });
  }

  // Populate Claim Payout fields
  const payoutFields = [
    "riderSumAssured",
    "premiumsToBeWaved",
    "premiumSuspense",
    "interestCharges",
    "penalInterestCharges",
    "premiumRecovery",
    "survivalBenefit"
  ];


 

    const claimPayoutData = {};
  payoutFields.forEach(field => {
    if (mergedObj[field]) {
      claimPayoutData[field] = mergedObj[field];
    }
  });
  setClaimPayout(claimPayoutData);
}

  
  





// else if(customerData?.isClaimsApproverUser && activeTabKey ==="4"){
//   const tagPatternPersonal = /_(\d+)$/;
//   const personalFields = ["IFSC","BankName","BranchName","AccountNumber","ReAccountNumber","AccountHolderName","InitiatePennyDrop","NameasperPennyDrop","NameMatch", "NomineePANNumber"];
//   const beneficiaryNewData = processData(
//     POSContactData?.serviceRequestTransectionData,
//     'Create',
//     tagPatternPersonal,
//     personalFields
//   );
//   setBeneficiaryBankData(beneficiaryNewData);
// }

else if (customerData?.isClaimsApproverUser && activeTabKey === "6") {
  // const posChangeinPlanObj = {};
  let posChangeinPlanObj = {};

  // POSContactData?.serviceRequestTransectionData?.forEach(element => {
  //   posChangeinPlanObj[element.tagName] = element.tagValue;
  // });
   const mergedObj = {
    ...(POSContactData?.claimsDetails || {}),
    ...(POSContactData?.notification || {}),
    ...(POSContactData?.primaryUser || {}),
    ...(POSContactData?.assessment || {}),
    
  };
  posChangeinPlanObj = mergedObj;

  apiCalls
    .GetClaimsViewCommentsInfo(POSContactData?.srvReqID)
    .then((val) => {
      if (val?.data?.length > 0) {
        setAllComments(val.data);

        // Extract non-null ClaimRecommendation values for maker
        const makerRecommendations = val.data
        .map(item => item.claimRecommendation)
        .filter(rec => rec && rec.trim() !== "");
      
      const formattedMakerData = makerRecommendations.map((rec, index) => ({
        key: String(index + 1),
        id: index + 1,
        recommendation: rec.trim()
      }));
      
      setMakerData(formattedMakerData);
      } else {
        // fallback to default values if no API data
        const maker = claimPaymentData?.PrimaryAssessorRecommendation || posChangeinPlanObj?.primaryAssessorRecommendation;
        const checker = posChangeinPlanObj?.assesmentCheckerRemarks;
    

        const formatToTableData = (text = "") => {
          return text
            .split(/\r?\n|,/) // handle new lines or comma separated
            .filter(line => line.trim() !== "")
            .map((rec, index) => ({
              key: String(index + 1),
              id: index + 1,
              recommendation: rec.trim()
            }));
        };

        setMakerData(formatToTableData(maker));
        setCheckerData(formatToTableData(checker));
      }
    });

  // Checker logic stays the same unless that too is to be sourced from API
   const checker = posChangeinPlanObj?.assesmentCheckerRemarks;


  const formatToTableData = (text = "") => {
    return text
      .split(/\r?\n|,/) // handle new lines or comma separated
      .filter(line => line.trim() !== "")
      .map((rec, index) => ({
        key: String(index + 1),
        id: index + 1,
        recommendation: rec.trim()
      }));
  };

  setCheckerData(formatToTableData(checker));
}

if (customerData?.isClaimsApproverUser && activeTabKey === "7") {

  // Map POSContactData to posChangeinPlanObj
  // POSContactData?.serviceRequestTransectionData?.forEach(element => {
  //   posChangeinPlanObj[element.tagName] = element.tagValue;
  // });

  const mergedObj = {
    ...(POSContactData?.claimsDetails || {}),
    ...(POSContactData?.notification || {}),
    ...(POSContactData?.primaryUser || {}),
    ...(POSContactData?.assessment || {}),
    
  };
  posChangeinPlanObj = mergedObj;

  // Helper functions to get mstDesc from both lists
  // const getDecisionDesc = (id) => {
  //   return decisionDescriptionLU.find(x => x.mstID === id)?.mstDesc || null;
  // };

  // const getAssessorDesc = (id) => {
  //   return assessorsDecisionLU.find(x => x.mstID === id)?.mstDesc || null;
  // };

  const claimType = posChangeinPlanObj.claimType;
  setClaimTypee(claimType);
  const typeofCondition = posChangeinPlanObj.typeofcondition || '';
  setTypeofCondition(typeofCondition);

  const primaryDecision = posChangeinPlanObj?.primaryAssesorsDecision || 
                            asessorsRecomandationData?.AssessorDecisionDescription || 
                            null;

  const assessmentDecisionId = parseInt(posChangeinPlanObj?.assessorAssesorsDecisionID) || 
                               asessorsRecomandationData?.AssessorDecisionDescription || 
                               null;

   const assessmentDescription =posChangeinPlanObj?.assessorDecisionDescription ||
                              //parseInt(posChangeinPlanObj?.assessorDecisionDescriptionID) || 
                               asessorsRecomandationData?.AssessorDecisionDescription || 
                               null;
   
 const primaryDescriptionID = parseInt(posChangeinPlanObj?.primaryDecisionDescription) || 
                       asessorsRecomandationData?.PrimaryDecisionDescription || 
                                  null;

  const getDecisionDesc = (id) => {
                                    return decisionDescriptionLU.find(x => x.mstID === id)?.mstDesc || null;
                                  };
                                
  const getAssessorDesc = (id) => {
    return assessorsDecisionLU.find(x => x.mstID === id)?.mstDesc || null;
  };
                                

  // Setting form fields with corresponding descriptions
  form.setFieldsValue({
    PrimaryDecision: primaryDecision,
  //   Number.isInteger(parseInt(primaryDecisionId))
  // ? getAssessorDesc(parseInt(primaryDecisionId))
  // : posChangeinPlanObj?.PrimaryAssesorsDecision,
    PrimaryDecisionDescription: getDecisionDesc(primaryDescriptionID),   // From decisionDescriptionLU
    srvReqID: posChangeinPlanObj?.srvReqRefNo,
    AssessmentDecisionDescription: assessmentDescription,  // From assessorsDecisionLU
    AssessmentDecision: getAssessorDesc(assessmentDecisionId),
  });
}

else if(customerData?.isClaimsApproverUser && activeTabKey ==="12"){
  // POSContactData?.serviceRequestTransectionData?.forEach(element => {
  //   posChangeinPlanObj[element.tagName] = element.tagValue
  // });

  const mergedObj = {
    ...(POSContactData?.claimsDetails || {}),
    ...(POSContactData?.notification || {}),
    ...(POSContactData?.primaryUser || {}),
    ...(POSContactData?.assessment || {}),
    
  };
  posChangeinPlanObj = mergedObj;
  form.setFieldsValue({
    srvReqID: posChangeinPlanObj?.srvReqRefNo,
    InitiateInvestigation:  referrelSheetData?.InitiateInvestigation || posChangeinPlanObj?.InitiateInvestigation || null,
    SelectInvestigator:  referrelSheetData?.SelectInvestigator || posChangeinPlanObj?.SelectInvestigator || null,
    InitiateReInvestigation:  referrelSheetData?.InitiateReInvestigation || posChangeinPlanObj?.InitiateReInvestigation || null,
    ReferCaseTo:  referrelSheetData?.ReferCaseTo || posChangeinPlanObj?.ReferCaseTo || null,
    ReferrelComments:  referrelSheetData?.ReferrelComments || posChangeinPlanObj?.ReferrelComments || null,
  });
}
else if(customerData?.isClaimsApproverUser && activeTabKey ==="13"){
  // POSContactData?.serviceRequestTransectionData?.forEach(element => {
  //   posChangeinPlanObj[element.tagName] = element.tagValue
  // });
  const mergedObj = {
    ...(POSContactData?.claimsDetails || {}),
    ...(POSContactData?.notification || {}),
    ...(POSContactData?.primaryUser || {}),
    ...(POSContactData?.assessment || {}),
    
  };
  posChangeinPlanObj = mergedObj;
  form.setFieldsValue({
    srvReqID: posChangeinPlanObj?.srvReqRefNo,
    ReferrelComments:  asessorsRecomandationData?.ReferrelComments || posChangeinPlanObj?.referrelComments || null,
    AssesorsDecision:  asessorsRecomandationData?.AssesorsDecision || posChangeinPlanObj?.assesorsDecision || null,
    ReasonForDecision:  asessorsRecomandationData?.ReasonForDecision || posChangeinPlanObj?.reasonForDecision || null,
  });
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

const columns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    width: 50,
  },
  {
    title: "Recommendation",
    dataIndex: "recommendation",
    key: "recommendation",
  },
];

const handleSaveClick = () => {
  setAlertTitle("Record saved successfully.");
  setAlertData("Record saved successfully.");
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


 const handleSubmit = async(values) => {debugger
    console.log(values)
    const claimType = values.claimType;
    if(activeTabKey === "7" && POSContactData?.ClaimRegisteredBy === loginInfo?.userProfileInfo?.profileObj?.userName){
        setAlertTitle("");
        setAlertData("Claim approval is not allowed as it was submitted by the same user.");
        setShowAlert(true);
      return;
    }
     if(activeTabKey === "7"){
      const employeeID = loginInfo?.userProfileInfo?.profileObj?.allRoles?.[0]?.employeeID;
      handleSave(values);
    //  let res= apiCalls.DeathClaimApprovalAPI(details?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo, employeeID);
    //   res
    // .then((val) => {
    //   message.destroy();
    //   setIsLoading(false);
    //   if(val?.data?.responseBody?.errorcode === "1"){
    //       message.error({
    //       content:
    //         val?.data?.responseBody?.errormessage ||
    //         "Something went wrong please try again!",
    //       className: "custom-msg",
    //       duration: 2,
    //     });
    //   }else {
    //     handleSave(values);
    //   }
    // })
    // .catch((error) =>{
    //   message.destroy();
    //   setIsLoading(false);
    //      message.error({
    //       content:
    //         error?.responseBody?.errormessage ||
    //         "Something went wrong please try again!",
    //       className: "custom-msg",
    //       duration: 2,
    //     });
    // })
  }
  else{
    handleSave(values);
  }
 
}

const handleSave = async (values) => { debugger;

  const dummy1 = props?.propsData?.decisionDescriptionLU?.filter(
    (x) => Number(x.mstParentID) === Number(form.getFieldValue("ApproverDecision"))
  );
  // setDecisionDescription(dummy1);
  const hasParentID1 = dummy1?.some(
  (item) => Number(item?.mstParentID) === 1 || Number(item?.mstParentID) === 2);
  const hasParentID9 = dummy1?.some((item) => Number(item?.mstParentID) === 9);
   const hasParentID8 = dummy1?.some((item) => Number(item?.mstParentID) === 8);

  const policyNo = details?.policyDetailsObj?.identifiers?.policyNo;
  const employeeID = loginInfo?.userProfileInfo?.profileObj?.allRoles?.[0]?.employeeID;
 if (ClaimTypee === "DEATH" && (hasParentID1 || hasParentID9)) {
  if (hasParentID1) {
    setIsLoading(true);
    try {
      const response = await apiCalls.DeathClaimApprovalAPI(policyNo, employeeID);
    
      if(response?.data?.responseBody?.errorcode === "0") {
      setAlertTitle(response?.data?.responseBody?.successmessage);
      setAlertData(response?.data?.responseBody?.successmessage);
      setShowAlert(true);
      // return { success: false };
      }
      //  else if(response?.data?.responseBody?.errorcode === "1"){
      //       setAlertTitle(response?.data?.responseBody?.errormessage);
      // setAlertData(response?.data?.responseBody?.errormessage);
      // setShowAlert(true);
      // return { success: false };
      // }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }
  if (hasParentID9) {
    setIsLoading(true);
    try {
      const response =await apiCalls.RepudiateDeathClaimAPI(policyNo, employeeID);
       if(response?.data?.responseBody?.errorcode === "0") {
      setAlertTitle(response?.data?.responseBody?.successmessage);
      setAlertData(response?.data?.responseBody?.successmessage);
      setShowAlert(true);
      // return { success: false };
       } 
        else if(response?.data?.responseBody?.errorcode === "1"){
            setAlertTitle(response?.data?.responseBody?.errormessage);
      setAlertData(response?.data?.responseBody?.errormessage);
      setShowAlert(true);
      return { success: false };
        }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }
}
  //WOP|| TPD || CI
 if ((ClaimTypee === "WOP" || ClaimTypee === "TPD"|| ClaimTypee === "CI") && (hasParentID1 || hasParentID9)) {
  try {

    if (hasParentID1) {
      const response1 = await apiCalls.RegularPaymentsApproval(policyNo, employeeID);
      console.log("RegularPaymentsApproval response:", response1);
       if (response1?.data?.responseBody?.errorcode === "1") {
        setAlertTitle(response1.data.responseBody.errormessage);
        setAlertData(response1.data.responseBody.errormessage);
        setShowAlert(true);
        return { success: false };
       }
    }
    

    if (hasParentID9) {
      const response2 = await apiCalls.TerminateRegularPayments(policyNo, employeeID);
      console.log("TerminateRegularPayments response:", response2);
       if (response2?.data?.responseBody?.errorcode === "1") {
        setAlertTitle(response2.data.responseBody.errormessage);
        setAlertData(response2.data.responseBody.errormessage);
        setShowAlert(true);
        return { success: false };
       }
    }

  } catch (error) {
    console.error("Error during RegularPayments API calls:", error);
  } finally {
    setIsLoading(false);
  }
}


//Health calls
if (ClaimTypee === "Health"){
if (ClaimTypee === "Health" && (hasParentID1 || hasParentID9 || hasParentID8)) {
  try {
    if (typeofCondition === "Minor") {
      if (hasParentID1) {
        const response1 = await apiCalls.HealthMinorClaimApproval(policyNo, employeeID);
        console.log("HealthMinorClaimApproval response:", response1);
         if (response1?.data?.responseBody?.errorcode === "1") {
        setAlertTitle(response1.data.responseBody.errormessage);
        setAlertData(response1.data.responseBody.errormessage);
        setShowAlert(true);
        return { success: false };
       }
      }
      if (hasParentID8) {
        const response2 = await apiCalls.HealthMinorClaimRejection(policyNo, employeeID);
        console.log("HealthMinorClaimRejection response:", response2);
         if (response2?.data?.responseBody?.errorcode === "1") {
        setAlertTitle(response2.data.responseBody.errormessage);
        setAlertData(response2.data.responseBody.errormessage);
        setShowAlert(true);
        return { success: false };
       }
      }
      if (hasParentID9) {
        const response3 = await apiCalls.HealthMinorClaimRepudiate(policyNo, employeeID);
        console.log("HealthMinorClaimRepudiate response:", response3);
         if (response3?.data?.responseBody?.errorcode === "1") {
        setAlertTitle(response3.data.responseBody.errormessage);
        setAlertData(response3.data.responseBody.errormessage);
        setShowAlert(true);
        return { success: false };
       }
      }
    }

    if (typeofCondition === "Major") {
      if (hasParentID9) {
        const response4 = await apiCalls.HealthMajorClaimApproval(policyNo, employeeID);
        console.log("HealthMajorClaimApproval response:", response4);
           if (response4?.data?.responseBody?.errorcode === "1") {
        setAlertTitle(response4.data.responseBody.errormessage);
        setAlertData(response4.data.responseBody.errormessage);
        setShowAlert(true);
        return { success: false };
       }
      }
      if (hasParentID8) {
        const response5 = await apiCalls.HealthMajorClaimRejection(policyNo, employeeID);
        console.log("HealthMajorClaimRejection response:", response5);
          if (response5?.data?.responseBody?.errorcode === "1") {
        setAlertTitle(response5.data.responseBody.errormessage);
        setAlertData(response5.data.responseBody.errormessage);
        setShowAlert(true);
        return { success: false };
       }
      }
      if (hasParentID9) {
        const response6 = await apiCalls.HealthMajorClaimRepudiate(policyNo, employeeID);
        console.log("HealthMajorClaimRepudiate response:", response6);
          if (response6?.data?.responseBody?.errorcode === "1") {
        setAlertTitle(response6.data.responseBody.errormessage);
        setAlertData(response6.data.responseBody.errormessage);
        setShowAlert(true);
        return { success: false };
       }
      }
    }

    if (typeofCondition === "Moderate") {
      if (hasParentID9) {
        const response7 = await apiCalls.HealthModerateClaimApproval(policyNo, employeeID);
        console.log("HealthModerateClaimApproval response:", response7);
          if (response7?.data?.responseBody?.errorcode === "1") {
        setAlertTitle(response7.data.responseBody.errormessage);
        setAlertData(response7.data.responseBody.errormessage);
        setShowAlert(true);
        return { success: false };
       }
      }
      if (hasParentID8) {
        const response8 = await apiCalls.HealthModerateClaimRejection(policyNo, employeeID);
        console.log("HealthModerateClaimRejection response:", response8);
          if (response8?.data?.responseBody?.errorcode === "1") {
        setAlertTitle(response8.data.responseBody.errormessage);
        setAlertData(response8.data.responseBody.errormessage);
        setShowAlert(true);
        return { success: false };
       }
      }
      if (hasParentID9) {
        const response9 = await apiCalls.HealthModerateClaimRepudiate(policyNo, employeeID);
        console.log("HealthModerateClaimRepudiate response:", response9);
          if (response9?.data?.responseBody?.errorcode === "1") {
        setAlertTitle(response9.data.responseBody.errormessage);
        setAlertData(response9.data.responseBody.errormessage);
        setShowAlert(true);
        return { success: false };
       }
      }
    }

  } catch (error) {
    console.error("Error processing claim:", error);
  } finally {
    setIsLoading(false);
  }
}
}
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
          if(selectedSubType==="claimsrequest" && ["1", "2","3","4","5","6","7","8","9","10","11","12","13"].includes(activeTabKey)){
              if(activeTabKey==="1") {
                //setClaimDetailsData(values);
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
                setIntimationData(values);
              }
              else if(activeTabKey==="12"){
                setReferrelSheetData(values);
              }
              else if(activeTabKey==="7"){
                //   setAsessorsRecomandationData(values);
                // setAlertTitle(val?.data?.header);
                // setAlertData("Claim Assessed and moved to Claims Checker!");
                // setShowAlert(true);
                // return;
                const user = loginInfo?.userProfileInfo?.profileObj;
                setAlertTitle("");
                setAlertData("Claim decision submitted successfully");
                setShowAlert(true);
                setActiveTabKey("1");
                user.role = 34;
                user.roleName = "Claims Approver";
                user.boe = true;
                user.sourceId = 34;
                dispatch(profileObj(user))
                setNavigateTo("/claimsapprover")
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
              setAlertTitle(val?.data?.header);
              setAlertData(val?.data?.message);
              setShowAlert(true);
            }
    //   } else {
    //     message.error({
    //       content:
    //         val?.data?.responseBody?.errormessage ||
    //         "Something went wrong please try again!",
    //       className: "custom-msg",
    //       duration: 2,
    //     });
    //   }
    //   setIsLoading(false);
    // }

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

  const handleRadioChange =(e, item)=>{
 if(item?.name === "ReferClaim" && e.target.value === "yes"){
      ClaimsData[selectedSubType]?.Claim_Approver_Details?.forEach(element => {
        if (element?.name === "ReferTo") {
            element.hide= false;
            setUpdateFields(!updateFields);
        }
    });
    }
    else if(item?.name === "ReferClaim" && e.target.value === "no"){
      ClaimsData[selectedSubType]?.Claim_Approver_Details?.forEach(element => {
        if (element?.name === "ReferTo") {
            element.hide= true;
            setUpdateFields(!updateFields);
        }
    });
    }
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
    if (item.name === "claimType") {
      setClaimTypee((prevClaimTypee) => e);
    }
    else if(item.name === "ClaimIntimatedBy")
    {
      setClaimIntimatedBy((prevClaimTypee) => e);
    }
    else if(item.name === "ApproverDecision") {
      // Store both id and text for ApproverDecision
      const selectedOption = approverDecisionLU?.find(opt => opt.value === e);
      const text = selectedOption ? selectedOption.mstDesc : "";
      form.setFieldsValue({
        ApproverDecision: e,
        ApproverDecisionText: text
      });
        ApproverDecisionForm?.setFieldsValue({
        ApproverDecision: e,
        ApproverDecisionText: text
      });
      const dummy1 = props?.propsData?.decisionDescriptionLU.filter(
        (x) => Number(x.mstParentID) === Number(e)
      );
      setDecisionDescription(dummy1);
    }
    else if(item.name === "ApproverDecisionDescription") {
      // Store both id and text for ApproverDecisionDescription
      const selectedOption = (decisionDescription || []).find(opt => String(opt.value) === String(e));
      form.setFieldsValue({
        ApproverDecisionDescription: e,
        ApproverDecisionDescriptionText: selectedOption?.label || ""
      });
    }
      else if(item.name?.toLowerCase() === "natureofdeath"){
        setIsAccidentSelection(e);
      }

      else if(item.name === "ApproverDecision")
        {
          const data= props?.propsData?.decisionDescriptionLU;
          const ds= props?.propsData?.approverDecisionLU;
          const selectedDecision = approverDecisionLU?.find(x => Number(x.mstID) === Number(e));
          const decisionLabel = selectedDecision?.mstDesc || String(e);
          
          form.setFieldsValue({ ApproverDecisionText: decisionLabel });
          
          const dummy1 = props?.propsData?.decisionDescriptionLU.filter(
            (x) => Number(x.mstParentID) === Number(e)
          );
          setDecisionDescription(dummy1);
        }

        else if(item.name === "ApproverDecisionDescription")
          {
          const selectedDecision = props?.propsData?.decisionDescriptionLU?.find(x => Number(x.mstID) === Number(e));
          const decisionLabel = selectedDecision?.mstDesc || String(e);
          
          form.setFieldsValue({ ApproverDecisionDescriptionText: decisionLabel });

            // const dummy1 = props?.propsData?.decisionDescriptionLU.filter(
            //   (x) => Number(x.mstParentID) === Number(e)
            // );
            // setDecisionDescription(dummy1);
            // if(decisionDescription[0]?.mstParentID === 1){
            //     var response = apiCalls.DeathClaimApprovalAPI(details?.policyDetailsObj?.identifiers?.policyNo, loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID)
            // }
            // if(decisionDescription[0]?.mstParentID === 9){
            //     var response = apiCalls.RepudiateDeathClaimAPI(details?.policyDetailsObj?.identifiers?.policyNo, loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID)
           
          }

  };

  const visibilityRules = {
    NameofiIntimatingPerson: (context) => context.claimIntimatedBy !== "nominee",
    NameChangeAffidavit: (context) => context.isPennyDropStatus,
    NomineeDeathCertificate: (context) => context.isBeneficiaryChangeRequired,
    CopyofFirstInformationReport: (context) => context.isAccidentSelection == 3,
    CopyofPostMortemReport: (context) => context.isAccidentSelection === 3,
    NatureofDeath: (context) => context.ClaimTypee !== "CI"&& context.ClaimTypee  !== "TPD",
    DateofDeath: (context) => context.ClaimTypee !== "CI"&& context.ClaimTypee  !== "TPD",
    CauseofEvent: (context) => context.ClaimTypee === "CI" || context.ClaimTypee  === "TPD",
    DateofEvent: (context) => context.ClaimTypee === "CI" || context.ClaimTypee  === "TPD",
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
            handleSubDropdownChange={handleSubDropdownChange}
            handleRadioChange={handleRadioChange}
            laNomineeAddressLU={laNomineeAddressLU}
            subStageLU={subStageLU}
            assessorsDecisionLU={assessorsDecisionLU}
            handleRadioLink={handleRadioLink}
            approverDecisionLU={approverDecisionLU}
            dataBseCHeckLU = {dataBseCHeckLU}
            hotSpotCheckLU = {hotSpotCheckLU}
            referCaseToLU = {referCaseToLU}
            reinstatementDecisionLU={reinstatementDecisionLU}
            withDGHLU={withDGHLU}
            investigatorLU={investigatorLU}
            decisionDescriptionLU={decisionDescription}
            subDescriptionLU={subDescriptionLU}
        ></DetailsForm>
    );
};


  const handleSubDropdownChange = (value,obj,item)=>{
      //let CALL_TYP = masterData?.length>0 ? masterData?.filter((ele) => ele.key === "ASSESOR_DECI") :'';
      let SUB_TYP = masterData?.length>0 ? masterData?.filter((ele) => ele.key === "ASSESOR_SUB_DECI") :'';
      let transformedData = SUB_TYP[0]?.value.filter((ele)=>(ele.mstParentID === obj?.mstID)).map((ele) =>({
        ...ele,
        label: ele.mstDesc,
        value: ele.mstID
      }))
      setSubDescriptionLU(transformedData)
     if(item.name === 'PrimaryAssesorsDecision' && [2,3,4,6,7,8,9].includes(value)){
      ClaimsData[selectedSubType]?.AssessorsRecommendation_Referrel_Details_ReasonForDecision?.forEach(element => {
        if(['ReasonForDecision'].includes(element?.name)){
          element.hide = false
        }
      })
      setUpdateFields(!updateFields);
    }else if(item.name === 'PrimaryAssesorsDecision' && ![2,3,4,6,7,8,9].includes(value)){
      ClaimsData[selectedSubType]?.AssessorsRecommendation_Referrel_Details_ReasonForDecision?.forEach(element => {
        if(['ReasonForDecision'].includes(element?.name)){
          element.hide = true
        }
      });
      setUpdateFields(!updateFields);
    }
  }

const handleRadioLink = (item) => {
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
  const getTransactionData = (values) => {debugger;
    if (selectedSubType === "claimsrequest" && activeTabKey === "1") {
        return [
          { Status: "Create", TagName: "ClaimIntimatedBy", TagValue: values?.ClaimIntimatedBy || ""},
          { Status: "Create", TagName: "ClaimIntimatedOn", TagValue: values?.ClaimIntimatedOn || ""},
          { Status: "Create", TagName: "ClaimRegisteredBy", TagValue: values?.ClaimRegisteredBy || ""},
          { Status: "Create", TagName: "ClaimRegisteredOn", TagValue: values?.ClaimRegisteredOn || ""},
          { Status: "Create", TagName: "AssesmentDoneBy", TagValue: values?.AssesmentDoneBy || ""},
          { Status: "Create", TagName: "AssesmentDoneOn", TagValue: values?.AssesmentDoneOn || ""},
          { Status: "Create", TagName: "ClaimAppprovedBy", TagValue: loginInfo?.userProfileInfo?.profileObj?.userName},
          { Status: "Create", TagName: "ClaimApprovedOn", TagValue:  new Date()},
        ]
      }
      if (selectedSubType === "claimsrequest" && activeTabKey === "2") {
        return [
          { Status: "Create", TagName: "ClaimHotspotCheck", TagValue: values?.ClaimHotspotCheck || ""},
          { Status: "Create", TagName: "IIBDataBaseCheck", TagValue: values?.IIBDataBaseCheck || ""},
          { Status: "Create", TagName: "IndustryCheck", TagValue: values?.IndustryCheck || ""},
          { Status: "Create", TagName: "AutoPayStatus", TagValue: values?.AutoPayStatus || ""},
        ]
      }
    else if (selectedSubType === "claimsrequest" && activeTabKey === "3") {
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
    else if (selectedSubType === "claimsrequest" && activeTabKey === "4") {
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
    else if (selectedSubType === "claimsrequest" && activeTabKey === "5") {
      return [
          { Status: "Create", TagName: "WithinFGLIRetention", TagValue: values?.WithinFGLIRetention|| ""},
         { Status: "Create", TagName: "FGLIRetention", TagValue: values?.FGLIRetention|| ""},
         { Status: "Create", TagName: "ReInsurerName", TagValue: values?.ReInsurerName|| ""},
         { Status: "Create", TagName: "ReInsurerParticipation", TagValue: values?.ReInsurerParticipation|| ""},
         { Status: "Create", TagName: "LifeAsiaTransactions", TagValue: values?.LifeAsiaTransactions|| ""},
        { Status: "Create", TagName: "TotalClaimPayable", TagValue: values?.TotalClaimPayable|| ""},
      ]
    }
    else if (selectedSubType === "claimsrequest" && activeTabKey === "6") {
      return [
        { Status: "Create", TagName: "AssesorRecommendation", TagValue: values?.AssesorRecommendation|| ""},
        { Status: "Create", TagName: "CheckerRecommendation", TagValue: values?.CheckerRecommendation|| ""},
      ]
    }
    else if (selectedSubType === "claimsrequest" && activeTabKey === "7") {debugger;
      return [
        { Status: "Create", TagName: "PrimaryDecision", TagValue: values?.PrimaryDecision || ""},
        { Status: "Create", TagName: "PrimaryDecisionDescription", TagValue: values?.PrimaryDecisionDescription || ""},
        { Status: "Create", TagName: "AssessmentDecision", TagValue: values?.AssessmentDecision || ""},
        { Status: "Create", TagName: "AssessmentDecisionDescription", TagValue: values?.AssessmentDecisionDescription || ""},
        { Status: "Create", TagName: "ApproverDecision", TagValue: values?.ApproverDecision || ""},
        { Status: "Create", TagName: "ApproverDecisionText", TagValue: form.getFieldValue("ApproverDecisionText") || ""},
        { Status: "Create", TagName: "ApproverDecisionDescription", TagValue: values?.ApproverDecisionDescription || ""},
        { Status: "Create", TagName: "ApproverDecisionDescriptionText", TagValue: form.getFieldValue("ApproverDecisionDescriptionText") || ""},
        { Status: "Create", TagName: "ApproverRemarks", TagValue: values?.ApproverRemarks || ""},
      ]
    }
  };

  // const checkerDecHandler = (val) => {debugger
  //   const valueFind = approverDecisionLU.find((item) => item.mstID === val);
  //   setCheckerDecision(valueFind?.mstDesc);
  //   setCheckerDecErr(false);
  
  //   // Filter Decision Descriptions based on selected Checkers Decision ID
  //   const filtered = decisionDescriptionLU.filter(
  //     (desc) => Number(desc.mstParentID) === Number(val)
  //   );
  //   setFilteredDescriptions(filtered);
  
  //   // Reset DecisionDescription field value when CheckersDecision changes
  //   form.setFieldsValue({ DecisionDescription: undefined });
  // };

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

  const getAge = (dob) => {
  if (!dob) return null;
  const birth = new Date(dob);
  const diff = Date.now() - birth.getTime();
  const ageDt = new Date(diff);
  return Math.abs(ageDt.getUTCFullYear() - 1970);
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
    if (parseInt(nextTabKey, 10) <= 13) {
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
   message.destroy();
                  message.success({
                   content: "Record saved successfully..",
                   className: "custom-msg",
                   duration: 2,})
    setShowSubmitBtn(true);
    //setAlertTitle("Record saved successfully.");
    //setAlertData("Record saved successfully.");
  }

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
               <TabPane  tab={<span>Intimation Details</span> } key="1">
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
                    {renderDetailsForm("Primary_Intimation_Details2")}
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
                 Policy Checks
                </span>
              }
              key="2"
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
                    {renderDetailsForm("PolicyChecks_Approver_Details")}
                    <div className="contact-details-btn">

                      <Button type="primary" className="primary-btn" htmlType="submit"
                      >
                       Next
                      </Button>

                    </div>
                  </Form>

                </>}
            </TabPane>
            <TabPane
              tab={
                <span>
                  Beneficiary Details
                </span>
              }
              key="3"
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
                                  //onChange={(e) => handleStatusAliveChange(index, e.target.value)}
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
               <div className="mb-16">
                    <h4 className="subtype-headings fs-16 fw-500">
                   View New Beneficiary Details
                   {/* <span>
                   {Edit && <EditOutlined onClick={() => {handleEdit('edit');setIsEdit(false)}} className="editIconn"/>}

{!Edit && <CloseOutlined onClick={() => {handleEdit('close'); setIsEdit(true)}} className="editIconn" />}
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
disabled={!isEditNominee}
maxLength={100}
onChange={(e) => handleNomineeLastNameChange(index, e.target.value)}

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
                 onChange={(value) => handleRelationshipChange(index, value,row)}
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
   onChange={(e) => handleShareChange(index, e.target.value,row)}
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
               </div>
               </>}
               {
                    isPolicyAssigned?.isPolicyAssigned === "Y" && 
                    <div className="mb-10">
                      <h4 className="subtype-headings fs-16 fw-500">
                        View Assignee Details
                      </h4>{"  "}
                      <table className="claims-table">
                          <thead>
                            <th>Assignee Name</th>
                            <th>Assignee ID</th>
                            <th>Assignee Email</th>
                            <th>Assignee Mobile Number</th>
                          </thead>                    
                          <tbody>
                            <td>{isPolicyAssigned?.assigneeName}</td>
                            <td>{isPolicyAssigned?.assigneeID}</td>
                            <td>{isPolicyAssigned?.assigneeEmailID}</td>
                            <td>{isPolicyAssigned?.assigneeMobileNo}</td>
                        </tbody>
                      </table>
                    </div>
                  }
                      <div className="d-flex">
                    <h4 className="subtype-headings fs-16 fw-500">
                    View Personal Details of Beneficiary
                    {/* <span>
                    {isBeneficiaryEdit && <EditOutlined onClick={() => {handleEdit('edit',"beneficiary");setIsBeneficiaryEdit(false)}} className="editIconn"/>}

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
                    message: 'Enter Nominee address_1',
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
                  disabled={!isEditBeneficiary}
                  onChange={(e) => handleAccNumberChange(index, 'NomineeEmail', e.target.value)}
                />
              </Form.Item>
            </td>
          </tr>
          <br/>
          </tbody>
    </table>
    : <></>
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
            <TabPane
              tab={
                <span>
                  Beneficiary Bank Details
                </span>
              }
              key="4"
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
            {/* <TabPane  tab={<span>Claim Payment Details</span> } key="5">
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
                    {renderDetailsForm("Claim_Approver_Payment_Details")}
                    <div className="contact-details-btn">

                      <Button type="primary" className="primary-btn" htmlType="submit"
                      >
                       Save
                      </Button>

                    </div>
                  </Form>
            </TabPane> */}
                    <TabPane tab={<span>Claim Payment Details</span>} key="5">
  <Form
    form={reInsureForm}
    name="wrap"
    labelCol={{ flex: "35%" }}
    labelAlign="left"
    labelWrap
    wrapperCol={{ flex: 1 }}
    colon={false}
    onFinish={handleNextClick}
    autoComplete="off"
  >
    <div className="d-flex mb-16">
      <h4 className="subtype-headings fs-16 fw-500">
        Re-Insurer Details
      </h4>
    </div>

      <div className="fgli-retention-wrapper">
                                      <Row gutter={16} className="mb-16">
                                        <Col span={12}>
                                          <label className="field-label" style={{ fontWeight: 'bold' }}>Within FGLI Retention</label>
                                          <Form.Item
                                            name={['reInsureDetails', 0, 'withinRetention']}
                                            className="mb-0"
                                            rules={[{ required: true, message: "Select Within Retention" }]}
                                          >
                                            <Select
                                            
                                           disabled
                                            />
                                          </Form.Item>
                                        </Col>
                                
                                        <Col span={12}>
                                          <label className="field-label" style={{ fontWeight: 'bold' }}>FGLI Retention Amount</label>
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
                                                //rules={[{ required: !row?.isDisable, message: "Enter Re-Insurer Name" }]}
                                              >
                                                <Input
                                                  className="custom-input"
                                                  value={row?.reInsurerName}
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
            {/* <input type="number" min="0" step="0.01"  value={claimPayout.riderSumAssured}  onChange={(e) => handleClaimPayout("riderSumAssured", e.target.value)} /> */}
          </td>
        </tr>
        <tr>
          <td>Premiums to be Waved</td>
          <td>
            {claimPayout.premiumsToBeWaved}
            {/* <input type="number" min="0" step="0.01" value={claimPayout.premiumsToBeWaved} onChange={(e) => handleClaimPayout("premiumsToBeWaved", e.target.value)} /> */}
          </td>
        </tr>
        <tr>
          <td>Add: Premium Suspense</td>
          <td>
            {claimPayout.premiumSuspense}
            {/* <input type="number" min="0" step="0.01"  value={claimPayout.interestCharges}   onChange={(e) => handleClaimPayout("premiumSuspense", e.target.value)} /> */}
          </td>
        </tr>
        <tr>
          <td>Add: Interest Charges</td>
          <td>
            {claimPayout.interestCharges}
            {/* <input type="number" step="0.01" min="0"   value={claimPayout.penalInterestCharges}   onChange={(e) => handleClaimPayout("interestCharges", e.target.value)} /> */}
          </td>
        </tr>
        <tr>
          <td>Add: Penal Interest Charges</td>
          <td>
            {claimPayout.penalInterestCharges}
            {/* <input type="number" min="0" step="0.01" onChange={(e) => handleClaimPayout("penalInterestCharges", e.target.value)} /> */}
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
            {/* <input type="number" step="0.01" min="0" value={claimPayout.premiumRecovery}   onChange={(e) => handleClaimPayout("premiumRecovery", e.target.value)} /> */}
          </td>
        </tr>
        <tr>
          <td>Less: Survival Benefit/Withdrawals</td>
          <td>
            {claimPayout.survivalBenefit}
            {/* <input type="number" min="0" step="0.01"   value={claimPayout.survivalBenefit}  onChange={(e) => handleClaimPayout("survivalBenefit", e.target.value)} /> */}
          </td>
        </tr>
        <tr>
          <td>Total Payout Amount Payable</td>
          <td>{totalClaimPayable}</td>
        </tr>
      </tbody>
    </table>

    <div className="contact-details-btn">
      <Button type="primary" className="primary-btn" htmlType="submit">
        Next
      </Button>
    </div>
  </Form>
</TabPane>

                        <TabPane tab={<span>Recommendations</span>} key="6">
      <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          centered
          items={[
            {
              key: "maker",
              label: (
                <span style={{ fontWeight: activeTab === "maker" ? "bold" : "normal" }}>
                  Maker Recommendations
                </span>
              ),
              children: <Table columns={columns} dataSource={makerData} pagination={false} />,
            },
            {
              key: "checker",
              label: (
                <span
                  style={{
                    fontWeight: activeTab === "checker" ? "bold" : "normal",
                    color: activeTab === "maker" ? "#aaa" : "#000",
                  }}
                >
                  Checker Recommendations
                </span>
              ),
              children: <Table columns={columns} dataSource={checkerData} pagination={false} />,
            },
          ]}
        />
      </div>
    </TabPane>

  
            <TabPane  tab={<span>Decision</span> } key="7">
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
         <Form
                form={ApproverDecisionForm}
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
              ></Form>

          {renderDetailsForm("Claim_Approver_Details")}
                    <div className="text-area mt-16">
                    <Form.Item
                      label="Approver's Remarks"
                      name="ApproverRemarks"
                      className="inputs-label mb-0"
                      rules={[
                        {
                          required: false,
                          message: "Approver's Remarks",
                        },
                      ]}
                    >
                      <TextArea rows={6} placeholder="Approver's Remarks" />
                    </Form.Item>
                  </div>
                    <div className="contact-details-btn">

                      <Button type="primary" className="primary-btn"onClick={()=>handleAssessmentSave()}
                      >
                       Save
                      </Button>
                      <Button type="primary" className="primary-btn" htmlType="submit"
                      disabled={!showSubmitBtn}
                      >
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
        title="OFAC List Check Details"
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
    </>
  );
}

export default ClaimsApproverUser;
