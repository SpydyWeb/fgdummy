import React, { useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  Card,
  Col,
  DatePicker,
  Form,
  Row,
  Space,
  Spin,
  Select,
  Button,
  Input,
  Modal,
  Tooltip,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "../assets/images/close-icon.png";
import ReusableTable from "./Common/ReusableTable";
import { formatDateSafe } from "../utils/HelperUtilites";
import { useBOEUserDashboardQuery } from "../hooks/useBOEUserDashboardQuery";
import { useEmailTATCasesQuery } from "../hooks/useEmailTATCasesQuery";
import { useSaveFollowUp } from "../hooks/useSaveFollowUp";
import { useGetFollowUpsQuery } from "../hooks/useGetFollowUpsQuery";
import { useQueryFeedback } from "../hooks/useQueryFeedback";
import { messageConstants, statusLU } from "../utils/constantLU";
import { appMessage } from "../utils/appMessage";

const EmailManagement = () => {
  const { userId } = useParams();
  const loggedUser = useSelector((state) => state?.userProfileInfo?.profileObj);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isFollowUpListModal, setIsFollowUpListModal] = useState(false);
  const [followUpType, setFollowUpType] = useState(null);
  const prepTatQueryParams = (formData) => {
    let data = {
      ReceivedFromDt: formData.dateRange
        ? formData.dateRange[0]
        : formData?.FromDate
        ? formatDateSafe(new Date(formData?.FromDate), "YYYY-MM-DD")
        : "",
      ReceivedToDt: formData.dateRange
        ? formData.dateRange[1]
        : formData?.ToDate
        ? formatDateSafe(new Date(formData?.ToDate), "YYYY-MM-DD")
        : "",
      PolicyNo: formData?.PolicyNoEmail ? formData?.PolicyNoEmail : "",
      SenderMailID: formData?.PolicyNoEmail ? formData?.PolicyNoEmail : "",
      AssignedTo:
        formData?.selectedStatus == undefined
          ? userId
            ? userId
            : loggedUser?.userName === "emailuser"
            ? "EmailUser1"
            : loggedUser?.userName
          : "",
      Status:
        formData?.selectedStatus == undefined ? "" : formData?.selectedStatus,
      IncludeClosedEmails: formData?.IncludeClosedEmails,
      IncludeSpamEmails: formData?.IncludeSpamEmails,
      Subject: formData?.subject,
      EmailResponseId: formData?.emailResponseId,
    };
    return data;
  };
  const [tatQueryParams, setTatQueryParams] = useState(() =>
    prepTatQueryParams(form.getFieldsValue())
  );
  const { data: boeDashboard, isLoading: isBOEDashboardLoading } =
    useBOEUserDashboardQuery(form.getFieldValue(), false);
  const { data: emailTATDashboard, isLoading: isEmailTATDashboardLoading } =
    useEmailTATCasesQuery(tatQueryParams);
  const handleSearch = (values = form.getFieldValue()) => {
    const newParams = prepTatQueryParams(values);
    setTatQueryParams(newParams);
  };
  const { mutate: closeFollowUp } = useSaveFollowUp();
  const {
    data: followUpData = [],
    isLoading: isFollowUpsLoading,
    isError,
  } = useGetFollowUpsQuery(followUpType);

  useQueryFeedback({
    data: followUpData,
    isLoading: isFollowUpsLoading,
    isError,
    emptyMessage: "No data found",
    resetKey: followUpData,
  });

  const columns = [
    {
      title: "Email Reference",
      dataIndex: "urn",
      sorter: (a, b) => a.from.length - b.from.length,
      sortDirections: ["descend", "ascend"],
      render: (_, record) => (
        <Space size="middle">
          <a className="text-color" onClick={() => handleAction(record)}>
            {record.urn}
          </a>
        </Space>
      ),
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      sorter: (a, b) => a.from.length - b.from.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Policy No",
      dataIndex: "policyNo",
      key: "policyNo",
    },
    {
      title: "Received Date",
      dataIndex: "receivedDateTime",
      showSorterTooltip: false,
      key: "receivedDateTime",
      render: (receivedDateTime) =>
        receivedDateTime ? formatDateSafe(receivedDateTime) : "",
      sorter: (a, b) => a.from.length - b.from.length,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },

    {
      title: "Customer Name",
      dataIndex: "custName",
      key: "custName",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Email Ageing",
      dataIndex: "emailAgeing",

      showSorterTooltip: false,
      sorter: (a, b) => a.from.length - b.from.length,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Spam",
      dataIndex: "isSpamEMS",
      key: "isSpamEMS",
      render: (isSpamEMS) => (isSpamEMS ? "Yes" : "No"),
    },

    {
      title: "Trail Found",
      dataIndex: "trailFound",
      key: "trailFound",
      render: (_, record) =>
        record.trailFound ? ( // If `true`, show "Yes" as a clickable red link
          <Space size="middle">
            <a
              className="text-red-500" // Tailwind class for red color
              onClick={() => handleSearch({ subject: record.subject })}
              style={{ color: "red", cursor: "pointer" }} // Inline style for fallback
            >
              Yes
            </a>
          </Space>
        ) : (
          "No" // If `false`, show "No" as plain text
        ),
    },
  ];

  const Followupcolumns = [
    {
      title: "Policy No",
      dataIndex: "policyNo",
      sorter: (a, b) => a.policyNo.length - b.policyNo.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Ticket No",
      dataIndex: "srvReqRefNo",
      key: "srvReqRefNo",
      sorter: (a, b) => a.srvReqRefNo.length - b.srvReqRefNo.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Call Type/Sub Type",
      dataIndex: "policyNo",
      key: "policyNo",
      render: (_, record) => `${record.callType}/${record.subType}`,
    },
    {
      title: "Follow Up With",
      dataIndex: "contactPerson",
      key: "contactPerson",
      sorter: (a, b) => a.contactPerson.length - b.contactPerson.length,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Agenda",
      dataIndex: "agenda",
      key: "agenda",
    },

    {
      title: "Follow Up Date",
      dataIndex: "nxtFollowUpDt",
      key: "nxtFollowUpDt",
      render: (nxtFollowUpDt) =>
        nxtFollowUpDt ? formatDateSafe(nxtFollowUpDt) : "",
    },

    {
      title: "Ageing",
      dataIndex: "ageing",
      key: "ageing",
    },

    {
      title: "Action",
      dataIndex: "Action",
      render: (_, record) => (
        <Button
          className="my-button"
          onClick={() => handleCloseFollowUp(record)}
        >
          Close
        </Button>
      ),
    },
  ];
  const handleCloseFollowUp = async (row) => {
    try {
      setIsFollowUpListModal(true);
      await closeFollowUp(row);
      appMessage(messageConstants.SUCCESS, {
        content: "Follow Up Request Closed!",
      });
      setIsFollowUpListModal(false);
    } catch (err) {
      appMessage(messageConstants.ERROR, {
        content:
          err?.response?.data?.responseBody?.errormessage ||
          "Something went wrong, please try again!",
      });
    }
  };
  const openFollowUps = (type) => {
    setFollowUpType(type); // triggers query
    setIsFollowUpListModal(true);
  };
  const handleAction = (item) => {
    navigate(`/emailmanagementview/${item?.emailResponseId}`, { state: item });
  };

  return (
    <>
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
          <Spin spinning={isFollowUpsLoading}>
            <ReusableTable
              columns={Followupcolumns}
              data={followUpData}
              pagination={{
                pageSize: 7,
                defaultPageSize: 7,
              }}
            />
          </Spin>
        </div>
      </Modal>
      <div style={{ background: "white" }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
            <Spin
              spinning={
                isBOEDashboardLoading && isEmailTATDashboardLoading === false
              }
            >
              {/* <h5 style={{ textAlign: "center", marginTop: "10px" }}>Email Ageing</h5> */}
              <div className="m-20">
                <Row gutter={[24, 24]}>
                  <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
                    <Card className="mb-16">
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
                        onFinish={handleSearch}
                        autoComplete="off"
                      >
                        <Row gutter={[16, 16]} className="mb-16">
                          {/* New Emails */}
                          <Col xs={24} sm={24} md={12} lg={6} xxl={6}>
                            <div>
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th>New Emails</th>
                                    <th>
                                      {emailTATDashboard?.UnAttendedMailsWithinTAT +
                                        emailTATDashboard?.UnAttendedMailsOutsideTAT}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Within TAT</td>
                                    <td>
                                      {
                                        emailTATDashboard?.UnAttendedMailsWithinTAT
                                      }
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Outside TAT</td>
                                    <td>
                                      {
                                        emailTATDashboard?.UnAttendedMailsOutsideTAT
                                      }
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </Col>

                          {/* Open Emails */}
                          <Col xs={24} sm={24} md={12} lg={6} xxl={6}>
                            <div>
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th>Open Mails</th>
                                    <th>
                                      {emailTATDashboard?.OpenCasesWithinTAT +
                                        emailTATDashboard?.OpenCasesOutsideTAT}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Within TAT</td>
                                    <td>
                                      {emailTATDashboard?.OpenCasesWithinTAT}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Outside TAT</td>
                                    <td>
                                      {emailTATDashboard?.OpenCasesOutsideTAT}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </Col>

                          {/* Closed Emails */}
                          <Col xs={24} sm={24} md={12} lg={6} xxl={6}>
                            <div>
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th>Closed Emails</th>
                                    <th>
                                      {emailTATDashboard?.ClosedCasesWithinTAT +
                                        emailTATDashboard?.ClosedCasesOutsideTAT}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Within TAT</td>
                                    <td>
                                      {emailTATDashboard?.ClosedCasesWithinTAT}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Outside TAT</td>
                                    <td>
                                      {emailTATDashboard?.ClosedCasesOutsideTAT}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </Col>

                          {/* Follow Ups */}
                          <Col xs={24} sm={24} md={12} lg={6} xxl={6}>
                            <div>
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th>Follow Ups</th>
                                    <th>
                                      {(boeDashboard?.followUpsDueToday ?? 0) +
                                        (boeDashboard?.followUpsOpen ?? 0) ||
                                        "XX"}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Due Today</td>
                                    <td
                                      onClick={() =>
                                        openFollowUps("FollowUpsDueToday")
                                      }
                                    >
                                      {boeDashboard?.followUpsDueToday ?? "XX"}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Open</td>
                                    <td
                                      onClick={() =>
                                        openFollowUps("FollowUpsOpen")
                                      }
                                    >
                                      {boeDashboard?.followUpsOpen ?? "XX"}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </Col>
                        </Row>

                        <Row
                          gutter={[8, 8]}
                          className="mb-16 mt-5 flex-wrap"
                          align="middle"
                        >
                          {/* Date Range Field */}
                          <Col xs={24} sm={12} md={10} lg={8} xxl={6}>
                            <Form.Item
                              label="Date Range"
                              name="dateRange"
                              labelCol={{ span: 8 }}
                              wrapperCol={{ span: 16 }}
                              rules={[
                                {
                                  required: true,
                                  message: "Select a date range",
                                },
                              ]}
                              className="mb-0"
                            >
                              <DatePicker.RangePicker
                                style={{ width: "100%" }}
                                format="YYYY-MM-DD"
                                allowClear
                                className="cust-input"
                                disabledDate={(current) =>
                                  current && current > dayjs().endOf("day")
                                } // Disable future dates
                                onChange={(dates) => {
                                  form.setFieldsValue({
                                    FromDate: dates ? dates[0] : null,
                                    ToDate: dates ? dates[1] : null,
                                  });
                                }}
                              />
                            </Form.Item>
                          </Col>

                          <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
                            <Form.Item
                              label="Policy No / Email"
                              name="PolicyNoEmail"
                              labelCol={{ span: 8 }}
                              wrapperCol={{ span: 16 }}
                              className="mb-0"
                              rules={[
                                { message: "Enter Policy No / Email ID" },
                              ]}
                            >
                              <Input
                                placeholder="Policy No / Email ID"
                                className="cust-input"
                              />
                            </Form.Item>
                          </Col>

                          {/* Search For (Status Select) */}
                          <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
                            <Form.Item
                              label="Search For"
                              name="selectedStatus"
                              labelCol={{ span: 8 }}
                              wrapperCol={{ span: 16 }}
                              className="mb-0"
                            >
                              <Select
                                showSearch
                                allowClear
                                className="cust-input calltype-select"
                                placeholder="Select Status"
                                options={statusLU}
                                onChange={(value) => {
                                  form.setFieldsValue({
                                    selectedStatus: value,
                                  });
                                  // setTicketStatus(value);
                                }}
                              />
                            </Form.Item>
                          </Col>

                          {/* Search Button */}
                          <Col
                            xs={24}
                            sm={6}
                            md={4}
                            lg={3}
                            xxl={2}
                            className="d-flex gap-2"
                          >
                            <Button
                              type="primary"
                              className="primary-btn"
                              htmlType="submit"
                              size="middle"
                              style={{ width: "100%" }}
                            >
                              Search
                            </Button>
                            <Button
                              type="default"
                              // className="primary-btn"
                              htmlType="button"
                              size="middle"
                              // style={{ width: "100%" }}
                              onClick={() => {
                                let formData = form.resetFields();
                                handleSearch(formData);
                              }}
                            >
                              Reset
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </Card>
                  </Col>
                </Row>
              </div>
              <div className="table-container table-responsive email-managedashboard">
                <ReusableTable
                  columns={columns}
                  data={emailTATDashboard?.emailClassifyData || []}
                  pagination={{
                    pageSize: 7,
                    defaultPageSize: 7,
                  }}
                />
              </div>
            </Spin>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default EmailManagement;
