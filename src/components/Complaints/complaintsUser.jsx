import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill-new';
import apiCalls from "../../api/apiCalls";
import { Card, Col, Row, Radio, Timeline, Space, Tabs, Switch ,Checkbox,  Select, Input, Form, Button, Collapse, Modal, message, Spin, Progress, Tooltip,DatePicker, Upload,Table } from 'antd';
import CloseIcon from "../../assets/images/close-icon.png";
import { Routes, Route, useParams, useLocation } from 'react-router-dom';
import Assistance from "../../assets/images/handshake.png";
import Widgets from '../Widgets/Widgets';
import ViewCustomerComplaintTab from './ViewCustomerComplaintTab';
import CustomerDetails from '../customerDetails';
import CustomerInterationTab from './CustomerInterationTab';
import SalesInteractionTab from './SalesInteractionTab';
import { Data } from '../../mainconfig';
import PopupAlert from "../popupAlert";
import html2pdf from "html2pdf.js";
import moment from 'moment';
import dayjs from "dayjs";
import { UploadOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import UploadIcon from "../../assets/images/upload.png";
import { secureStorage } from '../../utils/secureStorage';
import { billFreq } from '../../utils/constantLU';


const { Option } = Select;
const { TabPane } = Tabs;
const { Panel } = Collapse;

const suffix = <img src={UploadIcon} alt="" />;
// import apiCalls from "../../api/apiCalls";
const ComplaintsUser = (props ) => {
  const callback = (key) => {

  };
  const { complaintCopyResponse } = props;
  const { TextArea } = Input;
  const [fileList1, setFileList1] = useState([]);
  const loginInfo = useSelector(state => state);
  const [activeTab, setActiveTab] = useState("1"); 
  const [rcahideshow, setRCATabHide] = useState(false);
  const [showComplainUser, setShowComplainUser] = useState(true);
  const [data1, setData1] = useState([]);
  const [clientEnquiryResponse, setClientEnquiryResponse] = useState([]);
  const [atrModal, setAtrModal] = useState(false);
  const [MissellingCalc, setMissellingCalc] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
   const [addComments, setAddComments] = useState(null);
  const [serviceRequestData, setServiceRequestData] = useState(null);
  const [misSellingCalcHistoryData, setmisSellingCalcHistoryData] = useState(null);
  const [gcpAPIResponseData, setgcpAPIResponseData] = useState(null);
  const [ExceptionhandlingRequiredOutCome, setExceptionhandlingRequiredOutCome] = useState("");
  const [ExceptionhandlingNotRequiredOutCome, setExceptionhandlingNotRequiredOutCome] = useState("");
  const [InFavourOfCustomerPercentage, setInFavourOfCustomerPercentage] = useState("");
  const [NotInFavourOfCustomerPercentage, setNotInFavourOfCustomerPercentage] = useState("");
  const [DeclineOutComePercentage, setDeclineOutComePercentage] = useState("");
  const [showMiscgrid, setShowMiscgrid] = useState(false);
  const [payingCapacity, setPayingCapacity] = useState('');
const [renewalCallPositive, setRenewalCallPositive] = useState('no');
  const [ExceptionhandlingRequiredPercentage, setExceptionhandlingRequiredPercentage] = useState("");
  const [ExceptionhandlingNotRequiredPercentage, setExceptionhandlingNotRequiredPercentage] = useState("");
  const [NotInFavourOfCustomerOutCome, setNotInFavourOfCustomerOutCome] = useState("");
  const [InFavourOfCustomerOutCome, setInFavourOfCustomerOutCome] = useState("");
  const [DeclineOutCome, setDeclineOutCome] = useState("");
  const [srvReqID1, setSrvReqID] = useState(0);

  const [ExceptionhandlingRequiredCount, setExceptionhandlingRequiredCount] = useState("");
  const [ExceptionhandlingNotRequiredCount, setExceptionhandlingNotRequiredCount] = useState("");
  const [NotInFavourOfCustomerCount, setNotInFavourOfCustomerCount] = useState("");
  const [InFavourOfCustomerCount, setInFavourOfCustomerCount] = useState("");
  const [DeclineOutComeCount, setDeclineOutComeCount] = useState("");
  const [TotalCount, setTotalCount] = useState("");
  const [comments, setComments] = useState('');
  const [generalcomments, setGeneralcomments] = useState('');
  const [forceUpdate, setForceUpdate] = useState(false);

 const [uploadFiles, setUploadFiles] = useState([]);
 const [uploadFiles1, setUploadFiles1] = useState([]);
  const [uploadFiles3, setUploadFiles3] = useState([]);
 const [docIdProofs, setDocIdProofs] = useState([]);
  const [ResponseForCustomer, setResponseForCustomer] = useState('');
  const [allComments, setAllComments] = useState([]);

 const [fileList, setFileList] = useState([]);

const [masterData, setMasterData] = useState([]);
  const [form] = Form.useForm();
  const [file2, setFile2] = useState(null);
  const [files, setFiles] = useState([]);
  let { serviceId } = useParams();
  const dateFormat = "DD/MM/YYYY";
  const [isEditable, setIsEditable] = useState(false);
  const [isflc, setIsflc] = useState(false);
  const [is90days, setIs90days] = useState(false);
  const [createdOndate, setCreatedOndate] = useState("");

  const [miscellingHideShow, setMiscellingCalculatorTabHide] = useState(false);
  const [complaintCopyResponse1, setComplaintCopyResponse] = useState("");
  const [isSeniorCitizen, setSeniorCitizen] = useState(false);
  const [fakeLetter, setFakeLetter] = useState('no');
  const [FGLetter, setFGLetter] = useState('no');
  const [LoginLocationChange, setLoginLocationChange] = useState('no');
  const [SignaturePhotoChange, setSignaturePhotoChange] = useState('no');
  const [NegativeObservationChange, setNegativeObservationsChnage] = useState('no');
  const [CustomerRecieveChange, setCustomeRecieveChange] = useState('no');
  const [FreshComplaintChange, setFreshComplaintChange] = useState('no');
  const [loginLocation, setLoginLocation] = useState('no');
  const [welcomeChange, setWelcomeChange] = useState(false);
  const [signatureonProposal, setSignatureProposal] = useState('no');
  const [welcomeCall, setWelcomeCall] = useState('no');
  const [freshComplaint, setFreshComplaint] = useState('no');
  const [multiplePolicies, setMultiplePolicies] = useState('no');
  const [customerApproched, setCustomerApproched] = useState('no');
  const [renewalPremiumPaid, setRenewalPremiumPaid] = useState('no');
  const [medicalTestsConducted, setMedicalTestsConducted] = useState('no');
  const [deliveryDone, setDeliveryDone] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [TicketStatus, setTicketStatus] = useState('');
  const [alertData, setAlertData] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [transactionDocData, setTransactionDocData] = useState('');
  const [clientIDLU,setClientIDLU] = useState([]);
  const [closureLU,setClosureLU] = useState([]);
  const [typeOfDisposalData,setTypeOfDisposalData] = useState([]);
  const [size, setSize] = useState('small');
   const [capturedEntries, setCapturedEntries] = useState([]);
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [channelName, setChannelName] = useState('');
  const onChange = (e) => {
    setSize(e.target.value);
  };

  const [mode, setMode] = useState('left');
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };
  useEffect(() => {
    form.setFieldsValue({ daysbeyondFLC: is90days ? "Yes" : "No" });
  }, [is90days, form]);
  const handleRemove = file => {
    const newFileList = uploadFiles.filter(item => item.uid !== file.uid);
    setUploadFiles(newFileList);
    const newFileList1 = uploadFiles1.filter(item => item.uid !== file.uid);
    setUploadFiles1(newFileList1);
      const newFileList2 = uploadFiles3.filter(item => item.uid !== file.uid);
  setUploadFiles3(newFileList2);
  };
  const formItemLayout = {
    labelCol: {
      span: 4, // adjust the span based on your layout needs
    },
    wrapperCol: {
      span: 16, // adjust the span based on your layout needs
    },
  };
  const handleAddEntry = () => {
    const primaryRecommendation = form.getFieldValue('generalComments');
    if (primaryRecommendation) {
      const newEntry = {
        key: capturedEntries.length + 1,
        comment: primaryRecommendation,
      };
      setCapturedEntries([...capturedEntries, newEntry]);
      form.resetFields(['generalComments']); // Reset field after adding entry
    }
  };
  const totalCount =
  (data1?.declineCount || 0) +
  (data1?.exceptionhandlingNotRequiredCount || 0) +
  (data1?.exceptionhandlingRequiredCount || 0) +
  (data1?.inFavourOfCustomerCount || 0) +
  (data1?.notInFavourOfCustomerCount || 0);

  const totalRatio =
  (data1?.exceptionhandlingRequiredRatio || 0) +
  (data1?.exceptionhandlingNotRequiredRatio || 0) +
  (data1?.inFavourOfCustomerRatio || 0) +
  (data1?.notInFavourOfCustomerRatio || 0) ;
  
  const handleDeleteLastEntry = () => {
    if (allComments.length === 0) {
      message.warning("No comments to delete.");
      return;
    }
  
    const lastComment = allComments[allComments.length - 1];
    const recommendation = lastComment.claimRecommendation;
  
    apiCalls
      .GetClaimsDeleteCommentsInfo(srvReqID1, recommendation)
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
  

  const handleSendClick = async () => {
  try {
    // Validate form fields
    await form.validateFields();

    // If valid, show confirmation modal
    setIsModalVisible(true);
  } catch (errorInfo) {
    // If validation fails, do nothing (or optionally show message)
  }
};

const handleConfirmSend = () => {
  setIsModalVisible(false);
  handleEmailSend(); // your existing send method
};

const handleCancelSend = () => {
  setIsModalVisible(false);
};

const handleValidate = (itemDate) => {
    const dispatchDateStr = itemDate; // e.g., '20191115'
    
    if (!dispatchDateStr) {
      console.error("Dispatch Delivery Date not available.");
      return;
    }
  
    const dispatchDate = moment(dispatchDateStr, "YYYYMMDD"); // Parse the dispatch date
    const today = moment(); // Current date
    const daysDiff = today.diff(dispatchDate, 'days'); // Calculate difference in days
  
    const value = daysDiff < 30 ? "Yes" : "No"; // If < 30 days, Yes; otherwise, No
  
    // Set the value in the form and disable the dropdown dynamically
    form.setFieldsValue({ WithinFLCWindow: value }); // Dynamically set form value
    setIsflc(value)
     // Disable the dropdown in-place
  
  };
  const featureDateDisabled = (current) => current && current < dayjs().startOf("day");

  // const handleFakeLetterChange = (value) => {
  //   setFakeLetter(value);
  //   form.setFieldsValue({fakeLetter: value})
  // };

    const handleSignatureChangeRate = (value) => {
    setFakeLetter(value);
        form.setFieldsValue({ Signaturematchingontherateupconsentform: value})
  };

const handleLetterIssuedonFGLetterChange = (value) => {
    setFGLetter(value);
    form.setFieldsValue({ LetterissuedonFGletterheadwithfalsepromises: value})
  };

const handleLoginLocationChange = (value) => {
    setLoginLocationChange(value);
    form.setFieldsValue({LoginLocation: value})
  };

const handleSignaturePhotoChange = (value) => {
    setSignaturePhotoChange(value);
    form.setFieldsValue({SignaturePhotoChange: value})
  };

const handleNegativeObservationsChange = (value) => {
    setNegativeObservationsChnage(value);
    form.setFieldsValue({ NegativeObservationChange: value})
  };

const handleCustomeRecievedChange = (value) => {
    setCustomeRecieveChange(value);

    form.setFieldsValue({ Hasthecustomerreceivedthepolicybond: value})
  };

const handleFreshComplaintChange = (value) => {
    setFreshComplaintChange(value);
    form.setFieldsValue({ Freshorrepeatcomplaint: value})
  };

  const handleFakeLetterChange = (value) => {
    setFakeLetter(value);
    form.setFieldsValue({fakeLetter: value})
  };

const handleCustomerInformedChange = (value) => {
    setFakeLetter(value);
    form.setFieldsValue({ Hascustomerinformedinproposalformaboutpoliciesfromotherinsurancecompanies: value})
  };

const handle90DaysChange = (value) => {
    setFakeLetter(value);
    form.setFieldsValue({ daysbeyondFLC: value})
  };

  
  const handleloginLocationChange = (value) => {
    setLoginLocation(value);
    form.setFieldsValue({loginLocation: value})
  };

  const handleWelcomeChnange = (value) => {
    setWelcomeChange(value);
    form.setFieldsValue({welcomeChange: value})
  };

  const handlesignatureonProposalChange = (value) => {
    setSignatureProposal(value);
    form.setFieldsValue({signatureonProposal: value})
  };
  const handlewelcomeCallChange = (value) => {
    setWelcomeCall(value);
    form.setFieldsValue({welcomeCallChange: value})
  };
  const handlefreshComplaintChange = (value) => {
    setFreshComplaint(value);
    form.setFieldsValue({freshComplaint: value})
  };

  const handlePolicyDeliveryDoneStatus = (value) => {
    setDeliveryDone(value);
    form.setFieldsValue({deliveryDone: value})
  };

  const handlemultiplePoliciesChange = (value) => {
    setMultiplePolicies(value);
    form.setFieldsValue({multiplePolicies: value})
  };
  const handlecustomerApprochedChange = (value) => {
    setCustomerApproched(value);
    form.setFieldsValue({customerApproched: value})
  };
  const handlerenewalPremiumPaidChange = (value) => {
    setRenewalPremiumPaid(value);
    form.setFieldsValue({renewalPremiumPaid: value})
  };

  const handlemedicalTestsConductedChange = (value) => {
    setMedicalTestsConducted(value);
    form.setFieldsValue({medicalTestConducted: value})
  };
  const handlerenewalCallPositiveChange = (value) => {
    setRenewalPremiumPaid(value);
    form.setFieldsValue({renewalCallPositive: value})
  };

  
  const getGrievenceTransactionData = (values) => {
    return [
      {
        "Status": "Create",
        "TagName": "Comp_ATR_comments",
        "TagValue": values.Atrcomments
      },
      {
        "Status": "Create",
        "TagName": "Comp_Misselling_Comments",
        "TagValue": values.MissellingCalc
      },
      {
        "Status": "Create",
        "TagName": "Comp_General_Comments",
        "TagValue": values.generalComments
      }
    ];
  };


  
  const getAtrCommentsTransactionData = (values) => {
    return [
      {
        "Status": "Create",
        "TagName": "Comp_Comments",
        "TagValue": values.Comments
      }
    ];
  };

  const getCloserResponseTransactionData = (values) => {
    return [
      {
        "Status": "Create",
        "TagName": "Tag_Complaint",
        "TagValue": values.Tag_Complaint || ""
      },
      {
        "Status": "Create",
        "TagName": "Response_Mode",
        "TagValue": values.Response_Mode || ""
      },
      {
        "Status": "Create",
        "TagName": "Is_Complaint_Closed",
        "TagValue": values.Is_Complaint_Closed || ""
      }
      // Add additional fields if needed
    ];
  };


  const handleEditToggle = () => {
    setIsEditable((prev) => !prev);
  };

  const dummy = (values) => {
    return [
      {
        "Status": "Create",
        "TagName": "Comp_ATR_comments",
        "TagValue": values.Atrcomments
      },
      {
        "Status": "Create",
        "TagName": "Comp_Misselling_Comments",
        "TagValue": values.MissellingCalc
      },
      {
        "Status": "Create",
        "TagName": "Comp_General_Comments",
        "TagValue": values.generalComments
      }
    ];
  };


  const getRCATransactionData = (values) => {
    return [
      { "Status": "Create", "TagName": "Comp_Observations", "TagValue": values?.Observations },
      { "Status": "Create", "TagName": "Comp_Additional_Remarks", "TagValue": values?.Additional_Remarks },
      { "Status": "Create", "TagName": "Comp_Conclusion", "TagValue": values.Conclusion },
      { "Status": "Create", "TagName": "Comp_Additional_Space_for_case_remarks", "TagValue": values.Additional_Space_for_case_remarks },
      { "Status": "Create", "TagName": "Comp_Closure_Remarks", "TagValue": values.Closure_Remarks },
      { "Status": "Create", "TagName": "Comp_Nature_of_Complaint", "TagValue": values.Nature_of_Complaint },
      { "Status": "Create", "TagName": "Comp_Type_of_Error", "TagValue": values.Type_of_Error },
      { "Status": "Create", "TagName": "Comp_Reason_For_Error", "TagValue": values.Reason_For_Error },
      { "Status": "Create", "TagName": "Comp_Root_Cause", "TagValue": values.Root_Cause }
    ];
  };



  const getSalesFeedbackTransactionData = (values) => {
  return [
    {
      "Status": "Create",
      "TagName": "Comp_Sales_Comments",
      "TagValue": values.salesComments
    },
    {
      "Status": "Create",
      "TagName": "Comp_Sales_Feedback",
      "TagValue": values.SalesFeedback
    }
  ];
};
 const  getresponseTransactionData=(values)=>{
  return [
    { "Status": "Create", "TagName": "Comp_Nature_of_Complaint", "TagValue": values.Nature_of_Complaint },
    { "Status": "Create", "TagName": "complaintDecision", "TagValue": values.complaintDecision },
    { "Status": "Create", "TagName": "complaintClosed", "TagValue": values.complaintClosed },
   ];
 }

 const getCTST = () => {
  setIsLoading(true);

  let obj = {
    "MasterRequest": ["Nature_of_Complaint", "Closure_Remarks", "TYPE_OF_DISPOSAL"],
  };

  apiCalls.ctst(obj)
    .then((val) => {
      setMasterData(val.data);

      let clientIDs = val.data?.filter((ele) => ele.key === "Nature_of_Complaint");
      let clientIDData = clientIDs?.[0]?.value?.map((item) => ({
        label: item.mstDesc,
        value: item.mstID,  // Ensure this is a string/number, not an object
      })) || []; 

      let closureIDs = val.data?.filter((ele) => ele.key === "Closure_Remarks");
      let closureIDData = closureIDs?.[0]?.value?.map((item) => ({
        label: item.mstDesc,
        value: item.mstID, // Ensure this is a string/number
      })) || []; 

      let typeOfDisposal = val.data?.filter((ele) => ele.key === "TYPE_OF_DISPOSAL");
      let typeOfDisposalData = typeOfDisposal?.[0]?.value?.map((item) => ({
        label: item.mstDesc,
        value: item.mstID, // Ensure this is a string/number
      })) || []; 

      setClientIDLU(clientIDData);
      setClosureLU(closureIDData);
      setTypeOfDisposalData(typeOfDisposalData);
      setIsLoading(false);
    })
    .catch((err) => {
      setIsLoading(false);
      message.destroy();
      message.error({
        content: err?.data?.responseBody?.errormessage || "An error occurred",
        className: "custom-msg",
        duration: 2,
      });
    });
};

const handleRCASave = async () => {
  
  try {
    // Validate and retrieve form values
    await form.validateFields(); // Ensure all fields are validated
    const formData = form.getFieldsValue(); // Get all field values

    const obj = {
      srvReqRefNo: serviceId,
      TransactionData: getRCATransactionData(formData) || [],
      srvReqID: srvReqID1,
      ModifiedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
      RequestDateTime: "2024-01-10T00:00:00", // Update as needed
      CustSignDateTime: "2024-01-10T00:00:00" // Update as needed
    };

    // Make API call
    const response = await apiCalls.genericAPI(obj);
    if (response.status===200) { // Ensure response.status is available in your API response
      setAlertTitle(response?.data?.header);
      setAlertData(response?.data?.message);
      setShowAlert(true);
    }

    // Fetch additional data
    const val = await apiCalls.getPOSIndividualData(serviceId);
    setFormFieldsData(val);

  } catch (error) {
    console.error('API call failed:', error);
  }
};

const handleDownloadPDF = async () => {
  const payload = {
    HtmlFileName: "ATR.html",
    ApplicationNo: data?.identifiers?.applicationNo,
    blobFileName: "ATR.pdf",
    DocumentType: "ATR",
    Header: {
      Name_of_LA: data?.identifiers?.la_Name || "NA",
      DOB: clientEnquiryResponse?.clTdob ? formatDate(clientEnquiryResponse.clTdob) : "NA",
      Contact_Details: clientEnquiryResponse?.rmblphone || "NA",
      Income_of_LA: gcpAPIResponseData?.response?.clientAttribute?.[0]?.laIncome || "NA",
      Occupation_of_LA: gcpAPIResponseData?.response?.clientAttribute?.[0]?.laOccupation || "NA",
      City_Name: clientEnquiryResponse?.cltaddR04 || "NA",
      Name_of_Proposer: data?.identifiers?.po_Name || "NA",
      PO_DOB: clientEnquiryResponse?.clTdob ? formatDate(clientEnquiryResponse.clTdob) : "NA",
      PO_Contact_Details: clientEnquiryResponse?.rmblphone || "NA",
      Income_of_Proposer: gcpAPIResponseData?.response?.clientAttribute?.[0]?.proposerIncome || "NA",
      Occupation_of_Proposer: gcpAPIResponseData?.response?.clientAttribute?.[0]?.proposerOccupation || "NA",
      PO_City_Name: clientEnquiryResponse?.cltaddR04 || "NA",
      Name_of_Payor: data?.identifiers?.po_Name || "NA",
      Payor_DOB: clientEnquiryResponse?.clTdob ? formatDate(clientEnquiryResponse.clTdob) : "NA",
      Payor_Contact_Details: clientEnquiryResponse?.rmblphone || "NA",
      Income_of_Payor: gcpAPIResponseData?.response?.clientAttribute?.[0]?.proposerIncome || "NA",
      Occupation_of_Payour: gcpAPIResponseData?.response?.clientAttribute?.[0]?.proposerOccupation || "NA",
      Payor_City_Name: clientEnquiryResponse?.cltaddR04 || "NA",
      Total_Premium_Paid_All_Policies: gcpAPIResponseData?.response?.clientAttribute?.[0]?.payorIncome || "NA",
      Policy_Type: data?.planAndStatus?.policyType || "NA",
      Frequency: data?.planAndStatus?.paymentFrequency || "NA",
      Channel: data?.salesDetails?.channel || "NA",
      SA: data?.saDetails?.sumAssured || "NA",
      NPDD: gcpAPIResponseData?.response?.applicationAttribute?.[0]?.npdd ? formatDate(gcpAPIResponseData?.response?.applicationAttribute[0].npdd) : "NA",
      Advisor_Status: gcpAPIResponseData?.response?.advisorDetails?.[0]?.status || "NA",
      Policy_Premium: data?.premiumDetails?.policyPremium || "NA",
      Date_of_Issuance: data?.saDetails?.dateOfIssuance ? formatDate(data.saDetails.dateOfIssuance) : "NA",
      Agent_Name: "NA",
      Normal_Rated_Up: data?.underwritingDetails?.normalRatedUp || "NA",
      Policy_Status: data?.planAndStatus?.policyStatus || "NA",
      Auto_Pay: formatDate(gcpAPIResponseData?.response?.applicationAttribute?.[0]?.proposalSignDate) || "NA",
      Medical_Test_Conducted: gcpAPIResponseData?.response?.policyAttribute?.[0]?.MEDFLAG || "NA",
      Income_Proof: gcpAPIResponseData?.response?.policyAttribute?.[0]?.incomeProofSubmitted || "NA",
      Login_Location: gcpAPIResponseData?.response?.clientAttribute?.[0]?.loginLocation || "NA",
      Age_Proof: gcpAPIResponseData?.response?.clientAttribute?.[0]?.ageProof || "NA",
      PIVC: gcpAPIResponseData?.response?.policyAttribute?.[0]?.pivcStatus || "NA",
      Proposal_Logged_Date: formatDate(gcpAPIResponseData?.response?.applicationAttribute?.[0]?.proposalLoggedDate) || "NA",
      Welcome_Calling_Done: formatDate(gcpAPIResponseData?.response?.applicationAttribute?.[0]?.welcomeCallDisposition) || "NA",
      Any_Questionaire_Submitted: "NA",
      Mode_of_Premium: billFreq[data?.premiumDetails?.billFreq] || "NA",
      Address_Proof: gcpAPIResponseData?.response?.clientAttribute?.[0]?.addressProof || "NA",
      F2F_Done: gcpAPIResponseData?.response?.clientAttribute?.[0]?.f2f || "NA",
      Date_of_Dispatch: formatDate(gcpAPIResponseData?.response?.dispatch_details?.[0]?.dispatchDeliveryDate) || "NA",
      Within_FLC_Window: "NA",
      Delivery_Date: "NA",
      Is_Customer_related_to_EmployeeAgent: "NA",
      Mode_of_Dispatch: gcpAPIResponseData?.response?.dispatch_details?.[0]?.dispatchMode || "NA",
      Any_Endorsement_Done: "NA",
      Delivery_Status: gcpAPIResponseData?.response?.delivery_details?.[0]?.dispatchStatus || "NA",
      AWB_No: gcpAPIResponseData?.response?.delivery_details?.[0]?.airwayBillNo || "NA",
      User_Comments: comments || "NA",
    },
    policies: [
      {
        PolicyId: "P123",
        PolicyType: "Life",
        StartDate: "2023-01-01",
        EndDate: "2028-01-01",
      },
    ],
    Funds: [
      {
        FundName: "Equity Growth Fund",
        FundValue: 100000.5,
        unitTransaction: [
          {
            TransactionDate: "2024-01-15",
            TransactionType: "Purchase",
            NAV: "30.25",
            Units: "500",
            Amount: "15125",
          },
        ],
      },
    ],
  };

  try {
    const response = await apiCalls.ATRTabDownloadPDF(payload);
    //const pdfResponse = await response.json();

    console.log("PDF Generation Response:", response);

    const result = response?.data?.result;

    if (result?.pdfGenerationStatus) {
     const pdfUrl = `${import.meta.env.VITE_APP_Image_Path}/ATR/${data?.identifiers?.applicationNo}/ATR.pdf`;
      // Trigger PDF download
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = "ATR.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("PDF generation failed.");
    }
  } catch (error) {
    console.error("Error generating/downloading PDF:", error);
  }
};

const handleRCADownloadPDF = async () => {
  let formData = form.getFieldValue()
  const payload = {
    HtmlFileName: "RCA.html",
    ApplicationNo: data?.identifiers?.applicationNo,
    blobFileName: "RCA.pdf",
    DocumentType: "RCA",
    Header: {
      Observations: formData?.Observations || "NA",
      Additional_Remarks:  formData?.Additional_Remarks || "NA",
      Conclusion: formData?.Conclusion || "NA",
      Additional_Space_for_case_remarks: formData?.Additional_Space_for_case_remarks || "NA",
      Closure_Remarks: formData?.Closure_Remarks || "NA",
      Nature_Of_Complaint: formData?.Nature_of_Complaint || "NA",
      Type_Of_Error: formData?.Type_of_Error || "NA",
      Reason_for_Error: formData?.Reason_For_Error || "NA",
      Root_Cause : formData?.Root_Cause || "NA",
    },
    policies: [
      {
        PolicyId: "P123",
        PolicyType: "Life",
        StartDate: "2023-01-01",
        EndDate: "2028-01-01",
      },
    ],
    Funds: [
      {
        FundName: "Equity Growth Fund",
        FundValue: 100000.5,
        unitTransaction: [
          {
            TransactionDate: "2024-01-15",
            TransactionType: "Purchase",
            NAV: "30.25",
            Units: "500",
            Amount: "15125",
          },
        ],
      },
    ],
  };

  try {
    const response = await apiCalls.ATRTabDownloadPDF(payload);
    //const pdfResponse = await response.json();

    console.log("PDF Generation Response:", response);

    const result = response?.data?.result;

    if (result?.pdfGenerationStatus) {
     const pdfUrl = `${import.meta.env.VITE_APP_Image_Path}/RCA/${data?.identifiers?.applicationNo}/RCA.pdf`;
      // Trigger PDF download
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = "RCA.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("PDF generation failed.");
    }
  } catch (error) {
    console.error("Error generating/downloading PDF:", error);
  }
};

const handleDownloadPDFgrievence = async () => {
  const payload = {
    HtmlFileName: "ComplaintsComments.html",
    ApplicationNo: data?.identifiers?.applicationNo,
    blobFileName: "Grievence.pdf",
    DocumentType: "Grievence",
    Header: {
      Comments: allComments
        .map(c => c.claimRecommendation)
        .filter(Boolean)
        .join(', ') // 👈 Join the array into a single string
    },
    policies: [
      {
        PolicyId: "P123",
        PolicyType: "Life",
        StartDate: "2023-01-01",
        EndDate: "2028-01-01",
      },
    ],
    Funds: [
      {
        FundName: "Equity Growth Fund",
        FundValue: 100000.5,
        unitTransaction: [
          {
            TransactionDate: "2024-01-15",
            TransactionType: "Purchase",
            NAV: "30.25",
            Units: "500",
            Amount: "15125",
          },
        ],
      },
    ],
  };

  try {
    const response = await apiCalls.ATRTabDownloadPDF(payload);
    console.log("PDF Generation Response:", response);

    const result = response?.data?.result;

    if (result?.pdfGenerationStatus) {
      const pdfUrl = `${import.meta.env.VITE_APP_Image_Path}/Grievence/${data?.identifiers?.applicationNo}/Grievence.pdf`;
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = "RCA.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("PDF generation failed.");
    }
  } catch (error) {
    console.error("Error generating/downloading PDF:", error);
  }
};


const uploadProps3 = {
  name: "file3",
  multiple: false,
  fileList,
  customRequest: async ({ file2, onSuccess }, label) => {
    let formData = new FormData();
    const ApplicationNo =
      data?.identifiers?.applicationNo;
    formData.append("File", file2, `${ApplicationNo}/${file2.name}`);

    try {
      const response = await apiCalls.fileUpload(formData);
      if (response?.data) {
        const newDocumentObj = {
          IndexName: "Complaint Letter",
          DocumentName: file2?.name,
          UserID: loginInfo?.userProfileInfo?.profileObj?.userName,
          UploadedBy: loginInfo?.userProfileInfo?.profileObj?.name,
          UploadedOn: new Date(),
          DocumentSize: file2?.size,
          FileLocation: `/${ApplicationNo}/`,
          BlobFileName: file2?.name,
          FileExtnMime: file2?.type,
          labelName: label,
          name: file2.name,
        };

        // Update uploadFiles1 state
        setUploadFiles3((prevFiles) => [...(prevFiles || []), newDocumentObj]);

        // Call additional setters if needed
        setDocIdProofs(newDocumentObj);

        message.success({
          content: "File uploaded successfully",
          className: "custom-msg",
          duration: 3,
        });

        onSuccess();
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      message.error({
        content: "Something went wrong. Please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  },
};



const fetchTemplate = async () => {
  try {
    const response = await fetch('/34428.html'); 
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const text = await response.text();
    console.log("Template Loaded Successfully");
    return text;
  } catch (error) {
    console.error("Error loading the template:", error);
    return "";
  }
};

const generatePDF = async (data) => {
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
  updateTableData(tempDiv, data);
  await new Promise(resolve => setTimeout(resolve, 500)); 
  convertToPDF(tempDiv);
};



const updateTableData = (container, data) => {
  Object.entries(data).forEach(([key, value]) => {
    const label = getLabelFromKey(key);
    if (!label) return;

    // Find the <td> containing the label
    const labelCell = Array.from(container.querySelectorAll("td")).find(
      (td) => td.textContent.trim() === label
    );

    if (labelCell) {
      const valueCell = labelCell.nextElementSibling; 
      if (valueCell) {
        valueCell.textContent = value || "NA"; // ✅ Ensures "NA" for missing values
        valueCell.style.fontWeight = "bold";
        valueCell.style.textAlign = "left";
        valueCell.style.paddingLeft = "15px"; // More spacing between label & value
        valueCell.style.fontSize = "14px"; // Consistent font size
      }
    }
  });
};

const convertToPDF = (element) => {
  let opt = {
    margin: [15, 15, 15, 15], 
    filename: "ATR_Report.pdf",
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

const getLabelFromKey = (key) => {
  const mapping = {
    laName: "Name of LA",
    laDOB: "LA DOB",
    laContact: "LA Contact Details",
    laIncome: "Income of LA",
    laOccupation: "Occupation of LA",
    laCity: "LA City Name",
    proposerName: "Name of Proposer",
    proposerDOB: "Proposer DOB",
    proposerContact: "Proposer Contact Details",
    proposerIncome: "Income of Proposer",
    proposerOccupation: "Occupation of Proposer",
    proposerCityName : "Proposer City Name",
    payorName: "Name of Payor",
    payorDOB: "Payor DOB",
    payorContact: "Payor Contact Details",
    payorIncome: "Income of Payor",
    occupationofPayor: "Occupation of Payour",
    payorCityName: "Payor City Name",
    totalPremiumPaidAllPolicies: "Total Premium Paid All Policies", 
    policyType: "Policy Type",
    premium: "Premium Amount",
    issuanceDate: "Issuance Date",
    agentName: "Agent Name",
    pivcStatus: "PIVC Status",
    
    frequency: "Frequency",
    channel: "Channel",
    SA: "SA",
    NPDD: "NPDD",
    advisorStatus: "Advisor Status",
    policyPremium: "Policy Premium",
    
    dateOfIssuance: "Date of Issuance",
    normalRatedUp: "Normal/Rated Up",
    policyStatus: "Policy Status",
    
    proposalSignDate: "Proposal Sign Date",
    medicalTestsConducted: "Medical Test Conducted",
    incomeProof: "Income Proof",
    loginLocation: "Login Location",
    
    ageproof: "Age Proof",
    PIVC: "PIVC",
    proposalLoggedDate: "Proposal Logged Date",
    welcomecallingdone: "Welcome Calling Done",
    
    modeofPremium: "Mode of Premium",
    addressProof: "Address Proof",
    F2FDone: "F2F Done",
    deliveryDate: "Delivery Date",
    
    modeOfDispatch: "Mode of Dispatch",
    anyEndorsementsDone: "Any Endorsement Done",
    deliveryStatus: "Delivery Status",
    AWBNo: "AWB No",
    Comments: "Comments"
  };

  return mapping[key] || null;
};

// const handleDownloadPDFgrievence= async () => {
//   // const tabData = {
//   //   comments:allComments[0]?.claimRecommendation
//   // };
//   const tabData = {
//     comments: allComments
//       .map(c => c.claimRecommendation)
//       .filter(Boolean) 
//   };


//   await generatePDFGrievence(tabData.comments);
// };
const generatePDFGrievence = async (allComments) => {
  let template = await fetchTemplateGrievence();
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
  updateTableDataGrievence(tempDiv, allComments);
  await new Promise(resolve => setTimeout(resolve, 500)); 
  convertToPDFGrievence(tempDiv);
};
const getLabelFromKeyGrievence = (key) => {
  const mapping = {
    Comments: "Comments", 
  };

  return mapping[key] || null;
};

  const handlePastComments =(values)=>{
    const newComment =  addComments != null ? addComments?.trim() : form.getFieldValue('generalComments');
   
    if(!newComment || newComment === " "){
        return null;
    }

    let response = apiCalls.GetClaimsCommentsInfo(srvReqID1,addComments,loginInfo?.userProfileInfo?.profileObj?.name, form.getFieldValue('generalComments'));
    response
      .then((val) => {
      message.success(val?.data);
      const newComment = {
        "createdDate": new Date(),
        "comments" : addComments,
        "claimRecommendation": form.getFieldValue('generalComments')
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
    .GetClaimsViewCommentsInfo(srvReqID1)
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
          // referrelSheetForm.setFieldsValue({
          //   referralViewComments: commentsString,
          // });
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

  const handleTabChange = (key) => {
    setActiveTab(key);
    if (key === "12") {
      handleViewComments();
    }
  };

const fetchTemplateGrievence = async () => {
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
const updateTableDataGrievence = (container, comments) => {
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

const convertToPDFGrievence = (element) => {
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
  const getTransactionData = (values) => {
      
    
      return [
        {
          "Status": "Create",
          "TagName": "Comp_LA_Age",
          "TagValue": values.age
        },
        {
          "Status": "Create",
          "TagName": "Comp_PO_Age",
          "TagValue": values.poage
        },
        {
          "Status": "Create",
          "TagName": "Comp_Payor_Age",
          "TagValue": values.poage
        },
        {
          "Status": "Create",
          "TagName": "Comp_Income",
          "TagValue": values.laincome
        },
        {
          "Status": "Create",
          "TagName": "Comp_Occu_payor",
          "TagValue": values.laOccupation
        },
        {
          "Status": "Create",
          "TagName": "Comp_Rated_up",
          "TagValue": values.isitratedup
        },
        {
          "Status": "Create",
          "TagName": "Comp_PLVC_Done",
          "TagValue": values.totalPremiumDue
        },
        {
          "Status": "Create",
          "TagName": "Comp_Welcome_Calling",
          "TagValue": values.welcomeCallChange
        },
        {
          "Status": "Create",
          "TagName": "VarianceInLoginAddressLocations",
          "TagValue": values.loginLocation
        },
        {
          "Status": "Create",
          "TagName": "VarianceInCDFPropFormSignatures",
          "TagValue": values.SignaturePhotoChange
        },
        {
          "Status": "Create",
          "TagName": "PIVCWelcomeCallNegativeObsv",
          "TagValue": values.pivcStatus
        },
        {
          "Status": "Create",
          "TagName": "Comp_Policy_Delivery",
          "TagValue": values.deliv
        },
        {
          "Status": "Create",
          "TagName": "Comp_Fresh_Complaint",
          "TagValue": values.freshComplaint
        },
        {
          "Status": "Create",
          "TagName": "Comp_Multiple_policies",
          "TagValue": values.multiplePolicies
        },
        {
          "Status": "Create",
          "TagName": "Comp_Customer_Approched",
          "TagValue": values.customerApproched
        },
        {
          "Status": "Create",
          "TagName": "Comp_Renewal_Premium_paid",
          "TagValue": values.renewalPremiumPaid
        },
        {
          "Status": "Create",
          "TagName": "Comp_MedicalTests_Conducted",
          "TagValue": values.medflag
        },
        {
          "Status": "Create",
          "TagName": "Comp_Renewal_Call_positive",
          "TagValue": values.renewalCallPositive
        },
        {
          "Status": "Create",
          "TagName": "Comp_Is_LA_Senior_Citizen",
          "TagValue": values.renewalCallPositive
        },
        {
          "Status": "Create",
          "TagName": "Comp_Is_Proposer_Senior_Citizen",
          "TagValue": values.renewalCallPositive
        },

        {
          "Status": "Create",
          "TagName": "Comp_Paying_Capacity",
          "TagValue": values.renewalCallPositive
        },

        {
          "Status": "Create",
          "TagName": "Comp_Signature_matching",
          "TagValue": values.Signaturematchingontherate

        },

        {
          "Status": "Create",
          "TagName": "FakeLetterIssuedToCustomer",
          "TagValue": values.LetterissuedonFGletterheadwithfalsepromises
        },
        {
          "Status": "Create",
          "TagName": "Comp_Any_Variance_Observed",
          "TagValue": values.renewalCallPositive
        },
        {
          "Status": "Create",
          "TagName": "Comp_Signature_Photo",
          "TagValue": values.SignaturePhotoChange
        },
        {
          "Status": "Create",
          "TagName": "Comp_Any_negative_observations",
          "TagValue": values.AnynegativeobservationsinPIVC
        },
        {
          "Status": "Create",
          "TagName": "Comp_customer_received_policy_bond",
          "TagValue": values.Hasthecustomerreceivedthepolicybond
        },

        {
          "Status": "Create",
          "TagName": "Comp_Fresh_or_repeat_complaint",
          "TagValue": values.Freshorrepeatcomplaint
        },

        {
          "Status": "Create",
          "TagName": "Comp_customer_informed_in_proposal",
          "TagValue": values.Hascustomerinformedinproposalformaboutpoliciesfromotherinsurancecompanies
        },

        {
          "Status": "Create",
          "TagName": "Comp_90_days_beyond_FLC",
          "TagValue": values.daysbeyondFLC
        },

      ];
    
  }
  const handleresponseforcomplaint = () => {
    const formData = form.getFieldValue();
    const filteredCallType = masterData?.find((item) => item?.key === "CALL_TYP");
    let selectedCall;
    if(typeof (formData?.callType) === "number"){
      selectedCall = filteredCallType.value.find((item) => item?.mstID === props?.serviceRequestData?.callType)

    }
    if(typeof (formData?.callType) === "string"){
      selectedCall = filteredCallType.value.find((item) => item?.mstDesc === formData?.callType)

    }
    form.validateFields().then(async (values) => {
        const obj = {
            SrvReqRefNo: serviceId,
            "SrvReqID": srvReqID1,
            TransactionData: getresponseTransactionData(formData) || [],
            ModifiedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
            RequestDateTime: "2024-01-10T00:00:00",
            CustSignDateTime: "2024-01-10T00:00:00",
            CallType: selectedCall?.mstID,
            SubType: formData.subType
        };

        try {
            const response = await apiCalls.genericAPI(obj); // Await the API call
            if (response.status===200) { // Ensure response.status is available in your API response
                setAlertTitle(response?.data?.header);
                setAlertData(response?.data?.message);
                // setShowAlert(true);
            } else {
                console.error("Unexpected response status:", response.status);
            }
        } catch (error) {
            console.error("API call failed:", error);
        }
    }).catch((error) => {
        console.log("Validation failed:", error);
    });
};
function getCurrentISTDateTime() {
  const date = new Date();
  const istDateStr = date.toLocaleString('en-GB', { timeZone: 'Asia/Kolkata' });
  const [day, month, yearAndTime] = istDateStr.split('/');
  const [year, time] = yearAndTime.split(', ');
  return `${year.trim()}-${month}-${day}T${time}`;
}

const handleEmailSend = async () => {
  handleresponseforcomplaint();
  const formData = form.getFieldValue();
  const formattedNow = getCurrentISTDateTime();

  const currentUserEmail = secureStorage.get("email");
  const currentUserName = secureStorage.get("username");
  const defaultFileLocation = "/4512/";

  const uploads =   uploadFiles3 &&  uploadFiles3.length > 0  ?
  uploadFiles3.map(file => ({
    IndexName: file.IndexName || "Complaint Letter",
    FileLocation: file.FileLocation || defaultFileLocation,
    BlobFileName: file.BlobFileName || file.name,
  })) : [];

  const obj = {
    Subject: formData?.subjectLine,
    ReceiptTo: formData?.senderEmail,
    SrvReqID: srvReqID1,
    MAIL_BODY: ResponseForCustomer,
    SenderID: "communications@generalicentral.com",
    SenderName: "Generali Central",
    Uploads: uploads,
    commuHist: {
      SrvReqID: srvReqID1,
      TemplateID: 292,
      CommType: 2,
      ReceipientTo: formData?.senderEmail,
      ReceipientCC: null,
      MobileNos: "+",
      ScheduledTime: formattedNow,
      TriggeredTime: formattedNow,
      DeliveryDate: formattedNow,
      DeliveryStatus: 1,
      Retries: 1,
      FailureReason: null,
      ApiHeader: null,
      Tasgs: null,
      PolicyRef: 0,
      SMSText: null,
      EmailContent: `"MailBody":"${ResponseForCustomer}"`
    }
  };

  try {
    const response = await apiCalls.SendComplaintCommunication(obj);
    if (response.data === true) {
      setAlertTitle("Email Sent Successfully");
      setAlertData("Email Sent Successfully");
      setShowAlert(true);
    } else {
      setAlertTitle("Something went wrong");
      setAlertData("Something went wrong");
      setShowAlert(true);
    }
  } catch (error) {
    console.error("API error:", error);
    setAlertTitle("Something went wrong");
    setAlertData("Something went wrong");
    setShowAlert(true);
  }

  setIsLoading(false);
  setResponseForCustomer("");  
};


  const handleComplaintsTicketCloseButton = async () => {
    const formData = form.getFieldValue();
    
    try {
      // Send the API request and wait for the response
      const response = await apiCalls.UpdateComplaintTicketStatusAPI(serviceId);
      
      // Check the status code of the response
      
        // Show success message
        setAlertTitle('Ticket Status Updated Successfully');
        setAlertData( 'Ticket Status Updated Successfully');
        setShowAlert(true);
        setIsLoading(false);
      
    } catch (error) {
      setAlertTitle('Something went wrong');
      setAlertData( 'Something went wrong');
      setShowAlert(true);
      setIsLoading(false);
    }
  };
    var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
  ];
  
  const module = {
    toolbar: toolbarOptions,
  }
  const handleAtrCommentsSave = async () => {
    const formData = form.getFieldsValue();
    const obj = {
      TransactionData: getAtrCommentsTransactionData(formData) || [],
      srvReqID: srvReqID1,
      ModifiedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
      RequestDateTime: "2024-01-10T00:00:00",
      CustSignDateTime: "2024-01-10T00:00:00",
      srvReqRefNo: serviceId
    };
  
  
    try {
      const response = await apiCalls.genericAPI(obj);
      if (response.status===200) {
        setAlertTitle(response?.data?.header);
        setAlertData(response?.data?.message);
        setShowAlert(true);
      }
      
      const val = await apiCalls.getPOSIndividualData(serviceId);
      setFormFieldsData(val?.data);
    } catch (error) {
      console.error('API Error:', error);
    }
  }
  
  

  const handleMiscSave = async () => {
    try {
        const formData = form.getFieldValue();
        const obj = {
            TransactionData: getTransactionData(formData) || [],
            srvReqID: srvReqID1,
            ModifiedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
            RequestDateTime: "2024-01-10T00:00:00",
            CustSignDateTime: "2024-01-10T00:00:00",
            srvReqRefNo: serviceId,
            CallType: 24,
            MiscellingComments : formData.comments
        };

        // First API call
        const response = await apiCalls.genericAPI(obj);
        
        if (response.status===200) {
            setAlertTitle(response?.data?.header);
            setAlertData(response?.data?.message);
            //setShowAlert(true);
            setShowMiscgrid(true);
            // Second API call
            const val = await apiCalls.getPOSIndividualData(serviceId);
            setTransactionData(val?.data);

            // setData1(val?.data?.misSellingResult);
            setData1(val?.data?.misSellingSummary[0]);
            setServiceRequestData(val?.data);
            setmisSellingCalcHistoryData({ misSellCalcHist: val?.data?.misSellCalcHist });
        }
    } catch (error) {
        console.error("Error occurred while saving:", error);
        // Handle error (e.g., show an alert or notification)
    }
};


  const formItemLayout2 = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };


useEffect(() => {
  if (serviceId) {
      getPOSIndividualData();
      handleViewComments();
  }
  if(props?.complaintCopyResponse){
    //setFormFieldsData(props?.complaintCopyResponse);
  }
  if (complaintCopyResponse1) {
    setFormFieldsData(complaintCopyResponse1);
  }
  getCTST();
}, [complaintCopyResponse, complaintCopyResponse1]);

  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, 'YYYYMMDD').format('DD/MM/YYYY');
    return formattedDate;
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
 
  const handleSalesFeedbackSave = async () => {
    // Retrieve form values
    const formData = form.getFieldsValue(); // Use getFieldsValue to get all field values
    
    const obj = {
      srvReqRefNo: serviceId,
      TransactionData: getSalesFeedbackTransactionData(formData) || [],
      srvReqID: srvReqID1, // Ensure srvReqID1 is defined in your context
      ModifiedByRef: loginInfo?.userProfileInfo?.profileObj?.userName, // Ensure loginInfo is defined
      RequestDateTime: "2024-01-10T00:00:00",
      CustSignDateTime: "2024-01-10T00:00:00",
      "CallType": 24,
        Uploads: uploadFiles1 || [],
    };

    try {
      // Make API call
      const response = await apiCalls.genericAPI(obj);
      if (response.status===200) { // Ensure response.status is available in your API response
        setAlertTitle(response?.data?.header);
        setAlertData(response?.data?.message);
        setShowAlert(true);
        // Handle successful response
      }
      
      // Fetch additional data
      const val = await apiCalls.getPOSIndividualData(serviceId); // Ensure serviceId is defined
      setFormFieldsData(val); // Ensure setTransactionData is defined
    } catch (error) {
      console.error('API call failed:', error);
    }
  };

  const getRefundTransactionData = (values) => {
    return [
      { "Status": "Create", "TagName": "IFSC", "TagValue": values.IFSC },
      { "Status": "Create", "TagName": "Account_Holders_Name", "TagValue": values.Account_Holders_Name },
      { "Status": "Create", "TagName": "Bank_Account_Number", "TagValue": values.Bank_Account_Number },
      { "Status": "Create", "TagName": "Re_enter_Account_Number", "TagValue": values.Re_enter_Account_Number },
      { "Status": "Create", "TagName": "Bank", "TagValue": values.Bank },
      { "Status": "Create", "TagName": "Penny_Drop_Result", "TagValue": values.Penny_Drop_Result },
      { "Status": "Create", "TagName": "Branch_Name", "TagValue": values.Branch_Name }
    ];
  };
  

  

  const handleWelcomeCallChange = (checked) => {
    // Update the state with the new value of the switch
    setWelcomeCall(checked);

    // Update the form's field value
    form.setFieldsValue({ welcomeChange: checked });
  };

  const getApproverCommentsTransactionData = (values) => 
    {
      const formattedNextInteractionDate = values.dateOfApproval
              ? dayjs(values.dateOfApproval).format("DD/MM/YYYY")
              : "";
    return [
      {
        "Status": "Create",
        "TagName": "Comp_Approver_Comments",
        "TagValue": values.ApproverComments
      },
      {
        "Status": "Create",
        "TagName": "Comp_Approver_Feedback",
        "TagValue": values.ApproverFeedback
      },
      {
        "Status": "Create",
        "TagName": "Comp_Refer_to_Senior",
        "TagValue": values.RefertoSenior
      },
      {
        "Status": "Create",
        "TagName": "dateOfApproval",
        "TagValue": formattedNextInteractionDate
      },
      
    ];
  };

  function formatDate(dateString) {
    const day = dateString?.slice(6, 8);   // Extract day
    const month = dateString?.slice(4, 6); // Extract month
    const year = dateString?.slice(0, 4);  // Extract year
    return `${day}/${month}/${year}`;     // Format as DD/MM/yyyy
    }


  const handleApproverCommentsSave = async () => {
    // Retrieve form values
    const formData = form.getFieldsValue(); // Use getFieldsValue to get all field values
    
    const obj = {
      srvReqRefNo: serviceId,
      TransactionData: getApproverCommentsTransactionData(formData) || [],
      srvReqID: srvReqID1, // Ensure srvReqID1 is defined in your context
      ModifiedByRef: loginInfo?.userProfileInfo?.profileObj?.userName, // Ensure loginInfo is defined
      RequestDateTime: "2024-01-10T00:00:00",
      CustSignDateTime: "2024-01-10T00:00:00",
      Uploads: uploadFiles || [],
    };

    try {
      // Make API call
      const response = await apiCalls.genericAPI(obj);
      if (response.status===200) { // Ensure response.status is available in your API response
        setAlertTitle(response?.data?.header);
        setAlertData(response?.data?.message);
        setShowAlert(true);
      }
      
      // Fetch additional data
      const val = await apiCalls.getPOSIndividualData(serviceId); // Ensure serviceId is defined
       setFormFieldsData(val); // Ensure setTransactionData is defined
    } catch (error) {
      console.error('API call failed:', error);
    }
  };


  const handleRefundSave = async () => {
    try {
      // Validate and retrieve form values
      await form.validateFields(); // Ensure all fields are validated
      const formData = form.getFieldsValue(); // Get all field values

      const obj = {
        srvReqRefNo: serviceId,
        TransactionData: getRefundTransactionData(formData) || [],
        srvReqID: srvReqID1,
        ModifiedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
        RequestDateTime: new Date().toISOString(),
        CustSignDateTime: new Date().toISOString()
      };

      // Make API call
      const response = await apiCalls.genericAPI(obj);
      if (response.status===200) { // Ensure response.status is available in your API response
        setAlertTitle(response?.data?.header);
        setAlertData(response?.data?.message);
        setShowAlert(true);
      }
      

      // Fetch additional data
      const val = await apiCalls.getPOSIndividualData(serviceId);
      setFormFieldsData(val);

    } catch (error) {
      console.error('API call failed:', error);
    }
  };

  
// const setGrievenceUserData = (val) => {
//   if(val?.data){
//     if(val?.data?.serviceRequestTransectionData){
//       val?.data?.serviceRequestTransectionData?.forEach((ele)=>{
//         if(ele.tagName==='Comp_ATR_comments'){
//          form.setFieldValue(Atrcomments, ele.tagValue)
//         }
//         if(ele.tagName==='Comp_Misselling_Comments'){
//           form.setFieldValue(MissellingCalc, ele.tagValue)
//          }
//          if(ele.tagName==='Comp_General_Comments'){
//           form.setFieldValue(generalComments, ele.tagValue)
//          }
//          if(ele.tagName==='Comp_Sales_Feedback'){
//           form.setFieldValue(SalesFeedback, ele.tagValue)
//          }
//          if(ele.tagName==='Comp_Sales_Comments'){
//           form.setFieldValue(salesComments, ele.tagValue)
//          }
//          if(ele.tagName==='IFSC'){
//           form.setFieldValue(IFSC, ele.tagValue)
//          }
//       })
//   }
// }
// }

const setFormFieldsData = (val) => {
  
  if (val) {
    // Define a mapping of tag names to form field names
    const fieldMapping = {
      'IFSC': 'IFSC',
      'Account_Holders_Name': 'Account_Holders_Name',
      'Bank_Account_Number': 'Bank_Account_Number',
      'Re_enter_Account_Number': 'Re_enter_Account_Number',
      'Bank': 'Bank',
      'Penny_Drop_Result': 'Penny_Drop_Result',
      'Branch_Name': 'Branch_Name',
      'Comp_ATR_comments': 'Atrcomments',
      'Comp_Misselling_Comments': 'MissellingCalc',
      'Comp_General_Comments': 'generalComments',
      'Comp_Sales_Feedback': 'SalesFeedback',
      'Comp_Sales_Comments': 'salesComments',
      'Comp_Approver_Comments': 'ApproverComments',
      'Comp_Approver_Feedback': 'ApproverFeedback',
      'dateOfApproval': 'dateOfApproval',
      'Comp_Refer_to_Senior': 'RefertoSenior',
      'Comp_Observations': 'Observations',
      'Comp_Additional_Remarks': 'Additional_Remarks',
      'Comp_Conclusion': 'Conclusion',
      'Comp_Additional_Space_for_case_remarks': 'Additional_Space_for_case_remarks',
      'Comp_Closure_Remarks': 'Closure_Remarks',
      'Comp_Nature_of_Complaint': 'Nature_of_Complaint',
      'Comp_Type_of_Error': 'Type_of_Error',
      'Comp_Reason_For_Error': 'Reason_For_Error',
      'Comp_Comments': 'Comments',
      'Comp_Root_Cause': 'Root_Cause',
      'Tag_Complaint' : 'Tag_Complaint',
      'Response_Mode' : 'Response_Mode',
      'Is_Complaint_Closed' : 'Is_Complaint_Closed',
      'complaintDecision':'complaintDecision',
      'complaintClosed':'complaintClosed'
      // Add other mappings as needed
    };

    // Initialize an object to hold form field values
    const formValues = {};

    // Iterate over the transaction data and populate the formValues object
    val?.serviceRequestTransectionData?.forEach((ele) => {
      const fieldName = fieldMapping[ele.tagName];
      if(fieldName === 'dateOfApproval'){
        formValues[fieldName] = dayjs(ele.tagValue, 'DD/MM/YYYY');
    }
    else if (fieldName && !formValues[fieldName]) {
      formValues[fieldName] = ele.tagValue;
    }
    });

    // Set the form field values
    form.setFieldsValue(formValues);
  }
};




const uploadProps = {
  name: "file",
  multiple: false,
  fileList,
  customRequest: async ({ file, onSuccess }, label) => {
    let formData = new FormData();
    const ApplicationNo =
      data?.identifiers?.applicationNo;
    formData.append("File", file, `${ApplicationNo}/${file.name}`);

    try {
      const response = await apiCalls.fileUpload(formData);
      if (response?.data) {
        const newDocumentObj = {
          IndexName: "Complaint Letter",
          DocumentName: file?.name,
          UserID: loginInfo?.userProfileInfo?.profileObj?.userName,
          UploadedBy: loginInfo?.userProfileInfo?.profileObj?.name,
          UploadedOn: new Date(),
          DocumentSize: file?.size,
          FileLocation: `/${ApplicationNo}/`,
          BlobFileName: file?.name,
          FileExtnMime: file?.type,
          labelName: label,
          name: file.name,
        };

        // Update uploadFiles state
        setUploadFiles((prevFiles) => [...(prevFiles || []), newDocumentObj]);

        // Call additional setters if needed
        setDocIdProofs(newDocumentObj);

        message.success({
          content: "File uploaded successfully",
          className: "custom-msg",
          duration: 3,
        });

        onSuccess();
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      message.error({
        content: "Something went wrong. Please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  },
};
const uploadProps2 = {
  name: "file2",
  multiple: false,
  fileList,
  customRequest: async ({ file2, onSuccess }, label) => {
    let formData = new FormData();
    const ApplicationNo =data?.identifiers?.applicationNo;
    formData.append("File", file2, `${ApplicationNo}/${file2.name}`);

    try {
      const response = await apiCalls.fileUpload(formData);
      if (response?.data) {
        const newDocumentObj = {
          IndexName: "Complaint Letter",
          DocumentName: file2?.name,
          UserID: loginInfo?.userProfileInfo?.profileObj?.userName,
          UploadedBy: loginInfo?.userProfileInfo?.profileObj?.name,
          UploadedOn: new Date(),
          DocumentSize: file2?.size,
          FileLocation: `/${ApplicationNo}/`,
          BlobFileName: file2?.name,
          FileExtnMime: file2?.type,
          labelName: label,
          name: file2.name,
        };

        // Update uploadFiles1 state
        setUploadFiles1((prevFiles) => [...(prevFiles || []), newDocumentObj]);

        // Call additional setters if needed
        setDocIdProofs(newDocumentObj);

        message.success({
          content: "File uploaded successfully",
          className: "custom-msg",
          duration: 3,
        });

        onSuccess();
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      message.error({
        content: "Something went wrong. Please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  },
};
  

const grievenceUserSave = async () => {
  // Retrieve form values
  
  const formData = form.getFieldsValue(); // Use getFieldsValue to get all field values
  
  const obj = {
    srvReqRefNo : serviceId,
    TransactionData: getGrievenceTransactionData(formData) || [],
    srvReqID: srvReqID1, // Make sure srvReqID1 is defined in your context
    ModifiedByRef: loginInfo?.userProfileInfo?.profileObj?.userName, // Ensure loginInfo is defined
    RequestDateTime: "2024-01-10T00:00:00",
    CustSignDateTime: "2024-01-10T00:00:00"
  };

  try {
    // Make API call
    const response = await apiCalls.genericAPI(obj);
    if (response?.status === 200) { // Ensure response.status is available in your API response
      setAlertTitle(response?.data?.header);
      setAlertData(response?.data?.message);
      setShowAlert(true);
    }
    
    // Fetch additional data
    const val = await apiCalls.getPOSIndividualData(serviceId); // Ensure serviceId is defined
    setFormFieldsData(val?.data);
  } catch (error) {
    console.error('API call failed:', error);
  }
};


const setTransactionData = (obj) => {
  setSrvReqID(obj?.srvReqID);
  if (obj?.serviceRequestTransectionData) {
      obj?.serviceRequestTransectionData.forEach((ele) => {
          switch (ele.tagName) {
              case 'ExceptionhandlingRequiredOutCome':
                  setExceptionhandlingRequiredOutCome(ele.tagValue);
                  break;
              case 'ExceptionhandlingNotRequiredOutCome':
                  setExceptionhandlingNotRequiredOutCome(ele.tagValue);
                  break;
              case 'NotInFavourOfCustomerOutCome':
                  setNotInFavourOfCustomerOutCome(ele.tagValue);
                  break;
              case 'InFavourOfCustomerOutCome':
                  setInFavourOfCustomerOutCome(ele.tagValue);
                  break;
              case 'ExceptionhandlingRequiredPercentage':
                  setExceptionhandlingRequiredPercentage(ele.tagValue);
                  break;
              case 'ExceptionhandlingNotRequiredPercentage':
                  setExceptionhandlingNotRequiredPercentage(ele.tagValue);
                  break;
              case 'InFavourOfCustomerPercentage':
                  setInFavourOfCustomerPercentage(ele.tagValue);
                  break;
              case 'NotInFavourOfCustomerPercentage':
                  setNotInFavourOfCustomerPercentage(ele.tagValue);
                  break;
              case 'ExceptionhandlingRequiredCount':
                  setExceptionhandlingRequiredCount(ele.tagValue);
                  break;
              case 'ExceptionhandlingNotRequiredCount':
                  setExceptionhandlingNotRequiredCount(ele.tagValue);
                  break;
              case 'NotInFavourOfCustomerCount':
                  setNotInFavourOfCustomerCount(ele.tagValue);
                  break;
              case 'InFavourOfCustomerCount':
                  setInFavourOfCustomerCount(ele.tagValue);
                  break;
              case 'DeclineOutComeCountPercentage':
                  setDeclineOutComePercentage(ele.tagValue);
                  break;
              case 'DeclineOutComeCount':
                  setDeclineOutComeCount(ele.tagValue);
                  break;
              case 'DeclineOutCome':
                  setDeclineOutCome(ele.tagValue);
                  break;
              case 'TotalOutcomeCount':
                  setTotalCount(ele.tagValue);
                  break;
              default:
                  break;
          }
      });
  }
};

const getPOSIndividualData = async () => {
  try {
    setIsLoading(true);

    // Step 1: Fetch POS Individual Data
    const posDataResponse = await apiCalls.getPOSIndividualData(serviceId);
    const posData = posDataResponse?.data;
    setTicketStatus(posDataResponse?.data?.currentStatus);
    if (!posData) throw new Error("POS Data not found");

    // Step 2: Update POS-related States
    const srvReqIDFromData = posData?.srvReqID;
    setSrvReqID(srvReqIDFromData);
    setServiceRequestData(posData);
    setTransactionData(posData);
    setCreatedOndate(posData?.CreatedOn);
    setFormFieldsData(posData);
    form.setFieldsValue({ srvReqID: srvReqIDFromData });

    // Step 3: Fetch Free Look Details & Header Parameters Independently
    fetchFreeLookDetails(posData);
    fetchHeaderParameters(posData);
  } catch (error) {
    console.error("Error fetching POS Data:", error);
  } finally {
    setIsLoading(false);
  }
};

// Independent API Call for Free Look Details
const fetchFreeLookDetails = async (posData) => {
  try {
    const policyNo = import.meta.env.VITE_APP_ENVIRONMENT === "PRODUCTION" ? posData.policyNo : "01817159";
    const gcpPolicyResponse = await apiCalls.getFreeLookDetailsApi(policyNo);

    if (gcpPolicyResponse.data.statusCode !== "400") {
      setgcpAPIResponseData(gcpPolicyResponse.data);

  let proposerIncome = Number(gcpAPIResponseData?.response?.clientAttribute?.[0]?.proposerIncome);
  let totalIncome = Number(gcpAPIResponseData?.response?.tds_details?.[0]?.total_premium_paid_at_policy);

  let capacity = proposerIncome / totalIncome;

  if (capacity > 0.3) {
    setPayingCapacity("yes");
  } else {
    setPayingCapacity("no");
  }

      handleValidate(gcpPolicyResponse?.data?.response?.delivery_details?.[0]?.dispatchDeliveryDate);
      
      // Dispatch Delivery Date Check
      const dispatchDeliveryDate = gcpPolicyResponse?.data?.response?.delivery_details?.[0]?.dispatchDeliveryDate;
      let newDate = null;
      if (dispatchDeliveryDate) {
        const date = new Date(dispatchDeliveryDate);
        date.setDate(date.getDate() + 90);
        newDate = date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
      }

      // Compare with CreatedOn Date
      const createdOnDate = posData?.CreatedOn;
      if (createdOnDate) {
        const createdDate = new Date(createdOnDate);
        const limitDate = new Date(newDate);
        setIs90days(createdDate <= limitDate);
      }

      // Set Form Fields
      form.setFieldsValue({
        laincome: gcpPolicyResponse?.data?.response?.clientAttribute?.[0]?.laIncome,
        medflag: gcpPolicyResponse?.data?.response?.policyAttribute?.[0]?.MEDFLAG,
        isitratedup: gcpPolicyResponse?.data?.response?.policyAttribute?.[0]?.isNormalOrRateup,
        npdd: new Date(gcpPolicyResponse?.data?.response?.applicationAttribute?.npdd) > new Date() ? "yes" : "no",
        pivcStatus: gcpPolicyResponse?.data?.response?.policyAttribute?.[0]?.pivcStatus
      });

        if (!proposerIncome || !totalIncome || totalIncome === 0) {
    setPayingCapacity("no");
    return;
  }
    }
  } catch (error) {
    console.error("Error fetching Free Look Details:", error);
  }
};

  const getAgentDetailsByAgentCode = async (agentCode) => {
    try {
      let res = await apiCalls.GetAgentDetails(agentCode);
      //console.log("Agent Details Response:", res);
      if (res.data !== null && res.data !== undefined) {
        setChannelName(res?.data?.Channel);
      }
    } catch (error) {
   console.log("Error fetching agent details:", error);
    }
  };
// Independent API Call for Header Parameters
const fetchHeaderParameters = async (posData) => {
  try {
    const headerResponse = await apiCalls.getHeaderParameters({
      policyNo: posData.policyNo,
      applicationNo: "",
      dob: posData.dob
    });

    if (headerResponse?.data?.responseHeader?.issuccess) {
      setData({ ...headerResponse?.data?.responseBody });
getAgentDetailsByAgentCode(headerResponse?.data?.responseBody?.salesDetails?.agentCode);
      // Fetch Client Enquiry Separately
      fetchClientEnquiry(headerResponse?.data?.responseBody);
    } else {
      message.error({
        content: headerResponse?.data?.responseBody?.errormessage || "Something went wrong, please try again!",
        className: "custom-msg",
        duration: 2
      });
    }
  } catch (error) {
    console.error("Error fetching Header Parameters:", error);
  }
};

// Independent API Call for Client Enquiry
const fetchClientEnquiry = async (headerData) => {
  try {
    const clientNumber = {
      clientNumber:
        headerData?.identifiers?.la_ClientID === headerData?.identifiers?.po_ClientID
          ? headerData?.identifiers?.la_ClientID
          : headerData?.identifiers?.po_ClientID
    };

    const clientEnquiryResponse = await apiCalls.getClientEnquiry(clientNumber, loginInfo?.userProfileInfo?.profileObj?.allRoles?.[0]?.employeeID);

    if (clientEnquiryResponse?.data?.responseHeader?.issuccess) {
      setClientEnquiryResponse(clientEnquiryResponse?.data?.responseBody);
      
      // Extract DOB and Convert Format
      const dob = clientEnquiryResponse?.data?.responseBody?.clTdob;
      const formattedDob = convertDate1(dob);

      if (formattedDob) {
        // Calculate Age and Senior Citizen Status
        const age = calculateAge(formattedDob);
        const isSeniorCitizen = age >= 58;
        
        setSeniorCitizen(isSeniorCitizen);
        form.setFieldsValue({
          isSeniorCitizenLA: isSeniorCitizen ? "YES" : "NO",
          isSeniorCitizenProposer: isSeniorCitizen ? "YES" : "NO",
          age: age,
          poage: age,
          dob: formattedDob
        });
      }
    }
  } catch (error) {
    console.error("Error fetching Client Enquiry:", error);
  }
};

// Helper Function: Convert DOB to YYYY-MM-DD Format
const convertDate1 = (dobStr) => {
  if (!dobStr || dobStr.length !== 8) return null;
  return `${dobStr.substring(0, 4)}-${dobStr.substring(4, 6)}-${dobStr.substring(6, 8)}`;
};

// Helper Function: Calculate Age
const calculateAge = (dob) => {
  const dobDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - dobDate.getFullYear();

  if (today.getMonth() < dobDate.getMonth() || 
      (today.getMonth() === dobDate.getMonth() && today.getDate() < dobDate.getDate())) {
    age--;
  }

  return age;
};

  const handleBeforeInput = (e) => {
    // Prevent typing if character limit is reached
    if (comments.length >= 1000 && window.getSelection().toString().length === 0) {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const remaining = 1000 - comments.length;

    if (remaining <= 0) {
      e.preventDefault();
    } else if (paste.length > remaining) {
      e.preventDefault();
      setComments(prev => prev + paste.slice(0, remaining));
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 1000) {
      setComments(value);
    } else {
      setComments(value.slice(0, 1000)); // Trim just in case
    }
  };


  return (
    <>
      <Spin spinning={isLoading} >
        {serviceRequestData && <>
        <div className='complaints-section'>
          <div >
            <br />
            {/* <Row className='sec-dark' gutter={16} style={{ width: '100%', margin: '0px 16px', padding: '10px' }}>
              <Col style={{ width: '20%' }}>
                <div className='boxx'>
                  <div>
                    <p ><b> Policy No</b></p>
                    <p >{data?.identifiers?.policyNo}</p>
                  </div>
                  <div >
                    <p ><b> App No</b></p>
                    <p >{data?.identifiers?.applicationNo}</p>
                  </div>
                  <div >
                    <p ><b> LA Name</b></p>
                    <p >{data?.identifiers?.la_Name}</p>
                  </div>
                  <div >
                    <p ><b> PO Name</b></p>
                    <p >Graduate</p>
                  </div>
                </div>
              </Col>
              <Col style={{ width: '20%' }}>
                <div className='boxx'>
                  <div >
                    <p ><b> Customer Type</b></p>
                    <p >{data?.planAndStatus?.customerType}</p>
                  </div>
                  <div >
                    <p ><b> Plan Name(ULIP/Non ULIP)</b></p>
                    <p >{data?.planAndStatus?.planName}</p>
                  </div>
                  <div >
                    <p ><b> Policy  Status</b></p>
                    <p >{data?.planAndStatus?.policyStatus}</p>
                  </div>
                  <div >
                    <p ><b> Premium Status</b></p>
                    <p >{data?.planAndStatus?.premiumStatus}</p>
                  </div>
                </div>
              </Col>
              <Col style={{ width: '20%' }}>
                <div className='boxx'>
                  <div >
                    <p ><b> Sum Assured</b></p>
                    <p >{data?.saDetails?.sumAssured}</p>
                  </div>
                  <div >
                    <p ><b> PT </b> </p>
                    <p >{data?.saDetails?.pt}</p>
                  </div>
                  <div >
                    <p ><b> RCD</b></p>
                    <p >{data?.saDetails?.rcd}</p>
                  </div>
                  <div >
                    <p ><b> Assignment</b></p>
                    <p >{data?.saDetails?.assignment}</p>
                  </div>
                </div>
              </Col>
              <Col style={{ width: '20%' }}>
                <div className='boxx'>
                  <div >
                    <p ><b> Model Premium Amount</b></p>
                    <p >{data?.premiumDetails?.modelPremiumAmount}</p>
                  </div>
                  <div >
                    <p ><b>PPT </b> </p>
                    <p >{data?.premiumDetails?.ppt}</p>
                  </div>
                  <div >
                    <p ><b> PTD</b></p>
                    <p >{data?.premiumDetails?.ptd}</p>
                  </div>
                  <div >
                    <p ><b> Mode</b></p>
                    <p >{data?.premiumDetails?.mode}</p>
                  </div>
                </div>
              </Col>

              <Col style={{ width: '20%' }}>
                <div className='boxx'>
                  <div >
                    <p ><b> Branch</b></p>
                    <p >{data?.salesDetails?.branch}</p>
                  </div>
                  <div >
                    <p ><b>Channel </b> </p>
                    <p >{data?.salesDetails?.channel}</p>
                  </div>
                  <div >
                    <p ><b> Agent Name</b></p>
                    <p >{data?.salesDetails?.agentName}</p>
                  </div>
                  <div >
                    <p ><b> Orphan Flag</b></p>
                    <p >{data?.salesDetails?.orphanFlag
                    }</p>
                  </div>
                </div>
              </Col>
            </Row> */}
            <CustomerDetails setShowComplainUser={setShowComplainUser} serviceId={serviceId} isComplaintsUser={true}  serviceRequestData = {serviceRequestData} setServiceRequestData={setServiceRequestData} transactionDocData={transactionDocData} setTransactionDocData={setTransactionDocData} policyDetails = {data} />

          </div>


          {/* <div className='tabs-begin' style={{ width: '77%', float: 'left', margin: '16px 16px' }}> */}


          {
            showComplainUser && 
          <Tabs defaultActiveKey="1" onChange={handleTabChange}  tabPosition="left" type="card">
            <TabPane
              tab={
                <span>

                  View Customer Complaint
                </span>
              }
              key="1"
            >
              
              <ViewCustomerComplaintTab serviceRequestData={serviceRequestData}  setTransactionDocData={setTransactionDocData} setMiscellingCalculatorTabHide = {setMiscellingCalculatorTabHide} setComplaintCopyResponse = {setComplaintCopyResponse} />
            </TabPane>
            <TabPane
              tab="Customer Interaction"
              key="2"
            >
              <CustomerInterationTab serviceRequestData={serviceRequestData} data={data}/>
            </TabPane>
            <TabPane
              tab="Sales Interaction"
              key="3"
            >
              <SalesInteractionTab serviceRequestData={serviceRequestData}/>
            </TabPane>
      
            <TabPane
              tab={
                <span>
                  ATR
                </span>
              }
              key="13"
            >
              <div className='tabs-begin' style={{ width: '77%', float: 'left', margin: '16px 16px' }}>
                <div style={{ width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="reuirement" style={{ width: "100%" }}>

                      <Collapse expandIconPosition="end" defaultActiveKey={['1']} onChange={callback} accordion>
                      <Panel header="Personal Information" key="1">
                      <Row gutter={16} style={{ width: '100%', padding: '10px' }}>
                        {/* LA Section */}
                        <Col style={{ width: '100%' }}>
                          <div className="atrbox">
                            <Row gutter={16}>
                              <Col style={{ width: '33.33%' }}>
                                 <p className="reduced-gap"><b> Name Of LA</b></p>
                                  <Input value={data?.identifiers?.la_Name} disabled />
                              </Col>
                              <Col style={{ width: '33.33%' }}>
                                <p className="reduced-gap"><b> DOB</b></p>
                                  <Input value={clientEnquiryResponse.clTdob ? formatDate(clientEnquiryResponse.clTdob) : "NA"} disabled />
                              </Col>
                              <Col style={{ width: '33.33%' }}>
                                 <p className="reduced-gap"><b> Contact Details</b></p>
                                  <Input value={clientEnquiryResponse.rmblphone} disabled />
                              </Col>
                            </Row>
                            <Row gutter={16}>
                              <Col style={{ width: '33.33%' }}>
                                 <p className="reduced-gap"><b> Income of LA</b></p>
                                  <Input value={gcpAPIResponseData?.response?.clientAttribute[0]?.laIncome} disabled />
                              </Col>
                              <Col style={{ width: '33.33%' }}>
                                <p className="reduced-gap"><b> Occupation of LA</b></p>
                                  <Input value={gcpAPIResponseData?.response?.clientAttribute[0]?.laOccupation} disabled />
                              </Col>
                              <Col style={{ width: '33.33%' }}>
                                <p className="reduced-gap"><b> City Name</b></p>
                                  <Input value={clientEnquiryResponse?.cltaddR04} disabled />
                              </Col>
                              {/* <Col style={{ width: '33.33%' }}>
                                 <p ><b> Name Of Proposer</b></p>
                                  <Input value={data?.identifiers?.po_Name} disabled />
                              </Col> */}
                            </Row>
                          </div>
                        </Col>

                        {/* PO Section */}
                        <Col style={{ width: '100%' }}>
                          <div className="atrbox">
                            <Row gutter={16}>
                            <Col style={{ width: '33.33%' }}>
                                 <p className="reduced-gap"><b> Name Of Proposer</b></p>
                                  <Input value={data?.identifiers?.po_Name} disabled />
                              </Col>
                              <Col style={{ width: '33.33%' }}>
                                <p className="reduced-gap"><b> DOB</b></p>
                                  <Input value={clientEnquiryResponse.clTdob ? formatDate(clientEnquiryResponse.clTdob) : "NA"} disabled />
                              </Col>
                              <Col style={{ width: '33.33%' }}>
                                <p className="reduced-gap"><b> Contact Details</b></p>
                                  <Input value={clientEnquiryResponse.rmblphone} disabled />  
                              </Col>
                              <Col style={{ width: '33.33%' }}>
                               <p className="reduced-gap"><b> Income of Proposer</b></p>
                                  <Input value={gcpAPIResponseData?.response?.clientAttribute[0]?.proposerIncome} disabled />
                              </Col>
                              <Col style={{ width: '33.33%' }}>
                                <p className="reduced-gap"><b> Occupation of Proposer</b></p>
                                  <Input value={gcpAPIResponseData?.response?.clientAttribute[0]?.proposerOccupation}disabled /> 
                              </Col>
                              <Col style={{ width: '33.33%' }}>
                                <p className="reduced-gap"><b> City Name</b></p>
                                  <Input value={clientEnquiryResponse?.cltaddR04} disabled />
                              </Col>
                            </Row>
                            <Row gutter={16}>
                              {/* <Col style={{ width: '33.33%' }}>
                                <p ><b> Occupation of Proposer</b></p>
                                  <Input value={gcpAPIResponseData?.response?.clientAttribute[0]?.proposerOccupation}disabled /> 
                              </Col> */}
                              <Col style={{ width: '33.33%' }}>
                                 <p className="reduced-gap"><b> Name Of Payor</b></p>
                                  <Input value={data?.identifiers?.po_Name}disabled /> 
                              </Col>
                              <Col style={{ width: '33.33%' }}>
                               <p className="reduced-gap"><b> DOB</b></p>
                                  <Input value={clientEnquiryResponse.clTdob ? formatDate(clientEnquiryResponse.clTdob) : "NA"}disabled /> 
                              </Col>
                              <Col style={{ width: '33.33%' }}>
                                 <p className="reduced-gap"><b> Contact Details</b></p>
                                  <Input value={clientEnquiryResponse.rmblphone}disabled /> 
                              </Col>
                            </Row>
                          </div>
                        </Col>

                        {/* Payor Section */}
                        <Col style={{ width: '100%' }}>
                          <div className="atrbox">
                            <Row gutter={16}>
                              {/* <Col style={{ width: '33.33%' }}>
                                 <p ><b> Contact Details</b></p>
                                  <Input value={clientEnquiryResponse.rmblphone}disabled /> 
                              </Col> */}
                              <Col style={{ width: '33.33%' }}>
                               <p className="reduced-gap"><b> Income of Payor</b></p>
                                  <Input value={gcpAPIResponseData?.response?.clientAttribute[0]?.payorIncome}disabled /> 
                              </Col>
                              <Col style={{ width: '33.33%' }}>
                                 <p className="reduced-gap"><b> Occupation of Payor</b></p>
                                  <Input value={gcpAPIResponseData?.response?.clientAttribute[0]?.payorOccupation}disabled /> 
                                  </Col>

                                  <Col style={{ width: '33.33%' }}>
                                 <p className="reduced-gap"><b> City Name</b></p>
                                  <Input value={clientEnquiryResponse?.cltaddR04}disabled /> 
                                  </Col>
                            </Row>
                          </div>
                        </Col>

                        <Col style={{ width: '100%' }}>
                          <div className="atrbox">
                            <Row gutter={16}>
                              {/* <Col style={{ width: '33.33%' }}>
                                 <p ><b> Contact Details</b></p>
                                  <Input value={clientEnquiryResponse.rmblphone}disabled /> 
                              </Col> */}
                              <Col style={{ width: '33.33%' }}>
                               <p className="reduced-gap"><b> Total Premium Paid 
                               All Policies</b></p>
                                  <Input value={gcpAPIResponseData?.response?.tds_details[0]?.total_premium_paid_at_policy}disabled /> 
                              </Col>
                             
                            </Row>
                          </div>
                        </Col>
                        
                      </Row>
                    </Panel>
                    <Panel header="Product Related Information" key="2">
                    <Row gutter={16} style={{ width: '100%', padding: '10px' }}>
                      {/* First Row */}
                      <Row gutter={16} style={{ width: '100%' }}>
                        <Col style={{ width: '33.33%' }}>
                          <p className="reduced-gap"><b> Policy Type</b></p>
                          <Input value={data?.planAndStatus?.policyType}disabled /> 
                        </Col>
                        <Col style={{ width: '33.33%' }}>
                            <p className="reduced-gap"><b> Frequency</b></p>
                            <Input value={billFreq[data?.premiumDetails?.billFreq]}disabled /> 
                        </Col>
                        <Col style={{ width: '33.33%' }}>
                          <p className="reduced-gap"><b> Channel</b></p>
                           <Input value={channelName}disabled />
                        </Col>
                      </Row>

                      {/* Third Row */}
                      <Row gutter={16} style={{ width: '100%' }}>
                        <Col style={{ width: '33.33%' }}>
                           <p className="reduced-gap"><b> SA</b></p>
                           <Input value={data?.saDetails?.sumAssured}disabled />
                        </Col>
                        <Col style={{ width: '33.33%' }}>
                         <p className="reduced-gap"><b> NPDD</b></p>
                         <Input value={formatDate(gcpAPIResponseData?.response?.applicationAttribute[0]?.npdd)}disabled />
                        </Col>
                        <Col style={{ width: '33.33%' }}>
                          <p className="reduced-gap"><b> Advisor Status</b></p>
                          <Input value={formatDate(gcpAPIResponseData?.response?.applicationAttribute[0]?.npdd)}disabled />
                        </Col>
                      </Row>
                      <Row gutter={16} style={{ width: '100%' }}>
                        <Col style={{ width: '33.33%' }}>
                           <p className="reduced-gap"><b> Policy Premium</b></p>
                            <Input value={data?.premiumDetails?.modelPremiumAmount}disabled />
                        </Col>
                        <Col style={{ width: '33.33%' }}>
                           <p className="reduced-gap"><b> Date of Isssuance</b></p>
                           <Input value={formatDate(data?.saDetails?.rcd)}disabled />
                        </Col>
                        <Col style={{ width: '33.33%' }}>
                          <p className="reduced-gap"><b> Agent Name</b></p>
                          <Input value={data?.salesDetails?.agentName}disabled />
                        </Col>
                      </Row>
                      {/* Fourth Row */}
                      <Row gutter={16} style={{ width: '100%' }}>
                        <Col style={{ width: '33.33%' }}>
                          <p className="reduced-gap"><b> Normal / Rated Up</b></p>
                         <Input value={gcpAPIResponseData?.response?.policyAttribute[0]?.isNormalOrRateup}disabled />
                        </Col>
                        <Col style={{ width: '33.33%' }}>
                           <p className="reduced-gap"><b> Policy status</b></p>
                          <Input value={data?.planAndStatus?.policyStatus}disabled />
                        </Col>
                        <Col style={{ width: '33.33%' }}>
                          <p className="reduced-gap"><b> Auto Pay</b></p>
                          <Input value ={''}disabled />
                        </Col>
                      </Row>
                    </Row>
                  </Panel>
                  <Panel header="Issuance Related Information" key="3">
                          <Row gutter={16} style={{ width: '100%', padding: '10px' }}>
                            <Row gutter={16} style={{ width: '100%' }}>
                              <Col style={{ width: '33.33%' }}>
                                <p className="reduced-gap"><b> Proposal Sign Date</b></p>
                                <Input value ={formatDate(gcpAPIResponseData?.response?.applicationAttribute[0]?.proposalSignDate)}disabled />
                              </Col>
                              <Col style={{ width: '33.33%' }}>
                                <p className="reduced-gap"><b> Medical Tests conducted</b></p>
                                <Input value ={gcpAPIResponseData?.response?.policyAttribute[0]?.MEDFLAG}disabled />
                              </Col>
                              <Col style={{ width: '33.33%' }}>
                                <p className="reduced-gap"><b> Income Proof</b></p>
                            <Input value ={gcpAPIResponseData?.response?.policyAttribute[0]?.incomeProofSubmitted}disabled />
                              </Col>
                            </Row>
                            <Row gutter={16} style={{ width: '100%' }}>
                              <Col style={{ width: '33.33%' }}>
                                <p className="reduced-gap"><b> Login Location</b></p>
                            <Input value ={gcpAPIResponseData?.response?.clientAttribute[0]?.loginLocation}disabled />
                              </Col>
                              <Col style={{ width: '33.33%' }}>
                                <p className="reduced-gap"><b> Age proof </b></p>
                            <Input value ={gcpAPIResponseData?.response?.clientAttribute[0]?.ageProof}disabled />
                              </Col>
                              <Col style={{ width: '33.33%' }}>
                                <p className="reduced-gap"><b> PIVC</b></p>
                            <Input value ={gcpAPIResponseData?.response?.policyAttribute[0]?.pivcStatus}disabled />
                              </Col>
                            </Row>
                            <Row gutter={16} style={{ width: '100%' }}>
                              <Col style={{ width: '33.33%' }}>
                              <p className="reduced-gap"><b> Proposal Logged Date</b></p>
                            <Input value ={formatDate(gcpAPIResponseData?.response?.applicationAttribute[0]?.proposalLoggedDate)}disabled />
                              </Col>
                             <Col style={{ width: '33.33%' }}>
  <p className="reduced-gap"><b>Welcome calling done</b></p>
  <Input
    value={
      (() => {
        try {
          let raw = gcpAPIResponseData?.response?.applicationAttribute[0]?.welcomeCallDisposition;
          let fixed = raw?.replace(/{/g, '[').replace(/}/g, ']');
          let arr = JSON.parse(fixed);
          let nonEmpty = arr.filter(x => x?.trim());
          return nonEmpty[nonEmpty.length - 1] || '';
        } catch (e) {
          return '';
        }
      })()
    }
    disabled
  />
</Col>

                              <Col style={{ width: '33.33%' }}>
                                <p className="reduced-gap"><b> Any Questionnaire submitted</b></p>
                            <Input value ={"NA"}disabled />
                              </Col>
                            </Row>
                            <Row gutter={16} style={{ width: '100%' }}>
                              <Col style={{ width: '33.33%' }}>
                                <p className="reduced-gap"><b> Mode of Premium</b></p>
                            <Input value ={billFreq[data?.premiumDetails?.billFreq]}disabled />
                              </Col>
                              <Col style={{ width: '33.33%' }}>
                                <p className="reduced-gap"><b>Address Proof </b></p>
                            <Input value ={gcpAPIResponseData?.response?.clientAttribute[0]?.addressProof}disabled />
                              </Col>
                              <Col style={{ width: '33.33%' }}>
                                <p className="reduced-gap"><b> F2F Done</b></p>
                            <Input value ={gcpAPIResponseData?.response?.clientAttribute[0]?.f2f}disabled />
                              </Col>
                            </Row>
                          </Row>
                        </Panel>

                        <Panel header="Dispatch Related Information" key="4">
                        <Row gutter={16} style={{ width: '100%', padding: '10px' }}>
                          <Row gutter={16} style={{ width: '100%' }}>
                            <Col style={{ width: '33.33%' }}>
                              <p className="reduced-gap"><b> Date of Dispatch</b></p>
                          <Input value = {formatDate(gcpAPIResponseData?.response?.dispatch_details[0]?.dispatchDeliveryDate)} disabled />
                            </Col>
                      <Col style={{ width: "33.33%" }}>
                      <p className="reduced-gap">
                        <b>Within FLC Window</b>
                      </p>
                      <Input
                        name="WithinFLCWindow"
                        value={isflc}
                        disabled
                      />
                    </Col>
                            <Col style={{ width: '33.33%' }}>
                              <p className="reduced-gap"><b> Delivery Date</b></p>
                          <Input value ={formatDate(gcpAPIResponseData?.response?.delivery_details[0]?.dispatchDeliveryDate)}disabled />
                            </Col>
                            <Col style={{ width: '33.33%' }}>
                              <p className="reduced-gap"><b> Is  customer related to Employee / Agent </b></p>
                          <Input value ={'NA'}disabled />
                            </Col>
                          </Row>

                          <Row gutter={16} style={{ width: '100%' }}>
                          <Col style={{ width: '33.33%' }}>
                              <p className="reduced-gap"><b> Mode Of Dispatch</b></p>
                          <Input value ={gcpAPIResponseData?.response?.dispatch_details[0]?.dispatchMode}disabled />
                            </Col>
                            <Col style={{ width: '33.33%' }}>
                              <p className="reduced-gap"><b> Any endorsements done </b></p>
                          <Input value ={'NA'}disabled />
                            </Col>
                            <Col style={{ width: '33.33%' }}>
                              <p className="reduced-gap"><b>Delivery Status</b></p>
                          <Input value ={gcpAPIResponseData?.response?.delivery_details[0]?.dispatchStatus}disabled />
                            </Col>
                          </Row>

                          <Row gutter={16} style={{ width: '100%' }}>
                            <Col style={{ width: '33.33%' }}>
                              <p className="reduced-gap"><b>AWB No. </b></p>
                          <Input value ={gcpAPIResponseData?.response?.delivery_details[0]?.airwayBillNo}disabled />
                            </Col>
                          </Row>
                        </Row>
                      </Panel>
                      </Collapse>


                    </div>
                  </div>
                </div>
                <Form form={form}>
                  <div style={{ width: '100%' }} className='mt-3'>
                  <Form.Item label="Comments" name="Comments" wrapperCol={{ span: 18 }} labelCol={{ span: 6 }}>
                    <TextArea
      placeholder="Comments"
      value={comments}
      onChange={handleChange}
      onBeforeInput={handleBeforeInput}
      onPaste={handlePaste}
      rows={3}
      showCount
    />
                  </Form.Item>
                  </div>
                </Form>
                <div className="contact-details-btn" style={{ marginTop: '16px' }}>
                  <Button type="primary" className="primary-btn mt-4 me-3" htmlType="submit" 
                  onClick={handleAtrCommentsSave} 
                  >
                    Save
                  </Button>
                  <Button type="primary" className="primary-btn mt-4 me-3" htmlType="submit"
                  onClick={handleDownloadPDF}
                  //disabled = {loginInfo?.userProfileInfo?.profileObj?.role === 23}
                   >
                                  {/* <DownloadOutlined /> */}
                                   Download PDF
                                </Button>
                </div>
              </div>
              {/* <div style={{ width: '17%', float: 'left', margin: '16px 0px' }}>

                <Widgets />


              </div> */}
            </TabPane>
            {
            miscellingHideShow && (
            <TabPane
              tab={
                <span>
                  Misselling Calculator
                </span>
              }
              key="4"
            >
    <div className='tabs-begin' style={{ width: '77%', float: 'left', margin: '16px 16px' }}>
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <Switch 
          checked={isEditable} 
          onChange={handleEditToggle} 
          checkedChildren="Edit Mode" 
          unCheckedChildren="View Mode" 
        />
      </div>
      <Collapse expandIconPosition="end" accordion>
        <div style={{ padding: '10px', width: '100%', height: '430px', overflow: 'auto' }}>
          <Form form={form} layout="vertical">
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <div style={{ width: '50%' }}>
                <Form.Item label="LA age" name="age" extra={isSeniorCitizen ? <div style={{ color: 'green' }}>Senior Citizen</div> : ''}>
                  <Input type="text" placeholder="LA age" disabled={!isEditable} />
                </Form.Item>
              </div>
              <div style={{ width: '50%' }}>
              <Form.Item label="Is the LA Senior Citizen" name="isSeniorCitizenLA">
                <Input type="text" placeholder="Is the LA Senior Citizen" disabled={!isEditable} />
              </Form.Item>
            </div>
              <div style={{ width: '50%' }}>
                <Form.Item label="Proposer Age" name='poage'>
                  <Input type="text" placeholder="Proposer Age" disabled={!isEditable} />
                </Form.Item>
              </div>
              <div style={{ width: '50%' }}>
            <Form.Item label="Is the Proposer SENIOR citizen" name="isSeniorCitizenProposer">
              <Input type="text" placeholder="Is the Proposer SENIOR citizen" disabled={!isEditable} />
            </Form.Item>
          </div>
              
              <div style={{ width: '50%' }}>
                <Form.Item label="Payer age" name='poage'>
                  <Input type="text" placeholder="Payer age" disabled={!isEditable} />
                </Form.Item>
              </div>
              <div style={{ width: '50%' }}>
            <Form.Item label="Is the Payer SENIOR citizen" name="isSeniorCitizenProposer">
              <Input type="text" placeholder="Is the Proposer SENIOR citizen" disabled={!isEditable} />
            </Form.Item>
          </div>
              
              <div style={{ width: '50%' }}>
                <Form.Item label="Income">
                  <Input type="text" placeholder="Income" value={gcpAPIResponseData?.response?.clientAttribute[0]?.proposerIncome}disabled={!isEditable} />
                </Form.Item>
              </div>
              <div style={{ width: '50%' }}>
  <Form.Item label="Paying Capacity >= 30%">
    <Input
      type="text"
      placeholder="Paying Capacity >= 30%"
      value={payingCapacity} // ← use the computed state here
      disabled={!isEditable}
      readOnly
    />
  </Form.Item>
</div>

              <div style={{ width: '50%' }}>
                <Form.Item label="Occupation of Payor">
                  <Input type="text" value={gcpAPIResponseData?.response?.clientAttribute[0]?.proposerOccupation}placeholder="Occupation of Payor" disabled />
                </Form.Item>
              </div>
              <div style={{ width: '50%' }}>
                <Form.Item label="" 
                // name="isitratedup"
                >
                  {/* <Input type="" /> */}
                </Form.Item>
              </div>
              <div style={{ width: '50%' }}>
                <Form.Item label="Is it Rated up" 
                // name="isitratedup"
                >
                  <Input type="text" value={gcpAPIResponseData?.response?.policyAttribute[0]?.isNormalOrRateup}placeholder="Is it Rated up" disabled={!isEditable} />
                </Form.Item>
              </div>
              <div style={{ width: '50%' }}>
              <Form.Item 
                label="Signature matching on the rate-up consent form"
                name='Signaturematchingontherate'
              >
                <Select
                  placeholder="Signature matching on the rate-up consent form"
                  disabled={!isEditable}
                  onChange={handleSignatureChangeRate}
                  style={{ width: '100%' }}
                >
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                  <Option value="NA">Not Available</Option>
                </Select>
              </Form.Item>
            </div>
              
              <div style={{ width: '50%' }}>
                <Form.Item label="Fake Letter issued to customer /Call recording" name='fakeLetter'>
                  <Select placeholder="Fake Letter issued to customer /Call recording" value={fakeLetter} onChange={handleFakeLetterChange} disabled={!isEditable}>
                    <Option value="yes">Yes</Option>
                    <Option value="no">No</Option>
                  </Select>
                </Form.Item>
              </div>
              <div style={{ width: '50%' }}>
              <Form.Item 
                label="Letter issued on GC head with false promises"
                name='LetterissuedonFGletterheadwithfalsepromises'
              >
                <Select
                  placeholder="Letter issued on GC head with false promises"
                  value={FGLetter}
                  onChange={handleLetterIssuedonFGLetterChange}
                  style={{ width: '100%' }}
                  disabled={!isEditable}
                >
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                </Select>
              </Form.Item>
            </div>
              <div style={{ width: '50%' }}>
  <Form.Item label="PLVC done correctly">
    <Switch 
      checkedChildren="Yes" 
      unCheckedChildren="No" 
      defaultChecked={false} 
      disabled={!isEditable}
    />
  </Form.Item>
</div>

<div style={{ width: '50%' }}>
  <Form.Item
    label="Welcome calling"
  >
    <Switch
checkedChildren="Yes" 
unCheckedChildren="No" 
defaultChecked={false}
disabled={!isEditable} 
    />
  </Form.Item>
</div>

<div style={{ width: '50%' }}>
  <Form.Item 
    label="Variance in Login location and customer's address"
    name='loginLocation'
  >
    <Select 
      placeholder="Variance in Login location and customer's address" 
      value={loginLocation} 
      onChange={handleloginLocationChange}
      style={{ width: '100%' }} 
      disabled={!isEditable}
    >
      <Option value="yes">Yes</Option>
      <Option value="no">No</Option>
    </Select>
  </Form.Item>
</div>

<div style={{ width: '50%' }}>
  <Form.Item 
    label="Variance in Signature on proposal form/CDF"
    name='signatureonProposal'
  >
    <Select 
      placeholder="Variance in Signature on proposal form/CDF" 
      value={signatureonProposal} 
      onChange={handlesignatureonProposalChange}
      style={{ width: '100%' }}
      disabled={!isEditable} 
    >
      <Option value="yes">Yes</Option>
      <Option value="no">No</Option>
    </Select>
  </Form.Item>
</div>

<div style={{ width: '50%' }}>
  <Form.Item label="PIVC/Welcome call- Any negative observations" name='welcomeCallChange'>
    <Select 
      placeholder="PIVC/Welcome call- Any negative observations" 
      value={welcomeCall} 
      onChange={handlewelcomeCallChange}
      disabled={!isEditable}
    >
      <Option value="yes">Yes</Option>
      <Option value="no">No</Option>
    </Select>
  </Form.Item>
</div>

<div style={{ width: '50%' }}>
  <Form.Item 
    label="Policy Delivery Done status"
  >
    <Switch 
      checked={deliveryDone} 
      onChange={handlePolicyDeliveryDoneStatus}
      checkedChildren="Done"
      unCheckedChildren="Not Done"
      disabled={!isEditable}
    />
  </Form.Item>
</div>

<div style={{ width: '50%' }}>
  <Form.Item label="Fresh complaint" name='freshComplaint'>
    <Select 
      placeholder="Fresh complaint"
      value={freshComplaint} 
      onChange={handlefreshComplaintChange}
      disabled={!isEditable}
    >
      <Option value="yes">Yes</Option>
      <Option value="no">No</Option>
    </Select>
  </Form.Item>
</div>

<div style={{ width: '50%' }}>
  <Form.Item label="Multiple policies" name='multiplePolicies'>
    <Select 
      placeholder="Multiple policies"
      value={multiplePolicies} 
      onChange={handlemultiplePoliciesChange}
      disabled={!isEditable}
    >
      <Option value="yes">Yes</Option>
      <Option value="no">No</Option>
    </Select>
  </Form.Item>
</div>
<div style={{ width: '50%' }}>
  <Form.Item 
    label="Customer approached just 90 days beyond FLC" name='daysbeyondFLC'
  >
    <Input 
      type="text" 
      value={is90days ? "Yes" : "No"}  // Convert boolean to Yes/No
      placeholder="Customer approached just 90 days beyond FLC" 
      disabled={!isEditable} 
    />
  </Form.Item>
</div>



<div style={{ width: '50%' }}>
  <Form.Item label="Renewal premium paid Yes/No" name='npdd'>
    <Select 
      placeholder="Renewal premium paid Yes/No"
      value={renewalPremiumPaid} 
      onChange={handlerenewalPremiumPaidChange}
      disabled={!isEditable}
    >
      <Option value="yes">Yes</Option>
      <Option value="no">No</Option>
      <Option value="NA">Not Available</Option>
    </Select>
  </Form.Item>
</div>

<div style={{ width: '50%' }}>
  <Form.Item 
    label="Medical Tests conducted Yes/No" 
    name="medflag"
    initialValue={gcpAPIResponseData?.response?.policyAttribute[0]?.MEDFLAG}
  >
    <Select 
      placeholder="Medical Tests conducted Yes/No"
      value={medicalTestsConducted} 
      onChange={handlemedicalTestsConductedChange}
      disabled={!isEditable}
    >
      <Option value="yes">Yes</Option>
      <Option value="no">No</Option>
      <Option value="NA">Not Available</Option>
    </Select>
  </Form.Item>
</div>

<div style={{ width: '50%' }}>
  <Form.Item 
    label="Renewal Call" 
    name='renewalCallPositive'
  >
    <Select 
      placeholder="Renewal Call"
      value={renewalCallPositive} 
      onChange={handlerenewalCallPositiveChange}
      disabled={!isEditable}
    >
      <Option value="Positive">Positive</Option>
      <Option value="Negative">Negative</Option>
      <Option value="NA">Not Available</Option>
    </Select>
  </Form.Item>
</div>
{/* <div style={{ width: '50%' }}>
  <Form.Item label="Is the LA Senior Citizen" name="isSeniorCitizenLA">
    <Input type="text" placeholder="Is the LA Senior Citizen" disabled={!isEditable} />
  </Form.Item>
</div> */}

{/* <div style={{ width: '50%' }}>
  <Form.Item label="Is the Proposer SENIOR citizen" name="isSeniorCitizenProposer">
    <Input type="text" placeholder="Is the Proposer SENIOR citizen" disabled={!isEditable} />
  </Form.Item>
</div> */}
{/* <div style={{ width: '50%' }}>
  <Form.Item label="Is the LA Senior Citizen" initialValue={isSeniorCitizen ? "YES" : "NA"}>
    <Input type="text" placeholder="Is the LA Senior Citizen" disabled={!isEditable} />
  </Form.Item>
</div>

<div style={{ width: '50%' }}>
  <Form.Item label="Is the Proposer SENIOR citizen" initialValue={isSeniorCitizen ? "YES" : "NA"}>
    <Input type="text" placeholder="Is the Proposer SENIOR citizen" disabled={!isEditable} />
  </Form.Item>
</div> */}

{/* <div style={{ width: '50%' }}>
  <Form.Item label="Paying Capacity > = 30%">
    <Input type="text" placeholder="Paying Capacity > = 30%" value ={gcpAPIResponseData?.response?.clientAttribute[0]?.proposerIncome}disabled={!isEditable} />
  </Form.Item>
</div> */}

{/* <div style={{ width: '50%' }}>
  <Form.Item 
    label="Signature matching on the rate-up consent form"
    name='Signaturematchingontherate'
  >
    <Select
      placeholder="Signature matching on the rate-up consent form"
      disabled={!isEditable}
      onChange={handleSignatureChangeRate}
      style={{ width: '100%' }}
    >
      <Option value="yes">Yes</Option>
      <Option value="no">No</Option>
    </Select>
  </Form.Item>
</div> */}

{/* <div style={{ width: '50%' }}>
  <Form.Item 
    label="Letter issued on GC head with false promises"
    name='LetterissuedonFGletterheadwithfalsepromises'
  >
    <Select
      placeholder="Letter issued on GC head with false promises"
      value={FGLetter}
      onChange={handleLetterIssuedonFGLetterChange}
      style={{ width: '100%' }}
      disabled={!isEditable}
    >
      <Option value="yes">Yes</Option>
      <Option value="no">No</Option>
    </Select>
  </Form.Item>
</div> */}
{/* <div style={{ width: '50%' }}>
  <Form.Item 
    label="Any Variance Observed in Login Location"
    name='AnyVarianceObservedinLoginLocation'
  >
    <Select
      placeholder="Any Variance Observed in Login Location"
      value={LoginLocationChange}
      onChange={handleLoginLocationChange}
      style={{ width: '100%' }}
      disabled={!isEditable}
    >
      <Option value="yes">Yes</Option>
      <Option value="no">No</Option>
    </Select>
  </Form.Item>
</div> */}
<div style={{ width: '50%' }}>
  <Form.Item 
    label="Has customer informed in proposal form about policies from other insurance companies"
    name='Hascustomerinformedinproposalformaboutpoliciesfromotherinsurancecompanies'
  >
    <Select
      placeholder="Has customer informed in proposal form about policies from other insurance companies"
      value={fakeLetter}
      onChange={handleCustomerInformedChange}
      style={{ width: '100%' }}
      disabled={!isEditable}
    >
      <Option value="yes">Yes</Option>
      <Option value="no">No</Option>
    </Select>
  </Form.Item>
</div>

<div style={{ width: '50%' }}>
  <Form.Item 
    label="Signature & Photo Matching on Medical forms "
    name='SignaturePhotoMatchingonMedicalforms '
  >
    <Select
      placeholder="Signature & Photo Matching on Medical forms "
      value={fakeLetter}
      onChange={handleSignaturePhotoChange}
      style={{ width: '100%' }}
      disabled={!isEditable}
    >
      <Option value="yes">Yes</Option>
      <Option value="no">No</Option>
       <Option value="NA">Not Available</Option>
    </Select>
  </Form.Item>
</div>

{/* <div style={{ width: '50%' }}>
  <Form.Item 
    label="Any negative observations in PIVC"
    name='AnynegativeobservationsinPIVC'
  >
    <Select
      placeholder="Any negative observations in PIVC"
      value={fakeLetter}
      onChange={handleNegativeObservationsChange}
      style={{ width: '100%' }}
      disabled={!isEditable}
    >
      <Option value="yes">Yes</Option>
      <Option value="no">No</Option>
    </Select>
  </Form.Item>
</div> */}
{/* <div style={{ width: '50%' }}>
  <Form.Item 
    label="Has the customer received the policy bond"
    name='Hasthecustomerreceivedthepolicybond'
    initialValue={formatDate(gcpAPIResponseData?.response?.dispatch_details[0]?.dispatchDeliveryDate)} // Set initial value
  >
    <Input
      type="text"
      placeholder="Has the customer received the policy bond"
      disabled={!isEditable}
    />
  </Form.Item>
</div> */}
{/* <div style={{ width: '50%' }}>
  <Form.Item 
    label="Has the customer received the policy bond"
    // name='Hasthecustomerreceivedthepolicybond'
  >
    <Input type="text" value ={gcpAPIResponseData?.response?.dispatch_details[0]?.dispatchDeliveryDate}
     placeholder="Has the customer received the policy bond" disabled={!isEditable} />
    {/* <Select
      placeholder="Has the customer received the policy bond"
      value ={gcpAPIResponseData?.response?.delivery_details[0]?.dispatchDeliveryDate}
      // value={fakeLetter}
      onChange={handleCustomeRecievedChange}
      style={{ width: '100%' }}
      disabled={!isEditable}
    >
      <Option value="yes">Yes</Option>
      <Option value="no">No</Option>
    </Select> */}
  {/* </Form.Item>
</div> */}

{/* <div style={{ width: '50%' }}>
  <Form.Item 
    label=" Fresh OR Repeat complaint"
    name='Freshorrepeatcomplaint'
  >
    <Select
      placeholder=" Fresh OR Repeat complaint"
      value={fakeLetter}
      onChange={handleFreshComplaintChange}
      style={{ width: '100%' }}
      disabled={!isEditable}
    >
      <Option value="yes">Yes</Option>
      <Option value="no">No</Option>
    </Select>
  </Form.Item>
</div> */}

<div style={{ width: '50%' }}>
{/* <Form.Item
  label="90 days beyond FLC"
  name='daysbeyondFLC'
  initialValue={formatDate(gcpAPIResponseData?.response?.dispatch_details[0]?.dispatchDeliveryDate)}
>
  <Input
    type="text"
    placeholder="90 days beyond FLC"
    disabled={!isEditable}
  />
</Form.Item> */}
</div>

<div style={{ width: '100%', marginTop: '16px' }}>
            <Form.Item label="Comments" name="comments">
              <Input.TextArea rows={4} placeholder="Enter your comments here..." disabled={!isEditable} />
            </Form.Item>
          </div>

            </div>
          </Form>
        </div>
      </Collapse>
    </div>
    <div className="contact-details-btn mt-5" style={{ marginTop: '16px' }}>
      <Button type="primary" className="primary-btn mt-4 me-3"
       htmlType="submit" onClick={handleMiscSave} disabled={!isEditable ||  TicketStatus === 'CLOSED'}>
        Save
      </Button>
    </div>
  </div>
       
  <div>
  {/* Conditionally render the grid */}
  {misSellingCalcHistoryData?.misSellCalcHist?.length > 0 && (
    <table border="1" style={{ width: '80%', borderCollapse: 'collapse' }}>
      <thead style={{ backgroundColor: "#b3201f", color: 'white' }}>
        <tr>
          <th>#</th>
          <th>UserID</th>
          <th>Date</th>
          <th>Comments</th>
          <th>Decision</th>
        </tr>
      </thead>
      <tbody>
        {misSellingCalcHistoryData.misSellCalcHist.map((item, index) => {
          const formattedDate = new Date(item.decisionDt).toLocaleDateString("en-GB"); // Formats to dd/mm/yyyy

          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.usrId}</td>
              <td>{formattedDate}</td>
              <td>{item.comments}</td>
              <td>{item.finalDecision}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )}
</div>


              <div style={{ width: '17%', float: 'left', margin: '16px 0px' }}>
              
              
                {/* <Widgets /> */}


              </div>
            </TabPane>
            )
          }
            <TabPane
      tab={
        <span>Sales Feedback</span>
      }
      key="5"
    >
      <div className='tabs-begin' style={{ width: '77%', float: 'left', margin: '16px 16px' }}>
        <Form form={form} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <div style={{ width: '100%' }}>
            <Form.Item label="Sales Comments" name="salesComments" wrapperCol={{ span: 20 }} labelCol={{ span: 4 }}>
              <Input.TextArea rows={4} maxLength={1000} placeholder="" />
            </Form.Item>
          </div>

          <div style={{ width: '100%' }}>
            <Form.Item label="Sales Feedback" name="SalesFeedback" wrapperCol={{ span: 20 }} labelCol={{ span: 4 }}>
              <Select placeholder="Sales Feedback">
                <Option value="Approve">Approve</Option>
                <Option value="Reject">Reject</Option>
                <Option value="Response awaited / WIP">Response awaited / WIP</Option>
              </Select>
            </Form.Item>
          </div>
          <div style={{ width: '100%' }}>
          <Form.Item
        label="Upload Sales Response "
        name="UploadSalesResponse"
        wrapperCol={{ span: 20 }}
        labelCol={{ span: 4 }}
        inputType="multi-upload" 
      >
        <Upload
          {...uploadProps2}
          accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG, .PDF, .pdf, .TIFF, .tiff"
          customRequest={({ file2, onSuccess }) =>
            uploadProps2.customRequest({ file2, onSuccess }, "Upload Sales Response ")
          }
          name="UploadSalesResponse"
          fileList={uploadFiles1}
          beforeUpload={(newFile) => {
            setFile2(newFile); // Set the file to the state
            uploadProps2.customRequest({ file2: newFile, onSuccess: () => {
              console.log("Upload successful for Upload Sales Response");
            }}, "Upload Sales Response");
            return false; // Prevent automatic upload
          }}
          multiple // Allow multiple file selection
          showUploadList={true} // Show list of uploaded files
          style={{ width: "100%" }}
          onRemove={handleRemove}
        >
          <Input
            placeholder="Upload Sales Response"
            type="text"
            className="cust-input upload-column"
            size="small"
            value={uploadFiles1.length > 0 ? uploadFiles1[uploadFiles1.length - 1].name : null}
            // value={file2 ? file2.name : ""}
            suffix={!props?.hideUploadOption && suffix}
          />
        </Upload>
      </Form.Item>

</div>
<div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', width: '100%' }}>
  <Button
    type="primary"
    style={{ marginTop: '16px' }}
    htmlType="submit"
    onClick={handleSalesFeedbackSave}
    //disabled = {(loginInfo?.userProfileInfo?.profileObj?.role === 23 && TicketStatus === 'CLOSED')}
  >
    Save
  </Button>
</div>
        </Form>
      </div>

      {/* <div style={{ width: '17%', float: 'left', margin: '16px 0px' }}>
        <Widgets />
      </div> */}
    </TabPane>

    <TabPane
      tab={
        <span>Grievance Executive Remarks</span>
      }
      key="12"
    >
      <div style={{ width: '77%', float: 'left', margin: '16px 0px' }}>
        <Form form={form} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {/* <div style={{ width: '100%' }}>
            <Form.Item label="ATR comments" name="Atrcomments" wrapperCol={{ span: 18 }} labelCol={{ span: 6 }}>
              <Input.TextArea rows={4} maxLength={1000} placeholder="ATR comments" 
              onChange={(e) => setatrcomments(e.target.value)} value={atrcomments} />
            </Form.Item>
          </div>
          <div style={{ width: '100%' }}>
            <Form.Item label="Misselling Calculator Comments" name="MissellingCalc" wrapperCol={{ span: 18 }} labelCol={{ span: 6 }}>
              <Input.TextArea rows={4} maxLength={1000}  placeholder="Misselling Calculator Comments"  
               onChange={(e) => setMisccomments(e.target.value)} value={misccomments} />
            </Form.Item>
          </div> */}
          <div style={{ width: '100%' }}>
            <Form.Item label="General Comments/Recommendation" name="generalComments" wrapperCol={{ span: 18 }} labelCol={{ span: 6 }}>
              {/* <Input.TextArea rows={4} maxLength={1000} placeholder="General Comments/Recomentation" /> */}
              <Input.TextArea rows={4} maxLength={1000}style={{ width: "140%", maxWidth: "140%" }} placeholder="General Comments/Recomentation"
           onChange={(e) => setGeneralcomments(e.target.value)} value={generalcomments}/>
            </Form.Item>
          </div>
          <div className="contact-details-btn" style={{ marginTop: '16px' }}>
                    <Button
                      type="primary"
                      className="add-entry-btn"
                      style={{ marginBottom: "30px" }}
                      onClick={handlePastComments}
                      //disabled = {(loginInfo?.userProfileInfo?.profileObj?.role === 23 && TicketStatus === 'CLOSED')}
                    >
                      Add Entry
                    </Button>
                    </div>
                    <div className="contact-details-btn" style={{ marginTop: '16px' }}>
                    <Button
                      type="primary"
                      className="delete-last-entry-btn"
                      style={{ marginBottom: "30px" }}
                      // disabled = {(loginInfo?.userProfileInfo?.profileObj?.role === 23 && TicketStatus === 'CLOSED')}
                      onClick={handleDeleteLastEntry}
                    >
                      Delete Last Entry
                    </Button>
                    </div>
                    <div className="contact-details-btn" style={{ marginTop: '16px' }}>
                    <Button
                      type="primary"
                      className="download-pdf-btn"
                      style={{ marginBottom: "30px" }}
                      onClick={() => handleDownloadPDFgrievence()}
                       //disabled = {(loginInfo?.userProfileInfo?.profileObj?.role === 23 && TicketStatus === 'CLOSED')}
                    >
                      Download PDF
                    </Button>
                  </div>
          {/* <div className="contact-details-btn" style={{ marginTop: '16px' }}>
            <Button type="primary" className="primary-btn mt-4 me-3" htmlType="submit" onClick={grievenceUserSave}>
              Save
            </Button>
            <Button
        type="primary"
        className="primary-btn mt-4 me-3"
        htmlType="submit"
        onClick={handleDownloadPDFgrievence}
      >
        Download PDF
      </Button>
          </div> */}
          
        </Form>
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
                <div className="contact-details-btn" style={{ marginTop: '16px' }}>
            <Button type="primary" className="primary-btn mt-4 me-3" htmlType="submit"
             onClick={grievenceUserSave}
             //disabled = {(loginInfo?.userProfileInfo?.profileObj?.role === 23 && TicketStatus === 'CLOSED')}
             >
              Save
            </Button>
          </div>
      </div>
      {/* <div style={{ width: '17%', float: 'left', margin: '16px 0px' }}>
        <Widgets />
      </div> */}
    </TabPane>
    <TabPane tab={<span>Approver Comments</span>} key="7">
  <div className="tabs-begin" style={{ width: '77%', margin: '16px' }}>
    <Form 
      form={form} 
      style={{ display: 'flex', flexDirection: 'column' }}
      onFinish={handleApproverCommentsSave} // Ensure form validation
    >
      
      {/* Approver Comments Field */}
      <div style={{ width: '100%' }}>
        <Form.Item
          label="Approver Comments"
          name="ApproverComments"
          wrapperCol={{ span: 20 }}
          labelCol={{ span: 4 }}
        >
          <Input.TextArea rows={4} maxLength={1000} placeholder="Approver Comments" />
        </Form.Item>
      </div>

      {/* Approver Feedback Field */}
      <div style={{ width: '100%' }}>
        <Form.Item
          label="Approver Decision"
          name="ApproverFeedback"
          wrapperCol={{ span: 20 }}
          labelCol={{ span: 4 }}
        >
          <Select placeholder="Approver Feedback">
            <Option value="Infavor">Infavor</Option>
            <Option value="Rejected">Rejected</Option>
            <Option value="Requirement triggered">Requirement triggered</Option>
            <Option value="Sales meet">Sales meet</Option>
            <Option value="Duplicate">Duplicate</Option>
          </Select>
        </Form.Item>
      </div>

      {/* Date of Approval Field */}
<div style={{ width: '100%' }}>
<Form.Item
        label="Date of Approval"
        name="dateOfApproval"
        wrapperCol={{ span: 20 }}
        labelCol={{ span: 4 }}
      >
        <DatePicker 
          format={dateFormat}
          disabledDate={featureDateDisabled}
          style={{ width: '100%' }}
        />
      </Form.Item>
</div>

    {/* Upload Complaint Letter Field */}
      <div style={{ width: '100%' }}>
        <Form.Item
          label="Upload Approver Email"
          name="UploadApproverEmail"
          rules={[{ required: true, message: "Please upload the approver email" }]}
          wrapperCol={{ span: 20 }}
          labelCol={{ span: 4 }}
        >
          <Upload
            {...uploadProps}
            accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,.pdf,.TIFF,.tiff"
            customRequest={({ file, onSuccess }) => 
              uploadProps.customRequest({ file, onSuccess }, "Upload Approver Email")
            }
            name="UploadApproverEmail"
            fileList={uploadFiles} // Always use an array
            beforeUpload={(newFile) => {
              setFiles((prevFiles) => [...prevFiles, newFile]); // Store multiple files
              uploadProps.customRequest({ file: newFile, onSuccess: () => {
                console.log("Upload successful");
              }});
              return false; // Prevent automatic upload
            }}
            multiple // Allow multiple file selection
            showUploadList={true} // Show list of uploaded files
            style={{ width: "100%" }}
            onRemove={handleRemove}
          >
            <Input
              placeholder="Upload Approver Email"
              type="text"
              className="cust-input upload-column"
              size="small"
              value={uploadFiles.length > 0 ? uploadFiles[uploadFiles.length - 1].name : ""}
              suffix={!props?.hideUploadOption && suffix}
              readOnly
            />
          </Upload>
        </Form.Item>
      </div>

      {/* Save Button - Disabled if file is missing */}
      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Button
          type="primary"
          style={{ marginTop: '16px' }}
          htmlType="submit"
          disabled={uploadFiles.length === 0} // Disable if no file uploaded
        >
          Save
        </Button>
      </div>

    </Form>
  </div>

  <div style={{ width: '17%', margin: '16px 0' }}>
    {/* <Widgets /> */}
  </div>
</TabPane>

    <TabPane
  tab={<span>Refund Details</span>}
  key="6"
>
  <div style={{ display: 'flex', margin: '16px' }}>
    {/* Form and Button Container */}
    <div style={{ width: '77%' }}>
      <Form form={form} style={{ display: 'flex', flexDirection: 'column' }}>
      <h6 className="fw-700" style={{color:"#b21f1f"}}>Enter Refund Details</h6>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          <div style={{ width: '50%' }}>
            <Form.Item label="IFSC" name="IFSC" {...formItemLayout2}>
              <Input type="text" placeholder="IFSC" />
            </Form.Item>
          </div>
          <div style={{ width: '50%' }}>
            <Form.Item label="Account Holders Name" name="Account_Holders_Name" {...formItemLayout2}>
              <Input type="text" placeholder="Account Holders Name" />
            </Form.Item>
          </div>
          <div style={{ width: '50%' }}>
            <Form.Item label="Bank Account Number" name="Bank_Account_Number" {...formItemLayout2}>
              <Input type="text" placeholder="Bank Account Number" />
            </Form.Item>
          </div>
          <div style={{ width: '50%' }}>
            <Form.Item label="Re-enter Account Number" name="Re_enter_Account_Number" {...formItemLayout2}>
              <Input type="text" placeholder="Re-enter Account Number" />
            </Form.Item>
          </div>
          <div style={{ width: '50%' }}>
            <Form.Item label="Bank" name="Bank" {...formItemLayout2}>
              <Input type="text" placeholder="Bank" />
            </Form.Item>
          </div>
          <div style={{ width: '50%' }}>
            <Form.Item label="Penny Drop Result" name="Penny_Drop_Result" {...formItemLayout2}>
              <Input type="text" placeholder="Penny Drop Result" />
            </Form.Item>
          </div>
          <div style={{ width: '50%' }}>
            <Form.Item label="Branch Name" name="Branch_Name" {...formItemLayout2}>
              <Input type="text" placeholder="Branch Name" />
            </Form.Item>
          </div>
        </div>
        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Button
            type="primary"
            style={{ marginTop: '16px' }}
            htmlType="submit"
            onClick={handleRefundSave}
            disabled = {TicketStatus === 'CLOSED'}
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
    
    {/* Widgets Container */}
    {/* <div style={{ width: '17%' }}>
      <Widgets />
    </div> */}
  </div>
</TabPane>

           




            


  <TabPane
  tab={<span>RCA</span>}
  key="8"
>
<div className="tabs-begin" style={{ width: '77%', margin: '16px 16px', float: 'left' }}>
    <div className="form-container" style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', padding: '24px', backgroundColor: '#ffffff' }}>
      <Form form={form} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ width: '100%' }}>
        <Form.Item label="Observations" wrapperCol={{ span: 20 }} labelCol={{ span: 4 }} 
         style={{width: '120%'}} 
        name="Observations">
          <Input.TextArea rows={4} maxLength={1000} style={{marginLeft: '100px' }} placeholder="Observations" />
        </Form.Item>
      </div>
      <div style={{ width: '100%' }}>
        <Form.Item label="Additional Remarks" wrapperCol={{ span: 20 }} labelCol={{ span: 4 }} style={{width: '120%'}}name="Additional_Remarks">
          <Input.TextArea rows={4} maxLength={1000} style={{ marginLeft: '100px' }}placeholder="Additional Remarks" />
        </Form.Item>
      </div>
      <div style={{ width: '100%' }}>
        <Form.Item label="Conclusion" wrapperCol={{ span: 20 }} labelCol={{ span: 4 }} style={{width: '120%'}} name="Conclusion">
          <Input.TextArea rows={4} maxLength={1000} style={{ marginLeft: '100px' }}placeholder="Conclusion" />
        </Form.Item>
      </div>
      <div style={{ width: '100%' }}>
        <Form.Item label="Additional Space for case remarks" wrapperCol={{ span: 20 }} labelCol={{ span: 4 }} style={{width: '120%'}}name="Additional_Space_for_case_remarks">
          <Input.TextArea rows={4} maxLength={1000}  style={{ marginLeft: '100px' }} placeholder="Additional Space for case remarks" />
        </Form.Item>
      </div>
      <div style={{ width: '100%' }}>
      <Form.Item 
  label="Closure Remarks" 
  {...formItemLayout2} 
  wrapperCol={{ span: 20 }} 
  labelCol={{ span: 4 }} 
  style={{width: '120%'}}
  name="Closure_Remarks"
  rules={[{ required: true, message: 'Please select Closure Remarks' }]} 
>
   <Input type="text" style={{ marginLeft: '100px' }}placeholder="Enter Closure_Remarks" />
  {/* <Select 
  style={{ marginLeft: '100px' }}
    placeholder="Select Closure Remarks" 
    allowClear
    loading={isLoading} 
  >
      {closureLU.map((item) => (
        <Option key={item.label} value={item.label}>
          {item.label}
        </Option>
      ))}
  </Select> */}
</Form.Item>

      </div>
      <div style={{ width: '100%' }}>
  <Form.Item 
    label="Nature of Complaint" 
    {...formItemLayout2} 
    wrapperCol={{ span: 20 }} 
    labelCol={{ span: 4 }} 
    name="Nature_of_Complaint"
    style={{width: '120%'}}
    rules={[{ required: true, message: 'Please select Nature of Complaint' }]} 
  >
    <Select 
    style={{ marginLeft: '100px' }}
      placeholder="Select Nature of Complaint" 
      allowClear
      loading={isLoading}
    >
      {clientIDLU.map((item) => (
        <Option key={item.label} value={item.label}>
          {item.label}
        </Option>
      ))}
    </Select>
  </Form.Item>
</div>
      <div style={{ width: '100%' }}>
        <Form.Item label="Type of Error" {...formItemLayout2} wrapperCol={{ span: 20 }} labelCol={{ span: 4 }}  style={{width: '120%'}} name="Type_of_Error"
       
        rules={[{ required: true, message: 'Please select Type of Error' }]} >
        <Select 
  style={{ marginLeft: '100px' }}
    placeholder="Select Type of Error" 
    allowClear
    loading={isLoading} 
  >
      {closureLU.map((item) => (
        <Option key={item.label} value={item.label}>
          {item.label}
        </Option>
      ))}
  </Select>
        {/* <Input type="text" style={{ marginLeft: '100px' }}placeholder="Select Type of Error" />
         */}

          {/* <Select placeholder="Select Type of Error">
            <Option value="surrender">Surrender</Option>
            <Option value="contact_details">Contact Details</Option>
          </Select> */}
        </Form.Item>
      </div>
      <div style={{ width: '100%' }}>
        <Form.Item label="Reason For Error" wrapperCol={{ span: 20 }} labelCol={{ span: 4 }}   style={{width: '120%'}}name="Reason_For_Error">
          <Input.TextArea rows={4} maxLength={1000} style={{width: '120%', marginLeft: '100px' }} placeholder="" />
        </Form.Item>
      </div>
      <div style={{ width: '100%' }}>
        <Form.Item label="Root Cause" wrapperCol={{ span: 20 }} labelCol={{ span: 4 }}   style={{width: '120%'}}name="Root_Cause">
          <Input.TextArea rows={4} maxLength={1000} style={{ width: '120%', marginLeft: '100px' }}  placeholder="" />
        </Form.Item>
      </div>
      {/* <div className="contact-details-btn" style={{ marginTop: '16px' }}>
        <Button type="primary" className="primary-btn mt-4 me-3" htmlType="submit" onClick={handleRCASave}>
          Save
        </Button>
        <Button type="primary" className="primary-btn mt-4 me-3" htmlType="submit" 
        // onClick={handleRCASave}
        >
          Download PDF
        </Button>
      </div> */}
    </Form>
    <div className="contact-details-btn" style={{ marginTop: '16px' }}>
        <Button type="primary" className="primary-btn mt-4 me-3" htmlType="submit" onClick={handleRCASave}
        >
          Save
        </Button>
        <Button type="primary" className="primary-btn mt-4 me-3" htmlType="submit" 
         onClick={handleRCADownloadPDF}
        >
          Download PDF
        </Button>
      </div>
  </div>
  </div>
  {/* <div style={{ width: '17%', float: 'left', margin: '16px 0px' }}>
    <Widgets />
  </div> */}
</TabPane>
<TabPane tab={<span>Response for Complaint</span>} key="9">
  <h6 className="fw-700" style={{ color: "#b21f1f" }}>Response to Complaint</h6>

 <Form form={form} layout="vertical">
  {/* Email To */}
  <Row gutter={16}>
  <Col span={24}>
    <Form.Item
      label="Email To"
      name="senderEmail"
      rules={[
        { required: true, message: "Email is required" },
        { type: "email", message: "Please enter a valid email address" }
      ]}
    >
      <Input type="email" placeholder="Enter recipient email" />
    </Form.Item>
  </Col>
</Row>


  {/* Subject Line */}
  <Row gutter={16}>
  <Col span={24}>
    <Form.Item
      label="Subject Line"
      name="subjectLine"
      rules={[
        { required: true, message: "Subject is required" },
        { max: 255, message: "Subject cannot exceed 255 characters" }
      ]}
    >
      <Input placeholder="Enter subject" />
    </Form.Item>
  </Col>
</Row>


  {/* Rich Text Editor */}
  <Row gutter={16}>
    <Col span={24}>
      <Form.Item label="Email Body" style={{ marginBottom: '32px' }}>
        <div style={{ border: '1px solid #d9d9d9', borderRadius: '4px' }}>
          <ReactQuill
            className="quill-editor"
            theme="snow"
            modules={module}
            value={ResponseForCustomer}
            onChange={(value) => setResponseForCustomer(value)}
            style={{
              height: '250px',
              overflowY: 'auto',
            }}
          />
        </div>
      </Form.Item>
    </Col>
  </Row>

  {/* Attachments */}
  <Row gutter={16}>
    <Col span={24}>
      <Form.Item name="Attachments">
        <Upload
          {...uploadProps3}
          accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,.pdf,.TIFF,.tiff"
          customRequest={({ file, onSuccess }) => {
            uploadProps3.customRequest({ file2: file, onSuccess }, "Upload Sales Response");
          }}
          beforeUpload={(file) => {
            setFile2(file);
            uploadProps3.customRequest({ file2: file, onSuccess: () => console.log("Uploaded") }, "Upload Sales Response");
            return false;
          }}
          fileList={uploadFiles3}
          multiple
          showUploadList
          onRemove={handleRemove}
        >
          <Button icon={<UploadOutlined />}>Upload Attachments</Button>
        </Upload>
      </Form.Item>
    </Col>
  </Row>

  {/* Action Buttons */}
 <Row gutter={16} justify="start">
  <Col>
    <Button type="primary" onClick={handleSendClick}>Send</Button>
  </Col>
  <Col>
    <Button type="primary" onClick={handleComplaintsTicketCloseButton}>Close Ticket</Button>
  </Col>
</Row>

{/* Confirmation Modal */}
<Modal
  open={isModalVisible}
  onCancel={handleCancelSend}
  footer={[
    <Button
      key="yes"
      type="primary"
      style={{ backgroundColor: '#b21f1f', borderColor: '#b21f1f' }}
      onClick={handleConfirmSend}
    >
      Yes
    </Button>,
    <Button
      key="no"
      type="primary"
      style={{ backgroundColor: '#b21f1f', borderColor: '#b21f1f' }}
      onClick={handleCancelSend}
    >
      No
    </Button>,
  ]}
>
  <p style={{ fontWeight: 'bold', textAlign: 'center', color: '#444' }}>
    Are you sure you want to send this email? Please ensure the email body is complete
    and all necessary documents are attached.
  </p>
</Modal>

</Form>

</TabPane>


            






          </Tabs>
          }

        </div>

        <div>

      <Modal
        // title={<div style={{ textAlign: "center", fontWeight: "bold" }}></div>}
        open={showMiscgrid}
        destroyOnClose={true}
        onCancel={() => setShowMiscgrid(false)} // Close modal on cancel
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setShowMiscgrid(false)}  style={{cursor: "pointer",position: "absolute", top: "-15px",background: "white",padding: "5px",borderRadius: "70%", }}>
              <img src={CloseIcon} alt="Close" />
            </span>
          </Tooltip>
        }
        footer={null}
        width={800}
        className="mt-62"
      >
        {/* <div style={{ border: "1px solid black", textAlign: "center", overflowX: "auto" }}> */}
        {/* {TotalCount >= 0 && (
         */}
         {totalCount > 0 && (
                <table border="1" style={{ width: "100%", border: "1px solid black", textAlign: "center", overflowX: "auto" }}>
                    <thead style={{ backgroundColor: "#b3201f", color: 'white' }}>
                        <tr>
                            <th></th>
                            <th>Outcome</th>
                            <th>Count</th>
                            <th>Ratio %</th>
                            <th>Decision</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                              Exception handling Required<br />
                              Exception handling Not Required<br />
                              In Favour Of Customer<br/>
                              Not In Favour Of Customer<br/>
                              Decline<br/>
                                {/* {ExceptionhandlingRequiredOutCome}<br />
                                {ExceptionhandlingNotRequiredOutCome}<br />
                                {NotInFavourOfCustomerOutCome}<br />
                                {InFavourOfCustomerOutCome}<br />
                                {DeclineOutCome} */}
                            </td>
                            <td>
                                {/* {ExceptionhandlingRequiredCount}<br />
                                {ExceptionhandlingNotRequiredCount}<br />
                                {NotInFavourOfCustomerCount}<br />
                                {InFavourOfCustomerCount}<br />
                                {DeclineOutComeCount} */}
                                {data1?.exceptionhandlingRequiredCount}<br />
                                {data1?.exceptionhandlingNotRequiredCount}<br />
                                {data1?.inFavourOfCustomerCount}<br />
                                {data1?.notInFavourOfCustomerCount}<br />
                                {data1?.declineCount}<br />
                            </td>
                            <td>
                            {data1?.exceptionhandlingRequiredRatio}%<br />
                            {data1?.exceptionhandlingNotRequiredRatio}%<br />
                            {data1?.inFavourOfCustomerRatio}%<br />
                            {data1?.notInFavourOfCustomerRatio}%<br />
                            {data1?.declineRatio}%<br />
                            {/* {ExceptionhandlingRequiredPercentage}%<br />
                                {ExceptionhandlingRequiredPercentage}%<br />
                                {ExceptionhandlingNotRequiredPercentage}%<br />
                                {NotInFavourOfCustomerPercentage}%<br />
                                {InFavourOfCustomerPercentage}%<br />
                                {DeclineOutComePercentage}%<br /> */}  
                            </td>
                            {/* <td>Decline the case</td> */}
                            <td>{data1?.finalDecision}</td>
                        </tr>
                        <tr style={{ fontWeight: 'bold' }}>
                            <td></td>
                            <td>Total</td>
                            <td>{totalCount}</td>
                            <td>{totalRatio}%</td>
                        </tr>
                    </tbody>
                </table>
            )}
        {/* </div> */}
      </Modal>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2>Popup Content</h2>
        <button onClick={closeModal}>Close</button>
        <div>
          <label>
            Read-Only Field:
            <input type="text" value="Read-Only Value" readOnly />
          </label>
        </div>
        <div>
          <label>
            Input Field:
            <input type="text" placeholder="Enter something..." />
          </label>
        </div>

        {showAlert && (
        <PopupAlert
          alertData={alertData}
          title={alertTitle}
          getAdvance={props.getAdvance}
          //navigate={navigateTo}
          setShowAlert={setShowAlert}
        ></PopupAlert>
      )}
      </Modal>
    </div>

        </>}
        {/* <div style={{ width: '17%', float: 'left', margin: '16px 0px' }}>
           
          </div> */}
        {/* </div> */}



      </Spin>
     
      {showAlert && (
        <PopupAlert
          alertData={alertData}
          title={alertTitle}
          getAdvance={props.getAdvance}
          //navigate={navigateTo}
          setShowAlert={setShowAlert}
        ></PopupAlert>
      )}
    </>
  )
}


export default ComplaintsUser;