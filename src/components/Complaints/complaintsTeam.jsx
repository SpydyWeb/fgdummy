import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill-new';
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import { Routes, Route, useParams, useLocation } from 'react-router-dom';
import apiCalls from "../../api/apiCalls";
import { Card, Button, Col, Row, List, Space, Radio, Tabs, Select, Input, Form, Upload, Collapse, message, Spin, Modal, Tooltip } from 'antd';
import { Color } from '@rc-component/color-picker';
import CloseIcon from "../../assets/images/close-icon.png";
import UploadIcon from "../../assets/images/upload.png";
import { NumericFormat } from "react-number-format";
import moment from 'moment';
import PopupAlert from '../popupAlert';
import { connect,useSelector } from "react-redux";
import { billFreq } from '../../utils/constantLU';


const { Panel } = Collapse;
const { Option } = Select;
const { TabPane } = Tabs;


const items = [
  {
    key: '1',
    label: 'Basic Details',
    children: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text . ",
  },
  {
    key: '2',
    label: 'Financial & Viability',
    children: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ",
  },
  {
    key: '3',
    label: 'Medicals',
    children: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ",
  },
];

// import apiCalls from "../../api/apiCalls";
// import CloseIcon from "../../assets/images/close-icon.png";


const ComplaintsTeam = (props) => {
  const [form] = Form.useForm();
  const loginInfo = useSelector(state => state);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [data, setData] = useState([]);
  const [isResponseMode, setIsResponseData] = useState('email');
  const [callType, setCallType] = useState('');
  const [subType, setSubType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [subject, setSubject] = useState('');
  const [editorHtml, setEditorHtml] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [subTypeLU, setSubTypeLU] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [callTypeLU, setCallTypeLU] = useState([]);
  const [selectedCallType, setSelectedCallType] = useState("");
  const [selectedSubType, setSelectedSubType] = useState(null);
  const [isSubmitButton, setIsSubmitButton] = useState("");
  const [selectedComplaintCallType, setSelectedComplaintCallType] = useState('');
  const [selectedComplaintSubType, setSelectedComplaintSubType] = useState('');
  const { state } = useLocation();
  const [isShowOpen, setIsShowOpen] = useState(false);
  const [GCPDetailsData, setGCPDetailsData] = useState(null);
  const [isUploadMultipleFiles, setIsMultipleFiles] = useState([]);
  const [showUploadFile, setShowUploadFile] = useState(null);
  const [uploadMultipleFiles, setUploadMultipleFiles] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertData, setAlertData] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [navigateTo, setNavigateTo] = useState("");
  const [commentsData,setCommentsData]=useState([]);
  const suffix = <img src={UploadIcon} alt="" />;


  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, 'YYYYMMDD').format('DD/MM/YYYY');
    return formattedDate;
  };




  const responseMode = [
    {
      name: "Email",
      value: "email"
    },
    {
      name: "Letter",
      value: "letter"
    }
  ]


  const [ComplaintCall, setComplaintCall] = useState(false);
  const [isClickedButton, setIsClickedButton] = useState(false);

  let { serviceId } = useParams();


  const [mode, setMode] = useState('left');
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  const handleChangeEditor = (html) => {
    setEditorHtml(html);
  };

  const formItemLayout = {
    labelCol: {
      span: 4, // adjust the span based on your layout needs
    },
    wrapperCol: {
      span: 16, // adjust the span based on your layout needs
    },
  };

  const formItemLayout2 = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };



  const beforeUpload = file => {
    // Add your custom validation logic here
    return true;
  };
  const handleChange1 = ({ fileList }) => {
    setFileList(fileList);
  };
  const handleRemove = file => {
    const newFileList = fileList.filter(item => item.uid !== file.uid);
    setFileList(newFileList);
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


  useEffect(() => {
    GetSearchPolicyDetails()
  }, [])

  const GetSearchPolicyDetails = async () => {
    setIsLoading(true);
    const response = await apiCalls.GetSearchPolicyDetails(state?.serviceNo);
    if (response.status === 200) {
      form.setFieldsValue({
        to: response.data,
        from: import.meta.env.VITE_APP_RECEIPIENT_TO
      })
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

  const customRequest = ({ file, onSuccess, onError }) => {
    // Add your custom upload logic here (e.g., using Axios or Fetch)
    // onSuccess should be called when the upload is successful
    // onError should be called when there is an error during upload
    onSuccess();
  };



  const handlePreview = file => {
    // Add logic to preview the file (e.g., open a modal or navigate to a preview page)
    //window.open(file.url || file.thumbUrl, '_blank');
    // const reader = new FileReader();  // download code
    // reader.onloadend = () => {
    //   window.open(reader.result, '_blank');
    // };
    // reader.readAsDataURL(file.originFileObj);

    // Check if the file type is an image or a PDF
    if (file.type.startsWith('image/') || file.type === 'application/pdf') {
      // Display images and PDFs directly in the browser
      //window.open(URL.createObjectURL(file.originFileObj), '_blank');
      // Display images and PDFs directly in the browser
      setPreviewFile(file);
      setPreviewVisible(true);
    } else {
      // For other file types, open a new window with a download link
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(file.originFileObj);
      downloadLink.download = file.name;
      downloadLink.click();
    }
  };

  const uploadButton = (
    <Button icon={<i
      class="bi bi-paperclip text-color c-pointer fs-20"
      style={{ width: "20px" }}
    ></i>}></Button>
  );


  const handleDownload = file => {
    // Create a download link and trigger the click event
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(file.originFileObj);
    downloadLink.download = file.name;
    downloadLink.click();
  };

  const handleChangeTC = (e) => {
    if (e.target.value === 'yes') {
      setComplaintCall(true);
    } else {
      setComplaintCall(false);
    }


  };

  const handleLetterOpen = () => {
    setIsShowOpen(true)
  }

  const sentTemplate = (value) => {
    if (value === 'unregistered') {

      setEditorHtml(`<p>Dear Sender,<br /><br />Kindly send email from your registered mailbox for further processing of your request.<br />Please note we will not be able to service any request from unregistered mail box.</p>
     <br/> <p>Regards,<br />Team GC</p>`);

    } else if (value === 'acknowledge') {
      setEditorHtml(`<p>Dear Sender,</p>
     <p><br />We acknowledge your mail for policy number &lt;asdasd&gt;. <br />Please note you will receive a separate mail(s) for request raised by you.</p>
     <p><br />Regards,<br />Team GC</p>`)
    }
    else if (value === 'closure') {
      setEditorHtml(`<p>Dear Sender,</p>
     <p><br />You are hereby informed that your request cannot be processed due to below reasons</p>
     <p><br />Regards,<br />Team GC</p>`)
    }
  }



  const handleResponseMode = (ele) => {
    setIsResponseData(ele.value)
  }

  useEffect(() => {
    getCTST();
  }, [])

  const getCTST = async () => {

    setIsLoading(true);
    let obj =
    {
      "MasterRequest": [
        "CALL_TYP", "SUB_TYP", "COMPLAINT_CT", "COMPLAINT_ST_2"
      ]
    }
    let response = await apiCalls.ctst(obj);
    if (Array.isArray(response?.data)) {
      setMasterData(response.data);
      // Use the function for each set of data
      const transformedData = transformData(response.data, "CALL_TYP");
      const subTypeData = transformData(response.data, "SUB_TYP");
      const cellTypeComplaintData = transformData(response.data, "COMPLAINT_CT");
      const subTypeComplaintData = transformData(response.data, "COMPLAINT_ST_2");
      setSelectedComplaintSubType(subTypeComplaintData)
      setSelectedComplaintCallType(cellTypeComplaintData)
      setCallTypeLU(transformedData);
      let filteredData = subTypeData?.filter((item) => {
        return item.mstParentID === state?.callTypeNum
      });
      setSubTypeLU(filteredData);
      form.setFieldsValue({
        callType: state?.cellType,
        subType: state?.subType
      })
      setIsLoading(false);
    }
    else {
      setIsLoading(false);
      message.destroy()
      message.error({
        content: "Something went to wrong!",
        className: "custom-msg",
        duration: 2,
      });
    }
  }


  const transformData = (data, key) => {
    const filteredData = data?.filter((ele) => ele.key === key);
    return filteredData[0]?.value?.map((item) => ({
      ...item,
      label: item.mstDesc,
      value: item.mstID,
    }));
  };
  const handleSave = async (e) => {
    const values = form.getFieldsValue();
    var obj =
    {
      ServicereqId: serviceId,
      CallType: state?.callTypeNum,
      SubType: isClickedButton ? subType : state?.subTypeNum,
      ComplaintCallType: null,
      ComplaintSubType: null,
      ComplaintFrom: values.from,
      SenderTo: values.to,
      Subject: values.subject,
      CC: values.cc,
      content: editorHtml,
      Policynumber: data?.identifiers?.policyNo,
      IsRegisterComplaint : ComplaintCall,
      Uploads: isUploadMultipleFiles,
    }
    const response = await apiCalls.getComplaintAction(obj);
    if(response.status===200){
      setAlertTitle('Complaints Team Saved Successfully');
      setNavigateTo("/grievanceuser");
      setAlertData(`${"Ticket No " + serviceId}`);
      setShowAlert(true);
    }
    else{
      message.destroy()
      message.error({
        content: response?.data?.responseBody?.errormessage || "Something went wrong please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }

  }

  const handleSend = async () => {
    const values = form.getFieldsValue();
    var obj =
    {
      ServicereqId: serviceId,
      CallType: state?.callTypeNum,
      SubType: isClickedButton ? subType : state?.subTypeNum,
      ComplaintCallType: null,
      ComplaintSubType: null,
      ComplaintFrom: values.from,
      SenderTo: values.to,
      Subject: values.subject,
      CC: values.cc,
      content: editorHtml,
      Policynumber: data?.identifiers?.policyNo,
      IsRegisterComplaint : ComplaintCall,
      Uploads: isUploadMultipleFiles,
    }
    const response = await apiCalls.getSendAction(obj);
    if(response.status===200){
      setAlertTitle('Complaints Team Send Successfully');
      setNavigateTo("/grievanceuser");
      setAlertData(`${"Ticket No " + serviceId}`);
      setShowAlert(true);
    }
    else{
      message.destroy()
      message.error({
        content: response?.data?.responseBody?.errormessage || "Something went wrong please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
   
  
  }

  useEffect(() => {
    getPOSIndividualData(serviceId)
  }, []);

  const getPOSIndividualData=async(data)=>{
    setIsLoading(true);
    const  val = await apiCalls.getPOSIndividualData(data);
    if(val?.data){
      setIsLoading(false);
      setCommentsData(val?.data)
      // getGCPPolicydetails();
 
    }else{
      message.destroy();
      message.error({
        content: val?.data?.responseHeader?.message||"Something went wrong please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  }


  const handleChangeCellType = (e) => {
    setCallType(e)
  }
  const handleChangeSubType = (e) => {
    setSubType(e);
    setIsClickedButton(true);
  }
  const onSearch = (value) => {
  };
  const handleCallTypeChange = (e, index) => {
    setSelectedCallType(e);
  }
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const handleSubTypeChange = (e) => {
    setSelectedSubType(e)
  }

  const onFinish = (values) => {
    if (isSubmitButton === "save") {
      handleSave()
    }
    else if (isSubmitButton === "send") {
      handleSend();
    }
  };

  const onFinishFailed = (errorInfo) => {

  };

  useEffect(() => {
    getGCPPolicydetails()
  }, [])

  const getGCPPolicydetails = () => {
    setIsLoading(true);
    // let response = apiCalls.getGCPPolicyDetails(state?.policyNo);
    let response= apiCalls.getFreeLookDetailsApi(import.meta.env.VITE_APP_ENVIRONMENT == "UAT" ? import.meta.env.VITE_APP_GCP_POLICY_NO : state?.policyNo);
    response
      .then((val) => {
        if (val?.data?.statusCode === "200") {
          setGCPDetailsData(val?.data?.response);
          setIsLoading(false);

        } 

      })
      .catch((err) => {
        message.error({
          content:
           err ||
            "Something went wrong please try again!",
          className: "custom-msg",
          duration: 2,
        });
      });
  };

  const uploadURL = import.meta.env.VITE_APP_API_URL2 + "InsertBlob";
  const uploadProps = {
    name: "file",
    multiple: false,
    fileList: [],
    customRequest: ({ file, onSuccess, index, item }, label) => {
      let formData = new FormData();
      const ApplicationNo = data?.identifiers?.applicationNo
      formData.append("File", file, ApplicationNo + '/' + file.name);
      let response = apiCalls.fileUpload(formData);
      response
        .then((val) => {
          if (val?.data) {

            let newDocumentObj = {
              "IndexName": "Address Proof",
              "DocumentName": file?.name,
              "UserID": loginInfo?.userProfileInfo?.profileObj?.userName,
              "UploadedBy": loginInfo?.userProfileInfo?.profileObj?.name,
              "UploadedOn": new Date(),
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
                getMultpleUploadFiles(updatedUploadFiles, label);
              } else {
                // If doesn't exist, add the new file object to the list
                setIsMultipleFiles((prevFiles) => [...prevFiles, newDocumentObj]);

                // Send the updated files to getMultpleUploadFiles
                // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
                getMultpleUploadFiles([...isUploadMultipleFiles, newDocumentObj], label);
              }
            } else {
              // If labelName is not present or the array is empty, add the new file object to the list
              setIsMultipleFiles((prevFiles) => [...prevFiles, newDocumentObj]);

              // Send the updated files to getMultpleUploadFiles
              // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
              getMultpleUploadFiles([...isUploadMultipleFiles, newDocumentObj], label);
            }

            //getMultpleUploadFiles(documnetsObj);
            setShowUploadFile(index);

            //setUploadFiles(file);
            //   if(label?.includes("Copy of Aadhar Card")){
            //     setAAdharUploadFiles([{...newDocumentObj}]);
            //   }
            //   else if(label?.includes("Copy of Passport")){
            //     setPassportUploadFiles([{...newDocumentObj}]);
            //   }
            //   else if(label?.includes("Copy of Ration Card")){
            //     setRationCardUploadFiles([{...newDocumentObj}]);
            //   }
            //   else if(label?.includes("Copy of Driving License")){
            //     setDrivingUploadFiles([{...newDocumentObj}]);
            //   }
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
    beforeUpload: (file) => {
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
  const getMultpleUploadFiles = (listOfUploadFiles, label) => {
    const updatedUploadList = listOfUploadFiles?.map((obj) => {
      // Create a new object without the propertyToDelete property
      const { labelName, ...newObject } = obj;
      return newObject;
    });
    // Update the state with the new list
    setUploadMultipleFiles(updatedUploadList);
    if (listOfUploadFiles.length > 0) {
      form.setFieldsValue({
        addressProof: `Documents Uploaded -  ${listOfUploadFiles.length}`,
      })
    }

  }
  let uploadData = [
    { name: "Attachments", indexName: "Attachments", label: "Attachments", inputType: "upload", placeholder: "Attachments" }
  ]

  const handleUpload = (file) => {
  }
  const getUploadVal = (item) => {
    const prevUploadFile = props?.form?.getFieldsValue();
    return prevUploadFile ? prevUploadFile[item.name]?.file?.name : '';
  }



  const saveCommentButton=()=>{
    let formData=form.getFieldsValue();
    // setIsLoading(true);
  //   console.log("dhdhhd",commentsData)
  //   const commentsIndex = commentsData?.serviceRequestTransectionData.findIndex(item => item.tagName === "Comments");
  //   const updatedTransactionData = [...commentsData?.serviceRequestTransectionData];
  //  updatedTransactionData[commentsIndex].tagValue = formData?.userComments;
  //   const obj = {
  //     CallType:commentsData?.callType, // Required
  //     SubType: commentsData?.subType, // Required
  //     RequestSource: commentsData?.requestSource, // Required
  //     RequestChannel: commentsData?.requestChannel, // Required
  //     Category:commentsData?.category,
  //     ApplicationNo:data?.identifiers?.applicationNo,
  //     DOB:commentsData?.dob,
  //     PolicyNo: commentsData.policyNo, // Required
  //     CustomerId: commentsData?.customerId,
  //     CustRole:commentsData?.custRole,
  //     policyStatus:commentsData.policyStatus,
  //     proposerName: commentsData.proposerName ,
  //     plan: commentsData.planName,
  //     CreatedOn: new Date(),
  //     CreatedByRef: commentsData?.createdByRef,
  //     CreatedUsrId: loginInfo?.userProfileInfo?.profileObj?.userName,
  //     ModifiedOn: commentsData?.modifiedOn,
  //     ModifiedByRef:commentsData?.modifiedByRef,
  //     AssignedToRole: "", //POS
  //     AssignedByUser: 0,
  //     ReasonForChange: "",
  //     RequestDateTime:  commentsData?.requestDateTime,
  //     ReasonDelayed: "",
  //     CustSignDateTime: commentsData?.custSignDateTime,
  //     TransactionData: updatedTransactionData,
  //     Uploads: commentsData?.dmsLink,
  //     CurrentStatus:commentsData?.currentStatus,
  //    CommunicationRequest: commentsData?.communicationPayload,
  // }  
  const commentsIndex = commentsData?.serviceRequestTransectionData.findIndex(item => item.tagName === "Comments");

const updatedTransactionData = [...commentsData?.serviceRequestTransectionData];

if (commentsIndex !== -1) {
  updatedTransactionData[commentsIndex].tagValue = formData?.userComments;
}

// Update commentsData with the new updatedTransactionData
const updatedCommentsData = {
  ...commentsData,
  serviceRequestTransectionData: updatedTransactionData
};
  setIsLoading(false);

    let response = apiCalls.genericAPI(updatedCommentsData);
    response
      .then((val) => {
        if (val?.data) {
          setAlertTitle('User Complaints Saved Successfully');
          setNavigateTo("/grievanceuser");
          setAlertData(`${"Ticket No " + serviceId}`);
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

  return (
    <>
      <Spin spinning={isLoading} >
        <div className='complaints-section'>
          <div style={{ width: '100%', float: 'left' }}>
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
                          {data?.planAndStatus?.customerType || "-"}{" "}
                        </b>
                      </p>
                      <p>
                        <b>
                          {" "}
                          {data?.planAndStatus?.planName ||
                            "-"}{" "}
                        </b>
                      </p>
                      <p>
                        <b>
                          {" "}
                          {/* {data?.planAndStatus?.policyStatus ||
                                  "-"}{" "} */}
                          {data?.planAndStatus?.policyStatus || "-"}{" "}
                        </b>
                      </p>
                      <p>
                        <b>
                          {" "}
                          {/* {getPremiumStatus(data?.planAndStatus?.premiumStatus) ||
                                  "-"}{" "} */}
                          {data?.planAndStatus?.premiumStatus || "-"}{" "}
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
                        <b>{data?.saDetails?.pt || "-"}</b>
                      </p>
                      <p>
                        <b>{convertDate(data?.saDetails?.rcd) || "-"}</b>
                      </p>
                      <p>
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
                        <b>{data?.premiumDetails?.ppt || "-"}</b>
                      </p>
                      <p>
                        <b>{convertDate(data?.premiumDetails?.ptd) || "-"}</b>
                      </p>
                      <p>
                        <b>{billFreq[data?.premiumDetails?.billFreq] || "-"}</b>
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
                        <b>{data?.identifiers?.branchName || "-"} </b>
                      </p>
                      <p>
                        <b>{data?.salesDetails?.channel || "-"} </b>
                      </p>
                      <p>
                        <b>
                          {data?.salesDetails?.agentName || "-"}
                        </b>
                      </p>
                      <p>
                        <b>{data?.salesDetails?.orphanFlag || "-"}</b>
                      </p>
                    </article>
                  </div>
                </section>
              </div>
            </div>
            <div className='tabs-begin' style={{ margin: '16px 16px', }}>
              <Tabs tabPosition="left" type="card">
                <TabPane
                  tab={
                    <span>

                      Complaint Description
                    </span>
                  }
                  key="1"
                >

                  <Form  form={form} onFinish={saveCommentButton}>
                    <Form.Item label="Complaint Description" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                      <Input.TextArea
                        rows={6}
                        placeholder={state.complaintDescription}
                        disabled
                        style={{ color: "black !important" }}
                      />
                    </Form.Item>



                    <Form.Item label="User Comments" name="userComments" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} >
                      <Input.TextArea rows={6} placeholder="Please Add User Comments" />
                    </Form.Item>

                    <Form.Item label="" wrapperCol={{ span: 20 }} labelCol={{ span: 4 }}>
                      <a onClick={handleLetterOpen}>View Letter / Email</a>
                    </Form.Item>
                    <div style={{ display: 'flex', width: '100%', justifyContent: "center" }}>
                      <Button type="primary" className="primary-btn mt-4 me-3" htmlType="submit"
                      // onClick={saveCommentButton}
                      >
                        Save Comment
                      </Button>
                    </div>
                    <Modal
                      title="List of Documents"
                      open={isShowOpen}
                      destroyOnClose={true}
                      width={800}
                      closeIcon={
                        <Tooltip title="Close">
                          <span onClick={() => setIsShowOpen(false)}>
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
                              view
                            </td>
                          </tr>
                        </table>
                      </div>
                    </Modal>
                  </Form>
                </TabPane>
                <TabPane
                  tab={
                    <span>

                      Data Points
                    </span>
                  }
                  key="2"
                >
                  <Form style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    <div style={{ width: '50%' }}>
                      <Form.Item label="Policy Login Date" {...formItemLayout2}>
                        <Input type="text" placeholder={GCPDetailsData?.applicationAttribute
                        [0]?.proposalloggeddate || "null"} disabled />
                      </Form.Item>
                    </div>
                    <div style={{ width: '50%' }}>
                      <Form.Item label="Any Questionnaire Submitted" {...formItemLayout2}>
                        <Input type="text" placeholder="Any Questionnaire Submitted" />
                      </Form.Item>
                    </div>
                    <div style={{ width: '50%' }}>
                      <Form.Item label="Age" {...formItemLayout2}>
                        <Input type="text" placeholder={state?.dob || "null"} disabled />
                      </Form.Item>
                    </div>
                    <div style={{ width: '50%' }}>
                      <Form.Item label="Payment Mode" {...formItemLayout2}>
                        <Input type="text" placeholder="Payment Mode" />
                      </Form.Item>
                    </div>
                    <div style={{ width: '50%' }}>
                      <Form.Item label="PIVC Status" {...formItemLayout2}>
                        <Input type="text" placeholder={GCPDetailsData?.policyAttribute[0]?.pivcstatus || "null"} disabled="true" style={{ color: "black" }} />
                      </Form.Item>
                    </div>
                    <div style={{ width: '50%' }}>
                      <Form.Item label="Location" {...formItemLayout2}>
                        <Input type="text" placeholder={GCPDetailsData?.clientAttribute
                        [0]?.loginlocation || "null"} disabled />
                      </Form.Item>
                    </div>
                    <div style={{ width: '50%' }}>
                      <Form.Item label="Date of Issuance" {...formItemLayout2}>
                        <Input type="text" placeholder="Date of Issuance" />
                      </Form.Item>
                    </div>
                    <div style={{ width: '50%' }}>
                      <Form.Item label="Income of Proposer" {...formItemLayout2}>
                        <Input type="text" placeholder={GCPDetailsData?.clientAttribute
                        [0]?.proposerincome
                          || "null"} disabled />
                      </Form.Item>
                    </div>
                    <div style={{ width: '50%' }}>
                      <Form.Item label="Welcome Calling Status" {...formItemLayout2}>
                        <Input type="text" placeholder="Welcome Calling Status" />
                      </Form.Item>
                    </div>
                    <div style={{ width: '50%' }}>
                      <Form.Item label="Normal / Rated Up" {...formItemLayout2}>
                        <Input type="text" placeholder={GCPDetailsData?.policyAttribute
                        [0]?.isnormalorrateup || "null"} disabled />
                      </Form.Item>
                    </div>
                    <div style={{ width: '50%' }}>
                      <Form.Item label="Occupation of LA" {...formItemLayout2}>
                        <Input type="text" placeholder={GCPDetailsData?.clientAttribute
                        [0]?.laoccupation
                          || "null"} disabled />
                      </Form.Item>
                    </div>
                    <div style={{ width: '50%' }}>
                      <Form.Item label="Policy Delivery Date" {...formItemLayout2}>
                        <Input type="text" placeholder={GCPDetailsData?.applicationAttribute
                        [0]?.deliverydate
                          || "null"} disabled />
                      </Form.Item>
                    </div>
                    <div style={{ width: '50%' }}>
                      <Form.Item label="Medical / Non Medical" {...formItemLayout2}>
                        <Input type="text" placeholder="Medical / Non Medical" />
                      </Form.Item>
                    </div>
                    <div style={{ width: '50%' }}>

                      <Form.Item label="Channel" {...formItemLayout2}>
                        <Input type="text" placeholder={data?.salesDetails?.channel || "-"} disabled />
                      </Form.Item>
                    </div>
                    <div style={{ width: '50%' }}>
                      <Form.Item label="Proposal Sign Date" {...formItemLayout2}>
                        <Input type="text" placeholder={GCPDetailsData?.applicationAttribute
                        [0]?.proposalsigndate || "null"} style={{ color: "black" }} disabled="true"
                        />
                      </Form.Item>
                    </div>
                  </Form>
                </TabPane>
                <TabPane
                  tab={
                    <span>

                      User Description
                    </span>
                  }
                  key="3"
                >
                  <Form
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}>

                    <div style={{ display: 'flex', width: '100%' }}>
                      <div style={{ width: '50%' }}>
                        <Form.Item label="Tag Complaint" wrapperCol={{ span: 18 }} labelCol={{ span: 6 }}>
                          <Radio.Group onChange={handleChangeTC}>
                            <Radio value="yes">Yes</Radio>
                            <Radio value="no">No</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </div>
                      <div style={{ width: '50%' }}>
                        <Form.Item label="Response Mode" wrapperCol={{ span: 18 }} labelCol={{ span: 6 }}>
                          <Radio.Group>
                            {
                              responseMode.length > 0 && responseMode.map((data, index) => {
                                return <Radio value={data.value} onClick={() => handleResponseMode(data)}>{data.name}</Radio>
                              })
                            }
                          </Radio.Group>
                        </Form.Item>
                      </div>
                    </div>



                    <div style={{ display: 'flex', width: '100%' }}>
                      <div style={{ width: '50%' }}>
                        <Form.Item label="Call Type" wrapperCol={{ span: 18 }} labelCol={{ span: 6 }} rules={[{ required: true, message: "Please Select call type" }]} name="callType">
                          {/*<Select placeholder="Select Call Type" onChange={(e)=>handleChangeCellType(e)}>
          <Option value="1">{isDisplayedCallType}</Option>
        </Select>
        */}
                          <Select
                            className="inputs-label cust-input"
                            placeholder="Select a Call Type"
                            options={callTypeLU}
                            filterOption={filterOption}
                            onChange={(value) => { handleCallTypeChange(value); }}
                            disabled={true}
                          />
                        </Form.Item>
                      </div>
                      <div style={{ width: '50%' }}>
                        <Form.Item label="Subtype" name="subType" wrapperCol={{ span: 18 }} labelCol={{ span: 6 }}>
                          <Select placeholder="Select Subtype" onChange={(e) => handleChangeSubType(e)}>
                            {
                              subTypeLU?.length > 0 && subTypeLU?.map((i) => {
                                return <Option value={i.mstID} key={i.mstID}>{i.mstDesc}</Option>
                              })
                            }
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                    {ComplaintCall &&
                      <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '50%' }}>
                          <Form.Item label="Complaint Call Type" wrapperCol={{ span: 18 }} labelCol={{ span: 6 }} name="">
                            <Select
                              showSearch
                              placeholder="Select a Call Type"
                              optionFilterProp="children"
                              onSearch={onSearch}
                              filterOption={filterOption}
                              options={selectedComplaintCallType}
                              onChange={(e) => handleCallTypeChange(e)}
                            />
                          </Form.Item>
                        </div>
                        <div style={{ width: '50%' }}>
                          <Form.Item label="Complaint Subtype" wrapperCol={{ span: 18 }} labelCol={{ span: 6 }}>
                            <Select
                              showSearch
                              placeholder="Select a Sub Type"
                              optionFilterProp="children"
                              onChange={(e) => handleSubTypeChange(e)}
                              onSearch={onSearch}
                              filterOption={filterOption}
                              options={selectedComplaintSubType}
                            />
                          </Form.Item>
                        </div>
                      </div>
                    }

                    <div style={{ display: 'flex', width: '100%' }}>
                      <div style={{ width: '50%' }}>
                        {
                          isResponseMode === "email" &&
                          <Form.Item label={
                            <span>
                              From
                              {/* <sup> *</sup> */}
                            </span>
                          } name="from" wrapperCol={{ span: 18 }} labelCol={{ span: 6 }}
                            rules={[{ required: false, message: "Please enter your From" }]}
                          >
                            <Input type="text" placeholder="From" disabled />
                          </Form.Item>
                        }

                      </div>
                      <div style={{ width: '50%' }}>
                        {
                          isResponseMode === "email" &&
                          <Form.Item label={
                            <span>
                              To
                              {/* <sup> *</sup> */}
                            </span>
                          } wrapperCol={{ span: 18 }} labelCol={{ span: 6 }} name="to" rules={[{ required: true, message: "Please enter your To" }]}>
                            <Input type="text" placeholder="To" disabled />
                          </Form.Item>
                        }
                      </div>
                    </div>



                    <div style={{ display: 'flex', width: '100%' }}>
                      {
                        isResponseMode === "email" &&
                        <div style={{ width: '50%' }}>
                          <Form.Item label={
                            <span>
                              Cc
                              {/* <sup> *</sup> */}
                            </span>
                          } wrapperCol={{ span: 18 }} name="cc" labelCol={{ span: 6 }}
                            rules={[{ required: true, message: "Please enter your Cc" }]}>
                            <Input type="text" placeholder="Cc" />
                          </Form.Item>
                        </div>
                      }
                      {
                        isResponseMode === "email" &&
                        <div style={{ width: '50%' }}>
                          <Form.Item label={
                            <span>
                              Subject
                              {/* <sup> *</sup> */}
                            </span>
                          } wrapperCol={{ span: 18 }} name="subject" labelCol={{ span: 6 }}
                            rules={[{ required: true, message: "Please enter your Subject" }]}>
                            <Input type="text" placeholder="Subject" />
                          </Form.Item>
                        </div>
                      }
                    </div>


                    {
                      isResponseMode === "email" &&
                      <div style={{ width: '50%' }}>
                        {uploadData?.map((item, index) => (
                          <React.Fragment key={index}>
                            {item.inputType === "upload" && (
                              <Form.Item
                                label={
                                  <span>
                                    {item.label}
                                  </span>
                                }
                                name={item.name}
                                className="inputs-label mb-0"
                                wrapperCol={{ span: 18 }} labelCol={{ span: 6 }}
                              >
                                <Upload
                                  {...uploadProps}
                                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG, .PDF, .pdf, .TIFF, .tiff"
                                  customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess, index, item })}
                                  //onChange={(info) => handleFileUpload(info, index)} 
                                  onChange={(props) => handleUpload(props)}
                                  action={uploadURL}
                                >
                                  <Input
                                    placeholder={item.placeholder}
                                    type="text"
                                    className="cust-input upload-column"
                                    size="small"
                                    value={showUploadFile === index ? uploadFiles.name : getUploadVal(item)}
                                    suffix={!props?.hideUploadOption && suffix}
                                  />

                                </Upload>
                                <ul>
                                  {isUploadMultipleFiles.map((file, index) => (
                                    <li key={index} style={{ marginTop: "20px", marginBottom: "20px" }}>
                                      <span>{file.DocumentName}</span>
                                      <span style={{ fontSize: "20px", cursor: "pointer", marginLeft: "10px" }} onClick={() => handleRemove(file)} ><DeleteOutlined /></span>
                                    </li>
                                  ))}
                                </ul>

                              </Form.Item>

                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    }


                    {
                      isResponseMode === "email" &&
                      <div style={{ width: '50%' }}>
                        <Form.Item
                          label="Select Template"
                          name="sentTemplate"
                          className="inputs-label mb-0"
                          wrapperCol={{ span: 18 }} labelCol={{ span: 6 }}
                        >
                          <Select
                            onChange={(value) => {
                              sentTemplate(value)
                            }}

                            className="cust-input"
                            maxLength={100}
                            placeholder="Select a Sent Template"
                            options={[
                              {
                                value: "acknowledge",
                                label: "Acknowledge",
                              },
                              {
                                value: "closure",
                                label: "Closure",
                              },
                              {
                                value: "unregistered",
                                label: "UnRegistered Mail",
                              },
                            ]}
                          ></Select>
                        </Form.Item>

                        <br />
                      </div>
                    }

                    {
                      isResponseMode === "letter" &&
                   
                      <div style={{ width: '50%' }}>
                      {uploadData?.map((item, index) => (
                        <React.Fragment key={index}>
                          {item.inputType === "upload" && (
                            <Form.Item
                              label={
                                <span>
                                  {item.label}
                                </span>
                              }
                              name={item.name}
                              className="inputs-label mb-0"
                              wrapperCol={{ span: 18 }} labelCol={{ span: 6 }}
                            >
                              <Upload
                                {...uploadProps}
                                accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG, .PDF, .pdf, .TIFF, .tiff"
                                customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess, index, item })}
                                //onChange={(info) => handleFileUpload(info, index)} 
                                onChange={(props) => handleUpload(props)}
                                action={uploadURL}
                              >
                                <Input
                                  placeholder={item.placeholder}
                                  type="text"
                                  className="cust-input upload-column"
                                  size="small"
                                  value={showUploadFile === index ? uploadFiles.name : getUploadVal(item)}
                                  suffix={!props?.hideUploadOption && suffix}
                                />

                              </Upload>
                              <ul>
                                {isUploadMultipleFiles.map((file, index) => (
                                  <li key={index} style={{ marginTop: "20px", marginBottom: "20px" }}>
                                    <span>{file.DocumentName}</span>
                                    <span style={{ fontSize: "20px", cursor: "pointer", marginLeft: "10px" }} onClick={() => handleRemove(file)} ><DeleteOutlined /></span>
                                  </li>
                                ))}
                              </ul>

                            </Form.Item>

                          )}
                        </React.Fragment>
                      ))}
                    </div>
                    }

                    {/* <Form.Item label="">
        <a href="#">Edit Response</a>
      </Form.Item> */}
                    {
                      isResponseMode === "email" &&
                      <ReactQuill className="quill-container" theme="snow" readOnly={false} value={editorHtml} onChange={handleChangeEditor} />
                    }
                    <div style={{ display: 'flex', width: '100%', justifyContent: "center" }}>
                      <Button type="primary" className="primary-btn mt-4 me-3" onClick={() => setIsSubmitButton("save")} htmlType="submit"
                        disabled={ComplaintCall}
                      >
                        Save
                      </Button>

                      <Button type="primary" className="primary-btn mt-4 me-3" htmlType="submit"
                        onClick={() => setIsSubmitButton("send")}
                      >
                        Send
                      </Button>

                      <Button type="primary" className="primary-btn mt-4 me-3" htmlType="submit"
                        onClick={() => setIsSubmitButton("save")}
                        disabled={!ComplaintCall}
                      >
                        Register Complaint
                      </Button>
                    </div>
                  </Form>

                </TabPane>


              </Tabs>

            </div>
          </div>
          {/* <div  style={{ width: '20%', float: 'left',background:'#f2f2f2', height:'100vh'}}>
      <div style={{  margin: '16px 16px',}}>
      <h5>Comments</h5>

  <div style={{ background: '#fff' }}>
  <Collapse items={items} expandIconPosition="end" className='commentss' bordered={false}  />
  </div>
 <br/>
  <div className='underwriterDecision' style={{ background: '#fff' }}>
  <h5> Underwriter Decision</h5>

  <Form className='form1' id='form1'>
      <div style={{ width: '100%' }}>
  <Form.Item label=" Comments"   labelCol ={{ span: 24 }}>
      <Input.TextArea  placeholder="" />
      </Form.Item>
      </div>

      <div style={{ width: '100%' }}>
  <Form.Item label=" Select Decision"   labelCol ={{ span: 24 }}>
  <Select placeholder="Select Decision">
          <Option value="Approve">Approve </Option>
          <Option value="Reject">Reject</Option>
        </Select>
      </Form.Item>
      </div>

      <div style={{ width: '100%' }}>
  <Form.Item label=" Assign To"   labelCol ={{ span: 24 }}>
  <Input type="text" placeholder="Assign To" />
      </Form.Item>
      </div>

      <div style={{ width: '100%' }}>
  <Form.Item label=" Feedback"   labelCol ={{ span: 24 }}>
  <Select placeholder="Select Feedback">
          <Option value="Approve">Approve </Option>
          <Option value="Reject">Reject</Option>
        </Select>
      </Form.Item>
      </div>
    </Form>

  </div>

      
      </div>
       
    </div> */}
        </div>


        {showAlert && (
                    <PopupAlert
                        alertData={alertData}
                        title={alertTitle}
                        getAdvance={props.getAdvance}
                        navigate={navigateTo}
                        setShowAlert={setShowAlert}
                        isShow={true}
                    ></PopupAlert>
                )}

      </Spin>


    </>
  )
}


export default ComplaintsTeam;