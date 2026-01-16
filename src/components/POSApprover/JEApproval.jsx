import React, { useEffect, useState } from "react";
import {  Spin, message,Row,Col,Form,DatePicker, Button,Input,Table,Checkbox, Space,Card,Select,Modal,Tooltip } from "antd";
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import apiCalls from "../../api/apiCalls";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { sentDetailsObj } from "../../reducers/policyDetailsReducer";
import { useData } from "../../reducers/DataContext";
import { useSelector } from 'react-redux';
import { toDate } from "date-fns";
import { Logger } from "@azure/msal-browser";

import CloseIcon from "../../assets/images/close-icon.png";
import PopupAlert from "../popupAlert";
import { useLocation } from 'react-router-dom';
const JEApproval = (props) => {
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
  const location = useLocation();
  const user = location.state?.user;

  // Function to get dynamic title based on current route or role
  const getDynamicTitle = () => {
    const currentPath = location.pathname;
    
    if (currentPath.includes('/posapprover1/je-approval')) {
      return 'JE Flow Data - POS Approver 1';
    } else if (currentPath.includes('/posapprover2')) {
      return 'JE Flow Data - POS Approver 2';
    } else if (currentPath.includes('/posapprover3')) {
      return 'JE Flow Data - POS Approver 3';
    } else if (currentPath.includes('/posapprover4')) {
      return 'JE Flow Data - POS Approver 4';
    } else {
      return 'JE Flow Data';
    }
  };

  // Function to get back navigation route
  const getBackRoute = () => {
    const currentPath = location.pathname;
    if (currentPath.includes('/posapprover1')) {
      return '/posapprover1';
    } else if (currentPath.includes('/posapprover2')) {
      return '/posapprover2';
    } else if (currentPath.includes('/posapprover3')) {
      return '/posapprover3';
    } else if (currentPath.includes('/posapprover4')) {
      return '/posapprover4';
    } else {
      return '/posapprover1'; // default fallback
    }
  };

  // Function to handle back navigation
  const handleBackToSelection = () => {
    navigate(getBackRoute());
  };

  // Function to check if back button should be shown
  const shouldShowBackButton = () => {
    const currentPath = location.pathname;
    // Only show back button for POS Approver 1 routes
    return currentPath.includes('posapprover1');
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

  // Apply Service No filter
  if (formValues.serviceNo && formValues.serviceNo.trim()) {
    filteredResults = filteredResults.filter(record => {
      const serviceNoMatch = record.serviceNo?.toString().toLowerCase().includes(formValues.serviceNo.toLowerCase());
      console.log(`Service No ${record.serviceNo} matches ${formValues.serviceNo}: ${serviceNoMatch}`);
      return serviceNoMatch;
    });
    console.log('After service no filter:', filteredResults.length);
  }

  // Apply Case Type filter
  if (formValues.caseType) {
    filteredResults = filteredResults.filter(record => {
      const caseTypeMatch = caseTypeLU?.find(type => type.value === formValues.caseType);
      if (caseTypeMatch) {
        const match = record.caseType?.toLowerCase() === caseTypeMatch.label?.toLowerCase();
        console.log(`Case type ${record.caseType} matches ${caseTypeMatch.label}: ${match}`);
        return match;
      }
      return false;
    });
    console.log('After case type filter:', filteredResults.length);
  }

  // Apply JE Number filter (searches across all three JE columns)
  if (formValues.jeNumber && formValues.jeNumber.trim()) {
    filteredResults = filteredResults.filter(record => {
      const searchTerm = formValues.jeNumber.toLowerCase();
      const tdsMatch = record.tdsJeNo?.toString().toLowerCase().includes(searchTerm);
      const fundMatch = record.fundJeNo?.toString().toLowerCase().includes(searchTerm);
      const penalMatch = record.penalInterestJeNo?.toString().toLowerCase().includes(searchTerm);
      
      const jeMatch = tdsMatch || fundMatch || penalMatch;
      console.log(`JE Number search "${formValues.jeNumber}" in TDS: ${record.tdsJeNo} (${tdsMatch}), Fund: ${record.fundJeNo} (${fundMatch}), Penal: ${record.penalInterestJeNo} (${penalMatch}) - Overall Match: ${jeMatch}`);
      return jeMatch;
    });
    console.log('After JE number filter:', filteredResults.length);
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

  // Apply JE filter to maintain JE-only records
  const jeFilteredResults = filteredResults.filter(item => 
    (item.tdsJeNo && item.tdsJeNo !== "NA") || 
    (item.fundJeNo && item.fundJeNo !== "NA") || 
    (item.penalInterestJeNo && item.penalInterestJeNo !== "NA")
  );
  
  console.log('Final JE Filtered Results Count:', jeFilteredResults.length);
  
  // Force table re-render by updating the key
  setTableKey(prevKey => prevKey + 1);
  setData(jeFilteredResults);
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
  
  // Reset to original JE filtered data and force table re-render
  if (originalData && originalData.length > 0) {
    const jeFilteredData = originalData.filter(item => 
      (item.tdsJeNo && item.tdsJeNo !== "NA") || 
      (item.fundJeNo && item.fundJeNo !== "NA") || 
      (item.penalInterestJeNo && item.penalInterestJeNo !== "NA")
    );
    setTableKey(prevKey => prevKey + 1);
    setData([...jeFilteredData]); // Create new array reference with JE filtered data
    console.log('Reset to JE filtered data:', jeFilteredData.length, 'records');
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
        const caseTypeLU = [
          { label: 'Full FundTrasnfer', value: 'Full FundTrasnfer' },
          { label: 'Partial FundTrasnfer', value: 'Partial FundTrasnfer' },
          { label: 'No FundTrasnfer', value: 'No FundTrasnfer' },
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
      title: "Case Type",
      dataIndex: "caseType",
      key: 'caseType',
    },
    {
      title: "TDS JE No.",
      dataIndex: "tdsJeNo",
      key: 'tdsJeNo',
    },
    {
      title: "TDS JE Amount",
      dataIndex: "tdsJeAmount",
      key: 'tdsJeAmount',
      render: (value) => (
        value && value !== "0" && value !== "NA" ? (
          <NumberFormat
            value={value}
            decimalSeparator="."
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalPlaces={2}
          />
        ) : "0.00"
      ),
    },
     {
      title: "Fund JE No.",
      dataIndex: "fundJeNo",
      key: 'fundJeNo',
    },
    {
      title: "Fund JE Amount",
      dataIndex: "fundJeAmount",
      key: 'fundJeAmount',
      render: (value) => (
        value && value !== "0" && value !== "NA" ? (
          <NumberFormat
            value={value}
            decimalSeparator="."
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalPlaces={2}
          />
        ) : "0.00"
      ),
    },
     {
      title: "PenalInterest JE No.",
      dataIndex: "penalInterestJeNo",
      key: 'penalInterestJeNo',
    },
{
      title: "PenalInterest JE Amount",
      dataIndex: "penalInterestJeAmount",
      key: 'penalInterestJeAmount',
      render: (value) => (
        value && value !== "0" && value !== "NA" ? (
          <NumberFormat
            value={value}
            decimalSeparator="."
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalPlaces={2}
          />
        ) : "0.00"
      ),
    },
   
    {
      title: "JE Created Date",
      dataIndex: "JECreatedDate",
      key: 'JECreatedDate',
    },
     {
      title: "JE Created By",
      dataIndex: "JECreatedBy",
      key: 'JECreatedBy',
    },
    
    // {
    //   title: "Customer Type",
    //   dataIndex: "customerType",
    //   key: 'customerType',
    // },
    // {
    //   title: "STP",
    //   dataIndex: "Stp",
    //   key: 'ageing',
    // },
    // {
    //     title: "Ageing",
    //     dataIndex: "ageing",
    //     key: 'ageing',
    //   },
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
                <NumberFormat
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
                <NumberFormat
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
    callType: 0, // Set to 0 to get all call types
    subType: 0, // Set to 0 to get all sub types
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
    const response = await apiCalls.JEApprovalRoleBasedFetchData(obj);
    debugger;
    if (Array.isArray(response?.data)) {
      const processedData = response?.data.map(item => ({
        ...item,
        key: item.srvReqID, // Use srvReqID as key
        serviceNo: item.serviceNo, 
        tdsJeNo: item.tdsjeNo || "NA", 
        fundJeNo: item.fundTrasnferJENo || "NA", 
        penalInterestJeNo: item.penalInterestJENo || "NA", 
        tdsJeAmount: item.tdsAmount || "0", 
        fundJeAmount: item.fundTransferAmount || "0", 
        penalInterestJeAmount: item.penalInterestAmount || "0", 
        callTypeName: item.callTypeName || "N/A", 
        subTypeName: item.subTypeName || "N/A", 
        callType: item.callType || 0, 
        subType: item.subType || 0, 
    
        //finalPayableAmount: item.finalPayableAmount,
        JECreatedDate: item.createdOn ? moment(item.createdOn).format("DD/MM/YYYY") : "",
        JECreatedBy: item.createdBy || "N/A",
        //ageing: item.ageing || "N/A",
        //customerType: item.customerType || "N/A"
      }));
      
      // Filter only records that have JE numbers (JE Flow data)
      const jeFilteredData = processedData.filter(item => 
        (item.tdsJeNo && item.tdsJeNo !== "NA") || 
        (item.fundJeNo && item.fundJeNo !== "NA") || 
        (item.penalInterestJeNo && item.penalInterestJeNo !== "NA")
      );
      
      // Set both original data and current data
      setOriginalData(processedData);
      setData(jeFilteredData);
      console.log('JE Data loaded successfully:', jeFilteredData.length, 'JE records out of', processedData.length, 'total records');
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
// Replace the existing handleCallTypeChange function
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
          
          {shouldShowBackButton() && (
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
                    JE Flow Records: {data.length || 0}
                  </div>
                </div>
              </Col>
            </Row>
          )}
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
            style={{ height: '40px' }}
          />
        </Form.Item>
      </Col>
      
      <Col xs={24} sm={12} md={4} lg={4} xl={4}>
        <Form.Item
          name="serviceNo"
          label="Service No"
          className="mb-0"
        >
          <Input
            placeholder="Enter Service No"
            className="cust-input"
            maxLength={100}
            onChange={onFilterInputChange}
            style={{ height: '40px' }}
          />
        </Form.Item>
      </Col>

      <Col xs={24} sm={12} md={3} lg={3} xl={3}>
        <Form.Item
          name="caseType"
          label="Case Type"
          className="mb-0"
        >
          <Select
            showSearch
            allowClear={true}
            className="cust-input"
            placeholder="Select Case Type"
            options={caseTypeLU}
            filterOption={filterOption}
            onChange={onFilterInputChange}
            style={{ height: '40px' }}
          />
        </Form.Item>
      </Col>

      <Col xs={24} sm={12} md={4} lg={4} xl={4}>
        <Form.Item
          name="jeNumber"
          label="JE Number"
          className="mb-0"
        >
          <Input
            placeholder="Enter JE Number"
            className="cust-input"
            maxLength={100}
            onChange={onFilterInputChange}
            style={{ height: '40px' }}
          />
        </Form.Item>
      </Col>

      <Col xs={24} sm={12} md={3} lg={3} xl={3}>
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
            Clear
          </Button>
        </Form.Item>
      </Col>

      <Col xs={24} sm={12} md={1} lg={1} xl={1}>
        {/* Spacer column */}
      </Col>
      
      <Col xs={24} sm={12} md={4} lg={4} xl={4}>
        <div style={{ 
          padding: '8px 12px', 
          backgroundColor: '#f0f2f5', 
          borderRadius: '6px',
          fontSize: '14px',
          color: '#666',
          height: '40px',
          display: 'flex',
          alignItems: 'center'
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
              {/* <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
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
      </Col> */}
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
    <Card title="JE Flow Data" style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <Spin spinning={isDataLoading}>   
              <Table
              key={tableKey}
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
              locale={{
                emptyText: 'No JE Flow Data Available',
              }}
              scroll={{ x: true }}
              pagination={{
                pageSize: 10,
                defaultPageSize: 10,
                total: data.length,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
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
          CaseType: row.caseType,
          TdsJe: row.tdsJeNo,
          FundJe: row.fundJeNo,
          PenalInterestJe: row.penalInterestJeNo,
          ApproverPassword: as400Password,
        };
      }
      return null;
    }).filter(Boolean); // Remove any nulls

    
        try {
      
      await apiCalls.SubmitJEApproval(payloadList);
      message.success("Submit Payout for selected rows!");
    } catch (err) {
      message.error("Failed to submit payout for selected rows.");
    }      }}
          
        >
          Submit
        </Button>
      </div>
      </Spin>
    </Card>
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
)(JEApproval);
