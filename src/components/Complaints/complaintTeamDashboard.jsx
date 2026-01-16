import React, { useState, useEffect, useRef } from 'react';
import { Spin, message, Table, Space, Row, Col, Form, Select, Input, Checkbox, Button, Modal, Tooltip, Radio, Switch,DatePicker } from "antd";
import { useSelector } from 'react-redux';
import moment from "moment";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { connect } from "react-redux";
import apiCalls from "../../api/apiCalls";
import CloseIcon from "../../assets/images/close-icon.png";


const ComplaintTeamDashboard = () => {
  const { Option } = Select;
  const loggedUser = useSelector(state => state?.userProfileInfo?.profileObj);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dateFormat = "DD/MM/YYYY";
  const user = location.state?.user;

  // Access the state passed during navigation
  const { state } = location;
  const [showTotalPages, setShowTotalpages] = useState(null);
  const shouldLog = useRef(true);
  const [form] = Form.useForm();
  const [isShowAssignCases, setIsShowAssignCases] = useState(false);
  const [callTypeLU, setCallTypeLU] = useState([]);
  const [selectedCallType, setSelectedCallType] = useState("");
  const [subTypeLU, setSubTypeLU] = useState([]);
  const [selectedSubType, setSelectedSubType] = useState(null);
  const [masterData, setMasterData] = useState([]);
  const [selectedCaseType, setSelectedCaseType] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState(null);
  const [usersListLU, setUsersListLU] = useState([]);
  const [selectionList, setSelectionList] = useState([]);
  const [userAssigned, setUserAssigned] = useState(false);
  const [tableKey, setTableKey] = useState(0); // Key to force remount
  const [caseStatusLU, setCaseStatusLU] = useState([]);
  const [clientIDLU, setClientIDLU] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedStatusUser, setSelectedStatusUser] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [isAdvanceSearchModalOpen,setIsAdvanceSearchModalOpen] = useState(false);  //BOEUSER COde START
  const [CALL_TyPES, setCALL_TyPES] = useState([]);
  const [requestModeLU, setRequestModeLU] = useState([]);
  const [Ruless,setRuless] = useState();
  const [isNoData,setIsNoData]=useState('');
  const [complaintCount,setComplaintCount]=useState([]);
  const [ageingCount,setAgeingCount]=useState([]);
  const [isTatData,setIsTatData] = useState({});
  const [isFollowUpListModal, setIsFollowUpListModal] = useState(false);
  const [isFollowUpsLoader,setIsFollowUpsLoader] = useState(false);
  const [followUpData, setFollowUpData] = useState([]);
  const [showAgeingModal, setShowAgeingModal] = useState(false);
  const statusLU = [
    { label: 'Closed', value: 'closed' },
    { label: 'Pending', value: 'pending' },
    { label: 'Closed With Requirements', value: 'closedwithrequirements' },
    { label: 'Failed', value: 'failed' },
    ];
    // const ageingListLU = Array.from({ length: 15 }, (_, index) => ({ label: index + 1, value: index + 1 }));
    const ageingListLU = Array.from({ length: 1000 }, (_, index) => ({label: index,value: index,  }));
    
    const statusIGMSLU = [
      { label: 'New', value: 'New' },
      { label: 'Acknowledged', value: 'Acknowledged' },
      { label: 'Pending', value: 'Pending' },
      { label: 'Attended To', value: 'Attended To' },
      { label: 'Escalated', value: 'Escalated' },
      { label: 'Re-open', value: 'Re-open' },
      { label: 'Closed', value: 'Closed' },
      ];


  const columns = [
    // {
    //   title: "ACTION",
    //   dataIndex: "action",
    //   render: (_, record) => (
    //     <Space size="middle">

    //       <a className="editIcon"> <i onClick={() => handleAction(record)} className="bi bi-eye"></i></a>

    //       {/* <Button
    //                       type="primary"
    //                       className="primary-btn panvalidate-btn"
    //                       onClick={() => handleAction(record.serviceNo)}
    //                     >
    //                       View
    //                     </Button> */}
    //     </Space>
    //   ),
    // },
    
    {
      title: "Service Request ID",
      dataIndex: "serviceNo",
      key: 'serviceNo',
      render: (_, record) => (
        <Link to={`/complaintsuser/${record.serviceNo}`} style={{ color: "black", borderBottom: "2px solid blue" }}>{record.serviceNo}</Link>
      ),
    },

    {
      title: 'Ageing',
      dataIndex: 'ageing',
      key: 'ageing',
      render: (ageing) => {
        let className = '';
        if (ageing >= 11) className = 'red-background';
        else if (ageing >= 5 && ageing <= 10) className = 'yellow-background';
  
        return (
          <td className={className}>
            {ageing}
          </td>
        );
      },
    },

    {
      title: "Policy No",
      dataIndex: "policyNo",
      showSorterTooltip: false,
    },
    {
      title: "PO Name",
      dataIndex: "poName",
      key: 'poName',
    },
    {
      title: "Complaint Date",
      dataIndex: "complaint_Date",
      key: "complaint_Date",
      render: (date) => {
        const formattedDate = moment(date, "MMM DD YYYY hh:mmA").format("DD-MM-YYYY");
        return formattedDate;
      }
    },
    {
      title: "Call Type",
      dataIndex: "callTypeName",
      key: 'callTypeName',
    
    },
    {
      title: "Sub Type",
      dataIndex: "subTypeName",
      key: 'subTypeName',
    
    },
    {
      title: "Complaint Type",
      dataIndex: "compl_Type",
      key: 'compl_Type',
    },
    {
      title: "Complaint Token ID",
      dataIndex: "irdA_Token_Number",
      key:"irdA_Token_Number"
    },
    {
      title: "Status",
      dataIndex: "status",
      key:"status"
    },
    {
      title: "IGMS Status",
      dataIndex: "igmsStatus",
      key: 'igmsStatus',
    },
    {
      title: "Mode",
      dataIndex: "reqModeName",
      key:"reqModeName"
    },

  ];

  const [data, setData] = useState([]);
  const handleUserNameChange = (e) => {
    setSelectedUserName(e);
    getUserRoles()
  }

  const handleStatusNameChange = (e) => {
    setSelectedStatusUser(e);
    getUserRoles()
  }

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const handleSubTypeChange = (e) => {
    setSelectedSubType(e);
    // getGridData(selectedCallType,e,'GrevienceAdmin',23,isChecked);
    getGridData(selectedCallType, e, loggedUser?.userName, 22, "pending", isChecked);
  }
  const total = (ageingCount?.oneDay || 0) +
                (ageingCount?.lessThanThreeDays || 0) +
                (ageingCount?.lessThanFiveDays || 0) +
                (ageingCount?.lessThanSevenDays || 0) +
                (ageingCount?.sevenToFifteenDays || 0)+
                (ageingCount?.greaterthanFifteenDays || 0);
  

  // const getGridData = async (callType, subType, userId, role, status, isChecked,SRequestID,ageing,fromDate,toDate,PolicyNo,TokenNo, IGMSstatus) => {
    const getGridData = async () => {
    setIsLoading(true);
    let formData = form.getFieldValue(); 
    let obj = { userId: loggedUser.userName, role: loggedUser.role };
    let callType = 24;
    let subType = formData.subType;
    let userId = loggedUser.userName;
    let role = loggedUser.role;
    let SRequestID=formData?.serviceRequestId || "";
    let ageing=formData?.ageing || ""
    let fromDate = formData.FormDate ? formData.FormDate.format('YYYY-MM-DD') : ''; 
    let toDate = formData.ToDate ? formData.ToDate.format('YYYY-MM-DD') : '';
    let PolicyNo = formData.PolicyNo ? formData.PolicyNo.toLowerCase().trim() : '';
    let status=formData?.status || ''
    let TokenNo=formData?.TokenNo;
    let IGMSstatus = formData?.IGMSstatus
     let response = apiCalls.GetComplaintSerReqByFilters(callType, subType, userId, role, status, isChecked,SRequestID,ageing,fromDate,toDate,PolicyNo,TokenNo, IGMSstatus);
   // let response = apiCalls.GetComplaintSerReqByFilters(callType, subType, loggedUser?.userName, 22, "pending", isChecked, SRequestID)
    response
      .then((val) => {
        if (val?.data) {
          const newData = val.data?.map((item, i) => ({
            ...item, // Spread the existing properties of the item
            key: i,  // Add a new property 'key' with the index value
          }));
          setData(newData);
          if(form.getFieldValue().callType !== 24)
          {
              form.resetFields();               
              form.setFieldsValue({});
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



  const getCTST = () => {
    setIsLoading(true);
    let obj =
    {
      "MasterRequest": [
        "CALL_TYP", "SUB_TYP", "CASE_STATUS", "CLIENTIDTYPE"
      ]
    }
    let CTST = apiCalls.ctst(obj);
    CTST.then((val) => {
      setMasterData(val.data);
      let data = val.data?.filter((ele) => ele.key === "CALL_TYP");
      let transformedData = data[0]?.value.filter((ele) => ele.mstID === 24).map((item) => ({
        ...item,
        label: item.mstDesc,
        value: item.mstID
      }));
      let caseStatus = val.data?.filter((ele) => ele.key === "CASE_STATUS");
      let caseStatusData = caseStatus[0]?.value.map((item) => ({
        ...item,
        label: item.mstDesc,
        value: item.mstID
      }));
      let clientIDs = val.data?.filter((ele) => ele.key === "CLIENTIDTYPE");
      let clientIDData = clientIDs[0]?.value.map((item) => ({
        ...item,
        label: item.mstDesc,
        value: item.mstID
      }));
      setCALL_TyPES(transformedData);
      setCallTypeLU(transformedData);
      setCaseStatusLU(caseStatusData);
      setClientIDLU(clientIDData);
      // setIsLoading(false);
    }).catch((err) => {
      // setIsLoading(false);
      message.destroy()
      message.error({
        content: err?.data?.responseBody?.errormessage,
        className: "custom-msg",
        duration: 2,
      });
    })

  }

  const handleAssignCases = () => {
    setIsShowAssignCases(true);
  };

  const getUserRoles = () => {
    setIsLoading(true);
    let response = apiCalls.GetUsersByRoleID(22);
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
  }

  

  const subTypeDropdown = async (value) => {
    let SUB_TYP = masterData?.filter((ele) => ele.key === "SUB_TYP");
    let data = SUB_TYP[0]?.value?.filter((ele) => ele?.mstParentID === value);
    let transformedData = data?.map((item) => ({
      ...item,
      label: item.mstDesc,
      value: item.mstID
    }));
    setSubTypeLU(transformedData);
  }

  const handleCallTypeChange = (value) => {
    setSelectedCallType(value);
    setSubTypeLU([]);
    setSelectedSubType(null);
    subTypeDropdown(value);
    form.setFieldsValue({ subType: null })
    // getGridData(value,selectedSubType,'GrevienceAdmin',23,isChecked);
    getGridData(value, selectedSubType, loggedUser?.userName, 22, "pending", isChecked);

  };

  const onSelectChange = (record) => {
    let newSelectedRowKeys = []; // Initialize an empty array to hold the new selected row keys
    if (selectedRowKeys.includes(record?.srvReqRefNo)) {
      // If the clicked checkbox is already selected, deselect it
      setSelectedRowKeys([]);
      setSelectionList([]);
    } else {
      // If the clicked checkbox is not already selected, clear the existing selection and select the clicked checkbox
      newSelectedRowKeys = [record?.srvReqRefNo];
      setSelectedRowKeys(newSelectedRowKeys);
      let val = [];
      val?.push(record);
      setSelectionList(val);
    }
  };

  const handleAction = (item) => {
    setIsTicketOpen(true)
    let serviceId = item?.serviceNo;
    const complaintDescriptionData = item?.transectionData.find(item => item.tagName === 'ComplaintDescription');
    const complaintDescription = complaintDescriptionData ? complaintDescriptionData.tagValue : '';
    form.setFieldsValue({
      complaintDescription: complaintDescription
    })
    // const tagValues = {};
    // item?.transectionData.forEach(item => {
    //   tagValues[item.tagName] = item.tagValue;
    // });
    // let obj = {
    //   cellType: item?.callTypeName,
    //   subType: item?.subTypeName,
    //   complaintDescription: complaintDescription,
    //   callTypeNum: item?.callType,
    //   subTypeNum: item?.subType,
    //   policyNo: item?.policyNo,
    //   serviceNo: item?.serviceNo,
    //   dob: item?.dob
    // }
    // navigate(`/grievanceuser/${serviceId}`, { state: obj });
  };

  const getDashboardFollowUpData =async (selectedFollowUpVal) => {  
    setIsFollowUpListModal(true);
    setIsFollowUpsLoader(true);
   const response=await apiCalls.getDashboardFollowUps(selectedFollowUpVal);
    if(response?.data) {
      setFollowUpData(response?.data);
    }
    else {
      message.destroy();
      setFollowUpData([]);
      setIsFollowUpsLoader(false);
      message.error({
        content: response?.data?.responseBody?.errormessage || "Something went wrong please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  };


  const saveAssignTo = async () => {
    if (selectionList?.length === 0) {
      message.destroy();
      message.warning("Please select atleast one record");
      return;
    }
    else if (!selectedStatusUser) {
      message.destroy();
      message.warning("Please select user name");
      return;
    }
    let obj = {
      "SrvReqID": null,
      "UsrID": selectedStatusUser,
      "RoleID": 22,
      "AllocatedOn": new Date(),
      "BranchID": 0,
      "ReqSignedOn": new Date(),
    }
    let mappedObjects = selectionList.map((item, i) => ({
      ...obj,
      "SrvReqID": item.srvReqID,
      "UsrID": selectedStatusUser,
      "AllocatedOn": new Date(),
      "BranchID": 0,
      "ReqSignedOn": new Date(),
    }));
    setIsLoading(true);
    let response = apiCalls.AssignToGrevienceUser(mappedObjects);
    response
      .then((val) => {
        if (val?.data) {
          setUserAssigned(true);
          // window.location.reload();
          // After successful save, clear the selected rows
          setSelectionList([]);

          // Force remount of the Table component to clear the selection
          setTableKey((prevKey) => prevKey + 1);
          // getCTST();
          // getAdminData();
          // getGridData();
          message.success("Users Assigned Successfully");
        } else {
          message.destroy();
          message.error({
            content:
              val?.data ||
              "Something went wrong please try again!",
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

  useEffect(() => {
    if (shouldLog.current || user) {
      shouldLog.current = false;
      getSearchData();
      getCTST();
      getUserRoles()
      GetComplaintDashboardCountApi();
      searchData();
      // getGridData();
    }
  }, [user]);

  const onSearch = (value) => {
    // console.log('search:', value);
  };

  const getSearchData = async () => {
    setIsLoading(true);
    let obj = { userId: loggedUser.userName, role: loggedUser.role };
    let callType = 24;
    let subType = '';
    let userId = loggedUser.userName;
    let role = loggedUser.role;
    let formData = form.getFieldValue(); 
    let response = apiCalls.GetComplaintSerReqByFilters(callType, subType, loggedUser?.userName, 22, formData?.status, isChecked);
    response.then((val) => {
      if (val?.data) {
        // setData(val?.data);
        const newData = val.data?.map((item, i) => ({
          ...item, // Spread the existing properties of the item
          key: i,  // Add a new property 'key' with the index value
        }));
        setData(newData);
        setShowTotalpages(val?.data?.length);
      } else {
        message.destroy();
        message.error({
          content: val?.data?.responseHeader?.message || "Something went wrong please try again!",
          className: "custom-msg",
          duration: 2,
        });
        navigate(`/grievanceuser`);
      }
      setIsLoading(false);
    }).catch((err) => {
      setIsLoading(false);
    })
  }

  
  const handleModalClose = () => {
    form.resetFields();               // Clear form data
    form.setFieldsValue({});         // Fallback clear
    setIsAdvanceSearchModalOpen(false); // Close modal
  };

const GetComplaintDashboardCountApi=()=>{
  let response = apiCalls.GetComplaintDashboardCount(24, loggedUser?.userName, 22);
  response.then((val) => {
    if (val?.data) {
      setComplaintCount(val?.data?.dashboardSummaries)
    } else {
      message.destroy();
      message.error({
        content: val?.data?.responseHeader?.message || "Something went wrong please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
    setIsLoading(false);
  }).catch((err) => {
    setIsLoading(false);
  })
}
const GetAgeingCount=()=>{
  let response = apiCalls.GetAgeingCount(24,loggedUser?.userName, 22);
  response.then((val) => {
    if (val?.data) {
      const ageingvalues=val?.data.find((item)=>
        item.userName ===loggedUser?.name
      )
      setAgeingCount(ageingvalues)
    } else {
      message.destroy();
      message.error({
        content: val?.data?.responseHeader?.message || "Something went wrong please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
    setIsLoading(false);
  }).catch((err) => {
    setIsLoading(false);
  })
}

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
      content: response?.data?.responseBody?.errormessage || "Something went wrong, please try again!",
      className: "custom-msg",
      duration: 2,
    });
  }
};

  const getRowClassName = (record) => {
    const { ageing } = record;
    if (ageing >= 11 && ageing <= 14) return 'red-background';
    if (ageing >= 5 && ageing <= 10) return 'yellow-background';
    return ''; // No color for 0-4 days
};

  const selectionType = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectionList(selectedRows);
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };
  const statusData = [
    {
      id: 1,
      name: "Pending",
      value: "pending"
    },
    {
      id: 2,
      name: "Closed",
      value: "closed"
    }
  ]

  const handleSearch = () => {
    const formData = form.getFieldsValue();


    if (!formData?.callType) {
      message.error({
        content: "Please Select CallType",
        className: "custom-msg",
        duration: 2,
      });
      return
    }
    let callType = formData?.callType || '';
    let subType = formData?.subType || '';
    let status = formData?.status || '';
    let userName = formData?.userName || '-1000';
    getGridData(callType, subType, loggedUser?.userName, "-1000", status, isChecked);
  }
  const handleCheckBox = (e) => {
    setIsChecked(e.target.checked)
  }
  const searchData =async (selectedVal,includeCloseSR) => { 
    if (isAdvanceSearchModalOpen) {
    if (!selectedVal || typeof selectedVal !== 'object') {
      message.error("Please enter at least one search criteria.");
      return;
    }
  
    const hasAnyValue = Object.values(selectedVal).some((value) => {
      if (Array.isArray(value)) return value.length > 0;
      if (moment.isMoment(value)) return true;
      if (typeof value === 'object' && value !== null) return Object.keys(value).length > 0;
      return value !== undefined && value !== null && value !== '';
    });
  
    if (!hasAnyValue) {
      message.error("Please enter at least one search criteria.");
      return;
    }
}
    setIsAdvanceSearchModalOpen(false);  
    setIsLoading(true);
    const formData = form.getFieldsValue(); 
    const SRequestID=formData?.serviceRequestId || "";
    const ageing=formData?.ageing || ""
    const fromDate = formData.FormDate ? formData.FormDate.format('YYYY-MM-DD') : ''; 
    const toDate = formData.ToDate ? formData.ToDate.format('YYYY-MM-DD') : '';
    const PolicyNo = formData.PolicyNo ? formData.PolicyNo.toLowerCase().trim() : '';
    const status=formData?.status || ''
    const TokenNo=formData?.TokenNo;
    const IGMSstatus = formData?.IGMSstatus
    let obj={
      fromDate:fromDate || '',
      toDate:toDate || '',
      policyNumber:PolicyNo,
      userId:loggedUser.userName,
      role:loggedUser.role,
      callType: selectedCallType || '',
      subType: formData?.subType || '',
      mode: formData?.mode,
      status:formData?.status == undefined ? 'PENDING' : formData?.status ,
      ageing: formData?.ageing,
      assignedTo: formData?.assignedTo,
      ticketIDNo : selectedVal?.serviceRequestId,
      IRDATokenNumber: formData?.IRDATokenNumber
    }

    const response=await apiCalls.getBOEUserDashboard(obj,includeCloseSR);
    if(response.status===200) {
      //setIsDataLoading(false);
      setIsTatData(response?.data);
     
      
      setIsLoading(false);
      
    }
    else {
      setData({});
      //setIsDataLoading(false);
      setIsLoading(false);
      message.destroy()
      message.error({
        content: response?.data?.responseBody?.errormessage || "Something went wrong please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }

    let callType='';
   let isChecked="" 
     getGridData(callType, selectedSubType, loggedUser?.userName, 22, status, isChecked, SRequestID, ageing, fromDate, toDate, PolicyNo, TokenNo, IGMSstatus);

    // return
 
  //  const response=await apiCalls.getBOEUserDashboard(obj,includeCloseSR);
  //   if(response?.status === 200) {
  //     // setIsDataLoading(false);
  //     // setIsTatData(response?.data);
  //     let filteredData = response?.data?.pOSLists;
  
  //     setData(filteredData);
  //     setIsLoading(false);
      
  //   }
  //   else {
  //     setData({});
  //     // setIsDataLoading(false);
  //     setIsLoading(false);
  //     message.destroy()
  //     message.error({
  //       content: response?.data?.responseBody?.errormessage || "Something went wrong please try again!",
  //       className: "custom-msg",
  //       duration: 2,
  //     });
  //   }
  };

  const handleViewUserAgeing = () => {
    setShowAgeingModal(true);
    GetAgeingCount();
  };

  // const highlight = { color: '#c21b17',fontWeight: 'bold' };

//   const boxStyle = {
//   backgroundColor: '#f3f3f3',
//   border: '1px solid #c4302b',
//   borderRadius: '8px',
//   padding: '16px',
//   height: '100%',
// };

  return (
    <Spin spinning={isLoading}>
      <div className="main-start">
        <div className="w-94">
          {/* <Form
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
            autoComplete="off"
          >
            <Row gutter={[16, 16]} className='dashboard-filters'>
              <Col xs={12} sm={12} md={4} lg={4} xxl={4}>
                <Form.Item
                  label="Call Type"
                  name="callType"
                  className="input-label mb-0"
                >
                  <Select
                    showSearch
                    placeholder="Select a Call Type"
                    optionFilterProp="children"
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={callTypeLU}
                    onChange={(e) => handleCallTypeChange(e)}
                  />
                </Form.Item>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4} xxl={4}>
                <Form.Item
                  label="Sub Type"
                  name="subType"
                  className="input-label mb-0"
                >
                  <Select
                    showSearch
                    placeholder="Select a Sub Type"
                    optionFilterProp="children"
                    onChange={(e) => handleSubTypeChange(e)}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={subTypeLU}
                  />
                </Form.Item>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4} xxl={4}>
                <Form.Item
                  label="Status"
                  name="status"
                  className="input-label mb-0"
                >
                  <Select
                    showSearch
                    placeholder="Select a Status"
                    optionFilterProp="children"
                    onChange={(e) => handleUserNameChange(e)}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    style={{ width: '100%' }}  
                  >
                    {statusData?.map((users, idx) => (
                      <Option key={idx} value={users?.value}>
                        {users?.name}
                      </Option>
                    ))}

                  </Select>
                </Form.Item>

              </Col>
              <Col xs={12} sm={12} md={4} lg={4} xxl={4}>
                <Form.Item
                  label="User Name"
                  name="userName"
                  className="input-label mb-0"
                >
                  <Select
                    showSearch
                    placeholder="Select a User Name"
                    optionFilterProp="children"
                    onChange={(e) => handleStatusNameChange(e)}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    style={{ width: '100%' }}  
                  >
                    {usersListLU?.map((users, idx) => (
                      <Option key={idx} value={users?.usrID}>
                        {users?.userName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

              </Col>

              <Col xs={12} sm={12} md={4} lg={4} xxl={4}>
                 <Form.Item
                  label="Include Closed Complaints"
                  name="includeClosedComplaints"
                  className="input-label mb-0"
                >
                 <Switch
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                  />
                    </Form.Item>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4} xxl={4}>
                <br />
                <Button
                  type="primary"
                  className="complaints-btn"
                  htmlType="submit" onClick={handleSearch}>Search</Button>
              </Col>
            </Row>
          </Form> */}

{/* <Row gutter={[16, 16]} className="mb-16 d-flex"> */}
<Row gutter={[16, 16]}>
        {/* Complaints Type */}
        <Col xs={24} sm={12} md={6}>
          <div className='boxStyle'>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Complaints Type</h3>
            <p>Potential</p>
            <p>Complaint: <span className='highlight'>{complaintCount[0]?.potentionalComplaint}</span></p>
            <p>IGMS</p>
            <p>Complaint: <span className='highlight'>{complaintCount[0]?.igmsComplaint}</span></p>
          </div>
        </Col>

        {/* Potential Complaint Status */}
        <Col xs={24} sm={12} md={6}>
          <div className='boxStyle'>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}><b>Potential Complaint Status</b></h3>
            <p>Pending Tickets: <span className='highlight'>{complaintCount[0]?.potentialPendingTicketsCount}</span></p>
            <p>Closed Tickets: <span className='highlight'>{complaintCount[0]?.potentialClosedTicketsCount}</span></p>
          </div>
        </Col>

        {/* IGMS Complaints Status */}
        <Col xs={24} sm={12} md={6}>
          <div className='boxStyle'>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}><b>IGMS Complaints Status</b></h3>
            <Row gutter={8}>
              <Col span={12}><p>New: <span className='highlight'>{complaintCount[0]?.newTicketsCount}</span></p></Col>
              <Col span={12}><p>Acknowledged: <span className='highlight'>{complaintCount[0]?.acknowledgedTicketsCount}</span></p></Col>
              <Col span={12}><p>Pending: <span className='highlight'>{complaintCount[0]?.pendingTicketsCount}</span></p></Col>
              <Col span={12}><p>Attended To: <span className='highlight'>{complaintCount[0]?.attendedToTicketsCount}</span></p></Col>
              <Col span={12}><p>Re-Open: <span className='highlight'>{complaintCount[0]?.reOpenComplaintCount}</span></p></Col>
              <Col span={12}><p>Escalated: <span className='highlight'>{complaintCount[0]?.escalatedComplaintCount}</span></p></Col>
              <Col span={12}><p>Closed: <span className='highlight'>{complaintCount[0]?.closedComplaintCount}</span></p></Col>
            </Row>
          </div>
        </Col>

        {/* Follow Ups */}
        <Col xs={24} sm={12} md={6}>
          <div className='boxStyle'>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}><b>Follow Ups</b></h3>
            <p>Due Today: <span className='highlight'>0</span></p>
            <p>Open: <span className='highlight'>6</span></p>
          </div>
        </Col>
      </Row>
{/* BUTTONS ROW */}
<Row justify="start" gutter={[16, 16]} style={{ marginTop: 16 }}>
  <Col>
     <p className="complain-ageing mb-2" onClick={handleViewUserAgeing}>View User Ageing Bucket</p>
  </Col>
  <Col>
    <Button
                   type="primary"
                   className="primary-btn move-search mb-2"
                   onClick={() => setIsAdvanceSearchModalOpen(!isAdvanceSearchModalOpen)}
                 >
                   Advance Search
                 </Button>
  </Col>
</Row>




          {/* <div className="table-container dashboard">
          <Table
        columns={columns}
        dataSource={data}
        //bordered={true}
        x={true}
        pagination={{
          //pageSizeOptions: ["5", "10", "15", "15"],
          pageSize: 10,
          //showSizeChanger: true,
          defaultPageSize: 5,
         // size:"small",
           total: {showTotalPages},
          //showTotal: `Total ${showTotalPages} items`
        }}
      />
          </div> */}

          <div className="table-container dashboard">
          <Table
  key={tableKey}
  rowKey={(record) => record.key}
  columns={columns}
  dataSource={data}
  pagination={{
    pageSize: 5,
    defaultPageSize: 5,
    total: showTotalPages,
  }}
/>


          </div>
          {/* <Row gutter={[16, 16]} className='dashboard-filters'>
            <Col xs={12} sm={12} md={4} lg={4} xxl={4}>
              <Form.Item
                label="Assign To"
                name="userName"
                className="input-label mb-0"
              >
                <Select
                  showSearch
                  placeholder="Select a User Name"
                  optionFilterProp="children"
                  onChange={(e) => handleStatusNameChange(e)}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  style={{ width: '100%' }}  // Set width to 100%
                >
                  {usersListLU?.map((users, idx) => (
                    <Option key={idx} value={users?.usrID}>
                      {users?.userName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>


            </Col>
            <Col xs={12} sm={12} md={4} lg={1} xxl={1}>
              <span className='assignto-icon'>
                <span className="editIcon c-pointer"> <i onClick={() => saveAssignTo()} className="bi bi-send"></i></span>
              </span>
            </Col>
          </Row> */}
        </div>

      </div>

      <Modal
        title="Complaint Description"
        open={isTicketOpen}
        destroyOnClose={true}
        width={1200}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setIsTicketOpen(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >

        <div>

          <Form form={form} >
            <Form.Item label="Complaint Description" name="complaintDescription" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} style={{ fontWeight: "bold" }}>
              <Input.TextArea
                rows={6}
                placeholder=""
                disabled
                style={{ color: "black !important" }}
              />
            </Form.Item>



            <div style={{ display: 'flex', width: '100%', justifyContent: "center" }}>
              <Button type="primary" className="primary-btn mt-4 me-3" htmlType="submit"
                // onClick={saveCommentButton}
                onClick={() => setIsTicketOpen(false)}
              >
                Close
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
          <Modal
  title={<span style={{ color:"#b21f1f", fontWeight: 'bold' }}>Ageing Count</span>}
  open={showAgeingModal}
  destroyOnClose={true}
  closeIcon={
    <Tooltip title="Close">
      <span onClick={() => setShowAgeingModal(false)}>
        <img src={CloseIcon} alt="" />
      </span>
    </Tooltip>
  }
  footer={null}
  width={500}
  className="ageing-modal"
>
  <div style={{ textAlign: 'center', padding: '10px' }}>
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
      }}
    >
      <thead>
        <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid black' }}>
          <th style={{ border: '1px solid black', padding: '10px' }}>Ageing</th>
          <th style={{ border: '1px solid black', padding: '10px' }}>Count</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="table-hyper">&lt;24 Hrs</td>
          <td className="table-hyper">{ageingCount?.oneDay}</td>
        </tr>
        <tr>
          <td className="table-hyper">Less than 3 days</td>
          <td className="table-hyper">{ageingCount?.lessThanThreeDays}</td>
        </tr>
        <tr>
          <td className="table-hyper">Less than 5 days</td>
          <td className="table-hyper">{ageingCount?.lessThanFiveDays}</td>
        </tr>
        <tr>
          <td className="table-hyper">Less than 7 days</td>
          <td className="table-hyper">{ageingCount?.lessThanSevenDays}</td>
        </tr>
        <tr>
          <td className="table-hyper">7 - 15 days</td>
          <td className="table-hyper">{ageingCount?.sevenToFifteenDays}</td>
        </tr> <tr>
          <td className="table-hyper">&gt;15 days</td>
          <td className="table-hyper">{ageingCount?.greaterthanFifteenDays}</td>
        </tr>
        <tr>
          <td className="table-hyper">Total</td>
          <td className="table-hyper">{total}</td>
        </tr>
      </tbody>
    </table>
    <button
      style={{
        backgroundColor: "#b21f1f",
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        cursor: 'pointer',
      }}
      onClick={() => setShowAgeingModal(false)}
    >
      Close
    </button>
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
                        onChange={(e)=>handleUserNameChange(e)}
                        onSearch={onSearch}
                        filterOption={filterOption}
                        style={{ width: '100%' }}  // Set width to 100%
                      >
                          {
                          usersListLU?.map((users,idx)=>{
                            return <Option key={idx} value={users?.usrID}>{users?.userName}</Option>
                          })
                        }
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
        title="Advance Search"
        open={isAdvanceSearchModalOpen}
        destroyOnClose={true}
        width={500}
        closeIcon={
            <Tooltip title="Close">
               <span onClick={handleModalClose}
      >
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
          name="serviceRequestId"
          label="Service Request ID"
          className="inputs-label mb-0"
          rules={[
    {
      pattern: /^[a-zA-Z0-9]*$/,
      // message: "Only alphabets and numbers are allowed",
    },
  ]}
        >
  <Input
    placeholder="Enter Service Request ID"
    className="cust-input modal-input"
    maxLength={100}
    style={{ width: '100%' }}
    onKeyDown={(e) => {
      const isValidKey =
        /^[a-zA-Z0-9]$/.test(e.key) || // allow alphanumerics
        ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key); // allow navigation
      if (!isValidKey) e.preventDefault();
    }}
    onPaste={(e) => {
      const pasted = e.clipboardData.getData('text');
      if (/[^a-zA-Z0-9]/.test(pasted)) e.preventDefault(); // block non-alphanumerics
    }}
  />
</Form.Item>
        </Col>
        <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
        <Form.Item
  name="TokenNo"
  label="Token No"
  className="inputs-label mb-0"
  rules={[
    {
      pattern: /^[0-9-]*$/,
      // message: "Token Number must contain only numbers and hyphens",
    },
  ]}
>
  <Input
    placeholder="Enter Token No"
    className="cust-input modal-input"
    maxLength={100}
    style={{ width: '100%' }}
    onKeyDown={(e) => {
      const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', '-'];
      const isNumber = /^[0-9]$/.test(e.key);
      if (!isNumber && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    }}
    onPaste={(e) => {
      const pasted = e.clipboardData.getData('text');
      if (/[^0-9-]/.test(pasted)) {
        e.preventDefault();
      }
    }}
  />
</Form.Item>
        </Col>
        <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>

        <Form.Item
          name="PolicyNo"
          label="Policy No"
          className="inputs-label mb-0"
        rules={[
    {
      pattern: /^[a-zA-Z0-9]*$/,
      // message: "Policy Number must be alphanumeric (no spaces or symbols)",
    },
  ]}
>
  <Input
    placeholder="Enter Policy No"
    className="cust-input modal-input"
    maxLength={100}
    style={{ width: '100%' }}
    onKeyDown={(e) => {
      const isValid =
        /^[a-zA-Z0-9]$/.test(e.key) || // allow alphanumeric characters
        ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key); // allow navigation
      if (!isValid) {
        e.preventDefault(); // block all other characters, including whitespace
      }
    }}
    onPaste={(e) => {
      const pasted = e.clipboardData.getData('text');
      if (/[^a-zA-Z0-9]/.test(pasted)) {
        e.preventDefault(); // block pasting any non-alphanumeric character
      }
    }}
  />
</Form.Item>
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
      <div>
  <Form.Item
    label={<span>From Date</span>}
    name="FormDate"
    className="inputs-label mb-0"
     rules={[
              { 
                required: false
              },
            ]}
  >
    <DatePicker
      allowClear={true}
      style={{ width: "100%" }}
      className="cust-input"
      format={dateFormat}
      disabledDate={(current) => current && current > moment().endOf('day')}
    />
  </Form.Item>
</div>

        {/* <div>
          <Form.Item
            label={
              <span>
                From Date
              </span>
            }
            name="FormDate"
            className="inputs-label mb-0"
            rules={
              Ruless
            }
          >
            <DatePicker
              allowClear={true}
              style={{ width: "100%" }}
              className="cust-input"
              format={dateFormat}
            />
          </Form.Item>
        </div> */}
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
            rules={[
              { 
                required: false
              },
            ]}
          >
            <DatePicker
              allowClear={true}
              style={{ width: "100%" }}
              className="cust-input"
              format={dateFormat}
              disabledDate={(current) => current && current > moment().endOf('day')}
            />
          </Form.Item>
        </div>
      </Col>
      <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
                <Form.Item
                  label="Call Type"
                  name="callType"
                  className="inputs-label mb-0"
                  rules={[
                    { 
                      required: false
                    },
                  ]}
                  
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
                    onChange={(value, option) => handleCallTypeChange(value, option)}
                  ></Select>
                </Form.Item>
              </Col>
              <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
                <Form.Item
                  label="Sub Type"
                  name="subType"
                  className="inputs-label mb-0 subtype right-colsize"
                  rules={[
                    { 
                      required: false
                    },
                  ]}
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
                  label="Ageing"
                  name="ageing"
                  className="inputs-label mb-0"
                >
                  <Select
                    showSearch
                    allowClear={true}
                    className="cust-input"
                    maxLength={100}
                    placeholder="Select Mode"
                    options={ageingListLU}
                  ></Select>
                </Form.Item>
              </Col>
              <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
                <Form.Item
                  label="Status"
                  name="status"
                  className="inputs-label mb-0"
                  rules={[
                    { 
                      required: false
                    },
                  ]}
                >
                  <Select
                    showSearch
                    allowClear={true}
                    className="cust-input"
                    maxLength={100}
                    placeholder="Select Status"
                    options={statusLU}
                  ></Select>
                  </Form.Item>
                  </Col>
                  <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
                      <Form.Item
                  label="IGMS Status"
                  name="IGMSstatus"
                 className="inputs-label mb-0"
                 rules={[
                  { 
                    required: false // Error message
                  },
                ]}
                >
                  <Select
                    showSearch
                    allowClear={true}
                    className="cust-input"
                    maxLength={100}
                    placeholder="Select IGMS Status"
                    options={statusIGMSLU}
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
          </Button> { " "}
                </div>
        </Form.Item>
      </Col>
    </Row>
  </Form>
{/* </Card> */}

      </Modal>

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
                  <Spin spinning={isFollowUpsLoader} >
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
                        {followUpData?.map((row, index) => (
                            <tr key={index}>
                              <td>{row.policyNo}</td>
                              <td>{row.srvReqRefNo}</td>
                              <td>{row.callType}/{row.subType}</td>
                              <td>{row.contactPerson}</td>
                              <td>{row.agenda}</td>
                              <td>{row.nxtFollowUpDt ?  moment.utc(row.nxtFollowUpDt).local().format("DD/MM/YYYY") : ""}</td>
                              <td>{row.ageing} </td>
                              <td>
                              <Button className="my-button"
                              onClick={()=>SaveFollowUpsData(row)}
                            >
                              Close
                            </Button>
                           </td>
                                {/* <td>
                                    <select value={row.status} onChange={(e) => handleStatusChange(index, e.target.value)}>
                                        <option value="Open">Open</option>
                                        <option value="Close">Close</option>
                                    </select>
                                </td> */}
                                {/* <td>
                                <Button
            type="primary"
            className="primary-btn btn-cstm"
            onClick={()=>SaveFollowUpsData(row)}
          >
            Close
          </Button>
                                </td> */}
                            </tr>
                        ))}
                          {followUpData?.length === 0 && (
                    <tr>
                      <td colspan="7">
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

    </Spin>

  )
}

const mapStateToProps = ({ state, userProfileInfo }) => {
  return {
    data: state?.PolicyDetailsReducer?.policyDetailsObj,
    userProfileInfo
  }
}

export default connect(mapStateToProps)(ComplaintTeamDashboard);
