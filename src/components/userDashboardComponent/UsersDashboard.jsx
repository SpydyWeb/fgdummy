import React, { useEffect, useState } from "react";
import { Spin, message, Row, Col, Form, Space } from "antd";
import moment from "moment";
import { useNavigate, useLocation } from "react-router-dom";
import apiCalls from "../../api/apiCalls";
import { connect } from "react-redux";
import { sentDetailsObj } from "../../reducers/policyDetailsReducer";
import { useSelector } from "react-redux";
import CloseIcon from "../../assets/images/close-icon.png";
import DashboardSummary from "./DashboardSummary";
import FilterModal from "./FilterModal";
import FollowUpModal from "./FollowUpModal";
import RandomCallModal from "./RandomCallModal";
import DataTable from "./DataTable";
import ReusableTable from "../Common/ReusableTable";
import { filterOption } from "../../utils/HelperUtilites";

const UsersDashboard = (props) => {
  const loggedUser = useSelector((state) => state?.userProfileInfo?.profileObj);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isTatData, setIsTatData] = useState({});
  const [data, setData] = useState([]);
  const [boeList, setBoeList] = useState([]);
  const [CALL_TyPES, setCALL_TyPES] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [requestModeLU, setRequestModeLU] = useState([]);
  const [subTypeLU, setSubTypeLU] = useState(null);
  const [selectedCallType, setSelectedCallType] = useState("");
  const [selectedSubType, setSelectedSubType] = useState(null);
  const [isAdvanceSearchModalOpen, setIsAdvanceSearchModalOpen] =
    useState(false); //BOEUSER COde START
  const [isFollowUpListModal, setIsFollowUpListModal] = useState(false);
  const [followUpData, setFollowUpData] = useState([]);
  const [isRandomCallModal, setIsRandomCallModal] = useState(false);
  const [isFollowUpsLoader, setIsFollowUpsLoader] = useState(false);
  const [isClosedSRCheckBox, setIsClosedSRCheckBox] = useState(false);
  const [isPendingsr, setIsPendingsr] = useState(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const location = useLocation();
  const user = location?.state?.user;
  const disableFutureDates = (current) => {
    // Disable future dates: Allow only dates up to today
    return current && current > moment().endOf("day");
  };

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
    const isNo = value === "no";
    setIsLeadForDisabled(isNo);

    const options = isNo
      ? [{ label: "NA", value: "na" }]
      : [
          { label: "Life", value: "life" },
          { label: "General Insurance", value: "gi" },
          { label: "Group Insurance", value: "group" },
        ];

    setLeadForOptions(options);
    form.setFieldsValue({ leadFor: isNo ? "na" : undefined });
  };
  // const handleAction = (item) => {
  //   navigate("/policydetails",{ state: {serialNo:item?.serviceNo, isPOS:true,policyNo: item?.policyNo, dob: item?.dob,isPOSExec: true}});
  // };

  const handleAction = async (item) => {
    const isBOEUser = loggedUser?.roleName?.toLowerCase()?.includes("boe user");
    const isPOSUser = !isBOEUser;

    const obj = {
      applicationNo: item?.applicationNo,
      callTypeName: item?.callTypeName,
      subTypeName: item?.subTypeName,
      dob: item?.dob,
      policyNo: item?.policyNo,
      source: item?.source,
      tagName: item?.transectionData,
      isBOE: isBOEUser,
      isPOS: isPOSUser,
      serialNo: item?.serviceNo,
      isInternalFlow: isBOEUser, // This is now correctly set
      isPOSExec: isPOSUser,
    };

    setIsLoading(false);
    navigate("/policydetails", { state: obj });
  };

  const handleSearchData = (selectedVal, isPending) => {
    if (loggedUser?.roleName?.toLowerCase()?.includes("boe user")) {
      searchData(selectedVal);
    } else {
      searchGridData(selectedVal);
    }
    setIsPendingsr(isPending);
  };

  // Handle pending & internal requirement dynamically
  const handlePendingData = (selectedVal) =>
    handleSearchData(selectedVal, true);
  const handleInternalRequirementData = (selectedVal) =>
    handleSearchData(selectedVal, false);

  // Optimized request mode lookup using a Map
  const requestModeMap = new Map(
    requestModeLU?.map((mode) => [mode.value, mode.label])
  );

  function getRequestModeName(reqMode) {
    return requestModeMap.get(reqMode) || "";
  }

  const defaultColumns = [
    ...(!loggedUser?.roleName?.toLowerCase()?.includes("boe user")
      ? [
          {
            title: "ACTION",
            dataIndex: "action",
            render: (_, record) => {
              const isDisabled =
                loggedUser?.roleName?.toLowerCase()?.includes("nb user") &&
                record?.status?.toLowerCase() === "closed";

              return (
                <Space size="middle">
                  <a className={`editIcon ${isDisabled ? "disabled" : ""}`}>
                    <i
                      className="bi bi-pencil-square"
                      onClick={() => {
                        if (!isDisabled) handleAction(record);
                      }}
                      style={
                        isDisabled
                          ? { pointerEvents: "none", opacity: 0.5 }
                          : {}
                      }
                    ></i>
                  </a>
                </Space>
              );
            },
          },
        ]
      : []),
    {
      title: !loggedUser?.roleName?.toLowerCase()?.includes("boe user")
        ? "Request ID No"
        : "Ticket No",
      dataIndex: "serviceNo",
      key: "serviceNo",
      render: (_, record) => {
        const isClickable =
          !isPendingsr &&
          loggedUser?.roleName?.toLowerCase()?.includes("boe user");

        return (
          <Space size="middle">
            {isClickable ? (
              <a
                className="gridLink"
                onClick={() => handleAction(record)}
                style={{ cursor: "pointer" }}
              >
                <b>{record?.serviceNo}</b>
              </a>
            ) : (
              <span style={{ cursor: "not-allowed" }}>{record?.serviceNo}</span>
            )}
          </Space>
        );
      },
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
    {
      title: "Policy Number",
      dataIndex: "policyNo",
      key: "policyNo",
      showSorterTooltip: false,
      sorter: {
        compare: (a, b) => a.policyNo - b.policyNo,
      },
    },
    ...(!loggedUser?.roleName?.toLowerCase()?.includes("boe user")
      ? [
          {
            title: "PO Name",
            dataIndex: "poName",
            key: "policyNo",
            showSorterTooltip: false,
            sorter: {
              compare: (a, b) => a.policyNo - b.policyNo,
            },
          },
        ]
      : []), //the Assigned To column if role is "boeuser"
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
    ...(loggedUser?.roleName?.toLowerCase()?.includes("boe user")
      ? [
          {
            title: "Customer Name",
            dataIndex: "proposerName",
            key: "proposerName",
          },
        ]
      : []), //the Customer Name column if role is "boeuser"

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
    ...(loggedUser?.roleName?.toLowerCase()?.includes("boe user")
      ? [
          {
            title: "Assigned To",
            dataIndex: "assignedToName",
            key: "assignedToName",
          },
        ]
      : []), //the Assigned To column if role is "boeuser"
    ...(!loggedUser?.roleName?.toLowerCase()?.includes("boe user")
      ? [
          {
            title: "Logged by",
            dataIndex: "createdByRef",
            key: "createdByRef",
          },
        ]
      : []), //the Assigned To column if role is "boeuser"
  ];

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
      }),
    };
  });

  useEffect(() => {
    setSelectedCheckbox(null);
    getCTST();
    searchData();
    searchGridData();
  }, [location?.pathname, user]);

  const searchGridData = async (selectedVal, includeCloseSR) => {
    try {
      setIsLoading(true);
      const formData = form.getFieldsValue();
      const fromDate = formData.FormDate
        ? formData.FormDate.format("YYYY-MM-DD")
        : "";
      const toDate = formData.ToDate
        ? formData.ToDate.format("YYYY-MM-DD")
        : "";
      const PolicyNo = formData.PolicyNo
        ? formData.PolicyNo.toLowerCase().trim()
        : "";

      let obj = {
        fromDate: fromDate,
        toDate: toDate,
        policyNumber: PolicyNo,
        userId: loggedUser.userName,
        role: loggedUser.role,
        callType: selectedCallType || "",
        subType: formData?.subType || "",
        mode: formData?.mode,
        status: formData?.status === undefined ? "PENDING" : formData?.status,
        ageing: formData?.ageing,
        assignedTo: formData?.assignedTo,
        IncludeClosed: isClosedSRCheckBox,
        ...(loggedUser?.roleName?.includes("NB User") && {
          SrvReqRefNo: formData?.RequestIDNo,
        }),
      };

      const response = await apiCalls.getRoleBasedSearchDetails(
        obj,
        loggedUser?.roleName?.includes("NB User") ? "nb" : null
      );

      if (Array.isArray(response?.data)) {
        setIsLoading(false);
        const tatMapping = {
          pendingwithintat: "WithinTAT_PendingSR",
          pendingbeyondtat: "BeyondTAT_PendingSR",
          internalwithintat: "WithinTAT_Internal",
          internalbeyondtat: "BeyondTAT_Internal",
        };

        let filteredData = response?.data || [];
        if (selectedVal in tatMapping) {
          filteredData = filteredData?.filter(
            (item) => item?.dashboardTatCategory === tatMapping[selectedVal]
          );
        }
        setData(filteredData);
      } else {
        throw new Error(
          response?.data?.responseBody?.errormessage ||
            "Something went wrong, please try again!"
        );
      }
    } catch (error) {
      setIsLoading(false);
      setData([]);
      message.destroy();
      message.error({
        content: error.message,
        className: "custom-msg",
        duration: 2,
      });
    }
  };

  const searchData = async (selectedVal, includeCloseSR) => {
    try {
      setIsAdvanceSearchModalOpen(false);
      setIsLoading(true);

      const formData = form.getFieldsValue();
      const fromDate = formData.FormDate?.format("YYYY-MM-DD") || "";
      const toDate = formData.ToDate?.format("YYYY-MM-DD") || "";
      const policyNumber = formData.PolicyNo?.toLowerCase().trim() || "";

      const obj = {
        fromDate,
        toDate,
        policyNumber,
        userId: loggedUser?.userName,
        role: loggedUser?.role,
        callType: selectedCallType || "",
        subType: formData?.subType || "",
        mode: formData?.mode,
        status: formData?.status ?? "PENDING",
        ageing: formData?.ageing,
        assignedTo: formData?.assignedTo,
      };
      const response = await apiCalls.getBOEUserDashboardLatest(
        obj,
        includeCloseSR
      );
      if (response.status === 200) {
        setIsLoading(false);
        setIsTatData(response?.data);

        const tatMapping = {
          pendingwithintat: "WithinTAT_PendingSR",
          pendingbeyondtat: "BeyondTAT_PendingSR",
          internalwithintat: "WithinTAT_Internal",
          internalbeyondtat: "BeyondTAT_Internal",
        };

        let filteredData = response?.data?.pOSLists || [];
        if (selectedVal in tatMapping) {
          filteredData = filteredData.filter(
            (item) => item?.dashboardTatCategory === tatMapping[selectedVal]
          );
        }

        setBoeList(filteredData);
      } else {
        throw new Error(
          response?.data?.responseBody?.errormessage ||
            "Something went wrong, please try again!"
        );
      }
    } catch (error) {
      setBoeList([]);
      setIsLoading(false);
      setIsLoading(false);
      message.destroy();
      message.error({
        content: error.message,
        className: "custom-msg",
        duration: 2,
      });
    } finally {
      setIsLoading(false);
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
  const SaveFollowUpsData = async (selectedObj) => {
    try {
      setIsFollowUpListModal(true);
      setIsFollowUpsLoader(true);

      // Update CompleteByDt before sending
      selectedObj.CompleteByDt = new Date();

      const response = await apiCalls.SaveFollowUps(selectedObj);

      if (response?.data) {
        message.destroy();
        message.success({
          content: "Follow Up Request Closed!",
          className: "custom-msg",
          duration: 2,
        });

        setIsFollowUpsLoader(false);
        setIsFollowUpListModal(false);
      } else {
        throw new Error(
          response?.data?.responseBody?.errormessage ||
            "Something went wrong, please try again!"
        );
      }
    } catch (error) {
      console.error("Error saving follow-up data:", error);

      setIsFollowUpsLoader(false);
      setIsFollowUpListModal(true);
      message.destroy();
      message.error({
        content: error.message || "An unexpected error occurred!",
        className: "custom-msg",
        duration: 2,
      });
    }
  };

  const handleMovetoSearch = () => {
    navigate("/advancesearch");
  };
  const handleblacklistpolicy = () => {
    navigate("/blacklisted-policy");
  };
  const getCTST = async () => {
    try {
      let obj = {
        MasterRequest: ["CALL_TYP", "SUB_TYP", "REQST_MODE"],
      };

      const response = await apiCalls.ctst(obj);

      if (response?.data) {
        setMasterData(response.data);

        // Transform and set data
        setCALL_TyPES(transformData(response.data, "CALL_TYP"));
        setRequestModeLU(transformData(response.data, "REQST_MODE"));
      } else {
        throw new Error("Failed to fetch master data.");
      }
    } catch (error) {
      console.error("Error fetching CTST data:", error);
      message.destroy();
      message.error({
        content:
          error?.data?.responseBody?.errormessage ||
          "Something went wrong, please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
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
        };
      } else if (keyy === "SUB_TYP") {
        obj = {
          ...item,
          label: item.mstDesc,
          value: item.mstID,
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
      transformedData?.map((key, index) => {
        if (key.mstID === obj?.mstID) {
          const modifiedDesc = key.mstDesc?.replace(/[^\w]/g, "").toLowerCase();
          setSelectedSubType(modifiedDesc);
        }
      });

      form.setFieldsValue({ callType: slectedCALL_TYP?.mstDesc });
    }
  };

  const handleSubTypeChange = (value, getSubLU) => {
    props?.setSubTypeId(value);
    let subTypeData = subTypeLU?.length > 0 ? subTypeLU : getSubLU;
    subTypeData?.map((key, index) => {
      if (key.mstID === value) {
        const modifiedDesc = key.mstDesc?.replace(/[^\w]/g, "").toLowerCase();
        setSelectedSubType(modifiedDesc);
        props?.setSelectedSubTypeVall(key.mstDesc);
      }
    });
    //}
  };

  const handleRandomCall = () => {
    setIsRandomCallModal(true);
  };
  const handleSaveRandomCall = async (values) => {
    try {
      let obj = {
        RandomCallID: 0,
        ReceivedOn: values?.receiviedOn || new Date(),
        NameOfPerson: values?.name,
        PhoneNo: values?.phone,
        PotentialLead: values?.potentialLead === "yes",
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
          content: "Random call saved successfully!",
          className: "custom-msg",
          duration: 2,
        });

        form.resetFields(); // Resets the form instead of manually setting values
      } else {
        throw new Error(
          response?.data?.responseBody?.errormessage ||
            "Something went wrong, please try again!"
        );
      }
    } catch (error) {
      setIsRandomCallModal(true);
      message.destroy();
      message.error({
        content: error.message || "An unexpected error occurred!",
        className: "custom-msg",
        duration: 2,
      });
    }
  };

  const getDashboardFollowUpData = async (selectedFollowUpVal) => {
    try {
      setIsFollowUpListModal(true);
      setIsFollowUpsLoader(true);

      const response = await apiCalls.getDashboardFollowUps(
        selectedFollowUpVal
      );

      if (response?.data) {
        setFollowUpData(response.data);
      } else {
        message.destroy();
        setFollowUpData([]);
        message.error({
          content:
            response?.data?.responseBody?.errormessage ||
            "Something went wrong, please try again!",
          className: "custom-msg",
          duration: 2,
        });
      }
    } catch (error) {
      message.destroy();
      setFollowUpData([]);
      message.error({
        content: "An unexpected error occurred. Please try again later.",
        className: "custom-msg",
        duration: 2,
      });
    } finally {
      setIsFollowUpsLoader(false);
    }
  };

  return (
    <>
      <div className="main-start">
        <div className="w-94">
          <div className="d-flex justify-center align-center">
            <h6 className="advance-title text-center">
              {loggedUser?.roleName + " Dashboard"}
            </h6>
          </div>

          <DashboardSummary
            isTatData={isTatData}
            selectedCheckbox={selectedCheckbox}
            handleSelection={handleSelection}
            setIsAdvanceSearchModalOpen={setIsAdvanceSearchModalOpen}
            handleMovetoSearch={handleMovetoSearch}
            handleRandomCall={handleRandomCall}
            getDashboardFollowUpData={getDashboardFollowUpData}
            loggedUser={loggedUser}
            handleblacklistpolicy={handleblacklistpolicy}
          />

          <Row gutter={[24]} className="mb-16">
            <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
              <ReusableTable
                columns={columns}
                data={
                  loggedUser?.roleName?.toLowerCase()?.includes("boe user")
                    ? boeList
                    : data
                }
                loading={isLoading}
                pagination={true}
              />
            </Col>
          </Row>
        </div>
      </div>
      {isAdvanceSearchModalOpen && (
        <>
          <FilterModal
            isOpen={isAdvanceSearchModalOpen}
            onClose={() => setIsAdvanceSearchModalOpen(false)}
            form={form}
            onFinish={searchGridData}
            callTypes={CALL_TyPES}
            subTypes={subTypeLU} // Pass sub type options
            requestModes={requestModeLU} // Pass mode options
            statuses={statusLU} // Pass status options
            onSearch={onSearch}
            onCallTypeChange={(value, option) => {
              handleCallTypeChange(value, option);
            }}
            rules={[{ required: false, message: "Required" }]}
            dateFormat="YYYY-MM-DD"
            loggedUser={loggedUser}
          />
        </>
      )}

      <FollowUpModal
        isVisible={isFollowUpListModal}
        onClose={() => setIsFollowUpListModal(false)}
        followUpData={followUpData}
        isLoading={isFollowUpsLoader}
        onCloseFollowUp={SaveFollowUpsData}
        CloseIcon={CloseIcon}
      />

      <RandomCallModal
        visible={isRandomCallModal}
        onClose={() => setIsRandomCallModal(false)}
        onFinish={handleSaveRandomCall}
        form={form}
        dateFormat="YYYY-MM-DD"
        disableFutureDates={disableFutureDates}
        potentialLeadLu={potentialLeadLu}
        handlePotentialLeadChange={handlePotentialLeadChange}
        filterOption={filterOption}
        leadForOptions={leadForOptions}
        onSearch={onSearch}
        isLeadForDisabled={isLeadForDisabled}
      />
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
export default connect(mapStateToProps, mapDispatchToProps)(UsersDashboard);
