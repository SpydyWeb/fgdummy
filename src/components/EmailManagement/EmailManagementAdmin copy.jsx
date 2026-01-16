import React, { useEffect, useState } from "react";
import {
  Card,
  Switch,
  Col,
  DatePicker,
  Form,
  Row,
  Space,
  message,
  Spin,
  Select,
  Button,
  Modal,
  Tooltip,
} from "antd";
import dayjs from "dayjs";
import apiCalls from "../../api/apiCalls";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PopupAlert from "../popupAlert";
import { useLocation } from "react-router-dom";
import moment from "moment";
import CloseIcon from "../../assets/images/close-icon.png";
import emsdownloadicon from "../../assets/images/ems-download-icon.svg";
import ReusableTable from "../Common/ReusableTable";
import { filterOption } from "../../utils/HelperUtilites";
import { useEmailTATCasesQuery } from "../../hooks/useEmailTATCasesQuery";
import { useEmailDashboardQuery } from "../../hooks/useEmailDashboardQuery";

const EmailManagementAdmin = () => {
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const loggedUser = useSelector((state) => state?.userProfileInfo?.profileObj);
  const [showTotalPages, setShowTotalpages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectionList, setSelectionList] = useState([]);
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [UsersData, setUsersData] = useState([]);
  const [ReassigneData, setReassigneData] = useState([]);
  const [ClosedCasesWithinTAT, setClosedCasesWithinTAT] = useState("");
  const [ClosedCasesOutsideTAT, setClosedCasesOutsideTAT] = useState("");
  const [OpenCasesWithinTAT, setOpenCasesWithinTAT] = useState("");
  const [OpenCasesOutsideTAT, setOpenCasesOutsideTAT] = useState("");
  const [isLOBChecked, setIsLOBChecked] = useState(false);
  const [UnAttendedMailsWithinTAT, setUnAttendedMailsWithinTAT] = useState("");
  const [UnAttendedMailsOutsideTAT, setUnAttendedMailsOutsideTAT] =
    useState("");
  const [isNoData, setIsNoData] = useState("");
  const [isUsersData, setIsUsersData] = useState([]);
  const [alertData, setAlertData] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [Ticketstatus, setTicketStatus] = useState("");
  const [isFollowUpListModal, setIsFollowUpListModal] = useState(false);
  const [isFollowUpsLoader, setIsFollowUpsLoader] = useState(false);
  const [followUpData, setFollowUpData] = useState([]);
  const [isTatData, setIsTatData] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [selectedCallType, setSelectedCallType] = useState("");
  const { RangePicker } = DatePicker;

  const location = useLocation();
  const user = location.state?.user;
  const [tatQueryParams, setTatQueryParams] = useState({
    formData: {},
    assignedUser: null,
    roleName: loggedUser.roleName,
  });
  useEffect(() => {
    // EmailManagementDashBoardFilters("");
    // TATCasesForEmailMng();
    // EmailManagementUsersData();
    searchData();
  }, [user]);

  const { data: tatData, refetch: refetchTAT } =
    useEmailTATCasesQuery(tatQueryParams);
  const { data: EmailDashboardData } = useEmailDashboardQuery({
  RoleId: "20",
  UserName: user,
});
  const formItemLayout2 = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      sorter: (a, b) => a.userName?.length - b.userName?.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title:
        Ticketstatus === "OPEN"
          ? "Open Emails"
          : Ticketstatus === "CLOSED"
          ? "Closed Emails"
          : Ticketstatus === "ALL"
          ? "All Emails"
          : " New Emails",
      dataIndex: "openEmailsCount",
      // key: "serviceNo",
      // sorter: (a, b) => a.from.length - b.from.length,
      // sortDirections: ["descend", "ascend"],
      sorter: (a, b) => a.openEmailsCount?.length - b.openEmailsCount?.length,
      sortDirections: ["descend", "ascend"],
      render: (_, record) => (
        <Space size="middle">
          <a className="hyperLink" onClick={() => handleAction(record)}>
            {record?.emailWithinTat + record?.emailOutsideTAT}{" "}
          </a>
        </Space>
      ),
    },
    {
      title: "Within TAT",
      dataIndex: "emailWithinTat",
      sorter: (a, b) => a.emailWithinTat?.length - b.emailWithinTat?.length,
      sortDirections: ["descend", "ascend"],
    },
    // {
    //   title: "On TAT",
    //   dataIndex: "onTat",
    // },
    {
      title: "Outside TAT",
      dataIndex: "emailOutsideTAT",
      sorter: (a, b) => a.emailOutsideTAT?.length - b.emailOutsideTAT?.length,
      sortDirections: ["descend", "ascend"],
    },
    // {
    //   title: "Tickets Pending Closure",
    //   dataIndex: "emailAgeing",

    // },

    // {
    //   title: "Attendance Status",
    //   dataIndex: "attendance",

    //   render: (_, record, index) => (
    //     <Space size="middle">
    //       <Switch
    //         checked={record.attendance}
    //         onChange={(checked) => handleAttendanceChange(checked,index, record)}
    //         checkedChildren="Present"
    //         unCheckedChildren="Absent"
    //       />
    //     </Space>
    //   ),

    //   sortDirections: ["descend", "ascend"],
    // },
  ];

  const handleAction = (item) => {
    let obj = {
      isUser: true,
      item: item,
      TicketStatus: form.getFieldValue().selectedStatus,
    };
    navigate(`/emailuser/${item?.usrID}`, { state: obj });
  };

  const handleAttendanceChange = () => {
    let Feilds = form3.getFieldsValue();
    if (!Feilds?.selectedUser) {
      message.destroy();
      message.warning("Select User ");
      return;
    }
    setIsLoading(true);
 

    let obj = {
      UserName: Feilds?.selectedUser,
      Status: isLOBChecked,
    };
    let response = apiCalls.EmailMgAttendence(obj);
    response
      .then((val) => {
        if (val?.data) {
          message.success({
            content:
              val?.data?.responseBody?.errormessage ||
              "Record Updated Successfully",
            className: "custom-msg",
            duration: 2,
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
        // setIsLoader(false);
      });
  };

  const statusLU = [
    { label: "NEW", value: "NEW" },
    { label: "OPEN", value: "OPEN" },
    { label: "CLOSED", value: "CLOSED" },
    { label: "ALL", value: "ALL" },
  ];

  const reassignTicketsFrom = (val) => {
    let ReassigneData = UsersData.filter((ele) => {
      return ele.value !== val;
    });
    setReassigneData(ReassigneData);
    form2.setFieldsValue({
      ReassignTo: "",
    });
  };

  const handleDownloadExcelClick = async () => {
    let formData = form.getFieldValue();
    setIsLoading(true);
    let obj = {
      ReceivedFromDt: formData?.FromDate
        ? convertDate(new Date(formData?.FromDate))
        : "",
      ReceivedToDt: formData?.ToDate
        ? convertDate(new Date(formData?.ToDate))
        : "",
      AssignedTo: null,
      DisplayScreen:
        loggedUser.roleName === "Email Admin" ? "EmailAdmin" : null,
      PolicyNo: "",
      SenderMailID: "",
      Status:
        formData.selectedStatus === undefined ? "ALL" : formData.selectedStatus,
    };

    try {
      const response = await apiCalls.getInvalidPolicyExcel(obj);

      if (response.data && response.data.fileContent) {
        downloadExcel(response.data.fileContent, response.data.fileName);
        setIsLoading(false);
      } else {
        console.error("Invalid response format", response);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching Excel file:", error);
      setIsLoading(false);
    }
  };

  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate).format("YYYY-MM-DD"); // ISO 8601 date format
    return formattedDate;
  };

  const handleDownloadClick = async () => {
    setIsLoading(true);
    let formData = form.getFieldValue();
    let obj = {
      ReceivedFromDt: formData?.FromDate
        ? convertDate(new Date(formData?.FromDate))
        : "",
      ReceivedToDt: formData?.ToDate
        ? convertDate(new Date(formData?.ToDate))
        : "",
      AssignedTo: null,
      DisplayScreen:
        loggedUser.roleName === "Email Admin" ? "EmailAdmin" : null,
      PolicyNo: "",
      SenderMailID: "",
      Status:
        formData.selectedStatus === undefined ? "ALL" : formData.selectedStatus,
    };

    try {
      const response = await apiCalls.GetEmailResponseExcel(obj);

      if (response.data && response.data.fileContent) {
        downloadExcel(response.data.fileContent, response.data.fileName);
        setIsLoading(false);
      } else {
        console.error("Invalid response format", response);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching Excel file:", error);
      setIsLoading(false);
    }
  };

  // Function to download the Base64-encoded file
  const downloadExcel = (base64Data, fileName) => {
    const byteCharacters = atob(base64Data); // Decode Base64
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName || "EmailResponse.xlsx"; // Default filename if missing
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const SaveFollowUpsData = async (selectedObj) => {
    setIsFollowUpListModal(true);
    setIsFollowUpsLoader(true);
    selectedObj.CompleteByDt = new Date();
    const response = await apiCalls.SaveFollowUps(selectedObj);
    if (response?.data) {
      message.destroy();
      message.success({
        content: "Follow Up Request Closed!.",
        className: "custom-msg",
        duration: 2,
      });
      setIsFollowUpsLoader(false);
      setIsFollowUpListModal(false);
    } else {
      message.destroy();
      setIsFollowUpsLoader(false);
      setIsFollowUpListModal(true);
      message.error({
        content:
          response?.data?.responseBody?.errormessage ||
          "Something went wrong, please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  };


  const EmailManagementDashBoardFilters = (val) => {
    // let ReassigneData =  UsersData.filter((ele)=>{
    //   return ele.value !== val
    // });
    //  setReassigneData(ReassigneData);
    setIsLoading(true);
    let obj = {
      RoleId: "20",
      UserName: val,
    };
    let response = apiCalls.EmailManagementDashBoardFilters(obj);
    response
      .then((val) => {
        //
        if (val?.data) {
          let transformedData = val?.data?.users?.map((item) => ({
            ...item,
            label: item.userName,
            value: item.usrID,
          }));

          setUsersData(transformedData);
          const newData = val?.data?.emailMags?.map((item, i) => ({
            ...item,
            key: i,
          }));
          setReassigneData(transformedData);
          // setEmailManagementDashBoardData(newData);
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
        // setIsLoader(false);
      });
  };

  const getDashboardFollowUpData = async (selectedFollowUpVal) => {
    setIsFollowUpListModal(true);
    setIsFollowUpsLoader(true);
    const response = await apiCalls.getDashboardFollowUps(selectedFollowUpVal);
    if (response?.data?.length > 0) {
      setFollowUpData(response?.data);
      setIsFollowUpsLoader(false);
    } else {
      message.destroy();
      setFollowUpData([]);
      setIsFollowUpsLoader(false);
      message.error({
        content:
          response?.data?.responseBody?.errormessage ||
          "Smoething went wrong please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  };

  const searchData = async (selectedVal, includeCloseSR) => {
    //setIsAdvanceSearchModalOpen(false);
    setIsLoading(true);
    const formData = form.getFieldsValue();
    const fromDate = formData.FormDate
      ? formData.FormDate.format("YYYY-MM-DD")
      : "";
    const toDate = formData.ToDate ? formData.ToDate.format("YYYY-MM-DD") : "";
    const PolicyNo = formData.PolicyNo
      ? formData.PolicyNo.toLowerCase().trim()
      : "";

    let obj = {
      fromDate: fromDate || "",
      toDate: toDate || "",
      policyNumber: PolicyNo,
      userId: loggedUser.userName,
      role: loggedUser.role,
      callType: selectedCallType || "",
      subType: formData?.subType || "",
      mode: formData?.mode,
      status: formData?.status == undefined ? "PENDING" : formData?.status,
      ageing: formData?.ageing,
      assignedTo: formData?.assignedTo,
    };

    const response = await apiCalls.getBOEUserDashboard(obj, includeCloseSR);
    if (response?.status === 200) {
      setIsDataLoading(false);
      setIsTatData(response?.data);

      setIsLoading(false);
    } else {
      setData({});
      setIsDataLoading(false);
      setIsLoading(false);
      message.destroy();
      message.error({
        content:
          response?.data?.responseBody?.errormessage ||
          "Something went wrong please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  };

  const ReAssign = () => {
    setIsLoading(true); // Enable loader

    let data = form2.getFieldsValue();

    if (!data?.reassignTo) {
      setIsLoading(false);
      message.destroy();
      message.warning("Select User to Reassign");
      return;
    }

    if (!data?.reassignFrom) {
      setIsLoading(false);
      message.destroy();
      message.warning("Select User");
      return;
    }

    let obj = {
      UserName: data?.reassignFrom,
      ReassignUserName: data?.reassignTo,
    };

    apiCalls
      .EmailAssignToUser(obj)
      .then((val) => {
        if (val?.data) {
          // Success logic
          console.log("API call successful:", val?.data);
          setAlertTitle("Reassign done successfully");
          setAlertData("Reassign done successfully");
          setNavigateTo("/emailadmin/");
          setShowAlert(true);
        } else {
          message.error({
            content:
              val?.data?.responseBody?.errormessage ||
              "Something went wrong. Please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
        setIsLoading(false); // Disable loader
      })
      .catch((err) => {
        setIsLoading(false); // Disable loader on error
        console.error("API error:", err);
        message.error({
          content: "An error occurred. Please try again!",
          className: "custom-msg",
          duration: 2,
        });
      });
  };

  // const TATCasesForEmailMng = (userNameID) => {
  //   let formData = form.getFieldValue();
  //   setIsLoading(true);
  //   // let response = apiCalls.TATCasesForEmailMng();
  //   let obj = {
  //     ReceivedFromDt: formData?.FromDate
  //       ? convertDate(new Date(formData?.FromDate))
  //       : "",
  //     ReceivedToDt: formData?.ToDate
  //       ? convertDate(new Date(formData?.ToDate))
  //       : "",
  //     AssignedTo: userNameID || null,
  //     DisplayScreen:
  //       loggedUser.roleName === "Email Admin" ? "EmailAdmin" : null,
  //     PolicyNo: "",
  //     SenderMailID: "",
  //     Status:
  //       formData.selectedStatus == undefined ? "OPEN" : formData.selectedStatus,
  //   };
  //   let response = apiCalls.getEmailManagementFilter(obj);
  //   response
  //     .then((val) => {
  //       if (val?.data) {
  //         let transformedData = val?.data?.userSummary?.map((item) => ({
  //           ...item,
  //           label: item.userName,
  //           value: item.usrID,
  //         }));

  //         setUsersData(transformedData);
  //         setIsUsersData(val?.data?.userSummary);
  //         if (Array.isArray(val?.data?.emailSummary)) {
  //           val?.data?.emailSummary.forEach((ele) => {
  //             if (ele.emailTat === "OpenCasesWithinTAT") {
  //               setOpenCasesWithinTAT(ele.tatCount);
  //             } else if (ele.emailTat === "OpenCasesOutsideTAT") {
  //               setOpenCasesOutsideTAT(ele.tatCount);
  //             } else if (ele.emailTat === "ClosedCasesWithinTAT") {
  //               setClosedCasesWithinTAT(ele.tatCount);
  //             } else if (ele.emailTat === "ClosedCasesOutsideTAT") {
  //               setClosedCasesOutsideTAT(ele.tatCount);
  //             } else if (ele.emailTat === "UnAttendedMailsWithinTAT") {
  //               setUnAttendedMailsWithinTAT(ele.tatCount);
  //             } else if (ele.emailTat === "UnAttendedMailsOutsideTAT") {
  //               setUnAttendedMailsOutsideTAT(ele.tatCount);
  //             }
  //           });
  //         }
  //         setIsLoading(false);
  //       } else {
  //         setIsNoData("nodata");
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
  // };

  // const EmailManagementUsersData = () => {
  //   setIsLoading(true);
  //   let obj = {
  //     RoleId: "21",
  //     UserName:
  //       loggedUser?.userName === "emailuser"
  //         ? "EmailUser1"
  //         : loggedUser?.userName,
  //   };
  //   let response = apiCalls.EmailManagementDashBoardFilters(obj);
  //   response
  //     .then((val) => {
  //       //
  //       if (val?.data) {
  //         let transformedData = val?.data?.users?.map((item) => ({
  //           ...item,
  //           label: item.userName,
  //           value: item.usrID,
  //         }));

  //         setUsersData(transformedData);
  //         setReassigneData(transformedData);
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
  //       // setIsLoader(false);
  //     });
  // };

  const handleLOBSwitchChange = (checked) => {
    setIsLOBChecked(checked);
  };

  const selectionType = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectionList(selectedRows);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  return (
    <>
      <div className="">
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
            <Spin spinning={isLoading}>
              <div className="m-20">
                <Row gutter={[16, 16]} className="mb-16">
                  {/* New Emails */}
                  <Col xs={24} sm={24} md={12} lg={6} xxl={6}>
                    <div>
                      {isNoData !== "nodata" ? (
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>New Emails</th>
                              <th>
                                {tatData?.UnAttendedMailsWithinTAT +
                                  tatData?.UnAttendedMailsOutsideTAT}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Within TAT</td>
                              <td>{tatData?.UnAttendedMailsWithinTAT}</td>
                            </tr>
                            <tr>
                              <td>Outside TAT</td>
                              <td>{tatData?.UnAttendedMailsOutsideTAT}</td>
                            </tr>
                          </tbody>
                        </table>
                      ) : (
                        <div className="text-center">No Data Found</div>
                      )}
                    </div>
                  </Col>

                  {/* Open Emails */}
                  <Col xs={24} sm={24} md={12} lg={6} xxl={6}>
                    <div>
                      {isNoData !== "nodata" ? (
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Open Mails</th>
                              <th>
                                {tatData?.OpenCasesWithinTAT +
                                  tatData?.OpenCasesOutsideTAT}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Within TAT</td>
                              <td>{tatData?.OpenCasesWithinTAT}</td>
                            </tr>
                            <tr>
                              <td>Outside TAT</td>
                              <td>{tatData?.OpenCasesOutsideTAT}</td>
                            </tr>
                          </tbody>
                        </table>
                      ) : (
                        <div className="text-center">No Data Found</div>
                      )}
                    </div>
                  </Col>

                  {/* Closed Emails */}
                  <Col xs={24} sm={24} md={12} lg={6} xxl={6}>
                    <div>
                      {isNoData !== "nodata" ? (
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Closed Emails</th>
                              <th>
                                {tatData?.ClosedCasesWithinTAT +
                                  tatData?.ClosedCasesOutsideTAT}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Within TAT</td>
                              <td>{tatData?.ClosedCasesWithinTAT}</td>
                            </tr>
                            <tr>
                              <td>Outside TAT</td>
                              <td>{tatData?.ClosedCasesOutsideTAT}</td>
                            </tr>
                          </tbody>
                        </table>
                      ) : (
                        <div className="text-center">No Data Found</div>
                      )}
                    </div>
                  </Col>

                  {/* Follow Ups */}
                  <Col xs={24} sm={24} md={12} lg={6} xxl={6}>
                    <div>
                      {isNoData !== "nodata" ? (
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Follow Ups</th>
                              <th>
                                {isTatData?.followUpsDueToday +
                                  isTatData?.followUpsOpen ?? "XX"}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Due Today</td>
                              <td
                                onClick={() =>
                                  getDashboardFollowUpData("FollowUpsDueToday")
                                }
                              >
                                {isTatData?.followUpsDueToday ?? "XX"}
                              </td>
                            </tr>
                            <tr>
                              <td>Open</td>
                              <td
                                onClick={() =>
                                  getDashboardFollowUpData("FollowUpsOpen")
                                }
                              >
                                {isTatData?.followUpsOpen ?? "XX"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ) : (
                        <div className="text-center">No Data Found</div>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>

              <div
                className="table-container table-responsive email-managedashboard"
                style={{ background: "#f2f2f2", padding: "30px" }}
              >
                {/* Section 1: Filter Fields */}
                <Card className="mb-3" size="small">
                  <Form form={form1} layout="vertical">
                    <Row gutter={[16, 12]}>
                      <Col xs={24} sm={12} md={6}>
                        <Form.Item name="filterUser" label="User Name">
                          <Select
                            showSearch
                            allowClear
                            placeholder="Select User"
                            options={tatData?.users ||EmailDashboardData?.usersData|| []}
                            filterOption={filterOption}
                            onChange={(value) => {
                              const updatedFormData = {
                                ...form.getFieldsValue(),
                                emailSource: value || null,
                              };

                              form.setFieldsValue(updatedFormData);

                              setTatQueryParams((prev) => ({
                                ...prev,
                                assignedUser: value || null,
                                formData: updatedFormData,
                              }));
                            }}
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={12} md={6}>
                        <Form.Item name="selectedStatus" label="Status">
                          <Select
                            showSearch
                            allowClear
                            placeholder="Select Status"
                            options={statusLU}
                            filterOption={filterOption}
                            onChange={(value) => {
                              form.setFieldsValue({
                                selectedStatus: value || null,
                              });
                              setTicketStatus(value);
                              //TATCasesForEmailMng(form.getFieldValue("filterUser"));
                            }}
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="filterDateRange"
                          label="Date Range"
                          rules={[
                            {
                              required: true,
                              message: "Please select a date range",
                            },
                          ]}
                        >
                          <RangePicker
                            format="DD-MM-YYYY"
                            allowClear
                            style={{ width: "100%" }}
                            disabledDate={(current) =>
                              current && current > dayjs().endOf("day")
                            }
                             onChange={(dates) => {
                              const updatedFormData = {
                                ...form.getFieldsValue(),
                                FromDate: dates?.[0] || null,
                                ToDate: dates?.[1] || null,
                              };

                              form.setFieldsValue(updatedFormData);

                              setTatQueryParams((prev) => ({
                                ...prev,
                                formData: updatedFormData,
                              }));
                            }}
                          />
                        </Form.Item>
                      </Col>

                      <Col
                        xs={24}
                        sm={12}
                        md={4}
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}
                      >
                        <Tooltip title="Detailed Report">
                          <a
                            onClick={handleDownloadClick}
                            style={{ marginRight: "20px", cursor: "pointer" }}
                          >
                            <img
                              src={emsdownloadicon}
                              width="24"
                              height="24"
                              alt="Download"
                            />
                          </a>
                        </Tooltip>
                        <Tooltip title="Mails From Unregistered ID">
                          <a
                            onClick={handleDownloadExcelClick}
                            style={{ cursor: "pointer" }}
                          >
                            <img
                              src={emsdownloadicon}
                              width="24"
                              height="24"
                              alt="Download Excel"
                            />
                          </a>
                        </Tooltip>
                      </Col>
                    </Row>
                  </Form>
                </Card>

                {/* Section 2: Reassign Fields */}
                <Card size="small" className="mb-3">
                  <Form
                    form={form2}
                    layout="vertical"
                    onFinish={ReAssign}
                    autoComplete="off"
                  >
                    <Row gutter={[16, 12]}>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="reassignFrom"
                          label="Reassign Tickets From"
                          rules={[
                            { required: true, message: "Please Select User" },
                          ]}
                        >
                          <Select
                            showSearch
                            placeholder="Select User"
                            options={tatData?.users||EmailDashboardData?.usersData || []}
                            onChange={reassignTicketsFrom}
                            filterOption={filterOption}
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          name="reassignTo"
                          label="Reassign Tickets To"
                          rules={[
                            { required: true, message: "Please Select User" },
                          ]}
                        >
                          <Select
                            showSearch
                            placeholder="Select User"
                            options={tatData?.users ||EmailDashboardData?.usersData|| []}
                            filterOption={filterOption}
                          />
                        </Form.Item>
                      </Col>

                      <Col
                        xs={24}
                        sm={12}
                        md={8}
                        style={{ display: "flex", alignItems: "flex-end" }}
                      >
                        <Form.Item style={{ width: "100%" }}>
                          <Button
                            type="primary"
                            htmlType="submit"
                            block
                            className="primary-btn"
                          >
                            Re-Assign
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Card>

                <ReusableTable
                  columns={columns}
                  data={tatData?.rawUsers || []}
                  pagination={{
                    pageSize: 10,
                    defaultPageSize: 10,
                    total: { showTotalPages },
                  }}
                />
              </div>

              <div className="m-20">
                <Card className="mb-16">
                  <Form
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
                    form={form3}
                    onFinish={handleAttendanceChange}
                    autoComplete="off"
                  >
                    <Row gutter={[16, 16]} className="mb-16">
                      <Col xs={24} sm={12} md={8} lg={8} xxl={8}>
                        <div>
                          <Form.Item
                            name="selectedUser"
                            label="Mark Absent/ Present"
                            {...formItemLayout2}
                          >
                            <Select
                              showSearch
                              className="cust-input calltype-select"
                              maxLength={100}
                              placeholder="Select User"
                              options={UsersData}
                              name="emailSource"
                              filterOption={filterOption}
                              rules={[
                                {
                                  required: true,
                                  message: "Please Select User",
                                },
                              ]}
                              onChange={(value) => {
                                form.setFieldsValue({ emailSource: value });
                              }}
                            ></Select>
                          </Form.Item>
                        </div>
                      </Col>
                      <Col xs={24} sm={12} md={3} lg={3} xxl={3}>
                        <Switch
                          checked={isLOBChecked}
                          onChange={handleLOBSwitchChange}
                          checkedChildren="Present"
                          unCheckedChildren="Absent"
                          className="custom-switch"
                          // style={{ height: "100%" }}
                        />
                      </Col>

                      <Col xs={24} sm={12} md={6} lg={6} xxl={6}>
                        <Form.Item className="mb-0">
                          <Button
                            type="primary"
                            className="primary-btn"
                            htmlType="submit"
                          >
                            Submit
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Card>
              </div>
            </Spin>
          </Col>
        </Row>
        {showAlert && (
          <PopupAlert
            alertData={alertData}
            title={alertTitle}
            navigate={navigateTo}
            setShowAlert={setShowAlert}
          ></PopupAlert>
        )}
      </div>

      <Modal
        title="Follow Up List"
        open={isFollowUpListModal}
        destroyOnClose={true}
        width={1200}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setIsFollowUpListModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="table-container">
          <Spin spinning={isFollowUpsLoader}>
            <table className="responsive-table">
              <thead>
                <tr>
                  <th>Policy No</th>
                  <th>Ticket No</th>
                  <th>Call Type/Sub Type</th>
                  <th>Follow Up With</th>
                  <th>Agenda</th>
                  <th>Follow Up Date</th>
                  <th>Ageing</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {followUpData?.length > 0 ? (
                  followUpData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.policyNo}</td>
                      <td>{row.srvReqRefNo}</td>
                      <td>
                        {row.callType}/{row.subType}
                      </td>
                      <td>{row.contactPerson}</td>
                      <td>{row.agenda}</td>
                      <td>
                        {row.nxtFollowUpDt
                          ? moment
                              .utc(row.nxtFollowUpDt)
                              .local()
                              .format("DD/MM/YYYY")
                          : ""}
                      </td>
                      <td>{row.ageing}</td>
                      <td>
                        <Button
                          className="my-button"
                          onClick={() => SaveFollowUpsData(row)}
                        >
                          Close
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">
                      {" "}
                      {/* Ensure colspan matches the number of <td> elements */}
                      <div className="text-center">
                        <span>No data available</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Spin>
        </div>
      </Modal>
    </>
  );
};

export default EmailManagementAdmin;
