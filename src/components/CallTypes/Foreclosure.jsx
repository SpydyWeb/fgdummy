import React, { useEffect, useState } from "react";
import { ForeclosureData } from "../../mainconfig";
import TabComponent from "../../utils/TabComponent";
import apiCalls from "../../api/apiCalls";
import { NumericFormat } from "react-number-format";
import moment from 'moment';




import {
  Form,
  Spin,
  Button,
  Checkbox,
  message,
  Modal,
  Steps,
  Input,
  DatePicker,
  Tooltip,
  Collapse
} from "antd";
import ForeclosureForm from "../../utils/InputTextBox";
import CloseIcon from "../../assets/images/close-icon.png";
import { useParams, useLocation } from 'react-router-dom';
// import {} from '../'
import PopupAlert from "../popupAlert";
import { billFreq } from "../../utils/constantLU";



const Foreclosure = (props) => {
  const { Panel } = Collapse;

  const [form] = Form.useForm();
  const [RerenderComponent, setRerenderComponent] = useState(true);
  const [data, setData] = useState([]);
  const [BirthdayIcon, setBirthdayIcon] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [stepOneData, setStepOneData] = useState([]);
const [navigateTo, setNavigateTo] = useState("");
const [showAlert, setShowAlert] = useState(false);
const [alertData, setAlertData] = useState("");
const [alertTitle, setAlertTitle] = useState("");







  const {
    selectedSubType,
    clientRoleLU,
    setSelectedSubType,
    typesForm,
    details,
    customerData,
    POSContactData,
    isForeclosureOpen,
  } = props;
  const tabs = [
    { title: "Case Details", key: "1" },
    { title: "Payment Details", key: "2" },
    { title: "Fund Transfer", key: "3" },
    { title: "KYC Details", key: "4" },
    { title: "Bank Details", key: "5" },
    { title: "Action", key: "6" },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [isStatusData, setIsStatusData] = useState([]);
  const [isButton, setIsButton] = useState(false);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  useEffect(() => {
    getBoeData()
    getRaiseRequirements()
  }, [])

  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, 'YYYYMMDD').format('DD/MM/YYYY');
    return formattedDate;
  };

  const GetMethodResult = (type) => {
    if (data?.maturity?.maturityChecks) {
      const panEnquiryCheck = data?.maturity?.maturityChecks.find(check => check.type === type);
      const panEnquiryResult = JSON.parse(panEnquiryCheck.result);
      return panEnquiryResult;
    }

  }

  const getBoeData = async () => {
    setIsLoading(true);
    let response = apiCalls.GetServiceRequestForMaturity(state?.ticketNo);
    response.then((val) => {
      if (val?.data) {
        setData(val?.data);
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

  const handleRadioChange = (item, e) => {
    if (item.label === "Re-Validate PAN" && e.target.value === 'yes') {
      ForeclosureData?.foreclosurepayment?.KYC_Details?.forEach(element => {
        element.hide = false
      })
      setRerenderComponent(!RerenderComponent);
    }
  };



  const customHeader = (
    <>
      <div class="flex-container">
        <span className="headingg gridd flexxx p-0">
          Policy No : {GetMethodResult("POLICYHEADER")?.responseBody?.identifiers?.policyNo}
          <Tooltip title="NPS Score">
            <span className="square">5</span>
          </Tooltip>
        </span>
        <span className="headingg gridd p-0">
          Application No : {GetMethodResult("POLICYHEADER")?.responseBody?.identifiers?.applicationNo}
        </span>
        <span className="headingg gridd flexxx p-0">
          LA Name : {GetMethodResult("POLICYHEADER")?.responseBody?.identifiers?.la_Name}
        </span>
        <span className="headingg gridd flexxx p-0">
          {" "}
          PO Name : {GetMethodResult("POLICYHEADER")?.responseBody?.identifiers?.po_Name}
          {BirthdayIcon &&

            <Tooltip title={convertDate(props?.policyDetails?.sentDetailsObj?.dob) || "-"}>
              <span className="square">
                <i className="bi bi-cake"></i>
              </span>
            </Tooltip>}
        </span>
      </div>
    </>
  );

  const getRaiseRequirements = () => {
    setIsLoading(true);
    let obj = {
      calltype: 3,
      subtype: 1,
      Role: 0,
    };
    let response = apiCalls.getRaiseRequirements(obj);
    response
      .then((val) => {
        if (val?.data) {
          setRaiseRequerimentList(val?.data);
          setIsLoading(false);
        }

        // else {
        //   setIsLoading(false);
        //   message.error({
        //     content:
        //       val?.data?.responseBody?.errormessage ||
        //       "Something went wrong please try again!",
        //     className: "custom-msg",
        //     duration: 2,
        //   });
        // }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };


  const handleStepOne = () => {
    const formData = form.getFieldValue();
    setActiveTab("2");
  };

  useEffect(() => {
    const initialValues = {
      casestatus: state?.caseStatus,
      customertype: GetMethodResult("POLICYHEADER")?.responseBody?.planAndStatus?.customerType || "-",
      assignment: GetMethodResult("POLICYHEADER")?.responseBody?.saDetails?.assignment || "N",
      childflag: data?.maturity?.isAnyTicketsOpen || '',
      assigneename: data?.maturity?.isAssigned === false ? "" : data?.maturity?.isAssigned,
      clienttype: data?.maturity?.clientType,
      payouttype: state?.callTypeName,
      STP: state?.stpFailReason,
      childstatus: "",
      pan: GetMethodResult("PANENQUIRY")?.responseBody?.panNumber,
      PANValidationResult: GetMethodResult("PANENQUIRY")?.responseBody?.description,
      bankname: GetMethodResult("BANK")?.Bank_Name,
      branchname: GetMethodResult("BANK")?.Bank_Name,
      accountType: GetMethodResult("BANK")?.accountType,
      bankaccountnumber: GetMethodResult("BANK")?.Acc_Number,
      AccoundHolderName: GetMethodResult("BANK")?.Acc_HldrName,
      ifsc: GetMethodResult("BANK")?.Bank_IFSC,
      payoutamount: data?.maturity?.approxMaturityAmount,
      outstandingloan: data?.maturity?.isExistingLoan === false ? "no" : "yes",
      paymentduedate: convertDate(data?.maturity?.maturityDate),
      pennydropresult: data?.maturity?.isValidPennyDrop ? "Invalid Input" : ''

    };






    form.setFieldsValue(initialValues);

  }, [data]); // Update when data changes



  const CheckPANdetails = () => {
    let values = form.getFieldsValue();
    setIsLoading(true);
    //CKYCNumber
    let response = apiCalls.getCheckPANdetails(values?.enterpan,customerData?.policyNo);
    response
      .then((val) => {
        if (val?.data) {
          const res = val?.data?.responseBody;
          form.setFieldsValue({
            nameonpan: res?.nameoncard,
            enterpan: res?.panNumber
          })
          setIsLoading(false);

        }
      })
      .catch((err) => {
        setIsLoading(false);

      });
  }


  const GetPolicyOpenServiceData = () => {
    setIsLoading(true);
    let response = apiCalls.getPolicyOpenServiceRequests(state?.policyNo);
    response
      .then((val) => {
        if (val?.data) {
          const res = val?.data;
          setIsStatusData(res);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }
  const getTransectionData = (formData) => {
    let TransactionPayload = [
      {
        "Status": "Create",
        "TagName": "casestatus",
        "TagValue": formData.casestatus
      },
      {
        "Status": "Create",
        "TagName": "RCD",
        "TagValue": convertDate(GetMethodResult("POLICYHEADER")?.responseBody?.saDetails?.rcd)
      },
      {
        "Status": "Create",
        "TagName": "APE",
        "TagValue": GetMethodResult("POLICYDETAILS")?.responseBody?.searchDetails[0]?.premiumAmt
      },
      {
        "Status": "Create",
        "TagName": "CustomerType",
        "TagValue": formData?.customertype
      },
      {
        "Status": "Create",
        "TagName": "assignment",
        "TagValue": formData?.assignment
      },
      {
        "Status": "Create",
        "TagName": "assigneename",
        "TagValue": formData?.assigneename
      },
      {
        "Status": "Create",
        "TagName": "clienttype",
        "TagValue": formData?.clienttype
      },
      {
        "Status": "Create",
        "TagName": "payouttype",
        "TagValue": formData?.payouttype
      },
      {
        "Status": "Create",
        "TagName": "requestfor",
        "TagValue": "requestfor"
      },
      {
        "Status": "Create",
        "TagName": "STP",
        "TagValue": "STP"
      },
      {
        "Status": "Create",
        "TagName": "childflag",
        "TagValue": formData?.childflag
      },
      {
        "Status": "Create",
        "TagName": "personaldetailschange",
        "TagValue": formData?.personaldetailschange
      },
      {
        "Status": "Create",
        "TagName": "PaymentMode",
        "TagValue": formData?.paymentmethod == "cheque" ? "C" : "B"
      },
      {
        "Status": "Create",
        "TagName": "paymentduedate",
        "TagValue": formData?.paymentduedate
      },
      {
        "Status": "Create",
        "TagName": "tdsrate",
        "TagValue": formData?.tdsrate
      },
      {
        "Status": "Create",
        "TagName": "tdsrate",
        "TagValue": formData?.tdsamount
      },
      {
        "Status": "Create",
        "TagName": "outstandingloan",
        "TagValue": formData?.outstandingloan
      },
      {
        "Status": "Create",
        "TagName": "outstandingloanamount",
        "TagValue": formData?.outstandingloanamount
      },
      {
        "Status": "Create",
        "TagName": "PayableAmount",
        "TagValue": formData?.payoutamount
      },
      {
        "Status": "Create",
        "TagName": "paymentduedate",
        "TagValue": formData?.paymentduedate
      },
      {
        "Status": "Create",
        "TagName": "fundtransferto",
        "TagValue": formData?.fundtransferto
      },
      {
        "Status": "Create",
        "TagName": "FundTransferAmount",
        "TagValue": formData?.fundtransferamount
      },
      {
        "Status": "Create",
        "TagName": "relationtoftpolicy",
        "TagValue": formData?.relationtoftpolicy
      },
      {
        "Status": "Create",
        "TagName": "nameofftpolicyowner",
        "TagValue": formData?.nameofftpolicyowner
      },
      {
        "Status": "Create",
        "TagName": "PANNumber",
        "TagValue": formData?.pan
      },
      {
        "Status": "Create",
        "TagName": "PANValidationResult",
        "TagValue": formData?.PANValidationResult
      },
      {
        "Status": "Create",
        "TagName": "revalidatepan",
        "TagValue": formData?.revalidatepan
      },
      {
        "Status": "Create",
        "TagName": "enterpan",
        "TagValue": formData?.enterpan
      },
      {
        "Status": "Create",
        "TagName": "nameonpan",
        "TagValue": formData?.nameonpan
      },
      {
        "Status": "Create",
        "TagName": "namematch",
        "TagValue": formData?.namematch
      },
      {
        "Status": "Create",
        "TagName": "BankName",
        "TagValue": formData?.bankname
      },
      {
        "Status": "Create",
        "TagName": "NameAsMentionedInTheBank",
        "TagValue": formData?.AccoundHolderName
      },
      {
        "Status": "Create",
        "TagName": "BankIFSC",
        "TagValue": formData?.ifsc
      },
      {
        "Status": "Create",
        "TagName": "BranchName",
        "TagValue": formData?.branchname
      },
       {
        "Status": "Create",
        "TagName": "accountType",
        "TagValue": formData?.accountType
      },
      {
        "Status": "Create",
        "TagName": "BankAccountNumber",
        "TagValue": formData?.bankaccountnumber
      },
      {
        "Status": "Create",
        "TagName": "InitiatePennyDrop",
        "TagValue": formData?.pennydropresult
      },
    ]
    return TransactionPayload;
  }
  const handleReq = () => {
    setIsButton(true)
    const formData = form.getFieldValue();
    let seletedRequerimentList = raiseRequerimentList
    ?.filter((e) => e.status === true)
    ?.map((e) => e.raiseReqId);
    let obj = {
      TransectionId: 1,
      SrvReqRefNo: state?.ticketNo,
      Status:"REJECTED",
      RequirementList: seletedRequerimentList,
      Comments: "",
      TransactionPayload: getTransectionData(formData)
    };
    //  if(isShowPOSScreen){
    //   let reqFormValues = requirementsForm?.getFieldsValue();
    // obj.TransactionPayload.push({
    //     "Status": "Create",
    //     "TagName": "PosOtherReq",
    //     "TagValue": reqFormValues?.PosOtherReq || ""
    //   });
    // }
    setIsLoading(true);
    let response = apiCalls.POSActionsOnContactDetails(obj);
    response
      .then((val) => {
        if (val?.data) {
          setAlertTitle(`${val?.data?.message}`);
          setNavigateTo( "/pospayoutdashboard");
         setAlertData(`${"Ticket No " + val?.data?.srvReqRefNo}`);
         setShowAlert(true);
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

  }

  const handleSubmit = () => {
    const formData = form.getFieldValue();
    let seletedRequerimentList = raiseRequerimentList
    ?.filter((e) => e.status === true)
    ?.map((e) => e.raiseReqId);
    let obj = {
      TransectionId: 1,
      SrvReqRefNo: state?.ticketNo,
      Status:"APPROVED",
      RequirementList: seletedRequerimentList,
      Comments: "",
      TransactionPayload: getTransectionData(formData)
    };
    setIsLoading(true);
    let response = apiCalls.POSActionsOnContactDetails(obj);
    response
      .then((val) => {
        if (val?.data) {
          setAlertTitle(`${val?.data?.message}`);
          setNavigateTo( "/pospayoutdashboard");
         setAlertData(`${"Ticket No " + val?.data?.srvReqRefNo}`);
         setShowAlert(true);
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
  }
  const onBlurInput = (value, item) => {
    if (item.name === "enterpan" && value.length === 10) {
      CheckPANdetails()
    }
  }



  const handleTextLink = (item) => {
    if (item.name === "childstatus") {
      setIsPopup(true)
      GetPolicyOpenServiceData();
    }
  }

  return (
    <Spin spinning={isLoading}>
      <Form form={form} >
        <div className="main-start-revivaldgh">
          <div>
            <Collapse
              accordion
              expandIconPosition={"end"}
              className="accordian customer acc1"
              defaultActiveKey={["1"]}
            >
              <Panel
                header={customHeader}
                key="1"
                className="fs-16 fw-500 mb-10"
              >
                <div className="">
                  <div className="flex-container">
                    <section className="grid">
                      <div className="left-half">
                        <article>
                          <p>Customer Type</p>
                          <p>Plan Name</p>
                          <p>Policy Status</p>
                          <p>Premium Status</p>
                        </article>
                      </div>
                      <div className="right-half">
                        <article>
                          <p>
                            <b>
                              {GetMethodResult("POLICYHEADER")?.responseBody?.planAndStatus?.customerType || "-"}{" "}
                            </b>
                          </p>
                          <p>
                            <b>
                              {" "}
                              {GetMethodResult("POLICYHEADER")?.responseBody?.planAndStatus?.planName ||
                                "-"}{" "}
                            </b>
                          </p>
                          <p>
                            <b>
                              {" "}

                              {GetMethodResult("POLICYHEADER")?.responseBody?.planAndStatus?.policyStatus || "-"}{" "}
                            </b>
                          </p>
                          <p>
                            <b>
                              {" "}
                              {/* {getPremiumStatus(data?.planAndStatus?.premiumStatus) ||
                                  "-"}{" "} */}
                              {GetMethodResult("POLICYHEADER")?.responseBody?.planAndStatus?.premiumStatus || "-"}{" "}
                            </b>
                          </p>

                        </article>
                      </div>
                    </section>
                    <section className="grid">
                      <div className="left-half">
                        <article>
                          <p>Sum Assured</p>
                          <p>PT</p>
                          <p>RCD</p>
                          <p>Assignment</p>
                        </article>
                      </div>
                      <div className="right-half">
                        <article>
                          <p>
                            <b>
                              {(GetMethodResult("POLICYHEADER")?.responseBody?.saDetails?.sumAssured && (
                                <NumericFormat
                                  value={GetMethodResult("POLICYHEADER")?.responseBody?.saDetails?.sumAssured}
                                  decimalSeparator="."
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  decimalScale={0}
                                />
                              )) ||
                                "-"}
                            </b>
                          </p>
                          <p>
                            <b>{GetMethodResult("POLICYHEADER")?.responseBody?.saDetails?.pt || "-"}</b>
                          </p>
                          <p>
                            <b>{convertDate(GetMethodResult("POLICYHEADER")?.responseBody?.saDetails?.rcd) || "-"}</b>
                          </p>
                          <p>
                            <b>{GetMethodResult("POLICYHEADER")?.responseBody?.saDetails?.assignment || "N"}</b>
                          </p>
                        </article>
                      </div>
                    </section>
                    <section className="grid">
                      <div className="left-half">
                        <article>
                          <p>Premium Amount</p>
                          <p>PPT</p>
                          <p>PTD</p>
                          <p>Mode</p>
                        </article>
                      </div>
                      <div className="right-half">
                        <article>
                          <p>
                            <b>
                              {(GetMethodResult("POLICYHEADER")?.responseBody?.premiumDetails?.modelPremiumAmount && (
                                <NumericFormat
                                  value={
                                    GetMethodResult("POLICYHEADER")?.responseBody?.premiumDetails?.modelPremiumAmount
                                  }
                                  decimalSeparator="."
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  decimalScale={0}
                                />
                              )) ||
                                "-"}
                            </b>
                          </p>
                          <p>
                            <b>{GetMethodResult("POLICYHEADER")?.responseBody?.premiumDetails?.ppt || "-"}</b>
                          </p>
                          <p>
                            <b>{convertDate(GetMethodResult("POLICYHEADER")?.responseBody?.premiumDetails?.ptd) || "-"}</b>
                          </p>
                          <p>
                            <b>{billFreq[GetMethodResult("POLICYHEADER")?.responseBody?.premiumDetails?.billFreq] || "-"}</b>
                          </p>
                        </article>
                      </div>
                    </section>
                    <section className="grid">
                      <div className="left-half">
                        <article>
                          <p>Branch</p>
                          <p>Channel</p>
                          <p>Agent Name</p>
                          <p>Orphan Flag</p>
                        </article>
                      </div>
                      <div className="right-half">
                        <article>
                          <p>
                            <b>{GetMethodResult("POLICYHEADER")?.responseBody?.identifiers?.branchName || "-"} </b>
                          </p>
                          <p>
                            <b>{GetMethodResult("POLICYHEADER")?.responseBody?.salesDetails?.channel || "-"} </b>
                          </p>
                          <p>
                            <b>
                              {GetMethodResult("POLICYHEADER")?.responseBody?.salesDetails?.agentName || "-"}
                            </b>
                          </p>
                          <p>
                            <b>{GetMethodResult("POLICYHEADER")?.responseBody?.salesDetails?.orphanFlag || "-"}</b>
                          </p>
                        </article>
                      </div>
                    </section>
                  </div>
                </div>
              </Panel>
            </Collapse>
          </div>

          <div className="row">
            <div className="col-md-2 mt-3">
              <TabComponent
                tabs={tabs}
                activeTab={activeTab}
                handleTabChange={handleTabChange}
                tabPosition="left"
              />
            </div>
            <div className="col-md-10 mt-3">
              {activeTab === "1" && (
                <>
                  <form form={form}>
                    <ForeclosureForm formType="Case_Details" data={data} handleRadioChange={handleRadioChange} state={state} handleTextLink={handleTextLink}
                      onBlurInput={onBlurInput}
                    />
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        type="primary"
                        className="primary-btn mt-4 me-3"
                        htmlType="submit"
                        onClick={() => handleStepOne()}
                      >
                        Next
                      </Button>
                    </div>
                  </form>
                </>
              )}
              {activeTab === "2" && (
                <>
                  <ForeclosureForm formType="Payment_Details" data={data} handleRadioChange={handleRadioChange} state={state}
                    onBlurInput={onBlurInput}
                  />
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      type="primary"
                      className="primary-btn mt-4 me-3"
                      onClick={() => setActiveTab("1")}
                    >
                      Previous
                    </Button>
                    <Button
                      type="primary"
                      className="primary-btn mt-4 me-3"
                      htmlType="submit"
                      onClick={() => setActiveTab("3")}
                    >
                      Next
                    </Button>
                  </div>
                </>
              )}
              {activeTab === "3" && (
                <>
                  {" "}
                  <ForeclosureForm formType="Fund_Transfer" data={data} handleRadioChange={handleRadioChange} onBlurInput={onBlurInput} />
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      type="primary"
                      className="primary-btn mt-4 me-3"
                      onClick={() => setActiveTab("2")}
                    >
                      Previous
                    </Button>
                    <Button
                      type="primary"
                      className="primary-btn mt-4 me-3"
                      htmlType="submit"
                      onClick={() => setActiveTab("4")}
                    >
                      Next
                    </Button>
                  </div>
                </>
              )}
              {activeTab === "4" && (
                <>
                  <ForeclosureForm formType="KYC_Details" onBlurInput={onBlurInput} handleRadioChange={handleRadioChange} data={data} />
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      type="primary"
                      className="primary-btn mt-4 me-3"
                      onClick={() => setActiveTab("3")}
                    >
                      Previous
                    </Button>
                    <Button
                      type="primary"
                      className="primary-btn mt-4 me-3"
                      htmlType="submit"
                      onClick={() => setActiveTab("5")}
                    >
                      Next
                    </Button>
                  </div>
                </>
              )}
              {activeTab === "5" && (
                <>
                  <ForeclosureForm formType="Bank_Details" data={data} handleRadioChange={handleRadioChange} onBlurInput={onBlurInput} />
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      type="primary"
                      className="primary-btn mt-4 me-3"
                      onClick={() => setActiveTab("4")}
                    >
                      Previous
                    </Button>
                    <Button
                      type="primary"
                      className="primary-btn mt-4 me-3"
                      htmlType="submit"
                      onClick={() => setActiveTab("6")}
                    >
                      Next
                    </Button>
                  </div>
                </>
              )}
              {activeTab === "6" && (
                <>
                  <div className="reuirement">
                    <table className="responsive-table">
                      <thead>
                        <tr>
                          <th>Sr No</th>
                          <th>Description</th>
                          <th className="z-index">Select</th>
                        </tr></thead>
                      <tbody>
                        {raiseRequerimentList?.length > 0 && raiseRequerimentList?.map((item, ind) => (
                          <tr key={ind + 1}>
                            <td>{ind + 1}</td>

                            <td>{item.raiseReqDesc}</td>
                            <td>
                              {" "}
                              <Checkbox
                                type="checkbox"
                                onChange={(e) => (item.status = e.target.checked)}
                              />
                            </td>
                          </tr>
                        ))}
                        {raiseRequerimentList?.length === 0 && (
                          <tr>
                            <td colspan="13">
                              <div className="text-center">
                                <span>No data available</span>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      type="primary"
                      className="primary-btn mt-4 me-3"
                      onClick={() => setActiveTab("5")}
                    >
                      Previous
                    </Button>
                    <Button
                      type="primary"
                      className="primary-btn mt-4 me-3"
                      htmlType="submit"
                      disabled={isButton}
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                    <Button
                      type="primary"
                      className="primary-btn mt-4 me-3"
                      htmlType="submit"
                      onClick={handleReq}
                    >
                      Raise Requirement
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <Modal
          title="List of Tickets Pending Data"
          open={isPopup}
          destroyOnClose={true}
          width={800}
          closeIcon={
            <Tooltip title="Close">
              <span onClick={() => setIsPopup(false)}>
                <img src={CloseIcon} alt=""></img>
              </span>
            </Tooltip>
          }
          footer={null}
        >
          <div className="reuirement">
            <table className="responsive-table">
              <tr>
                <th>srvReqID</th>
                <th>policyRef</th>
                <th>srvReqRefNo</th>
                <th>userName</th>
              </tr>

              {
                isStatusData?.length > 0 ? isStatusData.map((item, index) => {
                  return <tr key={index}>
                    <td>{item.srvReqID}</td>
                    <td>{item.policyRef}</td>
                    <td>{item.srvReqRefNo}</td>
                    <td>{item.userName}</td>
                  </tr>
                })
                  : <tr>
                    <td>No Data Available</td>
                  </tr>
              }

            </table>

            <div className="contact-details-btn">
              <Button
                type="primary"
                className="primary-btn"
                onClick={() => setIsPopup(false)}
              >
                Ok
              </Button>
            </div>
          </div>
        </Modal>
      </Form>
      {showAlert && (
        <PopupAlert
          alertData={alertData}
          title={alertTitle}
          getAdvance={props.getAdvance}
          navigate={navigateTo}
          setShowAlert={setShowAlert}
        ></PopupAlert>
      )}
    </Spin>
  );
};

export default Foreclosure;