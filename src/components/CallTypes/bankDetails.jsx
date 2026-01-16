import React, { useState,useEffect } from "react";
import { connect,useSelector } from "react-redux";
import { Form, Spin, Button, Modal, Tooltip, Input,Upload,Alert,message } from "antd";
import PopupAlert from "../popupAlert";
import { Data } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import moment from "moment";
import UploadIcon from "../../assets/images/upload.png";
import CloseIcon from "../../assets/images/close-icon.png";
import { useNavigate } from "react-router-dom";
import apiCalls from "../../api/apiCalls";
import dayjs from "dayjs";
import ContactForm from "../../utils/ContactForm";
import InternalFlow from "../InternalFlow/InternalFlow";
import InternalFlowPOS from "../InternalFlow/InternalFlowPOS";
import RaiseRequirementPopup from "../RaiseRequirementPopup";
import debounce from "lodash.debounce";

const BankDetails = (props) => {
  const loginInfo = useSelector(state => state);
    const {
        selectedSubType,
        requestModeLU,
        clientRoleLU,
        policyDetails,
        customerData,
        POSContactData,
        bankAccTypeLU,
        requestReceivedViaLU,
        isEmailManagement
         } = props;
    const suffix = <img src={UploadIcon} alt="" />;
    const [form] = Form.useForm();
    const [requirementsForm] = Form.useForm();
    const [internalReqForm] = Form.useForm();
    const navigate = useNavigate();
    const [isLoader,setIsLoader] = useState(false);
    const [selectionAssist,setSelectionAssist] = useState(null);
    const [customerChoiceSelection,setCustomerChoiceSelection] = useState(null);
    const [showAuthorizationLetter,setAuthorizationLetter] = useState(false);
    const [showResonDelayField,setShowReasonDelayField] = useState(false);
    const [isShowPOSScreen, setIsShowPOSScreen] = useState(false);
    const [raiseRequirementOpen,setRaiseRequirementOpen] = useState(false);
    const [otpModal,setOtpModal] = useState(false);
    const [showEmailFields,setShowEmailFields] = useState(false);
    const [showRaiseRequirementBtn,setShowRaiseRequirementBtn] = useState(false);
    const [bankDetailsData,setBankDetailsData] = useState({});
    const [sendOTPLoader, setSendOTPLoader] = useState(false);
    const [sendOTPErrorMsg, setSendOTPErrorMsg] = useState(null);
    const [validateOTPSuccess, setValidateOTPSuccess] = useState(false);
    const [otpValue, setOtpValue] = useState(null);
    const [validateBtnDisable, setValidateBtnDisable] = useState(false);
    const [counter, setCounter] = useState(0);
    const [sendOTPTo,setSendOTPTo] = useState(null);
    const [clientEnquiryData, setClientEnquiryData] = useState("");
    const [disableOTP,setDisableOTP] = useState(true);
    const [requirementModalLoader, setRequirementLoader] = useState(false);
    const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
    const [alertTitle, setAlertTitle] = useState("");
    const [navigateTo, setNavigateTo] = useState("");
    const [alertData, setAlertData] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [deDupeModalOpen, setDeDupeModalOpen] = useState(false);
    const [addressProofModal, setAddressProofModal] = useState(false);
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);
    const [showEmailAddress, setShowEmailAddress] = useState(false);
    const [showWhatsApp, setShowWhatsApp] = useState(false);
    const [uploadFiles,setUploadFiles] = useState([]);
    const [CNFBankAccNo, setCNFBankAccNo] = useState("");
    const [BankAccNo, setBankAccNo] = useState("");
    const [showUploadFile, setShowUploadFile] = useState(null);
const [isUploadMultipleFiles,setIsMultipleFiles] = useState([]);
const [aadharUploadFiles,setAAdharUploadFiles] = useState([]);
const [passportUploadFiles,setPassportUploadFiles] = useState([]);
const [rationCardUploadFiles,setRationCardUploadFiles] = useState([]);
const [DrivingUploadFiles,setDrivingUploadFiles] = useState([]);
const [uploadMultipleFiles,setUploadMultipleFiles] = useState([]);
const [updateFields, setUpdateFields] = useState(false);
const [isDisableOTPInput,setIsDisableOTPInput] = useState(false);
const [disableRequestForm,setDisableRequestForm] = useState(false);
const [isShowBankDetails,setIsShowBankDetails] = useState(false);
const [isCounterEnable,setIsCounterEnable] = useState(false);
const [InternaRequirements, setInternalFlowRequirements] = useState("");

const [BankduDupeData,setBankDeDupeData] = useState([]);
const [voterUploadFiles,setVoterUploadFiles] = useState([]);
const [pancardUploadFiles,setPancardUploadFiles] = useState([]);
const [uploadChequeCopy, setUploadChequeCopy] = useState([])
const [cache, setCahce] = useState([]);

