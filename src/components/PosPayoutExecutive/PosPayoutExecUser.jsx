import React, { useEffect, useState } from "react";
import { ForeclosureData } from "../../mainconfig";
import TabComponent from "../../utils/TabComponent";
import apiCalls from "../../api/apiCalls";
import moment from 'moment';
import { NumericFormat } from "react-number-format";
import Widgets from '../Widgets/Widgets';

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
    Select,
    Collapse
} from "antd";
import CloseIcon from "../../assets/images/close-icon.png";
import { useParams, useLocation } from 'react-router-dom';
import PopupAlert from "../popupAlert";
import PosPayoutExeuForm from "./PosPayoutExeuForm";
import { billFreq, POLICYSTATUSLIST, PREMIUMSTATUSLIST } from "../../utils/constantLU";




const PosPayoutExecUser = (props) => {
    const { Panel } = Collapse;

    const [form] = Form.useForm();
    const [RerenderComponent, setRerenderComponent] = useState(true);
    const [data, setData] = useState([]);
    const [BirthdayIcon, setBirthdayIcon] = useState(false);
    const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
    const [navigateTo, setNavigateTo] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertData, setAlertData] = useState("");
    const [alertTitle, setAlertTitle] = useState("");

    const {
        customerData,
        POSContactData,
    } = props;
    const tabs = [
        { title: "Policy Details", key: "1" },
        { title: "Fund Transfer", key: "2" },
        { title: "Payment Details", key: "3" },
        { title: "Bank & PAN Details", key: "4" },
        { title: "POS User Action", key: "5" },
    ];
    const [activeTab, setActiveTab] = useState(tabs[0].key);
    const { state } = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [isPopup, setIsPopup] = useState(false);
    const [isStatusData, setIsStatusData] = useState([]);
    const [isButton, setIsButton] = useState(false);

      const getPremiumStatus = (status, statusList) => {
        if (status) {
          const filteredStatus = statusList?.find(
            (ele) => ele?.descItem === status  
          );
          return filteredStatus?.longDesc || ''; 
        }
        return '';
      };
    const handleTabChange = (key) => {
        setActiveTab(key);
    };
    useEffect(() => {
        // getBoeData()
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

    // const getBoeData = async () => {
    //     setIsLoading(true);
    //     let response = apiCalls.GetServiceRequestForMaturity(state?.ticketNo);
    //     response.then((val) => {
    //         if (val?.data) {
    //             setData(val?.data);
    //         } else {
    //             message.destroy();
    //             message.error({
    //                 content: val?.data?.responseHeader?.message || "Something went wrong please try again!",
    //                 className: "custom-msg",
    //                 duration: 2,
    //             });
    //         }
    //         setIsLoading(false);
    //     }).catch((err) => {
    //         setIsLoading(false);
    //     })
    // }

    const handleRadioChange = (item, e) => {
        if (item.label === "Re-Validate PAN" && e.target.value === 'yes') {
            ForeclosureData?.foreclosurepayment?.KYC_Details?.forEach(element => {
                element.hide = false
            })
            setRerenderComponent(!RerenderComponent);
        }
    };
    useEffect(() => {
        getHeaderParametersData()
      }, [])
    
    
      const getHeaderParametersData = async () => {
        setIsLoading(true);
        let obj = {
          "policyNo": state?.policyNo,
          "applicationNo": '',
          "dob": state?.dob
        }
        const response = await apiCalls.getHeaderParameters(obj);
        if (response?.data?.responseHeader?.issuccess) {
          setData(response?.data?.responseBody);
        }
        else {
          message.destroy()
          message.error({
            content: response?.data?.responseBody?.errormessage || "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
      }



    const customHeader = (
        <>
            <div class="flex-container">
                <span className="headingg gridd flexxx p-0">
                    Policy No : {data?.identifiers?.policyNo}
                    {/* {GetMethodResult("POLICYHEADER")?.response?.data?.responseBody?.identifiers?.policyNo} */}
                    <Tooltip title="NPS Score">
                        <span className="square">5</span>
                    </Tooltip>
                </span>
                <span className="headingg gridd p-0">
                    Application No : {data?.identifiers?.applicationNo}
                    {/* {GetMethodResult("POLICYHEADER")?.responseBody?.identifiers?.applicationNo} */}
                </span>
                <span className="headingg gridd flexxx p-0">
                    LA Name : {data?.identifiers?.la_Name}
                    {/* {GetMethodResult("POLICYHEADER")?.responseBody?.identifiers?.la_Name} */}
                </span>
                <span className="headingg gridd flexxx p-0">
                    {" "}
                    PO Name : {data?.identifiers?.po_Name}
                    {/* {GetMethodResult("POLICYHEADER")?.responseBody?.identifiers?.po_Name} */}
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
            customertype: GetMethodResult("POLICYHEADER")?.data?.planAndStatus?.customerType || "-",
            assignment: GetMethodResult("POLICYHEADER")?.data?.saDetails?.assignment || "N",
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
                "TagValue": convertDate(data?.saDetails?.rcd)
            },
            {
                "Status": "Create",
                "TagName": "APE",
                "TagValue":(data?.searchDetails[0]?.premiumAmt)
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
            Status: "REJECTED",
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
                    setNavigateTo("/pospayoutdashboard");
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
            Status: "APPROVED",
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
                    setNavigateTo("/pospayoutdashboard");
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
    const options = [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' }
    ];

    const handleCheckBox = (checkedValues) => {
        console.log('Checked Values: ', checkedValues);
    };

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
                                                            {" "} 
                                                            {data?.planAndStatus?.customerType }
                                                            
                                                            {/* {GetMethodResult("POLICYHEADER")?.responseBody?.planAndStatus?.customerType || "-"} */}
                                                            {" "} 
                                                        </b>
                                                    </p>
                                                    <p>
                                                        <b>
                                                            {" "}
                                                            {data.planAndStatus?.planName}
                                                          {/* {GetMethodResult("POLICYHEADER")?.responseBody?.planAndStatus?.planName ||
                                                                "-"} */}
                                                                {" "}
                                                        </b>
                                                    </p>
                                                    <p>
                                                        <b>
                                                       {" "} 
                                                       <td>{getPremiumStatus(data?.planAndStatus?.policyStatus, POLICYSTATUSLIST)}</td>
                                                            {/* {GetMethodResult("POLICYHEADER")?.responseBody?.planAndStatus?.policyStatus || "-"} */}
                                                           {" "}
                                                        </b>
                                                    </p>
                                                    <p>
                                                        <b>
                                                            {" "}
                                                            <td>{getPremiumStatus(data?.planAndStatus?.premiumStatus, PREMIUMSTATUSLIST)}</td>
                                                            {/* {getPremiumStatus(data?.planAndStatus?.premiumStatus) ||
                                  "-"}{" "} */}
                                                            {/* {GetMethodResult("POLICYHEADER")?.responseBody?.planAndStatus?.premiumStatus || "-"}*/}
                                                             {" "}
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
                                                        
                                                            {/* {data?.saDetails?.sumAssured} */}
                                                            {/* {(GetMethodResult("POLICYHEADER")?.responseBody?.saDetails?.sumAssured && (
                                                                <NumericFormat
                                                                    value={GetMethodResult("POLICYHEADER")?.responseBody?.saDetails?.sumAssured}
                                                                    decimalSeparator="."
                                                                    displayType={"text"}
                                                                    thousandSeparator={true}
                                                                    decimalScale={0}
                                                                />
                                                            )) ||
                                                                "-"} */}
                                                      
                                                        <b>
                                                            {(data?.saDetails?.sumAssured && (
                                                            <NumericFormat
                                                                value={data?.saDetails?.sumAssured}
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
                                                        <b>
                                                            {data?.saDetails?.pt}
                                                        </b>
                                                    </p>
                                                    <p>
                                                        <b>{convertDate(data?.saDetails?.rcd)}</b>
                                                    </p>
                                                    <p>
                                                    {/* <b>{10}</b> */}
                                                        <b>{data?.saDetails?.assignment || "N"}</b>
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
                                                        {/* <b>
                                                            {/* {(GetMethodResult("POLICYHEADER")?.responseBody?.premiumDetails?.modelPremiumAmount  */}
                                                           {/* { data?.premiumDetails?.modelPremiumAmount} 
                                                                <NumericFormat
                                                                    value={
                                                                        GetMethodResult("POLICYHEADER")?.responseBody?.premiumDetails?.modelPremiumAmount
                                                                    }
                                                                    decimalSeparator="."
                                                                    displayType={"text"}
                                                                    thousandSeparator={true}
                                                                    decimalScale={0}
                                                                /> */}
                                                            {/* )) ||
                                                                "-"} */}
                                                        {/* </b> */} 
                                                        <b>
                                                            {(data?.premiumDetails?.modelPremiumAmount && (
                                                            <NumericFormat
                                                                value={
                                                                data?.premiumDetails?.modelPremiumAmount
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
                                                        <b>{data?.premiumDetails?.ppt }</b>
                                                    </p>
                                                    <p>
                                                        <b>{convertDate(data?.premiumDetails?.ptd) || "-"}</b>
                                                    </p>
                                                    <p>
                                                        <b>{billFreq[data.premiumDetails?.billFreq] || "-"}</b>
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
                                                        <b>{data?.identifiers?.branchName} </b>
                                                    </p>
                                                    <p>
                                                        <b>{data?.salesDetails?.channel} </b>
                                                    </p>
                                                    <p>
                                                        <b>
                                                            {data?.salesDetails?.agentName}
                                                        </b>
                                                    </p>
                                                    <p>
                                                        <b>{data?.salesDetails?.orphanFlag}</b>
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
                        <div className="col-md-2 text-center mt-4">
                            {/* <b>Call Type</b>  */}
                        </div>
                        <div className="col-md-4 mt-4 text-center">

                            {/* <Select
                                showSearch
                                className="cust-input calltype-select w-50"
                                maxLength={100}
                                placeholder="Select Call Type"

                            ></Select> */}
                        </div>
                        <div className="col-md-4 mt-4 text-center">

                            {/* <Select
                                showSearch

                                className="cust-input calltype-select w-50"
                                maxLength={100}
                                placeholder="Select Sub Type"

                            ></Select> */}
                        </div>
                        <div className="col-md-2 mt-4 mb-4">
                            <Widgets />
                        </div>

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
                        <div className="col-md-8 mt-3">
                            {activeTab === "1" && (
                                <>
                                    <form form={form}>
                                        <PosPayoutExeuForm formType="Policy_Details" data={data} handleRadioChange={handleRadioChange} state={state} handleTextLink={handleTextLink}
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
                                                Save
                                            </Button>
                                        </div>
                                    </form>
                                </>
                            )}
                            {activeTab === "2" && (
                                <>
                                    <PosPayoutExeuForm formType="Fund_Transfer" data={data} handleRadioChange={handleRadioChange} state={state}
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
                                            Save
                                        </Button>

                                    </div>
                                </>
                            )}
                            {activeTab === "3" && (
                                <>
                                    {" "}
                                    <PosPayoutExeuForm formType="Payment_Details" data={data} handleRadioChange={handleRadioChange} onBlurInput={onBlurInput} />
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
                                            Save
                                        </Button>

                                    </div>
                                </>
                            )}
                            {activeTab === "4" && (
                                <>
                                    <PosPayoutExeuForm formType="Bank_Details" onBlurInput={onBlurInput} handleRadioChange={handleRadioChange} data={data} />
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
                                            Save
                                        </Button>

                                    </div>
                                </>
                            )}

                            {activeTab === "5" && (
                                <div>
                                    <h6 className="text-red" style={{ textDecoration: 'underline' }}>POS User Action</h6>
                                    <br />
                                    <div className="row">
                                        <div className="col-md-4">
                                            <p><b>Proceed with Fund Transfer</b></p>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Item label="" name="fundTransfer">
                                                <Checkbox.Group
                                                    options={options}
                                                    onChange={handleCheckBox}
                                                />
                                            </Form.Item>
                                        </div>

                                        <div className="col-md-4"></div>

                                        <div className="col-md-4">
                                            <p><b>Proceed with Payout</b></p>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Item label="" name="payout">
                                                <Checkbox.Group
                                                    options={options}
                                                    onChange={handleCheckBox}
                                                />
                                            </Form.Item>
                                        </div>

                                        <div className="col-md-4"></div>
                                        <div className="col-md-4">
                                            <p><b>Raise Requirement</b></p>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Item label="" name="raiseRequirements">
                                                <Checkbox.Group
                                                    options={options}
                                                    onChange={handleCheckBox}
                                                />
                                            </Form.Item>
                                        </div>

                                        <div className="col-md-4"></div>

                                        {/* POS User Remarks */}
                                        <div className="col-md-4">
                                            <p><b>POS User Remarks</b></p>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Item label="" name="remarks">
                                                <Input placeholder="Enter remarks" />
                                            </Form.Item>
                                        </div>

                                        <div className="col-md-4"></div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div
                                        style={{
                                            display: "flex",
                                            width: "100%",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Button type="primary" className="primary-btn mt-4 me-3">
                                            Pass JV-ft
                                        </Button>

                                        <Button type="primary" className="primary-btn mt-4 me-3">
                                            Submit
                                        </Button>

                                        <Button type="primary" className="primary-btn mt-4 me-3">
                                            Raise Requirement
                                        </Button>
                                    </div>
                                </div>
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

export default PosPayoutExecUser;