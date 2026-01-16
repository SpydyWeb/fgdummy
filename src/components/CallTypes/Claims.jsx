import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Form, Spin, Button, Checkbox, message, Input, Tabs, Row, Col,Radio,DatePicker,Select } from "antd";
import { ClaimsData } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import moment from "moment";
import UploadIcon from "../../assets/images/upload.png";
import apiCalls from "../../api/apiCalls";
import PopupAlert from "../popupAlert";
import dayjs from "dayjs";
import ClaimsNotificationView from "./ClaimsNotificationView";
import ClaimsPrimaryAssesment from "./ClaimsPrimaryAssesment";
import ClaimsAssessmentChecker from "./ClaimsAssessmentChecker";
import ClaimsApproverUser from "./ClaimsApproverUser";
import UploadDocuments from './UploadDocuments';

const { TabPane } = Tabs;

const Claims = (props) => {
  const loginInfo = useSelector(state => state);
  const dateFormat = "DD/MM/YYYY";
  const [emailExist] = useState(false);
  const suffix = <img src={UploadIcon} alt="" />;
  const { selectedSubType, clientRoleLU, details, customerData, clientEnquiryData,causeOfEventLU, natureOfDeathLU, policyTypeLU,claimCategoryLU,claimIntimationLU,sourceInformationLU,assuredIncomePlanLU, isPolicyAssigned ,requestModeLU} = props;
  const [form] = Form.useForm();
  const [nomineeform] = Form.useForm();
  const [nomineebankform] = Form.useForm();
  const [uploadform] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [ClaimTypee, setClaimTypee] = useState('');
  const [isShowPOSScreen, setIsShowPOSScreen] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertData, setAlertData] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [claimPaymentDetailsData, setClaimPaymentDetailsData] = useState([]);
  const [claimIntimatedBy, setClaimIntimatedBy] = useState("");
  const [existingNomineeData, setExistingNomineeData] = useState([]);
  const [relationShipLU,setRelationShipLU] = useState([]);
  const [isPennyDropStatus, setIsPennyDropStatus] = useState(false);
  const [isBeneficiaryChangeRequired,setIsBeneficiaryChangeRequired] = useState(false);
  const [CNFBankAccNo, setCNFBankAccNo] = useState("");
  const [BankAccNo, setBankAccNo] = useState("");
  const [updateFields,setUpdateFields] = useState(false);
  const [isAccidentSelection,setIsAccidentSelection] = useState(false);
  const [claimDetailsData,setClaimDetailsData] = useState({});
  const [dateOfDeath, setDateOfDeath] = useState('');
  const [isRiderData, setIsRiderData] = useState([]);
  const [claimAmount, setClaimAmount] = useState(null);
  const [checkedValue, setCheckedValue] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [uploadDoc, setUploadDoc] = useState(null);
  const [docList, setDocList] = useState([]);
  const [statusAliveValues, setStatusAliveValues] = useState([]);
  const [beneficiaryDetails, setBeneficiaryDetails] = useState([]);
  const [updateExistingNomineeData, setUpdateExistingNomineeData] = useState([]);
  const [beneficiaryDetailsData, setBeneficiaryDetailsData] = useState([]);
   // { id: 1, NomineePANNumber: '', PANValidationResult: '', NomineeMobile: '', NameonPAN: '', address: '', NomineeEmail: '' },]);
  const [beneficiaryBankData, setBeneficiaryBankData] = useState([]);
  // { id: 1, IFSC: '', BankName: '', BranchName: '', AccountNumber: '', ReAccountNumber: '', AccountHolderName: '',InitiatePennyDrop: "",NameasperPennyDrop:"",NameMatch: "" },]);
  const [consolidatedBeneficiaryList, setConsolidatedBeneficiaryList] = useState([]);
  const [updateNomineeData, setUpdateNomineeData] = useState([]);
  const [updateAppointeeData, setUpdateAppointeeData] = useState([
    {id:1, AppointeeDOB_New: null, RealtionshipWithPolicyowner_New: null, Share_New: 100, Role_New:"appointee",isMinor:false, AppointeeLastName_New: "", AppointeeFirstName_New: ""},
  ]);
  const claimsAgainstLU = [
    { label: 'Life Assured', value: '1' },
  ]
  const openRequerimentsList = [
    { srNo: 1, requirementsName: "Treating Doctor's Certificate" },
    { srNo: 2, requirementsName: "Hospital Certificate" },
    { srNo: 3, requirementsName: "Past Medical Records" },
    { srNo: 4, requirementsName: "Copy of Nominee KYC" },
  ]
 
const [activeTabKey, setActiveTabKey] = useState("1");

const handleTabChange = (key) => {
  setActiveTabKey(key);
  if(key === "1"){
    getClaimsPrimaryAssessmentEnquiry();
  }
  if(key === "2"){
    nomineeform.setFieldsValue({
        IsPolicyAssigned: details?.policyDetailsObj?.assigneeDetails?.isPolicyAssigned === "N" ? "no" : "yes",
        AssigneeName: details?.policyDetailsObj?.assigneeDetails?.assigneeName
      })
      if(details?.policyDetailsObj?.assigneeDetails?.isPolicyAssigned === "N"){
        ClaimsData[selectedSubType]?.BeneficiaryDetails_Policy_Details?.forEach((element) => {
          if (element?.name === "AssigneeName") {
            element.hide = true;
            setUpdateFields(!updateFields);
          }
        });
      }else if(details?.policyDetailsObj?.assigneeDetails?.isPolicyAssigned !== "N"){
        ClaimsData[selectedSubType]?.BeneficiaryDetails_Policy_Details?.forEach((element) => {
          if (element?.name === "AssigneeName") {
            element.hide = false;
            setUpdateFields(!updateFields);
          }
        });
      }
  }
};
const formatDate = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  if (isNaN(date)) return '';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth is 0-indexed
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};



useEffect(() => {
  if (!selectedSubType || !ClaimsData[selectedSubType]) return;

  if (
    selectedSubType === "claimsrequest" &&
    !customerData?.isClaimsNotification &&
    !customerData?.isClaimsPrimaryAssesment &&
    !customerData?.isClaimsAssessmentChecker &&
    !customerData?.isClaimsApproverUser
  ) {
    getNomineeEnquiry();
    getRelationsData();
    getClaimsPrimaryAssessmentEnquiry();
  }
  if(selectedSubType === "claimsquery"){
    getClaimsPrimaryAssessmentEnquiry();
    form.setFieldsValue({
      // Typeofclaimlogged : 'Death',
      // ClaimsStatus : 'Pending',
      // ClaimDecision : 'WIP',
      // DecisionDetails : 'Others- Requirement pending with claimant',
      // ClaimDecisionDate : 'NA',
      // ClaimAmount : '12,000.00',
      // LastRequirementSubmissionDate : 'NA'
    });
  }

  if (selectedSubType === "claimsrequest") {
    // const existingFields = ClaimsData[selectedSubType].ClaimsRequest_Details || [];
  const planCode = props?.details?.policyDetailsObj?.planAndStatus?.planCode;
if(planCode==="E73"||planCode==="E74"||planCode==="E75"||planCode==="E41"||planCode==="E43"||planCode==="E44"||planCode==="E60"||planCode==="E61"||planCode==="E62"){
 ClaimsData[selectedSubType]?.ClaimsRequest_Details?.forEach(element => {
    if (element?.name === "requestchannel"||element?.name ==="claimspayout"||element?.name ==="PayoutValue") {
        element.hide = false;
    }
});
}
  }
}, [selectedSubType]);
useEffect(()=>{
  if(selectedSubType==="claimsrequest" && !customerData?.isClaimsNotification&&!customerData?.isClaimsPrimaryAssesment&&!customerData?.isClaimsAssessmentChecker&&!customerData?.isClaimsApproverUser){
    getNomineeEnquiry();
    getRelationsData();
    getClaimsPrimaryAssessmentEnquiry();
  }
  if(selectedSubType === "claimsquery"){
    getClaimsPrimaryAssessmentEnquiry();
    form.setFieldsValue({
      // Typeofclaimlogged : 'Death',
      // ClaimsStatus : 'Pending',
      // ClaimDecision : 'WIP',
      // DecisionDetails : 'Others- Requirement pending with claimant',
      // ClaimDecisionDate : 'NA',
      // ClaimAmount : '12,000.00',
      // LastRequirementSubmissionDate : 'NA'
    })
  }
},[])

