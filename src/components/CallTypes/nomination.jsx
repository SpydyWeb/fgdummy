import React, { useState, useEffect, useMemo } from "react";
import { Data } from "../../mainconfig";
import DetailsForm from "../../utils/DetailsForm";
import { useSelector } from "react-redux";
import apiCalls from "../../api/apiCalls";
import ClientListModal from "../../utils/clientListModal";
import {
  Button,
  Form,
  Spin,
  Modal,
  Checkbox,
  message,
  Row,
  Col,
  Select,
  Input,
  DatePicker,
  Upload,
  Tooltip,
} from "antd";
import moment from "moment";
import UploadIcon from "../../assets/images/upload.png";
import ContactForm from "../../utils/ContactForm";
import PopupAlert from "../popupAlert";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import InternalFlow from "../InternalFlow/InternalFlow";
import InternalFlowPOS from "../InternalFlow/InternalFlowPOS";
import CloseIcon from "../../assets/images/close-icon.png";
import Icon, {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import RaiseRequirementPopup from "../RaiseRequirementPopup";
import { formatDateSafe } from "../../utils/HelperUtilites";

dayjs.extend(customParseFormat);

const Nomination = (props) => {
  const loginInfo = useSelector((state) => state);
  const [form] = Form.useForm();
  const [requirementsForm] = Form.useForm();
  const [internalReqForm] = Form.useForm();
  const dateFormat = "DD/MM/YYYY";
  const {
    selectedSubType,
    customerData,
    POSContactData,
    details,
    requestModeLU,
    clientEnquiryData,
    salutationLU,
  } = props;

  const [isShowPOSScreen, setIsShowPOSScreen] = useState(false); //pos screen showing purpose
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailFields, setShowEmailFields] = useState(false);
  const [showResonDelayField, setShowReasonDelayField] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showRaiseRequirementBtn, setShowRaiseRequirementBtn] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmailAddress, setShowEmailAddress] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const suffix = <img src={UploadIcon} alt="" />;
  const [checkedList, setCheckedList] = useState([]);
  const [activeEmailIcons, setActiveEmailIcons] = useState([]);
  const [activeMobileIcons, setActiveMobileIcons] = useState([]);
  const [activeWhatsAppIcons, setActiveWhatsAppIcons] = useState([]);
  const [nomineeEnquiryData, setNomineeEnquiryData] = useState([]);
  const [totalShare, setTotalShare] = useState(0);
  const [negativeListModal, setNegativeModal] = useState(false);
  const [ofcListModal, setOfcListModal] = useState(false);

  const [NameDeDupeData, setNameDeDupeData] = useState([]);
  const [NameDeDupeModal, setNameDeDupeModal] = useState(false);
  const [negativeList, setNegativeList] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [raiseRequerimentList, setRaiseRequerimentList] = useState([]);
  const [alertTitle, setAlertTitle] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [alertData, setAlertData] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [raiseRequirementOpen, setRaiseRequirementOpen] = useState(false);
  const [existingNomineeData, setExistingNomineeData] = useState([]);
  const [relationShipLU, setRelationShipLU] = useState([]);
  const [isExistingAppointeeData, setIsExistingAppointeeData] = useState({});
  const [posExistingNomineeData, setPosExistingNomineeData] = useState([]);
  const [NomineeTableData, setNomineeTableData] = useState([]);
  
  const [posUpdateNomineeData, setPosUpdateNomineeData] = useState([]);
  const [isAllowNomineeUpdation, setIsAllowNomineeUpdation] = useState(false);
  const [isShowNomineeSections, setIsShowNomineeSections] = useState(false);
  const [isMinorDOB, setIsMinorDOB] = useState(false);
  const [isDOBIndex, setIsDOBIndex] = useState(null);
  const [isProcessLink, setIsProcessLink] = useState("");
  const [isDocLink, setIsDocLink] = useState("");
  const [isEditNominee, setIsEditNominee] = useState(false);
  const [InternaRequirements, setInternalFlowRequirements] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [IsPosEdited, setIsPosEdited] = useState(false);
  const [idProofModal, setIdProofModal] = useState(false);
  const [aadharIDUploadFiles, setAAdharIDUploadFiles] = useState([]);
  const [passportIDUploadFiles, setPassportIDUploadFiles] = useState([]);
  const [rationCardIDUploadFiles, setRationCardIDUploadFiles] = useState([]);
  const [DrivingIDUploadFiles, setDrivingIDUploadFiles] = useState([]);
  const [voterIDUploadFiles, setVoterIDUploadFiles] = useState([]);
  const [pancardIDUploadFiles, setPancardIDUploadFiles] = useState([]);
  const [isIDUploadMultipleFiles, setIsIDMultipleFiles] = useState([]);
  const [uploadIDMultipleFiles, setUploadIDMultipleFiles] = useState([]);

  const [docIdProofs, setDocIdProofs] = useState([]);
  const [updateFields, setUpdateFields] = useState(false);
  const [updateNomineeData, setUpdateNomineeData] = useState([
    {
      id: 1,
      ClientID_New: "",
      NomineeDOB_New: null,
      RealtionshipWithPolicyowner_New: null,
      Share_New: 0,
      Role_New: "nominee",
      isMinor: false,
      NomineeLastName_New: "",
      NomineeFirstName_New: "",
      NomineeSalutation_New: null,
    },
  ]);
  const [isShowClientListModal, setIsShowClientListModal] = useState(false);

  const handleClientList = () => {
    setIsShowClientListModal(true);
  };

  const posChangeinNomineeObj = {
    custRole: POSContactData?.custRole,
    srvReqID: POSContactData?.srvReqID,
    Client_Id: null,
  };
  const posChangeinAppointeeObj = {
    custRole: POSContactData?.custRole,
    srvReqID: POSContactData?.srvReqID,
    AppointeSalutation_Old: "",
    AppointeFirstName_Old: "",
    AppointeLastName_Old: "",
    AppointeDOB_Old: "",
    AppointeShare_Old: "",
    AppointeRealtionshipWithPolicyowner_Old: "",
    AppointeSalutation_New: "",
    AppointeFirstName_New: "",
    AppointeLastName_New: "",
    AppointeDOB_New: "",
    AppointeShare_New: "",
    AppointeRealtionshipWithPolicyowner_New: "",
    ValidateSignature: "",
    Comments: "",
  };

    const columnsNomineeExisting = useMemo(
    () => [
      {
        title: "Nominee First Name",
        dataIndex: "NomineeFirstName_Old",
        key: "NomineeFirstName_Old",
        render: (v) => v || "-",
      },
      {
        title: "Nominee Last Name",
        dataIndex: "NomineeLastName_Old",
        key: "NomineeLastName_Old",
        render: (v) => v || "-",
      },
      {
        title: "Date of Birth",
        dataIndex: "NomineeDOB_Old",
        key: "NomineeDOB_Old",
        render: (v) => formatDateSafe(v),
      },
      {
        title: "Role",
        dataIndex: "Role_Old",
        key: "Role_Old",
        render: (v) => v || "-",
      },
      {
        title: "Relationship with Life Assured",
        dataIndex: "RealtionshipWithPolicyowner_Old",
        key: "RealtionshipWithPolicyowner_Old",
        render: (v) => v || "-",
      },
      {
        title: "% Share",
        dataIndex: "Share_Old",
        key: "Share_Old",
        align: "right",
        render: (v) => (v === null || v === undefined || v === "" ? "-" : `${v}`),
      },
    ],
    []
  );

  // Columns for posExistingNomineeData (fields without _Old)
  const columnsNomineePOS = useMemo(
    () => [
      {
        title: "Nominee First Name",
        dataIndex: "NomineeFirstName",
        key: "NomineeFirstName",
        render: (v) => v || "-",
      },
      {
        title: "Nominee Last Name",
        dataIndex: "NomineeLastName",
        key: "NomineeLastName",
        render: (v) => v || "-",
      },
      {
        title: "Date of Birth",
        dataIndex: "NomineeDOB",
        key: "NomineeDOB",
        render: (v) => formatDateSafe(v),
      },
      {
        title: "Role",
        dataIndex: "Role",
        key: "Role",
        render: (v) => v || "-",
      },
      {
        title: "Relationship with Life Assured",
        dataIndex: "RealtionshipWithPolicyowner",
        key: "RealtionshipWithPolicyowner",
        render: (v) => v || "-",
      },
      {
        title: "% Share",
        dataIndex: "Share",
        key: "Share",
        align: "right",
        render: (v) => (v === null || v === undefined || v === "" ? "-" : `${v}`),
      },
    ],
    []
  );
  useEffect(() => {
    if (
      POSContactData &&
      customerData?.isPOS &&
      selectedSubType === "changeinnominee"
    ) {
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        posChangeinNomineeObj[element.tagName] = element.tagValue;
      });
      setIsShowPOSScreen(true);
      form.setFieldsValue({
        custRole: posChangeinNomineeObj?.custRole,
        srvReqID: posChangeinNomineeObj?.srvReqRefNo,
        ValidateSignature: posChangeinNomineeObj?.ValidateSignature,
        CustomerSigningDate: POSContactData?.custSignDateTime
          ? convertDate(POSContactData?.custSignDateTime)
          : POSContactData?.custSignDateTime,
        BranchReceivedDate: POSContactData?.requestDateTime
          ? convertDate(POSContactData?.requestDateTime)
          : POSContactData?.requestDateTime,
        ReasonForDelay: POSContactData?.reasonDelayed,
        BranchComments: posChangeinNomineeObj?.Comments,
        requestchannel: POSContactData?.reqMode,
      });
      Data[selectedSubType]?.POS_Details?.forEach((element) => {
        if (
          element?.label?.includes("Reason For Delayed Submission") &&
          POSContactData?.reasonDelayed
        ) {
          element.hide = false;
          setShowReasonDelayField(true);
        }
      });
      // Filter new data
      const oldData = POSContactData?.serviceRequestTransectionData?.filter(
        (item) => item.status === "Create" && item.tagName?.includes("Old")
      );
      // Consolidate data into an array of objects
      const consolidatedData = oldData.reduce((acc, item) => {
        const match = item.tagName?.match(/_(Old_\d+)$/);
        if (match) {
          const index = match[1]; // Extract the dynamic index (e.g., New_1, New_2)
          const fieldName = item.tagName.replace(`_${index}`, "");
          const currentIndex = acc.findIndex((el) => el.index === index);

          if (currentIndex === -1) {
            // If the index doesn't exist in the accumulator, create a new object
            acc.push({ index, [fieldName]: item.tagValue });
          } else {
            // If the index exists, update the existing object
            acc[currentIndex][fieldName] = item.tagValue;
          }
        }
        return acc;
      }, []);
      setPosExistingNomineeData(consolidatedData);

      const newData = POSContactData?.serviceRequestTransectionData?.filter(
        (item) => item.status === "Create" && item.tagName?.includes("New")
      );
      // Consolidate data into an array of objects
      const consolidatedNewData = newData.reduce((acc, item) => {
        const match = item.tagName?.match(/_(New_\d+)$/);
        if (match) {
          const index = match[1]; // Extract the dynamic index (e.g., New_1, New_2)
          // Remove trailing underscore followed by digits
          // const cleanedIndex =  index.replace(/^(.*)_\d+$/, '$1');
          // Method 1: Using String's replace() method
          // const cleanedIndex = index.replace('New_', '');
          const fieldName = item.tagName.replace(`_${index}`, "");
          const currentIndex = acc.findIndex((el) => el.index === index);

          if (currentIndex === -1) {
            // If the index doesn't exist in the accumulator, create a new object
            acc.push({ index, [fieldName]: item.tagValue });
          } else {
            // If the index exists, update the existing object
            acc[currentIndex][fieldName] = item.tagValue;
          }
        }
        return acc;
      }, []);
      getRelationsData(
        null,
        null,
        consolidatedNewData,
        posChangeinNomineeObj?.Client_Id,
        null,
        "true"
      ); //for relationship owner full name  bind purpose
      // setPosUpdateNomineeData(consolidatedNewData);  //for relationship owner full name  bind purpose
    } else if (
      POSContactData &&
      customerData?.isPOS &&
      selectedSubType === "changeinappointee"
    ) {
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        posChangeinAppointeeObj[element.tagName] = element.tagValue;
      });
      setIsShowPOSScreen(true);
      const matchingsalutation_Old = salutationLU?.find(
        (item) =>
          item?.extrL_KEY?.toLowerCase() === posChangeinAppointeeObj?.AppointeSalutation_Old?.toLowerCase()
      );
      const matchingsalutation_New = salutationLU?.find(
        (item) =>
          item?.extrL_KEY?.toLowerCase() === posChangeinAppointeeObj?.AppointeSalutation_New?.toLowerCase()
      );
      getRelationsData(
        null,
        null,
        null,
        posChangeinAppointeeObj?.Client_Id,
        "true"
      );
      form.setFieldsValue({
        custRole: posChangeinAppointeeObj?.custRole,
        srvReqID: posChangeinAppointeeObj?.srvReqRefNo,
        AppointeSalutation_Old: matchingsalutation_Old?.extrL_KEY,
        AppointeFirstName_Old: posChangeinAppointeeObj?.AppointeFirstName_Old,
        AppointeLastName_Old: posChangeinAppointeeObj?.AppointeLastName_Old,
        AppointeDOB_Old: posChangeinAppointeeObj?.AppointeDOB_Old,
        AppointeShare_Old: posChangeinAppointeeObj?.AppointeShare_Old,
        AppointeRealtionshipWithPolicyowner_Old:
          posChangeinAppointeeObj?.AppointeRealtionshipWithPolicyowner_Old,
        AppointeSalutation_New: matchingsalutation_New?.extrL_KEY,
        AppointeFirstName_New: posChangeinAppointeeObj?.AppointeFirstName_New,
        AppointeLastName_New: posChangeinAppointeeObj?.AppointeLastName_New,
        AppointeDOB_New: posChangeinAppointeeObj?.AppointeDOB_New
          ? dayjs(posChangeinAppointeeObj?.AppointeDOB_New, "DD/MM/YYYY")
          : posChangeinAppointeeObj?.AppointeDOB_New,
        // AppointeShare_New:posChangeinAppointeeObj?.AppointeShare_New,
        AppointeRealtionshipWithPolicyowner_New:
          posChangeinAppointeeObj?.AppointeRealtionshipWithPolicyowner_New,
        ValidateSignature: posChangeinAppointeeObj?.ValidateSignature,
        BranchComments: posChangeinAppointeeObj?.Comments,
        CustomerSigningDate: POSContactData?.custSignDateTime
          ? convertDate(POSContactData?.custSignDateTime)
          : POSContactData?.custSignDateTime,
        BranchReceivedDate: POSContactData?.requestDateTime
          ? convertDate(POSContactData?.requestDateTime)
          : POSContactData?.requestDateTime,
        ReasonForDelay: POSContactData?.reasonDelayed,
        requestchannel: POSContactData?.reqMode,
      });
      Data[selectedSubType]?.POS_Details?.forEach((element) => {
        if (
          element?.label?.includes("Reason For Delayed Submission") &&
          POSContactData?.reasonDelayed
        ) {
          element.hide = false;
          setShowReasonDelayField(true);
        }
      });
    }
  }, []); // eslint-disable-next-line arrow-body-style

  useEffect(() => {
    setCheckedList([]);
    getProcesLink();
    hideCommunications();
    setIsIDMultipleFiles([]);
    setUploadIDMultipleFiles([]);
    handleIdProofModalClose();
    setIsShowNomineeSections(false);
    setShowRaiseRequirementBtn(false);
    form.setFieldsValue({
      NominationChangeAllowed: details?.policyDetailsObj?.saDetails?.Assignment
        ? "No"
        : "Yes",
      idProof: "",
    });
    if (!details?.policyDetailsObj?.saDetails?.Assignment) {
      setIsShowNomineeSections(true);
      setIsAllowNomineeUpdation(true);
    } else {
      setIsShowNomineeSections(true);
      setIsAllowNomineeUpdation(false);
    }
  }, [selectedSubType]);

  const hideCommunications = () => {
    setActiveEmailIcons([]);
    setActiveMobileIcons([]);
    setActiveWhatsAppIcons([]);
    setShowPhoneNumber(false);
    setShowEmailAddress(false);
    setShowWhatsApp(false);
  };

  const handleChange = (value) => {
    // If the checkbox is already checked, uncheck it
    const emailDetails = Data[selectedSubType]?.Request_Details;
    const emailDetails1 = Data[selectedSubType]?.New_Appointee_Details;
    if (loginInfo?.userProfileInfo?.profileObj?.isEmail) {
      emailDetails.forEach((element) => {
        if (element?.name === "requestform") {
          element.required = false;
        }
      });
      if (props?.EmailResponse?.IsEmailmanagent) {
        if (selectedSubType === "changeinnominee") {
          emailDetails.forEach((element) => {
            if (element?.name === "requestchannel") {
              form.setFieldsValue({
                requestchannel: 4,
              });
              element.disabled = true;
            }
            if (
              element?.name === "CustomerSigningDate" ||
              element?.name === "BranchReceivedDate" ||
              element?.name === "ValidateSignature" ||
              element?.name === "requestform"
            ) {
              element.hide = true;
            }
          });
        }

        if (selectedSubType === "changeinappointee") {
          emailDetails1.forEach((element) => {
            if (element?.name === "requestchannel") {
              form.setFieldsValue({
                requestchannel: 4,
              });
              element.disabled = true;
            }
            emailDetails.forEach((element) => {
              if (
                element?.name === "CustomerSigningDate" ||
                element?.name === "BranchReceivedDate" ||
                element?.name === "ValidateSignature" ||
                element?.name === "requestform"
              ) {
                element.hide = true;
              }
            });
          });
        }

        if (Data[selectedSubType]?.Comments) {
          Data[selectedSubType].Comments = [
            {
              name: "AdditionalNoteForCustomer",
              label: "Additional Note For Customer",
              inputType: "complaintbox",
              maxlength: 4000,
              required: false,
              validationmsg: "Additional Note For Customer",
              placeholder: "Additional Note For Customer",
              width: "100%",
              rows: 4,
            },
          ];
        }
        if (!Array.isArray(Data[selectedSubType]?.Request_Details)) {
          Data[selectedSubType].Request_Details = [];
        }

        // Remove existing instances of "Additional Note For Customer" before adding a new one
        Data[selectedSubType].Request_Details = Data[
          selectedSubType
        ].Request_Details.filter(
          (comment) => comment.name !== "AdditionalNoteForCustomer"
        );

        // Add "Additional Note For Customer" once

        Data[selectedSubType].Request_Details.push({
          name: "AdditionalNoteForCustomer",
          label: "Additional Note For Customer",
          inputType: "complaintbox",
          maxlength: 4000,
          required: false,
          validationmsg: "Additional Note For Customer",
          placeholder: "Additional Note For Customer",
          width: "100%",
          rows: 4,
        });
      }
    }
    setShowRaiseRequirementBtn(false);
    hideCommunications();
    if (
      value?.includes("Update New Appointee") &&
      loginInfo?.userProfileInfo?.profileObj?.isEmail
    ) {
      form.setFieldsValue({
        requestchannel: 4,
      });
    }
    if (checkedList.includes(value)) {
      setCheckedList([]);
    } else {
      // Otherwise, check it
      setCheckedList([value]);
      if (
        value?.includes("View Existing Nominee Details") ||
        value?.includes("Update New Nominee Details") ||
        value?.includes("View Existing Appointee") ||
        value?.includes("Update New Appointee")
      ) {
        getNomineeEnquiry(value);
        if (
          value?.includes("Update New Nominee Details") ||
          value?.includes("Update New Appointee")
        ) {
          getRelationsData(
            null,
            value,
            null,
            props?.details?.policyDetailsObj?.identifiers?.po_ClientID
          );
        }
      } else if (value?.includes("Share Process Information")) {
        form.setFieldsValue({
          mobileNo: customerData?.mobileNo,
          whatsAppNo: customerData?.mobileNo,
          emailId: customerData?.emailID,
        });
      }
    }
  };

  const getProcesLink = () => {
    setIsProcessLink("");
    setIsDocLink("");
    let obj = {
      Call_Typ: props?.selectedCallType,
      Sub_Typ: props?.selectedSubTypeId,
    };
    let response = apiCalls.getProcesLink(obj);
    response
      .then((val) => {
        if (val?.data) {
          const filteredData = val?.data?.filter((ele) => {
            if (ele.docType === "AcceptableDocs") {
              setIsDocLink(ele.link);
            } else if (
              ele.docType === props?.SelectedSubTypeVal ||
              ele.docType === "Change in Nominee"
            ) {
              setIsProcessLink(ele.link);
            }
            return ele.docType;
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
      .catch((err) => {});
  };

  // const handlePOSNomineeNameChange = (index, value) => {
  //   const updatedData = [...posUpdateNomineeData];
  //   updatedData[index].NomineeName = value;
  //   setPosUpdateNomineeData(updatedData);
  // };

  const handlePOSNomineeFirstNameChange = (index, newValue) => {
    setPosUpdateNomineeData((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        NomineeFirstName_New: newValue,
      };
      return newData;
    });
  };

  const handlePOSNomineeLastNameChange = (index, newValue) => {
    setPosUpdateNomineeData((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        NomineeLastName_New: newValue,
      };
      return newData;
    });
  };

  const handlePOSNomineeSalutationChange = (index, value) => {
    const updatedData = [...posUpdateNomineeData];
    updatedData[index].NomineeSalutation_New = value;
    setPosUpdateNomineeData(updatedData);
  };

  const handleNomineeSalutationChange = (index, value) => {
    const updatedData = [...updateNomineeData];
    updatedData[index].NomineeSalutation_New = value;
    setUpdateNomineeData(updatedData);
  };

  const handleNomineeFirstNameChange = (index, value) => {
    const updatedData = [...updateNomineeData];
    updatedData[index].NomineeFirstName_New = value;
    setUpdateNomineeData(updatedData);
  };

  const handleNomineeLastNameChange = (index, value) => {
    const updatedData = [...updateNomineeData];
    updatedData[index].NomineeLastName_New = value;
    setUpdateNomineeData(updatedData);
  };

  const handlePOSRelationshipChange = (index, value) => {
    const updatedData = [...posUpdateNomineeData];
    updatedData[index].RealtionshipWithPolicyowner = value;
    setPosUpdateNomineeData(updatedData);
  };
  const handleRelationshipChange = (index, value) => {
    const updatedData = [...updateNomineeData];
    updatedData[index].RealtionshipWithPolicyowner_New = value;
    setUpdateNomineeData(updatedData);
  };
  const handleRoleChange = (index, value, row) => {
    const updatedData = [...updateNomineeData];
    updatedData[index].Role_New = value;
    if (value === "appointee") {
      updatedData[index].Share_New = 0;
      form.setFieldsValue({
        updateNomineeData: {
          [row.id]: {
            Share_New: 0,
          },
        },
      });

      const newTotalShare = updatedData.reduce(
        (sum, nominee) => sum + parseFloat(nominee.Share_New) || 0,
        0
      );
      setTotalShare(newTotalShare);
    }
    // else if(value==="nominee"&&isMinorDOB){
    //   message.error({
    //     content:
    //       "Please Select Appointee only",
    //     className: "custom-msg",
    //     duration: 2,
    //   });
    //   return;
    // }
    // else if(value === "appointee"&&!isMinorDOB){
    //   message.error({
    //     content:
    //       "Please Select Nominee only",
    //     className: "custom-msg",
    //     duration: 2,
    //   });
    //   return;
    // }
    setUpdateNomineeData(updatedData);
  };

  const handlePOSRoleChange = (index, value, row) => {
    const updatedData = [...posUpdateNomineeData];
    updatedData[index].Role = value;
    if (value === "appointee") {
      updatedData[index].Share_New = 0;
      form.setFieldsValue({
        updateNomineeData: {
          [row.id]: {
            Share: 0,
          },
        },
      });

      const newTotalShare = updatedData.reduce(
        (sum, nominee) => sum + parseFloat(nominee.Share) || 0,
        0
      );
      setTotalShare(newTotalShare);
    }
    setPosUpdateNomineeData(updatedData);
  };
  const handlePOSShareChange = (index, newShare) => {
    const posUpdatedNomineeData = [...posUpdateNomineeData];
    posUpdatedNomineeData[index].Share = newShare;

    // Recalculate the total share
    const newTotalShare = posUpdatedNomineeData.reduce(
      (sum, nominee) => sum + parseFloat(nominee.Share) || 0,
      0
    );
    setTotalShare(newTotalShare);

    // Update the state
    setPosUpdateNomineeData(posUpdatedNomineeData);
  };
  const handleShareChange = (index, newShare) => {
    const updatedNomineeData = [...updateNomineeData];
    updatedNomineeData[index].Share_New = newShare;

    // Recalculate the total share
    const newTotalShare = updatedNomineeData.reduce(
      (sum, nominee) => sum + parseFloat(nominee.Share_New) || 0,
      0
    );
    setTotalShare(newTotalShare);

    // Update the state
    setUpdateNomineeData(updatedNomineeData);
  };

  const handlePOSDobChange = (newDob, index) => {
    const updatedPOSNomineeData = [...posUpdateNomineeData];
    updatedPOSNomineeData[index].NomineeDOB = newDob;
    updatedPOSNomineeData[index].NomineeDOB &&
      isPOSMinor(updatedPOSNomineeData, index);
  };

  const handleDobChange = (newDob, index) => {
    const updatedNomineeData = [...updateNomineeData];
    updatedNomineeData[index].NomineeDOB_New = newDob;
    // if(index!==0){
    //   isMinor(updatedNomineeData[index].NomineeDOB_New,updatedNomineeData)
    // }else{
    //setUpdateNomineeData(updatedNomineeData);
    //}

    updatedNomineeData[index].NomineeDOB_New &&
      isMinor(updatedNomineeData, index);
  };
  const isPOSMinor = (nomineeData, index) => {
    const currentDate = new Date();
    const birthDate = new Date(nomineeData[index].NomineeDOB);
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (age < 18 || (age === 18 && monthDiff < 0 && isDOBIndex !== index)) {
      nomineeData[index].isMinor = true;
      setIsMinorDOB(true);
      setIsDOBIndex(index);
    } else if (age > 18 && isDOBIndex === index) {
      nomineeData[index].isMinor = false;
      setIsMinorDOB(false);
      setIsDOBIndex(null);
    }
    if (isShowPOSScreen) {
      setPosUpdateNomineeData(nomineeData);
    } else {
      setUpdateNomineeData(nomineeData);
    }

    // else{
    //   setUpdateNomineeData(data);
    // }

    // return age < 18 || (age === 18 && monthDiff < 0);
  };

  const isMinor = (nomineeData, index) => {
    const currentDate = new Date();
    const birthDate = new Date(nomineeData.NomineeDOB_New);
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (age < 18 || (age === 18 && monthDiff < 0 && isDOBIndex !== index)) {
      //nomineeData.isMinor = true;
      setIsMinorDOB(true);
      setIsDOBIndex(index);
      // message.warning({
      //   content:
      //     "Proposer Age cannot be less than 18 years",
      //   className: "custom-msg",
      //   duration: 2,
      // });
    } else if (age > 18 && isDOBIndex === index) {
      //nomineeData.isMinor = false;
      setIsMinorDOB(false);
      setIsDOBIndex(null);
    }
    if (isShowPOSScreen) {
      setPosUpdateNomineeData(nomineeData);
    } else {
      setUpdateNomineeData(nomineeData);
    }

    // else{
    //   setUpdateNomineeData(data);
    // }

    // return age < 18 || (age === 18 && monthDiff < 0);
  };

  const handleAddRow = () => {
    // Check if the total share is less than 100 before adding a new row
    if (totalShare < 100 || isMinorDOB) {
      const newId = updateNomineeData.length + 1;
      const newRow = {
        id: newId,
        ClientID_New: "",
        NomineeDOB_New: "",
        RealtionshipWithPolicyowner_New: null,
        Share_New: 0,
        Role_New: null,
        isMinor: false,
        NomineeLastName_New: "",
        NomineeFirstName_New: "",
        NomineeSalutation_New: null,
      };

      // Update the state with the new row
      setUpdateNomineeData([...updateNomineeData, newRow]);
    } else {
      // Display an alert or handle the case where total share is already 100
      message.warning({
        content: "Total Share fullfilled. Can't add new nominee.",
        className: "custom-msg",
        duration: 2,
      });
    }
  };

  const handleDeleteRow = (id, index) => {
    if (updateNomineeData.length > 1) {
      form.setFieldsValue({
        updateNomineeData: {
          [id]: {
            NomineeDOB_New: "",
            RealtionshipWithPolicyowner_New: null,
            Share_New: 0,
            Role_New: null,
            isMinor: false,
            NomineeLastName_New: "",
            NomineeFirstName_New: "",
            NomineeSalutation_New: null,
          },
        },
      });
      // form.setFieldsValue({
      //   [`updateNomineeData[${index}].NomineeName_New`]: "",
      //   [`updateNomineeData[${index}].NomineeDOB_New`]: "",
      //   [`updateNomineeData[${index}].RealtionshipWithPolicyowner_New`]: "",
      //   [`updateNomineeData[${index}].Share_New`]: "",
      //   [`updateNomineeData[${index}].Role_New`]: "",
      // });

      const updatedupdateNomineeData = updateNomineeData.filter(
        (row) => row.id !== id
      );

      const newTotalShare = updatedupdateNomineeData.reduce(
        (sum, nominee) => sum + parseFloat(nominee.Share_New) || 0,
        0
      );

      setTotalShare(newTotalShare);
      setUpdateNomineeData(updatedupdateNomineeData);
      // Reset the form instance to reflect the changes
      form.resetFields([
        `updateNomineeData[${index}].ClientID_New`,
        `updateNomineeData[${index}].NomineeDOB_New`,
        `updateNomineeData[${index}].RealtionshipWithPolicyowner_New`,
        `updateNomineeData[${index}].Share_New`,
        `updateNomineeData[${index}].Role_New`,
        `updateNomineeData[${index}].NomineeFirstName_New`,
        `updateNomineeData[${index}].NomineeLastName_New`,
        `updateNomineeData[${index}].NomineeSalutation_New`,
      ]);
    }
  };

  const handlePOSDeleteRow = (id, index) => {
    if (posUpdateNomineeData?.length > 1) {
      form.setFieldsValue({
        posUpdateNomineeData: {
          [index]: {
            ClientID_New: "",
            NomineeName: "",
            NomineeDOB: "",
            RealtionshipWithPolicyowner: null,
            Share: 0,
            Role: null,
            isMinor: false,
            NomineeSalutation: null,
          },
        },
      });

      // Filter based on index
      const updatedupdateNomineeData = posUpdateNomineeData?.filter(
        (row, rowIndex) => rowIndex !== index
      );

      const newTotalShare = updatedupdateNomineeData.reduce(
        (sum, nominee) => sum + parseFloat(nominee.Share) || 0,
        0
      );

      setTotalShare(newTotalShare);
      setPosUpdateNomineeData(updatedupdateNomineeData);

      // Reset the form instance to reflect the changes
      form.resetFields([
        `posUpdateNomineeData[${index}].NomineeName`,
        `posUpdateNomineeData[${index}].NomineeDOB`,
        `posUpdateNomineeData[${index}].RealtionshipWithPolicyowner`,
        `posUpdateNomineeData[${index}].Share`,
        `posUpdateNomineeData[${index}].Role`,
        `posUpdateNomineeData[${index}].NomineeSalutation`,
      ]);
    }
  };

  const handleTitleCheckBox = (e, item) => {
    const newValue = checked ? false : true;
    setChecked(newValue);
  };

  const handleRadioChange = (e, item) => {
    setShowRaiseRequirementBtn(false);
    if (
      item?.label?.includes("Validate Signature") &&
      e.target.value === "no"
    ) {
      setShowRaiseRequirementBtn(true);
    }
  };
  const toggleInputField = (field, item, index) => {
    setShowEmailFields(true);
    form.setFieldsValue({
      mobileNo: customerData?.mobileNo,
      whatsAppNo: customerData?.mobileNo,
      emailId: customerData?.emailID,
    });
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
  const getUploadFiles = (listOfUploadFiles) => {
    // const updatedUploadList = listOfUploadFiles?.map((obj) => {
    //   // Create a new object without the propertyToDelete property
    //   const { labelName, ...newObject } = obj;
    //   return newObject;
    // });
    // Update the state with the new list
    setUploadFiles([...docIdProofs, ...listOfUploadFiles]);
  };

  // const getNomineeCreation = (e)=>{
  //   setIsLoading(true);
  //   setIsAllowNomineeUpdation(false);
  //   let response = apiCalls.getNomineeCreation(customerData?.policyNo);
  //   response
  //     .then((val) => {
  //       if (val?.data) {
  //         const res = val?.data?.responseBody;
  //         setIsLoading(false);
  //         setIsAllowNomineeUpdation(true);
  //       } else {
  //         setIsLoading(false);
  //         message.error({
  //           content:
  //             val?.data?.responseBody?.errormessage ||
  //             "Something went wrong please try again!",
  //           className: "custom-msg",
  //           duration: 2,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       setIsLoading(false);
  //     });
  // }

  const getRelationsData = async (
    val,
    checkItem,
    consolidatedNewData,
    clientNumber,
    appointeePOS,
    nomineePOS
  ) => {
    setIsLoading(true);
    try {
      const response = await apiCalls.getRelationsData(
        val?.bnysel || clientNumber
      );
      if (response?.data) {
        const res = response?.data;
        if (
          checkItem?.includes("Update New Nominee Details") ||
          checkItem?.includes("Update New Appointee") ||
          (selectedSubType === "changeinappointee" && appointeePOS) ||
          (selectedSubType === "changeinnominee" && nomineePOS)
        ) {
          let transformedData = res?.map((item) => ({
            ...item,
            label: item.longdesc,
            value: item.descitem,
          }));
          setRelationShipLU(transformedData);
        }
        if (
          checkItem?.includes("View Existing Nominee Details") ||
          checkItem?.includes("View Existing Appointee") ||
          checkItem?.includes("Update New Nominee Details") ||
          checkItem?.includes("Update New Appointee")
        ) {
          let matchingItem = res?.find(
            (item) => item?.descitem === val?.bnyrln
          );
          let relationValue = matchingItem ? matchingItem.longdesc : null;
          return relationValue;
        } else if (
          consolidatedNewData?.length > 0 &&
          selectedSubType === "changeinnominee"
        ) {
          // Create a copy of the consolidatedNewData array
          const updatedData = [...consolidatedNewData];

          consolidatedNewData?.forEach((relatns, index) => {
            // Find the matching item in the res array based on descitem
            const matchingItem = res?.find(
              (item) => item?.descitem === relatns?.RealtionshipWithPolicyowner
            );

            // Update RealtionshipWithPolicyowner field if a matching item is found
            if (matchingItem) {
              updatedData[index].RealtionshipWithPolicyowner =
                matchingItem.longdesc;
            }
          });
          if (nomineePOS) {
            const newTotalShare = consolidatedNewData?.reduce(
              (sum, nominee) =>
                sum + (nominee.Share ? parseFloat(nominee.Share) : 0) || 0,
              0
            );
            setTotalShare(newTotalShare);
          }

          // Set the updated data in the state
          setPosUpdateNomineeData(updatedData);
          setUpdateNomineeData(updatedData);
        } else if (clientNumber && selectedSubType === "changeinappointee") {
          // Use the optional chaining operator (?.) to access properties safely and prevent errors if res is null or undefined
          let matchingItem = res?.find(
            (item) =>
              item?.descitem ===
              posChangeinAppointeeObj?.AppointeRealtionshipWithPolicyowner_New
          );

          // Set the value of posChangeinAppointeeObj.AppointeRealtionshipWithPolicyowner_New based on the matchingItem
          let posAppointeeRelationShipOwner = matchingItem
            ? matchingItem.longdesc
            : null;
          form.setFieldsValue({
            AppointeRealtionshipWithPolicyowner_New:
              posAppointeeRelationShipOwner,
          });
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
        message.error({
          content:
            response?.data?.responseBody?.errormessage ||
            "Something went wrong, please try again!",
          className: "custom-msg",
          duration: 2,
        });
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getNomineeEnquiry = async (checkItem) => {
    setIsLoading(true);
    setShowAlert(false);
    try {
      const response = await apiCalls.getNomineeEnquiry(
        customerData?.policyNo,
        loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID
      );

      if (
        response?.data?.responseBody?.errorcode == 0 &&
        response?.data?.responseBody?.nomineeEnquiry
      ) {
        const res = response?.data?.responseBody;
        const nomineeArray = [];

        if (res?.nomineeEnquiry?.length > 0) {
          for (const val of res?.nomineeEnquiry) {
            if (val) {
              if (selectedSubType === "changeinnominee") {
                const { dob, salutation } = await getClientEnquiry(val.bnysel);
                const matchingsalutation = salutationLU?.find(
                  (item) =>
                    item?.extrL_KEY?.toLowerCase() === salutation?.toLowerCase()
                );
                const fullName = val.clientName;
                const [lastName, firstName] = fullName
                  .split(",")
                  .map((name) => name.trim());
                const relationShip = await getRelationsData(val, checkItem);
                const nomineeObj = {
                  NomineeSalutation_Old: matchingsalutation?.extrL_KEY,
                  NomineeFirstName_Old: firstName,
                  NomineeLastName_Old: lastName,
                  NomineeDOB_Old: dob,
                  RealtionshipWithPolicyowner_Old: relationShip,
                  Share_Old: val?.bnypc,
                  Role_Old: val?.bnyrln === "AP" ? "Appointee" : "Nominee",
                };

                nomineeArray.push(nomineeObj);
              } else if (
                selectedSubType === "changeinappointee" &&
                val?.bnyrln === "AP"
              ) {
                const { dob, salutation } = await getClientEnquiry(val.bnysel);
                const matchingsalutation = salutationLU?.find(
                  (item) =>
                    item?.extrL_KEY?.toLowerCase() === salutation?.toLowerCase()
                );
                const fullName = val.clientName;
                const [lastName, firstName] = fullName
                  .split(",")
                  .map((name) => name.trim());
                const relationShip = await getRelationsData(val, checkItem);
                form.setFieldsValue({
                  AppointeSalutation_Old: val?.bnyrln === "AP" ? matchingsalutation?.extrL_KEY : "",
                  AppointeFirstName_Old: val?.bnyrln === "AP" ? firstName : "",
                  AppointeLastName_Old: val?.bnyrln === "AP" ? lastName : "",
                  AppointeDOB_Old: dob,
                  AppointeShare_Old: val?.bnypc,
                  AppointeRealtionshipWithPolicyowner_Old: relationShip,
                });
                if (checkItem?.includes("Update New Appointee")) {
                  let appointeeObj = {
                    AppointeSalutation_Old: matchingsalutation?.extrL_KEY,
                    AppointeFirstName_Old: firstName,
                    AppointeLastName_Old: lastName,
                    AppointeDOB_Old: dob,
                    AppointeShare_Old: val?.bnypc,
                    AppointeRealtionshipWithPolicyowner_Old: relationShip,
                  };
                  setIsExistingAppointeeData(appointeeObj);
                }
              }
            }
          }

          setExistingNomineeData(nomineeArray);
        }

        setNomineeEnquiryData(response?.data?.responseBody);
        setIsLoading(false);
      } else {
        if (selectedSubType === "changeinappointee") {
          setIsLoading(false);
          setAlertTitle("");
          setAlertData(
            "No request to be logged if policy does not have an existing nominee."
          );
          setShowAlert(true);
        } else if (selectedSubType === "changeinnominee") {
          setIsLoading(false);
          message.error({
            content:
              response?.data?.responseBody?.errormessage ||
              "Something went wrong, please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getClientEnquiry = async (clientNo) => {
    let obj = {
      clientNumber: clientNo,
    };
    try {
      const response = await apiCalls.getClientEnquiry(
        obj,
        loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID
      );
      if (response?.data) {
        const res = response?.data?.responseBody;
        return {
          dob: res?.clTdob ? convertDate(res.clTdob) : res?.clTdob,
          salutation: res?.salutl,
        };
      } else {
        message.error({
          content:
            response?.data?.responseBody?.errormessage ||
            "Something went wrong, please try again!",
          className: "custom-msg",
          duration: 2,
        });
      }
    } catch (error) {
      // Handle error
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
      specialCharacterRegex = /^[a-zA-Z]$/;
    } else if (pattern === "decimalOnly") {
      const inputValue = e.target.value;
      if (inputValue.includes(".")) {
        specialCharacterRegex = /^[0-9]$/;
      } else {
        specialCharacterRegex = /^[0-9.]$/;
      }
    }

    if (key === "Backspace" || key.startsWith("Arrow")) {
      return;
    }

    // Check if the pressed key matches the allowed pattern
    if (!specialCharacterRegex.test(key)) {
      e.preventDefault(); // Prevent the key from being entered into the input field
    }
  };

  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYMMDD").format("DD/MM/YYYY");
    return formattedDate;
  };
  const convertDate2 = (inputDate) => {
    const formattedDate = moment(inputDate, "YYYYDDMM").format("DD/MM/YYYY");
    return formattedDate;
  };

  const handleTextLink = (item) => {
    if (item?.linkValue?.toLowerCase() === "view") {
          const gConfig= apiCalls.getGenericConfig()
          if(gConfig?.data?.dmsApiUrl){
      const url =
        gConfig?.data?.dmsApiUrl +
        `/omnidocs/WebApiRequestRedirection?Application=BPMPOLENQ&cabinetName=FG&sessionIndexSet=false&DataClassName=Future_Generali&DC.Application_no=${details?.policyDetailsObj?.identifiers?.applicationNo}`;
      window.open(url, "_blank");
          }
    }
  };
  const handleDropdownChange = (e, item) => {
    //setIsShowNomineeSections(false);
    // if(item?.label?.includes("Nomination Change Allowed")){
    //   getNomineeCreation();
    //   setIsShowNomineeSections(true);
    //   setIsAllowNomineeUpdation(true);
    // }
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
    if (item === "BranchReceivedDate" || item.name === "branchreceivedate") {
      setShowReasonDelayField(false);
      let newDate = new Date();
      let todayDate = moment(newDate).format("MM/DD/YYYY");
      let selectDate = moment(date + 1).format("MM/DD/YYYY");
      const formFeilds = form.getFieldsValue();
      let customerSignDate = moment(formFeilds?.CustomerSigningDate + 1).format(
        "MM/DD/YYYY"
      );
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
          BranchReceivedDate: "",
        });
        return;
      }
      //  if(requestForSelection === "landmarkaddition"&&selectDate < todayDate){
      //   setShowReasonDelayField(true);
      //  }
      else {
        Data[selectedSubType]?.Request_Details?.forEach((element) => {
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
  };

  //commonly render all forms
  const renderDetailsForm = (formType) => {
    return (
      <DetailsForm
        handleRadioLink={handleRadioLink}
        data={Data[selectedSubType]?.[formType]}
        subType={selectedSubType}
        suffix={!isShowPOSScreen && suffix}
        form={form}
        handleRadioChange={handleRadioChange}
        handleDateChange={handleDateChange}
        handleTextLink={handleTextLink}
        handleTitleCheckBox={handleTitleCheckBox}
        handleDropdownChange={handleDropdownChange}
        toggleInputField={toggleInputField}
        activeEmailIcons={activeEmailIcons}
        activeMobileIcons={activeMobileIcons}
        activeWhatsAppIcons={activeWhatsAppIcons}
        appointeerelationShipLU={relationShipLU}
        getUploadFiles={getUploadFiles}
        disabledDate={disabledDate}
        handleEdit={handleEdit}
        requestModeLU={requestModeLU}
        handleLinkValue={handleLinkValue}
        handleClientList={handleClientList} // <-- ADD THIS LINE
        onBlurInput={onBlurInput}
        salutationLU={salutationLU}
      ></DetailsForm>
    );
  };

  const onBlurInput =()=>{}

  const getTransactionData = (values) => {
    if (selectedSubType === "changeinnominee") {
      let newArray = [
        {
          Status: "Create",
          TagName: "outofrevival",
          TagValue: values?.outofrevival || "",
        },
        {
          Status: "Create",
          TagName: "ValidateSignature",
          TagValue: values?.ValidateSignature || "",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "Client_Id",
          TagValue:
            values?.GSTINToBeUpdateFor === "1"
              ? customerData?.laClientID
              : customerData?.poClientID,
        },
        { Status: "Create", TagName: "DocLink", TagValue: isDocLink },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel,
        },
      ];

      let ExistingDataList = [];
      if (existingNomineeData?.length > 0) {
        const oldProperties = [
          "NomineeSalutation_Old",
          "NomineeFirstName_Old",
          "NomineeLastName_Old",
          "NomineeDOB_Old",
          "Share_Old",
          "RealtionshipWithPolicyowner_Old",
          "Role_Old",
        ];

        existingNomineeData?.forEach((record, index) => {
          oldProperties.forEach((property) => {
            if (record[property]) {
              ExistingDataList.push({
                Status: "Create",
                TagName: `${property}_${index + 1}`,
                TagValue: record[property],
              });
            }
          });
        });
      }

      const properties = [
        "ClientID_New",
        "NomineeFirstName_New",
        "NomineeLastName_New",
        "NomineeDOB_New",
        "Share_New",
        "RealtionshipWithPolicyowner_New",
        "Role_New",
        "NomineeSalutation_New",
      ];

      const data = (values.updateNomineeData || []).filter(item => item && Object.keys(item).length > 0);

      let updatedDataList = [];
      data?.forEach((record, index) => {
        properties.forEach((property) => {
          if (record[property] || record[property] === 0) {
            let tagValue = record[property];
            if (property.includes("NomineeDOB_New") && record[property]) {
              const dateValue = new Date(record[property]);
              if (!isNaN(dateValue.getTime())) {
                // Ensure it's a valid date
                tagValue = moment(dateValue).format("DD/MM/YYYY");
              }
            }
            // if (property.includes("NomineeDOB_New")) {
            //   tagValue = moment(record[property]).format("DD/MM/YYYY");
            // }

            if (
              property === "NomineeLastName_New" &&
              typeof tagValue === "string"
            ) {
              tagValue = tagValue.length === 1 ? tagValue + "." : tagValue;
            }

            updatedDataList.push({
              Status: "Create",
              TagName: `${property}_${index + 1}`,
              TagValue: tagValue,
            });
          }
        });
      });

      return [...newArray, ...ExistingDataList, ...updatedDataList];
    } else if (selectedSubType === "changeinappointee") {
      return [
        {
          Status: "Create",
          TagName: "AdditionalNoteForCustomer",
          TagValue: values?.AdditionalNoteForCustomer?.replace(/\\n|\n/g, " ") || "",
        },
        {
          Status: "Create",
          TagName: "requestchannel",
          TagValue: values?.requestchannel,
        },
        {
          Status: "Create",
          TagName: "AppointeSalutation_Old",
          TagValue: values?.AppointeSalutation_Old ||
            isExistingAppointeeData?.AppointeSalutation_Old ||
            "",
        },
        {
          Status: "Create",
          TagName: "AppointeFirstName_Old",
          TagValue:
            values?.AppointeFirstName_Old ||
            isExistingAppointeeData?.AppointeFirstName_Old ||
            "",
        },
        {
          Status: "Create",
          TagName: "AppointeLastName_Old",
          TagValue:
            values?.AppointeLastName_Old ||
            isExistingAppointeeData?.AppointeLastName_Old ||
            "",
        },
        {
          Status: "Create",
          TagName: "AppointeDOB_Old",
          TagValue:
            (values?.AppointeDOB_Old && convertDate(values?.AppointeDOB_Old)) ||
            isExistingAppointeeData?.AppointeDOB_Old ||
            "",
        },
        {
          Status: "Create",
          TagName: "AppointeShare_Old",
          TagValue:
            values?.AppointeShare_Old ||
            isExistingAppointeeData?.AppointeShare_Old ||
            "",
        },
        {
          Status: "Create",
          TagName: "AppointeRealtionshipWithPolicyowner_Old",
          TagValue:
            values?.AppointeRealtionshipWithPolicyowner_Old ||
            isExistingAppointeeData?.AppointeRealtionshipWithPolicyowner_Old ||
            "",
        },
        {
          Status: "Create",
          TagName: "AppointeFirstName_New",
          TagValue: values?.AppointeFirstName_New || "",
        },
        {
          Status: "Create",
          TagName: "AppointeSalutation_New",
          TagValue: values?.AppointeSalutation_New,
        },
        {
          Status: "Create",
          TagName: "AppointeLastName_New",
          TagValue: values?.AppointeLastName_New
            ? values?.AppointeLastName_New.length === 1
              ? values?.AppointeLastName_New + "."
              : values?.AppointeLastName_New
            : "",
        },
        {
          Status: "Create",
          TagName: "AppointeDOB_New",
          TagValue: values?.AppointeDOB_New
    ? dayjs(values?.AppointeDOB_New).format("DD/MM/YYYY")
    : "",
        },
        {
          Status: "Create",
          TagName: "AppointeShare_New",
          TagValue: values?.AppointeShare_New || 0,
        },
        {
          Status: "Create",
          TagName: "AppointeRealtionshipWithPolicyowner_New",
          TagValue: values?.AppointeRealtionshipWithPolicyowner_New || "",
        },
        {
          Status: "Create",
          TagName: "ValidateSignature",
          TagValue: values?.ValidateSignature || "",
        },
        {
          Status: "Create",
          TagName: "Comments",
          TagValue: values?.Comments || "",
        },
        {
          Status: "Create",
          TagName: "Client_Id",
          TagValue:
            values?.PanUpdateFor_New === "1"
              ? customerData?.laClientID
              : customerData?.poClientID,
        },
        { Status: "Create", TagName: "DocLink", TagValue: isDocLink },
        { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink },
        {
          Status: "Create",
          TagName: "ProcessFileType",
          TagValue: "PROCESSENQUIRY",
        },
      ];
    }
  };

  const getPOSTransactionData = (values) => {debugger
    if (selectedSubType === "changeinnominee") {
      // let newArray =
      // [
      //   { Status: "Create", TagName: "outofrevival", TagValue: values?.outofrevival || "" },
      //   { Status: "Create", TagName: "ValidateSignature", TagValue: values?.ValidateSignature || ""},
      //   { Status: "Create", TagName: "Comments", TagValue: values?.Comments || ""},
      //   {Status: "Create",TagName: "Client_Id","TagValue":  values?.GSTINToBeUpdateFor === "1" ? customerData?.laClientID: customerData?.poClientID},
      //   { Status: "Create", TagName: "DocLink", TagValue:isDocLink },
      //   { Status: "Create", TagName: "ProcessLink", TagValue: isProcessLink},
      //   { Status: "Create", TagName: "ProcessFileType", TagValue:"PROCESSENQUIRY" }
      // ];
      // let ExistingDataList = [];
      // if(existingNomineeData?.length>0){
      //   const oldProperties = [
      //     "NomineeName_Old",
      //     "NomineeDOB_Old",
      //     "Share_Old",
      //     "RealtionshipWithPolicyowner_Old",
      //     "Role_Old"
      //   ];
      //   // Iterate over each record in the updateNomineeData array
      //   existingNomineeData?.forEach((record, recordIndex) => {
      //     // Iterate over properties and create objects for each record
      //     oldProperties.forEach((property, propertyIndex) => {
      //       if (record[property]) {
      //         let obj = {
      //           Status: "Create",
      //           TagName: `${property}_${recordIndex + 1}`,
      //           TagValue: record[property]
      //         };

      //         ExistingDataList.push(obj);
      //       }
      //     });
      //   });
      // }
      const properties = [
        "ClientID",
        "NomineeName",
        "NomineeDOB",
        "Share",
        "RealtionshipWithPolicyowner",
        "Role",
        "NomineeLastName",
        "NomineeFirstName",
        "NomineeSalutation",
      ];

      // Initialize an array to store the updated data
      let updatedDataList = [];
      // posUpdateNomineeData
      // Iterate over each record in the updateNomineeData array
      values?.posUpdateNomineeData?.forEach((record, recordIndex) => {
        // Iterate over properties and create objects for each record
        properties.forEach((property, propertyIndex) => {
          if (record[property] || record[property] == 0) {
            let obj = {
              Status: "Update",
              TagName: `${property}_${"New"}_${recordIndex + 1}`,
              TagValue: property?.includes("NomineeDOB")
                ? moment(record[property] + 1).format("DD/MM/YYYY")
                : record[property],
            };
            if (
              property?.includes("NomineeDOB") &&
              typeof record[property] == "string"
            ) {
              obj.TagValue = record[property];
            }
            if (property?.includes("RealtionshipWithPolicyowner")) {
              let recordExist = relationShipLU.find(
                (x) => x.label == record[property]
              );
              recordExist && (obj.TagValue = recordExist.value);
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
    if (selectedSubType === "changeinappointee") {
      let dobUpdate = moment(values?.AppointeDOB_New + 1).format("DD/MM/YYYY");
      return [
        {
          Status: "Update",
          TagName: "AppointeName_New",
          TagValue: values?.AppointeName_New,
        },
        {
          Status: "Update",
          TagName: "AppointeSalutation_New",
          TagValue: values?.AppointeSalutation_New,
        },
        {
          Status: "Update",
          TagName: "AppointeFirstName_New",
          TagValue: values?.AppointeFirstName_New,
        },
        {
          Status: "Update",
          TagName: "AppointeLastName_New",
          TagValue: values?.AppointeLastName_New,
        },
        { Status: "Update", TagName: "AppointeDOB_New", TagValue: dobUpdate },
        {
          Status: "Update",
          TagName: "POSComments1",
          TagValue: values?.Comments,
        },
        {
          Status: "Update",
          TagName: "AppointeRealtionshipWithPolicyowner_New",
          TagValue: values?.AppointeRealtionshipWithPolicyowner_New,
        },
      ];
    }
  };
  const hasAppointee = (nomineeData) => {
    // Check if any item in the current level has Role_New !== 'appointee'
    if (nomineeData.some((row) => row?.Role_New !== "appointee")) {
      return true;
    }

    // Check each nested level
    for (const row of nomineeData) {
      if (row?.nestedNomineeData && hasAppointee(row.nestedNomineeData)) {
        return true;
      }
    }

    return false;
  };

  const getDOBAppointeeCheck = () => {
    return updateNomineeData?.some((item, index) => {
      if (item) {
        const currentDate = new Date();
        const birthDate = new Date(item?.NomineeDOB_New);
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        const monthDiff = currentDate.getMonth() - birthDate.getMonth();

        if (
          (age < 18 || (age === 18 && monthDiff < 0)) &&
          updateNomineeData[index].Role_New === "appointee"
        ) {
          return true;
        }
      }
      return false; // Return false for cases where the condition is not met
    });
  };
  const getPOSDOBAppointeeCheck = () => {
    return posUpdateNomineeData?.some((item, index) => {
      if (item) {
        const currentDate = new Date();
        const birthDate = new Date(item?.NomineeDOB);
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        const monthDiff = currentDate.getMonth() - birthDate.getMonth();

        if (
          (age < 18 || (age === 18 && monthDiff < 0)) &&
          posUpdateNomineeData[index].Role === "appointee"
        ) {
          return true;
        }
      }
      return false; // Return false for cases where the condition is not met
    });
  };

  const isApointeeRequired = () => {
    if (
      isMinorDOB &&
      updateNomineeData?.every(
        (row) =>
          row?.Role_New !== "appointee" &&
          row?.RealtionshipWithPolicyowner_New !== "TR"
      )
    ) {
      return true;
    }
    // else if (!isMinorDOB && updateNomineeData?.some((row) => row?.Role_New === 'appointee')) {
    //   return true;
    // }
    return false;
  };
  const isPOSApointeeRequired = () => {
    if (
      isMinorDOB &&
      posUpdateNomineeData?.every(
        (row) =>
          row?.Role !== "appointee" && row?.RealtionshipWithPolicyowner !== "TR"
      )
    ) {
      return true;
    }

    return false;
  };

  const isValidAppointeeCheck = () => {
    // Assuming updateNomineeData is an array
    const hasValidAppointee = updateNomineeData?.some(
      (item) => item?.Role === "appointee" && item.isMinor
    );

    return hasValidAppointee;
  };
  const isValidPOSAppointeeCheck = () => {
    // Assuming updateNomineeData is an array
    const hasValidAppointee = posUpdateNomineeData?.some(
      (item) => item?.Role === "appointee" && item.isMinor
    );

    return hasValidAppointee;
  };

  const handleError = (errorMessage) => {
    message.destroy();
    message.error({
      content: errorMessage || "Something went wrong please try again!",
      className: "custom-msg",
      duration: 2,
    });
  };
  const handleEdit = (val) => {
    if (selectedSubType === "changeinappointee") {
      if (val === "edit") {
        setIsPosEdited(true);
        Data[selectedSubType]?.POS_Details?.forEach((element) => {
          if (element?.posEdit) {
            element.disabled = false;
          }
        });
      } else if (val === "close") {
        setIsPosEdited(false);
        Data[selectedSubType]?.POS_Details?.forEach((element) => {
          if (element?.posEdit) {
            element.disabled = true;
          }
        });
        POSContactData?.serviceRequestTransectionData?.forEach((element) => {
          posChangeinAppointeeObj[element.tagName] = element.tagValue;
        });

        form.setFieldsValue({
          AppointeName_New: posChangeinAppointeeObj?.AppointeName_New,
          AppointeDOB_New: posChangeinAppointeeObj?.AppointeDOB_New
            ? dayjs(posChangeinAppointeeObj?.AppointeDOB_New, "DD/MM/YYYY")
            : posChangeinAppointeeObj?.AppointeDOB_New,
          AppointeRealtionshipWithPolicyowner_New:
            posChangeinAppointeeObj?.AppointeRealtionshipWithPolicyowner_New,
        });
      }
    } else {
      if (val === "edit") {
        setIsEditNominee(true);
      } else if (val === "close") {
        setIsEditNominee(false);
      }
    }
  };

  // Function to count the occurrences of "appointee"
  function countAppointees(nominees) {
    let count = 0;
    for (let i = 0; i < nominees.length; i++) {
      if (nominees[i].Role_New === "appointee") {
        count++;
      }
    }
    return count;
  }

  const handleSubmit = (values) => {
    if (selectedSubType === "changeinnominee") {
      // Validate if "appointee" appears more than once
      const appointeeCount = countAppointees(updateNomineeData);
      if (appointeeCount > 1) {
        handleError("Dual Appointee Not Allowed.");
        return;
      }
      if (!isShowPOSScreen) {
        let appointeeshare = updateNomineeData.some((ele) => {
          return ele.Role_New === "appointee" && +ele.Share_New > 0;
        });
        if (appointeeshare) {
          handleError("Appointee Share Should Not be More Than 0");
          return;
        }
      } else if (isShowPOSScreen) {
        let posAppointeeshare = posUpdateNomineeData.some((ele) => {
          return ele.Role === "appointee" && +ele.Share > 0;
        });
        if (posAppointeeshare) {
          handleError("Appointee Share Should Not be More Than 0");
          return;
        }
      }

      if (checkedList?.includes("Update New Nominee Details")) {
        const nominees = (values.updateNomineeData || []).filter(r => r && Object.keys(r).length > 0);

        const hasMinor = nominees.some(n =>
          checkIsMinor(n?.NomineeDOB_New)
        );

        const hasAppointee = nominees.some(n =>
          n?.Role_New === "appointee" ||
          n?.RealtionshipWithPolicyowner_New === "TR"
        );
        if (hasMinor && !hasAppointee && !isShowPOSScreen) {
          handleError("Appointee is mandatory for minor nominee.");
          return;
        }
        if (isValidAppointeeCheck() && !isShowPOSScreen) {
          handleError("Appointee cannot be minor.");
          return;
        } else if (isShowPOSScreen && isValidPOSAppointeeCheck()) {
          handleError("Appointee cannot be minor.");
          return;
        }
        // if (!isMinorDOB && updateNomineeData?.some((row) => row?.Role_New === 'appointee')) {
        //   handleError("Appointee is allowed only for minor DOB.");
        //   return;
        // }
        if (totalShare !== 100) {
          handleError("Total Share is allowed maximum 100.");
          return;
        }
        if (getDOBAppointeeCheck()) {
          handleError(
            "Appointee and Minor DOB not allowed in the same record."
          );
          return;
        }
      } else if (isShowPOSScreen) {
        if (isPOSApointeeRequired()) {
          handleError("Appointee is mandatory for minor nominee.");
          return;
        } else if (isValidPOSAppointeeCheck()) {
          handleError("Appointee cannot be minor.");
          return;
        }

        if (totalShare !== 100) {
          handleError("Total Share is allowed maximum 100.");
          return;
        }
        if (getPOSDOBAppointeeCheck()) {
          handleError(
            "Appointee and Minor DOB not allowed in the same record."
          );
          return;
        }
      }
      if (
        checkedList?.includes("Share Nominee Change Process") &&
        !showEmailFields
      ) {
        handleError("Please select atleast one communication.");
        return;
      } else {
        // Check if at least one row is filled before submitting
        if (
          isShowPOSScreen ||
          updateNomineeData?.some(
            (row) => row?.NomineeName_New?.trim() !== ""
          ) ||
          checkedList?.includes("Share Nominee Change Process") ||
          checkedList?.includes("View Existing Nominee Details")
        ) {
          if (POSContactData && customerData?.isPOS) {
            POSActionsOnContactDetails(values, "APPROVED", null);
          } else {
            // if (
            //   values?.ValidateSignature === "no"
            // ) {
            //   getRaiseRequirements();
            // } else {
            saveRequest();
            //}
          }
        } else {
          handleError("At least one row must be filled before submitting.");
        }
      }
    } else if (selectedSubType === "changeinappointee") {
      if (checkedList?.includes("Update New Appointee") || isShowPOSScreen) {
        if (values?.AppointeDOB_New) {
          const currentDate = new Date();
          const birthDate = new Date(values?.AppointeDOB_New);
          const age = currentDate.getFullYear() - birthDate.getFullYear();
          const monthDiff = currentDate.getMonth() - birthDate.getMonth();
          if (age < 18 || (age === 18 && monthDiff < 0)) {
            handleError("Nominated Appointee cannot be minor");
            return;
          }
        }
        // if(parseFloat(values?.AppointeShare_New) !== 100){
        //   handleError("Please Enter share value is 100.");
        //   return;
        // }
      }
      if (
        checkedList?.includes("Share Process Information") &&
        !isShowPOSScreen &&
        !showEmailFields
      ) {
        handleError("Please select atleast one communication.");
        return;
      } else {
        if (POSContactData && customerData?.isPOS) {
          POSActionsOnContactDetails(values, "APPROVED", null);
        } else {
          saveRequest(values);
        }
        //  else if((values?.ValidateSignature === 'no')){
        //     getRaiseRequirements();
        //   }else{
        //}
      }
    }
  };

  const checkIsMinor = (dob) => {
  if (!dob) return false;

  const today = new Date();
  const birth = new Date(dob);

  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  const d = today.getDate() - birth.getDate();

  if (m < 0 || (m === 0 && d < 0)) age--;

  return age < 18;
};


  const handleRequirementSubmit = () => {
    const formData = form.getFieldValue();
    setRequirementLoader(true);
    if (isShowPOSScreen) {
      POSActionsOnContactDetails(null, "REJECTED", null);
    } else {
      saveRequest();
    }
  };
  const popupClose = () => {
    setRaiseRequirementOpen(false);
  };

  const getRaiseRequirements = () => {
    setRaiseRequirementOpen(true);
    setRequirementLoader(true);
    let obj = {
      calltype: props?.selectedCallType,
      subtype: props?.selectedSubTypeId,
      Role: isShowPOSScreen ? 0 : 1,
    };
    let response = apiCalls.getRaiseRequirements(obj);
    response
      .then((val) => {
        if (typeof val?.data !== "string") {
          setRaiseRequerimentList(val?.data);
          setRequirementLoader(false);
        } else {
          setRequirementLoader(false);
          handleError(
            (typeof val?.data === "string" && val?.data) ||
              val?.data?.responseBody?.errormessage ||
              "Something went wrong please try again!"
          );
        }
      })
      .catch((err) => {
        setRequirementLoader(false);
      });
  };

  const setInternalReqData = () => {
    POSContactData.serviceRequestTransectionData?.forEach((element) => {
      if (element.tagName === "InternalRequirementValue") {
        setInternalFlowRequirements(props.interlRequirementTagValue);
      }
    });
  };

  const POSActionsOnContactDetails = (values, status, list) => {debugger
    let content =
      status === "REJECTED"
        ? "Please Select Documents to Reject"
        : "Please Select Documents to move  Internally";
    let seletedRequerimentList;
    if (status === "INTERNAL") {
      seletedRequerimentList = list;
    } else if (status === "REJECTED") {
      seletedRequerimentList = raiseRequerimentList
        ?.filter((e) => e.status === true)
        ?.map((e) => e.raiseReqId);
      let dummy = "";
      seletedRequerimentList.forEach((x) => {
        dummy = x.value;
      });
    }
    let reqFormValues = requirementsForm?.getFieldsValue();
    let internalFormValues = internalReqForm?.getFieldsValue();
    if (status !== "APPROVED") {
      if (
        ((seletedRequerimentList.length === 0 && !reqFormValues?.PosOtherReq)&& status === "REJECTED") ||
        ((seletedRequerimentList.length === 0 && !internalFormValues?.PosInternalReqs) && status === "INTENAL")
      ) {
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
    let Comments = values?.Comments === "" ? values?.Comment : values?.Comments;
    let obj = {
      TransectionId: 1,
      SrvReqRefNo: POSContactData?.srvReqRefNo,
      Status: status,
      RequirementList: seletedRequerimentList,
      UsrID: loginInfo?.userProfileInfo?.profileObj?.userName,
      RoleID: loginInfo?.userProfileInfo?.profileObj?.role,
      // "RequirementComments":requirementCmnt,
      Comments: Comments,
      TransactionPayload: getPOSTransactionData(values) || [],
    };
    if (status === "INTERNAL") {
      obj.TransactionPayload.push({
        Status: "create",
        TagName: "InternalRequirementValue",
        TagValue: JSON.stringify(seletedRequerimentList),
      },
       {
            "Status": "create",
            "TagName": "PosInternalReq",
            "TagValue": internalFormValues?.PosInternalReq || ""
        },
    );
    }
    obj?.TransactionPayload?.push({
      Status: "Create",
      TagName: "POSComments1",
      TagValue: values?.comment || values?.Comments,
    });
     if(isShowPOSScreen){
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
          handleError(
            val?.data?.responseBody?.errormessage ||
              "Something went wrong please try again!"
          );
        }
        setIsLoading(false);
        setRequirementLoader(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setRequirementLoader(false);
      });
  };

  const saveRequest = () => {
    const values = form.getFieldsValue();
    if (values?.CustomerSigningDate > values?.BranchReceivedDate) {
      message.destroy();
      message.error({
        content:
          " customer signing date  can't be greater than  Request Received Date.",
        className: "custom-msg",
        duration: 3,
      });
      form.setFieldsValue({
        CustomerSigningDate: "",
      });
      setIsLoader(false);
      return;
    }
    setIsLoading(true);
     const newFilesArray = [];
    const uniqueFilesSet = new Set();

    if (uploadFiles?.length > 0) {
      uploadFiles.forEach((file) => uniqueFilesSet.add(file));
    }

    if (uploadIDMultipleFiles?.length > 0) {
      uploadIDMultipleFiles?.forEach((file) => uniqueFilesSet.add(file));
    }
    // Add all unique files to newFilesArray
    newFilesArray.push(...uniqueFilesSet);
    const obj = {
      CallType: props?.selectedCallType, // Required
      SubType: props?.selectedSubTypeId, // Required
      RequestSource: loginInfo?.userProfileInfo?.profileObj?.role || 0, // Required
      RequestChannel:
        loginInfo?.userProfileInfo?.profileObj?.role === 14
          ? 13
          : values?.requestchannel, // Required
      Category:
        checkedList?.includes("Update New Nominee Details") ||
        checkedList?.includes("Update New Appointee") ||
        raiseRequirementOpen
          ? 2
          : 1,
      ApplicationNo:
        details?.policyDetailsObj?.identifiers?.applicationNo ||
        customerData?.applicationNo,
      DOB: convertDate(customerData?.dob),
      PolicyNo:
        details?.policyDetailsObj?.identifiers?.policyNo ||
        customerData?.policyNo, // Required
      CustomerId:
        values?.GSTINToBeUpdateFor === 1
          ? customerData?.laClientID
          : customerData?.poClientID,
      CustRole: values?.custRole,
      policyStatus:
        details?.policyDetailsObj?.planAndStatus?.policyStatus ||
        customerData?.policyStatus,
      proposerName:
        details?.policyDetailsObj?.identifiers?.po_Name ||
        customerData?.po_Name,
      plan:
        details?.policyDetailsObj?.planAndStatus?.planName ||
        customerData?.planName,
      // "BranchId": 7890,
      // "CurrentStatus": 3,
      CreatedOn: new Date(),
      CreatedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
      CreatedUsrId: loginInfo?.userProfileInfo?.profileObj?.userName,
      ModifiedOn: new Date(),
      ModifiedByRef: loginInfo?.userProfileInfo?.profileObj?.userName,
      AssignedToRole: "", //POS
      AssignedByUser: 0,
      ReasonForChange: "",
      CurrentStatus: raiseRequirementOpen ? "Reject" : "",
      RequestDateTime: values?.BranchReceivedDate
        ? new Date(values?.BranchReceivedDate)
        : new Date(),
      ReasonDelayed: values?.resonfordelay || values?.ReasonForDelay,
      CustSignDateTime: values?.CustomerSigningDate
        ? new Date(values?.CustomerSigningDate)
        : new Date(),
      TransactionData: getTransactionData(values) || [],
      Uploads: newFilesArray?.length > 0 ? newFilesArray : uploadFiles,
      CommunicationRequest: [
        {
          SrvReqRefNo: "",
          TemplateID: "",
          CommType: 2,
          ReceipientTo: import.meta.env.VITE_APP_RECEIPIENT_TO
            ? import.meta.env.VITE_APP_RECEIPIENT_TO
            : clientEnquiryData?.rinternet,
          ReceipientCC: import.meta.env.VITE_APP_RECEIPIENT_CC
            ? import.meta.env.VITE_APP_RECEIPIENT_CC
            : clientEnquiryData?.rinternet,
          // "ReceipientTo": customerData?.emailID,
          // "ReceipientCC": customerData?.emailID,
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
          MobileNos: import.meta.env.VITE_APP_RECEIPIENT_MOBILENO
            ? import.meta.env.VITE_APP_RECEIPIENT_MOBILENO
            : clientEnquiryData?.rmblphone,
          // "MobileNos": customerData?.mobileNo,
          ScheduledTime: new Date(),
          CommBody: "",
          Attachments: null,
        },
      ],
    };

    if (raiseRequirementOpen) {
      let reqFormValues = requirementsForm?.getFieldsValue();
      let ids = raiseRequerimentList
        ?.filter((e) => e.status === true)
        ?.map((e) => e.raiseReqId);
      obj.TransactionData.push({
        Status: "Create",
        TagName: "ReasonList_Key",
        TagValue: JSON.stringify(ids),
      });
      obj?.TransactionData?.push({
        Status: "Create",
        TagName: "AddAnyOtherRequirements",
        TagValue: reqFormValues?.addotherReq || "",
      });
      if (ids?.length === 0 && !props?.EmailResponse?.IsEmailmanagent) {
        message.error({
          content: "Please Select Documents to Reject",
          className: "custom-msg",
          duration: 3,
        });
        setIsLoading(false);
        setRequirementLoader(false);
        return;
      }
    }

    if (props?.EmailResponse?.IsEmailmanagent) {
      obj.TransactionData.push(
        {
          Status: "Create",
          TagName: "EmailResponseId",
          TagValue: props?.EmailResponse?.EmailResponseId,
        },
        {
          Status: "Create",
          TagName: "CustomerName",
          TagValue: clientEnquiryData?.lgivname + clientEnquiryData?.lsurname,
        }
      );
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
        setIsLoading(false);
        setRequirementLoader(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setRequirementLoader(false);
      });
  };
  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day"); // Can not select days before today and today
  };
  const getInternal = (list) => {
    let values = form.getFieldsValue();
    POSActionsOnContactDetails(values, "INTERNAL", list);
  };

  let boeScreenObj = {};

  let internalData = [
    {
      name: "authorizercomments",
      label: "Authorizer Comments ",
      inputType: "text",
      required: false,
      disabled: true,
      placeholder: "Authorizer Comments",
    },
    {
      name: "Comments",
      label: "Requestor Comments",
      inputType: "textarea",
      maxlength: 500,
      required: false,
      validationmsg: "Enter Comments",
      placeholder: "Requestor Comments",
    },
    {
      name: "uploaddocuments",
      indexName: "Upload Documents",
      label: "Upload Documents",
      inputType: "upload",
      placeholder: "Upload Documents",
    },
    {
      name: "viewRequirements",
      indexName: "View Requirements",
      label: "View Requirements",
      inputType: "button",
      placeholder: "View Requirements",
    },
  ];
  useEffect(() => {
    if (customerData?.isInternalFlow) {
      POSContactData?.serviceRequestTransectionData?.forEach((element) => {
        boeScreenObj[element.tagName] = element.tagValue;
      });
      form.setFieldsValue({
        authorizercomments: boeScreenObj?.POSComments1,
      });
      setInternalReqData();
    }
  }, []);

  const handleLinkValue = (item) => {
    if (item?.label?.includes("Upload ID Proof")) {
      setIdProofModal(true);
    }
  };

  const handleRadioLink = (item) => {
    if (["Dedupe Match Details", "Bank De-Dupe"].includes(item?.label)) {
      if (POSContactData?.deDupPayload?.length > 0) {
        for (let index in POSContactData?.deDupPayload) {
          //  if(POSContactData?.deDupPayload[index]?.type ==='Name') {
          //   setNameDeDupeData(POSContactData?.deDupPayload[index]?.deDupPayload);
          // }
          if (POSContactData?.deDupPayload[index]?.type === "NEGATIVELIST") {
            setNegativeList(POSContactData?.deDupPayload[index]?.deDupPayload);
          }
        }
      }
      setNegativeModal(true);
    } else if (
      ["Name De-Dupe Match", "OFAC List Match"].includes(item?.label)
    ) {
      if (POSContactData?.deDupPayload?.length > 0) {
        for (let index in POSContactData?.deDupPayload) {
          if (
            selectedSubType === "changeinappointee" ||
            selectedSubType === "changeinnominee"
          ) {
            if (POSContactData?.deDupPayload[index]?.type === "NEGATIVELIST") {
              setNameDeDupeData(
                POSContactData?.deDupPayload[index]?.deDupPayload
              );
            } else if (POSContactData?.deDupPayload[index]?.type === "Name") {
              setNameDeDupeData(
                POSContactData?.deDupPayload[index]?.deDupPayload
              );
            }
          }
        }
      }
      setNameDeDupeModal(true);
    }
  };

  const getMultpleUploadFiles = (listOfUploadFiles, label) => {
    if (listOfUploadFiles?.length > 0) {
      setUploadIDMultipleFiles(listOfUploadFiles);
      if (idProofModal) {
        form.setFieldsValue({
          idProof: `Documents Uploaded -  ${listOfUploadFiles.length}`,
        });
      }
    }
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    fileList: [],
    customRequest: ({ file, onSuccess, index, item }, label, idProofUpload) => {
      let formData = new FormData();
      const ApplicationNo =
        details?.policyDetailsObj?.identifiers?.applicationNo;
      formData.append("File", file, ApplicationNo + "/" + file.name);
      let response = apiCalls.fileUpload(formData);
      response.then((val) => {
        if (val?.data) {
          let newDocumentObj = {
            IndexName: "Signature",
            DocumentName: file?.name,
            UserID: loginInfo?.userProfileInfo?.profileObj?.userName,
            UploadedBy: loginInfo?.userProfileInfo?.profileObj?.name,
            UploadedOn: new Date(),
            DocumentSize: file?.size,
            FileLocation: "/" + ApplicationNo + "/",
            BlobFileName: file?.name,
            FileExtnMime: file?.type,
            labelName: label,
            name: file.name,
          };
          if (idProofModal) {
            if (
              newDocumentObj.labelName &&
              isIDUploadMultipleFiles?.length > 0
            ) {
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
                getMultpleUploadFiles(updatedUploadFiles, label);
              } else {
                // If doesn't exist, add the new file object to the list
                setIsIDMultipleFiles((prevFiles) => [
                  ...prevFiles,
                  newDocumentObj,
                ]);

                // Send the updated files to getMultpleUploadFiles
                // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
                getMultpleUploadFiles(
                  [...isIDUploadMultipleFiles, newDocumentObj],
                  label
                );
              }
            } else {
              // If labelName is not present or the array is empty, add the new file object to the list
              setIsIDMultipleFiles((prevFiles) => [
                ...prevFiles,
                newDocumentObj,
              ]);

              // Send the updated files to getMultpleUploadFiles
              // if(subType==="emailupdate"||subType==="workupdate"||subType==="mobilenumberupdate")
              getMultpleUploadFiles(
                [...isIDUploadMultipleFiles, newDocumentObj],
                label
              );
            }
          }
          //getMultpleUploadFiles(documnetsObj);
          //setUploadFiles(file);
           if (uploadFiles?.length > 0 || props?.EmailResponse?.IsEmailmanagent) {
              setUploadFiles([...(uploadFiles || []), newDocumentObj]);
            } else {
              setDocIdProofs([newDocumentObj]);
             }
          if (idProofUpload === "idProofUpload") {
            if (label?.includes("Copy of Aadhar Card")) {
              setAAdharIDUploadFiles([{ ...newDocumentObj }]);
            } else if (label?.includes("Copy of Passport")) {
              setPassportIDUploadFiles([{ ...newDocumentObj }]);
            } else if (label?.includes("Copy of Ration Card")) {
              setRationCardIDUploadFiles([{ ...newDocumentObj }]);
            } else if (label?.includes("Copy of Driving License")) {
              setDrivingIDUploadFiles([{ ...newDocumentObj }]);
            } else if (label?.includes("Copy of PAN Card")) {
              setPancardIDUploadFiles([{ ...newDocumentObj }]);
            } else if (label?.includes("Copy of Voter ID")) {
              setVoterIDUploadFiles([{ ...newDocumentObj }]);
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
      });
    },
    beforeUpload: (file) => {
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
        message.error("File don't allow double extension");
        return Upload.LIST_IGNORE;
      }
    },
  };

  const handleIdProofModalClose = () => {
    setUploadFiles([]);
    setIdProofModal(false);
    setAAdharIDUploadFiles([]);
    setPassportIDUploadFiles([]);
    setRationCardIDUploadFiles([]);
    setDrivingIDUploadFiles([]);
    setVoterIDUploadFiles([]);
    setPancardIDUploadFiles([]);
  };
  const handleOk = (idProofBtn) => {
    if (idProofBtn === "idProof") {
      if (
        aadharIDUploadFiles?.length === 0 &&
        passportIDUploadFiles?.length === 0 &&
        rationCardIDUploadFiles?.length === 0 &&
        DrivingIDUploadFiles?.length === 0 &&
        voterIDUploadFiles?.length === 0 &&
        pancardIDUploadFiles?.length === 0
      ) {
        message.warning({
          content: "Please Upload atleast one file.",
          className: "custom-msg",
          duration: 2,
        });
      } else {
        // form.setFieldsValue({
        //   addressProof: uploadFiles[0].DocumentName
        // })
        setIdProofModal(false);
      }
    }
  };
  const handleRemove = (file) => {
    if (idProofModal) {
      let updatedFiles = isIDUploadMultipleFiles?.filter((ele) => {
        return ele?.labelName !== file.labelName;
      });
      setIsIDMultipleFiles(updatedFiles);
      form.setFieldsValue({
        idProof: `Documents Uploaded -  ${updatedFiles.length}`,
      });
    }
  };

  const handleofacData = (data) => {
    let name = data?.NomineeFirstName + " " + data?.NomineeLastName;
    setOfcListModal(true);
    let obj = {
      requestHeader: {
        source: "",
        policyNo: details?.policyDetailsObj?.identifiers?.policyNo,
        applicationNo: details?.policyDetailsObj?.identifiers?.applicationNo,
        dob: "",
      },
      requestBody: {
        searchtype: "C",
        lastName: "",
        percentage: 0,
        percentageCIP: 0,
        type: "",
        country: "",
        dob: "",
        name: name,
        applicationNo: details?.policyDetailsObj?.identifiers?.applicationNo,
        createdby: "",
        source: "",
        panNo: "",
        passportNo: "",
        employercheck: "",
      },
    };
    let response = apiCalls.getOFACDetailsApi(obj);
    response
      .then((val) => {
        if (val?.data) {
          setNegativeList(val?.data?.responseBody?.ofac);
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

  return (
    <>
      <Spin spinning={isLoading}>
        <Form
          //initialValues={data}
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
          {customerData?.isInternalFlow ? (
            <>
              <InternalFlow
                data={internalData}
                suffix={!isShowPOSScreen && suffix}
                policyDetails={
                  props?.details?.policyDetailsObj?.identifiers?.applicationNo
                }
                form={form}
                customerData={customerData}
                POSContactData={POSContactData}
                boeScreenObj={boeScreenObj}
                Docs={InternaRequirements}
              />
            </>
          ) : (
            <>
              {selectedSubType === "changeinnominee" && (
                <>
                  {!isShowPOSScreen && (
                    <>
                      <DetailsForm
                        data={
                          !isShowPOSScreen
                            ? Data[selectedSubType]?.BOE_Details
                            : Data[selectedSubType]?.POS_Details ||
                              Data[selectedSubType]?.BOE_Details
                        }
                        subType={selectedSubType}
                        handleDropdownChange={handleDropdownChange}
                        handleRadioChange={handleRadioChange}
                      ></DetailsForm>
                      {isShowNomineeSections && (
                        <>
                          <Row gutter={[16, 16]} className="reasons-list">
                            <Col
                              xs={24}
                              sm={24}
                              md={8}
                              lg={8}
                              xxl={8}
                              className="loan-checkboxes"
                            >
                              <Form.Item
                                label="View Existing Nominee Details"
                                name="viewExistingloandetails"
                                className="checkbox-gap"
                              >
                                <Checkbox
                                  value="View Existing Nominee Details"
                                  checked={checkedList.includes(
                                    "View Existing Nominee Details"
                                  )}
                                  onChange={() =>
                                    handleChange(
                                      "View Existing Nominee Details"
                                    )
                                  }
                                ></Checkbox>
                              </Form.Item>
                            </Col>
                            {isAllowNomineeUpdation && (
                              <>
                                <Col
                                  xs={24}
                                  sm={24}
                                  md={8}
                                  lg={8}
                                  xxl={8}
                                  className="loan-checkboxes"
                                >
                                  <Form.Item
                                    label="Update New Nominee Details"
                                    name="vieweligibleloan"
                                  >
                                    <Checkbox
                                      value="Update New Nominee Details"
                                      checked={checkedList.includes(
                                        "Update New Nominee Details"
                                      )}
                                      onChange={() =>
                                        handleChange(
                                          "Update New Nominee Details"
                                        )
                                      }
                                    ></Checkbox>
                                  </Form.Item>
                                </Col>
                              </>
                            )}
                            <Col
                              xs={24}
                              sm={24}
                              md={8}
                              lg={8}
                              xxl={8}
                              className="loan-checkboxes"
                            >
                              <Form.Item
                                label="Share Nominee Change Process"
                                name="shareprocess"
                              >
                                <Checkbox
                                  value="Share Nominee Change Process"
                                  checked={checkedList.includes(
                                    "Share Nominee Change Process"
                                  )}
                                  onChange={() =>
                                    handleChange("Share Nominee Change Process")
                                  }
                                ></Checkbox>
                              </Form.Item>
                            </Col>
                          </Row>
                        </>
                      )}
                    </>
                  )}

                  {(checkedList?.includes("View Existing Nominee Details") ||
                    isShowPOSScreen) && (
                    <>
                      <div className="mb-16">
                        <h4 className="subtype-headings fs-16 fw-500">
                          View Existing Nominee Details
                        </h4>
                        {"  "}
                        <div className="table-container email-table">
                          <table className="responsive-table">
                            <thead>
                              <tr>
                                {/* <th></th> */}
                                <th>Nominee Salutation</th>
                                <th>Nominee First Name</th>
                                <th>Nominee Last Name</th>
                                <th>Date of Birth</th>
                                <th>Role</th>
                                <th>Relationship with Life Assured</th>
                                <th>% Share</th>
                              </tr>
                            </thead>
                            <tbody>
                              {!isShowPOSScreen && (
                                <>
                                  {existingNomineeData?.map((row, index) => (
                                    <tr key={index}>
                                      {/* <td>{row.id}</td> */}
                                      <td>{row.NomineeSalutation_Old} </td>
                                      <td>{row.NomineeFirstName_Old} </td>
                                      <td>{row.NomineeLastName_Old} </td>
                                      <td>{row.NomineeDOB_Old} </td>
                                      <td>{row.Role_Old} </td>
                                      <td>
                                        {row.RealtionshipWithPolicyowner_Old}
                                     
                                      </td>
                                      <td>{row.Share_Old} </td>
                                    </tr>
                                  ))}

                                  {existingNomineeData?.length === 0 && (
                                    <tr>
                                      <td colSpan="5">
                                        <div className="text-center">
                                          <span>No data available</span>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </>
                              )}
                              {isShowPOSScreen && (
                                <>
                                  {posExistingNomineeData?.map((row, index) => (
                                    <tr key={index}>
                                      <td>{row.NomineeSalutation} </td>
                                      <td>{row.NomineeFirstName}</td>
                                      <td>{row.NomineeLastName}</td>
                                      <td>{row.NomineeDOB}</td>
                                      <td>{row.Role}</td>
                                      <td>{row.RealtionshipWithPolicyowner}</td>
                                      <td>{row.Share}</td>
                                      {/* Similarly, add other fields as needed */}
                                    </tr>
                                  ))}
                                  {posExistingNomineeData?.length === 0 && (
                                    <tr>
                                      <td colSpan="5">
                                        <div className="text-center">
                                          <span>No data available</span>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>{" "}
                    </>
                  )}
                  {(checkedList?.includes("Update New Nominee Details") ||
                    isShowPOSScreen) && (
                    <>
                      {/* <DetailsForm
                    data={Data[selectedSubType]?.New_Nominee_Details}
                    subType={selectedSubType}
                    handleDateChange={handleDateChange}

                  ></DetailsForm> */}
                      <div className="mb-16">
                        {!isShowPOSScreen && (
                          <>
                            <div className="d-flex">
                              <h4 className="subtype-headings fs-16 fw-500">
                                New Nominee/Appointee Details
                              </h4>
                              {"  "}
                              <span
                                className="d-flex justify-center"
                                style={{ paddingLeft: "10px" }}
                              >
                                <i
                                  class="bi bi-plus-circle-fill c-pointer text-color fs-18"
                                  onClick={() => handleAddRow()}
                                ></i>
                              </span>
                            </div>
                          </>
                        )}
                        {isShowPOSScreen && (
                          <>{renderDetailsForm("POS_UpdateNomineeTitle")}</>
                        )}

                        <div className="table-container email-table">
                          <table className="responsive-table">
                            <thead>
                              <tr>
                                {/* {!isShowPOSScreen && (
                                  <>
                                    {" "} */}
                                  <th> Search By Client ID</th>
                                  {/* </>
                                )} */}
                                <th> Nominee Salutation</th>
                                <th> Nominee First Name</th>
                                <th> Nominee Last Name</th>
                                <th>Date of Birth</th>
                                <th>Role</th>
                                <th>Relationship with Life Assured</th>
                                <th>% Share</th>
                                {isShowPOSScreen && <th>OFAC Check</th>}

                                {!isShowPOSScreen && (
                                  <>
                                    {" "}
                                    <th>Action</th>
                                  </>
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {!isShowPOSScreen && (
                                <>
                                  {updateNomineeData?.map((row, index) => (
                                    <tr key={row.id} className="nominee-input">
                                      <td>
                                        <Form.Item
                                            name={["updateNomineeData", row.id, "ClientID_New"]}
                                            className="inputs-label mb-0"
                                            rules={[
                                              {
                                                required: false, // not mandatory
                                                message: "Enter Client ID",
                                              },
                                            ]}
                                          >
                                          <Input
                                            placeholder="Client ID"
                                            className="cust-input"
                                            disabled
                                            suffix={
                                              <Tooltip title="Search Client">
                                                {/* <Icon type="search" /> */}
                                                <SearchOutlined
                                                  style={{ fontSize: "22px", color: "#b31b24" }}
                                                  onClick={() => {
                                                  // Instead of props.handleClientList
                                                  setIsShowClientListModal(true);
                                                  // Optionally track which row index is being edited
                                                  setTableIndex(index);
                                                  }}
                                                />
                                              </Tooltip>
                                            }
                                          />
                                        </Form.Item>
                                      </td>
                                       <td>
                                        <Form.Item
                                          name={["updateNomineeData", row.id, "NomineeSalutation_New"]}
                                          className="inputs-label mb-0"
                                          rules={[
                                            {
                                              required: true,
                                              message: "Select a Salutation",
                                            },
                                          ]}
                                        >
                                          <Select
                                            className={`inputs-label cust-input select-width`}
                                            placeholder="Salutation"
                                            options={salutationLU}
                                            // value={
                                            //   row.NomineeSalutation_New
                                            // }
                                            // onChange={(value) =>
                                            //   handleNomineeSalutationChange(
                                            //     index,
                                            //     value
                                            //   )
                                            // }
                                          />
                                        </Form.Item>
                                      </td>
                                      <td>
                                        <Form.Item
                                          name={[
                                            "updateNomineeData",
                                            row.id,
                                            "NomineeFirstName_New",
                                          ]}
                                          className="inputs-label mb-0"
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "Enter Nominee First Name",
                                            },
                                          ]}
                                        >
                                          <Input
                                            placeholder="Enter Nominee First Name"
                                            className="cust-input"
                                            // value={row.NomineeFirstName_New}
                                            maxLength={100}
                                            // onChange={(e) =>
                                            //   handleNomineeFirstNameChange(
                                            //     index,
                                            //     e.target.value
                                            //   )
                                            // }
                                          />
                                        </Form.Item>
                                      </td>
                                      <td>
                                        <Form.Item
                                          name={[
                                            "updateNomineeData",
                                            row.id,
                                            "NomineeLastName_New",
                                          ]}
                                          className="inputs-label mb-0"
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "Enter  Nominee Last Name",
                                            },
                                          ]}
                                        >
                                          <Input
                                            placeholder="Enter Nominee Last Name"
                                            className="cust-input"
                                            // value={row.NomineeLastName_New}
                                            maxLength={100}
                                            // onChange={(e) =>
                                            //   handleNomineeLastNameChange(
                                            //     index,
                                            //     e.target.value
                                            //   )
                                            // }
                                          />
                                        </Form.Item>
                                      </td>
                                      <td className="date-picker">
                                        <Form.Item
                                          name={[
                                            "updateNomineeData",
                                            row.id,
                                            "NomineeDOB_New",
                                          ]}
                                          className="inputs-label mb-0"
                                          rules={[
                                            {
                                              required: true,
                                              message: "Select a DOB",
                                            },
                                          ]}
                                        >
                                          <DatePicker
                                            allowClear={false}
                                            style={{ width: "100%" }}
                                            className="cust-input"
                                            placeholder="Select a DOB"
                                            format={dateFormat}
                                            // value={row.NomineeDOB_New}
                                            // onChange={(e) =>
                                            //   handleDobChange(e, index)
                                            // }
                                          />
                                        </Form.Item>
                                      </td>
                                      <td>
                                        {/* <Select

                                 className={`inputs-label cust-input select-width`}
                                placeholder="Select a Role"
                                defaultValue= {index === 0 && "nominee"}
                                disabled={index === 0}
                                value={row.Role_New}
                                options={[
                                  {
                                    value: "nominee",
                                    label: "Nominee",
                                  },
                                  {
                                    value: "appointee",
                                    label: "Appointee",
                                  },
                                ]}
                                onChange={(value) => handleRoleChange(index, value)}
                              /> */}
                                        <Form.Item
                                          name={[
                                            "updateNomineeData",
                                            row.id,
                                            "Role_New",
                                          ]}
                                          initialValue="nominee"
                                          className="inputs-label mb-0"
                                          rules={[
                                            {
                                              required: index !== 0, // Make it required only if index is not 0
                                              message: "Select a Role",
                                              validator: (_, value) => {
                                                if (index === 0 && !value) {
                                                  return Promise.resolve(); // Allow empty value for the first record
                                                }
                                                if (
                                                  index === 0 &&
                                                  value !== "nominee"
                                                ) {
                                                  return Promise.reject(
                                                    'The first record must have "nominee" as the Role'
                                                  );
                                                }
                                                return Promise.resolve();
                                              },
                                            },
                                          ]}
                                        >
                                          <Select
                                            className={`inputs-label cust-input select-width`}
                                            placeholder="Select a Role"
                                            defaultValue={
                                              index === 0 && row.Role_New
                                            } // Use row.Role_New if available, otherwise default to "nominee"
                                            disabled={index === 0}
                                            options={[
                                              {
                                                value: "nominee",
                                                label: "Nominee",
                                              },
                                              {
                                                value: "appointee",
                                                label: "Appointee",
                                              },
                                            ]}
                                            // onChange={(value) =>
                                            //   handleRoleChange(
                                            //     index,
                                            //     value,
                                            //     row
                                            //   )
                                            // }
                                          />
                                        </Form.Item>
                                      </td>
                                      <td>
                                        <Form.Item
                                          name={[
                                            "updateNomineeData",
                                            row.id,
                                            "RealtionshipWithPolicyowner_New",
                                          ]}
                                          className="inputs-label mb-0"
                                          rules={[
                                            {
                                              required: true,
                                              message: "Select a RelationShip",
                                            },
                                          ]}
                                        >
                                          <Select
                                            className={`inputs-label cust-input select-width`}
                                            placeholder="Select a RelationShip"
                                            options={relationShipLU}
                                            // value={
                                            //   row.RealtionshipWithPolicyowner_New
                                            // }
                                            // onChange={(value) =>
                                            //   handleRelationshipChange(
                                            //     index,
                                            //     value,
                                            //     row
                                            //   )
                                            // }
                                          />
                                        </Form.Item>
                                      </td>
                                      <td>
                                        <Form.Item
                                          name={[
                                            "updateNomineeData",
                                            row.id,
                                            "Share_New",
                                          ]}
                                          className="inputs-label mb-0"
                                          rules={[
                                            {
                                              required: true,
                                              message: "Enter a Share",
                                            },
                                          ]}
                                        >
                                          <Input
                                            className="cust-input"
                                            // value={row.Share_New}
                                            placeholder="Enter a Share"
                                            maxLength={20}
                                            onChange={(e) =>
                                              handleShareChange(
                                                index,
                                                e.target.value,
                                                row
                                              )
                                            }
                                            onKeyDown={(e) =>
                                              handleKeyDown("numbersOnly", e)
                                            }
                                          />
                                        </Form.Item>
                                      </td>

                                      <td>
                                        {index !== 0 && (
                                          <>
                                            <i
                                              class="bi bi-trash3-fill"
                                              onClick={() =>
                                                handleDeleteRow(row.id, index)
                                              }
                                              style={{
                                                color: "#b3201f",
                                                cursor: "pointer",
                                              }}
                                            ></i>
                                          </>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                  {updateNomineeData?.length === 0 && (
                                    <tr>
                                      <td colSpan="5">
                                        <div className="text-center">
                                          <span>No data available</span>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </>
                              )}

                              {isShowPOSScreen && (
                                <>
                                  {posUpdateNomineeData?.map((row, index) => (
                                    // <tr key={index}>
                                    //  <td>{row.NomineeName}</td>
                                    //   <td>{row.NomineeDOB}</td>
                                    //   <td>{row.RealtionshipWithPolicyowner}</td>
                                    //   <td>{row.Share}</td>
                                    //   <td>{row.Role}</td>
                                    // </tr>
                                    <tr key={row.id} className="nominee-input">
                                      <td>
                                        <Form.Item
                                            name={["posUpdateNomineeData", index, "ClientID"]}
                                            className="inputs-label mb-0"
                                            initialValue={row?.ClientID}
                                            rules={[
                                              {
                                                required: false, // not mandatory
                                                message: "Enter Client ID",
                                              },
                                            ]}
                                          >
                                          <Input
                                            placeholder="Client ID"
                                            className="cust-input"
                                            disabled
                                          />
                                        </Form.Item>
                                      </td>
                                      <td>
                                        <Form.Item
                                          name={["posUpdateNomineeData", index, "NomineeSalutation"]}
                                          className="inputs-label mb-0"
                                          initialValue={
                                            row?.NomineeSalutation
                                          }
                                          rules={[
                                            {
                                              required: true,
                                              message: "Select a Salutation",
                                            },
                                          ]}
                                        >
                                          <Select
                                            className={`inputs-label cust-input select-width`}
                                            placeholder="Salutation"
                                            disabled={!isEditNominee}
                                            options={salutationLU}
                                            value={
                                              row?.NomineeSalutation
                                            }
                                            onChange={(value) =>
                                              handlePOSNomineeSalutationChange(
                                                index,
                                                value
                                              )
                                            }
                                          />
                                        </Form.Item>
                                      </td>
                                      <td>
                                        <Form.Item
                                          name={[
                                            "posUpdateNomineeData",
                                            index,
                                            "NomineeFirstName",
                                          ]}
                                          className="inputs-label mb-0"
                                          initialValue={row?.NomineeFirstName} // Set the initial value here
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "Enter Nominee  First Name",
                                            },
                                          ]}
                                        >
                                          <Input
                                            placeholder="Enter Nominee First Name"
                                            className="cust-input"
                                            //value={row?.NomineeName}
                                            //defaultValue={row?.NomineeName}
                                            disabled={!isEditNominee}
                                            maxLength={100}
                                            onChange={(e) =>
                                              handlePOSNomineeFirstNameChange(
                                                index,
                                                e.target.value
                                              )
                                            }
                                          />
                                        </Form.Item>
                                      </td>
                                      <td>
                                        <Form.Item
                                          name={[
                                            "posUpdateNomineeData",
                                            index,
                                            "NomineeLastName",
                                          ]}
                                          className="inputs-label mb-0"
                                          initialValue={row?.NomineeLastName} // Set the initial value here
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "Enter Nominee  Last Name",
                                            },
                                          ]}
                                        >
                                          <Input
                                            placeholder="Enter Nominee Last Name"
                                            className="cust-input"
                                            //value={row?.NomineeName}
                                            //defaultValue={row?.NomineeName}
                                            disabled={!isEditNominee}
                                            maxLength={100}
                                            onChange={(e) =>
                                              handlePOSNomineeLastNameChange(
                                                index,
                                                e.target.value
                                              )
                                            }
                                          />
                                        </Form.Item>
                                      </td>

                                      <td className="date-picker">
                                        <Form.Item
                                          name={[
                                            "posUpdateNomineeData",
                                            index,
                                            "NomineeDOB",
                                          ]}
                                          className="inputs-label mb-0"
                                          initialValue={
                                            row?.NomineeDOB
                                              ? dayjs(
                                                  row?.NomineeDOB,
                                                  "DD/MM/YYYY"
                                                )
                                              : null
                                          }
                                          rules={[
                                            {
                                              required: true,
                                              message: "Select a DOB",
                                              validator: (_, value) => {
                                                if (!value) {
                                                  return Promise.resolve(); // Allow empty value for the first record
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
                                            value={row?.NomineeDOB}
                                            onChange={(e) =>
                                              handlePOSDobChange(e, index)
                                            }
                                            // defaultValue={row?.NomineeDOB?moment(row?.NomineeDOB, 'DD/MM/YYYY'):""}
                                            disabled={!isEditNominee}
                                          />
                                        </Form.Item>
                                      </td>
                                      <td>
                                        {/* <Select
                  className={`inputs-label cust-input select-width`}
                 placeholder="Select a Role"
                 defaultValue= {index === 0 && "nominee"}
                 disabled={index === 0}
                 value={row.Role_New}
                 options={[
                   {
                     value: "nominee",
                     label: "Nominee",
                   },
                   {
                     value: "appointee",
                     label: "Appointee",
                   },
                 ]}
                 onChange={(value) => handleRoleChange(index, value)}
               /> */}
                                        <Form.Item
                                          name={[
                                            "posUpdateNomineeData",
                                            index,
                                            "Role",
                                          ]}
                                          className="inputs-label mb-0"
                                          initialValue={row.Role}
                                          rules={[
                                            {
                                              required: true, // Make it required only if index is not 0
                                              message: "Select a Role",
                                              validator: (_, value) => {
                                                if (index === 0 && !value) {
                                                  return Promise.resolve(); // Allow empty value for the first record
                                                }
                                                if (
                                                  index === 0 &&
                                                  value !== "nominee"
                                                ) {
                                                  return Promise.reject(
                                                    'The first record must have "nominee" as the Role'
                                                  );
                                                }
                                                return Promise.resolve();
                                              },
                                            },
                                          ]}
                                        >
                                          <Select
                                            className={`inputs-label cust-input select-width`}
                                            placeholder="Select a Role"
                                            // defaultValue={row.Role} // Use row.Role_New if available, otherwise default to "nominee"
                                            value={row?.Role}
                                            disabled={!isEditNominee}
                                            options={[
                                              {
                                                value: "nominee",
                                                label: "Nominee",
                                              },
                                              {
                                                value: "appointee",
                                                label: "Appointee",
                                              },
                                            ]}
                                            onChange={(value) =>
                                              handlePOSRoleChange(
                                                index,
                                                value,
                                                row
                                              )
                                            }
                                          />
                                        </Form.Item>
                                      </td>
                                      <td>
                                        <Form.Item
                                          name={[
                                            "posUpdateNomineeData",
                                            index,
                                            "RealtionshipWithPolicyowner",
                                          ]}
                                          className="inputs-label mb-0"
                                          initialValue={
                                            row?.RealtionshipWithPolicyowner
                                          }
                                          rules={[
                                            {
                                              required: true,
                                              message: "Select a RelationShip",
                                              validator: (_, value) => {
                                                if (index === 0 && !value) {
                                                  return Promise.resolve(); // Allow empty value for the first record
                                                }
                                                return Promise.resolve();
                                              },
                                            },
                                          ]}
                                        >
                                          <Select
                                            className={`inputs-label cust-input select-width`}
                                            placeholder="Select a RelationShip"
                                            options={relationShipLU}
                                            value={
                                              row?.RealtionshipWithPolicyowner
                                            }
                                            onChange={(value) =>
                                              handlePOSRelationshipChange(
                                                index,
                                                value,
                                                row
                                              )
                                            }
                                            //  defaultValue={row?.RealtionshipWithPolicyowner}
                                            disabled={!isEditNominee}
                                          />
                                        </Form.Item>
                                      </td>
                                      <td>
                                        <Form.Item
                                          name={[
                                            "posUpdateNomineeData",
                                            index,
                                            "Share",
                                          ]}
                                          className="inputs-label mb-0"
                                          initialValue={row?.Share}
                                          rules={[
                                            {
                                              required: true,
                                              message: "Enter a Share",
                                              validator: (_, value) => {
                                                if (index === 0 && !value) {
                                                  return Promise.resolve(); // Allow empty value for the first record
                                                }
                                                return Promise.resolve();
                                              },
                                            },
                                          ]}
                                        >
                                          <Input
                                            className="cust-input"
                                            value={row?.Share}
                                            placeholder="Enter a Share"
                                            maxLength={20}
                                            onChange={(e) =>
                                              handlePOSShareChange(
                                                index,
                                                e.target.value,
                                                row
                                              )
                                            }
                                            onKeyDown={(e) =>
                                              handleKeyDown("numbersOnly", e)
                                            }
                                            //  defaultValue={row?.Share}
                                            disabled={!isEditNominee}
                                          />
                                        </Form.Item>
                                      </td>
                                      <td>
                                        <a
                                          onClick={() => handleofacData(row)}
                                          style={{ color: "#b3201f" }}
                                          className="text-label"
                                        >
                                          <span>OFAC List Match</span>
                                        </a>
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
                                </>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  )}
                  {checkedList?.includes("Share Nominee Change Process") && (
                    <>
                      <DetailsForm
                        data={Data[selectedSubType]?.Share_Nominee_process}
                        subType={selectedSubType}
                        toggleInputField={toggleInputField}
                        activeEmailIcons={activeEmailIcons}
                        activeMobileIcons={activeMobileIcons}
                        activeWhatsAppIcons={activeWhatsAppIcons}
                      ></DetailsForm>
                      {showEmailFields && (
                        <>
                          <ContactForm
                            showEmailAddress={showEmailAddress}
                            showPhoneNumber={showPhoneNumber}
                            showWhatsApp={showWhatsApp}
                          />
                        </>
                      )}
                      {/* <DetailsForm
                data={Data[selectedSubType]?.Comments}
                subType={selectedSubType}
              ></DetailsForm> */}
                    </>
                  )}
                  {checkedList?.includes("Update New Nominee Details") && (
                    <>
                      {!isShowPOSScreen && (
                        <>
                          <DetailsForm
                            data={Data[selectedSubType]?.Request_Details}
                            disabledDate={disabledDate}
                            subType={selectedSubType}
                            handleDateChange={handleDateChange}
                            form={form}
                            suffix={!isShowPOSScreen && suffix}
                            handleRadioChange={handleRadioChange}
                            getUploadFiles={getUploadFiles}
                            requestModeLU={requestModeLU}
                            handleDropdownChange={handleDropdownChange}
                            handleLinkValue={handleLinkValue}
                            handleClientList={handleClientList} // <-- ADD THIS LINE
                          ></DetailsForm>
                          {showResonDelayField && (
                            <>
                              <DetailsForm
                                data={Data[selectedSubType]?.ReasonSubmission}
                                subType={selectedSubType}
                              ></DetailsForm>
                            </>
                          )}
                        </>
                      )}
                      {isShowPOSScreen && (
                        <>
                          <DetailsForm
                            data={Data[selectedSubType]?.POS_Details}
                            subType={selectedSubType}
                            form={form}
                            handleRadioChange={handleRadioChange}
                            getUploadFiles={getUploadFiles}
                            requestModeLU={requestModeLU}
                          ></DetailsForm>
                        </>
                      )}
                    </>
                  )}
                  {isShowPOSScreen && (
                    <>
                      <DetailsForm
                        data={Data[selectedSubType]?.POS_Details}
                        subType={selectedSubType}
                        form={form}
                        handleRadioChange={handleRadioChange}
                        getUploadFiles={getUploadFiles}
                        handleTextLink={handleTextLink}
                        requestModeLU={requestModeLU}
                      ></DetailsForm>
                    </>
                  )}
                </>
              )}

              {selectedSubType === "changeinappointee" && (
                <>
                  {!isShowPOSScreen && (
                    <>
                      <Row gutter={[16, 16]} className="reasons-list">
                        <Col
                          xs={24}
                          sm={24}
                          md={8}
                          lg={8}
                          xxl={8}
                          className="loan-checkboxes"
                        >
                          <Form.Item
                            label="View Existing Appointee"
                            name="View Existing Appointee"
                            className="checkbox-gap"
                          >
                            <Checkbox
                              value="View Existing Appointee"
                              checked={checkedList.includes(
                                "View Existing Appointee"
                              )}
                              onChange={() =>
                                handleChange("View Existing Appointee")
                              }
                            ></Checkbox>
                          </Form.Item>
                        </Col>
                        <Col
                          xs={24}
                          sm={24}
                          md={8}
                          lg={8}
                          xxl={8}
                          className="loan-checkboxes"
                        >
                          <Form.Item
                            label="Update New Appointee"
                            name="UpdateNewAppointee"
                          >
                            <Checkbox
                              value="Update New Appointee"
                              checked={checkedList.includes(
                                "Update New Appointee"
                              )}
                              onChange={() =>
                                handleChange("Update New Appointee")
                              }
                            ></Checkbox>
                          </Form.Item>
                        </Col>
                        <Col
                          xs={24}
                          sm={24}
                          md={8}
                          lg={8}
                          xxl={8}
                          className="loan-checkboxes"
                        >
                          <Form.Item
                            label="Share Process Information"
                            name="shareprocess"
                          >
                            <Checkbox
                              value="Share Process Information"
                              checked={checkedList.includes(
                                "Share Process Information"
                              )}
                              onChange={() =>
                                handleChange("Share Process Information")
                              }
                            ></Checkbox>
                          </Form.Item>
                        </Col>
                      </Row>
                      {checkedList?.includes("View Existing Appointee") && (
                        <>{renderDetailsForm("Existing_Appointee_Details")}</>
                      )}
                      {checkedList?.includes("Update New Appointee") && (
                        <>
                          {renderDetailsForm("New_Appointee_Details")}
                          {renderDetailsForm("Request_Details")}
                          {/* {showResonDelayField&&<>

                {renderDetailsForm("ReasonSubmission")}
              </>} */}
                        </>
                      )}
                      {checkedList?.includes("Share Process Information") && (
                        <>
                          {renderDetailsForm("Share_Appointee_process")}
                          {showEmailFields && (
                            <>
                              <ContactForm
                                showEmailAddress={showEmailAddress}
                                showPhoneNumber={showPhoneNumber}
                                showWhatsApp={showWhatsApp}
                              />
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                  {isShowPOSScreen && <>{renderDetailsForm("POS_Details")}</>}
                </>
              )}

              {(checkedList?.length > 0 || isShowPOSScreen) && (
                <>
                  <div className="contact-details-btn">
                    {/* {(!showRaiseRequirementBtn||isShowPOSScreen)&&(
              <> */}
                    <>
                      <Button
                        type="primary"
                        className="primary-btn"
                        htmlType="submit"
                        disabled={
                          (totalShare != 100 &&
                            checkedList?.includes(
                              "Update New Nominee Details"
                            )) ||
                          showRaiseRequirementBtn ||
                          (totalShare != 100 &&
                            isShowPOSScreen &&
                            selectedSubType === "changeinnominee")
                        }
                      >
                        {isShowPOSScreen ? "Approve" : "Submit"}
                      </Button>{" "}
                      {isShowPOSScreen && (
                        <Button
                          type="primary"
                          className="primary-btn"
                          onClick={() => getRaiseRequirements()}
                          disabled={
                            totalShare != 100 &&
                            checkedList?.includes("Update New Nominee Details")
                          }
                        >
                          Raise Requirement
                        </Button>
                      )}
                      {!isShowPOSScreen &&
                        (checkedList?.includes("Update New Nominee Details") ||
                          checkedList?.includes("Update New Appointee")) && (
                          <Button
                            type="primary"
                            className="primary-btn"
                            onClick={() => getRaiseRequirements()}
                          >
                            Raise Requirement
                          </Button>
                        )}
                      {isShowPOSScreen && (
                        <InternalFlowPOS
                          interlRequirementTagValue1={
                            props.interlRequirementTagValue
                          }
                          selectedList={
                            POSContactData.serviceRequestTransectionData
                          }
                          getInternal={getInternal}
                          internalReqForm={internalReqForm}
                        />
                      )}
                    </>
                    {/* </>
            )} */}
                    {/* {(showRaiseRequirementBtn) && (
              <Button type="primary" className="primary-btn"
              htmlType="submit"
              disabled={totalShare!=100&&checkedList?.includes("Update New Nominee Details")}
              >
                Raise Requirement
              </Button>
            )} */}
                  </div>
                </>
              )}
            </>
          )}
        </Form>
      </Spin>

      <Modal
        title={
          <span style={{ color: "#b21f1f", fontWeight: "bold" }}>
            OFAC List Check Details
          </span>
        }
        open={NameDeDupeModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setNameDeDupeModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="table-container" style={{ marginTop: "0px" }}>
          <table className="responsive-table">
            <tr>
              <th>Name</th>
              <th>Program</th>
              <th>Type</th>
            </tr>
            {NameDeDupeData?.map((item, index) => (
              <tr key={index}>
                <td>{item?.name}</td>
                <td>{item?.program}</td>

                <td>{item?.type}</td>
              </tr>
            ))}
            {NameDeDupeData?.length === 0 && (
              <tr>
                <td colspan="4">
                  <div className="text-center">
                    <span>No data available</span>
                  </div>
                </td>
              </tr>
            )}
          </table>
        </div>
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
                    {raiseRequerimentList?.length > 0 && raiseRequerimentList?.map((item, ind) => (
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
                  onClick={() => handleRequirementSubmit()}
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
        title="List of Acceptable ID Proofs"
        open={idProofModal}
        destroyOnClose={true}
        width={1000}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => handleIdProofModalClose()}>
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
                  fileList={aadharIDUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Aadhar Card",
                      "idProofUpload"
                    )
                  }
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
                  fileList={passportIDUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,.pdf"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Passport",
                      "idProofUpload"
                    )
                  }
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
                  fileList={rationCardIDUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.pdf,.PDF"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Ration Card",
                      "idProofUpload"
                    )
                  }
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
                  fileList={DrivingIDUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,pdf"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Driving License",
                      "idProofUpload"
                    )
                  }
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
                  fileList={voterIDUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,pdf"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of Voter ID",
                      "idProofUpload"
                    )
                  }
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
                  fileList={pancardIDUploadFiles}
                  onRemove={handleRemove}
                  accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG,.PDF,pdf"
                  customRequest={({ file, onSuccess }) =>
                    uploadProps.customRequest(
                      { file, onSuccess },
                      "Copy of PAN Card",
                      "idProofUpload"
                    )
                  }
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

      <Modal
        title={
          <span style={{ color: "#b21f1f", fontWeight: "bold" }}>
            OFAC List Check Details
          </span>
        }
        open={ofcListModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setOfcListModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="table-container" style={{ marginTop: "0px" }}>
          <table className="responsive-table">
            <tr>
              <th>Name</th>
              <th>Program</th>
              <th>Type</th>
            </tr>
            {negativeList?.map((item, index) => (
              <tr key={index}>
                <td>{item?.name}</td>
                <td>{item?.program}</td>

                <td>{item?.type}</td>
              </tr>
            ))}
            {negativeList?.length === 0 && (
              <tr>
                <td colspan="4">
                  <div className="text-center">
                    <span>No data available</span>
                  </div>
                </td>
              </tr>
            )}
          </table>
        </div>
      </Modal>
      {showAlert && (
        <PopupAlert
          alertData={alertData}
          title={alertTitle}
          getAdvance={props.getAdvance}
          navigate={navigateTo}
          setShowAlert={setShowAlert}
        ></PopupAlert>
      )}
      {raiseRequirementOpen && (
        <>
          <RaiseRequirementPopup
            raiseRequerimentList={raiseRequerimentList}
            raiseRequirementOpen={raiseRequirementOpen}
            requirementModalLoader={requirementModalLoader}
            handleRequirementSubmit={handleRequirementSubmit}
            popupClose={popupClose}
            isShowPOSScreen={isShowPOSScreen}
            requirementsForm={requirementsForm}
          />
        </>
      )}
      <ClientListModal
        visible={isShowClientListModal}
        clientForm={form}
        setIsShowClientListModal={setIsShowClientListModal}
        userID={loginInfo?.userProfileInfo?.profileObj?.userName}
        setClientLoading={setIsLoading}
        customerData={customerData}
        inputFields={Data.changeinnominee.Request_Details}
        setUpdateFields={setUpdateFields}
        selectedSubType={selectedSubType}
        empID={loginInfo?.userProfileInfo?.profileObj?.allRoles[0]?.employeeID}
        updateNomineeData={updateNomineeData}
        setUpdateNomineeData={setUpdateNomineeData}
        tableIndex={updateNomineeData.length - 1}
      />
    </>
  );
};

export default Nomination;
