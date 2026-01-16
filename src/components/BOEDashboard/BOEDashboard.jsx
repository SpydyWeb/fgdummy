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
} from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import apiCalls from "../../api/apiCalls";
import { connect } from "react-redux";
import { sentDetailsObj } from "../../reducers/policyDetailsReducer";
import { useData } from "../../reducers/DataContext";
import { useSelector } from "react-redux";

const BOEDashboard = (props) => {
  const loggedUser = useSelector((state) => state?.userProfileInfo?.profileObj);
  const { sharedData } = useData();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const dateFormat = "DD/MM/YYYY";
  const [showTotalPages, setShowTotalpages] = useState(null);
  const [countData, setCountData] = useState([]);
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

  const ToDate = form.getFieldValue("ToDate");
  const FromDate = form.getFieldValue("FromDate");

  const statusLU = [
    { label: "Closed", value: "closed" },
    { label: "Pending", value: "pending" },
    { label: "Closed With Requirements", value: "closedwithrequirements" },
    { label: "Failed", value: "failed" },
  ];

  const [hideSearchTable, setHideSearchTable] = useState(false); // State to control the visibility of the table
  const defaultColumns = [
    {
      title: "ACTION",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <a className="editIcon">
            {" "}
            <i
              onClick={() => handleAction(record)}
              className="bi bi-pencil-square"
            ></i>
          </a>
        </Space>
      ),
    },
    {
      title: "Ticket No",
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
      title: "Customer Name",
      dataIndex: "proposerName",
      key: "proposerName",
    },
    {
      title: "Ageing",
      dataIndex: "ageing",
      key: "ageing",
    },
  ];
  useEffect(() => {
    getAdminData();
    getCTST();
    searchData();
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

  const handleAction = async (item) => {
    //setIsLoading(true);
    //const  val = await apiCalls.getPOSIndividualData(item?.serviceNo);

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
    // navigate("/policydetails",{ state: {serialNo:item?.serviceNo, isPOS:false, isBOE:true,policyNo: item?.policyNo, dob: item?.dob}});
    // if(val?.data?.srvReqRefNo){
    setIsLoading(false);
    // setData(val?.data?.responseBody);
    navigate("/policydetails", { state: obj });
    // }
    // else{
    //   setIsLoading(false);
    //   message.destroy()
    //   message.error({
    //     content: val?.item?.responseBody?.errormessage || "Something went wrong please try again!",
    //     className: "custom-msg",
    //     duration: 2,
    //   });
    // }

    // navigate(/emailmanagementview/${item?.emailResponseId}, { state: item });
  };

  const searchData = async () => {
    // setHideSearchTable(true);
    setIsDataLoading(true);
    const formData = form.getFieldsValue();
    const fromDate = formData.FormDate
      ? formData.FormDate?.format("YYYY-MM-DD")
      : "";
    const toDate = formData.ToDate ? formData.ToDate?.format("YYYY-MM-DD") : "";
    const PolicyNo = formData.PolicyNo
      ? formData.PolicyNo?.toLowerCase().trim()
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

  const handleMovetoSearch = () => {
    navigate("/advancesearch");
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
      // setCALL_TyPES(transformedData);
      setCALL_TyPES(funCallType(transformedData, transformedSubType));
      setRequestModeLU(rquestModeData);
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

  const funCallType = (calltypes, subtypes) => {
    if (loggedUser?.boe) {
      return [...calltypes, ...subtypes].map((ele, index) => {
        return {
          ...ele,
          value: index + 1,
        };
      });
    } else {
      return [...calltypes].map((ele, index) => {
        return {
          ...ele,
          value: ele.mstID,
        };
      });
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
        .filter((ele) => ele?.mstParentID === obj?.mstParentID)
        .map((ele) => ({
          ...ele,
          label: ele.mstDesc,
          value: ele.mstID,
        }));
      setSubTypeLU(transformedData);
      let slectedCALL_TYP = CALL_TYP[0].value?.find((ele) => {
        // return ele.mstID === obj?.mstID
        return ele.mstID === obj.mstParentID;
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

      form.setFieldsValue({
        callType: slectedCALL_TYP?.mstDesc,
        subType: obj?.mstID,
      });
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

  return (
    <>
      <div className="main-start">
        <div className="w-94">
          <div className="d-flex justify-center align-center">
            <h6 className="advance-title text-center">BOE Dashboard</h6>
          </div>

          <Row gutter={[24]} className="mb-16">
            <Col xs={24} sm={24} md={7} lg={7} xxl={7}>
              <Card title="Apply Filters" className="mb-16 text-center">
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
                          className="cust-input"
                          maxLength={100}
                        />
                      </Form.Item>
                    </Col>
                    <Col
                      className="m-10"
                      xs={24}
                      sm={24}
                      md={24}
                      lg={24}
                      xxl={24}
                    >
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
                    <Col
                      className="m-10"
                      xs={24}
                      sm={24}
                      md={24}
                      lg={24}
                      xxl={24}
                    >
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
                    <Col
                      className="m-10"
                      xs={24}
                      sm={24}
                      md={24}
                      lg={24}
                      xxl={24}
                    >
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
                        ></Select>
                      </Form.Item>
                    </Col>
                    <Col
                      className="m-10"
                      xs={24}
                      sm={24}
                      md={24}
                      lg={24}
                      xxl={24}
                    >
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
                          // onSearch={onSearch}
                          options={statusLU}
                          // filterOption={filterOption}
                          // onChange={(e) => {handleSubTypeChange(e); }}
                        ></Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
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
                    <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
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

                    <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
                      <Form.Item className="mb-0">
                        <div className="d-flex justify-start">
                          <Button
                            type="primary"
                            className="primary-btn mr-12"
                            htmlType="submit"
                            // Call the searchData function when the button is clicked
                          >
                            Search
                          </Button>{" "}
                          <Button
                            type="primary"
                            className="primary-btn move-search"
                            onClick={() => handleMovetoSearch()}
                          >
                            Move to Search Screen
                          </Button>{" "}
                        </div>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Col>

            <Col xs={24} sm={24} md={17} lg={17} xxl={17}>
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
export default connect(mapStateToProps, mapDispatchToProps)(BOEDashboard);
