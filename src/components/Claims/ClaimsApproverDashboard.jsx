import React, { useEffect, useState } from "react";
import {  Spin, message,Row,Col,Form,DatePicker, Button,Input,Table, Space,Card,Select, Modal, Checkbox, Tooltip,Typography } from "antd";
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import apiCalls from "../../api/apiCalls";
import { useSelector } from 'react-redux';
import CloseIcon from "../../assets/images/close-icon.png";
import { useLocation } from 'react-router-dom';
const { Text } = Typography;

const ClaimsApproverDashboard = (props) => {
  const loggedUser = useSelector(state => state?.userProfileInfo?.profileObj);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [claimsDashboardData,setClaimsDashboardData] = useState({});
  const [data, setData] = useState([]);
  const dateFormat = "DD/MM/YYYY";
  const [showTotalPages,setShowTotalpages] = useState(null);
  const [isAdvanceSearchModalOpen,setIsAdvanceSearchModalOpen] = useState(false);  //BOEUSER COde START
  const location = useLocation();
  const user = location.state?.user;
  const claimTypeLU = [
    { label: 'Death', value: 'death' },
    { label: 'WOP', value: 'wop' },
    { label: 'CI', value: 'ci' },
    { label: 'TPD', value: 'tpd' },
  ]
  const claimCategoryLU = [
    { label: 'Early', value: 'early' },
    { label: 'Non-Early', value: 'nonearly' },
  ]
  const claimStatusLU = [
    { label: 'Death', value: 'death' },
    { label: 'WOP', value: 'wop' },
    { label: 'CI', value: 'ci' },
    { label: 'TPD', value: 'tpd' },
  ]
  const statusLU = [
    { label: 'Closed', value: 'closed' },
    { label: 'Pending', value: 'pending' },
    { label: 'Closed With Requirements', value: 'closedwithrequirements' },
    { label: 'Failed', value: 'failed' },
    ];
  useEffect(() => {
    searchData();
}, [user]);

const searchData =async () => {  
  setIsAdvanceSearchModalOpen(false);  
  setIsLoading(true);
  const formData = form.getFieldsValue(); 
  const fromDate = formData.FormDate ? formData.FormDate.format('YYYY-MM-DD') : ''; 
  const toDate = formData.ToDate ? formData.ToDate.format('YYYY-MM-DD') : '';
  const PolicyNo = formData.PolicyNo ? formData.PolicyNo.toLowerCase().trim() : '';
  let obj={
    fromDate:fromDate || '',
    toDate:toDate || '',
    policyNumber:PolicyNo,
    userId:loggedUser.userName,
    role:loggedUser.role || 31,
    callType: 33,
    subType: 3,
    mode: null,
    status:formData?.status == undefined ? 'PENDING' : formData?.status ,
    ageing: null,
    assignedTo: null,
    claimType: formData?.claimType || '',
    ticketIDNo: formData?.ticketIDNo || ''
  }
 const response=await apiCalls.getBOEUserDashboard(obj);
  if(response.status===200) {
    setClaimsDashboardData(response?.data);
    let filteredData = response?.data?.pOSLists;
    setData(filteredData);
    setIsLoading(false);
  }
  else {
    setData({});
    setIsLoading(false);
    message.destroy()
    message.error({
      content: response?.data?.responseBody?.errormessage || "Something went wrong please try again!",
      className: "custom-msg",
      duration: 2,
    });
  }
};

const handleAction=async(item)=>{
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
    isInternalFlow:true,
    isClaimsNotification: false,
    isClaimsPrimaryAssesment: false,
    isClaimsAssessmentChecker: false,
    isClaimsApproverUser: true
  }
    navigate("/policydetails", { state: obj });
}

