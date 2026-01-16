import React, { useEffect, useState } from "react";
import {useSelector } from "react-redux";

import { AssignmentData } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import {
  Button,
  Form,
  Spin,
  message,
  Row,
  Col,
  Modal,
  Checkbox,
  Input,
  DatePicker,
  Select,
  Upload,
  Tooltip,
} from "antd";
import moment from "moment";
import apiCalls from "../../api/apiCalls";
import PopupAlert from "../popupAlert";
import UploadIcon from "../../assets/images/upload.png";
import ContactForm from "../../utils/ContactForm";
import dayjs from "dayjs";
import CloseIcon from "../../assets/images/close-icon.png";
import RaiseRequirementPopup from '../RaiseRequirementPopup';
import InternalFlow from "../InternalFlow/InternalFlow";
import InternalFlowPOS from "../InternalFlow/InternalFlowPOS";
import ClientListModal from "../../utils/clientListModal";
import { SearchOutlined } from "@ant-design/icons";

const Assignment = (props) => {
  const loginInfo = useSelector((state) => state);
  const [form] = Form.useForm();
  const [requirementsForm] = Form.useForm();
  const [internalReqForm] = Form.useForm();
  const dateFormat = "DD/MM/YYYY";
  const { selectedSubType, customerData, details,POSContactData,SelectedSubTypeVal,selectedCallType,selectedSubTypeId,clientEnquiryData, requestModeLU,visible,setSelectedRowKeys,selectedRowKeys,salutationLU,martialStatusLU, bankAccTypeLU} = props;
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
  const [negativeList,setNegativeList] = useState([]);
  const [negativeListModal,setNegativeModal] = useState(false);
  const [NameDeDupeData,setNameDeDupeData] = useState([]);
  const [NameDeDupeModal,setNameDeDupeModal] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [isLoader,setIsLoader] = useState(false);
  const [activeEmailIcons, setActiveEmailIcons] = useState([]);
  const [activeMobileIcons, setActiveMobileIcons] = useState([]);
  const [activeWhatsAppIcons, setActiveWhatsAppIcons] = useState([]);
  const [medicalTestsCompleteModal, setMedicalTestsCompleteModal] =useState(false);
  const [medicalTestsPendingModal,setMedicalTestsPendingModal] =useState(false);
  const [isPreferDate,setIsPreferDate] = useState(null);
  const [isSelectedDate, setIsSelectedDate] = useState(null);
  const [checkedList, setCheckedList] = useState([]);
  const [showRaiseRequirementBtn,setShowRaiseRequirementBtn] = useState(false);
  const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [serviceRequestId, setServiceRequestId] = useState(null);
  const [uploadFiles,setUploadFiles] = useState([]);
  const [showExistClientId,setShowExistClientId] = useState(false);
  const [isProcessLink,setIsProcessLink] = useState(''); 
const [isDocLink,setIsDocLink] = useState('');
const [existingNomineeData, setExistingNomineeData] = useState([]);
const [relationShipLU,setRelationShipLU] = useState([]);
const [isExistingAppointeeData,setIsExistingAppointeeData] = useState({});
const [posExistingNomineeData,setPosExistingNomineeData] = useState([]);
const [posUpdateNomineeData,setPosUpdateNomineeData] = useState([]);
const [isAllowNomineeUpdation,setIsAllowNomineeUpdation] = useState(false);
const [isShowNomineeSections,setIsShowNomineeSections] = useState(false);
const [isMinorDOB,setIsMinorDOB] = useState(false);
const [isDOBIndex,setIsDOBIndex] = useState(null);
const [totalShare, setTotalShare] = useState(0);
const [nomineeEnquiryData,setNomineeEnquiryData] = useState([]);
const [isPANStatus,setIsPANStatus] = useState(false);
const [addressProofModal, setAddressProofModal] = useState(false);
const [showUploadFile, setShowUploadFile] = useState(null);

const [jobCardFiles,setJobCardFiles] = useState([]);
const [PANCardUploadFiles,setPANCardUploadFiles] = useState([]);
const [uploadMultipleFiles,setUploadMultipleFiles] = useState([]);
const [isUploadMultipleFiles,setIsMultipleFiles] = useState([]);
const [isSelectUploadLabel,setIsSelectUploadLabel] = useState(null);
const [jobCardIDProofFiles,setJobCardIDProofFiles] = useState([]);
const [isShowEmailMobileModal,setIsShowEmailMobileModal] = useState(false);
const [isEmailMobileNoMessage,setIsEmailMobileNoMessage] = useState("");
const [isEditNominee, setIsEditNominee] = useState(false);
const [InternaRequirements, setInternalFlowRequirements] = useState("");

const [aadharUploadFiles,setAAdharUploadFiles] = useState([]);
const [passportUploadFiles,setPassportUploadFiles] = useState([]);
const [rationCardUploadFiles,setRationCardUploadFiles] = useState([]);
const [DrivingUploadFiles,setDrivingUploadFiles] = useState([]);
const [utilityUploadFiles,setUtilityUploadFiles] = useState([]);
const [voterUploadFiles, setVoterUploadFiles] = useState([]);
const [passbookUploadFiles, setPassbookUploadFiles] = useState([]);
const [pancardUploadFiles,setPancardUploadFiles] = useState([]);

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
const [docIdProofs,setDocIdProofs] = useState([]);
 const [deDupeModalOpen, setDeDupeModalOpen] = useState(false);
 const [BankduDupeData,setBankDeDupeData] = useState([]);
const [isPosBtnsDisable, setIsPosBtnsDisable] = useState(false);
const [isTableSearch, setIsTableSearch] = useState(false);
const [tableIndex,setTableIndex] = useState(null);
 const [selection, setSelection] = useState('identifier');
   const [data, setData] = useState([])
     const [selectedRowData, setSelectedRowData] = useState(null);
       const [showTotalPages,setShowTotalpages] = useState(null);
       const [updateFields, setUpdateFields] = useState(false);
       const [BankAccNo, setBankAccNo] = useState("");
       const [IsPosEdited,setIsPosEdited] = useState(false);
       const [isShowClientListModal,setIsShowClientListModal] = useState(false);
       const [CNFBankAccNo, setCNFBankAccNo] = useState("");
const [updateNomineeData, setUpdateNomineeData] = useState([
  {id:1, NomineeDOB_New: null, RealtionshipWithPolicyowner_New: null, Share_New: 0, Role_New:"nominee",isMinor:false,ClientID_New:"", NomineeFirstName_New: "", NomineeLastName_New: "",NomineeSalutation_New: null,},
]);

  const absoluteAssignmentObj = {
    custRole:POSContactData?.custRole,
    srvReqID: POSContactData?.srvReqID,
    AssignorName: "",
    AssigneeName: "",
    AssignmentCondition_New: "",
    AssigneeCKYCNumber: "",
    PolicyBondSubmitted:"",
    Comments: "",
    ValidateSignature:"",
    AssigneeDOB:"",
    AddressLine1:"",
    AddressLine2:"",
    AddressLine3:"",
    PINCode_Old:"",
    City_Old:"",
    State_Old:"",
    ExistingClient:"",
    PANNumber:'',
    NameinPAN: "",
    PANValidationStatus: "",
    NameMatch: "",
    NewOwnerClientID: '',
    Salutation: '',
    MaritialStatus: '',
      BankIFSC:'',
    BankName:'',
    BranchName: '',
    AccountType:'',
    NameAsMentionedInTheBank:'',
    BankAccountNumber:'',
    InitiatePennyDrop:'',
    NameasperPennyDrop: '',
    NamematchasperPennyDrop: '',
    AssigneeMobileNo:"",
    AssigneeEmailID:"",
    BankNameMatch: "",
    ConfirmBankAccountNumber:""
  };
  const posChangeinNomineeObj = {
    custRole:POSContactData?.custRole,
    srvReqID: POSContactData?.srvReqID,
    Client_Id: null,
    AssignmentCondition_New:'',
    AssignmentCondition_Old:'',
    NewOwnerClientID: '',
    Salutation: '',
    MaritialStatus: '',
    BankIFSC:'',
    BankName:'',
    BranchName: '',
    AccountType:'',
    NameAsMentionedInTheBank:'',
    BankAccountNumber:'',
    InitiatePennyDrop:'',
    NameasperPennyDrop: '',
    NamematchasperPennyDrop: '',
    ValidateSignature:'',
    NameMatch:"" 
  }
  
  //Added by sayali on 16/07/2025 for Added nominee details in Assignment
   const handleofacData = (data) => {
    
      let name = data?.NomineeFirstName + " " + data?.NomineeLastName;
     setNameDeDupeModal(true);
      let obj = {
        requestHeader: {
          source: "",
          policyNo: details?.policyDetailsObj?.identifiers?.policyNo,
          applicationNo: details?.policyDetailsObj?.identifiers?.applicationNo,
          dob: "",
        },
        requestBody: {
          searchtype: "C",
          lastName: "",
          percentage: 0,
          percentageCIP: 0,
          type: "",
          country: "",
          dob: "",
          name: name,
          applicationNo: details?.policyDetailsObj?.identifiers?.applicationNo,
          createdby: "",
          source: "",
          panNo: "",
          passportNo: "",
          employercheck: "",
        },
      };
      let response = apiCalls.getOFACDetailsApi(obj);
      response
        .then((val) => {
          if (val?.data) {
            setNegativeList(val?.data?.responseBody?.ofac);
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
  const handleInputChange =(e,item)=>{
    if((item.label?.includes("IFSC")||item.label?.includes("POSBank_IFSC_New"))&&e.target.value){
      getIFSCBankDetails(e.target.value);
    }
  }
  const getIFSCBankDetails =async(ifscCode)=>{
    debugger;
    let response = await apiCalls.getIFSCBanks(ifscCode);
    if (response.status===200) { //inside if (response.statusText) Remove condition by sayali CR-14824
          if (response?.data.length >0) {
            if(isShowPOSScreen){
              form.setFieldsValue({
                POSBank_Name_New: response?.data[0]?.bank,
                POSBranch_Name_New: response?.data[0]?.branch
              })
            }else if(!isShowPOSScreen){
              form.setFieldsValue({
                BankName: response?.data[0]?.bank,
                BranchName: response?.data[0]?.branch,
              })
            }
          } else {
            message.error({
              content:
              response?.data?.responseBody?.errormessage ||
                "Invalid IFSC",
              className: "custom-msg",
              duration: 2,
            });
            if(isShowPOSScreen){
              form.setFieldsValue({
                POSBank_Name_New: "",
                POSBranch_Name_New: "",
              })
            }else if(!isShowPOSScreen){
            form.setFieldsValue({
              BankIFSC: '',
              BankName:"",
             
            })
          }
          }
        }
  }
 const InitiatePennyDropp = () => {
  setIsLoader(false);
   const values = form.getFieldsValue();
   if(!isShowPOSScreen && (!values?.BankAccountNumber || !values?.BankIFSC)){
     message.destroy();
     message.error({
       content:"Enter All Mandatory Feilds",
       className: "custom-msg",
       duration: 2,
     });
    return;
   }
     else if(isShowPOSScreen && (!values?.POSAcc_Number_New || !values?.POSAcc_HldrName_New || !values?.POSBank_IFSC_New)){
           message.destroy();
           message.error({
             content:"Enter All Mandatory Feilds",
             className: "custom-msg",
             duration: 2,
           });
           setIsLoader(false);
          return;
         }
   let obj = {
     "accountNumber":BankAccNo,
     "accountHolderName":isShowPOSScreen ? values?.POSAcc_HldrName_New  : (values?.NameAsMentionedInTheBank || ""),
     "ifsc": isShowPOSScreen ? values?.POSBank_IFSC_New?.toUpperCase() : values?.BankIFSC?.toUpperCase(),
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
          if(isShowPOSScreen){
            form.setFieldsValue({
              POSPennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  "Success" : "Failed",
              POSNameasperPennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName,
            })
          }else {
         form.setFieldsValue({
           InitiatePennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  "Success" : "Failed",
           NameasperPennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName
         })
        }
        }else{
          if(isShowPOSScreen){
            form.setFieldsValue({
            POSPennyDrop:  result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  "Success" : "Failed",
          })
          }else{
         form.setFieldsValue({
           InitiatePennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  "Success" : "Failed",
         })
        }
        }
         //SUCCESSFUL TRANSACTION
       } else {
         setIsLoading(false);
         form.setFieldsValue({
           InitiatePennyDrop: result?.data?.responseBody?.errormessage,
           POSPennyDrop: result?.data?.responseBody?.errormessage
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
         InitiatePennyDrop: err?.response?.statusText,
         POSPennyDrop: err?.response?.statusText
       })
       message.error({
         content:
         err?.response?.statusText||
           "Something went wrong please try again!",
         className: "custom-msg",
         duration: 2,
       });
       
       setIsLoading(false);
       // form.setFieldsValue({
       //   PennyDrop: 'Invalid Input',
      
       // })
     });
 };
 const handleLabelLink =(item)=>{
  if(item.label === "Initiate Penny Drop"){
    InitiatePennyDropp();
  }
 

}
  const searchLocationn = (e) => {
    setIsLoading(true);
    let response = apiCalls.searchLocation(e);
    response
      .then((val) => {
        setIsLoading(false);
        if (val?.data) {
          form.setFieldsValue({
              City_Old:val?.data?.district,
              State_Old:val?.data?.stateName,
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
  };

  const handleClientList =(val,index)=>{

    if(val){
      setIsTableSearch(true);
      setTableIndex(index);
    }else{
      setIsTableSearch(false);
      setTableIndex(null);
    }
    setIsShowClientListModal(true);

  }

  useEffect(()=>{
    setCheckedList([]);
    handleEmpty();
    setIsShowNomineeSections(false);
    setIsShowEmailMobileModal(false);
    setDocIdProofs([]);
    form.setFieldsValue({
        NominationChangeAllowed: details?.policyDetailsObj?.assigneeDetails?.isPolicyAssigned === 'Y' ? "Yes" : "No"
    })
setIsIDMultipleFiles([]);
setUploadIDMultipleFiles([]);
setIsMultipleFiles([]);
setUploadMultipleFiles([]);
handleAddressModalClose();
handleIdProofModalClose();
//Added by sayali on 17-07-2025 absoluteassignment name changes as absoluteconditionalassignment
    if(selectedSubType === "absoluteconditionalassignment"){
      form.setFieldsValue({
        idProof:  "",
        addressProof: ""
      })
    }//Added by sayali on 17-07-2025 absoluteassignment name changes as absoluteconditionalassignment
    if(selectedSubType === "absoluteconditionalassignment" && details?.policyDetailsObj?.assigneeDetails?.isPolicyAssigned === 'Y'){
      setIsShowEmailMobileModal(true);
      setIsEmailMobileNoMessage("This Policy is already Assigned!");
    }
    else if(selectedSubType === "reassignment" && details?.policyDetailsObj?.assigneeDetails?.isPolicyAssigned !== 'Y'){
      setIsShowEmailMobileModal(true);
      setIsEmailMobileNoMessage("This Policy is not Assigned!");
    }
if(!details?.policyDetailsObj?.saDetails?.Assignment){
      setIsShowNomineeSections(true);
      setIsAllowNomineeUpdation(true);
    }
    else {
      setIsShowNomineeSections(true);
      setIsAllowNomineeUpdation(false);
    }
  },[selectedSubType]) // eslint-disable-next-line arrow-body-style
  useEffect(()=>{
      if(props?.EmailResponse?.IsEmailmanagent){
      AssignmentData[selectedSubType]?.Update_Details?.forEach(element => {
                if (element?.name === "customerchoice") {
                    element.hide = true;
                }
                if (element?.name === "requestchannel") {
                    form.setFieldsValue({ requestchannel: 4 });
                    element.disabled = true;
                }
            });
            AssignmentData[selectedSubType]?.Update_Details?.forEach(element => {
                  if (["customersigningdate", "branchreceiveddate", "ValidateSignature"].includes(element?.name)) {
                      element.hide = true;
                  }
              });
              AssignmentData[selectedSubType]?.Request_Details?.forEach(element => {
                if (["customersigningdate", "branchreceiveddate", "ValidateSignature"].includes(element?.name)) {
                    element.hide = true;
                }
            });
            if (!AssignmentData[selectedSubType]) {
              AssignmentData[selectedSubType] = {}; // Initialize it if undefined
          }
          
          if (!Array.isArray(AssignmentData[selectedSubType].Update_Details)) {
              AssignmentData[selectedSubType].Update_Details = [];
          }
          
          // Remove existing instances of "Additional Note For Customer" before adding a new one
          AssignmentData[selectedSubType].Update_Details = AssignmentData[selectedSubType].Update_Details.filter(
              (comment) => comment.name !== "AdditionalNoteForCustomer"
          );
        AssignmentData[selectedSubType].Update_Details.push(
          {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 4000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
          });
        //ReAssignment
        AssignmentData[selectedSubType]?.Request_Details?.forEach(element => {
          if (element?.name === "customerchoice") {
              element.hide = true;
          }
          if (element?.name === "requestchannel") {
              form.setFieldsValue({ requestchannel: 4 });
              element.disabled = true;
          }
      });
          if (!Array.isArray(AssignmentData[selectedSubType]?.Request_Details)) {
            AssignmentData[selectedSubType].Request_Details = [];
            }
          
            // Remove existing instances of "Additional Note For Customer" before adding a new one
            AssignmentData[selectedSubType].Request_Details = AssignmentData[selectedSubType].Request_Details.filter(
                comment => comment.name !== "AdditionalNoteForCustomer"
            );
          
            // Add "Additional Note For Customer" once
            AssignmentData[selectedSubType].Request_Details.push(
              {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 4000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
              });
          
    }
  },[selectedSubType]) 
  useEffect(()=>{
    setCheckedList([]);
    getProcesLink();
    if(!isShowPOSScreen&&!customerData?.isPOS){
      form.setFieldsValue({
        PolicyOwnerName_Old: details?.policyDetailsObj?.identifiers?.po_Name,
        PolicyOwnerClientID_Old: details?.policyDetailsObj?.identifiers?.po_ClientID,
       })
    }
      if(POSContactData && customerData?.isPOS&&selectedSubType==="absoluteconditionalassignment"){ //Added by sayali on 17-07-2025 absoluteassignment name changes as absoluteconditionalassignment
        POSContactData?.serviceRequestTransectionData?.forEach(element => {
          absoluteAssignmentObj[element.tagName] = element.tagValue
        });
        setIsShowPOSScreen(true);
        form.setFieldsValue({
          ExistingClient: absoluteAssignmentObj?.ExistingClient,
          custRole: absoluteAssignmentObj?.custRole,
          srvReqID: absoluteAssignmentObj?.srvReqRefNo,
          AssignorName: details?.policyDetailsObj?.identifiers?.po_Name,
          AssigneeName: absoluteAssignmentObj?.PolicyOwnerName_New,
          AssigneeFirstName: absoluteAssignmentObj?.PolicyOwnerFirstName_New,
          AssigneeLastName: absoluteAssignmentObj?.PolicyOwnerLastName_New,
          AssignmentCondition_New: absoluteAssignmentObj?.AssignmentCondition_New,
          AssigneeCKYCNo: absoluteAssignmentObj?.AssigneeCKYCNumber,
          PolicyBondSubmitted: absoluteAssignmentObj?.PolicyBondSubmitted,
          // Comments: absoluteAssignmentObj?.Comments,
          ValidateSignature:absoluteAssignmentObj?.ValidateSignature,
          CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
          BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
          ReasonForDelay: POSContactData?.reasonDelayed,
          RequestorComments:absoluteAssignmentObj?.RequestorComments === undefined ? absoluteAssignmentObj?.Comments: absoluteAssignmentObj?.RequestorComments,
          AssigneeDOB: absoluteAssignmentObj?.AssigneeDOB ? dayjs(absoluteAssignmentObj?.AssigneeDOB, 'DD/MM/YYYY') : absoluteAssignmentObj?.AssigneeDOB,
          AddressLine1:absoluteAssignmentObj?.AddressLine1,
          AddressLine2:absoluteAssignmentObj?.AddressLine2,
          AddressLine3:absoluteAssignmentObj?.AddressLine3,
          PINCode_Old:absoluteAssignmentObj?.PINCode_Old,
          City_Old:absoluteAssignmentObj?.City_Old,
          State_Old:absoluteAssignmentObj?.State_Old,
          AssigneeMobileNo:absoluteAssignmentObj?.AssigneeMobileNo,
          AssigneeEmailID:absoluteAssignmentObj?.AssigneeEmailID,
          PANNumber: absoluteAssignmentObj?.PANNumber,
          NameinPANN: absoluteAssignmentObj?.NameinPAN,
          PANValidationStatus: absoluteAssignmentObj?.PANValidationStatus,
          NameMatch: absoluteAssignmentObj?.NameMatch,
          requestchannel: POSContactData?.reqMode,
          NewOwnerClientID: absoluteAssignmentObj?.NewOwnerClientID,
          Salutation: absoluteAssignmentObj?.Salutation,
          MaritialStatus: absoluteAssignmentObj?.MaritialStatus,
          BankIFSC: absoluteAssignmentObj?.BankIFSC,
          BankName: absoluteAssignmentObj?.BankName,
          BranchName:absoluteAssignmentObj.BranchName,
          AccountType: isNaN(parseInt(absoluteAssignmentObj?.AccountType)) ? absoluteAssignmentObj?.AccountType : parseInt(absoluteAssignmentObj?.AccountType),
          NameAsMentionedInTheBank: absoluteAssignmentObj?.NameAsMentionedInTheBank,
          BankAccountNumber: absoluteAssignmentObj?.BankAccountNumber,
          ConfirmBankAccountNumber: absoluteAssignmentObj?.ConfirmBankAccountNumber,
          InitiatePennyDrop: absoluteAssignmentObj?.InitiatePennyDrop,
          NameasperPennyDrop: absoluteAssignmentObj?.NameasperPennyDrop,
          NamematchasperPennyDrop: absoluteAssignmentObj?.NamematchasperPennyDrop,
          BankNameMatch: absoluteAssignmentObj?.BankNameMatch,
           dedupeCheck: POSContactData?.deDupPayload[0]?.deDupPayload[0]?.ResponseBody != null &&  POSContactData?.deDupPayload[0]?.deDupPayload[0]?.ResponseBody?.ClientDetails?.length >0 ? "yes" : "no"
        });
        AssignmentData[selectedSubType]?.POS_Details?.forEach(element => {
          // if(absoluteAssignmentObj?.ExistingClient === 'no'){
          //   if(element?.name === 'AddressLine1'||  element?.name === 'AddressLine2' || element?.name === 'AddressLine3'||
          //     element?.name === 'PINCode_Old' || element?.name === 'City_Old' || element?.name === 'State_Old' ){
          //       element.hide= false;
          //   }
          // }else{
          //   if(element?.name === 'AddressLine1'||  element?.name === 'AddressLine2' || element?.name === 'AddressLine3'||
          //   element?.name === 'PINCode_Old' || element?.name === 'City_Old' || element?.name === 'State_Old' ){
          //     element.hide= true;
          // }
          // }
          if(element?.label?.includes("Reason For Delayed Submission")&& POSContactData?.reasonDelayed){
            element.hide= false;
           
          }
        });
        setShowReasonDelayField(true);
         //Added by sayali on 16/07/2025 for Added nominee details in Assignment
        const newData = POSContactData?.serviceRequestTransectionData?.filter(item => item.status === 'Create' && item.tagName?.includes('New'));
        // Consolidate data into an array of objects
        const consolidatedNewData = newData.reduce((acc, item) => {
        const match = item.tagName?.match(/_(New_\d+)$/);
        if (match) {
          const index = match[1]; // Extract the dynamic index (e.g., New_1, New_2)
          const fieldName = item.tagName.replace(`_${index}`, '');
          const currentIndex = acc.findIndex((el) => el.index === index);
          
          if (currentIndex === -1) {
            // If the index doesn't exist in the accumulator, create a new object
            acc.push({ index, [fieldName]: item.tagValue });
          } else {
            // If the index exists, update the existing object
            acc[currentIndex][fieldName] = item.tagValue;
          }
        }
        return acc;
      }, []);

        getRelationsData(null,null,consolidatedNewData,posChangeinNomineeObj?.Client_Id, "true");
       
        if(absoluteAssignmentObj?.InitiatePennyDrop== null || absoluteAssignmentObj?.InitiatePennyDrop =="")
        {
          if(absoluteAssignmentObj?.AssignmentCondition_New === 'loan' || absoluteAssignmentObj?.AssignmentCondition_New==='financialinstitute')
          {
            AssignmentData[selectedSubType]?.POS_Details?.forEach(element => {
            if(element.name==="InitiatePennyDrop"){
              element.disabled= true;
              element.required= false;
            }
            
            })
          }
        }
        //end
      }
      if (POSContactData && customerData?.isPOS&&selectedSubType==="reassignment") {
        POSContactData?.serviceRequestTransectionData?.forEach(element => {
          posChangeinNomineeObj[element.tagName] = element.tagValue
        });
        setIsShowPOSScreen(true);
       
        form.setFieldsValue({
          PastOwnerName: posChangeinNomineeObj?.PastOwnerName,
          PastOwnerClientID: posChangeinNomineeObj?.PastOwnerClientID,
          CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
          BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
          ReasonForDelay: POSContactData?.reasonDelayed,
          RequestorComments:posChangeinNomineeObj?.Comments,
          requestchannel: POSContactData?.reqMode,
          NewOwnerClientID: posChangeinNomineeObj?.NewOwnerClientID,
          Salutation: posChangeinNomineeObj?.Salutation,
          MaritialStatus: posChangeinNomineeObj?.MaritialStatus,
          BankIFSC: posChangeinNomineeObj?.BankIFSC,
          BankName: posChangeinNomineeObj?.BankName,
          BranchName:posChangeinNomineeObj.BranchName,
          AccountType: isNaN(parseInt(posChangeinNomineeObj?.AccountType)) ? posChangeinNomineeObj?.AccountType : parseInt(posChangeinNomineeObj?.AccountType),
          NameAsMentionedInTheBank: posChangeinNomineeObj?.NameAsMentionedInTheBank,
          BankAccountNumber: posChangeinNomineeObj?.BankAccountNumber,
          ConfirmBankAccountNumber: posChangeinNomineeObj?.ConfirmBankAccountNumber,
          InitiatePennyDrop: posChangeinNomineeObj?.InitiatePennyDrop,
          NameasperPennyDrop: posChangeinNomineeObj?.NameasperPennyDrop,
          NamematchasperPennyDrop: posChangeinNomineeObj?.NamematchasperPennyDrop,
          AssignmentCondition_Old: posChangeinNomineeObj?.AssignmentCondition_Old,  
          ValidateSignature: posChangeinNomineeObj?.ValidateSignature, 
          NameMatch: posChangeinNomineeObj?.NameMatch,
        })
        AssignmentData[selectedSubType]?.POS_Details?.forEach(element => {
          if(element?.label?.includes("Reason For Delayed Submission")&&POSContactData?.reasonDelayed){
            element.hide= false;
            setShowReasonDelayField(true);
          }
        });
        // Filter new data
    const oldData = POSContactData?.serviceRequestTransectionData?.filter(item => item.status === 'Create' && item.tagName?.includes('Old'));
      // Consolidate data into an array of objects
      const consolidatedData = oldData.reduce((acc, item) => {
        const match = item.tagName?.match(/_(Old_\d+)$/);
        if (match) {
          const index = match[1]; // Extract the dynamic index (e.g., New_1, New_2)
          const fieldName = item.tagName.replace(`_${index}`, '');
          const currentIndex = acc.findIndex((el) => el.index === index);
          
          if (currentIndex === -1) {
            // If the index doesn't exist in the accumulator, create a new object
            acc.push({ index, [fieldName]: item.tagValue });
          } else {
            // If the index exists, update the existing object
            acc[currentIndex][fieldName] = item.tagValue;
          }
        }
        return acc;
      }, []);
       setPosExistingNomineeData(consolidatedData);
  
    const newData = POSContactData?.serviceRequestTransectionData?.filter(item => item.status === 'Create' && item.tagName?.includes('New'));
      // Consolidate data into an array of objects
      const consolidatedNewData = newData.reduce((acc, item) => {
        const match = item.tagName?.match(/_(New_\d+)$/);
        if (match) {
          const index = match[1]; // Extract the dynamic index (e.g., New_1, New_2)
          const fieldName = item.tagName.replace(`_${index}`, '');
          const currentIndex = acc.findIndex((el) => el.index === index);
          
          if (currentIndex === -1) {
            // If the index doesn't exist in the accumulator, create a new object
            acc.push({ index, [fieldName]: item.tagValue });
          } else {
            // If the index exists, update the existing object
            acc[currentIndex][fieldName] = item.tagValue;
          }
        }
        return acc;
      }, []);
      GetAssigneeEnquiry();
      getRelationsData(null,null,consolidatedNewData,posChangeinNomineeObj?.Client_Id, "true"); //for relationship owner full name  bind purpose
     // setPosUpdateNomineeData(consolidatedNewData);  //for relationship owner full name  bind purpose
      }
 
  },[]); // eslint-disable-next-line arrow-body-style

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
        if (val?.data?.responseBody?.errorCode !== "1") {
            let res = val?.data?.responseBody;
          form.setFieldsValue({
            AssignmentCondition_Old:res?.reasonCode,
            AssigneeName: res?.assigneeName || details?.policyDetailsObj?.assigneeDetails?.assigneeName,
            PolicyOwnerClientID_Old: res?.asigneeCode || details?.policyDetailsObj?.assigneeDetails?.assigneeID,
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

  const handleChange = (value) => {
    const emailDetails=AssignmentData[selectedSubType]?.Request_Details;
    if(loginInfo?.userProfileInfo?.profileObj?.isEmail){
      emailDetails?.forEach(element => {
        if ( element?.name === "requestform") {
            element.required= false;
        }
    });
    }

    handleEmpty();
    if(value?.includes("Update New Assignment Details") && loginInfo?.userProfileInfo?.profileObj?.isEmail){
      // form.setFieldsValue({
      //   'requestchannel': "Email",
      // });
    }
    //Added by sayali on 16/07/2025 for Added nominee details in Assignment
    if(value?.includes("Update New Assignment Details")){
      getRelationsData(null,value,null,props?.details?.policyDetailsObj?.identifiers?.po_ClientID)
    }
    //end
    // If the checkbox is already checked, uncheck it
    if (checkedList.includes(value)) {
      setCheckedList([]);
    } else {
      // Otherwise, check it
      setCheckedList([value]);
      if(value?.includes("View Existing Assignment Details")||value?.includes("Initiate Reassignment Request")||
      value?.includes("View Existing Appointee")||value?.includes("Update New Appointee")){
        getNomineeEnquiry(value);
        GetAssigneeEnquiry();
        if(value?.includes("Initiate Reassignment Request") ||value?.includes("View Existing Assignment Details")){
          form.setFieldsValue({
            PastOwnerName: details?.policyDetailsObj?.identifiers?.po_Name,
            PastOwnerClientID: details?.policyDetailsObj?.identifiers?.po_ClientID,
          })
        }
        if(value?.includes("Initiate Reassignment Request")||value?.includes("Update New Appointee")){
          getRelationsData(null,value,null,props?.details?.policyDetailsObj?.identifiers?.po_ClientID)
        }
      }
    }
  };

  const getProcesLink = () => {
    setIsProcessLink('');
    setIsDocLink('')
    let obj = {
      "Call_Typ" : selectedCallType,
      "Sub_Typ":selectedSubTypeId
  }
    let response = apiCalls.getProcesLink(obj);
    response
      .then((val) => {
        if (val?.data) {
        
          const filteredData = val?.data?.filter((ele) =>{
            if(ele.docType === "AcceptableDocs"){
              setIsDocLink(ele.link);
            }else if(ele.docType === SelectedSubTypeVal){
              setIsProcessLink(ele.link)
            }
            return ele.docType
          });
  
  
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

  const handleEmpty =() =>{
    setShowRaiseRequirementBtn(false);
    setShowPhoneNumber(false);
    setActiveEmailIcons([]);
    setActiveMobileIcons([]);
    setActiveWhatsAppIcons([]);
    setShowEmailAddress(false);
    setShowWhatsApp(false);
    setShowEmailFields(false);
  }

  const handleDropdownChange=(e,item)=>{
    if(item?.name==="AssignmentCondition_New" && (e === 'loan'|| e === 'financialinstitute')){
      AssignmentData[selectedSubType]?.Update_Details?.forEach(element => {
        if(element?.name ==="UploadLoanSanctionLetter" || element?.name ==="UploadNOC"){
          element.hide= false
        }
      })
    }
     if(item?.name==="AssignmentCondition_New" && (e === 'loveaffection')){
      AssignmentData[selectedSubType]?.Update_Details?.forEach(element => {
        if(element?.name ==="UploadLoanSanctionLetter" || element?.name ==="UploadNOC"){
          element.hide= true
        }
      })
      //Added by sayali on 16/07/2025 for Added nominee details in Assignment
      AssignmentData[selectedSubType]?.Update_Details?.forEach(element => {
        if(element?.name ==="AssigneeDOB" || element.name==="BankIFSC" || element.name==="BankAccountNumber" 
          || element.name==="ConfirmBankAccountNumber" || element.name==="AccountType" || element.name==="NameAsMentionedInTheBank" 
          || element.name==="InitiatePennyDrop" ||element.name==="BankNameMatch"){
          element.disabled= false
          element.required=true
        }
      })
      //end
    }
    //Added by sayali on 16/07/2025 for Added nominee details in Assignment
    if(item?.name==="AssignmentCondition_New" && (e === 'loan' || e==='financialinstitute')){
      AssignmentData[selectedSubType]?.Update_Details?.forEach(element => {
        if(element?.name ==="AssigneeDOB" || element.name==="BankIFSC" || element.name==="BankAccountNumber" 
          || element.name==="ConfirmBankAccountNumber" || element.name==="AccountType" || element.name==="NameAsMentionedInTheBank" 
          || element.name==="InitiatePennyDrop" ||element.name==="BankNameMatch"){
          element.disabled= true;
          element.required=false;
        }
        if (element?.name === "Salutation") {
            form.setFieldsValue({ Salutation: "NA"});
            
        }
      })

    }
    if (item?.name==="AssignmentCondition_New" && (e === 'loveaffection')){
      AssignmentData[selectedSubType]?.Update_Details?.forEach(element => {
        if (element?.name === "Salutation") {
            form.resetFields(['Salutation']);
        }
      })
    }
    //end

    // if(e === "no"&&item?.label?.includes("Is Assignee an Existing Client")){
    //   AssignmentData[selectedSubType]?.Update_Details?.forEach(element => {
    //     if(element?.label === "Assignee Client ID"){
    //       element.hide= true;
    //     }
    //     if(element?.name ==="ProposerDOB" || element?.name ==="AddressLine1" || element?.name ==="AddressLine2" ||
    //     element?.name ==="AddressLine3"  ||  
    //     element?.name ==="PINCode_Old" || element?.name === "City_Old" ||  element?.name === "State_Old"  ){
    //       element.hide= false;
    //     }
    //   });
    // }else if(e === "yes"&&item?.label?.includes("Is Assignee an Existing Client")){
    //   AssignmentData[selectedSubType]?.Update_Details?.forEach(element => {
    //     if(element?.label === "Assignee Client ID"){
    //       element.hide= false;
    //     }
    //     if(element?.name ==="ProposerDOB" || element?.name ==="AddressLine1" || element?.name ==="AddressLine2" ||
    //     element?.name ==="AddressLine3"  ||
    //     element?.name ==="PINCode_Old" || element?.name === "City_Old" ||  element?.name === "State_Old"  ){
    //       element.hide= true;
    //     }
       
    //   });
    // }

    setShowExistClientId(!showExistClientId);
  }
  const handleLinkValue  =(item)=>{
    setIsMultipleFiles([]);
    setIsSelectUploadLabel(item?.label);
    if(item?.label?.includes("Upload ID Proof")){
      setIdProofModal(true);
    }
    else if(item?.label?.includes("Upload Address Proof")){
      setAddressProofModal(true);
    }
    
   }

   const handleRadioLink =(item)=>{
    setDeDupeModalOpen(false);
    if(item?.label?.includes("Dedupe Match Details")){
      setDeDupeModalOpen(true)
      let formValues = form.getFieldsValue();
      const obj ={
        "lA_CustomerID": POSContactData?.customerId,
        "bank_IFSC": formValues?.BankIFSC?.toUpperCase(),
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
        });
    }
  }
  const handleUploadLink = () => {
    setAddressProofModal(true);
  };

  const setInternalReqData = () => {
    POSContactData.serviceRequestTransectionData?.forEach(element => {
       if(element.tagName === 'InternalRequirementValue'){
           
             setInternalFlowRequirements(props.interlRequirementTagValue);
       };
     });
 }

  const handleRadioChange = (e,item) => {
    setUpdateFields(false);
    if(e.target.value === "no"&&item?.label?.includes("Validate Signature")){
      setShowRaiseRequirementBtn(true);
    }else if(e.target.value === "yes"&&item?.label?.includes("Validate Signature")){
      setShowRaiseRequirementBtn(false);
    }
    else if(e.target.value === "no"&&item?.name?.toLowerCase() === "reassignmentdone"){
      setIsPosBtnsDisable(false);
    }else if(e.target.value === "yes"&&item?.name?.toLowerCase() === "reassignmentdone"){
      setIsPosBtnsDisable(true);
    }
    //Added by sayali on 17-07-2025 absoluteassignment name changes as absoluteconditionalassignment
    if((selectedSubType==="absoluteconditionalassignment" || selectedSubType==="reassignment") && item.name === 'AreDetailsCorrect' && e.target.value === 'no'){
      AssignmentData[selectedSubType]?.POS_Details?.forEach(element => {
            if(['POSBank_IFSC_New','POSBank_Name_New','POSBranch_Name_New','POSAcc_Type_New','POSAcc_HldrName_New','POSAcc_Number_New','POSreenteraccountNumber','POSPennyDrop','POSNameasperPennyDrop','POSNameMatch'].includes(element?.name)){
              element.hide = false
            }
          })
          setUpdateFields(!updateFields);
        }
        //Added by sayali on 17-07-2025 absoluteassignment name changes as absoluteconditionalassignment
        else if((selectedSubType==="absoluteconditionalassignment" || selectedSubType==="reassignment") && item.name === 'AreDetailsCorrect' && e.target.value === 'yes'){
          AssignmentData[selectedSubType]?.POS_Details?.forEach(element => {
            if(['POSBank_IFSC_New','POSBank_Name_New','POSBranch_Name_New','POSAcc_Type_New','POSAcc_HldrName_New','POSAcc_Number_New','POSreenteraccountNumber','POSPennyDrop','POSNameasperPennyDrop','POSNameMatch'].includes(element?.name)){
              element.hide = true
            }
          });
          setUpdateFields(!updateFields);
        }
    }
    const handleTextLink=(item)=>{
      if(item?.label?.includes("Upload Address Proof")){
        setAddressProofModal(true);
      }
      else if(item?.label?.includes("Upload ID Proof")){
        setIdProofModal(true);
      }
       if(item?.linkValue?.toLowerCase() === "view"){
        const gConfig=  apiCalls.getGenericConfig();
      if(gConfig?.data?.dmsApiUrl){
        const url =  gConfig?.data?.dmsApiUrl + `/omnidocs/WebApiRequestRedirection?Application=BPMPOLENQ&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${details?.policyDetailsObj?.identifiers?.applicationNo}`;
        window.open(url, '_blank');
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
    if (item === "branchreceiveddate" || item?.name === "branchreceiveddate") {
      setShowReasonDelayField(false);
      let newDate = new Date();
      let todayDate = moment(newDate).format("MM/DD/YYYY");
      let selectDate = moment(date + 1).format("MM/DD/YYYY");
      const formFeilds = form.getFieldsValue()
      let customerSignDate = moment(formFeilds?.customersigningdate + 1).format("MM/DD/YYYY");
      let dateDiffence = date_diff_indays(selectDate,customerSignDate)
      if(!formFeilds?.customersigningdate ||dateDiffence > 0){
        message.destroy();
        message.error({
          content: "Request Received Date can't be before the customer signing date.",
          className: "custom-msg",
          duration: 3,
        });
        form.setFieldsValue({
          branchreceiveddate: "",
         
        })
      return;
      }

      else {//Added by sayali on 17-07-2025 absoluteassignment name changes as absoluteconditionalassignment
        if(selectedSubType==="absoluteconditionalassignment"){
          AssignmentData[selectedSubType]?.Update_Details?.forEach(element => {
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
        else {
          AssignmentData[selectedSubType]?.Request_Details?.forEach(element => {
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
        



  //   if (item === "branchreceiveddate") {
  //     setShowReasonDelayField(false);
  //     let newDate = new Date();
  //     let todayDate = moment(newDate).format("DD/MM/YYYY");
  //     let selectDate = moment(date + 1).format("DD/MM/YYYY");
  //     // if (selectDate < todayDate) {
  //     //   setShowReasonDelayField(true);
  //     // }
  //     AssignmentData[selectedSubType]?.Update_Details?.forEach(element => {
  //       if(element?.label?.includes("Reason For Delayed Submission")&&selectDate < todayDate){
  //         element.hide= false;
  //         setShowReasonDelayField(true);
  //       }
  //       else if(element?.label?.includes("Reason For Delayed Submission")&&selectDate >= todayDate){
  //         element.hide= true;
  //         setShowReasonDelayField(false);
  //       }
  //   })
  // };
}
    }
  }
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

  // const CKYCC = ()=>{
  //   let values = form.getFieldsValue();
  //   setIsLoading(true);
  //   let response = apiCalls.CKYC(values?.AssigneeCKYCNumber);
  //   response
  //     .then((val) => {
  //       if (val?.data?.responseBody?.errorcode!=="1") {
  //         const res = val?.data?.responseBody;
  //           form.setFieldsValue({
  //             CKYCResult: res?.description,
  //           })
  //         setIsLoading(false);
  //       } else {
  //         setIsLoading(false);
  //         form.setFieldsValue({
  //           CKYCResult: val?.data?.responseBody?.errormessage
  //         })
  //         message.error({
  //           content:
  //             val?.data?.responseBody?.errormessage ||
  //             "Something went wrong please try again!",
  //           className: "custom-msg",
  //           duration: 2,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       setIsLoading(false);
  //     });
  // }

  const getCheckPANdetails = ()=>{
    let values = form.getFieldsValue();
    setIsLoading(true);
    setIsPANStatus(false);
    let response = apiCalls.getCheckPANdetails(values?.PANNumber,customerData?.policyNo);
    response
      .then((val) => {
        if (val?.data?.responseBody?.errorcode!=="1") {
          const res = val?.data?.responseBody;
            form.setFieldsValue({
              PANValidationStatus: res?.description,
              NameinPAN: res?.firstName + ' ' + res?.middleName +  ' ' + res?.lastName,
            })
            if(isShowPOSScreen&& selectedSubType==="absoluteconditionalassignment"){ //Added by sayali on 17-07-2025 absoluteassignment name changes as absoluteconditionalassignment
              AssignmentData[selectedSubType]?.POS_Details?.forEach(element => {
                if(element?.label === "Name Match"){
                  element.disabled= false;
                 renderDetailsForm("POS_Details");
                }
              });
            }
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setIsPANStatus(true);
          form.setFieldsValue({
            PANValidationStatus: val?.data?.responseBody?.errormessage
          })
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


  const onBlurInput = (value,item)=>{
    if(item?.name ==="PolicyOwnerClientID_New"){
      getClientEnquiry(value,"true");
     }
    
    if(item.name ==="PINCode_Old"){
      form.setFieldsValue({
        City_Old:'',
        State_Old:'',
      })
     }
    if(item.name ==="PINCode_Old" && value && value.length ===6){
      searchLocationn(value)
    }
    const obj = form.getFieldsValue(value)
    if(item.name === "PANNumber" && value.length ===10){
      getCheckPANdetails()
    }
    // if(item.name === "AssigneeCKYCNumber"&& value.length ===14){
    //   CKYCC()
    // }
   
    if(item.name === 'ConfirmBankAccountNumber'  || item.name === 'POSreenteraccountNumber'){
        setCNFBankAccNo(value)
       }else if(item.name === 'BankAccountNumber' || item.name === 'POSAcc_Number_New'){
         setBankAccNo(value)
       }
       if(!isShowPOSScreen){
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
      }else if(value?.length >= 4 &&  item.name === 'BankAccountNumber'){
       const lastFourDigits = obj.BankAccountNumber.slice(-4);
       const maskedString = '*'.repeat(obj.BankAccountNumber.length - 4) + lastFourDigits;
       form.setFieldsValue({BankAccountNumber: maskedString})
      }
    }
        else if(isShowPOSScreen){
          if(obj?.POSreenteraccountNumber?.length >= 4 && item.name === 'POSreenteraccountNumber'){
            if(BankAccNo !== value ){
              message.destroy();
        message.error({
          content:
            "Bank Number Not matched",
          className: "custom-msg",
          duration: 2,
        });
        form.setFieldsValue({POSreenteraccountNumber: ''})
        }
          }else if(obj?.POSAcc_Number_New?.length >= 4 &&  item.name === 'POSAcc_Number_New'){
          const lastFourDigits = obj.POSAcc_Number_New.slice(-4);
          const maskedString = '*'.repeat(obj.POSAcc_Number_New.length - 4) + lastFourDigits;
          form.setFieldsValue({POSAcc_Number_New: maskedString})
         }
        }
  }

      //commonly render all forms
      const renderDetailsForm = (formType) => {
        return (
          <DetailsForm
            data={AssignmentData[selectedSubType]?.[formType]}
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
            disabledTime={disabledTime}
            disabledDate={disabledDate}
            onBlurInput ={onBlurInput }
            getUploadFiles ={getUploadFiles }
            handleLinkValue ={handleLinkValue}
            handleRadioLink = {handleRadioLink}
            handleUploadLink={handleUploadLink}
            requestModeLU={requestModeLU}
            handleEdit={handleEdit}
            handleClientList={handleClientList}
            salutationLU={salutationLU}
            martialStatusLU={martialStatusLU}
            handleLabelLink ={handleLabelLink }
            handleInputChange={handleInputChange}
            bankAccTypeLU={bankAccTypeLU}
          ></DetailsForm>
        );
      };

      const handleEdit = (val,item)=>{
        if(selectedSubType === "absoluteconditionalassignment" || selectedSubType === "reassignment"){ //Added by sayali on 17-07-2025 absoluteassignment name changes as absoluteconditionalassignment
          if(item?.label?.includes("View Client Details") || item?.label?.includes("View Updated Details")){
        if(val==='edit'){
        setIsPosEdited(true)
        AssignmentData[selectedSubType]?.POS_Details?.forEach(element => {
          if(element?.posClientEdit){
            element.disabled = false
          }
        })
        
      }else if(val==='close'){
        setIsPosEdited(true)
        AssignmentData[selectedSubType]?.POS_Details?.forEach(element => {
          if(element?.posClientEdit){
            element.disabled = true
          }
        })
        POSContactData?.serviceRequestTransectionData?.forEach(element => {
          absoluteAssignmentObj[element.tagName] = element.tagValue
        });
        form.setFieldsValue({
          ExistingClient: absoluteAssignmentObj?.ExistingClient,
          custRole: absoluteAssignmentObj?.custRole,
          srvReqID: absoluteAssignmentObj?.srvReqRefNo,
          AssignorName: details?.policyDetailsObj?.identifiers?.po_Name,
          AssigneeName: absoluteAssignmentObj?.PolicyOwnerName_New,
          AssigneeFirstName: absoluteAssignmentObj?.PolicyOwnerFirstName_New,
          AssigneeLastName: absoluteAssignmentObj?.PolicyOwnerLastName_New,
          AssignmentCondition_New: absoluteAssignmentObj?.AssignmentCondition_New,
          AssigneeCKYCNo: absoluteAssignmentObj?.AssigneeCKYCNumber,
          PolicyBondSubmitted: absoluteAssignmentObj?.PolicyBondSubmitted,
          ValidateSignature:absoluteAssignmentObj?.ValidateSignature,
          CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
          BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
          ReasonForDelay: POSContactData?.reasonDelayed,
          RequestorComments:absoluteAssignmentObj?.RequestorComments === undefined ? absoluteAssignmentObj?.Comments: absoluteAssignmentObj?.RequestorComments,
          AssigneeDOB: absoluteAssignmentObj?.AssigneeDOB ? dayjs(absoluteAssignmentObj?.AssigneeDOB, 'DD/MM/YYYY') : absoluteAssignmentObj?.AssigneeDOB,
          AddressLine1:absoluteAssignmentObj?.AddressLine1,
          AddressLine2:absoluteAssignmentObj?.AddressLine2,
          AddressLine3:absoluteAssignmentObj?.AddressLine3,
          PINCode_Old:absoluteAssignmentObj?.PINCode_Old,
          City_Old:absoluteAssignmentObj?.City_Old,
          State_Old:absoluteAssignmentObj?.State_Old,
          AssigneeMobileNo:absoluteAssignmentObj?.AssigneeMobileNo,
          AssigneeEmailID:absoluteAssignmentObj?.AssigneeEmailID,
          PANNumber: absoluteAssignmentObj?.PANNumber,
          NameinPANN: absoluteAssignmentObj?.NameinPAN,
          PANValidationStatus: absoluteAssignmentObj?.PANValidationStatus,
          NameMatch: absoluteAssignmentObj?.NameMatch,
          requestchannel: POSContactData?.reqMode,
          NewOwnerClientID: absoluteAssignmentObj?.NewOwnerClientID,
          Salutation: absoluteAssignmentObj?.Salutation,
          MaritialStatus: absoluteAssignmentObj?.MaritialStatus,
          BankIFSC: absoluteAssignmentObj?.BankIFSC,
          BankName: absoluteAssignmentObj?.BankName,
          BranchName:absoluteAssignmentObj.BranchName,
          AccountType: isNaN(parseInt(absoluteAssignmentObj?.AccountType)) ? absoluteAssignmentObj?.AccountType : parseInt(absoluteAssignmentObj?.AccountType),
          NameAsMentionedInTheBank: absoluteAssignmentObj?.NameAsMentionedInTheBank,
          BankAccountNumber: absoluteAssignmentObj?.BankAccountNumber,
          InitiatePennyDrop: absoluteAssignmentObj?.InitiatePennyDrop,
          NameasperPennyDrop: absoluteAssignmentObj?.NameasperPennyDrop,
          NamematchasperPennyDrop: absoluteAssignmentObj?.NamematchasperPennyDrop,
          
        });
      }
            }
          else if(item?.label?.includes("View Contact & Personal Details")){
      if(val==='edit'){
             setIsPosEdited(true)
             AssignmentData[selectedSubType]?.POS_Details?.forEach(element => {
               if(element?.posEdit){
                 element.disabled = false
               }
             })
             
           }else if(val==='close'){
             setIsPosEdited(true)
             AssignmentData[selectedSubType]?.POS_Details?.forEach(element => {
               if(element?.posEdit){
                 element.disabled = true
               }
             })
             POSContactData?.serviceRequestTransectionData?.forEach(element => {
               absoluteAssignmentObj[element.tagName] = element.tagValue
             });
             form.setFieldsValue({
               ExistingClient: absoluteAssignmentObj?.ExistingClient,
               custRole: absoluteAssignmentObj?.custRole,
               srvReqID: absoluteAssignmentObj?.srvReqRefNo,
               AssignorName: details?.policyDetailsObj?.identifiers?.po_Name,
               AssigneeName: absoluteAssignmentObj?.PolicyOwnerName_New,
               AssigneeFirstName: absoluteAssignmentObj?.PolicyOwnerFirstName_New,
               AssigneeLastName: absoluteAssignmentObj?.PolicyOwnerLastName_New,
               AssignmentCondition_New: absoluteAssignmentObj?.AssignmentCondition_New,
               AssigneeCKYCNo: absoluteAssignmentObj?.AssigneeCKYCNumber,
               PolicyBondSubmitted: absoluteAssignmentObj?.PolicyBondSubmitted,
               ValidateSignature:absoluteAssignmentObj?.ValidateSignature,
               CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
               BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
               ReasonForDelay: POSContactData?.reasonDelayed,
               RequestorComments:absoluteAssignmentObj?.RequestorComments === undefined ? absoluteAssignmentObj?.Comments: absoluteAssignmentObj?.RequestorComments,
               AssigneeDOB: absoluteAssignmentObj?.AssigneeDOB ? dayjs(absoluteAssignmentObj?.AssigneeDOB, 'DD/MM/YYYY') : absoluteAssignmentObj?.AssigneeDOB,
               AddressLine1:absoluteAssignmentObj?.AddressLine1,
               AddressLine2:absoluteAssignmentObj?.AddressLine2,
               AddressLine3:absoluteAssignmentObj?.AddressLine3,
               PINCode_Old:absoluteAssignmentObj?.PINCode_Old,
               City_Old:absoluteAssignmentObj?.City_Old,
               State_Old:absoluteAssignmentObj?.State_Old,
               AssigneeMobileNo:absoluteAssignmentObj?.AssigneeMobileNo,
               AssigneeEmailID:absoluteAssignmentObj?.AssigneeEmailID,
               PANNumber: absoluteAssignmentObj?.PANNumber,
               NameinPANN: absoluteAssignmentObj?.NameinPAN,
               PANValidationStatus: absoluteAssignmentObj?.PanValidation,
               NameMatch: absoluteAssignmentObj?.NameMatch,
               requestchannel: POSContactData?.reqMode,
               NewOwnerClientID: absoluteAssignmentObj?.NewOwnerClientID,
               Salutation: absoluteAssignmentObj?.Salutation,
               MaritialStatus: absoluteAssignmentObj?.MaritialStatus,
               BankIFSC: absoluteAssignmentObj?.BankIFSC,
               BankName: absoluteAssignmentObj?.BankName,
               BranchName:absoluteAssignmentObj.BranchName,
               AccountType: isNaN(parseInt(absoluteAssignmentObj?.AccountType)) ? absoluteAssignmentObj?.AccountType : parseInt(absoluteAssignmentObj?.AccountType),
               NameAsMentionedInTheBank: absoluteAssignmentObj?.NameAsMentionedInTheBank,
               BankAccountNumber: absoluteAssignmentObj?.BankAccountNumber,
               InitiatePennyDrop: absoluteAssignmentObj?.InitiatePennyDrop,
               NameasperPennyDrop: absoluteAssignmentObj?.NameasperPennyDrop,
               NamematchasperPennyDrop: absoluteAssignmentObj?.NamematchasperPennyDrop,
               
             });
           }
          }
          //Added by sayali on 16/07/2025 for Added nominee details in Assignment
          else if(item?.label?.includes("New Nominee/Appointee Details") )
          {
            if(val == 'edit'){
              setIsEditNominee(true);
            }
            else if(val === 'close'){
              setIsEditNominee(false);
            }
          }
          //end
        //  else if(item?.label?.includes("View Bank Details")){
        //   if(val==='edit'){
        //          setIsPosEdited(true)
        //          AssignmentData[selectedSubType]?.POS_Details?.forEach(element => {
        //            if(element?.posBankEdit){
        //              element.disabled = false
        //            }
        //          })
                 
        //        }else if(val==='close'){
        //          setIsPosEdited(true)
        //          AssignmentData[selectedSubType]?.POS_Details?.forEach(element => {
        //            if(element?.posBankEdit){
        //              element.disabled = true
        //            }
        //          })
        //          POSContactData?.serviceRequestTransectionData?.forEach(element => {
        //            absoluteAssignmentObj[element.tagName] = element.tagValue
        //          });
        //          form.setFieldsValue({
        //            ExistingClient: absoluteAssignmentObj?.ExistingClient,
        //            custRole: absoluteAssignmentObj?.custRole,
        //            srvReqID: absoluteAssignmentObj?.srvReqRefNo,
        //            AssignorName: details?.policyDetailsObj?.identifiers?.po_Name,
        //            AssigneeName: absoluteAssignmentObj?.PolicyOwnerName_New,
        //            AssigneeFirstName: absoluteAssignmentObj?.PolicyOwnerFirstName_New,
        //            AssigneeLastName: absoluteAssignmentObj?.PolicyOwnerLastName_New,
        //            AssignmentCondition_New: absoluteAssignmentObj?.AssignmentCondition_New,
        //            AssigneeCKYCNo: absoluteAssignmentObj?.AssigneeCKYCNumber,
        //            PolicyBondSubmitted: absoluteAssignmentObj?.PolicyBondSubmitted,
        //            ValidateSignature:absoluteAssignmentObj?.ValidateSignature,
        //            CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
        //            BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
        //            ReasonForDelay: POSContactData?.reasonDelayed,
        //            RequestorComments:absoluteAssignmentObj?.RequestorComments === undefined ? absoluteAssignmentObj?.Comments: absoluteAssignmentObj?.RequestorComments,
        //          //  AssigneeDOB: absoluteAssignmentObj?.AssigneeDOB ? dayjs(absoluteAssignmentObj?.AssigneeDOB, 'DD/MM/YYYY') : absoluteAssignmentObj?.AssigneeDOB,
        //            AddressLine1:absoluteAssignmentObj?.AddressLine1,
        //            AddressLine2:absoluteAssignmentObj?.AddressLine2,
        //            AddressLine3:absoluteAssignmentObj?.AddressLine3,
        //            PINCode_Old:absoluteAssignmentObj?.PINCode_Old,
        //            City_Old:absoluteAssignmentObj?.City_Old,
        //            State_Old:absoluteAssignmentObj?.State_Old,
        //            AssigneeMobileNo:absoluteAssignmentObj?.AssigneeMobileNo,
        //            AssigneeEmailID:absoluteAssignmentObj?.AssigneeEmailID,
        //            PANNumber: absoluteAssignmentObj?.PANNumber,
        //            NameinPANN: absoluteAssignmentObj?.NameinPAN,
        //            PANValidationStatus: absoluteAssignmentObj?.PanValidation,
        //            NameMatch: absoluteAssignmentObj?.NameMatch,
        //            requestchannel: POSContactData?.reqMode,
        //            NewOwnerClientID: absoluteAssignmentObj?.NewOwnerClientID,
        //            Salutation: absoluteAssignmentObj?.Salutation,
        //            MaritialStatus: absoluteAssignmentObj?.MaritialStatus,
        //            BankIFSC: absoluteAssignmentObj?.BankIFSC,
        //            BankName: absoluteAssignmentObj?.BankName,
        //            BranchName:absoluteAssignmentObj.BranchName,
        //            AccountType: isNaN(parseInt(absoluteAssignmentObj?.AccountType)) ? absoluteAssignmentObj?.AccountType : parseInt(absoluteAssignmentObj?.AccountType),
        //            NameAsMentionedInTheBank: absoluteAssignmentObj?.NameAsMentionedInTheBank,
        //            BankAccountNumber: absoluteAssignmentObj?.BankAccountNumber,
        //            InitiatePennyDrop: absoluteAssignmentObj?.InitiatePennyDrop,
        //            NameasperPennyDrop: absoluteAssignmentObj?.NameasperPennyDrop,
        //            NamematchasperPennyDrop: absoluteAssignmentObj?.NamematchasperPennyDrop,
                   
        //          });
        //        }
        //      }
        }
        else if(selectedSubType === "reassignment"){
          if(val == 'edit'){
            setIsEditNominee(true);
          }
          else if(val === 'close'){
            setIsEditNominee(false);
          }
        }
      }

      const toggleInputField = (field, item, index) => {
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

 
      const convertDate = (inputDate) => {
        if(inputDate){
          const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
          return formattedDate;
        }else{
          return ''
        }
     
      };
      const disabledDate = (current) => {
        return current && current > dayjs().endOf("day"); // Can not select days before today and today
      };

      const getUploadFiles=(listOfUploadFiles)=>{
        // const updatedUploadList = listOfUploadFiles?.map((obj) => {
        //   // Create a new object without the propertyToDelete property
        //   const { labelName, ...newObject } = obj;
        //   return newObject;
        // });
        // Merge the new list with the existing one
        const PreviouslyFiles = [...uploadFiles, ...listOfUploadFiles]; // Commenting This line bez, adding Duplicate Files Upload like, 1,12,123..       
        // Update the state with the new list
        setUploadFiles([...docIdProofs, ...listOfUploadFiles]);
    
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
            setUploadFiles(listOfUploadFiles);
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
              //setUploadFiles(file);
              setDocIdProofs([{...newDocumentObj}]);
              if(idProofUpload === "idProofUpload"){
                if(label?.includes("Copy of Aadhar Card")){
                  setAAdharIDUploadFiles([{...newDocumentObj}]);
                  setDocIdProofs([{...newDocumentObj}]);
                  setUploadIDMultipleFiles([{...newDocumentObj}]);
                }
                else if(label?.includes("Copy of Passport")){
                  setPassportIDUploadFiles([{...newDocumentObj}]);
                  setDocIdProofs([{...newDocumentObj}]);
                  setUploadIDMultipleFiles([{...newDocumentObj}]);
                }
                else if(label?.includes("Copy of Ration Card")){
                  setRationCardIDUploadFiles([{...newDocumentObj}]);
                  setDocIdProofs([{...newDocumentObj}]);
                  setUploadIDMultipleFiles([{...newDocumentObj}]);
                }
                else if(label?.includes("Copy of Driving License")){
                  setDrivingIDUploadFiles([{...newDocumentObj}]);
                  setDocIdProofs([{...newDocumentObj}]);
                  setUploadIDMultipleFiles([{...newDocumentObj}]);
                }
                else if(label?.includes("Copy of PAN Card")){
                  setPancardIDUploadFiles([{...newDocumentObj}])
                  setDocIdProofs([{...newDocumentObj}]);
                  setUploadIDMultipleFiles([{...newDocumentObj}]);
                }
                else if(label?.includes("Copy of Voter ID")){
                  setVoterIDUploadFiles([{...newDocumentObj}]);
                  setDocIdProofs([{...newDocumentObj}]);
                  setUploadIDMultipleFiles([{...newDocumentObj}]);
                }
              }
              else {
                setDocIdProofs([{...newDocumentObj}]);
              if(label?.includes("Copy of Aadhar Card")){
                setAAdharUploadFiles([{...newDocumentObj}]);
                setDocIdProofs([{...newDocumentObj}]);
                setShowUploadFile(index);
              }
              else if(label?.includes("Require Change in Signature Form duly attested by Bank official")){
                setPassportUploadFiles([{...newDocumentObj}]);
                setDocIdProofs([{...newDocumentObj}]);
                setShowUploadFile(index);
              }
              else if(label?.includes("Copy of Passport")){
                setPassportUploadFiles([{...newDocumentObj}]);
                setDocIdProofs([{...newDocumentObj}]);
                setShowUploadFile(index);
              }
              else if(label?.includes("Copy of Ration Card")){
                setRationCardUploadFiles([{...newDocumentObj}]);
                setDocIdProofs([{...newDocumentObj}]);
                setShowUploadFile(index);
              }
              else if(label?.includes("Copy of Driving License")){
                setDrivingUploadFiles([{...newDocumentObj}]);
                setDocIdProofs([{...newDocumentObj}]);
                setShowUploadFile(index);
              }
              else if(label?.includes("Copy of PAN Card")){
                setPancardUploadFiles([{...newDocumentObj}])
                setDocIdProofs([{...newDocumentObj}]);
                setShowUploadFile(index);
              }
              else if(label?.includes("Copy of Voter ID")){
                setVoterUploadFiles([{...newDocumentObj}]);
                setDocIdProofs([{...newDocumentObj}]);
                setShowUploadFile(index);
              }
              else if(label?.includes("Utility Bill which is not more than 2 months")){
                setUtilityUploadFiles([{...newDocumentObj}]);
                setDocIdProofs([{...newDocumentObj}]);
                setShowUploadFile(index);
              }
              else if(label?.includes("Bank statement/Passbook copy with latest 2 months transactions")){
                setPassbookUploadFiles([{...newDocumentObj}]);
                setDocIdProofs([{...newDocumentObj}]);
                setShowUploadFile(index);
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
      };
    
      const handleRequirementSubmit = () => {
        const formData = form.getFieldValue();
     if(isShowPOSScreen){
          POSActionsOnContactDetails(formData, "REJECTED");
        }else{
          saveRequest(formData);
        }
    
      };

      const getTransactionData = (values) => {
        if (selectedSubType === "absoluteconditionalassignment") { //Added by sayali on 17-07-2025 absoluteassignment name changes as absoluteconditionalassignment
          let ArrayNew= [
            {Status: "Create",TagName: "Client_Id","TagValue": customerData?.poClientID},
            { Status: "Create", TagName: "NewOwnerClientID", TagValue: values?.NewOwnerClientID },
            { Status: "Create", TagName: "Salutation", TagValue: values?.Salutation },
            { Status: "Create", TagName: "MaritialStatus", TagValue: values?.MaritialStatus },
            {
              "Status": "Create",
              "TagName": "AdditionalNoteForCustomer",
              "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",
            },
            { Status: "Create", TagName: "requestchannel", TagValue: values?.requestchannel},
            { Status: "Create", TagName: "PolicyOwnerName_Old", TagValue: values?.PolicyOwnerName_Old ||details?.policyDetailsObj?.identifiers?.po_Name },
            { Status: "Create", TagName: "PolicyOwnerClientID_Old", TagValue: values?.PolicyOwnerClientID_Old || details?.policyDetailsObj?.identifiers?.po_ClientID},
            { Status: "Create", TagName: "AssignmentCondition_Old", TagValue: values?.AssignmentCondition_Old ||""},
            { Status: "Create", TagName: "PolicyOwnerName_New", TagValue: values?.PolicyOwnerName_New || "" },
            { Status: "Create", TagName: "PolicyOwnerFirstName_New", TagValue: values?.PolicyOwnerFirstName_New || "" },
            {
              Status: "Create",
              TagName: "PolicyOwnerLastName_New",
              TagValue: values?.PolicyOwnerLastName_New
                ? values?.PolicyOwnerLastName_New.length === 1
                  ? values?.PolicyOwnerLastName_New + "."
                  : values?.PolicyOwnerLastName_New
                : ""
            },
            { Status: "Create", TagName: "Clientdob", TagValue: convertDate(customerData?.dob) || "" },
            { Status: "Create", TagName: "ExistingClient", TagValue: values?.ExistingClient || "" },

            { Status: "Create", TagName: "AssigneeDOB", TagValue: convertDate(new Date(values?.AssigneeDOB)) || "" },  
            { Status: "Create", TagName: "AddressLine1", TagValue: values?.AddressLine1 || ""},
            { Status: "Create", TagName: "AddressLine2", TagValue: values?.AddressLine2 || ""},
            { Status: "Create", TagName: "AddressLine3", TagValue: values?.AddressLine3 || ""},
            { Status: "Create", TagName: "PINCode_Old", TagValue: values?.PINCode_Old|| "" },
            { Status: "Create", TagName: "City_Old", TagValue: values?.City_Old || "" },
            { Status: "Create", TagName: "State_Old", TagValue: values?.State_Old || "" },
            { Status: "Create", TagName: "AssigneeMobileNo", TagValue: values?.AssigneeMobileNo || "" },
            { Status: "Create", TagName: "AssigneeEmailID", TagValue: values?.AssigneeEmailID || "" },


            { Status: "Create", TagName: "PolicyOwnerClientID_New", TagValue: values?.PolicyOwnerClientID_New || "" },
            { Status: "Create", TagName: "AssignmentCondition_New", TagValue: values?.AssignmentCondition_New || ""},
            { Status: "Create", TagName: "PANNumber", TagValue: values?.PANNumber?.toUpperCase() || ""},
            { Status: "Create", TagName: "PANValidationStatus", TagValue: values?.PANValidationStatus || ""},
            { Status: "Create", TagName: "NameMatch", TagValue: values?.NameMatch || ""},
            { Status: "Create", TagName: "NameinPAN", TagValue: values?.NameinPAN || ""},
            { Status: "Create", TagName: "AssigneeCKYCNumber", TagValue: values?.AssigneeCKYCNumber|| "" },
            { Status: "Create", TagName: "CKYCResult", TagValue: values?.CKYCResult || "" },
            { Status: "Create", TagName: "PolicyBondSubmitted", TagValue: values?.PolicyBondSubmitted || ""},
            { Status: "Create", TagName: "ValidateSignature", TagValue: values?.ValidateSignature|| "" },
            { Status: "Create", TagName: "Comments", TagValue: values?.Comments|| "" },
            {Status: "Create",TagName: "Client_Id","TagValue": customerData?.poClientID},
            {Status: "Create", TagName: "FileType", TagValue: "PROCESSENQUIRY"},
            { Status: "Create", TagName: "DocLink", TagValue:isProcessLink },
            { Status: "Create", TagName: "ProcessLink", TagValue: isDocLink},
            {"Status": "Update","TagName": "BankIFSC", "TagValue":values?.BankIFSC?.toUpperCase() || ""},
            {"Status": "Update","TagName": "BankName", "TagValue":values?.BankName},
            {"tagName":"BranchName","tagValue": values?.BranchName,"status":"Create"},
            {"Status": "Update","TagName": "AccountType","TagValue":values?.AccountType},
            {"Status": "Update","TagName": "NameAsMentionedInTheBank","TagValue":values?.NameAsMentionedInTheBank},
            {"Status": "Update","TagName": "BankAccountNumber","TagValue": BankAccNo || values?.BankAccountNumber},
            {"Status": "Update","TagName": "ConfirmBankAccountNumber","TagValue":values?.ConfirmBankAccountNumber},
            {"Status": "Update","TagName": "PennyDropResult","TagValue":values?.PennyDropResult},
            {"Status": "Update","TagName": "InitiatePennyDrop","TagValue":values?.InitiatePennyDrop},
            {"Status": "Update","TagName": "NameasperPennyDrop","TagValue":values?.NameasperPennyDrop},
            { Status: "Create", TagName: "BankNameMatch", TagValue: values?.BankNameMatch || ""},
          ];
          //Added by sayali on 16/07/2025 for Added nominee details in Assignment
          const properties = [
            "NomineeFirstName_New",
            "NomineeLastName_New",
            "NomineeDOB_New",
            "Share_New",
            "RealtionshipWithPolicyowner_New",
            "Role_New",
            ];
          
            let updatedDataList = [];
            updateNomineeData?.forEach((record, index) => {
              properties.forEach((property) => {
                if (record[property] || record[property] === 0) {
                  let tagValue = record[property];
                  if (property.includes("NomineeDOB_New") && record[property]) {
                    const dateValue = new Date(record[property]);
                    if (!isNaN(dateValue.getTime())) 
                      {
                          // Ensure it's a valid date
                      tagValue = moment(dateValue).format("DD/MM/YYYY");
                      }
                      }
                      // if (property.includes("NomineeDOB_New")) {
                      //   tagValue = moment(record[property]).format("DD/MM/YYYY");
                      // }
          
                      if (
                        property === "NomineeLastName_New" &&
                        typeof tagValue === "string"
                      ) {
                        tagValue = tagValue.length === 1 ? tagValue + "." : tagValue;
                      }
          
                      updatedDataList.push({
                        Status: "Create",
                        TagName: `${property}_${index + 1}`,
                        TagValue: tagValue,
                      });
                }
              });
            });
            return [...ArrayNew,...updatedDataList];
            //end
        }
        if (selectedSubType === "reassignment") {
          let newArray =
          [
            {Status: "Create",TagName: "Client_Id","TagValue": customerData?.poClientID},
            { Status: "Create", TagName: "AssigneeName", TagValue: values?.AssigneeName || "" },
            { Status: "Create", TagName: "AssignmentCondition_Old", TagValue: values?.AssignmentCondition_Old || "" },
            { Status: "Create", TagName: "PolicyOwnerClientID_Old", TagValue: values?.PolicyOwnerClientID_Old || "" },
            { Status: "Create", TagName: "PastOwnerName", TagValue: values?.PastOwnerName || "" },
            { Status: "Create", TagName: "PastOwnerClientID", TagValue: values?.PastOwnerClientID || "" },

            { Status: "Create", TagName: "NewOwnerClientID", TagValue: values?.NewOwnerClientID },
            { Status: "Create", TagName: "Salutation", TagValue: values?.Salutation },
            { Status: "Create", TagName: "MaritialStatus", TagValue: values?.MaritialStatus },
            { Status: "Create", TagName: "PolicyOwnerFirstName_New", TagValue: values?.PolicyOwnerFirstName_New || "" },
            {
              Status: "Create",
              TagName: "PolicyOwnerLastName_New",
              TagValue: values?.PolicyOwnerLastName_New
                ? values?.PolicyOwnerLastName_New.length === 1
                  ? values?.PolicyOwnerLastName_New + "."
                  : values?.PolicyOwnerLastName_New
                : ""
            },
            {
              "Status": "Create",
              "TagName": "AdditionalNoteForCustomer",
              "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",
            },
            { Status: "Create", TagName: "AssigneeDOB", TagValue: convertDate(new Date(values?.AssigneeDOB)) || "" },  
            { Status: "Create", TagName: "AssignmentCondition_New", TagValue: values?.AssignmentCondition_New || "" },
         
            { Status: "Create", TagName: "AddressLine1", TagValue: values?.AddressLine1 || ""},
            { Status: "Create", TagName: "AddressLine2", TagValue: values?.AddressLine2 || ""},
            { Status: "Create", TagName: "AddressLine3", TagValue: values?.AddressLine3 || ""},
            { Status: "Create", TagName: "PINCode_Old", TagValue: values?.PINCode_Old|| "" },
            { Status: "Create", TagName: "City_Old", TagValue: values?.City_Old || "" },
            { Status: "Create", TagName: "State_Old", TagValue: values?.State_Old || "" },
            { Status: "Create", TagName: "AssigneeMobileNo", TagValue: values?.AssigneeMobileNo || "" },
            { Status: "Create", TagName: "AssigneeEmailID", TagValue: values?.AssigneeEmailID || "" },
            { Status: "Create", TagName: "PANNumber", TagValue: values?.PANNumber?.toUpperCase() || ""},
            { Status: "Create", TagName: "PANValidationStatus", TagValue: values?.PANValidationStatus || ""},
            { Status: "Create", TagName: "NameMatch", TagValue: values?.NameMatch || ""},
            { Status: "Create", TagName: "NameinPAN", TagValue: values?.NameinPAN || ""},
            {"Status": "Update","TagName": "BankIFSC", "TagValue":values?.BankIFSC?.toUpperCase() || ""},
            {"Status": "Update","TagName": "BankName", "TagValue":values?.BankName},
            {"tagName":"BranchName","tagValue": values?.BranchName,"status":"Create"},
            {"Status": "Update","TagName": "AccountType","TagValue":values?.AccountType},
            {"Status": "Update","TagName": "NameAsMentionedInTheBank","TagValue":values?.NameAsMentionedInTheBank},
            {"Status": "Update","TagName": "BankAccountNumber","TagValue":BankAccNo || values?.BankAccountNumber},
            {"Status": "Update","TagName": "ConfirmBankAccountNumber","TagValue":values?.ConfirmBankAccountNumber},
            {"Status": "Update","TagName": "PennyDropResult","TagValue":values?.PennyDropResult},
            {"Status": "Update","TagName": "InitiatePennyDrop","TagValue":values?.InitiatePennyDrop},
            {"Status": "Update","TagName": "NameasperPennyDrop","TagValue":values?.NameasperPennyDrop},
            { Status: "Create", TagName: "BankNameMatch", TagValue: values?.BankNameMatch || ""},
            { Status: "Create", TagName: "requestchannel", TagValue: values?.requestchannel},
            { Status: "Create", TagName: "CKYCNunber", TagValue: values?.CKYCNunber || "" },
            { Status: "Create", TagName: "ValidateSignature", TagValue: values?.ValidateSignature || ""},
            { Status: "Create", TagName: "Comments", TagValue: values?.Comments || ""},
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
            // Iterate over each record in the updateNomineeData array
            existingNomineeData?.forEach((record, recordIndex) => {
              // Iterate over properties and create objects for each record
              oldProperties.forEach((property, propertyIndex) => {
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
            "ClientID_New",
            "NomineeFirstName_New",
            "NomineeLastName_New",
            "NomineeDOB_New",
            "Share_New",
            "RealtionshipWithPolicyowner_New",
            "Role_New"
          ];
          
          // Initialize an array to store the updated data
          let updatedDataList = [];
          
          // Iterate over each record in the updateNomineeData array
          updateNomineeData?.forEach((record, recordIndex) => {
            // Iterate over properties and create objects for each record
            properties.forEach((property, propertyIndex) => {
              if (record[property]) {
                let obj = {
                  Status: "Create",
                  TagName: `${property}_${recordIndex + 1}`,
                  TagValue: property?.includes("NomineeDOB_New") ? moment(record[property] + 1).format("DD/MM/YYYY") : record[property]
                };
          
                updatedDataList.push(obj);
              }
            });
          });
          // Use the spread operator to concatenate the newArray to the updatedDataList
          updatedDataList = [...updatedDataList, ...ExistingDataList,...newArray];
          // Now updatedDataList contains separate objects for each property in each record
          return updatedDataList;
          
          
        }
      };

      const handleSubmit = (values) => {debugger
        if(checkedList?.includes("Share Process Communication")&&!isShowPOSScreen&&!showEmailFields){
          message.destroy();
          message.error({
            content:
              "Please select atleast one communication.",
            className: "custom-msg",
            duration: 2,
          });
         }
       else {
         //POSApprove RaiseRequirement
         if (POSContactData && customerData?.isPOS) {
          POSActionsOnContactDetails(values, "APPROVED");
    } else {
      // if (values?.ValidateSignature === "no") {
      //   getRaiseRequirements();
      // } else {
        saveRequest(values);
      //}
    }
       }
      }

  const saveRequest =(values)=>{
    if(values?.customersigningdate > values?.branchreceiveddate){
        message.destroy();
        message.error({
          content: " customer signing date  can't be greater than  Request Received Date.",
          className: "custom-msg",
          duration: 3,
        });
        form.setFieldsValue({
          customersigningdate: "",
          customersigningdate:""
        })
         setIsLoader(false);
        return
      }
    const uniqueFilesSet = new Set();
    const newFilesArray = [];
    if (uploadFiles?.length > 0) {
      uploadFiles.forEach(file => uniqueFilesSet.add(file));
    }
    // if (uploadMultipleFiles?.length > 0) {
    //   uploadMultipleFiles.forEach(file => uniqueFilesSet.add(file));
    // }
    
    // if (uploadIDMultipleFiles?.length > 0) {
    //   uploadIDMultipleFiles.forEach(file => uniqueFilesSet.add(file));
    // }

    if (aadharIDUploadFiles.length > 0){
      aadharIDUploadFiles.forEach(file => uniqueFilesSet.add(file));
    }

    if (rationCardIDUploadFiles.length > 0){
      rationCardIDUploadFiles.forEach(file => uniqueFilesSet.add(file));
    }

    if (DrivingIDUploadFiles.length > 0){
      DrivingIDUploadFiles.forEach(file => uniqueFilesSet.add(file));
    }

    if (voterIDUploadFiles.length > 0){
      voterIDUploadFiles.forEach(file => uniqueFilesSet.add(file));
    }

    if (pancardIDUploadFiles.length > 0){
      pancardIDUploadFiles.forEach(file => uniqueFilesSet.add(file));
    }

    if (passportIDUploadFiles.length > 0){
      passportIDUploadFiles.forEach(file => uniqueFilesSet.add(file));
    }
    newFilesArray.push(...uniqueFilesSet);
    setIsLoading(true);
    setShowAlert(false);
    //Added by sayali on 16/07/2025 for Added nominee details in Assignment
    if(values?.AssignmentCondition_New === 'loveaffection')
    {
      var ReceipientTo= import.meta.env.VITE_APP_RECEIPIENT_TO ? import.meta.env.VITE_APP_RECEIPIENT_TO : values.AssigneeEmailID;
      var ReceipientCC= import.meta.env.VITE_APP_RECEIPIENT_CC ? import.meta.env.VITE_APP_RECEIPIENT_CC : values.AssigneeEmailID;
      var MobileNos = import.meta.env.VITE_APP_RECEIPIENT_MOBILENO ? import.meta.env.VITE_APP_RECEIPIENT_MOBILENO : values.AssigneeMobileNo;
    }
    else{
        var ReceipientTo=import.meta.env.VITE_APP_RECEIPIENT_TO ? import.meta.env.VITE_APP_RECEIPIENT_TO : clientEnquiryData?.rinternet;
        var  ReceipientCC=import.meta.env.VITE_APP_RECEIPIENT_CC ? import.meta.env.VITE_APP_RECEIPIENT_CC : clientEnquiryData?.rinternet;
        var MobileNos=import.meta.env.VITE_APP_RECEIPIENT_MOBILENO ? import.meta.env.VITE_APP_RECEIPIENT_MOBILENO : clientEnquiryData?.rmblphone;
    }
    //end
    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: loginInfo?.userProfileInfo?.profileObj?.role || 0, // Required
      RequestChannel: loginInfo?.userProfileInfo?.profileObj?.role === 14 ? 13 :  values.requestchannel,  // Required
      Category: checkedList?.includes("Share Process Communication") 
      ? 1
       : (checkedList?.includes("Update New Assignment Details") ||  checkedList?.includes("Initiate Reassignment Request") || raiseRequirementOpen)
       ? 2 : 1,
      ApplicationNo:
      details?.policyDetailsObj?.identifiers?.applicationNo ||customerData?.applicationNo,
      DOB: convertDate(customerData?.dob),
      PolicyNo: details?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo, // Required
      CustomerId: values?.GSTINToBeUpdateFor=== 1?  customerData?.laClientID:customerData?.poClientID,
      CustRole: values?.custRole,
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
      RequestDateTime:values?.branchreceiveddate
      ? new Date(values?.branchreceiveddate)
      : new Date(),
      ReasonDelayed: values?.ReasonForDelay || values?.resonfordelay,
      CustSignDateTime: values?.customersigningdate
        ? new Date(values?.customersigningdate)
        : new Date(),
        TransactionData: getTransactionData(values) || [],
        Uploads: newFilesArray,
        CurrentStatus:raiseRequirementOpen? "Reject":'',
        CommunicationRequest: [
          {
            SrvReqRefNo: "",
            TemplateID: "",
            CommType: 2,
            //Added by sayali on 16/07/2025 for Added nominee details in Assignment
            ReceipientTo:ReceipientTo,
            ReceipientCC:ReceipientCC,
            // ReceipientTo:  import.meta.env.VITE_APP_RECEIPIENT_TO ? import.meta.env.VITE_APP_RECEIPIENT_TO : clientEnquiryData?.rinternet,
            // ReceipientCC: import.meta.env.VITE_APP_RECEIPIENT_CC ? import.meta.env.VITE_APP_RECEIPIENT_CC : clientEnquiryData?.rinternet,
            //END
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
            //Added by sayali on 16/07/2025 for Added nominee details in Assignment
            MobileNos:MobileNos,
            // MobileNos: import.meta.env.VITE_APP_RECEIPIENT_MOBILENO ? import.meta.env.VITE_APP_RECEIPIENT_MOBILENO : clientEnquiryData?.rmblphone,
            //end
            ScheduledTime: new Date(),
            CommBody: "",
            Attachments: null,
          },
        ],
    };

    // if(values?.Validate_Signature === 'no'){
      if(raiseRequirementOpen){
        let reqFormValues = requirementsForm?.getFieldsValue();
      let ids = raiseRequerimentList?.filter((e) => e.status === true)?.map((e) => e.raiseReqId)
      obj.TransactionData.push({
        "Status": "Create",
        "TagName": "ReasonList_Key",
        "TagValue":  JSON.stringify(ids)
      })
      if(!isShowPOSScreen){
        obj.TransactionData.push({
          "Status": "Create",
          "TagName": "AddAnyOtherRequirements",
          "TagValue": reqFormValues?.addotherReq || ""
        });
      }
      if(ids?.length===0 && !props?.EmailResponse?.IsEmailmanagent){
              message.error({
                content: "Please Select Documents to Reject",
                className: "custom-msg",
                duration: 3,
              });
              setIsLoader(false);
              setRequirementLoader(false);
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
          setAlertTitle(val?.data?.header);
          setAlertData(val?.data?.message);
          setShowAlert(true);
          setIsLoader(false);
          //   return
          // }
          //   setServiceRequestId(val?.data?.srvReqRefNo);
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

  const getPOSTransactionData = (values) => {
    if (selectedSubType === "reassignment") {
      let newArray =
      [
            { Status: "Update", TagName: "ReAssignmentDone", TagValue: values?.ReAssignmentDone || "" },
            {Status: "Create",TagName: "Client_Id","TagValue": customerData?.poClientID},
            { Status: "Update", TagName: "AssigneeName", TagValue: values?.AssigneeName },
            { Status: "Update", TagName: "AssignmentCondition_Old", TagValue: values?.AssignmentCondition_Old },
            { Status: "Update", TagName: "PolicyOwnerClientID_Old", TagValue: values?.PolicyOwnerClientID_Old },
            { Status: "Update", TagName: "PastOwnerName", TagValue: values?.PastOwnerName },
            { Status: "Update", TagName: "PastOwnerClientID", TagValue: values?.PastOwnerClientID },
            { Status: "Update", TagName: "NewOwnerClientID", TagValue: values?.NewOwnerClientID },
            { Status: "Update", TagName: "Salutation", TagValue: values?.Salutation },
            { Status: "Update", TagName: "MaritialStatus", TagValue: values?.MaritialStatus },
            {
              "Status": "Update",
              "TagName": "AdditionalNoteForCustomer",
              "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",
            },
            { Status: "Update", TagName: "requestchannel", TagValue: values?.requestchannel},
            { Status: "Update", TagName: "PolicyOwnerName_Old", TagValue: values?.PolicyOwnerName_Old ||details?.policyDetailsObj?.identifiers?.po_Name },
            { Status: "Update", TagName: "PolicyOwnerClientID_Old", TagValue: values?.PolicyOwnerClientID_Old || details?.policyDetailsObj?.identifiers?.po_ClientID},
            { Status: "Update", TagName: "AssignmentCondition_Old", TagValue: values?.AssignmentCondition_Old ||""},
            { Status: "Update", TagName: "PolicyOwnerName_New", TagValue: values?.PolicyOwnerName_New || "" },
            { Status: "Update", TagName: "PolicyOwnerFirstName_New", TagValue: values?.PolicyOwnerFirstName_New || "" },
            {
              Status: "Update",
              TagName: "PolicyOwnerLastName_New",
              TagValue: values?.PolicyOwnerLastName_New
                ? values?.PolicyOwnerLastName_New.length === 1
                  ? values?.PolicyOwnerLastName_New + "."
                  : values?.PolicyOwnerLastName_New
                : ""
            },
            { Status: "Update", TagName: "Clientdob", TagValue: convertDate(customerData?.dob) || "" },
            { Status: "Update", TagName: "ExistingClient", TagValue: values?.ExistingClient || "" },
    
            { Status: "Update", TagName: "AssigneeDOB", TagValue: convertDate(new Date(values?.AssigneeDOB)) || "" },  
            { Status: "Update", TagName: "AddressLine1", TagValue: values?.AddressLine1 || ""},
            { Status: "Update", TagName: "AddressLine2", TagValue: values?.AddressLine2 || ""},
            { Status: "Update", TagName: "AddressLine3", TagValue: values?.AddressLine3 || ""},
            { Status: "Update", TagName: "PINCode_Old", TagValue: values?.PINCode_Old|| "" },
            { Status: "Update", TagName: "City_Old", TagValue: values?.City_Old || "" },
            { Status: "Update", TagName: "State_Old", TagValue: values?.State_Old || "" },
            { Status: "Update", TagName: "AssigneeMobileNo", TagValue: values?.AssigneeMobileNo || "" },
            { Status: "Update", TagName: "AssigneeEmailID", TagValue: values?.AssigneeEmailID || "" },
            { Status: "Update", TagName: "PolicyOwnerClientID_New", TagValue: values?.PolicyOwnerClientID_New || "" },
            { Status: "Update", TagName: "AssignmentCondition_New", TagValue: values?.AssignmentCondition_New || ""},
            { Status: "Update", TagName: "PANNumber", TagValue: values?.PANNumber?.toUpperCase() || ""},
            { Status: "Update", TagName: "PANValidationStatus", TagValue: values?.PANValidationStatus || ""},
            { Status: "Update", TagName: "NameMatch", TagValue: values?.NameMatch || ""},
            { Status: "Update", TagName: "NameinPAN", TagValue: values?.NameinPAN || ""},
            { Status: "Update", TagName: "AssigneeCKYCNumber", TagValue: values?.AssigneeCKYCNumber|| "" },
            { Status: "Update", TagName: "CKYCResult", TagValue: values?.CKYCResult || "" },
            { Status: "Update", TagName: "PolicyBondSubmitted", TagValue: values?.PolicyBondSubmitted || ""},
            { Status: "Update", TagName: "ValidateSignature", TagValue: values?.ValidateSignature|| "" },
            { Status: "Update", TagName: "Comments", TagValue: values?.Comments|| "" },
            {Status: "Update",TagName: "Client_Id","TagValue": customerData?.poClientID},
            {Status: "Update", TagName: "FileType", TagValue: "PROCESSENQUIRY"},
            { Status: "Update", TagName: "DocLink", TagValue:isProcessLink },
            { Status: "Update", TagName: "ProcessLink", TagValue: isDocLink},
            {"Status": "Update","TagName": "BankIFSC", "TagValue":values?.BankIFSC?.toUpperCase() || ""},
            {"Status": "Update","TagName": "BankName", "TagValue":values?.BankName},
            {"tagName":"BranchName","tagValue": values?.BranchName,"status":"Create"},
            {"Status": "Update","TagName": "AccountType","TagValue":values?.AccountType},
            {"Status": "Update","TagName": "NameAsMentionedInTheBank","TagValue":values?.NameAsMentionedInTheBank},
            {"Status": "Update","TagName": "BankAccountNumber","TagValue":values?.BankAccountNumber},
            {"Status": "Update","TagName": "ConfirmBankAccountNumber","TagValue":values?.ConfirmBankAccountNumber},
            {"Status": "Update","TagName": "PennyDropResult","TagValue":values?.PennyDropResult},
            {"Status": "Update","TagName": "InitiatePennyDrop","TagValue":values?.InitiatePennyDrop},
            {"Status": "Update","TagName": "NameasperPennyDrop","TagValue":values?.NameasperPennyDrop},
            { Status: "Update", TagName: "BankNameMatch", TagValue: values?.BankNameMatch || ""},
            {"Status": "Update","TagName": "POSBank_IFSC_New", "TagValue":values?.POSBank_IFSC_New?.toUpperCase() || ""},
            {"Status": "Update","TagName": "POSBank_Name_New", "TagValue":values?.POSBank_Name_New},
            {"tagName":"POSBranch_Name_New","tagValue": values?.POSBranch_Name_New,"status":"Create"},
            {"Status": "Update","TagName": "POSAcc_Type_New","TagValue":values?.POSAcc_Type_New},
            {"Status": "Update","TagName": "POSAcc_HldrName_New","TagValue":values?.POSAcc_HldrName_New},
            {"Status": "Update","TagName": "POSAcc_Number_New","TagValue":  BankAccNo || values?.POSAcc_Number_New},
            {"Status": "Update","TagName": "POSreenteraccountNumber","TagValue":values?.POSreenteraccountNumber},
           // {"Status": "Update","TagName": "PennyDropResult","TagValue":values?.PennyDropResult},
            {"Status": "Update","TagName": "POSPennyDrop","TagValue":values?.POSPennyDrop},
            {"Status": "Update","TagName": "POSNameasperPennyDrop","TagValue":values?.POSNameasperPennyDrop},
            { Status: "Update", TagName: "POSNameMatch", TagValue: values?.POSNameMatch || ""},
        
      ]
      const properties = [
        "NomineeFirstName",
        "NomineeLastName",
        "NomineeDOB",
        "Share",
        "RealtionshipWithPolicyowner",
        "Role"
      ];
      
      // Initialize an array to store the updated data
      let updatedDataList = [];
      
      // Iterate over each record in the updateNomineeData array
      posUpdateNomineeData?.forEach((record, recordIndex) => {
        // Iterate over properties and create objects for each record
        properties.forEach((property, propertyIndex) => {
          if (record[property]) {
            let obj = {
              Status: "Update",
              TagName: `${property}_${"New"}_${recordIndex + 1}`,
              TagValue: property?.includes("NomineeDOB") ? moment(record[property] + 1).format("DD/MM/YYYY") : record[property]
            };
            if(property?.includes("NomineeDOB") && typeof record[property] == "string") {
              obj.TagValue = record[property]
            }
            if(property?.includes("RealtionshipWithPolicyowner")) {
              let recordExist = relationShipLU.find(x => x.label == record[property])
              recordExist && (obj.TagValue = recordExist.value);
            }
            updatedDataList.push(obj);
          }
        });
      });
      // Use the spread operator to concatenate the newArray to the updatedDataList
      updatedDataList = [...updatedDataList, ...newArray];
      // Now updatedDataList contains separate objects for each property in each record
      return updatedDataList;
    }
    else if (selectedSubType === "absoluteconditionalassignment") { //Added by sayali on 17-07-2025 absoluteassignment name changes as absoluteconditionalassignment
      let ArrayDetails=  [
        {Status: "Create",TagName: "Client_Id","TagValue": customerData?.poClientID},
        { Status: "Update", TagName: "NewOwnerClientID", TagValue: values?.NewOwnerClientID },
        { Status: "Update", TagName: "Salutation", TagValue: values?.Salutation },
        { Status: "Update", TagName: "MaritialStatus", TagValue: values?.MaritialStatus },
        {
          "Status": "Update",
          "TagName": "AdditionalNoteForCustomer",
          "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",
        },
        { Status: "Update", TagName: "requestchannel", TagValue: values?.requestchannel},
        { Status: "Update", TagName: "PolicyOwnerName_Old", TagValue: values?.PolicyOwnerName_Old ||details?.policyDetailsObj?.identifiers?.po_Name },
        { Status: "Update", TagName: "PolicyOwnerClientID_Old", TagValue: values?.PolicyOwnerClientID_Old || details?.policyDetailsObj?.identifiers?.po_ClientID},
        { Status: "Update", TagName: "AssignmentCondition_Old", TagValue: values?.AssignmentCondition_Old ||""},
        { Status: "Update", TagName: "PolicyOwnerName_New", TagValue: values?.PolicyOwnerName_New || "" },
        { Status: "Update", TagName: "PolicyOwnerFirstName_New", TagValue: values?.AssigneeFirstName || "" },
        {
          Status: "Update",
          TagName: "PolicyOwnerLastName_New",
          TagValue: values?.AssigneeLastName
            ? values?.AssigneeLastName.length === 1
              ? values?.AssigneeLastName + "."
              : values?.AssigneeLastName
            : ""
        },
        { Status: "Update", TagName: "Clientdob", TagValue: convertDate(customerData?.dob) || "" },
        { Status: "Update", TagName: "ExistingClient", TagValue: values?.ExistingClient || "" },

        { Status: "Update", TagName: "AssigneeDOB", TagValue: convertDate(new Date(values?.AssigneeDOB)) || "" },  
        { Status: "Update", TagName: "AddressLine1", TagValue: values?.AddressLine1 || ""},
        { Status: "Update", TagName: "AddressLine2", TagValue: values?.AddressLine2 || ""},
        { Status: "Update", TagName: "AddressLine3", TagValue: values?.AddressLine3 || ""},
        { Status: "Update", TagName: "PINCode_Old", TagValue: values?.PINCode_Old|| "" },
        { Status: "Update", TagName: "City_Old", TagValue: values?.City_Old || "" },
        { Status: "Update", TagName: "State_Old", TagValue: values?.State_Old || "" },
        { Status: "Update", TagName: "AssigneeMobileNo", TagValue: values?.AssigneeMobileNo || "" },
        { Status: "Update", TagName: "AssigneeEmailID", TagValue: values?.AssigneeEmailID || "" },
        { Status: "Update", TagName: "PolicyOwnerClientID_New", TagValue: values?.PolicyOwnerClientID_New || "" },
        { Status: "Update", TagName: "AssignmentCondition_New", TagValue: values?.AssignmentCondition_New || ""},
        { Status: "Update", TagName: "PANNumber", TagValue: values?.PANNumber?.toUpperCase() || ""},
        { Status: "Update", TagName: "PANValidationStatus", TagValue: values?.PANValidationStatus || ""},
        { Status: "Update", TagName: "NameMatch", TagValue: values?.NameMatch || ""},
        { Status: "Update", TagName: "NameinPAN", TagValue: values?.NameinPAN || ""},
        { Status: "Update", TagName: "AssigneeCKYCNumber", TagValue: values?.AssigneeCKYCNumber|| "" },
        { Status: "Update", TagName: "CKYCResult", TagValue: values?.CKYCResult || "" },
        { Status: "Update", TagName: "PolicyBondSubmitted", TagValue: values?.PolicyBondSubmitted || ""},
        { Status: "Update", TagName: "ValidateSignature", TagValue: values?.ValidateSignature|| "" },
        { Status: "Update", TagName: "Comments", TagValue: values?.Comments|| "" },
        {Status: "Update",TagName: "Client_Id","TagValue": customerData?.poClientID},
        {Status: "Update", TagName: "FileType", TagValue: "PROCESSENQUIRY"},
        { Status: "Update", TagName: "DocLink", TagValue:isProcessLink },
        { Status: "Update", TagName: "ProcessLink", TagValue: isDocLink},
        {"Status": "Update","TagName": "BankIFSC", "TagValue":values?.BankIFSC?.toUpperCase() || ""},
        {"Status": "Update","TagName": "BankName", "TagValue":values?.BankName},
        {"tagName":"BranchName","tagValue": values?.BranchName,"status":"Create"},
        {"Status": "Update","TagName": "AccountType","TagValue":values?.AccountType},
        {"Status": "Update","TagName": "NameAsMentionedInTheBank","TagValue":values?.NameAsMentionedInTheBank},
        {"Status": "Update","TagName": "BankAccountNumber","TagValue":values?.BankAccountNumber},
        {"Status": "Update","TagName": "ConfirmBankAccountNumber","TagValue":values?.ConfirmBankAccountNumber},
        {"Status": "Update","TagName": "PennyDropResult","TagValue":values?.PennyDropResult},
        {"Status": "Update","TagName": "InitiatePennyDrop","TagValue":values?.InitiatePennyDrop},
        {"Status": "Update","TagName": "NameasperPennyDrop","TagValue":values?.NameasperPennyDrop},
        { Status: "Update", TagName: "BankNameMatch", TagValue: values?.BankNameMatch || ""},
        {"Status": "Update","TagName": "POSBank_IFSC_New", "TagValue":values?.POSBank_IFSC_New?.toUpperCase() || ""},
        {"Status": "Update","TagName": "POSBank_Name_New", "TagValue":values?.POSBank_Name_New},
        {"tagName":"POSBranch_Name_New","tagValue": values?.POSBranch_Name_New,"status":"Create"},
        {"Status": "Update","TagName": "POSAcc_Type_New","TagValue":values?.POSAcc_Type_New},
        {"Status": "Update","TagName": "POSAcc_HldrName_New","TagValue":values?.POSAcc_HldrName_New},
        {"Status": "Update","TagName": "POSAcc_Number_New","TagValue":values?.POSAcc_Number_New},
        {"Status": "Update","TagName": "POSreenteraccountNumber","TagValue":values?.POSreenteraccountNumber},
       // {"Status": "Update","TagName": "PennyDropResult","TagValue":values?.PennyDropResult},
        {"Status": "Update","TagName": "POSPennyDrop","TagValue":values?.POSPennyDrop},
        {"Status": "Update","TagName": "POSNameasperPennyDrop","TagValue":values?.POSNameasperPennyDrop},
        { Status: "Update", TagName: "POSNameMatch", TagValue: values?.POSNameMatch || ""},
      ];
      //Added by sayali on 16/07/2025 for Added nominee details in Assignment
      const properties = [
        "NomineeFirstName",
        "NomineeLastName",
        "NomineeDOB",
        "Share",
        "RealtionshipWithPolicyowner",
        "Role"
      ];
      
      // Initialize an array to store the updated data
      let updatedDataList = [];
      
      // Iterate over each record in the updateNomineeData array
      posUpdateNomineeData?.forEach((record, recordIndex) => {
        // Iterate over properties and create objects for each record
        properties.forEach((property, propertyIndex) => {
          if (record[property]) {
            let obj = {
              Status: "Update",
              TagName: `${property}_${"New"}_${recordIndex + 1}`,
              TagValue: property?.includes("NomineeDOB") ? moment(record[property] + 1).format("DD/MM/YYYY") : record[property]
            };
            if(property?.includes("NomineeDOB") && typeof record[property] == "string") {
              obj.TagValue = record[property]
            }
            if(property?.includes("RealtionshipWithPolicyowner")) {
              let recordExist = relationShipLU.find(x => x.label == record[property])
              recordExist && (obj.TagValue = recordExist.value);
            }
            updatedDataList.push(obj);
          }
        });
      });
      return [...ArrayDetails,...updatedDataList]
      //end
    }
    
  };

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
     let reqFormValues = requirementsForm?.getFieldsValue();
    let internalFormValues = internalReqForm?.getFieldsValue();
     if(status !== 'APPROVED'){
      if(((seletedRequerimentList.length===0 && !reqFormValues?.PosOtherReq) && status === 'REJECTED') || ((seletedRequerimentList.length===0 && !internalFormValues?.PosInternalReq)&& status === 'INTERNAL')){
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
      TransactionPayload: getPOSTransactionData(values) || [],
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
    if(props.selectedSubType === 'absoluteconditionalassignment'){ //Added by sayali on 17-07-2025 absoluteassignment name changes as absoluteconditionalassignment
      obj?.TransactionPayload?.push(
        {
          "Status": "Create",
          "TagName": "POSComments1",
          "TagValue": values?.AuthorizerComments ||values?.Comments || ''
        },
        
      )
      if (values?.AreDetailsCorrect == "no") {
        obj.TransactionPayload.push(
          {
            "Status": "Update",
            "TagName": "Bank_IFSC_New",
            "TagValue": values?.POSBank_IFSC_New?.toUpperCase()
          },
          {
            "Status": "Update",
            "TagName": "Bank_Name_New",
            "TagValue": values?.POSBank_Name_New
          },
          {
            "Status": "Update",
            "TagName": "Branch_Name_New",
            "TagValue": values?.POSBranch_Name_New
          },
          {
            "Status": "Update",
            "TagName": "Acc_Type_New",
            "TagValue": values?.POSAcc_Type_New
          },
          {
            "Status": "Update",
            "TagName": "Acc_HldrName_New",
            "TagValue": values?.POSAcc_HldrName_New
          },
          {
            "Status": "Update",
            "TagName": "Acc_Number_New",
            "TagValue": BankAccNo
          },
          {
            "Status": "Update",
            "TagName": "reenteraccountNumber",
            "TagValue": values?.POSreenteraccountNumber
          },
          {
            "Status": "Update",
            "TagName": "PennyDrop",
            "TagValue": values?.POSPennyDrop
          },
          {
            "Status": "Update",
            "TagName": "NameasperPennyDrop",
            "TagValue": values?.POSNameasperPennyDrop
          },
          {
            "Status": "Update",
            "TagName": "NameMatch",
            "TagValue": values?.POSNameMatch
          },
          {
            "Status": "Update",
            "TagName": "Comments",
            "TagValue": values?.Comments || ""
          },
        )
      }
    }
     if(isShowPOSScreen){
      
    obj.TransactionPayload.push({
        "Status": "Create",
        "TagName": "PosOtherReq",
        "TagValue": reqFormValues?.PosOtherReq || ""
      });
    }

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
  
    if (key === 'Backspace' || key.startsWith('Arrow')) {
        return;
    }
  
    // Check if the pressed key matches the allowed pattern
    if (!specialCharacterRegex.test(key)) {
        e.preventDefault(); // Prevent the key from being entered into the input field
    }
  };

  const getRelationsData = async (val,checkItem,consolidatedNewData,clientNumber,nomineePOS) => {
    setIsLoading(true);
    try {
      const response = await apiCalls.getRelationsData(val?.bnysel||clientNumber);
      if (response?.data) {
        const res = response?.data;
        if(checkItem?.includes("Initiate Reassignment Request")||nomineePOS){
          let transformedData = res?.map((item) => ({
           ...item,
           label: item.longdesc,
           value: item.descitem
         }));
         setRelationShipLU(transformedData);
         }
         //Added by sayali on 16/07/2025 for Added nominee details in Assignment
          if(checkItem?.includes("Update New Assignment Details")){
              let transformedData = res?.map((item) => ({
              ...item,
              label: item.longdesc,
              value: item.descitem
            }));
            setRelationShipLU(transformedData);
         }
         //end
        if (checkItem?.includes("View Existing Assignment Details")||
        checkItem?.includes("Initiate Reassignment Request")||checkItem?.includes("Update New Appointee")) {
          let matchingItem = res?.find((item) => item?.descitem === val?.bnyrln);
          let relationValue = matchingItem ? matchingItem.longdesc : null;
          return relationValue;
        }
       else if (
          consolidatedNewData?.length > 0 &&
          selectedSubType === "reassignment" || selectedSubType === "absoluteconditionalassignment"//Added by sayali on 16/07/2025 for Added nominee details in Assignment
        ) {
          // Create a copy of the consolidatedNewData array
          const updatedData = [...consolidatedNewData];
        
          consolidatedNewData?.forEach((relatns, index) => {
            // Find the matching item in the res array based on descitem
            const matchingItem = res?.find((item) => item?.descitem === relatns?.RealtionshipWithPolicyowner);
        
            // Update RealtionshipWithPolicyowner field if a matching item is found
            if (matchingItem) {
              updatedData[index].RealtionshipWithPolicyowner = matchingItem.longdesc;
            }
            if(nomineePOS){
              const newTotalShare = consolidatedNewData?.reduce((sum, nominee) =>
              sum + (nominee.Share ? parseFloat(nominee.Share) : 0) || 0, 0)
             setTotalShare(newTotalShare);
            }
          });
        
          // Set the updated data in the state
          setPosUpdateNomineeData(updatedData);
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
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  
  const getNomineeEnquiry = async (checkItem) => {
    setIsLoading(true);
    try {
      const response = await apiCalls.getNomineeEnquiry(customerData?.policyNo,loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID);
      
      if (response?.data?.responseBody?.errorcode==0) {
        const res = response?.data?.responseBody;
        const nomineeArray = [];
  
        if (res?.nomineeEnquiry?.length > 0) {
          for (const val of res?.nomineeEnquiry) {
            if (val) {
              const dob = await getClientEnquiry(val.bnysel);
              const relationShip = await getRelationsData(val,checkItem);
              if(selectedSubType==="reassignment"){
                const nomineeObj = {
                  NomineeFirstName_Old: val.clientName ? val.clientName?.trim() : val.clientName,
                  NomineeLastName_Old: val.clientName ? val.clientName?.trim() : val.clientName,
                  NomineeDOB_Old: dob,
                  RealtionshipWithPolicyowner_Old: relationShip,
                  Share_Old: val?.bnypc,
                  Role_Old: val?.bnyrln === "AP" ? "Appointee" : "Nominee"
                };
                nomineeArray.push(nomineeObj);
              }
            }
          }
          setExistingNomineeData(nomineeArray);
        }
  
        setNomineeEnquiryData(response?.data?.responseBody);
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
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  
  const getClientEnquiry = async (clientNo,isClientID) => {
    let obj ={
      clientNumber: clientNo
    }
    try {
      const response = await apiCalls.getClientEnquiry(obj,loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID);
      if (response?.data) {
        const res = response?.data?.responseBody;
        form.setFieldsValue({
          PANNumber:  res?.rtaxidnum,
        })
         if(isClientID){
          form.setFieldsValue({
            PolicyOwnerName_New:  res?.lgivname + " " +res?.lsurname,
            PolicyOwnerFirstName_New:  res?.lgivname,
            PolicyOwnerLastName_New:  res?.lsurname,
          })
        }else{
          return res?.clTdob ? convertDate(res.clTdob) : res?.clTdob;
         }
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
      // Handle error
    }
  };


const handlePOSNomineeFirstNameChange = (index, newValue) => {
  setPosUpdateNomineeData(prevData => {
      const newData = [...prevData];
      newData[index] = {
          ...newData[index],
          NomineeFirstName: newValue
      };
      return newData;
  });
};

const handlePOSNomineeLastNameChange = (index, newValue) => {
  setPosUpdateNomineeData(prevData => {
      const newData = [...prevData];
      newData[index] = {
          ...newData[index],
          NomineeLastName: newValue
      };
      return newData;
  });
};

const handlePOSRelationshipChange = (index, value) => {
    
  const updatedData = [...posUpdateNomineeData];
  updatedData[index].RealtionshipWithPolicyowner = value;
  setPosUpdateNomineeData(updatedData);
};
const handlePOSRoleChange = (index, value,row) => {
    
  const updatedData = [...posUpdateNomineeData];
  updatedData[index].Role = value;
  if(value === "appointee"){
    updatedData[index].Share_New = 0;
    form.setFieldsValue({
      updateNomineeData: {
        [row.id]: {
          Share: 0,
        },
      },
    });

    const newTotalShare = updatedData.reduce((sum, nominee) =>
    sum + parseFloat(nominee.Share) || 0, 0);
   setTotalShare(newTotalShare);
  }
  setPosUpdateNomineeData(updatedData);
};
const handlePOSShareChange = (index, newShare) => {
  
  const posUpdatedNomineeData = [...posUpdateNomineeData];
  posUpdatedNomineeData[index].Share = newShare;
  
  // Recalculate the total share
  const newTotalShare = posUpdatedNomineeData.reduce((sum, nominee) =>
   sum + parseFloat(nominee.Share) || 0, 0);
  setTotalShare(newTotalShare);

  // Update the state
  setPosUpdateNomineeData(posUpdatedNomineeData);
};
const handlePOSDobChange = (newDob,index) => {
  const updatedPOSNomineeData = [...posUpdateNomineeData];
  updatedPOSNomineeData[index].NomineeDOB = newDob;
  updatedPOSNomineeData[index].NomineeDOB && isMinor(updatedPOSNomineeData,index)
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

  const handleRelationshipChange = (index, value) => {
    
    const updatedData = [...updateNomineeData];
    updatedData[index].RealtionshipWithPolicyowner_New = value;
    setUpdateNomineeData(updatedData);
  };
  const handleRoleChange = (index, value,row) => {
    
    const updatedData = [...updateNomineeData];
    updatedData[index].Role_New = value;
    if(value === "appointee"){
      updatedData[index].Share_New = 0;
      form.setFieldsValue({
        updateNomineeData: {
          [row.id]: {
            Share_New: 0,
          },
        },
      });
  
      const newTotalShare = updatedData.reduce((sum, nominee) =>
      sum + parseFloat(nominee.Share_New) || 0, 0);
     setTotalShare(newTotalShare);
    }
    // else if(value==="nominee"&&isMinorDOB){
    //   message.error({
    //     content:
    //       "Please Select Appointee only",
    //     className: "custom-msg",
    //     duration: 2,
    //   });
    //   return;
    // }
    // else if(value === "appointee"&&!isMinorDOB){
    //   message.error({
    //     content:
    //       "Please Select Nominee only",
    //     className: "custom-msg",
    //     duration: 2,
    //   });
    //   return;
    // }
    setUpdateNomineeData(updatedData);
  };
  const handleShareChange = (index, newShare) => {
    
    const updatedNomineeData = [...updateNomineeData];
    updatedNomineeData[index].Share_New = newShare;
    
    // Recalculate the total share
    const newTotalShare = updatedNomineeData.reduce((sum, nominee) =>
     sum + parseFloat(nominee.Share_New) || 0, 0);
    setTotalShare(newTotalShare);

    // Update the state
    setUpdateNomineeData(updatedNomineeData);
  };

  const handleDobChange = (newDob,index) => {
    
    const updatedNomineeData = [...updateNomineeData];
    updatedNomineeData[index].NomineeDOB_New = newDob;
    // if(index!==0){
    //   isMinor(updatedNomineeData[index].NomineeDOB_New,updatedNomineeData)
    // }else{
      //setUpdateNomineeData(updatedNomineeData);
    //}

    updatedNomineeData[index].NomineeDOB_New && isMinor(updatedNomineeData,index)
  };

  const isMinor = (nomineeData,index) => {
    const currentDate = new Date();
    const birthDate = new Date(nomineeData[index].NomineeDOB_New);
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if(age < 18 || (age === 18 && monthDiff < 0&&isDOBIndex!==index)){
      nomineeData[index].isMinor= true;
      setIsMinorDOB(true);
      setIsDOBIndex(index);
      // message.warning({
      //   content:
      //     "Proposer Age cannot be less than 18 years",
      //   className: "custom-msg",
      //   duration: 2,
      // });
    }
    else if(age > 18&&isDOBIndex===index){
      nomineeData[index].isMinor= false;
      setIsMinorDOB(false);
      setIsDOBIndex(null);
    }
    setUpdateNomineeData(nomineeData);
    // else{
    //   setUpdateNomineeData(data);
    // }

   // return age < 18 || (age === 18 && monthDiff < 0);
  };


  const handleAddRow = () => {
    
    // Check if the total share is less than 100 before adding a new row
    if (totalShare < 100||isMinorDOB) {
      const newId = updateNomineeData.length + 1;
      const newRow = { id: newId,ClientID_New:"", NomineeFirstName_New: "", NomineeLastName_New: "",  NomineeDOB_New: "", RealtionshipWithPolicyowner_New: null, Share_New: null, Role_New: null,isMinor: false };
  
      // Update the state with the new row
      setUpdateNomineeData([...updateNomineeData, newRow]);
    } else {
      // Display an alert or handle the case where total share is already 100
      message.warning({
        content:
          "Total Share fullfilled. Can't add new nominee.",
        className: "custom-msg",
        duration: 2,
      });
    }
  };

  const handleDeleteRow = (id, index) => {
    ;
    if (updateNomineeData.length > 1) {
      form.setFieldsValue({
        updateNomineeData: {
          [id]: {
            ClientID_New: "",
            NomineeFirstName_New: "",
            NomineeLastName_New: "",
            NomineeDOB_New: "",
            RealtionshipWithPolicyowner_New: null,
            Share_New: 0,
            Role_New: null,
            isMinor: false
          },
        },
      });
      const updatedupdateNomineeData = updateNomineeData.filter((row) => row.id !== id);
      const newTotalShare = updatedupdateNomineeData.reduce((sum, nominee) =>
        sum + parseFloat(nominee.Share_New) || 0, 0);
  
      setTotalShare(newTotalShare);
      setUpdateNomineeData(updatedupdateNomineeData);
    // Reset the form instance to reflect the changes
    form.resetFields([  `updateNomineeData[${index}].ClientID_New`,`updateNomineeData[${index}].NomineeFirstName_New`, `updateNomineeData[${index}].NomineeLastName_New`,  `updateNomineeData[${index}].NomineeDOB_New`, `updateNomineeData[${index}].RealtionshipWithPolicyowner_New`, `updateNomineeData[${index}].Share_New`, `updateNomineeData[${index}].Role_New`]);
    
    }
  };
  const popupClose=()=>{
    setRaiseRequirementOpen(false)
  }
 
  const getInternal = (list) => {
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
     {/* Absolute Assignment SubType Code Start Added by sayali on 17-07-2025 absoluteassignment name changes as absoluteconditionalassignment */}
     {selectedSubType==="absoluteconditionalassignment"&&<>
             {!isShowPOSScreen&&<>
                <Row gutter={[16, 16]} className="reasons-list">
                  {
                    details?.policyDetailsObj?.assigneeDetails?.isPolicyAssigned === 'Y' &&
                 
              <Col
                xs={24}
                sm={24}
                md={8}
                lg={8}
                xxl={8}
                className="loan-checkboxes"
              >
                <Form.Item
                  label="View Existing Assignment Details"
                  name="ViewExistingAssignmentDetails"
                  className="checkbox-gap"
                >
                  <Checkbox
                    value="View Existing Assignment Details"
                    checked={checkedList.includes(
                      "View Existing Assignment Details"
                    )}
                    onChange={() =>
                      handleChange("View Existing Assignment Details")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col>
              }
              {details?.policyDetailsObj?.assigneeDetails?.isPolicyAssigned !== 'Y'&&
            <Col
                xs={24}
                sm={24}
                md={8}
                lg={8}
                xxl={8}
                className="loan-checkboxes"
              >
                <Form.Item
                  label="Update New Assignment Details"
                  name="UpdateNewAssignmentDetails"
                >
                  <Checkbox
                    value="Update New Assignment Details"
                    checked={checkedList.includes(
                      "Update New Assignment Details"
                    )}
                    onChange={() =>
                      handleChange("Update New Assignment Details")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col>
              }
              <Col
                xs={24}
                sm={24}
                md={8}
                lg={8}
                xxl={8}
                className="loan-checkboxes"
              >
                <Form.Item
                  label="Share Process Communication"
                  name="ShareProcessCommunication"
                >
                  <Checkbox
                    value="Share Process Communication"
                    checked={checkedList.includes(
                      "Share Process Communication"
                    )}
                    onChange={() =>
                      handleChange("Share Process Communication")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col>
            </Row>
            {checkedList?.includes(
                      "View Existing Assignment Details"
                    )&&<>
                      {renderDetailsForm("Existing_Details")}
             </>}
             {checkedList?.includes(
                      "Update New Assignment Details"
                    )&&<>
                   
                     {renderDetailsForm("Update_Details")}
                     {showResonDelayField&&<>
                {/* {renderDetailsForm("ReasonSubmission")} */}
              </>}
              {renderDetailsForm("Comments")}
             </>}
             {checkedList?.includes(
                      "Share Process Communication"
                    )&&<>
                      {renderDetailsForm("Send_Medical_Reports")}
                      {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
          </>}
             </>}
             {isShowPOSScreen&&<>
                {/* //Added by sayali on 16/07/2025 for Added nominee details in Assignment POS screen */}
                {renderDetailsForm("POS_UpdateNomineeTitle")}
                <div className="mb-16">
              <div className="table-container email-table">
                  <table className="responsive-table">
                  <thead>
                    <tr>
                     {/* <th></th> */}
                     <th> Client ID</th>
                     <th> Salutation</th>
                      <th> Nominee First Name</th>
                      <th> Nominee Last Name</th>
                      <th>Date of Birth</th>
                      <th>Role</th>
                      <th>Relationship with Life Assured</th>
                      <th>% Share</th>
                      {isShowPOSScreen && <th>OFAC Check</th>}
              
                      {!isShowPOSScreen && (
                      <>
                      {" "}
                      <th>Action</th>
                      </>
                      )}
                    </tr>
                    </thead>
                    <tbody>
                   
              
                      {isShowPOSScreen && (
                                              <>
                                                {posUpdateNomineeData?.map((row, index) => (
                                                  
                                                  <tr key={row.id} className="nominee-input">
                                                     <td>
                                                                  <Form.Item
                                                                      name={["updateNomineeData", row.id, "ClientID_New"]}
                                                                      className="inputs-label mb-0"
                                                                      rules={[
                                                                        {
                                                                          required: false, // not mandatory
                                                                          message: "Enter Client ID",
                                                                        },
                                                                      ]}
                                                                    >
                                                                    <Input
                                                                      placeholder="Client ID"
                                                                      className="cust-input"
                                                                      disabled
                                                                      suffix={
                                                                        <Tooltip title="Search Client">
                                                                          {/* <Icon type="search" /> */}
                                                                          <SearchOutlined
                                                                            style={{ fontSize: "22px", color: "#b31b24" }}
                                                                            onClick={() => {
                                                                            // Instead of props.handleClientList
                                                                            setIsShowClientListModal(true);
                                                                            // Optionally track which row index is being edited
                                                                            setTableIndex(index);
                                                                            }}
                                                                          />
                                                                        </Tooltip>
                                                                      }
                                                                    />
                                                                  </Form.Item>
                                                                </td>
                                                                 <td>
                                                                  <Form.Item
                                                                    name={["updateNomineeData", row.id, "NomineeSalutation_New"]}
                                                                    className="inputs-label mb-0"
                                                                    rules={[
                                                                      {
                                                                        required: true,
                                                                        message: "Select a Salutation",
                                                                      },
                                                                    ]}
                                                                  >
                                                                    <Select
                                                                      className={`inputs-label cust-input select-width`}
                                                                      placeholder="Salutation"
                                                                      options={salutationLU}
                                                                      // value={
                                                                      //   row.NomineeSalutation_New
                                                                      // }
                                                                      // onChange={(value) =>
                                                                      //   handleNomineeSalutationChange(
                                                                      //     index,
                                                                      //     value
                                                                      //   )
                                                                      // }
                                                                    />
                                                                  </Form.Item>
                                                                </td>
                                                    <td>
                                                      <Form.Item
                                                        name={[
                                                          "posUpdateNomineeData",
                                                          index,
                                                          "NomineeFirstName",
                                                        ]}
                                                        className="inputs-label mb-0"
                                                        initialValue={row?.NomineeFirstName} // Set the initial value here
                                                        rules={[
                                                          {
                                                            required: false,
                                                            message:
                                                              "Enter Nominee  First Name",
                                                          },
                                                        ]}
                                                      >
                                                        <Input
                                                          placeholder="Enter Nominee First Name"
                                                          className="cust-input"
                                                          //value={row?.NomineeName}
                                                          //defaultValue={row?.NomineeName}
                                                          disabled={!isEditNominee}
                                                          maxLength={100}
                                                          onChange={(e) =>
                                                            handlePOSNomineeFirstNameChange(
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
                                                          "posUpdateNomineeData",
                                                          index,
                                                          "NomineeLastName",
                                                        ]}
                                                        className="inputs-label mb-0"
                                                        initialValue={row?.NomineeLastName} // Set the initial value here
                                                        rules={[
                                                          {
                                                            required: false,
                                                            message:
                                                              "Enter Nominee  Last Name",
                                                          },
                                                        ]}
                                                      >
                                                        <Input
                                                          placeholder="Enter Nominee Last Name"
                                                          className="cust-input"
                                                          //value={row?.NomineeName}
                                                          //defaultValue={row?.NomineeName}
                                                          disabled={!isEditNominee}
                                                          maxLength={100}
                                                          onChange={(e) =>
                                                            handlePOSNomineeLastNameChange(
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
                                                          "posUpdateNomineeData",
                                                          index,
                                                          "NomineeDOB",
                                                        ]}
                                                        className="inputs-label mb-0"
                                                        initialValue={
                                                          row?.NomineeDOB
                                                            ? dayjs(
                                                                row?.NomineeDOB,
                                                                "DD/MM/YYYY"
                                                              )
                                                            : null
                                                        }
                                                        rules={[
                                                          {
                                                            required: false,
                                                            message: "Select a DOB",
                                                            validator: (_, value) => {
                                                              if (!value) {
                                                                return Promise.resolve(); // Allow empty value for the first record
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
                                                          onChange={(e) =>
                                                            handlePOSDobChange(e, index)
                                                          }
                                                          // defaultValue={row?.NomineeDOB?moment(row?.NomineeDOB, 'DD/MM/YYYY'):""}
                                                          disabled={!isEditNominee}
                                                        />
                                                      </Form.Item>
                                                    </td>
                                                    <td>
                                                      
                                                      <Form.Item
                                                        name={[
                                                          "posUpdateNomineeData",
                                                          index,
                                                          "Role",
                                                        ]}
                                                        className="inputs-label mb-0"
                                                        initialValue={row.Role}
                                                        rules={[
                                                          {
                                                            required: false, // Make it required only if index is not 0
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
                                                          // defaultValue={row.Role} // Use row.Role_New if available, otherwise default to "nominee"
                                                          value={row?.Role}
                                                          disabled={!isEditNominee}
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
                                                          onChange={(value) =>
                                                            handlePOSRoleChange(
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
                                                          "posUpdateNomineeData",
                                                          index,
                                                          "RealtionshipWithPolicyowner",
                                                        ]}
                                                        className="inputs-label mb-0"
                                                        initialValue={
                                                          row?.RealtionshipWithPolicyowner
                                                        }
                                                        rules={[
                                                          {
                                                            required: false,
                                                            message: "Select a RelationShip",
                                                            validator: (_, value) => {
                                                              if (index === 0 && !value) {
                                                                return Promise.resolve(); // Allow empty value for the first record
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
                                                          value={
                                                            row?.RealtionshipWithPolicyowner
                                                          }
                                                          onChange={(value) =>
                                                            handlePOSRelationshipChange(
                                                              index,
                                                              value,
                                                              row
                                                            )
                                                          }
                                                          //  defaultValue={row?.RealtionshipWithPolicyowner}
                                                          disabled={!isEditNominee}
                                                        />
                                                      </Form.Item>
                                                    </td>
                                                    <td>
                                                      <Form.Item
                                                        name={[
                                                          "posUpdateNomineeData",
                                                          index,
                                                          "Share",
                                                        ]}
                                                        className="inputs-label mb-0"
                                                        initialValue={row?.Share}
                                                        rules={[
                                                          {
                                                            required: false,
                                                            message: "Enter a Share",
                                                            validator: (_, value) => {
                                                              if (index === 0 && !value) {
                                                                return Promise.resolve(); // Allow empty value for the first record
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
                                                          onChange={(e) =>
                                                            handlePOSShareChange(
                                                              index,
                                                              e.target.value,
                                                              row
                                                            )
                                                          }
                                                          onKeyDown={(e) =>
                                                            handleKeyDown("numbersOnly", e)
                                                          }
                                                          //  defaultValue={row?.Share}
                                                          disabled={!isEditNominee}
                                                        />
                                                      </Form.Item>
                                                    </td>
                                                    <td>
                                                      <a
                                                        onClick={() => handleofacData(row)}
                                                        style={{ color: "#b3201f" }}
                                                        className="text-label"
                                                      >
                                                        <span>OFAC List Match</span>
                                                      </a>
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
                                              </>
                      )}
                    </tbody>
                  </table>
              </div>
                </div>
                {/* end */}
                {renderDetailsForm("POS_Details")}
                {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
             </>}

{/* imran start */}
 


             {/* Added by sayali on 16/07/2025 for Added nominee details in Assignment */}
             
               {checkedList?.includes("Update New Assignment Details") && !isShowPOSScreen && (
                 <>
                    <div className="mb-16">
                    {/* {!isShowPOSScreen && ( */}
                   
                  <div className="d-flex">
                  <h4 className="subtype-headings fs-16 fw-500">
                  New Nominee/Appointee Details
                  </h4>
                  {"  "}
                  <span
                  className="d-flex justify-center"
                  style={{ paddingLeft: "10px" }}
                  >
                  <i
                  class="bi bi-plus-circle-fill c-pointer text-color fs-18"
                  onClick={() => handleAddRow()}
                  ></i>
                  </span>
                  </div>
                 
                     {/* )} */}
                  
          
                    </div>
                    {/* end */}
 
    
  <div className="table-container email-table">
                  <table className="responsive-table">
                  <thead>
                    <tr>
                     {/* <th></th> */}
                     <th> Client ID1</th>
                     <th> Salutation</th>
                      <th> Nominee First Name</th>
                      <th> Nominee Last Name</th>
                      <th>Date of Birth</th>
                      <th>Role</th>
                      <th>Relationship with Life Assured</th>
                      <th>% Share</th>
                      {isShowPOSScreen && <th>OFAC Check</th>}
              
                      {!isShowPOSScreen && (
                      <>
                      {" "}
                      <th>Action</th>
                      </>
                      )}
                    </tr>
                    </thead>
                    <tbody>
                    {!isShowPOSScreen && (
                      <>
                      {updateNomineeData?.map((row, index) => (
                        <tr key={row.id} className="nominee-input">
                           <td>
                                                                  <Form.Item
                                                                      name={["updateNomineeData", row.id, "ClientID_New"]}
                                                                      className="inputs-label mb-0"
                                                                      rules={[
                                                                        {
                                                                          required: false, // not mandatory
                                                                          message: "Enter Client ID",
                                                                        },
                                                                      ]}
                                                                    >
                                                                    <Input
                                                                      placeholder="Client ID"
                                                                      className="cust-input"
                                                                      disabled
                                                                      suffix={
                                                                        <Tooltip title="Search Client">
                                                                          {/* <Icon type="search" /> */}
                                                                          <SearchOutlined
                                                                            style={{ fontSize: "22px", color: "#b31b24" }}
                                                                            onClick={() => {
                                                                            // Instead of props.handleClientList
                                                                            setIsShowClientListModal(true);
                                                                            // Optionally track which row index is being edited
                                                                            setTableIndex(index);
                                                                            }}
                                                                          />
                                                                        </Tooltip>
                                                                      }
                                                                    />
                                                                  </Form.Item>
                                                                </td>
                                                                 <td>
                                                                  <Form.Item
                                                                    name={["updateNomineeData", row.id, "NomineeSalutation_New"]}
                                                                    className="inputs-label mb-0"
                                                                    rules={[
                                                                      {
                                                                        required: true,
                                                                        message: "Select a Salutation",
                                                                      },
                                                                    ]}
                                                                  >
                                                                    <Select
                                                                      className={`inputs-label cust-input select-width`}
                                                                      placeholder="Salutation"
                                                                      options={salutationLU}
                                                                      // value={
                                                                      //   row.NomineeSalutation_New
                                                                      // }
                                                                      // onChange={(value) =>
                                                                      //   handleNomineeSalutationChange(
                                                                      //     index,
                                                                      //     value
                                                                      //   )
                                                                      // }
                                                                    />
                                                                  </Form.Item>
                                                                </td>
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
                                required: false,
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
                                                            required: false,
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
                                                            required: false,
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
                                                          onChange={(e) =>
                                                            handleDobChange(e, index)
                                                          }
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
                                                          onChange={(value) =>
                                                            handleRoleChange(
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
                                "RealtionshipWithPolicyowner_New",
                                                        ]}
                                                        className="inputs-label mb-0"
                                                        rules={[
                                                          {
                                                            required: false,
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
                                                            required: false,
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
                                                      {index !== 0 && (
                                                        <>
                                                          <i
                                                            class="bi bi-trash3-fill"
                                                            onClick={() =>
                                                              handleDeleteRow(row.id, index)
                                                            }
                                                            style={{
                                                              color: "#b3201f",
                                                              cursor: "pointer",
                                                            }}
                                                          ></i>
                                                        </>
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
                      )}
              
                    </tbody>
                  </table>
                       </div>
                       </>
                )}
{/* imran End */}

             <div className="contact-details-btn">
                {(checkedList?.length>0 || isShowPOSScreen) &&<>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="primary-btn"
                  disabled={(isPANStatus&&!isShowPOSScreen) || (showRaiseRequirementBtn&&!isShowPOSScreen) ||isPANStatus}
                >
                  {isShowPOSScreen?"Approve":"Submit"}
                </Button>
                {(checkedList?.includes("Update New Assignment Details") || isShowPOSScreen) && 
                <>
                <Button
                  type="primary"
                  className="primary-btn"
                 onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
              </>}
                </>}
                {
                  isShowPOSScreen &&
                  <>
                           <InternalFlowPOS interlRequirementTagValue1 = {props.interlRequirementTagValue} selectedList = {POSContactData.serviceRequestTransectionData} getInternal = {getInternal} internalReqForm={internalReqForm}/>
                        </>
                }
                {/* {(!isShowPOSScreen&&showRaiseRequirementBtn) && (
              <>
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit" 
                >
                  Raise Requirement
                </Button>
              </>
            )} */}
            {/*  {(isShowPOSScreen) && ( */}
             
           {/* )} */}
              </div>
            </>}
             {/* Absolute Assignment SubType Code End */}


              {/*Re Assignment SubType Code Start */}
              {selectedSubType==="reassignment" && details?.policyDetailsObj?.assigneeDetails?.isPolicyAssigned === 'Y' &&(
            <>
            
           {isShowNomineeSections&& !isShowPOSScreen&& <>
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
                  label="View Existing Assignment Details"
                  name="viewExistingloandetails"
                  className="checkbox-gap"
                >
                  <Checkbox
                    value="View Existing Assignment Details"
                    checked={checkedList.includes(
                      "View Existing Assignment Details"
                    )}
                    onChange={() =>
                      handleChange("View Existing Assignment Details")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col>
              {isAllowNomineeUpdation&&<>
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xxl={12}
                className="loan-checkboxes"
              >
                <Form.Item
                  label="Initiate Reassignment Request"
                  name="vieweligibleloan"
                >
                  <Checkbox
                    value="Initiate Reassignment Request"
                    checked={checkedList.includes(
                      "Initiate Reassignment Request"
                    )}
                    onChange={() =>
                      handleChange("Initiate Reassignment Request")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col>
              </>}
              {/* <Col
                xs={24}
                sm={24}
                md={8}
                lg={8}
                xxl={8}
                className="loan-checkboxes"
              >
                <Form.Item
                  label="Share Nominee Change Process"
                  name="shareprocess"
                >
                  <Checkbox
                    value="Share Nominee Change Process"
                    checked={checkedList.includes(
                      "Share Nominee Change Process"
                    )}
                    onChange={() =>
                      handleChange("Share Nominee Change Process")
                    }
                  ></Checkbox>
                </Form.Item>
              </Col> */}
            </Row>
            </>}
             
              {(!isShowPOSScreen&&checkedList?.includes(
                      "View Existing Assignment Details"
                    )) &&  (
                <>
                    {renderDetailsForm("Existing_Details")}
                    {renderDetailsForm("PastOwner_Details")}
                </>
              )}
              {(checkedList?.includes(
                      "Initiate Reassignment Request"
                    ) || (isShowPOSScreen))&& (
                <>
                {!isShowPOSScreen&& <> {renderDetailsForm("Request_Details")}</>}
                {isShowPOSScreen&& <> {renderDetailsForm("POS_Details")}</>}
                 {/* {(checkedList?.includes(
                      "Initiate Reassignment Request"
                    ) || isShowPOSScreen)&& <>
              {!isShowPOSScreen &&<>
               <DetailsForm
                data={AssignmentData[selectedSubType]?.Request_Details}
                disabledDate={disabledDate}
                subType={selectedSubType}
                handleDateChange={handleDateChange}
                form={form}
                suffix={!isShowPOSScreen && suffix}
                handleRadioChange={handleRadioChange}
                getUploadFiles={getUploadFiles}
                requestModeLU={requestModeLU}
                handleDropdownChange={handleDropdownChange}
                onBlurInput={onBlurInput}
                handleClientList={handleClientList}
                salutationLU={salutationLU}
                martialStatusLU={martialStatusLU}
                handleLabelLink ={handleLabelLink }
                handleInputChange={handleInputChange}
              ></DetailsForm>
              </>}
              {isShowPOSScreen&&<>
                <DetailsForm
                data={AssignmentData[selectedSubType]?.POS_Details}
                subType={selectedSubType}
                form={form}
                handleRadioChange={handleRadioChange}
                getUploadFiles={getUploadFiles}
                requestModeLU={requestModeLU}
                handleDropdownChange={handleDropdownChange}
                onBlurInput={onBlurInput}
                handleClientList={handleClientList}
                bankAccTypeLU={bankAccTypeLU}
              ></DetailsForm>
              </>}
              </>} */}
                    <div className="mb-16 mt-16">
                      {!isShowPOSScreen && <>
                      <div className="d-flex">
                    <h4 className="subtype-headings fs-16 fw-500">
                    Update New Nominee/Appointee Details
                      </h4>{"  "}
                      {!isShowPOSScreen&&
                      <span className="d-flex justify-center" style={{paddingLeft:"10px"}}><i class="bi bi-plus-circle-fill c-pointer text-color fs-18" onClick={() => handleAddRow()}></i></span>
                        }
                      </div>
                      </>}
                      {isShowPOSScreen&&(<>
              {renderDetailsForm("POS_UpdateNomineeTitle")}

            </>)}
                  
                  <div className="table-container email-table">
                    <table className="responsive-table">
                      <thead>
                        <tr>
                          <th>Client ID</th>
                          <th>Nominee First Name</th>
                          <th>Nominee Last Name</th>
                          <th>Date of Birth</th>
                          <th>Role</th>
                          <th>Relationship</th>
                          <th>% Share</th>
                          {(!isShowPOSScreen)&&<> <th>Action</th></>}
                        </tr>
                      </thead>
                      <tbody>
                        {!isShowPOSScreen&&<>
                      {updateNomineeData?.map((row,index) => (
                          <tr key={row.id} className="nominee-input">
     <td>
  <Form.Item
    name={['updateNomineeData', row.id, 'ClientID_New']}
    className="inputs-label mb-0"
    rules={[
      {
        required: true,
        message: "Enter Client ID",
      },
    ]}
  >
    <Input
      placeholder="Enter CLient ID"
      className="cust-input"
      value={row.ClientID_New}
      maxLength={100}
     // onChange={(e) => handleNomineeFirstNameChange(index, e.target.value)}
         suffix={
             <Tooltip title="Extra information">
               {/* <Icon type="search" /> */}
               <SearchOutlined
                style={{ fontSize: '22px', color: '#b31b24' }}
                 onClick={()=>{handleClientList("isTable",index)}}
                 // onClick={() => {
                 //   if (!item?.disabled) {
                 //     props?.handleClientList();
                 //   }
                 // }}
               />
             </Tooltip>
           }
    />
  </Form.Item>
</td>

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
        message: "Enter Nominee Last Name",
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
                    onChange={(e) => handleDobChange(e, index)}
                  />
                  </Form.Item>
                            </td>
                            <td>
                            {/* <Select
                                 className={`inputs-label cust-input select-width`}
                                placeholder="Select a Role"
                                defaultValue= {index === 0 && "nominee"}
                                disabled={index === 0}
                                value={row.Role_New}
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
                                onChange={(value) => handleRoleChange(index, value)}
                              /> */}
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
   // disabled={index === 0}
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
                              {!isShowPOSScreen&&<>
                            <td>
                              {index !== 0 &&<>
                              <i
                                class="bi bi-trash3-fill"
                                onClick={() => handleDeleteRow(row.id,index)}
                                style={{ color: "#b3201f", cursor: "pointer" }}
                              ></i>
                              </>}
                            </td>
                            </>}
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
                      
                        {(isShowPOSScreen)&&<>
                          {posUpdateNomineeData?.map((row, index) => (
            // <tr key={index}>
            //  <td>{row.NomineeName}</td>
            //   <td>{row.NomineeDOB}</td>
            //   <td>{row.RealtionshipWithPolicyowner}</td>
            //   <td>{row.Share}</td>
            //   <td>{row.Role}</td>
            // </tr>
            <tr key={row.id} className="nominee-input">
     

<td>
<Form.Item
name={['posUpdateNomineeData', index, 'NomineeFirstName']}
className="inputs-label mb-0"
initialValue={row?.NomineeFirstName} // Set the initial value here
rules={[
{
required: true,
message: "Enter Nominee First Name",
},
]}
>
<Input
placeholder="Enter Nominee Last Name"
className="cust-input"
//value={row?.NomineeName}
//defaultValue={row?.NomineeName}
disabled={!isEditNominee}
maxLength={100}
onChange={(e) => handlePOSNomineeFirstNameChange(index, e.target.value)}

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
message: "Enter Nominee Last Name",
},
]}
>
<Input
placeholder="Enter Nominee Last Name"
className="cust-input"
//value={row?.NomineeName}
//defaultValue={row?.NomineeName}
disabled={!isEditNominee}
maxLength={100}
onChange={(e) => handlePOSNomineeLastNameChange(index, e.target.value)}

/>
</Form.Item>
</td>

             <td className="date-picker">
             <Form.Item
name={['posUpdateNomineeData', index, 'NomineeDOB']}
className="inputs-label mb-0"
initialValue={row?.NomineeDOB?dayjs(row?.NomineeDOB, 'DD/MM/YYYY'):null}
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
     onChange={(e) => handlePOSDobChange(e, index)}
    // defaultValue={row?.NomineeDOB?moment(row?.NomineeDOB, 'DD/MM/YYYY'):""}
    disabled={!isEditNominee}
   />
   </Form.Item>
             </td>
             <td>
             {/* <Select
                  className={`inputs-label cust-input select-width`}
                 placeholder="Select a Role"
                 defaultValue= {index === 0 && "nominee"}
                 disabled={index === 0}
                 value={row.Role_New}
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
                 onChange={(value) => handleRoleChange(index, value)}
               /> */}
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
// defaultValue={row.Role} // Use row.Role_New if available, otherwise default to "nominee"
value={row?.Role}
disabled={!isEditNominee}
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
onChange={(value) => handlePOSRoleChange(index, value,row)}
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
                 onChange={(value) => handlePOSRelationshipChange(index, value,row)}
                //  defaultValue={row?.RealtionshipWithPolicyowner}
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
   onChange={(e) => handlePOSShareChange(index, e.target.value,row)}
   onKeyDown={(e) => handleKeyDown("numbersOnly",  e)}
  //  defaultValue={row?.Share}
   disabled={!isEditNominee}
 />
 </Form.Item>
               </td>
            
             {/* <td>
               {index !== 0 &&<>
               <i
                 class="bi bi-trash3-fill"
                 onClick={() => handlePOSDeleteRow(row.id,index)}
                 style={{ color: "#b3201f", cursor: "pointer" }}
               ></i>
               </>}
             </td> */}
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
                        </>}
                      </tbody>
                    </table>
                  </div>
                   {!isShowPOSScreen && <>{renderDetailsForm("Upload_Documents")} </>}
                   {isShowPOSScreen && <>{renderDetailsForm("POS_Request_Details")} </>}
               </div>
                </>
              )}
              {checkedList?.includes(
                      "Share Nominee Change Process"
                    ) && !!isShowPOSScreen&& (
                <>
                  <DetailsForm
                    data={AssignmentData[selectedSubType]?.Share_Nominee_process}
                    subType={selectedSubType}
                    toggleInputField={toggleInputField}
                    activeEmailIcons={activeEmailIcons}
                    activeMobileIcons={activeMobileIcons}
                    activeWhatsAppIcons={activeWhatsAppIcons}
                  ></DetailsForm>
                {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
          <DetailsForm
                data={AssignmentData[selectedSubType]?.Comments}
                subType={selectedSubType}
              ></DetailsForm>
                </>
              )}

             
              
              {(checkedList?.length>0||isShowPOSScreen)&&<>
              <div className="contact-details-btn">
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit"
                  disabled={(totalShare!=100&&checkedList?.includes("Initiate Reassignment Request")) || (isShowPOSScreen && !isPosBtnsDisable)}
                >
                  {isShowPOSScreen ? "Approve" : "Submit"}
                </Button>{" "}
             
            {/* {(showRaiseRequirementBtn) && (
              <Button type="primary" className="primary-btn"
              htmlType="submit"
              // onClick={() => getRaiseRequirements()}
              disabled={totalShare!=100&&checkedList?.includes("Initiate Reassignment Request")}
              >
                Raise Requirement
              </Button>
            )} */}
     

            {isShowPOSScreen && <>
           
              <Button type="primary" className="primary-btn"
            onClick={() => getRaiseRequirements()}
           disabled={(totalShare!=100&&checkedList?.includes("Initiate Reassignment Request"))|| (isShowPOSScreen && isPosBtnsDisable)}
           >
             Raise Requirement
           </Button>

           <>
                           <InternalFlowPOS interlRequirementTagValue1 = {props.interlRequirementTagValue} selectedList = {POSContactData.serviceRequestTransectionData} getInternal = {getInternal} isDisableBtn={isPosBtnsDisable} internalReqForm={internalReqForm}/>
                         
                        </>
                        
            </> } 
           
            {!checkedList?.includes("View Existing Assignment Details")&& !isShowPOSScreen && <> 
            <Button type="primary" className="primary-btn"
           onClick={() => getRaiseRequirements()}
          disabled={totalShare!=100&&checkedList?.includes("Initiate Reassignment Request")}
          >
            Raise Requirement
          </Button>
        </>
        }
          </div>
          </>}
            </>
          )}
     </>
            )}
            
           {/*Re Assignment SubType Code End */}
           
           

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
        title="Bank De-Dupe Match"
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
   <RaiseRequirementPopup raiseRequerimentList={raiseRequerimentList} raiseRequirementOpen={raiseRequirementOpen} requirementModalLoader={requirementModalLoader} handleRequirementSubmit={handleRequirementSubmit} popupClose={popupClose} isShowPOSScreen={isShowPOSScreen} requirementsForm={requirementsForm}/>
   <Modal
        title="List of Acceptable Address Proofs"
        open={addressProofModal&&["absoluteconditionalassignment"]?.includes(selectedSubType)} //Added by sayali on 17-07-2025 absoluteassignment name changes as absoluteconditionalassignment
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
        open={idProofModal&&["absoluteconditionalassignment"]?.includes(selectedSubType)} //Added by sayali on 17-07-2025 absoluteassignment name changes as absoluteconditionalassignment
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
      <Modal
  open={isShowEmailMobileModal}
  destroyOnClose={true}
 // width={1200}
  closeIcon={false}
  footer={null}
>
  <div>
  <p className='text-bold'>{isEmailMobileNoMessage}</p>
   <div className='text-center modal-validate'>
   <Button type="primary" className="primary-btn" onClick={() => setIsShowEmailMobileModal(false)}>
         OK
       </Button>
   </div>
    {/* <div className="contact-details-btn">
      <Button
        type="primary"
        className="primary-btn"
        onClick={() => setIsShowEmailMobileModal(false)}
      >
        Close
      </Button>
    </div> */}
  </div>
</Modal>
    <ClientListModal 
          visible = {isShowClientListModal}
          clientForm={form}
          setIsShowClientListModal = {setIsShowClientListModal}
          userID = {loginInfo?.userProfileInfo?.profileObj?.userName}
          setClientLoading={setIsLoading}
          customerData={customerData}
          inputFields = {AssignmentData[selectedSubType]?.Update_Details || AssignmentData[selectedSubType]?.Request_Details}
          setUpdateFields={setUpdateFields}
          selectedSubType={selectedSubType}
          empID ={loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID}
          setBankAccNo={setBankAccNo}
          setUpdateNomineeData={setUpdateNomineeData}
          updateNomineeData={updateNomineeData}
          isTableSearch={isTableSearch}
          // tableIndex={tableIndex}
           tableIndex={updateNomineeData.length - 1}
          />
    </>
    
  );

};

export default Assignment;
