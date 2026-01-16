import React, { useState, useEffect } from "react";
import PopupAlert from "../popupAlert";
import InsurerRolesComponent from "../../utils/InsurerRoles";
import { connect, useSelector } from "react-redux";
import { Data } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import UploadIcon from "../../assets/images/upload.png";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  Button,
  Form,
  Modal,
  Tooltip,
  Spin,
  message,
  Checkbox,
  Upload,
} from "antd";
import moment from "moment";
import CloseIcon from "../../assets/images/close-icon.png";
import apiCalls from "../../api/apiCalls";
import OTPModal from "../../utils/OTPModal";
import InternalFlow from "../InternalFlow/InternalFlow";
import InternalFlowPOS from "../InternalFlow/InternalFlowPOS";
import TextArea from "antd/es/input/TextArea";
import { maskMobileNumber } from "../../utils/HelperUtilites";

const ContactDetails = React.memo((props) => {
  console.log("ContactDetails Props", props);
  const loginInfo = useSelector((state) => state);
  console.log("Login Info", loginInfo);
  const [form] = Form.useForm();
  const [requirementsForm] = Form.useForm();
  const [internalReqForm] = Form.useForm();
  dayjs.extend(customParseFormat);
  const {
    selectedCallType,
    selectedSubType,
    requestModeLU,
    clientRoleLU,
    policyDetails,
    customerData,
    POSContactData,
    isEmailManagement,
    selectedSubTypeId
  } = props;

  console.log("props selectedCallType", props?.selectedCallType);
  console.log("props selectedSubTypeId", props?.selectedSubTypeId);

  const suffix = <img src={UploadIcon} alt="" />;
  const [isShowPOSScreen, setIsShowPOSScreen] = useState(false); //pos screen showing purpose
  const [showRequestFormFields, setShowRequestFormFields] = useState(false);
  const [data, setData] = useState({});
  const [duDupeData, setDeDupeData] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [deDupeModalOpen, setDeDupeModalOpen] = useState(false);
  const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
  const [requestForSelection, setRequestForSelection] = useState(false);
  const [showResonDelayField, setShowReasonDelayField] = useState(false);
  const [selectCheckBox, setSelectCheckBox] = useState(false);
  const [addressProofModal, setAddressProofModal] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [alertTitle, setAlertTitle] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [alertData, setAlertData] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [showRaiseRequirementBtn, setShowRaiseRequirementBtn] = useState(false);
  const [clientEnquiryData, setClientEnquiryData] = useState("");
  const [disableOTP, setDisableOTP] = useState(true);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [showUploadFile, setShowUploadFile] = useState(null);
  const [isUploadMultipleFiles, setIsMultipleFiles] = useState([]);
  const [aadharUploadFiles, setAAdharUploadFiles] = useState([]);
  const [passportUploadFiles, setPassportUploadFiles] = useState([]);
  const [rationCardUploadFiles, setRationCardUploadFiles] = useState([]);
  const [DrivingUploadFiles, setDrivingUploadFiles] = useState([]);
  const [uploadMultipleFiles, setUploadMultipleFiles] = useState([]);
  const [updateFields, setUpdateFields] = useState(false);
  const [isOldLandMark, setIsOldLandMark] = useState("");
  const [disableRequestForm, setDisableRequestForm] = useState(false);
  const [isShowOTPModal, setIsShowOTPModal] = useState(false);
  const [validateOTPSuccess, setValidateOTPSuccess] = useState(false);
  const [vaildateSignature, setVaildateSignature] = useState(false);
  const [RaiseRequirement, setRaiseRequirement] = useState(false);
  const [IsPosEdited, setIsPosEdited] = useState(false);
  const [isExistingMobileNumber, setIsExistingMobileNumber] = useState(null);
  const [requestFormBtnEnable, setRequestFormBtnEnable] = useState(false);
  const [isDisableNewMobileNo, setIsDisableNewMobileNo] = useState(false);
  const [utilityUploadFiles, setUtilityUploadFiles] = useState([]);
  const [voterUploadFiles, setVoterUploadFiles] = useState([]);
  const [passbookUploadFiles, setPassbookUploadFiles] = useState([]);
  const [InternaRequirements, setInternalFlowRequirements] = useState("");
  // const [isDisableAfterOTPValid,setIsDisableAfterOTPValid] = useState(false);
  const [dedupeLoader, setDedupeLoader] = useState(false);
  const [docIdProofs, setDocIdProofs] = useState([]);
  const [emsrequestchannel, setEmsrequestchannel] = useState();
  console.log("isEmailManagement", isEmailManagement);

  const setInternalReqData = () => {
    POSContactData.serviceRequestTransectionData?.forEach((element) => {
      if (element.tagName === "InternalRequirementValue") {
        setInternalFlowRequirements(props.interlRequirementTagValue);
      }
    });
  };
  const requestForLU = [
    { label: "Address Change", value: 1 },
    { label: "Land Mark Addition", value: 2 },
  ];
  const boeScreenObj = {};

  const posScreenObj = {
    custRole: "",
    srvReqID: POSContactData?.srvReqID,
    Mobile_Old: "",
    Mobile_New: "",
    srvReqRefNo: "",
    Email_Old: "",
    Email_New: "",
    AlternateNo_Old: "",
    AlternateNo_New: "",
    WorkNo_Old: "",
    WorkNo_New: "",
    Comments: "",
    ReasonForDelay: "",
    Old_Address: "",
    New_Line1: "",
    New_Line2: "",
    New_LandMark: "",
    New_Pincode: "",
    New_City: "",
    New_State: "",
    Request_for: "",
    ValidateSignature: "",
    RequestorComments: "",
  };

  const resetFieldStates = () => {
  if (Data[selectedSubType]?.POS_Details) {
    Data[selectedSubType].POS_Details.forEach((element) => {
      if (element?.posEdit) {
        element.disabled = true; // Reset to disabled state
      }
    });
  }
  setIsPosEdited(false);
};

  useEffect(() => {

    resetFieldStates();
    if (props?.EmailResponse?.IsEmailmanagent && Data[selectedSubType]) {
      // Hide customer choice and disable request channel
      Data[selectedSubType]?.BOE_Details?.forEach((element) => {
        if (element?.name === "customerchoice") {
          element.hide = true;
        }
        if (element?.name === "requestchannel") {
          form.setFieldsValue({ requestchannel: 4 });
          element.hide = true;
          setEmsrequestchannel(4);
        }
      });

      // Disable "Request Mode" in Change_Fields
      Data[selectedSubType]?.Change_Fields?.forEach((element) => {
        if (element?.label === "Request Mode") {
          form.setFieldsValue({ requestchannel: 4 });
          element.hide = true;
          setEmsrequestchannel(4);
        }
      });

      // Ensure Comments array exists
      if (!Array.isArray(Data[selectedSubType]?.Comments)) {
        Data[selectedSubType].Comments = [];
      }

      // Remove existing instances of "Additional Note For Customer" before adding a new one
      Data[selectedSubType].Comments = Data[selectedSubType].Comments.filter(
        (comment) => comment.name !== "AdditionalNoteForCustomer"
      );

      // Add "Additional Note For Customer" once
      Data[selectedSubType].Comments.push({
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

      // Hide specific checklist items
      Data[selectedSubType]?.Checklist?.forEach((element) => {
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

      // Disable "Request Mode" in POS_Details
      Data[selectedSubType]?.POS_Details?.forEach((element) => {
        if (element?.label === "Request Mode") {
          form.setFieldsValue({ requestchannel: 4 });
          element.hide = true;
          setEmsrequestchannel(4);
        }
      });
    }

    setValidateOTPSuccess(false);
    if (selectedSubType === "existingcontactdetails") {
      getClientEnquiry();
    }
    if (customerData?.isBOE) {
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        boeScreenObj[element.tagName] = element.tagValue;
      });
      setIsShowPOSScreen(false);
      setInternalReqData();
      setRequestForSelection(
        parseInt(boeScreenObj?.Request_for) === 1
          ? "addresschange"
          : "landmarkaddition"
      );
      if (selectedSubType === "addresschange") {
        form.setFieldsValue({
          custRole: parseInt(boeScreenObj?.custRole),
          requestchannel: POSContactData?.reqMode,
          Request_for: parseInt(boeScreenObj?.Request_for),
          existingdetails: boeScreenObj?.existingdetails,
          lin1: boeScreenObj?.lin1,
          Old_Address: boeScreenObj?.Old_Address,
          instantAadhar: boeScreenObj?.instantAadhar,
          New_Line1: boeScreenObj?.New_Line1,
          New_Line2: boeScreenObj?.New_Line2,
          New_LandMark: boeScreenObj?.New_LandMark,
          New_Pincode: boeScreenObj?.New_Pincode,
          New_City: boeScreenObj?.New_City,
          New_State: boeScreenObj?.New_State,
          ValidateSignature: boeScreenObj?.ValidateSignature,
          //customersigningdate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
          //customersigningdate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
          resonfordelay: boeScreenObj?.ReasonForDelay,
          BOEComments: boeScreenObj?.RequestorComments,
          POSComments: boeScreenObj?.POSComments1,
        });
        Data[selectedSubType]?.Checklist?.forEach((element) => {
          if (element?.label === "Requestor  Comments") {
            element.hide = true;
          }
        });
      } else if (selectedSubType === "mobilenumberupdate") {
        form.setFieldsValue({
          custRole: parseInt(boeScreenObj?.custRole),
          Mobile_New: boeScreenObj?.Mobile_New,
          Mobile_Old:
            loginInfo?.userProfileInfo?.profileObj?.role === 37
              ? maskMobileNumber(boeScreenObj?.Mobile_Old)
              : boeScreenObj?.Mobile_Old,

          POSComments1: boeScreenObj?.POSComments1,
          RequestorComments: boeScreenObj?.RequestorComments,
          resonfordelay: boeScreenObj?.ReasonForDelay,
          validateSignature: boeScreenObj?.validateSignature,
          validatedBy: boeScreenObj?.validatedBy,
          RequestBy: boeScreenObj?.ValidatedBy,
        });
      } else if (selectedSubType === "alternatenumberupdate") {
        form.setFieldsValue({
          custRole: parseInt(boeScreenObj?.custRole),
          AlternateNo_New: boeScreenObj?.AlternateNo_New,
          AlternateNo_Old: boeScreenObj?.AlternateNo_Old,
          POSComments1: boeScreenObj?.POSComments1,
          RequestorComments: boeScreenObj?.RequestorComments,
          resonfordelay: boeScreenObj?.ReasonForDelay,
          validateSignature: boeScreenObj?.validateSignature,
          validatedBy: boeScreenObj?.validatedBy,
          RequestBy: boeScreenObj?.ValidatedBy,
        });
      } else if (selectedSubType === "emailupdate") {
        form.setFieldsValue({
          ValidateSignature: boeScreenObj?.ValidateSignature,
          ValidatedBy: boeScreenObj?.ValidatedBy,
          custRole: parseInt(boeScreenObj?.custRole),
          RequestorComments: boeScreenObj?.RequestorComments,
          resonfordelay: boeScreenObj?.ReasonForDelay,
          Email_Old: boeScreenObj?.Email_Old,
          Email_New: boeScreenObj?.Email_New,
          POSComments1: boeScreenObj?.POSComments1,
          RequestBy: boeScreenObj?.ValidatedBy,
        });
      } else if (selectedSubType === "worknumberupdate") {
        form.setFieldsValue({
          custRole: parseInt(boeScreenObj?.custRole),
          WorkNo_Old: boeScreenObj?.WorkNo_Old,
          WorkNo_New: boeScreenObj?.WorkNo_New,
          POSComments1: boeScreenObj?.POSComments1,
          RequestorComments: boeScreenObj?.RequestorComments,
          resonfordelay: boeScreenObj?.ReasonForDelay,
          validateSignature: boeScreenObj?.validateSignature,
          validatedBy: boeScreenObj?.validatedBy,
          RequestBy: boeScreenObj?.ValidatedBy,
        });
      } else if (selectedSubType === "existingcontactdetails") {
        form.setFieldsValue({
          custRole: parseInt(boeScreenObj?.custRole),
          MobileNumber: boeScreenObj?.MobileNumber,
          AlternateNumber: boeScreenObj?.AlternateNumber,
          WorkNumber: boeScreenObj?.WorkNumber,
          EmailID: boeScreenObj?.EmailID,
          Address: boeScreenObj?.Address,
        });
      }
    } else if (POSContactData && customerData?.isPOS) {
      setDeDupeData(
        POSContactData?.deDupPayload[0]?.deDupPayload[0]?.ResponseBody
          ?.ClientDetails
      );
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        posScreenObj[element.tagName] = element.tagValue;
      });
      setIsShowPOSScreen(true);
      if (posScreenObj?.Request_for === "1") {
        setRequestForSelection("addresschange");
      }
      setData(posScreenObj);
      if (posScreenObj?.ValidatedBy === "otp") {
        Data[selectedSubType]?.POS_Details?.forEach((element) => {
          if (element?.label === "Request Form") {
            element.hide = true;
            setUpdateFields(true);
          }
        });
      }

      Data[selectedSubType]?.POS_Details?.forEach((element) => {
        if (
          element?.name === "ValidateSignature" &&
          posScreenObj?.ValidateSignature === null
        ) {
          element.hide = true;
        }
      });

      Data[selectedSubType]?.POS_Details?.forEach((element) => {
        if (element?.name === "resonfordelay" && posScreenObj?.ReasonForDelay) {
          element.hide = false;
        }
      });

      form.setFieldsValue({
        custRole: parseInt(posScreenObj?.custRole),
        srvReqID: POSContactData?.srvReqRefNo,
        Mobile_Old:
          loginInfo?.userProfileInfo?.profileObj?.role === 37
            ? maskMobileNumber(posScreenObj?.Mobile_Old)
            : posScreenObj?.Mobile_Old,

        Mobile_New: posScreenObj?.Mobile_New,
        Email_Old: posScreenObj?.Email_Old,
        Email_New: posScreenObj?.Email_New,
        resonfordelay: posScreenObj?.ReasonForDelay,
        AlternateNo_Old: posScreenObj?.AlternateNo_Old,
        AlternateNo_New: posScreenObj?.AlternateNo_New,
        WorkNo_Old: posScreenObj?.WorkNo_Old,
        WorkNo_New: posScreenObj?.WorkNo_New,
        RequestorComments: posScreenObj?.RequestorComments,
        Old_Address: posScreenObj?.Old_Address,
        New_Line1: posScreenObj?.New_Line1,
        New_Line2: posScreenObj?.New_Line2,
        New_LandMark: posScreenObj?.New_LandMark,
        New_Pincode: posScreenObj?.New_Pincode,
        New_City: posScreenObj?.New_City,
        New_State: posScreenObj?.New_State,
        Add_Land_Mark_New: posScreenObj?.Add_Land_Mark_New,
        ValidateSignature: posScreenObj?.ValidateSignature,
        RequestBy: posScreenObj?.ValidatedBy,
        requestchannel: POSContactData?.reqMode,
        DedupeMatch:
          POSContactData?.deDupPayload[0]?.deDupPayload[0]?.ResponseBody !=
            null &&
          POSContactData?.deDupPayload[0]?.deDupPayload[0]?.ResponseBody
            ?.ClientDetails?.length > 0
            ? "yes"
            : "no",
        //customersigningdate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
        //branchreceivedate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
      });
      Data[selectedSubType]?.POS_Details?.forEach((element) => {
        if (
          element?.label?.includes("Reason For Delayed Submission") &&
          POSContactData?.reasonDelayed
        ) {
          element.hide = false;
          setShowReasonDelayField(true);
        }
      });
    } else {
      if (
        policyDetails?.policyDetailsObj?.identifiers?.la_Name ===
        policyDetails?.policyDetailsObj?.identifiers?.po_Name
      ) {
        form.setFieldsValue({
          custRole: 2,
        });
        if (props.selectedSubType === "addresschange") {
          Data[selectedSubType]?.Change_Fields?.forEach((element) => {
            if (element?.name === "custRole") {
              element.disabled = true;
              setUpdateFields(true);
            }
          });
        } else {
          Data[selectedSubType]?.BOE_Details?.forEach((element) => {
            if (element?.name === "custRole") {
              element.disabled = true;
              setUpdateFields(true);
            }
          });
        }
        getClientEnquiry(2);
      } else {
        Data[selectedSubType]?.BOE_Details?.forEach((element) => {
          if (element?.name === "custRole") {
            element.disabled = false;
            setUpdateFields(true);
          }
        });
        form.resetFields();
      }
      setIsShowPOSScreen(false);
      setShowRequestFormFields(false);
      setDisableRequestForm(false);
    }
  }, [selectedSubType]); // eslint-disable-next-line arrow-body-style

const isRoleValid = loginInfo?.userProfileInfo?.profileObj?.role === 37;
const validCallType5SubTypes = [2, 3, 5];
const isCallType5Valid = selectedCallType === 5 && validCallType5SubTypes.includes(selectedSubTypeId);
const isCallType6Valid = selectedCallType === 6 && selectedSubTypeId === 13;

const isEnableSubmitButton = isRoleValid && (isCallType5Valid || isCallType6Valid);
  useEffect(() => {
    if (loginInfo && selectedSubType) {
      if(isEnableSubmitButton){
      Data[selectedSubType]?.BOE_Details?.forEach((element) => {
        if (element?.name === "customerchoice") {
          element.hide = true;
        }
      });
      } 
    }
  }, [loginInfo,selectedSubType, props?.selectedCallType, props?.selectedSubTypeId]);

  // useEffect(()=>{
  //   setIsDisableNewMobileNo(false);
  //   if(validateOTPSuccess) {
  //     Data[selectedSubType]?.BOE_Details?.forEach(element => {
  //       if(element?.label==="New Mobile" || element?.label==="New Email" || element?.label==="New Work Number" ||element?.label==="New Alternate Number"){
  //         element.disabled = true;
  //         setIsDisableNewMobileNo(true);
  //       }
  //     })
  //   }
  //   else {
  //     Data[selectedSubType]?.BOE_Details?.forEach(element => {
  //       if(element?.label==="New Mobile" || element?.label==="New Email" || element?.label==="New Work Number" ||element?.label==="New Alternate Number"){
  //         element.disabled = false;
  //         setIsDisableNewMobileNo(true);
  //       }
  //     })
  //   }
  //  }, [validateOTPSuccess]);// eslint-disable-next-line arrow-body-style

  useEffect(() => {
    setIsDisableNewMobileNo(false);
    const boeDetails = Data[selectedSubType]?.BOE_Details;
    if (validateOTPSuccess) {
      if (boeDetails) {
        boeDetails.forEach((element) => {
          if (
            element?.label === "New Mobile" ||
            element?.label === "New Email" ||
            element?.label === "New Work Number" ||
            element?.label === "New Alternate Number"
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
            element?.label === "New Mobile" ||
            element?.label === "New Email" ||
            element?.label === "New Work Number" ||
            element?.label === "New Alternate Number"
          ) {
            element.disabled = false;
          }
        });
      }
      setIsDisableNewMobileNo(false);
    }
  }, [validateOTPSuccess, selectedSubType]);

  const handleAddLandMarkText = (e) => {
    if (e) {
      setDisableOTP(false);
    }
  };

  const getUploadFiles = (listOfUploadFiles) => {
    // const updatedUploadList = listOfUploadFiles?.map((obj) => {
    //   // Create a new object without the propertyToDelete property
    //   const { labelName, ...newObject } = obj;
    //   return newObject;
    // });
    // Update the state with the new list
    setUploadFiles([...docIdProofs, ...listOfUploadFiles]);
  };

  const getMultpleUploadFiles = (listOfUploadFiles, label) => {
    // const updatedUploadList = listOfUploadFiles?.map((obj) => {
    //   // Create a new object without the propertyToDelete property
    //   const { labelName, ...newObject } = obj;
    //   return newObject;
    // });
    // Update the state with the new list
    setUploadMultipleFiles(listOfUploadFiles);
    if (listOfUploadFiles.length > 0) {
      form.setFieldsValue({
        addressProof: `Documents Uploaded -  ${listOfUploadFiles.length}`,
      });
    }
  };

  const handleRemove = (file) => {
    if (file?.labelName === "Copy of Aadhar Card") {
      setAAdharUploadFiles([]);
    } else if (file?.labelName === "Copy of Passport") {
      setPassportUploadFiles([]);
    } else if (file?.labelName === "Copy of Ration Card") {
      setRationCardUploadFiles([]);
    } else if (file?.labelName === "Copy of Driving License") {
      setDrivingUploadFiles([]);
    } else if (
      file?.labelName === "Utility Bill which is not more than 2 months"
    ) {
      setUtilityUploadFiles([]);
    } else if (file?.labelName === "Copy of Voter ID") {
      setVoterUploadFiles([]);
    } else if (
      file?.labelName ===
      "Bank statement/Passbook copy with latest 2 months transactions"
    ) {
      setPassbookUploadFiles([]);
    }

    let updatedFiles = isUploadMultipleFiles?.filter((ele) => {
      return ele?.labelName !== file.labelName;
    });
    setIsMultipleFiles(updatedFiles);
    form.setFieldsValue({
      addressProof: `Documents Uploaded -  ${updatedFiles.length}`,
    });
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    fileList: [],
    customRequest: ({ file, onSuccess, index, item }, label) => {
      let formData = new FormData();
      const ApplicationNo =
        policyDetails?.policyDetailsObj?.identifiers?.applicationNo;
      formData.append("File", file, ApplicationNo + "/" + file.name);
      let response = apiCalls.fileUpload(formData);
      response.then((val) => {
        if (val?.data) {
          let newDocumentObj = {
            IndexName: "Address Proof",
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
              setIsMultipleFiles((prevFiles) => [...prevFiles, newDocumentObj]);
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
          setShowUploadFile(index);
          setDocIdProofs([{ ...newDocumentObj }]);

          if (label?.includes("Copy of Aadhar Card")) {
            setAAdharUploadFiles([{ ...newDocumentObj }]);
          } else if (label?.includes("Copy of Passport")) {
            setPassportUploadFiles([{ ...newDocumentObj }]);
          } else if (label?.includes("Copy of Ration Card")) {
            setRationCardUploadFiles([{ ...newDocumentObj }]);
          } else if (label?.includes("Copy of Driving License")) {
            setDrivingUploadFiles([{ ...newDocumentObj }]);
          } else if (
            label?.includes("Utility Bill which is not more than 2 months")
          ) {
            setUtilityUploadFiles([{ ...newDocumentObj }]);
          } else if (label?.includes("Copy of Voter ID")) {
            setVoterUploadFiles([{ ...newDocumentObj }]);
          } else if (
            label?.includes(
              "Bank statement/Passbook copy with latest 2 months transactions"
            )
          ) {
            setPassbookUploadFiles([{ ...newDocumentObj }]);
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

  const handleEdit = (val) => {
    if (val === "edit") {
      setIsPosEdited(true);
      Data[selectedSubType]?.POS_Details?.forEach((element) => {
        if (element?.posEdit) {
          element.disabled = false;
        }
      });
    } else if (val === "close") {
      setIsPosEdited(false);
      Data[selectedSubType]?.POS_Details?.forEach((element) => {
        if (element?.posEdit) {
          element.disabled = true;
        }
      });
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        posScreenObj[element.tagName] = element.tagValue;
      });
      form.setFieldsValue({
        New_Line1: posScreenObj?.New_Line1,
        New_Line2: posScreenObj?.New_Line2,
        New_LandMark: posScreenObj?.New_LandMark,
        New_Pincode: posScreenObj?.New_Pincode,
        New_City: posScreenObj?.New_City,
        New_State: posScreenObj?.New_State,
      });
    }
  };

  const handleSubmit = (values) => {
      if (POSContactData && customerData?.isPOS) {
        POSActionsOnContactDetails(values, "APPROVED");
      } else if (
        selectedSubType === "mobilenumberupdate" ||
        selectedSubType === "emailupdate" ||
        selectedSubType === "alternatenumberupdate" ||
        selectedSubType === "worknumberupdate" ||
        selectedSubType === "addresschange" ||
        selectedSubType === "existingcontactdetails"
      ) {
        // if((values.customerchoice ===  "requestform" && values.validatesignature === 'no') || (selectedSubType === "addresschange" && values.validatesignature === 'no')){
        //   getRaiseRequirements();
        // }else{
        saveRequest(values);
        //}
      }
    
  };

  const getInternal = (list) => {
    const values = form.getFieldsValue();
    POSActionsOnContactDetails(values, "INTERNAL", list);
  };

  const saveRequest = () => {
    setIsLoader(true);
    const values = form.getFieldsValue();
    if (values.customersigningdate > values.branchreceivedate) {
      message.destroy();
      message.error({
        content:
          " customer signing date  can't be greater than  Request Received Date.",
        className: "custom-msg",
        duration: 3,
      });
      form.setFieldsValue({
        customersigningdate: "",
        customersigningdate: "",
      });
      setIsLoader(false);
      return;
    }
    // const newFilesArray =customerData?.isInternalFlow ? isUploadMultipleFiles : [];
    // if (uploadFiles?.length > 0 && uploadMultipleFiles?.length > 0) {
    //   newFilesArray.push(...uploadFiles, ...uploadMultipleFiles);
    // }
    const newFilesArray = customerData?.isInternalFlow
      ? isUploadMultipleFiles
      : [];
    const uniqueFilesSet = new Set();

    if (uploadFiles?.length > 0) {
      uploadFiles.forEach((file) => uniqueFilesSet.add(file));
    }

    if (uploadMultipleFiles?.length > 0) {
      uploadMultipleFiles.forEach((file) => uniqueFilesSet.add(file));
    }
    // Add all unique files to newFilesArray
    newFilesArray.push(...uniqueFilesSet);
    const obj = {
      SrvReqID: POSContactData?.srvReqID || 0,
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: loginInfo?.userProfileInfo?.profileObj?.role || 0, // Required
      RequestChannel:
        loginInfo?.userProfileInfo?.profileObj?.role === 14
          ? 13
          : values.requestchannel || emsrequestchannel, // Required
      ApplicationNo:
        policyDetails?.policyDetailsObj?.identifiers?.applicationNo,
      PolicyNo: policyDetails?.policyDetailsObj?.identifiers?.policyNo, // Required
      proposerName: policyDetails?.policyDetailsObj?.identifiers?.po_Name,
      policyStatus:
        policyDetails?.policyDetailsObj?.planAndStatus?.policyStatus,
      plan: policyDetails?.policyDetailsObj?.planAndStatus?.planName,
      DOB: convertDate(customerData?.dob),
      CreatedOn: new Date(),
      CreatedByRef: loginInfo?.userProfileInfo?.profileObj?.userName, // Required
      CreatedUsrId: loginInfo?.userProfileInfo?.profileObj?.userName,
      ModifiedOn: new Date(),
      ModifiedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
      AssignedToRole: "", //POS
      AssignedByUser: 0,
      Category: selectedSubType === "existingcontactdetails" ? 1 : 2,
      ReasonForChange: "",
      RequestDateTime: values?.branchreceivedate
        ? new Date(values?.branchreceivedate)
        : new Date(),
      ReasonDelayed: values?.resonfordelay,
      CustSignDateTime: values?.customersigningdate
        ? new Date(values?.customersigningdate)
        : new Date(),
      CurrentStatus: raiseRequirementOpen ? "Reject" : "",
      TransactionData: [
        {
          Status: "Create",
          TagName: "ValidateSignature",
          TagValue: values.ValidateSignature,
        },

        {
          Status: "Create",
          TagName: "ValidatedBy",
          TagValue: values.customerchoice ? values.customerchoice : "form",
        },

        {
          Status: "Create",
          TagName: "custRole",
          TagValue: values.custRole,
        },
        {
          Status: "Create",
          TagName: "RequestorComments",
          TagValue: values?.RequestorComments || "",
        },
        {
          Status: "Create",
          TagName: "ReasonForDelay",
          TagValue: values?.resonfordelay || "",
        },

        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },

        {
          Status: "Create",
          TagName: "Client_Id",
          TagValue:
            values.custRole === 1
              ? customerData?.laClientID
              : customerData?.poClientID,
        },
      ],
      Uploads: newFilesArray?.length > 0 ? newFilesArray : uploadFiles,
      CommunicationRequest: [
        {
          SrvReqRefNo: "",
          TemplateID: "",
          CommType: 2,
          ReceipientTo: import.meta.env.VITE_APP_RECEIPIENT_TO
            ? import.meta.env.VITE_APP_RECEIPIENT_TO
            : clientEnquiryData?.rinternet,
          ReceipientCC: import.meta.env.VITE_APP_RECEIPIENT_CC
            ? import.meta.env.VITE_APP_RECEIPIENT_CC
            : clientEnquiryData?.rinternet,
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
      if (!isShowPOSScreen) {
        obj.TransactionData.push({
          Status: "Create",
          TagName: "AddAnyOtherRequirements",
          TagValue: reqFormValues?.addotherReq || "",
        });
      }
      if (ids?.length === 0 && !props?.EmailResponse?.IsEmailmanagent) {
        message.error({
          content: "Please Select Documents to Reject",
          className: "custom-msg",
          duration: 3,
        });
        setIsLoader(false);
        setRequirementLoader(false);
        return;
      }
    }
    if (selectedSubType === "mobilenumberupdate") {
      obj.TransactionData.push(
        {
          Status: "Create",
          TagName: "Mobile_Old",
          TagValue: values.Mobile_Old,
        },
        {
          Status: "Create",
          TagName: "Mobile_New",
          TagValue: values.Mobile_New,
        }
      );
    } else if (selectedSubType === "emailupdate") {
      obj.TransactionData.push(
        {
          Status: "Create",
          TagName: "Email_Old",
          TagValue: values.Email_Old,
        },
        {
          Status: "Create",
          TagName: "Email_New",
          TagValue: values.Email_New,
        }
      );
    } else if (selectedSubType === "addresschange") {
      obj.TransactionData.push(
        {
          Status: "Create",
          TagName: "Request_for",
          TagValue: values.Request_for,
        },
        {
          Status: "Create",
          TagName: "Old_Address",
          TagValue: values.Old_Address,
        },
        {
          Status: "Create",
          TagName: "New_Line1",
          TagValue: values.New_Line1,
        },
        {
          Status: "Create",
          TagName: "New_Line2",
          TagValue: values.New_Line2,
        },
        {
          Status: "Create",
          TagName: "LandMark",
          TagValue:
            requestForSelection === "landmarkaddition" ? isOldLandMark : "",
        },
        {
          Status: "Create",
          TagName: "New_LandMark",
          TagValue: values.New_LandMark,
        },
        {
          Status: "Create",
          TagName: "New_Pincode",
          TagValue: values.New_Pincode,
        },
        {
          Status: "Create",
          TagName: "New_City",
          TagValue: values.New_City,
        },
        {
          Status: "Create",
          TagName: "New_State",
          TagValue: values.New_State,
        },
        {
          Status: "Create",
          TagName: "Add_Land_Mark_New",
          TagValue: values.Add_Land_Mark_New,
        },
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        }
      );
    } else if (selectedSubType === "alternatenumberupdate") {
      obj.TransactionData.push(
        {
          Status: "Create",
          TagName: "AlternateNo_Old",
          TagValue: values.AlternateNo_Old,
        },
        {
          Status: "Create",
          TagName: "AlternateNo_New",
          TagValue: values.AlternateNo_New,
        }
      );
    } else if (selectedSubType === "worknumberupdate") {
      obj.TransactionData.push(
        {
          Status: "Create",
          TagName: "WorkNo_Old",
          TagValue: values.WorkNo_Old,
        },
        {
          Status: "Create",
          TagName: "WorkNo_New",
          TagValue: values.WorkNo_New,
        }
      );
    } else if (selectedSubType === "existingcontactdetails") {
      obj.TransactionData.push(
        {
          Status: "Create",
          TagName: "MobileNumber",
          TagValue: values?.MobileNumber,
        },
        {
          Status: "Create",
          TagName: "AlternateNumber",
          TagValue: values?.AlternateNumber,
        },
        {
          Status: "Create",
          TagName: "WorkNumber",
          TagValue: values?.WorkNumber,
        },
        {
          Status: "Create",
          TagName: "EmailID",
          TagValue: values?.EmailID,
        },
        {
          Status: "Create",
          TagName: "Address",
          TagValue: values?.Address,
        },
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || emsrequestchannel,
        }
      );
    }

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
  const getClientEnquiry = (e) => {
    setIsLoader(true);
    setDisableOTP(true);
    let obj = {
      clientNumber:
        e === 1 ? customerData?.laClientID : customerData?.poClientID,
    };
    let response = apiCalls.getClientEnquiry(
      obj,
      loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID
    );
    response
      .then((val) => {
        if (val?.data) {
          setClientEnquiryData(val?.data?.responseBody);
          const res = val?.data?.responseBody;
          if (res?.rmblphone) {
            setDisableOTP(false);
          }
          if (selectedSubType === "mobilenumberupdate") {
            setIsExistingMobileNumber(res?.rmblphone);
            form.setFieldsValue({
              Mobile_Old:
                loginInfo?.userProfileInfo?.profileObj?.role === 37
                  ? maskMobileNumber(res?.rmblphone)
                  : res?.rmblphone,
            });
          } else if (selectedSubType === "emailupdate") {
            setIsExistingMobileNumber(res?.rinternet);
            form.setFieldsValue({ Email_Old: res?.rinternet });
          } else if (selectedSubType === "addresschange") {
            setIsOldLandMark(res?.cltaddR03);
            const address = [
              res?.cltaddR01,
              res?.cltaddR02,
              res?.cltaddR03,
              res?.cltaddR04,
              res?.cltaddR05,
              res?.cltpcode,
              res?.ctrycode,
            ]
              .filter(Boolean)
              .join(", ");

            form.setFieldsValue({
              Old_Address: address,
            });
          } else if (selectedSubType === "alternatenumberupdate") {
            setIsExistingMobileNumber(res?.cltphonE01);

            form.setFieldsValue({
              AlternateNo_Old:
                loginInfo?.userProfileInfo?.profileObj?.role === 37
                  ? maskMobileNumber(res?.cltphonE01)
                  : res?.cltphonE01,
            });
          } else if (selectedSubType === "worknumberupdate") {
            setIsExistingMobileNumber(res?.cltphonE02);

            form.setFieldsValue({
              WorkNo_Old:
                loginInfo?.userProfileInfo?.profileObj?.role === 37
                  ? maskMobileNumber(res?.cltphonE02)
                  : res?.cltphonE02,
            });
          } else if (selectedSubType === "existingcontactdetails") {
            const address = [
              res?.cltaddR01,
              res?.cltaddR02,
              res?.cltaddR03,
              res?.cltaddR04,
              res?.cltaddR05,
              res?.cltpcode,
              res?.ctrycode,
            ]
              .filter(Boolean)
              .join(", ");

            form.setFieldsValue({
              MobileNumber: res?.rmblphone,
              EmailID: res?.rinternet,
              AlternateNumber: res?.cltphonE01,
              WorkNumber: res?.cltphonE02,
              Address: address,
            });
          }
          setIsLoader(false);
        } else {
          setIsLoader(false);
          setDisableOTP(false);
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
        setIsLoader(false);
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
    let internalFormValues = internalReqForm?.getFieldsValue();
    if (status !== "APPROVED") {
      if (
        (seletedRequerimentList.length === 0 &&
          !reqFormValues?.PosOtherReq &&
          status === "REJECTED") ||
        (seletedRequerimentList.length === 0 &&
          !internalFormValues?.PosInternalReq &&
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
    let obj = {
      TransectionId: 1,
      SrvReqRefNo: POSContactData?.srvReqRefNo,
      Status: status,
      RequirementList: seletedRequerimentList,
      UsrID: loginInfo?.userProfileInfo?.profileObj?.userName,
      RoleID: loginInfo?.userProfileInfo?.profileObj?.role,
      Comments: values?.Comments,
      TransactionPayload: [
        {
          Status: "Create",
          TagName: "POSComments1",
          TagValue: values?.Comments || "",
        },
      ],
    };
    if (selectedSubType === "mobilenumberupdate") {
      obj.TransactionPayload.push({
        Status: "Update",
        TagName: "Mobile_New",
        TagValue: values?.Mobile_New,
      });
    } else if (selectedSubType === "emailupdate") {
      obj.TransactionPayload.push({
        Status: "Update",
        TagName: "Email_New",
        TagValue: values?.Email_New,
      });
    } else if (selectedSubType === "alternatenumberupdate") {
      obj.TransactionPayload.push({
        Status: "Update",
        TagName: "AlternateNo_New",
        TagValue: values?.AlternateNo_New,
      });
    } else if (selectedSubType === "worknumberupdate") {
      obj.TransactionPayload.push({
        Status: "Update",
        TagName: "WorkNo_New",
        TagValue: values?.WorkNo_New,
      });
    }

    if (status === "INTERNAL") {
      obj.TransactionPayload.push(
        {
          Status: "create",
          TagName: "InternalRequirementValue",
          TagValue: JSON.stringify(seletedRequerimentList),
        },
        {
          Status: "create",
          TagName: "PosInternalReq",
          TagValue: internalFormValues?.PosInternalReq || "",
        }
      );
    }

    obj.TransactionPayload.push({
      Status: "Create",
      TagName: "PosOtherReq",
      TagValue: reqFormValues?.PosOtherReq || "",
    });

    if (IsPosEdited && selectedSubType === "addresschange") {
      obj.TransactionPayload.push(
        {
          Status: "Update",
          TagName: "New_Line1",
          TagValue: values?.New_Line1,
        },
        {
          Status: "Update",
          TagName: "New_Line2",
          TagValue: values?.New_Line2,
        },
        {
          Status: "Update",
          TagName: "New_LandMark",
          TagValue: values?.New_LandMark,
        },
        {
          Status: "Update",
          TagName: "New_Pincode",
          TagValue: values?.New_Pincode,
        },
        {
          Status: "Update",
          TagName: "New_City",
          TagValue: values?.New_City,
        },
        {
          Status: "Update",
          TagName: "New_State",
          TagValue: values?.New_State,
        }
      );
    }

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
        setIsLoader(false);
        setRequirementLoader(false);
      })
      .catch((err) => {
        setIsLoader(false);
        setRequirementLoader(false);
      });
  };

  const searchLocationn = (e) => {
    setIsLoader(true);

    let response = apiCalls.searchLocation(e);
    response
      .then((val) => {
        setIsLoader(false);
        if (val?.data) {
          form.setFieldsValue({
            New_City: val?.data?.district,
            New_State: val?.data?.stateName,
          });
          if (props.selectedSubType === "addresschange") {
            let addressData = isShowPOSScreen
              ? Data[selectedSubType]?.POS_Details
              : Data[selectedSubType]?.BOE_Details;
            addressData?.forEach((element) => {
              if (
                element?.name === "New_City" ||
                element?.name === "New_State"
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
        setIsLoader(false);
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
      saveRequest();
    }
  };

  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day"); // Can not select days before today and today
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
    if (item === "branchreceivedate" || item.name === "branchreceivedate") {
      setShowReasonDelayField(false);
      let newDate = new Date();
      let todayDate = moment(newDate).format("MM/DD/YYYY");
      let selectDate = moment(date + 1).format("MM/DD/YYYY");
      const formFeilds = form.getFieldsValue();
      let customerSignDate = moment(formFeilds?.customersigningdate + 1).format(
        "MM/DD/YYYY"
      );
      let dateDiffence = date_diff_indays(selectDate, customerSignDate);
      if (!formFeilds?.customersigningdate || dateDiffence > 0) {
        message.destroy();
        message.error({
          content:
            "Request Received Date can't be before the customer signing date.",
          className: "custom-msg",
          duration: 3,
        });
        form.setFieldsValue({
          branchreceiveddate: "",
          branchreceivedate: "",
        });
        return;
      }
      if (
        requestForSelection === "landmarkaddition" &&
        selectDate < todayDate
      ) {
        setShowReasonDelayField(true);
      } else {
        Data[selectedSubType]?.Checklist?.forEach((element) => {
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
      }
    }
  };

  const handleRadioChange = (e, item) => {
    const emailDetails = Data[selectedSubType]?.Checklist;
    if (loginInfo?.userProfileInfo?.profileObj?.isEmail) {
      emailDetails.forEach((element) => {
        if (element?.name === "requestform") {
          element.required = false;
        }
      });
    }
    setIsShowOTPModal(false);
    setShowRaiseRequirementBtn(false);
    setRequestFormBtnEnable(false);
    if (e.target.value === "otp") {
      setIsShowOTPModal(true);
      setShowRequestFormFields(false);
      setValidateOTPSuccess(false);
    } else {
      setShowRequestFormFields(true);
      setVaildateSignature(false);
      setRequestFormBtnEnable(true);
    }
    if (
      e.target.value === "no" &&
      item.name?.toLowerCase() === "validatesignature"
    ) {
      setVaildateSignature(true);
    } else if (item.name?.toLowerCase() === "validatesignature") {
      setVaildateSignature(false);
    }
  };

  const handleTitleCheckBox = (e) => {
    setSelectCheckBox(e.target.checked);
  };

  const handleDropdownChange = (e, item) => {
    setDisableRequestForm(false);
    const formData = form.getFieldValue();
    if (item?.name?.toLowerCase().includes("request_for")) {
      setRequestForSelection(e === 1 ? "addresschange" : "landmarkaddition");
    }
    if (formData.custRole && item?.name === "custRole") {
      getClientEnquiry(formData.custRole);
    }
  };
  const handleRadioLink = (item) => {
    setDeDupeModalOpen(false);
    setDedupeLoader(false);
    if (item?.name === "DedupeMatch") {
      let object = form.getFieldsValue();
      if (selectedSubType === "mobilenumberupdate") {
        setDeDupeData([]);
        setDeDupeModalOpen(true);
        setDedupeLoader(true);
        let response = apiCalls.GetMobileDedupeAPI(object?.Mobile_New);
        response
          .then((val) => {
            setIsLoader(false);
            if (val?.data?.responseHeader?.errorcode !== "1") {
              setDeDupeData(val?.data?.responseBody?.clientDetails);
              setDedupeLoader(false);
            } else {
              setDeDupeData([]);
              setDedupeLoader(false);
              message.error({
                content:
                  val?.data?.responseBody?.errormessage ||
                  val?.data?.responseHeader?.message ||
                  "Something went wrong please try again!",
                className: "custom-msg",
                duration: 2,
              });
            }
          })
          .catch((err) => {
            setDedupeLoader(false);
          });
      } else if (selectedSubType === "emailupdate") {
        setDeDupeData([]);
        setDeDupeModalOpen(true);
        setDedupeLoader(true);
        let response = apiCalls.GetEmailDedupeAPI(object?.Email_New);
        response
          .then((val) => {
            setIsLoader(false);
            if (val?.data?.responseHeader?.errorcode !== "1") {
              setDeDupeData(val?.data?.responseBody?.clientDetails);
              setDedupeLoader(false);
            } else {
              setDeDupeData([]);
              setDedupeLoader(false);
              message.error({
                content:
                  val?.data?.responseBody?.errormessage ||
                  val?.data?.responseHeader?.message ||
                  "Something went wrong please try again!",
                className: "custom-msg",
                duration: 2,
              });
            }
          })
          .catch((err) => {
            setDedupeLoader(false);
          });
      } else {
        setDeDupeModalOpen(true);
      }
    }
  };

  const handleTextLink = (item) => {
    if (item.label?.includes("Upload Address Proof")) {
      setAddressProofModal(true);
    }
    if (
      item.name === "requestform" ||
      item.linkValue?.toLowerCase() === "view"
    ) {
        const gConfig= apiCalls.getGenericConfig()
          if(gConfig?.data?.dmsApiUrl){
      const url =
        gConfig?.data?.dmsApiUrl +
        `/omnidocs/WebApiRequestRedirection?Application=BPMPOLENQ&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${policyDetails?.policyDetailsObj?.identifiers?.applicationNo}`;
      // Open the URL in a new tab
      window.open(url, "_blank");
    }
    }
    if (item.name === "DedupeMatch") {
      setDeDupeModalOpen(true);
    }
  };
  const handleUploadLink = () => {
    setAddressProofModal(true);
  };
  const handleAddressModalClose = () => {
    setUploadFiles([]);
    setAddressProofModal(false);
  };

  const handleLinkValue = (item) => {
    setAddressProofModal(true);
  };

  const handleOk = () => {
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
    }
  };

  const requirementDescription = (item) => {
    return item.mstDesc ? item.mstDesc : item.raiseReqDesc;
  };

  const onBlurInput = (e, item) => {
    if (item.name === "New_Pincode") {
      form.setFieldsValue({
        New_City: "",
        New_State: "",
      });
    }
    if (item.name === "New_Pincode" && e && e.length === 6) {
      searchLocationn(e);
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
    }
  }, []);


  return (
    <>
      <Spin spinning={isLoader}>
        <Form
          initialValues={data}
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
                  props?.policyDetails?.policyDetailsObj?.identifiers
                    ?.applicationNo
                }
                form={form}
                customerData={customerData}
                POSContactData={POSContactData}
                boeScreenObj={boeScreenObj}
                InternalRequirements={InternaRequirements}
                Docs={InternaRequirements}
              />
            </>
          ) : (
            <>
              {Data[selectedSubType]?.Change_Fields && !isShowPOSScreen && (
                <>
                  <DetailsForm
                    data={Data[selectedSubType]?.Change_Fields}
                    handleDropdownChange={handleDropdownChange}
                    requestModeLU={requestModeLU}
                    clientRoleLU={clientRoleLU}
                    requestForLU={requestForLU}
                  ></DetailsForm>
                </>
              )}
              {selectedSubType === "addresschange" &&
                requestForSelection === "landmarkaddition" && (
                  <>
                    <DetailsForm
                      data={Data[requestForSelection]?.BOE_Details}
                      handleRadioChange={handleRadioChange}
                      clientRoleLU={clientRoleLU}
                      handleAddLandMarkText={handleAddLandMarkText}
                      disableOTP={disableOTP}
                      onBlurInput={onBlurInput}
                      disableRequestForm={disableRequestForm}
                    ></DetailsForm>
                    {!Data[requestForSelection]?.hideChecklist &&
                      !isShowPOSScreen &&
                      showRequestFormFields && (
                        <>
                          <div>
                            <div>
                              <DetailsForm
                                data={Data[requestForSelection]?.Checklist}
                                callType={selectedCallType}
                                subType={selectedSubType}
                                suffix={!isShowPOSScreen && suffix}
                                handleDateChange={handleDateChange}
                                disabledDate={disabledDate}
                                handleUploadLink={handleUploadLink}
                                handleRadioChange={handleRadioChange}
                                handleLinkValue={handleLinkValue}
                                form={form}
                                getUploadFiles={getUploadFiles}
                              ></DetailsForm>
                            </div>
                          </div>
                        </>
                      )}
                    {showResonDelayField &&
                      !isShowPOSScreen &&
                      showRequestFormFields && (
                        <>
                          <DetailsForm
                            data={Data[requestForSelection]?.ReasonSubmission}
                            callType={selectedCallType}
                            subType={selectedSubType}
                            suffix={!isShowPOSScreen && suffix}
                            form={form}
                            getUploadFiles={getUploadFiles}
                          ></DetailsForm>
                        </>
                      )}
                    <DetailsForm
                      data={Data[selectedSubType]?.Comments}
                      callType={selectedCallType}
                      subType={selectedSubType}
                    ></DetailsForm>

                    {/*Checklist Code End*/}
                    {!Data[requestForSelection]?.Details_Buttons &&
                      !Data[requestForSelection]?.hideSubmitBtns && (
                        <>
                          <div className="contact-details-btn">
                            <Button
                              type="primary"
                              className="primary-btn"
                              htmlType="submit"
                              disabled={vaildateSignature}
                            >
                              Submit
                            </Button>{" "}
                            <Button
                              type="primary"
                              className="primary-btn"
                              onClick={() => getRaiseRequirements()}
                            >
                              Raise Requirement
                            </Button>
                          </div>
                        </>
                      )}
                  </>
                )}
              {((selectedSubType === "addresschange" &&
                requestForSelection === "addresschange") ||
                selectedSubType !== "addresschange") && (
                <>
                  <div>
                    <DetailsForm
                      data={
                        !isShowPOSScreen
                          ? Data[selectedSubType]?.BOE_Details
                          : Data[selectedSubType]?.POS_Details ||
                            Data[selectedSubType]?.BOE_Details
                      }
                      subType={selectedSubType}
                      handleRadioChange={handleRadioChange}
                      requestModeLU={requestModeLU}
                      clientRoleLU={clientRoleLU}
                      handleDropdownChange={handleDropdownChange}
                      handleTextLink={handleTextLink}
                      handleLinkValue={handleLinkValue}
                      handleTitleCheckBox={handleTitleCheckBox}
                      selectCheckBox={selectCheckBox}
                      disableOTP={disableOTP}
                      onBlurInput={onBlurInput}
                      disableRequestForm={disableRequestForm}
                      handleEdit={handleEdit}
                      validateOTPSuccess={validateOTPSuccess}
                      isExistingMobileNumber={isExistingMobileNumber}
                      handleRadioLink={handleRadioLink}
                    ></DetailsForm>
                  </div>

                  {/*Checklist Code Start*/}
                  {!Data[selectedSubType]?.hideChecklist &&
                    !isShowPOSScreen &&
                    (requestForSelection === "addresschange" ||
                      showRequestFormFields) && (
                      <>
                        <div>
                          <div>
                            <DetailsForm
                              data={
                                isShowPOSScreen
                                  ? Data[selectedSubType]?.POS_Checklist ||
                                    Data[selectedSubType]?.Checklist
                                  : Data[selectedSubType]?.Checklist
                              }
                              callType={selectedCallType}
                              subType={selectedSubType}
                              suffix={!isShowPOSScreen && suffix}
                              handleDateChange={handleDateChange}
                              disabledDate={disabledDate}
                              handleUploadLink={handleUploadLink}
                              handleRadioChange={handleRadioChange}
                              handleLinkValue={handleLinkValue}
                              form={form}
                              getUploadFiles={getUploadFiles}
                              handleTextLink={handleTextLink}
                              handleRadioLink={handleRadioLink}
                              handleEdit={handleEdit}
                            ></DetailsForm>
                          </div>
                        </div>
                      </>
                    )}
                  {!isShowPOSScreen && (
                    <>
                      <DetailsForm
                        data={Data[selectedSubType]?.Comments}
                        callType={selectedCallType}
                        subType={selectedSubType}
                      ></DetailsForm>
                    </>
                  )}
                  {customerData?.isBOE && (
                    <>
                      <DetailsForm
                        data={Data[selectedSubType]?.BOE_Comments}
                        callType={selectedCallType}
                        subType={selectedSubType}
                      ></DetailsForm>
                    </>
                  )}

                  {/*Checklist Code End*/}
                  {!Data[selectedSubType]?.Details_Buttons &&
                    !Data[selectedSubType]?.hideSubmitBtns && (
                      <>
                        <div className="contact-details-btn">
                          {selectedSubType !== "existingcontactdetails" && (
                            <>
                              <Button
                                type="primary"
                                className="primary-btn"
                                htmlType="submit"
                                disabled={
                                  ((!isEmailManagement &&
                                    !isShowPOSScreen &&
                                    !validateOTPSuccess &&
                                    requestForSelection !== "addresschange" &&
                                    !requestFormBtnEnable) ||
                                  vaildateSignature )&& !isEnableSubmitButton
                                }
                              >
                                {!isShowPOSScreen ? "Submit" : "Approve"}
                              </Button>{" "}
                              {isShowPOSScreen ? (
                                <Button
                                  type="primary"
                                  className="primary-btn"
                                  onClick={() => getRaiseRequirements()}
                                >
                                  Raise Requirement
                                </Button>
                              ) : (
                                <Button
                                  type="primary"
                                  className="primary-btn"
                                  onClick={() => getRaiseRequirements()}
                                >
                                  Raise Requirement
                                </Button>
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
                            </>
                          )}
                          {selectedSubType === "existingcontactdetails" && (
                            <>
                              <Button
                                type="primary"
                                className="primary-btn"
                                htmlType="submit"
                              >
                                {!isShowPOSScreen ? "Submit" : "Approve"}
                              </Button>{" "}
                            </>
                          )}
                        </div>
                      </>
                    )}
                </>
              )}
            </>
          )}
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
        width={800}
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
        <Spin spinning={dedupeLoader}>
          <div className="table-container" style={{ marginTop: "20px" }}>
            <table className="responsive-table">
              <tr>
                <th>Policy Number</th>
                <th>Role</th>
                {/* <th>Number Updated Against</th> */}
                <th>Client Name</th>
              </tr>
              {duDupeData?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.PolicyNumber || item?.policyNumber}</td>
                  <td>
                    {" "}
                    <InsurerRolesComponent
                      codes={item?.Role || item?.role}
                    />{" "}
                  </td>
                  <td>{item?.ClientName || item?.clientName}</td>
                </tr>
              ))}
              {duDupeData?.length === 0 && (
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
        </Spin>
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
          <div>
            <Form
              onFinish={handleRequirementSubmit}
              form={requirementsForm}
              layout="vertical"
            >
              <div className="reuirement">
                <table className="responsive-table">
                  <thead>
                    <tr>
                      <th>Sr No</th>
                      <th>Description</th>
                      <th className="z-index">Select</th>
                    </tr>
                  </thead>
                  <tbody>
                    {raiseRequerimentList?.map((item, ind) => (
                      <tr key={ind + 1}>
                        <td>{ind + 1}</td>

                        <td>{requirementDescription(item)}</td>
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
              {!isShowPOSScreen && (
                <>
                  <div className="mt-16">
                    <Form.Item
                      label={
                        <strong>
                          Additional comments/requirements for customer
                        </strong>
                      }
                      name="addotherReq"
                      rules={[
                        {
                          required: false,
                          message:
                            "Additional comments/requirements for customer",
                        },
                      ]}
                    >
                      <TextArea
                        rows={6}
                        maxLength={1000}
                        placeholder="Additional comments/requirements for customer"
                      />
                    </Form.Item>
                  </div>
                </>
              )}
              {isShowPOSScreen && (
                <>
                  <div className="mt-16">
                    <Form.Item
                      label={<strong>Other Requirements</strong>}
                      name="PosOtherReq"
                      rules={[
                        { required: false, message: "Other Requirements" },
                      ]}
                    >
                      <TextArea
                        rows={6}
                        maxLength={1000}
                        placeholder="Other Requirements"
                      />
                    </Form.Item>
                  </div>
                </>
              )}
              <div className="contact-details-btn">
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit"
                  onClick={() => setRaiseRequirement(true)}
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
        title="List of Acceptable Address Proofs"
        open={addressProofModal}
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

      {isShowOTPModal && (
        <>
          <OTPModal
          form={form}
            customerData={customerData}
            isShowOTPModal={isShowOTPModal}
            setIsShowOTPModal={setIsShowOTPModal}
            selectedCallType={props?.selectedCallType}
            selectedSubTypeId={props?.selectedSubTypeId}
            sendOTPNumber={clientEnquiryData?.rmblphone}
            setDisableRequestForm={setDisableRequestForm}
            setValidateOTPSuccess={setValidateOTPSuccess}
            clientEnquiryData={clientEnquiryData}
          />
        </>
      )}
    </>
  );
});

const mapStateToProps = ({ state, policyDetails }) => {
  return { data: state?.PolicyDetailsReducer?.policyDetailsObj, policyDetails };
};


export default connect(mapStateToProps)(ContactDetails);
