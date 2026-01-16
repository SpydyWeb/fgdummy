import React, { useEffect, useState } from "react";
import { Checkbox, Spin, message,Row,Col,Form,DatePicker, Button,Input,Select } from "antd";
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import apiCalls from "../../api/apiCalls";
import { NumericFormat } from "react-number-format";
import { connect } from "react-redux";
import { sentDetailsObj } from "../../reducers/policyDetailsReducer";
import { useData } from "../../reducers/DataContext";
import { useSelector } from 'react-redux';
import Foreclosure from "../CallTypes/Foreclosure";

const POSPayoutDashboard = (props) => {
  const loggedUser = useSelector(state => state?.userProfileInfo?.profileObj);
  const { sharedData } = useData();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const dateFormat = "DD/MM/YYYY";
  const [record,setRecord] = useState();
  const [isForeclosureOpen,setIsForeclosureOpen]=useState(false);

  const payoutNameLU = [
    { label: 'Maturity', value: 1},
    { label: 'Survival Benefit', value: 2 },
    { label: 'Foreclosure', value: 3 },
    { label: 'Annuity', value: 4 },
    { label: 'Surrender', value: 5 },
    { label: 'Partial Withdrawal', value: 6 },
    { label: 'Loan', value:7 },
    { label: 'Free Look', value: 8 },
    { label: 'Pension Maturity', value: 9 },
    { label: 'Payment Reprocessing', value: 10 },
  ]

  const STPLU=[
    { label: 'Yes', value: 1},
    { label: 'NO', value: 2 },
  ];

  const PayoutMethodLU=[
    { label: 'NEFT', value: 1},
    { label: 'Cheque', value: 2 },
    { label: 'Fund Transfer', value: 3 },
  ]
 
  const PayoutAmountLU=[
    { label: '> 0 - <= 3 lakh', value: 1},
    { label: '> 3 - <= 5 lakh', value: 2 },
    { label: '> 5 - <= 10 lakh', value: 3},
    { label: '> 10 lakhs', value: 4 },
  ];

  const CaseTypeLU=[
    { label: 'Fresh', value: 1},
    { label: 'Resolved', value: 2 },
  ]
  
  useEffect(() => {
      getBoeData();
  }, [sharedData]);

  const handleDateChange =()=>{

  }

  const getBoeData =  async () => {
    setIsLoading(true);
    // let obj = {userId:'pauser1',role:15 };
    let response = apiCalls.GetListOfServiceRequestForMaturity();
    response.then((val)=>{
      if(val?.data){
        setData(val?.data);
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
  // const getPOSIndividualData=async()=>{
  //   setIsLoading(true);
  //   const  val = await apiCalls.getPOSIndividualData();
  //   console.log(val)
  
  // }
  const handlePolicyLink = (item) => {
    let sentObj = {};
    sentObj.emailId = item?.emailID;
    sentObj.mobileNo = item?.mobileNo;
    sentObj.dob = item?.dob;
    props?.updateSentDetails(item);
    navigate("/policydetails", { state: item });
  };
  const handleAction=async(item)=>{
    setIsLoading(true);
    const  val = await apiCalls.getPOSIndividualData(item?.serviceNo);

    var obj ={
      applicationNo: item?.applicationNo,
      callTypeName : item?.callTypeName,
      subTypeName : item?.subTypeName,
      dob: item?.dob,
      policyNo: item?.policyNo,
      source: item?.source,
      tagName: item?.transectionData,
      isPOS:true,
      serialNo: item.serviceNo
    }
    if(val?.data?.srvReqRefNo){
      setIsLoading(false);
      navigate("/policydetails", { state: obj });
    }
    else{
      setIsLoading(false);
      message.destroy()
      message.error({
        content: val?.item?.responseBody?.errormessage || "Something went wrong please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
   
   // navigate(/emailmanagementview/${item?.emailResponseId}, { state: item });
  }

  const handleForeclosureData=(item)=>{
    // if(item.callTypeName==="" && item.subTypeName===""){

    // }
    navigate(`/foreclosure`,{ state: item});

  }

  const renderTableData = () => {
    return data?.map((value, index) => {
      const formattedDate = moment.utc(value.assignedTo).local().format("DD/MM/YYYY hh:mm A");
      const {
        ticketNo,
        payoutName,
        date,
        policyNo,
        applicationNo,
        callTypeName,
        subTypeName,
        status,
        poName,
        laName,
        policyStatus,
        proposerName,
        sumAssured,
        premiumAmt,
        payoutAmount,
        agentName,
        pinCode,
        pan,
        mobileNo,
        role,
        caseType,
        ageing,
        assignedTo,
        stpFailReason,
        caseStatus,
        tat
      } = value; //destructuring
      return (
        <>
          <tr key={index}>
            {/* <td>{value?.callTypeName !== "Cheque Representation" ?<a className="editIcon"> <i  onClick={() => handleAction(value)} className="bi bi-pencil-square"></i></a>:""}</td> */}
            <td onClick={()=>handleForeclosureData(value)} style={{cursor:"pointer"}}>{ticketNo}</td>
            <td>{policyNo}</td>
            <td>{callTypeName}</td>
            <td>{subTypeName}</td>
            <td>{payoutName}</td>
            <td>{payoutAmount}</td>
            <td>{caseType}</td>
            <td>{ageing}</td>
            <td>{formattedDate}</td>
            <td>{stpFailReason}</td>
            <td>{caseStatus}</td>
            <td>{tat}</td>

{/* 
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
            <td></td>
            <td></td> */}
            {/* <td>{agentName}</td> */}
            {/* <td>{pinCode}</td> */}
            {/* <td>{pan}</td> */}
          </tr>
        </>
      );
    });
  };

  const handleMovetoSearch =()=>{
    navigate("/advancesearch")
  }
  const handleCancel=()=>{
    setIsForeclosureOpen(false);
  }
  return (
    <>
      <div className="main-start">
        <div className="w-94">
          <div className="d-flex justify-content align-center">
          <h6 className="advance-title">POS Payout Dashboard</h6>
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
        <Row gutter={[24]} className="mb-16">
        <Col xs={12} sm={12} md={6} lg={6} xxl={6}>
      <div className="count-box">
      <div className="count count-color">{125}</div>
        <div className="quotes">Open Cases</div>
      </div>
    </Col>
            <Col xs={12} sm={12} md={6} lg={6} xxl={6}>
            <div className="count-box">
            <div className="count count-color1">{25}</div>
        <div className="quotes">Closed Cases</div>
    </div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xxl={6}>
            <div className="count-box">
            <div className="count count-color2">{13}</div>
        <div className="quotes">Escalated Cases</div>
    </div>
            </Col>
             <Col xs={12} sm={12} md={6} lg={6} xxl={6}>
            <div className="count-box">
            <div className="count count-color3">{235}</div>
        <div className="quotes">TAT Today Cases</div>
    </div>
            </Col>
          </Row>


          {/* <Row gutter={[16, 16]} className="mb-16">
        <Col xs={12} sm={12} md={6} lg={6} xxl={6}>
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
                  rules={[
                    {
                      required: true,
                      message: "Select a From Date",
                    },
                  ]}
                >
                  <DatePicker
                    allowClear={false}
                    style={{ width: "100%" }}
                    className="cust-input"
                    format={dateFormat}
                    onChange={(e) => handleDateChange(e)}
                  />
                </Form.Item>
              </div>
    </Col>
            <Col xs={12} sm={12} md={6} lg={6} xxl={6}>
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
                  rules={[
                    {
                      required: true,
                      message: "Select a To Date",
                    },
                  ]}
                >
                  <DatePicker
                    allowClear={false}
                    style={{ width: "100%" }}
                    className="cust-input"
                    format={dateFormat}
                    onChange={(e) => handleDateChange(e)}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xxl={6}>
           
            <Form.Item
    name="policyno"
    label="Policy No"
    className="inputs-label mb-0"
    rules={[
      {
        required: true,
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
             <Col xs={12} sm={12} md={6} lg={6} xxl={6} className="mt-30">
           <div>
           <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit"
                >
                  Search
                </Button>{" "}
           </div>
            </Col>
          </Row> */}
          <div className="advance-page mt-20">
            {/* <div>
              <h6 className="advance-title">Latest Details / Search Results</h6>
            </div> */}
            <div>
             
                <div className="table-container">
                  <table
                    className="responsive-table"
                    style={{ border: "1px solid #ddd" }}
                  >
                    <tbody>
                    <tr> 
                        <th colSpan={1}>Apply Filterss</th>
                        <th colspan="2">
                        <Form.Item
                  label="Payout Name"
                  name="payoutname"
                  className="inputs-label mb-0"
                >
                  <Select
                    showSearch
                    allowClear={true}
                    //onSearch={onSearch}
                    className="cust-input calltype-select"
                    maxLength={100}
                    placeholder="Select Payout Name"
                    options={payoutNameLU}
                    filterOption={[]}
                   // onChange={(value, option) => handleCallTypeChange(value, option)}
                   // disabled={props?.customerData?.isPOS}
                  ></Select>
                </Form.Item>
                            </th>
                         <th colspan="2">
                         <Form.Item
                  label="STP"
                  name="stp"
                  className="inputs-label mb-0"
                >
                  <Select
                    showSearch
                    allowClear={true}
                    //onSearch={onSearch}
                    className="cust-input calltype-select"
                    maxLength={100}
                    placeholder="Select STP"
                    options={STPLU}
                    filterOption={[]}
                   // onChange={(value, option) => handleCallTypeChange(value, option)}
                   // disabled={props?.customerData?.isPOS}
                  ></Select>
                </Form.Item>
                         </th>
                          <th colspan="2">
                          <Form.Item
                  label="Payout Method"
                  name="payoutmethod"
                  className="inputs-label mb-0"
                >
                  <Select
                    showSearch
                    allowClear={true}
                    //onSearch={onSearch}
                    className="cust-input calltype-select"
                    maxLength={100}
                    placeholder="Select Payout Method"
                    options={PayoutMethodLU}
                    filterOption={[]}
                   // onChange={(value, option) => handleCallTypeChange(value, option)}
                   // disabled={props?.customerData?.isPOS}
                  ></Select>
                </Form.Item>
                            </th> 
                          <th colspan="2">
                          <Form.Item
                  label="Payout Amount"
                  name="payoutamount"
                  className="inputs-label mb-0"
                >
                  <Select
                    showSearch
                    allowClear={true}
                    //onSearch={onSearch}
                    className="cust-input calltype-select"
                    maxLength={100}
                    placeholder="Select Payout Amount"
                    options={PayoutAmountLU}
                    filterOption={[]}
                   // onChange={(value, option) => handleCallTypeChange(value, option)}
                   // disabled={props?.customerData?.isPOS}
                  ></Select>
                </Form.Item>
                          </th>
                          <th colspan="3">
                          <Form.Item
                  label="Case Type"
                  name="casetype"
                  className="inputs-label mb-0"
                >
                  <Select
                    showSearch
                    allowClear={true}
                    //onSearch={onSearch}
                    className="cust-input calltype-select"
                    maxLength={100}
                    placeholder="Select Case Type"
                    options={CaseTypeLU}
                    filterOption={[]}
                   // onChange={(value, option) => handleCallTypeChange(value, option)}
                   // disabled={props?.customerData?.isPOS}
                  ></Select>
                </Form.Item>
                            </th> 
                          </tr>
                      <tr>
                        {/* <th>Actions</th> */}
                        <th>Ticket No</th>
                        {/* <th>Call Log Date</th> */}
                        <th>Policy No</th>
                        <th>Call Type</th>
                        <th>Sub Type</th>
                        <th>Payout Name</th>
                        <th>Payout Amount</th>
                        <th>Case Type</th>
                        <th>Ageing</th>
                        <th>Assigned To</th>
                        <th>STP Fail Reason</th>
                        <th>Case Status</th>
                        <th>TAT</th>
                      </tr>
                      {renderTableData()}
                      {data?.length === 0 && (
                        <tr>
                          <td colSpan="12">
                            <div className="text-center">
                              <span>No data available</span>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              
            </div>
          </div>
        </div>
      </div>
      {
        isForeclosureOpen && 
        <Foreclosure isForeclosureOpen={isForeclosureOpen} handleCancel={handleCancel}/>
      }
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
)(POSPayoutDashboard);
