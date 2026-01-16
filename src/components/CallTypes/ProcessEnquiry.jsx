import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { ProcessEnquiryData } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import { Button, Form, Spin, message } from "antd";
import moment from "moment";
import apiCalls from "../../api/apiCalls";
import PopupAlert from "../popupAlert";
import ContactForm from "../../utils/ContactForm";
import RaiseRequirementPopup from "../RaiseRequirementPopup";

const ProcessEnquiry = (props) => {
  const loginInfo = useSelector((state) => state);
  const [form] = Form.useForm();
  const [requirementsForm] = Form.useForm();
  const {
    selectedSubType,
    customerData,
    details,
    typesForm,
    ProductRelatedPortalLU,
    processNameLU,
    clientEnquiryData,
    requestModeLU,
    selectedSubTypeId,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertData, setAlertData] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showEmailFields, setShowEmailFields] = useState(false);
  const [activeEmailIcons, setActiveEmailIcons] = useState([]);
  const [activeMobileIcons, setActiveMobileIcons] = useState([]);
  const [activeWhatsAppIcons, setActiveWhatsAppIcons] = useState([]);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmailAddress, setShowEmailAddress] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [isProcessLinks, setIsProcessLinks] = useState([]);
  const [isDocLinks, setIsDocLinks] = useState([]);
  const [isSelectedProcessName, setIsSelectedProcessName] = useState("");
  const [isProcessNameLU, setIsProcessNameLU] = useState([]);
  const [MstDesc, setMstDesc] = useState("");
  const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  const shouldLog = useRef(true);
  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      //getDropdownData();
      getProcesLink();
      getClientEnquiry();
      // getProcesDocLnk();
    }
  }, []);
  useEffect(() => {
    if (props?.EmailResponse?.IsEmailmanagent) {
      ProcessEnquiryData[selectedSubType]?.BOE_Details?.forEach((element) => {
        if (element?.name === "requestchannel") {
          form.setFieldsValue({ requestchannel: 4 });
          element.disabled = true;
          // setEmsrequestchannel(4)
        }
      });
      if (!ProcessEnquiryData[selectedSubType]) {
        ProcessEnquiryData[selectedSubType] = {}; // Initialize if undefined
      }

      if (!Array.isArray(ProcessEnquiryData[selectedSubType]?.BOE_Details)) {
        ProcessEnquiryData[selectedSubType].BOE_Details = [];
      }

      // Remove existing instances of "Additional Note For Customer" before adding a new one
      ProcessEnquiryData[selectedSubType].BOE_Details = ProcessEnquiryData[
        selectedSubType
      ].BOE_Details.filter(
        (comment) => comment.name !== "AdditionalNoteForCustomer"
      );

      // Add "Additional Note For Customer" once
      ProcessEnquiryData[selectedSubType].BOE_Details.push({
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
    if (selectedSubTypeId) {
      form.setFieldsValue({
        ProcessName: selectedSubTypeId,
      });
    }
  }, [selectedSubType]);
  useEffect(() => {
    const freezeSubTypes = [
      "changeindob",
      "additiondeletionofriderquery",
      "changeinsumassuredquery",
      "changeintermquery",
    ];
    if (
      freezeSubTypes.includes(selectedSubType) &&
      loginInfo?.userProfileInfo?.profileObj?.role === 14
    ) {
      form.setFieldsValue({ requestchannel: 13 });
      if (Array.isArray(ProcessEnquiryData[selectedSubType]?.BOE_Details)) {
        ProcessEnquiryData[selectedSubType].BOE_Details.forEach((item) => {
          if (item.name === "requestchannel") {
            item.disabled = true;
          }
        });
      }
    } else if (
      freezeSubTypes.includes(selectedSubType) &&
      loginInfo?.userProfileInfo?.profileObj?.role !== 14
    ) {
      if (Array.isArray(ProcessEnquiryData[selectedSubType]?.BOE_Details)) {
        ProcessEnquiryData[selectedSubType].BOE_Details.forEach((item) => {
          if (item.name === "requestchannel") {
            item.disabled = false;
          }
        });
      }
    }
  }, [selectedSubType, loginInfo?.userProfileInfo?.profileObj?.role]);

  const toggleInputField = (field, item, index) => {
    setShowEmailFields(true);
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

  const getClientEnquiry = () => {
    setIsLoading(true);

    let obj = {
      clientNumber: customerData?.poClientID,
    };
    let response = apiCalls.getClientEnquiry(
      obj,
      loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID
    );
    response
      .then((val) => {
        if (val?.data) {
          //setClientEnquiryData(val?.data?.responseBody);
          const res = val?.data?.responseBody;
          form.setFieldsValue({
            mobileNo: res?.rmblphone,
            whatsAppNo: res?.rmblphone,
            emailId: res?.rinternet,
          });

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
  };
  // const getDropdownData = () => {
  //   setIsDocLinks([]);
  //   let obj = {
  //     "Call_Typ" : 20,
  //     "Sub_Typ" :1,
  //     "ProdType" : details?.policyDetailsObj?.planAndStatus?.productType,
  //     "ProdCode": details?.policyDetailsObj?.planAndStatus?.planCode,
  //      "ProdUIN": details?.policyDetailsObj?.planAndStatus?.productUIN,
  // }
  //   let response = apiCalls.getDocMaster(obj);
  //   response
  //     .then((val) => {
  //       if (val?.data) {
  //         const filteredData = val?.data?.filter((ele) => ele.docType);
  //         const processedData = filteredData?.map((item) => ({
  //           ...item,
  //           label: item.docType,
  //           value: item.docType,
  //         }));
  //         setIsProcessNameLU(processedData);
  //       } else {
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

  //     });
  // };

  const getProcesDocLnk = () => {
    setIsDocLinks([]);
    let obj = {
      Call_Typ: null,
      Sub_Typ: null,
      ProdType: details?.policyDetailsObj?.planAndStatus?.productType,
      ProdCode: details?.policyDetailsObj?.planAndStatus?.planCode,
      ProdUIN: details?.policyDetailsObj?.planAndStatus?.productUIN,
    };
    let response = apiCalls.getProcesDocLnk(obj);
    response
      .then((val) => {
        if (val?.data) {
          setIsDocLinks(val?.data);
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
  const getProcesLink = () => {
    setIsProcessLinks([]);
    let obj = {
      Call_Typ: 20,
      Sub_Typ: 1,
    };
    let response = apiCalls.getProcesLink(obj);
    response
      .then((val) => {
        if (val?.data) {
          setIsProcessLinks(val?.data);
          const filteredData = val?.data?.filter((ele) => {
            if (ele.docType === "AcceptableDocs") {
              setIsDocLinks(ele);
            }
            return ele.docType;
          });

          const processedData = filteredData?.map((item) => ({
            ...item,
            label: item.docType,
            value: item.docType,
          }));
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
      .catch((err) => {});
  };

  // const getSubTypeValue =()=>{
  //   let dropDownValue = null;
  //    switch (isSelectedProcessName) {
  //     case "Bank Detail Updation":
  //       dropDownValue = 1;
  //       break;
  //     case "Nomination":
  //       dropDownValue = 2;
  //       break;
  //     case "Surrender":
  //       dropDownValue = 3;
  //       break;
  //     case "Freelook":
  //       dropDownValue = 4;
  //       break;
  //     case "Payment Related":
  //       dropDownValue = 5;
  //       break;
  //       case "Revival":
  //         dropDownValue = 6;
  //         break;
  //       case "Foreclosure":
  //         dropDownValue = 7;
  //         break;
  //       case "Maturity Claim - Non Pension":
  //         dropDownValue = 8;
  //         break;
  //       case "Loan":
  //         dropDownValue = 9;
  //         break;
  //       case "Claims":
  //         dropDownValue = 10;
  //         break;
  //         case "Survival Benefit":
  //           dropDownValue = 11;
  //           break;
  //         case "Refund":
  //           dropDownValue = 12;
  //           break;
  //         case "Duplicate Policy Bond":
  //           dropDownValue = 13;
  //           break;
  //         case "Partial Withdrawal":
  //           dropDownValue = 14;
  //           break;
  //         case "Switch / Top up / Premium Redirection Query":
  //           dropDownValue = 15;
  //           break;
  //           case "Maturity Claim - Pension":
  //             dropDownValue = 16;
  //           break;
  //           case "Assignment":
  //             dropDownValue = 17;
  //           break;
  //           case "Claims Reconsideration":
  //             dropDownValue = 18;
  //           break;
  //           case "Process Name":
  //             dropDownValue = 19;
  //           break;
  //     default:
  //       break;
  //   }
  //   return dropDownValue;
  // }

  const handleDropdownChange = (e, item) => {
    // if(processNameLU){
    //       let slectedId= processNameLU.find((ele)=>{
    //          if(ele.mstID === e){
    //           setMstDesc(ele.mstDesc);
    //          }
    //          return false
    //       })
    // }
    // let selectDropDownValue = e ||null;
    // setIsSelectedProcessName(selectDropDownValue);
    // props?.setSelectedSubTypeId(selectDropDownValue);
    //typesForm?.setFieldsValue({subType: selectDropDownValue})
  };
  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };
  const handleDateChange = () => {};
  const getDocLink = () => {
    //const filteredLinks = isDocLinks?.filter((item) => item.docType?.includes("Terms & Conditions"));
    // Assuming you want to return an array of links, you can use map
    // const links = isDocLinks?.map((item) => item.link);
    // return links?.length>0 ? links[0] : "";
    return isDocLinks ? isDocLinks.link : "";
  };
  const getProcessLink = () => {
    // const filteredLinks = isProcessLinks?.filter((item) => item.docType === isSelectedProcessName);
    const filteredLinks = isProcessLinks?.filter(
      (item) => item.docType === MstDesc
    );

    const links = filteredLinks?.map((item) => item.link);
    return links?.length > 0 ? links[0] : "";
  };

  const getTransactionData = (values) => {
    // let selectedtype = processNameLU[values.ProcessName].mstDesc
    if (selectedSubType === "bankdetailupdation") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
      ];
    }
    if (selectedSubType === "ownershipchange") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
      ];
    }
    if (selectedSubType === "foreclosure") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
      ];
    }

    if (selectedSubType === "nomination") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
      ];
    }
    if (selectedSubType === "surrender") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
      ];
    }
    if (selectedSubType === "freelook") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
      ];
    }
    if (selectedSubType === "revival") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
      ];
    }
    if (selectedSubType === "loan") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
      ];
    }
    if (selectedSubType === "duplicatepolicybond") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
      ];
    }
    if (selectedSubType === "claims") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        { Status: "Create", TagName: "ProcessFileType", TagValue: "CLAIM" },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
      ];
    }
    if (selectedSubType === "partialwithdrawal") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
      ];
    }
    if (selectedSubType === "switchtopuppremiumredirectionquery") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
      ];
    }
    if (selectedSubType === "assignment") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
      ];
    }
    if (selectedSubType === "claimsreconsideration") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        { Status: "Create", TagName: "ProcessFileType", TagValue: "CLAIM" },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
      ];
    }
    if (selectedSubType === "addresschange") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
      ];
    }
    if (selectedSubType === "changeinnominee") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
      ];
    }
    if (selectedSubType === "changeindob") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
      ];
    }
    if (selectedSubType === "surrenderpayout") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
      ];
    }
    if (selectedSubType === "bankupdationprocess") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
      ];
    }
    if (selectedSubType === "panupdation") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
      ];
    }
    if (selectedSubType === "lifecertificatesubmitted") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
      ];
    }
    if (selectedSubType === "autopayexcessamountrefund") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
      ];
    }
    if (selectedSubType === "emailupdation") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
      ];
    }
    if (selectedSubType === "panaadharlinkage") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
      ];
    }
    if (selectedSubType === "mandateregistration") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
      ];
    }

    if (
      selectedSubType === "additiondeletionofriderquery" ||
      selectedSubType === "changeinsumassuredquery" ||
      selectedSubType === "changeintermquery"
    ) {
      return [
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel || "",
        },
      ];
    }
    return [
      //   { Status: "Create", TagName: "ProcessFileType", TagValue:
      //   ["Nomination", "Surrender",  "Partial Withdrawal","Loan", "Freelook",
      //   "Switch / Top up / Premium Redirection Query", "Revival", "Bank Detail Updation", "Foreclosure",
      //   "Duplicate Policy Bond", "Ownership Change"].includes(selectedtype)?
      //   'PROCESSENQUIRY':'ProcessEmailer'
      //  },
      {
        Status: "Create",
        TagName: "ProcessName",
        TagValue: isSelectedProcessName || values.ProcessName,
      },
      { Status: "Create", TagName: "DocLink", TagValue: getDocLink() || "" },
      {
        Status: "Create",
        TagName: "ProcessLink",
        TagValue: getProcessLink() || "",
      },
      { Status: "Create", TagName: "Comments", TagValue: values.Comments },
    ];

    // if (selectedSubType === "gstinupdate") {
    //   return [
    //     { Status: "Create", TagName: "ProcessFileType", TagValue: "ProcessEmailer" },
    //     { Status: "Create", TagName: "ProcessName", TagValue: isSelectedProcessName || values.ProcessName },
    //     { Status: "Create", TagName: "DocLink", TagValue: getDocLink() || ""},
    //     { Status: "Create", TagName: "ProcessLink", TagValue: getProcessLink() || ""},
    //     { Status: "Create", TagName: "Comments", TagValue: values.Comments },
    //   ];
    // }
  };
  const getSelectedCommunications = () => {
    let communicationObj = [];
    if (showEmailAddress || showWhatsApp || showPhoneNumber) {
      communicationObj.push({
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
      });
    }
    if (showWhatsApp || showPhoneNumber) {
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
  const handleSubmit = (values) => {
    if (!showEmailFields) {
      message.destroy();
      message.warning({
        content: "Please select atleast one communication.",
        className: "custom-msg",
        duration: 2,
      });
      return;
    }
    setIsLoading(true);
    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId || values?.ProcessName, // Required
      RequestSource: loginInfo?.userProfileInfo?.profileObj?.role || 0, // Required
      RequestChannel:
        loginInfo?.userProfileInfo?.profileObj?.role === 14
          ? 13
          : values.requestchannel, // Required
      Category: raiseRequirementOpen ? 2 : 1,
      ApplicationNo:
        details?.policyDetailsObj?.identifiers?.applicationNo ||
        customerData?.applicationNo,
      DOB: convertDate(customerData?.dob),
      PolicyNo:
        details?.policyDetailsObj?.identifiers?.policyNo ||
        customerData?.policyNo, // Required
      CustomerId: 456,
      CustRole: values.custRole,
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
      RequestDateTime: new Date(),
      ReasonDelayed: values.resonfordelay,
      CustSignDateTime: values?.customersigningdate
        ? new Date(values?.customersigningdate)
        : new Date(),
      TransactionData: getTransactionData(values),
      Uploads: [],
      CommunicationRequest: getSelectedCommunications() || [],
      CurrentStatus: raiseRequirementOpen ? "Reject" : "",
      //  CommunicationRequest: [
      //     {
      //       SrvReqRefNo: "",
      //       TemplateID: "",
      //       CommType: 2,
      //       ReceipientTo: import.meta.env.VITE_APP_RECEIPIENT_CC ? import.meta.env.VITE_APP_RECEIPIENT_CC : clientEnquiryData?.rinternet,
      //       ReceipientCC: import.meta.env.VITE_APP_RECEIPIENT_CC ? import.meta.env.VITE_APP_RECEIPIENT_CC : clientEnquiryData?.rinternet,
      //       MobileNos: "",
      //       ScheduledTime: new Date(),
      //       CommBody: "",
      //       Attachments: null,
      //     },
      //     {
      //       SrvReqRefNo: "",
      //       TemplateID: "",
      //       CommType: 1,
      //       ReceipientTo: "",
      //       ReceipientCC: "",
      //       MobileNos: import.meta.env.VITE_APP_RECEIPIENT_MOBILENO ? import.meta.env.VITE_APP_RECEIPIENT_MOBILENO : clientEnquiryData?.rmblphone,
      //       ScheduledTime: new Date(),
      //       CommBody: "",
      //       Attachments: null,
      //     },
      //   ],
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
        return;
      }
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
          // if(!val?.data?.srvReqRefNo){
          setAlertTitle(val?.data?.header);
          setAlertData(val?.data?.message);
          setShowAlert(true);
          setIsLoader(false);
          //   return
          // }
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

          // message.success({
          //   content: "Contact Details Updated Successfully",
          //   className: "custom-msg",
          //   duration: 3,
          // });
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

  const getRaiseRequirements = () => {
    setRaiseRequirementOpen(true);
    setRequirementLoader(true);
    let obj = {
      calltype: props?.selectedCallType,
      subtype: props?.selectedSubTypeId,
      Role: loginInfo?.userProfileInfo?.profileObj?.role === 1 ? 1 : 0,
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
    //     setRequirementLoader(true);
    if (raiseRequirementOpen) {
      handleSubmit(formData);
    }
  };
  const popupClose = () => {
    setRaiseRequirementOpen(false);
  };

  return (
    <>
      <Spin spinning={isLoading} fullscreen />
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
        <DetailsForm
          data={ProcessEnquiryData[selectedSubType]?.BOE_Details}
          subType={selectedSubType}
          handleDropdownChange={handleDropdownChange}
          ProductRelatedPortalLU={ProductRelatedPortalLU}
          handleDateChange={handleDateChange}
          toggleInputField={toggleInputField}
          showEmailAddress={showEmailAddress}
          showPhoneNumber={showPhoneNumber}
          showWhatsApp={showWhatsApp}
          isProcessNameLU={processNameLU}
          requestModeLU={requestModeLU}
        ></DetailsForm>
        {showEmailFields && (
          <>
            <ContactForm
              showEmailAddress={showEmailAddress}
              showPhoneNumber={showPhoneNumber}
              showWhatsApp={showWhatsApp}
            />
          </>
        )}

        <div className="contact-details-btn">
          <Button type="primary" htmlType="submit" className="primary-btn">
            Submit
          </Button>{" "}
        </div>
      </Form>
      {showAlert && (
        <PopupAlert
          alertData={alertData}
          title={alertTitle}
          getAdvance={props.getAdvance}
          navigate={navigateTo}
          setShowAlert={setShowAlert}
        ></PopupAlert>
      )}
      <RaiseRequirementPopup
        raiseRequerimentList={raiseRequerimentList}
        raiseRequirementOpen={raiseRequirementOpen}
        requirementModalLoader={requirementModalLoader}
        handleRequirementSubmit={handleRequirementSubmit}
        popupClose={popupClose}
        requirementsForm={requirementsForm}
      />
    </>
  );
};

export default ProcessEnquiry;
