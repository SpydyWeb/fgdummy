import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Table, Checkbox, Modal, Input, Dropdown, Menu, Form, message, Upload ,DatePicker} from 'antd';
import { DownOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import DownloadFileModal from './DownloadFileModal';
import UploadFileModal from './UploadFileModal';
import AdvanceSearchModal from './AdvanceSearchModal';
import { useSelector } from 'react-redux';
import apiCalls from "../../api/apiCalls";
import moment from 'moment';
import CloseIcon from "../../assets/images/close-icon.png";
import FilterModal from '../userDashboardComponent/FilterModal';
import PopupAlert from '../popupAlert';
import dayjs from 'dayjs';


const cardData = [
  'Loan', 'Surrender', 'Partial Withdrawal', 'Freelook', 'Payout Reprocessing', 'Bounce Charges',
  'Maturity Claim', 'Survival Benefit', 'Foreclosure', 'Annuity', 'Claims', 'Excess Refund'
];


// Dummy card titles
const cardDataMap = {
  'Loan': 'countofLoan',
  'Surrender': 'countofSurrender',
  'Partial Withdrawal': 'countofPartialWithdrwal',
  'Freelook': 'countofFLC',
  'Payout Reprocessing': 'countofPayoutReProcessing',
  'Bounce Charges': 'countofAutoPayBounceCharges',
  'Maturity Claim': 'countofMaturityClaim',
  'Survival Benefit': 'countofSurvivalBenefit',
  'Foreclosure': 'countofForeClosure',
  'Annuity': 'countofAnnuity',
  'Claims': 'countofClaims',
  'Excess Refund': 'countofExcessRefund'
};

const statusLU = [
    { label: 'Closed', value: 'closed' },
    { label: 'Pending', value: 'pending' },
    { label: 'Closed With Requirements', value: 'closedwithrequirements' },
    { label: 'Failed', value: 'failed' },
    ];
// Dummy table structure
const columns = [
  //{ title: '', dataIndex: 'checkbox', render: () => <Checkbox />, width: 40 },
  { title: 'Policy No', dataIndex: 'policyNo' },
  { title: 'Ticket ID', dataIndex: 'ticketId' },
  { title: 'Call Type', dataIndex: 'callType' },
  { title: 'Sub Type', dataIndex: 'subType' },
  { title: 'Amount', dataIndex: 'amount' },
  { title: 'Date', dataIndex: 'date' },
  { title: 'Payment Mode', dataIndex: 'payoutmode' },
  { title: 'Status', dataIndex: 'status' },
  { title: 'Department', dataIndex: 'department' },
  { title: 'Last Approved By', dataIndex: 'approvedBy' },
  { title: 'Batch ID', dataIndex: 'batchId' },
  { title: 'File Download', dataIndex: 'IsFileDownload' },
  
];
const Batchcolumns=[
  { title: 'Date', dataIndex: 'Date' },
  { title: 'Batch ID', dataIndex: 'Batchid' },
]
 const dateFormat = "DD/MM/YYYY";
//const dataSource = []; // Placeholder for data

const FinanceDashboard = (props) => {
  const loggedUser = useSelector(state => state?.userProfileInfo?.profileObj);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
   const [fileList, setFileList] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [fileList2, setFileList2] = useState([]);
      const [uploading, setUploading] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [data,setData] = useState([]);
  const [values, setValues] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
   const [uploadVisible, setUploadVisible] = useState(false);
   const [alertTitle, setAlertTitle] = useState("");
     const [showAlert, setShowAlert] = useState(false);
     const [isExcelUploadModal, setIsExcelUploadModal] = useState(false);
     const [isUploadModal, setISUploadModal] = useState(false);
     const [iSDownloadModal, setISDownloadModal] = useState(false);
     const [iSAdvanceModal, setISAdvanceModal] = useState(false);
      const [masterData, setMasterData] = useState([]);
      const [dataSource, setDataSource] = useState([]);
     const [CALL_TyPES, setCALL_TyPES] = useState([]);
    const [requestModeLU, setRequestModeLU] = useState([]);
    const [subTypeLU, setSubTypeLU] = useState(null);
    const [alertData, setAlertData] = useState("");
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [selectedSubTypeId,setSelectedSubTypeId] = useState("");
    const [SelectedSubTypeVal, setSelectedSubTypeVal] = useState(null);
    const [selectedSubType,setSelectedSubType] = useState(null);
     const [selectedCallType,setSelectedCallType] = useState("");
     const [SubTypeId, setSubTypeId] = useState("");
     const [selectedRowKeys, setSelectedRowKeys] = useState([]);
     const [selectedFiles, setSelectedFiles] = useState([]);
       const [dashboardCount, setDashboardCount] = useState({})
       const [batchId, setBatchId] = useState('');
const [batchModalOpen, setBatchModalOpen] = useState(false);
const [searchValue, setSearchValue] = useState('');
const [filteredData1, setFilteredData1] = useState('');
const [fromDate, setFromDate] = useState(null);
const [toDate, setToDate] = useState(null);


  const fields = [
    "From", "To", "Ticket ID",
    "Policy No", "Call Type", "Sub Type",
    "Amount", "Payout Mode", "Status",
    "Last Approved"
  ];

  //  const fetchDashboardMetrics = async () => {
  //   try {
  //     const response = await axios.get('/api/dashboard-metrics');
  //     setValues(response.data);
  //   } catch (error) {
  //     console.error('Error fetching card values:', error);
  //   }
  // };

  useEffect(() => {
    searchData();
    getCTST();
  }, []);
const handleSearch = async () => {
  const payload = {
    batchId: searchValue || null,
    fromDate: fromDate ? fromDate.format('YYYY-MM-DD') : null,
    toDate: toDate ? toDate.format('YYYY-MM-DD') : null,
  };

  setIsLoading(true);

  try {
     setIsLoading(true);
    const response = await apiCalls.GenerateBatchInfo(payload);
    const transformedData = response.data.map(item => {
      const dateOnly = item.batchIDCreatedOn.split(' ')[0];
      const [year, month, day] = dateOnly.split('-');
      return {
        Date: `${day}/${month}/${year}`, 
        Batchid: item.batchID.toString(),
      };
    });
    setFilteredData1(transformedData); 
  } catch (error) {
  } finally {
    setIsLoading(false);
  }
};
const HandlefilterBatchId=()=>{
  handleSearch()
  setBatchModalOpen(true)
}
   const handleMenuClick = ({ key }) => {
      if (key === 'claims') {
       // GetClaimsDownloadFile();
      } else if (key === 'pos') {
       // GetPosDownloadFile();
      }
    };
  
    const menu = (
      <Menu
        onClick={handleMenuClick}
        items={[
          {
            label: 'Claims Format',
            key: 'claims',
          },
          {
            label: 'POS Format',
            key: 'pos',
          },
        ]}
      />
    );

    const onSearch = (e) =>{
}

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

    const filterOption = (input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
      const handleCallTypeChange = (value, obj) => {
        if(obj?.isCallType){
          setSelectedCallType(obj?.mstID);
          form.setFieldsValue({subType: null})
          setSubTypeLU(null);
          setSelectedSubType(null);
          subTypeDropdown(obj?.mstID);
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
          setSubTypeId(value);
          setSelectedSubTypeId(value);
          let subTypeData = subTypeLU?.length>0 ? subTypeLU : getSubLU;
          subTypeData?.map((key, index) => {
            if(key?.mstID===value){ 
              const modifiedDesc = key.mstDesc?.replace(/[^\w]/g, "").toLowerCase();
              setSelectedSubType(modifiedDesc);
              setSelectedSubTypeVal(key.mstDesc)
              //  props?.setSelectedSubTypeVall(key.mstDesc)
            }
          });
        //}
        };
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
           setCALL_TyPES(transformedData);
          setCALL_TyPES(transformedData);
          setRequestModeLU(rquestModeData);
          //setIsLoading(false);
        }).catch((err) => {
          //setIsLoading(false);
          message.destroy()
          message.error({
            content: err?.data?.responseBody?.errormessage,
            className: "custom-msg",
            duration: 2,
          });
        })
    
      }

    const searchData = async () => {
  try {
    setIsLoading(true);

    // Step 1: Get form data
    const formData = form.getFieldsValue();

    // Step 2: Dynamically process date fields and trim strings
    const processedForm = Object.entries(formData).reduce((acc, [key, value]) => {
      if (value && typeof value.format === "function") {
        acc[key] = value.format("YYYY-MM-DD"); // handle moment dates
      } else if (typeof value === "string") {
        acc[key] = value.trim();
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});

    // Step 3: Construct request object
    const requestObj = {
      ...processedForm,
      policyNumber: processedForm.PolicyNo?.toLowerCase() || "",
      ticketID: processedForm.ticketid || "",
      lastApprovedDate: processedForm.lastapproved || "",
      userId: loggedUser.userName,
      role: loggedUser.role,
      callType: selectedCallType,
    };

    // Step 4: Make API call
    const response = await apiCalls.PayoutDashboard(requestObj);
    const payoutList = response?.data?.responseOutput;
     setDashboardCount(response?.data?.responseOutput)

    // Step 5: Dynamic mapping from API response
    if (Array.isArray(payoutList?.payouts)) {
      const mappedData = payoutList?.payouts?.map((item, index) => ({
        key: item.payoutID || index,
        policyNo: item.lA_PolicyNo || "-",
        ticketId: item.srvReqID || "-",
        callLogDate: item.approvedOn || "-",
        callType: item.callTypeDesc || "-",
        subType: item.subTypeDesc || "-",
        amount : item.payoutAmt ? Number(item.payoutAmt).toLocaleString('en-IN') : "-",
        date: item.approvedOn ? dayjs(item.approvedOn).format('DD-MM-YYYY') : "-",
        payoutmode: item.paymentModeValue || "-",
        status: item.paymentStatusValue || "-",
        department: item?.department ||"",
        approvedBy: item.approvedBy || "-",
        batchId: item?.batchID ||"",
        IsFileDownload : item?.IsFileDownload || "No"
      }));

      setData(mappedData);
      setISAdvanceModal(false);
    } else {
      setData([]);
      message.destroy();
      message.error({
        content: response?.data?.responseBody?.errormessage || "Something went wrong, please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  } catch (err) {
    message.destroy();
    message.error("Failed to load data.");
    setData([]);
  } finally {
    setIsLoading(false);
  }
};

 const handleSelectAll = () => {
  if (isAllSelected) {
    setSelectedRowKeys([]);
    setSelectedRows([]);
    setIsAllSelected(false);
  } else {
    const allKeys = data.map(item => item.key);
    setSelectedRowKeys(allKeys);
    setSelectedRows(data);
    setIsAllSelected(true);
  }
};


const rowSelection = {
  selectedRowKeys,
  onChange: (selectedKeys, selectedRecords) => {
    setSelectedRowKeys(selectedKeys);
    setSelectedRows(selectedRecords);
    setIsAllSelected(selectedKeys.length === data.length);
  },
  onSelect: (_, __, selectedRecords) => {
    setSelectedRows(selectedRecords);
    setIsAllSelected(selectedRecords.length === data.length);
  },
  onSelectAll: (selected, selectedRecords) => {
    setSelectedRows(selectedRecords);
    setSelectedRowKeys(selectedRecords.map(r => r.key));
    setIsAllSelected(selected);
  },
};

 const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });
    setUploading(true);
    // You can use any AJAX library you like
    fetch('', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.destroy();
        message.success('upload successfully.');
      })
      .catch(() => {
        message.destroy();
        message.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };


     const GenerateBatchId = async () => {
          if (selectedRows?.length === 0) {
            message.destroy();
            message.warning('Please select at least one payout record.');
            return;
          }
        
          const payoutObj = selectedRows?.map(row => ({
            PayoutID: row.key,
            SrvReqID: row?.ticketId,
            // PayoutAmt: row.amount,
            // policyNo: row.policyNo,
            // callType: row.callType,
            // subType: row.subType,
            // payoutmode: row.payoutmode,
            // date: row.date,
            // status: row.status,
            // lastApprovedBy: row?.approvedBy,

        //       "PayoutID": 118,
        // "SrvReqID": 11056,
        // "PayoutAmt": 15000,
        // "ApprovedOn": "2025-06-08",
        // "ApprovedBy": "Sravani",
        // "PayoutMode": 1231,
        // "PayoutStatus": 22,
        // "PayoutUTRCheqno": "UTR123456789",
        // "PayoutConfReceivedOn": "2025-06-08",
        // "LastUpdtedOn": "2025-06-08",
        // "BatchID":"111111"

          }));
        
          try {
            const response = await apiCalls.GenerateBatchId(payoutObj);
            if (response.status === 200) {
              const batchID = response?.data?.responseOutput?.[0]?.batchID;
        
              if (!batchID) {
                message.error('Batch ID not returned');
                return;
              }
        
              // Update only the `batchid` for selected records
              const updatedData = data?.map(row => {
                const isSelected = selectedRows?.some(sel => sel?.ticketId === row?.ticketId);
                return isSelected ? { ...row, batchId: batchID } : row;
              });
        
              setData(updatedData);
             // message.success(`Info saved successfully! Batch ID: ${batchID}`);
              setAlertTitle('Batch Creation');
              setAlertData(`Batch Created successfully! Batch ID: ${batchID}`);
              setShowAlert(true);
            } else {
              message.error(`Failed to save info: ${response.statusText}`);
              setAlertTitle('Batch Creation');
              setAlertData(`Failed to save info: ${response.statusText}`);
              setShowAlert(true);
            }
          } catch (error) {
            message.error(`Error: ${error.response?.data || error.message}`);
          }
        };
        
        
       const GetPosDownloadFile = async (batchId) => {
  if (!batchId) {
    message.destroy();
    message.warning('Please enter batch id.');
    return;
  }

  // Construct the payload as an array (to match List<Payout> on server)
  const payoutObj = [
    {
      PayoutID: 0,
      SrvReqID: 0,
      BatchID: Number(batchId?.trim()) // convert to number to match C# long?
    }
  ];

  try {
    const response = await apiCalls.GetPosDownloadFile(payoutObj);
    
    if (response.status === 200) {
      if (response.data) {
        downloadExcel(response?.data?.fileContent, response?.data?.fileName); // adjust this if your response has { fileContent, fileName }
      }
    } else {
      setAlertTitle('Batch Creation');
      setAlertData(`Failed to generate file: ${response?.statusText}`);
      setShowAlert(true);
    }
  } catch (error) {
    message.destroy();
    message.error(`Error: ${error.response?.data || error.message}`);
  }
};

        
  
        const GetClaimsDownloadFile = async () => {
          if (selectedRows.length === 0) {
            message.warning('Please select at least one payout record.');
            return;
          }
        
          const payoutObj = selectedRows.map(row => ({
            payoutId: row.ticketNo,
            amount: row.amount,
            policyNo: row.policyNo,
            callType: row.callType,
            subType: row.subType,
            payoutmode: row.payoutmode,
            date: row.date,
            status: row.status,
            lastApprovedBy: row?.approvedBy,
          }));
        
          try {
            const response = await apiCalls.GetClaimsDownloadFile(payoutObj);
            if (response?.status === 200) {
              if (response?.data && response.data?.fileContent) {
                downloadExcel(response?.data?.fileContent, response?.data?.fileName);
            } 
             
        
           
            } else {
              message.error(`Failed to save info: ${response?.statusText}`);
              setAlertTitle('Batch Creation');
              setAlertData(`Failed to save info: ${response?.statusText}`);
              setShowAlert(true);
            }
          } catch (error) {
            message.error(`Error: ${error.response?.data || error?.message}`);
          }
        };
        
        const downloadExcel = (base64Data, fileName) => {
          const byteCharacters = atob(base64Data); // Decode Base64
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
      
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = fileName || "EmailResponse.xlsx"; // Default filename if missing
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      };
  
    const handleUploadClick = () => {
      // Navigate to the 'excelUpload' path
      //navigate('/excelUpload');
      setISUploadModal(true)
    };
    const handleAdvanceClick = () => {
      setISAdvanceModal(true)
    };

    const handleCountClick = (selctedTitle)=>{

    }

  return (
    <div style={{ padding: 16 }}>
       <div className="d-flex justify-center align-center mb-8">
          <h6 className="advance-title text-center fs-26">Finance Dashboard</h6>
          </div>
      {/* Top Buttons */}
      <div style={{ 
        marginBottom: 24, 
        display: 'flex', 
        justifyContent: 'flex-end', 
        flexWrap: 'wrap', 
        gap: '8px' 
      }}>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>Advance Search</Button>
          {/* <Dropdown overlay={menu} trigger={['click']}>
            <Button
              type="primary"
              style={{ backgroundColor: '#c21b17', borderColor: '#c21b17' }}
            >
              Create Batch ID <DownOutlined />
            </Button>
          </Dropdown> */}
           <Button
              type="primary"
              style={{ backgroundColor: '#c21b17', borderColor: '#c21b17' }}
              onClick={GenerateBatchId}
            >
              Create Batch ID 
            </Button>
             <Button type="primary" onClick={() => HandlefilterBatchId()}>View Batch ID's</Button>
       <Button type="primary" onClick={() => setDownloadModalOpen(true)}>Download File</Button>
        <Button type="primary" danger onClick={() => setUploadVisible(true)}>Upload File</Button>
      </div>

      {/* Card Section */}
     <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
  {/* {cardData?.map((title, index) => (
    <Col xs={24} sm={12} md={8} lg={6} xl={4} key={index}>
      <Card style={{ textAlign: 'center' }}>
        <strong>{title}</strong>
        <div>{dashboardCount[cardDataMap[title]] ?? '0'}</div>
      </Card>
    </Col>
  ))} */}
  {cardData?.map((title, index) => {
  const keyName = cardDataMap[title]; // e.g., 'CountofLoan'
  const value = dashboardCount[keyName] ?? '0';

  return (
    // <Col xs={24} sm={12} md={8} lg={6} xl={4} key={index}>
    //   <Card style={{ textAlign: 'center' }}>
    //     <strong>{title}</strong> {/* Shows: Loan, Surrender, etc. */}
    //     <div>{value}</div>       {/* Shows: 10, 5, etc. */}
    //   </Card>
    // </Col>
    <Col xs={24} sm={12} md={8} lg={6} xl={4} key={index}>
  <Card style={{ textAlign: 'center' }}>
    <strong>{title}</strong>
    <div>
      {value > 0 ? (
        <a onClick={() => handleCountClick(title)} style={{ cursor: 'pointer', color: '#b3201f !important' }} >
          {value}
        </a>
      ) : (
        value
      )}
    </div>
  </Card>
</Col>

  );
})}

</Row>


      {/* Table Section */}
      <Table
       rowSelection={rowSelection}
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 5 }}
        //rowKey={(record, index) => index}
        scroll={{ x: 'max-content' }}
      />
       
       <AdvanceSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        form={form}
        onFinish={searchData}
        callTypes={CALL_TyPES} 
        subTypes={subTypeLU} // Pass sub type options
        requestModes={requestModeLU} // Pass mode options
        statuses={statusLU} // Pass status options
        onSearch={onSearch}
        filterOption={filterOption}
        onCallTypeChange={(value, option) => {handleCallTypeChange(value, option)}}
        rules={[{ required: false, message: "Required" }]}
        dateFormat="YYYY-MM-DD"
        loggedUser={loggedUser}
      />

       <DownloadFileModal
        visible={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        GetPosDownloadFile={GetPosDownloadFile}
        batchId={batchId}
        setBatchId={setBatchId

        }
      />

        {/* <UploadFileModal
        visible={uploadVisible}
        onClose={() => setUploadVisible(false)}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        setUploadVisible={setUploadVisible}
      /> */}
        {showAlert && (
        <PopupAlert
          alertData={alertData}
          title={alertTitle}
          navigate={''}
          setShowAlert={setShowAlert}
        ></PopupAlert>
      )}
        <Modal
            open={uploadVisible}
            onCancel={() => setUploadVisible(false)}
            footer={null}
            width={400}
            centered
          >
           <div
        style={{
          border: '1px solid ',
          padding: '20px',
          fontFamily: 'Arial, sans-serif',
          textAlign: 'center',
        }}
      >
        {/* Header */}
        <h2
          style={{
            // borderBottom: '1px solid',
            color:'#c21b17',
            paddingBottom: '20px',
            marginBottom: '20px',
            fontWeight: 'normal', // Removed bold
          }}
        >
          Upload File
        </h2>
      
        {/* Label */}
        <div
          style={{
            textAlign: 'left',
            marginBottom: '5px',
            borderRadius: '10px',
          }}
          rules={[
            {
              pattern: /^\d+$/,
              message: 'Only numbers are allowed',
            },
          ]}
        >
          Batch ID
        </div>
      
        {/* Input */}
        <input
        type="text"
        placeholder="Enter Text: Numeric"
        style={{
          width: '100%',
          padding: '10px',
          border: '1px solid',
          fontSize: '14px',
          marginBottom: '20px',
          borderRadius: '10px',
        }}
        onKeyPress={(e) => {
          if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
          }
        }}
      />
      
      
        {/* Upload Box */}
        <div
          style={{
            border: '1px solid ',
            padding: '30px 10px',
            marginBottom: '20px',
            cursor: 'pointer',
            borderRadius: '10px',
          }}
        >
       <Upload.Dragger
        name="file"
        multiple={true}
        showUploadList={false}
        style={{ border: 'none' }}
        beforeUpload={(file, fileList) => {
          // Combine previously selected files with new ones (avoid duplicates if needed)
          const updatedFiles = [...selectedFiles, ...fileList];
      
          // Optionally remove duplicate file names
          const uniqueFiles = Array.from(
            new Map(updatedFiles.map(f => [f.name, f])).values()
          );
      
          setSelectedFiles(uniqueFiles);
          return false; // Prevent auto-upload
        }}
      >
        <div>
          <UploadOutlined style={{ fontSize: '32px', color: '#595959' }} />
          <div style={{ marginTop: '10px', fontSize: '14px', color: '#595959' }}>
            Choose files or Drag them here
          </div>
      
          {selectedFiles.length > 0 && (
            <div style={{ marginTop: '15px', textAlign: 'left' }}>
              <strong>Total Files:</strong> {selectedFiles.length}
              <ul style={{ paddingLeft: '20px', marginTop: '5px' }}>
                {selectedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Upload.Dragger>
      
      
          {/* <Upload.Dragger
            name="file"
            multiple={false}
            showUploadList={false}
            style={{ border: 'none' }}
            customRequest={({ file, onSuccess }) => {
              console.log(file);
              setTimeout(() => onSuccess('ok'), 1000);
            }}
          >
            <div>
              <UploadOutlined style={{ fontSize: '32px', color: '#595959' }} />
              <div style={{ marginTop: '10px', fontSize: '14px', color: '#595959' }}>
                Choose a file or Drag it here
              </div>
            </div>
          </Upload.Dragger> */}
        </div>
      
        {/* Upload Button */}
        <Button
          type="primary"
          style={{
            backgroundColor: '#c21b17',
            borderColor: '#c21b17',
            color: '#fff',
            width: '100%',
            height: '40px',
            fontSize: '16px',
            borderRadius: '6px',
            fontWeight: 'normal', // Removed bold
          }}
          onClick={() => {
            if (selectedFiles.length === 0) {
              message.warning("Please select at least one file.");
              return;
            }
        
            // Handle file upload logic here
            // For example, call your API or store them locally
            console.log("Uploading files:", selectedFiles);
        
            // Clear the file list if you want
            setSelectedFiles([]);
        
            // Close the modal
            setUploadVisible(false);
          }}
        >
          Upload
        </Button>
      </div>
          </Modal>
               <Modal
      open={batchModalOpen}
      onCancel={() => setBatchModalOpen(false)}
      footer={null}
      width={500}
      centered
    >
      <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'left' }}>
        <h2 className='external-title' > Batch ID List by Date</h2>
        <Input
  placeholder="Enter Batch ID"
  value={searchValue}
  onChange={e => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setSearchValue(val); 
    }
  }}
  style={{ width: '100%', marginBottom: '8px' }}
/>
   <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
  <DatePicker
    style={{ width: '50%' }}
     format={dateFormat}
    onChange={(date) => setFromDate(date)}
    placeholder="From Date"
  />
  <DatePicker
    style={{ width: '50%' }}
    format={dateFormat}
    onChange={(date) => setToDate(date)}
    placeholder="To Date"
  />
</div>
        <Button
        type="primary"
        block
        style={{ backgroundColor: '#b21f1f', marginBottom: '16px' }}
        onClick={handleSearch}
      >
        Search
      </Button>
       <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        <Table
          columns={Batchcolumns}
          dataSource={filteredData1}
          pagination={false}
          loading={isLoading}
          size="small"
          bordered
          rowKey={(record, index) => index}
        />
      </div>
      </div>
    </Modal>
    </div>
    
  );
};

export default FinanceDashboard;