const handleAddRow = (isMinor, role, fullname) => {
    const newId = beneficiaryDetailsData?.length + 1;
    const newRow = { id: newId, NomineePANNumber:"", PANValidationResult: "", NomineeMobile: null, NameonPAN: 0, address_1: null, address_2: null, city: null, state: null, pincode: null, NomineeEmail: "", FullName: fullname, IsMinor: isMinor, Role: role };
    setBeneficiaryDetailsData([...beneficiaryDetailsData, newRow]);
    console.log("beneficiaryDetailsData", beneficiaryDetailsData);
};
const handleAddRow2 = (isMinor, fullName) => {
    const newId = beneficiaryBankData?.length + 1;
    const newRow = { id: newId, IFSC: '', BankName: '', BranchName: '', AccountNumber: '', ReAccountNumber: '', AccountHolderName: '',InitiatePennyDrop: "",NameasperPennyDrop:"",NameMatch: "", FullName: fullName, IsMinor: isMinor };
    setBeneficiaryBankData([...beneficiaryBankData, newRow]);
    console.log("beneficiaryBankData", beneficiaryBankData);
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
   
  const convertDate1 = (inputDate) => {
    if (inputDate) {
      const formattedDate = moment(inputDate, "YYYYMMDD").format("MM/DD/YYYY");
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
  if (item?.toLowerCase() === "dateofdeath") {
    let newDate = convertDate1(details?.policyDetailsObj?.saDetails?.rcd); // RCD Date
   // let selectedDate = moment(date).format("MM/DD/YYYY"); // Selected Date of Death
   let selectedDate = moment(date + 1).format("MM/DD/YYYY");
   // let customerSignDate = moment(newDate + 1).format("MM/DD/YYYY"); 
    let dateDifference = date_diff_indays(newDate, selectedDate);

    if (dateDifference < 0) {
      message.destroy();
      message.error({
        content: "Date of Death cannot be before the RCD.",
        className: "custom-msg",
        duration: 3,
      });
      form.setFieldsValue({
        DateofDeath: "", 
      });
      return;
    }
    setDateOfDeath(date); 
  }
  else if (item?.toLowerCase() === "dateofintimation") {
    if (date && dateOfDeath) {
      const intimationDate = new Date(date);
      const deathDate = new Date(dateOfDeath);

      const differenceInMonths =
        (intimationDate.getFullYear() - deathDate.getFullYear()) * 12 +
        intimationDate.getMonth() - deathDate.getMonth();

      ClaimsData[selectedSubType]?.ClaimsRequest_Details?.forEach((element) => {
        if (element?.label?.includes("Reason for Late Intimation(If any)")) {
          element.hide = differenceInMonths > 0 ? false : true;
          setUpdateFields(!updateFields);
        }
      });
    }
  }
};


  const handleSubmit = (values) => {debugger;
    if(selectedSubType==="claimsrequest" && ["1", "2", "3"].includes(activeTabKey)){
      // if(activeTabKey==="1") setClaimDetailsData(values);
      if(activeTabKey==="1") {
        setClaimDetailsData(prev => ({ ...prev, ...values }));
        existingNominee();
      }
      // if(activeTabKey==="2") {
      //   addNominee();
      // }
      return handleClaimDetailsTabSave();
    }
    setIsLoading(true);
    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: loginInfo?.userProfileInfo?.profileObj?.role || 0, // Required
      RequestChannel: loginInfo?.userProfileInfo?.profileObj?.role === 14 ? 13 :  values.requestchannel,  // Required
      Category:  selectedSubType === "claimsrequest" ? 2 : 1,
      ApplicationNo:
        details?.policyDetailsObj?.identifiers?.applicationNo || customerData?.applicationNo,
      DOB: convertDate(customerData?.dob),
      PolicyNo: details?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo, // Required
      CustomerId: customerData?.laClientID,
      "CustRole": values?.custRole,
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
    if (props?.EmailResponse?.IsEmailmanagent) {
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
            setAlertTitle(val?.data?.header);
            setAlertData(val?.data?.message);
            setShowAlert(true);
            setIsLoading(false);
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
    if (item?.linkValue?.toLowerCase() === "view") {
        const gConfig= apiCalls.getGenericConfig()
          if(gConfig?.data?.dmsApiUrl){
      const url =  gConfig?.data?.dmsApiUrl + `/omnidocs/WebApiRequestRedirection?Application=BPMPOLENQ&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${details?.policyDetailsObj?.identifiers?.applicationNo}`;
      window.open(url, '_blank');
          }
    }
  }
   const handleDropdownChange = (e, item) => {
  // const handleDropdownChange = (value, option, item) => {
    if (item.name === "claimType") {
      setClaimTypee((prevClaimTypee) => e);
     // setClaimTypee(value);
    }
    else if(item.name === "ClaimIntimatedBy")
    {
       setClaimIntimatedBy((prevClaimTypee) => e);
      //setClaimIntimatedBy(value);
    }
    else if(item.name?.toLowerCase() === "natureofdeath"){
      setIsAccidentSelection(e);
    
const selectedDecision = natureOfDeathLU?.find(x => Number(x.mstID) === Number(e));
          const natureofdeath = selectedDecision?.mstDesc || String(e);
         
          form.setFieldsValue({ natureOfDeathText: natureofdeath });
   
      
    }

        else if(item.name?.toLowerCase() === "sourceofintimation") {
    const selectedDecision = sourceInformationLU?.find(x => Number(x.mstID) === Number(e));
          const sourceofintimation = selectedDecision?.mstDesc || String(e);
         
          form.setFieldsValue({ sourceOfIntimationText: sourceofintimation });
     
    }
    // end Added by imran 7 Nov2025

    };

  const visibilityRules = {
    NameofiIntimatingPerson: (context) => context.claimIntimatedBy !== "nominee",
    NameChangeAffidavit: (context) => context.isPennyDropStatus,
    NomineeDeathCertificate: (context) => context.isBeneficiaryChangeRequired,
    CopyofFirstInformationReport: (context) => [2,3,4].includes(context.isAccidentSelection),
    CopyofPostMortemReport: (context) => [2,3,4].includes(context.isAccidentSelection),
    NatureofDeath: (context) => context.ClaimTypee !== "CI"&& context.ClaimTypee  !== "TPD"&& context.ClaimTypee  !== "Health",
    DateofDeath: (context) => context.ClaimTypee !== "CI"&& context.ClaimTypee  !== "TPD"&& context.ClaimTypee  !== "Health",
    CauseofEvent: (context) => context.ClaimTypee === "CI" || context.ClaimTypee  === "TPD",
    DateofEvent: (context) => context.ClaimTypee === "CI" || context.ClaimTypee  === "TPD"||context.ClaimTypee  === "Health",
    typeofcondition:(context) => context.ClaimTypee === "Health" ,
};

const handleTitleCheckBox = (e, item) => {
  setCheckedValue(item.name);
  setIsChecked(!isChecked);
}

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
                if(field?.name === 'ClaimAmount'){
                  field = { ...field, value: claimAmount }
                }
                return field; 
            })}
            subType={selectedSubType}
            requestModeLU={requestModeLU}
            suffix={!isShowPOSScreen && suffix}
            form ={selectedSubType === "claimsrequest" ? formMapping[activeTabKey] || form : form}
            getUploadFiles={getUploadFiles}
            handleTextLink={handleTextLink}
            clientRoleLU={ ClaimTypee === "WOP" ? clientRoleLU : claimsAgainstLU}
            onBlurInput={onBlurInput}
            handleDropdownChange={handleDropdownChange}
            handleDateChange={handleDateChange}
            featuredatedisabled={featuredatedisabled}
            disabledDate={disabledDate}
            causeOfEventLU={causeOfEventLU}
            natureOfDeathLU={natureOfDeathLU}
            ClaimTypee={ClaimTypee}
            sourceInformationLU={sourceInformationLU}
            handleTitleCheckBox={handleTitleCheckBox}
            isChecked={isChecked}
            handleLabelLink ={handleLabel}
        ></DetailsForm>
    );
};

const handleLabel =()=>{}

const handleStatusAliveChange = (index, value) => {debugger;
  setIsLoading(true);
  const beneficiaryList = [];
  const updated = [...statusAliveValues];
  updated[index] = value;
  setStatusAliveValues(updated);
  if(value===false)
  {
    setBeneficiaryBankData(prev =>
      (prev || []).filter((_, idx) => idx !== index));
    setBeneficiaryDetailsData(prev =>
      (prev || []).filter((_, idx) => idx !== index));
    setBeneficiaryDetails(prev =>
      (prev || []).filter((_, idx) => idx !== index));
  }

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
  console.log("beneficiaryDetails before IsAlive change",beneficiaryDetails);
  
  // If nominee is marked alive again, remove their "New" rows
  // if (value === true) {
  //   setBeneficiaryDetails(prev =>
  //     (prev || []).filter((row, idx) => {
  //       // keep all rows except "New" rows tied to this index
  //       if (row.Status === "New" && idx === index) {
  //         return false;
  //       }
  //       return true;
  //     })
  //   );
    
  //   //handleDeleteNominee(index, 'nominee', '')
  //   setUpdateNomineeData(prev =>
  //     (prev || []).filter((row, idx) => !(row.Status === "New" && idx === index))
  //   );
  // }

  
  if(anyNo===false){
    
    setUpdateNomineeData([]);
    setBeneficiaryDetails((prev) => (prev || []).filter((r) => !(r.Status === "New")));
    //setUpdateNomineeData((prev) => prev.filter((r) => r.Status == "New"));
    //setBeneficiaryDetails((prev) => prev.filter((r) => r.Status == "New"));
    console.log("beneficiaryDetails after IsAlive change",beneficiaryDetails);
  }
  setIsLoading(false);
};

