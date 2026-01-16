import React, { useState, useEffect } from 'react'; 
import { connect, useSelector } from "react-redux";
import { RevivalData } from "../../mainconfig";
import { Button, Form,Modal,Tooltip,message,Spin,Checkbox,Upload,Input,Row,Col } from "antd";
import DetailsForm from '../../utils/DetailsForm';
import UploadIcon from '../../assets/images/upload.png';
import CloseIcon from '../../assets/images/close-icon.png';
import ContactForm from '../../utils/ContactForm';
import ExistUpdateCheckBoxList from "../../utils/ExistUpdateCheckBoxList";
import moment from 'moment';
import dayjs from "dayjs";
import apiCalls from "../../api/apiCalls";
import PopupAlert from "../popupAlert";
import InternalFlowPOS from "../InternalFlow/InternalFlowPOS";
import InternalFlow from "../InternalFlow/InternalFlow";

const Revival = (props) => { 
  const loginInfo = useSelector((state) => state);
    const [form] = Form.useForm();
    const [internalReqForm] = Form.useForm();
    const {selectedSubType,customerData,POSContactData,setSelectedSubType,revivalForm,selectedCallType,selectedSubTypeId,SelectedSubTypeVal,details,requestModeLU,clientEnquiryData,policyDetails,uwDecisionLU} = props;
    const [isLoading, setIsLoading] = useState(false);
    const [selectionRevival,setSelectionRevival] = useState("");
    const [totalFundsModal,setTotalFundModal] = useState(false);
    const [isShowPOSScreen,setIsShowPOSScreen] = useState(false);
    const [paymentViaSelection,setPaymentViaSelection] = useState("");
    const [showEmailFields,setShowEmailFields] = useState(false);
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);
    const [showEmailAddress, setShowEmailAddress] = useState(false);
    const [showWhatsApp, setShowWhatsApp] = useState(false);
    const suffix = <img src={UploadIcon} alt=""/>;
    const [checkedList, setCheckedList] = useState([]);
    const [showResonDelayField,setShowReasonDelayField] = useState(false);
    const [activeEmailIcons, setActiveEmailIcons] = useState([]);
    const [activeMobileIcons, setActiveMobileIcons] = useState([]);
    const [activeWhatsAppIcons, setActiveWhatsAppIcons] = useState([]);
    const [isPreferDate,setIsPreferDate] = useState(null);
    const [isSelectedDate, setIsSelectedDate] = useState(null);
    const [updateVal,setUpdateVal] = useState(false);
    const [isProcessLink,setIsProcessLink] = useState(''); 
    const [isDocLink,setIsDocLink] = useState('');
    const [alertTitle, setAlertTitle] = useState("");
    const [alertData, setAlertData] = useState("");
    const [navigateTo, setNavigateTo] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [uploadFiles, setUploadFiles] = useState([]);
    const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
    const [requirementModalLoader, setRequirementLoader] = useState(false);
    const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
    const [updateFields,setUpdateFields] = useState(false);
    const [showRaiseRequirementBtn, setShowRaiseRequirementBtn] = useState(false);
    const [clientdetails,setClientDetails]=useState([]);
    const [isShowUploadDGHFormField,setIsShowUploadDGHFormField] = useState(false);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [isLoader,setIsLoader] = useState(false);
    const [isViewUpload,setIsViewUpload]=useState(false);
    const [covidUploadFiles,setCovidUploadFiles] = useState([]);
    const [hypertensionUploadFiles,setHypertensionUploadFiles] = useState([]);
    const [diabetesUploadFiles,setDiabetesUploadFiles] = useState([]);
    const [asthamaUploadFiles,setAsthamaUploadFiles] = useState([]);
    const [isIDUploadMultipleFiles,setIsIDMultipleFiles] = useState([]);
    const [uploadIDMultipleFiles,setUploadIDMultipleFiles] = useState([]);
    const [docIdProofs,setDocIdProofs] = useState([]);
    const [isViewPremiumDue,setIsViewPremiumDue]=useState(false);
    const [isAreAllQuestionsDGH,setIsAreAllQuestions]=useState(false);
    const [isAreSupporting,setIsAreSupporting]=useState(false);
    const [isSignatureValidate,setIsSignatureValidate]=useState(false);
    const [isResetKey,setIsResetKey]=useState(false);
    const [ptdDays,setptdDays]=useState(0);
    const [revivalYesNo, setRevivalYesNo] = useState(null);
    const [premiumData, setPremiumData] = useState({});
    const [isPremiumLoader, setIsPremiumLoder] = useState(false);
    const [InternaRequirements, setInternalFlowRequirements] = useState("");








    const POSStatusEnquiryObj ={};
    const POSRevivalPickupObj ={}

    const pastDateStr = details?.policyDetailsObj?.premiumDetails?.ptd;
    const pastDate = new Date(
        `${pastDateStr.substring(0, 4)}-${pastDateStr.substring(4, 6)}-${pastDateStr.substring(6, 8)}`
    ); 
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const currentDay = String(currentDate.getDate()).padStart(2, '0');
    const currentDateStr = `${currentYear}${currentMonth}${currentDay}`; // Format: YYYYMMDD
    const formattedCurrentDate = new Date(
        `${currentDateStr.substring(0, 4)}-${currentDateStr.substring(4, 6)}-${currentDateStr.substring(6, 8)}`
    );
    const timeDifference = formattedCurrentDate - pastDate;
    
    const daysDiff = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    useEffect(()=>{
      handleEmpty();
      getProcesLink();
      setptdDays(daysDiff) 
      if(customerData?.isPOS && POSContactData && (selectedSubType==="revivalwithdgh")){
        POSContactData?.serviceRequestTransectionData?.forEach(element => {
          POSRevivalPickupObj[element.tagName] = element.tagValue
         });
         const requestChannelValue = POSRevivalPickupObj?.requestchannel;
         const requestChannelObj = requestModeLU.find((item)=>{
          return item.value==requestChannelValue
         })
         const requestChannelName = requestChannelObj ? requestChannelObj.label : 'NA';
         form.setFieldsValue({
          requestchannel:requestChannelName,
          NoofDaysfromPTD:POSRevivalPickupObj?.NoofDaysfromPTD,
          PlanType:POSRevivalPickupObj?.PlanType,
          ProductCode:POSRevivalPickupObj?.ProductCode,
          AreAllQuestionsInformationproperlyfilledinDGH:POSRevivalPickupObj?.AreAllQuestionsInformationproperlyfilledinDGH,
          Areanysupportingreportshealthquestionnairesgiven:POSRevivalPickupObj?.Areanysupportingreportshealthquestionnairesgiven,
          CustomerSigningDate:POSRevivalPickupObj?.CustomerSigningDate?convertDate(POSRevivalPickupObj?.CustomerSigningDate):POSRevivalPickupObj?.CustomerSigningDate,
          RequestReceivedDate:POSRevivalPickupObj?.RequestReceivedDate?convertDate(POSRevivalPickupObj?.RequestReceivedDate):POSRevivalPickupObj?.RequestReceivedDate,
          ReasonForDelayedSubmission:POSRevivalPickupObj?.ReasonForDelayedSubmission,
          SignatureValidated:POSRevivalPickupObj?.SignatureValidated,
          RequestorComments:POSRevivalPickupObj?.RequestorComments,
          IsPolicywithinRevivalPeriod:POSRevivalPickupObj?.IsPolicywithinRevivalPeriod
          
         })
      }
      else{
        form.setFieldsValue({
          NoofDaysfromPTD:daysDiff,
          PlanType:details?.policyDetailsObj?.planAndStatus?.productType,
          ProductCode:details?.policyDetailsObj?.planAndStatus?.planCode
        })
        // form.setFieldsValue({
        //   NoofDaysfromPTD:convertDate(details?.policyDetailsObj?.premiumDetails?.ptd),
        //   PlanType:details?.policyDetailsObj?.planAndStatus?.productType,
        //   ProductCode:details?.policyDetailsObj?.planAndStatus?.planCode
        // })
      }
    

    
    },[selectedSubType]);

    useEffect(() => {
      if(POSContactData && customerData?.isPOS && (selectedSubType==="revivalpickup")){
       POSContactData?.serviceRequestTransectionData?.forEach(element => {
        POSRevivalPickupObj[element.tagName] = element.tagValue
       });
 
       setIsShowPOSScreen(true);
       setUpdateFields(false);
       form.setFieldsValue({
        DuePremium:POSRevivalPickupObj?.DuePremium,
        LastPremiumPaymentMode:POSRevivalPickupObj?.LastPremiumPaymentMode,
        OutofRevival:POSRevivalPickupObj?.OutofRevival,
        DGHrequried:POSRevivalPickupObj?.DGHrequried,
        RevivalPickUpFor:POSRevivalPickupObj?.RevivalPickUpFor,
        PickUpDate:POSStatusEnquiryObj?.PickUpDate?convertDate(POSStatusEnquiryObj?.PickUpDate):POSStatusEnquiryObj?.PickUpDate,
        PickUpTime:POSStatusEnquiryObj?.PickUpTime?convertDate(POSStatusEnquiryObj?.PickUpTime):POSStatusEnquiryObj?.PickUpTime,
        PickUpAddress:POSRevivalPickupObj?.PickUpAddress,
        EnterAddress:POSRevivalPickupObj?.EnterAddress,
        requestchannel:POSRevivalPickupObj?.requestchannel,
         RequestorComments: POSRevivalPickupObj?.RequestorComments,
         ValidateSignature:POSRevivalPickupObj?.ValidateSignature,
         CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
         BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
         ReasonForDelay: POSContactData?.reasonDelayed,
       })
      //  if(POSRevivalPickupObj?.ValidatedBy==="requestform"){
      //    RevivalData[selectedSubType]?.POS_Details?.forEach(element => {
      //      if(element?.label==="Request Form"||element?.label?.includes("Customer Signing Date")||element?.label?.includes("Request Received Date")||
      //      element?.label==="Signature Validated"){
      //        element.hide= false;
      //        setUpdateFields(true);
      //      }
      //    });
      //  }
      //  else if(POSRevivalPickupObj?.ValidatedBy==="otp"){
      //    RevivalData[selectedSubType]?.POS_Details?.forEach(element => {
      //      if(element?.label==="Request Form"||element?.label?.includes("Customer Signing Date")||element?.label?.includes("Request Received Date")||
      //      element?.label==="Signature Validated"){
      //        element.hide= true;
      //        setUpdateFields(true);
      //      }
      //    });
      //  }
      RevivalData[selectedSubType]?.POS_Details?.forEach(element => {
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
     else  if(POSContactData && customerData?.isPOS && (selectedSubType==="statusenquiry")){
      POSContactData?.serviceRequestTransectionData?.forEach(element => {
        POSStatusEnquiryObj[element.tagName] = element.tagValue
      });

      setIsShowPOSScreen(true);
      setUpdateFields(false);
      form.setFieldsValue({
        DuePremium:POSStatusEnquiryObj?.DuePremium,
        LastPremiumPaymentMode:POSStatusEnquiryObj?.LastPremiumPaymentMode,
        OutofRevival:POSStatusEnquiryObj?.OutofRevival,
        DGHrequried:POSStatusEnquiryObj?.DGHrequried,
        RevivalPickUpFor:POSStatusEnquiryObj?.RevivalPickUpFor,
        PickUpDate:POSStatusEnquiryObj?.PickUpDate?convertDate(POSStatusEnquiryObj?.PickUpDate):POSStatusEnquiryObj?.PickUpDate,
        PickUpTime:POSStatusEnquiryObj?.PickUpTime?convertDate(POSStatusEnquiryObj?.PickUpTime):POSStatusEnquiryObj?.PickUpTime,
        PickUpAddress:POSStatusEnquiryObj?.PickUpAddress,
        EnterAddress:POSStatusEnquiryObj?.EnterAddress,
        requestchannel:POSStatusEnquiryObj?.requestchannel,
         RequestorComments: POSStatusEnquiryObj?.RequestorComments,
         ValidateSignature:POSStatusEnquiryObj?.ValidateSignature,
         CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
         BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
         ReasonForDelay: POSContactData?.reasonDelayed,
       })
      // form.setFieldsValue({
      //   OutofRevival:POSStatusEnquiryObj?.OutofRevival,
      //   PaymentMethod:POSStatusEnquiryObj?.PaymentMethod,
      //   AutoPayStatus:POSStatusEnquiryObj?.AutoPayStatus,
      //   NewPayoutAmount:POSStatusEnquiryObj?.NewPayoutAmount,
      //   requestchannel:POSStatusEnquiryObj?.requestchannel,
      //   RequestorComments: POSStatusEnquiryObj?.RequestorComments,
      //   ValidateSignature:POSStatusEnquiryObj?.ValidateSignature,
      //   CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
      //   BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
      //   ReasonForDelay: POSContactData?.reasonDelayed,
      // })
        RevivalData[selectedSubType]?.POS_Details?.forEach(element => {
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
     },[])

     const getMultpleUploadFiles=(listOfUploadFiles,label)=>{
      if(listOfUploadFiles?.length >0 ){
        setUploadIDMultipleFiles(listOfUploadFiles);
        if(isViewUpload){
          form.setFieldsValue({
            idProof:  `Documents Uploaded -  ${listOfUploadFiles.length }`,
          })
        }
    }
  }

     const uploadProps = {
      name: "file",
      multiple: false,
      fileList: [],
      customRequest: ({ file, onSuccess, index,item },label,idProofUpload) => {
        let formData = new FormData();
        const ApplicationNo =  details?.policyDetailsObj?.identifiers?.applicationNo
        formData.append("File", file, ApplicationNo+'/'+file.name);
        let response = apiCalls.fileUpload(formData);
        response
        .then((val) => {
          if (val?.data) {
            let newDocumentObj= {
              "IndexName": "Signature",
              "DocumentName":file?.name,
              "UserID": loginInfo?.userProfileInfo?.profileObj?.userName,
              "UploadedBy": loginInfo?.userProfileInfo?.profileObj?.name,
              "UploadedOn":   new Date(),
              "DocumentSize": file?.size,
                "FileLocation": '/'+ApplicationNo+ '/',
              "BlobFileName": file?.name,
              "FileExtnMime": file?.type,
              "labelName": label,
              "name": file.name,
            }
            if(isViewUpload){
              if (newDocumentObj.labelName && isIDUploadMultipleFiles?.length > 0) {
                // Check if a file with the same labelName already exists
                const existingFileIndex = isIDUploadMultipleFiles.findIndex(
                  (file) => file.labelName === newDocumentObj.labelName
                );
              
                // Remove the labelName property before updating or adding the object
                //delete newDocumentObj.labelName;
              
                if (existingFileIndex !== -1) {
                  // If exists, replace the existing file object with the new one
                  const updatedUploadFiles = [...isIDUploadMultipleFiles];
                  updatedUploadFiles[existingFileIndex] = newDocumentObj;
                  setIsIDMultipleFiles(updatedUploadFiles);
              
                  // Send the updated files to getMultpleUploadFiles
                  // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
                  getMultpleUploadFiles(updatedUploadFiles,label);
                } else {
                  // If doesn't exist, add the new file object to the list
                  setIsIDMultipleFiles((prevFiles) => [...prevFiles, newDocumentObj]);
              
                  // Send the updated files to getMultpleUploadFiles
                  // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
                  getMultpleUploadFiles([...isIDUploadMultipleFiles, newDocumentObj],label);
                }
              } else {
                // If labelName is not present or the array is empty, add the new file object to the list
                setIsIDMultipleFiles((prevFiles) => [...prevFiles, newDocumentObj]);
              
                // Send the updated files to getMultpleUploadFiles
                // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
                 getMultpleUploadFiles([...isIDUploadMultipleFiles, newDocumentObj],label);
              }
            }
            //getMultpleUploadFiles(documnetsObj);
            //setUploadFiles(file);
            setDocIdProofs([{...newDocumentObj}]);
            if(idProofUpload === "idProofUpload"){
              if(label?.includes("Covid Questionaires")){
                setCovidUploadFiles([{...newDocumentObj}]);
              }
              else if(label?.includes("Hypertension Questionaires")){
                setHypertensionUploadFiles([{...newDocumentObj}]);
              }
              else if(label?.includes("Diabetes Questionaires")){
                setDiabetesUploadFiles([{...newDocumentObj}]);
              }
              else if(label?.includes("Asthama Questionaires")){
                setAsthamaUploadFiles([{...newDocumentObj}]);
              }

            }
            message.success({
              content: "File Upload successfully",
              className: "custom-msg",
              duration: 3,
            });
            onSuccess();
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
       
      
      },
      beforeUpload:(file) => {
        let fileType = {
          "image/png": true,
          "image/jpg": true,
          "image/jpeg": true,
          "image/PNG": true,
          "image/JPG": true,
          "image/JPEG": true,
          "application/pdf": true,
          "application/PDF": true,
        };
        let isFileName = file.name.split(".").length > 2 ? false : true;
        if (fileType[file.type] && isFileName) {
          return true;
        } else {
          message.error("File don't allow double extension")
          return Upload.LIST_IGNORE;
        }
      }
      }

    const handleEmpty =() =>{
      setShowPhoneNumber(false);
      setActiveEmailIcons([]);
      setActiveMobileIcons([]);
      setActiveWhatsAppIcons([]);
      setShowEmailAddress(false);
      setShowWhatsApp(false);
      setCheckedList([]);
      setIsShowPOSScreen(false);
    }

    const handleChange = (value) => {
      handleEmpty();
      // If the checkbox is already checked, uncheck it
      if (checkedList.includes(value)) {
        setCheckedList([]);
      } else {
        // Otherwise, check it
        setCheckedList([value]);
        if(value?.includes("Request For Cheque Pick Up")){
          setSelectedSubType("revivalpickup");
          revivalForm?.setFieldsValue({subType: 4})
        }
       
      }
    };

    const getUploadFiles=(listOfUploadFiles)=>{
      setUploadFiles([...docIdProofs, ...listOfUploadFiles]);
  
    }

    useEffect(() => {
      const fetchPolicyDetails = async () => {     
          try {
            setIsLoading(true);
            await getPolicyClientEnquiryDetails();
          } catch (error) {
            console.error("Failed to fetch policy details:", error);
          } finally {
            setIsLoading(false);
          }
        };
        
      if(selectedSubType === "revivalwithdgh" || selectedSubType === "revivalquotation"){
        fetchPolicyDetails();
        if(selectedSubType === "revivalquotation"){
//  const currentDate = convertDate(details?.policyDetailsObj?.premiumDetails?.ptd);
//  const newDate = new Date();
// form.setFieldsValue({
//   overduePeriod: calculateDifference1(newDate,currentDate),
// });
const currentDateObj = convertDate(details?.policyDetailsObj?.premiumDetails?.ptd); // likely a Date object
const currentDate = moment(currentDateObj, "DD/MM/YYYY", true).format("DD/MM/YYYY");
const newDate = moment().format("DD/MM/YYYY"); // format today's date
form.setFieldsValue({
  overduePeriod: calculateDifference(currentDate, newDate),
});
          getPremiumData();
          getOasisAdminConfig();
        }
      }
  }, [selectedSubType]);

  const calculateDifference = (rcd, dod) => {
    const startDate = moment(rcd, "DD/MM/YYYY", true);
    const endDate = moment(dod, "DD/MM/YYYY", true);
  
    if (!startDate.isValid() || !endDate.isValid()) {
      return "Invalid date";
    }
  
    const years = endDate.diff(startDate, 'years');
    startDate.add(years, 'years');
  
    const months = endDate.diff(startDate, 'months');
    startDate.add(months, 'months');
  
    const days = endDate.diff(startDate, 'days');
  
    return `${years}Y ${months}M ${days}D`;
  };

    
  const renderDetailsForm = (formType) => {

      let formData;
      if(selectedSubType === "revivalwithdgh" && (formType === "BOE_Details" || formType === "POS_Details")){
        formData = (RevivalData[selectedSubType]?.[formType]).map(item =>
                    item.label === "Is Policy within Revival Period"
                    ? { ...item, 
                      // placeholder: revivalYesNo
                     } // Add placeholder to the specific object
                    : item)
      } else if(selectedSubType === "revivalquotation" && (formType === "BOE_Details")){
        formData = (RevivalData[selectedSubType]?.[formType]).map(item =>
                    item.label === "Out of Revival"
                    ? { ...item,
                      //  placeholder: revivalYesNo 
                      } // Add placeholder to the specific object
                    : item
                  )
      }
       else{
        formData = RevivalData[selectedSubType]?.[formType]
      }
            
    //commonly render all forms
    return (
      <DetailsForm
        data={formData}
        // data={RevivalData[selectedSubType]?.[formType]}
        subType={selectedSubType}
        suffix={!isShowPOSScreen && suffix}
        form={form}
        handleRadioChange={handleRadioChange}
        handleDateChange={handleDateChange}
        handleTextLink ={handleTextLink}
        handleDropdownChange={handleDropdownChange}
        disabledDate={disabledDate}

       // selectCheckBox={selectCheckBox}
        toggleInputField={toggleInputField}
        activeEmailIcons={activeEmailIcons}
        activeMobileIcons={activeMobileIcons}
        activeWhatsAppIcons={activeWhatsAppIcons}
         getUploadFiles={getUploadFiles}
         requestModeLU={requestModeLU}
         uwDecisionLU={uwDecisionLU}
        // handleLabelLink ={handleLabelLink }
        // disabledDate={disabledDate}
         onBlurInput={onBlurInput}
        // isUpdateModeLU = {isUpdateModeLU}
        // disableRequestForm={disableRequestForm}
        // handleInputChange={handleInputChange}
        disabledTime={disabledTime}
        handleLinkValue={handleLinkValue}
      ></DetailsForm>
    );
  };

  const onBlurInput =()=>{}

  const getPolicyClientEnquiryDetails = async () => {
    try{
      const obj = {
        policyNo : details?.policyDetailsObj?.identifiers?.policyNo,
        effectiveDate : formatDate(new Date())
      };
  
      const response = await apiCalls.GetPolicyClientEnquiry(obj);
      if (response?.status === 200) {
        form.setFieldsValue({
          // outofRevival:response.data.responseBody?.yensoind
          outofRevival: response.data.responseBody?.yesnoind,
          IsPolicywithinRevivalPeriod:response?.data?.responseBody?.yesnoind,
          DGHRequired: response?.data?.responseBody?.dghflag == "Y" ? "Yes" : "No"
        })
        //setRevivalYesNo(response.data.responseBody?.yesnoind); // Safely logs response as a string
        setIsLoading(false);
      }
    }
    catch(err){
      console.log(err)
    }
  };
  const getOasisAdminConfig = async () => {
    try{
      const response = await apiCalls.getOasisAdminConfig();
      if (response.status === 200) {
        form.setFieldsValue({
          // outofRevival:response.data.responseBody?.yensoind
          // outofRevival: response.data.responseBody?.yesnoind,
          // IsPolicywithinRevivalPeriod:response?.data?.responseBody?.yesnoind,
          // DGHRequired: response?.data?.responseBody?.dghflag == "Y" ? "Yes" : "No"
        })
        //setRevivalYesNo(response.data.responseBody?.yesnoind); // Safely logs response as a string
        setIsLoading(false);
      }
    }
    catch(err){
      console.log(err)
    }
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}${month}${day}`;
  };

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

  const toggleInputField = (field, item, index) => {
      setShowEmailFields(true);
      form.setFieldsValue({
        'mobileNo': customerData?.mobileNo,
    'whatsAppNo':  customerData?.mobileNo,
    'emailId': customerData?.emailID
      });
      switch (field) {
        case 'phone':
          setShowPhoneNumber(!showPhoneNumber);
          setActiveMobileIcons(prevIcons => {
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
        case 'email':
          setShowEmailAddress(!showEmailAddress);
          setActiveEmailIcons(prevIcons => {
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
        case 'whatsapp':
          setShowWhatsApp(!showWhatsApp);
          setActiveWhatsAppIcons(prevIcons => {
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



  const handleRadioChange =(e,item)=>{
    let selectionValue = e.target.value;

    if(item.name==="AreAllQuestionsInformationproperlyfilledinDGH" && selectionValue==="no" ){
      setIsAreAllQuestions(true)
    }
    else{
      setIsAreAllQuestions(false)
    }
    if(item.name==="Areanysupportingreportshealthquestionnairesgiven" && selectionValue==="no" ){
      setIsAreSupporting(true)
    }
    else{
      setIsAreSupporting(false)
    }
    if(item.name==="SignatureValidated" && selectionValue==="no" ){
      setIsSignatureValidate(true)
    }
    else{
      setIsSignatureValidate(false)
    }


    if(selectedSubType==="revivalwithdgh"&&item?.name==="RaiseRequestForRefund" && selectionValue==="no"){
      RevivalData[selectedSubType]?.POS_Details?.forEach(element => {
        setIsResetKey(!isResetKey)
        if(element?.name==="enterTicketIDforRefund"){
          element.disabled= true;
        }

      });
    }
    else{
      RevivalData[selectedSubType]?.POS_Details?.forEach(element => {
        setIsResetKey(!isResetKey)
        if(element?.name==="enterTicketIDforRefund"){
          element.disabled= false;
        }

      });
    }
    

    if(selectedSubType==="revivalpickup"&&selectionValue === "newaddress"){
      RevivalData[selectedSubType]?.BOE_Details?.forEach(element => {
        if(element?.name==="EnterAddress"){
          element.hide= false;
          setUpdateVal(!element.hide);
        }
      });
    }
    else if(selectedSubType==="revivalpickup"&&selectionValue === "registeredaddress"){
      RevivalData[selectedSubType]?.BOE_Details?.forEach(element => {
        if(element?.name==="EnterAddress"){
          element.hide= true;
          setUpdateVal(!element.hide);
        }
      });
    }
    if(item.name === "validdghform"){
    setIsShowUploadDGHFormField(false); // Assuming this hides the form field by default
    const shouldShowField = selectionValue?.includes("uploaddghform");
    // Iterate over different payment methods
    if (paymentViaSelection.includes("cash")) {
        RevivalData[selectedSubType]?.Cash_Details?.forEach(element => {
            if (element?.label?.includes("Upload DGH Form")) {
                element.hide = !shouldShowField;
            }
        });
    } else if (paymentViaSelection.includes("cheque")) {
        RevivalData[selectedSubType]?.Cheque_Details?.forEach(element => {
            if (element?.label?.includes("Upload DGH Form")) {
                element.hide = !shouldShowField;
            }
        });
    } else if (paymentViaSelection.includes("online")) {
        RevivalData[selectedSubType]?.Online_Details?.forEach(element => {
            if (element?.label?.includes("Upload DGH Form")) {
                element.hide = !shouldShowField;
            }
        });
    }

    // Set the state variable to show/hide the form field
    setIsShowUploadDGHFormField(shouldShowField);
  }
  }
  const handleTextLink=()=>{}
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
    setShowReasonDelayField(false);
    
    if (item === "BranchReceivedDate" 
      // || item==="CustomerSigningDate"
    ) {
      let newDate = new Date();
      let todayDate = moment(newDate).format("MM/DD/YYYY");
      let selectDate = moment(date + 1).format("MM/DD/YYYY");
      const formFeilds = form.getFieldsValue()
      let customerSignDate = moment(formFeilds?.CustomerSigningDate + 1).format("MM/DD/YYYY");
      let dateDiffence = date_diff_indays(selectDate,customerSignDate)
      if(!formFeilds?.CustomerSigningDate||dateDiffence > 0){
        message.destroy();
        message.error({
          content: "Request Received Date can't be before the customer signing date.",
          className: "custom-msg",
          duration: 3,
        });
       //form.setFieldsValue({branchreceiveddate: ""})
        form.setFieldsValue({BranchReceivedDate: ""})
      return;
      } else {
        RevivalData[selectedSubType]?.Request_Details?.forEach(element => {
          if(element?.label?.includes("Reason For Delayed Submission")&&selectDate < todayDate){
            element.hide= false;
            setShowReasonDelayField(true);
          }
          else if(element?.label?.includes("Reason For Delayed Submission")&&selectDate >= todayDate){
            element.hide= true;
            setShowReasonDelayField(false);
          }
        });
        RevivalData[selectedSubType]?.BOE_Details?.forEach(element => {
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
  };

    const handleDropdownChange = (e,item) =>{
        setPaymentViaSelection("");
        if(item?.name?.toLowerCase()==="outofrevival"){
        setSelectionRevival(e)
        }
        else if(item?.name?.toLowerCase().includes("paymentvia")){
            setPaymentViaSelection(e);
        }
    }
    const handleLabelLink = (item) =>{
        setTotalFundModal(false);
        if(item?.name?.toLowerCase().includes("totalpremiumdue")){
          setTotalFundModal(true);
        }
      
      }
      // const toggleInputField = (field) => {
      //   setShowEmailFields(true);
      //   switch (field) {
      //     case 'phone':
      //       setShowPhoneNumber(!showPhoneNumber);
      //       break;
      //     case 'email':
      //       setShowEmailAddress(!showEmailAddress);
      //       break;
      //     case 'whatsapp':
      //       setShowWhatsApp(!showWhatsApp);
      //       break;
      //     default:
      //       break;
      //   }
      // };
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
      const convertDate = (inputDate) => {
        const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
        return formattedDate;
      };

      const getTransactionData = (values) => {
        if (selectedSubType === "outOfRevival") {
          return [
            {
              Status: "Create",
              TagName: "outOfRevival",
              TagValue: values?.outOfRevival||"",
            },
            {
              Status: "Create",
              TagName: "totalPremiumDue",
              TagValue: values?.totalPremiumDue||"",
            },
    
            {
              Status: "Create",
              TagName: "overduePeriod",
              TagValue: values?.overduePeriod||"",
            },
            {
              Status: "Create",
              TagName: "InterestWaiverCampaign",
              TagValue: values?.InterestWaiverCampaign||"",
            },
            {
              Status: "Create",
              TagName: "PremiumHoliday",
              TagValue: values?.PremiumHoliday||"",
            },
            {
              Status: "Create",
              TagName: "AmountPayableafterinterestwaiver",
              TagValue: values?.AmountPayableafterinterestwaiver||"",
            },
            {
              Status: "Create",
              TagName: "SendRevivalQuotation",
              TagValue: values?.SendRevivalQuotation||"",
            },
            {
              Status: "Create",
              TagName: "amount",
              TagValue: values?.amount||"",
            },
            {
              Status: "Create",
              TagName: "receiptNumber",
              TagValue: values?.receiptNumber||"",
            },
            {
              Status: "Create",
              TagName: "chequeNumber",
              TagValue: values?.chequeNumber||"",
            },
            {
              Status: "Create",
              TagName: "ChequeDate",
              TagValue: values?.ChequeDate||"",
            },
            {
              Status: "Create",
              TagName: "BankName",
              TagValue: values?.BankName||"",
            },
            {
              Status: "Create",
              TagName: "RequestorComments",
              TagValue: values?.RequestorComments||"",
            },
            
      {
        "Status": "Create",
        "TagName": "AdditionalNoteForCustomer",
        "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",
    },
          ];
        } else if (selectedSubType === "revivalquotation") {
          return [{
            "Status": "Create",
            "TagName": "AdditionalNoteForCustomer",
            "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",
        },
        { Status: "Create", TagName: "requestchannel", TagValue: values?.requestchannel || ""},
      ];
        }
        else if (selectedSubType === "revivalwithdgh") {
          return [
            // { Status: "Create", TagName: "SentToBranch", TagValue: values?.SentToBranch ||"" },
            // { Status: "Create", TagName: "BranchName", TagValue: values?.BranchName || ""},
            // { Status: "Create", TagName: "RequestorComments", TagValue: values?.RequestorComments || ""},
            // {Status: "Create",TagName: "Client_Id","TagValue": customerData?.poClientID},
            // { Status: "Create", TagName: "DocLink", TagValue:isDocLink },
            // { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink},
            // {Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER"}
            
            { Status: "Create", TagName: "requestchannel", TagValue: values?.requestchannel ||"" },
            { Status: "Create", TagName: "IsPolicywithinRevivalPeriod", TagValue: values?.IsPolicywithinRevivalPeriod ||"" },
            { Status: "Create", TagName: "NoofDaysfromPTD", TagValue:ptdDays ||"" },
            { Status: "Create", TagName: "PlanType", TagValue: details?.policyDetailsObj?.planAndStatus?.productType ||"" },
            { Status: "Create", TagName: "ProductCode", TagValue: details?.policyDetailsObj?.planAndStatus?.planCode ||"" },
            { Status: "Create", TagName: "AreAllQuestionsInformationproperlyfilledinDGH", TagValue: values?.AreAllQuestionsInformationproperlyfilledinDGH ||"" },
            { Status: "Create", TagName: "Areanysupportingreportshealthquestionnairesgiven", TagValue: values?.Areanysupportingreportshealthquestionnairesgiven ||"" },
            { Status: "Create", TagName: "CustomerSigningDate", TagValue: new Date(values?.CustomerSigningDate )||"" },
            { Status: "Create", TagName: "RequestReceivedDate", TagValue: new Date(values?.RequestReceivedDate) ||"" },
            { Status: "Create", TagName: "ReasonForDelayedSubmission", TagValue: values?.ReasonForDelayedSubmission ||"" },
            { Status: "Create", TagName: "CheckedSignatureGrid", TagValue: values?.CheckedSignatureGrid ||"" },
            { Status: "Create", TagName: "SignatureValidated", TagValue: values?.SignatureValidated ||"" },
            { Status: "Create", TagName: "RequestorComments", TagValue: values?.RequestorComments ||"" },
            
      {
        "Status": "Create",
        "TagName": "AdditionalNoteForCustomer",
        "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",
    },


          ];
        }
        else if (selectedSubType === "revivalpickup") {
          return [
            { Status: "Create", TagName: "DuePremium", TagValue: values?.DuePremium ||"" },
            { Status: "Create", TagName: "LastPremiumPaymentMode", TagValue: values?.LastPremiumPaymentMode || ""},
            { Status: "Create", TagName: "OutofRevival", TagValue: values?.OutofRevival ||"" },
            { Status: "Create", TagName: "DGHrequried", TagValue: values?.DGHrequried || ""},
            { Status: "Create", TagName: "RevivalPickUpFor", TagValue: values?.RevivalPickUpFor ||"" },
            { Status: "Create", TagName: "PickUpDate", TagValue: values?.PickUpDate || ""},
            { Status: "Create", TagName: "PickUpTime", TagValue: values?.PickUpTime ||"" },
            { Status: "Create", TagName: "PickUpAddress", TagValue: values?.PickUpAddress || ""},
            { Status: "Create", TagName: "EnterAddress", TagValue: values?.EnterAddress ||"" },
            { Status: "Create", TagName: "requestchannel", TagValue: values?.requestchannel || ""},
            { Status: "Create", TagName: "ValidateSignature", TagValue: values?.ValidateSignature ||"" },
            { Status: "Create", TagName: "RequestorComments", TagValue: values?.RequestorComments || ""},
            {Status: "Create",TagName: "Client_Id","TagValue": customerData?.poClientID},
            { Status: "Create", TagName: "DocLink", TagValue:isDocLink },
            { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink},
            {Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER"},
            
      {
        "Status": "Create",
        "TagName": "AdditionalNoteForCustomer",
        "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",
    },
          ];
        }
        else if (selectedSubType === "statusenquiry") {
          return [
            { Status: "Create", TagName: "OutofRevival", TagValue: values?.OutofRevival ||"" },
            { Status: "Create", TagName: "PaymentMethod", TagValue: values?.PaymentMethod || ""},
            { Status: "Create", TagName: "AutoPayStatus", TagValue: values?.AutoPayStatus ||"" },
            { Status: "Create", TagName: "requestchannel", TagValue: values?.requestchannel || ""},
            { Status: "Create", TagName: "TotalBasePremium", TagValue: values?.TotalBasePremium || ""},
            { Status: "Create", TagName: "GST", TagValue: values?.GST ||"" },
            { Status: "Create", TagName: "InterestAmount", TagValue: values?.InterestAmount || ""},
            { Status: "Create", TagName: "SuspenseAmount", TagValue: values?.SuspenseAmount ||"" },
            { Status: "Create", TagName: "TotalDuePremium", TagValue: values?.TotalDuePremium || ""},
            { Status: "Create", TagName: "InterestWaiver", TagValue: values?.InterestWaiver ||"" },
            { Status: "Create", TagName: "InterestWaiverAmount", TagValue: values?.InterestWaiverAmount || ""},
            { Status: "Create", TagName: "OverDuePeriod", TagValue: values?.OverDuePeriod || ""},
            { Status: "Create", TagName: "DGHRequired", TagValue: values?.DGHRequired ||"" },
            { Status: "Create", TagName: "PremiumHoliday", TagValue: values?.PremiumHoliday || ""},
            { Status: "Create", TagName: "NumberofYearsPremiumPaid", TagValue: values?.NumberofYearsPremiumPaid ||"" },
            { Status: "Create", TagName: "ValidateSignature", TagValue: values?.ValidateSignature ||"" },
            { Status: "Create", TagName: "RequestorComments", TagValue: values?.RequestorComments || ""},
            {Status: "Create",TagName: "Client_Id","TagValue": customerData?.poClientID},
            { Status: "Create", TagName: "DocLink", TagValue:isDocLink },
            { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink},
            {Status: "Create", TagName: "FileType", TagValue: "PROCESSEMAILER"},
            
      {
        "Status": "Create",
        "TagName": "AdditionalNoteForCustomer",
        "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",
    },
          ];
        }
      };

      const handleSubmit = (values) => {
        // if (!showEmailFields && selectedSubType === "sendsoftcopy") {
        //   message.destroy();
        //   message.warning({
        //     content: "Please select atleast one communication.",
        //     className: "custom-msg",
        //     duration: 2,
        //   });
        //   return;
        // }
        if (POSContactData && customerData?.isPOS) {
          POSActionsOnContactDetails(values, "APPROVED");
        } else if (selectedSubType){
            // getRaiseRequirements();
            saveRequest(values)
          }else{
            saveRequest(values);
          }
      };


      const saveRequest = (values)=>{
        // setIsLoading(true);
        // const values = form.getFieldsValue(); 
        if(values.CustomerSigningDate > values.BranchReceivedDate){
            message.destroy();
            message.error({
              content: " customer signing date  can't be greater than  Request Received Date.",
              className: "custom-msg",
              duration: 3,
            });
            form.setFieldsValue({
              CustomerSigningDate: "",
              CustomerSigningDate:""
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
          Category: (selectedCallType===4 &&selectedSubTypeId === 2 || selectedSubTypeId === 3) ? 1:2,
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
          Uploads: uploadFiles || [],
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
        };
        if(raiseRequirementOpen){
          let ids = raiseRequerimentList?.filter((e) => e.status === true)?.map((e) => e.raiseReqId)
          obj.TransactionData.push({
            "Status": "Create",
            "TagName": "ReasonList_Key",
            "TagValue":  JSON.stringify(ids)
          })
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
              // // if(selectedSubType==="revivalquotation"){
              // //   setSelectedSubType("revivalwithdgh");
              // // //  revivalForm?.setFieldsValue({subType: 4})
              // // }else {
              //   setAlertTitle("Request Created Successfully");
              //   let successMessage =
              //     val?.data?.tat > 0
              //       ? `Ticket ID Number ${
              //           val?.data?.srvReqRefNo
              //         }. Your request will be processed in ${
              //           val?.data?.tat || 0
              //         } days`
              //       : `Ticket ID Number ${val?.data?.srvReqRefNo}.`;
              //   setAlertData(successMessage);
              //   setNavigateTo("/advancesearch");
              //   setShowAlert(true);
             // }
           
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
    const handleRaiseRequest =()=>{
        setIsShowPOSScreen(!isShowPOSScreen);
        form.setFieldsValue({
          DGHRequired: "yes"
        })
    }
    const getRaiseRequirements = () => {
      setRaiseRequirementOpen(true);
      setRequirementLoader(true);
      let obj = {
        calltype: props?.selectedCallType,
        subtype: props?.selectedSubTypeId,
        Role:isShowPOSScreen?0:1
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
    }
  
    const handleRequirementSubmit = () => {
      const formData = form.getFieldValue();
      setRequirementLoader(true);
      if(isShowPOSScreen){
        POSActionsOnContactDetails(null, "REJECTED");
      }else{
        handleSubmit();
      }
  
    };

    const getInternal = (list) => {
      const values = form.getFieldsValue();

      POSActionsOnContactDetails(values, "INTERNAL",list);
    }
  
    const POSActionsOnContactDetails = (values, status,list) => {
      let internalFormValues = internalReqForm?.getFieldsValue();
      let seletedRequerimentList; 
      if(status === 'INTERNAL'){
        seletedRequerimentList = list
       }
     
      else if (status === 'REJECTED'){
        seletedRequerimentList = raiseRequerimentList
             ?.filter((e) => e.status === true)
             ?.map((e) => e.raiseReqId);
             let dummy = '';
             seletedRequerimentList.forEach(x => {
               dummy = x.value;
             })
            }
      
     // let seletedRequerimentList = raiseRequerimentList
        // ?.filter((e) => e.status === true)
        // ?.map((e) => e.raiseReqId);
        if((seletedRequerimentList?.length===0 && !internalFormValues?.PosInternalReq)&& status === 'INTERNAL'){
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
        SrvReqRefNo: POSContactData?.srvReqRefNo,
        Status: status,
        RequirementList: seletedRequerimentList,
        UsrID: loginInfo?.userProfileInfo?.profileObj?.userName,
        RoleID: loginInfo?.userProfileInfo?.profileObj?.role,
        // "RequirementComments":requirementCmnt,
        POSComments1: values?.AuthorizerComments,
        TransactionPayload:  [],
      };
      if(status==="INTERNAL"){
        obj.TransactionPayload.push(
          {
            "Status": "create",
            "TagName": "InternalRequirementValue",
            "TagValue":JSON.stringify(seletedRequerimentList)
        },
         {
            "Status": "create",
            "TagName": "PosInternalReq",
            "TagValue": internalFormValues?.PosInternalReq || ""
        },
        {
          "Status": "Create",
          "TagName": "POSComments1",
          "TagValue":values?.AuthorizerComments
        },
        {
          "Status": "create",
          "TagName": "uwdecision",
          "TagValue":values?.uwdecision
      },
      {
        "Status": "create",
        "TagName": "enterTicketIDforRefund",
        "TagValue":values?.enterTicketIDforRefund
    },
    {
      "Status": "create",
      "TagName": "Updatelifeasia",
      "TagValue":values?.Updatelifeasia
  },
  {
    "Status": "create",
    "TagName": "RaiseRequestForRefund",
    "TagValue":values?.RaiseRequestForRefund
},
)}
//  if(isShowPOSScreen){
//       let reqFormValues = requirementsForm?.getFieldsValue();
//     obj.TransactionPayload.push({
//         "Status": "Create",
//         "TagName": "PosOtherReq",
//         "TagValue": reqFormValues?.PosOtherReq || ""
//       });
//     }
      setIsLoading(true);
    
      let response = apiCalls.POSActionsOnContactDetails(obj);
      response
        .then((val) => {
          if (val?.data) {
            setAlertTitle(status==="REJECTED"?"Requirement Raised":"Request Approved");
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
    useEffect(()=>{
      getClientEnquiry()
    },[])
    useEffect(()=>{
      if(props?.EmailResponse?.IsEmailmanagent){
        if (!RevivalData[selectedSubType]) {
          RevivalData[selectedSubType] = {}; // Initialize if undefined
        }
        if (!Array.isArray(RevivalData[selectedSubType]?.BOE_Details)) {
          RevivalData[selectedSubType].BOE_Details = [];
      }
    
      // Remove existing instances of "Additional Note For Customer" before adding a new one
      RevivalData[selectedSubType].BOE_Details = RevivalData[selectedSubType].BOE_Details.filter(
          comment => comment.name !== "AdditionalNoteForCustomer"
      );
    
      // Add "Additional Note For Customer" once
      RevivalData[selectedSubType].BOE_Details.push(
        {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 4000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
        });
      
        if (!Array.isArray(RevivalData[selectedSubType]?.ViewExisting_Details)) {
          RevivalData[selectedSubType].ViewExisting_Details = [];
      }
    
      // Remove existing instances of "Additional Note For Customer" before adding a new one
      RevivalData[selectedSubType].ViewExisting_Details = RevivalData[selectedSubType].ViewExisting_Details.filter(
          comment => comment.name !== "AdditionalNoteForCustomer"
      );
    
      // Add "Additional Note For Customer" once
      RevivalData[selectedSubType].ViewExisting_Details.push(
        {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 4000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
        });  
        if (!Array.isArray(RevivalData[selectedSubType]?.Share_Process_Details)) {
          RevivalData[selectedSubType].Share_Process_Details = [];
      }
    
      // Remove existing instances of "Additional Note For Customer" before adding a new one
      RevivalData[selectedSubType].Share_Process_Details = RevivalData[selectedSubType].Share_Process_Details.filter(
          comment => comment.name !== "AdditionalNoteForCustomer"
      );
    
      // Add "Additional Note For Customer" once
      RevivalData[selectedSubType].Share_Process_Details.push(
        {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength:4000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
        });
        RevivalData[selectedSubType]?.BOE_Details?.forEach(element => {
          if(element.name==="requestchannel"){
            element.disabled = true;
            form.setFieldsValue({
              requestchannel: 4
            })
          }
        if(element?.name ==="CustomerSigningDate"||element?.name ==="BranchReceivedDate"||element?.name ==="SignatureValidated"){
          element.hide = true;
        }
        })
        RevivalData[selectedSubType]?.Share_Process_Details?.forEach(element => {
          if(element.name==="requestchannel"){
            element.disabled = true;
            form.setFieldsValue({
              requestchannel: 4
            })
          }
        if(element?.name ==="CustomerSigningDate"||element?.name ==="BranchReceivedDate"||element?.name ==="SignatureValidated"){
          element.hide = true;
        }
        })
        RevivalData[selectedSubType]?.ViewExisting_Details?.forEach(element => {
          if(element.name==="requestchannel"){
            element.disabled = true;
            form.setFieldsValue({
              requestchannel: 4
            })
          }
        if(element?.name ==="CustomerSigningDate"||element?.name ==="BranchReceivedDate"||element?.name ==="SignatureValidated"){
          element.hide = true;
        }
        })
    }
    },[selectedSubType])
    const getClientEnquiry = ()=>{
      setIsLoading(true);
          let obj = {
            clientNumber:customerData?.poClientID
      };
      let response = apiCalls.getClientEnquiry(obj,loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID);
      response
        .then((val) => {
          if (val?.data) { 
            setClientDetails(val?.data?.responseBody)
          } else {
            setIsLoading(false);
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

    const handleOpenUpload=()=>{
      setIsViewUpload(false)
    }
    const handlePremium=()=>{
      setIsViewPremiumDue(false)
    }
  //   const handleRemove = (file) => {
  //     console.log("file==>",file.labelName,isIDUploadMultipleFiles)
  //     if(isViewUpload){
  //       console.log("hshs")
  //       let updatedFiles = isIDUploadMultipleFiles?.filter((ele)=>{
  //         console.log("llll",ele?.labelName,file.labelName)
  //         return ele?.labelName !== file.labelName
  // });
  // setIsIDMultipleFiles(updatedFiles)
  // setCovidUploadFiles([]);
  // setHypertensionUploadFiles([]);
  // setDiabetesUploadFiles([]);
  // setAsthamaUploadFiles([]);
  //       form.setFieldsValue({
  //         idProof:  `Documents Uploaded -  ${updatedFiles.length }`,
  //       })
  //     }
  //   }
  const handleRemove = (file) => {
    if(file?.labelName === "Covid Questionaires"){
      setCovidUploadFiles([]);
    }else if(file?.labelName === "Hypertension Questionaires"){
      setHypertensionUploadFiles([]);
    }
    else if(file?.labelName === "Diabetes Questionaires"){
      setDiabetesUploadFiles([]);
    }else if(file?.labelName === "Asthama Questionaires"){
      setAsthamaUploadFiles([]);
    }
  
    if(isViewUpload){
      let updatedFiles = isIDUploadMultipleFiles?.filter((ele)=>{
        return ele?.labelName !== file.labelName
});
setIsIDMultipleFiles(updatedFiles)
      form.setFieldsValue({
        idProof:  `Documents Uploaded -  ${updatedFiles.length }`,
      })
    }
   




  };
    const handleOk=()=>{
      setIsViewUpload(false)
    }
    const handleOkPremium =()=>{
      setIsViewPremiumDue(false)
    }

    const handleLinkValue =(item)=>{
      if(item.name==="totalPremiumDue"){
        setIsViewPremiumDue(true);
      //  getPremiumData();

      }
      else{
        setIsViewUpload(true)
      }
    }

    const getPremiumData = () => {
      //setIsPremiumLoder(true);
    let payload={
      "requestHeader": {
        "source": "POS",
        "carrierCode": "2",
        "branch": "PRA",
        "userId": loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID,
        "userRole": "10",
        "partnerId": "MSPOS",
        "processId": "POS",
        "monthendExtension": "N",
        "monthendDate": "16/10/2024"
      },
      "requestbody": {
        "policyNo": customerData?.policyNo,
        "effectiveDate": moment(new Date(), 'YYYYMMDD').format('YYYYMMDD'),
        "action": "A"
      }
    }
    let response = apiCalls.getPremiumEnquiryData(payload);
    response.then((val)=>{
    //  setIsPremiumLoder(false);
      if(val?.data?.responseBody?.errorcode === '1'){
       message.error({
        content: val?.data?.responseBody?.errormessage || "Something went wrong please try again!",
        className: "custom-msg",
        duration: 3,
      });
      }else if(val?.data?.responseHeader?.issuccess === false){
        message.error({
          content: val?.data?.responseHeader?.message || "Something went wrong please try again!",
          className: "custom-msg",
          duration: 3,
        });
       }
      else {
        if (val?.data?.responseBody) {
          form.setFieldsValue({
            totalPremiumDue: (val?.data?.responseBody?.osbal ?  parseFloat(val?.data?.responseBody?.osbal) : 0) + 
            (val?.data?.responseBody?.newamnt  ?  parseFloat(val?.data?.responseBody?.newamnt) : 0) - 
            (val?.data?.responseBody?.cntsusp  ?  parseFloat(val?.data?.responseBody?.cntsusp) : 0) + 
            (val?.data?.responseBody?.hrifeecnt  ?  parseFloat(val?.data?.responseBody?.hrifeecnt) : 0)
          })
          setPremiumData(val?.data?.responseBody);
        }
        
      } 
      
    }).catch((err)=>{
      //setIsPremiumLoder(false);
    })
  }
 const setInternalReqData = () => {
    POSContactData.serviceRequestTransectionData?.forEach(element => {
       if(element.tagName === 'InternalRequirementValue'){
           
             setInternalFlowRequirements(props.interlRequirementTagValue);
       };
     });
 }
  let boeScreenObj={};
  let internalData = [
    { name: "authorizercomments", label: "Authorizer Comments ", inputType: "text", required: false, disabled: true, placeholder: "Authorizer Comments" },
    { name: "Comments", label: "Requestor Comments", inputType: "textarea", maxlength: 500, required: false, validationmsg: "Enter Comments", placeholder: "Requestor Comments" },
    { name: "uploaddocuments", indexName: "Upload Documents", label: "Upload Documents", inputType: "upload", placeholder: "Upload Documents" },
    { name: "viewRequirements", indexName: "View Requirements", label: "View Requirements", inputType: "button", placeholder: "View Requirements" }
  ]
  useEffect(() => {
    if (customerData?.isInternalFlow) {
      POSContactData?.serviceRequestTransectionData?.forEach(element => {
        boeScreenObj[element.tagName] = element.tagValue
      });
      form.setFieldsValue({
        authorizercomments: boeScreenObj?.POSComments1,
      })
      setInternalReqData();

    }
  }, [])

    return ( 
        <>
         {/* <Spin spinning={isLoading} fullscreen /> */}
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
        onFinish={customerData?.isInternalFlow ? "" : handleSubmit}
        autoComplete="off"
      >
        {
          customerData?.isInternalFlow ?
            <>
              <InternalFlow data={internalData}
                suffix={!isShowPOSScreen && suffix}
                policyDetails={props?.details?.policyDetailsObj?.identifiers?.applicationNo}
                form={form}
                customerData={customerData}
                POSContactData={POSContactData}
                boeScreenObj={boeScreenObj}
                Docs={InternaRequirements}
              />
            </>

            :(
<>
{selectedSubType==="revivalquotation"&&
        <>
          {!isShowPOSScreen&&
          <>
              {renderDetailsForm("BOE_Details")}
         </> 
         }
       
    

         {isShowPOSScreen&&
         <>
              {renderDetailsForm("POS_Details")}
         </> 
         }
         
         <div className="contact-details-btn">
              <Button type="primary" htmlType="submit" className="primary-btn">
                {isShowPOSScreen? "Approve": "Submit"}
              </Button>{" "}
              {/* <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button> */}
                {isShowPOSScreen &&(
                        <>
                          <Button
                            type="primary"
                            className="primary-btn"
                            onClick={() => getInternal()}
                          >
                       Internal Requirement                   
                           </Button>
                        </>
                      )}        
              </div>
        </>}

        {/* {selectedSubType==="revivalquotation"&&<>
       
        {!isShowPOSScreen&&<>
          <DetailsForm
          data={
              RevivalData[selectedSubType]?.Out_Of_Revival
          }
          subType={selectedSubType}
          handleDropdownChange={handleDropdownChange}
        ></DetailsForm>
         {selectionRevival==="yes"&&<>
        <div className='text-center'>
            <p>Policy is out of Revival period, hence policy cannot be revived !</p>
        </div>
        </>}
        {selectionRevival==="no"&&<>
        <DetailsForm
          data={
              RevivalData[selectedSubType]?.Out_Of_Revival_Yes_Fields
          }
          subType={selectedSubType}
          handleLabelLink={handleLabelLink}
          toggleInputField={toggleInputField}
          showEmailAddress={showEmailAddress}
          showPhoneNumber={showPhoneNumber}
          showWhatsApp={showWhatsApp}
        ></DetailsForm>
           {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}

          <div className="contact-details-btn">
              <Button type="primary" htmlType="submit" className="primary-btn">
                Submit
              </Button>{" "}
              <Button type="primary" className="primary-btn" onClick={()=>handleRaiseRequest()}>
                Raise Request
              </Button>{" "}
            </div>
        </>}
        </>}
        {isShowPOSScreen&&<>
            <DetailsForm
          data={RevivalData[selectedSubType]?.POS_Details}
          subType={selectedSubType}
          handleDropdownChange={handleDropdownChange}
        ></DetailsForm>
        {paymentViaSelection?.includes("cash")&&<>
        <DetailsForm
          data={RevivalData[selectedSubType]?.Cash_Details}
          subType={selectedSubType}
          suffix={suffix}
          form={form}
          getUploadFiles={getUploadFiles}
          handleRadioChange={handleRadioChange}
          //handleMultipleCheckBox={handleMultipleCheckBox}
        ></DetailsForm>
        </>}
        {paymentViaSelection?.includes("cheque")&&<>
        <DetailsForm
          data={RevivalData[selectedSubType]?.Cheque_Details}
          subType={selectedSubType}
          suffix={suffix}
          form={form}
          getUploadFiles={getUploadFiles}
          handleRadioChange={handleRadioChange}
        //  handleMultipleCheckBox={handleMultipleCheckBox}
        ></DetailsForm>
        </>}
        {paymentViaSelection?.includes("online")&&<>
        <DetailsForm
          data={ RevivalData[selectedSubType]?.Online_Details}
          subType={selectedSubType}
          toggleInputField={toggleInputField}
              showEmailAddress={showEmailAddress}
              showPhoneNumber={showPhoneNumber}
              showWhatsApp={showWhatsApp}
          suffix={suffix}
          form={form}
          getUploadFiles={getUploadFiles}
          handleRadioChange={handleRadioChange}
         // handleMultipleCheckBox={handleMultipleCheckBox}
        ></DetailsForm>
           {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}

        </>}
        <div className="contact-details-btn">
              <Button type="primary" htmlType="submit" className="primary-btn">
                Submit
              </Button>{" "}
            </div>
        </>}
        </>} */}

        {/* {
          selectedSubType==="revivalwithdgh" && <>
          {!isShowPOSScreen&&<> 
       
         </> 
         
         } */}

           {/* {selectedSubType==="revivalwithdgh"&&<>
          {!isShowPOSScreen&&
          <>
              {renderDetailsForm("BOE_Details")}
         </> 
         }
  
          </>
          
         } */}

        {selectedSubType==="statusenquiry"&&<>
          {!isShowPOSScreen&&<>
              {/* {renderDetailsForm("BOE_Details")} */}
              <ExistUpdateCheckBoxList
                checkedList={checkedList}
                handleChange={handleChange}
                options={[
                  { label: 'View Existing Details', value: 'View Existing Details', name: 'ViewExistingPolicyDetails' },
                  { label: 'Share Process Communication', value: 'Share Process Communication', name: 'Share Process Communication' },
                  { label: 'Request For Cheque Pick Up', value: 'Request For Cheque Pick Up', name: 'Request For Cheque Pick Up' },
                ]}
              />
              {checkedList?.includes("View Existing Details")&&<>
              {renderDetailsForm("ViewExisting_Details")}
              </>}
              {checkedList?.includes("Share Process Communication")&&<>
              {renderDetailsForm("Share_Process_Details")}
              {showEmailFields&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
              </>}
         </> }
         {isShowPOSScreen&&<>
          {renderDetailsForm("POS_Details")}
         </>}

         {(checkedList?.length>0||isShowPOSScreen)&&<>
         <div className="contact-details-btn">
              <Button type="primary" htmlType="submit" className="primary-btn">
                Submit
              </Button>{" "}
              <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
                {isShowPOSScreen &&(
                        <>
                          <Button
                            type="primary"
                            className="primary-btn"
                            onClick={() => getInternal()}
                          >
                       Internal Requirement                   
                           </Button>
                        </>
                      )}        
              </div>
            </>}
        </>}
        {selectedSubType==="revivalpickup"&&
        <>
          {!isShowPOSScreen&&
          <>
              {renderDetailsForm("BOE_Details")}
         </> 
         }
       
    

         {isShowPOSScreen&&
         <>
              {renderDetailsForm("POS_Details")}
         </> 
         }
         
         <div className="contact-details-btn">
              <Button type="primary" htmlType="submit" className="primary-btn">
                {isShowPOSScreen? "Approve": "Submit"}
              </Button>{" "}
              <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
                {isShowPOSScreen &&(
                        <>
                          <Button
                            type="primary"
                            className="primary-btn"
                            onClick={() => getInternal()}
                          >
                       Internal Requirement                   
                           </Button>
                        </>
                      )}        
              </div>
        </>}

        {/* Revvv */}

        {selectedSubType==="revivalwithdgh"&&
        <>
          {customerData?.isPOS?
          <>
          {renderDetailsForm("POS_Details")}
          <div className="contact-details-btn">
              <Button type="primary" htmlType="submit" className="primary-btn">
                Approve
              </Button>{" "}
              <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
                        <>
                          {/* <Button
                            type="primary"
                            className="primary-btn"
                            onClick={() => getInternal()}
                          >
                       Internal Requirement                   
                           </Button> */}
                             <InternalFlowPOS interlRequirementTagValue1 = {props.interlRequirementTagValue} selectedList = {POSContactData.serviceRequestTransectionData} getInternal = {getInternal} internalReqForm={internalReqForm}/>
                        </>
                          
              </div>
             
         </> :<> {renderDetailsForm("BOE_Details")}
         
         <div className="contact-details-btn">
              <Button type="primary" htmlType="submit" className="primary-btn" disabled={(isAreAllQuestionsDGH || isAreSupporting || isSignatureValidate)}>
                {isShowPOSScreen? "Approve": "Submit"}
              </Button>{" "}
              <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
                {isShowPOSScreen &&(
                        <>
                          <Button
                            type="primary"
                            className="primary-btn"
                            onClick={() => getInternal()}
                          >
                       Internal Requirement                   
                           </Button>
                        </>
                      )}        
              </div>
         </>
         } 
         
         
         
        </>}
        </>
            )}
        </Form>

        {showAlert && (
        <PopupAlert
          alertData={alertData}
          title={alertTitle}
          getAdvance={props?.getAdvance}
          navigate={navigateTo}
          setShowAlert={setShowAlert}
        ></PopupAlert>
      )}

<Modal
        title="Requirements"
        open={raiseRequirementOpen}
        destroyOnClose={true}
        width={1200}
        closeIcon={false}
        footer={null}
      >
        <Spin spinning={requirementModalLoader}>
          <div  >
            <Form onFinish={handleRequirementSubmit}>
              <div className="reuirement">

              
              <table className="responsive-table">
                <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Description</th>
                  <th className="z-index">Select</th>
                </tr></thead>
                <tbody>
                  {raiseRequerimentList?.map((item, ind) => (
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
              {/* <div className="text-area mt-16">
             <Form.Item
                      // label={<span>{"Comment"} <sup>*</sup>
                      // </span>}
                      name="requirementCmnt"
                      className="inputs-label mb-0"
                      rules={[
                        {
                          required: true,
                          message: "Enter Comments",
                        },
                      ]}
                    >
                       <TextArea rows={2} value={requirementCmnt} placeholder="Comments" onChange={(e)=>setRequirementCmnt(e.currentTarget.value)}/>
                    </Form.Item>
                  </div> */}
          <div className="contact-details-btn">
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit"
                  //onClick={()=>handleRequirementSubmit()}
                >
                  Submit
                </Button>

                <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => setRaiseRequirementOpen(false)}
                >
                  Close
                </Button>
              </div>
            </Form>
          </div>

          
        </Spin>
      </Modal>

        <Modal
        title="Total Premium Due"
        open={totalFundsModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setTotalFundModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="table-container">
          <table className="responsive-table">
            <tr>
              <td width={50}>Annualised Premium</td>
              <td width={70}></td>
            </tr>
            <tr>
              <td>Total Modal Premium + Tax</td>
              <td></td>
            </tr>
            <tr>
              <td>Interest Amount</td>
              <td></td>
            </tr>
            <tr>
              <td>Amount in Suspense (Debit/Credit)</td>
              <td></td>
            </tr>
            <tr>
              <td>Total Premium due</td>
              <td></td>
            </tr>
          </table>
        </div>
      </Modal>

      <Modal
        title="View List of Questionaires"
        open={isViewUpload}
        destroyOnClose={true}
        width={1000}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => handleOpenUpload()}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="reuirement">
          <table className="responsive-table">
            <tr>
              <th>Sr No</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
            <tr>
              <td>1</td>
              <td>Covid Questionaires</td>
              <td>
              <Upload 
                      {...uploadProps} 
                      fileList={covidUploadFiles}
                      onRemove={handleRemove}
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG"
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Covid Questionaires","idProofUpload")}

                    action={
                      "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                    }
                      >
                         {suffix}
                        </Upload>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Hypertension Questionaires</td>
              <td>
              <Upload 
                      {...uploadProps} 
                      fileList={hypertensionUploadFiles}
                      onRemove={handleRemove}
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,.pdf"
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Hypertension Questionaires","idProofUpload")}
                    action={
                      "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                    }
                      >
                         {suffix}
                        </Upload>
                        {/* {passportUploadFiles.name} */}
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Diabetes Questionaires</td>
              <td>
              <Upload 
                      {...uploadProps} 
                      fileList={diabetesUploadFiles}
                      onRemove={handleRemove}
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.pdf,.PDF"
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Diabetes Questionaires","idProofUpload")}
                    action={
                      "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                    }
                      >
                         {suffix}
                        </Upload>
                        {/* {rationCardUploadFiles.name} */}
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Asthama Questionaires</td>
              <td>
              <Upload 
                      {...uploadProps} 
                      fileList={asthamaUploadFiles}
                      onRemove={handleRemove}
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,pdf"
                      customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Asthama Questionaires","idProofUpload")}
                    action={
                      "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                    }
                      >
                         {suffix}
                        </Upload>
              </td>
            </tr>
          </table>

          <div className="contact-details-btn">
            <Button
              type="primary"
              className="primary-btn"
              onClick={() => handleOk()}
            >
              Ok
            </Button>
          </div>
        </div>
      </Modal>


      {/* Due To */}
      {/* <Modal
        title="Total Premium Due"
        open={isViewPremiumDue}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => handlePremium()}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="reuirement">
          <table className="responsive-table">
            <tr>
              <td>Annualised Premium</td>
              <td>
              <Input
            type="text"
            className="input-label"
            maxLength={6}
          
          />
              </td>
            </tr>
            <tr>
              <td>Total Modal Premium + Tax</td>
              <td>
              <Input
            type="text"
            className="input-label"
            maxLength={6}
          
          />
              </td>
            </tr>
            <tr>
              <td>Interest Amount</td>
              <td>
              <Input
            type="text"
            className="input-label"
            maxLength={6}
          
          />
              </td>
            </tr>
            <tr>
              <td>Amount in Suspense (Debit/Credit)</td>
              <td>
              <Input
            type="text"
            className="input-label"
            maxLength={6}
          
          />
              </td>
            </tr>
            <tr>
              <td>Interest Waiver Campaign Amount</td>
              <td>
              <Input
            type="text"
            className="input-label"
            maxLength={6}
          
          />
              </td>
            </tr>
            <tr>
              <td>Total Premium Due</td>
              <td>
              <Input
            type="text"
            className="input-label"
            maxLength={6}
          
          />
              </td>
            </tr>
          </table>

          <div className="contact-details-btn">
            <Button
              type="primary"
              className="primary-btn"
              onClick={() => handleOkPremium()}
            >
              Ok
            </Button>
          </div>
        </div>
      </Modal> */}

<Modal
         title="View Premium Details"
         open={isViewPremiumDue}
         destroyOnClose={true}
         closeIcon={
           <Tooltip title="Close">
             <span onClick={() => handlePremium()}>
               <img src={CloseIcon} alt=""></img>
             </span>
           </Tooltip>
         }
        footer={null}
      >
         <Spin spinning={isPremiumLoader}>
     
  {/* <Form
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
    // onFinish={searchData}
    autoComplete="off"
  > */}
    {/* <Row gutter={[12, 12]} className="mb-16">
    <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
        <Form.Item
          name="PolicyNo"
          label="Annualised Premium"
          className="inputs-label mb-0"
        >
          <Input
            placeholder="Enter Annualised Premium"
            className="cust-input modal-input"
            maxLength={100}
          />
        </Form.Item>
      </Col>
      <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
                <Form.Item
                  label="Total Modal Premium + Tax"
                  name="TotalModalPremium"
                  className="inputs-label mb-0"
                >
                  <Input
            placeholder="Total Modal Premium + Tax"
            className="cust-input modal-input"
            maxLength={100}
          />
                </Form.Item>
              </Col>
              <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
                <Form.Item
                  label="Interest Amount"
                  name="interestAmount"
                  className="inputs-label mb-0 subtype right-colsize"
                >
                  <Input
            placeholder="Interest Amount"
            className="cust-input modal-input"
            maxLength={100}
          />
                      
                </Form.Item>
          
              </Col>
              <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
                <Form.Item
                  label="Amount in Suspense (Debit/Credit)"
                  name="amountinSuspense"
                  className="inputs-label mb-0"
                >
                  <Input
            placeholder="Enter Amount in Suspense (Debit/Credit)"
            className="cust-input modal-input"
            maxLength={100}
          />
                </Form.Item>
              </Col>
              <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
                <Form.Item
                  label="Interest Waiver Campaign Amount"
                  name="interestWaiverCampaignAmount"
                  className="inputs-label mb-0 subtype right-colsize"
                >
                  <Input
            placeholder="Enter Interest Waiver Campaign Amount"
            className="cust-input modal-input"
            maxLength={100}
          />
                      
                </Form.Item>
          
              </Col>
      <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
        <div>
        <Form.Item
                  label="Total Premium Due"
                  name="totalPremiumDue"
                  className="inputs-label mb-0 subtype right-colsize"
                >
                  <Input
            placeholder="Enter Total Premium Due"
            className="cust-input modal-input"
            maxLength={100}
          />
                      
                </Form.Item>
        </div>
      </Col>
  
    
    
    </Row> */}

<table style={{ width: "100%", borderCollapse: "collapse" }}>
          {/* <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  border: "1px solid black",
                  padding: "8px",
                }}
              >
                Description
              </th>
              <th
                style={{
                  textAlign: "left",
                  border: "1px solid black",
                  padding: "8px",
                }}
              >
                Value
              </th>
            </tr>
          </thead> */}
          <tbody>
            <tr>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                Base Premium
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {premiumData?.zsprm}
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                GST on Base Premium
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
              {premiumData?.totaltax}
              </td>
            </tr>
            <tr>
              {/* <td style={{ border: "1px solid black", padding: "8px" }}>
                Interest
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
              {premiumData?.zsprm}
              </td> */}
            </tr>
            <tr>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                GST on Interest
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
              {premiumData?.hrifeecnt}
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                Suspense Amount
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
              {premiumData?.cntsusp}
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                Waiver Amount
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
              {premiumData?.NA || "NA"}
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                Total Premium Due
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
              {(premiumData?.osbal ?  parseFloat(premiumData?.osbal) : 0) + 
(premiumData?.newamnt  ?  parseFloat(premiumData?.newamnt) : 0) - 
(premiumData?.cntsusp  ?  parseFloat(premiumData?.cntsusp) : 0) + 
(premiumData?.hrifeecnt  ?  parseFloat(premiumData?.hrifeecnt) : 0)}
              </td>
            </tr>
          </tbody>
        </table>
  {/* </Form> */}
  </Spin>


      </Modal>
        </>
    ); 
} 
export default Revival;
