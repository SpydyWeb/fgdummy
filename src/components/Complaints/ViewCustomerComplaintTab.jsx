import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Switch,
  message,
  Select,
  Modal,
  DatePicker,
  Collapse,
  Spin,
  Radio,
  Tooltip,
  Checkbox,
} from "antd";
import { Routes, Route, useParams, useLocation } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import apiCalls from "../../api/apiCalls";
import moment from "moment";
import ReactQuill from "react-quill-new";
import DetailsForm from "../../utils/DetailsForm";
import PopupAlert from "../popupAlert";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import CloseIcon from "../../assets/images/close-icon.png";
import SalesInteractionTab from "./SalesInteractionTab";
import CustomerInteractionTab from "./CustomerInterationTab";
import ComplaintsUser from "./complaintsUser";
//import { data } from 'jquery';

const ErrorPopup = ({ errors, open, onClose }) => {
  return (
    <Modal
      title="Errors"
      open={open}
      destroyOnClose={true}
      width={1200}
      closeIcon={false}
      footer={null}
    >
      <Spin spinning={false}>
        <div>
          <div className="requirement">
            <table className="responsive-table">
              <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Error Code</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {errors.length > 0 ? (
                  errors.map((error, index) => (
                    <tr key={index + 1}>
                      <td>{index + 1}</td>
                      <td>{error.errorCode}</td>
                      <td>{error.value}</td>
                    </tr>
                  ))
                ) : (
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
          <div className="contact-details-btn">
            <Button type="primary" className="primary-btn" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </Spin>
    </Modal>
  );
};

const ViewCustomerComplaintTab = (props) => {
  const [form] = Form.useForm();
  const [EmailFromCustomer, setEmailFromCustomer] = useState("");
  const [statusOptions, setStatusOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [CALL_TyPES, setCALL_TyPES] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [requestModeLU, setRequestModeLU] = useState([]);
  const [subTypeLU, setSubTypeLU] = useState(null);
  const [SelectedSubTypeVal, setSelectedSubTypeVal] = useState(null);
  const [selectedCallType, setSelectedCallType] = useState("");
  const [selectedSubTypeId, setSelectedSubTypeId] = useState("");
  const [selectedSubType, setSelectedSubType] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [complaintTypes, setComplaintTypes] = useState([]);
  const [complaintDesc, setComplaintDesc] = useState([]);
  const [complaintSource, setComplaintSource] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [cityOptionsList, setCityOptionsList] = useState([]);
  const [alertTitle, setAlertTitle] = useState("");
  const loginInfo = useSelector((state) => state);
  const [alertData, setAlertData] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  let { serviceId } = useParams();
  const [isSending, setIsSending] = useState(false);
  const [IRDATokenNumber, setIRDATokenNumber] = useState("");
  const [RegisterComplaintID, setComplaintID] = useState(0);
  const [ResponseForCustomer, setResponseForCustomer] = useState("");
  const [EmailSubject, setEmailSubject] = useState("");
  const [TicketStatus, setTicketStatus] = useState("");
  const [srvReqID, setSrvReqID] = useState(0);
  const [oldSrvReqID, setOldSrvReqID] = useState(0);
  const [isEmailButton, setIsEmailButton] = useState(false);
  const [pinCode, setPinCode] = useState(0);
  const [ReceipientTo, SetReceipientTo] = useState("");
  const [ReceipientCC, SetReceipientCC] = useState("");
  const [PolicyNo, SetPolicyNo] = useState("");
  const [typeOfDisposalData, setTypeOfDisposalData] = useState([]);
  const [complaintCopyResponse, setComplaintCopyResponse] = useState(null);

  const [showPincodeField, setShowPincodeField] = React.useState(true);
  const [tagComplaint, setTagComplaint] = useState(false);
  const dateFormat = "DD/MM/YYYY";
  const [customerSigningDate, setCustomerSigningDate] = useState(null);
  const [branchReceivedDate, setBranchReceivedDate] = useState(null);
  const [showReasonField, setShowReasonField] = useState(false);
  const [dynamicFields, setDynamicFields] = useState([]);
  const [sections1, setSections1] = useState([]);
  const [sections2, setSections2] = useState([]);
  const [showReopenModal, setShowReopenModal] = useState(false);
  const TypeOfComplaintDropdown = [
    { label: "Service-related complaint", value: "Service-related complaint" },
    { label: "Sales-related complaint", value: "Sales-related complaint" },
  ];
  const ComplaintDispositionLU = [
    { label: "In favour", value: "infavour" },
    { label: "Rejected", value: "rejected" },
    { label: "Partially in favour", value: "partiallyinfavour" },
  ];
  const complaintFormLU = [
    { label: "Life Assured", value: "LifeAssured" },
    { label: "Proposer", value: "Proposer" },
    { label: "Nominee", value: "Nominee" },
    { label: "Appointee", value: "Appointee" },
    { label: "Agent", value: "Agent" },
    { label: "Other", value: "Other" },
  ];
  const [errors, setErrors] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [emailBody, setEmailBody] = useState([]);
  const [serviceRequestTransactionData, setServiceRequestTransactionData] =
    useState([]);
  const [fromEmail, setFromEmail] = useState("");
  const [emailCreatedDate, setEmailCreatedDate] = useState("");
  const [createdOnDate, setCreatedOnDate] = useState("");
  const [complaintDescription, setComplaintDescription] = useState("");
  const [isfreshTicket, setIsfreshTicket] = useState(true);
  const [complaintStatus1, setComplaintStatus1] = useState(null);
  const [isreopenTicket, setIsReopenTicket] = useState(false);
  const [freshTicketData, setFreshTicketData] = useState({});
  const [reopenTicketData, setReopenTicketData] = useState({});
  const [copyIconClicked, setCopyIconClicked] = useState(false);
  const [copyIconClickedpopup, setCopyIconClickedPopup] = useState(false);
  // const [isIGMSLinkEnabled, setIsIGMSLinkEnabled] = useState(false);
  const [reopenClicked, setReopenClicked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [claimsResponse, setClaimsResponse] = useState(false);
  // const handleCopy = () => {
  //   setCopyIconClicked(true);
  //   setShowReopenModal(true)
  // }
  const handleCopy = () => {
    const complaintduration = form.getFieldValue("complaintduration");
    const complaintStatus = form.getFieldValue("complaintstatus")?.trim(); // remove any spaces

    if (complaintduration <= "56 days" && complaintStatus === "Attended To") {
      setCopyIconClicked(true);
      setShowReopenModal(true);
    } else {
      message.warning(
        "Reopen is only allowed when complaint duration is 56 or less and status is Attended To."
      );
    }
  };
  const handleReopen = () => {
    getCopyDetails();
    setReopenClicked(true);
    setShowReopenModal(false);
  };
  const handleClose = () => {
    setShowReopenModal(false);
  };
  const handleViewUserAgeing = async () => {
    setShowViewModal(true);

    let obj = {
      emailClassCTST: {
        SrvReqID: srvReqID, // Sends the `srvReqID` in the request body.
      },
    };

    // Makes an API call to fetch email details.
    const response = await apiCalls.getEmailResponseBodyAPI(obj); // Fetch email data
    const rawEmailContent =
      response.data.emailClassify[0]?.body || "No content available.";
    const cleanEmailContent = rawEmailContent
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim(); // Remove HTML tags
    const fromEMail = response.data.emailClassify[0]?.from;
    const createdDate = response.data.emailClassify[0]?.receivedDateTime;

    //const fullBody = res.body;
    //const filteredBody = fullBody.split("DISCLAIMER:")[0].trim();
    //setEmailFromCustomer(filteredBody);
    setEmailBody(cleanEmailContent.split("DISCLAIMER:")[0].trim());
    setFromEmail(fromEMail);
    setEmailCreatedDate(createdDate);
  };
  const customerComplaintsObj = {};

  useEffect(() => {
    const initialize = async () => {
      try {
        const srInfo = await getPOSIndividualData();
        await getCTST(srInfo);
        await setClientResponse();
      } catch (error) {
        console.error("Initialization error:", error);
      }
    };

    initialize();
  }, []);

  const handleRadioChange = (e) => {
    setTagComplaint(e.target.value);
  };
  const handleCheckbox = (type) => {
    if (type === "freshticket") {
      setReopenTicketData(form.getFieldsValue()); // Save reopen ticket data
      form.setFieldsValue(freshTicketData);
      setIsfreshTicket(true);
      setIsReopenTicket(false);
    }
    if (type === "reopenticket") {
      setFreshTicketData(form.getFieldsValue()); // Save fresh ticket data
      form.setFieldsValue(reopenTicketData);
      setIsfreshTicket(false);
      setIsReopenTicket(true);
    }
  };
  const getCopyDetails = async () => {
    let formdata = form.getFieldValue();
    let obj = {
      oldComplaintRefNumber: formdata.enterexistingticketid,
      newComplaintRefNumber: serviceId,
    };

    try {
      setIsLoading(true); // start loading
      let response = await apiCalls.GetCopyDetails(obj);
      setClaimsResponse(response);
      setComplaintCopyResponse(response);
      props?.setComplaintCopyResponse(response);
      const values = response?.data?.serviceRequestTransectionData || [];
      setOldSrvReqID(response?.data?.oldSrvReqID);
      form.setFieldsValue({
        subtype: response?.data?.complaintDescription,
        calltype: response?.data?.complaintType,
      });
      // Create a map of the latest non-empty tagValue for each tagName
      const tagMap = {};
      values.forEach((item) => {
        const name = item.tagName?.trim();
        const value = item.tagValue;

        // Replace only if value is not null or empty string
        if (name && value !== null && value !== "") {
          tagMap[name] = value;
        }
      });

      // Handle tagComplaint separately
      if ("TagComplaint" in tagMap) {
        const tagComplaintValue = tagMap["TagComplaint"] === "true";
        form.setFieldsValue({ tagComplaint: tagComplaintValue });
        setTagComplaint(tagComplaintValue);
      }

      // If needed, uncomment this to populate more form fields using tagMap
      // form.setFieldsValue({
      //   // RCA Details
      //   Comp_Observations: tagMap?.Comp_Observations,
      //   Comp_Additional_Remarks: tagMap?.Comp_Additional_Remarks,
      //   Comp_Conclusion: tagMap?.Comp_Conclusion,
      //   Comp_Additional_Space_for_case_remarks: tagMap?.Comp_Additional_Space_for_case_remarks,
      //   Comp_Closure_Remarks: tagMap?.Comp_Closure_Remarks,
      //   Comp_Nature_of_Complaint: tagMap?.Comp_Nature_of_Complaint,
      //   Comp_Type_of_Error: tagMap?.Comp_Type_of_Error,
      //   Comp_Reason_For_Error: tagMap?.Comp_Reason_For_Error,
      //   // Refund Details
      //   Bank: tagMap?.Bank,
      //   Bank_Account_Number: tagMap?.Bank_Account_Number,
      //   Branch_Name: tagMap?.Branch_Name,
      //   IFSC: tagMap?.IFSC,
      //   Account_Holders_Name: tagMap?.Account_Holders_Name,
      //   Re_enter_Account_Number: tagMap?.Re_enter_Account_Number,
      //   Penny_Drop_Result: tagMap?.Penny_Drop_Result,
      //   // Approver Comments
      //   Comp_Approver_Comments: tagMap?.Comp_Approver_Comments,
      //   Comp_Approver_Feedback: tagMap?.Comp_Approver_Feedback,
      //   dateOfApproval: tagMap?.dateOfApproval,
      //   // Sales Feedback
      //   Comp_Sales_Comments: tagMap?.Comp_Sales_Comments,
      //   Comp_Sales_Feedback: tagMap?.Comp_Sales_Feedback,
      // });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const getPOSIndividualData = async () => {
    try {
      const val = await apiCalls.getPOSIndividualData(serviceId);
      const srvReqIDFromData = val?.data?.srvReqID; // Extract srvReqID from val.data

      setCreatedOnDate(val?.data?.CreatedOn);
      // Update state and form values with srvReqID
      setSrvReqID(srvReqIDFromData);
      setTicketStatus(val?.data?.currentStatus);
      setFormFieldsData(val);
      props?.setTransactionDocData(val?.data);
      setServiceRequestTransactionData(val?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors appropriately
    }
  };

  const setFormFieldsData = (val) => {
    const serviceRequestTransectionData =
      val?.data?.serviceRequestTransectionData || [];

    // Find Email Subject values
    const emailSubjectObj = serviceRequestTransectionData.find(
      (item) => item.tagName === "EmailSubject"
    );
    const emailSubjectObjLine = serviceRequestTransectionData.find(
      (item) => item.tagName === "subjectLine"
    );
    const subjectLine =
      emailSubjectObjLine?.tagValue || emailSubjectObj?.tagValue || "";

    if (val?.data) {
      const fieldMapping = {
        Type_of_Complaint: "typeofcomplaint",
        Complaint_Description: "ComplaintDescription",
        Sent_Template: "sentTemplate",
        complaintClosed: "complaintClosed",
        subjectLine: "subjectLine",
        TagComplaint: "tagComplaint",
        ComplaintForm: "ComplaintForm",
        CustomerSigningDate: "CustomerSigningDate",
        BranchReceivedDate: "BranchReceivedDate",
        ValidateSignature: "ValidateSignature",
        complaintdecision: "complaintdecision",
        CanComplaintbeReOpened: "CanComplaintbeReOpened",
        complaintduration: "complaintduration",
        complaintstatus: "complaintstatus",
        calltype: "calltype",
        tokenid: "tokenid",
        subtype: "subtype",
        enterexistingticketid: "enterexistingticketid",
        ReasonForDelay: "ReasonForDelay",
      };

      // Initialize a map to store the first valid non-null value for each field
      const formValues = {
        subjectLine: subjectLine, // Set subjectLine directly
      };

      const usedFields = new Set();

      for (const ele of serviceRequestTransectionData) {
        const fieldName = fieldMapping[ele.tagName];

        // Skip if not mapped or already assigned with a non-null value
        if (!fieldName || usedFields.has(fieldName)) continue;

        const value = ele.tagValue;

        // Accept only non-null, non-undefined, non-empty values
        if (value !== null && value !== undefined && value !== "") {
          // Special handling for tagComplaint (convert to boolean)
          if (fieldName === "tagComplaint") {
            const tagComplaintValue = value === "true";
            formValues[fieldName] = tagComplaintValue;
            setTagComplaint(tagComplaintValue);
          } else {
            formValues[fieldName] = value;

            // Additional action for typeofcomplaint
            if (
              fieldName === "typeofcomplaint" &&
              value === "Sales-related complaint"
            ) {
              props?.setMiscellingCalculatorTabHide(true);
            }
          }

          usedFields.add(fieldName);
        }
      }

      // Set all form fields at once
      form.setFieldsValue(formValues);
    }
  };

  const getCTST = (srInfo) => {
    let obj = {
      MasterRequest: [
        "CALL_TYP",
        "SUB_TYP",
        "REQST_MODE",
        ,
        "TYPE_OF_DISPOSAL",
      ],
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
      let typeOfDisposal = val.data?.filter(
        (ele) => ele.key === "TYPE_OF_DISPOSAL"
      );
      let typeOfDisposalData =
        typeOfDisposal?.[0]?.value?.map((item) => ({
          label: item.mstDesc,
          value: item.mstID, // Ensure this is a string/number
        })) || [];

      setTypeOfDisposalData(typeOfDisposalData);
      // form.setFieldsValue({
      //    calltype:callTypeDesc,
      //    subtype:subTypeDesc,
      //     });
      setRequestModeLU(rquestModeData);

      if (props?.serviceRequestData) {
        setSelectedCallType(props?.serviceRequestData?.callType);
        subTypeDropdown(
          props?.serviceRequestData?.callType,
          props?.serviceRequestData?.subType,
          val.data
        );
        props?.serviceRequestData?.serviceRequestTransectionData?.forEach(
          (element) => {
            customerComplaintsObj[element.tagName] = element.tagValue;
          }
        );
        setComplaintDescription(customerComplaintsObj?.ComplaintDescription);
        const validateSignatureValue =
          customerComplaintsObj?.ValidateSignature?.toLowerCase?.();
        form.setFieldsValue({
          ComplaintDescription: customerComplaintsObj?.ComplaintDescription,
          subtype: customerComplaintsObj?.subType,
          calltype: customerComplaintsObj?.callType,
          ComplaintForm: customerComplaintsObj?.ComplaintForm,
          RequestorComments: customerComplaintsObj?.RequestorComments,
          ValidateSignature:
            validateSignatureValue === "yes" || validateSignatureValue === "no"
              ? validateSignatureValue
              : "NA",
          requestchannel: +customerComplaintsObj?.requestchannel,
          CustomerSigningDate: customerComplaintsObj?.CustomerSigningDate
            ? dayjs(customerComplaintsObj.CustomerSigningDate).format(
                "YYYY-MM-DD"
              )
            : undefined,
          BranchReceivedDate: customerComplaintsObj?.BranchReceivedDate
            ? dayjs(customerComplaintsObj.BranchReceivedDate).format(
                "YYYY-MM-DD"
              )
            : undefined,
        });
      }
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

  // var toolbarOptions = [
  //   ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  //   ['blockquote', 'code-block'],

  //   [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  //   [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  //   [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
  //   [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
  //   [{ 'direction': 'rtl' }],                         // text direction

  //   [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  //   [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  //   [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  //   [{ 'font': [] }],
  //   [{ 'align': [] }],

  //   ['clean']                                         // remove formatting button
  // ];

  // const module = {
  //   toolbar: toolbarOptions,
  // }

  const transformData = (data, keyy) => {
    const filteredData = data?.filter((ele) => ele.key === keyy);
    return filteredData[0]?.value?.map((item, index) => ({
      ...item,
      label: item.mstDesc,
      value: item.mstID,
    }));
  };

  const convertDate = (inputDate) => {
    return moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
  };

  const handleComplaintStatusChange = (value) => {
    setComplaintStatus1(value);
  };

  const convertDateComplaints = (dateString) => {
    if (!dateString) return null;

    const date = new Date(dateString);

    // Extract day, month, and year manually to ensure correct format
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`; // Formats to dd/mm/yyyy
  };

  const convertDateForIGMS = (inputDate) => {
    const date = new Date(inputDate);
    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleEmailSend = async () => {
    if (isSending) return; // prevent double execution

    if (!tagComplaint && !isSaved) {
      message.warning("Please save the data before proceeding to Send Email.");
      return;
    }

    setIsSending(true); // lock the function
    setIsLoading(true);

    const formData = form.getFieldValue();
    let obj1 = {
      SrvReqRefNo: serviceId,
      ReceipientTo: import.meta.env.VITE_APP_RECEIPIENT_TO || ReceipientTo,
      ReceipientCC: import.meta.env.VITE_APP_RECEIPIENT_CC || ReceipientCC,
      PolicyNumber: props?.serviceRequestData?.policyNo,
      TemplateID:
        tagComplaint === true &&
        (IRDATokenNumber !== "" || formData.OriginalIRDATokenNum !== null)
          ? 77
          : 305,
    };

    try {
      const response = await apiCalls.SendIGMSComplaintCommunication(obj1);
      if (
        response.data === "Communication already triggered for this request."
      ) {
        setAlertTitle("Something went wrong");
        setAlertData(response.data);
        setShowAlert(true);
      } else {
        if (
          response.status === 200 &&
          response.data.responseOutput[0].responseHeader.issuccess === true &&
          (response.data.responseOutput[0].responseBody.errorcode === null ||
            response.data.responseOutput[0].responseBody.errorcode === 0)
        ) {
          setAlertTitle("Email Sent Successfully");
          setAlertData("Email Sent Successfully");
          setShowAlert(true);
        } else {
          setAlertTitle("Something went wrong");
          setAlertData("Something went wrong");
          setShowAlert(true);
        }
      }
    } catch (error) {
      setAlertTitle("Something went wrong");
      setAlertData("Something went wrong");
      setShowAlert(true);
    } finally {
      setIsSending(false); // release the lock
      setIsLoading(false);
    }
  };

  const handleComplaintsTicketCloseButton = async () => {
    const formData = form.getFieldValue();

    try {
      // Send the API request and wait for the response
      const response = await apiCalls.UpdateComplaintTicketStatusAPI(serviceId);

      // Check the status code of the response

      // Show success message
      setAlertTitle("Ticket Status Updated Successfully");
      setAlertData("Ticket Status Updated Successfully");
      setShowAlert(true);
      setIsLoading(false);
    } catch (error) {
      setAlertTitle("Something went wrong");
      setAlertData("Something went wrong");
      setShowAlert(true);
      setIsLoading(false);
    }
  };

  const setClientResponse = async () => {
    let obj = {
      policyNo: props?.serviceRequestData?.policyNo,
      applicationNo: "",
      dob: props?.serviceRequestData?.dob,
    };
    let response = await apiCalls.getHeaderParameters(obj);
    //const rquestModeData = transformData(val.data, "REQST_MODE");
    if (response?.data?.responseHeader?.issuccess) {
      SetPolicyNo(response?.data?.responseBody?.identifiers?.policyNo);
      form.setFieldsValue({
        policyHolderName: response?.data?.responseBody?.identifiers?.po_Name,
        PolicyNumber: response?.data?.responseBody?.identifiers?.policyNo,
        ProposalNumber: response?.data?.responseBody?.identifiers?.policyNo,
        //OrganizationName: 'Future Generali.in'
        // Mode: rquestModeData
      });
      const clientNumber = {
        clientNumber: response?.data?.responseBody?.identifiers?.po_ClientID,
      };
      const clientEnquiryResponse = await apiCalls.getClientEnquiry(
        clientNumber,
        loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID
      );
      if (clientEnquiryResponse.data.responseHeader.issuccess) {
        SetReceipientTo(clientEnquiryResponse?.data?.responseBody?.rinternet);
        SetReceipientCC(clientEnquiryResponse?.data?.responseBody?.rinternet);
        const dob = clientEnquiryResponse.data.responseBody.clTdob;
        const newDob = convertDate(dob);
        const dobDate = new Date(newDob);
        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();
        const monthDifference = today.getMonth() - dobDate.getMonth();
        if (
          monthDifference < 0 ||
          (monthDifference === 0 && today.getDate() < dobDate.getDate())
        ) {
          age--;
        }
        let pinCode = clientEnquiryResponse?.data?.responseBody?.cltpcode;
        if (pinCode?.length === 6) {
          // searchLocationn(pinCode);
          setPinCode(pinCode);
        }
        form.setFieldsValue({
          Email: clientEnquiryResponse?.data?.responseBody?.rinternet,
          FirstName: clientEnquiryResponse?.data?.responseBody?.lgivname,
          ComplaintReceiptDate: createdOnDate,
          ComplaintDetails: complaintDescription,
          MobileNumber: clientEnquiryResponse?.data?.responseBody?.rmblphone,
          IsSeniorCitizen: age > 60 ? 1 : 0,
          senderEmail: import.meta.env.VITE_APP_RECEIPIENT_TO
            ? import.meta.env.VITE_APP_RECEIPIENT_TO
            : clientEnquiryResponse?.data?.responseBody?.rinternet,
          Pincode: clientEnquiryResponse?.data?.responseBody?.cltpcode,
          EntityComplaintRefNumber:
            form.getFieldValue().enterexistingticketid !== "" &&
            form.getFieldValue().enterexistingticketid != null
              ? removeAlphabets(form.getFieldValue().enterexistingticketid)
              : removeAlphabets(serviceId),
          Escalated_Remark:
            clientEnquiryResponse?.data?.responseBody?.Escalated_Remark,
          Escalated_Date:
            clientEnquiryResponse?.data?.responseBody?.Escalated_Date,
          // OrganizationName: "Future Generali.in"
        });
      }
    }
  };

  const onSearch = (e) => {};

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const subTypeDropdown = async (value, subType, allData) => {
    let SUB_TYP =
      masterData?.length > 0
        ? masterData?.filter((ele) => ele.key === "SUB_TYP")
        : allData?.filter((ele) => ele.key === "SUB_TYP");
    let data = SUB_TYP[0]?.value?.filter((ele) => ele?.mstParentID === value);
    let transformedData = data?.map((item) => ({
      ...item,
      label: item.mstDesc,
      value: item.mstID,
    }));
    setSubTypeLU(transformedData);
    if (props?.serviceRequestData) {
      form.setFieldsValue({ callType: value, subType: subType });
      handleSubTypeChange(subType, transformedData);
    }
    setClientResponse();
  };
  const sentTemplate = (value) => {
    if (value === "unregistered") {
      setIsEmailButton(true);
      setResponseForCustomer(`<p>Dear Sender,<br /><br />Kindly send email from your registered mailbox for further processing of your request.<br />Please note we will not be able to service any request from unregistered mail box.</p>
    <br/> <p>Regards,<br />Team GC</p>`);
      setEmailSubject("Unregistered Email");
    } else if (value === "acknowledge") {
      setIsEmailButton(true);
      setResponseForCustomer(`<p>Dear Sender,</p>
    <p><br />We acknowledge your mail for policy number &lt;asdasd&gt;. <br />Please note you will receive a separate mail(s) for request raised by you.</p>
    <p><br />Regards,<br />Team GC</p>`);
      setEmailSubject("Acknowledged Email");
    } else if (value === "closure") {
      setIsEmailButton(true);
      setResponseForCustomer(`<p>Dear Sender,</p>
    <p><br />You are hereby informed that your request cannot be processed due to below reasons</p>
    <p><br />Regards,<br />Team GC</p>`);
      setEmailSubject("Closure Email");
    }
  };

  const DisableRcaTab = (value, option) => {
    if (option.value === "Sales-related complaint") {
      //props?.setRCATabHide(false);
      props?.setMiscellingCalculatorTabHide(true);
    } else {
      //props?.setRCATabHide(true);
      props?.setMiscellingCalculatorTabHide(false);
    }
  };

  const handleCallTypeChange = (value, obj) => {
    if (obj?.isCallType) {
      setSelectedCallType(obj.mstID);
      form.setFieldsValue({ subType: null });
      setSubTypeLU(null);
      setSelectedSubType(null);
      subTypeDropdown(obj.mstID);
    } else {
      let CALL_TYP =
        masterData?.length > 0
          ? masterData?.filter((ele) => ele.key === "CALL_TYP")
          : "";
      let SUB_TYP =
        masterData?.length > 0
          ? masterData?.filter((ele) => ele.key === "SUB_TYP")
          : "";
      let transformedData = SUB_TYP[0]?.value
        .filter((ele) => ele.mstParentID === obj?.mstID)
        .map((ele) => ({
          ...ele,
          label: ele.mstDesc,
          value: ele.mstID,
        }));
      setSubTypeLU(transformedData);
      let slectedCALL_TYP = CALL_TYP[0].value?.find(
        (ele) => ele.mstID === obj?.mstID
      );
      setSelectedCallType(+slectedCALL_TYP?.mstID);
      setSelectedSubTypeId(obj?.mstID);
      transformedData?.map((key, index) => {
        if (key.mstID === obj?.mstID) {
          const modifiedDesc = key.mstDesc?.replace(/[^\w]/g, "").toLowerCase();
          setSelectedSubType(modifiedDesc);
          setSelectedSubTypeVal(key.mstDesc);
        }
      });
      form.setFieldsValue({ callType: slectedCALL_TYP?.mstDesc });
    }
  };

  const formItemLayout2 = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const complaintStatusOptions = [
    { label: "New", value: 1 },
    { label: "Acknowledged", value: 2 },
    { label: "Pending", value: 3 },
    { label: "Attended To", value: 4 },
    { label: "Escalated", value: 5 },
    { label: "Re-open", value: 6 },
    { label: "Closed", value: 7 },
  ];

  const handleOk = async () => {
    setIsLoading(true);
    setIsModalVisible(false);
    let response = form.getFieldValue();
    let stateName = response.state;
    let districtName = response.DistrictId;

    const filteredStateValue = stateOptions?.find(
      (state) => state.label?.toLowerCase() === stateName?.toLowerCase()
    )?.value;

    const filteredDistrictValue = districtOptions?.find(
      (dist) => dist.label?.toLowerCase() === districtName?.toLowerCase()
    )?.value;

    // const filteredCityValue = cityOptions?.find(
    //   (city) => city.label?.toLowerCase() === response['CityID'][0]?.toLowerCase()
    // )?.value;

    const filteredCityValue2 = cityOptions?.find(
      (city) => city?.geo_PCIN_SrNo == response?.CityID
    )?.geo_PCIN_SrNo;

    // const filteredCityValue1 = cityOptions?.find(
    //   (city) => response.CityID.contains(city.label?.toLowerCase())
    // )?.value;

    let obj = {
      Ack_Officer_Designation: "",
      Ack_Officer_Name: "SM",
      Addressed_To_Insurer: "Y",
      BOC_Or_Collection_Number: "",
      Branch_Code: "MU01",
      Broker_License_Number: response?.BrokerLicenseNumber,
      Certificate_Number: "",
      Cheque_Number: response?.ClaimPaymentChequeNumber,
      Claim_Clsr_Additional_Info: response?.ClaimClsrAdditionalInfo,
      Claim_Intimation_Date: response?.ClaimIntimationDate
        ? convertDateForIGMS(response?.ClaimIntimationDate)
        : "",
      Claim_Number: response?.ClaimNumber,
      Claim_Payment_Cheque_Date: response?.ClaimPaymentChequeDate
        ? convertDateForIGMS(response?.ClaimPaymentChequeDate)
        : "",
      Claim_Payment_Cheque_Number: response?.ClaimPaymentChequeNumber,
      Claim_Payment_Date: response?.ClaimPaymentDate
        ? convertDateForIGMS(response?.ClaimPaymentDate)
        : "",
      Claim_Received_Amount: response?.ClaimReceivedAmount,
      Claim_Requested_Amount: response?.ClaimRequestedAmount,
      Complaint_Against_Type_Id: 1,
      Complaint_Date: convertDateForIGMS(new Date()),
      Complaint_Description_Id: response?.ComplaintDescriptionId,
      Complaint_Details: response?.ComplaintDetails,
      Complaint_Receipt_Date: response?.ComplaintReceiptDate
        ? convertDateForIGMS(response?.ComplaintReceiptDate)
        : "",
      Complaint_Status_Id: response?.ComplaintStatusId,
      Complaint_Type_Id: response?.ComplaintTypeId,
      Date_Of_Honoring_Service: response?.DateOfHonoringService
        ? convertDateForIGMS(response?.DateOfHonoringService)
        : "",
      District_Id: filteredDistrictValue,
      // City_ID: 0,
      E_mail: response?.Email,
      Entity_Complaint_Ref_Number: response?.EntityComplaintRefNumber,
      First_Name: response?.FirstName,
      IRDA_Token_Number: response?.OriginalIRDATokenNum,
      Insurance_Type_Id: 1,
      Insurer_Resolution_Letter_date: response?.InsurerResolutionLetterdate,
      Intermediary_License_Number: response?.IntermediaryLicenseNumber,
      Intermediary_Name: "",
      Is_Complainant_Informed: response?.IsComplainantInformed,
      Mobile_Number: response?.MobileNumber,
      Mode: RegisterComplaintID == 0 ? 1 : 2,
      Option: 1,
      Organization_Name: response?.OrganizationName,
      Original_IRDA_Token_Num: response?.OriginalIRDATokenNum,
      Others_Clsr_Additional_Info: "",
      PolicyHolder_Or_Claimant_Name: "",
      Policy_Number: response?.PolicyNumber,
      Policy_Type_Id: 1,
      Premium_Payment_Ref_Number: response?.PremiumPaymentRefNumber,
      Proposal_Or_Cover_Note_Number: "",
      Receipt_Number: response?.ReceiptNumber,
      Remarks: response?.Remarks,
      Escalated_Remark: response?.Escalated_Remark,
      Escalated_Date: response?.Escalated_Date
        ? convertDateForIGMS(response?.Escalated_Date)
        : "",
      Request_IRDAI_For_Closure: response?.RequestIRDAIForClosure,
      Source_Of_Complaint: response?.SourceOfComplaint,
      State_Id: filteredStateValue,
      Status_Change_Date:
        RegisterComplaintID == 0 ? "" : convertDateForIGMS(new Date()),
      Trans_Login_Id: "FGLICADMIN",
      //Type_of_disposal: "",
      User_Type: "I",
      Policy_Proposal_Cert_ClaimNumber: response?.PolicyNumber,
      Identifier_Type: 1,
      Wrong_Insurer_Selected: response?.WrongInsurerSelected,
      Is_Senior_Citizen: response?.IsSeniorCitizen,
      SrvReqRefNo:
        form.getFieldValue().enterexistingticketid !== "" &&
        form.getFieldValue().enterexistingticketid != null
          ? form.getFieldValue().enterexistingticketid
          : serviceId,
      RegisterComplaintID: RegisterComplaintID,
      Pincode: response?.Pincode,
      City_ID: filteredCityValue2 === undefined ? 0 : filteredCityValue2,
      SrvReqID:
        form.getFieldValue().enterexistingticketid !== "" &&
        form.getFieldValue().enterexistingticketid != null
          ? oldSrvReqID
          : props.serviceRequestData.srvReqID,
      Type_Of_Disposal: response?.ComplaintDisposition,
      Remarks: response?.Remarks,
    };
    let registerResponse = "";
    if (RegisterComplaintID == 0) {
      setIsLoading(true);
      registerResponse = await apiCalls.saveRegisterComplaintAPI(obj);
    } else {
      setIsLoading(true);
      registerResponse = await apiCalls.updateRegisterComplaintAPI(obj);
    }

    //console.log(response12)
    if (registerResponse?.data?.errors?.length > 0) {
      setErrors(registerResponse.data.errors);
      setShowPopup(true);
      setIsModalVisible(true);
      setIsLoading(false);
      return;
    } else {
      if (RegisterComplaintID == 0) {
        let obj1 = {
          SrvReqRefNo: serviceId,
          ReceipientTo: import.meta.env.VITE_APP_RECEIPIENT_TO
            ? import.meta.env.VITE_APP_RECEIPIENT_TO
            : ReceipientTo,
          ReceipientCC: import.meta.env.VITE_APP_RECEIPIENT_CC
            ? import.meta.env.VITE_APP_RECEIPIENT_CC
            : ReceipientCC,
          PolicyNumber: props?.serviceRequestData?.policyNo,
        };
        setAlertTitle("IRDA Token Number generated successfully ");
        setAlertData(registerResponse.data.irdaTokenNumber);
        setShowAlert(true);
        setIsLoading(false);
        //await apiCalls.SendIGMSComplaintCommunication(obj1);
      } else {
        const selectedStatus =
          complaintStatusOptions?.find(
            (status) => status.value === response?.ComplaintStatusId
          )?.label || "Updated";
        setAlertTitle("Token Updated");
        setAlertData(
          `${registerResponse?.data?.irdaTokenNumber} - Updated to ${selectedStatus}`
        );
        setShowAlert(true);
        setIsLoading(false);
      }
      // setAlertData("IRDA Token Number generated successfully " + registerResponse.data.irdaTokenNumber);
      return;
    }
    setIsModalVisible(false);
    setIsLoading(false);
  };

  const handleCancel = () => {
    // // form.resetFields();
    setIsModalVisible(false);
  };

  const mapToSelectOptions = (data) => {
    return data.map((item) => ({
      value: item.statusID,
      label: item.status_desc, // changed 'name' to 'label' for consistency with other mappings
    }));
  };

  const mapToSelectComplaintTypeOptions = (data) => {
    return data.map((item) => ({
      value: item.compl_Type_ID,
      label: item.compl_Type,
    }));
  };

  const getTransactionData = (values) => {
    const tags = [
      { key: "callType", tagName: "Call_Type" },
      { key: "subType", tagName: "Sub_Type" },
      { key: "typeofcomplaint", tagName: "Type_of_Complaint" },
      { key: "tagComplaint", tagName: "TagComplaint" },
      { key: "ComplaintDescription", tagName: "Complaint_Description" }, // Assuming description is the complaint detail
      { key: "sentTemplate", tagName: "Sent_Template" },
      { key: "complaintClosed", tagName: "complaintClosed" },
      // { key: 'complaintDecision', tagName: 'complaintDecision' },
      { key: "subjectLine", tagName: "subjectLine", tagvalue: values?.subject },
      { key: "ComplaintForm", tagName: "ComplaintForm" },
      { key: "CustomerSigningDate", tagName: "CustomerSigningDate" },
      { key: "BranchReceivedDate", tagName: "BranchReceivedDate" },
      { key: "complaintdecision", tagName: "complaintdecision" },
      { key: "complaintduration", tagName: "complaintduration" },
      { key: "CanComplaintbeReOpened", tagName: "CanComplaintbeReOpened" },
      { key: "complaintstatus", tagName: "complaintstatus" },
      { key: "subtype", tagName: "subtype" },
      { key: "calltype", tagName: "calltype" },
      { key: "tokenid", tagName: "tokenid" },
      { key: "enterexistingticketid", tagName: "enterexistingticketid" },
      { key: "ReasonForDelay", tagName: "ReasonForDelay" },
    ];

    // Handle the switch state for 'Tag Complaint'
    const tagComplaint = values.tagComplaint;

    // Create the transaction data with tags and handle 'Tag Complaint' separately
    return tags
      .map((tag) => ({
        Status: "Create",
        TagName: tag.tagName,
        TagValue: values[tag.key] || "",
      }))
      .concat([
        {
          Status: "Create",
          TagName: "Tag_Complaint",
          TagValue: tagComplaint,
        },
      ]);
  };

  const handleMiscSave = () => {
    setIsSaved(true);
    const formData = form.getFieldValue();
    const filteredCallType = masterData?.find(
      (item) => item?.key === "CALL_TYP"
    );
    let selectedCall;
    if (typeof formData?.callType === "number") {
      selectedCall = filteredCallType.value.find(
        (item) => item?.mstID === props?.serviceRequestData?.callType
      );
    }
    if (typeof formData?.callType === "string") {
      selectedCall = filteredCallType.value.find(
        (item) => item?.mstDesc === formData?.callType
      );
    }
    form
      .validateFields()
      .then(async (values) => {
        const obj = {
          SrvReqRefNo: serviceId,
          SrvReqID: srvReqID,
          TransactionData: getTransactionData(values) || [],
          ModifiedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
          RequestDateTime: "2024-01-10T00:00:00",
          CustSignDateTime: "2024-01-10T00:00:00",
          CallType: selectedCall?.mstID,
          SubType: formData.subType,
        };

        try {
          const response = await apiCalls.genericAPI(obj); // Await the API call
          if (response.status === 200) {
            // Ensure response.status is available in your API response
            setAlertTitle(response?.data?.header);
            setAlertData(response?.data?.message);
            setShowAlert(true);
          } else {
            console.error("Unexpected response status:", response.status);
          }
        } catch (error) {
          console.error("API call failed:", error);
        }
      })
      .catch((error) => {
        console.log("Validation failed:", error);
      });
  };

  const mapToSelectComplaintDescriptionOptions = (data) => {
    return data.map((item) => ({
      value: item.compl_Desc_ID,
      label: item.compl_Desc,
    }));
  };

  const mapToSelectSourceofComplaintnOptions = (data) => {
    return data.map((item) => ({
      value: item.compltSrc_ID,
      label: item.compltSrc,
    }));
  };

  const mapToSelectStateOptions = (data) => {
    return data.map((item) => ({
      value: item.state_ID,
      label: item.stateNm,
    }));
  };

  const mapToSelectCityOptions = (data) => {
    return data.map((item) => ({
      value: item.city_ID,
      label: item.cityNm,
    }));
  };

  const mapToSelectCityOptionsList = (data) => {
    return data.map((item) => ({
      value: item.city_ID,
      label: item.cityNm,
      dist_ID: item.district_ID,
    }));
  };

  const removeAlphabets = (str) => {
    let response = str.replace(/[^\d]/g, ""); // Replace everything that's not a digit with an empty string
    return `C${response}`;
  };

  const mapToSelectDistrictOptions = (data) => {
    return data.map((item) => ({
      value: item.district_ID,
      label: item.districtNm,
    }));
  };

  const searchLocationn = (pinCode) => {
    setIsLoading(true);
    apiCalls
      .searchIGMSLocation(pinCode)
      .then((response) => {
        setIsLoading(false);
        if (response?.data?.length > 0) {
          //const { stateName, district, region } = response.data;
          const allCities = response?.data.map((item) => item.geoPCIN);
          setCityOptions(allCities);
          let stateName = response?.data[0]?.stateNm;
          let districtName = response?.data[0]?.districtNm;

          const filteredStateValue = stateOptions?.find(
            (state) => state.label?.toLowerCase() === stateName?.toLowerCase()
          )?.value;

          const filteredStateValueDescription = stateOptions?.find(
            (state) => state.label?.toLowerCase() === stateName?.toLowerCase()
          )?.label;

          const filteredDistrictValue = districtOptions?.find(
            (dist) => dist.label?.toLowerCase() === districtName?.toLowerCase()
          )?.value;

          const filteredDistrictValueDescription = districtOptions?.find(
            (dist) => dist.label?.toLowerCase() === districtName?.toLowerCase()
          )?.label;

          form.setFieldsValue({
            state: response?.data[0]?.stateNm,
            DistrictId: response?.data[0]?.districtNm,
            CityID: allCities[0]?.city_Town_Vill_AreaNm,
            Pincode: pinCode,
          });
          setShowPincodeField(false);
        } else {
          form.setFieldsValue({
            state: "",
            DistrictId: "",
            CityID: "",
            Pincode: pinCode,
          });
          message.error({
            content:
              response?.data?.responseBody?.errormessage ||
              "Invalid PinCode Entered , please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
        setShowPincodeField(false);
      })
      .catch((error) => {
        setIsLoading(false);
        message.error({
          content: "An error occurred while fetching location data.",
          className: "custom-msg",
          duration: 2,
        });
        setShowPincodeField(false);
      });
  };

  const onBlurInput = async (value, item) => {
    if (item.label === "Pincode") {
      // Reset state, district, and city if PINCode is empty
      if (!value) {
        form.setFieldsValue({
          CityID: "",
          state: "",
          DistrictId: "",
        });
      } else if (value.length === 6) {
        searchLocationn(value);
      }
    }
    if (item.label === "Enter Existing Ticket ID") {
      const val = await apiCalls.getPOSIndividualData(value);
      form.setFieldsValue({
        complaintstatus: val?.data?.currentStatus,
      });
      getCTST(val);
    }
  };

  const showIGMSData = async (event) => {
    event.preventDefault();
    //without clicking the save button clicked showing this msg
    if (tagComplaint && !isSaved) {
      message.warning("Please save the data before proceeding to IGMS.");
      return;
    }
    if (tagComplaint && isSaved) {
      setIsModalVisible(true); // Open IGMS modal
    }
    // };

    // const showIGMSData = async (event) => {
    //   event.preventDefault();
    //   setIsModalVisible(true);
    //   // setIsModalVisible(true);
    //   if (tagComplaint) {
    //     setIsModalVisible(true);
    //   }

    try {
      const [
        response1,
        response2,
        response3,
        response4,
        response5,
        response6,
        response7,
        response8,
      ] = await Promise.all([
        apiCalls.getIGMSMastersData("STATUS_MASTER"),
        apiCalls.getIGMSMastersData("COMPLAINT_TYPE_MASTER"),
        apiCalls.getIGMSMastersData("COMPLAINT_DESCRIPTION_MASTER"),
        apiCalls.getIGMSMastersData("SOURCE_OF_COMPLAINT_MASTER"),
        apiCalls.getIGMSMastersData("DISTRICT"),
        apiCalls.getIGMSMastersData("STATE"),
        apiCalls.getIGMSComplaintsAPI(
          form.getFieldValue().enterexistingticketid !== "" &&
            form.getFieldValue().enterexistingticketid != null
            ? form.getFieldValue().enterexistingticketid
            : serviceId
        ),
        apiCalls.getIGMSMastersData("CITY"),
      ]);

      setStatusOptions(mapToSelectOptions(response1.data));
      setComplaintTypes(mapToSelectComplaintTypeOptions(response2.data));
      setComplaintDesc(mapToSelectComplaintDescriptionOptions(response3.data));
      setComplaintSource(mapToSelectSourceofComplaintnOptions(response4.data));
      setDistrictOptions(mapToSelectDistrictOptions(response5.data)); // updated to setDistrictOptions
      setStateOptions(mapToSelectStateOptions(response6.data)); // updated to setStateOptions
      setCityOptions(mapToSelectCityOptions(response8.data));
      setCityOptionsList(mapToSelectCityOptionsList(response8.data));

      //const cities = response8.data
      if (response6.data.length > 0) {
        searchLocationn(pinCode);
      }
      const cityName = response8.data.filter(
        (item) => item.city_ID === response7.data.city_ID
      )[0]?.cityNm;
      form.setFieldsValue({
        //Console.log(response7.entity_Complaint_Ref_Number)
        // EntityComplaintRefNumber: response7?.data?.entity_Complaint_Ref_Number
        //     ? response7.data.entity_Complaint_Ref_Number
        //     : removeAlphabets(serviceId),
        InsurerResolutionLetterdate:
          response7?.data?.insurer_Resolution_Letter_date,
        IsComplainantInformed: response7?.data?.is_Complainant_Informed,
        OriginalIRDATokenNum: response7?.data?.irdA_Token_Number,
        RequestIRDAIForClosure: response7?.data?.request_IRDAI_For_Closure,
        PolicyProposalClaimNumber:
          response7?.data?.policy_Proposal_Cert_ClaimNumber,
        state: response7?.data?.state_Id,
        DistrictId: response7?.data?.district_Id,
        ComplaintDescriptionId: response7?.data?.complaint_Description_Id,
        ComplaintDetails: complaintDescription,
        ComplaintStatusId: response7?.data?.complaint_Status_Id,
        ComplaintTypeId: response7?.data?.complaint_Type_Id,
        SourceOfComplaint: response7?.data?.source_Of_Complaint,
        Pincode: response7?.data?.pincode,
        CityID: cityName,
        ComplaintReceiptDate: dayjs(createdOnDate).format("YYYY-MM-DD"),
        //DateOfHonoringService: convertDateForIGMS(response7?.data?.Date_Of_Honoring_Service),
        //ComplaintReceiptDate: response7?.data?.complaint_Receipt_Date,

        // Mode: rquestModeData
      });
      const tokenNumber = response7?.data?.irdA_Token_Number || "";
      if (tokenNumber !== "") {
        setIRDATokenNumber(tokenNumber);
        setComplaintID(response7?.data?.registerComplaintID);
      } else {
        setIRDATokenNumber("");
        setComplaintID(0);
      }
    } catch (error) {
      console.error("Failed to fetch IGMS data:", error);
    }
  };

  const handleSubTypeChange = (value, getSubLU) => {
    setSelectedSubTypeId(value);
    let subTypeData = subTypeLU?.length > 0 ? subTypeLU : getSubLU;
    subTypeData?.map((key) => {
      if (key.mstID === value) {
        const modifiedDesc = key.mstDesc?.replace(/[^\w]/g, "").toLowerCase();
        setSelectedSubType(modifiedDesc);
        setSelectedSubTypeVal(key.mstDesc);
      }
    });
  };

  const disabledDate = (current) => {
    // Disable dates after today
    return current && current > moment().endOf("day");
  };

  const sections = [
    {
      title: "Policy Information",
      fields: [
        {
          label: "Broker License Number",
          name: "BrokerLicenseNumber",
          type: "Input",
          className: "bold-label",
        },
        {
          label: "Entity Complaint Ref Number",
          name: "EntityComplaintRefNumber",
          type: "Input",
          className: "bold-label",
          rules: [
            {
              required: true,
              message: "Please Enter Entity Complaint Ref Number",
            },
          ],
        },
        {
          label: "Email",
          name: "Email",
          type: "Input",
          className: "bold-label",
          disabled: true,
        },
        {
          label: "First Name",
          name: "FirstName",
          type: "Input",
          className: "bold-label",
          disabled: true,
          rules: [{ required: true, message: "Please Enter First Name" }],
        },
        {
          label: "Insurer Resolution Letter date",
          name: "InsurerResolutionLetterdate",
          type: "DatePicker",
          className: "inputs-label mb-0 bold-label",
          disabledDate,
          disabled: true,
        },
        {
          label: "Intermediary License Number",
          name: "IntermediaryLicenseNumber",
          type: "Input",
          className: "bold-label",
        },
        {
          label: "Is Complainant Informed",
          name: "IsComplainantInformed",
          type: "Switch",
          className: "bold-label",
        },
        {
          label: "Mobile Number",
          name: "MobileNumber",
          type: "Input",
          className: "bold-label",
          disabled: true,
        },
        {
          label: "Organization Name",
          name: "OrganizationName",
          type: "Input",
          className: "bold-label",
        },
        {
          label: "Original IRDA Token Num",
          name: "OriginalIRDATokenNum",
          type: "Input",
          className: "bold-label",
        },
        {
          label: "Policy Holder Name",
          name: "policyHolderName",
          type: "Input",
          className: "bold-label",
          disabled: true,
        },
        {
          label: "Policy Number",
          name: "PolicyNumber",
          type: "Input",
          className: "bold-label",
          disabled: true,
        },
        {
          label: "Premium Payment Ref Number",
          name: "PremiumPaymentRefNumber",
          type: "Input",
          className: "bold-label",
        },
        {
          label: "Proposal Number",
          name: "ProposalNumber",
          type: "Input",
          className: "bold-label",
          disabled: true,
        },
        {
          label: "Receipt Number",
          name: "ReceiptNumber",
          type: "Input",
          className: "bold-label",
        },
        {
          label: "Pincode",
          name: "Pincode",
          type: "Input",
          className: "bold-label",
          rules: [
            {
              required: false,
              message: "Please enter a valid Pincode",
            },
            {
              pattern: /^\d{6}$/, // Regular expression for 6 digits only
              message: "Pincode must be 6 digits and numbers only",
            },
          ],
          disabled: showPincodeField,
        },

        {
          label: "State",
          name: "state",
          type: "Select",
          options: stateOptions,
          className: "bold-label",
          rules: [{ required: false, message: "Please select PinCode" }],
          disabled: true,
        },
        {
          label: "District",
          name: "DistrictId",
          type: "Select",
          options: districtOptions,
          className: "bold-label",
          rules: [{ required: false, message: "Please select PinCode" }],
          disabled: true,
        },
        {
          label: "City",
          name: "CityID",
          type: "Select",
          options: cityOptions,
          className: "bold-label",
          rules: [{ required: false, message: "Please select PinCode" }],
          disabled: false,
        },
        {
          label: "Request IRDAI For Closure",
          name: "RequestIRDAIForClosure",
          type: "Switch",
          className: "bold-label",
        },
        {
          label: "Policy Proposal ClaimNumber",
          name: "PolicyProposalClaimNumber",
          type: "Input",
          className: "bold-label",
        },
        {
          label: "Wrong Insurer Selected",
          name: "WrongInsurerSelected",
          type: "Switch",
          className: "bold-label",
        },
        {
          label: "Is Senior Citizen",
          name: "IsSeniorCitizen",
          type: "Switch",
          className: "bold-label",
        },
      ],
    },
    {
      title: "Complaint Details",
      fields: [
        {
          label: "Complaint Type",
          name: "ComplaintTypeId",
          type: "Select",
          options: complaintTypes,
          className: "bold-label",
          rules: [{ required: true, message: "Please select Complaint Type" }],
        },
        {
          label: "Complaint Description Id",
          name: "ComplaintDescriptionId",
          type: "Select",
          options: complaintDesc,
          className: "bold-label",
          rules: [
            {
              required: true,
              message: "Please Select Complaint DescriptionId",
            },
          ],
        },
        {
          label: "Complaint Details",
          name: "ComplaintDetails",
          type: "Input",
          className: "bold-label",
          rules: [
            { required: true, message: "Please Enter Complaint Details" },
          ],
          disabled: true,
        },
        {
          label: "Complaint Receipt Date",
          name: "ComplaintReceiptDate",
          type: "Input",
          className: "inputs-label mb-0 bold-label",
          disabledDate,
          rules: [
            { required: true, message: "Please select Complaint ReceiptDate" },
          ],
          disabled: true,
        },
        {
          label: "Source Of Complaint",
          name: "SourceOfComplaint",
          type: "Select",
          options: complaintSource,
          className: "bold-label",
          rules: [
            { required: true, message: "Please select Complaint Source" },
          ],
        },
        {
          label: "Complaint Status Id",
          name: "ComplaintStatusId",
          type: "Select",
          options: statusOptions,
          className: "bold-label",
          rules: [
            { required: true, message: "Please Select Complaint Status" },
          ],
        },

        //{ label: "Complaint Disposition", name: "ComplaintDisposition", type: "Select", options: typeOfDisposalData, className: "bold-label", rules: [{ required: false,  hide : true , message: "Please Select Complaint Disposition" }], hide : true },

        //{ label: "Date Of Honoring Service", name: "DateOfHonoringService", type: "DatePicker",required: true, className: "inputs-label mb-0 bold-label", disabledDate,rules: [{ required: false, message: "Please select DateOfHonoringService", hide : true  }] },
      ],
    },
    // {
    //   title: "Claim Information",
    //   hide : true,
    //   fields: [
    //     { label: "Claim Clsr Additional Info", name: "ClaimClsrAdditionalInfo", type: "Input", className: "bold-label" },
    //     { label: "Claim Received Amount", name: "ClaimReceivedAmount", type: "Input", className: "bold-label" },
    //     { label: "Claim Requested Amount", name: "ClaimRequestedAmount", type: "Input", className: "bold-label" },
    //     { label: "Claim Intimation Date", name: "ClaimIntimationDate", type: "DatePicker", className: "inputs-label mb-0 bold-label", disabledDate },
    //     { label: "Claim Payment Cheque Number", name: "ClaimPaymentChequeNumber", type: "Input", className: "bold-label" },
    //     { label: "Claim Payment Date", name: "ClaimPaymentDate", type: "DatePicker", className: "inputs-label mb-0 bold-label", disabledDate },
    //     { label: "Claim Number", name: "ClaimNumber", type: "Input", className: "bold-label" },
    //     { label: "Claim Payment Cheque Date", name: "ClaimPaymentChequeDate", type: "DatePicker", className: "inputs-label mb-0 bold-label", disabledDate },
    //   ]
    // }
  ];

  const getComplaintDescriptionID = async (data) => {
    try {
      setIsLoading(true);
      const obj = {
        selectedOption: data,
      };

      const response = await apiCalls?.GetIGMSComplaintDescription(obj);
      if (response.status === 200) {
        const uniqueData = response?.data.filter(
          (item, index, self) =>
            index ===
            self.findIndex((t) => t.compl_Desc_ID === item.compl_Desc_ID)
        );
        setIsLoading(false);
        setComplaintDesc(mapToSelectComplaintDescriptionOptions(uniqueData));
      }
    } catch (err) {
      console.log("Error is ", err);
      setIsLoading(false);
    }
  };

  const handleSelectChange = (field, value1, option, title) => {
    if (title === "Complaint Details" && field?.label === "Complaint Type") {
      getComplaintDescriptionID(option?.children);

      if (value1 === 4) {
        var data = [
          {
            title: "Claim Information",
            fields: [
              {
                label: "Claim Clsr Additional Info",
                name: "ClaimClsrAdditionalInfo",
                type: "Input",
                className: "bold-label",
              },
              {
                label: "Claim Received Amount",
                name: "ClaimReceivedAmount",
                type: "Input",
                className: "bold-label",
              },
              {
                label: "Claim Requested Amount",
                name: "ClaimRequestedAmount",
                type: "Input",
                className: "bold-label",
              },
              {
                label: "Claim Intimation Date",
                name: "ClaimIntimationDate",
                type: "DatePicker",
                className: "inputs-label mb-0 bold-label",
                disabledDate,
              },
              {
                label: "Claim Payment Cheque Number",
                name: "ClaimPaymentChequeNumber",
                type: "Input",
                className: "bold-label",
              },
              {
                label: "Claim Payment Date",
                name: "ClaimPaymentDate",
                type: "DatePicker",
                className: "inputs-label mb-0 bold-label",
                disabledDate,
              },
              {
                label: "Claim Number",
                name: "ClaimNumber",
                type: "Input",
                className: "bold-label",
              },
              {
                label: "Claim Payment Cheque Date",
                name: "ClaimPaymentChequeDate",
                type: "DatePicker",
                className: "inputs-label mb-0 bold-label",
                disabledDate,
              },
            ],
          },
        ];
        setSections1(data);
      } else {
        setSections1([]);
      }
    }

    if (
      title === "Complaint Details" &&
      field?.label === "Complaint Status Id"
    ) {
      if (value1 === 4 || value1 === 5 || value1 === 6 || value1 === 7) {
        setDynamicFields((prevFields) => {
          if (!prevFields.some((f) => f.name === "ComplaintDisposition")) {
            return [
              ...prevFields,
              {
                label: "Escalation Remarks",
                name: "Escalated_Remark",
                type: "Input",
                className: "bold-label",
                rules: [
                  {
                    required: true,
                    message: "Please Enter Escalation Remarks",
                  },
                ],
                disabled: false,
                maxlength: 1000,
                width: "100%",
                hide: true,
              },
              {
                label: "Escalation Date",
                name: "Escalated_Date",
                type: "DatePicker",
                required: true,
                className: "inputs-label mb-0 bold-label",
                disabledDate,
                rules: [
                  { required: false, message: "Please select Escalation Date" },
                ],
                hide: true,
              },
              {
                label: "Complaint Disposition",
                name: "ComplaintDisposition",
                type: "Select",
                options: typeOfDisposalData,
                className: "bold-label",
                rules: [
                  {
                    required: false,
                    message: "Please Select Complaint Disposition",
                  },
                ],
                hide: true,
              },
              {
                label: "Date Of Honoring Service",
                name: "DateOfHonoringService",
                type: "DatePicker",
                required: true,
                className: "inputs-label mb-0 bold-label",
                disabledDate,
                rules: [
                  {
                    required: false,
                    message: "Please select DateOfHonoringService",
                  },
                ],
                hide: true,
              },
              {
                label: "Remarks",
                name: "Remarks",
                type: "Input",
                className: "bold-label",
                rules: [{ required: true, message: "Please Enter Remarks" }],
                disabled: false,
                maxlength: 1000,
                width: "100%",
                hide: true,
              },
            ];
          }
          return prevFields;
        });
      } else {
        setDynamicFields((prevFields) =>
          prevFields.filter(
            (f) =>
              f.name !== "ComplaintDisposition" &&
              f.name !== "DateOfHonoringService" &&
              f.name !== "Remarks" &&
              f.name !== "Escalated_Date" &&
              f.name !== "Escalated_Remark"
          )
        );
      }
    }
  };

  const handleDateChange = (name, date) => {
    if (!date) return;
    const today = moment().startOf("day"); // Get today's date without time
    if (name === "CustomerSigningDate") {
      setCustomerSigningDate(date);
      form.setFieldsValue({ CustomerSigningDate: date });

      // Reset BranchReceivedDate when CustomerSigningDate changes
      setBranchReceivedDate(null);
      form.setFieldsValue({ BranchReceivedDate: null });
      setShowReasonField(false);
    }
    if (name === "BranchReceivedDate") {
      // Prevent selection if CustomerSigningDate is not set
      if (!customerSigningDate) {
        message.destroy();
        message.error({
          content:
            "Request Received Date can't be before the customer signing date.",
          className: "custom-msg",
          duration: 3,
        });
        // Clear the request received date value
        setBranchReceivedDate(null);
        form.setFieldsValue({ BranchReceivedDate: null });

        return;
      }
      setBranchReceivedDate(date);
      form.setFieldsValue({ BranchReceivedDate: date });

      // Validate against CustomerSigningDate
      if (date.isBefore(customerSigningDate, "day")) {
        message.destroy();
        message.error({
          content:
            "Request Received Date can't be before the customer signing date.",
          className: "custom-msg",
          duration: 3,
        });
        // Reset fields on invalid date selection
        resetFields();
        return;
      }

      // Show reason field if BranchReceivedDate is before today's date
      setShowReasonField(date.isBefore(today, "day"));
    }
  };
  const resetFields = () => {
    setCustomerSigningDate(null);
    setBranchReceivedDate(null);
    form.setFieldsValue({
      CustomerSigningDate: null,
      BranchReceivedDate: null,
    });
    setShowReasonField(false);
  };
  return (
    <Spin spinning={isLoading}>
      <div>
        {/* <CustomerDetails 
           isComplaintsUserTabs={true}
        //   setIsShowCallTypes={setIsShowCallTypes} SubTypeId={selectedSubTypeId} CallTypeId={selectedCallTypeId}
        //           isEmailManagement={true}
        //           searchPolicyData={searchPolicyData[0]} EmailResponse={EmailResponseId}
                  ></CustomerDetails> */}

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
          <Row gutter={[16, 16]} className="mb-16">
            <Col xs={24} sm={24} md={9} lg={9} xxl={9} className="mb-16">
              <Form.Item
                label="Call Type"
                name="callType"
                className="inputs-label mb-0"
              >
                <Select
                  showSearch
                  onSearch={onSearch}
                  className="cust-input calltype-select"
                  maxLength={100}
                  placeholder="Select Call Type"
                  options={CALL_TyPES}
                  filterOption={filterOption}
                  onChange={(value, option) =>
                    handleCallTypeChange(value, option)
                  }
                  disabled={props?.customerData?.isPOS}
                />
              </Form.Item>
            </Col>
            {/* {selectedSubType === 'complaintreopen' && (
        <i style={{ marginLeft:'-15px',fontSize: '32px', color:'#c21b17'}} onClick={handleCopy} className="bi bi-copy"></i>
          )} */}
            <Col xs={24} sm={24} md={9} lg={9} xxl={9} className="mb-16">
              <Form.Item
                label="Sub Type"
                name="subType"
                className="inputs-label mb-0 subtype right-colsize"
              >
                <Select
                  showSearch
                  onSearch={onSearch}
                  className="cust-input calltype-select"
                  maxLength={100}
                  placeholder="Select Sub Type"
                  options={subTypeLU}
                  filterOption={filterOption}
                  onChange={(e) => handleSubTypeChange(e)}
                  disabled={props?.customerData?.isPOS}
                  style={{ marginLeft: "-15px" }}
                />
              </Form.Item>
            </Col>
            {/* {selectedSubType !== 'complaintreopen' && (
        <Col xs={24} sm={24} md={24} lg={24} xxl={24} className='mb-16'>
        <Form.Item>
          <div style={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
            <span style={{marginRight: "5px" }}>Fresh Complaint</span>
            <Checkbox
               checked={isfreshTicket}
              onChange={() => handleCheckbox("freshticket")}
            />
            <span style={{ width: "50px" }}></span> 
            <span style={{ marginRight: "5px" }}>Reopen Complaint </span>
            <Checkbox
              checked={isreopenTicket}
              onChange={() => handleCheckbox("reopenticket")}
            />
          </div>
        </Form.Item>
        </Col>)} */}
            {selectedSubType === "complaintreopen" && (
              <>
                {/* <Col xs={24} sm={24} md={9} lg={9} xxl={9} className="mb-16">
  <Form.Item
    label="Enter Existing Ticket ID"
    name="enterexistingticketid"
  >
    <Input 
      type="text" 
      placeholder="Enter Ticket ID" 
      maxLength={14} 
      minLength={14}
      onBlur={(e) => onBlurInput(e.target.value, { label: "Enter Existing Ticket ID" })} 
      disabled
    />
  </Form.Item>
</Col> */}
                <Col xs={24} sm={24} md={9} lg={9} xxl={9} className="mb-16">
                  <Form.Item
                    label="Enter Existing Ticket ID"
                    name="enterexistingticketid"
                  >
                    <Input
                      type="text"
                      placeholder="Enter Ticket ID"
                      maxLength={14}
                      minLength={14}
                      disabled
                      onBlur={(e) =>
                        onBlurInput(e.target.value, {
                          label: "Enter Existing Ticket ID",
                        })
                      }
                      suffix={
                        selectedSubType === "complaintreopen" && (
                          <i
                            style={{
                              fontSize: "18px",
                              color: "#c21b17",
                              cursor: "pointer",
                            }}
                            onClick={handleCopy}
                            className="bi bi-copy"
                          />
                        )
                      }
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={9} lg={9} xxl={9} className="mb-16">
                  <Form.Item label="Complaint Type " name="calltype">
                    <Input type="text" placeholder="" disabled />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={9} lg={9} xxl={9} className="mb-16">
                  <Form.Item label="Complaint Description Id" name="subtype">
                    <Input type="text" placeholder="" disabled />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={9} lg={9} xxl={9} className="mb-16">
                  <Form.Item label="Token ID" name="tokenid">
                    <Input type="text" placeholder="" disabled />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={9} lg={9} xxl={9} className="mb-16">
                  <Form.Item label="Complaint Status" name="complaintstatus">
                    <Input type="text" placeholder="" disabled />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={9} lg={9} xxl={9} className="mb-16">
                  <Form.Item
                    label="Complaint Decision"
                    name="complaintdecision"
                  >
                    <Select
                      placeholder="Select Disposition"
                      disabled
                      options={complaintFormLU}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={9} lg={9} xxl={9} className="mb-16">
                  <Form.Item
                    label="Complaint Duration"
                    name="complaintduration"
                  >
                    <Input
                      type="text"
                      placeholder="Complaint Duration"
                      disabled
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={9} lg={9} xxl={9} className="mb-16">
                  <Form.Item
                    label="Can Complaint be Re-Opened"
                    name="CanComplaintbeReOpened"
                  >
                    <Input
                      type="text"
                      placeholder="Can Complaint be Re-Opened"
                      disabled
                    />
                  </Form.Item>
                </Col>
              </>
            )}
            {/* {isreopenTicket && selectedSubType !== 'complaintreopen' &&(
  <>
  <Col xs={24} sm={24} md={9} lg={9} xxl={9} className="mb-16">
  <Form.Item
    label="Enter Existing Ticket ID"
    name="enterexistingticketid"
  >
    <Input 
      type="text" 
      placeholder="Enter Ticket ID" 
      maxLength={14} 
      minLength={14}
      onBlur={(e) => onBlurInput(e.target.value, { label: "Enter Existing Ticket ID" })} 
      disabled
    />
  </Form.Item>
</Col>


    <Col xs={24} sm={24} md={9} lg={9} xxl={9} className="mb-16">
      <Form.Item label="Call Type" name="calltype">
        <Input type="text" placeholder="" disabled />
      </Form.Item>
    </Col>

    <Col xs={24} sm={24} md={9} lg={9} xxl={9} className="mb-16">
      <Form.Item label="Sub Type" name="subtype">
        <Input type="text" placeholder="" disabled />
      </Form.Item>
    </Col>

    <Col xs={24} sm={24} md={9} lg={9} xxl={9} className="mb-16">
      <Form.Item label="Complaint Status" name="complaintstatus">
        <Input type="text" placeholder="" disabled />
      </Form.Item>
    </Col>

    <Col xs={24} sm={24} md={9} lg={9} xxl={9} className="mb-16">
      <Form.Item label="Complaint Decision" name="complaintdecision">
        <Select placeholder="Select Disposition" disabled options={complaintFormLU} />
      </Form.Item>
    </Col>
  </>
)} */}

            <Col xs={12} sm={12} md={12} lg={12} xxl={12} className="mb-16">
              <div>
                <a
                  onClick={handleViewUserAgeing}
                  style={{ cursor: "pointer", color: "#b21f1f" }}
                >
                  View Complaint Email{" "}
                  <span>
                    <i className="bi bi-envelope-open"></i>
                  </span>
                </a>
              </div>
            </Col>

            <Col xs={24} sm={24} md={23} lg={23} xxl={23} className="mb-4">
              {" "}
              {/* Reduced margin-bottom */}
              <Form.Item
                label="Complaint Description"
                name="ComplaintDescription"
                className="inputs-label mb-0"
                style={{ marginBottom: "4px" }} // Reducing the bottom margin of Form.Item
                rules={[{ required: true, message: "Enter Description" }]}
                labelCol={{ style: { marginBottom: "2px" } }} // Reduce label bottom margin
              >
                <TextArea
                  rows={4}
                  maxLength={1000}
                  placeholder="Enter Complaints Description"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={9} lg={9} xxl={9} className="mb-16">
              <Form.Item
                label="Complaint From"
                name="ComplaintForm"
                rules={[{ required: true, message: "Select Request Mode" }]}
              >
                <Select
                  placeholder="Complaint From"
                  options={complaintFormLU}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={9} lg={9} xxl={9} className="mb-16">
              <Form.Item
                label="Request Mode"
                name="requestchannel"
                rules={[{ required: true, message: "Select Request Mode" }]}
              >
                <Select
                  placeholder="Request Mode"
                  options={requestModeLU}
                  disabled
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={9}>
              <Form.Item
                label="Customer Signing Date"
                name="CustomerSigningDate"
                // rules={[{ required: true, message: "Select Customer Signing Date & Time" }]}
              >
                <Input
                  className="cust-input modal-input"
                  placeholder="Customer Signing Date"
                  disabled
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={9}>
              <Form.Item
                label="Request Received Date"
                name="BranchReceivedDate"
                // rules={[{ required: true, message: "Select Branch Signing Date" }]}
              >
                <Input
                  className="cust-input modal-input"
                  placeholder="Request Received Date"
                  disabled
                />
              </Form.Item>
            </Col>

            {showReasonField && (
              <Col xs={24} sm={24} md={9} lg={9} xxl={9} className="mb-16">
                <Form.Item
                  label="Reason For Delayed Submission"
                  name="ReasonForDelay"
                >
                  <Input type="text" placeholder="Enter reason for delay" />
                </Form.Item>
              </Col>
            )}
            <Col xs={24} md={9}>
              <Form.Item
                label="Validate Signature"
                name="ValidateSignature"
                rules={[{ required: true, message: "Please select an option" }]}
              >
                <Radio.Group disabled>
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={9} lg={9} xxl={9} className="mb-16">
              <Form.Item label="Requestor Comments" name="RequestorComments">
                <Input type="text" placeholder="Requestor Comments" disabled />
              </Form.Item>
            </Col>
            {/* {selectedSubType!=='complaintreopen'&&( */}
            <Col xs={24} sm={24} md={9} lg={9} xxl={9} className="mb-16">
              <Form.Item
                label="Tag Complaint"
                name="tagComplaint"
                className="inputs-label mb-0"
                rules={[{ required: true }]}
              >
                <Radio.Group
                  onChange={handleRadioChange}
                  value={tagComplaint}
                  disabled={
                    serviceRequestTransactionData?.irdA_Token_Number !== null &&
                    serviceRequestTransactionData?.irdA_Token_Number !== ""
                  }
                >
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            {/* )} */}
            {/* {selectedSubType!=='complaintreopen'&&( */}
            <Col xs={24} sm={24} md={9} lg={9} xxl={9} className="mb-16">
              <Form.Item
                label="Type of Complaint"
                name="typeofcomplaint"
                className="inputs-label mb-0 subtype right-colsize"
                rules={[{ required: true }]}
              >
                <Select
                  className="cust-input calltype-select"
                  maxLength={100}
                  placeholder="Select Type of Complaint"
                  options={TypeOfComplaintDropdown}
                  filterOption={filterOption}
                  onChange={(value, option) => DisableRcaTab(value, option)}
                />
              </Form.Item>
            </Col>
            {/* )} */}

            <Col xs={12} sm={12} md={12} lg={12} xxl={12} className="mb-16">
              <div>
                {/* style={{ 
    pointerEvents: (tagComplaint || (selectedSubtype === "reopen")) ? "auto" : "none", 
    color: (tagComplaint || (selectedSubtype === "reopen")) ? "#b21f1f" : "gray" 
  }} */}
                {/* <a
  href="#"
  onClick={isIGMSLinkEnabled ? showIGMSData : (e) => e.preventDefault()}
  style={{
    pointerEvents: isIGMSLinkEnabled ? 'auto' : 'none',
    color: isIGMSLinkEnabled ? '#b21f1f' : 'gray',
  }}
>
  Click For IGMS
</a> */}
                {/* <a href="#" onClick={isIGMSLinkEnabled ? showIGMSData : (e) => e.preventDefault()}style={{  pointerEvents: isIGMSLinkEnabled ? "auto" : "none",color: isIGMSLinkEnabled ? "#b21f1f" : "gray",}}>Click For IGMS</a> */}
                {/* <a href="#" onClick={showIGMSData}style={{ pointerEvents: tagComplaint ? "auto" : "none", color:(tagComplaint? "#b21f1f" : "gray") }}>Click For IGMS</a> */}
                <Modal
                  title={
                    IRDATokenNumber !== ""
                      ? `IGMS Data (${IRDATokenNumber})`
                      : "IGMS Data"
                  }
                  open={isModalVisible}
                  // onOk={handleOk}
                  onCancel={handleCancel}
                  // okText="Submit"
                  // cancelText="Cancel"
                  footer={null}
                  width={1200}
                  style={{ top: 20 }}
                  closeIcon={true}
                >
                  {showPopup && (
                    <ErrorPopup
                      errors={errors}
                      open={showPopup}
                      onClose={() => setShowPopup(false)}
                    />
                  )}
                  <div style={{ height: "600px", overflowY: "auto" }}>
                    <Form form={form} layout="vertical">
                      <Collapse
                        expandIconPosition="end"
                        expandIcon={({ isActive }) => (
                          <span className={`${isActive ? "active" : ""}`} />
                        )}
                      >
                        {sections.concat(sections1).map((section, index) => (
                          <Collapse.Panel header={section.title} key={index}>
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                                gap: "20px",
                                marginLeft: "10px",
                                marginTop: "10px",
                              }}
                            >
                              {(section.title === "Complaint Details"
                                ? [...section.fields, ...dynamicFields]
                                : section.fields
                              ).map((field, fieldIndex) => (
                                <div key={fieldIndex}>
                                  {field.type === "Input" && (
                                    <Form.Item
                                      label={
                                        <span className={field.className || ""}>
                                          {field.label}{" "}
                                          {field?.rules?.[0]?.required && (
                                            <sup>*</sup>
                                          )}
                                        </span>
                                      }
                                      name={field.name}
                                      rules={field?.rules}
                                    >
                                      <Input
                                        placeholder={`Please Enter ${field.label}...`}
                                        disabled={field.disabled}
                                        onBlur={(e) =>
                                          onBlurInput(e.target.value, field)
                                        }
                                      />
                                    </Form.Item>
                                  )}

                                  {field.type === "DatePicker" && (
                                    <Form.Item
                                      label={
                                        <span className={field.className || ""}>
                                          {field.label}{" "}
                                          {field?.rules?.[0]?.required && (
                                            <sup>*</sup>
                                          )}
                                        </span>
                                      }
                                      name={field.name}
                                      rules={field?.rules}
                                    >
                                      <DatePicker
                                        style={{ width: "100%" }}
                                        disabledDate={field.disabledDate}
                                        disabled={field.disabled}
                                        format="DD/MM/YYYY"
                                        placeholder={`Please Select ${field.label}...`}
                                      />
                                    </Form.Item>
                                  )}

                                  {field.type === "Select" && (
                                    <Form.Item
                                      label={
                                        <span className={field.className || ""}>
                                          {field.label}{" "}
                                          {field?.rules?.[0]?.required && (
                                            <sup>*</sup>
                                          )}
                                        </span>
                                      }
                                      name={field.name}
                                      rules={field?.rules}
                                    >
                                      <Select
                                        placeholder={`Please select a ${field.label}...`}
                                        disabled={field.disabled}
                                        onChange={(value, option) =>
                                          handleSelectChange(
                                            field,
                                            value,
                                            option,
                                            section.title
                                          )
                                        }
                                      >
                                        {field.name === "CityID"
                                          ? cityOptions.map((city, index) => (
                                              <Select.Option
                                                key={city.geo_PCIN_SrNo}
                                                value={city.geo_PCIN_SrNo}
                                              >
                                                {city.city_Town_Vill_AreaNm}
                                              </Select.Option>
                                            ))
                                          : field.options.map((option) => (
                                              <Select.Option
                                                key={option.value}
                                                value={option.value}
                                              >
                                                {option.label}
                                              </Select.Option>
                                            ))}
                                      </Select>
                                    </Form.Item>
                                  )}

                                  {field.type === "RadioGroup" && (
                                    <Form.Item
                                      label={
                                        <span className={field.className || ""}>
                                          {field.label}{" "}
                                          {field?.rules?.[0]?.required && (
                                            <sup>*</sup>
                                          )}
                                        </span>
                                      }
                                      name={field.name}
                                      rules={field?.rules}
                                    >
                                      <Radio.Group>
                                        <Radio value={1}>Yes</Radio>
                                        <Radio value={0}>No</Radio>
                                      </Radio.Group>
                                    </Form.Item>
                                  )}

                                  {field.type === "Switch" && (
                                    <Form.Item
                                      label={
                                        <span className={field.className || ""}>
                                          {field.label}{" "}
                                          {field?.required && <sup>*</sup>}
                                        </span>
                                      }
                                      name={field.name}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Switch
                                          checkedChildren="Yes"
                                          unCheckedChildren="No"
                                        />
                                      </div>
                                    </Form.Item>
                                  )}
                                </div>
                              ))}
                            </div>
                          </Collapse.Panel>
                        ))}
                      </Collapse>
                      <div className="contact-details-btn">
                        <Button
                          type="primary"
                          className="primary-btn"
                          htmlType="submit"
                          onClick={handleOk}
                        >
                          Save
                        </Button>{" "}
                        <Button
                          type="primary"
                          className="primary-btn"
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>{" "}
                      </div>
                    </Form>
                  </div>
                </Modal>
                <Modal
                  title={
                    <div
                      style={{ textAlign: "center", fontWeight: "bold" }}
                    ></div>
                  }
                  open={showViewModal}
                  destroyOnClose={true}
                  closeIcon={
                    <Tooltip title="Close">
                      <span
                        onClick={() => setShowViewModal(false)}
                        style={{ cursor: "pointer" }}
                      >
                        <img src={CloseIcon} alt="Close" />
                      </span>
                    </Tooltip>
                  }
                  footer={null}
                  width={900} // Adjust for table width
                  className="mt-62"
                >
                  <div
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <table
                      style={{ width: "100%", borderCollapse: "collapse" }}
                    >
                      <thead>
                        <tr>
                          {
                            <th
                              colSpan="1"
                              style={{
                                borderBottom: "1px solid black",
                                padding: "10px",
                                fontWeight: "bold",
                              }}
                            >
                              {/* <span>From:{fromEmail}</span>  */}
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "flex-start",
                                }}
                              >
                                <label
                                  htmlFor="fromEmail"
                                  style={{ marginRight: "10px" }}
                                >
                                  From:
                                </label>
                                <span id="fromEmail">{fromEmail}</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <label
                                  htmlFor="createdDate"
                                  style={{ marginRight: "10px" }}
                                >
                                  Time:
                                </label>
                                <span id="createdDate">{emailCreatedDate}</span>
                              </div>
                            </th>
                          }
                        </tr>
                      </thead>
                      <tbody
                        style={{
                          display: "block", // Required to enable scroll on tbody
                          maxHeight: "1000px", // Set max height for scrollable area
                          overflowY: "auto", // Enable vertical scrolling
                        }}
                        className="scrollable-container"
                      >
                        <tr style={{}}>
                          {" "}
                          {/* Maintain table-like structure */}
                          <td className="para-compact">
                             <div
      dangerouslySetInnerHTML={{__html: emailBody}}
    /></td>
                        </tr>
                        {/* Add more rows to test scrolling */}
                      </tbody>
                    </table>
                  </div>
                </Modal>
                <Modal
                  title={null}
                  open={showReopenModal}
                  // onClose={() => setShowReopenModal(false)}
                  footer={null}
                  centered
                  closable={false}
                  width={500}
                >
                  <div
                    style={{
                      padding: "20px",
                      textAlign: "center",
                      border: "1px silid white",
                    }}
                  >
                    <p style={{ fontWeight: "bold" }}>
                      You are about to re-open this complaint. Previous details
                      will be retrieved and pre-filled for your reference.
                    </p>
                    <p style={{ marginTop: "20px" }}>
                      <b>Would you like to continue?</b>
                    </p>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "20px",
                        marginTop: "30px",
                      }}
                    >
                      <Button
                        onClick={handleClose}
                        style={{
                          backgroundColor: "#c21b17",
                          color: "white",
                          width: 100,
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleReopen}
                        style={{
                          backgroundColor: "#c21b17",
                          color: "white",
                          width: 100,
                        }}
                      >
                        ReOpen
                      </Button>
                    </div>
                  </div>
                </Modal>
              </div>
            </Col>
            <Col xs={24} sm={12} md={24} lg={24} xxl={24}>
              <div
                className="contact-details-btn"
                style={{
                  display: "flex",
                  justifyContent: "flex-start", // Align content to the left
                }}
              >
                <Button
                  type="primary"
                  className="primary-btn"
                  //htmlType="submit"
                  onClick={handleMiscSave}
                  disabled={TicketStatus === "CLOSED"}
                >
                  Save
                </Button>
                <Button
                  type="primary"
                  className="primary-btn"
                  onClick={showIGMSData}
                  disabled={!tagComplaint || TicketStatus === "CLOSED"}
                >
                  Click For IGMS
                </Button>

                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit"
                  // disabled={tagComplaint === true}
                  disabled={
                    isSending ||
                    tagComplaint === "true" ||
                    TicketStatus === "CLOSED"
                  }
                  onClick={handleEmailSend}
                >
                  Send Email
                </Button>
              </div>
            </Col>
            <Col xs={24} sm={24} md={17} lg={17} xxl={17} className="mb-16">
              {/* <h6 className="fw-700" style={{color:"#b21f1f"}}>Response For Complainant</h6>
    <Form.Item
    label="Is Complaint Closed in Favour Of the Customer"
    name="complaintClosed"
    className="inputs-label"
    style={{ margin: '16px 0' }} // Adds spacing
>
    <Radio.Group>
        <Radio value="yes">Yes</Radio>
        <Radio value="no">No</Radio>
    </Radio.Group>
    </Form.Item> */}
              {/* <Form.Item
    label="Complaint Decision"
    name="complaintDecision"
    className="inputs-label"
    style={{ margin: '16px 0' }} // Adds spacing
    // rules={[{ required: true, message: 'Please select a complaint decision!' }]} // Validation rule
>
    <Select
        className="cust-input"
        placeholder="Select complaint decision"
    >
        <Select.Option value="infavor">In favor</Select.Option>
        <Select.Option value="rejected">Rejected</Select.Option>
        <Select.Option value="partiallyInfavor">Partially in favor</Select.Option>
        <Select.Option value="duplicate">Duplicate</Select.Option>
    </Select>
</Form.Item> */}
              {/* <Form.Item
        label="Sent Template"
        name="sentTemplate"
        className="inputs-label"
        style={{ margin: '16px 0' }} // Adds 16px margin above and below
    >
        <Select
            onChange={(value) => sentTemplate(value)}
            className="cust-input"
            maxLength={100}
            placeholder="Select a Sent Template"
            options={[
                { value: "acknowledge", label: "Acknowledge" },
                { value: "closure", label: "Closure" },
                { value: "unregistered", label: "UnRegistered Mail" }
            ]}
        />
    </Form.Item> */}
              {/* New SenderEmail field  */}
              {/* <Form.Item
        label="Email To"
        name="senderEmail"
        className="inputs-label"
        style={{ margin: '16px 0' }} // Adds 16px margin above and below
    >
        <Input
            className="cust-input"
            placeholder="Enter sender's email"
        />
    </Form.Item>
    <Form.Item
        label="Subject Line"
        name="subjectLine"
        className="inputs-label"
        style={{ margin: '16px 0' }} // Adds 16px margin above and below
    >
        <Input
            className="cust-input"
            placeholder="Enter Subject Line"
        />
    </Form.Item> */}

              {/* {isEmailButton && 
        <Button
            type="primary"
            className="primary-btn"
            htmlType="submit"
            onClick={handleEmailSend}
            style={{ marginTop: '16px', marginBottom: '16px' }} // Adjust these values as needed
        >
            Send
        </Button>
    } */}

              {/* <Col xs={24} sm={12} md={24} lg={24} xxl={24}>
            <div className="contact-details-btn" style={{
            display: "flex",
            justifyContent: "flex-start", // Align content to the left
        }}>
                <Button
                    type="primary"
                    className="primary-btn"
                    htmlType="submit"
                    onClick={handleMiscSave}
                >
                    Save 
                </Button>
            </div>
        </Col> */}

              {/* <ReactQuill className="quill-container" modules={module} theme="snow" value={ResponseForCustomer}  onChange={(value) => setResponseForCustomer(value)} /> */}
              {/* <Col xs={24} sm={12} md={24} lg={24} xxl={24}>
  <div
    className="contact-details-btn"
    style={{
      display: "flex",
      justifyContent: "flex-start", // Aligns content to the left
      gap: "10px", // Adds spacing between buttons
    }}
  >
    <Button
      type="primary"
      className="primary-btn"
      htmlType="submit"
      onClick={handleEmailSend}
    >
      Send
    </Button>

    <Button
      type="primary"
      className="primary-btn"
      htmlType="submit"
      onClick={handleComplaintsTicketCloseButton}
    >
      Close
    </Button>
  </div>
</Col> */}
            </Col>

            {/* <Col xs={24} sm={12} md={24} lg={24} xxl={24}>
            <div className="contact-details-btn">
                <Button
                    type="primary"
                    className="primary-btn"
                    htmlType="submit"
                    onClick={handleMiscSave}
                >
                    Save 
                </Button>
            </div>
        </Col> */}
          </Row>
        </Form>

        {showAlert && (
          <PopupAlert
            alertData={alertData}
            title={alertTitle}
            setShowAlert={setShowAlert}
          ></PopupAlert>
        )}
      </div>
    </Spin>
  );
};

export default ViewCustomerComplaintTab;
