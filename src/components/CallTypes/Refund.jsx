import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Spin, Button, Row, Col, Checkbox,message,Modal, Input, DatePicker } from "antd";
import { RefundData } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import moment from "moment";
import UploadIcon from "../../assets/images/upload.png";
import apiCalls from "../../api/apiCalls";
import PopupAlert from "../popupAlert";
import dayjs from "dayjs";
import OTPModal from "../../utils/OTPModal";
import RaiseRequirementPopup from "../RaiseRequirementPopup";

const Refund = (props) => {
  const loginInfo = useSelector(state => state);
  const { selectedSubType, clientRoleLU,setSelectedSubType,typesForm,details,customerData,POSContactData,clientEnquiryData, requestModeLU,bankAccTypeLU } = props;
  const suffix = <img src={UploadIcon} alt="" />;
  const [form] = Form.useForm();
  const [requirementsForm] = Form.useForm();
  const dateFormat = "DD/MM/YYYY";
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
  const [isRTOSelection,setIsRTOSelection] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertData, setAlertData] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [uploadFiles,setUploadFiles] = useState([]);
  const [isShowOTPModal,setIsShowOTPModal] = useState(false);
  const [isShowRequestDetails,setIsShowRequestDetails] = useState(false);
  const [ClientEnquiry, setClientEnquiry]= useState({});
  const [disableOTP,setDisableOTP] = useState(false);
  const [validateOTPSuccess, setValidateOTPSuccess] = useState(false);
  const [disableRequestForm,setDisableRequestForm] = useState(false);
  const [updateFields, setUpdateFields] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [serviceRequestId, setServiceRequestId] = useState(null);
  const [isLoader,setIsLoader] = useState(false);
  const [isEditNominee, setIsEditNominee] = useState(false);
  const [IsPosEdited,setIsPosEdited] = useState(false);
  const [showFundTransfer, setShowFundTransfer] = useState(false);
  const [showUpdateBankDetails, setShowUpdateBankDetails] = useState(false);
  const [BankAccountNumber, setBankAccountNumber] = useState("");
  const [updateNomineeData, setUpdateNomineeData] = useState([
    { id:1,accountNumber: '', bankName: '', ifsc: '', transactionDate: '', bounceCharges: 0 }
  ]);
  const [posUpdateNomineeData,setPosUpdateNomineeData] = useState([])

  const [rows, setRows] = useState([
    { accountNumber: '', bankName: '', ifsc: '', transactionDate: '', bounceCharges: 0 }
  ]);

  const addRow = () => {
    const newId = updateNomineeData?.length + 1;
    const newRow = { id: newId, accountNumber: '', bankName: '', ifsc: '', transactionDate: '', bounceCharges: 0 };
    setRows([...rows, { accountNumber: '', bankName: '', ifsc: '', transactionDate: '', bounceCharges: 0 }]);
    setUpdateNomineeData([...updateNomineeData, newRow]);
  };

  const deleteRow = (index) => {
    const newRows = updateNomineeData?.filter((_, i) => i !== index);
    setRows(newRows);
    setUpdateNomineeData(newRows);
  };
  const handleDeleteRow = (id, index) => {
    if (updateNomineeData.length > 1) {
      form.setFieldsValue({
        updateNomineeData: {
          [id]: {
            transactionDate: "",
            accountNumber: null,
            ifsc: "",
            bounceCharges: null,
            bankName : "",
          },
        },
      });
      const updatedupdateNomineeData = updateNomineeData.filter((row) => row.id !== id);
      setUpdateNomineeData(updatedupdateNomineeData);
    // Reset the form instance to reflect the changes
    form.resetFields([ `updateNomineeData[${index}].transactionDate`, `updateNomineeData[${index}].accountNumber`, `updateNomineeData[${index}].ifsc`, `updateNomineeData[${index}].bounceCharges`, `updateNomineeData[${index}].bankName`], );
    
    }
  };

  const handleLabelLink  =(item)=>{
    if(item.label === "Initiate Penny Drop"){

      InitiatePennyDropp();
    }
  };

  const InitiatePennyDropp = () => {
    setIsLoader(true);
    const values = form.getFieldsValue();
    if(!values?.BankAccountNumber || !values?.NameAsMentionedInTheBank || !values?.BankIFSC){
      message.destroy();
      message.error({
        content:"Enter All Mandatory Feilds",
        className: "custom-msg",
        duration: 2,
      });
      setIsLoader(false);
     return;
    }
    else if(isShowPOSScreen && (!values?.BankAccountNumber || !values?.NameAsMentionedInTheBank || !values?.BankIFSC)){
      message.destroy();
      message.error({
        content:"Enter All Mandatory Feilds",
        className: "custom-msg",
        duration: 2,
      });
      setIsLoader(false);
     return;
    }
   
    let obj = {
        "accountNumber":values?.BankAccountNumber,
        "accountHolderName":isShowPOSScreen ? values?.NameAsMentionedInTheBank  : values?.NameAsMentionedInTheBank,
        "ifsc": isShowPOSScreen ? values?.BankIFSC : values?.BankIFSC,
        "consent": "Y",
        "nameMatchType": "Individual",
        "useCombinedSolution":"N",
        "allowPartialMatch": "true",
        "preset": "G",
        "suppressReorderPenalty": "true",
        "clientData":{
          caseId: "null"
         }
    };

    var pennyPayload = {
      requestHeader : { source : "POS"},
      requestBody : obj
    }
    let response = apiCalls.bankaccverification(pennyPayload);
    response
      .then((result) => {
        if (result?.data?.responseBody) {
          
         if(result?.data?.responseBody?.statusCode === 101){
          form.setFieldsValue({
            PennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.bankResponse,
            POSPennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.bankResponse,
            NameasperPennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName,
            POSNameasperPennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName,
          })
          setIsLoader(false);
         }else{
          form.setFieldsValue({
            PennyDrop: result?.data?.responseHeader?.message,
            POSPennyDrop: result?.data?.responseHeader?.message,
          })
          setIsLoader(false);
         }
          //SUCCESSFUL TRANSACTION
        } else {
          setIsLoader(false);
          form.setFieldsValue({
            PennyDrop: 'Invalid Input',
         
          })
          message.error({
            content:
            result?.data?.responseBody?.errormessage ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
          setIsLoader(false);
        }
      })
      .catch((err) => {
        setIsLoader(false);
        form.setFieldsValue({
          PennyDrop: 'Invalid Input',
       
        })
        setIsLoader(false);
      });
  };
  
  const getIFSCBankDetails =async(ifscCode,row)=>{
    setIsLoading(true);
    let response = await apiCalls.getIFSCBanks(ifscCode);
    if (response.statusText) {
          if (response?.data.length >0) {
            form.setFieldsValue({
              branchName:response?.data[0]?.branch,
              bankName:response?.data[0]?.bank,
              getIFSCBankDetails: {
                  [row?.id]: {
                    bankName: response?.data[0]?.bank,
                    BranchName: response?.data[0]?.branch,
                    branchName:response?.data[0]?.branch,
                    bankName:response?.data[0]?.bank
                  },
              },
          });
              // nomineebankform.setFieldsValue({
            //   bankName: response?.data[0]?.bank,
            //   BranchName: response?.data[0]?.branch
            // })
            setIsLoading(false);
          } else {
            message.error({
              content:
              response?.data?.responseBody?.errormessage ||
                "Invalid IFSC",
              className: "custom-msg",
              duration: 2,
            });
            setIsLoading(false);
            form.setFieldsValue({
              getIFSCBankDetails : {
                  [row?.id]: {
                    IFSC: "",
                    bankName: "",
                    BranchName: ""
                  },
              },
          });
            
          }
        }
  }

  const totalBounceCharges = updateNomineeData?.reduce((total, row) => total + parseFloat(row.bounceCharges || 0), 0);
  const totalPOSBounceCharges = posUpdateNomineeData?.reduce((total, row) => total + parseFloat(row.bounceCharges || 0), 0);
  const handleDate =()=>{}
  const handleKeyDown = (pattern, e, type) => {
    // Get the pressed key
    const key = e.key;
    let specialCharacterRegex = '';
  
    if (pattern === 'numbersOnly') {
  
      const inputValue = e.target.value;
      if (inputValue.includes('.')) {
          specialCharacterRegex = /^[0-9]$/; 
      } else {
          specialCharacterRegex = /^[0-9.]$/;
      }
      
       // specialCharacterRegex = /^[0-9]$/;
    } else if (pattern === 'charactersOnly') {
        specialCharacterRegex = /^[a-zA-Z0-9]$/;
    } else if (pattern === 'alphabatesOnly') {
        specialCharacterRegex = /^[a-zA-Z]$/;
    } else if (pattern === "decimalOnly") {
        const inputValue = e.target.value;
        if (inputValue.includes('.')) {
            specialCharacterRegex = /^[0-9]$/; 
        } else {
            specialCharacterRegex = /^[0-9.]$/;
        }
    }
  
    if (key === 'Backspace' || key.startsWith('Arrow')) {
        return;
    }
  
    // Check if the pressed key matches the allowed pattern
    if (!specialCharacterRegex.test(key)) {
        e.preventDefault(); // Prevent the key from being entered into the input field
    }
  }

  const validateIFSCNumber = (_, value) => {
    if (value && !/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/.test(value)) {
      return Promise.reject("IFSC number must be 11 characters alphanumeric");
    } else {
      return Promise.resolve();
    }
  };
  const handleAccNumberChange = (index, field,value) => {
    const updatedData = [...updateNomineeData];
    updatedData[index][field] = value;
    setUpdateNomineeData(updatedData);
  };
  const handlePOSNomineeFirstNameChange = (index, field, newValue) => {
    setPosUpdateNomineeData(prevData => {
        return prevData?.map((item, i) => 
            i === index ? { ...item, [field]: newValue } : item
        );
    });
};
  const paMandateCancellationObj={}
  useEffect(()=>{
    setShowEmailFields(false);
    setActiveEmailIcons([]);
    setActiveMobileIcons([]);
    setActiveWhatsAppIcons([]);
    getClientEnquiry();
    setDisableRequestForm(false);
    setShowUpdateBankDetails(false);
    setShowFundTransfer(false);
    form.resetFields();
   // getTransacions();
  },[selectedSubType]);
  useEffect(() => {
  if(props?.EmailResponse?.IsEmailmanagent){ 
    RefundData[selectedSubType]?.Customer_Choice?.forEach(element=>{
      if (element?.name === "customerchoice") {
        element.hide = true;
      }
    })
    
    RefundData[selectedSubType]?.Request_Details?.forEach(element=>{
      if (element?.name === "requestchannel") {
        form.setFieldsValue({
          requestchannel: 4,
          // requestmode: "Email",
        });
        element.disabled = true;
      }
      if(element?.name==="requestform"|| element?.name==="CustomerSigningDate"||element?.name==="branchreceiveddate"||element?.name==="ValidateSignature"){
        element.hide=true
    
  }
})
RefundData[selectedSubType]?.BOE_Details?.forEach(element=>{
      if (element?.name === "requestchannel") {
        form.setFieldsValue({
          requestchannel: 4,
          // requestmode: "Email",
        });
        element.disabled = true;
      }
    })
  RefundData[selectedSubType]?.BOE_Details?.forEach(element=>{
    if(element?.name==="UploadRequestFormEmail"||element?.name==="CustomerSiginingDate"||element?.name==="RequestReceivedDate" ||element?.name==="ValidateSignature"||element?.name==="ReasonForDelayedSubmission"||element?.name==="Upload Doucments"){
      element.hide=true

  }
  })
  RefundData[selectedSubType]?.RequestForm_Fields?.forEach(element => {
    if(element?.name==="CustomerSigningDate"||element?.name==="BranchReceivedDate"||element?.name==="ValidateSignature"){
      element.hide=true;
    }
  })
  if (!RefundData[selectedSubType]) {
    RefundData[selectedSubType] = {}; // Initialize if undefined
  }
  if(selectedSubType==='postissuanceexcessrefund'){
  if (!Array.isArray(RefundData[selectedSubType]?.BOE_Details)) {
    RefundData[selectedSubType].BOE_Details = [];
}
RefundData[selectedSubType].BOE_Details = RefundData[selectedSubType].BOE_Details.filter(
    comment => comment.name !== "AdditionalNoteForCustomer"
);
RefundData[selectedSubType].BOE_Details.push(
  {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 4000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
  });  
}
    if (!Array.isArray(RefundData[selectedSubType]?.Comments)) {
      RefundData[selectedSubType].Comments = [];
  }
  RefundData[selectedSubType].Comments = RefundData[selectedSubType].Comments.filter(
      comment => comment.name !== "AdditionalNoteForCustomer"
  );
  RefundData[selectedSubType].Comments.push(
    {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 4000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
    });
    }
  },[selectedSubType])
  useEffect(() => {
     if(POSContactData && customerData?.isPOS && (selectedSubType==="autopaybouncecharges")){
      POSContactData?.serviceRequestTransectionData?.forEach(element => {
        paMandateCancellationObj[element.tagName] = element.tagValue
      });

      setIsShowPOSScreen(true);
      setUpdateFields(false);
      form.setFieldsValue({
        requestchannel: POSContactData?.reqMode,
        RequestorComments: paMandateCancellationObj?.RequestorComments,
        ValidateSignature:paMandateCancellationObj?.ValidateSignature,
        CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
       BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
        ReasonForDelay: POSContactData?.reasonDelayed,
      })
     // Filter data for items with status 'Create'
const newData = POSContactData?.serviceRequestTransectionData?.filter(item => item.status === 'Create');

// Consolidate data into an array of objects
const consolidatedNewData = newData.reduce((acc, item) => {
  const match = item.tagName?.match(/_(\d+)$/);
  if (match) {
    const index = match[1];
    const fieldName = item.tagName.replace(`_${index}`, '');
    const currentIndex = acc.findIndex((el) => el.index === index);
    if (currentIndex === -1) {
      acc.push({ index, [fieldName]: item.tagValue });
    } else {
      acc[currentIndex][fieldName] = item.tagValue;
    }
  }
  return acc;
}, []);
setPosUpdateNomineeData(consolidatedNewData);

      if(paMandateCancellationObj?.ValidatedBy==="requestform"){
        RefundData[selectedSubType]?.POS_Details?.forEach(element => {
          if(element?.label==="Request Form"||element?.label?.includes("Customer Signing Date")||element?.label?.includes("Request Received Date")||
          element?.label==="Signature Validated"){
            element.hide= false;
            setUpdateFields(true);
          }
        });
      }
      else if(paMandateCancellationObj?.ValidatedBy==="otp"){
        RefundData[selectedSubType]?.POS_Details?.forEach(element => {
          if(element?.label==="Request Form"||element?.label?.includes("Customer Signing Date")||element?.label?.includes("Request Received Date")||
          element?.label==="Signature Validated"){
            element.hide= true;
            setUpdateFields(true);
          }
        });
      }
        RefundData[selectedSubType]?.POS_Details?.forEach(element => {
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

    if(POSContactData && customerData?.isPOS && (selectedSubType==="decline" || selectedSubType==="postpone" || selectedSubType==="withdrawn" || selectedSubType==="excesspremium")){
      
      POSContactData?.serviceRequestTransectionData?.forEach(element => {
        paMandateCancellationObj[element.tagName] = element.tagValue
      });
      setIsShowPOSScreen(true);
      setUpdateFields(false);
      form.setFieldsValue({
        enterRefundAmount: paMandateCancellationObj?.enterRefundAmount,
        requestFor : paMandateCancellationObj?.proceedFor,
        requestchannel: paMandateCancellationObj?.requestchannel,
        BankIFSC : paMandateCancellationObj?.BankIFSC,
        bankName : paMandateCancellationObj?.bankName,
        BranchName : paMandateCancellationObj?.BranchName,
        AccountType : paMandateCancellationObj?.AccountType,
        NameAsMentionedInTheBank : paMandateCancellationObj?.NameAsMentionedInTheBank,
        BankAccountNumber : paMandateCancellationObj?.BankAccountNumber,
        ConfirmBankAccountNumber : paMandateCancellationObj?.ConfirmBankAccountNumber,
        PennyDrop : paMandateCancellationObj?.PennyDrop,
        NameMatch : paMandateCancellationObj?.NameMatch,
        NameasperPennyDrop : paMandateCancellationObj?.NameasperPennyDrop,
        fundTranferTo : paMandateCancellationObj?.fundTranferTo,
        fundTransferAmount : paMandateCancellationObj?.fundTransferAmount,
        relationToFTPolicy : paMandateCancellationObj?.relationToFTPolicy,
        nameOfFTPolicyOwner : paMandateCancellationObj?.nameOfFTPolicyOwner,
      })

    }
    },[])

  const getClientEnquiry = async () => {
    try {
      setIsLoading(true);
      //setDisableOTP(true);
      const clientNumber= customerData?.poClientID;
      const obj = { clientNumber };
      const response = await apiCalls.getClientEnquiry(obj,loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID);
      if (response?.data) {
        const res = response?.data?.responseBody;
        setClientEnquiry(res);
        // if(res?.rmblphone){
        //     setDisableOTP(false);
        //   }
        setIsLoading(false);
      } else {
        setIsLoading(false);
        handleError(response?.data?.responseBody?.errormessage || "Something went wrong, please try again!");
      }
    } catch (error) {
      setIsLoading(false);
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
    if(value?.includes("Send Soft Copy")){
        setSelectedSubType("sendsoftcopy");
        typesForm?.setFieldsValue({subType: 2})
    }
  };

  const handleDropdownChange = (e,item) => {
    if(item?.label?.includes("RTO Status")){
        setIsRTOSelection(e);
    }
  };
  const handleTextLink=(item)=>{
    if(item?.linkValue?.toLowerCase() === "view"){
          const gConfig= apiCalls.getGenericConfig()
          if(gConfig?.data?.dmsApiUrl){
     const url = gConfig?.data?.dmsApiUrl + `/omnidocs/WebApiRequestRedirection?Application=BPMPOLENQ&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${details?.policyDetailsObj?.identifiers?.applicationNo}`;
     window.open(url, '_blank');
          }
   }
 }

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

  const handleRadioChange = (e, item) => {
    setShowRaiseRequirementBtn(false);
    setIsShowOTPModal(false)
    if(selectedSubType==="autopaybouncecharges"){
         if(e.target.value === "otp"){
            setIsShowOTPModal(true);
            setIsShowRequestDetails(false);
          }
          else if(e.target.value === "requestform"){
           setIsShowRequestDetails(true);
          }
       else if(e.target.value  === "no"&&item?.label?.includes("Validate Signature")){
        setShowRaiseRequirementBtn(true);
      }
      else if(e.target.value  === "yes"&&item?.label?.includes("Validate Signature")){
        setShowRaiseRequirementBtn(false);
      }
    }
    if(selectedSubType === "decline" || selectedSubType === "postpone" || selectedSubType === "withdrawn" || selectedSubType === "excesspremium"){
      if(item?.label === "Proceed For" && e.target.value === "Payout"){
        setShowUpdateBankDetails(true);
        setShowFundTransfer(false);
      }
      if(item?.label === "Proceed For" && e.target.value === "Fund Transfer"){
        setShowFundTransfer(true);
        setShowUpdateBankDetails(false);
      }
      setIsShowOTPModal(false);
      let selectionValue = e.target.value;
       if(selectionValue === "otp"&&item?.label?.includes("Customer Choice")){
        setIsShowOTPModal(true);
        }
        else if(selectionValue === "requestform"&&item?.label?.includes("Customer Choice")){
          setIsShowOTPModal(false);
        }
        if(selectionValue === "no"&&item?.label?.includes("Validate Signature")){
          setShowRaiseRequirementBtn(true);
          }
          else if(selectionValue === "yes"&&item?.label?.includes("Validate Signature")){
            setShowRaiseRequirementBtn(false);
          }
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
    setShowReasonDelayField(false);
    if (item === "branchreceiveddate"||item==="RequestDateTime") {
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
        form.setFieldsValue({branchreceiveddate: ""})
      return;
      } else {
        RefundData[selectedSubType]?.Request_Details?.forEach(element => {
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
  const handleInputChange =(e,item)=>{
    if(item.label?.includes("IFSC")&&e.target.value){
      getIFSCBankDetails(e.target.value);
    }
  }
  const getUploadFiles=(listOfUploadFiles)=>{
    // const updatedUploadList = listOfUploadFiles?.map((obj) => {
    //   // Create a new object without the propertyToDelete property
    //   const { labelName, ...newObject } = obj;
    //   return newObject;
    // });
    // Update the state with the new list
    setUploadFiles(listOfUploadFiles);

  }
  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day"); // Can not select days before today and today
  };
  //commonly render all forms
  const renderDetailsForm = (formType) => {
    return (
      <DetailsForm
        data={RefundData[selectedSubType]?.[formType]}
        subType={selectedSubType}
        suffix={!isShowPOSScreen && suffix}
        handleLabelLink ={handleLabelLink }
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
        disableRequestForm={disableRequestForm}
        disableOTP={disableOTP}
        onBlurInput={onBlurInput}
        handleEdit={handleEdit}
        handleInputChange={handleInputChange}
        requestModeLU={requestModeLU}
        bankAccTypeLU={bankAccTypeLU}
      ></DetailsForm>
    );
  };


  const handleEdit = (val)=>{
    if(selectedSubType!=="autopaybouncecharges"){
      if(val==='edit'){
        setIsPosEdited(true)
        RefundData[selectedSubType]?.POS_Details?.forEach(element => {
            if(element?.posEdit){
              element.disabled = false
            }
        });
        RefundData[selectedSubType]?.BOE_Details?.forEach(element => {
          if(element?.boeEdit){
            element.disabled = false
          }
      });
  
  
      }else if(val==='close'){
        setIsPosEdited(false)
        RefundData[selectedSubType]?.POS_Details?.forEach(element => {
          if(element?.posEdit){
            element.disabled = true
          }
      });
      RefundData[selectedSubType]?.BOE_Details?.forEach(element => {
        if(element?.boeEdit){
          element.disabled = true
        }
    });
        POSContactData?.serviceRequestTransectionData?.forEach(element => {
          paMandateCancellationObj[element.tagName] = element.tagValue
        });
    
          form.setFieldsValue({
            accountNumber: paMandateCancellationObj?.accountNumber,
            bankName: paMandateCancellationObj?.bankName,
            ifsc: paMandateCancellationObj?.ifsc,
            transactionDate: paMandateCancellationObj?.transactionDate ? dayjs(paMandateCancellationObj?.transactionDate, 'DD/MM/YYYY'): paMandateCancellationObj?.transactionDate,
            bounceCharges: paMandateCancellationObj?.bounceCharges,
          })
      }
    }
    else {
    if(val === 'edit'){
      setIsEditNominee(true);
    }
    else if(val === 'close'){
      setIsEditNominee(false);
    }
  }
  }

  const onBlurInput =()=>{

  }

  const getTransacions = ()=>{
    setIsLoading(true);
    setShowAlert(false);
    setAlertData(null);
    let response = apiCalls.GetTransacions(customerData?.policyNo);
    response
      .then((val) => {
        if (val?.data?.ERRCODE == "1") {
    //         const sortedData = [...val?.data?.responseBody?.bankDetailsList];
    // sortedData.sort((a, b) => {
    //   return new Date(convertDate(b.effdate)) - new Date(convertDate(a.effdate));
    // });
    let maxDate = new Date(0);
    let maxRecord = null;

    // Iterate over the JSON data to find the record with the maximum date
    val?.data?.transacions?.forEach(item => {
      // Extract day, month, and year from the date string
      const dateParts = item?.BILLDUEDT.split('/');
      const day = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1; // Subtract 1 because months are zero-indexed
      const year = parseInt(dateParts[2], 10);
      const currentDate = new Date(year, month, day);

      if (currentDate > maxDate) {
        maxDate = currentDate;
        maxRecord = item;
      }
    });

    let res = maxRecord;
       
    form?.setFieldsValue({
          DueDate: res?.BILLDUEDT,
          FilesenttoBankdate: res?.TRANSSTATUS,
          DebitAmount: res?.TRANSAMT,
          HoldPossibleForCurrentDue: res?.TRANSSTATUS === "NOT SEND" ? "Yes" : res?.TRANSSTATUS === "Send To Bank"? "No" : "",
          DebitDate: res?.BILLDUEDT,
          DebitStatus: res?.TRANSSTATUS,
          DebitStatusReceivedOn: res?.TRANSBNKRESPDT,
        })
        // if(res?.TRANSSTATUS === "NOT SEND"){
        //   RefundData[selectedSubType]?.Customer_Choice_Details?.forEach(element => {
        //     if(element?.name?.includes("customerchoice")){
        //       element.hide= false;
        //       setShowReasonDelayField(true);
        //     }
        //   });
        // }else  if(res?.TRANSSTATUS === "Send To Bank"){
        //   RefundData[selectedSubType]?.Customer_Choice_Details?.forEach(element => {
        //     if(element?.name?.includes("customerchoice")){
        //       element.hide= true;
        //       setShowReasonDelayField(true);
        //     }
        //   });
        // }
          setIsLoading(false);
        } else {
           setAlertTitle("");
           setAlertData(val?.data?.ERRDESC);
           //setNavigateTo("/advancesearch");
          // if(!props?.EmailResponse?.IsEmailmanagent){
          //  setNavigateTo("/advancesearch");
          //}
           setShowAlert(true);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }


  const getTransactionData = (values) => {
    // if (selectedSubType === "autopaybouncecharges") {
    //   return [
    //     { Status: "Create", TagName: "DueDate", TagValue: values?.DueDate || "" },
    //     { Status: "Create", TagName: "DebitDate", TagValue: values?.DebitDate || "" },
    //     { Status: "Create", TagName: "DebitAmount", TagValue: values?.DebitAmount || ""},
    //     { Status: "Create", TagName: "DebitStatus", TagValue: values?.DebitStatus || "" },
    //     { Status: "Create", TagName: "DebitStatusReceivedOn", TagValue: values?.DebitStatusReceivedOn || ""},
    //     { Status: "Create", TagName: "PaymentDebitType", TagValue: values?.PaymentDebitType || ""},
    //     { Status: "Create", TagName: "BounceCharges", TagValue: values?.BounceCharges || ""},
    //     { Status: "Create", TagName: "ValidateSignature", TagValue: values?.ValidateSignature || ""},
    //     { Status: "Create", TagName: "RequestorComments", TagValue: values?.RequestorComments || ""},
    //     {
    //       "Status": "Create",
    //       "TagName": "ValidatedBy",
    //       "TagValue": values?.customerchoice ? values?.customerchoice : 'form'
    //   },
    //   ];
    // } 
    if (selectedSubType === "autopaybouncecharges") {
      let newArray =
      [
        { Status: "Create", TagName: "AdditionalNoteForCustomer", TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "" },
        { Status: "Create", TagName: "ValidateSignature", TagValue: values?.ValidateSignature || ""},
        { Status: "Create", TagName: "RequestorComments", TagValue: values?.RequestorComments || ""},
        // { Status: "Create", TagName: "ifsc_1", TagValue: values?.ifsc?.toUpperCase() || ""},
        // { Status: "Create", TagName: "bankName_1", TagValue: values?.bankName || ""},
      ];
      const properties = [
        "accountNumber",
        "bankName",
        "ifsc",
        "transactionDate",
        "bounceCharges",
      ];
      
      // Initialize an array to store the updated data
      let updatedDataList = [];
      // Iterate over each record in the updateNomineeData array
      updateNomineeData?.forEach((record, recordIndex) => {
        // Iterate over properties and create objects for each record
        properties.forEach((property, propertyIndex) => {
          if (record[property] || record[property] == 0) {
            let obj = {
              Status: "Create",
              TagName: `${property}_${recordIndex + 1}`,
              TagValue: property?.includes("transactionDate") ? moment(record[property] + 1).format("DD/MM/YYYY") : 
              property?.includes("ifsc") ? record[property]?.toUpperCase : record[property]
            };
      
            updatedDataList.push(obj);
          }
        });
      });
      // Use the spread operator to concatenate the newArray to the updatedDataList
      updatedDataList = [...updatedDataList, ...newArray];
      // Now updatedDataList contains separate objects for each property in each record
      return updatedDataList;
      
      
    }
    if(selectedSubType==="postissuanceexcessrefund"){
   return [
    { Status: "Create", TagName: "AdditionalNoteForCustomer", TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "" },
    { Status: "Create", TagName: "requestchannel", TagValue:values?.requestchannel || "" },
        { Status: "Create", TagName: "NameasperPennyDrop", TagValue: values?.NameasperPennyDrop || "" },
        { Status: "Create", TagName: "CustomerSiginingDate", TagValue: values?.CustomerSiginingDate || "" },
        { Status: "Create", TagName: "PennyDrop", TagValue: values?.PennyDrop || "" },
        { Status: "Create", TagName: "ReasonForDelayedSubmission", TagValue: values?.ReasonForDelayedSubmission || ""},
        { Status: "Create", TagName: "RequestReceivedDate", TagValue: values?.RequestReceivedDate || "" },
        { Status: "Create", TagName: "RequestorComments", TagValue: values?.RequestorComments || ""},
        { Status: "Create", TagName: "ValidateSignature", TagValue: values?.ValidateSignature || ""},
        { Status: "Create", TagName: "accountHolderName", TagValue: values?.accountHolderName || ""},
        { Status: "Create", TagName: "accountType", TagValue: values?.accountType || ""},
        { Status: "Create", TagName: "bankName", TagValue: values?.bankName || ""},
        { Status: "Create", TagName: "branchName", TagValue: values?.branchName || "" },
        { Status: "Create", TagName: "enterAccountNumber", TagValue: values?.enterAccountNumber || ""},
        { Status: "Create", TagName: "excessRefundAmount", TagValue: values?.excessRefundAmount || ""},
        { Status: "Create", TagName: "ifsc", TagValue: values?.ifsc || ""},
        { Status: "Create", TagName: "ifsc", TagValue: values?.ifsc || ""},
        { Status: "Create", TagName: "reEnterAccountNumber", TagValue: values?.reEnterAccountNumber || ""},
        {
          "Status": "Create",
          "TagName": "reasonForRefund",
          "TagValue": values?.reasonForRefund || ''
      },
      ];
    }
    if(selectedSubType==="decline"){
      return [
        { Status: "Create", TagName: "AdditionalNoteForCustomer", TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "" },
           { Status: "Create", TagName: "enterRefundAmount", TagValue: values?.enterRefundAmount || "" },
           { Status: "Create", TagName: "requestchannel", TagValue: values?.requestchannel || "" },
           { Status: "Create", TagName: "proceedFor", TagValue: values?.proceedFor || "" },
           { Status: "Create", TagName: "fundTranferTo", TagValue: values?.fundTranferTo || "" },
           { Status: "Create", TagName: "fundTransferAmount", TagValue: values?.fundTransferAmount || ""},
           { Status: "Create", TagName: "relationToFTPolicy", TagValue: values?.relationToFTPolicy || "" },
           { Status: "Create", TagName: "RequestorComments", TagValue: values?.RequestorComments || ""},
           { Status: "Create", TagName: "nameOfFTPolicyOwner", TagValue: values?.nameOfFTPolicyOwner || ""},
           { Status: "Create", TagName: "BankIFSC", TagValue: values?.BankIFSC || ""},
           { Status: "Create", TagName: "bankName", TagValue: values?.bankName || ""},
           { Status: "Create", TagName: "BranchName", TagValue: values?.branchName || ""},
           { Status: "Create", TagName: "AccountType", TagValue: values?.AccountType || "" },
           { Status: "Create", TagName: "NameAsMentionedInTheBank", TagValue: values?.NameAsMentionedInTheBank || ""},
           { Status: "Create", TagName: "BankAccountNumber", TagValue: values?.BankAccountNumber || ""},
           { Status: "Create", TagName: "ConfirmBankAccountNumber", TagValue: values?.ConfirmBankAccountNumber || ""},
           { Status: "Create", TagName: "PennyDrop", TagValue: values?.PennyDrop || ""},
           { Status: "Create", TagName: "NameasperPennyDrop", TagValue: values?.NameasperPennyDrop || ""},
           { Status: "Create","TagName": "NameMatch","TagValue": values?.NameMatch || ''},
           { Status: "Create", TagName: "holdRequest", TagValue: values?.holdRequest || ""},
           { Status: "Create", TagName: "holdRequestTill", TagValue: values?.holdRequestTill || ""},
         ];
       }
    if(selectedSubType==="postpone"){
      return [
        { Status: "Create", TagName: "AdditionalNoteForCustomer", TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "" },
        { Status: "Create", TagName: "enterRefundAmount", TagValue: values?.enterRefundAmount || "" },
        { Status: "Create", TagName: "requestchannel", TagValue: values?.requestchannel || "" },
        { Status: "Create", TagName: "proceedFor", TagValue: values?.proceedFor || "" },
        { Status: "Create", TagName: "fundTranferTo", TagValue: values?.fundTranferTo || "" },
        { Status: "Create", TagName: "fundTransferAmount", TagValue: values?.fundTransferAmount || ""},
        { Status: "Create", TagName: "relationToFTPolicy", TagValue: values?.relationToFTPolicy || "" },
        { Status: "Create", TagName: "RequestorComments", TagValue: values?.RequestorComments || ""},
        { Status: "Create", TagName: "nameOfFTPolicyOwner", TagValue: values?.nameOfFTPolicyOwner || ""},
        { Status: "Create", TagName: "BankIFSC", TagValue: values?.BankIFSC || ""},
        { Status: "Create", TagName: "bankName", TagValue: values?.bankName || ""},
        { Status: "Create", TagName: "BranchName", TagValue: values?.branchName || ""},
        { Status: "Create", TagName: "AccountType", TagValue: values?.AccountType || "" },
        { Status: "Create", TagName: "NameAsMentionedInTheBank", TagValue: values?.NameAsMentionedInTheBank || ""},
        { Status: "Create", TagName: "BankAccountNumber", TagValue: values?.BankAccountNumber || ""},
        { Status: "Create", TagName: "ConfirmBankAccountNumber", TagValue: values?.ConfirmBankAccountNumber || ""},
        { Status: "Create", TagName: "PennyDrop", TagValue: values?.PennyDrop || ""},
        { Status: "Create", TagName: "NameasperPennyDrop", TagValue: values?.NameasperPennyDrop || ""},
        { Status: "Create","TagName": "NameMatch","TagValue": values?.NameMatch || ''},
        { Status: "Create", TagName: "holdRequest", TagValue: values?.holdRequest || ""},
        { Status: "Create", TagName: "holdRequestTill", TagValue: values?.holdRequestTill || ""},
      ];
       }
    if(selectedSubType==="withdrawn"){
      return [
        { Status: "Create", TagName: "AdditionalNoteForCustomer", TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "" },
        { Status: "Create", TagName: "enterRefundAmount", TagValue: values?.enterRefundAmount || "" },
        { Status: "Create", TagName: "requestchannel", TagValue: values?.requestchannel || "" },
        { Status: "Create", TagName: "proceedFor", TagValue: values?.proceedFor || "" },
        { Status: "Create", TagName: "fundTranferTo", TagValue: values?.fundTranferTo || "" },
        { Status: "Create", TagName: "fundTransferAmount", TagValue: values?.fundTransferAmount || ""},
        { Status: "Create", TagName: "relationToFTPolicy", TagValue: values?.relationToFTPolicy || "" },
        { Status: "Create", TagName: "RequestorComments", TagValue: values?.RequestorComments || ""},
        { Status: "Create", TagName: "nameOfFTPolicyOwner", TagValue: values?.nameOfFTPolicyOwner || ""},
        { Status: "Create", TagName: "BankIFSC", TagValue: values?.BankIFSC || ""},
        { Status: "Create", TagName: "bankName", TagValue: values?.bankName || ""},
        { Status: "Create", TagName: "BranchName", TagValue: values?.branchName || ""},
        { Status: "Create", TagName: "AccountType", TagValue: values?.AccountType || "" },
        { Status: "Create", TagName: "NameAsMentionedInTheBank", TagValue: values?.NameAsMentionedInTheBank || ""},
        { Status: "Create", TagName: "BankAccountNumber", TagValue: values?.BankAccountNumber || ""},
        { Status: "Create", TagName: "ConfirmBankAccountNumber", TagValue: values?.ConfirmBankAccountNumber || ""},
        { Status: "Create", TagName: "PennyDrop", TagValue: values?.PennyDrop || ""},
        { Status: "Create", TagName: "NameasperPennyDrop", TagValue: values?.NameasperPennyDrop || ""},
        { Status: "Create","TagName": "NameMatch","TagValue": values?.NameMatch || ''},
        { Status: "Create", TagName: "holdRequest", TagValue: values?.holdRequest || ""},
        { Status: "Create", TagName: "holdRequestTill", TagValue: values?.holdRequestTill || ""},
      ];
       }
    if(selectedSubType==="excesspremium"){
      return [
        { Status: "Create", TagName: "AdditionalNoteForCustomer", TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "" },
        { Status: "Create", TagName: "enterRefundAmount", TagValue: values?.enterRefundAmount || "" },
        { Status: "Create", TagName: "requestchannel", TagValue: values?.requestchannel || "" },
        { Status: "Create", TagName: "proceedFor", TagValue: values?.proceedFor || "" },
        { Status: "Create", TagName: "fundTranferTo", TagValue: values?.fundTranferTo || "" },
        { Status: "Create", TagName: "fundTransferAmount", TagValue: values?.fundTransferAmount || ""},
        { Status: "Create", TagName: "relationToFTPolicy", TagValue: values?.relationToFTPolicy || "" },
        { Status: "Create", TagName: "RequestorComments", TagValue: values?.RequestorComments || ""},
        { Status: "Create", TagName: "nameOfFTPolicyOwner", TagValue: values?.nameOfFTPolicyOwner || ""},
        { Status: "Create", TagName: "BankIFSC", TagValue: values?.BankIFSC || ""},
        { Status: "Create", TagName: "bankName", TagValue: values?.bankName || ""},
        { Status: "Create", TagName: "BranchName", TagValue: values?.branchName || ""},
        { Status: "Create", TagName: "AccountType", TagValue: values?.AccountType || "" },
        { Status: "Create", TagName: "NameAsMentionedInTheBank", TagValue: values?.NameAsMentionedInTheBank || ""},
        { Status: "Create", TagName: "BankAccountNumber", TagValue: values?.BankAccountNumber || ""},
        { Status: "Create", TagName: "ConfirmBankAccountNumber", TagValue: values?.ConfirmBankAccountNumber || ""},
        { Status: "Create", TagName: "PennyDrop", TagValue: values?.PennyDrop || ""},
        { Status: "Create", TagName: "NameasperPennyDrop", TagValue: values?.NameasperPennyDrop || ""},
        { Status: "Create","TagName": "NameMatch","TagValue": values?.NameMatch || ''},
        { Status: "Create", TagName: "holdRequest", TagValue: values?.holdRequest || ""},
        { Status: "Create", TagName: "holdRequestTill", TagValue: values?.holdRequestTill || ""},
      ];
       } 
  };

  const handleSubmit = (values) => {
    // if(!showEmailFields&&selectedSubType==="sendsoftcopy"){
    //   message.destroy()
    //   message.warning({
    //     content:
    //       "Please select atleast one communication.",
    //     className: "custom-msg",
    //     duration: 2,
    //   });
    //   return;
    // }

    if (POSContactData && customerData?.isPOS) {
      POSActionsOnContactDetails(values, "APPROVED");
    } else if (selectedSubType){
        saveRequest(values);
  };
  };

    const saveRequest =(values) =>{
      if(values?.CustomerSigningDate > values?.BranchReceivedDate){
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
        Category: 2,
        ApplicationNo:
        details?.policyDetailsObj?.identifiers?.applicationNo ||customerData?.applicationNo,
        DOB: convertDate(customerData?.dob),
        PolicyNo: details?.policyDetailsObj?.identifiers?.policyNo || customerData?.policyNo, // Required
        CustomerId: 456,
        "CustRole":values?.custRole,
        policyStatus:
        details?.policyDetailsObj?.planAndStatus?.policyStatus || customerData?.policyStatus,
        proposerName: details?.policyDetailsObj?.identifiers?.po_Name || customerData?.po_Name,
        plan: details?.policyDetailsObj?.planAndStatus?.planName || customerData?.planName,
        CreatedOn: new Date(),
        CreatedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
        CreatedUsrId: loginInfo?.userProfileInfo?.profileObj?.userName,
        ModifiedOn: new Date(),
        ModifiedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
        AssignedToRole: "", //POS
        AssignedByUser: 0,
        ReasonForChange: "",
        RequestDateTime:  values?.BranchReceivedDate
        ? new Date(values?.BranchReceivedDate)
        : new Date(),
        ReasonDelayed: values?.ReasonForDelay,
        CustSignDateTime: values?.CustomerSigningDate
        ? new Date(values?.CustomerSigningDate)
        : new Date(),
        "TransactionData": getTransactionData(values),
        "Uploads": uploadFiles || [
          
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
      obj?.TransactionData?.push({
        "Status": "Create",
        "TagName": "ReasonList_Key",
        "TagValue":  JSON.stringify(ids)
      })
         obj?.TransactionData?.push({
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
                                      setRequirementLoader(false)
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
              setRequirementLoader(false);
            //   return
            // }
            // setServiceRequestId(val?.data?.srvReqRefNo);
            //   setAlertTitle("Request Created Successfully");
            //   let successMessage = val?.data?.tat > 0 ? 
            //   `Ticket ID Number ${val?.data?.srvReqRefNo}. Your request will be processed in ${val?.data?.tat||0} days`
            //   : `Ticket ID Number ${val?.data?.srvReqRefNo}.`;
            //   setAlertData(successMessage);
            //   setNavigateTo("/advancesearch");
            //   setShowAlert(true);
            
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
          setRequirementLoader(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setRequirementLoader(false);
        }); 
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
     setRequirementLoader(true);
    if(isShowPOSScreen){
      POSActionsOnContactDetails(null, "REJECTED");
    }else{
      handleSubmit();
    }

  };
  const popupClose=()=>{
    setRaiseRequirementOpen(false)
  }

  const POSActionsOnContactDetails = (values, status,list) => {
    let seletedRequerimentList; 
    if(status === 'INTERNAL'){
      seletedRequerimentList = list;
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
      if(seletedRequerimentList?.length===0  && status === 'REJECTED'){
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
      SrvReqRefNo: POSContactData?.srvReqRefNo || serviceRequestId,
      Status: status,
      RequirementList: seletedRequerimentList,
      UsrID: loginInfo?.userProfileInfo?.profileObj?.userName,
      RoleID: loginInfo?.userProfileInfo?.profileObj?.role,
      // "RequirementComments":requirementCmnt,
      POSComments1: values?.comment,
      TransactionPayload:  getPOSTransactionData(values) || [],
    };    
     if(isShowPOSScreen){
      let reqFormValues = requirementsForm?.getFieldsValue();
    obj.TransactionPayload.push({
        "Status": "Create",
        "TagName": "PosOtherReq",
        "TagValue": reqFormValues?.PosOtherReq || ""
      });
    }
    setIsLoading(true);
    let response = apiCalls.POSActionsOnContactDetails(obj);
    response
      .then((val) => {
        if (val?.data) {
          setAlertTitle(`${val?.data?.message}`);
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

  const getPOSTransactionData = (values)=>{
    if(selectedSubType==="autopaybouncecharges"){
      const properties = [
        "accountNumber",
        "bankName",
        "ifsc",
        "transactionDate",
        "bounceCharges",
      ];
      
       // Initialize an array to store the updated data
      let updatedDataList = [];
      
      // Iterate over each record in the updateNomineeData array
      posUpdateNomineeData?.forEach((record, recordIndex) => {
        // Iterate over properties and create objects for each record
        properties.forEach((property, propertyIndex) => {
          if (record[property] || record[property] == 0) {
            let obj = {
              Status: "Update",
              TagName: `${property}_${"New"}_${recordIndex + 1}`,
              TagValue: property?.includes("transactionDate") ? moment(record[property] + 1).format("DD/MM/YYYY") : record[property]
            };
            if(property?.includes("transactionDate") && typeof record[property] == "string") {
              obj.TagValue = record[property]
            }
            updatedDataList.push(obj);
          }
        });
      });
      // Use the spread operator to concatenate the newArray to the updatedDataList
      updatedDataList = [...updatedDataList];
      // Now updatedDataList contains separate objects for each property in each record
      return updatedDataList;
      
    }

    if(selectedSubType === "decline"){
      return [
        { Status: "Create", TagName: "holdRequest", TagValue: values?.holdRequest || "" },
        { Status: "Create", TagName: "holdRequestTill", TagValue: values?.holdRequestTill || "" },
      ]
    }
  }

  const getInternal=(list)=>{
    const values = form.getFieldsValue();
    POSActionsOnContactDetails(values, "INTERNAL", list);
  }
  return (
    <>
      <Spin spinning={isLoading}  >
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
      
          {selectedSubType==="autopaybouncecharges"&&<>
          {/* {!isShowPOSScreen&&<>      // commeted 30-07-2024
            {renderDetailsForm("BOE_Details")}
            {renderDetailsForm("Customer_Choice_Details")}
            {isShowRequestDetails&&<>
            {renderDetailsForm("Request_Details")}
            </>}
            {renderDetailsForm("Comments")}
          </>}
          {isShowPOSScreen&&<>
            {renderDetailsForm("POS_Details")}
          </>} */}
          <div className="requirement">
          {!isShowPOSScreen&& <>
                      <div className="d-flex">
                    <h4 className="subtype-headings fs-16 fw-500">
                    Enter Account Details & Charges
                      </h4>{"  "}
                      <span className="d-flex justify-center" style={{paddingLeft:"10px"}}><i class="bi bi-plus-circle-fill c-pointer text-color fs-18" onClick={() => addRow()}></i></span>
                      </div>
                    
      <table className="responsive-table">
        <thead>
          <tr>
            <th>IFSC</th>
            <th>Bank Name</th>
            <th>Account Number</th>
            <th>Transaction Date</th>
            <th>Bounce Charges</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {updateNomineeData?.map((row, index) => (
            <tr key={index}>
               <td>
              <Form.Item
               label=""
               name='ifsc'
                 className="inputs-label mb-0"
                 rules={[
                  {
                    required:true,
                    message: "IFSC Number",
                  },
                  {
                    validator: validateIFSCNumber,
                  },
                ]}
                >
                   <Input
                  type="text"
                   className="cust-input upper"
                  // name="ifsc"
                  placeholder= "IFSC"
                  value={row.ifsc}
                  minLength={11}
                  maxLength={11}
                 // onChange={(e) => handleAutoBounceChange(index, e)}
                //  onChange={(e) => handleAccNumberChange(index, 'ifsc',e.target.value)}
                 onKeyDown={(e) => handleKeyDown("charactersOnly",e,"bankName")}
                 onBlur={(e)=>getIFSCBankDetails(e.target.value,row)}
                />
                </Form.Item>
              
              </td>
              <td>
              <Form.Item
              name="bankName"
              className="inputs-label mb-0"
              rules={[
                {
                  required: true,
                  message: "Enter Bank Name",
                },
              ]}
            >
               <Input
                  type="text"
                  className="cust-input"
                  // name="bankName"
                      placeholder= "Bank Name"
                  value={row.bankName}
                  onChange={(e) => handleAccNumberChange(index, 'bankName', e.target.value)}
                />
                </Form.Item>
              </td>
              <td>
              <Form.Item
    name={['updateNomineeData', row.id, 'accountNumber']}
    className="inputs-label mb-0"
    rules={[
      {
        required: true,
        message: "Enter Account Number",
      },
    ]}
  >
               <Input
                  type="text"
                  className="cust-input"
                   //name="accountNumber"
                   placeholder= "Account Number"
                  value={row.accountNumber}
                  onChange={(e) => handleAccNumberChange(index, 'accountNumber', e.target.value)}
                />
                </Form.Item>
              </td>
              {/* <td>
              <Form.Item
    name={['updateNomineeData', row.id, 'bankName']}
    className="inputs-label mb-0"
    rules={[
      {
        required: true,
        message: "Enter Bank Name",
      },
    ]}
  >
               <Input
                  type="text"
                  className="cust-input"
                  // name="bankName"
                      placeholder= "Bank Name"
                  value={row.bankName}
                  onChange={(e) => handleAccNumberChange(index, 'bankName', e.target.value)}
                />
                </Form.Item>
              </td>
              <td>
              <Form.Item
               label=""
               name={['updateNomineeData', row.id, 'ifsc']}
                 className="inputs-label mb-0"
                 rules={[
                  {
                    required:true,
                    message: "IFSC Number",
                  },
                  {
                    validator: validateIFSCNumber,
                  },
                ]}
                >
                   <Input
                  type="text"
                   className="cust-input upper"
                  // name="ifsc"
                  placeholder= "IFSC"
                  value={row.ifsc}
                  minLength={11}
                  maxLength={11}
                 // onChange={(e) => handleAutoBounceChange(index, e)}
                 onChange={(e) => handleAccNumberChange(index, 'ifsc',e.target.value)}
                />
                </Form.Item>
              
              </td>*/}
              <td>
              <Form.Item
               label=""
               name={['updateNomineeData', row.id, 'transactionDate']}
                 className="inputs-label mb-0"
                 rules={[
                  {
                    required:true,
                    message: "Select Date",
                  },
                ]}
                >
              <DatePicker
              allowClear={true}
              style={{ width: "100%" }}
              className="cust-input"
              format={dateFormat}
              handleDate={handleDate}
              value={row.transactionDate}
              disabledDate={(e)=>disabledDate(e)}
              onChange={(date) => handleAccNumberChange(index, 'transactionDate', date)}
            />
               {/* <Input
                  type="date"
                  className="cust-input"
                  name="transactionDate"
                  value={row.transactionDate}
                  onChange={(e) => handleAutoBounceChange(index, e)}
                /> */}
                </Form.Item>
              </td>
              <td>
              <Form.Item
               label=""
               name={['updateNomineeData', row.id, 'bounceCharges']}
                 className="inputs-label mb-0"
                 rules={[
                  {
                    required:true,
                    message: "Bounce Charge",
                  },
                ]}
                >
              <Input
   className="cust-input"
   value={row?.bounceCharges}
   placeholder="Bounce Charge"
   maxLength={20}
   onChange={(e) => handleAccNumberChange(index, 'bounceCharges', e.target.value)}
   onKeyDown={(e) => handleKeyDown("numbersOnly",  e)}
 />
 </Form.Item>
              </td>
              <td>
              <i className="bi bi-trash3-fill c-pointer text-color fs-18"  onClick={() => deleteRow(index)}></i>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">Total Bounce Charges to be refunded</td>
            <td>Rs {totalBounceCharges}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
       <div className="mt-16">
      {renderDetailsForm("Request_Details")}
      {renderDetailsForm("Comments")}
      </div>
      </>}
      {isShowPOSScreen&& <>
        {renderDetailsForm("POS_Title")}
                    
      <table className="responsive-table">
        <thead>
          <tr>
          <th>IFSC</th>
          <th>Bank Name</th>
            <th>Account Number</th>
            {/* <th>Bank Name</th> */}
            {/* <th>IFSC</th> */}
            <th>Transaction Date</th>
            <th>Bounce Charges</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
      {posUpdateNomineeData?.map((row, index) => (
      <tr key={row.id} className="nominee-input">
         <td>
  <Form.Item
                        label=""
                        name={['posUpdateNomineeData', row.id, 'ifsc']}
                        className="inputs-label mb-0"
                        initialValue={row.ifsc}
                        rules={[
                            {
                                required: true,
                                message: "IFSC Number",
                            },
                            {
                                validator: validateIFSCNumber,
                            },
                        ]}
                    >
                        <Input
                            type="text"
                            className="cust-input upper"
                            disabled={!isEditNominee}
                            minLength={11}
                            maxLength={11}
                            //onChange={(e) => handlePOSNomineeFirstNameChange(index, 'ifsc', e.target.value)}
                            onKeyDown={(e) => handleKeyDown("charactersOnly",e,"bankName")}
                            onBlur={(e)=>getIFSCBankDetails(e.target.value,row)}
                        />
                    </Form.Item>
              
              </td>
			        <td>
              <Form.Item
            name={['posUpdateNomineeData', index, 'bankName']}
            className="inputs-label mb-0"
            initialValue={row?.bankName} // Set the initial value here
            rules={[
            {
            required: true,
            message: "Enter Bank Name",
            },
            ]}
            >
            <Input
            placeholder="Enter Bank Name"
            className="cust-input"
            disabled={!isEditNominee}
            maxLength={100}
            onChange={(e) => handlePOSNomineeFirstNameChange(index, "bankName", e.target.value)}
            />
            </Form.Item>
              </td>
              <td>
              <Form.Item
              name={['posUpdateNomineeData', index, 'accountNumber']}
              className="inputs-label mb-0"
              initialValue={row?.accountNumber} // Set the initial value here
              rules={[
              {
              required: true,
              message: "Enter Account Number",
              },
              ]}
              >
              <Input
              placeholder="Account Number"
              className="cust-input"
              disabled={!isEditNominee}
              maxLength={100}
              onChange={(e) => handlePOSNomineeFirstNameChange(index, "accountNumber", e.target.value)}

              />
              </Form.Item>

                </td>
  {/* <td>
  <Form.Item
name={['posUpdateNomineeData', index, 'bankName']}
className="inputs-label mb-0"
initialValue={row?.bankName} // Set the initial value here
rules={[
{
required: true,
message: "Enter Bank Name",
},
]}
>
<Input
placeholder="Enter Bank Name"
className="cust-input"
disabled={!isEditNominee}
maxLength={100}
onChange={(e) => handlePOSNomineeFirstNameChange(index, "bankName", e.target.value)}
/>
</Form.Item>
  </td>
  <td>
  <Form.Item
                        label=""
                        name={['posUpdateNomineeData', row.id, 'ifsc']}
                        className="inputs-label mb-0"
                        initialValue={row.ifsc}
                        rules={[
                            {
                                required: true,
                                message: "IFSC Number",
                            },
                            {
                                validator: validateIFSCNumber,
                            },
                        ]}
                    >
                        <Input
                            type="text"
                            className="cust-input upper"
                            disabled={!isEditNominee}
                            minLength={11}
                            maxLength={11}
                            onChange={(e) => handlePOSNomineeFirstNameChange(index, 'ifsc', e.target.value)}
                        />
                    </Form.Item>
              
              </td> */}
             <td className="date-picker">
             <Form.Item
              name={['posUpdateNomineeData', index, 'transactionDate']}
              className="inputs-label mb-0"
              initialValue={row?.transactionDate?dayjs(row?.transactionDate, 'DD/MM/YYYY'):null}
              rules={[
              {
              required: true,
              message: "Select a Date",
              validator: (_, value) => {
                if (!value) {
                return Promise.resolve();  // Allow empty value for the first record
                }
                return Promise.resolve();
                },
              },
              ]}
              >
             <DatePicker
             allowClear={false}
     style={{ width: "100%" }}
     className="cust-input"
     placeholder="Select a DOB"
     format={dateFormat}
     disabledDate={(e)=>disabledDate(e)}
     value={row?.transactionDate}
     onChange={(date) => handlePOSNomineeFirstNameChange(index, 'transactionDate', date)}
    disabled={!isEditNominee}
   />
   </Form.Item>
             </td>
             <td>
             <Form.Item
name={['posUpdateNomineeData', index, 'bounceCharges']}
className="inputs-label mb-0"
initialValue={row?.bounceCharges}
rules={[
{
required: true,
message: "Enter a bounce Charge",
validator: (_, value) => {
  if (index === 0 && !value) {
  return Promise.resolve();  // Allow empty value for the first record
  }
  return Promise.resolve();
  },
},
]}
>
             <Input
   className="cust-input"
   value={row?.Share}
   placeholder="Enter a Bounce Charge"
   maxLength={20}
   onChange={(e) => handlePOSNomineeFirstNameChange(index, "bounceCharges", e.target.value,row)}
   onKeyDown={(e) => handleKeyDown("numbersOnly",  e)}
  //  defaultValue={row?.Share}
   disabled={!isEditNominee}
 />
 </Form.Item>
               </td>
             {/* <td>
               {index !== 0 &&<>
               <i
                 class="bi bi-trash3-fill"
                 onClick={() => handlePOSDeleteRow(row.id,index)}
                 style={{ color: "#b3201f", cursor: "pointer" }}
               ></i>
               </>}
             </td> */}
           </tr>
          ))}
          {posUpdateNomineeData?.length === 0 && (
            <tr>
              <td colSpan="5">
                <div className="text-center">
                  <span>No data available</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
        {posUpdateNomineeData?.length !== 0 && (
        <tfoot>
          <tr>
            <td colSpan="4">Total Bounce Charges to be refunded</td>
            <td>Rs {totalPOSBounceCharges}</td>
            <td></td>
          </tr>
        </tfoot>
        )}
      </table>
       <div className="mt-16">
      {renderDetailsForm("POS_Details")}
      </div>
      </>}
    </div>
         
          <div className="contact-details-btn">
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit"
                  disabled={showRaiseRequirementBtn&&!isShowPOSScreen}
                >
                  {!isShowPOSScreen ? "Submit" : "Approve"}
                </Button>
                <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
                {(isShowPOSScreen) &&
                      <Button type="primary" value="RaiseRequirement" 
                        onClick={() =>getInternal() }
                        className="primary-btn" >
                Internal Requirement
              </Button>     }
          </div>
          </>}
          {
            selectedSubType==="postissuanceexcessrefund" && 
            <>
              {renderDetailsForm("BOE_Details")}
              <div className="contact-details-btn">
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit"
                  disabled={showRaiseRequirementBtn&&!isShowPOSScreen}
                >
                  {!isShowPOSScreen ? "Submit" : "Approve"}
                </Button>
                <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
                </div>
            </>
          }

          {
            !customerData?.isPOS ?
            ((selectedSubType === "decline" || selectedSubType === "postpone" || selectedSubType === "withdrawn" || selectedSubType === "excesspremium") 
            &&
            <>
              {renderDetailsForm("BOE_Details")}
              {
                showFundTransfer && 
                <>
                  {renderDetailsForm("Fund_Transfer")}
                </>
              }
              {
                showUpdateBankDetails && 
                <>
                  {renderDetailsForm("Update_Bank_Account_Details")}
                </>
              }
              {renderDetailsForm("Customer_Choice")}
              {renderDetailsForm("RequestForm_Fields")}
              {renderDetailsForm("Comments")}
              <div className="contact-details-btn">
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit"
                  disabled={showRaiseRequirementBtn&&!isShowPOSScreen}
                >
                  {!isShowPOSScreen ? "Submit" : "Approve"}
                </Button>
                <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => getRaiseRequirements()}
                >
                  Raise Requirement
                </Button>
                </div>
            </>)
            : (
              (selectedSubType === "decline" || selectedSubType === "postpone" || selectedSubType === "withdrawn" || selectedSubType === "excesspremium")
              &&
              <>
                {renderDetailsForm("POS_PA_USER")}
                <div className="contact-details-btn">
                  <Button
                    type="primary"
                    className="primary-btn"
                    htmlType="submit"
                    disabled={showRaiseRequirementBtn&&!isShowPOSScreen}
                  >
                    {!isShowPOSScreen ? "Submit" : "Approve"}
                  </Button>
                  <Button
                    type="primary"
                    className="primary-btn"
                    onClick={() => getRaiseRequirements()}
                  >
                    Raise Requirement
                  </Button>
                </div>
              </>
            )
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

{isShowOTPModal &&<>
      <OTPModal form={form} customerData={customerData} isShowOTPModal={isShowOTPModal} setIsShowOTPModal={setIsShowOTPModal} selectedCallType = {props?.selectedCallType} selectedSubTypeId = {props?.selectedSubTypeId}
       sendOTPNumber={ClientEnquiry?.rmblphone} setDisableRequestForm={setDisableRequestForm} setValidateOTPSuccess={setValidateOTPSuccess} clientEnquiryData={ClientEnquiry}/>
      </>}
      {raiseRequirementOpen && <> 
       <RaiseRequirementPopup raiseRequerimentList={raiseRequerimentList} raiseRequirementOpen={raiseRequirementOpen} requirementModalLoader={requirementModalLoader} handleRequirementSubmit={handleRequirementSubmit} popupClose={popupClose} isShowPOSScreen={isShowPOSScreen} requirementsForm={requirementsForm}/>
       </>}

      {/* <Modal
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
             
          <div className="contact-details-btn">
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit"
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
      </Modal> */}
    </>
  );
};

export default Refund;