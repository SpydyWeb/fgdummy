import React, { useEffect, useState,useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Form, Spin, Button, message, Input, Tabs, Radio,DatePicker,Select, Modal, Checkbox,Tooltip, Table,Menu,Dropdown, Row, Col } from "antd";
import { ClaimsData } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import moment from "moment";
import UploadIcon from "../../assets/images/upload.png";
import apiCalls from "../../api/apiCalls";
import PopupAlert from "../popupAlert";
import dayjs from "dayjs";
import html2pdf from "html2pdf.js";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import CloseIcon from "../../assets/images/close-icon.png";
import { profileObj } from "../../reducers/ProfileReducer";

const { TabPane } = Tabs;
const { Option } = Select;
const ClaimsPrimaryAssesment = (props) => {
  
  const loginInfo = useSelector(state => state);
  const dateFormat = "DD/MM/YYYY";
  const [emailExist] = useState(false);
  const suffix = <img src={UploadIcon} alt="" />;
  const { selectedSubType, clientRoleLU, details, customerData, clientEnquiryData,causeOfEventLU, natureOfDeathLU,policyTypeLU,claimCategoryLU,claimIntimationLU,sourceInformationLU,assuredIncomePlanLU,POSContactData,laNomineeAddressLU,subStageLU,assessorsDecisionLU,policyStatusDOBLU, loggedUser,dataBseCHeckLU,hotSpotCheckLU,referCaseToLU,reinstatementDecisionLU,withDGHLU,investigatorLU, decisionDescriptionLU,masterData, isPolicyAssigned, uwDecisionNewLU } = props?.propsData;
  const [form] = Form.useForm();
  const [nomineeform] = Form.useForm();
  const [nomineebankform] = Form.useForm();
  const [uploadform] = Form.useForm();
  const [reInsureForm] = Form.useForm();
  const [reInstatementForm] = Form.useForm();
  const [policyCheckForm] =  Form.useForm();
  const [claimDetailsForm] = Form.useForm();
  const [assignmentForm] = Form.useForm();
  const [referrelSheetForm] = Form.useForm();
  const [assessorsForm] =  Form.useForm();
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
  const [policyDetailsData, setPolicyDetailsData] = useState({});
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
  const [isCreateJEDisabled, setIsCreateJEDisabled] = useState(false);

  // Sync PrimaryRefarCaseToText whenever ReferCaseTo changes
  useEffect(() => {
    if (form && referCaseToLU) {
      const referCaseToId = form.getFieldValue('ReferCaseTo');
      if (referCaseToId) {
        const selectedOption = referCaseToLU.find(opt => opt.mstID === referCaseToId);
        const text = selectedOption ? selectedOption.mstDesc : "";
        form.setFieldsValue({ PrimaryRefarCaseToText: text });
      }
    }
  }, [referCaseToLU, form.getFieldValue('ReferCaseTo')]);
  const [isShowRequirements, setIsShowRequirements] = useState(false);
  const [isRerenderForm, setIsReRenderForm] = useState(false);
  const [policyCheckData,setPolicyCheckData] = useState({});
  const [reInstatementData,setReInstatementData] = useState({});
  const [assignmentData, setAssignmentData] = useState({});
  const [claimPaymentData, setClaimPaymentData] = useState([]);
  const [referrelSheetData, setReferrelSheetData] = useState({});
  const [asessorsRecomandationData,setAsessorsRecomandationData] = useState({});
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [negativeList, setNegativeList] = useState([]);
  const [showSubmitBtn, setShowSubmitBtn] = useState(false);
  const [raiseRequirementButton, setRaiseRequirementButton] = useState(false);
  const [isShowOtherDocument, setIsShowOtherDocument] = useState(false);
  const [raiseRequirementOpen,setRaiseRequirementOpen] = useState(false);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [isLoader,setIsLoader] = useState(false);
  const [serviceRequestId, setServiceRequestId] = useState(null);
  const [showRaiseRequirementBtn,setShowRaiseRequirementBtn] = useState(false);
  const [isRiderData, setIsRiderData] = useState([])
  const [NameDeDupeData,setNameDeDupeData] = useState([]);
  const [NameDeDupeModal,setNameDeDupeModal] = useState(false);
  const [deDupeModalOpen, setDeDupeModalOpen] = useState(false);
  const [BankduDupeData,setBankDeDupeData] = useState([]);
  const [followUpsData, setFollowUpsData] = useState([]);
  const [viewTransactionModal, setViewTransactionModal] = useState(false);
  const [viewTransactionData, setViewTransactionData] = useState([]);
  const [viewTransLoader, setViewTransLoader] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [hideInvestDetails, setHideInvestDetails] = useState(false)
  const [subDescriptionLU, setSubDescriptionLU] = useState([]);
  const [isReferallData, setIsReferallData] = useState('')
  const [deathSumAssured, setDeathSumAssured] = useState(null);
  const [showAgentSourcing, setShowAgentSourcing] = useState(false);
  const [showAgentSourcingDetails, setShowAgentSourcingDetails] = useState([]);
  const [decisionDescription, setDecisionDescription] = useState([]);
  const [claimsData, setClaimsData] = useState(ClaimsData);
  const [claimsData1, setClaimsData1] = useState(ClaimsData);
  const [decisionPrimaryDescriptionLU, setDecisionPrimaryDescriptionLU] = useState([]);
  const [statusAliveValues, setStatusAliveValues] = useState([]);
  const [beneficiaryDetails, setBeneficiaryDetails] = useState([]);
  const [updateExistingNomineeData, setUpdateExistingNomineeData] = useState([]);
  const [consolidatedBeneficiaryList, setConsolidatedBeneficiaryList] = useState([]);
  const [updateNomineeData, setUpdateNomineeData] = useState([]);
  const [updateAppointeeData, setUpdateAppointeeData] = useState([
    {id:1, AppointeeDOB_New: null, RealtionshipWithPolicyowner_New: null, Share_New: 100, Role_New:"appointee",isMinor:false, AppointeeLastName_New: "", AppointeeFirstName_New: ""},
  ]);

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

  // Function that will be called globally
  const addInvestigator = () => {
    if (addInvestigatorRef.current) {
      addInvestigatorRef.current(); // Call the stored add function
    }
  };
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [showCommentsModal1, setShowCommentsModal1] = useState(false);
  const [addComments, setAddComments] = useState(null);
  const [checkersRecommendation, setCheckersRecommendation] = useState(null);
  const [allComments, setAllComments] = useState([]);
  const [reInsureDetails, setReInsureDetails] = useState([
    { id: 1, withinRetention: '', retentionAmount: null, reInsurerName: '', participation: null, isDisable: false },
  ]);
   const [reInsureUpdateDetails, setReInsureUpdateDetails] = useState([])
  const [investDetails, setInvestDetails] = useState([
    { id: 1, investigatorName: '', investigationStartDate: null, investigationEndDate: null, isDisable: false },
  ]);
  const [investObj, setInvestObj] = useState({
    investigatorName : null, 
    investigationStartDate: null,
    investigationEndDate: null })
  const dispatch = useDispatch();
  const [investData, setInvestData] = useState([]);
  const [initiateInvestigation, setInitiateInvestigation] = useState(null);
  const [isdisable, setIsDisable] = useState(true);
  const handleInvestAdd = () => {
    const newRow = {
      id: Date.now(),
      investigatorName: null,
      investigationStartDate: null,
      investigationEndDate: null,
      isDisabled: initiateInvestigation !== 'yes', // Apply the logic to each row
    };
    setInvestData([...investData, newRow]);
  };
  
  const getButtonColor = (status) => {
    switch (status) {
      case "received":
        return "green";
      case "not_received":
        return "#b21f1f";
      case "waiver":
        return "#f26522";
      default:
        return "#b21f1f";
    }
  };
 const handleStatusChange = (index, status) => {
    const updated = [...requirementValues];
    updated[index] = { ...updated[index], status };
    setRequirementValues(updated);
  };
const handleInvestChange = (index, field, value) => {
  const newData = [...investData];
  newData[index][field] = value;
  setInvestData(newData);
};

  const handleAdd = () => {
    const newData = {
      id: reInsureDetails.length + 1,
      withinRetention: 'Yes',
      retentionAmount: '',
      reInsurerName: '',
      participation: '',
      isManuallyAdded: true,
    };
    setReInsureDetails([...reInsureDetails, newData]);
  };
  
  // const handleInvestAdd = () => {
  //   const newData = {
  //     id: investDetails?.length + 1,
  //     investigatorName: '',
  //     investigationStartDate: '',
  //     investigationEndDate: '',
  //   };
  //   setInvestDetails([...investDetails, newData]);
  // };

  // const handleDelete = (id, index) => {
  //   if (reInsureDetails.length > 1) {
  //     form.setFieldsValue({
  //       reInsureDetails: {
  //         [id]: {
  //           withinRetention: '',
  //     retentionAmount: '',
  //     reInsurerName: '',
  //     participation: '',
  //     isDisable: false
  //         },
  //       },
  //     });
  //     const updatedupdateNomineeData = reInsureDetails.filter((row) => row.id !== id);
  //     setReInsureDetails(updatedupdateNomineeData);
  //     // Reset the form instance to reflect the changes
  //     reInsureForm.resetFields([`reInsureDetails[${index}].withinRetention`, `reInsureDetails[${index}].retentionAmount`, `reInsureDetails[${index}].reInsurerName`, `reInsureDetails[${index}].participation`, `reInsureDetails[${index}].isDisable` ],);
  //   }
  // };

  const handleDelete = (id, index, row) => {
    const tagIndex = index + 1; // Use index for naming (not id)
  
    const obj = {
      SrvReqID: POSContactData?.srvReqID,
      Tags: [
        {
          TagName: "participation_" + tagIndex,
          TagValue: row.participation
        },
        {
          TagName: "reInsurerName_" + tagIndex,
          TagValue: row.reInsurerName
        },
      ]
    };
  
    apiCalls.DeleteClaimsdetails(obj); // assuming it's async-safe or handled internally
  
    // Filter out the item to delete
    const updatedDetails = reInsureDetails.filter((item) => item.id !== id);
  
    // Update the state
    setReInsureDetails(updatedDetails);
  
    // Set updated values in the form
    reInsureForm.setFieldsValue({ reInsureDetails: updatedDetails });
  
    // Optionally: Reset the removed index’s fields if needed (not required if above setFieldsValue is used)
  };
  
  const handleDeleteLastEntry = () => {
    if (allComments.length === 0) {
      message.warning("No comments to delete.");
      return;
    }
  
    const lastComment = allComments[allComments.length - 1];
    const recommendation = lastComment.claimRecommendation;
  
    apiCalls
      .GetClaimsDeleteCommentsInfo(POSContactData?.srvReqID, recommendation)
      .then((val) => {
        if (val?.data?.length > 0) {
          const updatedComments = allComments.slice(0, -1); // Remove last element
  
          setAllComments(updatedComments);
  
          // Clear the PrimaryAssessorRecommendation field
          form.setFieldsValue({ generalComments: '' });
  
          message.success(val?.data);
        } else {
          message.warning("No matching comment found to delete.");
        }
      })
      .catch(err => {
        message.error("Failed to delete comment.");
        console.error(err);
      });
  };
  
 
  
  const handleDownloadPDF= async () => {
    // const tabData = {
    //   comments:allComments[0]?.claimRecommendation
    // };
    const tabData = {
      comments: allComments
        .map(c => c.claimRecommendation)
        .filter(Boolean) 
    };

  
    await generatePDF(tabData.comments);
  };
  const generatePDF = async (allComments) => {
    let template = await fetchTemplate();
    if (!template) {
      console.error(" Template could not be loaded.");
      return;
    }
  
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = template;
    tempDiv.id = "pdf-content";
  
    tempDiv.style.display = "block";
    tempDiv.style.width = "100%";
    tempDiv.style.fontFamily = "Arial, sans-serif";
    tempDiv.style.padding = "20px";  
    tempDiv.style.margin = "20px";   
  
    const headers = tempDiv.querySelectorAll("td[colspan='3']");
    headers.forEach(header => {
      header.style.fontSize = "18px";
      header.style.fontWeight = "bold";
      header.style.textAlign = "left"; 
      header.style.padding = "15px 10px";  
      header.style.backgroundColor = "#f4f4f4";
      header.style.marginBottom = "20px";  
    });
  
    const table = tempDiv.querySelector("table");
    if (table) {
      table.style.width = "100%";
      table.style.textAlign = "left"; 
    }
  
    document.body.appendChild(tempDiv);
    updateTableData(tempDiv, allComments);
    await new Promise(resolve => setTimeout(resolve, 500)); 
    convertToPDF(tempDiv);
  };
  const getLabelFromKey = (key) => {
    const mapping = {
      Comments: "Comments", 
    };
  
    return mapping[key] || null;
  };
  const fetchTemplate = async () => {
    try {
      const response = await fetch('/DownloadPdf.html'); 
     // if (!response.ok) throw new Error(HTTP error! Status: ${response.status});
  
      const text = await response.text();
      console.log("Template Loaded Successfully");
      return text;
    } catch (error) {
      console.error("Error loading the template:", error);
      return "";
    }
  };
  const updateTableData = (container, comments) => {
    const table = container.querySelector("table.es-table");
  
    if (!table) {
      console.error("Table not found in the template.");
      return;
    }
  
    // Clear out existing rows except for the header
    const rows = table.querySelectorAll("tr");
    rows.forEach((row, index) => {
      if (index !== 0) row.remove(); // Keep header, remove rest
    });
  
    // Append new rows for each comment
    comments.forEach((comment, index) => {
      const row = document.createElement("tr");
  
      const srCell = document.createElement("td");
      srCell.textContent = index + 1;
      srCell.style.padding = "15px";
      srCell.style.backgroundColor = "#fff";
      srCell.style.textAlign = "left";
      srCell.style.width = "50px";
  
      const commentCell = document.createElement("td");
      commentCell.textContent = comment;
      commentCell.style.padding = "3px";
      commentCell.style.backgroundColor = "#fff";
      commentCell.style.width = "470px";
  
      row.appendChild(srCell);
      row.appendChild(commentCell);
      table.appendChild(row);
    });
  };
  
  const convertToPDF = (element) => {
    let opt = {
      margin: [15, 15, 15, 15], 
      filename: "DownloadPdf.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 3, windowWidth: document.body.scrollWidth },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };
  
    setTimeout(() => {
      html2pdf()
        .from(element)
        .set(opt)
        .save()
        .then(() => {
          console.log(" PDF generated successfully!");
          document.body.removeChild(element);
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    }, 1000);
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

  const handleSelectChange = (value, index) => {
    const newValues = [...requirementValues];
    newValues[index].status = value;
  
    setRequirementValues(newValues);
  };

  const handleCheckboxChange = (e, index, type) => {
    const newValues = [...requirementValues];
  
    if (type === "received") {
      newValues[index] = {
        ...newValues[index],
        received: e.target.checked,
        notReceived: !e.target.checked,  // Deselect the other checkbox
      };
    } else {
      newValues[index] = {
        ...newValues[index],
        received: !e.target.checked,
        notReceived: e.target.checked,  // Deselect the other checkbox
      };
    }
  
    setRequirementValues(newValues);
  };
  
  
  


const handleTabChange = (key) => {
  setActiveTabKey(key);
  if(key === "10"){
    handleViewComments();
  }
  if(key === "11"){
    handleViewComments();
  }
  if(key === "12"){
    handleViewComments();
  }
};
// const posChangeinPlanObj= {
// }

let posChangeinPlanObj = {};
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
const [requirementValues, setRequirementValues] = useState([]);

const syncFormWithState = () => {
  form.setFieldsValue({
    requirementsData: requirementValues.map((req, index) => ({
      requirement: selectedRequirements[index],
      received: req.received,
      notReceived: req.notReceived,
      status: req.status,
    })),
  });
};

const handleChange = (value) => {
  setSelectedRequirements(value);

  // Initialize requirementValues when requirements are selected
  const initialValues = value.map((v) => ({
    received: false,
    requirement: v,
    notReceived: false,
    status: "" // Dropdown value
  }));
  setRequirementValues(initialValues);
  //syncFormWithState();
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

const calculateDifference = (rcd, dod) => {
  const format = "DD/MM/YYYY";
  const startDate = moment(rcd, format);
  const endDate = moment(dod, format);

  const years = endDate.diff(startDate, 'years');
  const startDatePlusYears = startDate.clone().add(years, 'years');

  const months = endDate.diff(startDatePlusYears, 'months');
  const startDatePlusYearsAndMonths = startDatePlusYears.clone().add(months, 'months');

  const days = endDate.diff(startDatePlusYearsAndMonths, 'days');

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


useEffect(()=>{
  let requirements = POSContactData?.serviceRequestTransectionData
  ?.filter(element => element.tagName?.startsWith("Requirement_") &&  element.tagName.endsWith("_Text") && element.tagValue?.length > 0)
  ?.map(element => element.tagValue); // Extract only tagValue

if (requirements.length > 0) {
  const requirementDescriptions = requirements.map((item) => item.tagValue);

  // Set state for selectedRequirements and initialize values
  setSelectedRequirements(requirements);
  
  const initialValues = requirementDescriptions.map((desc) => ({
    requirement: desc,
    received: false,
    notReceived: false,
    status: "",
  }));
  setRequirementValues(requirements);
  
}

  
if(customerData?.isClaimsPrimaryAssesment && activeTabKey ==="1"){debugger
  const mergedObj = {
    ...(POSContactData?.claimsDetails || {}),
    ...(POSContactData?.notification || {})
  };
  posChangeinPlanObj = mergedObj;
        // POSContactData?.serviceRequestTransectionData?.forEach(element => {
        //   posChangeinPlanObj[element.tagName] = element.tagValue
        // });

        
        const fetchData = async () => {
          const data = await getClientData();
          console.log(data);
        


        const laDOD = calculateAgeOnDeath(data?.clTdob, posChangeinPlanObj?.dateofDeath)
        form.setFieldsValue({
          custRole: posChangeinPlanObj?.custRole ? parseInt(posChangeinPlanObj.custRole, 10) : null,
          srvReqID: posChangeinPlanObj?.srvReqRefNo,
          policyType:  policyDetailsData?.policyType || details?.policyDetailsObj?.planAndStatus?.policyType,
          LAClientID:  policyDetailsData?.LAClientID || details?.policyDetailsObj?.identifiers?.la_ClientID || null,
          POClientID: policyDetailsData?.POClientID || details?.policyDetailsObj?.identifiers?.po_ClientID  || null,
          ApplicationDate: policyDetailsData?.ApplicationDate || (posChangeinPlanObj?.ApplicationDate? parseInt(posChangeinPlanObj?.ApplicationDate) : null),
          Totalpremiumpaidtilldate:  policyDetailsData?.Totalpremiumpaidtilldate || posChangeinPlanObj?.Totalpremiumpaidtilldate,
          LifeAsiaTransactionsAfterDOD:  policyDetailsData?.LifeAsiaTransactionsAfterDOD || posChangeinPlanObj?.LifeAsiaTransactionsAfterDOD,
          policyStatusOnDateOfDeath:  posChangeinPlanObj?.policyStatusOnDateOfDeath ?parseInt(posChangeinPlanObj?.policyStatusOnDateOfDeathID) : policyDetailsData?.policyStatusOnDateOfDeathID,
          LAAgeonDOD:  policyDetailsData?.LAAgeonDOD || laDOD,
          LAOccupation:  policyDetailsData?.LAOccupation || data?.occpcode,
          LifeAssuredAnnualIncome:  policyDetailsData?.LifeAssuredAnnualIncome || POSContactData?.LifeAssuredAnnualIncome,
          DurationfromRCDTillDOD:  policyDetailsData?.DurationfromRCDTillDOD || posChangeinPlanObj?.dateofDeath ? calculateDifference(convertDate(details?.policyDetailsObj?.saDetails?.rcd),formatDate(posChangeinPlanObj?.dateofDeath)) : null,
          DurationfromRCDTillDODIntimation:  policyDetailsData?.DurationfromRCDTillDODIntimation || posChangeinPlanObj?.dateOfIntimation ? calculateDifference(convertDate(details?.policyDetailsObj?.saDetails?.rcd),formatDate(posChangeinPlanObj?.dateOfIntimation)) : null,
          UWDecision1:  policyDetailsData?.UWDecision1 || posChangeinPlanObj?.UWDecision1,
          UWComments:  policyDetailsData?.UWComments || posChangeinPlanObj?.UWComments,
          LifeAssuredGender:  policyDetailsData?.LifeAssuredGender || data?.cltsex,
        });
      };
      fetchData();

  //         form.setFieldsValue({
  //   custRole: mergedObj?.custRole ? parseInt(mergedObj.custRole, 10) : null,
  //   srvReqID: mergedObj?.srvReqRefNo,
  //   policyType: policyDetailsData?.policyType || details?.policyDetailsObj?.planAndStatus?.policyType,
  //   LAClientID: policyDetailsData?.LAClientID || details?.policyDetailsObj?.identifiers?.la_ClientID || null,
  //   POClientID: policyDetailsData?.POClientID || details?.policyDetailsObj?.identifiers?.po_ClientID  || null,
  //   ApplicationDate: policyDetailsData?.ApplicationDate || (mergedObj?.ApplicationDate ? parseInt(mergedObj?.ApplicationDate) : null),
  //   Totalpremiumpaidtilldate: policyDetailsData?.Totalpremiumpaidtilldate || mergedObj?.Totalpremiumpaidtilldate,
  //   LifeAsiaTransactionsAfterDOD: policyDetailsData?.LifeAsiaTransactionsAfterDOD || mergedObj?.LifeAsiaTransactionsAfterDOD,
  //   policyStatusOnDateOfDeath: mergedObj?.policyStatusOnDateOfDeath ? parseInt(mergedObj?.policyStatusOnDateOfDeath) : policyDetailsData?.policyStatusOnDateOfDeath,
  //   LAAgeonDOD: policyDetailsData?.LAAgeonDOD || calculateAgeDifference(mergedObj?.NomineeDOB_New_1, mergedObj?.DateofDeath),
  //   LAOccupation: policyDetailsData?.LAOccupation || clientEnquiryData?.occpcode,
  //   LifeAssuredAnnualIncome: policyDetailsData?.LifeAssuredAnnualIncome || POSContactData?.LifeAssuredAnnualIncome,
  //   DurationfromRCDTillDOD: policyDetailsData?.DurationfromRCDTillDOD || mergedObj?.DateofDeath ? calculateDifference(convertDate(details?.policyDetailsObj?.saDetails?.rcd), mergedObj?.DateofDeath) : null,
  //   DurationfromRCDTillDODIntimation: policyDetailsData?.DurationfromRCDTillDODIntimation || mergedObj?.DateofIntimation ? calculateDifference(convertDate(details?.policyDetailsObj?.saDetails?.rcd), mergedObj?.DateofIntimation) : null,
  //   UWDecision1: policyDetailsData?.UWDecision1 || mergedObj?.UWDecision1,
  //   UWComments: policyDetailsData?.UWComments || mergedObj?.UWComments,
  //   LifeAssuredGender: policyDetailsData?.LifeAssuredGender || clientEnquiryData?.cltsex,
  // });

        GetClaimsPrimaryAssessmentEnquiry();
        getGCPPolicydetails();
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
  else if(customerData?.isClaimsPrimaryAssesment && activeTabKey ==="2"){
    // POSContactData?.serviceRequestTransectionData?.forEach(element => {
    //   posChangeinPlanObj[element.tagName] = element.tagValue
    // });
 const mergedObj = {
    ...(POSContactData?.claimsDetails || {}),
    ...(POSContactData?.notification || {})
  };
posChangeinPlanObj = mergedObj
    claimDetailsForm?.setFieldsValue({
     // SourceofIntimation: intimationData?.SourceofIntimation || (posChangeinPlanObj?.SourceofIntimation ? parseInt(posChangeinPlanObj?.SourceofIntimation) : null),
      srvReqID: posChangeinPlanObj?.srvReqRefNo,
      ClaimsID:  claimDetailsData?.ClaimsID || POSContactData?.srvReqRefNo || null,
      ClaimServiceGuarateeApplicable: claimDetailsData?.ClaimServiceGuarateeApplicable || posChangeinPlanObj?.claimsApplicable,
      AgeingFromIntimation:  claimDetailsData?.AgeingFromIntimation || formatDate(posChangeinPlanObj?.claimIntimatedOn) ? calculateDifference(formatDate(posChangeinPlanObj?.claimIntimatedOn),convertDate(new Date())) : null,
      AgeingFromRegisterationDate:  claimDetailsData?.AgeingFromRegisterationDate || formatDate(posChangeinPlanObj?.claimReceivedOn)   ? calculateDifference(formatDate(posChangeinPlanObj?.claimReceivedOn),convertDate(new Date())) : null,
      AgeingFromLastDocumentReceived: claimDetailsData?.AgeingFromLastDocumentReceived || posChangeinPlanObj?.AgeingFromLastDocumentReceived,
      DeceasedPerson: claimDetailsData?.DeceasedPerson || posChangeinPlanObj?.DeceasedPerson,
      ReasonForLateIntimation: claimDetailsData?.ReasonForLateIntimation || posChangeinPlanObj?.ReasonForLateIntimation,
      policyType:  claimDetailsData?.policyType || details?.policyDetailsObj?.planAndStatus?.customerType,
      claimType:  claimDetailsData?.claimType || posChangeinPlanObj?.claimType || null,
      typeofcondition :claimDetailsData?.typeofcondition || posChangeinPlanObj?.typeofcondition || null,
      claimCategory: posChangeinPlanObj?.claimCategory ? posChangeinPlanObj?.claimCategory : claimDetailsData?.claimCategory,
      NatureofDeath: claimDetailsData?.NatureofDeath || (posChangeinPlanObj?.natureofDeathID? parseInt(posChangeinPlanObj?.natureofDeathID) : null),
      exactCauseOfDeath:  claimDetailsData?.exactCauseOfDeath || posChangeinPlanObj?.exactCauseOfDeath || null,
      exactCauseOfIllness:  claimDetailsData?.exactCauseOfIllness || posChangeinPlanObj?.exactCauseOfIllness || null,
    DateofDeath:  claimDetailsData?.DateofDeath || formatDate(posChangeinPlanObj?.dateofDeath) || null,
      DateofEvent: claimDetailsData?.DateofEvent || formatDate(posChangeinPlanObj?.dateofEvent) || null,
      RegistrationEffectiveDate: claimDetailsData?.RegistrationEffectiveDate || formatDate(posChangeinPlanObj?.claimReceivedOn) || null,
      DateofIntimation: claimDetailsData?.DateofIntimation || formatDate(posChangeinPlanObj?.claimIntimatedOn) || null,
  LastRequirementReceivedDate:  claimDetailsData?.LastRequirementReceivedDate ||  dayjs(posChangeinPlanObj?.LastRequirementReceivedDate) || null,
  IIBDataBaseCheckText: dataBseCHeckLU?.find(opt => opt.mstID === (claimDetailsData?.IIBDataBaseCheck ? parseInt(claimDetailsData?.IIBDataBaseCheck) : posChangeinPlanObj?.IIBDataBaseCheck ? parseInt(posChangeinPlanObj?.IIBDataBaseCheck) : null))?.mstDesc || "",
    });

  //   claimDetailsForm.setFieldsValue({
  //   srvReqID: mergedObj?.srvReqRefNo,
  //   ClaimsID: mergedObj?.ClaimsID || POSContactData?.srvReqRefNo || null,
  //   ClaimServiceGuarateeApplicable: mergedObj?.ClaimServiceGuarateeApplicable || mergedObj?.claimsApplicable,
  //   AgeingFromIntimation: mergedObj?.ClaimIntimatedOn ? calculateDifference(mergedObj?.ClaimIntimatedOn, convertDate(new Date())) : null,
  //   AgeingFromRegisterationDate: mergedObj?.ClaimReceivedOn ? calculateDifference(mergedObj?.ClaimReceivedOn, convertDate(new Date())) : null,
  //   AgeingFromLastDocumentReceived: mergedObj?.AgeingFromLastDocumentReceived,
  //   DeceasedPerson: mergedObj?.DeceasedPerson,
  //   ReasonForLateIntimation: mergedObj?.ReasonForLateIntimation,
  //   policyType: mergedObj?.policyType || details?.policyDetailsObj?.planAndStatus?.customerType,
  //   claimType: mergedObj?.claimType || null,
  //   typeofcondition: mergedObj?.typeofcondition || null,
  //   claimCategory: mergedObj?.claimCategory,
  //   NatureofDeath: mergedObj?.NatureofDeath ? parseInt(mergedObj?.NatureofDeath) : null,
  //   exactCauseOfDeath: mergedObj?.exactCauseOfDeath,
  //   exactCauseOfIllness: mergedObj?.exactCauseOfIllness,
  //   DateofDeath: mergedObj?.DateofDeath,
  //   DateofEvent: mergedObj?.DateofEvent,
  //   RegistrationEffectiveDate: mergedObj?.ClaimReceivedOn || null,
  //   DateofIntimation: mergedObj?.ClaimIntimatedOn || null,
  //   LastRequirementReceivedDate: mergedObj?.LastRequirementReceivedDate ? dayjs(mergedObj?.LastRequirementReceivedDate) : null,
  //   IIBDataBaseCheckText: dataBseCHeckLU?.find(opt => opt.mstID === (mergedObj?.IIBDataBaseCheck ? parseInt(mergedObj?.IIBDataBaseCheck) : null))?.mstDesc || "",
  //   NatureofDeathText: mergedObj?.NatureofDeathText || "",
  //   // Add other fields as needed, always use correct casing
  // });


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
else if(customerData?.isClaimsPrimaryAssesment && activeTabKey ==="4"){
  // POSContactData?.serviceRequestTransectionData?.forEach(element => {
  //   posChangeinPlanObj[element.tagName] = element.tagValue
  // });
   const mergedObj = {
    ...(POSContactData?.claimsDetails || {}),
    ...(POSContactData?.notification || {})
  };
  getMandatetagEnquiry();
  // policyCheckForm?.setFieldsValue({
  //  // SourceofIntimation: policyCheckData?.SourceofIntimation || (posChangeinPlanObj?.SourceofIntimation ? parseInt(posChangeinPlanObj?.SourceofIntimation) : null),
  //   srvReqID: posChangeinPlanObj?.srvReqRefNo,
  //   OFAC:  policyCheckData?.OFAC || posChangeinPlanObj?.OFAC || null,
  //   ClaimHotspotCheck:  policyCheckData?.ClaimHotspotCheck ? parseInt(policyCheckData?.ClaimHotspotCheck) : posChangeinPlanObj?.ClaimHotspotCheck ? parseInt(posChangeinPlanObj?.ClaimHotspotCheck) : null,
  // IIBDataBaseCheck:  policyCheckData?.IIBDataBaseCheck ? parseInt(policyCheckData?.IIBDataBaseCheck) : posChangeinPlanObj?.IIBDataBaseCheck ? parseInt(posChangeinPlanObj?.IIBDataBaseCheck) : null,
  // IIBDataBaseCheckText: dataBseCHeckLU?.find(opt => opt.mstID === (policyCheckData?.IIBDataBaseCheck ? parseInt(policyCheckData?.IIBDataBaseCheck) : posChangeinPlanObj?.IIBDataBaseCheck ? parseInt(posChangeinPlanObj?.IIBDataBaseCheck) : null))?.mstDesc || "",
  //   IndustryCheck:  policyCheckData?.IndustryCheck || posChangeinPlanObj?.IndustryCheck || null,
  //   AutoPayStatus:  policyCheckData?.AutoPayStatus || posChangeinPlanObj?.AutoPayStatus || null,
  // });

   policyCheckForm?.setFieldsValue({
    srvReqID: mergedObj?.srvReqRefNo,
    OFAC: policyCheckData?.OFAC || mergedObj?.OFAC || null,
    ClaimHotspotCheck: policyCheckData?.ClaimHotspotCheck ? parseInt(policyCheckData?.ClaimHotspotCheck) : mergedObj?.ClaimHotspotCheck ? parseInt(mergedObj?.ClaimHotspotCheck) : null,
    IIBDataBaseCheck: policyCheckData?.IIBDataBaseCheck ? parseInt(policyCheckData?.IIBDataBaseCheck) : mergedObj?.IIBDataBaseCheck ? parseInt(mergedObj?.IIBDataBaseCheck) : null,
    IIBDataBaseCheckText: dataBseCHeckLU?.find(opt => opt.mstID === (policyCheckData?.IIBDataBaseCheck ? parseInt(policyCheckData?.IIBDataBaseCheck) : mergedObj?.IIBDataBaseCheck ? parseInt(mergedObj?.IIBDataBaseCheck) : null))?.mstDesc || "",
    IndustryCheck: policyCheckData?.IndustryCheck || mergedObj?.IndustryCheck || null,
    AutoPayStatus: policyCheckData?.AutoPayStatus || mergedObj?.AutoPayStatus || null,
    
  });
}
else if(customerData?.isClaimsPrimaryAssesment && activeTabKey ==="5"){
  // POSContactData?.serviceRequestTransectionData?.forEach(element => {
  //   posChangeinPlanObj[element.tagName] = element.tagValue
  // });

   const mergedObj = {
    ...(POSContactData?.claimsDetails || {}),
    ...(POSContactData?.notification || {}),
    ...(POSContactData?.primary|| {})
  };

  reInstatementForm?.resetFields();
  // reInstatementForm?.setFieldsValue({
  //   srvReqID: posChangeinPlanObj?.srvReqRefNo,
  //   DidPolicyLapse: reInstatementData?.DidPolicyLapse|| posChangeinPlanObj.DidPolicyLapse,
  //   Lapsedon: (reInstatementData?.DidPolicyLapse == "no" || posChangeinPlanObj.DidPolicyLapse === 'no')? "" : dayjs(reInstatementData?.Lapsedon)  || dayjs(posChangeinPlanObj?.Lapsedon) ,
  //   WasPolicyReinstated: reInstatementData?.WasPolicyReinstated  ||  posChangeinPlanObj?.WasPolicyReinstated,
  //   ReinstatementDate:  (reInstatementData?.WasPolicyReinstated=="no"  ||  posChangeinPlanObj?.WasPolicyReinstated=="no") ? "" : dayjs(reInstatementData?.ReinstatementDate) || dayjs(posChangeinPlanObj?.ReinstatementDate),
  // ReinstatementDecision:  reInstatementData?.ReinstatementDecision ||
  // reinstatementDecisionLU.filter(x => x.mstID === parseInt( posChangeinPlanObj?.ReinstatementDecision)).map(x => x.mstDesc)[0],
  // ReinstatementDecisionText: reinstatementDecisionLU?.find(opt => opt.mstID === (reInstatementData?.ReinstatementDecision ? parseInt(reInstatementData?.ReinstatementDecision) : posChangeinPlanObj?.ReinstatementDecision ? parseInt(posChangeinPlanObj?.ReinstatementDecision) : null))?.mstDesc || "",

  //   WithDGH:  reInstatementData?.WithDGH ||
  //   withDGHLU.filter(x => x.mstID === parseInt(posChangeinPlanObj?.WithDGH)).map(x => x.mstDesc)[0],
  //   MedicalDisclosures:  reInstatementData?.MedicalDisclosures || posChangeinPlanObj?.MedicalDisclosures,
  // });

    reInstatementForm?.setFieldsValue({
    srvReqID: mergedObj?.srvReqRefNo,
    DidPolicyLapse: mergedObj?.DidPolicyLapse,
    Lapsedon: (mergedObj?.DidPolicyLapse === "no") ? "" : (mergedObj?.Lapsedon ? dayjs(mergedObj?.Lapsedon) : ""),
    WasPolicyReinstated: mergedObj?.WasPolicyReinstated,
    ReinstatementDate: (mergedObj?.WasPolicyReinstated === "no") ? "" : (mergedObj?.ReinstatementDate ? dayjs(mergedObj?.ReinstatementDate) : ""),
    ReinstatementDecision: mergedObj?.ReinstatementDecision,
    ReinstatementDecisionText: reinstatementDecisionLU?.find(opt => opt.mstID === (mergedObj?.ReinstatementDecision ? parseInt(mergedObj?.ReinstatementDecision) : null))?.mstDesc || "",
    WithDGH: mergedObj?.WithDGH,
    MedicalDisclosures: mergedObj?.MedicalDisclosures,
    
  });

  getUWFollowups();
 
  const claimDetails = ClaimsData[selectedSubType]?.Reinstatement_Details_Claim_Details || [];


claimDetails.forEach(element => {
  if (['Lapsedon'].includes(element.name)) {
    element.disabled = (reInstatementData?.DidPolicyLapse == "no" || posChangeinPlanObj.DidPolicyLapse === 'no');
  }

  if (['ReinstatementDate', 'ReinstatementDecision', 'WithDGH'].includes(element.name)) {
    element.disabled = (reInstatementData?.WasPolicyReinstated=="no"  ||  posChangeinPlanObj?.WasPolicyReinstated=="no");
  }
});

setUpdateFields(prev => !prev);


 
}
// else if(customerData?.isClaimsPrimaryAssesment && activeTabKey ==="6"){
//   POSContactData?.serviceRequestTransectionData?.forEach(element => {
//     posChangeinPlanObj[element.tagName] = element.tagValue
//   });
//   //GetAssigneeEnquiry();
//   //LoanEnquiry();
//   assignmentForm?.setFieldsValue({
//     srvReqID: posChangeinPlanObj?.srvReqRefNo,
//     DateofAssignment:  assignmentData?.DateofAssignment || posChangeinPlanObj?.DateofAssignment || null,
//    // AssignmentType:  assignmentData?.AssignmentType || posChangeinPlanObj?.AssignmentType || null,
//     // AssigneeName:  assignmentData?.AssigneeName || posChangeinPlanObj?.AssigneeName || null,
//     AssignorName:  assignmentData?.AssignorName || posChangeinPlanObj?.AssignorName || null,
//    // LoanActive:  assignmentData?.LoanActive || posChangeinPlanObj?.LoanActive || null,
//     //OutstandingLoanAmount:  assignmentData?.OutstandingLoanAmount || posChangeinPlanObj?.OutstandingLoanAmount || null,
//   });
// }

if (customerData?.isClaimsPrimaryAssesment && activeTabKey === "6") {debugger
    getNomineeEnquiry();
    getRelationsData();
    // POSContactData?.serviceRequestTransectionData?.forEach(element => {
    //     posChangeinPlanObj[element.tagName] = element.tagValue
    //   });
    const Claimdetails3  = POSContactData?.claimsDetails;
    
    posChangeinPlanObj = Claimdetails3;
      setIsBeneficiaryChangeRequired(posChangeinPlanObj?.isBeneficiaryChangeRequired ===true);
      nomineeform.setFieldsValue({ isExistingNomineeAlive: posChangeinPlanObj?.isBeneficiaryChangeRequired ==="true" });
      nomineeform.setFieldsValue({ IsLANomineeAddressSame: posChangeinPlanObj?.IsLANomineeAddressSame === 1 ? "Yes" : "No"});
      
      const tagPatternNew = /_(New_\d+)$/;
    const newFields = ["New"];  
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
      }
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
else if(customerData?.isClaimsPrimaryAssesment && activeTabKey ==="7"){
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
else if (customerData?.isClaimsPrimaryAssesment && activeTabKey === "8") {
  // const posChangeinPlanObj = {};
  // POSContactData?.serviceRequestTransectionData?.forEach(element => {
  //   posChangeinPlanObj[element.tagName] = element.tagValue;
  // });

    const mergedObj = {
    ...(POSContactData?.claimsDetails || {}),
    ...(POSContactData?.notification || {}),
    ...(POSContactData?.primary || {})
  };
  const relevantPrefixes = ["withinRetention", "retentionAmount", "reInsurerName", "participation"];
  const tagMap = {};
  if(claimPaymentData?.length>0){
// ✅ Set the form fields
  reInsureForm.setFieldsValue({
    reInsureDetails: claimPaymentData
  });

  setReInsureDetails(claimPaymentData);
  }
  else{
  POSContactData?.serviceRequestTransectionData
  ?.filter(item => relevantPrefixes.some(prefix => item.tagName.startsWith(prefix)))
  .forEach(item => {
      const match = item.tagName.match(/(withinRetention|retentionAmount|reInsurerName|participation)_(\d+)/);
      if (match) {
        const fieldName = match[1];
        const index = parseInt(match[2], 10) - 1;

        if (!tagMap[index]) {
          tagMap[index] = {
            id: index, // required to help rendering
            withinRetention: "",
            retentionAmount: "",
            reInsurerName: "",
            participation: "",
            isDisable: false, // default flag to control edit mode
          };
        }

        if (fieldName === "withinRetention") {
          tagMap[index][fieldName] = item.tagValue === "1" ? "Yes" : item.tagValue === "2" ? "No" : item.tagValue;
        } else {
          tagMap[index][fieldName] = item.tagValue;
        }
      }
    });

  const parsedDetails = Object.values(tagMap);

  // ✅ Set the form fields
  reInsureForm.setFieldsValue({
    reInsureDetails: parsedDetails
  });

  // ✅ Set the state that drives your .map rendering
  setReInsureDetails(parsedDetails?.length>0 ? parsedDetails : reInsureDetails);
  }

//   setClaimPayout({
 //  riderSumAssured: claimPayout?.riderSumAssured || posChangeinPlanObj?.riderSumAssured || "",
//   premiumsToBeWaved:  claimPayout?.premiumsToBeWaved ||posChangeinPlanObj?.premiumsToBeWaved || "",
//   premiumSuspense:  claimPayout?.premiumSuspense ||posChangeinPlanObj?.premiumSuspense || "",
//   interestCharges:  claimPayout?.interestCharges ||posChangeinPlanObj?.interestCharges || "",
//   penalInterestCharges:  claimPayout?.penalInterestCharges ||posChangeinPlanObj?.penalInterestCharges || "",
//   premiumRecovery:  claimPayout?.premiumRecovery ||posChangeinPlanObj?.premiumRecovery || "",
//   survivalBenefit:  claimPayout?.survivalBenefit || posChangeinPlanObj?.survivalBenefit || ""
// });

 setClaimPayout({
  riderSumAssured: mergedObj?.riderSumAssured || claimPayout?.riderSumAssured || "",
  premiumsToBeWaved: mergedObj?.premiumsToBeWaved || claimPayout?.premiumsToBeWaved || "",
  premiumSuspense: mergedObj?.premiumSuspense || claimPayout?.premiumSuspense || "",
  interestCharges: mergedObj?.interestCharges || claimPayout?.interestCharges || "",
  penalInterestCharges: mergedObj?.penalInterestCharges || claimPayout?.penalInterestCharges || "",
  premiumRecovery: mergedObj?.premiumRecovery || claimPayout?.premiumRecovery || "",
  survivalBenefit: mergedObj?.survivalBenefit || claimPayout?.survivalBenefit || "",
  survivalBenefit_Add: mergedObj?.survivalBenefit_Add || claimPayout?.survivalBenefit_Add || ""
});

  // ✅ Set Death Sum Assured and Total Payable
  const deathAssuredNumber = mergedObj.deathSumAssuredAmount;
  setDeathSumAssured(deathAssuredNumber);

  reInsureForm.setFieldsValue({
    TotalClaimPayable: deathAssuredNumber
  });
}

else if(customerData?.isClaimsPrimaryAssesment && activeTabKey ==="3"){debugger
  const mergedObj = {
    ...(POSContactData?.claimsDetails || {}),
    ...(POSContactData?.notification || {}),
    ...(POSContactData?.Primary || {})
  };
  // form.setFieldsValue({
  //   srvReqID: posChangeinPlanObj?.srvReqRefNo,
  //   ClaimIntimatedBy:  intimationData?.ClaimIntimatedBy || posChangeinPlanObj?.ClaimIntimatedBy || null,
  //   ClaimIntimatedOn:  intimationData?.ClaimIntimatedOn || posChangeinPlanObj?.ClaimIntimatedOn || null,
  //   ClaimRegisteredBy:  intimationData?.TicketLoggedBy || posChangeinPlanObj?.TicketLoggedBy || null,
  //   ClaimRegisteredOn:  intimationData?.ClaimRegisteredOn || posChangeinPlanObj?.ClaimReceivedOn || null,
  //   AssesmentDoneBy:  intimationData?.AssesmentDoneBy || loginInfo?.userProfileInfo?.profileObj?.name || null,
  //   AssesmentDoneOn:  intimationData?.AssesmentDoneOn || dayjs(posChangeinPlanObj?.AssesmentDoneOn) || null,
  //   SelectSubStage:  intimationData?.SelectSubStage || posChangeinPlanObj?.SelectSubStage ? parseInt(posChangeinPlanObj?.SelectSubStage) : null,
  // });

    form.setFieldsValue({
    srvReqID: mergedObj?.srvReqRefNo,
    ClaimIntimatedBy: intimationData?.ClaimIntimatedBy || mergedObj?.claimIntimatedBy || null,
    ClaimIntimatedOn: intimationData?.ClaimIntimatedOn || formatDate(mergedObj?.claimIntimatedOn) || null,
    ClaimRegisteredBy: intimationData?.TicketLoggedBy || mergedObj?.ticketLoggedBy || null,
    ClaimRegisteredOn: intimationData?.ClaimRegisteredOn || formatDate(mergedObj?.claimReceivedOn) || null,
    AssesmentDoneBy: intimationData?.AssesmentDoneBy || loginInfo?.userProfileInfo?.profileObj?.name || null,
    AssesmentDoneOn: intimationData?.AssesmentDoneOn || (mergedObj?.AssesmentDoneOn ? dayjs(mergedObj?.AssesmentDoneOn) : null),
    SelectSubStage: intimationData?.SelectSubStage || (mergedObj?.SelectSubStage ? parseInt(mergedObj?.SelectSubStage) : null),
    // Add other fields as needed, always use correct casing
  });
}
else if(customerData?.isClaimsPrimaryAssesment && activeTabKey ==="9"){
  // POSContactData?.serviceRequestTransectionData?.forEach(element => {
  //   posChangeinPlanObj[element.tagName] = element.tagValue
  // });
   const mergedObj = {
    ...(POSContactData?.claimsDetails || {}),
    ...(POSContactData?.notification || {})
  };
  setShowRaiseRequirementBtn(false);
  form.setFieldsValue({
    srvReqID: mergedObj?.srvReqRefNo,
    // ClaimIntimatedBy:  intimationData?.ClaimIntimatedBy || posChangeinPlanObj?.ClaimIntimatedBy || null,
    // ClaimIntimatedOn:  intimationData?.ClaimIntimatedOn || posChangeinPlanObj?.ClaimIntimatedOn || null,
    // ClaimRegisteredBy:  intimationData?.ClaimRegisteredBy || posChangeinPlanObj?.ClaimRegisteredBy || null,
    // ClaimRegisteredOn:  intimationData?.ClaimRegisteredOn || posChangeinPlanObj?.ClaimRegisteredOn || null,
    // AssesmentDoneBy:  intimationData?.AssesmentDoneBy || posChangeinPlanObj?.AssesmentDoneBy || null,
    // AssesmentDoneOn:  intimationData?.AssesmentDoneOn || posChangeinPlanObj?.AssesmentDoneOn || null,
    // SelectSubStage:  intimationData?.SelectSubStage || posChangeinPlanObj?.SelectSubStage || null,
  });
}

if (customerData?.isClaimsPrimaryAssesment && activeTabKey === "10") {
  /*
  // Old tab 10 block commented out
  const requirementMap = {};
  POSContactData?.serviceRequestTransectionData?.forEach((tag) => {
    const tagName = tag?.tagName;
    if (!tagName || !tagName.startsWith("Requirement_")) return;
    const match = tagName.match(/^Requirement_(\d+)_(Text|Received|Status)$/i);
    if (match) {
      const index = parseInt(match[1], 10) - 1;
      const field = match[2].toLowerCase();
      if (!requirementMap[index]) requirementMap[index] = {};
      if (field === "received") {
        requirementMap[index]["received"] = tag.tagValue?.toLowerCase() === "yes";
      } else if (field === "text") {
        requirementMap[index]["requirement"] = tag.tagValue || "";
      } else {
        requirementMap[index][field] = tag.tagValue || "";
      }
    }
  });
  const formatted = Object.values(requirementMap);
  setRequirementValues(formatted);
  */

  // New code: use requirements from merged claimsDetails and notification tables
  const mergedObj = {
    ...(POSContactData?.claimsDetails || {}),
    ...(POSContactData?.notification || {})
  };

  if (mergedObj?.requirements && Array.isArray(mergedObj.requirements)) {
    const formatted = mergedObj.requirements.map((desc) => ({
      requirement: desc,
      received: false,
      notReceived: false,
      status: "",
    }));
    setRequirementValues(formatted);
  }
}


// TAB 11: Old logic commented out
/*
if (customerData?.isClaimsPrimaryAssesment && activeTabKey === "11") {
  const posChangeinPlanObj = {};
  POSContactData?.serviceRequestTransectionData?.forEach(element => {
    posChangeinPlanObj[element.tagName] = element.tagValue;
  });

  // Build investigatorDetails array
  const investigatorDetails = [];
  let index = 1;

  while (posChangeinPlanObj[`PrimaryInvestigatorName_${index}`]) {
    const investigatorID = parseInt(posChangeinPlanObj[`PrimaryInvestigatorName_${index}`]);

    investigatorDetails.push({
      investigatorName: investigatorID || null, // Keep ID for Select
      investigationStartDate: posChangeinPlanObj[`PrimaryInvestigatorStartDate_${index}`]
        ? dayjs(posChangeinPlanObj[`PrimaryInvestigatorStartDate_${index}`])
        : null,
      investigationEndDate: posChangeinPlanObj[`PrimaryInvestigatorEndDate_${index}`]
        ? dayjs(posChangeinPlanObj[`PrimaryInvestigatorEndDate_${index}`])
        : null,
    });

    index++;
  }

  // Parse boolean radio buttons like "yes"/"no"
  const normalizeYesNo = (val) =>
    val?.toLowerCase() === "yes"
      ? "yes"
      : val?.toLowerCase() === "no"
      ? "no"
      : null;

  // Now set values into form
  // Set both value and text for PrimaryRefarCaseTo
  let primaryRefarCaseToId = parseInt(posChangeinPlanObj?.PrimaryRefarCaseTo) || null;
  let primaryRefarCaseToText = "";
  if (primaryRefarCaseToId && referCaseToLU) {
    const selectedOption = referCaseToLU.find(opt => opt.mstID === primaryRefarCaseToId);
    primaryRefarCaseToText = selectedOption ? selectedOption.mstDesc : "";
  }
  form.setFieldsValue({
    investDetails: investigatorDetails,
    srvReqID: posChangeinPlanObj?.srvReqRefNo || null,
    InitiateInvestigation: normalizeYesNo(posChangeinPlanObj?.PrimaryInitiateInvestigation),
    SelectInvestigator: parseInt(posChangeinPlanObj?.SelectInvestigator) || null,
    InitiateReInvestigation: normalizeYesNo(posChangeinPlanObj?.InitiateReInvestigation),
    SelectReInvestigator: parseInt(posChangeinPlanObj?.SelectReInvestigator) || null,
    ReferCaseTo: primaryRefarCaseToId,
    PrimaryRefarCaseToText: primaryRefarCaseToText,
    ReferrelComments: posChangeinPlanObj?.ReferrelComments || null,
    referralViewComments: posChangeinPlanObj?.ReferrelComments || null, // If needed
  });
}
*/

// TAB 11: New logic using mergedObj (claimsDetails + notification)
if (customerData?.isClaimsPrimaryAssesment && activeTabKey === "11") {
  // Merge claimsDetails and notification
     const mergedObj = {
    ...(POSContactData?.claimsDetails || {}),
    ...(POSContactData?.notification || {}),
   
      
  };

  // Build investigatorDetails array from mergedObj
  const investigatorDetails = [];
  let index = 1;
  while (mergedObj[`PrimaryInvestigatorName_${index}`]) {
    const investigatorID = parseInt(mergedObj[`PrimaryInvestigatorName_${index}`]);
    investigatorDetails.push({
      investigatorName: investigatorID || null,
      investigationStartDate: mergedObj[`PrimaryInvestigatorStartDate_${index}`]
        ? dayjs(mergedObj[`PrimaryInvestigatorStartDate_${index}`])
        : null,
      investigationEndDate: mergedObj[`PrimaryInvestigatorEndDate_${index}`]
        ? dayjs(mergedObj[`PrimaryInvestigatorEndDate_${index}`])
        : null,
    });
    index++;
  }

  // Parse boolean radio buttons like "yes"/"no"
  const normalizeYesNo = (val) =>
    val?.toLowerCase() === "yes"
      ? "yes"
      : val?.toLowerCase() === "no"
      ? "no"
      : null;

  // Set both value and text for PrimaryRefarCaseTo
  let primaryRefarCaseToId = parseInt(mergedObj?.PrimaryRefarCaseTo) || null;
  let primaryRefarCaseToText = "";
  if (primaryRefarCaseToId && referCaseToLU) {
    const selectedOption = referCaseToLU.find(opt => opt.mstID === primaryRefarCaseToId);
    primaryRefarCaseToText = selectedOption ? selectedOption.mstDesc : "";
  }
  form.setFieldsValue({
    investDetails: investigatorDetails,
    srvReqID: mergedObj?.srvReqRefNo || null,
    InitiateInvestigation: normalizeYesNo(mergedObj?.PrimaryInitiateInvestigation),
    SelectInvestigator: parseInt(mergedObj?.SelectInvestigator) || null,
    InitiateReInvestigation: normalizeYesNo(mergedObj?.InitiateReInvestigation),
    SelectReInvestigator: parseInt(mergedObj?.SelectReInvestigator) || null,
    ReferCaseTo: primaryRefarCaseToId,
    PrimaryRefarCaseToText: primaryRefarCaseToText,
    ReferrelComments: mergedObj?.ReferrelComments || null,
    referralViewComments: mergedObj?.ReferrelComments || null,
  });
}

// TAB 12: Old logic commented out
/*
if (customerData?.isClaimsPrimaryAssesment && activeTabKey === "12") {
  POSContactData?.serviceRequestTransectionData?.forEach(element => {
    posChangeinPlanObj[element.tagName] = element.tagValue;
  });

  const assessorDecisionId = parseInt(posChangeinPlanObj?.PrimaryAssesorsDecision);
  const decisionDescId = parseInt(posChangeinPlanObj?.PrimaryDecisionDescription);

  const assessorDecisionObj = assessorsDecisionLU?.find(item => item.mstID === assessorDecisionId);
  const decisionDescObj = decisionPrimaryDescriptionLU?.find(item => item.mstID === decisionDescId);

  assessorsForm.setFieldsValue({
    srvReqID: posChangeinPlanObj?.srvReqRefNo,
    PrimaryAssesorsDecision: assessorDecisionObj?.mstDesc || null,
    PrimaryDecisionDescription: decisionDescObj?.mstDesc || null,
    PrimaryAssessorRecommendation: asessorsRecomandationData?.ReferrelComments || posChangeinPlanObj?.ReferrelComments || null,
  });
}
*/

// TAB 12: New logic using mergedObj (claimsDetails + notification)
if (customerData?.isClaimsPrimaryAssesment && activeTabKey === "12") {
  // Merge claimsDetails and notification
      const mergedObj = {
    ...(POSContactData?.claimsDetails || {}),
    ...(POSContactData?.notification || {}),
  
      
  };
  const assessorDecisionId = parseInt(mergedObj?.PrimaryAssesorsDecision);
  const decisionDescId = parseInt(mergedObj?.PrimaryDecisionDescription);

  const assessorDecisionObj = assessorsDecisionLU?.find(item => item.mstID === assessorDecisionId);
  const decisionDescObj = decisionPrimaryDescriptionLU?.find(item => item.mstID === decisionDescId);

  assessorsForm.setFieldsValue({
    srvReqID: mergedObj?.srvReqRefNo,
    PrimaryAssesorsDecision: assessorDecisionObj?.mstDesc || null,
    PrimaryDecisionDescription: decisionDescObj?.mstDesc || null,
    PrimaryAssessorRecommendation: asessorsRecomandationData?.ReferrelComments || mergedObj?.ReferrelComments || null,
  });
}
if (customerData?.isClaimsPrimaryAssesment && activeTabKey === "2"){
    const Defaultvalue=form.getFieldsValue()?.claimType|| claimDetailsData?.claimType || posChangeinPlanObj?.claimType||""
if(Defaultvalue !==""){
  const defaultObj = {name: 'claimType'};
  handleDropdownChange(Defaultvalue,defaultObj);
}
}

},[activeTabKey])

const calculateAgeDifference = (dob, dod) => {
  if (typeof dob !== 'string' || typeof dod !== 'string') return null; // or return 0, or handle as needed
  // Convert date strings to Date objects (assuming format is DD/MM/YYYY)
  const [dobDay, dobMonth, dobYear] = dob.split("/").map(Number);
  const [dodDay, dodMonth, dodYear] = dod.split("/").map(Number);
  const dobDate = new Date(dobYear, dobMonth - 1, dobDay);
  const dodDate = new Date(dodYear, dodMonth - 1, dodDay);
  // Calculate age difference
  let age = dodYear - dobYear;
  // Check if the death date is before the birthday in the year of death
  if (dodMonth < dobMonth || (dodMonth === dobMonth && dodDay < dobDay)) {
      age--; // Subtract one year if the birthday hasn't occurred yet
  }
  return age;
};

const calculateAgeOnDeath = (dob, dod) => {
  if (!dob || !dod) return null;

  // ---- Parse DOB (YYYYMMDD) ----
  const dobYear = Number(dob.substring(0, 4));
  const dobMonth = Number(dob.substring(4, 6));
  const dobDay = Number(dob.substring(6, 8));

  const dobDate = new Date(dobYear, dobMonth - 1, dobDay);

  // ---- Parse DOD (ISO string) ----
  const dodDate = new Date(dod);

  let age = dodDate.getFullYear() - dobDate.getFullYear();

  // Check if birthday occurred before death date
  const hasHadBirthday =
    dodDate.getMonth() > dobDate.getMonth() ||
    (dodDate.getMonth() === dobDate.getMonth() &&
      dodDate.getDate() >= dobDate.getDate());

  if (!hasHadBirthday) {
    age--;
  }

  return age;
};


const createInvestData = (name, value) => {
  if (["investigatorName", "investigationStartDate", "investigationEndDate"].includes(name)) {
    setInvestObj((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    const response = await apiCalls.getRelationsData();
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
      claimDetailsForm.setFieldsValue({
        AgeingFromLastDocumentReceived: `${diffInDays} days`
      });
    }
};

    const handleSubmit = (values) => {debugger;
    // if(selectedSubType==="claimsrequest" && ["3"].includes(activeTabKey)){
    //     return handleClaimDetailsTabSave();
    //   }

        if(activeTabKey === "8"){debugger;
          // Recalculate Total Claim Payable
          const deathSumAssuredAmount = parseFloat(deathSumAssured) || 0;
          const adjustAmount = totalPayoutAmount-deathSumAssuredAmount;
          const data=
          {
            PolicyNumber: details?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo,
            LONGDESC: "",
            OTHERADJST: Number(adjustAmount).toFixed(2),
            REASONCD: "",
          }
          const employeeID = loginInfo?.userProfileInfo?.profileObj?.allRoles?.[0]?.employeeID;
        //  let res= apiCalls.GetAdjustDeathClaim(data, employeeID);
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
//       const reinsurerNamesCSV = reInsureDetails && reInsureDetails.length > 0
//   ? reInsureDetails.map(r => r.reInsurerName).filter(Boolean).join(',')
//   : '';
// obj.reinsurerNames = reinsurerNamesCSV;

const reinsurerDetailsCSV = reInsureDetails && reInsureDetails.length > 0
  ? reInsureDetails
      .filter(r => r.reInsurerName && r.participation)
      .map(r => `${r.reInsurerName}:${r.participation}`)
      .join(',')
  : '';
obj.reinsurerDetails = reinsurerDetailsCSV;

// obj.requirements = JSON.stringify(requirementValues);

// obj.TransactionData.push({
//   Status: "Create",
//   TagName: "Requirements",
//   TagValue: JSON.stringify(obj.requirements)
// });

const requirementsCSV = requirementValues && requirementValues.length > 0
  ? requirementValues
      .filter(r => r.requirement )
      .map(r => `${r.requirement}}`)
      .join(',')
  : '';
obj.requirementValues = requirementsCSV;



obj.investigators = JSON.stringify(investData);
if (Array.isArray(investData) && investData.length > 0) {
  obj.TransactionData.push({
    Status: "Create",
    TagName: "Investigators",
    TagValue: JSON.stringify(investData)
  });
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
    console.log(obj)

    try {
    let val =  apiCalls.genericAPI(obj);
      val
      .then((val) => {
        //if (val?.data) {
            setIsLoading(false);
            if(selectedSubType==="claimsrequest" && ["1", "2","3","4","5","6","7","8","9","10","11","12","13"].includes(activeTabKey)){
                if(activeTabKey==="1") {
                  setPolicyDetailsData(values);
                }
                else if(activeTabKey==="2"){
                  setClaimDetailsData(values);
                }
                else if(activeTabKey==="3"){
                  setIntimationData(values);
                }
                else if(activeTabKey==="4"){
                  setPolicyCheckData(values);
                }
                else if(activeTabKey==="5"){
                  setReInstatementData(values);
                }
                else if(activeTabKey==="6"){
                  setAssignmentData(values);
                }
                else if(activeTabKey==="8"){
                  setClaimPaymentData(values ? values?.reInsureDetails : []);
                }
                else if(activeTabKey==="9"){
                  setShowRaiseRequirementBtn(true);
                  setIntimationData(values);
                }
                // else if(activeTabKey==="12"){
                //   setReferrelSheetData(values);
                //   // handlePastComments(values);
                // }
                else if(activeTabKey==="12"){
                //   setAsessorsRecomandationData(values);
                // setAlertTitle(val?.data?.header);
                // setAlertData("Claim Assessed and moved to Claims Checker!");
                // setShowAlert(true);
                // return;
                const user = loginInfo?.userProfileInfo?.profileObj;
                setAlertTitle("");
                setAlertData("Claim Assessed and moved to Claims Checker!");
                setShowAlert(true);
                setActiveTabKey("1");
                // user.role = 33;
                // user.roleName = "Claims Assessment Checker";
                // user.boe = true;
                // user.sourceId = 33;
                // dispatch(profileObj(user))
                setNavigateTo("/claimsprimaryuser")
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
                return handleClaimDetailsTabSave();
              }
              else {
                setAlertTitle(val?.data?.header);
                setAlertData(val?.data?.message);
                setShowAlert(true);
              }
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

  

const isNonZeroNumber = (v) => {
  const n = Number(v);
  return Number.isFinite(n) && n !== 0;
};


  // Handler for JE Creation button
    // Handler for JE Creation button
    const handleCreateJE = async () => {
      setIsCreateJEDisabled(true);
      try {
        // Build payload in required format
        const payload = {
          jvCreationRequests: [
          
 ...(Number(claimPayout?.interestCharges) > 0
    ? [{

                  SrvReqID: POSContactData?.srvReqID,
                  PayoutName: "ClaimsRegistration",
                  JEType: "Interest",
                  Amount: claimPayout?.interestCharges || null,
                  CreatedBy: loginInfo?.userProfileInfo?.profileObj.allRoles?.[0]?.employeeID || ""
                }]
              : []),
   ...(Number(claimPayout?.penalInterestCharges) > 0
    ? [{
            
              SrvReqID: POSContactData?.srvReqID,
              PayoutName: "ClaimsRegistration",
              JEType: "Penal Interest",
              Amount: claimPayout?.penalInterestCharges || null,
              CreatedBy: loginInfo?.userProfileInfo?.profileObj.allRoles?.[0]?.employeeID || ""
               }]
              : []),
          ...(isNonZeroNumber(claimPayout?.survivalBenefit)
    ? [{
              SrvReqID: POSContactData?.srvReqID,
              PayoutName: "ClaimsRegistration",
              JEType: "Survival Benefit N",
              Amount: claimPayout?.survivalBenefit || null,
              CreatedBy: loginInfo?.userProfileInfo?.profileObj.allRoles?.[0]?.employeeID || ""
              }]
              : []),
          

           ...(isNonZeroNumber(claimPayout?.survivalBenefit_Add) 
    ? [{
              SrvReqID: POSContactData?.srvReqID,
              PayoutName: "ClaimsRegistration",
              JEType: "Survival Benefit P",
              Amount: claimPayout?.survivalBenefit_Add || null,
              CreatedBy: loginInfo?.userProfileInfo?.profileObj.allRoles?.[0]?.employeeID || ""
              }]
              : [])
          ],
          isAutoJEApprove: false,
          PayoutName: "ClaimsRegistration",
          policyNo: policyDetailsData?.PolicyNo || details?.policyDetailsObj?.identifiers?.policyNo || null,
          clientId: policyDetailsData?.LAClientID || details?.policyDetailsObj?.identifiers?.la_ClientID || null,
  
          productCode: policyDetailsData?.productCode || details?.policyDetailsObj?.planAndStatus.planCode || null,
        };
        const response = await apiCalls.JVCreation(payload);
        if (response?.status === 200) {
          message.success("JE created successfully.");
        } else {
          message.error(response?.message || "Failed to create JE.");
        }
      } catch (error) {
        message.error("Error creating JE.");
      }
      finally{
        setIsCreateJEDisabled(false);
      }
    };


  const handleRadioChange =(e,item)=>{
    if(item.name === 'InitiateInvestigation' && e.target.value === 'yes'){
      addInvestigator();
     setIsDisable(false)
    }else{
      setIsDisable(true) 
    }
    if(item.name === 'DidPolicyLapse' && e.target.value === 'yes'){
      ClaimsData[selectedSubType]?.Reinstatement_Details_Claim_Details?.forEach(element => {
        if(['Lapsedon'].includes(element?.name)){
          element.hide = false;
          reInstatementForm?.setFieldsValue({
              Lapsedon: dayjs(reInstatementData?.Lapsedon)  || dayjs(posChangeinPlanObj?.Lapsedon)
          })
        }
      })
      setUpdateFields(!updateFields);
    }
    else if(item.name === 'DidPolicyLapse' && e.target.value === 'no'){
      ClaimsData[selectedSubType]?.Reinstatement_Details_Claim_Details?.forEach(element => {
        if(['Lapsedon'].includes(element?.name)){
          element.hide = true
           element.value = "";
            element.disabled = true;
           reInstatementForm?.setFieldsValue({
            Lapsedon: ""
           })
        }
      });
      setUpdateFields(!updateFields);
    }
      if (item.name === 'DidPolicyLapse') {
      const updatedData = { ...claimsData }; 
      const details = updatedData[selectedSubType]?.Reinstatement_Details_Claim_Details?.map(element => {
        if (element?.name === 'Lapsedon') {
          return {
            ...element,
            disabled: e.target.value === 'no' // set disabled based on value
          };
        }
        return element;
      });
      if (updatedData[selectedSubType]) {
        updatedData[selectedSubType].Reinstatement_Details_Claim_Details = details;
      }
      setClaimsData(updatedData); 
    }
    else if(item.name === 'WasPolicyReinstated' && e.target.value === 'yes'){
      ClaimsData[selectedSubType]?.Reinstatement_Details_Claim_Details?.forEach(element => {
        if(['ReinstatementDate','ReinstatementDecision','WithDGH'].includes(element?.name)){
          element.hide = false;
            reInstatementForm?.setFieldsValue({
            ReinstatementDate:  dayjs(reInstatementData?.ReinstatementDate) || dayjs(posChangeinPlanObj?.ReinstatementDate),
           })
          }
      })
      setUpdateFields(!updateFields);
      
    }else if(item.name === 'WasPolicyReinstated' && e.target.value === 'no'){
      ClaimsData[selectedSubType]?.Reinstatement_Details_Claim_Details?.forEach(element => {
        if(['ReinstatementDate','ReinstatementDecision','WithDGH'].includes(element?.name)){
          element.hide = true
           element.value = "";
           element.disabled = true;
           reInstatementForm?.setFieldsValue({
            ReinstatementDate: ""
           })
        }
      });
      setUpdateFields(!updateFields);
    }
      if (item.name === 'WasPolicyReinstated') {
      const updatedData = { ...claimsData1 }; 
      const details = updatedData[selectedSubType]?.Reinstatement_Details_Claim_Details?.map(element => {
        if (element?.name === 'ReinstatementDate'||element?.name === 'ReinstatementDecision'||element?.name === 'WithDGH') {
          return {
            ...element,
            disabled: e.target.value === 'no' // set disabled based on value
          };
        }
        return element;
      });
      if (updatedData[selectedSubType]) {
        updatedData[selectedSubType].Reinstatement_Details_Claim_Details = details;
      }
      setClaimsData1(updatedData); 
    }
    else if(item.name === 'InitiateInvestigation' && e.target.value === 'yes'){
     setHideInvestDetails(true);
      setUpdateFields(!updateFields);
    }else if(item.name === 'InitiateInvestigation' && e.target.value === 'no'){
      setHideInvestDetails(false);
      setUpdateFields(!updateFields);
    }
    else if(item.name === 'InitiateReInvestigation' && e.target.value === 'yes'){
      ClaimsData[selectedSubType]?.PolicyChecks_Referrel_Details?.forEach(element => {
        if(['SelectReInvestigator'].includes(element?.name)){
          element.disabled = false
        }
      })
      setUpdateFields(!updateFields);
    }else if(item.name === 'InitiateReInvestigation' && e.target.value === 'no'){
      ClaimsData[selectedSubType]?.PolicyChecks_Referrel_Details?.forEach(element => {
        if(['SelectReInvestigator','InitiateInvestigation',].includes(element?.name)){
          element.disabled = true
        }
      });
      setUpdateFields(!updateFields);
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
  const handleDropdownChange = (e, item) => {
    if(item.name === "PrimaryRefarCaseTo" || item.name === "ReferCaseTo") {
      // Find the text for the selected id
      const selectedOption = referCaseToLU?.find(opt => opt.mstID === e);
      const text = selectedOption ? selectedOption.mstDesc : "";
      form.setFieldsValue({
        PrimaryRefarCaseTo: e,
        PrimaryRefarCaseToText: text,
        ReferCaseTo: e // Ensure ReferCaseTo is also updated for payload
      });
    }
    if (item.name === "claimType") {
      setClaimTypee((prevClaimTypee) => e);
    }
    else if(item.name === "ClaimIntimatedBy")
    {
      setClaimIntimatedBy((prevClaimTypee) => e);
    }
    else if(item.name === "AssesorsRecommendation")
      {
        const dummy1 = decisionPrimaryDescriptionLU?.filter(
          (x) => Number(x.mstParentID) === Number(e)
        );
        setDecisionDescription(dummy1);
      }
    else if(item.name === "ReinstatementDecision") {
      // Find the text for the selected id
      const selectedOption = reinstatementDecisionLU?.find(opt => opt.mstID === e);
      const text = selectedOption ? selectedOption.mstDesc : "";
      form.setFieldsValue({
        ReinstatementDecision: e,
        ReinstatementDecisionText: text
      });
      reInstatementForm?.setFieldsValue({
        ReinstatementDecision: e,
        ReinstatementDecisionText: text
      });
    }
    else if(item.name === "IIBDataBaseCheck") {
      // Find the text for the selected id
      const selectedOption = dataBseCHeckLU?.find(opt => opt.mstID === e);
      const text = selectedOption ? selectedOption.mstDesc : "";
      form.setFieldsValue({
        IIBDataBaseCheck: e,
        IIBDataBaseCheckText: text
      });
    }
    else if(item.name?.toLowerCase() === "natureofdeath"){
        setIsAccidentSelection(e);
      }
  };
  const columns = [
    {
      title: "SR NO",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Comments",
      dataIndex: "comment",
      key: "comment",
    },
  ];


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

  const visibilityRules = {
    NameofiIntimatingPerson: (context) => context.claimIntimatedBy !== "nominee",
    NameChangeAffidavit: (context) => context.isPennyDropStatus,
    NomineeDeathCertificate: (context) => context.isBeneficiaryChangeRequired,
    CopyofFirstInformationReport: (context) => context.isAccidentSelection === 3,
    CopyofPostMortemReport: (context) => context.isAccidentSelection === 3,
    NatureofDeath: (context) => context.ClaimTypee !== "CI"&& context.ClaimTypee  !== "TPD" && context.ClaimTypee  !== "Health",
    DateofDeath: (context) => context.ClaimTypee !== "CI"&& context.ClaimTypee  !== "TPD" && context.ClaimTypee  !== "Health",
    CauseofEvent: (context) => context.ClaimTypee === "CI" || context.ClaimTypee  === "TPD",
    DateofEvent: (context) => context.ClaimTypee === "CI" || context.ClaimTypee  === "TPD"|| context.ClaimTypee  === "Health",
    claimsApplicable: (context) => details?.policyDetailsObj?.planAndStatus?.productType === "TD" || details?.policyDetailsObj?.planAndStatus?.planCode === "T07",
    typeofcondition:(context) => context.ClaimTypee === "Health" ,
   exactCauseOfIllness:(context) => context.ClaimTypee === "Health" ,
    exactCauseOfDeath:(context) => context.ClaimTypee !== "Health" 
    
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
          return {
              ...field,
              hide: rule ? !rule(context) : false,
              customStyle: ["AssessorsRecommendation_Referrel_Details_AssesorsRecommendation", 
                            "AssessorsRecommendation_Referrel_Details_DecisionDescription"]
                            .includes(formType) ? { width: "100%", minWidth: "300px" } : {} // ✅ Apply only for these fields
          };
      })}
            subType={selectedSubType}
            suffix={!isShowPOSScreen && suffix}
            form ={selectedSubType === "claimsrequest" ? formMapping[activeTabKey] || form : form}
            getUploadFiles={getUploadFiles}
            handleTextLink={handleTextLink}
            clientRoleLU={clientRoleLU}
            onBlurInput={onBlurInput}
            handleDropdownChange={handleDropdownChange}
            handleSubDropdownChange={handleSubDropdownChange}
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
            subDescriptionLU={subDescriptionLU}
            uwDecisionNewLU = {uwDecisionNewLU}
        ></DetailsForm>
    );
};

const getClientData = async () => {
  setIsLoading(true);
  let clientNo= props?.customerData?.poClientID || props.propsData?.details?.policyDetailsObj?.identifiers?.la_ClientID;
try {
  let obj ={
    clientNumber: clientNo
  }
  
    const response = await apiCalls.getClientEnquiry(obj,loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID);
    if (response?.data) {
      const res = response?.data?.responseBody;
  return res;
}
}
catch{
  setIsLoading(false);
}
};


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
  else if(["View Life Asia Transactions"].includes(item?.label)){
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
          setViewTransLoader(false);
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
            console.log("latest ", beneficiaryDetailsData)
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

  const getTransactionData = (values) => {  
    if (selectedSubType === "claimsrequest" && activeTabKey === "1") {
      let formData=form.getFieldsValue()
      let newArray = [
        { Status: "Create", TagName: "policyType", TagValue: values?.policyType || formData?.policyType},
        { Status: "Create", TagName: "ApplicationDate", TagValue: values?.ApplicationDate || formData?.ApplicationDate},
        { Status: "Create", TagName: "Totalpremiumpaidtilldate", TagValue: values?.Totalpremiumpaidtilldate ||formData?.Totalpremiumpaidtilldate},
        { Status: "Create", TagName: "LifeAsiaTransactionsAfterDOD", TagValue: values?.LifeAsiaTransactionsAfterDOD || ""},
        { Status: "Create", TagName: "policyStatusOnDateOfDeath", TagValue: values?.policyStatusOnDateOfDeath ||formData?.policyStatusOnDateOfDeath},
        { Status: "Create", TagName: "LAAgeonDOD", TagValue: formData?.LAAgeonDOD},
        { Status: "Create", TagName: "LifeAssuredGender", TagValue: values?.LifeAssuredGender ||formData?.LifeAssuredGender},
        { Status: "Create", TagName: "LAOccupation", TagValue: values?.LAOccupation  || formData?.LAOccupation},
        { Status: "Create", TagName: "LifeAssuredAnnualIncome", TagValue: values?.LifeAssuredAnnualIncome || formData?.LifeAssuredAnnualIncome},
        { Status: "Create", TagName: "DurationfromRCDTillDOD", TagValue: values?.DurationfromRCDTillDOD || formData?.DurationfromRCDTillDOD},
        { Status: "Create", TagName: "DurationfromRCDTillDODIntimation", TagValue: values?.DurationfromRCDTillDODIntimation  ||formData?.DurationfromRCDTillDODIntimation},
        { Status: "Create", TagName: "UWDecision", TagValue: values?.UWDecision1 || formData?.UWDecision1},
        { Status: "Create", TagName: "UWComments", TagValue: values?.UWComments || formData?.UWComments},
        { Status: "Create", TagName: "ClaimAssessedBy", TagValue: loginInfo?.userProfileInfo?.profileObj?.userName},
        { Status: "Create", TagName: "ClaimAssessementOn", TagValue: ""},
        
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
    if (selectedSubType === "claimsrequest" && activeTabKey === "2") {
        return [
          { Status: "Create", TagName: "ClaimsID", TagValue: values?.ClaimsID || ""},
          { Status: "Create", TagName: "ClaimServiceGuarateeApplicable", TagValue: values?.ClaimServiceGuarateeApplicable || ""},
          { Status: "Create", TagName: "AgeingFromIntimation", TagValue: values?.AgeingFromIntimation || ""},
          { Status: "Create", TagName: "AgeingFromRegisterationDate", TagValue: values?.AgeingFromRegisterationDate || ""},
          { Status: "Create", TagName: "claimType", TagValue: values?.claimType || ""},
          { Status: "Create", TagName: "NatureofDeath", TagValue: values?.NatureofDeath || ""},
          { Status: "Create", TagName: "exactCauseOfDeath", TagValue: values?.exactCauseOfDeath || ""},
          { Status: "Create", TagName: "exactCauseOfIllness", TagValue: values?.exactCauseOfIllness || ""},
          { Status: "Create", TagName: "DateofDeath", TagValue: values?.DateofDeath || ""},
          { Status: "Create", TagName: "claimCategory", TagValue: values?.claimCategory || ""},
          { Status: "Create", TagName: "ReasonForLateIntimation", TagValue: values?.ReasonForLateIntimation || ""},
          { Status: "Create", TagName: "LastRequirementReceivedDate", TagValue: values?.LastRequirementReceivedDate ?  moment(values?.LastRequirementReceivedDate + 1).format("DD/MM/YYYY"): ""},
          { Status: "Create", TagName: "AgeingFromLastDocumentReceived", TagValue: values?.AgeingFromLastDocumentReceived || ""},
          { Status: "Create", TagName: "DateofIntimation", TagValue: values?.DateofIntimation || ""},
          { Status: "Create", TagName: "RegistrationEffectiveDate", TagValue: values?.RegistrationEffectiveDate || ""},
        ]
      }
      if (selectedSubType === "claimsrequest" && activeTabKey === "4") {
        return [
          { Status: "Create", TagName: "ClaimHotspotCheck", TagValue: values?.ClaimHotspotCheck || ""},
          { Status: "Create", TagName: "IIBDataBaseCheck", TagValue: values?.IIBDataBaseCheck || ""},
          { Status: "Create", TagName: "IIBDataBaseCheckText", TagValue: values?.IIBDataBaseCheckText || ""},
          { Status: "Create", TagName: "IndustryCheck", TagValue: values?.IndustryCheck || ""},
          { Status: "Create", TagName: "AutoPayStatus", TagValue: values?.AutoPayStatus || ""},
        ]
      }
      else if (selectedSubType === "claimsrequest" && activeTabKey === "5") {
        return [
          { Status: "Create", TagName: "DidPolicyLapse", TagValue: values?.DidPolicyLapse || ""},
          {
  Status: "Create",
  TagName: "Lapsedon",
  TagValue:
    values?.Lapsedon 
    ?  dayjs(values?.Lapsedon).format('DD/MM/YYYY')
      : values?.Lapsedon
    
},
          { Status: "Create", TagName: "WasPolicyReinstated", TagValue: values?.WasPolicyReinstated || ""},
        {
  Status: "Create",
  TagName: "ReinstatementDate",
    TagValue:
    values?.ReinstatementDate 
    ?  dayjs(values?.ReinstatementDate).format('DD/MM/YYYY')
      : values?.ReinstatementDate
},
          { Status: "Create", TagName: "ReinstatementDecision", TagValue: values?.ReinstatementDecision || ""},
          { Status: "Create", TagName: "ReinstatementDecisionText", TagValue: values?.ReinstatementDecisionText || ""},
          { Status: "Create", TagName: "WithDGH", TagValue: values?.WithDGH || ""},
          { Status: "Create", TagName: "MedicalDisclosures", TagValue: values?.MedicalDisclosures || ""},
        ]
      }
      // else if (selectedSubType === "claimsrequest" && activeTabKey === "6") {
        
      //   return [
      //     { Status: "Create", TagName: "DateofAssignment", TagValue: values?.DateofAssignment || ""},
      //     { Status: "Create", TagName: "AssignmentType", TagValue: values?.AssignmentType || ""},
      //     { Status: "Create", TagName: "AssigneeName", TagValue: values?.AssigneeName || ""},
      //     { Status: "Create", TagName: "AssignorName", TagValue: values?.AssignorName || ""},
      //     { Status: "Create", TagName: "LoanActive", TagValue: values?.LoanActive || ""},
      //     { Status: "Create", TagName: "OutstandingLoanAmount", TagValue: values?.OutstandingLoanAmount || ""},
      //     { Status: "Create", TagName: "IsLANomineeAddressSame", TagValue: nomineeform.getFieldValue()?.IsLANomineeAddressSame || ""},
      //   ]
      // }
      else if (selectedSubType === "claimsrequest" && activeTabKey === "6") {
      let newArray =
      [
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments || ""},
        { Status: "Create", TagName: "NomineeChanged", TagValue: values?.NomineeChanged || ""},
        { Status: "Create", TagName: "IsLANomineeAddressSame", TagValue: values?.IsLANomineeAddressSame || ""},
        {Status: "Create",TagName: "Client_Id","TagValue":  values?.GSTINToBeUpdateFor === "1" ? customerData?.laClientID: customerData?.poClientID},
          { Status: "Create", TagName: "DateofAssignment", TagValue: values?.DateofAssignment || ""},
          { Status: "Create", TagName: "AssignmentType", TagValue: values?.AssignmentType || ""},
          { Status: "Create", TagName: "AssigneeName", TagValue: values?.AssigneeName || ""},
          { Status: "Create", TagName: "AssignorName", TagValue: values?.AssignorName || ""},
          { Status: "Create", TagName: "LoanActive", TagValue: values?.LoanActive || ""},
          { Status: "Create", TagName: "OutstandingLoanAmount", TagValue: values?.OutstandingLoanAmount || ""},
          { Status: "Create", TagName: "IsLANomineeAddressSame", TagValue: nomineeform.getFieldValue()?.IsLANomineeAddressSame || ""},
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
          if (record[property] || record[property] === 0) {
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
    else if (selectedSubType === "claimsrequest" && activeTabKey === "7") {debugger
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
    else if (selectedSubType === "claimsrequest" && activeTabKey === "8") {
      let formData = form.getFieldsValue();
    
      // Start with Total Claim Payable
      let newArray = [
         { Status: "Create", TagName: "riderSumAssured", TagValue: claimPayout?.riderSumAssured || "" },
         { Status: "Create", TagName: "premiumsToBeWaved", TagValue: claimPayout?.premiumsToBeWaved || "" },
         { Status: "Create", TagName: "premiumSuspense", TagValue: claimPayout?.premiumSuspense || "" },
         { Status: "Create", TagName: "interestCharges", TagValue: claimPayout?.interestCharges || "" },
         { Status: "Create", TagName: "penalInterestCharges", TagValue: claimPayout?.penalInterestCharges || "" },
         { Status: "Create", TagName: "premiumRecovery", TagValue: claimPayout?.premiumRecovery || "" },
         { Status: "Create", TagName: "survivalBenefit", TagValue: claimPayout?.survivalBenefit || "" },
         { Status: "Create", TagName: "survivalBenefit_Add", TagValue: claimPayout?.survivalBenefit_Add || "" },
         { Status: "Create", TagName: "TotalClaimPayable", TagValue: formattedTotalPayoutAmount },
         { Status: "Create", TagName: "withinRetention", TagValue: reInsureDetails?.[0]?.withinRetention || "" },
         { Status: "Create", TagName: "retentionAmount", TagValue: reInsureDetails?.[0]?.retentionAmount || "" },
      ];
    
      // Add each individual Claim Payout field
      for (const [key, value] of Object.entries(claimPayout)) {
        newArray.push({
          Status: "Create",
          TagName: key, // This will be like "riderSumAssured", "premiumSuspense", etc.
          TagValue: value || "0"
        });
      }
    
      const properties = [
        //"withinRetention",
       // "retentionAmount",
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
    
    else if (selectedSubType === "claimsrequest" && activeTabKey === "9") {
      let formData = form.getFieldsValue();
      // let newArray = [
      //   // { Status: "Create", TagName: "WithinFGLIRetention", TagValue: values?.WithinFGLIRetention|| ""},
      //   // { Status: "Create", TagName: "FGLIRetention", TagValue: values?.FGLIRetention|| ""},
      //   // { Status: "Create", TagName: "ReInsurerName", TagValue: values?.ReInsurerName|| ""},
      //   // { Status: "Create", TagName: "ReInsurerParticipation", TagValue: values?.ReInsurerParticipation|| ""},
      //   // { Status: "Create", TagName: "LifeAsiaTransactions", TagValue: values?.LifeAsiaTransactions|| ""},
      //   { Status: "Create", TagName: "TotalClaimPayable", TagValue: values?.formattedTotalPayoutAmount||formattedTotalPayoutAmount},
      // ]
      // const properties = [
      //   "withinRetention",
      //   "retentionAmount",
      //   "reInsurerName",
      //   "participation",
      // ];
      // let updatedDataList = [];
      // reInsureDetails?.forEach((record, recordIndex) => {
      //   properties.forEach((property, propertyIndex) => {
      //     if (record[property] || record[property] == 0) {
      //       let obj = {
      //         Status: "Create",
      //         TagName: `${property}_${recordIndex + 1}`,
      //         TagValue: record[property]
      //       };
      //       updatedDataList.push(obj);
      //     }
      //   });
      // });
      // updatedDataList = [...updatedDataList, ...newArray];
      // return updatedDataList;

      const tags = [];
    
      if (requirementValues && requirementValues.length > 0) {
        requirementValues.forEach((item, index) => {
          // Avoid saving entries with missing requirement text
          if (item?.requirement) {
            tags.push(
              {
                Status: "Create",
                TagName: `Requirement_${index + 1}_Text`,
                TagValue: item.requirement,
              },
              {
                Status: "Create",
                TagName: `Requirement_${index + 1}_Received`,
                TagValue: item.received ? "Yes" : "No",
              },
              {
                Status: "Create",
                TagName: `Requirement_${index + 1}_Status`,
                TagValue: item.status || "",
              }
            );
          }
        });
      }
    
      if (values?.otherInput) {
        tags.push({
          Status: "Create",
          TagName: "ClaimsOtherDocument",
          TagValue: values.otherInput,
        });
      }
    
      return tags;
    }
    else if (selectedSubType === "claimsrequest" && activeTabKey === "3") {
      let formData =  form.getFieldValue();
      return [
        { Status: "Create", TagName: "ClaimIntimatedBy", TagValue: formData?.ClaimIntimatedBy|| ""},
        { Status: "Create", TagName: "ClaimIntimatedOn", TagValue: formData?.ClaimIntimatedOn|| ""},
        { Status: "Create", TagName: "ClaimRegisteredBy", TagValue: formData?.ClaimRegisteredBy|| ""},
        { Status: "Create", TagName: "ClaimRegisteredOn", TagValue: formData?.ClaimRegisteredOn|| ""},
        { Status: "Create", TagName: "AssesmentDoneBy", TagValue: formData?.AssesmentDoneBy|| ""},
        { Status: "Create", TagName: "AssesmentDoneOn", TagValue: formData?.AssesmentDoneOn? dayjs(formData.AssesmentDoneOn).format("DD/MM/YYYY") : ""},
        { Status: "Create", TagName: "SelectSubStage", TagValue: formData?.SelectSubStage|| ""},
      ]
    }
    else if (selectedSubType === "claimsrequest" && activeTabKey === "10") {
      const tags = [];
    
      if (requirementValues && requirementValues.length > 0) {
        requirementValues.forEach((item, index) => {
          // Avoid saving entries with missing requirement text
          if (item?.requirement) {
            tags.push(
              {
                Status: "Create",
                TagName: `Requirement_${index + 1}_Requirement`,
                TagValue: item.requirement,
              },
              {
                Status: "Create",
                TagName: `Requirement_${index + 1}_Received`,
                TagValue: item.received ? "Yes" : "No",
              },
              {
                Status: "Create",
                TagName: `Requirement_${index + 1}_Status`,
                TagValue: item.status || "",
              }
            );
          }
        });
      }
    
      if (values?.otherInput) {
        tags.push({
          Status: "Create",
          TagName: "ClaimsOtherDocument",
          TagValue: values.otherInput,
        });
      }
    
      return tags;
    }
    
    else if (selectedSubType === "claimsrequest" && activeTabKey === "11") {
      let formData = form.getFieldValue();
      const investigatorData = formData?.investDetails?.map((investigator, index) => ([
        { 
            Status: "Create", 
            TagName: `PrimaryInvestigatorName_${index + 1}`, 
            TagValue: investigator?.investigatorName || "" 
        },
        { 
            Status: "Create", 
            TagName: `PrimaryInvestigatorStartDate_${index + 1}`, 
            TagValue: investigator?.investigationStartDate 
                ? dayjs(investigator.investigationStartDate).format("YYYY/MM/DD") 
                : "" 
        },
        { 
            Status: "Create", 
            TagName: `PrimaryInvestigatorEndDate_${index + 1}`, 
            TagValue: investigator?.investigationEndDate 
                ? dayjs(investigator.investigationEndDate).format("YYYY/MM/DD") 
                : "" 
        }
    ])).flat();

    return [
    { Status: "Create", TagName: "PrimaryIntiateInvestigation", TagValue: formData?.InitiateInvestigation || "" },
    { Status: "Create", TagName: "PrimaryRefarCaseTo", TagValue: formData?.ReferCaseTo || "" },
    { Status: "Create", TagName: "PrimaryRefarCaseToText", TagValue: formData?.PrimaryRefarCaseToText || "" },
    ...investigatorData 
  ];
    }
    else if (selectedSubType === "claimsrequest" && activeTabKey === "12") {
      let formData = assessorsForm.getFieldsValue();
      return [
      { Status: "Create", TagName: "PrimaryAssesorsDecision", TagValue: formData?.PrimaryAssesorsDecision || ""},
      { Status: "Create", TagName: "PrimaryDecisionDescription", TagValue: formData?.PrimaryDecisionDescription || ""},
      { Status: "Create", TagName: "ReasonForDecision", TagValue: formData?.ReasonForDecision || ""},
      { Status: "Create", TagName: "ReferralComments", TagValue: values?.ReferralComments || ""},
      { Status: "Create", TagName: "PrimaryAssessorRecommendation", TagValue: formData?.PrimaryAssessorRecommendation || ""},
    ]
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
    // if (response.statusText) {
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

  const handleStatusAliveChange = (index, value) => {
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
    const newRow = { id: newId, NomineePANNumber:"", PANValidationResult: "", NomineeMobile: null, NameonPAN: 0, address_1: null, address_2: null, city: null, state: null, pincode: null, NomineeEmail: "", FullName: fullName, IsMinor: isMinor, Role: role };
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
const handleDeleteNominee = (id, role, firstName) => {
  if(role === "appointee"){
    setUpdateNomineeData((prev) => (prev || []).filter((r) => !(r.id === id)));
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

const existingNominee=() => {
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

  const handleBackClick = () => {
    const previousTabKey = (parseInt(activeTabKey, 10) - 1).toString();
    if (parseInt(previousTabKey, 10) >= 1) {
      setActiveTabKey(previousTabKey);
    }
  };

  const InitiatePennyDropp = (row) => {
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
        updatedbeneficiaryobj[row].InitiatePennyDrop = result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  "Success" : "Failed",
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

  const handleToggleReceived = (index) => {
    const updatedValues = [...requirementValues];
  
    // Always get the current requirement from selectedRequirements
    const requirementText = selectedRequirements[index];
  
    updatedValues[index] = {
      ...updatedValues[index],
      requirement: requirementText,
      received: !(updatedValues[index]?.received ?? false),
    };
  
    setRequirementValues(updatedValues);
  };
  

  
  const handleBankEdit = (val)=>{
    if (val === 'edit') {
       setIsBankEditable(true);
      } else if (val === 'close') {
        setIsBankEditable(false);
      }
  }
  const handleAssessmentSave =()=>{
    setShowSubmitBtn(true);
  }

  const handleRaiseRequirementSave =()=>{
    setRaiseRequirementButton(true);
  }

  const getMandatetagEnquiry = ()=>{
    //setIsLoading(true);
    //setDisableOTP(true);
    //setECGRequestField(null);
    getMandateData();
    let empID = loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID
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
       //form?.setFieldsValue({AutoPayStatus: isECGRequestValue})
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
//     let content  = status === 'REJECTED' ? "Please Select Documents to Reject": "Please Select Documents to move  Internally"
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
          setIsLoading(false);
          if(selectedSubType==="claimsrequest" && ["1", "2","3","4","5","6","7","8","9","10","11","12","13"].includes(activeTabKey)){
              if(activeTabKey==="1") {
                setPolicyDetailsData(values);
              }
              else if(activeTabKey==="10"){
                //return handleClaimDetailsTabSave();
              }
              message.destroy();
              message.success({
               content: "Details Saved.",
               className: "custom-msg",
               duration: 2,
             });
            
            }
            else {
              setAlertTitle(val?.data?.header);
              setAlertData(val?.data?.message);
              setShowAlert(true);
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
    })
    .catch((err) => {
      setIsLoading(false);
    });
  };
  const handleRequirementSubmit = () => {
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
            TotalClaimPayable: response?.data?.responseBody?.dsumins? Number(response?.data?.responseBody?.dsumins).toLocaleString('en-IN') : null
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
    }
  };

  const getGCPPolicydetails = () => {
    setIsLoading(true);
    let response = apiCalls.getFreeLookDetailsApi(import.meta.env.VITE_APP_ENVIRONMENT == "UAT" ? import.meta.env.VITE_APP_GCP_POLICY_NO : customerData?.policyNo);
    response
      .then((val) => {
        if (val?.data?.statusCode==="200") {
          // let maxDate = new Date(0);
          // let maxRecord = null;
          // // Iterate over the JSON data to find the record with the maximum date
          // val?.data?.response?.dispatch_details?.forEach(item => {
          //   // Extract day, month, and year from the date string
          //   if(item?.dispatchdate){
          //   const dateParts = item?.dispatchdate?.split('-'); // Change '/' to '-' assuming your date format is "YYYY-MM-DD"
          //   const year = parseInt(dateParts[0], 10);
          //   const month = parseInt(dateParts[1], 10) - 1; // Subtract 1 because months are zero-indexed
          //   const day = parseInt(dateParts[2], 10);
          //   const currentDate = new Date(year, month, day);
          
          //   if (currentDate > maxDate) {
          //     maxDate = currentDate;
          //     maxRecord = item;
          //   }
          // }
          // });
          // let dispatchDetails = maxRecord;
          // handleValidate(val?.data?.response?.delivery_details[0]?.dispatchDeliveryDate)

          form.setFieldsValue({
            ApplicationDate:  val?.data?.response?.applicationAttribute[0]?.proposalSignDate ? convertDate(val?.data?.response?.applicationAttribute[0]?.proposalSignDate) : null,
            Totalpremiumpaidtilldate: val?.data?.response?.tds_details[0]?.total_premium_paid_in_policy,
            LAOccupation:  val?.data?.response?.clientAttribute[0]?.laOccupation,
            LifeAssuredAnnualIncome: val?.data?.response?.clientAttribute[0]?.laIncome,
          })
          
          // const response= val?.data?.response?.policyAttribute[0];
          // if(selectedSubType === "statusenquiry"){
          //   setEnquiryListData(val?.data?.response?.delivery_details);
          //   setRtoDetails(val?.data?.response?.rto_details)

          //   setViewDispatchDetails(val?.data?.response?.dispatch_details)
          //   form.setFieldsValue({
          //     WelcomeCallComments: val?.data?.response?.applicationAttribute[0]?.welcomeCallDisposition,
          //     FreelookPeriodEndedOn:convertDates(val?.data?.response?.delivery_details[0]?.dispatchDeliveryDate)

          //   })
          // }else {
          //   setGCPDetailsData({
          //     // dispatchDetailsData: val?.data?.response?.dispatch_details || [],
          //     // deliveryDetailsData: val?.data?.response?.delivery_details || [],
          //     // rtoDetailsData: val?.data?.response?.rto_details || [],
          //     policyAttribute: val?.data?.response?.policyAttribute || [],
          //   });
          // }
          setIsLoading(false);
        } else {
          setIsLoading(false);
          message.error({
            content:
              val?.data?.statusMessage ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
       
      })
      .catch((err) => {
       
      });
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

  const handlePastComments =(values)=>{
    const newComment =  addComments != null ? addComments?.trim() : assessorsForm.getFieldValue('PrimaryAssessorRecommendation');
   
    if(!newComment || newComment === " "){
        return null;
    }

    let response = apiCalls.GetClaimsCommentsInfo(POSContactData?.srvReqID,addComments,loginInfo?.userProfileInfo?.profileObj?.name, assessorsForm.getFieldValue('PrimaryAssessorRecommendation'));
    response
      .then((val) => {
      message.success(val?.data);
      const newComment = {
        "createdDate": new Date(),
        "comments" : addComments,
        "claimRecommendation": assessorsForm.getFieldValue('PrimaryAssessorRecommendation')
      };
      setAllComments((prevComments) => [...prevComments, newComment,]);
      setShowCommentsModal(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }
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
  
  }
  const handleReferralCmtCahnge =(e)=>{
   setIsReferallData(e.target.value);
  }
  const handleAddComments =()=>{
    referrelSheetForm.resetFields(['referralViewComments']);
    setForceUpdate((prev) => !prev);
  }

  const handleAddComments1 =()=>{
    setShowCommentsModal(true);
        setAddComments(null);
    }

    const handleAddComments2 =()=>{
      setShowCommentsModal1(true);
      POSContactData?.serviceRequestTransectionData?.forEach(element => {
        posChangeinPlanObj[element.tagName] = element.tagValue
      });
          setCheckersRecommendation(posChangeinPlanObj?.AssesmentCheckerRemarks);
      }

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
  
  const handleReInsureNameChange = (index, value) => {
    const updatedData = [...reInsureDetails];
    updatedData[index].reInsurerName = value;
    setReInsureDetails(updatedData);
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

   const handleRetentionChange = (index, value, row) => {
    const updatedData = [...reInsureDetails];
    updatedData[index].withinRetention = value;
    updatedData[index].isDisable = value === "1" ? true : false;
    setReInsureDetails(updatedData);
  };
  const handleRoleChange = (index, value) => {
    const updatedData = [...reInsureDetails];
    updatedData[index].retentionAmount = value;
    setReInsureDetails(updatedData);
  };

  const handleRoleChange1 = (index, value,row) => {
    const updatedData = [...posUpdateNomineeData];
    updatedData[index].Role_New = value;
    setPosUpdateNomineeData(updatedData);
  };
  
  const handleParticipationChange = (index, value) => {
    const updatedData = [...reInsureDetails];
    updatedData[index].participation = value;
    setReInsureDetails(updatedData);
  };
  // const formatNumber = (value) => {
  //   // Remove non-numeric characters before formatting
  //   const numValue = value?.replace(/[^\d]/g, "");
  //   return Number(numValue)?.toLocaleString();
  // };


  const handleOFAVCHECK =()=>{
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

   const handleDedupeMatch =(item)=>{
      setDeDupeModalOpen(true);
  }
  
  const handleClaimPayout = (key, value) => {
    setClaimPayout((prev) => (
      {
        ...prev,
        [key] : value
      }
    ))
  };

  // Format number with commas
const formatNumber = (value) => {
  if (!value) return '';
  const number = parseFloat(value?.toString().replace(/,/g, ''));
  return isNaN(number) ? '' : number.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

// Remove commas to get the raw number
const unformatNumber = (value) => {
  return value.replace(/,/g, '');
};

const handleRawInput = (field, value) => {
  // Only allow digits and dot (.)
  if (/^[\d,]*\.?\d{0,2}$/.test(value.replace(/,/g, '')) || value === "") {
    setClaimPayout((prev) => ({
      ...prev,
      [field]: value
    }));
  }
};
const handleFormatOnBlur = (field, value) => {
  const number = parseFloat(value.replace(/,/g, ''));
  if (!isNaN(number)) {
    const formatted = number.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    setClaimPayout((prev) => ({
      ...prev,
      [field]: formatted
    }));
  }
};


const totalPayoutAmount = Object.entries(claimPayout).reduce((sum, [key, val]) => {
  const numericVal = parseFloat(val?.toString().replace(/,/g, '')) || 0;

  if (key === "premiumRecovery" || key === "survivalBenefit") {
    return sum - numericVal;
  } else {
    return sum + numericVal;
  }
}, parseFloat(deathSumAssured?.toString().replace(/,/g, '')) || 0);

const formattedTotalPayoutAmount = totalPayoutAmount ? totalPayoutAmount?.toLocaleString(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}) : 0;

// When user selects Assessor's Decision
const handleAssessorDecisionChange = (selectedValue) => {
  // Find the selected assessor item to get its ID
  const selectedAssessor = assessorsDecisionLU.find(
    (item) => item.mstDesc === selectedValue
  );

  if (selectedAssessor) {
    // Filter decision descriptions based on parent ID
    const filteredDescriptions = masterData
      ?.find((ele) => ele.key === "ASSESOR_SUB_DECI")?.value
      ?.filter((ele) => ele.mstParentID === selectedAssessor.mstID)
      ?.map((ele) => ({
        ...ele,
        label: ele.mstDesc,
        value: ele.mstID, 
      })) || [];

    setDecisionPrimaryDescriptionLU(filteredDescriptions);

    // Reset decision description field when assessor decision changes
    assessorsForm.setFieldsValue({ PrimaryDecisionDescription: undefined });
  }
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
        onFinish={(values) => {
          // Ensure PrimaryRefarCaseToText is set before submit
          if (!values.PrimaryRefarCaseToText && values.ReferCaseTo && referCaseToLU) {
            const selectedOption = referCaseToLU.find(opt => opt.mstID === values.ReferCaseTo);
            const text = selectedOption ? selectedOption.mstDesc : "";
            form.setFieldsValue({ PrimaryRefarCaseToText: text });
            values.PrimaryRefarCaseToText = text;
          }
          handleSubmit(values);
        }}
        autoComplete="off"
      >
                    {renderDetailsForm("Primary_Policy_Details")}
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
                                              onChange={(date, dateString) => handleDobChange(dateString, index, "rider")}
                                            />
                                          </Form.Item>

                                          {/* Hidden field to store IIBDataBaseCheckText for payload */}
                                          <Form.Item name="IIBDataBaseCheckText" style={{ display: 'none' }}>
                                            <Input type="text" />
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
                       Save
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
        form={claimDetailsForm}
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
        onFinish={
          // Debug log to verify values
          handleSubmit
         
        }
        autoComplete="off"
      >
        {renderDetailsForm("Primary_Claim_Details")}
                    <div className="contact-details-btn">
 
                     {activeTabKey === "8" && (
  <Button type="primary" className="primary-btn" htmlType="button">
    Create JE
  </Button>
)}
                      <Button type="primary" className="primary-btn" htmlType="submit"
                      >
                      Save
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
        onFinish={handleSubmit}
        autoComplete="off"
      >
                    {renderDetailsForm("Primary_Intimation_Details")}
                    <div className="contact-details-btn">

                      <Button type="primary" className="primary-btn" htmlType="submit" onClick={handleSubmit}
                      >
                       Save
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
        form={policyCheckForm}
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
                    {renderDetailsForm("PolicyChecks_Claim_Details")}
                    {/* Hidden field to store IIBDataBaseCheckText for payload */}
                    <Form.Item name="IIBDataBaseCheckText" style={{ display: 'none' }}>
                      <Input type="text" />
                    </Form.Item>
                    <div className="contact-details-btn">

                      <Button type="primary" className="primary-btn" htmlType="submit"
                      >
                       Save
                      </Button>

                    </div>
                  </Form>

                </>}
            </TabPane>
            <TabPane  tab={<span>Reinstatement Details</span> } key="5">
            <Form
        form={reInstatementForm}
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
                    {renderDetailsForm("Reinstatement_Details_Claim_Details")}
                    {/* Hidden field to store ReinstatementDecisionText for payload */}
                    <Form.Item name="ReinstatementDecisionText" style={{ display: 'none' }}>
                      <Input type="text" />
                    </Form.Item>
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
                       Save
                      </Button>

                    </div>
                  </Form>
            </TabPane>
            {/* {details?.policyDetailsObj?.assigneeDetails?.isPolicyAssigned === 'Y' &&<> */}
            {/* <TabPane  tab={<span>Assignment Details</span> } key="6">
            <Form
        form={assignmentForm}
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
                    {renderDetailsForm("AssignmentDetails_Claim_Details")}
                    <div className="contact-details-btn">

                      <Button type="primary" className="primary-btn" htmlType="submit"
                      >
                       Next
                      </Button>

                    </div>
                  </Form>
            </TabPane> */}
            {/* </>} */}
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
        onFinish={handleSubmit}
        autoComplete="off"
      >
           <div className="mb-16">
                  {renderDetailsForm("BeneficiaryDetails_Claim_Details")}
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
                    <table className="responsive-table" style={{width:'105%'}}>
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
                                  <span className="link-txt" onClick={()=>handleOFAVCHECK()}>{"OFAC Check"}</span> 
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
     
     value={row?.NomineeDOB ? dayjs(row.NomineeDOB, 'DD/MM/YYYY') : null}
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
               </div>
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
          </tr>
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
                          : <></>
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
                  //disabled={!isBankEditable}
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
            <TabPane tab={<span>Claim Payment Details</span>} key="8">
  <Form
    form={reInsureForm}
    name="wrap"
    labelCol={{ flex: "35%" }}
    labelAlign="left"
    labelWrap
    wrapperCol={{ flex: 1 }}
    colon={false}
    onFinish={handleSubmit}
    autoComplete="off"
  >

    {/* Re-Insurer Section */}
    <div className="d-flex mb-16">
      <h4 className="subtype-headings fs-16 fw-500">Re-Insurer Details</h4>
      <span className="d-flex justify-center" style={{ paddingLeft: "10px" }}>
        <i
          className="bi bi-plus-circle-fill c-pointer text-color fs-18"
          onClick={() => {
            if (reInsureDetails[0]?.withinRetention !== '1') {
              handleAdd();
            }
          }}
        ></i>
      </span>
    </div>

    <div className="fgli-retention-wrapper mb-16">
  <Row gutter={16} className="mb-16">
    <Col span={12}>
      <label className="field-label" style={{ fontWeight: 'bold' }}>Within GCLI Retention</label>
      <Form.Item
        name={['reInsureDetails', 0, 'withinRetention']}
        className="mb-0"
        rules={[{ required: true, message: "Select Within Retention" }]}
      >
        <Select
          className="custom-select"
          placeholder="Select"
          options={[
            { value: "1", label: "Yes" },
            { value: "2", label: "No" },
          ]}
          onChange={(value) =>
            handleRetentionChange(0, value, reInsureDetails[0])
          }
        />
      </Form.Item>
    </Col>

    <Col span={12}>
      <label className="field-label" style={{ fontWeight: 'bold' }}>GCLI Retention Amount</label>
      <Form.Item
        name={['reInsureDetails', 0, 'retentionAmount']}
        className="mb-0"
        rules={[{ required: !reInsureDetails[0]?.isDisable, message: "Enter Retention Amount" }]}
      >
        <Input
          placeholder="Enter GCLI Retention Amount"
          className="custom-input"
          value={reInsureDetails[0]?.retentionAmount}
          disabled={reInsureDetails[0]?.withinRetention == '1'}
          onChange={(e) => handleRoleChange(0, e.target.value, reInsureDetails[0])}
          onKeyDown={(e) => handleKeyDown("numbersOnly", e)}
        />
      </Form.Item>
    </Col>
  </Row>

  <div className="section-label">Re-Insurer Details</div>

  {reInsureDetails
    .filter(row => {
      // Always include row 0 (withinRetention) OR rows with non-empty reinsurerName and participation
      //return row.withinRetention || (row.reInsurerName?.trim() && row.participation?.toString().trim());
      return row.isManuallyAdded
  ? (row.withinRetention || (row.reInsurerName?.trim() && row.participation?.toString().trim()))
  : (row.reInsurerName?.trim() && row.participation?.toString().trim());

    })
    .map((row, index) => (
      <Row key={row.id} gutter={16} className="reinsurer-row">
        <Col span={12}>
          <Form.Item
            name={['reInsureDetails', index, 'reInsurerName']}
            className="mb-0"
            rules={[{ required: !row?.isDisable, message: "Enter Re-Insurer Name" }]}
          >
            <Input
              placeholder="Re-Insurer Name"
              className="custom-input"
              value={row?.reInsurerName}
              disabled={reInsureDetails[0]?.withinRetention !== '2'}
              onChange={(e) => handleReInsureNameChange(index, e.target.value, row)}
              onKeyDown={(e) => handleKeyDown("alphabatesOnly", e)}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name={['reInsureDetails', index, 'participation']}
            className="mb-0 flex-1"
            rules={[{ required: !row?.isDisable, message: "Enter Participation" }]}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Input
                placeholder="Participation"
                className="custom-input"
                value={row?.participation}
                disabled={reInsureDetails[0]?.withinRetention !== '2'}
                onChange={(e) => handleParticipationChange(index, e.target.value, row)}
                onKeyDown={(e) => handleKeyDown("numbersOnly", e)}
                style={{ flex: 1 }}
              />

              <i
                className="bi bi-trash3-fill trash-icon"
                onClick={() => handleDelete(row.id, index, row)}
                style={{
                  marginLeft: "8px",
                  cursor: "pointer",
                  color: "#c21b17",
                  fontSize: "16px"
                }}
              />
            </div>
          </Form.Item>
        </Col>
      </Row>
    ))}
</div>


    {/* Primary Claim Payable Section */}
    {renderDetailsForm("Primary_ClaimPayable_Details")}

    <table className="custom-table table-input">
      <tbody>
        <tr>
          <td>Death Sum Assured</td>
         <td>
   <Input
    type="text"
    className="custom-input"
    value={formatNumber(deathSumAssured)}
    onChange={(e) => handleClaimPayout("deathSumAssured", unformatNumber(e.target.value))}
    disabled
  />
</td>

        </tr>
        <tr>
          <td>Add: Rider Sum Assured</td>
        <td>
         <Input
         className="custom-input"
         type="text"
         value={claimPayout.riderSumAssured}
         onChange={(e) => handleRawInput("riderSumAssured", e.target.value)}
        onBlur={(e) => handleFormatOnBlur("riderSumAssured", e.target.value)}
         />
        </td>
        </tr>
        <tr>
          <td>Premiums to be Waived</td>
          <td>
         <Input
         className="custom-input"
         type="text"
         value={claimPayout.premiumsToBeWaved}
         onChange={(e) => handleRawInput("premiumsToBeWaved", e.target.value)}
        onBlur={(e) => handleFormatOnBlur("premiumsToBeWaved", e.target.value)}
         />
        </td>
        </tr>
        <tr>
          <td>Add: Premium Suspense</td>
          <td>
         <Input
         className="custom-input"
         type="text"
         value={claimPayout.premiumSuspense}
         onChange={(e) => handleRawInput("premiumSuspense", e.target.value)}
         onBlur={(e) => handleFormatOnBlur("premiumSuspense", e.target.value)}
         />
          </td>
        </tr>
        <tr>
          <td>Add: Interest Charges</td>
          <td>
           <Input
         className="custom-input"
         type="text"
         value={claimPayout.interestCharges}
         onChange={(e) => handleRawInput("interestCharges", e.target.value)}
        onBlur={(e) => handleFormatOnBlur("interestCharges", e.target.value)}
         />
          </td>
        </tr>
        <tr>
          <td>Add: Penal Interest Charges</td>
          <td>
         <Input
         className="custom-input"
         type="text"
         value={claimPayout.penalInterestCharges}
         onChange={(e) => handleRawInput("penalInterestCharges", e.target.value)}
        onBlur={(e) => handleFormatOnBlur("penalInterestCharges", e.target.value)}
         />
          </td>
        </tr>

         <tr>
          <td>Add: Survival Benefit/Withdrawals</td>
          <td>
         <Input
         className="custom-input"
         type="text"
         value={claimPayout.survivalBenefit_Add}
         onChange={(e) => handleRawInput("survivalBenefit_Add", e.target.value)}
        onBlur={(e) => handleFormatOnBlur("survivalBenefit_Add", e.target.value)}
         />
          </td>
        </tr>
        <tr>
          <td>Less: Premium Recovery</td>
          <td>
         <Input
         className="custom-input"
         type="text"
         value={claimPayout.premiumRecovery}
         onChange={(e) => handleRawInput("premiumRecovery", e.target.value)}
        onBlur={(e) => handleFormatOnBlur("premiumRecovery", e.target.value)}
         />
          </td>
        </tr>
        <tr>
          <td>Less: Survival Benefit/Withdrawals</td>
          <td>
           <Input
         className="custom-input"
         type="text"
         value={claimPayout.survivalBenefit}
         onChange={(e) => handleRawInput("survivalBenefit", e.target.value)}
        onBlur={(e) => handleFormatOnBlur("survivalBenefit", e.target.value)}
         />
          </td>
        </tr>
        <tr>
          <td>Total Payout Amount Payable</td>
          <td>{formattedTotalPayoutAmount}</td>
        </tr>
      </tbody>
    </table>

    <div className="contact-details-btn">
      <Button type="primary" className="primary-btn" htmlType="button" style={{ marginRight: "10px" }} onClick={handleCreateJE} disabled={isCreateJEDisabled}>
        Create JE
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
            Raise Requirements
          </span>
        }
        key="9"
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
        <Form.Item
          label="Raise Requirement"
          name="raiseRequirement"
          rules={[{ required: true, message: "Please select Yes or No" }]}
        >
          <Radio.Group
            onChange={e => {
              const selected = e.target.value;
              setIsShowRequirements(selected);
              if (selected === false) {
                setActiveTabKey("11"); // switch to Referrel Sheet tab
              }
            }}
            value={isShowRequirements}
          >
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>

        {isShowRequirements === true && (
          <>
            {/* <h4 className="subtype-headings fs-16 fw-500">Add Requirements</h4>
            <Form.Item label="Raise Requirement">
            <Radio.Group onChange={e=>setIsShowRequirements(e.target.value)}
                value={isShowRequirements}  >
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item> */}
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
       
          </>

        )}
      </div>
      <div className="contact-details-btn">
                      <Button type="primary" className="primary-btn" htmlType="submit" onClick={handleRaiseRequirementSave}>
                       Save
                      </Button>
                      <Button
              type="primary"
              className="primary-btn"
              htmlType="submit"
              onClick={handleSubmit}
              disabled={!raiseRequirementButton}
            >
              Raise Requirement
            </Button>
                    </div>
      
            </Form>
          </TabPane>

                {selectedRequirements?.length > 0 && (
  <>
  <TabPane tab={<span>View Requirements</span>} key="10">
      <div>
        <Form
          form={form}
          name="wrap"
          labelCol={{ flex: "35%" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          autoComplete="off"
        >
          <div style={{ maxWidth: 900,margin: "0 auto", padding: 20, borderRadius: 10, background: "#fff", boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }}>
          <h2 style={{ textAlign: 'center',paddingBottom: '15px' }}>Requirements Tracker</h2>
<ol>
{selectedRequirements.map((requirement, index) => (
  <li key={index}>
    <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
      <span style={{ width: 500,marginBottom: '20px' }}>{requirement}</span>

      {/* Toggle Button for Received / Not Received */}
      {/* <Button
        type="default"
        onClick={() => handleToggleReceived(index)}
        style={{  
          marginLeft: "100px",
          backgroundColor: requirementValues[index]?.received ? "green" : "#b21f1f",
          color: "white",
          borderColor: requirementValues[index]?.received ? "green" : "#b21f1f",
          width: "150px", 
          height: "45px",  
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px", 
          borderRadius: "5px", 
        }}
      >
        {requirementValues[index]?.received ? "Received" : "Not Received"}
      </Button> */}
      <Dropdown menu={{
    items: [
      { key: "received", label: "Received" },
      { key: "not_received", label: "Not Received" },
      { key: "waiver", label: "Waiver" },
    ],
    onClick: ({ key }) => handleStatusChange(index, key),
  }} trigger={['click']}>
  <Button
    type="default"
    style={{
      marginLeft: "100px",
      backgroundColor: getButtonColor(requirementValues[index]?.status),
      color: "white",
      borderColor: getButtonColor(requirementValues[index]?.status),
      width: "150px",
      height: "45px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      borderRadius: "5px",
    }}
  >
    {requirementValues[index]?.status === "received"
      ? "Received"
      : requirementValues[index]?.status === "waiver"
      ? "Waiver"
      : "Not Received"}
  </Button>
</Dropdown>
        {/* Dropdown */}
        {/* <Select
                style={{ width: 200 }}
                onChange={(value) => handleSelectChange(value, index)}
                placeholder="Accept / Reject / Waive"
                value={requirementValues[index]?.status || undefined}
              >
                <Option value="accept">Accept</Option>
                <Option value="reject">Reject</Option>
                <Option value="waive">Waive</Option>
              </Select> */}
    </div>
  </li>
))}
</ol>
          <div className="contact-details-btn">
            <Button
              type="primary"
              className="primary-btn"
              htmlType="submit"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
          </div>
        </Form>
      </div>
    </TabPane>
  </>
)}



                 <TabPane tab={<span>Referral Sheet</span>} key="11">
      <Form
        form={form}
        name="wrap"
        labelCol={{ flex: "35%" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <div className="d-flex mb-16 mt-16">
          <h4 className="subtype-headings fs-16 fw-500">Refer To Investigation</h4>
          <span className="d-flex justify-center" style={{ paddingLeft: "10px" }}>
            <i
              className="bi bi-plus-circle-fill c-pointer text-color fs-18"
              disabled={isdisable}
              onClick={addInvestigator} // Now calling globally
            ></i>
          </span>
        </div>

        {renderDetailsForm("Referrel_Sheet_Details")}

      <div className="table-container email-table mb-16">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Investigator Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Action</th>
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
  options={investigatorLU.map(i => ({ label: i.mstDesc, value: i.mstID }))}
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
             </tr>
           ))}
         </>
       );
     }}
   </Form.List>
 </tbody>
        </table>
      </div>
  

        {renderDetailsForm("Referrel_Sheet_ReferTo")}
        
        <a
        onClick={() => handleAddComments1()}
        style={{
          display: 'block',
          marginBottom: '5px',
          color: "#b3201f",
        }}
      >
        Add Comments
      </a>


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
  {allComments?.filter(item => item?.comments?.trim()).length > 0 ? (
    allComments
      .filter(item => item?.comments?.trim())
      .map(item => (
        <tr key={item.commentID}>
          <td>{convertDate(item?.createdDate)}</td>
          <td>{item.comments}</td>
        </tr>
      ))
  ) : (
    <tr>
      <td colSpan="2">
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
          <Button type="primary" className="primary-btn" htmlType="submit" onClick={handleSubmit}>Save</Button>
        </div>
      </Form>
    </TabPane>
    <TabPane tab={<span>Assessors Recommendation</span>} key="12">
  <Form
    form={assessorsForm}
    name="wrap"
    labelCol={{ flex: "30%" }}
    labelAlign="left"
    labelWrap
    wrapperCol={{ flex: 1 }}
    colon={false}
    onFinish={handleSubmit}
    autoComplete="off"
  >
    {/* Dropdown Fields */}
    <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
    
  <div style={{ flex: 1 }}>
    <Form.Item
      label="Assessor's Decision"
      name="PrimaryAssesorsDecision"
      rules={[{ required: true, message: "Please select a decision" }]}
    >
      <Select placeholder="Select Decision" onChange={handleAssessorDecisionChange}>
        {assessorsDecisionLU?.map((item) => (
          <Select.Option key={item.mstID} value={item.mstDesc}>
            {item.mstDesc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  </div>

  <div style={{ flex: 1 }}>
    <Form.Item
      label="Decision Description"
      name="PrimaryDecisionDescription"
      rules={[{ required: true, message: "Please select a description" }]}
    >
      <Select placeholder="Select Description">
        {decisionPrimaryDescriptionLU?.map((item) => (
          <Select.Option key={item.mstID} value={item.value}>
            {item.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  </div>

    </div>

    {/* Textarea Field with Hyperlink */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        width: "100%",
        marginTop: "20px",
      }}
    >
      <label
        className="mb-2 font-medium"
        style={{ marginRight: "100px", marginTop: "20px" }}
      >
        Primary Assessor Recommendation
      </label>
      <a
        onClick={() => handleAddComments2()}
        style={{
          display: "block",
          marginBottom: "5px",
          color: "#b3201f",
          marginLeft: "100px",
        }}
      >
        View Checkers Recommendations
      </a>
    </div>

    <Form.Item
      name="PrimaryAssessorRecommendation"
      rules={[{ required: true, message: "Please enter recommendation" }]}
    >
      <TextArea
        style={{ width: "100%", minWidth: "800px" }}
        rows={6}
        placeholder="Primary Assessor Recommendation"
      />
    </Form.Item>

    {/* Buttons Section */}
    <div
      className="button-actions mt-16"
      style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
    >
      <Button type="primary" className="add-entry-btn" onClick={handlePastComments}>
        Add Entry
      </Button>
      <Button
        type="primary"
        className="delete-last-entry-btn"
        onClick={handleDeleteLastEntry}
      >
        Delete Last Entry
      </Button>
      <Button type="primary" className="download-pdf-btn" onClick={handleDownloadPDF}>
        Download PDF
      </Button>
    </div>

    {/* Table Section */}
    <div className="text-area mt-16">
      <Form.Item
        label="Captured Entries"
        name="CapturedEntries"
        className="inputs-label mb-0"
      />
      <div className="table-container1">
        <table className="custom-table comments-tb" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ width: "80px", textAlign: "center" }}>SR No</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {allComments?.filter(item => item?.claimRecommendation?.trim()).length > 0 ? (
              allComments
                .filter(item => item?.claimRecommendation?.trim())
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

    {/* Save & Submit Buttons */}
    <div
      className="contact-details-btn mt-16"
      style={{ display: "flex", gap: "10px", marginTop: "20px" }}
    >
      <Button type="primary" className="primary-btn" onClick={handleAssessmentSave}>
        Save
      </Button>
      <Button
        type="primary"
        className="primary-btn"
        htmlType="submit"
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
        title="Negative List"
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

      <Modal
        title="View Checkers Recommendations"
        open={showCommentsModal1}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setShowCommentsModal1(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="table-container" style={{ marginTop: "0px" }}>
          <TextArea rows={5}  maxLength={1000} placeholder={"Add your comments"} value={checkersRecommendation} onChange={(e) => setAddComments(e.target.value)}/>
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
              {/* <th>GL Code</th> */}
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
              {/* <td>{}</td> */}

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

export default ClaimsPrimaryAssesment;
