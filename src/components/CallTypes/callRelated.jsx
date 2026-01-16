import React, { useState, useEffect } from "react";
import { CallRelatedData } from "../../mainconfig";


import DetailsForm from "../../utils/DetailsForm";
import {
  Button,
  Modal,
  Form,
  Spin,
  message,
} from "antd";
import moment from "moment";
import apiCalls from "../../api/apiCalls";
import PopupAlert from "../popupAlert";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useSelector } from "react-redux";
import RaiseRequirementPopup from '../RaiseRequirementPopup';


const CallRelated = (props) => {
  const loginInfo = useSelector(state => state);
  const [form] = Form.useForm();
  const [requirementsForm] = Form.useForm();
  dayjs.extend(customParseFormat);
  const {selectedSubType, customerData,details,callRelatedActionLU, requestModeLU,isVerifyCheck, loggedUser,clientEnquiryData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertData, setAlertData] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isPreferDate,setIsPreferDate] = useState(null);
  const [isLoader,setIsLoader] = useState(false);
  const [isSelectedDate, setIsSelectedDate] = useState(null);
  const [isDNDFlag,setIsDNDFlag] = useState(false);
  const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [modalOpen, setmodalOpen] = useState(true);
  const [updateFields,setUpdateFields] = useState(false);

  const privactDonotCallLU= [
    { label: 'Disable Do Not Call', value: 2 },
    ];

  useEffect(()=>{
    form.resetFields();
     form.setFieldsValue({
      MobileNumber: customerData?.mobileNo,
      EmailAddress:customerData?.emailID
     })
     if(selectedSubType==="donotcall"){
      getDoNotDisturbAPI();
      getMandatetagEnquiry();
     }
     else if(selectedSubType==="verificationnotcompleted"&&loggedUser?.role == 14){
      CallRelatedData[selectedSubType]?.BOE_Details?.forEach(element => {
        if(element?.label==="Call Date"||element?.label==="Call Time"){
          element.hide= true;
          setUpdateFields(true);
        }
      });
     }
  },[selectedSubType])
  useEffect(()=>{
    if(props?.EmailResponse?.IsEmailmanagent){
    if (!CallRelatedData[selectedSubType]) {
      CallRelatedData[selectedSubType] = {}; // Initialize if undefined
    }
    if (!Array.isArray(CallRelatedData[selectedSubType]?.BOE_Details)) {
      CallRelatedData[selectedSubType].BOE_Details = [];
  }

  // Remove existing instances of "Additional Note For Customer" before adding a new one
  CallRelatedData[selectedSubType].BOE_Details = CallRelatedData[selectedSubType].BOE_Details.filter(
      comment => comment.name !== "AdditionalNoteForCustomer"
  );

  // Add "Additional Note For Customer" once
  CallRelatedData[selectedSubType].BOE_Details.push(
    {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 4000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
    });
    CallRelatedData[selectedSubType]?.BOE_Details?.forEach(element => {
    if(element.name==="requestchannel"){
      element.disabled = true;
      form.setFieldsValue({
        requestchannel: 4
      })
    }
  })
}
  },[selectedSubType])

  const disabledDate = (current,item) => {
    if(item?.pastDate){
      const todayStartOfDay = dayjs().startOf("day");
     return current ? current <= todayStartOfDay : true;// Can not select days before today and today
    }
    else {
      return current && current > dayjs().endOf("day"); // Can not select days after today and today
    }
    
  };

  const disabledTime = (now,item) => {
    const currentHour = now.hour();
    const currentMinute = now.minute();
    const currentSecond = now.second();
    let newDate = new Date();
      let todayDate = moment(newDate).format("DD/MM/YYYY");
    // Example: Disable hours before the current hour
    const disabledHours = () => {
      const hours = [];
      if(isPreferDate === todayDate){
        for (let i = 0; i < currentHour; i++) {
          hours.push(i);
        }
      }
      else if(item?.featureTime&&isSelectedDate>=todayDate) {
        for (let i = currentHour + 1; i < 24; i++) {
          hours.push(i);
        }
      }
     
      return hours;
    };

    // Example: Disable minutes before the current minute for the current hour
    const disabledMinutes = (selectedHour) => {
      if (selectedHour === currentHour) {
        const minutes = [];
        if(isPreferDate === todayDate){
        for (let i = 0; i < currentMinute; i++) {
          minutes.push(i);
        }
      }
      else if(item?.featureTime&&isSelectedDate>=todayDate) {
        for (let i = currentMinute + 1; i < 60; i++) {
          minutes.push(i);
        }
      }
        return minutes;
      }
      return [];
    };

    // Example: Disable seconds for the current hour and minute
    const disabledSeconds = (selectedHour, selectedMinute) => {
      if (selectedHour === currentHour && selectedMinute === currentMinute) {
        const seconds = [];
        if(isPreferDate === todayDate){
        for (let i = 0; i < currentSecond; i++) {
          seconds.push(i);
        }
      }
      else if(item?.featureTime&&isSelectedDate>=todayDate) {
        for (let i = currentSecond + 1; i < 60; i++) {
          seconds.push(i);
        }
      }
        return seconds;
      }
      return [];
    };

    return {
      disabledHours,
      disabledMinutes,
      disabledSeconds,
    };
  }

  const handleDateChange=(date, item)=>{
    if(item?.toLowerCase() == "preferescallbackdate"){
      let selectDate = moment(date + 1).format("DD/MM/YYYY");
      setIsPreferDate(selectDate)
    }else{
      let selectDate = moment(date + 1).format("DD/MM/YYYY");
      setIsSelectedDate(selectDate);
    }
  }
  const handleDropdownChange=()=>{}
  
  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };
  const onBlurInput=()=>{}

  useEffect(()=>{
    if(loginInfo?.userProfileInfo?.profileObj?.isEmail){
      form.setFieldsValue({
        'requestchannel': 4,
      });
    }
  },[])

  const getTransactionData = (values) => {
    if (selectedSubType === "wrongcustomercontacted") {
      return [
        {"Status": "Create","TagName": "AdditionalNoteForCustomer", "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",},
        { Status: "Create", TagName: "Reasonforcalling", TagValue: values.Reasonforcalling },
        { Status: "Create", TagName: "CallDate", TagValue: values.CallDate },
          { Status: "Create", TagName: "requestchannel", TagValue: values?.requestchannel || ""},
        { Status: "Create", TagName: "CallTime", TagValue: values.CallTime },
        { Status: "Create", TagName: "Spokewith", TagValue: values.Spokewith },
        { Status: "Create", TagName: "Comments", TagValue: values.Comments },
      ];
    } else if(selectedSubType === "donotcall") {
      return [
        {"Status": "Create","TagName": "AdditionalNoteForCustomer", "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",},
        { Status: "Create", TagName: "MobileNumber", TagValue: values.MobileNumber },
        { Status: "Create", TagName: "EmailAddress", TagValue: values.EmailAddress },
        { Status: "Create", TagName: "AutoPayStatus", TagValue: values.AutoPayStatus },
        { Status: "Create", TagName: "NoOfCallMadeInLastMonth", TagValue: values.Noofcallsmadeinlast30days || "" },
        { Status: "Create", TagName: "DNDFlag", TagValue: values.DNDFlag },
        { Status: "Create", TagName: "RequestMode", TagValue: values.requestchannel },
        { Status: "Create", TagName: "Action", TagValue: values?.Action === 1 ? true : false },
        { Status: "Create", TagName: "Comments", TagValue: values.Comments },
      ];
    }
    else if(selectedSubType === "callbackbusy") {
      return [
        {"Status": "Create","TagName": "AdditionalNoteForCustomer", "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",},
        { Status: "Create", TagName: "ResoanForCalling", TagValue: values.ResoanForCalling },
        { Status: "Create", TagName: "SpokeWith", TagValue: values.SpokeWith },
        { Status: "Create", TagName: "CallDate", TagValue: values.CallDate },
        { Status: "Create", TagName: "CallTime", TagValue: values.CallTime },
        { Status: "Create", TagName: "PreferedCallBackDate", TagValue: values.PreferedCallBackDate },
        { Status: "Create", TagName: "PreferedCallBackTime", TagValue: values.PreferedCallBackTime },
        { Status: "Create", TagName: "Comments", TagValue: values.Comments },
      ];
    }
    else if(selectedSubType === "newbussinesscallverificationdone") {
      return [
        {"Status": "Create","TagName": "AdditionalNoteForCustomer", "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",},
        { Status: "Create", TagName: "SpokeWith", TagValue: values.SpokeWith },
         { Status: "Create", TagName: "requestchannel", TagValue: values?.requestchannel || ""},
        { Status: "Create", TagName: "CallDate", TagValue: values.CallDate },
        { Status: "Create", TagName: "CallTime", TagValue: values.CallTime },
        { Status: "Create", TagName: "Comments", TagValue: values.Comments },
      ];
    }
    else if(selectedSubType === "systemdowntime") {
      return [
        {"Status": "Create","TagName": "AdditionalNoteForCustomer", "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",},
        { Status: "Create", TagName: "requestchannel", TagValue: values?.requestchannel || ""},
        { Status: "Create", TagName: "SpokeWith", TagValue: values.SpokeWith },
        { Status: "Create", TagName: "ReasonForCall", TagValue: values.ReasonForCall },
        { Status: "Create", TagName: "Comments", TagValue: values.Comments },
      ];
    }
    else if(selectedSubType === "verificationnotcompleted") {
      return [
        {"Status": "Create","TagName": "AdditionalNoteForCustomer", "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",},
        { Status: "Create", TagName: "requestchannel", TagValue: values?.requestchannel || ""},
        { Status: "Create", TagName: "ReasonForCall", TagValue: values.ReasonForCall },
        { Status: "Create", TagName: "CallDate", TagValue: values.CallDate },
        { Status: "Create", TagName: "CallTime", TagValue: values.CallTime },
        { Status: "Create", TagName: "SpokeWith", TagValue: values.SpokeWith },
        { Status: "Create", TagName: "Comments", TagValue: values.Comments },
      ];
    }
    else if(selectedSubType === "groupinsurancecall") {
      return [
        {"Status": "Create","TagName": "AdditionalNoteForCustomer", "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",},
        { Status: "Create", TagName: "SpokeWith", TagValue: values.SpokeWith },
        { Status: "Create", TagName: "CallTime", TagValue: values.CallTime },
          { Status: "Create", TagName: "requestchannel", TagValue: values?.requestchannel || ""},
        { Status: "Create", TagName: "Comments", TagValue: values.Comments },
        {Status: "Create", TagName: "Template", TagValue: "GROUPINSURANCECALL"}

      ];
    }
    else if(selectedSubType === "generalinsurancecall") {
      return [
        {"Status": "Create","TagName": "AdditionalNoteForCustomer", "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",},
        { Status: "Create", TagName: "SendNonLifeCotactDetails", TagValue: values?.SendNonLifeCotactDetails || "" },
        { Status: "Create", TagName: "MobileNumber", TagValue: values?.MobileNumber || customerData?.mobileNo || "" },
        { Status: "Create", TagName: "EmailID", TagValue: values?.EmailID || customerData?.emailID ||"" },
        { Status: "Create", TagName: "Comments", TagValue: values.Comments },
        {
          "Status": "Create",
          "TagName": "Template",
           "TagValue": "GENERALINSURANCECALL"
          },
      ];
    }
    else if(selectedSubType === "blankcallghostcall") {
      return [
        {"Status": "Create","TagName": "AdditionalNoteForCustomer", "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",},
        { Status: "Create", TagName: "requestchannel", TagValue: values?.requestchannel || ""},
        { Status: "Create", TagName: "Comments", TagValue: values.Comments },
      ];
    }
    else if(selectedSubType === "calldrop") {
      return [
        {"Status": "Create","TagName": "AdditionalNoteForCustomer", "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",},
        { Status: "Create", TagName: "requestchannel", TagValue: values?.requestchannel || ""},
        { Status: "Create", TagName: "ReasonForCall", TagValue: values.ReasonForCall },
        { Status: "Create", TagName: "CallDate", TagValue: values.CallDate },
        { Status: "Create", TagName: "CallTime", TagValue: values.CallTime },
        { Status: "Create", TagName: "SpokeWith", TagValue: values.SpokeWith },
        { Status: "Create", TagName: "Comments", TagValue: values.Comments },
      ];
    }
  };


  const getMandatetagEnquiry = ()=>{
    setIsLoading(true);
    setShowAlert(false);
    let empID = loggedUser?.allRoles[0]?.employeeID
    let response = apiCalls.getMandatetagEnquiry(customerData?.policyNo, empID);
    response
      .then((val) => {
        if (val?.data?.responseBody?.errorCode !== "1") {
          const res = val?.data?.responseBody
          const isECGRequestValue = res?.bankDetailsList[0]?.mandstat === "10" ? "Active" : "Mandate Tag Not Found";

        form?.setFieldsValue({AutoPayStatus: isECGRequestValue})
          setIsLoading(false);
        } else {
          const isECGRequestValue = val?.data?.responseBody?.errorMessage;

        form?.setFieldsValue({AutoPayStatus: isECGRequestValue})
          setIsLoading(false);

          if( val?.data?.responseBody?.errorMessage === 'Mandate not found'){
            setmodalOpen(true)
     
          }
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }




  const getDoNotDisturbAPI = async () => {
    setIsDNDFlag(false);
    try {
      const response = await apiCalls.getDoNotDisturbAPI(customerData?.policyNo,customerData?.mobileNo);
      if (response?.data) {
        const res = response?.data;
        setIsDNDFlag(res?.dndStatus);
        form.setFieldsValue({
          DNDFlag: res?.dndStatus === true ? 'Enabled': 'Disabled',
          NoOfCallMadeInLastMonth: res?.noOfTimeCallMadeInLastMonth
        })
        
      } else {
        handleError(response?.data?.errormessage || "Something went wrong, please try again!");
      }
    } catch (error) {
      handleError("Something went wrong, please try again!");
    }
  };
  const handleError = (errorMessage) => {
    message.error({
      content: errorMessage,
      className: "custom-msg",
      duration: 2,
    });
  };

  const POSActionsOnContactDetails = (values, status) => {
    setIsLoading(true);
    let seletedRequerimentList = raiseRequerimentList
      ?.filter((e) => e.status === true)
      ?.map((e) => e.raiseReqId);
      if(seletedRequerimentList.length===0  && status === 'REJECTED'){
        setIsLoading(false);
        setRequirementLoader(false);
        message.destroy();
        message.error({
          content: "Please Select Documents to Reject",
          className: "custom-msg",
          duration: 3,
        });
      return;
      }
    let obj = {
      TransectionId: 1,
      SrvReqRefNo: "",
      Status: status,
      RequirementList: seletedRequerimentList,
      UsrID: loginInfo?.userProfileInfo?.profileObj?.userName,
      RoleID: loginInfo?.userProfileInfo?.profileObj?.role,
      POSComments1: values?.comment,
      TransactionPayload: [],
    };
      let reqFormValues = requirementsForm?.getFieldsValue();
    obj.TransactionPayload.push({
        "Status": "Create",
        "TagName": "PosOtherReq",
        "TagValue": reqFormValues?.PosOtherReq || ""
      });
    let response = apiCalls.POSActionsOnContactDetails(obj);
    response
      .then((val) => {
        if (val?.data) {
          setAlertTitle(`${val?.data?.message}`);
           setNavigateTo(
             ( "/advancesearch") || "/dashboard"
           );
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
        setRequirementLoader(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setRequirementLoader(false);
      });
  };

  const handleSubmit = (values) => {
    setIsLoading(true);
    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: loginInfo?.userProfileInfo?.profileObj?.role || 0, // Required
      RequestChannel: loginInfo?.userProfileInfo?.profileObj?.role === 14 ? 13 :  values.requestchannel,  // Required
      Category: selectedSubType === "donotcall" || raiseRequirementOpen ? 2 : 1,
      ApplicationNo:
      details?.policyDetailsObj?.identifiers?.applicationNo ||customerData?.applicationNo,
      DOB: convertDate(customerData?.dob),
      PolicyNo: details?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo, // Required
      CustomerId: 456,
      CustRole: values.custRole,
      policyStatus:
      details?.policyDetailsObj?.planAndStatus?.policyStatus || customerData?.policyStatus,
      proposerName: customerData?.poName,
      plan: details?.policyDetailsObj?.planAndStatus?.planName || customerData?.planName,
      CreatedOn: new Date(),
      CreatedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
      CreatedUsrId: loginInfo?.userProfileInfo?.profileObj?.userName,
      ModifiedOn: new Date(),
      ModifiedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
      AssignedToRole: "", //POS
      AssignedByUser: 0,
      ReasonForChange: "",
      RequestDateTime: new Date(),
      ReasonDelayed: values.resonfordelay,
      CustSignDateTime: values?.customersigningdate
        ? new Date(values?.customersigningdate)
        : new Date(),
        TransactionData: getTransactionData(values),
      Uploads: [
      
      ],
      CommunicationRequest: [
        {
          SrvReqRefNo: "",
          TemplateID: "",
          CommType: 2,
          ReceipientTo:  import.meta.env.VITE_APP_RECEIPIENT_TO ? import.meta.env.VITE_APP_RECEIPIENT_TO : clientEnquiryData?.rinternet,
          ReceipientCC: import.meta.env.VITE_APP_RECEIPIENT_CC ? import.meta.env.VITE_APP_RECEIPIENT_CC : clientEnquiryData?.rinternet,
          MobileNos: "",
          ScheduledTime: new Date(),
          CommBody: "",
          Attachments: null,
        },
        {
          SrvReqRefNo: "",
          TemplateID: "",
          CommType: 1,
          MobileNos: import.meta.env.VITE_APP_RECEIPIENT_MOBILENO ? import.meta.env.VITE_APP_RECEIPIENT_MOBILENO : clientEnquiryData?.rmblphone,
          ReceipientCC: "",
          ReceipientTo: "",
          ScheduledTime: new Date(),
          CommBody: "",
          Attachments: null,
        },
      ],
      CurrentStatus:raiseRequirementOpen? "Reject":'',
    };

     if(raiseRequirementOpen){
      let reqFormValues = requirementsForm?.getFieldsValue();
  let ids = raiseRequerimentList?.filter((e) => e.status === true)?.map((e) => e.raiseReqId)
  obj.TransactionData.push({
    "Status": "Create",
    "TagName": "ReasonList_Key",
    "TagValue":  JSON.stringify(ids)
  })
    obj.TransactionData.push({
      "Status": "Create",
      "TagName": "AddAnyOtherRequirements",
      "TagValue": reqFormValues?.addotherReq || ""
    });
    if(ids?.length===0 && !props?.EmailResponse?.IsEmailmanagent){
                message.error({
                  content: "Please Select Documents to Reject",
                  className: "custom-msg",
                  duration: 3,
                });
                setIsLoader(false);
                setRequirementLoader(false);
                return
              }
    }

    if(props?.EmailResponse?.IsEmailmanagent){
      obj.TransactionData.push(
        {
        "Status": "Create",
        "TagName": "EmailResponseId",
        "TagValue": props?.EmailResponse?.EmailResponseId
        },
        {
          "Status": "Create",
          "TagName": "CustomerName",
          "TagValue": clientEnquiryData?.lgivname + clientEnquiryData?.lsurname
          },
    )
     }
     
    let response = apiCalls.genericAPI(obj);
    response
      .then((val) => {
        if (val?.data) {
          // if(!val?.data?.srvReqRefNo){
            setAlertTitle(val?.data?.header);
            setAlertData(val?.data?.message);
            setShowAlert(true);
            setIsLoader(false);
          //   return
          // }
          // if (val?.data?.category == 2) {
          //   setAlertTitle("Request Created Successfully");
          // } else {
          //   setAlertTitle("Query Raised Successfully");
          // }
          // if (selectedSubType === "blankcallghostcall" || selectedSubType === "calldrop") {
          //   let successMessage = val?.data?.tat > 0 ?
          //     `Ticket ID Number ${val?.data?.srvReqRefNo}. Please call up the customer immediately.`
          //     : `Ticket ID Number ${val?.data?.srvReqRefNo}.`;
          //   setAlertData(successMessage);
          // } else {
          //   let successMessage = val?.data?.tat > 0 ?
          //     `Ticket ID Number ${val?.data?.srvReqRefNo}. Your request will be processed in ${val?.data?.tat} days.`
          //     : `Ticket ID Number ${val?.data?.srvReqRefNo}.`;
          //   setAlertData(successMessage);
          // }
          // setNavigateTo("/advancesearch");
          // setShowAlert(true);
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

  const getRaiseRequirements = () => {
    setRaiseRequirementOpen(true);
    setRequirementLoader(true);
    let obj = {
      calltype: props?.selectedCallType,
      subtype: props?.selectedSubTypeId,
      Role:loginInfo?.userProfileInfo?.profileObj?.role=== 1 ? 1:0
    };
    let response = apiCalls.getRaiseRequirements(obj);
    response
      .then((val) => {
        if (val?.data) {
          setRaiseRequerimentList(val?.data);
          setRequirementLoader(false);
        } else {
          setRequirementLoader(false);
          message.error({
            content:
              val?.data?.responseBody?.errormessage ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
      })
      .catch((err) => {
        setRequirementLoader(false);
      });
  };

  const handleRequirementSubmit = () => {
    const formData = form.getFieldValue();
   if(raiseRequirementOpen){
    handleSubmit(formData);
    // POSActionsOnContactDetails(null, "REJECTED");
    }

  };
  const popupClose=()=>{
    setRaiseRequirementOpen(false)
  }

  return (
    <>
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
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <DetailsForm
          requestModeLU={requestModeLU}
            data={CallRelatedData[selectedSubType]?.BOE_Details}
            subType={selectedSubType}
            handleDropdownChange ={handleDropdownChange }
            handleDateChange={handleDateChange}
            callRelatedActionLU={(isDNDFlag)? privactDonotCallLU: callRelatedActionLU}
            disabledDate={disabledDate}
            disabledTime={disabledTime}
            onBlurInput={onBlurInput}
          ></DetailsForm>
          {/* {(selectedSubType !== "donotcall"||!isDNDFlag)&&<> */}
          <div className="contact-details-btn">
            
                <Button
                  type="primary"
                  htmlType="submit"
                  className="primary-btn"
                >
                  Submit
                </Button>{" "}
                {/* {
                  loginInfo?.userProfileInfo?.profileObj?.role=== 1 && selectedSubType !=="verificationnotcompleted"&&
                  <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
                } */}
              </div>
              {/* </>} */}
        </Form>
      </Spin>
      {showAlert && (
        <PopupAlert
          alertData={alertData}
          title={alertTitle}
          getAdvance={props.getAdvance}
          navigate={navigateTo}
          setShowAlert={setShowAlert}
        ></PopupAlert>
      )}
      <RaiseRequirementPopup raiseRequerimentList={raiseRequerimentList} raiseRequirementOpen={raiseRequirementOpen} requirementModalLoader={requirementModalLoader} handleRequirementSubmit={handleRequirementSubmit} popupClose={popupClose} requirementsForm={requirementsForm}/>
      
      
      <Modal
        title="Please Check Assistance"
        centered
        open={modalOpen}
        closeIcon={false}
        footer={null}
      >
        
        <div className='text-center modal-validate'>
        <Button type="primary" className="primary-btn" onClick={()=>setmodalOpen(false)}>
              OK
            </Button>
        </div>
      </Modal>
    
    
    
    </>
  );
};

export default CallRelated;