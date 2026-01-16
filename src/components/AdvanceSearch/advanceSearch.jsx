import React, { useState } from "react";
import { Checkbox, Spin, Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { connect } from "react-redux";
import { sentDetailsObj } from "../../reducers/policyDetailsReducer";
import { useData } from "../../reducers/DataContext";
import { useSelector } from "react-redux";
import InsurerRolesComponent from "../../utils/InsurerRoles";
import ReusableTable from "../Common/ReusableTable";
import { useSearchPolicyDetailsData } from "../../hooks/useSearchPolicyDetailsData";
import { useQueryFeedback } from "../../hooks/useQueryFeedback";

const AdvanceSearchComponent = (props) => {
  const loggedUser = useSelector((state) => state?.userProfileInfo?.profileObj);
  const { sharedData } = useData();
  const navigate = useNavigate();
  const [AssistanceOpen, setAssistanceOpen] = useState(false);
  const [roles, setRoles] = useState([]);

  // const [data, setData] = useState([]);
  const [isAdvanceVerifiedCheck, setIsAdvanceVerifiedCheck] = useState(false);

  const { data, isLoading, error, isError } =
    useSearchPolicyDetailsData(sharedData);

  useQueryFeedback({
    data,
    isLoading,
    isError,
    error,
    emptyMessage: "No policy details found",
    resetKey: sharedData,
  });
  const handlePolicyLink = (item) => {
    let sentObj = {};
    sentObj.emailId = item?.emailID;
    sentObj.mobileNo = item?.mobileNo;
    sentObj.dob = item?.dob;
    sentObj.isBOE = false;
    item.isAdvanceVerifiedCheck = isAdvanceVerifiedCheck;
    item.isBOE = false;
    props?.updateSentDetails(item);
    navigate("/policydetails", { state: item, sentObj });
  };

  const showRoleDetails = (role) => {
    setRoles(role);
    setAssistanceOpen(true);
  };

  const columns = [
    {
      title: "Verified",
      key: "verified",
      show: loggedUser?.role == 14,
      render: () => (
        <Checkbox type="checkbox" onChange={(e) => handleVerifyCheckBox(e)} />
      ),
    },
    {
      title: "Policy No",
      key: "policyNo",
      render: (text, record) => (
        <div className="gridLink" onClick={() => handlePolicyLink(record)}>
          {text}
        </div>
      ),
    },
    { title: "Application No", key: "applicationNo" },
    {
      title: "PO Name/Client ID",
      key: "poName",
      render: (_, record) => `${record.poName}/${record.poClientID}`,
    },
    {
      title: "LA Name/Client ID",
      key: "laName",
      render: (_, record) => `${record.laName}/${record.laClientID}`,
    },
    { title: "Policy Status", key: "policyStatus" },
    {
      title: "Sum Assured",
      key: "sumAssured",
      render: (text) =>
        text && (
          <NumericFormat
            value={text}
            decimalSeparator="."
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={8}
          />
        ),
    },
    {
      title: "Premium Amount",
      key: "premiumAmt",
      render: (text) =>
        text && (
          <NumericFormat
            value={text}
            decimalSeparator="."
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={8}
          />
        ),
    },
    { title: "Agent Name", key: "agentName" },
    {
      title: "Role",
      key: "role",
      render: (text) => (
        <a className="hyperLink" onClick={() => showRoleDetails(text)}>
          {text}
        </a>
      ),
    },
    { title: "Case Type", key: "caseType" },
  ];

  const handleVerifyCheckBox = (e) => {
    setIsAdvanceVerifiedCheck(e.target.checked);
  };
  return (
    <>
      <div className="main-start">
        <div className="w-94">
          <div className="advance-page">
            <div>
              <h6 className="advance-title">Latest Details / Search Results</h6>
            </div>
            <div>
              <ReusableTable
                columns={columns}
                data={data}
                isLoading={isLoading}
                pagination={{ pageSize: 10 }}
              />
            </div>
          </div>
        </div>
      </div>
      <Spin spinning={isLoading} fullscreen />

      <Modal
        title=""
        open={AssistanceOpen}
        destroyOnClose={true}
        width={400}
        closeIcon={false}
        footer={null}
      >
        <div>
          <div className="reuirement">
            <InsurerRolesComponent codes={roles} />
          </div>

          <div className="contact-details-btn">
            <Button
              type="primary"
              className="primary-btn"
              onClick={() => setAssistanceOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvanceSearchComponent);
