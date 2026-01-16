import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Form,
  Select,
  Row,
  Col,
  Table,
  Spin,
  message,
  Checkbox,
  Space,
  Button,
  Modal,
  Tooltip,
  Input,
  DatePicker,
} from "antd";
import apiCalls from "../../api/apiCalls";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import CloseIcon from "../../assets/images/close-icon.png";
import dayjs from "dayjs";
import { filterOption } from "../../utils/HelperUtilites";
import ReusableTable from "../Common/ReusableTable";

const ComplaintsDashboard = () => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const loggedUser = useSelector((state) => state?.userProfileInfo?.profileObj);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showTotalPages, setShowTotalpages] = useState(null);
  const [callTypeLU, setCallTypeLU] = useState([]);
  const [selectedCallType, setSelectedCallType] = useState("");
  const [selectedSubType, setSelectedSubType] = useState(null);
  const [selectedCaseType, setSelectedCaseType] = useState(null);
  const [subTypeLU, setSubTypeLU] = useState([]);
  const [masterData, setMasterData] = useState([]);
  //const [selectionType, setSelectionType] = useState('checkbox');
  const [countData, setCountData] = useState({});
  const [caseStatusLU, setCaseStatusLU] = useState([]);
  const [clientIDLU, setClientIDLU] = useState([]);
  const [usersListLU, setUsersListLU] = useState([]);
  const [selectionList, setSelectionList] = useState([]);
  const [isUniqueKey, setIsUniqueKey] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState(null);
  const [userAssigned, setUserAssigned] = useState(false);
  const [tableKey, setTableKey] = useState(0); // Key to force remount
  const [isAdvanceSearchModalOpen, setIsAdvanceSearchModalOpen] =
    useState(false);
  const [Ruless, setRuless] = useState();
  const dateFormat = "DD/MM/YYYY";
  const [CALL_TyPES, setCALL_TyPES] = useState([]);
  const [requestModeLU, setRequestModeLU] = useState([]);
  const [complaintCount, setComplaintCount] = useState([]);
  const [isShowAssignCases, setIsShowAssignCases] = useState(false);
  const [assignSelectedUserName, setAssignSelectedUserName] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [ageingDetails, setAgeingDetails] = useState([]);
  const [showAgeingModal, setShowAgeingModal] = useState(false);
  const [ageingAdmindata, setAgeingAdmindata] = useState([]);
  const location = useLocation();
  const user = location.state?.user;

  const statusLU = [
    { label: "Closed", value: "closed" },
    { label: "Pending", value: "pending" },
    { label: "Closed With Requirements", value: "closedwithrequirements" },
    { label: "Failed", value: "failed" },
  ];

  const complaintTypeLU = [
    { label: "IGMS", value: "IGMS" },
    { label: "Potential", value: "Potential" },
  ];

  const statusIGMSLU = [
    { label: "New", value: "New" },
    { label: "Acknowledged", value: "Acknowledged" },
    { label: "Pending", value: "Pending" },
    { label: "Attended To", value: "Attended To" },
    { label: "Escalated", value: "Escalated" },
    { label: "Re-open", value: "Re-open" },
    { label: "Closed", value: "Closed" },
  ];

  const Agegingcolumns = [
    {
      title: "User Name",
      dataIndex: "userName",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "&lt;24 Hrs",
      dataIndex: "oneDay",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Less than 3 days",
      dataIndex: "lessThanThreeDays",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Less than 5 days",
      dataIndex: "lessThanFiveDays",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Less than 7 days",
      dataIndex: "lessThanSevenDays",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "7-15 days",
      dataIndex: "sevenToFifteenDays",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "&gt;15 days",
      dataIndex: "greaterthanFifteenDays",
      sortDirections: ["descend", "ascend"],
    },
  ];

  const handleSelectAll = () => {
    if (!isUniqueKey) {
      const allKeys = data.map((item) => item.srvReqRefNo); // must match Checkbox checked key
      setSelectedRowKeys(allKeys);
      setSelectionList(data); // store the full record list
      setIsUniqueKey(true);
    } else {
      setSelectedRowKeys([]);
      setSelectionList([]);
      setIsUniqueKey(false);
    }
  };
  const defaultColumns = [
    {
      title: (
        <Checkbox
          onChange={handleSelectAll}
          checked={selectedRowKeys.length === data.length && data.length > 0}
          indeterminate={
            selectedRowKeys.length > 0 && selectedRowKeys.length < data.length
          }
        />
      ),
      dataIndex: "select",
      key: "select",
      render: (_, record) => (
        <Checkbox
          onChange={() => onSelectChange(record)}
          checked={selectedRowKeys.includes(record.srvReqRefNo)}
        />
      ),
    },
    {
      title: "Service Request ID",
      dataIndex: "srvReqRefNo",
      key: "srvReqRefNo",
      render: (_, record) => (
        <Link
          to={`/complaintsuser/${record.srvReqRefNo}`}
          style={{ color: "black", borderBottom: "2px solid blue" }}
        >
          {record.srvReqRefNo}
        </Link>
      ),
    },
    {
      title: "Policy Number",
      dataIndex: "policyNo",
      key: "policyNo",
      // showSorterTooltip: false,
      // sorter: {
      //   compare: (a, b) => a.policyNo - b.policyNo,
      // },
    },
    {
      title: "PO Name",
      dataIndex: "pO_Name",
      key: "pO_Name",
    },

    {
      title: "Complaint Date",
      dataIndex: "complaintDate",
      key: "complaintDate",
    },
    // {
    //   title: "LA Name",
    //   dataIndex: "lA_Name",
    //   key: 'lA_Name',
    // },
    {
      title: "Call Type",
      dataIndex: "callType",
      key: "callType",
    },
    {
      title: "Sub Type",
      dataIndex: "subType",
      key: "subType",
    },
    {
      title: "Complaint Type",
      dataIndex: "compl_Type",
      key: "compl_Type",
    },
    {
      title: "Complaint Token ID",
      dataIndex: "irdA_Token_Number",
      key: "irdA_Token_Number",
    },
    {
      title: "Status",
      dataIndex: "currentStatus",
      key: "currentStatus",
    },
    {
      title: "IGMS Status",
      dataIndex: "igmsStatus",
      key: "igmsStatus",
    },
    {
      title: "Mode",
      dataIndex: "reqModeName",
      key: "reqModeName",
    },
    {
      title: "Assign To",
      dataIndex: "userId",
      editable: true,
      //   render: (text, record) => (
      //     <Select
      //  // mode="multiple"
      //   allowClear
      //   style={{ width: "100%" }}
      //   placeholder="Please select"
      //   onChange={(item)=>handleChange(item,record)}
      // >
      //    {usersListLU?.map((users, idx) => (
      //                 <Option key={idx} value={users?.userId}>
      //                   {users?.userName}
      //                 </Option>
      //               ))}
      //               </Select>
      //   ),
    },
    //     {
    //       title: "Action",
    //       dataIndex: "action",
    //       render: (_, record) => (
    //         <Space size="middle">

    // <a className="editIcon"> <i  onClick={() => saveAssignTo(record)} className="bi bi-send"></i></a>

    //          {/* <Button
    //                         type="primary"
    //                         className="primary-btn panvalidate-btn"
    //                         onClick={() => handleAction(record.serviceNo)}
    //                       >
    //                         View
    //                       </Button> */}
    //         </Space>
    //       ),
    //     },
  ];
  const columns = defaultColumns?.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        //handleSave,
      }),
    };
  });
  const tableData = [
    {
      key: 0,
      srno: 1,
      serviceNo: "DDMMYYYXXXX01",
      policyNo: "00110825",
      poName: "",
      laName: "",
      callType: "Contact Details Update",
      subType: "Mobile Number Update",
      caseStatus: "Resolved",
      payoutVlaue: "",
      clientIdType: "Corporate",
      assignTo: "Chetan",
    },
    {
      key: 1,
      srno: 2,
      serviceNo: "DDMMYYYXXXX02",
      policyNo: "00110826",
      poName: "",
      laName: "",
      callType: "Payment Related",
      subType: "Payment Link",
      caseStatus: "New Request",
      payoutVlaue: "",
      clientIdType: "Individual",
      assignTo: "",
    },
    {
      key: 2,
      srno: 3,
      serviceNo: "DDMMYYYXXXX03",
      policyNo: "00110827",
      poName: "",
      laName: "",
      callType: "Bank Details",
      subType: "Updation",
      caseStatus: "Pending",
      payoutVlaue: "",
      clientIdType: "Individual",
      assignTo: "",
    },
    {
      key: 3,
      srno: 4,
      serviceNo: "DDMMYYYXXXX04",
      policyNo: "00110828",
      poName: "",
      laName: "",
      callType: "",
      subType: "",
      caseStatus: "",
      payoutVlaue: "",
      clientIdType: "",
      assignTo: "",
    },
    {
      key: 4,
      srno: 5,
      serviceNo: "DDMMYYYXXXX05",
      policyNo: "00110829",
      poName: "",
      laName: "",
      callType: "",
      subType: "",
      caseStatus: "",
      payoutVlaue: "",
      clientIdType: "",
      assignTo: "",
    },
  ];

  const onSelectChange = (record) => {
    const isSelected = selectedRowKeys.includes(record?.srvReqRefNo);

    if (isSelected) {
      // Remove the record from selection
      const updatedKeys = selectedRowKeys.filter(
        (key) => key !== record.srvReqRefNo
      );
      const updatedList = selectionList.filter(
        (item) => item.srvReqID !== record.srvReqID
      );
      setSelectedRowKeys(updatedKeys);
      setSelectionList(updatedList);
    } else {
      // Add the record to selection
      setSelectedRowKeys((prev) => [...prev, record.srvReqRefNo]);
      setSelectionList((prev) => [...prev, record]);
    }
  };

  const shouldLog = useRef(true);
  useEffect(() => {
    if (shouldLog.current || userAssigned || user) {
      shouldLog.current = false;
      getCTST();
      getAdminData();
      getUserdData();
      getGridData();
      GetComplaintDashboardCountApi();
    }
  }, [userAssigned, user]); //eslint-disable-line react-hooks/exhaustive-deps

  // rowSelection object indicates the need for row selection
  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //   setSelectionList(selectedRows);
  //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  //   },
  // };

  const GetComplaintDashboardCountApi = () => {
    let response = apiCalls.GetComplaintDashboardCount(
      24,
      loggedUser?.userName,
      23
    );
    response
      .then((val) => {
        if (val?.data) {
          setComplaintCount(val?.data?.dashboardSummaries);
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
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  const GetAgeingCount = () => {
    let response = apiCalls.GetAgeingCount(24, null, 23);
    response
      .then((val) => {
        if (val?.data) {
          setAgeingAdmindata(val?.data);
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
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  const selectionType = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectionList(selectedRows);
      //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
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

  const getCTST = () => {
    setIsLoading(true);
    let obj = {
      MasterRequest: ["CALL_TYP", "SUB_TYP", "CASE_STATUS", "CLIENTIDTYPE"],
    };
    let CTST = apiCalls.ctst(obj);
    CTST.then((val) => {
      setMasterData(val.data);
      const transformedData1 = transformData(val.data, "CALL_TYP");
      let data = val.data?.filter((ele) => ele.key === "CALL_TYP");
      let transformedData = data[0]?.value
        .filter((ele) => ele.mstID === 24)
        .map((item) => ({
          ...item,
          label: item.mstDesc,
          value: item.mstID,
        }));
      let caseStatus = val.data?.filter((ele) => ele.key === "CASE_STATUS");
      let caseStatusData = caseStatus[0]?.value.map((item) => ({
        ...item,
        label: item.mstDesc,
        value: item.mstID,
      }));
      let clientIDs = val.data?.filter((ele) => ele.key === "CLIENTIDTYPE");
      let clientIDData = clientIDs[0]?.value.map((item) => ({
        ...item,
        label: item.mstDesc,
        value: item.mstID,
      }));
      setCallTypeLU(transformedData);
      setCALL_TyPES(transformedData1);
      setCaseStatusLU(caseStatusData);
      setClientIDLU(clientIDData);
      // setIsLoading(false);
    }).catch((err) => {
      // setIsLoading(false);
      message.destroy();
      message.error({
        content: err?.data?.responseBody?.errormessage,
        className: "custom-msg",
        duration: 2,
      });
    });
  };

  const getUserdData = async () => {
    setIsLoading(true);
    let response = apiCalls.GetPOSExecRoles();
    response
      .then((val) => {
        if (val?.data) {
          setUsersListLU(val?.data);
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
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const handleCallTypeChange = (value) => {
    setSelectedCallType(value);
    setSubTypeLU([]);
    setSelectedSubType(null);
    subTypeDropdown(value);
    form.setFieldsValue({ subType: null });
    // getGridData(value,null,selectedCaseType);
  };

  const subTypeDropdown = async (value) => {
    let SUB_TYP = masterData?.filter((ele) => ele.key === "SUB_TYP");
    let data = SUB_TYP[0]?.value?.filter((ele) => ele?.mstParentID === value);
    let transformedData = data?.map((item) => ({
      ...item,
      label: item.mstDesc,
      value: item.mstID,
    }));
    setSubTypeLU(transformedData);
  };

  const handleSubTypeChange = (e) => {
    setSelectedSubType(e);
    getGridData(selectedCallType, e, selectedCaseType);
  };
  const handleCaseStatusChange = (e) => {
    setSelectedCaseType(e);
    getGridData(selectedCallType, selectedSubType, e);
  };

  const onChange = (value) => {
    //console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    // console.log('search:', value);
  };
  const handleUserNameChange = (e) => {
    setSelectedUserName(e);
  };

  const getAdminData = async () => {
    //setIsLoading(true);
    let response = apiCalls.GetSerReqStatus(22);
    response
      .then((val) => {
        if (val?.data) {
          setCountData(val?.data?.serReqStatus);
          if (val?.data?.posAdminRoles?.length > 0) {
            setUsersListLU(val?.data?.posAdminRoles);
          }
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
        // setIsLoading(false);
      })
      .catch((err) => {
        //setIsLoading(false);
      });
  };

  const getGridData = async (
    callType,
    subType,
    caseStatus,
    PolicyNo,
    SRequestID,
    complaintsType,
    userName,
    IGMSstatus,
    assignedTo
  ) => {
    setIsLoading(true);

    try {
      const response = await apiCalls.GetSerReqByFilters(
        callType === undefined ? 24 : callType,
        subType,
        caseStatus,
        PolicyNo,
        SRequestID,
        complaintsType,
        userName,
        23,
        IGMSstatus,
        assignedTo
      );

      const result = response?.data;

      if (Array.isArray(result) && result.length > 0) {
        const newData = result.map((item, i) => ({
          ...item,
          key: i,
        }));
        setData(newData);
      } else {
        setData([]); // clear the table/grid
        message.destroy();
        message.info({
          content: "No records found for the selected criteria.",
          className: "custom-msg",
          duration: 2,
        });
      }
    } catch (err) {
      message.destroy();
      message.error({
        content: "Something went wrong. Please try again!",
        className: "custom-msg",
        duration: 2,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveAssignTo = async () => {
    // if(selectionList?.length === 0){
    //   message.destroy();
    //   message.warning("Please select atleast one record");
    //   return;
    // }
    // else
    if (!selectedUserName) {
      message.destroy();
      message.warning("Please select user name");
      return;
    }
    const filteredList = usersListLU?.filter((value) => {
      if (value && value?.usrID === selectedUserName) {
        return value.roleID;
      } else {
        return null;
      }
    });
    let obj = {
      SrvReqID: null,
      UsrID: selectedUserName || null,
      RoleID: 22,
      AllocatedOn: new Date(),
      ClosedOn: null,
      BranchID: null,
      ReqSignedOn: null,
    };
    let mappedObjects = selectionList.map((item, i) => ({
      ...obj,
      SrvReqID: item.srvReqID,
      UsrID: selectedUserName,
      ReqSignedOn: new Date(),
    }));
    setIsLoading(true);
    let response = apiCalls.saveAssignToPOS(mappedObjects);
    response
      .then((val) => {
        if (val?.data) {
          setUserAssigned(true);
          // window.location.reload();
          // After successful save, clear the selected rows
          setSelectionList([]);
          setSelectedRowKeys([]);
          setIsShowAssignCases(false);

          // Force remount of the Table component to clear the selection
          setTableKey((prevKey) => prevKey + 1);
          getCTST();
          getAdminData();
          getGridData();
          message.success("Users Assigned Successfully");
        } else {
          message.destroy();
          message.error({
            content: val?.data || "Something went wrong please try again!",
            className: "custom-msg",
            duration: 3,
          });
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const searchData = () => {
    const formData = form.getFieldsValue();
    let status = formData?.status || "";
    let complaintsType = formData?.complaintsType || "";
    let PolicyNo = formData?.PolicyNo || "";
    let userName = formData?.userName || "";
    let assignedTo = formData?.assignedTo;
    let SRequestID = formData?.serviceRequestId || "";
    let IGMSstatus = formData?.IGMSstatus;

    getGridData(
      formData?.callType === undefined ? 24 : formData?.callType,
      formData?.subType,
      status,
      PolicyNo,
      SRequestID,
      complaintsType,
      userName,
      IGMSstatus,
      assignedTo
    );
    form.resetFields();
    setIsAdvanceSearchModalOpen(false);
  };

  const handleCloseAdvance = () => {
    form.resetFields();
    setIsAdvanceSearchModalOpen(false);
  };

  const handleAssignCases = () => {
    setIsShowAssignCases(true);
  };

  // const handleSelectAll = () => {
  //   if (!isUniqueKey) {
  //     const allKeys = data.map((item) => item.srvReqRefNo); // must match Checkbox checked key
  //     setSelectedRowKeys(allKeys);
  //     setSelectionList(data); // store the full record list
  //     setIsUniqueKey(true);
  //   } else {
  //     setSelectedRowKeys([]);
  //     setSelectionList([]);
  //     setIsUniqueKey(false);
  //   }
  // };

  const handleViewUserAgeing = () => {
    setShowAgeingModal(true);
    GetAgeingCount();
  };

  const validateFromDate = (_, value) => {
    const toDate = form.getFieldValue("ToDate");

    if (!value) return Promise.resolve(); // Optional

    if (!dayjs(value, dateFormat, true).isValid()) {
      return Promise.reject("Invalid date format (DD-MM-YYYY)");
    }

    if (value.isAfter(dayjs(), "day")) {
      return Promise.reject("From Date cannot be in the future");
    }

    if (toDate && value.isAfter(toDate, "day")) {
      return Promise.reject("From Date must be ≤ To Date");
    }

    return Promise.resolve();
  };

  const validateToDate = (_, value) => {
    const fromDate = form.getFieldValue("FromDate");

    if (!value) return Promise.resolve(); // Optional

    if (!dayjs(value, dateFormat, true).isValid()) {
      return Promise.reject("Invalid date format (DD-MM-YYYY)");
    }

    if (value.isAfter(dayjs(), "day")) {
      return Promise.reject("To Date cannot be in the future");
    }

    if (fromDate && value.isBefore(fromDate, "day")) {
      return Promise.reject("To Date must be ≥ From Date");
    }

    return Promise.resolve();
  };

  return (
    <>
      <div className="w-94">
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
            //onFinish={handleSubmit}
            autoComplete="off"
          >
            <Row
              justify="center"
              className="gx-4 gy-4 d-flex justify-content-center gap-4"
            >
              {/* <Row gutter={[16, 16]} className="mb-16"> */}
              <Col xs={24} sm={24} md={12} lg={6} xxl={6}>
                <div className="dashboard-box">
                  <h5 style={{ fontWeight: "bold", marginBottom: "12px" }}>
                    Complaints Type
                  </h5>
                  <p className="dashboard-paragraph1">
                    Potential Complaint:{" "}
                    <span className="new-ticket-count">
                      {complaintCount[0]?.potentionalComplaint}
                    </span>
                  </p>
                  <p className="dashboard-paragraph1">
                    IGMS Complaint:{" "}
                    <span className="new-ticket-count">
                      {complaintCount[0]?.igmsComplaint}
                    </span>
                  </p>
                </div>
              </Col>

              <Col xs={24} sm={24} md={12} lg={6} xxl={6}>
                <div className="dashboard-box">
                  <h5 style={{ fontWeight: "bold", marginBottom: "12px" }}>
                    Potential Complaint Status
                  </h5>
                  <p className="dashboard-paragraph1">
                    Pending Tickets:{" "}
                    <span className="new-ticket-count">
                      {complaintCount[0]?.potentialPendingTicketsCount}
                    </span>
                  </p>
                  <p className="dashboard-paragraph1">
                    Closed Tickets:{" "}
                    <span className="new-ticket-count">
                      {complaintCount[0]?.potentialClosedTicketsCount}
                    </span>
                  </p>
                </div>
              </Col>

              <Col xs={24} sm={24} md={12} lg={6} xxl={6}>
                <div className="dashboard-box">
                  <h5 style={{ fontWeight: "bold", marginBottom: "12px" }}>
                    IGMS Complaints Status
                  </h5>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                  >
                    <p className="dashboard-paragraph">
                      New:{" "}
                      <span className="new-ticket-count">
                        {complaintCount[0]?.newTicketsCount}
                      </span>
                    </p>
                    <p className="dashboard-paragraph">
                      Acknowledged:{" "}
                      <span className="new-ticket-count">
                        {complaintCount[0]?.acknowledgedTicketsCount}
                      </span>
                    </p>
                    <p className="dashboard-paragraph">
                      Pending:{" "}
                      <span className="new-ticket-count">
                        {complaintCount[0]?.pendingTicketsCount}
                      </span>
                    </p>

                    <p className="dashboard-paragraph">
                      Attended To:{" "}
                      <span className="new-ticket-count">
                        {complaintCount[0]?.attendedToTicketsCount}
                      </span>
                    </p>
                    <p className="dashboard-paragraph">
                      Re-Open:{" "}
                      <span className="new-ticket-count">
                        {complaintCount[0]?.reOpenComplaintCount}
                      </span>
                    </p>
                    <p className="dashboard-paragraph">
                      Escalated:{" "}
                      <span className="new-ticket-count">
                        {complaintCount[0]?.escalatedComplaintCount}
                      </span>
                    </p>

                    <p className="dashboard-paragraph">
                      Closed:{" "}
                      <span className="new-ticket-count">
                        {complaintCount[0]?.closedComplaintCount}
                      </span>
                    </p>
                  </div>
                </div>
              </Col>

              <Col xs={24} sm={24} md={12} lg={4} xxl={4}>
                <div className="button-container mt-5">
                  <p
                    className="complain-ageing mb-2"
                    onClick={handleViewUserAgeing}
                  >
                    View User Ageing Bucket
                  </p>
                  <Button
                    type="primary"
                    className="primary-btn move-search mb-2"
                    onClick={() =>
                      setIsAdvanceSearchModalOpen(!isAdvanceSearchModalOpen)
                    }
                  >
                    Advance Search
                  </Button>

                  <Button
                    type="primary"
                    className="primary-btn move-search"
                    onClick={handleAssignCases}
                  >
                    Assign Cases
                  </Button>
                </div>
              </Col>
            </Row>

            <Modal
              title={
                <span style={{ color: "#b21f1f", fontWeight: "bold" }}>
                  Ageing Count
                </span>
              }
              open={showAgeingModal}
              destroyOnClose={true}
              closeIcon={
                <Tooltip title="Close">
                  <span onClick={() => setShowAgeingModal(false)}>
                    <img src={CloseIcon} alt=""></img>
                  </span>
                </Tooltip>
              }
              footer={null}
              width={900}
              height={500}
              className="mt-62"
            >
              <div className="ageing-modal">
                <ReusableTable
                  key={tableKey}
                  columns={Agegingcolumns}
                  data={ageingAdmindata}
                  pagination={{
                    pageSize: 10,
                    defaultPageSize: 10,
                    total: { showTotalPages },
                  }}
                />
              </div>
            </Modal>

            <Modal
              title="Assign Cases"
              open={isShowAssignCases}
              destroyOnClose={true}
              closeIcon={
                <Tooltip title="Close">
                  <span onClick={() => setIsShowAssignCases(false)}>
                    <img src={CloseIcon} alt=""></img>
                  </span>
                </Tooltip>
              }
              footer={null}
            >
              <div>
                <Form.Item
                  label="Assigned To"
                  name="assignedTo"
                  className="inputs-label mb-0"
                >
                  <Select
                    showSearch
                    placeholder="Select a Assigned To"
                    optionFilterProp="children"
                    onChange={(e) => handleUserNameChange(e)}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    style={{ width: "100%" }} // Set width to 100%
                    options={usersListLU?.map((user) => ({
                      label: user.userName,
                      value: user.usrID,
                    }))}
                  ></Select>
                  <div className="text-center modal-validate">
                    <Button
                      type="primary"
                      className="primary-btn"
                      onClick={() => saveAssignTo()}
                    >
                      Submit
                    </Button>
                    <Button
                      type="primary"
                      className="primary-btn"
                      onClick={() => setIsShowAssignCases(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form.Item>
              </div>
            </Modal>
          </Form>

          <div className="main-start">
            <div className="w-94">
              <div className="table-container dashboard">
                <ReusableTable
                  key={tableKey}
                  columns={columns}
                  data={data}
                  pagination={{
                    pageSize: 10,
                    defaultPageSize: 10,
                    total: { showTotalPages },
                  }}
                />
              </div>
            </div>
          </div>
        </Spin>
      </div>
      <Modal
        title="Advance Search"
        open={isAdvanceSearchModalOpen}
        destroyOnClose={true}
        width={500}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => handleCloseAdvance()}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        {/* <Card title="Apply Filters" className="mb-16 text-center"> */}
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
          form={form}
          onFinish={searchData}
          autoComplete="off"
        >
          <Row gutter={[12, 12]} className="mb-16">
            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                name="PolicyNo"
                label="Policy No"
                className="inputs-label mb-0"
                rules={[
                  {
                    required: false,
                  },
                  {
                    validator: (_, value) => {
                      if (!value || value.trim() === "") {
                        return Promise.resolve(); // Optional
                      }

                      const trimmedValue = value.trim();
                      const alphanumericPattern = /^[A-Za-z0-9]{1,8}$/;

                      if (!alphanumericPattern.test(trimmedValue)) {
                        return Promise.reject(
                          "Only alphanumeric characters (A–Z, 0–9) are allowed. No spaces or special characters."
                        );
                      }

                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  placeholder="Enter Policy No"
                  className="cust-input modal-input"
                  maxLength={8}
                  onBlur={(e) => {
                    e.target.value = e.target.value.trim();
                  }}
                  onKeyPress={(e) => {
                    const isValid = /^[A-Za-z0-9]$/.test(e.key);
                    if (!isValid) {
                      e.preventDefault(); // block special characters & spaces
                    }
                  }}
                />
              </Form.Item>
            </Col>

            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                name="serviceRequestId"
                label="Service Request ID"
                className="inputs-label mb-0"
                rules={[
                  {
                    required: false,
                  },
                  {
                    validator: (_, value) => {
                      if (!value || value.trim() === "") {
                        return Promise.resolve(); // Optional
                      }

                      const trimmedValue = value.trim();
                      const alphanumericPattern = /^[A-Za-z0-9]+$/;

                      if (!alphanumericPattern.test(trimmedValue)) {
                        return Promise.reject(
                          "Only alphanumeric characters (A–Z, 0–9) are allowed. No spaces or special characters."
                        );
                      }

                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  placeholder="Enter Service Request ID"
                  className="cust-input modal-input"
                  maxLength={100}
                  onBlur={(e) => {
                    e.target.value = e.target.value.trim();
                  }}
                  onKeyPress={(e) => {
                    const isValid = /^[A-Za-z0-9]$/.test(e.key);
                    if (!isValid) {
                      e.preventDefault(); // prevent invalid characters
                    }
                  }}
                />
              </Form.Item>
            </Col>

            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                label="From Date"
                name="FromDate"
                rules={[{ validator: validateFromDate }]}
              >
                <DatePicker
                  allowClear
                  style={{ width: "100%" }}
                  format={dateFormat}
                />
              </Form.Item>
            </Col>
            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                label="To Date"
                name="ToDate"
                rules={[{ validator: validateToDate }]}
              >
                <DatePicker
                  allowClear
                  style={{ width: "100%" }}
                  format={dateFormat}
                />
              </Form.Item>
            </Col>

            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                label="Call Type"
                name="callType"
                className="inputs-label mb-"
              >
                <Select
                  showSearch
                  allowClear={true}
                  className="cust-input"
                  maxLength={100}
                  placeholder="Select Call Type"
                  onSearch={onSearch}
                  options={callTypeLU}
                  filterOption={filterOption}
                  onChange={(value, option) =>
                    handleCallTypeChange(value, option)
                  }
                ></Select>
              </Form.Item>
            </Col>
            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                label="Sub Type"
                name="subType"
                className="inputs-label mb-0 subtype right-colsize"
              >
                <Select
                  showSearch
                  allowClear={true}
                  className="cust-input calltype-select"
                  maxLength={100}
                  placeholder="Select Sub Type"
                  onSearch={onSearch}
                  options={subTypeLU}
                  filterOption={filterOption}
                  //onChange={(e) => {handleSubTypeChange(e); }}
                ></Select>
              </Form.Item>
            </Col>
            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                label="Complaints Type"
                name="complaintsType"
                className="inputs-label mb-0"
              >
                <Select
                  showSearch
                  allowClear={true}
                  className="cust-input"
                  maxLength={100}
                  placeholder="Select Complaints Type"
                  options={complaintTypeLU}
                  filterOption={filterOption}
                ></Select>
              </Form.Item>
            </Col>
            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                label="Status"
                name="status"
                className="inputs-label mb-0 subtype right-colsize"
              >
                <Select
                  showSearch
                  allowClear={true}
                  className="cust-input calltype-select"
                  maxLength={100}
                  placeholder="Select Status"
                  options={statusLU}
                  filterOption={filterOption}
                ></Select>
              </Form.Item>
            </Col>
            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                label="IGMS Status"
                name="IGMSstatus"
                className="inputs-label mb-0 subtype right-colsize"
              >
                <Select
                  showSearch
                  allowClear={true}
                  className="cust-input calltype-select"
                  maxLength={100}
                  placeholder="Select Status"
                  options={statusIGMSLU}
                  filterOption={filterOption}
                ></Select>
              </Form.Item>
            </Col>

            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                label="Assigned To"
                name="assignedTo"
                className="inputs-label mb-0"
              >
                <Select
                  showSearch
                  placeholder="Select a Assigned To"
                  optionFilterProp="children"
                  onChange={(e) => handleUserNameChange(e)}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  style={{ width: "100%" }} // Set width to 100%
                  options={usersListLU?.map((user) => ({
                    label: user.userName,
                    value: user.usrID,
                  }))}
                ></Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item className="mb-0">
                <div className="d-flex justify-end">
                  <Button
                    type="primary"
                    className="primary-btn mr-12"
                    htmlType="submit"
                  >
                    Search
                  </Button>{" "}
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {/* </Card> */}
      </Modal>
    </>
  );
};

export default ComplaintsDashboard;
