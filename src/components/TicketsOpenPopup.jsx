import React, { useState } from "react";
import moment from "moment";
import DownloadIcon from "../assets/images/download.png";
import {
  Button,
  Form,
  Spin,
  message,
  Row,
  Col,
  Radio,
  Modal,
  Checkbox,
  Input,
  DatePicker,
  Select,
  Tooltip,
} from "antd";
import apiCalls from "../api/apiCalls";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const TicketsOpenPopup = (props) => {
  const { customerData, POSContactData, clientEnquiryData } = props;
  const [form] = Form.useForm();
  const [reaiseenquiryform] = Form.useForm();
  const dateFormat = "DD/MM/YYYY";
  const { TextArea } = Input;
  const loginInfo = useSelector((state) => state);
  const loggedUser = useSelector((state) => state?.userProfileInfo?.profileObj);
  const [gridOpen, setGridOpen] = useState(false);
  const [gridLinkOpen, setGridLinkOpen] = useState(false);
  const [handleCommunicationLink, setHandleCommunication] = useState(false);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [isViewData, setIsViewData] = useState("");
  const [isShowRaiseEnquiry, setIsShowRaiseEnquiry] = useState(false);
  const [isShowAddFollowUp, setIsShowAddFollowUp] = useState(false);
  const [requestModeLU, setRequestModeLU] = useState([]);
  const [selectedValue, setSelectedValue] = useState("no");
  const [isFollowUpsLoader, setIsFollowUpsLoader] = useState(false);
  const [comments, setComments] = useState("");
  const [showToFromInView, setShowToFromInView] = useState(false);
  const [firstRecord, setFirstRecord] = useState({});
  const requestCommentBySREnquiry =
    props?.isTicketDetails?.serviceRequestTransectionData?.find(
      (item) => item.tagName === "RequestCommentsBySREnquiry"
    )?.tagValue || "";

  const handleInputChange = (e) => {
    setComments(e.target.value);
  };

  const handleChange = (value) => {
    setSelectedValue(value);
  };


  const getCTST = () => {
    let obj = {
      MasterRequest: ["REQST_MODE"],
    };
    let CTST = apiCalls.ctst(obj);
    CTST.then((val) => {
      const rquestModeData = transformData(val.data, "REQST_MODE");
      setRequestModeLU(rquestModeData);
      //setIsLoading(false);
    }).catch((err) => {
      //setIsLoading(false);
      message.destroy();
      message.error({
        content: err?.data?.responseBody?.errormessage,
        className: "custom-msg",
        duration: 2,
      });
    });
  };

  const transformData = (data, keyy) => {
    const filteredData = data?.filter((ele) => ele.key === keyy);
    return filteredData[0]?.value?.map((item, index) => {
      let obj;

      if (keyy === "CALL_TYP") {
        obj = {
          ...item,
          label: item.mstDesc,
          value: item.mstID,
          //isCallType:true
        };
      } else if (keyy === "SUB_TYP") {
        obj = {
          ...item,
          label: item.mstDesc,
          value: item.mstID,
          //isSubType:true
        };
      } else {
        obj = {
          ...item,
          label: item.mstDesc,
          value: item.mstID,
        };
      }
      return obj;
    });
  };

  const DownloadPDF = async () => {
    let obj = {
      srid: props?.serviceId,
    };
    await apiCalls.GetDocumentData(obj).then((response) => {
      if (response.data.header != null) {
        message.success("No files available");
        return;
      }
      response.data.forEach((x) => {
        let obj = JSON.parse(x.json);
        if (obj?.responseBody != null) {
          if (obj.responseBody?.dmsFilesList != null) {
            let fileBytes = obj.responseBody.dmsFilesList.at(0).fileBytes;
            convertBytesToPDF(fileBytes, "myfile");
          }
        }
      });
    });
  };

  const convertBytesToPDF = async (fileBytes) => {
    const byteCharacters = atob(fileBytes);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl);
  };


  const commentsData =
    props?.details?.comments?.length > 0 &&
    props?.details?.comments?.map((item) => {
      // Ensure the date is valid and converted to local time
      const localTime = moment(item.createdOn, moment.ISO_8601).isValid()
        ? moment(item.createdOn).local().format("DD/MM/YYYY hh:mm A")
        : "Invalid Date";

      return {
        userName: item.userName,
        tagName: item.comments, // Assuming 'item.comments' holds the actual comment text
        userRole: item.roleName,
        createdOn: localTime, // Show the correct local time
      };
    });
  const closedOnDate = new Date(props.details.closedOn);
  const formattedDate = moment(closedOnDate, "YYYYMMDD").format("DD/MM/YYYY");

  const bodySmsData1 = (data) => {
    if (!data || typeof data !== "object") return null;

    // Parse and format the exact date/time from API without timezone offset
    const formattedDate = moment(data.sendDate).format("DD/MM/YYYY HH:mm:ss");

    return {
      SentDate: formattedDate,
      SentNumber: data.sentNumber,
      SenderEmail: data.senderEMail,
    };
  };

  const [formIteam] = Form.useForm();

  const handleRadioChange = (e) => {
    const selectedValue = e.target.value;
    console.log("Customer Was Contacted:", selectedValue);

    // Optionally update form state
    form.setFieldValue("CustomerWasContacted", selectedValue);
  };


  const bodyLetterData = [
    {
      SentDate: "20/02/2024",
      Address: "1223444",
    },
  ];
  const convertDate = (inputDate) => {
    if (!inputDate) return "";

    // Check if input is in "DD/MM/YYYY" format
    if (moment(inputDate, "DD/MM/YYYY", true).isValid()) {
      return moment(inputDate, "DD/MM/YYYY").format("DD/MM/YYYY");
    }

    // Check if input is in ISO format
    if (moment(inputDate, moment.ISO_8601, true).isValid()) {
      return moment(inputDate).format("DD/MM/YYYY");
    }

    return "Invalid Date";
  };
  const handleLinkClick = () => {
    setGridOpen(!gridOpen);
    setGridLinkOpen(false);
    setHandleCommunication(false);
  };
  const handleClose = () => {
    setGridLinkOpen(false);
  };
  const handleClick = async (data) => {
    setGridLinkOpen(!gridLinkOpen);
    setGridOpen(false);
    setHandleCommunication(false);
  };

  const handleCommunication = () => {
    setHandleCommunication(!handleCommunicationLink);
    setGridOpen(false);
    setGridLinkOpen(false);
  };
  const handleRaiseEnquiry = () => {
    getCTST();
    setIsShowRaiseEnquiry(!isShowRaiseEnquiry);
  };
  const handleAddFollowUp = () => {
    setIsShowAddFollowUp(!isShowAddFollowUp);
  };

  // const data = [
  //   { name: 'DD/MM/YYYY', age: 'Requirement 1' },
  //   { name: 'Doe', age: 'Requirement 2' },
  // ];
  // useEffect(() => {
  //   // getTicketDetails()
  // }, [])

  // const getTicketDetails = async () => {
  //   const data = await apiCalls.getTicketDetails(props?.serviceId);
  // }

  const handleView = (data, hideViewStatus) => {
    if (hideViewStatus === true) {
      setShowToFromInView(true);
    } else {
      setShowToFromInView(false);
    }
    setIsDocumentModalOpen(true);
    let list = data.commType === 2 ? data.emailContent : data.smsText;
    if (data.commType === 2) {
      apiCalls
        .getEmailTemplate(
          props?.serviceId,
          data.templateId,
          data.falconideTempID,
          data?.commID
        )
        .then((response) => {
          if (response.data?.includes("BlobNotFound")) {
            setIsViewData(list);
          } else {
            setIsViewData(response.data);
          }
        })
        .catch((error) => console.log(error));
    } else {
      setIsViewData(list);
    }
    if (data) {
      const transformedData = bodySmsData1(data);
      setFirstRecord(transformedData);
    }
  };
  const handleViewClose = () => {
    setIsViewData("");
    setIsDocumentModalOpen(false);
  };
 
  const saveRequest = async (values) => {
    setIsFollowUpsLoader(true);
    //setIsLoader(true);
    //const values = form.getFieldsValue();
    const obj = {
      SrvReqID: POSContactData?.srvReqID || 0,
      CallType: 13, // Required
      SubType: 3, // Required
      RequestSource: loginInfo?.userProfileInfo?.profileObj?.role || 0, // Required
      RequestChannel: values?.requestmode, // Required
      ApplicationNo:
        props?.headerAPiresponse?.policyDetailsObj?.identifiers?.applicationNo,
      PolicyNo:
        props?.headerAPiresponse?.policyDetailsObj?.identifiers?.policyNo, // Required
      proposerName:
        props?.headerAPiresponse?.policyDetailsObj?.identifiers?.po_Name,
      policyStatus:
        props?.headerAPiresponse?.policyDetailsObj?.planAndStatus?.policyStatus,
      plan: props?.headerAPiresponse?.policyDetailsObj?.planAndStatus?.planName,
      DOB: convertDate(customerData?.dob),
      CreatedOn: new Date(),
      CreatedByRef: loginInfo?.userProfileInfo?.profileObj?.userName, // Required
      CreatedUsrId: loginInfo?.userProfileInfo?.profileObj?.userName,
      ModifiedOn: new Date(),
      ModifiedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
      AssignedToRole: "", //POS
      AssignedByUser: 0,
      Category: 1,
      ReasonForChange: "",
      RequestDateTime: values?.branchreceivedate
        ? new Date(values?.branchreceivedate)
        : new Date(),
      ReasonDelayed: values?.resonfordelay,
      CustSignDateTime: values?.customersigningdate
        ? new Date(values?.customersigningdate)
        : new Date(),
      //  CurrentStatus:raiseRequirementOpen? "Reject":'',
      TransactionData: [
        {
          Status: "Create",
          TagName: "RequestChannel",
          TagValue: values?.requestmode || "",
        },

        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue:
            values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "shareAcknowledgement",
          TagValue: values?.shareAcknowledgement || "",
        },
      ],
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
    let response = await apiCalls.genericAPI(obj);
    if (response?.data) {
      message.destroy();
      message.success({
        content: "Query Raised Successfully",
        className: "custom-msg",
        duration: 2,
      });
      setIsFollowUpsLoader(false);
      props?.setIsOpenTicket(false);
      props?.getLastOpenTicketsData();
    } else {
      message.destroy();
      setIsFollowUpsLoader(false);
      props?.setIsOpenTicket(true);
      message.error({
        content:
          response?.data?.responseBody?.errormessage ||
          "Something went wrong, please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  };
  const saveAddFollowUp = async (values) => {
    setIsFollowUpsLoader(true);
    let obj = {
      FollowUpID: 0,
      SrvReqRefNo: props?.details?.ticketNo || "",
      UsrID: loggedUser?.userName || "",
      ContactPerson: values?.contact,
      NxtFollowUpDt: values?.nextFollowUp,
      CompleteByDt: null,
      Agenda: values?.agenda,
      CreatedOn: new Date(),
    };
    const response = await apiCalls.SaveFollowUps(obj);
    if (response?.data) {
      message.destroy();
      message.success({
        content: "Follow Up Added Successfully!.",
        className: "custom-msg",
        duration: 2,
      });
      setIsFollowUpsLoader(false);
      props?.setIsOpenTicket(false);
      props?.getLastOpenTicketsData();
    } else {
      message.destroy();
      setIsFollowUpsLoader(false);
      props?.setIsOpenTicket(true);
      message.error({
        content:
          response?.data?.responseBody?.errormessage ||
          "Something went wrong, please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  };

  const featuredatedisabled = (current) => {
    return current && current < dayjs().startOf("day");
  };
  const handleDate = () => {};

  return (
    <>
      <Modal
        open={props?.isOpenTicket}
        destroyOnClose={true}
        width={1200}
        closeIcon={false}
        footer={null}
      >
        <div>
          <Spin spinning={props?.isLoading}>
            {/* <Form > */}
            <div className="reuirement p-2" style={{ border: "2px solid red" }}>
              <p style={{ textAlign: "left" }}>
                <b>Tickets Details</b>
              </p>
              <div style={{ display: "flex", width: "100%" }}>
                <div style={{ width: "25%" }}>
                  <Form.Item
                    label={<span>Ticket No</span>}
                    name="TicketNo"
                    wrapperCol={{ span: 18 }}
                    labelCol={{ span: 6 }}
                  >
                    <Input
                      type="text"
                      placeholder={props?.details?.ticketNo}
                      style={{ width: "120%", color: "black" }}
                      disabled="true"
                    />
                  </Form.Item>
                </div>
                <div style={{ width: "25%" }}>
                  <Form.Item
                    label={<span>Call Type</span>}
                    wrapperCol={{ span: 18 }}
                    labelCol={{ span: 6 }}
                    name="to"
                  >
                    <Input
                      type="text"
                      placeholder={props?.ticketsData?.callTypeName}
                      style={{ width: "120%", color: "black" }}
                      disabled="true"
                    />
                  </Form.Item>
                </div>
                <div style={{ width: "25%" }}>
                  <Form.Item
                    label={<span>Sub Type</span>}
                    wrapperCol={{ span: 18 }}
                    labelCol={{ span: 6 }}
                    name="to"
                  >
                    <Input
                      type="text"
                      placeholder={props?.ticketsData?.subTypeName}
                      style={{ width: "120%" }}
                      disabled="true"
                    />
                  </Form.Item>
                </div>
                <div style={{ width: "25%" }}>
                  <Form.Item
                    label={<span>Category</span>}
                    wrapperCol={{ span: 18 }}
                    labelCol={{ span: 6 }}
                    name="category"
                  >
                    <Input
                      type="text"
                      placeholder={props?.ticketsData?.category}
                      style={{ width: "120%" }}
                      disabled="true"
                    />
                    <style>
                      {`
          .ant-input::placeholder {
            color: black;
          }
        `}
                    </style>
                  </Form.Item>
                </div>
              </div>
              <div style={{ display: "flex", width: "100%" }}>
                <div style={{ width: "25%" }}>
                  <Form.Item
                    label={<span>Created By</span>}
                    name="TicketNo"
                    wrapperCol={{ span: 18 }}
                    labelCol={{ span: 6 }}
                  >
                    <Input
                      type="text"
                      placeholder={props?.ticketsData?.createdBy}
                      style={{ width: "120%" }}
                      disabled="true"
                    />
                  </Form.Item>
                </div>
                <div style={{ width: "25%" }}>
                  <Form.Item
                    label={<span>Created On</span>}
                    wrapperCol={{ span: 18 }}
                    labelCol={{ span: 6 }}
                    name="to"
                  >
                    <Input
                      type="text"
                      placeholder={convertDate(props?.ticketsData?.date)}
                      style={{ width: "120%" }}
                      disabled="true"
                    />
                  </Form.Item>
                </div>
                <div style={{ width: "25%" }}>
                  <Form.Item
                    label={<span>Request Mode</span>}
                    wrapperCol={{ span: 18 }}
                    labelCol={{ span: 6 }}
                    name="to"
                  >
                    <Input
                      type="text"
                      placeholder={props?.details?.requestMode || "NA"}
                      style={{ width: "120%" }}
                      disabled="true"
                    />
                  </Form.Item>
                </div>
                <div style={{ width: "25%" }}>
                  <Form.Item
                    label={<span>Status</span>}
                    wrapperCol={{ span: 18 }}
                    labelCol={{ span: 6 }}
                    name="to"
                  >
                    <Input
                      type="text"
                      placeholder={props?.details?.status}
                      style={{ width: "120%" }}
                      disabled="true"
                    />
                  </Form.Item>
                </div>
              </div>
              <div style={{ display: "flex", width: "100%" }}>
                <div style={{ width: "25%" }}>
                  <Form.Item
                    label={<span>Pending With</span>}
                    wrapperCol={{ span: 18 }}
                    labelCol={{ span: 6 }}
                    name="category"
                  >
                    <Input
                      type="text"
                      placeholder={
                        props?.details?.status === "PENDING"
                          ? props?.details?.pendingWith
                          : "NA"
                      }
                      style={{ width: "120%" }}
                      disabled="true"
                    />
                  </Form.Item>
                </div>

                <div style={{ width: "25%" }}>
                  <Form.Item
                    label={<span>Closed By</span>}
                    wrapperCol={{ span: 18 }}
                    labelCol={{ span: 6 }}
                    name="closedby"
                  >
                    <Input
                      type="text"
                      placeholder={
                        props?.details?.status === "CLOSED"
                          ? props?.details?.closedBy
                          : "NA"
                      }
                      style={{ width: "120%" }}
                      disabled={true}
                      value=""
                    />
                  </Form.Item>
                </div>
                <div style={{ width: "25%" }}>
                  <Form.Item
                    label={<span>Closed on</span>}
                    name="closeon"
                    wrapperCol={{ span: 18 }}
                    labelCol={{ span: 6 }}
                  >
                    <Input
                      type="text"
                      placeholder={
                        props?.details?.status === "CLOSED"
                          ? convertDate(props?.details?.closedOn)
                          : "NA"
                      }
                      style={{ width: "120%" }}
                      disabled="true"
                    />
                  </Form.Item>
                </div>
                <div style={{ width: "25%" }}>
                  <Form.Item
                    label={<span>Request By</span>}
                    wrapperCol={{ span: 18 }}
                    labelCol={{ span: 6 }}
                    name="to"
                  >
                    <Input
                      type="text"
                      placeholder={props?.details?.requestBy || "NA"}
                      style={{ width: "120%" }}
                      disabled="true"
                    />
                  </Form.Item>
                </div>
              </div>
              <div style={{ display: "flex", width: "100%" }}>
                <div style={{ width: "25%" }}>
                  {(props.ticketsData.callType == "2" &&
                    props.ticketsData.subType == "1" &&
                    props.ticketsData.status === "CLOSED") ||
                  (props.ticketsData.callType == "2" &&
                    props.ticketsData.subType == "2" &&
                    props.ticketsData.status === "CLOSED") ||
                  (props.ticketsData.callType == "2" &&
                    props.ticketsData.subType == "8" &&
                    props.ticketsData.status === "CLOSED") ? (
                    <Form.Item
                      label={<span>Download PDF</span>}
                      wrapperCol={{ span: 18 }}
                      labelCol={{ span: 6 }}
                      name="category"
                    >
                      <img
                        src={DownloadIcon}
                        className="send-icon"
                        onClick={DownloadPDF}
                      />
                    </Form.Item>
                  ) : null}
                </div>
              </div>

              {props.ticketsData.callType === 27 &&
              props.ticketsData.subType === 4 ? (
                <Form form={formIteam} layout="vertical">
                  <div className="radio-btn-wrap">
                    <div>
                      <span>Customer Was Contacted</span>
                    </div>
                    <Form.Item
                      name="CustomerWasContacted"
                      className="inputs-label mb-0"
                      rules={[
                        { required: true, message: "Please select an option" },
                      ]}
                    >
                      <Radio.Group
                        className="radio-check"
                        onChange={handleRadioChange}
                      >
                        <Radio className="fs-16 fw-400" value="true">
                          Yes
                        </Radio>
                        <Radio className="fs-16 fw-400" value="false">
                          No
                        </Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </Form>
              ) : (
                ""
              )}
            </div>
            <div className="reuirement" style={{ textAlign: "left" }}>
              <div className="col-sm-2">
                <a
                  style={{
                    color: "black",
                    borderBottom: "1px solid",
                    fontWeight: "bold",
                  }}
                  onClick={handleLinkClick}
                >
                  View Requirements
                </a>
              </div>
              {gridOpen && (
                <div className="mt-2 mb-2">
                  {props?.details?.raiseReq &&
                  props?.details?.raiseReq?.length > 0 ? (
                    <table
                      style={{
                        borderCollapse: "collapse",
                        width: "50%",
                        border: "1px solid black",
                      }}
                    >
                      <thead>
                        <tr style={{ border: "1px solid black", width: "25%" }}>
                          <th style={{ border: "1px solid black" }}>
                            Raised On
                          </th>
                          <th style={{ border: "1px solid black" }}>
                            List of Requirements
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {props?.details?.raiseReq?.map((email, index) => (
                          <tr key={index} style={{ border: "1px solid black" }}>
                            <td style={{ border: "1px solid black" }}>
                              {formattedDate}
                            </td>
                            <td style={{ border: "1px solid black" }}>
                              {email.mstDesc}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div>No records found.</div>
                  )}
                </div>
              )}
              <div className="col-sm-2">
                <a
                  style={{
                    color: "black",
                    borderBottom: "1px solid",
                    fontWeight: "bold",
                  }}
                  onClick={handleClick}
                >
                  View History
                </a>
              </div>
              {gridLinkOpen && (
                <div className="mt-2 mb-2">
                  <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                    <div className="openTickets_card">
                      {commentsData?.length > 0 ? (
                        commentsData?.map((comments, index) => (
                          <div key={index}>
                            <b>
                              {comments.userName}/{comments.userRole}:
                              {comments.createdOn}
                            </b>
                            <p>{comments.tagName}</p>
                          </div>
                        ))
                      ) : (
                        <div style={{ textAlign: "center" }}>
                          <p>No Comments</p>
                        </div>
                      )}
                      {requestCommentBySREnquiry != "" && (
                        <div>
                          <p>Comments: {requestCommentBySREnquiry}</p>
                        </div>
                      )}
                    </div>
                  </Col>
                </div>
              )}
              <div className="col-sm-2">
                <a
                  className="tickets_links_open"
                  style={{
                    color: "black",
                    borderBottom: "1px solid",
                    fontWeight: "bold",
                  }}
                  onClick={handleCommunication}
                >
                  View Communication
                </a>
              </div>
              {handleCommunicationLink && (
                <div className="mt-2 mb-2">
                  <Row>
                    <Col xs={24} sm={24} md={16} lg={24} xxl={24}>
                      {props?.details?.status === "Closed" ? (
                        <div>
                          <p>Closed with requirements</p>
                        </div>
                      ) : props?.details?.status === "Rejected" ? (
                        <div>
                          <p>Acknowledgement</p>
                        </div>
                      ) : props?.details?.communication?.some(
                          (comm) => comm.commType !== 2
                        ) ? (
                        <>
                          <table
                            style={{
                              borderCollapse: "collapse",
                              border: "1px Solid black",
                              marginBottom: "20px",
                              width: "100%",
                            }}
                          >
                            <thead>
                              <tr>
                                <th
                                  style={{ border: "1px solid black" }}
                                  rowspan="2"
                                >
                                  Communication Type
                                </th>
                                <th
                                  style={{ border: "1px solid black" }}
                                  colspan="4"
                                >
                                  SMS
                                </th>
                              </tr>
                              <tr
                                style={{
                                  border: "1px solid black",
                                  width: "100%",
                                }}
                              >
                                <th
                                  className="px-3 py-3"
                                  style={{ border: "1px solid black" }}
                                >
                                  Send Date
                                </th>
                                <th
                                  className="px-3 py-3"
                                  style={{ border: "1px solid black" }}
                                >
                                  Delivery Status
                                </th>
                                <th
                                  className="px-3 py-3"
                                  style={{ border: "1px solid black" }}
                                >
                                  Sent Number
                                </th>
                                <th
                                  className="px-3 py-3"
                                  style={{ border: "1px solid black" }}
                                >
                                  Sms Text
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* Map over the data and render table rows */}
                              {props?.details?.communication.map(
                                (comm, index) =>
                                  comm.commType === 1 && (
                                    <tr
                                      key={index}
                                      style={{
                                        border: "1px solid black",
                                        width: "100%",
                                      }}
                                    >
                                      <td
                                        className="px-3 py-3"
                                        style={{ border: "1px solid black" }}
                                      >
                                        {comm.communication === "OPEN"
                                          ? "ACKNOWLEDGEMENT"
                                          : comm.communication === "REJECT"
                                          ? " Closed with Requirements"
                                          : "CLOSED"}
                                      </td>
                                      <td
                                        className="px-3 py-3"
                                        style={{ border: "1px solid black" }}
                                      >
                                        {comm?.sendDate
                                          ? moment(comm?.sendDate).format(
                                              "DD/MM/YYYY"
                                            )
                                          : ""}
                                      </td>
                                      <td
                                        className="px-3 py-3"
                                        style={{ border: "1px solid black" }}
                                      >
                                        {comm.deliveryStatusDesc}
                                      </td>
                                      <td
                                        className="px-3 py-3"
                                        style={{ border: "1px solid black" }}
                                      >
                                        {comm.sentNumber}
                                      </td>
                                      <td
                                        className="px-3 py-3"
                                        style={{ border: "1px solid black" }}
                                      >
                                        {/*changes done by Moxa on 14-05-2025 for failed status*/}
                                        {["sent", "failed"].includes(
                                          comm?.deliveryStatusDesc
                                            ?.trim()
                                            .toLowerCase()
                                        ) ? (
                                          <a>
                                            <b
                                              className="gridLink"
                                              onClick={() =>
                                                handleView(comm, true)
                                              }
                                            >
                                              View
                                            </b>
                                          </a>
                                        ) : (
                                          "View"
                                        )}
                                      </td>
                                    </tr>
                                  )
                              )}
                            </tbody>
                          </table>
                        </>
                      ) : (
                        <div>
                          <p>No SMS records found</p>
                        </div>
                      )}
                    </Col>

                    <Col xs={24} sm={24} md={16} lg={24} xxl={24}>
                      {props?.details?.communication &&
                      props?.details?.communication.length > 0 &&
                      props?.details?.communication.some(
                        (comm) => comm.commType === 2
                      ) ? (
                        <table
                          style={{
                            borderCollapse: "collapse",
                            border: "1px Solid black",
                            marginBottom: "20px",
                            width: "100%",
                          }}
                        >
                          <thead>
                            <tr>
                              <th
                                style={{ border: "1px solid black" }}
                                rowspan="2"
                              >
                                Communication Type
                              </th>
                              <th
                                style={{ border: "1px solid black" }}
                                colspan="4"
                              >
                                Email
                              </th>
                            </tr>
                            <tr
                              style={{
                                border: "1px solid black",
                                width: "100%",
                              }}
                            >
                              <th
                                className="px-3 py-3"
                                style={{ border: "1px solid black" }}
                              >
                                Sent Date
                              </th>
                              <th
                                className="px-3 py-3"
                                style={{ border: "1px solid black" }}
                              >
                                Delivery Status
                              </th>
                              <th
                                className="px-3 py-3"
                                style={{ border: "1px solid black" }}
                              >
                                Email Id
                              </th>
                              <th
                                className="px-3 py-3"
                                style={{ border: "1px solid black" }}
                              >
                                Email Content
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* Map over the data and render table rows */}
                            {props?.details?.communication.map(
                              (comm, index) =>
                                comm.commType === 2 && (
                                  <tr
                                    key={index}
                                    style={{ border: "1px solid black" }}
                                  >
                                    <td
                                      className="px-3 py-3"
                                      style={{ border: "1px solid black" }}
                                    >
                                      {comm.communication === "OPEN"
                                        ? "ACKNOWLEDGEMENT"
                                        : comm.communication === "REJECT"
                                        ? " Closed with Requirements"
                                        : "CLOSED"}
                                    </td>
                                    <td
                                      className="px-3 py-3"
                                      style={{ border: "1px solid black" }}
                                    >
                                      {comm?.sendDate
                                        ? moment(comm?.sendDate).format(
                                            "DD/MM/YYYY"
                                          )
                                        : ""}
                                    </td>
                                    <td
                                      className="px-3 py-3"
                                      style={{ border: "1px solid black" }}
                                    >
                                      {comm.deliveryStatusDesc}
                                    </td>
                                    <td
                                      className="px-3 py-3"
                                      style={{ border: "1px solid black" }}
                                    >
                                      {comm.sentNumber}
                                    </td>
                                    <td
                                      className="px-3 py-3"
                                      style={{ border: "1px solid black" }}
                                    >
                                      {/*changes done by Moxa on 14-05-2025 for failed status*/}
                                      {["sent", "failed"].includes(
                                        comm?.deliveryStatusDesc
                                          ?.trim()
                                          .toLowerCase()
                                      ) ? (
                                        <a>
                                          <b
                                            className="gridLink"
                                            onClick={() =>
                                              handleView(comm, false)
                                            }
                                          >
                                            View
                                          </b>
                                        </a>
                                      ) : (
                                        "View"
                                      )}
                                    </td>
                                    {/* <td className='px-3 py-3' style={{ border: '1px solid black',cursor:"pointer" }} onClick={() => handleView(comm, false)}>View</td> */}
                                  </tr>
                                )
                            )}
                          </tbody>
                        </table>
                      ) : (
                        <div>
                          <p>No Email records found</p>
                        </div>
                      )}
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={24} xxl={24}>
                      {bodyLetterData.length == 0 ? (
                        <table
                          style={{
                            borderCollapse: "collapse",
                            border: "1px Solid black",
                            marginBottom: "20px",
                          }}
                        >
                          <thead>
                            <tr>
                              <th
                                style={{ border: "1px solid black" }}
                                rowspan="2"
                              >
                                Communication Type
                              </th>
                              <th
                                style={{ border: "1px solid black" }}
                                colspan="4"
                              >
                                Letter
                              </th>
                            </tr>
                            <tr
                              style={{
                                border: "1px solid black",
                                width: "50%",
                              }}
                            >
                              <th style={{ border: "1px solid black" }}>
                                Sent Date
                              </th>
                              <th style={{ border: "1px solid black" }}>
                                Address
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {bodyLetterData.map((letter, index) => (
                              <tr
                                style={{ border: "1px solid black" }}
                                key={index}
                              >
                                <td style={{ border: "1px solid black" }}>
                                  {letter.SentDate}
                                </td>
                                <td style={{ border: "1px solid black" }}>
                                  {letter.Address}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p>No Letter Records found</p>
                      )}
                    </Col>
                  </Row>
                </div>
              )}
              <div className="col-sm-2">
                <a
                  className="tickets_links_open"
                  style={{
                    color: "black",
                    borderBottom: "1px solid",
                    fontWeight: "bold",
                  }}
                  onClick={handleRaiseEnquiry}
                >
                  Raise Enquiry
                </a>
              </div>
              {isShowRaiseEnquiry && (
                <div className="openTickets_card mt-8 mb-8">
                  <Form
                    form={reaiseenquiryform}
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
                    onFinish={saveRequest}
                    autoComplete="off"
                  >
                    <Row className="mt-8">
                      <Col
                        className="m-10"
                        xs={24}
                        sm={24}
                        md={10}
                        lg={10}
                        xxl={10}
                      >
                        <Form.Item
                          label={
                            <span>
                              Request Mode <sup>*</sup>
                            </span>
                          }
                          name="requestmode"
                          className="inputs-label mb-0"
                          rules={[
                            {
                              required: true,
                              message: "Request Mode",
                            },
                          ]}
                        >
                          <Select
                            className="cust-input calltype-select"
                            maxLength={100}
                            placeholder="Select Request Mode"
                            options={requestModeLU}
                          ></Select>
                        </Form.Item>
                      </Col>
                      <Col
                        className="m-10"
                        xs={24}
                        sm={24}
                        md={10}
                        lg={10}
                        xxl={10}
                      >
                        {props?.isEmailManagement && (
                          <Form.Item
                            label={
                              <span style={{ whiteSpace: "nowrap" }}>
                                Acknowledge SR Inquiry
                              </span>
                            }
                            name="shareAcknowledgement"
                            initialValue="on"
                            rules={[
                              {
                                required: false,
                                message: "Share Acknowledgement",
                              },
                            ]}
                          >
                            <div style={{ display: "flex", gap: "10px" }}>
                              <Tooltip title="Including Additional Note">
                                <Checkbox
                                  checked={selectedValue === "yes"}
                                  onChange={() => handleChange("yes")}
                                >
                                  Yes
                                </Checkbox>
                              </Tooltip>
                              <Checkbox
                                checked={selectedValue === "no"}
                                onChange={() => handleChange("no")}
                              >
                                No
                              </Checkbox>
                            </div>
                          </Form.Item>
                        )}
                      </Col>
                    </Row>
                    <Row className="mt-8">
                      <Col
                        className="m-10"
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        xxl={24}
                      >
                        <Form.Item
                          wrapperCol={{ span: 18 }}
                          labelCol={{ span: 6 }}
                          label={<span>Additional Note</span>}
                          name="AdditionalNoteForCustomer"
                          className="inputs-label mb-0"
                          rules={[
                            {
                              required: true,
                              message: "Requestor Comments is required",
                            },
                          ]}
                        >
                          <Input.TextArea
                            id="comments"
                            name="AdditionalNoteForCustomer"
                            className="custom-placeholder"
                            placeholder="Additional Note"
                            maxLength={500}
                            autoSize={{ minRows: 2, maxRows: 4 }}
                            value={comments}
                            onChange={handleInputChange}
                            style={{
                              marginLeft: "-122px",
                              maxWidth: "129%",
                              width: "130%",
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <div className="contact-details-btn">
                      <Button
                        type="primary"
                        className="primary-btn"
                        htmlType="submit"
                      >
                        Submit
                      </Button>
                    </div>
                  </Form>
                </div>
              )}
              <div className="col-sm-2">
                <a
                  className="tickets_links_open"
                  style={{
                    color: "black",
                    borderBottom: "1px solid",
                    fontWeight: "bold",
                  }}
                  onClick={handleAddFollowUp}
                >
                  Add Follow Up
                </a>
              </div>
              {isShowAddFollowUp && (
                <div className="openTickets_card mt-8 mb-8">
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
                    onFinish={saveAddFollowUp}
                    autoComplete="off"
                  >
                    <Row gutter={[16, 16]} className="mt-8">
                      <Col
                        className="m-10"
                        xs={24}
                        sm={24}
                        md={12}
                        lg={12}
                        xxl={12}
                      >
                        <Form.Item
                          label={
                            <span>
                              Follow Up With <sup>*</sup>
                            </span>
                          }
                          name="contact"
                          className="inputs-label mb-0"
                          rules={[
                            {
                              required: true,
                              message: "Follow Up With",
                            },
                          ]}
                        >
                          <Input
                            type="text"
                            className="cust-input custom-placeholder"
                            placeholder="Follow Up With"
                            maxLength={50}
                          />
                        </Form.Item>
                      </Col>
                      <Col
                        className="m-10 mt-8"
                        xs={24}
                        sm={24}
                        md={12}
                        lg={12}
                        xxl={12}
                      >
                        <Form.Item
                          label={
                            <span>
                              Follow Up On <sup>*</sup>
                            </span>
                          }
                          name="nextFollowUp"
                          className="inputs-label mb-0"
                          rules={[
                            {
                              required: true,
                              message: "Follow Up On",
                            },
                          ]}
                        >
                          <DatePicker
                            allowClear={true}
                            style={{ width: "100%" }}
                            className="cust-input"
                            format={dateFormat}
                            handleDate={handleDate}
                            disabledDate={(e) => featuredatedisabled(e)}
                          />
                        </Form.Item>
                      </Col>
                      <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={12}
                        xxl={12}
                        className="m-10 mt-16"
                      >
                        <div className="address-textbox">
                          <Form.Item
                            label={<span>Agenda</span>}
                            name="agenda"
                            className=""
                            rules={[
                              {
                                required: false,
                                message: "Agenda",
                              },
                              { max: 100, message: "" },
                            ]}
                          >
                            <TextArea
                              rows={4}
                              maxLength={500}
                              placeholder="Free Text 500 Characters"
                              className="ml-16 custom-placeholder"
                            />
                            {/* <TextArea
                    maxLength={100}
                    placeholder="Agenda"
                    autoSize={{ minRows: 2, maxRows: 6 }}
                  /> */}
                          </Form.Item>
                        </div>
                      </Col>
                      {/* <Col xs={12} sm={12} md={24} lg={24} xxl={24}>
            <Button
                  type="primary"
                  className="primary-btn mt-33"
                  htmlType="submit"
                 
                >
                   Submit
                </Button>
            </Col> */}
                    </Row>
                    <div className="contact-details-btn">
                      <Button
                        type="primary"
                        className="primary-btn"
                        htmlType="submit"
                      >
                        Save
                      </Button>
                    </div>
                  </Form>
                </div>
              )}
            </div>

            <div className="contact-details-btn">
              {props.ticketsData.callType === 27 &&
              props.ticketsData.subType === 4 ? (
                <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => props?.handleTicketSubmit()}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => props?.handleTicketSubmit()}
                >
                  Close
                </Button>
              )}
            </div>
            {/* </Form> */}
          </Spin>
        </div>
      </Modal>
      <Modal
        title={null} // Remove the "View Communication" title
        open={isDocumentModalOpen}
        destroyOnClose={true}
        width={800}
        closeIcon={false}
        footer={null}
      >
        <div>
            <div className="header-info">
              {firstRecord && (
                <div>
                  {!showToFromInView && (
                    <>
                      <span>To: {firstRecord.SentNumber}</span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <span>From: {firstRecord.SenderEmail}</span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </>
                  )}
                  <span>
                    <i className="bi bi-alarm"></i>: {firstRecord.SentDate}
                  </span>
                </div>
              )}
            </div>
          <div className="requirement">
            {/* Content of the service request */}
            <div dangerouslySetInnerHTML={{ __html: isViewData }}></div>
          </div>

          <div className="contact-details-btn">
            <Button
              type="primary"
              className="primary-btn"
              onClick={() => handleViewClose()}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default TicketsOpenPopup;
