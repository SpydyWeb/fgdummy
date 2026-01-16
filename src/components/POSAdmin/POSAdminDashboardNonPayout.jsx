import React, { useEffect, useMemo, useState } from "react";
import {
  Spin,
  message,
  Row,
  Col,
  Form,
  DatePicker,
  Checkbox,
  Button,
  Input,
  Table,
  Space,
  Card,
  Select,
  Modal,
  Tooltip,
} from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import apiCalls from "../../api/apiCalls";
import { NumericFormat } from "react-number-format";
import { connect } from "react-redux";
import { sentDetailsObj } from "../../reducers/policyDetailsReducer";
import { useData } from "../../reducers/DataContext";
import { useSelector } from "react-redux";
import CloseIcon from "../../assets/images/close-icon.png";
import { useLocation } from "react-router-dom";
import { filterOption, transformData } from "../../utils/HelperUtilites";
import { useCTSTQuery } from "../../hooks/useCTSTQuery";

const POSAdminDashboardNonPayOut = (props) => {
  const loggedUser = useSelector((state) => state?.userProfileInfo?.profileObj);
  const { sharedData } = useData();
  const { Option } = Select;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const dateFormat = "DD/MM/YYYY";
  const [tableKey, setTableKey] = useState(0); // Key to force remount
  const [selectionList, setSelectionList] = useState([]);
  const [showTotalPages, setShowTotalpages] = useState(null);
  const [countData, setCountData] = useState([]);
  const [usersListLU, setUsersListLU] = useState([]);
  const [Ruless, setRuless] = useState();
  const [CALL_TyPES, setCALL_TyPES] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [requestModeLU, setRequestModeLU] = useState([]);
  const [subTypeLU, setSubTypeLU] = useState(null);
  const [SelectedSubTypeVal, setSelectedSubTypeVal] = useState(null);
  const [selectedCallType, setSelectedCallType] = useState("");
  const [selectedSubTypeId, setSelectedSubTypeId] = useState("");
  const [selectedSubType, setSelectedSubType] = useState(null);
  const [isShowAssignCases, setIsShowAssignCases] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState("");
  const ToDate = form.getFieldValue("ToDate");
  const FromDate = form.getFieldValue("FromDate");
  const [isadvacedModal, setIsadvacedModal] = useState(false);
  const [isTatData, setIsTatData] = useState({});
  const [isPendingsr, setIsPendingsr] = useState(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const location = useLocation();
  const user = location.state?.user;
 const CTSTpayload = useMemo(
    () => ({
      MasterRequest: ["CALL_TYP",  "REQST_MODE"],
    }),
    []
  );
  const statusLU = [
    { label: "Closed", value: "closed" },
    { label: "Pending", value: "pending" },
    { label: "Closed With Requirements", value: "closedwithrequirements" },
    { label: "Failed", value: "failed" },
  ];
  const ageingListLU = Array.from({ length: 15 }, (_, index) => ({
    label: index + 1,
    value: index + 1,
  }));

  const [hideSearchTable, setHideSearchTable] = useState(false); // State to control the visibility of the table
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isUniqueKey, setIsUniqueKey] = useState(false);

  const handleSelectAll = () => {
    if (!isUniqueKey) {
      // Iterate through data and setSelectionList for each item
      data.forEach((item) => {
        setSelectionList((prevList) => [...prevList, item.srvReqID]);
      });
      const allKeys = data.map((item) => item.serviceNo);
      setSelectedRowKeys(allKeys);
      setIsUniqueKey(true);
    } else {
      setSelectedRowKeys([]);
      setSelectionList([]);
      setIsUniqueKey(false);
    }
  };
  const onSelectChange = (record) => {
    const key = record.serviceNo; // Get the key from the record

    setSelectedRowKeys((prevKeys) => {
      if (prevKeys.includes(key)) {
        // Deselect by filtering it out
        setSelectionList((prevList) =>
          prevList.filter((item) => item.serviceNo !== key)
        );
        return prevKeys.filter((k) => k !== key);
      } else {
        // Add new selection
        return [...prevKeys, key];
      }
    });
    setSelectionList((prevList) => {
      if (prevList.some((item) => item.serviceNo === key)) {
        // If already selected, remove it
        return prevList.filter((item) => item.serviceNo !== key);
      } else {
        // Otherwise, add it
        return [...prevList, record];
      }
    });
  };

  const defaultColumns = [
    {
      title:  <Checkbox
          onChange={handleSelectAll}
          checked={selectedRowKeys?.length === data?.length && data?.length > 0}
        />,
      dataIndex: "select",
      key: "select",
      render: (_, record) => (
        <Checkbox
          onChange={() => onSelectChange(record)}
          checked={selectedRowKeys?.includes(record?.serviceNo)}
        />
      ),
    },
    {
      title: "Request ID No",
      dataIndex: "serviceNo",
      key: "serviceNo",
    },
    {
      title: "Call Log Date",
      dataIndex: "date",
      showSorterTooltip: false,
      sorter: {
        compare: (a, b) => moment(a.date).diff(moment(b.date)),
      },
      render: (_, record) => (
        <Space size="middle">
          {moment(record.date).local().format("DD/MM/YYYY hh:mm A")}
        </Space>
      ),
    },
    {
      title: "Policy Number",
      dataIndex: "policyNo",
      key: "policyNo",
      showSorterTooltip: false,
      sorter: {
        compare: (a, b) => a.policyNo - b.policyNo,
      },
    },
    {
      title: "PO Name",
      dataIndex: "poName",
      key: "callTypeName",
    },
    {
      title: "Call Type",
      dataIndex: "callTypeName",
      key: "callTypeName",
    },
    {
      title: "Sub Type",
      dataIndex: "subTypeName",
      key: "subTypeName",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Mode",
      dataIndex: "mode",
      render: (_, record) => <Space size="middle">{record?.reqModeName}</Space>,
      key: "",
    },
    {
      title: "Ageing",
      dataIndex: "ageing",
      key: "",
    },
    {
      title: "Assigned To",
      dataIndex: "assignedToName",
      key: "",
    },
  ];
// const { data: ctstData } = useCTSTQuery(CTSTpayload);
// useEffect(() => {
//   if (ctstData) {
//     setMasterData(ctstData.data);
//     setCALL_TyPES(transformData(ctstData.data, "CALL_TYP"));
//     setRequestModeLU(transformData(ctstData.data, "REQST_MODE"));
//   }
// }, [ctstData]);

  useEffect(() => {
    getAdminData();
    getCTST();
    const initialVal = selectedCheckbox || "pendingwithintat";
    setSelectedCheckbox(initialVal);
    getDashBoardTatInfo(initialVal);
  }, [sharedData, hideSearchTable, user]);

  const handleAssignCases = () => {
    if (selectedRowKeys?.length === 0) {
      message.destroy();
      message.warning({
        content: "Please select atleast one record!",
        className: "custom-msg",
        duration: 2,
      });
      return;
    }
    setIsShowAssignCases(true);
  };

  //added by akshada
  //  State

  // -------------------- Logic Section --------------------
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [status, setStatus] = useState("");
  const [selectedNominee, setSelectedNominee] = useState("");
  const [nomineeList, setNomineeList] = useState([]);
  const [showSubmit, setShowSubmit] = useState(false);

  // Load user list
  const handleShowUserList = async () => {
    try {
      setIsLoading(true);
      //const response = await apiCalls.GetAutoAssignmentUsers();
      // Use local API endpoint for development
      const response = await apiCalls.GetAutoAssignmentUsers();
      const data = response.data; // Use .data instead of .json() for axios or similar libraries
      //const response = await fetch("http://localhost:7071/api/GetAutoAssignmentUsers");
      // Log the API response to the console for debugging
      console.log("GetAutoAssignmentUsers API response:", response);
      if (Array.isArray(data)) {
        const transformedUsers = data.map((user) => ({
          name: user.userName,
          email: user.emailid,
          status: user.status,
        }));
        setUserList(transformedUsers);
      } else {
        alert("Invalid response format from API");
      }
    } catch (error) {
      console.error(error);
      alert("No user data available - API unavailable");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user selection
  const handleUserChange = (e) => {
    const email = e.target.value;
    setSelectedUser(email);
    setSelectedNominee("");
    setShowSubmit(false);

    const selected = userList.find((u) => u.email === email);
    if (selected) {
      const oppositeStatus =
        selected.status === "Present" ? "Absent" : "Present";
      setStatus(oppositeStatus);

      if (oppositeStatus === "Absent") {
        const nominees = userList.filter((u) => u.email !== email);
        setNomineeList(nominees);
      } else {
        setNomineeList([]);
      }
      setShowSubmit(true);
    }
  };

  // Handle status change
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setShowSubmit(true);

    if (newStatus === "Absent") {
      const nominees = userList.filter((u) => u.email !== selectedUser);
      setNomineeList(nominees);
    } else {
      setNomineeList([]);
    }
  };

  // Handle nominee select
  const handleNomineeSelect = (e) => {
    setSelectedNominee(e.target.value);
  };

  // Submit
  const handleSubmit = async () => {
    if (status === "Absent" && !selectedNominee) {
      alert("Please select a nominee before submitting.");
      return;
    }

    let obj = {
      userName: selectedUser || "",
      status: status || "",
      nomineeName: status === "Absent" ? selectedNominee : null,
    };

    try {
      const response = await apiCalls.UpdateAutoAssignmentUserStatus(obj);

      // const response = await fetch("http://localhost:7071/api/UpdateAutoAssignmentUserStatus", {
      // const response = await fetch("/api/UpdateUserStatus", {
      //   method: "POST",
      //  headers: { "Content-Type": "application/json" },
      //  body: JSON.stringify({
      //    userName: selectedUser,
      //    status,
      //   nomineeName: status === "Absent" ? selectedNominee : null,
      //  }),
      // });

      console.log("GetAutoAssignmentUsers API response:", response);

      alert(response.message || "Status updated successfully");
      // This will refresh the current route without redirecting to home

      setShowSubmit(false);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const handleSelection = (type) => {
    setSelectedCheckbox(type); // Ensure only one checkbox is selected
    if (type.includes("pending")) {
      handlePendingData(type);
    } else if (type.includes("internal")) {
      handleInternalRequirementData(type);
    }
  };

  const handlePendingData = (selectedVal) => {
    searchData(selectedVal);
    setIsPendingsr(true);
  };
  const handleInternalRequirementData = (selectedVal) => {
    searchData(selectedVal);
    setIsPendingsr(false);
  };

  let count =
    countData &&
    countData.reduce((acc, obj) => {
      if (
        obj.status === "CLOSED" ||
        obj.status === "PENDING" ||
        obj.status === "REJECTED"
      ) {
        return acc + obj.count;
      } else {
        return acc;
      }
    }, 0);

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

  const handleAssignTo = (e) => {
    setSelectedUserName(e);
  };

  const getDashBoardTatInfo = async (selectedVal = "pendingwithintat") => {
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
      status: formData?.status === undefined ? "PENDING" : formData?.status,
      ageing: formData?.ageing,
      assignedTo: formData?.assignedTo,
    };

    const response = await apiCalls.getBOEUserDashboardLatest(obj);

    if (response.status === 200) {
      setIsTatData(response?.data);
      setIsLoading(false);

      let filteredData = response?.data?.pOSLists;

      // Safely filter based on category
      switch (selectedVal) {
        case "pendingwithintat":
          filteredData = filteredData?.filter(
            (item) => item.dashboardTatCategory === "WithinTAT_PendingSR"
          );
          break;
        case "pendingbeyondtat":
          filteredData = filteredData?.filter(
            (item) => item.dashboardTatCategory === "BeyondTAT_PendingSR"
          );
          break;
        case "internalwithintat":
          filteredData = filteredData?.filter(
            (item) => item.dashboardTatCategory === "WithinTAT_Internal"
          );
          break;
        case "internalbeyondtat":
          filteredData = filteredData?.filter(
            (item) => item.dashboardTatCategory === "BeyondTAT_Internal"
          );
          break;
        default:
          // If unknown selectedVal, return all data or handle gracefully
          console.warn("Unknown selectedVal:", selectedVal);
          break;
      }

      setData(filteredData);
    }
  };

  const getAdminData = async () => {
    //setIsLoading(true);
    // let obj = {role: loggedUser.role,userId:loggedUser?.userName };

    let response = apiCalls.GetSerReqStatus(
      loggedUser.role,
      loggedUser.userName
    );
    response
      .then((val) => {
        if (val?.data) {
          setCountData(val?.data[0]?.serReqStatus);
          setUsersListLU(val?.data[0].posAdminRoles);
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


  const searchData = async (selectedVal) => {
    // setHideSearchTable(true);
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
    const response = await apiCalls.getBOEUserDashboardLatest(obj);

    if (response.status === 200) {
      // setIsLoading(false);
      setIsTatData(response?.data);
      setIsLoading(false);
      let filteredData = response?.data?.pOSLists;
      if (selectedVal === "pendingwithintat") {
        filteredData = filteredData?.filter(
          (item) => item.dashboardTatCategory === "WithinTAT_PendingSR"
        );
      } else if (selectedVal === "pendingbeyondtat") {
        filteredData = filteredData?.filter(
          (item) => item.dashboardTatCategory === "BeyondTAT_PendingSR"
        );
      } else if (selectedVal === "internalwithintat") {
        filteredData = filteredData?.filter(
          (item) => item.dashboardTatCategory === "WithinTAT_Internal"
        );
      } else if (selectedVal === "internalbeyondtat") {
        filteredData = filteredData?.filter(
          (item) => item.dashboardTatCategory === "BeyondTAT_Internal"
        );
      }

      setData(filteredData);
      setIsLoading(false);
      form.resetFields();
      setIsadvacedModal(false);
    } else {
      setData([]);
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


  const getCTST = () => {
    let obj = {
      MasterRequest: ["CALL_TYP", "SUB_TYP", "REQST_MODE"],
    };
    let CTST = apiCalls.ctst(obj);
    CTST.then((val) => {
      setMasterData(val.data);
      // Use the function for each set of data
      const transformedData = transformData(val.data, "CALL_TYP");
      const rquestModeData = transformData(val.data, "REQST_MODE");
      //setCALL_TyPES(transformedData);
      setCALL_TyPES(transformedData);
      setRequestModeLU(rquestModeData);
      //searchData();
      // setIsLoading(false);
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
  // Define a reusable function for data transformation
  // const transformData = (data, keyy) => {
  //   const filteredData = data?.filter((ele) => ele.key === keyy);
  //   return filteredData[0]?.value?.map((item, index) => {
  //     let obj;

  //     if (keyy === "CALL_TYP") {
  //       obj = {
  //         ...item,
  //         label: item.mstDesc,
  //         value: item.mstID,
  //         //isCallType:true
  //       };
  //     } else if (keyy === "SUB_TYP") {
  //       obj = {
  //         ...item,
  //         label: item.mstDesc,
  //         value: item.mstID,
  //         //isSubType:true
  //       };
  //     } else {
  //       obj = {
  //         ...item,
  //         label: item.mstDesc,
  //         value: item.mstID,
  //       };
  //     }
  //     return obj;
  //   });
  // };

  const onSearch = (e) => {};


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
    if (
      props?.customerData?.isPOS ||
      props?.isEmailManagement ||
      props?.isShowAllTicketsData ||
      props?.customerData?.isBOE
    ) {
      form.setFieldsValue({ callType: value, subType: subType });
      handleSubTypeChange(subType, transformedData);
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
      let slectedCALL_TYP = CALL_TYP[0].value?.find((ele) => {
        return ele.mstID === obj?.mstID;
      });
      setSelectedCallType(+slectedCALL_TYP?.mstID);
      // subTypeDropdown(obj.mstParentID);
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

  const handleSubTypeChange = (value, getSubLU) => {
    props?.setSubTypeId(value);
    setSelectedSubTypeId(value);
    let subTypeData = subTypeLU?.length > 0 ? subTypeLU : getSubLU;
    subTypeData?.map((key, index) => {
      if (key.mstID === value) {
        const modifiedDesc = key.mstDesc?.replace(/[^\w]/g, "").toLowerCase();
        setSelectedSubType(modifiedDesc);
        setSelectedSubTypeVal(key.mstDesc);
        props?.setSelectedSubTypeVall(key.mstDesc);
      }
    });
    //}
  };

  const saveAssignTo = async (values) => {
    // if(selectionList?.length === 0){
    //   message.destroy();
    //   message.warning("Please select atleast one record");
    //   return;
    // }
    // if(!selectedUserName){
    //   message.destroy();
    //   message.warning("Please select user name");
    //   return;
    // }
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
      RoleID: filteredList[0]?.roleID || null,
      AllocatedOn: new Date(),
      ClosedOn: null,
      BranchID: null,
      ReqSignedOn: null,
    };
    let mappedObjects = selectionList?.map((item, i) => ({
      ...obj,
      SrvReqID: item?.srvReqID == undefined ? item : item?.srvReqID,
      UsrID: selectedUserName,
      ReqSignedOn: new Date(),
    }));
    setIsLoading(true);
    let response = apiCalls.saveAssignToPOS(mappedObjects);
    response
      .then((val) => {
        if (val?.data) {
          setSelectionList([]);
          setSelectedRowKeys([]);
          setIsShowAssignCases(false);
          // Force remount of the Table component to clear the selection
          setTableKey((prevKey) => prevKey + 1);
          getCTST();
          getAdminData();
          //searchData();
          message.success("Already Ticket is Created");
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

  return (
    <>
      <div className="main-start">
        <div className="w-94">
          <div className="d-flex justify-center align-center">
            <h6 className="advance-title text-center">POS Admin Dashboard</h6>
          </div>

          <Row gutter={[16, 16]} className="mb-16 justify-center">
            {/* Pending SR */}
            <Col xs={24} sm={24} md={12} lg={6} xxl={6}>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th colSpan={2} className="pl-24">
                      Pending SR
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-24 d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span style={{ minWidth: "150px" }}>Within TAT</span>
                        <strong className="ms-4 text-red">
                          {isTatData?.dashboardSummaries?.[3].withinTat ?? "XX"}
                        </strong>
                      </div>
                      <input
                        type="checkbox"
                        className="custom-checkbox ms-3"
                        checked={selectedCheckbox === "pendingwithintat"}
                        onChange={() => handleSelection("pendingwithintat")}
                      />
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "#f0f0f0" }}>
                    <td className="p-24 d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span style={{ minWidth: "150px" }}>Beyond TAT</span>
                        <strong className="ms-4 text-red">
                          {isTatData?.dashboardSummaries?.[3].beyondTat ?? "XX"}
                        </strong>
                      </div>
                      <input
                        type="checkbox"
                        className="custom-checkbox ms-3"
                        checked={selectedCheckbox === "pendingbeyondtat"}
                        onChange={() => handleSelection("pendingbeyondtat")}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>

            {/* Internal Requirement */}
            <Col xs={24} sm={24} md={12} lg={6} xxl={6}>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th colSpan={2} className="pl-24">
                      Internal Requirement
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-24 d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span style={{ minWidth: "150px" }}>Within TAT</span>
                        <strong className="ms-4 text-red">
                          {isTatData?.dashboardSummaries?.[2]?.withinTat ??
                            "XX"}
                        </strong>
                      </div>
                      <input
                        type="checkbox"
                        className="custom-checkbox ms-3"
                        checked={selectedCheckbox === "internalwithintat"}
                        onChange={() => handleSelection("internalwithintat")}
                      />
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "#f0f0f0" }}>
                    <td className="p-24 d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span style={{ minWidth: "150px" }}>Beyond TAT</span>
                        <strong className="ms-4 text-red">
                          {isTatData?.dashboardSummaries?.[2]?.beyondTat ??
                            "XX"}
                        </strong>
                      </div>
                      <input
                        type="checkbox"
                        className="custom-checkbox ms-3"
                        checked={selectedCheckbox === "internalbeyondtat"}
                        onChange={() => handleSelection("internalbeyondtat")}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>

            {/* Advance Search Button */}
            <Col xs={24} sm={24} md={12} lg={4} xxl={4}>
              <div className="button-container">
                <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => setIsadvacedModal(true)}
                >
                  Advance Search
                </Button>
              </div>
            </Col>
          </Row>

          <Modal
            className="po-modal"
            title="Advance Search"
            open={isadvacedModal}
            destroyOnClose={true}
            width={420}
            closeIcon={
              <Tooltip title="Close">
                <span onClick={() => setIsadvacedModal(false)}>
                  <img src={CloseIcon} alt=""></img>
                </span>
              </Tooltip>
            }
            footer={null}
          >
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
              <Row gutter={[12, 12]} className="mb-10">
                <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
                  <Form.Item
                    name="PolicyNo"
                    label="Policy No"
                    className="inputs-label mb-0"
                    rules={[
                      {
                        required: false,
                        message: "Enter Policy No",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter Policy No"
                      className="cust-input policy-input"
                      maxLength={100}
                    />
                  </Form.Item>
                </Col>
                <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
                  <Form.Item
                    label="Call Type"
                    name="callType"
                    className="inputs-label mb-0"
                  >
                    <Select
                      showSearch
                      allowClear={true}
                      className="cust-input"
                      maxLength={100}
                      placeholder="Select Call Type"
                      onSearch={onSearch}
                      options={CALL_TyPES}
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
                    label="Mode"
                    name="mode"
                    className="inputs-label mb-0"
                  >
                    <Select
                      showSearch
                      allowClear={true}
                      className="cust-input"
                      maxLength={100}
                      placeholder="Select Mode"
                      options={requestModeLU}
                      optionFilterProp="label"
                      filterOption={filterOption}
                    ></Select>
                  </Form.Item>
                </Col>
                <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
                  <div>
                    <Form.Item
                      label={
                        <span>
                          From Date
                          {/* <sup>*</sup> */}
                        </span>
                      }
                      name="FormDate"
                      className="inputs-label mb-0"
                      rules={Ruless}
                    >
                      <DatePicker
                        allowClear={true}
                        style={{ width: "100%" }}
                        className="cust-input"
                        format={dateFormat}
                      />
                    </Form.Item>
                  </div>
                </Col>
                <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
                  <div>
                    <Form.Item
                      label={
                        <span>
                          To Date
                          {/* <sup>*</sup> */}
                        </span>
                      }
                      name="ToDate"
                      className="inputs-label mb-0"
                      rules={Ruless}
                    >
                      <DatePicker
                        allowClear={true}
                        style={{ width: "100%" }}
                        className="cust-input"
                        format={dateFormat}
                      />
                    </Form.Item>
                  </div>
                </Col>
                <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
                  <Form.Item
                    label="Status"
                    name="status"
                    className="inputs-label mb-0"
                  >
                    <Select
                      showSearch
                      allowClear={true}
                      className="cust-input"
                      maxLength={100}
                      placeholder="Select status"
                      options={statusLU}
                      filterOption={filterOption}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
                  <Form.Item
                    name="Ageing"
                    label="Ageing"
                    className="inputs-label mb-0"
                    rules={[
                      {
                        required: false,
                        message: "Enter Ageing",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      allowClear={true}
                      className="cust-input"
                      maxLength={100}
                      placeholder="Select Ageing"
                      options={ageingListLU}
                    ></Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
                  <Form.Item
                    name="assignedTo"
                    label="Assigned To"
                    className="inputs-label mb-0"
                    rules={[
                      {
                        required: false,
                        message: "Enter Assigned To",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      allowClear={true}
                      placeholder="Select a Assigned To"
                      optionFilterProp="children"
                      onChange={(e) => setSelectedUserName(e)}
                      onSearch={onSearch}
                      filterOption={filterOption}
                      style={{ width: "100%" }}
                     options={usersListLU?.map(user => ({
    label: user.userName,
    value: user.usrID
  }))}
                    >
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                    // <div className="text-center modal-validate">
                  >
                    <Button
                      type="primary"
                      className="primary-btn"
                      htmlType="submit"
                      //onClick={() => searchData()}
                    >
                      Submit
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Modal>

          <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
            <Form.Item className="mb-0">
              {/*Added by Akshada  
// -------------------- HTML Section --------------------*/}
              <div
                style={{
                  width: "100vw",
                  marginLeft: "-16px",
                  padding: "8px 16px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <h3
                  style={{
                    color: "#800000",
                    marginBottom: "12px",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  POS User Status
                </h3>

                {/* Show User List Button */}
                <button
                  onClick={handleShowUserList}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#800000",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginBottom: "12px",
                  }}
                >
                  {isLoading ? "Loading..." : "Show User List"}
                </button>

                {/* User Dropdown */}
                {userList.length > 0 && (
                  <select
                    id="userSelect"
                    value={selectedUser}
                    onChange={handleUserChange}
                    style={{
                      marginLeft: "8px",
                      padding: "6px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      backgroundColor: "#fff",
                      color: "#800000",
                    }}
                  >
                    <option value="">-- Select User --</option>
                    {userList.map((user) => (
                      <option key={user.email} value={user.email}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                )}

                {/* Status Dropdown */}
                <label
                  htmlFor="statusSelect"
                  style={{
                    marginLeft: "16px",
                    color: "#333",
                    fontWeight: "500",
                  }}
                >
                  Select Status:
                </label>
                <select
                  id="statusSelect"
                  value={status}
                  onChange={handleStatusChange}
                  disabled={!selectedUser}
                >
                  <option value="">-- Select Status --</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>

                {!selectedUser && (
                  <p
                    style={{
                      color: "#999",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    Please select a user before choosing status.
                  </p>
                )}

                {/* Nominee Dropdown */}
                {status === "Absent" && (
                  <div style={{ marginTop: "12px" }}>
                    <label
                      htmlFor="nomineeSelect"
                      style={{ color: "#333", fontWeight: "500" }}
                    >
                      Select Nominee:
                    </label>
                    <select
                      id="nomineeSelect"
                      value={selectedNominee}
                      onChange={handleNomineeSelect}
                      style={{
                        marginLeft: "8px",
                        padding: "6px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        backgroundColor: "#fff",
                        color: "#800000",
                      }}
                    >
                      <option value="">-- Select Nominee --</option>
                      {nomineeList.map((user) => (
                        <option key={user.email} value={user.email}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Submit Button */}
                {showSubmit && (
                  <button
                    onClick={handleSubmit}
                    style={{
                      marginTop: "16px",
                      padding: "6px 12px",
                      backgroundColor: "#004d00",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Submit
                  </button>
                )}
              </div>

           
              {/*Ends by Akshada  */}

              <div className="d-flex">
                {/* <p className="text-red">
                  <b
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      marginRight: "12px",
                    }}
                    onClick={handleSelectAll}
                  >
                    Select All
                  </b>
                </p> */}
                <Button
                  type="primary"
                  className="primary-btn move-search"
                  onClick={() => handleAssignCases()}
                >
                  Assign Cases
                </Button>{" "}
              </div>
            </Form.Item>
          </Col>

          <Row gutter={[24]} className="mb-16">
            <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Table
                loading={isLoading}
                columns={columns}
                dataSource={data}
                locale={{
                  emptyText: "No Data Available",
                }}
                pagination={{
                  pageSize: 10,
                  defaultPageSize: 5,
                  total: showTotalPages,
                }}
              />
            </Col>
          </Row>
        </div>
      </div>
      {/* Added by Akshada<Spin spinning={isLoading} fullscreen />
     Use a non-fullscreen spinner to avoid blocking the entire UI 
    <Spin spinning={isLoading} />*/}
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
          <Form name="trigger" layout="vertical">
            <Form.Item
              label="Assigned To"
              name="assignedTo"

              // className="inputs-label mb-0"
            >
              <Select
                showSearch
                allowClear={true}
                placeholder="Select a Assigned To"
                optionFilterProp="children"
                onChange={(e) => handleAssignTo(e)}
                onSearch={onSearch}
                filterOption={filterOption}
                 options={usersListLU?.map(user => ({
    label: user.userName,
    value: user.usrID
  }))}
                style={{ width: "100%" }} // Set width to 100%
              >
              </Select>
            </Form.Item>
          </Form>
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
        </div>
      </Modal>
    </>
  );
};
const mapStateToProps = ({ policyDetails }) => {
  return { policyDetails };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateSentDetails: (info) => {
      dispatch(sentDetailsObj(info));
    },
    dispatch,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(POSAdminDashboardNonPayOut);
