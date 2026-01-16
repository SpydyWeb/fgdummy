import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";

import { Form, Spin, Button, Row, Col, Checkbox, message,Tooltip,Modal } from "antd";
import { PolicyBondData } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import moment from "moment";
import UploadIcon from "../../assets/images/upload.png";
import ContactForm from "../../utils/ContactForm";
import CheckBoxList from "../../utils/CheckBoxList";
import apiCalls from "../../api/apiCalls";
import PopupAlert from "../popupAlert";
import dayjs from "dayjs";
import RaiseRequirementPopup from "../RaiseRequirementPopup";
import CloseIcon from "../../assets/images/close-icon.png";
import InternalFlowPOS from "../InternalFlow/InternalFlowPOS";
import InternalFlow from "../InternalFlow/InternalFlow";


const PolicyBond = (props) => {
  const loginInfo = useSelector((state) => state);
  //const loggedUser = useSelector(state => state?.userProfileInfo?.profileObj);
  const {
    selectedCallType,
    selectedSubType,
    clientRoleLU,
    setSelectedSubType,
    typesForm,
    details,
    customerData,
    selectedSubTypeId,
    SelectedSubTypeVal,
    POSContactData,
    clientEnquiryData,
    requestModeLU
  } = props;
  const suffix = <img src={UploadIcon} alt="" />;
  const [form] = Form.useForm();
  const [requirementsForm] = Form.useForm();
  const [internalReqForm] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showResonDelayField, setShowReasonDelayField] = useState(false);
  const [isShowPOSScreen, setIsShowPOSScreen] = useState(false);
  const [selectCheckBox, setSelectCheckBox] = useState(false);
  const [showNewSignatureFields, setShowNewSignatureFields] = useState(false);
  const [showSiganatureProcess, setShowSignatureProcess] = useState(false);
  const [showRaiseRequirementBtn, setShowRaiseRequirementBtn] = useState(false);
  const [showEmailFields, setShowEmailFields] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmailAddress, setShowEmailAddress] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [activeEmailIcons, setActiveEmailIcons] = useState([]);
  const [activeMobileIcons, setActiveMobileIcons] = useState([]);
  const [activeWhatsAppIcons, setActiveWhatsAppIcons] = useState([]);
  const [isRTOSelection, setIsRTOSelection] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertData, setAlertData] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [isProcessLink,setIsProcessLink] = useState(''); 
  const [isDocLink,setIsDocLink] = useState('');
  const [isShowStampPaperCharges,setIsShowStampPaperCharges] = useState(false);
  const [GCPDetailsData,setGCPDetailsData] = useState({
    dispatchDetailsData: [], deliveryDetailsData:[], rtoDetailsData:[]
  });
  const [isLoader,setIsLoader] = useState(false);
  const [isShowEmailMobileModal,setIsShowEmailMobileModal] = useState(false);
  const [isEmailMobileNoMessage,setIsEmailMobileNoMessage] = useState("");
  const [DisableSubmitBtn,setDisableSubmitBtn] = useState(false);
  const [isShowDOBRequestForms,setIsShowDOBRequestForms] = useState(false);
  const [isApproveButtonEnable,setIsApproveButtonEnable]=useState(false);
  const [InternaRequirements, setInternalFlowRequirements] = useState("");


  const setInternalReqData = () => {
    POSContactData.serviceRequestTransectionData?.forEach(element => {
       if(element.tagName === 'InternalRequirementValue'){
           
             setInternalFlowRequirements(props.interlRequirementTagValue);
       };
     });
 }



  const boeScreenObj = {

  }
  const posScreenLoanRepayObj = {
    authorizercomments:'',
    

  }


  const NBDuplicateObj ={}
  const NBPolicyBondHardCopyObj= {}

  const getInternal = (list) => {
    let values = form.getFieldsValue();
    POSActionsOnContactDetails(values, "INTERNAL", list);
}

  useEffect(() => {
    form.resetFields();
    setShowEmailFields(false);
    setActiveEmailIcons([]);
    setActiveMobileIcons([]);
    setActiveWhatsAppIcons([]);
    setInternalReqData();
    setCheckedList([]);
    setIsShowDOBRequestForms(false);
    getProcesLink();
    if(selectedSubType==="softcopyofpolicydocument"){
      form.setFieldsValue({
        'mobileNo': customerData?.mobileNo,
        'whatsAppNo':   customerData?.mobileNo,
        'emailId':  customerData?.emailID
      });

     

    }
    else if(selectedSubType==="uploadcustomeracknowledgement" || selectedSubType==="viewdispatchdetails"){
      getGCPPolicydetails();
    }

    if(selectedSubType === "duplicatebond" && details?.policyDetailsObj?.assigneeDetails?.isPolicyAssigned === 'Y'){
      setIsShowEmailMobileModal(true);
      //setAlertTitle("This Policy is  Assigned!");
      setAlertData("Request cannot be accepted from Assignor!");
      setShowAlert(true);
    }

  }, [selectedSubType]);

  useEffect(() => {
    if(POSContactData && customerData?.isPOS && selectedSubType==="duplicatebond"){
      POSContactData?.serviceRequestTransectionData?.forEach(element => {
        NBDuplicateObj[element.tagName] = element.tagValue
      });
      setIsShowPOSScreen(true);
      form.setFieldsValue({
        requestchannel: POSContactData?.reqMode,
        StampDutyChargesReceived:NBDuplicateObj?.StampDutyChargesReceived,
        RequestorComments: NBDuplicateObj?.RequestorComments,
        ValidateSignature:NBDuplicateObj?.ValidateSignature,
        CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
        BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
        ReasonForDelay: POSContactData?.reasonDelayed,
      })
      PolicyBondData[selectedSubType]?.POS_Details?.forEach(element => {
          if(element?.label?.includes("Reason For Delayed Submission")&&POSContactData?.reasonDelayed){
            element.hide= false;
            setShowReasonDelayField(true);
          }else {
            if(element?.label?.includes("Reason For Delayed Submission")&&!POSContactData?.reasonDelayed){
              element.hide= true;
              setShowReasonDelayField(true);
            }
          }
        });
      
    }
    else if(POSContactData && customerData?.isPOS && selectedSubType==="policybondhardcopynotreceived"){
      POSContactData?.serviceRequestTransectionData?.forEach(element => {
        NBPolicyBondHardCopyObj[element.tagName] = element.tagValue
      });

      setIsShowPOSScreen(true);
      form.setFieldsValue({
        PhysicalDispatchType:NBPolicyBondHardCopyObj?.PhysicalDispatchType,
        DispatchTo: NBPolicyBondHardCopyObj?.DispatchTo,
        ReasonForReprint:NBPolicyBondHardCopyObj?.ReasonForReprint,
        RequestorComments: NBPolicyBondHardCopyObj?.RequestorComments,
        ValidateSignature:NBPolicyBondHardCopyObj?.ValidateSignature,
        CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
        BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
        ReasonForDelay: POSContactData?.reasonDelayed,
      })
     
      PolicyBondData[selectedSubType]?.NBUser_Details?.forEach(element => {
          if(element?.label?.includes("Reason For Delayed Submission")&&POSContactData?.reasonDelayed){
            element.hide= false;
            setShowReasonDelayField(true);
          }else {
            if(element?.label?.includes("Reason For Delayed Submission")&&!POSContactData?.reasonDelayed){
              element.hide= true;
              setShowReasonDelayField(true);
            }
          }
        });

      
      
    }
    isButtonEnable();

    },[])
    useEffect(() => {
      if(props?.EmailResponse?.IsEmailmanagent){ 
      PolicyBondData[selectedSubType]?.Register_Request_Fields?.forEach(element => {
          if(element?.label==="Request Mode"){
            form.setFieldsValue({
              // requestchannel: "Email"
              requestchannel: 4
            });
            element.disabled=true;
          }
          if(element?.name ==="CustomerSigningDate"||element?.name ==="BranchReceivedDate"||element?.name ==="ValidateSignature"||element?.name ==="RequestForm"){
            element.hide = true;
          }
        });
        PolicyBondData[selectedSubType]?.RequestDuplicatePolicyBondFields?.forEach(element => {
          if(element?.label==="Request Mode"){
            form.setFieldsValue({
              // requestchannel: "Email"
              requestchannel: 4
            });
            element.disabled=true;
          }
          if(element?.name ==="UploadRequestForm"||element?.name ==="CustomerSigningDate"||element?.name ==="BranchReceivedDate"||element?.name ==="ValidateSignature"){
            element.hide = true;
          }
        });
        PolicyBondData[selectedSubType]?.BOE_Details?.forEach(element => {
          if(element?.name ==="CustomerSigningDate"||element?.name ==="BranchReceivedDate"||element?.name ==="ValidateSignature"){
            element.hide = true;
          }
        });  
        if (!PolicyBondData[selectedSubType]) {
          PolicyBondData[selectedSubType] = {}; // Initialize if undefined
        }
        //policybondhardcopy
        if (!Array.isArray(PolicyBondData[selectedSubType]?.Comments)) {
          PolicyBondData[selectedSubType].Comments = [];
      }
      // Remove existing instances of "Additional Note For Customer" before adding a new one
      PolicyBondData[selectedSubType].Comments = PolicyBondData[selectedSubType].Comments.filter(
          comment => comment.name !== "AdditionalNoteForCustomer"
      );
    
      // Add "Additional Note For Customer" once
      PolicyBondData[selectedSubType].Comments.push(
        {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 4000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
        });
        if(selectedSubType==="viewdispatchdetails"){
        if (!Array.isArray(PolicyBondData[selectedSubType]?.Additionalnoteforcustomer)) {
          PolicyBondData[selectedSubType].Additionalnoteforcustomer = [];
      }
      // Remove existing instances of "Additional Note For Customer" before adding a new one
      PolicyBondData[selectedSubType].Additionalnoteforcustomer = PolicyBondData[selectedSubType].Additionalnoteforcustomer.filter(
          comment => comment.name !== "AdditionalNoteForCustomer"
      );
    
      // Add "Additional Note For Customer" once
      PolicyBondData[selectedSubType].Additionalnoteforcustomer.push(
        {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 4000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
        });
      }
    // //uploadcustomeracknowlwedgement
    //     if (!Array.isArray(PolicyBondData[selectedSubType]?.BOE_Details)) {
    //       PolicyBondData[selectedSubType].BOE_Details = [];
    //   }
    //   // Remove existing instances of "Additional Note For Customer" before adding a new one
    //   PolicyBondData[selectedSubType].BOE_Details = PolicyBondData[selectedSubType].BOE_Details.filter(
    //       comment => comment.name !== "AdditionalNoteForCustomer"
    //   );
    
    //   // Add "Additional Note For Customer" once
    //   PolicyBondData[selectedSubType].BOE_Details.push(
    //     {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 4000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
    //     });

        //softcopypolicydocument
        if (!Array.isArray(PolicyBondData[selectedSubType]?.Send_SoftCopy_Fileds)) {
          PolicyBondData[selectedSubType].Send_SoftCopy_Fileds = [];
      }
      // Remove existing instances of "Additional Note For Customer" before adding a new one
      PolicyBondData[selectedSubType].Send_SoftCopy_Fileds = PolicyBondData[selectedSubType].Send_SoftCopy_Fileds.filter(
          comment => comment.name !== "AdditionalNoteForCustomer"
      );
    
      // Add "Additional Note For Customer" once
      PolicyBondData[selectedSubType].Send_SoftCopy_Fileds.push(
        {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 4000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
        });

        //duplicatebond
        if (!Array.isArray(PolicyBondData[selectedSubType]?.RequestDuplicatePolicyBondFields)) {
          PolicyBondData[selectedSubType].RequestDuplicatePolicyBondFields = [];
      }
      // Remove existing instances of "Additional Note For Customer" before adding a new one
      PolicyBondData[selectedSubType].RequestDuplicatePolicyBondFields = PolicyBondData[selectedSubType].RequestDuplicatePolicyBondFields.filter(
          comment => comment.name !== "AdditionalNoteForCustomer"
      );
    
      // Add "Additional Note For Customer" once
      PolicyBondData[selectedSubType].RequestDuplicatePolicyBondFields.push(
        {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 4000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
        });
      
      
      
      }
     },[selectedSubType])

    const featuredatedisabled = (current) => {
      return current && current < dayjs().startOf("day");
  };

  const isButtonEnable=()=>{
   let data=POSContactData?.serviceRequestTransectionData?.find((item)=>{
    return item.ValidateSignature==="yes"
   })
   if(data){
    setIsApproveButtonEnable(false)
   }
   else{
    setIsApproveButtonEnable(true)
   }
   
  }

  let internalData=[
    { name: "authorizercomments",label: "Authorizer Comments ",inputType: "text",required: false,disabled:true,placeholder:"Authorizer Comments" },
    { name: "Comments",label: "Requestor Comments" ,inputType: "textarea", maxlength:500,required: false,validationmsg: "Enter Comments",placeholder:"Requestor Comments" },
    {name:"uploaddocuments",indexName:"Upload Documents",label:"Upload Documents",inputType:"upload",placeholder:"Upload Documents"},
    {name:"viewRequirements",indexName:"View Requirements",label:"View Requirements",inputType:"button", placeholder:"View Requirements"}
    
  ]
  useEffect(()=>{
    if(customerData?.isInternalFlow){
      POSContactData?.serviceRequestTransectionData?.forEach(element => {
        posScreenLoanRepayObj[element.tagName] = element.tagValue
      });
      form.setFieldsValue({
        authorizercomments:posScreenLoanRepayObj?.authorizercomments,
      })
    }
    setInternalReqData();
  },[])

