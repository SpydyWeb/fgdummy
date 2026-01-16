import React, { useState, useEffect } from "react";
import { ProductRelatedData } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import {
  Button,
  Form,
  Spin,
  message,
} from "antd";
import moment from "moment";
import apiCalls from "../../api/apiCalls";
import PopupAlert from "../popupAlert";
import ContactForm from "../../utils/ContactForm";
import { useSelector } from "react-redux";
import RaiseRequirementPopup from '../RaiseRequirementPopup';
import { AssignmentData } from "../../mainconfig";

const ProductRelated = (props) => {
  const loginInfo = useSelector(state => state);
  const [form] = Form.useForm();
  const [requirementsForm] = Form.useForm();
  const { selectedSubType, customerData,details,setSelectedSubType,typesForm,ProductRelatedPortalLU,customerQueryLU,clientEnquiryData,requestModeLU } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertData, setAlertData] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
const [showEmailAddress, setShowEmailAddress] = useState(false);
const [showWhatsApp, setShowWhatsApp] = useState(false)
const [showEmailFields, setShowEmailFields] = useState(false);
const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
const [requirementModalLoader, setRequirementLoader] = useState(false);
const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
const [isLoader,setIsLoader] = useState(false);
const [isPreferDate,setIsPreferDate] = useState(null);
const [isSelectedDate, setIsSelectedDate] = useState(null);

const [showResonDelayField, setShowReasonDelayField] = useState(false);

