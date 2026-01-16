import React from "react";
import { Modal, Tooltip, Button, Spin } from "antd";
import moment from "moment";

const FollowUpTable = ({ followUpData, isLoading, onCloseFollowUp }) => {
  return (
    <div className="table-container">
      <Spin spinning={isLoading}>
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
                    ? moment.utc(row.nxtFollowUpDt).local().format("DD/MM/YYYY")
                    : ""}
                </td>
                <td>{row.ageing}</td>
                <td>
                  <Button className="my-button" onClick={() => onCloseFollowUp(row)}>
                    Close
                  </Button>
                </td>
              </tr>
            ))}
            {followUpData?.length === 0 && (
              <tr>
                <td colSpan="8">
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
  );
};

const FollowUpModal = ({ isVisible, onClose, followUpData, isLoading, onCloseFollowUp, CloseIcon }) => {
  return (
    <Modal
      title="Follow Up List"
      open={isVisible}
      destroyOnClose={true}
      width={1200}
      closeIcon={
        <Tooltip title="Close">
          <span onClick={onClose}>
            <img src={CloseIcon} alt="Close" />
          </span>
        </Tooltip>
      }
      footer={null}
    >
      <FollowUpTable followUpData={followUpData} isLoading={isLoading} onCloseFollowUp={onCloseFollowUp} />
    </Modal>
  );
};

export default FollowUpModal;
