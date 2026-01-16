import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Form, Upload, message, Button,Spin, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import UploadIcon from "../../assets/images/upload.png";
import apiCalls from "../../api/apiCalls";
import { connect, useSelector } from "react-redux";
import PopupAlert from "../popupAlert";


const InternalFlow = (props) => {
    const loginInfo = useSelector(state => state);

    const [showUploadFile, setShowUploadFile] = useState(null);
    const [uploadMultipleFiles, setUploadMultipleFiles] = useState([]);
    const [isUploadMultipleFiles, setIsMultipleFiles] = useState([]);
    const [uploadFiles, setUploadFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [alertData, setAlertData] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [navigateTo, setNavigateTo] = useState("");
    const [isLoader, setIsLoader] = useState(false);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
    const [requirementModalLoader, setRequirementLoader] = useState(false);
    const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);

    const boeScreenObj = {
        
    }

    useEffect(() => {
        if (props?.customerData?.isInternalFlow) {
            props?.POSContactData?.serviceRequestTransectionData?.forEach(element => {
                boeScreenObj[element.tagName] = element.tagValue
            });
            props?.form.setFieldsValue({
                authorizercomments: boeScreenObj?.POSComments1,
                Comments:boeScreenObj?.RequestorComments
            })
        }
    }, [])


    const suffix = <img src={UploadIcon} alt="" />;

    const requirementDescription = (item) => {
        return item.mstDesc ? item.mstDesc : item.raiseReqDesc;
      };

    const getMultpleUploadFiles = (listOfUploadFiles, label) => {
        const updatedUploadList = listOfUploadFiles?.map((obj) => {
            // Create a new object without the propertyToDelete property
            const { labelName, ...newObject } = obj;
            return newObject;
        });
        // Update the state with the new list
        setUploadMultipleFiles(updatedUploadList);
        if (listOfUploadFiles.length > 0) {
            props?.form.setFieldsValue({
                addressProof: `Documents Uploaded -  ${listOfUploadFiles.length}`,
            })
        }

    }

    const setInternalRequirementData = () => {

        let x = props.Docs;
   if(props.customerData.subTypeName === 'Represent Cheque'){
    const alreadyExists = x.some(item => item.mstDesc === 'Coordinating with bank');
    if (!alreadyExists) {
       x.push({ MstCategory: 'INTL_REQMNT', mstDesc: 'Coordinating with bank', mstID: 4 });
    }
   }
        let mstDesc;
        let mstID;
         props.POSContactData.serviceRequestTransectionData?.forEach(element => {
           if(element.tagName === 'InternalRequirementValue'){
               
               if(element.tagValue.length > 1){
                 let  requirementValue = JSON.parse(element.tagValue)
                 mstID = props.Docs.filter(x => requirementValue.includes(x.mstID)).map(x => x.mstID)
                 mstDesc = props.Docs.filter(x => requirementValue.includes(x.mstID)).map(x => x.mstDesc);
                 let combinedData = requirementValue.map((mstID, index) => ({ mstID, mstDesc: mstDesc[index] }));
                 setRaiseRequerimentList(combinedData);
                 setRaiseRequirementOpen(true);
         setRequirementLoader(true);
        
         setRequirementLoader(false);
               }else{
                 mstDesc = element.tagValue;
                 let masterDesc = props.interlRequirementTagValue.find(x => x.mstID == mstDesc).mstDesc
                 let masterID = props.interlRequirementTagValue.find(x => x.mstID == mstDesc).mstID
                 setRaiseRequerimentList(masterID+masterDesc);
                 setRaiseRequirementOpen(true);
         setRequirementLoader(true);
        
         setRequirementLoader(false);
               }
              
           };
         });
         

        
      
      }

    const uploadURL = import.meta.env.VITE_APP_API_URL2 + "InsertBlob";
    const uploadProps = {
        name: "file",
        multiple: false,
        fileList: [],
        customRequest: ({ file, onSuccess, index, item }, label) => {
            let formData = new FormData();
            setIsLoader(true);
            const ApplicationNo = props?.policyDetails
            formData.append("File", file, ApplicationNo + '/' + file.name);
            let response = apiCalls.fileUpload(formData);
            response
                .then((val) => {
                    if (val?.data) {

                        let newDocumentObj = {
                            "IndexName": props.POSContactData.srvReqRefNo + '-'+ props.customerData.subTypeName || "Address Proof",
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

    const handleUpload = (file) => {
    }
    const getUploadVal = (item) => {
        const prevUploadFile = props?.form?.getFieldsValue();
        return prevUploadFile ? prevUploadFile[item.name]?.file?.name : '';
    }
    
    const handleSave = () => {
        const values = props?.form?.getFieldsValue();
        isUploadMultipleFiles.forEach((item)=>{
            item.FileLocation="/"+props?.policyDetails+"/"
        })
        let obj = {
            TransectionId: 1,
            SrvReqRefNo: props?.customerData?.serialNo,
            Status: "REOPEN",
            RequirementList: [],
            UsrID: loginInfo?.userProfileInfo?.profileObj?.userName,
            RoleID: loginInfo?.userProfileInfo?.profileObj?.role,
            Comments: values?.Comments,
            Uploads: isUploadMultipleFiles,
            TransactionPayload: [
                {
                    "Status": "Create",
                    "TagName": "RequestorComments",
                    "TagValue": values?.Comments || values?.RequestorComments || ""
                }
            ],
        };
     
        setIsLoading(true);
        let response = apiCalls.POSActionsOnContactDetails(obj);
        response
            .then((val) => {
                if (val?.data) {
                    setAlertTitle(`${val?.data?.message}`);
                    setNavigateTo("/boedashboard");
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
    const handleRemove = (file) => {    
        let updatedFiles = isUploadMultipleFiles?.filter((ele)=>{
                   return ele?.name !== file.name
        });
        setIsMultipleFiles(updatedFiles)
        // form.setFieldsValue({
        //   addressProof: `Documents Uploaded -  ${updatedFiles.length }`,
        // })
    
    
      };

    return (
        <Spin spinning={isLoading} >
            <Row gutter={[16, 16]} className="reasons-list">
                {props?.data?.map((item, index) => (
                    <React.Fragment key={index}>
                        {item.inputType === "textarea" && (
                            <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                                <Form.Item
                                    label={item.label}
                                    name={item.name}
                                >
                                    <Input.TextArea
                                        placeholder={item.placeholder}
                                        maxLength={item.maxlength}
                                        disabled={item.disabled}
                                    />
                                </Form.Item>

                            </Col>
                        )}
                        {item.inputType === "text" && (
                            <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                                <Form.Item
                                    label={item.label}
                                    name={item.name}
                                >
                                    <Input
                                        placeholder={item.placeholder}
                                        maxLength={item.maxlength}
                                        disabled={item.disabled}
                                    />
                                </Form.Item>

                            </Col>
                        )}
                        {item.inputType === "upload" && (
                            <Col xs={24} sm={24} md={12} lg={12} xxl={12} key={index}>
                                <Form.Item
                                    label={
                                        <span>
                                            {item.label}
                                        </span>
                                    }
                                    name={item.name}
                                    className="inputs-label mb-0"
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
                                        <Spin spinning={isLoader} >
                                            {isUploadMultipleFiles?.map((file, index) => (
                                                <li key={index} style={{ marginTop: "20px", marginBottom: "20px" }}>
                                                    <span>{file.DocumentName}</span>
                                                    <span style={{ fontSize: "20px", cursor: "pointer", marginLeft: "10px" }} onClick={()=>handleRemove(file)} ><DeleteOutlined /></span>
                                                </li>
                                            ))}
                                            </Spin>
                                        </ul>

                                </Form.Item>
                            </Col>
                        )}
                         {item.inputType === "button" && (
                            <Col xs={12} sm={12} md={12} lg={12} xxl={12}>
                                <Form.Item
                                    label={item.label}
                                    name={item.name}
                                >
                                     <a id="pay-premium"  onClick={setInternalRequirementData} >
                      <i className="bi bi-file-text"></i>
                      </a>
                                </Form.Item>

                            </Col>
                        )}
                    </React.Fragment>
                ))}
                <Col xs={24}>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Button
                        type="primary"
                        className="primary-btn"
                        htmlType="submit"
                        onClick={handleSave}
                    >
                        Submit
                    </Button>
                </div>
                </Col>
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
                
                <Modal
        title=" Internal Requirements"
        open={raiseRequirementOpen}
        destroyOnClose={true}
        width={1200}
        closeIcon={false}
        footer={null}
      >
        <Spin spinning={requirementModalLoader}>
          <div  >
            <Form>
              <div className="reuirement">

              
              <table className="responsive-table">
                <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Description</th>
                </tr></thead>
                <tbody>
                  {raiseRequerimentList?.map((item, ind) => (
                    <tr key={ind + 1}>
                      <td>{ind + 1}</td>

                      <td>{requirementDescription(item)}</td>
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
                  onClick={() => setRaiseRequirementOpen(false)}
                >
                  Close
                </Button>
              </div>
            </Form>
          </div>

          
        </Spin>
      </Modal>

            </Row>
        </Spin>
    );
};

export default InternalFlow;