import React, { useState,useEffect } from "react";
import {useSelector } from "react-redux";

import { WebsiteData } from "../../mainconfig";
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
import RaiseRequirementPopup from '../RaiseRequirementPopup';


const Website = (props) => {
  const loginInfo = useSelector(state => state);

  const [form] = Form.useForm();
  const [requirementsForm] =  Form.useForm();
  const {selectedSubType, customerData,details,setSelectedSubType,websiteForm,websitePortalLU,clientEnquiryData,requestModeLU } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertData, setAlertData] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [isLoader,setIsLoader] = useState(false);

  const handleDropdownChange=(e,item)=>{
    let selectDropDownValue = e === 1 ? "navigation" : e ===2  ? "notresponsive" : e===3 ? "generalquery" : 1;
    setSelectedSubType(selectDropDownValue);
    //let selectDropDownValue = e ==="navigation" ? 3 : e ==="generalquery" ? 2 : e?.includes("notresponsive") ? 4 :  e?.includes("transactionnotperformedbycustomer") ? 5 : 1;
    websiteForm?.setFieldsValue({subType: e})
  }
  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };
  useEffect(()=>{
    if(props?.EmailResponse?.IsEmailmanagent){
      WebsiteData[selectedSubType]?.BOE_Details?.forEach(element => {
        if (element?.name === "requestchannel") {
            form.setFieldsValue({ requestchannel: 4 });
            element.disabled = true;
        }
    });
      if (!WebsiteData[selectedSubType]) {
        WebsiteData[selectedSubType] = {}; // Initialize if undefined
      }
      if (!Array.isArray(WebsiteData[selectedSubType]?.BOE_Details)) {
        WebsiteData[selectedSubType].BOE_Details = [];
        }
      
        // Remove existing instances of "Additional Note For Customer" before adding a new one
        WebsiteData[selectedSubType].BOE_Details = WebsiteData[selectedSubType].BOE_Details.filter(
            comment => comment.name !== "AdditionalNoteForCustomer"
        );
      
        // Add "Additional Note For Customer" once
        WebsiteData[selectedSubType].BOE_Details.push(
          {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 4000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
          });
    }
  },[selectedSubType])
  const handleSubmit = (values) => {
    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: loginInfo?.userProfileInfo?.profileObj?.role || 0, // Required
      RequestChannel: loginInfo?.userProfileInfo?.profileObj?.role === 14 ? 13 :  values.requestchannel,  // Required
      Category: 1,
      ApplicationNo:
      details?.policyDetails?.policyDetailsObj?.identifiers?.applicationNo ||customerData?.applicationNo,
      DOB: convertDate(customerData?.dob),
      PolicyNo: details?.policyDetails?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo, // Required
      CustomerId: 456,
      "CustRole":values.custRole,
      policyStatus:
      details?.policyDetails?.policyDetailsObj?.planAndStatus?.policyStatus || customerData?.policyStatus,
      proposerName: details?.policyDetails?.policyDetailsObj?.identifiers?.po_Name || customerData?.po_Name,
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
      "TransactionData": [
        { Status: "Create", TagName: "AdditionalNoteForCustomer", TagValue:values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "" },
        { Status: "Create", TagName: "requestchannel", TagValue:values?.requestchannel || "" },
        {
          "Status": "Create",
          "TagName": "Selectportalissue",
          "TagValue": values.Selectportalissue
      },
      {
        "Status": "Create",
        "TagName": "currentcontactNo",
        "TagValue": values.currentcontactNo
    },
    {
      "Status": "Create",
      "TagName": "UpdatecontactNo",
      "TagValue": values.UpdatecontactNo
  },
  {
    "Status": "Create",
    "TagName": "Comments",
    "TagValue": values.Comments
},
      ],
      "Uploads": [
        
      ],
     CommunicationRequest: [
        {
          SrvReqRefNo: "",
          TemplateID: "",
          CommType: 2,
          ReceipientTo: import.meta.env.VITE_APP_RECEIPIENT_TO ? import.meta.env.VITE_APP_RECEIPIENT_TO : clientEnquiryData?.rinternet,
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
          //   setNavigateTo("/advancesearch");
          //   setShowAlert(true);
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
  const onBlurInput = (value,item)=>{

  }

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
 if(raiseRequirementOpen){
      handleSubmit(formData);
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
            onBlurInput ={onBlurInput }
            data={WebsiteData[selectedSubType]?.BOE_Details}
            subType={selectedSubType}
            handleDropdownChange ={handleDropdownChange }
            websitePortalLU={websitePortalLU}
            requestModeLU={requestModeLU}
          ></DetailsForm>
          
          <div className="contact-details-btn">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="primary-btn"
                >
                  Submit
                </Button>{" "}
                {
                  loginInfo?.userProfileInfo?.profileObj?.role=== 1 &&
                  <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
                }
              </div>
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
    </>
  );
};

export default Website;