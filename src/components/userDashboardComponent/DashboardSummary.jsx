import React from "react";
import { Row, Col, Button, Checkbox } from "antd";

const SummaryTable = ({ title, data, checkboxPrefix, selectedCheckbox, handleSelection }) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th colSpan={2} className="pl-24">{title}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-24">Within TAT</td>
          <td className="p-24 text-red d-flex align-items-center justify-content-between">
            <span>{data?.withinTat ?? 'XX'}</span>
            <Checkbox
              checked={selectedCheckbox === `${checkboxPrefix}withintat`}
              onChange={() => handleSelection(`${checkboxPrefix}withintat`)}
            />
          </td>
        </tr>
        <tr style={{ backgroundColor: '#f0f0f0' }}>
          <td className="p-24">Beyond TAT</td>
          <td className="p-24 text-red d-flex align-items-center justify-content-between">
            <span>{data?.beyondTat ?? 'XX'}</span>
            <Checkbox
              // className="custom-checkbox"
              checked={selectedCheckbox === `${checkboxPrefix}beyondtat`}
              onChange={() => handleSelection(`${checkboxPrefix}beyondtat`)}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const FollowUpTable = ({ data,getDashboardFollowUpData }) => {
  return (
    <table className="table table-bordered follow-ups-box">
      <thead>
        <tr>
          <th colSpan={2} className="pl-24">Follow Ups</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-24">Due Today</td>
          <td className="p-24 text-red" onClick={() => getDashboardFollowUpData('FollowUpsDueToday')}>{data?.followUpsDueToday ?? 'XX'}</td>
        </tr>
        <tr style={{ backgroundColor: '#f0f0f0' }}>
          <td className="p-24">Open</td>
          <td className="p-24 text-red" onClick={() => getDashboardFollowUpData('FollowUpsOpen')}>{data?.followUpsOpen ?? 'XX'}</td>
        </tr>
      </tbody>
    </table>
  );
};

const DashboardButtons = ({ setIsAdvanceSearchModalOpen, handleMovetoSearch, handleRandomCall,loggedUser }) => {
  return (
    <div className="button-container">
      <Button type="primary" className="primary-btn" onClick={() => setIsAdvanceSearchModalOpen(prev => !prev)}>
        Advance Search
      </Button>
      {loggedUser?.roleName?.toLowerCase()?.includes("boe user") && <>
      <Button type="primary" className="primary-btn" onClick={handleMovetoSearch}>
        Raise SR
      </Button>
      <Button type="primary" className="primary-btn" onClick={handleRandomCall}>
        Random Call
      </Button>
      </>}
    </div>
  );
};

const DashboardSummary = ({ isTatData, selectedCheckbox, handleSelection, setIsAdvanceSearchModalOpen, handleMovetoSearch, handleRandomCall,getDashboardFollowUpData,loggedUser }) => {
  return (
    <Row gutter={[16, 16]} className="mb-16">
      {/* Pending SR */}
      <Col xs={24} sm={24} md={12} lg={6} xxl={6}>
        <SummaryTable 
          title="Pending SR" 
          data={isTatData?.dashboardSummaries?.[3]} 
          checkboxPrefix="pending" 
          selectedCheckbox={selectedCheckbox} 
          handleSelection={handleSelection} 
        />
      </Col>

      {/* Internal Requirement */}
      <Col xs={24} sm={24} md={12} lg={6} xxl={6}>
        <SummaryTable 
          title="Internal Requirement" 
          data={isTatData?.dashboardSummaries?.[2]} 
          checkboxPrefix="internal" 
          selectedCheckbox={selectedCheckbox} 
          handleSelection={handleSelection} 
        />
      </Col>

      {/* Follow Ups */}
      <Col xs={24} sm={24} md={12} lg={6} xxl={6}>
        <FollowUpTable data={isTatData} getDashboardFollowUpData={getDashboardFollowUpData} />
      </Col>

      {/* Buttons */}
      <Col xs={24} sm={24} md={12} lg={4} xxl={4}>
        <DashboardButtons 
          setIsAdvanceSearchModalOpen={setIsAdvanceSearchModalOpen} 
          handleMovetoSearch={handleMovetoSearch} 
          handleRandomCall={handleRandomCall} 
          loggedUser ={loggedUser}
        />
      </Col>
    </Row>
  );
};

export default DashboardSummary;
