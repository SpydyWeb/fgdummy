import React, { useState, useEffect } from "react";
import { Data } from "../../mainconfig";
import { Button, Form, Modal, Spin, message, Checkbox } from "antd";
import DetailsForm from "../../utils/DetailsForm";
import apiCalls from "../../api/apiCalls";
import PopupAlert from "../popupAlert";
import ContactForm from "../../utils/ContactForm";
import moment from "moment";
import { connect, useSelector } from "react-redux";
import dayjs from "dayjs";
import RaiseRequirementPopup from "../RaiseRequirementPopup";

const ServicingDocuments = (props) => {
  const loginInfo = useSelector((state) => state);
  const [form] = Form.useForm();
  const [requirementsForm] = Form.useForm();
  const {
    selectedCallType,
    selectedSubType,
    sisLU,
    details,
    customerData,
    clientEnquiryData,
  } = props;
  const [isShowPOSScreen, setIsShowPOSScreen] = useState(false); //pos screen showing purpose
  const [isShowTransferFields, setIsShowTransferFields] = useState(false);
  const [showEmailFields, setShowEmailFields] = useState(false);
  const [showDateRangeFields, setDateRangeFields] = useState(false);
  const [showPaymentCheckBox, setShowPaymentsCheckBox] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [alertData, setAlertData] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmailAddress, setShowEmailAddress] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [serviceRequestId, setServiceRequestId] = useState(null);
  const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [documentsData, setDocumentsData] = useState([]);
  const [isDocumentModalOpen, setIsDoumentModalOpen] = useState(false);
  const [certificateData, setCertificateData] = useState([]);
  const [certificateData_New,setCertificateData_New]=useState([]);
  const [options, setOptions] = useState([]);
  const [hideSubmitBtns,sethideSubmitBtns]=useState(true);
  const [oldDMSActiveFlag,setoldDMSActiveFlag]=useState(false);
  const [NewDMSActiveFlag,setNewDMSActiveFlag]=useState(false);

  useEffect(() => {
    if (props?.EmailResponse?.IsEmailmanagent) {
      if (Data[selectedSubType]?.BOE_Details) {
        // Check if the field already exists
        const existingField = Data[selectedSubType].BOE_Details.find(
          (field) => field.name === "AdditionalNoteForCustomer"
        );

        if (!existingField) {
          // Append the new field while preserving existing ones
          Data[selectedSubType].BOE_Details.push({
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
      }
    }

    form.resetFields();
    setShowPhoneNumber(false);
    setShowEmailAddress(false);
    setShowWhatsApp(false);
    getClientEnquiry();
    if (selectedSubType === "premiumpaidcertificate") {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1; // January is 0
      const rcdDate = new Date(
        convertDate2(details?.policyDetailsObj?.saDetails?.rcd)
      ); // Example RCD date
      // const rcdDate = new Date('2022-04-15'); // Example RCD date
      const rcdYear = rcdDate.getFullYear();
      const rcdMonth = rcdDate.getMonth() + 1;

      // if (rcdYear === currentYear) {
      //     setOptions(generateOptions(currentYear, currentYear + 1));
      // } else if (rcdYear < currentYear || (rcdYear === currentYear && rcdMonth < 4)) {
      //     setOptions(generateOptions(rcdMonth < 4 ? rcdYear - 1 : rcdYear, currentYear));
      // }
      //   if (rcdYear === currentYear) {
      //     setOptions(generateOptions(currentYear, currentYear + 1));
      // }
      if (rcdYear < currentYear || (rcdYear === currentYear && rcdMonth < 4)) {
        setOptions(
          generateOptions(
            rcdMonth < 4 ? rcdYear - 1 : rcdYear,
            currentMonth < 4 ? currentYear - 1 : currentYear
          )
        );
      }
    }
  }, [selectedSubType]); // eslint-disable-next-line arrow-body-style

  const generateOptions = (startYear, endYear) => {
    const options = [];
    for (let year = startYear; year <= endYear; year++) {
      options.push({
        label: `${year}-${year + 1}`,
        value: `${year}`,
      });
    }
    return options;
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

  const handleDateChange = (e, item) => {
    if (
      selectedSubType === "unitstatement" &&
      item?.lable?.includes("From Date")
    ) {
    }
  };
  const handleButtonClick = () => {};
  const handleDropdownChange = () => {};
  const handleTitleCheckBox = (e, item) => {
    if (item?.name?.toLowerCase() === "isdaterange") {
      setDateRangeFields(e.target.checked);
      setShowPaymentsCheckBox(false);
    } else {
      setShowPaymentsCheckBox(e.target.checked);
      setDateRangeFields(false);
    }
  };
  const toggleInputField = (field) => {
    setShowEmailFields(true);
    switch (field) {
      case "phone":
        setShowPhoneNumber(!showPhoneNumber);
        break;
      case "email":
        setShowEmailAddress(!showEmailAddress);
        break;
      case "whatsapp":
        setShowWhatsApp(!showWhatsApp);
        break;
      default:
        break;
    }
  };
  const warning = () => {
    Modal.warning({
      content:
        "Please select your preferred mode through which you wish to have the receipt",
    });
  };

  const getTransactionData = (values) => {
    if (selectedSubType === "benefitillustration") {
      return [
        {
          Status: "Create",
          TagName: "Template",
          TagValue: "SENDDOCS",
        },
        // { Status: "Create", TagName: "sisDocumentType", TagValue: values.sisDocumentType },
        {
          Status: "Create",
          TagName: "Client_Id",
          TagValue: customerData?.poClientID,
        },
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
      ];
    } else if (selectedSubType === "forms") {
      return [
        {
          Status: "Create",
          TagName: "Template",
          TagValue: "SENDDOCS",
        },
        {
          Status: "Create",
          TagName: "sisDocumentType",
          TagValue: values.sisDocumentType,
        },
        {
          Status: "Create",
          TagName: "Client_Id",
          TagValue: customerData?.poClientID,
        },
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
      ];
    } else if (selectedSubType === "premiumpaidcertificate") {
      return [
        { Status: "Create", TagName: "Template", TagValue: "SENDDOCS" },
        {
          Status: "Create",
          TagName: "Year",
          TagValue: values.premiumpaidcertificate,
        },
        {
          Status: "Create",
          TagName: "Client_Id",
          TagValue: customerData?.poClientID,
        },
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
      ];
    } else if (selectedSubType === "unitstatement") {
      return [
        {
          Status: "Create",
          TagName: "Template",
          TagValue: "SENDDOCS",
        },
        {
          Status: "Create",
          TagName: "FromDate",
          TagValue: values.FromDate
            ? moment(values.FromDate + 1).format("DD/MM/YYYY")
            : values.FromDate,
        },
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "ToDate",
          TagValue: values.ToDate
            ? moment(values.ToDate + 1).format("DD/MM/YYYY")
            : values.ToDate,
        },
        {
          Status: "Create",
          TagName: "Client_Id",
          TagValue: customerData?.poClientID,
        },
      ];
    } else if (
      selectedSubType === "discontinouancenotice" ||
      selectedSubType === "firstpremiumreceipt"
    ) {
      return [
        {
          Status: "Create",
          TagName: "Template",
          TagValue: "FIRSTPREMIUMRECEPIT",
        },
        {
          Status: "Create",
          TagName: "Client_Id",
          TagValue: customerData?.poClientID,
        },
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
      ];
    } else if (selectedSubType === "renewalpremiumreceipt") {
      return [
        {
          Status: "Create",
          TagName: "IsDateRange",
          TagValue: showDateRangeFields ? true : false,
        },
        {
          Status: "Create",
          TagName: "FromDate",
          TagValue: values.FromDate ? new Date(values.FromDate) : "",
        },
        {
          Status: "Create",
          TagName: "ToDate",
          TagValue: values.ToDate ? new Date(values.ToDate) : "",
        },
        {
          Status: "Create",
          TagName: "Template",
          TagValue: "SENDDOCS",
        },
        {
          Status: "Create",
          TagName: "Client_Id",
          TagValue: customerData?.poClientID,
        },
        {
          Status: "Create",
          TagName: "certificate",
          TagValue: certificateData ? JSON.stringify(certificateData) : "",
        },
        {
        "Status": "Create",
        "TagName": "certificate_New",
        "TagValue": certificateData_New?JSON.stringify(certificateData_New):''
    },
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
      ];
    }
  };
  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };

  const convertDate2 = (inputDate) => {
    // Define an array of possible date formats
    const dateFormats = [
      "YYYYMMDD",
      "YYYYDDMM",
      "YYYYMMDDHHmmss",
      "YYYYDDMMHHmmss",
    ];

    // Loop through each format and try to parse the input date
    for (let format of dateFormats) {
      const parsedDate = moment(inputDate, format, true);

      // Check if the parsed date is valid
      if (parsedDate.isValid()) {
        // If valid, return the formatted date
        return parsedDate.format("YYYY-MM-DD");
      }
    }

    // If none of the formats matched, return an error message or handle the invalid date scenario as needed
    return "Invalid date";
  };

  useEffect(() => {
     sethideSubmitBtns(true);
    if (
      selectedSubType?.includes("unitstatement") &&
      ["VP", "VR", "VA"].includes(
        details?.policyDetailsObj?.planAndStatus?.policyStatus
      )
    )
      sethideSubmitBtns(false);
    if (
      !selectedSubType?.includes("unitstatement") &&
      !selectedSubType?.includes("premiumpaidcertificate")
    )
      // getDoumentsList(selectedSubType);
      // if(import.meta.env.VITE_DMSActiveFlag==1)
      // {
      //   GetDMSDocumentDetails(selectedSubType);
      // }
      // CheckDMSFlag();
      handleDocuments(selectedSubType);
      
  }, [selectedSubType]);

  async function handleDocuments(selectedSubType) {
     let newDmsData;
    setIsLoading(true);
    const oldDmsData=await getDoumentsList(selectedSubType);  // Wait for the document list to be fetched

    if (oldDmsData.length > 0) {
    setIsLoading(false);
    //return;
    }
    
  if (import.meta.env.VITE_DMSActiveFlag == 1) {
    newDmsData = await GetDMSDocumentDetails(selectedSubType);
   
   if (newDmsData.length > 0) {
      setIsLoading(false);
      //return; 
    } // Wait for the DMS details if active
  }

 Promise.all([oldDmsData, newDmsData]).then(() => {
  if(oldDmsData.length===0 && newDmsData.length===0)
  {
        setIsLoading(false);
        setAlertData("Files not available in DMS");
        setAlertTitle("No files available");
        setShowAlert(true);
        <PopupAlert
          alertData={alertData}
          title={alertTitle}
          getAdvance={props.getAdvance}
          navigate={navigateTo}
          setShowAlert={setShowAlert}
        ></PopupAlert>;
  }
        
 });
  
}

  const GetDMSDocumentDetails=async(subType)=>{
    //setIsLoading(true);
    let indexName = "";
    if (subType === 'firstpremiumreceipt') {
      indexName = 'Welcome Kit';
    } else if (subType === 'renewalpremiumreceipt') {
      indexName = 'Renewal Premium Receipt';
    }
    let obj = {
        "requestheader": {
            "source": "POS",
            "policyno": customerData?.policyNo,
            "ApplicationNo": customerData?.applicationNo,
            "dob": ""
        },
        "requestbody": {
            //"IndexName": "Welcome Kit"
            "documentName": indexName
        }
    }
    
    const response=await apiCalls.DMSDocumentDetails(obj);
    if(response?.data?.responseHeader?.issuccess) {
      if (response?.data?.responseBody?.status == true) {
      
      const normalizedData = response?.data?.responseBody?.data?.table?.map(item => ({
          indexName: item["file Name"].split('.').slice(0, -1).join('.'),
          documentName:'',
          doc_id:item["doc_id"]
        })) || [];
      //setDocumentsData((pre)=> [...pre,...normalizedData]);
        setDocumentsData((prevData) => {
        const newData = normalizedData.filter((newItem) => 
        !prevData.some((existingItem) => existingItem.doc_id === newItem.doc_id)
        );
        return [...prevData, ...newData];
        });
       
        return normalizedData;
      }
      
      //setIsLoading(false);
    };
    // else {
    //   //setIsLoading(false);
    //   message.destroy()
    //   message.error({
    //     content: response?.data?.responseBody?.errormessage || "Something went wrong please try again!",
    //     className: "custom-msg",
    //     duration: 2,
    //   });
    // }
    return [];
  }

  const getDoumentsList = async (subType) => {
    //setIsLoading(true);
    let indexName = "";
    if (subType === 'firstpremiumreceipt') {
      indexName = 'Welcome Kit';
    } else if (subType === 'renewalpremiumreceipt') {
      indexName = 'Renewal Premium Receipt';
    }
    let obj = {
      requestheader: {
        source: "POS",
        policyno: customerData?.policyNo,
        ApplicationNo: customerData?.applicationNo,
        dob: "",
      },
      requestbody: {
        IndexName: indexName,
      },
    };

    const response = await apiCalls.getDmsDocumentList(obj);
    if (response?.data?.responseHeader?.issuccess) {
      if(response?.data?.responseBody?.filesList.length > 0)
      {
        const data=response?.data?.responseBody?.filesList.map(item => ({
    ...item,
      doc_id: 0, 
     }));    
      setDocumentsData(data);
      return data;
      }
      //setIsLoading(false);
      //setDocumentsData(response?.data?.responseBody?.filesList);
        
      
      //if (response?.data?.responseBody?.filesList.length === 0) {
        // setAlertData("Files not available in DMS");
        // setAlertTitle("No files available");
        // setShowAlert(true);
        // <PopupAlert
        //   alertData={alertData}
        //   title={alertTitle}
        //   getAdvance={props.getAdvance}
        //   navigate={navigateTo}
        //   setShowAlert={setShowAlert}
        // ></PopupAlert>;
        // return;
       
      //}
    }; 
    return [];
    //else {
    //   //setIsLoading(false);
    //   message.destroy();
    //   message.error({
    //     content:
    //       response?.data?.responseBody?.errormessage ||
    //       "Something went wrong please try again!",
    //     className: "custom-msg",
    //     duration: 2,
    //   });
    // }
  };

  const handleSubmit = (values) => {
    if (selectedSubType?.includes("premiumpaidcertificate")) {
      const rcdStr = details.policyDetailsObj.saDetails.rcd; // e.g. "20240301"
      const ptdStr = details.policyDetailsObj.premiumDetails.ptd; // e.g. "20240401"
      const selectedYear = +values?.premiumpaidcertificate; // e.g. 2023

      if (!selectedYear || isNaN(selectedYear)) {
        message.error({
          content: "Invalid selected year",
          className: "custom-msg",
          duration: 3,
        });
        return;
      }

      if (!rcdStr || rcdStr.length !== 8) {
        message.error({
          content: "Invalid RCD format",
          className: "custom-msg",
          duration: 3,
        });
        return;
      }

      const parseDate = (str) => {
        const y = +str.slice(0, 4);
        const m = +str.slice(4, 6);
        const d = +str.slice(6, 8);
        return new Date(y, m - 1, d);
      };

      const rcdDate = parseDate(rcdStr);
      const ptdDate = ptdStr && ptdStr.length === 8 ? parseDate(ptdStr) : null;

      if (isNaN(rcdDate)) {
        message.error({
          content: "Invalid RCD date",
          className: "custom-msg",
          duration: 3,
        });
        return;
      }

      const fyStart = new Date(selectedYear, 3, 1); // Apr 1
      const fyEnd = new Date(selectedYear + 1, 2, 31, 23, 59, 59); // Mar 31 next year

      const nextFyStart = new Date(selectedYear + 1, 3, 1); // Apr 1 next year
      const nextFyEnd = new Date(selectedYear + 2, 2, 31, 23, 59, 59); // Mar 31 year after

      let isValid = false;

      if (rcdDate >= fyStart && rcdDate <= fyEnd) {
        isValid = true; // RCD is in selected FY
      } else if (ptdDate && !isNaN(ptdDate)) {
        if (ptdDate >= rcdDate) {
          isValid = true;
        }
      }

      if (!isValid) {
        message.error({
          content:
            "Neither RCD nor PTD falls in the selected or subsequent Financial Year",
          className: "custom-msg",
          duration: 3,
        });
        return;
      }

      //   const selectedCommTyp = Object.keys(inputValues).filter((ele)=>{
      //     return inputValues[ele] === true;
      // });

      if (!showEmailFields) {
        setIsLoading(false);

        message.destroy();
        message.error({
          content: "Please Select Communication Type",
          className: "custom-msg",
          duration: 3,
        });

        return;
      }

      const obj = {
        CallType: props?.selectedCallType, // Required
        SubType: props?.selectedSubTypeId, // Required
        RequestSource: loginInfo?.userProfileInfo?.profileObj?.role, // Required
        // RequestChannel: loginInfo?.userProfileInfo?.profileObj?.role === 14 ? 13 :  (values.requestchannel || 0), // Required
        RequestChannel: values.requestchannel || 0,
        Category: 2,
        ApplicationNo:
          details?.policyDetailsObj?.identifiers?.applicationNo ||
          customerData?.applicationNo,
        DOB: convertDate(customerData?.dob),
        PolicyNo:
          details?.policyDetailsObj?.identifiers?.policyNo ||
          customerData?.policyNo, // Required
        CustomerId:
          values.GSTINToBeUpdateFor === 1
            ? customerData?.laClientID
            : customerData?.poClientID,
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
        CurrentStatus: raiseRequirementOpen ? "Reject" : "",
        RequestDateTime: new Date(),
        ReasonDelayed: values.resonfordelay,
        CustSignDateTime: values?.customersigningdate
          ? new Date(values?.customersigningdate)
          : new Date(),
        TransactionData: getTransactionData(values),
        CommunicationRequest: [],
        Uploads: [],
      };
      obj.CommunicationRequest.push({
        SrvReqRefNo: "",
        TemplateID: "7",
        CommType: 2, // Use the integer value corresponding to the CommType enum (1 for SMS, 2 for EMAIL, 3 for WHATSAPP)
        ReceipientTo: import.meta.env.VITE_APP_RECEIPIENT_CC
          ? import.meta.env.VITE_APP_RECEIPIENT_CC
          : clientEnquiryData?.rinternet,
        ReceipientCC: import.meta.env.VITE_APP_RECEIPIENT_CC
          ? import.meta.env.VITE_APP_RECEIPIENT_CC
          : clientEnquiryData?.rinternet,
        MobileNos: "",
        ScheduledTime: "2023-10-31T10:30:00", // Use a valid date-time format
        CommBody: "",
        Attachments: null,
      });
      obj.CommunicationRequest.push({
        SrvReqRefNo: "",
        TemplateID: "5",
        CommType: 1, // Use the integer value corresponding to the CommType enum (1 for SMS, 2 for EMAIL, 3 for WHATSAPP)
        ReceipientTo: "",
        ReceipientCC: "",
        MobileNos: import.meta.env.VITE_APP_RECEIPIENT_MOBILENO
          ? import.meta.env.VITE_APP_RECEIPIENT_MOBILENO
          : clientEnquiryData?.rmblphone,
        ScheduledTime: "2023-10-31T10:30:00", // Use a valid date-time format
        CommBody: "",
        Attachments: null,
      });

      setIsLoading(true);
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
            setAlertTitle(val?.data?.header);
            setAlertData(val?.data?.message);
            setShowAlert(true);
            setIsLoading(false);
            // if(!val?.data?.srvReqRefNo){
            //   setAlertTitle(val?.data?.header);
            //   setAlertData(val?.data?.message);
            //   setShowAlert(true);
            //   setIsLoader(false);
            //   return
            // }
            //   setAlertTitle('Request Created Successfully');
            //   setAlertData( `${'Ticket No ' + val?.data?.srvReqRefNo}`);
            //   setNavigateTo('/advancesearch')
            //   setShowAlert(true);
            //   setIsLoading(false);
          } else {
            message.error({
              content:
                val?.data?.responseBody?.errormessage ||
                "Something went wrong please try again!",
              className: "custom-msg",
              duration: 2,
            });
            setIsLoading(false);
          }
        })
        .catch((err) => {
          setIsLoading(false);
        });
    } else {
      if (
        !showEmailFields &&
        (selectedSubType === "benefitillustration" ||
          selectedSubType === "forms" ||
          selectedSubType === "firstpremiumreceipt" ||
          selectedSubType === "unitstatement" ||
          selectedSubType === "discontinouancenotice" ||
          selectedSubType === "renewalpremiumreceipt")
      ) {
        message.destroy();
        message.warning({
          content: "Please select atleast one communication.",
          className: "custom-msg",
          duration: 2,
        });
        return;
      } else if (selectedSubType === "unitstatement") {
        if (values?.FromDate > values?.ToDate) {
          message.destroy();
          message.warning({
            content: "To Date should not be less than the From Date.",
            className: "custom-msg",
            duration: 2,
          });
          return;
        }
      } else if (selectedSubType === "renewalpremiumreceipt") {
        if (values?.FromDate > new Date()) {
          message.destroy();
          message.warning({
            content:
              "From date Cannot be future date. Should be present date and past dates. It should be less than today’s date.",
            className: "custom-msg",
            duration: 2,
          });
          return;
        } else if (handleFromDateValidate(values)) {
          // const rcdDate = new Date(convertDate(details?.policyDetailsObj?.saDetails?.rcd));
          // const selectDate = new Date(dayjs(values.FromDate));
          // const hoursDifference = convertDateToHours(new Date(dayjs(values.FromDate)) - rcdDate);
          // console.log("date1:", new Date(dayjs(values.FromDate)))
          // console.log("date2:", (moment(values.FromDate)))
          // if (selectDate <= rcdDate) {
          message.destroy();
          message.warning({
            content: "From date should be equal to or more than RCD.",
            className: "custom-msg",
            duration: 2,
          });
          return;
          // }
        } else if (values?.FromDate > values?.ToDate) {
          message.destroy();
          message.warning({
            content:
              "“To Date” cannot be future date, should be present date and past date.",
            className: "custom-msg",
            duration: 2,
          });
          return;
        } else if (handleToDateChange(values?.ToDate, values?.FromDate)) {
          message.destroy();
          message.warning({
            content: "Receipt range allowed of max 3 months.",
            className: "custom-msg",
            duration: 2,
          });
          return;
        }
        // Assuming convertDate returns a Date object
        // const rcdDate = convertDate(
        //   details?.policyDetailsObj?.saDetails?.rcd
        // );
        // const fromDatePlusOne = moment(values?.FromDate)
        //   .add(1, "day")
        //   .toDate();

        // if (rcdDate > fromDatePlusOne) {
        //   message.destroy();
        //   message.warning({
        //     content: "From Date should not be less than the RCD Date.",
        //     className: "custom-msg",
        //     duration: 2,
        //   });
        //   return;
        // }
      }

      setIsLoading(true);
      const obj = {
        CallType: props?.selectedCallType, // Required
        SubType: props?.selectedSubTypeId, // Required
        RequestSource: loginInfo?.userProfileInfo?.profileObj?.role || 0, // Required
        // RequestChannel: loginInfo?.userProfileInfo?.profileObj?.role === 14 ? 13 :  values.requestchannel  || 3, // Required
        RequestChannel: values?.requestchannel || 0,
        Category: 2,
        ApplicationNo:
          details?.policyDetailsObj?.identifiers?.applicationNo ||
          customerData?.applicationNo,
        DOB: convertDate(customerData?.dob),
        PolicyNo:
          details?.policyDetailsObj?.identifiers?.policyNo ||
          customerData?.policyNo, // Required
        CustomerId:
          values.GSTINToBeUpdateFor === 1
            ? customerData?.laClientID
            : customerData?.poClientID,
        CustRole: values.custRole,
        policyStatus:
          details?.policyDetailsObj?.planAndStatus?.policyStatus ||
          customerData?.policyStatus,
        proposerName:
          details?.policyDetailsObj?.identifiers?.po_Name ||
          customerData?.poName,
        plan: details?.policyDetailsObj?.planAndStatus?.planName,
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
      if (props?.EmailResponse?.IsEmailmanagent) {
        obj.TransactionData.push({
          Status: "Create",
          TagName: "EmailResponseId",
          TagValue: props?.EmailResponse?.EmailResponseId,
        });
      }
      let response = apiCalls.genericAPI(obj);
      response
        .then((val) => {
          if (val?.data) {
            setServiceRequestId(val?.data?.srvReqRefNo);
            setAlertTitle("Request Created Successfully");
            let successMessage =
              val?.data?.tat > 0
                ? `Ticket ID Number ${
                    val?.data?.srvReqRefNo
                  }. Your request will be processed in ${
                    val?.data?.tat || 0
                  } days`
                : `Ticket ID Number ${val?.data?.srvReqRefNo}.`;
            setAlertData(successMessage);
            if (!props?.EmailResponse?.IsEmailmanagent) {
              setNavigateTo("/advancesearch");
            }
            setShowAlert(true);

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
    }
  };

  // const convertDateToHours = (date) => {
  //   return Math.abs(new Date(date) - new Date()) / 36e5; // Convert milliseconds to hours
  // };

  const handleFromDateValidate = (values) => {
    const rcdDate = new Date(
      convertDate(details?.policyDetailsObj?.saDetails?.rcd)
    );
    const selectDate = new Date(dayjs(values.FromDate));
    // const hoursDifference = convertDateToHours(new Date(dayjs(values.FromDate)) - rcdDate);
    if (selectDate <= rcdDate) {
      return true;
    } else {
      return false;
    }
  };

  const handleToDateChange = (toDate, fromDate) => {
    const selectedToDate = new Date(dayjs(toDate));
    // setToDate(selectedToDate);

    // Validate that toDate is not allowed after 3 months from fromDate
    const threeMonthsLater = new Date(dayjs(fromDate));
    // const threeMonthsLater = new Date(fromDate);
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

    if (selectedToDate > threeMonthsLater) {
      return true;
      //setError('To date must be within 3 months from the selected from date.');
    } else {
      return false;
      //setError('');
    }
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
    //     setRequirementLoader(true);
    if (raiseRequirementOpen) {
      handleSubmit(formData);
    }
  };
  const popupClose = () => {
    setRaiseRequirementOpen(false);
  };

  const handleTextLink = (item) => {
    setIsDoumentModalOpen(true);
  };
  const handleDocumentSubmit = () => {
    let ids = documentsData
      ?.filter((e) => e.status === true)
      ?.map((e) => ({ indexName: e.indexName, doc_id: e.doc_id }));

    if (ids.length === 0) {
      message.error({
        content: "Please Select Documents",
        className: "custom-msg",
        duration: 3,
      });
      return;
    } else if (ids.length > 2) {
      message.error({
        content: "Maximum 2 Documents can be selected",
        className: "custom-msg",
        duration: 3,
      });
      return;
    }

    // if (ids.length === 1) {
    //   setCertificateData(ids);
    //   setIsDoumentModalOpen(false);
    // } else if (ids.length === 2) {
    //   setCertificateData(ids);
    //   setIsDoumentModalOpen(false);
    // }
    if (ids.length > 0) {
    ids.forEach((item, index) => {
    if (item.doc_id != 0) {
    
    setCertificateData_New(prevState => [...prevState, `${item.doc_id}-${item.indexName}`]);
    
    } else {
      setCertificateData(prevState => [...prevState, item.indexName]);
    }
    });
    setIsDoumentModalOpen(false);
  } 
  };

  return (
    <>
      <Spin spinning={isLoading} fullscreen />
      <Form
        // initialValues={data}
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
        <div>
          <DetailsForm
            data={
              !isShowPOSScreen
                ? Data[selectedSubType]?.BOE_Details
                : Data[selectedSubType]?.POS_Details ||
                  (selectedSubType === "changeinsignature"
                    ? []
                    : Data[selectedSubType]?.BOE_Details)
            }
            subType={selectedSubType}
            handleTitleCheckBox={handleTitleCheckBox}
            toggleInputField={toggleInputField}
            showEmailAddress={showEmailAddress}
            showPhoneNumber={showPhoneNumber}
            showWhatsApp={showWhatsApp}
            handleDropdownChange={handleDropdownChange}
            showDateRangeFields={showDateRangeFields}
            showPaymentCheckBox={showPaymentCheckBox}
            handleDateChange={handleDateChange}
            sisLU={sisLU}
            handleTextLink={handleTextLink}
            PPCLU={options}
          ></DetailsForm>
        </div>

        {showDateRangeFields && (
          <>
            <DetailsForm
              data={Data[selectedSubType]?.Receipt_Range_Fields}
              subType={selectedSubType}
              handleDateChange={handleDateChange}
            ></DetailsForm>
          </>
        )}
        {selectedSubType?.indexOf("renewal") > -1 && (
          <>
            <DetailsForm
              data={Data[selectedSubType]?.Send_Fields}
              subType={selectedSubType}
              toggleInputField={toggleInputField}
              showEmailAddress={showEmailAddress}
              showPhoneNumber={showPhoneNumber}
              showWhatsApp={showWhatsApp}
            ></DetailsForm>
          </>
        )}

        {showEmailFields && (
          <>
            <ContactForm
              showEmailAddress={showEmailAddress}
              showPhoneNumber={showPhoneNumber}
              showWhatsApp={showWhatsApp}
            />
          </>
        )}

        {isShowTransferFields && (
          <>
            <div
              className={
                props?.fullWidth
                  ? "generate-full seeding-section"
                  : "generate-btn seeding-section"
              }
            >
              {!isShowPOSScreen && (
                <>
                  {Data[selectedSubType]?.Buttons?.map((button, index) => (
                    <Button
                      type="primary"
                      className="primary-btn"
                      key={index}
                      onClick={() => {
                        handleButtonClick(button);
                      }}
                    >
                      {button.label}
                    </Button>
                  ))}
                </>
              )}
              {isShowPOSScreen && (
                <>
                  {Data[selectedSubType]?.POS_Buttons?.map((button, index) => (
                    <Button
                      type="primary"
                      className="primary-btn"
                      key={index}
                      onClick={() => {
                        handleButtonClick(button);
                      }}
                    >
                      {button.label}
                    </Button>
                  ))}
                </>
              )}
            </div>
          </>
        )}

        {/*Checklist Code Start*/}
        {!Data[selectedSubType]?.hideChecklist &&
          !isShowPOSScreen &&
          !isShowTransferFields && (
            <>
              <div style={{ marginTop: "26px" }}>
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
                    form={form}
                    //   suffix={!isShowPOSScreen && suffix}
                    //   disabledDate={disabledDate}
                  ></DetailsForm>
                </div>
              </div>
            </>
          )}

        {/*Checklist Code End*/}
        {!Data[selectedSubType]?.Details_Buttons &&
          !Data[selectedSubType]?.hideSubmitBtns && (
            <>
              <div className="contact-details-btn">
                {/* {!isShowPOSScreen && (
                    <>
                      <Button type="primary" className="primary-btn">
                        Close
                      </Button>
                    </>
                  )} */}
                {isShowPOSScreen && (
                  <>
                    <Button type="primary" className="primary-btn">
                      Back
                    </Button>
                  </>
                )}
                {hideSubmitBtns && (
                  <Button
                    type="primary"
                    className="primary-btn"
                    htmlType="submit"
                  >
                    {!isShowPOSScreen ? "Submit" : "Approve"}
                  </Button>
                )}
                {(isShowPOSScreen ||
                  (!isShowPOSScreen &&
                    selectedSubType !== "premiumpaidcertificate" &&
                    selectedSubType !== "renewalpremiumreceipt")) && (
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
                {/* {!isShowPOSScreen &&
                  selectedSubType !== "premiumpaidcertificate" &&
                  selectedSubType !== "renewalpremiumreceipt" && (
                    <Button
                      type="primary"
                      className="primary-btn"
                      onClick={() => getRaiseRequirements()}
                    >
                      Raise Requirement
                    </Button>
                  )} */}
              </div>
            </>
          )}
      </Form>
      {/* </Spin> */}
      {showAlert && (
        <PopupAlert
          alertData={alertData}
          title={alertTitle}
          navigate={navigateTo}
          setShowAlert={setShowAlert}
          getAdvance={props.getAdvance}
        >
          {" "}
        </PopupAlert>
      )}

      <RaiseRequirementPopup
        raiseRequerimentList={raiseRequerimentList}
        raiseRequirementOpen={raiseRequirementOpen}
        requirementModalLoader={requirementModalLoader}
        handleRequirementSubmit={handleRequirementSubmit}
        popupClose={popupClose}
        isShowPOSScreen={isShowPOSScreen}
        requirementsForm={requirementsForm}
      />

      <Modal
        title="Receipts"
        open={isDocumentModalOpen}
        destroyOnClose={true}
        width={1200}
        closeIcon={false}
        footer={null}
      >
        {/* <Spin spinning={props?.requirementModalLoader}> */}
        <div>
          {/* <span className='service_documents'>Maximum 2 Documents can be selected</span> */}
          <Form onFinish={handleDocumentSubmit}>
            <div className="reuirement">
              <table className="responsive-table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th className="z-index">Select</th>
                  </tr>
                </thead>
                <tbody>
                  {documentsData?.length > 0 &&
                    documentsData?.map((item, ind) => (
                      <tr key={ind + 1}>
                        <td>{item.indexName}</td>
                        <td>
                          {" "}
                          <Checkbox
                            type="checkbox"
                            onChange={(e) => (item.status = e.target.checked)}
                          />
                        </td>
                      </tr>
                    ))}
                  {documentsData?.length === 0 && (
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
            <div className="contact-details-btn">
              <Button
                type="primary"
                className="primary-btn"
                htmlType="submit"
                //onClick={()=>handleRequirementSubmit()}
              >
                Submit
              </Button>

              <Button
                type="primary"
                className="primary-btn"
                onClick={() => setIsDoumentModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </Form>
        </div>

        {/* </Spin> */}
      </Modal>
    </>
  );
};
export default ServicingDocuments;