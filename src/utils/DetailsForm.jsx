import React, { useState } from "react";
import {
  Input,
  Radio,
  Checkbox,
  Form,
  DatePicker,
  Row,
  Col,
  Select,
  Button,
  Collapse,
  Upload,
  message,
  TimePicker,
  Tooltip,
  Space,
} from "antd";
import apiCalls from "../api/apiCalls";
import { useSelector } from "react-redux";
import Icon, {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { UploadOutlined, EditOutlined, CloseOutlined } from "@ant-design/icons";

const DetailsForm = (props) => {
  const {
    data,
    handleRadioChange,
    handleCheckBox,
    options,
    suffix,
    handleTitleCheckBox,
    handleCheckBoxes,
    handleDate,
    dateRangeChecked,
    requestSourceLU,
    requestModeLU,
    registerModeLU,
    requestViaLU,
    clientRoleLU,
    handleDropdownChange,
    handleSubDropdownChange,
    onBlurInput,
    handleDateChange,
    handleTextLink,
    handleLinkValue,
    requestForLU,
    onRadioGroupChange,
    handleLabelLink,
    handleProposerCollapse,
    handleUploadLink,
    showPOSScreen,
    disableOTP,
    disableRequestForm,
    form,
    bankAccTypeLU,
    inputValues,
    requestReceivedViaLU,
    websitePortalLU,
    cursorPortalLU,
    disabledDate,
    callRelatedActionLU,
    toggleInputField,
    customerQueryLU,
    subType,
    panUpdateLU,
    handleAddLandMarkText,
    isProcessNameLU,
    sisLU,
    appointeerelationShipLU,
    isUpdateModeLU,
    handleEdit,
    isShowDefaulttAccordian,
    isExistingMobileNumber,
    handleRadioLink,
    PPCLU,
    ClientGender,
    policyContinueLU,
    causeOfEventLU,
    natureOfDeathLU,
    ClaimTypee,
    policyTypeLU,
    claimCategoryLU,
    claimIntimationLU,
    sourceInformationLU,
    assuredIncomePlanLU,
    uwDecisionLU,
    uwDecisionNewLU,
    laNomineeAddressLU,
    subStageLU,
    assessorsDecisionLU,
    policyStatusDOBLU,
    paymentReasonCodeLU,
    claimPaymentMethodLU,
    coverageNameofProductLU,
    healthClaimCodeLU,
    organCategoryCodeLU,
    approverDecisionLU,
    currentSuffixIcon,
    isChecked,
    dataBseCHeckLU,
    hotSpotCheckLU,
    referCaseToLU,
    reinstatementDecisionLU,
    withDGHLU,
    investigatorLU,
    decisionDescriptionLU,
    checkerDecisionDescriptionLU,
    subDescriptionLU,
    martialStatusLU,
    salutationLU,
    clientListLU,
  } = props;
  const loginInfo = useSelector((state) => state);
  const { TextArea } = Input;
  const dateFormat = "DD/MM/YYYY";
  const [emailExist] = useState(false);
  const { Panel } = Collapse;
  const [showUploadFile, setShowUploadFile] = useState(null);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [uploadedFiles1, setUploadedFiles1] = useState([]);
  const policyDetails = useSelector((state) => state?.policyDetails);
  const [isUploadMultipleFiles, setIsMultipleFiles] = useState([]);
  const uploadURL = import.meta.env.VITE_APP_API_URL2 + "InsertBlob";
  const [Edit, setIsEdit] = useState(true);
  const uploadProps = {
    name: "file",
    multiple: true,
    fileList: [],
    customRequest: ({ file, onSuccess, index, item }) => {
      
      let formData = new FormData();
      setShowUploadFile(index);
      setUploadFiles(file);
      const ApplicationNo =
        policyDetails?.policyDetailsObj?.identifiers?.applicationNo;
        console.log('====================================');
        console.log( `${ApplicationNo}/${file.name}`);
        console.log('====================================');
      formData.append("File", file, `${ApplicationNo}/${file.name}`);
      let response = apiCalls.fileUpload(formData);
      response.then((val) => {
        if (val?.data) {
          let newDocumentObj = {
            IndexName: item?.indexName,
            DocumentName: file?.name,
            UserID: loginInfo?.userProfileInfo?.profileObj?.userName,
            UploadedBy: loginInfo?.userProfileInfo?.profileObj?.name,
            UploadedOn: new Date(),
            DocumentSize: file?.size,
            // "FileLocation": val?.data,
            FileLocation: `/${policyDetails?.policyDetailsObj?.identifiers?.applicationNo}/`,
            BlobFileName: file?.name,
            FileExtnMime: file?.type,
            labelName: item?.label,
          };
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

              // Send the updated files to props?.getUploadFiles
              // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
              props?.getUploadFiles(updatedUploadFiles);
            } else {
              // If doesn't exist, add the new file object to the list
              setIsMultipleFiles((prevFiles) => [...prevFiles, newDocumentObj]);

              // Send the updated files to props?.getUploadFiles
              // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
              props?.getUploadFiles([...isUploadMultipleFiles, newDocumentObj]);
            }
          } else {
            // If labelName is not present or the array is empty, add the new file object to the list
            setIsMultipleFiles((prevFiles) => [...prevFiles, newDocumentObj]);

            // Send the updated files to props?.getUploadFiles
            // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
            props?.getUploadFiles([...isUploadMultipleFiles, newDocumentObj]);
          }

          //props?.getUploadFiles(documnetsObj);
          setShowUploadFile(index);
          setUploadFiles(file);
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
        pdf: true,
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

  const uploadMultipleProps = {
    name: "file",
    multiple: true,
    customRequest: ({ file, onSuccess, item }) =>
      handleMultipleUpload({ file, onSuccess, item }),
    beforeUpload: (file) => {
      let allowedTypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "application/pdf",
        "image/tiff",
        "video/mp4",
        "audio/mp3",
        "audio/mpeg", // Alternative MIME type for MP3
      ];
      if (!allowedTypes.includes(file.type)) {
        message.error("Invalid file type!");
        return Upload.LIST_IGNORE;
      }
      return true;
    },
  };

  const handleUpload = (file) => {};

  const handleMultipleUpload = ({ file, onSuccess, item }) => {
    if (!item) {
      console.error("Item is undefined!");
      return;
    }

    let formData = new FormData();
    const applicationNo =
      policyDetails?.policyDetailsObj?.identifiers?.applicationNo;
    formData.append("File", file, `${applicationNo}/${file.name}`);
    apiCalls.fileUpload(formData).then((val) => {
      if (val?.data) {
        const newDocumentObj = {
          IndexName: item?.indexName,
          DocumentName: file?.name,
          UserID: loginInfo?.userProfileInfo?.profileObj?.userName,
          UploadedBy: loginInfo?.userProfileInfo?.profileObj?.name,
          UploadedOn: new Date(),
          DocumentSize: file?.size,
          FileLocation: `/${policyDetails?.policyDetailsObj?.identifiers?.applicationNo}/`,
          BlobFileName: file?.name,
          FileExtnMime: file?.type,
          labelName: item?.label,
        };

        setUploadedFiles1((prevFiles) => [...prevFiles, newDocumentObj]);
        props?.getUploadFiles([...uploadedFiles1, newDocumentObj]); // Pass updated files list
        message.success("File uploaded successfully");
        onSuccess();
      } else {
        message.error("Something went wrong, please try again!");
      }
    });
  };

  const handleRemove = (fileName) => {
    const updatedFiles = uploadedFiles1.filter(
      (file) => file.DocumentName !== fileName
    );
    setUploadedFiles1(updatedFiles);
    props?.getUploadFiles(updatedFiles);
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
      // specialCharacterRegex = /^[a-zA-Z\s]+$/;
      specialCharacterRegex = /^[a-zA-Z\s.'-]+$/;
    } else if (pattern === "decimalOnly") {
      const inputValue = e.target.value;
      if (inputValue.includes(".")) {
        specialCharacterRegex = /^[0-9]$/;
      } else {
        specialCharacterRegex = /^[0-9.]$/;
      }
    } else if (pattern === "NumbersAlphabetscommaonly") {
      specialCharacterRegex = /^[a-zA-Z0-9, ]*$/;
    } else if (pattern === "AlphaNumeric") {
      specialCharacterRegex = /^[a-zA-Z0-9, /_-]*$/;
    } else if (pattern === "addressline") {
      specialCharacterRegex = /^[a-zA-Z0-9 ()]*$/;
    }
    if (
      key === "Backspace" ||
      key.startsWith("Arrow") ||
      e.ctrlKey ||
      e.metaKey
    ) {
      return;
    }

    // Check if the pressed key matches the allowed pattern
    if (!specialCharacterRegex.test(key)) {
      e.preventDefault(); // Prevent the key from being entered into the input field
    }
  };

  const validatePhoneNumber = (_, value) => {
    if (emailExist) {
      return Promise.reject("Mobile number already exists");
    } else if (value && !/^[6-9]\d{9}$/.test(value)) {
      return Promise.reject(
        "Mobile number should start with 6,7,8 or 9 and must be 10 digits"
      );
    } else if (
      value &&
      !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(value)
    ) {
      return Promise.reject("Invalid mobile number");
    } else if (isExistingMobileNumber === value) {
      return Promise.reject("New Details cannot be same as Existing Details");
    } else {
      return Promise.resolve();
    }
  };
  const validatePANNumber = (_, value) => {
    if (emailExist) {
      return Promise.reject("PAN number already exists");
    } else if (
      value &&
      !/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(value?.toUpperCase())
    ) {
      return Promise.reject("Invalid PAN number and must be 10 digits");
    } else {
      return Promise.resolve();
    }
  };

  // const validateGSTINNumber = (_, gstin) => {
  //   const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;

  //   if (!gstin) {
  //     return Promise.resolve("Empty GSTIN"); // Empty GSTIN, resolving the promise with a message
  //   } else if (!gstinRegex.test(gstin)) {
  //     return Promise.reject("Invalid GSTIN Number"); // Invalid GSTIN format, rejecting the promise with an error message
  //   } else {
  //     const gstinWithoutCheckDigit = gstin.substr(0, gstin.length - 1);
  //     const checkDigit = gstin.substr(gstin.length - 1);
  //     const factors = [8, 6, 4, 2, 3, 5, 9, 7];
  //     let total = 0;

  //     for (let i = 0; i < gstinWithoutCheckDigit.length; i++) {
  //       const digit = parseInt(gstinWithoutCheckDigit.charAt(i));
  //       if (!isNaN(digit)) {
  //         total += digit * factors[i % factors.length];  // Invalid characters, rejecting the promise with an error message
  //       }
  //     //  total += digit * factors[i % factors.length]; // Use modulus operator to cycle through factors array
  //     }

  //     const mod = total % 11;
  //     const computedCheckDigit = mod === 0 ? 0 : 11 - mod;

  //     if (parseInt(checkDigit) === computedCheckDigit) {
  //       return Promise.resolve("Valid GSTIN Number"); // Valid GSTIN, resolving the promise with a message
  //     } else {
  //       return Promise.reject("Invalid GSTIN Number"); // Invalid check digit, rejecting the promise with an error message
  //     }
  //   }
  // };

  const validateGSTINNumber = (_, gstin) => {
    const regex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
    if (!gstin) {
      return Promise.resolve("Empty GSTIN"); // Empty GSTIN, resolving the promise with a message
    } else if (!regex.test(gstin)) {
      return Promise.reject("Please enter a valid GSTIN number!");
    } else {
      return Promise.resolve();
    }
  };

  // const validateGSTINNumber = (_, gstin) => {
  //   const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;

  //   if (!gstin) {
  //     return Promise.resolve("Empty GSTIN"); // Empty GSTIN, resolving the promise with a message
  //   } else if (!gstinRegex.test(gstin)) {
  //     return Promise.reject("Invalid GSTIN Number"); // Invalid GSTIN format, rejecting the promise with an error message
  //   } else {
  //     const gstinWithoutCheckDigit = gstin.substr(0, gstin.length - 1);
  //     const checkDigit = gstin.substr(gstin.length - 1);

  //     // Extract PAN from GSTIN
  //     const pan = gstin.substr(2, 10);

  //     const factors = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  //     let total = 0;

  //     for (let i = 0; i < gstinWithoutCheckDigit.length; i++) {
  //       let digit = parseInt(gstinWithoutCheckDigit.charAt(i), 36) - 1; // Convert alphanumeric to number
  //       if (!isNaN(digit)) {
  //         if (i % 2 !== 0) { // Double every alternate digit
  //           digit *= 2;
  //           if (digit > 9) {
  //             digit -= 9; // If the doubled value is greater than 9, subtract 9
  //           }
  //         }
  //         total += digit;
  //       }
  //     }

  //    // const mod = total % 10;
  // const numberAsString = total?.toString();
  // const middleIndex = Math.floor(numberAsString?.length / 2);
  // const mod = parseInt(numberAsString?.charAt(middleIndex));

  //     const computedCheckDigit = mod === 0 ? 0 : 10 - mod;

  //     console.log("Computed Check Digit:", computedCheckDigit); // Debugging: Print computed check digit
  //     console.log("Provided Check Digit:", checkDigit); // Debugging: Print provided check digit

  //     if (parseInt(checkDigit) === (computedCheckDigit + 2)) {
  //       return Promise.resolve("Valid GSTIN Number"); // Valid GSTIN, resolving the promise with a message
  //     } else {
  //       return Promise.reject("Invalid GSTIN Number"); // Invalid check digit, rejecting the promise with an error message
  //     }
  //   }
  // };

  const validateIFSCNumber = (_, value) => {
    if (value && !/^[A-Za-z]{4}[0-9][A-Za-z0-9]{6}$/.test(value)) {
      return Promise.reject(
        "IFSC number must be 11 characters alphanumeric with the 5th character as a digit."
      );
    } else {
      return Promise.resolve();
    }
  };

  const getUploadVal = (item) => {
    const prevUploadFile = form?.getFieldsValue();
    return prevUploadFile ? prevUploadFile[item.name]?.file?.name : "";
  };

  const surrenderReasonsLU = [
    { label: "Financial Problem", value: "FINP" },
    { label: "Personal Reason", value: "PERS" },
    { label: "Service Issue", value: "SEIS" },
    { label: "Medical Reason", value: "MEDR" },
    { label: "Investment in new policy", value: "IINP" },
    { label: "Not Satisfied with Fund value", value: "REASONCD" },
  ];
  // const PPCLU= [
  // // { label: '2000-2001', value: '2001' },
  // // { label: '2001-2002', value: '2002' },
  // // { label: '2002-2003', value: '2003' },
  // // { label: '2003-2004', value: '2004' },
  // // { label: '2004-2005', value: '2005' },
  // // { label: '2005-2006', value: '2006' },
  // // { label: '2006-2007', value: '2007' },
  // // { label: '2007-2008', value: '2008' },
  // // { label: '2008-2009', value: '2009' },
  // // { label: '2009-2010', value: '2010' },
  // // { label: '2010-2011', value: '2011' },
  // // { label: '2011-2012', value: '2012' },
  // // { label: '2012-2013', value: '2013' },
  // // { label: '2013-2014', value: '2014' },
  // // { label: '2014-2015', value: '2015' },
  // // { label: '2015-2016', value: '2016' },
  // // { label: '2016-2017', value: '2017' },
  // // { label: '2017-2018', value: '2018' },
  // // { label: '2018-2019', value: '2019' },
  // // { label: '2019-2020', value: '2020' },
  // // { label: '2020-2021', value: '2021' },
  // { label: '2021-2022', value: '2022' },
  // { label: '2022-2023', value: '2023' },
  // { label: '2023-2024', value: '2024' },
  // { label: '2024-2025', value: '2025' },
  // ];
  const requestTimeLU = [
    { label: "Before 3PM", value: "before3pm" },
    { label: "After 3PM", value: "after3pm" },
  ];
  const surrenderRequestLU = [
    { label: "Surrender", value: "surrender" },
    { label: "Fund Transfer", value: "fundtransfer" },
  ];
  const surrenderForLU = [
    { label: "Fund Transfer", value: "fundtransfer" },
    { label: "Full Surrender", value: "fullsurrender" },
  ];
  const freelookLU = [
    { label: "Fund Transfer", value: "fundtransfer" },
    { label: "Freelook", value: "freelook" },
  ];
  const options2 = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const optionsLU = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];
  const IndustryCheckLU = [
    { label: "Send", value: "send" },
    { label: "Not Send", value: "notsend" },
  ];
  const medicalType = [
    { label: "Home", value: "home" },
    { label: "Centre Visit", value: "centrevisit" },
  ];

  const decisionLU = [
    { label: "Pass", value: "pass" },
    { label: "Fail", value: "fail" },
  ];
  const surrenderReasonLU = [
    { label: "Bank De-Dupe", value: "BankDe-Dupe" },
    { label: "Negative List", value: "NegativeList" },
  ];
  const paymenyViaLU = [
    { label: "Cash", value: "cash" },
    { label: "Cheque", value: "cheque" },
    { label: "Online", value: "online" },
  ];

  const paymentMode = [
    { label: "Bank Account", value: "B" },
    { label: "Cheque", value: "C" },
    { label: "Demand Draft", value: "demanddraft" },
  ];
  const maleSalutationLU = [
    { label: "Mr", value: "Mr" },
    { label: "Master", value: "Master" },
  ];
  const femaleSalutationLU = [
    { label: "Mrs", value: "Mrs" },
    { label: "Ms", value: "Ms" },
  ];
  const relationShipLU = [
    { label: "Father", value: "father" },
    { label: "Mother", value: "mother" },
    { label: "Grand Mother", value: "grandmother" },
    { label: "Grand Father", value: "grandfather" },
    { label: "Others", value: "others" },
  ];

  const selectFund = [{ label: "FINC", value: "FINC" }];

  const newModeLU = [
    { label: "Monthly", value: "12" },
    { label: "Quarterly", value: "04" },
    { label: "Semi Annual", value: "02" },
    { label: "Annual", value: "01" },
  ];
  const cardTypesLU = [
  { label: 'Credit', value: 'credit' },
  { label: 'Debit', value: 'debit' },
  { label: 'Cheque', value: 'cheque' },
  { label: 'NEFT', value: 'neft' },
  { label: 'Cash', value: 'cash' },
]
  const modeTypesLU1 = [
    { label: "Cheque", value: "cheque" },
    { label: "NEFT", value: "neft" },
    { label: "Cash", value: "cash" },
    { label: 'Split', value: 'split' },
  ];
  const repaymentTypesLU = [
    { label: "Complete", value: "complete" },
    { label: "Partial Repayment", value: "partialrepayment" },
  ];

  const preferedDebitDateLU = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
    { label: "13", value: "13" },
    { label: "14", value: "14" },
    { label: "15", value: "15" },
    { label: "16", value: "16" },
    { label: "17", value: "17" },
    { label: "18", value: "18" },
    { label: "19", value: "19" },
    { label: "20", value: "20" },
    { label: "21", value: "21" },
    { label: "22", value: "22" },
    { label: "23", value: "23" },
    { label: "24", value: "24" },
    { label: "25", value: "25" },
    { label: "26", value: "26" },
    { label: "27", value: "27" },
    { label: "28", value: "28" },
    { label: "29", value: "29" },
    { label: "30", value: "30" },
  ];

  const RelationtoLifeAssured = [
    { label: "Life Assured", value: "LifeAssured" },
    { label: "Wife", value: "Wife" },
    { label: "Husband", value: "Husband" },
    { label: "Grand Mother", value: "GrandMother" },
    { label: "Grand Father", value: "GrandParent" },
    { label: "Father", value: "Father" },
    { label: "Mother", value: "Mother" },
    { label: "Legal Heir", value: "LegalHeir" },
  ];
  const ReasonForOwnershipChange = [
    { label: "Death of Proposer", value: "DeathofProposer" },
    // { label: 'Life Assured Turns Major', value: 'LifeAssuredTurnsMajor' },
  ];
  const bankAccType = [
    { label: "Current", value: 1 },
    { label: "Savings", value: 2 },
    { label: "NRI", value: 3 },
  ];
  const assignmentConditionLU = [
    { label: "Love & Affection", value: "loveaffection" },
    { label: "Loan", value: "loan" },
    { label: "Financial Institution", value: "financialinstitute" },
  ];
  const complaintFormLU = [
    { label: "Life Assured", value: "LifeAssured" },
    { label: "Proposer", value: "Proposer" },
    { label: "Nominee", value: "Nominee" },
    { label: "Appointee", value: "Appointee" },
    { label: "Agent", value: "Agent" },
    { label: "Other", value: "Other" },
  ];
  const ReceiptTypeLU = [
    { label: "Renewal", value: "renewal" },
    { label: "New Business", value: "newbusiness" },
  ];
  const PaymentMethod = [
    { label: "NACH", value: "NACH" },
    { label: "Standing Instructions", value: "SI" },
  ];
  const PhysicalDispatchTypeLU = [
    { label: "Re-dispatch", value: "reispatch" },
    { label: "Re-print", value: "reprint" },
  ];
  const DispatchToLU = [
    { label: "Registered Address", value: "registeredaddress" },
    { label: "Branch", value: "branch" },
  ];
  const RevivalPickUpForLU = [
    { label: "Amount", value: "amount" },
    { label: "Cheque", value: "cheque" },
    { label: "DGH", value: "dgh" },
  ];
  const LeadOfLU = [
    { label: "Policy Owner", value: "policyowner" },
    { label: "Referral", value: "referral" },
  ];
  const AnnuityOptionLU = [
    { label: "Life Annutiy", value: "lifeannutiy" },
    {
      label: "Life Annuity with Return of Purchase Price",
      value: "purchaseprice",
    },
  ];
  const AnnuityPaymentLU = [
    { label: "Annual", value: "annual" },
    { label: "Monthly", value: "monthly" },
  ];

  const ClaimType = [
    { label: "DEATH", value: "DEATH" },
    { label: "WOP", value: "WOP" },
    { label: "CI", value: "CI" },
    { label: "TPD", value: "TPD" },
    { label: "Health", value: "Health" },
  ];
  const TypeOfConditionLU = [
    { label: "Minor", value: "Minor" },
    { label: "Moderate", value: "Moderate" },
    { label: "Major", value: "Major" },
  ];
  // const NatureofDeathLU = [
  //   { label: 'Natural', value: 'natural' },
  //   { label: 'Suicide', value: 'suicide' },
  //   { label: 'Accident', value: 'accident' },
  //   { label: 'Murder', value: 'murder' },
  //   { label: 'COVID', value: 'covid' },
  // ]
  // const sourceLimitationLU = [
  //   { label: 'Branch', value: 'branch' },
  //   { label: 'Courier', value: 'courier' },
  //   { label: 'Email', value: 'email' },
  //   { label: 'Website', value: 'website' },
  // ]
  const CIClaimIntimatedByLU = [
    { label: "Life Assured", value: "lifeassured" },
    { label: "Nominee", value: "nominee" },
    { label: "Others", value: "others" },
  ];
  const ClaimIntimatedByLU = [
    { label: "Nominee", value: "nominee" },
    { label: "Others", value: "others" },
  ];

  const ClaimPayoutLU = [
    { label: "Deferred Payout", value: "deferredpayout" },
    { label: "Lumpsum Payout", value: "lumpsumpayout" },
  ];
  // const AssuredIncomePlanLU =[
  //   { label: 'Lumsum', value: 'lumsum' },
  //   { label: 'Annuity', value: 'annuity' },
  // ]

  const Nominee = [
    { label: "One", value: "1" },
    { label: "Two", value: "2" },
    { label: "Three", value: "3" },
    { label: "Four", value: "4" },
    { label: "Five", value: "5" },
  ];
  
  const surrenderreason = [
     { label: "Financial problem", value: "FINP" },
    { label: "Investment in new policy", value: "IINP" },
    { label:"Medical reason" , value: "MEDR"},
    { label:"Personal Reason" , value: "PERS" },
    { label: "Not satisfied with Fund Value"  , value:"REASONCD" },
{ label: "Service Issue"  , value:"SEIS"},
  ]

    const FundTransferType = [
    { label: "Full FundTransfer", value: "Full FundTransfer" },
    { label: "Partial FundTransfer", value: "Partial FundTransfer" },
  ]

  // Function to generate dynamic dropdown options
  const dropdownOptionsMapping = {
    requestsource: requestSourceLU,
    requestchannel: requestModeLU,
    reasonforfreelook: registerModeLU,
    requestvia: requestViaLU,
    custrole: clientRoleLU,
    poscustrole: clientRoleLU,
    request_for: requestForLU,
    requesttime: requestTimeLU,
    requesttimepos: requestTimeLU,
    surrenderfor: surrenderRequestLU,
    reasonforsurrender: surrenderReasonsLU,
    premiumpaidcertificate: PPCLU,
    surrenderpos: surrenderForLU,
    req_via: requestReceivedViaLU,
    acc_type_new: bankAccTypeLU,
    posacc_type_new: bankAccTypeLU,
    posaccounttype: bankAccTypeLU,
    acc_type_old: bankAccTypeLU,
    accounttype: bankAccTypeLU,
    decision: decisionLU,
    options2: options2,
    outofrevival: options2,
    paymentvia: paymenyViaLU,
    panaadhaarlinked: options2,
    stpfailedreason: surrenderReasonLU,
    action: callRelatedActionLU,
    selectportalissue: cursorPortalLU,
    websiteportalissue: websitePortalLU,
    freelookrequestfor: freelookLU,
    customerquerytopic: customerQueryLU,
    fundtransfer: options2,
    ispolicywithinfreelook: options2,
    policyredispatch: options2,
    rtostatus: options2,
    iscustomerretained: options2,
    paymentmode: paymentMode,
    pannumberof: panUpdateLU,
    // salutation_new: ClientGender === "M" ? maleSalutationLU : ClientGender === "F" ? femaleSalutationLU :[],
    relationshipwithpolicyowner: relationShipLU,
    gstintobeupdatefor: clientRoleLU,
    //update_new: clientRoleLU,
    panupdatefor_old: clientRoleLU,
    panupdatefor_new: clientRoleLU,
    processname: isProcessNameLU,
    sisdocumenttype: sisLU,
    appointerealtionshipwithpolicyowner_new: appointeerelationShipLU,
    reasonforpartialwithdrawal: surrenderReasonsLU,
    selectfund: selectFund,
    changeinlast60days: options2,
    policyloggedlast: options2,
    home_medical: medicalType,
    mode_new: isUpdateModeLU,
    cardtype: cardTypesLU,
    modeofrepayment: modeTypesLU1,
    preferreddebitdate: preferedDebitDateLU,
    relationtolifeassured: RelationtoLifeAssured,
    reasonforownershipchange: ReasonForOwnershipChange,
    assignmentcondition_new: assignmentConditionLU,
    existingclient: options2,
    complaintform: complaintFormLU,
    cheque_received_at_ho: options2,
    receipttype: ReceiptTypeLU,
    paymentmethod: PaymentMethod,
    chequereceivedatho: options2,
    stampdutychargesreceived: options2,
    physicaldispatchtype: PhysicalDispatchTypeLU,
    dispatchto: DispatchToLU,
    revivalpickupfor: RevivalPickUpForLU,
    leadof: LeadOfLU,
    selectannuityoption: AnnuityOptionLU,
    frequencyofannuitypayment: AnnuityPaymentLU,
    newsurivalfrequency: isUpdateModeLU,
    policycontinuance: policyContinueLU,
    claimtype: ClaimType,
    typeofcondition: TypeOfConditionLU,
    nominee: Nominee,
    dghrequired: options2,
    natureofdeath: natureOfDeathLU,
    causeofevent: causeOfEventLU,
    sourceofintimation: sourceInformationLU,
    claimintimatedby:
      ClaimTypee === "CI" || ClaimTypee === "TPD"
        ? CIClaimIntimatedByLU
        : ClaimIntimatedByLU,
    assuredincomeplan: assuredIncomePlanLU,
    policytype: policyTypeLU,
    claimcategory: claimCategoryLU,
    claimsapplicable: options2,
    policybondavailable: optionsLU,
    industrycheck: IndustryCheckLU,
    uwdecision: uwDecisionLU,
    uwdecision1: uwDecisionNewLU,
    islanomineeaddresssame: laNomineeAddressLU,
    selectsubstage: subStageLU,
    assesorsdecision: assessorsDecisionLU,
    assesorsrecommendation: assessorsDecisionLU,
    decisiondescription: decisionDescriptionLU,
    checkerdecisiondescription: checkerDecisionDescriptionLU,
    policystatusondateofdeath: policyStatusDOBLU,
    paymentreasoncode: paymentReasonCodeLU,
    coveragenameofproduct: coverageNameofProductLU,
    claimpaymentmethod: claimPaymentMethodLU,
    organtype: organCategoryCodeLU,
    healthclaimcondition: healthClaimCodeLU,
    approverdecision: assessorsDecisionLU,
    repaymenttype: repaymentTypesLU,
    iibdatabasecheck: dataBseCHeckLU,
    claimhotspotcheck: hotSpotCheckLU,
    renewalpaymentpendingforrealization: options2,
    refercaseto: referCaseToLU,
    withdgh: withDGHLU,
    reinstatementdecision: reinstatementDecisionLU,
    selectinvestigator: investigatorLU,
    selectreinvestigator: investigatorLU,
    policywasreinstated: options2,
    //decisiondescription: subDescriptionLU,
    salutation: salutationLU,
    salutation_new: salutationLU,
    appointesalutation_old: salutationLU,
    appointesalutation_new: salutationLU,
    maritialstatus: martialStatusLU,
    update_existing: clientListLU,
    modifiedclientid: clientListLU,
    approverdecisiondescription: decisionDescriptionLU,
    claimspayout: ClaimPayoutLU,
    surrenderreason:surrenderreason,
    fundtransfertype:FundTransferType
  };

  const getDropdownOptions = (name) => {
    const lowerCaseName = name.toLowerCase();

    if (lowerCaseName === "marital_new") {
      return [
        {
          name: "Married",
          label: "Married",
          value: "Married",
        },
        {
          name: "Unmarried",
          label: "Unmarried",
          value: "Unmarried",
        },
      ];
    } else if (lowerCaseName === "gender") {
      return [
        {
          name: "Male",
          label: "Male",
          value: "Male",
        },
        {
          name: "female",
          label: "female",
          value: "female",
        },
      ];
    } else if (lowerCaseName === "checkerdecisiondescription") {
      return checkerDecisionDescriptionLU || [];
    } else {
      return dropdownOptionsMapping[lowerCaseName] || [];
    }
  };
  const getDropdownOptionsWithIcons = (name) => {
    // Example options with icons
    return [
      {
        value: "yes",
        label: (
          <>
            <CheckCircleOutlined style={{ color: "green", marginRight: 8 }} />
            Yes
          </>
        ),
      },
      {
        value: "no",
        label: (
          <>
            <CloseCircleOutlined style={{ color: "red", marginRight: 8 }} />
            No
          </>
        ),
      },
    ];
  };
  const getSuffixIcon = (value) => {
    switch (value) {
      case "yes":
        return <CheckCircleOutlined style={{ color: "green" }} />;
      case "no":
        return <CloseCircleOutlined style={{ color: "red" }} />;
      default:
        return <UserOutlined />;
    }
  };
  return (
    <>
      <Row gutter={[16, 16]} className="reasons-list">
        {data?.map((item, index) => (
          <>
            {/* {(item?.defaultShow||item?.isShow) && <> */}
            {item.inputType === "title" && !item?.hide && (
              <>
                <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
                  <h4 className="subtype-headings fs-16 fw-500" key={index}>
                    {item.label}

                    {item?.icon === "edit" && (
                      <>
                        {" "}
                        {Edit && (
                          <EditOutlined
                            onClick={() => {
                              handleEdit("edit", item);
                              setIsEdit(false);
                            }}
                            className="editIconn"
                          />
                        )}
                        {!Edit && (
                          <CloseOutlined
                            onClick={() => {
                              handleEdit("close", item);
                              setIsEdit(true);
                            }}
                            className="editIconn"
                          />
                        )}
                      </>
                    )}
                  </h4>
                </Col>
              </>
            )}
            {item.inputType === "button" && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <div className="common-btn" key={index}>
                    <Button
                      type="primary"
                      className="primary-btn panvalidate-btn"
                    >
                      {item.label}
                    </Button>
                  </div>
                </Col>
              </>
            )}
            {item.inputType === "radios" && (
              <>
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={12}
                  xxl={12}
                  //  offset={1}
                >
                  <div key={index} className="radios-wrap">
                    <Form.Item
                      label={
                        <span>
                          {item.label}
                          {item.required && <sup>*</sup>}
                        </span>
                      }
                      name={item.name}
                      className="inputs-label fs-14 fw-400"
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
                        },
                        { whitwspace: item?.required },
                      ]}
                    >
                      <Radio.Group
                        className={item.class}
                        onChange={onRadioGroupChange}
                        value={item?.value}
                        options={item?.options}
                      ></Radio.Group>
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}
            {item.inputType === "radio" && !item?.hide && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <div key={index}>
                    <Form.Item
                      label={
                        <span>
                          {item.label}
                          {item.required && <sup>*</sup>}
                        </span>
                      }
                      name={item.name}
                      className={`inputs-label radio-grp fs-16 fw-400 ${item?.class}`}
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
                        },
                        { whitwspace: item?.required },
                      ]}
                    >
                      <Radio.Group
                        onChange={(e) => handleRadioChange(e, item)}
                        className="radio-check"
                      >
                        <Radio
                          value={item?.radioValue}
                          className={`fs-16 fw-400 ${item?.class}`}
                          disabled={
                            (item?.radioValue === "otp" && disableOTP) ||
                            item?.disabled
                          }
                        >
                          {item?.title}
                        </Radio>
                        <Radio
                          value={item?.secondRadioValue}
                          className={`fs-16 fw-400 ${item.class}`}
                          disabled={
                            item?.disabled ||
                            (item.label === "Customer Choice" &&
                              disableRequestForm)
                          }
                        >
                          {item?.secondTitle}
                        </Radio>
                        {/* Only render 3rd radio for ValidateSignature */}
                        {item?.name === "ValidateSignature" && (
                          <Radio
                            value={item?.thirdRadioValue}
                            className={`fs-16 fw-400 ${item.class}`}
                            disabled={item?.disabled}
                          >
                            {item?.thirdTitle}
                          </Radio>
                        )}
                      </Radio.Group>
                    </Form.Item>
                    {item?.radioText === "Check Agent Signature in DMS" ? (
                      <>
                        <p className="radio-link">
                          <a className="radio-txt1">{item?.radioText}</a>
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="radio-link">
                          <a className="radio-txt">{item?.radioText}</a>
                        </p>
                      </>
                    )}
                  </div>
                </Col>
              </>
            )}
            {item.inputType === "date" && !item?.hide && (
              <>
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={12}
                  xxl={12}
                  className="date-picker"
                >
                  <div key={index}>
                    <Form.Item
                      label={
                        <span>
                          {item.label}
                          {item.required && <sup>*</sup>}
                        </span>
                      }
                      name={item.name}
                      className="inputs-label mb-0"
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
                        },
                      ]}
                    >
                      <DatePicker
                        allowClear={false}
                        style={{ width: "100%" }}
                        className="cust-input"
                        format={dateFormat}
                        handleDate={handleDate}
                        checked={dateRangeChecked}
                        onChange={(e) => handleDateChange(e, item.name)}
                        disabled={item?.disabled}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}
            {item.inputType === "nofuturedates" && !item?.hide && (
              <>
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={12}
                  xxl={12}
                  className="date-picker"
                >
                  <div key={index}>
                    <Form.Item
                      label={
                        <span>
                          {item.label}
                          {item.required && <sup>*</sup>}
                        </span>
                      }
                      name={item.name}
                      className="inputs-label mb-0"
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
                        },
                      ]}
                    >
                      <DatePicker
                        allowClear={false}
                        disabledDate={(e) => disabledDate(e, item)}
                        style={{ width: "100%" }}
                        className="cust-input date-color"
                        format={dateFormat}
                        handleDate={handleDate}
                        checked={dateRangeChecked}
                        onChange={(e) => handleDateChange(e, item.name)}
                        disabled={item?.disabled}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}
            {item.inputType === "futuredates" && !item?.hide && (
              <>
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={12}
                  xxl={12}
                  className="date-picker"
                >
                  <div key={index}>
                    <Form.Item
                      label={
                        <span>
                          {item.label}
                          {item.required && <sup>*</sup>}
                        </span>
                      }
                      name={item.name}
                      className="inputs-label mb-0"
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
                        },
                      ]}
                    >
                      <DatePicker
                        allowClear={false}
                        disabledDate={(e) =>
                          props?.featuredatedisabled(e, item)
                        }
                        style={{ width: "100%" }}
                        className="cust-input date-color"
                        format={dateFormat}
                        handleDate={handleDate}
                        checked={dateRangeChecked}
                        onChange={(e) => props?.handleDateChange(e, item.name)}
                        disabled={item?.disabled}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}
            {item.inputType === "todaydate" && !item?.hide && (
              <>
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={12}
                  xxl={12}
                  className="date-picker"
                >
                  <div key={index}>
                    <Form.Item
                      label={
                        <span>
                          {item.label}
                          {item.required && <sup>*</sup>}
                        </span>
                      }
                      name={item.name}
                      className="inputs-label mb-0"
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
                        },
                      ]}
                    >
                      <DatePicker
                        allowClear={false}
                        disabledDate={(e) => props?.todaydatedisabled(e, item)}
                        style={{ width: "100%" }}
                        className="cust-input"
                        format={dateFormat}
                        handleDate={handleDate}
                        checked={dateRangeChecked}
                        onChange={(e) =>
                          props?.handleTodayDateChange(e, item.name)
                        }
                        disabled={item?.disabled}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}
            {item.inputType === "text" && !item?.hide && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <div key={index}>
                    <Form.Item
                      label={
                        item.hyperLink ? (
                          <a
                            onClick={() => handleLabelLink(item)}
                            style={{ color: "#b3201f" }}
                            className="text-label"
                          >
                            <span>
                              {item.label}
                              {item.required && <sup>*</sup>}
                            </span>
                          </a>
                        ) : (
                          <span>
                            {item.label}
                            {item.required && <sup>*</sup>}
                          </span>
                        )
                      }
                      name={item.name}
                      className="inputs-label mb-0"
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
                        },
                        // { min: item?.minlength, message: item?.message }
                        ...(item.name === "FirstName_New" ||
                        item.name === "LastName_New"
                          ? [
                              {
                                validator: (_, value) => {
                                  if (!value) return Promise.resolve();
                                  // Only allow alphabets and spaces
                                  if (/[^a-zA-Z .]/.test(value)) {
                                    return Promise.reject(
                                      item.name === "FirstName_New"
                                        ? "First Name should not contain special characters or symbols except '.'"
                                        : "Last Name should not contain special characters or symbols except '.'"
                                    );
                                  }
                                  // If only one character, must end with '.'
                                  if (value.length === 1 && value !== ".") {
                                    return Promise.reject(
                                      item.name === "FirstName_New"
                                        ? "If only one character, please enter '.' after the character (e.g., 'A.')"
                                        : "If only one character, please enter '.' after the character (e.g., 'A.')"
                                    );
                                  }
                                   // If only a single dot, require double dot
                                  if (value === ".") {
                                    return Promise.reject(
                                      item.name === "FirstName_New"
                                        ? "Single '.' is not allowed. Please enter '..' if you intend to use only dots."
                                        : "Single '.' is not allowed. Please enter '..' if you intend to use only dots."
                                    );
                                  }
                                  return Promise.resolve();
                                },
                              },
                            ]
                          : []),
                      ]}
                    >
                      {item?.pattern && (
                        <>
                          <Input
                            placeholder={item.placeholder || item.label}
                            className="cust-input"
                            maxLength={item?.maxlength}
                            minLength={item?.minlength}
                            disabled={item?.disabled}
                            onKeyDown={(e) => handleKeyDown(item.pattern, e)}
                            onBlur={(e) => onBlurInput(e.target.value, item)}
                          />
                        </>
                      )}

                      {!item?.pattern && item?.label?.includes("IFSC") && (
                        <>
                          <Input
                            placeholder={item.placeholder || item.label}
                            className="cust-input"
                            minLength={item?.minlength}
                            maxLength={item?.maxlength}
                            disabled={item?.disabled}
                            onChange={(e) => props?.handleInputChange(e, item)}
                          />
                        </>
                      )}
                      {item?.isLandMark && (
                        <>
                          <Input
                            placeholder={item.placeholder || item.label}
                            className="cust-input"
                            maxLength={item?.maxlength}
                            minLength={item?.minlength}
                            disabled={item?.disabled}
                            onChange={(e) => handleAddLandMarkText(e, item)}
                            //value={item.value}
                          />
                        </>
                      )}
                      {!item?.pattern &&
                        !item?.label?.includes("IFSC") &&
                        !item?.isLandMark && (
                          <>
                            <Input
                              placeholder={item.placeholder || item.label}
                              className="cust-input"
                              maxLength={item?.maxlength}
                              minLength={item?.minlength}
                              disabled={item?.disabled}
                              onBlur={(e) => onBlurInput(e.target.value, item)}
                              value={item.value}
                            />
                          </>
                        )}
                      {item?.hyperLinks && (
                        <>
                          <a
                            className="link-txt"
                            onClick={() => handleLinkValue(item)}
                          >
                            {item?.hyperLinks?.toLowerCase() === "send" ? (
                              <span>
                                {item?.hyperLinks}{" "}
                                <span className="link-txt">
                                  <i className="bi bi-send"></i>
                                </span>
                              </span>
                            ) : (
                              item?.hyperLinks
                            )}
                          </a>
                        </>
                      )}
                    </Form.Item>
                    {item?.linkValue && (
                      <>
                        <p className="label-link">
                          <a
                            className="link-txt"
                            onClick={() => handleLinkValue(item)}
                          >
                            {item?.linkValue}
                            {item?.icon === "upload" && (
                              <UploadOutlined className="uploadIcon" />
                            )}
                          </a>
                        </p>
                      </>
                    )}
                  </div>
                </Col>
              </>
            )}
            {item.inputType === "agentcode" && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <div key={index}>
                    <Form.Item
                      label={
                        <span>
                          {item.label}
                          {item.required && <sup>*</sup>}
                        </span>
                      }
                      name={item.name}
                      className="inputs-label mb-0"
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
                        },
                      ]}
                    >
                      <Input
                        placeholder={item.placeholder || item.label}
                        className="cust-input"
                        maxLength={item?.maxlength}
                        minLength={item?.minlength}
                        disabled={item?.disabled}
                        onBlur={(e) =>
                          props?.handleAgentCode(e.target.value, item)
                        }
                        //value={item.value}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}

            {item.inputType === "number" && !item?.hide && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <div key={index}>
                    <Form.Item
                      label={
                        <span>
                          {item.label}
                          {item.required && <sup>*</sup>}
                        </span>
                      }
                      name={item.name}
                      className="inputs-label mb-0"
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
                        },
                        { min: item?.minlength, message: item?.message },
                      ]}
                    >
                      <Input
                        placeholder={item.placeholder || item.label}
                        className="cust-input"
                        maxLength={item?.maxlength}
                        minLength={item?.minlength}
                        disabled={item?.disabled}
                        onBlur={(e) => onBlurInput(e.target.value, item)}
                        onKeyDown={(e) => handleKeyDown(item.pattern, e)}
                        //value={item.value}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}
            {item.inputType === "decimal" && !item?.hide && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <div key={index}>
                    <Form.Item
                      label={
                        <span>
                          {item.label}
                          {item.required && <sup>*</sup>}
                        </span>
                      }
                      name={item.name}
                      className="inputs-label mb-0"
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
                        },
                        { min: item?.minlength, message: item?.message },
                      ]}
                    >
                      <Input
                        placeholder={item.placeholder || item.label}
                        className="cust-input"
                        maxLength={item?.maxlength}
                        minLength={item?.minlength}
                        disabled={item?.disabled}
                        onBlur={(e) => onBlurInput(e.target.value, item)}
                        onKeyDown={(e) => handleKeyDown(item.pattern, e)}
                        //value={item.value}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}

            {item.inputType === "phonenumber" && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <div key={index}>
                    <Form.Item
                      label={
                        <span>
                          {item.label}
                          {item.required && <sup>*</sup>}
                        </span>
                      }
                      name={item.name}
                      className="inputs-label mb-0"
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
                        },
                        {
                          validator: validatePhoneNumber,
                        },
                      ]}
                    >
                      <Input
                        placeholder={item.placeholder || item.label}
                        className="cust-input"
                        maxLength={item?.maxlength}
                        minLength={item?.minlength}
                        disabled={item?.disabled}
                        onKeyDown={(e) => handleKeyDown(item.pattern, e)}
                        //value={item.value}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}

            {item.inputType === "gstinnumber" && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <div key={index}>
                    <Form.Item
                      label={
                        <span>
                          {item.label}
                          {item.required && <sup>*</sup>}
                        </span>
                      }
                      name={item.name}
                      className="inputs-label mb-0"
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
                        },
                        {
                          validator: validateGSTINNumber,
                        },
                      ]}
                    >
                      <Input
                        placeholder={item.placeholder || item.label}
                        className="cust-input"
                        maxLength={item?.maxlength}
                        minLength={item?.minlength}
                        disabled={item?.disabled}
                        //value={item.value}
                        onBlur={(e) => {
                          // Handle onBlur event
                          onBlurInput(e.target.value, item);
                          // Ensure the input value remains unchanged on blur
                          // This prevents the last letter from being removed
                          // setInputValue(e.target.value);
                          e.target.value = e.target.value;
                        }}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}
            {item.inputType === "ifsccodenumber" && !item.hide && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <div key={index}>
                    <Form.Item
                      label={
                        <span>
                          {item.label}
                          {item.required && <sup>*</sup>}
                        </span>
                      }
                      name={item.name}
                      className="inputs-label mb-0"
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
                        },
                        {
                          validator: validateIFSCNumber,
                        },
                      ]}
                    >
                      <Input
                        placeholder={item.placeholder || item.label}
                        className="cust-input upper"
                        minLength={item?.minlength}
                        maxLength={item?.maxlength}
                        disabled={item?.disabled}
                        onChange={(e) => props?.handleInputChange(e, item)}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}
            {item.inputType === "email" && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <div key={index}>
                    <Form.Item
                      label={
                        <span>
                          {item.label}
                          {item.required && <sup>*</sup>}
                        </span>
                      }
                      name={item.name}
                      className="inputs-label mb-0"
                      type="email"
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
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
                            } else if (
                              isExistingMobileNumber?.toLowerCase() ===
                              value?.toLowerCase()
                            ) {
                              return Promise.reject(
                                "New Details cannot be same as Existing Details"
                              );
                            } else {
                              return Promise.resolve();
                            }
                          },
                        },
                      ]}
                    >
                      <Input
                        placeholder={item.placeholder || item.label}
                        className="cust-input"
                        maxLength={item?.maxlength}
                        minLength={item?.minlength}
                        disabled={item?.disabled}
                        //value={item.value}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}
            {item.inputType === "checkbox" && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  {" "}
                  <div key={index}>
                    <Form.Item label={item.label} name={item.name}>
                      <Checkbox.Group
                        options={options}
                        defaultValue={["SMS"]}
                        onChange={handleCheckBox}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}
            {item.inputType === "dropdown" && !item?.hide && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <div key={index}>
                    <Form.Item
                      label={
                        <span>
                          {item.label}
                          {item.required && <sup>*</sup>}
                        </span>
                      }
                      style={item.customStyle || {}}
                      name={item.name}
                      className="inputs-label mb-0"
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
                        },
                      ]}
                    >
                      <Select
                        className="cust-input"
                        maxLength={100}
                        allowClear={true}
                        placeholder={item.placeholder}
                        style={item.customStyle || { width: "100%" }}
                        onChange={(e) => handleDropdownChange(e, item)}
                        disabled={item?.disabled}
                        options={getDropdownOptions(item.name)}
                      ></Select>
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}
            {item.inputType === "subdropdown" && !item?.hide && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <div key={index}>
                    <Form.Item
                      label={
                        <span>
                          {item.label}
                          {item.required && <sup>*</sup>}
                        </span>
                      }
                      name={item.name}
                      className="inputs-label mb-0"
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
                        },
                      ]}
                    >
                      <Select
                        className="cust-input"
                        maxLength={100}
                        allowClear={true}
                        placeholder={item.placeholder}
                        onChange={(value, option) =>
                          handleSubDropdownChange(value, option, item)
                        }
                        disabled={item?.disabled}
                        options={getDropdownOptions(item.name)}
                      ></Select>
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}
            {item.inputType === "dropdownList" && !item?.hide && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <div key={index}>
                    <Form.Item
                      label={
                        <span>
                          {item.label}
                          {item.required && <sup>*</sup>}
                        </span>
                      }
                      name={item.name}
                      className="inputs-label mb-0"
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
                        },
                      ]}
                    >
                      <Select
                        className="cust-input"
                        maxLength={100}
                        allowClear={true}
                        placeholder={item.placeholder}
                        onChange={(e) => handleDropdownChange(e, item)}
                        disabled={item?.disabled}
                        suffixIcon={getSuffixIcon(
                          item.name === "yes" ? "yes" : "no"
                        )}
                        options={getDropdownOptions(item.name)}
                      ></Select>
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}

            {item.inputType === "upload" && !item?.hide && (
              <Col xs={24} sm={24} md={12} lg={12} xxl={12} key={index}>
                <Form.Item
                  label={
                    <span>
                      {item.label}
                      {item.required && <sup>*</sup>}
                    </span>
                  }
                  name={item.name}
                  className="inputs-label mb-0"
                  rules={[
                    {
                      required: item?.required,
                      message: item?.validationmsg,
                    },
                  ]}
                >
                  <Upload
                    {...uploadProps}
                    accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG, .PDF, .pdf, .TIFF, .tiff"
                    customRequest={({ file, onSuccess }) =>
                      uploadProps.customRequest({
                        file,
                        onSuccess,
                        index,
                        item,
                      })
                    }
                    //onChange={(info) => handleFileUpload(info, index)}
                    onChange={(props) => handleUpload(props)}
                    action={uploadURL}
                  >
                    <Input
                      placeholder={item.placeholder}
                      type="text"
                      className="cust-input upload-column"
                      size="small"
                      value={
                        showUploadFile === index
                          ? uploadFiles.name
                          : getUploadVal(item)
                      }
                      suffix={!props?.hideUploadOption && suffix}
                    />
                  </Upload>
                </Form.Item>
                {item?.linkValue && (
                  <div className="label-link">
                    {!showPOSScreen && (
                      <>
                        <a
                          className="link-txt"
                          onClick={() => handleUploadLink()}
                        >
                          {item?.linkValue}
                        </a>
                      </>
                    )}
                  </div>
                )}
              </Col>
            )}

            {item.inputType === "multi-upload" && !item?.hide && (
              <Col xs={24} sm={24} md={12} lg={12} xxl={12} key={index}>
                <Form.Item
                  label={
                    <span>
                      {item.label}
                      {item.required && <sup>*</sup>}
                    </span>
                  }
                  name={item.name}
                  className="inputs-label mb-0"
                  rules={[
                    {
                      required: item?.required,
                      message: item?.validationmsg,
                    },
                  ]}
                >
                  <Upload
                    {...uploadMultipleProps}
                    accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,.pdf,.TIFF,.tiff,.mp4,.mp3,.MP4,.MP3"
                    customRequest={({ file, onSuccess }) =>
                      uploadMultipleProps.customRequest({
                        file,
                        onSuccess,
                        index,
                        item,
                      })
                    }
                    //onChange={(info) => handleFileUpload(info, index)}
                    onChange={(props) => handleMultipleUpload(props)}
                    action={uploadURL}
                  >
                    <Input
                      placeholder={item.placeholder}
                      type="text"
                      className="cust-input upload-column"
                      size="small"
                      value={
                        showUploadFile === index
                          ? uploadFiles.name
                          : getUploadVal(item)
                      }
                      suffix={!props?.hideUploadOption && suffix}
                    />
                  </Upload>
                </Form.Item>
                {item?.linkValue && (
                  <div className="label-link">
                    {!showPOSScreen && (
                      <>
                        <a
                          className="link-txt"
                          onClick={() => handleUploadLink()}
                        >
                          {item?.linkValue}
                        </a>
                      </>
                    )}
                  </div>
                )}
              </Col>
            )}

            {item.inputType === "texts" && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <div key={index}></div>
                </Col>
              </>
            )}

            {item.inputType === "icon" && !item?.hide && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <div key={index}>
                    <Form.Item
                      label={
                        <span>
                          {item.label}
                          {item.required && <sup>*</sup>}
                        </span>
                      }
                      name={item.name}
                      className="inputs-label mb-0"
                    >
                      <div
                        className={
                          props?.fullWidth
                            ? "d-flex kyc-btn btn-lgwidth"
                            : "d-flex kyc-btn btn-smwidth"
                        }
                      >
                        <Button
                          type="primary"
                          className="primary-btn ml-16 mr-6 mt-0"
                        >
                          {!props?.isShowPOSOwnership
                            ? "Update Address"
                            : "View New Address"}
                        </Button>
                      </div>
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}
            {item.inputType === "link" && !item?.hide && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <div key={index}>
                    <Form.Item
                      label={
                        <span>
                          {item.label}
                          {item.required && <sup>*</sup>}
                        </span>
                      }
                      name={item.name}
                      className="inputs-label mb-0"
                    >
                      {item.linkValue?.toLowerCase() === "view" ? (
                        <span
                          className="link-txt"
                          onClick={() => handleTextLink(item)}
                        >
                          {item.linkValue}
                        </span>
                      ) : (
                        <a
                          className="link-txt"
                          onClick={() => handleTextLink(item)}
                        >
                          {item.linkValue?.slice(0, 35)}
                        </a>
                      )}
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}

            {item.inputType === "titlecheckbox" && (
              <>
                {item?.loan && (
                  <>
                    <Col
                      xs={24}
                      sm={24}
                      md={8}
                      lg={8}
                      xxl={8}
                      className="loan-checkboxes"
                    >
                      <div key={index}>
                        <h4 className="fs-14 fw-500 checkbox-gap">
                          {item.label}
                          <span
                            className={
                              item.label?.indexOf("Date Range") > -1
                                ? "date-range-checkbox"
                                : "title-checkbox"
                            }
                          >
                            <Checkbox
                              type="checkbox"
                              onChange={(e) => handleTitleCheckBox(e, item)}
                              checked={
                                props?.existingLoanCheck
                                  ? (item.label?.includes(
                                      "View Existing loan Details"
                                    ) ||
                                      item.label?.includes(
                                        "Share Nominee Change Process"
                                      )) &&
                                    props?.checked
                                  : props?.eligibleLoanCheck
                                  ? (item.label?.includes(
                                      "View Eligible Loan Details"
                                    ) ||
                                      item.label?.includes(
                                        "Share Nominee Request Form"
                                      )) &&
                                    props?.checked
                                  : props?.shareProcessCheck
                                  ? (item.label?.includes(
                                      "Share Statement / Link"
                                    ) ||
                                      item.label?.includes(
                                        "Share List of Proofs"
                                      ) ||
                                      item.label?.includes(
                                        "Share Statement Links"
                                      )) &&
                                    props?.checked
                                  : false
                              }
                            />
                          </span>
                        </h4>
                      </div>
                    </Col>
                  </>
                )}
                {!item?.loan && (
                  <>
                    <Col
                      xs={24}
                      sm={24}
                      md={12}
                      lg={12}
                      xxl={12}
                      className="loan-checkboxes"
                    >
                      <div key={index}>
                        <h4 className="fs-14 fw-500 checkbox-gap">
                          {item.label}
                          <span
                            className={
                              item.label?.indexOf("Date Range") > -1
                                ? "date-range-checkbox"
                                : "title-checkbox"
                            }
                          >
                            {props?.subType === "changeinsignature" && (
                              <>
                                <Checkbox
                                  type="checkbox"
                                  onChange={(e) => handleTitleCheckBox(e, item)}
                                  checked={props?.selectCheckBox === item.name}
                                />
                              </>
                            )}
                            {props?.subType !== "changeinsignature" && (
                              <>
                                {" "}
                                <Checkbox
                                  type="checkbox"
                                  onChange={(e) => handleTitleCheckBox(e, item)}
                                  checked={
                                    item?.name?.toLowerCase() === "isdaterange"
                                      ? props?.showDateRangeFields
                                      : item?.name?.toLowerCase() ===
                                        "lastpaymentreceipt"
                                      ? props?.showPaymentCheckBox
                                      : item?.name?.includes(
                                          "shareClaimProcess"
                                        )
                                      ? isChecked
                                      : props?.selectCheckBox
                                  }
                                />
                              </>
                            )}
                          </span>
                        </h4>
                      </div>
                    </Col>
                  </>
                )}
              </>
            )}
            {item.inputType === "textarea" && !item?.hide && (
              <>
                <Col
                  xs={24}
                  sm={24}
                  md={item.name !== "ReferrelComments" ? 12 : 24}
                  lg={item.name !== "ReferrelComments" ? 12 : 24}
                  xxl={item.name !== "ReferrelComments" ? 12 : 24}
                >
                  <div key={index} className="text-area">
                    <Form.Item
                      label={
                        <span>
                          {item.label}
                          {item.required && <sup>*</sup>}
                        </span>
                      }
                      name={item.name}
                      className="inputs-label mb-0"
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
                        },
                        { max: item?.maxlength, message: item?.message },
                      ]}
                    >
                      <TextArea
                        rows={2}
                        disabled={item?.disabled}
                        maxLength={item?.maxlength}
                        placeholder={item.placeholder}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}
            {item.inputType === "textbox" && (
              <>
                <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
                  <div key={index} className="address-textbox">
                    <Form.Item
                      name={item.name}
                      className=""
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
                        },
                        { max: item?.maxlength, message: item?.message },
                      ]}
                    >
                      <TextArea
                        value={item?.address}
                        maxLength={item?.maxlength}
                        placeholder={item.placeholder}
                        autoSize={{ minRows: 2, maxRows: 6 }}
                        disabled={item?.disabled}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}
            {item.inputType === "icons" && !item?.hide && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <div key={index} className="">
                    <Form.Item
                      label={
                        <span>
                          {item.label}
                          {item.required && <sup>*</sup>}
                        </span>
                      }
                      name={item.name}
                      className="inputs-label mb-0"
                    >
                      <Space className="payment-icons">
                        <Tooltip title="Email Address">
                          <span
                            className="delete-disable"
                            disabled={
                              (props?.activeMobileIcons?.length > 0 &&
                                !props?.activeMobileIcons[index]) ||
                              (props?.activeEmailIcons?.length > 0 &&
                                !props?.activeEmailIcons[index]) ||
                              (props?.activeWhatsAppIcons?.length > 0 &&
                                !props?.activeWhatsAppIcons[index])
                            }
                          >
                            <span
                              className={`bi bi-envelope-paper ${
                                (props?.activeEmailIcons?.length > 0 &&
                                  props?.activeEmailIcons[index]) ||
                                props?.showEmailAddress
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() =>
                                toggleInputField("email", item, index)
                              }
                            ></span>
                          </span>
                        </Tooltip>

                        {props?.subType === "touchpointinformation" && (
                          <>
                            <Tooltip title="Mobile Number">
                              <span
                                className="delete-disable"
                                disabled={
                                  (props?.activeMobileIcons?.length > 0 &&
                                    !props?.activeMobileIcons[index]) ||
                                  (props?.activeEmailIcons?.length > 0 &&
                                    !props?.activeEmailIcons[index]) ||
                                  (props?.activeWhatsAppIcons?.length > 0 &&
                                    !props?.activeWhatsAppIcons[index])
                                }
                              >
                                <span
                                  className={`bi bi-chat-dots ${
                                    (props?.activeMobileIcons?.length > 0 &&
                                      props?.activeMobileIcons[index]) ||
                                    props?.showPhoneNumber
                                      ? "active"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    toggleInputField("phone", item, index)
                                  }
                                ></span>
                              </span>
                            </Tooltip>
                          </>
                        )}

                        {/* <Tooltip title="WhatsApp Number">
        <span className="delete-disable"
                disabled={(props?.activeMobileIcons?.length>0 && !props?.activeMobileIcons[index]) || (props?.activeEmailIcons?.length>0 && !props?.activeEmailIcons[index])
                  || (props?.activeWhatsAppIcons?.length>0 && !props?.activeWhatsAppIcons[index])}
                  >
          <span
                    className={`bi bi-whatsapp ${(props?.activeWhatsAppIcons?.length>0 &&props?.activeWhatsAppIcons[index] || props?.showWhatsApp) ? 'active' : ''}`}
                    onClick={() =>toggleInputField('whatsapp', item, index)}
                  ></span>
                  </span>
        </Tooltip> */}
                        {/* <Tooltip title="Download">
          <i
                    className={`bi bi-download ${props?.showWhatsApp ? 'active' : ''}`}
                    onClick={() =>toggleInputField('download')}
                  ></i>
        </Tooltip> */}
                      </Space>
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}

            {item.inputType === "surrendericons" && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <div key={index}>
                    <Form.Item
                      label={
                        <span>
                          {item.label}
                          {item.required && <sup>*</sup>}
                        </span>
                      }
                      name={item.name}
                      className="inputs-label mb-0"
                    >
                      <span className="payment-icons">
                        <a
                          className={`bi bi-envelope-paper ${
                            inputValues?.isShowEmailInput &&
                            inputValues?.selectedLabelName === item.label
                              ? "active"
                              : ""
                          }`}
                          onClick={() => {
                            if (
                              !(
                                inputValues?.selectedLabelName &&
                                inputValues?.selectedLabelName !== item.label
                              )
                            ) {
                              handleCheckBoxes("email", item);
                            }
                          }}
                          disabled={
                            inputValues?.selectedLabelName &&
                            inputValues?.selectedLabelName !== item.label
                              ? true
                              : false
                          }
                        ></a>
                        <a
                          className={`bi bi-phone ${
                            inputValues?.isShowSMSInput &&
                            inputValues?.selectedLabelName === item.label
                              ? "active"
                              : ""
                          }`}
                          onClick={() => {
                            if (
                              !(
                                inputValues?.selectedLabelName &&
                                inputValues?.selectedLabelName !== item.label
                              )
                            ) {
                              handleCheckBoxes("sms", item);
                            }
                          }}
                          disabled={
                            inputValues?.selectedLabelName &&
                            inputValues?.selectedLabelName !== item.label
                              ? true
                              : false
                          }
                        ></a>
                        {/* <a className={`bi bi-whatsapp ${(inputValues?.isShowWhatsAppInput && inputValues?.selectedLabelName === item.label) ? 'active' : ''}`}
                   onClick={() => { if (!(inputValues?.selectedLabelName && inputValues?.selectedLabelName !== item.label)) {handleCheckBoxes("whatsapp", item);}}}
                   disabled={(inputValues?.selectedLabelName && inputValues?.selectedLabelName !== item.label)?true:false}></a> */}
                        {/* <a className={`bi bi-download ${(inputValues?.isShowWhatsAppInput && inputValues?.selectedLabelName === item.label) ? 'active' : ''}`}
                   onClick={() => { if (!(inputValues?.selectedLabelName && inputValues?.selectedLabelName !== item.label)) {handleCheckBoxes("download", item);}}}
                   disabled={(inputValues?.selectedLabelName && inputValues?.selectedLabelName !== item.label)?true:false}></a> */}
                      </span>
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}
            {item.inputType === "accordian" && (
              <>
                <Col
                  className="collapse-main"
                  xs={24}
                  sm={24}
                  md={10}
                  lg={10}
                  xxl={10}
                >
                  {/* <Form.Item
                label={
                  <span className="accordian-title">{item.label}</span>
                }
                name={item.name}
                className="inputs-label fs-16 fw-400"
              > */}
                  <Collapse
                    accordion
                    expandIconPosition={"end"}
                    key="1"
                    bordered={false}
                    className="proposer-accordian"
                    onChange={(e) => handleProposerCollapse(e, item.name)}
                    defaultActiveKey={isShowDefaulttAccordian && ["1"]}
                  >
                    <Panel
                      header={item.label}
                      key="1"
                      className="fs-16 fw-500 proposer-collapse"
                    ></Panel>
                  </Collapse>
                  {/* </Form.Item> */}
                </Col>
              </>
            )}
            {item.inputType === "time" && !item?.hide && (
              <>
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={12}
                  xxl={12}
                  className="time-picker"
                >
                  <div key={index}>
                    <Form.Item
                      label={
                        <span>
                          {item.label}
                          {item.required && <sup>*</sup>}
                        </span>
                      }
                      name={item.name}
                      className="inputs-label mb-0"
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
                        },
                      ]}
                    >
                      <TimePicker
                        use12Hours
                        format="h:mm:ss A"
                        style={{ width: "100%" }}
                        className="cust-input"
                        disabledTime={(e) => props?.disabledTime(e, item)}
                        disabled={item?.disabled}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}
            {item.inputType === "pannumber" && !item?.hide && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <div key={index}>
                    <Form.Item
                      label={
                        <span>
                          {item.label}
                          {item.required && <sup>*</sup>}
                        </span>
                      }
                      name={item.name}
                      className="inputs-label mb-0"
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
                        },
                        {
                          validator: validatePANNumber,
                        },
                      ]}
                    >
                      {/* <Input
                    placeholder={item.placeholder || item.label}
                    className="cust-input"
                    maxLength={item?.maxlength}
                    minLength={item?.minlength}
                    disabled={item?.disabled}
                    onKeyDown={(e) => handleKeyDown(item.pattern,  e,"pannumber")}
                    onBlur={(e) => onBlurInput(e.target.value, item)}
                  
                  /> */}
                      <Input
                        placeholder={item.placeholder || item.label}
                        className="cust-input upper"
                        maxLength={item?.maxlength}
                        minLength={item?.minlength}
                        disabled={item?.disabled}
                        // onKeyDown={(e) => {
                        //     if (e.key >= 'a' && e.key <= 'z') {
                        //         e.target.value = e.target.value + e.key.toUpperCase();
                        //         e.preventDefault();
                        //     }
                        // }}
                        onKeyDown={(e) =>
                          handleKeyDown(item.pattern, e, "pannumber")
                        }
                        onBlur={(e) => {
                          // Handle onBlur event
                          onBlurInput(e.target.value, item);
                          // Ensure the input value remains unchanged on blur
                          // This prevents the last letter from being removed
                          // setInputValue(e.target.value);
                          e.target.value = e.target.value;
                        }}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}
            {item.inputType === "complaintbox" && (
              <>
                <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
                  <div className="mb-10">
                    <span>
                      {item.label}
                      {item.required && <sup>*</sup>}
                    </span>
                  </div>
                  <div key={index} className="address-textbox">
                    <Form.Item
                      name={item.name}
                      className=""
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
                        },
                        { max: item?.maxlength, message: item?.message },
                      ]}
                    >
                      <TextArea
                        value={item?.address}
                        maxLength={item?.maxlength}
                        placeholder={item.placeholder}
                        autoSize={{ minRows: 5, maxRows: 10 }}
                        disabled={item?.disabled}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}
            {item.inputType === "linkradio" && !item?.hide && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <div key={index}>
                    <Form.Item
                      label={
                        <span>
                          {item.label}
                          {item.required && <sup>*</sup>}
                        </span>
                      }
                      name={item.name}
                      className={`inputs-label radio-grp fs-16 fw-400 ${item?.class}`}
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
                        },
                        { whitwspace: item?.required },
                      ]}
                    >
                      <Radio.Group
                        onChange={(e) => handleRadioChange(e, item)}
                        className="radio-check"
                      >
                        <Radio
                          value={item?.radioValue}
                          className={`fs-16 fw-400 ${item?.class}`}
                          disabled={item?.disabled}
                        >
                          {item?.title ? (
                            <span
                              className="link-txt"
                              onClick={() => handleRadioLink(item)}
                            >
                              {item?.title}
                            </span>
                          ) : (
                            ""
                          )}
                        </Radio>
                        <Radio
                          value={item?.secondRadioValue}
                          className={`fs-16 fw-400 ${item.class}`}
                          disabled={item?.disabled}
                        >
                          {item?.secondTitle}
                        </Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}
            {item.inputType === "textlink" && !item?.hide && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <div key={index}>
                    <Form.Item
                      label={
                        <span>
                          {item.label ? (
                            <span
                              className="link-txt"
                              onClick={() => handleRadioLink(item)}
                            >
                              {item?.label}
                            </span>
                          ) : (
                            ""
                          )}
                          {item.required && <sup>*</sup>}
                        </span>
                      }
                      name={item.name}
                      className={`inputs-label radio-grp fs-16 fw-400 ${item?.class}`}
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
                        },
                        { whitwspace: item?.required },
                      ]}
                    >
                      {/* {item?.title? <span className="link-txt" onClick={()=>handleRadioLink(item)}>{item?.title}</span> : ""} */}
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}
            {item.inputType === "AddressLine" && !item?.hide && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <div key={index}>
                    <Form.Item
                      label={
                        <span>
                          {item.label}
                          {item.required && <sup>*</sup>}
                        </span>
                      }
                      name={item.name}
                      className="inputs-label mb-0"
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
                        },
                      ]}
                    >
                      {/* <Input
                    placeholder={item.placeholder || item.label}
                    className="cust-input"
                    maxLength={item?.maxlength}
                    minLength={item?.minlength}
                    disabled={item?.disabled}
                    onKeyDown={(e) => handleKeyDown(item.pattern,  e,"pannumber")}
                    onBlur={(e) => onBlurInput(e.target.value, item)}
                  
                  /> */}
                      <Input
                        placeholder={item.placeholder || item.label}
                        // onKeyDown={(e) => {
                        //     if (e.key >= 'a' && e.key <= 'z') {
                        //         e.target.value = e.target.value + e.key.toUpperCase();
                        //         e.preventDefault();
                        //     }
                        // }}
                        onKeyDown={(e) =>
                          handleKeyDown(item.pattern, e, "AddressLine")
                        }
                        onBlur={(e) => {
                          // Handle onBlur event
                          onBlurInput(e.target.value, item);
                          // Ensure the input value remains unchanged on blur
                          // This prevents the last letter from being removed
                          // setInputValue(e.target.value);
                          e.target.value = e.target.value;
                        }}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}
            {item.inputType === "suffix" && !item?.hide && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <div key={index}>
                    <Form.Item
                      label={
                        <span>
                          {item?.label}
                          {item.required && <sup>*</sup>}
                        </span>
                      }
                      name={item.name}
                      className={`inputs-label radio-grp fs-16 fw-400 ${item?.class}`}
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
                        },
                        { whitwspace: item?.required },
                      ]}
                    >
                      <Input
                        placeholder={item?.placeholder}
                        className="cust-input"
                        disabled
                        suffix={
                          <Tooltip title="Extra information">
                            {/* <Icon type="search" /> */}
                            <SearchOutlined
                              style={{ fontSize: "22px", color: "#b31b24" }}
                              onClick={() => {
                                props?.handleClientList();
                              }}
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
                  </div>
                </Col>
              </>
            )}
            {/* </>} */}
          </>
        ))}
      </Row>
    </>
  );
};

export default DetailsForm;
