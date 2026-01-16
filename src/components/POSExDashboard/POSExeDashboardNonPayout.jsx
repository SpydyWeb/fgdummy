import React, { useEffect, useState } from "react";
// import {  Spin, message,Row,Col,Form,DatePicker, Checkbox, Button,Input,Table, Space,Card,Select } from "antd";
import {  Spin, message,Row,Col,Form,DatePicker, Checkbox, Button,Input,Table, Space,Card,Select, Modal, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import apiCalls from "../../api/apiCalls";
import { NumericFormat } from "react-number-format";
import { connect } from "react-redux";
import { sentDetailsObj } from "../../reducers/policyDetailsReducer";
import { useData } from "../../reducers/DataContext";
import { useSelector } from 'react-redux';
import { Logger } from "@azure/msal-browser";
import CloseIcon from "../../assets/images/close-icon.png";
import { useLocation } from 'react-router-dom';

const POSExeDashboardnonPayout = (props) => {
  const loggedUser = useSelector(state => state?.userProfileInfo?.profileObj);
  const { sharedData } = useData();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const dateFormat = "DD/MM/YYYY";
  const [record,setRecord] = useState();
  const [tableKey, setTableKey] = useState(0); // Key to force remount
  const [selectionList,setSelectionList] = useState([]);
  const [showTotalPages,setShowTotalpages] = useState(null);
  const [countData,setCountData] = useState([]);
  const [usersListLU,setUsersListLU] = useState([]);
  const [Ruless,setRuless] = useState();
  const [CALL_TyPES, setCALL_TyPES] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [requestModeLU, setRequestModeLU] = useState([]);
  const [subTypeLU, setSubTypeLU] = useState(null);
  const [SelectedSubTypeVal, setSelectedSubTypeVal] = useState(null);
  const [selectedCallType,setSelectedCallType] = useState("");
  const [selectedSubTypeId,setSelectedSubTypeId] = useState("");
  const [selectedSubType,setSelectedSubType] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isadvacedModal, setIsadvacedModal] = useState(false);
  const [isClosedSRCheckBox, setIsClosedSRCheckBox] = useState(false);
  const [isTatData,setIsTatData] = useState({});
  const ToDate = form.getFieldValue('ToDate');
  const FromDate = form.getFieldValue('FromDate');
  const location = useLocation();
    const [selectedPending, setSelectedPending] = useState(null);
    const [selectedInternal, setSelectedInternal] = useState(null);
    const [selectedCheckbox, setSelectedCheckbox] = useState(null);
    const [isPendingsr, setIsPendingsr] = useState(false);
  const user = location.state?.user;
  const statusLU = [
    { label: 'Closed', value: 'closed' },
    { label: 'Pending', value: 'pending' },
    { label: 'Closed With Requirements', value: 'closedwithrequirements' },
    { label: 'Failed', value: 'failed' },
    ];
    const paymentMethodLU= [
      { label: 'NEFT', value: 'neft' },
      { label: 'Cheque', value: 'cheque' },
      ];
    const ageingListLU = Array.from({ length: 15 }, (_, index) => ({ label: index + 1, value: index + 1 }));
  
  const [hideSearchTable, setHideSearchTable] = useState(false); // State to control the visibility of the table
  const defaultColumns = [
    {
      title: "ACTION",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
<a className="editIcon"> <i  onClick={() => handleAction(record)} className="bi bi-pencil-square"></i></a>
        </Space>
      ),
    },
    {
      title: "Request ID No",
      dataIndex: "serviceNo",
      key: 'serviceNo',
    },
    {
      title: "Policy Number",
      dataIndex: "policyNo",
      key: 'policyNo',
      showSorterTooltip: false,
      sorter: {
        compare: (a, b) => a.policyNo - b.policyNo,
      },
    },
    {
        title: "PO Name",
        dataIndex: "poName",
        key: 'policyNo',
        showSorterTooltip: false,
        sorter: {
          compare: (a, b) => a.policyNo - b.policyNo,
        },
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
      title: "Case Status",
      dataIndex: "status",
      key: 'status',
    },
    {
      title: "Mode",
      dataIndex: "mode",
      render: (_, record) => (
        <Space size="middle">
           {getRequestModeName(record?.reqMode)}
        </Space>
      ),
      key: '',
    },
    // {
    //   title: "Customer Name",
    //   dataIndex: "proposerName",
    //   key: 'proposerName',
    // },
    {
      title: "Ageing",
      dataIndex: "ageing",
      key: 'ageing',
    },
    {
      title: "Logged by",
      dataIndex: "createdByRef",
      key: 'createdByRef',
    }
  ];
  useEffect(() => {
     // getAdminData();
      getCTST();
      getDashBoardTatInfo ();
      setSelectedCheckbox("pendingwithintat");
  }, [sharedData,hideSearchTable,user]);

  const handleDateChange =()=>{

  }
    
