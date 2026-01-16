import React, { useState,useEffect,  } from 'react';
import { useNavigate } from 'react-router-dom';

import { Form,Select,Row,Col, Table,Spin, message,  DatePicker , Button, Space,Modal,Upload,Tooltip ,Checkbox,Input, Dropdown, Menu, Card} from 'antd';
import apiCalls from "../../api/apiCalls";
import moment from 'moment';
import { DownOutlined } from '@ant-design/icons';
import ExportToExcelButton from '../ExportToExcelButton';
import { UploadOutlined } from '@ant-design/icons';
import PopupAlert from '../popupAlert';
import {  DownloadOutlined} from "@ant-design/icons";
import { useSelector } from 'react-redux';
import CloseIcon from "../../assets/images/close-icon.png";

const cardStyle = {
  borderRadius: '15px',
  border: '1px solid black',
  color: 'red',
  fontWeight: 'bold',
  fontSize: '16px',
  textAlign: 'left',
};

const titleStyle = {
  marginBottom: '10px',
  fontSize: '18px',
};
const FinanceDashboard = (props) => {
  const navigate = useNavigate();
  const { Option } = Select;
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [isLoading,setIsLoading] = useState(false);
  const [data,setData] = useState([]);
  const [dashboardData,setDashboardData] = useState([]);
  const [showTotalPages,setShowTotalpages] = useState(null);
  const [tableKey, setTableKey] = useState(0); // Key to force remount
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [dashboardCount, setDashboardCount] = useState({})

  //excell upload code start
  const [fileList, setFileList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [uploading, setUploading] = useState(false);
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
  const loggedUser = useSelector(state => state?.userProfileInfo?.profileObj);
  const [trigger,setTrigger] = useState([
    {
      value: "T-10",
      label: "T-10",
    },
    {
      value: "T-30",
      label: "T-30",
    },
    {
      value: "T-90",
      label: "T-90",
    },
    {
      value: "T-15",
      label: "T-15",
    },
    
  ]);
  const [commuType,setCommuType] = useState([
    {
      value: "email",
      label: "Email",
    },
    {
      value: "phone",
      label: "Phone",
    }
    
  ]);
  const [uploadType,setUploadType] = useState([
    {
      value: "PayeeCodeTransection",
      label: "Payment Transaction",
    },
     {
      value: "ChequeStatus",
      label: "Check Status",
    },
    {
      value: "MaturityDetails",
      label: "Maturity Details",
    },

  ])
  const paymentMethodLU= [
    { label: 'NEFT', value: 'neft' },
    { label: 'Cheque', value: 'cheque' },
    ];
    const statusLU = [
      { label: 'Closed', value: 'closed' },
      { label: 'Pending', value: 'pending' },
      { label: 'Closed With Requirements', value: 'closedwithrequirements' },
      { label: 'Failed', value: 'failed' },
      ];
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
        message.success('upload successfully.');
      })
      .catch(() => {
        message.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props2 = {
    onRemove: (file) => {
      const index = fileList2.indexOf(file);
      const newFileList = fileList2.slice();
      newFileList.splice(index, 1);
      setFileList2(newFileList);
    },
    beforeUpload: (file) => {
      setFileList2([file]);
     // setFileList2([...fileList2, file]);
      return false;
    },
    multiple: false,
    fileList2,
  };

  const propss = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      //setFileList([...fileList, file]);
      setFileList([file]);
      return false;
    },
    multiple: false,
    fileList,
  };
  const handleExcelSubmit = (values) => {
  setShowAlert(false)
    let formData = new FormData();
    formData.append("File", fileList[0]);
    let obj = {
      reqtype: values?.uploadType
    }
    let response = apiCalls.UploadExcelFileAPI(formData, obj);
    response
      .then((val) => {

        setAlertTitle('Uploaded Successfully');

        setShowAlert(true);
      })
      .catch((err) => {
        setAlertTitle('Failed to Upload');

        setShowAlert(true);
        setIsLoading(false);
      });
  }
  
  const values = form.getFieldsValue();
  const dateFormat = "DD/MM/YYYY";
  const defaultColumns = [
    {
      title: "Policy No ",
      dataIndex: "policyNo",
      //key: 'lA_PolicyNo',
    },
    {
          title: "Ticket ID",
          dataIndex: "ticketNo",
          key: '',
        },
        {
          title: "Call Log Date",
          dataIndex: "callLogDate",
          showSorterTooltip: false,
          sorter: {
            compare: (a, b) => moment(a.callLogDate).diff(moment(b.callLogDate)),
          },
          render: (_, record) => (
            <Space size="middle">
              {record.callLogDate && moment(record.callLogDate).isValid()
                ? moment(record.callLogDate).local().format("DD/MM/YYYY hh:mm A")
                : "-"}
            </Space>
          ),
        },
        
        {
          title: "Call Type",
          dataIndex: "callType",
          key: '',
        },
        {
          title: "Sub Type",
          dataIndex: "subType",
          key: '',
        },
        // {
        //   title: "PO No",
        //   dataIndex: "poNo",
        //   key: '',
        // },
        {
          title: "Amount",
          dataIndex: "amount",
          key: '',
        },
        {
          title: "Payout Mode",
          dataIndex: "payoutmode",
          key: '',
        },
        {
          title: "Status",
          dataIndex: "status",
          key: '',
        },
        {
          title: "Last Approved By",
          dataIndex: "lastapprovedby",
          key: '',
        },
        {
          title: "Batch ID",
          dataIndex: "batchid",
          key: '',
        },


  ]
  
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

  const handleMenuClick = ({ key }) => {
    if (key === 'claims') {
      GetClaimsDownloadFile();
    } else if (key === 'pos') {
      GetPosDownloadFile();
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

  const excelData = [
    { Name: 'John', Age: 25, Country: 'USA' },
    { Name: 'Jane', Age: 30, Country: 'Canada' },
    // Add more data as needed
  ];

  useEffect(() => {
    getCTST();
    searchData();
  }, []); 
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

const handleSelectRow = (record, checked) => {
  setSelectedRows(prev =>
    checked
      ? [...prev, record]
      : prev.filter(r => r.ticketNo !== record.ticketNo) // or use another unique field
  );
};



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
  
      const formData = form.getFieldsValue();
      const fromDate = formData.FormDate ? formData.FormDate.format("YYYY-MM-DD") : "";
      const toDate = formData.ToDate ? formData.ToDate.format("YYYY-MM-DD") : "";
      const policyNumber = formData.PolicyNo?.toLowerCase().trim() || "";
      const ticketID = formData.ticketid?.trim() || "";
      const lastApprovedDate = formData.lastapproved ? formData.lastapproved.format("YYYY-MM-DD") : "";
  
      const requestObj = {
        fromDate,
        toDate,
        policyNumber,
        ticketID,
        userId: loggedUser.userName,
        role: loggedUser.role,
        callType: selectedCallType,
        subType: formData.subType,
        mode: formData.payoutmode,
        status: formData.status,
        lastApprovedDate
      };
  
      const response = await apiCalls.PayoutDashboard(requestObj);
      const payoutList = response?.data?.responseOutput;
      setDashboardCount(response?.data?.responseOutput)
  
      if (Array.isArray(payoutList?.payouts)) {
        const mappedData = payoutList?.map((item, index) => ({
          key: item.payoutID || index,
          policyNo: item.lA_PolicyNo || "-",
          ticketNo: item.srvReqID || "-",
          callLogDate: item.approvedOn || "-",
          callType: item.callTypeDesc || "-",
          subType: item.subTypeDesc || "-",
          amount: item.payoutAmt || "-",
          date: item.payoutConfReceivedOn || "-",
          payoutmode: item.payoutMode || "-",
          status: item.payoutStatus || "-",
          lastapprovedby: item.approvedBy || "-"
        }));
  
        setData(mappedData);
        setISAdvanceModal(false);
      } else {
        setData([]);
        message.error({
          content: response?.data?.responseBody?.errormessage || "Something went wrong, please try again!",
          className: "custom-msg",
          duration: 2
        });
      }
    } catch (err) {
      console.error("Fetch error:", err);
      message.error("Failed to load data.");
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleSubmit = (values) => {
    const obj = {
      "FromDate": new Date(fromDate) ,
      "ToDate": new Date(toDate)
    }
         
    let response = apiCalls.FinanceDashboardAPI(obj);
    response
      .then((val) => {
        if (val?.data) {
          setDashboardData(val?.data);
             
        } else {
          message.error({
            content:
              val?.data?.responseBody?.errormessage ||
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


  const handleFromDateChange = (date) => {
        
    setFromDate(date);

  };
    const handleToDateChange = (date) => {
        setToDate(date);
        if (fromDate && date && date.isBefore(fromDate)) {
            message.error('To Date cannot be earlier than From Date');
            setToDate(()=> null); // Reset To Date
            form.setFieldsValue({ todate: null });
          } else {
            setToDate(date);
          }

      };

      const handleAddPayoutInfo = async () => {
        const payoutObj = [
          {
            payoutId: 1,
            amount: 1000,
            currency: 'USD',
            // add other required fields as per your `Payout` model
          }
        ];
    
        try {
          const response = await apiCalls.AddPayoutInfo(payoutObj);
          if (response.status === 200) {
            message.success('Info saved successfully!');
          } else {
            message.error(`Failed to save info: ${response.statusText}`);
          }
        } catch (error) {
          message.error(`Error: ${error.response?.data || error.message}`);
        }
      };

      const handleUpdatePayoutInfo = async () => {
        const payoutObj = [
          {
            payoutId: 1,
            amount: 1000,
            currency: 'USD',
            // add other required fields as per your `Payout` model
          }
        ];
    
        try {
          const response = await apiCalls.UpdatePayoutInfo(payoutObj);
          if (response.status === 200) {
            message.success('Info saved successfully!');
          } else {
            message.error(`Failed to save info: ${response.statusText}`);
          }
        } catch (error) {
          message.error(`Error: ${error.response?.data || error.message}`);
        }
      };


      const GenerateBatchId = async () => {
        if (selectedRows.length === 0) {
          message.warning('Please select at least one payout record.');
          return;
        }
      
        const payoutObj = selectedRows.map(row => ({
          payoutId: row.key,
          amount: row.amount,
          policyNo: row.policyNo,
          callType: row.callType,
          subType: row.subType,
          payoutMode: row.payoutmode,
          date: row.date,
          status: row.status,
          lastApprovedBy: row.lastapprovedby,
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
            const updatedData = data.map(row => {
              const isSelected = selectedRows.some(sel => sel.ticketNo === row.ticketNo);
              return isSelected ? { ...row, batchid: batchID } : row;
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
      
      
      const GetPosDownloadFile = async () => {
        if (selectedRows.length === 0) {
          message.warning('Please select at least one payout record.');
          return;
        }
      
        const payoutObj = selectedRows.map(row => ({
          payoutId: row.key,
          amount: row.amount,
          policyNo: row.policyNo,
          callType: row.callType,
          subType: row.subType,
          payoutMode: row.payoutmode,
          date: row.date,
          status: row.status,
          lastApprovedBy: row.lastapprovedby,
        }));
      
        try {
          const response = await apiCalls.GetPosDownloadFile(payoutObj);
          if (response.status === 200) {
           
            if (response.data && response.data.fileContent) {
              downloadExcel(response.data.fileContent, response.data.fileName);
            }
      
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
          payoutMode: row.payoutmode,
          date: row.date,
          status: row.status,
          lastApprovedBy: row.lastapprovedby,
        }));
      
        try {
          const response = await apiCalls.GetClaimsDownloadFile(payoutObj);
          if (response.status === 200) {
            if (response.data && response.data.fileContent) {
              downloadExcel(response.data.fileContent, response.data.fileName);
          } 
           
      
         
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
  return (
    <>
      <div className='w-94'>
      <div className="d-flex justify-center align-center">
          <h4 className="advance-title text-center">Finance Dashboard</h4>

       
          </div>
      <Spin spinning={isLoading}>
  
        <Form
          form={form2}
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
          onFinish={handleSubmit}
          autoComplete="off"
        >
          {/* <Row gutter={[16,16]} className='dashboard-filters'>
            <Col xs={12} sm={12} md={4} lg={4} xxl={4}>
            
            </Col>
            <Col xs={12} sm={12} md={4} lg={4} xxl={4}>
              
            </Col>
   
          </Row> */}
           <Row gutter={[16, 16]} className='mb-24 mt-16 justify-center'>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card style={cardStyle}>
          <div style={titleStyle}>Pending POS Cases</div>
          <div>{dashboardCount?.pendingBatchCreation_POS || 0}</div>
        </Card>
      </Col>

      <Col xs={24} sm={12} md={8} lg={6}>
        <Card style={cardStyle}>
          <div style={titleStyle}>Pending Claims Cases</div>
          <div>{dashboardCount?.pendingBatchCreation_Claim || 0}</div>
        </Card>
      </Col>
    </Row>
        </Form>
        <Row
  gutter={[8, 8]} // Reduced spacing between buttons
  align="middle"
  justify="start"
  wrap={false} // Prevent buttons from wrapping
  style={{ marginBottom: '16px' }}
>
  {/* Select All */}
<Col>
  <p
    onClick={handleSelectAll}
    style={{
      marginRight: 12,
      color: '#c21b17',
      marginLeft: '14px',
      marginBottom: '-33px',
      cursor: 'pointer',
      textDecoration: 'underline',
    }}
  >
    <b>{isAllSelected ? 'Deselect All' : 'Select All'}</b>
  </p>
</Col>


  {/* Buttons with red styling */}
  <Col>
    <Button
      type="primary"
      style={{ backgroundColor: '#c21b17', borderColor: '#c21b17' }}
      onClick={handleAdvanceClick}
    >
      Advance Search
    </Button>
  </Col>

  <Col>
    <Button
      type="primary"
      style={{ backgroundColor: '#c21b17', borderColor: '#c21b17' }}
      onClick={GenerateBatchId}
    >
      Create Batch ID
    </Button>
  </Col>

  <Col>
  <Dropdown overlay={menu} trigger={['click']}>
    <Button
      type="primary"
      style={{ backgroundColor: '#c21b17', borderColor: '#c21b17' }}
    >
      Download File <DownOutlined />
    </Button>
  </Dropdown>
</Col>

  <Col>
    <Button
      type="primary"
      style={{ backgroundColor: '#c21b17', borderColor: '#c21b17' }}
      onClick={handleUploadClick}
    >
      Upload File
    </Button>
  </Col>

</Row>






      <div className="main-start">
        <div className="w-94">
     
          <div className="table-container dashboard" style={{ marginTop: '-17px' }}>
          <Table
            rowKey="key"
  rowSelection={rowSelection}
  columns={columns}
  dataSource={data}
        rowClassName={() => 'editable-row'}
        //bordered={true}
       // x={true}
        pagination={{
          //pageSizeOptions: ["5", "10", "15", "15"],
          pageSize: 20,
          //showSizeChanger: true,
          defaultPageSize: 20,
         // size:"small",
           total: {showTotalPages},
          //showTotal: `Total ${showTotalPages} items`
        }}
      />
      </div>
      </div>
      </div>
      </Spin>
      </div>
      {showAlert && (
        <PopupAlert
          alertData={''}
          title={alertTitle}
          navigate={''}
          setShowAlert={setShowAlert}
        ></PopupAlert>
      )}

<Modal
        title="Excel Upload"
        open={isExcelUploadModal}
        destroyOnClose={true}
        // width={1200}
        closeIcon={false}
        footer={null}
      >

        <div>

        <div className='w-94'>
      <Spin spinning={isLoading}>
  
        <Form
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
          onFinish={handleExcelSubmit}
          autoComplete="off"
        >
          <Row gutter={[16,16]} className='dashboard-filters'>
            <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                label="Trigger"
                name="trigger"
                className="input-label mb-0"
                rules={[
                    {
                      required: false,
                      message: 'Please select Trigger',
                    },
                  ]}
              >
        

        <Select
                  showSearch
                  placeholder="Select Trigger Value"
                  optionFilterProp="children"
   
                  options={trigger}
                />

              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                label="Communication Type"
                name="communicationType"
                className="input-label mb-0"
                rules={[
                    {
                      required: false,
                      message: 'Please select Communication Type',
                    },
                  ]}
              >

<Select
                  showSearch
                  placeholder="Select Communication Type"
                  optionFilterProp="children"
   
                  options={commuType}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                label="Upload Type"
                name="uploadType"
                className="input-label mb-0"
                rules={[
                    {
                      required: false,
                      message: 'Please Upload Type',
                    },
                  ]}
              >
        <Select
                  showSearch
                  placeholder="Select Upload Type"
                  optionFilterProp="children"
   
                  options={uploadType}
                />

              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xxl={24}>

            <Form.Item
                label="Upload Excel"
                name=""
                className="input-label mb-0"
                rules={[
                  {
                    required: true,
                    message: 'Please Upload Excel File',
                  },
                ]}
              >
<Upload {...propss}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>

              </Form.Item>
       </Col>
            <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
            <div className="contact-details-btn">
            <Button
                  type="primary"
                  className="primary-btn mt-33"
                  htmlType="submit"
                 
                >
                   Submit
                </Button>
                <Button
              type="primary"
              className="primary-btn mt-33"
              onClick={() => setIsExcelUploadModal(false)}
            >
              Close
            </Button>
            </div>
            </Col>
          </Row>
        </Form>
      </Spin>
      </div>
        </div>
      </Modal>
      <Modal
  title={null}
  open={iSDownloadModal}
  destroyOnClose={true}
  // closeIcon={false}
     closeIcon={
              <Tooltip title="Close">
                <span onClick={() => setISDownloadModal(false)}>
                  <img src={CloseIcon} alt=""></img>
                </span>
              </Tooltip>
            }
  footer={null}
  width={800}
>
  <div style={{ border: '2px solid black', padding: '10px', fontFamily: 'Arial, sans-serif' }}>
    <div
      style={{
        border: '2px solid black',
        padding: '10px',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#c21b17',
        fontSize: '16px',
        marginBottom: '10px',
      }}
    >
      Payout Details
    </div>
    <div
      style={{
        border: '1px solid black',
        padding: '10px',
        fontSize: '14px',
        marginBottom: '10px',
      }}
    >
     <strong>Payout: Paid {'{Amount}'} Via {'{NEFT/Cheque}'} on {'{PayoutDate}'}. UTR/Cheque No is {'{UTR/Cheque}'} Status:Success/Failure</strong> 
    </div>
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        border: '1px solid black',
        fontSize: '14px',
      }}
    >
      <thead>
        <tr>
          <th
            style={{
              border: '1px solid black',
              padding: '8px',
              fontWeight: 'bold',
              textAlign: 'left',
            }}
          >
            Approved On
          </th>
          <th
            style={{
              border: '1px solid black',
              padding: '8px',
              fontWeight: 'bold',
              textAlign: 'left',
            }}
          >
            Approved By
          </th>
          <th
            style={{
              border: '1px solid black',
              padding: '8px',
              fontWeight: 'bold',
              textAlign: 'left',
            }}
          >
            Comments
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ border: '1px solid black', padding: '16px' }}></td>
          <td style={{ border: '1px solid black', padding: '16px' }}></td>
          <td style={{ border: '1px solid black', padding: '16px' }}></td>
        </tr>
        <tr>
          <td style={{ border: '1px solid black', padding: '16px' }}></td>
          <td style={{ border: '1px solid black', padding: '16px' }}></td>
          <td style={{ border: '1px solid black', padding: '16px' }}></td>
        </tr>
        <tr>
          <td style={{ border: '1px solid black', padding: '16px' }}></td>
          <td style={{ border: '1px solid black', padding: '16px' }}></td>
          <td style={{ border: '1px solid black', padding: '16px' }}></td>
        </tr>
        <tr>
          <td style={{ border: '1px solid black', padding: '16px' }}></td>
          <td style={{ border: '1px solid black', padding: '16px' }}></td>
          <td style={{ border: '1px solid black', padding: '16px' }}></td>
        </tr>
      </tbody>
    </table>
    <div
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  }}
>
  <Button
    type="primary"
    style={{
      backgroundColor: '#c21b17',
      borderColor: '#c21b17',
      padding: '6px 20px',
      fontSize: '15px',
    }}
    onClick={() => setISDownloadModal(false)}
  >
    Close
  </Button>
</div>

  </div>
</Modal>
<Modal
  title={null}
  open={isUploadModal}
  destroyOnClose={true}
  // closeIcon={false}
     closeIcon={
              <Tooltip title="Close">
                <span onClick={() => setISUploadModal(false)}>
                  <img src={CloseIcon} alt=""></img>
                </span>
              </Tooltip>
            }
  footer={null}
  width={500}
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
      setISUploadModal(false);
    }}
  >
    Upload
  </Button>
</div>

</Modal>
<Modal
        className="po-modal"
        title="Apply Filters"
        open={iSAdvanceModal}
        destroyOnClose={true}
        width={420}
        closeIcon={
            <Tooltip title="Close">
              <span onClick={() => setISAdvanceModal(false)}>
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
    <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
        <div>
          <Form.Item
            label={
              <span>
                From 
                {/* <sup>*</sup> */}
              </span>
            }
            name="FormDate"
            className="inputs-label mb-0"
            // rules={
            //   Ruless
            // }
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
      <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
        <div>
          <Form.Item
            label={
              <span>
                TO 
                {/* <sup>*</sup> */}
              </span>
            }
            name="ToDate"
            className="inputs-label mb-0"
            // rules={
            //   Ruless
            // }
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
        <Form.Item
          name="ticketid"
          label="Ticket ID"
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
                    //  onSearch={onSearch}
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
                    // onSearch={onSearch}
                    options={subTypeLU}
                    filterOption={filterOption}
                    onChange={(e) => {handleSubTypeChange(e); }}
                  ></Select>
                      
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
        <Form.Item
          name="amount"
          label="Amount"
          className="inputs-label mb-0"
          rules={[
            {
              required: false,
              message: "Enter Amount",
            },
          ]}
        >
          <Input
            placeholder="Enter Amount"
            className="cust-input policy-input"
          />
        </Form.Item>
      </Col>
              <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
                <Form.Item
                  label=" Payout Mode"
                  name="payoutmode"
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
    className="inputs-label mb-0"
  >
    <Select
      showSearch
      allowClear={true}
      className="cust-input"
      maxLength={100}
      placeholder="Select status"
      options={statusLU}
    />
  </Form.Item>
</Col>
<Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
        <div>
          <Form.Item
            label={
              <span>
               Last Approved
                {/* <sup>*</sup> */}
              </span>
            }
            name=" lastapproved"
            className="inputs-label mb-0"
            // rules={
            //   Ruless
            // }
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
      <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
        <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              // <div className="text-center modal-validate">
            ><Button
              type="primary"
              className="primary-btn"
              htmlType="submit"
              // onClick={() => saveAssignTo()}
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


    </>
  );
}

export default FinanceDashboard;