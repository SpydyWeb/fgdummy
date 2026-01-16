import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Form,
  Spin,
  Button,
  Row,
  Col,
  Checkbox,
  message,
  Modal,
  Upload,
  Tooltip,
  Input,
  DatePicker,
  Select,
} from "antd";

import Icon, {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ContractAlterationData } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import moment from "moment";
import UploadIcon from "../../assets/images/upload.png";
import ContactForm from "../../utils/ContactForm";
import CheckBoxList from "../../utils/CheckBoxList";
import apiCalls from "../../api/apiCalls";
// import {getGSTINEnquiry} from "../../api/contractAlterationApiCalls";
import PopupAlert from "../popupAlert";
import CloseIcon from "../../assets/images/close-icon.png";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import OTPModal from "../../utils/OTPModal";
import InternalFlow from "../InternalFlow/InternalFlow";
import InternalFlowPOS from "../InternalFlow/InternalFlowPOS";
import RaiseRequirementPopup from "../RaiseRequirementPopup";
import ClientListModal from "../../utils/clientListModal";
import { secureStorage } from "../../utils/secureStorage";
import { formatDateSafe } from "../../utils/HelperUtilites";
const ContractAlteration = (props) => {
  const loginInfo = useSelector((state) => state);
  dayjs.extend(customParseFormat);
  const {
    selectedCallType,
    selectedSubType,
    clientRoleLU,
    panUpdateLU,
    customerData,
    details,
    POSContactData,
    selectedSubTypeId,
    SelectedSubTypeVal,
    requestModeLU,
    clientEnquiryData,
    isEmailManagement,
    martialStatusLU,
    salutationLU,
    bankAccTypeLU,
  } = props;

  console.log("props selectedCallType", props?.selectedCallType);
  console.log("props selectedSubTypeId", props?.selectedSubTypeId);
  const suffix = <img src={UploadIcon} alt="" />;
  const [form] = Form.useForm();
  const [requirementsForm] = Form.useForm();
  const [internalReqForm] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showResonDelayField, setShowReasonDelayField] = useState(false);
  const [isShowPOSScreen, setIsShowPOSScreen] = useState(false);
  const [selectCheckBox, setSelectCheckBox] = useState(false);
  const [showNewSignatureFields, setShowNewSignatureFields] = useState(false);
  const [showSiganatureProcess, setShowSignatureProcess] = useState(false);
  const [showRaiseRequirementBtn, setShowRaiseRequirementBtn] = useState(false);
  const [showEmailFields, setShowEmailFields] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmailAddress, setShowEmailAddress] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [activeEmailIcons, setActiveEmailIcons] = useState([]);
  const [activeMobileIcons, setActiveMobileIcons] = useState([]);
  const [activeWhatsAppIcons, setActiveWhatsAppIcons] = useState([]);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertData, setAlertData] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [serviceRequestId, setServiceRequestId] = useState(null);
  const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [PANUploadFiles, setPANUploadFiles] = useState([]);
  const [cltType, setCltType] = useState("");
  const [showUploadFile, setShowUploadFile] = useState(null);
  const [isUploadMultipleFiles, setIsMultipleFiles] = useState([]);
  const [uploadMultipleFiles, setUploadMultipleFiles] = useState([]);
  const [addressProofModal, setAddressProofModal] = useState(false);

  const [isShowDOBRequestForms, setIsShowDOBRequestForms] = useState(false);
  const [isTermExistingObj, setIsTermExistingObj] = useState({});
  const [isPlanExistingObj, setIsPlanExistingObj] = useState({});
  const [isPremiumExistingObj, setIsPremiumExistingObj] = useState({});
  const [isSumAssuredExistingObj, setIsSumAssuredExistingObj] = useState({});
  const [isAgentApplicationNo, setIsAgentApplicationNo] = useState(null);
  const [ClientEnquiry, setClientEnquiry] = useState({});
  const [issAgentExistingObj, setIsAgentExistingObj] = useState({});
  const [isPANExistingObj, setIsPANExistingObj] = useState({});
  const [isProcessLink, setIsProcessLink] = useState("");
  const [isDocLink, setIsDocLink] = useState("");
  const [CNFBankAccNo, setCNFBankAccNo] = useState("");
  const [BankAccNo, setBankAccNo] = useState("");
  const [isShowOTPModal, setIsShowOTPModal] = useState(false);
  const [disableRequestForm, setDisableRequestForm] = useState(false);
  const [isShowRequestDetails, setIsShowRequestDetails] = useState(false);
  const [updateFields, setUpdateFields] = useState(false);
  const [disableOTP, setDisableOTP] = useState(true);
  const [validateOTPSuccess, setValidateOTPSuccess] = useState(false);
  const [isExistingGSTNo, setIsExistingGSTNo] = useState(null);
  const [isDisablePANApproveBtn, setIsDisablePANApproveBtn] = useState(false);
  const [hideSubmitBtn, setHideSubmitBtn] = useState(true);
  const [RerenderComponent, setRerenderComponent] = useState(true);
  const [ClientGender, setClientGender] = useState("");
  const [isDisableApproveBtn, setIsDisableApproveBtn] = useState(false);
  const [DisableSubmitBtn, setDisableSubmitBtn] = useState(false);
  const [DisableApproveBtn, setDisableApproveBtn] = useState(false);
  const [negativeListModal, setNegativeModal] = useState(false);
  const [NameDeDupeModal, setNameDeDupeModal] = useState(false);
  const [deDupeModalOpen, setDeDupeModalOpen] = useState(false);
  const [BankduDupeData, setBankduDupeData] = useState([]);
  const [negativeList, setNegativeList] = useState([]);
  const [NameDeDupeData, setNameDeDupeData] = useState([]);
  const [IsPosEdited, setIsPosEdited] = useState(false);
  const [Age_Existing, setAge_Existing] = useState("");
  const [ExistingDateofBirth, setExistingDateofBirth] = useState("");
  const [isDisableNewMobileNo, setIsDisableNewMobileNo] = useState(false);
  const [isExistingAgentCode, setIsExistingAgentCode] = useState(null);
  const [isPolicyReceivedDate, setIsPolicyReceivedDate] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [InternaRequirements, setInternalFlowRequirements] = useState("");
  const [aadharUploadFiles, setAAdharUploadFiles] = useState([]);
  const [passportUploadFiles, setPassportUploadFiles] = useState([]);
  const [rationCardUploadFiles, setRationCardUploadFiles] = useState([]);
  const [DrivingUploadFiles, setDrivingUploadFiles] = useState([]);
  const [utilityUploadFiles, setUtilityUploadFiles] = useState([]);
  const [voterUploadFiles, setVoterUploadFiles] = useState([]);
  const [passbookUploadFiles, setPassbookUploadFiles] = useState([]);
  const [pancardUploadFiles, setPancardUploadFiles] = useState([]);
  const [vaildateSignature, setVaildateSignature] = useState(false);
  const [emsrequestchannel, setEmsrequestchannel] = useState();
  /* dummy commit in development */
  //const [isFieldsDisableafterValidOTP,setIsFieldsDisableafterValidOTP] = useState(false);
  const [idProofModal, setIdProofModal] = useState(false);
  const [aadharIDUploadFiles, setAAdharIDUploadFiles] = useState([]);
  const [passportIDUploadFiles, setPassportIDUploadFiles] = useState([]);
  const [rationCardIDUploadFiles, setRationCardIDUploadFiles] = useState([]);
  const [DrivingIDUploadFiles, setDrivingIDUploadFiles] = useState([]);
  const [voterIDUploadFiles, setVoterIDUploadFiles] = useState([]);
  const [pancardIDUploadFiles, setPancardIDUploadFiles] = useState([]);
  const [isIDUploadMultipleFiles, setIsIDMultipleFiles] = useState([]);
  const [uploadIDMultipleFiles, setUploadIDMultipleFiles] = useState([]);
  const [policyContinueLU, setPolicyContinueLU] = useState([]);
  const [docIdProofs, setDocIdProofs] = useState([]);
  const [disableSubmutBtn, setDisableSubmutBtn] = useState(false);
  const [isShowClientListModal, setIsShowClientListModal] = useState(false);
  const [data, setData] = useState([]);
  const [clientListLU, setClientListLU] = useState([]);
  const [updateNomineeData, setUpdateNomineeData] = useState([
    {
      id: 1,
      ClientID_New: "",
      NomineeDOB_New: null,
      RealtionshipWithPolicyowner_New: null,
      Share_New: 0,
      Role_New: "nominee",
      isMinor: false,
      ClientID_New: "",
      NomineeFirstName_New: "",
      NomineeLastName_New: "",
    },
  ]);
  const [totalShare, setTotalShare] = useState(0);
  const [isMinorDOB, setIsMinorDOB] = useState(false);
  const dateFormat = "DD/MM/YYYY";
  const [relationShipLU, setRelationShipLU] = useState([]);
  const [posUpdateNomineeData, setPosUpdateNomineeData] = useState([]);
  const [isEditNominee, setIsEditNominee] = useState(false);
  const [searchType, setSearchType] = useState(null);
  const [tableIndex, setTableIndex] = useState(0);
  const [showOwnerPoliciesModal, setShowOwnerPoliciesModal] = useState(false);
  const [otherOwnerPolicies, setOtherOwnerPolicies] = useState([]);
  const posChangeinNomineeObj = {
    Client_Id: null,
    AccountType: "",
  };
  const posGSTScreenObj = {
    custRole: POSContactData?.custRole,
    srvReqID: POSContactData?.srvReqID,
    GSTINToBeUpdateFor: "",
    ExistingGSTINNumber: "",
    NewGSTINNumber: "",
    UploadGSTINCertificate: "",
  };
  const posPANScreenObj = {
    custRole: POSContactData?.custRole,
    srvReqID: POSContactData?.srvReqID,
    PanValidation: "",
    PanAadharSeeding: "",
    Last2YearsITRFilling: "",
    NewPanNo: "",
    resonfordelay: "",
    validatesignature: "",
    NameinPAN: "",
    NameMatch: "",
  };
  const posAgentCodeScreenObj = {
    custRole: POSContactData?.custRole,
    srvReqID: POSContactData?.srvReqID,
    AgentCode_New: "",
    AgentName_New: "",
    Reasonforagentcodechange: "",
    Comments: "",
    AgentSignaturVerificationResult: "",
    Agnet_Application_Number: "",
    Agent_Status: "",
  };
  const posChangeinNameObj = {
    custRole: POSContactData?.custRole,
    srvReqID: POSContactData?.srvReqID,
    Update_New: "",
    ModifiedClientID: "",
    FirstName_New: "",
    MiddleName_New: "",
    LastName_New: "",
    Comments: "",
    Validate_Signature: "",
    RefertoNBStageDocument: "",
    Client_Id: "",
  };
  const posChangeinSignatureObj = {
    custRole: POSContactData?.custRole,
    srvReqID: POSContactData?.srvReqID,
    PanValidation: "",
    PanAadharSeeding: "",
    Last2YearsITRFilling: "",
    Comments: "",
    ValidateSignature: "",
  };

  const posChangeinPlanObj = {
    custRole: POSContactData?.custRole,
    srvReqID: POSContactData?.srvReqID,
    PlanName_Old: "",
    NewPlan_New: "",
    Comments: "",
    ValidateSignature: "",
    ReasonForChange_New: "",
  };
  const posChangeinTermObj = {
    custRole: POSContactData?.custRole,
    srvReqID: POSContactData?.srvReqID,
    PlanName_Old: "",
    PolicyTerm_Old: "",
    CurrentPremium_Old: "",
    NewTerm_New: "",
    Comments: "",
    ValidateSignature: "",
    ReasonForChange_New: "",
  };
  const posChangeinPremiumObj = {
    custRole: POSContactData?.custRole,
    srvReqID: POSContactData?.srvReqID,
    PlanName_Old: "",
    CurrentPremium_Old: "",
    NewPremium_New: "",
    ReasonForChange_New: "",
    Comments: "",
    ValidateSignature: "",
    ReasonForChange_New: "",
  };
  const posChangeinSumAssuredObj = {
    custRole: POSContactData?.custRole,
    srvReqID: POSContactData?.srvReqID,
    SumAssured_Old: "",
    CurrentPremium_Old: "",
    SumAssured_New: "",
    ReasonForChange_New: "",
    Comments: "",
    ValidateSignature: "",
    ReasonForChange_New: "",
  };
  const posAdditionDeletionObj = {
    custRole: POSContactData?.custRole,
    srvReqID: POSContactData?.srvReqID,
    RiderName: "",
    RequestFor: "",
    Comments: "",
    ValidateSignature: "",
  };

  const posChangeInDobScreenObj = {
    custRole: "",
    srvReqID: POSContactData?.srvReqID,
    Comments: "",
    NewDateofBirth: "",
    RefertoNBStageDocument: "",
    CustomerSigningDate: "",
    BranchReceivedDate: "",
    ReasonForDelay: "",
    ValidateSignature: "",
    InitiateRequestBy: "",
    Age: "",
    Update_New: "",
    Client_Id: "",
    ModifiedClientID: "",
  };

  const changeinownershipObj = {
    custRole: POSContactData?.custRole,
    srvReqID: POSContactData?.srvReqID,
    ProposerName_New: "",
    NewOwnerClientID: "",
    Salutation: "",
    MaritialStatus: "",
    ProposerFirstName_New: "",
    ProposerLastName_New: "",
    ProposerDOB_New: "",
    AddressLine1_New: "",
    AddressLine2_New: "",
    AddressLine3_New: "",
    City_New: "",
    State_New: "",
    PINCode: "",
    MobileNumber_New: "",
    ProposerEmailID_New: "",
    RelationtoLifeAssured: "",
    PANNumber: "",
    PANResult: "",
    CKYCNumber: "",
    CustomerSigningDate: "",
    BranchReceivedDate: "",
    ReasonForDelay: "",
    ValidateSignature: "",
    BankIFSC: "",
    BankName: "",
    BranchName: "",
    AccountType: "",
    NameAsMentionedInTheBank: "",
    BankAccountNumber: "",
    InitiatePennyDrop: "",
    NameasperPennyDrop: "",
    NamematchasperPennyDrop: "",
    DeDupeCheck: "",
    Comments: "",
    ReasonForOwnershipChange: "",
    // NameinPANN: "",
    // PANValidationStatus: "",
    // NameMatch: "",
  };
  const handleSearchClientData = async (value) => {
    setIsLoading(true);
    setData([]);
    const policyNo = details?.policyDetailsObj?.identifiers.policyNo;
    try {
      const res = await apiCalls.GetPolicyClientDtls(
        policyNo,
        loginInfo?.userProfileInfo?.profileObj?.userName
      );

      // Extract relevant data
      const lifeAssuredData =
        res?.data?.lifeAssured && customerData?.laName !== customerData?.poName
          ? [{ ...res?.data?.lifeAssured, type: "LifeAssured" }]
          : [];

      const proposerData = res?.data?.proposer
        ? [{ ...res?.data?.proposer, type: "Proposer" }]
        : [];
      const nomineeData =
        Array.isArray(res?.data?.nominees) && res.data.nominees.length > 0
          ? res.data.nominees.map((nominee) => ({
              ...nominee,
              type: "Nominee",
            }))
          : null;

      const assigneeData =
        Array.isArray(res?.data?.assignee) && res.data.assignee.length > 0
          ? res.data.assignee.map((assignee) => ({
              ...assignee,
              type: "Assignee",
            }))
          : null;

      const appointeeData =
        Array.isArray(res?.data?.appointees) && res.data.appointees.length > 0
          ? res.data.appointees.map((appointee) => ({
              ...appointee,
              type: "Appointee",
            }))
          : null;

      // Convert to lookup list for dropdown binding
      const lookupList = [
        ...(lifeAssuredData?.length
          ? lifeAssuredData.map(({ lsurname, lgivname, clntnum }) => ({
              label: `${lgivname} ${lsurname} (Life Assured)`,
              value: `${clntnum}`,
            }))
          : []),

        ...(proposerData?.length
          ? proposerData.map(({ lsurname, lgivname, clntnum }) => ({
              label: `${lgivname} ${lsurname} (Proposer)`,
              value: `${clntnum}`,
            }))
          : []),

        ...(nomineeData
          ? nomineeData.map(({ lsurname, lgivname, clntnum }) => ({
              label: `${lgivname} ${lsurname} (Nominee)`,
              value: `${clntnum}`,
            }))
          : []),

        ...(appointeeData
          ? appointeeData.map(({ lsurname, lgivname, clntnum }) => ({
              label: `${lgivname} ${lsurname} (Appointee)`,
              value: `${clntnum}`,
            }))
          : []),

        ...(assigneeData
          ? assigneeData.map(({ lsurname, lgivname, clntnum }) => ({
              label: `${lgivname} ${lsurname} (Assignee)`,
              value: `${clntnum}`,
            }))
          : []),
      ];

      setClientListLU(lookupList);
      //       if((details?.policyDetailsObj?.identifiers?.la_Name===details?.policyDetailsObj?.identifiers?.po_Name) && !isShowPOSScreen){
      //       if(selectedSubType === "chnageinname"){
      //         if(value?.includes("View Existing Details")){
      //       form.setFieldsValue({
      //         Update_Existing: lookupList?.length > 0 ? lookupList[0]?.value : ""
      //       })

      //       ContractAlterationData[selectedSubType]?.Existing_Details?.forEach(element => {
      //         if(element?.name==="Update_Existing"){
      //           element.disabled= true;
      //           setUpdateFields(false);
      //         }
      //       });
      //       getClientEnquiry(lookupList,value);
      //     }
      //   }
      //   else if(selectedSubType === "changeindob"){
      //     if(customerData?.laName === customerData?.poName){
      //       form.setFieldsValue({
      //         Update_Existing: lookupList?.length > 0 ? lookupList[0]?.value : ""
      //       })
      //       if(value?.includes("View Existing DOB Details")){
      //         ContractAlterationData[selectedSubType]?.Existing_DOB_Details?.forEach(element => {
      //           if(element?.name==="Update_Existing"){
      //             element.disabled= true;
      //             setUpdateFields(false);
      //           }
      //         }
      //       );
      //       getClientEnquiry(lookupList,value);
      //       }
      //   }
      //   else {
      //     if(value?.includes("View Existing DOB Details")){
      //     ContractAlterationData[selectedSubType]?.Existing_DOB_Details?.forEach(element => {
      //        if(element?.name==="Update_Existing"){
      //          element.disabled= false;
      //          setUpdateFields(true);
      //        }
      //      });
      //     }
      //      else if(value?.includes("Update New DOB Details")){
      //       ContractAlterationData[selectedSubType]?.Update_DOB_Details?.forEach(element => {
      //         if(element?.name==="custRole"){
      //           element.disabled= false;
      //           setUpdateFields(true);
      //         }
      //       });
      //      }
      //     // form.resetFields();
      //    }
      //   }
      //  }
      //  else {
      //   if(value?.includes("View Existing Details" && !isShowPOSScreen)){
      //   ContractAlterationData[selectedSubType]?.Existing_Details?.forEach(element => {
      //      if(element?.name==="Update_Existing"){
      //        element.disabled= false;
      //        setUpdateFields(true);
      //      }
      //    });
      //   }
      //    else if(value?.includes("Update New Details") && !isShowPOSScreen){
      //     ContractAlterationData[selectedSubType]?.Update_New_Details?.forEach(element => {
      //       if(element?.name==="ModifiedClientID"){
      //         element.disabled= false;
      //         setUpdateFields(true);
      //       }
      //     });
      //    }

      //    //form.resetFields();
      //  }
    } catch (error) {
      message.error({
        content: error || "Something went wrong, please try again!",
        className: "custom-msg",
        duration: 2,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getClientName = (selectionVal) => {
    if (!selectionVal || !clientListLU) return null;

    const foundItem = clientListLU.find((item) => selectionVal === item.value);
    return foundItem ? foundItem.label : null;
  };

  const setInternalReqData = () => {
    POSContactData.serviceRequestTransectionData?.forEach((element) => {
      if (element.tagName === "InternalRequirementValue") {
        setInternalFlowRequirements(props.interlRequirementTagValue);
      }
    });
  };
  //Added by sayali on 11/08/2025 for Added nominee details in update new owner details

  const getRelationsData = async (
    val,
    checkedList,
    consolidatedNewData,
    clientNumber,
    nomineePOS
  ) => {
    setIsLoading(true);
    try {
      const response = await apiCalls.getRelationsData(
        val?.bnysel || clientNumber
      );
      if (response?.data) {
        const res = response?.data;
        if (nomineePOS) {
          let transformedData = res?.map((item) => ({
            ...item,
            label: item.longdesc,
            value: item.descitem,
          }));
          setRelationShipLU(transformedData);
        }
        if (checkedList?.includes("Update New Owner Details")) {
          let transformedData = res?.map((item) => ({
            ...item,
            label: item.longdesc,
            value: item.descitem,
          }));
          setRelationShipLU(transformedData);
        } else if (
          consolidatedNewData?.length > 0 &&
          selectedSubType === "changeinownership" //Added by sayali on 11/08/2025 for Added nominee details in update new owner details
        ) {
          // Create a copy of the consolidatedNewData array
          const updatedData = [...consolidatedNewData];

          consolidatedNewData?.forEach((relatns, index) => {
            // Find the matching item in the res array based on descitem
            const matchingItem = res?.find(
              (item) => item?.descitem === relatns?.RealtionshipWithPolicyowner
            );

            // Update RealtionshipWithPolicyowner field if a matching item is found
            if (matchingItem) {
              updatedData[index].RealtionshipWithPolicyowner =
                matchingItem.longdesc;
            }
            if (nomineePOS) {
              const newTotalShare = consolidatedNewData?.reduce(
                (sum, nominee) =>
                  sum + (nominee.Share ? parseFloat(nominee.Share) : 0) || 0,
                0
              );
              setTotalShare(newTotalShare);
            }
          });

          // Set the updated data in the state
          setPosUpdateNomineeData(updatedData);
          setUpdateNomineeData(updatedData);
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

  const handleKeyDown = (pattern, e, type) => {
    // Get the pressed key
    const key = e.key;
    let specialCharacterRegex = "";

    if (pattern === "numbersOnly") {
      const inputValue = e.target.value;
      if (inputValue.includes(".")) {
        specialCharacterRegex = /^[0-9]$/;
      } else {
        specialCharacterRegex = /^[0-9.]$/;
      }

      // specialCharacterRegex = /^[0-9]$/;
    } else if (pattern === "charactersOnly") {
      specialCharacterRegex = /^[a-zA-Z0-9]$/;
    } else if (pattern === "alphabatesOnly") {
      specialCharacterRegex = /^[a-zA-Z]$/;
    } else if (pattern === "decimalOnly") {
      const inputValue = e.target.value;
      if (inputValue.includes(".")) {
        specialCharacterRegex = /^[0-9]$/;
      } else {
        specialCharacterRegex = /^[0-9.]$/;
      }
    }

    if (key === "Backspace" || key.startsWith("Arrow")) {
      return;
    }

    // Check if the pressed key matches the allowed pattern
    if (!specialCharacterRegex.test(key)) {
      e.preventDefault(); // Prevent the key from being entered into the input field
    }
  };
  const handleDeleteRow = (id, index) => {
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
            isMinor: false,
          },
        },
      });
      const updatedupdateNomineeData = updateNomineeData.filter(
        (row) => row.id !== id
      );
      const newTotalShare = updatedupdateNomineeData.reduce(
        (sum, nominee) => sum + parseFloat(nominee.Share_New) || 0,
        0
      );

      setTotalShare(newTotalShare);
      setUpdateNomineeData(updatedupdateNomineeData);
      // Reset the form instance to reflect the changes
      form.resetFields([
        `updateNomineeData[${index}].ClientID_New`,
        `updateNomineeData[${index}].NomineeFirstName_New`,
        `updateNomineeData[${index}].NomineeLastName_New`,
        `updateNomineeData[${index}].NomineeDOB_New`,
        `updateNomineeData[${index}].RealtionshipWithPolicyowner_New`,
        `updateNomineeData[${index}].Share_New`,
        `updateNomineeData[${index}].Role_New`,
      ]);
    }
  };
  const handleRelationshipChange = (index, value) => {
    const updatedData = [...updateNomineeData];
    updatedData[index].RealtionshipWithPolicyowner_New = value;
    setUpdateNomineeData(updatedData);
  };
  const handleShareChange = (index, newShare, row) => {
    const updatedNomineeData = [...updateNomineeData];
    updatedNomineeData[index].Share_New = newShare;

    // Recalculate the total share
    const newTotalShare = updatedNomineeData.reduce(
      (sum, nominee) => sum + parseFloat(nominee.Share_New) || 0,
      0
    );
    // Check if total share exceeds 100
    if (newTotalShare > 100) {
      message.error({
        content:
          "Total share cannot exceed 100%. Please enter a valid share value.",
        className: "custom-msg",
        duration: 3,
      });

      // Reset the share value for the current nominee
      form.setFieldsValue({
        updateNomineeData: {
          [row.id]: {
            Share_New: "",
          },
        },
      });

      // Reset the share in state
      updatedNomineeData[index].Share_New = "";
      setUpdateNomineeData(updatedNomineeData);

      // Keep the total share as it was before this invalid entry
      return;
    }

    setTotalShare(newTotalShare);

    // Update the state
    setUpdateNomineeData(updatedNomineeData);
  };
  const handleDobChange = (newDob, index) => {
    const updatedNomineeData = [...updateNomineeData];
    updatedNomineeData[index].NomineeDOB_New = newDob;
    // if(index!==0){
    //   isMinor(updatedNomineeData[index].NomineeDOB_New,updatedNomineeData)
    // }else{
    //setUpdateNomineeData(updatedNomineeData);
    //}

    updatedNomineeData[index].NomineeDOB_New &&
      isMinor(updatedNomineeData, index);
  };
  const handleRoleChange = (index, value, row) => {
    const updatedData = [...updateNomineeData];
    updatedData[index].Role_New = value;
    if (value === "appointee") {
      updatedData[index].Share_New = 0;
      form.setFieldsValue({
        updateNomineeData: {
          [row.id]: {
            Share_New: 0,
          },
        },
      });

      const newTotalShare = updatedData.reduce(
        (sum, nominee) => sum + parseFloat(nominee.Share_New) || 0,
        0
      );
      setTotalShare(newTotalShare);
    }

    setUpdateNomineeData(updatedData);
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
  const handleAddRow = () => {
    // Check if the total share is less than 100 before adding a new row
    if (totalShare < 100 || isMinorDOB) {
      const newId = updateNomineeData.length + 1;
      const newRow = {
        id: newId,
        ClientID_New: "",
        NomineeFirstName_New: "",
        NomineeLastName_New: "",
        NomineeDOB_New: "",
        RealtionshipWithPolicyowner_New: null,
        Share_New: null,
        Role_New: null,
        isMinor: false,
      };

      // Update the state with the new row
      setUpdateNomineeData([...updateNomineeData, newRow]);
    } else {
      // Display an alert or handle the case where total share is already 100
      message.warning({
        content: "Total Share fullfilled. Can't add new nominee.",
        className: "custom-msg",
        duration: 2,
      });
    }
  };
  const handlePOSNomineeFirstNameChange = (index, newValue) => {
    setPosUpdateNomineeData((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        NomineeFirstName: newValue,
      };
      return newData;
    });
  };
  const handlePOSNomineeLastNameChange = (index, newValue) => {
    setPosUpdateNomineeData((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        NomineeLastName: newValue,
      };
      return newData;
    });
  };
  const handlePOSRelationshipChange = (index, value) => {
    const updatedData = [...posUpdateNomineeData];
    updatedData[index].RealtionshipWithPolicyowner = value;
    setPosUpdateNomineeData(updatedData);
  };
  const handlePOSRoleChange = (index, value, row) => {
    const updatedData = [...posUpdateNomineeData];
    updatedData[index].Role = value;
    if (value === "appointee") {
      updatedData[index].Share_New = 0;
      form.setFieldsValue({
        updateNomineeData: {
          [row.id]: {
            Share: 0,
          },
        },
      });

      const newTotalShare = updatedData.reduce(
        (sum, nominee) => sum + parseFloat(nominee.Share) || 0,
        0
      );
      setTotalShare(newTotalShare);
    }
    setPosUpdateNomineeData(updatedData);
  };

  const getOtherPoliciesWithSameOwner = async (clientId) => {
    try {
      setIsLoading(true);
      const searchObj = {
      requestheader: {
        source: "POS",
        policyNo: "",
        applicationNo: "",
         dob: "",
      },
      requestBody: {
        mobileNo: "",
        emailID: "",
        pan: "",
        customerID: clientId,
        firstName: "",
        middleName: "",
        lastName: "",
       
      },
    };
      const response = await apiCalls.getSearchData( searchObj );

      if (response?.data?.responseBody?.searchDetails) {
        const currentPolicyNo =
          details?.policyDetailsObj?.identifiers?.policyNo;

        // Filter policies where role is "Owner" and exclude current policy
        const ownerPolicies = response.data.responseBody.searchDetails.filter(
          (policy) =>
            policy.role?.includes("OW") && policy.policyNo !== currentPolicyNo // Exclude current policy
        );

        // Only show modal if there are OTHER policies (excluding current one)
        if (ownerPolicies.length > 0) {
          setOtherOwnerPolicies(ownerPolicies);
          setShowOwnerPoliciesModal(true);
        } else {
          console.log("No other policies found with same owner");
          // Don't show modal if no other policies found
        }
      }
    } catch (error) {
      console.error("Error fetching other policies:", error);
      // Don't show error to user as this is an informational check
    } finally {
      setIsLoading(false);
    }
  };
  const handlePOSShareChange = (index, newShare) => {
    const posUpdatedNomineeData = [...posUpdateNomineeData];
    posUpdatedNomineeData[index].Share = newShare;

    // Recalculate the total share
    const newTotalShare = posUpdatedNomineeData.reduce(
      (sum, nominee) => sum + parseFloat(nominee.Share) || 0,
      0
    );
    setTotalShare(newTotalShare);

    // Update the state
    setPosUpdateNomineeData(posUpdatedNomineeData);
  };
  const handlePOSDobChange = (newDob, index) => {
    const updatedPOSNomineeData = [...posUpdateNomineeData];
    updatedPOSNomineeData[index].NomineeDOB = newDob;
    updatedPOSNomineeData[index].NomineeDOB &&
      isMinor(updatedPOSNomineeData, index);
  };

  const handleNomineeSearch = (index, rowId) => {
    // console.log('Nominee search initiated for index:', index, 'rowId:', rowId);
    setSearchType("nominee");
    setTableIndex(index);
    // setCurrentRowId(rowId);
    setIsShowClientListModal(true);
  };

  //end
  const fetchData = async () => {
    try {
      setIsLoading(true);
      let obj = {
        ProdCode: details?.policyDetailsObj?.planAndStatus?.planCode,
        ProdUIN: details?.policyDetailsObj?.planAndStatus?.productUIN,
      };

      let response = await apiCalls.getProdConfigDropdown(obj);
      let filteredData = response?.data?.filter((item) => item.value === "Yes");
      let response1 = filteredData?.map((item) => ({
        ...item,
        label:
          item.config === "Allow_ConvertToPaidUp"
            ? "Convert into Paidup Policy"
            : "Revive policy within the revival period",
        value: item.config,
      }));

      setPolicyContinueLU(response1);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isEmailManagement && ContractAlterationData[selectedSubType]) {
      ContractAlterationData[selectedSubType]?.Update_PAN_Details?.forEach(
        (element) => {
          if (element?.name === "customerchoice") {
            element.hide = true;
          }
          if (element?.name === "requestchannel") {
            form.setFieldsValue({ requestchannel: 4 });
            element.hide = true;
            setEmsrequestchannel(4);
          }
        }
      );

      ContractAlterationData[selectedSubType]?.Update_PAN_Details?.forEach(
        (element) => {
          if (element?.name === "customerchoice") {
            element.hide = true;
          }
          if (element?.name === "requestchannel") {
            form.setFieldsValue({ requestchannel: 4 });
            element.hide = true;
            setEmsrequestchannel(4);
          }
        }
      );

      ContractAlterationData[selectedSubType]?.Update_DOB_Details?.forEach(
        (element) => {
          if (element?.name === "InitiateRequestBy") {
            element.hide = true;
          }
          if (element?.name === "requestchannel") {
            form.setFieldsValue({ requestchannel: 4 });
            element.hide = true;
            setEmsrequestchannel(4);
          }
        }
      );

      ContractAlterationData[
        selectedSubType
      ]?.Update_NEW_Owner_Details?.forEach((element) => {
        if (element?.name === "requestchannel") {
          form.setFieldsValue({ requestchannel: 4 });
          element.hide = true;
          setEmsrequestchannel(4);
        }
      });

      ContractAlterationData[
        selectedSubType
      ]?.Update_New_Signature_Fields?.forEach((element) => {
        if (element?.name === "requestchannel") {
          form.setFieldsValue({ requestchannel: 4 });
          element.hide = true;
          setEmsrequestchannel(4);
        }
      });

      ContractAlterationData[
        selectedSubType
      ]?.Update_AgentCode_Details?.forEach((element) => {
        if (element?.name === "requestchannel") {
          form.setFieldsValue({ requestchannel: 4 });
          element.hide = true;
          setEmsrequestchannel(4);
        }
      });

      ContractAlterationData[selectedSubType]?.Update_New_Details?.forEach(
        (element) => {
          if (element?.name === "requestchannel") {
            form.setFieldsValue({ requestchannel: 4 });
            element.hide = true;
            setEmsrequestchannel(4);
          }

          if (element?.name === "RequestForm") {
            form.setFieldsValue({ requestchannel: 4 });
            element.hide = true;
          }
        }
      );

      ContractAlterationData[selectedSubType]?.Update_Plan_Details?.forEach(
        (element) => {
          if (element?.name === "requestchannel") {
            form.setFieldsValue({ requestchannel: 4 });
            element.hide = true;
            setEmsrequestchannel(4);
          }
        }
      );

      ContractAlterationData[
        selectedSubType
      ]?.Update_SumAssured_Details?.forEach((element) => {
        if (element?.name === "requestchannel") {
          form.setFieldsValue({ requestchannel: 4 });
          element.hide = true;
          setEmsrequestchannel(4);
        }
      });

      ContractAlterationData[selectedSubType]?.Update_Premium_Details?.forEach(
        (element) => {
          if (element?.name === "requestchannel") {
            form.setFieldsValue({ requestchannel: 4 });
            element.hide = true;
            setEmsrequestchannel(4);
          }
        }
      );

      // Disable "Request Mode" in Change Fields
      ContractAlterationData[selectedSubType]?.BOE_Details?.forEach(
        (element) => {
          if (element?.label === "Request Mode") {
            form.setFieldsValue({ requestchannel: 4 });
            element.hide = true;
            setEmsrequestchannel(4);
          }
        }
      );

      if (
        !Array.isArray(
          ContractAlterationData[selectedSubType]?.Update_NEW_Owner_Details
        )
      ) {
        ContractAlterationData[selectedSubType].Update_NEW_Owner_Details = [];
      }

      // Remove existing instances of "Additional Note For Customer" before adding a new one
      ContractAlterationData[selectedSubType].Update_NEW_Owner_Details =
        ContractAlterationData[selectedSubType].Update_NEW_Owner_Details.filter(
          (comment) => comment.name !== "AdditionalNoteForCustomer"
        );

      // Add "Additional Note For Customer" once
      ContractAlterationData[selectedSubType].Update_NEW_Owner_Details.push({
        name: "AdditionalNoteForCustomer",
        label: "Additional Note For Customer",
        inputType: "complaintbox",
        maxlength: 4000,
        required: false,
        validationmsg: "Additional Note For Customer",
        placeholder: "Additional Note For Customer",
        width: "100%",
        rows: 4,
      });

      if (
        !Array.isArray(
          ContractAlterationData[selectedSubType]?.Update_New_Signature_Fields
        )
      ) {
        ContractAlterationData[selectedSubType].Update_New_Signature_Fields =
          [];
      }

      // Remove existing instances of "Additional Note For Customer" before adding a new one
      ContractAlterationData[selectedSubType].Update_New_Signature_Fields =
        ContractAlterationData[
          selectedSubType
        ].Update_New_Signature_Fields.filter(
          (comment) => comment.name !== "AdditionalNoteForCustomer"
        );

      // Add "Additional Note For Customer" once
      ContractAlterationData[selectedSubType].Update_New_Signature_Fields.push({
        name: "AdditionalNoteForCustomer",
        label: "Additional Note For Customer",
        inputType: "complaintbox",
        maxlength: 4000,
        required: false,
        validationmsg: "Additional Note For Customer",
        placeholder: "Additional Note For Customer",
        width: "100%",
        rows: 4,
      });
      if (
        !Array.isArray(
          ContractAlterationData[selectedSubType]?.Update_DOB_Details
        )
      ) {
        ContractAlterationData[selectedSubType].Update_DOB_Details = [];
      }

      // Remove existing instances of "Additional Note For Customer" before adding a new one
      ContractAlterationData[selectedSubType].Update_DOB_Details =
        ContractAlterationData[selectedSubType].Update_DOB_Details.filter(
          (comment) => comment.name !== "AdditionalNoteForCustomer"
        );

      // Add "Additional Note For Customer" once
      ContractAlterationData[selectedSubType].Update_DOB_Details.push({
        name: "AdditionalNoteForCustomer",
        label: "Additional Note For Customer",
        inputType: "complaintbox",
        maxlength: 4000,
        required: false,
        validationmsg: "Additional Note For Customer",
        placeholder: "Additional Note For Customer",
        width: "100%",
        rows: 4,
      });
      if (
        !Array.isArray(
          ContractAlterationData[selectedSubType]?.Update_GSTIN_Details
        )
      ) {
        ContractAlterationData[selectedSubType].Update_GSTIN_Details = [];
      }

      // Remove existing instances of "Additional Note For Customer" before adding a new one
      ContractAlterationData[selectedSubType].Update_GSTIN_Details =
        ContractAlterationData[selectedSubType].Update_GSTIN_Details.filter(
          (comment) => comment.name !== "AdditionalNoteForCustomer"
        );

      // Add "Additional Note For Customer" once
      ContractAlterationData[selectedSubType].Update_GSTIN_Details.push({
        name: "AdditionalNoteForCustomer",
        label: "Additional Note For Customer",
        inputType: "complaintbox",
        maxlength: 4000,
        required: false,
        validationmsg: "Additional Note For Customer",
        placeholder: "Additional Note For Customer",
        width: "100%",
        rows: 4,
      });
      if (
        !Array.isArray(
          ContractAlterationData[selectedSubType]?.Update_PAN_Details
        )
      ) {
        ContractAlterationData[selectedSubType].Update_PAN_Details = [];
      }

      // Remove existing instances of "Additional Note For Customer" before adding a new one
      ContractAlterationData[selectedSubType].Update_PAN_Details =
        ContractAlterationData[selectedSubType].Update_PAN_Details.filter(
          (comment) => comment.name !== "AdditionalNoteForCustomer"
        );

      // Add "Additional Note For Customer" once
      ContractAlterationData[selectedSubType].Update_PAN_Details.push({
        name: "AdditionalNoteForCustomer",
        label: "Additional Note For Customer",
        inputType: "complaintbox",
        maxlength: 4000,
        required: false,
        validationmsg: "Additional Note For Customer",
        placeholder: "Additional Note For Customer",
        width: "100%",
        rows: 4,
      });

      // Ensure Comments array exists
      if (
        !Array.isArray(
          ContractAlterationData[selectedSubType]?.Update_New_Details
        )
      ) {
        ContractAlterationData[selectedSubType].Update_New_Details = [];
      }

      // Remove existing instances of "Additional Note For Customer" before adding a new one
      ContractAlterationData[selectedSubType].Update_New_Details =
        ContractAlterationData[selectedSubType].Update_New_Details.filter(
          (comment) => comment.name !== "AdditionalNoteForCustomer"
        );

      // Add "Additional Note For Customer" once
      ContractAlterationData[selectedSubType].Update_New_Details.push({
        name: "AdditionalNoteForCustomer",
        label: "Additional Note For Customer",
        inputType: "complaintbox",
        maxlength: 4000,
        required: false,
        validationmsg: "Additional Note For Customer",
        placeholder: "Additional Note For Customer",
        width: "100%",
        rows: 4,
      });

      // Ensure Comments array exists
      if (
        !Array.isArray(
          ContractAlterationData[selectedSubType]?.Update_AgentCode_Details
        )
      ) {
        ContractAlterationData[selectedSubType].Update_AgentCode_Details = [];
      }

      // Remove existing instances of "Additional Note For Customer" before adding a new one
      ContractAlterationData[selectedSubType].Update_AgentCode_Details =
        ContractAlterationData[selectedSubType].Update_AgentCode_Details.filter(
          (comment) => comment.name !== "AdditionalNoteForCustomer"
        );

      // Add "Additional Note For Customer" once
      ContractAlterationData[selectedSubType].Update_AgentCode_Details.push({
        name: "AdditionalNoteForCustomer",
        label: "Additional Note For Customer",
        inputType: "complaintbox",
        maxlength: 4000,
        required: false,
        validationmsg: "Additional Note For Customer",
        placeholder: "Additional Note For Customer",
        width: "100%",
        rows: 4,
      });

      // Ensure Comments array exists
      // if (!Array.isArray(ContractAlterationData[selectedSubType]?.Comments)) {
      //     ContractAlterationData[selectedSubType].Comments = [];
      // }

      // // Remove existing instances of "Additional Note For Customer" before adding a new one
      // ContractAlterationData[selectedSubType].Comments = ContractAlterationData[selectedSubType].Comments.filter(
      //     comment => comment.name !== "AdditionalNoteForCustomer"
      // );

      // // Add "Additional Note For Customer" once
      // ContractAlterationData[selectedSubType].Comments.push(
      //   {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 1000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
      //   });
      //   if (!Array.isArray(ContractAlterationData[selectedSubType]?.Existing_PAN_Details)) {
      //     ContractAlterationData[selectedSubType].Existing_PAN_Details = [];
      // }

      // // Remove existing instances of "Additional Note For Customer" before adding a new one
      // ContractAlterationData[selectedSubType].Existing_PAN_Details = ContractAlterationData[selectedSubType].Existing_PAN_Details.filter(
      //     comment => comment.name !== "AdditionalNoteForCustomer"
      // );

      // Add "Additional Note For Customer" once
      // ContractAlterationData[selectedSubType].Existing_PAN_Details.push(
      //   {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 1000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
      //   });
      //   if (!Array.isArray(ContractAlterationData[selectedSubType]?.Existing_Details)) {
      //     ContractAlterationData[selectedSubType].Existing_Details = [];
      // }

      // // Remove existing instances of "Additional Note For Customer" before adding a new one
      // ContractAlterationData[selectedSubType].Existing_Details = ContractAlterationData[selectedSubType].Existing_Details.filter(
      //     comment => comment.name !== "AdditionalNoteForCustomer"
      // );

      // // Add "Additional Note For Customer" once
      // ContractAlterationData[selectedSubType].Existing_Details.push(
      //   {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 1000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
      //   });
      // if (!Array.isArray(ContractAlterationData[selectedSubType]?.Share_Process_Details)) {
      //   ContractAlterationData[selectedSubType].Share_Process_Details = [];
      // }

      // // Remove existing instances of "Additional Note For Customer" before adding a new one
      // ContractAlterationData[selectedSubType].Share_Process_Details = ContractAlterationData[selectedSubType].Share_Process_Details.filter(
      //   comment => comment.name !== "AdditionalNoteForCustomer"
      // );

      // // Add "Additional Note For Customer" once
      // ContractAlterationData[selectedSubType].Share_Process_Details.push(
      //   {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 1000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
      //   });
      if (
        !Array.isArray(ContractAlterationData[selectedSubType]?.Upload_Fields)
      ) {
        ContractAlterationData[selectedSubType].Upload_Fields = [];
      }

      // Remove existing instances of "Additional Note For Customer" before adding a new one
      ContractAlterationData[selectedSubType].Upload_Fields =
        ContractAlterationData[selectedSubType].Upload_Fields.filter(
          (comment) => comment.name !== "AdditionalNoteForCustomer"
        );

      // Add "Additional Note For Customer" once
      ContractAlterationData[selectedSubType].Upload_Fields.push({
        name: "AdditionalNoteForCustomer",
        label: "Additional Note For Customer",
        inputType: "complaintbox",
        maxlength: 4000,
        required: false,
        validationmsg: "Additional Note For Customer",
        placeholder: "Additional Note For Customer",
        width: "100%",
        rows: 4,
      });
      //   if (!Array.isArray(ContractAlterationData[selectedSubType]?.Existing_DOB_Details)) {
      //     ContractAlterationData[selectedSubType].Existing_DOB_Details = [];
      // }

      // // Remove existing instances of "Additional Note For Customer" before adding a new one
      // ContractAlterationData[selectedSubType].Existing_DOB_Details = ContractAlterationData[selectedSubType].Existing_DOB_Details.filter(
      //     comment => comment.name !== "AdditionalNoteForCustomer"
      // );

      // // Add "Additional Note For Customer" once
      // ContractAlterationData[selectedSubType].Existing_DOB_Details.push(
      //   {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 1000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
      //   });
      // if (!Array.isArray(ContractAlterationData[selectedSubType]?.Existing_Owner_Details)) {
      //   ContractAlterationData[selectedSubType].Existing_Owner_Details = [];
      // }

      // // Remove existing instances of "Additional Note For Customer" before adding a new one
      // ContractAlterationData[selectedSubType].Existing_Owner_Details = ContractAlterationData[selectedSubType].Existing_Owner_Details.filter(
      //   comment => comment.name !== "AdditionalNoteForCustomer"
      // );

      // // Add "Additional Note For Customer" once
      // ContractAlterationData[selectedSubType].Existing_Owner_Details.push(
      // {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 1000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
      // });
      // if (!Array.isArray(ContractAlterationData[selectedSubType]?.Share_Process_Communication)) {
      //   ContractAlterationData[selectedSubType].Share_Process_Communication = [];
      // }

      // // Remove existing instances of "Additional Note For Customer" before adding a new one
      // ContractAlterationData[selectedSubType].Share_Process_Communication = ContractAlterationData[selectedSubType].Share_Process_Communication.filter(
      //   comment => comment.name !== "AdditionalNoteForCustomer"
      // );

      // // Add "Additional Note For Customer" once
      // ContractAlterationData[selectedSubType].Share_Process_Communication.push(
      // {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 1000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
      // });
      // if (!Array.isArray(ContractAlterationData[selectedSubType]?.Existing_AgentCode_Details)) {
      //   ContractAlterationData[selectedSubType].Existing_AgentCode_Details = [];
      // }

      // // Remove existing instances of "Additional Note For Customer" before adding a new one
      // ContractAlterationData[selectedSubType].Existing_AgentCode_Details = ContractAlterationData[selectedSubType].Existing_AgentCode_Details.filter(
      //   comment => comment.name !== "AdditionalNoteForCustomer"
      // );

      // // Add "Additional Note For Customer" once
      // ContractAlterationData[selectedSubType].Existing_AgentCode_Details.push(
      // {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 1000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
      // });
      if (selectedSubType !== "changeinsignature") {
        // Ensure ContractAlterationData[selectedSubType] exists
        if (!ContractAlterationData[selectedSubType]) {
          ContractAlterationData[selectedSubType] = {};
        }

        // Ensure BOE_Details is an array
        if (
          !Array.isArray(ContractAlterationData[selectedSubType].BOE_Details)
        ) {
          ContractAlterationData[selectedSubType].BOE_Details = [];
        }

        // Remove existing instances of "Additional Note For Customer" before adding a new one
        ContractAlterationData[selectedSubType].BOE_Details =
          ContractAlterationData[selectedSubType].BOE_Details.filter(
            (comment) => comment.name !== "AdditionalNoteForCustomer"
          );

        // Add "Additional Note For Customer" once
        ContractAlterationData[selectedSubType].BOE_Details.push({
          name: "AdditionalNoteForCustomer",
          label: "Additional Note For Customer",
          inputType: "complaintbox",
          maxlength: 4000,
          required: false,
          validationmsg: "Additional Note For Customer",
          placeholder: "Additional Note For Customer",
          width: "100%",
          rows: 4,
        });
      }

      //   if (!Array.isArray(ContractAlterationData[selectedSubType]?.BOE_Details)) {
      //     ContractAlterationData[selectedSubType].BOE_Details = [];
      // }

      // // Remove existing instances of "Additional Note For Customer" before adding a new one
      // ContractAlterationData[selectedSubType].BOE_Details = ContractAlterationData[selectedSubType].BOE_Details.filter(
      //     comment => comment.name !== "AdditionalNoteForCustomer"
      // );

      // // Add "Additional Note For Customer" once
      // ContractAlterationData[selectedSubType].BOE_Details.push({
      //     name: "AdditionalNoteForCustomer",
      //     label: "Additional Note For Customer",
      //     inputType: "complaintbox",
      //     maxlength: 1000,
      //     required: false,
      //     validationmsg: "Additional Note For Customer",
      //     placeholder: "Additional Note For Customer",
      //     width: "100%",
      //     rows: 4
      // });

      // Hide specific checklist items
      ContractAlterationData[selectedSubType]?.Checklist?.forEach((element) => {
        if (
          [
            "requestform",
            "customersigningdate",
            "branchreceivedate",
            "ValidateSignature",
          ].includes(element?.name)
        ) {
          element.hide = true;
        }
      });

      ContractAlterationData[selectedSubType]?.BOE_Details?.forEach(
        (element) => {
          if (
            [
              "CustomerSigningDate",
              "BranchReceivedDate",
              "ValidateSignature",
            ].includes(element?.name)
          ) {
            element.hide = true;
          }
        }
      );
      // Disable "Request Mode" in Update Fields for all relevant subtypes
      const updateFields = [
        "Update_New_Details",
        "Update_New_Signature_Fields",
        "Update_AgentCode_Details",
        "Update_NEW_Owner_Details",
        "Update_Term_Details",
        "Update_DOB_Details",
        "Update_Plan_Details",
        "Update_SumAssured_Details",
        "Update_Premium_Details",
      ];

      updateFields.forEach((field) => {
        ContractAlterationData[selectedSubType]?.[field]?.forEach((element) => {
          if (
            element?.label === "Request Mode" ||
            element?.label === "Request Received Date" ||
            element?.label === "Customer Signing Date"
          ) {
            form.setFieldsValue({ requestchannel: 4 });
            element.hide = true;
          }
        });
      });

      updateFields.forEach((field) => {
        ContractAlterationData[selectedSubType]?.[field]?.forEach((element) => {
          if (
            element?.label === "Validate Signature" ||
            element?.label === "Request Received Date" ||
            element?.label === "Customer Signing Date"
          ) {
            //form.setFieldsValue({ requestchannel: 4 });
            element.hide = true;
          }
        });
      });

      // Hide unnecessary fields in Upload Fields
      ContractAlterationData[selectedSubType]?.Upload_Fields?.forEach(
        (element) => {
          if (
            [
              "UploadRequestForm",
              "CustomerSigningDate",
              "BranchReceivedDate",
              "ValidateSignature",
            ].includes(element?.name)
          ) {
            element.hide = true;
          }
        }
      );
      if (
        selectedSubType === "additionofrider" ||
        selectedSubType === "deletionofrider"
      ) {
        ContractAlterationData[selectedSubType]?.BOE_Details?.forEach(
          (element) => {
            if (
              [
                "UploadRequestForm",
                "CustomerSigningDate",
                "BranchReceivedDate",
                "ValidateSignature",
              ].includes(element?.name)
            ) {
              element.hide = true;
            }
          }
        );
      }
    }

    setShowAlert(false);
    setValidateOTPSuccess(false);
    setIsShowDOBRequestForms(false);
    setIsShowRequestDetails(false);
    setDocIdProofs([]);
    setAlertData("");
    if (
      selectedSubType === "gstinupdate" &&
      details?.policyDetailsObj?.planAndStatus?.customerType?.toLowerCase() !==
        "corporate"
    ) {
      setAlertTitle(`${"GSTIN Number cannot be updated for this policy !"}`);
      //setNavigateTo("/advancesearch");
      //if(!props?.EmailResponse?.IsEmailmanagent){
      //setNavigateTo("/advancesearch");
      // }
      setShowAlert(true);
      return;
    }
    // if(selectedSubType==="policycontinuation" && !details?.policyDetailsObj?.planAndStatus?.planName?.includes("Future Pension Plan") && details?.policyDetailsObj?.planAndStatus?.planCode!=="FVR"){
    //   setAlertData(`${"Requests cannot be taken for this policy!"}`);
    //           setNavigateTo("/advancesearch");
    //           setShowAlert(true);
    //           return;
    // }
    if (
      selectedSubType === "policycontinuation" &&
      ![
        "USR",
        "US2",
        "USS",
        "U01",
        "U02",
        "U05",
        "U07",
        "U07",
        "U08",
        "U11",
        "U12",
        "U13",
        "U14",
        "U15",
        "U16",
        "U17",
        "U18",
        "U19",
        "U20",
        "U21",
        "U22",
        "U23",
        "U24",
        "U25",
        "U26",
        "U27",
        "U28",
        "U29",
        "U30",
        "U31",
        "U32",
        "U09",
        "U10",
        "U06",
        "U33",
        "U34",
        "U35",
        "U36",
        "U37",
        "U38",
        "U39",
        "U40",
        "U41",
        "U42",
        "U43",
        "U44",
        "U45",
      ].includes(details?.policyDetailsObj?.planAndStatus?.planCode)
    ) {
      setAlertData(
        `${"Policy Continuation Request is not allowed under this plan!"}`
      );
      //setNavigateTo("/advancesearch");
      //if(!props?.EmailResponse?.IsEmailmanagent){
      //  setNavigateTo("/advancesearch");
      //}
      setShowAlert(true);
      return;
    } else if (selectedSubType === "policycontinuation") {
      fetchData();
    }
    if (
      selectedSubType === "changeindob" &&
      !isShowPOSScreen &&
      details?.policyDetailsObj?.planAndStatus?.policyStatus !== "IF" &&
      details?.policyDetailsObj?.planAndStatus?.policyStatus !== "PU"
    ) {
      setAlertTitle(`${"Request cannot be accepted for DOB change."}`);
      //setNavigateTo("/advancesearch");
      setShowAlert(true);
      return;
    }
    if (
      selectedSubType === "changeinownership" &&
      !isShowPOSScreen &&
      details?.policyDetailsObj?.planAndStatus?.policyStatus !== "IF" &&
      details?.policyDetailsObj?.planAndStatus?.policyStatus !== "PU"
    ) {
      setAlertTitle(`${"Ownership Change not allowed."}`);
      //setNavigateTo("/advancesearch");
      //if(!props?.EmailResponse?.IsEmailmanagent){
      //  setNavigateTo("/advancesearch");
      //}
      setShowAlert(true);
      return;
    }
    // if (selectedSubType === "changeinownership" && !isShowPOSScreen) {
    //   const ownerDetails = ContractAlterationData[selectedSubType]?.Update_NEW_Owner_Details;
    //   if (Array.isArray(ownerDetails)) {
    //     ownerDetails.forEach((element) => {
    //       if (element?.name === "NewOwnerClientID") {
    //         element.disabled = false;
    //       }
    //     });
    //   }
    // }

    setCheckedList([]);
    getProcesLink();
    form.resetFields();
  }, [selectedSubType]); // eslint-disable-next-line arrow-body-style

  const isRoleAuthorized = loginInfo?.userProfileInfo?.profileObj?.role === 37;
  const isCallTypeValid = props?.selectedCallType === 6;
  const isSubTypeValid = props?.selectedSubTypeId === 4;

  const isEnableSubmitButton =
    isRoleAuthorized && isCallTypeValid && isSubTypeValid;

  useEffect(() => {
    if (loginInfo && selectedSubType) {
      if (isEnableSubmitButton) {
        ContractAlterationData[selectedSubType]?.Update_DOB_Details?.forEach(
          (element) => {
            if (element?.name === "InitiateRequestBy") {
              element.hide = true;
            }
          }
        );
      }

    }
  }, [
    loginInfo,
    selectedSubType,
    props?.selectedCallType,
    props?.selectedSubTypeId,
  ]);

useEffect(() => {
          if (selectedSubType === "changeinownership" && !customerData?.isPOS) {
      
      if (customerData?.laName === customerData?.poName) {
        setAlertTitle("Change In Ownership Not Allowed");
        setNavigateTo("/advancesearch");
        setShowAlert(true);
        return;
      }
      const ownerClientId =
        customerData?.poClientID ||
        details?.policyDetailsObj?.identifiers?.poClientID;
      if (ownerClientId) {
        getOtherPoliciesWithSameOwner(ownerClientId);
      }
      getClientEnquiry();
    } 
  } 
      , [selectedSubType,selectedCallType]);
    
  useEffect(() => {
    console.log("Props have changed:", { clientEnquiryData });
    // You can add additional logic here to respond to prop changes
  }, [clientEnquiryData]);

  useEffect(() => {
 

   

    if (selectedSubType === "changeinsignature" && !isShowPOSScreen) {
      ContractAlterationData[selectedSubType]?.BOE_Details?.forEach(
        (element) => {
          if (
            customerData?.laName === customerData?.poName &&
            element?.label?.includes("Signature to be Changed For ?")
          ) {
            if (element?.name === "custRole") {
              element.disabled = true;
              setUpdateFields(true);
            }
            form.setFieldsValue({
              custRole: "Proposer",
            });
          }
        }
      );
    }

    !isShowPOSScreen && getBindEsistValues(checkedList[0]);
    if (
      POSContactData &&
      customerData?.isPOS &&
      (selectedSubType === "additionofrider" ||
        selectedSubType === "deletionofrider")
    ) {
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        posAdditionDeletionObj[element.tagName] = element.tagValue;
      });
      setIsShowPOSScreen(true);
      form.setFieldsValue({
        custRole: posAdditionDeletionObj?.custRole,
        srvReqID: posAdditionDeletionObj?.srvReqRefNo,
        RiderName: posAdditionDeletionObj?.RiderName,
        RequestFor: posAdditionDeletionObj?.RequestFor,
        BranchComments: posAdditionDeletionObj?.Comments,
        ValidateSignature: posAdditionDeletionObj?.ValidateSignature,
        CustomerSigningDate: POSContactData?.custSignDateTime
          ? convertDate(POSContactData?.custSignDateTime)
          : POSContactData?.custSignDateTime,
        BranchReceivedDate: POSContactData?.requestDateTime
          ? convertDate(POSContactData?.requestDateTime)
          : POSContactData?.requestDateTime,
        ReasonForDelay: POSContactData?.reasonDelayed,
        requestchannel: POSContactData?.reqMode,
      });
      ContractAlterationData[selectedSubType]?.POS_Details?.forEach(
        (element) => {
          if (
            element?.label?.includes("Reason For Delayed Submission") &&
            POSContactData?.reasonDelayed
          ) {
            element.hide = false;
            setShowReasonDelayField(true);
          }
        }
      );
    }
    if (
      POSContactData &&
      customerData?.isPOS &&
      selectedSubType === "changeinplan"
    ) {
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        posChangeinPlanObj[element.tagName] = element.tagValue;
      });
      setIsShowPOSScreen(true);
      form.setFieldsValue({
        custRole: posChangeinPlanObj?.custRole,
        srvReqID: posChangeinPlanObj?.srvReqRefNo,
        PlanName_Old: posChangeinPlanObj?.PlanName_Old,
        NewPlan_New: posChangeinPlanObj?.NewPlan_New,
        BranchComments: posChangeinPlanObj?.Comments,
        ValidateSignature: posChangeinPlanObj?.ValidateSignature,
        ReasonForChange_New: posChangeinPlanObj?.ReasonForChange_New,
        CustomerSigningDate: POSContactData?.custSignDateTime
          ? convertDate(POSContactData?.custSignDateTime)
          : POSContactData?.custSignDateTime,
        BranchReceivedDate: POSContactData?.requestDateTime
          ? convertDate(POSContactData?.requestDateTime)
          : POSContactData?.requestDateTime,
        ReasonForDelay: POSContactData?.reasonDelayed,
        requestchannel: POSContactData?.reqMode,
      });
      ContractAlterationData[selectedSubType]?.POS_Details?.forEach(
        (element) => {
          if (
            element?.label?.includes("Reason For Delayed Submission") &&
            POSContactData?.reasonDelayed
          ) {
            element.hide = false;
            setShowReasonDelayField(true);
          }
        }
      );
    } else if (
      POSContactData &&
      customerData?.isPOS &&
      selectedSubType === "changeinterm"
    ) {
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        posChangeinTermObj[element.tagName] = element.tagValue;
      });
      setIsShowPOSScreen(true);
      form.setFieldsValue({
        custRole: posChangeinTermObj?.custRole,
        srvReqID: posChangeinTermObj?.srvReqRefNo,
        PlanName_Old: posChangeinTermObj?.PlanName_Old,
        PolicyTerm_Old: posChangeinTermObj?.PolicyTerm_Old,
        CurrentPremium_Old: posChangeinTermObj?.CurrentPremium_Old,
        NewTerm_New: posChangeinTermObj?.NewTerm_New,
        BranchComments: posChangeinTermObj?.Comments,
        ValidateSignature: posChangeinTermObj?.ValidateSignature,
        CustomerSigningDate: POSContactData?.custSignDateTime
          ? convertDate(POSContactData?.custSignDateTime)
          : POSContactData?.custSignDateTime,
        BranchReceivedDate: POSContactData?.requestDateTime
          ? convertDate(POSContactData?.requestDateTime)
          : POSContactData?.requestDateTime,
        ReasonForDelay: POSContactData?.reasonDelayed,
        ReasonForChange_New: posChangeinTermObj?.ReasonForChange_New,
        requestchannel: POSContactData?.reqMode,
      });
      ContractAlterationData[selectedSubType]?.POS_Details?.forEach(
        (element) => {
          if (
            element?.label?.includes("Reason For Delayed Submission") &&
            POSContactData?.reasonDelayed
          ) {
            element.hide = false;
            setShowReasonDelayField(true);
          }
        }
      );
    } else if (
      POSContactData &&
      customerData?.isPOS &&
      selectedSubType === "changeinpremium"
    ) {
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        posChangeinPremiumObj[element.tagName] = element.tagValue;
      });
      setIsShowPOSScreen(true);
      form.setFieldsValue({
        custRole: posChangeinPremiumObj?.custRole,
        srvReqID: posChangeinPremiumObj?.srvReqRefNo,
        PlanName_Old: posChangeinPremiumObj?.PlanName_Old,
        CurrentPremium_Old: posChangeinPremiumObj?.CurrentPremium_Old,
        NewPremium_New: posChangeinPremiumObj?.NewPremium_New,
        ReasonForChange_New: posChangeinPremiumObj?.ReasonForChange_New,
        BranchComments: posChangeinPremiumObj?.Comments,
        ValidateSignature: posChangeinPremiumObj?.ValidateSignature,
        CustomerSigningDate: POSContactData?.custSignDateTime
          ? convertDate(POSContactData?.custSignDateTime)
          : POSContactData?.custSignDateTime,
        BranchReceivedDate: POSContactData?.requestDateTime
          ? convertDate(POSContactData?.requestDateTime)
          : POSContactData?.requestDateTime,
        ReasonForDelay: POSContactData?.reasonDelayed,
        requestchannel: POSContactData?.reqMode,
      });
      ContractAlterationData[selectedSubType]?.POS_Details?.forEach(
        (element) => {
          if (
            element?.label?.includes("Reason For Delayed Submission") &&
            POSContactData?.reasonDelayed
          ) {
            element.hide = false;
            setShowReasonDelayField(true);
          }
        }
      );
    } else if (
      POSContactData &&
      customerData?.isPOS &&
      selectedSubType === "changeinsumassured"
    ) {
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        posChangeinSumAssuredObj[element.tagName] = element.tagValue;
      });
      setIsShowPOSScreen(true);
      form.setFieldsValue({
        custRole: posChangeinSumAssuredObj?.custRole,
        srvReqID: posChangeinSumAssuredObj?.srvReqRefNo,
        SumAssured_Old: posChangeinSumAssuredObj?.SumAssured_Old,
        CurrentPremium_Old: posChangeinSumAssuredObj?.CurrentPremium_Old,
        SumAssured_New: posChangeinSumAssuredObj?.SumAssured_New,
        ReasonForChange_New: posChangeinSumAssuredObj?.ReasonForChange_New,
        BranchComments: posChangeinSumAssuredObj?.Comments,
        ValidateSignature: posChangeinSumAssuredObj?.ValidateSignature,
        CustomerSigningDate: POSContactData?.custSignDateTime
          ? convertDate(POSContactData?.custSignDateTime)
          : POSContactData?.custSignDateTime,
        BranchReceivedDate: POSContactData?.requestDateTime
          ? convertDate(POSContactData?.requestDateTime)
          : POSContactData?.requestDateTime,
        ReasonForDelay: POSContactData?.reasonDelayed,
        requestchannel: POSContactData?.reqMode,
      });
      ContractAlterationData[selectedSubType]?.POS_Details?.forEach(
        (element) => {
          if (
            element?.label?.includes("Reason For Delayed Submission") &&
            POSContactData?.reasonDelayed
          ) {
            element.hide = false;
            setShowReasonDelayField(true);
          }
        }
      );
    } else if (
      POSContactData &&
      customerData?.isPOS &&
      selectedSubType === "gstinupdate"
    ) {
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        posGSTScreenObj[element.tagName] = element.tagValue;
      });
      setIsShowPOSScreen(true);
      form.setFieldsValue({
        custRole: posGSTScreenObj?.custRole,
        srvReqID: POSContactData?.srvReqRefNo,
        GSTINToBeUpdateFor: parseInt(posGSTScreenObj?.GSTINToBeUpdateFor),
        ExistingGSTINNumber: posGSTScreenObj?.ExistingGSTINNumber,
        NewGSTINNumber: posGSTScreenObj?.NewGSTINNumber,
        UploadGSTINCertificate: posGSTScreenObj?.UploadGSTINCertificate,
        BranchComments: posGSTScreenObj?.Comments,
        ValidateSignature: posGSTScreenObj?.ValidateSignature,
        CustomerSigningDate: POSContactData?.custSignDateTime
          ? convertDate(POSContactData?.custSignDateTime)
          : POSContactData?.custSignDateTime,
        BranchReceivedDate: POSContactData?.requestDateTime
          ? convertDate(POSContactData?.requestDateTime)
          : POSContactData?.requestDateTime,
        ReasonForDelay: POSContactData?.reasonDelayed,
        requestchannel: POSContactData?.reqMode,
      });
    } else if (
      POSContactData &&
      customerData?.isPOS &&
      selectedSubType === "panupdate"
    ) {
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        posPANScreenObj[element.tagName] = element.tagValue;
      });
      setIsShowPOSScreen(true);
      form.setFieldsValue({
        custRole: posPANScreenObj?.custRole,
        srvReqID: POSContactData?.srvReqRefNo,
        PanValidation: posPANScreenObj?.PanValidation,
        NameinPAN: posPANScreenObj?.NameinPAN,
        NameMatch: posPANScreenObj?.NameMatch,
        // PanAadharSeeding:posPANScreenObj?.PanAadharSeeding,
        // Last2YearsITRFilling:posPANScreenObj?.Last2YearsITRFilling,
        NewPanNo: posPANScreenObj?.NewPanNo,
        ValidateSignature: posPANScreenObj?.validatesignature,
        CustomerSigningDate: POSContactData?.custSignDateTime
          ? convertDate(POSContactData?.custSignDateTime)
          : POSContactData?.custSignDateTime,
        BranchReceivedDate: POSContactData?.requestDateTime
          ? convertDate(POSContactData?.requestDateTime)
          : POSContactData?.requestDateTime,
        resonfordelay: POSContactData?.reasonDelayed,
        RequestType: posPANScreenObj?.ValidatedBy,
        RequestorComments:
          posPANScreenObj?.RequestorComments === undefined
            ? posPANScreenObj?.Comments
            : posPANScreenObj?.RequestorComments,
        requestchannel: POSContactData?.reqMode,
        RequestBy: posPANScreenObj?.ValidatedBy,
        PanUpdateFor_New: parseInt(posPANScreenObj?.PanUpdateFor_New),
      });
      setIsDisablePANApproveBtn(
        posPANScreenObj?.PanValidation?.includes("Existing and Valid PAN")
          ? false
          : true
      );
      if (posPANScreenObj?.ValidatedBy === "otp") {
        ContractAlterationData[selectedSubType]?.POS_Details?.forEach(
          (element) => {
            if (
              element?.label === "Request Form" ||
              element?.label?.includes("Customer Signing Date") ||
              element?.label?.includes("Request Received Date") ||
              element?.label === "Signature Validated"
            ) {
              element.hide = true;
              setUpdateFields(true);
            }
          }
        );
      }
      ContractAlterationData[selectedSubType]?.POS_Details?.forEach(
        (element) => {
          if (
            element?.label?.includes("Reason For Delayed Submission") &&
            POSContactData?.reasonDelayed
          ) {
            element.hide = false;
            setShowReasonDelayField(true);
          }
        }
      );
    } else if (
      POSContactData &&
      customerData?.isPOS &&
      selectedSubType === "agentcodecorrection"
    ) {
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        posAgentCodeScreenObj[element.tagName] = element.tagValue;
      });
      setIsShowPOSScreen(true);
      setIsExistingAgentCode(posAgentCodeScreenObj?.AgentCode_Old);
      form.setFieldsValue({
        custRole: posAgentCodeScreenObj?.custRole,
        srvReqID: posAgentCodeScreenObj?.srvReqRefNo,
        AgentCode_New: posAgentCodeScreenObj?.AgentCode_New,
        AgentName_New: posAgentCodeScreenObj?.AgentName_New,
        Reasonforagentcodechange:
          posAgentCodeScreenObj?.Reasonforagentcodechange,
        BranchComments: posAgentCodeScreenObj?.Comments,
        AgentSignaturVerificationResult:
          posAgentCodeScreenObj?.AgentSignaturVerificationResult,
        Agnet_Application_Number:
          posAgentCodeScreenObj?.Agnet_Application_Number,
        Agent_Status: posAgentCodeScreenObj?.Agent_Status,
        requestchannel: POSContactData?.reqMode,
      });
      setIsAgentApplicationNo(posAgentCodeScreenObj?.Agnet_Application_Number);
    }
    // else if (POSContactData && customerData?.isPOS&&selectedSubType==="changeinname") {
    //   await handleSearchClientData();
    //   POSContactData?.serviceRequestTransectionData?.forEach(element => {
    //     posChangeinNameObj[element.tagName] = element.tagValue
    //   });
    //   setIsShowPOSScreen(true);
    //   form.setFieldsValue({
    //     custRole: posChangeinNameObj?.custRole,
    //     srvReqID: posChangeinNameObj?.srvReqRefNo,
    //     Update_New:posChangeinNameObj?.Update_New,
    //     Salutation_New:posChangeinNameObj?.Salutation_New,
    //     FirstName_New:posChangeinNameObj?.FirstName_New,
    //     MiddleName_New:posChangeinNameObj?.MiddleName_New,
    //     LastName_New:posChangeinNameObj?.LastName_New,
    //     Comments:posChangeinNameObj?.Comments,
    //     RefertoNBStageDocument:posChangeinNameObj?.Stage_Document,
    //     ValidateSignature:posChangeinNameObj?.Validate_Signature,
    //     CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
    //     BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
    //     ReasonForDelay: POSContactData?.reasonDelayed,
    //     requestchannel: POSContactData?.reqMode,
    //     DedupeMatch: POSContactData?.deDupPayload[0]?.deDupPayload[0]?.ResponseBody != null &&  POSContactData?.deDupPayload[0]?.deDupPayload[0]?.ResponseBody?.ClientDetails?.length >0 ? "yes" : "no"
    //   });
    //   ContractAlterationData[selectedSubType]?.POS_Details?.forEach(element => {
    //     if((element?.label?.includes("Name Change Proof")||element?.label?.includes("ID Proof")||element?.label?.includes("View Address Proof"))&& posChangeinNameObj?.Stage_Document==="yes"){
    //       element.hide= false;
    //       setShowReasonDelayField(true);
    //     }
    //   });

    //   ContractAlterationData[selectedSubType]?.POS_Details?.forEach(element => {
    //     if(element?.label?.includes("Reason For Delayed Submission")&& POSContactData?.reasonDelayed){
    //       element.hide= false;
    //       setShowReasonDelayField(true);
    //     }
    //   });

    // }
    else if (
      POSContactData &&
      customerData?.isPOS &&
      selectedSubType === "changeinname"
    ) {
      // setIsShowPOSScreen(true);
      // const fetchData = async () => {
      //   await handleSearchClientData(); // Wait for API response

      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        posChangeinNameObj[element.tagName] = element.tagValue;
      });

      setIsShowPOSScreen(true);

      form.setFieldsValue({
        custRole: posChangeinNameObj?.custRole,
        srvReqID: posChangeinNameObj?.srvReqRefNo,
        ModifiedClientID: posChangeinNameObj?.ModifiedClientID,
        Salutation_New: posChangeinNameObj?.Salutation_New,
        FirstName_New: posChangeinNameObj?.FirstName_New,
        MiddleName_New: posChangeinNameObj?.MiddleName_New,
        LastName_New: posChangeinNameObj?.LastName_New,
        Comments: posChangeinNameObj?.Comments,
        RefertoNBStageDocument: posChangeinNameObj?.Stage_Document,
        ValidateSignature: posChangeinNameObj?.Validate_Signature,
        CustomerSigningDate: POSContactData?.custSignDateTime
          ? convertDate(POSContactData?.custSignDateTime)
          : POSContactData?.custSignDateTime,
        BranchReceivedDate: POSContactData?.requestDateTime
          ? convertDate(POSContactData?.requestDateTime)
          : POSContactData?.requestDateTime,
        ReasonForDelay: POSContactData?.reasonDelayed,
        requestchannel: POSContactData?.reqMode,
        DedupeMatch:
          POSContactData?.deDupPayload[0]?.deDupPayload[0]?.ResponseBody !=
            null &&
          POSContactData?.deDupPayload[0]?.deDupPayload[0]?.ResponseBody
            ?.ClientDetails?.length > 0
            ? "yes"
            : "no",
      });

      ContractAlterationData[selectedSubType]?.POS_Details?.forEach(
        (element) => {
          if (
            (element?.label?.includes("Name Change Proof") ||
              element?.label?.includes("ID Proof") ||
              element?.label?.includes("View Address Proof")) &&
            posChangeinNameObj?.Stage_Document === "yes"
          ) {
            element.hide = false;
            setShowReasonDelayField(true);
          }
        }
      );

      ContractAlterationData[selectedSubType]?.POS_Details?.forEach(
        (element) => {
          if (
            element?.label?.includes("Reason For Delayed Submission") &&
            POSContactData?.reasonDelayed
          ) {
            element.hide = false;
            setShowReasonDelayField(true);
          }
        }
      );
      // };

      // fetchData(); // Call the async function
    } else if (
      POSContactData &&
      customerData?.isPOS &&
      selectedSubType === "changeinsignature"
    ) {
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        posChangeinSignatureObj[element.tagName] = element.tagValue;
      });
      setIsShowPOSScreen(true);
      form.setFieldsValue({
        custRole: POSContactData?.custRole,
        srvReqID: posChangeinSignatureObj?.srvReqRefNo,
        CustomerSigningDate: POSContactData?.custSignDateTime
          ? convertDate(POSContactData?.custSignDateTime)
          : POSContactData?.custSignDateTime,
        BranchReceivedDate: POSContactData?.requestDateTime
          ? convertDate(POSContactData?.requestDateTime)
          : POSContactData?.requestDateTime,
        resonfordelay: POSContactData?.reasonDelayed,
        ValidateSignature: posChangeinSignatureObj?.ValidateSignature,
        BranchComments: posChangeinSignatureObj?.Comments,
        requestchannel: POSContactData?.reqMode,
      });
      ContractAlterationData[selectedSubType]?.POS_Details?.forEach(
        (element) => {
          if (
            element?.label?.includes("Reason For Delayed Submission") &&
            POSContactData?.reasonDelayed
          ) {
            element.hide = false;
            setShowReasonDelayField(true);
          }
        }
      );
    } else if (
      POSContactData &&
      customerData?.isPOS &&
      selectedSubType === "changeinownership"
    ) {
      setIsShowPOSScreen(true);
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        changeinownershipObj[element.tagName] = element.tagValue;
      });

      form.setFieldsValue({
        custRole: changeinownershipObj?.custRole,
        srvReqID: changeinownershipObj?.srvReqRefNo,
        CustomerSigningDate: changeinownershipObj?.CustomerSigningDate
          ? convertDate(changeinownershipObj?.CustomerSigningDate)
          : changeinownershipObj?.CustomerSigningDate,
        BranchReceivedDate: changeinownershipObj?.BranchReceivedDate
          ? convertDate(changeinownershipObj?.BranchReceivedDate)
          : changeinownershipObj?.BranchReceivedDate,
        //ProposerName_New: changeinownershipObj?.ProposerName_New,
        NewOwnerClientID: changeinownershipObj?.NewOwnerClientID,
        Salutation: changeinownershipObj?.Salutation,
        MaritialStatus: changeinownershipObj?.MaritialStatus,
        ProposerFirstName_New: changeinownershipObj?.ProposerFirstName_New,
        ProposerLastName_New: changeinownershipObj?.ProposerLastName_New,
        AddressLine1_New: changeinownershipObj?.AddressLine1_New,
        AddressLine2_New: changeinownershipObj?.AddressLine2_New,
        AddressLine3_New: changeinownershipObj?.AddressLine3_New,
        PINCode: changeinownershipObj?.PINCode,
        City_New: changeinownershipObj?.City_New,
        State_New: changeinownershipObj?.State_New,
        MobileNumber_New: changeinownershipObj?.MobileNumber_New,
        ProposerEmailID_New: changeinownershipObj?.ProposerEmailID_New,
        ReasonForOwnershipChange:
          changeinownershipObj?.ReasonForOwnershipChange,
        ProposerDOB_New: changeinownershipObj?.ProposerDOB_New
          ? dayjs(changeinownershipObj?.ProposerDOB_New, "DD/MM/YYYY")
          : changeinownershipObj?.ProposerDOB_New,
        PANNumber: changeinownershipObj?.PANNumber,
        PANResult: changeinownershipObj?.PANResult,
        NameMatch: changeinownershipObj?.NameMatch,
        CKYCNumber: changeinownershipObj?.CKYCNumber,
        BankIFSC: changeinownershipObj?.BankIFSC,
        BankName: changeinownershipObj?.BankName,
        BranchName: changeinownershipObj.BranchName,
        AccountType: isNaN(parseInt(changeinownershipObj?.AccountType))
          ? changeinownershipObj?.AccountType
          : parseInt(changeinownershipObj?.AccountType),
        NameAsMentionedInTheBank:
          changeinownershipObj?.NameAsMentionedInTheBank,
        BankAccountNumber: changeinownershipObj?.BankAccountNumber,
        InitiatePennyDrop: changeinownershipObj?.InitiatePennyDrop,
        NameasperPennyDrop: changeinownershipObj?.NameasperPennyDrop,
        NamematchasperPennyDrop: changeinownershipObj?.NamematchasperPennyDrop,
        RelationtoLifeAssured: changeinownershipObj?.RelationtoLifeAssured,
        ProposerDOB: changeinownershipObj?.ProposerDOB,
        ValidateSignature: changeinownershipObj?.ValidateSignature,
        requestchannel: POSContactData?.reqMode,
        RequestorComments:
          changeinownershipObj?.RequestorComments === undefined
            ? changeinownershipObj?.Comments
            : changeinownershipObj?.RequestorComments,
        ReasonForDelay: POSContactData?.reasonDelayed,
        // NameinPANN: changeinownershipObj?.NameinPANN,
        // PANValidationStatus: changeinownershipObj?.PANValidationStatus,
        // NameMatch: changeinownershipObj?.NameMatch,
      });
      ContractAlterationData[selectedSubType]?.POS_Details?.forEach(
        (element) => {
          if (
            element?.label?.includes("Reason For Delayed Submission") &&
            POSContactData?.reasonDelayed
          ) {
            element.hide = false;
            setShowReasonDelayField(true);
          }
        }
      );
      //Added by sayali on 16/07/2025 for Added nominee details in Assignment
      const newData = POSContactData?.serviceRequestTransectionData?.filter(
        (item) => item.status === "Create" && item.tagName?.includes("New")
      );
      // Consolidate data into an array of objects
      const consolidatedNewData = newData.reduce((acc, item) => {
        const match = item.tagName?.match(/_(New_\d+)$/);
        if (match) {
          const index = match[1]; // Extract the dynamic index (e.g., New_1, New_2)
          const fieldName = item.tagName.replace(`_${index}`, "");
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

      getRelationsData(
        null,
        null,
        consolidatedNewData,
        posChangeinNomineeObj?.Client_Id,
        "true"
      );
      // end
    } else if (
      POSContactData &&
      customerData?.isPOS &&
      selectedSubType === "changeindob"
    ) {
      setIsShowPOSScreen(true);
      // const fetchData = async () => {
      //   await handleSearchClientData(); // Wait for API response
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        posChangeInDobScreenObj[element.tagName] = element.tagValue;
      });
      form.setFieldsValue({
        custRole: POSContactData?.custRole,
        ModifiedClientID: posChangeInDobScreenObj?.ModifiedClientID,
        NewDateofBirth: posChangeInDobScreenObj?.NewDateofBirth,
        RefertoNBStageDocument: posChangeInDobScreenObj.RefertoNBStageDocument,
        Age: posChangeInDobScreenObj.Age,
        CustomerSigningDate: POSContactData?.custSignDateTime
          ? convertDate(POSContactData?.custSignDateTime)
          : POSContactData?.custSignDateTime,
        BranchReceivedDate: POSContactData?.requestDateTime
          ? convertDate(POSContactData?.requestDateTime)
          : POSContactData?.requestDateTime,

        ValidateSignature: posChangeInDobScreenObj.ValidateSignature,
        ReasonForDelayy: posChangeInDobScreenObj.ReasonForDelay,
        BranchComments: posChangeInDobScreenObj.Comments,
        requestchannel: POSContactData?.reqMode,
      });
      ContractAlterationData[selectedSubType]?.POS_Details?.forEach(
        (element) => {
          if (
            (element.name === "CustomerSigningDate" ||
              element.name === "BranchReceivedDate") &&
            posChangeInDobScreenObj.InitiateRequestBy !== "otp"
          ) {
            element.hide = false;
          }
          if (
            element.name === "ValidateSignature" &&
            posChangeInDobScreenObj?.ValidateSignature
          ) {
            element.hide = false;
          }
          if (
            element.name === "BranchComments" &&
            posChangeInDobScreenObj?.Comments
          ) {
            element.hide = false;
          }
          if (
            element?.name === "ReasonForDelayy" &&
            posChangeInDobScreenObj?.ReasonForDelay
          ) {
            element.hide = false;
          }
        }
      );
      // }
      // fetchData();
    } else if (
      POSContactData &&
      customerData?.isPOS &&
      selectedSubType === "policycontinuation"
    ) {
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        posAdditionDeletionObj[element.tagName] = element.tagValue;
      });
      setIsShowPOSScreen(true);
      form.setFieldsValue({
        PolicyContinuance: posAdditionDeletionObj?.PolicyContinuance,
        srvReqID: posAdditionDeletionObj?.srvReqRefNo,
        PolicyContinuanceAvaliableTill:
          posAdditionDeletionObj?.PolicyContinuanceAvaliableTill,
        RequestorComments: posAdditionDeletionObj?.RequestorComments,
        ValidateSignature: posAdditionDeletionObj?.ValidateSignature,
        CustomerSigningDate: POSContactData?.custSignDateTime
          ? convertDate(POSContactData?.custSignDateTime)
          : POSContactData?.custSignDateTime,
        BranchReceivedDate: POSContactData?.requestDateTime
          ? convertDate(POSContactData?.requestDateTime)
          : POSContactData?.requestDateTime,
        ReasonForDelay: POSContactData?.reasonDelayed,
        requestchannel: POSContactData?.reqMode,
        PolicytobeRevivedBy: posAdditionDeletionObj?.PolicytobeRevivedBy,
      });
      ContractAlterationData[selectedSubType]?.POS_Details?.forEach(
        (element) => {
          if (
            element?.label?.includes("Reason For Delayed Submission") &&
            POSContactData?.reasonDelayed
          ) {
            element.hide = false;
            setShowReasonDelayField(true);
          }
        }
      );
    }
  }, []); // eslint-disable-next-line arrow-body-style

  useEffect(() => {
    setIsDisableNewMobileNo(false);
    setIsIDMultipleFiles([]);
    setUploadIDMultipleFiles([]);
    setIsMultipleFiles([]);
    setUploadMultipleFiles([]);
    handleAddressModalClose();
    handleIdProofModalClose();
    if (selectedSubType === "panupdate") {
      const boeDetails =
        ContractAlterationData[selectedSubType]?.Update_PAN_Details;
      if (validateOTPSuccess) {
        if (boeDetails) {
          boeDetails.forEach((element) => {
            if (
              element?.name === "PanUpdateFor_New" ||
              element?.name === "requestchannel" ||
              element?.name === "NewPanNo"
            ) {
              element.disabled = true;
            }
          });
        }
        setIsDisableNewMobileNo(true);
      } else {
        if (boeDetails) {
          boeDetails.forEach((element) => {
            if (
              element?.name === "PanUpdateFor_New" ||
              element?.name === "requestchannel" ||
              element?.name === "NewPanNo"
            ) {
              element.disabled = false;
            }
          });
        }
        setIsDisableNewMobileNo(false);
      }
    } else if (selectedSubType === "changeindob") {
      const boeDetails =
        ContractAlterationData[selectedSubType]?.Update_DOB_Details;
      const validElementNames = [
        "custRole",
        "ModifiedClientID",
        "NewDateofBirth",
        "RefertoNBStageDocument",
      ];
      if (validateOTPSuccess) {
        if (boeDetails) {
          boeDetails.forEach((element) => {
            if (validElementNames?.includes(element?.name)) {
              element.disabled = true;
            }
          });
        }
        setIsDisableNewMobileNo(true);
      } else {
        if (boeDetails) {
          boeDetails.forEach((element) => {
            if (validElementNames?.includes(element?.name)) {
              element.disabled = false;
            }
          });
        }
        setIsDisableNewMobileNo(false);
      }
    }
  }, [validateOTPSuccess, selectedSubType]); // eslint-disable-next-line arrow-body-style

  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day"); // Can not select days before today and today
  };

  const calculateAge = (birthDateString) => {
    const today = new Date();
    const birthDate = new Date(
      parseInt(birthDateString.substring(0, 4)),
      parseInt(birthDateString.substring(4, 6)) - 1,
      parseInt(birthDateString.substring(6, 8))
    );

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleChange = (value) => {
    setShowRaiseRequirementBtn(false);
    hideCommunications();
    form.resetFields();
    // If the checkbox is allready checked, uncheck it
    if (checkedList.includes(value)) {
      setCheckedList([]);
    } else {
      // Otherwise, check it
      setCheckedList([value]);
      getBindEsistValues(value);
    }

    if (selectedSubType === "gstinupdate" && !isShowPOSScreen) {
      if (value?.includes("Update New GSTIN")) {
        ContractAlterationData[selectedSubType]?.Update_GSTIN_Details?.forEach(
          (element) => {
            if (element.name === "requestchannel") {
              element.disabled = true;
              form.setFieldsValue({
                requestchannel: 4,
              });
            }
            if (
              element.name === "requestform" ||
              element.name === "CustomerSigningDate" ||
              element.name === "BranchReceivedDate" ||
              element.name === "ValidateSignature"
            ) {
              element.required = false;
              element.hide = true;
            }
          }
        );
      }
    }
    if (selectedSubType === "changeindob" && !isShowPOSScreen) {
      setDisableOTP(false);
      handleSearchClientData(value);
      //   if(customerData?.laName === customerData?.poName){
      //     form.setFieldsValue({
      //       custRole: 2
      //     })
      //     if(value?.includes("View Existing DOB Details")){
      //       ContractAlterationData[selectedSubType]?.Existing_DOB_Details?.forEach(element => {
      //         if(element?.name==="custRole"){
      //           element.disabled= true;
      //           setUpdateFields(false);
      //         }
      //       }
      //     );
      //     }
      //     else if(value?.includes("Update New DOB Details")){
      //       ContractAlterationData[selectedSubType]?.Update_DOB_Details?.forEach(element => {
      //         if(element?.name==="custRole"){
      //           element.disabled= true;
      //           setUpdateFields(true);
      //         }
      //       });

      //   }
      //   getClientEnquiry(2)
      // }
      // else {
      //   if(value?.includes("View Existing DOB Details")){
      //   ContractAlterationData[selectedSubType]?.Existing_DOB_Details?.forEach(element => {
      //      if(element?.name==="custRole"){
      //        element.disabled= false;
      //        setUpdateFields(true);
      //      }
      //    });
      //   }
      //    else if(value?.includes("Update New DOB Details")){
      //     ContractAlterationData[selectedSubType]?.Update_DOB_Details?.forEach(element => {
      //       if(element?.name==="custRole"){
      //         element.disabled= false;
      //         setUpdateFields(true);
      //       }
      //     });
      //    }
      //    form.resetFields();
      //  }
    }

    form.setFieldsValue({
      ClientId_Old: ClientEnquiry?.clntnum,
      AddressLine1_Old: ClientEnquiry?.cltaddR01,
      AddressLine2_Old: ClientEnquiry?.cltaddR02,
      AddressLine3_Old: ClientEnquiry?.cltaddR03,
      City_Old: ClientEnquiry?.cltaddR04,

      PINCode_Old: ClientEnquiry?.cltpcode,
      State_Old: ClientEnquiry?.cltaddR05,
      ProposerDOB_Old: ClientEnquiry?.clTdob
        ? convertDate(ClientEnquiry?.clTdob)
        : "",
      MobileNumber_Old: ClientEnquiry?.rmblphone,
      ProposerEmailID_Old: ClientEnquiry?.rinternet,
      ProposerName_Old: customerData?.poName,
      ProposerFirstName_Old: ClientEnquiry?.lgivname,
      ProposerLastName_Old: ClientEnquiry?.lsurname,
      ProposerPANNumber_Old: ClientEnquiry?.rtaxidnum,
    });

    if (selectedSubType === "changeinname" && !isShowPOSScreen) {
      handleSearchClientData(value);
      //   if(details?.policyDetailsObj?.identifiers?.la_Name===details?.policyDetailsObj?.identifiers?.po_Name){
      //     if(value?.includes("View Existing Details")){
      //       form.setFieldsValue({
      //         Update_Existing: clientListLU?.length > 1 ? clientListLU[1]?.value : ""
      //       })
      //       ContractAlterationData[selectedSubType]?.Existing_Details?.forEach(element => {
      //         if(element?.name==="Update_Existing"){
      //           element.disabled= true;
      //           setUpdateFields(false);
      //         }
      //       });
      //     }
      // //     else if(value?.includes("Update New Details")){
      // //       ContractAlterationData[selectedSubType]?.Update_New_Details?.forEach(element => {
      // //         if(element?.name==="ModifiedClientID"){
      // //           element.disabled= true;
      // //           setUpdateFields(true);
      // //         }
      // //       });
      // //  }
      // //  getClientEnquiry(2);
      //  }
      //  else {
      //   if(value?.includes("View Existing Details")){
      //   ContractAlterationData[selectedSubType]?.Existing_Details?.forEach(element => {
      //      if(element?.name==="Update_Existing"){
      //        element.disabled= false;
      //        setUpdateFields(true);
      //      }
      //    });
      //   }
      //    else if(value?.includes("Update New Details")){
      //     ContractAlterationData[selectedSubType]?.Update_New_Details?.forEach(element => {
      //       if(element?.name==="ModifiedClientID"){
      //         element.disabled= false;
      //         setUpdateFields(true);
      //       }
      //     });
      //    }
      //    form.resetFields();
      //  }
    } else if (
      selectedSubType === "changeinownership" &&
      value?.includes("Update New Owner Details")
    ) {
      form.setFieldsValue({
        ReasonForOwnershipChange: "DeathofProposer",
      });
      //Added by sayali on 11/08/2025 for Added nominee details in update new owner details
      if (value?.includes("Update New Owner Details")) {
        getRelationsData(
          null,
          value,
          null,
          props?.details?.policyDetailsObj?.identifiers?.po_ClientID
        );
      }
    } else if (
      selectedSubType === "changeinownership" &&
      value?.includes("View Existing Owner Details")
    ) {
      getClientEnquiry(customerData?.poClientID, selectedSubType);
    } else if (
      selectedSubType === "panupdate" &&
      value?.includes("View Existing PAN Details")
    ) {
      if (
        details?.policyDetailsObj?.identifiers?.la_Name ===
        details?.policyDetailsObj?.identifiers?.po_Name
      ) {
        form.setFieldsValue({
          PanUpdateFor_Old: 2,
        });
        ContractAlterationData[selectedSubType]?.Existing_PAN_Details?.forEach(
          (element) => {
            if (["PanUpdateFor_Old"]?.includes(element?.name)) {
              element.disabled = true;
              setUpdateFields(true);
            }
          }
        );
        getClientEnquiry(2);
      } else {
        ContractAlterationData[selectedSubType]?.Existing_PAN_Details?.forEach(
          (element) => {
            if (["PanUpdateFor_Old"]?.includes(element?.name)) {
              element.disabled = false;
              setUpdateFields(true);
            }
          }
        );
        form.resetFields();
      }
    } else if (
      selectedSubType === "panupdate" &&
      value?.includes("Update New PAN")
    ) {
      if (
        details?.policyDetailsObj?.identifiers?.la_Name ===
        details?.policyDetailsObj?.identifiers?.po_Name
      ) {
        form.setFieldsValue({
          PanUpdateFor_New: 2,
        });
        ContractAlterationData[selectedSubType]?.Update_PAN_Details?.forEach(
          (element) => {
            if (["PanUpdateFor_New"]?.includes(element?.name)) {
              element.disabled = true;
              setUpdateFields(true);
            }
          }
        );
        getClientEnquiry(2);
      } else {
        ContractAlterationData[selectedSubType]?.Update_PAN_Details?.forEach(
          (element) => {
            if (["PanUpdateFor_New"]?.includes(element?.name)) {
              element.disabled = false;
              setUpdateFields(true);
            }
          }
        );
        form.resetFields();
      }
    }
  };

  const hideCommunications = () => {
    setActiveEmailIcons([]);
    setActiveMobileIcons([]);
    setActiveWhatsAppIcons([]);
    setShowPhoneNumber(false);
    setShowEmailAddress(false);
    setShowWhatsApp(false);
  };

  const getProcesLink = () => {
    setIsProcessLink("");
    setIsDocLink("");
    let obj = {
      Call_Typ: selectedCallType,
      Sub_Typ: selectedSubTypeId,
    };
    let response = apiCalls.getProcesLink(obj);
    response
      .then((val) => {
        if (val?.data) {
          const filteredData = val?.data?.filter((ele) => {
            if (ele.docType === "AcceptableDocs") {
              setIsDocLink(ele.link);
            } else if (ele.docType === SelectedSubTypeVal) {
              setIsProcessLink(ele.link);
            }
            return ele.docType;
          });
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
      .catch((err) => {});
  };

  const getBindEsistValues = (value) => {
    if (selectedSubType === "agentcodecorrection") {
      setIsExistingAgentCode(
        details?.policyDetailsObj?.salesDetails?.agentCode
      );
      form.setFieldsValue({
        AgentCode_Old: details?.policyDetailsObj?.salesDetails?.agentCode,
        AgentName_Old: details?.policyDetailsObj?.salesDetails?.agentName,
        Channel_Old: details?.policyDetailsObj?.salesDetails?.channel,
        AgentBranch_Old: details?.policyDetailsObj?.identifiers?.branchName,
      });
      setIsAgentExistingObj({
        AgentCode_Old: details?.policyDetailsObj?.salesDetails?.agentCode,
        AgentName_Old: details?.policyDetailsObj?.salesDetails?.agentName,
        Channel_Old: details?.policyDetailsObj?.salesDetails?.channel,
        AgentBranch_Old: details?.policyDetailsObj?.identifiers?.branchName,
      });
    } else if (selectedSubType === "changeinterm") {
      form.setFieldsValue({
        PlanName_Old: details?.policyDetailsObj?.planAndStatus?.planName,
        PolicyTerm_Old: details?.policyDetailsObj?.saDetails?.pt,
        CurrentPremium_Old:
          details?.policyDetailsObj?.premiumDetails?.modelPremiumAmount,
      });
      setIsTermExistingObj({
        PlanName_Old: details?.policyDetailsObj?.planAndStatus?.planName,
        PolicyTerm_Old: details?.policyDetailsObj?.saDetails?.pt,
        CurrentPremium_Old:
          details?.policyDetailsObj?.premiumDetails?.modelPremiumAmount,
      });
    } else if (selectedSubType === "changeinplan") {
      form.setFieldsValue({
        PlanName_Old: details?.policyDetailsObj?.planAndStatus?.planName,
        PolicyTerm_Old: details?.policyDetailsObj?.saDetails?.pt,
        CurrentPremium_Old:
          details?.policyDetailsObj?.premiumDetails?.modelPremiumAmount,
      });
      setIsPlanExistingObj({
        PlanName_Old: details?.policyDetailsObj?.planAndStatus?.planName,
        PolicyTerm_Old: details?.policyDetailsObj?.saDetails?.pt,
        CurrentPremium_Old:
          details?.policyDetailsObj?.premiumDetails?.modelPremiumAmount,
      });
    } else if (selectedSubType === "changeinpremium") {
      form.setFieldsValue({
        PlanName_Old: details?.policyDetailsObj?.planAndStatus?.planName,
        PolicyPremium_Old: details?.policyDetailsObj?.saDetails?.pt,
        CurrentPremium_Old:
          details?.policyDetailsObj?.premiumDetails?.modelPremiumAmount,
      });
      setIsPremiumExistingObj({
        PlanName_Old: details?.policyDetailsObj?.planAndStatus?.planName,
        PolicyPremium_Old: details?.policyDetailsObj?.saDetails?.pt,
        CurrentPremium_Old:
          details?.policyDetailsObj?.premiumDetails?.modelPremiumAmount,
      });
    } else if (selectedSubType === "changeinsumassured") {
      form.setFieldsValue({
        SumAssured_Old: details?.policyDetailsObj?.saDetails?.sumAssured,
        CurrentPremium_Old:
          details?.policyDetailsObj?.premiumDetails?.modelPremiumAmount,
      });

      setIsSumAssuredExistingObj({
        SumAssured_Old: details?.policyDetailsObj?.saDetails?.sumAssured,
        CurrentPremium_Old:
          details?.policyDetailsObj?.premiumDetails?.modelPremiumAmount,
      });
    } else if (
      selectedSubType === "gstinupdate" &&
      (value?.includes("View Existing GSTIN") ||
        value?.includes("Update New GSTIN"))
    ) {
      getGSTNumberData(customerData?.poClientID);
    }
  };

  const getGSTNumberData = async (clientNumber) => {
    setIsLoading(true);
    let empID = loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID;
    const val = await apiCalls.getGSTINEnquiry(clientNumber, empID);
    if (val?.data) {
      setIsLoading(false);
      form.setFieldsValue({
        ExistingGSTINNumber: val?.data?.responseBody?.zgstidno,
      });
      setIsExistingGSTNo(val?.data?.responseBody?.zgstidno);
    } else {
      message.destroy();
      message.error({
        content:
          val?.data?.responseHeader?.message ||
          "Something went wrong please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  };
  const getClientEnquiry = async (e, selectedList) => {
    try {
      setIsLoading(true);
      // setDisableOTP(true);
      let clientNumber;
      if (selectedSubType === "changeinname") {
        clientNumber =
          selectedList?.includes("View Existing Details") &&
          details?.policyDetailsObj?.identifiers?.la_Name ===
            details?.policyDetailsObj?.identifiers?.po_Name
            ? e?.length > 0
              ? e[0]?.value
              : ""
            : e;
      } else if (selectedSubType === "panupdate") {
        clientNumber =
          e == 1 ? customerData?.laClientID : customerData?.poClientID;
      } else {
        clientNumber = e;
      }
      const obj = { clientNumber };
      const response = await apiCalls.getClientEnquiry(
        obj,
        loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID
      );
      if (response?.data) {
        const res = response?.data?.responseBody;
        setClientEnquiry(res);
        setClientGender(res?.cltsex);
        if (selectedSubType === "changeinname") {
          setCltType(res?.clttype);
          setClientEnquiry(res);
          const selectVal = checkedList?.includes("View Existing Details")
            ? e?.length > 0
              ? e[0]?.value
              : ""
            : e;
          form.setFieldsValue({
            // Update_New: selectVal,
            Salutation_Old: res?.salutl,
            FirstName_Old: res?.lgivname,
            MiddleName_Old: res?.initials,
            LastName_Old: res?.lsurname,
          });
        } else if (selectedSubType === "panupdate") {
          if (res?.rmblphone) {
            setDisableOTP(false);
          }
          const exitPANNumber = await getExistPANNumber(clientNumber);
          form.setFieldsValue({
            Name_Old: exitPANNumber?.cltname || `${res?.lsurname} ${res?.initials} ${res?.lgivname}`,
            DOB_Old: res?.clTdob ? convertDate(res?.clTdob) : res?.clTdob,
            ExistingPanNo: res?.rtaxidnum || exitPANNumber?.zpanidno,
            Name_New: `${res?.lsurname} ${res?.initials} ${res?.lgivname}`,
            DOB_New: res?.clTdob ? convertDate(res?.clTdob) : res?.clTdob,
          });
          setIsPANExistingObj({
            PanUpdateFor_Old: e,
            Name_Old: exitPANNumber?.cltname ||`${res?.lsurname} ${res?.initials} ${res?.lgivname}`,
            DOB_Old: res?.clTdob ? convertDate(res?.clTdob) : res?.clTdob,
            ExistingPanNo: res?.rtaxidnum || exitPANNumber,
          });
        } else if (selectedSubType === "changeinownership") {
          form.setFieldsValue({
            ClientId_Old: res?.clntnum,
            AddressLine1_Old: res?.cltaddR01,
            AddressLine2_Old: res?.cltaddR02,
            AddressLine3_Old: res?.cltaddR03,
            City_New: res?.cltaddR04,
            PINCode_Old: res?.cltpcode,
            State_New: res?.cltaddR05,
            ProposerDOB_Old: res?.clTdob ? convertDatee(res?.clTdob) : "",
            MobileNumber_Old: res?.rmblphone,
            ProposerEmailID_Old: res?.rinternet,
            ProposerName_Old: customerData.poName,
            ProposerFirstName_Old: res?.lgivname,
            ProposerLastName_Old: res?.lsurname,
            ProposerPANNumber_Old: res?.rtaxidnum,
          });
        } else if (selectedSubType === "changeindob") {
          var clTdate =
            res?.clTdob.length === 8 ? formatDateSafe(res?.clTdob) : "";
          setExistingDateofBirth(clTdate);
          setAge_Existing(calculateAge(res?.clTdob));
          form.setFieldsValue({
            ExistingDateofBirth_Existing: clTdate,
            Age_Existing: calculateAge(res?.clTdob),
          });
        }

        setIsLoading(false);
      } else {
        setIsLoading(false);
        handleError(
          response?.data?.responseBody?.errormessage ||
            "Something went wrong, please try again!"
        );
      }
    } catch (error) {
      setIsLoading(false);
      handleError("Something went wrong, please try again!");
    }
  };

  const getExistPANNumber = async (clientNo) => {
    try {
      let empID =
        loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID;
      const response = await apiCalls.getExistPANNumber(clientNo, empID);
      if (response?.data?.responseBody?.errorcode === "0") {
        const res = response?.data?.responseBody;
        return res;
      } else {
        handleError(
          response?.data?.responseBody?.errorMessage ||
            "Something went wrong, please try again!"
        );
      }
    } catch (error) {
      handleError("Something went wrong, please try again!");
    }
  };

  const handleError = (errorMessage) => {
    message.error({
      content: errorMessage,
      className: "custom-msg",
      duration: 2,
    });
  };

  const handleInputChange = (e, item) => {
    if (item.label?.includes("IFSC") && e.target.value) {
      getIFSCBankDetails(e.target.value);
    }
  };

  const getIFSCBankDetails = async (ifscCode) => {
    let response = await apiCalls.getIFSCBanks(ifscCode);
    if (response.statusText) {
      if (response?.data.length > 0) {
        form.setFieldsValue({
          BankName: response?.data[0]?.bank,
          BranchName: response?.data[0]?.branch,
        });
      } else {
        message.error({
          content: response?.data?.responseBody?.errormessage || "Invalid IFSC",
          className: "custom-msg",
          duration: 2,
        });

        form.setFieldsValue({
          BankIFSC: "",
          BankName: "",
        });
      }
    }
  };

  const InitiatePennyDropp = () => {
    const values = form.getFieldsValue();
    if (!values?.BankAccountNumber || !values?.BankIFSC) {
      message.destroy();
      message.error({
        content: "Enter All Mandatory Feilds",
        className: "custom-msg",
        duration: 2,
      });
      return;
    }
    let obj = {
      accountNumber: BankAccNo,
      accountHolderName: "",
      ifsc: values?.BankIFSC,
      consent: "Y",
      nameMatchType: "Individual",
      useCombinedSolution: "N",
      allowPartialMatch: "true",
      preset: "G",
      suppressReorderPenalty: "true",
      clientData: {
        caseId: "null",
      },
    };
    var pennyPayload = {
      requestHeader: { source: "POS" },
      requestBody: obj,
    };
    let response = apiCalls.bankaccverification(pennyPayload);
    response
      .then((result) => {
        if (result?.data) {
          if (result?.data?.responseBody?.statusCode === 101) {
            form.setFieldsValue({
              InitiatePennyDrop: result?.data?.responseBody?.result?.data
                ?.source[0]?.data?.accountName
                ? "Success"
                : "Failed",
              NameasperPennyDrop:
                result?.data?.responseBody?.result?.data?.source[0]?.data
                  ?.accountName,
            });
          } else {
            form.setFieldsValue({
              InitiatePennyDrop: result?.data?.responseBody?.result?.data
                ?.source[0]?.data?.accountName
                ? "Success"
                : "Failed",
            });
          }
          //SUCCESSFUL TRANSACTION
        } else {
          setIsLoading(false);
          form.setFieldsValue({
            InitiatePennyDrop: result?.data?.responseBody?.errormessage,
          });
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
        });
        message.error({
          content:
            err?.response?.statusText ||
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

  // const CKYCC = ()=>{
  //   let values = form.getFieldsValue();
  //   setIsLoading(true);
  //   let response = apiCalls.CKYC(values?.CKYCNumber);
  //   response
  //     .then((val) => {
  //       if (val?.data?.responseBody?.errorcode!=="1") {
  //         const res = val?.data?.responseBody;
  //           form.setFieldsValue({
  //             PANResult: res?.description,
  //           })
  //         setIsLoading(false);
  //       } else {
  //         setIsLoading(false);
  //         form.setFieldsValue({
  //           PANResult: val?.data?.responseBody?.errormessage
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

  const CheckPANdetails = () => {
    let values = form.getFieldsValue();

    setIsLoading(true);
    //CKYCNumber

    let response = apiCalls.getCheckPANdetails(
      values?.PANNumber || values?.ReEnterPanNo_New || values?.NewPanNo,
      customerData?.policyNo
    );
    response
      .then((val) => {
        if (val?.data?.responseBody?.errorcode !== "1") {
          const res = val?.data?.responseBody;
          if (isShowPOSScreen) {
            setIsDisablePANApproveBtn(
              res?.description?.includes("Existing and Valid PAN")
                ? false
                : true
            );
          }

          if (POSContactData && customerData?.isPOS) {
            form.setFieldsValue({
              PANRevalidationResult: res?.description,
              NameinPANN:
                res?.firstName + " " + res?.middleName + " " + res?.lastName,
              PANResult: res?.description,
            });
          } else {
            form.setFieldsValue({
              PANResult: res?.description,
              PanValidation: res?.description,
              NameinPAN:
                res?.firstName + " " + res?.middleName + " " + res?.lastName,
              NameinPANN:
                res?.firstName + " " + res?.middleName + " " + res?.lastName,
              DOBinPAN: res?.dob,
            });
          }

          setIsLoading(false);
        } else {
          setIsLoading(false);
          form.setFieldsValue({
            PanValidation: val?.data?.responseBody?.errormessage,
            PANResult: val?.data?.responseBody?.errormessage,
            PANRevalidationResult: val?.data?.responseBody?.errormessage,
            NameinPANN: val?.data?.responseBody?.errormessage,
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
  };

  const searchLocationn = (e) => {
    setIsLoading(true);

    let response = apiCalls.searchLocation(e);
    response
      .then((val) => {
        setIsLoading(false);
        if (val?.data) {
          form.setFieldsValue({
            City_New: val?.data?.district,
            State_New: val?.data?.stateName,
          });
          if (selectedSubType === "changeinownership") {
            let addressData = isShowPOSScreen
              ? ContractAlterationData[selectedSubType]?.POS_Details
              : ContractAlterationData[selectedSubType]
                  ?.Update_NEW_Owner_Details;
            addressData?.forEach((element) => {
              if (
                element?.name === "City_New" ||
                element?.name === "State_New"
              ) {
                element.disabled = true;
                setUpdateFields(true);
              }
            });
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
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const getAgentEnquiry = (e) => {
    setIsLoading(true);
    let response = apiCalls.GetAgentDetails(e);

    response
      .then((val) => {
        if (val?.data) {
          const res = val?.data;
          console.log(val);
          console.log(res);
          form.setFieldsValue({
            AgentName_New: res?.AgentName,
            Agent_Status: res?.AgentStatus,
            Channel_New: res?.Channel,
            AgentBranch_New: res?.BranchName,
          });
          setIsLoading(false);
        } else {
          setIsLoading(false);
          message.error({
            content: val?.data || "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  // const getAgentEnquiry = (e)=>{
  //   setIsLoading(true);
  //     let empID = loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID
  //   let response = apiCalls.getAgentEnquiry(e, empID);
  //   response
  //     .then((val) => {
  //       if (val?.data) {
  //         const res = val?.data?.responseBody;
  //           form.setFieldsValue({
  //           //AgentName_New: res?.cltname,
  //           //Agent_Status: res?.cltname,
  //           //Channel_New: res?.cltname,
  //           //AgentBranch_New:res?.aradesc,
  //         })
  //         setIsLoading(false);
  //       } else {
  //         setIsLoading(false);
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
  const handleAgentCode = (e, item) => {
    if (e) {
      if (isExistingAgentCode === e) {
        message.destroy();
        message.error({
          content:
            "You've entered matches an existing Agent Code in our records. Please enter a different Agent Code.",
          className: "custom-msg",
          duration: 5,
        });
        form.setFieldsValue({ AgentCode_New: "" });
      } else {
        getAgentEnquiry(e);
      }
    }
  };
  const handleDropdownChange = (e, item) => {
    console.log("item ::: ---> ", item);
    if (item.name === "Marital_New") {
      secureStorage.set("marritalStatus", e);
    }
    if (item.name === "gender") {
      secureStorage.set("Gender", e);
    }
    if (
      item?.label?.includes("GSTIN Updated For") &&
      checkedList?.includes("View Existing GSTIN")
    ) {
      let clientNumber =
        e === 1 ? customerData?.laClientID : customerData?.poClientID;
      getGSTNumberData(clientNumber);
    } else if (
      (selectedSubType === "changeinname" &&
        item.name === "ModifiedClientID") ||
      (selectedSubType === "changeinname" &&
        (checkedList?.includes("View Existing Details") ||
          checkedList?.includes("Update New Details")) &&
        (item?.label?.includes("Update New Details Of") ||
          item?.label?.includes("View Existing Details Of")))
    ) {
      getClientEnquiry(e);
    } else if (
      selectedSubType === "panupdate" &&
      ((checkedList?.includes("View Existing PAN Details") &&
        item?.label?.includes("View PAN For")) ||
        (checkedList?.includes("Update New PAN Number") &&
          item?.label?.includes("Update PAN For")))
    ) {
      getClientEnquiry(e);
    } else if (selectedSubType === "changeindob" && !isShowPOSScreen) {
      getClientEnquiry(e);
    } else if (
      selectedSubType === "policycontinuation" &&
      e === "Allow_Revival"
    ) {
      calculateNextTwoYearsDates();
      ContractAlterationData[selectedSubType]?.BOE_Details?.forEach(
        (element) => {
          if (element?.label?.includes("Policy to be Revived By")) {
            element.disabled = true;
            renderDetailsForm("BOE_Details");
          }
        }
      );
    } else if (
      selectedSubType === "policycontinuation" &&
      e === "convertintopaiduppolicy"
    ) {
      setIsPolicyReceivedDate(null);
      ContractAlterationData[selectedSubType]?.BOE_Details?.forEach(
        (element) => {
          if (element?.label?.includes("Policy to be Revived By")) {
            element.disabled = true;
            renderDetailsForm("BOE_Details");
            setUpdateFields(true);
          }
        }
      );
      form.setFieldsValue({
        PolicytobeRevivedBy: "",
      });
    }
  };

  const calculateNextTwoYearsDates = () => {
    //const currentDate = new Date(convertDate(details?.policyDetailsObj?.premiumDetails?.ptd));
    const currentDate = convertDate(
      details?.policyDetailsObj?.premiumDetails?.ptd
    );
    const newDate = addTwoYears(currentDate);
    const dayjsDate = dayjs(newDate, "DD/MM/YYYY");
    form.setFieldsValue({
      PolicytobeRevivedBy: dayjsDate,
    });
  };
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const totalDate = `${day}/${month}/${year}`;
    setIsPolicyReceivedDate(totalDate);
    return `${day}/${month}/${year}`;
  };
  const addTwoYears = (dateString) => {
    const date = parseDate(dateString);
    date.setFullYear(date.getFullYear() + 2);
    return formatDate(date);
  };

  const parseDate = (dateString) => {
    const [day, month, year] = dateString
      .split("/")
      .map((part) => parseInt(part, 10));
    return new Date(year, month - 1, day);
  };
  const handleLinkValue = (item) => {
    if (item.name === "idProof") {
      setIdProofModal(true);
    } else {
      setAddressProofModal(true);
    }
  };

  const handleRadioLink = (item) => {
    if (
      ["Dedupe Match Details", "Bank De-Dupe"].includes(item?.label) &&
      selectedSubType !== "changeinownership"
    ) {
      if (POSContactData?.deDupPayload?.length > 0) {
        for (let index in POSContactData?.deDupPayload) {
          if (POSContactData?.deDupPayload[index]?.type === "NEGATIVELIST") {
            setNegativeList(POSContactData?.deDupPayload[index]?.deDupPayload);
          }
          setNegativeModal(true);
        }
      }
    } else if (
      ["Name De-Dupe Match", "OFAC List Match"].includes(item?.label)
    ) {
      if (POSContactData?.deDupPayload?.length > 0) {
        for (let index in POSContactData?.deDupPayload) {
          if (
            selectedSubType === "changeinname" ||
            selectedSubType === "changeinownership"
          ) {
            if (POSContactData?.deDupPayload[index]?.type === "NEGATIVELIST") {
              setNameDeDupeData(
                POSContactData?.deDupPayload[index]?.deDupPayload
              );
            } else if (POSContactData?.deDupPayload[index]?.type === "Name") {
              setNameDeDupeData(
                POSContactData?.deDupPayload[index]?.deDupPayload
              );
            }
          }
        }
      }
      setNameDeDupeModal(true);
    } else if (
      selectedSubType === "changeinownership" &&
      item.label === "Bank De-Dupe"
    ) {
      setDeDupeModalOpen(true);
      let formValues = form.getFieldsValue();
      const obj = {
        lA_CustomerID: POSContactData?.customerId,
        bank_IFSC: formValues?.BankIFSC,
        acc_Number: formValues?.BankAccountNumber,
      };
      let response = apiCalls.getVerifyBankDedup(obj);
      response
        .then((val) => {
          setIsLoading(false);
          if (val?.data) {
            setBankduDupeData(val?.data);
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
  };
  const handleTextLink = (item) => {
    if (item.label?.includes("Signature Proof")) {
      setAddressProofModal(true);
    } else if (item.label?.includes("Agent Signature Verification")) {
      const gConfig = apiCalls.getGenericConfig();
      if (gConfig?.data?.dmsApiUrl) {
        const url =
          gConfig?.data?.dmsApiUrl +
          `/omnidocs/WebApiRequestRedirection?Application=BPMPOLENQ&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${isAgentApplicationNo}`;
        window.open(url, "_blank");
      }
    } else if (
      selectedSubType !== "changeinownership" &&
      (item.label === "Name De-Dupe match" || item.label === "OFAC List Match")
    ) {
      // if(POSContactData?.deDupPayload[index]?.type ==='NEGATIVELIST') {
      //   setNegativeList(POSContactData?.deDupPayload[index]?.deDupPayload)
      // }
      if (POSContactData?.deDupPayload?.length > 0) {
        for (let index in POSContactData?.deDupPayload) {
          if (POSContactData?.deDupPayload[index]?.type === "NEGATIVELIST") {
            setNegativeList(POSContactData?.deDupPayload[index]?.deDupPayload);
          }
        }
      }
      setNegativeModal(true);
    } else if (item.linkValue?.toLowerCase() === "view") {
      const gConfig = apiCalls.getGenericConfig();
      if (gConfig?.data?.dmsApiUrl) {
        const url =
          gConfig?.data?.dmsApiUrl +
          `/omnidocs/WebApiRequestRedirection?Application=BPMPOLENQ&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${details?.policyDetailsObj?.identifiers?.applicationNo}`;
        window.open(url, "_blank");
      }
    }
  };

  const handleTitleCheckBox = (e, item) => {
    setSelectCheckBox(false);
    setShowNewSignatureFields(false);
    setShowSignatureProcess(false);
    if (item?.label?.includes("Update New Signature")) {
      setSelectCheckBox(item.name);
      setShowNewSignatureFields(true);
    } else if (item?.label?.includes("Share Signature Update Process")) {
      setShowSignatureProcess(true);
      setSelectCheckBox(item.name);
    }
  };
  const toggleInputField = (field, item, index) => {
    setShowEmailFields(true);
    form.setFieldsValue({
      mobileNo: customerData?.mobileNo,
      whatsAppNo: customerData?.mobileNo,
      emailId: customerData?.emailID,
    });
    switch (field) {
      case "phone":
        setShowPhoneNumber(!showPhoneNumber);
        setActiveMobileIcons((prevIcons) => {
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
      case "email":
        setShowEmailAddress(!showEmailAddress);
        setActiveEmailIcons((prevIcons) => {
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
      case "whatsapp":
        setShowWhatsApp(!showWhatsApp);
        setActiveWhatsAppIcons((prevIcons) => {
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

  const handleUploadLink = () => {};

  const handleRadioChange = (e, item) => {
    if (
      item.name === "ValidateSignature" &&
      selectedSubType === "changeindob" &&
      e.target.value === "no"
    ) {
      setVaildateSignature(true);
    } else {
      setVaildateSignature(false);
    }
    if (selectedSubType === "panupdate" && !isShowPOSScreen) {
      if (item.name === "validatesignature" && e.target.value === "no") {
        setVaildateSignature(true);
      } else if (
        item.name === "validatesignature" &&
        e.target.value === "yes"
      ) {
        setVaildateSignature(false);
      }
    }
    if (selectedSubType === "changeinownership" && !isShowPOSScreen) {
      if (item.name === "ValidateSignature" && e.target.value === "no") {
        setVaildateSignature(true);
      } else if (
        item.name === "ValidateSignature" &&
        e.target.value === "yes"
      ) {
        setVaildateSignature(false);
      }
    }
    if (selectedSubType === "changeinname" && !isShowPOSScreen) {
      if (item.name === "Validate_Signature" && e.target.value === "no") {
        setVaildateSignature(true);
      } else if (
        item.name === "Validate_Signature" &&
        e.target.value === "yes"
      ) {
        setVaildateSignature(false);
      }
    }

    if (selectedSubType === "panupdate" && isShowPOSScreen) {
      if (
        selectedSubType === "panupdate" &&
        item.name === "PANDetailsCorrect" &&
        e.target.value === "no"
      ) {
        ContractAlterationData[selectedSubType]?.POS_Details?.forEach(
          (element) => {
            if (
              [
                "ReEnterPanNo_New",
                "PANRevalidationResult",
                "NameinPANN",
                "POSNameMatch",
              ].includes(element?.name)
            ) {
              // if(element?.label?.includes("Enter PAN")||element?.name?.includes("PANRevalidationResult")||element?.name?.includes("NameinPANN")||element?.name?.includes("POSNameMatch")){
              element.hide = false;
            }
          }
        );
        setRerenderComponent(!RerenderComponent);
      } else if (
        selectedSubType === "panupdate" &&
        item.name === "PANDetailsCorrect" &&
        e.target.value === "yes"
      ) {
        ContractAlterationData[selectedSubType]?.POS_Details?.forEach(
          (element) => {
            if (
              [
                "ReEnterPanNo_New",
                "PANRevalidationResult",
                "NameinPANN",
                "POSNameMatch",
              ].includes(element?.name)
            ) {
              //if(element?.label?.includes("Enter PAN")||element?.name?.includes("PANRevalidationResult")||element?.name?.includes("NameinPANN")||element?.name?.includes("POSNameMatch")){
              element.hide = true;
            }
          }
        );
        setRerenderComponent(!RerenderComponent);
      }
    }
    if (
      selectedSubType === "changeindob" &&
      item.name === "RefertoNBStageDocument" &&
      e.target.value === "no"
    ) {
      ContractAlterationData[selectedSubType]?.Update_DOB_Details?.forEach(
        (element) => {
          if (element.d_ErroratNB) {
            element.hide = false;
          }
        }
      );
      setRerenderComponent(!RerenderComponent);
    } else if (
      selectedSubType === "changeindob" &&
      item.name === "RefertoNBStageDocument" &&
      e.target.value === "yes"
    ) {
      ContractAlterationData[selectedSubType]?.Update_DOB_Details?.forEach(
        (element) => {
          if (element.d_ErroratNB) {
            element.hide = true;
          }
        }
      );
      setRerenderComponent(!RerenderComponent);
    }

    if (
      selectedSubType === "changeindob" &&
      item.name === "InitiateRequestBy" &&
      e.target.value === "requestform"
    ) {
      ContractAlterationData[selectedSubType]?.Update_DOB_Details?.forEach(
        (element) => {
          if (element.d_InitiateRequestBy) {
            element.hide = false;
          }
        }
      );
      setRerenderComponent(!RerenderComponent);
    } else if (
      selectedSubType === "changeindob" &&
      item.name === "InitiateRequestBy" &&
      e.target.value === "otp"
    ) {
      ContractAlterationData[selectedSubType]?.Update_DOB_Details?.forEach(
        (element) => {
          if (element.d_InitiateRequestBy) {
            element.hide = true;
          } else if (element.label === "Reason For Delayed Submission") {
            element.hide = true;
          }
        }
      );
      setRerenderComponent(!RerenderComponent);
    }
    if (
      selectedSubType === "changeindob" &&
      item.name === "AreDetailsCorrect" &&
      e.target.value === "no"
    ) {
      ContractAlterationData[selectedSubType]?.POS_Details?.forEach(
        (element) => {
          if (
            ["POScustRole", "POSNewDateofBirth", "POSAge"].includes(
              element?.name
            )
          ) {
            element.hide = false;
          }
        }
      );
      setRerenderComponent(!RerenderComponent);
    } else if (
      selectedSubType === "changeindob" &&
      item.name === "AreDetailsCorrect" &&
      e.target.value === "yes"
    ) {
      ContractAlterationData[selectedSubType]?.POS_Details?.forEach(
        (element) => {
          if (
            ["POScustRole", "POSNewDateofBirth", "POSAge"].includes(
              element?.name
            )
          ) {
            element.hide = true;
          }
        }
      );
      setRerenderComponent(!RerenderComponent);
    }

    // LifeAsiaUpdated
    if (item.name === "LifeAsiaUpdated" && e.target.value === "yes") {
      setHideSubmitBtn(true);
      setDisableApproveBtn(false);
    } else if (item.name === "LifeAsiaUpdated" && e.target.value === "no") {
      setHideSubmitBtn(false);
      setDisableApproveBtn(true);
    }

    if (
      item.name === "AgentSignaturVerificationResult" &&
      e.target.value === "yes"
    ) {
      setDisableSubmitBtn(false);
    } else if (
      item.name === "AgentSignaturVerificationResult" &&
      e.target.value === "no"
    ) {
      setDisableSubmitBtn(false);
    }

    if (item.name === "Stage_Document" && e.target.value === "yes") {
      ContractAlterationData[selectedSubType]?.Update_New_Details?.forEach(
        (element) => {
          if (
            element?.name === "UploadNameChangeProof" ||
            element?.name === "UploadIDProof"
          ) {
            element.hide = true;
            element.required = false;
          }
        }
      );
      setShowReasonDelayField(!showResonDelayField);
    } else if (item.name === "Stage_Document" && e.target.value === "no") {
      ContractAlterationData[selectedSubType]?.Update_New_Details?.forEach(
        (element) => {
          if (
            element?.name === "UploadNameChangeProof" ||
            element?.name === "UploadIDProof"
          ) {
            element.hide = false;
            element.required = true;
          }
        }
      );
      setShowReasonDelayField(!showResonDelayField);
    }
    if (
      selectedSubType === "agentcodecorrection" &&
      item?.label?.includes("Sourcing Code Matches New CDF")
    ) {
      // if(e.target.value==="no"){
      //     setIsDisableApproveBtn(true);
      // }
      // else if(e.target.value==="yes"){
      //   setIsDisableApproveBtn(false);
      // }
      //removed above code by pooja on 30.05.2025
      setIsDisableApproveBtn(false);
    }
    setIsShowOTPModal(false);
    setShowRaiseRequirementBtn(false);
    setIsShowDOBRequestForms(false);

    if (e.target.value === "requestform" || item.name === "ValidateSignature") {
      setIsShowDOBRequestForms(true);
    }
    // if(selectedSubType==="policycontinuation"||selectedSubType==="changeinname"||selectedSubType==="panupdate"||selectedSubType==="changeinsignature"||
    //selectedSubType==="changeinownership"){

    if (
      e.target.value === "no" &&
      item?.label?.includes("Validate Signature")
    ) {
      setShowRaiseRequirementBtn(false);
      setDisableSubmitBtn(true);
    } else if (
      e.target.value === "yes" &&
      item?.label?.includes("Validate Signature")
    ) {
      setShowRaiseRequirementBtn(false);
      setDisableSubmitBtn(false);
    }
    //}

    let selectionValue = e.target.value;
    if (
      selectionValue === "no" &&
      item?.label?.includes("Validate Signature") &&
      selectedSubType !== "changeinsignature"
    ) {
      setDisableSubmutBtn(true);
    }

    if (
      selectionValue === "yes" &&
      item?.label?.includes("Validate Signature") &&
      selectedSubType !== "changeinsignature"
    ) {
      setDisableSubmutBtn(false);
    }

    if (
      selectedSubType === "changeindobnomineeappointee" &&
      e.target.value === "requestform"
    ) {
      setIsShowDOBRequestForms(true);
    } else if (e.target.value === "otp") {
      setIsShowOTPModal(true);
      setIsShowRequestDetails(false);
    } else if (e.target.value === "requestform") {
      setIsShowRequestDetails(true);
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
  const isMinor = (selectedDate) => {
    const currentDate = new Date();
    const birthDate = new Date(selectedDate);
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (age < 18 || (age === 18 && monthDiff < 0)) {
      message.warning({
        content: "Proposer Age cannot be less than 18 years",
        className: "custom-msg",
        duration: 3,
      });
      form.setFieldsValue({
        ProposerDOB_New: "",
        NewDateofBirth: "",
        POSNewDateofBirth: "",
        Age: "",
        POSAge: "",
      });
      return true; // Indicates the person is a minor
    }
    return false; // Indicates the person is not a minor
  };
  const handleDateChange = (date, item) => {
    const formFields = form?.getFieldsValue();
    if (
      (item === "ProposerDOB_New" && selectedSubType === "changeinownership") ||
      (selectedSubType === "changeindob" &&
        (formFields?.custRole === 2 || formFields?.POScustRole == 2) &&
        (item === "NewDateofBirth" || item === "POSNewDateofBirth"))
    ) {
      const isMinorResult = isMinor(date);
      if (isMinorResult) {
        // Handle minor logic
        return;
      }
    }
    if (
      selectedSubType === "changeindob" &&
      (item === "NewDateofBirth" || item === "POSNewDateofBirth")
    ) {
      let dt = moment(date + 1).format("YYYYMMDD");
      let age = calculateAge(dt);
      form.setFieldsValue({
        Age: age,
        POSAge: age,
      });
    }
    if (item === "BranchReceivedDate" || item === "branchreceivedate") {
      setShowReasonDelayField(false);
      let newDate = new Date();
      let todayDate = moment(newDate).format("MM/DD/YYYY");
      let selectDate = moment(date + 1).format("MM/DD/YYYY");
      const formFeilds = form.getFieldsValue();
      let customerSignDate = moment(formFeilds?.CustomerSigningDate + 1).format(
        "MM/DD/YYYY"
      );
      let dateDiffence = date_diff_indays(selectDate, customerSignDate);
      if (!formFeilds?.CustomerSigningDate || dateDiffence > 0) {
        message.destroy();
        message.error({
          content:
            "Request Received Date can't be before the customer signing date.",
          className: "custom-msg",
          duration: 3,
        });
        form.setFieldsValue({
          branchreceiveddate: "",
          BranchReceivedDate: "",
          branchreceivedate: "",
        });
        return;
      }
      if (
        selectedSubType === "additionofrider" ||
        selectedSubType === "deletionofrider"
      ) {
        ContractAlterationData[selectedSubType]?.BOE_Details?.forEach(
          (element) => {
            if (
              element?.label?.includes("Reason For Delayed Submission") &&
              selectDate < todayDate
            ) {
              element.hide = false;
              setShowReasonDelayField(true);
            } else if (
              element?.label?.includes("Reason For Delayed Submission") &&
              selectDate >= todayDate
            ) {
              element.hide = true;
              setShowReasonDelayField(false);
            }
          }
        );
      } else if (selectedSubType === "changeinsignature") {
        ContractAlterationData[
          selectedSubType
        ]?.Update_New_Signature_Fields?.forEach((element) => {
          if (
            element?.label?.includes("Reason For Delayed Submission") &&
            selectDate < todayDate
          ) {
            element.hide = false;
            setShowReasonDelayField(true);
          } else if (
            element?.label?.includes("Reason For Delayed Submission") &&
            selectDate >= todayDate
          ) {
            element.hide = true;
            setShowReasonDelayField(false);
          }
        });
      } else if (selectedSubType === "gstinupdate") {
        ContractAlterationData[selectedSubType]?.Update_GSTIN_Details?.forEach(
          (element) => {
            if (
              element?.label?.includes("Reason For Delayed Submission") &&
              selectDate < todayDate
            ) {
              element.hide = false;
              setShowReasonDelayField(true);
            } else if (
              element?.label?.includes("Reason For Delayed Submission") &&
              selectDate >= todayDate
            ) {
              element.hide = true;
              setShowReasonDelayField(false);
            }
          }
        );
      } else if (selectedSubType === "changeinownership") {
        ContractAlterationData[
          selectedSubType
        ]?.Update_NEW_Owner_Details?.forEach((element) => {
          if (
            element?.label?.includes("Reason For Delayed Submission") &&
            selectDate < todayDate
          ) {
            element.hide = false;
            setShowReasonDelayField(true);
          } else if (
            element?.label?.includes("Reason For Delayed Submission") &&
            selectDate >= todayDate
          ) {
            element.hide = true;
            setShowReasonDelayField(false);
          }
        });
      } else if (selectedSubType === "panupdate") {
        ContractAlterationData[selectedSubType]?.RequestForm_Fields?.forEach(
          (element) => {
            if (
              element?.label?.includes("Reason For Delayed Submission") &&
              selectDate < todayDate
            ) {
              element.hide = false;
              setShowReasonDelayField(true);
            } else if (
              element?.label?.includes("Reason For Delayed Submission") &&
              selectDate >= todayDate
            ) {
              element.hide = true;
              setShowReasonDelayField(false);
            }
          }
        );
      } else if (selectedSubType === "changeindob") {
        ContractAlterationData[selectedSubType]?.Update_DOB_Details?.forEach(
          (element) => {
            if (
              element?.label?.includes("Reason For Delayed Submission") &&
              selectDate < todayDate
            ) {
              element.hide = false;
              setShowReasonDelayField(true);
            } else if (
              element?.label?.includes("Reason For Delayed Submission") &&
              selectDate >= todayDate
            ) {
              element.hide = true;
              setShowReasonDelayField(false);
            }
          }
        );
      } else if (selectedSubType === "policycontinuation") {
        ContractAlterationData[selectedSubType]?.BOE_Details?.forEach(
          (element) => {
            if (
              element?.label?.includes("Reason For Delayed Submission") &&
              selectDate < todayDate
            ) {
              element.hide = false;
              setShowReasonDelayField(true);
            } else if (
              element?.label?.includes("Reason For Delayed Submission") &&
              selectDate >= todayDate
            ) {
              element.hide = true;
              setShowReasonDelayField(false);
            }
          }
        );
      } else if (selectedSubType === "changeinname") {
        ContractAlterationData[selectedSubType]?.Update_New_Details?.forEach(
          (element) => {
            if (
              element?.label?.includes("Reason For Delayed Submission") &&
              selectDate < todayDate
            ) {
              element.hide = false;
              setShowReasonDelayField(true);
            } else if (
              element?.label?.includes("Reason For Delayed Submission") &&
              selectDate >= todayDate
            ) {
              element.hide = true;
              setShowReasonDelayField(false);
            }
          }
        );
      } else {
        ContractAlterationData[selectedSubType]?.Update_New_Details?.forEach(
          (element) => {
            if (
              element?.label?.includes("Reason For Delayed Submission") &&
              selectDate < todayDate
            ) {
              element.hide = false;
              setShowReasonDelayField(true);
            } else if (
              element?.label?.includes("Reason For Delayed Submission") &&
              selectDate >= todayDate
            ) {
              element.hide = true;
              setShowReasonDelayField(false);
            }
          }
        );

        ContractAlterationData[selectedSubType]?.Upload_Fields?.forEach(
          (element) => {
            if (
              element?.label?.includes("Reason For Delayed Submission") &&
              selectDate < todayDate
            ) {
              element.hide = false;
              setShowReasonDelayField(true);
            } else if (
              element?.label?.includes("Reason For Delayed Submission") &&
              selectDate >= todayDate
            ) {
              element.hide = true;
              setShowReasonDelayField(false);
            }
          }
        );
      }
    }
  };

  const handleEdit = (val, item) => {
    if (
      item?.label?.includes("Bank Account Details") &&
      selectedSubType === "changeinownership"
    ) {
      if (val === "edit") {
        setIsPosEdited(true);
        ContractAlterationData[selectedSubType]?.POS_Details?.forEach(
          (element) => {
            if (element?.posBankEdit) {
              element.disabled = false;
            }
          }
        );
      } else if (val === "close") {
        setIsPosEdited(false);
        ContractAlterationData[selectedSubType]?.POS_Details?.forEach(
          (element) => {
            if (element?.posBankEdit) {
              element.disabled = true;
            }
          }
        );
        POSContactData?.serviceRequestTransectionData?.forEach((element) => {
          changeinownershipObj[element.tagName] = element.tagValue;
        });

        form.setFieldsValue({
          BankIFSC: changeinownershipObj?.BankIFSC,
          BankName: changeinownershipObj?.BankName,
          // AccountType: changeinownershipObj?.AccountType,
          NameAsMentionedInTheBank:
            changeinownershipObj?.NameAsMentionedInTheBank,
          BankAccountNumber: changeinownershipObj?.BankAccountNumber,
          InitiatePennyDrop: changeinownershipObj?.InitiatePennyDrop,
          NamematchasperPennyDrop:
            changeinownershipObj?.NamematchasperPennyDrop,
        });
      }
    }
    //Added by sayali on 11/08/2025 for Added nominee details in update new owner details
    else if (
      item?.label?.includes("New Nominee/Appointee Details") &&
      selectedSubType === "changeinownership"
    ) {
      if (val == "edit") {
        setIsEditNominee(true);
      } else if (val === "close") {
        setIsEditNominee(false);
      }
    }
    //end
    else {
      if (val === "edit") {
        setIsPosEdited(true);
        ContractAlterationData[selectedSubType]?.POS_Details?.forEach(
          (element) => {
            if (element?.posEdit) {
              element.disabled = false;
            }
          }
        );
      } else if (val === "close") {
        setIsPosEdited(false);
        ContractAlterationData[selectedSubType]?.POS_Details?.forEach(
          (element) => {
            if (element?.posEdit) {
              element.disabled = true;
            }
          }
        );
        if (selectedSubType === "changeinname") {
          POSContactData?.serviceRequestTransectionData?.forEach((element) => {
            posChangeinNameObj[element.tagName] = element.tagValue;
          });
          form.setFieldsValue({
            Salutation_New: posChangeinNameObj?.Salutation_New,
            FirstName_New: posChangeinNameObj?.FirstName_New,
            MiddleName_New: posChangeinNameObj?.MiddleName_New,
            LastName_New: posChangeinNameObj?.LastName_New,
          });
        } else if (selectedSubType === "gstinupdate") {
          POSContactData?.serviceRequestTransectionData?.forEach((element) => {
            posGSTScreenObj[element.tagName] = element.tagValue;
          });
          form.setFieldsValue({
            NewGSTINNumber: posGSTScreenObj?.NewGSTINNumber,
          });
        } else {
          POSContactData?.serviceRequestTransectionData?.forEach((element) => {
            changeinownershipObj[element.tagName] = element.tagValue;
          });
          form.setFieldsValue({
            BankIFSC: changeinownershipObj?.BankIFSC,
            BankName: changeinownershipObj?.BankName,
            AccountType: changeinownershipObj?.AccountType,
            NameAsMentionedInTheBank:
              changeinownershipObj?.NameAsMentionedInTheBank,
            BankAccountNumber: changeinownershipObj?.BankAccountNumber,
            InitiatePennyDrop: changeinownershipObj?.InitiatePennyDrop,
          });
        }
      }
    }
  };
  //commonly render all forms
  const renderDetailsForm = (formType) => {
    return (
      <DetailsForm
        data={ContractAlterationData[selectedSubType]?.[formType]}
        subType={selectedSubType}
        suffix={
          (!isShowPOSScreen ||
            selectedSubType === "agentcodecorrection" ||
            selectedSubType === "changeindob") &&
          suffix
        }
        handleUploadLink={handleUploadLink}
        form={form}
        handleRadioChange={handleRadioChange}
        handleDateChange={handleDateChange}
        handleTextLink={handleTextLink}
        handleLinkValue={handleLinkValue}
        handleTitleCheckBox={handleTitleCheckBox}
        clientRoleLU={clientRoleLU}
        handleDropdownChange={handleDropdownChange}
        selectCheckBox={selectCheckBox}
        toggleInputField={toggleInputField}
        activeEmailIcons={activeEmailIcons}
        activeMobileIcons={activeMobileIcons}
        activeWhatsAppIcons={activeWhatsAppIcons}
        panUpdateLU={panUpdateLU}
        handleAgentCode={handleAgentCode}
        getUploadFiles={getUploadFiles}
        handleLabelLink={handleLabelLink}
        disabledDate={disabledDate}
        onBlurInput={onBlurInput}
        handleInputChange={handleInputChange}
        requestModeLU={requestModeLU}
        disableRequestForm={disableRequestForm}
        disableOTP={disableOTP}
        handleEdit={handleEdit}
        validateOTPSuccess={validateOTPSuccess}
        handleRadioLink={handleRadioLink}
        ClientGender={ClientGender || clientEnquiryData?.cltsex}
        policyContinueLU={policyContinueLU}
        martialStatusLU={martialStatusLU}
        salutationLU={salutationLU}
        handleClientList={handleClientList}
        clientListLU={clientListLU}
        bankAccTypeLU={bankAccTypeLU}
      ></DetailsForm>
    );
  };
  const onBlurInput = (value, item) => {
    const obj = form.getFieldsValue(value);
    if (item.name === "BankIFSC" && value) {
      getIFSCBankDetails(value);
    }
    if (item.name === "PINCode") {
      form.setFieldsValue({
        City_New: "",
        State_New: "",
      });
    }

    if (item.name === "PINCode" && value && value?.length === 6) {
      searchLocationn(value);
    }

    if (item?.label?.includes("Agent Application Number")) {
      setIsAgentApplicationNo(value);
    }
    if (
      (item.name === "PANNumber" ||
        item?.name?.toLowerCase() === "newpanno" ||
        item?.name?.toLowerCase() === "reenterpanno_new") &&
      value.length === 10
    ) {
      const posPanData = form.getFieldsValue();
      if (
        isPANExistingObj?.ExistingPanNo?.toLowerCase() ===
          value?.toLowerCase() &&
        clientEnquiryData?.rtaxidnum?.toLowerCase() === value?.toLowerCase() &&
        selectedSubType === "panupdate" &&
        !isShowPOSScreen
      ) {
        message.destroy();
        message.error({
          content:
            "You've entered matches an existing PAN number in our records. Please enter a different PAN number.",
          className: "custom-msg",
          duration: 5,
        });
        form.setFieldsValue({ NewPanNo: "" });
      }
      //  else if (
      //   posPanData?.NewPanNo?.toLowerCase() === value?.toLowerCase() &&
      //   selectedSubType === "panupdate" &&
      //   isShowPOSScreen
      // ) {
      //   message.destroy();
      //   message.error({
      //     content:
      //       "You've entered matches an existing PAN number in our records. Please enter a different PAN number.",
      //     className: "custom-msg",
      //     duration: 5,
      //   });
      //   form.setFieldsValue({ ReEnterPanNo_New: "" });
      // }
      else {
        CheckPANdetails();
      }
    }
    if (item.name === "NewGSTINNumber" && value.length === 15) {
      const posPanData = form.getFieldsValue();
      if (
        isExistingGSTNo?.toLowerCase() === value?.toLowerCase() &&
        selectedSubType === "gstinupdate" &&
        !isShowPOSScreen
      ) {
        message.destroy();
        message.error({
          content:
            "You've entered matches an existing GSTIN number in our records. Please enter a different GSTIN number.",
          className: "custom-msg",
          duration: 5,
        });
        form.setFieldsValue({ NewGSTINNumber: "" });
      } else if (
        posPanData?.ExistingGSTINNumber?.toLowerCase() ===
          value?.toLowerCase() &&
        selectedSubType === "gstinupdate" &&
        isShowPOSScreen
      ) {
        message.destroy();
        message.error({
          content:
            "You've entered matches an existing GSTIN number in our records. Please enter a different GSTIN number.",
          className: "custom-msg",
          duration: 5,
        });
        form.setFieldsValue({ NewGSTINNumber: "" });
      }
      // else {
      //     CheckPANdetails()
      // }
    }

    // if(item.name === "CKYCNumber"&& value.length ===14){
    //   CKYCC()
    // }
    if (item.name === "ConfirmBankAccountNumber") {
      setCNFBankAccNo(value);
    } else if (item.name === "BankAccountNumber") {
      setBankAccNo(value);
    }
    if (item.name === "ConfirmBankAccountNumber") {
      if (BankAccNo !== value) {
        message.destroy();
        message.error({
          content: "Bank Number Not matched",
          className: "custom-msg",
          duration: 2,
        });
        form.setFieldsValue({ ConfirmBankAccountNumber: "" });
      }
      //  const lastFourDigits = obj.ConfirmBankAccountNumber.slice(-4);
      //  const maskedString = '*'.repeat(obj.ConfirmBankAccountNumber.length - 4) + lastFourDigits;
      //  form.setFieldsValue({ConfirmBankAccountNumber: maskedString});
    } else if (value?.length >= 4 && item.name === "BankAccountNumber") {
      const lastFourDigits = obj.BankAccountNumber.slice(-4);
      const maskedString =
        "*".repeat(obj.BankAccountNumber.length - 4) + lastFourDigits;
      form.setFieldsValue({ BankAccountNumber: maskedString });
    }
  };
  const handleLabelLink = (item) => {
    if (item.label === "Initiate Penny Drop") {
      InitiatePennyDropp();
    }
  };

  const convertDate = (inputDate) => {
    if (inputDate) {
      const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
      return formattedDate;
    } else {
      return "";
    }
  };

  const convertDatee = (inputDate) => {
    if (inputDate) {
      const formattedDate = moment(new Date(inputDate), "YYYYMMDD").format(
        "DD/MM/YYYY"
      );
      return formattedDate;
    } else {
      return "";
    }
  };

  const getTransactionData = (values) => {
    let transactionData = [
      {
        Status: "Create",
        TagName: "AdditionalNoteForCustomer",
        TagValue:
          values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
      },
    ];

    if (selectedSubType === "gstinupdate") {
      transactionData.push(
        {
          Status: "Create",
          TagName: "ExistingGSTINNumber",
          TagValue: values?.ExistingGSTINNumber || isExistingGSTNo,
        },
        {
          Status: "Create",
          TagName: "NewGSTINNumber",
          TagValue: values?.NewGSTINNumber || "",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "ValidateSignature",
          TagValue: values?.ValidateSignature || "",
        },
        {
          Status: "Create",
          TagName: "Client_Id",
          TagValue:
            values?.GSTINToBeUpdateFor === 1
              ? customerData?.laClientID
              : customerData?.poClientID,
        },
        { Status: "Create", TagName: "DocLink", TagValue: isDocLink },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink },
        { Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER" }
      );
    } else if (selectedSubType === "panupdate") {
      transactionData.push(
        {
          Status: "Create",
          TagName: "PanUpdateFor_Old",
          TagValue:
            values?.PanUpdateFor_Old || isPANExistingObj?.PanUpdateFor_Old,
        },
        {
          Status: "Create",
          TagName: "Name_Old",
          TagValue: values?.Name_Old || isPANExistingObj?.Name_Old,
        },
        {
          Status: "Create",
          TagName: "DOB_Old",
          TagValue: values?.DOB_Old || isPANExistingObj?.DOB_Old,
        },
        {
          Status: "Create",
          TagName: "PanUpdateFor_New",
          TagValue: values?.PanUpdateFor_New || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || emsrequestchannel,
        },
        {
          Status: "Create",
          TagName: "Name_New",
          TagValue: values?.Name_New || "",
        },
        {
          Status: "Create",
          TagName: "DOB_New",
          TagValue: values?.DOB_New || "",
        },
        {
          Status: "Create",
          TagName: "ExistingPanNo",
          TagValue: values?.ExistingPanNo || isPANExistingObj?.ExistingPanNo,
        },
        {
          Status: "Create",
          TagName: "NewPanNo",
          TagValue: values?.NewPanNo?.toUpperCase() || "",
        },
        {
          Status: "Create",
          TagName: "NameinPAN",
          TagValue: values?.NameinPAN || "",
        },
        {
          Status: "Create",
          TagName: "DOBinPAN",
          TagValue: values?.DOBinPAN || "",
        },
        {
          Status: "Create",
          TagName: "NameMatch",
          TagValue: values?.NameMatch || "",
        },
        {
          Status: "Create",
          TagName: "PanValidation",
          TagValue: values?.PanValidation || "",
        },
        {
          Status: "Create",
          TagName: "Last2YearsITRFilling",
          TagValue: values?.Last2YearsITRFilling || "",
        },
        { Status: "Create", TagName: "NameMatchFlag", TagValue: "Yes" },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "ValidatedBy",
          TagValue: values?.customerchoice ? values?.customerchoice : "form",
        },
        {
          Status: "Create",
          TagName: "Client_Id",
          TagValue:
            values?.PanUpdateFor_New === 1
              ? customerData?.laClientID
              : customerData?.poClientID,
        },
        { Status: "Create", TagName: "DocLink", TagValue: isDocLink },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink },
        { Status: "Create", TagName: "FileType", TagValue: "PROCESSENQUIRY" }
      );
    } else if (selectedSubType === "changeinname") {
      transactionData.push(
        {
          Status: "Create",
          TagName: "Update_Existing",
          TagValue: values?.Update_Existing,
        },
        {
          Status: "Create",
          TagName: "ModifiedClientID",
          TagValue: getClientName(values?.ModifiedClientID),
        },
        {
          Status: "Create",
          TagName: "Salutation_Old",
          TagValue: ClientEnquiry?.salutl,
        },
        {
          Status: "Create",
          TagName: "FirstName_Old",
          TagValue: ClientEnquiry?.lgivname,
        },
        {
          Status: "Create",
          TagName: "MiddleName_Old",
          TagValue: ClientEnquiry?.initials,
        },
        {
          Status: "Create",
          TagName: "LastName_Old",
          TagValue: ClientEnquiry?.lsurname,
        },
        {
          Status: "Create",
          TagName: "Salutation_New",
          TagValue: values?.Salutation_New,
        },
        {
          Status: "Create",
          TagName: "marital_new",
          TagValue: values?.marital_new,
        },
        {
          Status: "Create",
          TagName: "gender",
          TagValue: values?.gender,
        },
        {
          Status: "Create",
          TagName: "FirstName_New",
          TagValue: values?.FirstName_New,
        },
        {
          Status: "Create",
          TagName: "MiddleName_New",
          TagValue: values?.MiddleName_New,
        },
        {
          Status: "Create",
          TagName: "LastName_New",
          TagValue: values?.LastName_New,
        },
        {
          Status: "Create",
          TagName: "Stage_Document",
          TagValue: values?.Stage_Document,
        },
        {
          Status: "Create",
          TagName: "Validate_Signature",
          TagValue: values?.Validate_Signature,
        },
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
        { Status: "Create", TagName: "clttype", TagValue: cltType },
        {
          Status: "Create",
          TagName: "ReasonForDelay",
          TagValue: values?.ReasonForDelay,
        },
        {
          Status: "Create",
          TagName: "Client_Id",
          TagValue: values?.ModifiedClientID,
        },
        { Status: "Create", TagName: "DocLink", TagValue: isDocLink },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink },
        { Status: "Create", TagName: "FileType", TagValue: "PROCESSENQUIRY" },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || emsrequestchannel,
        }
      );
    }
    // else if (checkedList[0] === "Update New Owner Details" && selectedSubType === "changeinownership") {
    //   transactionData.push(
    //     { Status: "Create", TagName: "Client_Id", TagValue: customerData?.poClientID },
    //     { Status: "Create", TagName: "NewOwnerClientID", TagValue: values?.NewOwnerClientID },
    //     { Status: "Create", TagName: "Salutation", TagValue: values?.Salutation },
    //     { Status: "Create", TagName: "MaritialStatus", TagValue: values?.MaritialStatus },
    //     { Status: "Create", TagName: "ProposerFirstName_New", TagValue: values?.ProposerFirstName_New },
    //     { Status: "Create", TagName: "ProposerLastName_New", TagValue: values?.ProposerLastName_New ? values.ProposerLastName_New.length === 1 ? values.ProposerLastName_New + "." : values.ProposerLastName_New : "" },
    //     { Status: "Create", TagName: "ProposerDOB_New", TagValue: values?.ProposerDOB_New ? convertDatee(values?.ProposerDOB_New) : "" },
    //     { Status: "Create", TagName: "AddressLine1_New", TagValue: values?.AddressLine1_New },
    //     { Status: "Create", TagName: "AddressLine2_New", TagValue: values?.AddressLine2_New },
    //     { Status: "Create", TagName: "AddressLine3_New", TagValue: values?.AddressLine3_New }
    //   );
    // }
    else if (selectedSubType === "agentcodecorrection") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "AgentCode_Old",
          TagValue: values?.AgentCode_Old || issAgentExistingObj?.AgentCode_Old,
        },
        {
          Status: "Create",
          TagName: "AgentName_Old",
          TagValue: values?.AgentName_Old || issAgentExistingObj?.AgentName_Old,
        },
        {
          Status: "Create",
          TagName: "Channel_Old",
          TagValue: values?.Channel_Old || issAgentExistingObj?.Channel_Old,
        },
        {
          Status: "Create",
          TagName: "AgentBranch_Old",
          TagValue:
            values?.AgentBranch_Old || issAgentExistingObj?.AgentBranch_Old,
        },
        {
          Status: "Create",
          TagName: "Reasonforagentcodechange",
          TagValue: values?.Reasonforagentcodechange || "",
        },
        {
          Status: "Create",
          TagName: "CurrentCDF",
          TagValue: values?.CurrentCDF || "",
        },
        {
          Status: "Create",
          TagName: "AgentCode_New",
          TagValue: values?.AgentCode_New,
        },
        {
          Status: "Create",
          TagName: "AgentName_New",
          TagValue: values?.AgentName_New || "",
        },
        {
          Status: "Create",
          TagName: "Channel_New",
          TagValue: values?.Channel_New || "",
        },
        {
          Status: "Create",
          TagName: "AgentBranch_New",
          TagValue: values?.AgentBranch_New || "",
        },
        {
          Status: "Create",
          TagName: "AgentBranch_New",
          TagValue: values?.AgentBranch_New || "",
        },
        {
          Status: "Create",
          TagName: "Agnet_Application_Number",
          TagValue: values?.Agnet_Application_Number || "",
        },
        {
          Status: "Create",
          TagName: "Agent_Status",
          TagValue: values?.Agent_Status || "",
        },
        {
          Status: "Create",
          TagName: "AgentSignaturVerificationResult",
          TagValue: values?.AgentSignaturVerificationResult || "",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "Client_Id",
          TagValue:
            values?.AgentCode_New === 1
              ? customerData?.laClientID
              : customerData?.poClientID,
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || emsrequestchannel,
        },
      ];
    } else if (selectedSubType === "changeinsignature") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        { Status: "Create", TagName: "custRole", TagValue: values?.custRole },
        {
          Status: "Create",
          TagName: "ValidateSignature",
          TagValue: values?.ValidateSignature,
        },
        {
          Status: "Create",
          TagName: "Client_Id",
          TagValue:
            values?.custRole === 1
              ? customerData?.laClientID
              : customerData?.poClientID,
        },
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
        { Status: "Create", TagName: "FileType", TagValue: "PROCESSENQUIRY" },
        { Status: "Create", TagName: "DocLink", TagValue: isDocLink },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || emsrequestchannel,
        },
      ];
    } else if (selectedSubType === "changeinterm") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "PlanName_Old",
          TagValue: values?.PlanName_Old || isTermExistingObj?.PlanName_Old,
        },
        {
          Status: "Create",
          TagName: "PolicyTerm_Old",
          TagValue: values?.PolicyTerm_Old || isTermExistingObj?.PolicyTerm_Old,
        },
        {
          Status: "Create",
          TagName: "CurrentPremium_Old",
          TagValue:
            values?.CurrentPremium_Old || isTermExistingObj?.CurrentPremium_Old,
        },
        {
          Status: "Create",
          TagName: "NewTerm_New",
          TagValue: values?.NewTerm_New,
        },
        {
          Status: "Create",
          TagName: "ReasonForChange_New",
          TagValue: values?.ReasonForChange_New,
        },
        {
          Status: "Create",
          TagName: "ValidateSignature",
          TagValue: values?.ValidateSignature,
        },
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
        {
          Status: "Create",
          TagName: "Client_Id",
          TagValue: customerData?.poClientID,
        },
        { Status: "Create", TagName: "DocLink", TagValue: isDocLink },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink },
        { Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER" },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || emsrequestchannel,
        },
      ];
    } else if (selectedSubType === "changeinsumassured") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "SumAssured_Old",
          TagValue:
            values?.SumAssured_Old || isSumAssuredExistingObj?.SumAssured_Old,
        },
        {
          Status: "Create",
          TagName: "CurrentPremium_Old",
          TagValue:
            values?.CurrentPremium_Old ||
            isSumAssuredExistingObj?.CurrentPremium_Old,
        },
        {
          Status: "Create",
          TagName: "SumAssured_New",
          TagValue: values?.SumAssured_New,
        },
        {
          Status: "Create",
          TagName: "ReasonForChange_New",
          TagValue: values?.ReasonForChange_New,
        },
        {
          Status: "Create",
          TagName: "ValidateSignature",
          TagValue: values?.ValidateSignature,
        },
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
        {
          Status: "Create",
          TagName: "Client_Id",
          TagValue: customerData?.poClientID,
        },
        { Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER" },
        { Status: "Create", TagName: "DocLink", TagValue: isDocLink },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || emsrequestchannel,
        },
      ];
    } else if (selectedSubType === "changeinplan") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "PlanName_Old",
          TagValue: values?.PlanName_Old || isPlanExistingObj?.PlanName_Old,
        },
        {
          Status: "Create",
          TagName: "CurrentPremium_Old",
          TagValue:
            values?.CurrentPremium_Old || isPlanExistingObj?.CurrentPremium_Old,
        },
        {
          Status: "Create",
          TagName: "NewPlan_New",
          TagValue: values?.NewPlan_New || "",
        },
        {
          Status: "Create",
          TagName: "ReasonForChange_New",
          TagValue: values?.ReasonForChange_New,
        },
        {
          Status: "Create",
          TagName: "ValidateSignature",
          TagValue: values?.ValidateSignature,
        },
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
        {
          Status: "Create",
          TagName: "Client_Id",
          TagValue: customerData?.poClientID,
        },
        { Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER" },
        { Status: "Create", TagName: "DocLink", TagValue: isDocLink },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || emsrequestchannel,
        },
      ];
    } else if (selectedSubType === "changeinpremium") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "PlanName_Old",
          TagValue: values?.PlanName_Old || isPremiumExistingObj?.PlanName_Old,
        },
        {
          Status: "Create",
          TagName: "CurrentPremium_Old",
          TagValue:
            values?.CurrentPremium_Old ||
            isPremiumExistingObj?.CurrentPremium_Old,
        },
        {
          Status: "Create",
          TagName: "NewPremium_New",
          TagValue: values?.NewPremium_New || "",
        },
        {
          Status: "Create",
          TagName: "ReasonForChange_New",
          TagValue: values?.ReasonForChange_New,
        },
        {
          Status: "Create",
          TagName: "ValidateSignature",
          TagValue: values?.ValidateSignature,
        },
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
        {
          Status: "Create",
          TagName: "Client_Id",
          TagValue: customerData?.poClientID,
        },
        { Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER" },
        { Status: "Create", TagName: "DocLink", TagValue: isDocLink },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || emsrequestchannel,
        },
      ];
    } else if (
      selectedSubType === "additionofrider" ||
      selectedSubType === "deletionofrider"
    ) {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        { Status: "Create", TagName: "RiderName", TagValue: values?.RiderName },
        {
          Status: "Create",
          TagName: "RequestFor",
          TagValue: values?.RequestFor,
        },
        {
          Status: "Create",
          TagName: "ValidateSignature",
          TagValue: values?.ValidateSignature,
        },
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
        {
          Status: "Create",
          TagName: "Client_Id",
          TagValue: customerData?.poClientID,
        },
        { Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER" },
        { Status: "Create", TagName: "DocLink", TagValue: isDocLink },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || emsrequestchannel,
        },
      ];
    } else if (selectedSubType === "changeindob") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "ClientRole_Existing",
          TagValue: values?.ClientRole_Existing,
        },
        {
          Status: "Create",
          TagName: "ExistingDateofBirth_Existing",
          TagValue: ExistingDateofBirth,
        },
        { Status: "Create", TagName: "Age_Existing", TagValue: Age_Existing },
        {
          Status: "Create",
          TagName: "Update_Existing",
          TagValue: values?.Update_Existing,
        },
        {
          Status: "Create",
          TagName: "ModifiedClientID",
          TagValue: getClientName(values?.ModifiedClientID) || "",
        },
        {
          Status: "Create",
          TagName: "NewDateofBirth",
          TagValue: values?.NewDateofBirth
            ? convertDatee(values?.NewDateofBirth)
            : "",
        },
        { Status: "Create", TagName: "Age", TagValue: values?.Age },
        {
          Status: "Create",
          TagName: "RefertoNBStageDocument",
          TagValue: values?.RefertoNBStageDocument,
        },
        {
          Status: "Create",
          TagName: "InitiateRequestBy",
          TagValue: values?.InitiateRequestBy,
        },
        {
          Status: "Create",
          TagName: "ValidateSignature",
          TagValue: values?.ValidateSignature,
        },
        {
          Status: "Create",
          TagName: "ReasonForDelay",
          TagValue: values?.ReasonForDelay,
        },
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
        {
          Status: "Create",
          TagName: "Client_Id",
          TagValue: values?.ModifiedClientID,
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || emsrequestchannel,
        },
      ];
    } else if (
      checkedList[0] === "Update New Owner Details" &&
      selectedSubType === "changeinownership"
    ) {
      let ArrayNew = [
        // {Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER"},
        // { Status: "Create", TagName: "DocLink", TagValue:isDocLink },
        // { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink},
        {
          Status: "Create",
          TagName: "Client_Id",
          TagValue: customerData?.poClientID,
        },
        {
          Status: "Create",
          TagName: "NewOwnerClientID",
          TagValue: values?.NewOwnerClientID,
        },
        {
          Status: "Create",
          TagName: "Salutation",
          TagValue: values?.Salutation,
        },
        {
          Status: "Create",
          TagName: "MaritialStatus",
          TagValue: values?.MaritialStatus,
        },
        {
          tagName: "ProposerFirstName_New",
          tagValue: values?.ProposerFirstName_New,
          status: "Create",
        },
        {
          tagName: "ProposerLastName_New",
          status: "Create",
          tagValue: values?.ProposerLastName_New
            ? values.ProposerLastName_New.length === 1
              ? values.ProposerLastName_New + "."
              : values.ProposerLastName_New
            : "",
        },
        {
          tagName: "ProposerDOB_New",
          tagValue: values?.ProposerDOB_New
            ? convertDatee(values?.ProposerDOB_New)
            : "",
          status: "Create",
        },
        {
          tagName: "AddressLine1_New",
          tagValue: values?.AddressLine1_New,
          status: "Create",
        },
        {
          tagName: "AddressLine2_New",
          tagValue: values?.AddressLine2_New,
          status: "Create",
        },
        {
          tagName: "AddressLine3_New",
          tagValue: values?.AddressLine3_New,
          status: "Create",
        },
        { tagName: "PINCode", tagValue: values?.PINCode, status: "Create" },
        { tagName: "City_New", tagValue: values?.City_New, status: "Create" },
        { tagName: "State_New", tagValue: values?.State_New, status: "Create" },

        {
          tagName: "ProposerName_Old",
          tagValue: ClientEnquiry?.lgivname + ClientEnquiry?.lsurname || "",
          status: "Create",
        },
        {
          tagName: "ProposerFirstName_Old",
          tagValue: ClientEnquiry?.lgivname + ClientEnquiry?.lsurname || "",
          status: "Create",
        },
        {
          tagName: "ProposerLastName_Old",
          tagValue: ClientEnquiry?.lgivname + ClientEnquiry?.lsurname || "",
          status: "Create",
        },
        {
          tagName: "ProposerDOB_Old",
          tagValue: ClientEnquiry?.clTdob
            ? convertDate(ClientEnquiry?.clTdob)
            : "",
          status: "Create",
        },
        {
          tagName: "AddressLine1_Old",
          tagValue: ClientEnquiry?.cltaddR01,
          status: "Create",
        },
        {
          tagName: "AddressLine2_Old",
          tagValue: ClientEnquiry?.cltaddR02,
          status: "Create",
        },
        {
          tagName: "AddressLine3_Old",
          tagValue: ClientEnquiry?.cltaddR03,
          status: "Create",
        },
        {
          tagName: "City_Old",
          tagValue: ClientEnquiry?.cltaddR04,
          status: "Create",
        },
        {
          tagName: "State_Old",
          tagValue: ClientEnquiry?.cltaddR05,
          status: "Create",
        },
        {
          tagName: "ProposerPANNumber_Old",
          tagValue: ClientEnquiry?.rtaxidnum,
          status: "Create",
        },
        // {"tagName":"City_New","tagValue": ClientEnquiry?.cltaddR04,"status":"Create"},
        // {"tagName":"State_New","tagValue": ClientEnquiry?.cltaddR05,"status":"Create"},
        {
          tagName: "MobileNumber_Old",
          tagValue: ClientEnquiry?.rmblphone,
          status: "Create",
        },
        {
          tagName: "ProposerEmailID_Old",
          tagValue: ClientEnquiry?.rinternet,
          status: "Create",
        },
        {
          tagName: "MobileNumber_Old",
          tagValue: values?.MobileNumber_Old,
          status: "Create",
        },
        {
          tagName: "ProposerEmailID_Old",
          tagValue: values?.ProposerEmailID_Old,
          status: "Create",
        },
        {
          tagName: "MobileNumber_New",
          tagValue: values?.MobileNumber_New,
          status: "Create",
        },
        {
          tagName: "ProposerEmailID_New",
          tagValue: values?.ProposerEmailID_New,
          status: "Create",
        },
        {
          tagName: "RelationtoLifeAssured",
          tagValue: values?.RelationtoLifeAssured,
          status: "Create",
        },
        {
          tagName: "PANNumber",
          tagValue: values?.PANNumber?.toUpperCase(),
          status: "Create",
        },
        { tagName: "PANResult", tagValue: values?.PANResult, status: "Create" },
        {
          tagName: "NameinPANN",
          tagValue: values?.NameinPANN,
          status: "Create",
        },
        { tagName: "NameMatch", tagValue: values?.NameMatch, status: "Create" },
        {
          tagName: "CKYCNumber",
          tagValue: values?.CKYCNumber,
          status: "Create",
        },
        {
          tagName: "ReasonForOwnershipChange",
          tagValue: values?.ReasonForOwnershipChange,
          status: "Create",
        },

        { tagName: "BankName", tagValue: values?.BankName, status: "Create" },
        {
          tagName: "BranchName",
          tagValue: values?.BranchName,
          status: "Create",
        },
        {
          tagName: "BankIFSC",
          tagValue: values?.BankIFSC?.toUpperCase(),
          status: "Create",
        },
        {
          tagName: "NameAsMentionedInTheBank",
          tagValue: values?.NameAsMentionedInTheBank,
          status: "Create",
        },
        {
          tagName: "BankAccountNumber",
          tagValue: BankAccNo || values?.BankAccountNumber || "",
          status: "Create",
        },
        {
          tagName: "AccountType",
          tagValue: values?.AccountType,
          status: "Create",
        },
        {
          tagName: "InitiatePennyDrop",
          tagValue: values?.InitiatePennyDrop,
          status: "Create",
        },
        {
          tagName: "NameasperPennyDrop",
          tagValue: values?.NameasperPennyDrop,
          status: "Create",
        },
        {
          tagName: "NamematchasperPennyDrop",
          tagValue: values?.NamematchasperPennyDrop,
          status: "Create",
        },

        {
          tagName: "CustomerSigningDate",
          tagValue: values?.CustomerSigningDate
            ? new Date(values?.CustomerSigningDate)
            : "",
          status: "Create",
        },
        {
          tagName: "BranchReceivedDate",
          tagValue: values?.BranchReceivedDate
            ? new Date(values?.BranchReceivedDate)
            : "",
          status: "Create",
        },
        {
          tagName: "ValidateSignature",
          tagValue: values?.ValidateSignature,
          status: "Create",
        },
        { tagName: "Comments", tagValue: values?.Comments, status: "Create" },
      ];
      ////Added by sayali on 11/08/2025 for Added nominee details in update new owner details
      const properties = [
        "ClientID_New",
        "NomineeFirstName_New",
        "NomineeLastName_New",
        "NomineeDOB_New",
        "Share_New",
        "RealtionshipWithPolicyowner_New",
        "Role_New",
        "NomineeSalutation_New",
      ];

      const data = (values.updateNomineeData || []).filter(
        (item) => item && Object.keys(item).length > 0
      );

      let updatedDataList = [];
      data?.forEach((record, index) => {
        properties.forEach((property) => {
          if (record[property] || record[property] === 0) {
            let tagValue = record[property];
            if (property.includes("NomineeDOB_New") && record[property]) {
              const dateValue = new Date(record[property]);
              if (!isNaN(dateValue.getTime())) {
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
      return [...ArrayNew, ...updatedDataList];
      //end
    } else if (
      selectedSubType === "changeinownership" &&
      checkedList?.includes("Share Process Communication")
    ) {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
        { Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER" },
        { Status: "Create", TagName: "DocLink", TagValue: isDocLink },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || emsrequestchannel,
        },
      ];
    } else if (selectedSubType === "policycontinuation") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "PolicyContinuance",
          TagValue: values?.PolicyContinuance,
        },
        {
          Status: "Create",
          TagName: "PolicyContinuanceAvaliableTill",
          TagValue: values?.PolicyContinuanceAvaliableTill,
        },
        {
          Status: "Create",
          TagName: "ValidateSignature",
          TagValue: values?.ValidateSignature,
        },
        {
          Status: "Create",
          TagName: "RequestorComments",
          TagValue: values?.RequestorComments,
        },
        {
          Status: "Create",
          TagName: "Client_Id",
          TagValue: customerData?.poClientID,
        },
        {
          Status: "Create",
          TagName: "PolicytobeRevivedBy",
          TagValue: isPolicyReceivedDate
            ? moment(values?.PolicytobeRevivedBy + 1).format("DD/MM/YYYY")
            : values?.PolicytobeRevivedBy
            ? moment(values?.PolicytobeRevivedBy).format("DD/MM/YYYY")
            : "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || emsrequestchannel,
        },
      ];
    }

    return transactionData;
  };

  const getSelectedCommunications = () => {
    let communicationObj = [];
    if (showEmailAddress || !showEmailAddress) {
      communicationObj.push({
        SrvReqRefNo: "",
        TemplateID: "",
        CommType: 2,
        ReceipientTo: clientEnquiryData?.rinternet,
        ReceipientCC: clientEnquiryData?.rinternet,
        MobileNos: "",
        ScheduledTime: new Date(),
        CommBody: "",
        Attachments: null,
      });
    }
    if (showWhatsApp || showPhoneNumber || !showWhatsApp || !showPhoneNumber) {
      communicationObj.push({
        SrvReqRefNo: "",
        TemplateID: "",
        CommType: 1,
        ReceipientTo: "",
        ReceipientCC: "",
        MobileNos: import.meta.env.VITE_APP_RECEIPIENT_MOBILENO
          ? import.meta.env.VITE_APP_RECEIPIENT_MOBILENO
          : clientEnquiryData?.rmblphone,
        ScheduledTime: new Date(),
        CommBody: "",
        Attachments: null,
      });
    }
    return communicationObj;
  };

  const getPOSTransactionData = (values) => {
    if (selectedSubType === "gstinupdate") {
      return [
        // { Status: "Update", TagName: "GSTINToBeUpdateFor", TagValue: values?.GSTINToBeUpdateFor},
        {
          Status: "Update",
          TagName: "ExistingGSTINNumber",
          TagValue: values?.ExistingGSTINNumber,
        },
        {
          Status: "Update",
          TagName: "NewGSTINNumber",
          TagValue: values?.NewGSTINNumber,
        },
        { Status: "Update", TagName: "Comments", TagValue: values?.Comments },
        {
          Status: "Create",
          TagName: "ValidateSignature",
          TagValue: values?.ValidateSignature || "",
        },
      ];
    } else if (selectedSubType === "panupdate") {
      if (values?.PANDetailsCorrect === "yes") {
        return [];
      } else {
        return [
          {
            Status: "Update",
            TagName: "PanValidation",
            TagValue: values?.PanValidation,
          },
          {
            Status: "Update",
            TagName: "PANCardCopy",
            TagValue: values?.PANCardCopy,
          },
          {
            Status: "Update",
            TagName: "ReEnterPanNo_New",
            TagValue: values?.ReEnterPanNo_New?.toUpperCase(),
          },
          {
            Status: "Update",
            TagName: "PANRevalidationResult",
            TagValue: values?.PANRevalidationResult,
          },
          {
            Status: "Update",
            TagName: "NameinPAN",
            TagValue: values?.NameinPANN,
          },
          {
            Status: "Update",
            TagName: "NameMatch",
            TagValue: values?.NameMatch || "",
          },
          { Status: "Update", TagName: "NameMatchFlag", TagValue: "Yes" },
          // { Status: "Update", TagName: "PanAadharSeeding", TagValue: values?.PanAadharSeeding },
          // { Status: "Update", TagName: "Last2YearsITRFilling", TagValue: values?.Last2YearsITRFilling },
          {
            Status: "Update",
            TagName: "NewPanNo",
            TagValue: values?.ReEnterPanNo_New?.toUpperCase(),
          },
        ];
      }
    } else if (selectedSubType === "changeinname") {
      return [
        {
          Status: "Update",
          TagName: "ModifiedClientID",
          TagValue: values?.ModifiedClientID,
        },
        {
          Status: "Update",
          TagName: "Salutation_New",
          TagValue: values?.Salutation_New,
        },
        {
          Status: "Update",
          TagName: "FirstName_New",
          TagValue: values?.FirstName_New,
        },
        {
          Status: "Update",
          TagName: "MiddleName_New",
          TagValue: values?.MiddleName_New,
        },
        {
          Status: "Update",
          TagName: "LastName_New",
          TagValue: values?.LastName_New,
        },
        {
          Status: "Update",
          TagName: "NameDeDupematch",
          TagValue: values?.NameDeDupematch,
        },
        {
          Status: "Update",
          TagName: "ValidateSignature",
          TagValue: values?.ValidateSignature,
        },
        {
          Status: "Update",
          TagName: "CustSignDateTime",
          TagValue: values?.CustomerSigningDate,
        },
        {
          Status: "Update",
          TagName: "resonfordelay",
          TagValue: values?.resonfordelay,
        },
        { Status: "Update", TagName: "Comments", TagValue: values?.Comments },
      ];
    } else if (selectedSubType === "agentcodecorrection") {
      return [
        {
          Status: "Update",
          TagName: "AgentCode_New",
          TagValue: values?.AgentCode_New,
        },
        {
          Status: "Update",
          TagName: "AgentName_New",
          TagValue: values?.AgentName_New,
        },
        {
          Status: "Update",
          TagName: "Agent_Status",
          TagValue: values?.Agent_Status,
        },
        {
          Status: "Update",
          TagName: "Reasonforagentcodechange",
          TagValue: values?.Reasonforagentcodechange,
        },
        {
          Status: "Update",
          TagName: "MatchSouringCodeUnderNewCDFandOldCDF",
          TagValue: values?.MatchSouringCodeUnderNewCDFandOldCDF,
        },
        {
          Status: "Update",
          TagName: "AgentSignaturVerificationResult",
          TagValue: values?.AgentSignaturVerificationResult,
        },
        {
          Status: "Update",
          TagName: "Matchnewcodeandoldcoderelationship",
          TagValue: values?.Matchnewcodeandoldcoderelationship,
        },
        { Status: "Update", TagName: "Comments", TagValue: values?.Comments },
      ];
    } else if (selectedSubType === "changeinsignature") {
      return [
        { Status: "Create", TagName: "custRole", TagValue: values?.custRole },
        {
          Status: "Create",
          TagName: "ValidateSignature",
          TagValue: values?.ValidateSignature,
        },
        {
          Status: "Create",
          TagName: "Client_Id",
          TagValue:
            values?.custRole === 1
              ? customerData?.laClientID
              : customerData?.poClientID,
        },
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
      ];
    } else if (selectedSubType === "changeinownership") {
      let ArrayDetails = [
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
      ];
      //Added by sayali on 11/08/2025 for Added nominee details in update new owner details
      const properties = [
        "ClientID",
        "NomineeFirstName",
        "NomineeLastName",
        "NomineeDOB",
        "Share",
        "RealtionshipWithPolicyowner",
        "Role",
        "NomineeSalutation",
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
              TagValue: property?.includes("NomineeDOB")
                ? moment(record[property] + 1).format("DD/MM/YYYY")
                : record[property],
            };
            if (
              property?.includes("NomineeDOB") &&
              typeof record[property] == "string"
            ) {
              obj.TagValue = record[property];
            }
            if (property?.includes("RealtionshipWithPolicyowner")) {
              let recordExist = relationShipLU.find(
                (x) => x.label == record[property]
              );
              recordExist && (obj.TagValue = recordExist.value);
            }
            updatedDataList.push(obj);
          }
        });
      });
      return [...ArrayDetails, ...updatedDataList];
      //end
    } else if (selectedSubType === "changeindob") {
      return [
        {
          Status: "Update",
          TagName: "AreDetailsCorrect",
          TagValue: values?.AreDetailsCorrect,
        },
        {
          Status: "Update",
          TagName: "custRole",
          TagValue: values?.POScustRole,
        },
        {
          Status: "Update",
          TagName: "ModifiedClientID",
          TagValue: values?.ModifiedClientID,
        },
        {
          Status: "Update",
          TagName: "NewDateofBirth",
          TagValue: values?.POSNewDateofBirth
            ? convertDatee(values?.POSNewDateofBirth)
            : "",
        },
        { Status: "Update", TagName: "Age", TagValue: values?.POSAge },
        {
          Status: "Update",
          TagName: "LifeAsiaUpdated",
          TagValue: values?.LifeAsiaUpdated,
        },
        {
          Status: "Update",
          TagName: "POSComments1",
          TagValue: values?.Comments,
        },
      ];
    } else if (
      [
        "changeinsumassured",
        "changeinplan",
        "changeinpremium",
        "changeinterm",
        "additionofrider",
        "deletionofrider",
      ].includes(selectedSubType)
    ) {
      return [
        {
          Status: "Update",
          TagName: "LifeAsiaUpdated",
          TagValue: values?.LifeAsiaUpdated,
        },
        {
          Status: "Update",
          TagName: "POSComments1",
          TagValue: values?.Comments,
        },
      ];
    }
  };
  const handleSubmit = (values) => {
    // if (selectedSubType === "changeinname"&& checkedList?.includes("Update New Details") && checkedList[0]!=="View Existing Details") {
    //   if(ClientGender === 'M' && (values?.Salutation_New !== 'Mr' && values?.Salutation_New !== 'Master' )){
    //   message.error({
    //     content:
    //       "Invalid Salutation",
    //     className: "custom-msg",
    //     duration: 2,
    //   });
    //   return;
    // }

    //   if(ClientGender === 'F' && (values?.Salutation_New !== 'Ms' && values?.Salutation_New !== 'Mrs' )){
    //     message.error({
    //       content:
    //         "Invalid Salutation",
    //       className: "custom-msg",
    //       duration: 2,
    //     });
    //     return;
    //   }
    // }
    if (
      checkedList?.includes("Share Process Communication") &&
      !isShowPOSScreen &&
      !showEmailFields
    ) {
      message.destroy();
      message.error({
        content: "Please select atleast one communication.",
        className: "custom-msg",
        duration: 2,
      });
    } else {
      if (POSContactData && customerData?.isPOS) {
        POSActionsOnContactDetails(values, "APPROVED");
      } else if (
        selectedSubType === "changeinname" ||
        selectedSubType === "agentcodecorrection" ||
        selectedSubType === "gstinupdate" ||
        selectedSubType === "panupdate" ||
        selectedSubType === "changeinsignature" ||
        selectedSubType === "changeinterm" ||
        selectedSubType === "changeinplan" ||
        selectedSubType === "changeinsumassured" ||
        selectedSubType === "changeinpremium" ||
        selectedSubType === "policycontinuation" ||
        selectedSubType === "additionofrider" ||
        selectedSubType === "deletionofrider" ||
        selectedSubType === "changeinownership" ||
        selectedSubType === "changeindob"
      ) {
        if (
          (values?.validatesignature === "no" ||
            values?.ValidateSignature === "no" ||
            values?.Validate_Signature === "no") &&
          selectedSubType !== "gstinupdate"
        ) {
          // getRaiseRequirements();
          saveRequest(values);
        } else {
          saveRequest(values);
        }
      }
    }
  };

  const saveRequest = (values) => {
    setIsLoading(true);
    if (values.CustomerSigningDate > values.BranchReceivedDate) {
      message.destroy();
      message.error({
        content:
          " customer signing date  can't be greater than  Request Received Date.",
        className: "custom-msg",
        duration: 3,
      });
      form.setFieldsValue({
        CustomerSigningDate: "",
      });
      setIsLoader(false);
      return;
    }
    let newMobileNumber = values?.ProposerEmailID_New;
    let RecieptToCC = "";
    if (selectedCallType == 6 && selectedSubType === "changeinownership") {
      RecieptToCC = import.meta.env.VITE_APP_RECEIPIENT_TO
        ? import.meta.env.VITE_APP_RECEIPIENT_CC
        : newMobileNumber;

      if (isApointeeRequired(values.updateNomineeData) && !isShowPOSScreen) {
        const nominees = (values.updateNomineeData || []).filter(
          (r) => r && Object.keys(r).length > 0
        );

        const hasMinor = nominees.some((n) => checkIsMinor(n?.NomineeDOB_New));

        const hasAppointee = nominees.some(
          (n) =>
            n?.Role_New === "appointee" ||
            n?.RealtionshipWithPolicyowner_New === "TR"
        );
        if (hasMinor && !hasAppointee && !isShowPOSScreen) {
          handleError("Appointee is mandatory for minor nominee.");
          return;
        }
      }
    } else {
      RecieptToCC = import.meta.env.VITE_APP_RECEIPIENT_TO
        ? import.meta.env.VITE_APP_RECEIPIENT_TO
        : clientEnquiryData?.rinternet;
    }
    setIsLoading(true);
    setShowAlert(false);
    const newFilesArray = [];
    const uniqueFilesSet = new Set();

    if (uploadFiles?.length > 0) {
      uploadFiles.forEach((file) => uniqueFilesSet.add(file));
    }

    if (uploadMultipleFiles?.length > 0) {
      uploadMultipleFiles.forEach((file) => uniqueFilesSet.add(file));
    }

    if (uploadIDMultipleFiles?.length > 0) {
      uploadIDMultipleFiles.forEach((file) => uniqueFilesSet.add(file));
    }

    if (
      props.SelectedSubTypeVal === "PAN Update" &&
      PANUploadFiles?.length > 0
    ) {
      PANUploadFiles.forEach((file) => uniqueFilesSet.add(file));
    }

    // Add all unique files to newFilesArray
    newFilesArray.push(...uniqueFilesSet);

    if (props.SelectedSubTypeVal === "PAN Update") {
      newFilesArray.push(...PANUploadFiles);
    }
    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: loginInfo?.userProfileInfo?.profileObj?.role || 0, // Required
      RequestChannel: isEmailManagement
        ? 4
        : loginInfo?.userProfileInfo?.profileObj?.role === 14
        ? 13
        : values.requestchannel, // Required
      Category:
        checkedList?.includes("View Existing GSTIN") ||
        checkedList?.includes("View Existing PAN Details") ||
        checkedList?.includes("Share Process Communication") ||
        checkedList?.includes("View Existing Details") ||
        (selectedSubType === "changeinsignature" && !showNewSignatureFields) ||
        (checkedList?.includes("View Existing Owner Details") &&
          selectedSubType === "changeinownership") ||
        checkedList?.includes("View Existing Agent Code Details") ||
        checkedList?.some((item) => item.includes("View Existing"))
          ? 1
          : checkedList?.includes("Update New GSTIN") ||
            checkedList?.includes("Update New PAN Number") ||
            checkedList?.includes("Update New Details") ||
            checkedList?.includes("Update Agent Code Details") ||
            checkedList?.includes("Update New Signature") ||
            (checkedList?.includes("Update New Owner Details") &&
              selectedSubType === "changeinownership") ||
            (selectedSubType === "changeinsignature" &&
              showNewSignatureFields) ||
            checkedList?.some((item) => item.includes("Update New")) ||
            selectedSubType === "additionofrider" ||
            selectedSubType === "deletionofrider" ||
            selectedSubType === "changeinterm" ||
            selectedSubType === "changeinplan" ||
            selectedSubType === "changeinpremium" ||
            selectedSubType === "changeinsumassured" ||
            selectedSubType === "policycontinuation" ||
            raiseRequirementOpen
          ? 2
          : 3,
      ApplicationNo:
        details?.policyDetailsObj?.identifiers?.applicationNo ||
        customerData?.applicationNo,
      DOB: convertDate(customerData?.dob),
      PolicyNo:
        details?.policyDetailsObj?.identifiers?.policyNo ||
        customerData?.policyNo, // Required
      CustomerId:
        values?.GSTINToBeUpdateFor === 1
          ? customerData?.laClientID
          : customerData?.poClientID,

      CurrentStatus: raiseRequirementOpen ? "Reject" : "",
      CustRole: values?.custRole === "Proposer" ? 2 : "" || 1,
      policyStatus:
        details?.policyDetailsObj?.planAndStatus?.policyStatus ||
        customerData?.policyStatus,
      proposerName:
        details?.policyDetailsObj?.identifiers?.po_Name ||
        customerData?.po_Name,
      plan:
        details?.policyDetailsObj?.planAndStatus?.planName ||
        customerData?.planName,
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
      ReasonDelayed: values?.ReasonForDelay || values?.resonfordelay,
      CustSignDateTime: values?.CustomerSigningDate
        ? new Date(values?.CustomerSigningDate)
        : new Date(),
      TransactionData: getTransactionData(values) || [],
      Uploads: newFilesArray?.length > 0 ? newFilesArray : uploadFiles,
      CommunicationRequest:
        selectedSubType === "agentcodecorrection" &&
        checkedList.includes("Update Agent Code Details")
          ? ""
          : [
              {
                SrvReqRefNo: "",
                TemplateID: "",
                CommType: 2,
                ReceipientTo: import.meta.env.VITE_APP_RECEIPIENT_TO
                  ? import.meta.env.VITE_APP_RECEIPIENT_TO
                  : clientEnquiryData?.rinternet,
                ReceipientCC: RecieptToCC,
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
                MobileNos: import.meta.env.VITE_APP_RECEIPIENT_MOBILENO
                  ? import.meta.env.VITE_APP_RECEIPIENT_MOBILENO
                  : clientEnquiryData?.rmblphone,
                ScheduledTime: new Date(),
                CommBody: "",
                Attachments: null,
              },
            ],
    };

    if (raiseRequirementOpen) {
      let reqFormValues = requirementsForm?.getFieldsValue();
      let ids = raiseRequerimentList
        ?.filter((e) => e.status === true)
        ?.map((e) => e.raiseReqId);
      obj.TransactionData.push({
        Status: "Create",
        TagName: "ReasonList_Key",
        TagValue: JSON.stringify(ids),
      });
      obj.TransactionData?.push({
        Status: "Create",
        TagName: "AddAnyOtherRequirements",
        TagValue: reqFormValues?.addotherReq || "",
      });
      if (ids?.length === 0 && !props?.EmailResponse?.IsEmailmanagent) {
        message.error({
          content: "Please Select Documents to Reject",
          className: "custom-msg",
          duration: 3,
        });
        setIsLoading(false);
        setRequirementLoader(false);
        return;
      }
    }

    // if(values?.Validate_Signature === 'no'){
    //   let ids = raiseRequerimentList?.filter((e) => e.status === true)?.map((e) => e.raiseReqId)

    //   obj.TransactionData.push({
    //     "Status": "Create",
    //     "TagName": "ReasonList_Key",
    //     "TagValue":  JSON.stringify(ids)
    //   })
    // }
    if (props?.EmailResponse?.IsEmailmanagent) {
      obj.TransactionData.push(
        {
          Status: "Create",
          TagName: "EmailResponseId",
          TagValue: props?.EmailResponse?.EmailResponseId,
        },
        {
          Status: "Create",
          TagName: "CustomerName",
          TagValue: clientEnquiryData?.lgivname + clientEnquiryData?.lsurname,
        }
      );
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

  const POSActionsOnContactDetails = (values, status, list) => {
    let content =
      status === "REJECTED"
        ? "Please Select Documents to Reject"
        : "Please Select Documents to move  Internally";
    let seletedRequerimentList;
    if (status === "INTERNAL") {
      seletedRequerimentList = list;
    } else if (status === "REJECTED") {
      seletedRequerimentList = raiseRequerimentList
        ?.filter((e) => e.status === true)
        ?.map((e) => e.raiseReqId);
      let dummy = "";
      seletedRequerimentList.forEach((x) => {
        dummy = x.value;
      });
    }

    let reqFormValues = requirementsForm?.getFieldsValue();
    let internalFormValues = requirementsForm?.getFieldsValue();
    if (status !== "APPROVED") {
      if (
        (seletedRequerimentList.length === 0 &&
          !reqFormValues?.PosOtherReq &&
          status === "REJECTED") ||
        (seletedRequerimentList.length === 0 &&
          !internalFormValues?.PosOtherReq &&
          status === "INTENAL")
      ) {
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
    let payload = [];
    if (status === "APPROVED") {
      payload = getPOSTransactionData(values) || [];
    }
    let Comments = values?.Comments === "" ? values?.Comment : values?.Comments;
    let obj = {
      TransectionId: 1,
      SrvReqRefNo: POSContactData?.srvReqRefNo || serviceRequestId,
      Status: status,
      RequirementList: seletedRequerimentList,
      UsrID: loginInfo?.userProfileInfo?.profileObj?.userName,
      RoleID: loginInfo?.userProfileInfo?.profileObj?.role,
      Comments: values?.Comment || values?.AuthorizerComments || Comments,
      TransactionPayload: payload,
    };
    obj?.TransactionPayload?.push({
      Status: "Create",
      TagName: "POSComments1",
      TagValue: values?.Comment || values?.AuthorizerComments || Comments || "",
    });

    if (status === "INTERNAL") {
      obj.TransactionPayload.push({
        Status: "create",
        TagName: "InternalRequirementValue",
        TagValue: JSON.stringify(seletedRequerimentList),
      });
    }
    if (isShowPOSScreen) {
      obj.TransactionPayload.push({
        Status: "Create",
        TagName: "PosOtherReq",
        TagValue: reqFormValues?.PosOtherReq || "",
      });
    }

    if (selectedSubType === "changeinownership") {
      obj.TransactionPayload.push(
        {
          Status: "Update",
          TagName: "BankIFSC",
          TagValue: values?.BankIFSC?.toUpperCase() || "",
        },
        {
          Status: "Update",
          TagName: "BankName",
          TagValue: values?.BankName,
        },
        {
          Status: "Update",
          TagName: "AccountType",
          TagValue: values?.AccountType,
        },
        {
          Status: "Update",
          TagName: "NameAsMentionedInTheBank",
          TagValue: values?.NameAsMentionedInTheBank,
        },
        {
          Status: "Update",
          TagName: "BankAccountNumber",
          TagValue: values?.BankAccountNumber,
        },
        {
          Status: "Update",
          TagName: "PennyDropResult",
          TagValue: values?.PennyDropResult,
        },
        {
          Status: "Update",
          TagName: "InitiatePennyDrop",
          TagValue: values?.InitiatePennyDrop,
        },
        {
          Status: "Update",
          TagName: "NewOwnerClientID",
          TagValue: values?.NewOwnerClientID,
        },
        {
          Status: "Update",
          TagName: "Salutation",
          TagValue: values?.Salutation,
        },
        {
          Status: "Update",
          TagName: "MaritialStatus",
          TagValue: values?.MaritialStatus,
        },
        {
          tagName: "ProposerFirstName_New",
          tagValue: values?.ProposerFirstName_New,
          status: "Update",
        },
        {
          tagName: "ProposerLastName_New",
          tagValue: values?.ProposerLastName_New
            ? values.ProposerLastName_New.length === 1
              ? values.ProposerLastName_New + "."
              : values.ProposerLastName_New
            : "",
          status: "Update",
        },
        {
          tagName: "ProposerDOB_New",
          tagValue: values?.ProposerDOB_New
            ? convertDatee(values?.ProposerDOB_New)
            : "",
          status: "Update",
        },
        {
          tagName: "AddressLine1_New",
          tagValue: values?.AddressLine1_New,
          status: "Update",
        },
        {
          tagName: "AddressLine2_New",
          tagValue: values?.AddressLine2_New,
          status: "Update",
        },
        {
          tagName: "AddressLine3_New",
          tagValue: values?.AddressLine3_New,
          status: "Update",
        },
        { tagName: "PINCode", tagValue: values?.PINCode, status: "Update" },
        { tagName: "City_New", tagValue: values?.City_New, status: "Update" },
        { tagName: "State_New", tagValue: values?.State_New, status: "Update" },
        {
          tagName: "MobileNumber_New",
          tagValue: values?.MobileNumber_New,
          status: "Update",
        },
        {
          tagName: "ProposerEmailID_New",
          tagValue: values?.ProposerEmailID_New,
          status: "Update",
        },
        {
          tagName: "RelationtoLifeAssured",
          tagValue: values?.RelationtoLifeAssured,
          status: "Update",
        },
        {
          tagName: "PANNumber",
          tagValue: values?.PANNumber?.toUpperCase(),
          status: "Update",
        },
        { tagName: "PANResult", tagValue: values?.PANResult, status: "Update" },
        {
          tagName: "NameinPANN",
          tagValue: values?.NameinPANN,
          status: "Update",
        },
        { tagName: "NameMatch", tagValue: values?.NameMatch, status: "Update" }
      );
    }
    setIsLoading(true);
    let response = apiCalls.POSActionsOnContactDetails(obj);
    response
      .then((val) => {
        if (val?.data) {
          setAlertTitle(
            status === "REJECTED"
              ? "Requirements Raised"
              : `${val?.data?.message}`
          );
          setNavigateTo(
            (showRaiseRequirementBtn && "/advancesearch") || "/posexec"
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

  const getRaiseRequirements = () => {
    setRaiseRequirementOpen(true);
    setRequirementLoader(true);
    let obj = {
      calltype: props?.selectedCallType,
      subtype: props?.selectedSubTypeId,
      Role: isShowPOSScreen ? 0 : 1,
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
    setRequirementLoader(true);
    if (isShowPOSScreen) {
      POSActionsOnContactDetails(formData, "REJECTED");
    } else {
      saveRequest(formData);
    }
  };
  const popupClose = () => {
    setRaiseRequirementOpen(false);
  };

  const getUploadFiles = (listOfUploadFiles) => {
    // Update the state with the new list
    if (props.SelectedSubTypeVal === "PAN Update") {
      const PreviouslyFiles = [...PANUploadFiles, ...listOfUploadFiles];
      setPANUploadFiles(PreviouslyFiles);
    } else {
      setUploadFiles(listOfUploadFiles);
    }
  };

  const isApointeeRequired = (nomineeData) => {
    if (
      isMinorDOB &&
      nomineeData?.every(
        (row) =>
          row?.Role_New !== "appointee" &&
          row?.RealtionshipWithPolicyowner_New !== "TR"
      )
    ) {
      return true;
    }
    // else if (!isMinorDOB && updateNomineeData?.some((row) => row?.Role_New === 'appointee')) {
    //   return true;
    // }
    return false;
  };

  const checkIsMinor = (dob) => {
    if (!dob) return false;

    const today = new Date();
    const birth = new Date(dob);

    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    const d = today.getDate() - birth.getDate();

    if (m < 0 || (m === 0 && d < 0)) age--;

    return age < 18;
  };

  const handleRemove = (file) => {
    if (
      file?.labelName ===
      "Require Change in Signature Form duly attested by Bank official"
    ) {
      setPassportUploadFiles([]);
    } else if (file?.labelName === "Copy of PAN Card") {
      setPancardUploadFiles([]);
    } else if (file?.labelName === "Copy of Aadhar Card") {
      setAAdharUploadFiles([]);
    } else if (file?.labelName === "Copy of Passport") {
      setPassportUploadFiles([]);
    } else if (file?.labelName === "Copy of Ration Card") {
      setRationCardUploadFiles([]);
    } else if (file?.labelName === "Copy of Driving License") {
      setDrivingUploadFiles([]);
    } else if (file?.labelName === "Copy of Voter ID") {
      setVoterUploadFiles([]);
    } else if (
      file?.labelName === "Utility Bill which is not more than 2 months"
    ) {
      setUtilityUploadFiles([]);
    } else if (
      file?.labelName ===
      "Bank statement/Passbook copy with latest 2 months transactions"
    ) {
      setPassbookUploadFiles([]);
    }

    if (idProofModal) {
      let updatedFiles = isIDUploadMultipleFiles?.filter((ele) => {
        return ele?.labelName !== file.labelName;
      });
      setIsIDMultipleFiles(updatedFiles);
      form.setFieldsValue({
        idProof: `Documents Uploaded -  ${updatedFiles.length}`,
      });
    } else {
      let updatedFiles = isUploadMultipleFiles?.filter((ele) => {
        return ele?.labelName !== file.labelName;
      });
      setIsMultipleFiles(updatedFiles);
      form.setFieldsValue({
        addressProof: `Documents Uploaded -  ${updatedFiles.length}`,
      });
    }
    // form.setFieldsValue({
    //   addressProof: `Documents Uploaded -  ${updatedFiles.length }`,
    //   idProof:  `Documents Uploaded -  ${updatedFiles.length }`,
    // })
  };

  const getMultpleUploadFiles = (listOfUploadFiles, label) => {
    // Update the state with the new list
    if (listOfUploadFiles?.length > 0) {
      setUploadIDMultipleFiles(listOfUploadFiles);
      if (idProofModal) {
        form.setFieldsValue({
          idProof: `Documents Uploaded -  ${listOfUploadFiles.length}`,
        });
      } else {
        setUploadMultipleFiles(listOfUploadFiles);
        form.setFieldsValue({
          addressProof: `Documents Uploaded -  ${listOfUploadFiles.length}`,
        });
      }
    }
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    fileList: [],
    customRequest: ({ file, onSuccess, index, item }, label, idProofUpload) => {
      let formData = new FormData();
      const ApplicationNo =
        details?.policyDetailsObj?.identifiers?.applicationNo;
      formData.append("File", file, ApplicationNo + "/" + file.name);
      let response = apiCalls.fileUpload(formData);
      response.then((val) => {
        if (val?.data) {
          let newDocumentObj = {
            IndexName: "Signature",
            DocumentName: file?.name,
            UserID: loginInfo?.userProfileInfo?.profileObj?.userName,
            UploadedBy: loginInfo?.userProfileInfo?.profileObj?.name,
            UploadedOn: new Date(),
            DocumentSize: file?.size,
            FileLocation: "/" + ApplicationNo + "/",
            BlobFileName: file?.name,
            FileExtnMime: file?.type,
            labelName: label,
            name: file.name,
          };
          if (idProofModal) {
            if (
              newDocumentObj.labelName &&
              isIDUploadMultipleFiles?.length > 0
            ) {
              // Check if a file with the same labelName already exists
              const existingFileIndex = isIDUploadMultipleFiles.findIndex(
                (file) => file.labelName === newDocumentObj.labelName
              );
              // Remove the labelName property before updating or adding the object
              if (existingFileIndex !== -1) {
                // If exists, replace the existing file object with the new one
                const updatedUploadFiles = [...isIDUploadMultipleFiles];
                updatedUploadFiles[existingFileIndex] = newDocumentObj;
                setIsIDMultipleFiles(updatedUploadFiles);

                // Send the updated files to getMultpleUploadFiles
                getMultpleUploadFiles(updatedUploadFiles, label);
              } else {
                // If doesn't exist, add the new file object to the list
                setIsIDMultipleFiles((prevFiles) => [
                  ...prevFiles,
                  newDocumentObj,
                ]);
                // Send the updated files to getMultpleUploadFiles
                getMultpleUploadFiles(
                  [...isIDUploadMultipleFiles, newDocumentObj],
                  label
                );
              }
            } else {
              // If labelName is not present or the array is empty, add the new file object to the list
              setIsIDMultipleFiles((prevFiles) => [
                ...prevFiles,
                newDocumentObj,
              ]);

              // Send the updated files to getMultpleUploadFiles
              // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
              getMultpleUploadFiles(
                [...isIDUploadMultipleFiles, newDocumentObj],
                label
              );
            }
          } else {
            if (newDocumentObj.labelName && isUploadMultipleFiles?.length > 0) {
              // Check if a file with the same labelName already exists
              const existingFileIndex = isUploadMultipleFiles.findIndex(
                (file) => file.labelName === newDocumentObj.labelName
              );
              // Remove the labelName property before updating or adding the object
              if (existingFileIndex !== -1) {
                // If exists, replace the existing file object with the new one
                const updatedUploadFiles = [...isUploadMultipleFiles];
                updatedUploadFiles[existingFileIndex] = newDocumentObj;
                setIsMultipleFiles(updatedUploadFiles);

                // Send the updated files to getMultpleUploadFiles
                getMultpleUploadFiles(updatedUploadFiles, label);
              } else {
                // If doesn't exist, add the new file object to the list
                setIsMultipleFiles((prevFiles) => [
                  ...prevFiles,
                  newDocumentObj,
                ]);

                // Send the updated files to getMultpleUploadFiles
                getMultpleUploadFiles(
                  [...isUploadMultipleFiles, newDocumentObj],
                  label
                );
              }
            } else {
              // If labelName is not present or the array is empty, add the new file object to the list
              setIsMultipleFiles((prevFiles) => [...prevFiles, newDocumentObj]);

              // Send the updated files to getMultpleUploadFiles
              getMultpleUploadFiles(
                [...isUploadMultipleFiles, newDocumentObj],
                label
              );
            }
          }
          setShowUploadFile(index);
          if (idProofUpload === "idProofUpload") {
            if (label?.includes("Copy of Aadhar Card")) {
              setAAdharIDUploadFiles([{ ...newDocumentObj }]);
            } else if (label?.includes("Copy of Passport")) {
              setPassportIDUploadFiles([{ ...newDocumentObj }]);
            } else if (label?.includes("Copy of Ration Card")) {
              setRationCardIDUploadFiles([{ ...newDocumentObj }]);
            } else if (label?.includes("Copy of Driving License")) {
              setDrivingIDUploadFiles([{ ...newDocumentObj }]);
            } else if (label?.includes("Copy of PAN Card")) {
              setPancardIDUploadFiles([{ ...newDocumentObj }]);
            } else if (label?.includes("Copy of Voter ID")) {
              setVoterIDUploadFiles([{ ...newDocumentObj }]);
            }
          } else {
            if (label?.includes("Copy of Aadhar Card")) {
              setAAdharUploadFiles([{ ...newDocumentObj }]);
            } else if (
              label?.includes(
                "Require Change in Signature Form duly attested by Bank official"
              )
            ) {
              setPassportUploadFiles([{ ...newDocumentObj }]);
            } else if (label?.includes("Copy of Passport")) {
              setPassportUploadFiles([{ ...newDocumentObj }]);
            } else if (label?.includes("Copy of Ration Card")) {
              setRationCardUploadFiles([{ ...newDocumentObj }]);
            } else if (label?.includes("Copy of Driving License")) {
              setDrivingUploadFiles([{ ...newDocumentObj }]);
            } else if (label?.includes("Copy of PAN Card")) {
              setPancardUploadFiles([{ ...newDocumentObj }]);
            } else if (label?.includes("Copy of Voter ID")) {
              setVoterUploadFiles([{ ...newDocumentObj }]);
            } else if (
              label?.includes("Utility Bill which is not more than 2 months")
            ) {
              setUtilityUploadFiles([{ ...newDocumentObj }]);
            } else if (
              label?.includes(
                "Bank statement/Passbook copy with latest 2 months transactions"
              )
            ) {
              setPassbookUploadFiles([{ ...newDocumentObj }]);
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
      });
    },
    beforeUpload: (file) => {
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
        message.error("File don't allow double extension");
        return Upload.LIST_IGNORE;
      }
    },
  };
  const handleAddressModalClose = () => {
    setUploadFiles([]);
    setAddressProofModal(false);
    setAAdharUploadFiles([]);
    setPassportUploadFiles([]);
    setRationCardUploadFiles([]);
    setDrivingUploadFiles([]);
    setVoterUploadFiles([]);
    setPancardUploadFiles([]);
  };
  const handleIdProofModalClose = () => {
    setUploadFiles([]);
    setIdProofModal(false);
    setAAdharIDUploadFiles([]);
    setPassportIDUploadFiles([]);
    setRationCardIDUploadFiles([]);
    setDrivingIDUploadFiles([]);
    setVoterIDUploadFiles([]);
    setPancardIDUploadFiles([]);
  };
  const handleOk = (idProofBtn) => {
    if (idProofBtn === "idProof") {
      if (
        aadharIDUploadFiles?.length === 0 &&
        passportIDUploadFiles?.length === 0 &&
        rationCardIDUploadFiles?.length === 0 &&
        DrivingIDUploadFiles?.length === 0 &&
        voterIDUploadFiles?.length === 0 &&
        pancardIDUploadFiles?.length === 0
      ) {
        message.warning({
          content: "Please Upload atleast one file.",
          className: "custom-msg",
          duration: 2,
        });
      } else {
        setAddressProofModal(false);
        setIdProofModal(false);
      }
    } else {
      if (
        aadharUploadFiles?.length === 0 &&
        passportUploadFiles?.length === 0 &&
        rationCardUploadFiles?.length === 0 &&
        DrivingUploadFiles?.length === 0 &&
        utilityUploadFiles?.length === 0 &&
        voterUploadFiles?.length === 0 &&
        passbookUploadFiles?.length === 0
      ) {
        message.warning({
          content: "Please Upload atleast one file.",
          className: "custom-msg",
          duration: 2,
        });
      } else {
        setAddressProofModal(false);
        setIdProofModal(false);
      }
    }
  };
  const getInternal = (list) => {
    let values = form.getFieldsValue();
    POSActionsOnContactDetails(values, "INTERNAL", list);
  };

  let boeScreenObj = {};

  let internalData = [
    {
      name: "authorizercomments",
      label: "Authorizer Comments ",
      inputType: "text",
      required: false,
      disabled: true,
      placeholder: "Authorizer Comments",
    },
    {
      name: "Comments",
      label: "Requestor Comments",
      inputType: "textarea",
      maxlength: 500,
      required: false,
      validationmsg: "Enter Comments",
      placeholder: "Requestor Comments",
    },
    {
      name: "uploaddocuments",
      indexName: "Upload Documents",
      label: "Upload Documents",
      inputType: "upload",
      placeholder: "Upload Documents",
    },
    {
      name: "viewRequirements",
      indexName: "View Requirements",
      label: "View Requirements",
      inputType: "button",
      placeholder: "View Requirements",
    },
  ];
  useEffect(() => {
    if (customerData?.isInternalFlow) {
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        boeScreenObj[element.tagName] = element.tagValue;
      });
      form.setFieldsValue({
        authorizercomments: boeScreenObj?.POSComments1,
      });
      setInternalReqData();
    }
  }, []);

  useEffect(() => {
    if (!isShowClientListModal) {
      setSearchType(null);
    }
  }, [isShowClientListModal]);

  const handleClientList = () => {
    setSearchType("owner");
    setIsShowClientListModal(true);
  };

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
          {customerData?.isInternalFlow ? (
            <>
              <InternalFlow
                data={internalData}
                suffix={!isShowPOSScreen && suffix}
                policyDetails={
                  props?.details?.policyDetailsObj?.identifiers?.applicationNo
                }
                form={form}
                customerData={customerData}
                POSContactData={POSContactData}
                boeScreenObj={boeScreenObj}
                Docs={InternaRequirements}
              />
            </>
          ) : (
            <>
              {/*Change In Name SubType Code Start */}
              {selectedSubType === "changeinname" && (
                <>
                  {!isShowPOSScreen && (
                    <>
                      <Row gutter={[16, 16]} className="reasons-list">
                        <Col
                          xs={24}
                          sm={24}
                          md={8}
                          lg={8}
                          xxl={8}
                          className="loan-checkboxes"
                        >
                          <Form.Item
                            label="View Existing Details"
                            name="viewExistingdetails"
                            className="checkbox-gap"
                          >
                            <Checkbox
                              value="View Existing Details"
                              checked={checkedList.includes(
                                "View Existing Details"
                              )}
                              onChange={() =>
                                handleChange("View Existing Details")
                              }
                            ></Checkbox>
                          </Form.Item>
                        </Col>
                        <Col
                          xs={24}
                          sm={24}
                          md={8}
                          lg={8}
                          xxl={8}
                          className="loan-checkboxes"
                        >
                          <Form.Item
                            label="Update New Details"
                            name="UpdateNewDetails"
                          >
                            <Checkbox
                              value="Update New Details"
                              checked={checkedList.includes(
                                "Update New Details"
                              )}
                              onChange={() =>
                                handleChange("Update New Details")
                              }
                            ></Checkbox>
                          </Form.Item>
                        </Col>
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
                            name="shareprocesscommunication"
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
                    </>
                  )}
                  {checkedList?.includes("View Existing Details") && (
                    <>
                      {renderDetailsForm(
                        isShowPOSScreen ? "POS_Details" : "Existing_Details"
                      )}
                    </>
                  )}
                  {checkedList?.includes("Update New Details") && (
                    <>
                      {renderDetailsForm(
                        isShowPOSScreen ? "POS_Details" : "Update_New_Details"
                      )}
                      {showResonDelayField && (
                        <>
                          <DetailsForm
                            data={
                              ContractAlterationData[selectedSubType]
                                ?.ReasonSubmission
                            }
                          ></DetailsForm>
                        </>
                      )}
                    </>
                  )}
                  {checkedList?.includes("Share Process Communication") && (
                    <>
                      {renderDetailsForm("Share_Process_Details")}
                      {showEmailFields && (
                        <>
                          <ContactForm
                            showEmailAddress={showEmailAddress}
                            showPhoneNumber={showPhoneNumber}
                            showWhatsApp={showWhatsApp}
                          />
                        </>
                      )}
                    </>
                  )}
                  {isShowPOSScreen && <>{renderDetailsForm("POS_Details")}</>}
                  {(checkedList?.length > 0 || isShowPOSScreen) && (
                    <>
                      <div className="contact-details-btn">
                        <Button
                          type="primary"
                          className="primary-btn"
                          htmlType="submit"
                          disabled={
                            showRaiseRequirementBtn || vaildateSignature
                          }
                        >
                          {!isShowPOSScreen ? "Submit" : "Approve"}
                        </Button>
                        {(isShowPOSScreen ||
                          checkedList?.includes("Update New Details")) && (
                          <>
                            <Button
                              type="primary"
                              className="primary-btn"
                              onClick={() => getRaiseRequirements()}
                            >
                              Raise Requirement
                            </Button>
                            {isShowPOSScreen && (
                              <>
                                <InternalFlowPOS
                                  interlRequirementTagValue1={
                                    props.interlRequirementTagValue
                                  }
                                  selectedList={
                                    POSContactData.serviceRequestTransectionData
                                  }
                                  getInternal={getInternal}
                                  internalReqForm={internalReqForm}
                                />
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </>
                  )}
                </>
              )}
              {/*Change In Name SubType Code End */}

              {/*Change In Signature SubType Code Start */}
              {selectedSubType === "changeinsignature" && (
                <>
                  {renderDetailsForm(
                    isShowPOSScreen ? "POS_Details" : "BOE_Details"
                  )}
                  {!isShowPOSScreen && (
                    <>
                      {showNewSignatureFields && (
                        <>{renderDetailsForm("Update_New_Signature_Fields")}</>
                      )}
                      {showSiganatureProcess && (
                        <>
                          {renderDetailsForm("Signature_Process_Fields")}
                          {showEmailFields && (
                            <>
                              <ContactForm
                                showEmailAddress={showEmailAddress}
                                showPhoneNumber={showPhoneNumber}
                                showWhatsApp={showWhatsApp}
                              />
                            </>
                          )}
                        </>
                      )}
                      <DetailsForm
                        data={ContractAlterationData[selectedSubType]?.Comments}
                        callType={selectedCallType}
                        subType={selectedSubType}
                      ></DetailsForm>
                    </>
                  )}
                  {(showNewSignatureFields ||
                    showSiganatureProcess ||
                    isShowPOSScreen) && (
                    <>
                      <div className="contact-details-btn">
                        <Button
                          type="primary"
                          className="primary-btn"
                          htmlType="submit"
                          disabled={showRaiseRequirementBtn && !isShowPOSScreen}
                        >
                          {!isShowPOSScreen ? "Submit" : "Approve"}
                        </Button>
                        {isShowPOSScreen && (
                          <>
                            <Button
                              type="primary"
                              className="primary-btn"
                              onClick={() => getRaiseRequirements()}
                            >
                              Raise Requirement
                            </Button>
                            <>
                              <>
                                <InternalFlowPOS
                                  interlRequirementTagValue1={
                                    props.interlRequirementTagValue
                                  }
                                  selectedList={
                                    POSContactData.serviceRequestTransectionData
                                  }
                                  getInternal={getInternal}
                                  internalReqForm={internalReqForm}
                                />
                              </>
                            </>
                          </>
                        )}

                        {!isShowPOSScreen && !showSiganatureProcess && (
                          <Button
                            type="primary"
                            className="primary-btn"
                            onClick={() => getRaiseRequirements()}
                          >
                            Raise Requirement
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                </>
              )}
              {/*Change In Signature SubType Code End */}

              {/*PAN Update SubType Code Start */}
              {selectedSubType === "panupdate" && (
                <>
                  {!isShowPOSScreen && (
                    <>
                      <Row gutter={[16, 16]} className="reasons-list">
                        <Col
                          xs={24}
                          sm={24}
                          md={8}
                          lg={8}
                          xxl={8}
                          className="loan-checkboxes"
                        >
                          <Form.Item
                            label="View Existing PAN Details"
                            name="viewExistingloandetails"
                            className="checkbox-gap"
                          >
                            <Checkbox
                              value="View Existing PAN Details"
                              checked={checkedList.includes(
                                "View Existing PAN Details"
                              )}
                              onChange={() =>
                                handleChange("View Existing PAN Details")
                              }
                            ></Checkbox>
                          </Form.Item>
                        </Col>
                        <Col
                          xs={24}
                          sm={24}
                          md={8}
                          lg={8}
                          xxl={8}
                          className="loan-checkboxes"
                        >
                          <Form.Item
                            label="Update New PAN"
                            name="vieweligibleloan"
                          >
                            <Checkbox
                              value="Update New PAN Number"
                              checked={checkedList.includes(
                                "Update New PAN Number"
                              )}
                              onChange={() =>
                                handleChange("Update New PAN Number")
                              }
                            ></Checkbox>
                          </Form.Item>
                        </Col>
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
                            name="shareprocess"
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
                      {checkedList?.includes("View Existing PAN Details") && (
                        <>{renderDetailsForm("Existing_PAN_Details")}</>
                      )}
                      {checkedList?.includes("Update New PAN Number") && (
                        <>
                          {renderDetailsForm("Update_PAN_Details")}
                          {isShowRequestDetails && (
                            <>{renderDetailsForm("RequestForm_Fields")}</>
                          )}
                          {renderDetailsForm("Comments")}
                        </>
                      )}
                      {checkedList?.includes("Share Process Communication") && (
                        <>
                          {renderDetailsForm("Share_Process_Details")}
                          {showEmailFields && (
                            <>
                              <ContactForm
                                showEmailAddress={showEmailAddress}
                                showPhoneNumber={showPhoneNumber}
                                showWhatsApp={showWhatsApp}
                              />
                            </>
                          )}
                          <DetailsForm
                            data={
                              ContractAlterationData[selectedSubType]?.Comments
                            }
                            subType={selectedSubType}
                          ></DetailsForm>
                        </>
                      )}
                    </>
                  )}
                  {isShowPOSScreen && <>{renderDetailsForm("POS_Details")}</>}
                  <div className="contact-details-btn">
                    {(checkedList?.length > 0 || isShowPOSScreen) && (
                      <>
                        <Button
                          type="primary"
                          className="primary-btn"
                          htmlType="submit"
                          disabled={
                            (isDisablePANApproveBtn && isShowPOSScreen) ||
                            (showRaiseRequirementBtn && !isShowPOSScreen) ||
                            vaildateSignature
                          }
                        >
                          {!isShowPOSScreen ? "Submit" : "Approve"}
                        </Button>
                      </>
                    )}

                    {isShowPOSScreen && (
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
                    {isShowPOSScreen && (
                      <>
                        <InternalFlowPOS
                          interlRequirementTagValue1={
                            props.interlRequirementTagValue
                          }
                          selectedList={
                            POSContactData.serviceRequestTransectionData
                          }
                          getInternal={getInternal}
                          internalReqForm={internalReqForm}
                        />
                      </>
                    )}
                    {!isShowPOSScreen &&
                      checkedList?.length > 0 &&
                      selectedSubType === "panupdate" &&
                      checkedList[0] !== "View Existing PAN Details" &&
                      checkedList[0] !== "View Existing PAN Details" &&
                      checkedList[0] !== "Share Process Communication" && (
                        <Button
                          type="primary"
                          className="primary-btn"
                          onClick={() => getRaiseRequirements()}
                        >
                          Raise Requirements
                        </Button>
                      )}
                  </div>
                </>
              )}
              {/*PAN Update SubType Code End */}

              {/*GST In Update SubType Code Start */}
              {selectedSubType === "gstinupdate" && (
                <>
                  {!isShowPOSScreen && (
                    <>
                      <Row gutter={[16, 16]} className="reasons-list">
                        <Col
                          xs={24}
                          sm={24}
                          md={8}
                          lg={8}
                          xxl={8}
                          className="loan-checkboxes"
                        >
                          <Form.Item
                            label="View Existing GSTIN"
                            name="viewExistingloandetails"
                            className="checkbox-gap"
                          >
                            <Checkbox
                              value="View Existing GSTIN"
                              checked={checkedList.includes(
                                "View Existing GSTIN"
                              )}
                              onChange={() =>
                                handleChange("View Existing GSTIN")
                              }
                            ></Checkbox>
                          </Form.Item>
                        </Col>
                        <Col
                          xs={24}
                          sm={24}
                          md={8}
                          lg={8}
                          xxl={8}
                          className="loan-checkboxes"
                        >
                          <Form.Item
                            label="Update New GSTIN"
                            name="vieweligibleloan"
                          >
                            <Checkbox
                              value="Update New GSTIN"
                              checked={checkedList.includes("Update New GSTIN")}
                              onChange={() => handleChange("Update New GSTIN")}
                            ></Checkbox>
                          </Form.Item>
                        </Col>
                        <Col
                          xs={24}
                          sm={24}
                          md={8}
                          lg={8}
                          xxl={8}
                          className="loan-checkboxes"
                        ></Col>
                      </Row>
                      {checkedList?.includes("View Existing GSTIN") && (
                        <>{renderDetailsForm("Existing_GSTIN_Details")}</>
                      )}
                      {checkedList?.includes("Update New GSTIN") && (
                        <>{renderDetailsForm("Update_GSTIN_Details")}</>
                      )}
                      {checkedList?.includes("Share Process Communication") && (
                        <>
                          {renderDetailsForm("Share_GSTIN_Process")}
                          {showEmailFields && (
                            <>
                              <ContactForm
                                showEmailAddress={showEmailAddress}
                                showPhoneNumber={showPhoneNumber}
                                showWhatsApp={showWhatsApp}
                              />
                            </>
                          )}
                          <DetailsForm
                            data={
                              ContractAlterationData[selectedSubType]?.Comments
                            }
                            subType={selectedSubType}
                          ></DetailsForm>
                        </>
                      )}
                    </>
                  )}
                  {isShowPOSScreen && <>{renderDetailsForm("POS_Details")}</>}
                  <div className="contact-details-btn">
                    {(checkedList?.length > 0 || isShowPOSScreen) && (
                      <>
                        <Button
                          type="primary"
                          className="primary-btn"
                          htmlType="submit"
                          disabled={showRaiseRequirementBtn && !isShowPOSScreen}
                        >
                          {!isShowPOSScreen ? "Submit" : "Approve"}
                        </Button>
                      </>
                    )}

                    {isShowPOSScreen && (
                      <>
                        <Button
                          type="primary"
                          className="primary-btn"
                          onClick={() => getRaiseRequirements()}
                        >
                          Raise Requirement
                        </Button>
                        <>
                          <InternalFlowPOS
                            interlRequirementTagValue1={
                              props.interlRequirementTagValue
                            }
                            selectedList={
                              POSContactData.serviceRequestTransectionData
                            }
                            getInternal={getInternal}
                            internalReqForm={internalReqForm}
                          />
                        </>
                      </>
                    )}

                    {!isShowPOSScreen &&
                      checkedList?.length > 0 &&
                      selectedSubType === "gstinupdate" &&
                      checkedList[0] !== "View Existing GSTIN" && (
                        <Button
                          type="primary"
                          className="primary-btn"
                          onClick={() => getRaiseRequirements()}
                        >
                          Raise Requirements
                        </Button>
                      )}
                  </div>
                </>
              )}
              {/*GST In Update SubType Code End */}

              {/*Agent Code Correction SubType Code Start */}
              {selectedSubType === "agentcodecorrection" && (
                <>
                  {!isShowPOSScreen && (
                    <>
                      <CheckBoxList
                        checkedList={checkedList}
                        handleChange={handleChange}
                        options={[
                          {
                            label: "View Existing Agent Code Details",
                            value: "View Existing Agent Code Details",
                            name: "ViewExistingAgentCodeDetails",
                          },
                          {
                            label: "Update Agent Code Details",
                            value: "Update Agent Code Details",
                            name: "UpdateAgentCodeDetails",
                          },
                        ]}
                      />
                      {checkedList?.includes(
                        "View Existing Agent Code Details"
                      ) && renderDetailsForm("Existing_AgentCode_Details")}
                      {checkedList?.includes("Update Agent Code Details") &&
                        renderDetailsForm("Update_AgentCode_Details")}
                    </>
                  )}
                  {isShowPOSScreen && <>{renderDetailsForm("POS_Details")}</>}
                  <div className="contact-details-btn">
                    {(checkedList?.length > 0 || isShowPOSScreen) && (
                      <>
                        <Button
                          type="primary"
                          className="primary-btn"
                          htmlType="submit"
                          disabled={
                            (isShowPOSScreen && isDisableApproveBtn) ||
                            (disableSubmutBtn && !isShowPOSScreen)
                          }
                        >
                          {!isShowPOSScreen ? "Submit" : "Approve"}
                        </Button>
                      </>
                    )}

                    {isShowPOSScreen && (
                      <>
                        <Button
                          type="primary"
                          className="primary-btn"
                          onClick={() => getRaiseRequirements()}
                        >
                          Raise Requirement
                        </Button>
                        <>
                          <>
                            <InternalFlowPOS
                              interlRequirementTagValue1={
                                props.interlRequirementTagValue
                              }
                              selectedList={
                                POSContactData.serviceRequestTransectionData
                              }
                              getInternal={getInternal}
                              internalReqForm={internalReqForm}
                            />
                          </>
                        </>
                      </>
                    )}
                    {!isShowPOSScreen &&
                      checkedList?.length > 0 &&
                      selectedSubType === "agentcodecorrection" &&
                      checkedList[0] !== "View Existing Agent Code Details" && (
                        <Button
                          type="primary"
                          className="primary-btn"
                          onClick={() => getRaiseRequirements()}
                        >
                          Raise Requirements
                        </Button>
                      )}
                  </div>
                </>
              )}
              {/*Agent Code Correction SubType Code End */}

              {/* change in OwnerShip SubType Code Start */}
              {selectedSubType === "changeinownership" && (
                <>
                  {!isShowPOSScreen && (
                    <>
                      <Row gutter={[16, 16]} className="reasons-list">
                        <Col
                          xs={24}
                          sm={24}
                          md={8}
                          lg={8}
                          xxl={8}
                          className="loan-checkboxes"
                        >
                          <Form.Item
                            label="View Existing Owner Details"
                            name="ViewExistingOwnerDetails"
                            className="checkbox-gap"
                          >
                            <Checkbox
                              value="View Existing Owner Details"
                              checked={checkedList.includes(
                                "View Existing Owner Details"
                              )}
                              onChange={() =>
                                handleChange("View Existing Owner Details")
                              }
                            ></Checkbox>
                          </Form.Item>
                        </Col>
                        {details?.policyDetailsObj?.identifiers?.la_Name !==
                          details?.policyDetailsObj?.identifiers?.po_Name && (
                          <>
                            <Col
                              xs={24}
                              sm={24}
                              md={8}
                              lg={8}
                              xxl={8}
                              className="loan-checkboxes"
                            >
                              <Form.Item
                                label="Update New Owner Details"
                                name="UpdateNewOwnerDetails"
                              >
                                <Checkbox
                                  value="Update New Owner Details"
                                  checked={checkedList.includes(
                                    "Update New Owner Details"
                                  )}
                                  onChange={() =>
                                    handleChange("Update New Owner Details")
                                  }
                                ></Checkbox>
                              </Form.Item>
                            </Col>
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
                          </>
                        )}
                      </Row>
                    </>
                  )}
                  {checkedList?.includes("View Existing Owner Details") && (
                    <>{renderDetailsForm("Existing_Owner_Details")}</>
                  )}
                  {checkedList?.includes("Update New Owner Details") && (
                    <>
                      {/* //Added by sayali on 11/08/2025 for Added nominee details in update new owner details */}
                      <div className="mb-16">
                        {!isShowPOSScreen && (
                          <>
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
                          </>
                        )}

                        <div className="table-container email-table">
                          <table className="responsive-table">
                            <thead>
                              <tr>
                                <th> Search By Client ID</th>
                                <th> Nominee Salutation</th>
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
                                          name={[
                                            "updateNomineeData",
                                            row.id,
                                            "ClientID_New",
                                          ]}
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
                                                  style={{
                                                    fontSize: "22px",
                                                    color: "#b31b24",
                                                  }}
                                                  onClick={() => {
                                                    setTableIndex(index);
                                                    handleNomineeSearch(
                                                      index,
                                                      row.id
                                                    );
                                                  }}
                                                />
                                              </Tooltip>
                                            }
                                          />
                                        </Form.Item>
                                      </td>
                                      <td>
                                        <Form.Item
                                          name={[
                                            "updateNomineeData",
                                            row.id,
                                            "NomineeSalutation_New",
                                          ]}
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
                                            //value={row.NomineeFirstName_New}
                                            maxLength={100}
                                            // onChange={(e) =>
                                            //   handleNomineeFirstNameChange(
                                            //     index,
                                            //     e.target.value
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
                                            //value={row.NomineeLastName_New}
                                            maxLength={100}
                                            // onChange={(e) =>
                                            //   handleNomineeLastNameChange(
                                            //     index,
                                            //     e.target.value
                                            //   )
                                            // }
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
                                            // value={row.NomineeDOB_New}
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
                                          initialValue="nominee"
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
                                            // value={
                                            //   row.RealtionshipWithPolicyowner_New
                                            // }
                                            // onChange={(value) =>
                                            //   handleRelationshipChange(
                                            //     index,
                                            //     value,
                                            //     row
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
                                            //value={row.Share_New}
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
                      </div>
                      {/* end */}
                      {renderDetailsForm("Update_NEW_Owner_Details")}
                      {showResonDelayField && (
                        <>{renderDetailsForm("ReasonSubmission")}</>
                      )}
                      {renderDetailsForm("Comments")}
                    </>
                  )}
                  {checkedList?.includes("Share Process Communication") && (
                    <>
                      {renderDetailsForm("Share_Process_Communication")}
                      {showEmailFields && (
                        <>
                          <ContactForm
                            showEmailAddress={showEmailAddress}
                            showPhoneNumber={showPhoneNumber}
                            showWhatsApp={showWhatsApp}
                          />
                        </>
                      )}
                    </>
                  )}
                  {isShowPOSScreen && (
                    <>
                      {/* //Added by sayali on 12/07/2025 for Added nominee details in update new owner details POS screen */}
                      {renderDetailsForm("POS_UpdateNomineeTitle")}
                      <div className="mb-16">
                        <div className="table-container email-table">
                          <table className="responsive-table">
                            <thead>
                              <tr>
                                {/* <th></th> */}
                                <th> Search By Client ID</th>
                                <th> Nominee Salutation</th>
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
                                          name={[
                                            "posUpdateNomineeData",
                                            index,
                                            "ClientID",
                                          ]}
                                          className="inputs-label mb-0"
                                          initialValue={row?.ClientID}
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
                                          />
                                        </Form.Item>
                                      </td>
                                      <td>
                                        <Form.Item
                                          name={[
                                            "posUpdateNomineeData",
                                            index,
                                            "NomineeSalutation",
                                          ]}
                                          className="inputs-label mb-0"
                                          initialValue={row?.NomineeSalutation}
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
                                            disabled={!isEditNominee}
                                            options={salutationLU}
                                            value={row?.NomineeSalutation}
                                            onChange={(value) =>
                                              handlePOSNomineeSalutationChange(
                                                index,
                                                value
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
                    </>
                  )}
                  {(checkedList?.length > 0 || isShowPOSScreen) && (
                    <>
                      <div className="contact-details-btn">
                        <Button
                          type="primary"
                          className="primary-btn"
                          htmlType="submit"
                          disabled={
                            (showRaiseRequirementBtn || vaildateSignature) &&
                            !isShowPOSScreen
                          }
                        >
                          {!isShowPOSScreen ? "Submit" : "Approve"}
                        </Button>

                        {(isShowPOSScreen ||
                          checkedList.includes("Update New Owner Details")) && (
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
                        {isShowPOSScreen && (
                          <>
                            <InternalFlowPOS
                              interlRequirementTagValue1={
                                props.interlRequirementTagValue
                              }
                              selectedList={
                                POSContactData.serviceRequestTransectionData
                              }
                              getInternal={getInternal}
                              internalReqForm={internalReqForm}
                            />
                          </>
                        )}
                      </div>
                    </>
                  )}
                </>
              )}
              {/* change in OwnerShip SubType Code End */}

              {/* change in Terms SubType Code Start */}
              {selectedSubType === "changeinterm" && (
                <>
                  {!isShowPOSScreen && (
                    <>
                      {renderDetailsForm("Update_Term_Details")}
                      {renderDetailsForm("Upload_Fields")}
                    </>
                  )}
                  {isShowPOSScreen && <>{renderDetailsForm("POS_Details")}</>}
                  <div className="contact-details-btn">
                    {hideSubmitBtn && (
                      <Button
                        type="primary"
                        className="primary-btn"
                        htmlType="submit"
                        disabled={showRaiseRequirementBtn && !isShowPOSScreen}
                      >
                        {!isShowPOSScreen ? "Submit" : "Approve"}
                      </Button>
                    )}
                    {isShowPOSScreen ? (
                      <>
                        <Button
                          type="primary"
                          className="primary-btn"
                          onClick={() => getRaiseRequirements()}
                        >
                          Raise Requirement
                        </Button>
                        <>
                          <>
                            <InternalFlowPOS
                              interlRequirementTagValue1={
                                props.interlRequirementTagValue
                              }
                              selectedList={
                                POSContactData.serviceRequestTransectionData
                              }
                              getInternal={getInternal}
                              internalReqForm={internalReqForm}
                            />
                          </>
                        </>
                      </>
                    ) : (
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
                </>
              )}
              {/* change in Terms SubType Code End */}

              {/* change in Plan SubType Code Start */}
              {selectedSubType === "changeinplan" && (
                <>
                  {!isShowPOSScreen && (
                    <>
                      {renderDetailsForm("Update_Plan_Details")}
                      {renderDetailsForm("Upload_Fields")}
                    </>
                  )}
                  {isShowPOSScreen && <>{renderDetailsForm("POS_Details")}</>}
                  <div className="contact-details-btn">
                    {hideSubmitBtn && (
                      <Button
                        type="primary"
                        className="primary-btn"
                        htmlType="submit"
                        disabled={showRaiseRequirementBtn && !isShowPOSScreen}
                      >
                        {!isShowPOSScreen ? "Submit" : "Approve"}
                      </Button>
                    )}
                    {isShowPOSScreen ? (
                      <>
                        <Button
                          type="primary"
                          className="primary-btn"
                          onClick={() => getRaiseRequirements()}
                        >
                          Raise Requirement
                        </Button>
                        <>
                          <>
                            <InternalFlowPOS
                              interlRequirementTagValue1={
                                props.interlRequirementTagValue
                              }
                              selectedList={
                                POSContactData.serviceRequestTransectionData
                              }
                              getInternal={getInternal}
                              internalReqForm={internalReqForm}
                            />
                          </>
                        </>
                      </>
                    ) : (
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
                </>
              )}
              {/* change in Plan SubType Code End */}

              {/* change in Premium SubType Code Start */}
              {selectedSubType === "changeinpremium" && (
                <>
                  {!isShowPOSScreen && (
                    <>
                      {renderDetailsForm("Update_Premium_Details")}
                      {renderDetailsForm("Upload_Fields")}
                    </>
                  )}
                  {isShowPOSScreen && <>{renderDetailsForm("POS_Details")}</>}
                  <div className="contact-details-btn">
                    {hideSubmitBtn && (
                      <Button
                        type="primary"
                        className="primary-btn"
                        htmlType="submit"
                        disabled={showRaiseRequirementBtn && !isShowPOSScreen}
                      >
                        {!isShowPOSScreen ? "Submit" : "Approve"}
                      </Button>
                    )}
                    {isShowPOSScreen ? (
                      <>
                        <Button
                          type="primary"
                          className="primary-btn"
                          onClick={() => getRaiseRequirements()}
                        >
                          Raise Requirement
                        </Button>
                        <>
                          <>
                            <InternalFlowPOS
                              interlRequirementTagValue1={
                                props.interlRequirementTagValue
                              }
                              selectedList={
                                POSContactData.serviceRequestTransectionData
                              }
                              getInternal={getInternal}
                              internalReqForm={internalReqForm}
                            />
                          </>
                        </>
                      </>
                    ) : (
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
                </>
              )}
              {/* change in Plan SubType Code End */}

              {/* change in Sum assured SubType Code Start */}
              {selectedSubType === "changeinsumassured" && (
                <>
                  {!isShowPOSScreen && (
                    <>
                      {renderDetailsForm("Update_SumAssured_Details")}
                      {renderDetailsForm("Upload_Fields")}
                    </>
                  )}
                  {isShowPOSScreen && <>{renderDetailsForm("POS_Details")}</>}
                  <div className="contact-details-btn">
                    {hideSubmitBtn && (
                      <Button
                        type="primary"
                        className="primary-btn"
                        htmlType="submit"
                        disabled={showRaiseRequirementBtn && !isShowPOSScreen}
                      >
                        {!isShowPOSScreen ? "Submit" : "Approve"}
                      </Button>
                    )}

                    {isShowPOSScreen ? (
                      <>
                        <Button
                          type="primary"
                          className="primary-btn"
                          onClick={() => getRaiseRequirements()}
                        >
                          Raise Requirement
                        </Button>
                        <>
                          <>
                            <InternalFlowPOS
                              interlRequirementTagValue1={
                                props.interlRequirementTagValue
                              }
                              selectedList={
                                POSContactData.serviceRequestTransectionData
                              }
                              getInternal={getInternal}
                              internalReqForm={internalReqForm}
                            />
                          </>
                        </>
                      </>
                    ) : (
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
                </>
              )}
              {/* change in Sum Assured SubType Code End */}

              {/* change in DOB SubType Code Start */}
              {selectedSubType === "changeindob" && (
                <>
                  {!isShowPOSScreen && (
                    <>
                      <Row gutter={[16, 16]} className="reasons-list">
                        <Col
                          xs={24}
                          sm={24}
                          md={8}
                          lg={8}
                          xxl={8}
                          className="loan-checkboxes"
                        >
                          <Form.Item
                            label="View Existing DOB Details"
                            name="ViewExistingDOBDetails"
                            className="checkbox-gap"
                          >
                            <Checkbox
                              value="View Existing DOB Details"
                              checked={checkedList.includes(
                                "View Existing DOB Details"
                              )}
                              onChange={() =>
                                handleChange("View Existing DOB Details")
                              }
                            ></Checkbox>
                          </Form.Item>
                        </Col>
                        <Col
                          xs={24}
                          sm={24}
                          md={8}
                          lg={8}
                          xxl={8}
                          className="loan-checkboxes"
                        >
                          <Form.Item
                            label="Update New DOB Details"
                            name="UpdateNewDOBDetails"
                          >
                            <Checkbox
                              value="Update New DOB Details"
                              checked={checkedList.includes(
                                "Update New DOB Details"
                              )}
                              onChange={() =>
                                handleChange("Update New DOB Details")
                              }
                            ></Checkbox>
                          </Form.Item>
                        </Col>
                      </Row>
                      {checkedList?.includes("View Existing DOB Details") && (
                        <>{renderDetailsForm("Existing_DOB_Details")}</>
                      )}
                      {checkedList?.includes("Update New DOB Details") && (
                        <>
                          {renderDetailsForm("Update_DOB_Details")}
                          {isShowDOBRequestForms && (
                            <>
                              {renderDetailsForm("RequestForm_Fields")}
                              {showResonDelayField && (
                                <>{renderDetailsForm("ReasonSubmission")}</>
                              )}
                            </>
                          )}
                          {renderDetailsForm("Comments")}
                        </>
                      )}
                      {checkedList?.includes("Share Process Details") && (
                        <>
                          {renderDetailsForm("Share_Process_Document")}
                          {showEmailFields && (
                            <>
                              <ContactForm
                                showEmailAddress={showEmailAddress}
                                showPhoneNumber={showPhoneNumber}
                                showWhatsApp={showWhatsApp}
                              />
                            </>
                          )}
                          <DetailsForm
                            data={
                              ContractAlterationData[selectedSubType]?.Comments
                            }
                            subType={selectedSubType}
                          ></DetailsForm>
                        </>
                      )}
                    </>
                  )}
                  {isShowPOSScreen && <>{renderDetailsForm("POS_Details")}</>}
                  <div className="contact-details-btn">
                    {(checkedList?.length > 0 || isShowPOSScreen) && (
                      <>
                        <Button
                          disabled={
                            (DisableSubmitBtn ||
                              DisableApproveBtn ||
                              vaildateSignature) &&
                            !isEnableSubmitButton
                          }
                          type="primary"
                          className="primary-btn"
                          htmlType="submit"
                        >
                          {!isShowPOSScreen ? "Submit" : "Approve"}
                        </Button>
                      </>
                    )}

                    {isShowPOSScreen && (
                      <>
                        <Button
                          type="primary"
                          className="primary-btn"
                          onClick={() => getRaiseRequirements()}
                        >
                          Raise Requirement
                        </Button>
                        <>
                          <InternalFlowPOS
                            interlRequirementTagValue1={
                              props.interlRequirementTagValue
                            }
                            selectedList={
                              POSContactData.serviceRequestTransectionData
                            }
                            getInternal={getInternal}
                            internalReqForm={internalReqForm}
                          />
                        </>
                      </>
                    )}
                    {!isShowPOSScreen &&
                      checkedList?.length > 0 &&
                      selectedSubType === "changeindob" &&
                      checkedList[0] !== "View Existing DOB Details" && (
                        <Button
                          type="primary"
                          className="primary-btn"
                          onClick={() => getRaiseRequirements()}
                        >
                          Raise Requirements
                        </Button>
                      )}
                  </div>
                </>
              )}
              {/* change in DOB SubType Code End */}

              {/* change in Addition/Deletion Of Rider SubType Code Start */}
              {(selectedSubType === "additionofrider" ||
                selectedSubType === "deletionofrider") && (
                <>
                  {renderDetailsForm(
                    isShowPOSScreen ? "POS_Details" : "BOE_Details"
                  )}

                  <div className="contact-details-btn">
                    <Button
                      type="primary"
                      className="primary-btn"
                      htmlType="submit"
                      disabled={DisableSubmitBtn || DisableApproveBtn}
                    >
                      {!isShowPOSScreen ? "Submit" : "Approve"}
                    </Button>
                    <Button
                      type="primary"
                      className="primary-btn"
                      onClick={() => getRaiseRequirements()}
                      disabled={isShowPOSScreen && !DisableApproveBtn}
                    >
                      Raise Requirement
                    </Button>
                    {isShowPOSScreen && (
                      <>
                        <>
                          <InternalFlowPOS
                            interlRequirementTagValue1={
                              props.interlRequirementTagValue
                            }
                            selectedList={
                              POSContactData.serviceRequestTransectionData
                            }
                            getInternal={getInternal}
                            internalReqForm={internalReqForm}
                          />
                        </>
                      </>
                    )}

                    {!isShowPOSScreen &&
                      checkedList?.length > 0 &&
                      selectedSubType === "agentcodecorrection" &&
                      checkedList[0] !== "View Existing Agent Code Details" && (
                        <Button
                          type="primary"
                          className="primary-btn"
                          onClick={() => getRaiseRequirements()}
                        >
                          Raise Requirements
                        </Button>
                      )}
                  </div>
                </>
              )}
              {/* change Addition/Deletion Of Rider SubType Code End */}

              {/*Policy continuation SubType Code Start */}
              {selectedSubType === "policycontinuation" && (
                <>
                  {!isShowPOSScreen && <>{renderDetailsForm("BOE_Details")}</>}
                  {isShowPOSScreen && <>{renderDetailsForm("POS_Details")}</>}
                  <div className="contact-details-btn">
                    {hideSubmitBtn && (
                      <Button
                        type="primary"
                        className="primary-btn"
                        htmlType="submit"
                        disabled={disableSubmutBtn}
                      >
                        {!isShowPOSScreen ? "Submit" : "Approve"}
                      </Button>
                    )}
                    <Button
                      type="primary"
                      className="primary-btn"
                      onClick={() => getRaiseRequirements()}
                    >
                      Raise Requirement
                    </Button>
                    {isShowPOSScreen && (
                      <>
                        <InternalFlowPOS
                          interlRequirementTagValue1={
                            props.interlRequirementTagValue
                          }
                          selectedList={
                            POSContactData.serviceRequestTransectionData
                          }
                          getInternal={getInternal}
                          internalReqForm={internalReqForm}
                        />
                      </>
                    )}
                  </div>
                </>
              )}
            </>
          )}

          {/*Policy continuation SubType Code End */}
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
        title="List of Acceptable Proofs"
        open={addressProofModal && selectedSubType === "changeinsignature"}
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
              <td>
                Require Change in Signature Form duly attested by Bank official
              </td>
              <td>
                <Upload
                  {...uploadProps}
                  fileList={passportUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Require Change in Signature Form duly attested by Bank official"
                    )
                  }
                  action={
                    "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                  }
                >
                  {suffix}
                </Upload>
                {passportUploadFiles.name}
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

      {isShowOTPModal && (
        <>
          <OTPModal
            form={form}
            customerData={customerData}
            isShowOTPModal={isShowOTPModal}
            setIsShowOTPModal={setIsShowOTPModal}
            selectedCallType={props?.selectedCallType}
            selectedSubTypeId={props?.selectedSubTypeId}
            sendOTPNumber={ClientEnquiry?.rmblphone}
            setDisableRequestForm={setDisableRequestForm}
            setValidateOTPSuccess={setValidateOTPSuccess}
            clientEnquiryData={ClientEnquiry}
          />
        </>
      )}

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
              <th>Program</th>
              <th>Type</th>
            </tr>
            {negativeList?.map((item, index) => (
              <tr key={index}>
                <td>{item?.name}</td>
                <td>{item?.program}</td>

                <td>{item?.type}</td>
              </tr>
            ))}
            {negativeList?.length === 0 && (
              <tr>
                <td colspan="4">
                  <div className="text-center">
                    <span>No data available</span>
                  </div>
                </td>
              </tr>
            )}
          </table>
        </div>
      </Modal>

      <Modal
        title={
          <span style={{ color: "#b21f1f", fontWeight: "bold" }}>
            Other Policies with Same Owner
          </span>
        }
        open={showOwnerPoliciesModal}
        destroyOnClose={true}
        width={1200}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setShowOwnerPoliciesModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={[
          <Button
            key="ok"
            type="primary"
            onClick={() => setShowOwnerPoliciesModal(false)}
            className="primary-btn"
          >
            OK
          </Button>,
        ]}
      >
        <div style={{ marginBottom: "20px" }}>
          <p style={{ color: "#b21f1f", fontWeight: "500" }}>
            <strong>
              {customerData?.poClientID ||
                details?.policyDetailsObj?.identifiers?.poClientID}
            </strong>{" "}
            is owner in <strong>{otherOwnerPolicies.length}</strong> other{" "}
            {otherOwnerPolicies.length === 1 ? "policy" : "policies"} mentioned
            below. Kindly raise SR for change in ownership in all policies with
            consent from customer.
          </p>
        </div>

        <div className="table-container" style={{ marginTop: "0px" }}>
          <table className="responsive-table">
            <thead>
              <tr>
                <th>Policy No</th>
                <th>Application No</th>
                <th>Policy Owner</th>
                <th>Life Assured</th>
                <th>Policy Status</th>
                <th>Mobile No</th>
                <th>Email ID</th>
              </tr>
            </thead>
            <tbody>
              {otherOwnerPolicies?.map((policy, index) => (
                <tr key={index}>
                  <td>{policy.policyNo}</td>
                  <td>{policy.applicationNo}</td>
                  <td>{policy.poName}</td>
                  <td>{policy.laName}</td>
                  <td>{policy.policyStatus}</td>
                  <td>{policy.mobileNo?.trim()}</td>
                  <td>{policy.emailID?.trim()}</td>
                </tr>
              ))}
            </tbody>
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
            </tr>
            {BankduDupeData?.map((item, index) => (
              <tr key={index}>
                <td>{item?.LA_PolicyNo || item?.lA_PolicyNo}</td>
                <td>{item?.Acc_Number || item?.acc_Number}</td>
                <td>{item?.Acc_HldrName || item?.acc_HldrName}</td>
              </tr>
            ))}
            {BankduDupeData?.length === 0 && (
              <tr>
                <td colspan="3">
                  <div className="text-center">
                    <span>No data available</span>
                  </div>
                </td>
              </tr>
            )}
          </table>
        </div>
      </Modal>

      <Modal
        title={
          <span style={{ color: "#b21f1f", fontWeight: "bold" }}>
            OFAC List Check Details
          </span>
        }
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
              <th>Program</th>
              <th>Type</th>
            </tr>
            {NameDeDupeData?.map((item, index) => (
              <tr key={index}>
                <td>{item?.name}</td>
                <td>{item?.program}</td>

                <td>{item?.type}</td>
              </tr>
            ))}
            {NameDeDupeData?.length === 0 && (
              <tr>
                <td colspan="4">
                  <div className="text-center">
                    <span>No data available</span>
                  </div>
                </td>
              </tr>
            )}
          </table>
        </div>
      </Modal>
      <Modal
        title="List of Acceptable Address Proofs"
        open={
          addressProofModal && ["changeinownership"]?.includes(selectedSubType)
        }
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
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Aadhar Card"
                    )
                  }
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
                  fileList={passportUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,.pdf"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Passport"
                    )
                  }
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
                  fileList={rationCardUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.pdf,.PDF"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Ration Card"
                    )
                  }
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
                  fileList={DrivingUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,pdf"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Driving License"
                    )
                  }
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
              <td>Utility Bill which is not more than 2 months</td>
              <td>
                <Upload
                  {...uploadProps}
                  fileList={utilityUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,pdf"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Utility Bill which is not more than 2 months"
                    )
                  }
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
              <td>Copy of Voter ID</td>
              <td>
                <Upload
                  {...uploadProps}
                  fileList={voterUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,pdf"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Voter ID"
                    )
                  }
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
              <td>
                Bank statement/Passbook copy with latest 2 months transactions
              </td>
              <td>
                <Upload
                  {...uploadProps}
                  fileList={passbookUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,pdf"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Bank statement/Passbook copy with latest 2 months transactions"
                    )
                  }
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
              onClick={() => handleOk()}
            >
              Ok
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        title="List of Acceptable ID Proofs"
        open={
          idProofModal &&
          ["changeinname", "changeindob", "changeinownership"]?.includes(
            selectedSubType
          )
        }
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
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Aadhar Card",
                      "idProofUpload"
                    )
                  }
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
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Passport",
                      "idProofUpload"
                    )
                  }
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
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Ration Card",
                      "idProofUpload"
                    )
                  }
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
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Driving License",
                      "idProofUpload"
                    )
                  }
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
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Voter ID",
                      "idProofUpload"
                    )
                  }
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
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of PAN Card",
                      "idProofUpload"
                    )
                  }
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

      <RaiseRequirementPopup
        raiseRequerimentList={raiseRequerimentList}
        raiseRequirementOpen={raiseRequirementOpen}
        requirementModalLoader={requirementModalLoader}
        handleRequirementSubmit={handleRequirementSubmit}
        popupClose={popupClose}
        isShowPOSScreen={isShowPOSScreen}
        requirementsForm={requirementsForm}
        disableSubmutBtn={disableSubmutBtn}
      />
      <ClientListModal
        visible={isShowClientListModal}
        clientForm={form}
        setIsShowClientListModal={setIsShowClientListModal}
        userID={loginInfo?.userProfileInfo?.profileObj?.userName}
        setClientLoading={setIsLoading}
        customerData={customerData}
        inputFields={
          ContractAlterationData[selectedSubType]?.Update_NEW_Owner_Details
        }
        setUpdateFields={setUpdateFields}
        selectedSubType={selectedSubType}
        empID={loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID}
        updateNomineeData={updateNomineeData}
        setUpdateNomineeData={setUpdateNomineeData}
        tableIndex={tableIndex}
        isContractAlteration={true}
        formFieldPrefix="updateNomineeData"
        isTableSearch={searchType === "nominee"}
      />
    </>
  );
};

export default ContractAlteration;