// Define a function to get mode name based on reqMode number
function getRequestModeName(reqMode) {
  const mode = requestModeLU.find(item => item.value === reqMode);
  return mode ? mode.label : ""; // Return mode name or "Unknown" if not found
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
        //handleSave,
      }),
    };
  });
  const getDashBoardTatInfo  = async () => {
    const formData = form.getFieldsValue(); 
    const fromDate = formData.FormDate ? formData.FormDate.format('YYYY-MM-DD') : ''; 
    const toDate = formData.ToDate ? formData.ToDate.format('YYYY-MM-DD') : '';
    const PolicyNo = formData.PolicyNo ? formData.PolicyNo.toLowerCase().trim() : '';
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
      assignedTo: formData?.assignedTo
    }

    const response=  await apiCalls.getBOEUserDashboardLatest(obj,'Yes');
    if(response?.status === 200) {
      setIsDataLoading(false);
      setIsTatData(response?.data);
    }
  }
  const getAdminData = async () => {
    //setIsLoading(true);
   // let obj = {role: loggedUser.role,userId:loggedUser?.userName };

    let response = apiCalls.GetSerReqStatus(loggedUser.role,loggedUser.userName);
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

 
  const getBoeData =  async (formData,fromDate,toDate,searchText) => {
    setIsLoading(true);
    let obj = {userId:loggedUser?.userName ,role: loggedUser.role };
    let response = apiCalls.getPOSData(obj);
    response.then((val)=>{
      if(val?.data)
      {
         // Filter data based on date range
    let filteredData = val?.data?.filter(d => {
      const date = d.date; 
      const policyNumber = d.policyNo.toLowerCase();
      return (!fromDate || date >= fromDate) && (!toDate || date <= toDate)  && (!searchText || policyNumber.includes(searchText));
  
    });
    if(filteredData){
      setData(filteredData); 
    }
      }else{
        message.destroy();
        message.error({
          content: val?.data?.responseHeader?.message||"Something went wrong please try again!",
          className: "custom-msg",
          duration: 2,
        });
      }
      setIsLoading(false);
    }).catch((err)=>{
      setIsLoading(false);
    })
  }
 
  const handlePolicyLink = (item) => {
    let sentObj = {};
    sentObj.emailId = item?.emailID;
    sentObj.mobileNo = item?.mobileNo;
    sentObj.dob = item?.dob;
    props?.updateSentDetails(item);
    navigate("/policydetails", { state: item });
  };
  const handleAction = (item) => {
    navigate("/policydetails",{ state: {serialNo:item?.serviceNo, isPOS:true,policyNo: item?.policyNo, dob: item?.dob,isPOSExec: true}});
  };
 const renderTableData = () => {
    return data?.map((value, index) => {
      const rejectStatus = value.status === "REJECTED" ? "Closed with Requirements" : "PENDING";
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
            <td><a className="editIcon"> <i  onClick={() => handleAction(value)} className="bi bi-pencil-square"></i></a></td>
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
 
  const searchData =async () => {  
    setIsDataLoading(true);
    const formData = form.getFieldsValue(); 
    const fromDate = formData.FormDate ? formData.FormDate.format('YYYY-MM-DD') : ''; 
    const toDate = formData.ToDate ? formData.ToDate.format('YYYY-MM-DD') : '';
    const PolicyNo = formData.PolicyNo ? formData.PolicyNo.toLowerCase().trim() : '';
    let obj={
      fromDate:fromDate,
      toDate:toDate,
      policyNumber:PolicyNo,
      userId:loggedUser.userName,
      role:loggedUser.role,
      callType: selectedCallType || '',
      subType: formData?.subType || '',
      mode: formData?.mode,
      status:formData?.status == undefined ? 'PENDING' : formData?.status,
      ageing: formData?.ageing,
      assignedTo: formData?.assignedTo,
      IncludeClosed : isClosedSRCheckBox
    }
 
   const response=await apiCalls.getRoleBasedSearchDetails(obj);
    if(Array.isArray(response?.data)) {
      setIsDataLoading(false);
      setData(response?.data);
    }
    else {
      setData([]);
      setIsDataLoading(false);
      message.destroy()
      message.error({
        content: response?.data?.responseBody?.errormessage || "Something went wrong please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }


  
  };

  const handleMovetoSearch =()=>{
    navigate("/advancesearch")
  }

  const getCTST = () => {
    let obj =
    {
      "MasterRequest": [
        "CALL_TYP", "SUB_TYP", "REQST_MODE",
      ]
    }
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
      setIsLoading(false);
      searchData();
    }).catch((err) => {
      setIsLoading(false);
      message.destroy()
      message.error({
        content: err?.data?.responseBody?.errormessage,
        className: "custom-msg",
        duration: 2,
      });
    })

  }
   // Define a reusable function for data transformation
const transformData = (data, keyy) => {
  const filteredData = data?.filter((ele) => ele.key === keyy);
  return filteredData[0]?.value?.map((item, index) => {
    let obj;

    if(keyy==='CALL_TYP'){
      obj= {
        ...item,
        label: item.mstDesc,
        value: item.mstID,
        //isCallType:true
      }
    }else if(keyy==='SUB_TYP'){   
      obj = {
        ...item,
        label: item.mstDesc,
         value: item.mstID,
        //isSubType:true
      }
          }else{
      obj = {
        ...item,
        label: item.mstDesc,
        value: item.mstID,
      }
    }
    return obj
  }
  );
};

const onSearch = (e) =>{
}
const filterOption = (input, option) =>
(option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const subTypeDropdown =async (value,subType,allData)=>{
  let SUB_TYP = masterData?.length>0 ? masterData?.filter((ele) => ele.key === "SUB_TYP") : allData?.filter((ele) => ele.key === "SUB_TYP");
  let data = SUB_TYP[0]?.value?.filter((ele) => ele?.mstParentID === value);
  let transformedData = data?.map((item) => ({
    ...item,
    label: item.mstDesc,
    value: item.mstID
  }));
  setSubTypeLU(transformedData);
  if(props?.customerData?.isPOS||props?.isEmailManagement||props?.isShowAllTicketsData||props?.customerData?.isBOE){
    form.setFieldsValue({callType:value, subType:subType })
        handleSubTypeChange(subType,transformedData);
  }
}

const handleSelection = (type) => {
  setSelectedCheckbox(type); // Ensure only one checkbox is selected
  if (type.includes("pending")) {
    handlePendingData(type);
  } else if (type.includes("internal")) {
    handleInternalRequirementData(type);
  }
};

const handlePendingData = (selectedVal) =>{
  searchData(selectedVal);
  setIsPendingsr(true)
}
const handleInternalRequirementData = (selectedVal) =>{
  searchData(selectedVal);
  setIsPendingsr(false)
}

const handleCallTypeChange = (value, obj) => {
  if(obj?.isCallType){
    setSelectedCallType(obj.mstID);
    form.setFieldsValue({subType: null})
    setSubTypeLU(null);
    setSelectedSubType(null);
    subTypeDropdown(obj.mstID);
  }else{
    let CALL_TYP = masterData?.length>0 ? masterData?.filter((ele) => ele.key === "CALL_TYP") :'';
    let SUB_TYP = masterData?.length>0 ? masterData?.filter((ele) => ele.key === "SUB_TYP") :'';
    let transformedData = SUB_TYP[0]?.value.filter((ele)=>(ele.mstParentID === obj?.mstID)).map((ele) =>({
      ...ele,
      label: ele.mstDesc,
      value: ele.mstID
    }))
    setSubTypeLU(transformedData);
    let slectedCALL_TYP = CALL_TYP[0]?.value?.find((ele)=>{
      return ele.mstID === obj?.mstID
    })
      setSelectedCallType(+slectedCALL_TYP?.mstID);
    // subTypeDropdown(obj.mstParentID);
    setSelectedSubTypeId(obj?.mstID);
    transformedData?.map((key, index) => {
      if(key.mstID===obj?.mstID){
        const modifiedDesc = key.mstDesc?.replace(/[^\w]/g, "").toLowerCase();
        setSelectedSubType(modifiedDesc);
        setSelectedSubTypeVal(key.mstDesc)
      }
    });

    form.setFieldsValue({callType:slectedCALL_TYP?.mstDesc })
  }

  };

  const handleSubTypeChange = (value,getSubLU) => {
    props?.setSubTypeId(value);
    setSelectedSubTypeId(value);
    let subTypeData = subTypeLU?.length>0 ? subTypeLU : getSubLU;
    subTypeData?.map((key, index) => {
      if(key.mstID===value){
        const modifiedDesc = key.mstDesc?.replace(/[^\w]/g, "").toLowerCase();
        setSelectedSubType(modifiedDesc);
        setSelectedSubTypeVal(key.mstDesc)
         props?.setSelectedSubTypeVall(key.mstDesc)
      }
    });
  //}
  };

  return (
    <>
      <div className="main-start">
        <div className="w-94">
          <div className="d-flex justify-center align-center">
          <h6 className="advance-title text-center">POS Executive Dashboard</h6>
          </div>
          <Row gutter={[16, 16]} className="mb-16 justify-center">
  {/* Pending SR */}
  <Col xs={24} sm={24} md={12} lg={6} xxl={6}>
    <table className="table table-bodered">
      <thead>
        <tr>
          <th colSpan={2} className="pl-24">Pending SR</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-24 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <span style={{ minWidth: "150px" }}>Within TAT</span>
              <strong className="ms-4">
                {isTatData?.dashboardSummaries?.[0]?.withinTat ?? "XX"}
              </strong>
            </div>
            <div>
              <input
                type="checkbox"
                className="custom-checkbox ms-3"
                checked={selectedCheckbox === "pendingwithintat"}
                onChange={() => handleSelection("pendingwithintat")}
              />
            </div>
          </td>
        </tr>
        <tr style={{ backgroundColor: "#f0f0f0" }}>
          <td className="p-24 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <span style={{ minWidth: "150px" }}>Beyond TAT</span>
              <strong className="ms-4">
                {isTatData?.dashboardSummaries?.[0]?.beyondTat ?? "XX"}
              </strong>
            </div>
            <div>
              <input
                type="checkbox"
                className="custom-checkbox ms-3"
                checked={selectedCheckbox === "pendingbeyondtat"}
                onChange={() => handleSelection("pendingbeyondtat")}
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </Col>

  {/* Internal Requirement */}
  <Col xs={24} sm={24} md={12} lg={6} xxl={6}>
    <table className="table table-bodered">
      <thead>
        <tr>
          <th colSpan={2} className="pl-24">Internal Requirement</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-24 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <span style={{ minWidth: "150px" }}>Within TAT</span>
              <strong className="ms-4">
                {isTatData?.dashboardSummaries?.[1]?.withinTat ?? "XX"}
              </strong>
            </div>
            <div>
              <input
                type="checkbox"
                className="custom-checkbox ms-3"
                checked={selectedCheckbox === "internalwithintat"}
                onChange={() => handleSelection("internalwithintat")}
              />
            </div>
          </td>
        </tr>
        <tr style={{ backgroundColor: "#f0f0f0" }}>
          <td className="p-24 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <span style={{ minWidth: "150px" }}>Beyond TAT</span>
              <strong className="ms-4">
                {isTatData?.dashboardSummaries?.[1]?.beyondTat ?? "XX"}
              </strong>
            </div>
            <div>
              <input
                type="checkbox"
                className="custom-checkbox ms-3"
                checked={selectedCheckbox === "internalbeyondtat"}
                onChange={() => handleSelection("internalbeyondtat")}
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </Col>

  {/* Follow Ups */}
  <Col xs={24} sm={24} md={12} lg={6} xxl={6}>
    <table className="table table-bodered">
      <thead>
        <tr>
          <th colSpan={2} className="pl-24">Follow Ups</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-24">Due Today</td>
          <td className="p-24 text-red">
            {isTatData?.followUpsDueToday ?? "XX"}
          </td>
        </tr>
        <tr style={{ backgroundColor: "#f0f0f0" }}>
          <td className="p-24">Open</td>
          <td className="p-24 text-red">
            {isTatData?.followUpsOpen ?? "XX"}
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
                     onChange={(value, option) => handleCallTypeChange(value, option)}
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
          <div className="d-flex ml-143 justify-center">
          <Button
            type="primary"
            className="primary-btn mr-12"
            htmlType="submit"
            // Call the searchData function when the button is clicked
            onClick={searchData}
          >
            Search
          </Button> { " "}
                </div>
        </Form.Item>
      </Col>

    </Row>
  </Form>
        </Modal>

        {/* <Row gutter={[24]} className="mb-16">
        <Col xs={12} sm={12} md={6} lg={6} xxl={6}>
      <div className="count-box">
      <div className="count count-color">{count || 0}</div>
        <div className="quotes">Total Logged Cases</div>
      </div>
    </Col>

            <Col xs={12} sm={12} md={6} lg={6} xxl={6}>
            <div className="count-box">
            <div className="count count-color1">{GetStatusCount("REJECTED") || 0}</div>

        <div className="quotes">Rejected</div>
    </div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xxl={6}>
            <div className="count-box">
            <div className="count count-color2">{GetStatusCount("PENDING") || 0}</div>
        <div className="quotes">Assigned to Me</div>
    </div>
            </Col>
             <Col xs={12} sm={12} md={6} lg={6} xxl={6}>
            <div className="count-box">
            <div className="count count-color3">{GetStatusCount("CLOSED") || 0}</div>

        <div className="quotes">Closed</div>
    </div>
            </Col>
          </Row> */}

          {/* <Card title="Search Criteria" className="mb-16">
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
      <Col xs={24} sm={12} md={6} lg={6} xxl={6}>
        <div>
          <Form.Item
            label={
              <span>
                From Date
                <sup>*</sup>
              </span>
            }
            name="FormDate"
            className="inputs-label mb-0"
            rules={
              Ruless
            }
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
      <Col xs={24} sm={12} md={6} lg={6} xxl={6}>
        <div>
          <Form.Item
            label={
              <span>
                To Date
                <sup>*</sup>
              </span>
            }
            name="ToDate"
            className="inputs-label mb-0"
            rules={
              Ruless
            }
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
      <Col xs={24} sm={12} md={6} lg={6} xxl={6}>
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
      <Col xs={24} sm={12} md={6} lg={6} xxl={6}>
        <Form.Item className="mb-0">
          <Button
            type="primary"
            className="primary-btn"
            htmlType="submit"
            // Call the searchData function when the button is clicked
          >
            Search
          </Button>
        </Form.Item>
      </Col>
    </Row>
  </Form>
</Card> */}



<Row gutter={[24]} className="mb-16">
{/* <Col xs={24} sm={24} md={7} lg={7} xxl={7}>
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
                {/* <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
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
                  </Col> */}

                  {/* <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
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
                                onChange={(value, option) => handleCallTypeChange(value, option)}
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
                                onChange={(e) => {handleSubTypeChange(e); }}
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
                                onChange={(e) => {handleSubTypeChange(e); }}
                              ></Select> */}
{/*                                   
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
                         Call the searchData function when the button is clicked
                      >
                        Search
                      </Button> { " "} */}

                      {/* <Button
                              type="primary"
                              className="primary-btn move-search"
                              onClick={()=>handleMovetoSearch()}
                            >
                              Move to Search Screen
                            </Button>{" "} */}

                            {/* </div>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
  </Col> */}

  <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
  <Spin spinning={isDataLoading}>
      {/* <div className="main-start">
        <div className="w-94">
          <div className="table-container dashboard"> */}     
              <Table
              columns={columns}
              dataSource={data}
              locale={{
                emptyText: 'No Data Available',
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(POSExeDashboardnonPayout);