const handleAddNominee = () => {
  setUpdateNomineeData((prev) => [
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
      ? getAge(row.NomineeDOB_Old) < 18
      : false;

    beneficiaryList.push({
      id: index + 1,
      FullName: fullName,
      FirstName: row.NomineeFirstName_Old,
      LastName: row.NomineeLastName_Old,
      DOB: row.NomineeDOB_Old,
      Role: row.Role_Old,
      Relationship: row.RealtionshipWithPolicyowner_Old,
      SharePercent: row.Share_Old,
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
    handleAddRow(isMinor, row.Role_Old, fullName); // Add empty beneficiary details row
    handleAddRow2(isMinor, fullName); // Add empty bank details row
  });
  setBeneficiaryDetails(beneficiaryList);
  setBeneficiaryBankData(beneficiaryList);
  setUpdateExistingNomineeData(beneficiaryList);
  setBeneficiaryDetailsData(beneficiaryList);
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

  if(beneficiaryDetails?.length > 0){
    const lastIndex = beneficiaryDetails.length - 1;
    const nextIndex = lastIndex + 1;
    beneficiaryDetails.forEach((item, index) => 
      { 
        if (item.StatusAlive === true) { 
          row.id=nextIndex;
        } 
      });
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
    SharePercent: row.Share_New,
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
  handleAddRow(isMinor, row.Role_New, fullName);
  handleAddRow2(isMinor, fullName);

  setIsLoading(false);
  message.success("Nominee added successfully!");
};

 const getAge = (dob) => {
  if (!dob) return null;
  
 // Handle string input in DD/MM/YYYY format
 if (typeof dob === 'string') {
   dob = moment(dob, 'DD/MM/YYYY').toDate();
 }
  
  const birth = new Date(dob);
 if (isNaN(birth)) return null; // Return null if invalid date
  
  const diff = Date.now() - birth.getTime();
  const ageDt = new Date(diff);
  return Math.abs(ageDt.getUTCFullYear() - 1970);
};

const getPOSIndividualData =async(value)=>{
  try {
    setIsLoading(true);
 const response = await apiCalls.getPOSIndividualData(value);
 
 if (response?.status === 200) {
  //  setAmountDetails(response?.data);
   let amountVal = response?.data?.serviceRequestTransectionData?.find(x => x.tagName === "claimType");
   let amountVal2 = response?.data?.serviceRequestTransectionData?.find(x => x.tagName === "LastRequirementReceivedDate");
   console.log("amount",amountVal2?.tagValue)
 

  //  form.setFieldsValue({
  //   Typeofclaimlogged:amountVal?.tagValue,
  //   LastRequirementSubmissionDate:amountVal2?.tagValue
  //  })

  //  setTransdata(response.data.serviceRequestTransectionData);
  //  setAmountValue(amountVal[0])
  //  setActionDetailsModal(true);
  //  setIsLoader(false);
 }
 
} catch (err) {
 console.log('error is', err);
//  setIsLoader(false);
}
setIsLoading(false);
}

  const  onBlurInput = async(value,item)=>{
    if(item.name==="ClaimId"){
      const val = await apiCalls.getPOSIndividualData(value);
    form.setFieldsValue({
      Typeofclaimlogged:val?.data?.claimCategory,
      LastRequirementSubmissionDate:val?.data?.lastRequirementSubmissionDate,
      ClaimsStatus:val?.data?.currentStatus,
      ClaimAmount : val?.data?.claimAmount,
      ClaimDecision : val?.data?.claimDecision,
      DecisionDetails : val?.data?.decisionDetails,
      ClaimDecisionDate :"",
      // ClaimDecisionDate : formatDate(val?.data?.closedOn),
     })
    } 
    // const obj = nomineeform.getFieldsValue(value)
    //  if(value?.length >= 4 &&  item.name === 'AccountNumber'){
    //   const lastFourDigits = obj.AccountNumber.slice(-4);
    //   const maskedString = '*'.repeat(obj.AccountNumber.length - 4) + lastFourDigits;
    //   nomineeform.setFieldsValue({AccountNumber: maskedString})
    //  }
  }

  const handleBack = () => {

  }
  const onChange = () => {

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
    // Get the pressed key
    const key = e.key;
    let specialCharacterRegex = '';
  
    if (pattern === 'numbersOnly') {
  
      const inputValue = e.target.value;
      if (inputValue.includes('.')) {
          specialCharacterRegex = /^[0-9]$/; 
      } else {
          specialCharacterRegex = /^[0-9.]$/;
      }
      
       // specialCharacterRegex = /^[0-9]$/;
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
  
    // Check if the pressed key matches the allowed pattern
    if (!specialCharacterRegex.test(key)) {
        e.preventDefault(); // Prevent the key from being entered into the input field
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
                  [row?.id]: {
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
          setIsLoading(false);
        } else {
          setIsLoading(false);
          nomineeform.setFieldsValue({
            beneficiaryDetailsData: {
                [row?.id]: {
                    city: val?.data?.responseBody?.errormessage,
                    state: val?.data?.responseBody?.errormessage
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
    if (selectedSubType === "documentupload") {
      return[
        {
          "Status": "Create",
          "TagName": "AdditionalNoteForCustomer",
          "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",
      },
      {"Status": "Create","TagName": "ClaimId","TagValue": values?.ClaimId||"", },
      {"Status": "Create","TagName": "ClaimsStatus","TagValue": values?.ClaimsStatus||"", },
      {"Status": "Create","TagName": "Typeofclaimlogged","TagValue": values?.Typeofclaimlogged},
      {"Status": "Create","TagName": "ClaimDecision","TagValue": values?.ClaimDecision||"", },
      {"Status": "Create","TagName": "DecisionDetails","TagValue": values?.DecisionDetails||"", },
      {"Status": "Create","TagName": "requestchannel","TagValue": values?.requestchannel||"", },
      ]
    }
    if (selectedSubType === "claimsquery") {
      return[
        {
          "Status": "Create",
          "TagName": "AdditionalNoteForCustomer",
          "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",
      },
      {"Status": "Create","TagName": "ClaimId","TagValue": values?.ClaimId||"", },
      {"Status": "Create","TagName": "ClaimsStatus","TagValue": values?.ClaimsStatus||"", },
      {"Status": "Create","TagName": "Typeofclaimlogged","TagValue": values?.Typeofclaimlogged},
      {"Status": "Create","TagName": "ClaimDecision","TagValue": values?.ClaimDecision||"", },
      {"Status": "Create","TagName": "DecisionDetails","TagValue": values?.DecisionDetails||"", },
      {"Status": "Create","TagName": "ClaimDecisionDate","TagValue": values?.ClaimDecisionDate||"", },
      {"Status": "Create","TagName": "ClaimAmount","TagValue": values?.ClaimAmount||"", },
      {"Status": "Create","TagName": "LastRequirementSubmissionDate","TagValue": values?.LastRequirementSubmissionDate||"", },
      {"Status": "Create","TagName": "requestchannel","TagValue": values?.requestchannel||"", },
      {"Status": "Create","TagName": "RequestorComments","TagValue": values?.RequestorComments||"", }, 
    ]
    }
    if (selectedSubType === "claimsrequest") {
      const baseData = [
        { Status: "Create",
          TagName: "AdditionalNoteForCustomer", 
         TagValue:values ?.AdditionalNoteForCustomer 
        },
        { Status: "Create", TagName: "LAName", TagValue: details?.policyDetailsObj?.identifiers?.la_Name || "" },
        { Status: "Create", TagName: "RCD", TagValue: details?.policyDetailsObj?.saDetails?.rcd || "" },
        { Status: "Create", TagName: "Channel", TagValue: details?.policyDetailsObj?.salesDetails?.channel || "" },
        { Status: "Create", TagName: "InsuredName", TagValue: details?.policyDetailsObj?.identifiers?.la_Name || "" },
        { Status: "Create", TagName: "DeathSumAssured", TagValue: details?.policyDetailsObj?.premiumDetails?.modelPremiumAmount || "" },
       
        { Status: "Create", TagName: "custRole", TagValue: claimDetailsData?.custRole || "" },
        { Status: "Create", TagName: "claimType", TagValue: claimDetailsData?.claimType || "" },
        { Status: "Create", TagName: "typeofcondition", TagValue: claimDetailsData?.typeofcondition || "" },
        { Status: "Create", TagName: "NatureofDeath", TagValue: claimDetailsData?.NatureofDeath || "" },
        // Start Added by imran 7 Nov2025
        { Status: "Create", TagName: "NatureofDeathText", TagValue: form.getFieldValue("natureOfDeathText") || "" },
        // End Added by imran 7 Nov2025
        { Status: "Create", TagName: "DateofDeath", TagValue: claimDetailsData?.DateofDeath ? moment(claimDetailsData?.DateofDeath +1).format("DD/MM/YYYY"): "" },
        { Status: "Create", TagName: "DateofEvent", TagValue: claimDetailsData?.DateofEvent ? moment(claimDetailsData?.DateofEvent +1).format("DD/MM/YYYY"): "" },
        { Status: "Create", TagName: "DateofIntimation", TagValue: claimDetailsData?.DateofIntimation ? moment(claimDetailsData?.DateofIntimation +1).format("DD/MM/YYYY"): "" },
        { Status: "Create", TagName: "SourceofIntimation", TagValue: claimDetailsData?.SourceofIntimation || "" },
        { Status: "Create", TagName: "SourceofIntimationText", TagValue: form.getFieldValue("sourceOfIntimationText") || "" },
        { Status: "Create", TagName: "ClaimIntimatedBy", TagValue: claimDetailsData?.ClaimIntimatedBy || "" },
        { Status: "Create", TagName: "NameofiIntimatingPerson", TagValue: claimDetailsData?.NameofiIntimatingPerson || "" },
        { Status: "Create", TagName: "PersonsRelationship", TagValue: claimDetailsData?.PersonsRelationship || "" },
        { Status: "Create", TagName: "IntimatingMobileNumber", TagValue: claimDetailsData?.IntimatingMobileNumber || "" },
        { Status: "Create", TagName: "ReasonForLateIntimation", TagValue: claimDetailsData?.ReasonForLateIntimation || "" },
        { Status: "Create", TagName: "AssuredIncomePlan", TagValue: claimDetailsData?.AssuredIncomePlan || "" },
        { Status: "Create", TagName: "Comments", TagValue: values?.Remarks || "" },
        { Status: "Create", TagName: "Remarks", TagValue: values?.Remarks || "" },
        { Status: "Create", TagName: "isBeneficiaryChangeRequired", TagValue: isBeneficiaryChangeRequired ||"" },
        { Status: "Create", TagName: "requestchannel", TagValue: claimDetailsData?.requestchannel || values?.requestchannel  },
        { Status: "Create", TagName: "claimspayout", TagValue: claimDetailsData?.claimspayout || "" },
      ];
  
      const clientData = [
        {
          Status: "Create",
          TagName: "Client_Id",
          TagValue: values?.GSTINToBeUpdateFor === "1" ? customerData?.laClientID : customerData?.poClientID,
        },
        // { Status: "Create", TagName: "DocLink", TagValue: isDocLink },
        // { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink },
        // { Status: "Create", TagName: "ProcessFileType", TagValue: "PROCESSENQUIRY" },
      ];
  
      const nomineePropertiesOld = [
        "NomineeFirstName_Old",
        "NomineeLastName_Old",
        "NomineeDOB_Old",
        "Share_Old",
        "RealtionshipWithPolicyowner_Old",
        "Role_Old",
        "IsAlive",
        "Status"
      ];
  
      const nomineePropertiesNew = [
        "NomineeFirstName_New",
        "NomineeLastName_New",
        "NomineeDOB_New",
        "Share_New",
        "RealtionshipWithPolicyowner_New",
        "Role_New",
        "Status",
        //"IsAlive"
      ];
  
      const nomineeProperties = [
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
        "FullName",
      ];
  
      const bankProperties = [
        "IFSC",
        "BankName",
        "BranchName",
        "AccountNumber",
        "ReAccountNumber",
        "AccountHolderName",
        "InitiatePennyDrop",
        "NameasperPennyDrop",
        "NameMatch",
        "NomineePANNumber",
      ];
  
      const oldNomineeData = existingNomineeData?.flatMap((record, index) =>
        nomineePropertiesOld.map(property => ({
          Status: "Create",
          TagName: `${property}_${index + 1}`,
          TagValue: record[property],
        }))
      );
  
      const updatedNomineeData = beneficiaryDetailsData?.flatMap((record, index) =>
        nomineeProperties.map(property => ({
          Status: "Create",
          TagName: `${property}_${index + 1}`,
          TagValue: record[property] || "",
        }))
      );
  
      let nomineeUpdateList = [];
      if (isBeneficiaryChangeRequired) {
        nomineeUpdateList = updateNomineeData?.flatMap((record, index) =>
          nomineePropertiesNew.map(property => ({
            Status: "Create",
            TagName: `${property}_${index + 1}`,
            TagValue: property.includes("NomineeDOB_New")
                    ? moment(record[property], ["YYYY-MM-DD", "DD/MM/YYYY"]).format("DD/MM/YYYY")
                     : record[property] || "",
          }))
        );
      }
  
      const updatedBankData = beneficiaryBankData?.flatMap((record, index) =>
        bankProperties.map(property => ({
          Status: "Create",
          TagName: `${property}_${index + 1}`,
          TagValue: record[property] || "",
        }))
      );
  
      const dataList = [
        ...baseData,
        ...clientData,
        ...(oldNomineeData || []),
        ...(updatedNomineeData || []),
        ...(nomineeUpdateList || []),
        ...(updatedBankData || []),
      ];
  
      return dataList;
    }
  
    return []; // Return an empty array if selectedSubType is not "claimsrequest"
  };
  

  // const getTransactionData = (values) => {  //coment by 02-02-2024
  //   if (selectedSubType === "claimsrequest" && activeTabKey === "1") {
  //     return [
  //       { Status: "Create", TagName: "custRole", TagValue: values?.custRole || ""},
  //       { Status: "Create", TagName: "claimType", TagValue: values?.claimType || ""},
  //       { Status: "Create", TagName: "NatureofDeath", TagValue: values?.NatureofDeath || ""},
  //       { Status: "Create", TagName: "DateofDeath", TagValue: values?.DateofDeath || ""},
  //       { Status: "Create", TagName: "SourceofIntimation", TagValue: values?.SourceofIntimation || ""},
  //       { Status: "Create", TagName: "ClaimIntimatedBy", TagValue: values?.ClaimIntimatedBy || ""},
  //       { Status: "Create", TagName: "NameofiIntimatingPerson", TagValue: values?.NameofiIntimatingPerson || ""},
  //       { Status: "Create", TagName: "PersonsRelationship", TagValue: values?.PersonsRelationship || ""},
  //       { Status: "Create", TagName: "IntimatingMobileNumber", TagValue: values?.IntimatingMobileNumber || ""},
  //       { Status: "Create", TagName: "ReasonForLateIntimation", TagValue: values?.ReasonForLateIntimation || ""},
  //       { Status: "Create", TagName: "AssuredIncomePlan", TagValue: values?.AssuredIncomePlan || ""},
  //       { Status: "Create", TagName: "Comments", TagValue: values?.Comments || ""},

  //     ]
  //   }
  //   else if (selectedSubType === "claimsrequest" && activeTabKey === "2") {
  //     let newArray =
  //     [
  //       { Status: "Create", TagName: "Comments", TagValue: values?.Comments || ""},
  //       {Status: "Create",TagName: "Client_Id","TagValue":  values?.GSTINToBeUpdateFor === "1" ? customerData?.laClientID: customerData?.poClientID},
  //       // { Status: "Create", TagName: "DocLink", TagValue:isDocLink },
  //       // { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink},
  //      // { Status: "Create", TagName: "ProcessFileType", TagValue:"PROCESSENQUIRY" }
  //     ];
  //     let ExistingDataList = [];
  //     if(existingNomineeData?.length>0){
  //       const oldProperties = [
  //         "NomineeFirstName_Old",
  //         "NomineeLastName_Old",
  //         "NomineeDOB_Old",
  //         "Share_Old",
  //         "RealtionshipWithPolicyowner_Old",
  //         "Role_Old"
  //       ];
  //       // Iterate over each record in the beneficiaryDetailsData array
  //       existingNomineeData?.forEach((record, recordIndex) => {
  //         // Iterate over properties and create objects for each record
  //         oldProperties.forEach((property, propertyIndex) => {
  //           if (record[property]) {
  //             let obj = {
  //               Status: "Create",
  //               TagName: `${property}_${recordIndex + 1}`,
  //               TagValue: record[property]
  //             };
        
  //             ExistingDataList.push(obj);
  //           }
  //         });
  //       });
  //     }
  //     const properties = [
  //       "NomineePANNumber",
  //       "PANValidationResult",
  //       "NomineeMobile",
  //       "NameonPAN",
  //       "address",
  //       "NomineeEmail",
  //     ];
      
  //     // Initialize an array to store the updated data
  //     let updatedDataList = [];
  //     // Iterate over each record in the beneficiaryDetailsData array
  //     beneficiaryDetailsData?.forEach((record, recordIndex) => {
  //       // Iterate over properties and create objects for each record
  //       properties.forEach((property, propertyIndex) => {
  //         if (record[property] || record[property] == 0) {
  //           let obj = {
  //             Status: "Create",
  //             TagName: `${property}_${recordIndex + 1}`,
  //             TagValue: record[property]
  //           };
      
  //           updatedDataList.push(obj);
  //         }
  //       });
  //     });
  //     const nomineeproperties = [
  //       "NomineeFirstName_New",
  //         "NomineeLastName_New",
  //         "NomineeDOB_New",
  //         "Share_New",
  //         "RealtionshipWithPolicyowner_New",
  //         "Role_New",
  //     ];

  //     if(isBeneficiaryChangeRequired){
  //     // Initialize an array to store the updated data
  //     let nomineeUpdateList = [];
  //     // Iterate over each record in the beneficiaryDetailsData array
  //     updateNomineeData?.forEach((record, recordIndex) => {
  //       // Iterate over properties and create objects for each record
  //       nomineeproperties.forEach((property, propertyIndex) => {
  //         if (record[property] || record[property] == 0) {
  //           let obj = {
  //             Status: "Create",
  //             TagName: `${property}_${recordIndex + 1}`,
  //             TagValue: property?.includes("NomineeDOB_New") ? moment(record[property] + 1).format("DD/MM/YYYY") : record[property]
  //           };
      
  //           nomineeUpdateList.push(obj);
  //         }
  //       });
  //     });
  //     // Use the spread operator to concatenate the newArray to the updatedDataList
  //     updatedDataList = [...nomineeUpdateList, ...updatedDataList, ...ExistingDataList,...newArray];
  //   }else{
  //     updatedDataList = [...updatedDataList, ...ExistingDataList,...newArray];
  //   }
  //     // Now updatedDataList contains separate objects for each property in each record
  //     return updatedDataList;
  //   }
  //   else if (selectedSubType === "claimsrequest" && activeTabKey === "3") {
  //     let newArray =
  //     [
  //       { Status: "Create", TagName: "Comments", TagValue: values?.Comments || ""},
  //       {Status: "Create",TagName: "Client_Id","TagValue":  values?.GSTINToBeUpdateFor === "1" ? customerData?.laClientID: customerData?.poClientID},
  //       // { Status: "Create", TagName: "DocLink", TagValue:isDocLink },
  //       // { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink},
  //      // { Status: "Create", TagName: "ProcessFileType", TagValue:"PROCESSENQUIRY" }
  //     ];
  //     const properties = [
  //       "IFSC",
  //       "BankName",
  //       "BranchName",
  //       "AccountNumber",
  //       "ReAccountNumber",
  //       "AccountHolderName",
  //       "InitiatePennyDrop",
  //       "NameasperPennyDrop",
  //       "NameMatch"
  //     ];
      
  //     // Initialize an array to store the updated data
  //     let updatedDataList = [];
  //     // Iterate over each record in the beneficiaryDetailsData array
  //     beneficiaryBankData?.forEach((record, recordIndex) => {
  //       // Iterate over properties and create objects for each record
  //       properties.forEach((property, propertyIndex) => {
  //         if (record[property] || record[property] == 0) {
  //           let obj = {
  //             Status: "Create",
  //             TagName: `${property}_${recordIndex + 1}`,
  //             TagValue: record[property]
  //           };
  //           updatedDataList.push(obj);
  //         }
  //       });
  //     });
   
  //     updatedDataList = [...updatedDataList, ...newArray];
  //     // Now updatedDataList contains separate objects for each property in each record
  //     return updatedDataList;
  //   }
  //   else if (selectedSubType === "claimsrequest" && activeTabKey === "4") {
  //     return [
  //       { Status: "Create", TagName: "Remarks", TagValue: values?.Remarks || ""},
  //     ]
  //   }
  // };

  const handleAccNumberChange = (index, field,value) => {
    const updatedData = [...beneficiaryDetailsData];
    updatedData[index][field] = value;
    setBeneficiaryDetailsData(updatedData);
    if (field === 'NomineePANNumber') {
        const updatedBankData = [...beneficiaryBankData];
        if (updatedBankData[index]) {
            updatedBankData[index].NomineePANNumber = value;
            setBeneficiaryBankData(updatedBankData);
        }
    }
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

  const handleRadioChange =(e)=>{

  }

  const getIFSCBankDetails =async(ifscCode,row,index)=>{
    setIsLoading(true);
    let response = await apiCalls.getIFSCBanks(ifscCode);
    // if (response.statusText) {
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
        // }
  }
  const handleBackClick = () => {
  if (ClaimTypee === "CI" || ClaimTypee === "TPD") {
    let previousTabKey;
    if (activeTabKey === "4") {
      previousTabKey = "3";
    } else if (activeTabKey === "3") {
      previousTabKey = "1";
    } else {
      return;
    }
    setActiveTabKey(previousTabKey);
    handleTabChange(previousTabKey);
  } else {
    // Convert activeTabKey to a number, subtract 1, and convert it back to a string
    const previousTabKey = (parseInt(activeTabKey, 10) - 1).toString();
  
    // Check if the previous tab key is valid (i.e., greater than or equal to 1)
    if (parseInt(previousTabKey, 10) >= 1) {
      setActiveTabKey(previousTabKey);
      handleTabChange(previousTabKey);
    }
  }
};
  // const handleBackClick = () => {
  //   // Convert activeTabKey to a number, subtract 1, and convert it back to a string
  //   const previousTabKey = (parseInt(activeTabKey, 10) - 1).toString();
  
  //   // Check if the previous tab key is valid (i.e., greater than or equal to 1)
  //   if (parseInt(previousTabKey, 10) >= 1) {
  //     setActiveTabKey(previousTabKey);
  //   }
  // };

  const InitiatePennyDropp = (row,index) => {
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
                  InitiatePennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  "Success" : "Failed",
                  NameasperPennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName : "Failed",
                  // InitiatePennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.bankResponse,
                  // NameasperPennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName,
                },
            },
        });
          const updatedbeneficiaryobj = [...beneficiaryBankData];
          updatedbeneficiaryobj[index].InitiatePennyDrop =  result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  "Success" : "Failed",
          updatedbeneficiaryobj[index].NameasperPennyDrop =  result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName : "Failed",
          setBeneficiaryBankData(updatedbeneficiaryobj);
        setIsPennyDropStatus(false);
         }else{
          nomineebankform.setFieldsValue({
            beneficiaryBankData: {
                [row?.id]: {
                  InitiatePennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  "Success" : "Failed",
                  NameasperPennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName : "Failed",
                },
            },
        });
          const updatedbeneficiaryobj = [...beneficiaryBankData];
          updatedbeneficiaryobj[index].InitiatePennyDrop =  result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  "Success" : "Failed",
          updatedbeneficiaryobj[index].NameasperPennyDrop =  result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName : "Failed",
          setBeneficiaryBankData(updatedbeneficiaryobj);
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
    
    const updatedData = [...updateNomineeData];
    updatedData[index].NomineeFirstName_New = value;
    setUpdateNomineeData(updatedData);
  };
  
  const handleNomineeLastNameChange = (index, value) => {
      
    const updatedData = [...updateNomineeData];
    updatedData[index].NomineeLastName_New = value;
    setUpdateNomineeData(updatedData);
  };

  const handleDobChange = (date, dateString, index) => {
    const updatedNomineeData = [...updateNomineeData];
    //  form.setFieldValue(["updateNomineeData", index], {
    //     ...row,
    //     NomineeDOB_New: dateString
    // });
     updatedNomineeData[index].NomineeDOB_New = dateString;
    // if(index!==0){
    //   isMinor(updatedNomineeData[index].NomineeDOB_New,updatedNomineeData)
    // }else{
    //setUpdateNomineeData(updatedNomineeData);
    //}
  };

  const handleRelationshipChange = (index, value,row) => {
    const updatedData = [...updateNomineeData];
    updatedData[index].RealtionshipWithPolicyowner_New = value;
    setUpdateNomineeData(updatedData);
  };
  const handleRoleChange = (index, value,row) => {
    const updatedData = [...updateNomineeData];
    updatedData[index].Role_New = value;
    setUpdateNomineeData(updatedData);
  };
  const handleShareChange = (index, newShare) => {
    const updatedNomineeData = [...updateNomineeData];
    updatedNomineeData[index].Share_New = newShare;
    
    // Recalculate the total share
    // const newTotalShare = updatedNomineeData.reduce((sum, nominee) =>
    //  sum + parseFloat(nominee.Share_New) || 0, 0);
    // setTotalShare(newTotalShare);

    // Update the state
    setUpdateNomineeData(updatedNomineeData);
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
  if (ClaimTypee === "CI" || ClaimTypee === "TPD") {
    let nextTabKey;

    if (activeTabKey === "1") {
      nextTabKey = "3"; // Skip 2, go to 3
    } else if (activeTabKey === "3") {
      nextTabKey = "4"; // Go to 4
    } else {
      return; // No change or already at last tab
    }

    setActiveTabKey(nextTabKey);
    handleTabChange(nextTabKey);
  } else {
    const nextTabKey = (parseInt(activeTabKey, 10) + 1).toString();
    if (parseInt(nextTabKey, 10) <= 4) {
      setActiveTabKey(nextTabKey);
      if(nextTabKey === "2") handleTabChange(nextTabKey);
    }
  }
};
  // const handleClaimDetailsTabSave = () => {
  //   const nextTabKey = (parseInt(activeTabKey, 10) + 1).toString();
  //   if (parseInt(nextTabKey, 10) <= 4) {
  //     setActiveTabKey(nextTabKey);
  //     if(nextTabKey === "2") handleTabChange(nextTabKey);
  //   }
    
  // };

  const getClaimsPrimaryAssessmentEnquiry = async () => {
    try {
      const response = await apiCalls.GetClaimsPrimaryAssessmentEnquiry(loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID, (details?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo));
      if (response?.data?.responseHeader?.errorcode === "0") {
        setIsRiderData(response?.data?.responseBody?.claimsPrimaryAssessmentEnquiry);
        setClaimAmount(response?.data?.responseBody?.dsumins);
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

  const handleShareClaimProcess = (e) => {
    console.log(e.target.checked)
  }


  return (
    <>
      <Spin spinning={isLoading} fullscreen />
     
        {(selectedSubType === "claimsquery" || selectedSubType === "documentupload") && <>

          {/* <Tabs tabPosition="left" type="card">
            <TabPane
              tab={
                <span>
                  Claim Details
                </span>
              }
              key="1"
            > */}

              {(selectedSubType === "claimsquery" || selectedSubType === "documentupload" || selectedSubType === "claimsrequest") &&
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
        onFinish={handleSubmit}
        autoComplete="off"
      >
                  {!isShowPOSScreen && <>
                    {
                      renderDetailsForm(selectedSubType === 'documentupload' ? "BOE_Details" : "ClaimsQuery_Details")
                    }
                    {
                      !isShowPOSScreen && selectedSubType === 'documentupload' && 
                      <UploadDocuments uploadDoc = {uploadDoc} setUploadDoc={setUploadDoc} docList ={docList} setDocList={setDocList} />
                    }&nbsp;
                   {renderDetailsForm("Additionalnoteforcustomer")}
                    {(selectedSubType === "claimsquery" || selectedSubType === "documentupload") &&

                      <div className="contact-details-btn">


                        <Button type="primary" className="primary-btn" htmlType="submit"
                        >
                          {!isShowPOSScreen
                            ? "Submit"
                            : "Approve"}
                        </Button>

                      </div>
                    }
                  </>
                  }
                  {isShowPOSScreen && <>
                    {renderDetailsForm("POS_Details")}
                  </>}
      </Form>


                </>}
            {/* </TabPane> */}

            {/* <TabPane
              tab={
                <span>

                  View Open Requirements
                </span>
              }
              key="2"
            >
              <h5 className="text-center">View Open Requirements</h5>
              <div className="reuirement">
                <table className="responsive-table">
                  <thead>
                    <tr>
                      <th>Sr No</th>
                      <th>List of Open Requirements</th>
                    </tr></thead>
                  <tbody>
                    {openRequerimentsList?.length > 0 && openRequerimentsList?.map((item, ind) => (
                      <tr key={ind + 1}>
                        <td>{ind + 1}</td>

                        <td>{item.requirementsName}</td>
                      </tr>
                    ))}
                    {openRequerimentsList?.length === 0 && (
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
              <div className="text-center mt-24">
                <Button type="primary"
                  style={{
                    margin: '0 8px',
                  }}
                  onClick={() => handleBackClick()}
                >
                  BACK
                </Button>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </div>
            </TabPane>
            <TabPane
              tab={
                <span>
                  Claim Payment Details
                </span>
              }
              key="3"
            >
              <h5 className="text-center">Claim Payment Details</h5>
              <div className="reuirement">
                <table className="responsive-table">
                  <thead>
                    <tr>
                      <th>Policy Number</th>
                      <th>Claim ID</th>
                      <th>Beneficiary Name</th>
                      <th>Bank Account Number</th>
                      <th>Account Holder Name</th>
                      <th>Amount</th>
                      <th>UTR No</th>
                      <th>Refund Date</th>
                    </tr></thead>
                  <tbody>
                    {claimPaymentDetailsData?.length > 0 && claimPaymentDetailsData?.map((item, ind) => (
                      <tr key={ind + 1}>
                        <td>{ind + 1}</td>

                        <td>{item.requirementsName}</td>
                      </tr>
                    ))}
                    {claimPaymentDetailsData?.length === 0 && (
                      <tr>
                        <td colspan="8">
                          <div className="text-center">
                            <span>No data available</span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <p> <a className="hyperLink mt-16" >Click here for payout bifurications</a></p>
              </div>
              <div className="contact-details-btn">
                <Button type="primary" className="primary-btn" onClick={() => handleBackClick()}>
                  Back
                </Button>
                <Button type="primary" className="primary-btn" htmlType="submit">
                  Submit
                </Button>
              </div>
            </TabPane>
            <TabPane
              tab={
                <span>
                  Share Claim Process
                </span>
              }
              key="4"
            >
              <Row>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <Form.Item label="" name="" >
                    <Checkbox onChange={onChange}>Share Claim Process</Checkbox>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <Form.Item label="" name="" >
                    <Checkbox onChange={onChange}>Share Claim Form Link</Checkbox>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <Form.Item label="" name="" >
                    <Checkbox onChange={onChange}>Share Claim TAT Information</Checkbox>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <Form.Item label="" name="" >
                    <Checkbox onChange={onChange}>List of Requirements</Checkbox>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <Form.Item
                    label={
                      <span>
                        Enter Email ID
                      </span>
                    }
                    name="emailID"
                    className="inputs-label mb-0"
                    type="email"
                    rules={[
                      {
                        required: true,
                        message: "Enter Email ID",
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
                      placeholder="Enter Email ID"
                      className="cust-input"
                    />
                  </Form.Item>
                </Col>

              </Row>
              <div className="contact-details-btn">
                <Button type="primary" className="primary-btn" onClick={() => handleBack()}>
                  Back
                </Button>
                <Button type="primary" className="primary-btn" htmlType="submit">
                  Submit
                </Button>
              </div>
            </TabPane> */}

          {/* </Tabs> */}
        </>}

        {(customerData?.isClaimsNotification && selectedSubType === "claimsrequest" )&& <>
           <ClaimsNotificationView propsData={props}></ClaimsNotificationView>
        </>}
        {(customerData?.isClaimsPrimaryAssesment && selectedSubType === "claimsrequest" )&& <>
           <ClaimsPrimaryAssesment propsData={props}></ClaimsPrimaryAssesment>
        </>}
        {(customerData?.isClaimsAssessmentChecker && selectedSubType === "claimsrequest" )&& <>
           <ClaimsAssessmentChecker propsData={props}></ClaimsAssessmentChecker>
        </>}
        {(customerData?.isClaimsApproverUser && selectedSubType === "claimsrequest" )&& <>
           <ClaimsApproverUser propsData={props}></ClaimsApproverUser>
        </>}


        {(selectedSubType === "claimsrequest" &&!customerData?.isClaimsNotification&&!customerData?.isClaimsPrimaryAssesment&&!customerData?.isClaimsAssessmentChecker&&!customerData?.isClaimsApproverUser) && <>
          <Tabs
            tabPosition="left"
            type="card"
            activeKey={activeTabKey}
            onChange={handleTabChange}
          >
            <TabPane
              tab={
                <span>
                  Claim Details
                </span>
              }
              key="1"
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
        onFinish={handleSubmit}
        autoComplete="off"
      >
                  {!isShowPOSScreen && <>
                    {renderDetailsForm("ClaimsRequest_Details")}
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
                          {/* <th>Last Reinstatement Date</th> */}
                          {/* <th>Status on Date of Death</th> */}
                        </tr>
                      </thead>
                      <tbody>
                      {isRiderData?.map((row,index) => (
                          row.sumins > 0 && (
                          <tr  key={index}>
                            <td>{row.longdesc} </td>
                            <td>{row.sumins} </td>
                            <td>{convertDate(details?.policyDetailsObj?.saDetails?.rcd)|| "-"} </td>
                            {/* <td>{row.Role_Old} </td> */}
                          </tr>
                          )
                        ))}
                      
                        {isRiderData?.length === 0 && (
                          <tr>
                            <td colSpan="3">
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

                      <Button type="primary" className="primary-btn" htmlType="submit"
                      >
                        {!isShowPOSScreen
                          ? "Save"
                          : "Approve"}
                      </Button>

                    </div>
                  </>
                  }
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
              key="2"
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
              {renderDetailsForm("BeneficiaryDetails_Policy_Details")}
                   <h4 className="subtype-headings fs-16 fw-500">
                   View Existing Beneficiary Details
                      </h4>{"  "}
                  <div className="table-container email-table">
                    <table className="responsive-table"style={{width:"105%"}}>
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
               {/* <Form.Item label="Is Existing Nominee Alive?">
                    <Radio.Group onChange={e=>setIsBeneficiaryChangeRequired(e.target.value)}>
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </Form.Item> */}
                  {isBeneficiaryChangeRequired && (
                    <div className="mb-16">
                      <h4 className="subtype-headings fs-16 fw-500">
                        Personal Details of New Beneficiary
                      </h4>

                      <div className="table-container email-table">
                        <table className="responsive-table" style={{ width: "106.5%" }}>
                          <thead>
                            <tr>
                              <th>Nominee First Name</th>
                              <th>Nominee Last Name</th>
                              <th>Date of Birth</th>
                              <th>Role</th>
                              <th>Relationship</th>
                              <th>% Share</th>
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
                            {!isShowPOSScreen && (
                                <>
                                    {/* --- NOMINEE ROWS --- */}
                                    {updateNomineeData?.map((row, index) => (
                                        <React.Fragment key={row.id}>
                                            <tr className="nominee-input">
                                              {/* ❗ HIDDEN FIELD — Stores full nominee object (Fixes NULL issue) */}
                                                <Form.Item
                                                    name={["updateNomineeData", index, "_rowData"]}
                                                    initialValue={row}
                                                    hidden
                                                >
                                                    <Input type="hidden" />
                                                </Form.Item>
                                                <td>
                                                    <Form.Item
                                                        name={["updateNomineeData", row.id, "NomineeFirstName_New"]}
                                                        //initialValue={row.NomineeFirstName_New}
                                                        className="inputs-label mb-0"
                                                        rules={[{ required: true, message: "Enter Nominee First Name" }]}
                                                    >
                                                        <Input
                                                            placeholder="Enter Nominee First Name"
                                                            className="cust-input"
                                                            maxLength={100}
                                                            onChange={(e) => handleNomineeFirstNameChange(index, e.target.value)}
                                                        />
                                                    </Form.Item>
                                                </td>
                                                <td>
                                                    <Form.Item
                                                        name={["updateNomineeData", row.id, "NomineeLastName_New"]}
                                                        className="inputs-label mb-0"
                                                        rules={[{ required: true, message: "Enter Nominee Last Name" }]}
                                                        //initialValue={row.NomineeLastName_New}
                                                    >
                                                        <Input
                                                            placeholder="Enter Nominee Last Name"
                                                            className="cust-input"
                                                            maxLength={100}
                                                            onChange={(e) => handleNomineeLastNameChange(index, e.target.value)}
                                                        />
                                                    </Form.Item>
                                                </td>
                                                <td className="date-picker">
                                                    <Form.Item
                                                        name={["updateNomineeData", row.id, "NomineeDOB_New"]}
                                                        className="inputs-label mb-0"
                                                        rules={[{ required: true, message: "Select a DOB" }]}
                                                        //initialValue={row.NomineeDOB_New ? moment(row.NomineeDOB_New) : null}
                                                    >
                                                        <DatePicker
                                                            allowClear={false}
                                                            style={{ width: "100%" }}
                                                            className="cust-input"
                                                            placeholder="Select a DOB"
                                                            format={dateFormat}
                                                            onChange={(date, dateString) => handleDobChange(date, dateString, index)}
                                                        />
                                                    </Form.Item>
                                                </td>
                                                <td>
                                                    <Form.Item
                                                        name={["updateNomineeData", row.id, "Role_New"]}
                                                        className="inputs-label mb-0"
                                                        rules={[
                                                            { required: true, message: "Select a Role" },
                                                            {
                                                              validator: (_, value) => {
                                                                  if (index === 0 && !value) return Promise.resolve();
                                                                  if (index === 0 && value !== "nominee") return Promise.reject('The first record must have "nominee" as the Role');
                                                                  return Promise.resolve();
                                                              },
                                                            },
                                                        ]}
                                                        initialValue={row.Role_New}
                                                    >
                                                        <Select
                                                            className={`inputs-label cust-input select-width`}
                                                            placeholder="Select a Role"
                                                            //disabled={index === 0} // Nominee rows are always "nominee"
                                                            options={[{ value: "nominee", label: "Nominee" },
                                                                      {value: "appointee",label: "Appointee",}]}
                                                            onChange={(value) => handleRoleChange(index, value)}
                                                        />
                                                    </Form.Item>
                                                </td>
                                                <td>
                                                    <Form.Item
                                                        name={["updateNomineeData", row.id, "RealtionshipWithPolicyowner_New"]}
                                                        className="inputs-label mb-0"
                                                        rules={[{ required: true, message: "Select a RelationShip" }]}
                                                        //initialValue={row.RealtionshipWithPolicyowner_New}
                                                    >
                                                        <Select
                                                            className={`inputs-label cust-input select-width`}
                                                            placeholder="Select a RelationShip"
                                                            options={relationShipLU}
                                                            onChange={(value) => handleRelationshipChange(index, value)}
                                                        />
                                                    </Form.Item>
                                                </td>
                                                <td>
                                                    <Form.Item
                                                        name={["updateNomineeData", row.id, "Share_New"]}
                                                        className="inputs-label mb-0"
                                                        rules={[{ required: true, message: "Enter a Share" }]}
                                                        //initialValue={row.Share_New}
                                                    >
                                                        <Input
                                                            className="cust-input"
                                                            placeholder="Enter a Share"
                                                            maxLength={20}
                                                            onChange={(e) => handleShareChange(index, e.target.value)}
                                                            onKeyDown={(e) => handleKeyDown("numbersOnly", e)}
                                                        />
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

                                            {/* --- APPOINTEE ROW (CONDITIONAL) --- */}
                                            {row.isMinor && updateAppointeeData.find(app => app.id === row.appointeeId) && (
                                                <AppointeeRow
                                                    appointee={updateAppointeeData.find(app => app.id === row.appointeeId)}
                                                    form={form}
                                                    relationShipLU={relationShipLU}
                                                    handleDeleteNominee={handleDeleteNominee}
                                                    handleKeyDown={handleKeyDown}
                                                    dateFormat={dateFormat}
                                                />
                                            )}
                                        </React.Fragment>
                                    ))}
                                    
                                    {updateNomineeData?.length === 0 && (
                                        <tr>
                                            <td colSpan="7">
                                                <div className="text-center">
                                                    <span>No nominee data available. Click '+' to add one.</span>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </>
                            )}
                            {/* {!isShowPOSScreen && (
                            <>
                              {updateNomineeData?.map((row, index) => (
                                <tr key={row.id} className="nominee-input">
                                  <td>
                                    <Form.Item
                                      name={[
                                        "updateNomineeData",
                                        row.id,
                                        "NomineeFirstName_New",
                                      ]}
                                      className="inputs-label mb-0"
                                      rules={[
                                        {
                                          required: true,
                                          message:
                                            "Enter Nominee First Name",
                                        },
                                      ]}
                                    >
                                      <Input
                                        placeholder="Enter Nominee First Name"
                                        className="cust-input"
                                        value={row.NomineeFirstName_New}
                                        maxLength={100}
                                        onChange={(e) =>
                                          handleNomineeFirstNameChange(
                                            index,
                                            e.target.value
                                          )
                                        }
                                      />
                                    </Form.Item>
                                  </td>
                                  <td>
                                    <Form.Item
                                      name={[
                                        "updateNomineeData",
                                        row.id,
                                        "NomineeLastName_New",
                                      ]}
                                      className="inputs-label mb-0"
                                      rules={[
                                        {
                                          required: true,
                                          message:
                                            "Enter  Nominee Last Name",
                                        },
                                      ]}
                                    >
                                      <Input
                                        placeholder="Enter Nominee Last Name"
                                        className="cust-input"
                                        value={row.NomineeLastName_New}
                                        maxLength={100}
                                        onChange={(e) =>
                                          handleNomineeLastNameChange(
                                            index,
                                            e.target.value
                                          )
                                        }
                                      />
                                    </Form.Item>
                                  </td>
                                  <td className="date-picker">
                                    <Form.Item
                                      name={[
                                        "updateNomineeData",
                                        row.id,
                                        "NomineeDOB_New",
                                      ]}
                                      className="inputs-label mb-0"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Select a DOB",
                                        },
                                      ]}
                                    >
                                      <DatePicker
                                        allowClear={false}
                                        style={{ width: "100%" }}
                                        className="cust-input"
                                        placeholder="Select a DOB"
                                        format={dateFormat}
                                        value={row.NomineeDOB_New}
                                        // onChange={(e) =>
                                        //   handleDobChange(e, index)
                                        // }
                                      />
                                    </Form.Item>
                                  </td>
                                  <td>
                                    <Form.Item
                                      name={[
                                        "updateNomineeData",
                                        row.id,
                                        "Role_New",
                                      ]}
                                      className="inputs-label mb-0"
                                      rules={[
                                        {
                                          required: index !== 0, // Make it required only if index is not 0
                                          message: "Select a Role",
                                          validator: (_, value) => {
                                            if (index === 0 && !value) {
                                              return Promise.resolve(); // Allow empty value for the first record
                                            }
                                            if (
                                              index === 0 &&
                                              value !== "nominee"
                                            ) {
                                              return Promise.reject(
                                                'The first record must have "nominee" as the Role'
                                              );
                                            }
                                            return Promise.resolve();
                                          },
                                        },
                                      ]}
                                    >
                                      <Select
                                        className={`inputs-label cust-input select-width`}
                                        placeholder="Select a Role"
                                        defaultValue={
                                          index === 0 && row.Role_New
                                        } // Use row.Role_New if available, otherwise default to "nominee"
                                        disabled={index === 0}
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
                                      />
                                    </Form.Item>
                                  </td>
                                  <td>
                                    <Form.Item
                                      name={[
                                        "updateNomineeData",
                                        row.id,
                                        "RealtionshipWithPolicyowner_New",
                                      ]}
                                      className="inputs-label mb-0"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Select a RelationShip",
                                        },
                                      ]}
                                    >
                                      <Select
                                        className={`inputs-label cust-input select-width`}
                                        placeholder="Select a RelationShip"
                                        options={relationShipLU}
                                        value={
                                          row.RealtionshipWithPolicyowner_New
                                        }
                                        onChange={(value) =>
                                          handleRelationshipChange(
                                            index,
                                            value,
                                            row
                                          )
                                        }
                                      />
                                    </Form.Item>
                                  </td>
                                  <td>
                                    <Form.Item
                                      name={[
                                        "updateNomineeData",
                                        row.id,
                                        "Share_New",
                                      ]}
                                      className="inputs-label mb-0"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Enter a Share",
                                        },
                                      ]}
                                    >
                                      <Input
                                        className="cust-input"
                                        value={row.Share_New}
                                        placeholder="Enter a Share"
                                        maxLength={20}
                                        onChange={(e) =>
                                          handleShareChange(
                                            index,
                                            e.target.value,
                                            row
                                          )
                                        }
                                        onKeyDown={(e) =>
                                          handleKeyDown("numbersOnly", e)
                                        }
                                      />
                                    </Form.Item>
                                  </td>

                                  <td>
                                    <i class="bi bi-trash3-fill c-pointer text-color fs-18"
                                     onClick={() => totalNominee()}
                                    ></i>
                                    {index !== 0 && (
                                      <i
                                        class="bi bi-trash3-fill"
                                        onClick={() =>handleDeleteNominee(row.id, row.Role_New)}
                                        style={{
                                          color: "#b3201f",
                                          cursor: "pointer",
                                        }}
                                      ></i>
                                    )}
                                  </td>
                                </tr>
                              ))}
                              {updateNomineeData?.length === 0 && (
                                <tr>
                                  <td colSpan="5">
                                    <div className="text-center">
                                      <span>No data available</span>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </>
                          )} */}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {/* {!isBeneficiaryChangeRequired&&<>
                    <div className="table-container email-table">
                    <table className="responsive-table" style={{width:"106.5%"}}>
                      <thead>
                        <tr>
                          <th> Nominee First Name</th>
                          <th> Nominee Last Name</th>
                          <th>Date of Birth</th>
                          <th>Role</th>
                          <th>Relationship</th>
                          <th>% Share</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(!isShowPOSScreen)&&<>
                      {updateNomineeData.map((row,index) => (
                          <tr key={row.id} className="nominee-input">
<td>
<Form.Item
    name={['updateNomineeData', row.id, 'NomineeFirstName_New']}
    className="inputs-label mb-0"
    rules={[
      {
        required: true,
        message: "Enter Nominee First Name",
      },
    ]}
  >
    <Input
      placeholder="Enter Nominee First Name"
      className="cust-input"
      value={row.NomineeFirstName_New}
      maxLength={100}
      onChange={(e) => handleNomineeFirstNameChange(index, e.target.value)}
    />
  </Form.Item>
  </td>
  <td>
  <Form.Item
    name={['updateNomineeData', row.id, 'NomineeLastName_New']}
    className="inputs-label mb-0"
    rules={[
      {
        required: true,
        message: "Enter  Nominee Last Name",
      },
    ]}
  >
    <Input
      placeholder="Enter Nominee Last Name"
      className="cust-input"
      value={row.NomineeLastName_New}
      maxLength={100}
      onChange={(e) => handleNomineeLastNameChange(index, e.target.value)}
    />
  </Form.Item>
  </td>
                           <td className="date-picker">
                            <Form.Item
    name={['updateNomineeData', row.id, 'NomineeDOB_New']}
    className="inputs-label mb-0"
    rules={[
      {
        required: true,
        message: "Select a DOB",
      },
    ]}
  >
                            <DatePicker
                            allowClear={false}
                    style={{ width: "100%" }}
                    className="cust-input"
                    placeholder="Select a DOB"
                    format={dateFormat}
                    value={row.NomineeDOB_New}
                   // onChange={(e) => handleDobChange(e, index)}
                  />
                  </Form.Item>
                            </td>
                            <td>
                            <Form.Item
  name={['updateNomineeData', row.id, 'Role_New']}
  className="inputs-label mb-0"
  rules={[
    {
      required: index !== 0,  // Make it required only if index is not 0
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
    defaultValue={index === 0&&row.Role_New} // Use row.Role_New if available, otherwise default to "nominee"
    disabled={index === 0}
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
    name={['updateNomineeData', row.id, 'RealtionshipWithPolicyowner_New']}
    className="inputs-label mb-0"
    rules={[
      {
        required: true,
        message: "Select a RelationShip",
      },
    ]}
  >
                            <Select
                               className={`inputs-label cust-input select-width`}
                                placeholder="Select a RelationShip"
                                options={relationShipLU}
                                value={row.RealtionshipWithPolicyowner_New}
                               onChange={(value) => handleRelationshipChange(index, value,row)}
                              />
                              </Form.Item>
                              </td>
                            <td>
                            <Form.Item
    name={['updateNomineeData', row.id, 'Share_New']}
    className="inputs-label mb-0"
    initialValue={100}  // Set the initial value here
    rules={[
      {
        required: true,
        message: "Enter a Share",
      },
    ]}
  >
                            <Input
                  className="cust-input"
                  value={row.Share_New}
                  placeholder="Enter a Share"
                  maxLength={20}
                  onChange={(e) => handleShareChange(index, e.target.value,row)}
                  onKeyDown={(e) => handleKeyDown("numbersOnly",  e)}

                />
                </Form.Item>
                              </td>
                           
                            <td>
                              {index !== 0 &&<>
                              <i
                                class="bi bi-trash3-fill"
                                onClick={() => handleDeleteRow(row.id,index)}
                                style={{ color: "#b3201f", cursor: "pointer" }}
                              ></i>
                              </>}
                            </td>
                          </tr>
                        ))}
                        {updateNomineeData?.length === 0 && (
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
                  </>} */}
                  {
                    isPolicyAssigned?.isPolicyAssigned === "Y" && 
                    <>
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
                    </>
                  }
               </div>
         {!isShowPOSScreen&& <>
                      <div className="d-flex">
                    <h4 className="subtype-headings fs-16 fw-500">
                    Personal Details of Beneficiary
                      </h4>{"  "}
                      {/* <span className="d-flex justify-center" style={{paddingLeft:"10px"}}><i class="bi bi-plus-circle-fill c-pointer text-color fs-18" onClick={() => handleAddRow()}></i>
                      <i class="bi bi-trash3-fill c-pointer text-color fs-18"
                                onClick={() => handleDeleteRow()}
                              ></i>
                      </span> */}
                      </div>
                    </>}
                    {beneficiaryDetails?.filter(row =>
                      (row.IsAlive === true && row.Status === "Old") || row.Status === "New" && row.Role==="nominee" && row.IsMinor===false
                      )?.map((row, index) => (console.log("beneficiaryDetailssssss",row),
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
                            name={['beneficiaryDetailsData', row?.id, 'NomineePANNumber']}
                            className="inputs-label mb-0"
                            key={index}
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
                                message: 'Enter Nominee Address',
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter Nominee Address"
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
                                message: 'Enter Nominee Address',
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter Nominee Address"
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
                                message: 'Enter Nominee Address',
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter Nominee Address"
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
                                message: 'Enter Nominee Address',
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter Nominee Address"
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
                                message: 'Enter Nominee Address',
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter Nominee Address"
                              className="cust-input"
                              maxLength={100}
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
                            name={['beneficiaryDetailsData', row?.id, 'NomineeMobile']}
                            className="inputs-label mb-0"
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
                              onKeyDown={(e) => handleKeyDown("numbersOnly",  e)}
                              onChange={(e) => handleAccNumberChange(index, 'NomineeMobile', e.target.value)}
                            />
                          </Form.Item>
                        </td>
                        <td>Nominee Email</td>
                        <td>
                          <Form.Item
                            name={['beneficiaryDetailsData', row?.id, 'NomineeEmail']}
                            className="inputs-label mb-0"
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
                              onChange={(e) => handleAccNumberChange(index, 'NomineeEmail', e.target.value)}
                            />
                          </Form.Item>
                        </td>
                      </tr>
                      <br/>
                      </tbody>

                    </table>
                    ))}

                    {beneficiaryDetails?.filter(row => 
                      (row.Role === "appointee" && row.Status === "New" && row.IsMinor===false)
                      )?.map((row, index) => (console.log("beneficiaryDetailscheck",row),
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
                              placeholder="Enter Nominee Address"
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
                    {/* <table className="claims-table">
      {beneficiaryDetailsData?.map((row, index) => (
           <tbody className="nominee-section">
          <tr className="nominee-input">
            <td>Nominee PAN</td>
            <td>
              <Form.Item
                name={['beneficiaryDetailsData', row?.id, 'NomineePANNumber']}
                className="inputs-label mb-0"
                key={index}
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
            <td>Nominee Address</td>
            <td>
              <Form.Item
                 name={['beneficiaryDetailsData', row?.id, 'address']}
                className="inputs-label mb-0"
                rules={[
                  {
                    required: false,
                    message: 'Enter Nominee Address',
                  },
                ]}
              >
                <Input
                  placeholder="Enter Nominee Address"
                  className="cust-input"
                  maxLength={100}
                  onChange={(e) => handleAccNumberChange(index, 'address', e.target.value)}
                />
              </Form.Item>
            </td>
          </tr>
          <tr>
            <td>Nominee Mobile</td>
            <td>
              <Form.Item
                name={['beneficiaryDetailsData', row?.id, 'NomineeMobile']}
                className="inputs-label mb-0"
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
                  onKeyDown={(e) => handleKeyDown("numbersOnly",  e)}
                  onChange={(e) => handleAccNumberChange(index, 'NomineeMobile', e.target.value)}
                />
              </Form.Item>
            </td>
            <td>Nominee Email</td>
            <td>
              <Form.Item
                name={['beneficiaryDetailsData', row?.id, 'NomineeEmail']}
                className="inputs-label mb-0"
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
                  onChange={(e) => handleAccNumberChange(index, 'NomineeEmail', e.target.value)}
                />
              </Form.Item>
            </td>
          </tr>
          </tbody>
      ))}
    </table> */}
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
              key="3"
            >
              {/* {renderDetailsForm("Death_Claim_Nominee_Bank_Details")} */}
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
              {!isShowPOSScreen&& (ClaimTypee === "DEATH" || ClaimTypee === "Health" || ClaimTypee === "WOP") && <>
                <div className="d-flex">
  <h4 className="subtype-headings fs-16 fw-500">
    Beneficiary Bank Details
  </h4>{" "}
  
 {/* <span className="d-flex justify-center" style={{ paddingLeft: "10px" }}>
    <i
      className="bi bi-plus-circle-fill c-pointer text-color fs-18"
      onClick={() => handleAddRow2()}
    ></i>
    <i
      className="bi bi-trash3-fill c-pointer text-color fs-18"
      style={{ marginLeft: "10px" }} // Add this line for spacing
      onClick={() => handleDeleteRow2()}
    ></i>?.filter(row => 
      (row.IsMinor===false))
 </span> */}
</div>

                    </>}

                    {!isShowPOSScreen&& (ClaimTypee === "CI" || ClaimTypee === "TPD") && <>
              
                <div className="d-flex">
  <h4 className="subtype-headings fs-16 fw-500">
    Beneficiary Bank Details
  </h4>{" "}
  
 <span className="d-flex justify-center" style={{ paddingLeft: "10px" }}>
    <i
      className="bi bi-plus-circle-fill c-pointer text-color fs-18"
      onClick={() => handleAddRow2()}
    ></i>
    <i
      className="bi bi-trash3-fill c-pointer text-color fs-18"
      style={{ marginLeft: "10px" }} // Add this line for spacing
      onClick={() => handleDeleteRow2()}
    ></i>
 </span>
</div>

                    </>}
                    {(ClaimTypee !== "CI" || ClaimTypee !== "TPD") && <>
                    <table className="claims-tablewidth">
      {beneficiaryDetails
      ?.filter(row =>(row.IsMinor===false))
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
                name={['beneficiaryBankData', row?.id, 'IFSC']}
                className="inputs-label mb-0"
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
                  onKeyDown={(e) => handleKeyDown("charactersOnly",e)}
                  onBlur={(e)=>getIFSCBankDetails(e.target.value,row,index)}
                  onChange={(e) => handleBeneficiaryBankDetailsChange(index, 'IFSC', e.target.value)}
                />
              </Form.Item>
            </td>
            <td>Bank Name</td>
            <td>
              <Form.Item
                name={['beneficiaryBankData', row?.id, 'BankName']}
                className="inputs-label mb-0"
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
          <tr className="nominee-input">
            <td>Branch Name</td>
            <td>
            <Form.Item
                name={['beneficiaryBankData', row?.id, 'BranchName']}
                className="inputs-label mb-0"
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
                name={['beneficiaryBankData', row?.id, 'AccountNumber']}
                className="inputs-label mb-0"
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
                  //onBlur={(e) => handleBankAccNumber(e.target.value,"AccountNumber",row)}
                  onKeyDown={(e) => handleKeyDown("numbersOnly",  e)}
                  onChange={(e) => handleBeneficiaryBankDetailsChange(index, 'AccountNumber', e.target.value)}
                />
              </Form.Item>
            </td>
          </tr>
          <tr className="nominee-input">
            <td>Re-Enter Account Number</td>
            <td>
              <Form.Item
                name={['beneficiaryBankData', row?.id, 'ReAccountNumber']}
                className="inputs-label mb-0"
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
                  //onBlur={(e) => handleBankAccNumber(e.target.value,"ReAccountNumber",row)}
                  onKeyDown={(e) => handleKeyDown("numbersOnly",  e)}
                  onChange={(e) => handleBeneficiaryBankDetailsChange(index, 'ReAccountNumber', e.target.value)}
                />
              </Form.Item>
            </td>
            <td>Account Holder Name</td>
            <td>
              <Form.Item
                name={['beneficiaryBankData', row?.id, 'AccountHolderName']}
                className="inputs-label mb-0"
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
                  onChange={(e) => handleBeneficiaryBankDetailsChange(index, 'AccountHolderName', e.target.value)}
                />
              </Form.Item>
            </td>
            </tr>
            <tr className="nominee-input">
            <td>
            <a
                        onClick={() => InitiatePennyDropp(row,index)}
                        style={{ color: "#b3201f" }}
                        className="text-label"
                      >
              Initiate Penny Drop
              </a>
              </td>
            <td>
              <Form.Item
                name={['beneficiaryBankData', row?.id, 'InitiatePennyDrop']}
                className="inputs-label mb-0"
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
                  onChange={(e) => handleBeneficiaryBankDetailsChange(index, 'InitiatePennyDrop', e.target.value)}
                />
              </Form.Item>
            </td>
            <td>Name as per Penny Drop</td>
            <td>
              <Form.Item
                name={['beneficiaryBankData', row?.id, 'NameasperPennyDrop']}
                className="inputs-label mb-0"
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
            <tr className="nominee-input">
  <td>Name Match</td>
  <td>
    <Form.Item
      name={['beneficiaryBankData', row?.id, 'NameMatch']}
      className="inputs-label mb-0"
      rules={[
        {
          required: true,
          message: 'Name Match is required',
        },
      ]}
    >
      <Radio.Group
       // onChange={(e) => handleRadioChange(e)}
        onChange={(e) => handleBeneficiaryBankDetailsChange(index, 'NameMatch', e.target.value)}
        className="radio-check"
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

          </tbody>
          <br/>
        </React.Fragment>
        
  ))}
    </table>
    </>
}

 {(ClaimTypee === "CI" || ClaimTypee === "TPD") && <>
                    <table className="claims-tablewidth">
      {beneficiaryBankData
      ?.map((row, index) => (
        <React.Fragment key={row?.id}>
           <tbody className="nominee-section">
          <tr className="nominee-input">
            <td>IFSC</td>
            <td>
              <Form.Item
                name={['beneficiaryBankData', row?.id, 'IFSC']}
                className="inputs-label mb-0"
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
                  onKeyDown={(e) => handleKeyDown("charactersOnly",e)}
                  onBlur={(e)=>getIFSCBankDetails(e.target.value,row,index)}
                  onChange={(e) => handleBeneficiaryBankDetailsChange(index, 'IFSC', e.target.value)}
                />
              </Form.Item>
            </td>
            <td>Bank Name</td>
            <td>
              <Form.Item
                name={['beneficiaryBankData', row?.id, 'BankName']}
                className="inputs-label mb-0"
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
          <tr className="nominee-input">
            <td>Branch Name</td>
            <td>
            <Form.Item
                name={['beneficiaryBankData', row?.id, 'BranchName']}
                className="inputs-label mb-0"
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
                name={['beneficiaryBankData', row?.id, 'AccountNumber']}
                className="inputs-label mb-0"
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
                  //onBlur={(e) => handleBankAccNumber(e.target.value,"AccountNumber",row)}
                  onKeyDown={(e) => handleKeyDown("numbersOnly",  e)}
                  onChange={(e) => handleBeneficiaryBankDetailsChange(index, 'AccountNumber', e.target.value)}
                />
              </Form.Item>
            </td>
          </tr>
          <tr className="nominee-input">
            <td>Re-Enter Account Number</td>
            <td>
              <Form.Item
                name={['beneficiaryBankData', row?.id, 'ReAccountNumber']}
                className="inputs-label mb-0"
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
                  //onBlur={(e) => handleBankAccNumber(e.target.value,"ReAccountNumber",row)}
                  onKeyDown={(e) => handleKeyDown("numbersOnly",  e)}
                  onChange={(e) => handleBeneficiaryBankDetailsChange(index, 'ReAccountNumber', e.target.value)}
                />
              </Form.Item>
            </td>
            <td>Account Holder Name</td>
            <td>
              <Form.Item
                name={['beneficiaryBankData', row?.id, 'AccountHolderName']}
                className="inputs-label mb-0"
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
                  onChange={(e) => handleBeneficiaryBankDetailsChange(index, 'AccountHolderName', e.target.value)}
                />
              </Form.Item>
            </td>
            </tr>
            <tr className="nominee-input">
            <td>
            <a
                        onClick={() => InitiatePennyDropp(row,index)}
                        style={{ color: "#b3201f" }}
                        className="text-label"
                      >
              Initiate Penny Drop
              </a>
              </td>
            <td>
              <Form.Item
                name={['beneficiaryBankData', row?.id, 'InitiatePennyDrop']}
                className="inputs-label mb-0"
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
                  onChange={(e) => handleBeneficiaryBankDetailsChange(index, 'InitiatePennyDrop', e.target.value)}
                />
              </Form.Item>
            </td>
            <td>Name as per Penny Drop</td>
            <td>
              <Form.Item
                name={['beneficiaryBankData', row?.id, 'NameasperPennyDrop']}
                className="inputs-label mb-0"
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
            <tr className="nominee-input">
  <td>Name Match</td>
  <td>
    <Form.Item
      name={['beneficiaryBankData', row?.id, 'NameMatch']}
      className="inputs-label mb-0"
      rules={[
        {
          required: true,
          message: 'Name Match is required',
        },
      ]}
    >
      <Radio.Group
       // onChange={(e) => handleRadioChange(e)}
        onChange={(e) => handleBeneficiaryBankDetailsChange(index, 'NameMatch', e.target.value)}
        className="radio-check"
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

          </tbody>
          <br/>
        </React.Fragment>
        
  ))}
    </table>
    </>
}
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
                  Upload Documents
                </span>
              }
              key="4"
            >
               <Form
        form={uploadform}
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
               {(ClaimTypee === 'CI' &&renderDetailsForm("CI_Claim_Documents_Details")) ||    
                (ClaimTypee === 'DEATH' && renderDetailsForm("Death_Claim_Documents_Details")) || 
                (ClaimTypee  === "TPD" && renderDetailsForm("TPD_Claim_Documents_Details")) ||
                (ClaimTypee === 'WOP')&& renderDetailsForm("WPO_Claim_Documents_Details") ||
                (ClaimTypee === 'Health')&& renderDetailsForm("Health_Claim_Documents_Details")|| renderDetailsForm("CI_Claim_Documents_Details")}
                

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
          getAdvance={props.getAdvance}
          navigate={navigateTo}
          setShowAlert={setShowAlert}
        ></PopupAlert>
      )}

    </>
  );

}

export default Claims;
