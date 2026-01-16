import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Row,
  Col,
  Select,
  Alert,
  Spin,
  Modal,
  Button,
  message,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill-new";
import apiCalls from "../../api/apiCalls";
import { connect, useSelector } from "react-redux";
import ContactDetails from "./ContactDetails";
import PaymentRelated from "./paymentRelated";
import ServicingDocuments from "./servicingDocuments";
import Surrender from "./surrender";
import SurrenderV2 from "./SurrenderV2";
import BankDetails from "./bankDetails";
import Revival from "./revival";
import LoanPolicy from "./loanPolicy";
import GeneralInformation from "./generalInformation";
import CallRelated from "./callRelated";
import CustomerPortal from "./customerPortal";
import Website from "./website";
import ContractAlteration from "./contractAlteration";
import Nomination from "./nomination";
import ProductRelated from "./productRelated";
import OPSInitiative from "./opsInitiative";
import FreeLook from "./freeLook";
import PolicyBond from "./PolicyBond";
import ProcessEnquiry from "./ProcessEnquiry";
import PartialWithdrawal from "./partialWithdrawal";
import MedicalAppointment from "./MedicalAppointment";
import Assignment from "./Assignment";
import ULIPCallType from "./ULIPCallType";
import PaymentReProcessing from "./PaymentReProcessing";
import PotentialComplaint from "./PotentialComplaint";
import ChequeRepresentation from "./ChequeRepresentation";
import OutBoundCall from "./OutBoundCall";
import Refund from "./Refund";
import Annuity from "./annuity";
import { useNavigate } from "react-router-dom";
import SurvivalBenefit from "./SurvivalBenefit";
import FundTransfer from "./FundTransfer";
import Claims from "./Claims";
import RenewalRelated from "./RenewalRelated";
import InquiryPolicy from "./InquiryPolicy";

