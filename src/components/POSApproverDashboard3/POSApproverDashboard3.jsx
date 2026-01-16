import React, { useEffect, useState } from "react";
import {  Spin, message,Row,Col,Form,DatePicker, Button,Input,Table,Checkbox, Space,Card,Select,Modal,Tooltip } from "antd";
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
import { useLocation } from 'react-router-dom';

const POSApproverDashboard3 = (props) => {
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
  const [isadvacedModal, setIsadvacedModal] = useState(false);
  const location = useLocation();
  const user = location.state?.user;
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
const [originalData, setOriginalData] = useState([]); // Store original unfiltered data
const performClientSideFiltering = () => {
  const formValues = form.getFieldsValue();
  
  // Check if originalData is available
  if (!originalData || originalData.length === 0) {
    console.log('No original data available for filtering');
    setData([]);
    return;
  }

  let filteredResults = [...originalData];

  console.log('Form Values for filtering:', formValues);
  console.log('Original Data Count:', originalData.length);

  // Apply Policy Number filter
  if (formValues.policyNumber && formValues.policyNumber.trim()) {
    filteredResults = filteredResults.filter(record => {
      const policyMatch = record.policyNo?.toString().toLowerCase().includes(formValues.policyNumber.toLowerCase());
      console.log(`Policy ${record.policyNo} matches ${formValues.policyNumber}: ${policyMatch}`);
      return policyMatch;
    });
    console.log('After policy filter:', filteredResults.length);
  }

  // Apply Payment Method filter
  if (formValues.paymentMethod) {
    filteredResults = filteredResults.filter(record => {
      const methodMatch = paymentMethodLU.find(method => method.value === formValues.paymentMethod);
      if (methodMatch) {
        const payoutMethodMatch = record.payoutMethod?.toLowerCase() === methodMatch.label?.toLowerCase();
        console.log(`Payment method ${record.payoutMethod} matches ${methodMatch.label}: ${payoutMethodMatch}`);
        return payoutMethodMatch;
      }
      return false;
    });
    console.log('After payment method filter:', filteredResults.length);
  }

  // Apply Payout Type filter
  if (formValues.payoutType) {
    filteredResults = filteredResults.filter(record => {
      const payoutTypeMatch = CALL_TyPES.find(type => type.value === formValues.payoutType);
      if (payoutTypeMatch) {
        const callTypeMatch = record.callTypeName?.toLowerCase().includes(payoutTypeMatch.label?.toLowerCase());
        console.log(`Call type ${record.callTypeName} matches ${payoutTypeMatch.label}: ${callTypeMatch}`);
        return callTypeMatch;
      }
      return false;
    });
    console.log('After payout type filter:', filteredResults.length);
  }

  console.log('Final Filtered Results Count:', filteredResults.length);
  
  // Force table re-render by updating the key
  setTableKey(prevKey => prevKey + 1);
  setData(filteredResults);
};
  // Handle input changes for real-time filtering
 const onFilterInputChange = () => {
  // Clear any existing timeout to prevent multiple calls
  if (window.filterTimeout) {
    clearTimeout(window.filterTimeout);
  }
  
  // Set timeout to perform filtering after user stops typing
  window.filterTimeout = setTimeout(() => {
    if (originalData && originalData.length > 0) {
      performClientSideFiltering();
    }
  }, 500); // Increased delay to 500ms
};

  // Reset filters and show all data
  const resetAllFilters = () => {
  console.log('Clearing all filters');
  
  // Clear form fields
  form.resetFields();
  
  // Clear any pending filter timeouts
  if (window.filterTimeout) {
    clearTimeout(window.filterTimeout);
  }
  
  // Reset to original data and force table re-render
  if (originalData && originalData.length > 0) {
    setTableKey(prevKey => prevKey + 1);
    setData([...originalData]); // Create new array reference
    console.log('Reset to original data:', originalData.length, 'records');
  } else {
    setData([]);
  }
};
  const statusLU = [
    { label: 'Closed', value: 'closed' },
    { label: 'Pending', value: 'pending' },
    { label: 'Closed With Requirements', value: 'closedwithrequirements' },
    { label: 'Failed', value: 'failed' },
    ];
    const ageingListLU = Array.from({ length: 15 }, (_, index) => ({ label: index + 1, value: index + 1 }));
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
      dataIndex: "payoutMethod",
      key: 'payoutMethod',
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
        dataIndex: "ageing",
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
  }, [sharedData,hideSearchTable,user]);

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
 
  const searchData = async () => {    
  setIsDataLoading(true);
  const formData = form.getFieldsValue(); 
  const fromDate = formData.FormDate ? formData.FormDate.format('YYYY-MM-DD') : ''; 
  const toDate = formData.ToDate ? formData.ToDate.format('YYYY-MM-DD') : '';
  const PolicyNo = formData.PolicyNo ? formData.PolicyNo.toLowerCase().trim() : '';

  let obj = {
    fromDate: fromDate,
    toDate: toDate,
    policyNumber: PolicyNo,
    userId: loggedUser.userName,
    role: loggedUser.role,
    callType: selectedCallType,
    subType: formData?.subType,
    mode: formData?.mode,
    status: formData?.status == undefined ? 'PENDING' : formData?.status,
    ageing: formData?.ageing,
    assignedTo: formData?.assignedTo
  }

  const extractTagValue = (transectionData, tagName) => {
    const found = transectionData?.find(item => item.tagName === tagName);
    return found ? found.tagValue : "";
  };

  try {
    const response = await apiCalls.getRoleBasedSearchDetails(obj);
    
    if (Array.isArray(response?.data)) {
      const processedData = response?.data.map(item => ({
        ...item,
        key: item.serviceNo,
        tdsJeNo: extractTagValue(item.transectionData, "TDSJENumber") || "NA",
        fundJeNo: extractTagValue(item.transectionData, "FundJENumber") || "NA",
        penalInterestJeNo: extractTagValue(item.transectionData, "PenalJENumber") || "NA",
        payeeCode: extractTagValue(item.transectionData, "PayeeCode"),
        finalPayableAmount: extractTagValue(item.transectionData, "FinalPayableAmount"),
        clsRequestedDate: item.date ? moment(item.date).format("DD/MM/YYYY") : "",
      }));
      
      // Set both original data and current data
      setOriginalData(processedData);
      setData(processedData);
      console.log('Data loaded successfully:', processedData.length, 'records');
    } else {
      // Clear all data if no results
      setData([]);
      setOriginalData([]);
      message.destroy();
      message.error({
        content: response?.data?.responseBody?.errormessage || "Something went wrong please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  } catch (error) {
    console.error('Error in searchData:', error);
    setData([]);
    setOriginalData([]);
    message.error({
      content: "Something went wrong please try again!",
      className: "custom-msg",
      duration: 2,
    });
  } finally {
    // Always set loading to false in finally block
    setIsDataLoading(false);
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
// Replace the existing handleCallTypeChange function
const handleCallTypeChange = (value, obj) => {
  console.log('Call type changed:', value, obj);
  
  // Handle null/undefined obj parameter
  if (!obj) {
    setSelectedCallType(value);
    // Trigger filtering after state update
    setTimeout(() => {
      if (originalData && originalData.length > 0) {
        performClientSideFiltering();
      }
    }, 200);
    return;
  }

  if(obj?.isCallType){
    setSelectedCallType(obj.mstID);
    form.setFieldsValue({subType: null})
    setSubTypeLU(null);
    setSelectedSubType(null);
    subTypeDropdown(obj.mstID);
  } else {
    let CALL_TYP = masterData?.length > 0 ? masterData?.filter((ele) => ele.key === "CALL_TYP") : [];
    let SUB_TYP = masterData?.length > 0 ? masterData?.filter((ele) => ele.key === "SUB_TYP") : [];
    
    if (SUB_TYP[0]?.value) {
      let transformedData = SUB_TYP[0]?.value.filter((ele) => (ele.mstParentID === obj?.mstID)).map((ele) => ({
        ...ele,
        label: ele.mstDesc,
        value: ele.mstID
      }));
      setSubTypeLU(transformedData);
    }
    
    if (CALL_TYP[0]?.value) {
      let selectedCALL_TYP = CALL_TYP[0].value?.find((ele) => {
        return ele.mstID === obj?.mstID
      });
      
      if (selectedCALL_TYP) {
        setSelectedCallType(+selectedCALL_TYP?.mstID);
        form.setFieldsValue({callType: selectedCALL_TYP?.mstDesc });
      }
    }
    
    setSelectedSubTypeId(obj?.mstID);
  }

  // Trigger filter update after state changes
  setTimeout(() => {
    if (originalData && originalData.length > 0) {
      performClientSideFiltering();
    }
  }, 200);
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
          <h6 className="advance-title text-center">POS Approver Dashboard 3</h6>
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
<Card title="Search Criteria" className="mb-16" style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
  <Form
    name="searchForm"
    labelCol={{
      span: 24,
    }}
    wrapperCol={{
      span: 24,
    }}
    colon={false}
    form={form}
    autoComplete="off"
    layout="vertical"
  >
    <Row gutter={[16, 16]} align="bottom">
      <Col xs={24} sm={12} md={5} lg={5} xl={5}>
        <Form.Item
          name="policyNumber"
          label="Policy Number"
          className="mb-0"
        >
          <Input
            placeholder="Enter Policy Number"
            className="cust-input"
            maxLength={100}
            onChange={onFilterInputChange}
            style={{ height: '40px' }}
          />
        </Form.Item>
      </Col>
      
      <Col xs={24} sm={12} md={5} lg={5} xl={5}>
        <Form.Item
          name="paymentMethod"
          label="Payment Method"
          className="mb-0"
        >
          <Select
            showSearch
            allowClear={true}
            className="cust-input"
            placeholder="Select Payment Method"
            options={paymentMethodLU}
            filterOption={filterOption}
            onChange={onFilterInputChange}
            style={{ height: '40px' }}
          />
        </Form.Item>
      </Col>
      
      <Col xs={24} sm={12} md={5} lg={5} xl={5}>
        <Form.Item
          name="payoutType"
          label="Payout Type"
          className="mb-0"
        >
          <Select
            showSearch
            allowClear={true}
            className="cust-input"
            placeholder="Select Payout Type"
            options={CALL_TyPES}
            filterOption={filterOption}
            onChange={(value, option) => {
              handleCallTypeChange(value, option);
              onFilterInputChange();
            }}
            style={{ height: '40px' }}
          />
        </Form.Item>
      </Col>
      
      <Col xs={24} sm={12} md={4} lg={4} xl={4}>
        <Form.Item className="mb-0">
          <Button
  type="primary"
  onClick={resetAllFilters}
  icon={<i className="bi bi-arrow-clockwise"></i>}
  style={{ 
    height: '40px',
    width: '100%',
    borderRadius: '6px',
    fontWeight: '500'
  }}
          >
            Clear Filters
          </Button>
        </Form.Item>
      </Col>
      
      <Col xs={24} sm={12} md={5} lg={5} xl={5}>
        <div style={{ 
          padding: '8px 12px', 
          backgroundColor: '#f0f2f5', 
          borderRadius: '6px',
          fontSize: '14px',
          color: '#666'
        }}>
          <strong>Total Records:</strong> {data.length || 0}
        </div>
      </Col>
    </Row>
  </Form>
</Card>
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
      {/* <table className="table table-bodered">
                 <thead>
                   <tr >
                   <th  colSpan={2} className="pl-24">Payout Type</th>
                   </tr>
                 </thead>
                 <tbody>
                 <tr>
          <td className="p-24">Customer Initiated</td>
          <td 
          className="p-24 text-red" 
          // onClick={()=>handlePendingData("pendingwithintat")}
          >{ 'XX'}</td>
        </tr>
        <tr style={{ backgroundColor: '#f0f0f0' }}>
          <td className="p-24">Company Initiated</td>
          <td 
          className="p-24 text-red" 
          // onClick={()=>handlePendingData("pendingbeyondtat")}
          >{ 'XX'}</td>
        </tr>
                 </tbody>
               </table> */}
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
        {/* <table className="table table-bodered">
                 <thead>
                   <tr >
                   <th  colSpan={2} className="pl-24">Payment Method</th>
                   </tr>
                 </thead>
      <tbody>
        <tr>
          <td className="p-24">Bank Transfer</td>
          <td 
          className="p-24 text-red" 
          // onClick={()=>handleInternalRequirementData("internalwithintat")}
          >{ 'XX'}</td>
        </tr>
        <tr style={{ backgroundColor: '#f0f0f0' }}>
          <td className="p-24">Cheque</td>
          <td 
          className="p-24 text-red" 
          // onClick={()=>handleInternalRequirementData("internalbeyondtat")}
          >{ 'XX'}</td>
        </tr>
        <tr style={{ backgroundColor: '#f0f0f0' }}>
          <td className="p-24">Fund Transfer</td>
          <td 
          className="p-24 text-red" 
          // onClick={()=>handleInternalRequirementData("internalbeyondtat")}
          >{ 'XX'}</td>
        </tr>
      </tbody>
    </table> */}
    
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
        {/* <table className="table table-bodered">
                 <thead>
                   <tr >
                   <th  colSpan={2} className="pl-24">Timelines</th>
                   </tr>
                 </thead>
      <tbody>
        <tr>
          <td className="p-24">Within TAT</td>
          <td 
          className="p-24 text-red" 
          // onClick={()=>handleInternalRequirementData("internalwithintat")}
          >{ 'XX'}</td>
        </tr>
        <tr style={{ backgroundColor: '#f0f0f0' }}>
          <td className="p-24">Pending TAT</td>
          <td 
          className="p-24 text-red" 
          // onClick={()=>handleInternalRequirementData("internalbeyondtat")}
          >{ 'XX'}</td>
        </tr>
      </tbody>
    </table> */}
    
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
          >{ 'XX'}</td>
        </tr>
        <tr style={{ backgroundColor: '#f0f0f0' }}>
          <td className="p-24">Open</td>
          <td 
          className="p-24 text-red" 
           onClick={() => getDashboardFollowUpData('FollowUpsOpen')}
          >{'XX'}</td>
        </tr>
      </tbody>
    </table> */}

          {/* </Col> */}


           {/* <Col xs={24} sm={24} md={12} lg={4} xxl={4}>
           <div className="button-container">
          <Button
            type="primary"
            className="primary-btn"
            onClick={() => setIsadvacedModal(true)}
          >
            Advance Search
          </Button>
          </div>
        </Col> */}
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
          name="payoutType"
          label="Payout Type"
          className="inputs-label mb-0"
          rules={[
            {
              required: false,
              message: "Enter Payout Type",
            },
          ]}
        >
          {/* <Input
            placeholder="Enter Payout Type"
            className="cust-input policy-input"
            maxLength={100}
          /> */}
          <Select
                    showSearch
                    allowClear={true}
                    className="cust-input"
                    maxLength={100}
                    placeholder="Select Payout Type"
                    onSearch={onSearch}
                    options={CALL_TyPES}
                    filterOption={filterOption}
                    onChange={(value, option) => handleCallTypeChange(value, option)}
                  ></Select>
        </Form.Item>
      </Col>
      <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
                <Form.Item
                  label="Payout Name"
                  name="payoutName"
                  className="inputs-label mb-0"
                >
                  <Select
                    showSearch
                    allowClear={true}
                    className="cust-input"
                    maxLength={100}
                    placeholder="Select Payout Name"
                    onSearch={onSearch}
                    options={CALL_TyPES}
                    filterOption={filterOption}
                    onChange={(value, option) => handleCallTypeChange(value, option)}
                  ></Select>
                </Form.Item>
              </Col>
              <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
                <Form.Item
                  label="STP/Non STP"
                  name="stpNonStp"
                  className="inputs-label mb-0 subtype right-colsize"
                >
                  <Select
                    showSearch
                    allowClear={true}
                    className="cust-input calltype-select"
                    maxLength={100}
                    placeholder="Select STP/Non STP"
                    onSearch={onSearch}
                    options={subTypeLU}
                    filterOption={filterOption}
                    //onChange={(e) => {handleSubTypeChange(e); }}
                  ></Select>
                      
                </Form.Item>
              </Col>
         
              <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
                <Form.Item
                  label="Payout Method"
                  name="payoutMethod"
                  className="inputs-label mb-0"
                >
                  <Select
                    showSearch
                    allowClear={true}
                    className="cust-input"
                    maxLength={100}
                    placeholder="Select Payout Method"
                    // options={requestModeLU}
                    options={paymentMethodLU}
                    filterOption={filterOption}
                  ></Select>
                </Form.Item>
              </Col>

              <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
                <Form.Item
                  label="Payout Amount"
                  name="payoutAmount"
                  className="inputs-label mb-0"
                >
                  <Select
                    showSearch
                    allowClear={true}
                    className="cust-input"
                    maxLength={100}
                    placeholder="Select Payout Amount"
                     options={paymentMethodLU}
                  ></Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
        <Form.Item
          name="customerType"
          label="Customer Type"
          className="inputs-label mb-0"
          rules={[
            {
              required: false,
              message: "Select Customer type",
            },
          ]}
        >
            <Select
                    showSearch
                    allowClear={true}
                    className="cust-input"
                    maxLength={100}
                    placeholder="Select Customer type"
                     options={ageingListLU}
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
        <Form.Item className="mb-0">
          <div className="d-flex justify-end ml-20">
          <Button
            type="primary"
            className="primary-btn"
            htmlType="submit"
            // Call the searchData function when the button is clicked
          >
            Search
          </Button> { " "}
                </div>
        </Form.Item>
      </Col>

    </Row>
  </Form>
  </Modal>

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
          >
            Search
          </Button> { " "}

                </div>
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
              key={tableKey}
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
               total: data.length,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
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
    } }}
          
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
        {<>
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
              <td>{taxCalculationn?.ftAmount }
                </td>
            </tr>
            <tr>
              <td>Intrest Amount</td>
              <td>{taxCalculationn?.interestAmount}
                </td>
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
)(POSApproverDashboard3);