const [IsPosEdited,setIsPosEdited] = useState(false);
const [isDisableNewMobileNo,setIsDisableNewMobileNo] = useState(false);
    const posScreenObj = {
      custRole:POSContactData?.custRole,
      srvReqID: POSContactData?.srvReqID,
      reqMode:POSContactData?.reqMode,
      Bank_IFSC_New:'',
      Bank_Name_New:'',
      Acc_Type_New:'',
      Acc_HldrName_New:'',
      NameasmentionedinBankAccount: '',
      Acc_Number_New:'',
      PennyDrop:'',
      Branch_Name_New: '',
      RequestBy: '',
      Req_Via: ''
      
    };
    const boeScreenObj = {}
    
    useEffect(() => {
      if(isEmailManagement){
        Data[selectedSubType]?.New_Bank_Details?.forEach(element=>{
          if(element?.name==="customerchoice") {
            element.hide = true;
          }
        })
        Data[selectedSubType]?.BOE_Details?.forEach(element=>{
          if (element?.name === "requestchannel") {
            form.setFieldsValue({
              requestchannel: 4,
            });
            element.disabled = true;
          }
        })
          if (!Data[selectedSubType]) {
            Data[selectedSubType] = {}; // Initialize it if undefined
                  }
            if (!Array.isArray(Data[selectedSubType]?.New_Bank_Details)) {
                  Data[selectedSubType].New_Bank_Details = [];
              }
              // Remove existing instances of "Additional Note For Customer" before adding a new one
              Data[selectedSubType].New_Bank_Details = Data[selectedSubType].New_Bank_Details.filter(
                  comment => comment.name !== "AdditionalNoteForCustomer"
              );
            
              // Add "Additional Note For Customer" once
              Data[selectedSubType].New_Bank_Details.push(
                {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 4000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
                });
                if (!Array.isArray(Data[selectedSubType]?.Query_Bank_Fields)) {
                  Data[selectedSubType].Query_Bank_Fields = [];
              }
              // Remove existing instances of "Additional Note For Customer" before adding a new one
              Data[selectedSubType].Query_Bank_Fields = Data[selectedSubType].Query_Bank_Fields.filter(
                  comment => comment.name !== "AdditionalNoteForCustomer"
              );
            
              // Add "Additional Note For Customer" once
              Data[selectedSubType].Query_Bank_Fields.push(
                {name: "AdditionalNoteForCustomer",label: "Additional Note For Customer",inputType: "complaintbox",maxlength: 4000,required: false,validationmsg: "Additional Note For Customer",placeholder: "Additional Note For Customer",width: "100%",rows: 4
                });
                
      }
      (counter > 0&&isCounterEnable) && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]); // eslint-disable-next-line arrow-body-style
  
    useEffect(() => {
      if (POSContactData && customerData?.isPOS) {
        POSContactData?.serviceRequestTransectionData?.forEach(element => {
          posScreenObj[element.tagName] = element.tagValue
        });
        setIsShowPOSScreen(true);
        form.setFieldsValue({
          custRole: POSContactData?.custRole,
          srvReqID: POSContactData?.srvReqRefNo,
          requestchannel: posScreenObj?.reqMode,
          Bank_IFSC_New: posScreenObj?.Bank_IFSC_New,
          Bank_Name_New: posScreenObj?.Bank_Name_New,
          Acc_Type_New: parseInt(posScreenObj?.Acc_Type_New),
          Acc_HldrName_New:posScreenObj?.Acc_HldrName_New,
          NameasmentionedinBankAccount: posScreenObj?.NameasmentionedinBankAccount,
          NameasperPennyDrop: posScreenObj?.NameasperPennyDrop,
          NameMatch:posScreenObj?.NameMatch,
          Acc_Number_New:posScreenObj?.Acc_Number_New,
          PennyDropResult:posScreenObj?.PennyDrop,
          assistFor: posScreenObj?.assistFor,
          ValidateSignature:posScreenObj?.ValidateSignature,
          CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
          BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
          resonfordelay: POSContactData?.reasonDelayed,
          BranchComments:posScreenObj?.Comments,
          Branch_Name_New: posScreenObj?.Branch_Name_New,
          RequestBy: posScreenObj?.ValidatedBy,
          Req_Via: posScreenObj?.Req_Via && +posScreenObj?.Req_Via,
          dedupeCheck: POSContactData?.deDupPayload[0]?.deDupPayload[0]?.ResponseBody != null &&  POSContactData?.deDupPayload[0]?.deDupPayload[0]?.ResponseBody?.ClientDetails?.length >0 ? "yes" : "no"
        });

        if(posScreenObj?.ValidatedBy==="otp"){
          Data[selectedSubType]?.POS_Details?.forEach(element => {
            if(element?.label==="Request Form"||element?.label?.includes("Customer Signing Date")||element?.label?.includes("Request Received Date")||element?.label==="Signature Validated"||element?.label==="Request Received Via"){
              element.hide= true;
              setUpdateFields(true);
            }
          });
        }
        Data[selectedSubType]?.POS_Details?.forEach(element => {
          if((element?.label?.includes("Reason For Delayed Submission")&& POSContactData?.reasonDelayed)){
            element.hide= false;
            setShowReasonDelayField(true);
          }
        });
        
        if(posScreenObj?.NameMatch==="no"){
          Data[selectedSubType]?.POS_Details?.forEach(element => {
            if(element?.label?.includes("View Bank Account Proof")){
              element.hide= false;
              setUpdateFields(!updateFields);
            }
          });
  
        }
        else if(posScreenObj?.authorizationLetter) {
          Data[selectedSubType]?.POS_Details?.forEach(element => {
            if(element?.label?.includes("View Authorization Letter")){
              element.hide= false;
              setUpdateFields(!updateFields);
            }
          });
        }
      }
      if(selectedSubType ==='bankdetailsupdation' && !customerData?.isPOS){
        setUpdateFields(false);
        if(customerData?.laName === customerData?.poName){
          Data[selectedSubType]?.BOE_Details?.forEach(element => {
            if(element?.name === 'custRole'){
              element.disabled= true;
              setUpdateFields(true);
            }
          });
          
          form.setFieldsValue({
            custRole:'Proposer',
            Acc_HldrName_New: customerData?.poName
          })
          getClientEnquiry(0);
          getBankDeatils(0);
        }
        else {
          Data[selectedSubType]?.BOE_Details?.forEach(element => {
            if(element?.name === 'custRole'){
              element.disabled= false;
              setUpdateFields(true);
            }
          });
          
        }
       }
      setDisableRequestForm(false);
    }, []); // eslint-disable-next-line arrow-body-style

    useEffect(()=>{
      if(customerData?.isBOE){
        POSContactData?.serviceRequestTransectionData?.forEach(element => {
          boeScreenObj[element.tagName] = element.tagValue
        });
        setIsShowPOSScreen(false);
      if(selectedSubType==="bankdetailsupdation"){
        form.setFieldsValue({
          custRole: POSContactData?.custRole,
          srvReqID: POSContactData?.srvReqRefNo,
          requestchannel: boeScreenObj?.reqMode,
          Bank_IFSC_New: boeScreenObj?.Bank_IFSC_New,
          Bank_Name_New: boeScreenObj?.Bank_Name_New,
          Acc_Type_New: parseInt(boeScreenObj?.Acc_Type_New),
          Acc_HldrName_New:boeScreenObj?.Acc_HldrName_New,
          NameasmentionedinBankAccount: boeScreenObj?.NameasmentionedinBankAccount,
          NameasperPennyDrop: boeScreenObj?.NameasperPennyDrop,
          NameMatch:boeScreenObj?.NameMatch,
          Acc_Number_New:boeScreenObj?.Acc_Number_New,
          PennyDropResult:boeScreenObj?.PennyDrop,
          assistFor: boeScreenObj?.assistFor,
          ValidateSignature:boeScreenObj?.ValidateSignature,
          CustomerSigningDate:POSContactData?.custSignDateTime?convertDate(POSContactData?.custSignDateTime):POSContactData?.custSignDateTime,
          BranchReceivedDate: POSContactData?.requestDateTime?convertDate(POSContactData?.requestDateTime):POSContactData?.requestDateTime,
          resonfordelay: POSContactData?.reasonDelayed,
          BranchComments:boeScreenObj?.Comments,
          Branch_Name_New: boeScreenObj?.Branch_Name_New,
        })
        Data[selectedSubType]?.Checklist?.forEach(element => {
          if(element?.label==="Requestor  Comments"){
            element.hide = true
          }
        })
      }
    }
    },[]); // eslint-disable-next-line arrow-body-style

    useEffect(() => {
      setIsDisableNewMobileNo(false);
      const boeDetails = Data[selectedSubType]?.New_Bank_Details;
      const validElementNames = ["Bank_IFSC_New", "Acc_Type_New", "Acc_Number_New", "reenteraccountNumber", "PennyDrop", "NameMatch"];
      if (validateOTPSuccess) {
          if (boeDetails) {
              boeDetails.forEach(element => {
                if (validElementNames?.includes(element?.name)) {
                      element.disabled = true;
                  }
              });
          }
          setIsDisableNewMobileNo(true);
      } else {
          if (boeDetails) {
              boeDetails.forEach(element => {
                if (validElementNames?.includes(element?.name)) {
                      element.disabled = false;
                  }
              });
          }
          setIsDisableNewMobileNo(false);
      }
  }, [validateOTPSuccess, selectedSubType]); // eslint-disable-next-line arrow-body-style

    const toggleInputField = (field) => {
      setShowEmailFields(true);
      form.setFieldsValue({
        'mobileNo': clientEnquiryData?.rmblphone,
        'whatsAppNo':  clientEnquiryData?.rmblphone,
        'emailId': clientEnquiryData?.rinternet
      });

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
  
    const handleInputChange = (e, item) => {
      if (item.label?.includes("IFSC") && e.target.value) {
        getIFSCBankDetails(e.target.value);
      }
    };

   // Debounced function
   const getIFSCBankDetails = debounce(async (ifscCode) => {
    if (!ifscCode) return;
    try {
      let response = await apiCalls.getIFSCBanks(ifscCode);
      console.log(response)
      if (response.status===200) {
        if (response?.data?.length) {
          form.setFieldsValue({
            Bank_Name_New: response?.data[0]?.bank,
            Branch_Name_New: response?.data[0]?.branch,
            POSBank_Name_New: response?.data[0]?.bank,
            POSBranch_Name_New: response?.data[0]?.branch,
          });
        } else {
          message.error({
            content:
              response?.data?.responseBody?.errormessage ||
              "Something went wrong, please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
      }
    } catch (error) {
      message.error({
        content:
        error ||
          "Something went wrong, please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  }, 500);

    const InitiatePennyDropp = () => {
      setIsLoader(true);
      const values = form.getFieldsValue();
      if(!values?.Acc_Number_New || !values?.Acc_HldrName_New || !values?.Bank_IFSC_New){
        message.destroy();
        message.error({
          content:"Enter All Mandatory Feilds",
          className: "custom-msg",
          duration: 2,
        });
        setIsLoader(false);
       return;
      }
      else if(isShowPOSScreen && (!values?.POSAcc_Number_New || !values?.POSAcc_HldrName_New || !values?.POSBank_IFSC_New)){
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
          "accountNumber":BankAccNo,
          "accountHolderName":isShowPOSScreen ? values?.POSAcc_HldrName_New  : values?.Acc_HldrName_New,
          "ifsc": isShowPOSScreen ? values?.POSBank_IFSC_New?.toUpperCase() : values?.Bank_IFSC_New?.toUpperCase(),
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
              PennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  "Success" : "Failed",
              POSPennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  "Success" : "Failed",
              NameasperPennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName,
              POSNameasperPennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName,
            })
            setIsLoader(false);
           }else{
            form.setFieldsValue({
              PennyDrop: result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  "Success" : "Failed",
              POSPennyDrop:  result?.data?.responseBody?.result?.data?.source[0]?.data?.accountName ?  "Success" : "Failed",
            })
            setIsLoader(false);
           }
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



    const handleRequirementSubmit = () => {
      const formData = form.getFieldValue();
      setRequirementLoader(true);
      if(isShowPOSScreen){
        POSActionsOnContactDetails(null, "REJECTED");
      }else{
        saveRequest(formData);
      }
    };
    const popupClose=()=>{
      setRaiseRequirementOpen(false)
    }


    const POSActionsOnContactDetails = (values, status, list) => {
      let content  = status === 'REJECTED' ? "Please Select Documents to Reject": "Please Select Documents to move  Internally"
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
     let reqFormValues = requirementsForm?.getFieldsValue();
     let internalFormValues = internalReqForm?.getFieldsValue();
      if(status !== 'APPROVED'){
       if(((seletedRequerimentList.length===0 && !reqFormValues?.PosOtherReq)  && status === 'REJECTED') || ((seletedRequerimentList.length===0 && !internalFormValues?.PosInternalReq) && status === 'INTERNAL')){
         setIsLoader(false);
         setRequirementLoader(false);
         message.destroy();
         message.error({
           content: content,
           className: "custom-msg",
           duration: 3,
         });
       return;
       }
      }
   
  
      let obj = {
        TransectionId: 1,
        SrvReqRefNo: POSContactData?.srvReqRefNo, 
        Status: status,
        RequirementList: seletedRequerimentList,
        UsrID: loginInfo?.userProfileInfo?.profileObj?.userName,
        RoleID: loginInfo?.userProfileInfo?.profileObj?.role,
        Comments: values?.comment,
        TransactionPayload: [
          {
            "Status": "Update",
            "TagName": "POSComments1",
            "TagValue": values?.Comments
          }
        ],
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
      )}

      if (values?.AreDetailsCorrect == "no") {
        obj.TransactionPayload.push(
          {
            "Status": "Update",
            "TagName": "Bank_IFSC_New",
            "TagValue": values?.POSBank_IFSC_New?.toUpperCase()
          },
          {
            "Status": "Update",
            "TagName": "Bank_Name_New",
            "TagValue": values?.POSBank_Name_New
          },
          {
            "Status": "Update",
            "TagName": "Branch_Name_New",
            "TagValue": values?.POSBranch_Name_New
          },
          {
            "Status": "Update",
            "TagName": "Acc_Type_New",
            "TagValue": values?.POSAcc_Type_New
          },
          {
            "Status": "Update",
            "TagName": "Acc_HldrName_New",
            "TagValue": values?.POSAcc_HldrName_New
          },
          {
            "Status": "Update",
            "TagName": "Acc_Number_New",
            "TagValue": BankAccNo
          },
          {
            "Status": "Update",
            "TagName": "reenteraccountNumber",
            "TagValue": values?.POSreenteraccountNumber
          },
          {
            "Status": "Update",
            "TagName": "PennyDrop",
            "TagValue": values?.POSPennyDrop
          },
          {
            "Status": "Update",
            "TagName": "NameasperPennyDrop",
            "TagValue": values?.POSNameasperPennyDrop
          },
          {
            "Status": "Update",
            "TagName": "NameMatch",
            "TagValue": values?.POSNameMatch
          },
          {
            "Status": "Update",
            "TagName": "Comments",
            "TagValue": values?.Comments || ""
          },
        )
      }
       if(isShowPOSScreen){
     
    obj.TransactionPayload.push({
        "Status": "Create",
        "TagName": "PosOtherReq",
        "TagValue": reqFormValues?.PosOtherReq || ""
      });
    }
      let response = apiCalls.POSActionsOnContactDetails(obj);
      response
        .then((val) => {
          if (val?.data) {
            setAlertTitle(status === 'REJECTED' ?  "Requirements Raised" : `${val?.data?.message}`);
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
          setIsLoader(false);
          setRequirementLoader(false);
        })
        .catch((err) => {
          setIsLoader(false);
          setRequirementLoader(false);
        });
    };

    const getClientEnquiry = (e) => {
      setIsLoader(true);
      setDisableOTP(true);
      setSendOTPTo(null);
      let obj = {
        clientNumber:
          e === 1 ? customerData?.poClientID : customerData?.poClientID,
      };
    
      let response = apiCalls.getClientEnquiry(
        obj,
        loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID
      );
    
      response
        .then((val) => {
          if (val?.data) {
            setClientEnquiryData(val?.data?.responseBody);
            const res = val?.data?.responseBody;
    
            let obj1 = {
              clientNumber: customerData?.poClientID,
            };
    
            let response1 = apiCalls.getClientEnquiry(
              obj1,
              loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID
            );
    
            response1
              .then((val) => {
                if (val?.data) {
                  const res1 = val?.data?.responseBody;
                  setSendOTPTo(res1?.rmblphone);
                  if (res?.rmblphone) {
                    setDisableOTP(false);
                  }
                  setIsLoader(false);
                } else {
                  setIsLoader(false);
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
                setIsLoader(false);
              });
          }
        })
        .catch((err) => {
          setIsLoader(false);
        });
    };
    

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
    };

    const handleOTP = (isValue) => {
      setSendOTPLoader(true);
      setSendOTPErrorMsg(false);
      setValidateOTPSuccess(false);
      if (isValue && !otpValue) {
        setSendOTPLoader(false);
        message.destroy();
        message.error({
          content: "Please Enter OTP value",
          className: "custom-msg",
          duration: 2,
        });
        return;
      }
      const obj = {
        PolicyNo: customerData?.policyNo,
        EmailId: import.meta.env.VITE_APP_RECEIPIENT_CC ? import.meta.env.VITE_APP_RECEIPIENT_CC : clientEnquiryData?.rinternet,
        MobileNo: import.meta.env.VITE_APP_RECEIPIENT_MOBILENO ? import.meta.env.VITE_APP_RECEIPIENT_MOBILENO : clientEnquiryData?.rmblphone,
        CallType: props?.selectedCallType,
        SubType: props?.selectedSubTypeId,
        OTP: isValue ? otpValue : 0,
        Body: '"CustomerName":"vishnu","Purpose":"claim intimation"',
      };
      let response = apiCalls.getSendOTP(obj);
      response
        .then((val) => {
          if (val?.data?.responseHeader?.issuccess || val?.data?.responseOutput?.[0]?.responseHeader?.issuccess) {
            setSendOTPLoader(false);
            if (otpValue) {
              message.destroy();
              setSendOTPErrorMsg(null);
              message.success({
                content: "Otp Validation successfully",
                className: "custom-msg",
                duration: 3,
              });
              setOtpModal(false);
              setOtpValue(null);
              setValidateOTPSuccess(true);
              setDisableRequestForm(true);
            }
          } else {
            setSendOTPLoader(false);
            message.destroy();
            message.error({
              content:
                val?.data?.responseBody?.errormessage || val?.data?.responseOutput?.[0]?.responseBody?.errormessage ||
                "Something went wrong please try again!",
              className: "custom-msg",
              duration: 2,
            });
          }
        })
        .catch((err) => {
          setSendOTPLoader(false);
          setSendOTPErrorMsg();
        });
    };

    const handleOTPChange = (e) => {
      setOtpValue(e.currentTarget.value);
    };
    const handleSendOTP = () => {
      setCounter(30);
      handleOTP(false);
      setValidateBtnDisable(true);
      setIsDisableOTPInput(true);
      setIsCounterEnable(true);
    };
    const handleSendOTPClose = () => {
      form.setFieldsValue({ customerchoice: null });
      setOtpModal(false);
      setValidateBtnDisable(false);
      setOtpValue(null);
      setCounter(0);
      setIsDisableOTPInput(false);
      setIsCounterEnable(false);
    };

    const handleRadioLink =(item)=>{
      setDeDupeModalOpen(false);
      if(item?.label?.includes("Dedupe Match Details")){
        setDeDupeModalOpen(true)
        let formValues = form.getFieldsValue();
        const obj ={
          "lA_CustomerID": POSContactData?.customerId,
          "bank_IFSC": formValues?.Bank_IFSC_New?.toUpperCase(),
          "acc_Number": formValues?.Acc_Number_New,
        }
        let response = apiCalls.getVerifyBankDedup(obj);
        response.then((val) => {
            if (val?.data) {
              setBankDeDupeData(val?.data);
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
      }
    }
    const handleTextLink = (item) => {
      if(item.label?.includes("Uplaod Cheque Copy")){
        setAddressProofModal(true);
      }
      setDeDupeModalOpen(false);
      if(item?.label?.includes("De-Dupe Match Details")){
        setDeDupeModalOpen(true);
      }
      else if(item.linkValue?.toLowerCase() === "view"){
          const gConfig= apiCalls.getGenericConfig()
          if(gConfig?.data?.dmsApiUrl){
        const url = gConfig?.data?.dmsApiUrl +`/omnidocs/WebApiRequestRedirection?Application=BPMPOLENQ&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${policyDetails?.policyDetailsObj?.identifiers?.applicationNo}`;
        window.open(url, '_blank');
          }
      }
    
    };

    useEffect(()=>{
      if(loginInfo?.userProfileInfo?.profileObj?.isEmail){
        form.setFieldsValue({
          'requestchannel': 4,
        });
      }
    },[])

  const handleRadioChange = (e,item) => {
    setOtpModal(false);
    setUpdateFields(false);
    setShowRaiseRequirementBtn(false);
    const formData = form.getFieldValue();
 if(formData?.custRole &&formData?.assistFor &&formData?.requestchannel){
  setIsShowBankDetails(true);
 }
    if(e.target.value==="query" || e.target.value==="request" ){
    setSelectionAssist(e.target.value);
    }
    else if(e.target.value==="otp" || e.target.value==="requestform" ){
     setCustomerChoiceSelection(e.target.value);
     if(e.target.value==="otp"){
      setOtpModal(true);
      setValidateOTPSuccess(false);
     }
     else {
      setValidateOTPSuccess(true);
     }
    }
    if(selectedSubType==="bankdetailsupdation"&&item?.label?.includes("Name Match")){
      Data[selectedSubType]?.New_Bank_Details?.forEach(element => {
        if(element?.label?.includes("Uplaod Cheque Copy")&&(e.target.value==="no")){
          element.hide= false;
          setUpdateFields(!updateFields);
        }
        else if(element?.label?.includes("Uplaod Cheque Copy")&&(e.target.value==="yes")){
          element.hide= true;
          setUpdateFields(!updateFields);
        }
      });
    }
    if(selectedSubType==="bankdetailsupdation"){
    if(e.target.value === "no"&&item?.label?.includes("Validate Signature")){
      setShowRaiseRequirementBtn(true);
    }
    else if(e.target.value === "yes"&&item?.label?.includes("Validate Signature")){
      setShowRaiseRequirementBtn(false);
    }
    if(selectedSubType==="bankdetailsupdation" && item.name === 'AreDetailsCorrect' && e.target.value === 'no'){
      Data[selectedSubType]?.POS_Details?.forEach(element => {
        if(['POSBank_IFSC_New','POSBank_Name_New','POSBranch_Name_New','POSAcc_Type_New','POSAcc_HldrName_New','POSAcc_Number_New','POSreenteraccountNumber','POSPennyDrop','POSNameasperPennyDrop','POSNameMatch'].includes(element?.name)){
          element.hide = false
        }
      })
      form.setFieldsValue({
        POSAcc_HldrName_New: POSContactData?.custRole === 1? policyDetails?.policyDetailsObj?.identifiers?.la_Name:policyDetails?.policyDetailsObj?.identifiers?.po_Name
      })
      setUpdateFields(!updateFields);
    }else if(selectedSubType==="bankdetailsupdation" && item.name === 'AreDetailsCorrect' && e.target.value === 'yes'){
      Data[selectedSubType]?.POS_Details?.forEach(element => {
        if(['POSBank_IFSC_New','POSBank_Name_New','POSBranch_Name_New','POSAcc_Type_New','POSAcc_HldrName_New','POSAcc_Number_New','POSreenteraccountNumber','POSPennyDrop','POSNameasperPennyDrop','POSNameMatch'].includes(element?.name)){
          element.hide = true
        }
      });
      setUpdateFields(!updateFields);
    }
  }
    }

 const handleDropdownChange = (e, item) => {
  setDisableRequestForm(false);
 const formData = form.getFieldValue();
 setAuthorizationLetter(false);
 if(formData?.custRole &&formData?.assistFor &&formData?.requestchannel !== null && formData?.requestchannel !== undefined){
  setIsShowBankDetails(true);
 }
 if(formData.custRole && item?.name === 'custRole'){
 form.setFieldsValue({
      Acc_HldrName_New: formData.custRole === 1? customerData?.laName:customerData?.poName
  })
   getClientEnquiry(formData.custRole);
   getBankDeatils(formData.custRole);
 }
 if(e&&item?.label?.includes("Request Received Via")){
     setAuthorizationLetter(e===1?"self":"thirdparty");
    }
};
const onBlurInput = (e, item) => {
  const obj = form.getFieldsValue();
  if(item.name === 'reenteraccountNumber' || item.name === 'POSreenteraccountNumber'){
   setCNFBankAccNo(e)
  }else if(item.name === 'Acc_Number_New' || item.name === 'POSAcc_Number_New'){
    setBankAccNo(e)
  }

  if(!isShowPOSScreen){
    if(obj.reenteraccountNumber?.length >= 4 && item.name === 'reenteraccountNumber'){
      if(BankAccNo !== e ){
        message.destroy();
  message.error({
    content:
      "Bank Number Not matched",
    className: "custom-msg",
    duration: 2,
  });
  form.setFieldsValue({reenteraccountNumber: ''})
  }
    }else if(obj.Acc_Number_New?.length >= 4 &&  item.name === 'Acc_Number_New'){
    const lastFourDigits = obj.Acc_Number_New.slice(-4);
    const maskedString = '*'.repeat(obj.Acc_Number_New.length - 4) + lastFourDigits;
    form.setFieldsValue({Acc_Number_New: maskedString})
   }
  }

  else if(isShowPOSScreen){
    if(obj?.POSreenteraccountNumber?.length >= 4 && item.name === 'POSreenteraccountNumber'){
      if(BankAccNo !== e ){
        message.destroy();
  message.error({
    content:
      "Bank Number Not matched",
    className: "custom-msg",
    duration: 2,
  });
  form.setFieldsValue({POSreenteraccountNumber: ''})
  }
    }else if(obj?.POSAcc_Number_New?.length >= 4 &&  item.name === 'POSAcc_Number_New'){
    const lastFourDigits = obj.POSAcc_Number_New.slice(-4);
    const maskedString = '*'.repeat(obj.POSAcc_Number_New.length - 4) + lastFourDigits;
    form.setFieldsValue({POSAcc_Number_New: maskedString})
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

 const handleDateChange = (date, item) => {
    if (item === "branchreceivedate") {
      setShowReasonDelayField(false);
      let newDate = new Date();
      let todayDate = moment(newDate).format("MM/DD/YYYY");
      let selectDate = moment(date + 1).format("MM/DD/YYYY");
      const formFeilds = form.getFieldsValue()
      let customerSignDate = moment(formFeilds?.customerSigningDate + 1).format("MM/DD/YYYY");
      let dateDiffence = date_diff_indays(selectDate,customerSignDate)
      if(!formFeilds?.customerSigningDate||dateDiffence > 0){
        message.destroy();
        message.error({
          content: "Request Received Date can't be before the customer signing date.",
          className: "custom-msg",
          duration: 3,
        });
        form.setFieldsValue({
          branchreceiveddate: "",
          BranchReceivedDate: "",
          branchreceivedate:""
        })
      return;
      }
      if(showAuthorizationLetter === "thirdparty"){
        Data[selectedSubType]?.ThirdParty_Fields?.forEach(element => {
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
        Data[selectedSubType]?.Date_Fields?.forEach(element => {
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
  const handleLabelLink  =(item)=>{
    if(item.label === "Initiate Penny Drop"){

      InitiatePennyDropp();
    }
  }
  const handleLinkValue  =(item)=>{
    setAddressProofModal(true);
   }
  const handleUploadLink = () => {
    setAddressProofModal(true);
  };
  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };
  const getBankDeatils = (e) => {
    let obj = {
      policyNo: customerData?.policyNo,
      clientId : e === 1? customerData?.laClientID:customerData?.poClientID
    };
    let maskedString = ''
    let response = apiCalls.getBankDeatils(obj);
    response
      .then((val) => {
        if (val?.data[0]) {
          setBankDetailsData(val?.data[0]);
        if(val?.data[0]?.acc_Number?.length > 4){
          const lastFourDigits = val?.data[0]?.acc_Number?.slice(-4);
          maskedString = '*'.repeat(val?.data[0]?.acc_Number?.length - 4) + lastFourDigits;
        }else{
          maskedString = val?.data[0]?.acc_Number
        }
          form.setFieldsValue({
            Bank_IFSC_Old:val?.data[0]?.bank_IFSC?.toUpperCase(),
            Bank_Name_Old:val?.data[0]?.bank_Name,
            Acc_Type_Old:val?.data[0]?.acc_Type,
            Acc_HldrName_Old:val?.data[0]?.acc_HldrName,
            RegistredOn_Old: val?.data[0]?.registredOn ?  dayjs(val?.data[0]?.registredOn) : val?.data[0]?.registredOn,
            Acc_Number_Old:maskedString,
          })
          setIsLoader(false);
        } 
        else {
          setIsLoader(false);
          form.setFieldsValue({
            Bank_IFSC_Old:val?.data[0]?.bank_IFSC?.toUpperCase(),
            Bank_Name_Old:val?.data[0]?.bank_Name,
            Acc_Type_Old:val?.data[0]?.acc_Type,
            Acc_HldrName_Old:val?.data[0]?.acc_HldrName,
            RegistredOn_Old: val?.data[0]?.registredOn ?  dayjs(val?.data[0]?.registredOn) : val?.data[0]?.registredOn,
            Acc_Number_Old:maskedString,
          })
        }
      })
      .catch((err) => {
        setIsLoader(false);
      });
  };


  const handleSubmit = (values) => {
    if (POSContactData && customerData?.isPOS) {
      POSActionsOnContactDetails(values, "APPROVED");
    } else {
        saveRequest();
    }
  };

  const saveRequest = ()=>{
    setIsLoader(true);
    const values = form.getFieldsValue();
    if(values.customerSigningDate > values.branchreceivedate){
      message.destroy();
      message.error({
        content: " customer signing date  can't be greater than  Request Received Date.",
        className: "custom-msg",
        duration: 3,
      });
      form.setFieldsValue({
        customerSigningDate: "",
      })
      setIsLoader(false);
      return
    }
    const newFilesArray = [];
    const uniqueFilesSet = new Set();
    if (uploadFiles?.length > 0) {
      uploadFiles.forEach(file => uniqueFilesSet.add(file));
    }
    if (uploadChequeCopy?.length > 0) {
      uploadChequeCopy.forEach(file => uniqueFilesSet.add(file));
    }
    if (uploadMultipleFiles?.length > 0) {
      uploadMultipleFiles.forEach(file => uniqueFilesSet.add(file));
    }
      newFilesArray.push(...uniqueFilesSet);
    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: loginInfo?.userProfileInfo?.profileObj?.role || 0, // Required
      RequestChannel: loginInfo?.userProfileInfo?.profileObj?.role === 14 ? 13 :  values.requestchannel, // Required
      Category: values?.assistFor === "query"  ? 1 :2,
      ApplicationNo:
      policyDetails?.policyDetailsObj?.identifiers?.applicationNo,
      DOB: convertDate(customerData?.dob),
       PolicyNo: policyDetails?.policyDetailsObj?.identifiers?.policyNo, // Required
     CustomerId: (values?.custRole === 'Proposer' || values?.custRole ===2) ? customerData?.poClientID:customerData?.laClientID,
      //  "CustRole":(values?.custRole === 'Proposer' || values?.custRole ===2) ? customerData?.poClientID : customerData?.laClientID,
       CustRole: (values?.custRole === 'Proposer' || values?.custRole ===2) ? 2 : 1,
      policyStatus:
        policyDetails?.policyDetailsObj?.planAndStatus?.policyStatus,
        proposerName: policyDetails?.policyDetailsObj?.identifiers?.po_Name,
        plan: policyDetails?.policyDetailsObj?.planAndStatus?.planName,
      CreatedOn: new Date(),
      CreatedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
      CreatedUsrId: loginInfo?.userProfileInfo?.profileObj?.userName,
      ModifiedOn: new Date(),
      ModifiedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
      AssignedToRole: "", //POS
      AssignedByUser: 0,
      ReasonForChange: "",
      CurrentStatus:raiseRequirementOpen? "Reject":'',
      RequestDateTime: values?.branchreceivedate
      ? new Date(values?.branchreceivedate)
      : new Date(),
      ReasonDelayed: values?.resonfordelay || "",
      CustSignDateTime: values?.customersigningdate
      ? new Date(values?.customersigningdate)
      : new Date(),
      "TransactionData": [
        {
          "Status": "Create",
          "TagName": "AdditionalNoteForCustomer",
          "TagValue": values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ")||"",
      },
        {
          "Status": "Create",
          "TagName": "ValidateSignature",
          "TagValue": values?.validatesignature || ""
      },
          {
              "Status": "Create",
              "TagName": "Bank_Name_New",
              "TagValue": values?.Bank_Name_New
          },
          {
            "Status": "Update",
            "TagName": "Branch_Name_New",
            "TagValue":values?.Branch_Name_New
        },
          {
              "Status": "Create",
              "TagName": "Bank_IFSC_New",
              "TagValue": values?.Bank_IFSC_New?.toUpperCase()
          },
          {
              "Status": "Create",
              "TagName": "Acc_HldrName_New",
              "TagValue": values?.Acc_HldrName_New
          },
          {
            "Status": "Create",
            "TagName": "NameasmentionedinBankAccount",
            "TagValue": values?.NameasmentionedinBankAccount||""
        },
          {
              "Status": "Create",
              "TagName": "Acc_Type_New",
              "TagValue": values?.Acc_Type_New
          },
           {
              "Status": "Create",
              "TagName": "Acc_Number_New",
              "TagValue":BankAccNo 
          },
          {
              "Status": "Create",
              "TagName": "RegistredOn_Old",
              "TagValue": values?.RegistredOn_Old || ""
          },
           {
              "Status": "Create",
              "TagName": "Bank_Name_Old",
              "TagValue": values?.Bank_Name_Old|| ""
          },
          {
              "Status": "Create",
              "TagName": "Bank_IFSC_Old",
              "TagValue": values?.Bank_IFSC_Old?.toUpperCase() || ""
          },
          {
              "Status": "Create",
              "TagName": "Acc_HldrName_Old",
              "TagValue": values?.Acc_HldrName_Old || ""
          },
           {
              "Status": "Create",
              "TagName": "Acc_Number_Old",
              "TagValue": bankDetailsData?.acc_Number  || ""
          },
          {
              "Status": "Create",
              "TagName": "Acc_Type_Old",
              "TagValue": values?.Acc_Type_Old || ""
          },{
            "Status": "Create",
            "TagName": "PennyDrop",
            "TagValue": values?.PennyDrop || ""
          },
          {
            "Status": "Create",
            "TagName": "NameasperPennyDrop",
            "TagValue": values?.NameasperPennyDrop || ""
          },
          {
            "Status": "Create",
            "TagName": "NameMatch",
            "TagValue": values?.NameMatch || ""
          },
          {
            "Status": "Create",
            "TagName": "Req_Via",
            "TagValue": values?.Req_Via || ""
          },
          {
            "Status": "Create",
            "TagName": "ValidatedBy",
            "TagValue": values?.customerchoice ? values?.customerchoice : 'form'
        },
        { Status: "Create", TagName: "custRole", TagValue: values?.custRole },
        { Status: "Create", TagName: "assistFor", TagValue: values?.assistFor },
        { Status: "Create", TagName: "Comments", TagValue: values?.Comments },
        {Status: "Create",TagName: "Client_Id","TagValue":  values?.custRole === 1 ? customerData?.laClientID: customerData?.poClientID},
        { Status: "Create", TagName: "ProcessFileType", TagValue:"PROCESSENQUIRY" }
      ],
      Uploads: newFilesArray?.length>0 ? newFilesArray : uploadFiles,
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
                              if(ids?.length===0 ){//&& !props?.EmailResponse?.IsEmailmanagent
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
            setAlertTitle(val?.data?.header);
            setAlertData(val?.data?.message);
            setShowAlert(true);
            setIsLoader(false);
            setRequirementLoader(false);
        } else {
          message.error({
            content:
              val?.data?.responseBody?.errormessage ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
        setIsLoader(false);
        setRequirementLoader(false);
      })
      .catch((err) => {
        setIsLoader(false);
        setRequirementLoader(false);
      });   
  }
  const getUploadFiles=(listOfUploadFiles)=>{
  if (!listOfUploadFiles || listOfUploadFiles?.length === 0) return;
  const isBankAccountProof = listOfUploadFiles[0]?.labelName?.toLowerCase() === "uplaod cheque copy";
  if (isBankAccountProof) {
    setUploadChequeCopy(listOfUploadFiles);
  } else {
    setUploadFiles(listOfUploadFiles);
  }
   }
     

  const getMultpleUploadFiles=(listOfUploadFiles,label)=>{
    // Update the state with the new list
    setUploadMultipleFiles(listOfUploadFiles);
    if(listOfUploadFiles.length >0 ){
      form.setFieldsValue({
        addressProof: `Documents Uploaded -  ${listOfUploadFiles.length }`,
        idProof:  `Documents Uploaded -  ${listOfUploadFiles.length }`,
      })
    }
  }

  const handleRemove = (file) => {
    if(file?.labelName === "Copy of Aadhar Card"){
      setAAdharUploadFiles([]);
    }else if(file?.labelName === "Copy of Passport"){
      setPassportUploadFiles([]);
    }else if(file?.labelName === "Copy of Ration Card"){
      setRationCardUploadFiles([]);
    }else if(file?.labelName === "Copy of Driving License"){
      setDrivingUploadFiles([]);
    }
    else if(file?.labelName === "Copy of Voter ID"){
      setVoterUploadFiles([]);
    }
    else if(file?.labelName === "Copy of PAN Card"){
      setPancardUploadFiles([]);
    }
    let updatedFiles = isUploadMultipleFiles?.filter((ele)=>{
               return ele?.labelName !== file.labelName
    });
    setIsMultipleFiles(updatedFiles)
    form.setFieldsValue({
      addressProof: `Documents Uploaded -  ${updatedFiles.length }`,
      idProof: `Documents Uploaded -  ${updatedFiles.length }`,
    })
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    fileList: [],
    customRequest: ({ file, onSuccess, index,item },label) => {
      let formData = new FormData();
      const ApplicationNo =  policyDetails?.policyDetailsObj?.identifiers?.applicationNo
      formData.append("File", file, ApplicationNo+'/'+file.name);
      let response = apiCalls.fileUpload(formData);
      response
      .then((val) => {
        if (val?.data) {
          let newDocumentObj= {
            "IndexName": "Bank Details Updation",
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
          if (newDocumentObj.labelName && isUploadMultipleFiles?.length > 0) {
            // Check if a file with the same labelName already exists
            const existingFileIndex = isUploadMultipleFiles.findIndex(
              (file) => file.labelName === newDocumentObj.labelName
            );
          
            // Remove the labelName property before updating or adding the object
            //delete newDocumentObj.labelName;
          
            if (existingFileIndex !== -1) {
              // If exists, replace the existing file object with the new one
              const updatedUploadFiles = [...isUploadMultipleFiles];
              updatedUploadFiles[existingFileIndex] = newDocumentObj;
              setIsMultipleFiles(updatedUploadFiles);
          
              // Send the updated files to getMultpleUploadFiles
              // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
              getMultpleUploadFiles(updatedUploadFiles,label);
            } else {
              // If doesn't exist, add the new file object to the list
              setIsMultipleFiles((prevFiles) => [...prevFiles, newDocumentObj]);
          
              // Send the updated files to getMultpleUploadFiles
              // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
              getMultpleUploadFiles([...isUploadMultipleFiles, newDocumentObj],label);
            }
          } else {
            setIsMultipleFiles((prevFiles) => [...prevFiles, newDocumentObj]);
             getMultpleUploadFiles([...isUploadMultipleFiles, newDocumentObj],label);
          }
          setShowUploadFile(index);
          if(label?.includes("Copy of Aadhar Card")){
            setAAdharUploadFiles([{...newDocumentObj}]);
          }
          else if(label?.includes("Copy of Passport")){
            setPassportUploadFiles([{...newDocumentObj}]);
          }
          else if(label?.includes("Copy of Ration Card")){
            setRationCardUploadFiles([{...newDocumentObj}]);
          }
          else if(label?.includes("Copy of Driving License")){
            setDrivingUploadFiles([{...newDocumentObj}]);
          }
          else if(label?.includes("Copy of Voter ID")){
            setVoterUploadFiles([{...newDocumentObj}]);
          }
          else if(label?.includes("Copy of PAN Card")){
            setPancardUploadFiles([{...newDocumentObj}])
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
      setShowUploadFile(false);
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
    const handleAddressModalClose=()=>{
      setUploadFiles([]);
      setAddressProofModal(false)
      setAAdharUploadFiles([]);
      setPassportUploadFiles([]);
      setRationCardUploadFiles([]);
      setDrivingUploadFiles([]);
      setVoterUploadFiles([]);
      setPancardUploadFiles([]);
    }
    const handleOk = (idProofBtn) => {
      if(idProofBtn==="idProof"){
      if(aadharUploadFiles?.length===0&&passportUploadFiles?.length===0&&rationCardUploadFiles?.length===0&&DrivingUploadFiles?.length===0&&voterUploadFiles?.length===0&&pancardUploadFiles?.length===0){
        message.warning({
          content:
            "Please Upload atleast one file.",
          className: "custom-msg",
          duration: 2,
        });
      }else {
      setAddressProofModal(false)
      }
    }
    else {
    if(aadharUploadFiles?.length===0&&passportUploadFiles?.length===0&&rationCardUploadFiles?.length===0&&DrivingUploadFiles?.length===0&&voterUploadFiles?.length===0){
      message.warning({
        content:
          "Please Upload atleast one file.",
        className: "custom-msg",
        duration: 2,
      });
    }else {
    setAddressProofModal(false)
    }
  }
    };
    const disabledDate = (current) => {
      return current && current > dayjs().endOf("day"); // Can not select days before today and today
    };
    const handleEdit = (val)=>{
      if(val==='edit'){
        setIsPosEdited(true)
        Data[selectedSubType]?.POS_Details?.forEach(element => {
          if(element?.posEdit){
            element.disabled = false
          }
        })
        
      }else if(val==='close'){
        setIsPosEdited(true)
        Data[selectedSubType]?.POS_Details?.forEach(element => {
          if(element?.posEdit){
            element.disabled = true
          }
        })
        POSContactData?.serviceRequestTransectionData?.forEach(element => {
          posScreenObj[element.tagName] = element.tagValue
        });
        form.setFieldsValue({
          Bank_IFSC_New: posScreenObj?.Bank_IFSC_New,
          Bank_Name_New: posScreenObj?.Bank_Name_New,
          Acc_Type_New: parseInt(posScreenObj?.Acc_Type_New),
          Acc_HldrName_New:posScreenObj?.Acc_HldrName_New,
          NameasmentionedinBankAccount: posScreenObj?.NameasmentionedinBankAccount,
          Acc_Number_New:posScreenObj?.Acc_Number_New,
          PennyDropResult:posScreenObj?.PennyDrop,
          NameasperPennyDrop: posScreenObj?.NameasperPennyDrop,
          NameMatch:posScreenObj?.NameMatch,
        })
      }
      
    }
    const getInternal = (list) => {
      let values = form.getFieldsValue();
      POSActionsOnContactDetails(values, "INTERNAL", list);
  }

  const setInternalReqData = () => {
    POSContactData.serviceRequestTransectionData?.forEach(element => {
       if(element.tagName === 'InternalRequirementValue'){
           
             setInternalFlowRequirements(props.interlRequirementTagValue);
       };
     });
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
            boeScreenObj[element.tagName] = element.tagValue
          });
          form.setFieldsValue({
            authorizercomments: boeScreenObj?.POSComments1,
          })
        }
        setInternalReqData();
      },[])

  return (
    <>
      <Spin spinning={isLoader}>
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
          onFinish={customerData?.isInternalFlow? "":handleSubmit}
          autoComplete="off"
        >

          
{
            customerData?.isInternalFlow?
              <>
           <InternalFlow data={internalData}
            suffix={!isShowPOSScreen && suffix}
            policyDetails={props?.details?.policyDetailsObj?.identifiers?.applicationNo}
            form={form}
            customerData={customerData}
            POSContactData={POSContactData}
            boeScreenObj={boeScreenObj}
            Docs = {InternaRequirements}
           />
            </>
            
            : (

              <>
               <DetailsForm
                data={!isShowPOSScreen? Data[selectedSubType]?.BOE_Details: Data[selectedSubType]?.POS_Details}
                handleRadioChange={handleRadioChange}
                handleLabelLink ={handleLabelLink}
                requestModeLU={requestModeLU}
                handleEdit = {handleEdit}
                clientRoleLU={clientRoleLU}
                handleDropdownChange={handleDropdownChange}
                handleTextLink={handleTextLink}
                bankAccTypeLU={bankAccTypeLU}
                handleInputChange={handleInputChange}
                handleRadioLink={handleRadioLink}
                onBlurInput={onBlurInput}
                requestReceivedViaLU={requestReceivedViaLU}
              ></DetailsForm>
              {!isShowPOSScreen&& isShowBankDetails&&<>
              {selectionAssist&&<>
                <DetailsForm
                data={Data[selectedSubType]?.Existing_Bank_Details}
                handleDateChange={handleDateChange}
                onBlurInput = {onBlurInput}
                bankAccTypeLU={bankAccTypeLU}
                handleInputChange={handleInputChange}
                subType={selectedSubType}
              ></DetailsForm>
              </>}
              {selectionAssist==="query"&&<>
                <DetailsForm
                data={Data[selectedSubType]?.Query_Bank_Fields}
                toggleInputField={toggleInputField}
                showEmailAddress={showEmailAddress}
                showPhoneNumber={showPhoneNumber}
                showWhatsApp={showWhatsApp}
                onBlurInput = {onBlurInput}
              ></DetailsForm>
              </>}
              {showEmailFields&&selectionAssist==="query"&&<>
            <ContactForm showEmailAddress={showEmailAddress} showPhoneNumber={showPhoneNumber} showWhatsApp={showWhatsApp}/>
          </>}
           {selectionAssist==="request"&&<>
              <DetailsForm
                data={Data[selectedSubType]?.Bank_Details}
                handleDropdownChange={handleDropdownChange}
                   onBlurInput = {onBlurInput}
                requestModeLU={requestModeLU}
                clientRoleLU={clientRoleLU}
              ></DetailsForm>
               <DetailsForm
                data={Data[selectedSubType]?.New_Bank_Details}
                handleDropdownChange={handleDropdownChange}
                handleRadioChange={handleRadioChange}
                onBlurInput = {onBlurInput}
                handleLabelLink ={handleLabelLink }
                handleLinkValue ={handleLinkValue }
                bankAccTypeLU={bankAccTypeLU}
                handleInputChange={handleInputChange}
                subType={selectedSubType}
                handleTextLink={handleTextLink }
                disableRequestForm={disableRequestForm}
                validateOTPSuccess={validateOTPSuccess}
                getUploadFiles={getUploadFiles}
              ></DetailsForm>
              {customerChoiceSelection==="otp"&&<>
              <DetailsForm
                data={Data[selectedSubType]?.Bank_Upload}
                handleRadioChange={handleRadioChange}
                handleDropdownChange={handleDropdownChange}
                handleUploadLink={handleUploadLink}
                showPOSScreen={isShowPOSScreen}
                handleLabelLink ={handleLabelLink }
                suffix={!isShowPOSScreen && suffix}
                form={form}
                handleTextLink={handleTextLink }
              ></DetailsForm>
              </>}
              {customerChoiceSelection==="requestform"&&<>
               {/* <DetailsForm
                data={Data[selectedSubType]?.RequestForm_Fields}
                handleRadioChange={handleRadioChange}
                getUploadFiles={getUploadFiles}
                handleDropdownChange={handleDropdownChange}
                handleUploadLink={handleUploadLink}
                showPOSScreen={isShowPOSScreen}
                suffix={!isShowPOSScreen && suffix}
                form={form}
                handleTextLink={handleTextLink }
              ></DetailsForm>*/}
              {showAuthorizationLetter === "thirdparty" &&<>
                <DetailsForm
                data={Data[selectedSubType]?.ThirdParty_Fields}
                handleDateChange={handleDateChange}
                handleRadioChange={handleRadioChange}
                handleDropdownChange={handleDropdownChange}
                requestReceivedViaLU={requestReceivedViaLU}
                suffix={!isShowPOSScreen && suffix}
                form={form}
                getUploadFiles={getUploadFiles}
                disabledDate={disabledDate}
                handleLinkValue={handleLinkValue}
              ></DetailsForm>
              </>}
              {showAuthorizationLetter !== "thirdparty" && 
              <DetailsForm
                data={Data[selectedSubType]?.Date_Fields}
                handleDateChange={handleDateChange}
                handleRadioChange={handleRadioChange}
                handleDropdownChange={handleDropdownChange}
                requestReceivedViaLU={requestReceivedViaLU}
                getUploadFiles={getUploadFiles}
                handleLabelLink ={handleLabelLink }
                handleUploadLink={handleUploadLink}
                showPOSScreen={isShowPOSScreen}
                suffix={!isShowPOSScreen && suffix}
                form={form}
                handleTextLink={handleTextLink }
                disabledDate={disabledDate}
              ></DetailsForm>}
              {showResonDelayField&&<>
              <DetailsForm
                data={Data[selectedSubType]?.ReasonSubmission}
                onBlurInput = {onBlurInput}
              ></DetailsForm>
              </>}
              </>}
              </>}
              </>}
              <div className="contact-details-btn">
                        <Button
                        type="primary"
                        className="primary-btn"
                        htmlType="submit"
                        disabled={(showRaiseRequirementBtn&&!isShowPOSScreen)}
                      >
                        {!isShowPOSScreen
                          ? "Submit"
                          : "Approve"}
                      </Button>
                      {selectionAssist !== "query" && (
                        <>
                          <Button
                            type="primary"
                            className="primary-btn"
                            onClick={() => getRaiseRequirements()}
                          >
                            Raise Requirement
                          </Button>
                        </>
                      )
                    } 
                     {isShowPOSScreen && (
                        <>
                          
                           <InternalFlowPOS interlRequirementTagValue1 = {props.interlRequirementTagValue} selectedList = {POSContactData.serviceRequestTransectionData} getInternal = {getInternal} internalReqForm={internalReqForm}/>
                        
                        </>
                      )
                    }
                      </div>
              </>
            )
          }
            
        </Form>
      </Spin>
      <Modal
        title="OTP Verification"
        open={otpModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => handleSendOTPClose()}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        {sendOTPErrorMsg && (
          <Alert
            closable
            type="error"
            description={sendOTPErrorMsg}
            onClose={() => setSendOTPErrorMsg(null)}
            showIcon
          />
        )}
        <Spin spinning={sendOTPLoader}>
          <Input
            type="text"
            className="input-label"
            value={otpValue}
            placeholder="Enter Verification Code"
            maxLength={6}
            disabled={!isDisableOTPInput}
            onChange={(e) => {
              handleOTPChange(e);
            }}
          />
         {counter > 0 && isCounterEnable&&(
            <>
              <p className="time-count">Resend OTP in {counter} sec</p>
            </>
          )}
             {counter <= 0 && !isCounterEnable&&(
            <>
              <p className="resend-otp">
                OTP to be sent{" "}
                {/* {(
                  props?.details?.sentDetailsObj?.mobileNo ||
                  props?.customerData?.mobileNo
                )?.replace(/.(?=.{4})/g, "x")} */}
                 {sendOTPTo?.includes("@") ? sendOTPTo : sendOTPTo?.replace(/.(?=.{4})/g, "x")}
              </p>
            </>
          )}
          <div className="text-center modal-validate">
            <Button
              type="primary"
              className="primary-btn"
              onClick={() => handleSendOTP()}
              disabled={counter > 0&&isCounterEnable}
            >
              {(!validateBtnDisable && "Send OTP") || "Resend OTP"}
            </Button>
            <Button
              type="primary"
              className="primary-btn"
              onClick={() => {
                handleOTP(true);
              }}
              disabled={!validateBtnDisable}
            >
              Validate
            </Button>
          </div>
        </Spin>
      </Modal>


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
                  {raiseRequerimentList && raiseRequerimentList?.map((item, ind) => (
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
                  onClick={()=>handleRequirementSubmit()}
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


      <Modal
        title="Bank De-Dupe Match Details"
        open={deDupeModalOpen}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setDeDupeModalOpen(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="table-container" style={{ marginTop: "20px" }}>
          <table className="responsive-table">
            <tr>
              <th>Policy Number</th>
              <th>Account Number</th>
              <th>Account Holder Name</th>
              {/* <th>Customer Name</th> */}
            </tr>
            {BankduDupeData?.map((item,index) => (
            <tr key={index}>
            <td>{item?.LA_PolicyNo || item?.lA_PolicyNo}</td>
              <td>{item?.Acc_Number || item?.acc_Number}</td>
              <td>{item?.Acc_HldrName || item?.acc_HldrName}</td>
              {/* <td>{item?.CustomerNam || item?.customerName}</td> */}
            </tr>
          ))}
           {BankduDupeData?.length === 0  &&
               <tr>
                  <td colspan="3">
               
                <div className="text-center"><span>No data available</span></div> 
        </td>
        </tr>}
          </table>
        </div>
      </Modal>
      <Modal
        title="List of Acceptable Bank Proofs"
        open={addressProofModal}
        destroyOnClose={true}
        width={1000}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => handleAddressModalClose()}>
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
              <td>Copy of cancelled cheques with pre-printed customer’s name and account number</td>
              <td>



              <Upload 
                      {...uploadProps} 
                      fileList={aadharUploadFiles}
                      onRemove={handleRemove}
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG"
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of Aadhar Card")}
                    //onChange={(info) => handleFileUpload(info, index)} 
                  //  onChange={(props) => handleUpload(props)}
                    action={
                      "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                    }
                      >
                         {suffix}
                        </Upload>
                        {/* {aadharUploadFiles.name} */}
                        {/* {uploadFiles?.map((files, index) => (
                        files ? (
                       <div key={index}>
                            {files.DocumentName}
                            </div>
                        ) : null
                        ))} */}
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Copy of Bank  Passbook</td>
              <td>
              <Upload 
                   {...uploadProps} 
              fileList={passportUploadFiles}
                 
                      onRemove={handleRemove}
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG"
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of Passport")}
                    //onChange={(info) => handleFileUpload(info, index)} 
                  //  onChange={(props) => handleUpload(props)}
                    action={
                      "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                    }
                      >
                         {suffix}
                        </Upload>
                        {/* {passportUploadFiles.name} */}
              </td>
            </tr>
            {/* <tr>
              <td>3</td>
              <td>Copy of Ration Card</td>
              <td>
              <Upload 
                      {...uploadProps} 
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG"
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of Ration Card")}
                    
                    action={
                      "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                    }
                      >
                         {suffix}
                        </Upload>
                        {rationCardUploadFiles.name}
              </td>
            </tr> */}
            {/* <tr>
              <td>4</td>
              <td>Copy of Driving License</td>
              <td>
              <Upload 
                      {...uploadProps} 
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG"
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of Driving License")}
                    
                    action={
                      "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                    }
                      >
                         {suffix}
                        </Upload>
                        {DrivingUploadFiles.name}
              </td>
            </tr> */}
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
      <Modal
        title="List of Acceptable ID Proofs"
        open={addressProofModal}
        destroyOnClose={true}
        width={1000}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => handleAddressModalClose()}>
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
              <td>Copy of Aadhar Card - Masked</td>
              <td>
              <Upload 
                      {...uploadProps} 
                      fileList={aadharUploadFiles}
                      onRemove={handleRemove}
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG"
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of Aadhar Card")}
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
              <td>Copy of Passport</td>
              <td>
              <Upload 
                      {...uploadProps} 
                      fileList={passportUploadFiles}
                      onRemove={handleRemove}
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,.pdf"
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of Passport")}
                    action={
                      "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                    }
                      >
                         {suffix}
                        </Upload>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Copy of Ration Card</td>
              <td>
              <Upload 
                      {...uploadProps} 
                      fileList={rationCardUploadFiles}
                      onRemove={handleRemove}
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.pdf,.PDF"
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of Ration Card")}
                    action={
                      "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                    }
                      >
                         {suffix}
                        </Upload>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Copy of Driving License</td>
              <td>
              <Upload 
                      {...uploadProps} 
                      fileList={DrivingUploadFiles}
                      onRemove={handleRemove}
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,pdf"
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of Driving License")}
                    action={
                      "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                    }
                      >
                         {suffix}
                        </Upload>
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>Copy of Voter ID</td>
              <td>
              <Upload 
                      {...uploadProps} 
                      fileList={voterUploadFiles}
                      onRemove={handleRemove}
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,pdf"
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of Voter ID")}
                    action={
                      "https://fgliccommonserviceapi.azurewebsites.net/api/InsertBlob"
                    }
                      >
                         {suffix}
                        </Upload>
              </td>
            </tr>
            <tr>
              <td>6</td>
              <td>Copy of PAN Card</td>
              <td>
              <Upload 
                      {...uploadProps} 
                      fileList={pancardUploadFiles}
                      onRemove={handleRemove}
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,pdf"
                    customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess}, "Copy of PAN Card")}
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
              onClick={() => handleOk("idProof")}
            >
              Ok
            </Button>
          </div>
        </div>
      </Modal>

      {showAlert && (
        <PopupAlert
          alertData={alertData}
          getAdvance={props.getAdvance}
          title={alertTitle}
          navigate={navigateTo}
          setShowAlert={setShowAlert}
        ></PopupAlert>
      )}
      {raiseRequirementOpen && <> 
       <RaiseRequirementPopup raiseRequerimentList={raiseRequerimentList} raiseRequirementOpen={raiseRequirementOpen} requirementModalLoader={requirementModalLoader} handleRequirementSubmit={handleRequirementSubmit} popupClose={popupClose} isShowPOSScreen={isShowPOSScreen} requirementsForm={requirementsForm}/>
       </>}

    </>
  );
};

const mapStateToProps = ({ state, policyDetails, user }) => {
  return { data: state?.PolicyDetailsReducer?.policyDetailsObj, policyDetails };
};

export default connect(mapStateToProps)(BankDetails);
