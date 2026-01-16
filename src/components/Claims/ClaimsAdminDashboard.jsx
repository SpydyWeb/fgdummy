import React, { useEffect, useState } from 'react';
import { Card, Col, DatePicker, Form, Row, Select, Spin, Button, message, Table, Switch, Tooltip, Input  } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import apiCalls from '../../api/apiCalls';
import moment from "moment";
import { useSelector } from "react-redux";
import emsdownloadicon from "../../assets/images/ems-download-icon.svg";
import { useLocation } from "react-router-dom";

const { RangePicker } = DatePicker;

const ClaimsAdminDashboard = () => {
  const [formFilters] = Form.useForm();
  const [formReassign] = Form.useForm();
  const [formAttendance] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null); // Track the selected status
  const [usersData, setUsersData] = useState([]);
  const [reassignUsersData, setReassignUsersData] = useState([]);
  const [claimsData, setClaimsData] = useState({});
  const [usersTicket, setUserTicketData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [showTotalPages, setShowTotalpages] = useState(null);
  const [tableKey, setTableKey] = useState(0); // Key to force remount
  const [isUsersData, setIsUsersData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const loggedUser = useSelector((state) => state?.userProfileInfo?.profileObj);
  const [isLOBChecked, setIsLOBChecked] = useState(false); // State for the attendance switch

  useEffect(() => {
    formFilters.resetFields();
    formReassign.resetFields();
    formAttendance.resetFields();
    setStatus(null);
    setIsLOBChecked(false);
    setFilteredTickets([]);
    setReassignUsersData([]);

    fetchDashboardData();
    
  }, [location]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Fetch data for the dashboard statistics and table
      const dashboardResponse = await apiCalls.ClaimsAdminDashBoardFilters();
      console.log("Dashboard Response:", dashboardResponse);
      if (dashboardResponse.data) {
        setClaimsData(dashboardResponse.data.claims[0]);

        const transformedUsers = dashboardResponse.data.users.map(user => ({
            label: user.userName,
            value: user.usrID,
            attendanceStatusBool: user.attendanceStatusBool,
          }));
        setUsersData(transformedUsers);

        const transformedTickets = dashboardResponse.data.userInboxWithRefNos.map(item => ({
          srvReqRefNo: item.srvReqRefNo,
          srvReqId: item.userInbox.srvReqID, // display Ticket No
          userId: item.userInbox.usrID,
          value: item.userInbox.srvReqID,
          roleId: item.userInbox.roleID 
        }));
        setUserTicketData(transformedTickets);

        const tableUsers = (dashboardResponse.data.userDetails).map(user => ({
          key: user.userId,
          userId: user.userId,
          userName: user.userName || "",
          notification: user.notificationUser ?? 0,
          primaryUser: user.primaryUser ?? 0,
          assessmentChecker: user.assessmentUser ?? 0,
          approver: user.approverUser ?? 0,
          totalCount: (user.notificationCount ?? 0) + (user.primaryUserCount ?? 0) + (user.assessmentCheckerCount ?? 0) + (user.approverCount ?? 0),
        }));
        setIsUsersData(tableUsers);
        setShowTotalpages(tableUsers.length);
      }
    } catch (error) {
      message.error('Failed to fetch dashboard data.');
    } finally {
      setIsLoading(false);
    }
  };

  // Column definitions for the table
  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      width: 180,
      sorter: (a, b) => (a.userName || "").localeCompare(b.userName || ""),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Notification",
      dataIndex: "notification",
      key: "notification",
      align: "center",
      width: 120,
      render: (text, record) => (
        <a onClick={() => handleOpenUserDetails(record, "Notification")}>
          {text}
        </a>
      ),
      sorter: (a, b) => (a.notification || 0) - (b.notification || 0),
    },
    {
      title: "Primary User",
      dataIndex: "primaryUser",
      key: "primaryUser",
      align: "center",
      width: 120,
      render: (text, record) => (
        <a onClick={() => handleOpenUserDetails(record, "PrimaryUser")}>
          {text}
        </a>
      ),
      sorter: (a, b) => (a.primaryUser || 0) - (b.primaryUser || 0),
    },
    {
      title: "Assessment Checker",
      dataIndex: "assessmentChecker",
      key: "assessmentChecker",
      align: "center",
      width: 150,
      render: (text, record) => (
        <a onClick={() => handleOpenUserDetails(record, "AssessmentChecker")}>
          {text}
        </a>
      ),
      sorter: (a, b) => (a.assessmentChecker || 0) - (b.assessmentChecker || 0),
    },
    {
      title: "Approver",
      dataIndex: "approver",
      key: "approver",
      align: "center",
      width: 100,
      render: (text, record) => (
        <a onClick={() => handleOpenUserDetails(record, "Approver")}>
          {text}
        </a>
      ),
      sorter: (a, b) => (a.approver || 0) - (b.approver || 0),
    },
  ];

  const handleReassign = async (values) => {
    setIsLoading(true);
    try {
    const selectedTicket= usersTicket.find(a => a.srvReqRefNo === values.ticket && a.userId === values.reassignFrom);
    //const selectedTicket = usersTicket.find(ticket => ticket.userId === values.reassignFrom && ticket.srvReqId === values.ticket);

    const roleId = selectedTicket ? selectedTicket.roleId : null;
    if (!roleId) {
      message.error('Role ID not found for selected ticket.');
      setIsLoading(false);
      return;
    }
    
    const response = await apiCalls.reassignClaimTickets(values.reassignFrom, selectedTicket.srvReqId, roleId, values.reassignTo);
      if (response.status === 200) {
        message.success('Claims reassigned successfully.');
        formReassign.resetFields();
        fetchDashboardData();
      } else {
        message.error('Reassignment failed. Please try again.');
      }
    } catch (error) {
      message.error('An error occurred during re-assignment.');
    } finally {
      setIsLoading(false);
    }
  };
  const convertDate = (inputDate) => {
        const formattedDate = moment(inputDate).format("YYYY-MM-DD"); // ISO 8601 date format
        return formattedDate;
      };
  
  const handleStatusChange = (value) => {
    setStatus(value); // Update status when the user selects a new status
  };

  const handleDownloadClick = async () => {
    setIsLoading(true);
    if (!status) {
      // Handle the case where no status is selected
      alert('Please select a status before downloading.');
      return;
    }

    try {
      const formData = formFilters.getFieldsValue();
      const [fromDate, toDate] = formData.srCreationDateRange || [];

      const obj = {
        ReceivedFromDt: fromDate ? convertDate(fromDate) : '',
        ReceivedToDt: toDate ? convertDate(toDate) : '',
        UserId: formData.userName || null,
        Status: formData.status,
        LoggedUserId: loggedUser.userName,
      };

      const response = await apiCalls.GetClaimsExcel(obj);

      if (response.data && response.data.fileContent) {
        console.log("fileName", response.data.fileName);
        downloadExcel(response.data.fileContent, response.data.fileName);
      } else {
        message.error("Failed to download the report. Invalid response.");
      }
    } catch (error) {
      message.error("Error occurred while downloading the report.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenUserDetails = (record, role) => {
    setSelectedUserDetails({
      userName: record.userName,
      userId: record.userId,
      role: role,
      count: record[role.charAt(0).toLowerCase() + role.slice(1)] || 0,
    });
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedUserDetails(null);
  };

  // Function to download the Base64-encoded file
  const downloadExcel = (base64Data, fileName) => {
    try{
      const base64 = base64Data.split(',').pop();

      const binaryString = window.atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);

      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Optional cleanup
      URL.revokeObjectURL(link.href);

      message.success("Download started.");
    } catch (err) {
      console.error("Failed to convert Base64 to file:", err);
      message.error("Error decoding the Excel file.");
    }
  };

  const handleUserSelection = async (userId) => {
  try {
    // Exclude "from" user from "to" dropdown
    const ticketsForUser = usersTicket.filter(ticket => ticket.userId === userId);
  setFilteredTickets(ticketsForUser);
    const remainingUsers = usersData.filter(user => user.value !== userId && user.attendanceStatusBool === true);
    setReassignUsersData(remainingUsers);
    formReassign.setFieldsValue({ reassignTo: undefined });

  } catch (error) {
    message.error("Failed");
  }
};

  const handleAttendanceChange = async (values) => {
    setIsLoading(true);
    try {
      const response = await apiCalls.ClaimAttendance(values.selectedUser, isLOBChecked);
      if (response.status === 200) {
        message.success(`User marked as ${isLOBChecked ? 'True' : 'False'} successfully.`);
        setUsersData(prevUsers =>
          prevUsers.map(user =>
            user.value === values.selectedUser
              ? { ...user, attendanceStatusBool: isLOBChecked }
              : user
          )
        );
        formAttendance.resetFields();
      } else {
        message.error('Failed to update attendance.');
      }
    } catch (error) {
      message.error('An error occurred while updating attendance.');
    } finally {
      setIsLoading(false);
    }
  };

  const statusLU = [
    { label: "NEW", value: "NEW" },
    { label: "OPEN", value: "OPEN" },
    { label: "CLOSED", value: "CLOSED" },
  ];

  return (
    <Spin spinning={isLoading}>
      <div style={{ padding: 24 }}>
        {/* Dashboard Statistics */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          {/* New Notifications */}
          <Col xs={24} sm={8}>
            <Card  bordered={false}>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>New Notifications</th>
                    <th>{(claimsData.newWithinTAT ?? 0) + (claimsData.newOutsideTAT ?? 0)}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Within TAT</td>
                    <td>{claimsData.newWithinTAT ?? 0}</td>
                  </tr>
                  <tr>
                    <td>Outside TAT</td>
                    <td>{claimsData.newOutsideTAT ?? 0}</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </Col>

          {/* Open Intimations */}
          <Col xs={24} sm={8}>
            <Card bordered={false}>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Open Intimations</th>
                    <th>{(claimsData.openWithinTAT ?? 0) + (claimsData.openOutsideTAT ?? 0)}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Within TAT</td>
                    <td>{claimsData.openWithinTAT ?? 0}</td>
                  </tr>
                  <tr>
                    <td>Outside TAT</td>
                    <td>{claimsData.openOutsideTAT ?? 0}</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </Col>

          {/* Closed Intimations */}
          <Col xs={24} sm={8}>
            <Card bordered={false}>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Closed Intimations</th>
                    <th>{(claimsData.closedWithinTAT ?? 0) + (claimsData.closedOutsideTAT ?? 0)}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Within TAT</td>
                    <td>{claimsData.closedWithinTAT ?? 0}</td>
                  </tr>
                  <tr>
                    <td>Outside TAT</td>
                    <td>{claimsData.closedOutsideTAT ?? 0}</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </Col>
        </Row>
      </div>

      <div>
        {/* Filter Section */}
        <Card bordered={false} style={{ marginBottom: 24 }}>
          <Form form={formFilters} layout="vertical">
            <Row gutter={[16, 12]}>
              <Col xs={24} sm={12} md={6}>
                <Form.Item name="userName" label="User Name">
                  <Select showSearch allowClear placeholder="Select Claim user" options={[...usersData,{ label: 'All Users', value: '' }]} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Form.Item name="status" label="Status">
                   <Select
                    showSearch
                    allowClear
                    placeholder="Select status"
                    options={statusLU}
                    onChange={handleStatusChange} // Track status change
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item name="srCreationDateRange" label="SR creation Date Range">
                  <RangePicker
                    format="DD-MM-YYYY"
                    style={{ width: '100%' }}
                    disabledDate={(current) => current && current > dayjs().endOf("day")}
                  />
                </Form.Item>
              </Col>
               <Col xs={24} sm={12} md={4} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                  <Tooltip title="Detailed Report">
                    <a onClick={handleDownloadClick} style={{ marginRight: "20px", cursor: "pointer" }}>
                      <img src={emsdownloadicon} width="24" height="24" alt="Download" />
                    </a>
                  </Tooltip>
                </Col>
            </Row>
          </Form>
        </Card>
      </div>

      <div>

        {/* Reassign Section */}
        <Card bordered={false} style={{ marginBottom: 24 }}>
          <Form form={formReassign} layout="vertical" onFinish={handleReassign}>
            <Row gutter={[16, 12]}>
              <Col xs={24} sm={6}>
                <Form.Item name="reassignFrom" label="Reassign Ticket From" rules={[{ required: true, message: 'Please select a user.' }]}>
                  <Select showSearch allowClear placeholder="Select user" options={usersData} onChange={handleUserSelection} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={6}>
                <Form.Item name="ticket" label="Reassign Ticket" rules={[{ required: true, message: 'Please select a ticket.' }]}>
                  <Select showSearch allowClear placeholder="Select Ticket" options={filteredTickets.map(ticket => ({
                    label: ticket.srvReqRefNo,  // You can change this based on how you want to display the ticket
                    value: ticket.srvReqRefNo,
                    roleId: ticket.roleId,
                  }))} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={6}>
                <Form.Item name="reassignTo" label="Reassign Ticket To" rules={[{ required: true, message: 'Please select a user.' }]}>
                  <Select showSearch allowClear placeholder="Select user" options={reassignUsersData} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={6}>
                <Form.Item style={{ marginTop: 30 }}>
                  <Button type="primary" htmlType="submit" block>Re-assign</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

      </div>
      <div>
        <Table
          key={tableKey}
          columns={columns}
          dataSource={isUsersData}
          // rowSelection={{
          //   type: 'checkbox',
          //   ...selectionType,
          // }}
          // rowKey={(record) => record.key}
          // rowClassName={() => 'editable-row'

          // }

          x={true}
          pagination={{
            pageSize: 10,
            defaultPageSize: 10,
            total: { showTotalPages },
          }}
        />
      </div>

      <div>


        {/* Attendance Section */}
        <Card bordered={false} style={{ marginTop: 24 }}>
          <Form form={formAttendance} layout="inline" onFinish={handleAttendanceChange} style={{ justifyContent: 'left' }}>
            <Form.Item label="Mark Absent/Present" name="selectedUser" rules={[{ required: true, message: 'Please select a user' }]}>
              <Select placeholder="Select User" options={usersData} style={{ width: 200 }} />
            </Form.Item>
            <Form.Item style={{ alignSelf: 'center' }}>
              <Switch
                checked={isLOBChecked}
                onChange={(checked) => setIsLOBChecked(checked)}
                checkedChildren="Present"
                unCheckedChildren="Absent"
                className="custom-switch"
                style={{
                  backgroundColor: isLOBChecked ? '#4CAF50' : '#FF5722', // Green for Present, Orange for Absent
                  borderRadius: '50px', // Optional: Make it round
                  width: '70px',  // Adjust the width for the switch
                  height: '32px', // Adjust the height for the switch
                }}
              />
            </Form.Item>
            <Form.Item style={{ alignSelf: 'center' }}>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>

        </Card>
      </div>
    </Spin>
  );
};

export default ClaimsAdminDashboard;