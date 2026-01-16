import React, { useState, useEffect } from "react";
import TabComponent from "../../utils/TabComponent";
import { Form, Input, Button, Radio, Tooltip, Upload, DatePicker, message } from "antd";
import UploadIcon from "../../assets/images/upload.png";
import moment from 'moment';
import apiCalls from "../../api/apiCalls";
import { useSelector } from 'react-redux';
import PopupAlert from "../popupAlert";
import { useNavigate,useLocation  } from 'react-router-dom';




const RevivalWithDGH = (props) => {
    const [form] = Form.useForm();
    const [isUploadMultipleFiles, setIsMultipleFiles] = useState([]);
    const dateFormat = "DD/MM/YYYY";
    const { state } = useLocation();
    const location = useLocation();
    const loginInfo = useSelector(state => state);

    console.log("staee",state,location.pathname.includes("/revivalwithDGH"))


    const documentList = [
        { value: "uploadcustomerphoto", label: "Upload Customer Photo", inputType: "upload", required: false, validationmsg: "", placeholder: "Upload Customer Photo" },
        { value: "policyownerIDproof", label: "Policy owner ID proof", inputType: "upload", required: false, validationmsg: "", placeholder: "Policy owner ID proof" },
        { value: "policyowneraddressproof", label: "Policy owner Address proof", inputType: "upload", required: false, validationmsg: "", placeholder: "Policy owner Address proof" },
        { value: "hospitaldoctorsreport", label: "Hospital/ Doctor's report", inputType: "upload", required: false, validationmsg: "", placeholder: "Hospital/ Doctor's report" },
        { value: "otherquestionnaires", label: "Other questionnaires", inputType: "upload", required: false, validationmsg: "", placeholder: "Other questionnaires" },
    ]

    const [uploadFiles, setUploadFiles] = useState([]);
    const [showUploadFile, setShowUploadFile] = useState(null);
    const policyDetails = useSelector(state => state?.policyDetails);
    const [serviceRequestId, setServiceRequestId] = useState(null);
    const [alertTitle, setAlertTitle] = useState("");
    const [alertData, setAlertData] = useState("");
    const [navigateTo, setNavigateTo] = useState("");
    const [showAlert, setShowAlert] = useState(false);




    const uploadURL = import.meta.env.VITE_APP_API_URL2 + "InsertBlob";
    const suffix = <img src={UploadIcon} alt="" />;
    const [isweightButton, setIsWeightButton] = useState(false);
    const [isSufferedFromButton, setIsSufferedFromButton] = useState(false);
    const [isalcoholicButton, setIsAlcoholicButton] = useState(false);
    const [issmokeButton, setIsSmokeButton] = useState(false);
    const [isNarcoticsButton, setIsNarcoticsButton] = useState(false);
    const [isRelevantQuestionButton, setIsRelevantQuestionButton] =
        useState(false);
    const [stepOneData, SetStepOneData] = useState({});
    const [stepTwoData, SetStepTwoData] = useState({});
    const [tableData, setTableData] = useState([]);
    const [isTravelAbroadButton, setIsTravelAbroadButton] = useState(false);
    const [isProposalforinsuranceButton, setIsProposalforinsuranceButton] =
        useState(false);
    const [ispoliticallyExposedButton, setIspoliticallyExposedButton] =
        useState(false);
    const [isCovidinfectionButton, setIsCovidinfectionButton] =
        useState(false);
    const [isIntensiveCareUnitButton, setIsIntensiveCareUnitButton] =
        useState(false);
    const [isProlongedcomplicationsButton, setIsProlongedcomplicationsButton] =
        useState(false);
    const [isLoading, setIsLoading] =
        useState(false);
    const [clientdetails,setClientDetails]=useState([]);


    const [conditions, setConditions] = useState([
        { label: "Hypertension / High Blood Pressure", value: "HighBloodPressure", checked: '' },
        { label: "Chest Pain", value: "ChestPain", checked: '' },
        { label: "Any Other Heart Diseases/Problems ", value: "AnyOtherHeartProblems", checked: '' },
        { label: "HIV Infection / AIDS", value: "HIVInfectionAIDS", checked: '' },
        { label: "Diabetes / High Blood Sugar", value: "DiabetesHighBloodSugar", checked: '' },
        { label: "High Cholesterol", value: "HighCholesterol", checked: '' },
        { label: "Anxiety Disorders Stress", value: "AnxietyDisordersStress", checked: '' },
        { label: "Disease of Reproductive Organs", value: "DiseaseofReproductiveOrganss", checked: '' },
        { label: "Kidney / Renal Problems", value: "KidneyRenalProblems", checked: '' },
        { label: "Stroke / Paralysis", value: "StrokeParalysis", checked: '' },
        { label: "Disorder of Any Glands (e.g. Thyroid)", value: "DisorderofAnyGlands", checked: '' },
        { label: "Musculoskeletal or Joint Disorders", value: "Musculoskeletal", checked: '' },
        { label: "Digestive Disorders (e.g. ulcer, colitis)", value: "DigestiveDisorders", checked: '' },
        { label: "Skin Disorders", value: "SkinDisorders", checked: '' },
        { label: "Ailment / Injury", value: "AilmentInjury", checked: '' },
        { label: "Eyes / Ear / Nose / Throat disorders", value: "Throatdisorders", checked: '' },
        { label: "Cyst of Any Kind / Tumour Growth/Cancer", value: "CystofAnyKind", checked: '' },
        { label: "Skin Disorders", value: "SkinDisorders", checked: '' },
        { label: "Asthma / Tuberculosis or any other lung disorder", value: "anyotherlungdisorder", checked: '' },
        { label: "Jaundice / Hepatitis B or C or Other Liver Problems", value: "OtherLiverProblems", checked: '' },
        { label: "Any Blood Disorder (e.g. Anemia / Thalassemia)", value: "AnyBloodDisorder", checked: '' },
    ])

    const [selectedValues, setSelectedValues] = useState({});


    const tableHeader = [
        { title: "Illness, Injury, or Tests", field: "test" },
        { title: "Date Commenced", field: "date" },
        { title: "Type of Treatment", field: "treatment" },
        { title: "Duration of Illness/ Injury", field: "injury" },
        { title: "Date of Last Symptoms", field: "lastofsymptoms" },
        { title: "Current Condition", field: "currentcondition" },
        {
            title: "Full Name and Address of Doctor or Hospital (if any)",
            field: "nameofthedoctor",
        },
    ];
    const tabs = [
        { title: "Insured Identification", key: "1" },
        { title: "Health Record of Life Assured", key: "2" },
        { title: "General Questions", key: "3" },
        { title: "Life Style", key: "4" },
        { title: "For Female Life Assured Only", key: "5" },
        { title: "Covid Questions", key: "6" },
        { title: "Documents List", key: "7" },
    ];
    const [activeTab, setActiveTab] = useState(tabs[0].key);
    const [HastheLAever, setHastheLAever] = useState('');

    const handleTabChange = (key) => {
        setActiveTab(key);
    };
    const getClientEnquiry = ()=>{
        setIsLoading(true);
            let obj = {
              clientNumber:location?.pathname?.includes("/revivalwithDGH")?state[0]?.poClientID:props?.customerData?.poClientID
        };
        let response = apiCalls.getClientEnquiry(obj,loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID);
        response
          .then((val) => {
            if (val?.data) { 
                form.setFieldsValue({
                    gender: val?.data?.responseBody?.cltsex,
                    occupation: val?.data?.responseBody?.occpcode,
                    maritalstatus: val?.data?.responseBody?.marryd,
                    nationality: val?.data?.responseBody?.natlty
                })
            //   setClientDetails(val?.data?.responseBody)
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

    useEffect(() => {
        getClientEnquiry()
        form.setFieldsValue({
            nameofthelifeassured: location.pathname.includes("/revivalwithDGH")?state[0]?.laName: props?.customerData?.laName,
            mobileno:location.pathname.includes("/revivalwithDGH")?state[0]?.mobileNo?.trim(): props?.customerData?.mobileNo?.trim(),
            email:location.pathname.includes("/revivalwithDGH")?state[0]?.emailID?.trim(): props?.customerData?.emailID,
            // gender: clientdetails?.cltsex,
            // occupation: clientdetails?.occpcode,
            // maritalstatus: clientdetails?.marryd,
            // nationality: clientdetails?.natlty
        })
    }, [props])

    const handleDatesChange = () => {

    }


    const handleRadioChange = (e, name) => {
        switch (name) {
            case "bodyweightchanged":
                setIsWeightButton(e.target.value === "yes");
                break;
            case "Hasalcoholicdrink":
                setIsAlcoholicButton(e.target.value === "yes");
                break;
            case "travelAbroad":
                setIsTravelAbroadButton(e.target.value === "yes");
                break;
            case "Proposalforinsurance":
                setIsProposalforinsuranceButton(e.target.value === "yes");
                break;
            case "Hassmoke":
                setIsSmokeButton(e.target.value === "yes");
                break;
            case "politicallyexposed":
                setIspoliticallyExposedButton(e.target.value === "yes");
                break;
            case "Hasnarcotics":
                setIsNarcoticsButton(e.target.value === "yes");
                break;
            case "HasRelevantQuestion":
                setIsRelevantQuestionButton(e.target.value === "yes");
                break;
            case "HasCovidinfection":
                setIsCovidinfectionButton(e.target.value === "yes");
                break;
            case "HasIntensiveCareUnit":
                setIsIntensiveCareUnitButton(e.target.value === "yes");
                break;
            case "HasProlongedComplications":
                setIsProlongedcomplicationsButton(e.target.value === "yes");
                break;
            default:
                setIsWeightButton(false);
                setIsSufferedFromButton(false);
                setIsAlcoholicButton(false);
                setIsSmokeButton(false);
                setIsNarcoticsButton(false);
                setIsRelevantQuestionButton(false);
                setIsTravelAbroadButton(false);
                setIsProposalforinsuranceButton(false);
                setIsTravelAbroadButton(false);
                break;
        }
    };

    const customHeader = (
        <>
            <div class="flex-container">
                <span className="headingg gridd flexxx p-0">
                    Policy No : 00111195
                    <Tooltip title="NPS Score">
                        <span className="square">5</span>
                    </Tooltip>
                </span>
                <span className="headingg gridd p-0">Application No : 2711202318</span>
                <span className="headingg gridd flexxx p-0">LA Name : sridhar</span>
                <span className="headingg gridd flexxx p-0"> PO Name : Deva</span>
            </div>
        </>
    );
    const handleStepOne = () => {
        const formData = form.getFieldValue();
        SetStepOneData(formData);
        setActiveTab("2");
    };
    const handleStepTwo = () => {
        const formData = form.getFieldValue();
        setActiveTab("3");
        SetStepTwoData(formData);
    };


    const handleRadioTable = (e, value, index) => {

        setHastheLAever(e.target.value); // Update the state for the top radio group

        if (e.target.value === 'no') {
            // Set all conditions to 'no'
            const updatedConditions = conditions.map(condition => ({
                ...condition,
                checked: 'no',
            }));
            setConditions(updatedConditions);
            const tableData = updatedConditions.map(condition => ({
                test: condition.label,
                date: "", // Assuming date is empty initially
                treatment: "", // Assuming treatment is empty initially
                injury: "", // Assuming injury is empty initially
                lastofsymptoms: "", // Assuming lastofsymptoms is empty initially
                currentcondition: "", // Assuming currentcondition is empty initially
                nameofthedoctor: "", // Assuming nameofthedoctor is empty initially
            }));
            setTableData(tableData);
        } else {
            // Reset all conditions to initial state
            const updatedConditions = conditions.map(condition => ({
                ...condition,
                checked: '',
            }));
            setConditions(updatedConditions);

        }
    };

    const handleRadioBtns = (e, index) => {
        const updatedConditions = [...conditions];
        updatedConditions[index].checked = e.target.value;
        setConditions(updatedConditions);
    }







    const handleInputChange = (e, rowIndex, fieldName) => {
        const newData = [...tableData];
        newData[rowIndex][fieldName] = e.target.value;
        setTableData(newData);
    };
    const handleDateChange = (date, dateString, rowIndex, fieldName) => {
        const newData = [...tableData];
        newData[rowIndex][fieldName] = dateString;
        setTableData(newData);
    };


    const convertDate = (inputDate) => {
        const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
        return formattedDate;
    };
    const handleSubmit = () => {
        const formData = form.getFieldValue();
        const duedateofdelivery = formData.duedateofdelivery ? formData.duedateofdelivery.format('YYYY-MM-DD') : '';
        const lastdelivery = formData.lastdelivery ? formData.lastdelivery.format('YYYY-MM-DD') : '';
        const dischargedate = formData.dischargedate ? formData.dischargedate.format('YYYY-MM-DD') : '';
        const dateofadmission = formData.dateofadmission ? formData.dateofadmission.format('YYYY-MM-DD') : '';
        let obj = {
            CallType: 4,
            SubType: 1,
            Category: 2,
            RequestSource: 1,
            RequestChannel: 3,
            ApplicationNo: props?.customerData?.applicationNo,
            PolicyNo: props?.policyNo,
            CustomerId: "50079867",
            CustRole: 1,
            proposerName: props?.customerData?.poNam,
            policyStatus: props?.customerData?.policyStatus,
            plan: props?.customerData?.plan,
            DOB: convertDate(props?.customerData?.dob),
            CreatedOn: new Date(),
            CreatedByRef: "BOE Admin",
            ModifiedOn: new Date(),
            ModifiedByRef: "Test123",
            AssignedToRole: "",
            AssignedByUser: 0,
            ReasonForChange: "",
            RequestDateTime: "",
            CustSignDateTime: new Date(),
            CurrentStatus: "",
            RequestDateTime: new Date(),
            Uploads: uploadFiles || [],
            "TransactionData": [
                {
                    "Status": "Create",
                    "TagName": "lifeAssuredName",
                    "TagValue": location?.pathname?.includes("/revivalwithDGH")?state[0]?.laName: props?.customerData?.laName,
                },
                {
                    "Status": "Create",
                    "TagName": "gender",
                    "TagValue": formData.gender
                },
                {
                    "Status": "Create",
                    "TagName": "maritalstatus",
                    "TagValue": formData.maritalstatus
                },
                {
                    "Status": "Create",
                    "TagName": "occupation",
                    "TagValue": formData.occupation
                },
                {
                    "Status": "Create",
                    "TagName": "natureofduties",
                    "TagValue": formData.natureofduties
                },
                {
                    "Status": "Create",
                    "TagName": "countryofresidence",
                    "TagValue": formData.countryofresidence
                },
                {
                    "Status": "Create",
                    "TagName": "nationality",
                    "TagValue": formData.nationality
                },
                {
                    "Status": "Create",
                    "TagName": "mobileno",
                    "TagValue": formData.mobileno
                },
                {
                    "Status": "Create",
                    "TagName": "email",
                    "TagValue": formData.email
                },
                {
                    "Status": "Create",
                    "TagName": "height",
                    "TagValue": formData.height
                },
                {
                    "Status": "Create",
                    "TagName": "weight",
                    "TagValue": formData.weight
                },
                {
                    "Status": "Create",
                    "TagName": "stateCauseofachangeinweight",
                    "TagValue": formData.stateCauseofachangeinweight
                },
                {
                    "Status": "Create",
                    "TagName": "travelAbroad",
                    "TagValue": formData.travelAbroad
                },
                {
                    "Status": "Create",
                    "TagName": "travelAbroad",
                    "TagValue": formData.travelAbroad
                },
                {
                    "Status": "Create",
                    "TagName": "proposalforinsurance",
                    "TagValue": formData.proposalforinsurance
                },
                {
                    "Status": "Create",
                    "TagName": "politicallyExposed",
                    "TagValue": formData.politicallyExposed
                },
                {
                    "Status": "Create",
                    "TagName": "Hardliquor",
                    "TagValue": formData.Hardliquor
                },
                {
                    "Status": "Create",
                    "TagName": "Wine",
                    "TagValue": formData.Wine
                },
                {
                    "Status": "Create",
                    "TagName": "beer",
                    "TagValue": formData.beer
                },
                {
                    "Status": "Create",
                    "TagName": "cigarettes",
                    "TagValue": formData.cigarettes
                },
                {
                    "Status": "Create",
                    "TagName": "tobacco",
                    "TagValue": formData.tobacco

                },
                {
                    "Status": "Create",
                    "TagName": "consumenarcotics",
                    "TagValue": formData.consumenarcotics

                },
                {
                    "Status": "Create",
                    "TagName": "duedateofdelivery",
                    "TagValue": duedateofdelivery
                },
                {
                    "Status": "Create",
                    "TagName": "lastdelivery",
                    "TagValue": lastdelivery
                },
                {
                    "Status": "Create",
                    "TagName": "dischargedate",
                    "TagValue": dischargedate
                },
                {
                    "Status": "Create",
                    "TagName": "dateofadmission",
                    "TagValue": dateofadmission
                },
                {
                    "Status": "Create",
                    "TagName": "intensivecareunit",
                    "TagValue": formData.intensivecareunit
                },
                {
                    "Status": "Create",
                    "TagName": "prolongedcomplications",
                    "TagValue": formData.prolongedcomplications
                },

            ]
        }
        if (tableData?.length > 0) {
            obj.TransactionData.push({
                "Status": "Create",
                "TagName": "LAeversufferedCheckbox",
                "TagValue": JSON.stringify(tableData)
            });
        }

        let response = apiCalls.genericAPI(obj);
        response
            .then((val) => {
                if (val?.data) {
                    setServiceRequestId(val?.data?.srvReqRefNo);
                    setAlertTitle("Request Created Successfully");
                    let successMessage = val?.data?.tat > 0 ?
                        `Ticket ID Number ${val?.data?.srvReqRefNo}. Your request will be processed in ${val?.data?.tat || 0} days`
                        : `Ticket ID Number ${val?.data?.srvReqRefNo}.`;
                    setAlertData(successMessage);
                  // // setNavigateTo("/advancesearch");
                  // if(!props?.EmailResponse?.IsEmailmanagent){
                  //  setNavigateTo("/advancesearch");
                  //}
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
                // setIsLoader(false);
            })
            .catch((err) => {
                // setIsLoader(false);
            });


    }
    const handleUpload = (file) => {
    }
    const getUploadVal = (item) => {
        const prevUploadFile = form?.getFieldsValue();
        return prevUploadFile ? prevUploadFile[item.name]?.file?.name : '';
    }

    const getUploadFiles = (listOfUploadFiles) => {
        // const updatedUploadList = listOfUploadFiles?.map((obj) => {
        //     // Create a new object without the propertyToDelete property
        //     const { labelName, ...newObject } = obj;
        //     return newObject;
        // });
        // Update the state with the new list
        setUploadFiles(listOfUploadFiles);
    };


    const uploadProps = {
        name: "file",
        multiple: true,
        fileList: [],
        customRequest: ({ file, onSuccess, index, item }) => {
            let formData = new FormData();
            setShowUploadFile(index);
            setUploadFiles(file);
            const ApplicationNo = policyDetails?.policyDetailsObj?.identifiers?.applicationNo
            formData.append("File", file, ApplicationNo + '/' + file.name);
            let response = apiCalls.fileUpload(formData);
            response
                .then((val) => {
                    if (val?.data) {
                        let newDocumentObj = {
                            "IndexName": item.indexName,
                            "DocumentName": file?.name,
                            "UserID": "1234",
                            "UploadedBy": "Krishna",
                            "UploadedOn": new Date(),
                            "DocumentSize": file?.size,
                            // "FileLocation": val?.data,
                            "FileLocation": `/${policyDetails?.policyDetailsObj?.identifiers?.applicationN}/`,
                            "BlobFileName": file?.name,
                            "FileExtnMime": file?.type,
                            "labelName": item?.label
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

                                // Send the updated files to props?.getUploadFiles
                                // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
                                getUploadFiles(updatedUploadFiles);
                            } else {
                                // If doesn't exist, add the new file object to the list
                                setIsMultipleFiles((prevFiles) => [...prevFiles, newDocumentObj]);

                                // Send the updated files to props?.getUploadFiles
                                // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
                                getUploadFiles([...isUploadMultipleFiles, newDocumentObj]);
                            }
                        } else {
                            // If labelName is not present or the array is empty, add the new file object to the list
                            setIsMultipleFiles((prevFiles) => [...prevFiles, newDocumentObj]);

                            // Send the updated files to props?.getUploadFiles
                            // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
                            getUploadFiles([...isUploadMultipleFiles, newDocumentObj]);
                        }

                        //props?.getUploadFiles(documnetsObj);
                        setShowUploadFile(index);
                        setUploadFiles(file);
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

    console.log("uploads",uploadFiles)

    return (
        <div className="main-start-revivaldgh">
           {location?.pathname?.includes("/revivalwithDGH") && <div className="pt-3 pb-3 px-3">{customHeader}</div>} 
            
            <div className="row">
                <div className="col-md-3 mt-3">
                    <TabComponent
                        tabs={tabs}
                        activeTab={activeTab}
                        handleTabChange={handleTabChange}
                        tabPosition="left"
                    />
                </div>
                {activeTab === "1" && (
                    <div className="col-md-9 mt-3">
                        <Form
                            form={form}
                            // onFinish={handleStepOne}
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                            }}
                        >
                            <div style={{ width: "50%" }}>
                                <Form.Item
                                    label={<span>Name of the Life Assured</span>}
                                    wrapperCol={{ span: 14 }}
                                    labelCol={{ span: 10 }}
                                    name="nameofthelifeassured"
                                >
                                    <Input
                                        type="text"
                                        placeholder="Name of the Life Assured"
                                        name="nameofthelifeassured"
                                        disabled
                                    />
                                </Form.Item>
                            </div>
                            <div style={{ width: "50%" }}>
                                <Form.Item
                                    label={<span>Gender</span>}
                                    name="gender"
                                    wrapperCol={{ span: 14 }}
                                    labelCol={{ span: 10 }}
                                >
                                    <Input type="text" placeholder="Gender" name="gender" />
                                </Form.Item>
                            </div>
                            <div style={{ width: "50%" }}>
                                <Form.Item
                                    label={<span>Marital Status</span>}
                                    wrapperCol={{ span: 14 }}
                                    labelCol={{ span: 10 }}
                                    name="maritalstatus"
                                >
                                    <Input
                                        type="text"
                                        placeholder="Marital Status"
                                        name="maritalstatus"
                                    />
                                </Form.Item>
                            </div>
                            <div style={{ width: "50%" }}>
                                <Form.Item
                                    label={<span>Occupation</span>}
                                    name="occupation"
                                    wrapperCol={{ span: 14 }}
                                    labelCol={{ span: 10 }}
                                >
                                    <Input
                                        type="text"
                                        placeholder="Occupation"
                                        name="occupation"
                                    />
                                </Form.Item>
                            </div>
                            <div style={{ width: "50%" }}>
                                <Form.Item
                                    label={<span>Name of Employer / Business Owned</span>}
                                    wrapperCol={{ span: 14 }}
                                    labelCol={{ span: 10 }}
                                    name="nameoftheemployee"
                                >
                                    <Input
                                        type="text"
                                        placeholder="Name of Employer / Business Owned"
                                        name="nameoftheemployee"
                                    />
                                </Form.Item>
                            </div>
                            <div style={{ width: "50%" }}>
                                <Form.Item
                                    label={<span>Annual Income</span>}
                                    name="annualincome"
                                    wrapperCol={{ span: 14 }}
                                    labelCol={{ span: 10 }}
                                >
                                    <Input
                                        type="text"
                                        name="annualincome"
                                        placeholder=" Annual Income"
                                    />
                                </Form.Item>
                            </div>
                            <div style={{ width: "50%" }}>
                                <Form.Item
                                    label={<span>Nature of Duties</span>}
                                    wrapperCol={{ span: 14 }}
                                    labelCol={{ span: 10 }}
                                    name="natureofduties"
                                >
                                    <Input
                                        type="text"
                                        placeholder="Nature of Duties"
                                        name="natureofduties"
                                    />
                                </Form.Item>
                            </div>
                            <div style={{ width: "50%" }}>
                                <Form.Item
                                    label={<span>Nationality</span>}
                                    name="nationality"
                                    wrapperCol={{ span: 14 }}
                                    labelCol={{ span: 10 }}
                                >
                                    <Input
                                        type="text"
                                        placeholder="Nationality"
                                        name="nationality"
                                    />
                                </Form.Item>
                            </div>
                            <div style={{ width: "50%" }}>
                                <Form.Item
                                    label={
                                        <span>If Not Indian, State the Country of Residence</span>
                                    }
                                    wrapperCol={{ span: 14 }}
                                    labelCol={{ span: 10 }}
                                    name="countryofresidence"
                                >
                                    <Input
                                        type="text"
                                        name="countryofresidence"
                                        placeholder="If Not Indian, State the Country of Residence"
                                    />
                                </Form.Item>
                            </div>
                            <div style={{ width: "50%" }}>
                                <Form.Item
                                    label={<span>Mobile No</span>}
                                    name="mobileno"
                                    wrapperCol={{ span: 14 }}
                                    labelCol={{ span: 10 }}
                                >
                                    <Input type="text" placeholder="Mobile No" name="mobileno" />
                                </Form.Item>
                            </div>
                            <div style={{ width: "50%" }}>
                                <Form.Item
                                    label={<span>Email</span>}
                                    name="email"
                                    wrapperCol={{ span: 14 }}
                                    labelCol={{ span: 10 }}
                                >
                                    <Input type="text" placeholder="email" name="email" />
                                </Form.Item>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    type="primary"
                                    className="primary-btn mt-4 me-3"
                                    htmlType="submit"
                                    onClick={handleStepOne}
                                >
                                    Next
                                </Button>
                            </div>
                        </Form>
                    </div>
                )}
                {activeTab === "2" && (
                    <div className="col-md-9 mt-3">
                        <Form
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                            }}
                            form={form}
                        // onFinish={handleStepTwo}
                        >
                            <div style={{ width: "50%" }}>
                                <Form.Item
                                    label={<span>Height</span>}
                                    name="height"
                                    wrapperCol={{ span: 14 }}
                                    labelCol={{ span: 10 }}
                                >
                                    <Input type="text" placeholder="Height" />
                                </Form.Item>
                            </div>
                            <div style={{ width: "50%" }}>
                                <Form.Item
                                    label={<span>Weight</span>}
                                    wrapperCol={{ span: 14 }}
                                    labelCol={{ span: 10 }}
                                    name="weight"
                                >
                                    <Input type="text" placeholder="Weight" />
                                </Form.Item>
                            </div>
                            <div style={{ width: "100%" }}>
                                <Form.Item
                                    label="In the past 6 months, has the LA's body weight changed by more than 5 Kg?"
                                    name="bodyweightchanged"
                                    wrapperCol={{ span: 10 }}
                                    labelCol={{ span: 14 }}
                                >
                                    <Radio.Group
                                        onChange={(e) => handleRadioChange(e, "bodyweightchanged")}
                                    >
                                        <Radio value="yes">Yes</Radio>
                                        <Radio value="no">No</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </div>
                            {isweightButton && (
                                <div style={{ width: "100%" }}>
                                    <Form.Item
                                        label={
                                            <span>
                                                If 'Yes', please state cause of a change in weight
                                            </span>
                                        }
                                        wrapperCol={{ span: 10 }}
                                        labelCol={{ span: 14 }}
                                        name="stateCauseofachangeinweight"
                                    >
                                        <Input type="text" placeholder="" />
                                    </Form.Item>
                                </div>
                            )}

                            <div>
                                <Form.Item
                                    label="Has the LA ever suffered from or have been diagnosed with any of the following conditions?"
                                    wrapperCol={{ span: 10 }}
                                    labelCol={{ span: 14 }}
                                >
                                    <Radio.Group
                                        onChange={(e) => handleRadioTable(e, "HastheLAeversufferedfrom")}
                                        defaultValue={HastheLAever}
                                    >
                                        <Radio value="yes">Yes</Radio>
                                        <Radio value="no">No</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <div style={{ display: "flex", flexWrap: "wrap" }}>
                                    {conditions.map((condition, index) => (
                                        <div key={index} style={{ width: "30%" }}>
                                            <Form.Item
                                                label={condition.label}
                                                wrapperCol={{ span: 14 }}
                                                labelCol={{ span: 10 }}
                                            >
                                                <Radio.Group
                                                    onChange={(e) => handleRadioBtns(e, index)}

                                                    value={condition.checked}

                                                >
                                                    <Radio value="yes">Yes</Radio>
                                                    <Radio value="no">No</Radio>
                                                </Radio.Group>
                                            </Form.Item>
                                        </div>
                                    ))}
                                </div>
                                <div className="table-container email-table ">
                                    <table className="responsive-table"
                                        style={{ border: "1px solid #ddd" }}>
                                        <thead>
                                            <tr>
                                                {tableHeader.map((header, index) => (
                                                    <th key={index}>{header.title}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableData.map((rowData, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    {tableHeader.map((header, colIndex) => (
                                                        <td key={colIndex}>
                                                            {header.field === "date" ? (
                                                                <DatePicker
                                                                    style={{ width: "100%" }}
                                                                    className="cust-input"
                                                                    format={dateFormat}
                                                                    onChange={(e) => handleDatesChange()}
                                                                />
                                                            ) : (
                                                                <input
                                                                    type="text"
                                                                    value={rowData[header.field]}
                                                                    onChange={(e) => handleInputChange(e, rowIndex, header.field)}
                                                                />
                                                            )}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>



                            <div
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    type="primary"
                                    className="primary-btn mt-4 me-3"
                                    onClick={() => setActiveTab("1")}
                                >
                                    Previous
                                </Button>
                                <Button
                                    type="primary"
                                    className="primary-btn mt-4 me-3"
                                    htmlType="submit"
                                    onClick={handleStepTwo}
                                >
                                    Next
                                </Button>
                            </div>
                        </Form>
                    </div>
                )}
                {activeTab === "3" && (
                    <div className="col-md-9 mt-3">
                        <Form
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                            }}
                            form={form}
                        >
                            <div style={{ width: "100%" }}>
                                <Form.Item
                                    label="LA has intention to travel abroad"
                                    wrapperCol={{ span: 14 }}
                                    labelCol={{ span: 10 }}
                                >
                                    <Radio.Group
                                        onChange={(e) => handleRadioChange(e, "travelAbroad")}
                                    // value={isTravelAbroadButton ? "yes" : "no"}
                                    >
                                        <Radio value="yes">Yes</Radio>
                                        <Radio value="no">No</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                {isTravelAbroadButton && (
                                    <div style={{ width: "100%" }}>
                                        <Form.Item
                                            label={<span>If 'Yes', please the travel abroad</span>}
                                            wrapperCol={{ span: 14 }}
                                            labelCol={{ span: 10 }}
                                            name="travelAbroad"
                                        >
                                            <Input type="text" placeholder="please enter the text" />
                                        </Form.Item>
                                    </div>
                                )}
                            </div>
                            <div style={{ width: "100%" }}>
                                <Form.Item
                                    label="Any proposal for insurance on LA life ever being declined / postponed / accepted with modified terms?"
                                    wrapperCol={{ span: 14 }}
                                    labelCol={{ span: 10 }}
                                >
                                    <Radio.Group
                                        onChange={(e) =>
                                            handleRadioChange(e, "Proposalforinsurance")
                                        }
                                    // value={isProposalforinsuranceButton ? "yes" : "no"}
                                    >
                                        <Radio value="yes">Yes</Radio>
                                        <Radio value="no">No</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                {isProposalforinsuranceButton && (
                                    <div style={{ width: "100%" }}>
                                        <Form.Item
                                            label={
                                                <span>If 'Yes', please provide the insurance</span>
                                            }
                                            wrapperCol={{ span: 14 }}
                                            labelCol={{ span: 10 }}
                                            name="proposalforinsurance"
                                        >
                                            <Input
                                                type="text"
                                                placeholder="please enter the text"
                                                name="proposalforinsurance"
                                            />
                                        </Form.Item>
                                    </div>
                                )}
                            </div>
                            <div style={{ width: "100%" }}>
                                <Form.Item
                                    label="LA is a politically exposed person?"
                                    wrapperCol={{ span: 14 }}
                                    labelCol={{ span: 10 }}
                                >
                                    <Radio.Group onChange={(e) =>
                                        handleRadioChange(e, "politicallyexposed")
                                    }
                                    // value={ispoliticallyExposedButton ? "yes" : "no"}
                                    >

                                        <Radio value="yes">Yes</Radio>
                                        <Radio value="no">No</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                {ispoliticallyExposedButton && (
                                    <div style={{ width: "100%" }}>
                                        <Form.Item
                                            label={
                                                <span>If 'Yes', please provide the details</span>
                                            }
                                            wrapperCol={{ span: 14 }}
                                            labelCol={{ span: 10 }}
                                            name="politicallyExposed"
                                        >
                                            <Input
                                                type="text"
                                                placeholder="please enter the text"
                                                name="politicallyExposed"
                                            />
                                        </Form.Item>
                                    </div>
                                )}
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    type="primary"
                                    className="primary-btn mt-4 me-3"
                                    htmlType="submit"
                                    onClick={() => setActiveTab("2")}
                                >
                                    Previous
                                </Button>
                                <Button
                                    type="primary"
                                    className="primary-btn mt-4 me-3"
                                    htmlType="submit"
                                    onClick={() => setActiveTab("4")}
                                >
                                    Next
                                </Button>
                            </div>
                        </Form>
                    </div>
                )}
                {activeTab === "4" && (
                    <div className="col-md-9 mt-3">
                        <Form
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                            }}
                            form={form}
                        >
                            <div style={{ width: "100%" }}>
                                <Form.Item
                                    label="Does the LA consume any alcoholic drink. If yes, indicate quantity consumed (Glass/Peg) per week"
                                    wrapperCol={{ span: 10 }}
                                    labelCol={{ span: 14 }}
                                >
                                    <Radio.Group
                                        onChange={(e) => handleRadioChange(e, "Hasalcoholicdrink")}
                                    // value={isalcoholicButton ? "yes" : "no"}
                                    >
                                        <Radio value="yes">Yes</Radio>
                                        <Radio value="no">No</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </div>
                            {isalcoholicButton && (
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    width: "100%"
                                }}>
                                    <Form.Item
                                        label={<span>Beer</span>}
                                        name="beer"
                                        wrapperCol={{ span: 20 }}
                                        labelCol={{ span: 4 }}
                                    >
                                        <Input
                                            type="text"
                                            placeholder=" Glass/Peg"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label={<span>Wine</span>}
                                        name="Wine"
                                        wrapperCol={{ span: 20 }}
                                        labelCol={{ span: 4 }}
                                    >
                                        <Input
                                            type="text"
                                            placeholder="Glass/Peg"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label={<span>Hard Liquor</span>}
                                        name="Hardliquor"
                                        wrapperCol={{ span: 16 }}
                                        labelCol={{ span: 8 }}
                                    >
                                        <Input
                                            type="text"
                                            placeholder="Glass/Peg"
                                        />
                                    </Form.Item>
                                </div>
                            )}

                            <div style={{ width: "100%" }}>
                                <Form.Item
                                    label="Does the LA smoke cigarette or consume tobacco in any form? If yes, indicate quantity consumed per day"
                                    wrapperCol={{ span: 10 }}
                                    labelCol={{ span: 14 }}
                                >
                                    <Radio.Group
                                        onChange={(e) => handleRadioChange(e, "Hassmoke")}
                                    // value={issmokeButton ? "yes" : "no"}
                                    >
                                        <Radio value="yes">Yes</Radio>
                                        <Radio value="no">No</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </div>
                            {issmokeButton && (
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    width: "100%"
                                }}>
                                    <Form.Item
                                        label={<span>cigarettes</span>}
                                        name="cigarettes"
                                        wrapperCol={{ span: 16 }}
                                        labelCol={{ span: 8 }}
                                    >
                                        <Input
                                            type="text"
                                            placeholder="nos"
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label={<span>Tobacco</span>}
                                        name="tobacco"
                                        wrapperCol={{ span: 16 }}
                                        labelCol={{ span: 8 }}
                                    >
                                        <Input
                                            type="text"
                                            placeholder="mg"
                                        />
                                    </Form.Item>
                                </div>
                            )}

                            <div style={{ width: "100%" }}>
                                <Form.Item
                                    label="Does the LA  consume narcotics or any other drug not prescribed by a physician?"
                                    wrapperCol={{ span: 10 }}
                                    labelCol={{ span: 14 }}

                                >
                                    <Radio.Group
                                        onChange={(e) => handleRadioChange(e, "Hasnarcotics")}
                                    // value={isNarcoticsButton ? "yes" : "no"}
                                    >
                                        <Radio value="yes">Yes</Radio>
                                        <Radio value="no">No</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </div>
                            {isNarcoticsButton && (
                                <div style={{ width: "100%" }}>
                                    <Form.Item
                                        label={<span>If 'Yes', Name</span>}
                                        name="consumenarcotics"
                                        wrapperCol={{ span: 10 }}
                                        labelCol={{ span: 14 }}
                                    >
                                        <Input type="text" placeholder="Please enter the name" />
                                    </Form.Item>
                                </div>
                            )}

                            <div style={{ width: "100%" }}>
                                <Form.Item
                                    label="Does the LA engage or have you any prospect or intention of engaging in aviation other than as a passenger on a regular airline or any other hazardous occupation,sports, hobbies"
                                    wrapperCol={{ span: 10 }}
                                    labelCol={{ span: 14 }}
                                >
                                    <Radio.Group
                                        onChange={(e) =>
                                            handleRadioChange(e, "HasRelevantQuestion")
                                        }
                                    // value={isRelevantQuestionButton ? "yes" : "no"}
                                    >
                                        <Radio value="yes">Yes</Radio>
                                        <Radio value="no">No</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </div>
                            {isRelevantQuestionButton && (
                                <div style={{ width: "100%" }}>
                                    <Form.Item
                                        label={<span>If 'Yes', fill relevant questionnaire</span>}
                                        name="hobbiesQuestion"
                                        wrapperCol={{ span: 10 }}
                                        labelCol={{ span: 14 }}
                                    >
                                        <Input type="text" placeholder="Please enter the name" />
                                    </Form.Item>
                                </div>
                            )}

                            <div
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    type="primary"
                                    className="primary-btn mt-4 me-3"
                                    htmlType="submit"
                                    onClick={() => setActiveTab("3")}
                                >
                                    Previous
                                </Button>
                                <Button
                                    type="primary"
                                    className="primary-btn mt-4 me-3"
                                    htmlType="submit"
                                    onClick={() => setActiveTab("5")}
                                >
                                    Next
                                </Button>
                            </div>
                        </Form>
                    </div>
                )}
                {activeTab === "5" && (
                    <div className="col-md-9 mt-3">
                        <Form
                            form={form}
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                            }}
                        >
                            <div style={{ width: "100%" }}>
                                <Form.Item
                                    label={<span>Date of last delivery</span>}
                                    name="lastdelivery"
                                    className="inputs-label mb-0"
                                    wrapperCol={{ span: 14 }}
                                    labelCol={{ span: 10 }}
                                >
                                    <DatePicker
                                        //   allowClear={false}
                                        //    disabledDate={(e)=>disabledDate(e,item)}
                                        style={{ width: "100%" }}
                                        className="cust-input"
                                        format={dateFormat}
                                        //     handleDate={handleDate}
                                        //     checked={dateRangeChecked}
                                        onChange={(e) => handleDatesChange()}
                                    />
                                </Form.Item>
                            </div>
                            <div style={{ width: "100%" }}>
                                <div className="mt-4" style={{ width: "100%" }}>
                                    <Form.Item
                                        label={
                                            <span>
                                                If pregnant, enter approximation due date of delivery
                                            </span>
                                        }
                                        name="duedateofdelivery"
                                        className="inputs-label mb-0"
                                        wrapperCol={{ span: 14 }}
                                        labelCol={{ span: 10 }}
                                    >
                                        <DatePicker
                                            style={{ width: "100%" }}
                                            className="cust-input"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    type="primary"
                                    className="primary-btn mt-4 me-3"
                                    htmlType="submit"
                                    onClick={() => setActiveTab("4")}
                                >
                                    Previous
                                </Button>
                                <Button
                                    type="primary"
                                    className="primary-btn mt-4 me-3"
                                    htmlType="submit"
                                    onClick={() => setActiveTab("6")}
                                >
                                    Next
                                </Button>
                            </div>
                        </Form>
                    </div>
                )}
                {activeTab === "6" && (
                    <div className="col-md-9 mt-3">
                        <Form
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                            }}
                            form={form}
                        >
                            <div style={{ width: "100%" }}>
                                <Form.Item
                                    label="Was the LA ever hospitalised for Covid infection or its complications* or does the LA have any 
ongoing complications related to Covid Infection?"
                                    wrapperCol={{ span: 10 }}
                                    labelCol={{ span: 14 }}
                                >
                                    <Radio.Group onChange={(e) =>
                                        handleRadioChange(e, "HasCovidinfection")
                                    }
                                    // value={isCovidinfectionButton ? "yes" : "no"}
                                    >
                                        <Radio value="yes">Yes</Radio>
                                        <Radio value="no">No</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </div>
                            <div className="mb-3" style={{ width: "100%" }}>
                                {
                                    isCovidinfectionButton && <>
                                        <Form.Item
                                            label={
                                                <span>
                                                    If yes, Please mention the Date of admission
                                                </span>
                                            }
                                            name="dateofadmission"
                                            className="inputs-label mb-0"
                                            wrapperCol={{ span: 10 }}
                                            labelCol={{ span: 14 }}
                                        >
                                            <DatePicker
                                                style={{ width: "100%" }}
                                                className="cust-input"
                                                format={dateFormat}
                                                onChange={(e) => handleDatesChange()}
                                            />
                                        </Form.Item>
                                        <br />
                                        <Form.Item
                                            label={
                                                <span>
                                                    If yes, Please mention the Discharge date after recover
                                                </span>
                                            }
                                            name="dischargedate"
                                            className="inputs-label mb-0"
                                            wrapperCol={{ span: 10 }}
                                            labelCol={{ span: 14 }}
                                        >
                                            <DatePicker
                                                style={{ width: "100%" }}
                                                className="cust-input"
                                                format={dateFormat}
                                                onChange={(e) => handleDatesChange()}
                                            />
                                        </Form.Item>

                                    </>
                                }

                            </div>
                            <div style={{ width: "100%" }}>
                                <Form.Item
                                    label="Did the LA require ICU (Intensive Care Unit) admission and care?"
                                    wrapperCol={{ span: 10 }}
                                    labelCol={{ span: 14 }}
                                >
                                    <Radio.Group onChange={(e) =>
                                        handleRadioChange(e, "HasIntensiveCareUnit")
                                    }
                                    // value={isIntensiveCareUnitButton ? "yes" : "no"}
                                    >
                                        <Radio value="yes">Yes</Radio>
                                        <Radio value="no">No</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <div className="mb-3" style={{ width: "100%" }}>
                                    {
                                        isIntensiveCareUnitButton && <>
                                            <Form.Item
                                                label={<span>If yes, share details</span>}
                                                wrapperCol={{ span: 10 }}
                                                labelCol={{ span: 14 }}
                                                name="intensivecareunit"
                                            >
                                                <Input
                                                    type="text"
                                                    placeholder="Please enter the text
                            "
                                                />
                                            </Form.Item>
                                        </>
                                    }

                                </div>
                            </div>
                            <div style={{ width: "100%" }}>
                                <Form.Item
                                    label="Did the LA suffer from prolonged complications lasting more than 4 weeks"
                                    wrapperCol={{ span: 10 }}
                                    labelCol={{ span: 14 }}
                                >
                                    <Radio.Group onChange={(e) =>
                                        handleRadioChange(e, "HasProlongedComplications")
                                    }
                                    // value={isProlongedcomplicationsButton ? "yes" : "no"}
                                    >
                                        <Radio value="yes">Yes</Radio>
                                        <Radio value="no">No</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </div>
                            <div style={{ width: "100%" }}>
                                {
                                    isProlongedcomplicationsButton &&

                                    <Form.Item
                                        label={<span>If yes, share details</span>}
                                        name="prolongedcomplications"
                                        wrapperCol={{ span: 10 }}
                                        labelCol={{ span: 14 }}
                                    >
                                        <Input
                                            type="text"
                                            placeholder="Please enter the text
                            "
                                        />
                                    </Form.Item>
                                }
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    type="primary"
                                    className="primary-btn mt-4 me-3"
                                    htmlType="submit"
                                    onClick={() => setActiveTab("5")}
                                >
                                    Previous
                                </Button>
                                <Button
                                    type="primary"
                                    className="primary-btn mt-4 me-3"
                                    htmlType="submit"
                                    onClick={() => setActiveTab("7")}
                                >
                                    Next
                                </Button>
                            </div>
                        </Form>
                    </div>
                )}
                {activeTab === "7" && (
                    <div className="col-md-8 mt-3">
                        <Form
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                            }}
                            form={form}
                        >
                            {/* <div style={{ width: "50%", marginBottom: "20px" }}>
                                <Form.Item
                                    label="Vaildate Signature"
                                    wrapperCol={{ span: 10 }}
                                    labelCol={{ span: 14 }}
                                    name="vaildatesignature"
                                >
                                    <Radio.Group
                                    >
                                        <Radio value="yes">Yes</Radio>
                                        <Radio value="no">No</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </div> */}

                            {
                                documentList.map((item, index) => {
                                    return (
                                        <div key={index} style={{ width: "50%", marginBottom: "20px" }}>


                                            <Form.Item
                                                label={
                                                    <span>
                                                        {item.label}
                                                    </span>
                                                }
                                                name={item.name}
                                                className="inputs-label mb-0"
                                                wrapperCol={{ span: 14 }}
                                                labelCol={{ span: 10 }}
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
                                            </Form.Item>
                                        </div>
                                    );
                                })
                            }
                            {/* <div style={{ width: "50%", marginBottom: "20px" }}>
                                <Form.Item
                                    label="Payment Received"
                                    wrapperCol={{ span: 10 }}
                                    labelCol={{ span: 14 }}
                                    name="paymentreceived"
                                >
                                    <Radio.Group
                                    >
                                        <Radio value="yes">Yes</Radio>
                                        <Radio value="no">No</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </div> */}
                            <div
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "center",
                                }}
                            >
                                {" "}
                                <Button
                                    type="primary"
                                    className="primary-btn mt-4 me-3"
                                    htmlType="submit"
                                    onClick={() => setActiveTab("6")}
                                >
                                    {" "}
                                    Previous{" "}
                                </Button>{" "}
                                <Button
                                    type="primary"
                                    className="primary-btn mt-4 me-3"
                                    htmlType="submit"
                                    onClick={handleSubmit}
                                >
                                    {" "}
                                    Submit{" "}
                                </Button>{" "}
                            </div>

                        </Form>
                    </div>
                )}
            </div>
            {showAlert && (
                <PopupAlert
                    alertData={alertData}
                    getAdvance={props.getAdvance}
                    title={alertTitle}
                    navigate={navigateTo}
                    setShowAlert={setShowAlert}
                ></PopupAlert>
            )}
        </div>
    );
};

export default RevivalWithDGH;