useEffect(()=>{
  form.setFieldsValue({
    'mobileNo': customerData?.mobileNo,
    'whatsAppNo':  customerData?.mobileNo,
    'emailId': customerData?.emailID
  });
},[])
useEffect(()=>{
  if(props?.EmailResponse?.IsEmailmanagent){
    ProductRelatedData[selectedSubType]?.BOE_Details?.forEach(element=>{
          if (element?.name === "requestchannel") {
            form.setFieldsValue({
              requestchannel: 4,
            });
            element.disabled = true;
          }
        })
    if (!ProductRelatedData[selectedSubType]) {
      ProductRelatedData[selectedSubType] = {}; // Initialize if undefined
    }
    
    if (!Array.isArray(ProductRelatedData[selectedSubType]?.BOE_Details)) {
      ProductRelatedData[selectedSubType].BOE_Details = [];
    }
    
    // Remove existing instances of "Additional Note For Customer" before adding a new one
    ProductRelatedData[selectedSubType].BOE_Details = ProductRelatedData[selectedSubType].BOE_Details.filter(
      comment => comment.name !== "AdditionalNoteForCustomer"
    );
    ProductRelatedData[selectedSubType].BOE_Details.push(
      {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 4000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
      })
    }
   
},[selectedSubType])

  const handleDropdownChange=(e,item)=>{
    if(item==="leadof"){
    }
    else{
      let selectDropDownValue = e === 1 ? "productkeyfeatures" : e ===2  ? "maturity" : e===3 ? "survivalfeatures" :e===4?"termsandconditions": e===5?"productcharges": 1;
      // setSelectedSubType(selectDropDownValue);
      // typesForm?.setFieldsValue({subType: e})
    }
  }
  const toggleInputField = (field) => {
    setShowEmailFields(true);
    switch (field) {
      case 'phone':
        setShowPhoneNumber(!showPhoneNumber);
        break;
      case 'email':
        setShowEmailAddress(!showEmailAddress);
        break;
      case 'whatsapp':
        setShowWhatsApp(!showWhatsApp);
        break;
      default:
        break;
    }
  };
 
  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };
  const getTransactionData = (values) => {
    if(selectedSubType==="productkeyfeatures"){
      return [
        { Status: "Create", TagName: "AdditionalNoteForCustomer", TagValue:values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") },
        { Status: "Create", TagName: "requestchannel", TagValue:values?.requestchannel || "" },
        { Status: "Create", TagName: "ProcessFileType", TagValue:"PRODUCTKEYFEATURES" }
      ]
    }
    if(selectedSubType==="termsandconditions"){
      return [
        { Status: "Create", TagName: "AdditionalNoteForCustomer", TagValue:values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") },
        { Status: "Create", TagName: "ProcessFileType", TagValue:"TERMSANDCONDITION" }
      ]
    }
    return [
      {
        "Status": "Create",
        "TagName": "CustomerQueryTopic",
        "TagValue": values.CustomerQueryTopic
    },
    {
      "Status": "Create",
      "TagName": "CustomerQuery",
      "TagValue": values.CustomerQuery
  },
    ]
  }

 
  const handleSubmit = (values, isRaiseRequest) => {
    if(!showEmailFields&&selectedSubType!=="prospectleaddistributorlead" && !isRaiseRequest){
      message.destroy()
      message.warning({
        content:
          "Please select atleast one communication.",
        className: "custom-msg",
        duration: 2,
      });
      return;
    }
    setIsLoading(true);
    const obj = {
      proposerName:details?.policyDetailsObj?.identifiers?.po_Name || customerData?.po_Name,
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: loginInfo?.userProfileInfo?.profileObj?.role || 0, // Required
      RequestChannel: loginInfo?.userProfileInfo?.profileObj?.role === 14 ? 13 :  values.requestchannel,  // Required
      Category: raiseRequirementOpen?2:1,
      ApplicationNo:
      details?.policyDetails?.policyDetailsObj?.identifiers?.applicationNo ||customerData?.applicationNo,
      DOB: convertDate(customerData?.dob),
      PolicyNo: details?.policyDetails?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo, // Required
      CustomerId: 456,
      "CustRole":values.custRole,
      policyStatus:
      details?.policyDetails?.policyDetailsObj?.planAndStatus?.policyStatus || customerData?.policyStatus,
      plan: details?.policyDetails?.policyDetailsObj?.planAndStatus?.planName || customerData?.planName,
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
      "TransactionData":getTransactionData(values),
      "Uploads": [
        
      ],
      CurrentStatus:raiseRequirementOpen? "Reject":'',
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
          ReceipientTo: "",
          ReceipientCC: "",
          MobileNos: import.meta.env.VITE_APP_RECEIPIENT_MOBILENO ? import.meta.env.VITE_APP_RECEIPIENT_MOBILENO : clientEnquiryData?.rmblphone,
          ScheduledTime: new Date(),
          CommBody: "",
          Attachments: null,
        },
      ],
  }
  if(raiseRequirementOpen){
    let reqFormValues = requirementsForm?.getFieldsValue();
    let ids = raiseRequerimentList?.filter((e) => e.status === true)?.map((e) => e.raiseReqId)
    obj.TransactionData.push({
      "Status": "Create",
      "TagName": "ReasonList_Key",
      "TagValue":  JSON.stringify(ids)
    })
     obj.TransactionData?.push({
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
                      setIsLoading(false);
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
          //   let successMessage = val?.data?.tat > 0 ?
          //     `Ticket ID Number ${val?.data?.srvReqRefNo}. Your request will be processed in ${val?.data?.tat || 0} days`
          //     : `Ticket ID Number ${val?.data?.srvReqRefNo}.`;
          //   setAlertData(successMessage);
          // } else {
          //   setAlertTitle("Query Raised Successfully");
          //   let successMessage = `Ticket ID Number ${val?.data?.srvReqRefNo}.`;
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
      Role:loginInfo?.userProfileInfo?.profileObj?.role===1 ? 1:0
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
//     setRequirementLoader(true);
 if(raiseRequirementOpen){
      handleSubmit(formData, true);
    }

  };
  const popupClose=()=>{
    setRaiseRequirementOpen(false)
  }

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

  const handleDateChange = (date, item) => {
    if (item === "branchreceiveddate" || item?.name === "branchreceiveddate") {
      setShowReasonDelayField(false);
      let newDate = new Date();
      let todayDate = moment(newDate).format("MM/DD/YYYY");
      let selectDate = moment(date + 1).format("MM/DD/YYYY");
      const formFeilds = form.getFieldsValue()
      let customerSignDate = moment(formFeilds?.customersigningdate + 1).format("MM/DD/YYYY");
      let dateDiffence = date_diff_indays(selectDate,customerSignDate)
      if(!formFeilds?.customersigningdate ||dateDiffence > 0){
        message.destroy();
        message.error({
          content: "Request Received Date can't be before the customer signing date.",
          className: "custom-msg",
          duration: 3,
        });
        form.setFieldsValue({
          branchreceiveddate: "",
         
        })
      return;
      }

      else {
        if(selectedSubType==="absoluteconditionalassignment"){ //Added by sayali on 17-07-2025 absoluteassignment name changes as absoluteconditionalassignment
          AssignmentData[selectedSubType]?.Update_Details?.forEach(element => {
            if(element?.label?.includes("Reason For Delayed Submission")&&selectDate < todayDate){
              element.hide= false;
              setShowReasonDelayField(true);
            }
            else if(element?.label?.includes("Reason For Delayed Submission")&&selectDate >= todayDate){
              element.hide= true;
              setShowReasonDelayField(false);
            }
          });
        }
        else {
          AssignmentData[selectedSubType]?.Request_Details?.forEach(element => {
            if(element?.label?.includes("Reason For Delayed Submission")&&selectDate < todayDate){
              element.hide= false;
              setShowReasonDelayField(true);
            }
            else if(element?.label?.includes("Reason For Delayed Submission")&&selectDate >= todayDate){
              element.hide= true;
              setShowReasonDelayField(false);
            }
          });
        }
}
    }
  }
  const date_diff_indays = function (date1, date2) {
    const dt1 = new Date(date1);
    const dt2 = new Date(date2);
    return Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
    );
  };

  return (
    <>
      <Spin spinning={isLoading} fullscreen />
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
            data={ProductRelatedData[selectedSubType]?.BOE_Details}
            subType={selectedSubType}
            handleDropdownChange ={handleDropdownChange }
            ProductRelatedPortalLU={ProductRelatedPortalLU}
            customerQueryLU={customerQueryLU}
            handleDateChange={handleDateChange}
            disabledTime={disabledTime}
            toggleInputField={toggleInputField}
            showEmailAddress={showEmailAddress}
            showPhoneNumber={showPhoneNumber}
            showWhatsApp={showWhatsApp}
            requestModeLU={requestModeLU}
          ></DetailsForm>
            {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
          
          <div className="contact-details-btn">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="primary-btn"
                >
                  Submit
                </Button>{" "}
                {( loginInfo?.userProfileInfo?.profileObj?.role===1 ) && (
              <Button type="primary" className="primary-btn" onClick={()=>getRaiseRequirements()}>
                Raise Requirement
              </Button>
            )}
              </div>
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
        <RaiseRequirementPopup raiseRequerimentList={raiseRequerimentList} raiseRequirementOpen={raiseRequirementOpen} requirementModalLoader={requirementModalLoader} handleRequirementSubmit={handleRequirementSubmit} popupClose={popupClose} requirementsForm={requirementsForm}/>
    </>
  );
};

export default ProductRelated;