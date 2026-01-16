import React, { useEffect, useState } from "react";
import {  Spin, message,Row,Col,Form,DatePicker, Button,Input,Table, Space,Card,Select,Modal,Tooltip } from "antd";
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import apiCalls from "../../api/apiCalls";
import { NumericFormat } from "react-number-format";
import { connect } from "react-redux";
import { sentDetailsObj } from "../../reducers/policyDetailsReducer";
import { useData } from "../../reducers/DataContext";
import { useSelector } from 'react-redux';

import CloseIcon from "../../assets/images/close-icon.png";
import PopupAlert from "../popupAlert";

const POSApproverDashboardPayout = (props) => {
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
  const [activeRole, setActiveRole] = useState('posapprover1');
  const [SrvReqRefNo, setSrvReqRefNo] = useState('');
  const [Status, setStatus] = useState('');
  const [taxCalculationn, setTaxCalculationn] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [totalFundsModal, setTotalFundModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState(null);
  const [alertTitle, setAlertTitle] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [alertData, setAlertData] = useState("");
  const ToDate = form.getFieldValue('ToDate');
  const FromDate = form.getFieldValue('FromDate');

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [as400Password, setAs400Password] = useState("");
  const rowSelection = {
  selectedRowKeys,
  onChange: (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  },
  // Optional: You can add custom selection options if needed
  // selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
};

  const statusLU = [
    { label: 'Closed', value: 'closed' },
    { label: 'Pending', value: 'pending' },
    { label: 'Closed With Requirements', value: 'closedwithrequirements' },
    { label: 'Failed', value: 'failed' },
    ];
    const stpLU= [
      { label: 'Pass', value: 'pass' },
      { label: 'Fail', value: 'fail' },
      ];
      const paymentMethodLU= [
        { label: 'NEFT', value: 'neft' },
        { label: 'Cheque', value: 'cheque' },
        ];
        const customerTypeLU = [
          { label: 'HUF', value: 'huf' },
          { label: 'MWP', value: 'mwp' },
          { label: 'Assigned', value: 'assigned' },
          ];

  
  const [hideSearchTable, setHideSearchTable] = useState(false); // State to control the visibility of the table
  const defaultColumns = [
//     {
//       title: "Ticket No",
//       dataIndex: "action",
//       render: (_, record) => (
//         <Space size="middle">
// <a className="editIcon"> <i  onClick={() => handleAction(record)} className="bi bi-pencil-square"></i></a>
//         </Space>
//       ),
//     },
{
  title: "Ticket No",
  dataIndex: "serviceNo",
  key: '',
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
      title: "TDS JE No.",
      dataIndex: "tdsJeNo",
      key: 'tdsJeNo',
    },
     {
      title: "Fund JE No.",
      dataIndex: "fundJeNo",
      key: 'fundJeNo',
    },
     {
      title: "PenalInterest JE No.",
      dataIndex: "penalInterestJeNo",
      key: 'penalInterestJeNo',
    },
    {
      title: "Final Payable Amount",
      dataIndex: "finalPayableAmount",
      key: 'finalPayableAmount',
    },
    {
      title: "Payee Code",
      dataIndex: "payeeCode",
      key: 'payeeCode',
    },
    {
      title: "CLS Requested Date",
      dataIndex: "clsRequestedDate",
      key: 'clsRequestedDate',
    },
    {
      title: "Payout Amount",
      dataIndex: "status",
      key: 'status',
    },
    {
      title: "Payout Method",
      dataIndex: "",
      key: '',
    },
    {
      title: "Customer Type",
      dataIndex: "customerType",
      key: 'customerType',
    },
    // {
    //   title: "STP",
    //   dataIndex: "Stp",
    //   key: 'ageing',
    // },
    {
        title: "Ageing",
        dataIndex: "Ageing",
        key: 'ageing',
      },
      // {
      //   title: "Decision",
      //   dataIndex: "action",
      //   render: (_, record) => (
      //     <Space size="middle">
      // {activeRole==='posapprover1' &&   <> 
      //   <Button
      //         type="primary"
      //         className="primary-btn btn-cstm "
      //         onClick={() => POSApprover(record.serviceNo, 'APPROVED')}
      //       >
      //         Action
      //       </Button></>
      //       }
  
      //       {activeRole !=='posapprover1' &&   <>
      //       <Button
      //         type="primary"
      //         className="primary-btn btn-cstm "
      //         onClick={() => POSApprover(record.serviceNo, 'APPROVED')}
      //         // onClick={() => POSAction(record.serviceNo, 'APPROVED')}
      //       >
      //         Approve
      //       </Button>
      //       <Button
      //         type="primary"
      //         className="primary-btn btn-cstm"
      //         onClick={() => POSApprover(record.serviceNo, 'REJECTED')}
      //         // onClick={() => POSAction(record.serviceNo, 'REJECTED')}
      //       >
      //         Reject
      //       </Button></>
      //       }
  
      //     </Space>
      //   ),
      // },
  ];
  useEffect(() => {
      getAdminData();
      getCTST();
      searchData();
  }, [sharedData,hideSearchTable]);

  const handleDateChange =()=>{

  }
  const GetStatusCount = (status) => {
  const filteredItems = countData.filter(item => item.status === status);
  if (filteredItems?.length === 0) {
    return 0;
  }
  return (
    <div key={filteredItems[0].status}>
      <p>{filteredItems[0].count}</p>
    </div>
  );
}
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
let count = countData && countData.reduce((acc, obj) => {

  if (obj.status === "CLOSED" || obj.status === "PENDING" || obj.status==="REJECTED") {
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
  const approvee = ()=>{
    if(activeRole === 'posapprover1'){
      setTotalFundModal(false); setIsModalOpen(true);setPassword('')
    }else{
      setPassword('1234')
      handleSubmitPsw()
    }
    
  }
const rejectt = ()=>{
  if(activeRole === 'posapprover1'){
    setTotalFundModal(false); setIsModalOpen(true);setPassword('')
  }else{
    setPassword('1234')
    handleSubmitPsw()
  }


}
const handleSubmitPsw = ()=>{
  if(!password){
    message.error({
      content:
        "Enter Password",
      className: "custom-msg",
      duration: 2,
    });
    return
   }
  setShowAlert(false);
  setIsLoader(true);
  /*Addeed PayeeCodeCreationApprovedBy by Sayali on 04-06-2025 for POSApproval changes*/
  let obj = {
    TransectionId: 1,
    SrvReqRefNo: SrvReqRefNo ,
    Status: Status,
    RequirementList: [],
    // "RequirementComments":requirementCmnt,
    Comments: '',
    TransactionPayload: [
      {
        "Status": "Create",
        "TagName": "ApproverPassword",
        "TagValue":password
    },
    {
      "Status": "Create",
      "TagName": "PayeeCodeCreationApprovedBy",
      "TagValue":loggedUser?.userName
  }
    
    ],
  };

  let response = apiCalls.POSActionsOnContactDetails(obj);
  response
    .then((val) => {
      if (val?.data) {
        setIsModalOpen(false);
        setAlertTitle(`${val?.data?.message}`);
        setTotalFundModal(false);
        setAlertData(`${"Ticket No " + val?.data?.srvReqRefNo}`);
        setShowAlert(true);
       // getSearchData();
      } else {
        message.error({
          content:
            val?.data?.responseBody?.errormessage ||
            "Something went wrong please try again!",
          className: "custom-msg",
          duration: 2,
        });
      }
      setIsLoader(false);
    
    })
    .catch((err) => {
      setIsLoader(false);
   
    });
}

 
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
  const handleAction=async(item)=>{
    //setIsLoading(true);
    //const  val = await apiCalls.getPOSIndividualData(item?.serviceNo);

    var obj ={
      applicationNo: item?.applicationNo,
      callTypeName : item?.callTypeName,
      subTypeName : item?.subTypeName,
      dob: item?.dob,
      policyNo: item?.policyNo,
      source: item?.source,
      tagName: item?.transectionData,
      isBOE:true,
      isPOS: false,
      serialNo: item.serviceNo,
      isInternalFlow:true
    }
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
  }
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
    // setHideSearchTable(true);
    setIsDataLoading(true);
    const formData = form.getFieldsValue(); 
    const fromDate = formData.FormDate ? formData.FormDate.format('YYYY-MM-DD') : ''; 
    const toDate = formData.ToDate ? formData.ToDate.format('YYYY-MM-DD') : '';
    const PolicyNo = formData.PolicyNo ? formData.PolicyNo.toLowerCase().trim() : '';
      
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
    let obj={
      fromDate:fromDate,
      toDate:toDate,
      policyNumber:PolicyNo,
      userId:loggedUser.userName,
      role:loggedUser.role,
      callType: selectedCallType,
      subType: formData?.subType,
      mode: formData?.mode,
      status:formData?.status == undefined ? 'PENDING' : formData?.status,
      ageing: formData?.ageing,
      assignedTo: formData?.assignedTo
    }
  const extractTagValue = (transectionData, tagName) => {
  const found = transectionData?.find(item => item.tagName === tagName);
  return found ? found.tagValue : "";
};

   const response=await apiCalls.getRoleBasedSearchDetails(obj);
    if(Array.isArray(response?.data)) {
      setIsDataLoading(false);
      setData(
         response?.data.map(item => ({
      ...item,
      key: item.serviceNo,
      tdsJeNo: extractTagValue(item.transectionData, "TDSJENumber") || "NA",
      fundJeNo: extractTagValue(item.transectionData, "FundJENumber") || "NA",
      penalInterestJeNo: extractTagValue(item.transectionData, "PenalJENumber") || "NA",
      payeeCode: extractTagValue(item.transectionData, "PayeeCode"),
      finalPayableAmount: extractTagValue(item.transectionData, "FinalPayableAmount"),
      clsRequestedDate: item.date ? moment(item.date).format("DD/MM/YYYY") : "",
    }))
    );
      
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

const POSApprover = (srvReqRefNo, status) => {
  
  setSrvReqRefNo(srvReqRefNo);
  setStatus(status);

  taxCalculation(srvReqRefNo)

};
const taxCalculation = (val) => {
  setShowAlert(false);
  setIsLoader(true);
  let obj = {
    SrvReqRefNo: val,
    clientId:''
  };

  let response = apiCalls.taxCalculationForSerReq(obj);
  response
    .then((val) => {
      if (val?.data) {
        setTotalFundModal(true);
        setTaxCalculationn(val?.data)

      } else {
        message.error({
          content:
            val?.data?.responseBody?.errormessage ||
            "Something went wrong please try again!",
          className: "custom-msg",
          duration: 2,
        });
      }
      setIsLoader(false);
    
    })
    .catch((err) => {
      setIsLoader(false);
   
    });
}
const handleCallTypeChange = (value, obj) => {
  if(obj.isCallType){
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
    let slectedCALL_TYP = CALL_TYP[0].value?.find((ele)=>{
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
          <h6 className="advance-title text-center">POS Approver Dashboard</h6>
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
                  label="STP"
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
                   // options={statusLU}
                   options={stpLU}
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
             
              <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
        <Form.Item
          name="payoutAmount"
          label="Payout Amount"
          className="inputs-label mb-0"
          rules={[
            {
              required: false,
              message: "Enter Payout Amount",
            },
          ]}
        >
          <Input
            placeholder="Enter Payout Amount"
            className="cust-input"
            maxLength={100}
          />
        </Form.Item>
      </Col>
      {/* <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
        <Form.Item
          name="ageing"
          label="Ageing"
          className="inputs-label mb-0"
          rules={[
            {
              required: false,
              message: "Enter Ageing",
            },
          ]}
        >
          <Input
            placeholder="Enter Ageing"
            className="cust-input"
            maxLength={100}
          />
        </Form.Item>
      </Col> */}
      <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
        <Form.Item
          name="customerType"
          label="Customer Type"
          className="inputs-label mb-0"
          rules={[
            {
              required: false,
              message: "Enter Customer Type",
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
                    options={customerTypeLU}
                    filterOption={filterOption}
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
            Search
          </Button> { " "}
          {/* <Button
                  type="primary"
                  className="primary-btn move-search"
                  onClick={()=>handleMovetoSearch()}
                >
                  Move to Search Screen
                </Button>{" "} */}
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
              rowSelection={rowSelection}
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
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: 16, gap: 8 }}>
        <Input
          type="password"
          placeholder="AS400 Password"
          value={as400Password}
          onChange={e => setAs400Password(e.target.value)}
          style={{ width: 200 }}
        />
        <Button
          type="primary"
          className="primary-btn"
          onClick={async () => {
    if (!as400Password) {
      message.error("Please enter AS400 Password");
      return;
    }
    if (selectedRowKeys.length === 0) {
      message.error("Please select at least one row");
      return;
    }
    
    const payloadList = selectedRowKeys.map(key => {
      const row = data.find(item => item.key === key);
      if (row) {
        const isJEApplicable =
          !!row.tdsJeNo || !!row.penalInterestJeNo || !!row.fundJeNo;
        return {
          PayoutType: row.callTypeName || "Surrender",
          SRID: row.serviceNo,
          Role: loggedUser?.role,
          isJEApplicable: isJEApplicable,
          ApproverPassword: as400Password,
        };
      }
      return null;
    }).filter(Boolean); // Remove any nulls

    
        try {
      
      await apiCalls.SubmitPayoutApproval(payloadList);
      message.success("Submit Payout for selected rows!");
    } catch (err) {
      message.error("Failed to submit payout for selected rows.");
    }     }}
          
        >
          Submit
        </Button>
      </div>
      </Spin>
    </Col>

</Row>


     
        
        </div>
      </div>
      
      <Modal
        title={"Payout Details"}  
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
        {<>
          <table className="responsive-table">
            <tr>
              <td width={50}>Payout Value</td>
              <td width={70}>{taxCalculationn?.payableAmount}</td>
            </tr>
            <tr>
              <td>TDS Amount</td>
              <td>{taxCalculationn?.tdsAmount}</td>
            </tr>
            <tr>
              <td>FT Amount</td>
              <td>{taxCalculationn?.ftAmount }
                </td>
            </tr>
            <tr>
              <td>Penal Interest</td>
              <td>{taxCalculationn?.penalInterest || 0}
                </td>
            </tr>
            <tr>
              <td>Interest Charges</td>
              <td>{taxCalculationn?.interestAmount}
                </td>
            </tr>
            <tr>
              <td>Final Payable Amount</td>
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
                  onClick={() => { approvee(); }}
                >
                  Approve
                </Button>

                <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => {rejectt(); }}
                >
                  Reject
                </Button>
              </div>
        </div>
     
      </Modal>
      <Modal
        title="LifeAsia Password"
        open={isModalOpen}
        destroyOnClose={true}
        closeIcon={
         
            <span onClick={() => setIsModalOpen(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
        
        }
        footer={null}
      >
       
      
          <Input
            type="text"
            className="input-label"
            value={password}
            placeholder="Enter Pssword"
            onChange={(e) => setPassword(e.target.value)}
           
          />
      
          <div className="text-center modal-validate">
            <Button
              type="primary"
              className="primary-btn"
              onClick={() => handleSubmitPsw()}
             
            >
            Submit
            </Button>
          
          </div>
     
      </Modal>



      {showAlert && (
        <PopupAlert
          alertData={alertData}
          title={alertTitle}
          navigate={navigateTo}
          setShowAlert={setShowAlert}
        ></PopupAlert>
      )}
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
)(POSApproverDashboardPayout);
