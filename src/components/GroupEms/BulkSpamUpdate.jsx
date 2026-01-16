import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  Button,
  Space,
  Typography,
  Modal,
  Tooltip,
  message,
  Input,
  Spin,
  Tabs,
  Form,
} from "antd";
import {
  RollbackOutlined,
  WarningOutlined,
  EyeOutlined,
  ReloadOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import apicalls from "../../api/apiCalls";
import DatePipe from "./Common/DatePipe";
import "./GroupEms.css";

const { Text } = Typography;

const BulkSpamUpdate = ({ onBack }) => {
  const [activeKey, setActiveKey] = useState("bulk");

  // Tab 1: Bulk Spam Update
  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [searchTexts, setSearchTexts] = useState({});
  const searchInputRef = useRef(null);

  // Tab 2: Spam Email Addresses
  const [spamListLoading, setSpamListLoading] = useState(false);
  const [spamEmails, setSpamEmails] = useState([]);
  const [addLoading, setAddLoading] = useState(false);
  const [addForm] = Form.useForm();

  // ------------ Helpers ------------
  const getColumnSearchProps = (dataIndex, displayFn) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInputRef}
          placeholder="Search"
          value={selectedKeys[0]}
          onChange={(e) => {
            const val = e.target.value;
            setSelectedKeys(val ? [val] : []);
          }}
          onPressEnter={() => {
            confirm();
            setSearchTexts((prev) => ({
              ...prev,
              [dataIndex]: selectedKeys[0] || "",
            }));
          }}
          style={{ marginBottom: 8, display: "block" }}
          size="small"
        />
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<SearchOutlined />}
            onClick={() => {
              confirm();
              setSearchTexts((prev) => ({
                ...prev,
                [dataIndex]: selectedKeys[0] || "",
              }));
            }}
          >
            Search
          </Button>
          <Button
            size="small"
            onClick={() => {
              clearFilters();
              setSearchTexts((prev) => ({ ...prev, [dataIndex]: "" }));
              confirm();
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      const raw = displayFn ? displayFn(record) : record[dataIndex];
      return String(raw ?? "")
        .toLowerCase()
        .includes(String(value).toLowerCase());
    },
  });

  // ------------ Tab 1: Bulk Spam Update ------------
  const fetchInitialEmails = async () => {
    setLoading(true);
    try {
      const payload = {
        fromDate: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
        toDate: dayjs().format("YYYY-MM-DD"),
        statusCondition: "NEW",
      };
      const res = await apicalls.GetRecivedEmails(payload);
      const data = res?.data || {};
      const rawList =
        data.emails || data.Emails || (Array.isArray(data) ? data : []);
      const list = rawList.map((e, i) => ({
        key: e.InboxEmailId ?? e.inboxEmailId ?? i,
        InboxEmailId: e.InboxEmailId ?? e.inboxEmailId,
        EmailResponseId: e.EmailResponseId ?? e.emailResponseId,
        ReceivedDateTime: e.ReceivedDateTime ?? e.receivedDateTime,
        Subject: e.Subject ?? e.subject,
        From: e.From ?? e.from,
      }));
      setEmails(list);
    } catch {
      message.error("Failed to load new cases");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeKey === "bulk") fetchInitialEmails();
  }, [activeKey]);

  const openPreview = async (record) => {
    setPreviewOpen(true);
    setPreviewLoading(true);
    try {
      const res = await apicalls.GetCaseDetails({
        inboxEmailId: record.InboxEmailId,
        emailResponseId: record.EmailResponseId,
      });
      const raw = res?.data || {};
      setPreviewItem({
        Subject: record.Subject || raw.subject || raw.Subject || "",
        Body: raw.body ?? raw.Body ?? "",
        From: raw.from ?? raw.From ?? record.From ?? "",
        EmailResponseId:
          raw.emailResponseId ??
          raw.EmailResponseId ??
          record.EmailResponseId ??
          "",
        ReceivedDateTime:
          raw.receivedDateTime ??
          raw.ReceivedDateTime ??
          record.ReceivedDateTime ??
          "",
      });
    } catch {
      message.error("Failed to load email body");
      setPreviewItem({
        Subject: record.Subject || "-",
        Body: "",
        From: record.From || "",
        EmailResponseId: record.EmailResponseId || "",
        ReceivedDateTime: record.ReceivedDateTime || "",
      });
    } finally {
      setPreviewLoading(false);
    }
  };

  const requestMarkSpam = () => {
    if (!selectedRowKeys.length) {
      message.info("Select at least one case");
      return;
    }
    setConfirmOpen(true);
  };

  const handleMarkSpamConfirmed = async () => {
    const payload = { InboxEmailIds: selectedRowKeys };
    setLoading(true);
    try {
      const apiFn = apicalls.MarkEmailsAsSpam;
      if (!apiFn) {
        message.error("Bulk spam API not available");
        setLoading(false);
        setConfirmOpen(false);
        return;
      }
      const res = await apiFn(payload);
      const ok =
        res?.data?.Result ??
        res?.Result ??
        res?.data?.result ??
        res?.result ??
        false;
      const serverMsg =
        res?.data?.Message ??
        res?.Message ??
        res?.data?.message ??
        res?.message ??
        (ok ? "Marked as spam." : "Bulk spam update failed.");

      if (ok) {
        message.success(serverMsg);
        setSelectedRowKeys([]);
        fetchInitialEmails();
      } else {
        message.error(serverMsg || "Bulk spam update failed");
      }
    } catch {
      message.error("Bulk spam update failed");
    } finally {
      setLoading(false);
      setConfirmOpen(false);
    }
  };

  const bulkColumns = [
    {
      title: "Email Response Id",
      dataIndex: "EmailResponseId",
      render: (val) => (
        <Tooltip title={val || "-"}>
          <span className="groupems-cell-ellipsis">{val || "-"}</span>
        </Tooltip>
      ),
      sorter: (a, b) =>
        (a.EmailResponseId || "").localeCompare(b.EmailResponseId || ""),
      ...getColumnSearchProps("EmailResponseId"),
    },
    {
      title: "Sender Email",
      dataIndex: "From",
      render: (val) => (
        <Tooltip title={val || "-"}>
          <span className="groupems-cell-ellipsis">{val || "-"}</span>
        </Tooltip>
      ),
      sorter: (a, b) => (a.From || "").localeCompare(b.From || ""),
      ...getColumnSearchProps("From"),
    },
    {
      title: "Received Date Time",
      dataIndex: "ReceivedDateTime",
      render: (_, r) => <DatePipe value={r.ReceivedDateTime} />,
      sorter: (a, b) =>
        new Date(a.ReceivedDateTime || 0) - new Date(b.ReceivedDateTime || 0),
      ...getColumnSearchProps(
        "ReceivedDateTime",
        (r) => r.ReceivedDateTime || ""
      ),
    },
    {
      title: "Subject",
      dataIndex: "Subject",
      render: (val, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => openPreview(record)}
          style={{ padding: 0 }}
        >
          {val || "-"}
        </Button>
      ),
      sorter: (a, b) => (a.Subject || "").localeCompare(b.Subject || ""),
    },
  ];

  // ------------ Tab 2: Spam Email Addresses ------------
  const fetchSpamEmailList = async () => {
    setSpamListLoading(true);
    try {
      const res = await apicalls.GetSpamEmailAddressesList?.();
      const data = res?.data || res || {};
      const arr = Array.isArray(data)
        ? data
        : data.SpamEmailAddresses || data.spamEmailAddresses || [];
      const list = arr.map((x, i) => ({
        key: x.Id ?? x.id ?? i,
        Id: x.Id ?? x.id ?? null,
        Email: x.Email ?? x.email ?? "",
        AddedOn: x.AddedOn ?? x.addedOn ?? null,
        AddedBy: x.AddedBy ?? x.addedBy ?? "",
      }));
      setSpamEmails(list);
    } catch {
      message.error("Failed to load spam emails");
    } finally {
      setSpamListLoading(false);
    }
  };

  const handleAddSpamEmail = async (values) => {
    setAddLoading(true);
    try {
      const payload = {
        spamEmailId: values.email?.trim(),
      };
      const res = await apicalls.AddSpamEmailAddress?.(payload);
      const ok =
        res?.data?.Result ??
        res?.Result ??
        res?.data?.result ??
        res?.result ??
        false;
      if (ok) {
        message.success("Email added to spam list");
        addForm.resetFields();
        fetchSpamEmailList();
      } else {
        message.error("Failed to add spam email");
      }
    } catch {
      message.error("Failed to add spam email");
    } finally {
      setAddLoading(false);
    }
  };

  useEffect(() => {
    if (activeKey === "list") fetchSpamEmailList();
  }, [activeKey]);

  const spamColumns = [
    {
      title: "Email",
      dataIndex: "Email",
      render: (val) => (
        <Tooltip title={val || "-"}>
          <span className="groupems-cell-ellipsis">{val || "-"}</span>
        </Tooltip>
      ),
      sorter: (a, b) => (a.Email || "").localeCompare(b.Email || ""),
      ...getColumnSearchProps("Email"),
    },
    {
      title: "Added On",
      dataIndex: "AddedOn",
      render: (_, r) => (r.AddedOn ? <DatePipe value={r.AddedOn} /> : "-"),
      sorter: (a, b) => new Date(a.AddedOn || 0) - new Date(b.AddedOn || 0),
    },
    {
      title: "Added By",
      dataIndex: "AddedBy",
      sorter: (a, b) => (a.AddedBy || "").localeCompare(b.AddedBy || ""),
    },
  ];

  // ------------ Render ------------
  return (
    <div className="tat-page-wrapper">
      <div className="tat-top-bar">
        <Button
          type="link"
          icon={<RollbackOutlined />}
          onClick={onBack}
          className="tat-back-btn"
        >
          Back
        </Button>
      </div>

      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        items={[
          {
            key: "bulk",
            label: "Bulk Spam Update",
            children: (
              <>
                <div style={{ marginBottom: 10, display: "flex", gap: 8 }}>
                  <Button
                    type="text"
                    icon={
                      <ReloadOutlined
                        style={{ color: "#ff4d4f", fontSize: 18 }}
                      />
                    }
                    onClick={fetchInitialEmails}
                    title="Refresh"
                  />
                  <Button
                    type="primary"
                    danger
                    icon={<WarningOutlined />}
                    onClick={requestMarkSpam}
                    disabled={!selectedRowKeys.length}
                  >
                    Mark Selected as Spam
                  </Button>
                </div>

                <Table
                  className="tat-table"
                  rowSelection={{
                    selectedRowKeys,
                    onChange: setSelectedRowKeys,
                    getCheckboxProps: (record) => ({
                      value: record.InboxEmailId,
                    }),
                  }}
                  columns={bulkColumns}
                  dataSource={emails}
                  loading={loading}
                  rowKey="InboxEmailId"
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: false,
                    showTotal: (t) => `Total ${t} emails`,
                  }}
                  size="small"
                />

                <Modal
                  open={previewOpen}
                  onCancel={() => setPreviewOpen(false)}
                  footer={null}
                  title={previewItem?.Subject || "Email Preview"}
                  width={800}
                  destroyOnClose
                >
                  <Spin spinning={previewLoading}>
                    <div className="trail-mail-meta-grid bulk-preview-meta-grid">
                      <div className="trail-mail-grid-row">
                        <div className="trail-mail-grid-cell">
                          <span className="trail-mail-grid-label bulk-preview-label">
                            Email Response Id:
                          </span>
                          <span className="trail-mail-grid-value">
                            {previewItem?.EmailResponseId || "-"}
                          </span>
                        </div>
                        <div className="trail-mail-grid-cell">
                          <span className="trail-mail-grid-label bulk-preview-label">
                            From:
                          </span>
                          <span className="trail-mail-grid-value">
                            {previewItem?.From || "-"}
                          </span>
                        </div>
                      </div>
                      <div className="trail-mail-grid-row">
                        <div className="trail-mail-grid-cell">
                          <span className="trail-mail-grid-label bulk-preview-label">
                            Received:
                          </span>
                          <span className="trail-mail-grid-value">
                            <DatePipe value={previewItem?.ReceivedDateTime} />
                          </span>
                        </div>
                        <div className="trail-mail-grid-cell">
                          <span className="trail-mail-grid-label bulk-preview-label">
                            Subject:
                          </span>
                          <span className="trail-mail-grid-value">
                            {previewItem?.Subject || "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        maxHeight: 520,
                        overflowY: "auto",
                        border: "1px solid #f0f0f0",
                        padding: 12,
                        borderRadius: 6,
                        background: "#fff",
                      }}
                      className="bulk-preview-body"
                      dangerouslySetInnerHTML={{
                        __html:
                          (previewItem?.Body || "")
                            .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
                            .replace(
                              /<style[\s\S]*?>[\s\S]*?<\/style>/gi,
                              ""
                            ) || "<i>No content</i>",
                      }}
                    />
                  </Spin>
                </Modal>

                <Modal
                  open={confirmOpen}
                  onCancel={() => setConfirmOpen(false)}
                  footer={null}
                  title="Confirm Mark as Spam"
                  width={420}
                  destroyOnClose
                >
                  <div style={{ marginBottom: 16 }}>
                    <Text style={{ fontWeight: 600 }}>
                      Are you sure you want to mark the selected{" "}
                      {selectedRowKeys.length} case(s) as spam and close them?
                    </Text>
                  </div>
                  <Space>
                    <Button
                      className="confirm-yes-btn"
                      onClick={handleMarkSpamConfirmed}
                      icon={<WarningOutlined />}
                    >
                      Yes
                    </Button>
                    <Button
                      className="confirm-no-btn"
                      onClick={() => setConfirmOpen(false)}
                    >
                      No
                    </Button>
                  </Space>
                </Modal>
              </>
            ),
          },
          {
            key: "list",
            label: "Spam Email Addresses",
            children: (
              <>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Button
                    type="text"
                    icon={
                      <ReloadOutlined
                        style={{ color: "#1677ff", fontSize: 18 }}
                      />
                    }
                    onClick={fetchSpamEmailList}
                    title="Refresh List"
                  />
                </div>

                <Form
                  form={addForm}
                  layout="inline"
                  onFinish={handleAddSpamEmail}
                  style={{ marginBottom: 12 }}
                >
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Email is required" },
                      { type: "email", message: "Enter a valid email address" },
                    ]}
                    style={{ minWidth: 280 }}
                  >
                    <Input placeholder="Add email to spam list" />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      htmlType="submit"
                      loading={addLoading}
                    >
                      Add
                    </Button>
                  </Form.Item>
                </Form>

                <Table
                  className="tat-table"
                  columns={spamColumns}
                  dataSource={spamEmails}
                  loading={spamListLoading}
                  rowKey="key"
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: false,
                    showTotal: (t) => `Total ${t} spam emails`,
                  }}
                  size="small"
                />
              </>
            ),
          },
        ]}
      />
    </div>
  );
};

export default BulkSpamUpdate;