const columns = [
  {
    title: "Ticket ID No",
    dataIndex: "serviceNo",
    key: 'serviceNo',
    render: (_, record) => (
      <Space size="middle">
<a> <i  onClick={() => handleAction(record)} className="gridLink">{record?.serviceNo}</i></a>
      </Space>
    ),
  },
//   {
//     title: "Request Received Date",
//     dataIndex: "date",
//     showSorterTooltip: false,
//     sorter: {
//       compare: (a, b) => moment.utc(a.date).diff(moment.utc(b.date)),
//     },
//    render: (_, record) => (
//     <Space size="middle">
//     { moment.utc(record.date).local().format("DD/MM/YYYY hh:mm A")}
//     </Space>
//   ),
//   },
  { title: 'Policy No', dataIndex: 'policyNo', key: 'policyNo' },
  {
    title: "Call Log Date",
    dataIndex: "date",
    showSorterTooltip: false,
    sorter: {
      compare: (a, b) => moment(a.date).diff(moment(b.date)),
    },
   render: (_, record) => (
    <Space size="middle">
    { moment(record.date).local().format("DD/MM/YYYY hh:mm A")}
    </Space>
  ),
  },
  { title: 'Claim Type', dataIndex: 'notificationType', key: 'notificationType' },
  { title: 'Claim Category', dataIndex: 'claimCategory', key: 'claimCategory' },
  { title: 'LA Name', dataIndex: 'laName', key: 'laName' },
  { title: 'Beneficiary Name', dataIndex: 'beneficaryName', key: 'beneficaryName' },
  { title: 'Claim Status', dataIndex: 'claimStatus', key: 'claimStatus' },
  { title: 'Ageing', dataIndex: 'ageing', key: 'ageing' },
];

  return (
    <>
    <Spin spinning={isLoading} fullscreen />
    <div style={{ padding: '20px' }}>
      <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col span={4}>
          <Card bordered={true} style={{ textAlign: 'center' }}>
            <Text strong>Death</Text>
            <br />
            <Text style={{ color: '#c21b17', fontSize: '20px' }}>{claimsDashboardData?.notificationDeath}</Text>
          </Card>
        </Col>
        <Col span={4}>
          <Card bordered={true} style={{ textAlign: 'center' }}>
            <Text strong>CI</Text>
            <br />
            <Text style={{ color: '#c21b17', fontSize: '20px' }}>{claimsDashboardData?.notificationCritIll}</Text>
          </Card>
        </Col>
        <Col span={4}>
          <Card bordered={true} style={{ textAlign: 'center' }}>
            <Text strong>WOP</Text>
            <br />
            <Text style={{ color: '#c21b17', fontSize: '20px' }}>{claimsDashboardData?.notificationWoP}</Text>
          </Card>
        </Col>
        <Col span={4}>
          <Card bordered={true} style={{ textAlign: 'center' }}>
            <Text strong>TPD</Text>
            <br />
            <Text style={{ color: '#c21b17', fontSize: '20px' }}>{claimsDashboardData?.notificationTPD}</Text>
          </Card>
        </Col>
         <Col span={4}>
          <Card bordered={true} style={{ textAlign: 'center' }}>
            <Text strong>Health</Text>
            <br />
            <Text style={{ color: '#c21b17', fontSize: '20px' }}>{claimsDashboardData?.notificationTPD}</Text>
          </Card>
        </Col>
        <Col span={4}>
          <Button type="primary" className="primary-btn mt-24"
           onClick={() => setIsAdvanceSearchModalOpen(!isAdvanceSearchModalOpen)}
          > Advance Search</Button>
        </Col>
      </Row>
      <Table
              columns={columns}
              dataSource={data}
              locale={{
                emptyText: 'No Data Available',
              }}
              x={true}
              pagination={{
                pageSize: 10,
                defaultPageSize: 5,
                total: showTotalPages,
              }}
            />
    </div>

    <Modal
        title="Apply Filters"
        open={isAdvanceSearchModalOpen}
        destroyOnClose={true}
        width={800}
        closeIcon={
            <Tooltip title="Close">
              <span onClick={() => setIsAdvanceSearchModalOpen(false)}>
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
    <Row gutter={[12, 12]} className="mb-16">
    {/* <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
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
            className="cust-input modal-input"
            maxLength={100}
          />
        </Form.Item>
      </Col> */}
            
             
      <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
        <div>
          <Form.Item
            label={
              <span>
                From Date
              </span>
            }
            name="FormDate"
            className="inputs-label mb-0"
            rules={[
              {
               required: false, 
             message: 'Select Date'
              }
            ]}
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
              </span>
            }
            name="ToDate"
            className="inputs-label mb-0"
            rules={[
              {
               required: false, 
             message: 'Select Date'
              }
            ]}
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
                <Form.Item
                  label="Claim Type"
                  name="claimType"
                  className="inputs-label mb-0"
                >
                  <Select
                    showSearch
                    allowClear={true}
                    className="cust-input"
                    maxLength={100}
                    placeholder="Select Claim Type"
                    options={claimTypeLU}
                  ></Select>
                </Form.Item>
              </Col>
              <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
                <Form.Item
                  label="Claim Category"
                  name="claimCategory"
                  className="inputs-label mb-0"
                >
                  <Select
                    showSearch
                    allowClear={true}
                    className="cust-input"
                    maxLength={100}
                    placeholder="Select Claim Category"
                    options={claimTypeLU}
                  ></Select>
                </Form.Item>
              </Col>
              <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
                <Form.Item
                  label="Claim Status"
                  name="claimStatus"
                  className="inputs-label mb-0"
                >
                  <Select
                    showSearch
                    allowClear={true}
                    className="cust-input"
                    maxLength={100}
                    placeholder="Select Claim Status"
                    options={claimTypeLU}
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
                    placeholder="Select Claim Status"
                    options={claimTypeLU}
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
      </Modal>
    </>
  );

};
export default ClaimsApproverDashboard;