import React, { useEffect, useState } from "react";
import {
  Spin,
  message,
  Row,
  Col,
  Form,
  DatePicker,
  Button,
  Input,
  Table,
  Space,
  Card,
  Select,
  Modal,
  Tooltip,
} from "antd";
import { useNavigate } from "react-router-dom";
import apiCalls from "../../api/apiCalls";
import { NumericFormat } from "react-number-format";
import { connect } from "react-redux";
import { sentDetailsObj } from "../../reducers/policyDetailsReducer";
import { useData } from "../../reducers/DataContext";
import { useSelector } from "react-redux";
import CloseIcon from "../../assets/images/close-icon.png";

const PAApproverDashboard = (props) => {
  const loggedUser = useSelector((state) => state?.userProfileInfo?.profileObj);
  const { sharedData } = useData();
  const [form] = Form.useForm();
  const { Option } = Select;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [record, setRecord] = useState();
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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [SrvReqRefNo, setSrvReqRefNo] = useState("");
  const [Status, setStatus] = useState("");
  const [taxCalculationn, setTaxCalculationn] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [totalFundsModal, setTotalFundModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState(null);
  const [isadvacedModal, setIsadvacedModal] = useState(false);
  const [actionDetailsModal, setActionDetailsModal] = useState(false);
  const [amountDetails, setAmountDetails] = useState({});
  const [amountValue, setAmountValue] = useState(null);
  const [showCreateJv, setShowCreateJv] = useState(false);
  const [actionPolicyNumber, setActionPolicyNumber] = useState(null);
  const [transData, setTransdata] = useState([]);
  const [isTatData, setIsTatData] = useState({});
  const ToDate = form.getFieldValue("ToDate");
  const FromDate = form.getFieldValue("FromDate");

  const statusLU = [
    { label: "Closed", value: "closed" },
    { label: "Pending", value: "pending" },
    { label: "Closed With Requirements", value: "closedwithrequirements" },
    { label: "Failed", value: "failed" },
  ];
  const paymentMethodLU = [
    { label: "NEFT", value: "neft" },
    { label: "Cheque", value: "cheque" },
  ];
  const ageingListLU = Array.from({ length: 15 }, (_, index) => ({
    label: index + 1,
    value: index + 1,
  }));

  const [hideSearchTable, setHideSearchTable] = useState(false); // State to control the visibility of the table

  const defaultColumns = [
    {
      title: "Ticket No",
      dataIndex: "serviceNo",
      key: "serviceNo",
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
      title: "Request Type",
      dataIndex: "requestType",
      key: "",
    },
    {
      title: "Payout Method",
      dataIndex: "payoutMethod",
      key: "",
    },
    {
      title: "Ageing",
      dataIndex: "ageing",
      key: "",
    },
    {
      title: "Decision",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            className="primary-btn btn-cstm "
            onClick={() => {
              POSApprover(record.serviceNo, "APPROVED");
              handleClickAction(record);
            }}
          >
            Action
          </Button>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    getAdminData();
    getCTST();
    getDashBoardTatInfo();
  }, [sharedData, hideSearchTable]);

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

    const response = await apiCalls.getBOEUserDashboardLatest(obj, "Yes");
    if (response?.status === 200) {
      setIsDataLoading(false);
      setIsTatData(response?.data);
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
          setUsersListLU(val?.data[0]?.posAdminRoles);
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

  const searchData = async () => {
    // setHideSearchTable(true);
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
    };

    const response = await apiCalls.getRoleBasedSearchDetails(obj);
    if (Array.isArray(response?.data)) {
      setIsDataLoading(false);
      setData(response?.data);
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
      setSelectedCallType(obj?.mstID);
      form.setFieldsValue({ subType: null });
      setSubTypeLU(null);
      setSelectedSubType(null);
      subTypeDropdown(obj?.mstID);
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
      let slectedCALL_TYP = CALL_TYP[0]?.value?.find((ele) => {
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
      UsrID: null,
      RoleID: filteredList[0]?.roleID || null,
      AllocatedOn: new Date(),
      ClosedOn: null,
      BranchID: null,
      ReqSignedOn: null,
    };
    let mappedObjects = selectionList?.map((item, i) => ({
      ...obj,
      SrvReqID: item?.srvReqID,
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

  const POSApprover = (srvReqRefNo, status) => {
    setSrvReqRefNo(srvReqRefNo);
    setStatus(status);

    taxCalculation(srvReqRefNo);
  };
  const taxCalculation = async (val) => {
    setShowAlert(false);
    setIsLoader(true);
    let obj = {
      SrvReqRefNo: val,
      clientId: "",
    };

    try {
      // Wait for the API call to complete
      let response = await apiCalls.taxCalculationForSerReq(obj);

      // Handle the response
      if (response?.data) {
        // setTotalFundModal(true);
        setTaxCalculationn(response.data);
      } else {
        message.error({
          content:
            response?.data?.responseBody?.errormessage ||
            "Something went wrong, please try again!",
          className: "custom-msg",
          duration: 2,
        });
      }
    } catch (err) {
      // Handle errors from the API call
      message.error({
        content: "Failed to fetch tax calculation. Please try again!",
        className: "custom-msg",
        duration: 2,
      });
    } finally {
      // Always stop the loader after the operation
      setIsLoader(false);
    }
  };

  const passwordValidateHandler = (e) => {
    setPassword(e.target.value);
  };

  const getPOSActionsOnServReq = async (values) => {
    const roleID = loggedUser?.allRoles.find(
      (role) => role.roleName === "PA Approver"
    );
    const obj = {
      SrvReqRefNo: record?.serviceNo,
      Status: "APPROVED",
      UsrId: loggedUser?.userName,
      RoleId: roleID?.roleID,
      TransactionPayload: [
        { TagName: "ApproverPassword", TagValue: values, Status: "Create" },
        {
          TagName: "PayableAmount",
          TagValue: amountValue?.tagValue,
          Status: "Create",
        },
        { TagName: "FundTransfer", TagValue: "yes", Status: "Create" },
        {
          TagName: "FundTransferAmount",
          TagValue: amountValue?.tagValue,
          Status: "Create",
        },
        {
          TagName: "FundTransferTo",
          TagValue: amountValue?.tagValue,
          Status: "Create",
        },
      ],
      serviceRequestTransectionData: transData,
    };

    const response = await apiCalls.POSActionsOnContactDetails(obj);
    if (response.status === 200) {
      console.log("res", response);
    }
  };

  const approvee = () => {
    setTotalFundModal(false);
    setIsModalOpen(true);
    if (password !== null && password.trim() !== "") {
      getPOSActionsOnServReq(password);
    } else {
      message.error({
        content: "Enter Password",
        className: "custom-msg",
        duration: 2,
      });
    }
  };

  const rejectt = () => {};

  const modalHandler = () => {
    setIsadvacedModal(!isadvacedModal);
  };

  const handleClickAction = (record) => {
    setRecord(record);
    setIsLoader(true);
    getServiceRequestBySID(record);
    setActionPolicyNumber(record?.policyNo);
  };

  const getServiceRequestBySID = async (record) => {
    try {
      const response = await apiCalls.getPOSIndividualData(record?.serviceNo);

      if (response?.status === 200) {
        setAmountDetails(response?.data);
        let amountVal = response.data.serviceRequestTransectionData.filter(
          (x) => x.tagName === "bounceCharges_New_1"
        );
        setTransdata(response.data.serviceRequestTransectionData);
        setAmountValue(amountVal[0]);
        setActionDetailsModal(true);
        setIsLoader(false);
      }
    } catch (err) {
      console.log("error is", err);
      setIsLoader(false);
    }
  };

  return (
    <>
      <div className="main-start">
        <div className="w-94">
          <div className="d-flex justify-center align-center">
            <h6 className="advance-title text-center">PA Approver Dashboard</h6>
          </div>

          <Row
            gutter={[16, 16]}
            className="mb-16 d-flex justify-content-center"
          >
            <Col xs={24} sm={24} md={12} lg={6} xxl={6}>
              <table className="table table-bodered">
                <thead>
                  <tr>
                    <th colSpan={2} className="pl-24">
                      Pending Requests
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-24">Within TAT</td>
                    <td className="p-24 text-red">
                      {isTatData?.dashboardSummaries?.[0]?.withinTat ?? "XX"}
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "#f0f0f0" }}>
                    <td className="p-24">Beyond TAT</td>
                    <td className="p-24 text-red">
                      {isTatData?.dashboardSummaries?.[0]?.beyondTat ?? "XX"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>

            <Col xs={24} sm={24} md={12} lg={6} xxl={6}>
              <table className="table table-bodered">
                <thead>
                  <tr>
                    <th colSpan={2} className="pl-24">
                      Request Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-24">Refund</td>
                    <td className="p-24 text-red">{"XX"}</td>
                  </tr>
                  <tr style={{ backgroundColor: "#f0f0f0" }}>
                    <td className="p-24">Fund Transfer</td>
                    <td className="p-24 text-red">{"XX"}</td>
                  </tr>
                </tbody>
              </table>
            </Col>

            <Col xs={24} sm={24} md={12} lg={4} xxl={4}>
              <div className="button-container">
                <Button
                  type="primary"
                  className="primary-btn"
                  onClick={modalHandler}
                >
                  Advance Search
                </Button>
              </div>
            </Col>
          </Row>

          <Modal
            className="pa-modal"
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
                    label="Request Type"
                    name="requestType"
                    className="inputs-label mb-0"
                  >
                    <Select
                      showSearch
                      allowClear={true}
                      className="cust-input"
                      maxLength={100}
                      placeholder="Select Request Type"
                      options={requestModeLU}
                      filterOption={filterOption}
                    ></Select>
                  </Form.Item>
                </Col>

                <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
                  <Form.Item
                    label="Payout Method"
                    name="mode"
                    className="inputs-label mb-0"
                  >
                    <Select
                      showSearch
                      allowClear={true}
                      className="cust-input"
                      maxLength={100}
                      placeholder="Select Mode"
                      options={paymentMethodLU}
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
                    ></Select>
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
                  <Form.Item className="mb-0">
                    <div className="d-flex justify-end">
                      <Button
                        type="primary"
                        className="primary-btn"
                        htmlType="submit"
                        // Call the searchData function when the button is clicked
                      >
                        Submit
                      </Button>{" "}
                    </div>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Modal>

          <Row gutter={[24]} className="mb-16">
            <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Spin spinning={isDataLoading}>
                {/* <div className="main-start">
        <div className="w-94">
          <div className="table-container dashboard"> */}
                <Table
                  columns={columns}
                  dataSource={data}
                  locale={{
                    emptyText: "No Data Available",
                  }}
                  //bordered={true}
                  x={true}
                  pagination={{
                    //pageSizeOptions: ["5", "10", "15", "15"],
                    pageSize: 10,
                    //showSizeChanger: true,
                    defaultPageSize: 5,
                    // size:"small",
                    total: showTotalPages,
                    //showTotal: `Total ${showTotalPages} items`
                  }}
                />
              </Spin>
            </Col>
          </Row>
        </div>
      </div>
      <Spin spinning={isLoading} fullscreen />
      <Modal
        className="po-modal po-modal-2"
        title="Amount Details"
        open={actionDetailsModal}
        destroyOnClose={true}
        width={600}
        height={300}
        keyboard={true}
        onCancel={(e) => {
          if (e.key === "Escape") {
            setActionDetailsModal(false);
          }
        }}
        closeIcon={
          <Tooltip title="Close">
            <span
              onClick={() => {
                setActionDetailsModal(false);
                setPassword(null);
              }}
            >
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
        maskClosable={false}
      >
        <Form
          name="wrap"
          labelCol={{
            flex: "35%",
          }}
          labelAlign="left"
          labelWrap
          fontWeight="bold"
          wrapperCol={{
            flex: 1,
          }}
          colon={false}
          // form={form}
          // onFinish={searchData}
          autoComplete="off"
          initialValues={{
            PayoutValue: amountValue?.tagValue,
            FinalPayableAmount: amountValue?.tagValue,
          }}
        >
          <Row gutter={[12, 12]} className="mb-10">
            <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                name="PayoutValue"
                label={<span style={{ fontWeight: "bold" }}>Payout Value</span>}
              >
                <Input
                  className="cust-input"
                  value={amountValue?.tagValue}
                  disabled={true}
                />
              </Form.Item>
            </Col>

            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                name="TDSAmount"
                label={<span style={{ fontWeight: "bold" }}>TDS Amount</span>}
              >
                <Input
                  className="cust-input"
                  //readOnly
                  disabled={true}
                />
              </Form.Item>
            </Col>

            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                name="FTAmount"
                label={<span style={{ fontWeight: "bold" }}>FT Amount</span>}
              >
                <Input
                  className="cust-input"
                  //readOnly
                  disabled={true}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                name="IntrestAmount"
                label={
                  <span style={{ fontWeight: "bold" }}>Interest Amount</span>
                }
              >
                <Input
                  className="cust-input"
                  //readOnly
                  disabled={true}
                />
              </Form.Item>
            </Col>

            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                name="FinalPayableAmount"
                label={
                  <span style={{ fontWeight: "bold" }}>
                    Final Payable Amount
                  </span>
                }
              >
                <Input
                  className="cust-input"
                  value={amountValue?.tagValue}
                  //readOnly
                  disabled={true}
                />
              </Form.Item>
            </Col>
            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
                <Form.Item
                  name="password"
                  onChange={passwordValidateHandler}
                  label={
                    <span style={{ fontWeight: "bold" }}>
                      Password<sup>*</sup>
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter your password", // Custom error message
                    },
                  ]}
                >
                  <Input type="password" className="cust-input" />
                </Form.Item>
              </Col>
            </Col>
          </Row>
        </Form>
        <div className="contact-details-btn">
          <Button
            type="primary"
            className="primary-btn"
            htmlType="submit"
            onClick={() => {
              approvee();
            }}
          >
            Approve
          </Button>
          <Button
            type="primary"
            // className="primary-btn"
            className={`primary-btn ${showCreateJv ? "" : "d-none"}`}
            htmlType="submit"

            // onClick={() => { createJVEntry(); }}
          >
            Create JV Entry
          </Button>
          {/* )} */}

          <Button
            type="primary"
            className="primary-btn"
            onClick={() => {
              rejectt();
            }}
          >
            Reject
          </Button>
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
              onChange={(e) => setSelectedUserName(e)}
              onSearch={onSearch}
              filterOption={filterOption}
              style={{ width: "100%" }} // Set width to 100%
            >
              {usersListLU?.map((users, idx) => {
                return (
                  <Option key={idx} value={users?.usrID}>
                    {users?.userName}
                  </Option>
                );
              })}
            </Select>
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

      <Modal
        title={"Values"}
        open={totalFundsModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setTotalFundModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="table-container">
          {
            <>
              <table className="responsive-table">
                <tr>
                  <td width={50}>Payouts Value</td>
                  <td width={70}>{taxCalculationn?.payableAmount}</td>
                </tr>
                <tr>
                  <td>TDS Amount</td>
                  <td>{taxCalculationn?.tdsAmount}</td>
                </tr>
                <tr>
                  <td>FT Amount</td>
                  <td>{taxCalculationn?.ftAmount}</td>
                </tr>
                <tr>
                  <td>Intrest Amount</td>
                  <td>{taxCalculationn?.interestAmount}</td>
                </tr>
                <tr>
                  <td>Net Payout Value</td>
                  <td>{taxCalculationn?.netPayableAmount}</td>
                </tr>
              </table>
            </>
          }

          <div className="contact-details-btn">
            <Button
              type="primary"
              className="primary-btn"
              htmlType="submit"
              onClick={() => {
                approvee();
              }}
            >
              Approve
            </Button>

            <Button
              type="primary"
              className="primary-btn"
              onClick={() => {
                rejectt();
              }}
            >
              Reject
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
)(PAApproverDashboard);
