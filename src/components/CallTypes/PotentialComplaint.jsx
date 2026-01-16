import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { PartialComplaintData } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import { useParams } from "react-router-dom";
import { Button, Form, Spin, message, Checkbox } from "antd";
import moment from "moment";
import apiCalls from "../../api/apiCalls";
import PopupAlert from "../popupAlert";
import UploadIcon from "../../assets/images/upload.png";
import dayjs from "dayjs";
import RaiseRequirementPopup from "../RaiseRequirementPopup";

const PotentialComplaint = (props) => {
  const loginInfo = useSelector((state) => state);
  const [form] = Form.useForm();
  const [requirementsForm] = Form.useForm();
  const {
    selectedSubType,
    customerData,
    details,
    setSelectedSubType,
    typesForm,
    requestModeLU,
    clientEnquiryData,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertData, setAlertData] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const suffix = <img src={UploadIcon} alt="" />;
  const [uploadFiles, setUploadFiles] = useState([]);
  const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [vaildateSignature, setVaildateSignature] = useState(false);
  const [radioValuesToEnable, setRadioValuesToEnable] = useState({});
  const [showRaiseRequirementBtn, setShowRaiseRequirementBtn] = useState(false);
  const [ReRenderComponent, setReRenderComponent] = useState(false);
  const [showReasonDelayField, setShowReasonDelayField] = useState(false);
  const [UpdateState, setUpdateState] = useState(false);
  const shouldLog = useRef(true);
  let { serviceId } = useParams();
  const [srvReqID, setSrvReqID] = useState(0);
  const [CALL_TyPES, setCALL_TyPES] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [isfreshTicket, setIsfreshTicket] = useState(true);
  const [isreopenTicket, setIsReopenTicket] = useState(false);
  const [freshTicketData, setFreshTicketData] = useState({});
  const [reopenTicketData, setReopenTicketData] = useState({});
  const [areButtonsEnabled, setAreButtonsEnabled] = useState(true);
  const [emsrequestchannel, setEmsrequestchannel] = useState();

  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      //getClientEnquiry();
    }
    if (props?.EmailResponse?.IsEmailmanagent) {
      if (
        selectedSubType === "unfairbusinesspractices" ||
        selectedSubType === "proposalprocessing" ||
        selectedSubType === "policyservicing" ||
        selectedSubType === "survivalclaim" ||
        selectedSubType === "deathclaim" ||
        selectedSubType === "uliprelated" ||
        selectedSubType === "others" ||
        selectedSubType === "complaintreopen"
      ) {
        PartialComplaintData[selectedSubType]?.BOE_Details?.forEach(
          (element) => {
            if (element?.label === "Request Mode") {
              form.setFieldsValue({
                // requestchannel: "Email"
                requestchannel: 4,
              });
              element.disabled = true;
              setEmsrequestchannel(4);
            }
          }
        );
        PartialComplaintData[selectedSubType]?.BOE_Detailsreopen1?.forEach(
          (element) => {
            if (selectedSubType === "complaintreopen") {
              if (element?.label === "Request Mode") {
                form.setFieldsValue({
                  // requestchannel: "Email"
                  requestchannel: 4,
                });
                element.disabled = true;
              }
            }
          }
        );
        PartialComplaintData[selectedSubType]?.BOE_Details?.forEach(
          (element) => {
            if (
              element?.name === "CustomerSigningDate" ||
              element?.name === "BranchReceivedDate" ||
              element?.name === "ValidateSignature"
            ) {
              element.hide = true;
            }
            if (element?.name === "UploadComplaintLetter") {
              element.required = false;
            }
          }
        );
        PartialComplaintData[selectedSubType]?.BOE_Detailsreopen1?.forEach(
          (element) => {
            if (
              element?.name === "CustomerSigningDate" ||
              element?.name === "BranchReceivedDate" ||
              element?.name === "ValidateSignature"
            ) {
              element.hide = true;
            }
            if (element?.name === "UploadComplaintLetter") {
              element.required = false;
            }
          }
        );
      }
      if (
        selectedSubType === "unfairbusinesspractices" ||
        selectedSubType === "proposalprocessing" ||
        selectedSubType === "policyservicing" ||
        selectedSubType === "survivalclaim" ||
        selectedSubType === "deathclaim" ||
        selectedSubType === "uliprelated" ||
        selectedSubType === "others" ||
        selectedSubType === "complaintreopen"
      ) {
        PartialComplaintData[selectedSubType]?.BOE_Detailsreopen?.forEach(
          (element) => {
            if (element?.label === "Request Mode") {
              form.setFieldsValue({
                // requestchannel: "Email"
                requestchannel: 4,
              });
              element.disabled = true;
            }
          }
        );
        PartialComplaintData[selectedSubType]?.BOE_Detailsreopen?.forEach(
          (element) => {
            if (
              element?.name === "CustomerSigningDate" ||
              element?.name === "BranchReceivedDate" ||
              element?.name === "ValidateSignature"
            ) {
              element.hide = true;
            }
            if (element?.name === "UploadComplaintLetter") {
              element.required = false;
            }
          }
        );
        PartialComplaintData[selectedSubType]?.BOE_Detailsreopen1?.forEach(
          (element) => {
            if (
              element?.name === "CustomerSigningDate" ||
              element?.name === "BranchReceivedDate" ||
              element?.name === "ValidateSignature"
            ) {
              element.hide = true;
            }
            if (element?.name === "UploadComplaintLetter") {
              element.required = false;
            }
          }
        );
      }
    }
    // if(props?.EmailResponse?.IsEmailmanagent && (selectedSubType==='unfairbusinesspractices'||selectedSubType==='proposalprocessing'||selectedSubType==='policyservicing'||selectedSubType==='survivalclaim'
    //   ||selectedSubType==='deathclaim'||selectedSubType==='uliprelated'||selectedSubType==='others'||selectedSubType==='complaintreopen')){
    //   PartialComplaintData[selectedSubType]?.BOE_Details?.forEach(element => {
    //     if(element?.label==="Request Mode"){
    //       form.setFieldsValue({
    //         // requestchannel: "Email"
    //         requestchannel: 4
    //       });
    //       element.disabled=true;
    //     }
    // })
    // PartialComplaintData[selectedSubType]?.BOE_Details?.forEach(element => {
    //   if(element?.name==="CustomerSigningDate"||element?.name==="BranchReceivedDate"||element?.name==="ValidateSignature"){
    //     element.hide=true;
    //   }
    // })

    // }
  }, [selectedSubType]);
  const transformData = (data, keyy) => {
    const filteredData = data?.filter((ele) => ele.key === keyy);
    return filteredData[0]?.value?.map((item, index) => ({
      ...item,
      label: item.mstDesc,
      value: item.mstID,
    }));
  };
  const formatdate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const getUploadFiles = (listOfUploadFiles) => {
    const updatedUploadList = listOfUploadFiles?.map((obj) => {
      // Rename IndexName to "CSD_Complaint"
      const { IndexName, ...newObject } = obj;
      return {
        ...newObject,
        IndexName: "CSD_Complaint",
      };
    });

    // Update the state with the new list
    setUploadFiles(updatedUploadList);
  };
  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day"); // Can not select days before today and today
  };
  const getCTST = (srInfo) => {
    let obj = {
      MasterRequest: ["CALL_TYP", "SUB_TYP", "REQST_MODE"],
    };
    let CTST = apiCalls.ctst(obj);
    CTST.then((val) => {
      setMasterData(val.data);
      const transformedData = transformData(val.data, "CALL_TYP");
      const transformedSubType = transformData(val.data, "SUB_TYP");
      const rquestModeData = transformData(val.data, "REQST_MODE");
      setCALL_TyPES(transformedData);
      let callTypeId = srInfo?.data?.callType;
      let subTypeId = srInfo?.data?.subType;
      let callTypeData =
        val.data.find((item) => item.key === "CALL_TYP")?.value || [];
      let subTypeData =
        val.data.find((item) => item.key === "SUB_TYP")?.value || [];
      let callTypeDesc =
        callTypeData.find((item) => item.mstID === callTypeId)?.mstDesc ||
        "Not Found";
      let subTypeDesc =
        subTypeData.find(
          (item) => item.mstID === subTypeId && item.mstParentID === callTypeId
        )?.mstDesc || "Not Found";
      // form.setFieldsValue({
      //    callType:callTypeDesc,
      //    subType:subTypeDesc,
      //     });
      setIsLoading(false);
    }).catch((err) => {
      setIsLoading(false);
      message.destroy();
      message.error({
        content: err?.data?.responseBody?.errormessage,
        className: "custom-msg",
        duration: 2,
      });
    });
  };

  const onBlurInput = async (value, item) => {
    if (item.label === "Enter Ticket ID") {
      const val = await apiCalls.getPOSIndividualData(value);
      getCTST(val);
    }
    if (item.label === "Enter Existing Ticket ID") {
      const val = await apiCalls.getPOSIndividualData(value);
      const createdOn = new Date(val?.data?.closedOn);
      const currentDate = new Date();

      const timeDiff = currentDate - createdOn; // difference in milliseconds
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // convert to days
      const complaintDuration = `${daysDiff} days`;
      // const canComplaintBeReopened = daysDiff <= 56 ? "Yes" : "No";
      const canReopenVal = val?.data?.canComplaintBeReOpened ? "Yes" : "No";
      setAreButtonsEnabled(canReopenVal === "Yes");
      form.setFieldsValue({
        // // closedOn
        callType: val?.data?.complaintType,
        subType: val?.data?.complaintDescription,
        complaintstatus: val?.data?.igmsComplaintStatus,
        complaintdecision: val?.data?.type_of_disposal || "NA",
        complaintduration: complaintDuration,
        CanComplaintbeReOpened: canReopenVal,
        tokenid: val?.data?.irdA_Token_Number,
      });
      getCTST(val);
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

  const handleDropdownChange = (e, item) => {};
  const handleRadioChange = (e, item) => {
    if (selectedSubType === "unfairbusinesspractices") {
      setRadioValuesToEnable((prevState) => ({
        ...prevState,
        [item.name]: e.target.value,
      }));
    }

    setShowRaiseRequirementBtn(false);
    //  if((item?.label?.includes("Validate Signature")||item?.label?.includes("Signature Validated"))&&e.target.value==="no"){
    //   setShowRaiseRequirementBtn(true);
    //  }
    if (e.target.value === "no" && item.name === "ValidateSignature") {
      // setShowRaiseRequirementBtn(true);
      setVaildateSignature(true);
    } else if (item.name === "ValidateSignature") {
      setVaildateSignature(false);
    }

    if (e.target.value === "no" && item.name === "FundTransfer") {
      PartialComplaintData[selectedSubType]?.BOE_Details?.forEach(
        (item, index) => {
          if (item.d_FundTransfer) {
            item.hide = true;
          }
        }
      );
      setReRenderComponent(!ReRenderComponent);
    } else if (item.name === "FundTransfer" && e.target.value === "yes") {
      PartialComplaintData[selectedSubType]?.BOE_Details?.forEach(
        (item, index) => {
          console.log("item", item);
          if (item.d_FundTransfer) {
            item.hide = false;
          }
        }
      );
      form.setFieldsValue({
        ReasonForFundTransfer: "Renewal Payment",
      });
      setReRenderComponent(!ReRenderComponent);
    }
  };
  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };
  useEffect(() => {
    form.resetFields(); // Clears previous form data
    if (props?.EmailResponse?.IsEmailmanagent) {
      const currentRequestChannel = form.getFieldValue("requestchannel") || 4; // Preserve requestchannel
      form.resetFields(); // Reset other fields
      form.setFieldsValue({
        requestchannel: currentRequestChannel, // Restore requestchannel
      });
    }
  }, [selectedSubType, isfreshTicket, isreopenTicket]);
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
    setShowReasonDelayField(false);
    if (item === "BranchReceivedDate") {
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
        form.setFieldsValue({ BranchReceivedDate: "" });
        return;
      } else {
        PartialComplaintData[selectedSubType]?.BOE_Details?.forEach(
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
        PartialComplaintData[selectedSubType]?.BOE_Detailsreopen1?.forEach(
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
      setUpdateState(!UpdateState);
    }
  };

  const getTransactionData = (values) => {
    return [
      {
        Status: "Create",
        TagName: "AdditionalNoteForCustomer",
        TagValue:
          values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
      },
      {
        Status: "Create",
        TagName: "ComplaintForm",
        TagValue: values?.ComplaintForm || "",
      },
      {
        Status: "Create",
        TagName: "ComplaintDescription",
        TagValue: values?.ComplaintDescription || "",
      },
      { Status: "Create", TagName: "callType", TagValue: values?.callType },
      { Status: "Create", TagName: "subType", TagValue: values.subType },
      {
        Status: "Create",
        TagName: "complaintstatus",
        TagValue: values?.complaintstatus,
      },
      {
        Status: "Create",
        TagName: "complaintdecision",
        TagValue: values.complaintdecision,
      },
      {
        Status: "Create",
        TagName: "enterexistingticketid",
        TagValue: values.enterexistingticketid,
      },
      { Status: "Create", TagName: "Comments", TagValue: values.Comments },
      {
        Status: "Create",
        TagName: "requestchannel",
        TagValue: values?.requestchannel,
      },
      {
        Status: "Create",
        TagName: "CustomerSigningDate",
        TagValue: formatdate(values?.CustomerSigningDate),
      },
      {
        Status: "Create",
        TagName: "BranchReceivedDate",
        TagValue: formatdate(values?.BranchReceivedDate),
      },
      {
        Status: "Create",
        TagName: "ReasonForDelay",
        TagValue: values?.ReasonForDelay,
      },

      {
        Status: "Create",
        TagName: "RequestorComments",
        TagValue: values?.RequestorComments,
      },
      {
        Status: "Create",
        TagName: "complaintduration",
        TagValue: values?.complaintduration,
      },
      {
        Status: "Create",
        TagName: "CanComplaintbeReOpened",
        TagValue: values?.CanComplaintbeReOpened,
      },
      { Status: "Create", TagName: "tokenid", TagValue: values?.tokenid },

      {
        Status: "Create",
        TagName: "ValidateSignature",
        TagValue: props?.EmailResponse?.IsEmailmanagent
          ? "NA"
          : values?.ValidateSignature,
      },

      { Status: "Create", TagName: "IsComplaint", TagValue: "" },
      { Status: "Create", TagName: "EmailTo", TagValue: "" },
      { Status: "Create", TagName: "EmailCC", TagValue: "" },
      { Status: "Create", TagName: "EmailFrom", TagValue: "" },
      // { Status: "Create", TagName: "EmailSubject", TagValue: values?.subject },
      { Status: "Create", TagName: "EmailBod", TagValue: "" },
    ];
  };
  const handleSubmit = (values) => {
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
        CustomerSigningDate: "",
      });
      setIsLoader(false);
      return;
    }
    setIsLoading(true);
    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: loginInfo?.userProfileInfo?.profileObj?.role || 0, // Required
      RequestChannel:
        loginInfo?.userProfileInfo?.profileObj?.role === 14
          ? 13
          : values.requestchannel || emsrequestchannel, // Required
      Category: 2,
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
      TransactionData: getTransactionData(values) || [],
      Uploads: uploadFiles || [],
      CurrentStatus: raiseRequirementOpen ? "Reject" : "",
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
          TagName: "EmailSubject",
          TagValue: props?.EmailResponse?.subject,
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
          //   setAlertTitle("Request Created Successfully");
          //   setAlertData(`${"Ticket No " + val?.data?.srvReqRefNo}`);
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
      {!props?.EmailResponse?.IsEmailmanagent && (
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
            data={PartialComplaintData[selectedSubType]?.BOE_Details}
            subType={selectedSubType}
            handleDropdownChange={handleDropdownChange}
            handleDateChange={handleDateChange}
            suffix={suffix}
            form={form}
            onBlurInput={onBlurInput}
            getUploadFiles={getUploadFiles}
            disabledDate={disabledDate}
            handleRadioChange={handleRadioChange}
            requestModeLU={requestModeLU}
          ></DetailsForm>

          {selectedSubType === "complaintreopen" && (
            <DetailsForm
              data={PartialComplaintData[selectedSubType]?.BOE_Detailsreopen1}
              subType={selectedSubType}
              handleDropdownChange={handleDropdownChange}
              handleDateChange={handleDateChange}
              suffix={suffix}
              form={form}
              onBlurInput={onBlurInput}
              getUploadFiles={getUploadFiles}
              disabledDate={disabledDate}
              handleRadioChange={handleRadioChange}
              requestModeLU={requestModeLU}
            ></DetailsForm>
          )}

          <div className="contact-details-btn">
            <Button
              type="primary"
              htmlType="submit"
              className="primary-btn"
              disabled={!areButtonsEnabled || vaildateSignature}
            >
              Submit
            </Button>{" "}
            {loginInfo?.userProfileInfo?.profileObj?.role === 1 && (
              <Button
                type="primary"
                className="primary-btn"
                onClick={() => getRaiseRequirements()}
                disabled={!areButtonsEnabled}
              >
                Raise Requirement
              </Button>
            )}
          </div>
        </Form>
      )}
      {props?.EmailResponse?.IsEmailmanagent && (
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
            data={PartialComplaintData[selectedSubType]?.BOE_Details}
            subType={selectedSubType}
            handleDropdownChange={handleDropdownChange}
            handleDateChange={handleDateChange}
            suffix={suffix}
            form={form}
            onBlurInput={onBlurInput}
            getUploadFiles={getUploadFiles}
            disabledDate={disabledDate}
            handleRadioChange={handleRadioChange}
            requestModeLU={requestModeLU}
          ></DetailsForm>

          {selectedSubType === "complaintreopen" && (
            <DetailsForm
              data={PartialComplaintData[selectedSubType]?.BOE_Detailsreopen1}
              subType={selectedSubType}
              handleDropdownChange={handleDropdownChange}
              handleDateChange={handleDateChange}
              suffix={suffix}
              form={form}
              onBlurInput={onBlurInput}
              getUploadFiles={getUploadFiles}
              disabledDate={disabledDate}
              handleRadioChange={handleRadioChange}
              requestModeLU={requestModeLU}
            ></DetailsForm>
          )}
          <div className="contact-details-btn">
            <Button
              type="primary"
              htmlType="submit"
              className="primary-btn"
              disabled={!areButtonsEnabled || vaildateSignature}
            >
              Submit
            </Button>{" "}
            {/* {( loginInfo?.userProfileInfo?.profileObj?.role=== 1 ) && (
              <Button type="primary" className="primary-btn" onClick={()=>getRaiseRequirements()}>
                Raise Requirement
              </Button>
            )} */}
          </div>
        </Form>
      )}
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

export default PotentialComplaint;
