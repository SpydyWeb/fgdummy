import React from 'react';
import CloseIcon from "../assets/images/close-icon.png";
import { Drawer, Tooltip } from "antd";

const HistoricalCommunication = (props) => {
  const { setIsCommunicationContent, historicalCommData, communicationContentHandler } = props;
console.log(props);
  return (
    <>
      <div className='w-80 mt-16'>
        View Historical Communication Details
        <Drawer
          title="Profile"
          placement="right"
          width={500}
          maskClosable={false}
          closeIcon={
            <Tooltip title="Close">
              <img src={CloseIcon} alt="Close Icon" />
            </Tooltip>
          }
        />
      </div>
      <table border className='table-hist'>
        <thead>
          <tr>
            <th>Policy No</th>
            <th>Communication Type</th>
            <th>Sent On</th>
            <th>View Content</th>
            <th>Delivery Status</th>
          </tr>
        </thead>
        <tbody>
          {historicalCommData?.length > 0 ? (
            historicalCommData.map((item, index) => (
              <tr key={index}>
                <td>{item?.policyno}</td>
                <td>{item?.commuType}</td>
                <td>{item?.sentOn}</td>
                <td
                  className='eye-icon'
                  onClick={() => {
                    setIsCommunicationContent(true);
                    communicationContentHandler(item);
                  }}
                >
                  <i className="bi bi-eye fs-2"></i>
                </td>
                <td>{item?.deliveryStatus}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                No historical communication data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default HistoricalCommunication;
