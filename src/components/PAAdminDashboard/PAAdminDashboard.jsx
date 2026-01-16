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
import { filterOption } from "../../utils/HelperUtilites";

const PAAdminDashboard = (props) => {
  const loggedUser = useSelector((state) => state?.userProfileInfo?.profileObj);
  const { sharedData } = useData();
  const [form] = Form.useForm();
  const navigate = useNavigate();
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
  const [isadvacedModal, setIsadvacedModal] = useState(false);
  const [isClosedSRCheckBox, setIsClosedSRCheckBox] = useState(false);
  const [isTatData, setIsTatData] = useState({});
  const ToDate = form.getFieldValue("ToDate");
  const FromDate = form.getFieldValue("FromDate");
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

  // const onSelectChange = (record) => {
  //    let newSelectedRowKeys = []; // Initialize an empty array to hold the new selected row keys

  //    if (selectedRowKeys.includes(record?.serviceNo)) {
  //      // If the clicked checkbox is already selected, deselect it
  //      setSelectedRowKeys([]);
  //    } else {
  //      // If the clicked checkbox is not already selected, clear the existing selection and select the clicked checkbox
  //      newSelectedRowKeys = [record?.serviceNo];
  //      setSelectedRowKeys(newSelectedRowKeys);

  //    }
  //  };
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
  // const onSelectChange = (record) => {
  //   let newSelectedRowKeys = [...selectedRowKeys]; // Clone the existing selected keys
  //   let newSelectionList = [...selectionList]; // Clone the existing selection list

  //   if (selectedRowKeys.includes(record?.serviceNo)) {
  //     // If the clicked checkbox is already selected, deselect it
  //     newSelectedRowKeys = newSelectedRowKeys.filter(key => key !== record.serviceNo);
  //     newSelectionList = newSelectionList.filter(item => item.serviceNo !== record.serviceNo);
  //   } else {
  //     // If the clicked checkbox is not already selected, clear the existing selection and select the clicked checkbox
  //     newSelectedRowKeys = [record?.serviceNo];
  //     newSelectionList = [record];
  //   }

  //   setSelectedRowKeys(newSelectedRowKeys);
  //   setSelectionList(newSelectionList);
  // };

  // Define a function to get mode name based on reqMode number
  function getRequestModeName(reqMode) {
    if (Array.isArray(requestModeLU) && requestModeLU?.length > 0) {
      const foundItem = requestModeLU?.find((item) => item.mstID === reqMode);
      return foundItem ? foundItem.label : "";
    }
    return ""; // Return "" if the list is empty or not an array
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
    //     {
    //       title: "Action",
    //       dataIndex: "action",
    //       render: (_, record) => (
    //         <Space size="middle">
    // <a className="editIcon"> <i  onClick={() => handleAction(record)} className="bi bi-pencil-square"></i></a>
    //         </Space>
    //       ),
    //     },
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

  const handleDateChange = () => {};
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

  const GetStatusCount = (status) => {
    const filteredItems = countData.filter((item) => item.status === status);
    if (filteredItems?.length === 0) {
      return 0;
    }
    return (
      <div key={filteredItems[0].status}>
        <p>{filteredItems[0].count}</p>
      </div>
    );
  };
  //   const GetStatusCount = (status) => {
  //     const count = countData.map((item, index) => {
  //       if (item.status === status) {

  //         return (
  //           <div key={index}>
  //             <p>{item.count}</p>
  //           </div>
  //         );
  //       }
  //     })
  //     return count;
  // }
  //let count = 0;
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

  const getBoeData = async (formData, fromDate, toDate, searchText) => {
    setIsLoading(true);
    let obj = { userId: loggedUser?.userName, role: loggedUser.role };
    let response = apiCalls.getPOSData(obj);
    response
      .then((val) => {
        if (val?.data) {
          // Filter data based on date range
          let filteredData = val?.data?.filter((d) => {
            const date = d.date;
            const policyNumber = d.policyNo.toLowerCase();
            return (
              (!fromDate || date >= fromDate) &&
              (!toDate || date <= toDate) &&
              (!searchText || policyNumber.includes(searchText))
            );
          });
          if (filteredData) {
            setData(filteredData);
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
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const handlePolicyLink = (item) => {
    let sentObj = {};
    sentObj.emailId = item?.emailID;
    sentObj.mobileNo = item?.mobileNo;
    sentObj.dob = item?.dob;
    props?.updateSentDetails(item);
    navigate("/policydetails", { state: item });
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
  const renderTableData = () => {
    return data?.map((value, index) => {
      const rejectStatus =
        value.status === "REJECTED" ? "Closed with Requirements" : "PENDING";
      const {
        srvReqRefNo,
        date,
        policyNo,
        applicationNo,
        callTypeName,
        subTypeName,
        poName,
        laName,
        policyStatus,
        proposerName,
        sumAssured,
        premiumAmt,
        agentName,
        pinCode,
        pan,
        mobileNo,
        role,
        caseType,
      } = value;
      return (
        <>
          <tr key={index}>
            <td>
              <a className="editIcon">
                {" "}
                <i
                  onClick={() => handleAction(value)}
                  className="bi bi-pencil-square"
                ></i>
              </a>
            </td>
            <td>{srvReqRefNo}</td>
            <td>{date}</td>
            <td>{policyNo}</td>
            <td>{callTypeName}</td>
            <td>{subTypeName}</td>
            <td>{rejectStatus}</td>
            <td></td>
            <td>{proposerName}</td>
            <td>
              {sumAssured && (
                <NumericFormat
                  value={sumAssured}
                  decimalSeparator="."
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={8}
                />
              )}
            </td>
            <td>
              {premiumAmt && (
                <NumericFormat
                  value={premiumAmt}
                  decimalSeparator="."
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={8}
                />
              )}
            </td>
            <td>{agentName}</td>
            <td>{pinCode}</td>
            <td>{pan}</td>
          </tr>
        </>
      );
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

    // if(!fromDate && !toDate && !PolicyNo){        //02-04-24 Naga Raju K
    //     message.error({
    //       content:"Please Enter Date or Policy No",
    //       className: "custom-msg",
    //       duration: 2,
    //     });
    //     return
    //   }

    //   if(PolicyNo){
    //     setRuless(PolicyNo ? [{ required: false, message: 'Select Date' }] : [{ required: true, message: 'Select Date' }]);
    //   }

    // getBoeData(formData,fromDate,toDate,searchText);
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
      IncludeClosed: isClosedSRCheckBox,
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
    if (props?.setSubTypeId) {
      props?.setSubTypeId(value);
    }
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
    //  if(!selectedUserName){
    //   message.destroy();
    //   message.warning("Please select Assigned To");
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

  return (
    <>
      <div className="main-start">
        <div className="w-94">
          <div className="d-flex justify-center align-center">
            <h6 className="advance-title text-center">PA Admin Dashboard</h6>
            {/* <p>
            <Button
                  type="primary"
                  className="primary-btn"
                  onClick={()=>handleMovetoSearch()}
                >
                  Move to Search Screen
                </Button>{" "}
            </p> */}
          </div>

          <Row gutter={[16, 16]} className="mb-16 justify-center">
            <Col xs={24} sm={24} md={12} lg={6} xxl={6}>
              {/* <Table
              title={() => 'Pending SR'}
              columns={columnsList}
              dataSource={dataPendingSR}
              pagination={false}
              bordered
            /> */}
              {/* <div className="reuirement">
             <table className="mandatecancel-table">
      <thead>
        <tr>
          <th colSpan={2} className="p-16 text-center">Pending SR</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Within TAT</td>
          <td className="p-24 text-red" onClick={()=>handleAction()}>{isTatData?.dashboardSummaries?.[0]?.withinTat ?? 'XX'}</td>
        </tr>
        <tr style={{ backgroundColor: '#f0f0f0' }}>
          <td>Beyond TAT</td>
          <td className="p-24 text-red" onClick={()=>handleAction()}>{isTatData?.dashboardSummaries?.[0]?.beyondTat ?? 'XX'}</td>
        </tr>
      </tbody>
    </table>
    </div> */}

              <table className="table table-bodered">
                <thead>
                  <tr>
                    <th colSpan={2} className="pl-24">
                      Pending SR
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-24">Within TAT</td>
                    <td
                      className="p-24 text-red"
                      // onClick={()=>handlePendingData("pendingwithintat")}
                    >
                      {isTatData?.dashboardSummaries?.[0]?.withinTat ?? "XX"}
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "#f0f0f0" }}>
                    <td className="p-24">Beyond TAT</td>
                    <td
                      className="p-24 text-red"
                      // onClick={()=>handlePendingData("pendingbeyondtat")}
                    >
                      {isTatData?.dashboardSummaries?.[0]?.beyondTat ?? "XX"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
            <Col xs={24} sm={24} md={12} lg={6} xxl={6}>
              {/* <Table
              title={() => 'Internal Requirement'}
              columns={columnsList}
              dataSource={dataInternalRequirement}
              pagination={false}
              bordered
            /> */}
              {/* <div className="reuirement">
             <table className="mandatecancel-table">
      <thead>
        <tr>
          <th colSpan={2} className="p-16 text-center">Internal Requirement</th>
        </tr>
      </thead> */}
              <table className="table table-bodered">
                <thead>
                  <tr>
                    <th colSpan={2} className="pl-24">
                      Internal Requirement
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-24">Within TAT</td>
                    <td
                      className="p-24 text-red"
                      // onClick={()=>handleInternalRequirementData("internalwithintat")}
                    >
                      {" "}
                      {isTatData?.dashboardSummaries?.[1]?.withinTat ?? "XX"}
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "#f0f0f0" }}>
                    <td className="p-24">Beyond TAT</td>
                    <td
                      className="p-24 text-red"
                      // onClick={()=>handleInternalRequirementData("internalbeyondtat")}
                    >
                      {isTatData?.dashboardSummaries?.[1]?.beyondTat ?? "XX"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>

            {/* <Col xs={24} sm={24} md={12} lg={6} xxl={6}> */}

            {/* <Table
              title={() => 'Follow Ups'}
              columns={followUpColumnsList}
              dataSource={dataFollowUps}
              pagination={false}
              bordered
            /> */}
            {/* <div className="reuirement">
             <table className="mandatecancel-table">
      <thead>
        <tr>
          <th colSpan={2} className="p-16 text-center">Follow Ups</th>
        </tr>
      </thead> */}

            {/* <table className="table table-bodered">
                 <thead>
                   <tr >
                   <th  colSpan={2} className="pl-24">Follow Ups</th>
                   </tr>
                 </thead>
      <tbody>
        <tr>
          <td className="p-24">Due Today</td>
          <td 
          className="p-24 text-red" 
           onClick={() => getDashboardFollowUpData('FollowUpsDueToday')}
          >{'XX'}</td>
        </tr>
        <tr style={{ backgroundColor: '#f0f0f0' }}>
          <td className="p-24">Open</td>
          <td 
          className="p-24 text-red" 
           onClick={() => getDashboardFollowUpData('FollowUpsOpen')}
          >{'XX'}</td>
        </tr>
      </tbody>
    </table>
          </Col> */}

            <Col xs={24} sm={24} md={12} lg={4} xxl={4}>
              <div className="button-container">
                <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => setIsadvacedModal(true)}
                >
                  Advance Search
                </Button>
                <div className="inline-elements">
                  {/* <Checkbox 
            type="checkbox" 
             checked={isClosedSRCheckBox} 
             onChange={()=>setIsClosedSRCheckBox(!isClosedSRCheckBox)} 
            className="checkbox-margin" /> */}
                  {/* <Button type="primary" className="primary-btn"> */}
                  {/* <a 
              className="text-red text-underline fs-14" 
               onClick={()=>searchData(null,isClosedSRCheckBox)}
              >Include Closed SR</a> */}
                  {/* </Button> */}
                </div>

                {/* <Button
            type="primary"
            className="primary-btn"
            onClick={handleMovetoSearch}
          >
            Raise SR
          </Button>
          <Button
            type="primary"
            className="primary-btn"
            onClick={() => handleRandomCall()}
          >
            Random Call
          </Button> */}
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
              // onFinish={searchData}
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
                      onSearch={onSearch}
                      options={statusLU}
                      filterOption={filterOption}
                      onChange={(e) => {
                        handleSubTypeChange(e);
                      }}
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
                      filterOption={filterOption}
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
                  <Form.Item className="mb-0">
                   
                  </Form.Item>
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
                      onClick={() => saveAssignTo()}
                    >
                      Submit
                    </Button>
                    {/* <Button
              type="primary"
              className="primary-btn"
              onClick={() => setIsShowAssignCases(false)}
            >
            Cancel
            </Button> */}
                  </div>
                </Col>
              </Row>
            </Form>
          </Modal>

          <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
            <Form.Item className="mb-0">
              <div className="d-flex">
                {/* <Button
            type="primary"
            className="primary-btn mr-12"
            htmlType="submit"
            // Call the searchData function when the button is clicked
          >
            Search
          </Button> { " "} */}
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
              style={{ width: "100%" }} // Set width to 100%
              options={usersListLU?.map(user => ({
    label: user.userName,
    value: user.usrID
  }))}
            >
             
            </Select>
          </Form.Item>
          </Form>
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
export default connect(mapStateToProps, mapDispatchToProps)(PAAdminDashboard);