const handleDateChange1 =()=>{

}
  const handleChange = (value) => {
    setShowPhoneNumber(false);
    setShowEmailAddress(false);
    setShowWhatsApp(false);
    setActiveEmailIcons([]);
    setActiveMobileIcons([]);
    setActiveWhatsAppIcons([]);
    // If the checkbox is already checked, uncheck it
    if (checkedList.includes(value)) {
      setCheckedList([]);
    } else {
      // Otherwise, check it
      setCheckedList([value]);
    }
    if (value?.includes("Send Soft Copy")) {
      setSelectedSubType("softcopyofpolicydocument");
      typesForm?.setFieldsValue({ subType: 2 });
    }
    else if(((selectedSubType==="duplicatebond"||selectedSubType==="policybondhardcopynotreceived")&& value?.includes("View Dispatch Details"))){
      getGCPPolicydetails();
    }
  };

  const handleDropdownChange = (e, item) => {
    if (item?.label?.includes("RTO Status")) {
      setIsRTOSelection(e);
    }
  };
  const handleTextLink = (item) => {
    if(item?.label?.includes("View Stamp Duty Charges")){
      setIsShowStampPaperCharges(true);
    }
    if (item?.linkValue?.toLowerCase() === "view") {
          const gConfig= apiCalls.getGenericConfig()
          if(gConfig?.data?.dmsApiUrl){
      const url =  gConfig?.data?.dmsApiUrl + `/omnidocs/WebApiRequestRedirection?Application=BPMPOLENQ&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${details?.policyDetailsObj?.identifiers?.applicationNo}`;
      window.open(url, "_blank");
          }
    }
  };

  const handleTitleCheckBox = (e, item) => {
    setSelectCheckBox(false);
    setShowNewSignatureFields(false);
    setShowSignatureProcess(false);
    if (item?.label?.includes("Update New Signature")) {
      setSelectCheckBox(item.name);
      setShowNewSignatureFields(true);
    } else if (item?.label?.includes("Share Signature Update Process")) {
      setShowSignatureProcess(true);
      setSelectCheckBox(item.name);
    }
  };
  const toggleInputField = (field, item, index) => {
    setShowEmailFields(true);
    switch (field) {
      case "phone":
        setShowPhoneNumber(!showPhoneNumber);
        setActiveMobileIcons((prevIcons) => {
          const newIcons = [...prevIcons];
          if (newIcons[index]) {
            // If the icon is already unchecked, remove its index from the array
            const indexToRemove = newIcons.indexOf(true);
            if (indexToRemove !== -1) {
              newIcons.splice(indexToRemove, 1);
            }
          } else {
            // If the icon is checked, update the array as before
            newIcons.fill(false); // Disable all email icons
            newIcons[index] = !newIcons[index]; // Enable the clicked email icon
          }
          return newIcons;
        });
        break;
      case "email":
        setShowEmailAddress(!showEmailAddress);
        setActiveEmailIcons((prevIcons) => {
          const newIcons = [...prevIcons];
          if (newIcons[index]) {
            // If the icon is already unchecked, remove its index from the array
            const indexToRemove = newIcons.indexOf(true);
            if (indexToRemove !== -1) {
              newIcons.splice(indexToRemove, 1);
            }
          } else {
            // If the icon is checked, update the array as before
            newIcons.fill(false); // Disable all email icons
            newIcons[index] = !newIcons[index]; // Enable the clicked email icon
          }
          return newIcons;
        });
        break;
      case "whatsapp":
        setShowWhatsApp(!showWhatsApp);
        setActiveWhatsAppIcons((prevIcons) => {
          const newIcons = [...prevIcons];
          if (newIcons[index]) {
            // If the icon is already unchecked, remove its index from the array
            const indexToRemove = newIcons.indexOf(true);
            if (indexToRemove !== -1) {
              newIcons.splice(indexToRemove, 1);
            }
          } else {
            // If the icon is checked, update the array as before
            newIcons.fill(false); // Disable all email icons
            newIcons[index] = !newIcons[index]; // Enable the clicked email icon
          }
          return newIcons;
        });
        break;
      default:
        break;
    }
  };

  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };

  const handleUploadLink = () => {};

  const getProcesLink = () => {
    setIsProcessLink('');
    setIsDocLink('')
    let obj = {
      "Call_Typ" : selectedCallType,
      "Sub_Typ":selectedSubTypeId
  }
    let response = apiCalls.getProcesLink(obj);
    response
      .then((val) => {
        if (val?.data) {
        
          const filteredData = val?.data?.filter((ele) =>{
            if(ele.docType === "AcceptableDocs"){
              setIsDocLink(ele.link);
            }else if(ele.docType === SelectedSubTypeVal){
              setIsProcessLink(ele.link)
            }
            return ele.docType
          });
  
  
          //setIsProcessNameLU(processedData);
        } else {
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
       
      });
  };
  const getClientEnquiry = (e)=>{
        let obj = {
          clientNumber: customerData?.poClientID
    };
    let response = apiCalls.getClientEnquiry(obj,loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID);
    response
      .then((val) => {
        if (val?.data) {
          const res = val?.data?.responseBody
         if(selectedSubType === 'duplicatebond'||selectedSubType==="policybondhardcopynotreceived"){
       const address =[
        res?.cltaddR01,
        res?.cltaddR02,
        res?.cltaddR03,
        res?.cltaddR04,
        res?.cltaddR05,
        res?.cltpcode,
        res?.ctrycode,
      ].filter(Boolean).join(', ');

            form.setFieldsValue({
              Address: address,
              CustomerAddress: address
    
            });
           // return address;
          }
        } else {
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
        setIsLoading(false);
      });
  }

  const getGCPPolicydetails = () => {
    setIsLoading(true);
    let response = apiCalls.getFreeLookDetailsApi(import.meta.env.VITE_APP_ENVIRONMENT == "UAT" ? import.meta.env.VITE_APP_GCP_POLICY_NO : customerData?.policyNo);
    response
      .then((val) => {
        if (val?.data?.statusCode==="200") {
          let maxDate = new Date(0);
          let maxRecord = null;
          // Iterate over the JSON data to find the record with the maximum date
          val?.data?.response?.dispatch_details?.forEach(item => {
            // Extract day, month, and year from the date string
            if(item?.dispatchdate){
            const dateParts = item?.dispatchdate?.split('-'); // Change '/' to '-' assuming your date format is "YYYY-MM-DD"
            const year = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10) - 1; // Subtract 1 because months are zero-indexed
            const day = parseInt(dateParts[2], 10);
            const currentDate = new Date(year, month, day);
          
            if (currentDate > maxDate) {
              maxDate = currentDate;
              maxRecord = item;
            }
          }
          });
          let dispatchDetails = maxRecord;
          const response= val?.data?.response?.applicationAttribute[0];
         // const dispatchDetails= val?.data?.response?.dispatch_details[0];
         setGCPDetailsData({
          dispatchDetailsData: val?.data?.response?.dispatch_details || [],
          deliveryDetailsData: val?.data?.response?.delivery_details || [],
          rtoDetailsData: val?.data?.response?.rto_details || []
        });
          setIsLoading(false);
          if(selectedSubType==="duplicatebond"){
            form.setFieldsValue({
              DispatchDate: dispatchDetails?.dispatchdate ? convertDate(dispatchDetails?.dispatchdate) : null,
              DispatchMode:dispatchDetails?.dispatchmode,
              PODNo: dispatchDetails?.policybondpodnumber,
              ReceivedOn:dispatchDetails?.policybondreceiveddate ? convertDate(dispatchDetails?.policybondreceiveddate) : null,
              ReceivedBy: dispatchDetails?.policybondreceivedby,
              Address: getClientEnquiry(),
              WelcomeCallDispositon: dispatchDetails?.welcomecalldisposition,
              RTOStatus: dispatchDetails?.rtostatus,
              RTOReason: dispatchDetails?.rtoreason,
              PolicyRedispatch:dispatchDetails?.policyredispatch,
              RedispatchMode: dispatchDetails?.policyredispatchmode,
              RedispatchDate:dispatchDetails?.policyredispatchdate ? convertDate(dispatchDetails?.policyredispatchdate) : null,
              RePODNo:dispatchDetails?.policyredispatchpodnumber,
              ReReceivedBy:dispatchDetails?.policyredispatchreceivedby,
              SentToBranch:dispatchDetails?.policybondsenttobranch,
              BranchName:dispatchDetails?.policybondbranch,
            })
          }
          else if(selectedSubType==="policybondhardcopynotreceived"){
            form?.setFieldsValue({
              WelcomeCallDispositon: response?.welcomecalldisposition,
              CustomerAddress: getClientEnquiry(),
              DispatchDate: dispatchDetails?.dispatchdate ? convertDate(dispatchDetails?.dispatchdate) : null,
              DispatchMode: dispatchDetails?.dispatchmode,
              PODNo: dispatchDetails?.awbnumber,
              ReceivedOn:dispatchDetails?.deliverydate ? convertDate(dispatchDetails?.deliverydate) : null,
              ReceivedBy:dispatchDetails?.policybondreceivedby,
              RTOStatus: dispatchDetails?.rtostatus,
            })
          }
          else if(selectedSubType==="uploadcustomeracknowledgement"){
           form.setFieldsValue({
            SentToBranch:response?.policybondsenttobranch,
            BranchName:response?.policybondbranch
           })
          }
          setIsLoading(false);
        } else {
          setIsLoading(false);
          message.error({
            content:
              val?.data?.statusMessage ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
       
      })
      .catch((err) => {
       
      });
  };

  const handleRadioChange = (e, item) => {
    setShowRaiseRequirementBtn(false);
  
    if(e.target.value === "no"&&item?.label?.includes("Validate Signature")){
      setShowRaiseRequirementBtn(true);
      setDisableSubmitBtn(true)
    }
    else if(e.target.value === "yes"&&item?.label?.includes("Validate Signature")){
      setShowRaiseRequirementBtn(false);
      setDisableSubmitBtn(false)
    }
   
  };
  const date_diff_indays = function (date1, date2) {
    const dt1 = new Date(date1);
    const dt2 = new Date(date2);
    return Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
    );
  };
  const handleDateChange = (date, item) => {
    if(item === "CustomerSigningDate" && selectedSubType ===" policybondhardcopynotreceived" ){
     // Assuming 'date' is a valid date string
const oneYearLater = dayjs(date).add(1, 'year').toDate();
// Format the calculated date to YYYY-MM-DD
const formattedDate = dayjs(oneYearLater).format('YYYY-MM-DD');
form.setFieldsValue({
  COEValidFrom: dayjs(date),
  COEValidTo:  dayjs(formattedDate).subtract(1, 'day'),
});
    }
    setShowReasonDelayField(false);
    if (item === "branchreceiveddate" || item === "RequestDateTime"||item==="BranchReceivedDate") {
      let newDate = new Date();
      let todayDate = moment(newDate).format("MM/DD/YYYY");
      let selectDate = moment(date + 1).format("MM/DD/YYYY");
      const formFeilds = form.getFieldsValue();
      let customerSignDate = moment(formFeilds?.CustomerSigningDate + 1).format( "MM/DD/YYYY");
      let dateDiffence = date_diff_indays(selectDate, customerSignDate);
      if (!formFeilds?.CustomerSigningDate || dateDiffence > 0) {
        message.destroy();
        message.error({
          content:
            "Request Received Date can't be before the customer signing date.",
          className: "custom-msg",
          duration: 3,
        });
        form.setFieldsValue({ 
          branchreceiveddate: "",
          BranchReceivedDate: ""
        });
        return;
      } else {
        if(selectedSubType==="duplicatebond"){
        PolicyBondData[selectedSubType]?.RequestDuplicatePolicyBondFields?.forEach((element) => {
          if (
            element?.label?.includes("Reason For Delayed Submission") &&
            selectDate < todayDate
          ) {
            element.hide = false;
            setShowReasonDelayField(true);
          } else if (
            element?.label?.includes("Reason For Delayed Submission") &&
            selectDate >= todayDate
          ) {
            element.hide = true;
            setShowReasonDelayField(false);
          }          
        });
      }
        else if(selectedSubType==="policybondhardcopynotreceived"){
        PolicyBondData[selectedSubType]?.Register_Request_Fields?.forEach((element) => {
          if (
            element?.label?.includes("Reason For Delayed Submission") &&
            selectDate < todayDate
          ) {
            element.hide = false;
            setShowReasonDelayField(true);
          } else if (
            element?.label?.includes("Reason For Delayed Submission") &&
            selectDate >= todayDate
          ) {
            element.hide = true;
            setShowReasonDelayField(false);
          }
        });
      }
      else if(selectedSubType==="uploadcustomeracknowledgement"){
        PolicyBondData[selectedSubType]?.BOE_Details?.forEach((element) => {
          if (
            element?.label?.includes("Reason For Delayed Submission") &&
            selectDate < todayDate
          ) {
            element.hide = false;
            setShowReasonDelayField(true);
          } else if (
            element?.label?.includes("Reason For Delayed Submission") &&
            selectDate >= todayDate
          ) {
            element.hide = true;
            setShowReasonDelayField(false);
          }
        });
      }
      }
    }
  };
  const getUploadFiles = (listOfUploadFiles) => {
    // const updatedUploadList = listOfUploadFiles?.map((obj) => {
    //   // Create a new object without the propertyToDelete property
    //   const { labelName, ...newObject } = obj;
    //   return newObject;
    // });
    // Update the state with the new list
    setUploadFiles(listOfUploadFiles);
  };
  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day"); // Can not select days before today and today
  };
  const handleLabelLink =()=>{

  }
  //commonly render all forms
  const renderDetailsForm = (formType) => {
    return (
      <DetailsForm
        data={PolicyBondData[selectedSubType]?.[formType]}
        subType={selectedSubType}
        suffix={!isShowPOSScreen && suffix}
        handleUploadLink={handleUploadLink}
        form={form}
        handleRadioChange={handleRadioChange}
        handleDateChange={handleDateChange}
        handleTextLink={handleTextLink}
        handleTitleCheckBox={handleTitleCheckBox}
        clientRoleLU={clientRoleLU}
        handleDropdownChange={handleDropdownChange}
        selectCheckBox={selectCheckBox}
        toggleInputField={toggleInputField}
        activeEmailIcons={activeEmailIcons}
        activeMobileIcons={activeMobileIcons}
        activeWhatsAppIcons={activeWhatsAppIcons}
        getUploadFiles={getUploadFiles}
        disabledDate={disabledDate}
        handleLabelLink={handleLabelLink}
        featuredatedisabled={featuredatedisabled}
        handleDateChange1={handleDateChange1}
        requestModeLU={requestModeLU}
        onBlurInput={onBlurInput}
      ></DetailsForm>
    );
  };

  const onBlurInput =()=>{}

  const getTransactionData = (values) => {
    
    if (selectedSubType === "policybondhardcopynotreceived") {
      return [
        {
          "Status": "Create",
          "TagName": "AdditionalNoteForCustomer",
          "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",
      },
        {
          Status: "Create",
          TagName: "WelcomeCallDispositon",
          TagValue: values?.WelcomeCallDispositon||"",
        },
        {
          Status: "Create",
          TagName: "PODNo",
          TagValue: values?.PODNo||"",
        },

        {
          Status: "Create",
          TagName: "ReceivedBy",
          TagValue: values?.ReceivedBy||"",
        },
        {
          Status: "Create",
          TagName: "ReceivedOn",
          TagValue: values?.ReceivedOn||"",
        },
        {
          Status: "Create",
          TagName: "DispatchDate",
          TagValue: values?.DispatchDate||"",
        },
        {
          Status: "Create",
          TagName: "CustomerAddress",
          TagValue: values?.CustomerAddress||"",
        },
        {
          Status: "Create",
          TagName: "DispatchMode",
          TagValue: values?.DispatchMode||"",
        },
        {
          Status: "Create",
          TagName: "RTOStatus",
          TagValue: values?.RTOStatus||"",
        },
        {
          Status: "Create",
          TagName: "PhysicalDispatchType",
          TagValue: values?.PhysicalDispatchType||"",
        },
        {
          Status: "Create",
          TagName: "DispatchTo",
          TagValue: values?.DispatchTo||"",
        },
        {
          Status: "Create",
          TagName: "ReasonForReprint",
          TagValue: values?.ReasonForReprint||"",
        },
  { Status: "Create", TagName: "requestchannel", TagValue: values?.requestchannel || ""},
        {
          Status: "Create",
          TagName: "RequestorComments",
          TagValue: values?.RequestorComments||"",
        },
        { Status: "Create", TagName: "ValidateSignature", TagValue: values?.ValidateSignature || ""},

      ];
    } else if (selectedSubType === "uploadcustomeracknowledgement") {
      return [
        {
          "Status": "Create",
          "TagName": "AdditionalNoteForCustomer",
          "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",
      },
        { Status: "Create", TagName: "requestchannel", TagValue: values?.requestchannel || ""},
        { Status: "Create", TagName: "SentToBranch", TagValue: values?.SentToBranch ||"" },
        { Status: "Create", TagName: "BranchName", TagValue: values?.BranchName || ""},
        { Status: "Create", TagName: "RequestorComments", TagValue: values?.RequestorComments || ""},
        {Status: "Create",TagName: "Client_Id","TagValue": customerData?.poClientID},
        { Status: "Create", TagName: "DocLink", TagValue:isDocLink },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink},
        {Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER"}
      ];
    }
    else if (selectedSubType === "duplicatebond") {
      return [
        {
          "Status": "Create",
          "TagName": "AdditionalNoteForCustomer",
          "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",
      },
      { Status: "Create", TagName: "requestchannel", TagValue: values?.requestchannel},
        { Status: "Create", TagName: "DispatchDate", TagValue: values?.DispatchDate ||"" },
        { Status: "Create", TagName: "DispatchMode", TagValue: values?.DispatchMode || ""},
        { Status: "Create", TagName: "PODNo", TagValue: values?.PODNo ||"" },
        { Status: "Create", TagName: "ReceivedOn", TagValue: values?.ReceivedOn || ""},
        { Status: "Create", TagName: "ReceivedBy", TagValue: values?.ReceivedBy ||"" },
        { Status: "Create", TagName: "Address", TagValue: values?.Address || ""},
        { Status: "Create", TagName: "WelcomeCallDispositon", TagValue: values?.WelcomeCallDispositon ||"" },
        { Status: "Create", TagName: "RTOStatus", TagValue: values?.RTOStatus || ""},
        { Status: "Create", TagName: "RTOReason", TagValue: values?.RTOReason ||"" },
        { Status: "Create", TagName: "PolicyRedispatch", TagValue: values?.PolicyRedispatch || ""},
        { Status: "Create", TagName: "RedispatchMode", TagValue: values?.RedispatchMode ||"" },
        { Status: "Create", TagName: "RedispatchDate", TagValue: values?.RedispatchDate || ""},
        { Status: "Create", TagName: "RePODNo", TagValue: values?.RePODNo ||"" },
        { Status: "Create", TagName: "ReReceivedBy", TagValue: values?.ReReceivedBy ||"" },
        { Status: "Create", TagName: "SentToBranch", TagValue: values?.SentToBranch ||"" },
        { Status: "Create", TagName: "BranchName", TagValue: values?.BranchName ||"" },
        { Status: "Create", TagName: "ViewStampDutyCharges", TagValue: values?.ViewStampDutyCharges ||"" },
        { Status: "Create", TagName: "StampDutyChargesReceived", TagValue: values?.StampDutyChargesReceived ||"" },
        { Status: "Create", TagName: "ValidateSignature", TagValue: values?.ValidateSignature ||"" },
        { Status: "Create", TagName: "RequestorComments", TagValue: values?.RequestorComments || ""},
        {Status: "Create",TagName: "Client_Id","TagValue": customerData?.poClientID},
        { Status: "Create", TagName: "DocLink", TagValue:isDocLink },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink},
        {Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER"}
      ];
    }
    else if (selectedSubType === "softcopyofpolicydocument") {
      return [
        {
          "Status": "Create",
          "TagName": "AdditionalNoteForCustomer",
          "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",
      },
        {Status: "Create", TagName: "Template", TagValue: "POLICYBOND"}
      ];
    }
    else if (selectedSubType === "viewdispatchdetails") {
      return [
        {
          "Status": "Create",
          "TagName": "AdditionalNoteForCustomer",
          "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",
      },
       { Status: "Create", TagName: "requestchannel", TagValue: values?.requestchannel || ""},
        {
          Status: "Create",
          TagName: "RequestorComments",
          TagValue: values?.RequestorComments||"",
        },

        {
          Status: "Create",
          TagName: "RequestorComments",
          TagValue: values?.RequestorComments||"",
        },

      ];
    }

  };

  const handleSubmit = (values) => {
    if (!showEmailFields && selectedSubType === "softcopyofpolicydocument") {
      message.destroy();
      message.warning({
        content: "Please select atleast one communication.",
        className: "custom-msg",
        duration: 2,
      });
      return;
    }
    else {
      if (POSContactData && customerData?.isPOS) {
        POSActionsOnContactDetails(values, "APPROVED");
      } else if (selectedSubType){
          // getRaiseRequirements();
          saveRequest(values)
        }else{
          saveRequest(values);
        }
    };
    }
   
 
  const saveRequest =(values)=>{
    if(values.CustomerSigningDate > values.BranchReceivedDate){
      message.destroy();
      message.error({
        content: " customer signing date  can't be greater than  Request Received Date.",
        className: "custom-msg",
        duration: 3,
      });
      form.setFieldsValue({
        CustomerSigningDate: "",
      
      })
      setIsLoader(false);
      return
    }
    setIsLoading(true);
    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: loginInfo?.userProfileInfo?.profileObj?.role || 0, // Required
      RequestChannel: loginInfo?.userProfileInfo?.profileObj?.role === 14 ? 13 :  values.requestchannel,  // Required
      Category: (selectedSubType==="uploadcustomeracknowledgement") || selectedSubType==="viewdispatchdetails" ||
      (selectedSubType==="policybondhardcopynotreceived"&&checkedList?.includes("View Dispatch Details")) ? 1 : 
      ((selectedSubType==="policybondhardcopynotreceived")||selectedSubType === "softcopyofpolicydocument") || selectedSubType === "duplicatebond" || raiseRequirementOpen ? 2 : 3,
      ApplicationNo:
        details?.policyDetailsObj?.identifiers?.applicationNo ||
        customerData?.applicationNo,
      DOB: convertDate(customerData?.dob),
      PolicyNo:
        details?.policyDetailsObj?.identifiers?.policyNo ||
        customerData?.policyNo, // Required
      CustomerId: 456,
      CustRole: values.custRole,
      policyStatus:
        details?.policyDetailsObj?.planAndStatus?.policyStatus ||
        customerData?.policyStatus,
      proposerName:
        details?.policyDetailsObj?.identifiers?.po_Name ||
        customerData?.po_Name,
      plan:
        details?.policyDetailsObj?.planAndStatus?.planName ||
        customerData?.planName,
      CreatedOn: new Date(),
      CreatedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
      CreatedUsrId: loginInfo?.userProfileInfo?.profileObj?.userName,
      ModifiedOn: new Date(),
      ModifiedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
      AssignedToRole: "", //POS
      AssignedByUser: 0,
      ReasonForChange: "",
      RequestDateTime: values?.BranchReceivedDate
      ? new Date(values?.BranchReceivedDate)
      : new Date(),
      ReasonDelayed: values?.ReasonForDelay,
      CustSignDateTime: values?.CustomerSigningDate
        ? new Date(values?.CustomerSigningDate)
        : new Date(),
      TransactionData: getTransactionData(values) || [],
      CurrentStatus:raiseRequirementOpen? "Reject":'',
      Uploads: uploadFiles || [],
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
    };
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
          //   let successMessage =
          //     val?.data?.tat > 0
          //       ? `Ticket ID Number ${val?.data?.srvReqRefNo
          //       }. Your request will be processed in ${val?.data?.tat || 0
          //       } days`
          //       : `Ticket ID Number ${val?.data?.srvReqRefNo}.`;
          //   setAlertData(successMessage);
          // } else {
          //   setAlertTitle("Query Raised Successfully");
          //   let successMessage = `Ticket ID Number ${val?.data?.srvReqRefNo}.`;
          //   setAlertData(successMessage);
          // }
          // setNavigateTo("/advancesearch");
          // setShowAlert(true);

          // message.success({
          //   content: "Contact Details Updated Successfully",
          //   className: "custom-msg",
          //   duration: 3,
          // });
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

  const getPOSTransactionData = (values,seletedRequerimentList) => {
    if (selectedSubType === "duplicatebond") {
      return [
        { Status: "Update", TagName: "DispatchDate", TagValue: values?.POSDispatchDate},
        { Status: "Update", TagName: "DispatchDate", TagValue: values?.POSDispatchDate},
        { Status: "Update", TagName: "AWBNumber", TagValue: values?.POSAWBNumber },
        // { Status: "Update", TagName: "Comments", TagValue: values?.Comments },
        { Status: "Create", TagName: "CourierName", TagValue: values?.POSCourierName || ""},
        { Status: "Create", TagName: "authorizercomments", TagValue: values?.AuthorizerComments|| ""},
        {
          "Status": "create",
          "TagName": "InternalRequirementValue",
          "TagValue":JSON.stringify(seletedRequerimentList)
      },
      ];
    } 
    else if (selectedSubType === "policybondhardcopynotreceived") {
      return [
     
            {
              "Status": "create",
              "TagName": "InternalRequirementValue",
              "TagValue":JSON.stringify(seletedRequerimentList)
          },
        { Status: "Create", TagName: "authorizercomments", TagValue: values?.AuthorizerComments || ""},
      ];
    } 
  };

  const POSActionsOnContactDetails = (values, status,list) => {

        let seletedRequerimentList = raiseRequerimentList
      ?.filter((e) => e.status === true)
      ?.map((e) => e.raiseReqId);
      let reqFormValues = requirementsForm?.getFieldsValue();
      let internalFormValues = internalReqForm?.getFieldsValue();
      if(((seletedRequerimentList?.length===0 && !reqFormValues?.PosOtherReq) && status === 'REJECTED') || ((seletedRequerimentList.length===0 && !internalFormValues?.PosInternalReq)&& status === 'INTERNAL')){
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

    if(seletedRequerimentList?.length > 0  && status === 'APPROVED'){
      status = 'REJECTED'
    }
    if(status==='INTERNAL'){
      seletedRequerimentList=list
    }
    let obj = {
      TransectionId: 1,
      SrvReqRefNo: POSContactData?.srvReqRefNo,
      Status: status,
      RequirementList: seletedRequerimentList,
      UsrID: loginInfo?.userProfileInfo?.profileObj?.userName,
      RoleID: loginInfo?.userProfileInfo?.profileObj?.role,
      // "RequirementComments":requirementCmnt,
      POSComments1: values?.AuthorizerComments,
      Comments: values?.AuthorizerComments || "",
      TransactionPayload:  getPOSTransactionData(values,seletedRequerimentList) || [],
    };
     obj?.TransactionPayload?.push({
      Status: "Create",
      TagName: "POSComments1",
      TagValue: values?.AuthorizerComments || "",
    });
     if(isShowPOSScreen){
    obj.TransactionPayload.push({
        "Status": "Create",
        "TagName": "PosOtherReq",
        "TagValue": reqFormValues?.PosOtherReq || ""
      });
    }
    if(status==='INTERNAL'){
            obj.TransactionPayload.push({
            "Status": "create",
            "TagName": "PosInternalReq",
            "TagValue": internalFormValues?.PosInternalReq || ""
        })
    }
    setIsLoading(true);
    let response = apiCalls.POSActionsOnContactDetails(obj);
    response
      .then((val) => {
        if (val?.data) {
          // setAlertTitle(status==="REJECTED"?"Requirement Raised":"Request Approved");
          
          if(status === "REJECTED"){
            setAlertTitle("Requirement Raised");
          } else if(status === "APPROVED"){
            setAlertTitle("Request Approved");
          } else if(status === "INTERNAL"){
            setAlertTitle("Ticket Re-assigned to User Successfully")
          }

          setNavigateTo(
            (showRaiseRequirementBtn && "/advancesearch") || "/dashboard"
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
  const getRaiseRequirements = () =>
    {
        setRaiseRequirementOpen(true);
        setRequirementLoader(true);

        let roleID = 0;
        if (selectedCallType === 19)
        {
            roleID = loginInfo?.userProfileInfo?.profileObj?.role
        }
        else
        {
            roleID = loginInfo?.userProfileInfo?.profileObj?.role === 1 ? 1 : 0
        }
        let obj = {
         calltype: props?.selectedCallType,
         subtype: props?.selectedSubTypeId,
         Role: roleID,
       };
    let response = apiCalls.getRaiseRequirements(obj);
    response
      .then((val) => {
           if (val?.data) {
            const itemCount = roleID === 11 ? 2 : val.data.length;
            const limitedList = val.data.slice(0, itemCount);
            setRaiseRequerimentList(limitedList);
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
  }

  const handleRequirementSubmit = () => {
    const formData = form.getFieldValue();
    //     setRequirementLoader(true);
     if(raiseRequirementOpen){
          handleSubmit(formData);
        }
  };
  const popupClose = () => {
    setRaiseRequerimentList([]);
    setRaiseRequirementOpen(false);
  };

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
          {
             customerData?.isInternalFlow?
             <>
             <InternalFlow data={internalData}
              suffix={!isShowPOSScreen && suffix}
              policyDetails={props?.policyDetails?.policyDetailsObj?.identifiers?.applicationNo}
              form={form}
              customerData={customerData}
              POSContactData={POSContactData}
              boeScreenObj={boeScreenObj}
              InternalRequirements = {InternaRequirements}
              Docs = {InternaRequirements}
             />
  
              </>
             :
             <>
               {selectedSubType === "policybondhardcopynotreceived" && (
            <>
              {!isShowPOSScreen && (
                <>
                     <>
                      {renderDetailsForm("Register_Request_Fields")}
                     
                      {renderDetailsForm("Comments")}
                    </>
                  {checkedList?.includes("View Dispatch Details") && (
                    <>
                      {renderDetailsForm("View_Dispatch_Details")}
                      {isRTOSelection === "yes" && (
                        <>{renderDetailsForm("RTO_StatusFields")}</>
                      )}
                    </>
                  )}
                  {checkedList?.includes("Send Soft Copy") && (
                    <>
                      {renderDetailsForm("Send_SoftCopy_Fileds")}
                      {showEmailFields && (
                        <>
                          <ContactForm
                            showEmailAddress={showEmailAddress}
                            showPhoneNumber={showPhoneNumber}
                            showWhatsApp={showWhatsApp}
                          />
                        </>
                      )}
                      <DetailsForm
                        data={PolicyBondData[selectedSubType]?.Comments}
                        subType={selectedSubType}
                      ></DetailsForm>
                    </>
                  )}
                </>
              )}
              {isShowPOSScreen && <>{renderDetailsForm("NBUser_Details")}</>}
                  <div className="contact-details-btn">
             
           <Button type="primary" className="primary-btn" htmlType="submit" 
            disabled={(isShowPOSScreen && !isApproveButtonEnable) || DisableSubmitBtn}
            >
              {!isShowPOSScreen
                ? "Submit"
                : "Approve"}
            </Button>
                        <Button
                          type="primary"
                          className="primary-btn"
                          onClick={() => getRaiseRequirements()}
                        >
                          Raise Requirement
            </Button>
            {
                  isShowPOSScreen &&
                  <>
                          <InternalFlowPOS interlRequirementTagValue1 = {props.interlRequirementTagValue} selectedList = {POSContactData.serviceRequestTransectionData} getInternal = {getInternal} internalReqForm={internalReqForm}/>
                        </>
                }
                  </div>
              
              
            </>
          )} 

          {/* {selectedSubType==="viewdispatchdetails"&&<>
          {renderDetailsForm("BOE_Details")}
          {renderDetailsForm("RTOYesStatusFields")}
          <div className="contact-details-btn">
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit"
                >
                  {!isShowPOSScreen ? "Submit" : "Approve"}
                </Button>
                </div>
          </>} */}

          {selectedSubType === "softcopyofpolicydocument" && (
            <>
              {renderDetailsForm("Send_SoftCopy_Fileds")}
              {showEmailFields && (
                <>
                  <ContactForm
                    showEmailAddress={showEmailAddress}
                    showPhoneNumber={showPhoneNumber}
                    showWhatsApp={showWhatsApp}
                  />
                </>
              )}
              <div className="contact-details-btn">
                {/* {!showRaiseRequirementBtn && (
              <> */}
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit"
                >
                  {!isShowPOSScreen ? "Submit" : "Approve"}
                </Button>
                {/* </>
            )} */}

                {/* {(isShowPOSScreen || !isShowPOSScreen) && (
                  <>
                    <Button
                      type="primary"
                      className="primary-btn"
                      onClick={() => getRaiseRequirements()}
                    >
                      Raise Requirement
                    </Button>
                  </>
                )} */}
              </div>
            </>
          )}

          {selectedSubType === "uploadcustomeracknowledgement" && (
            <>
              {renderDetailsForm("BOE_Details")}
              {showResonDelayField && (
                <>{renderDetailsForm("ReasonSubmission")}</>
              )}
              {renderDetailsForm("Comments")}
              <div className="contact-details-btn">
                {selectedSubType === "panupdate" && (
                  <>
                    <Button type="primary" className="primary-btn">
                      Validate
                    </Button>
                  </>
                )}
                {/* {!showRaiseRequirementBtn && (
              <> */}
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit"
                >
                  {!isShowPOSScreen ? "Submit" : "Approve"}
                </Button>
                {/* </>
            )} */}

                {(isShowPOSScreen || !isShowPOSScreen) && (
                  <>
                    <Button
                      type="primary"
                      className="primary-btn"
                      onClick={() => getRaiseRequirements()}
                    >
                      Raise Requirement
                    </Button>
                  </>
                )}
              </div>
            </>
          )}

          {/*Duplicate Bond SubType Code Start */}
          {selectedSubType === "duplicatebond" && (
            <>
              {!isShowPOSScreen && (
                <>
                  {/* <CheckBoxList
                    checkedList={checkedList}
                    handleChange={handleChange}
                    options={[
                      {
                        label: "View Dispatch Details",
                        value: "View Dispatch Details",
                        name: "ViewExistingAgentCodeDetails",
                      },
                      {
                        label: "Request Duplicate Policy Bond",
                        value: "Request Duplicate Policy Bond",
                        name: "UpdateAgentCodeDetails",
                      },
                    ]}
                  /> */}
                  {/* {checkedList?.includes("View Dispatch Details") && (
                    <>
                      {renderDetailsForm("BOE_Details")}
                      {renderDetailsForm("RTOYesStatusFields")}
                    </>
                  )} */}
                  {/* {checkedList?.includes("Request Duplicate Policy Bond") && */}
                   { renderDetailsForm("RequestDuplicatePolicyBondFields")}
                    {/* } */}
                </>
              )}
              {isShowPOSScreen && <>{renderDetailsForm("POS_Details")}</>}
            
              <div className="contact-details-btn">
              
                    <Button
                      type="primary"
                      className="primary-btn"
                      htmlType="submit"
                      disabled={DisableSubmitBtn}
                    >
                      {!isShowPOSScreen  ? "Submit" : "Approve"}
                    </Button>
                {(isShowPOSScreen || !isShowPOSScreen) && (
                  <>
                    <Button
                      type="primary"
                      className="primary-btn"
                      onClick={() => getRaiseRequirements()}
                    >
                      Raise Requirement
                    </Button>
                    </>
                )}
                {
                  isShowPOSScreen &&
                  <>
                          <InternalFlowPOS interlRequirementTagValue1 = {props.interlRequirementTagValue} selectedList = {POSContactData.serviceRequestTransectionData} getInternal = {getInternal} internalReqForm={internalReqForm}/>
                        </>
                }
              </div>
            </>
          )}
          {/*Duplicate Bond SubType Code End */}

          {selectedSubType === "viewdispatchdetails" && (<>
            <h4 className="subtype-headings fs-16 fw-500">
            View Dispatch Details
                      </h4>{"  "}
                      <div className="table-container mb-16" style={{ marginTop: "0px" }}>
                      <table className="responsive-table">
                <thead>
                <tr>
                  <th>Dispatch Date</th>
                  <th>Dispatch Mode</th>
                  <th>Courier Name</th>
                  <th>AWB Number</th>
                  <th>Dispatch Address</th>
                  <th>Location</th>
                  <th></th>
                  
                </tr></thead>
                <tbody>
                  {GCPDetailsData?.dispatchDetailsData?.map((item, index) => (
                    <tr key={index + 1}>
                    <td>{item?.dispatchDeliveryDate ? convertDate(item?.dispatchDeliveryDate) : ""}</td>
                    <td>{item?.dispatchMode}</td>
                     <td>{item?.companyName}</td>
                     <td>{item?.airwayBillNo}</td>
                     <td>{item?.dispatchaddress}</td>
                     <td>{item?.dispatchtolocation}</td>
                    </tr>
                  ))}
                    {GCPDetailsData?.dispatchDetailsData?.length === 0  &&
               <tr>
                  <td colspan="7">
                <div className="text-center"><span>No data available</span></div> 
        </td>
        </tr>}
                </tbody>
              </table>
              </div>

              <h4 className="subtype-headings fs-16 fw-500">
              RTO Details
                      </h4>{"  "}
                      <div className="table-container mb-16" style={{ marginTop: "0px" }}>
                      <table className="responsive-table">
                <thead>
                <tr>
                  <th>Dispatch Date</th>
                  <th>RTO Inward Date</th>
                  <th>RTO Reason</th>
                  <th>Dispatch Mode</th>
                  <th>AWB Number</th>
                  <th>Pin Code</th>
                </tr></thead>
                <tbody>
                  {GCPDetailsData?.rtoDetailsData?.map((item, index) => (
                    <tr key={index + 1}>
                    <td>{item?.dispatchDeliveryDate? convertDate(item?.dispatchDeliveryDate) : ""}</td>
                    <td>{item?.DIS_RTOInwardDate ? convertDate(item?.DIS_RTOInwardDate) : ""}</td>
                    <td>{item?.DIS_RTO_Reason}</td>
                     <td>{item?.dispatchMode}</td>
                     <td>{item?.airwayBillNo}</td>
                     <td>{item?.pincode}</td>
                    </tr>
                  ))}
 {GCPDetailsData?.rtoDetailsData?.length === 0  &&
               <tr>
                  <td colspan="6">
                <div className="text-center"><span>No data available</span></div> 
        </td>
        </tr>}
                </tbody>
              </table>
              </div>
              <h4 className="subtype-headings fs-16 fw-500">
              View Delivery Details
                      </h4>{"  "}
                      <div className="table-container mb-16" style={{ marginTop: "0px" }}>
                      <table className="responsive-table">
                <thead>
                <tr>
                  <th>Delivery Date</th>
                  <th>Courier Name</th>
                  <th>AWB Number</th>
                 <th>Dispatch Mode</th>
                 <th>Received By</th>
                   <th>Pin Code</th>
                </tr></thead>
                <tbody>
                  {GCPDetailsData?.deliveryDetailsData?.map((item, index) => (
                    <tr key={index + 1}>
                     <td>{item?.dispatchDeliveryDate ? convertDate(item?.dispatchDeliveryDate) : ""}</td>
                     <td>{item?.companyName}</td>
                     <td>{item?.airwayBillNo}</td>
                     <td>{item?.dispatchMode}</td>
                     <td>{item?.DIS_ReceivedBy_Delivery}</td>
                     <td>{item?.pincode}</td>
                    </tr>
                  ))}
                {GCPDetailsData?.deliveryDetailsData?.length === 0  &&
               <tr>
                  <td colspan="6">
                <div className="text-center"><span>No data available</span></div> 
        </td>
        </tr>}
                </tbody>
              </table>
              </div> 
              {renderDetailsForm("Additionalnoteforcustomer")}
               {renderDetailsForm("Comments")}

              <div className="contact-details-btn">
              <Button
                type="primary"
                className="primary-btn"
                htmlType="submit"
              >
                {!isShowPOSScreen ? "Submit" : "Approve"}
              </Button>
        </div>
        
          </>)}
             </>
          }
        


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
      <RaiseRequirementPopup
        raiseRequerimentList={raiseRequerimentList}
        raiseRequirementOpen={raiseRequirementOpen}
        requirementModalLoader={requirementModalLoader}
        handleRequirementSubmit={handleRequirementSubmit}
        popupClose={popupClose}
        requirementsForm = {requirementsForm}
      />
       <Modal
        title="Stamp paper charges"
        open={isShowStampPaperCharges}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setIsShowStampPaperCharges(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="table-container" style={{ marginTop: "20px" }}>
          <table className="responsive-table">
            <tr>
              <th>State Names</th>
              <th>Stamp Paper Rs.</th>
            </tr>
            <tr>
              <td>All States except (Maharashtra, Bihar & West Bengal)</td>
              <td>100</td>
            </tr>
            <tr>
              <td>Maharashtra</td>
              <td>500</td>
            </tr>
            <tr>
              <td>Bihar</td>
              <td>200</td>
            </tr>
            <tr>
              <td>West Bengal</td>
              <td>50</td>
            </tr>
           {/* {BankduDupeData?.length === 0  &&
               <tr>
                  <td colspan="3">
               
                <div className="text-center"><span>No data available</span></div> 
        </td>
        </tr>} */}
          </table>
        </div>
      </Modal>
    </>
  );
};

export default PolicyBond;