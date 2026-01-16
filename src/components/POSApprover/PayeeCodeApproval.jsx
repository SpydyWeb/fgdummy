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
import { Logger } from "@azure/msal-browser";

import CloseIcon from "../../assets/images/close-icon.png";
import PopupAlert from "../popupAlert";
import { useLocation } from 'react-router-dom';
const PayeeCodeApproval = (props) => {
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
  const [isFundModalLoader, setIsFundModalLoader] = useState(false);
  const [isPolicyDetailsModal, setIsPolicyDetailsModal] = useState(false);
  const [selectedPolicyData, setSelectedPolicyData] = useState(null);
  const [isPolicyDetailsLoading, setIsPolicyDetailsLoading] = useState(false);
  const [jeDetailsData, setJeDetailsData] = useState([]);
  const location = useLocation();
  const user = location.state?.user;

  // Function to get dynamic title based on current route
  const getDynamicTitle = () => {
    const currentPath = location.pathname;
    switch(currentPath) {
      case '/posapprover1/payeecode-approval':
        return 'Payee Code Data - POS Approver 1';
      case '/posapprover2':
        return 'POS Approver Dashboard 2';
      case '/posapprover2/payeecode-approval':
        return 'Payee Code Data - POS Approver 2';
      case '/posapprover3':
        return 'POS Approver Dashboard 3';
      case '/posapprover3/payeecode-approval':
        return 'Payee Code Data - POS Approver 3';
      case '/posapprover4':
        return 'POS Approver Dashboard 4';
      case '/posapprover4/payeecode-approval':
        return 'Payee Code Data - POS Approver 4';
      default:
        return 'POS Approver Dashboard 1';
    }
  };

  // Function to check if back button should be shown
  const shouldShowBackButton = () => {
    const currentPath = location.pathname;
    // Only show back button for POS Approver 1 routes
    return currentPath.includes('posapprover1');
  };

  // Function to handle back navigation
  const handleBackToSelection = () => {
    const currentPath = location.pathname;
    if (currentPath.includes('posapprover1')) {
      navigate('/posapprover1');
    } else if (currentPath.includes('posapprover2')) {
      navigate('/posapprover2');
    } else if (currentPath.includes('posapprover3')) {
      navigate('/posapprover3');
    } else if (currentPath.includes('posapprover4')) {
      navigate('/posapprover4');
    } else {
      navigate('/posapprover1');
    }
  };

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
//   if (formValues.paymentMethod) {
//     filteredResults = filteredResults.filter(record => {
//       const methodMatch = paymentMethodLU.find(method => method.value === formValues.paymentMethod);
//       if (methodMatch) {
//         const payoutMethodMatch = record.payoutMethod?.toLowerCase() === methodMatch.label?.toLowerCase();
//         console.log(`Payment method ${record.payoutMethod} matches ${methodMatch.label}: ${payoutMethodMatch}`);
//         return payoutMethodMatch;
//       }
//       return false;
//     });
//     console.log('After payment method filter:', filteredResults.length);
//   }

  // Apply Call Type filter
  if (formValues.callType) {
    filteredResults = filteredResults.filter(record => {
      const callTypeMatch = CALL_TyPES.find(type => type.value === formValues.callType);
      if (callTypeMatch) {
        // Try both exact match and partial match for flexibility
        const exactMatch = record.callTypeName?.toLowerCase() === callTypeMatch.label?.toLowerCase();
        const partialMatch = record.callTypeName?.toLowerCase().includes(callTypeMatch.label?.toLowerCase());
        const callTypeNameMatch = exactMatch || partialMatch;
        console.log(`Call type "${record.callTypeName}" matches "${callTypeMatch.label}": ${callTypeNameMatch}`);
        return callTypeNameMatch;
      }
      return false;
    });
    console.log('After call type filter:', filteredResults.length);
  }

  // Apply Sub Type filter
  if (formValues.subType && subTypeLU && subTypeLU.length > 0) {
    filteredResults = filteredResults.filter(record => {
      const subTypeMatch = subTypeLU.find(subType => subType.value === formValues.subType);
      if (subTypeMatch) {
        // Try both exact match and partial match for flexibility
        const exactMatch = record.subTypeName?.toLowerCase() === subTypeMatch.label?.toLowerCase();
        const partialMatch = record.subTypeName?.toLowerCase().includes(subTypeMatch.label?.toLowerCase());
        const subTypeNameMatch = exactMatch || partialMatch;
        console.log(`Sub type "${record.subTypeName}" matches "${subTypeMatch.label}": ${subTypeNameMatch}`);
        return subTypeNameMatch;
      }
      return false;
    });
    console.log('After sub type filter:', filteredResults.length);
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
  
  // Clear call type and sub type related state
  setSelectedCallType("");
  setSelectedSubType("");
  setSelectedSubTypeVal("");
  setSelectedSubTypeId("");
  setSubTypeLU([]);
  
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
      render: (text, record) => (
        <a 
          style={{ 
            color: '#1890ff', 
            cursor: 'pointer',
            textDecoration: 'underline' 
          }} 
          onClick={() => handlePolicyDetailsClick(record)}
        >
          {text}
        </a>
      ),
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
    
    // {
    //   title: "STP",
    //   dataIndex: "Stp",
    //   key: 'ageing',
    // },
    
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
      resetAllFilters(); // Clear filters on load
      getAdminData();
      getCTST();
      searchData();
  }, [sharedData,hideSearchTable,user]);

  // Monitor role changes based on route path
  useEffect(() => {
    const currentRole = loggedUser.role;
    console.log('Role changed to:', currentRole);
    
    // Update activeRole state if needed
    setActiveRole(currentRole);
    
    // Call the API when role changes
    if (loggedUser?.userName) {
      searchData();
    }
  }, [location.pathname, loggedUser?.role]);

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
        setAlertData(`${"Ticket No " + val?.data?.sr}`);
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

  const handlePolicyDetailsClick = async (record) => {
    console.log('Policy clicked:', record);
    setIsPolicyDetailsModal(true);
    setIsPolicyDetailsLoading(true);
    setSelectedPolicyData(null);
    setJeDetailsData([]);

    try {
      debugger;
      // Call GetJEDetailsFromSR API with SrvReqID
      const jeResponse = await apiCalls.GetJEDetailsFromSR(record?.srvReqID);
      
      if (jeResponse?.data && Array.isArray(jeResponse.data)) {
        console.log('JE Details API response:', jeResponse.data);
        setJeDetailsData(jeResponse.data);
        
        // Set basic policy data from the record for display
        setSelectedPolicyData({
          ...record,
          policyNo: record.policyNo,
          serviceNo: record.serviceNo,
          callTypeName: record.callTypeName,
          subTypeName: record.subTypeName,
        });
      } else {
        message.error({
          content: "Failed to fetch JE details",
          className: "custom-msg",
          duration: 2,
        });
        // Fallback to original record data if API fails
        setSelectedPolicyData(record);
        setJeDetailsData([]);
      }
    } catch (error) {
      console.error('Error fetching JE details:', error);
      message.error({
        content: "Something went wrong while fetching JE details",
        className: "custom-msg",
        duration: 2,
      });
      // Fallback to original record data if API fails
      setSelectedPolicyData(record);
      setJeDetailsData([]);
    } finally {
      setIsPolicyDetailsLoading(false);
    }
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
    
    debugger;
  setIsDataLoading(true);
  const formData = form.getFieldsValue(); 
  const fromDate = formData.FormDate ? formData.FormDate.format('YYYY-MM-DD') : ''; 
  const toDate = formData.ToDate ? formData.ToDate.format('YYYY-MM-DD') : '';
  const PolicyNo = formData.PolicyNo ? formData.PolicyNo.toLowerCase().trim() : '';

  
  // Simplified parameters - only essential fields
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
  
  console.log('Simplified search with params:', obj);

  const extractTagValue = (transectionData, tagName) => {
    const found = transectionData?.find(item => item.tagName === tagName);
    return found ? found.tagValue : "";
  };

  try {
    // Use simplified API call
    const response = await apiCalls.PayeeCodeApprovalRoleBasedFetchData(obj);
    debugger;
    if (Array.isArray(response?.data)) {
      const processedData = response?.data.map(item => ({
        ...item,
        key: item.serviceNo,
      
      policyNo: item.policyNo,
      finalPayableAmount: item.payoutAmount,
        clsRequestedDate: item.date ? moment(item.date).format("DD/MM/YYYY") : "",
      }));
      
      // Set both original data and current data
      setOriginalData(processedData);
      setData(processedData);
      console.log('Simplified data loaded successfully:', processedData.length, 'records for role:', obj.role);
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
    console.error('Error in simplified searchData:', error);
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
        isCallType:true
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
  setTotalFundModal(true);
  setShowAlert(false);
  setIsFundModalLoader(true);
  let obj = {
    SrvReqRefNo: val,
    clientId:''
  };

  let response = apiCalls.taxCalculationForSerReq(obj);
  response
    .then((val) => {
      if (val?.data) {
        setTaxCalculationn(val?.data);
        setIsFundModalLoader(false);

      } else {
        message.error({
          content:
            val?.data?.responseBody?.errormessage ||
            "Something went wrong please try again!",
          className: "custom-msg",
          duration: 2,
        });
        setTotalFundModal(false);
      }
      setIsFundModalLoader(false);
    
    })
    .catch((err) => {
      setIsFundModalLoader(false);
   
    });
}
const handleCallTypeChange = (value, obj) => {
  console.log('Call type changed:', value, obj);
  
  // Handle null/undefined obj parameter
  if (!obj) {
    console.log('No option object provided, setting value directly:', value);
    setSelectedCallType(value);
    // Clear sub type when no option object
    setSubTypeLU([]);
    setSelectedSubType("");
    setSelectedSubTypeVal("");
    setSelectedSubTypeId("");
    form.setFieldsValue({subType: null});
    
    // Trigger filtering after state update
    setTimeout(() => {
      if (originalData && originalData.length > 0) {
        performClientSideFiltering();
      }
    }, 200);
    return;
  }

  if(obj?.isCallType){
    console.log('Processing call type with mstID:', obj.mstID);
    setSelectedCallType(obj.mstID);
    form.setFieldsValue({subType: null});
    setSubTypeLU([]);
    setSelectedSubType("");
    setSelectedSubTypeVal("");
    setSelectedSubTypeId("");
    
    // Populate sub types for this call type
    if (masterData && masterData.length > 0) {
      let SUB_TYP = masterData.filter((ele) => ele.key === "SUB_TYP");
      console.log('SUB_TYP data:', SUB_TYP);
      
      if (SUB_TYP[0]?.value) {
        let transformedData = SUB_TYP[0].value
          .filter((ele) => ele.mstParentID === obj.mstID)
          .map((ele) => ({
            ...ele,
            label: ele.mstDesc,
            value: ele.mstID
          }));
        console.log('Transformed sub types:', transformedData);
        setSubTypeLU(transformedData);
      }
    }
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

  const handleSubTypeChange = (value, getSubLU) => {
    try {
      console.log('handleSubTypeChange called with:', value, getSubLU);
      
      // Safely set the sub type ID
      if (props?.setSubTypeId) {
        props.setSubTypeId(value);
      }
      setSelectedSubTypeId(value);
      
      // Use the provided subTypeLU or fallback to getSubLU
      let subTypeData = subTypeLU?.length > 0 ? subTypeLU : getSubLU;
      
      console.log('subTypeData:', subTypeData);
      
      if (subTypeData && Array.isArray(subTypeData)) {
        subTypeData.forEach((key, index) => {
          // Check for different possible property names
          const keyId = key.mstID || key.value || key.id;
          if (keyId === value) {
            const desc = key.mstDesc || key.label || key.description;
            if (desc) {
              const modifiedDesc = desc.replace(/[^\w]/g, "").toLowerCase();
              setSelectedSubType(modifiedDesc);
              setSelectedSubTypeVal(desc);
              
              // Safely call props function
              if (props?.setSelectedSubTypeVall) {
                props.setSelectedSubTypeVall(desc);
              }
            }
          }
        });
      } else {
        console.warn('subTypeData is not an array or is empty:', subTypeData);
      }
    } catch (error) {
      console.error('Error in handleSubTypeChange:', error);
    }
  };

  return (
    <>
      <div className="main-start">
        <div className="w-94">
          {/* Simple Header for all POS Approver Dashboards */}
          <div style={{ 
            padding: '20px 0', 
            borderBottom: '1px solid #e0e6ed', 
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)',
            borderRadius: '8px',
            color: '#37474f',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <div className="d-flex justify-center align-center">
              <h4 style={{ 
                margin: 0, 
                color: '#2c3e50', 
                fontSize: '24px', 
                fontWeight: '600',
                textAlign: 'center'
              }}>
                {getDynamicTitle()}
              </h4>
            </div>
            {loggedUser?.name && (
              <div style={{ 
                textAlign: 'center', 
                marginTop: '8px', 
                fontSize: '14px', 
                color: '#546e7a',
                opacity: 0.9 
              }}>
                Welcome, {loggedUser.name}
              </div>
            )}
          </div>
          
          {/* {shouldShowBackButton() && (
            <Row gutter={[16, 16]} className="mb-16">
              <Col xs={24}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '16px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #e9ecef'
                }}>
                  <Button
                    type="default"
                    icon={<i className="bi bi-arrow-left"></i>}
                    onClick={handleBackToSelection}
                    style={{ 
                      borderRadius: '6px',
                      border: '1px solid #6c757d',
                      color: '#6c757d',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    Back to Selection
                  </Button>
                  <div style={{ 
                    fontSize: '16px', 
                    fontWeight: '500', 
                    color: '#495057',
                    background: '#ffffff',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: '1px solid #dee2e6'
                  }}>
                    <i className="bi bi-file-text" style={{ marginRight: '8px' }}></i>
                    Total Records: {data.length || 0}
                  </div>
                </div>
              </Col>
            </Row>
          )} */}
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
<Card 
  title={(
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px',
      color: '#1f2937'
    }}>
      <i className="bi bi-funnel" style={{ color: '#1890ff', fontSize: '16px' }}></i>
      <span style={{ fontWeight: '600', fontSize: '16px' }}>Search Criteria</span>
    </div>
  )}
  className="mb-16" 
  style={{ 
    borderRadius: '12px', 
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    border: '1px solid #f0f0f0'
  }}
  headStyle={{
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    borderRadius: '12px 12px 0 0',
    borderBottom: '1px solid #e2e8f0'
  }}
  bodyStyle={{
    padding: '20px'
  }}
>
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
      <Col xs={24} sm={12} md={4} lg={4} xl={4}>
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
            style={{ 
              height: '40px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              transition: 'all 0.2s'
            }}
          />
        </Form.Item>
      </Col>
      
      {/* <Col xs={24} sm={12} md={5} lg={5} xl={5}>
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
      </Col> */}
      
      <Col xs={24} sm={12} md={4} lg={4} xl={4}>
        <Form.Item
          name="callType"
          label="Call Type"
          className="mb-0"
        >
          <Select
            showSearch
            allowClear={true}
            className="cust-input"
            placeholder="Select Call Type"
            options={CALL_TyPES}
            filterOption={filterOption}
            onChange={(value, option) => {
              try {
                if (!value) {
                  // Clear both call type and sub type when call type is cleared
                  setSelectedCallType("");
                  setSelectedSubType("");
                  setSelectedSubTypeVal("");
                  setSelectedSubTypeId("");
                  setSubTypeLU([]);
                  form.setFieldsValue({subType: null});
                } else {
                  handleCallTypeChange(value, option);
                }
                onFilterInputChange();
              } catch (error) {
                console.error('Error in Call Type onChange:', error);
              }
            }}
            style={{ 
              height: '40px',
              borderRadius: '8px'
            }}
          />
        </Form.Item>
      </Col>

      <Col xs={24} sm={12} md={4} lg={4} xl={4}>
        <Form.Item
          name="subType"
          label="Sub Type"
          className="mb-0"
        >
          <Select
            showSearch
            allowClear={true}
            className="cust-input"
            placeholder="Select Sub Type"
            options={subTypeLU || []}
            filterOption={filterOption}
            onChange={(value) => {
              try {
                if (value) {
                  handleSubTypeChange(value, subTypeLU);
                } else {
                  // Clear sub type selections when value is cleared
                  setSelectedSubTypeId("");
                  setSelectedSubType("");
                  setSelectedSubTypeVal("");
                  if (props?.setSubTypeId) {
                    props.setSubTypeId("");
                  }
                  if (props?.setSelectedSubTypeVall) {
                    props.setSelectedSubTypeVall("");
                  }
                }
                onFilterInputChange();
              } catch (error) {
                console.error('Error in Sub Type onChange:', error);
              }
            }}
            style={{ 
              height: '40px',
              borderRadius: '8px'
            }}
            disabled={!subTypeLU || subTypeLU.length === 0}
            notFoundContent={!subTypeLU ? "Please select Call Type first" : "No sub types available"}
          />
        </Form.Item>
      </Col>
      
      <Col xs={24} sm={12} md={3} lg={3} xl={3}>
        <Form.Item className="mb-0">
          <Button
            type="default"
            onClick={resetAllFilters}
            icon={<i className="bi bi-arrow-clockwise"></i>}
            style={{ 
              height: '40px',
              width: '100%',
              borderRadius: '8px',
              fontWeight: '500',
              border: '1px solid #d1d5db',
              backgroundColor: '#ffffff',
              color: '#374151',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f9fafb';
              e.target.style.borderColor = '#9ca3af';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.borderColor = '#d1d5db';
            }}
          >
            Clear Filters
          </Button>
        </Form.Item>
      </Col>

      <Col xs={24} sm={12} md={1} lg={1} xl={1}>
        {/* Spacer column */}
      </Col>
      
      <Col xs={24} sm={12} md={4} lg={4} xl={4}>
        <div style={{ 
          padding: '12px 16px', 
          background: 'linear-gradient(135deg, #e6f7ff 0%, #f0f9ff 100%)', 
          borderRadius: '8px',
          fontSize: '14px',
          color: '#1f2937',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #bae7ff',
          fontWeight: '500',
          gap: '6px'
        }}>
          <i className="bi bi-list-ol" style={{ color: '#1890ff', fontSize: '14px' }}></i>
          <span>Total: <strong style={{ color: '#1890ff' }}>{data.length || 0}</strong></span>
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
          name="Customer Type"
          label="customerType"
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
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #f0f0f0',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
    }}>
      <div style={{ 
        padding: '16px 20px',
        borderBottom: '1px solid #f0f0f0',
        backgroundColor: '#fafafa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <i className="bi bi-table" style={{ color: '#1890ff', fontSize: '16px' }}></i>
          <h4 style={{ margin: '0', color: '#1f2937', fontSize: '16px', fontWeight: '600' }}>
            Payee Code Approval Data
          </h4>
        </div>
        {selectedRowKeys.length > 0 && (
          <div style={{
            padding: '4px 12px',
            backgroundColor: '#e6f7ff',
            color: '#1890ff',
            borderRadius: '16px',
            fontSize: '12px',
            fontWeight: '500'
          }}>
            {selectedRowKeys.length} Selected
          </div>
        )}
      </div>
      
      <div style={{ padding: '0' }}>
        <Table
          key={tableKey}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          locale={{
            emptyText: (
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <i className="bi bi-inbox" style={{ fontSize: '48px', color: '#d9d9d9' }}></i>
                <div style={{ marginTop: '16px', fontSize: '16px', color: '#8c8c8c' }}>
                  No Data Available
                </div>
                <div style={{ marginTop: '8px', fontSize: '14px', color: '#bfbfbf' }}>
                  Try adjusting your search criteria
                </div>
              </div>
            ),
          }}
          scroll={{ x: 'max-content' }}
          pagination={{
            pageSize: 15,
            defaultPageSize: 15,
            total: data.length,
            showTotal: (total, range) => (
              <span style={{ color: '#666', fontSize: '14px' }}>
                Showing {range[0]}-{range[1]} of {total} records
              </span>
            ),
            showSizeChanger: true,
            pageSizeOptions: ['10', '15', '25', '50'],
            style: { padding: '16px 20px' }
          }}
          style={{
            '.ant-table-thead > tr > th': {
              backgroundColor: '#fafafa',
              borderBottom: '2px solid #e8e8e8',
              fontWeight: '600',
              color: '#262626'
            },
            '.ant-table-tbody > tr:hover > td': {
              backgroundColor: '#f0f9ff'
            }
          }}
        />
      </div>
    </div>
            <div style={{ 
              display: "flex", 
              justifyContent: "flex-end", 
              alignItems: "center", 
              marginTop: 20, 
              gap: 12,
              padding: '16px',
              backgroundColor: '#fafafa',
              borderRadius: '8px',
              border: '1px solid #f0f0f0'
            }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#666',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          <i className="bi bi-shield-lock" style={{ color: '#1890ff' }}></i>
          AS400 Password:
        </div>
        <Input
          type="password"
          placeholder="Enter AS400 Password"
          value={as400Password}
          onChange={e => setAs400Password(e.target.value)}
          style={{ 
            width: 220,
            height: '36px',
            borderRadius: '6px'
          }}
        />
        <Button
          type="primary"
          className="primary-btn"
          style={{
            height: '36px',
            borderRadius: '6px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
         onClick={async () => {
          debugger;
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
         return {
          PayoutType: row.callTypeName || "Surrender",
          SRID: row.serviceNo,
          Role: loggedUser?.role,
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
    }      }}
          
        >
          <i className="bi bi-check-circle"></i>
          Submit Selected ({selectedRowKeys.length})
        </Button>
      </div>
      </Spin>
    </Col>

</Row>


     
        
        </div>
      </div>
      
      {/* Policy Details Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="bi bi-journal-text" style={{ color: '#1890ff', fontSize: '18px' }}></i>
            <span style={{ fontWeight: '600', fontSize: '16px' }}>
              Journal Entry Details - {selectedPolicyData?.policyNo || 'N/A'}
            </span>
          </div>
        }
        open={isPolicyDetailsModal}
        destroyOnClose={true}
        width={1200}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setIsPolicyDetailsModal(false)} style={{ cursor: 'pointer' }}>
              <i className="bi bi-x-lg" style={{ fontSize: '14px', color: '#666' }}></i>
            </span>
          </Tooltip>
        }
        footer={null}
        styles={{
          body: { padding: '20px' }
        }}
      >
        <div className="table-container">
          <Spin spinning={isPolicyDetailsLoading}>
            {selectedPolicyData && !isPolicyDetailsLoading ? (
              <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                {/* Basic Policy Information */}
                <div style={{ 
                  marginBottom: '24px', 
                  padding: '20px', 
                  background: 'linear-gradient(135deg, #f0f9ff 0%, #fef7ff 100%)', 
                  borderRadius: '12px', 
                  border: '1px solid #e0e7ff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', gap: '8px' }}>
                    <i className="bi bi-info-circle" style={{ color: '#1890ff', fontSize: '16px' }}></i>
                    <h4 style={{ margin: '0', color: '#1f2937', fontSize: '16px', fontWeight: '600' }}>Policy Information</h4>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                    <div style={{ padding: '12px', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.5)' }}>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Policy Number</div>
                      <div style={{ fontWeight: '600', color: '#1f2937' }}>{selectedPolicyData.policyNo || 'N/A'}</div>
                    </div>
                    <div style={{ padding: '12px', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.5)' }}>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Service Request ID</div>
                      <div style={{ fontWeight: '600', color: '#1f2937' }}>{selectedPolicyData.serviceNo || 'N/A'}</div>
                    </div>
                    <div style={{ padding: '12px', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.5)' }}>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Call Type</div>
                      <div style={{ fontWeight: '600', color: '#1f2937' }}>{selectedPolicyData.callTypeName || 'N/A'}</div>
                    </div>
                    <div style={{ padding: '12px', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.5)' }}>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Sub Type</div>
                      <div style={{ fontWeight: '600', color: '#1f2937' }}>{selectedPolicyData.subTypeName || 'N/A'}</div>
                    </div>
                  </div>
                </div>

                {/* JE Details Table */}
                <div style={{ 
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #f0f0f0',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}>
                  <div style={{ 
                    padding: '16px 20px',
                    borderBottom: '1px solid #f0f0f0',
                    backgroundColor: '#fafafa',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <i className="bi bi-table" style={{ color: '#1890ff', fontSize: '16px' }}></i>
                    <h4 style={{ margin: '0', color: '#1f2937', fontSize: '16px', fontWeight: '600' }}>Journal Entry Details</h4>
                    {jeDetailsData && jeDetailsData.length > 0 && (
                      <span style={{
                        marginLeft: 'auto',
                        padding: '4px 8px',
                        backgroundColor: '#e6f7ff',
                        color: '#1890ff',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        {jeDetailsData.length} Records
                      </span>
                    )}
                  </div>
                  <div style={{ padding: '20px' }}>
                    {jeDetailsData && jeDetailsData.length > 0 ? (
                    <table style={{ 
                      width: '100%', 
                      borderCollapse: 'collapse',
                      fontSize: '14px'
                    }}>
                      <thead>
                        <tr style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}>
                          <th style={{ 
                            padding: '14px 12px', 
                            borderBottom: '1px solid #e5e7eb',
                            borderRight: '1px solid #f3f4f6',
                            fontWeight: '600',
                            textAlign: 'center',
                            color: '#374151',
                            fontSize: '13px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>Sr. No.</th>
                          <th style={{ 
                            padding: '14px 12px', 
                            borderBottom: '1px solid #e5e7eb',
                            borderRight: '1px solid #f3f4f6',
                            fontWeight: '600',
                            textAlign: 'left',
                            color: '#374151',
                            fontSize: '13px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>Payout Name</th>
                          <th style={{ 
                            padding: '14px 12px', 
                            borderBottom: '1px solid #e5e7eb',
                            borderRight: '1px solid #f3f4f6',
                            fontWeight: '600',
                            textAlign: 'center',
                            color: '#374151',
                            fontSize: '13px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>JE Type</th>
                          <th style={{ 
                            padding: '14px 12px', 
                            borderBottom: '1px solid #e5e7eb',
                            borderRight: '1px solid #f3f4f6',
                            fontWeight: '600',
                            textAlign: 'center',
                            color: '#374151',
                            fontSize: '13px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>JE Number</th>
                          <th style={{ 
                            padding: '14px 12px', 
                            borderBottom: '1px solid #e5e7eb',
                            borderRight: '1px solid #f3f4f6',
                            fontWeight: '600',
                            textAlign: 'right',
                            color: '#374151',
                            fontSize: '13px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>Amount</th>
                          <th style={{ 
                            padding: '14px 12px', 
                            borderBottom: '1px solid #e5e7eb',
                            borderRight: '1px solid #f3f4f6',
                            fontWeight: '600',
                            textAlign: 'left',
                            color: '#374151',
                            fontSize: '13px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>Created By</th>
                          <th style={{ 
                            padding: '14px 12px', 
                            borderBottom: '1px solid #e5e7eb',
                            borderRight: '1px solid #f3f4f6',
                            fontWeight: '600',
                            textAlign: 'center',
                            color: '#374151',
                            fontSize: '13px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>Created On</th>
                          <th style={{ 
                            padding: '14px 12px', 
                            borderBottom: '1px solid #e5e7eb',
                            fontWeight: '600',
                            textAlign: 'center',
                            color: '#374151',
                            fontSize: '13px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jeDetailsData.map((item, index) => {
                          const isEven = index % 2 === 0;
                          return (
                            <tr key={item.journalEntriesId || index} 
                                style={{ 
                                  backgroundColor: isEven ? '#ffffff' : '#f9fafb',
                                  transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = '#f0f9ff';
                                  e.currentTarget.style.transform = 'scale(1.002)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = isEven ? '#ffffff' : '#f9fafb';
                                  e.currentTarget.style.transform = 'scale(1)';
                                }}>
                              <td style={{ 
                                padding: '14px 12px', 
                                borderBottom: '1px solid #f3f4f6',
                                borderRight: '1px solid #f9fafb',
                                textAlign: 'center',
                                fontWeight: '500',
                                color: '#6b7280'
                              }}>{index + 1}</td>
                              <td style={{ 
                                padding: '14px 12px', 
                                borderBottom: '1px solid #f3f4f6',
                                borderRight: '1px solid #f9fafb',
                                fontWeight: '500',
                                color: '#1f2937'
                              }}>{item.payoutName || 'N/A'}</td>
                              <td style={{ 
                                padding: '14px 12px', 
                                borderBottom: '1px solid #f3f4f6',
                                borderRight: '1px solid #f9fafb',
                                textAlign: 'center'
                              }}>
                                <span style={{
                                  padding: '6px 12px',
                                  borderRadius: '16px',
                                  fontSize: '12px',
                                  fontWeight: '500',
                                  backgroundColor: 
                                    item.jeType === 'TDS' ? '#fef3e2' :
                                    item.jeType === 'FundTransfer' ? '#f0f9ff' :
                                    item.jeType === 'PenalInterest' ? '#fdf2f8' : '#f3f4f6',
                                  color: 
                                    item.jeType === 'TDS' ? '#f59e0b' :
                                    item.jeType === 'FundTransfer' ? '#3b82f6' :
                                    item.jeType === 'PenalInterest' ? '#ec4899' : '#6b7280',
                                  border: `1px solid ${item.jeType === 'TDS' ? '#fed7aa' :
                                    item.jeType === 'FundTransfer' ? '#bfdbfe' :
                                    item.jeType === 'PenalInterest' ? '#f9a8d4' : '#e5e7eb'}`
                                }}>
                                  {item.jeType || 'N/A'}
                                </span>
                              </td>
                              <td style={{ 
                                padding: '14px 12px', 
                                borderBottom: '1px solid #f3f4f6',
                                borderRight: '1px solid #f9fafb',
                                textAlign: 'center',
                                fontFamily: 'monospace',
                                fontWeight: '500',
                                color: '#374151'
                              }}>{item.jeNo || 'N/A'}</td>
                              <td style={{ 
                                padding: '14px 12px', 
                                borderBottom: '1px solid #f3f4f6',
                                borderRight: '1px solid #f9fafb',
                                textAlign: 'right',
                                fontWeight: '600',
                                color: '#059669'
                              }}>
                                {item.amount ? (
                                  <NumericFormat
                                    value={item.amount}
                                    decimalSeparator="."
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    decimalScale={2}
                                    fixedDecimalPlaces={2}
                                    prefix="₹ "
                                  />
                                ) : 'N/A'}
                              </td>
                              <td style={{ 
                                padding: '14px 12px', 
                                borderBottom: '1px solid #f3f4f6',
                                borderRight: '1px solid #f9fafb',
                                fontWeight: '500',
                                color: '#374151'
                              }}>{item.createdBy || 'N/A'}</td>
                              <td style={{ 
                                padding: '14px 12px', 
                                borderBottom: '1px solid #f3f4f6',
                                borderRight: '1px solid #f9fafb',
                                textAlign: 'center',
                                fontWeight: '500',
                                color: '#6b7280'
                              }}>
                                {item.createdOn ? new Date(item.createdOn).toLocaleDateString('en-GB') : 'N/A'}
                              </td>
                              <td style={{ 
                                padding: '14px 12px', 
                                borderBottom: '1px solid #f3f4f6',
                                textAlign: 'center'
                              }}>
                                <span style={{
                                  padding: '6px 12px',
                                  borderRadius: '16px',
                                  fontSize: '12px',
                                  fontWeight: '500',
                                  backgroundColor: item.isJEApproved ? '#dcfce7' : '#fef2f2',
                                  color: item.isJEApproved ? '#16a34a' : '#dc2626',
                                  border: item.isJEApproved ? '1px solid #bbf7d0' : '1px solid #fecaca',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}>
                                  {item.isJEApproved ? (
                                    <>
                                      <i className="bi bi-check-circle" style={{ fontSize: '10px' }}></i>
                                      Approved
                                    </>
                                  ) : (
                                    <>
                                      <i className="bi bi-clock" style={{ fontSize: '10px' }}></i>
                                      Pending
                                    </>
                                  )}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr style={{ 
                          background: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)', 
                          fontWeight: '600',
                          borderTop: '2px solid #1890ff'
                        }}>
                          <td colSpan="4" style={{ 
                            padding: '16px 12px', 
                            borderBottom: '1px solid #e5e7eb',
                            borderRight: '1px solid #f3f4f6',
                            textAlign: 'right',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#1f2937'
                          }}>
                            <i className="bi bi-calculator" style={{ marginRight: '8px', color: '#1890ff' }}></i>
                            Total Amount:
                          </td>
                          <td style={{ 
                            padding: '16px 12px', 
                            borderBottom: '1px solid #e5e7eb',
                            borderRight: '1px solid #f3f4f6',
                            textAlign: 'right',
                            fontWeight: '700',
                            fontSize: '16px',
                            color: '#059669',
                            backgroundColor: 'rgba(5, 150, 105, 0.1)'
                          }}>
                            <NumericFormat
                              value={jeDetailsData.reduce((sum, item) => sum + (item.amount || 0), 0)}
                              decimalSeparator="."
                              displayType={"text"}
                              thousandSeparator={true}
                              decimalScale={2}
                              fixedDecimalPlaces={2}
                              prefix="₹ "
                            />
                          </td>
                          <td colSpan="2" style={{ 
                            padding: '16px 12px', 
                            borderBottom: '1px solid #e5e7eb'
                          }}></td>
                        </tr>
                      </tfoot>
                    </table>
                  ) : (
                    <div style={{ 
                      textAlign: 'center', 
                      padding: '60px 20px',
                      backgroundColor: '#fafafa',
                      borderRadius: '8px',
                      border: '1px solid #f0f0f0'
                    }}>
                      <i className="bi bi-inbox" style={{ 
                        fontSize: '48px', 
                        color: '#d1d5db', 
                        marginBottom: '16px',
                        display: 'block'
                      }}></i>
                      <h4 style={{ 
                        margin: '0 0 8px 0', 
                        color: '#6b7280',
                        fontSize: '16px',
                        fontWeight: '500'
                      }}>No Journal Entries Found</h4>
                      <p style={{ 
                        margin: '0', 
                        color: '#9ca3af',
                        fontSize: '14px'
                      }}>No journal entry data available for this policy.</p>
                    </div>
                  )}
                  </div>
                </div>
              </div>
            ) : (
              !isPolicyDetailsLoading && (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <p>No data available</p>
                </div>
              )
            )}
          </Spin>
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
          <Spin spinning={isFundModalLoader}>
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
              </Spin>
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
)(PayeeCodeApproval);