const TypesComponent = (props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const loggedUser = useSelector((state) => state?.userProfileInfo?.profileObj);
  const {
    CALL_TyPES,
    masterData,
    clientRoleLU,
    requestModeLU,
    bankAccTypeLU,
    requestReceivedViaLU,
    cursorPortalLU,
    websitePortalLU,
    callRelatedActionLU,
    customerQueryLU,
    panUpdateLU,
    processNameLU,
    sisLU,
    isVerifiedCheck,
    setPosData,
    interlRequirementTagValue,
    annuityPlans,
    causeOfEventLU,
    natureOfDeathLU,
    policyTypeLU,
    claimCategoryLU,
    claimIntimationLU,
    sourceInformationLU,
    assuredIncomePlanLU,
    uwDecisionLU,
    isEmailManagement,
    laNomineeAddressLU,
    subStageLU,
    assessorsDecisionLU,
    policyStatusDOBLU,
    approverDecisionLU,
    isPolicyAssigned,
    mandStatusLU,
    martialStatusLU,
    salutationLU,
    registerModeLU,
    paymentReasonCodeLU,
    coverageNameofProductLU,
    claimPaymentMethodLU,
    organCategoryCodeLU,
    healthClaimCodeLU,
    uwDecisionNewLU,
    customerData,
  } = props;
  const [selectedCallType, setSelectedCallType] = useState("");
  const [selectedSubTypeId, setSelectedSubTypeId] = useState("");
  const [selectedSubType, setSelectedSubType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [subTypeLU, setSubTypeLU] = useState(null);
  const [SelectedSubTypeVal, setSelectedSubTypeVal] = useState(null);
  const [ActiveEmailResponseId, setActiveEmailResponseId] = useState("");
  const [POSContactData, setPOSContactData] = useState({});
  const [duDupeData, setDuDupeData] = useState([]);
  const [ShowEmailTemplate, setShowEmailTemplate] = useState(false);
  const [EmailFromCustomer, setEmailFromCustomer] = useState("");
  const [clientEnquiryData, setClientEnquiryData] = useState("");
  const [isShowEmailMobileModal, setIsShowEmailMobileModal] = useState(false);
  const [isEmailMobileNoMessage, setIsEmailMobileNoMessage] = useState("");

  const shouldLog = useRef(true);
  useEffect(() => {
    if (props?.isEmailManagement) {
      setSelectedCallType(props?.CallTypeId);
      setSelectedSubType(props?.SubTypeId);
      subTypeDropdown(props?.CallTypeId, props?.SubTypeId, masterData);
    }
  }, [props?.CallTypeId, props?.SubTypeId]);
  useEffect(() => {
    //getRequestSource();
    if (shouldLog.current) {
      shouldLog.current = false;
      if (props?.isEmailManagement) {
        // setSelectedCallType(props?.CallTypeId);
        // subTypeDropdown(props?.CallTypeId,props?.SubTypeId,masterData);
        // setSelectedCallType(1);
        // subTypeDropdown(1,2,masterData);
      } else if (props?.isShowAllTicketsData) {
        // setSelectedCallType(props?.CallTypeId);
        // subTypeDropdown(props?.CallTypeId,props?.SubTypeId,masterData);
        getPOSIndividualData(masterData);
      } else if (
        masterData &&
        customerData?.serialNo &&
        (customerData?.isPOS || loggedUser?.boe)
      ) {
        getPOSIndividualData(masterData);
      } else if (customerData?.policyNo && loggedUser?.boe) {
        GetServiceRequestByPolicy(customerData?.policyNo);
      }
      // else if(loggedUser?.role === 14){
      //   getAdvance();
      // }
    }
    if (loggedUser?.role === 14) {
      getAdvance();
    }
  }, [isVerifiedCheck]);
  const GetServiceRequestByPolicy = async (policyNumber) => {
    setIsLoading(true);
    const val = await apiCalls.GetServiceRequestByPolicy(
      policyNumber,
      loggedUser.userName
    );
    if (val?.data) {
      setIsLoading(false);
if(val.data.length>0)
      setPosData({dmsLink:val?.data.flat()});
    
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
  };

  const getAdvance = () => {
    if (selectedSubType === "revivalquotation") {
      setSelectedSubType("revivalwithdgh");
      setSelectedSubTypeVal("revivalwithdgh");
      props?.setSelectedSubTypeVall("Revival With DGH");
      props?.setSubTypeId(1);
      form.setFieldsValue({ subType: 1 });
    } else {
      setSelectedCallType("");
      setSelectedSubType("");
      form.resetFields();
      setSelectedSubTypeVal([]);
      setSubTypeLU([]);

      if (Object.keys(POSContactData).length != 0) {
        navigate("/posexec");
      }
    }
  };

  const viewEmail = (val) => {
    let obj = {
      EmailResponseId: Number(val),
    };
    let response = apiCalls.GetEmailResponseDtls(obj);
    response
      .then((val) => {
        setShowEmailTemplate(true);
        if (val?.data?.emailClassify[0]) {
          let res = val?.data?.emailClassify[0];
          setEmailFromCustomer(res.body);
          setIsLoading(false);
          // let toRecipients = res?.from ? res?.from : '';
          // let ccRecipients = res?.ccRecipients ? res?.ccRecipients: '';

          //   form.setFieldsValue({
          //     from:toRecipients,
          //     cc:ccRecipients,
          //      subject:res?.subject,
          //      ReceivedDateTime:res.receivedDateTime
          //   })
        } else {
          message.destroy();
          message.error({
            content:
              val?.data?.responseHeader?.message ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
          setIsLoading(false);
        }
      })
      .catch((err) => {});
  };

  const getPOSIndividualData = async (masterData) => {
    setIsLoading(true);
    const val = await apiCalls.getPOSIndividualData(
      props?.customerData?.serialNo || props?.isSelectedTicketsData?.serviceNo
    );
    if (val?.data) {
      if (val?.data?.serviceRequestTransectionData) {
        val?.data?.serviceRequestTransectionData?.forEach((ele) => {
          if (ele.tagName === "EmailResponseId") {
            setActiveEmailResponseId(ele.tagValue);
          }
        });
      }
      setIsLoading(false);
      setPOSContactData(val?.data);
      setPosData(val?.data);
      setSelectedCallType(val?.data?.callType);
      subTypeDropdown(val?.data?.callType, val?.data?.subType, masterData);
      setDuDupeData(
        val?.data?.deDupPayload?.length > 0
          ? val?.data?.deDupPayload[0]?.deDupPayload[0]?.ResponseBody
              ?.ClientDetails
          : []
      );
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
  };

  const subTypeDropdown = async (value, subType, allData) => {
    let SUB_TYP =
      masterData?.length > 0
        ? masterData?.filter((ele) => ele.key === "SUB_TYP")
        : allData?.filter((ele) => ele.key === "SUB_TYP");
    let data = SUB_TYP[0]?.value?.filter((ele) => ele?.mstParentID === value);
    let transformedData = data?.map((item) => ({
      ...item,
      label: item.mstDesc,
      value: item.mstID,
    }));
    setSubTypeLU(transformedData);
    if (
      props?.customerData?.isPOS ||
      props?.isEmailManagement ||
      props?.isShowAllTicketsData ||
      props?.customerData?.isBOE
    ) {
      form.setFieldsValue({ callType: value, subType: subType });
      handleSubTypeChange(subType, transformedData);
    }
  };

  const handleCallTypeChange = (value, obj) => {
    props?.setSelectedSubTypeVall("");
    // if(loggedUser?.role == 14&&!isVerifiedCheck){  //comment by nagaraju-18-03-204
    //   props?.setCallTypeId(value);
    //   setSelectedCallType(value)
    //   return;
    // }
    if (obj.isCallType) {
      props?.setCallTypeId(obj.mstID);
      setSelectedCallType(obj.mstID);
      form.setFieldsValue({ subType: null });
      setSubTypeLU(null);
      setSelectedSubType(null);
      subTypeDropdown(obj.mstID);
    } else {
      let CALL_TYP =
        masterData?.length > 0
          ? masterData?.filter((ele) => ele.key === "CALL_TYP")
          : "";
      let SUB_TYP =
        masterData?.length > 0
          ? masterData?.filter((ele) => ele.key === "SUB_TYP")
          : "";
      let transformedData = SUB_TYP[0]?.value
        .filter((ele) => ele.mstParentID === obj.mstParentID)
        .map((ele) => ({
          ...ele,
          label: ele.mstDesc,
          value: ele.mstID,
        }));
      setSubTypeLU(transformedData);
      let slectedCALL_TYP = CALL_TYP[0].value?.find((ele) => {
        return ele.mstID === obj.mstParentID;
      });
      props?.setCallTypeId(+slectedCALL_TYP?.mstID);
      setSelectedCallType(+slectedCALL_TYP?.mstID);
      // subTypeDropdown(obj.mstParentID);
      setSelectedSubTypeId(obj?.mstID);
      props?.setSubTypeId(obj.mstID);
      transformedData?.map((key, index) => {
        if (key.mstID === obj?.mstID) {
          const modifiedDesc = key.mstDesc?.replace(/[^\w]/g, "").toLowerCase();
          setSelectedSubType(modifiedDesc);
          setSelectedSubTypeVal(key.mstDesc);
          props?.setSelectedSubTypeVall(key.mstDesc);
        }
      });

      form.setFieldsValue({
        callType: slectedCALL_TYP?.mstDesc,
        subType: obj?.mstID,
      });
      getClientEnquiry();
    }
  };
  const handleSubTypeChange = (value, getSubLU) => {
    props?.setSubTypeId(value);
    // if(loggedUser?.role == 14&&!isVerifiedCheck){ //comment by nagaraju-18-03-204
    //   setSelectedSubTypeId(value);
    //   setSelectedSubType("verificationnotcompleted")
    // }else {
    setSelectedSubTypeId(value);
    let subTypeData = subTypeLU?.length > 0 ? subTypeLU : getSubLU;
    subTypeData?.map((key, index) => {
      if (key.mstID === value) {
        const modifiedDesc = key.mstDesc?.replace(/[^\w]/g, "").toLowerCase();
        setSelectedSubType(modifiedDesc);
        setSelectedSubTypeVal(key.mstDesc);
        props?.setSelectedSubTypeVall(key.mstDesc);
      }
    });
    //}
    getClientEnquiry();
  };
  const getClientEnquiry = async (e) => {
    setIsLoading(true);
    setIsShowEmailMobileModal(false);

    let obj = {
      clientNumber:
        props?.customerData?.poClientID ||
        props?.policyDetails?.policyDetailsObj?.identifiers?.po_ClientID,
    };
    let empID =
      loggedUser?.allRoles[0]?.employeeID;

    try {
      let response = await apiCalls.getClientEnquiry(obj, empID);

      if (response?.data) {
        setIsLoading(false);
        setClientEnquiryData(response?.data?.responseBody);
        const res = response?.data?.responseBody;

        if (res.errorcode === "1") {
          setIsShowEmailMobileModal(true);
          setIsEmailMobileNoMessage(
            "Client Enquiry Failure Reason: " + res.errormessage
          );
        } else if (!res?.rmblphone && !res?.rinternet) {
          setIsShowEmailMobileModal(true);
          setIsEmailMobileNoMessage(
            "Email ID and Mobile Number not registered under this policy!"
          );
        } else if (!res?.rmblphone) {
          setIsShowEmailMobileModal(true);
          setIsEmailMobileNoMessage(
            "Mobile Number not registered under this policy!"
          );
        } else if (!res?.rinternet) {
          setIsShowEmailMobileModal(true);
          setIsEmailMobileNoMessage(
            "Email ID not registered under this policy!"
          );
        }
      } else {
        setIsLoading(false);
        message.error({
          content:
            response?.data?.responseBody?.errormessage ||
            "Something went wrong please try again!",
          className: "custom-msg",
          duration: 2,
        });
      }
    } catch (err) {
      setIsLoading(false);
      // You can also log the error or show a message to the user if needed
      console.error("An error occurred:", err);
    }
  };

  const changeSubType = (e) => {};

  const onSearch = (e) => {};
  const handleOk = () => {};
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <Spin spinning={isLoading}>
        <div
          className={
            props?.isEmailManagement || props?.isComplaintsUserTabs
              ? "section-border"
              : "section-border w-78"
          }
        >
          <div className="bg-yelloww ">
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
              autoComplete="off"
            >
              <Row gutter={[16, 16]} className="grid-box bg-yellow">
                <Col className="m-10" xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <Form.Item
                    label="Call Type"
                    name="callType"
                    className="inputs-label mb-0"
                  >
                    <Select
                      showSearch
                      onSearch={onSearch}
                      className="cust-input calltype-select"
                      maxLength={100}
                      placeholder="Select Call Type"
                      // options={loggedUser?.role == 14&&!isVerifiedCheck? callCenterLU : CALL_TyPES}  //comment by nagaraju-18-03-204
                      options={CALL_TyPES}
                      filterOption={filterOption}
                      onChange={(value, option) =>
                        handleCallTypeChange(value, option)
                      }
                      disabled={
                        props?.customerData?.isPOS ||
                        props?.customerData?.isClaimsPrimaryAssesment ||
                        props?.customerData?.isClaimsNotification ||
                        props?.customerData?.isClaimsAssessmentChecker
                      }
                    ></Select>
                  </Form.Item>
                </Col>
                <Col className="m-10" xs={24} sm={24} md={11} lg={11} xxl={11}>
                  <Form.Item
                    label="Sub Type"
                    name="subType"
                    className="inputs-label mb-0 subtype right-colsize"
                  >
                    <Select
                      showSearch
                      onSearch={onSearch}
                      className="cust-input calltype-select"
                      maxLength={100}
                      placeholder="Select Sub Type"
                      // options={loggedUser?.role == 14&&!isVerifiedCheck? callCenterSubTypeLU : subTypeLU}  //comment by nagaraju-18-03-204
                      options={subTypeLU}
                      filterOption={filterOption}
                      onChange={(e) => {
                        handleSubTypeChange(e);
                      }}
                      disabled={
                        props?.customerData?.isPOS ||
                        props?.customerData?.isClaimsPrimaryAssesment ||
                        props?.customerData?.isClaimsNotification ||
                        props?.customerData?.isClaimsAssessmentChecker
                      }
                    ></Select>
                  </Form.Item>
                </Col>
                <Col className="m-10" xs={24} sm={24} md={1} lg={1} xxl={1}>
                  {ActiveEmailResponseId && (
                    <a
                      className="hyperLink"
                      onClick={() => viewEmail(ActiveEmailResponseId)}
                    >
                      {" "}
                      <InboxOutlined
                        style={{ fontSize: "22px", color: "#b31b24" }}
                      />
                    </a>
                  )}
                </Col>
              </Row>
            </Form>
          </div>

          {selectedSubType && (
            <>
              <div className="mt-30 p-1rem">
                {errorMsg && (
                  <Alert
                    closable
                    type="error"
                    description={errorMsg}
                    onClose={() => setErrorMsg(null)}
                    showIcon
                  />
                )}
                {selectedCallType === 5 && (
                  <>
                    <ContactDetails
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      POSContactData={POSContactData}
                      customerData={props?.customerData}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedCallType={selectedCallType}
                      selectedSubType={selectedSubType}
                      requestModeLU={requestModeLU}
                      clientRoleLU={clientRoleLU}
                      details={props?.policyDetails}
                      duDupeData={duDupeData}
                      getAdvance={getAdvance}
                      interlRequirementTagValue={interlRequirementTagValue}
                      isEmailManagement={isEmailManagement}
                    ></ContactDetails>
                  </>
                )}
                {selectedCallType === 1 && (
                  <>
                    <PaymentRelated
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      requestModeLU={requestModeLU}
                      POSContactData={POSContactData}
                      customerData={props?.customerData}
                      selectedCallType={selectedCallType}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedSubType={selectedSubType}
                      details={props?.policyDetails}
                      SelectedSubTypeVal={SelectedSubTypeVal}
                      getAdvance={getAdvance}
                      interlRequirementTagValue={interlRequirementTagValue}
                      isEmailManagement={isEmailManagement}
                      loggedUser={loggedUser}
                      mandStatusLU={mandStatusLU}
                    ></PaymentRelated>
                  </>
                )}
                {selectedCallType === 2 && (
                  <>
                    <ServicingDocuments
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      POSContactData={POSContactData}
                      sisLU={sisLU}
                      customerData={props?.customerData}
                      selectedCallType={selectedCallType}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedSubType={selectedSubType}
                      details={props?.policyDetails}
                      getAdvance={getAdvance}
                    ></ServicingDocuments>
                  </>
                )}
                {selectedCallType === 3 && (
                  <>
                    <BankDetails
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      POSContactData={POSContactData}
                      customerData={props?.customerData}
                      selectedCallType={selectedCallType}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedSubType={selectedSubType}
                      details={props?.policyDetails}
                      requestModeLU={requestModeLU}
                      clientRoleLU={clientRoleLU}
                      bankAccTypeLU={bankAccTypeLU}
                      requestReceivedViaLU={requestReceivedViaLU}
                      duDupeData={duDupeData}
                      getAdvance={getAdvance}
                      interlRequirementTagValue={interlRequirementTagValue}
                      isEmailManagement={isEmailManagement}
                    ></BankDetails>
                  </>
                )}
                {selectedCallType === 6 && (
                  <>
                    <ContractAlteration
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      POSContactData={POSContactData}
                      panUpdateLU={panUpdateLU}
                      customerData={props?.customerData}
                      selectedCallType={selectedCallType}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedSubType={selectedSubType}
                      details={props?.policyDetails}
                      requestModeLU={requestModeLU}
                      clientRoleLU={clientRoleLU}
                      bankAccTypeLU={bankAccTypeLU}
                      requestReceivedViaLU={requestReceivedViaLU}
                      duDupeData={duDupeData}
                      SelectedSubTypeVal={SelectedSubTypeVal}
                      getAdvance={getAdvance}
                      interlRequirementTagValue={interlRequirementTagValue}
                      isEmailManagement={isEmailManagement}
                      martialStatusLU={martialStatusLU}
                      salutationLU={salutationLU}
                    ></ContractAlteration>
                  </>
                )}
                {selectedCallType === 7 && (
                  <>
                    <Annuity
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      POSContactData={POSContactData}
                      panUpdateLU={panUpdateLU}
                      customerData={props?.customerData}
                      selectedCallType={selectedCallType}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedSubType={selectedSubType}
                      details={props?.policyDetails}
                      requestModeLU={requestModeLU}
                      clientRoleLU={clientRoleLU}
                      bankAccTypeLU={bankAccTypeLU}
                      requestReceivedViaLU={requestReceivedViaLU}
                      duDupeData={duDupeData}
                      SelectedSubTypeVal={SelectedSubTypeVal}
                      getAdvance={getAdvance}
                      annuityPlans={annuityPlans}
                      interlRequirementTagValue={interlRequirementTagValue}
                    ></Annuity>
                  </>
                )}
                {selectedCallType === 8 && (
                  <>
                    <PartialWithdrawal
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      POSContactData={POSContactData}
                      panUpdateLU={panUpdateLU}
                      customerData={props?.customerData}
                      selectedCallType={selectedCallType}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedSubType={selectedSubType}
                      policyDetails={props?.policyDetails}
                      details={props?.policyDetails}
                      requestModeLU={requestModeLU}
                      clientRoleLU={clientRoleLU}
                      bankAccTypeLU={bankAccTypeLU}
                      requestReceivedViaLU={requestReceivedViaLU}
                      duDupeData={duDupeData}
                      typesForm={form}
                      setSelectedSubType={setSelectedSubType}
                      getAdvance={getAdvance}
                    ></PartialWithdrawal>
                  </>
                )}
                {selectedCallType === 9 && selectedSubTypeId === 1 && (
                  <>
                    <SurrenderV2
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      POSContactData={POSContactData}
                      changeSubType={changeSubType}
                      selectedSubTypeId={selectedSubTypeId}
                      details={props?.policyDetails}
                      customerData={props?.customerData}
                      selectedCallType={selectedCallType}
                      selectedSubType={selectedSubType}
                      surrenderForm={form}
                      setSelectedSubType={setSelectedSubType}
                      requestModeLU={requestModeLU}
                      getAdvance={getAdvance}
                      interlRequirementTagValue={interlRequirementTagValue}
                      bankAccTypeLU={bankAccTypeLU}
                    ></SurrenderV2>
                  </>
                )}
                {selectedCallType === 9 && selectedSubTypeId != 1 && (
                  <>
                    <Surrender
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      POSContactData={POSContactData}
                      changeSubType={changeSubType}
                      selectedSubTypeId={selectedSubTypeId}
                      details={props?.policyDetails}
                      customerData={props?.customerData}
                      selectedCallType={selectedCallType}
                      selectedSubType={selectedSubType}
                      surrenderForm={form}
                      setSelectedSubType={setSelectedSubType}
                      requestModeLU={requestModeLU}
                      getAdvance={getAdvance}
                      interlRequirementTagValue={interlRequirementTagValue}
                      bankAccTypeLU={bankAccTypeLU}
                    ></Surrender>
                  </>
                )}
                {selectedCallType === 4 && (
                  <>
                    <Revival
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      POSContactData={POSContactData}
                      customerData={props?.customerData}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedCallType={selectedCallType}
                      selectedSubType={selectedSubType}
                      requestModeLU={requestModeLU}
                      clientRoleLU={clientRoleLU}
                      details={props?.policyDetails}
                      setSelectedSubType={setSelectedSubType}
                      revivalForm={form}
                      getAdvance={getAdvance}
                      interlRequirementTagValue={interlRequirementTagValue}
                      uwDecisionLU={uwDecisionLU}
                    ></Revival>
                  </>
                )}
                {selectedCallType === 10 && (
                  <>
                    <Nomination
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      POSContactData={POSContactData}
                      customerData={props?.customerData}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedCallType={selectedCallType}
                      selectedSubType={selectedSubType}
                      requestModeLU={requestModeLU}
                      clientRoleLU={clientRoleLU}
                      details={props?.policyDetails}
                      SelectedSubTypeVal={SelectedSubTypeVal}
                      getAdvance={getAdvance}
                      interlRequirementTagValue={interlRequirementTagValue}
                      salutationLU={salutationLU}
                    ></Nomination>
                  </>
                )}
                {selectedCallType === 11 && (
                  <>
                    <LoanPolicy
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      POSContactData={POSContactData}
                      customerData={props?.customerData}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedCallType={selectedCallType}
                      selectedSubType={selectedSubType}
                      requestModeLU={requestModeLU}
                      clientRoleLU={clientRoleLU}
                      duDupeData={duDupeData}
                      details={props?.policyDetails}
                      getAdvance={getAdvance}
                      interlRequirementTagValue={interlRequirementTagValue}
                      bankAccTypeLU={bankAccTypeLU}
                    ></LoanPolicy>
                  </>
                )}
                {selectedCallType === 12 && (
                  <>
                    <FreeLook
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      POSContactData={POSContactData}
                      customerData={props?.customerData}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedCallType={selectedCallType}
                      selectedSubType={selectedSubType}
                      requestModeLU={requestModeLU}
                      registerModeLU={registerModeLU}
                      clientRoleLU={clientRoleLU}
                      details={props?.policyDetails}
                      freeLookForm={form}
                      SelectedSubTypeVal={SelectedSubTypeVal}
                      setSelectedSubType={setSelectedSubType}
                      getAdvance={getAdvance}
                      interlRequirementTagValue={interlRequirementTagValue}
                      bankAccTypeLU={bankAccTypeLU}
                    ></FreeLook>
                  </>
                )}
                {selectedCallType === 13 && (
                  <>
                    <GeneralInformation
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      customerData={props?.customerData}
                      selectedCallType={selectedCallType}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedSubType={selectedSubType}
                      details={props?.policyDetails}
                      getAdvance={getAdvance}
                      requestModeLU={requestModeLU}
                    ></GeneralInformation>
                  </>
                )}
                {selectedCallType === 14 && (
                  <>
                    <CallRelated
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      loggedUser={loggedUser}
                      isVerifyCheck={!isVerifiedCheck}
                      customerData={props?.customerData}
                      selectedCallType={selectedCallType}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedSubType={selectedSubType}
                      details={props?.policyDetails}
                      requestModeLU={requestModeLU}
                      callRelatedActionLU={callRelatedActionLU}
                      getAdvance={getAdvance}
                    ></CallRelated>
                  </>
                )}
                {selectedCallType === 15 && (
                  <>
                    <CustomerPortal
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      customerData={props?.customerData}
                      selectedCallType={selectedCallType}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedSubType={selectedSubType}
                      details={props?.policyDetails}
                      customerPortalForm={form}
                      setSelectedSubType={setSelectedSubType}
                      cursorPortalLU={cursorPortalLU}
                      getAdvance={getAdvance}
                      requestModeLU={requestModeLU}
                    ></CustomerPortal>
                  </>
                )}
                {selectedCallType === 16 && (
                  <>
                    <Website
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      customerData={props?.customerData}
                      selectedCallType={selectedCallType}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedSubType={selectedSubType}
                      details={props?.policyDetails}
                      websiteForm={form}
                      setSelectedSubType={setSelectedSubType}
                      websitePortalLU={websitePortalLU}
                      getAdvance={getAdvance}
                      requestModeLU={requestModeLU}
                    ></Website>
                  </>
                )}
                {selectedCallType === 17 && (
                  <>
                    <OPSInitiative
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      customerData={props?.customerData}
                      selectedCallType={selectedCallType}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedSubType={selectedSubType}
                      details={props?.policyDetails}
                      websiteForm={form}
                      setSelectedSubType={setSelectedSubType}
                      websitePortalLU={websitePortalLU}
                      getAdvance={getAdvance}
                      requestModeLU={requestModeLU}
                    ></OPSInitiative>
                  </>
                )}
                {selectedCallType === 18 && (
                  <>
                    <ProductRelated
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      customerData={props?.customerData}
                      selectedCallType={selectedCallType}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedSubType={selectedSubType}
                      details={props?.policyDetails}
                      typesForm={form}
                      setSelectedSubType={setSelectedSubType}
                      websitePortalLU={websitePortalLU}
                      customerQueryLU={customerQueryLU}
                      getAdvance={getAdvance}
                      requestModeLU={requestModeLU}
                    ></ProductRelated>
                  </>
                )}
                {selectedCallType === 19 && (
                  <>
                    <PolicyBond
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      POSContactData={POSContactData}
                      customerData={props?.customerData}
                      selectedCallType={selectedCallType}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedSubType={selectedSubType}
                      details={props?.policyDetails}
                      typesForm={form}
                      setSelectedSubType={setSelectedSubType}
                      websitePortalLU={websitePortalLU}
                      customerQueryLU={customerQueryLU}
                      getAdvance={getAdvance}
                      interlRequirementTagValue={interlRequirementTagValue}
                      requestModeLU={requestModeLU}
                    ></PolicyBond>
                  </>
                )}
                {selectedCallType === 20 && (
                  <>
                    <ProcessEnquiry
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      setSelectedSubTypeId={setSelectedSubTypeId}
                      customerData={props?.customerData}
                      selectedCallType={selectedCallType}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedSubType={selectedSubType}
                      details={props?.policyDetails}
                      typesForm={form}
                      setSelectedSubType={setSelectedSubType}
                      websitePortalLU={websitePortalLU}
                      customerQueryLU={customerQueryLU}
                      processNameLU={processNameLU}
                      getAdvance={getAdvance}
                      requestModeLU={requestModeLU}
                    ></ProcessEnquiry>
                  </>
                )}
                {selectedCallType === 21 && (
                  <>
                    <MedicalAppointment
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      requestModeLU={requestModeLU}
                      POSContactData={POSContactData}
                      customerData={props?.customerData}
                      selectedCallType={selectedCallType}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedSubType={selectedSubType}
                      details={props?.policyDetails}
                      typesForm={form}
                      setSelectedSubType={setSelectedSubType}
                      websitePortalLU={websitePortalLU}
                      customerQueryLU={customerQueryLU}
                      processNameLU={processNameLU}
                      getAdvance={getAdvance}
                    ></MedicalAppointment>
                  </>
                )}
                {selectedCallType === 22 && (
                  <>
                    <Assignment
                      clientEnquiryData={clientEnquiryData}
                      requestModeLU={requestModeLU}
                      EmailResponse={props?.EmailResponse}
                      SelectedSubTypeVal={SelectedSubTypeVal}
                      POSContactData={POSContactData}
                      customerData={props?.customerData}
                      selectedCallType={selectedCallType}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedSubType={selectedSubType}
                      details={props?.policyDetails}
                      typesForm={form}
                      setSelectedSubType={setSelectedSubType}
                      websitePortalLU={websitePortalLU}
                      customerQueryLU={customerQueryLU}
                      processNameLU={processNameLU}
                      getAdvance={getAdvance}
                      interlRequirementTagValue={interlRequirementTagValue}
                      martialStatusLU={martialStatusLU}
                      salutationLU={salutationLU}
                      bankAccTypeLU={bankAccTypeLU}
                    ></Assignment>
                  </>
                )}
                {selectedCallType === 23 && (
                  <>
                    <ULIPCallType
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      requestModeLU={requestModeLU}
                      customerData={props?.customerData}
                      changeSubType={changeSubType}
                      selectedCallType={selectedCallType}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedSubType={selectedSubType}
                      details={props?.policyDetails}
                      typesForm={form}
                      setSelectedSubType={setSelectedSubType}
                      getAdvance={getAdvance}
                    ></ULIPCallType>
                  </>
                )}
                {selectedCallType === 24 && (
                  <>
                    <PotentialComplaint
                      clientEnquiryData={clientEnquiryData}
                      requestModeLU={requestModeLU}
                      EmailResponse={props?.EmailResponse}
                      POSContactData={POSContactData}
                      customerData={props?.customerData}
                      selectedCallType={selectedCallType}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedSubType={selectedSubType}
                      details={props?.policyDetails}
                      getAdvance={getAdvance}
                    ></PotentialComplaint>
                  </>
                )}
                {selectedCallType === 25 && (
                  <>
                    <PaymentReProcessing
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      POSContactData={POSContactData}
                      customerData={props?.customerData}
                      selectedCallType={selectedCallType}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedSubType={selectedSubType}
                      details={props?.policyDetails}
                      getAdvance={getAdvance}
                      interlRequirementTagValue={interlRequirementTagValue}
                      requestModeLU={requestModeLU}
                      bankAccTypeLU={bankAccTypeLU}
                    ></PaymentReProcessing>
                  </>
                )}
                {selectedCallType === 26 && (
                  <>
                    <ChequeRepresentation
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      POSContactData={POSContactData}
                      customerData={props?.customerData}
                      selectedCallType={selectedCallType}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedSubType={selectedSubType}
                      details={props?.policyDetails}
                      typesForm={form}
                      setSelectedSubType={setSelectedSubType}
                      setSelectedSubTypeId={setSelectedSubTypeId}
                      getAdvance={getAdvance}
                    ></ChequeRepresentation>
                  </>
                )}
                {selectedCallType === 27 && (
                  <>
                    <OutBoundCall
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      customerData={props?.customerData}
                      selectedCallType={selectedCallType}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedSubType={selectedSubType}
                      details={props?.policyDetails}
                      callRelatedActionLU={callRelatedActionLU}
                      getAdvance={getAdvance}
                      requestModeLU={requestModeLU}
                    ></OutBoundCall>
                  </>
                )}
                {selectedCallType === 30 && (
                  <>
                    <FundTransfer
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      POSContactData={POSContactData}
                      customerData={props?.customerData}
                      selectedCallType={selectedCallType}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedSubType={selectedSubType}
                      details={props?.policyDetails}
                      callRelatedActionLU={callRelatedActionLU}
                      getAdvance={getAdvance}
                      requestModeLU={requestModeLU}
                      bankAccTypeLU={bankAccTypeLU}
                    ></FundTransfer>
                  </>
                )}
                {selectedCallType === 32 && (
                  <>
                    <SurvivalBenefit
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      POSContactData={POSContactData}
                      customerData={props?.customerData}
                      selectedCallType={selectedCallType}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedSubType={selectedSubType}
                      details={props?.policyDetails}
                      getAdvance={getAdvance}
                      requestModeLU={requestModeLU}
                      interlRequirementTagValue={interlRequirementTagValue}
                      isEmailManagement={isEmailManagement}
                    ></SurvivalBenefit>
                  </>
                )}
                {selectedCallType === 31 && (
                  <>
                    <Refund
                      requestModeLU={requestModeLU}
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      POSContactData={POSContactData}
                      customerData={props?.customerData}
                      selectedCallType={selectedCallType}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedSubType={selectedSubType}
                      details={props?.policyDetails}
                      callRelatedActionLU={callRelatedActionLU}
                      getAdvance={getAdvance}
                      interlRequirementTagValue={interlRequirementTagValue}
                      bankAccTypeLU={bankAccTypeLU}
                    ></Refund>
                  </>
                )}
                {selectedCallType === 33 && (
                  <>
                    <Claims
                      clientEnquiryData={clientEnquiryData}
                      clientRoleLU={clientRoleLU}
                      EmailResponse={props?.EmailResponse}
                      POSContactData={POSContactData}
                      customerData={props?.customerData}
                      selectedCallType={selectedCallType}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedSubType={selectedSubType}
                      details={props?.policyDetails}
                      callRelatedActionLU={callRelatedActionLU}
                      getAdvance={getAdvance}
                      causeOfEventLU={causeOfEventLU}
                      natureOfDeathLU={natureOfDeathLU}
                      policyTypeLU={policyTypeLU}
                      isPolicyAssigned={isPolicyAssigned}
                      claimCategoryLU={claimCategoryLU}
                      claimIntimationLU={claimIntimationLU}
                      sourceInformationLU={sourceInformationLU}
                      assuredIncomePlanLU={assuredIncomePlanLU}
                      laNomineeAddressLU={laNomineeAddressLU}
                      subStageLU={subStageLU}
                      assessorsDecisionLU={assessorsDecisionLU}
                      policyStatusDOBLU={policyStatusDOBLU}
                      approverDecisionLU={approverDecisionLU}
                      dataBseCHeckLU={props?.dataBseCHeckLU}
                      hotSpotCheckLU={props?.hotSpotCheckLU}
                      referCaseToLU={props?.referCaseToLU}
                      reinstatementDecisionLU={props?.reinstatementDecisionLU}
                      withDGHLU={props?.withDGHLU}
                      investigatorLU={props?.investigatorLU}
                      decisionDescriptionLU={props?.decisionDescriptionLU}
                      masterData={masterData}
                      requestModeLU={requestModeLU}
                      claimPaymentMethodLU={claimPaymentMethodLU}
                      coverageNameofProductLU={coverageNameofProductLU}
                      paymentReasonCodeLU={paymentReasonCodeLU}
                      organCategoryCodeLU={organCategoryCodeLU}
                      healthClaimCodeLU={healthClaimCodeLU}
                      uwDecisionNewLU={uwDecisionNewLU}
                    ></Claims>
                  </>
                )}
                {selectedCallType === 35 && (
                  <>
                    <RenewalRelated
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      POSContactData={POSContactData}
                      requestModeLU={requestModeLU}
                      customerData={props?.customerData}
                      selectedCallType={selectedCallType}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedSubType={selectedSubType}
                      details={props?.policyDetails}
                      callRelatedActionLU={callRelatedActionLU}
                      getAdvance={getAdvance}
                      interlRequirementTagValue={interlRequirementTagValue}
                      isEmailManagement={isEmailManagement}
                    ></RenewalRelated>
                  </>
                )}
                {selectedCallType === 36 && (
                  <>
                    <InquiryPolicy
                      clientEnquiryData={clientEnquiryData}
                      EmailResponse={props?.EmailResponse}
                      POSContactData={POSContactData}
                      requestModeLU={requestModeLU}
                      customerData={props?.customerData}
                      selectedCallType={selectedCallType}
                      selectedSubTypeId={selectedSubTypeId}
                      selectedSubType={selectedSubType}
                      details={props?.policyDetails}
                      callRelatedActionLU={callRelatedActionLU}
                      getAdvance={getAdvance}
                      interlRequirementTagValue={interlRequirementTagValue}
                      isEmailManagement={isEmailManagement}
                    ></InquiryPolicy>
                  </>
                )}
                {/* {
                      selectedCallType===29&&<>
                       <Foreclosure clientEnquiryData={clientEnquiryData} POSContactData={POSContactData} customerData={props?.customerData} selectedCallType={selectedCallType} selectedSubTypeId={selectedSubTypeId}  selectedSubType={selectedSubType} details={props?.policyDetails}  bankAccTypeLU={bankAccTypeLU/>
                      </>
                    } */}
              </div>
            </>
          )}

          <Modal
            open={ShowEmailTemplate}
            destroyOnClose={true}
            width={1200}
            closeIcon={false}
            footer={null}
          >
            <div>
              <div className="reuirement">
                <ReactQuill
                  className="quill-container"
                  theme="snow"
                  value={EmailFromCustomer}
                  readOnly={true}
                />
              </div>

              <div className="contact-details-btn">
                <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => setShowEmailTemplate(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </Modal>

          <Modal
            open={isShowEmailMobileModal}
            destroyOnClose={true}
            // width={1200}
            closeIcon={false}
            footer={null}
          >
            <div>
              <p className="text-bold">{isEmailMobileNoMessage}</p>
              <div className="text-center modal-validate">
                <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => setIsShowEmailMobileModal(false)}
                >
                  OK
                </Button>
              </div>
              {/* <div className="contact-details-btn">
           <Button
             type="primary"
             className="primary-btn"
             onClick={() => setIsShowEmailMobileModal(false)}
           >
             Close
           </Button>
         </div> */}
            </div>
          </Modal>
        </div>
      </Spin>
    </>
  );
};
const mapStateToProps = ({ state, policyDetails }) => {
  return { data: state?.PolicyDetailsReducer?.policyDetailsObj, policyDetails };
};
export default connect(mapStateToProps)(TypesComponent);
