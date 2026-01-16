import React, { useEffect, useState } from "react";
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
  Select,
  Modal,
  Tooltip,
} from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import apiCalls from "../../api/apiCalls";
import { connect } from "react-redux";
import { sentDetailsObj } from "../../reducers/policyDetailsReducer";
import { useData } from "../../reducers/DataContext";
import { useSelector } from "react-redux";
import CloseIcon from "../../assets/images/close-icon.png";
import { useLocation } from "react-router-dom";
import { filterOption } from "../../utils/HelperUtilites";
const NBAdminDashboard = (props) => {
  const loggedUser = useSelector((state) => state?.userProfileInfo?.profileObj);
  const { sharedData } = useData();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { Option } = Select;
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
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isShowAssignCases, setIsShowAssignCases] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [isadvacedModal, setIsadvacedModal] = useState(false);
  const [isTatData, setIsTatData] = useState({});
  const [isPendingsr, setIsPendingsr] = useState(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const location = useLocation();
  const user = location.state?.user;
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
  useEffect(() => {
    getAdminData();
    getCTST();
    getDashBoardTatInfo();
  }, [sharedData, hideSearchTable, user]);

  const handleSelectAll = () => {
    if (!isUniqueKey) {
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

  function getRequestModeName(reqMode) {
    if (Array.isArray(requestModeLU) && requestModeLU?.length > 0) {
      const foundItem = requestModeLU?.find((item) => item.mstID === reqMode);
      return foundItem ? foundItem.label : "";
    }
    return ""; 
  }

  const defaultColumns = [
    {
      title: "Select",
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
      render: (_, record) => (
        <Space size="middle">{getRequestModeName(record?.reqMode)}</Space>
      ),
      key: "",
    },
    {
      title: "Ageing",
      dataIndex: "ageing",
      key: "ageing",
    },
    {
      title: "Assigned To",
      dataIndex: "assignedToName",
      key: "assignedTo",
    },
  ];

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
      }),
    };
  });

  const getDashBoardTatInfo = async () => {
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
    if (response.status===200) {
      setIsDataLoading(false);
      setIsTatData(response?.data);
    }
  };
  const getAdminData = async () => {
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
      })
      .catch((err) => {
      });
  };
 
  const handleAction = async (item) => {
    var obj = {
      applicationNo: item?.applicationNo,
      callTypeName: item?.callTypeName,
      subTypeName: item?.subTypeName,
      dob: item?.dob,
      policyNo: item?.policyNo,
      source: item?.source,
      tagName: item?.transectionData,
      isBOE: true,
      isPOS: false,
      serialNo: item.serviceNo,
      isInternalFlow: true,
    };
    setIsLoading(false);
    navigate("/policydetails", { state: obj });
  };

  const searchData = async (selectedVal) => {
    setIsDataLoading(true);
    const formData = form.getFieldsValue();
    const fromDate = formData.FormDate
      ? formData.FormDate.format("YYYY-MM-DD")
      : "";
    const toDate = formData.ToDate ? formData.ToDate.format("YYYY-MM-DD") : "";
    const PolicyNo = formData.PolicyNo
      ? formData.PolicyNo.toLowerCase().trim()
      : "";
    let obj = {
      fromDate: fromDate,
      toDate: toDate,
      policyNumber: PolicyNo,
      userId: loggedUser.userName,
      role: loggedUser.role,
      callType: selectedCallType,
      subType: formData?.subType,
      mode: formData?.mode,
      status: formData?.status == undefined ? "PENDING" : formData?.status,
      ageing: formData?.ageing,
      assignedTo: formData?.assignedTo,
      SrvReqRefNo: formData?.RequestIDNo,
    };

    const response = await apiCalls.getBOEUserDashboardLatest(obj);
    if (response.status===200) {
      setIsDataLoading(false);
      setIsTatData(response?.data);
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
      setIsDataLoading(false);
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
      const transformedSubType = transformData(val.data, "SUB_TYP");
      const rquestModeData = transformData(val.data, "REQST_MODE");
      //setCALL_TyPES(transformedData);
      setCALL_TyPES(transformedData);
      setRequestModeLU(rquestModeData);
      searchData();
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
  // Define a reusable function for data transformation
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
    if (obj.isCallType) {
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
    const filteredList = usersListLU?.filter((value) => {
      if (value && value?.usrID === selectedUserName) {
        return value.roleID;
      } else {
        return null;
      }
    });
    let obj = {
      SrvReqID: null,
      UsrID: null,
      RoleID: filteredList[0]?.roleID || null,
      AllocatedOn: new Date(),
      ClosedOn: null,
      BranchID: null,
      ReqSignedOn: null,
    };
    let mappedObjects = selectionList?.map((item, i) => ({
      ...obj,
      SrvReqID: item?.srvReqID == undefined ? item : item?.srvReqID,
      // "SrvReqID": item?.srvReqID,
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

  return (
    <>
      <div className="main-start">
        <div className="w-94">
          <div className="d-flex justify-center align-center">
            <h6 className="advance-title text-center">NB Admin Dashboard</h6>
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
            title="Apply Filters"
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
                <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
                  <Form.Item
                    name="RequestIDNo"
                    label="SR No"
                    className="inputs-label mb-0"
                    rules={[
                      {
                        required: false,
                        message: "Enter SR No",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter SR No"
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
                        allowClear={false}
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
                        </span>
                      }
                      name="ToDate"
                      className="inputs-label mb-0"
                      rules={Ruless}
                    >
                      <DatePicker
                        allowClear={false}
                        style={{ width: "100%" }}
                        className="cust-input"
                        format={dateFormat}
                      />
                    </Form.Item>
                  </div>
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
                  >
                    <Button
                      type="primary"
                      className="primary-btn"
                      htmlType="submit"
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
              <div className="d-flex">
                <p className="text-red">
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
                </p>
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
              <Spin spinning={isDataLoading}>
                <Table
                  columns={columns}
                  dataSource={data}
                  locale={{
                    emptyText: "No Data Available",
                  }}
                  x={true}
                  pagination={{
                    pageSize: 10,
                    defaultPageSize: 5,
                    total: showTotalPages,
                  }}
                />
              </Spin>
            </Col>
          </Row>
        </div>
      </div>
      <Spin spinning={isLoading} fullscreen />
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "500px" }}>
            <Form name="trigger"  layout="vertical" >
            {/* Set your desired width */}
            <Form.Item
              label="Assigned To"
              name="assignedTo"
              className="inputs-label mb-0"
              rules={[
                {
                  required: true,
                  message: "Select Assigned To",
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
            </Form>
          </div>
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(NBAdminDashboard);
