import React, { useState, useEffect } from "react";
import PopupAlert from "../popupAlert";
import { useParams } from "react-router-dom";
import {
  Button,
  Checkbox,
  Select,
  Tooltip,
  Row,
  Col,
  Drawer,
  Tabs,
  Card,
  Form,
  Input,
  Upload,
  message,
  List,
  Modal,
  Spin,
  Typography,
} from "antd";
import moment from "moment";
import { useNavigate, useLocation } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import {
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import CloseIcon from "../../assets/images/close-icon.png";
import CustomerDetails from "../customerDetails";
import apiCalls from "../../api/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { NumericFormat } from "react-number-format";
import EventContext from "../../reducers/EventContext";
import { EmailMngDetailsObj } from "../../reducers/EmailMngReducer";
import Widgets from "../Widgets/Widgets"
import { billFreq, POLICYSTATUSLIST, PREMIUMSTATUSLIST } from "../../utils/constantLU";
const { Text } = Typography;

const EmailManagementView = (props) => {
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state?.userProfileInfo?.profileObj);
  const { id } = useParams();
  const { TabPane } = Tabs;
  const { Option } = Select;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [form4] = Form.useForm();

  const loginInfo = useSelector((state) => state);

  const store = useSelector((state) => state);

  // Use the useLocation hook to get the current location object
  const location = useLocation();
  // Access the state passed during navigation
  const { state } = location;
  const [isLoading, setIsLoading] = useState(false);
  const [isShowNLPNextscreen, setIsShowNLPNextScreen] = useState(false);
  const formattedDateTime = moment
    .utc(new Date())
    .local()
    .format("DD/MM/YYYY hh:mm A");
  const [checkboxes, setCheckboxes] = useState(Array(10).fill(false));
  const [isChecked, setIsChecked] = useState(false);
  const [isLOBChecked, setIsLOBChecked] = useState(false);
  const [isSpamEMS, setIsSpamEMS] = useState(false);
  const [isSpamYes, setIsSpamYes] = useState(false);
  const [isSpamNo, setIsSpamNo] = useState(false);
  const [isNarYes, setIsNarYes] = useState(false);
  const [isNarNo, setIsNarNo] = useState(true);
  const [narList, setNarList] = useState([]);
  const [selectedNarCategory, setSelectedNarCategory] = useState("");
  const [error, setError] = useState("");
  const [applicationNumber, setApplicationNumber] = useState("");
  const [proposerName, setProposerName] = useState("");
  const [policyStatus, setPolicyStatus] = useState("");
  const [plan, setPlan] = useState("");
  const [clientDOB, setClientDOB] = useState("");
  const [clientHeaderDOB, setClientHeaderDOB] = useState("");
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [BackButton, setBackButton] = useState(false);
  const [NextButton, setNextButton] = useState(false);
  const [isAddMorePolicy, setIsAddMorePolicy] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [isShowCallTypes, setIsShowCallTypes] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [searchPolicyData, setSearchPolicyData] = useState({});
  const [startingScreen, setIsStartingScreen] = useState(true);
  const [finalScreen, setIsFinalScreen] = useState(false);
  const [emailResponse, setEmailResponse] = useState("");
  const [ResForCustomer, setResForCustomer] = useState(false);
  const [EmailFromCustomer, setEmailFromCustomer] = useState("");

  const [masterData, setMasterData] = useState([]);
  const [callTypeLU, setCallTypeLU] = useState([]);
  const [subTypeLU, setSubTypeLU] = useState(null);

  const [selectedCallTypeId, setSelectedCallTypeId] = useState("");
  const [selectedSubTypeId, setSelectedSubTypeId] = useState(null);
  const [selectedSubType, setSelectedSubType] = useState(null);

  const [alertTitle, setAlertTitle] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [alertData, setAlertData] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [ResponseForCustomer, setResponseForCustomer] = useState("");
  const [EmailResponseDtls, setEmailResponseDtls] = useState("");

  const [attachments, setAttachments] = useState([]);
  const [showAttachments, setShowAttachments] = useState(true);

  const [RegisteredID, setRegisteredID] = useState(false);
  const [SelectedPolocies, setSelectedPolocies] = useState([]);
  const [mailToSnrLdr, setMailToSnrLdr] = useState(false);
  const [IsSenderBlckLst, setIsSenderBlckLst] = useState(false);

  const [receivedDateTime, setReceivedDateTime] = useState(false);
  const [HideSubmitBtn, setHideSubmitBtn] = useState(true);

  const [PolicyNumber, setPolicyNumber] = useState("");

  const [to, setTo] = useState("");

  const [SelectedPolicy, setSelectedPolicy] = useState("");
  const [EmailResponseId, setEmailResponseId] = useState(true);

  const [headerDetailsOpen, setheaderDetailsOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [data, setData] = useState("");
  const [closedTicketStatus, setClosedTicketStatus] = useState(false);
  const [closedTicketEmailBody, setClosedTicketEmailBody] = useState("");
  const [ClosedTicketsCTSTData, setClosedTicketsCTSTData] = useState([]);

  const [MailOpen, setMailOpen] = useState(false);
  const [IsThisSpamEmail, setIsThisSpamEmail] = useState(true);
  const [IsEmailAddressed, setIsEmailAddressed] = useState(true);
  const [showEmailScreen, setShowEmailScreen] = useState(true);
  const [isMoreButton, setIsMoreButton] = useState(false);
  const [addData, setAddData] = useState({});
  const [policyCltData, setPolicyCltData] = useState({});
  const [isShownPolicyData, setIsShownPolicyData] = useState(false);
  const [isPolicyLodaer, setIsPolicyLoader] = useState(false);
  const [formData, setFormData] = useState({
    senderMailId: "",
    policyNo: "",
    name: "",
  });

  const [ctstEnable, setCtstEnable] = useState(true);

  const [isLoadingData, setIsLoadingData] = useState(false);

  const spam = IsThisSpamEmail;
  const lob = IsEmailAddressed;

  const [tableNLPData, setTableNLPData] = useState([]);

  useEffect(() => {
    getCTST();
    getEmailResponseDtls(id);
    // getEmailDedupe();
  }, []);
  const [content, setContent] = useState("");

  useEffect(() => {
    // Parse the email HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(EmailFromCustomer, "text/html");

    // Remove all inline styles by extracting only the text content
    const cleanedContent = Array.from(doc.body.childNodes)
      .map((node) => node.textContent || "") // Get text content of each node
      .join(" "); // Join with space to avoid breaking text flow

    setContent(cleanedContent); // Update state with the cleaned content
  }, [EmailFromCustomer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChildEvent = () => {
    setIsShowCallTypes(false);
    setShowEmailScreen(false);
    const isChecked = leftTableData?.filter((ele) => {
      return ele.isCheck === true;
    });
    let policynumbers = isChecked?.map((obj) => obj.policyNo);
    LoadCTST(policynumbers);
  };

  const [leftTableData, setLeftTableData] = useState([
    // {id:1, policyNo:"00110825",value: '00110825', label:'00110825', customerName:"Chetan N", role:"LA",isCheck:false},
    // {id:2, policyNo:"00110826", value: '00110826', label:'00110826', customerName:"Vishnu", role:"Proposer",isCheck:false},
  ]);
  const searchObj = {
    requestheader: {
      source: "POS",
      policyNo: "",
      applicationNo: "",
    },
    requestBody: {
      mobileNo: "",
      emailID: "",
      pan: "",
      customerID: "",
      firstName: "",
      middleName: "",
      lastName: "",
    },
  };

  const beforeUpload = (file) => {
    return true;
  };

  const handleChange1 = ({ fileList }) => {
    setFileList(fileList);
  };

  const getClientEnquiry = async (dobValue) => {
    setIsLoading(true);

    let obj = {
      policyNo: state?.policyNo,
      applicationNo:
        state?.applicationNo || props?.searchPolicyData?.applicationNo || "",
      dob: dobValue || clientDOB, // Use passed DOB or fallback to state
    };

    try {
      let response = await apiCalls.getHeaderParameters(obj);

      if (response?.data?.responseBody) {
        const res = response.data.responseBody;

        // Set state only if values are not undefined/null
        if (res?.clTdob) setClientDOB(res.clTdob);
        if (res?.identifiers?.applicationNo)
          setApplicationNumber(res.identifiers.applicationNo);
        if (res?.planAndStatus?.policyStatus)
          setPolicyStatus(res.planAndStatus.policyStatus);
        if (res?.identifiers?.po_Name) setProposerName(res.identifiers.po_Name);
        if (res?.planAndStatus?.planName) setPlan(res.planAndStatus.planName);
      } else {
        throw new Error(
          response?.data?.responseBody?.errormessage ||
            "Something went wrong, please try again!"
        );
      }
    } catch (error) {
      console.error("Error in getClientEnquiry:", error);

      message.error({
        content: error.message,
        className: "custom-msg",
        duration: 2,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSearch = (e) => {};

  const getEmailDedupe = (val) => {
    setIsLoadingData(true);

    // let obj = {
    //   "emailAddress": 'thotavenkat732@gmail.com'
    // }
    const searchObj = {
      requestheader: {
        source: "POS",
        policyNo: "",
        applicationNo: "",
      },
      requestBody: {
        mobileNo: "",
        emailID: val,
        pan: "",
        customerID: "",
        firstName: "",
        middleName: "",
        lastName: "",
      },
    };
    let response = apiCalls.getEmailDedupeAPI(searchObj);

    response
      .then((val) => {
        if (val?.data?.responseBody?.searchDetails) {
          let transformedData = val?.data?.responseBody?.searchDetails?.map(
            (item) => ({
              ...item,
              policyNo: item.policyNo,
              lA_PolicyNo: item.policyNumber,
              value: item.policyNumber,
              customerName: item.poName,
              label: item.policyNumber,
              isCheck: false,
            })
          );
          setLeftTableData(transformedData);

          setIsLoadingData(false);
        } else {
          setIsLoadingData(false);
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
        // setIsLoader(false);
      });
  };

  const onClose = () => {
    setheaderDetailsOpen(false);
  };

  const handleRemove = (file) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newFileList);
  };
  // const handleRemove = file => {
  //   // Show a confirmation modal before removing the file
  //   Modal.confirm({
  //     title: 'Confirm Deletion',
  //     content: `Are you sure you want to delete ${file.name}?`,
  //     onOk: () => {
  //       const newFileList = fileList.filter(item => item.uid !== file.uid);
  //       setFileList(newFileList);
  //     },
  //   });
  // };

  const handleDownload = (file) => {
    // Create a download link and trigger the click event
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(file.originFileObj);
    downloadLink.download = file.name;
    downloadLink.click();
  };

  const handlePreview = (file) => {
    // Add logic to preview the file (e.g., open a modal or navigate to a preview page)
    //window.open(file.url || file.thumbUrl, '_blank');
    // const reader = new FileReader();  // download code
    // reader.onloadend = () => {
    //   window.open(reader.result, '_blank');
    // };
    // reader.readAsDataURL(file.originFileObj);

    // Check if the file type is an image or a PDF
    if (file.type.startsWith("image/") || file.type === "application/pdf") {
      // Display images and PDFs directly in the browser
      //window.open(URL.createObjectURL(file.originFileObj), '_blank');
      // Display images and PDFs directly in the browser
      setPreviewFile(file);
      setPreviewVisible(true);
    } else {
      // For other file types, open a new window with a download link
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(file.originFileObj);
      downloadLink.download = file.name;
      downloadLink.click();
    }
  };

  const customRequest = ({ file, onSuccess, onError }) => {
    // Add your custom upload logic here (e.g., using Axios or Fetch)
    // onSuccess should be called when the upload is successful
    // onError should be called when there is an error during upload
    onSuccess();
  };

  const uploadButton = (
    <Button
      icon={
        <i
          class="bi bi-paperclip text-color c-pointer fs-20"
          style={{ width: "20px" }}
        ></i>
      }
    ></Button>
  );

  const handleCheckboxChange = (e, index) => {
    //
    const newValue = e.target.checked;
    const updatedData = [...tableNLPData];
    updatedData[index] = { ...updatedData[index], isCheck: newValue };

    setTableNLPData(updatedData);
  };

  const getPremiumStatus = (status, statusList) => {
    if (status) {
      const filteredStatus = statusList?.find(
        (ele) => ele?.descItem === status // ✅ No need for lowercase conversion
      );
      return filteredStatus?.longDesc || ""; // Return `longDesc` or empty string if not found
    }
    return "";
  };

  const handleServiceRequest = (index, value) => {
    //
    const updatedData = [...tableNLPData];
    updatedData[index] = { ...updatedData[index], serviceRequestNumber: value };
    setTableNLPData(updatedData);
    // const newPolicyNumbers = [...policyNumbers];
    // newPolicyNumbers[index] = value.trim(); // Trim the value before updating the state
    // setPolicyNumbers(newPolicyNumbers);
  };
  const handlePolicyNumberChange = (index, value) => {
    setSelectedPolicy(value);
    const updatedData = [...tableNLPData];
    updatedData[index] = { ...updatedData[index], policyNo: value };
    setTableNLPData(updatedData);
    // const newPolicyNumbers = [...policyNumbers];
    // newPolicyNumbers[index] = value.trim(); // Trim the value before updating the state
    // setPolicyNumbers(newPolicyNumbers);
  };

  const handlePolicyNumberSelect = (index, value) => {
    setSelectedPolicy(value);
    const updatedData = [...tableNLPData];
    updatedData[index] = { ...updatedData[index], lA_PolicyNo: value };
    setTableNLPData(updatedData);
  };

  const backbutton = () => {
    //
    setIsFinalScreen(false);
    setIsShowNLPNextScreen(true);
    if (ResForCustomer) {
      navigate("/emailuser");
    }
  };
  const sentTemplate = (value) => {
    // if (value === 'unregistered') {

    //   setResponseForCustomer(`<p>Dear Sender,<br /><br />Kindly send email from your registered mailbox for further processing of your request.<br />Please note we will not be able to service any request from unregistered mail box.</p>
    // <br/> <p>Regards,<br />Team GC</p>`);

    // }
    if (value === "acknowledge") {
      setResponseForCustomer(
        `<p>Dear Sender,</p><p><br />We acknowledge your mail for policy number &lt;asdasd&gt;. <br />Please note you will receive a separate mail(s) for request raised by you.</p><p><br />Regards,<br />Team GC</p>`
      );
    } else if (value === "closure") {
      setResponseForCustomer(`<p>Dear Sender,</p><p><br />You are hereby informed that your request cannot be processed due to below reasons</p>
    <p><br />Regards,<br />Team GC</p>`);
    } else if (value === "UnregisteredMailwithValidPolicy") {
      setResponseForCustomer(`This is regarding your request for [Policy No]. <br />
         We are not able to process your request because your email ID is not registered with us.`);
    } else if (value === "UnregisteredMailwithInValidPolicy") {
      setResponseForCustomer(
        `We are not able to process your request because your email ID is not registered with us. We have answered a few questions that you may have`
      );
    } else if (value === "GeneralQuery") {
      setResponseForCustomer(``);
    } else if (value === "ComplaintVerification") {
      setResponseForCustomer(
        `We are not able to process your request because your email ID is not registered with us. `
      );
    }
  };

  const [value, setValue] = useState(
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
  );
  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  const module = {
    toolbar: toolbarOptions,
  };
  const valuesData = (
    <>
      <div>
        <div>
          <span style={{ fontSize: "18px" }}>Quill Rich Text Editor</span>
        </div>
        <div>
          <br />
        </div>
        <div>
          Quill is a free,
          <a href="https://github.com/quilljs/quill/">open source</a> WYSIWYG
          editor built for the modern web. With its
          <a href="http://quilljs.com/docs/modules/">
            extensible architecture
          </a>{" "}
          and a<a href="http://quilljs.com/docs/api/">expressive API</a> you can
          completely customize it to fulfill your needs. Some built-in features
          include:
        </div>
        <div>
          <br />
        </div>
        <ul>
          <li>Fast and lightweight</li>
          <li>Semantic markup</li>
          <li>Standardized HTML between browsers</li>
          <li>
            Cross-browser support including Chrome, Firefox, Safari, and IE 9+
          </li>
        </ul>
        <div>
          <br />
        </div>
        <div>
          <span style={{ fontSize: "18px" }}>Downloads</span>
        </div>
        <div>
          <br />
        </div>
        <ul>
          <li>
            <a href="https://quilljs.com">Quill.js</a>, the free, open source
            WYSIWYG editor
          </li>
          <li>
            <a href="https://zenoamaro.github.io/react-quill">React-quill</a>, a
            React component that wraps Quill.js
          </li>
        </ul>
      </div>
    </>
  );

  const handlePreviewCancel = () => setPreviewVisible(false);

  const handleAddRow = () => {
    setIsMoreButton(true);
    setSelectedPolicy("");
    let newRow = {
      id: tableNLPData ? tableNLPData?.length + 1 : 1,
      isCheck: true,
      callType: ``,
      subType: ``,
      request: `Query ${tableNLPData ? tableNLPData?.length + 1 : 1}`,
      policyNo: "",
      lA_PolicyNo: "",
      callTypeDesc: ``,
      subTypeDesc: ``,
      isAddedDynamic: true,
      serviceRequestNumber: "",
    };
    if (tableNLPData) {
      setTableNLPData([...tableNLPData, newRow]);
    } else {
      setTableNLPData([newRow]);
    }
  };

  const handleDeleteRow = (id) => {
    const updatedTableData = tableNLPData?.filter((row) => row.id !== id);
    setTableNLPData(updatedTableData);
    setIsShowCallTypes(false);
  };

  const [policyNumbers, setPolicyNumbers] = useState(
    Array(tableNLPData?.length).fill("")
  ); // Assuming an array to store Policy Numbers

  // Function to handle checkbox click
  const handleCheckboxClick = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);
  };
  const handleLeftCheckboxClick = (index, env) => {
    setResForCustomer(false);
    const leftTableDataa = [...leftTableData];
    leftTableDataa[index].isCheck = env.target.checked;
    setLeftTableData(leftTableDataa);
    let isChecked = leftTableDataa.some((ele) => ele.isCheck);
    setRegisteredID(isChecked);

    const selectedPolics = leftTableDataa.filter((ele) => ele.isCheck);
    setSelectedPolocies(selectedPolics);
    // const newCheckboxes = [...leftCheckboxes];
    // newCheckboxes[index] = !newCheckboxes[index];
    // setLeftCheckboxes(newCheckboxes);
  };
  const handleSwitchChange = (checked) => {
    setIsChecked(checked);
    setIsSpamEMS(checked);
    const lobswitch = isLOBChecked;
    setCtstEnable(true);

    // else{
    //
    // }
  };
  const handleLOBSwitchChange = (checked) => {
    setIsLOBChecked(checked);
    const spamuserresponse = isChecked;

    if (spam !== spamuserresponse && lob === checked) {
      setCtstEnable(false);
    } else {
      setCtstEnable(true);
    }
  };

  const handleBackToListClick = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    let backButtonEnabled = true; // Use lowercase for consistency
    setBackButton(true); // This state update is asynchronous
    setIsModalVisible(false);
    handleSubmitRespond(backButtonEnabled, null);
  };
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // const transformData = (data, key) => {
  //   const filteredData = data?.filter((ele) => ele.key === key);
  //   return filteredData[0]?.value?.map((item) => ({
  //     ...item,
  //     label: item.mstDesc,
  //     value: item.mstID,
  //   }));
  // };

  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate).format("YYYY-MM-DD HH:mm");
    return formattedDate;
  };
  const convertDate2 = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };

  const subTypeDropdown = async (value, subType, allData) => {
    let SUB_TYP =
      masterData?.length > 0
        ? masterData?.filter((ele) => ele.key === "SUB_TYP")
        : allData?.filter((ele) => ele.key === "SUB_TYP");
    let data = SUB_TYP[0]?.value?.filter((ele) => ele?.mstParentID === value);
    let transformedData = data?.map((item) => ({
      ...item,
      label: item.mstDesc,
      value: item.mstID,
    }));
    setSubTypeLU(transformedData);
  };

  // const handleCallTypeChange = (value, index) => {
  //   setIsShowCallTypes(false);
  //   callTypeLU.find((ele) => {
  //     if (ele.mstID === value) {

  //     const updatedData = [...tableNLPData];
  //     updatedData[index] = {
  //         ...updatedData[index], callTypeDesc: ele.mstDesc, callType: value

  //     };

  //     setTableNLPData(updatedData);
  //     }
  //   })

  //   setSelectedCallTypeId(value);
  //   dispatch(EmailMngDetailsObj({ isEmailManagement: true }))
  //   form.setFieldsValue({ subType: null })
  //   setSubTypeLU(null);
  //   setSelectedSubType(null);
  //   subTypeDropdown(value);
  // };
  // const handleSubTypeChange = (value, getSubLU) => {

  //     setIsShowCallTypes(false);

  //   subTypeLU.find((ele) => {
  //     if (ele.mstID === value) {

  //       const updatedData = [...tableNLPData];
  //       updatedData[getSubLU] = {
  //         ...updatedData[getSubLU], subTypeDesc: ele.mstDesc, subType: value
  //       };

  //       setTableNLPData(updatedData);
  //     }
  //   })

  //     setSelectedSubTypeId(value);
  //   dispatch(EmailMngDetailsObj({ isEmailManagement: true }))
  //   let subTypeData = subTypeLU?.length > 0 ? subTypeLU : getSubLU;
  //   subTypeData?.map((key, index) => {
  //     if (key.mstID === value) {
  //       const modifiedDesc = key.mstDesc?.replace(/[^\w]/g, "").toLowerCase();
  //       setSelectedSubType(modifiedDesc);
  //     }
  //   });
  //   };

  const columns = [
    {
      title: "File Name",
      dataIndex: "fileName",
      key: "fileName",
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => window.open(record.downloadUrl, "_blank")}
        >
          <span style={{ fontSize: "16px" }}>⬇</span> {/* Download icon */}
        </Button>
      ),
    },
  ];

  const updateSelectionState = (yesChecked, noChecked) => {
    if (!yesChecked && !noChecked) {
      setError("Please select Yes or No for 'Is It Spam Email?'");
    } else {
      setError(""); // Clear error if at least one is selected
    }
  };

  const handleSpamNoChange = (event) => {
    const checked = event.target.checked;
    setIsSpamNo(checked);
    if (checked) {
      setIsSpamYes(false);
      setIsSpamEMS(true);
    }
    updateSelectionState(isSpamYes, checked);
  };

  const handleSpamYesChange = (event) => {
    const checked = event.target.checked;
    setIsSpamYes(checked);
    if (checked) {
      setIsSpamNo(false);
      setIsSpamEMS(true);
    }
    updateSelectionState(checked, isSpamNo);
  };

  const handleNarYesChange = (event) => {
    const checked = event.target.checked;
    setIsNarYes(checked);
    if (checked) {
      setIsNarNo(false);
      setIsSpamEMS(true);
    }
    // updateSelectionState(checked, isNarNo);
  };

  const handleNarNoChange = (event) => {
    const checked = event.target.checked;
    setIsNarNo(checked);
    if (checked) {
      setIsNarYes(false);
      setIsSpamEMS(true);
    }
    // updateSelectionState(isNarYes, checked);
  };

  const handleNarList = async () => {
    let obj = {
      MasterRequest: ["NAR_CATEGORY"],
    };
    try {
      let response = await apiCalls.GetNarCategory(obj);
      const list = response.data[0].value;
      setNarList(list);
    } catch (error) {
      console.error("Error fetching NAR list:", error);
    }
  };

  const getCTST = async () => {
    setIsLoading(true);
    let obj = {
      MasterRequest: ["CALL_TYP", "SUB_TYP"],
    };
    let response = await apiCalls.ctst(obj);
    if (Array.isArray(response?.data)) {
      setMasterData(response.data);
      // Use the function for each set of data
      const transformedData = transformData(response.data, "CALL_TYP");
      const transformedSubType = transformData(response.data, "SUB_TYP");
      //setCallTypeLU(transformedData);
      setCallTypeLU(funCallType(transformedData, transformedSubType));
      setIsLoading(false);
    } else {
      setIsLoading(false);
      message.destroy();
      message.error({
        content: "Something went to wrong!",
        className: "custom-msg",
        duration: 2,
      });
    }
  };

  const handleNext = async () => {
    if (!isSpamYes && !isSpamNo) {
      setError("Please select Yes or No for 'Is It Spam Email?'");
      return;
    }

    try {
      console.log("Executing handlesearch...");
      await handlesearch(); // Wait for handlesearch to finish
    } catch (error) {
      console.error("Error executing APIs:", error);
    }

    setError("");
    let nextButtonEnabled = true;
    setNextButton(true);
    setIsLoadingData(true);

    const isChecked = leftTableData.filter((ele) => ele.isCheck === true);

    if (isChecked.length <= 0) {
      setIsLoadingData(false);
      setIsShowNLPNextScreen(false);
      setIsStartingScreen(true);
      setIsFinalScreen(false);
      setResForCustomer(true);
    } else {
      setIsLoadingData(false);
      setIsShowNLPNextScreen(true);
      setIsStartingScreen(false);

      let policynumbers = isChecked.map((obj) => obj.policyNo);
      LoadCTST(policynumbers);
      //handleSubmitRespond(null, nextButtonEnabled);
    }
  };

  const LoadCTST = (policynumbers) => {
    setIsLoadingData(true);
    let obj = {
      contractnos: policynumbers,
      EmailClassify: {
        EmailResponseId: Number(id),
      },
    };
    let response = apiCalls.LoadCTST(obj);
    response
      .then((val) => {
        setEmailResponseDtls(val?.data);
        if (val?.data) {
          let res = val?.data;
          setIsThisSpamEmail(res?.isSpamNLP);
          setIsEmailAddressed(res?.isLifeNLP);

          //  let obj = {
          //   SrvReqRefNo:res?.urn,
          //   EmailResponseId:res?.emailResponseId
          //  }
          //  setEmailResponseId(obj)

          // getEmailDedupe(res?.from);
          // setMailToSnrLdr(res?.mailToSnrLdr);
          // setIsSenderBlckLst(res?.isSenderBlckLst);
          // setEmailResponse(val?.data?.emailClassify[0]);
          // setReceivedDateTime(res?.receivedDateTime)
          // setTo(res?.toRecipients)

          let dt = res?.emailClassCTSTs?.map((ele, index) => {
            return {
              ...ele,
              id: index,
              isCheck: ele?.srvReqRefNo ? true : false,
              policyNo: "",
              isAddedDynamic: false,
              serviceRequestNumber: "",
            };
          });
          setTableNLPData(dt);
          setIsLoadingData(false);
        } else {
          message.destroy();
          message.error({
            content:
              val?.data?.responseHeader?.message ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
          setIsLoadingData(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleSubmit = (values) => {
    console.log("Received values:", values);
    // Handle form submission logic here
  };
  const getSearchData = async (sharedData, notification) => {
    // setIsShowCallTypes(false)
    setIsLoadingData(true);
    setNotificationOpen(false);
    let response = apiCalls.getSearchData(sharedData);
    response
      .then((val) => {
        if (val?.data?.responseHeader?.issuccess) {
          setSearchPolicyData(val?.data?.responseBody?.searchDetails);
          // dispatch(someAction('some payload'));
          setClientDOB(
            convertDate(val?.data?.responseBody?.searchDetails[0]?.dob)
          );
          setIsLoading(false);
          setIsShowCallTypes(true);
          if (notification === "isBell") {
            setNotificationOpen(true);
          }
        } else {
          message.destroy();
          message.error({
            content:
              val?.data?.responseHeader?.message ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
          setIsLoading(false);
        }
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoadingData(false);
      });
  };

  const editValueHandler = (newText) => {
    setResponseForCustomer(newText);
  };
  const saveRequest = () => {
    const values = form.getFieldsValue();
    const obj = {
      CallType: 36,
      SubType: values?.sentTemplate === "ComplaintVerification" ? 126 : 71, // Required
      RequestSource: loginInfo?.userProfileInfo?.profileObj?.role || 0, // Required
      RequestChannel: values?.requestchannel, // Required
      ApplicationNo: applicationNumber,
      PolicyNo: form.getFieldValue().policyNo, // Required
      proposerName: proposerName,
      policyStatus: policyStatus,
      plan: plan,
      DOB: convertDate(clientHeaderDOB),
      CreatedOn: new Date(),
      CreatedByRef: loginInfo?.userProfileInfo?.profileObj?.userName, // Required
      CreatedUsrId: loginInfo?.userProfileInfo?.profileObj?.userName,
      ModifiedOn: new Date(),
      ModifiedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
      AssignedToRole: "", // POS
      AssignedByUser: 0,
      Category: 1,
      CustRole: 1,
      ReasonForChange: "",
      TransactionData: [
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: "CommentsAdded",
        },
        {
          Status: "Create",
          TagName: "EmailResponseId",
          TagValue: EmailResponseId?.EmailResponseId,
        },

        {
          Status: "Create",
          TagName: "MAIL_BODY",
          TagValue: ResponseForCustomer,
        },
      ],
      Uploads: [],
      RequestDateTime: values?.branchreceivedate
        ? new Date(values?.branchreceivedate)
        : new Date(),
      ReasonDelayed: values?.resonfordelay,
      CustSignDateTime: values?.customersigningdate
        ? new Date(values?.customersigningdate)
        : new Date(),

      CommunicationRequest: [
        {
          SrvReqRefNo: "",
          TemplateID: "",
          CommType: 2,
          ReceipientTo: import.meta.env.VITE_APP_RECEIPIENT_TO
            ? import.meta.env.VITE_APP_RECEIPIENT_TO
            : values?.from,
          ReceipientCC: import.meta.env.VITE_APP_RECEIPIENT_CC
            ? import.meta.env.VITE_APP_RECEIPIENT_CC
            : values?.from,
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
          ScheduledTime: new Date(),
          CommBody: "",
          Attachments: null,
        },
      ],
    };

    apiCalls
      .genericAPI(obj)
      .then(async (val) => {
        if (val?.data) {
          setAlertTitle(val?.data?.header);
          setAlertData(val?.data?.message);
          setShowAlert(true);
          setNavigateTo(
            "/emailuser/" + EmailResponseDtls?.emailClassify[0]?.assignedTo
          );

          // If first API succeeds, call handleSubmitRespond
          handleSubmitRespond(null, true);
        } else {
          message.error({
            content:
              val?.data?.responseBody?.errormessage ||
              "Something went wrong, please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
        message.error({
          content: "An error occurred while processing your request.",
          className: "custom-msg",
          duration: 2,
        });
      });
  };

  const SendFalconideMail = async () => {
    const values = form.getFieldsValue(); // Fetch form values
    // Skip API call if sentTemplate is 'UnregisteredMailwithValidPolicy'
    if (values?.sentTemplate === "UnregisteredMailwithValidPolicy") {
      await saveRequest(); // Call saveRequest directly
      setAlertTitle("Request Saved Successfully");
      setShowAlert(true);
      setNavigateTo(
        "/emailuser/" + EmailResponseDtls?.emailClassify[0]?.assignedTo
      );
      return;
    }

    if (values?.sentTemplate === "ComplaintVerification") {
      await saveRequest(); // Call saveRequest directly
      setAlertTitle("Request Saved Successfully");
      setShowAlert(true);
      setNavigateTo(
        "/emailuser/" + EmailResponseDtls?.emailClassify[0]?.assignedTo
      );
      return;
    }

    setIsLoadingData(true); // Start loading indicator
    try {
      const dynamicMailBody = ResponseForCustomer.replace(
        "[Policy No]",
        values?.policyNo
      );
      let fromEmail =
        values?.sentTemplate === "ForwardtoInternalTeam"
          ? state?.from
          : values?.from;

      let obj = {
        Subject: values?.subject,
        MAIL_BODY: ResponseForCustomer,
        SenderID: "care@generalicentral.com",
        ReceipientTo: values?.from,
        ReceipientCC: "",
        PolicyNo: values?.policyNo,
        TemplateID:
          values?.sentTemplate === "GeneralQuery"
            ? 68291
            : values?.sentTemplate === "ForwardtoInternalTeam"
            ? 68292
            : 68021,

        SenderName: "Generali Central",
        URN: state?.urn,
        sentTemplate: values?.sentTemplate,
        Line1: `Received Mail from ${fromEmail} at ${state?.receivedDateTime}`,
        Line2: EmailFromCustomer,
        CreatedByUsrId: loginInfo?.userProfileInfo?.profileObj?.userName,
        CreatedByRoleId: loginInfo?.userProfileInfo?.profileObj?.role,
      };

      let response = await apiCalls.SendFalconideMail(obj);

      if (response?.data?.success === true) {
        console.log("Email sent successfully, calling saveRequest...");
        setAlertTitle("Email Sent Successfully");
        setShowAlert(true);
        setNavigateTo(
          "/emailuser/" + EmailResponseDtls?.emailClassify[0]?.assignedTo
        );
      } else {
        console.warn("Email API failed:", response?.data);
        setAlertTitle("Failed to send Email");
        setShowAlert(true);
        setNavigateTo("/emailuser");
      }
    } catch (error) {
      console.error("Error in SendFalconideMail:", error);
      message.error({
        content:
          error?.response?.data?.responseBody?.errormessage ||
          "Something went wrong, please try again!",
        className: "custom-msg",
        duration: 2,
      });
    } finally {
      setIsLoading(false);
      setIsLoadingData(false);
    }
  };

  const sendEmailSMTP = () => {
    setIsLoading(true);
    setShowAlert(false);
    const values = form.getFieldsValue();
    //
    let obj = {
      ReceipientTo: values?.from,
      ReceipientCC: values?.cc,
      Subject: values?.subject ? values?.subject : "",
      MailContent: ResponseForCustomer,
    };

    let response = apiCalls.SendEmailSMTP(obj);
    response
      .then((val) => {
        if (val?.data) {
          //
          if (val?.data?.sendStatus) {
            setAlertData(`${"Email Sent Successfully "}`);
            setShowAlert(true);
          } else {
            setAlertData(`${"Failed to send Email"}`);
            setShowAlert(true);
          }

          setIsLoading(false);
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

    //
  };

  const saveEmail = () => {
    setIsLoading(true);
    setShowAlert(false);
    let emailClassify = EmailResponseDtls?.emailClassify[0];

    const values = form.getFieldsValue();
    //

    let selectedCTST = tableNLPData?.map((item) => {
      if (item.policyNo && item.callType && item.subType) {
        return {
          EmailResponseId: item.EmailResponseId,
          CallType: item.callType ? item.callType : "",
          SubType: item.subType ? item.subType : "",
          DecisionBy: "UserID",
          SrvReqID: item.SrvReqID ? item.SrvReqID : "",
          ConfidenceScr: item.ConfidenceScr ? item.ConfidenceScr : "",
          SrvReqRefNo: item.SrvReqRefNo ? item.SrvReqRefNo : "",
          serviceRequestNumber: item.serviceRequestNumber
            ? item.serviceRequestNumber
            : "",
          LA_PolicyNo: item.policyNo,
        };
      } else {
        return false;
      }
    });
    let obj = {
      emailResponseId: emailClassify?.emailResponseId,
      id: emailClassify?.id,
      receivedDateTime: emailClassify?.receivedDateTime,
      hasAttachments: emailClassify?.hasAttachments,
      internetMessageId: emailClassify?.internetMessageId,
      subject: values?.subject,
      bodyPreview: emailClassify?.bodyPreview,
      importance: emailClassify?.importance,
      conversationId: emailClassify?.conversationId,
      isRead: emailClassify?.isRead,
      isHtml: emailClassify?.isHtml,
      body: emailClassify?.body,
      from: values?.from,
      toRecipients: emailClassify?.to,
      ccRecipients: values?.cc,
      // "toRecipients":values?.to ?  values?.to.join(', ') : '',
      // "ccRecipients": values?.cc ?  values?.cc.join(', ') : '',
      bccRecipients: emailClassify?.bccRecipients,
      replyTo: emailClassify?.replyTo,
      isMailSrcLifeLOB: emailClassify?.isMailSrcLifeLOB,
      regdMailID: emailClassify?.regdMailID,
      mailsReceived: emailClassify?.mailsReceived,
      cntOfToRecipients: emailClassify?.cntOfToRecipients,
      cntOfCcRecipients: emailClassify?.cntOfCcRecipients,
      cntOfBccRecipients: emailClassify?.cntOfBccRecipients,
      prntEmailID: emailClassify?.prntEmailID,
      mailToSnrLdr: emailClassify?.mailToSnrLdr,
      custName: emailClassify?.custName,
      isNLPRespGen: emailClassify?.isNLPRespGen,
      lifeOrNonLife: emailClassify?.lifeOrNonLife,
      reqSrc: emailClassify?.reqSrc,
      status: emailClassify?.status,
      source: emailClassify?.source,
      policyNo: emailClassify?.policyNo,
      applicationNo: emailClassify?.applicationNo,
      dob: emailClassify?.dob,
      isSpamEMS: emailClassify?.isSpamEMS,
      isSpamNLP: emailClassify?.isSpamNLP,
      dmlStatus: emailClassify?.dmlStatus,
      assignedTo: emailClassify?.assignedTo,
      emailAgeing: emailClassify?.emailAgeing,
      emailAgeingHrs: emailClassify?.emailAgeingHrs,
      repeatCount: emailClassify?.repeatCount,
      addressedToMultipleIDs: emailClassify?.addressedToMultipleIDs,
      mergedMail: emailClassify?.mergedMail,
      isSenderBlckLst: emailClassify?.isSenderBlckLst,
      urn: emailClassify?.urn,
      emailClassCTSTs: selectedCTST,
      emailClassAttmnts: emailClassify?.emailClassAttmnts,
    };

    let response = apiCalls.SaveEmailResponseDtls(obj);
    response
      .then((val) => {
        setEmailResponseDtls(val?.data);
        if (val?.data?.dmlStatus === 1) {
          setAlertData(`${"Service Request Saved "}`);
          setResForCustomer(true);
          setShowAlert(true);
          setIsLoading(false);
          setHideSubmitBtn(false);
        } else {
          setAlertData(`${"Service Request Failed "}`);
          setResForCustomer(true);
          setShowAlert(true);
          setIsLoading(false);
        }
      })
      .catch((err) => {});
  };

  const getEmailResponseDtls = async (id) => {
    // setIsLoading(true);

    let obj = {
      EmailResponseId: Number(id),
    };
    let response = apiCalls.GetEmailResponseDtls(obj);
    response
      .then((val) => {
        setEmailResponseDtls(val?.data);
        if (val?.data?.emailClassify[0]) {
          let res = val?.data?.emailClassify[0];
          let obj = {
            IsEmailmanagent: true,
            SrvReqRefNo: res?.urn,
            EmailResponseId: res?.emailResponseId,
            subject: res?.subject,
          };
          setEmailResponseId(obj);
          if (res?.status === "CLOSED") {
            setClosedTicketStatus(true);
            setClosedTicketsCTSTData(
              val?.data?.emailClassify[0]?.emailClassCTSTs
            );
            setClosedTicketEmailBody(val?.data?.emailCust?.body);
          }
          setAttachments(val?.data?.emailClassify[0]?.attachments);
          getEmailDedupe(res?.from);
          setMailToSnrLdr(res?.mailToSnrLdr);
          setIsSenderBlckLst(res?.isSenderBlckLst);
          setEmailResponse(val?.data?.emailClassify[0]);
          setReceivedDateTime(res?.receivedDateTime);
          setTo(res?.toRecipients);

          let dt = res?.emailClassCTSTs?.map((ele, index) => {
            return {
              ...ele,
              id: index,
              isCheck: false,
              policyNo: "",
              isAddedDynamic: false,
              serviceRequestNumber: "",
            };
          });
          //setTableNLPData(dt);

          // setIsLoading(false);
          let toRecipients = res?.from ? res?.from : "";
          let ccRecipients = res?.ccRecipients ? res?.ccRecipients : "";
          //

          form.setFieldsValue({
            from: toRecipients,
            cc: ccRecipients,
            subject: res?.subject,
            ReceivedDateTime: res.receivedDateTime,
          });

          const fullBody = res.body;
          const filteredBody = fullBody.split("DISCLAIMER:")[0].trim();
          setEmailFromCustomer(filteredBody);
          // form2.setFieldsValue({
          //   isSpamEMS:res.isSpamEMS,
          //   isMailSrcLifeLOB:res.isMailSrcLifeLOB
          //   isSpamEMS:false,
          //   isMailSrcLifeLOB:true
          // })

          // setResponseForCustomer(res.body)
          // setIsShowCallTypes(true);
        } else {
          message.destroy();
          message.error({
            content:
              val?.data?.responseHeader?.message ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
          setIsLoading(false);
        }
      })
      .catch((err) => {});
  };

  const convertDOBDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };

  const viewPolicyDetails = () => {
    setData(store?.policyDetails?.policyDetailsObj);
    setheaderDetailsOpen(true);
  };

  const viewMail = () => {
    // setMailOpen(true)
  };

  const viewNotification = () => {
    const value = SelectedPolicy?.trim();
    if (!value) return; // Early exit if value is empty or undefined

    const updatedSearchObj = {
      ...searchObj,
      requestheader: { ...searchObj.requestheader },
      requestBody: { ...searchObj.requestBody },
    };

    if (!isNaN(+value)) {
      updatedSearchObj.requestheader.policyNo = value;
      updatedSearchObj.requestBody.mobileNo = value;
      updatedSearchObj.requestBody.emailID = value;
      updatedSearchObj.requestBody.customerID = value;
    } else {
      updatedSearchObj.requestheader.applicationNo = value;
      updatedSearchObj.requestBody.pan = value;
      updatedSearchObj.requestBody.firstName = value;
      updatedSearchObj.requestBody.middleName = value;
      updatedSearchObj.requestBody.lastName = value;
    }

    getSearchData(updatedSearchObj, "isBell");
  };

  // const isAtLeastOneCheckboxSelected = () => {
  //   return checkboxes.some((isChecked) => isChecked);
  // };

  // const isPolicyNumbersValid = () => {
  //   console.log('Policy Numbers:', policyNumbers);
  //   return policyNumbers.some((policyNumber) => policyNumber.trim() !== '');
  // };

  const handleSubmitRespond = (backButtonEnabled, nextButtonEnabled) => {
    const loginObj = loginInfo?.userProfileInfo?.profileObj?.role;

    let obj = {
      EmailResponseId: EmailResponseId?.EmailResponseId,
      CallType: 0,
      SubType: 0,
      DecisionBy: store?.userProfileInfo?.profileObj?.sourceId,
      SrvReqRefNo: EmailResponseId?.SrvReqRefNo,
      ISSpamEmail: isSpamEMS === true && isSpamYes === true,
      IsNAR: isNarYes,
      NARCategoryID: selectedNarCategory,
      BackButtonEnabled: backButtonEnabled,
      NextButtonEnabled: nextButtonEnabled,
      ModifiedByUsrId: loginInfo?.userProfileInfo?.profileObj?.userName,
      ModifiedByRoleId: loginInfo?.userProfileInfo?.profileObj?.role,
    };
    console.log("objjj", obj);
    let response = apiCalls.UpdateEmailStatus(obj);
    response
      .then((val) => {
        setEmailResponseDtls(val?.data);
        if (val?.data) {
          setAlertData("Email Status Updated");

          if (loginObj === 21 && backButtonEnabled === true) {
            navigate("/emailadmin"); // Fix: use backButtonEnabled
          }
          if (loginObj === 20 && backButtonEnabled === true) {
            navigate("/emailuser"); // Fix: use backButtonEnabled
          }
        } else {
          setAlertData("Failed to update status");

          if (loginObj === 20 && backButtonEnabled === true) {
            navigate("/emailuser");
          }
          if (loginObj === 21 && backButtonEnabled === true) {
            navigate("/emailadmin");
          }
        }
      })
      .catch((err) => {
        console.error("Error updating email status:", err);
      });
  };
  const handleArroeClick = (policyNo, obj) => {
    // if (isSpamEMS === true) {
    //   return
    // }

    console.log("arrow", obj);
    if (!obj?.callTypeId || !obj?.subTypeId) {
      message.error({
        content: "Pleace Select CallType & Subtype",
        className: "custom-msg",
        duration: 2,
      });
      return;
    }
    if (obj?.isCheck === false) {
      message.error({
        content: "Pleace Check the policy number",
        className: "custom-msg",
        duration: 2,
      });
      return;
    }

    if (obj?.lA_PolicyNo) {
      setSelectedPolicy(obj?.lA_PolicyNo);
    }

    if (!obj?.lA_PolicyNo) {
      message.error({
        content: "Select Policy Number",
        className: "custom-msg",
        duration: 2,
      });
      return;
    }
    const transformedData = transformData(masterData, "CALL_TYP");

    setSelectedCallTypeId(obj?.callTypeId);
    setSelectedSubTypeId(obj?.subTypeId);
    dispatch(EmailMngDetailsObj({ isEmailManagement: true }));

    setIsLoading(true);
    const value = obj?.lA_PolicyNo?.trim();
    if (!isNaN(+value)) {
      searchObj.requestheader.policyNo = value;
      searchObj.requestBody.mobileNo = value;
      searchObj.requestBody.emailID = value;
      searchObj.requestBody.customerID = value;
    } else {
      searchObj.requestheader.applicationNo = value;
      searchObj.requestBody.pan = value;
      searchObj.requestBody.firstName = value;
      searchObj.requestBody.middleName = value;
      searchObj.requestBody.lastName = value;
    }
    getSearchData(searchObj);
    handleSubmitRespond(null, true);
  };

  const handleAddMorPolicies = () => {
    setIsAddMorePolicy(true);
  };


  const handleClick = async (e, item) => {
    e.preventDefault();

    const obj = {
      emailAttachment: {
        EmailAttachmentID: item?.emailAttachmentID,
        EmailResponseId: item?.emailResponseId,
      },
    };

    try {
      setIsLoadingData(true);

      const response = await apiCalls.DownloadEmailAttachments(obj);
      const { fileBase64Format, fileName, contentTpe } = response.data;

      if (!fileBase64Format) {
        alert("No file data found!");
        return;
      }

      // 2. Convert Base64 string to Blob
      const byteCharacters = atob(fileBase64Format);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: contentTpe });

      // 3. Create a download link
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName || "downloaded_file";
      document.body.appendChild(link);
      link.click();

      // 4. Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
      message.success("File downloaded successfully");
    } catch (error) {
      console.error("Download failed:", error);
      message.error(
        "Failed to download file: " + (error.message || "Unknown error")
      );
    } finally {
      setIsLoadingData(false);
    }
  };

  const handlesearch = async () => {
    const formData = form3.getFieldValue();

    const _selectedPolicyNo = SelectedPolocies[0]?.policyNo;
    const searchObj = {
      requestheader: {
        source: "POS",
        /*   policyNo: formData?.policyNo || state.policyNo, */
        policyNo: _selectedPolicyNo || formData?.policyNo || state.policyNo,
        applicationNo: "",
      },
      requestBody: {
        mobileNo: "",
        emailID: "",
        pan: "",
        customerID: "",
        firstName: "",
        middleName: "",
        lastName: "",
        dob: "",
      },
    };

    setIsLoading(true);

    try {
      let response = await apiCalls.getSearchData(searchObj);

      if (response?.data?.responseHeader?.issuccess) {
        let updatedDOB = convertDOBDate(
          response?.data?.responseBody?.searchDetails[0]?.dob
        ); // Store DOB in a variable
        console.log("Updated DOB from search API:", updatedDOB); // Debugging log

        setClientDOB(updatedDOB); // Update the state

        await getClientEnquiry(updatedDOB); // Pass the correct DOB as an argument

        form3.setFieldsValue({
          senderMailId: response?.data?.responseBody?.searchDetails[0]?.emailID,
          name: response?.data?.responseBody?.searchDetails[0]?.poName,
        });

        setAddData(response?.data?.responseBody?.searchDetails[0]);
      } else {
        console.warn(
          "handlesearch API failed:",
          response?.data?.responseHeader?.message
        );
        message.destroy();
        message.error({
          content:
            response?.data?.responseHeader?.message ||
            "Something went wrong, please try again!",
          className: "custom-msg",
          duration: 2,
        });
      }
    } catch (error) {
      console.error("Error in handlesearch:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPolicy = () => {
    const formData = form3.getFieldValue();

    let transformedData = {
      policyNo: addData?.policyNo ? addData?.policyNo : formData?.policyNo,
      lA_PolicyNo: addData?.policyNo ? addData?.policyNo : "NA",
      value: addData?.policyNo ? addData?.policyNo : "NA",
      customerName: addData?.poName ? addData?.poName : formData?.name,
      label: addData?.policyNo ? addData?.policyNo : "NA",
      role: addData?.role ? addData?.role : "NA",
      isCheck: false,
    };

    setLeftTableData((prevState) => [...prevState, transformedData]);
    setIsAddMorePolicy(false);
    form3.resetFields();
  };

  const handlePolicyBlur = () => {
    const formData = form.getFieldValue();
    const searchObj = {
      requestheader: {
        source: "POS",
        policyNo: formData.policyNo,
        applicationNo: "",
      },
      requestBody: {
        mobileNo: "",
        emailID: "",
        pan: "",
        customerID: "",
        firstName: "",
        middleName: "",
        lastName: "",
        dob: "",
      },
    };

    setIsLoading(true);
    let response = apiCalls.getSearchData(searchObj);
    response
      .then((val) => {
        if (val?.data?.responseHeader?.issuccess) {
          const searchDetails = val?.data?.responseBody?.searchDetails;
          setClientDOB(
            convertDOBDate(val?.data?.responseBody?.searchDetails[0]?.dob)
          );
          // Case 1: Empty array (No Data Found)
          if (Array.isArray(searchDetails) && searchDetails.length === 0) {
            message.destroy();
            message.warning({
              content: "No Data Found",
              className: "custom-msg",
              duration: 2,
            });
          }
          // Case 2: Non-empty array (Valid Policy Number)
          else if (Array.isArray(searchDetails) && searchDetails.length > 0) {
            message.destroy();
            message.success({
              content: "Valid Policy Number",
              className: "custom-msg",
              duration: 2,
            });

            // You can handle the valid data here
            console.log("Valid data:", searchDetails);
          }
        } else {
          message.destroy();
          message.error({
            content:
              val?.data?.responseHeader?.message ||
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

  const handleAddClose = () => {
    form3.resetFields();
    setIsAddMorePolicy(false);
  };

  const transformData = (data, keyy) => {
    const filteredData = data?.filter((ele) => ele.key === keyy);
    return filteredData[0]?.value?.map((item, index) => {
      let obj;

      if (keyy === "CALL_TYP") {
        obj = {
          ...item,
          label: item.mstDesc,
          // value: item.mstID,
          isCallType: true,
        };
      } else if (keyy === "SUB_TYP") {
        obj = {
          ...item,
          label: item.mstDesc,
          // value: item.mstID,
          isSubType: true,
        };
      } else if (keyy === "MARTIAL_ST" || keyy === "SALUTATION") {
        obj = {
          ...item,
          label: item.mstDesc,
          value: item?.extrL_KEY,
        };
      } else {
        obj = {
          ...item,
          label: item.mstDesc,
          value: item.mstID,
        };
      }
      return obj;
    });
  };
  const funCallType = (calltypes, subtypes) => {
    return [...calltypes, ...subtypes].map((ele, index) => {
      return {
        ...ele,
        value: index+1,
      };
    });
  };

  const CALL_TYP =
    masterData?.filter((ele) => ele.key === "CALL_TYP")?.[0]?.value || [];
  const SUB_TYP =
    masterData?.filter((ele) => ele.key === "SUB_TYP")?.[0]?.value || [];

  const handleCallTypeChange = (index, value, option) => {
    if (option?.isCallType) {
      // props?.setCallTypeId(obj.mstID);
      // setSelectedCallType(obj.mstID);
      // form.setFieldsValue({subType: null})
      setSubTypeLU(null);
      setSelectedSubType(null);
      subTypeDropdown(option?.mstID);
    } else {
      // Set SubType lookup data based on selected callTypeId
      const transformedData = SUB_TYP?.filter(
        (ele) => ele?.mstParentID === option?.mstParentID
      ).map((ele) => ({
        ...ele,
        label: ele.mstDesc,
        value: ele.mstID,
      }));

      setSubTypeLU(transformedData);
    }
    const updatedTable = tableNLPData?.map((row, rowIndex) => {
      if (index === rowIndex) {
        let updatedRow = { ...row, callTypeId: value, subTypeId: null }; // Reset SubType
        if (option?.isSubType) {
          const parentCallType = CALL_TYP.find(
            (call) => call.mstID === option.mstParentID
          );
          if (parentCallType) {
            updatedRow = {
              ...updatedRow,
              callTypeId: parentCallType.mstID,
              // subTypeId: value,
              subTypeId: option.mstID,
            };
            form.setFieldsValue({
              [`callType_${index}`]: parentCallType.mstDesc,
              [`subType_${index}`]: option.mstID,
            });
          }
        }

        return updatedRow;
      }
      return row; // Return unchanged rows
    });

    setTableNLPData(updatedTable);
  };

  const handleSubTypeChange = (index, value) => {
    const updatedTable = tableNLPData.map((row, rowIndex) => {
      if (index === rowIndex) {
        return { ...row, subTypeId: value };
      }
      return row;
    });

    setTableNLPData(updatedTable);
  };

  const handleInfoIcon = (item) => {
    setIsShownPolicyData(true);
    handlePolicyCltData(item);
  };

  const handlePolicyCltData = async (values) => {
    setIsPolicyLoader(true);
    setPolicyCltData([]);
    try {
      const res = await apiCalls.GetPolicyClientDtls(
        values?.policyNo,
        loggedUser?.userName
      );
      // Convert objects to list format
      setPolicyCltData(res?.data);
      // const lifeAssuredData = (res?.data?.lifeAssured && [{ ...res?.data?.lifeAssured?.responseBody, type: "LifeAssured" }]);
      // const proposerData = res?.data?.proposer ? [{ ...res?.data?.proposer?.responseBody, type: "Proposer" }] : [];

      // // Merge all lists into a single array
      // const mergedData = [
      //   ...res?.data?.appointees.map(item => ({ ...item, type: "Appointee" })),
      //   ...res?.data?.nominees.map(item => ({ ...item, type: "Nominee" })),
      //   ...lifeAssuredData,
      //   ...proposerData,
      // ];
      //    setData(mergedData);
      setIsPolicyLoader(false);
    } catch (error) {
      setIsPolicyLoader(false);
      message.error({
        content: error || "Something went wrong, please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  };

  const getProposerAddress = (policyCltData) => {
    return (
      [
        policyCltData?.cltaddR01,
        policyCltData?.cltaddR02,
        policyCltData?.cltaddR03,
        policyCltData?.cltaddR04,
        policyCltData?.cltaddR05,
        policyCltData?.cltpcode,
      ]
        .filter(Boolean) // Removes undefined/null values
        .join(", ") || "-"
    ); // Joins with a comma, defaults to "<>" if empty
  };

  return (
    <>
      <div className="emailmanagement-view">
        <Spin spinning={isLoadingData}>
          <Row gutter={[16, 16]}>
            <Col
              xs={24}
              sm={24}
              md={9}
              lg={9}
              xxl={9}
              className="rightsection-view"
            >
              {/* <Card hoverable={true} className="rightsection-view"> */}
              {/* <div style={{'width':'70%',    float: 'left'}}> 
              <h6 className="text-center pb-8 border-bottom ">NLP Response</h6>
              </div>

              <div style={{'width':'28%',    float: 'right'}}> 
              <h6 className="text-center pb-8 border-bottom ">Agree / Disagree</h6>
              </div>
                <div style={{ clear: 'both'}}> </div> */}
              {startingScreen && (
                <>
                  <div style={{ width: "100%" }}>
                    <h6 className="text-center pb-8 border-bottom ">
                      Policies Found with Registered Email Id
                    </h6>
                  </div>

                  <div style={{ clear: "both" }}> </div>

                  <div className="table-container email-table mb-16 policy-table">
                    <table className="responsive-table ">
                      <thead>
                        <tr>
                          <th>Policy No</th>
                          <th>Customer Name</th>
                          <th>Role</th>
                          {/* <th>Product</th>  */}

                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {leftTableData?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              {item?.policyNo || "NA"}
                              <Tooltip
                                placement="leftTop"
                                title="Click for more info!"
                              >
                                <a
                                  id="pay-premium"
                                  onClick={() => handleInfoIcon(item)}
                                  style={{ marginLeft: 8 }}
                                >
                                  <i
                                    className="bi bi-info-square"
                                    style={{ color: "#b21f1f" }}
                                  ></i>
                                </a>
                              </Tooltip>
                            </td>

                            <td>
                              {item?.customerName ? item?.customerName : "NA"}
                            </td>
                            <td>{item?.role ? item?.role : "NA"}</td>
                            {/* <td></td> */}

                            <td>
                              <Checkbox
                                checked={item.isCheck}
                                onChange={(event) => {
                                  handleLeftCheckboxClick(index, event);
                                }}
                                disabled={closedTicketStatus} // Disable the checkbox when closedTicketStatus is true
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {!closedTicketStatus && (
                    <div
                      className="nlp-btn"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="primary-btn"
                          onClick={() => handleAddMorPolicies()}
                          disabled={!isSpamYes && !isSpamNo}
                        >
                          Add More Policies
                        </Button>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="primary-btn"
                          onClick={handleNext}
                          disabled={(!isSpamYes && !isSpamNo) || !isNarNo}
                        >
                          Next
                        </Button>
                      </div>

                      {/* Checkbox Group for "Is It Spam Email?" and Back to Dashboard Button in the same line */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <label>
                            Is It Spam Email?{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <Checkbox
                            checked={isSpamYes}
                            onChange={handleSpamYesChange}
                            disabled={state?.status === "CLOSED"}
                          />
                          {/* <input
                            type="checkbox"
                            id="spam-yes"
                            checked={isSpamYes}
                            onChange={handleSpamYesChange}
                            disabled={state?.status === "CLOSED"}
                          /> */}
                          <label htmlFor="spam-yes">Yes</label>
                          <Checkbox
                            checked={isSpamNo}
                            onChange={handleSpamNoChange}
                            disabled={state?.status === "CLOSED"}
                            id="spam-yes"
                          />
                          {/* <input
                            type="checkbox"
                            id="spam-no"
                            checked={isSpamNo}
                            onChange={handleSpamNoChange}
                            disabled={state?.status === "CLOSED"}
                          /> */}
                          <label htmlFor="spam-no">No</label>
                        </div>

                        <Button
                          type="primary"
                          className="primary-btn"
                          onClick={handleBackToListClick}
                          disabled={!isSpamYes && !isSpamNo} // Correctly disables when both are unchecked
                        >
                          Back To Dash Board
                        </Button>
                      </div>

                      {/* NAR */}

                      {isSpamYes ? null : isSpamNo ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            justifyContent: "flex-start",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <label>
                              NAR <span style={{ color: "red" }}>*</span>
                            </label>
                            <Checkbox
                              checked={isNarYes}
                              onChange={handleNarYesChange}
                              disabled={state?.status === "CLOSED"}
                              id="spam-yes"
                            />
                            {/* <input
                              type="checkbox"
                              id="spam-yes"
                              checked={isNarYes}
                              onChange={handleNarYesChange}
                              disabled={state?.status === "CLOSED"}
                            /> */}
                            <label htmlFor="spam-yes">Yes</label>
                            <Checkbox
                              checked={isNarNo}
                              onChange={handleNarNoChange}
                              disabled={state?.status === "CLOSED"}
                              id="spam-yes"
                            />
                            {/* <input
                              type="checkbox"
                              id="spam-no"
                              checked={isNarNo}
                              onChange={handleNarNoChange}
                              disabled={state?.status === "CLOSED"}
                            /> */}
                            <label htmlFor="spam-no">No</label>
                          </div>

                          {isNarYes ? (
                            <div style={{ marginLeft: "1rem" }}>
                              <label style={{ marginRight: "0.5rem" }}>
                                NAR Type:
                              </label>
                              <select
                                style={{
                                  width: "9rem",
                                  padding: "0.1rem 0.9rem",
                                  border: "1px solid #ced4da",
                                  borderRadius: "5px",
                                  backgroundColor: "#fff",
                                  fontSize: "0.8rem",
                                  transition:
                                    "border-color 0.2s ease, box-shadow 0.2s ease",
                                }}
                                onFocus={(e) => {
                                  e.target.style.borderColor = "#80bdff";
                                  e.target.style.boxShadow =
                                    "0 0 0 0.2rem rgba(0, 123, 255, 0.25)";
                                  e.target.style.outline = "none";
                                }}
                                onBlur={(e) => {
                                  e.target.style.borderColor = "#ced4da";
                                  e.target.style.boxShadow = "none";
                                }}
                                value={selectedNarCategory}
                                onChange={(e) =>
                                  setSelectedNarCategory(e.target.value)
                                }
                                onClick={handleNarList}
                              >
                                <option value="">Select Category</option>
                                {narList.map((item) => (
                                  <option key={item.mstID} value={item.mstID}>
                                    {item.mstDesc}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ) : null}
                        </div>
                      ) : null}

                      {/* Error Message Display */}
                      {error && (
                        <div style={{ color: "red", fontSize: "14px" }}>
                          {error}
                        </div>
                      )}
                    </div>
                  )}

                  {isShownPolicyData && (
                    <>
                      <Spin spinning={isPolicyLodaer}>
                        <div
                          style={{
                            border: "1px solid #ddd",
                            padding: "16px",
                            borderRadius: "8px",
                            maxWidth: "600px",
                            margin: "auto",
                          }}
                        >
                          <p>
                            <Text strong>Life Insured DoB:</Text>{" "}
                            <Text>
                              {policyCltData?.lifeAssured?.clTdob
                                ? convertDate2(
                                    policyCltData?.lifeAssured?.clTdob
                                  )
                                : null || "-"}
                            </Text>
                          </p>
                          <p>
                            <Text strong>Registered Address of Proposer:</Text>{" "}
                            <Text>
                              {getProposerAddress(policyCltData?.proposer) ||
                                "-"}
                            </Text>
                          </p>
                          <p>
                            <Text strong>Nominees on the policy are:</Text>{" "}
                            <Text>
                              {policyCltData?.nominees &&
                              policyCltData?.nominees?.length > 0
                                ? policyCltData?.nominees
                                    .map(
                                      (nominee) =>
                                        `${nominee?.lgivname} ${nominee?.lsurname}`
                                    )
                                    .join(", ")
                                : "-"}
                            </Text>
                          </p>

                          {/* <p>
        <Text strong>Last Premium of</Text> <Text>{policyCltData?.receiptEnquiryDetailsLists[0]?.origamt}</Text> <Text>was paid on</Text>{" "}
        <Text>{policyCltData?.receiptEnquiryDetailsLists[0]?.trandate ? convertDate(policyCltData?.receiptEnquiryDetailsLists[0]?.trandate) : null || ""}</Text>. <Text strong>Status is</Text> <Text>{policyCltData?.receiptEnquiryDetailsLists[0]?.zchqsts || ""}</Text>
      </p> */}
                          <p>
                            <Text strong>Last Premium of</Text>{" "}
                            <Text>
                              {policyCltData?.receiptEnquiryDetailsLists
                                ?.length > 0
                                ? policyCltData.receiptEnquiryDetailsLists[0]
                                    .origamt
                                : "N/A"}
                            </Text>{" "}
                            <Text>was paid on</Text>{" "}
                            <Text>
                              {policyCltData?.receiptEnquiryDetailsLists
                                ?.length > 0 &&
                              policyCltData.receiptEnquiryDetailsLists[0]
                                .trandate
                                ? convertDate2(
                                    policyCltData.receiptEnquiryDetailsLists[0]
                                      .trandate
                                  )
                                : "N/A"}
                            </Text>
                            . <Text strong>Status is</Text>{" "}
                            <Text>
                              {policyCltData?.receiptEnquiryDetailsLists
                                ?.length > 0
                                ? policyCltData.receiptEnquiryDetailsLists[0]
                                    .zchqsts
                                : "N/A"}
                            </Text>
                          </p>
                        </div>
                      </Spin>
                    </>
                  )}

                  <div
                    className="table-container call-type-table mb-16"
                    style={{ marginTop: "40px" }}
                  >
                    <h4 style={{ color: "#b21f1f", fontWeight: "bold" }}>
                      Attachments
                    </h4>
                    <table className="responsive-table">
                      <thead>
                        <tr>
                          <th>File Name</th>
                          <th>File Size</th>
                          <th>Uploaded On</th>
                        </tr>
                      </thead>
                      <tbody>
                        {attachments
                          ?.sort((a, b) => {
                            const dateA = new Date(
                              a.lastModifiedDateTime || 0
                            ).getTime();
                            const dateB = new Date(
                              b.lastModifiedDateTime || 0
                            ).getTime();
                            return dateB - dateA; // Sort in descending order
                          })
                          .map((item, index) => (
                            <tr key={index}>
                              <td>
                                {item?.name ? (
                                  <a
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault(); // Prevent default link behavior
                                      handleClick(e, item);
                                    }}
                                    style={{
                                      color: "#007BFF",
                                      textDecoration: "underline",
                                      cursor: "pointer",
                                    }}
                                  >
                                    {item.name}
                                  </a>
                                ) : (
                                  "NA"
                                )}
                              </td>
                              <td>{item?.sizeText ? item.sizeText : "NA"}</td>
                              <td>
                                {item?.lastModifiedDateTime
                                  ? new Date(
                                      item.lastModifiedDateTime
                                    ).toLocaleString("en-IN", {
                                      timeZone: "Asia/Kolkata",
                                    }) // Convert to IST
                                  : "NA"}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  <Modal
                    title={
                      <span style={{ color: "#b21f1f", fontWeight: "bold" }}>
                        Close Email from Dashboard
                      </span>
                    }
                    open={isModalVisible}
                    onOk={handleModalOk}
                    onCancel={handleModalCancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <p>Please confirm, if all required CTST(s) are raised</p>
                  </Modal>
                </>
              )}
              {closedTicketStatus && (
                <div className="table-container call-type-table mb-16">
                  <table className="responsive-table">
                    <thead>
                      <tr>
                        <th>SR Number</th>
                        <th>Policy No</th>
                        <th>Call Type</th>
                        <th>Sub Type</th>
                      </tr>
                    </thead>
                    {
                      <tbody>
                        {ClosedTicketsCTSTData?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              {item?.srvReqRefNo ? item?.srvReqRefNo : "NA"}
                            </td>
                            <td>{item?.policyNo ? item?.policyNo : "NA"}</td>
                            <td>
                              {item?.callTypeDesc ? item?.callTypeDesc : "NA"}
                            </td>
                            <td>
                              {item?.subTypeDesc ? item?.subTypeDesc : "NA"}
                            </td>
                            {/* <td>
                <Checkbox
                  checked={item.isCheck}
                  onChange={(event) => {
                    handleNewTableCheckboxClick(index, event);
                  }}
                />
              </td> */}
                          </tr>
                        ))}
                      </tbody>
                    }
                  </table>
                </div>
              )}

              {isShowNLPNextscreen && (
                <>
                  <div className="table-container email-table mt-8"></div>
                  {!isSubmitClicked && (
                    <>
                      <div className="nlp-section">
                        <div style={{ clear: "both" }}> </div> <br />
                        {/* Flex container for horizontal alignment */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <Button
                            type="primary"
                            htmlType="submit"
                            className="primary-btn mb-10"
                            onClick={() => handleAddRow()}
                            //disabled={ctstEnable}
                            style={{ display: "inline-block" }}
                          >
                            More CT ST? Click here
                          </Button>

                          <div style={{ display: "inline-block" }}>
                            <Button
                              type="primary"
                              style={{ display: "inline-block" }}
                              className="primary-btn"
                              onClick={handleBackToListClick}
                            >
                              Back To Dash Board
                            </Button>

                            <Modal
                              title={
                                <span
                                  style={{
                                    color: "#b21f1f",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Close Email from Dashboard
                                </span>
                              }
                              open={isModalVisible}
                              onOk={handleModalOk}
                              onCancel={handleModalCancel}
                              okText="Yes"
                              cancelText="No"
                            >
                              <p>
                                Please confirm, if all required CTST(s) are
                                raised
                              </p>
                            </Modal>
                          </div>
                        </div>
                        <div style={{ clear: "both" }}> </div>
                        {isMoreButton && (
                          <div className="table-container email-table tbl-res">
                            <table className="responsive-table">
                              <thead>
                                <tr>
                                  {/* <th></th> */}
                                  <th>Call Type</th>
                                  <th>Sub Type</th>
                                  {/* <th>Q / R / C</th> */}
                                  <th>Policy No</th>
                                  <th>Action</th>
                                  <th>Raise SR</th>
                                </tr>
                              </thead>
                              <tbody>
                                {tableNLPData &&
                                  tableNLPData?.length > 0 &&
                                  tableNLPData?.map((row, index) => (
                                    <>
                                      {" "}
                                      {row.isAddedDynamic === true && (
                                        <tr key={row.id}>
                                          {/* <td>{row.id}</td> */}
                                          <td>
                                            {" "}
                                            <Select
                                              showSearch
                                              allowClear
                                              placeholder="Select Call Type"
                                              // options={funCallType(CALL_TyPES, subTypeLU)}
                                              options={callTypeLU}
                                              value={row.callTypeId}
                                              filterOption={filterOption}
                                              onChange={(value, option) =>
                                                handleCallTypeChange(
                                                  index,
                                                  value,
                                                  option
                                                )
                                              }
                                            />
                                          </td>
                                          <td>
                                            <Select
                                              showSearch
                                              allowClear
                                              placeholder="Select Sub Type"
                                              options={subTypeLU}
                                              value={row.subTypeId}
                                              filterOption={filterOption}
                                              onChange={(value, option) =>
                                                handleSubTypeChange(
                                                  index,
                                                  value
                                                )
                                              }
                                            />
                                          </td>

                                          <td>
                                            {/* <Input type="text" placeholder="Enter Policy No" value={row.policyNo}
                onChange={(e) => handlePolicyNumberChange(index, e.target.value)} />
                 */}
                                            <Select
                                              showSearch
                                              key={row.id}
                                              className="cust-input calltype-select"
                                              maxLength={100}
                                              placeholder="Select Policy Number"
                                              options={SelectedPolocies.map(
                                                (ele) => ({
                                                  label: ele.policyNo,
                                                  value: ele.policyNo,
                                                })
                                              )}
                                              name="lA_PolicyNo"
                                              onChange={(e) =>
                                                handlePolicyNumberSelect(
                                                  index,
                                                  e
                                                )
                                              }
                                            ></Select>
                                          </td>
                                          <td>
                                            <i
                                              className="bi bi-trash3-fill"
                                              onClick={() =>
                                                handleDeleteRow(row.id)
                                              }
                                              style={{
                                                color: "#b3201f",
                                                cursor: "pointer",
                                              }}
                                            ></i>
                                          </td>
                                          <td>
                                            {!row?.srvReqRefNo && (
                                              <i
                                                disabled={isSpamEMS === true}
                                                className="bi bi-arrow-right-circle-fill"
                                                onClick={() =>
                                                  handleArroeClick(
                                                    SelectedPolicy,
                                                    row
                                                  )
                                                }
                                                style={{
                                                  color: "#b3201f",
                                                  cursor: "pointer",
                                                  fontSize: "20px",
                                                }}
                                              ></i>
                                            )}
                                            {!row?.srvReqRefNo &&
                                              row?.srvReqRefNo}
                                          </td>
                                        </tr>
                                      )}
                                    </>
                                  ))}
                                {tableNLPData?.length === 0 && (
                                  <tr>
                                    <td colSpan="5">
                                      <div className="text-center">
                                        <span>No data available</span>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {isMoreButton && (
                    <div className="contact-details-btn">
                      <Button
                        type="primary"
                        className="primary-btn"
                        onClick={() => {
                          setIsStartingScreen(true);
                          setIsShowNLPNextScreen(false);
                          setIsShowCallTypes(false);
                          setShowAttachments(false);
                        }}
                      >
                        Back
                      </Button>
                    </div>
                  )}
                </>
              )}

              {isMoreButton && showAttachments && (
                <div
                  className="table-container call-type-table mb-16"
                  style={{ marginTop: "40px" }}
                >
                  {/* Add margin-top here to create space between the button and this section */}
                  <h4 style={{ color: "#b21f1f", fontWeight: "bold" }}>
                    Attachments
                  </h4>
                  <table className="responsive-table">
                    <thead>
                      <tr>
                        <th>File Name</th>
                        <th>File Size</th>
                        <th>Uploaded On</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attachments?.map((item, index) => (
                        <tr key={index}>
                          <td>
                            {item?.name ? (
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault(); // Prevent default link behavior
                                  handleClick(e, item); // Call download function
                                }}
                                style={{
                                  color: "#007BFF",
                                  textDecoration: "underline",
                                  cursor: "pointer",
                                }}
                              >
                                {item.name}
                              </a>
                            ) : (
                              "NA"
                            )}
                          </td>
                          <td>{item?.sizeText ? item.sizeText : "NA"}</td>
                          <td>
                            {item?.lastModifiedDateTime
                              ? new Date(
                                  item.lastModifiedDateTime
                                ).toLocaleString("en-IN", {
                                  timeZone: "Asia/Kolkata",
                                }) // Convert to IST
                              : "NA"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {finalScreen && (
                <>
                  <div className="table-container email-table mt-8">
                    <table className="responsive-table">
                      <thead>
                        <tr>
                          {/* <th></th> */}
                          <th>Call Type - Sub Type (Policy No)</th>
                          {/* <th>Sub Type</th> */}
                          <th>Service Request Number</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableNLPData?.map((item, index) => (
                          <>
                            {" "}
                            {item.isCheck === true && (
                              <tr key={index}>
                                {/* <td>
                            <Checkbox
                             checked={item.isCheck}
                              onChange={(e) => handleCheckboxChange(e, index)}
                              disabled={isSubmitClicked}
                            />
                          </td> */}
                                <td>
                                  <Tooltip title={`Q/R/C: ${item.request}`}>
                                    {item.callTypeDesc} - {item.subTypeDesc} (
                                    {item.policyNo})
                                  </Tooltip>
                                </td>
                                {/* <td>{item.subTypeDesc}</td> */}
                                <td>
                                  <div className="d-flex align-center">
                                    <Input
                                      type="text"
                                      placeholder="Service Request Number"
                                      disabled={
                                        isSubmitClicked && checkboxes[index]
                                      }
                                      value={item.serviceRequestNumber}
                                      onChange={(e) =>
                                        handleServiceRequest(
                                          index,
                                          e.target.value
                                        )
                                      }
                                    />
                                    {isSubmitClicked && checkboxes[index] && (
                                      <>
                                        {/* <Tooltip title="Click here"> */}
                                        <i
                                          class="bi bi-arrow-right-circle-fill text-color c-pointer"
                                          onClick={() =>
                                            handleArroeClick(
                                              policyNumbers[index]
                                            )
                                          }
                                        ></i>
                                        {/* </Tooltip> */}
                                      </>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            )}
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="contact-details-btn">
                    <Button
                      type="primary"
                      className="primary-btn"
                      onClick={() => {
                        backbutton();
                      }}
                    >
                      Back
                    </Button>
                    {!ResForCustomer && (
                      <Button
                        type="primary"
                        className="primary-btn"
                        onClick={() => {
                          saveEmail();
                        }}
                      >
                        Submit & Respond
                      </Button>
                    )}
                  </div>
                </>
              )}

              {/* </Card> */}
            </Col>
            <Col
              xs={24}
              sm={24}
              md={15}
              lg={15}
              xxl={15}
              className="leftsection-view"
            >
              {isShowCallTypes && searchPolicyData?.length > 0 && (
                <>
                  {/* <TypesComponent isEmailManagement={true}></TypesComponent> */}
                  <div className="d-flex justify-content-between align-center">
                    <Tooltip title="View">
                      <Button
                        type="primary"
                        className="primary-btn"
                        onClick={() => viewPolicyDetails()}
                      >
                        {SelectedPolicy}
                        <i
                          class="bi bi-eye-fill"
                          style={{
                            fontSize: "16px",
                            color: "#b3201f!important",
                            cursor: "pointer",
                            paddingLeft: "5px",
                          }}
                        ></i>
                      </Button>
                    </Tooltip>
                    <Tooltip title="View">
                      <Button
                        type="primary"
                        className="primary-btn"
                        shape="circle"
                        onClick={() => viewNotification()}
                        icon={<i class="bi bi-bell-fill bell-icon"></i>}
                      ></Button>
                    </Tooltip>
                  </div>
                  <p className="ms-3 mt-2">
                    Email From Customer @ {convertDate(receivedDateTime)} in{" "}
                    {to}
                  </p>
                  {/* <ReactQuill
  className="quill-containers"
  theme="snow"
  value={EmailFromCustomer}
  readOnly={true}
/> */}
                  <Card
                    style={{
                      width: "100%",
                      minHeight: "200px",
                      overflowY: "auto", // Enable vertical scrollbar
                      maxHeight: "400px", // Optional: Limit height to 400px
                      border: "1px solid #d9d9d9",
                      borderRadius: "8px",
                    }}
                  >
                    <p>{content}</p>
                  </Card>

                  <EventContext.Provider value={handleChildEvent}>
                    <CustomerDetails
                      setIsShowCallTypes={setIsShowCallTypes}
                      SubTypeId={selectedSubTypeId}
                      CallTypeId={selectedCallTypeId}
                      isEmailManagement={true}
                      searchPolicyData={searchPolicyData[0]}
                      EmailResponse={EmailResponseId}
                    ></CustomerDetails>
                  </EventContext.Provider>
                </>
              )}

              {!isShowCallTypes && showEmailScreen && (
                <>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    xxl={24}
                    className="mb-8"
                  >
                    <div
                      className="d-flex align-center mb-16"
                      style={{ gap: "20px" }}
                    >
                      <p className="paragraph-mb">
                        Registered ID:{" "}
                        {RegisteredID ? (
                          <i class="bi bi-check2 email-yesicon"></i>
                        ) : (
                          <i class="bi bi-x cross-icon"></i>
                        )}
                      </p>
                      <p className="paragraph-mb">
                        Sent To SLT:
                        {mailToSnrLdr ? (
                          <i class="bi bi-check2 email-yesicon"></i>
                        ) : (
                          <i class="bi bi-x cross-icon"></i>
                        )}{" "}
                      </p>
                      <p className="paragraph-mb">
                        Debarred Sender:
                        {IsSenderBlckLst ? (
                          <i class="bi bi-check2 email-yesicon"></i>
                        ) : (
                          <i class="bi bi-x cross-icon"></i>
                        )}{" "}
                      </p>
                    </div>
                  </Col>
                  <Form
                    form={form}
                    name="wrap"
                    labelCol={{
                      flex: "10%",
                    }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{
                      flex: 1,
                    }}
                    colon={false}
                    // onFinish={sendEmailSMTP}
                    autoComplete="off"
                  >
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={24}
                      xxl={24}
                      className="mb-8"
                    >
                      <Form.Item
                        label="From"
                        name="from"
                        className="inputs-label mb-0"
                        rules={[
                          {
                            required: true,
                            message: "Please enter the recipient(s)!",
                          },
                        ]}
                      >
                        <Input
                          type="text"
                          placeholder="From"
                          value={state?.torecipients}
                          disabled={closedTicketStatus} // Disable the input when closedTicketStatus is true
                        />
                      </Form.Item>
                    </Col>

                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={24}
                      xxl={24}
                      className="mb-8"
                    >
                      <Form.Item
                        label="Cc"
                        name="cc"
                        className="inputs-label mb-0"
                      >
                        <Input
                          type="text"
                          placeholder="Cc"
                          value={state?.ccrecipients}
                          disabled={closedTicketStatus} // Disable the input when closedTicketStatus is true
                        />
                      </Form.Item>
                    </Col>

                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={24}
                      xxl={24}
                      className="mb-8"
                    >
                      <Form.Item
                        label="Subject"
                        name="subject"
                        className="inputs-label mb-0"
                        rules={[
                          {
                            required: true,
                            message: "Please enter the subject!",
                          },
                        ]}
                      >
                        <Input
                          type="text"
                          placeholder="Subject"
                          value={state?.subject}
                          disabled={closedTicketStatus} // Disable the input when closedTicketStatus is true
                        />
                      </Form.Item>
                    </Col>

                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={24}
                      xxl={24}
                      className="mb-8"
                    >
                      <Form.Item
                        label="Attachments"
                        name="Attachments"
                        className="inputs-label mb-0"
                        //  rules={[{ required: true, message: 'Please enter the subject!' }]}
                      >
                        <p>
                          {/* <Upload  {...uploadProps}
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG"
                      fileList={uploadFiles}
                      >
                 <i
                  class="bi bi-paperclip text-color c-pointer fs-20"
                  style={{ width: "20px" }}
                ></i>
               </Upload> */}

                          <Upload
                            multiple={true}
                            fileList={fileList}
                            beforeUpload={beforeUpload}
                            onChange={handleChange1}
                            onRemove={handleRemove}
                            customRequest={customRequest}
                            onPreview={handlePreview}
                            showUploadList={false}
                          >
                            {fileList.length >= 5 ? null : uploadButton}
                          </Upload>
                          {fileList.length > 0 && (
                            <List
                              style={{ marginTop: 16 }}
                              itemLayout="horizontal"
                              dataSource={fileList}
                              renderItem={(file) => (
                                <List.Item
                                  actions={[
                                    // <Button type="link" onClick={() => handlePreview(file)}>
                                    //   Preview
                                    // </Button>,
                                    <Button
                                      type="link"
                                      onClick={() => handleDownload(file)}
                                    >
                                      <DownloadOutlined /> Download
                                    </Button>,
                                    <Button
                                      type="link"
                                      danger
                                      onClick={() => handleRemove(file)}
                                    >
                                      <DeleteOutlined /> Delete
                                    </Button>,
                                  ]}
                                >
                                  <List.Item.Meta
                                    title={file.name}
                                    description={`File Size: ${(
                                      file.size / 1024
                                    ).toFixed(2)} KB`}
                                  />
                                </List.Item>
                              )}
                            />
                          )}
                        </p>
                      </Form.Item>
                    </Col>

                    {/* <div className="fw-800">
              <h6>Subject: Request For Premium Paid Certificate</h6>
            </div> */}
                    {/* <Divider></Divider> */}
                    {/* <Tabs>
          <TabPane tab={"Mail From Customer"} key="1">
  <ReactQuill className="quill-container" modules={module} theme="snow" value={value} />
              
          </TabPane>
          <TabPane tab={"Response For Customer"} key="2">
          <div className="sent-template mb-16">
          <Form.Item
                  label= "Sent Template"
                  name="sentTemplate"
                  className="inputs-label mb-0"
                >
                  <Select
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
                      ]}
                  ></Select>
                </Form.Item>
          </div>
              <ReactQuill className="quill-container" modules={module} theme="snow" value={value} />
        
          <div className="float-right nlp-btn">
              <Button type="primary" htmlType="submit" className="primary-btn">
                Send
              </Button>
            </div>

          </TabPane>
          </Tabs> */}

                    {ResForCustomer && (
                      <>
                        <Col
                          xs={24}
                          sm={24}
                          md={24}
                          lg={24}
                          xxl={24}
                          className="mb-16"
                        >
                          <div>
                            <h6 className="fw-700">
                              Response For Customer (Un Verified Email)
                            </h6>
                            <div
                              className="sent-templates mb-16"
                              style={{ display: "flex" }}
                            >
                              <Form.Item
                                label="Template"
                                name="sentTemplate"
                                className="inputs-label mb-0"
                              >
                                <Select
                                  onChange={(value) => {
                                    sentTemplate(value);
                                  }}
                                  className="cust-input"
                                  maxLength={100}
                                  placeholder="Select a Sent Template"
                                  options={[
                                    // {
                                    //   value: "unregistered",
                                    //   label: "UnRegistered Mail",
                                    // },
                                    {
                                      value: "UnregisteredMailwithValidPolicy",
                                      label: "Valid Policy",
                                    },
                                    {
                                      value:
                                        "UnregisteredMailwithInValidPolicy",
                                      label: "In Valid Policy",
                                    },
                                    {
                                      value: "ForwardtoInternalTeam",
                                      label: "Forward to Internal Team",
                                    },
                                    {
                                      value: "GeneralQuery",
                                      label: "General Query",
                                    },
                                    {
                                      value: "ComplaintVerification",
                                      label: "Complaint Verification",
                                    },
                                  ]}
                                ></Select>
                              </Form.Item>
                              {/* <Form
            form={form4}
            colon={false}
            autoComplete="off"
          > */}
                              <Form.Item
                                name="policyNo"
                                label="Policy No"
                                className="inputs-label mb-0"
                                rules={[
                                  {
                                    required: true,
                                    message: "Policy No is required",
                                  },
                                  {
                                    pattern: /^\d{8}$/, // Regular expression to allow exactly 9 digits
                                    message:
                                      "Policy No must be exactly 8 digits",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="Enter Policy No"
                                  className="cust-input modal-input"
                                  maxLength={8} // Max length set to 9
                                  onKeyPress={(event) => {
                                    if (!/^\d$/.test(event.key)) {
                                      event.preventDefault(); // Prevent non-numeric input
                                    }
                                  }}
                                  value={PolicyNumber}
                                  onChange={(e) =>
                                    setPolicyNumber(e.target.value)
                                  }
                                  onBlur={handlePolicyBlur}
                                />
                              </Form.Item>
                              {/* </Form> */}
                            </div>
                            <ReactQuill
                              className="quill-container"
                              modules={{ toolbar: false }}
                              theme="snow"
                              value={ResponseForCustomer}
                              onChange={(e) => editValueHandler(e)}
                            />
                            {/* <Form.Item
                  label= ""
                  name="ResponseForCustomer"
                  className="inputs-label mb-0"
                  rules={[{ required: true, message: 'Response For Customer  Required' }]}
                >
              
              </Form.Item> */}
                          </div>
                        </Col>
                      </>
                    )}
                    {closedTicketStatus &&
                      closedTicketEmailBody !== undefined && (
                        <Col
                          xs={24}
                          sm={24}
                          md={24}
                          lg={24}
                          xxl={24}
                          className="mb-16"
                        >
                          <div>
                            <ReactQuill
                              className="quill-container"
                              theme="snow"
                              readOnly={true}
                              value={closedTicketEmailBody}
                            />
                          </div>
                        </Col>
                      )}

                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={24}
                      xxl={24}
                      className="mb-16"
                    >
                      <div>
                        <h6 className="">
                          Email From Customer @ {convertDate(receivedDateTime)}{" "}
                          in {to}
                        </h6>
                        <ReactQuill
                          className="quill-container"
                          theme="snow"
                          value={EmailFromCustomer}
                          readOnly={true}
                        />
                      </div>
                    </Col>
                    {ResForCustomer && (
                      <>
                        <div className="float-right nlp-btn">
                          <Button
                            type="primary"
                            htmlType="submit"
                            className="primary-btn"
                            onClick={SendFalconideMail}
                            disabled={!PolicyNumber}
                          >
                            Send
                          </Button>
                        </div>
                      </>
                    )}
                  </Form>

                  {/* </Card> */}
                </>
              )}
            </Col>
          </Row>
        </Spin>
      </div>

      {/* Modal for image and PDF preview */}
      <Modal
        open={previewVisible}
        title={previewFile?.name}
        onCancel={handlePreviewCancel}
        footer={null}
      >
        {previewFile && (
          <img
            alt={previewFile.name}
            style={{ width: "100%" }}
            src={URL.createObjectURL(previewFile.originFileObj)}
          />
        )}
      </Modal>

      <Drawer
        title="Policy Details"
        placement={"left"}
        width={500}
        onClose={onClose}
        open={headerDetailsOpen}
        maskClosable={false}
        closeIcon={
          <Tooltip title="Close">
            <img src={CloseIcon} alt="" />
          </Tooltip>
        }
      >
        <div>
          <table className="table table-bodered Profile">
            <tbody>
              <tr>
                <td style={{ width: "200px" }}>Policy No</td>
                <td>{searchPolicyData[0]?.policyNo}</td>
              </tr>
              <tr>
                <td>Application No </td>
                <td>{searchPolicyData[0]?.applicationNo}</td>
              </tr>
              <tr>
                <td> LA Name</td>
                <td>{searchPolicyData[0]?.laName}</td>
              </tr>
              <tr>
                <td> PO Name</td>
                <td>{searchPolicyData[0]?.poName}</td>
              </tr>
              <tr>
                <td>Customer Type </td>
                <td> {data?.planAndStatus?.customerType || "-"} </td>
              </tr>
              <tr>
                <td>Plan Name </td>
                <td> {data?.planAndStatus?.planName || "-"}</td>
              </tr>
              <tr>
                <td>Policy Status</td>
                <td>
                  {getPremiumStatus(
                    data?.planAndStatus?.policyStatus,
                    POLICYSTATUSLIST
                  )}
                </td>
              </tr>
              <tr>
                <td>Premium Status</td>
                <td>
                  {getPremiumStatus(
                    data?.planAndStatus?.premiumStatus,
                    PREMIUMSTATUSLIST
                  )}
                </td>
              </tr>
              <tr>
                <td>Sum Assured </td>
                <td>
                  {" "}
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
                </td>
              </tr>
              <tr>
                <td>PT </td>
                <td>{data?.saDetails?.pt || "-"}</td>
              </tr>
              <tr>
                <td>RCD </td>
                <td>{convertDate(data?.saDetails?.rcd) || "-"}</td>
              </tr>
              <tr>
                <td> Assignment</td>
                <td>{data?.saDetails?.assignment || "N"}</td>
              </tr>
              <tr>
                <td>Premium Amount </td>
                <td>
                  {" "}
                  {(data?.premiumDetails?.modelPremiumAmount && (
                    <NumericFormat
                      value={data?.premiumDetails?.modelPremiumAmount}
                      decimalSeparator="."
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={0}
                    />
                  )) ||
                    "-"}
                </td>
              </tr>
              <tr>
                <td>PPT </td>
                <td>{data?.premiumDetails?.ppt || "-"}</td>
              </tr>
              <tr>
                <td>PTD </td>
                <td>{convertDate(data?.premiumDetails?.ptd) || "-"}</td>
              </tr>
              <tr>
                <td>Mode </td>
                <td>{billFreq[data?.premiumDetails?.billFreq] || "-"}</td>
              </tr>
              <tr>
                <td>Branch </td>
                <td>{data?.identifiers?.branchName || "-"}</td>
              </tr>
              <tr>
                <td>Channel </td>
                <td>{data?.salesDetails?.channel || "-"}</td>
              </tr>
              <tr>
                <td>Agent Name </td>
                <td>{data?.salesDetails?.agentName || "-"}</td>
              </tr>
              <tr>
                <td> Orphan Flag</td>
                <td>{data?.salesDetails?.orphanFlag || "-"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Drawer>

      <Drawer
        title="Email From Customer"
        placement={"left"}
        width={720}
        onClose={onClose}
        open={MailOpen}
        maskClosable={false}
        closeIcon={
          <Tooltip title="Close">
            <img src={CloseIcon} alt="" onClick={() => setMailOpen(false)} />
          </Tooltip>
        }
      >
        <div>
          <Form
            form={form}
            name="wrap"
            labelCol={{
              flex: "10%",
            }}
            labelAlign="left"
            labelWrap
            wrapperCol={{
              flex: 1,
            }}
            colon={false}
            onFinish={sendEmailSMTP}
            autoComplete="off"
          >
            <Col xs={24} sm={24} md={24} lg={24} xxl={24} className="mb-8">
              <Form.Item
                label="From"
                name="from"
                className="inputs-label  mb-0"
                rules={[
                  { required: true, message: "Please enter the recipient(s)!" },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Subject"
                  value={state?.torecipients}
                />

                {/* <Select
         className="send-mails"
      mode="multiple"
      allowClear
      style={{
        width: '100%',
      }}
      placeholder="Recipients"
     defaultValue={state?.torecipients}
      onChange={handleChange}
      options={ccMailLU}
    /> */}
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xxl={24} className="mb-8">
              <Form.Item label="Cc" name="cc" className="inputs-label mb-0">
                <Input
                  type="text"
                  placeholder="Cc"
                  value={state?.ccrecipients}
                />
                {/* <Select
      mode="multiple"
      allowClear
      style={{
        width: '100%',
      }}
      placeholder="CC"
     defaultValue={state?.ccrecipients}
      onChange={handleChange}
      options={ccMailLU}
    /> */}
              </Form.Item>
            </Col>
            {/* <Col xs={24} sm={24} md={24} lg={24} xxl={24} className="mb-16">
                <Form.Item label="Bcc" name="bcc" className="inputs-label mb-0">
                <Select
      mode="multiple"
      allowClear
      style={{
        width: '100%',
      }}
      placeholder="BCC"
      onChange={handleChange}
      options={ccMailLU}
    />
      </Form.Item>
                </Col> */}
            <Col xs={24} sm={24} md={24} lg={24} xxl={24} className="mb-8">
              <Form.Item
                label="Subject"
                name="subject"
                className="inputs-label mb-0"
                rules={[
                  { required: true, message: "Please enter the subject!" },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Subject"
                  value={state?.subject}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xxl={24} className="mb-8">
              <Form.Item
                label="Attachments"
                name="Attachments"
                className="inputs-label mb-0"
                //  rules={[{ required: true, message: 'Please enter the subject!' }]}
              >
                <p>
                  {/* <Upload  {...uploadProps}
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG"
                      fileList={uploadFiles}
                      >
                 <i
                  class="bi bi-paperclip text-color c-pointer fs-20"
                  style={{ width: "20px" }}
                ></i>
               </Upload> */}

                  <Upload
                    multiple={true}
                    fileList={fileList}
                    beforeUpload={beforeUpload}
                    onChange={handleChange1}
                    onRemove={handleRemove}
                    customRequest={customRequest}
                    onPreview={handlePreview}
                    showUploadList={false}
                  >
                    {fileList.length >= 5 ? null : uploadButton}
                  </Upload>
                  {fileList.length > 0 && (
                    <List
                      style={{ marginTop: 16 }}
                      itemLayout="horizontal"
                      dataSource={fileList}
                      renderItem={(file) => (
                        <List.Item
                          actions={[
                            // <Button type="link" onClick={() => handlePreview(file)}>
                            //   Preview
                            // </Button>,
                            <Button
                              type="link"
                              onClick={() => handleDownload(file)}
                            >
                              <DownloadOutlined /> Download
                            </Button>,
                            <Button
                              type="link"
                              danger
                              onClick={() => handleRemove(file)}
                            >
                              <DeleteOutlined /> Delete
                            </Button>,
                          ]}
                        >
                          <List.Item.Meta
                            title={file.name}
                            description={`File Size: ${(
                              file.size / 1024
                            ).toFixed(2)} KB`}
                          />
                        </List.Item>
                      )}
                    />
                  )}
                </p>
              </Form.Item>
            </Col>

            {/* <div className="fw-800">
              <h6>Subject: Request For Premium Paid Certificate</h6>
            </div> */}
            {/* <Divider></Divider> */}
            {/* <Tabs>
          <TabPane tab={"Mail From Customer"} key="1">
  <ReactQuill className="quill-container" modules={module} theme="snow" value={value} />
              
          </TabPane>
          <TabPane tab={"Response For Customer"} key="2">
          <div className="sent-template mb-16">
          <Form.Item
                  label= "Sent Template"
                  name="sentTemplate"
                  className="inputs-label mb-0"
                >
                  <Select
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
                      ]}
                  ></Select>
                </Form.Item>
          </div>
              <ReactQuill className="quill-container" modules={module} theme="snow" value={value} />
        
          <div className="float-right nlp-btn">
              <Button type="primary" htmlType="submit" className="primary-btn">
                Send
              </Button>
            </div>

          </TabPane>
          </Tabs> */}

            {ResForCustomer && (
              <>
                <Col xs={24} sm={24} md={24} lg={24} xxl={24} className="mb-16">
                  <div>
                    <h6 className="fw-700">Response For Customer</h6>
                    <div className="sent-template mb-16">
                      <Form.Item
                        label="Sent Template"
                        name="sentTemplate"
                        className="inputs-label mb-0"
                      >
                        <Select
                          onChange={(value) => {
                            sentTemplate(value);
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
                    </div>
                    <ReactQuill
                      className="quill-container"
                      modules={module}
                      theme="snow"
                      value={ResponseForCustomer}
                    />
                    {/* <Form.Item
                  label= ""
                  name="ResponseForCustomer"
                  className="inputs-label mb-0"
                  rules={[{ required: true, message: 'Response For Customer  Required' }]}
                >
              
              </Form.Item> */}
                  </div>
                </Col>
              </>
            )}
            <Col xs={24} sm={24} md={24} lg={24} xxl={24} className="mb-16">
              <div>
                <h6 className="">
                  Email From Customer @ {convertDate(receivedDateTime)} in {to}
                </h6>
                <ReactQuill
                  className="quill-container"
                  theme="snow"
                  value={EmailFromCustomer}
                  readOnly={true}
                />
              </div>
            </Col>
            {ResForCustomer && (
              <>
                <div className="float-right nlp-btn">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="primary-btn"
                  >
                    Send
                  </Button>
                </div>
              </>
            )}
          </Form>
        </div>
      </Drawer>

      <Drawer
        title=""
        placement={"right"}
        width={300}
        onClose={onClose}
        open={notificationOpen}
        maskClosable={false}
        closeIcon={
          <Tooltip title="Close">
            <img
              src={CloseIcon}
              alt=""
              onClick={() => setNotificationOpen(false)}
            />
          </Tooltip>
        }
      >
        <div>
          <Row gutter={[16, 16]}>
            <Col xs={12} sm={12} md={12} lg={8} xxl={8} className="mb-8">
              <Widgets
                store={store}
                selectedCallTypeId={selectedCallTypeId}
                selectedSubTypeId={selectedSubTypeId}
                SelectedPolicy={SelectedPolicy}
                searchPolicyData={searchPolicyData}
                notificationOpen={notificationOpen}
              />
            </Col>
          </Row>
        </div>
      </Drawer>

      {showAlert && (
        <PopupAlert
          alertData={alertData}
          title={alertTitle}
          navigate={navigateTo}
          setShowAlert={setShowAlert}
        ></PopupAlert>
      )}

      <Modal
        title="Add Missing Policy"
        open={isAddMorePolicy}
        destroyOnClose={true}
        width={550}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => handleAddClose()}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <Form
          form={form3}
          name="wrap"
          labelCol={{
            flex: "30%",
          }}
          labelAlign="left"
          labelWrap
          wrapperCol={{
            flex: 1,
          }}
          colon={false}
          autoComplete="off"
        >
          <Row gutter={[12, 12]} className="mb-16">
            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                name="policyNo"
                label="Policy No"
                className="inputs-label mb-0"
                rules={[
                  {
                    required: true,
                    message: "Policy No is required",
                  },
                  {
                    pattern: /^\d{8}$/, // Regular expression to allow exactly 9 digits
                    message: "Policy No must be exactly 9 digits",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Policy No"
                  className="cust-input modal-input"
                  maxLength={8} // Max length set to 9
                  onKeyPress={(event) => {
                    if (!/^\d$/.test(event.key)) {
                      event.preventDefault(); // Prevent non-numeric input
                    }
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item className="mb-0">
                <div className="d-flex justify-end">
                  <Button
                    type="primary"
                    className="primary-btn mr-12"
                    htmlType="submit"
                    onClick={handlesearch}
                  >
                    Search
                  </Button>{" "}
                </div>
              </Form.Item>
            </Col>
            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                name="senderMailId"
                label="Sender Mail ID"
                className="inputs-label mb-0"
              >
                <Input
                  placeholder="Enter Sender Mail ID"
                  className="cust-input modal-input"
                  maxLength={100}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item name="name" label="Name" className="inputs-label mb-0">
                <Input
                  placeholder="Enter Name"
                  className="cust-input modal-input"
                  maxLength={100}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                name="product"
                label="Product"
                className="inputs-label mb-0"
              >
                <Input
                  placeholder="Enter Product"
                  className="cust-input modal-input"
                  maxLength={100}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item className="mb-0">
                <div className="d-flex justify-end">
                  <Button
                    type="primary"
                    className="primary-btn mr-12"
                    htmlType="submit"
                    onClick={handleAddPolicy}
                  >
                    Add Policy
                  </Button>{" "}
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default EmailManagementView;
