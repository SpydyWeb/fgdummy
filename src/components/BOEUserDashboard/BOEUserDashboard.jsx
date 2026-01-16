import React, { useEffect, useState } from "react";
import {
  Spin,
  message,
  Row,
  Col,
  Form,
  DatePicker,
  Button,
  Input,
  Table,
  Space,
  Card,
  Select,
  Modal,
  Checkbox,
  Tooltip,
} from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import apiCalls from "../../api/apiCalls";
import { NumericFormat } from "react-number-format";
import { connect } from "react-redux";
import { sentDetailsObj } from "../../reducers/policyDetailsReducer";
import { useData } from "../../reducers/DataContext";
import { useSelector } from "react-redux";
import CloseIcon from "../../assets/images/close-icon.png";
import { useLocation } from "react-router-dom";
import { filterOption } from "../../utils/HelperUtilites";
import ReusableTable from "../Common/ReusableTable";
const BOEUserDashboard = (props) => {
  const loggedUser = useSelector((state) => state?.userProfileInfo?.profileObj);
  const { sharedData } = useData();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { TextArea } = Input;
  const { Option } = Select;
  const [emailExist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTatData, setIsTatData] = useState({});
  const [data, setData] = useState([]);
  const dateFormat = "DD/MM/YYYY";
  const [record, setRecord] = useState();
  const [tableKey, setTableKey] = useState(0); // Key to force remount
  const [selectionList, setSelectionList] = useState([]);
  const [showTotalPages, setShowTotalpages] = useState(null);
  const [countData, setCountData] = useState([]);
  const [usersListLU, setUsersListLU] = useState([]);
  const [Ruless, setRuless] = useState();
  const [CALL_TyPES, setCALL_TyPES] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [requestModeLU, setRequestModeLU] = useState([]);
  const [subTypeLU, setSubTypeLU] = useState(null);
  const [SelectedSubTypeVal, setSelectedSubTypeVal] = useState(null);
  const [selectedCallType, setSelectedCallType] = useState("");
  const [selectedSubTypeId, setSelectedSubTypeId] = useState("");
  const [selectedSubType, setSelectedSubType] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isLeadFor, setIsLeadFor] = useState(false);
  const [leadForValue, setLeadForValue] = useState(false);
  const [isAdvanceSearchModalOpen, setIsAdvanceSearchModalOpen] =
    useState(false); //BOEUSER COde START
  const [isFollowUpListModal, setIsFollowUpListModal] = useState(false);
  const [followUpData, setFollowUpData] = useState([]);
  const [isRandomCallModal, setIsRandomCallModal] = useState(false);
  const [isFollowUpsLoader, setIsFollowUpsLoader] = useState(false);
  const [isClosedSRCheckBox, setIsClosedSRCheckBox] = useState(false);
  const [isPendingsr, setIsPendingsr] = useState(false);
  const [selectedPending, setSelectedPending] = useState(null);
  const [selectedInternal, setSelectedInternal] = useState(null);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const location = useLocation();
  const user = location.state?.user;
  const dataPendingSR = [
    {
      key: "1",
      status: "Within TAT",
      value: "XX",
    },
    {
      key: "2",
      status: "Beyond TAT",
      value: "XX",
    },
  ];

  const dataInternalRequirement = [
    {
      key: "1",
      status: "Within TAT",
      value: "XX",
    },
    {
      key: "2",
      status: "Beyond TAT",
      value: "XX",
    },
  ];

  const dataFollowUps = [
    {
      key: "1",
      status: "Due Today",
      value: "XX",
      //  render: (text, record) => <a href={record.url} target="_blank" rel="noopener noreferrer">{text}</a>,  // Render as link
    },
    {
      key: "2",
      status: "Open",
      value: "XX",
    },
  ];
  const followUpColumnsList = [
    {
      title: "",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "",
      dataIndex: "value",
      // key: 'value',
      render: (_, record) => (
        <Space size="middle" className="text-red">
          <a>
            {" "}
            <span onClick={() => setIsFollowUpListModal(true)}>
              {record?.value}
            </span>
          </a>
        </Space>
      ),
    },
  ];
  const disableFutureDates = (current) => {
    // Disable future dates: Allow only dates up to today
    return current && current > moment().endOf("day");
  };

  const columnsList = [
    {
      title: "",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "",
      dataIndex: "value",
      // key: 'value',
      render: (_, record) => (
        <Space size="middle" className="text-red">
          <a>
            {" "}
            <span onClick={() => handleAction(record)}>{record?.value}</span>
          </a>
        </Space>
      ),
    },
  ];

  const ToDate = form.getFieldValue("ToDate");
  const FromDate = form.getFieldValue("FromDate");

  const statusLU = [
    { label: "Closed", value: "closed" },
    { label: "Pending", value: "pending" },
    { label: "Closed With Requirements", value: "closedwithrequirements" },
    { label: "Failed", value: "failed" },
  ];
  const leadForLu = [
    { label: "Life", value: "life" },
    { label: "General Insurance", value: "gi" },
    { label: "Group Insurance", value: "group" },
    { label: "NA", value: "na" },
  ];
  const potentialLeadLu = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];
  const [isLeadForDisabled, setIsLeadForDisabled] = useState(false);
  const [leadForOptions, setLeadForOptions] = useState(leadForLu); // Initial options

  const handlePotentialLeadChange = (value) => {
    if (value === "no") {
      setIsLeadForDisabled(true);
      form.setFieldsValue({ leadFor: "na" }); // Set "Lead For" to "NA"
      setLeadForOptions([{ label: "NA", value: "na" }]); // Only "NA" option
    } else {
      setIsLeadForDisabled(false);
      form.setFieldsValue({ leadFor: undefined }); // Clear "Lead For" field
      setLeadForOptions([
        { label: "Life", value: "life" },
        { label: "General Insurance", value: "gi" },
        { label: "Group Insurance", value: "group" },
      ]); // Options for "yes"
    }
  };
  // const handleAction = (item) => {

  //   navigate("/policydetails",{ state: {serialNo:item?.serviceNo, isPOS:true,policyNo: item?.policyNo, dob: item?.dob}});
  // };
  const handleAction = async (item) => {
    var obj = {
      applicationNo: item?.applicationNo,
      callTypeName: item?.callTypeName,
      subTypeName: item?.subTypeName,
      dob: item?.dob,
      policyNo: item?.policyNo,
      source: item?.source,
      tagName: item?.transectionData,
      isBOE: true,
      isPOS: false,
      serialNo: item.serviceNo,
      isInternalFlow: true,
    };
    setIsLoading(false);
    navigate("/policydetails", { state: obj });
  };

  const handlePendingData = (selectedVal) => {
    searchData(selectedVal);
    setIsPendingsr(true);
  };
  const handleInternalRequirementData = (selectedVal) => {
    searchData(selectedVal);
    setIsPendingsr(false);
  };

  function getRequestModeName(reqMode) {
    const mode = requestModeLU?.find((mode) => mode.value === reqMode);
    return mode ? mode.label : ""; // Return mode name or "Unknown" if not found
  }

  const defaultColumns = [
    //     {
    //       title: "ACTION",
    //       dataIndex: "action",
    //       render: (_, record) => (
    //         <Space size="middle">
    // <a className="editIcon"> <i  onClick={() => handleAction(record)} className="bi bi-pencil-square"></i></a>
    //         </Space>
    //       ),
    //     },
    {
      title: "Ticket No",
      dataIndex: "serviceNo",
      key: "serviceNo",
      render: (_, record) => (
        <Space size="middle">
          <a>
            <b
              onClick={isPendingsr ? undefined : () => handleAction(record)}
              className="gridLink"
            >
              {record?.serviceNo}
            </b>
          </a>
        </Space>
      ),
    },
    {
      title: "Call Log Date",
      dataIndex: "date",
      showSorterTooltip: false,
      sorter: {
        compare: (a, b) => moment(a.date).diff(moment(b.date)),
      },
      render: (_, record) => (
        <Space size="middle">
          {moment(record.date).local().format("DD/MM/YYYY hh:mm A")}
        </Space>
      ),
    },
    //   const commentsData = props?.details?.comments?.length > 0 && props?.details?.comments?.map(item => {
    //     // Ensure the date is valid and converted to local time
    //     const localTime = moment(item.createdOn, moment.ISO_8601).isValid()
    //         ? moment(item.createdOn).local().format("DD/MM/YYYY hh:mm A")
    //         : "Invalid Date";

    //     return {
    //         userName: item.userName,
    //         tagName: item.comments, // Assuming 'item.comments' holds the actual comment text
    //         userRole: item.roleName,
    //         createdOn: localTime // Show the correct local time
    //     };
    // });
    {
      title: "Policy Number",
      dataIndex: "policyNo",
      key: "policyNo",
      showSorterTooltip: false,
      sorter: {
        compare: (a, b) => a.policyNo - b.policyNo,
      },
    },
    {
      title: "Call Type",
      dataIndex: "callTypeName",
      key: "callTypeName",
    },
    {
      title: "Sub Type",
      dataIndex: "subTypeName",
      key: "subTypeName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Customer Name",
      dataIndex: "proposerName",
      key: "proposerName",
    },
    {
      title: "Mode",
      dataIndex: "mode",
      render: (_, record) => (
        <Space size="middle">{getRequestModeName(record?.reqMode)}</Space>
      ),
      key: "",
    },
    {
      title: "Ageing",
      dataIndex: "ageing",
      key: "ageing",
    },
    {
      title: "Assigned To",
      dataIndex: "assignedToName",
      key: "assignedToName",
    },
    // {
    //   title: "Logged by",
    //   dataIndex: "createdByRef",
    //   key: 'createdByRef',
    // }
  ];
  useEffect(() => {
    getCTST();
    searchData();
    setSelectedCheckbox("pendingwithintat");
  }, [user]);

  let count =
    countData &&
    countData.reduce((acc, obj) => {
      if (
        obj.status === "CLOSED" ||
        obj.status === "PENDING" ||
        obj.status === "REJECTED"
      ) {
        return acc + obj.count;
      } else {
        return acc;
      }
    }, 0);

  const columns = defaultColumns?.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        //handleSave,
      }),
    };
  });

  const renderTableData = () => {
    return data?.map((value, index) => {
      const rejectStatus =
        value.status === "REJECTED" ? "Closed with Requirements" : "PENDING";
      const {
        srvReqRefNo,
        date,
        policyNo,
        applicationNo,
        callTypeName,
        subTypeName,
        poName,
        laName,
        policyStatus,
        proposerName,
        sumAssured,
        premiumAmt,
        agentName,
        pinCode,
        pan,
        mobileNo,
        role,
        caseType,
      } = value;
      return (
        <>
          <tr key={index}>
            <td>
              <a className="editIcon">
                {" "}
                <i
                  onClick={() => handleAction(value)}
                  className="bi bi-pencil-square"
                ></i>
              </a>
            </td>
            <td>{srvReqRefNo}</td>
            <td>{date}</td>
            <td>{policyNo}</td>
            <td>{callTypeName}</td>
            <td>{subTypeName}</td>
            <td>{rejectStatus}</td>
            <td></td>
            <td>{proposerName}</td>
            <td>
              {sumAssured && (
                <NumericFormat
                  value={sumAssured}
                  decimalSeparator="."
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={8}
                />
              )}
            </td>
            <td>
              {premiumAmt && (
                <NumericFormat
                  value={premiumAmt}
                  decimalSeparator="."
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={8}
                />
              )}
            </td>
            <td>{agentName}</td>
            <td>{pinCode}</td>
            <td>{pan}</td>
          </tr>
        </>
      );
    });
  };

  const searchData = async (selectedVal, includeCloseSR) => {
    setIsAdvanceSearchModalOpen(false);
    setIsLoading(true);
    const formData = form.getFieldsValue();
    const fromDate = formData.FormDate
      ? formData.FormDate.format("YYYY-MM-DD")
      : "";
    const toDate = formData.ToDate ? formData.ToDate.format("YYYY-MM-DD") : "";
    const PolicyNo = formData.PolicyNo
      ? formData.PolicyNo.toLowerCase().trim()
      : "";

    // if(!fromDate && !toDate && !PolicyNo){        //02-04-24 Naga Raju K
    //     message.error({
    //       content:"Please Enter Date or Policy No",
    //       className: "custom-msg",
    //       duration: 2,
    //     });
    //     return
    //   }

    //   if(PolicyNo){
    //     setRuless(PolicyNo ? [{ required: false, message: 'Select Date' }] : [{ required: true, message: 'Select Date' }]);
    //   }

    // getBoeData(formData,fromDate,toDate,searchText);
    let obj = {
      fromDate: fromDate || "",
      toDate: toDate || "",
      policyNumber: PolicyNo,
      userId: loggedUser.userName,
      role: loggedUser.role,
      callType: selectedCallType || "",
      subType: formData?.subType || "",
      mode: formData?.mode,
      status: formData?.status == undefined ? "PENDING" : formData?.status,
      ageing: formData?.ageing,
      assignedTo: formData?.assignedTo,
    };

    const response = await apiCalls.getBOEUserDashboardLatest(
      obj,
      isClosedSRCheckBox
    );
    if (response?.status === 200) {
      setIsDataLoading(false);
      setIsTatData(response?.data);
      let filteredData = response?.data?.pOSLists;

      if (selectedVal === "pendingwithintat") {
        filteredData = filteredData?.filter(
          (item) => item?.dashboardTatInfo === "WithinTAT_SameUserCount"
        );
      } else if (selectedVal === "pendingbeyondtat") {
        filteredData = filteredData?.filter(
          (item) => item?.dashboardTatInfo === "BeyondTAT_SameUser"
        );
      } else if (selectedVal === "internalwithintat") {
        filteredData = filteredData?.filter(
          (item) => item?.dashboardTatInfo === "WithinTAT_DifferentUser"
        );
      } else if (selectedVal === "internalbeyondtat") {
        filteredData = filteredData?.filter(
          (item) => item?.dashboardTatInfo === "BeyondTAT_DifferentUser"
        );
      }

      setData(filteredData);
      setIsLoading(false);
    } else {
      setData({});
      setIsDataLoading(false);
      setIsLoading(false);
      message.destroy();
      message.error({
        content:
          response?.data?.responseBody?.errormessage ||
          "Something went wrong please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  };

  const handleSelection = (type) => {
    setSelectedCheckbox(type); // Ensure only one checkbox is selected
    if (type.includes("pending")) {
      handlePendingData(type);
    } else if (type.includes("internal")) {
      handleInternalRequirementData(type);
    }
  };

  const getDashboardFollowUpData = async (selectedFollowUpVal) => {
    setIsFollowUpListModal(true);
    setIsFollowUpsLoader(true);
    const response = await apiCalls.getDashboardFollowUps(selectedFollowUpVal);
    if (response?.data) {
      setFollowUpData(response?.data);
      setIsFollowUpsLoader(false);
    } else {
      message.destroy();
      setFollowUpData([]);
      setIsFollowUpsLoader(false);
      message.error({
        content:
          response?.data?.responseBody?.errormessage ||
          "Something went wrong please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  };

  const SaveFollowUpsData = async (selectedObj) => {
    setIsFollowUpListModal(true);
    setIsFollowUpsLoader(true);
    selectedObj.CompleteByDt = new Date();
    const response = await apiCalls.SaveFollowUps(selectedObj);
    if (response?.data) {
      message.destroy();
      message.success({
        content: "Follow Up Request Closed!.",
        className: "custom-msg",
        duration: 2,
      });
      setIsFollowUpsLoader(false);
      setIsFollowUpListModal(false);
    } else {
      message.destroy();
      setIsFollowUpsLoader(false);
      setIsFollowUpListModal(true);
      message.error({
        content:
          response?.data?.responseBody?.errormessage ||
          "Something went wrong, please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  };

  const handleMovetoSearch = () => {
    navigate("/advancesearch");
  };

  const getCTST = () => {
    let obj = {
      MasterRequest: ["CALL_TYP", "SUB_TYP", "REQST_MODE"],
    };
    let CTST = apiCalls.ctst(obj);
    CTST.then((val) => {
      setMasterData(val.data);
      // Use the function for each set of data
      const transformedData = transformData(val.data, "CALL_TYP");
      const transformedSubType = transformData(val.data, "SUB_TYP");
      const rquestModeData = transformData(val.data, "REQST_MODE");
      //setCALL_TyPES(transformedData);
      setCALL_TyPES(transformedData);
      setRequestModeLU(rquestModeData);
      //setIsLoading(false);
    }).catch((err) => {
      //setIsLoading(false);
      message.destroy();
      message.error({
        content: err?.data?.responseBody?.errormessage,
        className: "custom-msg",
        duration: 2,
      });
    });
  };
  // Define a reusable function for data transformation
  const transformData = (data, keyy) => {
    const filteredData = data?.filter((ele) => ele.key === keyy);
    return filteredData[0]?.value?.map((item, index) => {
      let obj;

      if (keyy === "CALL_TYP") {
        obj = {
          ...item,
          label: item.mstDesc,
          value: item.mstID,
          //isCallType:true
        };
      } else if (keyy === "SUB_TYP") {
        obj = {
          ...item,
          label: item.mstDesc,
          value: item.mstID,
          //isSubType:true
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

  const onSearch = (e) => {};

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
    if (
      props?.customerData?.isPOS ||
      props?.isEmailManagement ||
      props?.isShowAllTicketsData ||
      props?.customerData?.isBOE
    ) {
      form.setFieldsValue({ callType: value, subType: subType });
      handleSubTypeChange(subType, transformedData);
    }
  };

  const handleCallTypeChange = (value, obj) => {
    if (obj?.isCallType) {
      setSelectedCallType(obj.mstID);
      form.setFieldsValue({ subType: null });
      setSubTypeLU(null);
      setSelectedSubType(null);
      subTypeDropdown(obj.mstID);
    } else {
      let CALL_TYP =
        masterData?.length > 0
          ? masterData?.filter((ele) => ele.key === "CALL_TYP")
          : "";
      let SUB_TYP =
        masterData?.length > 0
          ? masterData?.filter((ele) => ele.key === "SUB_TYP")
          : "";
      let transformedData = SUB_TYP[0]?.value
        .filter((ele) => ele.mstParentID === obj?.mstID)
        .map((ele) => ({
          ...ele,
          label: ele.mstDesc,
          value: ele.mstID,
        }));
      setSubTypeLU(transformedData);
      let slectedCALL_TYP = CALL_TYP[0].value?.find((ele) => {
        return ele.mstID === obj?.mstID;
      });
      setSelectedCallType(+slectedCALL_TYP?.mstID);
      // subTypeDropdown(obj.mstParentID);
      setSelectedSubTypeId(obj?.mstID);
      transformedData?.map((key, index) => {
        if (key.mstID === obj?.mstID) {
          const modifiedDesc = key.mstDesc?.replace(/[^\w]/g, "").toLowerCase();
          setSelectedSubType(modifiedDesc);
          setSelectedSubTypeVal(key.mstDesc);
        }
      });

      form.setFieldsValue({ callType: slectedCALL_TYP?.mstDesc });
    }
  };

  const handleSubTypeChange = (value, getSubLU) => {
    props?.setSubTypeId(value);
    setSelectedSubTypeId(value);
    let subTypeData = subTypeLU?.length > 0 ? subTypeLU : getSubLU;
    subTypeData?.map((key, index) => {
      if (key.mstID === value) {
        const modifiedDesc = key.mstDesc?.replace(/[^\w]/g, "").toLowerCase();
        setSelectedSubType(modifiedDesc);
        setSelectedSubTypeVal(key.mstDesc);
        props?.setSelectedSubTypeVall(key.mstDesc);
      }
    });
    //}
  };

  const handleRandomCall = () => {
    setIsRandomCallModal(true);
    // form.setFieldsValue({
    //   'receiviedOn': "  ",
    //   "name": "",
    //   "phone":"",
    //   "potentialLead": "yes",
    //   "leadFor": "life",
    //   "comments":  "",
    // })
  };
  const handleSaveRandomCall = async (values) => {
    let obj = {
      RandomCallID: 0,
      ReceivedOn: values?.receiviedOn || new Date(),
      NameOfPerson: values?.name,
      PhoneNo: values?.phone,
      PotentialLead: values?.potentialLead === "yes" ? true : false,
      LeadForGILife:
        values?.leadFor === "life" ? "LifeInsurance" : "GeneralInsurance",
      Comments: values?.comments,
      UsrID: loggedUser.userName,
      RoleID: loggedUser.role,
    };
    const response = await apiCalls.SaveRandomCallInfo(obj);
    if (response?.data) {
      setIsRandomCallModal(false);
      message.destroy();
      message.success({
        content: "Random call saved Successfully!.",
        className: "custom-msg",
        duration: 2,
      });
      form.setFieldsValue({
        receiviedOn: "",
        name: "",
        phone: "",
        potentialLead: "yes",
        leadFor: "life",
        comments: "",
      });

      // setIsFollowUpsLoader(false);
    } else {
      setIsRandomCallModal(true);
      message.destroy();
      // setIsFollowUpsLoader(false);
      message.error({
        content:
          response?.data?.responseBody?.errormessage ||
          "Something went wrong, please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  };

  const validatePhoneNumber = (_, value) => {
    if (emailExist) {
      return Promise.reject("Mobile number already exists");
    } else if (value && !/^[6-9]\d{9}$/.test(value)) {
      return Promise.reject(
        "Mobile number should start with 6,7,8 or 9 and must be 10 digits"
      );
    } else if (
      value &&
      !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(value)
    ) {
      return Promise.reject("Invalid mobile number");
    }
    // else if(isExistingMobileNumber === value) {
    //   return Promise.reject("New Details cannot be same as Existing Details");
    // }
    else {
      return Promise.resolve();
    }
  };
  const handleKeyDown = (pattern, e, type) => {
    // Get the pressed key
    const key = e.key;
    let specialCharacterRegex = "";

    if (pattern === "numbersOnly") {
      const inputValue = e.target.value;
      if (inputValue.includes(".")) {
        specialCharacterRegex = /^[0-9]$/;
      } else {
        specialCharacterRegex = /^[0-9.]$/;
      }

      // specialCharacterRegex = /^[0-9]$/;
    } else if (pattern === "charactersOnly") {
      specialCharacterRegex = /^[a-zA-Z0-9]$/;
    } else if (pattern === "alphabatesOnly") {
      specialCharacterRegex = /^[a-zA-Z\s]+$/;
    } else if (pattern === "decimalOnly") {
      const inputValue = e.target.value;
      if (inputValue.includes(".")) {
        specialCharacterRegex = /^[0-9]$/;
      } else {
        specialCharacterRegex = /^[0-9.]$/;
      }
    } else if (pattern === "NumbersAlphabetscommaonly") {
      specialCharacterRegex = /^[a-zA-Z0-9, ]*$/;
    }

    if (key === "Backspace" || key.startsWith("Arrow")) {
      return;
    }

    // Check if the pressed key matches the allowed pattern
    if (!specialCharacterRegex.test(key)) {
      e.preventDefault(); // Prevent the key from being entered into the input field
    }
  };

  const internalRequirementData = isTatData?.dashboardSummaries?.find(
    (item) => item.category === "CurrenUser"
  );
  const pendingSRData = isTatData?.dashboardSummaries?.find(
    (item) => item.category === "OtherUser"
  );

  return (
    <>
      <div className="main-start">
        <div className="w-94">
          <div className="d-flex justify-center align-center">
            <h6 className="advance-title text-center">BOE User Dashboard</h6>
          </div>

          <Row gutter={[16, 16]} className="mb-16">
            {/* Pending SR */}
            <Col xs={24} sm={24} md={12} lg={6} xxl={6}>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th colSpan={2} className="pl-24">
                      Pending SR
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-24 d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span style={{ minWidth: "150px" }}>Within TAT</span>
                        <strong className="ms-4">
                          {pendingSRData?.withinTat ?? "XX"}
                        </strong>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          className="custom-checkbox ms-3"
                          checked={selectedCheckbox === "pendingwithintat"}
                          onChange={() => handleSelection("pendingwithintat")}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "#f0f0f0" }}>
                    <td className="p-24 d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span style={{ minWidth: "150px" }}>Beyond TAT</span>
                        <strong className="ms-4">
                          {pendingSRData?.beyondTat ?? "XX"}
                        </strong>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          className="custom-checkbox ms-3"
                          checked={selectedCheckbox === "pendingbeyondtat"}
                          onChange={() => handleSelection("pendingbeyondtat")}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>

            {/* Internal Requirement */}
            <Col xs={24} sm={24} md={12} lg={6} xxl={6}>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th colSpan={2} className="pl-24">
                      Internal Requirement
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-24 d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span style={{ minWidth: "150px" }}>Within TAT</span>
                        <strong className="ms-4">
                          {internalRequirementData?.withinTat ?? "XX"}
                        </strong>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          className="custom-checkbox ms-3"
                          checked={selectedCheckbox === "internalwithintat"}
                          onChange={() => handleSelection("internalwithintat")}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "#f0f0f0" }}>
                    <td className="p-24 d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span style={{ minWidth: "150px" }}>Beyond TAT</span>
                        <strong className="ms-4">
                          {internalRequirementData?.beyondTat ?? "XX"}
                        </strong>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          className="custom-checkbox ms-3"
                          checked={selectedCheckbox === "internalbeyondtat"}
                          onChange={() => handleSelection("internalbeyondtat")}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>

            {/* Follow Ups (No checkboxes) */}
            <Col xs={24} sm={24} md={12} lg={6} xxl={6}>
            
              <table className="table table-bodered">
                <thead>
                  <tr>
                    <th colSpan={2} className="pl-24">
                      Follow Ups
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-24">Due Today</td>
                    <td
                      className="p-24 text-red"
                      onClick={() =>
                        getDashboardFollowUpData("FollowUpsDueToday")
                      }
                    >
                      {isTatData?.followUpsDueToday ?? "XX"}
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "#f0f0f0" }}>
                    <td className="p-24">Open</td>
                    <td
                      className="p-24 text-red"
                      onClick={() => getDashboardFollowUpData("FollowUpsOpen")}
                    >
                      {isTatData?.followUpsOpen ?? "XX"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>

            {/* Buttons */}
            <Col xs={24} sm={24} md={12} lg={4} xxl={4}>
              <div className="button-container">
                <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() =>
                    setIsAdvanceSearchModalOpen(!isAdvanceSearchModalOpen)
                  }
                >
                  Advance Search
                </Button>

                <Button
                  type="primary"
                  className="primary-btn"
                  onClick={handleMovetoSearch}
                >
                  Raise SR
                </Button>

                <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => handleRandomCall()}
                >
                  Random Call
                </Button>
              </div>
            </Col>
          </Row>

          <Row gutter={[24]} className="mb-16">
            <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Spin spinning={isLoading}>
               
   <ReusableTable
                  key={tableKey}
                  columns={columns}
                  data={data}
              
                  pagination={{
                    pageSize: 10,
                    defaultPageSize: 10,
                    total: { showTotalPages },
                  }}
                />
              </Spin>
            </Col>
          </Row>
        </div>
      </div>
      <Spin spinning={isDataLoading} fullscreen />

      <Modal
        title="Apply Filters"
        open={isAdvanceSearchModalOpen}
        destroyOnClose={true}
        width={800}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setIsAdvanceSearchModalOpen(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        {/* <Card title="Apply Filters" className="mb-16 text-center"> */}
        <Form
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
          onFinish={searchData}
          autoComplete="off"
        >
          <Row gutter={[12, 12]} className="mb-16">
            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                name="PolicyNo"
                label="Policy No"
                className="inputs-label mb-0"
                rules={[
                  {
                    required: false,
                    message: "Enter Policy No",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Policy No"
                  className="cust-input modal-input"
                  maxLength={100}
                />
              </Form.Item>
            </Col>
            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                label="Call Type"
                name="callType"
                className="inputs-label mb-0"
              >
                <Select
                  showSearch
                  allowClear={true}
                  className="cust-input"
                  maxLength={100}
                  placeholder="Select Call Type"
                  onSearch={onSearch}
                  options={CALL_TyPES}
                  filterOption={filterOption}
                  onChange={(value, option) =>
                    handleCallTypeChange(value, option)
                  }
                ></Select>
              </Form.Item>
            </Col>
            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                label="Sub Type"
                name="subType"
                className="inputs-label mb-0 subtype right-colsize"
              >
                <Select
                  showSearch
                  allowClear={true}
                  className="cust-input calltype-select"
                  maxLength={100}
                  placeholder="Select Sub Type"
                  onSearch={onSearch}
                  options={subTypeLU}
                  filterOption={filterOption}
                  //onChange={(e) => {handleSubTypeChange(e); }}
                ></Select>
              </Form.Item>
            </Col>
            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item label="Mode" name="mode" className="inputs-label mb-0">
                <Select
                  showSearch
                  allowClear={true}
                  className="cust-input"
                  maxLength={100}
                  placeholder="Select Mode"
                  options={requestModeLU}
                  filterOption={filterOption}
                ></Select>
              </Form.Item>
            </Col>
            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                label="Status"
                name="status"
                className="inputs-label mb-0 subtype right-colsize"
              >
                <Select
                  showSearch
                  allowClear={true}
                  className="cust-input calltype-select"
                  maxLength={100}
                  placeholder="Select Status"
                  options={statusLU}
                  filterOption={filterOption}
                ></Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
              <div>
                <Form.Item
                  label={<span>From Date</span>}
                  name="FormDate"
                  className="inputs-label mb-0"
                  rules={Ruless}
                >
                  <DatePicker
                    allowClear={true}
                    style={{ width: "100%" }}
                    className="cust-input"
                    format={dateFormat}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
              <div>
                <Form.Item
                  label={
                    <span>
                      To Date
                      {/* <sup>*</sup> */}
                    </span>
                  }
                  name="ToDate"
                  className="inputs-label mb-0"
                  rules={Ruless}
                >
                  <DatePicker
                    allowClear={true}
                    style={{ width: "100%" }}
                    className="cust-input"
                    format={dateFormat}
                  />
                </Form.Item>
              </div>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item className="mb-0">
                <div className="d-flex justify-end">
                  <Button
                    type="primary"
                    className="primary-btn mr-12"
                    htmlType="submit"
                  >
                    Search
                  </Button>{" "}
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {/* </Card> */}
      </Modal>

      <Modal
        title="Follow Up List"
        open={isFollowUpListModal}
        destroyOnClose={true}
        width={1200}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setIsFollowUpListModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="table-container">
          <Spin spinning={isFollowUpsLoader}>
            <table className="responsive-table">
              <thead>
                <tr>
                  <th>Policy No</th>
                  <th>Ticket No</th>
                  <th>Call Type/Sub Type</th>
                  <th>Follow Up With</th>
                  <th>Agenda</th>
                  <th>Follow Up Date</th>
                  <th>Ageing</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {followUpData?.map((row, index) => (
                  <tr key={index}>
                    <td>{row.policyNo}</td>
                    <td>{row.srvReqRefNo}</td>
                    <td>
                      {row.callType}/{row.subType}
                    </td>
                    <td>{row.contactPerson}</td>
                    <td>{row.agenda}</td>
                    <td>
                      {row.nxtFollowUpDt
                        ? moment
                            .utc(row.nxtFollowUpDt)
                            .local()
                            .format("DD/MM/YYYY")
                        : ""}
                    </td>
                    <td>{row.ageing} </td>
                    <td>
                      <Button
                        className="my-button"
                        onClick={() => SaveFollowUpsData(row)}
                      >
                        Close
                      </Button>
                    </td>
                  </tr>
                ))}
                {followUpData?.length === 0 && (
                  <tr>
                    <td colspan="7">
                      <div className="text-center">
                        <span>No data available</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Spin>
        </div>
      </Modal>

      <Modal
        title="Random Call"
        open={isRandomCallModal}
        destroyOnClose={true}
        width={700}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setIsRandomCallModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <Form
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
          onFinish={handleSaveRandomCall}
          autoComplete="off"
        >
          <Row gutter={[12, 12]} className="mb-16">
            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                label="Received On"
                name="receiviedOn"
                className="inputs-label mb-0"
              >
                <DatePicker
                  allowClear={true}
                  style={{ width: "100%" }}
                  className="cust-input"
                  format={dateFormat}
                  //defaultValue={moment().startOf('day')} // Set default date to current date with time part set to 00:00:00
                  disabledDate={disableFutureDates}
                />
              </Form.Item>
            </Col>
            <Col className="m-10" xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item label="Name" name="name" className="inputs-label mb-0">
                <Input
                  className="cust-input modal-input"
                  placeholder="Enter a Name"
                  maxLength={50}
                  minLength={4}
                  onKeyDown={(e) => handleKeyDown("alphabatesOnly", e)}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
              <div>
                <Form.Item
                  label={<span>Phone</span>}
                  name="phone"
                  className="inputs-label mb-0"
                  rules={[
                    {
                      required: false,
                      message: "Phone Number",
                    },
                    {
                      validator: validatePhoneNumber,
                    },
                  ]}
                >
                  <Input
                    className="cust-input modal-input"
                    placeholder="Enter a Phone No"
                    maxLength={10}
                    minLength={10}
                    onKeyDown={(e) => handleKeyDown("numbersOnly", e)}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
              <div>
                <Form.Item
                  label={<span>Is it Potential Lead ?</span>}
                  name="potentialLead"
                  className="inputs-label mb-0"
                  rules={Ruless}
                  // initialValue="yes"
                >
                  <Select
                    showSearch
                    allowClear={true}
                    className="cust-input calltype-select"
                    maxLength={100}
                    placeholder="Select Potential Lead"
                    onChange={handlePotentialLeadChange} // Update state on change
                    options={potentialLeadLu}
                    filterOption={filterOption}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
              <div>
                <Form.Item
                  label={<span>Lead For ?</span>}
                  name="leadFor"
                  className="inputs-label mb-0"
                  rules={Ruless}
                  // initialValue={undefined}
                  // initialValue="life"
                >
                  <Select
                    showSearch
                    allowClear={true}
                    className="cust-input calltype-select"
                    maxLength={100}
                    placeholder="Select Lead For"
                    onSearch={onSearch}
                    options={leadForOptions} // Use dynamic options
                    filterOption={filterOption}
                    disabled={isLeadForDisabled} // Disable based on state
                  />
                </Form.Item>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
              <Form.Item
                label={<span>Comments Box</span>}
                name="comments"
                className="inputs-label mb-0"
              >
                <TextArea
                  rows={2}
                  maxLength={1000}
                  placeholder="Comments Box"
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
                  >
                    Save & Close
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
const mapStateToProps = ({ policyDetails }) => {
  return { policyDetails };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateSentDetails: (info) => {
      dispatch(sentDetailsObj(info));
    },
    dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BOEUserDashboard);
